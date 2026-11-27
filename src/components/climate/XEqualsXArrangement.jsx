import React from 'react';
import { Link } from 'react-router-dom';

// Three entry types, linked to their actual sections in the record.
const THREE = [
  { name: 'Crises', body: 'Name the harm. Locate it. Keep the source.', to: '/TogetherChangeClimate#record-room-climate_crisis' },
  { name: 'Solutions', body: 'Show the response. Keep the evidence. Say where it falls short.', to: '/TogetherChangeClimate#record-room-solution' },
  { name: 'Actions', body: 'Name the work. Find the organiser. Take part.', to: '/TogetherChangeClimate#record-room-actions' },
];

export default function XEqualsXArrangement() {
  return (
    <section id="arrangement" className="covenant-arrangement" aria-labelledby="arrangement-heading">
      <div className="covenant-arrangement-inner">
        <p className="covenant-kicker">How the work connects</p>
        <h2 id="arrangement-heading">The harm. The response.<br />The people acting.</h2>
        <ol className="covenant-three">
          {THREE.map(({ name, body, to }) => (
            <li key={name}>
              <Link to={to} className="covenant-three-name">{name} <span aria-hidden="true">→</span></Link>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <p className="covenant-arrangement-line">A shared subject connects related crises, solutions and actions. A group names the subject it works on. A custodian can link a drawing to the entry it answers.</p>
        <p className="covenant-arrangement-drawings"><strong>Those are real links, not a claim that everything is already joined.</strong> Open an entry to follow related work. Open a drawing to follow its linked entry, where one has been assigned. Find a group through the contact its organiser chose to publish. Art also stands in its own right: it does not have to illustrate a report to belong here.</p>
        <div className="covenant-platform-part">
          <p><strong>Technology in service of the living world.</strong> We build and maintain the platform. Researchers, communities and artists bring work that keeps its own authors, sources and rights. The technology connects it without taking the credit for it.</p>
          <p>The purpose is collective power: knowledge people can challenge, art people can encounter, and work people can find and join. What changes beyond the screen has to be shown, not claimed.</p>
          <p className="covenant-platform-mark">x = x &middot; no one left behind</p>
        </div>
        <Link to="/ClimateMethod" className="covenant-text-link">How an entry gets on, and who signs it <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}