import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Radio, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * CB51 LOGIN PAGE
 * Simple email/password login
 * Manager → Admin Home (artist list)
 * Artist → Their Artist Home (4 boxes)
 */

export default function ScottLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Check if already logged in
    useEffect(() => {
        base44.auth.me().then(user => {
            if (user) {
                // If user has role, check if manager or artist
                if (user.role === 'admin') {
                    navigate(createPageUrl('ScottManager'));
                } else {
                    // Check if they're linked to an artist
                    base44.entities.ScottArtist.filter({ email: user.email }).then(artists => {
                        if (artists.length > 0) {
                            navigate(createPageUrl(`ScottArtistHome?id=${artists[0].id}`));
                        } else {
                            navigate(createPageUrl('ScottManager'));
                        }
                    });
                }
            }
        }).catch(() => {});
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await base44.auth.redirectToLogin(window.location.href);
        } catch (err) {
            setError('Login failed - check email/password');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                
                {/* HEADER */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Radio className="w-12 h-12 text-cyan-400" />
                        <h1 className="text-4xl font-black text-cyan-400 font-mono">CB51</h1>
                    </div>
                    <p className="text-gray-500 text-sm font-mono">Music Manager Tool</p>
                </div>

                {/* LOGIN FORM */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500 rounded-xl p-6">
                        
                        <h2 className="text-cyan-400 font-black text-xl font-mono mb-6 text-center">LOGIN</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-gray-400 text-xs mb-2 block font-mono">EMAIL</label>
                                <Input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-black border-2 border-gray-700 text-white h-12 text-lg"
                                    style={{ fontFamily: 'monospace' }}
                                    placeholder="your@email.com"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="text-gray-400 text-xs mb-2 block font-mono">PASSWORD</label>
                                <Input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-black border-2 border-gray-700 text-white h-12 text-lg"
                                    style={{ fontFamily: 'monospace' }}
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                            </div>

                            {error && (
                                <div className="bg-red-900/20 border border-red-500 rounded-lg p-3">
                                    <p className="text-red-400 text-sm font-mono">{error}</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black h-14 text-xl"
                                style={{ fontFamily: 'monospace' }}
                            >
                                {loading ? (
                                    <><Loader2 className="w-5 h-5 animate-spin mr-2" /> LOGGING IN...</>
                                ) : (
                                    'LOGIN'
                                )}
                            </Button>
                        </div>
                    </div>
                </form>

                {/* FOOTER */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600 text-xs font-mono">Simple as fuck ♾️📻♾️</p>
                </div>
            </div>
        </div>
    );
}