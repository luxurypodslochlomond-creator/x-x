import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import ShareCardButton from '@/components/climate/ShareCardButton';
import cartoonImageSource from '@/components/climate/cartoons/cartoonImageSources';
import { CARTOON_COVER, CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';
import { buildFrancisShareCard, FRANCIS_CARD } from '@/components/climate/cartoons/francisCard';
import ArtistSequence from '@/components/climate/cartoons/artist/ArtistSequence';
import { recordOrigin } from '@/components/climate/recordAddress';
import '@/components/climate/cartoons/artist/hand-page.css';

// ── ONE HAND'S OWN ADDRESS ON THE RECORD ───────────────────────────────────────
// Brian, 20 November: "Francis… new artwork coming bro and needs a platform for it to show
// the world… he knows his stuff." Then, later the same morning: "it looks like you've
// planted it on — needs to leave image alone… this bio of him is old and stuck on at the
// top… make the walk coolasfuck for him and artists and readers."
//
// He was right on every count, so the page was rebuilt around one rule: the drawing comes
// before the words. A stranger meets his name, his signature and the cover he made, and only
// then reads a paragraph of titles. Nothing is printed over his picture. His own introduction
// sits below his work rather than standing in front of it.
//
// Two other rules hold it. Everything quoted is his, kept exactly as he wrote it, typos and
// all: the record never tidies a person's own sentence. And nothing of his family is on this
// page, or anywhere on it in a note explaining that they are not — what he told a person
// about his wife and children was told to a person, and a page that explains its own
// discretion is still a page about them.
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

// What this page is, said plainly, once. Every other place a cartoonist is offered explains
// itself in the opposite direction, so the record says what it does not do as well as what
// it does.
const THE_DEAL = [
  'His name stays on the drawing, wherever the drawing goes.',
  'Nothing here is sold, ranked, sponsored or boosted. No likes, no follower count, no algorithm deciding who sees his work.',
  'The address does not move, and nothing comes down from the wall without a note in the open saying that it did.',
];

const Section = ({ n, title, children }) => (
  <section className="hand-section">
    <div className="hand-section-head">
      <p className="hand-n">{n}</p>
      <h2 className="hand-title">{title}</h2>
    </div>
    {children}
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
      compact
      wide
      eyebrow="The record · the cartoon room"
      returnTo="/ClimateCartoons"
      returnLabel="The wall"
      footer="His work, his name, his address. Nothing here is sold, ranked, sponsored or signed up to."
    >
      <div className="hand-page">
        {/* ── THE HEAD ────────────────────────────────────────────────────────
            A name, the signature he draws under, and one sentence of his own. The share
            icon is here rather than at the foot, because the moment a reader decides this
            is worth sending is the moment they have just met him — not after four screens
            of scrolling. */}
        <header className="hand-head">
          <p className="hand-kicker">One hand · Benin City</p>
          <h1 className="hand-name">Francis Umendu Odupute</h1>
          <p className="hand-sign">Francodus</p>
          <p className="hand-say" dir="auto">“I am a visual artist and a journalist.”</p>
          <div className="hand-doors">
            <ShareCardButton
              compact
              entry={FRANCIS_CARD}
              build={buildFrancisShareCard}
              link={address}
              description={`The 8th CartoonAFRICA International Biennial, Benin City, 28–30 November 2026. Cover by Francis Umendu Odupute, who edits the book. His drawings and his own address: ${address}`}
            />
          </div>
          <p className="hand-plate-meta">Sends his card, with the cover he drew and this address on it.</p>
        </header>

        {/* ── THE COVER, LEFT ALONE ───────────────────────────────────────────
            His picture, whole and uncropped, with nothing of ours printed on it. One line
            under it naming the hand that made it, which is the same rule every drawing on
            the wall keeps. */}
        <figure className="hand-cover">
          <img
            src={CARTOON_COVER}
            alt="Cover of the 8th CartoonAFRICA International Biennial 2026 anthology. Cover artwork by Francis Umendu Odupute."
            loading="eager"
            decoding="async"
          />
          <figcaption>{CARTOON_EVENT.coverArt}</figcaption>
        </figure>

        {/* What it is, when and where — under the picture, where a reader who has just
            stopped to look will actually want it. */}
        <section className="hand-event">
          <p className="hand-event-title">{CARTOON_EVENT.biennial}</p>
          <p>
            {CARTOON_EVENT.when} · {CARTOON_EVENT.where}
          </p>
          <p>
            Edited by {CARTOON_EVENT.editors}. The hour on Sunday 29 November belongs to Janine M. H. Selendy, in
            his book —{' '}
            <Link to="/ClimateWorkshop" className="text-record-red underline decoration-record-red/40 underline-offset-2">
              what that hour is
            </Link>
            .
          </p>
        </section>

        {/* ── HIS WORK, AS IT ARRIVES ──────────────────────────────────────────
            This is the platform: not a caption, a place. The strip is read from the same
            table the wall reads, so his next drawing appears here the moment a keeper puts
            it up. */}
        <Section
          n="01 · His work on the record"
          title={
            drawings === null
              ? 'Opening his drawings…'
              : drawings.length
                ? drawings.length === 1
                  ? 'One drawing on the wall'
                  : `${drawings.length} drawings on the wall`
                : 'Room for the work that is coming'
          }
        >
          {drawings !== null && drawings.length === 0 && (
            <p className="hand-say" style={{ marginTop: 0 }}>
              Nothing of his is on the wall yet.{' '}
              <Link to="/ClimateCartoons#cartoon-drawing-desk" className="text-record-red underline decoration-record-red/40 underline-offset-2">
                The drawing desk
              </Link>{' '}
              is where a drawing is given.
            </p>
          )}

          <ArtistSequence drawings={drawings} />

          {drawings !== null && drawings.length > 0 && (
            <p className="hand-where" style={{ marginTop: '.9rem' }}>
              In the order it arrived. Push the strip sideways, or open any sheet to print it.
            </p>
          )}
        </Section>

        {/* ── HIS OWN WORDS, NOW THAT SOMETHING OF HIS HAS BEEN SEEN ───────────
            Quoted rather than summarised: a page about a person that paraphrases them is a
            page about the person who wrote it. */}
        <Section n="02 · In his own words" title="What he does, as he puts it">
          {HIS_WORDS.map((line) => (
            <blockquote key={line} className="hand-quote" dir="auto">
              “{line}”
            </blockquote>
          ))}
          <p className="hand-where">Francis Umendu Odupute, introducing himself · 20 November 2026 · kept exactly as he wrote it</p>
        </Section>

        {/* ── THE DEAL ────────────────────────────────────────────────────────
            No salesmanship and no jokes of ours: he is funny in his drawings, and a page
            that adds its own humour on top of a cartoonist's is a page that does not trust
            the cartoons. */}
        <Section n="03 · What this page is" title="A page on a record, not a profile on a platform">
          <div className="hand-deal">
            {THE_DEAL.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="hand-address">{address.replace(/^https?:\/\//, '')}</p>
            <p className="hand-where" style={{ marginTop: 0 }}>
              Send it to a paper, a festival, a ministry or a school. The card is drawn on the device it is sent
              from, and nothing about the sender leaves it.
            </p>
          </div>
        </Section>
      </div>
    </ClimateRecordShell>
  );
}