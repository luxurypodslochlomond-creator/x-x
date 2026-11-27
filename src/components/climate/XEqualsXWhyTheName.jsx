import React from 'react';
import XEqualsXMarkSignal from '@/components/climate/XEqualsXMarkSignal';

export default function XEqualsXWhyTheName() {
  return (
    <section id="why-the-name" className="covenant-identity" aria-labelledby="why-name-heading">
      <p className="covenant-kicker">Why these three characters</p>
      <h2 id="why-name-heading">Equal worth.<br />Evidence still matters.</h2>
      <p>In maths, <span translate="no">x=x</span> is an identity: any defined x equals itself. It needs no approval.</p>
      <p>Here, it stands for equal dignity. A person’s worth is not their wealth, passport or following. <strong>That is our principle, not a mathematical proof. People deserve equal respect; claims still need evidence.</strong></p>
      <div className="covenant-mark-row">
        <XEqualsXMarkSignal className="covenant-mark" codeStyle={{ fontSize: '0.36em', letterSpacing: '0.08em' }} ariaLabel="Hear x equals x in Morse code" />
        <span className="covenant-caption">Same mark. Another language.<br />Press to hear it in Morse.</span>
      </div>
    </section>
  );
}