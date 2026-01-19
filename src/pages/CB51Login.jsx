import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, ArrowRight, Lock } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * CB51 LOGIN GATE
 * Simple login page for CB51 - shows when Scott logged out
 * Redirects to CB51 after login
 */

export default function CB51Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(true);
    const [showPinGate, setShowPinGate] = React.useState(false);
    const [pin, setPin] = React.useState('');
    const [pinError, setPinError] = React.useState(false);

    useEffect(() => {
        document.title = 'CB51 • Login';
        
        // Check if already logged in
        const checkAuth = async () => {
            try {
                const user = await base44.auth.me();
                if (user) {
                    // Admins skip PIN
                    if (user.role === 'admin') {
                        navigate(createPageUrl('CB51'));
                        return;
                    }
                    // Artists need PIN
                    const pinEntered = sessionStorage.getItem('cb51_pin_1888');
                    if (pinEntered === 'true') {
                        navigate(createPageUrl('CB51'));
                    } else {
                        setShowPinGate(true);
                    }
                }
            } catch (error) {
                // Not logged in, show login page
            } finally {
                setIsLoading(false);
            }
        };
        
        checkAuth();
    }, [navigate]);

    const handleLogin = () => {
        // Redirect to login, then back to CB51Login
        base44.auth.redirectToLogin(window.location.origin + createPageUrl('CB51Login'));
    };

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pin === '1888') {
            sessionStorage.setItem('cb51_pin_1888', 'true');
            navigate(createPageUrl('CB51'));
        } else {
            setPinError(true);
            setPin('');
            setTimeout(() => setPinError(false), 2000);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                    <p className="text-gray-500 font-mono">Loading...</p>
                </div>
            </div>
        );
    }

    // PIN GATE (for logged-in artists)
    if (showPinGate) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <Radio className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                        <h1 className="text-4xl font-black text-white font-mono mb-2">CB51</h1>
                        <p className="text-gray-500 text-sm font-mono">Enter PIN</p>
                    </div>

                    <form onSubmit={handlePinSubmit} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={4}
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="••••"
                                autoFocus
                                className={`w-full bg-gray-900/60 border-2 ${pinError ? 'border-red-500' : 'border-cyan-500/30'} rounded-xl px-6 py-4 text-center text-3xl font-mono tracking-[0.5em] text-white placeholder-gray-700 focus:outline-none focus:border-cyan-500 transition-all`}
                            />
                            {pinError && (
                                <p className="text-red-400 text-xs font-mono mt-2 text-center animate-pulse">Incorrect PIN</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-4 rounded-xl text-lg font-mono uppercase tracking-wider transition-all"
                            style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
                        >
                            Enter
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600 text-xs font-mono">Security PIN prevents copying</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
            <div className="max-w-md w-full space-y-6">
                {/* LOGO */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Radio className="w-16 h-16 text-cyan-400" />
                    </div>
                    <h1 className="text-4xl font-black text-white font-mono mb-2">CB51</h1>
                    <p className="text-gray-500 text-sm font-mono">Artist Co-Manager</p>
                </div>

                {/* LOGIN CARD */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-8">
                    <div className="text-center mb-6">
                        <Radio className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                        <h2 className="text-white font-black text-xl font-mono mb-2">CB51</h2>
                        <p className="text-gray-400 text-sm font-mono">
                            Artist co-manager
                        </p>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-4 rounded-lg text-lg font-mono transition-all"
                        style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
                    >
                        Login
                    </button>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600 text-xs font-mono">
                            Offline-ready • P2P sync • Zero stress
                        </p>
                    </div>
                </div>

                {/* INFO */}
                <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
                    <p className="text-white text-sm font-mono mb-3 font-bold">What you'll get:</p>
                    <div className="space-y-2 text-xs font-mono">
                        <p className="text-gray-400">✓ Live gigs, sessions, calendar</p>
                        <p className="text-gray-400">✓ Finance, contracts, visas</p>
                        <p className="text-gray-400">✓ AI email parsing</p>
                        <p className="text-gray-400">✓ Works offline</p>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="text-center">
                    <p className="text-gray-700 text-xs font-mono">CB51 • UniversalFamily51</p>
                    <p className="text-gray-800 text-[10px] font-mono mt-1">Zero stress management ♾️📻♾️</p>
                </div>
            </div>
        </div>
    );
}