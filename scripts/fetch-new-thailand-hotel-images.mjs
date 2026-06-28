import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const hotels = [
  ["koh-lanta","pimalai","https://pimalai.com/"],
  ["koh-lanta","layana","https://layanaresort.com/"],
  ["koh-lanta","avani","https://www.avanihotels.com/en/koh-lanta-krabi"],
  ["koh-lanta","rawi-warin","https://www.rawiwarin.com/"],
  ["khao-lak","sarojin","https://www.sarojin.com/"],
  ["khao-lak","devasom","https://www.devasom.com/khaolak/"],
  ["khao-lak","jw-marriott","https://www.marriott.com/en-us/hotels/hktkl-jw-marriott-khao-lak-resort-and-spa/overview/"],
  ["khao-lak","la-flora","https://www.lafloraresort.com/"],
  ["hua-hin","centara-grand","https://www.centarahotelsresorts.com/centaragrand/chbr"],
  ["hua-hin","intercontinental","https://www.ihg.com/intercontinental/hotels/us/en/hua-hin/hhqha/hoteldetail"],
  ["hua-hin","the-standard","https://www.standardhotels.com/hua-hin/properties/hua-hin"],
  ["hua-hin","hyatt-regency","https://www.hyatt.com/hyatt-regency/en-US/huahi-hyatt-regency-hua-hin"],
  ["koh-phi-phi","saii","https://www.saiiresorts.com/phiphiisland/"],
  ["koh-phi-phi","zeavola","https://www.zeavola.com/"],
  ["koh-phi-phi","holiday-resort","https://www.phiphiholidayresort.com/"],
  ["koh-phi-phi","coco-beach","https://www.phipicocobeachresort.com/"],
  ["pattaya","hilton","https://www.hilton.com/en/hotels/bkklphi-hilton-pattaya/"],
  ["pattaya","space","https://spacepattaya.com/"],
  ["pattaya","andaz","https://www.hyatt.com/andaz/en-US/utpaz-andaz-pattaya-jomtien-beach"],
  ["pattaya","renaissance","https://www.marriott.com/en-us/hotels/utpbr-renaissance-pattaya-resort-and-spa/overview/"],
  ["koh-lanta","sri-lanta","https://www.srilanta-resort.com/"],
  ["khao-lak","casa-de-la-flora","https://www.casadelaflora.com/"],
  ["hua-hin","anantara","https://www.anantara.com/en/hua-hin"],
  ["hua-hin","cape-nidhra","https://www.capenidhra.com/"],
  ["koh-phi-phi","phi-phi-the-beach","https://www.phiphithebeach.com/"],
  ["koh-phi-phi","villa-360","https://www.villa360resort.com/"],
  ["pattaya","cape-dara","https://www.capedarapattaya.com/"],
  ["pattaya","dusit-thani","https://www.dusit.com/dusitthani-pattaya/"],
  ["pattaya","veranda","https://www.verandaresort.com/veranda-resort-pattaya-na-jomtien/"],
  ["koh-lanta","lanta-sand","https://www.lantasand.com/"],
  ["hua-hin","chiva-som","https://www.chivasom.com/"],
];

const headers = { "user-agent": "Mozilla/5.0 Billig-reiser.no travel guide image fetch" };
const clean = (value) => value.replaceAll("&amp;","&").trim();
function candidates(html, base) {
  const found = [];
  for (const match of html.matchAll(/(?:property|name)=["'](?:og:image|twitter:image(?::src)?)["'][^>]*content=["']([^"']+)/gi)) found.push(match[1]);
  for (const match of html.matchAll(/content=["']([^"']+)["'][^>]*(?:property|name)=["'](?:og:image|twitter:image(?::src)?)["']/gi)) found.push(match[1]);
  for (const match of html.matchAll(/<(?:img|source)\b[^>]*(?:src|data-src|data-lazy-src|data-original)=["']([^"']+)/gi)) found.push(match[1]);
  for (const match of html.matchAll(/(?:srcset|data-srcset)=["']([^"']+)/gi)) {
    for (const part of match[1].split(",")) found.push(part.trim().split(/\s+/)[0]);
  }
  return [...new Set(found.map(clean).filter((url) => !url.startsWith("data:")).map((url) => {
    try { return new URL(url, base).href; } catch { return ""; }
  }).filter((url) => /^https?:/.test(url) && !/logo|icon|favicon|sprite|avatar|placeholder|blank|tracking|pixel|svg/i.test(url)))];
}

async function downloadImages(destination, slug, pageUrl) {
  const output = path.join(root, "assets", "thailand-new", destination, slug);
  fs.mkdirSync(output, { recursive: true });
  for (const file of fs.readdirSync(output)) fs.rmSync(path.join(output, file));
  try {
    const response = await fetch(pageUrl, { headers, redirect: "follow" });
    const html = await response.text();
    const urls = candidates(html, response.url);
    let saved = 0;
    for (const url of urls) {
      if (saved >= 4) break;
      try {
        const imageResponse = await fetch(url, { headers, redirect: "follow" });
        const type = imageResponse.headers.get("content-type") || "";
        if (!type.startsWith("image/") || type.includes("svg")) continue;
        const bytes = Buffer.from(await imageResponse.arrayBuffer());
        if (bytes.length < 20000) continue;
        const ext = type.includes("webp") ? "webp" : type.includes("png") ? "png" : "jpg";
        const temp = path.join(output, `candidate.${ext}`);
        fs.writeFileSync(temp, bytes);
        const dimensions = execFileSync("sips", ["-g","pixelWidth","-g","pixelHeight",temp], { encoding:"utf8" });
        const width = Number(dimensions.match(/pixelWidth: (\d+)/)?.[1] || 0);
        const height = Number(dimensions.match(/pixelHeight: (\d+)/)?.[1] || 0);
        if (width < 600 || height < 320 || width / height > 2.8) { fs.rmSync(temp); continue; }
        fs.renameSync(temp, path.join(output, `${saved + 1}.${ext}`));
        saved++;
      } catch {}
    }
    if (!saved) console.warn(`NO IMAGES: ${destination}/${slug} from ${pageUrl}`);
    else console.log(`${destination}/${slug}: ${saved} official images`);
  } catch (error) {
    console.warn(`FAILED: ${destination}/${slug}: ${error.message}`);
  }
}

for (const hotel of hotels) await downloadImages(...hotel);
