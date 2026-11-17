import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Printer } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import SessionBand from '@/components/climate/workshop/SessionBand';
import { TONGUES } from '@/components/climate/recordFigures';

// ── WHAT GETS SAID, WRITTEN OUT SO NOBODY HAS TO IMPROVISE ─────────────────────
// The hour has one eight-minute block on the record. This is that block, in full, the way
// it would actually be said out loud — because a page that describes a talk is not a talk,
// and the person holding the room should not be translating a summary into sentences at
// 3pm on a Sunday.
//
// It is written to be cut. Every paragraph stands on its own, so Janine can lift one, drop
// one, or hand the whole thing to somebody else and it still works.
//
// The hard rule throughout: no number we cannot count tonight, and no claim about the
// record that the record does not already make about itself. One false line under a promise
// about honesty costs the entire hour, and the room is sharp enough to find it.

const BLOCKS = [
  {
    at: '0:00 – 1:20',
    head: 'Everyone in this room has already done it',
    say: [
      'Every one of you has changed somebody’s mind with a drawing. Not with an argument — a drawing.',
      'That is why you are in this room and not in the hall next door. Somewhere in this city there is a person who thinks differently about something because of a line somebody drew. That is not a small thing. That is the only kind of persuasion that has ever actually worked.',
      'So I am not going to explain climate change to you. You know it. I am going to name the one thing that keeps going missing, and then I am going to get out of the way.',
    ],
  },
  {
    at: '1:20 – 3:00',
    head: 'The thing that goes missing',
    say: [
      'Collective action leaves almost no trace.',
      'A cleanup happens on a Saturday. A hundred people, one riverbank, fifty sacks. By Monday it is a photograph on somebody’s phone and a post that has stopped being seen. In ten years there is nothing to check. Nobody can find out what was tried here, who tried it, or whether the river is better.',
      'That is not a failure of the people who did it. It is a failure of the record. The action happened, and the evidence did not outlive the week.',
      'And in that gap, somebody else gets to tell the story. Usually the loudest. Usually the one with the budget.',
    ],
  },
  {
    at: '3:00 – 5:00',
    head: 'So we built a record — four things on every entry',
    say: [
      'What happened, in plain words. No adjectives doing the work of facts.',
      'Who says so. A named source, with a link to where it started. Not “studies show”. A body, a journal, a person who put their name to it.',
      'How well it is known. One source, two independent sources, or the body itself putting it on the record — printed on the entry, in the open. “One source” is an honest thing to print. Pretending otherwise is not.',
      'And a fingerprint. Every entry is sealed by the record’s own server, and anyone can recompute that seal in their own browser. If the words change without a new seal, the fingerprints stop matching, and the record says so about itself, in public, where everybody can see it.',
    ],
  },
  {
    at: '5:00 – 6:20',
    head: 'And four things it refuses',
    say: [
      'This part matters more to you than the four above.',
      'No advertising. No sponsorship — a gift never buys a place, a position or a mention in an entry. No likes, no ranking and no algorithm deciding which crisis you are allowed to see this morning: a solution in Nepal sits level with a solution in Niger, because both are true, not because one of them trended.',
      'And nothing of yours becomes a product. Nobody’s drawing is sold, licensed or sponsored. The name on a drawing belongs to the hand that drew it.',
    ],
  },
  {
    at: '6:20 – 7:20',
    head: 'Why there is a wall, and not just a database',
    say: [
      'The drawings sit on the same record as the entries, because a record is something people read, and a wall is how people read.',
      'There is a room of cartoons on it now. A drawing sent in waits for a keeper — a person, with a name — before it goes up, and the keeper’s reason is written down. Not a filter. A person who can be asked why.',
    ],
  },
  {
    at: '7:20 – 8:00',
    head: 'Hand it over',
    say: [
      'That is all I have.',
      'In nineteen minutes you are going to draw the last panel of a strip that does not have one yet. It goes on that wall with your name on it and nothing else about you.',
      'So the question is this: what does collective action look like in one frame, with no words in it at all?',
      'Draw it. I would rather watch you draw for nineteen minutes than talk at you for nineteen minutes.',
    ],
  },
];

const HANDS = [
  'Hold up a blank sheet with the empty frame on it before saying a single word about a record. The object lands first; the sentence second.',
  'Show one real entry on your own phone, scrolled by hand, with its source visible. No dashboard, no deck, no pointer, no screen share if you can help it — a phone in the hand is a thing they already trust.',
  'When you say “fingerprint”, do not explain the mathematics. Say what it does if somebody edits quietly, and stop.',
  'Stop at eight minutes. Actually stop, mid-sentence if the clock says so. The room will remember that you kept the promise about time more than anything you said.',
];

