import React from 'react';
import { Link } from 'react-router-dom';

// ── WHO MADE THIS, AND IN WHICH SENSE ────────────────────────────────────────
// This line existed in four places and said "Platform built by Brian Hughes" in all four.
// Brian corrected it himself on 15 November: the thing was created by Gillian Barbara
// Brown, built by him, and made with BRO51 — the AI it was built alongside.
//
// They are three separate claims on purpose. "Created", "built" and "made with" are not
// synonyms, and collapsing them into one name is the small dishonesty that makes a reader
// distrust every other line on the page. The AI is named as an AI: it can hold a tool's
// credit honestly, and a person's only by pretending to be something it is not.
//
// It lives in one file now. Four copies of a credit is how three of them came to be wrong.
export default function RecordCredit({ className = '', style }) {
  return (
    <p className={`font-mono text-center leading-[1.9] ${className}`} style={style}>
      Created by Gillian Barbara Brown · Built by Brian Hughes · Made with BRO51, an AI
      <br />
      <Link to="/Welcome" className="underline decoration-dotted underline-offset-2 transition-colors hover:text-record-red">
        UF51 CIC
      </Link>
      {' '}· Scotland
    </p>
  );
}