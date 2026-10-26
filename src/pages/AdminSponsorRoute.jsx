import React from "react";
import { Shield } from "lucide-react";
import SponsorRouteLadder from "@/components/admin/SponsorRouteLadder";
import SponsorRouteWatch from "@/components/admin/SponsorRouteWatch";

const FEES = [
  ["Worker + Temporary Worker sponsor licence", "£611", "under 8 weeks · £750 priority = 10 working days"],
  ["Certificate of sponsorship", "£55 Creative Worker · £525 Worker route", "the day the licence lands"],
  ["Creative Worker visa", "£340 + £1,035 a year health surcharge", "3 weeks from abroad · 8 weeks from inside"],
  ["Global Talent (his own, no sponsor)", "£561 endorsement + £205 visa", "up to 8 weeks endorsement · no fast track"],
  ["Immigration skills charge", "£480 a year (small sponsor)", "Skilled Worker only"],
];

export default function AdminSponsorRoute() {
  return (
    <div className="min-h-screen beadie-paper px-4 pt-10 pb-32 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3">
          <Shield className="h-7 w-7 beadie-ink" />
          <h1 className="font-display text-3xl beadie-ink">Sponsor Route</h1>
        </div>
        <p className="mt-3 text-sm leading-relaxed beadie-muted">
          Bringing an artist into the CIC on a real role, in the shortest honest time. Official
          routes only, step by step. Private — admins only.
        </p>

        <div className="mt-6 border-2 border-[#1a1612] p-4">
          <p className="font-mono text-[11px] uppercase tracking-widest beadie-signal">
            Read this first
          </p>
          <p className="mt-2 text-sm leading-relaxed beadie-ink">
            This is a map of the official routes, not immigration advice. A regulated adviser signs
            the filing with the passport in front of them. Fees and times are GOV.UK&apos;s, checked
            26 October 2026.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="border-b-2 border-[#1a1612] pb-2 font-mono text-xs font-bold uppercase tracking-widest beadie-ink">
            What it costs, and how long it takes
          </h2>
          <div className="mt-3 divide-y divide-[#1a1612]/15">
            {FEES.map(([item, cost, time]) => (
              <div key={item} className="py-3">
                <p className="text-sm font-bold beadie-ink">{item}</p>
                <p className="mt-1 font-mono text-xs beadie-signal">{cost}</p>
                <p className="mt-1 font-mono text-[11px] beadie-muted">{time}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="border-b-2 border-[#1a1612] pb-2 font-mono text-xs font-bold uppercase tracking-widest beadie-ink">
            The steps, in order
          </h2>
          <div className="mt-4">
            <SponsorRouteLadder />
          </div>
        </section>

        <div className="mt-10">
          <SponsorRouteWatch />
        </div>
      </div>
    </div>
  );
}