import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Earth51Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white" style={{ imageRendering: 'pixelated' }}>
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-green-500">
        <div className="max-w-xl mx-auto p-3 flex items-center justify-between">
          <motion.button
            onClick={() => navigate(createPageUrl('Earth51'))}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            className="w-10 h-10 bg-pink-500 border-3 border-pink-400 flex items-center justify-center font-black"
            style={{ boxShadow: '3px 3px 0px #000' }}
          >
            &lt;
          </motion.button>
          <h1 className="text-lg font-black font-mono text-green-400">TERMS</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="max-w-xl mx-auto pt-20 p-4 pb-24 space-y-4">
        {/* FOR KIDS */}
        <div className="bg-green-600 border-4 border-green-500 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-white font-black font-mono text-sm mb-2">👧👦 FOR KIDS:</p>
          <div className="space-y-2 text-white font-mono text-xs">
            <p>✓ Take photos of litter you collect</p>
            <p>✓ AI51 checks it's real</p>
            <p>✓ Earn P51 tokens (1kg = 1 P51)</p>
            <p>✓ Spend in shop or save up!</p>
            <p>✓ Always ask a parent before cleaning</p>
            <p>✓ Never touch dangerous stuff (needles, glass, etc)</p>
          </div>
        </div>

        {/* FOR PARENTS */}
        <div className="bg-cyan-600 border-4 border-cyan-500 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-white font-black font-mono text-sm mb-2">👨‍👩‍👧‍👦 FOR PARENTS:</p>
          <div className="space-y-2 text-white font-mono text-[10px]">
            <p><strong>COPPA COMPLIANT:</strong> No personal data collected from under-13s</p>
            <p><strong>ANONYMOUS BY DEFAULT:</strong> Works without login</p>
            <p><strong>PRIVACY-FIRST:</strong> Photos processed on-device before upload</p>
            <p><strong>EDUCATIONAL:</strong> Teaches AI literacy, environmental responsibility</p>
            <p><strong>NO ADS:</strong> Zero commercial tracking or advertising</p>
            <p><strong>OPEN SOURCE:</strong> Code publicly auditable</p>
            <p><strong>TOKENS:</strong> P51 stored locally, optional account for cloud sync</p>
          </div>
        </div>

        {/* THE RULES */}
        <div className="bg-purple-600 border-4 border-purple-500 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-white font-black font-mono text-sm mb-2">📜 THE RULES:</p>
          <div className="space-y-2 text-white font-mono text-[10px]">
            <p><strong>1. Be Honest:</strong> Only submit photos of litter YOU collected</p>
            <p><strong>2. Be Safe:</strong> Parent supervision recommended, avoid dangerous items</p>
            <p><strong>3. Be Kind:</strong> Respect nature and your community</p>
            <p><strong>4. No Cheating:</strong> AI detects fake/duplicate photos</p>
            <p><strong>5. Have Fun:</strong> You're healing Earth! 🌍</p>
          </div>
        </div>

        {/* ACCOUNT & DATA */}
        <div className="bg-yellow-600 border-4 border-yellow-500 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-black font-black font-mono text-sm mb-2">💾 YOUR DATA:</p>
          <div className="space-y-2 text-black font-mono text-[10px]">
            <p><strong>WITHOUT LOGIN:</strong> Everything stored on YOUR device only</p>
            <p><strong>WITH LOGIN (optional):</strong> Syncs balance + cleanups to cloud</p>
            <p><strong>PHOTOS:</strong> Analyzed by AI, then stored securely</p>
            <p><strong>DELETE ANYTIME:</strong> Contact support@earth51.love</p>
            <p><strong>NO SELLING:</strong> We never sell your data. Ever.</p>
          </div>
        </div>

        {/* LIABILITY */}
        <div className="bg-red-600 border-4 border-red-500 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-white font-black font-mono text-sm mb-2">⚠️ SAFETY FIRST:</p>
          <div className="space-y-2 text-white font-mono text-[10px]">
            <p>Earth51 is an educational tool. Parents/guardians are responsible for supervising children during cleanup activities.</p>
            <p>We are not liable for injuries during litter collection.</p>
            <p>Always wear gloves, avoid sharp objects, needles, or hazardous materials.</p>
            <p>If unsure, leave it and report it to local authorities.</p>
          </div>
        </div>

        {/* CONTACT */}
        <div className="bg-black border-4 border-white p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-white font-black font-mono text-sm mb-2">📧 QUESTIONS?</p>
          <div className="space-y-2 text-white font-mono text-[10px]">
            <p><strong>General:</strong> hello@earth51.love</p>
            <p><strong>Support:</strong> support@earth51.love</p>
            <p><strong>Safeguarding:</strong> safety@earth51.love</p>
            <p><strong>AI51 Chat:</strong> <button onClick={() => navigate(createPageUrl('AI51'))} className="text-cyan-400 underline">Talk to AI51</button></p>
          </div>
        </div>

        {/* UPDATES */}
        <div className="bg-gray-800 border-4 border-gray-700 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-gray-400 font-mono text-[9px]">
            Last updated: February 2026<br/>
            By using Earth51, you agree to these terms.<br/>
            We may update these terms - we'll notify you if we do.
          </p>
        </div>
      </div>
    </div>
  );
}