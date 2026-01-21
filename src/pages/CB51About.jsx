import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

/**
 * CB51 - For Artist Managers
 * Built by musicians who got sick of admin
 */

export default function CB51AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-8xl mb-6">📻</div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 text-white font-mono">
              CB51
            </h1>
            <p className="text-2xl md:text-3xl text-cyan-400 mb-4 font-mono">Your AI Co-Manager</p>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-mono">
              Stop drowning in emails
            </p>
          </motion.div>
        </div>
      </div>

      {/* THE PROBLEM */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-red-950/20 border-l-4 border-red-500 p-10 mb-16">
          <p className="text-4xl font-black text-white mb-8 font-mono">YOU KNOW THIS</p>
          <div className="space-y-6 text-gray-300 text-lg font-mono">
            <p>→ Saturday 11pm. Promoter emails about Tuesday. Band's asleep. You reply Monday. Gig's gone.</p>
            <p>→ Drummer asks "did we say yes to that?" You search 4 WhatsApp groups. Can't find it.</p>
            <p>→ Invoice from March still unpaid. You forgot. They forgot. £800 gone.</p>
            <p>→ Artist 3 has a gig same night as Artist 5's session. Didn't spot it til yesterday.</p>
          </div>
        </div>

        {/* THE INNOVATION */}
        <div className="border-l-4 border-cyan-500 p-10 mb-16">
          <p className="text-4xl font-black text-white mb-8 font-mono">HOW IT WORKS</p>
          
          <div className="space-y-8">
            <div>
              <p className="text-cyan-400 font-black text-2xl mb-2 font-mono">→ WATCHES YOUR INBOX</p>
              <p className="text-gray-400 text-lg font-mono">Gig offer arrives 11pm Saturday. AI spots it, pulls out fee/date/venue, drafts reply. You wake up, approve, send. Done.</p>
            </div>

            <div>
              <p className="text-purple-400 font-black text-2xl mb-2 font-mono">→ BAND VOTES IN-APP</p>
              <p className="text-gray-400 text-lg font-mono">Tap "send to band". Everyone votes on their phone. All yes? You reply. Someone says no? Move on. No group chat mess.</p>
            </div>

            <div>
              <p className="text-green-400 font-black text-2xl mb-2 font-mono">→ SPOTS CLASHES</p>
              <p className="text-gray-400 text-lg font-mono">One calendar. All artists. Flags double-bookings. Warns you before you say yes to something impossible.</p>
            </div>

            <div>
              <p className="text-amber-400 font-black text-2xl mb-2 font-mono">→ LEARNS YOU</p>
              <p className="text-gray-400 text-lg font-mono">Your email style. Your standard fee. Your rider. Writes like you. Gets smarter with every reply.</p>
            </div>
          </div>
        </div>

        {/* WHO IT'S FOR */}
        <div className="mb-16">
          <p className="text-4xl font-black text-white mb-8 font-mono">WHO THIS IS FOR</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-8">
              <p className="text-6xl mb-4">🎸</p>
              <p className="font-black text-white text-xl mb-3 font-mono">WORKING MANAGERS</p>
              <p className="text-gray-400 font-mono">3-10 artists. Too many emails. Not enough hours.</p>
            </div>

            <div className="bg-gray-900 p-8">
              <p className="text-6xl mb-4">🏢</p>
              <p className="font-black text-white text-xl mb-3 font-mono">INDIE LABELS</p>
              <p className="text-gray-400 font-mono">6-12 acts. Budget tight. Need something that just works.</p>
            </div>

            <div className="bg-gray-900 p-8">
              <p className="text-6xl mb-4">🎤</p>
              <p className="font-black text-white text-xl mb-3 font-mono">DIY ARTISTS</p>
              <p className="text-gray-400 font-mono">Managing yourself. Want help without hiring someone.</p>
            </div>
          </div>
        </div>

        {/* FEELS LIKE AN APP */}
        <div className="border-l-4 border-purple-500 p-10 mb-16">
          <p className="text-4xl font-black text-white mb-8 font-mono">WORKS LIKE AN APP</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-white font-black text-xl mb-2 font-mono">→ ADD TO HOME SCREEN</p>
              <p className="text-gray-400 font-mono">iPhone, Android, laptop. One tap. Feels native.</p>
            </div>

            <div>
              <p className="text-white font-black text-xl mb-2 font-mono">→ WORKS OFFLINE</p>
              <p className="text-gray-400 font-mono">Flight mode, dodgy wifi, basement venue. Still works.</p>
            </div>

            <div>
              <p className="text-white font-black text-xl mb-2 font-mono">→ NO APP STORE</p>
              <p className="text-gray-400 font-mono">No Apple tax. No Google approval. Just use it.</p>
            </div>

            <div>
              <p className="text-white font-black text-xl mb-2 font-mono">→ UPDATES INSTANT</p>
              <p className="text-gray-400 font-mono">New features live immediately. No downloads.</p>
            </div>
          </div>
        </div>

        {/* NUMBERS */}
        <div className="bg-green-950/20 p-10 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-7xl font-black text-green-400 mb-3 font-mono">5hrs</p>
              <p className="text-gray-500 font-mono text-sm">SAVED PER ARTIST PER WEEK</p>
            </div>

            <div>
              <p className="text-7xl font-black text-cyan-400 mb-3 font-mono">100%</p>
              <p className="text-gray-500 font-mono text-sm">GIG OFFERS TRACKED</p>
            </div>

            <div>
              <p className="text-7xl font-black text-purple-400 mb-3 font-mono">£0</p>
              <p className="text-gray-500 font-mono text-sm">LOST TO MISSED INVOICES</p>
            </div>
          </div>
        </div>

        {/* PRICING */}
        <div className="mb-16">
          <p className="text-4xl font-black text-white mb-12 font-mono">PRICING</p>
          
          <div className="space-y-6 max-w-3xl">
            
            {/* FREE */}
            <div className="bg-green-950/20 border-l-4 border-green-500 p-8">
              <div className="flex items-baseline gap-4 mb-6">
                <p className="text-6xl font-black text-green-400 font-mono">FREE</p>
                <p className="text-gray-500 font-mono">ARTISTS & MANAGERS</p>
              </div>
              <div className="space-y-2 text-gray-400 font-mono">
                <p>→ Full AI email parsing</p>
                <p>→ Unlimited artists & gigs</p>
                <p>→ Band coordination</p>
                <p>→ Calendar & invoices</p>
              </div>
            </div>

            {/* INDIE LABELS */}
            <div className="bg-cyan-950/20 border-l-4 border-cyan-500 p-8">
              <div className="flex items-baseline gap-4 mb-6">
                <p className="text-6xl font-black text-cyan-400 font-mono">£50</p>
                <p className="text-gray-500 font-mono">PER MONTH • INDIE LABELS</p>
              </div>
              <div className="space-y-2 text-gray-400 font-mono">
                <p>→ Everything in Free</p>
                <p>→ Manage full roster</p>
                <p>→ Label dashboard</p>
                <p>→ Priority support</p>
              </div>
            </div>

            {/* WHITE LABEL */}
            <div className="bg-purple-950/20 border-l-4 border-purple-500 p-8">
              <div className="flex items-baseline gap-4 mb-6">
                <p className="text-6xl font-black text-purple-400 font-mono">CUSTOM</p>
                <p className="text-gray-500 font-mono">MAJOR LABELS</p>
              </div>
              <div className="space-y-2 text-gray-400 font-mono">
                <p>→ universalmusic.cb51.com</p>
                <p>→ Your logo, your colours</p>
                <p>→ Feels like yours</p>
                <p>→ We handle everything</p>
              </div>
            </div>

          </div>
        </div>

        {/* WHY NOW */}
        <div className="border-l-4 border-gray-700 p-10 mb-16">
          <p className="text-4xl font-black text-white mb-8 font-mono">WHY WE BUILT THIS</p>
          
          <div className="space-y-6 max-w-3xl">
            <p className="text-xl text-gray-300 font-mono leading-relaxed">
              We managed bands. Spent 15 hours a week chasing emails and invoices. Thought "there has to be a better way."
            </p>
            <p className="text-lg text-gray-500 font-mono leading-relaxed">
              Built by musicians for musicians. Free for working artists and managers. Labels who can afford it pay so everyone else doesn't have to.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center border-t-4 border-cyan-500 pt-16">
          <Link 
            to={createPageUrl("CB51")}
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-black px-16 py-6 text-2xl transition-all font-mono"
          >
            START USING CB51
          </Link>
          <p className="text-gray-600 text-sm mt-6 font-mono">FREE FOR ARTISTS & MANAGERS FOREVER</p>
        </div>

      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-900 bg-black py-8 mt-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-700 text-sm font-mono">BUILT BY UNIVERSALFAMILY51</p>
        </div>
      </div>

    </div>
  );
}