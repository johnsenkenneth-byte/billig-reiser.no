# Thailand-guidene er låst

Disse filene er godkjent og skal ikke endres når andre deler av nettsiden oppdateres.

Låsen gjelder Thailand-guiden, Koh-sidene og de øvrige Thailand-destinasjonssidene. Endringer skal bare gjøres hvis Kenneth eksplisitt ber om å oppdatere Thailand-guidene, Koh Mak, Koh Kood, Koh Chang eller andre Thailand-sider.

## Hva er låst?

- `reise-thailand.html`
- Alle `reise-thailand-*.html`
- Alle `thailand-*.html`
- `thailand-guide.css`
- `thailand-rich-guide.css`
- `thailand-videos.js`

## Slik sjekkes låsen

Kjør denne kontrollen før nye ZIP-pakker lages:

```bash
node scripts/check-locked-files.mjs
```

Hvis kontrollen viser avvik, er en låst Thailand-fil endret. Da skal endringen enten reverseres, eller låsen skal oppdateres bevisst etter at Kenneth har godkjent det.
