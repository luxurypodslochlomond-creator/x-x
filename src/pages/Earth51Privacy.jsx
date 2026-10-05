import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

export default function Earth51Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white" style={{ imageRendering: 'pixelated' }}>
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-cyan-500">
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
          <h1 className="text-lg font-black font-mono text-cyan-400">PRIVACY</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="max-w-xl mx-auto pt-20 p-4 pb-24 space-y-4">
        {/* SIMPLE VERSION (KIDS) */}
        <div className="bg-cyan-600 border-4 border-cyan-500 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-white font-black font-mono text-sm mb-2">🔒 YOUR PRIVACY (SIMPLE):</p>
          <div className="space-y-2 text-white font-mono text-xs">
            <p>✓ We DON'T ask for your name</p>
            <p>✓ We DON'T ask where you live</p>
            <p>✓ We DON'T share your photos</p>
            <p>✓ We DON'T track you around the internet</p>
            <p>✓ We DON'T show you ads</p>
            <p>✓ Everything stays on YOUR phone</p>
          </div>
        </div>

        {/* WHAT WE COLLECT */}
        <div className="bg-green-600 border-4 border-green-500 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-white font-black font-mono text-sm mb-2">📊 WHAT WE COLLECT:</p>
          <div className="space-y-2 text-white font-mono text-[10px]">
            <p><strong>WITHOUT LOGIN (anonymous):</strong></p>
            <p>• Photos of litter (analyzed by AI, stored locally first)</p>
            <p>• Approximate location (city/region, NOT your exact address)</p>
            <p>• Weight you entered</p>
            <p>• P51 balance (stored on YOUR device)</p>
            
            <p className="mt-3"><strong>WITH LOGIN (optional):</strong></p>
            <p>• Email address (for account recovery only)</p>
            <p>• Cleanup history (synced to cloud)</p>
            <p>• P51 balance (synced to cloud)</p>
          </div>
        </div>

        {/* WHAT WE DON'T COLLECT */}
        <div className="bg-pink-600 border-4 border-pink-500 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-white font-black font-mono text-sm mb-2">🚫 WHAT WE DON'T COLLECT:</p>
          <div className="space-y-2 text-white font-mono text-[10px]">
            <p>✗ Full name or age</p>
            <p>✗ Exact GPS coordinates</p>
            <p>✗ School or home address</p>
            <p>✗ Phone number</p>
            <p>✗ Photos of YOU (only litter photos)</p>
            <p>✗ Browsing history</p>
            <p>✗ Device identifiers for ads</p>
          </div>
        </div>

        {/* HOW WE USE IT */}
        <div className="bg-purple-600 border-4 border-purple-500 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-white font-black font-mono text-sm mb-2">🎯 HOW WE USE YOUR DATA:</p>
          <div className="space-y-2 text-white font-mono text-[10px]">
            <p><strong>AI51 Scanning:</strong> Detects litter type, weight, brands</p>
            <p><strong>Fraud Prevention:</strong> Stops fake/duplicate photos</p>
            <p><strong>Environmental Research:</strong> Anonymous pollution tracking</p>
            <p><strong>Corporate Accountability:</strong> Which brands pollute most</p>
            <p><strong>Grant Applications:</strong> Showing impact to funders</p>
            <p className="mt-2 text-yellow-300">We NEVER sell data. We NEVER show ads based on your data.</p>
          </div>
        </div>

        {/* COPPA COMPLIANCE */}
        <div className="bg-yellow-600 border-4 border-yellow-500 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-black font-black font-mono text-sm mb-2">👶 COPPA COMPLIANCE (Under 13s):</p>
          <div className="space-y-2 text-black font-mono text-[10px]">
            <p>Earth51 is designed for children and complies with COPPA (Children's Online Privacy Protection Act).</p>
            <p><strong>No account required:</strong> Kids can use anonymously</p>
            <p><strong>Parental consent:</strong> Recommended before creating account</p>
            <p><strong>Minimal data:</strong> Only what's needed for app to work</p>
            <p><strong>Right to delete:</strong> Parents can request data deletion anytime</p>
            <p><strong>No third-party ads:</strong> Zero commercial tracking</p>
          </div>
        </div>

        {/* AI51 TECH */}
        <div className="bg-gradient-to-r from-cyan-500 to-purple-500 border-4 border-cyan-400 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-black font-black font-mono text-sm mb-2">🤖 AI51 PRIVACY TECH:</p>
          <div className="space-y-2 text-black font-mono text-[10px]">
            <p><strong>On-Device Processing:</strong> Photos analyzed on YOUR phone first</p>
            <p><strong>Privacy-First Vision:</strong> Only essential data sent to server</p>
            <p><strong>Encrypted Storage:</strong> All data encrypted at rest</p>
            <p><strong>No Facial Recognition:</strong> AI only looks at LITTER, not people</p>
            <p><strong>Blockchain Verification:</strong> Cleanups cryptographically signed</p>
            <p><strong>Open Source:</strong> Code publicly auditable on GitHub</p>
          </div>
        </div>

        {/* YOUR RIGHTS */}
        <div className="bg-green-600 border-4 border-green-500 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-white font-black font-mono text-sm mb-2">✊ YOUR RIGHTS:</p>
          <div className="space-y-2 text-white font-mono text-[10px]">
            <p><strong>Access:</strong> See what data we have about you</p>
            <p><strong>Delete:</strong> Request full account deletion</p>
            <p><strong>Correct:</strong> Fix any wrong information</p>
            <p><strong>Export:</strong> Download your cleanup history</p>
            <p><strong>Opt-Out:</strong> Stop any data collection (use anonymously)</p>
            <p className="mt-2">Contact: <strong>privacy@earth51.love</strong></p>
          </div>
        </div>

        {/* PARENTS */}
        <div className="bg-orange-600 border-4 border-orange-500 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-white font-black font-mono text-sm mb-2">👨‍👩‍👧 FOR PARENTS:</p>
          <div className="space-y-2 text-white font-mono text-[10px]">
            <p>You have the right to:</p>
            <p>• Review data collected about your child</p>
            <p>• Refuse further collection</p>
            <p>• Request deletion of child's data</p>
            <p>• Be notified of any material changes to this policy</p>
            <p className="mt-2">We recommend supervising your child's use and reviewing photos before submission.</p>
            <p className="mt-2">Questions? <strong>parents@earth51.love</strong></p>
          </div>
        </div>

        {/* CONTACT */}
        <div className="bg-black border-4 border-white p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-white font-black font-mono text-sm mb-2">📧 PRIVACY QUESTIONS:</p>
          <div className="space-y-2 text-white font-mono text-[10px]">
            <p><strong>Privacy Officer:</strong> privacy@earth51.love</p>
            <p><strong>Safeguarding:</strong> safety@earth51.love</p>
            <p><strong>Data Deletion:</strong> delete@earth51.love</p>
            <p><strong>Talk to AI51:</strong> <button onClick={() => navigate(createPageUrl('AI51'))} className="text-cyan-400 underline">Ask me anything!</button></p>
          </div>
        </div>

        {/* UPDATES */}
        <div className="bg-gray-800 border-4 border-gray-700 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
          <p className="text-gray-400 font-mono text-[9px]">
            Last updated: February 2026<br/>
            If we change this policy, we'll notify you via email (if logged in) or on-screen message.<br/>
            Material changes affecting children require renewed parental consent.
          </p>
        </div>
      </div>
    </div>
  );
}