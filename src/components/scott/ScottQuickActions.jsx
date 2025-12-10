import React, { useState } from 'react';
import { Plus, Calendar, DollarSign, Users, Plane, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FLOATING QUICK ACTIONS
 * Add anything from anywhere - ADHD DREAM
 */

export default function ScottQuickActions() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const actions = [
        { icon: Calendar, label: 'GIG', color: 'cyan', url: 'ScottCalendar' },
        { icon: DollarSign, label: 'INVOICE', color: 'green', url: 'ScottInvoices' },
        { icon: Users, label: 'GUEST', color: 'purple', url: 'ScottGuestList' },
        { icon: Plane, label: 'VISA', color: 'amber', url: 'ScottVisas' },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex flex-col gap-3 mb-3"
                    >
                        {actions.map((action, i) => (
                            <motion.button
                                key={action.label}
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => {
                                    navigate(createPageUrl(action.url));
                                    setIsOpen(false);
                                }}
                                className={`flex items-center gap-2 bg-${action.color}-600 hover:bg-${action.color}-700 text-white px-4 py-3 rounded-xl shadow-lg font-mono text-sm font-bold`}
                                style={{ 
                                    backgroundColor: action.color === 'cyan' ? '#0891b2' : 
                                                     action.color === 'green' ? '#16a34a' :
                                                     action.color === 'purple' ? '#9333ea' : '#d97706'
                                }}
                            >
                                <action.icon className="w-5 h-5" />
                                {action.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center shadow-2xl"
                style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)' }}
            >
                {isOpen ? <X className="w-8 h-8 text-black" /> : <Plus className="w-8 h-8 text-black" />}
            </button>
        </div>
    );
}