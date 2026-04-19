import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, X } from 'lucide-react';

export const LANGUAGES = [
  { code: 'en', label: 'English', speechLang: 'en-GB' },
  { code: 'es', label: 'Español', speechLang: 'es-ES' },
  { code: 'fr', label: 'Français', speechLang: 'fr-FR' },
  { code: 'ar', label: 'العربية', speechLang: 'ar-SA', rtl: true },
  { code: 'pt', label: 'Português', speechLang: 'pt-BR' },
  { code: 'hi', label: 'हिन्दी', speechLang: 'hi-IN' },
  { code: 'zh', label: '中文', speechLang: 'zh-CN' },
  { code: 'sw', label: 'Kiswahili', speechLang: 'sw' },
  { code: 'ur', label: 'اردو', speechLang: 'ur', rtl: true },
  { code: 'de', label: 'Deutsch', speechLang: 'de-DE' },
  { code: 'bn', label: 'বাংলা', speechLang: 'bn-BD' },
  { code: 'tr', label: 'Türkçe', speechLang: 'tr-TR' },
  { code: 'ha', label: 'Hausa', speechLang: 'ha' },
  { code: 'yo', label: 'Yorùbá', speechLang: 'yo' },
  { code: 'ig', label: 'Igbo', speechLang: 'ig' },
  { code: 'am', label: 'አማርኛ', speechLang: 'am' },
  { code: 'so', label: 'Soomaali', speechLang: 'so' },
  { code: 'tl', label: 'Filipino', speechLang: 'tl-PH' },
  { code: 'vi', label: 'Tiếng Việt', speechLang: 'vi-VN' },
  { code: 'th', label: 'ภาษาไทย', speechLang: 'th-TH' },
  { code: 'my', label: 'မြန်မာဘာသာ', speechLang: 'my' },
  { code: 'km', label: 'ភាសាខ្មែរ', speechLang: 'km' },
  { code: 'ne', label: 'नेपाली', speechLang: 'ne-NP' },
  { code: 'si', label: 'සිංහල', speechLang: 'si-LK' },
  { code: 'ps', label: 'پښتو', speechLang: 'ps', rtl: true },
  { code: 'fa', label: 'فارسی', speechLang: 'fa-IR', rtl: true },
  { code: 'ku', label: 'Kurdî', speechLang: 'ku' },
  { code: 'uk', label: 'Українська', speechLang: 'uk-UA' },
  { code: 'ru', label: 'Русский', speechLang: 'ru-RU' },
  { code: 'ro', label: 'Română', speechLang: 'ro-RO' },
  { code: 'it', label: 'Italiano', speechLang: 'it-IT' },
  { code: 'nl', label: 'Nederlands', speechLang: 'nl-NL' },
  { code: 'pl', label: 'Polski', speechLang: 'pl-PL' },
];

export const detectBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const code = browserLang.split('-')[0].toLowerCase();
  return LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
};

export default function LanguagePicker({ selectedLang, onChange }) {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 font-bold text-sm text-white transition-all"
      >
        <Globe className="w-4 h-4 text-indigo-300 flex-shrink-0" />
        <span className="text-white/90">{current.label}</span>
      </button>

      {/* Full-screen modal — no overflow issues */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Sheet */}
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-sm bg-[#0f1520] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-400" />
                  <span className="text-white font-black text-base">Choose language</span>
                </div>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Language list — scrollable */}
              <div className="overflow-y-auto max-h-[60vh] p-3 grid grid-cols-2 gap-2">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { onChange(lang); setOpen(false); }}
                    className={`flex items-center justify-between gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-all text-left ${
                      lang.code === selectedLang
                        ? 'bg-indigo-500/30 border border-indigo-400/50 text-indigo-200'
                        : 'bg-white/5 border border-white/5 hover:bg-white/10 text-white/70'
                    }`}
                  >
                    <span className="flex-1 truncate">{lang.label}</span>
                    {lang.code === selectedLang && <Check className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}