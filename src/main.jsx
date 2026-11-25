import React from 'react'
import preloadEntry from '@/lib/preloadEntry'
import '@/index.css'
// The climate record's palette, retinted in the ocean key. Loaded after the
// utilities so it wins, and scoped to .climate-record so nothing else moves.
import '@/climate-palette.css'

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, refreshing: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('Root error:', error, info);
    // A file that could not be fetched is not a broken app — pick the page up again.
    if (isModuleLoadError(error)) this.setState({ refreshing: reloadForNewBuild() });
  }
  render() {
    if (this.state.hasError) {
      // The page is already picking itself up: show calm, not a dead end.
      if (this.state.refreshing) {
        return (
          <div style={{ minHeight: '100vh', background: '#000', color: '#06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', letterSpacing: '0.3em', fontSize: '12px' }}>
            LOADING · x = x
          </div>
        );
      }
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

// The recovery handler is installed in the HTML before any module downloads.
// Share its guarded, cache-busting navigation instead of maintaining a second retry.
const reloadForNewBuild = () => window.__uf51RecoverBuild?.() || false;

// A piece of the app that could not be fetched. Every browser says it in its own words,
// and none of them mean the app is broken: the file simply was not there at that moment
// (a new build landed over the page, or the connection blinked). It must never leave a
// reader on a dead screen.
const MODULE_LOAD_MESSAGES = [
  'Importing a module script failed',
  'Failed to fetch dynamically imported module',
  'error loading dynamically imported module',
  'Outdated Optimize Dep',
];
const isModuleLoadError = (error) =>
  MODULE_LOAD_MESSAGES.some((m) => `${error?.name || ''} ${error?.message || ''}`.includes(m));

// Start this address's page and frame while the larger router is downloading.
// Previously no route import could start until ReactDOM and the entire router ran.
preloadEntry(window.location.pathname);

Promise.all([import('react-dom/client'), import('@/App.jsx')]).then(([ReactDOM, { default: App }]) => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  );
}).catch((e) => {
  if (isModuleLoadError(e) && reloadForNewBuild()) return;
  console.error('Mount failed:', e);
  const root = document.getElementById('root');
  root.innerHTML = '';
  const message = document.createElement('div');
  message.style.cssText = 'min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;padding:24px;text-align:center;background:rgb(var(--record-paper));color:rgb(var(--record-ink));font-family:var(--font-body)';
  const heading = document.createElement('h1');
  heading.textContent = 'The page could not open.';
  const detail = document.createElement('p');
  detail.textContent = e.message;
  const retry = document.createElement('button');
  retry.textContent = 'Try again';
  retry.onclick = () => window.__uf51RecoverBuild?.(true) || window.location.reload();
  message.append(heading, detail, retry);
  root.appendChild(message);
});

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    window.parent?.postMessage({ type: 'sandbox:beforeUpdate' }, '*');
  });
  import.meta.hot.on('vite:afterUpdate', () => {
    window.parent?.postMessage({ type: 'sandbox:afterUpdate' }, '*');
  });
}