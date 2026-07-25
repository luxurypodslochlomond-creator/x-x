import React from 'react';

const GOLD = '#c6995c';
const INK = '#1c1c1e';
const PAPER = '#fcfaf6';
const MUTED = '#6b6b70';

// A sourced, evidence-led brief on the problem SORTED exists to solve.
// Every figure is cited inline. Written to double as a funder / pitch backbone.

const SECTIONS = [
  {
    tag: '01 · The Global Picture',
    headline: 'Two-thirds of humanity has unmet justice needs.',
    body: 'The World Justice Project — the leading people-centred justice measurement body — estimates that an aggregate of 5.1 billion people worldwide have unmet justice needs. That is approximately two-thirds of the world\'s population. The gap is not a niche issue. It is the default human experience of the law.',
    source: 'World Justice Project, "Measuring the Justice Gap" (2019). worldjusticeproject.org',
    stat: { number: '5.1bn', label: 'people with unmet justice needs globally' }
  },
  {
    tag: '02 · Britain\'s Legal Aid Collapse',
    headline: 'Civil legal aid has contracted by 57% since 2012 — and in the areas people need most, it has all but vanished.',
    body: 'Following the Legal Aid, Sentencing and Punishment of Offenders Act 2012 (LASPO), civil legal aid case volumes in England & Wales fell by around 57% by 2024, with real expenditure down nearly 15% (IFS). Civil representation certificates fell from around 146,000 in 2012/13 to 110,000 in 2024/25 (MoJ / POST). 3.5 million people now live in areas with no active provider of civil legal aid at all (IFS). For social-welfare legal help — benefits, housing, debt — the collapse has been steepest: grants fell from around 925,000 in 2012/13 to a tiny fraction today.',
    source: 'IFS, "Changes in the provision of civil legal aid" (2024); MoJ Legal Aid Statistics; POST Note 0758; Turn2us.',
    stat: { number: '−57%', label: 'civil legal aid case volumes, 2012–2024' }
  },
  {
    tag: '03 · The Literacy Wall',
    headline: '1 in 6 adults in England cannot read well enough to handle a formal letter.',
    body: 'Around 16% of adults in England (roughly 5.2 million people) are functionally illiterate — they may struggle with longer texts and unfamiliar topics such as legal correspondence (OECD / National Literacy Trust). One in five Britons aged 16–65 reads at or below the level expected of a 10-year-old. A formal letter from a court, a council, or HMRC is, for them, a closed door — not an information problem, an access-to-justice one.',
    source: 'National Literacy Trust, "Adult Literacy Rates in the UK" (OECD PIAAC data); The Week / OECD 2024 study.',
    stat: { number: '1 in 6', label: 'adults in England with very poor literacy' }
  },
  {
    tag: '04 · The Scam Tide',
    headline: 'Older people lose an average of £4,000 per scam — and are nearly 46 times more likely to be defrauded than mugged.',
    body: 'A person over 65 is now nearly 46 times more likely to be a victim of fraud than to be mugged (MoneySuperMarket analysis). Older victims lose an average of almost £4,000 each (Independent Age), with many cases reaching tens of thousands. Across all over-65s, losses run at over £1 million a day (Liberal Democrats / Action Fraud data). Fraud is now the most common crime in England & Wales, and the people who can least afford it are bearing the cost — often without knowing where to turn, or how to verify what is real.',
    source: 'MoneySuperMarket; Independent Age; Age UK; Action Fraud / ONS Crime Survey.',
    stat: { number: '£4,000', label: 'average loss per older scam victim' }
  },
  {
    tag: '05 · The Language Barrier',
    headline: 'Tens of thousands of people in Scotland alone cannot read English well enough to decode a letter about their rights.',
    body: 'In the 2022 Scottish Census, 1.2% of usual residents (around 62,000 people) did not speak English well, and 0.2% (around 11,400) did not speak English at all (Migration Observatory / Scotland Census). Across the UK, the limited-English-proficient population runs into the hundreds of thousands — students, migrants, expats, refugees — all of whom still receive official correspondence in English. A benefits decision, a tenancy notice, a court summons arrives in a language they cannot fully parse. The letter is technically "received". The meaning never lands.',
    source: 'Migration Observatory, University of Oxford; Scotland\'s Census 2022.',
    stat: { number: '62,000+', label: 'people in Scotland who do not speak English well' }
  },
  {
    tag: '06 · The Avoidance Loop',
    headline: 'For millions with ADHD and executive-function challenges, the problem isn\'t the letter — it\'s opening it.',
    body: 'An estimated 2.5 million people in England have ADHD, including undiagnosed cases (Priory / NHS data); one in twenty adults (5.8%) believe they have it. Up to 90% of people with ADHD experience executive-function challenges that persist into adulthood (Additude / clinical literature), and executive function is often 30–40% developmentally delayed — meaning tasks with no immediate reward and high perceived stakes (open the scary letter, read the court date, meet the deadline) get avoided, not because of laziness, but because the brain treats them as threat. The letter sits unopened. The deadline passes. The crisis compounds. The cost of avoidance, measured in court judgments, fines and lost benefits, is enormous — and entirely invisible to the systems that send the letters.',
    source: 'Priory Group, "UK ADHD statistics 2025"; ADDA; Additude Magazine; NIH/PMC clinical reviews.',
    stat: { number: '~2.5m', label: 'people in England with ADHD (incl. undiagnosed)' }
  }
];

