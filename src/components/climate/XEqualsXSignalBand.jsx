import React from 'react';
import XEqualsXSignalDrawing from '@/components/climate/XEqualsXSignalDrawing';
import XEqualsXSignalHistory from '@/components/climate/XEqualsXSignalHistory';

export default function XEqualsXSignalBand() {
  return (
    <section className="covenant-signal" aria-labelledby="signal-heading">
      <div className="covenant-signal-inner">
        <p className="covenant-kicker">The code · the wave · the connection</p>
        <h2 id="signal-heading">A signal can travel.<br />People make the connection.</h2>
        <p>A warning. A drawing. A way to help. The point is not only that a message can cross the world. It is that someone can answer.</p>
        <XEqualsXSignalDrawing />
        <p className="covenant-signal-meaning"><strong>The code is the rhythm. The wave carries it.</strong> Neither tells us what is worth saying. That responsibility is ours.</p>
        <XEqualsXSignalHistory />
      </div>
    </section>
  );
}