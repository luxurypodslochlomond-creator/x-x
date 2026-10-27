import React from "react";
import { ROAD_CONTACTS } from "@/components/uf51road/roadContacts";

// The same list the file prints, made tappable. On a phone a number should dial,
// an address should open, and a page should be one press away — never typed by hand.
export default function RoadContactsCard() {
  return (
    <div className="border-2 border-record-ink/15 bg-record-bone/60">
      <ul className="divide-y divide-record-ink/10">
        {ROAD_CONTACTS.map((c) => {
          const isWeb = c.href?.startsWith("http");
          return (
            <li key={c.who} className="px-4 py-3.5">
              <p className="font-display text-[15px] font-black leading-tight tracking-tight">{c.who}</p>
              <p className="mt-1 font-mono text-[10px] leading-relaxed text-record-muted">{c.what}</p>
              {c.href ? (
                <a
                  href={c.href}
                  target={isWeb ? "_blank" : undefined}
                  rel={isWeb ? "noopener noreferrer" : undefined}
                  className="mt-2 inline-block font-mono text-[11px] font-black text-[#b3261e] underline decoration-dotted underline-offset-4"
                >
                  {c.tap || c.how}
                </a>
              ) : (
                <p className="mt-2 font-mono text-[11px] font-black">{c.how}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}