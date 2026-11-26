import React from 'react';
import { Link } from 'react-router-dom';

// ── THE LICENCE, SET AS A PLATE RATHER THAN A FOOTNOTE ───────────────────────────
// Brian, 26 November: "can you fix font on CC BY bro please and make huge look more
// coolasfuck". He was right, and the fault was real: the two licences were set at ten
// pixels of monospace, muted grey, at the very foot of the page — the size and colour a
// legal notice wears when the site would rather you did not read it. On the one page of
// this record that gives everything away, the giving away was the quietest thing on it.
//
// So the two licences are now the largest words on the page after the argument itself:
// named plainly, in the record's own display face, at the size a promise is set in. The
// labels above them say what each one covers — the words, and the code — because a
// reader should not have to know what AGPL means to know that it is theirs.
//
// The sentence underneath stays in reading type at a size a person can actually read,
// and it still says the honest thing: the code is under the AGPL, and the covenant is
// where that is argued. No repository is claimed here, because there still isn't one.
const TERMS = [
  { label: 'The words', name: 'CC BY-SA 4.0' },
  { label: 'The code', name: 'GNU AGPL-3.0' },
];

export default function CovenantLicence() {
  return (
    <div className="covenant-licence">
      <p className="covenant-licence-kicker">Given, not sold</p>

      <div className="covenant-licence-terms">
        {TERMS.map((term) => (
          <div key={term.name} className="covenant-licence-term">
            <span className="covenant-licence-label">{term.label}</span>
            <span className="covenant-licence-name" translate="no">{term.name}</span>
          </div>
        ))}
      </div>

      <p className="covenant-licence-says">
        Take the words, change them, print them, put them on a wall. Keep the name on them,
        and let whoever takes them next do the same. The code that serves this record is
        under the GNU AGPL-3.0, as{' '}
        <Link to="/ExtractionProofCovenant">the covenant</Link> says.
      </p>
    </div>
  );
}