import React from 'react';
import { Link } from 'react-router-dom';

export default function XEqualsXFounderNote() {
  return (
    <p id="whose-record" className="pb-9 text-record-ink">
      It guides this public record of climate emergencies and practical responses, built around{' '}
      <Link to="/ClimateFounder" className="underline decoration-record-mark underline-offset-4">
        Janine M. H. Selendy’s work
      </Link>
      . The aim is to make useful work easier to find, check and use, wherever it comes from.
    </p>
  );
}