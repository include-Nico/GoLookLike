/**
 * GoLookLike - Core Application & Trading Card System
 * Architettura: Vanilla JS SPA
 * Implementa: Hammer.js Swipe, Armocromia (Chroma.js), OpenWeatherMap e Database
 */

// ==========================================
// 1. DATABASE COMPLETO: 100 BRAND & RARITÀ
// ==========================================
const brandDatabase = [
  /* Comune (25) */
  { nome: 'Zara', rarity: 'Comune' },
  { nome: 'H&M', rarity: 'Comune' },
  { nome: 'Pull&Bear', rarity: 'Comune' },
  { nome: 'Bershka', rarity: 'Comune' },
  { nome: 'OVS', rarity: 'Comune' },
  { nome: 'Primark', rarity: 'Comune' },
  { nome: 'Mango', rarity: 'Comune' },
  { nome: 'Piazza Italia', rarity: 'Comune' },
  { nome: 'Tezenis', rarity: 'Comune' },
  { nome: 'Alcott', rarity: 'Comune' },
  { nome: 'Celio', rarity: 'Comune' },
  { nome: 'Kiabi', rarity: 'Comune' },
  { nome: 'Terranova', rarity: 'Comune' },
  { nome: 'Stradivarius', rarity: 'Comune' },
  { nome: 'Shein', rarity: 'Comune' },
  { nome: 'Asos', rarity: 'Comune' },
  { nome: 'Boohoo', rarity: 'Comune' },
  { nome: 'Cotton On', rarity: 'Comune' },
  { nome: 'Forever 21', rarity: 'Comune' },
  { nome: 'GAP', rarity: 'Comune' },
  { nome: 'Old Navy', rarity: 'Comune' },
  { nome: 'Uniqlo', rarity: 'Comune' },
  { nome: 'C&A', rarity: 'Comune' },
  { nome: 'Muji', rarity: 'Comune' },
  { nome: 'Generico', rarity: 'Comune' },
  
  /* Raro (30) */
  { nome: 'Nike', rarity: 'Raro' },
  { nome: 'Adidas', rarity: 'Raro' },
  { nome: 'Puma', rarity: 'Raro' },
  { nome: 'Reebok', rarity: 'Raro' },
  { nome: 'Under Armour', rarity: 'Raro' },
  { nome: 'New Balance', rarity: 'Raro' },
  { nome: 'Asics', rarity: 'Raro' },
  { nome: 'Fila', rarity: 'Raro' },
  { nome: 'Champion', rarity: 'Raro' },
  { nome: 'Kappa', rarity: 'Raro' },
  { nome: 'Levi\'s', rarity: 'Raro' },
  { nome: 'Wrangler', rarity: 'Raro' },
  { nome: 'Lee', rarity: 'Raro' },
  { nome: 'Vans', rarity: 'Raro' },
  { nome: 'Converse', rarity: 'Raro' },
  { nome: 'Timberland', rarity: 'Raro' },
  { nome: 'Dr. Martens', rarity: 'Raro' },
  { nome: 'Calvin Klein', rarity: 'Raro' },
  { nome: 'Guess', rarity: 'Raro' },
  { nome: 'Tommy Hilfiger', rarity: 'Raro' },
  { nome: 'Lacoste', rarity: 'Raro' },
  { nome: 'Fred Perry', rarity: 'Raro' },
  { nome: 'Hugo Boss', rarity: 'Raro' },
  { nome: 'Diesel', rarity: 'Raro' },
  { nome: 'Superdry', rarity: 'Raro' },
  { nome: 'Hollister', rarity: 'Raro' },
  { nome: 'Abercrombie & Fitch', rarity: 'Raro' },
  { nome: 'Quiksilver', rarity: 'Raro' },
  { nome: 'Roxy', rarity: 'Raro' },
  { nome: 'Billabong', rarity: 'Raro' },
  
  /* Super Raro (20) */
  { nome: 'The North Face', rarity: 'Super Raro' },
  { nome: 'Patagonia', rarity: 'Super Raro' },
  { nome: 'Columbia', rarity: 'Super Raro' },
  { nome: 'Carhartt WIP', rarity: 'Super Raro' },
  { nome: 'Arcteryx', rarity: 'Super Raro' },
  { nome: 'Salomon', rarity: 'Super Raro' },
  { nome: 'Ralph Lauren', rarity: 'Super Raro' },
  { nome: 'Brooks Brothers', rarity: 'Super Raro' },
  { nome: 'Armani Exchange', rarity: 'Super Raro' },
  { nome: 'EA7', rarity: 'Super Raro' },
  { nome: 'Michael Kors', rarity: 'Super Raro' },
  { nome: 'Coach', rarity: 'Super Raro' },
  { nome: 'Kate Spade', rarity: 'Super Raro' },
  { nome: 'Tory Burch', rarity: 'Super Raro' },
  { nome: 'Furla', rarity: 'Super Raro' },
  { nome: 'Coccinelle', rarity: 'Super Raro' },
  { nome: 'Piquadro', rarity: 'Super Raro' },
  { nome: 'G-Star RAW', rarity: 'Super Raro' },
  { nome: 'Replay', rarity: 'Super Raro' },
  { nome: 'Stone Island', rarity: 'Super Raro' },
  
  /* Epico (15) */
  { nome: 'Supreme', rarity: 'Epico' },
  { nome: 'Off-White', rarity: 'Epico' },
  { nome: 'Palace', rarity: 'Epico' },
  { nome: 'BAPE', rarity: 'Epico' },
  { nome: 'KITH', rarity: 'Epico' },
  { nome: 'Essentials', rarity: 'Epico' },
  { nome: 'Palm Angels', rarity: 'Epico' },
  { nome: 'Heron Preston', rarity: 'Epico' },
  { nome: 'Gucci', rarity: 'Epico' },
  { nome: 'Prada', rarity: 'Epico' },
  { nome: 'Louis Vuitton', rarity: 'Epico' },
  { nome: 'Dior', rarity: 'Epico' },
  { nome: 'Chanel', rarity: 'Epico' },
  { nome: 'Saint Laurent', rarity: 'Epico' },
  { nome: 'Givenchy', rarity: 'Epico' },
  
  /* Leggendario (10) */
  { nome: 'Hermès', rarity: 'Leggendario' },
  { nome: 'Loro Piana', rarity: 'Leggendario' },
  { nome: 'Brunello Cucinelli', rarity: 'Leggendario' },
  { nome: 'Kiton', rarity: 'Leggendario' },
  { nome: 'Brioni', rarity: 'Leggendario' },
  { nome: 'Zegna', rarity: 'Leggendario' },
  { nome: 'Tom Ford', rarity: 'Leggendario' },
  { nome: 'Balenciaga', rarity: 'Leggendario' },
  { nome: 'Maison Margiela', rarity: 'Leggendario' },
  { nome: 'Bottega Veneta', rarity: 'Leggendario' }
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

// Inizializza l'autocompletamento nel modal
window.addEventListener('DOMContentLoaded', () => {
  const dataList = document.getElementById('brands-list');
  if (dataList) {
    brandDatabase.forEach(b => {
      const option = document.createElement('option');
      option.value = b.nome;
      dataList.appendChild(option);
    });
  }
});


// ==========================================
// 2. STATO GLOBALE E NAVIGAZIONE
// ==========================================
const appState = {
  wardrobe: [],
  seenItems: [],
  currentCardItem: null,
  itemToEditId: null,
  weather: { temp: null, desc: null },
  wizard: { context: null, style: null },
  currentOutfit: { top: null, bottom: null, shoes: null }
};

function navigateTo(viewId) {
  document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
}

// Logica per non riproporre sempre gli stessi capi nello swipe
function manageWeeklyReset() {
  const lastReset = localStorage.getItem('gll_last_reset');
  const savedSeen = localStorage.getItem('gll_seen_items');
  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  if (!lastReset || (now - parseInt(lastReset)) > oneWeek) {
    localStorage.setItem('gll_last_reset', now.toString());
    appState.seenItems = [];
    localStorage.setItem('gll_seen_items', '[]');
  } else if (savedSeen) {
    appState.seenItems = JSON.parse(savedSeen);
  }
}

function markItemAsSeen(itemId) {
  appState.seenItems.push(itemId);
  localStorage.setItem('gll_seen_items', JSON.stringify(appState.seenItems));
}


// ==========================================
// 3. INIZIALIZZAZIONE E SPLASH SCREEN
// ==========================================
function initCoreApp() {
  manageWeeklyReset();
  if (appState.wardrobe.length === 0) {
    initSwipeDeck();
    navigateTo('view-onboarding');
  } else {
    initHome();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const splashText = document.getElementById('splash-text');
  const particlesContainer = document.getElementById('particles-container');
  
  if (splashText && particlesContainer) {
    setTimeout(() => {
      splashText.innerText = "GoLookLike";
      splashText.classList.add('text-expand');
      
      const emojis = ['👕', '👖', '🧥', '👟', '👔', '🥾'];
      for (let i = 0; i < 15; i++) {
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
      if (typeof verifyInitialSession === "function") {
        verifyInitialSession();
      }
    }, 2500);
  }
});


// ==========================================
// 4. GENERATORE PROCEDURALE ONBOARDING
// ==========================================
const generatorData = {
  tipologie: [
    { emoji: '👕', nome: 'T-shirt', pos: 'top', pesantezza: 1 },
    { emoji: '👔', nome: 'Camicia', pos: 'top', pesantezza: 1 },
    { emoji: '🧥', nome: 'Felpa', pos: 'top', pesantezza: 2 },
    { emoji: '🧥', nome: 'Giacca Pelle', pos: 'top', pesantezza: 3 },
    { emoji: '👖', nome: 'Jeans', pos: 'bottom', pesantezza: 2 },
    { emoji: '👖', nome: 'Pantalone Chino', pos: 'bottom', pesantezza: 2 },
    { emoji: '👟', nome: 'Sneakers', pos: 'shoes', pesantezza: 2 },
    { emoji: '🥾', nome: 'Anfibi', pos: 'shoes', pesantezza: 3 }
  ],
  colori: [
    { hex: '#FFFFFF', nome: 'Bianco' },
    { hex: '#0B0B0B', nome: 'Nero' },
    { hex: '#1560BD', nome: 'Denim' },
    { hex: '#708238', nome: 'Verde Oliva' },
    { hex: '#800020', nome: 'Bordeaux' },
    { hex: '#C19A6B', nome: 'Cammello' }
  ],
  contestiPossibili: ['📚 Politecnico', '🏍️ Moto', '🥋 Sport', '🍻 Uscita']
};

function generateRandomItem() {
  let item, itemHash;
  let attempts = 0;
  
  do {
    const tipo = generatorData.tipologie[Math.floor(Math.random() * generatorData.tipologie.length)];
    const colore = generatorData.colori[Math.floor(Math.random() * generatorData.colori.length)];
    const randBrand = brandDatabase[Math.floor(Math.random() * (brandDatabase.length / 1.5))].nome;
    
    itemHash = `${tipo.nome}-${colore.hex}`;
    
    item = {
      id: 'item_' + Date.now() + Math.floor(Math.random() * 1000),
      hash: itemHash,
      emoji: tipo.emoji,
      pos: tipo.pos,
      nome_capo: `${tipo.nome} ${colore.nome}`,
      brand: randBrand,
      colore_hex: colore.hex,
      pesantezza: tipo.pesantezza,
      contesti: ['Quotidiano'],
      quantity: 1
    };
    attempts++;
  } while (appState.seenItems.includes(itemHash) && attempts < 15);
  
  return item;
}

function generateCardHTML(item) {
  const brandInfo = getBrandInfo(item.brand);
  const stars = '⭐'.repeat(item.pesantezza);
  const qtyBadge = item.quantity > 1 ? `<div class="t-card-qty">x${item.quantity}</div>` : '';
  const textColor = chroma(item.colore_hex).luminance() > 0.4 ? '#2d3436' : '#ffffff';

  return `
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
// 5. ONBOARDING SWIPE (HAMMER.JS)
// ==========================================
let currentCardElement = null, hammerInstance = null;

function initSwipeDeck() {
  renderNewCard();
}

function renderNewCard() {
  const deck = document.getElementById('swipe-deck');
  deck.innerHTML = '';
  
  const item = generateRandomItem();
  appState.currentCardItem = item;
  
  const brandInfo = getBrandInfo(item.brand);
  const card = document.createElement('div');
  card.className = 'swipe-card t-card';
  card.style.backgroundColor = item.colore_hex;
  card.style.setProperty('--rarity-color', brandInfo.colorVar);
  card.innerHTML = generateCardHTML(item);
  
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
    const rotate = (ev.deltaX * 0.04) * (ev.deltaY / 80);
    element.style.transform = `translate(${ev.deltaX}px, ${ev.deltaY}px) rotate(${rotate}deg)`;
  });
  
  hammerInstance.on('panend', (ev) => {
    element.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    const threshold = 100;

    if (ev.deltaX > threshold || ev.velocityX > 1.5) {
      handleSwipeRight(element);
    } else if (ev.deltaX < -threshold || ev.velocityX < -1.5) {
      handleSwipeLeft(element);
    } else {
      element.style.transform = 'translate(0px, 0px) rotate(0deg)';
    }
  });
}

function handleSwipeRight(element) {
  element.style.transform = `translate(${window.innerWidth}px, 100px) rotate(30deg)`;
  element.style.opacity = '0';
  appState.wardrobe.push(appState.currentCardItem);
  markItemAsSeen(appState.currentCardItem.hash);
  setTimeout(() => renderNewCard(), 300);
}

function handleSwipeLeft(element) {
  element.style.transform = `translate(-${window.innerWidth}px, 100px) rotate(-30deg)`;
  element.style.opacity = '0';
  markItemAsSeen(appState.currentCardItem.hash);
  setTimeout(() => renderNewCard(), 300);
}

document.getElementById('btn-accept')?.addEventListener('click', () => { if(currentCardElement) handleSwipeRight(currentCardElement); });
document.getElementById('btn-reject')?.addEventListener('click', () => { if(currentCardElement) handleSwipeLeft(currentCardElement); });
document.getElementById('btn-skip-onboarding')?.addEventListener('click', initHome);


// ==========================================
// 6. DASHBOARD, ARMADIO & MODAL
// ==========================================
function initHome() {
  navigateTo('view-home');
  const userName = localStorage.getItem('gll_user_name') || 'Nicolò';
  
  const greetingEl = document.getElementById('home-greeting');
  if (greetingEl) {
    greetingEl.innerText = `Ciao ${userName}.`;
  }
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude, true),
      () => fetchWeather(45.4642, 9.1900, true)
    );
  } else {
    fetchWeather(45.4642, 9.1900, true);
  }
}

document.getElementById('btn-open-wardrobe')?.addEventListener('click', () => {
  document.getElementById('wardrobe-count').innerText = `Capi salvati: ${appState.wardrobe.length}`;
  const grid = document.getElementById('wardrobe-grid');
  grid.innerHTML = '';
  
  appState.wardrobe.forEach(item => {
    const brandInfo = getBrandInfo(item.brand);
    const el = document.createElement('div');
    el.className = 't-card grid-item';
    el.style.backgroundColor = item.colore_hex;
    el.style.setProperty('--rarity-color', brandInfo.colorVar);
    el.innerHTML = generateCardHTML(item);
    
    el.addEventListener('click', () => {
      appState.itemToEditId = item.id;
      document.getElementById('modal-item-preview').innerText = item.emoji;
      document.getElementById('edit-brand-input').value = item.brand !== 'Generico' ? item.brand : '';
      document.getElementById('edit-qty-input').value = item.quantity || 1;
      document.getElementById('modal-edit').classList.add('active');
    });
    grid.appendChild(el);
  });
  navigateTo('view-dashboard');
});

document.getElementById('btn-back-home')?.addEventListener('click', initHome);
document.getElementById('btn-close-modal')?.addEventListener('click', () => document.getElementById('modal-edit').classList.remove('active'));

document.getElementById('btn-save-modal')?.addEventListener('click', () => {
  const item = appState.wardrobe.find(i => i.id === appState.itemToEditId);
  const newBrand = document.getElementById('edit-brand-input').value.trim();
  const newQty = parseInt(document.getElementById('edit-qty-input').value);
  
  if (newBrand) item.brand = newBrand;
  if (newQty > 0) item.quantity = newQty;
  
  document.getElementById('modal-edit').classList.remove('active');
  document.getElementById('btn-open-wardrobe').click(); // Refresh armadio
});


// ==========================================
// 7. WIZARD METEO (OPENWEATHERMAP)
// ==========================================
async function fetchWeather(lat, lon, isSilent = false) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${CONFIG.WEATHER_API_KEY}&units=metric&lang=it`);
    if (!res.ok) throw new Error("API fallita");
    
    const data = await res.json();
    appState.weather.temp = Math.round(data.main.temp);
    appState.weather.desc = data.weather[0].description;
    
    document.getElementById('weather-temp').innerText = `${appState.weather.temp}°C`;
    document.getElementById('weather-desc').innerText = appState.weather.desc.charAt(0).toUpperCase() + appState.weather.desc.slice(1);
    
    if (!isSilent) setTimeout(() => navigateTo('view-wizard-1'), 800);
  } catch (e) {
    appState.weather.temp = 18;
    document.getElementById('weather-temp').innerText = `18°C`;
    if (!isSilent) setTimeout(() => navigateTo('view-wizard-1'), 800);
  }
}

