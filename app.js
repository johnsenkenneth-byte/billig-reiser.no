/* BR build: LIVE-KIWI-AIRPORT-SEARCH-2026-05-09 */


/* Discovery Engine + Deal Engine */
(() => {
  const DEFAULT_EXPEDIA_CRUISE_URL = "https://www.expedia.com/Cruises-to-Europe.d6022967.Travel-Guide-Cruise";
  const hotelsBrowserBridge = (targetUrl) => `/go/hotels.html#to=${encodeURIComponent(targetUrl)}`;
  const partners = {
    // Partnerne dekker videresending til flysok, hotell, aktiviteter og transport.
    flights: (window.BR_AFFILIATES && window.BR_AFFILIATES.flights) || "https://c111.travelpayouts.com/click?shmarker=718286.billigreiser_flight_home&promo_id=3791&source_type=customlink&type=click&custom_url=https%3A%2F%2Fwww.kiwi.com%2Fno%2F",
    packageTravel: (window.BR_AFFILIATES && window.BR_AFFILIATES.packageTravel) || "https://www.expedia.no/go/package/search/FlightHotel/",
    cruise: (window.BR_AFFILIATES && window.BR_AFFILIATES.cruise) || DEFAULT_EXPEDIA_CRUISE_URL,
    interhome: (window.BR_AFFILIATES && window.BR_AFFILIATES.interhome) || "https://tc.tradetracker.net/?c=27484&m=1269456&a=509866&r=&u=https%3A%2F%2Fwww.interhome.no%2F",
    tuiRestplass: (window.BR_AFFILIATES && window.BR_AFFILIATES.tuiRestplass) || "https://tc.tradetracker.net/?c=35742&m=2133355&a=509866&r=&u=https%3A%2F%2Fwww.tui.no%2Ftilbud%2Frestplass%2F",
    nazar: (window.BR_AFFILIATES && window.BR_AFFILIATES.nazar) || "https://clk.tradedoubler.com/click?p=377463&a=3480427&url=https%3A%2F%2Fwww.nazar.no%2F",
    ferryhopper: (window.BR_AFFILIATES && window.BR_AFFILIATES.ferryhopper) || "https://clk.tradedoubler.com/click?p=382549&a=3480427&url=https%3A%2F%2Fwww.ferryhopper.com%2Fda%2Fbooking%2Fresults%3Fitinerary%3DKRS%252CHIR%252CKRS%26dates%3D20260624%252C20260628%26passengers%3D1%26vehicles%3D0%26pets%3D0",
    cheapFlights: (window.BR_AFFILIATES && window.BR_AFFILIATES.cheapFlights) || "https://c111.travelpayouts.com/click?shmarker=718286.billigreiser_flight_home&promo_id=3791&source_type=customlink&type=click&custom_url=https%3A%2F%2Fwww.kiwi.com%2Fno%2F",
    cheaptickets: "https://www.anrdoezrs.net/links/101724638/type/dlg/https://www.cheaptickets.com/Flights",
    iberia: (window.BR_AFFILIATES && window.BR_AFFILIATES.iberia) || "https://www.anrdoezrs.net/click-101724638-12119574",
    malaysiaAirlines: (window.BR_AFFILIATES && window.BR_AFFILIATES.malaysiaAirlines) || "https://www.dpbolvw.net/click-101724638-17167285",
    hotels: hotelsBrowserBridge((window.BR_AFFILIATES && window.BR_AFFILIATES.hotels) || "https://www.tkqlhce.com/click-101724638-14361426"),
    bookingCom: (window.BR_AFFILIATES && window.BR_AFFILIATES.bookingCom) || "https://www.booking.com/?aid=1522412&utm_source=affnetcj&utm_medium=bannerindex&utm_campaign=no&utm_term=index-1522412",
    strawberry: (window.BR_AFFILIATES && window.BR_AFFILIATES.strawberry) || "https://clk.tradedoubler.com/click?p=93758&a=3480427&url=https%3A%2F%2Fwww.strawberry.no",
    car: (window.BR_AFFILIATES && window.BR_AFFILIATES.car) || "https://www.jdoqocy.com/click-101724638-17010909",
    economyBookings: (window.BR_AFFILIATES && (window.BR_AFFILIATES.economyBookingsEurope || window.BR_AFFILIATES.economyBookings)) || "https://economybookings.tpx.gr/LT8vc2kD",
    autoeurope: (window.BR_AFFILIATES && window.BR_AFFILIATES.autoEurope) || "https://autoeurope.tpx.gr/GzEPjKLD",
    activities: (window.BR_AFFILIATES && window.BR_AFFILIATES.activities) || "https://klook.tpx.gr/Tmj2PfPe",
    kkday: (window.BR_AFFILIATES && window.BR_AFFILIATES.kkday) || "https://kkday.tpx.gr/WlhfXaEZ",
    transfer: (window.BR_AFFILIATES && window.BR_AFFILIATES.transfer) || "https://kiwitaxi.tpx.gr/YjkKJSHa",
    saily: (window.BR_AFFILIATES && window.BR_AFFILIATES.saily) || "https://saily.tpx.gr/svbOORah",
    radicalStorage: (window.BR_AFFILIATES && window.BR_AFFILIATES.radicalStorage) || "https://radicalstorage.tpx.gr/9aBeOTqW",
    tiqets: (window.BR_AFFILIATES && window.BR_AFFILIATES.tiqets) || "https://tiqets.tpx.gr/nL28pCCf",
    goCity: (window.BR_AFFILIATES && window.BR_AFFILIATES.goCity) || "https://gocity.tpx.gr/QHScpmus",
    flightDelay: (window.BR_AFFILIATES && window.BR_AFFILIATES.flightDelay) || "https://deals.flyforsinkelser.no/c?c=40284&m=2508483&a=509866&r=&u=",
    airhelp: (window.BR_AFFILIATES && window.BR_AFFILIATES.airhelp) || "https://airhelp.tpx.gr/ZW3oHL4Z"
  };

  const inspiration = {
    weekend: [
      ["Roma", "Kultur, mat og billige helgefly.", "fra 499 kr", partners.cheapFlights],
      ["Barcelona", "Sol, strand og storby på samme tur.", "fra 799 kr", partners.flights],
      ["Krakow", "Lav totalpris og høy hotellverdi.", "fra 399 kr", partners.cheapFlights],
      ["Nice", "Weekend ved Middelhavet.", "fra 649 kr", partners.flights]
    ],
    sun: [
      ["Malaga", "Sol, tapas og rimelige hoteller.", "fra 899 kr", partners.flights],
      ["Alicante", "Perfekt for strand og leiebil.", "fra 849 kr", partners.cheapFlights],
      ["Mallorca", "Familievennlig og lett å booke.", "fra 999 kr", partners.hotels],
      ["Dubai", "Vintervarme og premium hotellkupp.", "fra 2490 kr", partners.flights]
    ],
    asia: [
      ["Bangkok", "Billig mat, hoteller og aktiviteter.", "fra 3290 kr", partners.flights],
      ["Tokyo", "Perfekt med Klook/KKday for opplevelser.", "fra 4490 kr", partners.activities],
      ["Bali", "Surf, natur og rimelig luksus.", "fra 4990 kr", partners.kkday],
      ["Seoul", "Mat, shopping og dagsturer.", "fra 4290 kr", partners.kkday]
    ],
    family: [
      ["Mallorca", "Kort flytid, bassenghotell og trygg logistikk.", "pakke fra 3490 kr", partners.hotels],
      ["København", "Korttur med barn og aktiviteter.", "fra 799 kr", partners.activities],
      ["Orlando", "Temaparker og familiehotell.", "fra 5990 kr", partners.activities],
      ["Rhodos", "Sol, strand og resortvalg.", "fra 2990 kr", partners.hotels]
    ],
    roadtrip: [
      ["Toscana", "Perfekt med EconomyBookings og fleksibel rute.", "bil fra 249 kr/dag", partners.economyBookings],
      ["Sør-Frankrike", "Nice, Provence og Côte d’Azur.", "bil fra 279 kr/dag", partners.autoeurope],
      ["Island", "Natur, fossefall og roadtrip.", "bil fra 399 kr/dag", partners.car],
      ["Portugal", "Lisboa, Porto og kystveier.", "bil fra 229 kr/dag", partners.autoeurope]
    ]
  };

  function renderEngine() {
    const results = document.getElementById("engineResults");
    const style = document.getElementById("engineStyle");
    if (!results || !style) return;

    const selected = inspiration[style.value] || inspiration.weekend;
    results.innerHTML = selected.map((item) => `
      <article class="engine-card">
        <span>AI MATCH</span>
        <h3>${item[0]}</h3>
        <p>${item[1]}</p>
        <strong>${item[2]}</strong>
        <a href="${item[3]}" target="_blank" rel="noopener">SE MULIGHETER</a>
      </article>
    `).join("");
  }

  function renderDeals() {
    const smartDeals = document.getElementById("smartDeals");
    if (!smartDeals) return;

    const deals = [
      ["Flydeal", "Oslo → Roma", "Weekendtur med lav inngangpris.", "fra 499 kr", partners.cheapFlights],
      ["Hotell", "Bangkok hotell", "Høy verdi per krone og gode vinterpriser.", "fra 420 kr/natt", partners.hotels],
      ["Hotell", "Strawberry", "Sjekk hotell i Norge og Norden.", "Se hotell", partners.strawberry],
      ["Opplevelser", "Tokyo aktiviteter", "Attraksjoner, togpass og eSIM.", "fra 129 kr", partners.activities],
      ["Transport", "Flyplasstransfer", "Fast pris fra flyplassen til hotellet.", "fra 199 kr", partners.transfer],
      ["Ferge", "Kristiansand - Hirtshals", "Sjekk ferge tur/retur med Ferryhopper.", "Se ferge", partners.ferryhopper],
      ["Pakkereise", "Fly + hotell", "Finn en samlet feriepakke hos Expedia Norge.", "Se pakkereiser", partners.packageTravel],
      ["Cruise", "Cruiseferie", "Sammenlign reiseruter, rederier og varighet hos Expedia.", "Se cruise", partners.cruise],
      ["Feriebolig", "Feriehus og leiligheter", "Finn hytter, villaer og ferieleiligheter hos Interhome.", "Se ferieboliger", partners.interhome],
      ["Charter", "Nazar charter", "Finn charter, pakkereiser og sydenturer hos Nazar Norge.", "Se Nazar", partners.nazar],
      ["Pakkereise", "Nazar reiser", "Charter og pakkereiser hos Nazar Norge.", "Se Nazar", partners.nazar],
      ["Reisehack", "eSIM på reisen", "Mobildata uten å bytte fysisk SIM-kort.", "Sjekk datapakker", partners.saily],
      ["Storby", "Oppbevar bagasjen", "Praktisk før innsjekk eller etter utsjekk.", "Finn oppbevaring", partners.radicalStorage],
      ["Flytrøbbel", "Forsinket eller kansellert fly?", "Sjekk om du har krav på erstatning hos Flyforsinkelser.no.", "Sjekk krav", partners.flightDelay]
    ];

    smartDeals.innerHTML = deals.map((deal) => `
      <article class="smart-deal">
        <small>● ${deal[0]}</small>
        <h3>${deal[1]}</h3>
        <p>${deal[2]}</p>
        <strong>${deal[3]}</strong>
        <a href="${deal[4]}" target="_blank" rel="noopener">ÅPNE DEAL</a>
      </article>
    `).join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderEngine();
    renderDeals();
    const btn = document.getElementById("engineGenerate");
    const style = document.getElementById("engineStyle");
    const budget = document.getElementById("engineBudget");
    const from = document.getElementById("engineFrom");
    [btn, style, budget, from].forEach((el) => {
      if (el) el.addEventListener("click", renderEngine);
      if (el) el.addEventListener("change", renderEngine);
    });
  });
})();

(() => {
  function hydrateAffiliateLinks() {
    const links = window.BR_AFFILIATES || {};
    document.querySelectorAll("[data-affiliate-key]").forEach((element) => {
      const key = element.getAttribute("data-affiliate-key");
      if (key && links[key]) element.href = links[key];
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hydrateAffiliateLinks);
  } else {
    hydrateAffiliateLinks();
  }
})();


/* Klook experience search */
(() => {
  const affiliateFallback = (window.BR_AFFILIATES && window.BR_AFFILIATES.activities) || "https://klook.tpx.gr/Tmj2PfPe";
  const searchBase = (window.BR_AFFILIATES && window.BR_AFFILIATES.klookSearchBase) || "https://www.klook.com/nb/search/result/?query=";

  function buildKlookSearchUrl(query) {
    const text = String(query || "").trim();
    if (!text) return affiliateFallback;
    try {
      const url = new URL(searchBase);
      url.searchParams.set("query", text);
      return url.toString();
    } catch (error) {
      return `https://www.klook.com/nb/search/result/?query=${encodeURIComponent(text)}`;
    }
  }

  function openKlookSearch(query) {
    window.open(buildKlookSearchUrl(query), "_blank", "noopener");
  }

  function bindKlookSearch() {
    document.querySelectorAll("[data-klook-search-form]").forEach((form) => {
      const input = form.querySelector("[data-klook-search-input]");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        openKlookSearch(input?.value || "");
      });
      form.querySelectorAll("[data-klook-quick]").forEach((button) => {
        button.addEventListener("click", () => {
          const query = button.getAttribute("data-klook-quick") || "";
          if (input) input.value = query;
          openKlookSearch(query);
        });
      });
    });
  }

  window.BR_buildKlookSearchUrl = buildKlookSearchUrl;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindKlookSearch);
  } else {
    bindKlookSearch();
  }
})();


/* Robust Leaflet live map repair */
(function(){
  const partners = {
    cheapFlights: (window.BR_AFFILIATES && window.BR_AFFILIATES.cheapFlights) || "https://c111.travelpayouts.com/click?shmarker=718286.billigreiser_flight_home&promo_id=3791&source_type=customlink&type=click&custom_url=https%3A%2F%2Fwww.kiwi.com%2Fno%2F",
    flights: (window.BR_AFFILIATES && window.BR_AFFILIATES.flights) || "https://c111.travelpayouts.com/click?shmarker=718286.billigreiser_flight_home&promo_id=3791&source_type=customlink&type=click&custom_url=https%3A%2F%2Fwww.kiwi.com%2Fno%2F"
  };
  const dealPins = [
    { name:"Roma", price:"fra 499 kr", discount:"-52%", lat:41.9028, lng:12.4964, color:"blue", url:partners.cheapFlights },
    { name:"New York", price:"fra 2990 kr", discount:"-28%", lat:40.7128, lng:-74.0060, color:"purple", url:partners.cheapFlights },
    { name:"Dubai", price:"fra 1499 kr", discount:"-31%", lat:25.2048, lng:55.2708, color:"green", url:partners.cheapFlights },
    { name:"Bali", price:"fra 3290 kr", discount:"-30%", lat:-8.3405, lng:115.0920, color:"purple", url:"https://klook.tpx.gr/Tmj2PfPe" },
    { name:"Cape Town", price:"fra 3990 kr", discount:"-24%", lat:-33.9249, lng:18.4241, color:"blue", url:partners.cheapFlights },
    { name:"Rio de Janeiro", price:"fra 5290 kr", discount:"-19%", lat:-22.9068, lng:-43.1729, color:"orange", url:partners.cheapFlights }
  ];

  function ensureLeafletMap(){
    if (window.billigReiserLiveMap) return true;
    const el = document.getElementById("liveMap");
    if (!el || !window.L) return false;

    // If an old map exists, clean it first.
    if (el._leaflet_id) {
      try {
        el._leaflet_id = null;
        el.innerHTML = "";
      } catch(e) {}
    }

    const map = L.map(el, {
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: true,
      worldCopyJump: true
    }).setView([18, 15], 2);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 7,
      minZoom: 2
    }).addTo(map);

    dealPins.forEach((pin) => {
      const icon = L.divIcon({
        className: "deal-marker-wrap",
        html: `<div class="deal-marker ${pin.color}"><span></span></div>`,
        iconSize: [34,34],
        iconAnchor: [17,17]
      });

      L.marker([pin.lat, pin.lng], { icon }).addTo(map).bindPopup(`
        <a class="map-popup" href="${pin.url}" target="_blank" rel="noopener">
          <b>${pin.name}</b>
          <span>${pin.price}</span>
          <em>${pin.discount}</em>
          <small>Åpne tilbud →</small>
        </a>
      `);
    });

    setTimeout(() => map.invalidateSize(true), 150);
    setTimeout(() => map.invalidateSize(true), 600);
    window.addEventListener("resize", () => setTimeout(() => map.invalidateSize(true), 150));
    window.billigReiserLiveMap = map;
    return true;
  }

  document.addEventListener("DOMContentLoaded", () => {
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      if (ensureLeafletMap() || tries > 20) clearInterval(timer);
    }, 150);
  });
})();


