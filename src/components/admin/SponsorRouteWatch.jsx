import React from "react";
import { AlertTriangle, ShieldCheck, Scale } from "lucide-react";

const TRAPS = [
  "A visitor cannot switch into a work visa from inside the UK. He leaves and applies from abroad — or the concession applies instead, and only for the right nationality.",
  "The licence is the bottleneck, not him. Eight weeks, or ten working days with priority. Everything else waits behind it.",
  "A refusal on genuineness or compliance grounds carries a 6-month cooling-off before the CIC can apply again. One careless first application costs more than doing it once, properly.",
];

const HOUSE = [
  "Suitability checks look at the company and its key people: unpaid civil penalties, signs of insolvency, and previous immigration breaches all count against it.",
  "Company filings and anything owed want to be current and settled before the licence goes in, with the paperwork to prove the CIC trades.",
  "The trading evidence is ordinary: contracts, invoices, a bank account with movement, the platform itself. That is what makes the role credible.",
];

export default function SponsorRouteWatch() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="flex items-center gap-2 border-b-2 border-[#1a1612] pb-2 font-mono text-xs font-bold uppercase tracking-widest beadie-ink">
          <AlertTriangle className="h-4 w-4 beadie-signal" />
          The three traps
        </h2>
        <ul className="mt-3 space-y-2">
          {TRAPS.map((t, i) => (
            <li key={i} className="text-sm leading-relaxed beadie-ink">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="flex items-center gap-2 border-b-2 border-[#1a1612] pb-2 font-mono text-xs font-bold uppercase tracking-widest beadie-ink">
          <ShieldCheck className="h-4 w-4 beadie-ink" />
          Clear our own house first
        </h2>
        <ul className="mt-3 space-y-2">
          {HOUSE.map((h, i) => (
            <li key={i} className="text-sm leading-relaxed beadie-ink">
              {h}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-2 border-[#1a1612] p-4">
        <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest beadie-ink">
          <Scale className="h-4 w-4 beadie-ink" />
          Who signs the filing
        </h2>
        <p className="mt-2 text-sm leading-relaxed beadie-ink">
          An OISC-registered adviser or an immigration solicitor, with the passport in front of
          them. Not this page, and not us. Citizens Advice Scotland gives a free first check on
          which route is even open to him.
        </p>
        <div className="mt-3 flex flex-col gap-1 font-mono text-[11px] tracking-wide">
          <a
            href="https://www.gov.uk/find-an-immigration-adviser"
            target="_blank"
            rel="noopener noreferrer"
            className="beadie-signal underline"
          >
            gov.uk · find a regulated immigration adviser
          </a>
          <a
            href="https://www.gov.uk/creative-worker-visa"
            target="_blank"
            rel="noopener noreferrer"
            className="beadie-signal underline"
          >
            gov.uk · Creative Worker visa
          </a>
          <a
            href="https://www.gov.uk/uk-visa-sponsorship-employers"
            target="_blank"
            rel="noopener noreferrer"
            className="beadie-signal underline"
          >
            gov.uk · sponsor licence for employers
          </a>
          <a
            href="https://www.artscouncil.org.uk/quality-work/global-talent-visa"
            target="_blank"
            rel="noopener noreferrer"
            className="beadie-signal underline"
          >
            artscouncil.org.uk · Global Talent endorsement
          </a>
        </div>
      </section>
    </div>
  );
}