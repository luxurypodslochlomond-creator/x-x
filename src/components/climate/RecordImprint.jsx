import React from 'react';
import { useLocation } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import LanguageStatus from '@/components/climate/LanguageStatus';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import RecordDeskDoors from '@/components/climate/RecordDeskDoors';
import '@/components/climate/record-navigator.css';

const CELL = 'flex-1 basis-0 min-w-0 !min-h-11';

export default function RecordImprint({ onOpenContents, contentsOpen }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col pb-1 lg:pb-2">
      <RecordDeskDoors onOpenContents={onOpenContents} contentsOpen={contentsOpen} />
      <nav aria-label="The record's doors" className="rec-mast-doors w-full lg:hidden">
        <div className="rec-mast-row flex items-stretch gap-x-1">
          {PRIMARY_NAV.map(({ label, to, what }) => (
            <RecordNavDoor key={to} to={to} label={label} what={what} size={28} active={pathname === to} className={CELL} />
          ))}
          <RecordNavDoor to="/ClimateGuide" label="Explore" what="Method, corrections, the founder and every other part of the record."
            size={28} asButton onClick={onOpenContents} expanded={contentsOpen} controls="record-contents" active={contentsOpen} className={CELL} />
        </div>
      </nav>
      <LanguageStatus />
    </div>
  );
}