/* Cookie consent +  search hooks */
(() => {
  function activateConsentServices() {
    document.querySelectorAll("[data-consent-src]").forEach((node) => {
      const source = node.getAttribute("data-consent-src");
      if (!source || node.dataset.consentLoaded === "true") return;
      if (node.tagName === "SCRIPT") {
        const script = document.createElement("script");
        script.src = source;
        script.defer = true;
        node.after(script);
      } else {
        node.setAttribute("src", source);
      }
      node.dataset.consentLoaded = "true";
    });
  }

  function showCookieBanner() {
    const banner = document.getElementById("cookieBanner");
    if (!banner) return;
    const choice = localStorage.getItem("br_cookie_choice");
    if (choice === "accepted") activateConsentServices();
    if (!choice) banner.classList.add("show");

    const accept = document.getElementById("cookieAccept");
    const reject = document.getElementById("cookieReject");
    if (accept) accept.addEventListener("click", () => {
      localStorage.setItem("br_cookie_choice", "accepted");
      activateConsentServices();
      banner.classList.remove("show");
    });
    if (reject) reject.addEventListener("click", () => {
      localStorage.setItem("br_cookie_choice", "necessary");
      banner.classList.remove("show");
    });
  }

  function bindSearchOpeners() {
    document.querySelectorAll("[data-open-search]").forEach((el) => {
      el.addEventListener("click", (event) => {
        const target = el.getAttribute("data-open-search") || "flight";
        const card = document.getElementById("travelSearch");

        // If the search box is on this page, activate the correct tab immediately.
        // If not, let normal links such as index.html#travelSearch navigate as usual.
        if (card) {
          event.preventDefault();
          const tab = document.querySelector(`[data-search-type="${target}"]`);
          if (tab) tab.click();
          setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => { showCookieBanner(); bindSearchOpeners(); });
  } else {
    showCookieBanner();
    bindSearchOpeners();
  }
})();



/* Dynamic partner search
   Flight: Kiwi deeplink through Travelpayouts.
   Hotel: Hotels.com affiliate deeplink wrapper.
   Car: direct Enjoy Travel / AutoEurope partner link with selected context.
*/
(() => {
  const TRAVELPAYOUTS_MARKER = (window.BR_AFFILIATES && window.BR_AFFILIATES.travelpayoutsId) || "718286";
  const CJ_PUBLISHER_ID = (window.BR_AFFILIATES && window.BR_AFFILIATES.cjPublisherId) || "101724638";
  const DEFAULT_EXPEDIA_CRUISE_URL = "https://www.expedia.com/Cruises-to-Europe.d6022967.Travel-Guide-Cruise";
  const AFFILIATE_LINKS = {
    // Aktive partnere. Kiwi-deeplinken sender flysok videre med valgt rute og markor.
    kiwi: (window.BR_AFFILIATES && window.BR_AFFILIATES.kiwi) || "https://c111.travelpayouts.com/click",
    expedia: (window.BR_AFFILIATES && window.BR_AFFILIATES.expedia) || "https://www.kqzyfj.com/click-101724638-13852706?url=https%3A%2F%2Fwww.expedia.no%2FFly",
    packageTravel: (window.BR_AFFILIATES && window.BR_AFFILIATES.packageTravel) || "https://www.expedia.no/go/package/search/FlightHotel/",
    hotels: (window.BR_AFFILIATES && window.BR_AFFILIATES.hotels) || "https://www.tkqlhce.com/click-101724638-14361426",
    bookingCom: (window.BR_AFFILIATES && window.BR_AFFILIATES.bookingCom) || "https://www.booking.com/?aid=1522412&utm_source=affnetcj&utm_medium=bannerindex&utm_campaign=no&utm_term=index-1522412",
    strawberry: (window.BR_AFFILIATES && window.BR_AFFILIATES.strawberry) || "https://clk.tradedoubler.com/click?p=93758&a=3480427&url=https%3A%2F%2Fwww.strawberry.no",
    cheapTickets: (window.BR_AFFILIATES && window.BR_AFFILIATES.cheapTickets) || `https://www.anrdoezrs.net/links/${CJ_PUBLISHER_ID}/type/dlg/https://www.cheaptickets.com/Flights`,
    cheapFlightFares: (window.BR_AFFILIATES && window.BR_AFFILIATES.cheapFlightFares) || `https://www.anrdoezrs.net/links/${CJ_PUBLISHER_ID}/type/dlg/https://www.cheapflightsfares.com/`,
    cheapFlightFaresSearch: (window.BR_AFFILIATES && window.BR_AFFILIATES.cheapFlightFaresSearch) || "https://www.cheapflightsfares.com/search/id/6dpNqSfo6kNIsvxEf1eiVxl4",
    cheapFlights: (window.BR_AFFILIATES && window.BR_AFFILIATES.cheapFlights) || "https://c111.travelpayouts.com/click?shmarker=718286.billigreiser_flight_home&promo_id=3791&source_type=customlink&type=click&custom_url=https%3A%2F%2Fwww.kiwi.com%2Fno%2F",
    iberia: (window.BR_AFFILIATES && window.BR_AFFILIATES.iberia) || "https://www.anrdoezrs.net/click-101724638-12119574",
    malaysiaAirlines: (window.BR_AFFILIATES && window.BR_AFFILIATES.malaysiaAirlines) || "https://www.dpbolvw.net/click-101724638-17167285",
    enjoyTravel: (window.BR_AFFILIATES && window.BR_AFFILIATES.enjoyTravel) || "https://www.jdoqocy.com/click-101724638-17010909",
    economyBookings: (window.BR_AFFILIATES && window.BR_AFFILIATES.economyBookings) || "https://economybookings.tpx.gr/LT8vc2kD",
    economyBookingsClick: (window.BR_AFFILIATES && window.BR_AFFILIATES.economyBookingsClick) || "https://c10.travelpayouts.com/click",
    economyBookingsPromoId: (window.BR_AFFILIATES && window.BR_AFFILIATES.economyBookingsPromoId) || "2018",
    economyBookingsEurope: (window.BR_AFFILIATES && window.BR_AFFILIATES.economyBookingsEurope) || "https://c10.travelpayouts.com/click?shmarker=718286.billigreiser_car_europe&promo_id=2018&source_type=customlink&type=click&custom_url=https%3A%2F%2Fwww.economybookings.com%2Fcar-rental%2Feurope",
    autoEurope: (window.BR_AFFILIATES && window.BR_AFFILIATES.autoEurope) || "https://autoeurope.tpx.gr/GzEPjKLD",
    carFallback: (window.BR_AFFILIATES && window.BR_AFFILIATES.car) || "https://www.jdoqocy.com/click-101724638-17010909",
    interhome: (window.BR_AFFILIATES && window.BR_AFFILIATES.interhome) || "https://tc.tradetracker.net/?c=27484&m=1269456&a=509866&r=&u=https%3A%2F%2Fwww.interhome.no%2F",
    cruise: (window.BR_AFFILIATES && window.BR_AFFILIATES.cruise) || DEFAULT_EXPEDIA_CRUISE_URL,
    tuiRestplass: (window.BR_AFFILIATES && window.BR_AFFILIATES.tuiRestplass) || "https://tc.tradetracker.net/?c=35742&m=2133355&a=509866&r=&u=https%3A%2F%2Fwww.tui.no%2Ftilbud%2Frestplass%2F",
    nazar: (window.BR_AFFILIATES && window.BR_AFFILIATES.nazar) || "https://clk.tradedoubler.com/click?p=377463&a=3480427&url=https%3A%2F%2Fwww.nazar.no%2F",
    ferryhopper: (window.BR_AFFILIATES && window.BR_AFFILIATES.ferryhopper) || "https://clk.tradedoubler.com/click?p=382549&a=3480427&url=https%3A%2F%2Fwww.ferryhopper.com%2Fda%2Fbooking%2Fresults%3Fitinerary%3DKRS%252CHIR%252CKRS%26dates%3D20260624%252C20260628%26passengers%3D1%26vehicles%3D0%26pets%3D0"
  };

  let currentSearchType = "flight";
  const blankTabState = () => ({ from: "", to: "", depart: "", ret: "", adults: "2", children: "0" });
  const tabStates = {
    flight: blankTabState(),
    hotel: blankTabState(),
    car: blankTabState(),
    package: blankTabState(),
    cruise: blankTabState(),
    interhome: blankTabState(),
    restplass: blankTabState()
  };

  const $ = (id) => document.getElementById(id);
  const clean = (value, fallback = "") => (String(value || "").trim() || fallback);
  const cityForUrl = (value) => clean(value).replace(/\s+/g, " ");
  const searchFieldForUrl = (id) => {
    const value = cityForUrl($(id)?.value);
    const key = value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, "").trim();
    return key === "valgfritt" || key === "optional" ? "" : value;
  };

  function addDaysISO(days) {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function todayISO() {
    return addDaysISO(0);
  }

  function dateIsBeforeToday(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) && value < todayISO();
  }

  function ensureFreshDates(forceDefault = false) {
    const depart = $("departDate");
    const ret = $("returnDate");

    // Datoene skal ikke hardkodes inn i feltene når siden åpnes.
    // Brukeren velger dato i live-kalenderen. Ved selve søket bruker vi
    // trygge standarddatoer bare hvis feltene fortsatt er tomme.
    if (!forceDefault) return;

    const fallbackDepart = addDaysISO(14);
    const fallbackReturn = addDaysISO(21);
    if (depart && (!depart.value || dateIsBeforeToday(depart.value))) depart.value = fallbackDepart;
    if (ret && (!ret.value || dateIsBeforeToday(ret.value) || ret.value <= depart.value)) ret.value = fallbackReturn;
  }

  function validISO(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
  }

  function fallbackDepartISO() {
    return addDaysISO(14);
  }

  function fallbackReturnISO(departValue) {
    const d = parseISODate(departValue) || parseISODate(fallbackDepartISO()) || new Date();
    d.setDate(d.getDate() + 7);
    return toISODate(d);
  }

  function readSearchState(options = {}) {
    const adultsRaw = clean($("adults")?.value, "2");
    const rawDepart = clean($("departDate")?.value);
    const rawReturn = clean($("returnDate")?.value);
    const useFallback = Boolean(options.forUrl);
    const depart = validISO(rawDepart) ? rawDepart : (useFallback ? fallbackDepartISO() : "");
    const ret = validISO(rawReturn) && (!depart || rawReturn > depart) ? rawReturn : (useFallback ? fallbackReturnISO(depart || fallbackDepartISO()) : "");
    return {
      type: currentSearchType,
      from: currentSearchType === "hotel" || currentSearchType === "interhome" ? "" : searchFieldForUrl("fromCity"),
      to: searchFieldForUrl("toCity"),
      depart,
      ret,
      adults: adultsRaw.replace(/\D/g, "") || "2",
      children: clean($("children")?.value, "0").replace(/\D/g, "") || "0"
    };
  }



  let calendarMonthOffset = 0;
  let calendarPicking = "depart";

  function parseISODate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
    if (!match) return null;
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  function toISODate(date) {
    const d = new Date(date);
    d.setHours(12, 0, 0, 0);
    return d.toISOString().slice(0, 10);
  }

  function addDaysToISO(value, days) {
    const d = parseISODate(value) || new Date();
    d.setDate(d.getDate() + days);
    return toISODate(d);
  }

  function monthName(date) {
    return date.toLocaleDateString("nb-NO", { month: "long", year: "numeric" });
  }

  function compactDate(value, fallback) {
    const date = parseISODate(value);
    return date ? date.toLocaleDateString("nb-NO", { day: "2-digit", month: "short" }) : fallback;
  }

  function updateDateRangeSummary() {
    const form = $("travelSearch");
    const toggle = $("dateRangeToggle");
    if ($("dateRangeDepart")) $("dateRangeDepart").textContent = compactDate($("departDate")?.value, "Avreise");
    if ($("dateRangeReturn")) $("dateRangeReturn").textContent = compactDate($("returnDate")?.value, "Hjemreise");
    if (toggle) toggle.setAttribute("aria-expanded", form?.classList.contains("calendar-open") ? "true" : "false");
  }

  function setCalendarOpen(open) {
    const form = $("travelSearch");
    if (!form) return;
    form.classList.toggle("calendar-open", open);
    updateDateRangeSummary();
    if (open) renderLiveCalendar();
  }

  function openDateRangePicker() {
    calendarPicking = $("departDate")?.value ? "return" : "depart";
    setCalendarOpen(true);
    $("dateRangeToggle")?.focus();
  }

  function renderCalendarMonth(baseDate, state) {
    const first = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
    const month = first.getMonth();
    const startOffset = (first.getDay() + 6) % 7;
    const cursor = new Date(first);
    cursor.setDate(first.getDate() - startOffset);
    const today = todayISO();
    let html = `<div class="calendar-month"><div class="calendar-month-title">${monthName(first)}</div><div class="calendar-weekdays"><span>Ma</span><span>Ti</span><span>On</span><span>To</span><span>Fr</span><span>Lø</span><span>Sø</span></div><div class="calendar-days">`;

    for (let i = 0; i < 42; i++) {
      const iso = toISODate(cursor);
      const outside = cursor.getMonth() !== month;
      const disabled = iso < today;
      const isDepart = iso === state.depart;
      const isReturn = iso === state.ret;
      const inRange = state.depart && state.ret && iso > state.depart && iso < state.ret;
      const cls = [outside ? "is-outside" : "", disabled ? "is-disabled" : "", isDepart ? "is-depart" : "", isReturn ? "is-return" : "", inRange ? "is-range" : ""].filter(Boolean).join(" ");
      html += `<button type="button" class="${cls}" data-calendar-date="${iso}" ${disabled ? "disabled" : ""} aria-label="Velg ${iso}">${cursor.getDate()}</button>`;
      cursor.setDate(cursor.getDate() + 1);
    }
    return html + `</div></div>`;
  }

  function renderLiveCalendar() {
    const box = $("liveDateCalendar");
    if (!box) return;
    const rawState = readSearchState();
    const state = rawState;
    const base = new Date();
    base.setMonth(base.getMonth() + calendarMonthOffset, 1);
    const next = new Date(base.getFullYear(), base.getMonth() + 1, 1);
    const departLabel = currentSearchType === "hotel" ? "Innsjekk" : currentSearchType === "interhome" ? "Ankomst" : currentSearchType === "restplass" ? "Tidligste avreise" : currentSearchType === "car" ? "Hentedato" : "Avreise";
    const returnLabel = currentSearchType === "hotel" ? "Utsjekk" : currentSearchType === "interhome" ? "Avreise" : currentSearchType === "car" ? "Leveringsdato" : "Retur";

    box.innerHTML = `
      <div class="calendar-header">
        <div><strong>${calendarPicking === "depart" ? `Velg ${departLabel.toLowerCase()}` : `Velg ${returnLabel.toLowerCase()}`}</strong><small>Velg utreise først, deretter hjemreise i den samme kalenderen.</small></div>
        <div class="calendar-controls">
          <button type="button" data-calendar-pick="depart" class="${calendarPicking === "depart" ? "active" : ""}">${departLabel}</button>
          <button type="button" data-calendar-pick="return" class="${calendarPicking === "return" ? "active" : ""}">${returnLabel}</button>
          <button type="button" data-calendar-prev aria-label="Forrige måned">‹</button>
          <button type="button" data-calendar-next aria-label="Neste måned">›</button>
        </div>
      </div>
      <div class="calendar-grid">${renderCalendarMonth(base, state)}${renderCalendarMonth(next, state)}</div>`;
  }

  function handleCalendarClick(event) {
    const pick = event.target.closest("[data-calendar-pick]");
    if (pick) {
      calendarPicking = pick.dataset.calendarPick;
      renderLiveCalendar();
      return;
    }
    if (event.target.closest("[data-calendar-prev]")) {
      calendarMonthOffset = Math.max(0, calendarMonthOffset - 1);
      renderLiveCalendar();
      return;
    }
    if (event.target.closest("[data-calendar-next]")) {
      calendarMonthOffset += 1;
      renderLiveCalendar();
      return;
    }
    const day = event.target.closest("[data-calendar-date]");
    if (!day || day.disabled) return;
    const iso = day.dataset.calendarDate;
    const depart = $("departDate");
    const ret = $("returnDate");
    const currentDepart = depart?.value || "";

    if (calendarPicking === "depart" || !currentDepart || iso <= currentDepart) {
      if (depart) depart.value = iso;
      if (ret && ret.value <= iso) ret.value = "";
      calendarPicking = "return";
    } else {
      if (ret) ret.value = iso;
      calendarPicking = "depart";
    }

    ensureFreshDates(false);
    updateSearchPreview();
    renderLiveCalendar();
    if (ret?.value && calendarPicking === "depart") setCalendarOpen(false);
  }

  function saveFormToTabState(type = currentSearchType) {
    const key = type || "flight";
    if (!tabStates[key]) return;
    tabStates[key] = {
      from: key === "hotel" || key === "interhome" ? "" : searchFieldForUrl("fromCity"),
      to: searchFieldForUrl("toCity"),
      depart: $("departDate")?.value || "",
      ret: $("returnDate")?.value || "",
      adults: $("adults")?.value || "2",
      children: $("children")?.value || "0"
    };
  }

  function loadTabState(type = currentSearchType) {
    const state = tabStates[type] || blankTabState();
    if ($("fromCity")) $("fromCity").value = state.from || "";
    if ($("toCity")) $("toCity").value = state.to || "";
    if ($("departDate")) $("departDate").value = state.depart || "";
    if ($("returnDate")) $("returnDate").value = state.ret || "";
    if ($("adults")) $("adults").value = state.adults || "2";
    if ($("children")) $("children").value = state.children || "0";
    updateTravelerSummary();
    updateDateRangeSummary();
  }

  function resetActiveTabSearch() {
    tabStates[currentSearchType] = blankTabState();
    if (currentSearchType === "cruise") cruiseQuickChoice = "";
    loadTabState(currentSearchType);
    calendarPicking = "depart";
  }

  function saveSearchState() {
    // Keep searches separate per tab only. Do not persist old fly/hotel/car values
    // across visits, because old values made other tabs look pre-filled.
    saveFormToTabState(currentSearchType);
  }

  function restoreSearchState() {
    try { localStorage.removeItem("br_last_search"); localStorage.removeItem("br_last_search_v2"); } catch(e) {}
    loadTabState(currentSearchType);
  }

  function updateSearchPreview() {
    const state = readSearchState();
    const button = $("searchSubmitButton");
    const helper = document.querySelector(".search-help");
    updateDateRangeSummary();

    if (button) {
      if (currentSearchType === "package") {
        button.textContent = state.to ? `SØK PAKKEREISE TIL ${state.to.toUpperCase()} 🔎` : "SØK PAKKEREISE 🔎";
      } else if (currentSearchType === "cruise") {
        const cruiseChoice = cruiseSearchText(state.from || state.to || cruiseQuickChoice);
        button.textContent = cruiseChoice ? `SJEKK CRUISE FRA ${cruiseChoice.toUpperCase()} ↗` : "SJEKK CRUISE I EUROPA ↗";
      } else if (currentSearchType === "interhome") {
        button.textContent = state.to ? `SØK FERIEBOLIG I ${state.to.toUpperCase()} 🔎` : "SØK FERIEBOLIG 🔎";
      } else if (currentSearchType === "restplass") {
        button.textContent = state.to ? `SE NAZAR-REISER TIL ${state.to.toUpperCase()} ↗` : "SE CHARTER HOS NAZAR ↗";
      } else if (currentSearchType === "hotel") {
        button.textContent = state.to ? `SØK HOTELL I ${state.to.toUpperCase()} 🔎` : "SØK HOTELL 🔎";
      } else if (currentSearchType === "car") {
        button.textContent = "SJEKK LEIEBILPRISER PÅ ECONOMYBOOKINGS ↗";
      } else if (state.from && state.to) {
        button.textContent = `VIS FLYPRISER ${state.from.toUpperCase()} → ${state.to.toUpperCase()} 🔎`;
      } else {
        button.textContent = "VIS FLYPRISER 🔎";
      }
    }

    if (helper) {
      if (currentSearchType === "package") {
        helper.textContent = state.to ? `Pakkereise: ${state.from || "Oslo"} → ${state.to} • ${state.depart || "velg dato"} til ${state.ret || "velg retur"} • ${state.adults} reisende.` : "Skriv reisemål. Avreisested kan stå tomt, da bruker vi Oslo.";
      } else if (currentSearchType === "cruise") {
        const cruiseChoice = cruiseSearchText(state.from || state.to || cruiseQuickChoice);
        helper.textContent = cruiseChoice ? `Cruise fra ${cruiseChoice} • ${state.depart || "velg fra-dato"} til ${state.ret || "velg til-dato"} • ${state.adults} reisende. Prisene åpnes hos Expedia.` : "Velg en europeisk avreisehavn, eller søk direkte på cruise i Europa hos Expedia.";
      } else if (currentSearchType === "interhome") {
        helper.textContent = state.to ? `Feriebolig: ${state.to} • ${state.depart || "velg ankomst"} til ${state.ret || "velg avreise"} • ${state.adults} voksne${Number(state.children) ? ` og ${state.children} barn` : ""}.` : "Skriv område, by eller sted — så åpnes riktig ferieboligsøk hos Interhome.";
      } else if (currentSearchType === "restplass") {
        helper.textContent = state.to ? `Charter: ${state.from || "valgfri flyplass"} → ${state.to} • fra ${state.depart || "velg dato"} • ${state.adults} voksne${Number(state.children) ? ` og ${state.children} barn` : ""}.` : "Velg dato og reisemål — så åpnes chartervalg med TUI og Nazar.";
      } else if (currentSearchType === "hotel") {
        helper.textContent = state.to ? `Hotellsøk: ${state.to} • ${state.depart} til ${state.ret} • ${state.adults} gjester.` : "Skriv byen du vil bo i — så åpnes Hotels.com rett på hotell i den byen.";
      } else if (currentSearchType === "car") {
        helper.textContent = state.from ? `Leiebil: ${state.from} • ${state.depart || "velg hentedato"} til ${state.ret || "velg levering"}. Prisene åpnes hos EconomyBookings.` : "Skriv hentested eller flyplass — så åpnes leiebilprisene hos EconomyBookings.";
      } else {
        helper.textContent = (state.from && state.to) ? `Flysøk: ${state.from} → ${state.to} • ${state.depart} til ${state.ret} • ${state.adults} reisende.` : "Skriv by eller IATA-kode — velg forslag, så åpnes flypartner med riktig søk.";
      }
    }

    scheduleLivePriceUpdate();
    saveFormToTabState(currentSearchType);
  }

  function affiliateWrap(baseAffiliateUrl, targetUrl) {
    // CJ deep links use the url= parameter. Keep the target fully encoded so
    // the selected partner receives the search parameters after redirect.
    const url = new URL(baseAffiliateUrl);
    if (url.pathname.includes("/affiliates/")) return url.toString();
    url.searchParams.set("url", targetUrl);
    return url.toString();
  }

  function cjDialogLink(baseAffiliateUrl, targetUrl) {
    const url = new URL(baseAffiliateUrl);
    if (!url.pathname.includes("/links/") || !url.pathname.includes("/type/dlg/")) {
      return affiliateWrap(baseAffiliateUrl, targetUrl);
    }
    const prefix = `${url.origin}${url.pathname.split("/type/dlg/")[0]}/type/dlg/`;
    return `${prefix}${targetUrl}`;
  }

  function hotelsBrowserBridge(targetUrl) {
    return `/go/hotels.html#to=${encodeURIComponent(targetUrl)}`;
  }

  function isCreatorAffiliateUrl(value) {
    try {
      return new URL(value).pathname.includes("/affiliates/");
    } catch (error) {
      return false;
    }
  }

  function tradeTrackerDeepLink(baseAffiliateUrl, targetUrl) {
    const url = new URL(baseAffiliateUrl);
    url.searchParams.set("u", targetUrl);
    return url.toString();
  }

  function tradeDoublerDeepLink(baseAffiliateUrl, targetUrl) {
    const url = new URL(baseAffiliateUrl);
    url.searchParams.set("url", targetUrl);
    return url.toString();
  }

  const AIRPORT_CODES = {
    oslo: "OSL", gardermoen: "OSL", osl: "OSL",
    stavanger: "SVG", sola: "SVG", svg: "SVG",
    bergen: "BGO", bgo: "BGO",
    trondheim: "TRD", trd: "TRD",
    tromso: "TOS", tromsø: "TOS", tos: "TOS",
    kristiansand: "KRS", krs: "KRS",
    alesund: "AES", ålesund: "AES", aes: "AES",
    paris: "CDG", cdg: "CDG",
    london: "LON", lon: "LON", heathrow: "LHR", lhr: "LHR",
    roma: "FCO", rome: "FCO", fco: "FCO",
    athen: "ATH", athens: "ATH", athena: "ATH", hellas: "ATH", ath: "ATH",
    rhodos: "RHO", rhodes: "RHO", rho: "RHO",
    kreta: "HER", heraklion: "HER", her: "HER",
    santorini: "JTR", jtr: "JTR",
    barcelona: "BCN", bcn: "BCN",
    malaga: "AGP", málaga: "AGP", agp: "AGP",
    alicante: "ALC", alc: "ALC",
    bangkok: "BKK", bkk: "BKK",
    bali: "DPS", denpasar: "DPS", dps: "DPS",
    dubai: "DXB", dxb: "DXB",
    newyork: "NYC", "new york": "NYC", nyc: "NYC",
    miami: "MIA", mia: "MIA",
    orlando: "ORL", orl: "ORL",
    tokyo: "TYO", tyo: "TYO",
    amsterdam: "AMS", ams: "AMS",
    berlin: "BER", ber: "BER",
    nice: "NCE", nce: "NCE",
    krakow: "KRK", kraków: "KRK", krk: "KRK",
    praha: "PRG", prague: "PRG", prg: "PRG",
    lisboa: "LIS", lisbon: "LIS", lis: "LIS",
    madrid: "MAD", mad: "MAD",
    palma: "PMI", mallorca: "PMI", pmi: "PMI",
    tenerife: "TCI", tci: "TCI",
    gran: "LPA", "gran canaria": "LPA", lpa: "LPA",
    copenhagen: "CPH", københavn: "CPH", cph: "CPH",
    stockholm: "STO", sto: "STO"
  };

  const AIRPORT_SUGGESTIONS = [
    { city:"Oslo", name:"Gardermoen", country:"Norge", code:"OSL", aliases:["oslo", "gardermoen", "osl"] },
    { city:"Bergen", name:"Flesland", country:"Norge", code:"BGO", aliases:["bergen", "flesland", "bgo"] },
    { city:"Stavanger", name:"Sola", country:"Norge", code:"SVG", aliases:["stavanger", "sola", "svg"] },
    { city:"Trondheim", name:"Værnes", country:"Norge", code:"TRD", aliases:["trondheim", "værnes", "varnes", "trd"] },
    { city:"Tromsø", name:"Langnes", country:"Norge", code:"TOS", aliases:["tromsø", "tromso", "tos"] },
    { city:"Kristiansand", name:"Kjevik", country:"Norge", code:"KRS", aliases:["kristiansand", "kjevik", "krs"] },
    { city:"Ålesund", name:"Vigra", country:"Norge", code:"AES", aliases:["ålesund", "alesund", "vigra", "aes"] },
    { city:"Stockholm", name:"Alle flyplasser", country:"Sverige", code:"STO", aliases:["stockholm", "sto", "arn"] },
    { city:"København", name:"Kastrup", country:"Danmark", code:"CPH", aliases:["københavn", "kobenhavn", "copenhagen", "cph"] },
    { city:"London", name:"Alle flyplasser", country:"Storbritannia", code:"LON", aliases:["london", "lon", "heathrow", "gatwick", "lhr", "lgw"] },
    { city:"Paris", name:"Alle flyplasser", country:"Frankrike", code:"PAR", aliases:["paris", "par", "cdg", "orly", "ory"] },
    { city:"Roma", name:"Fiumicino", country:"Italia", code:"FCO", aliases:["roma", "rome", "fco"] },
    { city:"Athen", name:"Eleftherios Venizelos", country:"Hellas", code:"ATH", aliases:["athen", "athens", "athena", "hellas", "ath"] },
    { city:"Rhodos", name:"Diagoras", country:"Hellas", code:"RHO", aliases:["rhodos", "rhodes", "rho"] },
    { city:"Kreta", name:"Heraklion", country:"Hellas", code:"HER", aliases:["kreta", "heraklion", "her"] },
    { city:"Santorini", name:"Santorini", country:"Hellas", code:"JTR", aliases:["santorini", "jtr"] },
    { city:"Barcelona", name:"El Prat", country:"Spania", code:"BCN", aliases:["barcelona", "bcn"] },
    { city:"Malaga", name:"Costa del Sol", country:"Spania", code:"AGP", aliases:["malaga", "málaga", "agp"] },
    { city:"Alicante", name:"Alicante-Elche", country:"Spania", code:"ALC", aliases:["alicante", "alc"] },
    { city:"Palma de Mallorca", name:"Palma", country:"Spania", code:"PMI", aliases:["palma", "mallorca", "pmi"] },
    { city:"Gran Canaria", name:"Las Palmas", country:"Spania", code:"LPA", aliases:["gran canaria", "las palmas", "lpa"] },
    { city:"Tenerife", name:"Alle flyplasser", country:"Spania", code:"TCI", aliases:["tenerife", "tci", "tfs"] },
    { city:"Amsterdam", name:"Schiphol", country:"Nederland", code:"AMS", aliases:["amsterdam", "ams", "schiphol"] },
    { city:"Berlin", name:"Brandenburg", country:"Tyskland", code:"BER", aliases:["berlin", "ber"] },
    { city:"Praha", name:"Václav Havel", country:"Tsjekkia", code:"PRG", aliases:["praha", "prague", "prg"] },
    { city:"Krakow", name:"John Paul II", country:"Polen", code:"KRK", aliases:["krakow", "kraków", "krk"] },
    { city:"Lisboa", name:"Humberto Delgado", country:"Portugal", code:"LIS", aliases:["lisboa", "lisbon", "lis"] },
    { city:"Madrid", name:"Barajas", country:"Spania", code:"MAD", aliases:["madrid", "mad"] },
    { city:"Nice", name:"Côte d’Azur", country:"Frankrike", code:"NCE", aliases:["nice", "nce"] },
    { city:"Dubai", name:"Dubai International", country:"UAE", code:"DXB", aliases:["dubai", "dxb"] },
    { city:"Bangkok", name:"Suvarnabhumi", country:"Thailand", code:"BKK", aliases:["bangkok", "bkk"] },
    { city:"Bali", name:"Denpasar", country:"Indonesia", code:"DPS", aliases:["bali", "denpasar", "dps"] },
    { city:"Tokyo", name:"Alle flyplasser", country:"Japan", code:"TYO", aliases:["tokyo", "tyo", "haneda", "narita"] },
    { city:"New York", name:"Alle flyplasser", country:"USA", code:"NYC", aliases:["new york", "nyc", "jfk", "ewr"] },
    { city:"Miami", name:"Miami International", country:"USA", code:"MIA", aliases:["miami", "mia"] },
    { city:"Orlando", name:"Alle flyplasser", country:"USA", code:"ORL", aliases:["orlando", "orl", "mco"] }
  ];

  function normalizeSearch(value) {
    return String(value || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").trim();
  }

  function findAirportSuggestion(value) {
    const q = normalizeSearch(value).replace(/[^a-z0-9 ]/g, "");
    if (!q) return null;
    return AIRPORT_SUGGESTIONS.find((item) => item.code.toLowerCase() === q || item.aliases.some((alias) => normalizeSearch(alias).replace(/[^a-z0-9 ]/g, "") === q));
  }

  function airportCode(value) {
    const raw = clean(value);
    const parenCode = raw.match(/\(([A-Za-z]{3})\)/);
    if (parenCode) return parenCode[1].toUpperCase();
    const codeMatch = raw.match(/^\s*([A-Za-z]{3})\s*$/);
    if (codeMatch) return codeMatch[1].toUpperCase();
    const suggestion = findAirportSuggestion(raw);
    if (suggestion) return suggestion.code;
    const key = raw.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, "").trim();
    return AIRPORT_CODES[key] || AIRPORT_CODES[key.replace(/\s+/g, "")] || raw;
  }

  function airportDisplay(item) {
    return `${item.city} (${item.code})`;
  }

  function attachAirportAutocomplete(inputId, roleLabel) {
    const input = $(inputId);
    if (!input || input.dataset.autocompleteReady) return;
    input.dataset.autocompleteReady = "1";
    input.setAttribute("autocomplete", "off");
    input.setAttribute("aria-autocomplete", "list");

    const wrap = input.closest("label");
    if (!wrap) return;
    wrap.classList.add("airport-field");
    const list = document.createElement("div");
    list.className = "airport-suggest";
    list.setAttribute("role", "listbox");
    list.setAttribute("aria-label", roleLabel);
    wrap.appendChild(list);
    let currentMatches = [];
    let remoteTimer = null;
    let remoteAbort = null;

    const close = () => { list.innerHTML = ""; list.classList.remove("show"); };
    const choose = (item) => {
      input.value = airportDisplay(item);
      input.dataset.airportCode = item.code;
      close();
      updateSearchPreview();
      input.dispatchEvent(new Event("change", { bubbles:true }));
    };

    const renderMatches = (matches, isCarPickup, sourceLabel = "") => {
      currentMatches = matches;
      if (!matches.length) {
        list.innerHTML = `<div class="airport-empty">Ingen forslag funnet. Skriv by/flyplass, f.eks. Oslo eller OSL.</div>`;
        list.classList.add("show");
        return;
      }

      list.innerHTML = matches.map((item) => `
        <button type="button" role="option" data-airport-code="${item.code}">
          <span><b>${item.city}</b><small>${isCarPickup ? "Hentested" : item.name} • ${item.country}${sourceLabel}</small></span>
          <em>${item.code}</em>
        </button>`).join("");
      list.classList.add("show");
    };

    const localMatches = (q) => AIRPORT_SUGGESTIONS
      .map((item) => {
        const hay = normalizeSearch(`${item.city} ${item.name} ${item.country} ${item.code} ${item.aliases.join(" ")}`);
        const starts = normalizeSearch(item.city).startsWith(q) || item.code.toLowerCase().startsWith(q);
        return hay.includes(q) ? { item, score: starts ? 0 : 1 } : null;
      })
      .filter(Boolean)
      .sort((a,b) => a.score - b.score || a.item.city.localeCompare(b.item.city, "nb"))
      .slice(0, 5)
      .map(({item}) => item);

    const fetchRemoteMatches = (q, isCarPickup) => {
      clearTimeout(remoteTimer);
      if (q.length < 3) return;
      remoteTimer = setTimeout(async () => {
        try {
          if (remoteAbort) remoteAbort.abort();
          remoteAbort = new AbortController();
          const url = new URL("/api/amadeus-airport-search", window.location.origin);
          url.searchParams.set("keyword", q);
          url.searchParams.set("limit", "6");
          const response = await fetch(url.toString(), { signal: remoteAbort.signal });
          const data = await response.json().catch(() => ({}));
          if (!response.ok || !data?.success || !Array.isArray(data.locations)) return;
          const remote = data.locations.map((item) => ({
            city: item.city || item.name || item.code,
            name: item.name || item.city || item.code,
            country: item.country || item.country_code || "",
            code: item.code,
            aliases: [item.city_code, item.code].filter(Boolean)
          }));
          const merged = [...remote, ...currentMatches]
            .filter((item, index, all) => /^[A-Z]{3}$/.test(item.code) && all.findIndex((other) => other.code === item.code) === index)
            .slice(0, 6);
          if (document.activeElement === input && normalizeSearch(input.value) === q) renderMatches(merged, isCarPickup, " • Amadeus");
        } catch (error) {
          if (error?.name !== "AbortError") {
            // Lokale forslag står igjen hvis Amadeus ikke svarer.
          }
        }
      }, 220);
    };

    const render = () => {
      const isCarPickup = currentSearchType === "car" && inputId === "fromCity";
      const isAirRoute = currentSearchType === "flight" || currentSearchType === "package";
      if (!isAirRoute && !isCarPickup) { close(); return; }
      const q = normalizeSearch(input.value);
      if (q.length < 2) { close(); return; }
      renderMatches(localMatches(q), isCarPickup);
      fetchRemoteMatches(q, isCarPickup);
    };

    input.addEventListener("input", () => { delete input.dataset.airportCode; render(); });
    input.addEventListener("focus", render);
    input.addEventListener("blur", () => setTimeout(close, 140));
    list.addEventListener("mousedown", (event) => event.preventDefault());
    list.addEventListener("click", (event) => {
      const button = event.target.closest("[data-airport-code]");
      if (!button) return;
      const item = currentMatches.find((entry) => entry.code === button.dataset.airportCode) || AIRPORT_SUGGESTIONS.find((entry) => entry.code === button.dataset.airportCode);
      if (item) choose(item);
    });
  }

  function buildFlightDirectUrl(state) {
    const depart = state.depart || fallbackDepartISO();
    const ret = state.ret || fallbackReturnISO(depart);
    const kiwiTarget = new URL("https://www.kiwi.com/deep");
    kiwiTarget.searchParams.set("from", airportCode(state.from));
    kiwiTarget.searchParams.set("to", airportCode(state.to));
    kiwiTarget.searchParams.set("departure", depart);
    kiwiTarget.searchParams.set("return", ret);
    kiwiTarget.searchParams.set("adults", state.adults);
    if (Number(state.children)) kiwiTarget.searchParams.set("children", state.children);
    kiwiTarget.searchParams.set("locale", "no");
    kiwiTarget.searchParams.set("lang", "no");
    kiwiTarget.searchParams.set("currency", "NOK");
    kiwiTarget.searchParams.set("partner_market", "NO");

    const travelpayouts = new URL(AFFILIATE_LINKS.kiwi);
    travelpayouts.searchParams.set("shmarker", `${TRAVELPAYOUTS_MARKER}.billigreiser_fly`);
    travelpayouts.searchParams.set("promo_id", "3791");
    travelpayouts.searchParams.set("source_type", "customlink");
    travelpayouts.searchParams.set("type", "click");
    travelpayouts.searchParams.set("custom_url", kiwiTarget.toString());
    return travelpayouts.toString();
  }

  function buildFlightUrl(state) {
    // Safe fallback only. Affiliate tracking is attempted in buildFlightPartnerUrl().
    return buildFlightDirectUrl(state);
  }

  async function buildFlightPartnerUrl(state) {
    // Kiwi-deeplinken åpner valgt rute, mens Travelpayouts beholder sporingen.
    return buildFlightDirectUrl(state);
  }

  function buildFlightSearchTarget(baseUrl, state) {
    const from = airportCode(state.from);
    const to = airportCode(state.to);
    const depart = state.depart || fallbackDepartISO();
    const ret = state.ret || fallbackReturnISO(depart);
    const adults = Math.max(1, Number(state.adults || 1));
    const children = Math.max(0, Number(state.children || 0));
    const url = new URL(baseUrl);
    url.searchParams.set("trip", "roundtrip");
    url.searchParams.set("mode", "search");
    url.searchParams.set("leg1", `from:${from},to:${to},departure:${depart}TANYT`);
    url.searchParams.set("leg2", `from:${to},to:${from},departure:${ret}TANYT`);
    url.searchParams.set("passengers", `adults:${adults}${children ? `,children:${children}` : ""}`);
    url.searchParams.set("options", "cabinclass:economy");
    return url.toString();
  }

  const EXPEDIA_FLIGHT_PLACES = {
    OSL: "Oslo (OSL-Gardermoen)",
    BGO: "Bergen (BGO-Flesland)",
    SVG: "Stavanger (SVG-Sola)",
    TRD: "Trondheim (TRD-Værnes)",
    TOS: "Tromsø (TOS-Langnes)",
    KRS: "Kristiansand (KRS-Kjevik)",
    AES: "Ålesund (AES-Vigra)",
    BKK: "Bangkok, Bangkok (provins), Thailand",
    HKT: "Phuket, Phuket (provins), Thailand",
    KBV: "Krabi, Krabi (provins), Thailand",
    USM: "Koh Samui, Surat Thani (provins), Thailand",
    CNX: "Chiang Mai, Chiang Mai (provins), Thailand",
    HDY: "Hat Yai, Songkhla (provins), Thailand",
    FCO: "Roma (FCO-Fiumicino - Leonardo da Vinci intl.)",
    ALC: "Alicante (ALC-Alicante internasjonale flyplass)",
    PMI: "Palma de Mallorca (PMI)",
    KRK: "Krakow (KRK-John Paul II - Balice)",
    BCN: "Barcelona (BCN-Barcelona internasjonale flyplass)",
    AGP: "Malaga (AGP)",
    MAD: "Madrid (MAD-Adolfo Suárez Madrid-Barajas)"
  };

  function expediaFlightPlace(value) {
    const code = airportCode(value);
    return EXPEDIA_FLIGHT_PLACES[code] || clean(value, code);
  }

  function expediaDotDate(value) {
    const date = parseISODate(value);
    if (!date) return value;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}.${month}.${date.getFullYear()}`;
  }

  function expediaLooseISO(value) {
    const date = parseISODate(value);
    if (!date) return value;
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  function buildExpediaFlightSearchUrl(state) {
    const fromPlace = expediaFlightPlace(state.from);
    const toPlace = expediaFlightPlace(state.to);
    const depart = state.depart || fallbackDepartISO();
    const ret = state.ret || fallbackReturnISO(depart);
    const adults = Math.max(1, Number(state.adults || 1));
    const children = Math.max(0, Number(state.children || 0));
    const passengers = [`adults:${adults}`];
    if (children) passengers.push(`children:${children}`);
    passengers.push("infantinlap:N");

    const url = new URL("https://www.expedia.no/Flights-Search");
    url.searchParams.set("flight-type", "on");
    url.searchParams.set("mode", "search");
    url.searchParams.set("trip", "roundtrip");
    url.searchParams.set("leg1", `from:${fromPlace},to:${toPlace},departure:${expediaDotDate(depart)}TANYT,fromType:U,toType:U`);
    url.searchParams.set("leg2", `from:${toPlace},to:${fromPlace},departure:${expediaDotDate(ret)}TANYT,fromType:U,toType:U`);
    url.searchParams.set("options", "cabinclass:economy");
    url.searchParams.set("fromDate", expediaDotDate(depart));
    url.searchParams.set("toDate", expediaDotDate(ret));
    url.searchParams.set("d1", expediaLooseISO(depart));
    url.searchParams.set("d2", expediaLooseISO(ret));
    url.searchParams.set("passengers", passengers.join(","));
    return url.toString();
  }

  function buildExpediaFlightUrl(state) {
    try {
      return affiliateWrap(AFFILIATE_LINKS.expedia, buildExpediaFlightSearchUrl(state));
    } catch (error) {
      return AFFILIATE_LINKS.expedia;
    }
  }

  const CHEAPTICKETS_FLIGHT_PLACES = {
    OSL: { label: "Oslo (and vicinity), Norway", type: "MULTICITY" },
    BGO: { label: "Bergen, Norway (BGO-Flesland)", type: "AIRPORT" },
    SVG: { label: "Stavanger, Norway (SVG-Sola)", type: "AIRPORT" },
    TRD: { label: "Trondheim, Norway (TRD-Vaernes)", type: "AIRPORT" },
    TOS: { label: "Tromso, Norway (TOS-Langnes)", type: "AIRPORT" },
    BKK: { label: "Bangkok, Thailand (BKK-All Airports)", type: "METROCODE" },
    HKT: { label: "Phuket, Thailand (HKT-Phuket Intl.)", type: "AIRPORT" },
    KBV: { label: "Krabi, Thailand (KBV-Krabi Intl.)", type: "AIRPORT" },
    USM: { label: "Koh Samui, Thailand (USM)", type: "AIRPORT" },
    CNX: { label: "Chiang Mai, Thailand (CNX-Chiang Mai Intl.)", type: "AIRPORT" },
    HDY: { label: "Hat Yai, Thailand (HDY-Hat Yai Intl.)", type: "AIRPORT" },
    FCO: { label: "Rome, Italy (FCO-Fiumicino - Leonardo da Vinci Intl.)", type: "AIRPORT" },
    ALC: { label: "Alicante, Spain (ALC-Alicante Intl.)", type: "AIRPORT" },
    PMI: { label: "Palma de Mallorca, Spain (PMI)", type: "AIRPORT" },
    KRK: { label: "Krakow, Poland (KRK-John Paul II - Balice)", type: "AIRPORT" },
    BCN: { label: "Barcelona, Spain (BCN-Barcelona Intl.)", type: "AIRPORT" },
    AGP: { label: "Malaga, Spain (AGP)", type: "AIRPORT" },
    MAD: { label: "Madrid, Spain (MAD-Adolfo Suarez Madrid-Barajas)", type: "AIRPORT" }
  };

  function cheapTicketsFlightPlace(value) {
    const code = airportCode(value);
    return CHEAPTICKETS_FLIGHT_PLACES[code] || { label: clean(value, code), type: /^[A-Z]{3}$/.test(code) ? "AIRPORT" : "MULTICITY" };
  }

  function slashDate(value) {
    const date = parseISODate(value);
    if (!date) return value;
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  function buildCheapTicketsFlightSearchUrl(state) {
    const from = cheapTicketsFlightPlace(state.from);
    const to = cheapTicketsFlightPlace(state.to);
    const depart = state.depart || fallbackDepartISO();
    const ret = state.ret || fallbackReturnISO(depart);
    const adults = Math.max(1, Number(state.adults || 1));
    const children = Math.max(0, Number(state.children || 0));
    const passengers = [`adults:${adults}`];
    if (children) passengers.push(`children:${children}`);
    passengers.push("infantinlap:N");

    const url = new URL("https://www.cheaptickets.com/Flights-Search");
    url.searchParams.set("flight-type", "on");
    url.searchParams.set("mode", "search");
    url.searchParams.set("trip", "roundtrip");
    url.searchParams.set("leg1", `from:${from.label},to:${to.label},departure:${slashDate(depart)}TANYT,fromType:${from.type},toType:${to.type}`);
    url.searchParams.set("leg2", `from:${to.label},to:${from.label},departure:${slashDate(ret)}TANYT,fromType:${to.type},toType:${from.type}`);
    url.searchParams.set("options", "cabinclass:economy");
    url.searchParams.set("fromDate", slashDate(depart));
    url.searchParams.set("toDate", slashDate(ret));
    url.searchParams.set("d1", expediaLooseISO(depart));
    url.searchParams.set("d2", expediaLooseISO(ret));
    url.searchParams.set("passengers", passengers.join(","));
    return url.toString();
  }

  function buildIberiaFlightUrl(state) {
    try {
      return cjDialogLink(AFFILIATE_LINKS.iberia, "https://www.iberia.com/no/flight-search/");
    } catch (error) {
      return AFFILIATE_LINKS.iberia;
    }
  }

  function buildMalaysiaAirlinesUrl(state) {
    try {
      return cjDialogLink(AFFILIATE_LINKS.malaysiaAirlines, "https://www.malaysiaairlines.com/no/en/booking/flight-search.html");
    } catch (error) {
      return AFFILIATE_LINKS.malaysiaAirlines;
    }
  }

  function buildCheapFlightFareUrl(state) {
    const base = AFFILIATE_LINKS.cheapFlightFares || "";
    const target = AFFILIATE_LINKS.cheapFlightFaresSearch || "https://www.cheapflightsfares.com/flights";
    try {
      if (!base) return target;
      const url = new URL(base);
      if (url.pathname.includes("/links/") && url.pathname.includes("/type/dlg/")) {
        return cjDialogLink(base, target);
      }
      if (/(\.|^)(kqzyfj|jdoqocy|tkqlhce|dpbolvw|anrdoezrs)\.com$/i.test(url.hostname)) {
        return affiliateWrap(base, target);
      }
      return url.toString();
    } catch (error) {
      return base || target;
    }
  }

  function buildCheapTicketsUrl(state) {
    const target = buildCheapTicketsFlightSearchUrl(state);
    try {
      return cjDialogLink(AFFILIATE_LINKS.cheapTickets, target);
    } catch (error) {
      return AFFILIATE_LINKS.cheapTickets || target;
    }
  }

  function buildHotelUrl(state) {
    // Hotels.com Norge: behold norsk domene og tving norske innstillinger videre
    // gjennom CJ-redirecten, slik at brukeren lander med norsk språk og NOK-priser.
    const url = new URL("https://no.hotels.com/Hotel-Search");
    url.searchParams.set("destination", state.to);
    url.searchParams.set("startDate", state.depart);
    url.searchParams.set("endDate", state.ret);
    url.searchParams.set("rooms", "1");
    url.searchParams.set("adults", state.adults);
    if (Number(state.children)) url.searchParams.set("children", state.children);
    url.searchParams.set("locale", "no_NO");
    url.searchParams.set("currency", "NOK");
    url.searchParams.set("pos", "HCOM_NO");
    url.searchParams.set("siteid", "300000012");
    return hotelsBrowserBridge(affiliateWrap(AFFILIATE_LINKS.hotels, url.toString()));
  }

  function travelpayoutsCustomLink(clickBase, promoId, targetUrl, markerSuffix) {
    const url = new URL(clickBase || "https://c10.travelpayouts.com/click");
    url.searchParams.set("shmarker", `${TRAVELPAYOUTS_MARKER}.${markerSuffix}`);
    url.searchParams.set("promo_id", promoId || "2018");
    url.searchParams.set("source_type", "customlink");
    url.searchParams.set("type", "click");
    url.searchParams.set("custom_url", targetUrl);
    return url.toString();
  }

  function cleanPickupPlace(value) {
    return clean(value)
      .replace(/\s*\([A-Za-z]{3}\)\s*$/i, "")
      .replace(/\b(lufthavn|airport|flyplass)\b/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function buildEconomyBookingsTarget(state) {
    const pickup = clean(state.from);
    const code = airportCode(pickup);
    const target = new URL("https://www.economybookings.com/en");
    if (/^[A-Z]{3}$/.test(code)) {
      target.searchParams.set("idpickval", code);
    } else {
      target.searchParams.set("idpick", cleanPickupPlace(pickup) || "Alicante");
    }
    return target.toString();
  }

  function buildCarDirectUrl(state) {
    if (!state?.from) return AFFILIATE_LINKS.economyBookingsEurope || AFFILIATE_LINKS.economyBookings || "https://economybookings.tpx.gr/LT8vc2kD";
    return travelpayoutsCustomLink(
      AFFILIATE_LINKS.economyBookingsClick,
      AFFILIATE_LINKS.economyBookingsPromoId,
      buildEconomyBookingsTarget(state),
      "billigreiser_car"
    );
  }


  function buildCarUrl(state) {
    // EconomyBookings støtter forhåndsutfylt hentested via Travelpayouts deep link.
    return buildCarDirectUrl(state);
  }

  async function buildCarPartnerUrl(state) {
    return buildCarDirectUrl(state);
  }

  const INTERHOME_DESTINATIONS = {
    spania: "5460aeae487f8",
    spain: "5460aeae487f8",
    italia: "5460aeae078f7",
    italy: "5460aeae078f7",
    frankrike: "5460aeb1b0bf2",
    france: "5460aeb1b0bf2",
    norge: "5460aea85799e",
    norway: "5460aea85799e",
    kroatia: "5460aeaaa3139",
    croatia: "5460aeaaa3139",
    danmark: "5460aeb07b41a",
    denmark: "5460aeb07b41a",
    portugal: "5460aecfccf0c",
    sveits: "5460aea910151",
    switzerland: "5460aea910151",
    sverige: "5460aea8a7782",
    sweden: "5460aea8a7782",
    toscana: "5460aeb357636",
    tuscany: "5460aeb357636",
    "costa blanca": "5460aeae7e340",
    alicante: "5460aeae7e340",
    benidorm: "5460aeae7e340",
    calpe: "5460aeae7180f",
    "calpe calp": "5460aeae7180f",
    denia: "5adf5aac56557",
    dénia: "5adf5aac56557",
    javea: "594b56d5b4c99",
    "jávea": "594b56d5b4c99",
    "costa del sol": "5460aecaa212c",
    malaga: "5460aecaa212c",
    marbella: "5460aecaa212c",
    fuengirola: "5460aecaa212c",
    torremolinos: "5460aecaa212c",
    mallorca: "5460aec60bc58",
    palma: "5460aec60bc58",
    "costa brava": "5460aeae704b7",
    "cote d azur": "5460aec0514e4",
    "côte d azur": "5460aec0514e4",
    "côte d'azur": "5460aec0514e4",
    dalmatia: "5460aeb3581cb",
    dalmatiaen: "5460aeb3581cb"
  };

  const TUI_RESTPLASS_DESTINATIONS = {
    mallorca: "/feriereiser/spania/mallorca/restplasser/",
    kreta: "/feriereiser/hellas/kreta/restplasser/",
    rhodos: "/feriereiser/hellas/rhodos/restplasser/",
    samos: "/feriereiser/hellas/samos/restplasser/",
    kypros: "/feriereiser/kypros/restplasser/",
    tyrkia: "/feriereiser/tyrkia/restplasser/",
    kroatia: "/feriereiser/kroatia/restplasser/",
    bulgaria: "/feriereiser/bulgaria/restplasser/"
  };

  const CRUISE_PORT_LINKS = {
    europa: "https://www.expedia.com/Cruises-to-Europe.d6022967.Travel-Guide-Cruise",
    europe: "https://www.expedia.com/Cruises-to-Europe.d6022967.Travel-Guide-Cruise",
    middelhavet: "https://www.expedia.com/Cruises-from-Barcelona.d179992.Cruise-Departure-Port",
    mediterranean: "https://www.expedia.com/Cruises-from-Barcelona.d179992.Cruise-Departure-Port",
    barcelona: "https://www.expedia.com/Cruises-from-Barcelona.d179992.Cruise-Departure-Port",
    spania: "https://www.expedia.com/Cruises-from-Barcelona.d179992.Cruise-Departure-Port",
    athen: "https://www.expedia.com/Cruises-from-Athens.d178231.Cruise-Departure-Port",
    athens: "https://www.expedia.com/Cruises-from-Athens.d178231.Cruise-Departure-Port",
    pireus: "https://www.expedia.com/Cruises-from-Athens.d178231.Cruise-Departure-Port",
    piraeus: "https://www.expedia.com/Cruises-from-Athens.d178231.Cruise-Departure-Port",
    hellas: "https://www.expedia.com/Cruises-from-Athens.d178231.Cruise-Departure-Port",
    "greske øyer": "https://www.expedia.com/Cruises-from-Athens.d178231.Cruise-Departure-Port",
    "greske oyer": "https://www.expedia.com/Cruises-from-Athens.d178231.Cruise-Departure-Port",
    københavn: "https://www.expedia.com/Cruises-from-Copenhagen.d178252.Cruise-Departure-Port",
    kobenhavn: "https://www.expedia.com/Cruises-from-Copenhagen.d178252.Cruise-Departure-Port",
    copenhagen: "https://www.expedia.com/Cruises-from-Copenhagen.d178252.Cruise-Departure-Port",
    "nord europa": "https://www.expedia.com/Cruises-from-Copenhagen.d178252.Cruise-Departure-Port",
    "northern europe": "https://www.expedia.com/Cruises-from-Copenhagen.d178252.Cruise-Departure-Port",
    genova: "https://www.expedia.com/Cruises-from-Genoa.d6055038.Cruise-Departure-Port",
    genoa: "https://www.expedia.com/Cruises-from-Genoa.d6055038.Cruise-Departure-Port",
    marseille: "https://www.expedia.com/Cruises-from-Marseille.d179895.Cruise-Departure-Port",
    napoli: "https://www.expedia.com/Cruises-from-Naples.d6034774.Cruise-Departure-Port",
    naples: "https://www.expedia.com/Cruises-from-Naples.d6034774.Cruise-Departure-Port",
    oslo: "https://www.expedia.com/Cruises-from-Oslo.d178295.Cruise-Departure-Port",
    norge: "https://www.expedia.com/Cruises-from-Oslo.d178295.Cruise-Departure-Port",
    norway: "https://www.expedia.com/Cruises-from-Oslo.d178295.Cruise-Departure-Port",
    fjord: "https://www.expedia.com/Cruises-from-Oslo.d178295.Cruise-Departure-Port",
    fjorder: "https://www.expedia.com/Cruises-from-Oslo.d178295.Cruise-Departure-Port",
    "norske fjorder": "https://www.expedia.com/Cruises-from-Oslo.d178295.Cruise-Departure-Port",
    stockholm: "https://www.expedia.com/Cruises-from-Stockholm.d178311.Cruise-Departure-Port",
    østersjøen: "https://www.expedia.com/Cruises-from-Stockholm.d178311.Cruise-Departure-Port",
    ostersjoen: "https://www.expedia.com/Cruises-from-Stockholm.d178311.Cruise-Departure-Port",
    baltic: "https://www.expedia.com/Cruises-from-Stockholm.d178311.Cruise-Departure-Port",
    trieste: "https://www.expedia.com/Cruises-from-Province-Of-Trieste.d3536.Cruise-Departure-Port",
    adriaterhavet: "https://www.expedia.com/Cruises-from-Province-Of-Trieste.d3536.Cruise-Departure-Port",
    adriatic: "https://www.expedia.com/Cruises-from-Province-Of-Trieste.d3536.Cruise-Departure-Port",
    valencia: "https://www.expedia.com/Cruises-from-Valencia-Province.d6023332.Cruise-Departure-Port",
    venezia: "https://www.expedia.com/Cruises-from-Venice.d179981.Cruise-Departure-Port",
    venice: "https://www.expedia.com/Cruises-from-Venice.d179981.Cruise-Departure-Port"
  };

  let tuiQuickTargetPath = "";
  let charterQuickChoice = "";
  let cruiseQuickChoice = "";

  function destinationKey(value) {
    return normalizeSearch(value).replace(/[^a-z0-9 ]/g, "").trim();
  }

  function stripTravelWords(value) {
    return clean(value)
      .replace(/\b(fly\s*(\+|og)\s*hotell|pakkereise|pakke\s*reise|fly|flight|feriebolig|feriehus|ferieboliger|holiday\s*home|holiday\s*rental|villa|hytte|hytter|leilighet|leiligheter)\b/gi, " ")
      .replace(/\b(finn|søk|sok|se|åpne|apne|med|for)\b/gi, " ")
      .replace(/\b\d+\s*(voksen|voksne|adult|adults|barn|child|children)\b/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function parseRouteQuery(value) {
    const raw = stripTravelWords(value);
    const fromTo = raw.match(/(?:fra|from)\s+(.+?)\s+(?:til|to)\s+(.+)$/i);
    if (fromTo) return { from: stripTravelWords(fromTo[1]), to: stripTravelWords(fromTo[2]) };
    const toOnly = raw.match(/^(?:til|to)\s+(.+)$/i);
    if (toOnly) return { from: "", to: stripTravelWords(toOnly[1]) };
    const localOnly = raw.match(/^(?:i|på)\s+(.+)$/i);
    if (localOnly) return { from: "", to: stripTravelWords(localOnly[1]) };
    const loose = raw.match(/^(.+?)\s+(?:til|to)\s+(.+)$/i);
    if (loose) return { from: stripTravelWords(loose[1]), to: stripTravelWords(loose[2]) };
    return { from: "", to: stripTravelWords(raw) };
  }

  function interhomeSearchText(value) {
    return stripTravelWords(value)
      .replace(/\s*\([A-Z]{3}\)\s*$/i, "")
      .replace(/^(til|to|i|på|pa)\s+/i, "")
      .trim();
  }

  const INTERHOME_PATHS = {
    spania: "/spania/",
    spain: "/spania/",
    italia: "/italia/",
    italy: "/italia/",
    frankrike: "/frankrike/",
    france: "/frankrike/",
    norge: "/norge/",
    norway: "/norge/",
    kroatia: "/kroatia/",
    croatia: "/kroatia/",
    barcelona: "/spania/barcelona-nordkysten/barcelona/",
    madrid: "/spania/madrid/",
    valencia: "/spania/valencia/",
    sevilla: "/spania/andalucia/sevilla/",
    seville: "/spania/andalucia/sevilla/",
    ibiza: "/spania/ibiza/",
    "costa brava": "/spania/barcelona-nordkysten/barcelona/",
    lloret: "/spania/barcelona-nordkysten/barcelona/",
    "lloret de mar": "/spania/barcelona-nordkysten/barcelona/",
    mallorca: "/spania/mallorca/",
    palma: "/spania/mallorca/",
    malaga: "/spania/costa-del-sol/malaga/",
    málaga: "/spania/costa-del-sol/malaga/",
    marbella: "/spania/costa-del-sol/marbella/",
    fuengirola: "/spania/costa-del-sol/malaga/",
    nerja: "/spania/costa-del-sol/malaga/",
    alicante: "/spania/costa-blanca/alicante/",
    benidorm: "/spania/costa-blanca/benidorm/",
    calpe: "/spania/costa-blanca/alicante/",
    denia: "/spania/costa-blanca/alicante/",
    dénia: "/spania/costa-blanca/alicante/",
    javea: "/spania/costa-blanca/alicante/",
    "jávea": "/spania/costa-blanca/alicante/",
    "gran canaria": "/spania/kanarioyene-gran-canaria/",
    tenerife: "/spania/kanarioyene-tenerife/",
    toscana: "/italia/toscana/",
    tuscany: "/italia/toscana/",
    piemonte: "/italia/piemonte/",
    "cote d azur": "/frankrike/cote-d-azur/",
    "côte d azur": "/frankrike/cote-d-azur/",
    "côte d'azur": "/frankrike/cote-d-azur/",
    dalmatia: "/kroatia/dalmatia/",
    dalmatiaen: "/kroatia/dalmatia/",
    danmark: "/danmark/",
    denmark: "/danmark/",
    portugal: "/portugal/",
    sveits: "/sveits/",
    switzerland: "/sveits/",
    sverige: "/sverige/",
    sweden: "/sverige/",
    tyskland: "/tyskland/",
    germany: "/tyskland/",
    østerrike: "/osterrike/",
    osterrike: "/osterrike/",
    austria: "/osterrike/"
  };

  function interhomeDestinationPath(value) {
    const key = destinationKey(value);
    if (INTERHOME_PATHS[key]) return INTERHOME_PATHS[key];
    const match = Object.keys(INTERHOME_PATHS)
      .sort((a, b) => b.length - a.length)
      .find((item) => key === item || key.includes(item));
    return match ? INTERHOME_PATHS[match] : "";
  }

  function interhomeDestinationId(value) {
    const key = destinationKey(value);
    if (INTERHOME_DESTINATIONS[key]) return INTERHOME_DESTINATIONS[key];
    const match = Object.keys(INTERHOME_DESTINATIONS)
      .sort((a, b) => b.length - a.length)
      .find((item) => key.includes(item));
    return match ? INTERHOME_DESTINATIONS[match] : "";
  }

  function cruiseSearchText(value) {
    return clean(value)
      .replace(/\b(cruise|cruises|cruiseferie|cruisetur|cruisereise|havn|havner|port|departure|avreisehavn|søk|sok|finn|se|åpne|apne|fra|from|til|to|i|på|pa)\b/gi, " ")
      .replace(/\b\d+\s*(voksen|voksne|adult|adults|barn|child|children)\b/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function cruiseTargetUrl(value) {
    const key = destinationKey(value || "europa");
    if (CRUISE_PORT_LINKS[key]) return CRUISE_PORT_LINKS[key];
    const match = Object.keys(CRUISE_PORT_LINKS)
      .sort((a, b) => b.length - a.length)
      .find((item) => key === item || key.includes(item));
    return match ? CRUISE_PORT_LINKS[match] : CRUISE_PORT_LINKS.europa;
  }

  function withExpediaCruiseTracking(targetUrl, state = {}) {
    const target = new URL(targetUrl || DEFAULT_EXPEDIA_CRUISE_URL);
    const configured = (window.BR_AFFILIATES && window.BR_AFFILIATES.cruise) || AFFILIATE_LINKS.cruise || "";
    try {
      const source = new URL(configured);
      ["siid", "referrer"].forEach((param) => {
        const value = source.searchParams.get(param);
        if (value && !target.searchParams.has(param)) target.searchParams.set(param, value);
      });
    } catch (error) {}
    if (validISO(state.depart)) target.searchParams.set("startdate", state.depart);
    if (validISO(state.ret)) target.searchParams.set("enddate", state.ret);
    return target.toString();
  }

  function appendInterhomeSearchParams(target, state, searchText = "") {
    const url = new URL(target);
    const depart = validISO(state.depart) ? state.depart : fallbackDepartISO();
    const ret = validISO(state.ret) && state.ret > depart ? state.ret : fallbackReturnISO(depart);
    const adults = Math.max(1, Math.min(9, Number(state.adults) || 2));
    const children = Math.max(0, Math.min(8, Number(state.children) || 0));
    const guests = adults + children;

    if (searchText) {
      url.searchParams.set("destination", searchText);
      url.searchParams.set("q", searchText);
    }
    url.searchParams.set("arrival", depart);
    url.searchParams.set("duration", String(Math.max(1, Math.round(((parseISODate(ret) || new Date(ret)) - (parseISODate(depart) || new Date(depart))) / 86400000) || 7)));
    url.searchParams.set("departure", ret);
    url.searchParams.set("checkin", depart);
    url.searchParams.set("checkout", ret);
    url.searchParams.set("adults", String(adults));
    url.searchParams.set("persons", String(guests));
    url.searchParams.set("guests", String(guests));
    if (children) url.searchParams.set("children", String(children));

    return url.toString();
  }

  function buildInterhomeUrl(state) {
    const searchText = interhomeSearchText(state.to || "");
    const id = interhomeDestinationId(searchText);
    let target = id ? `https://www.interhome.no/search/${id}` : "https://www.interhome.no/search/";
    target = appendInterhomeSearchParams(target, state, searchText);
    return tradeTrackerDeepLink(AFFILIATE_LINKS.interhome, target);
  }

  function buildTuiRestplassUrl(state) {
    const path = tuiQuickTargetPath || TUI_RESTPLASS_DESTINATIONS[destinationKey(state.to)] || "/tilbud/restplass/";
    const target = new URL(path, "https://www.tui.no");
    return tradeTrackerDeepLink(AFFILIATE_LINKS.tuiRestplass, target.toString());
  }

  function buildNazarCharterUrl() {
    return tradeDoublerDeepLink(AFFILIATE_LINKS.nazar, "https://www.nazar.no/");
  }

  function buildCharterUrl(state) {
    const depart = state.depart || fallbackDepartISO();
    const ret = state.ret && state.ret > depart ? state.ret : fallbackReturnISO(depart);
    const url = new URL("charter-reiser.html", window.location.href);
    if (state.from) url.searchParams.set("from", state.from);
    if (state.to) url.searchParams.set("to", state.to);
    url.searchParams.set("depart", depart);
    url.searchParams.set("return", ret);
    url.searchParams.set("adults", state.adults);
    if (Number(state.children)) url.searchParams.set("children", state.children);
    if (charterQuickChoice) url.searchParams.set("choice", charterQuickChoice);
    return url.toString();
  }

  function applyTuiQuickChoice(choice) {
    setSearchType("restplass");
    charterQuickChoice = choice || "";
    tuiQuickTargetPath = {
      week: "/tilbud/restplass/",
      family: "/reise/familieferie/",
      "all-inclusive": "/reise/all-inclusive/",
      "tui-packages": "/reise/pakkereiser/"
    }[choice] || "";
    const today = new Date();
    const depart = new Date(today);
    depart.setDate(today.getDate() + (choice === "week" ? 3 : 14));
    const ret = new Date(depart);
    ret.setDate(depart.getDate() + 7);
    const iso = (date) => date.toISOString().slice(0, 10);
    const destinations = { mallorca: "Mallorca", kreta: "Kreta", rhodos: "Rhodos" };

    if ($("departDate")) $("departDate").value = iso(depart);
    if ($("returnDate")) $("returnDate").value = iso(ret);
    if ($("toCity")) $("toCity").value = destinations[choice] || "";
    if ($("fromCity") && !$("fromCity").value) $("fromCity").value = "Oslo";

    const helper = document.querySelector(".search-help");
    const copy = {
      week: "Restplass er valgt. Åpne chartervalget for TUI og Nazar.",
      mallorca: "Mallorca er valgt. Åpne chartervalget for TUI og Nazar.",
      kreta: "Kreta er valgt. Åpne chartervalget for TUI og Nazar.",
      rhodos: "Rhodos er valgt. Åpne chartervalget for TUI og Nazar.",
      family: "Familieferie er valgt. Åpne chartervalget for TUI og Nazar.",
      "all-inclusive": "All Inclusive er valgt. Åpne chartervalget for TUI og Nazar.",
      "tui-packages": "TUI pakkereiser er valgt. Åpne chartervalget for flere valg."
    }[choice];
    updateSearchPreview();
    if (helper && copy) helper.textContent = copy;
    $("toCity")?.focus();
  }

  function openCharterSpotlight(choice) {
    applyTuiQuickChoice(choice);
    window.open(buildCharterUrl(readSearchState({ forUrl: true })), "_blank", "noopener,noreferrer");
  }

  function applyInterhomeQuickChoice(destination) {
    setSearchType("interhome");
    if ($("fromCity")) $("fromCity").value = "";
    if ($("toCity")) $("toCity").value = destination || "";

    const today = new Date();
    const depart = new Date(today);
    depart.setDate(today.getDate() + 14);
    const ret = new Date(depart);
    ret.setDate(depart.getDate() + 7);
    const iso = (date) => date.toISOString().slice(0, 10);

    if ($("departDate") && !$("departDate").value) $("departDate").value = iso(depart);
    if ($("returnDate") && !$("returnDate").value) $("returnDate").value = iso(ret);

    updateSearchPreview();
    $("toCity")?.focus();
  }

  function applyCruiseQuickChoice(port) {
    setSearchType("cruise");
    cruiseQuickChoice = port || "Europa";
    if ($("fromCity")) $("fromCity").value = cruiseQuickChoice;
    if ($("toCity")) $("toCity").value = "";

    updateSearchPreview();
    openDateRangePicker();
  }

  function openHotelPick(destination) {
    setSearchType("hotel");
    if ($("toCity")) $("toCity").value = destination || "";
    updateSearchPreview();
    $("travelSearch")?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(openDateRangePicker, 320);
  }

  function buildPackageUrl(state) {
    return buildExpediaPackageSearchUrl(state);
  }

  function buildExpediaPackageSearchUrl(state) {
    const depart = state.depart || fallbackDepartISO();
    const ret = state.ret && state.ret > depart ? state.ret : fallbackReturnISO(depart);
    const departDate = parseISODate(depart) || parseISODate(fallbackDepartISO());
    const returnDate = parseISODate(ret) || parseISODate(fallbackReturnISO(depart));
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const daysInFuture = Math.max(1, Math.round((departDate - today) / 86400000));
    const stayLength = Math.max(1, Math.round((returnDate - departDate) / 86400000));
    const url = new URL("/go/package/search/FlightHotel/", "https://www.expedia.no");
    url.searchParams.set("FromAirport", airportCode(state.from || "Oslo"));
    url.searchParams.set("Destination", airportCode(state.to));
    url.searchParams.set("NumRoom", "1");
    url.searchParams.set("NumAdult", state.adults);
    url.searchParams.set("DaysInFuture", String(daysInFuture));
    url.searchParams.set("StayLength", String(stayLength));
    url.searchParams.set("sort", "recommended");
    const childCount = Math.max(0, Math.min(4, Number(state.children) || 0));
    if (childCount) {
      url.searchParams.set("NumChild", String(childCount));
      for (let index = 1; index <= childCount; index += 1) {
        url.searchParams.set(`Room1-Child${index}Age`, "8");
      }
    }
    return url.toString();
  }

  function buildCruiseUrl(state) {
    const place = cruiseSearchText(state.from || state.to || cruiseQuickChoice || "Europa");
    return withExpediaCruiseTracking(cruiseTargetUrl(place), state);
  }

  let livePriceTimer = null;
  let livePriceAbort = null;
  let flightConfirmAbort = null;
  let flightConfirmKeyHandler = null;

  function formatNOK(value) {
    try {
      return new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK", maximumFractionDigits: 0 }).format(Number(value));
    } catch (e) {
      return `${Math.round(Number(value) || 0)} kr`;
    }
  }

  const AIRLINE_NAMES = {
    IB: "Iberia",
    MH: "Malaysia Airlines",
    QR: "Qatar Airways",
    EK: "Emirates",
    TK: "Turkish Airlines",
    KL: "KLM",
    AF: "Air France",
    LH: "Lufthansa",
    SK: "SAS",
    DY: "Norwegian",
    AY: "Finnair",
    TG: "Thai Airways"
  };

  function airlineName(code) {
    const clean = String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 2);
    return AIRLINE_NAMES[clean] || clean || "Flyselskap";
  }

  function buildFlightChoicePartners(state, offers = []) {
    return [
      {
        label: "Kiwi",
        href: buildFlightDirectUrl(state),
        meta: "Åpne valgt rute"
      }
    ].filter((partner) => partner.href);
  }

  const LIVE_DEAL_ROUTES = [
    { from: "OSL", fromCity: "Oslo", to: "BKK", toCity: "Bangkok", days: 38, nights: 10 },
    { from: "OSL", fromCity: "Oslo", to: "MAD", toCity: "Madrid", days: 20, nights: 5 },
    { from: "OSL", fromCity: "Oslo", to: "KUL", toCity: "Kuala Lumpur", days: 42, nights: 12 },
    { from: "OSL", fromCity: "Oslo", to: "ALC", toCity: "Alicante", days: 20, nights: 7 },
    { from: "BGO", fromCity: "Bergen", to: "AGP", toCity: "Malaga", days: 24, nights: 7 },
    { from: "TRD", fromCity: "Trondheim", to: "FCO", toCity: "Roma", days: 18, nights: 4 }
  ];

  function liveDealKey(route) {
    return `${route.from}-${route.to}`;
  }

  function liveDealDates(route) {
    const depart = addDaysISO(route.days);
    return { depart, ret: addDaysToISO(depart, route.nights) };
  }

  function shortLiveDealDate(value) {
    const date = parseISODate(value);
    return date ? date.toLocaleDateString("nb-NO", { day: "2-digit", month: "short" }) : value;
  }

  function liveDealTickerText(result) {
    const ticker = document.querySelector(`[data-live-deal-ticker="${liveDealKey(result.route)}"]`);
    if (!ticker) return;
    const price = result.offer ? `fra ${formatNOK(result.offer.price)}` : "sjekk livepris";
    ticker.innerHTML = `${result.route.fromCity} → <b>${result.route.toCity}</b> <em>${price}</em>`;
  }

  function renderLiveDealCard(result) {
    const { route, dates, offer } = result;
    const price = offer ? formatNOK(offer.price) : "Sjekk livepris";
    const airline = offer ? airlineName(offer.airline) : (route.airlineLabel || "Amadeus");
    return `
      <article class="live-deal-card${offer ? "" : " no-price"}">
        <span class="live-deal-route">${route.from} → ${route.to}</span>
        <h3>${route.fromCity} → ${route.toCity}</h3>
        <small>${shortLiveDealDate(dates.depart)} – ${shortLiveDealDate(dates.ret)} • ${airline}</small>
        <div><b>${price}</b><em>${offer ? "for 2 voksne" : "hent detaljert søk"}</em></div>
        <button data-live-route="${liveDealKey(route)}" type="button">HENT LIVEPRIS I SØKET <span>→</span></button>
      </article>`;
  }

  async function fetchLiveDeal(route) {
    const dates = liveDealDates(route);
    try {
      const url = new URL("/api/amadeus-flight-offers", window.location.origin);
      url.searchParams.set("origin", route.from);
      url.searchParams.set("destination", route.to);
      url.searchParams.set("depart_date", dates.depart);
      url.searchParams.set("return_date", dates.ret);
      url.searchParams.set("adults", "2");
      if (route.airlineCodes) url.searchParams.set("airline_codes", route.airlineCodes);
      const response = await fetch(url.toString());
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) throw new Error("Livepris utilgjengelig");
      return { route, dates, offer: data.offers?.[0] || null };
    } catch (error) {
      return { route, dates, offer: null };
    }
  }

  async function loadLiveDeals() {
    const grid = $("liveDealsGrid");
    if (!grid) return;
    grid.innerHTML = `<article class="live-deal-loading">Henter livepriser fra Amadeus ...</article>`;
    const results = await Promise.all(LIVE_DEAL_ROUTES.map(fetchLiveDeal));
    grid.innerHTML = results.map(renderLiveDealCard).join("");
    results.forEach(liveDealTickerText);
  }

  function openLiveDealSearch(route) {
    const dates = liveDealDates(route);
    setSearchType("flight");
    if ($("fromCity")) {
      $("fromCity").value = `${route.fromCity} (${route.from})`;
      $("fromCity").dataset.airportCode = route.from;
    }
    if ($("toCity")) {
      $("toCity").value = `${route.toCity} (${route.to})`;
      $("toCity").dataset.airportCode = route.to;
    }
    if ($("departDate")) $("departDate").value = dates.depart;
    if ($("returnDate")) $("returnDate").value = dates.ret;
    updateSearchPreview();
    setLiveBox(`<div class="tp-row"><span>Henter livepris for <b>${route.from} → ${route.to}</b> …</span><span class="tp-muted">Amadeus</span></div>`);
    $("travelSearch")?.scrollIntoView({ behavior: "smooth", block: "center" });
    scheduleLivePriceUpdate(true, readSearchState({ forUrl: true }));
    setTimeout(() => $("tpLiveBox")?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 180);
  }

  function initLiveDeals() {
    const board = $("liveDeals");
    if (!board || board.dataset.ready) return;
    board.dataset.ready = "1";
    board.addEventListener("click", (event) => {
      const refresh = event.target.closest("[data-live-deals-refresh]");
      if (refresh) {
        loadLiveDeals();
        return;
      }
      const button = event.target.closest("[data-live-route]");
      const route = LIVE_DEAL_ROUTES.find((item) => liveDealKey(item) === button?.dataset.liveRoute);
      if (route) openLiveDealSearch(route);
    });
    document.querySelectorAll("[data-live-deal-ticker]").forEach((ticker) => {
      if (ticker.dataset.boundLiveDeal) return;
      ticker.dataset.boundLiveDeal = "1";
      ticker.setAttribute("role", "button");
      ticker.setAttribute("tabindex", "0");
      ticker.title = "Klikk for å fylle flysøket med denne ruten";
      const openTickerRoute = () => {
        const route = LIVE_DEAL_ROUTES.find((item) => liveDealKey(item) === ticker.dataset.liveDealTicker);
        if (route) openLiveDealSearch(route);
      };
      ticker.addEventListener("click", openTickerRoute);
      ticker.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openTickerRoute();
        }
      });
    });
    loadLiveDeals();
  }

  function setLiveBox(html, show = true) {
    const box = $("tpLiveBox");
    if (!box) return;
    box.innerHTML = html || "";
    box.classList.toggle("show", Boolean(show && html));
  }

  function escapeHTML(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function renderAmadeusOffers(offers, state, from, to) {
    const partnerState = { ...state, from, to };
    const partnerLinks = buildFlightChoicePartners(partnerState, offers);
    const offerRows = offers.slice(0, 3).map((offer, index) => {
      const departure = offer.departure_at
        ? new Date(offer.departure_at).toLocaleString("nb-NO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
        : state.depart;
      const airline = airlineName(offer.airline);
      const seats = Number(offer.bookable_seats) > 0 ? `${Number(offer.bookable_seats)} seter igjen` : "Sjekk tilgjengelighet";
      return `
        <article class="amadeus-offer${index === 0 ? " best" : ""}">
          <div>
            <strong>${escapeHTML(airline)}</strong>
            <small>${escapeHTML(departure)} • ${escapeHTML(seats)}</small>
          </div>
          <b>${formatNOK(offer.price)}</b>
        </article>`;
    }).join("");
    const compareButtons = partnerLinks.map(({ label, href, meta }) => `
      <a href="${escapeHTML(href)}" rel="nofollow noopener sponsored" target="_blank">${escapeHTML(label)}<small>${escapeHTML(meta || "Sammenlign")}</small></a>
    `).join("");

    return `
      <section class="amadeus-results">
        <header>
          <span><b>Live flypriser</b><small>${escapeHTML(from)} → ${escapeHTML(to)} • hentet fra Amadeus</small></span>
          <em>Prisindikasjon</em>
        </header>
        <div class="amadeus-offers">${offerRows}</div>
        <div class="compare-partners">
          <strong>Sjekk også hos våre partnere</strong>
          <div>${compareButtons}</div>
        </div>
      </section>`;
  }

  function scheduleLivePriceUpdate(immediate = false, submittedState = null) {
    const box = $("tpLiveBox");
    if (!box) return;
    clearTimeout(livePriceTimer);

    const state = submittedState || readSearchState();
    if (currentSearchType !== "flight" || !state.from || !state.to || !state.depart) {
      setLiveBox("", false);
      return;
    }

    const from = airportCode(state.from);
    const to = airportCode(state.to);
    if (!/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to)) {
      setLiveBox("", false);
      return;
    }

    if (immediate) {
      setLiveBox(`<div class="tp-row"><span>Henter flypriser for <b>${from} → ${to}</b> …</span><span class="tp-muted">Amadeus</span></div>`);
    }

    livePriceTimer = setTimeout(async () => {
      try {
        if (livePriceAbort) livePriceAbort.abort();
        livePriceAbort = new AbortController();
        setLiveBox(`<div class="tp-row"><span>Henter flypriser for <b>${from} → ${to}</b> …</span><span class="tp-muted">Amadeus</span></div>`);

        const url = new URL("/api/amadeus-flight-offers", window.location.origin);
        url.searchParams.set("origin", from);
        url.searchParams.set("destination", to);
        url.searchParams.set("depart_date", state.depart);
        url.searchParams.set("return_date", state.ret);
        url.searchParams.set("adults", String(state.adults || 1));

        const response = await fetch(url.toString(), { signal: livePriceAbort.signal });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data?.error || "Kunne ikke hente flyprisene.");
        const offers = data?.offers || [];
        if (!data?.success || !offers.length) {
          setLiveBox(`<div class="tp-row"><span>Ingen livepris funnet akkurat nå for <b>${from} → ${to}</b>.</span><span class="tp-muted">Prøv en annen dato eller søk hos partner.</span></div>`);
          return;
        }

        setLiveBox(renderAmadeusOffers(offers, state, from, to));
      } catch (error) {
        if (error?.name !== "AbortError") {
          setLiveBox(`<div class="tp-row"><span>Vi fikk ikke hentet flyprisene akkurat nå.</span><span class="tp-muted">Prøv igjen om et øyeblikk.</span></div>`);
        }
      }
    }, immediate ? 0 : 650);
  }

  function formatFlightConfirmDate(value, fallback) {
    const date = parseISODate(value);
    return date ? date.toLocaleDateString("nb-NO", { day: "2-digit", month: "short", year: "numeric" }) : fallback;
  }

  function flightConfirmPassengerText(state) {
    const adults = Math.max(1, Number(state.adults || 1));
    const children = Math.max(0, Number(state.children || 0));
    return `${adults} ${adults === 1 ? "voksen" : "voksne"}${children ? `, ${children} barn` : ""}`;
  }

  function closeFlightPriceConfirm() {
    const existing = $("flightPriceConfirm");
    if (existing) existing.remove();
    document.body.classList.remove("flight-confirm-open");
    if (flightConfirmKeyHandler) {
      document.removeEventListener("keydown", flightConfirmKeyHandler);
      flightConfirmKeyHandler = null;
    }
  }

  function renderFlightPriceConfirm({ state, from, to, offers = [], error = "" }) {
    closeFlightPriceConfirm();
    const bestOffer = offers[0] || null;
    const partnerLinks = buildFlightChoicePartners({ ...state, from, to }, offers);
    const priceText = bestOffer ? formatNOK(bestOffer.price) : "Sjekk hos partner";
    const airlineText = bestOffer ? airlineName(bestOffer.airline) : "Pris må bekreftes";
    const departureText = bestOffer?.departure_at
      ? new Date(bestOffer.departure_at).toLocaleString("nb-NO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
      : formatFlightConfirmDate(state.depart, "valgt dato");
    const seatsText = Number(bestOffer?.bookable_seats) > 0 ? `${Number(bestOffer.bookable_seats)} seter igjen i Amadeus` : "Tilgjengelighet bekreftes hos partner";
    const offerRows = offers.slice(0, 3).map((offer, index) => {
      const departure = offer.departure_at
        ? new Date(offer.departure_at).toLocaleString("nb-NO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
        : state.depart;
      return `
        <article class="flight-confirm-offer${index === 0 ? " best" : ""}">
          <span><b>${escapeHTML(airlineName(offer.airline))}</b><small>${escapeHTML(departure)}</small></span>
          <strong>${formatNOK(offer.price)}</strong>
        </article>`;
    }).join("");
    const partnerButtons = partnerLinks.map((partner, index) => `
      <a class="flight-confirm-choice${index === 0 ? " primary" : ""}" ${index === 0 ? "data-flight-confirm-primary" : ""} href="${escapeHTML(partner.href)}" target="_blank" rel="nofollow noopener sponsored">
        <span>${escapeHTML(partner.label)}</span>
        <small>${escapeHTML(partner.meta)}</small>
      </a>`).join("");
    const statusHtml = error && !offers.length
      ? `<p class="flight-confirm-note">Livepris fra Amadeus er ikke tilgjengelig akkurat nå. Du kan likevel åpne valgt rute hos Kiwi.</p>`
      : `<p class="flight-confirm-note">Prisene er en indikasjon fra Amadeus. Kiwi åpner valgt rute automatisk; endelig pris, bagasje og betaling bekreftes hos Kiwi.</p>`;
    const routeDetailsHtml = `
      <div class="flight-confirm-route">
        <span><b>Fra</b>${escapeHTML(from)}</span>
        <span><b>Til</b>${escapeHTML(to)}</span>
        <span><b>Avreise</b>${escapeHTML(formatFlightConfirmDate(state.depart, "velg dato"))}</span>
        <span><b>Retur</b>${escapeHTML(formatFlightConfirmDate(state.ret, "velg retur"))}</span>
        <span><b>Reisende</b>${escapeHTML(flightConfirmPassengerText(state))}</span>
      </div>`;

    const overlay = document.createElement("div");
    overlay.id = "flightPriceConfirm";
    overlay.className = "flight-confirm-overlay";
    overlay.setAttribute("role", "presentation");
    overlay.innerHTML = `
      <section class="flight-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="flightConfirmTitle">
        <button class="flight-confirm-close" type="button" data-flight-confirm-close aria-label="Lukk prisbekreftelse">×</button>
        <header class="flight-confirm-head">
          <span>Prisbekreftelse</span>
          <h2 id="flightConfirmTitle">${escapeHTML(from)} → ${escapeHTML(to)}</h2>
          <p>${escapeHTML(formatFlightConfirmDate(state.depart, "avreise"))} til ${escapeHTML(formatFlightConfirmDate(state.ret, "retur"))} • ${escapeHTML(flightConfirmPassengerText(state))}</p>
        </header>
        <div class="flight-confirm-price">
          <div>
            <small>Beste prisindikasjon</small>
            <strong>${escapeHTML(priceText)}</strong>
          </div>
          <span><b>${escapeHTML(airlineText)}</b><small>${escapeHTML(departureText)} • ${escapeHTML(seatsText)}</small></span>
        </div>
        ${routeDetailsHtml}
        ${offerRows ? `<div class="flight-confirm-offers">${offerRows}</div>` : ""}
        ${statusHtml}
        <div class="flight-confirm-partners">
          ${partnerButtons}
        </div>
      </section>`;

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay || event.target.closest("[data-flight-confirm-close]")) closeFlightPriceConfirm();
    });
    overlay.querySelectorAll(".flight-confirm-choice").forEach((link) => {
      link.addEventListener("click", () => setTimeout(closeFlightPriceConfirm, 250));
    });
    flightConfirmKeyHandler = (event) => {
      if (event.key === "Escape") closeFlightPriceConfirm();
    };
    document.addEventListener("keydown", flightConfirmKeyHandler);
    document.body.appendChild(overlay);
    document.body.classList.add("flight-confirm-open");
    requestAnimationFrame(() => overlay.querySelector("[data-flight-confirm-primary]")?.focus());
  }

  async function fetchFlightConfirmOffers(state) {
    if (flightConfirmAbort) flightConfirmAbort.abort();
    flightConfirmAbort = new AbortController();
    const from = airportCode(state.from);
    const to = airportCode(state.to);
    if (!/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to)) {
      throw new Error("Velg gyldige flyplasser for prisbekreftelse.");
    }
    const url = new URL("/api/amadeus-flight-offers", window.location.origin);
    url.searchParams.set("origin", from);
    url.searchParams.set("destination", to);
    url.searchParams.set("depart_date", state.depart);
    url.searchParams.set("return_date", state.ret);
    url.searchParams.set("adults", String(state.adults || 1));
    url.searchParams.set("max", "3");

    const response = await fetch(url.toString(), { signal: flightConfirmAbort.signal });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.success) {
      throw new Error(data?.error || "Amadeus kunne ikke hente flyprisene akkurat nå.");
    }
    return { from, to, offers: data.offers || [] };
  }

  async function openFlightPriceConfirm(state) {
    const from = airportCode(state.from);
    const to = airportCode(state.to);
    const button = $("searchSubmitButton");
    const oldButtonText = button?.textContent || "";
    if (button) button.textContent = "HENTER PRISBEKREFTELSE ...";
    setLiveBox(`<div class="tp-row"><span>Henter flypriser for <b>${escapeHTML(from)} → ${escapeHTML(to)}</b> …</span><span class="tp-muted">Amadeus</span></div>`);

    try {
      const result = await fetchFlightConfirmOffers(state);
      if (result.offers.length) setLiveBox(renderAmadeusOffers(result.offers, state, result.from, result.to));
      renderFlightPriceConfirm({ state, from: result.from, to: result.to, offers: result.offers });
    } catch (error) {
      if (error?.name === "AbortError") return;
      setLiveBox(`<div class="tp-row"><span>Livepris er ikke tilgjengelig akkurat nå.</span><span class="tp-muted">Velg partner i bekreftelsen.</span></div>`);
      renderFlightPriceConfirm({ state, from, to, offers: [], error: error?.message || "Kunne ikke hente flypris." });
    } finally {
      if (button) button.textContent = oldButtonText;
    }
  }

  function buildPartnerTarget() {
    const state = readSearchState({ forUrl: true });

    if (currentSearchType === "interhome") {
      return buildInterhomeUrl(state);
    }

    if (currentSearchType === "restplass") {
      return buildCharterUrl(state);
    }

    if (currentSearchType === "package") {
      if (!state.to) throw new Error("Skriv inn reisemålet for pakkereisen.");
      return buildPackageUrl(state);
    }

    if (currentSearchType === "cruise") {
      return buildCruiseUrl(state);
    }

    if (currentSearchType === "hotel") {
      if (!state.to) throw new Error("Skriv inn byen du vil finne hotell i.");
      return buildHotelUrl(state);
    }

    if (currentSearchType === "car") {
      if (!state.from) throw new Error("Skriv inn hvor du vil hente leiebilen.");
      return buildCarUrl(state);
    }

    if (!state.from || !state.to) throw new Error("Skriv inn både avreisested og reisemål.");
    return buildFlightUrl(state);
  }

  function showSearchError(message) {
    const helper = document.querySelector(".search-help");
    if (helper) helper.textContent = message;
  }

  function setSearchType(type) {
    const nextType = type || "flight";
    if (nextType !== currentSearchType) saveFormToTabState(currentSearchType);
    currentSearchType = nextType;
    loadTabState(currentSearchType);
    const form = $("travelSearch");
    if (form) form.dataset.mode = currentSearchType;

    document.querySelectorAll("[data-search-type]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.searchType === currentSearchType);
    });
    document.querySelectorAll("[data-smart-service]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.smartService === currentSearchType);
    });

    const fromLabel = $("fromLabel");
    const toLabel = $("toLabel");
    const departLabel = $("departLabel");
    const returnLabel = $("returnLabel");
    const dateRangeLabel = $("dateRangeLabel");
    const adultsLabel = $("adultsLabel");
    const from = $("fromCity");
    const to = $("toCity");
    const fromField = from?.closest(".field-from");

    const modeTitle = $("searchModeTitle");
    const modeCopy = {
      flight: ["Fly", "Velg avreisested, reisemål, dato og antall reisende."],
      hotel: ["Hotell", "Finn hotell med innsjekk, utsjekk og antall gjester."],
      package: ["Pakkereise", "Søk etter fly og hotell samlet hos Expedia."],
      interhome: ["Feriebolig", "Finn feriehus, villa eller leilighet hos Interhome."],
      cruise: ["Cruise", "Velg europeisk avreisehavn og sjekk cruisepriser hos Expedia."],
      restplass: ["Charter", "Velg restplass, charter og pakkereiser hos TUI og Nazar."],
      car: ["Leiebil", "Velg hentested og dato før leiebilprisene åpnes hos EconomyBookings."]
    }[currentSearchType];
    if (modeTitle && modeCopy) modeTitle.innerHTML = `<b>${modeCopy[0]}</b><span>${modeCopy[1]}</span>`;
    if (fromField) {
      const hideFromField = currentSearchType === "hotel" || currentSearchType === "interhome";
      fromField.hidden = hideFromField;
      fromField.setAttribute("aria-hidden", hideFromField ? "true" : "false");
    }
    if (from) {
      const disableFromField = currentSearchType === "hotel" || currentSearchType === "interhome";
      from.disabled = disableFromField;
      if (disableFromField) from.value = "";
    }

    if (currentSearchType === "package") {
      if (dateRangeLabel) dateRangeLabel.textContent = "Reiseperiode";
      if (fromLabel) fromLabel.textContent = "Avreisested";
      if (toLabel) toLabel.textContent = "Reisemål";
      if (departLabel) departLabel.textContent = "Avreise";
      if (returnLabel) returnLabel.textContent = "Retur";
      if (adultsLabel) adultsLabel.textContent = "Reisende";
      if (from) from.placeholder = "Skriv by eller flyplass";
      if (to) to.placeholder = "Skriv ønsket reisemål";
    } else if (currentSearchType === "cruise") {
      if (dateRangeLabel) dateRangeLabel.textContent = "Cruiseperiode";
      if (fromLabel) fromLabel.textContent = "Avreisehavn";
      if (toLabel) toLabel.textContent = "Cruiseområde";
      if (departLabel) departLabel.textContent = "Fra dato";
      if (returnLabel) returnLabel.textContent = "Til dato";
      if (adultsLabel) adultsLabel.textContent = "Reisende";
      if (from) from.placeholder = "Valgfritt, f.eks. Miami";
      if (to) to.placeholder = "Valgfritt, f.eks. Middelhavet";
    } else if (currentSearchType === "interhome") {
      if (dateRangeLabel) dateRangeLabel.textContent = "Opphold";
      if (fromLabel) fromLabel.textContent = "";
      if (toLabel) toLabel.textContent = "Hvor vil du leie feriebolig?";
      if (departLabel) departLabel.textContent = "Ankomst";
      if (returnLabel) returnLabel.textContent = "Avreise";
      if (adultsLabel) adultsLabel.textContent = "Gjester";
      if (from) from.placeholder = "";
      if (to) to.placeholder = "Skriv område, by eller sted, f.eks. Toscana";
    } else if (currentSearchType === "restplass") {
      if (dateRangeLabel) dateRangeLabel.textContent = "Reiseperiode";
      if (fromLabel) fromLabel.textContent = "Fra";
      if (toLabel) toLabel.textContent = "Reisemål";
      if (departLabel) departLabel.textContent = "Avreise fra";
      if (returnLabel) returnLabel.textContent = "Retur";
      if (adultsLabel) adultsLabel.textContent = "Reisende";
      if (from) from.placeholder = "Velg flyplass";
      if (to) to.placeholder = "Velg reisemål";
    } else if (currentSearchType === "hotel") {
      if (dateRangeLabel) dateRangeLabel.textContent = "Innsjekk og utsjekk";
      if (fromLabel) fromLabel.textContent = "Land / område";
      if (toLabel) toLabel.textContent = "Hvor vil du bo?";
      if (departLabel) departLabel.textContent = "Innsjekk";
      if (returnLabel) returnLabel.textContent = "Utsjekk";
      if (adultsLabel) adultsLabel.textContent = "Gjester";
      if (from) from.placeholder = "Valgfritt";
      if (to) to.placeholder = "Skriv by, område eller hotell";
    } else if (currentSearchType === "car") {
      if (dateRangeLabel) dateRangeLabel.textContent = "Leieperiode";
      if (fromLabel) fromLabel.textContent = "Hvor henter du bilen?";
      if (toLabel) toLabel.textContent = "Leveres samme sted";
      if (departLabel) departLabel.textContent = "Hentedato";
      if (returnLabel) returnLabel.textContent = "Leveringsdato";
      if (adultsLabel) adultsLabel.textContent = "";
      if (from) from.placeholder = "Skriv by/flyplass, f.eks. Alicante eller OSL";
      if (to) to.placeholder = "Samme sted som henting";
    } else {
      if (dateRangeLabel) dateRangeLabel.textContent = "Avreise og hjemreise";
      if (fromLabel) fromLabel.textContent = "Hvor reiser du fra?";
      if (toLabel) toLabel.textContent = "Hvor vil du reise?";
      if (departLabel) departLabel.textContent = "Avreise";
      if (returnLabel) returnLabel.textContent = "Retur";
      if (adultsLabel) adultsLabel.textContent = "Reisende";
      if (from) from.placeholder = "Skriv by/flyplass, f.eks. Oslo";
      if (to) to.placeholder = "Skriv reisemål, f.eks. Bangkok";
    }

    updateTravelerSummary();
    updateSearchPreview();
    renderLiveCalendar();
  }

  function updateTravelerSummary() {
    const toggle = $("travelerToggle");
    const adults = Math.max(1, Math.min(9, Number($("adults")?.value || 2)));
    const children = Math.max(0, Math.min(8, Number($("children")?.value || 0)));
    if ($("adults")) $("adults").value = String(adults);
    if ($("children")) $("children").value = String(children);
    if (!toggle) return;
    if (currentSearchType === "car") {
      toggle.textContent = "";
    } else if (currentSearchType === "hotel" || currentSearchType === "interhome") {
      toggle.textContent = `${adults} voksne${children ? `, ${children} barn` : ""}`;
    } else {
      toggle.textContent = `${adults} voksne${children ? `, ${children} barn` : ""}`;
    }
  }

  function initDateRangePicker() {
    const toggle = $("dateRangeToggle");
    const box = $("liveDateCalendar");
    if (!toggle || !box || toggle.dataset.ready) return;
    toggle.dataset.ready = "1";
    toggle.addEventListener("click", () => {
      const form = $("travelSearch");
      setCalendarOpen(!form?.classList.contains("calendar-open"));
    });
    document.addEventListener("click", (event) => {
      const form = $("travelSearch");
      if (form?.classList.contains("calendar-open") && !toggle.contains(event.target) && !box.contains(event.target)) {
        setCalendarOpen(false);
      }
    });
    updateDateRangeSummary();
  }

  function initTravelerPicker() {
    const field = document.querySelector(".traveler-field");
    const toggle = $("travelerToggle");
    const menu = $("travelerMenu");
    if (!field || !toggle || !menu || field.dataset.ready) return;
    field.dataset.ready = "1";
    toggle.addEventListener("click", () => {
      const open = field.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", (event) => {
      if (!field.contains(event.target)) {
        field.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    ["adults", "children"].forEach((id) => {
      const el = $(id);
      if (el) el.addEventListener("input", () => { updateTravelerSummary(); updateSearchPreview(); saveFormToTabState(currentSearchType); });
    });
    menu.querySelectorAll("[data-step-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const input = $(button.dataset.stepTarget);
        if (!input) return;
        const min = Number(input.min || 0);
        const max = Number(input.max || 99);
        const step = Number(button.dataset.step || 0);
        const next = Math.max(min, Math.min(max, Number(input.value || min) + step));
        input.value = String(next);
        input.dispatchEvent(new Event("input", { bubbles: true }));
      });
    });
    $("travelerDone")?.addEventListener("click", () => {
      field.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
    updateTravelerSummary();
  }

  function smartServiceUrl(service) {
    const links = window.BR_AFFILIATES || {};
    return {
      package: links.packageTravel || "https://www.expedia.no/go/package/search/FlightHotel/",
      interhome: links.interhome || "https://tc.tradetracker.net/?c=27484&m=1269456&a=509866&r=&u=https%3A%2F%2Fwww.interhome.no%2F",
      cruise: links.cruise || DEFAULT_EXPEDIA_CRUISE_URL,
      nazar: links.nazar || "https://clk.tradedoubler.com/click?p=377463&a=3480427&url=https%3A%2F%2Fwww.nazar.no%2F",
      restplass: links.nazar || "https://clk.tradedoubler.com/click?p=377463&a=3480427&url=https%3A%2F%2Fwww.nazar.no%2F"
    }[service];
  }

  function activateSmartService(service) {
    if (service === "car") {
      setSearchType("car");
      $("fromCity")?.focus();
      return;
    }
    if (["flight", "hotel", "package", "cruise", "interhome", "restplass"].includes(service)) {
      setSearchType(service);
      if (service === "cruise") openDateRangePicker();
      else if (service === "package") {
        if ($("fromCity") && !$("fromCity").value) $("fromCity").value = "Oslo";
        updateSearchPreview();
        $("toCity")?.focus();
      } else if (service === "interhome") {
        if ($("fromCity")) $("fromCity").value = "";
        updateSearchPreview();
        $("toCity")?.focus();
      } else (["hotel", "interhome"].includes(service) ? $("toCity") : $("fromCity"))?.focus();
      return;
    }
    const url = smartServiceUrl(service);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }

  function openCurrentSearchTarget() {
    const state = readSearchState({ forUrl: true });
    let target = "";
    if (currentSearchType === "flight") {
      if (!state.from || !state.to) return false;
      openFlightPriceConfirm(state);
      return true;
    } else if (currentSearchType === "hotel") {
      if (!state.to) return false;
      target = buildHotelUrl(state);
    } else if (currentSearchType === "package") {
      if (!state.to) return false;
      target = buildPackageUrl(state);
    } else if (currentSearchType === "car") {
      if (!state.from) return false;
      target = buildCarUrl(state);
    } else if (currentSearchType === "restplass") {
      target = buildCharterUrl(state);
    } else if (currentSearchType === "interhome") {
      target = buildInterhomeUrl(state);
    } else if (currentSearchType === "cruise") {
      target = buildCruiseUrl(state);
    }
    if (!target) return false;
    window.open(target, "_blank", "noopener,noreferrer");
    return true;
  }

  function runSmartSearch() {
    const input = $("smartSearchQuery");
    const query = clean(input?.value).toLowerCase();
    if (!query) {
      input?.focus();
      return;
    }
    if (currentSearchType === "interhome" && !/fly|flight|hotell|hotel|pakkereise|pakke\s*reise|leiebil|rental|car|bil|charter|restplass|cruise/.test(query)) {
      const destination = interhomeSearchText(query);
      if (destination && $("toCity")) $("toCity").value = destination;
      updateSearchPreview();
      if (!openCurrentSearchTarget()) $("toCity")?.focus();
      return;
    }
    if (/restplass|charter|syden/.test(query)) {
      setSearchType("restplass");
      const destination = query.match(/(?:til|i)\s+(.+)/)?.[1];
      if (destination && $("toCity")) $("toCity").value = destination.trim();
      updateSearchPreview();
      if (!openCurrentSearchTarget()) openDateRangePicker();
      return;
    }
    if (/pakkereise|pakke\s*reise|fly\s*(\+|og)\s*hotell/.test(query)) {
      setSearchType("package");
      const route = parseRouteQuery(query);
      if (route.to) {
        if ($("fromCity")) $("fromCity").value = route.from || "Oslo";
        if ($("toCity")) $("toCity").value = route.to;
        updateSearchPreview();
        if (!openCurrentSearchTarget()) openDateRangePicker();
        return;
      }
      updateSearchPreview();
      showSearchError("Skriv reisemål for pakkereisen først, så åpner vi riktig søk.");
      $("toCity")?.focus();
      return;
    }
    if (/feriebolig|feriehus|villa|hytte|leilighet/.test(query)) {
      setSearchType("interhome");
      const route = parseRouteQuery(query);
      const destination = route.to || interhomeSearchText(query);
      if (destination && $("toCity")) $("toCity").value = destination;
      updateSearchPreview();
      if (!openCurrentSearchTarget()) $("toCity")?.focus();
      return;
    }
    if (/cruise/.test(query)) {
      setSearchType("cruise");
      const cruiseChoice = cruiseSearchText(query);
      if (cruiseChoice) {
        cruiseQuickChoice = cruiseChoice;
        if ($("fromCity")) $("fromCity").value = cruiseChoice;
        if ($("toCity")) $("toCity").value = "";
        updateSearchPreview();
        if (!openCurrentSearchTarget()) openDateRangePicker();
        return;
      }
      updateSearchPreview();
      return openDateRangePicker();
    }

    const hotel = query.match(/(?:hotell|hotel)(?:\s+i)?\s+(.+)/);
    if (hotel) {
      setSearchType("hotel");
      if ($("toCity")) $("toCity").value = hotel[1].trim();
      updateSearchPreview();
      if (!openCurrentSearchTarget()) $("toCity")?.focus();
      return;
    }

    const car = query.match(/(?:leiebil|bil)(?:\s+i)?\s+(.+)/);
    if (car) {
      setSearchType("car");
      if ($("fromCity")) $("fromCity").value = car[1].trim();
      updateSearchPreview();
      if (!openCurrentSearchTarget()) $("fromCity")?.focus();
      return;
    }

    const route = parseRouteQuery(query);
    setSearchType("flight");
    if (route.to) {
      if ($("fromCity")) $("fromCity").value = route.from || "Oslo";
      if ($("toCity")) $("toCity").value = route.to;
      updateSearchPreview();
      if (!openCurrentSearchTarget()) openDateRangePicker();
      return;
    }
    if ($("toCity")) $("toCity").value = query;
    updateSearchPreview();
    $("fromCity")?.focus();
  }

  function initPartnerSearch() {
    const form = $("travelSearch");
    if (!form) return;

    restoreSearchState();
    initTravelerPicker();
    initDateRangePicker();
    ensureFreshDates(false);
    attachAirportAutocomplete("fromCity", "Forslag til avreiseflyplass");
    attachAirportAutocomplete("toCity", "Forslag til reisemål");

    document.querySelectorAll("[data-search-type]").forEach((btn) => {
      btn.addEventListener("click", () => setSearchType(btn.dataset.searchType));
    });
    document.querySelectorAll("[data-smart-service]").forEach((btn) => {
      btn.addEventListener("click", () => activateSmartService(btn.dataset.smartService));
    });
    document.querySelectorAll("[data-tui-quick]").forEach((btn) => {
      btn.addEventListener("click", () => applyTuiQuickChoice(btn.dataset.tuiQuick));
    });
    document.querySelectorAll("[data-interhome-quick]").forEach((btn) => {
      btn.addEventListener("click", () => applyInterhomeQuickChoice(btn.dataset.interhomeQuick));
    });
    document.querySelectorAll("[data-cruise-quick]").forEach((btn) => {
      btn.addEventListener("click", () => applyCruiseQuickChoice(btn.dataset.cruiseQuick));
    });
    document.querySelectorAll("[data-charter-open]").forEach((btn) => {
      btn.addEventListener("click", () => openCharterSpotlight(btn.dataset.charterOpen));
    });
    document.querySelectorAll("[data-hotel-pick]").forEach((btn) => {
      btn.addEventListener("click", () => openHotelPick(btn.dataset.hotelPick));
    });
    $("packageDirectSearchButton")?.addEventListener("click", () => {
      const state = readSearchState({ forUrl: true });
      if (!state.to) {
        showSearchError("Skriv reisemål for pakkereisen først.");
        $("toCity")?.focus();
        return;
      }
      window.open(buildPackageUrl(state), "_blank", "noopener,noreferrer");
    });
    $("smartSearchLaunch")?.addEventListener("click", runSmartSearch);
    $("smartSearchQuery")?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        runSmartSearch();
      }
    });

    ["fromCity", "toCity", "departDate", "returnDate", "adults", "children"].forEach((id) => {
      const el = $(id);
      if (el) {
        el.addEventListener("input", () => { updateSearchPreview(); renderLiveCalendar(); });
        el.addEventListener("change", () => { ensureFreshDates(false); updateSearchPreview(); renderLiveCalendar(); });
      }
    });

    $("liveDateCalendar")?.addEventListener("click", (event) => {
      event.stopPropagation();
      handleCalendarClick(event);
    });
    renderLiveCalendar();

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        saveSearchState();
        const state = readSearchState({ forUrl: true });
        let target;

        if (currentSearchType === "car") {
          if (!state.from) throw new Error("Skriv inn hvor du vil hente leiebilen.");
          const button = $("searchSubmitButton");
          const oldText = button?.textContent;
          if (button) button.textContent = "ÅPNER ECONOMYBOOKINGS…";
          target = await buildCarPartnerUrl(state);
          if (button && oldText) button.textContent = oldText;
        } else if (currentSearchType === "flight") {
          if (!state.from || !state.to) throw new Error("Skriv inn både avreisested og reisemål.");
          await openFlightPriceConfirm(state);
          return;
        } else {
          target = buildPartnerTarget();
        }

        window.open(target, "_blank", "noopener,noreferrer");
        resetActiveTabSearch();
        updateSearchPreview();
        renderLiveCalendar();
      } catch (error) {
        showSearchError(error.message || "Fyll inn søket først.");
      }
    });

    setSearchType(currentSearchType || "flight");
    initLiveDeals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPartnerSearch);
  } else {
    initPartnerSearch();
  }
})();

