import React from 'react';

export default function XEqualsXContext() {
  return (
    <section aria-labelledby="attention-heading" className="space-y-5">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-record-red">What worries us</p>
      <h2 id="attention-heading" className="font-display text-3xl font-bold uppercase leading-tight">Our time and our attention are our own.</h2>
      <div className="space-y-4 text-base leading-relaxed">
        <p>When a service is paid for by advertising, the longer we stay, the more it can put in front of us and the more it learns about us. That pull to keep us there does not switch off when we grow up.</p>
        <p>Being measured against everyone else, interrupted again and again, always feeling a step behind — that can leave us tired rather than close to anyone. It is not everyone’s experience, and we will not pretend it is. But this worry is not only about children.</p>
        <p>None of this is a complaint about being connected. It is about a way of doing business that treats our time and our habits as something to be turned into money. We want no part of it — and there is nothing here that needs us to stay.</p>
      </div>
      <p className="border-l-4 border-record-signal bg-record-bone px-5 py-4 text-base font-semibold leading-relaxed">Climate emergencies already ask a great deal of people. This record should help us understand and act, not add another demand to keep watching.</p>
    </section>
  );
}