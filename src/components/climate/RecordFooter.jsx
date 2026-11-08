import React from 'react';
import { Link } from 'react-router-dom';
import RecordCover from '@/components/climate/RecordCover';
import RecordCosmos from '@/components/climate/RecordCosmos';
import KeeperDoor from '@/components/climate/KeeperDoor';
import RecordFooterGroup from '@/components/climate/RecordFooterGroup';
import { RECORD_FOOTER_GROUPS } from '@/components/climate/recordFooterLinks';

export default function RecordFooter({ showKeeper = true }) {
  return (
    <footer className="border-t-2 border-record-ink/15 bg-record-bone font-body text-record-ink">
      <div className="relative h-14 sm:h-20 overflow-hidden" aria-hidden="true">
        <RecordCover position="center 76%" strength={0.95} />
        <div className="absolute inset-0 bg-gradient-to-b from-record-earth/20 to-record-earth/90" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <RecordCosmos size={28} className="opacity-80" />
        </div>
      </div>
      <div className="mx-auto max-w-[1100px] px-5 py-5 sm:px-8">
        <nav aria-label="About the record and ways to take part" className="grid gap-x-8 sm:grid-cols-3">
          {RECORD_FOOTER_GROUPS.map((group) => <RecordFooterGroup key={group.id} group={group} />)}
        </nav>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-1">
          <Link to="/XEqualsX" aria-label="x equals x — the covenant" className="inline-flex min-h-11 items-center text-base tracking-[0.15em] text-record-mark underline-offset-4 hover:underline">x = x</Link>
          <nav aria-label="Legal and keeper access" className="flex flex-wrap items-center gap-x-5 text-xs text-record-muted">
            <Link to="/ClimateTerms" className="inline-flex min-h-11 items-center hover:text-record-red underline underline-offset-4">Terms</Link>
            <Link to="/ClimatePrivacy" className="inline-flex min-h-11 items-center hover:text-record-red underline underline-offset-4">Privacy</Link>
            {showKeeper && <KeeperDoor />}
          </nav>
        </div>
      </div>
    </footer>
  );
}