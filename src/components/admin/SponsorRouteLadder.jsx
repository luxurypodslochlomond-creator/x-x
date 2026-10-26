import React, { useEffect, useState } from "react";
import { STEPS } from "@/components/admin/sponsorRouteSteps";

const STORE = "uf51.sponsorRoute.ticked";

export default function SponsorRouteLadder() {
  const [ticked, setTicked] = useState({});

  useEffect(() => {
    try {
      setTicked(JSON.parse(localStorage.getItem(STORE) || "{}"));
    } catch {
      setTicked({});
    }
  }, []);

  const toggle = (n) => {
    const next = { ...ticked, [n]: !ticked[n] };
    setTicked(next);
    try {
      localStorage.setItem(STORE, JSON.stringify(next));
    } catch {
      /* private mode — ticks just won't survive the session */
    }
  };

  return (
    <ol className="space-y-4">
      {STEPS.map((step) => {
        const done = !!ticked[step.n];
        return (
          <li
            key={step.n}
            className={`border-2 p-4 ${done ? "border-[#1a1612]/25" : "border-[#1a1612]"}`}
          >
            <button onClick={() => toggle(step.n)} className="w-full text-left">
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 font-mono text-xs font-black tracking-widest ${
                    done ? "beadie-muted" : "beadie-signal"
                  }`}
                >
                  {step.n}
                </span>
                <div className="flex-1">
                  <h3
                    className={`font-display text-lg leading-tight ${
                      done ? "beadie-muted line-through" : "beadie-ink"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-widest beadie-muted">
                    {step.when}
                  </p>
                </div>
              </div>
            </button>
            <ul className="mt-3 space-y-2 border-t border-[#1a1612]/15 pt-3">
              {step.lines.map((line, i) => (
                <li key={i} className="text-sm leading-relaxed beadie-ink">
                  {line}
                </li>
              ))}
            </ul>
            {step.note && (
              <p className="mt-3 border-l-2 border-[#b3261e] pl-3 text-xs leading-relaxed beadie-muted">
                {step.note}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}