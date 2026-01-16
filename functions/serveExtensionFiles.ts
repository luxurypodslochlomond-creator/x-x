import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * SERVE EXTENSION FILES
 * Returns extension source code ready to install
 * User downloads, loads unpacked in Chrome
 */

Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    const file = url.searchParams.get('file') || 'manifest.json';

    // Extension file registry
    const files = {
      'manifest.json': {
        content: JSON.stringify({
          manifest_version: 3,
          name: "CB51 Email Scanner",
          version: "1.0.0",
          description: "Auto-scan emails for gigs, tasks, invoices, contracts",
          permissions: ["scripting", "activeTab", "webRequest"],
          host_permissions: ["https://mail.google.com/*", "https://outlook.office.com/*", "https://outlook.live.com/*"],
          action: {
            default_popup: "popup.html",
            default_title: "CB51 Scanner"
          },
          background: {
            service_worker: "background.js"
          },
          content_scripts: [{
            matches: ["https://mail.google.com/*", "https://outlook.office.com/*"],
            js: ["content.js"]
          }],
          icons: {
            16: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect fill='%2306b6d4' width='32' height='32'/><text x='16' y='22' font-size='20' font-weight='bold' fill='white' text-anchor='middle'>CB</text></svg>"
          }
        }, null, 2),
        type: 'application/json'
      },
      
      'background.js': {
        content: `/**
 * CB51 BACKGROUND WORKER
 * Listens for new emails, auto-scans them
 */

const API_BASE = 'https://' + window.location.hostname;
const SCAN_ENDPOINT = '/api/functions/autoExtensionScan';

// Store user token from login
let authToken = null;
let artistId = null;

// On startup, get stored auth
chrome.storage.local.get(['authToken', 'artistId'], (result) => {
  authToken = result.authToken;
  artistId = result.artistId;
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'NEW_EMAIL') {
    handleNewEmail(message.email, sender.tab.url);
  } else if (message.type === 'GET_AUTH') {
    sendResponse({ authToken, artistId });
  }
});

async function handleNewEmail(email, tabUrl) {
  if (!authToken || !artistId) {
    console.log('No auth token - user needs to login in popup');
    return;
  }

  try {
    const response = await fetch(API_BASE + SCAN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      },
      body: JSON.stringify({
        emailText: email.text,
        emailSubject: email.subject,
        attachments: email.attachments || [],
        artistId: artistId,
        fromEmail: email.from,
        timestamp: new Date().toISOString()
      })
    });

    const result = await response.json();
    
    if (result.success) {
      // Show notification
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect fill="%2306b6d4" width="128" height="128"/><text x="64" y="90" font-size="60" font-weight="bold" fill="white" text-anchor="middle">✓</text></svg>',
        title: 'CB51 Scanned',
        message: result.result?.type + ' added to CB51',
        isClickable: false
      });

      // Log to storage
      chrome.storage.local.get(['scanHistory'], (data) => {
        const history = data.scanHistory || [];
        history.unshift({
          type: result.extraction_type,
          timestamp: new Date().toISOString(),
          success: true
        });
        chrome.storage.local.set({ scanHistory: history.slice(0, 50) });
      });
    } else {
      console.log('Low confidence extraction:', result);
    }
  } catch (error) {
    console.error('Scan failed:', error);
  }
}
`,
        type: 'text/javascript'
      },

      'content.js': {
        content: `/**
 * CB51 CONTENT SCRIPT
 * Runs on Gmail/Outlook, detects new emails
 */

// Listen for new emails in Gmail
if (window.location.hostname.includes('mail.google.com')) {
  setupGmailListener();
} else if (window.location.hostname.includes('outlook')) {
  setupOutlookListener();
}

function setupGmailListener() {
  // Wait for Gmail to load
  setTimeout(() => {
    const observer = new MutationObserver(() => {
      const emailRows = document.querySelectorAll('[role="listitem"]');
      emailRows.forEach(row => {
        if (!row.dataset.scanned) {
          row.dataset.scanned = 'true';
          row.addEventListener('click', () => extractGmailEmail(row));
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }, 1000);
}

function setupOutlookListener() {
  setTimeout(() => {
    const observer = new MutationObserver(() => {
      const emailItems = document.querySelectorAll('[data-mail-item]');
      emailItems.forEach(item => {
        if (!item.dataset.scanned) {
          item.dataset.scanned = 'true';
          item.addEventListener('click', () => extractOutlookEmail(item));
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }, 1000);
}

function extractGmailEmail(row) {
  try {
    const subject = row.querySelector('[role="heading"]')?.textContent || '';
    const from = row.querySelector('[email]')?.getAttribute('email') || '';
    
    setTimeout(() => {
      const emailBody = document.querySelector('[role="main"]')?.innerText || '';
      
      chrome.runtime.sendMessage({
        type: 'NEW_EMAIL',
        email: {
          subject: subject,
          from: from,
          text: emailBody,
          attachments: []
        }
      });
    }, 500);
  } catch (e) {
    console.log('Gmail extraction error:', e);
  }
}

function extractOutlookEmail(item) {
  try {
    const subject = item.getAttribute('aria-label') || '';
    setTimeout(() => {
      const emailBody = document.querySelector('[role="article"]')?.innerText || '';
      
      chrome.runtime.sendMessage({
        type: 'NEW_EMAIL',
        email: {
          subject: subject,
          from: 'unknown',
          text: emailBody,
          attachments: []
        }
      });
    }, 500);
  } catch (e) {
    console.log('Outlook extraction error:', e);
  }
}
`,
        type: 'text/javascript'
      },

      'popup.html': {
        content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CB51</h1>
      <p class="subtitle">Email Scanner</p>
    </div>

    <div id="authSection" style="display: none;" class="section">
      <h2>Enter Your PIN</h2>
      <p class="hint">Find it in CB51 Settings</p>
      <input type="password" id="pinInput" placeholder="0000" maxlength="4" inputmode="numeric" />
      <p id="attemptsLeft" class="error-text" style="display: none;"></p>
      <p id="errorMsg" class="error-text"></p>
      <button id="savePinBtn" class="btn">Authenticate</button>
      <p class="hint-small">4-digit PIN from your dashboard</p>
    </div>

    <div id="statusSection" style="display: none;" class="section">
      <div class="status active">
        <div class="status-dot"></div>
        <div>
          <p class="status-title">Scanner Active</p>
          <p class="status-hint" id="activeArtist">Ready to scan</p>
        </div>
      </div>

      <div class="stats">
        <div class="stat">
          <div class="stat-number" id="scannedCount">0</div>
          <div class="stat-label">Scanned Today</div>
        </div>
        <div class="stat">
          <div class="stat-number" id="successCount">0</div>
          <div class="stat-label">Added to CB51</div>
        </div>
      </div>

      <button id="goToCB51" class="btn btn-primary">Open CB51 Dashboard</button>
      <button id="disconnect" class="btn btn-secondary">Disconnect</button>
    </div>

    <div class="footer">
      <p>Built with ♾️❤️</p>
    </div>
  </div>

  <script src="popup.js"></script>
</body>
</html>`,
        type: 'text/html'
      },

      'popup.js': {
        content: `/**
 * CB51 POPUP LOGIC
 */

const authTokenInput = document.getElementById('authToken');
const artistIdInput = document.getElementById('artistId');
const saveAuthBtn = document.getElementById('saveAuth');
const disconnectBtn = document.getElementById('disconnect');
const goToCB51Btn = document.getElementById('goToCB51');
const authSection = document.getElementById('authSection');
const statusSection = document.getElementById('statusSection');

// Load saved auth
chrome.storage.local.get(['authToken', 'artistId'], (result) => {
  if (result.authToken && result.artistId) {
    showStatus(result.artistId);
    updateStats();
  } else {
    showAuth();
  }
});

function showAuth() {
  authSection.style.display = 'block';
  statusSection.style.display = 'none';
}

function showStatus(artistId) {
  authSection.style.display = 'none';
  statusSection.style.display = 'block';
  document.getElementById('activeArtist').textContent = 'Artist ID: ' + artistId;
}

saveAuthBtn.addEventListener('click', () => {
  const token = authTokenInput.value.trim();
  const artistId = artistIdInput.value.trim();
  
  if (token && artistId) {
    chrome.storage.local.set({ authToken: token, artistId: artistId }, () => {
      showStatus(artistId);
      updateStats();
    });
  }
});

disconnectBtn.addEventListener('click', () => {
  if (confirm('Disconnect from CB51?')) {
    chrome.storage.local.remove(['authToken', 'artistId'], () => {
      showAuth();
      authTokenInput.value = '';
      artistIdInput.value = '';
    });
  }
});

goToCB51Btn.addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://cb51.com' });
});

