import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CTRL51Icon from './CTRL51Icon';

export default function CTRL51Header({ showBack = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-orange-500/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Desktop + Mobile Top Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {showBack && (
              <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
                <Link to="/CTRL51" className="p-2 hover:bg-orange-500/20 rounded-lg transition">
                   <ArrowLeft className="w-4 h-4 text-orange-400" />
                </Link>
              </motion.div>
            )}
            <Link to="/CTRL51" className="flex items-center gap-1.5 sm:gap-2 group">
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <CTRL51Icon size={28} animate={true} />
              </motion.div>
              <span className="font-black text-base sm:text-lg text-orange-400 group-hover:text-orange-300 transition">CTRL51</span>
            </Link>
          </div>

          {/* Desktop Nav (hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold">
            <Link to="/CTRL51" className="text-gray-400 hover:text-orange-400 transition">Platform</Link>
            <Link to="/CTRL51Pricing" className="text-gray-400 hover:text-orange-400 transition">Pricing</Link>
            <motion.a 
              href="mailto:hello@ctrl51.uk"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 transition text-xs sm:text-sm"
            >
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Contact</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 hover:bg-orange-500/20 rounded-lg transition"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-orange-400" />
            ) : (
              <Menu className="w-5 h-5 text-orange-400" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden mt-3 pt-3 border-t border-orange-500/20 space-y-2"
            >
              <Link 
                to="/CTRL51" 
                className="block px-3 py-2 text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Platform
              </Link>
              <Link 
                to="/CTRL51Pricing" 
                className="block px-3 py-2 text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <a 
                href="mailto:hello@ctrl51.uk"
                className="flex items-center gap-2 px-3 py-2 text-orange-400 hover:bg-orange-500/10 rounded-lg transition"
              >
                <Mail className="w-4 h-4" />
                Contact
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}