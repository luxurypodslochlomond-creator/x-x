import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Shield, Heart } from 'lucide-react';

export default function Earth51Contact() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState('');

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopied(email);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ imageRendering: 'pixelated' }}>
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-pink-500">
        <div className="max-w-xl mx-auto p-3 flex items-center justify-between">
          <motion.button
            onClick={() => navigate(createPageUrl('Earth51'))}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            className="w-10 h-10 bg-cyan-500 border-3 border-cyan-400 flex items-center justify-center font-black"
            style={{ boxShadow: '3px 3px 0px #000' }}
          >
            &lt;
          </motion.button>
          <h1 className="text-lg font-black font-mono text-pink-400">CONTACT</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="max-w-xl mx-auto pt-20 p-4 pb-24 space-y-4">
        
        {/* TALK TO AI51 */}
        <motion.button
          onClick={() => navigate(createPageUrl('AI51'))}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 border-4 border-cyan-400 p-4"
          style={{ boxShadow: '4px 4px 0px #000' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <span className="text-3xl">🤖</span>
            </motion.div>
            <div className="text-left">
              <p className="text-black font-black font-mono text-sm">TALK TO AI51</p>
              <p className="text-black/70 font-mono text-[9px]">Ask me anything about Earth51!</p>
            </div>
          </div>
          <p className="text-black font-mono text-[10px] text-left">
            I can explain how Earth51 works, answer safety questions, help with technical issues, and chat about cleaning up the planet! 🌍
          </p>
        </motion.button>

        {/* EMAIL OPTIONS */}
        <div className="space-y-3">
          {/* GENERAL */}
          <div 
            onClick={() => copyEmail('hello@earth51.love')}
            className="bg-green-600 border-4 border-green-500 p-4 cursor-pointer hover:bg-green-700 transition-colors"
            style={{ boxShadow: '4px 4px 0px #000' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-6 h-6 text-white" />
              <p className="text-white font-black font-mono text-sm">GENERAL QUESTIONS</p>
            </div>
            <p className="text-white font-mono text-xs mb-1">hello@earth51.love</p>
            <p className="text-white/70 font-mono text-[9px]">
              {copied === 'hello@earth51.love' ? '✓ Copied!' : 'Click to copy • General inquiries, partnerships, press'}
            </p>
          </div>

          {/* SUPPORT */}
          <div 
            onClick={() => copyEmail('support@earth51.love')}
            className="bg-cyan-600 border-4 border-cyan-500 p-4 cursor-pointer hover:bg-cyan-700 transition-colors"
            style={{ boxShadow: '4px 4px 0px #000' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="w-6 h-6 text-white" />
              <p className="text-white font-black font-mono text-sm">TECHNICAL SUPPORT</p>
            </div>
            <p className="text-white font-mono text-xs mb-1">support@earth51.love</p>
            <p className="text-white/70 font-mono text-[9px]">
              {copied === 'support@earth51.love' ? '✓ Copied!' : 'Click to copy • App issues, bugs, feature requests'}
            </p>
          </div>

          {/* SAFETY */}
          <div 
            onClick={() => copyEmail('safety@earth51.love')}
            className="bg-red-600 border-4 border-red-500 p-4 cursor-pointer hover:bg-red-700 transition-colors"
            style={{ boxShadow: '4px 4px 0px #000' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-white" />
              <p className="text-white font-black font-mono text-sm">SAFEGUARDING</p>
            </div>
            <p className="text-white font-mono text-xs mb-1">safety@earth51.love</p>
            <p className="text-white/70 font-mono text-[9px]">
              {copied === 'safety@earth51.love' ? '✓ Copied!' : 'Click to copy • Child safety concerns, abuse reports'}
            </p>
          </div>

          {/* PARENTS */}
          <div 
            onClick={() => copyEmail('parents@earth51.love')}
            className="bg-purple-600 border-4 border-purple-500 p-4 cursor-pointer hover:bg-purple-700 transition-colors"
            style={{ boxShadow: '4px 4px 0px #000' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6 text-white" />
              <p className="text-white font-black font-mono text-sm">FOR PARENTS</p>
            </div>
            <p className="text-white font-mono text-xs mb-1">parents@earth51.love</p>
            <p className="text-white/70 font-mono text-[9px]">
              {copied === 'parents@earth51.love' ? '✓ Copied!' : 'Click to copy • Privacy questions, parental controls'}
            </p>
          </div>

          {/* PRIVACY */}
          <div 
            onClick={() => copyEmail('privacy@earth51.love')}
            className="bg-yellow-600 border-4 border-yellow-500 p-4 cursor-pointer hover:bg-yellow-700 transition-colors"
            style={{ boxShadow: '4px 4px 0px #000' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🔒</span>
              <p className="text-black font-black font-mono text-sm">PRIVACY & DATA</p>
            </div>
            <p className="text-black font-mono text-xs mb-1">privacy@earth51.love</p>
            <p className="text-black/70 font-mono text-[9px]">
              {copied === 'privacy@earth51.love' ? '✓ Copied!' : 'Click to copy • Data deletion, GDPR/COPPA requests'}
            </p>
          </div>
        </div>

        {/* WHO WE ARE */}
        <div className="bg-black border-4 border-white p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-white font-black font-mono text-sm mb-2">👨‍👧 WHO MADE EARTH51:</p>
          <div className="space-y-2 text-white font-mono text-[10px]">
            <p>Earth51 was designed by <strong>Georgie (age 8)</strong> and her dad, built with love using AI51 and Base44 technology.</p>
            <p className="mt-2">It's part of <strong>Universal Frequency 51</strong> - a family of apps for healing yourself and the planet.</p>
            <p className="mt-2 text-cyan-400">We're a real family building real technology for real change. ♾️❤️</p>
          </div>
        </div>

        {/* RESPONSE TIME */}
        <div className="bg-gray-800 border-4 border-gray-700 p-3" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-gray-400 font-mono text-[9px]">
            <strong>Response time:</strong> We aim to reply within 24 hours (weekdays).<br/>
            For urgent safety concerns, email <strong>safety@earth51.love</strong> immediately.
          </p>
        </div>
      </div>
    </div>
  );
}