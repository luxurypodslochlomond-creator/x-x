import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function CB51Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        base44.auth.redirectToLogin(window.location.origin + createPageUrl('CB51Login'));
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <Radio className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                    <h1 className="text-4xl font-black text-white font-mono mb-2">CB51</h1>
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-4 rounded-lg text-lg font-mono"
                >
                    LOGIN
                </button>
            </div>
        </div>
    );
}