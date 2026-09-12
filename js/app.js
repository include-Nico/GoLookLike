/**
 * GoLookLike - Core Application Javascript
 * Implementa: Database completo (100+ Brand), Generatore Procedurale Espanso,
 * Swipe UI (GoLike), Filtro Preferiti, Lavanderia, Armocromia dinamica, 
 * API OpenWeatherMap e Interfacce PWA (Bottom Nav).
 */

// ==========================================
// 1. DATABASE BRAND E RARITÀ (COMPLETO)
// ==========================================
const brandDatabase = [
  // Comune
  { nome: 'Zara', rarity: 'Comune' }, { nome: 'H&M', rarity: 'Comune' }, { nome: 'Pull&Bear', rarity: 'Comune' }, 
  { nome: 'Bershka', rarity: 'Comune' }, { nome: 'OVS', rarity: 'Comune' }, { nome: 'Primark', rarity: 'Comune' }, 
  { nome: 'Mango', rarity: 'Comune' }, { nome: 'Tezenis', rarity: 'Comune' }, { nome: 'Alcott', rarity: 'Comune' }, 
  { nome: 'Celio', rarity: 'Comune' }, { nome: 'Kiabi', rarity: 'Comune' }, { nome: 'Terranova', rarity: 'Comune' }, 
  { nome: 'Stradivarius', rarity: 'Comune' }, { nome: 'Shein', rarity: 'Comune' }, { nome: 'Asos', rarity: 'Comune' }, 
  { nome: 'Uniqlo', rarity: 'Comune' }, { nome: 'Generico', rarity: 'Comune' },
  // Raro
  { nome: 'Nike', rarity: 'Raro' }, { nome: 'Adidas', rarity: 'Raro' }, { nome: 'Puma', rarity: 'Raro' }, 
  { nome: 'Reebok', rarity: 'Raro' }, { nome: 'Under Armour', rarity: 'Raro' }, { nome: 'New Balance', rarity: 'Raro' }, 
  { nome: 'Asics', rarity: 'Raro' }, { nome: 'Fila', rarity: 'Raro' }, { nome: 'Champion', rarity: 'Raro' }, 
  { nome: 'Kappa', rarity: 'Raro' }, { nome: 'Levi\'s', rarity: 'Raro' }, { nome: 'Vans', rarity: 'Raro' }, 
  { nome: 'Converse', rarity: 'Raro' }, { nome: 'Timberland', rarity: 'Raro' }, { nome: 'Dr. Martens', rarity: 'Raro' }, 
  { nome: 'Calvin Klein', rarity: 'Raro' }, { nome: 'Guess', rarity: 'Raro' }, { nome: 'Tommy Hilfiger', rarity: 'Raro' }, 
  { nome: 'Lacoste', rarity: 'Raro' }, { nome: 'Diesel', rarity: 'Raro' }, { nome: 'Superdry', rarity: 'Raro' }, 
  { nome: 'Hollister', rarity: 'Raro' },
  // Super Raro
  { nome: 'The North Face', rarity: 'Super Raro' }, { nome: 'Patagonia', rarity: 'Super Raro' }, 
  { nome: 'Columbia', rarity: 'Super Raro' }, { nome: 'Carhartt WIP', rarity: 'Super Raro' }, 
  { nome: 'Arcteryx', rarity: 'Super Raro' }, { nome: 'Salomon', rarity: 'Super Raro' }, 
  { nome: 'Ralph Lauren', rarity: 'Super Raro' }, { nome: 'Armani Exchange', rarity: 'Super Raro' }, 
  { nome: 'EA7', rarity: 'Super Raro' }, { nome: 'Michael Kors', rarity: 'Super Raro' }, 
  { nome: 'G-Star RAW', rarity: 'Super Raro' }, { nome: 'Stone Island', rarity: 'Super Raro' },
  // Epico
  { nome: 'Supreme', rarity: 'Epico' }, { nome: 'Off-White', rarity: 'Epico' }, { nome: 'Palace', rarity: 'Epico' }, 
  { nome: 'BAPE', rarity: 'Epico' }, { nome: 'KITH', rarity: 'Epico' }, { nome: 'Palm Angels', rarity: 'Epico' }, 
  { nome: 'Gucci', rarity: 'Epico' }, { nome: 'Prada', rarity: 'Epico' }, { nome: 'Louis Vuitton', rarity: 'Epico' }, 
  { nome: 'Dior', rarity: 'Epico' }, { nome: 'Saint Laurent', rarity: 'Epico' }, { nome: 'Givenchy', rarity: 'Epico' },
  // Leggendario
  { nome: 'Hermès', rarity: 'Leggendario' }, { nome: 'Loro Piana', rarity: 'Leggendario' }, 
  { nome: 'Brunello Cucinelli', rarity: 'Leggendario' }, { nome: 'Zegna', rarity: 'Leggendario' }, 
  { nome: 'Tom Ford', rarity: 'Leggendario' }, { nome: 'Balenciaga', rarity: 'Leggendario' }, 
  { nome: 'Maison Margiela', rarity: 'Leggendario' }, { nome: 'Bottega Veneta', rarity: 'Leggendario' }
];

