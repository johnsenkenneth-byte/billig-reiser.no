# Reisevarsel på e-post

Forsiden har nå et skjema som sender til `/api/deal-alert-signup`.

For at registreringene faktisk skal lagres eller sendes, må du legge inn minst én av disse løsningene i Vercel:

## Anbefalt: webhook

Lag en webhook i Make, Zapier eller lignende, og lagre verdien som miljøvariabel:

```txt
DEAL_ALERT_WEBHOOK_URL=https://...
```

Webhooken får JSON med blant annet:

```json
{
  "email": "kunde@epost.no",
  "airport": "OSL",
  "interest": "restplass",
  "source": "frontpage-deal-alert",
  "createdAt": "2026-06-24T12:00:00.000Z"
}
```

## Alternativ: Resend-varsel til deg

Hvis du vil få hver registrering på e-post, legg inn:

```txt
RESEND_API_KEY=...
DEAL_ALERT_TO=din@epost.no
DEAL_ALERT_FROM=Billig Reiser <reisevarsel@dittdomene.no>
```

`DEAL_ALERT_FROM` må være et domene som er verifisert i Resend.
