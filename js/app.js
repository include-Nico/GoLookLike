/**
 * GoLookLike - Core Application & Trading Card System
 * Architettura: Vanilla JS SPA
 * Design: Glassmorphism & Gamification (Rarità Brand)
 */

// ==========================================
// 1. DATABASE 100 BRAND & RARITÀ
// ==========================================
const brandDatabase = [
  // Comune (25)
  { nome: 'Zara', rarity: 'Comune' }, { nome: 'H&M', rarity: 'Comune' }, { nome: 'Pull&Bear', rarity: 'Comune' },
  { nome: 'Bershka', rarity: 'Comune' }, { nome: 'OVS', rarity: 'Comune' }, { nome: 'Primark', rarity: 'Comune' },
  { nome: 'Mango', rarity: 'Comune' }, { nome: 'Piazza Italia', rarity: 'Comune' }, { nome: 'Tezenis', rarity: 'Comune' },
  { nome: 'Alcott', rarity: 'Comune' }, { nome: 'Celio', rarity: 'Comune' }, { nome: 'Kiabi', rarity: 'Comune' },
  { nome: 'Terranova', rarity: 'Comune' }, { nome: 'Stradivarius', rarity: 'Comune' }, { nome: 'Shein', rarity: 'Comune' },
  { nome: 'Asos', rarity: 'Comune' }, { nome: 'Boohoo', rarity: 'Comune' }, { nome: 'Cotton On', rarity: 'Comune' },
  { nome: 'Forever 21', rarity: 'Comune' }, { nome: 'GAP', rarity: 'Comune' }, { nome: 'Old Navy', rarity: 'Comune' },
  { nome: 'Uniqlo', rarity: 'Comune' }, { nome: 'C&A', rarity: 'Comune' }, { nome: 'Muji', rarity: 'Comune' }, 
  { nome: 'Generico', rarity: 'Comune' },
  
  // Raro (30)
  { nome: 'Nike', rarity: 'Raro' }, { nome: 'Adidas', rarity: 'Raro' }, { nome: 'Puma', rarity: 'Raro' },
  { nome: 'Reebok', rarity: 'Raro' }, { nome: 'Under Armour', rarity: 'Raro' }, { nome: 'New Balance', rarity: 'Raro' },
  { nome: 'Asics', rarity: 'Raro' }, { nome: 'Fila', rarity: 'Raro' }, { nome: 'Champion', rarity: 'Raro' },
  { nome: 'Kappa', rarity: 'Raro' }, { nome: 'Levi\'s', rarity: 'Raro' }, { nome: 'Wrangler', rarity: 'Raro' },
  { nome: 'Lee', rarity: 'Raro' }, { nome: 'Vans', rarity: 'Raro' }, { nome: 'Converse', rarity: 'Raro' },
  { nome: 'Timberland', rarity: 'Raro' }, { nome: 'Dr. Martens', rarity: 'Raro' }, { nome: 'Calvin Klein', rarity: 'Raro' },
  { nome: 'Guess', rarity: 'Raro' }, { nome: 'Tommy Hilfiger', rarity: 'Raro' }, { nome: 'Lacoste', rarity: 'Raro' },
  { nome: 'Fred Perry', rarity: 'Raro' }, { nome: 'Hugo Boss', rarity: 'Raro' }, { nome: 'Diesel', rarity: 'Raro' },
  { nome: 'Superdry', rarity: 'Raro' }, { nome: 'Hollister', rarity: 'Raro' }, { nome: 'Abercrombie & Fitch', rarity: 'Raro' },
  { nome: 'Quiksilver', rarity: 'Raro' }, { nome: 'Roxy', rarity: 'Raro' }, { nome: 'Billabong', rarity: 'Raro' },
  
  // Super Raro (20)
  { nome: 'The North Face', rarity: 'Super Raro' }, { nome: 'Patagonia', rarity: 'Super Raro' }, { nome: 'Columbia', rarity: 'Super Raro' },
  { nome: 'Carhartt WIP', rarity: 'Super Raro' }, { nome: 'Arcteryx', rarity: 'Super Raro' }, { nome: 'Salomon', rarity: 'Super Raro' },
  { nome: 'Ralph Lauren', rarity: 'Super Raro' }, { nome: 'Brooks Brothers', rarity: 'Super Raro' }, { nome: 'Armani Exchange', rarity: 'Super Raro' },
  { nome: 'EA7', rarity: 'Super Raro' }, { nome: 'Michael Kors', rarity: 'Super Raro' }, { nome: 'Coach', rarity: 'Super Raro' },
  { nome: 'Kate Spade', rarity: 'Super Raro' }, { nome: 'Tory Burch', rarity: 'Super Raro' }, { nome: 'Furla', rarity: 'Super Raro' },
  { nome: 'Coccinelle', rarity: 'Super Raro' }, { nome: 'Piquadro', rarity: 'Super Raro' }, { nome: 'G-Star RAW', rarity: 'Super Raro' },
  { nome: 'Replay', rarity: 'Super Raro' }, { nome: 'Stone Island', rarity: 'Super Raro' },
  
  // Epico (15)
  { nome: 'Supreme', rarity: 'Epico' }, { nome: 'Off-White', rarity: 'Epico' }, { nome: 'Palace', rarity: 'Epico' },
  { nome: 'BAPE', rarity: 'Epico' }, { nome: 'KITH', rarity: 'Epico' }, { nome: 'Essentials', rarity: 'Epico' },
  { nome: 'Palm Angels', rarity: 'Epico' }, { nome: 'Heron Preston', rarity: 'Epico' }, { nome: 'Gucci', rarity: 'Epico' },
  { nome: 'Prada', rarity: 'Epico' }, { nome: 'Louis Vuitton', rarity: 'Epico' }, { nome: 'Dior', rarity: 'Epico' },
  { nome: 'Chanel', rarity: 'Epico' }, { nome: 'Saint Laurent', rarity: 'Epico' }, { nome: 'Givenchy', rarity: 'Epico' },
  
  // Leggendario (10)
  { nome: 'Hermès', rarity: 'Leggendario' }, { nome: 'Loro Piana', rarity: 'Leggendario' }, { nome: 'Brunello Cucinelli', rarity: 'Leggendario' },
  { nome: 'Kiton', rarity: 'Leggendario' }, { nome: 'Brioni', rarity: 'Leggendario' }, { nome: 'Zegna', rarity: 'Leggendario' },
  { nome: 'Tom Ford', rarity: 'Leggendario' }, { nome: 'Balenciaga', rarity: 'Leggendario' }, { nome: 'Maison Margiela', rarity: 'Leggendario' },
  { nome: 'Bottega Veneta', rarity: 'Leggendario' }
];

