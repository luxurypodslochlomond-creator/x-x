import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import RecordPaintedBand from '@/components/climate/RecordPaintedBand';
import '@/components/climate/wire/wire-page.css';

// ── THE WIRE, IN THE SAME ROOM AS THE FOUNDER AND x = x ────────────────────────
// Brian, 28 November: "thinking the wire needs same magic as founder and x=x and record
// bro … sure everything connected and colour evident".
//
// He was right, and the fault was the same one x = x had: the page was mounted inside the
// record's own shell — the painting already fixed behind it — and then painted itself an
// opaque paper on the first band, so the one room that carries the dated updates had no
// record behind it and no head of its own. The list is good; it simply began with a heading
// at the top of a white page.
//
// So the Wire opens the way the founder's page and x = x open: the painting is the ground,
// the name is set in the record's display face, the small line above it is the record's
// signal yellow in caps, and the reading below sits on a paper sheet laid on the painting.
// The three kinds are printed here as solid blocks of their own ink — red for a crisis,
// green for a solution, blue for an action — because colour is how a reader knows, before
// reading a word, which of these is a warning and which is something that works.
const KEYS = [
  { word: 'Crisis', tone: 'crisis', note: 'something getting worse' },
  { word: 'Solution', tone: 'solution', note: 'something that works' },
  { word: 'Action', tone: 'action', note: 'something to join' },
];

export default function WireOpening({ onAdd }) {
  return (
    <RecordPaintedBand continuous className="wire-hero">
      <div className="wire-hero-inner">
        <p className="wire-kicker">The record · dated, sourced, checkable</p>
        <h1 id="the-wire" className="wire-title">The Wire</h1>
        <p className="wire-standfirst">
          Dated updates, filed as a crisis, a solution or an action — each one carrying the day it
          happened, the source it came from, and who checked it.
        </p>
        <ul className="wire-keys" aria-label="What an update can be filed as">
          {KEYS.map(({ word, tone, note }) => (
            <li key={word} className="wire-key">
              <strong className={`wire-key-mark wire-key-${tone}`}>{word}</strong>
              <span>{note}</span>
            </li>
          ))}
        </ul>
        <div className="wire-hero-actions">
          <button type="button" className="wire-add" onClick={onAdd}>
            <Plus size={18} aria-hidden="true" />
            Add to the Wire
          </button>
          <Link to="/TogetherChangeClimate" className="wire-record-door">
            Browse the record by subject
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <p className="wire-hero-foot">
          Free to read, no account needed · <Link to="/ClimateMethod">how an entry is checked</Link>
        </p>
      </div>
    </RecordPaintedBand>
  );
}