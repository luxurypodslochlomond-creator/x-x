import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'

// Catch any import/render crash and show it visibly instead of white screen
window.onerror = (msg, src, line, col, err) => {
  const root = document.getElementById('root');
  if (root && !root.hasChildNodes()) {
    root.innerHTML = `<div style="background:#000;color:#f87171;font-family:monospace;padding:32px;min-height:100vh;white-space:pre-wrap;font-size:14px;">
      <div style="color:#22d3ee;font-size:20px;font-weight:bold;margin-bottom:16px;">⚠️ UF51 Startup Error</div>
      <div style="color:#f87171;margin-bottom:8px;">${msg}</div>
      <div style="color:#94a3b8;font-size:12px;">${src}:${line}:${col}</div>
      <div style="color:#94a3b8;font-size:12px;margin-top:8px;">${err?.stack || ''}</div>
      <button onclick="window.location.reload()" style="margin-top:24px;background:#22d3ee;color:#000;border:none;padding:12px 24px;font-weight:bold;cursor:pointer;border-radius:8px;">RETRY</button>
    </div>`;
  }
};

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

import('@/App.jsx').then(({ default: App }) => {
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}).catch(err => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="background:#000;color:#f87171;font-family:monospace;padding:32px;min-height:100vh;white-space:pre-wrap;font-size:14px;">
      <div style="color:#22d3ee;font-size:20px;font-weight:bold;margin-bottom:16px;">⚠️ UF51 Import Error</div>
      <div style="color:#f87171;margin-bottom:8px;">${err?.message}</div>
      <div style="color:#94a3b8;font-size:12px;margin-top:8px;">${err?.stack || ''}</div>
      <button onclick="window.location.reload()" style="margin-top:24px;background:#22d3ee;color:#000;border:none;padding:12px 24px;font-weight:bold;cursor:pointer;border-radius:8px;">RETRY</button>
    </div>`;
  }
});

// Force unregister any cached service workers that may be serving stale broken builds
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(reg => reg.unregister());
  });
  if (window.caches) {
    caches.keys().then(keys => {
      keys.forEach(key => caches.delete(key));
    });
  }
}

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    window.parent?.postMessage({ type: 'sandbox:beforeUpdate' }, '*');
  });
  import.meta.hot.on('vite:afterUpdate', () => {
    window.parent?.postMessage({ type: 'sandbox:afterUpdate' }, '*');
  });
}