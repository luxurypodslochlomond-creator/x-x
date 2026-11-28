import React from 'react';

// Her own work, where a reader can go and check it — the two places that are actually hers.
// Nothing is paraphrased here: the Solutions Site paragraph is the record's own account of
// what that site was and who made it, because a page about somebody's life should not be the
// only place their work is described.
export default function FounderSignature() {
  return (
    <section className="record-founder-sheet" aria-labelledby="founder-signature">
      <p className="record-founder-kicker">Read her own work</p>
      <h2 id="founder-signature" className="record-founder-h2">Do not take<br />our word for it.</h2>
      <p className="record-founder-lede">Two doors that are hers, not ours. Open them and judge the work yourself.</p>
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
      <p className="record-founder-note">Selendy FN’96 Explorers Club. Fellow Emeritus.</p>
      <p className="record-founder-note">The Solutions Site was created by Horizon International with UNEP, UNDP, UNFPA, UNICEF, the IDRC of Canada, Yale University and colleagues at Harvard — a forum where every accepted entry has been reviewed before publication.</p>
    </section>
  );
}