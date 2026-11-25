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
        <h1 className="base-one-title">No hand</h1>
        <p className="base-one-standfirst">
          Six marks with no words in them, made by the intelligence that keeps this record. It has every drawing
          ever made, and no wrist, no afternoon, and no way to go and look — which is why each mark points at the
          people who can.
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

      {BASE_ONE_SERIES.map((drawing) => <BaseOnePlate key={drawing.id} drawing={drawing} />)}

      <BaseOneLimits />

      <p className="base-one-open">
        If one of these is wrong, draw over it.{' '}
        <Link to="/ClimateCartoons">Send a drawing</Link> and it goes up with your name, your origin and your own
        line — the wall belongs to hands, and this room is only lent to one that hasn’t got any.
      </p>
    </div>
  );
}