function getBrandInfo(brandName) {
  const b = brandDatabase.find(x => x.nome.toLowerCase() === brandName.toLowerCase());
  const rarity = b ? b.rarity : 'Comune';
  
  let colorVar = 'var(--rarity-comune)';
  if (rarity === 'Raro') colorVar = 'var(--rarity-raro)';
  if (rarity === 'Super Raro') colorVar = 'var(--rarity-super-raro)';
  if (rarity === 'Epico') colorVar = 'var(--rarity-epico)';
  if (rarity === 'Leggendario') colorVar = 'var(--rarity-leggendario)';
  
  return { rarity, colorVar };
}

// Popolamento del datalist HTML per l'autocompletamento nel modale manuale
window.addEventListener('DOMContentLoaded', () => {
  const dataList = document.getElementById('brands-list');
  if (dataList) {
    brandDatabase.forEach(b => { 
      const opt = document.createElement('option'); 
      opt.value = b.nome; 
      dataList.appendChild(opt); 
    });
  }
  
  const colorPicker = document.getElementById('add-color-picker');
  if (colorPicker) {
    colorPicker.addEventListener('input', (e) => {
      document.getElementById('add-color-hex').value = e.target.value.toUpperCase();
    });
  }
});

// ==========================================
// 2. STATO GLOBALE (APP STATE)
// ==========================================
const appState = { 
  wardrobe: [], 
  seenItems: [], 
  currentCardItem: null, 
  itemToEditId: null, 
  weather: { temp: null, desc: null }, 
  wizard: { context: null, style: null }, 
  currentOutfit: { top: null, bottom: null, shoes: null },
  filterMode: 'all' // Gestisce la visualizzazione 'Tutti' o 'Preferiti' nell'armadio
};

// ==========================================
// 3. NAVIGAZIONE E INIZIALIZZAZIONE
// ==========================================
function navigateTo(viewId) { 
  document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active')); 
  document.getElementById(viewId).classList.add('active'); 
}

// Navigazione tramite Bottom Nav Bar PWA
function switchTab(element, viewId) {
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
  
  if (viewId === 'view-dashboard') renderWardrobe();
  if (viewId === 'view-golike' && !currentCardElement) initSwipeDeck();
  if (viewId === 'view-profile') updateProfileView();
  
  navigateTo(viewId);
}

function manageWeeklyReset() { 
  const lastReset = localStorage.getItem('gll_last_reset');
  const now = Date.now(); 
  
  if (!lastReset || (now - parseInt(lastReset)) > (7 * 24 * 60 * 60 * 1000)) { 
    localStorage.setItem('gll_last_reset', now.toString()); 
    appState.seenItems = []; 
    localStorage.setItem('gll_seen_items', '[]'); 
  } else { 
    appState.seenItems = JSON.parse(localStorage.getItem('gll_seen_items') || '[]'); 
  } 
}

function markItemAsSeen(itemId) { 
  appState.seenItems.push(itemId); 
  localStorage.setItem('gll_seen_items', JSON.stringify(appState.seenItems)); 
}

// Avviata da auth.js dopo la verifica della sessione
async function initCoreApp() {
  manageWeeklyReset();
  
  const token = sessionStorage.getItem('gll_session_token') || localStorage.getItem('gll_session_token');
  
  // Sincronizzazione dell'armadio utente dal backend
  if (token && typeof CONFIG !== 'undefined' && !CONFIG.MOCK_BACKEND) {
    try {
      const res = await apiCall('getWardrobe', { token });
      if (res.status === 'success') {
        appState.wardrobe = res.data.wardrobe || [];
      }
    } catch (e) { 
      console.error("Errore sincronizzazione armadio", e); 
    }
  }

  // Mostra sempre la Bottom Nav dopo l'accesso
  document.getElementById('bottom-nav').style.display = 'flex';
  
  // Forza lo stato della tab attiva su "Home"
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
  document.querySelector('.nav-item[data-target="view-home"]')?.classList.add('active');
  
  initHome();
}

