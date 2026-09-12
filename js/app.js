/**
 * GoLookLike - Core Application & Swipe Mechanics
 * Integra: Routing, Splash Screen, Generatore Procedurale e Hammer.js
 */

const appState = {
  wardrobe: [], 
  seenItems: [], // Traccia i capi già proposti
  currentCardItem: null 
};

// --- ROUTING SPA ---
function navigateTo(viewId) {
  document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
}

// --- GESTIONE COOLDOWN SETTIMANALE ---
function manageWeeklyReset() {
  const lastReset = localStorage.getItem('gll_last_reset');
  const savedSeen = localStorage.getItem('gll_seen_items');
  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  if (!lastReset || (now - parseInt(lastReset)) > oneWeek) {
    console.log("🔄 Reset settimanale: svuoto la cronologia degli swipe.");
    localStorage.setItem('gll_last_reset', now.toString());
    appState.seenItems = [];
    localStorage.setItem('gll_seen_items', JSON.stringify([]));
  } else if (savedSeen) {
    appState.seenItems = JSON.parse(savedSeen);
  }
}

function markItemAsSeen(itemId) {
  appState.seenItems.push(itemId);
  localStorage.setItem('gll_seen_items', JSON.stringify(appState.seenItems));
}

// --- INIZIALIZZAZIONE POST-LOGIN ---
function initCoreApp() {
  manageWeeklyReset();
  
  if (appState.wardrobe.length === 0) {
    initSwipeDeck();
    navigateTo('view-onboarding');
  } else {
    document.getElementById('wardrobe-count').innerText = `Capi salvati: ${appState.wardrobe.length}`;
    navigateTo('view-dashboard');
  }
}

// --- SPLASH SCREEN ANIMATION ---
window.addEventListener('DOMContentLoaded', () => {
  const splashText = document.getElementById('splash-text');
  const particlesContainer = document.getElementById('particles-container');
  
  setTimeout(() => {
    splashText.innerText = "GoLookLike";
    splashText.classList.add('text-expand');
    
    const emojis = ['👕', '👖', '🧥', '👟', '👔'];
    for(let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      
      const angle = (Math.random() * 360) * (Math.PI / 180);
      const distance = 100 + Math.random() * 200;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const rot = (Math.random() - 0.5) * 720;
      
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      particle.style.setProperty('--rot', `${rot}deg`);
      
      particlesContainer.appendChild(particle);
    }
  }, 1000);

  setTimeout(() => {
    document.getElementById('session-loader').style.display = 'block';
    verifyInitialSession(); // Avvia il controllo dal file auth.js
  }, 2500);
});

// --- DATABASE PROCEDURALE ESTESO ---
const generatorData = {
  tipologie: [
    { emoji: '👕', nome: 'T-shirt basica maniche corte', pesantezza: 1 },
    { emoji: '👕', nome: 'T-shirt a maniche lunghe', pesantezza: 2 },
    { emoji: '👔', nome: 'Camicia bianca sartoriale', pesantezza: 1 },
    { emoji: '👔', nome: 'Camicia in lino', pesantezza: 1 },
    { emoji: '👔', nome: 'Camicia in denim', pesantezza: 2 },
    { emoji: '🧥', nome: 'Maglia dolcevita', pesantezza: 3 },
    { emoji: '🧥', nome: 'Pullover girocollo', pesantezza: 3 },
    { emoji: '🧥', nome: 'Felpa con cappuccio', pesantezza: 2 },
    { emoji: '👕', nome: 'Polo a maniche corte', pesantezza: 1 },
    { emoji: '👖', nome: 'Jeans taglio dritto', pesantezza: 2 },
    { emoji: '👖', nome: 'Jeans aderenti', pesantezza: 2 },
    { emoji: '👖', nome: 'Pantalone Chino', pesantezza: 2 },
    { emoji: '👖', nome: 'Pantalone cargo', pesantezza: 2 },
    { emoji: '👖', nome: 'Pantalone sportivo', pesantezza: 2 },
    { emoji: '🩳', nome: 'Bermuda sartoriali', pesantezza: 1 },
    { emoji: '🧥', nome: 'Blazer monopetto', pesantezza: 2 },
    { emoji: '🧥', nome: 'Giacca di pelle (Chiodo)', pesantezza: 3 },
    { emoji: '🧥', nome: 'Giacca in denim', pesantezza: 2 },
    { emoji: '🧥', nome: 'Trench classico', pesantezza: 2 },
    { emoji: '🧥', nome: 'Piumino leggero (100g)', pesantezza: 3 },
    { emoji: '🧥', nome: 'Giacca a vento', pesantezza: 2 },
    { emoji: '👟', nome: 'Sneakers bianche', pesantezza: 2 },
    { emoji: '👞', nome: 'Mocassini classici', pesantezza: 2 },
    { emoji: '🥾', nome: 'Anfibi stringati', pesantezza: 3 }
  ],
  colori: [
    { hex: '#FFFFFF', nome: 'Bianco ottico' }, { hex: '#FFFFF0', nome: 'Bianco avorio' },
    { hex: '#0B0B0B', nome: 'Nero corvino' }, { hex: '#595959', nome: 'Grigio fumo' },
    { hex: '#36454F', nome: 'Grigio antracite' }, { hex: '#483C32', nome: 'Tortora' },
    { hex: '#C2B280', nome: 'Sabbia' }, { hex: '#7B3F00', nome: 'Marrone cioccolato' }, 
    { hex: '#C19A6B', nome: 'Cammello' }, { hex: '#B7410E', nome: 'Ruggine' }, 
    { hex: '#E2725B', nome: 'Terracotta' }, { hex: '#E25822', nome: 'Rosso fuoco' }, 
    { hex: '#800020', nome: 'Bordeaux' }, { hex: '#191970', nome: 'Blu notte' }, 
    { hex: '#000080', nome: 'Blu navy' }, { hex: '#1560BD', nome: 'Denim' },
    { hex: '#4B5320', nome: 'Verde militare' }, { hex: '#708238', nome: 'Verde oliva' }
  ],
  contestiPossibili: [
    '📚 Università', '🏍️ Moto', '🥋 Borsone Allenamento', '💼 Lavoro', '🛋️ Tempo Libero'
  ]
};

