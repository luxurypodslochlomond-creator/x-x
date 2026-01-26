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

    const menuItems = [
        { title: 'Dashboard', url: createPageUrl('CB51'), icon: Home, color: 'cyan', desc: 'Overview' },
        { title: 'Artists', url: createPageUrl('ScottArtist'), icon: Users, color: 'cyan', desc: 'Manage roster' },
        { title: 'Gig Offers', url: createPageUrl('ScottGigOffers'), icon: Zap, color: 'green', desc: 'Incoming shows' },
        { title: 'Calendar', url: createPageUrl('ScottCalendarView'), icon: Calendar, color: 'cyan', desc: 'All shows' },
        { title: 'Messages', url: createPageUrl('ScottMessageInbox'), icon: Mail, color: 'cyan', desc: 'Inbox' },
        { title: 'Tasks', url: createPageUrl('ScottToDo'), icon: ClipboardList, color: 'cyan', desc: 'To-do list' },
        { title: 'Finance', url: createPageUrl('ScottFinanceAdmin'), icon: DollarSign, color: 'amber', desc: 'Money tracker' },
        { title: 'Settings', url: createPageUrl('ScottSettings'), icon: Settings, color: 'amber', desc: 'App config' },
        { title: 'About', url: createPageUrl('CB51About'), icon: Radio, color: 'cyan', desc: 'Why we exist' },
        { title: 'Support', url: createPageUrl('CB51Support'), icon: Users, color: 'cyan', desc: 'Get help' },
        { title: 'Privacy', url: createPageUrl('CB51Privacy'), icon: Eye, color: 'cyan', desc: 'Data protection' },
        { title: 'Terms', url: createPageUrl('CB51Terms'), icon: FileText, color: 'cyan', desc: 'Service terms' },
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
                        transition={{ duration: 0.25, ease: 'easeOut' }}
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
                        <div className="p-3 space-y-1">
                            {menuItems.map((item) => {
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
                                             whileTap={{ scale: 0.98 }}
                                             className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                                                 active
                                                     ? `${colors.bg} ${colors.border}`
                                                     : 'border-transparent hover:border-gray-800'
                                             }`}
                                             style={active ? { boxShadow: colors.glow } : {}}
                                        >
                                             <div className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                                                 <Icon className={`w-5 h-5 ${colors.text}`} />
                                             </div>
                                             <div className="flex-1 min-w-0">
                                                 <p className={`font-bold text-sm font-mono ${active ? colors.text : 'text-white'}`}>
                                                     {item.title}
                                                 </p>
                                                 <p className="text-xs text-gray-600 font-mono truncate">
                                                     {item.desc}
                                                 </p>
                                             </div>
                                         </motion.div>
                                    </Link>
                                );
                            })}

                            {/* SIGN OUT */}
                            <div className="mt-6 pt-4 border-t border-cyan-500/20 pb-6">
                                <button
                                    onClick={() => { base44.auth.logout(); }}
                                    className="w-full flex items-center gap-2 p-3 border-2 border-red-500/50 hover:border-red-500 rounded-lg transition-all"
                                >
                                    <LogOut className="w-5 h-5 text-red-500" />
                                    <span className="text-red-500 font-mono text-sm font-bold">Sign Out</span>
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