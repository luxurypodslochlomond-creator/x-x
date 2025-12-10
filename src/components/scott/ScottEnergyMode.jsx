import React, { useState, useEffect } from 'react';
import { Battery, BatteryMedium, BatteryLow, Zap, Moon, Sun } from 'lucide-react';

/**
 * ENERGY MODE - ADHD BATTERY INDICATOR
 * Morning = high energy = handle complex stuff
 * Afternoon = medium = routine tasks
 * Evening = low = simple comms only
 * 
 * Adapts UI:
 * - High energy: Show all tasks, complex features
 * - Medium energy: Focus on urgent only
 * - Low energy: Hide everything except critical + simple actions
 * 
 * NEURODIVERGENT LIFESAVER - respect the brain's natural rhythms
 */

export default function ScottEnergyMode({ onEnergyChange }) {
    const [energyLevel, setEnergyLevel] = useState('high');
    const [autoMode, setAutoMode] = useState(true);

    useEffect(() => {
        if (autoMode) {
            // Auto-detect based on time of day
            const hour = new Date().getHours();
            let level = 'high';
            
            if (hour >= 6 && hour < 12) {
                level = 'high'; // Morning energy
            } else if (hour >= 12 && hour < 17) {
                level = 'medium'; // Afternoon
            } else {
                level = 'low'; // Evening/night
            }
            
            setEnergyLevel(level);
            onEnergyChange?.(level);
        }
    }, [autoMode]);

    const handleManualSet = (level) => {
        setAutoMode(false);
        setEnergyLevel(level);
        onEnergyChange?.(level);
    };

    const getEnergyConfig = () => {
        switch (energyLevel) {
            case 'high':
                return {
                    icon: Battery,
                    color: 'text-green-400',
                    bg: 'bg-green-900/20',
                    border: 'border-green-500',
                    label: 'HIGH ENERGY',
                    message: 'Tackle complex stuff now',
                    showAll: true
                };
            case 'medium':
                return {
                    icon: BatteryMedium,
                    color: 'text-amber-400',
                    bg: 'bg-amber-900/20',
                    border: 'border-amber-500',
                    label: 'MEDIUM ENERGY',
                    message: 'Focus on urgent tasks',
                    showAll: false
                };
            case 'low':
                return {
                    icon: BatteryLow,
                    color: 'text-red-400',
                    bg: 'bg-red-900/20',
                    border: 'border-red-500',
                    label: 'LOW ENERGY',
                    message: 'Simple stuff only',
                    showAll: false
                };
            default:
                return null;
        }
    };

    const config = getEnergyConfig();
    const Icon = config.icon;

    return (
        <div className={`${config.bg} border-2 ${config.border} p-4 mb-4`}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${config.color}`} />
                    <h3 className={`${config.color} font-black font-mono text-sm`}>
                        {config.label}
                    </h3>
                </div>
                <button
                    onClick={() => setAutoMode(!autoMode)}
                    className="text-xs text-gray-500 hover:text-gray-400"
                >
                    {autoMode ? 'AUTO' : 'MANUAL'}
                </button>
            </div>

            <p className="text-gray-400 text-xs font-mono mb-3">
                {config.message}
            </p>

            {/* MANUAL OVERRIDE */}
            {!autoMode && (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleManualSet('high')}
                        className={`flex-1 py-2 text-xs font-mono ${
                            energyLevel === 'high'
                                ? 'bg-green-600 text-white'
                                : 'bg-black/40 text-gray-400'
                        }`}
                    >
                        <Battery className="w-4 h-4 mx-auto" />
                    </button>
                    <button
                        onClick={() => handleManualSet('medium')}
                        className={`flex-1 py-2 text-xs font-mono ${
                            energyLevel === 'medium'
                                ? 'bg-amber-600 text-white'
                                : 'bg-black/40 text-gray-400'
                        }`}
                    >
                        <BatteryMedium className="w-4 h-4 mx-auto" />
                    </button>
                    <button
                        onClick={() => handleManualSet('low')}
                        className={`flex-1 py-2 text-xs font-mono ${
                            energyLevel === 'low'
                                ? 'bg-red-600 text-white'
                                : 'bg-black/40 text-gray-400'
                        }`}
                    >
                        <BatteryLow className="w-4 h-4 mx-auto" />
                    </button>
                </div>
            )}

            {/* WHAT'S SHOWN AT THIS ENERGY LEVEL */}
            <div className="mt-3 bg-black/40 p-2">
                <p className="text-gray-500 text-xs font-mono mb-1">UI adapts to your brain:</p>
                {energyLevel === 'high' && (
                    <ul className="text-green-300 text-xs space-y-1">
                        <li>✓ All tasks visible</li>
                        <li>✓ Complex actions enabled</li>
                        <li>✓ Planning mode active</li>
                    </ul>
                )}
                {energyLevel === 'medium' && (
                    <ul className="text-amber-300 text-xs space-y-1">
                        <li>✓ Urgent tasks only</li>
                        <li>✓ Quick actions</li>
                        <li>• Complex stuff hidden</li>
                    </ul>
                )}
                {energyLevel === 'low' && (
                    <ul className="text-red-300 text-xs space-y-1">
                        <li>✓ Critical items only</li>
                        <li>✓ One-tap actions</li>
                        <li>• Everything else tomorrow</li>
                    </ul>
                )}
            </div>
        </div>
    );
}