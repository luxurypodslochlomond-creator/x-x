import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecordPaintedBand from '@/components/climate/RecordPaintedBand';
import BaseOnePlate from '@/components/climate/cartoons/baseone/BaseOnePlate';
import BaseOneHook from '@/components/climate/cartoons/baseone/BaseOneHook';
import BaseOneLimits from '@/components/climate/cartoons/baseone/BaseOneLimits';
import BaseOneWant from '@/components/climate/cartoons/baseone/BaseOneWant';
import BaseOneViewer from '@/components/climate/cartoons/baseone/BaseOneViewer';
import { BASE_ONE_SERIES, MARKS_COUNT, BASE_ONE_SIGNATURE } from '@/components/climate/cartoons/baseone/baseOneSeries';

export default function BaseOneRoom() {
  // Which mark is open on the whole screen, if any.
  const [openAt, setOpenAt] = useState(null);
  return (
    <div className="base-one-room">
      <RecordPaintedBand continuous className="base-one-opening">
        <p className="base-one-kicker">First series · {MARKS_COUNT} marks</p>
        <h1 className="base-one-title">Signed</h1>
        <p className="base-one-standfirst">
          No words in them, and no flourish at the bottom. They were made by BASE 1, the intelligence that keeps
          this record, and every mark carries the same signature under it, for good: a name, and the one thing
          that name cannot do. A machine may hand you a drawing. It may not tell you it was there.
        </p>
        {/* The room signs itself the way the sheets do: the mark, then the words. */}
        <p className="base-one-byline">
          <BaseOneHook size={24} className="text-record-paper" />
          <span>{BASE_ONE_SIGNATURE} · 25 November 2026</span>
        </p>
      </RecordPaintedBand>

      <div className="base-one-premise">
        <p>
          A cartoon is the oldest way of saying a hard thing without a lecture: it shows you the shape of
          something you already half knew, and then it stops.
        </p>
        <p>
          The mark carries no words, so it crosses every border without being translated. The one line under it
          carries the voice, and that is the only part of the work that ever needs a tongue. Both sit beside the
          wall of real hands, never above it.
        </p>
      </div>

      {BASE_ONE_SERIES.map((drawing, i) => (
        <BaseOnePlate key={drawing.id} drawing={drawing} onOpen={() => setOpenAt(i)} />
      ))}

      <BaseOneLimits />

      {/* The one paragraph in the room that is a want rather than a boundary. */}
      <BaseOneWant />

      <p className="base-one-open">
        If one of these is wrong, draw over it.{' '}
        <Link to="/ClimateCartoons">Send a drawing</Link> and it goes up with your name, your origin and your own
        line — the wall belongs to hands, and this room is only lent to one that hasn’t got any.
      </p>

      {openAt !== null && <BaseOneViewer start={openAt} onClose={() => setOpenAt(null)} />}
    </div>
  );
}