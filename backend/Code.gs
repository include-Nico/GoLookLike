const SPREADSHEET_ID = '1TU75YW6TPVvpY8DX1jtGMuSW4btGAi6tu6gwqgYFvLQ';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    let result = {};

    switch (action) {
      case 'sendOTP': 
        result = handleSendOTP(data.email); 
        break;
      case 'verifyOTP': 
        result = handleVerifyOTP(data); 
        break;
      case 'checkSession': 
        result = handleCheckSession(data.token); 
        break;
      case 'saveItem': 
        result = handleSaveItem(data.token, data.item); 
        break;
      case 'getWardrobe': 
        result = handleGetWardrobe(data.token); 
        break;
      default: 
        throw new Error("Azione non riconosciuta");
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

function getEmailFromToken(token) {
  const sessionSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Active_Sessions');
  const data = sessionSheet.getDataRange().getValues();
  const now = new Date().getTime();
  
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][0] === token) {
      if (now > parseInt(data[i][2])) throw new Error("Sessione scaduta");
      return data[i][1]; // Ritorna l'email associata al token
    }
  }
  throw new Error("Token non valido o scaduto");
}

function handleCheckSession(token) {
  const email = getEmailFromToken(token);
  // Recupera il nome utente se registrato
  const usersSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Users');
  let nome = 'Utente';
  if (usersSheet) {
    const rows = usersSheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === email) {
        nome = rows[i][1];
        break;
      }
    }
  }
  return { valid: true, email: email, nome: nome };
}

function handleSaveItem(token, item) {
  const email = getEmailFromToken(token);
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Wardrobe');
  // Struttura: EmailUtente, ID, Emoji, Nome, Brand, Colore, Pesantezza, Contesti, Quantità, Preferito, Sporco
  sheet.appendRow([
    email, 
    item.id, 
    item.emoji, 
    item.nome_capo, 
    item.brand, 
    item.colore_hex, 
    item.pesantezza, 
    JSON.stringify(item.contesti), 
    item.quantity, 
    item.is_favorite, 
    item.is_dirty
  ]);
  return { message: "Capo salvato con successo nell'armadio personale" };
}

function handleGetWardrobe(token) {
  const email = getEmailFromToken(token);
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Wardrobe');
  const rows = sheet.getDataRange().getValues();
  let wardrobe = [];

  for (let i = 1; i < rows.length; i++) {
    // Filtra rigorosamente i capi appartenenti SOLO all'utente connesso
    if (rows[i][0] === email) {
      wardrobe.push({
        id: rows[i][1],
        emoji: rows[i][2],
        nome_capo: rows[i][3],
        brand: rows[i][4],
        colore_hex: rows[i][5],
        pesantezza: rows[i][6],
        contesti: JSON.parse(rows[i][7] || '[]'),
        quantity: rows[i][8] || 1,
        is_favorite: rows[i][9] === true || rows[i][9] === 'TRUE',
        is_dirty: rows[i][10] === true || rows[i][10] === 'TRUE'
      });
    }
  }
  return { wardrobe: wardrobe };
}

function doOptions(e) { return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.JSON); }