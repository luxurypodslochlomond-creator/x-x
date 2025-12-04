import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Wifi, Battery, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * EMERGENCY MODE
 * Ultra-light mode for crisis zones
 * Works on 2G, minimal data, peer-to-peer sharing
 * Gaza, refugee camps, disaster zones
 */

export default function EmergencyMode() {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [networkSpeed, setNetworkSpeed] = useState('unknown');
  const [batteryLevel, setBatteryLevel] = useState(100);

  useEffect(() => {
    checkEmergencyConditions();
    
    // Monitor battery
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(Math.round(battery.level * 100));
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      });
    }

    // Monitor connection speed
    if ('connection' in navigator) {
      const conn = navigator.connection;
      setNetworkSpeed(conn.effectiveType || 'unknown');
      conn.addEventListener('change', () => {
        setNetworkSpeed(conn.effectiveType || 'unknown');
        checkEmergencyConditions();
      });
    }
  }, []);

  const checkEmergencyConditions = () => {
    const savedMode = localStorage.getItem('emergency-mode');
    if (savedMode === 'true') {
      setIsEmergencyMode(true);
      return;
    }

    // Auto-detect emergency conditions
    const conn = navigator.connection;
    const isSlowNetwork = conn && (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g');
    const isSaveData = conn && conn.saveData === true;
    
    if ((isSlowNetwork || isSaveData) && !localStorage.getItem('emergency-prompt-dismissed')) {
      setShowPrompt(true);
    }
  };

  const enableEmergencyMode = () => {
    localStorage.setItem('emergency-mode', 'true');
    setIsEmergencyMode(true);
    setShowPrompt(false);
    
    // Disable animations globally
    document.documentElement.style.setProperty('--animation-duration', '0s');
    
    // Reduce image quality
    document.querySelectorAll('img').forEach(img => {
      img.loading = 'lazy';
    });
  };

  const disableEmergencyMode = () => {
    localStorage.setItem('emergency-mode', 'false');
    setIsEmergencyMode(false);
    document.documentElement.style.removeProperty('--animation-duration');
  };

  const shareAppPeerToPeer = async () => {
    const shareText = `🆘 UF51 Emergency App

Works offline. No internet needed after install.

Get paid to clean. Access healing frequencies.

Install: uf51.love

Share this message. Save lives. ♾️❤️♾️`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'UF51 Emergency Mode',
          text: shareText
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Message copied! Share via WhatsApp/SMS to help others.');
    }
  };

  return (
    <>
      {/* EMERGENCY STATUS BAR */}
      {isEmergencyMode && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-orange-900/95 backdrop-blur-sm py-2 px-4">
          <div className="flex items-center justify-between text-xs max-w-6xl mx-auto">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-orange-400 animate-pulse" />
              <span className="text-orange-200 font-bold">EMERGENCY MODE</span>
              
              {networkSpeed && networkSpeed !== '4g' && (
                <span className="flex items-center gap-1 text-orange-300">
                  <Wifi className="w-3 h-3" />
                  {networkSpeed}
                </span>
              )}
              
              {batteryLevel < 20 && (
                <span className="flex items-center gap-1 text-red-400">
                  <Battery className="w-3 h-3" />
                  {batteryLevel}%
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={shareAppPeerToPeer}
                className="text-orange-200 hover:text-white text-xs underline"
              >
                Share to others
              </button>
              <button
                onClick={disableEmergencyMode}
                className="text-orange-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AUTO-DETECT PROMPT */}
      <AnimatePresence>
        {showPrompt && !isEmergencyMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
            onClick={() => {
              setShowPrompt(false);
              localStorage.setItem('emergency-prompt-dismissed', 'true');
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full bg-gradient-to-br from-orange-900 to-red-900 border-4 border-orange-500 rounded-2xl p-8 space-y-6"
            >
              <div className="flex items-center justify-center">
                <AlertTriangle className="w-16 h-16 text-orange-400 animate-pulse" />
              </div>
              
              <h2 className="text-3xl font-black text-white text-center">EMERGENCY MODE?</h2>
              
              <div className="space-y-4 text-white">
                <p className="text-sm leading-relaxed">
                  Slow network detected. Enable emergency mode for:
                </p>
                
                <div className="bg-black/40 rounded-lg p-4 space-y-2 text-sm">
                  <p className="text-orange-300">✓ No animations (saves data + battery)</p>
                  <p className="text-orange-300">✓ Works on 2G</p>
                  <p className="text-orange-300">✓ Healing frequencies work offline</p>
                  <p className="text-orange-300">✓ PTSD/trauma support 24/7</p>
                </div>
                
                <div className="bg-orange-900/40 rounded-lg p-4">
                  <p className="text-xs text-orange-200">
                    Built for Gaza, refugee camps, disaster zones. Works when nothing else does.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={enableEmergencyMode}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-4 font-black"
                >
                  Enable
                </Button>
                <Button
                  onClick={() => {
                    setShowPrompt(false);
                    localStorage.setItem('emergency-prompt-dismissed', 'true');
                  }}
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  Not now
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hook to check if emergency mode is active
export const useEmergencyMode = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  useEffect(() => {
    const checkMode = () => {
      const mode = localStorage.getItem('emergency-mode') === 'true';
      setIsEmergencyMode(mode);
    };

    checkMode();
    window.addEventListener('storage', checkMode);
    return () => window.removeEventListener('storage', checkMode);
  }, []);

  return isEmergencyMode;
};