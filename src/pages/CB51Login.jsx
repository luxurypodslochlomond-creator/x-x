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
            sessionStorage.setItem('cb51_pin_1888', 'true');
            navigate(createPageUrl('CB51'), { replace: true });
        } else {
            setError('Wrong PIN');
            setPinEntered('');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--cb51-bg-primary)' }}>
                <div className="text-center">
                    <Radio className="w-16 h-16 mx-auto mb-4 animate-pulse" style={{ color: 'var(--cb51-rose)' }} />
                    <p className="font-black font-mono text-xl" style={{ color: 'var(--cb51-rose)' }}>CB51</p>
                </div>
            </div>
        );
    }

    // Show PIN screen for logged-in users
    if (isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--cb51-bg-primary)' }}>
                <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <Radio className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--cb51-rose)' }} />
                        <h1 className="text-4xl font-black font-mono mb-2" style={{ color: 'var(--cb51-rose)' }}>CB51</h1>
                        <p className="font-mono text-sm" style={{ color: 'var(--cb51-calendar)' }}>Enter PIN</p>
                    </div>

                    <input
                        type="password"
                        inputMode="numeric"
                        value={pinEntered}
                        onChange={(e) => setPinEntered(e.target.value.slice(0, 4))}
                        onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                        placeholder="••••"
                        autoFocus
                        className="w-full text-white text-center text-4xl font-black py-4 rounded-lg font-mono mb-4 placeholder-gray-700"
                        style={{ backgroundColor: 'var(--cb51-bg-card)', border: '2px solid var(--cb51-rose)' }}
                    />

                    {error && <p className="text-red-400 font-mono text-sm text-center mb-4">{error}</p>}

                    <button
                        onClick={handlePinSubmit}
                        className="w-full font-black py-4 rounded-lg text-lg font-mono hover:opacity-90 transition-all text-black"
                        style={{ backgroundColor: 'var(--cb51-rose)' }}
                    >
                        ENTER
                    </button>
                </div>
            </div>
        );
    }

    // Show login button for non-logged-in users
    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--cb51-bg-primary)' }}>
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <Radio className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--cb51-rose)' }} />
                    <h1 className="text-4xl font-black font-mono mb-2" style={{ color: 'var(--cb51-rose)' }}>CB51</h1>
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full font-black py-4 rounded-lg text-lg font-mono hover:opacity-90 transition-all text-black"
                    style={{ backgroundColor: 'var(--cb51-rose)' }}
                >
                    LOGIN
                </button>
            </div>
        </div>
    );
}