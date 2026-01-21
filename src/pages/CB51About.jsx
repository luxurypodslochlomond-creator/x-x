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
            <p className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">For Artist Managers</p>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Manage multiple artists without drowning in admin
            </p>
          </motion.div>
        </div>
      </div>

      {/* THE PROBLEM */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 border-2 border-red-500/50 rounded-2xl p-10 mb-16">
          <h2 className="text-3xl font-black text-white mb-6">You're Managing 5 Artists</h2>
          <div className="space-y-4 text-gray-300 text-lg">
            <p className="flex items-start gap-3">
              <span className="text-red-400 text-2xl">→</span>
              <span>127 unread emails with gig offers buried somewhere</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-400 text-2xl">→</span>
              <span>Band members asking "did you reply to that promoter?"</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-400 text-2xl">→</span>
              <span>£4,000 in unpaid invoices you forgot to chase</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-400 text-2xl">→</span>
              <span>Double-booked a session because you use 3 different calendars</span>
            </p>
          </div>
          <p className="text-gray-500 text-sm mt-6 italic">Sound familiar?</p>
        </div>

        {/* THE INNOVATION */}
        <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/20 border-2 border-cyan-500/50 rounded-2xl p-10 mb-16">
          <h2 className="text-3xl font-black text-white mb-8 text-center">What Makes It Different</h2>
          
          <div className="space-y-6">
            <div className="bg-black/60 border border-cyan-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Mail className="w-10 h-10 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-black text-white text-xl mb-2">AI Reads Your Email</h3>
                  <p className="text-gray-400">Scans Gmail automatically. Finds gig offers. Extracts fee, date, venue. Drafts professional replies for you to approve.</p>
                </div>
              </div>
            </div>

            <div className="bg-black/60 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Users className="w-10 h-10 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-black text-white text-xl mb-2">Band Coordination</h3>
                  <p className="text-gray-400">Send offers to the band. They vote yes/no in-app. You reply when everyone's in. Zero WhatsApp chaos.</p>
                </div>
              </div>
            </div>

            <div className="bg-black/60 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Calendar className="w-10 h-10 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-black text-white text-xl mb-2">One Calendar For Everything</h3>
                  <p className="text-gray-400">All your artists. All their gigs, sessions, deadlines. One view. Export to Google Calendar if you want.</p>
                </div>
              </div>
            </div>

            <div className="bg-black/60 border border-amber-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Brain className="w-10 h-10 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-black text-white text-xl mb-2">Learns Your Style</h3>
                  <p className="text-gray-400">AI learns how you write emails, your fee negotiations, your standard terms. Gets better every time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WHO IT'S FOR */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Built For</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 border-2 border-purple-500/50 rounded-2xl p-8 text-center">
              <Briefcase className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="font-black text-white text-xl mb-3">Managers</h3>
              <p className="text-gray-400">Managing 3-10 artists. Need everything in one place.</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 border-2 border-cyan-500/50 rounded-2xl p-8 text-center">
              <Users className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="font-black text-white text-xl mb-3">Indie Labels</h3>
              <p className="text-gray-400">Small roster. Can't afford enterprise tools.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/30 to-pink-900/10 border-2 border-pink-500/50 rounded-2xl p-8 text-center">
              <TrendingUp className="w-16 h-16 text-pink-400 mx-auto mb-4" />
              <h3 className="font-black text-white text-xl mb-3">Self-Managed Artists</h3>
              <p className="text-gray-400">Doing it yourself. Need a co-manager.</p>
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

          <div className="mt-10 bg-black/60 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-white font-black text-xl mb-2">Music Industry Specific</p>
                <p className="text-gray-400">Not adapted from generic business software. Built from scratch for how managers actually work. By people who've managed artists.</p>
              </div>
            </div>
          </div>
        </div>

        {/* PRICING */}
        <div className="bg-black/60 border-2 border-cyan-500/50 rounded-2xl p-10 mb-16">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Pricing</h2>
          
          <div className="max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500 rounded-2xl p-10">
              <div className="text-center mb-8">
                <p className="text-6xl font-black text-cyan-400 mb-3">£25</p>
                <p className="text-gray-400 text-xl">per month per manager</p>
                <p className="text-gray-500 text-sm mt-2">Manage unlimited artists</p>
              </div>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>AI email scanning & parsing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Unlimited artists & gigs</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Band voting & coordination</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Calendar & finance tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Team access (band members free)</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-cyan-500/30">
                <p className="text-center text-gray-500 text-sm">First month free</p>
              </div>
            </div>
          </div>
        </div>

        {/* WHY NOW */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-white mb-8">Why This Exists</h2>
          
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-2xl p-10 max-w-3xl mx-auto">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Every manager we spoke to said the same thing: "I spend 15 hours a week on emails and admin. I became a manager to help artists, not to be a glorified PA."
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              So we built this. AI that actually understands the music industry. No learning curve. No enterprise nonsense. Just works.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            to={createPageUrl("CB51")}
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-black px-12 py-5 rounded-xl text-xl transition-all"
          >
            Get Early Access
          </Link>
          <p className="text-gray-500 text-sm mt-4">First 100 managers get first 3 months free</p>
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