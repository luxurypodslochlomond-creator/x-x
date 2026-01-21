import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, Calendar, FileText, DollarSign, Users, Briefcase, Shield, Clock, Heart, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CB51 - What It Is & Why It Matters
 * Simple explainer for artists, managers, labels, investors
 * No tech jargon - just real problems solved
 */

export default function CB51AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      {/* HERO */}
      <div className="relative overflow-hidden border-b border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Radio className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              CB51
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">Your AI Co-Manager</p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Everything a working musician needs to run their career. Nothing they don't.
            </p>
          </motion.div>
        </div>
      </div>

      {/* THE PROBLEM */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-red-900/20 border-2 border-red-500/30 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-black text-red-400 mb-4">The Problem</h2>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-start gap-3">
              <span className="text-red-400 mt-1">•</span>
              <span>Artists juggle 20 different apps: email, calendar, spreadsheets, notes, WhatsApp, Instagram...</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-400 mt-1">•</span>
              <span>Gig offers buried in 500 unread emails</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-400 mt-1">•</span>
              <span>Band members can't see what's happening</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-400 mt-1">•</span>
              <span>No time to actually make music</span>
            </p>
          </div>
        </div>

        {/* THE SOLUTION */}
        <div className="bg-green-900/20 border-2 border-green-500/30 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-black text-green-400 mb-6">CB51 = Everything In One Place</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/60 border border-cyan-500/30 rounded-lg p-6">
              <Calendar className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Smart Calendar</h3>
              <p className="text-gray-400 text-sm">All gigs, sessions, deadlines in one view. Share with band instantly.</p>
            </div>

            <div className="bg-black/60 border border-purple-500/30 rounded-lg p-6">
              <FileText className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Gig Offers</h3>
              <p className="text-gray-400 text-sm">AI scans your email, extracts gig details, drafts professional replies.</p>
            </div>

            <div className="bg-black/60 border border-green-500/30 rounded-lg p-6">
              <DollarSign className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Money Tracking</h3>
              <p className="text-gray-400 text-sm">Invoices, expenses, who owes what. Simple as WhatsApp.</p>
            </div>

            <div className="bg-black/60 border border-pink-500/30 rounded-lg p-6">
              <Users className="w-8 h-8 text-pink-400 mb-3" />
              <h3 className="font-bold text-white mb-2">Band Dashboard</h3>
              <p className="text-gray-400 text-sm">Everyone sees the same info. No more "did you get that email?"</p>
            </div>
          </div>
        </div>

        {/* WHO IT'S FOR */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-white mb-6 text-center">Who Uses CB51?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 border-2 border-cyan-500/50 rounded-xl p-6 text-center">
              <Radio className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Working Musicians</h3>
              <p className="text-gray-400 text-sm">DJs, bands, solo artists juggling gigs + studio + admin</p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 border-2 border-purple-500/50 rounded-xl p-6 text-center">
              <Briefcase className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Managers</h3>
              <p className="text-gray-400 text-sm">Handling multiple artists without drowning in spreadsheets</p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/30 to-pink-900/10 border-2 border-pink-500/50 rounded-xl p-6 text-center">
              <Users className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Small Labels</h3>
              <p className="text-gray-400 text-sm">Managing roster without enterprise software costs</p>
            </div>
          </div>
        </div>

        {/* WHY IT WORKS */}
        <div className="bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20 border-2 border-cyan-500/30 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-black text-cyan-400 mb-6 text-center">Why CB51 Works</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-bold mb-1">Built by musicians, for musicians</p>
                <p className="text-gray-400 text-sm">Not generic project management. Music industry specific.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-bold mb-1">AI does the boring stuff</p>
                <p className="text-gray-400 text-sm">Email parsing, contract drafting, schedule conflicts - handled automatically.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-bold mb-1">5 hours/week back to making music</p>
                <p className="text-gray-400 text-sm">Less admin, more studio time.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-bold mb-1">Your data stays yours</p>
                <p className="text-gray-400 text-sm">P2P sync. Works offline. No Big Tech.</p>
              </div>
            </div>
          </div>
        </div>

        {/* PRICING */}
        <div className="bg-black/60 border-2 border-cyan-500/30 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-black text-white mb-6 text-center">Simple Pricing</h2>
          
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500 rounded-xl p-8 text-center">
              <p className="text-5xl font-black text-cyan-400 mb-2">£25/mo</p>
              <p className="text-gray-300 mb-6">Per artist or manager</p>
              <ul className="text-left space-y-2 text-gray-300 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Unlimited gigs & calendar
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  AI email assistant
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Band/team sharing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Finance tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Contract templates
                </li>
              </ul>
              <p className="text-xs text-gray-500">First month free for beta testers</p>
            </div>
          </div>
        </div>

        {/* THE DIFFERENCE */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-white mb-6">What Makes CB51 Different?</h2>
          
          <div className="bg-gradient-to-r from-pink-900/20 via-purple-900/20 to-cyan-900/20 border-2 border-pink-500/30 rounded-xl p-8">
            <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              We're not selling software. We're giving musicians their time back.
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built by UniversalFamily51 - the same team behind UF51 healing frequencies. 
              We understand artists because we <span className="text-pink-400 font-bold">are</span> artists.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            to={createPageUrl("CB51")}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white font-black px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl"
            style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)' }}
          >
            <Radio className="w-6 h-6" />
            Try CB51 Now
          </Link>
          <p className="text-gray-500 text-sm mt-4">First month free • Cancel anytime</p>
        </div>

      </div>

      {/* FOOTER */}
      <div className="border-t border-cyan-500/30 bg-black/60 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm mb-2">Built with ♾️❤️ by UniversalFamily51</p>
          <p className="text-gray-600 text-xs">Part of the UF51 ecosystem - healing frequencies, conscious tech, artist tools</p>
        </div>
      </div>

    </div>
  );
}