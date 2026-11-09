// ── THE LETTER'S WORDS, IN ONE PLACE ──────────────────────────────────────────
// The page and the PDF print the same three paragraphs, so the words live here
// rather than in either of them: a letter that says one thing on screen and another
// on paper is two letters, and only one of them can be signed.

export const letterDate = () =>
  new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const LETTER_PARAGRAPHS = [
  `Together We Can Change the Course of Climate Change is a public record of what is working on this planet and what is being lost. Every entry names where it came from, says how well it is known — one origin, two independent origins, or an official record — and carries a fingerprint of its own words that anyone can recompute in their own browser. Nothing is ranked, nothing is advertised, and nothing can be paid into a better position. It is read without an account, in any language, on any phone. Tonight it holds nineteen published entries, every one with a working link to its origin, and forty-four seals.`,
  `Not all of it is finished, and the gaps are the reason for writing. No independent person has yet checked an entry: the office is built and empty. The source is not yet in public, so the record cannot honestly be called auditable and nobody could carry it away and run it. Fourteen of the nineteen entries carry no statement of how well they are known, every entry is still unsigned, and none of the four gatherings has a contact line. That is days of work rather than years, and every one of those gaps is declared on the record itself rather than left to be discovered.`,
  `What it needs is people, not money. First, one named reader with standing — someone who reads the method and says in public whether it holds: a verdict on how the record is made rather than on what it contains, published even if it fails. Second, a checker corps with one named lead, people who open a source, write what they found and sign their name to it. Third, somebody to carry it: hosting is one thousand pounds a year at this size, and the two people in Scotland who keep it need a fair living, so that tending it is the work. The record exports whole, so no host is trapped by it and no host can hold it to ransom. It is offered to be kept for good, not for a term. I would rather be told plainly that it is not a fit than be encouraged politely.`,
];

export const LETTER_SUBJECT =
  'Re: a public record of the climate solutions that work, offered to a host, and a request for the people to check it';

export const LETTER_SIGN_OFF = `With every good wish,

____________________________________
Signature · name · role — hers to add`;

export const LETTER_FULL = `UNIVERSAL FREQUENCY 51 CIC
Together We Can Change the Course of Climate Change
Community Interest Company, registered in Scotland, SC870603

${letterDate()}

[Name]
[Role or department]
[Institution]

${LETTER_SUBJECT}

Dear [Name],

${LETTER_PARAGRAPHS.join('\n\n')}

${LETTER_SIGN_OFF}`;