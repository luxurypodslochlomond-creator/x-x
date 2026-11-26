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
// ── WHAT EACH ONE MEANS, IN THE OPEN, WITHOUT A TRIP ─────────────────────────────
// Brian, 26 November: "you think we should link the CC BY SA etc and GNU etc on x=x so
// people know the score bro or say coolasfuck briefly what means underneath too so dont
// need to fuck off to another page yet". Both, and in that order of importance.
//
// The meaning goes on the page, because a licence a reader has to leave to understand is
// a licence most readers will not understand. The name goes to the deed itself, because
// the plain sentence here is a courtesy and the deed is the law — and a page that argues
// for saying what you actually mean should not paraphrase a legal text without pointing
// at the text. One line each, in the record's reading type at a size a person can read.
const TERMS = [
  {
    label: 'The words',
    name: 'CC BY-SA 4.0',
    href: 'https://creativecommons.org/licenses/by-sa/4.0/',
    means:
      'Take the words. Change them, print them, sell them, put them on a wall. Keep the name on them, and let whatever you make be this free too.',
  },
  {
    label: 'The code',
    name: 'GNU AGPL-3.0',
    href: 'https://www.gnu.org/licenses/agpl-3.0.html',
    means:
      'Same, for the code — and if you run it as a service for other people, the changes you made go back out under this same licence.',
  },
];

export default function CovenantLicence() {
  return (
    <div className="covenant-licence">
      <p className="covenant-licence-kicker">Given, not sold</p>

      <div className="covenant-licence-terms">
        {TERMS.map((term) => (
          <div key={term.name} className="covenant-licence-term">
            <span className="covenant-licence-label">{term.label}</span>
            <a
              className="covenant-licence-name"
              href={term.href}
              target="_blank"
              rel="noreferrer noopener"
              translate="no"
            >
              {term.name}
            </a>
            <span className="covenant-licence-means">{term.means}</span>
          </div>
        ))}
      </div>

      <p className="covenant-licence-says">
        Both are irrevocable: once given, they cannot be taken back. Why they were given is
        argued in <Link to="/ExtractionProofCovenant">the covenant</Link>.
      </p>
    </div>
  );
}