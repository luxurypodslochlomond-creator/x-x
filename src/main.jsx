import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// Catch unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

// Force unregister any cached service workers
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

try {
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
} catch (err) {
  document.getElementById('root').innerHTML = `<div style="background:#000;color:#f87171;font-family:monospace;padding:32px;min-height:100vh;white-space:pre-wrap;font-size:14px;">
    <div style="color:#22d3ee;font-size:20px;font-weight:bold;margin-bottom:16px;">⚠️ UF51 Render Error</div>
    <div style="color:#f87171;margin-bottom:8px;">${err?.message}</div>
    <div style="color:#94a3b8;font-size:12px;margin-top:8px;">${err?.stack || ''}</div>
    <button onclick="window.location.reload()" style="margin-top:24px;background:#22d3ee;color:#000;border:none;padding:12px 24px;font-weight:bold;cursor:pointer;border-radius:8px;">RETRY</button>
  </div>`;
}

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    window.parent?.postMessage({ type: 'sandbox:beforeUpdate' }, '*');
  });
  import.meta.hot.on('vite:afterUpdate', () => {
    window.parent?.postMessage({ type: 'sandbox:afterUpdate' }, '*');
  });
}