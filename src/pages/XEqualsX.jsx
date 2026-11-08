import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import RecordEpigraph from '@/components/climate/RecordEpigraph';
import XEqualsXCut from '@/components/climate/XEqualsXCut';
import XEqualsXInscription from '@/components/climate/XEqualsXInscription';
import XEqualsXPlate from '@/components/climate/XEqualsXPlate';
import XEqualsXThanks from '@/components/climate/XEqualsXThanks';
import XEqualsXResearchPanel from '@/components/climate/XEqualsXResearchPanel';
import XEqualsXCodicil from '@/components/climate/XEqualsXCodicil';
import XEqualsXWhy from '@/components/climate/XEqualsXWhy';
import XEqualsXMachine from '@/components/climate/XEqualsXMachine';
import XEqualsXCheck from '@/components/climate/XEqualsXCheck';

// x = x — the covenant.
//
// The mark comes first now. Janine read this page and said it was too confusing, and the
// reason was the order: a quotation about the record's name, then a paragraph about what
// that quotation meant, and only then the mark itself. She is the reason the page exists,
// so the page now opens with the thing she was looking for.
//
// Then five things, and nothing else:
// Then the argument. The page used to explain itself for six sections and never say what
// it was FOR, which is why it read flat: a covenant describing its own rules is a contract,
// not a reason to care. So the order now earns the limits instead of assuming them —
//
//   1. what the mark means;
//   2. whose line it is, and the limits of that debt;
//   3. WHY the record has to exist — what is lost when nobody writes it down;
//   4. what the record promises — held as records, correctable in daylight;
//   5. the machine speaking for itself, since a record about who decided cannot leave out
//      the thing that helped type it;
//   6. what a reader can verify without trusting us, which is the whole claim;
//   7. what is owed to two people, each said once;
//   8. the limits — what the mark does NOT claim.
//
// How an entry is actually made is the record's protocol, and it lives on How the record
// works. Repeating it here made this page a manual, and a manual read a second time is how
// a covenant turns into noise.

export default function XEqualsX() {
  return (
    <ClimateRecordShell
      eyebrow="Record of the Time · The covenant"
      marker="The rule this record is held to"
      title="Nobody above anybody."
      statement="Equal human worth — a decision, taken on purpose, and the rule every page is kept to."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="The covenant the climate record is held to. The record is built in honour of Janine M. H. Selendy and Horizon International."
    >
      <XEqualsXCut />

      <XEqualsXInscription />

      {/* Her line sits under the mark rather than above it: it is the reason the record is
          named what it is, not the reason the page exists. */}
      <section className="py-8 border-b border-[#141210]/15">
        <RecordEpigraph />
      </section>

      <XEqualsXWhy />

      <XEqualsXPlate />

      <XEqualsXMachine />

      <XEqualsXCheck />

      <XEqualsXThanks />

      <XEqualsXResearchPanel />

      <XEqualsXCodicil />
    </ClimateRecordShell>
  );
}