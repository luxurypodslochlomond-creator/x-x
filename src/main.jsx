import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
// The climate record's palette, retinted in the ocean key. Loaded after the
// utilities so it wins, and scoped to .climate-record so nothing else moves.
import '@/climate-palette.css'

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('Root error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', fontFamily: 'monospace', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px' }}>⚡</div>
          <h1 style={{ color: '#06b6d4', fontSize: '24px', fontWeight: 900 }}>Something went wrong</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '400px' }}>{this.state.error?.message || 'Unknown error'}</p>
          <button onClick={() => window.location.reload()} style={{ background: '#06b6d4', color: '#000', border: 'none', padding: '12px 24px', fontWeight: 900, cursor: 'pointer', fontSize: '16px' }}>
            RELOAD
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// A build can land while a reader is already on the page. The file names change, the old
// pieces are gone, and the next page they open has nothing to fetch — which reads as
// "Importing a module script failed" and leaves a blank screen. Pick the page up again,
// once, quietly. At most once a minute, so a genuinely missing file can never loop.
const BUILD_RELOAD_KEY = 'uf51_build_reload';
const reloadForBuild = () => {
  let allowed = true;
  try {
    const last = Number(sessionStorage.getItem(BUILD_RELOAD_KEY) || 0);
    allowed = Date.now() - last > 60000;
    if (allowed) sessionStorage.setItem(BUILD_RELOAD_KEY, String(Date.now()));
  } catch { allowed = false; }
  if (allowed) window.location.reload();
};
window.addEventListener('vite:preloadError', reloadForBuild);

console.log('🚀 UF51 mounting...');

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  );
  console.log('✅ UF51 mounted OK');
} catch (e) {
  console.error('💥 Mount failed:', e);
  document.getElementById('root').innerHTML = `<div style="background:#000;color:#06b6d4;min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;font-family:monospace;padding:24px;text-align:center"><div style="font-size:48px">⚡</div><h1 style="font-size:24px;font-weight:900">Load failed</h1><p style="color:#94a3b8;max-width:400px;font-size:14px">${e.message}</p><button onclick="location.reload()" style="background:#06b6d4;color:#000;border:none;padding:12px 24px;font-weight:900;cursor:pointer;font-size:16px;margin-top:8px">RELOAD</button></div>`;
}

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    window.parent?.postMessage({ type: 'sandbox:beforeUpdate' }, '*');
  });
  import.meta.hot.on('vite:afterUpdate', () => {
    window.parent?.postMessage({ type: 'sandbox:afterUpdate' }, '*');
  });
}