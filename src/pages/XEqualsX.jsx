import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import XEqualsXContext from '@/components/climate/XEqualsXContext';
import XEqualsXPrinciples from '@/components/climate/XEqualsXPrinciples';
import XEqualsXEvidence from '@/components/climate/XEqualsXEvidence';

export default function XEqualsX() {
  return (
    <main className="min-h-screen bg-record-paper font-body text-record-ink">
      <div className="border-b border-record-ink/15 bg-record-bone px-5 py-3">
        <p className="mx-auto max-w-3xl font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.16em]">Record of the Time · The meaning of the mark</p>
      </div>
      <div className="mx-auto max-w-3xl space-y-10 px-5 py-9 sm:space-y-12 sm:px-8 sm:py-12">
        <header className="space-y-5 border-b-2 border-record-signal pb-8">
          <p className="font-mono text-sm font-bold tracking-[0.3em] text-record-red">x = x</p>
          <h1 className="font-display text-5xl font-bold uppercase leading-[0.98] tracking-tight sm:text-6xl">Nobody above<br />anybody.</h1>
          <p className="max-w-xl text-lg leading-relaxed">On this climate record, x = x means equal human worth. An emergency does not matter less because fewer people are watching. Equal worth is not equal size: a crisis affecting millions is still a larger crisis, and we count that honestly. What we refuse is the smaller one being treated as though it never happened.</p>
        </header>
        <XEqualsXContext />
        <XEqualsXPrinciples />
        <XEqualsXEvidence />
        <footer className="space-y-5 border-t-2 border-record-ink pt-7">
          <p className="font-display text-2xl font-bold uppercase leading-tight">The point is what we do beyond the screen.</p>
          <nav aria-label="About the record" className="flex flex-col items-start gap-4 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
            <Link to="/TogetherChangeClimate" className="inline-flex min-h-11 items-center gap-2 bg-record-red px-4 py-3 text-record-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-red">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to the record
            </Link>
            <Link to="/ExtractionProofCovenant" className="inline-flex min-h-11 items-center text-record-red underline underline-offset-4">Read the covenant</Link>
          </nav>
          <p className="pt-3 font-mono text-xs font-bold tracking-[0.3em] text-record-red">x = x</p>
        </footer>
      </div>
    </main>
  );
}