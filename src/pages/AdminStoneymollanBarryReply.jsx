import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Printer, ArrowLeft, AlertTriangle, Mail, Scale } from 'lucide-react';

// ── THE REPLY TO BARRY HARPER'S 19 NOVEMBER EMAIL ─────────────────────────────
// What he actually wrote, and it matters that it is read exactly:
//
//   "I can confirm that we intend to proceed with the proposal."
//   "...responses to the matters raised are set out in the attached document. The response
//    includes guidance ... 'Managing forestry operations to protect private water supplies',
//    issued by Scottish Forestry."
//   "...has not yet been approved ... remains subject to consultation ... will continue to
//    inform the development and refinement of the woodland design, where appropriate."
//
// So: he has confirmed he is going ahead, he has answered eleven specific questions with a
// published industry guidance note that was not written about this place, and he has left
// himself the words "where appropriate" as the way out of every point.
//
// That is the whole of the response, and the letter answers it on exactly that ground: the
// guidance is the standard, not the answer; "where appropriate" is not a commitment; and
// because the application is not yet determined, the design is still open — which is the
// leverage, and it expires the day Scottish Forestry signs.
//
// THE RIGHTS SECTION IS THE PART BRIAN ASKED FOR BY NAME. Eight of them, each stated with
// the instrument it comes from, because "we have rights" is worth nothing in a letter and
// "servitude, in the missives in title DMB27637, remedies interdict and damages" is worth
// everything. Nothing in it is a threat. It is a description of the ground.

const TO = 'Barry.Harper@scottishwoodlands.co.uk';
const FROM = 'tullifarm@btinternet.com';
const SUBJECT = 'RE: Auchendennan Woodland Creation — your email of 19 November: the guidance is the standard, not the answer';

// ── WHAT WE ACTUALLY HAVE ─────────────────────────────────────────────────────
// Kept as data so the letter and the page can never drift apart.
const RIGHTS = [
  {
    n: 1,
    title: 'The burn supply is a servitude — a real right in the land',
    body: 'Contained in the property missives in our title deeds, DMB27637. A servitude binds you and every successor and cannot be planted over, fenced off or engineered away. A right to take water carries with it the access reasonably necessary to maintain the works that take it — the weir and the settling tank. Making that maintenance impossible is interference with a servitude.',
    remedy: 'Remedies in Scots law: interdict and damages.',
  },
  {
    n: 2,
    title: 'The mains pipe is our property, not a right',
    body: 'The 50 mm blue MDPE from the fork on Upper Stoneymollan Road to the house is owned by the cottage and was paid for by its occupants. It is corporeal property. Damaging it is a delict, and it is your operations that would create the risk.',
    remedy: 'Duty of care; damages for loss and repair.',
  },
  {
    n: 3,
    title: 'Access to our home is not a favour',
    body: 'Upper Stoneymollan Road is how we, our guests, the carers, the ponies and the emergency services reach the property. Whatever its status, we have a right of access to it, and works that make it unsafe or impassable interfere with that right.',
    remedy: 'Interdict against interference; damages.',
  },
  {
    n: 4,
    title: 'The cairn is protected by statute, and the protection is criminal',
    body: 'If the Neolithic chambered cairn at Cameron Farm is scheduled, works affecting it require scheduled monument consent, and it is an offence to execute such works without it. If it is not scheduled it is still a recorded historic environment asset, and the UK Forestry Standard requires it — and its setting — to be assessed and excluded. Historic Environment Scotland is a statutory consultee.',
    remedy: 'Ancient Monuments and Archaeological Areas Act 1979; UKFS.',
  },
  {
    n: 5,
    title: 'We have a statutory right to the file itself',
    body: 'Under the Environmental Information (Scotland) Regulations 2004, Scottish Forestry and HES must make environmental information available on request within 20 working days. If they refuse, we have a right of review, then a right of appeal to the Scottish Information Commissioner.',
    remedy: 'We do not need your permission to see the file. We ask the regulators.',
  },
  {
    n: 6,
    title: 'We have a right to be consulted on the EIA determination, and to reasons',
    body: 'Afforestation above the thresholds in the Forestry (Environmental Impact Assessment) (Scotland) Regulations 2018 requires an EIA determination. As an affected neighbour we are entitled to make representations and to be told the outcome and the reasons — including any screening opinion and the recorded reasons for it.',
    remedy: 'Representation, then reasons in writing.',
  },
  {
    n: 7,
    title: 'Where public money is involved, the conditions are public',
    body: 'If a Forestry Grant Scheme award supports this, the UK Forestry Standard and its water and historic environment requirements are conditions of that grant. They are not a private arrangement between you and the landowner. Compliance is answerable to the body that pays.',
    remedy: 'Grant conditions, publicly enforceable.',
  },
  {
    n: 8,
    title: 'Nothing is settled yet — and that is the most useful right of all',
    body: 'Your own email says the proposal has not been approved and remains subject to consultation. The design is still open. The boundary can move, the fence can move, the access can change, the cairn can be excluded. What happens next is decided on the evidence — and the evidence is what we are asking for.',
    remedy: 'Leverage that expires the day Scottish Forestry signs.',
  },
];

