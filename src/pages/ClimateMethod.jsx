import React from 'react';
import { Link } from 'react-router-dom';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import Block from '@/components/climate/MethodBlock';
import RecordCorrections from '@/components/climate/RecordCorrections';
import RecordSaySomething from '@/components/climate/RecordSaySomething';
import '@/components/climate/method-page.css';

// How this record is made — the page that answers a panel, a journalist or a sceptic
// without anybody having to be in the room. Written to be read cold by somebody who
// has never heard of us and is looking for reasons to say no.
//
// Tightened, not softened. Every rule and every limit that was here is still here;
// the sentences around them are shorter, because a method nobody finishes reading
// protects nobody. Nothing was cut that a sceptic could have used.

function Rule({ children }) {
  return (
    <p className="border-l-4 border-record-red bg-record-signal/20 p-4 text-record-ink lg:px-5 lg:py-4">{children}</p>
  );
}

export default function ClimateMethod() {
  return (
    <ClimateRecordShell
      className="record-sectioned-page record-method-page record-trust-page"
      wide
      compact
      eyebrow="Method & corrections"
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International — and released to the world, the planet, all of us."
    >
      <header className="record-method-intro bg-record-paper p-4 lg:p-6">
        <h1 className="max-w-xl text-[30px] font-bold leading-[1.1] tracking-tight lg:text-[42px]">How we check. What we correct.</h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-record-muted">The method explains the checks. The corrections show what changed. Sources, responsibility and mistakes, in one place.</p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm font-bold text-record-red">
          <a href="#corrections" className="inline-flex min-h-11 items-center underline underline-offset-4">Read the corrections ↓</a>
          <a href="#say" className="inline-flex min-h-11 items-center underline underline-offset-4">Report a problem ↓</a>
        </div>
      </header>
      <div className="record-method-rules" aria-label="The full method">
      <Block n="01" title="What this is, and what it is not">
        <p>A record, not a feed. A feed is built to hold attention and pays for itself with it. This is built to be checked, cited and copied, and it makes no money from anybody's attention.</p>
        <p>Entries are ordered by date, never by popularity. Nothing counts likes, shares or followers. Nothing can be pushed up by paying, so there is nothing here to game.</p>
        <p>One thing is counted, and only one: a read — an entry was opened. Once per place per half hour, never per person, and the place is never an address. Reads are shown on the map, alongside the entries. They never order this record and never change it.</p>
        <p>It reports what is working; it does not promise that it adds up. A catalogue of solutions is not evidence of improvement, and this record will not blur the two — the reader does that arithmetic, with the sources in front of them.</p>
        <Rule>If a claim about the world cannot be traced to something outside this record, it does not belong here. The record's own rules are a different animal: they are marked as decisions rather than findings, and they are checked the only way a rule can be — by whether it held.</Rule>
      </Block>

      <Block n="02" title="Where an entry comes from">
        <p>An entry is a fact with an origin: a body's own statement, a peer-reviewed journal, published media, an organisation working on the ground, a first-hand dispatch, or a document. Which one it is, is printed on the entry.</p>
        <p>We point at the origin and quote a line or two. We never republish somebody else's article, and never pull from closed networks or private accounts.</p>
        <p>
          Links rot, so where a copy of what a source said can be taken, it is kept and dated — the words as
          they stood, with a fingerprint of that exact copy — and a reader is shown only an excerpt of it. The
          origin keeps its name, its rights and its own address, and every entry sends the reader there first.
          If you publish a source and would rather a copy were not kept,{' '}
          <Link to="/ClimateMethod#say" className="border-b-2 border-[#141210] font-black text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e]">
            say so
          </Link>{' '}
          and it comes off. The link to your page stays; the copy goes.
        </p>
        <p>Anyone may send an entry in — a community group, a researcher, a reader who spotted something. It goes through exactly the same check as anything written here.</p>
        <p>An action is traced differently, and the record says which. An action is the organiser's own word about what they are doing, and their own contact line is printed on it — that line is the origin. Its label stays at one origin says so until a person has a second, independent origin to name.</p>
      </Block>

      <Block n="03" title="The ladder — how well a claim is known">
        <p>Every entry carries one of three labels, and a reader sees it before the headline:</p>
        <Rule>
          <strong>Official record</strong> — the body responsible has put it on the record itself.<br />
          <strong>Corroborated</strong> — two independent origins say the same thing.<br />
          <strong>Single source</strong> — one origin says so. Honestly labelled, not hidden.
        </Rule>
        <p>Labelling is the whole method. A record that admits which entries rest on one voice is worth more than one that pretends everything is equally certain.</p>
      </Block>

      <Block n="04" title="No source, no entry">
        <p>An entry with no traceable origin waits in a holding pen: a person either finds the source or leaves the entry out. Nothing arrives on the strength of a screenshot, a rumour, or a page with no publisher behind it.</p>
        <p>Every entry is screened for spam, off-topic promotion and dangerous advice. Sourced entries go up at once; anything the screen is unsure about waits for a person. Holding every contribution for weeks would kill the thing this record exists to encourage.</p>
      </Block>

      <Block n="05" title="Who decides" full>
        <p>The screen is a machine, and it is allowed to say only one thing: clean enough to go up, or wait for a person. It never says that a claim is true, it never sets how well a claim is known, and it never signs an entry with anybody's name. Anything it is unsure of waits for a person, and that person's decision is the one that counts.</p>
        <p>Three people hold the record's keys: Janine M. H. Selendy, after whose work and Horizon International this record is made; Gillian Barbara Brown; and Brian Hughes, who built it. No custodian can add or remove another alone — it takes two of them — so that rule lives in the record rather than in a promise on a page.</p>
        <p>Keeping the record running is a second, separate job from deciding what goes on it, and the person holding it is not the founder. Anyone may write to <a href="mailto:family@uf51.love" className="font-black underline decoration-2 underline-offset-2 hover:text-[#b3261e]">family@uf51.love</a> and a person answers.</p>
        <p>
          One thing is not yet as it should be, and this page says it rather than letting the paragraph above stand
          unqualified: the entries placed on this record in its first weeks went up on the screen's word, before a
          person was signing, and they carry no custodian's name. Every entry placed from here is either signed by the
          custodian who published it or prints plainly that it is unsigned. Nothing on this record pretends that a person
          signed what nobody signed.
        </p>
        <p>
          And one more, because a page about honesty should say where its own sentences came from. This record was
          made by a person with a machine's help. The machine has a name — Base 1, built by Base44 — and it drafted,
          checked links, wrote the code and drew the
          example strips in the cartoon room, and those strips are labelled there as fiction rather than as anybody's
          drawing. A person decided what stayed. Every sentence left standing is his, the mistakes on this record are
          his mistakes, and no claim on it rests on a machine's opinion of the world. Where the machine's own reading
          does appear, it is labelled as a machine's reading and kept apart from a person's words. It never signs
          a person's name; automatically cleared entries and missing human signatures are disclosed above.
        </p>
        <Rule>A named person is accountable for what is on this record. That is the difference between a record and a rumour.</Rule>
      </Block>

      <Block n="06" title="Corrections, in daylight">
        <p>When an entry is wrong it is corrected on the entry itself, with the date and what changed. Nothing is quietly edited. Nothing disappears.</p>
        <p>Every decision a person makes — who looked, when, and what the advisory note said — goes into an audit trail. It holds only decisions that were really taken: the entries that went on before it was wired carry no line in it, and that gap is said here rather than filled in afterwards. An entry the screen cleared asks nothing of a person, so no decision is claimed for it.</p>
        <p>
          An audit trail keeps a person honest. It does not catch a quiet edit made at the table itself. So every
          published entry also carries a fingerprint of its own words, taken when it was sealed and checkable by
          anyone in their own browser: <a href="/ClimateSeals" className="font-black underline decoration-2 underline-offset-2 hover:text-[#b3261e]">see every seal and check it yourself</a>.
        </p>
        <p>
          Every correction, gathered in one place and dated, is on{' '}
          <Link to="/ClimateMethod#corrections" className="border-b-2 border-[#141210] font-black text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e]">
            corrections, in daylight
          </Link>
          {' '}— including an honest nought when there is nothing to show yet.
        </p>
      </Block>

      <Block n="07" title="Money, and what it cannot buy">
        <p>No advertising. No sponsorship. No paid placement of any kind. Money never buys a place on the record, a place in an entry, or a change to a claim.</p>
        <p>Support that keeps the record running is welcome and declared in the open: who gave, and whether they chose to be named. Amounts are never published and never influence what appears.</p>
      </Block>

      <Block n="08" title="Citing the record">
        <p>Every entry has its own permanent address, so a researcher cites one entry rather than a front page that changes. The date, the origin and how well the claim is known all travel with the link.</p>
        <p>The source link takes you to the thing itself, not to us describing it. Don't take our word — follow the link.</p>
      </Block>

      <Block n="09" title="The record's music">
        <p>Music is given to this record, not licensed to it. The artist keeps their name and keeps their rights; the master is stored exactly as it was given and served whole; no play is counted, nothing is ranked, and nobody pays for a place on the page.</p>
        <p>Nothing here starts by itself. Every piece is heard because a reader pressed play, and the record's own theme is held to the same rule: it is a signal, credited to its composer, taking no rank above the rest.</p>
        <p>A piece held back is paused, not removed: its master stays whole and its place returns when it is released.</p>
      </Block>

      <Block n="10" title="What this record refuses to do">
        <p>No anonymous claims. No volume chasing — no target of entries per day, because that pressure is what fills a page with junk. No trending, no recommendations, and nothing that rewards a reader for returning.</p>
        <p>No republishing another publisher's work to keep a page full. And no pretending that speed is the same as accuracy: an entry can wait an hour for a source, and often should.</p>
      </Block>
      </div>
      <RecordCorrections />
      <div className="record-method-contact bg-record-paper p-4 lg:p-6"><RecordSaySomething /></div>
    </ClimateRecordShell>
  );
}