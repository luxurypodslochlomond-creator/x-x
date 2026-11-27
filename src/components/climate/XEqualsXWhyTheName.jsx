import React from 'react';
import XEqualsXMarkSignal from '@/components/climate/XEqualsXMarkSignal';

export default function XEqualsXWhyTheName() {
  return (
    <section id="why-the-name" aria-labelledby="why-name-heading">
      <p className="covenant-kicker">The small sign behind it</p>
      <h2 id="why-name-heading">And x = x?</h2>
      <p>A reminder that a person’s worth is not measured by money, a title or a following. Not a claim that every story is equally true.</p>
      <p>The sign is a principle to work by. It cannot do the work for us, or make a website trustworthy on its own.</p>
      <div className="covenant-mark-row">
        <XEqualsXMarkSignal className="covenant-mark" codeStyle={{ fontSize: '0.36em', letterSpacing: '0.08em' }} ariaLabel="Hear x equals x in Morse code" />
        <span className="covenant-caption">Tap the mark to hear x = x in Morse.</span>
      </div>
    </section>
  );
}