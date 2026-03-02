import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function CB51Login() {
    const navigate = useNavigate();
    const [pinEntered, setPinEntered] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Check auth status ONCE on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await base44.auth.me();
                setIsLoggedIn(true);
            } catch {
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    const handleLogin = () => {
        base44.auth.redirectToLogin(window.location.origin + createPageUrl('CB51Login'));
    };

    const handlePinSubmit = () => {
        if (pinEntered === '1888') {
            // Use cookie - works across Safari AND PWA home screen on iOS
            const expires = new Date();
            expires.setFullYear(expires.getFullYear() + 1);
            document.cookie = `cb51_pin_verified=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
            localStorage.setItem('cb51_pin_verified', 'true');
            navigate(createPageUrl('CB51'), { replace: true });
        } else {
            setError('Wrong PIN');
            setPinEntered('');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Radio className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-cyan-400 font-black font-mono text-xl">CB51</p>
                </div>
            </div>
        );
    }

    // ALWAYS show PIN screen - Scott doesn't need a base44 account
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <Radio className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                    <h1 className="text-4xl font-black text-white font-mono mb-2">CB51</h1>
                    <p className="text-cyan-400 font-mono text-xs mb-2">CitizenBand51 : Avoid the Noise</p>
                    <p className="text-cyan-400 font-mono text-sm">Enter PIN</p>
                </div>

                <input
                    type="password"
                    inputMode="numeric"
                    value={pinEntered}
                    onChange={(e) => setPinEntered(e.target.value.slice(0, 4))}
                    onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                    placeholder="••••"
                    autoFocus
                    className="w-full bg-black border-2 border-cyan-500 text-white text-center text-4xl font-black py-4 rounded-lg font-mono mb-4 placeholder-gray-700"
                />

                {error && <p className="text-red-400 font-mono text-sm text-center mb-4">{error}</p>}

                <button
                    onClick={handlePinSubmit}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-4 rounded-lg text-lg font-mono"
                >
                    ENTER
                </button>

                {/* Admin login - hidden at bottom for app owner only */}
                <button
                    onClick={handleLogin}
                    className="w-full mt-4 text-gray-700 hover:text-gray-500 font-mono text-xs py-2 transition-colors"
                >
                    admin login
                </button>
            </div>
        </div>
    );
}