import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio } from 'lucide-react';

/**
 * CB51 About - COOLASFUCK branded
 * Musicians for musicians. Zero corporate BS.
 */

export default function CB51AboutPage() {
  
  // Set CB51 branding for shares
  useEffect(() => {
    document.title = 'CB51 - Your AI Co-Manager';
    
    const setMeta = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const setMetaName = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Open Graph for WhatsApp, iMessage, etc.
    setMeta('og:title', 'CB51 - Your AI Co-Manager');
    setMeta('og:description', 'Stop drowning in emails. AI watches your inbox. Band votes in-app. One calendar. Free for artists & managers forever.');
    setMeta('og:site_name', 'CB51');
    setMeta('og:type', 'website');
    setMeta('og:image', 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/cb51-share.png');
    
    // Twitter
    setMetaName('twitter:title', 'CB51 - Your AI Co-Manager');
    setMetaName('twitter:description', 'Stop drowning in emails. AI watches your inbox. Band votes in-app. One calendar. Free for artists & managers forever.');
    
    // General description
    setMetaName('description', 'Stop drowning in emails. AI watches your inbox. Band votes in-app. One calendar. Free for artists & managers forever.');
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* HERO */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <Radio className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
        <h1 className="text-6xl md:text-8xl font-black text-cyan-400 font-mono mb-4">CB51</h1>
        <p className="text-2xl md:text-3xl text-white font-mono mb-2">YOUR AI CO-MANAGER</p>
        <p className="text-amber-400 font-mono text-lg">STOP DROWNING IN EMAILS</p>
      </div>

      {/* THE REALITY - PINK BLOCK */}
      <div className="bg-pink-500 py-12 mb-12">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-black font-black font-mono text-2xl mb-8 text-center">THE REALITY</p>
          <div className="space-y-4 text-black font-mono text-base max-w-2xl mx-auto">
            <p>→ Gig offer arrives Saturday 11pm. Band's asleep. You reply Monday. Too late. Lost £500.</p>
            <p>→ Band member asks "did we confirm that?" You search WhatsApp. Nothing. Promoter's annoyed.</p>
            <p>→ Invoice from March sitting unpaid. You forgot to chase. They forgot to pay. £800 gone.</p>
          </div>
        </div>
      </div>

      {/* THE SOLUTION - CYAN BLOCK */}
      <div className="bg-cyan-400 py-12 mb-12">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-black font-black font-mono text-2xl mb-8 text-center">CB51 WATCHES</p>
          <div className="space-y-4 text-black font-mono text-base max-w-2xl mx-auto">
            <p>→ Gig offer arrives 11pm. AI spots it, pulls fee/date/venue, drafts reply. You approve. Done.</p>
            <p>→ Send to band. They vote. All yes? Reply. Someone says no? Move on. Zero WhatsApp chaos.</p>
            <p>→ All artists. All gigs. One calendar. Flags clashes before you say yes.</p>
          </div>
        </div>
      </div>

      {/* WHO IT'S FOR */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <p className="text-white font-black font-mono text-2xl mb-8 text-center">WHO THIS IS FOR</p>
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="border-4 border-cyan-400 p-6">
            <p className="text-cyan-400 font-black font-mono text-xl mb-3">MANAGERS</p>
            <p className="text-white font-mono text-sm mb-2">3-10 artists</p>
            <p className="text-gray-400 font-mono text-xs">Too many emails. Not enough hours.</p>
          </div>

          <div className="border-4 border-amber-400 p-6">
            <p className="text-amber-400 font-black font-mono text-xl mb-3">INDIE LABELS</p>
            <p className="text-white font-mono text-sm mb-2">6-12 acts</p>
            <p className="text-gray-400 font-mono text-xs">Budget tight. Need something that just works.</p>
          </div>

          <div className="border-4 border-pink-400 p-6">
            <p className="text-pink-400 font-black font-mono text-xl mb-3">DIY ARTISTS</p>
            <p className="text-white font-mono text-sm mb-2">Self-managed</p>
            <p className="text-gray-400 font-mono text-xs">Doing everything yourself. Zero backup.</p>
          </div>

        </div>
      </div>

      {/* PRICING - BIG BLOCKS */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <p className="text-white font-black font-mono text-2xl mb-8 text-center">PRICING</p>
        
        <div className="space-y-8">
          
          {/* FREE */}
          <div className="border-8 border-green-500 p-8">
            <div className="text-center mb-6">
              <p className="text-7xl font-black text-green-400 font-mono mb-2">FREE</p>
              <p className="text-gray-400 font-mono text-sm">ARTISTS & MANAGERS FOREVER</p>
            </div>
            <div className="space-y-2 text-white font-mono text-base max-w-xl mx-auto">
              <p>→ Full AI email parsing</p>
              <p>→ Unlimited artists & gigs</p>
              <p>→ Band coordination</p>
              <p>→ Calendar & invoices</p>
            </div>
          </div>

          {/* INDIE */}
          <div className="border-8 border-cyan-400 p-8">
            <div className="text-center mb-6">
              <p className="text-7xl font-black text-cyan-400 font-mono mb-2">£50</p>
              <p className="text-gray-400 font-mono text-sm">PER MONTH • INDIE LABELS</p>
            </div>
            <div className="space-y-2 text-white font-mono text-base max-w-xl mx-auto">
              <p>→ Everything in Free</p>
              <p>→ Manage full roster</p>
              <p>→ Label dashboard</p>
              <p>→ Priority support</p>
            </div>
          </div>

          {/* WHITE LABEL */}
          <div className="border-8 border-purple-400 p-8">
            <div className="text-center mb-6">
              <p className="text-7xl font-black text-purple-400 font-mono mb-2">CUSTOM</p>
              <p className="text-gray-400 font-mono text-sm">MAJOR LABELS</p>
            </div>
            <div className="space-y-2 text-white font-mono text-base max-w-xl mx-auto">
              <p>→ universalmusic.cb51.com</p>
              <p>→ Your logo, your colours</p>
              <p>→ We handle setup & hosting</p>
              <p>→ £5k one-time setup</p>
            </div>
          </div>

        </div>
      </div>

      {/* WORKS LIKE AN APP - AMBER BLOCK */}
      <div className="bg-amber-400 py-12 mb-12">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-black font-black font-mono text-2xl mb-8 text-center">WORKS LIKE AN APP</p>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="border-4 border-black p-4">
              <p className="text-black font-mono text-base font-bold">Add to home screen</p>
              <p className="text-black/70 font-mono text-sm">iPhone, Android, laptop. One tap. Feels native.</p>
            </div>
            <div className="border-4 border-black p-4">
              <p className="text-black font-mono text-base font-bold">Works offline</p>
              <p className="text-black/70 font-mono text-sm">Flight mode, dodgy wifi, basement venue. Still works.</p>
            </div>
            <div className="border-4 border-black p-4">
              <p className="text-black font-mono text-base font-bold">No App Store</p>
              <p className="text-black/70 font-mono text-sm">No Apple tax. No Google approval. Just use it.</p>
            </div>
            <div className="border-4 border-black p-4">
              <p className="text-black font-mono text-base font-bold">Updates instant</p>
              <p className="text-black/70 font-mono text-sm">New features appear. No downloads. No waiting.</p>
            </div>
          </div>
        </div>
      </div>

      {/* WHY WE BUILT THIS */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="border-4 border-white p-8">
          <p className="text-white font-black font-mono text-2xl mb-6 text-center">WHY WE BUILT THIS</p>
          <p className="text-gray-300 font-mono text-lg leading-relaxed text-center max-w-2xl mx-auto">
            We managed bands. Spent 15 hours a week on admin emails nobody reads until it's too late. Built CB51 so you don't have to. Free for working musicians because that's how it should be. Labels who can afford it pay so everyone else doesn't.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <Link 
          to={createPageUrl("CB51")}
          className="block w-full bg-cyan-400 hover:bg-cyan-300 text-black font-black py-6 text-center font-mono text-2xl transition-all border-4 border-cyan-400 hover:border-white"
        >
          START USING CB51
        </Link>
        <p className="text-gray-600 text-sm mt-4 text-center font-mono">FREE FOR ARTISTS & MANAGERS FOREVER</p>
      </div>

      {/* FOOTER */}
      <div className="border-t-4 border-gray-900 py-8">
        <p className="text-gray-700 text-xs text-center font-mono">BUILT BY MUSICIANS FOR MUSICIANS</p>
        <p className="text-gray-800 text-xs text-center font-mono mt-1">UNIVERSALFAMILY51</p>
      </div>

    </div>
  );
}