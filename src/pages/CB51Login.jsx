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

    useEffect(() => {
        document.title = 'CB51 • Login';
        
        // Check if already logged in
        const checkAuth = async () => {
            try {
                const user = await base44.auth.me();
                if (user) {
                    // Already logged in, go to CB51
                    navigate(createPageUrl('CB51'));
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
        // Redirect to login, then back to CB51
        base44.auth.redirectToLogin(window.location.origin + createPageUrl('CB51'));
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
                        <Lock className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                        <h2 className="text-white font-black text-xl font-mono mb-2">Login Required</h2>
                        <p className="text-gray-400 text-sm font-mono">
                            Sign in to access your artist management hub
                        </p>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-4 rounded-lg text-lg font-mono transition-all flex items-center justify-center gap-2"
                        style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
                    >
                        Login to CB51
                        <ArrowRight className="w-5 h-5" />
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