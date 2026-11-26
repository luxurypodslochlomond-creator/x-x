import React from 'react';
import { Link } from 'react-router-dom';
import { CARTOON_PROGRAMME } from '@/components/climate/cartoons/cartoonEvent';
import '@/components/climate/cartoons/cartoon-programme.css';

// ── THE PROGRAMME, AS THE FESTIVAL PRINTED IT ──────────────────────────────────
// The room could say what the biennial's theme is and when Janine's hour falls, and nothing
// else. Francis sent the printed flyer on 20 November, so now it can carry the whole three
// days: the webinar, the travelling campaign, the workshop, the children's funfair and the
// awards, in his numbering and his words.
//
// Two rules, both of them the record's own:
//   • A time is printed only where the organisers have printed one. The funfair and the
//     awards say so plainly rather than being given an hour nobody promised.
//   • The record points at the session's own page instead of copying its joining link onto a
//     public page. The organisers publish that link themselves, and registration is theirs to
//     collect — a record that reprinted a live door would be one more copy to keep correct.
export default function CartoonProgramme() {
  return (
    <section className="cartoon-programme" aria-labelledby="cartoon-programme-title">
      <p className="cartoon-programme-eyebrow">The programme · 28–30 November 2026</p>
      <h2 id="cartoon-programme-title" className="cartoon-programme-title">The three days</h2>
      {/* The theme was printed here and again in the band directly above this one, which
          had already given it "in the festival's own words". Twice in two scrolls is not
          emphasis, it is a page that has not read itself. The band above owns it. */}
      <p className="cartoon-programme-detail">{CARTOON_PROGRAMME.opening}</p>

      <ol className="cartoon-programme-list" start={1}>
        {CARTOON_PROGRAMME.items.map((item) => (
          <li key={item.n} className="cartoon-programme-item">
            <span className="cartoon-programme-num" aria-hidden="true">{item.n}</span>
            <div>
              <p className="cartoon-programme-name">{item.name}</p>
              <span className="cartoon-programme-time">{item.time}</span>
              <p className="cartoon-programme-detail">{item.detail}</p>
              {item.link && (
                <p className="cartoon-programme-detail">
                  {item.link.internal ? (
                    <Link to={item.link.href}>{item.link.label} →</Link>
                  ) : (
                    <a href={item.link.href} target="_blank" rel="noopener noreferrer">{item.link.label} ↗</a>
                  )}
                  {item.link2 && (
                    <>
                      {' · '}
                      <a href={item.link2.href} target="_blank" rel="noopener noreferrer">{item.link2.label} ↗</a>
                    </>
                  )}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <p className="cartoon-programme-foot">
        The biennial is hybrid: in the museum and online. Questions, and to be added to the list:{' '}
        <a href={`mailto:${CARTOON_PROGRAMME.contact}`}>{CARTOON_PROGRAMME.contact}</a> — African Press Cartoon Services.
      </p>
    </section>
  );
}