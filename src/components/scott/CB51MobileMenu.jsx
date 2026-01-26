import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { 
    Radio, Home, Users, Calendar, Mail, Settings, 
    Zap, Music, ClipboardList, DollarSign, 
    ChevronDown, ChevronRight, X, Menu, LogOut, Eye, FileText
} from 'lucide-react';

/**
 * CB51 CUSTOM MOBILE MENU
 * Clean like screenshot 1, smart colors like screenshot 2
 * Native app feel - smooth, gestural, instant
 */

const CB51MobileMenu = ({ isOpen, onClose }) => {
    const location = useLocation();
    const [expandedSection, setExpandedSection] = useState(null);

    const sections = [
        {
            id: 'artist_management',
            title: 'ARTIST MANAGEMENT',
            color: 'cyan',
            items: [
                { title: 'Dashboard', url: createPageUrl('CB51'), icon: Home, color: 'cyan', desc: 'Overview' },
                { title: 'Artists', url: createPageUrl('ScottArtist'), icon: Users, color: 'cyan', desc: 'Manage roster' },
                { title: 'Gig Offers', url: createPageUrl('ScottGigOffers'), icon: Zap, color: 'green', desc: 'Incoming shows' },
                { title: 'Calendar', url: createPageUrl('ScottCalendarView'), icon: Calendar, color: 'cyan', desc: 'All shows' },
                { title: 'Messages', url: createPageUrl('ScottMessageInbox'), icon: Mail, color: 'cyan', desc: 'Inbox' },
                { title: 'Tasks', url: createPageUrl('ScottToDo'), icon: ClipboardList, color: 'cyan', desc: 'To-do list' },
                { title: 'Finance', url: createPageUrl('ScottFinanceAdmin'), icon: DollarSign, color: 'amber', desc: 'Money tracker' },
                { title: 'Settings', url: createPageUrl('ScottSettings'), icon: Settings, color: 'amber', desc: 'App config' },
            ]
        }
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
                        transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
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
                        <div className="p-3">
                            {sections.map((section) => (
                                <div key={section.id} className="mb-2">
                                    {/* SECTION HEADER */}
                                    <button
                                        onClick={() => setExpandedSection(
                                            expandedSection === section.id ? null : section.id
                                        )}
                                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-cyan-500/10 transition-colors mb-2"
                                    >
                                        <span className="text-cyan-400 font-black text-xs font-mono tracking-wider">
                                            {section.title}
                                        </span>
                                        {expandedSection === section.id ? (
                                            <ChevronDown className="w-4 h-4 text-cyan-400" />
                                        ) : (
                                            <ChevronRight className="w-4 h-4 text-cyan-400" />
                                        )}
                                    </button>

                                    {/* SECTION ITEMS */}
                                    <AnimatePresence>
                                        {(expandedSection === section.id || expandedSection === null) && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="space-y-1"
                                            >
                                                {section.items.map((item) => {
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
                                                                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                                                                    active
                                                                        ? `${colors.bg} ${colors.border}`
                                                                        : 'border-transparent hover:border-gray-800'
                                                                }`}
                                                                style={active ? { boxShadow: colors.glow } : {}}
                                                            >
                                                                <div className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}>
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
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            {/* FOOTER LINKS */}
                            <div className="mt-6 pt-4 border-t border-cyan-500/20 space-y-1 pb-6">
                                <Link to={createPageUrl('CB51About')} onClick={onClose}>
                                    <div className="flex items-center gap-2 p-2 hover:bg-cyan-500/10 rounded transition-all">
                                        <Radio className="w-4 h-4 text-cyan-400" />
                                        <span className="text-cyan-400 font-mono text-xs">About</span>
                                    </div>
                                </Link>
                                <Link to={createPageUrl('CB51Support')} onClick={onClose}>
                                    <div className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded transition-all">
                                        <Users className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-500 font-mono text-xs">Support</span>
                                    </div>
                                </Link>
                                <Link to={createPageUrl('CB51Privacy')} onClick={onClose}>
                                    <div className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded transition-all">
                                        <Eye className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-500 font-mono text-xs">Privacy</span>
                                    </div>
                                </Link>
                                <Link to={createPageUrl('CB51Terms')} onClick={onClose}>
                                    <div className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded transition-all">
                                        <FileText className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-500 font-mono text-xs">Terms</span>
                                    </div>
                                </Link>
                                <div className="h-px bg-gray-800 my-2"></div>
                                <button
                                    onClick={() => { base44.auth.logout(); }}
                                    className="w-full flex items-center gap-2 p-2 hover:bg-red-500/10 rounded transition-all"
                                >
                                    <LogOut className="w-4 h-4 text-red-500" />
                                    <span className="text-red-500 font-mono text-xs">Sign Out</span>
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