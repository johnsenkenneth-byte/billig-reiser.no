(function(){
  const KEY_FAV='br_app_favorites_v1';
  const KEY_REC='br_app_recent_v1';
  const get=key=>{try{return JSON.parse(localStorage.getItem(key)||'[]')}catch(e){return []}};
  const set=(key,val)=>localStorage.setItem(key,JSON.stringify(val));
  const cleanTitle=t=>(t||'Billig Reiser').replace(/\s*\|\s*Billig.*$/i,'').replace(/\s*–\s*Billig.*$/i,'').trim()||'Billig Reiser';
  const page={title:cleanTitle(document.querySelector('h1')?.textContent||document.title),url:location.pathname.split('/').pop()||'index.html',time:Date.now()};
  function upsertRecent(){let r=get(KEY_REC).filter(x=>x.url!==page.url);r.unshift(page);set(KEY_REC,r.slice(0,8));}
  function isSaved(){return get(KEY_FAV).some(x=>x.url===page.url)}
  function toast(msg){let t=document.querySelector('.br-app-toast')||document.body.appendChild(Object.assign(document.createElement('div'),{className:'br-app-toast'}));t.textContent=msg;t.classList.add('is-visible');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('is-visible'),2100)}
  function toggleFav(){let f=get(KEY_FAV); if(f.some(x=>x.url===page.url)){f=f.filter(x=>x.url!==page.url);toast('Fjernet fra lagrede reiser');}else{f.unshift(page);toast('Lagret i appen');} set(KEY_FAV,f.slice(0,30)); updateFavButton(); renderDrawer();}
  function updateFavButton(){const b=document.querySelector('.br-app-fab'); if(!b)return; const saved=isSaved(); b.classList.toggle('is-saved',saved); b.textContent=saved?'✓ Lagret':'♡ Lagre';}
  function itemHtml(x, removable){return `<a class="br-app-item" href="${x.url}"><div><b>${x.title}</b><span>${x.url}</span></div>${removable?`<button type="button" data-remove-fav="${x.url}" aria-label="Fjern">×</button>`:''}</a>`}
  function renderDrawer(){const f=get(KEY_FAV), r=get(KEY_REC); const fav=document.getElementById('brAppFavList'), rec=document.getElementById('brAppRecentList'); if(fav)fav.innerHTML=f.length?f.map(x=>itemHtml(x,true)).join(''):'<p class="br-app-empty">Ingen lagrede reiser ennå. Trykk “Lagre” på en side du vil tilbake til.</p>'; if(rec)rec.innerHTML=r.length?r.map(x=>itemHtml(x,false)).join(''):'<p class="br-app-empty">Nylig viste sider kommer her.</p>';}
  function openDrawer(){document.querySelector('.br-app-drawer')?.classList.add('is-open');renderDrawer()}
  function closeDrawer(){document.querySelector('.br-app-drawer')?.classList.remove('is-open')}
  function scrollSearch(){const s=document.querySelector('#travelSearch,.travel-search,.search-card'); if(s){s.scrollIntoView({behavior:'smooth',block:'start'});}else{location.href='/#travelSearch'}}
  let deferredPrompt=null; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e; const btn=document.querySelector('[data-br-install]'); if(btn)btn.hidden=false;});
  async function installApp(){ if(deferredPrompt){deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null;} else {toast(/iphone|ipad|ipod/i.test(navigator.userAgent)?'iPhone: Del → Legg til på hjemskjerm':'Bruk nettleserens installer app-meny');}}
  function budgetCalc(){const budget=Number(document.getElementById('brBudget')?.value||0), people=Number(document.getElementById('brPeople')?.value||1), type=document.getElementById('brTripType')?.value||'reise'; const out=document.getElementById('brBudgetResult'); if(!out)return; if(!budget){out.textContent='Skriv inn budsjettet ditt først.';return;} const per=Math.round(budget/Math.max(people,1)); out.textContent=`${budget.toLocaleString('nb-NO')} kr totalt gir ca. ${per.toLocaleString('nb-NO')} kr per person til ${type}.`;}
  document.addEventListener('DOMContentLoaded',()=>{
    if(document.querySelector('[data-disable-app-features]'))return; upsertRecent();
    document.body.insertAdjacentHTML('beforeend',`
      <button class="br-app-fab" type="button" data-br-fav>♡ Lagre</button>
      <nav class="br-app-nav" aria-label="Appmeny">
        <a href="/"><strong>⌂</strong>Hjem</a>
        <button type="button" data-br-search><strong>⌕</strong>Søk</button>
        <a href="reisemagasinet.html"><strong>✈</strong>Magasin</a>
        <button type="button" data-br-open><strong>★</strong>Lagret</button>
      </nav>
      <div class="br-app-drawer" role="dialog" aria-modal="true" aria-label="Mine reiser">
        <section class="br-app-panel">
          <div class="br-app-head"><div><h2>Mine reiser</h2><p>Lagre destinasjoner, finn igjen nylige sider og bruk enkel budsjettkalkulator.</p></div><button class="br-app-close" type="button" data-br-close>×</button></div>
          <div class="br-app-section"><h3>Lagrede reiser</h3><div class="br-app-list" id="brAppFavList"></div></div>
          <div class="br-app-section"><h3>Nylig sett</h3><div class="br-app-list" id="brAppRecentList"></div></div>
          <div class="br-app-section"><h3>Reisebudsjett</h3><div class="br-app-budget"><input id="brBudget" inputmode="numeric" placeholder="Budsjett i kr"><input id="brPeople" inputmode="numeric" value="2" aria-label="Antall personer"><select id="brTripType"><option>fly og hotell</option><option>charter</option><option>storbytur</option><option>Thailand-reise</option></select><button type="button" data-br-budget>Regn ut</button></div><div class="br-app-result" id="brBudgetResult"></div></div>
          <div class="br-app-section"><h3>Installer appen</h3><button class="br-app-install" type="button" data-br-install>Installer Billig Reiser</button><p class="br-app-tip">På iPhone: åpne Del-knappen i Safari og velg “Legg til på Hjem-skjerm”. På Android får du ofte egen installer-knapp.</p></div>
        </section>
      </div>`);
    updateFavButton(); renderDrawer();
    document.addEventListener('click',e=>{const rem=e.target.closest('[data-remove-fav]'); if(rem){e.preventDefault();set(KEY_FAV,get(KEY_FAV).filter(x=>x.url!==rem.dataset.removeFav));renderDrawer();updateFavButton();toast('Fjernet');return;} if(e.target.closest('[data-br-fav]'))toggleFav(); if(e.target.closest('[data-br-open]'))openDrawer(); if(e.target.closest('[data-br-close]')||e.target.classList.contains('br-app-drawer'))closeDrawer(); if(e.target.closest('[data-br-search]'))scrollSearch(); if(e.target.closest('[data-br-budget]'))budgetCalc(); if(e.target.closest('[data-br-install]'))installApp();});
  });
})();
