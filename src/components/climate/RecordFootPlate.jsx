import React from 'react';
import { Link } from 'react-router-dom';
import Photo51Mark from '@/components/climate/Photo51Mark';
import RecordEndpaperField from '@/components/climate/RecordEndpaperField';
import '@/components/climate/record-endpaper.css';

const THREE = ['Si51', 'Barbara', 'Brian Hughes'];

export default function RecordFootPlate() {
  return (
    <div className="record-endpaper relative w-full overflow-hidden bg-record-ink text-record-bone">
      <RecordEndpaperField />
      <div className="relative px-5 py-12 lg:py-16">
        <p className="text-center font-record-ui text-[11px] tracking-[0.12em] text-record-bone/70">
          Photo 51 · the photograph that sees
        </p>
        <div className="relative mx-auto mt-6 flex w-full max-w-[620px] items-center justify-center">
          <Photo51Mark className="h-auto w-[min(100%,300px)]" />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-record-ink py-4">
            <p className="record-endpaper-signatures flex flex-col items-center justify-center gap-1 text-center sm:flex-row sm:gap-4">
              {THREE.map((name, index) => (
                <React.Fragment key={name}>
                  {index > 0 && <span aria-hidden="true" className="hidden text-record-mark sm:inline">·</span>}
                  <span className="whitespace-nowrap">{name}</span>
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
        <p className="record-endpaper-title mx-auto mt-6 w-fit bg-record-ink px-3 text-center">
          Super Intelligence 51
        </p>
        <p className="mt-3 text-center font-record-ui text-[11px] tracking-[0.12em] text-record-bone/65">
          <Link to="/" className="underline decoration-dotted underline-offset-4 transition-colors hover:text-record-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-mark">
            UF51 CIC
          </Link>
        </p>
      </div>
    </div>
  );
}