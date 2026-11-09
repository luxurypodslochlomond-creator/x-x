import React from 'react';
import { useLocation } from 'react-router-dom';
import { FOOTER_NAV } from '@/components/climate/recordFooterLinks';
import { useRecordCapacity } from '@/components/climate/useKeeper';
import LanguageStatus from '@/components/climate/LanguageStatus';
import RecordNavDoor from '@/components/climate/RecordNavDoor';

const CAPTIONS = { '/XEqualsX': 'Why', '/ClimateMethod': 'Method', '/ClimateCorrections': 'Corrections', '/ClimateGuide': 'Index' };

export default function RecordImprint({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();
  const { isKeeper, isChecker } = useRecordCapacity();
  return (
    <div className="flex flex-col gap-1 pb-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-1.5">
      <nav aria-label="How this record is kept" className="flex flex-wrap items-start gap-x-5 gap-y-2">
        {FOOTER_NAV.map(({ label, to, what }) => (
          <RecordNavDoor key={to} to={to} label={CAPTIONS[to] || label} what={what} size={32}
            active={to === '/ClimateGuide' ? contentsOpen : pathname === to}
            asButton={to === '/ClimateGuide'}
            onClick={to === '/ClimateGuide' ? onOpenContents : undefined}
            expanded={contentsOpen} controls="record-contents" />
        ))}
        {(isKeeper || isChecker) && <RecordNavDoor to="/ClimateKeeperRoom" label="The shed" size={32} active={pathname === '/ClimateKeeperRoom'} />}
      </nav>
      {/* The tongue itself is the seventh mark in the rail at the foot of the glass. What
          stays up here is the record's honesty line about that tongue — who made the wording
          and whether a speaker has checked it — because that sentence belongs beside the
          record's own name, not behind a door. */}
      <div className="min-w-0 sm:max-w-[19rem] sm:shrink-0">
        <LanguageStatus />
      </div>
    </div>
  );
}