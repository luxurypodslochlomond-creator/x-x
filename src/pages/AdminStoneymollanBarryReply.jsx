import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Printer, ArrowLeft, AlertTriangle, Mail, Scale, ExternalLink } from 'lucide-react';

// ── THE REPLY TO BARRY HARPER'S 19 NOVEMBER EMAIL ─────────────────────────────
// What he wrote, and it matters that it is read exactly:
//
//   "I can confirm that we intend to proceed with the proposal."
//   "...responses to the matters raised are set out in the attached document. The response
//    includes guidance ... 'Managing forestry operations to protect private water supplies',
//    issued by Scottish Forestry."
//   "...has not yet been approved ... remains subject to consultation ... will continue to
//    inform the development and refinement of the woodland design, where appropriate."
//
// So: he is going ahead, he has answered eleven specific questions with a published industry
// guidance note that was not written about this place, and he has left himself "where
// appropriate" as the way out of every point.
//
// ── WHAT CHANGED ON 24 NOVEMBER, AND WHY IT CHANGES THE LETTER ────────────────
// The cairn is not a rumour any more, and it is not "a known feature we understand may be
// there". It is SCHEDULED MONUMENT SM6341, designated on 12 April 1996, and Historic
// Environment Scotland's own portal records two scheduled monument consents granted on it
// in the last two years:
//
//   18 January 2024 — removal of windblow ON the cairn and of adjacent trees at risk of
//                     windblow onto the cairn.
//   19 December 2024 — felling of trees WITHIN the scheduled area, with a felling map and a
//                     restock map.
//
// Both granted without conditions. That is the whole argument, and it comes from the
// regulator rather than from us: the monument has already been damaged by windblow, trees
// beside it have already had to come down because they threatened it, and work inside the
// scheduled area has already needed consent twice. A new plantation on that ground does not
// remove that risk. It recreates it, at scale, on a longer rotation.
//
// It also corrects the file. The cairn was recorded here as roughly 20 m by 10 m. HES
// measures it at 68 m long by about 18 m wide at the south-east end, tapering to 6 m, with
// a scheduled area up to 110 m by 45 m. It is a much bigger monument than we thought, and
// the protected zone around it is bigger still.
//
// ── AND THE FUNDING QUESTION RESOLVES ITSELF ─────────────────────────────────
// Barry says it is not approved, which is right: woodland creation grant is paid on
// approval, so no award can exist yet. But Scottish Forestry publishes FGS woodland creation
// applications on its public register WHILE they are open for comment — property name, case
// reference, total area, conifer and broadleaf areas, grid reference, and a map of the
// boundary — for every proposal over two hectares. So either it is on the register, and the
// boundary plan we have twice asked him for is already published, or it is not, and we ask
// why a proposal of this scale is not being consulted on. No assertion needed.

const TO = 'Barry.Harper@scottishwoodlands.co.uk';
const FROM = 'tullifarm@btinternet.com';
const SUBJECT = 'RE: Auchendennan Woodland Creation — SM6341 is scheduled, and trees have already blown onto it';