const BODY = `Dear Barry,

Thank you for your email of 19 November 2026 and for the attached guidance. I am replying to it directly, because it does not answer the objection.

1. WHAT YOUR EMAIL ACTUALLY SAYS

You have confirmed three things and I want to be accurate about each of them.

First, that Scottish Woodlands intends to proceed. Second, that the matters I raised have been reviewed and considered as part of the woodland creation design process. Third, that the proposal has not been approved, remains subject to consultation, and that my points will continue to inform the development and refinement of the woodland design, where appropriate.

I note the last three words. "Where appropriate" is not a commitment to anything. It leaves every point I raised open to being found inappropriate, by you, without reasons given. That is the gap I am asking you to close.

Please tell me, for each of the eleven headings in my objection of 1 September 2026, whether it has changed the design, been accepted without change, or been rejected — and where rejected, on what basis. That is a short answer per heading and it is the answer the word "considered" implies.

2. THE ATTACHMENT IS GUIDANCE TO THE INDUSTRY. IT IS NOT A RESPONSE TO US.

The document you sent, "Managing forestry operations to protect private water supplies", is Scottish Forestry's published guidance on how operations of this kind should be conducted. It was not written about Auchendennan. It was not written about Upper Stoneymollan Road, about the 50 mm MDPE main buried under that road and down the centre of our driveway, or about the weir 200 m up the burn that has to be dug out roughly once a year.

Sending me the guidance does not tell me what you are going to do. It tells me the standard you are expected to meet.

I will hold you to that standard, because it is your own. Your email asserts that private water supplies must be protected. If that is so, then the guidance is an acknowledgement that our supply is a material constraint on this design — not an irrelevance to be answered with a catchment map and a distance. What is missing is the part only you can supply: the plan, the route, the depth, the protection measures, the inspection regime, and the name of the party who pays when the pipe is broken.

So please answer the questions about our water, in this place, on these drawings. The guidance is the frame. The answers are the letter.

3. OUR RIGHTS, SET OUT PLAINLY

I am setting these out not as a threat but so that we are both clear about the ground we are standing on.

First: the burn supply is a servitude, and it is a real right in the land. It is contained in the property missives in our title deeds, DMB27637. A servitude binds you and every successor, and it cannot be planted over, fenced off or engineered away. A right to take water carries with it the access reasonably necessary to maintain the works that take it — the weir approximately 200 m up the burn and the settling tank approximately 50 m south-east of it, in the field adjacent to the property. If planting or a deer fence makes that maintenance impossible, that is interference with a servitude, and the remedies in Scots law are interdict and damages.

Second: the mains pipe is our property, not a right. The 50 mm blue MDPE pipe from the fork on Upper Stoneymollan Road to the house is owned by the cottage and was paid for by its occupants. It is corporeal property. Damage to it is a delict, and it is your operations that would be creating the risk.

Third: access to our home is not a favour. Upper Stoneymollan Road is how we, our guests, the carers, the ponies and the emergency services reach the property. Whatever its status, we have a right of access, and works that make it unsafe or impassable interfere with that right.

Fourth: the cairn is protected by statute, and the protection is criminal rather than civil. If the Neolithic chambered cairn at Cameron Farm is scheduled, works affecting it require scheduled monument consent under the Ancient Monuments and Archaeological Areas Act 1979, and it is an offence to execute such works without it. If it is not scheduled, it remains a recorded historic environment asset, and the UK Forestry Standard requires it — and its setting — to be assessed and excluded. Historic Environment Scotland is a statutory consultee for this application.

Fifth: we have a statutory right to the file itself. Under the Environmental Information (Scotland) Regulations 2004, Scottish Forestry and Historic Environment Scotland must make environmental information available on request within 20 working days, and where access is refused there is a right of review and then a right of appeal to the Scottish Information Commissioner. I am exercising that right in parallel with this letter. I am not asking your permission to see the application. I am asking the regulators, on a clock that is already running.

Sixth: we have a right to be consulted on the EIA determination, and to reasons. Afforestation above the thresholds in the Forestry (Environmental Impact Assessment) (Scotland) Regulations 2018 requires an environmental impact assessment determination. As an affected neighbour we are entitled to make representations and to be told the outcome and the reasons for it, including any screening opinion and the recorded reasons behind it.

Seventh: where public money is involved, the conditions are public. If this proposal is supported by a Forestry Grant Scheme award, the UK Forestry Standard and its water and historic environment requirements are conditions of that grant. They are not a private arrangement between you and the landowner, and compliance is answerable to the body that pays.

Eighth, and most importantly: nothing is settled yet. Your own email says the proposal has not been approved and remains subject to consultation. That means the design is still open. The boundary can still move, the fence can still move, the access can still change and the cairn can still be excluded. It also means the decision will be taken on the evidence — and the evidence is precisely what I am asking you for.

4. THE QUESTIONS YOUR EMAIL LEAVES OPEN

Access
1. Which route did the vehicles use for the works already carried out in this area without using Upper Stoneymollan Road, on [FILL: date(s) and what was seen]?
2. Does that route remain available, and why is it not the proposed route for the works described in your response?

Water — the burn
3. How is the annual dig-out of the weir approximately 200 m up the burn, and access to the settling tank approximately 50 m south-east of it in the adjacent field, to be maintained through the planting and through a deer fence? Where will the gates be?

Water — the mains
4. Please provide the plan identifying the 50 mm MDPE main, its route and its depth, with the protection and incident-response arrangements proposed for it.
5. What is the assessed risk to that main from vehicle loading on the road, and from works on the driveway and the verge?
6. Which party accepts liability for damage to it, and what is the procedure for inspection, repair and dispute?
7. Has Scottish Water been consulted, and what did they say? Scottish Water owns the main, the branch under the A82 and the hydrant at the fork, and your email does not mention Scottish Water at all.

Heritage
8. Was the Neolithic chambered cairn at Cameron Farm identified in the archaeological assessment referred to in your email? If so, what does that assessment say about the monument and its setting?
9. Is it a scheduled monument, and if not, what is its record in the Historic Environment Record?
10. Do the proposed boundary, the deer fence and the extraction route exclude the monument and its setting? Has Historic Environment Scotland been consulted, and what did they say?

Money
11. Has an application been made, or an award given, under the Forestry Grant Scheme or any other public source for this proposal? Please provide the application reference.

Design and distances
12. Please provide the boundary, planting and access plans at a scale that allows the nearest proposed planting boundary, the extraction route and any fence line to be measured against the cottage, the road, the main and the burn supply. I am asking for the plan rather than an assurance, so that the distance can be checked rather than accepted.

Road, traffic and safety
13. Which party accepts responsibility for damage attributable to the operations, and what are the pre- and post-works inspection, repair and dispute arrangements? Please supply the written roads-authority conditions relied upon.
14. Please provide vehicle types and maximum weights, expected movements, working hours, duration, and the arrangements for residents, guests, emergency access and people using the John Muir Way.
15. The road carries, in an ordinary week, group pony treks of up to seven horses twice daily Monday to Saturday, horse boxes to the cross-country course at weekends, children travelling to and from school, carers, and guests of the shooting school, the Airbnbs and the pods, as well as members of the public walking, cycling, riding and walking dogs all year round. There is no safe way for a lorry and a group of horses to pass one another between the passing places, one of which has eroded and is nearly unusable. These points were put to you in writing on 4 June 2025 and have still not been answered on the substance. Please answer them now.

Case file
16. Please provide the application reference, the submitted boundary and access plans, any EIA screening opinion with its recorded reasons, the survey reports and the statutory consultation responses relied upon, including the cultural heritage assessment and the treatment of scheduled monument SM6341 and its setting.

5. WHAT MUST HAPPEN BEFORE DETERMINATION

I am not asking you to abandon the proposal. I am asking that the following be settled before Scottish Forestry determines it, because after that point none of it can be settled at all:

- the access route, resolved on evidence rather than asserted;
- the protection of the mains main, in writing, with a named party liable;
- the maintenance of the burn servitude, secured in a way that survives the fence;
- the cairn and its setting, excluded from the boundary and confirmed with Historic Environment Scotland;
- the archaeology survey, re-done if the cairn was not in it;
- the road, its condition, its capacity and its safety, with the roads authority's conditions disclosed; and
- the grant position, disclosed, because if public money is involved then the standard is public too.

6. WHAT I AM ASKING FOR, AND BY WHEN

Please provide a numbered response within 14 days of this email, answering each question at paragraph 4 in turn. Where an item cannot yet be supplied, please identify what is outstanding and give a specific date by which it will be provided.

Please also place this correspondence before your line manager, or the senior manager responsible for this proposal, and provide that person's name and contact details. I am asking for senior oversight because these matters have been put to you in writing since June 2025 and remain unanswered on the evidence. If no senior contact is identified within that period, I will write to Scottish Woodlands' head office.

7. RESERVATION

I am pursuing the regulatory questions directly with Scottish Forestry and Historic Environment Scotland, including requests under the Environmental Information (Scotland) Regulations 2004, and I will not wait on this correspondence to do so.

My objection of 1 September 2026 remains in full. Nothing in this letter, and nothing in your email of 19 November, signifies agreement to the proposed access arrangements, and nothing here waives any right under title DMB27637 or otherwise. All rights are reserved.

For context only, the place and the business are described at https://uf51.love/Stoneymollan. The rights and the technical questions above stand on their own documents, not on that webpage.

Yours sincerely,

Brian Hughes
Upper Stoneymollan Cottage`;

