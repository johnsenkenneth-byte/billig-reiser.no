# Koble Amadeus Test API til Billig-reiser.no

API-noklene skal ligge skjult hos Vercel. Ikke legg dem inn i HTML, JavaScript eller en ZIP-fil.

## Legg inn noklene hos Vercel

1. Logg inn pa Vercel og apne prosjektet for Billig-reiser.no.
2. Velg `Settings`.
3. Velg `Environment Variables`.
4. Opprett variabelen `AMADEUS_API_KEY` og lim inn din Amadeus API Key som verdi.
5. Opprett variabelen `AMADEUS_API_SECRET` og lim inn din Amadeus API Secret som verdi.
6. Opprett variabelen `AMADEUS_API_BASE_URL` med verdien `https://test.travel.api.amadeus.com`.
7. Huk av for `Production`, `Preview` og `Development`.
8. Trykk `Save`.
9. Last opp denne prosjektmappen pa nytt eller start en ny deployment fra Vercel.

## Test etter publisering

1. Apne forsiden.
2. Velg for eksempel `Oslo (OSL)` til `Bangkok (BKK)`.
3. Velg en avreisedato frem i tid.
4. Vent et lite oyeblikk.

Under sokefeltet skal du se en prisindikasjon fra `Amadeus testmiljo`.

Testmiljoet har et begrenset utvalg data. Et tomt resultat betyr derfor ikke nodvendigvis at integrasjonen er feil.
