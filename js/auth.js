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
    if (res.status === 'success') initCoreApp(); 
    else { localStorage.removeItem('gll_session_token'); navigateTo('view-login'); }
  } catch (error) { navigateTo('view-login'); }
}

document.getElementById('btn-send-otp').addEventListener('click', async () => {
  const email = document.getElementById('email-input').value;
  if (!email.includes('@')) return alert("Inserisci un'email valida.");
  const btn = document.getElementById('btn-send-otp');
  btn.innerText = "Invio in corso..."; btn.disabled = true;
  try {
    await apiCall('sendOTP', { email });
    document.getElementById('otp-email-display').innerText = email;
    navigateTo('view-otp');
  } catch (error) { alert("Errore invio OTP."); } 
  finally { btn.innerText = "Ricevi Codice OTP"; btn.disabled = false; }
});

document.getElementById('btn-verify-otp').addEventListener('click', async () => {
  const email = document.getElementById('email-input').value;
  const otp = document.getElementById('otp-input').value;
  if (otp.length !== 6) return alert("Inserisci 6 cifre.");
  const btn = document.getElementById('btn-verify-otp');
  btn.innerText = "Verifica..."; btn.disabled = true;
  try {
    const res = await apiCall('verifyOTP', { email, otp });
    if (res.status === 'success') { localStorage.setItem('gll_session_token', res.data.token); initCoreApp(); } 
    else { alert("Codice errato o scaduto."); }
  } catch (error) { alert("Errore di connessione."); } 
  finally { btn.innerText = "Entra nell'Armadio"; btn.disabled = false; }
});

function mockApiCall(action, payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (action === 'checkSession') resolve({ status: 'error' });
      if (action === 'sendOTP') resolve({ status: 'success' });
      if (action === 'verifyOTP') resolve({ status: 'success', data: { token: 'mock_token_xyz', email: payload.email } });
    }, 800);
  });
}