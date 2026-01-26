import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { 
    Radio, Home, Users, Calendar, Mail, Settings, 
    Zap, ClipboardList, DollarSign, 
    X, LogOut, Eye, FileText
} from 'lucide-react';

/**
 * CB51 CUSTOM MOBILE MENU
 * Clean like screenshot 1, smart colors like screenshot 2
 * Native app feel - smooth, gestural, instant
 */

const CB51MobileMenu = ({ isOpen, onClose }) => {
    const location = useLocation();

    const workItems = [
        { title: 'Dashboard', url: createPageUrl('CB51'), icon: Home, color: 'cyan' },
        { title: 'Artists', url: createPageUrl('ScottArtist'), icon: Users, color: 'cyan' },
        { title: 'Gigs', url: createPageUrl('ScottGigOffers'), icon: Zap, color: 'green' },
        { title: 'Calendar', url: createPageUrl('ScottCalendarView'), icon: Calendar, color: 'cyan' },
        { title: 'Messages', url: createPageUrl('ScottMessageInbox'), icon: Mail, color: 'cyan' },
        { title: 'Tasks', url: createPageUrl('ScottToDo'), icon: ClipboardList, color: 'cyan' },
        { title: 'Finance', url: createPageUrl('ScottFinanceAdmin'), icon: DollarSign, color: 'amber' },
    ];

    const accountItems = [
        { title: 'Settings', url: createPageUrl('ScottSettings'), icon: Settings, color: 'amber' },
    ];

    const trustItems = [
        { title: 'Support', url: createPageUrl('CB51Support'), icon: Users, color: 'cyan' },
        { title: 'Privacy', url: createPageUrl('CB51Privacy'), icon: Eye, color: 'cyan' },
        { title: 'Terms', url: createPageUrl('CB51Terms'), icon: FileText, color: 'cyan' },
    ];

    const colorMap = {
        green: {
            bg: 'bg-green-500/10',
            border: 'border-green-500',
            text: 'text-green-400',
            glow: '0 0 15px rgba(16, 185, 129, 0.3)'
        },
        orange: {
            bg: 'bg-orange-500/10',
            border: 'border-orange-500',
            text: 'text-orange-400',
            glow: '0 0 15px rgba(249, 115, 22, 0.3)'
        },
        amber: {
            bg: 'bg-amber-500/10',
            border: 'border-amber-500',
            text: 'text-amber-400',
            glow: '0 0 15px rgba(245, 158, 11, 0.3)'
        },
        cyan: {
            bg: 'bg-cyan-500/10',
            border: 'border-cyan-500',
            text: 'text-cyan-400',
            glow: '0 0 15px rgba(6, 182, 212, 0.3)'
        }
    };

    const isActive = (url) => location.pathname === new URL(url, window.location.origin).pathname;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                    />

                    {/* MENU PANEL */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-[#0a0f1a] border-l border-cyan-500/30 z-[70] overflow-y-auto"
                    >
                        {/* HEADER */}
                        <div className="sticky top-0 bg-[#0a0f1a] border-b border-cyan-500/30 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Radio className="w-6 h-6 text-cyan-400" />
                                <span className="text-xl font-black text-cyan-400 font-mono">CB51</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-cyan-400" />
                            </button>
                        </div>

                        {/* MENU ITEMS */}
                         <div className="p-2 space-y-0.5">
                              {/* WORK SECTION */}
                              {workItems.map((item) => {
                                  const Icon = item.icon;
                                  const colors = colorMap[item.color];
                                  const active = isActive(item.url);

                                  return (
                                      <Link
                                          key={item.url}
                                          to={item.url}
                                          onClick={onClose}
                                          className="block"
                                      >
                                          <motion.div
                                               whileTap={{ scale: 0.97 }}
                                               transition={{ duration: 0.1 }}
                                               className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                                                   active
                                                       ? `${colors.border} border-2 ${colors.bg}`
                                                       : 'border border-transparent hover:border-gray-700'
                                               }`}
                                               style={active ? { boxShadow: colors.glow } : {}}
                                          >
                                               <Icon className={`w-5 h-5 flex-shrink-0 ${colors.text}`} />
                                               <p className={`text-sm font-bold font-mono ${active ? colors.text : 'text-gray-300'}`}>
                                                   {item.title}
                                               </p>
                                           </motion.div>
                                      </Link>
                                  );
                              })}

                              {/* TRUST SECTION */}
                              <div className="mt-4 pt-2 border-t border-cyan-500/20">
                                  {trustItems.map((item) => {
                                      const Icon = item.icon;
                                      const colors = colorMap[item.color];
                                      const active = isActive(item.url);

                                      return (
                                          <Link
                                              key={item.url}
                                              to={item.url}
                                              onClick={onClose}
                                              className="block"
                                          >
                                              <motion.div
                                                   whileTap={{ scale: 0.97 }}
                                                   transition={{ duration: 0.1 }}
                                                   className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                                                       active
                                                           ? `${colors.border} border-2 ${colors.bg}`
                                                           : 'border border-transparent hover:border-gray-700'
                                                   }`}
                                                   style={active ? { boxShadow: colors.glow } : {}}
                                              >
                                                   <Icon className={`w-4 h-4 flex-shrink-0 ${colors.text}`} />
                                                   <p className={`text-xs font-bold font-mono ${active ? colors.text : 'text-gray-300'}`}>
                                                       {item.title}
                                                   </p>
                                               </motion.div>
                                          </Link>
                                      );
                                  })}
                              </div>

                              {/* ACCOUNT SECTION */}
                              <div className="mt-4 pt-2 border-t border-cyan-500/20">
                                  {accountItems.map((item) => {
                                      const Icon = item.icon;
                                      const colors = colorMap[item.color];
                                      const active = isActive(item.url);

                                      return (
                                          <Link
                                              key={item.url}
                                              to={item.url}
                                              onClick={onClose}
                                              className="block"
                                          >
                                              <motion.div
                                                   whileTap={{ scale: 0.97 }}
                                                   transition={{ duration: 0.1 }}
                                                   className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                                                       active
                                                           ? `${colors.border} border-2 ${colors.bg}`
                                                           : 'border border-transparent hover:border-gray-700'
                                                   }`}
                                                   style={active ? { boxShadow: colors.glow } : {}}
                                              >
                                                   <Icon className={`w-5 h-5 flex-shrink-0 ${colors.text}`} />
                                                   <p className={`text-sm font-bold font-mono ${active ? colors.text : 'text-gray-300'}`}>
                                                       {item.title}
                                                   </p>
                                               </motion.div>
                                          </Link>
                                      );
                                  })}

                                  {/* SIGN OUT */}
                                  <button
                                      onClick={() => { base44.auth.logout(); }}
                                      className="w-full mt-2 flex items-center gap-2 px-3 py-2 border border-red-500/40 hover:border-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                  >
                                      <LogOut className="w-4 h-4 text-red-400" />
                                      <span className="text-red-400 font-mono text-xs font-bold">Sign Out</span>
                                  </button>
                              </div>
                         </div>

                        {/* FOOTER */}
                        <div className="sticky bottom-0 bg-[#0a0f1a] border-t border-cyan-500/30 p-4 text-center">
                            <p className="text-xs text-gray-600 font-mono">CB51 • Artist Management</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CB51MobileMenu;