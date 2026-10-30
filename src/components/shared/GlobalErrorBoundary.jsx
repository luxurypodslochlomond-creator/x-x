import React from 'react';
import { RefreshCw, WifiOff, Heart, Zap, Shield, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false, 
            error: null,
            errorInfo: null,
            isNetworkError: false
        };
        this.healingCheckInterval = null;
    }

    componentWillUnmount() {
        // nothing to clean up
    }

    static getDerivedStateFromError(error) {
        const errorMsg = error?.message?.toLowerCase() || '';
        const isNetworkError = 
            !navigator.onLine ||
            errorMsg.includes('network') ||
            errorMsg.includes('failed to fetch') ||
            errorMsg.includes('load failed') ||
            errorMsg.includes('network request failed') ||
            error?.code === 'ECONNREFUSED' ||
            error?.code === 'ETIMEDOUT' ||
            error?.name === 'NetworkError' ||
            error?.name === 'TypeError';

        return { 
            hasError: true,
            isNetworkError 
        };
    }

    componentDidCatch(error, errorInfo) {
        if (window.__uf51IsModuleLoadError?.(error) && window.__uf51RecoverBuild?.()) return;
        const errorMsg = error?.message?.toLowerCase() || '';
        const isNetworkError = 
            !navigator.onLine ||
            errorMsg.includes('network') ||
            errorMsg.includes('failed to fetch') ||
            errorMsg.includes('load failed') ||
            errorMsg.includes('network request failed');

        if (!isNetworkError) {
            console.error('App Error:', error, errorInfo);
            
            // Trigger autonomous healing
            window.dispatchEvent(new CustomEvent('report-error', {
                detail: {
                    error: error.toString(),
                    stack: error.stack,
                    componentStack: errorInfo.componentStack,
                    page: window.location.pathname
                }
            }));
        }

        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    handleReset = () => {
        if (this.healingCheckInterval) {
            clearInterval(this.healingCheckInterval);
        }
        this.setState({ 
            hasError: false, 
            error: null, 
            errorInfo: null,
            isNetworkError: false 
        });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            // Detect CB51 context
            const isCB51 = window.location.hostname.startsWith('cb51.') || 
                           window.location.pathname.startsWith('/CB51') ||
                           window.location.pathname.startsWith('/Scott');
            
            // NETWORK ERROR - 8-BIT QUANTUM
            if (this.state.isNetworkError || !navigator.onLine) {
                return (
                    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
                        
                        {/* 8-BIT GRID */}
                        <div className="absolute inset-0 opacity-10">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-full h-px bg-cyan-500"
                                    style={{ top: `${i * 5}%` }}
                                />
                            ))}
                        </div>

                        <div className="max-w-md w-full space-y-6 relative z-10">
                            
                            <div className="bg-black border-4 border-cyan-500 p-8 space-y-6 relative">
                                
                                {/* 8-BIT CORNERS */}
                                <div className="absolute top-0 left-0 w-4 h-4 bg-cyan-500" />
                                <div className="absolute top-0 right-0 w-4 h-4 bg-cyan-500" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 bg-cyan-500" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 bg-cyan-500" />

                                <motion.div
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="flex justify-center"
                                >
                                    {isCB51 ? (
                                        <Radio className="w-20 h-20 text-cyan-400" />
                                    ) : (
                                        <WifiOff className="w-20 h-20 text-cyan-400" />
                                    )}
                                </motion.div>

                                <div className="text-center space-y-3">
                                    <h1 className="text-4xl font-black font-mono text-cyan-400">
                                        {isCB51 ? 'CONNECTION LOST' : 'FREQUENCY PAUSED'}
                                    </h1>
                                    <p className="text-white text-base font-mono">
                                        {isCB51 ? 'CB51 offline. Data preserved.' : 'Quantum link offline. State preserved.'}
                                    </p>
                                </div>

                                {!navigator.onLine && (
                                    <div className="bg-cyan-900/30 border-2 border-cyan-500/50 p-3 font-mono text-sm text-cyan-300">
                                        Device offline • Reconnect to heal
                                    </div>
                                )}

                                <div className="bg-black border-2 border-cyan-500/30 p-4 space-y-3 font-mono text-sm">
                                    <div className="flex items-start gap-3 text-cyan-300">
                                        <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <p>Data safe (nothing lost)</p>
                                    </div>
                                    <div className="flex items-start gap-3 text-cyan-300">
                                        <Zap className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <p>Reload fixes instantly</p>
                                    </div>
                                    <div className="flex items-start gap-3 text-cyan-300">
                                        <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <p>Still stuck? Debugging real-time</p>
                                    </div>
                                </div>

                                <button
                                    onClick={this.handleReset}
                                    className="w-full bg-cyan-600 hover:bg-cyan-500 border-4 border-cyan-400 text-black py-4 font-black font-mono text-lg transition-all flex items-center justify-center gap-3"
                                >
                                    <RefreshCw className="w-6 h-6" />
                                    RELOAD & HEAL
                                </button>

                                <p className="text-center text-xs text-cyan-500 font-mono">
                                    QUANTUM AUTO-RETRY ACTIVE
                                </p>

                            </div>
                        </div>
                    </div>
                );
            }

            // GENERAL ERROR — calm, quiet, warm
            return (
                <div className="min-h-screen flex items-center justify-center p-6"
                    style={{ background: '#f7f5f0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>
                    <div className="max-w-sm w-full text-center space-y-6">
                        <p className="text-5xl">🤍</p>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-neutral-800 leading-snug">
                                Something didn't load
                            </h1>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Your work is safe — nothing's lost. This is just a hiccup on this page.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 pt-2">
                            <button
                                onClick={this.handleReset}
                                className="w-full bg-neutral-900 hover:bg-neutral-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Try again
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full text-neutral-500 hover:text-neutral-800 py-2 font-medium text-sm transition-colors"
                            >
                                Go home
                            </button>
                        </div>
                        <p className="text-xs text-neutral-400 pt-2">♾️❤️</p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;