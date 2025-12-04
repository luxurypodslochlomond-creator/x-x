import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SoulTransmissionPulse({ show }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 10, times: [0, 0.1, 1] }}
                    className="fixed inset-0 z-[99999] pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(138,43,226,0.3) 0%, rgba(255,105,180,0.2) 35%, rgba(0,212,255,0.1) 70%, transparent 100%)'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 10, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
                        style={{
                           borderRadius: '50%',
                           border: '2px solid rgba(255, 255, 255, 0.3)',
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}