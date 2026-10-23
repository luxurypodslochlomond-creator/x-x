import React from 'react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';

// How this record is made — the page that answers a panel, a journalist or a sceptic
// without anybody having to be in the room. Written to be read cold by somebody who
// has never heard of us and is looking for reasons to say no.

function Block({ n, title, children }) {
  return (
    <section className="mb-7 lg:mb-10">
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-[10px] font-black font-mono text-[#e2602a]">{n}</span>
        <h2 className="font-black uppercase text-[#141210] leading-tight" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 1.9vw, 28px)', letterSpacing: '-0.01em' }}>{title}</h2>
      </div>
      <div className="space-y-2.5 lg:space-y-3.5 text-[12px] lg:text-[13px] font-mono leading-relaxed lg:leading-[1.75] text-[#141210]">{children}</div>
    </section>
  );
}

function Rule({ children }) {
  return (
    <p className="border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 px-3 lg:px-5 py-2.5 lg:py-4 text-[11.5px] lg:text-[13px] font-mono leading-relaxed lg:leading-[1.75] text-[#141210]">{children}</p>
  );
}

export default function ClimateMethod() {
  return (
    <ClimateRecordShell
      eyebrow="How this record is made"
      marker="Method · sources · who decides · corrections"
      title="How this record is made"
      statement="Read this before you trust a single entry on it. Every claim here can be checked against the thing it came from."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International — and released to the world, the planet, all of us."
    >
      <Block n="01" title="What this is, and what it is not">
        <p>This is a record, not a feed. A feed is built to hold attention and pays for itself with it. This is built to be checked, cited and copied, and it makes no money from anybody's attention.</p>
        <p>Three consequences, in plain terms: entries are ordered by date and never by popularity. Nothing on the platform counts likes, shares, views or reach. And there is no ranking at all, so there is nothing to game.</p>
        <Rule>If a claim on this record cannot be traced to something outside it, it does not belong here.</Rule>
      </Block>

      <Block n="02" title="Where an entry comes from">
        <p>An entry is a fact with an origin. It may come from an official body's own statement, a peer-reviewed journal, published media, an organisation working on the ground, a first-hand dispatch from somebody there, or a document. Which one it is, is printed on the entry.</p>
        <p>We point at the origin and quote a line or two. We do not republish somebody else's article, and we do not pull content out of closed networks or private accounts.</p>
        <p>Anyone may send an entry in — a community group, a researcher, a reader who spotted something. It travels through exactly the same check as anything the record's own team writes.</p>
      </Block>

      <Block n="03" title="The ladder — how well a claim is known">
        <p>Every entry carries one of three labels, and the reader sees it before the headline:</p>
        <Rule>
          <strong>Official record</strong> — the body responsible has put it on the record itself.<br />
          <strong>Corroborated</strong> — two independent origins say the same thing.<br />
          <strong>Single source</strong> — one origin says so. Honestly labelled, not hidden.
        </Rule>
        <p>Labelling is the whole method. A record that admits which of its entries rest on one voice is worth more than one that pretends everything is equally certain. Where the strength of a claim is unclear, it says so.</p>
      </Block>

      <Block n="04" title="No source, no entry">
        <p>An entry with no traceable origin waits in a holding pen. A person then either finds the source or leaves the entry out. Nothing reaches the wire on the strength of a screenshot, a rumour, or a page with no publisher behind it.</p>
        <p>Every entry that reaches the wire is screened automatically for spam, off-topic promotion and dangerous advice. Sourced entries go up at once; anything the screen is unsure about waits for a person. The reason for that split is simple: the record exists to encourage people to share what they are doing, and holding every contribution for weeks would kill it.</p>
      </Block>

      <Block n="05" title="Who decides">
        <p>The screen is a machine. The decision is a person's. No entry is published on a machine's judgement, and no machine's opinion is treated as a finding — it produces an advisory note that a human reads.</p>
        <p>The record has one named editor, and that name sits at the top of the record rather than in the small print. The editor's name, the platform's contact address and Horizon International's role as the record's custodian are being settled with the founder, and this page is updated the moment they are. Until then, this page says so rather than inventing a masthead.</p>
        <Rule>A named person is accountable for what is on this record. That is the difference between a record and a rumour.</Rule>
      </Block>

      <Block n="06" title="Corrections, in daylight">
        <p>When an entry is wrong, it is corrected on the entry itself with the date it was corrected and what changed. Nothing is quietly edited, and nothing disappears.</p>
        <p>Every review decision — who looked at an entry, when, and what the advisory note said — is kept in an audit trail. That trail is what a research panel, a funder or a regulator can ask for, and it exists from the first day rather than being reconstructed later.</p>
      </Block>

      <Block n="07" title="Money, and what it cannot buy">
        <p>No advertising. No sponsorship. No paid placement of any kind. Money never buys a place on the record, a place in an entry, or a change to a claim.</p>
        <p>Support that keeps the record running is welcome and declared in the open. Who gave, and whether they chose to be named, is recorded; amounts are never published and never influence what appears.</p>
      </Block>

      <Block n="08" title="Citing the record">
        <p>Every entry has its own permanent address, so a researcher can cite one entry rather than a front page that changes. The date, the origin and how well the claim is known all travel with the link.</p>
        <p>An entry is citable and checkable on its own, and the source link takes you to the thing itself rather than to us describing it. That is the point: don't take our word, follow the link.</p>
      </Block>

      <Block n="09" title="What this record refuses to do">
        <p>No anonymous claims. No volume chasing — no target of entries per day, because that pressure is what fills a page with junk. No trending, no recommendations, and nothing that rewards a reader for returning.</p>
        <p>No republishing another publisher's work to keep a page full. And no pretending that speed is the same as accuracy: an entry can wait an hour for a source, and often should.</p>
      </Block>
    </ClimateRecordShell>
  );
}