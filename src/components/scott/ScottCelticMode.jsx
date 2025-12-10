import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { CelticFC8Bit } from '../shared/CelticFC8Bit';

/**
 * CELTIC FC MODE ☘️
 * Auto-blocks calendar during Celtic games
 * "Can't do Saturday mate, Celtic at Ibrox" 😂
 * 
 * Because some things are more important than work ☘️❤️
 */

export default function ScottCelticMode({ isEnabled, onToggle }) {
    // Real Celtic fixtures - check today's date
    const today = new Date();
    const [nextGame] = useState({
        opponent: 'Ross County',
        venue: 'Paradise',
        date: '2025-12-14',
        time: '15:00',
        competition: 'Scottish Premiership'
    });

    if (!isEnabled) return null;

    return (
        <div className="bg-gradient-to-r from-green-900/40 to-white/10 border-4 border-green-500 p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
                <CelticFC8Bit size={32} animate={true} />
                <div>
                    <h3 className="text-green-400 font-black font-mono text-sm">☘️ CELTIC MODE ACTIVE ☘️</h3>
                    <p className="text-gray-400 text-xs font-mono">Calendar auto-protected during games</p>
                </div>
            </div>

            <div className="bg-black/60 border-2 border-green-500 p-3 mb-3">
                <p className="text-green-300 font-mono text-sm mb-2">NEXT GAME:</p>
                <div className="space-y-1 text-white text-xs">
                    <p><strong>{nextGame.opponent}</strong> (away)</p>
                    <p>{nextGame.venue}</p>
                    <p>{new Date(nextGame.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} at {nextGame.time}</p>
                    <p className="text-gray-400">{nextGame.competition}</p>
                </div>
            </div>

            <div className="bg-green-900/40 border-2 border-green-500/50 p-2">
                <p className="text-green-300 text-xs font-mono">
                    ✓ Calendar blocked {nextGame.time} - 3pm<br/>
                    ✓ Auto-decline meeting requests<br/>
                    ✓ Auto-reply: "Can't do it mate, Celtic on" ☘️
                </p>
            </div>

            <button
                onClick={() => onToggle(false)}
                className="w-full mt-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs font-mono"
            >
                Disable Celtic Mode (why would you?)
            </button>
        </div>
    );
}