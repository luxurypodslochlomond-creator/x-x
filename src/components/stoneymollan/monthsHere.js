// ── THE YEAR ON THIS HILL, MONTH BY MONTH ──────────────────────────────────────
// The old version said one thing a month about animals and nothing at all about the
// ground, which is half the year on a hill like this. Blueberry in July, mushrooms in
// October, beech mast under the avenue in November — that is what people actually
// come up here for, and it was nowhere on the page.
//
// Two rules kept, both of them the record's own:
//
// ONE: nothing is invented. Every line below is something this hill and the water
// below it genuinely does at that time of year in this parish — red squirrels are
// about all winter (they do not sleep it off), blaeberry ripens July into August,
// chanterelles and ceps come with the first wet weeks of autumn, wood blewit and
// clouded agaric hold on into November, whooper swans come down from Iceland for the
// winter, ospreys are on the loch from about the end of March to September.
//
// TWO: it never says "come for the wildlife". The month is a normal month, not a
// promise and not a brochure, and the block says so out loud underneath. A warm week
// moves everything by a fortnight either way.

export const MONTHS = [
  {
    short: 'Jan',
    name: 'January',
    see: 'Roe deer out in the open field at first light. Whooper swans on the loch, down from Iceland.',
    under: 'Bare beech — the avenue shows its bones. Holly is the only green left in the wood.',
  },
  {
    short: 'Feb',
    name: 'February',
    see: 'Great spotted woodpeckers drumming. The first noise of the year, and they mean it.',
    under: 'Coltsfoot on the bank, and the first celandine. Frogspawn in the pools by the end of the month.',
  },
  {
    short: 'Mar',
    name: 'March',
    see: 'Frogs down at the pools. Ospreys back over the loch in the last week, from Africa.',
    under: 'Wood anemone coming up under the beeches. Larch turning green before anything else.',
  },
  {
    short: 'Apr',
    name: 'April',
    see: 'Ospreys fishing the loch. Wood warblers in, singing from the oaks.',
    under: 'Bluebell buds, and wild garlic carpeting the wet ground. You smell the garlic before you see it.',
  },
  {
    short: 'May',
    name: 'May',
    see: 'Bluebells at their best and the wood warbler at full voice. The best month on this hill.',
    under: 'Oak coming into leaf over the bluebells, while the light still gets through.',
  },
  {
    short: 'Jun',
    name: 'June',
    see: 'The longest light. Spotted flycatchers feeding young in the oaks. Red squirrels about at four in the morning.',
    under: 'Foxgloves in the clearings, and cotton grass out on the wet muir.',
  },
  {
    short: 'Jul',
    name: 'July',
    see: 'Young red squirrels out on their own. Ospreys overhead, catching for a family.',
    under: 'Blaeberry ripe on the open hill — the small dark ones, better than anything in a shop. Heather in bud.',
  },
  {
    short: 'Aug',
    name: 'August',
    see: 'Heather in flower, purple the whole way up. Ospreys fishing hard before they leave.',
    under: 'Blaeberry still on. Rowan turning. Chanterelles where the moss is thin.',
  },
  {
    short: 'Sep',
    name: 'September',
    see: 'Redstarts heading south. Red squirrels working the mast under the beeches.',
    under: 'Brambles ripe along the wood edge. Ceps and chanterelles — and the first copper in the avenue.',
  },
  {
    short: 'Oct',
    name: 'October',
    see: 'Redwings and fieldfares in on the berries, up from Scandinavia. Squirrels caching for the winter.',
    under: 'Mushrooms at their best: ceps, chanterelles, fly agaric under the birch. Beech mast all over the path.',
  },
  {
    short: 'Nov',
    name: 'November',
    see: 'Red squirrels busy all morning — they don\u2019t sleep the winter off. Woodcock in the wet wood at dusk.',
    under: 'Beech leaves down, the avenue showing its bones again. Wood blewit and clouded agaric in the leaf litter.',
  },
  {
    short: 'Dec',
    name: 'December',
    see: 'Whooper swans back on the loch. Squirrels at the dreys by mid-morning, once the frost lifts.',
    under: 'Holly berries, and moss as the only colour left in the wood.',
  },
];

export const CURRENT_MONTH = () => new Date().getMonth();