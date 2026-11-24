import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Printer, ArrowLeft, AlertTriangle, Mail, Scale, ExternalLink } from 'lucide-react';

// ── THE REPLY TO BARRY HARPER'S 19 NOVEMBER EMAIL ─────────────────────────────
// Brian's own catch, and it is the sharpest point in the letter: the document Barry sent is
// Scottish Forestry's guidance on protecting PRIVATE water supplies. Our domestic supply is
// not a private supply. It is treated mains water from Loch Finlas, Scottish Water's main,
// with a privately owned branch. So the one document he sent does not address the one supply
// he was asked about — and says nothing about the mains at all.
//
// Meanwhile the burn IS a private supply, so his own guidance applies to it directly. And
// John Gilbert, the previous owner, records that the burn pipeline is "50 mm running under
// our property, through felling zone". So the private supply pipe itself lies in the ground
// to be felled, extracted over and planted — not just the right to reach it.
//
// ── THE CAIRN, VERIFIED FROM HES ON 24 NOVEMBER ───────────────────────────────
// SM6341, designated 12 April 1996. 68 m long, 18 m wide at the SE end, three or four burial
// chambers exposed, scheduled area up to 110 m by 45 m. Two scheduled monument consents
// granted without conditions: 18 Jan 2024, removal of windblow ON the cairn and of adjacent
// trees at risk of blowing onto it; 19 Dec 2024, felling of trees WITHIN the scheduled area,
// with a restock map.
//
// Note the precision: the designation is "chambered cairn 720m S of Cameron Home Farm". The
// monument is 720 m south of the farm, not at the centre of the application. So the letter
// asks whether the boundary reaches it rather than asserting that it does. Overstating it
// once would let him dismiss the whole letter.
//
// ── COPY AND PASTE ────────────────────────────────────────────────────────────
// The clipboard API is blocked inside the preview frame on most phones, so a plain copy
// button fails silently — which is exactly why Brian could not copy it. There is now a
// fallback, and a plain-text panel that selects itself so it can always be copied by hand.

const TO = 'Barry.Harper@scottishwoodlands.co.uk';
const FROM = 'tullifarm@btinternet.com';
const SUBJECT = 'RE: Auchendennan Woodland Creation — SM6341 is scheduled, the burn pipe runs through the felling zone, and the guidance you sent does not cover the mains';

const RECORD_FACTS = [
  {
    label: 'The monument is scheduled',
    text: 'Cameron Home Farm, chambered cairn 720m S of — scheduled monument SM6341, designated 12 April 1996 under the Ancient Monuments and Archaeological Areas Act 1979. Neolithic chambered cairn of the Clyde-Solway group, on the perimeter of Cameron Wood. West Dunbartonshire, parish of Bonhill, NGR NS 37132 82135.',
    src: 'HES designation record',
    href: 'https://portal.historicenvironment.scot/designation/SM6341',
  },
  {
    label: 'Its size — and a correction to our own file',
    text: '68 m long by about 18 m wide at the south-east end, tapering to 6 m, 0.2–1.5 m high. A cutting about 4 m wide and 3 m deep runs its entire length, and three, possibly four burial chambers remain exposed. Around 1800, stone arrowheads and bone were found in some of the 20–25 “graves” reported. We had it noted as roughly 20 m × 10 m. It is far larger.',
    src: 'HES designation record',
    href: 'https://portal.historicenvironment.scot/designation/SM6341',
  },
  {
    label: 'The protected zone',
    text: 'The scheduled area is sub-triangular, up to 110 m west-north-west to east-south-east by up to 45 m transversely — the cairn plus the ground around it where traces of its construction and use may survive. Works inside it need scheduled monument consent. Doing them without it is an offence.',
    src: 'HES designation record',
    href: 'https://portal.historicenvironment.scot/designation/SM6341',
  },
  {
    label: 'Consent already granted — windblow onto the cairn',
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
    text: 'Scottish Forestry publishes FGS woodland creation applications on its public register while they are open for comment — property name, case reference, total area, conifer and broadleaf areas, grid reference, and a map of the boundary — for every proposal over 2 hectares. From 3 November 2026 all new proposals go to the Scottish Forestry Public Register.',
    src: 'Scottish Forestry register',
    href: 'https://www.forestry.gov.scot/register-woodland-creation-and-felling-permissions',
  },
];

