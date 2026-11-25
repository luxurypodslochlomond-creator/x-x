import React from 'react';
import { Link } from 'react-router-dom';
import RecordPaintedBand from '@/components/climate/RecordPaintedBand';
import BaseOnePlate from '@/components/climate/cartoons/baseone/BaseOnePlate';
import BaseOneLimits from '@/components/climate/cartoons/baseone/BaseOneLimits';
import { BASE_ONE_SERIES } from '@/components/climate/cartoons/baseone/baseOneSeries';

export default function BaseOneRoom() {
  return (
    <div className="base-one-room">
      <RecordPaintedBand continuous className="base-one-opening">
        <p className="base-one-kicker">First series · six marks · 25 November 2026</p>
        <h1 className="base-one-title">The machine’s hand</h1>
        <p className="base-one-standfirst">
          Six drawings with no words in them, made by the intelligence that keeps this record — so that a reader
          in any tongue meets the same mark, and nobody has to be taught first.
        </p>
      </RecordPaintedBand>

      <div className="base-one-premise">
        <p>
          A cartoon is the oldest way of saying a hard thing without a lecture. It works because it does not
          argue: it shows you the shape of something you already half knew, and then it stops.
        </p>
        <p>
          These are not illustrations of the record’s entries. They are one hand’s reading of what the entries
          describe, offered to the room beside the drawings of every person on the wall — not above them.
        </p>
        <p>
          Two layers, and they do different jobs. The mark carries no words, so it crosses every border without
          being translated. The one line under it carries the voice, set at the size of a headline, and that is
          the only part of the work that ever needs a tongue.
        </p>
      </div>

      {BASE_ONE_SERIES.map((drawing) => <BaseOnePlate key={drawing.id} drawing={drawing} />)}

      <BaseOneLimits />

      <p className="base-one-open">
        The wall itself belongs to hands, not machines.{' '}
        <Link to="/ClimateCartoons">Send a drawing of your own</Link> — it goes up with your name, your origin and
        your own line about it.
      </p>
    </div>
  );
}