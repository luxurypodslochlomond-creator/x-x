import React from 'react';
import { Link } from 'react-router-dom';

export default function XEqualsXClosing() {
  return (
    <section className="covenant-future" aria-labelledby="who-comes-after">
      <div className="covenant-future-inner">
        <p className="covenant-kicker">Purpose</p>
        <h2 id="who-comes-after">For the work beyond this page.</h2>
        <p>To make climate evidence, critical art and practical responses available to people doing the work.</p>
        <p className="covenant-future-strong"><strong>A public record is a tool, not an outcome.</strong> Its value depends on what people can use, challenge and act on. A growing collection is not evidence of environmental change.</p>
        <div className="covenant-inline-links">
          <Link to="/ClimateMethod">How the record works →</Link>
          <Link to="/ClimateSeals">Check a seal →</Link>
        </div>
      </div>
      <div className="covenant-small-print">
        <p className="covenant-makers-heading">Built with BASE 1. Human responsibility, on the record.</p>
        <p>This work did not begin with AI. Janine’s life’s work gives it direction. Researchers, communities and artists made the work it points to. Brian Hughes built this platform with BASE 1, the name used here for the AI assistant. The source work keeps its own authors.</p>
        <details className="covenant-provenance">
          <summary>Who made what, and who is accountable</summary>
          <div>
            <p>BASE 1 helped draft, organise, check links and build the platform. AI also assists search, screening and translation. These contributions are named so they can be questioned, not presented as scientific validation. No machine output counts as independent verification or a person’s sign-off.</p>
            <p>People decide what stays and are accountable for what is published. The method discloses automatically cleared and unsigned entries. Machine readings of drawings are labelled separately from the artist’s own words.</p>
            <Link to="/ClimateMethod">Read the editorial account →</Link>
          </div>
        </details>
        <p>A seal checks a saved version, not whether a claim is true. This is not a confidential whistleblowing service.</p>
        <nav className="covenant-inline-links" aria-label="Accountability and origins">
          <Link to="/ClimatePrivacy">What we keep</Link>
          <Link to="/ExtractionProofCovenant">Our commitments</Link>
          <Link to="/ClimateRoll">The people checking</Link>
          <a href="https://github.com/luxurypodslochlomond-creator/x-x" target="_blank" rel="noopener noreferrer">Public code ↗<span className="sr-only"> (opens a new tab)</span></a>
        </nav>
        <p>Our own words: <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0 ↗</a>. Code: <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener noreferrer">AGPL-3.0 ↗</a>. Other people’s work keeps its own rights and credits.</p>
      </div>
    </section>
  );
}