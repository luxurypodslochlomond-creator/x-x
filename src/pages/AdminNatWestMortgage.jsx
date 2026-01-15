import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Calendar, AlertCircle, CheckCircle, ClipboardList, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminNatWestMortgage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-block p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black">NATWEST MORTGAGE</h1>
          <p className="text-xl text-gray-300">Reference: 5521482 • You Negotiated This ♾️</p>
        </motion.div>

        {/* CURRENT STATUS - DEFERRAL ACTIVE */}
        <Card className="bg-gradient-to-r from-green-900/40 to-cyan-900/40 border-4 border-green-500 shadow-[0_0_80px_rgba(34,211,238,0.6)]">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-12 h-12 text-green-400" />
              <h2 className="text-3xl font-black text-green-300">DEFERRAL AGREED ✓</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-black/60 border-2 border-green-500 rounded-xl p-6">
                <p className="text-green-300 font-bold text-lg mb-3">2-MONTH PAYMENT DEFERRAL</p>
                <div className="space-y-2 text-white">
                  <p><strong>Period:</strong> 30/11/2025 to 30/12/2025</p>
                  <p><strong>What it means:</strong> You don't pay mortgage for 2 months</p>
                  <p><strong>What happens:</strong> Interest still accrues (total debt grows, but payments paused)</p>
                  <p><strong>Next payment due:</strong> 31/01/2026</p>
                </div>
              </div>

              <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-4">
                <p className="text-amber-300 font-bold mb-2">⚠️ IMPORTANT:</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Interest continues to accrue (you'll pay more total)</li>
                  <li>• But payments are PAUSED (gives you breathing room NOW)</li>
                  <li>• Deferral shows on credit file (won't kill your score)</li>
                  <li>• NatWest is working WITH you (good sign)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ACCOUNT DETAILS */}
        <Card className="bg-black border-2 border-cyan-500/50">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center gap-2">
              <ClipboardList className="w-6 h-6" />
              ACCOUNT DETAILS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-cyan-400 font-bold text-sm mb-1">Sort Code</p>
                <p className="text-white font-mono text-lg">600657</p>
              </div>
              <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-cyan-400 font-bold text-sm mb-1">Account Ending</p>
                <p className="text-white font-mono text-lg">766</p>
              </div>
              <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-cyan-400 font-bold text-sm mb-1">Reference</p>
                <p className="text-white font-mono text-lg">5521482</p>
              </div>
              <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-cyan-400 font-bold text-sm mb-1">Postcode</p>
                <p className="text-white font-mono text-lg">8QU</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CRITICAL DATES */}
        <Card className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-2 border-pink-500/50">
          <CardHeader>
            <CardTitle className="text-pink-300 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              CRITICAL DATES
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-4 bg-black/40 p-4 rounded-lg border border-pink-500/30">
                <div className="text-pink-400 font-bold text-lg min-w-fit">31/12/2025</div>
                <div>
                  <p className="text-white font-bold">Deferral Ends</p>
                  <p className="text-gray-400 text-sm">Last day of payment pause</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-red-900/20 p-4 rounded-lg border-2 border-red-500">
                <div className="text-red-400 font-bold text-lg min-w-fit">31/01/2026</div>
                <div>
                  <p className="text-white font-bold">⚠️ CONTACT NATWEST BEFORE THIS</p>
                  <p className="text-gray-300 text-sm">Review date - CALL THEM with your plan</p>
                  <p className="text-red-400 font-bold text-sm mt-1">Do not let this pass without contact</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CONTACT INFO */}
        <Card className="bg-black border-2 border-green-500/50">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Phone className="w-6 h-6" />
              NATWEST CONTACTS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
              <p className="text-green-400 font-bold mb-2">Primary Number</p>
              <p className="text-white text-2xl font-mono font-bold mb-1">0800 161 5954</p>
              <p className="text-gray-400 text-sm">Monday-Friday, 8am-5pm</p>
              <p className="text-gray-500 text-xs mt-2">Reference: P Uppal | Specialised Support Team</p>
            </div>

            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-cyan-400 font-bold mb-2">Online Chat</p>
              <p className="text-white">Visit: <strong>www.natwest.com/strugglingfinancially</strong></p>
              <p className="text-gray-400 text-sm mt-1">Chat with Cora (AI agent) - available 24/7</p>
            </div>

            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-bold mb-2">Free Support Partners</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• <strong>PayPlan:</strong> 0800 280 2816 (debt advice - FREE)</li>
                <li>• <strong>Relay UK:</strong> 18001 then 0800 161 5954 (if deaf/hard of hearing)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* YOUR ACTION PLAN */}
        <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-purple-300">ACTION PLAN (Before 31/01/2026)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="text-pink-400 font-black text-lg min-w-fit">1.</span>
                <div>
                  <p className="text-white font-bold">Get your income forecast</p>
                  <p className="text-gray-400 text-sm">How much will you earn by Jan 31? Be realistic.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 font-black text-lg min-w-fit">2.</span>
                <div>
                  <p className="text-white font-bold">Call PayPlan (0800 280 2816)</p>
                  <p className="text-gray-400 text-sm">Free debt advice. They help negotiate with lenders. Takes 1 call.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 font-black text-lg min-w-fit">3.</span>
                <div>
                  <p className="text-white font-bold">Call NatWest BEFORE Jan 31</p>
                  <p className="text-gray-400 text-sm">Say: "I want to discuss my options." Even partial payment is good.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 font-black text-lg min-w-fit">4.</span>
                <div>
                  <p className="text-white font-bold">Explore mortgage options</p>
                  <p className="text-gray-400 text-sm">Fixed vs variable, extend term, switch lender. Don't decide alone - ask NatWest.</p>
                </div>
              </li>
            </ol>

            <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4 mt-6">
              <p className="text-green-300 font-bold mb-2">✅ WHAT THIS MEANS:</p>
              <p className="text-white">You negotiated. NatWest is helping. You have time and options. Don't panic.</p>
            </div>
          </CardContent>
        </Card>

        {/* THE REAL TALK */}
        <Card className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/50">
          <CardContent className="p-8">
            <h3 className="text-cyan-300 font-bold text-lg mb-4">💚 REAL TALK</h3>
            <div className="space-y-3 text-gray-200">
              <p>You got a bank to PAUSE payments during hardship. That's not failure. That's negotiation. That's strength.</p>
              <p>Yes, interest accrues. But you get to breathe. That's the point.</p>
              <p>The mortgage won't be repossessed if you contact them before deadlines. Banks want payment plans, not empty houses.</p>
              <p className="text-cyan-400 font-bold mt-4">You're not drowning. You're floating. That's progress. ♾️❤️</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}