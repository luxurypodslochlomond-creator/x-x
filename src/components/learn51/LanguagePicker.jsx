import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';

// Every child on Earth deserves to learn in their own language
// Uses browser speech synthesis lang codes where available

export const LANGUAGES = [
  // Most spoken + most needed — every child on Earth
  { code: 'en', label: 'English', flag: '🇬🇧', speechLang: 'en-GB' },
  { code: 'es', label: 'Español', flag: '🇪🇸', speechLang: 'es-ES' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', speechLang: 'fr-FR' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', speechLang: 'ar-SA', rtl: true },
  { code: 'pt', label: 'Português', flag: '🇧🇷', speechLang: 'pt-BR' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳', speechLang: 'hi-IN' },
  { code: 'zh', label: '中文', flag: '🇨🇳', speechLang: 'zh-CN' },
  { code: 'sw', label: 'Kiswahili', flag: '🌍', speechLang: 'sw' },        // 200M+ East Africa
  { code: 'ur', label: 'اردو', flag: '🇵🇰', speechLang: 'ur', rtl: true },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', speechLang: 'de-DE' },
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩', speechLang: 'bn-BD' },        // 230M Bangladesh
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷', speechLang: 'tr-TR' },
  { code: 'ha', label: 'Hausa', flag: '🇳🇬', speechLang: 'ha' },           // 100M+ West Africa
  { code: 'yo', label: 'Yorùbá', flag: '🇳🇬', speechLang: 'yo' },          // 45M+ Nigeria
  { code: 'ig', label: 'Igbo', flag: '🇳🇬', speechLang: 'ig' },            // 30M+ Nigeria
  { code: 'am', label: 'አማርኛ', flag: '🇪🇹', speechLang: 'am' },           // 60M+ Ethiopia
  { code: 'so', label: 'Soomaali', flag: '🇸🇴', speechLang: 'so' },        // Somalia + diaspora
  { code: 'tl', label: 'Filipino', flag: '🇵🇭', speechLang: 'tl-PH' },     // 100M Philippines
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', speechLang: 'vi-VN' },   // 95M Vietnam
  { code: 'th', label: 'ภาษาไทย', flag: '🇹🇭', speechLang: 'th-TH' },     // 70M Thailand
  { code: 'my', label: 'မြန်မာဘာသာ', flag: '🇲🇲', speechLang: 'my' },     // 55M Myanmar
  { code: 'km', label: 'ភាសាខ្មែរ', flag: '🇰🇭', speechLang: 'km' },      // Cambodia
  { code: 'ne', label: 'नेपाली', flag: '🇳🇵', speechLang: 'ne-NP' },       // Nepal
  { code: 'si', label: 'සිංහල', flag: '🇱🇰', speechLang: 'si-LK' },       // Sri Lanka
  { code: 'ps', label: 'پښتو', flag: '🇦🇫', speechLang: 'ps', rtl: true }, // Afghanistan/Pakistan
  { code: 'fa', label: 'فارسی', flag: '🇮🇷', speechLang: 'fa-IR', rtl: true }, // Iran/Afghanistan
  { code: 'ku', label: 'Kurdî', flag: '🏴', speechLang: 'ku' },            // Kurdistan — stateless, needs us
  { code: 'uk', label: 'Українська', flag: '🇺🇦', speechLang: 'uk-UA' },   // Ukraine — kids in war zones
  { code: 'ru', label: 'Русский', flag: '🇷🇺', speechLang: 'ru-RU' },
  { code: 'ro', label: 'Română', flag: '🇷🇴', speechLang: 'ro-RO' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹', speechLang: 'it-IT' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱', speechLang: 'nl-NL' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱', speechLang: 'pl-PL' },
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
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 font-bold text-sm text-white transition-all"
      >
        <Globe className="w-4 h-4 text-indigo-300" />
        <span className="text-white/90">{current.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#0f1520] rounded-2xl border border-white/10 shadow-2xl z-50 overflow-y-auto w-48 max-h-72"
          >
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => { onChange(lang); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left ${
                  lang.code === selectedLang ? 'bg-indigo-500/20 text-indigo-300' : 'text-white/70'
                }`}
              >
                <span className="font-bold text-sm flex-1">{lang.label}</span>
                {lang.code === selectedLang && <Check className="w-4 h-4 text-indigo-400" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}