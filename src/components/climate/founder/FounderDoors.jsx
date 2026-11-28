import React from 'react';

// Two doors that are hers, not ours, and the one line that says what the Solutions Site was.
// Kept short on purpose: this is the end of her page, and it should hand the reader over to
// her own work rather than describe it for her.
export default function FounderDoors() {
  return (
    <section className="record-founder-sheet" aria-labelledby="founder-doors">
      <p className="record-founder-kicker">Go to the work</p>
      <h2 id="founder-doors" className="record-founder-h2">Her own record.</h2>
      <div className="record-founder-links">
        <a href="https://www.solutions-site.org" target="_blank" rel="noopener noreferrer">
          <span>Horizon International Solutions Site</span>
          <strong>solutions-site.org ↗</strong>
        </a>
        <a href="https://www.youtube.com/user/jselendy" target="_blank" rel="noopener noreferrer">
          <span>Documentaries &amp; film clips</span>
          <strong>youtube.com/user/jselendy ↗</strong>
        </a>
      </div>
      <p className="record-founder-note">The Solutions Site was created by Horizon International with UNEP, UNDP, UNFPA, UNICEF, the IDRC of Canada, Yale University and colleagues at Harvard — a forum where every accepted entry has been reviewed before publication.</p>
    </section>
  );
}