// Animazione Splash Screen Iniziale
window.addEventListener('DOMContentLoaded', () => {
  const splashText = document.getElementById('splash-text');
  const particlesContainer = document.getElementById('particles-container');
  
  if (splashText && particlesContainer) {
    setTimeout(() => {
      splashText.innerText = "GoLookLike"; 
      splashText.classList.add('text-expand');
      
      const emojis = ['👕', '👖', '🧥', '👟', '👔', '🥾'];
      for(let i=0; i<15; i++) {
        const p = document.createElement('div'); 
        p.className = 'particle'; 
        p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = 100 + Math.random() * 200;
        p.style.setProperty('--tx', `${Math.cos(angle) * distance}px`); 
        p.style.setProperty('--ty', `${Math.sin(angle) * distance}px`); 
        p.style.setProperty('--rot', `${(Math.random() - 0.5) * 720}deg`);
        particlesContainer.appendChild(p);
      }
    }, 1000);
    
    setTimeout(() => { 
      document.getElementById('session-loader').style.display = 'block'; 
      if (typeof verifyInitialSession === "function") verifyInitialSession(); 
    }, 2500);
  }
});

// ==========================================
// 4. GENERATORE PROCEDURALE (DATABASE ESPANSO)
// ==========================================
const generatorData = {
  tipologie: [ 
    { emoji: '👕', nome: 'T-shirt basica', pos: 'top', pesantezza: 1 }, 
    { emoji: '👕', nome: 'T-shirt maniche lunghe', pos: 'top', pesantezza: 2 }, 
    { emoji: '👕', nome: 'Canotta in cotone', pos: 'top', pesantezza: 1 }, 
    { emoji: '👔', nome: 'Camicia sartoriale', pos: 'top', pesantezza: 1 }, 
    { emoji: '👔', nome: 'Camicia in denim', pos: 'top', pesantezza: 2 }, 
    { emoji: '🧥', nome: 'Maglia dolcevita', pos: 'top', pesantezza: 3 }, 
    { emoji: '🧥', nome: 'Pullover girocollo', pos: 'top', pesantezza: 3 }, 
    { emoji: '🧥', nome: 'Cardigan classico', pos: 'top', pesantezza: 2 }, 
    { emoji: '🧥', nome: 'Felpa girocollo', pos: 'top', pesantezza: 2 }, 
    { emoji: '🧥', nome: 'Felpa Hoodie', pos: 'top', pesantezza: 2 }, 
    { emoji: '👕', nome: 'Polo', pos: 'top', pesantezza: 1 }, 
    { emoji: '👖', nome: 'Jeans straight', pos: 'bottom', pesantezza: 2 }, 
    { emoji: '👖', nome: 'Jeans skinny', pos: 'bottom', pesantezza: 2 }, 
    { emoji: '👖', nome: 'Pantalone Chino', pos: 'bottom', pesantezza: 2 }, 
    { emoji: '👖', nome: 'Pantalone cargo', pos: 'bottom', pesantezza: 2 }, 
    { emoji: '👖', nome: 'Joggers sportivi', pos: 'bottom', pesantezza: 2 }, 
    { emoji: '🩳', nome: 'Bermuda sartoriali', pos: 'bottom', pesantezza: 1 }, 
    { emoji: '🧥', nome: 'Blazer monopetto', pos: 'top', pesantezza: 2 }, 
    { emoji: '🧥', nome: 'Giacca di pelle', pos: 'top', pesantezza: 3 }, 
    { emoji: '🧥', nome: 'Trench classico', pos: 'top', pesantezza: 2 }, 
    { emoji: '🧥', nome: 'Cappotto sartoriale', pos: 'top', pesantezza: 4 }, 
    { emoji: '🧥', nome: 'Piumino 100 grammi', pos: 'top', pesantezza: 3 }, 
    { emoji: '🧥', nome: 'Giacca a vento', pos: 'top', pesantezza: 2 }, 
    { emoji: '👟', nome: 'Sneakers classiche', pos: 'shoes', pesantezza: 2 }, 
    { emoji: '👞', nome: 'Mocassini', pos: 'shoes', pesantezza: 2 }, 
    { emoji: '🥾', nome: 'Stivaletti', pos: 'shoes', pesantezza: 3 }, 
    { emoji: '🥾', nome: 'Anfibi', pos: 'shoes', pesantezza: 3 } 
  ],
  colori: [ 
    { hex: '#FFFFFF', nome: 'Bianco ottico' }, { hex: '#FFFFF0', nome: 'Bianco panna' }, 
    { hex: '#0B0B0B', nome: 'Nero corvino' }, { hex: '#595959', nome: 'Grigio fumo' }, 
    { hex: '#E2E2E2', nome: 'Grigio perla' }, { hex: '#36454F', nome: 'Grigio antracite' }, 
    { hex: '#483C32', nome: 'Tortora' }, { hex: '#C2B280', nome: 'Sabbia' }, 
    { hex: '#7B3F00', nome: 'Marrone cioccolato' }, { hex: '#C19A6B', nome: 'Cammello' }, 
    { hex: '#B7410E', nome: 'Ruggine' }, { hex: '#E2725B', nome: 'Terracotta' }, 
    { hex: '#FFDB58', nome: 'Senape' }, { hex: '#E25822', nome: 'Rosso fuoco' }, 
    { hex: '#800020', nome: 'Bordeaux' }, { hex: '#900020', nome: 'Borgogna' }, 
    { hex: '#191970', nome: 'Blu notte' }, { hex: '#000080', nome: 'Blu navy' }, 
    { hex: '#508AAA', nome: 'Carta da zucchero' }, { hex: '#1560BD', nome: 'Denim' }, 
    { hex: '#50C878', nome: 'Verde smeraldo' }, { hex: '#4B5320', nome: 'Verde militare' }, 
    { hex: '#708238', nome: 'Verde oliva' }, { hex: '#FFF44F', nome: 'Giallo limone' } 
  ],
  contestiPossibili: ['📚 Università', '💼 Lavoro', '🥋 Sport', '🍻 Serata', '🛋️ Tempo Libero']
};

