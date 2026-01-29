import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ScottSettingsModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-black border-2 border-cyan-500 rounded-lg w-full max-w-sm"
            >
                <div className="flex items-center justify-between p-4 border-b border-cyan-500/30">
                    <h2 className="text-cyan-400 font-black font-mono text-lg">SETTINGS</h2>
                    <button
                        onClick={onClose}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 text-center">
                    <p className="text-gray-600 font-mono text-sm">Settings coming soon</p>
                </div>

                <div className="p-4 border-t border-cyan-500/30 flex gap-2">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-black py-2 rounded font-mono text-xs transition-all"
                    >
                        CLOSE
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}