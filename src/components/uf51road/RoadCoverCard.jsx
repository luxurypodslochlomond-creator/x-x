import React from "react";
import { ROAD_DOC } from "./roadDoc";

// The cover, on screen, exactly as it lands in the file.
export default function RoadCoverCard() {
  return (
    <div className="bg-record-ink text-record-paper px-6 py-8 sm:px-10 sm:py-12">
      <div className="h-1.5 w-24 bg-[#b3261e]" />
      <p className="mt-5 font-mono text-[10px] font-black tracking-[0.28em] text-[#b3261e]">
        {ROAD_DOC.brand}
      </p>
      <p className="mt-2 font-mono text-[10px] tracking-[0.24em] text-record-paper/70">
        WORKER No. 01 · SCOTLAND
      </p>

      <h2 className="mt-8 font-display text-5xl sm:text-6xl font-black leading-[0.95] tracking-tight">
        THE ROAD
      </h2>
      <p className="mt-3 font-mono text-xs font-black tracking-[0.24em] text-[#b3261e]">
        {ROAD_DOC.subtitle}
      </p>

      <p className="mt-6 font-display text-3xl font-black">{ROAD_DOC.subject}</p>
      <p className="mt-2 font-mono text-[11px] font-black tracking-[0.18em] text-[#b3261e]">
        {ROAD_DOC.role}
      </p>

      <p className="mt-6 max-w-md font-mono text-[11px] leading-relaxed text-record-paper/80">
        A record of the route, the money, the dates, the job title, the people to call, the duties
        owed, and the way he stays.
      </p>

      <p className="mt-5 font-mono text-[11px] font-black tracking-[0.18em] text-[#b3261e]">
        {ROAD_DOC.cover_line}
      </p>

      <div className="mt-8 border border-[#b3261e] p-4">
        <p className="font-mono text-[10px] font-black tracking-[0.2em] text-[#b3261e]">
          {ROAD_DOC.version}
        </p>
        <p className="mt-2 font-mono text-[10px] leading-relaxed text-record-paper/80">
          Every fee, date and address checked against GOV.UK on the day it was written. Fees change
          every April. This is a record of a route and not legal advice.
        </p>
      </div>

      <p className="mt-8 font-mono text-lg font-black tracking-[0.3em] text-record-mark">x = x</p>
    </div>
  );
}