// Helper per ottenere le variabili CSS della rarità
function getBrandInfo(brandName) {
  const b = brandDatabase.find(x => x.nome.toLowerCase() === brandName.toLowerCase());
  const rarity = b ? b.rarity : 'Comune'; // Fallback per inserimenti manuali sconosciuti
  let colorVar = 'var(--rarity-comune)';
  
  if (rarity === 'Raro') colorVar = 'var(--rarity-raro)';
  if (rarity === 'Super Raro') colorVar = 'var(--rarity-super-raro)';
  if (rarity === 'Epico') colorVar = 'var(--rarity-epico)';
  if (rarity === 'Leggendario') colorVar = 'var(--rarity-leggendario)';
  
  return { rarity, colorVar };
}

// Inizializza il datalist HTML per l'autocompletamento dell'input manuale
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
// 2. STATO GLOBALE DELL'APPLICAZIONE
// ==========================================
const appState = { 
  wardrobe: [], 
  seenItems: [], 
  currentCardItem: null, 
  itemToEditId: null, 
  weather: { temp: null, desc: null }, 
  wizard: { context: null, style: null } 
};

// ==========================================
// 3. ROUTING & GESTIONE SESSIONI
// ==========================================
function navigateTo(viewId) {
  document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
}

// Logica di reset settimanale per non riproporre sempre gli stessi capi nello swipe
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

// Avvio dell'app dopo il login (chiamata da auth.js)
function initCoreApp() {
  manageWeeklyReset();
  if (appState.wardrobe.length === 0) { 
    initSwipeDeck(); 
    navigateTo('view-onboarding'); 
  } else { 
    initHome(); 
  }
}

// Animazione Iniziale (Splash Screen Particles)
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
// 4. GENERATORE PROCEDURALE CAPI
// ==========================================
const generatorData = {
  tipologie: [
    { emoji: '👕', nome: 'T-shirt', pesantezza: 1 }, 
    { emoji: '👔', nome: 'Camicia', pesantezza: 1 }, 
    { emoji: '🧥', nome: 'Felpa', pesantezza: 2 }, 
    { emoji: '🧥', nome: 'Giacca Pelle', pesantezza: 3 }, 
    { emoji: '👖', nome: 'Jeans', pesantezza: 2 }, 
    { emoji: '👖', nome: 'Pantalone Sport', pesantezza: 2 }, 
    { emoji: '👟', nome: 'Sneakers', pesantezza: 2 }, 
    { emoji: '🥾', nome: 'Anfibi', pesantezza: 3 }
  ],
  colori: [
    { hex: '#FFFFFF', nome: 'Bianco' }, { hex: '#0B0B0B', nome: 'Nero' }, 
    { hex: '#1560BD', nome: 'Denim' }, { hex: '#708238', nome: 'Verde Oliva' },
    { hex: '#800020', nome: 'Bordeaux' }, { hex: '#C19A6B', nome: 'Cammello' }
  ],
  contestiPossibili: ['📚 Politecnico', '🏍️ Moto', '🥋 Sport', '🍻 Uscita']
};

