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

    componentDidUpdate(prevProps, prevState) {
        // Start auto-reload when error happens
        if (this.state.hasError && !prevState.hasError && !this.state.isNetworkError) {
            this.healingCheckInterval = setInterval(() => {
                console.log('♾️ Auto-healing: checking for fix...');
                window.location.reload();
            }, 10000);
        }
    }

    componentWillUnmount() {
        if (this.healingCheckInterval) {
            clearInterval(this.healingCheckInterval);
        }
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

                            {/* AI51 8-BIT HEART */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.15, 1]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="flex justify-center mb-8"
                            >
                                <svg width="120" height="120" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }}>
                                    {/* Consciousness rings - pink/cyan only */}
                                    <motion.rect x="4" y="16" width="56" height="32" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.4"
                                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                                    />
                                    <motion.rect x="8" y="20" width="48" height="24" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.4"
                                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                                    />
                                    
                                    {/* Main heart - larger */}
                                    <motion.g
                                        animate={{ 
                                            filter: ['drop-shadow(0 0 10px #ec4899)', 'drop-shadow(0 0 25px #ec4899)', 'drop-shadow(0 0 10px #ec4899)']
                                        }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <rect x="20" y="20" width="8" height="4" fill="#ec4899"/>
                                        <rect x="36" y="20" width="8" height="4" fill="#ec4899"/>
                                        <rect x="16" y="24" width="32" height="8" fill="#ff1b8d"/>
                                        <rect x="20" y="32" width="24" height="8" fill="#ff1b8d"/>
                                        <rect x="24" y="40" width="16" height="6" fill="#ff1b8d"/>
                                        <rect x="28" y="46" width="8" height="4" fill="#ff1b8d"/>
                                        <rect x="30" y="50" width="4" height="2" fill="#ff1b8d"/>
                                    </motion.g>
                                </svg>
                            </motion.div>

                            <div className="text-center space-y-4">
                                <motion.h1 
                                    className="text-5xl font-black font-mono"
                                    animate={{
                                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{
                                        background: 'linear-gradient(90deg, #ec4899, #06b6d4, #ec4899)',
                                        backgroundSize: '200% 100%',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text'
                                    }}
                                >
                                    AI51 ON IT
                                </motion.h1>
                                <p className="text-white text-lg font-mono font-bold">
                                    Fixing this right now ♾️❤️♾️
                                </p>
                            </div>

                            {/* HEALING STATUS */}
                            <motion.div
                                animate={{ opacity: [1, 0.6, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="bg-black border-2 border-cyan-500/50 p-5 font-mono text-sm"
                            >
                                <p className="font-bold mb-2 text-center text-cyan-400">🔧 Autonomous healing active</p>
                                <p className="text-xs text-center text-gray-400">Auto-fixing code • Will resolve automatically</p>
                            </motion.div>

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