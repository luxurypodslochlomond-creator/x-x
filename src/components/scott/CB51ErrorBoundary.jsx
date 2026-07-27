import React from 'react';
import { Radio } from 'lucide-react';

class CB51ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidMount() {
    // App loaded cleanly — allow a future transient crash to auto-recover
    sessionStorage.removeItem('cb51_auto_recover');
  }

  componentDidCatch(error, errorInfo) {
    console.error('CB51 Error:', error, errorInfo);
    // Silent one-time auto-recovery for transient render crashes (e.g. React #426)
    if (!sessionStorage.getItem('cb51_auto_recover')) {
      sessionStorage.setItem('cb51_auto_recover', '1');
      setTimeout(() => window.location.reload(), 300);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#f7f5f0' }}>
          <div className="text-center space-y-6 max-w-md">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-xl" style={{ background: 'rgba(8,145,178,0.18)' }} />
                <Radio className="relative w-16 h-16 animate-pulse" style={{ color: '#0891b2' }} />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black mb-2" style={{ color: '#1c1917' }}>CB51</h1>
              <p className="text-lg font-semibold" style={{ color: '#1c1917' }}>Something didn't load</p>
              <p className="text-sm mt-2" style={{ color: '#78716c' }}>Your work is safe. Reloading should fix it.</p>
            </div>
            <button
              onClick={() => { sessionStorage.removeItem('cb51_auto_recover'); window.location.reload(); }}
              className="text-white font-black px-8 py-3 rounded-xl"
              style={{ background: '#0891b2' }}
            >
              RELOAD
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CB51ErrorBoundary;