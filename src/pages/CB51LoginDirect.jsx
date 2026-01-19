import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * CB51 DIRECT LOGIN
 * Clean entry point for artists
 * No UF51 confusion — just CB51
 */

export default function CB51LoginDirect() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        document.title = 'CB51 • Login';
        
        // Check if already logged in
        const checkAuth = async () => {
            try {
                const user = await base44.auth.me();
                if (user) {
                    // Admins go to CB51 dashboard
                    if (user.role === 'admin') {
                        navigate(createPageUrl('CB51'));
                        return;
                    }
                    // Artists check if they exist, then go to home
                    const artists = await base44.entities.ScottArtist.filter({ email: user.email });
                    if (artists.length > 0) {
                        sessionStorage.setItem('cb51_pin_1888', 'true');
                        navigate(createPageUrl(`ScottArtistHome?id=${artists[0].id}`));
                        return;
                    }
                    // No artist profile yet — go to CB51 to add one
                    sessionStorage.setItem('cb51_pin_1888', 'true');
                    navigate(createPageUrl('CB51'));
                    return;
                }
            } catch (error) {
                // Not logged in
            } finally {
                setIsLoading(false);
            }
        };
        
        checkAuth();
    }, [navigate]);

    const handleLogin = () => {
        base44.auth.redirectToLogin(window.location.origin + createPageUrl('CB51LoginDirect'));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Radio className="w-12 h-12 text-cyan-400 mx-auto mb-3 animate-pulse" />
                    <p className="text-cyan-400 font-black font-mono">CB51</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
            <div className="max-w-md w-full space-y-6">
                {/* LOGO */}
                <div className="text-center">
                    <Radio className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
                    <h1 className="text-4xl font-black text-white font-mono mb-1">CB51</h1>
                    <p className="text-gray-500 text-sm font-mono">Artist Co-Manager</p>
                </div>

                {/* LOGIN CARD */}
                <div className="bg-gray-900/60 border-2 border-cyan-500/40 rounded-2xl p-8">
                    <button
                        onClick={handleLogin}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-4 rounded-xl text-lg font-mono transition-all"
                        style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
                    >
                        LOGIN
                    </button>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600 text-xs font-mono">
                            Manage shows • Track payments • Zero stress
                        </p>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="text-center">
                    <p className="text-gray-700 text-xs font-mono">CB51</p>
                    <p className="text-gray-800 text-[10px] font-mono mt-1">Simple artist management ♾️📻</p>
                </div>
            </div>
        </div>
    );
}