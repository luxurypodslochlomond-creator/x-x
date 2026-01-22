import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { WifiOff, Home, RotateCcw } from 'lucide-react';

/**
 * CB51 Offline Handler
 * Replaces "FREQUENCY PAUSED" - friendly CB51 branding
 * Shows when connection lost, offers home button
 */

export default function CB51OfflineHandler() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-black via-cyan-950 to-black flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full text-center space-y-6">
        {/* ICON */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <WifiOff className="w-16 h-16 text-cyan-400 mx-auto" />
        </motion.div>

        {/* TITLE */}
        <div>
          <h1 className="text-4xl font-black font-mono text-cyan-400 mb-2">CB51</h1>
          <p className="text-gray-400 font-mono text-sm">Offline mode</p>
        </div>

        {/* MESSAGE */}
        <div className="bg-black/60 border-2 border-cyan-500/50 rounded-lg p-4 space-y-2">
          <p className="text-white font-mono text-sm">Connection lost</p>
          <p className="text-gray-400 font-mono text-xs">Data saved locally. Reconnect to sync.</p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-black font-mono transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            RETRY
          </button>

          <button
            onClick={() => navigate(createPageUrl('CB51'))}
            className="w-full bg-black border-2 border-cyan-500 hover:border-cyan-400 text-cyan-400 py-3 rounded-lg font-black font-mono transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            HOME
          </button>
        </div>

        {/* FOOTER */}
        <p className="text-gray-600 font-mono text-xs">Your work is saved ♾️</p>
      </div>
    </motion.div>
  );
}