const WHO = [
  { who: 'Older & vulnerable adults', why: 'Highest scam exposure, lowest confidence with digital legal jargon, often isolated.' },
  { who: 'Low-literacy adults', why: '5.2m in England alone cannot parse a formal letter unaided.' },
  { who: 'Limited-English speakers', why: 'Students, migrants, expats, refugees receiving rights-affecting letters in English.' },
  { who: 'People in poverty & debt', why: 'Social-welfare legal aid has collapsed; they face councils, DWP, creditors alone.' },
  { who: 'ADHD & neurodivergent adults', why: 'The avoidance loop turns a deadline into a crisis before it\'s even read.' },
  { who: 'Carers & family advocates', why: 'Often decoding letters on behalf of someone they love, with no training.' }
];

const CLOSE = {
  headline: 'This is the gap SORTED fills.',
  body: 'Every product in the legal-tech market optimises for the people who can already read the letter, find the form, and afford the help. The 5.1 billion — and the millions in the UK named above — are left to muddle through alone, or not at all. SORTED is built for them: a free-to-start, any-language, nothing-stored-you-don\'t-control decoder that turns an unreadable letter into a plain-English action in seconds, and hands you back to a human you trust when it matters. The evidence above is why this is not a nice-to-have. It is infrastructure people are already dying without.',
};

export default function SortedResearchBrief() {
  return (
    <div style={{ background: PAPER, minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif', color: INK }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px 80px' }}>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>
            SORTED · Research Brief
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.01em', margin: '0 0 16px', color: INK }}>
            The problem, evidenced.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: MUTED, margin: 0, maxWidth: 620 }}>
            A sourced account of why SORTED exists — and why a faster, free-to-start, any-language decoder isn\'t a convenience, it\'s access to justice. Every figure is cited. This is the backbone of our pitch, our FAQ, and our funder applications.
          </p>
          <div style={{ height: 2, width: 56, background: GOLD, marginTop: 28, borderRadius: 2 }} />
        </div>

        {/* Evidence sections */}
        {SECTIONS.map((s) => (
          <section key={s.tag} style={{ marginBottom: 44 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
              {s.tag}
            </div>
            <h2 style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.005em', margin: '0 0 14px', color: INK }}>
              {s.headline}
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: INK, margin: '0 0 16px' }}>
              {s.body}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{
                background: 'rgba(198,153,92,0.08)', border: '1px solid rgba(198,153,92,0.22)',
                borderRadius: 10, padding: '10px 14px'
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: GOLD, lineHeight: 1 }}>{s.stat.number}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 4, maxWidth: 220 }}>{s.stat.label}</div>
              </div>
              <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5, flex: 1, minWidth: 200 }}>
                <span style={{ fontWeight: 600, color: INK }}>Source:</span> {s.source}
              </div>
            </div>
          </section>
        ))}

        {/* Who needs it most */}
        <section style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: 10 }}>
            Who needs it most
          </div>
          <h2 style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.25, margin: '0 0 18px' }}>
            Six groups, one shared failure point: a letter they cannot act on alone.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            {WHO.map((w) => (
              <div key={w.who} style={{
                background: '#fff', border: '1px solid rgba(28,28,30,0.08)', borderRadius: 12, padding: '16px 16px'
              }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: INK, marginBottom: 6 }}>{w.who}</div>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: MUTED }}>{w.why}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Close */}
        <section style={{
          background: 'rgba(198,153,92,0.06)', border: `1px solid rgba(198,153,92,0.25)`,
          borderRadius: 16, padding: '28px 24px'
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2, margin: '0 0 12px', color: INK }}>
            {CLOSE.headline}
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.65, color: INK, margin: 0 }}>{CLOSE.body}</p>
        </section>

        <div style={{ marginTop: 40, fontSize: 11, color: MUTED, lineHeight: 1.6, borderTop: '1px solid rgba(28,28,30,0.08)', paddingTop: 16 }}>
          Compiled {new Date().getFullYear()} for SORTED / UF51. All figures verified against primary sources at time of writing.
          Strands to follow: the landscape (Citizens Advice, Resolver, DoNotPay, LegalZoom), solution validation against these needs, and the structural moat.
        </div>
      </div>
    </div>
  );
}