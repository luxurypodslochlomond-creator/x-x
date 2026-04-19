import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';

// Every child on Earth deserves to learn in their own language
// Uses browser speech synthesis lang codes where available

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧', speechLang: 'en-GB' },
  { code: 'es', label: 'Español', flag: '🇪🇸', speechLang: 'es-ES' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', speechLang: 'fr-FR' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', speechLang: 'ar-SA', rtl: true },
  { code: 'pt', label: 'Português', flag: '🇧🇷', speechLang: 'pt-BR' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳', speechLang: 'hi-IN' },
  { code: 'zh', label: '中文', flag: '🇨🇳', speechLang: 'zh-CN' },
  { code: 'sw', label: 'Kiswahili', flag: '🌍', speechLang: 'sw' },
  { code: 'ur', label: 'اردو', flag: '🇵🇰', speechLang: 'ur', rtl: true },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', speechLang: 'de-DE' },
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩', speechLang: 'bn-BD' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷', speechLang: 'tr-TR' },
];

// Auto-detect language from browser locale — every child on Earth gets their language first
export const detectBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const code = browserLang.split('-')[0].toLowerCase();
  return LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
};

export default function LanguagePicker({ selectedLang, onChange }) {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-gray-200 hover:border-indigo-400 bg-white font-bold text-sm text-gray-700 transition-all"
      >
        <Globe className="w-4 h-4 text-indigo-500" />
        <span>{current.flag} {current.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 bg-white rounded-2xl border-2 border-gray-200 shadow-xl z-50 overflow-hidden w-52"
          >
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => { onChange(lang); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition-colors text-left ${
                  lang.code === selectedLang ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-bold text-sm flex-1">{lang.label}</span>
                {lang.code === selectedLang && <Check className="w-4 h-4 text-indigo-500" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}