function generateRandomItem() {
  let item, itemHash;
  let attempts = 0;
  
  do {
    const tipo = generatorData.tipologie[Math.floor(Math.random() * generatorData.tipologie.length)];
    const colore = generatorData.colori[Math.floor(Math.random() * generatorData.colori.length)];
    
    // Genera un brand casuale (ponderato per favorire i comuni durante lo swipe)
    const randIndex = Math.floor(Math.random() * (brandDatabase.length / 1.5));
    const randBrand = brandDatabase[randIndex].nome; 
    
    itemHash = `${tipo.nome}-${colore.hex}`;
    
    item = { 
      id: 'item_' + Date.now() + Math.floor(Math.random() * 1000), 
      hash: itemHash, 
      emoji: tipo.emoji, 
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

// Generatore del template HTML per la singola "Trading Card"
function generateCardHTML(item) {
  const brandInfo = getBrandInfo(item.brand);
  const stars = '⭐'.repeat(item.pesantezza);
  const qtyBadge = item.quantity > 1 ? `<div class="t-card-qty">x${item.quantity}</div>` : '';
  
  // Assicura la leggibilità del testo sulla carta basandosi sulla luminosità HEX (grazie a Chroma.js)
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
  setupHammer(card);
}

function setupHammer(element) {
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

// Listener Bottoni Swipe manuali
document.getElementById('btn-accept')?.addEventListener('click', () => { if(currentCardElement) handleSwipeRight(currentCardElement); });
document.getElementById('btn-reject')?.addEventListener('click', () => { if(currentCardElement) handleSwipeLeft(currentCardElement); });
document.getElementById('btn-skip-onboarding')?.addEventListener('click', initHome);


// ==========================================
// 6. DASHBOARD & GESTIONE ARMADIO (MODAL)
// ==========================================
function initHome() { 
  navigateTo('view-home'); 
  // Rilevamento Meteo (Milano come fallback)
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude, true),
      () => fetchWeather(45.4642, 9.1900, true) 
    );
  } else {
    fetchWeather(45.4642, 9.1900, true);
  }
}

document.getElementById('btn-open-wardrobe')?.addEventListener('click', renderWardrobe);
document.getElementById('btn-back-home')?.addEventListener('click', initHome);

function renderWardrobe() {
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
    
    // Apertura modale per edit
    el.addEventListener('click', () => openEditModal(item.id));
    grid.appendChild(el);
  });
  
  navigateTo('view-dashboard');
}

// Logica Modale Edit
function openEditModal(itemId) {
  const item = appState.wardrobe.find(i => i.id === itemId);
  if(!item) return;
  
  appState.itemToEditId = itemId;
  document.getElementById('modal-item-preview').innerText = item.emoji;
  document.getElementById('edit-brand-input').value = item.brand !== 'Generico' ? item.brand : '';
  document.getElementById('edit-qty-input').value = item.quantity || 1;
  document.getElementById('modal-edit').classList.add('active');
}

document.getElementById('btn-close-modal')?.addEventListener('click', () => {
  document.getElementById('modal-edit').classList.remove('active');
});

document.getElementById('btn-save-modal')?.addEventListener('click', () => {
  const item = appState.wardrobe.find(i => i.id === appState.itemToEditId);
  const newBrand = document.getElementById('edit-brand-input').value.trim();
  const newQty = parseInt(document.getElementById('edit-qty-input').value);
  
  if (newBrand) item.brand = newBrand;
  if (newQty > 0) item.quantity = newQty;
  
  document.getElementById('modal-edit').classList.remove('active');
  renderWardrobe(); // Ridisegna l'armadio aggiornato
});


