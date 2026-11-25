import React, { lazy, Suspense } from 'react';

const ClimateSubmitForm = lazy(() => import('@/components/climate/ClimateSubmitForm'));

// Reading the record does not need the submission editor until its door is opened.
export default function ClimateSubmitDoor(props) {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 z-[100] overflow-y-auto bg-record-bone p-4 text-record-ink">
        <div className="mx-auto flex max-w-[720px] justify-end">
          <button type="button" onClick={props.onClose} className="min-h-11 px-4 font-bold">Close</button>
        </div>
        <p role="status" className="py-16 text-center text-xs tracking-[0.3em]">LOADING · x = x</p>
      </div>
    }>
      <ClimateSubmitForm {...props} />
    </Suspense>
  );
}