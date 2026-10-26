import React from "react";
import { MapPin, Ban } from "lucide-react";
import { WHERE, PLAN, MONEY, HONEST } from "@/components/plan/merrickPlan";

export default function MerrickPlan() {
  return (
    <div className="min-h-screen beadie-paper px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-widest beadie-signal">
          Universal Frequency 51 CIC
        </p>
        <h1 className="mt-2 font-display text-4xl leading-tight beadie-ink">
          The plan for Merrick
        </h1>
        <p className="mt-3 text-base leading-relaxed beadie-muted">
          One artist, one CIC, the fastest honest way in. Written for the two of us — read it
          together, then work down it in order.
        </p>

        <section className="mt-8 border-2 border-[#1a1612] bg-[#efe7d6] p-5">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 beadie-signal" />
            <p className="font-mono text-[11px] uppercase tracking-widest beadie-signal">
              Where he applies
            </p>
          </div>
          <p className="mt-3 font-display text-3xl leading-tight beadie-ink">{WHERE.answer}</p>
          <ul className="mt-4 space-y-3">
            {WHERE.reasons.map((r) => (
              <li key={r} className="text-base leading-relaxed beadie-ink">
                {r}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="border-b-2 border-[#1a1612] pb-2 font-mono text-xs font-bold uppercase tracking-widest beadie-ink">
            Step by step, in order
          </h2>
          <div className="mt-2 divide-y divide-[#1a1612]/15">
            {PLAN.map((step, i) => (
              <div key={step.title} className="py-6">
                <p className="font-mono text-[11px] uppercase tracking-widest beadie-signal">
                  Step {i + 1} · {step.who}
                </p>
                <h3 className="mt-2 font-display text-2xl beadie-ink">{step.title}</h3>
                <ul className="mt-3 space-y-2">
                  {step.lines.map((line) => (
                    <li key={line} className="flex gap-2 text-base leading-relaxed beadie-ink">
                      <span className="beadie-signal">·</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 border-2 border-[#1a1612] p-5">
          <p className="font-mono text-[11px] uppercase tracking-widest beadie-signal">
            What it costs
          </p>
          <div className="mt-4 divide-y divide-[#1a1612]/15">
            {MONEY.map(([who, what, total]) => (
              <div key={who} className="py-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="text-base font-bold beadie-ink">{who}</p>
                  <p className="font-mono text-sm beadie-signal">{total}</p>
                </div>
                <p className="mt-1 font-mono text-[11px] beadie-muted">{what}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 flex gap-3 border-2 border-[#b3261e] bg-[#b3261e]/5 p-5">
          <Ban className="h-5 w-5 shrink-0 beadie-signal" />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest beadie-signal">
              Straight with you both
            </p>
            <p className="mt-3 text-base leading-relaxed beadie-ink">{HONEST.lead}</p>
            <ul className="mt-4 space-y-2">
              {HONEST.items.map((item) => (
                <li key={item} className="flex gap-2 text-base leading-relaxed beadie-ink">
                  <span className="beadie-signal">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-base font-bold leading-relaxed beadie-ink">{HONEST.close}</p>
            <p className="mt-4 font-mono text-[11px] leading-relaxed beadie-muted">{HONEST.note}</p>
          </div>
        </section>
      </div>
    </div>
  );
}