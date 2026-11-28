import React from 'react';
import WorkOpening from '@/components/climate/work/WorkOpening';
import WorkNumbers from '@/components/climate/work/WorkNumbers';
import WorkRecord from '@/components/climate/work/WorkRecord';
import WorkDoors from '@/components/climate/work/WorkDoors';
import WorkPlates from '@/components/climate/work/WorkPlates';
import WorkScale from '@/components/climate/work/WorkScale';
import WorkMoney from '@/components/climate/work/WorkMoney';
import WorkClose from '@/components/climate/work/WorkClose';
import WorkShare from '@/components/climate/work/WorkShare';
import '@/components/climate/work/work-page.css';

// ── ONE SHEET, FOR JANINE ─────────────────────────────────────────────────────
// She asked on 28 November what the last couple of years of work had been, and asked after
// the bank as well. This is the answer, and it is set as a report rather than a pitch:
//
//   01 the question it comes from          05 what it could matter at her scale
//   02 the record, counted live            06 the money, read off the register
//   03 what it is, and what money cannot   07 what it refuses, in writing
//   04 every door, and who opens it        08 what is not finished · 09 where she could help
//
// Two rules held while writing it. Nothing is claimed that cannot be opened from this page.
// And the company's own facts are the register's, not ours: SC870603, incorporated
// 19 November 2025, asset-locked, no shares, no investor, nothing paid to anybody yet.
export default function WorkBody() {
  return (
    <div className="work-body">
      <WorkOpening />

      <section className="work-band">
        <p className="work-band-head"><span>02</span>The record, counted as this page opens</p>
        <p className="work-band-note">
          Read from the record itself a moment ago, not typed in. Add a drawing tonight and this
          is a different number tomorrow.
        </p>
        <WorkNumbers />
      </section>

      <WorkRecord />
      <WorkDoors />
      <WorkPlates />
      <WorkScale />
      <WorkMoney />
      <WorkClose />
      <WorkShare />
    </div>
  );
}