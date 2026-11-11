// ── THE YEAR ON THIS HILL, MONTH BY MONTH ──────────────────────────────────────
// The old version said one thing a month about animals and nothing at all about the
// ground, which is half the year on a hill like this. Blueberry in July, mushrooms in
// October, beech mast under the avenue in November — that is what people actually come
// up here for, and it was nowhere on the page.
//
// Two rules kept, both of them the record's own:
//
// ONE: nothing is invented. Every line below is something this hill and the water below
// it genuinely does at that time of year in this parish — red squirrels are about all
// winter (they do not sleep it off), blaeberry ripens July into August, chanterelles and
// ceps come with the first wet weeks of autumn, wood blewit and clouded agaric hold on
// into November, whooper swans come down from Iceland for the winter, ospreys are on the
// loch from about the end of March to September.
//
// TWO: and this is the one Bro pulled me up on, rightly — it says HOW MUCH, not just
// WHAT. "Red squirrels" reads like a wood full of them. It is one squirrel, on a good
// morning, if you are out early and quiet; you might walk the whole hill and see none.
// Same with the ospreys, the frogspawn, the mushrooms and the bluebells: every line here
// is hedged where the hill is actually a lottery, because a guest who comes for a
// guarantee and gets a hillside is a guest who goes home disappointed. The word "if" is
// in these lines on purpose.
//
// THREE: it never says "come for the wildlife". The month is a normal month, not a
// promise and not a brochure, and the block says so out loud underneath. A warm week
// moves everything by a fortnight either way.

export const MONTHS = [
  {
    short: 'Jan',
    name: 'January',
    see: 'Roe deer out in the open at first light — usually a pair, not a herd. Whooper swans on the loch, when they are on this stretch of it.',
    under: 'Bare beech, and the avenue showing its bones. Holly is about the only green left in the wood.',
  },
  {
    short: 'Feb',
    name: 'February',
    see: 'Great spotted woodpeckers drumming — heard far more often than seen. The first noise of the year.',
    under: 'Coltsfoot on the bank, and the first celandine. Frogspawn in the pools by the end of the month, most years.',
  },
  {
    short: 'Mar',
    name: 'March',
    see: 'Frogs down at the pools. Ospreys back over the loch in the last week — one bird, not a flock.',
    under: 'Wood anemone coming up under the beeches. Larch green before anything else.',
  },
  {
    short: 'Apr',
    name: 'April',
    see: 'Ospreys fishing the loch, if you are looking at the right hour. Wood warblers singing from the oaks — heard, rarely seen.',
    under: 'Bluebell buds, and wild garlic carpeting the wet ground. You smell the garlic before you see it.',
  },
  {
    short: 'May',
    name: 'May',
    see: 'Bluebells at their best and the wood warbler at full voice. On a good year, the best month on this hill.',
    under: 'Oak coming into leaf over the bluebells, while the light still gets through.',
  },
  {
    short: 'Jun',
    name: 'June',
    see: 'The longest light. Flycatchers feeding young in the oaks — quick, and easy to miss. A red squirrel now and then.',
    under: 'Foxgloves in the clearings, and cotton grass out on the wet muir.',
  },
  {
    short: 'Jul',
    name: 'July',
    see: 'Young red squirrels out on their own — a few, not a wood full of them. Ospreys overhead, fishing for a family.',
    under: 'Blaeberry ripe on the open hill, the small dark ones. Heather in bud.',
  },
  {
    short: 'Aug',
    name: 'August',
    see: 'Heather in flower, purple the whole way up — that part you can count on. Ospreys fishing hard before they go.',
    under: 'Blaeberry still on, if the birds have left any. Rowan turning. Chanterelles where the moss is thin, in a wet year.',
  },
  {
    short: 'Sep',
    name: 'September',
    see: 'Redstarts heading south. Red squirrels working the mast under the beeches, now and then.',
    under: 'Brambles ripe along the wood edge. Ceps and chanterelles — some years, and never where you left them.',
  },
  {
    short: 'Oct',
    name: 'October',
    see: 'Redwings and fieldfares in on the berries, up from Scandinavia — you hear them before you see them. Squirrels caching.',
    under: 'Mushrooms at their best in a wet autumn: ceps, chanterelles, fly agaric under the birch. Beech mast all over the path.',
  },
  {
    short: 'Nov',
    name: 'November',
    see: 'A red squirrel now and then — one, if you are lucky, not a wood full of them. Woodcock in the wet wood at dusk, if you are quiet.',
    under: 'Beech leaves down, the avenue showing its bones again. Wood blewit and clouded agaric in the litter, in a mild one.',
  },
  {
    short: 'Dec',
    name: 'December',
    see: 'Whooper swans on the loch, if they have come in. Squirrels at the dreys by mid-morning once the frost lifts — brief, and easy to miss.',
    under: 'Holly berries, and moss the only colour left in the wood.',
  },
];

export const CURRENT_MONTH = () => new Date().getMonth();