import React from 'react';
import { verificationOf, verificationNoteOf } from '@/components/climate/verification';
import '@/components/climate/news-register.css';

// ── THE REGISTER LINE ─────────────────────────────────────────────────────────
// Brian, 26 November: "the wire feels old as fuck … would love sources citations dates and
// corrections all recorded, own id for right reasons, like a stamp at the top of the record
// … thinking old ms dos style for important stuff."
//
// He is asking for the one thing a wire entry was missing: proof of itself. The entry had a
// source buried in the attribution at the foot, a date in a quiet grey line, and corrections
// only when there happened to be one — so the part a sceptical reader actually needs was the
// part set smallest.
//
// So each entry now opens with its register line, set like a document: the kind in the
// entry's own colour, the record's own id for it, when the record filed it, when the thing
// happened, who says so, how well it stands, and whether it has ever been corrected. Fixed
// width, upper case, tabular figures, no rounding — the look of a machine that keeps a
// register rather than a page that wants to be liked.
//
// WHAT IS NOT INVENTED HERE. The id is the entry's real id on the record, shortened and
// grouped so a person can read it aloud or write it on an envelope — never a decorative
// serial. "Filed" is the moment the record stored it, in UTC so nobody has to guess whose
// clock. "Corrected" says "none recorded" when nothing has been corrected, because an empty
// space there would read as "nothing wrong" when it only means "nothing changed".
const KIND = {
  emergency: { word: 'Crisis', ink: 'crisis' },
  milestone: { word: 'Solution', ink: 'solution' },
  initiative: { word: 'Action', ink: 'action' },
};

// 6a3f2211-90bc-… → 6A3F 2211 90BC — the same id, in a form a person can say out loud.
const stampId = (id = '') => {
  const clean = String(id).replace(/[^a-z0-9]/gi, '').toUpperCase().slice(0, 12);
  return clean.replace(/(.{4})(?=.)/g, '$1 ') || 'not recorded';
};

const filedAt = (iso) => {
  const d = new Date(iso);
  if (!iso || Number.isNaN(d.getTime())) return 'not recorded';
  const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase();
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' });
  return `${date} · ${time} UTC`;
};

export default function NewsRegister({ entry }) {
  const kind = KIND[entry.kind] || KIND.initiative;
  const standing = verificationOf(entry);

  return (
    <section className={`news-register news-register--${kind.ink}`} aria-label="This entry's register line">
      <div className="news-register-head">
        <span className="news-register-kind">{kind.word}</span>
        <span className="news-register-id" title="This entry's own id on the record">RECORD ID · {stampId(entry.id)}</span>
      </div>
      <dl className="news-register-lines">
        <div><dt>Filed</dt><dd>{filedAt(entry.created_date)}</dd></div>
        <div><dt>When</dt><dd>{entry.when_label || entry.when_date || 'not recorded'}</dd></div>
        {(entry.where_label || entry.country) && (
          <div><dt>Where</dt><dd>{entry.where_label || entry.country}</dd></div>
        )}
        <div><dt>Source</dt><dd>{entry.source_name || 'not recorded'}</dd></div>
        {entry.corroborating_source && <div><dt>Second</dt><dd>{entry.corroborating_source}</dd></div>}
        <div><dt>Standing</dt><dd title={verificationNoteOf(entry)}>{standing.label}</dd></div>
        <div>
          <dt>Corrected</dt>
          <dd className={entry.correction_note ? 'news-register-corrected' : ''}>
            {entry.correction_note ? 'Yes · set out below' : 'None recorded'}
          </dd>
        </div>
      </dl>
    </section>
  );
}