// ── WHAT THE PUBLIC RECORD ACTUALLY SAYS ─────────────────────────────────────
// Every line below is from a page that can be opened and checked. Nothing here is
// remembered, inferred or hoped for.
const RECORD_FACTS = [
  {
    label: 'The monument',
    text: 'Cameron Home Farm, chambered cairn 720m S of — scheduled monument SM6341, designated 12 April 1996 under the Ancient Monuments and Archaeological Areas Act 1979. Neolithic chambered cairn of the Clyde-Solway group, on the perimeter of Cameron Wood. West Dunbartonshire, parish of Bonhill, NGR NS 37132 82135.',
    src: 'Historic Environment Scotland designation record',
    href: 'https://portal.historicenvironment.scot/designation/SM6341',
  },
  {
    label: 'Its size',
    text: '68 m long by about 18 m wide at the south-east end, tapering to 6 m, and 0.2–1.5 m high. A cutting about 4 m wide and 3 m deep runs its entire length, and three, possibly four burial chambers remain exposed. When it was partly investigated around 1800, stone arrowheads and bone were found in some of the 20–25 “graves” reported.',
    src: 'HES designation record',
    href: 'https://portal.historicenvironment.scot/designation/SM6341',
  },
  {
    label: 'The protected zone',
    text: 'The scheduled area is sub-triangular and measures up to 110 m from west-north-west to east-south-east by up to 45 m transversely — to include the cairn and the ground around it where traces of its construction and use may survive. That is the area in which works require scheduled monument consent.',
    src: 'HES designation record',
    href: 'https://portal.historicenvironment.scot/designation/SM6341',
  },
  {
    label: 'Consent already granted — windblow',
    text: '“Removal of windblow on cairn and adjacent trees at risk of windblow onto cairn.” Validated 20 December 2023, decided 18 January 2024, granted without conditions.',
    src: 'HES decision 900058206',
    href: 'https://portal.historicenvironment.scot/decision/900058206',
  },
  {
    label: 'Consent already granted — felling inside the scheduled area',
    text: '“Felling of trees within the scheduled area.” Validated 18 November 2024, decided 19 December 2024, granted without conditions. The case documents include a felling map, a location map and a restock map.',
    src: 'HES decision 900067026',
    href: 'https://portal.historicenvironment.scot/decision/900067026',
  },
  {
    label: 'Where the boundary plan already is',
    text: 'Scottish Forestry publishes FGS woodland creation applications on its public register while they are open for comment — property name, case reference, total area, conifer and broadleaf areas, grid reference, and a map of the boundary. Every proposal with more than 2 hectares of new woodland is displayed. From 3 November 2026 all new proposals go to the Scottish Forestry Public Register.',
    src: 'Scottish Forestry register',
    href: 'https://www.forestry.gov.scot/register-woodland-creation-and-felling-permissions',
  },
];

// ── WHAT WE ACTUALLY HAVE ─────────────────────────────────────────────────────
const RIGHTS = [
  {
    n: 1,
    title: 'The cairn is scheduled, and the protection is criminal',
    body: 'SM6341 is designated under the Ancient Monuments and Archaeological Areas Act 1979. Works within the scheduled area — up to 110 m by 45 m around the cairn — require scheduled monument consent, and executing such works without it is an offence. Two consents have already been granted on this monument in the last two years, which shows the area is live and that HES is the consenting body.',
    remedy: 'Scheduled monument consent; criminal liability without it.',
  },
  {
    n: 2,
    title: 'The windthrow risk has already materialised once',
    body: 'HES granted consent in January 2024 for the removal of windblow on the cairn and of adjacent trees at risk of blowing onto it. That is the regulator recording, on the public record, that trees next to this monument have already damaged it. New planting on the adjacent ground recreates that risk on a longer rotation.',
    remedy: 'A material consideration the assessment must address.',
  },
  {
    n: 3,
    title: 'The burn supply is a servitude — a real right in the land',
    body: 'Contained in the property missives in our title deeds, DMB27637. A servitude binds you and every successor and cannot be planted over, fenced off or engineered away. A right to take water carries with it the access reasonably necessary to maintain the works that take it — the weir and the settling tank.',
    remedy: 'Remedies in Scots law: interdict and damages.',
  },
  {
    n: 4,
    title: 'The mains pipe is our property, not a right',
    body: 'The 50 mm blue MDPE from the fork on Upper Stoneymollan Road to the house is owned by the cottage and was paid for by its occupants. It is corporeal property. Damaging it is a delict, and it is your operations that would create the risk.',
    remedy: 'Duty of care; damages for loss and repair.',
  },
  {
    n: 5,
    title: 'Access to our home is not a favour',
    body: 'Upper Stoneymollan Road is how we, our guests, the carers, the ponies and the emergency services reach the property. Whatever its status, we have a right of access, and works that make it unsafe or impassable interfere with that right.',
    remedy: 'Interdict against interference; damages.',
  },
  {
    n: 6,
    title: 'We have a statutory right to the file itself',
    body: 'Under the Environmental Information (Scotland) Regulations 2004, Scottish Forestry and HES must make environmental information available on request within 20 working days. If they refuse, there is a right of review, then a right of appeal to the Scottish Information Commissioner.',
    remedy: 'We do not need his permission to see the application.',
  },
  {
    n: 7,
    title: 'We have a right to be consulted on the EIA determination, and to reasons',
    body: 'Afforestation above the thresholds in the Forestry (Environmental Impact Assessment) (Scotland) Regulations 2018 requires an EIA determination. As an affected neighbour we are entitled to make representations and to be told the outcome and the reasons — including any screening opinion and the recorded reasons for it.',
    remedy: 'Representation, then reasons in writing.',
  },
  {
    n: 8,
    title: 'Nothing is settled yet — and that is the most useful right of all',
    body: 'His own email says the proposal has not been approved and remains subject to consultation. The design is still open. The boundary can move, the fence can move, the access can change, the scheduled area can be excluded. What happens next is decided on the evidence — and the evidence is what we are asking for.',
    remedy: 'Leverage that expires the day Scottish Forestry signs.',
  },
];

