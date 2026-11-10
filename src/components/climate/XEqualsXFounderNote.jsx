import React from 'react';
import { Link } from 'react-router-dom';

export default function XEqualsXFounderNote() {
  return (
    <p id="whose-record" className="covenant-founder">
      A public record of climate emergencies and practical responses, built around{' '}
      <Link to="/ClimateFounder">Janine M. H. Selendy’s work</Link>.
      {' '}So useful work can be found, checked and used, wherever it comes from.
    </p>
  );
}