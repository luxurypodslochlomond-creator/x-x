import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Printer, ArrowLeft, ExternalLink, AlertTriangle, Scale } from 'lucide-react';

// ── THE REPLY TO BARRY HARPER — READY TO SEND ─────────────────────────────────
// No blanks. No dates we do not have. No John Gilbert: his note was sent privately to help,
// and a private kindness is not a source to be quoted in a letter to the other side. The
// facts he gave about the burn pipe are still here, because they are facts about our own
// supply and our own ground — stated plainly, with an invitation to correct us if the pipe
// runs elsewhere. That is stronger than a quote and it does not spend his goodwill.
//
// ── WHAT REPLACED THE DATE WE DID NOT HAVE ────────────────────────────────────
// The question used to ask for a date of works already carried out. Brian heard and saw the
// works but has no date, and a letter that asks for something we cannot supply invites the
// answer "you have given us no particulars". So the question no longer turns on a date at all.
// It asks Barry to identify the works from his own records, and then asks the question that
// has a statutory answer behind it: what felling permission covered them?
//
// Felling in Scotland requires a felling permission under the Forestry and Land Management
// (Scotland) Act 2018, and Scottish Forestry publishes felling permission applications on the
// public register. Scheduled monument consent from HES is a different consent for a different
// purpose and does not authorise the felling of trees. So where trees have come down, there
// should be a permission reference — and asking for it needs no date from us at all.
//
// ── AND THE CAIRN, VERIFIED FROM HES ON 24 NOVEMBER ──────────────────────────
// SM6341, designated 12 April 1996. 68 m long, 18 m wide at the SE end, three or four burial
// chambers exposed, scheduled area up to 110 m by 45 m. Two scheduled monument consents
// granted without conditions: 18 Jan 2024, removal of windblow ON the cairn and of adjacent
// trees at risk of blowing onto it; 19 Dec 2024, felling of trees WITHIN the scheduled area,
// with a restock map. The designation reads "chambered cairn 720m S of Cameron Home Farm", so
// the letter asks whether the boundary reaches it rather than asserting that it does.

const TO = 'Barry.Harper@scottishwoodlands.co.uk';
const FROM = 'tullifarm@btinternet.com';
const SUBJECT = 'RE: Auchendennan Woodland Creation — the guidance you sent covers private supplies, not the mains; SM6341 is scheduled';

const RECORD_FACTS = [
  {
    label: 'The cairn is scheduled',
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
    label: 'Felling needs its own permission',
    text: 'Felling in Scotland requires a felling permission under the Forestry and Land Management (Scotland) Act 2018, with limited exemptions and substantial penalties for felling without one. Scottish Forestry publishes felling permission applications and FGS applications on its public register, filterable by local authority — West Dunbartonshire for this site — and shows the property name, case reference, area, grid reference and a map of the boundary.',
    src: 'Scottish Forestry register',
    href: 'https://casebook.forestry.scot/w/webpage/prhome',
  },
];