function generateRandomItem() {
  let item, itemHash, attempts = 0;
  
  do {
    const tipo = generatorData.tipologie[Math.floor(Math.random() * generatorData.tipologie.length)];
    const colore = generatorData.colori[Math.floor(Math.random() * generatorData.colori.length)];
    const contestiShuffled = generatorData.contestiPossibili.sort(() => 0.5 - Math.random());
    
    itemHash = `${tipo.nome}-${colore.hex}`;
    item = { 
      id: 'item_' + Date.now() + Math.floor(Math.random()*1000), 
      hash: itemHash, 
      emoji: tipo.emoji, 
      pos: tipo.pos, 
      nome_capo: `${tipo.nome} ${colore.nome}`, 
      brand: 'Generico', // Capi inizialmente 'unbrand' durante lo swipe
      colore_hex: colore.hex, 
      pesantezza: tipo.pesantezza, 
      contesti: contestiShuffled.slice(0, 2), 
      quantity: 1, 
      is_dirty: false, 
      is_favorite: false 
    };
    attempts++;
  } while (appState.seenItems.includes(itemHash) && attempts < 15);
  
  return item;
}

function generateCardHTML(item, showFavBtn = false) {
  const brandInfo = getBrandInfo(item.brand);
  const stars = '⭐'.repeat(item.pesantezza);
  const qtyBadge = item.quantity > 1 ? `<div class="t-card-qty">x${item.quantity}</div>` : '';
  const textColor = chroma(item.colore_hex).luminance() > 0.4 ? '#2d3436' : '#ffffff';
  
  // Il pulsante cuore compare solo nella dashboard dell'armadio, non durante lo swipe
  const favBadge = showFavBtn ? `<button class="fav-btn">${item.is_favorite ? '❤️' : '🤍'}</button>` : '';

  return `
    ${favBadge}
    ${qtyBadge}
    <div class="card-emoji">${item.emoji}</div>
    <div class="card-stats">
      <h3 class="card-title" style="color: #2d3436;">${item.nome_capo}</h3>
      <div class="stat-row">
        <span class="stars">${stars}</span>
        <span class="brand-badge" style="background: ${brandInfo.colorVar}">${item.brand}</span>
      </div>
    </div>
  `;
}

// ==========================================
// 5. GOLIKE (MOTORE SWIPE HAMMER.JS)
// ==========================================
let currentCardElement = null, hammerInstance = null;

function initSwipeDeck() { 
  renderNewCard(); 
}

