import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import ShareCardButton from '@/components/climate/ShareCardButton';
import cartoonImageSource from '@/components/climate/cartoons/cartoonImageSources';
import { CARTOON_COVER, CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';
import { buildFrancisShareCard, FRANCIS_CARD } from '@/components/climate/cartoons/francisCard';
import ArtistSequence from '@/components/climate/cartoons/artist/ArtistSequence';
import HandAddress from '@/components/climate/cartoons/artist/HandAddress';
import { recordOrigin } from '@/components/climate/recordAddress';
import '@/components/climate/cartoons/artist/hand-page.css';

// ── ONE HAND'S OWN ADDRESS ON THE RECORD ───────────────────────────────────────
// Brian, 20 November: "Francis… new artwork coming bro and needs a platform for it to show
// the world." Then, later the same morning: "it looks like you've planted it on." Then, an
// hour after that: "why is it looking like linkedin or old tech site… profiles are fucked by
// social media bro, they are hollow and about all wrong stuff."
//
// The last one was the real note, and it was structural. The page had a kicker reading "One
// hand · Benin City" — a job title and a location, which is the line under a name on a
// professional network. It had a large name above the work, a one-line quote under the name
// saying what he does for a living, and three numbered sections: his work, his words, what
// this page is. That is a curriculum vitae with a terms page stapled to it. Every platform a
// cartoonist is offered is that page, so this was one more of them.
//
// So it is turned over. No kicker, no headline, no summary sentence, no numerals. The page
// opens with a drawing running edge to edge of the glass, and his name is set under it the
// way a print is signed in its margin. The work introduces the hand; the titles are fine
// print at the foot, which is what titles are.
//
// Two rules survive unchanged, because they were right. Everything quoted is his, kept
// exactly as he wrote it, typos and all: the record never tidies a person's own sentence.
// And nothing of his family is on this page, or in a note on this page explaining that they
// are not — what he told a person about his wife and children was told to a person.
//
// The wall is where his work lands: this page asks the same table the wall asks, so the
// moment a keeper puts a new drawing up under his name it appears here without anybody
// editing this file.
const NAME = 'Francis Umendu Odupute';

// His own introduction, 20 November 2026 — the professional half of it, verbatim. The rest of
// that message stays where it was sent.
const HIS_WORDS = [
  'I am a visual artist and a journalist.',
  'I am the President of the Beautiful Feet International (BFI) Ministry, a faith-based organization; I am the Editor-in-chief of the African Press Cartoon services, and I initiated and curator the CartoonAFRICA International Biennial (CAIB), a platform that I have been deploying to collaborate with like-minds globally to advocate for sustainable development and Africa’s productivity through the prism of graphic humour.',
];

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
      compact
      wide
      eyebrow="The record · the cartoon room"
      returnTo="/ClimateCartoons"
      returnLabel="The wall"
      footer="His work, his name, his address. Nothing here is sold, ranked, sponsored or signed up to."
    >
      <div className="hand-page">
        {/* ── THE DRAWING FIRST, AND THE HAND UNDER IT ────────────────────────
            No name above the work and no line about what he does for a living. A stranger
            meets the cover he drew, at the width of the glass, and then finds out whose
            hand it is — which is the order you meet a cartoonist in real life. */}
        <figure className="hand-open">
          <img
            src={CARTOON_COVER}
            alt="Cover of the 8th CartoonAFRICA International Biennial 2026 anthology. Cover artwork by Francis Umendu Odupute."
            loading="eager"
            decoding="async"
          />
          <figcaption className="hand-signed">
            <span className="hand-rule" aria-hidden="true" />
            <span className="hand-signed-name">Francis Umendu Odupute</span>
            <span className="hand-signed-mark">Francodus</span>
          </figcaption>
          <p className="hand-open-what">
            The cover of the 8th CartoonAFRICA International Biennial, 2026 — drawn by the man who edits
            the book.
          </p>
        </figure>

        {/* The one door, now that there is something worth sending. */}
        <div className="hand-doors">
          <ShareCardButton
            compact
            entry={FRANCIS_CARD}
            build={buildFrancisShareCard}
            link={address}
            description={`The 8th CartoonAFRICA International Biennial, Benin City, 28–30 November 2026. Cover by Francis Umendu Odupute, who edits the book. His drawings and his own address: ${address}`}
          />
        </div>

        {/* ── HIS WORK, AS IT ARRIVES ──────────────────────────────────────────
            This is the platform: not a caption, a place. The strip is read from the same
            table the wall reads, so his next drawing appears here the moment a keeper puts
            it up. Nothing is numbered and nothing is ranked — the order is the order it
            arrived in, which is a cartoonist's own order. */}
        <section className="hand-section">
          <h2 className="hand-head">
            {drawings === null
              ? 'Opening his drawings…'
              : drawings.length === 1
                ? 'His drawing on the wall'
                : drawings.length
                  ? 'His drawings on the wall'
                  : 'Room for what is coming'}
          </h2>

          {drawings !== null && drawings.length === 0 && (
            <p className="hand-open-what" style={{ textTransform: 'none', letterSpacing: 0, fontSize: '.9rem' }}>
              Nothing of his is on the wall yet.{' '}
              <Link to="/ClimateCartoons#cartoon-drawing-desk" style={{ color: 'rgb(var(--record-red))', textDecoration: 'underline' }}>
                Draw one
              </Link>{' '}
              and it goes up here under his name.
            </p>
          )}

          <ArtistSequence drawings={drawings} />

          {drawings !== null && drawings.length > 0 && (
            <p className="hand-where">
              In the order it arrived. Push the strip sideways, or open any sheet to print it.
            </p>
          )}
        </section>

        {/* ── THE BOOK AND THE THREE DAYS ─────────────────────────────────────
            What it is, when, where — under the picture, where a reader who has just stopped
            to look will actually want it. */}
        <section className="hand-book">
          <p className="hand-book-title">{CARTOON_EVENT.biennial}</p>
          <p>
            {CARTOON_EVENT.when} · {CARTOON_EVENT.where}
          </p>
          <p>
            Edited by {CARTOON_EVENT.editors}. The hour on Sunday 29 November belongs to Janine M. H.
            Selendy, in his book — <Link to="/ClimateWorkshop">what that hour is</Link>.
          </p>
        </section>

        {/* ── HIS OWN WORDS, NOW THAT SOMETHING OF HIS HAS BEEN SEEN ───────────
            Quoted rather than summarised: a page about a person that paraphrases them is a
            page about the person who wrote it. His titles live here, at the foot, because a
            list of posts is not an introduction — the drawings were. */}
        <section className="hand-section">
          <h2 className="hand-head">In his words</h2>
          {HIS_WORDS.map((line) => (
            <blockquote key={line} className="hand-quote" dir="auto">
              “{line}”
            </blockquote>
          ))}
          <p className="hand-where">Introducing himself · 20 November 2026 · kept exactly as he wrote it</p>
        </section>

        {/* ── THE ADDRESS, PLAINLY ────────────────────────────────────────────
            What the page is for, said once at the foot rather than in a section about itself:
            a link to send to a paper, a festival, a ministry or a school. */}
        <section className="hand-section">
          <h2 className="hand-head">Send this address</h2>
          <HandAddress address={address} />
          <p className="hand-where">
            Benin City, Nigeria. Send it to a paper, a festival, a ministry or a school — the address does
            not move, and his name stays on the drawing wherever the drawing goes.
          </p>
        </section>
      </div>
    </ClimateRecordShell>
  );
}