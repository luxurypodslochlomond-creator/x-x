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

  componentDidCatch(error, errorInfo) {
    console.error('CB51 Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
          <div className="text-center space-y-6 max-w-md">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl" />
                <Radio className="relative w-20 h-20 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-cyan-400 text-3xl font-black mb-2">CB51</h1>
              <p className="text-white text-lg font-semibold">Something went wrong</p>
              <p className="text-gray-500 text-sm mt-2">Reloading should fix it</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-black px-8 py-3 rounded-lg"
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