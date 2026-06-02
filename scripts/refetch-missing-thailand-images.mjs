import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
const root=path.resolve(import.meta.dirname,"..");
const jobs=[
 ["koh-lanta","pimalai","https://pimalai.com/"],
 ["koh-lanta","layana","https://layanaresort.com/"],
 ["koh-lanta","rawi-warin","https://www.rawiwarin.com/"],
 ["khao-lak","sarojin","https://www.sarojin.com/"],
 ["khao-lak","devasom","https://www.devasom.com/khaolak/"],
 ["khao-lak","la-flora","https://www.lafloraresort.com/"],
 ["hua-hin","centara-grand","https://www.centarahotelsresorts.com/centaragrand/chbr"],
 ["hua-hin","the-standard","https://www.standardhotels.com/hua-hin/properties/hua-hin"],
];
const headers={"user-agent":"Mozilla/5.0 Billig-reiser.no"};
function candidates(html,base){const f=[];for(const m of html.matchAll(/(?:property|name)=["'](?:og:image|twitter:image(?::src)?)["'][^>]*content=["']([^"']+)/gi))f.push(m[1]);for(const m of html.matchAll(/<(?:img|source)\b[^>]*(?:src|data-src|data-lazy-src|data-original)=["']([^"']+)/gi))f.push(m[1]);for(const m of html.matchAll(/(?:srcset|data-srcset)=["']([^"']+)/gi))for(const p of m[1].split(","))f.push(p.trim().split(/\s+/)[0]);return[...new Set(f.map(x=>x.replaceAll("&amp;","&").trim()).map(x=>{try{return new URL(x,base).href}catch{return""}}).filter(x=>/^https?:/.test(x)&&!/logo|icon|favicon|sprite|avatar|placeholder|blank|tracking|pixel|svg|award|badge/i.test(x)))]}
function dimensions(file){const out=execFileSync("sips",["-g","pixelWidth","-g","pixelHeight",file],{encoding:"utf8"});return{w:Number(out.match(/pixelWidth: (\d+)/)?.[1]||0),h:Number(out.match(/pixelHeight: (\d+)/)?.[1]||0)}}
for(const [dest,slug,url] of jobs){const dir=path.join(root,"assets/thailand-new",dest,slug);fs.mkdirSync(dir,{recursive:true});if(fs.readdirSync(dir).filter(x=>/\.(jpg|png|webp)$/i.test(x)).length>=4){console.log(`${dest}/${slug}: already ok`);continue}try{const r=await fetch(url,{headers,signal:AbortSignal.timeout(9000)});const html=await r.text();let saved=fs.readdirSync(dir).filter(x=>/\.(jpg|png|webp)$/i.test(x)).length;for(const u of candidates(html,r.url)){if(saved>=4)break;try{const ir=await fetch(u,{headers,signal:AbortSignal.timeout(6000)});const type=ir.headers.get("content-type")||"";if(!type.startsWith("image/")||type.includes("svg"))continue;const bytes=Buffer.from(await ir.arrayBuffer());if(bytes.length<20000)continue;const ext=type.includes("webp")?"webp":type.includes("png")?"png":"jpg";const temp=path.join(dir,`tmp.${ext}`);fs.writeFileSync(temp,bytes);const d=dimensions(temp);if(d.w<450||d.h<280||d.w/d.h>3.1){fs.rmSync(temp);continue}saved++;fs.renameSync(temp,path.join(dir,`${saved}.${ext}`))}catch{}}console.log(`${dest}/${slug}: ${saved}`)}catch(e){console.warn(`${dest}/${slug}: ${e.message}`)}}
