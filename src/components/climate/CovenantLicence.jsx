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
// where that is argued. It used to say no repository was claimed, because there wasn't
// one. On 26 November 2026 there was, public and checked from outside a signed-in account
// before the link went on — so the sentence hands the reader the code instead of a promise
// about it.
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
//
// ── THE ASK, AND THEN THE PAGE — THE WHOLE ARGUMENT IN THREE MOVES ───────────────
// Brian followed one of the names and said, rightly, that he had meant the ask on their
// pages rather than a wall of it. So the names were pointed at the plain-text files: the
// law, and nothing else.
//
// Then he followed one of those: "still not opening at right page for me bro getting still
// just text." Right again, and this is the sort of fault only a reader finds. A .txt file
// in a browser tab is not the page — it reads as a broken link, not as a licence, and a
// person checking their rights got what looked like a fault.
//
// Then the other half: "but bro do cc by and gnu genuinely need support too if so dont do
// that… all need to help each other bro." They do. Both are non-profits — Creative Commons
// is paid by donations to maintain the licences and defend their use, and the Free Software
// Foundation is paid by donations to write and defend the GNU licences this record stands
// on — and both say so in their own words.
//
// So the names now point at the licence's own page, set as a page, with the whole text on
// it. Both carry a fundraising banner, and both are entitled to: they are the reason these
// terms exist. Rather than dodge the banner by breaking the page, the ask is named here, in
// the record's own words, in the sentence below — pointing at them rather than at us. All of
// us helping each other means neither routing around somebody else's need quietly, nor
// hiding the law behind a text file to do it.
const TERMS = [
  {
    label: 'The words',
    name: 'CC BY-SA 4.0',
    href: 'https://creativecommons.org/licenses/by-sa/4.0/legalcode',
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
        argued in <Link to="/ExtractionProofCovenant">the covenant</Link>, and the code
        itself is public, line for line, in{' '}
        <a href="https://github.com/luxurypodslochlomond-creator/x-x" target="_blank" rel="noreferrer noopener">
          the repository
        </a>
        .
      </p>

      {/* ── SOMEBODY ELSE'S NEED, SAID OUT LOUD ───────────────────────────────────
          Not a button and not a nag: one sentence naming who pays for the licences above,
          with the two doors left open for anyone who wants to walk through them. */}
      <p className="covenant-licence-give">
        Neither organisation is paid for these licences. Creative Commons and the Free
        Software Foundation are non-profits, and the terms above exist because people give
        them money to keep writing and defending them. If you want to help them do that:{' '}
        <a href="https://creativecommons.org/donate" target="_blank" rel="noreferrer noopener">
          Creative Commons
        </a>{' '}
        and{' '}
        <a href="https://my.fsf.org/donate" target="_blank" rel="noreferrer noopener">
          the Free Software Foundation
        </a>
        .
      </p>
    </div>
  );
}