const RIGHTS = [
  {
    n: 1,
    title: 'The cairn is scheduled, and the protection is criminal',
    body: 'SM6341 is designated under the Ancient Monuments and Archaeological Areas Act 1979. Works within the scheduled area — up to 110 m by 45 m around the cairn — require scheduled monument consent, and executing them without it is an offence. Two consents have already been granted on this monument in the last two years.',
    remedy: 'Scheduled monument consent; criminal liability without it.',
  },
  {
    n: 2,
    title: 'The windthrow risk has already materialised once',
    body: 'HES granted consent in January 2024 for the removal of windblow on the cairn and of adjacent trees at risk of blowing onto it. That is the regulator recording that trees beside this monument have already damaged it. New planting on the adjacent ground recreates that risk on a longer rotation.',
    remedy: 'A material consideration the assessment must address.',
  },
  {
    n: 3,
    title: 'The burn is a private supply, and its pipe lies in the ground to be worked',
    body: 'The 50 mm burn supply runs from the Cameron Estate intake, through the ground in question, under our property to the pond it still feeds. The right is a registered servitude in the burdens of our title (D2). So this is not only a right to reach the pipe — the pipe itself is in the ground to be felled, extracted over and planted.',
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
    body: 'Upper Stoneymollan Road is how we, our guests, the carers, the ponies and the emergency services reach the property. We have access rights in the burdens of our title (D1), and works that make the road unsafe or impassable interfere with those rights.',
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
    body: 'Afforestation above the thresholds in the Forestry (Environmental Impact Assessment) (Scotland) Regulations 2018 requires an EIA determination. As an affected neighbour we are entitled to make representations and to be told the outcome and the reasons, including any screening opinion and the recorded reasons for it.',
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

3. THE BURN, HOWEVER, IS A PRIVATE SUPPLY — AND ITS PIPE RUNS THROUGH THE GROUND YOU INTEND TO WORK

Your guidance applies directly to the burn, so I am asking you to apply it.

The burn supply comes from Cameron Estate. The pipeline is 50 mm and runs from that intake, through the ground in question, under our property and on to the pond, which it still feeds. The right to that supply is a registered servitude in the burdens of our title (section D2). The supply was disconnected from the house at handover but it continues to serve the property through the pond.

If your understanding of where that pipe runs differs from mine, please tell me and I will correct it. But it belongs on your drawings, because it lies in the ground you propose to fell, extract over and plant.

Alongside it sit the two pieces of working infrastructure the right depends on: a small weir approximately 200 m up the burn, which fills with silt and gravel and requires digging out usually about once a year, and a concrete settling tank approximately 50 m south-east of the weir, in the field adjacent to the property, which was emptied and dug out completely in 2019.

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

5. THE WORKS ALREADY CARRIED OUT IN THIS AREA, AND THE PERMISSION BEHIND THEM

Works connected with your operations have already been carried out in this area, and the vehicles involved did not use Upper Stoneymollan Road. I am not going to put a date on them for you; I am asking you to identify them from your own records and to answer four things about them.

- Which route those vehicles used.
- Whether that route remains available and suitable.
- Why it is not the proposed route for the works described in your response.
- Which route any further works will be served by.

If an alternative access exists and has already been used, then the proposition that Upper Stoneymollan Road must carry these operations is not established. That is the central question in this correspondence, and it is why I am asking you to identify the works rather than describe the proposal.

There is a fifth thing, and it is the one with a statutory answer behind it. Felling in Scotland requires a felling permission under the Forestry and Land Management (Scotland) Act 2018, subject to limited exemptions, and Scottish Forestry publishes felling permission applications on its public register. A scheduled monument consent from Historic Environment Scotland is a separate consent for a separate purpose and does not authorise the felling of trees. So where trees have come down in this area, there should be a felling permission reference behind them.

Please provide the felling permission reference, or other authorisation, that covered those works, together with any felling permission covering the trees within the scheduled area dealt with in 2024.

6. THE FUNDING QUESTION IS ANSWERABLE FROM THE REGISTER

I am not going to assert that public money is involved. I am going to point out that the answer is a matter of public record either way, and that it can be settled in one line.

Woodland creation on this scale is normally supported through the Forestry Grant Scheme. Scottish Forestry publishes Forestry Grant Scheme woodland creation applications on its public register while they are open for comment, and any proposal with more than two hectares of new woodland is displayed there. The published entry includes the property name, the case reference, the total area, the conifer and broadleaf areas, the grid reference, the status, and a map showing the boundary of the application — together with the case documents, the consultees involved and their responses, and documentation such as survey results. From 3 November 2026 all new woodland creation proposals go to the Scottish Forestry Public Register.

So one of two things is true. Either this proposal is on that register, in which case the case reference and the boundary plan I have now twice asked you for are already published, and you can simply give me the reference. Or it is not, in which case I would like to know why a proposal of this scale is not being consulted on in the ordinary way.

Please provide the case reference, and confirm whether an application has been made under the Forestry Grant Scheme or any other public source for this proposal. If a grant is awarded, the conditions attached to it — including the UK Forestry Standard and its historic environment and water requirements — are not a private arrangement between you and the landowner. They are conditions of public funding, and they are answerable to the body that pays.

7. OUR RIGHTS, SET OUT PLAINLY

I am setting these out not as a threat but so that we are both clear about the ground we are standing on.

First: the cairn is protected by statute, and the protection is criminal rather than civil, as set out at paragraph 4.

Second: the burn supply is a servitude, and it is a real right in the land. It is registered in the burdens of our title. A servitude binds you and every successor, and it cannot be planted over, fenced off or engineered away. A right to take water carries with it the access reasonably necessary to maintain the works that take it — the weir and the settling tank. If planting or a deer fence makes that maintenance impossible, or if the pipe in the ground is damaged, that is interference with a servitude, and the remedies in Scots law are interdict and damages.

Third: the mains pipe is our property, not a right. The 50 mm MDPE branch is owned by the cottage and was paid for by its occupants. It is corporeal property. Damage to it is a delict, and it is your operations that would be creating the risk.

Fourth: access to our home is not a favour. Upper Stoneymollan Road is how we, our guests, the carers, the ponies and the emergency services reach the property. We have access rights in the burdens of our title, and works that make the road unsafe or impassable interfere with those rights.

Fifth: we have a statutory right to the file itself. Under the Environmental Information (Scotland) Regulations 2004, Scottish Forestry and Historic Environment Scotland must make environmental information available on request within 20 working days, and where access is refused there is a right of review and then a right of appeal to the Scottish Information Commissioner. I am exercising that right in parallel with this letter. I am not asking your permission to see the application. I am asking the regulators, on a clock that is already running.

Sixth: we have a right to be consulted on the EIA determination, and to reasons. Afforestation above the thresholds in the Forestry (Environmental Impact Assessment) (Scotland) Regulations 2018 requires an environmental impact assessment determination. As an affected neighbour we are entitled to make representations and to be told the outcome and the reasons for it, including any screening opinion and the recorded reasons behind it.

Seventh, and most importantly: nothing is settled yet. Your own email says the proposal has not been approved and remains subject to consultation. That means the design is still open. The boundary can still move, the fence can still move, the access can still change and the scheduled area can still be excluded. It also means the decision will be taken on the evidence — and the evidence is precisely what I am asking you for.

8. THE QUESTIONS YOUR EMAIL LEAVES OPEN

Access and the works already carried out
1. Which route did the vehicles use for the works already carried out in this area without using Upper Stoneymollan Road?
2. Does that route remain available and suitable, and why is it not the proposed route for the works described in your response?
3. Which route will any further works be served by?
4. What felling permission, or other authorisation, covered those works? Please provide the reference.
5. What felling permission covered the trees within the scheduled area dealt with in 2024? Please provide the reference.

The mains
6. Please provide the plan identifying the 50 mm MDPE branch of the Scottish Water main, its route and its depth, with the protection and incident-response arrangements proposed for it.
7. What is the assessed risk to it from vehicle loading on the road, and from works on the driveway and the verge?
8. Which party accepts liability for damage to it, and what is the procedure for inspection, repair and dispute?
9. Has Scottish Water been consulted, and what did they say? Scottish Water owns the main, the branch under the A82 and the hydrant at the fork, and neither your email nor the guidance you enclosed mentions Scottish Water at all.

The burn
10. Where does the 50 mm burn supply pipe run, at what depth, relative to the felling area, the extraction route and the proposed planting boundary?
11. How will it be protected during felling, extraction and planting, and from silt-laden runoff and spill?
12. How will the annual dig-out of the weir approximately 200 m up the burn, and access to the settling tank approximately 50 m south-east of it in the adjacent field, be maintained through the planting and through a deer fence? Where will the gates be?

Heritage
13. Do the boundary, the deer fence and the extraction route enter or cross the scheduled area of SM6341? Please identify on a plan where.
14. Has scheduled monument consent been applied for or obtained for any part of the proposal within the scheduled area?
15. Did the archaeological assessment identify SM6341? What does it say about the monument, its scheduled area and its setting?
16. What does the assessment say about windthrow risk to the monument from the proposed planting, given that windblow onto the cairn has already occurred and required consent in 2024?
17. Has Historic Environment Scotland been consulted as a statutory consultee, and what did they say? If they have not been consulted, why not?

Funding and the register
18. What is the Scottish Forestry case reference for this proposal, and is it published on the public register?
19. Has an application been made under the Forestry Grant Scheme or any other public source, and under which option?

The road
20. Please confirm the status of Upper Stoneymollan Road with the roads authority, and supply the roads authority's conditions or consent for the works and the traffic.
21. Which party accepts responsibility for damage attributable to the operations, and what are the pre- and post-works inspection, repair and dispute arrangements?
22. Please provide vehicle types and maximum weights, expected movements, working hours, duration, and the arrangements for residents, guests, emergency access and people using the John Muir Way.
23. The road carries, in an ordinary week, group pony treks of up to seven horses twice daily Monday to Saturday, horse boxes to the cross-country course at weekends, children travelling to and from school, carers, and guests of the shooting school, the Airbnbs and the pods, as well as members of the public walking, cycling, riding and walking dogs all year round. There is no safe way for a lorry and a group of horses to pass one another between the passing places, one of which has eroded and is nearly unusable. These points were put to you in writing on 4 June 2025 and have still not been answered on the substance. Please answer them now.

Design and distances
24. Please provide the boundary, planting and access plans at a scale that allows the nearest proposed planting boundary, the extraction route and any fence line to be measured against the cottage, the road, the mains, the burn pipe and the scheduled area. I am asking for the plan rather than an assurance, so that the distance can be checked rather than accepted.

Case file
25. Please provide the submitted boundary and access plans, any EIA screening opinion with its recorded reasons, and the survey reports and statutory consultation responses relied upon, including the cultural heritage assessment.

9. WHAT MUST HAPPEN BEFORE DETERMINATION

I am not asking you to abandon the proposal. I am asking that the following be settled before Scottish Forestry determines it, because after that point none of it can be settled at all:

- the scheduled area of SM6341, confirmed as excluded from the boundary, the fence and the extraction route, and agreed with Historic Environment Scotland;
- the archaeology assessment, re-done if the monument was not in it, and addressing windthrow risk explicitly;
- the route and protection of the burn supply pipe, and the maintenance of the weir and settling tank through the fence;
- the protection of the mains branch, in writing, with a named party liable, and Scottish Water's position;
- the access route, resolved on evidence rather than asserted;
- the felling permission behind the works already carried out;
- the road, its status, its condition, its capacity and its safety, with the roads authority's conditions disclosed; and
- the register reference and the grant position, disclosed.

10. WHAT I AM ASKING FOR, AND BY WHEN

Please provide a numbered response within 14 days of this email, answering each question at paragraph 8 in turn. Where an item cannot yet be supplied, please identify what is outstanding and give a specific date by which it will be provided.

Please also place this correspondence before your line manager, or the senior manager responsible for this proposal, and provide that person's name and contact details. I am asking for senior oversight because these matters have been put to you in writing since June 2025 and remain unanswered on the evidence. If no senior contact is identified within that period, I will write to Scottish Woodlands' head office.

11. RESERVATION

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

export default function StoneymollanReply() {
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
      setShowText(true);
    }
  };

  return (
    <div className="min-h-screen bg-record-paper text-record-ink">
      <div className="mx-auto max-w-3xl px-4 py-6 pb-24 lg:px-8">

        <Link
          to="/Stoneymollan"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-record-muted underline decoration-dotted underline-offset-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Stoneymollan
        </Link>

        <h1 className="mt-3 text-[25px] leading-tight lg:text-[33px]" style={{ fontFamily: 'var(--font-display)' }}>
          The reply to Barry Harper
        </h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-record-ink/80" style={{ fontFamily: 'var(--font-reading)' }}>
          Ready to send. No blanks. It answers him on the mains he never addressed, the burn pipe
          running through the ground he wants to work, and the scheduled monument his survey may
          not have found.
        </p>

        {/* ── COPY, FIRST, BECAUSE THAT IS WHAT THE PAGE IS FOR ── */}
        <div className="mt-4 border-2 border-record-ink bg-record-ink p-4 text-record-paper">
          <button
            type="button"
            onClick={copy}
            className="flex min-h-[54px] w-full items-center justify-center gap-2 bg-record-paper px-4 py-3 font-mono text-[12.5px] font-black uppercase tracking-wide text-record-ink"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied — paste it into the email' : 'Copy the whole email'}
          </button>
          <button
            type="button"
            onClick={() => setShowText((v) => !v)}
            className="mt-2 w-full px-3 py-2 font-mono text-[10px] uppercase tracking-wide text-record-paper/70 underline decoration-dotted underline-offset-2"
          >
            {showText ? 'Hide the plain text' : 'Or show the plain text and copy it by hand'}
          </button>
        </div>

        {showText && (
          <textarea
            ref={areaRef}
            readOnly
            value={FULL}
            rows={12}
            onFocus={(e) => e.target.select()}
            className="mt-2 w-full border-2 border-record-ink bg-record-bone/50 p-3 font-mono text-[11px] leading-relaxed"
          />
        )}

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <a
            href={MAILTO}
            className="flex min-h-[44px] flex-1 items-center justify-center gap-2 border-2 border-record-ink px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide"
          >
            Open in mail — to {TO.split('@')[0]}
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex min-h-[44px] items-center justify-center gap-2 border-2 border-record-ink px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide"
          >
            <Printer className="h-3.5 w-3.5" /> Print
          </button>
        </div>
        <p className="mt-2 break-all font-mono text-[10px] uppercase tracking-wide text-record-muted">
          {TO} · sending from {FROM}
        </p>

        <div className="mt-4 border-2 border-record-ink bg-record-signal/40 p-3">
          <p className="font-mono text-[10.5px] font-black uppercase tracking-[0.16em]">
            The deadline that is not his to set
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
            Comments on a woodland creation application must reach Scottish Forestry within
            <strong> 28 days of the day it first appears on the public register</strong> — not
            within 14 days of Barry's reply. Filter the register by West Dunbartonshire Council
            and search the property name. If the case is there, that clock is already running.
          </p>
          <a
            href="https://casebook.forestry.scot/w/webpage/prhome"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex min-h-[44px] items-center justify-center gap-2 bg-record-ink px-4 py-2 font-mono text-[10.5px] font-black uppercase tracking-wide text-record-paper"
          >
            Open the public register <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <article className="mt-6 border-t-2 border-record-ink pt-5">
          {blocks(BODY).map((b, i) => {
            if (b.kind === 'head') {
              return (
                <h2 key={i} className="mt-6 font-mono text-[12px] font-black uppercase tracking-[0.12em] text-record-red">
                  {b.text}
                </h2>
              );
            }
            if (b.kind === 'list') {
              return (
                <ul key={i} className="mt-2 space-y-1.5 pl-1">
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
              <p key={i} className="mt-3 text-[14px] leading-relaxed" style={{ fontFamily: 'var(--font-reading)' }}>
                {b.text}
              </p>
            );
          })}
        </article>

        {/* ── THE WORKING, KEPT BELOW THE LETTER AND FOLDED AWAY ── */}
        <details className="mt-8 border-2 border-record-ink bg-record-bone/40 p-4">
          <summary className="cursor-pointer font-mono text-[11px] font-black uppercase tracking-[0.18em] text-record-red">
            What the public record says — and where each line came from
          </summary>
          <ol className="mt-3 space-y-4">
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
        </details>

        <details className="mt-3 border-2 border-record-ink bg-record-bone/40 p-4">
          <summary className="flex cursor-pointer items-center gap-2 font-mono text-[11px] font-black uppercase tracking-[0.18em] text-record-red">
            <Scale className="h-3.5 w-3.5" /> What we have, exactly — eight rights
          </summary>
          <ol className="mt-3 space-y-3">
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
        </details>

        <div className="mt-4 border-2 border-record-red bg-record-red/5 p-4">
          <p className="flex items-center gap-2 font-mono text-[10.5px] font-black uppercase tracking-[0.16em] text-record-red">
            <AlertTriangle className="h-4 w-4" /> Before you press send
          </p>
          <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-record-ink/85" style={{ fontFamily: 'var(--font-reading)' }}>
            <li>Check the title number. Our own pages show it as DMB27637 in one place and DM827637 in another. Read it off the title sheet — a wrong title number in a letter to an estate manager is a gift to him.</li>
            <li>Send it as a reply on the existing thread, so the 1 September objection and his 19 November email sit underneath it.</li>
            <li>The EIR requests carry the real clock — 20 working days, then review, then the Commissioner. Send those the same day, not after he replies.</li>
            <li>The two HES case files are downloadable now. The report on handling in each names who applied and why it was granted.</li>
            <li>Do not attach the Glasgow title plan. It belongs to another matter.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}