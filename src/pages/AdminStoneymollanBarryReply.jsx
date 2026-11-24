import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Printer, ArrowLeft, AlertTriangle } from 'lucide-react';

// ── THE REPLY TO BARRY HARPER, READY TO SEND ───────────────────────────────────
// Everything here comes from the saved file, not from memory:
//   · the objection of 1 September 2026 and Barry's response received 19 November;
//   · the previous owner's written account of 8 July 2025, which is where the mains
//     pipe comes from — its route, its ownership, and the vacuum breaker that exists
//     because pressure loss is "a regular occurrence";
//   · Brian's email of 4 June 2025, which put the horses and the eroded passing place
//     to Barry and was never answered on the substance.
//
// Two things in this letter Brian alone can fill: the dates of the works that were
// carried out without using the road, and the measured distance. They are marked
// plainly rather than guessed at, because a letter to an estate manager is the last
// place to put a number nobody checked.
//
// The tone is deliberately firm and deliberately not personal. No family, no motive,
// no wealth, no neighbour. Facts, requests, and a date.

const TO = 'Barry.Harper@scottishwoodlands.co.uk';
const FROM = 'tullifarm@btinternet.com';

const SUBJECT = 'Auchendennan Muir — works already carried out without the road, and the mains supply not addressed';

const BODY = `Dear Barry,

Thank you for your email and accompanying response received on 19 November 2026, following my objection of 1 September 2026.

Your response addresses the eleven headings I raised, and I acknowledge that. Four matters remain unresolved, and one material fact has since come to light which your response does not account for. I am asking for evidence and specific commitments, not a further general assurance.

1. WORKS HAVE ALREADY BEEN CARRIED OUT WITHOUT USING UPPER STONEYMOLLAN ROAD

On [FILL: date(s), and what was seen], works connected with your operations in this area were carried out, and the vehicles involved did not use Upper Stoneymollan Road. Please confirm:

- which route those vehicles used;
- whether that route remains available and suitable;
- why it is not the proposed route for the works described in your response; and
- which route any further works will be served by.

If an alternative access exists and has already been used, then the proposition that Upper Stoneymollan Road must carry these operations is not established. That is the central question in this correspondence.

2. THE SITE IS CLOSER THAN YOUR RESPONSE INDICATES

As previously noted, the proposal lies closer to Upper Stoneymollan Cottage, to the road and to the water main than the distances given in your response suggest. Please provide the boundary, planting and access plans you are working to, at a scale that allows the following to be measured directly:

- the nearest proposed planting boundary to the cottage and to the road;
- the distance from the proposed extraction route to the water main described at paragraph 3; and
- the position of any proposed fence line relative to the road and to that main.

I am not asking for an assurance on this point. I am asking for the plan, so that the distance can be checked.

3. THE MAINS WATER SUPPLY HAS NOT BEEN ADDRESSED AT ALL

Your response, the catchment map, the 135 m figure and the planting percentage all concern the burn. The house is not supplied from the burn. The previous owner's written account of 8 July 2025 records that the original private burn supply "is now disconnected from the house, and feeds the fishpond".

The domestic supply is treated mains water from Loch Finlas, approximately 6 km to the north, owned by Scottish Water. It runs up Lower Stoneymollan Road, under the A82, to the fork on Upper Stoneymollan Road, where it branches. The branch serving Upper Stoneymollan Cottage is a 50 mm blue MDPE pipe. That pipe is the sole property of the cottage and was paid for by its occupants. It is corporeal property, not merely a right.

Its route is documented:

- buried on the right-hand side of Upper Stoneymollan Road, from the fork all the way to the entrance to the cottage driveway;
- a vacuum breaker at the right-hand side of the driveway entrance, fitted "to prevent pipeline collapse during loss of water supply pressure (a regular occurrence)";
- buried down the centre of the driveway;
- around the west gable to an isolation valve approximately 0.5 m west of the north-west corner of the building.

The pipe therefore runs under the road your vehicles would use, and down the centre of the only private access to the house. Pressure loss is already a regular occurrence, and pipeline collapse is its documented consequence.

Please provide:

- the plan identifying this main, its route and its depth, together with the protection and incident-response arrangements proposed for it;
- the assessment of risk to it from vehicle loading on the road, and from works on the driveway and the verge;
- confirmation of which party accepts liability for damage to it, and the procedure for inspection, repair and dispute; and
- confirmation of whether Scottish Water has been consulted, and what they said. Scottish Water owns the main, the branch under the A82 and the hydrant at the fork. Your response does not mention Scottish Water at all.

A catchment planting map does not identify this infrastructure, and cannot answer these questions.

4. ROAD DAMAGE, TRAFFIC AND SAFETY

Please identify the party accepting responsibility for damage attributable to the operations; the pre- and post-works inspection arrangements; and the repair and dispute-resolution procedure. Please supply the written roads-authority conditions relied upon.

Please also provide the proposed route, the assessed alternatives and the reasons for the chosen route; vehicle types and maximum weights; expected movements and working hours; duration; and the arrangements for residents, guests, emergency access and people using the John Muir Way.

The road carries, in an ordinary week: group pony treks of up to seven horses twice daily Monday to Saturday; horse boxes to the cross-country course at weekends; children travelling to and from school; carers; guests of the shooting school, the Airbnbs and the pods; and members of the public walking, cycling, riding and walking dogs all year round. There is no safe way for a lorry and a group of horses to pass one another between the passing places, one of which has eroded and is nearly unusable. These points were set out to you in writing on 4 June 2025 and have not been answered on the substance.

5. CASE STATUS AND THE EVIDENCE RELIED UPON

Please provide the application reference, the submitted boundary and access plans, any EIA screening opinion together with the recorded reasons for it, and the survey reports and statutory consultation responses relied upon — including the cultural-heritage assessment and the treatment of scheduled monument SM6341 and its setting.

SENIOR OVERSIGHT

Please place this correspondence before your line manager, or the senior manager responsible for this proposal, and provide that person's name and contact details. I am asking for senior oversight because these matters have been put to you in writing since June 2025 and remain unanswered on the evidence. If no senior contact is identified within the response period, I will write to Scottish Woodlands' head office.

RESPONSE REQUIRED

Please provide a substantive, numbered response within 14 days of this email, answering each paragraph in turn. Where an item cannot yet be supplied, please identify what is outstanding and give a specific date for providing it.

These matters affect access to my home, my accommodation business, and infrastructure that belongs to the property. I am asking for the evidence and the safeguards that allow affected people to understand what is proposed and how they will be protected.

For context, the place and the business are shown at https://uf51.love/Stoneymollan. The legal rights and the technical questions stand on their own documents, not on that webpage.

I am pursuing the regulatory questions directly with Scottish Forestry. My objection of 1 September 2026 remains. This correspondence does not signify agreement to the proposed access arrangements, and does not waive any right under title DMB27637 or otherwise.

Yours sincerely,

Brian Hughes
Upper Stoneymollan Cottage`;