/* AI Reisehjelper - smart frontend assistant */
(() => {
  const $ = (id) => document.getElementById(id);
  const assistant = $("aiTravelAssistant");
  if (!assistant || assistant.dataset.ready) return;
  assistant.dataset.ready = "1";

  const panel = $("aiChatPanel");
  const toggle = $("aiChatToggle");
  const close = $("aiChatClose");
  const form = $("aiChatForm");
  const input = $("aiChatInput");
  const messages = $("aiChatMessages");

  const cityMap = {
    oslo: "Oslo (OSL)", bangkok: "Bangkok (BKK)", roma: "Roma (FCO)", rome: "Roma (FCO)",
    hellas: "Athen (ATH)", athen: "Athen (ATH)", athens: "Athen (ATH)", athena: "Athen (ATH)",
    rhodos: "Rhodos (RHO)", rhodes: "Rhodos (RHO)", kreta: "Kreta (HER)", santorini: "Santorini (JTR)",
    paris: "Paris (CDG)", london: "London (LHR)", bali: "Bali / Denpasar (DPS)",
    malaga: "Malaga (AGP)", alicante: "Alicante (ALC)", barcelona: "Barcelona (BCN)",
    nice: "Nice (NCE)", tokyo: "Tokyo (HND)", dubai: "Dubai (DXB)",
    bergen: "Bergen (BGO)", stavanger: "Stavanger (SVG)", trondheim: "Trondheim (TRD)",
    københavn: "København (CPH)", copenhagen: "København (CPH)", mallorca: "Mallorca (PMI)"
  };

  function addMessage(text, who = "bot", action) {
    if (!messages) return;
    const msg = document.createElement("div");
    msg.className = `ai-msg ${who}`;
    msg.innerHTML = text;
    if (action) {
      const btn = document.createElement("button");
      btn.className = "ai-action";
      btn.type = "button";
      btn.textContent = action.label;
      btn.addEventListener("click", action.onClick);
      msg.appendChild(document.createElement("br"));
      msg.appendChild(btn);
    }
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function openPanel(manual = true) {
    if (!panel) return;
    panel.hidden = false;
    assistant.classList.add("open");
    if (manual) {
      try { sessionStorage.setItem("brAiPopupSeen", "1"); } catch(e) {}
    }
    setTimeout(() => input?.focus(), 50);
  }
  function closePanel() {
    if (panel) panel.hidden = true;
    assistant.classList.remove("open");
    try { sessionStorage.setItem("brAiPopupSeen", "1"); } catch(e) {}
  }

  function setTab(type) {
    const btn = document.querySelector(`[data-search-type="${type}"], [data-smart-service="${type}"]`);
    if (btn) btn.click();
  }

  function setValue(id, value) {
    const el = $(id);
    if (!el) return;
    el.value = value || "";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function findCity(text, fallback = "") {
    const low = text.toLowerCase();
    for (const [key, value] of Object.entries(cityMap)) {
      if (low.includes(key)) return value;
    }
    return fallback;
  }

  function addDaysISO(days) {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function airportCode(value) {
    const raw = String(value || "").trim();
    const parenCode = raw.match(/\(([A-Za-z]{3})\)/);
    if (parenCode) return parenCode[1].toUpperCase();
    const directCode = raw.match(/^\s*([A-Za-z]{3})\s*$/);
    if (directCode) return directCode[1].toUpperCase();
    const found = findCity(raw, raw);
    const foundCode = String(found || "").match(/\(([A-Za-z]{3})\)/);
    return foundCode ? foundCode[1].toUpperCase() : raw;
  }

  function placeName(value) {
    return String(value || "").replace(/\s*\([A-Za-z]{3}\)\s*$/, "").trim();
  }

  function stripAiTravelWords(value) {
    return String(value || "")
      .replace(/\b(fly\s*(\+|og)\s*hotell|pakkereise|pakke\s*reise|fly|flight|hotell|hotel|feriebolig|feriehus|villa|hytte|leilighet|leiebil|rental|car|bil)\b/gi, " ")
      .replace(/\b(finn|søk|sok|se|åpne|apne|med|for)\b/gi, " ")
      .replace(/\b\d+\s*(voksen|voksne|adult|adults|barn|child|children)\b/gi, " ")
      .replace(/[,.!?]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function parseAiRoute(value) {
    const raw = stripAiTravelWords(value);
    const fromTo = raw.match(/(?:fra|from)\s+(.+?)\s+(?:til|to)\s+(.+)$/i);
    if (fromTo) return { from: stripAiTravelWords(fromTo[1]), to: stripAiTravelWords(fromTo[2]) };
    const toOnly = raw.match(/^(?:til|to)\s+(.+)$/i);
    if (toOnly) return { from: "", to: stripAiTravelWords(toOnly[1]) };
    const localOnly = raw.match(/^(?:i|på)\s+(.+)$/i);
    if (localOnly) return { from: "", to: stripAiTravelWords(localOnly[1]) };
    const loose = raw.match(/^(.+?)\s+(?:til|to)\s+(.+)$/i);
    if (loose) return { from: stripAiTravelWords(loose[1]), to: stripAiTravelWords(loose[2]) };
    return { from: "", to: stripAiTravelWords(raw) };
  }

  function resolveCity(value, fallback = "") {
    const cleanValue = stripAiTravelWords(value);
    if (!cleanValue) return fallback;
    return findCity(cleanValue, cleanValue);
  }

  function aiFlightUrl(data) {
    const depart = $("departDate")?.value || addDaysISO(14);
    const ret = $("returnDate")?.value || addDaysISO(21);
    const from = data.from || $("fromCity")?.value || "Oslo (OSL)";
    const to = data.to || $("toCity")?.value || "";
    if (!to) return "";
    const kiwiTarget = new URL("https://www.kiwi.com/deep");
    kiwiTarget.searchParams.set("from", airportCode(from));
    kiwiTarget.searchParams.set("to", airportCode(to));
    kiwiTarget.searchParams.set("departure", depart);
    kiwiTarget.searchParams.set("return", ret);
    kiwiTarget.searchParams.set("adults", data.adults || "2");
    if (Number(data.children)) kiwiTarget.searchParams.set("children", data.children);
    kiwiTarget.searchParams.set("locale", "no");
    kiwiTarget.searchParams.set("lang", "no");
    kiwiTarget.searchParams.set("currency", "NOK");
    kiwiTarget.searchParams.set("partner_market", "NO");

    const url = new URL((window.BR_AFFILIATES && window.BR_AFFILIATES.kiwi) || "https://c111.travelpayouts.com/click");
    url.searchParams.set("shmarker", `${(window.BR_AFFILIATES && window.BR_AFFILIATES.travelpayoutsId) || "718286"}.billigreiser_ai_fly`);
    url.searchParams.set("promo_id", "3791");
    url.searchParams.set("source_type", "customlink");
    url.searchParams.set("type", "click");
    url.searchParams.set("custom_url", kiwiTarget.toString());
    return url.toString();
  }

  function expediaAffiliate(targetUrl) {
    const base = (window.BR_AFFILIATES && window.BR_AFFILIATES.expedia) || "https://www.kqzyfj.com/click-101724638-13852706";
    return cjAffiliate(base, targetUrl);
  }

  function cjAffiliate(baseUrl, targetUrl) {
    const url = new URL(baseUrl);
    if (url.pathname.includes("/affiliates/")) return url.toString();
    url.searchParams.set("url", targetUrl);
    return url.toString();
  }

  function isAiCreatorAffiliateUrl(value) {
    try {
      return new URL(value).pathname.includes("/affiliates/");
    } catch (error) {
      return false;
    }
  }

  function aiHotelsBrowserBridge(targetUrl) {
    return `/go/hotels.html#to=${encodeURIComponent(targetUrl)}`;
  }

  function aiHotelUrl(place = "Roma") {
    const depart = $("departDate")?.value || addDaysISO(14);
    const ret = $("returnDate")?.value || addDaysISO(21);
    const url = new URL("https://no.hotels.com/Hotel-Search");
    url.searchParams.set("destination", placeName(place) || "Roma");
    url.searchParams.set("startDate", depart);
    url.searchParams.set("endDate", ret);
    url.searchParams.set("rooms", "1");
    url.searchParams.set("adults", $("adults")?.value || "2");
    url.searchParams.set("locale", "no_NO");
    url.searchParams.set("currency", "NOK");
    url.searchParams.set("pos", "HCOM_NO");
    url.searchParams.set("siteid", "300000012");
    const base = (window.BR_AFFILIATES && window.BR_AFFILIATES.hotels) || "https://www.tkqlhce.com/click-101724638-14361426";
    return aiHotelsBrowserBridge(cjAffiliate(base, url.toString()));
  }

  function aiTravelpayoutsCustomLink(clickBase, promoId, targetUrl, markerSuffix) {
    const marker = (window.BR_AFFILIATES && window.BR_AFFILIATES.travelpayoutsId) || "718286";
    const url = new URL(clickBase || "https://c10.travelpayouts.com/click");
    url.searchParams.set("shmarker", `${marker}.${markerSuffix}`);
    url.searchParams.set("promo_id", promoId || "2018");
    url.searchParams.set("source_type", "customlink");
    url.searchParams.set("type", "click");
    url.searchParams.set("custom_url", targetUrl);
    return url.toString();
  }

  function aiEconomyBookingsTarget(place = "") {
    const target = new URL("https://www.economybookings.com/en");
    const code = airportCode(place);
    if (/^[A-Z]{3}$/.test(code)) {
      target.searchParams.set("idpickval", code);
    } else {
      target.searchParams.set("idpick", placeName(place) || "Alicante");
    }
    return target.toString();
  }

  function aiCarUrl(place = "") {
    const links = window.BR_AFFILIATES || {};
    if (!place) return links.economyBookingsEurope || links.economyBookings || "https://economybookings.tpx.gr/LT8vc2kD";
    return aiTravelpayoutsCustomLink(
      links.economyBookingsClick || "https://c10.travelpayouts.com/click",
      links.economyBookingsPromoId || "2018",
      aiEconomyBookingsTarget(place),
      "billigreiser_ai_car"
    );
  }

  function aiPackageUrl(data) {
    const to = data.to || $("toCity")?.value || "";
    if (!to) return "";
    return aiExpediaPackageSearchUrl(data);
  }

  function aiExpediaPackageSearchUrl(data) {
    const depart = $("departDate")?.value || addDaysISO(14);
    const ret = $("returnDate")?.value || addDaysISO(21);
    const from = data.from || $("fromCity")?.value || "Oslo (OSL)";
    const to = data.to || $("toCity")?.value || "";
    if (!to) return "";
    const end = ret && ret > depart ? ret : addDaysISO(21);
    const departDate = new Date(`${depart}T12:00:00`);
    const returnDate = new Date(`${end}T12:00:00`);
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const daysInFuture = Math.max(1, Math.round((departDate - today) / 86400000));
    const stayLength = Math.max(1, Math.round((returnDate - departDate) / 86400000));
    const url = new URL("/go/package/search/FlightHotel/", "https://www.expedia.no");
    url.searchParams.set("FromAirport", airportCode(from || "Oslo"));
    url.searchParams.set("Destination", airportCode(to));
    url.searchParams.set("NumRoom", "1");
    url.searchParams.set("NumAdult", data.adults || "2");
    url.searchParams.set("DaysInFuture", String(daysInFuture));
    url.searchParams.set("StayLength", String(stayLength));
    url.searchParams.set("sort", "recommended");
    const childCount = Math.max(0, Math.min(4, Number(data.children) || 0));
    if (childCount) {
      url.searchParams.set("NumChild", String(childCount));
      for (let index = 1; index <= childCount; index += 1) {
        url.searchParams.set(`Room1-Child${index}Age`, "8");
      }
    }
    return url.toString();
  }

  const aiCruiseLinks = {
    europa: "https://www.expedia.com/Cruises-to-Europe.d6022967.Travel-Guide-Cruise",
    europe: "https://www.expedia.com/Cruises-to-Europe.d6022967.Travel-Guide-Cruise",
    middelhavet: "https://www.expedia.com/Cruises-from-Barcelona.d179992.Cruise-Departure-Port",
    mediterranean: "https://www.expedia.com/Cruises-from-Barcelona.d179992.Cruise-Departure-Port",
    barcelona: "https://www.expedia.com/Cruises-from-Barcelona.d179992.Cruise-Departure-Port",
    athen: "https://www.expedia.com/Cruises-from-Athens.d178231.Cruise-Departure-Port",
    athens: "https://www.expedia.com/Cruises-from-Athens.d178231.Cruise-Departure-Port",
    pireus: "https://www.expedia.com/Cruises-from-Athens.d178231.Cruise-Departure-Port",
    piraeus: "https://www.expedia.com/Cruises-from-Athens.d178231.Cruise-Departure-Port",
    københavn: "https://www.expedia.com/Cruises-from-Copenhagen.d178252.Cruise-Departure-Port",
    kobenhavn: "https://www.expedia.com/Cruises-from-Copenhagen.d178252.Cruise-Departure-Port",
    copenhagen: "https://www.expedia.com/Cruises-from-Copenhagen.d178252.Cruise-Departure-Port",
    genova: "https://www.expedia.com/Cruises-from-Genoa.d6055038.Cruise-Departure-Port",
    genoa: "https://www.expedia.com/Cruises-from-Genoa.d6055038.Cruise-Departure-Port",
    marseille: "https://www.expedia.com/Cruises-from-Marseille.d179895.Cruise-Departure-Port",
    napoli: "https://www.expedia.com/Cruises-from-Naples.d6034774.Cruise-Departure-Port",
    naples: "https://www.expedia.com/Cruises-from-Naples.d6034774.Cruise-Departure-Port",
    oslo: "https://www.expedia.com/Cruises-from-Oslo.d178295.Cruise-Departure-Port",
    fjord: "https://www.expedia.com/Cruises-from-Oslo.d178295.Cruise-Departure-Port",
    fjorder: "https://www.expedia.com/Cruises-from-Oslo.d178295.Cruise-Departure-Port",
    stockholm: "https://www.expedia.com/Cruises-from-Stockholm.d178311.Cruise-Departure-Port",
    trieste: "https://www.expedia.com/Cruises-from-Province-Of-Trieste.d3536.Cruise-Departure-Port",
    valencia: "https://www.expedia.com/Cruises-from-Valencia-Province.d6023332.Cruise-Departure-Port",
    venezia: "https://www.expedia.com/Cruises-from-Venice.d179981.Cruise-Departure-Port",
    venice: "https://www.expedia.com/Cruises-from-Venice.d179981.Cruise-Departure-Port"
  };

  function aiCruiseKey(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function aiCruisePlace(text = "") {
    return String(text || "")
      .replace(/\b(cruise|cruises|cruiseferie|cruisetur|havn|havner|port|fra|from|til|to|i|på|pa|finn|søk|sok|se|åpne|apne)\b/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function aiCruiseUrl(text = "") {
    const place = aiCruisePlace(text);
    const key = aiCruiseKey(place || "europa");
    const match = Object.keys(aiCruiseLinks)
      .sort((a, b) => b.length - a.length)
      .find((item) => key === item || key.includes(item));
    const target = new URL(aiCruiseLinks[match] || aiCruiseLinks.europa);
    const configured = (window.BR_AFFILIATES && window.BR_AFFILIATES.cruise) || "";
    try {
      const source = new URL(configured);
      ["siid", "referrer"].forEach((param) => {
        const value = source.searchParams.get(param);
        if (value && !target.searchParams.has(param)) target.searchParams.set(param, value);
      });
    } catch (error) {}
    target.searchParams.set("startdate", $("departDate")?.value || addDaysISO(14));
    target.searchParams.set("enddate", $("returnDate")?.value || addDaysISO(21));
    return target.toString();
  }

  const aiInterhomeDestinations = {
    spania: "5460aeae487f8",
    spain: "5460aeae487f8",
    italia: "5460aeae078f7",
    italy: "5460aeae078f7",
    frankrike: "5460aeb1b0bf2",
    france: "5460aeb1b0bf2",
    norge: "5460aea85799e",
    norway: "5460aea85799e",
    kroatia: "5460aeaaa3139",
    croatia: "5460aeaaa3139",
    danmark: "5460aeb07b41a",
    denmark: "5460aeb07b41a",
    portugal: "5460aecfccf0c",
    sveits: "5460aea910151",
    switzerland: "5460aea910151",
    sverige: "5460aea8a7782",
    sweden: "5460aea8a7782",
    toscana: "5460aeb357636",
    tuscany: "5460aeb357636",
    "costa blanca": "5460aeae7e340",
    alicante: "5460aeae7e340",
    benidorm: "5460aeae7e340",
    calpe: "5460aeae7180f",
    "calpe calp": "5460aeae7180f",
    denia: "5adf5aac56557",
    dénia: "5adf5aac56557",
    javea: "594b56d5b4c99",
    "jávea": "594b56d5b4c99",
    "costa del sol": "5460aecaa212c",
    malaga: "5460aecaa212c",
    marbella: "5460aecaa212c",
    fuengirola: "5460aecaa212c",
    torremolinos: "5460aecaa212c",
    mallorca: "5460aec60bc58",
    palma: "5460aec60bc58",
    "costa brava": "5460aeae704b7",
    "cote d azur": "5460aec0514e4",
    "côte d azur": "5460aec0514e4",
    "côte d'azur": "5460aec0514e4",
    dalmatia: "5460aeb3581cb",
    dalmatiaen: "5460aeb3581cb"
  };

  const aiInterhomePaths = {
    spania: "/spania/",
    spain: "/spania/",
    italia: "/italia/",
    italy: "/italia/",
    frankrike: "/frankrike/",
    france: "/frankrike/",
    norge: "/norge/",
    norway: "/norge/",
    kroatia: "/kroatia/",
    croatia: "/kroatia/",
    barcelona: "/spania/barcelona-nordkysten/barcelona/",
    madrid: "/spania/madrid/",
    valencia: "/spania/valencia/",
    sevilla: "/spania/andalucia/sevilla/",
    seville: "/spania/andalucia/sevilla/",
    ibiza: "/spania/ibiza/",
    "costa brava": "/spania/barcelona-nordkysten/barcelona/",
    lloret: "/spania/barcelona-nordkysten/barcelona/",
    "lloret de mar": "/spania/barcelona-nordkysten/barcelona/",
    mallorca: "/spania/mallorca/",
    palma: "/spania/mallorca/",
    malaga: "/spania/costa-del-sol/malaga/",
    málaga: "/spania/costa-del-sol/malaga/",
    marbella: "/spania/costa-del-sol/marbella/",
    fuengirola: "/spania/costa-del-sol/malaga/",
    nerja: "/spania/costa-del-sol/malaga/",
    alicante: "/spania/costa-blanca/alicante/",
    benidorm: "/spania/costa-blanca/benidorm/",
    calpe: "/spania/costa-blanca/alicante/",
    denia: "/spania/costa-blanca/alicante/",
    dénia: "/spania/costa-blanca/alicante/",
    javea: "/spania/costa-blanca/alicante/",
    "jávea": "/spania/costa-blanca/alicante/",
    "gran canaria": "/spania/kanarioyene-gran-canaria/",
    tenerife: "/spania/kanarioyene-tenerife/",
    toscana: "/italia/toscana/",
    tuscany: "/italia/toscana/",
    piemonte: "/italia/piemonte/",
    "cote d azur": "/frankrike/cote-d-azur/",
    "côte d azur": "/frankrike/cote-d-azur/",
    "côte d'azur": "/frankrike/cote-d-azur/",
    dalmatia: "/kroatia/dalmatia/",
    dalmatiaen: "/kroatia/dalmatia/",
    danmark: "/danmark/",
    denmark: "/danmark/",
    portugal: "/portugal/",
    sveits: "/sveits/",
    switzerland: "/sveits/",
    sverige: "/sverige/",
    sweden: "/sverige/",
    tyskland: "/tyskland/",
    germany: "/tyskland/",
    østerrike: "/osterrike/",
    osterrike: "/osterrike/",
    austria: "/osterrike/"
  };

  function aiDestinationKey(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function aiInterhomeDestination(text = "") {
    const route = parseAiRoute(text);
    const match = String(text).match(/(?:til|i|på)\s+(.+)$/i);
    return placeName(route.to || match?.[1] || stripAiTravelWords(text)).trim();
  }

  function aiInterhomeUrl(text = "") {
    const place = aiInterhomeDestination(text);
    const key = aiDestinationKey(place);
    const directMatch = Object.keys(aiInterhomeDestinations)
      .sort((a, b) => b.length - a.length)
      .find((item) => key === item || key.includes(item));
    let target = directMatch ? `https://www.interhome.no/search/${aiInterhomeDestinations[directMatch]}` : "https://www.interhome.no/search/";
    const targetUrl = new URL(target);
    const depart = $("departDate")?.value || addDaysISO(14);
    const ret = $("returnDate")?.value || addDaysISO(21);
    const departDate = new Date(`${depart}T12:00:00`);
    const returnDate = new Date(`${ret}T12:00:00`);
    const duration = Math.max(1, Math.round((returnDate - departDate) / 86400000) || 7);
    const adults = Math.max(1, Math.min(9, Number($("adults")?.value || 2)));
    const children = Math.max(0, Math.min(8, Number($("children")?.value || 0)));
    if (place) {
      targetUrl.searchParams.set("destination", place);
      targetUrl.searchParams.set("q", place);
    }
    targetUrl.searchParams.set("arrival", depart);
    targetUrl.searchParams.set("duration", String(duration));
    targetUrl.searchParams.set("adults", String(adults));
    targetUrl.searchParams.set("persons", String(adults + children));
    if (children) targetUrl.searchParams.set("children", String(children));
    const url = new URL((window.BR_AFFILIATES && window.BR_AFFILIATES.interhome) || "https://tc.tradetracker.net/?c=27484&m=1269456&a=509866&r=&u=https%3A%2F%2Fwww.interhome.no%2F");
    url.searchParams.set("u", targetUrl.toString());
    return url.toString();
  }

  function extractFlight(text) {
    const low = text.toLowerCase();
    const route = parseAiRoute(text);
    const from = route.from ? resolveCity(route.from, route.from) : "Oslo (OSL)";
    const to = route.to ? resolveCity(route.to, route.to) : "";
    const adults = (low.match(/(\d+)\s*(?:voksen|voksne|adult)/)?.[1]) || "2";
    const children = (low.match(/(\d+)\s*(?:barn|child|children)/)?.[1]) || "0";
    return { from, to, adults, children };
  }

  function extractPlaceAfter(text, words) {
    const low = text.toLowerCase();
    const pattern = new RegExp(`(?:${words.join("|")})\\s+(?:i|in|på|til)?\\s*([a-zæøå\\s]+)`, "i");
    const match = low.match(pattern);
    return match ? findCity(match[1], match[1].trim().replace(/\b\d+\b/g, "")) : findCity(text, "");
  }

  function fillFlight(text) {
    const data = extractFlight(text);
    setTab("flight");
    setValue("fromCity", data.from || "Oslo (OSL)");
    setValue("toCity", data.to || "");
    setValue("adults", data.adults);
    setValue("children", data.children);
    if (!data.to) {
      addMessage("Jeg har valgt flysøk og satt avreise til <b>Oslo</b>. Skriv reisemålet også, så åpner jeg riktig Kiwi-søk.", "bot");
      document.getElementById("travelSearch")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    addMessage(`Jeg har fylt ut flysøk: <b>${data.from || "Oslo"} → ${data.to}</b>, ${data.adults} voksne og ${data.children} barn. Velg dato i kalenderfeltet, eller åpne et ferdig Kiwi-søk med standarddato.`, "bot", {
      label: "Åpne Kiwi-søk",
      onClick: () => {
        const url = aiFlightUrl(data);
        if (url) window.open(url, "_blank", "noopener,noreferrer");
      }
    });
    document.getElementById("travelSearch")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function fillHotel(text) {
    const place = placeName(extractPlaceAfter(text, ["hotell", "hotel", "bo"]));
    setTab("hotel");
    setValue("fromCity", "");
    setValue("toCity", place || "Roma");
    setValue("adults", "2");
    setValue("children", "0");
    addMessage(`Jeg har fylt ut hotellsøk for <b>${place || "Roma"}</b>. Velg innsjekk og utsjekk, eller åpne Hotels.com med standarddato.`, "bot", {
      label: "Åpne Hotels.com",
      onClick: () => window.open(aiHotelUrl(place || "Roma"), "_blank", "noopener,noreferrer")
    });
    document.getElementById("travelSearch")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function fillCar(text) {
    const place = extractPlaceAfter(text, ["leiebil", "bil", "rental", "car"]);
    setTab("car");
    setValue("fromCity", place || "Alicante (ALC)");
    setValue("toCity", "");
    addMessage(`Jeg har fylt ut leiebilsøk for <b>${place || "Alicante"}</b>. Velg dato hvis du vil, eller åpne leiebilpartneren direkte.`, "bot", {
      label: "Åpne leiebil",
      onClick: () => window.open(aiCarUrl(place || "Alicante (ALC)"), "_blank", "noopener,noreferrer")
    });
    document.getElementById("travelSearch")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function inspire(text) {
    const low = text.toLowerCase();
    if (low.includes("familie") || low.includes("barn")) {
      addMessage("For familie ville jeg sjekket <b>Mallorca</b>, <b>Dubai</b> eller <b>Orlando</b>. Kort flytid og bassenghotell gir ofte best totalverdi. Vil du at jeg fyller ut flysøk til Mallorca?", "bot", { label: "Fyll Mallorca", onClick: () => fillFlight("fly oslo til mallorca 2 voksne 2 barn") });
    } else if (low.includes("sol") || low.includes("varmt")) {
      addMessage("Gode solvalg: <b>Malaga</b>, <b>Alicante</b>, <b>Dubai</b> og <b>Bangkok</b>. For billigst totalpris er Malaga/Alicante ofte sterke valg.", "bot", { label: "Fyll Malaga", onClick: () => fillFlight("fly oslo til malaga 2 voksne") });
    } else if (low.includes("weekend") || low.includes("helg")) {
      addMessage("Fine weekendvalg: <b>Roma</b>, <b>Paris</b>, <b>Barcelona</b> og <b>Nice</b>. Roma er ofte bra på pris + matopplevelser.", "bot", { label: "Fyll Roma", onClick: () => fillFlight("fly oslo til roma 2 voksne") });
    } else {
      addMessage("Jeg kan hjelpe med fly, hotell og leiebil. Prøv: <b>Fly Oslo til Bangkok 2 voksne 1 barn</b>, <b>hotell i Paris</b> eller <b>leiebil i Alicante</b>.");
    }
  }

  function openCruise(text = "") {
    const destination = aiCruisePlace(text);
    const url = aiCruiseUrl(text);
    addMessage(`Jeg åpner <b>Expedia Cruise</b>${destination ? ` fra <b>${destination}</b>` : " for Europa"}. Der kan du sortere videre på rederi, lugar og varighet.`, "bot", {
      label: "Åpne cruise",
      onClick: () => window.open(url, "_blank", "noopener,noreferrer")
    });
  }

  function openPackageTravel(text = "") {
    const data = extractFlight(text || "");
    setTab("package");
    setValue("fromCity", data.from || "Oslo (OSL)");
    setValue("toCity", data.to || "");
    setValue("adults", data.adults || "2");
    setValue("children", data.children || "0");
    if (!data.to) {
      addMessage("Jeg har valgt pakkereise og satt avreise til <b>Oslo</b>. Skriv reisemålet i feltet, så åpner knappen et ferdig pakkesøk.", "bot");
      document.getElementById("travelSearch")?.scrollIntoView({ behavior: "smooth", block: "center" });
      $("toCity")?.focus();
      return;
    }
    addMessage(`Jeg har fylt ut pakkereise: <b>${data.from || "Oslo"} → ${data.to}</b>. Knappen åpner Expedia fly + hotell med standarddato hvis du ikke velger dato selv.`, "bot", {
      label: "Åpne fly + hotell",
      onClick: () => {
        const url = aiPackageUrl(data);
        if (url) window.open(url, "_blank", "noopener,noreferrer");
      }
    });
    document.getElementById("travelSearch")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function openInterhome(text = "") {
    const url = aiInterhomeUrl(text);
    const destination = aiInterhomeDestination(text);
    addMessage(`Jeg åpner <b>Interhome</b>${destination ? ` med søk på <b>${destination}</b>` : ""} for feriehus, villaer, hytter og ferieleiligheter.`, "bot", {
      label: "Åpne Interhome",
      onClick: () => window.open(url, "_blank", "noopener,noreferrer")
    });
  }

  function openFlightDelay() {
    const url = (window.BR_AFFILIATES && window.BR_AFFILIATES.flightDelay) || "https://deals.flyforsinkelser.no/c?c=40284&m=2508483&a=509866&r=&u=";
    addMessage("Jeg åpner <b>Flyforsinkelser.no</b>. Der kan du sjekke om forsinkelse eller kansellering gir rett til erstatning.", "bot", {
      label: "Sjekk erstatning",
      onClick: () => window.open(url, "_blank", "noopener,noreferrer")
    });
  }

  function openTuiRestplass() {
    const url = (window.BR_AFFILIATES && window.BR_AFFILIATES.tuiRestplass) || "https://tc.tradetracker.net/?c=35742&m=2133355&a=509866&r=&u=https%3A%2F%2Fwww.tui.no%2Ftilbud%2Frestplass%2F";
    addMessage("Jeg åpner <b>TUI restplass</b>. Der finner du charter, pakkereiser og sydenturer.", "bot", {
      label: "Se TUI restplass",
      onClick: () => window.open(url, "_blank", "noopener,noreferrer")
    });
  }

  function handle(text) {
    const low = text.toLowerCase();
    if (low.includes("restplass") || low.includes("charter") || low.includes("sydentur") || low.includes("syden")) return openTuiRestplass();
    if (low.includes("forsink") || low.includes("kansell") || low.includes("erstatning")) return openFlightDelay();
    if (low.includes("feriebolig") || low.includes("feriehus") || low.includes("villa") || low.includes("hytte") || low.includes("leilighet")) return openInterhome(text);
    if (low.includes("pakkereise") || low.includes("pakke reise") || low.includes("fly + hotell") || low.includes("fly og hotell")) return openPackageTravel(text);
    if (low.includes("cruise")) return openCruise(text);
    if (/(fly|flight|fra|from).*(til|to)/.test(low) || low.includes("bangkok") || low.includes("mallorca")) return fillFlight(text);
    if (low.includes("hotell") || low.includes("hotel") || low.includes("overnatting")) return fillHotel(text);
    if (low.includes("leiebil") || low.includes("rental") || low.includes("bil i") || low.includes("car")) return fillCar(text);
    return inspire(text);
  }

  toggle?.addEventListener("click", () => openPanel(true));
  close?.addEventListener("click", closePanel);
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input?.value.trim();
    if (!text) return;
    addMessage(text, "user");
    if (input) input.value = "";
    setTimeout(() => handle(text), 180);
  });
  document.querySelectorAll("[data-ai-chip]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const text = chip.dataset.aiChip || chip.textContent || "";
      addMessage(text, "user");
      setTimeout(() => handle(text), 120);
    });
  });
})();
