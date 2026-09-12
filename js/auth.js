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
  const token = sessionStorage.getItem('gll_session_token') || localStorage.getItem('gll_session_token');
  if (!token) return navigateTo('view-login');
  
  try {
    const res = await apiCall('checkSession', { token });
    if (res.status === 'success') {
      initCoreApp(); 
    } else { 
      clearLocalData();
      navigateTo('view-login'); 
    }
  } catch (error) { 
    clearLocalData();
    navigateTo('view-login'); 
  }
}

function clearLocalData() {
  localStorage.removeItem('gll_session_token'); 
  sessionStorage.removeItem('gll_session_token'); 
  localStorage.removeItem('gll_user_name');
  sessionStorage.removeItem('gll_user_name');
  localStorage.removeItem('gll_user_email');
  sessionStorage.removeItem('gll_user_email');
}

// Logica per il pulsante Disconnetti nel Profilo
document.getElementById('btn-logout')?.addEventListener('click', () => {
  clearLocalData();
  document.getElementById('bottom-nav').style.display = 'none';
  navigateTo('view-login');
});

document.getElementById('btn-send-otp')?.addEventListener('click', async () => {
  const email = document.getElementById('email-input').value;
  if (!email.includes('@')) return alert("Inserisci un'email valida.");
  
  let payload = { email: email };
  
  if (isRegistrationMode) {
    payload.nome = document.getElementById('nome-input').value;
    payload.cognome = document.getElementById('cognome-input').value;
    payload.sesso = document.getElementById('sesso-input').value;
    if (!payload.nome || !payload.cognome || !payload.sesso) return alert("Compila tutti i campi di registrazione.");
    sessionStorage.setItem('gll_temp_user', JSON.stringify(payload));
  }

  const btn = document.getElementById('btn-send-otp');
  btn.innerText = "Invio in corso..."; btn.disabled = true;
  
  try {
    await apiCall('sendOTP', payload);
    document.getElementById('otp-email-display').innerText = email;
    navigateTo('view-otp');
  } catch (error) { 
    alert("Errore invio OTP."); 
  } finally { 
    btn.innerText = isRegistrationMode ? "Registrati e Ricevi OTP" : "Ricevi Codice OTP"; 
    btn.disabled = false; 
  }
});

document.getElementById('btn-verify-otp')?.addEventListener('click', async () => {
  const email = document.getElementById('email-input').value;
  const otp = document.getElementById('otp-input').value;
  const rememberMe = document.getElementById('remember-me')?.checked || false;
  
  if (otp.length !== 6) return alert("Inserisci 6 cifre esatte.");
  
  let payload = { email: email, otp: otp, isRegistering: isRegistrationMode };
  if (isRegistrationMode) {
    const tempUser = JSON.parse(sessionStorage.getItem('gll_temp_user') || '{}');
    payload = { ...payload, ...tempUser };
  }

  const btn = document.getElementById('btn-verify-otp');
  btn.innerText = "Verifica in corso..."; btn.disabled = true;
  
  try {
    const res = await apiCall('verifyOTP', payload);
    if (res.status === 'success') { 
      if (rememberMe) {
        localStorage.setItem('gll_session_token', res.data.token);
        localStorage.setItem('gll_user_name', res.data.nome); 
        localStorage.setItem('gll_user_email', email);
      } else {
        sessionStorage.setItem('gll_session_token', res.data.token);
        sessionStorage.setItem('gll_user_name', res.data.nome); 
        sessionStorage.setItem('gll_user_email', email);
      }
      initCoreApp(); 
    } else { 
      alert(res.message || "Codice errato o scaduto."); 
    }
  } catch (error) { 
    alert("Errore di connessione al server."); 
  } finally { 
    btn.innerText = "Entra"; 
    btn.disabled = false; 
  }
});

function mockApiCall(action, payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (action === 'checkSession') resolve({ status: 'error' });
      if (action === 'sendOTP') { console.log(`Codice OTP per ${payload.email}: 123456`); resolve({ status: 'success' }); }
      if (action === 'verifyOTP') {
        if (payload.otp === '123456') resolve({ status: 'success', data: { token: 'mock_token_xyz', nome: payload.nome || 'Mario', email: payload.email } });
        else resolve({ status: 'error', message: 'Codice OTP errato. In ambiente test usa: 123456' });
      }
    }, 800);
  });
}