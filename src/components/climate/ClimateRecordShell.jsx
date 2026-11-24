import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RecordBackBar from '@/components/climate/RecordBackBar';
import { MarkEqual } from '@/components/climate/RecordFootMarks';
import { markFor } from '@/components/climate/pageMarks';

export default function ClimateRecordShell({ dir = 'ltr', eyebrow, marker, title, statement, returnTo, returnLabel, footer, showReturn = true, compact = false, mobileCompact = false, wide = false, onBack, backLabel, className = '', children }) {
  const { pathname } = useLocation();
  const Icon = markFor(pathname);
  return <div dir={dir} data-compact={compact} data-mobile-compact={mobileCompact} className={`climate-record record-page-shell record-connected-shell relative text-record-ink ${className}`}>
    <RecordBackBar eyebrow={eyebrow} fallback={returnTo} onBack={onBack} label={backLabel} />
    {!compact && <header className="record-room-intro">
      <Icon size={30} aria-hidden="true" />
      {marker && <small>{marker}</small>}
      <h1>{title}</h1>
      {statement && <p>{statement}</p>}
      <Link to="/XEqualsX"><MarkEqual size={23} /><span>Why this record</span></Link>
    </header>}
    <div className="record-room-body">
      <div className={`record-shell-content record-room-content mx-auto ${wide ? 'max-w-[1080px]' : 'max-w-3xl'}`}>{children}</div>
    </div>
    {showReturn && <div className="record-room-return"><Link to={returnTo || '/TogetherChangeClimate'}>{returnLabel || 'The record'}<ArrowRight size={18} aria-hidden="true" /></Link></div>}
    {footer && <p className="record-room-footnote">{footer}</p>}
  </div>;
}