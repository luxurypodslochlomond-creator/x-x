import React from 'react';

// ── WHO THE HANDLER IS, EXACTLY ────────────────────────────────────────────────
// Janine's own wording was "the host should handle all traffic". That is a role
// nobody can hire against, so it is named here instead: one person, what they do,
// how long it takes, what they need to know, and what they are not.
// Two things this page will not do: pretend the £1,000 pays a person, or pretend
// the job is bigger than it is today.

const TASKS = [
  ['Answer what arrives', 'The review queue, a correction note, a line held back for a look.', 'An hour a month, at today’s size'],
  ['Keep the two domains alive', 'One address, one sending address, both in the host’s name. Renew before they lapse.', 'Twice a year'],
  ['Keep the plan right', 'Sized to storage, not visits. The number is on this page.', 'Once a quarter'],
  ['Publish the real figure', 'What was actually spent, once a year, in the open. Even when it is worse than the model.', 'Once a year'],
  ['Prove the way out', 'Run the export and open it. So nobody is trapped, including them.', 'Once a year'],
];

export default function HandlerBrief() {
  return (
    <div className="border-2 border-[#141210] mt-4">
      <div className="bg-[#141210] px-3 py-2">
        <p className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#efe7d6]">Who the handler is</p>
      </div>

      <div className="bg-[#f7f1e5] px-3 py-3">
        <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210]">
          <strong>One named person who keeps the record running.</strong> The editor decides what goes on it.
          The handler makes sure it is still there tomorrow. Two people, on purpose — that is the whole reason
          the role is written down here rather than left as &ldquo;the host&rdquo;.
        </p>

        <div className="mt-3 border border-[#141210]/25">
          {TASKS.map(([what, detail, when], i) => (
            <div key={what} className={`px-3 py-2 ${i > 0 ? 'border-t border-[#141210]/15' : ''}`}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[11px] lg:text-[12px] font-black font-mono text-[#141210]">{what}</span>
                <span className="text-[9.5px] font-mono uppercase tracking-wide text-[#5a5246] text-right flex-shrink-0">{when}</span>
              </div>
              <p className="text-[10.5px] lg:text-[11.5px] font-mono text-[#5a5246] leading-snug mt-0.5">{detail}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] lg:text-[12px] font-mono leading-relaxed text-[#141210] mt-3">
          <strong>What they need:</strong> no coding. A dashboard, an email address, a card for the renewals,
          and the habit of writing down what went wrong.
        </p>
        <p className="text-[11px] lg:text-[12px] font-mono leading-relaxed text-[#141210] mt-1.5">
          <strong>What they are not:</strong> the person who decides what is true, the founder, or anyone on
          call at night.
        </p>
        <p className="text-[11px] lg:text-[12px] font-mono leading-relaxed text-[#141210] mt-1.5">
          <strong>Where one comes from:</strong> the host&rsquo;s own web or operations person, or one named
          volunteer with a track record. Ask an organisation for one name, never a team.
        </p>

        <p className="mt-3 border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2.5 text-[11px] lg:text-[12px] font-mono leading-relaxed text-[#141210]">
          <strong>The money, said plainly.</strong> The £1,000 does not pay a person. At today&rsquo;s size the
          whole job is a couple of hours a month and it is unpaid, done by whoever keeps the record. The ladder
          moves at a million reads because that is the rung where a second, paid person is genuinely needed.
        </p>
      </div>
    </div>
  );
}