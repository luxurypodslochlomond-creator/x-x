import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';

export default function CorrectionRow({ correction, n }) {
  const changed = correction.changed ? new Date(correction.changed) : null;
  const when = changed && !Number.isNaN(changed.getTime())
    ? changed.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : null;
  return (
    <li className="corr-line">
      <details>
        <summary>
          <span className="corr-summary-copy">
            <span className="corr-meta"><span className="corr-number">{n}</span> · {correction.kind}</span>
            <span className="corr-title">{correction.title}</span>
            <span className="corr-preview">{correction.note}</span>
          </span>
          <span className="corr-toggle" aria-hidden="true"><Plus className="corr-plus" size={16} /><Minus className="corr-minus" size={16} /></span>
        </summary>
        <div className="corr-note">
          <p>{correction.note}</p>
          <p className="corr-updated">{when ? <time dateTime={correction.changed}>Record updated {when}</time> : 'Update date not recorded'}</p>
          <Link to={correction.to} className="corr-report">Read the current account →</Link>
        </div>
      </details>
    </li>
  );
}