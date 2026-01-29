import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ScottTeamAccess() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <h1 className="text-3xl font-black text-white font-mono mb-4">TEAM ACCESS</h1>
            <div className="text-center py-8 text-gray-600 font-mono">Team access coming soon</div>
        </div>
    );
}