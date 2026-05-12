export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const fallbackUrl = req.body?.url || '';

  try {
    const token = process.env.TRAVELPAYOUTS_API_TOKEN || process.env.TP_API_TOKEN || process.env.TRAVELPAYOUTS_TOKEN;
    const marker = req.body?.marker || process.env.TRAVELPAYOUTS_MARKER || process.env.TP_MARKER || '517483';
    const trs = process.env.TRAVELPAYOUTS_PROJECT_ID || process.env.TRAVELPAYOUTS_TRS || process.env.TP_PROJECT_ID || marker;

    if (!token) {
      return res.status(200).json({
        error: 'TRAVELPAYOUTS_API_TOKEN mangler i Vercel Environment Variables. Bruker direkte partnermål som fallback.',
        partner_url: fallbackUrl
      });
    }

    const { url, sub_id = 'billig-reiser', shorten = false } = req.body || {};
    if (!url || !/^https:\/\//i.test(url)) {
      return res.status(400).json({ error: 'Mangler gyldig https-url.' });
    }

    const payload = {
      trs: Number(trs),
      marker: Number(marker),
      shorten: Boolean(shorten),
      links: [{ url, sub_id }]
    };

    async function callTravelpayouts(headers) {
      const response = await fetch('https://api.travelpayouts.com/links/v1/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      return { response, data };
    }

    // Travelpayouts has used token auth in more than one API style. Try Bearer first,
    // then X-Access-Token as a safe fallback for deployments already configured in Vercel.
    let { response, data } = await callTravelpayouts({ Authorization: `Bearer ${token}` });
    if (response.status === 401 || response.status === 403) {
      ({ response, data } = await callTravelpayouts({ 'X-Access-Token': token }));
    }

    const first = data?.result?.links?.[0];
    const partnerUrl = first?.partner_url || '';

    if (!response.ok || !partnerUrl || first?.code === 'failed') {
      return res.status(200).json({
        error: first?.message || data?.error || 'Kunne ikke lage Travelpayouts partnerlink. Bruker fallback.',
        partner_url: fallbackUrl,
        debug_code: data?.code || first?.code || response.status
      });
    }

    return res.status(200).json({ partner_url: partnerUrl, code: 'success' });
  } catch (error) {
    return res.status(200).json({
      error: error?.message || 'Ukjent Travelpayouts-feil.',
      partner_url: fallbackUrl
    });
  }
}
