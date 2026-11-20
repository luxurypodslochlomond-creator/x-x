import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import ShareCardButton from '@/components/climate/ShareCardButton';
import cartoonImageSource from '@/components/climate/cartoons/cartoonImageSources';
import { CARTOON_COVER, CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';
import { buildFrancisShareCard, FRANCIS_CARD } from '@/components/climate/cartoons/francisCard';
import { recordOrigin } from '@/components/climate/recordAddress';

// ── ONE HAND'S OWN ADDRESS ON THE RECORD ───────────────────────────────────────
// Brian, 20 November: "Francis… new artwork coming bro and needs a platform for it to show
// the world… he knows his stuff."
//
// He does, and until today the record said so only as a credit under a frame: his name under
// the catalogue cover, his name in the editors' line. That is a mention, not a platform. So
// this is his page — his own address, on a record that will still be here in ten years,
// which he can send to a paper, a festival, a ministry or a school and which says what he
// does in his own words rather than in ours.
//
// Two rules hold it. Everything quoted is his, kept exactly as he wrote it, typos and all:
// the record never tidies a person's own sentence. And nothing of his family is here. What
// he told a person about his wife and children was told to a person; putting their names on
// a public page would be the record spending somebody else's privacy on its own warmth.
//
// The wall itself is where his work lands: this page asks the same table the wall asks, so
// the moment a keeper puts a new drawing up under his name it appears here without anybody
// editing this file — which is the whole point of giving a man a page rather than a caption.
const NAME = 'Francis Umendu Odupute';

// His own introduction, 20 November 2026 — the professional half of it, verbatim. The rest of
// that message stays where it was sent.
const HIS_WORDS = [
  'I am a visual artist and a journalist.',
  'I am the President of the Beautiful Feet International (BFI) Ministry, a faith-based organization; I am the Editor-in-chief of the African Press Cartoon services, and I initiated and curator the CartoonAFRICA International Biennial (CAIB), a platform that I have been deploying to collaborate with like-minds globally to advocate for sustainable development and Africa’s productivity through the prism of graphic humour.',
];

const Section = ({ n, title, children }) => (
  <section className="mt-9">
    <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-record-red lg:text-[11px]">{n}</p>
    <h2 className="mt-1 text-[19px] leading-tight lg:text-[26px]" style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
    <div className="mt-3">{children}</div>
  </section>
);

export default function ClimateCartoonFrancis() {
  const [drawings, setDrawings] = useState(null);
  const address = `${recordOrigin()}/ClimateCartoons/Francis`;

  useEffect(() => {
    let cancelled = false;
    base44.entities.ClimateCartoon
      .filter({ status: 'published' }, { sort: '-created_date', limit: 60 })
      .then((page) => {
        if (cancelled) return;
        const his = (page?.items || [])
          .filter((drawing) => String(drawing.artist_name || '').toLowerCase().includes(NAME.toLowerCase()))
          .map((drawing) => ({ ...drawing, display_image_url: cartoonImageSource(drawing) }));
        setDrawings(his);
      })
      .catch(() => { if (!cancelled) setDrawings([]); });
    return () => { cancelled = true; };
  }, []);

  return (
    <ClimateRecordShell
      eyebrow="The record · the cartoon room"
      marker="One hand · Francis Umendu Odupute · Benin City"
      title="Francis Umendu Odupute"
      statement="The man who started the CartoonAFRICA biennial in 2012, drew this year’s catalogue cover, and edits the book the cartoon room is gathering — in his own words, with his work on the record under his own name."
      returnTo="/ClimateCartoons"
      returnLabel="The wall"
      footer="His work, his name, his address. Nothing here is sold, ranked, sponsored or signed up to."
      mobileCompact
      wide
    >
      {/* His own introduction, quoted rather than summarised: a page about a person that
          paraphrases them is a page about the person who wrote it. */}
      <Section n="01 · In his own words" title="“I am a visual artist and a journalist.”">
        <div className="border-l-4 border-record-red pl-4">
          {HIS_WORDS.map((line) => (
            <p key={line} className="mt-3 text-[15px] leading-relaxed first:mt-0 lg:text-[16.5px]" style={{ fontFamily: 'var(--font-reading)' }} dir="auto">
              “{line}”
            </p>
          ))}
        </div>
        <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-record-muted">
          Francis Umendu Odupute, introducing himself · 20 November 2026 · kept exactly as he wrote it
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-record-muted lg:text-[13.5px]" style={{ fontFamily: 'var(--font-reading)' }}>
          His family is not on this page. What he said about them was said to a person, and a record that keeps other
          people’s children’s names on a public page is not keeping them safe.
        </p>
      </Section>

      {/* The cover, whole, with the hand that drew it — the same rule as every drawing on the wall. */}
      <Section n="02 · The cover he drew" title="The 8th CartoonAFRICA International Biennial, 2026">
        <figure className="m-0">
          <img
            src={CARTOON_COVER}
            alt="Cover of the 8th CartoonAFRICA International Biennial 2026 anthology. Cover artwork by Francis Umendu Odupute."
            className="w-full border border-record-ink/20"
            loading="lazy"
          />
          <figcaption className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-record-muted">
            {CARTOON_EVENT.coverArt} · {CARTOON_EVENT.title}
          </figcaption>
        </figure>
        <p className="mt-3 text-[13.5px] leading-relaxed lg:text-[14.5px]" style={{ fontFamily: 'var(--font-reading)' }}>
          {CARTOON_EVENT.when} · {CARTOON_EVENT.where}. Edited by {CARTOON_EVENT.editors}. The hour on Sunday
          29 November belongs to Janine M. H. Selendy, in his book.{' '}
          <Link to="/ClimateWorkshop" className="text-record-red underline decoration-record-red/40 underline-offset-2">
            What that hour is
          </Link>
          .
        </p>
      </Section>

      {/* ── HIS WORK, AS IT ARRIVES ──────────────────────────────────────────────
          This is the platform: not a caption, a place. The list is read from the same table
          the wall reads, so his next drawing appears here the moment a keeper puts it up. */}
      <Section n="03 · His work on the record" title={drawings === null ? 'Opening his drawings…' : drawings.length ? `${drawings.length === 1 ? 'One drawing' : `${drawings.length} drawings`} on the wall under his name` : 'Room for the work that is coming'}>
        {drawings !== null && drawings.length === 0 && (
          <p className="text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
            Nothing of his is on the wall yet.{' '}
            <Link to="/ClimateCartoons#cartoon-drawing-desk" className="text-record-red underline decoration-record-red/40 underline-offset-2">
              The drawing desk
            </Link>{' '}
            is where a drawing is given.
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {(drawings || []).map((drawing) => (
            <article key={drawing.id} className="border border-record-ink/15">
              <Link to={`/ClimateCartoons?drawing=${drawing.id}`} className="block">
                <img
                  src={drawing.display_image_url}
                  alt={drawing.title ? `${drawing.title}, by ${drawing.artist_name}` : `A drawing by ${drawing.artist_name}`}
                  className="w-full"
                  loading="lazy"
                />
              </Link>
              <div className="p-3">
                {drawing.title && <h3 className="text-[15px] leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{drawing.title}</h3>}
                {drawing.for_line && (
                  <blockquote className="mt-1 text-[13px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }} dir="auto">
                    {drawing.for_line}
                  </blockquote>
                )}
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-record-muted">
                  {[drawing.origin, drawing.country, drawing.credit].filter(Boolean).join(' · ') || 'Given to the record'}
                </p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.12em]">
                  <Link to={`/ClimateCartoons/Sheet/${drawing.id}`} className="text-record-red">Its own sheet ↗</Link>
                  <Link to={`/ClimateCartoons?drawing=${drawing.id}`} className="text-record-ink/70">On the wall ↗</Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 text-[13.5px] leading-relaxed lg:text-[14.5px]" style={{ fontFamily: 'var(--font-reading)' }}>
          He has said new work is coming. When it arrives it lands here, under his name, with his own line about it —
          and a keeper sees it before it goes up, because a wall that puts anything on itself is a noticeboard. This
          address is his to send to anybody: it holds his drawings as long as the record does, and nothing on it can be
          bought, ranked or taken down quietly.
        </p>
      </Section>

      {/* The page as a thing he can hand over — the same card every drawing in this room gets. */}
      <Section n="04 · Pass it on" title="Send his page to the world">
        <ShareCardButton
          entry={FRANCIS_CARD}
          build={buildFrancisShareCard}
          label="Share his page"
          description="Francis Umendu Odupute — curator of the 8th CartoonAFRICA International Biennial, and his own drawings on the record."
          link={address}
        />
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-record-muted">
          {address.replace(/^https?:\/\//, '')}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-record-muted" style={{ fontFamily: 'var(--font-reading)' }}>
          The card is drawn on the device it is sent from. Nothing about the sender leaves it.
        </p>
      </Section>
    </ClimateRecordShell>
  );
}