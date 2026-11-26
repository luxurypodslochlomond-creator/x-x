import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CopyLine from '@/components/climate/CopyLine';
import { recordAddress } from '@/components/climate/recordAddress';

// ── SIX QUESTIONS, ANSWERED IN THE ORDER THEY WERE ASKED ────────────────────────
// Alina Sen at CEEW asked six things in one email on 26 November, then asked for five or
// ten minutes on a call. Five of the six are answerable in writing, and answering them in
// writing first is the whole courtesy: the call is then for what a page cannot settle,
// instead of for facts somebody has to read out loud.
//
// The order here is HER order, not ours. A page that reorders somebody's questions has
// answered the ones it found easiest.
//
// Two facts on it are read live from the record rather than typed in — how many drawings
// are on the wall, and how many of them are CEEW's — because a number on a page is either
// the record's own count or it is a claim.

const CEEW_ARTIST = 'What On Earth!®';

const Answer = ({ n, ask, children }) => (
  <section className="mt-7 border-t border-record-ink/15 pt-4">
    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-record-red">{n} · Her question</p>
    <h2 className="mt-1 text-[17px] leading-snug lg:text-[21px]" style={{ fontFamily: 'var(--font-reading)' }}>
      “{ask}”
    </h2>
    <div className="mt-2.5 space-y-2.5 text-[13.5px] leading-relaxed text-record-ink/90 lg:text-[15px]" style={{ fontFamily: 'var(--font-reading)' }}>
      {children}
    </div>
  </section>
);