function updateStats() {
  chrome.storage.local.get(['scanHistory'], (data) => {
    const history = data.scanHistory || [];
    const today = new Date().toDateString();
    
    const todayScans = history.filter(h => {
      const hDate = new Date(h.timestamp).toDateString();
      return hDate === today;
    });
    
    const successCount = todayScans.filter(h => h.success).length;
    
    document.getElementById('scannedCount').textContent = todayScans.length;
    document.getElementById('successCount').textContent = successCount;
  });
}
`,
        type: 'text/javascript'
      },

      'popup.css': {
        content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #0a0a0a;
  color: #fff;
  width: 320px;
  min-height: 400px;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.header h1 {
  font-size: 28px;
  font-weight: 900;
  color: #06b6d4;
  font-family: monospace;
}

.header .subtitle {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  font-family: monospace;
}

.section {
  flex: 1;
}

.status {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  padding: 12px;
  background: #111;
  border: 1px solid #06b6d4;
  border-radius: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  margin-top: 4px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-title {
  font-weight: 600;
  font-size: 14px;
}

.status-hint {
  font-size: 12px;
  color: #06b6d4;
  margin-top: 2px;
}

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.stat {
  background: #111;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}

.stat-number {
  font-size: 24px;
  font-weight: 900;
  color: #06b6d4;
}

.stat-label {
  font-size: 11px;
  color: #666;
  margin-top: 4px;
  text-transform: uppercase;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background: #111;
  border: 1px solid #333;
  border-radius: 6px;
  color: #fff;
  font-size: 13px;
}

input:focus {
  outline: none;
  border-color: #06b6d4;
}

.btn {
  width: 100%;
  padding: 12px;
  margin-bottom: 8px;
  background: #06b6d4;
  color: #000;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  background: #0891b2;
}

.btn-primary {
  background: #06b6d4;
  color: #000;
}

.btn-secondary {
  background: #333;
  color: #fff;
}

.btn-secondary:hover {
  background: #444;
}

.hint {
  font-size: 11px;
  color: #666;
  text-align: center;
}

.hint-small {
  font-size: 10px;
  color: #666;
  text-align: center;
  margin-top: 8px;
}

.error-text {
  color: #ef4444;
  font-size: 12px;
  text-align: center;
  margin-bottom: 8px;
}

.footer {
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid #222;
  font-size: 11px;
  color: #666;
}
`,
        type: 'text/css'
      }
    };

    const fileData = files[file];
    if (!fileData) {
      return Response.json({ error: 'File not found' }, { status: 404 });
    }

    return new Response(fileData.content, {
      headers: {
        'Content-Type': fileData.type,
        'Content-Disposition': `attachment; filename="${file}"`
      }
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});