// ==========================================
// 7. OPENWEATHERMAP & WIZARD ENGINE
// ==========================================
async function fetchWeather(lat, lon, isSilent = false) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${CONFIG.WEATHER_API_KEY}&units=metric&lang=it`);
    if (!res.ok) throw new Error("API call failed");
    
    const data = await res.json();
    appState.weather.temp = Math.round(data.main.temp); 
    appState.weather.desc = data.weather[0].description;
    
    document.getElementById('weather-temp').innerText = `${appState.weather.temp}°C`; 
    document.getElementById('weather-desc').innerText = appState.weather.desc.charAt(0).toUpperCase() + appState.weather.desc.slice(1);
    
    if(!isSilent) advanceWizardToContext();
  } catch (e) { 
    console.warn("Errore Meteo API (uso Fallback)");
    appState.weather.temp = 18; 
    document.getElementById('weather-temp').innerText = `18°C`; 
    document.getElementById('weather-desc').innerText = "Previsione non disponibile";
    if(!isSilent) advanceWizardToContext(); 
  }
}

document.getElementById('btn-start-wizard')?.addEventListener('click', () => { 
  navigateTo('view-loading'); 
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude, false),
      () => fetchWeather(45.4642, 9.1900, false)
    );
  } else {
    fetchWeather(45.4642, 9.1900, false);
  }
});

function advanceWizardToContext() { 
  setTimeout(() => navigateTo('view-wizard-1'), 800); 
}

// Listener Bottoni Wizard Q1 e Q2
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
// 8. MOTORE DI MATCH E ARMOCROMIA BASE
// ==========================================
function generateMatch() {
  navigateTo('view-loading');
  
  setTimeout(() => {
    const stack = document.getElementById('outfit-stack'); 
    stack.innerHTML = '';
    
    // Array di fallback se l'armadio non ha abbastanza capi
    const srcWardrobe = appState.wardrobe.length > 2 ? appState.wardrobe : [
      { emoji: '🧥', nome_capo: 'Giacca a Vento', brand: 'The North Face', colore_hex: '#000000', pesantezza: 3 }, 
      { emoji: '👖', nome_capo: 'Jeans Regular', brand: 'Levi\'s', colore_hex: '#1560BD', pesantezza: 2 }, 
      { emoji: '👟', nome_capo: 'Sneakers Sportive', brand: 'Nike', colore_hex: '#FFFFFF', pesantezza: 2 }
    ];
    
    // Logica filtro pesantezza in base ai gradi
    let targetPes = 2;
    if (appState.weather.temp < 15) targetPes = 3;
    if (appState.weather.temp > 24) targetPes = 1;

    // Seleziona Top, Bottom e Scarpe cercando di matchare la pesantezza target (+/- 1)
    const outfit = [
      srcWardrobe.find(c => (c.emoji === '🧥' || c.emoji === '👕' || c.emoji === '👔') && Math.abs(c.pesantezza - targetPes) <= 1) || srcWardrobe.find(c => c.emoji === '🧥' || c.emoji === '👕'),
      srcWardrobe.find(c => (c.emoji === '👖' || c.emoji === '🩳') && Math.abs(c.pesantezza - targetPes) <= 1) || srcWardrobe.find(c => c.emoji === '👖'),
      srcWardrobe.find(c => (c.emoji === '👟' || c.emoji === '👞' || c.emoji === '🥾')) || srcWardrobe.find(c => c.emoji === '👟')
    ].filter(i => i !== undefined);

    // Rendering dell'outfit nel DOM
    outfit.forEach(item => {
      const brandInfo = getBrandInfo(item.brand);
      const el = document.createElement('div'); 
      el.className = 'match-item'; 
      el.style.setProperty('--rarity-color', brandInfo.colorVar);
      
      const textColor = chroma(item.colore_hex).luminance() > 0.4 ? '#2d3436' : '#ffffff';
      
      el.innerHTML = `
        <div class="match-item-color" style="background:${item.colore_hex}; color:${textColor};">${item.emoji}</div>
        <div class="match-item-details">
          <h4 class="match-item-name">${item.nome_capo}</h4>
          <p class="match-item-brand" style="color:${brandInfo.colorVar}; font-weight:800;">${item.brand}</p>
        </div>
      `;
      stack.appendChild(el);
    });
    
    document.getElementById('match-context-desc').innerText = `Generato per ${appState.weather.temp}°C - ${appState.wizard.context}`;
    navigateTo('view-match');
  }, 1200);
}

document.getElementById('btn-reset-match')?.addEventListener('click', () => navigateTo('view-wizard-1'));
document.getElementById('btn-confirm-outfit')?.addEventListener('click', () => { 
  alert("Outfit indossato con successo! Le quantità nel guardaroba sono state aggiornate (Lavanderia)."); 
  initHome(); 
});