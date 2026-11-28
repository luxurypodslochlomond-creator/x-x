import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CopyLine from '@/components/climate/CopyLine';
import '@/components/climate/cartoons/paid/paid-page.css';

// ── ALINA'S FOUR QUESTIONS, ANSWERED ON THE RECORD ─────────────────────────────
// Alina Sen wrote on 28 November: the link would not open; how many CEEW cartoons are on the
// wall (she had seen three); the idea and concept of What On Earth! is hers and her team's,
// while freelance cartoonists make it visual; and what happens across 28–30 November — will
// any cartoons be printed and displayed?
//
// Every answer here is read from the wall itself when the page opens, so the count cannot
// drift and no claim is made that the room cannot show. Nothing is promised about the museum:
// what is printed in Benin City is the organisers' decision, not this record's.
const WALL = 'https://uf51.love/ClimateCartoons';

const isCEEW = (cartoon) =>
  /Council on Energy, Environment and Water|What On Earth!/i.test(cartoon.credit || '');

export default function ClimateCartoonsAnswered() {
  const [wall, setWall] = useState(null);

  useEffect(() => {
    let live = true;
    base44.entities.ClimateCartoon
      .filter({ status: 'published' }, { sort: '-created_date', limit: 200 })
      .then(({ items }) => {
        if (!live) return;
        const ceew = items.filter(isCEEW);
        setWall({
          total: items.length,
          ceew,
          unnamed: ceew.filter(c => /Hand not yet named/i.test(c.artist_name || '')).length,
        });
      })
      .catch(() => { if (live) setWall({ total: 0, ceew: [], unnamed: 0 }); });
    return () => { live = false; };
  }, []);

  return <ClimateRecordShell
    painted
    className="paid-page"
    eyebrow="The cartoon room · for Alina Sen, CEEW"
    marker="Four questions, answered in the open"
    title="The answers, as the wall stands."
    statement="Read from the wall when this page opens, so the numbers are the room’s own."
    returnTo="/ClimateCartoons"
    returnLabel="The wall"
    footer="Every figure on this page is counted from the wall as it is now. Nothing here is a forecast."
  >
    <section className="paid-section" style={{ borderTop: 0, paddingTop: 0, marginTop: 0 }}>
      <h2 className="paid-head">1. The link</h2>
      <p className="paid-lede" style={{ marginTop: 0 }}>
        It opens. The address is <strong>uf51.love/ClimateCartoons</strong>. The screen you saw said
        “check for a typo in <em>uf51.love.love</em>” — with <em>.love</em> written twice — and that is the whole
        fault: a doubled ending is a different address, and no such place exists.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <a href={WALL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center bg-record-red px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-record-paper no-underline">
          Open the wall
        </a>
        <CopyLine text={WALL} label="Copy the address" />
      </div>
    </section>

    <section className="paid-section">
      <h2 className="paid-head">2. How many of CEEW’s drawings are on it</h2>
      {wall === null ? (
        <p className="paid-lede" style={{ marginTop: 0 }}>Counting the wall…</p>
      ) : (
        <>
          <p className="paid-lede" style={{ marginTop: 0 }}>
            <strong>{wall.total}</strong> drawings are published on the wall, and <strong>{wall.ceew.length}</strong> of
            them are CEEW’s <em>What On Earth!</em> cartoons — not three. The wall opens sixteen at a time, so the rest
            are behind “More from the wall” at the foot of the drawings.
          </p>
          <ol className="paid-lines" style={{ marginTop: '1rem' }}>
            {wall.ceew.map(cartoon => <li key={cartoon.id}>
              <strong>{cartoon.title || 'A drawing'}</strong>
              {/Hand not yet named/i.test(cartoon.artist_name || '')
                ? 'Drawn by a hand the record has not been given a name for yet — the one gap only CEEW can close.'
                : `Drawn by ${cartoon.artist_name}.`}
            </li>)}
          </ol>
          {wall.unnamed > 0 && (
            <p className="paid-lede">
              {wall.unnamed} of them still say “hand not yet named”. The record will not invent a name, so those stay
              unnamed until CEEW sends them. Send them and they go up the same day.
            </p>
          )}
        </>
      )}
    </section>

    <section className="paid-section">
      <h2 className="paid-head">3. Whose the idea is, and whose the drawing is</h2>
      <p className="paid-lede" style={{ marginTop: 0 }}>
        You are right, and the wall now says it in two lines instead of one. On every CEEW drawing it prints:
      </p>
      <ul className="paid-lines">
        <li><strong>Idea, research and commission:</strong>CEEW’s <em>What On Earth!</em> team — with the executive producers named, as they are in the credit you sent.</li>
        <li><strong>The drawing:</strong>the cartoonist, named above the credit, because the hand that made the picture is not the hand that had the idea, and both are on the record.</li>
        <li><strong>The holder:</strong>© Council on Energy, Environment and Water, 2026 — unchanged, on every one.</li>
      </ul>
    </section>

    <section className="paid-section">
      <h2 className="paid-head">4. Across 28–30 November</h2>
      <ul className="paid-lines">
        <li><strong>What this record can do:</strong>print a show of any selection from the wall, on paper, with every artist, credit and source attached — <Link to="/ClimateCartoons/Print" className="underline text-record-red">the print room</Link>. It works from any phone or printer.</li>
        <li><strong>What it cannot decide:</strong>whether anything is printed and hung at the National Museum in Benin City. That is the organisers’ call, not this record’s, and it would be wrong of me to promise it.</li>
        <li><strong>What is certain:</strong>the wall stays up after the festival closes. Sunday’s hour is the workshop; the drawings do not come down when it ends.</li>
        <li><strong>The programme as it stands</strong> is printed in full on <Link to="/ClimateCartoons" className="underline text-record-red">the room</Link>, with the times the organisers have given and nothing invented for the ones they have not.</li>
      </ul>
    </section>
  </ClimateRecordShell>;
}