import React from "react";
import { ROAD_DOC } from "./roadDoc";

// What is inside the file, so it can be read here without opening it.
export default function RoadSectionList() {
  return (
    <div className="border border-record-ink/15 divide-y divide-record-ink/10">
      {ROAD_DOC.sections.map((s) => (
        <div key={s.n} className="flex items-start gap-4 px-4 py-4 sm:px-5">
          <span className="font-mono text-[11px] font-black text-[#b3261e] pt-0.5">{s.n}</span>
          <div className="min-w-0">
            <p className="font-display text-base font-black tracking-tight">{s.title}</p>
            <p className="mt-1 font-mono text-[11px] leading-relaxed text-record-muted">
              {s.kicker}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}