const FULL = `To: ${TO}\nSubject: ${SUBJECT}\n\n${BODY}`;

// ── HOW THE LETTER IS SET ON THE PAGE ──
// One source of truth: what is copied is exactly what is shown. A letter that reads one
// way on screen and another way in the sent email is worse than no letter at all.
function blocks(text) {
  return text.split('\n\n').map((raw) => {
    const t = raw.trim();
    if (/^\d\.\s[A-Z]/.test(t)) return { kind: 'head', text: t };
    if (t.startsWith('- ')) return { kind: 'list', items: t.split('\n').map((l) => l.replace(/^-\s/, '')) };
    return { kind: 'para', text: t };
  });
}

export default function AdminStoneymollanBarryReply() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(FULL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="min-h-screen bg-record-paper text-record-ink">
      <div className="mx-auto max-w-3xl px-4 py-8 pb-24 lg:px-8">

        <div className="no-print">
          <Link
            to="/AdminStoneymollanLegal"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-record-muted underline decoration-dotted underline-offset-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> The case file
          </Link>

          <h1 className="mt-4 text-[26px] leading-tight lg:text-[36px]" style={{ fontFamily: 'var(--font-display)' }}>
            The reply to Barry Harper
          </h1>
          <p className="mt-2 max-w-[52ch] text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
            Answers his 19 November response point by point, puts the two things he has not
            touched — the road already not being used, and the mains pipe — and asks for a
            named senior manager.
          </p>

          <div className="mt-5 border-2 border-record-red bg-record-red/5 p-4">
            <p className="flex items-center gap-2 font-mono text-[10.5px] font-black uppercase tracking-[0.16em] text-record-red">
              <AlertTriangle className="h-4 w-4" /> Two blanks to fill before sending
            </p>
            <ul className="mt-2 space-y-1.5 text-[13px] leading-snug text-record-ink/85">
              <li>1. Paragraph 1 — the date(s), and what was actually seen, when works were carried out without using the road.</li>
              <li>2. Check paragraph 2 reads true as written; add the measured distance if you have it.</li>
            </ul>
            <p className="mt-2 font-mono text-[10.5px] uppercase tracking-wide text-record-muted">
              Nothing else needs changing.
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={copy}
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-record-ink px-4 py-3 font-mono text-[11px] font-black uppercase tracking-wide text-record-paper"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied — paste it into the email' : 'Copy the whole email'}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex min-h-[48px] items-center justify-center gap-2 border-2 border-record-ink px-4 py-3 font-mono text-[11px] font-black uppercase tracking-wide"
            >
              <Printer className="h-4 w-4" /> Print
            </button>
          </div>

          <div className="mt-3 grid gap-1 border border-record-ink/20 bg-record-bone/50 p-3 font-mono text-[11px]">
            <p><span className="text-record-muted">TO</span> {TO}</p>
            <p><span className="text-record-muted">FROM</span> {FROM}</p>
            <p className="break-words"><span className="text-record-muted">SUBJECT</span> {SUBJECT}</p>
          </div>
        </div>

        <article className="mt-6 border-t-2 border-record-ink pt-6">
          {blocks(BODY).map((b, i) => {
            if (b.kind === 'head') {
              return (
                <h2 key={i} className="mt-7 font-mono text-[12px] font-black uppercase tracking-[0.12em] text-record-red">
                  {b.text}
                </h2>
              );
            }
            if (b.kind === 'list') {
              return (
                <ul key={i} className="mt-3 space-y-1.5 pl-1">
                  {b.items.map((it, j) => (
                    <li key={j} className="flex gap-2 text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
                      <span className="text-record-muted">–</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="mt-4 text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
                {b.text}
              </p>
            );
          })}
        </article>

        <div className="no-print mt-8 border-t border-record-ink/15 pt-4">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-record-muted">Before you press send</p>
          <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-record-ink/80" style={{ fontFamily: 'var(--font-reading)' }}>
            <li>The 14 days is a period you are asking for. It is not a statutory deadline, and it is not a guarantee he answers.</li>
            <li>Send this as a reply on the existing thread, so the 1 September objection and his 19 November response sit underneath it.</li>
            <li>Keep it separate from the Scottish Forestry representation, and send that the same day rather than waiting on him.</li>
            <li>Do not attach the Glasgow title plan. It belongs to another matter and handing it over weakens both.</li>
            <li>Keep the sent copy. The record of what was asked, and when, is the whole point of writing it down.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}