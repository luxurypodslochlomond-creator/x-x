import React from 'react';
import { Link } from 'react-router-dom';

export default function XEqualsXCollective() {
  return (
    <section id="collective" className="covenant-collective" aria-labelledby="collective-heading">
      <div className="covenant-collective-inner">
        <div className="covenant-collective-position">
          <p className="covenant-kicker">Technology in defence of life</p>
          <h2 id="collective-heading">The planet<br />is not content.</h2>
        </div>
        <div className="covenant-collective-argument">
          <p>A burning forest is not an engagement opportunity. A community is not an audience to be sold. Evidence should not have to win an attention auction to be found.</p>
          <p>That is the position. Here is the design: no advertising, no paid placement, no ranking by what keeps you scrolling. Crises, solutions and actions, filed by subject. Sources to follow. Credits that stay with the work. Corrections to read.</p>
          <p>A cartoon can confront power in a single image. Technology can confront it in its rules: who gets heard, who can inspect the evidence, who can take the work away. Public code and an exportable record make that position open to examination, not immune from it.</p>
          <p className="covenant-collective-call"><strong>Not a louder feed. A stronger public record.</strong> For communities, researchers, artists and organisers across the planet to find one another’s work and put it to use. The power is in what people do together, not how long they stay here.</p>
          <div className="covenant-inline-links">
            <Link to="/TogetherChangeClimate#record-room-groups">Find people doing the work →</Link>
            <Link to="/ClimateMethod">Inspect the method →</Link>
            <Link to="/TogetherChangeClimate?submit=1&type=group">Start a group →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}