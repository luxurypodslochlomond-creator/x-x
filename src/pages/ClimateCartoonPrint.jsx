import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import PrintRoom from '@/components/climate/cartoons/print/PrintRoom';
// The room's own dress, so the print room is a room in the same building: the same paper,
// the same yellow plates, the same red rule over a heading. Then its own sheet on top.
import '@/components/climate/cartoons/press/press.css';
import '@/components/climate/cartoons/press/press-record-ink.css';
import '@/components/climate/cartoons/press/press-signal.css';
import '@/components/climate/cartoons/print/print-room.css';

export default function ClimateCartoonPrint() {
  return (
    <ClimateRecordShell
      compact
      /* A contact sheet is worked at, not read: the measure opens out on a large screen so
         the plates sit five or six across, the way a picture editor's sheet does. */
      wide
      className="cartoon-room press-room"
      eyebrow="The record · the cartoon room"
      returnTo="/ClimateCartoons"
      returnLabel="Back to the wall"
      footer="Every drawing keeps its artist’s name, its origin and the drawer’s own words — on the screen and on the paper."
    >
      <div className="press-room-inner">
        <PrintRoom />
      </div>
    </ClimateRecordShell>
  );
}