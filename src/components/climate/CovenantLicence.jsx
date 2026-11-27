import React from 'react';
import { Link } from 'react-router-dom';

const TERMS = [
  { label: 'The words we give', name: 'CC BY-SA 4.0', href: 'https://creativecommons.org/licenses/by-sa/4.0/legalcode', means: 'Copy and adapt them, including commercially. Give credit, mark your changes, and share adaptations under the same terms.' },
  { label: 'The code', name: 'GNU AGPL-3.0', href: 'https://www.gnu.org/licenses/agpl-3.0.html', means: 'Use and adapt it. If people use your modified version over a network, offer them its corresponding source under the same licence.' },
];

export default function CovenantLicence() {
  return (
    <section className="covenant-licence" aria-labelledby="open-to-use">
      <h2 id="open-to-use">Useful things should be able to travel.</h2>
      <p className="covenant-licence-says">These licences let others build on what we make, with credit and the same freedoms passed on.</p>
      <div className="covenant-licence-terms">
        {TERMS.map(({ label, name, href, means }) => (
          <div key={name} className="covenant-licence-term">
            <span className="covenant-licence-label">{label}</span>
            <a className="covenant-licence-name" href={href} target="_blank" rel="noreferrer noopener" translate="no">{name}<span className="sr-only"> (opens a new tab)</span></a>
            <p className="covenant-licence-means">{means}</p>
          </div>
        ))}
      </div>
      <p className="covenant-licence-says">They cover work we can license, not other people’s drawings, photographs or source material. Those keep their own rights and credits. Permissions already granted continue while the licence terms are followed.</p>
      <p className="covenant-licence-says"><a href="https://github.com/luxurypodslochlomond-creator/x-x" target="_blank" rel="noreferrer noopener">Read the public code ↗</a> or <Link to="/ExtractionProofCovenant">read our commitments</Link>. A licence gives rights and responsibilities; it cannot promise that nobody will misuse the work.</p>
      <p className="covenant-licence-give">The organisations maintaining these licences also welcome support: <a href="https://creativecommons.org/donate" target="_blank" rel="noreferrer noopener">Creative Commons ↗</a> and <a href="https://my.fsf.org/donate" target="_blank" rel="noreferrer noopener">the Free Software Foundation ↗</a>.</p>
    </section>
  );
}