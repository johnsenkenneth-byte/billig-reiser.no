let cachedToken = "";
let cachedTokenExpiresAt = 0;

async function getAccessToken(apiBaseUrl, apiKey, apiSecret) {
  if (cachedToken && Date.now() < cachedTokenExpiresAt) return cachedToken;

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: apiKey,
    client_secret: apiSecret
  });

  const response = await fetch(`${apiBaseUrl}/v1/security/oauth2/token`, {
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
    const apiKey = String(process.env.AMADEUS_API_KEY || process.env.AMADEUS_CLIENT_ID || "").trim();
    const apiSecret = String(process.env.AMADEUS_API_SECRET || process.env.AMADEUS_CLIENT_SECRET || "").trim();
    const amadeusEnv = String(process.env.AMADEUS_ENV || "test").trim().toLowerCase();
    const defaultBaseUrl = amadeusEnv === "production"
      ? "https://api.amadeus.com"
      : "https://test.api.amadeus.com";
    const apiBaseUrl = String(process.env.AMADEUS_API_BASE_URL || defaultBaseUrl).trim().replace(/\/+$/, "");
    const keyword = String(req.query.keyword || req.query.q || "").trim();
    const limit = Math.max(1, Math.min(10, Number(req.query.limit || 6)));

    if (keyword.length < 2) {
      return res.status(400).json({ success: false, error: "Skriv minst to tegn.", locations: [] });
    }

    if (!apiKey || !apiSecret) {
      return res.status(200).json({
        success: false,
        error: `Amadeus-nokler mangler hos Vercel: ${!apiKey ? "AMADEUS_API_KEY/AMADEUS_CLIENT_ID" : "AMADEUS_API_SECRET/AMADEUS_CLIENT_SECRET"}.`,
        locations: []
      });
    }

    const token = await getAccessToken(apiBaseUrl, apiKey, apiSecret);
    const url = new URL(`${apiBaseUrl}/v1/reference-data/locations`);
    url.searchParams.set("subType", "CITY,AIRPORT");
    url.searchParams.set("keyword", keyword);
    url.searchParams.set("page[limit]", String(limit));
    url.searchParams.set("sort", "analytics.travelers.score");
    url.searchParams.set("view", "LIGHT");

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data?.errors?.[0]?.detail || "Amadeus kunne ikke hente flyplassforslag.";
      return res.status(response.status).json({ success: false, error: message, locations: [] });
    }

    const locations = (data.data || [])
      .map((item) => {
        const address = item.address || {};
        const code = String(item.iataCode || address.cityCode || "").toUpperCase();
        return {
          code,
          city: address.cityName || item.name || code,
          name: item.name || address.cityName || code,
          country: address.countryName || address.countryCode || "",
          country_code: address.countryCode || "",
          sub_type: item.subType || "",
          city_code: address.cityCode || code
        };
      })
      .filter((item) => /^[A-Z]{3}$/.test(item.code));

    return res.status(200).json({ success: locations.length > 0, keyword, locations });
  } catch (error) {
    return res.status(200).json({ success: false, error: error?.message || "Kunne ikke hente flyplassforslag.", locations: [] });
  }
}
