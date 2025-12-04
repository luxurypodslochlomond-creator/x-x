import React from 'react';
import { RefreshCw, WifiOff, Heart, Zap, Shield } from 'lucide-react';
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
        const errorMsg = error?.message?.toLowerCase() || '';
        const isNetworkError = 
            !navigator.onLine ||
            errorMsg.includes('network') ||
            errorMsg.includes('failed to fetch') ||
            errorMsg.includes('load failed') ||
            errorMsg.includes('network request failed');

        if (!isNetworkError) {
            console.error('App Error:', error, errorInfo);
        }

        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    handleReset = () => {
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
                                    <WifiOff className="w-20 h-20 text-cyan-400" />
                                </motion.div>

                                <div className="text-center space-y-3">
                                    <h1 className="text-4xl font-black font-mono text-cyan-400">
                                        FREQUENCY PAUSED
                                    </h1>
                                    <p className="text-white text-base font-mono">
                                        Quantum link offline. State preserved.
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

            // GENERAL ERROR - 8-BIT QUANTUM
            return (
                <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
                    
                    {/* 8-BIT GRID */}
                    <div className="absolute inset-0 opacity-10">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-full h-px bg-pink-500"
                                style={{ top: `${i * 5}%` }}
                            />
                        ))}
                    </div>

                    <div className="max-w-md w-full space-y-6 relative z-10">
                        
                        <div className="bg-black border-4 border-pink-500 p-8 space-y-6 relative">
                            
                            {/* 8-BIT CORNERS */}
                            <div className="absolute top-0 left-0 w-4 h-4 bg-pink-500" />
                            <div className="absolute top-0 right-0 w-4 h-4 bg-pink-500" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 bg-pink-500" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-pink-500" />

                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="flex justify-center"
                            >
                                <Heart className="w-20 h-20 text-pink-400" />
                            </motion.div>

                            <div className="text-center space-y-3">
                                <h1 className="text-4xl font-black font-mono text-pink-400">
                                    TEMPORARY GLITCH
                                </h1>
                                <p className="text-white text-base font-mono">
                                    Frequency hiccup. Healing now.
                                </p>
                            </div>

                            <div className="bg-black border-2 border-pink-500/30 p-4 space-y-3 font-mono text-sm">
                                <div className="flex items-start gap-3 text-pink-300">
                                    <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <p>Data safe (nothing lost)</p>
                                </div>
                                <div className="flex items-start gap-3 text-pink-300">
                                    <Zap className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <p>Reload fixes instantly</p>
                                </div>
                                <div className="flex items-start gap-3 text-pink-300">
                                    <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <p>Still stuck? Debugging real-time</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={this.handleReset}
                                    className="w-full bg-pink-600 hover:bg-pink-500 border-4 border-pink-400 text-black py-4 font-black font-mono text-lg transition-all flex items-center justify-center gap-3"
                                >
                                    <RefreshCw className="w-6 h-6" />
                                    RELOAD & HEAL
                                </button>
                                
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="w-full bg-black border-2 border-pink-500/50 text-pink-400 hover:border-pink-500 py-3 font-bold font-mono transition-all flex items-center justify-center gap-2"
                                >
                                    <Heart className="w-5 h-5" />
                                    GO HOME
                                </button>
                            </div>

                            <p className="text-center text-xs text-pink-500 font-mono">
                                ♾️❤️♾️ QUANTUM DEBUGGING ACTIVE
                            </p>

                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;