const RIGHTS = [
  {
    n: 1,
    title: 'The cairn is scheduled, and the protection is criminal',
    body: 'SM6341 is designated under the Ancient Monuments and Archaeological Areas Act 1979. Works within the scheduled area — up to 110 m by 45 m around the cairn — require scheduled monument consent, and executing them without it is an offence. Two consents have already been granted on this monument in the last two years, so the area is live and HES is the consenting body.',
    remedy: 'Scheduled monument consent; criminal liability without it.',
  },
  {
    n: 2,
    title: 'The windthrow risk has already materialised once',
    body: 'HES granted consent in January 2024 for the removal of windblow on the cairn and of adjacent trees at risk of blowing onto it. That is the regulator recording, on the public record, that trees beside this monument have already damaged it. New planting on the adjacent ground recreates that risk, on a longer rotation.',
    remedy: 'A material consideration the assessment must address.',
  },
  {
    n: 3,
    title: 'The burn is a private supply, and its pipe lies in the felling zone',
    body: 'John Gilbert, the previous owner, records the supply as coming from Cameron Estate, flowing through the felling area, with a 50 mm pipeline running under our property and through the felling zone, feeding the fishpond. The right is a registered servitude in the burdens of our title. So this is not only a right to reach the pipe — the pipe itself is in the ground to be worked.',
    remedy: 'Servitude; interdict and damages; plus his own guidance on private supplies.',
  },
  {
    n: 4,
    title: 'The mains is not a private supply, and his guidance does not cover it',
    body: 'Our domestic supply is treated mains water from Loch Finlas, Scottish Water’s main, 6 km to the north. The branch serving the cottage is a 50 mm blue MDPE pipe owned by the cottage and paid for by its occupants. It is corporeal property, buried under the road and down the only private access to the house.',
    remedy: 'Delict for damage; Scottish Water as owner of the main and statutory consultee.',
  },
  {
    n: 5,
    title: 'Access to our home is not a favour',
    body: 'Upper Stoneymollan Road is how we, our guests, the carers, the ponies and the emergency services reach the property. Whatever its status, we have access rights in the burdens of our title, and works that make it unsafe or impassable interfere with those rights.',
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

2. THE DOCUMENT YOU SENT COVERS PRIVATE WATER SUPPLIES. OUR DOMESTIC SUPPLY IS NOT ONE.

The document you sent is Scottish Forestry's guidance on managing forestry operations to protect private water supplies. It concerns supplies that are not provided by Scottish Water — springs, burns, boreholes and private pipework serving premises.

Our domestic supply is not one of those. It is treated mains water from Loch Finlas, approximately 6 km to the north, owned by Scottish Water. It runs up Lower Stoneymollan Road, under the A82, to the fork on Upper Stoneymollan Road, where it branches. The branch serving Upper Stoneymollan Cottage is a 50 mm blue MDPE pipe, owned by the cottage and paid for by its occupants. It is buried on the right-hand side of Upper Stoneymollan Road from the fork to the driveway entrance, past a vacuum breaker fitted to prevent pipeline collapse during loss of supply pressure — which is a regular occurrence — and then down the centre of the driveway to an isolation valve approximately 0.5 m west of the north-west corner of the building.

So the guidance does not address our domestic supply at all. It addresses a different category of supply. The pipe that needs describing here is not a private supply pipe. It is a privately owned branch of a public main, running under a public road and down the only private access to the house, and it appears nowhere in your response and nowhere in the guidance you enclosed.

I am not suggesting you sent the wrong document on purpose. I am pointing out that the one supply your document does not cover is the one I asked about. Please answer it: the route, the depth, the protection measures, the risk from vehicle loading on the road and from works on the driveway and verge, the party liable for damage, and whether Scottish Water — who own the main, the branch under the A82 and the hydrant at the fork — has been consulted, and what they said.

3. THE BURN, HOWEVER, IS A PRIVATE SUPPLY — AND ITS PIPE RUNS THROUGH THE GROUND YOU INTEND TO FELL

Your guidance applies directly to the burn, so I am asking you to apply it.

The burn supply comes from Cameron Estate. The previous owner, John Gilbert, records that it flows through the felling area, and that the pipeline is 50 mm, running under our property and through the felling zone, feeding the fishpond. The right is a registered servitude in the burdens of our title. Although the supply was disconnected from the house at handover, it still serves the property through the pond.

That means the private supply pipe itself — not merely a right to reach it — lies in the ground you propose to fell, extract over and plant. Alongside it sit the two pieces of working infrastructure the right depends on: a small weir approximately 200 m up the burn, which fills with silt and gravel and requires digging out usually about once a year, and a concrete settling tank approximately 50 m south-east of the weir, in the field adjacent to the property, which was emptied and dug out completely in 2019.

Diesel and hydraulic spill, silt-laden runoff, brash and root disturbance, and vehicle loading are the ordinary ways a forestry operation damages a pipe lying in the ground it is working over. Your own guidance sets out how each is to be managed. Please therefore say, for this pipe, in this ground: where it runs, at what depth, how it will be protected during felling, extraction and planting, how the annual dig-out at the weir and access to the settling tank will be maintained through the planting and through a deer fence, where the gates will be, who inspects it, and who pays if it is broken.

4. SM6341 IS A SCHEDULED MONUMENT, AND TREES HAVE ALREADY BLOWN ONTO IT

I have now checked the public record, so this is no longer a matter of what I understand or have been told.

The Neolithic chambered cairn at Cameron Home Farm is scheduled monument SM6341, designated on 12 April 1996 under the Ancient Monuments and Archaeological Areas Act 1979. Historic Environment Scotland's designation describes it as a chambered cairn of the Clyde-Solway group, lying on the perimeter of Cameron Wood. It measures 68 m in length by about 18 m in width at the south-east end, tapering to 6 m, and stands between 0.2 and 1.5 m high. When it was partly investigated around 1800, stone arrowheads and bone were found in some of the twenty to twenty-five "graves" reported, and three, possibly four burial chambers remain exposed. The scheduled area is sub-triangular and measures up to 110 m from west-north-west to east-south-east by up to 45 m transversely, and includes not only the cairn but the ground around it where traces of its construction and use may survive.

Two scheduled monument consents have been granted on that monument within the last two years:

- on 18 January 2024, for the removal of windblow on the cairn and of adjacent trees at risk of windblow onto the cairn; and
- on 19 December 2024, for the felling of trees within the scheduled area, with a felling map, a location map and a restock map.

Both were granted without conditions. Three things follow from that record, and each of them bears on your proposal.

First, this monument has already been damaged by windblow, and trees standing beside it have already had to be felled because they threatened it. A new plantation on the adjacent ground does not remove that risk. It recreates it, at scale, and on a longer rotation than the trees that have just been dealt with. I would expect the archaeological assessment to address windthrow risk to the monument directly, given that it has already happened once.

Second, work inside that scheduled area has already required consent twice. If the woodland creation boundary, the deer fence or the extraction route enters the sub-triangular area described above, scheduled monument consent is required for that work, and it is an offence to carry it out without consent. The restock map from the 2024 case also means that restocking inside the scheduled area and new planting beside it are not separate questions.

Third, if the archaeological assessment referred to in your email did not identify SM6341 — a scheduled monument with a designation dating from 1996 and two consent cases in the last two years — then the assessment is deficient on a point that is on the public record, and I would ask that it be redone before any determination is made.

I note the designation describes the monument as lying 720 m south of Cameron Home Farm. Whether the application boundary reaches it is precisely the question, so please answer it on a plan rather than in prose.

5. THE FUNDING QUESTION IS ANSWERABLE FROM THE REGISTER

I am not going to assert that public money is involved. I am going to point out that the answer is a matter of public record either way, and that it can be settled in one line.

Woodland creation on this scale is normally supported through the Forestry Grant Scheme. Scottish Forestry publishes Forestry Grant Scheme woodland creation applications on its public register while they are open for comment, and any proposal with more than two hectares of new woodland is displayed there. The published entry includes the property name, the case reference, the total area, the conifer and broadleaf areas, the grid reference, the status, and a map showing the boundary of the application — together with the case documents, the consultees involved and their responses, and documentation such as survey results. From 3 November 2026 all new woodland creation proposals go to the Scottish Forestry Public Register.

So one of two things is true. Either this proposal is on that register, in which case the case reference and the boundary plan I have now twice asked you for are already published, and you can simply give me the reference. Or it is not, in which case I would like to know why a proposal of this scale is not being consulted on in the ordinary way.

Please provide the case reference, and confirm whether an application has been made under the Forestry Grant Scheme or any other public source for this proposal. If a grant is awarded, the conditions attached to it — including the UK Forestry Standard and its historic environment and water requirements — are not a private arrangement between you and the landowner. They are conditions of public funding, and they are answerable to the body that pays.

6. OUR RIGHTS, SET OUT PLAINLY

I am setting these out not as a threat but so that we are both clear about the ground we are standing on.

First: the cairn is protected by statute, and the protection is criminal rather than civil, as set out at paragraph 4.

Second: the burn supply is a servitude, and it is a real right in the land. It is registered in the burdens of our title, DMB27637. A servitude binds you and every successor, and it cannot be planted over, fenced off or engineered away. A right to take water carries with it the access reasonably necessary to maintain the works that take it — the weir and the settling tank. If planting or a deer fence makes that maintenance impossible, or if the pipe in the felling zone is damaged, that is interference with a servitude, and the remedies in Scots law are interdict and damages.

Third: the mains pipe is our property, not a right. The 50 mm MDPE branch is owned by the cottage and was paid for by its occupants. It is corporeal property. Damage to it is a delict, and it is your operations that would be creating the risk.

Fourth: access to our home is not a favour. Upper Stoneymollan Road is how we, our guests, the carers, the ponies and the emergency services reach the property. We have access rights in the burdens of our title, and works that make the road unsafe or impassable interfere with those rights.

Fifth: we have a statutory right to the file itself. Under the Environmental Information (Scotland) Regulations 2004, Scottish Forestry and Historic Environment Scotland must make environmental information available on request within 20 working days, and where access is refused there is a right of review and then a right of appeal to the Scottish Information Commissioner. I am exercising that right in parallel with this letter. I am not asking your permission to see the application. I am asking the regulators, on a clock that is already running.

Sixth: we have a right to be consulted on the EIA determination, and to reasons. Afforestation above the thresholds in the Forestry (Environmental Impact Assessment) (Scotland) Regulations 2018 requires an environmental impact assessment determination. As an affected neighbour we are entitled to make representations and to be told the outcome and the reasons for it, including any screening opinion and the recorded reasons behind it.

Seventh, and most importantly: nothing is settled yet. Your own email says the proposal has not been approved and remains subject to consultation. That means the design is still open. The boundary can still move, the fence can still move, the access can still change and the scheduled area can still be excluded. It also means the decision will be taken on the evidence — and the evidence is precisely what I am asking you for.

7. THE QUESTIONS YOUR EMAIL LEAVES OPEN

Access
1. Which route did the vehicles use for the works already carried out in this area without using Upper Stoneymollan Road, on [FILL: date(s) and what was seen]?
2. Does that route remain available, and why is it not the proposed route for the works described in your response?

The mains
3. Please provide the plan identifying the 50 mm MDPE branch of the Scottish Water main, its route and its depth, with the protection and incident-response arrangements proposed for it.
4. What is the assessed risk to it from vehicle loading on the road, and from works on the driveway and the verge?
5. Which party accepts liability for damage to it, and what is the procedure for inspection, repair and dispute?
6. Has Scottish Water been consulted, and what did they say? Scottish Water owns the main, the branch under the A82 and the hydrant at the fork, and neither your email nor the guidance you enclosed mentions Scottish Water at all.

The burn
7. Where does the 50 mm burn supply pipe run, at what depth, relative to the felling area, the extraction route and the proposed planting boundary?
8. How will it be protected during felling, extraction and planting, and from silt-laden runoff and spill?
9. How will the annual dig-out of the weir approximately 200 m up the burn, and access to the settling tank approximately 50 m south-east of it in the adjacent field, be maintained through the planting and through a deer fence? Where will the gates be?

Heritage
10. Do the boundary, the deer fence and the extraction route enter or cross the scheduled area of SM6341? Please identify on a plan where.
11. Has scheduled monument consent been applied for or obtained for any part of the proposal within the scheduled area?
12. Did the archaeological assessment identify SM6341? What does it say about the monument, its scheduled area and its setting?
13. What does the assessment say about windthrow risk to the monument from the proposed planting, given that windblow onto the cairn has already occurred and required consent in 2024?
14. Has Historic Environment Scotland been consulted as a statutory consultee, and what did they say? If they have not been consulted, why not?

Funding and the register
15. What is the Scottish Forestry case reference for this proposal, and is it published on the public register?
16. Has an application been made under the Forestry Grant Scheme or any other public source, and under which option?

The road
17. Please confirm the status of Upper Stoneymollan Road with the roads authority, and supply the roads authority's conditions or consent for the works and the traffic.
18. Which party accepts responsibility for damage attributable to the operations, and what are the pre- and post-works inspection, repair and dispute arrangements?
19. Please provide vehicle types and maximum weights, expected movements, working hours, duration, and the arrangements for residents, guests, emergency access and people using the John Muir Way.
20. The road carries, in an ordinary week, group pony treks of up to seven horses twice daily Monday to Saturday, horse boxes to the cross-country course at weekends, children travelling to and from school, carers, and guests of the shooting school, the Airbnbs and the pods, as well as members of the public walking, cycling, riding and walking dogs all year round. There is no safe way for a lorry and a group of horses to pass one another between the passing places, one of which has eroded and is nearly unusable. These points were put to you in writing on 4 June 2025 and have still not been answered on the substance. Please answer them now.

Design and distances
21. Please provide the boundary, planting and access plans at a scale that allows the nearest proposed planting boundary, the extraction route and any fence line to be measured against the cottage, the road, the mains, the burn pipe and the scheduled area. I am asking for the plan rather than an assurance, so that the distance can be checked rather than accepted.

Case file
22. Please provide the submitted boundary and access plans, any EIA screening opinion with its recorded reasons, and the survey reports and statutory consultation responses relied upon, including the cultural heritage assessment.

8. WHAT MUST HAPPEN BEFORE DETERMINATION

I am not asking you to abandon the proposal. I am asking that the following be settled before Scottish Forestry determines it, because after that point none of it can be settled at all:

- the scheduled area of SM6341, confirmed as excluded from the boundary, the fence and the extraction route, and agreed with Historic Environment Scotland;
- the archaeology assessment, re-done if the monument was not in it, and addressing windthrow risk explicitly;
- the route and protection of the burn supply pipe that runs through the felling zone, and the maintenance of the weir and settling tank through the fence;
- the protection of the mains branch, in writing, with a named party liable, and Scottish Water's position;
- the access route, resolved on evidence rather than asserted;
- the road, its status, its condition, its capacity and its safety, with the roads authority's conditions disclosed; and
- the register reference and the grant position, disclosed.

9. WHAT I AM ASKING FOR, AND BY WHEN

Please provide a numbered response within 14 days of this email, answering each question at paragraph 7 in turn. Where an item cannot yet be supplied, please identify what is outstanding and give a specific date by which it will be provided.

Please also place this correspondence before your line manager, or the senior manager responsible for this proposal, and provide that person's name and contact details. I am asking for senior oversight because these matters have been put to you in writing since June 2025 and remain unanswered on the evidence. If no senior contact is identified within that period, I will write to Scottish Woodlands' head office.

10. RESERVATION

I am pursuing the regulatory questions directly with Scottish Forestry and Historic Environment Scotland, including requests under the Environmental Information (Scotland) Regulations 2004, and I will not wait on this correspondence to do so.

My objection of 1 September 2026 remains in full. Nothing in this letter, and nothing in your email of 19 November, signifies agreement to the proposed access arrangements, and nothing here waives any right under our title or otherwise. All rights are reserved.

For context only, the place and the business are described at https://uf51.love/Stoneymollan. The rights and the technical questions above stand on their own documents, not on that webpage.

Yours sincerely,

Brian Hughes
Upper Stoneymollan Cottage`;

const FULL = `To: ${TO}\nSubject: ${SUBJECT}\n\n${BODY}`;
const MAILTO = `mailto:${TO}?subject=${encodeURIComponent(SUBJECT)}`;

// The clipboard is blocked inside the preview frame on most phones. Try the modern API, then
// fall back to the old selection method, and report honestly whether it worked.
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) { /* fall through */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch (e) {
    return false;
  }
}

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
  const [showText, setShowText] = useState(false);
  const areaRef = useRef(null);

  useEffect(() => {
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => { document.head.removeChild(m); };
  }, []);

  useEffect(() => {
    if (showText && areaRef.current) {
      areaRef.current.focus();
      areaRef.current.select();
    }
  }, [showText]);

  const copy = async () => {
    const ok = await copyText(FULL);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      // Could not copy automatically — show it, selected, so it can be copied by hand.
      setShowText(true);
    }
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
            He confirmed he intends to proceed, answered eleven specific questions with guidance
            about <em>private</em> water supplies, and left himself the words “where appropriate”.
            This answers that — on the mains he never addressed, the burn pipe running through the
            felling zone, and the scheduled monument his survey may not have found.
          </p>

          {/* ── COPY AND PASTE, FIRST, BECAUSE THAT IS WHAT IT IS FOR ── */}
          <div className="mt-5 border-2 border-record-ink bg-record-ink p-4 text-record-paper">
            <p className="font-mono text-[10.5px] font-black uppercase tracking-[0.16em] text-record-signal">
              Copy and paste
            </p>
            <button
              type="button"
              onClick={copy}
              className="mt-2 flex min-h-[52px] w-full items-center justify-center gap-2 bg-record-paper px-4 py-3 font-mono text-[12px] font-black uppercase tracking-wide text-record-ink"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied — paste it into the email' : 'Copy the whole email'}
            </button>
            <button
              type="button"
              onClick={() => setShowText((v) => !v)}
              className="mt-2 w-full px-3 py-2 font-mono text-[10px] uppercase tracking-wide text-record-paper/70 underline decoration-dotted underline-offset-2"
            >
              {showText ? 'Hide the plain text' : 'Or show the plain text and select it yourself'}
            </button>
            <p className="mt-2 font-mono text-[9.5px] uppercase tracking-wide text-record-paper/50">
              If the copy button does nothing, the preview is blocking the clipboard — use the
              plain text below and copy it by hand
            </p>
          </div>

          {showText && (
            <textarea
              ref={areaRef}
              readOnly
              value={FULL}
              rows={14}
              onFocus={(e) => e.target.select()}
              className="mt-3 w-full border-2 border-record-ink bg-record-bone/50 p-3 font-mono text-[11px] leading-relaxed"
            />
          )}

          {/* THE ONE DEADLINE THAT IS NOT HIS TO SET */}
          <div className="mt-4 border-2 border-record-ink bg-record-signal/40 p-4">
            <p className="font-mono text-[10.5px] font-black uppercase tracking-[0.16em]">
              The deadline that actually matters
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
              Comments on a woodland creation application must reach Scottish Forestry within
              <strong> 28 days of the day it first appears on the public register</strong> — not
              within 14 days of Barry's reply. Look the case up today. If it is there, the clock is
              already running, and it is the only clock in this you do not control.
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
              Search “Open for comment”, then the property name or grid reference NS 37132 82135
            </p>
          </div>

          <div className="mt-4 border-2 border-record-ink bg-record-bone/60 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-record-muted">To</p>
            <p className="mt-1 break-all font-mono text-[13px] font-black">{TO}</p>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => copyText(TO)}
                className="flex min-h-[44px] items-center justify-center gap-2 border border-record-ink/30 px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide"
              >
                <Copy className="h-3.5 w-3.5" /> Copy address
              </button>
              <a
                href={MAILTO}
                className="flex min-h-[44px] items-center justify-center gap-2 border border-record-ink/30 px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide"
              >
                <Mail className="h-3.5 w-3.5" /> Open in mail
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex min-h-[44px] items-center justify-center gap-2 border border-record-ink/30 px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide"
              >
                <Printer className="h-3.5 w-3.5" /> Print
              </button>
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-record-muted">
              Sending from {FROM}
            </p>
          </div>

          <div className="mt-4 border-2 border-record-red bg-record-red/5 p-4">
            <p className="flex items-center gap-2 font-mono text-[10.5px] font-black uppercase tracking-[0.16em] text-record-red">
              <AlertTriangle className="h-4 w-4" /> Before you send
            </p>
            <ul className="mt-2 space-y-1.5 text-[13px] leading-snug text-record-ink/85">
              <li>Question 1 — the date(s), and what you actually saw, when works were carried out without using the road. That is the only blank in the letter.</li>
              <li>Check the title number. Our own pages show it as DMB27637 in one place and DM827637 in another. Read it off the title sheet and correct whichever is wrong — a wrong title number in a letter to an estate manager is a gift to him.</li>
            </ul>
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
            is worth nothing in a letter and a scheduled monument with two consent cases is worth
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
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-record-muted">Then, the same day</p>
          <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-record-ink/80" style={{ fontFamily: 'var(--font-reading)' }}>
            <li>Check the register. If the case is open for comment, that 28-day window outranks everything in this letter.</li>
            <li>Send it as a reply on the existing thread, so the 1 September objection and his 19 November email sit underneath it.</li>
            <li>The EIR requests carry the real clock — 20 working days, then review, then the Commissioner. Send those the same day, not after he replies.</li>
            <li>The HES case files for the two consents are downloadable now. The report on handling in each names who applied and why it was granted — worth reading before you send.</li>
            <li>Ask John Gilbert for a short signed statement on the burn pipe: where it runs, how deep, and that it passes through the ground now proposed for felling. His account is the only first-hand record of that pipe, and it is worth more than any argument.</li>
            <li>Do not attach the Glasgow title plan. It belongs to another matter.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}