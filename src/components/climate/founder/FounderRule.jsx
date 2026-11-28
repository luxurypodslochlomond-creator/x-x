import React from 'react';
import { Link } from 'react-router-dom';

// ── WHY THIS PAGE NAMES INSTITUTIONS AND NOT PRIVATE PEOPLE ───────────────────
// The question comes back every week in some form: if the case is this strong, why
// not name the men and the companies? Because a figure with a published report
// behind it cannot be answered with a lawyer's letter, and a name without a finding
// can — and then the argument dies in a retraction instead of in the policy it was
// aimed at. Saying that out loud makes the restraint read as method rather than as
// nerve, and it keeps the page from ever appearing to speak for the people it honours.
export default function FounderRule() {
  return (
    <section className="record-founder-rule" aria-labelledby="founder-rule">
      <div className="record-founder-rule-inner">
        <p className="record-founder-kicker">The rule · why no names</p>
        <h2 id="founder-rule" className="record-founder-rule-title">Institutions get named. Private people do not.</h2>
        <p>A number with a published report behind it cannot be answered with a lawyer’s letter. A name without a finding can, and then the argument dies in a retraction instead of in the policy it was aimed at. That is not caution. It is the difference between a page that survives being read by the people it accuses and one that does not.</p>
        <p>So this page names the burning, the spending and the dead, and it names the bodies that count them: the WMO, the World Bank, SIPRI, the WHO, UNEP, the Lancet, the United Nations. It does not put a private person’s name under a crime, and it does not borrow the name of somebody with a conscience to carry a case they never agreed to make.</p>
        <p><strong>Nothing here is said on Janine Selendy’s behalf.</strong> Her words are quoted where they are quoted. Everything else is this record’s own reading of public reports, dated, and open to correction by anyone — including the people it is hardest to hear it from.</p>
        <div className="record-founder-rule-links">
          <Link to="/ClimateMethod">How this record is checked</Link>
          <Link to="/ClimateMethod#corrections">Send a correction</Link>
        </div>
      </div>
    </section>
  );
}