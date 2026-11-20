import React, { useState } from 'react';

// ── THE ADDRESS, AND A WAY TO TAKE IT WITH YOU ─────────────────────────────────
// The most useful thing on a working cartoonist's page is the link itself: it goes into an
// email to an editor, a message to a festival, a submission to a ministry. So it is set
// plainly and it can be copied in one tap, rather than being a line of small print a reader
// has to select with a thumb and hope.
//
// If the browser will not give the page the clipboard, nothing pretends otherwise: the
// button simply stays as it was, and the address above it is still there to be read.
export default function HandAddress({ address }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="hand-address-row">
      <p className="hand-address">{address.replace(/^https?:\/\//, '')}</p>
      <button type="button" className="hand-copy" onClick={copy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}