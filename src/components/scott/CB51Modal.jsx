import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * CB51 BRANDED MODAL
 * Black background, cyan accents, proper CB51 feel
 */
export default function CB51Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative bg-black border-2 border-cyan-500 rounded-xl max-w-md w-full p-6 shadow-2xl"
                    style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)' }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-600 hover:text-cyan-400 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Title */}
                    {title && (
                        <h3 className="text-cyan-400 font-black font-mono text-lg mb-4">
                            {title}
                        </h3>
                    )}

                    {/* Content */}
                    <div className="text-white">
                        {children}
                    </div>

                    {/* Close button at bottom */}
                    <button
                        onClick={onClose}
                        className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-black font-black py-3 rounded-lg font-mono"
                    >
                        CLOSE
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}