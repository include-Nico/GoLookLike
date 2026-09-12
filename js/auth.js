let isRegistrationMode = false;

document.getElementById('tab-login')?.addEventListener('click', (e) => {
  isRegistrationMode = false;
  e.target.classList.add('active');
  document.getElementById('tab-register').classList.remove('active');
  document.getElementById('register-fields').style.display = 'none';
  document.getElementById('btn-send-otp').innerText = 'Ricevi Codice OTP';
});

document.getElementById('tab-register')?.addEventListener('click', (e) => {
  isRegistrationMode = true;
  e.target.classList.add('active');
  document.getElementById('tab-login').classList.remove('active');
  document.getElementById('register-fields').style.display = 'block';
  document.getElementById('btn-send-otp').innerText = 'Registrati e Ricevi OTP';
});

async function apiCall(action, payload) {
  if (CONFIG.MOCK_BACKEND) return mockApiCall(action, payload);
  const response = await fetch(CONFIG.API_URL, { method: 'POST', body: JSON.stringify({ action, ...payload }) });
  return response.json();
}

async function verifyInitialSession() {
  const token = localStorage.getItem('gll_session_token');
  if (!token) return navigateTo('view-login');
  try {
    const res = await apiCall('checkSession', { token });
    if (res.status === 'success') {
      initCoreApp(); 
    } else { 
      localStorage.removeItem('gll_session_token'); 
      navigateTo('view-login'); 
    }
  } catch (error) { navigateTo('view-login'); }
}

document.getElementById('btn-send-otp')?.addEventListener('click', async () => {
  const email = document.getElementById('email-input').value;
  if (!email.includes('@')) return alert("Inserisci un'email valida.");
  
  let payload = { email: email };
  
  if (isRegistrationMode) {
    payload.nome = document.getElementById('nome-input').value;
    payload.cognome = document.getElementById('cognome-input').value;
    payload.sesso = document.getElementById('sesso-input').value;
    
    if (!payload.nome || !payload.cognome || !payload.sesso) {
      return alert("Compila tutti i campi di registrazione.");
    }
    localStorage.setItem('gll_temp_user', JSON.stringify(payload));
  }

  const btn = document.getElementById('btn-send-otp');
  btn.innerText = "Invio in corso..."; btn.disabled = true;
  
  try {
    await apiCall('sendOTP', payload);
    document.getElementById('otp-email-display').innerText = email;
    navigateTo('view-otp');
  } catch (error) { alert("Errore invio OTP."); } 
  finally { btn.innerText = isRegistrationMode ? "Registrati e Ricevi OTP" : "Ricevi Codice OTP"; btn.disabled = false; }
});

document.getElementById('btn-verify-otp')?.addEventListener('click', async () => {
  const email = document.getElementById('email-input').value;
  const otp = document.getElementById('otp-input').value;
  if (otp.length !== 6) return alert("Inserisci 6 cifre.");
  
  let payload = { email: email, otp: otp, isRegistering: isRegistrationMode };
  
  if (isRegistrationMode) {
    const tempUser = JSON.parse(localStorage.getItem('gll_temp_user') || '{}');
    payload = { ...payload, ...tempUser };
  }

  const btn = document.getElementById('btn-verify-otp');
  btn.innerText = "Verifica..."; btn.disabled = true;
  
  try {
    const res = await apiCall('verifyOTP', payload);
    if (res.status === 'success') { 
      localStorage.setItem('gll_session_token', res.data.token);
      localStorage.setItem('gll_user_name', res.data.nome); 
      initCoreApp(); 
    } else { 
      alert("Codice errato o scaduto."); 
    }
  } catch (error) { alert("Errore di connessione."); } 
  finally { btn.innerText = "Entra nell'Armadio"; btn.disabled = false; }
});

function mockApiCall(action, payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (action === 'checkSession') resolve({ status: 'error' });
      if (action === 'sendOTP') resolve({ status: 'success' });
      if (action === 'verifyOTP') resolve({ status: 'success', data: { token: 'mock_token_xyz', nome: payload.nome || 'Nicolò', email: payload.email } });
    }, 800);
  });
}