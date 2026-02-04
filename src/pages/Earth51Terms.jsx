import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Shield, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * EARTH51 TERMS - KID-FRIENDLY + PARENT SECTION
 * COPPA 2.0 / GDPR / UK Online Safety Act compliant
 */

export default function Earth51Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-cyan-500">
        <div className="max-w-4xl mx-auto p-3 flex items-center justify-between">
          <motion.button
            onClick={() => navigate(createPageUrl('Earth51'))}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-pink-500 flex items-center justify-center border-2 border-pink-400"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>

          <h1 className="text-xl font-black font-mono text-green-400">EARTH.LOVE RULES</h1>

          <div className="w-12"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-20 p-6 space-y-6">

        {/* FOR KIDS */}
        <div className="bg-green-500 border-4 border-green-400 p-6" style={{ boxShadow: '4px 4px 0px #000' }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🌍</span>
            <h2 className="text-2xl font-black font-mono text-black">FOR KIDS</h2>
          </div>

          <div className="space-y-3 text-black font-mono text-sm">
            <p className="font-bold">✓ BE HONEST</p>
            <p>Only submit real litter you actually picked up. No old photos.</p>

            <p className="font-bold">✓ BE SAFE</p>
            <p>Never pick up sharp things or dangerous stuff. Ask a grown-up first.</p>

            <p className="font-bold">✓ BE KIND</p>
            <p>This is for helping Earth, not tricking the system.</p>

            <p className="font-bold">✓ YOUR PRIVACY</p>
            <p>We never ask for your name or where you live. Just photos of litter!</p>

            <p className="font-bold">✓ $P51 COINS</p>
            <p>These are game coins, not real money. Use them in Volckano!</p>
          </div>
        </div>

        {/* FOR PARENTS */}
        <div className="bg-purple-500 border-4 border-purple-400 p-6" style={{ boxShadow: '4px 4px 0px #000' }}>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-black" />
            <h2 className="text-2xl font-black font-mono text-black">FOR PARENTS</h2>
          </div>

          <div className="space-y-4 text-black font-mono text-xs">
            <div>
              <p className="font-bold mb-2">DATA COLLECTION:</p>
              <ul className="space-y-1 ml-4">
                <li>✓ Default: Zero personal data collected</li>
                <li>✓ Photos checked on device only</li>
                <li>✓ Optional AI requires explicit consent</li>
                <li>✓ No names, emails, or locations stored</li>
                <li>✓ COPPA 2.0 / GDPR / UK Online Safety Act compliant</li>
              </ul>
            </div>

            <div>
              <p className="font-bold mb-2">AI USAGE (OPT-IN ONLY):</p>
              <ul className="space-y-1 ml-4">
                <li>• Photo sent to OpenAI for fraud detection</li>
                <li>• Weight estimation from visible items</li>
                <li>• Liveness check (real photo vs screenshot)</li>
                <li>• Photo NOT stored on OpenAI servers</li>
                <li>• Results returned, then deleted</li>
              </ul>
            </div>

            <div>
              <p className="font-bold mb-2">SAFETY:</p>
              <ul className="space-y-1 ml-4">
                <li>✓ Content moderation active</li>
                <li>✓ Inappropriate images blocked</li>
                <li>✓ No social features (no messaging)</li>
                <li>✓ Anonymous by design</li>
              </ul>
            </div>

            <div>
              <p className="font-bold mb-2">$P51 TOKENS:</p>
              <ul className="space-y-1 ml-4">
                <li>• Virtual game currency only</li>
                <li>• Not redeemable for cash (yet)</li>
                <li>• Named after scientist Rosalind Franklin</li>
                <li>• Used for in-game progression</li>
              </ul>
            </div>

            <div>
              <p className="font-bold mb-2">YOUR RIGHTS (GDPR):</p>
              <ul className="space-y-1 ml-4">
                <li>• Access your data (minimal - just submissions)</li>
                <li>• Delete your data anytime</li>
                <li>• Opt out of AI processing</li>
                <li>• Export your cleanup history</li>
              </ul>
            </div>

            <div>
              <p className="font-bold mb-2">CONTACT:</p>
              <p>Questions? Email: hello@universalfrequency51.com</p>
            </div>
          </div>
        </div>

        {/* LEGAL ENTITY */}
        <div className="bg-black border-2 border-white/30 p-4 text-center">
          <p className="text-white/60 font-mono text-xs">
            earth.love is part of Universal Frequency 51
          </p>
          <p className="text-white/60 font-mono text-xs mt-2">
            Community Interest Company (UK) • Asset-locked for public good
          </p>
          <p className="text-white/60 font-mono text-xs mt-2">
            Last updated: February 2026
          </p>
        </div>

        {/* BACK BUTTON */}
        <motion.button
          onClick={() => navigate(createPageUrl('Earth51'))}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-green-500 border-4 border-green-400 text-black py-4 font-black font-mono text-lg"
          style={{ boxShadow: '4px 4px 0px #000' }}
        >
          BACK TO GAME
        </motion.button>

      </div>
    </div>
  );
}