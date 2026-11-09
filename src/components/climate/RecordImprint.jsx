import React from 'react';
import { useLocation } from 'react-router-dom';
import { FOOTER_NAV, PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import { useRecordCapacity } from '@/components/climate/useKeeper';
import LanguageStatus from '@/components/climate/LanguageStatus';
import RecordNavDoor from '@/components/climate/RecordNavDoor';

const CAPTIONS = { '/XEqualsX': 'Why', '/ClimateMethod': 'Method', '/ClimateCorrections': 'Corrections', '/ClimateGuide': 'Contents' };

export default function RecordImprint({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();
  const { isKeeper, isChecker } = useRecordCapacity();
  return (
    <div className="flex flex-col gap-1 pb-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-1.5">
      {/* ── THE WAY IN, ALONG THE TOP OF THE PAGE ───────────────────────────────────
          The masthead carried only the record's rulebook — why, method, corrections,
          index — and left the four places a reader actually arrives wanting (what is on
          the record, what changed, where it is, find me something) to the rail at the
          foot. On a wide screen that is a whole line of empty paper above the words, and
          a reader who has come for the entries has to go hunting for them at the bottom.
          The four doors are in the masthead now, on paper, on the one screen with room
          for them. A phone keeps the rail: eight marks on a 390-pixel line is not a way
          in, it is a grid of smudges. */}
      <nav aria-label="How this record is kept" className="flex flex-wrap items-start gap-x-5 gap-y-2">
        {PRIMARY_NAV.map(({ label, to, what }) => (
          <RecordNavDoor key={to} to={to} label={label} what={what} size={32}
            active={pathname === to} className="hidden lg:inline-flex" />
        ))}
        <span aria-hidden="true" className="mx-1 hidden self-stretch border-l border-record-ink/15 lg:block" />
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