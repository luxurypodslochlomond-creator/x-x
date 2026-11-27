import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import cartoonImageSource from '@/components/climate/cartoons/cartoonImageSources';
import ArtworkShareButton from '@/components/climate/ArtworkShareButton';
import { recordOrigin } from '@/components/climate/recordAddress';
import '@/components/climate/cartoons/sheet/sheet.css';

// ── THE DRAWING, ON ITS OWN SHEET ──────────────────────────────────────────────
// One drawing at its own address, laid out to be printed and hung: the picture whole, the hand
// that made it, where it came from, the drawer's own line, the credit, and the address that
// brings a reader back to it. It is the same record — nothing here is a copy — and it opens
// without a sign-in, because a workshop's sheet has to open on a school's printer.
//
// The credit line is copyable on screen and printed on the paper: the first thing a newspaper
// gets wrong about a cartoon is who drew it.
function creditLine(cartoon, address) {
  const parts = [cartoon.artist_name];
  if (cartoon.title) parts.push(`“${cartoon.title}”`);
  if (cartoon.origin) parts.push(cartoon.origin);
  if (cartoon.credit) parts.push(cartoon.credit);
  parts.push(`Together We Can Change Climate · ${address}`);
  return parts.join(' · ');
}

export default function ClimateCartoonSheet() {
  const { id } = useParams();
  const [cartoon, setCartoon] = useState(null);
  const [state, setState] = useState('loading');
  const [copied, setCopied] = useState(false);

  const address = `${recordOrigin()}/ClimateCartoons/Sheet/${id}`;

  useEffect(() => {
    let cancelled = false;
    base44.entities.ClimateCartoon
      .get(id)
      .then((record) => {
        if (cancelled) return;
        // Only a drawing a keeper has put on the wall has a sheet. An unpublished one answers
        // here exactly as it answers to the wall: it is not there yet.
        if (!record || record.status !== 'published') { setState('missing'); return; }
        setCartoon({ ...record, display_image_url: cartoonImageSource(record) });
        setState('ready');
      })
      .catch(() => { if (!cancelled) setState('missing'); });
    return () => { cancelled = true; };
  }, [id]);

  // A sheet that is not there is a real 404 for anyone following a link into the record.
  useEffect(() => {
    if (state !== 'missing') return;
    const meta = document.createElement('meta');
    meta.name = 'prerender-status-code';
    meta.content = '404';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, [state]);

  const copyCredit = () => {
    navigator.clipboard
      .writeText(creditLine(cartoon, address))
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
      })
      .catch(() => setCopied(false));
  };

  if (state === 'loading') {
    return (
      <div className="sheet-page">
        <p className="sheet-state" role="status">Opening the drawing…</p>
      </div>
    );
  }

  if (state === 'missing' || !cartoon) {
    return (
      <div className="sheet-page">
        <div className="sheet-state">
          <h1 className="sheet-artist">No sheet at this address.</h1>
          <p className="sheet-line">A drawing has a sheet here once a custodian has put it on the wall.</p>
          <Link className="sheet-tool" to="/ClimateCartoons">The Wall</Link>
        </div>
      </div>
    );
  }

  const printed = address.replace(/^https?:\/\//, '');

  return (
    <div className="sheet-page">
      <div className="sheet-tools">
        <Link className="sheet-tool" to="/ClimateCartoons">← The Wall</Link>
        <div className="sheet-tools-right">
          {/* ── THE DRAWING LEAVES AS ITSELF ────────────────────────────────────────
              New here, and the thing a cartoonist actually wants: one tap takes the picture
              whole — never cropped, never re-drawn — with their name, the origin and the
              record's address travelling beside it. No upload, no account, nothing sent
              anywhere until they choose where it goes. */}
          <ArtworkShareButton instant id={cartoon.id} imageUrl={cartoon.display_image_url} title={cartoon.title || `A drawing by ${cartoon.artist_name}`} credit={creditLine(cartoon, address)} link={address} />
          <button type="button" onClick={copyCredit}>{copied ? 'Credit copied' : 'Copy the credit line'}</button>
          <button type="button" onClick={() => window.print()}>Print or save as PDF</button>
        </div>
      </div>

      <article className="sheet-paper">
        <header className="sheet-masthead">
          <span>Together We Can Change Climate</span>
          <span>The record · the cartoon room</span>
        </header>

        <div className="sheet-art">
          <img
            src={cartoon.display_image_url}
            alt={cartoon.title ? `${cartoon.title}, by ${cartoon.artist_name}` : `A drawing by ${cartoon.artist_name}`}
          />
        </div>

        <div className="sheet-body">
          <p className="sheet-kicker">A drawing given to the record</p>
          <h1 className="sheet-artist">{cartoon.artist_name}</h1>
          {cartoon.title && <p className="sheet-title">{cartoon.title}</p>}
          {cartoon.for_line && <blockquote className="sheet-words" dir="auto">{cartoon.for_line}</blockquote>}

          {cartoon.crisis_id && (
            <p className="sheet-about">
              Drawn about:{' '}
              <Link to={`/ClimateDetail/climate_crisis/${cartoon.crisis_id}`}>
                {cartoon.crisis_title || 'an entry on the record'}
              </Link>
            </p>
          )}

          <dl className="sheet-facts">
            {cartoon.origin && (<><dt>Where it came from</dt><dd>{cartoon.origin}</dd></>)}
            {cartoon.country && (<><dt>Drawn in</dt><dd>{cartoon.country}</dd></>)}
            {cartoon.credit && (<><dt>Credit</dt><dd>{cartoon.credit}</dd></>)}
            {cartoon.source_url && (<><dt>First published</dt><dd>{cartoon.source_url}</dd></>)}
          </dl>

          <footer className="sheet-foot">
            <p className="sheet-address">{printed}</p>
            <p className="sheet-note">
              Type that address in to find this drawing again. It is the record’s own page and it does not expire.
            </p>
          </footer>
        </div>
      </article>
    </div>
  );
}