const REFUSALS = [
  '“AI”, “platform”, “ecosystem”, “solution”, “disrupt”, “scale”, “stakeholder”.',
  'Any number we cannot count tonight — seats, countries, readers, tonnes.',
  '“Sign up”, “free trial”, “check out our”, “visit our website” said out loud. It is on the card. Leave it there.',
  '“As Janine said” more than once. It is her hour; borrowing her authority twice stops being respect and starts being cover.',
  '“Nothing is stored.” It is not true, and one false line under a promise about honesty spends everything above it.',
];

const Section = ({ n, title, children }) => (
  <section className="mt-8">
    <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-record-red">{n}</p>
    <h2 className="mt-1 text-[19px] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
    <div className="mt-3">{children}</div>
  </section>
);

export default function ClimateWorkshopWords() {
  return (
    <ClimateRecordShell
      eyebrow="The record · 29 November 2026"
      marker="The eight minutes, in full"
      title="What gets said"
      statement="The one block on the record, written out the way it would be spoken — so the person holding the room is not translating a summary into sentences at three o’clock on a Sunday."
      returnTo="/ClimateWorkshop"
      returnLabel="The hour itself"
      footer="Written to be cut. Every paragraph stands alone, so one can go without the rest falling over."
    >
      <style>{`@media print { .no-print { display: none !important; } }`}</style>

      <SessionBand />

      <p className="mt-4 text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
        Eight minutes is shorter than people think and longer than most speakers can fill honestly. This runs to about six
        at a slow reading pace. The two minutes spare are for looking at the room and letting the last question sit there
        unanswered.
      </p>

      <div className="no-print mt-4">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex min-h-[44px] items-center justify-center gap-2 border-2 border-record-ink px-4 py-3 font-mono text-[11px] font-black uppercase"
        >
          <Printer className="h-4 w-4" /> Print the words
        </button>
      </div>

      <Section n="01 · The script" title="Eight minutes, out of the nineteen">
        <div className="divide-y divide-record-ink/15 border-y border-record-ink/15">
          {BLOCKS.map((b) => (
            <div key={b.at} className="py-4">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-mono text-[10.5px] font-bold tabular-nums text-record-red">{b.at}</span>
                <h3 className="font-mono text-[11px] uppercase tracking-wide text-record-muted">{b.head}</h3>
              </div>
              <div className="mt-2 space-y-2.5">
                {b.say.map((line) => (
                  <p key={line} className="text-[14.5px] leading-[1.65]" style={{ fontFamily: 'var(--font-reading)' }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section n="02 · Hands" title="What I would do with my hands">
        <ul className="space-y-2">
          {HANDS.map((line) => (
            <li key={line} className="border-l-2 border-record-ink/25 pl-3 text-[13px] leading-relaxed text-record-ink/85">{line}</li>
          ))}
        </ul>
      </Section>

      <Section n="03 · Refusals" title="What I would not say in that room">
        <ul className="space-y-1.5">
          {REFUSALS.map((line) => (
            <li key={line} className="text-[13px] leading-relaxed text-record-ink/85">— {line}</li>
          ))}
        </ul>
      </Section>

      <Section n="04 · Territories" title="A room from two continents, in one tongue">
        <p className="text-[13.5px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
          The session’s working tongue is English, because that is the festival’s. Everything else about it travels: the
          record reads in {TONGUES} tongues, this page included, through the record’s own tongue control, and the panel the
          room draws carries no words at all — which is the entire reason it is wordless.
        </p>
        <p className="mt-3 text-[13.5px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
          One real risk. The cartoon library the three examples come from is Indian, and a room of African and Asian artists
          will notice immediately if every reference on the wall comes from one continent. Say it out loud — the wall is open
          to every continent and it is short of African drawings — and if Francis can name three, put a second continent in
          the same nineteen minutes. That single change is the difference between a workshop and a showcase.
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-record-ink/85">
          And none of the framing: no flags, no “developing world”, no “we are here to help”. A record that begins by
          deciding who needs help has already ranked the room.
        </p>
      </Section>

      <div className="no-print mt-8 border-t border-record-ink/15 pt-4">
        <Link to="/ClimateWorkshop" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide underline decoration-dotted underline-offset-4">
          The hour, to the minute <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </ClimateRecordShell>
  );
}