import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Copy, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScottExtensionSettings({ user }) {
  const [pin, setPin] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPin = async () => {
      try {
        if (user?.extension_pin) {
          setPin(user.extension_pin);
        } else {
          // Generate default PIN if not set
          const newPin = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
          await base44.auth.updateMe({ extension_pin: newPin });
          setPin(newPin);
        }
      } catch (error) {
        console.error('Error loading PIN:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPin();
  }, [user]);

  const handleCopyPin = () => {
    if (pin) {
      navigator.clipboard.writeText(pin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return <div className="text-gray-400 text-sm">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 border border-cyan-500/30 rounded-lg p-6 space-y-4"
    >
      <h3 className="text-white font-bold text-lg">Extension PIN</h3>
      <p className="text-gray-400 text-sm">Use this PIN to connect the email scanner to CB51</p>
      
      <div className="flex items-center gap-3 bg-black/60 border border-cyan-500/30 rounded-lg p-4">
        <div className="text-4xl font-black font-mono text-cyan-400 tracking-widest">{pin}</div>
        <button
          onClick={handleCopyPin}
          className="ml-auto px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-bold text-white flex items-center gap-2 transition-colors"
        >
          {copied ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>

      <p className="text-gray-400 text-xs">
        ℹ️ Share this PIN with team members to let them access the extension for this artist.
      </p>
    </motion.div>
  );
}