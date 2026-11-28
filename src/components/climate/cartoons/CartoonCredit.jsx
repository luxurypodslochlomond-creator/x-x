import React from 'react';

// ── WHO THE IDEA BELONGS TO, AND WHO MADE THE PICTURE ─────────────────────────
// Alina Sen, 28 November: "UNLIKE other cartoonists that are on the wall, the idea and concept
// of the What On Earth! cartoons comes from me and my team, and then we get freelance
// cartoonists to do their magic and make it visual."
//
// She is right, and the wall was printing one line where there are two facts. The drawing is
// the cartoonist's — that name is set large above this line. The idea, the research and the
// commission are CEEW's, and that is now said first, in its own words, before the copyright
// line that already named the executive producers.
const isCEEW = (credit) => /Council on Energy, Environment and Water|What On Earth!/i.test(credit || '');

export default function CartoonCredit({ credit }) {
  if (!credit) return null;
  return <div className="press-sheet-credit">
    {isCEEW(credit) && (
      <p className="press-credit-idea">
        <span>Idea, research and commission</span> CEEW’s <em>What On Earth!</em> team. The drawing is the cartoonist’s.
      </p>
    )}
    <p className="press-credit-line">{credit}</p>
  </div>;
}