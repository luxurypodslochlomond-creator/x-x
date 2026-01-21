import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, Calendar, FileText, DollarSign, Users, Briefcase, Shield, Clock, CheckCircle, Zap, Brain, Mail, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CB51 - For Artist Managers
 * What it does, why it's different
 * No tech jargon
 */

export default function CB51AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      {/* HERO */}
      <div className="relative overflow-hidden border-b border-cyan-500/30">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Radio className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
            <h1 className="text-6xl md:text-7xl font-black mb-4 text-white">
              CB51
            </h1>
            <p className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">Your AI Co-Manager</p>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stop drowning in emails
            </p>
          </motion.div>
        </div>
      </div>

      {/* THE PROBLEM */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 border-2 border-red-500/50 rounded-2xl p-10 mb-16">
          <h2 className="text-3xl font-black text-white mb-6">You Know This Feeling</h2>
          <div className="space-y-4 text-gray-300 text-lg">
            <p className="flex items-start gap-3">
              <span className="text-red-400 text-2xl">→</span>
              <span>Saturday 11pm. Promoter emails about Tuesday. Band's asleep. You reply Monday. Gig's gone.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-400 text-2xl">→</span>
              <span>Drummer asks "did we say yes to that?" You search 4 WhatsApp groups. Can't find it.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-400 text-2xl">→</span>
              <span>Invoice from March still unpaid. You forgot. They forgot. £800 gone.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-400 text-2xl">→</span>
              <span>Artist 3 has a gig same night as Artist 5's session. Didn't spot it til yesterday.</span>
            </p>
          </div>
        </div>

        {/* THE INNOVATION */}
        <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/20 border-2 border-cyan-500/50 rounded-2xl p-10 mb-16">
          <h2 className="text-3xl font-black text-white mb-8 text-center">How It Actually Works</h2>
          
          <div className="space-y-6">
            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-cyan-400 text-3xl flex-shrink-0">→</div>
                <div>
                  <h3 className="font-black text-white text-xl mb-2">Watches Your Inbox</h3>
                  <p className="text-gray-400">Gig offer arrives 11pm Saturday. AI spots it, pulls out fee/date/venue, drafts reply. You wake up, approve, send. Done.</p>
                </div>
              </div>
            </div>

            <div className="bg-black/60 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-purple-400 text-3xl flex-shrink-0">→</div>
                <div>
                  <h3 className="font-black text-white text-xl mb-2">Band Sees It In-App</h3>
                  <p className="text-gray-400">Tap "send to band". Everyone votes on their phone. All yes? You reply. Someone says no? Move on. No group chat mess.</p>
                </div>
              </div>
            </div>

            <div className="bg-black/60 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-green-400 text-3xl flex-shrink-0">→</div>
                <div>
                  <h3 className="font-black text-white text-xl mb-2">Spots Clashes Before You</h3>
                  <p className="text-gray-400">One calendar. All artists. Flags double-bookings. Warns you before you say yes to something impossible.</p>
                </div>
              </div>
            </div>

            <div className="bg-black/60 border border-amber-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-amber-400 text-3xl flex-shrink-0">→</div>
                <div>
                  <h3 className="font-black text-white text-xl mb-2">Remembers How You Work</h3>
                  <p className="text-gray-400">Learns your email style. Your standard fee. Your rider requirements. Writes like you. Gets smarter with every reply.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WHO IT'S FOR */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Who This Is For</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 border-2 border-purple-500/50 rounded-2xl p-8 text-center">
              <Briefcase className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="font-black text-white text-xl mb-3">Working Managers</h3>
              <p className="text-gray-400">3-10 artists. Too many emails. Not enough hours.</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 border-2 border-cyan-500/50 rounded-2xl p-8 text-center">
              <Users className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="font-black text-white text-xl mb-3">Indie Labels</h3>
              <p className="text-gray-400">6-12 acts. Budget tight. Need something that just works.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/30 to-pink-900/10 border-2 border-pink-500/50 rounded-2xl p-8 text-center">
              <TrendingUp className="w-16 h-16 text-pink-400 mx-auto mb-4" />
              <h3 className="font-black text-white text-xl mb-3">DIY Artists</h3>
              <p className="text-gray-400">Managing yourself. Want help without hiring someone.</p>
            </div>
          </div>
        </div>

        {/* FEELS LIKE AN APP */}
        <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 border-2 border-purple-500/50 rounded-2xl p-10 mb-16">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Works Like An App</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/60 border border-purple-500/30 rounded-xl p-6">
              <p className="text-white font-black text-lg mb-3">Add to home screen</p>
              <p className="text-gray-400">iPhone, Android, laptop. One tap. Feels native.</p>
            </div>

            <div className="bg-black/60 border border-purple-500/30 rounded-xl p-6">
              <p className="text-white font-black text-lg mb-3">Works offline</p>
              <p className="text-gray-400">Flight mode, dodgy wifi, basement venue. Still works.</p>
            </div>

            <div className="bg-black/60 border border-purple-500/30 rounded-xl p-6">
              <p className="text-white font-black text-lg mb-3">No App Store</p>
              <p className="text-gray-400">No Apple tax. No Google approval. Just use it.</p>
            </div>

            <div className="bg-black/60 border border-purple-500/30 rounded-xl p-6">
              <p className="text-white font-black text-lg mb-3">Updates instant</p>
              <p className="text-gray-400">New features live immediately. No downloads.</p>
            </div>
          </div>
        </div>

        {/* NUMBERS */}
        <div className="bg-gradient-to-br from-green-900/30 to-green-900/10 border-2 border-green-500/50 rounded-2xl p-10 mb-16">
          <h2 className="text-3xl font-black text-white mb-8 text-center">The Reality</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-6xl font-black text-green-400 mb-3">5hrs</p>
              <p className="text-gray-400">Saved per artist per week</p>
            </div>

            <div className="text-center">
              <p className="text-6xl font-black text-cyan-400 mb-3">100%</p>
              <p className="text-gray-400">Gig offers tracked</p>
            </div>

            <div className="text-center">
              <p className="text-6xl font-black text-purple-400 mb-3">£0</p>
              <p className="text-gray-400">Lost to missed invoices</p>
            </div>
          </div>
        </div>

        {/* PRICING */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-8 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* FREE */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/10 border-2 border-green-500/50 rounded-2xl p-8">
              <p className="text-green-400 font-black text-sm mb-3">ARTISTS & MANAGERS</p>
              <p className="text-5xl font-black text-white mb-2">FREE</p>
              <p className="text-gray-400 text-sm mb-6">Forever</p>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>→ Full AI email parsing</p>
                <p>→ Unlimited artists & gigs</p>
                <p>→ Band coordination</p>
                <p>→ Calendar & invoices</p>
              </div>
            </div>

            {/* INDIE LABELS */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 border-2 border-cyan-500/50 rounded-2xl p-8">
              <p className="text-cyan-400 font-black text-sm mb-3">INDIE LABELS</p>
              <p className="text-5xl font-black text-white mb-2">£50</p>
              <p className="text-gray-400 text-sm mb-6">per month</p>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>→ Everything in Free</p>
                <p>→ Manage full roster</p>
                <p>→ Label dashboard</p>
                <p>→ Priority support</p>
              </div>
            </div>

            {/* WHITE LABEL */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 border-2 border-purple-500/50 rounded-2xl p-8">
              <p className="text-purple-400 font-black text-sm mb-3">MAJOR LABELS</p>
              <p className="text-5xl font-black text-white mb-2">Custom</p>
              <p className="text-gray-400 text-sm mb-6">your own version</p>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>→ universalmusic.cb51.com</p>
                <p>→ Your logo, your colours</p>
                <p>→ Feels like yours</p>
                <p>→ We handle everything</p>
              </div>
            </div>

          </div>
        </div>

        {/* WHY NOW */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-white mb-8">Why We Built This</h2>
          
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-2xl p-10 max-w-3xl mx-auto">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              We managed bands. Spent 15 hours a week chasing emails and invoices. Thought "there has to be a better way."
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Built by musicians for musicians. Free for working artists and managers. Labels who can afford it pay so everyone else doesn't have to.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            to={createPageUrl("CB51")}
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-black px-12 py-5 rounded-xl text-xl transition-all"
          >
            Start Using CB51
          </Link>
          <p className="text-gray-500 text-sm mt-4">Free for artists & managers forever</p>
        </div>

      </div>

      {/* FOOTER */}
      <div className="border-t border-cyan-500/30 bg-black/60 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm">Built by UniversalFamily51</p>
        </div>
      </div>

    </div>
  );
}