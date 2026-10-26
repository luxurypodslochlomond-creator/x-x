import React from "react";
import { MapPin, Ban } from "lucide-react";
import { WHERE, PLAN, MONEY, NO_TRICK } from "@/components/admin/sponsorRoutePlan";

export default function SponsorRoutePlan() {
  return (
    <div>
      <section className="mt-8 border-2 border-[#1a1612] bg-[#efe7d6] p-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 beadie-signal" />
          <p className="font-mono text-[11px] uppercase tracking-widest beadie-signal">
            Where he applies
          </p>
        </div>
        <p className="mt-2 font-display text-2xl beadie-ink">{WHERE.answer}</p>
        <ul className="mt-3 space-y-2">
          {WHERE.reasons.map((r) => (
            <li key={r} className="text-sm leading-relaxed beadie-ink">
              {r}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="border-b-2 border-[#1a1612] pb-2 font-mono text-xs font-bold uppercase tracking-widest beadie-ink">
          The plan, one step at a time
        </h2>
        <div className="mt-4 divide-y divide-[#1a1612]/15">
          {PLAN.map((step, i) => (
            <div key={step.title} className="py-5">
              <p className="font-mono text-[11px] uppercase tracking-widest beadie-muted">
                {String(i + 1).padStart(2, "0")} · {step.who} · {step.when}
              </p>
              <h3 className="mt-1 font-display text-xl beadie-ink">{step.title}</h3>
              <ul className="mt-2 space-y-1.5">
                {step.lines.map((line) => (
                  <li key={line} className="flex gap-2 text-sm leading-relaxed beadie-ink">
                    <span className="beadie-signal">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 border-2 border-[#1a1612] p-4">
        <p className="font-mono text-[11px] uppercase tracking-widest beadie-signal">
          What it costs
        </p>
        <div className="mt-3 divide-y divide-[#1a1612]/15">
          {MONEY.map(([who, what, total]) => (
            <div key={who} className="flex flex-wrap items-baseline gap-x-2 py-2.5">
              <p className="text-sm font-bold beadie-ink">{who}</p>
              <p className="w-full font-mono text-[11px] beadie-muted">{what}</p>
              <p className="font-mono text-xs beadie-signal">{total}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 flex gap-3 border-2 border-[#b3261e] bg-[#b3261e]/5 p-4">
        <Ban className="h-5 w-5 shrink-0 beadie-signal" />
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest beadie-signal">
            Nothing else
          </p>
          <p className="mt-2 text-sm leading-relaxed beadie-ink">{NO_TRICK}</p>
        </div>
      </section>
    </div>
  );
}