const ALLOWED_AIRPORTS = new Set(["OSL", "BGO", "TRD", "SVG", "KRS", "TOS"]);
const ALLOWED_INTERESTS = new Set(["restplass", "charter", "hotell", "weekend", "familie"]);

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function postToWebhook(webhookUrl, signup) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signup)
  });

  if (!response.ok) {
    throw new Error(`Webhook svarte med ${response.status}.`);
  }
}

async function sendResendNotification(signup) {
  const apiKey = String(process.env.RESEND_API_KEY || "").trim();
  const to = String(process.env.DEAL_ALERT_TO || "").trim();
  if (!apiKey || !to) return false;

  const from = String(process.env.DEAL_ALERT_FROM || "Billig Reiser <reisevarsel@billig-reiser.no>").trim();
  const subject = `Nytt reisevarsel: ${signup.email}`;
  const text = [
    "Nytt reisevarsel fra Billig-reiser.no",
    "",
    `E-post: ${signup.email}`,
    `Fra: ${signup.airport}`,
    `Type: ${signup.interest}`,
    `Side: ${signup.page}`,
    `Tid: ${signup.createdAt}`
  ].join("\n");

  const html = `
    <h2>Nytt reisevarsel</h2>
    <p><strong>E-post:</strong> ${escapeHtml(signup.email)}</p>
    <p><strong>Fra:</strong> ${escapeHtml(signup.airport)}</p>
    <p><strong>Type:</strong> ${escapeHtml(signup.interest)}</p>
    <p><strong>Side:</strong> ${escapeHtml(signup.page)}</p>
    <p><strong>Tid:</strong> ${escapeHtml(signup.createdAt)}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ from, to: [to], subject, text, html })
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || "Resend kunne ikke sende varsel.");
  }

  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const body = await readBody(req);
    if (String(body.website || "").trim()) {
      return res.status(200).json({ success: true, skipped: true });
    }

    const email = String(body.email || "").trim().toLowerCase();
    const airport = String(body.airport || "OSL").trim().toUpperCase();
    const interest = String(body.interest || "restplass").trim().toLowerCase();
    const consent = body.consent === true || body.consent === "yes";

    if (!isEmail(email)) {
      return res.status(400).json({ success: false, message: "Skriv inn en gyldig e-postadresse." });
    }

    if (!consent) {
      return res.status(400).json({ success: false, message: "Samtykke mangler." });
    }

    if (!ALLOWED_AIRPORTS.has(airport) || !ALLOWED_INTERESTS.has(interest)) {
      return res.status(400).json({ success: false, message: "Ugyldig valg i skjemaet." });
    }

    const signup = {
      email,
      airport,
      interest,
      consent: true,
      source: String(body.source || "frontpage-deal-alert").slice(0, 80),
      page: String(body.page || "").slice(0, 500),
      createdAt: new Date().toISOString(),
      userAgent: String(req.headers["user-agent"] || "").slice(0, 240),
      ip: String(req.headers["x-forwarded-for"] || "").split(",")[0].trim().slice(0, 80)
    };

    const webhookUrl = String(process.env.DEAL_ALERT_WEBHOOK_URL || "").trim();
    const deliveredTo = [];

    if (webhookUrl) {
      await postToWebhook(webhookUrl, signup);
      deliveredTo.push("webhook");
    }

    if (await sendResendNotification(signup)) {
      deliveredTo.push("resend");
    }

    if (!deliveredTo.length) {
      return res.status(503).json({
        success: false,
        message: "Reisevarsel er ikke koblet til ennå. Legg inn DEAL_ALERT_WEBHOOK_URL eller RESEND_API_KEY i Vercel."
      });
    }

    return res.status(200).json({ success: true, deliveredTo });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Kunne ikke lagre reisevarselet akkurat nå."
    });
  }
}
