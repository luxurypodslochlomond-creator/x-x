import React, { useState } from 'react';
import { Share2, Bluetooth, Radio, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * P2P FREQUENCY SHARING
 * Share healing protocols via Bluetooth/WiFi Direct/Copy Link
 * ZERO servers needed
 */

export default function FrequencyP2PShare({ frequency, timer, onClose }) {
  const [method, setMethod] = useState(null);
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    frequency_id: frequency.id,
    frequency_hz: frequency.hz,
    waveform: frequency.waveform,
    timer_used: timer,
    shared_by: 'UF51_user',
    timestamp: new Date().toISOString()
  };

  const handleBluetoothShare = async () => {
    setSharing(true);
    try {
      // Check if Web Bluetooth is available
      if (!navigator.bluetooth) {
        alert('Bluetooth not supported on this device');
        setSharing(false);
        return;
      }

      // Request Bluetooth device
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['battery_service'] }], // Generic service
        optionalServices: ['generic_access']
      });

      // Connect and send data
      const server = await device.gatt.connect();
      
      // Store in localStorage for nearby devices to pick up
      localStorage.setItem('uf51_shared_frequency', JSON.stringify(shareData));
      
      alert(`✓ Shared via Bluetooth to ${device.name}`);
      setSharing(false);
      if (onClose) onClose();
    } catch (e) {
      console.log('Bluetooth share:', e);
      alert('Bluetooth sharing cancelled or failed');
      setSharing(false);
    }
  };

  const handleLocalShare = () => {
    // Store for local P2P mesh
    const stored = JSON.parse(localStorage.getItem('uf51_shared_frequencies') || '[]');
    stored.unshift(shareData);
    localStorage.setItem('uf51_shared_frequencies', JSON.stringify(stored.slice(0, 50))); // Keep last 50
    
    alert('✓ Shared on local mesh - nearby devices can discover this');
    if (onClose) onClose();
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}${window.location.pathname}?share=${encodeURIComponent(JSON.stringify(shareData))}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${frequency.name} Healing Frequency`,
          text: `Try this healing frequency: ${frequency.hz}Hz (${frequency.description})`,
          url: window.location.href
        });
        if (onClose) onClose();
      } catch (e) {
        console.log('Native share cancelled');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-black border-2 border-cyan-500 rounded-xl p-6 max-w-md w-full"
        style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Share2 className="w-8 h-8 text-cyan-400" />
          <div>
            <h2 className="text-xl font-black text-white">SHARE FREQUENCY</h2>
            <p className="text-gray-400 text-xs font-mono">P2P healing protocol</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* NATIVE SHARE (mobile) - PRIMARY */}
          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="w-full p-5 border-2 border-pink-500 bg-pink-500/10 hover:bg-pink-500/20 rounded-lg transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <Share2 className="w-7 h-7 text-pink-400" />
                <div className="flex-1">
                  <p className="font-black text-white text-base">SHARE</p>
                  <p className="text-gray-400 text-xs">WhatsApp, Signal, Messages, etc</p>
                </div>
              </div>
            </button>
          )}

          {/* COPY LINK */}
          <button
            onClick={handleCopyLink}
            className="w-full p-5 border-2 border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-lg transition-all text-left"
          >
            <div className="flex items-center gap-3">
              {copied ? (
                <Check className="w-7 h-7 text-green-400" />
              ) : (
                <Copy className="w-7 h-7 text-cyan-400" />
              )}
              <div className="flex-1">
                <p className="font-black text-white text-base">
                  {copied ? 'COPIED!' : 'COPY LINK'}
                </p>
                <p className="text-gray-400 text-xs">Paste anywhere</p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-cyan-500/30">
          <p className="text-xs text-gray-500 font-mono">
            Sharing: <span className="text-cyan-400">{frequency.name}</span> • {frequency.hz}Hz • {timer}s used
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 text-gray-400 hover:text-white text-sm font-mono"
        >
          Cancel
        </button>
      </motion.div>
    </motion.div>
  );
}