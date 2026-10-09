import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Coolasfuck Terms — honest, short, Beadie Signal style.
// Not legal jargon. A letter from the record.

export default function ClimateTerms() {
  return (
    <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative">
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">

        {/* BACK */}
        <Link to={createPageUrl('TogetherChangeClimate')} className="inline-flex items-center gap-2 text-[11px] font-mono font-black uppercase text-[#6b6258] hover:text-[#b3261e] transition-colors mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> The Record
        </Link>

        {/* HEADER */}
        <header className="mb-8 pb-6 border-b-2 border-[#1a1612]">
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-[#b3261e] mb-2">TWCC · TERMS</p>
          <h1 className="font-black uppercase text-[#1a1612] leading-[0.95]" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '44px', letterSpacing: '-0.03em' }}>
            The Ground<br />We Stand On
          </h1>
          <p className="text-[12px] font-mono text-[#6b6258] mt-3 leading-relaxed">
            Not legal jargon. Just honest ground rules for the record. Read it in a minute.
          </p>
        </header>

        {/* 1. WHAT THIS IS */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            01 · What This Is
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              Together We Change Climate is a public record of verified climate solutions and crises, after Janine Selendy. Anyone can read it. Anyone can submit to it. Nothing gets published without a human reading it first.
            </p>
          </div>
        </section>

        {/* 2. WHAT YOU CAN SUBMIT */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            02 · What You Can Submit
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4 space-y-2">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              Solutions (a positive action to replicate), crises (an emergency to alert the world to), actions (cleanups, plantings, meetings), and comments on entries.
            </p>
            <p className="text-[12px] font-mono leading-relaxed text-[#6b6258]">
              Your email is required. We use it to contact you about your submission. We do not publish it, sell it, or spam you.
            </p>
          </div>
        </section>

        {/* 3. HUMAN REVIEW */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            03 · Human Review
          </h2>
          <div className="bg-[#efe7d6] border-l-4 border-l-[#1e3a2b] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              Every submission is read by a real person before it goes live. An AI advisory note helps screen for spam and relevance, but the AI never judges the science. A human decides. That is the promise.
            </p>
          </div>
        </section>

        {/* 4. BE HONEST */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            04 · Be Honest
          </h2>
          <div className="bg-[#efe7d6] border-l-4 border-l-[#b3261e] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              Don't submit fake solutions, stolen content, or spam. If you do, we reject it. If you keep doing it, we block you. The record is only as strong as the honesty of the people who feed it.
            </p>
          </div>
        </section>

        {/* 5. YOUR WORDS */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            05 · Your Words
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              You keep the copyright to what you write. By submitting, you let us publish it on this record and translate it so nobody is left behind. You can ask us to take it down by emailing the address below.
            </p>
          </div>
        </section>

        {/* 6. NO WARRANTY */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            06 · No Warranty
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              We do our best to verify what gets published, but this is a community record, not a peer-reviewed journal. Use your own judgment. Check the sources. Think for yourself.
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section className="mt-8 pt-6 border-t-2 border-[#1a1612]">
          <p className="text-[11px] font-mono text-[#6b6258] leading-relaxed mb-3">
            Questions about these terms? Write to the address on the record. We read everything.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to={createPageUrl('ClimatePrivacy')} className="inline-flex items-center gap-2 px-3 py-2 bg-[#1a1612] text-[#efe7d6] text-[10px] font-black font-mono uppercase border border-[#1a1612] hover:bg-[#b3261e] transition-colors">
              Privacy <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to={createPageUrl('TogetherChangeClimate')} className="inline-flex items-center gap-2 px-3 py-2 bg-[#efe7d6] text-[#1a1612] text-[10px] font-black font-mono uppercase border border-[#1a1612] hover:bg-[#1a1612] hover:text-[#efe7d6] transition-colors">
              Back to the Record <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

        {/* FOOT */}
        <p className="text-center mt-10 text-[9px] font-mono font-black tracking-[0.3em] text-[#6b6258]/40">x = x</p>
      </div>
    </div>
  );
}