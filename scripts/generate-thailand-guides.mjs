import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fallbackSearch = (place) => `https://www.hotels.com/Hotel-Search?destination=${encodeURIComponent(`${place}, Thailand`)}`;
const hotel = (name, image, url, text) => ({ name, image, url, text });

function extractImages(file, className, folder, limit, scope = "") {
  let html = fs.readFileSync(path.join(root, file), "utf8");
  if (scope && html.includes(scope)) html = html.slice(html.indexOf(scope));
  const tags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const images = tags.filter((tag) => new RegExp(`class=["'][^"']*${className}`).test(tag))
    .map((tag) => tag.match(/src=["']data:image\/webp;base64,([^"']+)/)?.[1]).filter(Boolean).slice(0, limit);
  const output = path.join(root, "assets", "thailand-guides", folder);
  fs.mkdirSync(output, { recursive: true });
  images.forEach((base64, index) => fs.writeFileSync(path.join(output, `hotel-${index + 1}.webp`), Buffer.from(base64, "base64")));
  return images.map((_, index) => `assets/thailand-guides/${folder}/hotel-${index + 1}.webp`);
}

const extracted = {
  samui: extractImages("reise-thailand-koh-samui.html", "samui-main-img", "koh-samui", 6),
  phangan: extractImages("reise-thailand-koh-phangan.html", "hotel-hero-img", "koh-phangan", 4),
  tao: extractImages("reise-thailand-koh-tao.html", "main-img", "koh-tao", 6, 'id="hoteller"'),
};

const destinations = [
  {
    file: "bangkok.html", slug: "bangkok", name: "Bangkok", hero: "assets/destinations/bangkok-v22.jpg", badge: "Storby, mat og kultur",
    intro: "Bangkok er Thailand i høyt tempo: elvehoteller, nattmarkeder, street food, templer, shopping og rooftop-kvelder. Bruk byen som en tydelig start eller avslutning på reisen.",
    facts: [["Passer best for","Mat, shopping og storby"],["Legg inn","2-4 netter"],["Velg område","Etter reisestilen din"]],
    areas: [["Riverside","Roligere kvelder, elveutsikt og enkel tilgang til båtene."],["Sukhumvit","BTS, restauranter og en praktisk base for førstegangsreisende."],["Siam og Silom","Shopping, skyline og kort vei til store severdigheter."]],
    highlights: [["Street food","Ta en kveld med lokale smaker, nattmarkeder og små restauranter."],["Templer og elven","Kombiner Wat Pho, Grand Palace og båtene på Chao Phraya."],["Rooftop-kveld","Avslutt dagen med utsikt over bylysene."]],
    hotels: [
      hotel("Mandarin Oriental Bangkok","assets/bangkok/cards/mandarin-oriental-bangkok-v22.jpg","https://www.hotels.com/affiliates/mandarin-oriental-bangkok-bangkok-thailand.tDchGpe","Klassisk luksus ved Chao Phraya."),
      hotel("Capella Bangkok","assets/bangkok/cards/capella-bangkok-v22.jpg","https://www.hotels.com/affiliates/capella-bangkok-bangkok-thailand.iMbCnSh","Rolig resortfølelse ved elven."),
      hotel("Carlton Hotel Bangkok","assets/bangkok/cards/carlton-hotel-bangkok-sukhumvit-v22.jpg","https://www.hotels.com/affiliates/carlton-hotel-bangkok-sukhumvit-bangkok-thailand.qSwzfPs","Praktisk og moderne i Sukhumvit."),
      hotel("Grande Centre Point Terminal 21","assets/bangkok/cards/grande-centre-point-terminal-21-v22.jpg","https://www.hotels.com/affiliates/grande-centre-point-hotel-terminal-21-bangkok-thailand.I1dvkUJ","En enkel base ved BTS og MRT."),
      hotel("Sindhorn Kempinski","assets/bangkok/cards/sindhorn-kempinski-hotel-bangkok-v22.jpg","https://www.hotels.com/affiliates/sindhorn-kempinski-hotel-bangkok-bangkok-thailand.eBw0xs2","Spa og ro nær Lumpini."),
      hotel("Eastin Grand Sathorn","assets/bangkok/cards/eastin-grand-hotel-sathorn-v22.jpg","https://www.hotels.com/affiliates/eastin-grand-hotel-sathorn-bangkok-thailand.rzfO2mT","Skyline og enkel transport."),
    ]
  },
  {
    file:"reise-thailand-phuket.html",slug:"phuket",name:"Phuket",hero:"assets/destinations/phuket-v22.jpg",badge:"Strand og resort",
    intro:"Phuket er et trygt førstevalg i sør med mange strender, gode hotellvalg og korte veier videre til øyhopping. Velg strand etter om du vil ha liv, familieferie eller roligere resortdager.",
    facts:[["Passer best for","Førstegangsreise og familie"],["Legg inn","5-8 netter"],["Kombiner med","Krabi eller Bangkok"]],
    areas:[["Kamala","Roligere strand og resorter med god standard."],["Karon og Kata","Familievennlig med strandliv og restauranter."],["Nai Harn og Layan","Mer skjermede områder for rolige dager."]],
    highlights:[["Stranddag","Velg én strand og bruk dagen uten for mye transport."],["Øyhopping","Ta en dagstur på vannet når været er godt."],["Solnedgang","Avslutt dagen ved vestkysten."]],
    hotels:[
      hotel("InterContinental Phuket","assets/phuket/cards/intercontinental-phuket-v22.jpg","https://www.hotels.com/affiliates/intercontinental-phuket-resort-an-ihg-hotel-kamala-thailand.4pbB4wq","Resortliv ved Kamala Beach."),
      hotel("SAii Laguna Phuket","assets/phuket/cards/saii-laguna-phuket-v22.jpg","https://www.hotels.com/affiliates/saii-laguna-phuket-choeng-thale-thailand.42sEhUz","Komfortabel ferie ved lagunen."),
      hotel("Sunwing Kamala Beach","assets/phuket/cards/sunwing-kamala-beach-v22.jpg","https://www.hotels.com/affiliates/sunwing-kamala-beach-kamala-thailand.3bObPuj","Et enkelt valg for familier."),
      hotel("The Shore at Katathani","assets/phuket/cards/the-shore-katathani-v22.jpg","https://www.hotels.com/affiliates/the-shore-at-katathani-karon-thailand.MDsvVx3","Rolig voksenferie ved Kata Noi."),
      hotel("The Nai Harn","assets/phuket/cards/the-nai-harn-phuket-v22.jpg","https://www.hotels.com/affiliates/the-nai-harn-rawai-thailand.6MY8SRZ","Utsikt og roligere strandliv."),
      hotel("Keemala Phuket","assets/phuket/cards/keemala-phuket-v22.jpg","https://www.hotels.com/affiliates/keemala-kamala-thailand.5BbbOsT","Særpreget opphold nær Kamala."),
    ]
  },
  {
    file:"reise-thailand-krabi.html",slug:"krabi",name:"Krabi",hero:"assets/destinations/krabi-v22.jpg",badge:"Kalkstein og øyhopping",
    intro:"Krabi gir klassisk Sør-Thailand med dramatiske klipper, longtailbåter og korte dagsturer til strender og øyer. Det er et godt alternativ når du vil ha mindre byfølelse enn Phuket.",
    facts:[["Passer best for","Natur og rolige stranddager"],["Legg inn","4-7 netter"],["Kombiner med","Bangkok eller Phuket"]],
    areas:[["Railay","Bilfri strandopplevelse mellom kalksteinsklippene."],["Ao Nang","Praktisk base med båter, restauranter og mer liv."],["Tubkaek","Roligere resortområde med utsikt mot øyene."]],
    highlights:[["Longtailbåt","Bestill en rolig båtdag til strender og bukter."],["Railay Beach","Sett av tid til klippene og de små stiene."],["Solnedgang","Tubkaek og Ao Nang er fine ved dagens slutt."]],
    hotels:[
      hotel("Rayavadee","assets/krabi/hotels/rayavadee-krabi.jpg","https://www.hotels.com/affiliates/rayavadee-krabi-thailand.zJciAEZ","Ikonisk beliggenhet ved Railay."),
      hotel("Varana Hotel Krabi","assets/krabi/hotels/varana-hotel-krabi.jpg","https://www.hotels.com/affiliates/varana-hotel-krabi-thailand.gZcnjRo","Moderne ferie med roligere tempo."),
      hotel("The Tubkaak Krabi","assets/krabi/hotels/the-tubkaak-krabi.jpg","https://www.hotels.com/affiliates/the-tubkaak-krabi-boutique-resort-krabi-thailand.UHPtJB1","Boutiquehotell ved stranden."),
      hotel("Banyan Tree Krabi","assets/krabi/hotels/banyan-tree-krabi.webp","https://www.hotels.com/affiliates/banyan-tree-krabi-krabi-thailand.nNE7l5z","Høy standard og utsikt."),
      hotel("Dusit Thani Krabi","assets/krabi/hotels/dusit-thani-krabi.jpg","https://www.hotels.com/affiliates/dusit-thani-krabi-beach-resort-krabi-thailand.Zo4XHzw","Strandresort med god plass."),
      hotel("Sofitel Krabi Phokeethra","assets/krabi/hotels/sofitel-krabi-phokeethra.jpg","https://www.hotels.com/affiliates/sofitel-krabi-phokeethra-golf-spa-resort-krabi-thailand.oYYDyA5","Resortdager med spa og basseng."),
    ]
  },
];

const more = [
  ["chiang-mai","reise-thailand-chiang-mai.html","Chiang Mai","assets/destinations/chiang-mai-v22.jpg","Templer og fjell","Templer, markeder, matkurs og roligere dager i Nord-Thailand.",["Gamlebyen","Nimman","Mae Rim"],["Templer","Nattmarked","Matkurs"],[
    ["137 Pillars House","https://www.hotels.com/affiliates/137-pillars-house-chiang-mai-thailand.glCGjBV"],["Chala Number 6","https://www.hotels.com/affiliates/chala-number-6-hotel-chiang-mai-thailand.x5uGYrV"],["Melia Chiang Mai","https://www.hotels.com/affiliates/melia-chiang-mai-chiang-mai-thailand.fHtEUGd"],["Anantara Chiang Mai","https://www.hotels.com/affiliates/anantara-chiang-mai-resort-chiang-mai-thailand.wqQQhEv"],["Na Nirand","https://www.hotels.com/affiliates/na-nirand-romantic-boutique-resort-chiang-mai-thailand.tBwZLZd"],["Raya Heritage","https://www.hotels.com/affiliates/raya-heritage-mae-rim-thailand.SsmSHWX"]]],
  ["koh-samui","reise-thailand-koh-samui.html","Koh Samui","assets/destinations/koh-samui-v22.jpg","Resort og øyliv","Komfortabel øyferie med spa, strandliv og enkel vei videre til naboøyene.",["Choeng Mon","Bophut","Lamai"],["Stranddag","Spa","Båttur"],[
    ["Cape Fahn Hotel","https://www.hotels.com/affiliates/cape-fahn-hotel-samui-koh-samui-thailand.ZcioJqP"],["Silavadee Pool Spa Resort","https://www.hotels.com/affiliates/silavadee-pool-spa-resort-koh-samui-thailand.IkunClY"],["Banyan Tree Samui","https://www.hotels.com/affiliates/banyan-tree-samui-koh-samui-thailand.DvOFFDD"],["Six Senses Samui","https://www.hotels.com/affiliates/six-senses-samui-koh-samui-thailand.o7TYyx3"],["SALA Samui Choengmon","https://www.hotels.com/affiliates/sala-samui-choengmon-beach-koh-samui-thailand.yGt7xep"],["Anantara Lawana","https://www.hotels.com/affiliates/anantara-lawana-koh-samui-resort-chaweng-koh-samui-thailand.Q7DYymk"]]],
  ["koh-phangan","reise-thailand-koh-phangan.html","Koh Phangan","assets/destinations/koh-phangan-v22.jpg","Solnedgang og wellness","En grønnere øy med rolige bukter, yoga og strandliv, men også fest når du ønsker det.",["Thong Nai Pan","Haad Yao","Sri Thanu"],["Solnedgang","Yoga","Strandtur"],[
    ["Anantara Rasananda","https://www.hotels.com/affiliates/anantara-rasananda-koh-phangan-villas-koh-phangan-thailand.JCXFuKG"],["Panviman Resort","https://www.hotels.com/affiliates/panviman-resort-koh-phangan-koh-phangan-thailand.wHTFmG5"],["Explorar Koh Phangan","https://www.hotels.com/affiliates/the-coast-adults-only-resort-and-spa-koh-phangan-koh-phangan-thailand.D38AcF1"],["Kupu Kupu Phangan","https://www.hotels.com/affiliates/kupu-kupu-phangan-beach-villas-spa-by-l-occitane-koh-phangan-thailand.Jhl8TtH"]]],
  ["koh-tao","reise-thailand-koh-tao.html","Koh Tao","assets/destinations/koh-tao-v22.jpg","Snorkling og dykking","Liten tropeøy med klart vann, utsiktspunkter og korte avstander mellom buktene.",["Sairee","Chalok Baan Kao","Shark Bay"],["Snorkling","Dykking","Viewpoints"],[
    ["Jamahkiri Resort","https://www.hotels.com/affiliates/jamahkiri-resort-spa-koh-tao-thailand.nWj6vLS"],["The Place Luxury Villas","https://www.hotels.com/affiliates/the-place-luxury-boutique-villas-koh-tao-thailand.xZqWyCp"],["Sai Daeng Resort","https://www.hotels.com/affiliates/sai-daeng-resort-koh-tao-thailand.WkcOKCg"],["Haadtien Beach Resort","https://www.hotels.com/affiliates/haadtien-beach-resort-koh-tao-thailand.jIl17ta"],["The Tarna Align Resort","https://www.hotels.com/affiliates/the-tarna-align-resort-koh-tao-thailand.293AMvP"],["Koh Tao Cabana Resort","https://www.hotels.com/affiliates/koh-tao-cabana-resort-koh-tao-thailand.wETHvwr"]]],
  ["koh-lipe","reise-thailand-koh-lipe.html","Koh Lipe","assets/destinations/koh-lipe-v22.jpg","Turkist vann","En liten øy for stranddager, snorkling og lavt tempo helt sør i Thailand.",["Pattaya Beach","Sunrise Beach","Sunset Beach"],["Snorkling","Soloppgang","Walking Street"],[
    ["Akira Lipe Resort","https://www.hotels.com/affiliates/akira-lipe-resort-satun-thailand.ept5OEn"],["Idyllic Concept Resort","https://www.hotels.com/affiliates/idyllic-concept-resort-satun-thailand.yDq1nX3"],["Serendipity Beach Resort","https://www.hotels.com/affiliates/serendipity-beach-resort-koh-lipe-satun-thailand.Oeq1Y5P"],["Ten Moons Lipe Resort","https://www.hotels.com/affiliates/ten-moons-lipe-resort-satun-thailand.ehy1k12"]]],
  ["koh-chang","reise-thailand-koh-chang.html","Koh Chang","assets/destinations/koh-chang-v22.jpg","Jungel og strender","Avslappet øyferie øst i Thailand med jungel, fossefall og fine stranddager.",["White Sand Beach","Kai Bae","Klong Prao"],["Fossefall","Stranddag","Kajakk"],[
    ["Sea View Koh Chang","https://www.hotels.com/affiliates/sea-view-koh-chang-ko-chang-thailand.4B99jUF"],["The Chill Resort","https://www.hotels.com/affiliates/the-chill-resort-spa-koh-chang-ko-chang-thailand.BzYy0MO"],["Dinso Resort Koh Chang","https://www.hotels.com/affiliates/dinso-resort-koh-chang-vignette-collection-an-ihg-hotel.nA2maav"],["KC Grande Resort","https://www.hotels.com/affiliates/kc-grande-resort-spa-ko-chang-thailand.smm3tSH"],["Santhiya Tree Koh Chang","https://www.hotels.com/affiliates/santhiya-tree-koh-chang-resort-ko-chang-thailand.NFgBI8S"]]],
];

for (const [slug,file,name,hero,badge,intro,areas,highlights,hotels] of more) {
  const imgs = extracted[slug.replace("koh-","")] || [];
  destinations.push({file,slug,name,hero,badge,intro,facts:[["Passer best for",badge],["Legg inn","3-6 netter"],["Planlegg","Et rolig tempo"]],areas:areas.map((x)=>[x,`Velg ${x} når dette området passer rytmen du vil ha på reisen.`]),highlights:highlights.map((x)=>[x,`Sett av tid til ${x.toLowerCase()} uten å fylle dagen med for mange planer.`]),hotels:hotels.map(([n,u],i)=>hotel(n,imgs[i]||hero,u,"Et godt utgangspunkt for å sammenligne pris og tilgjengelighet."))});
}

for (const [slug,file,name,hero,badge,intro,areas,highlights] of [
  ["koh-mak","reise-thailand-koh-mak.html","Koh Mak","assets/destinations/koh-chang-v22.jpg","Rolig og liten øy","Koh Mak passer når du vil ha korte avstander, sykler og stranddager uten et tett program.",["Ao Kao","Ao Suan Yai","Sørkysten"],["Sykkeltur","Stranddag","Solnedgang"]],
  ["koh-kood","reise-thailand-koh-kood.html","Koh Kood","assets/destinations/koh-chang-v22.jpg","Bukter og lav puls","Koh Kood er et rolig valg øst i Thailand med turkise bukter, fossefall og resortdager.",["Klong Chao","Bang Bao","Ao Phrao"],["Fossefall","Kajakk","Stranddag"]],
]) {
  const easternHotels = slug === "koh-kood"
    ? [
      hotel("High Season Pool Villa & Spa",hero,"https://www.hotels.com/affiliates/high-season-pool-villa-spa-ko-kood-thailand.fvmmspy","Villaresort ved Klong Chao med luksus, spa og privat preg."),
      hotel("Tinkerbell Resort",hero,"https://www.hotels.com/affiliates/tinkerbell-resort-ko-kood-thailand.3JhrF5a","Lite strandresort ved Klong Chao med boutique-følelse."),
      hotel("Shantaa Resort",hero,"https://www.hotels.com/affiliates/shantaa-resort-ko-kood-thailand.mddjF9s","Rolig boutiquevalg med personlig preg og lavt tempo."),
      hotel("The Beach Natural Resort Koh Kood",hero,"https://www.hotels.com/affiliates/the-beach-natural-resort-koh-kood-ko-kood-thailand.d4i0EYs","Strandresort i Bang Bao Bay for familie og rolige dager."),
    ]
    : [
      hotel("Mira Montra Resort Koh Mak",hero,"https://www.hotels.com/affiliates/mira-montra-resort-koh-mak-ko-mak-thailand.pCAGUJN","Rolig strandresort med villaer, basseng og god plass."),
      hotel("Makathanee Resort",hero,"https://www.hotels.com/affiliates/makathanee-resort-ko-mak-thailand.AZOdbwN","Praktisk strandbase ved Ao Kao med enkel øyfølelse."),
      hotel("Ao Kao White Sand Beach Resort",hero,"https://www.hotels.com/affiliates/ao-kao-white-sand-beach-resort-ko-mak-thailand.fIhRtoQ","Avslappet strandresort med basseng og familievennlig profil."),
      hotel("Islanda Resort Hotel",hero,"https://www.hotels.com/affiliates/islanda-resort-hotel-ko-mak-thailand.S1LXA3w","Rolig hotell med utsikt og god base for korte utflukter."),
    ];
  destinations.push({file,slug,name,hero,badge,intro,facts:[["Passer best for","Rolig strandferie"],["Legg inn","3-5 netter"],["Kombiner med","Koh Chang eller Koh Mak"]],areas:areas.map(x=>[x,`Se hotell rundt ${x} for en rolig base på øya.`]),highlights:highlights.map(x=>[x,`Legg inn tid til ${x.toLowerCase()} i et rolig tempo.`]),hotels:easternHotels});
}

const related = destinations.map(({name,file})=>({name,file}));
const esc = (s) => String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const cards = (items, cls) => items.map(([title,text])=>`<article class="${cls}"><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("\n");
function render(d) {
 const nearest = related.filter(x=>x.file!==d.file).slice(0,6);
 return `<!doctype html>
<html lang="no"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(d.name)} guide | Thailand | Billig-reiser.no</title><meta name="description" content="${esc(d.intro)}">
<link rel="stylesheet" href="thailand-guide.css?v=72"></head><body>
<nav class="guide-nav"><a class="guide-logo" href="index.html"><img src="assets/billig-reiser-logo-v116.png" alt="Billig-reiser.no"></a><div class="guide-menu"><a href="reisemagasinet.html">Magasinet</a><a class="active" href="reise-thailand.html">Thailand</a><a href="thailand-beste-reisetid.html">Beste reisetid</a><a href="index.html">Forside</a></div></nav>
<header class="destination-hero" style="--hero-image:url('${d.hero}')"><div class="destination-hero-content"><span class="eyebrow">${esc(d.badge)}</span><h1>${esc(d.name)}</h1><p>${esc(d.intro)}</p><div class="hero-actions"><a class="btn primary" href="#hoteller">Se hotell</a><a class="btn secondary" href="reise-thailand.html">Til Thailand-guiden</a></div></div></header>
<main><section class="wrap"><div class="section-head"><div><span class="badge">Kort fortalt</span><h2>Planlegg ${esc(d.name)}</h2></div><p class="lead">Samme ryddige oppsett som i resten av Thailand-guiden: områdevalg først, deretter hotell og opplevelser.</p></div><div class="info-grid">${cards(d.facts,"info-card")}</div></section>
<section class="wrap" id="omrader"><div class="section-head"><div><span class="badge">Områder</span><h2>Hvor bør du bo?</h2></div><p class="lead">Velg base etter hva du vil bruke mest tid på. Da blir reisen enklere å planlegge.</p></div><div class="area-grid">${cards(d.areas,"area-card")}</div></section>
<section class="wrap" id="hoteller"><div class="section-head"><div><span class="badge">Hotell</span><h2>Hotell å sammenligne</h2></div><p class="lead">Hotellkortene har samme størrelse på alle destinasjonssider. Pris og tilgjengelighet sjekkes hos hotellpartneren.</p></div><div class="hotel-grid">${d.hotels.map(h=>`<article class="hotel-card"><img src="${h.image}" alt="${esc(h.name)}" loading="lazy" decoding="async"><div class="hotel-body"><h3>${esc(h.name)}</h3><p>${esc(h.text)}</p><a class="hotel-link" href="${h.url}" target="_blank" rel="sponsored noopener">Sjekk pris hos Hotels.com →</a></div></article>`).join("\n")}</div><div class="cta-strip"><p>Vil du se flere alternativer? Sammenlign flere hotell for ${esc(d.name)}.</p><a class="btn secondary" href="${fallbackSearch(d.name)}" target="_blank" rel="sponsored noopener">Se flere hotell</a></div></section>
<section class="wrap" id="opplevelser"><div class="section-head"><div><span class="badge">Opplevelser</span><h2>Dette er verdt å legge inn</h2></div></div><div class="highlight-grid">${cards(d.highlights,"highlight-card")}</div></section>
<section class="wrap"><div class="section-head"><div><span class="badge">Flere steder</span><h2>Fortsett Thailand-reisen</h2></div></div><div class="related-grid">${nearest.map(x=>`<article class="related-card"><h3>${esc(x.name)}</h3><a href="${x.file}">Åpne guiden →</a></article>`).join("\n")}</div></section></main>
<footer class="guide-footer">© 2026 Billig-reiser.no</footer><script defer src="thailand-videos.js?v=72"></script></body></html>\n`;
}
for (const destination of destinations) fs.writeFileSync(path.join(root,destination.file),render(destination));
console.log(`Generated ${destinations.length} Thailand destination guides.`);