function generateRandomItem() {
  let item, itemHash;
  let attempts = 0;
  
  do {
    const tipo = generatorData.tipologie[Math.floor(Math.random() * generatorData.tipologie.length)];
    const colore = generatorData.colori[Math.floor(Math.random() * generatorData.colori.length)];
    const contestiShuffled = generatorData.contestiPossibili.sort(() => 0.5 - Math.random());
    
    itemHash = `${tipo.nome}-${colore.hex}`;

    item = {
      id: 'item_' + Date.now(),
      hash: itemHash,
      emoji: tipo.emoji,
      nome_capo: `${tipo.nome} - ${colore.nome}`,
      brand: 'Generico',
      colore_hex: colore.hex,
      pesantezza: tipo.pesantezza,
      contesti: contestiShuffled.slice(0, Math.floor(Math.random() * 2) + 1)
    };
    attempts++;
  } while (appState.seenItems.includes(itemHash) && attempts < 15);

  return item;
}

// --- MOTORE SWIPE HAMMER.JS ---
let currentCardElement = null;
let hammerInstance = null;

function initSwipeDeck() { renderNewCard(); }

function renderNewCard() {
  const deck = document.getElementById('swipe-deck');
  deck.innerHTML = ''; 
  
  const item = generateRandomItem();
  appState.currentCardItem = item;

  const isLight = chroma(item.colore_hex).luminance() > 0.4;
  const textColor = isLight ? '#2d3436' : '#ffffff';
  
  const card = document.createElement('div');
  card.className = 'swipe-card';
  card.style.backgroundColor = item.colore_hex;
  
  const tagsHTML = item.contesti.map(tag => `<span class="tag">${tag}</span>`).join('');

  card.innerHTML = `
    <div class="card-emoji">${item.emoji}</div>
    <div class="card-info">
      <h3 class="card-title" style="color: ${textColor}">${item.nome_capo}</h3>
      <div class="card-tags">${tagsHTML}</div>
    </div>
  `;

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
    const xMulti = ev.deltaX * 0.04;
    const yMulti = ev.deltaY / 80;
    const rotate = xMulti * yMulti;
    element.style.transform = `translate(${ev.deltaX}px, ${ev.deltaY}px) rotate(${rotate}deg)`;
  });

  hammerInstance.on('panend', (ev) => {
    element.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    const threshold = 100;

    if (ev.deltaX > threshold || ev.velocityX > 1.5) handleSwipeRight(element);
    else if (ev.deltaX < -threshold || ev.velocityX < -1.5) handleSwipeLeft(element);
    else element.style.transform = 'translate(0px, 0px) rotate(0deg)';
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

// --- LISTENERS BOTTONI UI ---
document.getElementById('btn-accept').addEventListener('click', () => { if(currentCardElement) handleSwipeRight(currentCardElement); });
document.getElementById('btn-reject').addEventListener('click', () => { if(currentCardElement) handleSwipeLeft(currentCardElement); });

document.getElementById('btn-skip-onboarding').addEventListener('click', () => {
  document.getElementById('wardrobe-count').innerText = `Capi salvati: ${appState.wardrobe.length}`;
  navigateTo('view-dashboard');
});