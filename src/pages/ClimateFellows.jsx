import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';

// The note a Fellow reads before they arrive — written to answer the only question
// a good volunteer actually has: will my hour here be worth anything, and will it
// still have my name on it in a year.
//
// This is deliberately not onboarding. There is no course, no tour, no dashboard to
// learn. Three jobs, what they keep, and what we will not do to them.

function Block({ n, title, children }) {
  return (
    <section className="mb-7 lg:mb-10">
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-[10px] font-black font-mono text-[#e2602a]">{n}</span>
        <h2 className="font-black uppercase text-[#141210] leading-tight" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 1.9vw, 28px)', letterSpacing: '-0.01em' }}>{title}</h2>
      </div>
      <div className="space-y-2.5 lg:space-y-3.5 text-[12px] lg:text-[13px] font-mono leading-relaxed lg:leading-[1.75] text-[#141210]">{children}</div>
    </section>
  );
}

function Rule({ children }) {
  return (
    <p className="border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 px-3 lg:px-5 py-2.5 lg:py-4 text-[11.5px] lg:text-[13px] font-mono leading-relaxed lg:leading-[1.75] text-[#141210]">{children}</p>
  );
}

function Go({ to, children }) {
  return (
    <Link to={createPageUrl(to)} className="border-b-2 border-[#141210] font-black text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e]">
      {children}
    </Link>
  );
}

export default function ClimateFellows() {
  return (
    <ClimateRecordShell
      eyebrow="For whoever is coming to help"
      marker="Three jobs · what you keep · what we will not ask"
      title="If you are coming to help"
      statement="There is no programme to complete here. There are three jobs, each of which puts something real on the record — or shows you why it should not."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International — and released to the world, the planet, all of us."
    >
      <Block n="01" title="Thirty seconds, if you have not seen this">
        <p>This record holds two things: positive climate initiatives worth copying, and emerging crises worth knowing about. Every entry carries where it came from, how well it is actually known, and the name of the person who signed it onto the record.</p>
        <p>That is the whole idea. It is not a feed, it is not a campaign, and it does not make money from anybody's attention.</p>
        <Rule>No source, no entry. If a claim cannot be traced to something outside this record, it does not go up.</Rule>
      </Block>

      <Block n="02" title="The job, in one sentence">
        <p>A person opens a link, reads what the source actually says, and then says one of three things: it holds, it does not hold, or it cannot be told from here.</p>
        <p>That is the checking. Everything else on this record already works — the pages, the addresses, the corrections, the music. What it is short of is somebody reading a source and answering honestly.</p>
        <p>Which means the useful thing about you here is not your degree. It is that you will actually open the link.</p>
      </Block>

      <Block n="03" title="The first hour, exactly">
        <p>Not a tour, and not a meeting. Open the <Go to="ClimateChecking">checking page</Go>, take one entry that is already waiting, follow its link to the origin, read it, and answer.</p>
        <p>The three answers are not the same thing, and the record keeps them apart on purpose: <strong>it holds</strong>, <strong>it does not hold</strong>, <strong>it cannot be told from here</strong>. A link that will not open is not a lie. Saying so is not a failure, and it is not the same as saying the entry is wrong.</p>
        <p>Write what you found in your own words. Short is fine. Somebody will read it and it will carry your name.</p>
        <Rule>An hour is the real commitment. Nobody is counting it, and nobody will ask you for it.</Rule>
      </Block>

      <Block n="04" title="Your first three sessions">
        <p><strong>One — check three entries already waiting.</strong> Pick them yourself. Do not pick the easy ones; pick the ones you half believe.</p>
        <p><strong>Two — bring one thing that deserves to be here.</strong> Something working that others could copy, or a crisis the world should know about — with its origin attached: the body that said it, the journal, the document. Not a screenshot and not a headline from somewhere that will not name itself.</p>
        <p><strong>Three — find one entry on this record you think is wrong.</strong> Not to be polite about it. This is the most valuable hour anybody can give this record, and it is how you find out whether it is real.</p>
        <Rule>Nothing on this record has ever improved because somebody was kind about it.</Rule>
      </Block>

      <Block n="05" title="What you keep">
        <p>Your name on what you wrote, permanently. A note is signed from the checking list rather than from your browser, so nobody can sign as you — and it can never be edited afterwards. A correction is a second note, with its own date, in the open.</p>
        <p>A link you can send anyone. Every entry has its own permanent address, and your note sits under the entry it was written on.</p>
        <p>A line of what you actually did that can be checked by clicking it. To a fellowship panel or an employer that is worth more than a certificate saying you took part.</p>
        <p>Your address is never shown to a reader. The record keeps it so it can reach you about your own notes. That is all it is for.</p>
      </Block>

      <Block n="06" title="What we will not do">
        <p>No training course. No dashboard to learn before you are allowed to start. No weekly call you have to sit through to count as involved.</p>
        <p>No quota, no target of entries per week, and no word like "content". Nothing you sign will be rewritten under your name by anybody, and nothing will be published as yours that you did not write.</p>
        <p>We will not put you in front of a number either. If you check five entries in an afternoon, the record says five.</p>
      </Block>

      <Block n="07" title="The honest part">
        <p>Most of it is boring. Most entries are broadly right, and nobody will ever read your note on them. The interesting ones are rare — that is exactly why finding one is worth the afternoon.</p>
        <p>If you stop after three sessions, that was a real contribution and you owe this record nothing. Volunteers leave. What you wrote stays, with your name on it.</p>
        <p>And if you tell us something on this record is wrong, it will be corrected on the entry itself, with the date and what changed. In daylight, not quietly.</p>
      </Block>

      <Block n="08" title="You do not have to wait for anything to be settled">
        <p>The record is already live and open. It does not need a name agreed, a launch date fixed, or a committee's permission before somebody can start reading sources.</p>
        {/* Janine, by email, 9 November: "Please change to belongs to the platform team."
            Her correction, in her words — the questions about the name and the launch are the
            platform team's, and they are not the reader's to settle. Nothing here names her as
            the owner of them, because she asked for exactly that. */}
        <p>Those are real questions and they belong to the platform team — not to you. If the name does change, it changes in the open, and every entry keeps its address either way.</p>
      </Block>

      <Block n="09" title="How to be let in">
        <p>Ask to be put on the checking list. One line, with your name exactly as you want it signed and the address you will sign in with. That is the whole application.</p>
        <p>Then read the <Go to="ClimateMethod">method</Go> — not to learn a system, but because it is the standard your notes will be held to, and you should see it before you put your name to anything.</p>
        <p>There are only two words inside this record. A <strong>keeper</strong> decides what goes on it. A <strong>checker</strong> reads a source and signs what they found — and that is what you are. "Fellow" is Trebuchet's word for you, and a good one; on the record it is a note on your line, not a third kind of person with its own keys.</p>
        <Rule>A machine can never sign this record. It has no name to sign with. Everything here rests on that one line.</Rule>
      </Block>
    </ClimateRecordShell>
  );
}