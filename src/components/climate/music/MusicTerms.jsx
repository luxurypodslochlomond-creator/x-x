import React from 'react';

// ── THE TERMS OF THIS MUSIC RECORD ──────────────────────────────────────────────
// A panel is not asked to believe this page. It is asked to check it. So every claim the
// record makes about its own music is stated here as a term, and beside each one is the
// way a stranger can test it without trusting the page, the platform or anyone named on
// it — a critic, a scientist, a listener with a laptop.
//
// Nothing here quotes anybody. Names that set the standard for this kind of work are not
// ours to put words in: the record speaks for itself and lets the work be judged against
// them, which is the only honest way to be measured against a standard.
//
// Free is not a pricing decision on this page, it is a condition: a gift that has to be
// bought, counted or unlocked to be heard is not a gift, and the record would rather be
// bare than be that.

const TERMS = [
  {
    label: 'It is free, and it stays free',
    body: 'No price, no account, no subscription, no trial on this page. Nothing here can be paid for, and no one can buy a place on it.',
    check: 'There is no checkout, and no field a payment could ever set. Anyone can hear every track without giving a thing.',
  },
  {
    label: 'Nothing is counted',
    body: 'No plays, no likes, no followers, no ranking, no recommendation. The order is the order the music was given — the newest first, and nothing else.',
    check: 'The record prints when a track was given and nothing about how it was received. Reload, listen twenty times, and nothing changes.',
  },
  {
    label: 'The master is whole',
    body: 'Stored exactly as it was handed over and served whole. Never re-encoded, never trimmed, never replaced to suit a player or a phone.',
    check: 'Compare the file you take with what the artist gave. Its format and its length are read from the file\u2019s own header, never typed in.',
  },
  {
    label: 'The fingerprint is taken before it is sent',
    body: 'An artist\u2019s file is fingerprinted on their own device before it ever leaves them, and that print is kept on the track.',
    check: 'Take the fingerprint of what you downloaded and set it beside the one printed on the track. They either match or something is wrong, in the open.',
  },
  {
    label: 'The name stays on the work',
    body: 'The artist keeps their name and their rights. The record claims neither, and earns nothing from what passes through it.',
    check: 'The same name is on the track, on its card, and on the page it plays from. Nothing is credited to the record.',
  },
  {
    label: 'Nobody is studied here',
    body: 'Listening leaves nothing behind: no account, no email, no profile, no record of what you heard. A line left under a track is given, not harvested.',
    check: 'A listener is never asked who they are. A line comes off only for something unlawful, and the record says so on the track, in the open.',
  },
];

export default function MusicTerms() {
  return (
    <section className="mt-8 border-t-2 border-[#141210] pt-5">
      <div className="flex items-center gap-2 mb-1">
        <h2
          className="font-black uppercase text-[#141210]"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2vw, 30px)', letterSpacing: '-0.025em' }}
        >
          How this record is kept
        </h2>
        <div className="flex-1 h-px bg-[#141210]/20" />
        <span className="text-[10px] font-black font-mono text-[#e2602a]">{TERMS.length}</span>
      </div>
      <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-4">
        A panel is not asked to believe this page. It is asked to check it. Each term below can be tested by anyone
        holding the record and a laptop, without trusting the page, the platform or a name on it.
      </p>

      <div className="space-y-2.5 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3 lg:gap-4 md:space-y-0">
        {TERMS.map((term, i) => (
          <div key={term.label} className="bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#e2602a] p-4 flex flex-col">
            <div className="flex items-start gap-2 mb-1.5">
              <span className="text-[10px] font-black font-mono text-[#e2602a] pt-[2px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[12px] font-black font-mono uppercase text-[#141210] leading-tight">{term.label}</h3>
            </div>
            <p className="text-[12px] font-mono text-[#141210] leading-relaxed">{term.body}</p>
            <p className="mt-auto pt-3 text-[10px] font-mono text-[#5a5246] leading-relaxed">
              <span className="font-black uppercase tracking-wider text-[#1e3a2b]">Check it</span>
              <span className="block mt-0.5">{term.check}</span>
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[10px] font-mono text-[#5a5246] leading-relaxed">
        Nothing on this page quotes another person to borrow their standing. The standard is theirs; the work has to meet
        it by being checkable, not by mentioning them.
      </p>
    </section>
  );
}