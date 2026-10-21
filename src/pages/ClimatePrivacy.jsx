import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Coolasfuck Privacy — honest, short, Beadie Signal style.
// What we hold, what we don't, why.

export default function ClimatePrivacy() {
  return (
    <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative">
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">

        {/* BACK */}
        <Link to={createPageUrl('TogetherChangeClimate')} className="inline-flex items-center gap-2 text-[11px] font-mono font-black uppercase text-[#6b6258] hover:text-[#b3261e] transition-colors mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> The Record
        </Link>

        {/* HEADER */}
        <header className="mb-8 pb-6 border-b-2 border-[#1a1612]">
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-[#b3261e] mb-2">TWCC · PRIVACY</p>
          <h1 className="font-black uppercase text-[#1a1612] leading-[0.95]" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '44px', letterSpacing: '-0.03em' }}>
            What We Hold<br />What We Don't
          </h1>
          <p className="text-[12px] font-mono text-[#6b6258] mt-3 leading-relaxed">
            No tracking. No selling. No surprises. Here is exactly what happens.
          </p>
          <p className="text-[11px] font-mono font-black uppercase tracking-[0.14em] text-[#b3261e] mt-4">
            Together we can change the course of climate change
          </p>
        </header>

        {/* 1. YOUR EMAIL */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            01 · Your Email
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              When you submit a solution, crisis, action, or comment, we ask for your email. We use it to contact you about your submission. That is it. We do not publish it on the record, sell it, or pass it to anyone.
            </p>
          </div>
        </section>

        {/* 2. YOUR COUNTRY */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            02 · Your Country
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              When you read an entry, we record the country you are reading from, so we can see the global reach of the record. We do not store your IP address. We do not know who you are. We only know someone in your country read something.
            </p>
          </div>
        </section>

        {/* 3. AI ADVISORY */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            03 · The AI Advisory Note
          </h2>
          <div className="bg-[#efe7d6] border-l-4 border-l-[#e2602a] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              When you submit, an AI reads it first and writes an advisory note for the human reviewer. The AI checks for spam, harmful content, and whether the submission is relevant to climate. It does not judge the science. It does not publish anything. A human reads the note and makes the call.
            </p>
          </div>
        </section>

        {/* 4. WHAT WE DON'T HOLD */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            04 · What We Don't Hold
          </h2>
          <div className="bg-[#1e3a2b] text-[#efe7d6] border border-[#1a1612] p-4">
            <ul className="space-y-2 text-[12px] font-mono leading-relaxed">
              <li>— Your IP address. Never stored.</li>
              <li>— Your name, unless you put it on your submission.</li>
              <li>— Your precise location. Country only.</li>
              <li>— Tracking cookies or ad profiles.</li>
              <li>— Your data sold to anyone. Ever.</li>
            </ul>
          </div>
        </section>

        {/* 5. YOUR RIGHTS */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            05 · Your Rights
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              You can ask us what we hold about you. You can ask us to correct it. You can ask us to remove your submission. Ask, and we will do it — the contact address is published here as soon as the record's permanent home is arranged.
            </p>
          </div>
        </section>

        {/* 6. THE PROMISE */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            06 · The Promise
          </h2>
          <div className="bg-[#efe7d6] border-l-4 border-l-[#b3261e] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              This record exists to serve the people who use it, not to extract from them. That is the covenant. If we ever break it, you have every right to walk away and take your words with you.
            </p>
          </div>
        </section>

        {/* 7. THE LAWFUL BASIS */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            07 · The Lawful Basis
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4 space-y-2">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              Under UK GDPR (which applies to our UK and EU readers) and applicable US state privacy laws, we process your contact email on the basis of your consent, given when you submit. You can withdraw it at any time by asking us to remove your submission. We record the country a reader reads from on the basis of our legitimate interest in understanding the global reach of the record, with no personal data attached.
            </p>
          </div>
        </section>

        {/* 8. HOW LONG WE KEEP IT */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            08 · How Long We Keep It
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              Your submission stays on the record for the life of the record, unless you ask us to remove it. Your contact email is kept until you withdraw consent. The AI advisory note is kept as part of the audit trail. Country-level reading data is aggregated and kept indefinitely, with no link to any person. We do not keep your data longer than needed.
            </p>
          </div>
        </section>

        {/* 9. WHERE YOUR DATA SITS */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            09 · Where Your Data Sits
          </h2>
          <div className="bg-[#efe7d6] border-l-4 border-l-[#e2602a] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              The record runs on cloud infrastructure provided by Base44, which may process data outside the UK and EEA. Where data leaves the UK or EEA, it is protected by Standard Contractual Clauses and the provider's binding corporate rules, as required by UK GDPR. We hold the minimum data needed to run a public record, and we do not give it to advertisers, brokers, or third parties.
            </p>
          </div>
        </section>

        {/* 10. IF YOU'RE UNDER 13 */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            10 · If You're Under 13
          </h2>
          <div className="bg-[#efe7d6] border-l-4 border-l-[#1e3a2b] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              We do not knowingly collect submissions from children under 13 without a parent or guardian. If you are under 13, ask a grown-up to submit for you. If you believe a child has submitted without consent, write to us and we will remove it.
            </p>
          </div>
        </section>

        {/* 11. IF SOMETHING BREAKS */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            11 · If Something Breaks
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              If a data breach is likely to risk your rights and freedoms, we notify the UK Information Commissioner's Office within 72 hours (for UK and EU readers) and affected US state regulators and users as required by applicable US state breach laws. We keep an internal log of any incident and what we did about it.
            </p>
          </div>
        </section>

        {/* 12. YOUR RIGHT TO COMPLAIN */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            12 · Your Right to Complain
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              If you are in the US, you have the right to complain to the Federal Trade Commission (ftc.gov) or your state attorney general. If you are in the UK or EU, you have the right to complain to the UK Information Commissioner's Office (ico.org.uk) or your national data protection authority. You do not have to complain to us first, though we hope you will, so we can fix it.
            </p>
          </div>
        </section>

        {/* 13. WHO IS RESPONSIBLE */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '22px', letterSpacing: '-0.02em' }}>
            13 · Who Is Responsible
          </h2>
          <div className="bg-[#efe7d6] border-l-4 border-l-[#b3261e] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              This record is run today as a public service by the team that built it. The organisation that will permanently hold and run it — and the person accountable for your data — will be named here before the record moves to its own home, which is being arranged now. Until then, every privacy question is answered personally by the people running the record, and your data is never passed to anyone else.
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section className="mt-8 pt-6 border-t-2 border-[#1a1612]">
          <p className="text-[11px] font-mono text-[#6b6258] leading-relaxed mb-3">
            Questions about your data? A contact address will be published here as soon as the record's permanent home is arranged. Until then, nothing you give us is sold, shared, or handed to anyone.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to={createPageUrl('ClimateTerms')} className="inline-flex items-center gap-2 px-3 py-2 bg-[#1a1612] text-[#efe7d6] text-[10px] font-black font-mono uppercase border border-[#1a1612] hover:bg-[#b3261e] transition-colors">
              Terms <ArrowRight className="w-3 h-3" />
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