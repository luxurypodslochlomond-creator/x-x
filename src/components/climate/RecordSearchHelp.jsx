import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import RecordSearchGuide from '@/components/climate/RecordSearchGuide';

export default function RecordSearchHelp() {
  return (
    <>
      <details className="record-search-help group lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-record-ink">
          How search works
          <Plus aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-open:rotate-45" />
        </summary>
        <div className="pb-5 pt-3">
          <RecordSearchGuide />
          <Link to="/XEqualsX" className="mt-5 inline-flex min-h-11 items-center gap-2 text-record-ink underline underline-offset-4">
            Why this record <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </details>
      <div className="hidden lg:block"><RecordSearchGuide /></div>
    </>
  );
}