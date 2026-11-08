import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import XEqualsXInscription from '@/components/climate/XEqualsXInscription';
import RecordInPractice from '@/components/climate/RecordInPractice';
import XEqualsXCheck from '@/components/climate/XEqualsXCheck';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import XEqualsXCodicil from '@/components/climate/XEqualsXCodicil';

export default function XEqualsX() {
  return (
    <ClimateRecordShell
      compact
      eyebrow="Why this record"
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Built in honour of Janine M. H. Selendy and Horizon International. The phrase ‘the record of the time’ is Laurie Anderson’s, from From the Air, Big Science, 1982. No endorsement is claimed."
    >
      <XEqualsXInscription />
      <RecordInPractice />
      <details className="mb-5 border-b border-record-ink/25 pb-5">
        <summary className="cursor-pointer py-3 font-body text-lg text-record-ink marker:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-red focus-visible:outline-offset-4">
          Read the promises and their limits
        </summary>
        <XEqualsXCheck />
        <XEqualsXResearchPanel />
        <XEqualsXCodicil />
      </details>
      <p className="record-meta text-record-muted">This covenant is not yet signed by a person.</p>
    </ClimateRecordShell>
  );
}