function renderNewCard() {
  const deck = document.getElementById('swipe-deck'); 
  if(!deck) return;
  deck.innerHTML = ''; 
  
  const item = generateRandomItem(); 
  appState.currentCardItem = item;
  
  const brandInfo = getBrandInfo(item.brand);
  const card = document.createElement('div'); 
  card.className = 'swipe-card t-card'; 
  card.style.backgroundColor = item.colore_hex; 
  card.style.setProperty('--rarity-color', brandInfo.colorVar); 
  card.innerHTML = generateCardHTML(item, false);
  
  deck.appendChild(card); 
  currentCardElement = card; 
  setupDeckHammer(card);
}

function setupDeckHammer(element) {
  if (hammerInstance) hammerInstance.destroy();
  
  hammerInstance = new Hammer(element); 
  hammerInstance.get('pan').set({ direction: Hammer.DIRECTION_ALL });
  
  hammerInstance.on('pan', (ev) => { 
    element.style.transition = 'none'; 
    element.style.transform = `translate(${ev.deltaX}px, ${ev.deltaY}px) rotate(${(ev.deltaX * 0.04) * (ev.deltaY / 80)}deg)`; 
  });
  
  hammerInstance.on('panend', (ev) => {
    element.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    if (ev.deltaX > 100 || ev.velocityX > 1.5) { 
      saveSwipedItem(true); 
    } else if (ev.deltaX < -100 || ev.velocityX < -1.5) { 
      saveSwipedItem(false); 
    } else { 
      element.style.transform = 'translate(0px, 0px) rotate(0deg)'; 
    }
  });
}

async function saveSwipedItem(accepted) {
  if (accepted && currentCardElement) {
    currentCardElement.style.transform = `translate(${window.innerWidth}px, 100px) rotate(30deg)`; 
    currentCardElement.style.opacity = '0';
    appState.wardrobe.push(appState.currentCardItem); 
    markItemAsSeen(appState.currentCardItem.hash);
    
    // Sincronizza col backend se non siamo in modalità mock
    const token = sessionStorage.getItem('gll_session_token') || localStorage.getItem('gll_session_token');
    if (token && typeof CONFIG !== 'undefined' && !CONFIG.MOCK_BACKEND) {
      await apiCall('saveItem', { token, item: appState.currentCardItem });
    }
  } else if (currentCardElement) {
    currentCardElement.style.transform = `translate(-${window.innerWidth}px, 100px) rotate(-30deg)`; 
    currentCardElement.style.opacity = '0';
    markItemAsSeen(appState.currentCardItem.hash);
  }
  
  setTimeout(() => renderNewCard(), 300);
}

// Bottoni UI per chi non usa lo swipe touch
document.getElementById('btn-accept')?.addEventListener('click', () => saveSwipedItem(true));
document.getElementById('btn-reject')?.addEventListener('click', () => saveSwipedItem(false));

// ==========================================
// 6. HOME VIEW E METEO (OPENWEATHERMAP)
// ==========================================
function initHome() {
  navigateTo('view-home'); 
  
  const userName = sessionStorage.getItem('gll_user_name') || localStorage.getItem('gll_user_name') || 'Utente';
  const greeting = document.getElementById('home-greeting');
  if(greeting) greeting.innerText = `Ciao ${userName}.`;
  
  // Geolocalizzazione per meteo accurato
  if(navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition( 
      (pos) => fetchRealWeather(pos.coords.latitude, pos.coords.longitude, true), 
      () => fetchRealWeather(45.4642, 9.1900, true) // Fallback Milano
    ); 
  } else { 
    fetchRealWeather(45.4642, 9.1900, true); 
  }
}

