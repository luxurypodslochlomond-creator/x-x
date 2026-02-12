import React from 'react';
import { COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';
import { Radio } from 'lucide-react';

/**
 * UNIVERSAL ERROR CATCHER
 * Catches ALL errors before white screen
 * Shows friendly reload button
 */

class UniversalErrorCatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('💔 Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Detect if CB51 or UF51
      const isCB51 = window.location.hostname.startsWith('cb51.') || 
                     window.location.pathname.includes('CB51') || 
                     window.location.pathname.includes('Scott');

      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
          <div className="max-w-md text-center space-y-6">
            {isCB51 ? (
              <Radio className="w-16 h-16 text-cyan-400 mx-auto animate-pulse" />
            ) : (
              <COOLASFUCKWaves size={64} animate={true} />
            )}
            
            <div>
              <h1 className="text-2xl font-black text-cyan-400 mb-2">
                Something broke
              </h1>
              <p className="text-gray-400 text-sm mb-4">
                No data lost - just a render error
              </p>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-left">
              <p className="text-red-400 text-xs font-mono break-all">
                {this.state.error?.toString() || 'Unknown error'}
              </p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-4 rounded-lg font-mono"
            >
              RELOAD APP
            </button>

            <p className="text-gray-600 text-xs">
              Your data is safe. This was just a code bug.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default UniversalErrorCatcher;