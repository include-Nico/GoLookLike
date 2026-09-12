const SPREADSHEET_ID = 'INSERISCI_QUI_IL_TUO_ID_FOGLIO';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    let result = {};

    switch (action) {
      case 'sendOTP': result = handleSendOTP(data.email); break;
      case 'verifyOTP': result = handleVerifyOTP(data); break;
      case 'checkSession': result = handleCheckSession(data.token); break;
      case 'saveItem': result = handleSaveItem(data.item); break;
      default: throw new Error("Azione non riconosciuta");
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: result })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleSendOTP(email) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('OTP_Sessions');
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
  const expiration = new Date(new Date().getTime() + 10 * 60000);
  sheet.appendRow([email, otp, expiration.getTime()]);
  MailApp.sendEmail(email, "Accesso GoLookLike", `Il tuo codice OTP è: ${otp}\nScadrà in 10 minuti.`);
  return { message: "OTP inviato con successo" };
}

function handleVerifyOTP(data) {
  const sheetOTP = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('OTP_Sessions');
  const rowsOTP = sheetOTP.getDataRange().getValues();
  const now = new Date().getTime();
  
  for (let i = rowsOTP.length - 1; i >= 1; i--) {
    let row = rowsOTP[i];
    if (row[0] === data.email && row[1].toString() === data.otp.toString()) {
      if (now > parseInt(row[2])) throw new Error("Codice OTP scaduto");
      
      // Se è una registrazione, salva i dati nel foglio Users
      if (data.isRegistering) {
        const usersSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Users') || SpreadsheetApp.openById(SPREADSHEET_ID).insertSheet('Users');
        usersSheet.appendRow([data.email, data.nome, data.cognome, data.sesso, new Date()]);
      }
      
      return createSessionToken(data.email, data.nome);
    }
  }
  throw new Error("Codice OTP non valido");
}

function createSessionToken(email, nome) {
  const rawToken = email + new Date().getTime() + Math.random().toString();
  const byteSignature = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, rawToken);
  const token = byteSignature.map(b => (b < 0 ? b + 256 : b).toString(16).padStart(2, '0')).join('');
  const expiration = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).getTime();
  const sessionSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Active_Sessions');
  sessionSheet.appendRow([token, email, expiration]);
  return { token: token, email: email, nome: nome || 'Utente' };
}

function handleCheckSession(token) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Active_Sessions');
  const data = sheet.getDataRange().getValues();
  const now = new Date().getTime();
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][0] === token) {
      if (now > parseInt(data[i][2])) throw new Error("Sessione scaduta");
      return { valid: true, email: data[i][1] };
    }
  }
  throw new Error("Token non valido");
}

function handleSaveItem(item) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Wardrobe');
  sheet.appendRow([item.id, item.emoji, item.nome_capo, item.brand, item.colore_hex, item.pesantezza, JSON.stringify(item.contesti)]);
  return { message: "Capo salvato" };
}

function doOptions(e) { return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.JSON); }