document.getElementById('btn-start-wizard')?.addEventListener('click', () => {
  navigateTo('view-loading');
  fetchWeather(45.4642, 9.1900, false);
});

document.querySelectorAll('.context-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    appState.wizard.context = e.currentTarget.getAttribute('data-context');
    navigateTo('view-wizard-2');
  });
});

document.querySelectorAll('.style-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    appState.wizard.style = e.currentTarget.getAttribute('data-style');
    generateMatch();
  });
});


// ==========================================
// 8. MOTORE ARMOCROMIA & MATCH
// ==========================================
function isColorHarmonious(hex1, hex2, context) {
  if (!hex1 || !hex2) return true;
  const c1 = chroma(hex1), c2 = chroma(hex2);
  
  const isNeutral = (c) => c.hsl()[1] < 0.2 || c.hsl()[2] < 0.2 || c.hsl()[2] > 0.8;
  if (isNeutral(c1) || isNeutral(c2)) return true; 
  
  const diff = Math.abs((c1.hsl()[0] || 0) - (c2.hsl()[0] || 0));
  
  if (context === 'Lavoro' || context === 'Serata') {
    return diff < 50 || diff > 310; // Colori analoghi o tono su tono
  }
  return (diff > 140 && diff < 220) || (diff < 50 || diff > 310); // Casual accetta anche complementari
}

