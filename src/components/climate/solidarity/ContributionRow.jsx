import React, { useId } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function ContributionRow({ item, number, open, onToggle, onOffer }) {
  const id = useId();
  return <div className={`solidarity-item${open ? ' solidarity-open' : ''}`}>
    <h3 className="solidarity-heading"><button type="button" id={`${id}-head`} className="solidarity-toggle" aria-expanded={open} aria-controls={`${id}-panel`} onClick={onToggle}>
      <span className="solidarity-number" aria-hidden="true">{String(number).padStart(2, '0')}</span>
      <span className="solidarity-name">{item.title}</span><Plus size={20} aria-hidden="true" />
    </button></h3>
    <div className="solidarity-content" id={`${id}-panel`} role="region" aria-labelledby={`${id}-head`} hidden={!open}>
      <div className="solidarity-text">
        <p className="solidarity-body">{item.body}</p>
        {item.offer ? <a href="#offer-help" onClick={() => onOffer(item.offer)}>{item.action}</a> : <Link to={item.to}>{item.action}</Link>}
      </div>
    </div>
  </div>;
}