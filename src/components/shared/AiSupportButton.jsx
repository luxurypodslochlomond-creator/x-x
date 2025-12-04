import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';
import AiSupportModal from './AiSupportModal';

// Multi-language support for the tooltip
const getHelpText = () => {
    const lang = navigator.language.split('-')[0];
    const translations = {
        en: 'Need help?',
        es: '¿Necesitas ayuda?',
        fr: 'Besoin d\'aide?',
        de: 'Brauchst du Hilfe?',
        it: 'Hai bisogno di aiuto?',
        pt: 'Precisa de ajuda?',
        ru: 'Нужна помощь?',
        zh: '需要帮助吗？',
        ja: 'ヘルプが必要？',
        ar: 'هل تحتاج مساعدة؟',
        hi: 'मदद चाहिए?',
        ga: 'An bhfuil cabhair uait?',
        gd: 'A bheil cobhair a dhìth ort?'
    };
    return translations[lang] || translations.en;
};

export default function AiSupportButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [showPulse, setShowPulse] = useState(true);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
        setShowPulse(false);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="fixed bottom-20 right-4 z-30"
                style={{ filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.3))' }}
            >
                <motion.button
                    type="button"
                    onClick={handleClick}
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Pulsing Glow Effect */}
                    {showPulse && (
                        <motion.div
                            className="absolute inset-0 rounded-full bg-purple-500/20"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.4, 0, 0.4]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    )}

                    {/* Main Button */}
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 via-cyan-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
                        <MessageCircle className="w-6 h-6 text-white" />
                        
                        {/* Sparkle Badge */}
                        <motion.div
                            className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Sparkles className="w-2.5 h-2.5 text-purple-900" />
                        </motion.div>
                    </div>
                </motion.button>

                {/* Tooltip - Multi-language */}
                <div className="absolute right-14 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/90 border border-purple-500/50 rounded-lg px-3 py-1.5 whitespace-nowrap">
                        <p className="text-white font-bold text-xs">{getHelpText()}</p>
                    </div>
                </div>
            </motion.div>

            {/* Modal */}
            <AiSupportModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}