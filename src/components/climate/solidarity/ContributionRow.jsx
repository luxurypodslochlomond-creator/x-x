import React, { useId } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function ContributionRow({ item, open, onToggle, onOffer }) {
  const id = useId();
  return <div className={`solidarity-item${open ? ' solidarity-open' : ''}`}>
    <h3 className="solidarity-heading"><button type="button" id={`${id}-head`} className="solidarity-toggle" aria-expanded={open} aria-controls={`${id}-panel`} onClick={onToggle}>
      <Plus size={18} aria-hidden="true" /><span>{item.title}</span>
    </button></h3>
    <div className="solidarity-content" id={`${id}-panel`} role="region" aria-labelledby={`${id}-head`} inert={open ? undefined : ''}>
      <div className="solidarity-inner"><div className="solidarity-row">
        <div className="solidarity-photo"><img src={item.image} alt={item.alt} loading="lazy" decoding="async" /></div>
        <div className="solidarity-text">
          <p className="solidarity-body">{item.body}</p>
          {item.offer ? <a href="#offer-help" onClick={() => onOffer(item.offer)}>{item.action}</a> : <Link to={item.to}>{item.action}</Link>}
          <p className="solidarity-caption">{item.caption}</p>
        </div>
      </div></div>
    </div>
  </div>;
}