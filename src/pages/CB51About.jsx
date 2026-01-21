import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio } from 'lucide-react';

/**
 * CB51 About - Explainer for managers & labels
 * Matches CB51 design: cyan, amber, pink, tight spacing
 */

export default function CB51AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* HERO - TIGHT */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Radio className="w-10 h-10 text-cyan-400" />
          <h1 className="text-5xl font-black text-cyan-400 font-mono">CB51</h1>
        </div>
        <p className="text-2xl text-white font-mono mb-3">Your AI Co-Manager</p>
        <p className="text-gray-500 font-mono text-sm">Stop drowning in emails</p>
      </div>

      {/* THE PROBLEM - COMPACT */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <div className="bg-pink-500/10 border-l-4 border-pink-500 p-6">
          <p className="text-pink-400 font-black font-mono mb-4">THE PROBLEM</p>
          <div className="space-y-3 text-gray-400 font-mono text-sm">
            <p>→ Saturday 11pm. Promoter emails. Band's asleep. You reply Monday. Gig's gone.</p>
            <p>→ "Did we say yes to that?" Search 4 WhatsApp groups. Can't find it.</p>
            <p>→ Invoice from March. Still unpaid. You forgot. £800 gone.</p>
          </div>
        </div>
      </div>

      {/* THE SOLUTION - COMPACT */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <div className="space-y-6">
          
          <div className="border-l-4 border-cyan-500 pl-4">
            <p className="text-cyan-400 font-black font-mono text-lg mb-2">AI WATCHES YOUR INBOX</p>
            <p className="text-gray-500 font-mono text-sm">Gig offer arrives 11pm. AI spots it, pulls fee/date/venue, drafts reply. You approve. Done.</p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <p className="text-purple-400 font-black font-mono text-lg mb-2">BAND VOTES IN-APP</p>
            <p className="text-gray-500 font-mono text-sm">Send to band. They vote. All yes? Reply. Someone says no? Move on. Zero WhatsApp chaos.</p>
          </div>

          <div className="border-l-4 border-amber-500 pl-4">
            <p className="text-amber-400 font-black font-mono text-lg mb-2">ONE CALENDAR</p>
            <p className="text-gray-500 font-mono text-sm">All artists. All gigs. Flags clashes before you say yes.</p>
          </div>

        </div>
      </div>

      {/* WHO IT'S FOR - COMPACT */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <p className="text-white font-black font-mono mb-6">WHO THIS IS FOR</p>
        <div className="grid grid-cols-3 gap-4">
          
          <div className="bg-gray-900/50 p-4 border border-gray-800">
            <p className="text-white font-black font-mono text-sm mb-2">MANAGERS</p>
            <p className="text-gray-600 font-mono text-xs">3-10 artists</p>
          </div>

          <div className="bg-gray-900/50 p-4 border border-gray-800">
            <p className="text-white font-black font-mono text-sm mb-2">INDIE LABELS</p>
            <p className="text-gray-600 font-mono text-xs">6-12 acts</p>
          </div>

          <div className="bg-gray-900/50 p-4 border border-gray-800">
            <p className="text-white font-black font-mono text-sm mb-2">DIY ARTISTS</p>
            <p className="text-gray-600 font-mono text-xs">Self-managed</p>
          </div>

        </div>
      </div>

      {/* PRICING - COMPACT */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <p className="text-white font-black font-mono mb-6">PRICING</p>
        
        <div className="space-y-4">
          
          {/* FREE */}
          <div className="bg-green-500/10 border-l-4 border-green-500 p-4">
            <div className="flex items-baseline gap-3 mb-3">
              <p className="text-4xl font-black text-green-400 font-mono">FREE</p>
              <p className="text-gray-600 font-mono text-xs">ARTISTS & MANAGERS</p>
            </div>
            <div className="space-y-1 text-gray-500 font-mono text-xs">
              <p>→ Full AI email parsing</p>
              <p>→ Unlimited artists & gigs</p>
              <p>→ Band coordination</p>
            </div>
          </div>

          {/* INDIE */}
          <div className="bg-cyan-500/10 border-l-4 border-cyan-500 p-4">
            <div className="flex items-baseline gap-3 mb-3">
              <p className="text-4xl font-black text-cyan-400 font-mono">£50</p>
              <p className="text-gray-600 font-mono text-xs">PER MONTH • INDIE LABELS</p>
            </div>
            <div className="space-y-1 text-gray-500 font-mono text-xs">
              <p>→ Everything in Free</p>
              <p>→ Manage full roster</p>
              <p>→ Priority support</p>
            </div>
          </div>

          {/* WHITE LABEL */}
          <div className="bg-purple-500/10 border-l-4 border-purple-500 p-4">
            <div className="flex items-baseline gap-3 mb-3">
              <p className="text-4xl font-black text-purple-400 font-mono">CUSTOM</p>
              <p className="text-gray-600 font-mono text-xs">MAJOR LABELS</p>
            </div>
            <div className="space-y-1 text-gray-500 font-mono text-xs">
              <p>→ universalmusic.cb51.com</p>
              <p>→ Your logo, your colours</p>
              <p>→ We handle everything</p>
            </div>
          </div>

        </div>
      </div>

      {/* WORKS LIKE AN APP - COMPACT */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <p className="text-white font-black font-mono mb-6">WORKS LIKE AN APP</p>
        <div className="grid grid-cols-2 gap-4">
          
          <div className="bg-gray-900/50 p-4 border border-gray-800">
            <p className="text-white font-mono text-sm mb-1">Add to home screen</p>
            <p className="text-gray-600 font-mono text-xs">One tap. Feels native.</p>
          </div>

          <div className="bg-gray-900/50 p-4 border border-gray-800">
            <p className="text-white font-mono text-sm mb-1">Works offline</p>
            <p className="text-gray-600 font-mono text-xs">Dodgy wifi. Still works.</p>
          </div>

          <div className="bg-gray-900/50 p-4 border border-gray-800">
            <p className="text-white font-mono text-sm mb-1">No App Store</p>
            <p className="text-gray-600 font-mono text-xs">No Apple tax. Just use it.</p>
          </div>

          <div className="bg-gray-900/50 p-4 border border-gray-800">
            <p className="text-white font-mono text-sm mb-1">Updates instant</p>
            <p className="text-gray-600 font-mono text-xs">New features. No downloads.</p>
          </div>

        </div>
      </div>

      {/* WHY WE BUILT THIS - COMPACT */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <div className="bg-gray-900/50 border border-gray-800 p-6">
          <p className="text-white font-black font-mono mb-4">WHY WE BUILT THIS</p>
          <p className="text-gray-500 font-mono text-sm leading-relaxed">
            We managed bands. Spent 15 hours a week on admin. Built this so you don't have to. Free for working musicians. Labels who can afford it pay so everyone else doesn't.
          </p>
        </div>
      </div>

      {/* CTA - COMPACT */}
      <div className="max-w-3xl mx-auto px-6 pb-12">
        <Link 
          to={createPageUrl("CB51")}
          className="block w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 text-center font-mono transition-all"
        >
          START USING CB51
        </Link>
        <p className="text-gray-700 text-xs mt-3 text-center font-mono">FREE FOR ARTISTS & MANAGERS FOREVER</p>
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-900 py-6">
        <p className="text-gray-800 text-xs text-center font-mono">BUILT BY UNIVERSALFAMILY51</p>
      </div>

    </div>
  );
}