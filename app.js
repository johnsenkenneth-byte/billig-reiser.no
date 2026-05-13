/* BR build: LIVE-KIWI-AIRPORT-SEARCH-2026-05-09 */


/* Discovery Engine + Deal Engine */
(() => {
  const partners = {
    // Safe Kiwi fallback. Dynamic search below uses /api/travelpayouts-link first.
    flights: (window.BR_AFFILIATES && window.BR_AFFILIATES.flights) || "https://www.tkqlhce.com/click-101724638-13829856",
    cheapFlights: (window.BR_AFFILIATES && window.BR_AFFILIATES.cheapFlights) || "https://www.tkqlhce.com/click-101724638-13829856",
    cheaptickets: "https://www.dpbolvw.net/click-101724638-17085753",
    iberia: "https://www.kqzyfj.com/click-101724638-15735979",
    hotels: (window.BR_AFFILIATES && window.BR_AFFILIATES.hotels) || "https://www.tkqlhce.com/click-101724638-14361426",
    car: (window.BR_AFFILIATES && window.BR_AFFILIATES.car) || "https://www.jdoqocy.com/click-101724638-17010909",
    autoeurope: (window.BR_AFFILIATES && window.BR_AFFILIATES.autoEurope) || "https://autoeurope.tpx.gr/GzEPjKLD",
    activities: (window.BR_AFFILIATES && window.BR_AFFILIATES.activities) || "https://klook.tpx.gr/Tf7VcyFs",
    kkday: (window.BR_AFFILIATES && window.BR_AFFILIATES.kkday) || "https://kkday.tpx.gr/WlhfXaEZ",
    transfer: (window.BR_AFFILIATES && window.BR_AFFILIATES.transfer) || "https://gettransfer.tpx.gr/1szV5hHx",
    airhelp: (window.BR_AFFILIATES && window.BR_AFFILIATES.airhelp) || "https://airhelp.tpx.gr/kX3vy6XB"
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
      ["Toscana", "Perfekt med Enjoy Travel / AutoEurope og fleksibel rute.", "bil fra 249 kr/dag", partners.car],
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
      ["Opplevelser", "Tokyo aktiviteter", "Attraksjoner, togpass og eSIM.", "fra 129 kr", partners.activities],
      ["Transport", "Flyplasstransfer", "Fast pris fra flyplassen til hotellet.", "fra 199 kr", partners.transfer]
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


/* Robust Leaflet live map repair */
(function(){
  const partners = {
    cheapFlights: (window.BR_AFFILIATES && window.BR_AFFILIATES.cheapFlights) || "https://www.tkqlhce.com/click-101724638-13829856",
    flights: (window.BR_AFFILIATES && window.BR_AFFILIATES.flights) || "https://www.tkqlhce.com/click-101724638-13829856"
  };
  const dealPins = [
    { name:"Roma", price:"fra 499 kr", discount:"-52%", lat:41.9028, lng:12.4964, color:"blue", url:partners.cheapFlights },
    { name:"New York", price:"fra 2990 kr", discount:"-28%", lat:40.7128, lng:-74.0060, color:"purple", url:partners.cheapFlights },
    { name:"Dubai", price:"fra 1499 kr", discount:"-31%", lat:25.2048, lng:55.2708, color:"green", url:partners.cheapFlights },
    { name:"Bali", price:"fra 3290 kr", discount:"-30%", lat:-8.3405, lng:115.0920, color:"purple", url:"https://klook.tpx.gr/Tf7VcyFs" },
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

  function showCookieBanner() {
    const banner = document.getElementById("cookieBanner");
    if (!banner) return;
    const choice = localStorage.getItem("br_cookie_choice");
    if (!choice) banner.classList.add("show");

    const accept = document.getElementById("cookieAccept");
    const reject = document.getElementById("cookieReject");
    if (accept) accept.addEventListener("click", () => {
      localStorage.setItem("br_cookie_choice", "accepted");
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
   Flight: direct Kiwi.com deep link with live airport autocomplete.
   Hotel: Hotels.com affiliate deeplink wrapper.
   Car: direct Enjoy Travel / AutoEurope partner link with selected context.
*/
(() => {
  const TRAVELPAYOUTS_MARKER = "517483";
  const AFFILIATE_LINKS = {
    // CJ/TP-partnere som faktisk er aktive hos deg. Flysøk går primært direkte
    // til Kiwi for stabilt søk, mens deals/alternativer bruker CJ-partnerne.
    hotels: (window.BR_AFFILIATES && window.BR_AFFILIATES.hotels) || "https://www.tkqlhce.com/click-101724638-14361426",
    cheapTickets: "https://www.dpbolvw.net/click-101724638-17085753",
    cheapFlights: (window.BR_AFFILIATES && window.BR_AFFILIATES.cheapFlights) || "https://www.tkqlhce.com/click-101724638-13829856",
    iberia: "https://www.kqzyfj.com/click-101724638-15735979",
    enjoyTravel: (window.BR_AFFILIATES && window.BR_AFFILIATES.enjoyTravel) || "https://www.jdoqocy.com/click-101724638-17010909",
    autoEurope: (window.BR_AFFILIATES && window.BR_AFFILIATES.autoEurope) || "https://autoeurope.tpx.gr/GzEPjKLD",
    carFallback: (window.BR_AFFILIATES && window.BR_AFFILIATES.car) || "https://www.jdoqocy.com/click-101724638-17010909"
  };

  let currentSearchType = "flight";
  const blankTabState = () => ({ from: "", to: "", depart: "", ret: "", adults: "2", children: "0" });
  const tabStates = {
    flight: blankTabState(),
    hotel: blankTabState(),
    car: blankTabState()
  };

  const $ = (id) => document.getElementById(id);
  const clean = (value, fallback = "") => (String(value || "").trim() || fallback);
  const cityForUrl = (value) => clean(value).replace(/\s+/g, " ");

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
      from: cityForUrl($("fromCity")?.value),
      to: cityForUrl($("toCity")?.value),
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
    const state = readSearchState({ forUrl: true });
    const base = new Date();
    base.setMonth(base.getMonth() + calendarMonthOffset, 1);
    const next = new Date(base.getFullYear(), base.getMonth() + 1, 1);
    const departLabel = currentSearchType === "hotel" ? "Innsjekk" : currentSearchType === "car" ? "Hentedato" : "Avreise";
    const returnLabel = currentSearchType === "hotel" ? "Utsjekk" : currentSearchType === "car" ? "Leveringsdato" : "Retur";

    box.innerHTML = `
      <div class="calendar-header">
        <div><strong>Velg datoer</strong><small>${departLabel}: ${rawState.depart || "Ikke valgt"} • ${returnLabel}: ${rawState.ret || "Ikke valgt"}</small></div>
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
    const currentDepart = depart?.value || todayISO();

    if (calendarPicking === "depart" || iso <= currentDepart) {
      if (depart) depart.value = iso;
      if (ret && (!ret.value || ret.value <= iso)) ret.value = addDaysToISO(iso, 7);
      calendarPicking = "return";
    } else {
      if (ret) ret.value = iso;
      calendarPicking = "depart";
    }

    ensureFreshDates(false);
    updateSearchPreview();
    renderLiveCalendar();
  }

  function saveFormToTabState(type = currentSearchType) {
    const key = type || "flight";
    if (!tabStates[key]) return;
    tabStates[key] = {
      from: $("fromCity")?.value || "",
      to: $("toCity")?.value || "",
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
  }

  function resetActiveTabSearch() {
    tabStates[currentSearchType] = blankTabState();
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

    if (button) {
      if (currentSearchType === "hotel") {
        button.textContent = state.to ? `SØK HOTELL I ${state.to.toUpperCase()} 🔎` : "SØK HOTELL 🔎";
      } else if (currentSearchType === "car") {
        button.textContent = state.from ? `SØK LEIEBIL I ${state.from.toUpperCase()} 🔎` : "SØK LEIEBIL 🔎";
      } else if (state.from && state.to) {
        button.textContent = `SØK FLY ${state.from.toUpperCase()} → ${state.to.toUpperCase()} 🔎`;
      } else {
        button.textContent = "SØK FLY 🔎";
      }
    }

    if (helper) {
      if (currentSearchType === "hotel") {
        helper.textContent = state.to ? `Hotellsøk: ${state.to} • ${state.depart} til ${state.ret} • ${state.adults} gjester.` : "Skriv byen du vil bo i — så åpnes Hotels.com rett på hotell i den byen.";
      } else if (currentSearchType === "car") {
        helper.textContent = state.from ? `Leiebil: ${state.from} • ${state.depart || "velg hentedato"} til ${state.ret || "velg levering"}.` : "Skriv hentested eller flyplass — så åpnes leiebilpartner med forhåndsutfylt hentested og dato så langt partneren tillater.";
      } else {
        helper.textContent = (state.from && state.to) ? `Flysøk: ${state.from} → ${state.to} • ${state.depart} til ${state.ret} • ${state.adults} reisende.` : "Skriv by eller IATA-kode — velg forslag, så åpnes flypartner med riktig søk.";
      }
    }

    scheduleLivePriceUpdate();
    saveFormToTabState(currentSearchType);
  }

  function affiliateWrap(baseAffiliateUrl, targetUrl) {
    // CJ deep links use the url= parameter. We keep the target fully encoded so
    // Expedia receives all search parameters after the CJ tracking redirect.
    const separator = baseAffiliateUrl.includes("?") ? "&" : "?";
    return `${baseAffiliateUrl}${separator}url=${encodeURIComponent(targetUrl)}`;
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

    const close = () => { list.innerHTML = ""; list.classList.remove("show"); };
    const choose = (item) => {
      input.value = airportDisplay(item);
      input.dataset.airportCode = item.code;
      close();
      updateSearchPreview();
      input.dispatchEvent(new Event("change", { bubbles:true }));
    };

    const render = () => {
      const isCarPickup = currentSearchType === "car" && inputId === "fromCity";
      if (currentSearchType !== "flight" && !isCarPickup) { close(); return; }
      const q = normalizeSearch(input.value);
      if (!q) { close(); return; }
      const matches = AIRPORT_SUGGESTIONS
        .map((item) => {
          const hay = normalizeSearch(`${item.city} ${item.name} ${item.country} ${item.code} ${item.aliases.join(" ")}`);
          const starts = normalizeSearch(item.city).startsWith(q) || item.code.toLowerCase().startsWith(q);
          return hay.includes(q) ? { item, score: starts ? 0 : 1 } : null;
        })
        .filter(Boolean)
        .sort((a,b) => a.score - b.score || a.item.city.localeCompare(b.item.city, "nb"))
        .slice(0, 7)
        .map(({item}) => item);

      if (!matches.length) {
        list.innerHTML = `<div class="airport-empty">Ingen forslag funnet. Skriv by/flyplass, f.eks. Oslo eller OSL.</div>`;
        list.classList.add("show");
        return;
      }

      list.innerHTML = matches.map((item) => `
        <button type="button" role="option" data-airport-code="${item.code}">
          <span><b>${item.city}</b><small>${isCarPickup ? "Hentested" : item.name} • ${item.country}</small></span>
          <em>${item.code}</em>
        </button>`).join("");
      list.classList.add("show");
    };

    input.addEventListener("input", () => { delete input.dataset.airportCode; render(); });
    input.addEventListener("focus", render);
    input.addEventListener("blur", () => setTimeout(close, 140));
    list.addEventListener("mousedown", (event) => event.preventDefault());
    list.addEventListener("click", (event) => {
      const button = event.target.closest("[data-airport-code]");
      if (!button) return;
      const item = AIRPORT_SUGGESTIONS.find((entry) => entry.code === button.dataset.airportCode);
      if (item) choose(item);
    });
  }

  function buildFlightDirectUrl(state) {
    const from = airportCode(state.from);
    const to = airportCode(state.to);
    const depart = state.depart;
    const ret = state.ret;
    const expediaTarget = new URL("https://www.expedia.no/Flights-Search");
    expediaTarget.searchParams.set("trip", "roundtrip");
    expediaTarget.searchParams.set("leg1", `from:${from},to:${to},departure:${depart}TANYT`);
    expediaTarget.searchParams.set("leg2", `from:${to},to:${from},departure:${ret}TANYT`);
    expediaTarget.searchParams.set("passengers", `adults:${state.adults || "1"},children:${state.children || "0"}`);
    expediaTarget.searchParams.set("mode", "search");
    expediaTarget.searchParams.set("options", "cabinclass:economy");
    return affiliateWrap(AFFILIATE_LINKS.cheapFlights, expediaTarget.toString());
  }

  function buildFlightUrl(state) {
    // Safe fallback only. Affiliate tracking is attempted in buildFlightPartnerUrl().
    return buildFlightDirectUrl(state);
  }

  async function buildFlightPartnerUrl(state) {
    // Flysøk går via stabil CJ-deeplink til Expedia flysøk.
    return buildFlightDirectUrl(state);
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
    url.searchParams.set("locale", "no_NO");
    url.searchParams.set("currency", "NOK");
    url.searchParams.set("pos", "HCOM_NO");
    url.searchParams.set("siteid", "300000012");
    return affiliateWrap(AFFILIATE_LINKS.hotels, url.toString());
  }

  function buildCarDirectUrl(state) {
    // Enjoy Travel/CJ brukes som hovedpartner for leiebil når direkte søk ikke støttes.
    return AFFILIATE_LINKS.enjoyTravel || AFFILIATE_LINKS.car || "https://www.jdoqocy.com/click-101724638-17010909";
  }


  function buildCarUrl(state) {
    // Send brukeren til leiebilpartner. Enjoy/AutoEurope håndterer faktisk søk på sin side.
    return buildCarDirectUrl(state);
  }

  async function buildCarPartnerUrl(state) {
    return buildCarDirectUrl(state);
  }

  let livePriceTimer = null;
  let livePriceAbort = null;

  function formatNOK(value) {
    try {
      return new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK", maximumFractionDigits: 0 }).format(Number(value));
    } catch (e) {
      return `${Math.round(Number(value) || 0)} kr`;
    }
  }

  function setLiveBox(html, show = true) {
    const box = $("tpLiveBox");
    if (!box) return;
    box.innerHTML = html || "";
    box.classList.toggle("show", Boolean(show && html));
  }

  function scheduleLivePriceUpdate() {
    const box = $("tpLiveBox");
    if (!box) return;
    clearTimeout(livePriceTimer);

    const state = readSearchState();
    if (currentSearchType !== "flight" || !state.from || !state.to) {
      setLiveBox("", false);
      return;
    }

    const from = airportCode(state.from);
    const to = airportCode(state.to);
    if (!/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to)) {
      setLiveBox("", false);
      return;
    }

    livePriceTimer = setTimeout(async () => {
      try {
        if (livePriceAbort) livePriceAbort.abort();
        livePriceAbort = new AbortController();
        setLiveBox(`<div class="tp-row"><span>Henter live prisindikasjon for <b>${from} → ${to}</b> …</span><span class="tp-muted">Travelpayouts</span></div>`);

        const url = new URL("/api/travelpayouts-prices", window.location.origin);
        url.searchParams.set("origin", from);
        url.searchParams.set("destination", to);
        url.searchParams.set("depart_date", state.depart);
        url.searchParams.set("return_date", state.ret);
        url.searchParams.set("currency", "NOK");

        const response = await fetch(url.toString(), { signal: livePriceAbort.signal });
        const data = await response.json();
        const offer = data?.offers?.[0];
        if (!data?.success || !offer) {
          setLiveBox(`<div class="tp-row"><span>Ingen cached pris funnet akkurat nå for <b>${from} → ${to}</b>.</span><span class="tp-muted">Søk åpner likevel ferdig hos partner.</span></div>`);
          return;
        }

        const date = offer.departure_at ? new Date(offer.departure_at).toLocaleDateString("nb-NO") : state.depart;
        setLiveBox(`
          <div class="tp-row">
            <span>Prisindikasjon <b>${from} → ${to}</b><small>Billigste cached pris hos Travelpayouts • avreise ca. ${date}${offer.airline ? ` • ${offer.airline}` : ""}</small></span>
            <span class="tp-price">fra ${formatNOK(offer.price)}</span>
          </div>
        `);
      } catch (error) {
        if (error?.name !== "AbortError") setLiveBox("", false);
      }
    }, 650);
  }

  function buildPartnerTarget() {
    const state = readSearchState({ forUrl: true });

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

    const fromLabel = $("fromLabel");
    const toLabel = $("toLabel");
    const departLabel = $("departLabel");
    const returnLabel = $("returnLabel");
    const adultsLabel = $("adultsLabel");
    const from = $("fromCity");
    const to = $("toCity");

    if (currentSearchType === "hotel") {
      if (fromLabel) fromLabel.textContent = "Land / område";
      if (toLabel) toLabel.textContent = "Hvor vil du bo?";
      if (departLabel) departLabel.textContent = "Innsjekk";
      if (returnLabel) returnLabel.textContent = "Utsjekk";
      if (adultsLabel) adultsLabel.textContent = "Gjester";
      if (from) from.placeholder = "Valgfritt";
      if (to) to.placeholder = "Skriv by, område eller hotell";
    } else if (currentSearchType === "car") {
      if (fromLabel) fromLabel.textContent = "Hvor henter du bilen?";
      if (toLabel) toLabel.textContent = "Leveres samme sted";
      if (departLabel) departLabel.textContent = "Hentedato";
      if (returnLabel) returnLabel.textContent = "Leveringsdato";
      if (adultsLabel) adultsLabel.textContent = "";
      if (from) from.placeholder = "Skriv by/flyplass, f.eks. Alicante eller OSL";
      if (to) to.placeholder = "Samme sted som henting";
    } else {
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
    } else if (currentSearchType === "hotel") {
      toggle.textContent = `${adults} voksne${children ? `, ${children} barn` : ""}`;
    } else {
      toggle.textContent = `${adults} voksne, ${children} barn`;
    }
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
    updateTravelerSummary();
  }

  function initPartnerSearch() {
    const form = $("travelSearch");
    if (!form) return;

    restoreSearchState();
    initTravelerPicker();
    ensureFreshDates(false);
    attachAirportAutocomplete("fromCity", "Forslag til avreiseflyplass");
    attachAirportAutocomplete("toCity", "Forslag til reisemål");

    document.querySelectorAll("[data-search-type]").forEach((btn) => {
      btn.addEventListener("click", () => setSearchType(btn.dataset.searchType));
    });

    ["fromCity", "toCity", "departDate", "returnDate", "adults", "children"].forEach((id) => {
      const el = $(id);
      if (el) {
        el.addEventListener("input", () => { updateSearchPreview(); renderLiveCalendar(); });
        el.addEventListener("change", () => { ensureFreshDates(false); updateSearchPreview(); renderLiveCalendar(); });
      }
    });

    $("liveDateCalendar")?.addEventListener("click", handleCalendarClick);
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
          if (button) button.textContent = "ÅPNER LEIEBILPARTNER…";
          target = await buildCarPartnerUrl(state);
          if (button && oldText) button.textContent = oldText;
        } else if (currentSearchType === "flight") {
          if (!state.from || !state.to) throw new Error("Skriv inn både avreisested og reisemål.");
          const button = $("searchSubmitButton");
          const oldText = button?.textContent;
          if (button) button.textContent = "ÅPNER FLYSØK…";
          target = await buildFlightPartnerUrl(state);
          if (button && oldText) button.textContent = oldText;
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
    const btn = document.querySelector(`[data-search-type="${type}"]`);
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

  function extractFlight(text) {
    const low = text.toLowerCase();
    const route = low.match(/(?:fra|from)\s+([a-zæøå\s]+?)\s+(?:til|to)\s+([a-zæøå\s]+)/i);
    let from = "";
    let to = "";
    if (route) {
      from = findCity(route[1], route[1].trim());
      to = findCity(route[2], route[2].trim());
    } else {
      from = low.includes("oslo") ? "Oslo (OSL)" : "";
      to = findCity(text.replace(/oslo/ig, ""), "");
    }
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
    setValue("toCity", data.to || "Bangkok (BKK)");
    setValue("adults", data.adults);
    setValue("children", data.children);
    addMessage(`Jeg har fylt ut flysøk: <b>${data.from || "Oslo"} → ${data.to || "Bangkok"}</b>, ${data.adults} voksne og ${data.children} barn. Velg dato i kalenderfeltet, eller søk med standarddato.`, "bot", {
      label: "Søk fly nå",
      onClick: () => $("searchSubmitButton")?.click()
    });
    document.getElementById("travelSearch")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function fillHotel(text) {
    const place = extractPlaceAfter(text, ["hotell", "hotel", "bo"]);
    setTab("hotel");
    setValue("fromCity", "");
    setValue("toCity", place || "Roma");
    setValue("adults", "2");
    setValue("children", "0");
    addMessage(`Jeg har fylt ut hotellsøk for <b>${place || "Roma"}</b>. Velg innsjekk og utsjekk, eller søk med standarddato.`, "bot", {
      label: "Søk hotell nå",
      onClick: () => $("searchSubmitButton")?.click()
    });
    document.getElementById("travelSearch")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function fillCar(text) {
    const place = extractPlaceAfter(text, ["leiebil", "bil", "rental", "car"]);
    setTab("car");
    setValue("fromCity", place || "Alicante (ALC)");
    setValue("toCity", "");
    addMessage(`Jeg har fylt ut leiebilsøk for <b>${place || "Alicante"}</b>. Velg hentedato og leveringsdato før du søker.`, "bot", {
      label: "Søk leiebil nå",
      onClick: () => $("searchSubmitButton")?.click()
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

  function handle(text) {
    const low = text.toLowerCase();
    if (/(fly|flight|fra|from).*(til|to)/.test(low) || low.includes("bangkok") || low.includes("mallorca")) return fillFlight(text);
    if (low.includes("hotell") || low.includes("hotel") || low.includes("overnatting")) return fillHotel(text);
    if (low.includes("leiebil") || low.includes("rental") || low.includes("bil i") || low.includes("car")) return fillCar(text);
    return inspire(text);
  }

  // Open as a friendly popup once per browser session
  setTimeout(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("brAiPopupSeen") === "1"; } catch(e) {}
    if (!seen && panel?.hidden) openPanel(false);
  }, 1400);

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
