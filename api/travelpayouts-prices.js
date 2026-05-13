export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = process.env.TRAVELPAYOUTS_API_TOKEN;
    if (!token) return res.status(200).json({ success: false, error: 'TRAVELPAYOUTS_API_TOKEN mangler.' });

    const origin = String(req.query.origin || '').toUpperCase().slice(0, 3);
    const destination = String(req.query.destination || '').toUpperCase().slice(0, 3);
    const departDate = String(req.query.depart_date || '').slice(0, 10);
    const returnDate = String(req.query.return_date || '').slice(0, 10);
    const currency = String(req.query.currency || 'NOK').toUpperCase().slice(0, 3);

    if (!/^[A-Z]{3}$/.test(origin) || !/^[A-Z]{3}$/.test(destination)) {
      return res.status(400).json({ success: false, error: 'Origin og destination må være IATA-koder.' });
    }

    const url = new URL('https://api.travelpayouts.com/v1/prices/cheap');
    url.searchParams.set('origin', origin);
    url.searchParams.set('destination', destination);
    if (departDate) url.searchParams.set('depart_date', departDate);
    if (returnDate) url.searchParams.set('return_date', returnDate);
    url.searchParams.set('currency', currency);

    const response = await fetch(url.toString(), {
      headers: {
        'X-Access-Token': token,
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate'
      }
    });

    const data = await response.json().catch(() => ({}));
    const bucket = data?.data?.[destination] || data?.data || {};
    const offers = Object.values(bucket || {})
      .filter(Boolean)
      .map((item) => ({
        price: item.price,
        airline: item.airline,
        flight_number: item.flight_number,
        departure_at: item.departure_at,
        return_at: item.return_at,
        expires_at: item.expires_at
      }))
      .filter((item) => Number(item.price) > 0)
      .sort((a, b) => Number(a.price) - Number(b.price))
      .slice(0, 3);

    return res.status(200).json({
      success: Boolean(data?.success) && offers.length > 0,
      origin,
      destination,
      currency,
      offers,
      error: data?.error || null
    });
  } catch (error) {
    return res.status(200).json({ success: false, error: error?.message || 'Kunne ikke hente priser.' });
  }
}
