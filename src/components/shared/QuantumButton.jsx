import React from 'react';
import { motion } from 'framer-motion';

export default function QuantumButton({ children, onClick, className = '', disabled = false, ...props }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05, filter: disabled ? 'brightness(1)' : 'brightness(1.2)' }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`
        relative overflow-hidden
        px-8 py-3 rounded-2xl 
        border border-white/20 
        bg-white/10 backdrop-blur-md 
        text-white font-bold
        shadow-lg shadow-black/20
        transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-purple-500/30'}
        ${className}
      `}
      {...props}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </div>
    </motion.button>
  );
}