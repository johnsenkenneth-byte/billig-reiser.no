let cachedToken = "";
let cachedTokenExpiresAt = 0;

async function getAccessToken(apiKey, apiSecret) {
  if (cachedToken && Date.now() < cachedTokenExpiresAt) return cachedToken;

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: apiKey,
    client_secret: apiSecret
  });

  const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || "Kunne ikke logge inn hos Amadeus.");
  }

  cachedToken = data.access_token;
  cachedTokenExpiresAt = Date.now() + Math.max(0, Number(data.expires_in || 0) - 60) * 1000;
  return cachedToken;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.AMADEUS_API_KEY;
    const apiSecret = process.env.AMADEUS_API_SECRET;
    if (!apiKey || !apiSecret) {
      return res.status(200).json({ success: false, error: "Amadeus-nokler mangler hos Vercel." });
    }

    const origin = String(req.query.origin || "").toUpperCase().slice(0, 3);
    const destination = String(req.query.destination || "").toUpperCase().slice(0, 3);
    const departDate = String(req.query.depart_date || "").slice(0, 10);
    const returnDate = String(req.query.return_date || "").slice(0, 10);
    const adults = Math.max(1, Math.min(9, Number(req.query.adults || 1)));

    if (!/^[A-Z]{3}$/.test(origin) || !/^[A-Z]{3}$/.test(destination) || !/^\d{4}-\d{2}-\d{2}$/.test(departDate)) {
      return res.status(400).json({ success: false, error: "Velg flyplasser og avreisedato." });
    }

    const token = await getAccessToken(apiKey, apiSecret);
    const url = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
    url.searchParams.set("originLocationCode", origin);
    url.searchParams.set("destinationLocationCode", destination);
    url.searchParams.set("departureDate", departDate);
    if (/^\d{4}-\d{2}-\d{2}$/.test(returnDate)) url.searchParams.set("returnDate", returnDate);
    url.searchParams.set("adults", String(adults));
    url.searchParams.set("currencyCode", "NOK");
    url.searchParams.set("max", "3");

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data?.errors?.[0]?.detail || "Amadeus kunne ikke hente flyprisene.";
      return res.status(response.status).json({ success: false, error: message });
    }

    const offers = (data.data || []).map((item) => {
      const firstSegment = item.itineraries?.[0]?.segments?.[0] || {};
      return {
        price: item.price?.grandTotal,
        currency: item.price?.currency || "NOK",
        airline: firstSegment.carrierCode || item.validatingAirlineCodes?.[0] || "",
        departure_at: firstSegment.departure?.at || "",
        bookable_seats: item.numberOfBookableSeats || null
      };
    }).filter((item) => Number(item.price) > 0);

    return res.status(200).json({ success: offers.length > 0, origin, destination, offers });
  } catch (error) {
    return res.status(200).json({ success: false, error: error?.message || "Kunne ikke hente flypriser." });
  }
}