export default function ClimateWorkshopAnswers() {
  const [wall, setWall] = useState(null);

  useEffect(() => {
    let live = true;
    base44.entities.ClimateCartoon
      .filter({ status: 'published' }, { limit: 500 })
      .then((page) => {
        if (!live) return;
        const items = Array.isArray(page) ? page : page.items;
        setWall({
          all: items.length,
          ceew: items.filter((c) => (c.artist_name || '').trim() === CEEW_ARTIST).length,
        });
      });
    return () => {
      live = false;
    };
  }, []);

  return (
    <ClimateRecordShell
      eyebrow="The record · answers for CEEW · 26 November 2026"
      marker="Six questions asked by Alina Sen · answered in her order"
      title="Before the five-minute call"
      statement="Alina Sen of CEEW asked six things in one email, and then asked for five or ten minutes to talk them through. All six can be answered in writing, so they are answered here — in her order, not ours — and the call can be spent on the parts a page cannot settle."
      returnTo="/ClimateWorkshop"
      returnLabel="The hour, as it is set down"
      footer="Written for one correspondent before a call. Nothing personal is on it: no addresses, no phone numbers, no joining link."
      mobileCompact
      wide
    >
      <p className="text-[13.5px] leading-relaxed text-record-ink/90 lg:text-[15px]" style={{ fontFamily: 'var(--font-reading)' }}>
        Thank you for the deck. Every drawing in it we have a file for is already hung, with the creator and
        producer details you wrote, credited exactly as you wrote them.
      </p>

      <Answer n="01" ask="How will the two hours be conducted?">
        <p>
          The order is Janine Selendy’s, not ours. She sent a draft agenda on 23 November and corrected it on the
          24th, and it is printed in her own order, item by item, on the hour’s page: her opening, Francis on the
          biennial, Brian on the platform, the cartoonists presenting their own work, CEEW presenting its cartoons,
          questions from the room, and her closing remarks. The record’s speaking time in that hour is two minutes —
          the slot she granted — and it hands straight back to Francis.
        </p>
        <p>
          One thing worth settling before Sunday: the festival’s printed programme lists her session as one hour at
          3pm West Africa (2pm UK) on Sunday 29 November, and the invitation speaks of two. The record prints the
          programme’s time and adds nothing to it. The length is the host’s to set, and whatever she sets, the page
          says that instead.
        </p>
      </Answer>

      <Answer n="02" ask="Who are the other participants?">
        <ul className="space-y-1.5">
          <li><strong>Janine M. H. Selendy</strong> — hosts the hour. Founded Horizon International at Yale; four decades of climate communication. She opens it, closes it, and takes the room for questions.</li>
          <li><strong>Francis Umendu Odupute</strong> — initiated the CartoonAFRICA International Biennial in 2012 and has carried its SDG cartoon campaign since. He opens on the biennial and takes the room for the drawings.</li>
          <li><strong>Alina Sen, CEEW</strong> — item six of the agenda gives five to seven minutes with CEEW’s cartoons.</li>
          <li><strong>Brian Hughes</strong> — two minutes on the platform, then straight back to Francis.</li>
          <li><strong>The cartoonists on the wall</strong> — every drawing carries the name of the hand that made it, so the room can see who is being shown and not only who is speaking.</li>
          <li><strong>The room</strong> — the biennial’s own audience, in the museum and online.</li>
        </ul>
      </Answer>

      <Answer n="03" ask="How many cartoons will be up on the wall?">
        {wall ? (
          <p>
            <strong>{wall.all} drawings</strong> are on the wall as this page was opened, <strong>{wall.ceew} of them
            CEEW’s</strong>. Each one carries the name of the hand that made it, the credit that holds it, and a link
            to where it was first published. Nothing is ranked and nothing is for sale; the wall stands in the order
            the drawings arrived.
          </p>
        ) : (
          <p>
            The wall is public and open now. Each drawing carries the name of the hand that made it, the credit that
            holds it, and a link to where it was first published.
          </p>
        )}
        <p>
          If a drawing in your deck is not among them, it is one we have not been given a file for. Send the link and
          it goes up the same day, with the creator and producer details exactly as you wrote them.
        </p>
      </Answer>

      <Answer n="04" ask="How many more cartoons will be added?">
        <p>
          As many as are given. The wall does not close when the hour does: a drawing can be sent in from the cartoon
          room at any hour, and it is hung with the same three things — who drew it, where it came from, and one line
          in the drawer’s own words on what it is for.
        </p>
        <p>
          Nothing goes up unseen. A drawing waits for a keeper, which is why nothing on the wall is spam and why
          nobody’s name ends up under somebody else’s work.
        </p>
      </Answer>

      <Answer n="05" ask="What is the overall objective, and what have you done before?">
        <p>
          In the host’s own words the topic is “Climate change &amp; the power of collective actions / creative
          interventions”. What the wall adds: a drawing is the one argument a person can hold in their hand and pass
          on without a translation, and this one keeps its credit attached wherever it is passed.
        </p>
        <p>
          The objective, plainly: the people who draw the climate and the people who study it in one conversation for
          an hour — and a public, credited, checkable wall still standing after the festival’s three days are over.
          CEEW’s own work is the largest part of what is on it.
        </p>
        <p>
          On prior experience: Francis has run this campaign since 2012 and shown it at the UN SDG Global Festival of
          Action in Bonn in 2019; Janine has worked in climate communication for four decades through Horizon
          International; and this is the first time that campaign’s drawings have had a public wall that names every
          hand and fingerprints every entry.
        </p>
      </Answer>

      <Answer n="06" ask="Will you share this on your social media, and may CEEW share it too?">
        <p>
          Yes, and nothing needs arranging. Every drawing has its own address and its own share card, with the artist,
          the credit and the source printed on the picture itself — so a share carries the attribution with it
          wherever it goes, and a repost cannot separate the drawing from the hand that made it.
        </p>
        <p>
          CEEW is welcome to share anything on the wall. Your drawings are shown with permission and their credit
          travels with the picture. The record will share the hour and the wall on its own channels on the day.
        </p>
      </Answer>

      <div className="mt-8 border-t border-record-ink/15 pt-4">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link to="/ClimateWorkshop" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide underline decoration-dotted underline-offset-4">
            The hour, in her order <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link to="/ClimateCartoons" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide underline decoration-dotted underline-offset-4">
            The wall <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-3 flex items-center gap-2 border border-record-ink/20 bg-record-bone/50 px-2 py-1.5">
          <code className="min-w-0 flex-1 truncate font-mono text-[11px] text-record-ink">{recordAddress('/ClimateWorkshopAnswers')}</code>
          <CopyLine text={recordAddress('/ClimateWorkshopAnswers')} label="Copy link" />
        </div>
      </div>
    </ClimateRecordShell>
  );
}