function getWardrobeBackup() {
  return appState.wardrobe.length > 5 ? appState.wardrobe : [...appState.wardrobe, ...Array.from({length: 15}).map(generateRandomItem)];
}

function generateMatch() {
  navigateTo('view-loading');
  
  setTimeout(() => {
    const src = getWardrobeBackup();
    let targetPes = 2;
    if (appState.weather.temp < 15) targetPes = 3;
    if (appState.weather.temp > 24) targetPes = 1;

    const top = src.find(c => c.pos === 'top' && Math.abs(c.pesantezza - targetPes) <= 1) || src.find(c => c.pos === 'top');
    const bottom = src.find(c => c.pos === 'bottom' && Math.abs(c.pesantezza - targetPes) <= 1 && isColorHarmonious(top.colore_hex, c.colore_hex, appState.wizard.context)) || src.find(c => c.pos === 'bottom');
    const shoes = src.find(c => c.pos === 'shoes' && isColorHarmonious(bottom.colore_hex, c.colore_hex, appState.wizard.context)) || src.find(c => c.pos === 'shoes');

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
    
    // Swipe-to-Swap logica per capo singolo
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
  const src = getWardrobeBackup();
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
document.getElementById('btn-confirm-outfit')?.addEventListener('click', () => {
  alert("Outfit confermato e scalato dal guardaroba!");
  initHome();
});