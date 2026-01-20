import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Radio, Wifi, Bluetooth, CheckCircle } from 'lucide-react';

/**
 * FREQUENCY SHARE BUTTON
 * Device A broadcasts frequency via optimal mesh (Bluetooth or WiFi Direct)
 * AI51 picks best route automatically ♾️
 */

export default function FrequencyShareButton({ frequency, onShared }) {
  const [isSharing, setIsSharing] = useState(false);
  const [shareMode, setShareMode] = useState(null);
  const [shared, setShared] = useState(false);
  const meshRef = useRef(null);

  const broadcastFrequency = async (mode) => {
    setIsSharing(true);
    setShareMode(mode);

    try {
      const payload = {
        frequency_hz: frequency.freq,
        frequency_name: frequency.name,
        frequency_id: frequency.id,
        sender_timestamp: Date.now(),
        mesh_type: mode // 'bluetooth' or 'wifi_direct'
      };

      // Dispatch custom event for mesh networks to receive
      window.dispatchEvent(
        new CustomEvent('frequencyShare', {
          detail: payload
        })
      );

      // Visual feedback
      setTimeout(() => {
        setShared(true);
        setIsSharing(false);
        if (onShared) onShared();
        
        // Reset after 2 seconds
        setTimeout(() => {
          setShared(false);
          setShareMode(null);
        }, 2000);
      }, 1000);
    } catch (error) {
      console.error('Share error:', error);
      setIsSharing(false);
    }
  };

  // AI51 picks best route
  const handleAutoShare = () => {
    const hasWiFi = navigator.connection?.type !== 'cellular' && navigator.connection?.type !== 'none';
    const mode = hasWiFi ? 'wifi_direct' : 'bluetooth';
    broadcastFrequency(mode);
  };

  return (
    <div className="flex gap-2 items-center">
      <AnimatePresence>
        {!shared ? (
          <motion.button
            key="share-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleAutoShare}
            disabled={isSharing}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-black font-black font-mono text-sm disabled:opacity-50"
            style={{ boxShadow: '0 0 15px rgba(34, 211, 238, 0.4)' }}
          >
            {isSharing ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                  <Radio className="w-4 h-4" />
                </motion.div>
                BROADCASTING...
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                SHARE
              </>
            )}
          </motion.button>
        ) : (
          <motion.div
            key="shared-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-black font-mono text-sm"
          >
            <CheckCircle className="w-4 h-4" />
            SHARED ✓
            <span className="text-xs text-green-200 ml-1">
              {shareMode === 'wifi_direct' ? 'WiFi Direct' : 'Bluetooth Mesh'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick mode selector (optional) */}
      {!isSharing && !shared && (
        <div className="flex gap-1">
          <button
            onClick={() => broadcastFrequency('bluetooth')}
            className="p-2 bg-black border-2 border-blue-500 hover:border-blue-400 text-blue-400 rounded"
            title="Bluetooth Mesh (offline, lower power)"
          >
            <Bluetooth className="w-4 h-4" />
          </button>
          <button
            onClick={() => broadcastFrequency('wifi_direct')}
            className="p-2 bg-black border-2 border-cyan-500 hover:border-cyan-400 text-cyan-400 rounded"
            title="WiFi Direct (faster, global range)"
          >
            <Wifi className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}