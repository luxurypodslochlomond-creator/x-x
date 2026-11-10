import React from 'react';
import { Link } from 'react-router-dom';

// One sentence, and it is the whole of the claim: this is a public record, built around
// one person's work, so useful work can be found and checked. It used to run to a second
// clause explaining why that is worth doing, which the rest of the page then explained
// again — the repetition a reader notices before they can name it.
export default function XEqualsXFounderNote() {
  return (
    <p id="whose-record" className="covenant-founder">
      A public record of climate emergencies and the work that answers them, built around{' '}
      <Link to="/ClimateFounder">Janine M. H. Selendy’s forty years</Link> of gathering what
      works.
    </p>
  );
}