const BODY = `Dear Barry,

Thank you for your email of 19 November 2026 and for the attached guidance. I am replying to it directly, because it does not answer the objection.

1. WHAT YOUR EMAIL ACTUALLY SAYS

You have confirmed three things and I want to be accurate about each of them.

First, that Scottish Woodlands intends to proceed. Second, that the matters I raised have been reviewed and considered as part of the woodland creation design process. Third, that the proposal has not been approved, remains subject to consultation, and that my points will continue to inform the development and refinement of the woodland design, where appropriate.

I note the last three words. "Where appropriate" is not a commitment to anything. It leaves every point I raised open to being found inappropriate, by you, without reasons given. That is the gap I am asking you to close.

Please tell me, for each of the eleven headings in my objection of 1 September 2026, whether it has changed the design, been accepted without change, or been rejected — and where rejected, on what basis. That is a short answer per heading, and it is the answer the word "considered" implies.

2. THE ATTACHMENT IS GUIDANCE TO THE INDUSTRY. IT IS NOT A RESPONSE TO US.

The document you sent, "Managing forestry operations to protect private water supplies", is Scottish Forestry's published guidance on how operations of this kind should be conducted. It was not written about Auchendennan. It was not written about Upper Stoneymollan Road, about the 50 mm MDPE main buried under that road and down the centre of our driveway, or about the weir 200 m up the burn that has to be dug out roughly once a year.

Sending me the guidance does not tell me what you are going to do. It tells me the standard you are expected to meet.

I will hold you to that standard, because it is your own. Your email asserts that private water supplies must be protected. If that is so, then the guidance is an acknowledgement that our supply is a material constraint on this design — not an irrelevance to be answered with a catchment map and a distance. What is missing is the part only you can supply: the plan, the route, the depth, the protection measures, the inspection regime, and the name of the party who pays when the pipe is broken.

So please answer the questions about our water, in this place, on these drawings. The guidance is the frame. The answers are the letter.

3. SM6341 IS A SCHEDULED MONUMENT, AND TREES HAVE ALREADY BLOWN ONTO IT

I have now checked the public record, so this is no longer a matter of what I understand or have been told. I am setting out what the record says, because it bears directly on the design you intend to proceed with.

The Neolithic chambered cairn at Cameron Home Farm is scheduled monument SM6341, designated on 12 April 1996 under the Ancient Monuments and Archaeological Areas Act 1979. Historic Environment Scotland's designation describes it as a chambered cairn of the Clyde-Solway group, lying on the perimeter of Cameron Wood. It measures 68 m in length by about 18 m in width at the south-east end, tapering to 6 m, and stands between 0.2 and 1.5 m high. When it was partly investigated around 1800, stone arrowheads and bone were found in some of the twenty to twenty-five "graves" reported, and three, possibly four burial chambers remain exposed. The scheduled area is sub-triangular and measures up to 110 m from west-north-west to east-south-east by up to 45 m transversely, and includes not only the cairn but the ground around it where traces of its construction and use may survive.

Two scheduled monument consents have been granted on that monument within the last two years:

- on 18 January 2024, for the removal of windblow on the cairn and of adjacent trees at risk of windblow onto the cairn; and
- on 19 December 2024, for the felling of trees within the scheduled area, with a felling map, a location map and a restock map.

Both were granted without conditions. Three things follow from that record, and each of them bears on your proposal.

First, this monument has already been damaged by windblow, and trees standing beside it have already had to be felled because they threatened it. A new plantation on the adjacent ground does not remove that risk. It recreates it, at scale, and on a longer rotation than the trees that have just been dealt with. I would expect the archaeological assessment to address windthrow risk to the monument directly, given that it has already happened once.

Second, work inside that scheduled area has already required consent twice. If the woodland creation boundary, the deer fence or the extraction route enters the sub-triangular area described above, scheduled monument consent is required for that work, and it is an offence to carry it out without consent. The restock map from the 2024 case also means that restocking inside the scheduled area and new planting beside it are not separate questions.

Third, if the archaeological assessment referred to in your email did not identify SM6341 — a scheduled monument with a designation dating from 1996 and two live consent cases in the last two years — then the assessment is deficient on a point that is on the public record, and I would ask that it be redone before any determination is made.

Please confirm specifically:

- whether the boundary, the deer fence and the extraction route enter or cross the scheduled area of SM6341, and if so where;
- whether scheduled monument consent has been applied for, or obtained, for any part of the proposal that does;
- what the archaeological assessment says about SM6341, its scheduled area and its setting, and whether it identified the monument at all;
- what that assessment says about windthrow risk to the monument from the proposed planting; and
- whether Historic Environment Scotland has been consulted as a statutory consultee, and what they said.

4. THE FUNDING QUESTION IS ANSWERABLE FROM THE REGISTER

I am not going to assert that public money is involved. I am going to point out that the answer is a matter of public record either way, and that it can be settled in one line.

Woodland creation on this scale is normally supported through the Forestry Grant Scheme. Scottish Forestry publishes Forestry Grant Scheme woodland creation applications on its public register while they are open for comment, and any proposal with more than two hectares of new woodland is displayed there. The published entry includes the property name, the case reference, the total area, the conifer and broadleaf areas, the grid reference, the status, and a map showing the boundary of the application — together with the case documents, the consultees involved and their responses, and documentation such as survey results. From 3 November 2026 all new woodland creation proposals go to the Scottish Forestry Public Register.

So one of two things is true. Either this proposal is on that register, in which case the case reference and the boundary plan I have now twice asked you for are already published, and you can simply give me the reference. Or it is not, in which case I would like to know why a proposal of this scale is not being consulted on in the ordinary way.

Please provide the case reference, and confirm whether an application has been made under the Forestry Grant Scheme or any other public source for this proposal. If a grant is awarded, the conditions attached to it — including the UK Forestry Standard and its historic environment and water requirements — are not a private arrangement between you and the landowner. They are conditions of public funding, and they are answerable to the body that pays.

5. OUR RIGHTS, SET OUT PLAINLY

I am setting these out not as a threat but so that we are both clear about the ground we are standing on.

First: the cairn is protected by statute, and the protection is criminal rather than civil, as set out at paragraph 3.

Second: the burn supply is a servitude, and it is a real right in the land. It is contained in the property missives in our title deeds, DMB27637. A servitude binds you and every successor, and it cannot be planted over, fenced off or engineered away. A right to take water carries with it the access reasonably necessary to maintain the works that take it — the weir approximately 200 m up the burn and the settling tank approximately 50 m south-east of it, in the field adjacent to the property. If planting or a deer fence makes that maintenance impossible, that is interference with a servitude, and the remedies in Scots law are interdict and damages.

Third: the mains pipe is our property, not a right. The 50 mm blue MDPE pipe from the fork on Upper Stoneymollan Road to the house is owned by the cottage and was paid for by its occupants. It is corporeal property. Damage to it is a delict, and it is your operations that would be creating the risk.

Fourth: access to our home is not a favour. Upper Stoneymollan Road is how we, our guests, the carers, the ponies and the emergency services reach the property. Whatever its status, we have a right of access, and works that make it unsafe or impassable interfere with that right.

Fifth: we have a statutory right to the file itself. Under the Environmental Information (Scotland) Regulations 2004, Scottish Forestry and Historic Environment Scotland must make environmental information available on request within 20 working days, and where access is refused there is a right of review and then a right of appeal to the Scottish Information Commissioner. I am exercising that right in parallel with this letter. I am not asking your permission to see the application. I am asking the regulators, on a clock that is already running.

Sixth: we have a right to be consulted on the EIA determination, and to reasons. Afforestation above the thresholds in the Forestry (Environmental Impact Assessment) (Scotland) Regulations 2018 requires an environmental impact assessment determination. As an affected neighbour we are entitled to make representations and to be told the outcome and the reasons for it, including any screening opinion and the recorded reasons behind it.

Seventh, and most importantly: nothing is settled yet. Your own email says the proposal has not been approved and remains subject to consultation. That means the design is still open. The boundary can still move, the fence can still move, the access can still change and the scheduled area can still be excluded. It also means the decision will be taken on the evidence — and the evidence is precisely what I am asking you for.

6. THE QUESTIONS YOUR EMAIL LEAVES OPEN

Access
1. Which route did the vehicles use for the works already carried out in this area without using Upper Stoneymollan Road, on [FILL: date(s) and what was seen]?
2. Does that route remain available, and why is it not the proposed route for the works described in your response?

Heritage
3. Do the boundary, the deer fence and the extraction route enter or cross the scheduled area of SM6341? Please identify on a plan where.
4. Has scheduled monument consent been applied for or obtained for any part of the proposal within the scheduled area?
5. Did the archaeological assessment identify SM6341? What does it say about the monument, its scheduled area and its setting?
6. What does the assessment say about windthrow risk to the monument from the proposed planting, given that windblow onto the cairn has already occurred and required consent in 2024?
7. Has Historic Environment Scotland been consulted as a statutory consultee, and what did they say? If they have not been consulted, why not?

Funding and the register
8. What is the Scottish Forestry case reference for this proposal, and is it published on the public register?
9. Has an application been made under the Forestry Grant Scheme or any other public source, and under which option?

Water — the burn
10. How is the annual dig-out of the weir approximately 200 m up the burn, and access to the settling tank approximately 50 m south-east of it in the adjacent field, to be maintained through the planting and through a deer fence? Where will the gates be?

Water — the mains
11. Please provide the plan identifying the 50 mm MDPE main, its route and its depth, with the protection and incident-response arrangements proposed for it.
12. What is the assessed risk to that main from vehicle loading on the road, and from works on the driveway and the verge?
13. Which party accepts liability for damage to it, and what is the procedure for inspection, repair and dispute?
14. Has Scottish Water been consulted, and what did they say? Scottish Water owns the main, the branch under the A82 and the hydrant at the fork, and your email does not mention Scottish Water at all.

Design and distances
15. Please provide the boundary, planting and access plans at a scale that allows the nearest proposed planting boundary, the extraction route and any fence line to be measured against the cottage, the road, the main, the burn supply and the scheduled area. I am asking for the plan rather than an assurance, so that the distance can be checked rather than accepted.

Road, traffic and safety
16. Which party accepts responsibility for damage attributable to the operations, and what are the pre- and post-works inspection, repair and dispute arrangements? Please supply the written roads-authority conditions relied upon.
17. Please provide vehicle types and maximum weights, expected movements, working hours, duration, and the arrangements for residents, guests, emergency access and people using the John Muir Way.
18. The road carries, in an ordinary week, group pony treks of up to seven horses twice daily Monday to Saturday, horse boxes to the cross-country course at weekends, children travelling to and from school, carers, and guests of the shooting school, the Airbnbs and the pods, as well as members of the public walking, cycling, riding and walking dogs all year round. There is no safe way for a lorry and a group of horses to pass one another between the passing places, one of which has eroded and is nearly unusable. These points were put to you in writing on 4 June 2025 and have still not been answered on the substance. Please answer them now.

Case file
19. Please provide the submitted boundary and access plans, any EIA screening opinion with its recorded reasons, and the survey reports and statutory consultation responses relied upon, including the cultural heritage assessment.

7. WHAT MUST HAPPEN BEFORE DETERMINATION

I am not asking you to abandon the proposal. I am asking that the following be settled before Scottish Forestry determines it, because after that point none of it can be settled at all:

- the scheduled area of SM6341, confirmed as excluded from the boundary, the fence and the extraction route, and agreed with Historic Environment Scotland;
- the archaeology assessment, re-done if the monument was not in it, and addressing windthrow risk explicitly;
- the access route, resolved on evidence rather than asserted;
- the protection of the mains, in writing, with a named party liable;
- the maintenance of the burn servitude, secured in a way that survives the fence;
- the road, its condition, its capacity and its safety, with the roads authority's conditions disclosed; and
- the register reference and the grant position, disclosed.

8. WHAT I AM ASKING FOR, AND BY WHEN

Please provide a numbered response within 14 days of this email, answering each question at paragraph 6 in turn. Where an item cannot yet be supplied, please identify what is outstanding and give a specific date by which it will be provided.

Please also place this correspondence before your line manager, or the senior manager responsible for this proposal, and provide that person's name and contact details. I am asking for senior oversight because these matters have been put to you in writing since June 2025 and remain unanswered on the evidence. If no senior contact is identified within that period, I will write to Scottish Woodlands' head office.

9. RESERVATION

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
            He confirmed he intends to proceed, answered eleven specific questions with a
            published guidance note for the forestry industry, and left himself the words
            “where appropriate”. This answers that — and it now answers him on the cairn using
            the regulator's own record.
          </p>

          {/* THE ONE DEADLINE THAT IS NOT HIS TO SET */}
          <div className="mt-5 border-2 border-record-ink bg-record-signal/40 p-4">
            <p className="font-mono text-[10.5px] font-black uppercase tracking-[0.16em]">
              The deadline that actually matters
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
              Comments on a woodland creation application must reach Scottish Forestry within
              <strong> 28 days of the day it first appears on the public register</strong> — not
              within 14 days of Barry's reply, and not whenever the consultation closes. Look the
              case up on the register today. If it is there, the clock is already running, and it
              is the only clock in this that you do not control.
            </p>
            <a
              href="https://casebook.forestry.scot/w/webpage/prhome"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex min-h-[44px] items-center justify-center gap-2 bg-record-ink px-4 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide text-record-paper"
            >
              Open the public register <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-record-muted">
              Search “Open for comment”, then the property name or the grid reference
            </p>
          </div>

          <div className="mt-4 border-2 border-record-ink bg-record-bone/60 p-3">
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

        {/* ── WHAT THE PUBLIC RECORD SAYS ── */}
        <section className="mt-8 border-2 border-record-ink bg-record-bone/40 p-4">
          <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-record-red">
            What the public record actually says
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-record-ink/80" style={{ fontFamily: 'var(--font-reading)' }}>
            Every line below is from a page you can open and check yourself. Nothing here is
            remembered or inferred.
          </p>
          <ol className="mt-4 space-y-4">
            {RECORD_FACTS.map((f) => (
              <li key={f.label} className="border-l-2 border-record-ink/30 pl-3">
                <p className="font-mono text-[10.5px] font-black uppercase tracking-wide">{f.label}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-record-ink/80" style={{ fontFamily: 'var(--font-reading)' }}>
                  {f.text}
                </p>
                <a
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-record-muted underline decoration-dotted underline-offset-2"
                >
                  {f.src} <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* ── WHAT WE ACTUALLY HAVE ── */}
        <section className="mt-6 border-2 border-record-ink bg-record-bone/40 p-4">
          <h2 className="flex items-center gap-2 font-mono text-[11px] font-black uppercase tracking-[0.18em] text-record-red">
            <Scale className="h-4 w-4" /> What we have, exactly
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-record-ink/80" style={{ fontFamily: 'var(--font-reading)' }}>
            Eight rights. Each named with the instrument it comes from, because “we have rights”
            is worth nothing in a letter and a scheduled monument with two live consent cases is
            worth everything.
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
            <li>Check the register first. If the case is open for comment, that 28-day window outranks everything in this letter.</li>
            <li>Send it as a reply on the existing thread, so the 1 September objection and his 19 November email sit underneath it.</li>
            <li>The 14 days is a period you are asking for. It is not a statutory deadline, and it does not compel an answer.</li>
            <li>The EIR requests are the part with a real clock on it — 20 working days, and an appeal to the Commissioner if they refuse. Send those the same day.</li>
            <li>The HES case files for the two consents are downloadable now — the report on handling in each case names who applied and why it was granted. Worth reading before you send.</li>
            <li>Do not attach the Glasgow title plan. It belongs to another matter.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}