async function fetchRealWeather(lat, lon, isSilent = false) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${CONFIG.WEATHER_API_KEY}&units=metric&lang=it`);
    if (!res.ok) throw new Error("Chiamata API fallita");
    
    const data = await res.json();
    appState.weather.temp = Math.round(data.main.temp); 
    appState.weather.desc = data.weather[0].description;
    
    const tempEl = document.getElementById('weather-temp');
    const descEl = document.getElementById('weather-desc');
    
    if(tempEl) tempEl.innerText = `${appState.weather.temp}°C`; 
    if(descEl) descEl.innerText = appState.weather.desc.charAt(0).toUpperCase() + appState.weather.desc.slice(1);
    
    if(!isSilent) setTimeout(() => navigateTo('view-wizard-1'), 800);
  } catch (e) { 
    appState.weather.temp = 18; 
    const tempEl = document.getElementById('weather-temp');
    if(tempEl) tempEl.innerText = `18°C`; 
    if(!isSilent) setTimeout(() => navigateTo('view-wizard-1'), 800); 
  }
}

// ==========================================
// 7. DASHBOARD: ARMADIO, FILTRI E MODIFICA
// ==========================================
document.getElementById('filter-all')?.addEventListener('click', (e) => {
  document.getElementById('filter-favs').classList.remove('active'); 
  e.target.classList.add('active');
  appState.filterMode = 'all'; 
  renderWardrobe();
});

document.getElementById('filter-favs')?.addEventListener('click', (e) => {
  document.getElementById('filter-all').classList.remove('active'); 
  e.target.classList.add('active');
  appState.filterMode = 'favs'; 
  renderWardrobe();
});

function renderWardrobe() {
  let displayItems = appState.wardrobe.filter(i => !i.is_dirty);
  
  if (appState.filterMode === 'favs') {
    displayItems = displayItems.filter(i => i.is_favorite);
  }
  
  const countEl = document.getElementById('wardrobe-count');
  if(countEl) countEl.innerText = `Capi pronti: ${displayItems.length}`;
  
  const grid = document.getElementById('wardrobe-grid'); 
  if(!grid) return;
  grid.innerHTML = '';
  
  displayItems.forEach(item => {
    const el = document.createElement('div'); 
    el.className = 't-card grid-item'; 
    el.style.backgroundColor = item.colore_hex; 
    el.style.setProperty('--rarity-color', getBrandInfo(item.brand).colorVar); 
    
    // Generazione carta con tasto "Cuore" visibile
    el.innerHTML = generateCardHTML(item, true);
    
    // Listener per il tasto preferiti
    const favBtn = el.querySelector('.fav-btn');
    if(favBtn) {
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        item.is_favorite = !item.is_favorite; 
        renderWardrobe();
      });
    }

    // Listener per aprire il Modale di Modifica
    el.addEventListener('click', () => { 
      appState.itemToEditId = item.id; 
      document.getElementById('modal-item-preview').innerText = item.emoji; 
      document.getElementById('edit-brand-input').value = item.brand !== 'Generico' ? item.brand : ''; 
      document.getElementById('edit-qty-input').value = item.quantity || 1; 
      document.getElementById('modal-edit').classList.add('active'); 
    }); 
    
    grid.appendChild(el);
  });
}

// Inserimento Manuale
document.getElementById('btn-add-manual')?.addEventListener('click', () => {
  document.getElementById('modal-add').classList.add('active');
});

document.getElementById('btn-close-add-modal')?.addEventListener('click', () => {
  document.getElementById('modal-add').classList.remove('active');
});

document.getElementById('btn-save-add-modal')?.addEventListener('click', async () => {
  const typeData = JSON.parse(document.getElementById('add-type-input').value);
  const brandVal = document.getElementById('add-brand-input').value.trim() || 'Generico';
  const colorHex = document.getElementById('add-color-hex').value;
  const pesVal = parseInt(document.getElementById('add-pesantezza-input').value);

  const newItem = { 
    id: 'item_manual_' + Date.now(), 
    emoji: typeData.emoji, 
    pos: typeData.pos, 
    nome_capo: typeData.nome, 
    brand: brandVal, 
    colore_hex: colorHex, 
    pesantezza: pesVal, 
    contesti: ['Quotidiano'], 
    quantity: 1, 
    is_dirty: false, 
    is_favorite: false 
  };

  appState.wardrobe.push(newItem);
  
  const token = sessionStorage.getItem('gll_session_token') || localStorage.getItem('gll_session_token');
  if (token && typeof CONFIG !== 'undefined' && !CONFIG.MOCK_BACKEND) {
    await apiCall('saveItem', { token, item: newItem });
  }

  document.getElementById('modal-add').classList.remove('active'); 
  renderWardrobe(); 
});

// Modifica Esistente
document.getElementById('btn-close-modal')?.addEventListener('click', () => {
  document.getElementById('modal-edit').classList.remove('active');
});

document.getElementById('btn-save-modal')?.addEventListener('click', () => {
  const item = appState.wardrobe.find(i => i.id === appState.itemToEditId);
  if(item) {
    if(document.getElementById('edit-brand-input').value) {
      item.brand = document.getElementById('edit-brand-input').value.trim();
    }
    if(parseInt(document.getElementById('edit-qty-input').value) > 0) {
      item.quantity = parseInt(document.getElementById('edit-qty-input').value);
    }
  }
  document.getElementById('modal-edit').classList.remove('active'); 
  renderWardrobe();
});

// ==========================================
// 8. PROFILO E LAVANDERIA
// ==========================================
function updateProfileView() {
  const userName = sessionStorage.getItem('gll_user_name') || localStorage.getItem('gll_user_name') || 'Utente';
  const userEmail = sessionStorage.getItem('gll_user_email') || localStorage.getItem('gll_user_email') || 'Nessuna email salvata';
  
  document.getElementById('profile-name').innerText = userName;
  document.getElementById('profile-email').innerText = userEmail;
  
  const dirtyCount = appState.wardrobe.filter(i => i.is_dirty).length;
  document.getElementById('laundry-count-badge').innerText = dirtyCount;
}

document.getElementById('btn-open-laundry')?.addEventListener('click', () => {
  const dirtyItems = appState.wardrobe.filter(i => i.is_dirty);
  const grid = document.getElementById('laundry-grid'); 
  grid.innerHTML = '';
  
  dirtyItems.forEach(item => { 
    const el = document.createElement('div'); 
    el.className = 't-card grid-item'; 
    el.style.backgroundColor = item.colore_hex; 
    el.style.setProperty('--rarity-color', getBrandInfo(item.brand).colorVar); 
    el.style.opacity = '0.7'; 
    el.innerHTML = generateCardHTML(item, false); 
    grid.appendChild(el); 
  });
  
  // Nasconde temporaneamente la bottom nav per la vista full-screen della lavanderia
  document.getElementById('bottom-nav').style.display = 'none';
  navigateTo('view-laundry');
});

document.getElementById('btn-laundry-reset')?.addEventListener('click', () => {
  appState.wardrobe.forEach(i => i.is_dirty = false);
  alert("Lavatrice completata! Tutti i capi sono di nuovo pronti nell'armadio.");
  document.getElementById('bottom-nav').style.display = 'flex';
  switchTab(document.querySelector('.nav-item[data-target="view-profile"]'), 'view-profile');
});

// ==========================================
// 9. WIZARD GENERATORE E ARMOCROMIA (MATCH)
// ==========================================
document.getElementById('btn-start-wizard')?.addEventListener('click', () => { 
  document.getElementById('bottom-nav').style.display = 'none'; 
  navigateTo('view-loading'); 
  
  if(navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition( 
      (pos) => fetchRealWeather(pos.coords.latitude, pos.coords.longitude, false), 
      () => fetchRealWeather(45.4642, 9.1900, false) 
    ); 
  } else { 
    fetchRealWeather(45.4642, 9.1900, false); 
  }
});

document.querySelectorAll('.context-btn').forEach(btn => btn.addEventListener('click', (e) => { 
  appState.wizard.context = e.currentTarget.getAttribute('data-context'); 
  navigateTo('view-wizard-2'); 
}));

document.querySelectorAll('.style-btn').forEach(btn => btn.addEventListener('click', (e) => { 
  appState.wizard.style = e.currentTarget.getAttribute('data-style'); 
  generateMatch(); 
}));

// Motore Logico Armocromia tramite Chroma.js
function isColorHarmonious(hex1, hex2, context) {
  if (!hex1 || !hex2) return true;
  const c1 = chroma(hex1), c2 = chroma(hex2);
  
  // Riconoscimento colori neutri (si abbinano con tutto)
  const isNeutral = (c) => c.hsl()[1] < 0.2 || c.hsl()[2] < 0.2 || c.hsl()[2] > 0.8;
  if (isNeutral(c1) || isNeutral(c2)) return true; 
  
  const diff = Math.abs((c1.hsl()[0] || 0) - (c2.hsl()[0] || 0));
  
  // Logica contestuale: Lavoro richiede armonia analogica, Sport accetta complementari
  if (context === 'Lavoro' || context === 'Serata') {
    return diff < 50 || diff > 310; 
  }
  return (diff > 140 && diff < 220) || (diff < 50 || diff > 310); 
}

function getCleanWardrobe() { 
  const clean = appState.wardrobe.filter(i => !i.is_dirty);
  // Se l'armadio è vuoto, utilizza il generatore come backup
  return clean.length > 5 ? clean : [...clean, ...Array.from({length: 15}).map(generateRandomItem)]; 
}

function generateMatch() {
  navigateTo('view-loading');
  
  setTimeout(() => {
    const src = getCleanWardrobe();
    
    // Regolazione Pesantezza su API Meteo
    let targetPes = 2; 
    if (appState.weather.temp < 15) targetPes = 3; 
    if (appState.weather.temp > 24) targetPes = 1;

    // Selezione Outfit (I Preferiti hanno la priorità se la pesantezza combacia)
    const topCandidates = src.filter(c => c.pos === 'top' && Math.abs(c.pesantezza - targetPes) <= 1);
    const top = topCandidates.find(c => c.is_favorite) || topCandidates[0] || src.find(c => c.pos === 'top');

    const bottomCandidates = src.filter(c => c.pos === 'bottom' && Math.abs(c.pesantezza - targetPes) <= 1 && isColorHarmonious(top.colore_hex, c.colore_hex, appState.wizard.context));
    const bottom = bottomCandidates.find(c => c.is_favorite) || bottomCandidates[0] || src.find(c => c.pos === 'bottom');

    const shoesCandidates = src.filter(c => c.pos === 'shoes' && isColorHarmonious(bottom.colore_hex, c.colore_hex, appState.wizard.context));
    const shoes = shoesCandidates.find(c => c.is_favorite) || shoesCandidates[0] || src.find(c => c.pos === 'shoes');

    appState.currentOutfit = { top, bottom, shoes };
    renderOutfitStack();
    
    document.getElementById('match-context-desc').innerText = `Armocromia ottimizzata per ${appState.weather.temp}°C e ${appState.wizard.context}`;
    navigateTo('view-match');
  }, 1200);
}

function renderOutfitStack() {
  const stack = document.getElementById('outfit-stack'); 
  stack.innerHTML = '';
  
  ['top', 'bottom', 'shoes'].forEach(pos => {
    const item = appState.currentOutfit[pos];
    if (!item) return;
    
    const brandInfo = getBrandInfo(item.brand);
    const textColor = chroma(item.colore_hex).luminance() > 0.4 ? '#2d3436' : '#ffffff';
    
    const el = document.createElement('div'); 
    el.className = 'match-item'; 
    el.dataset.pos = pos; 
    el.style.setProperty('--rarity-color', brandInfo.colorVar);
    
    el.innerHTML = `
      <div class="match-item-color" style="background:${item.colore_hex}; color:${textColor};">${item.emoji}</div>
      <div class="match-item-details">
        <h4 class="match-item-name">${item.nome_capo}</h4>
        <p class="match-item-brand" style="color:${brandInfo.colorVar}; font-weight:800;">${item.brand}</p>
      </div>
    `;
    stack.appendChild(el);
    
    // Logica Swipe-to-Swap sul singolo capo proposto
    const h = new Hammer(el);
    h.on('panend', (ev) => {
      if (Math.abs(ev.deltaX) > 80) { 
        el.style.transform = `translateX(${ev.deltaX > 0 ? '100%' : '-100%'})`; 
        el.style.opacity = '0'; 
        setTimeout(() => swapSingleItem(pos), 300); 
      }
    });
  });
}

function swapSingleItem(pos) {
  const src = getCleanWardrobe();
  let targetPes = 2; 
  if (appState.weather.temp < 15) targetPes = 3; 
  if (appState.weather.temp > 24) targetPes = 1;
  
  const currentItem = appState.currentOutfit[pos];
  const baseColor = pos === 'top' ? appState.currentOutfit['bottom']?.colore_hex : appState.currentOutfit['top']?.colore_hex;
  
  const newItem = src.find(c => c.pos === pos && c.id !== currentItem.id && Math.abs(c.pesantezza - targetPes) <= 1 && isColorHarmonious(baseColor, c.colore_hex, appState.wizard.context)) || src.find(c => c.pos === pos && c.id !== currentItem.id);
  
  if (newItem) appState.currentOutfit[pos] = newItem;
  renderOutfitStack();
}

document.getElementById('btn-reset-match')?.addEventListener('click', () => navigateTo('view-wizard-1'));

// Conferma Outfit e sposta in lavanderia
document.getElementById('btn-confirm-outfit')?.addEventListener('click', () => { 
  ['top', 'bottom', 'shoes'].forEach(pos => {
    if (appState.currentOutfit[pos]) {
      const matchId = appState.currentOutfit[pos].id;
      const wItem = appState.wardrobe.find(i => i.id === matchId);
      if (wItem) wItem.is_dirty = true;
    }
  });
  
  alert("Ottima scelta! I capi indossati sono stati spostati nel cesto della Lavanderia."); 
  document.getElementById('bottom-nav').style.display = 'flex';
  switchTab(document.querySelector('.nav-item[data-target="view-home"]'), 'view-home');
});