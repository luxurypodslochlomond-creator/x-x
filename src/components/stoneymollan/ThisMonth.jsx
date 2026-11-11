import React from 'react';

/* ── WHAT YOU MIGHT SEE THIS MONTH ─────────────────────────────────────────────
   Not a promise, and it never says "come for the wildlife" — one honest line a
   month, the way a keeper of a place would say it at the gate. A month that has
   nothing worth saying is given nothing flattering to say instead.

   Everything here is something this hill and the water below it genuinely does at
   that time of year: ospreys over the loch April to October, redwings and
   fieldfares in on the berries in late autumn, whooper swans on the loch in
   winter, bluebells and wood warbler in the oakwoods in May. */
const BY_MONTH = [
  'Roe deer in the long grass at the top, and the loch at its quietest.',
  'Woodpeckers drumming. The first celandines out on a sunny bank.',
  'Frogs down to the pools, and the wood starting to smell of growth.',
  'Ospreys back over the loch. Wood anemone coming up under the beeches.',
  'Bluebells, and the wood warbler singing. The best month on this hill.',
  'The longest light. Flycatchers feeding young in the oaks.',
  'Young red squirrels about. Heather starting out on the open hill.',
  'Rowan berries. Ospreys fishing hard, before they leave.',
  'Redstarts heading south. The first copper coming into the beeches.',
  'Redwings and fieldfares in on the berries. Squirrels caching for the winter.',
  'Short days, first frosts, woodcock in the wet wood. Copper still on the avenue.',
  'Whooper swans on the loch. Squirrels at the dreys by mid-morning.',
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function ThisMonth() {
  const month = new Date().getMonth();
  return (
    <p className="mt-4 border-t border-record-ink/20 pt-3 text-center font-mono text-[9.5px] uppercase leading-[1.8] tracking-[0.14em] text-record-muted">
      <span className="text-record-signal">{MONTHS[month]}</span>
      <span className="px-1.5 text-record-ink/25">/</span>
      what you might see
      <span className="block normal-case tracking-[0.02em] text-record-ink/75" style={{ fontFamily: 'var(--font-record-reading)', fontSize: '12.5px', letterSpacing: '0.01em' }}>
        {BY_MONTH[month]}
      </span>
    </p>
  );
}