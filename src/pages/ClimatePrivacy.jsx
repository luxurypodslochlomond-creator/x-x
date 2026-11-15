import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';

// Coolasfuck Privacy — honest, short, Beadie Signal style.
// What we hold, what we don't, why.

export default function ClimatePrivacy() {
  return (
    <ClimateRecordShell
      eyebrow="Privacy"
      marker="What we hold · what we don't"
      title="What We Hold, What We Don't"
      statement="Counted by country, never by person. No selling. No surprises. Here is exactly what happens."
      returnTo={createPageUrl('TogetherChangeClimate')}
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change."
    >
      <div className="relative">

        {/* 1. YOUR EMAIL */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            01 · Your Email
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              When you submit a solution, crisis, action, or comment, we ask for your email. We use it to contact you about your submission. That is it. We do not publish it on the record, sell it, or pass it to anyone.
            </p>
          </div>
        </section>

        {/* 2. YOUR COUNTRY */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            02 · Your Country
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              When you open an entry, we record two things: which entry was opened, and the country it was opened from — once per entry per country per half hour. That pairing is what lets the impact page show what is being read and where. We do not store your IP address, and nothing in that record points at a person: we know someone in your country opened that entry, and nothing more.
            </p>
            <p className="mt-2 text-[12px] font-mono leading-relaxed text-[#5a5246]">
              You may also choose to name your own nation or region — Scotland, Catalonia, Kurdistan, anywhere a country code fails you. That choice is kept in your own browser. It is only sent with a view if you pick it, and it is never linked to who you are.
            </p>
          </div>
        </section>

        {/* 3. AI ADVISORY */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            03 · The AI Advisory Note
          </h2>
          <div className="bg-[#f7f1e5] border-l-4 border-l-[#e2602a] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              An AI reads your submission first and writes an advisory note: spam, harmful content, relevance to climate. It never judges the science, and what you send is never used by us to train anything. The note is kept on the entry. An entry that carries the link to its source, and that the screen finds nothing wrong with, goes on the record as it arrives. Anything the screen is unsure of waits for a person. When a person decides, their name is on the entry as its editor — and an entry the screen cleared carries no editor name, because no person decided it.
            </p>
          </div>
        </section>

        {/* 4. WHAT WE DON'T HOLD */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            04 · What We Don't Hold
          </h2>
          <div className="bg-[#1e3a2b] text-[#efe7d6] border border-[#141210] p-4">
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
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            05 · Your Rights
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              You can ask us what we hold about you. You can ask us to correct it. You can ask us to remove your submission. Ask, and we will do it. Write to <a href="mailto:family@uf51.love" className="underline underline-offset-4 decoration-[#e2602a]">family@uf51.love</a> — a person reads it and answers.
            </p>
          </div>
        </section>

        {/* 6. THE PROMISE */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            06 · The Promise
          </h2>
          <div className="bg-[#f7f1e5] border-l-4 border-l-[#e2602a] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              This record exists to serve the people who use it, not to extract from them. That is the covenant. If we ever break it, you have every right to walk away and take your words with you.
            </p>
          </div>
        </section>

        {/* 7. THE LAWFUL BASIS */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            07 · The Lawful Basis
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4 space-y-2">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              Under UK GDPR (which applies to our UK and EU readers) and applicable US state privacy laws, we process your contact email on the basis of your consent, given when you submit. You can withdraw it at any time by asking us to remove your submission. We record the country a reader reads from on the basis of our legitimate interest in understanding the global reach of the record, with no personal data attached.
            </p>
          </div>
        </section>

        {/* 8. HOW LONG WE KEEP IT */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            08 · How Long We Keep It
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              Your submission stays for the life of the record, unless you ask us to remove it. Your email is kept until you withdraw consent. The advisory note stays on the entry itself, where anyone can read it. Country data is aggregated, with no link to any person. Nothing is kept longer than that.
            </p>
          </div>
        </section>

        {/* 9. WHERE YOUR DATA SITS */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            09 · Where Your Data Sits
          </h2>
          <div className="bg-[#f7f1e5] border-l-4 border-l-[#e2602a] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              The record runs on cloud infrastructure provided by Base44, which may process data outside the UK and EEA. Where data leaves the UK or EEA, it is covered by the provider's data processing terms and, where the law requires it, Standard Contractual Clauses. We hold the minimum data needed to run a public record, and we do not give it to advertisers, brokers, or third parties.
            </p>
          </div>
        </section>

        {/* 10. IF YOU'RE UNDER 13 */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            10 · If You're Under 13
          </h2>
          <div className="bg-[#f7f1e5] border-l-4 border-l-[#1e3a2b] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              We do not knowingly collect submissions from children under 13 without a parent or guardian. If you are under 13, ask a grown-up to submit for you. If you believe a child has submitted without consent, write to us and we will remove it.
            </p>
          </div>
        </section>

        {/* 11. IF SOMETHING BREAKS */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            11 · If Something Breaks
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              If a data breach is likely to risk your rights and freedoms, we notify the UK Information Commissioner's Office within 72 hours (for UK and EU readers) and affected US state regulators and users as required by applicable US state breach laws. We keep an internal log of any incident and what we did about it.
            </p>
          </div>
        </section>

        {/* 12. YOUR RIGHT TO COMPLAIN */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            12 · Your Right to Complain
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              If you are in the US, you have the right to complain to the Federal Trade Commission (ftc.gov) or your state attorney general. If you are in the UK or EU, you have the right to complain to the UK Information Commissioner's Office (ico.org.uk) or your national data protection authority. You do not have to complain to us first, though we hope you will, so we can fix it.
            </p>
          </div>
        </section>

        {/* 13. WHO IS RESPONSIBLE */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            13 · Who Is Responsible
          </h2>
          <div className="bg-[#f7f1e5] border-l-4 border-l-[#e2602a] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              This record is run today as a public service by the team that built it. The organisation that will permanently hold and run it — and the person accountable for your data — will be named here before the record moves to its own home, which is being arranged now. Until then, every privacy question is answered personally by the people running the record, and your data is never passed to anyone else.
            </p>
          </div>
        </section>

        {/* 14. MUSIC AND LISTENER LINES */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            14 · Music and Listener Lines
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4 space-y-2">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              If you give the record a track, we hold the exact master file you sent, the picture and words you gave with it, and your email — used only to reach you about your own work, never shown on a card and never handed to a listener. The format, length and fingerprint of the file are read from the file itself, so what the record says about your master is the master's own truth.
            </p>
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              A listener's line is different. We ask for no email and no account, a name only if they choose to give one, and the line is kept exactly as written. If a line ever has to come down for something unlawful, the line is not reprinted and the removal is stated on the track itself — a removal here is never silent.
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section className="mt-8 pt-6 border-t-2 border-[#141210]">
          <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-3">
            Questions about your data? Write to <a href="mailto:family@uf51.love" className="text-[#141210] underline underline-offset-4 decoration-[#e2602a]">family@uf51.love</a> — a person reads it and answers. The organisation that will hold the record permanently is still being arranged, and will be named here when it is. Until then, nothing you give us is sold, shared, or handed to anyone.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to={createPageUrl('ClimateTerms')} className="inline-flex items-center gap-2 px-3 py-2 bg-[#141210] text-[#efe7d6] text-[10px] font-black font-mono uppercase border border-[#141210] hover:bg-[#e2602a] transition-colors">
              Terms <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to={createPageUrl('TogetherChangeClimate')} className="inline-flex items-center gap-2 px-3 py-2 bg-[#f7f1e5] text-[#141210] text-[10px] font-black font-mono uppercase border border-[#141210] hover:bg-[#141210] hover:text-[#efe7d6] transition-colors">
              Back to the Record <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

      </div>
    </ClimateRecordShell>
  );
}