const FULL = `To: ${TO}\nSubject: ${SUBJECT}\n\n${BODY}`;
const MAILTO = `mailto:${TO}?subject=${encodeURIComponent(SUBJECT)}`;

// One source of truth: what is copied is exactly what is on the screen.
function blocks(text) {
  return text.split('\n\n').map((raw) => {
    const t = raw.trim();
    if (/^\d\.\s[A-Z]/.test(t)) return { kind: 'head', text: t };
    if (t.startsWith('- ')) return { kind: 'list', items: t.split('\n').map((l) => l.replace(/^-\s/, '')) };
    return { kind: 'para', text: t };
  });
}

function CopyButton({ text, label, done }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="flex min-h-[44px] items-center justify-center gap-2 border border-record-ink/30 px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? done : label}
    </button>
  );
}

export default function AdminStoneymollanBarryReply() {
  const [copied, setCopied] = useState(false);

  // Read on a phone by the person sending it, without becoming the first thing a neighbour
  // finds when they search the road's name.
  useEffect(() => {
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => { document.head.removeChild(m); };
  }, []);

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
            to="/Stoneymollan"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-record-muted underline decoration-dotted underline-offset-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Stoneymollan
          </Link>

          <h1 className="mt-4 text-[26px] leading-tight lg:text-[34px]" style={{ fontFamily: 'var(--font-display)' }}>
            The reply to Barry Harper
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
            He has confirmed he intends to proceed, answered eleven specific questions with a
            published industry guidance note, and left himself the words “where appropriate”.
            This answers that, and sets out the rights plainly.
          </p>

          <div className="mt-5 border-2 border-record-ink bg-record-bone/60 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-record-muted">To</p>
            <p className="mt-1 break-all font-mono text-[13px] font-black">{TO}</p>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <CopyButton text={TO} label="Copy address" done="Address copied" />
              <a
                href={MAILTO}
                className="flex min-h-[44px] items-center justify-center gap-2 border border-record-ink/30 px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide"
              >
                <Mail className="h-3.5 w-3.5" /> Open in mail
              </a>
              <CopyButton text={FROM} label="Copy my address" done="Copied" />
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-record-muted">
              Sending from {FROM}
            </p>
          </div>

          <div className="mt-4 border-2 border-record-red bg-record-red/5 p-4">
            <p className="flex items-center gap-2 font-mono text-[10.5px] font-black uppercase tracking-[0.16em] text-record-red">
              <AlertTriangle className="h-4 w-4" /> One blank to fill
            </p>
            <p className="mt-2 text-[13px] leading-snug text-record-ink/85">
              Question 1 — the date(s), and what you actually saw, when works were carried out
              without using the road. Everything else is ready to send.
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
        </div>

        {/* ── WHAT WE ACTUALLY HAVE ── */}
        <section className="mt-8 border-2 border-record-ink bg-record-bone/40 p-4">
          <h2 className="flex items-center gap-2 font-mono text-[11px] font-black uppercase tracking-[0.18em] text-record-red">
            <Scale className="h-4 w-4" /> What we have, exactly
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-record-ink/80" style={{ fontFamily: 'var(--font-reading)' }}>
            Eight rights. Each one named with the instrument it comes from, because “we have
            rights” is worth nothing in a letter and a servitude in title DMB27637 is worth
            everything.
          </p>
          <ol className="mt-4 space-y-3">
            {RIGHTS.map((r) => (
              <li key={r.n} className="border-l-2 border-record-red/60 pl-3">
                <p className="font-mono text-[11px] font-black uppercase tracking-wide">
                  {r.n}. {r.title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-record-ink/80" style={{ fontFamily: 'var(--font-reading)' }}>
                  {r.body}
                </p>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-wide text-record-muted">
                  {r.remedy}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <article className="mt-8 border-t-2 border-record-ink pt-6">
          {blocks(BODY).map((b, i) => {
            if (b.kind === 'head') {
              return (
                <h3 key={i} className="mt-7 font-mono text-[12px] font-black uppercase tracking-[0.12em] text-record-red">
                  {b.text}
                </h3>
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
            <li>Send it as a reply on the existing thread, so the 1 September objection and his 19 November email sit underneath it.</li>
            <li>The 14 days is a period you are asking for. It is not a statutory deadline, and it does not compel an answer.</li>
            <li>The EIR requests are the part with a real clock on it — 20 working days, and an appeal to the Commissioner if they refuse. Send those the same day, not after he replies.</li>
            <li>Do not attach the Glasgow title plan. It belongs to another matter.</li>
            <li>Keep the sent copy. What was asked, and when, is the whole point of writing it down.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}