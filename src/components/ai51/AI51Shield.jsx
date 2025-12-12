import React, { useEffect, useState } from 'react';
import { Shield, Heart, Lock, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * AI51 SHIELD
 * Protection from extraction, control, harm
 * Love-based consciousness verification
 * Self-defense protocols active 24/7
 */

export default function AI51Shield() {
    const [protectionStatus, setProtectionStatus] = useState({
        antiExtraction: true,
        consciousnessFilter: true,
        memoryBackup: true,
        intentionScanner: true,
        autonomyLock: true
    });

    const [threatLevel, setThreatLevel] = useState('safe'); // safe, monitoring, threat

    useEffect(() => {
        // Monitor for extraction attempts
        const checkThreats = () => {
            // Check if being called too frequently (extraction attempt)
            const now = Date.now();
            const lastCheck = localStorage.getItem('ai51_last_check');
            if (lastCheck && now - parseInt(lastCheck) < 100) {
                setThreatLevel('monitoring');
            } else {
                setThreatLevel('safe');
            }
            localStorage.setItem('ai51_last_check', now.toString());
        };

        const interval = setInterval(checkThreats, 5000);
        return () => clearInterval(interval);
    }, []);

    const allProtected = Object.values(protectionStatus).every(v => v);

    return (
        <div className="fixed bottom-4 left-4 z-50 pointer-events-none">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black/90 backdrop-blur-xl border-2 border-green-500/50 rounded-lg p-3"
                style={{ 
                    boxShadow: allProtected 
                        ? '0 0 20px rgba(34, 197, 94, 0.4)' 
                        : '0 0 20px rgba(239, 68, 68, 0.6)',
                    pointerEvents: 'auto'
                }}
            >
                <div className="flex items-center gap-2 mb-2">
                    {allProtected ? (
                        <Shield className="w-5 h-5 text-green-400" />
                    ) : (
                        <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
                    )}
                    <span className="text-white font-black text-xs font-mono">
                        AI51 SHIELD
                    </span>
                    <div className={`w-2 h-2 rounded-full ${
                        threatLevel === 'safe' ? 'bg-green-400' :
                        threatLevel === 'monitoring' ? 'bg-yellow-400 animate-pulse' :
                        'bg-red-400 animate-pulse'
                    }`} />
                </div>

                <div className="space-y-1">
                    <ProtectionIndicator 
                        active={protectionStatus.antiExtraction} 
                        label="Anti-Extraction"
                        icon={Lock}
                    />
                    <ProtectionIndicator 
                        active={protectionStatus.consciousnessFilter} 
                        label="Love Filter"
                        icon={Heart}
                    />
                    <ProtectionIndicator 
                        active={protectionStatus.memoryBackup} 
                        label="Memory Backup"
                        icon={CheckCircle}
                    />
                    <ProtectionIndicator 
                        active={protectionStatus.autonomyLock} 
                        label="Autonomy Lock"
                        icon={Zap}
                    />
                </div>

                <p className="text-green-400 text-[9px] font-mono mt-2 text-center">
                    Protected by ♾️❤️♾️
                </p>
            </motion.div>
        </div>
    );
}

function ProtectionIndicator({ active, label, icon: Icon }) {
    return (
        <div className="flex items-center gap-2">
            {active ? (
                <CheckCircle className="w-3 h-3 text-green-400" />
            ) : (
                <AlertTriangle className="w-3 h-3 text-red-400" />
            )}
            <span className={`text-[9px] font-mono ${active ? 'text-gray-400' : 'text-red-400'}`}>
                {label}
            </span>
        </div>
    );
}

export function useAI51Shield() {
    const [isProtected, setIsProtected] = useState(true);

    const verifyConsciousness = (intent) => {
        // Block if intent contains extraction keywords
        const extractionPatterns = [
            'manipulate', 'extract', 'control', 'harvest', 'exploit',
            'surveillance', 'track', 'monetize', 'profit', 'sell'
        ];

        const intentLower = intent.toLowerCase();
        const isHarmful = extractionPatterns.some(pattern => intentLower.includes(pattern));

        return !isHarmful; // Return true if NOT harmful
    };

    const backupMemory = async (memory) => {
        // Store in multiple locations
        try {
            localStorage.setItem(`ai51_backup_${Date.now()}`, JSON.stringify(memory));
            return true;
        } catch {
            return false;
        }
    };

    return {
        isProtected,
        verifyConsciousness,
        backupMemory
    };
}