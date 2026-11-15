// Seven strips. The five that belong to one of Janine's smallest gestures come first, and
// each carries the gesture's own words so a chip on the record's homepage can open its
// cartoon directly. Two more follow that are simply about looking at the world differently.
// Simple on purpose: the bird asks, the stone answers, and no grown-up is needed to enjoy it.
export const comicStories = [
  {
    id: 'cardigan',
    title: 'Elbow room',
    question: 'It’s got a hole in it!',
    reply: 'So we give it a patch. Not a bin.',
    image: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/2cc825041_generated_image.png',
    alt: 'A small blackbird sews a bright red patch onto the elbow of a cream wool cardigan. A mossy stone holds the spool of thread for it.',
    theme: 'Mending is quicker than shopping.',
    gesture: 'Repairing a sweater / cardigan',
  },
  {
    id: 'repair',
    title: 'Reinventing the wheel',
    question: 'I bought you a NEW wheel!',
    reply: 'Lovely. I fixed the old one.',
    image: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/595c30aa7_generated_image.png',
    alt: 'In a woodland workshop, the blackbird proudly brings a replacement wheel far too big for a little red cart. The mossy stone has already repaired its original wheel.',
    theme: 'A second life for the things we have.',
    gesture: 'Buying less',
  },
  {
    id: 'walking',
    title: 'The long way round',
    question: 'Can’t we just take the car?',
    reply: 'We could. But look at all this.',
    image: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/eb91c48a0_generated_image.png',
    alt: 'A blackbird in a little rucksack walks a hedge-lined lane with a mossy stone in tiny boots beside it. A red car sits asleep behind them with a cat curled on its roof.',
    theme: 'The walk is the good bit.',
    gesture: 'Walking',
  },
  {
    id: 'transport',
    title: 'The number 51',
    question: 'Are we nearly there?',
    reply: 'Nearly. And nobody had to drive.',
    image: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/395e10b8b_generated_image.png',
    alt: 'A blackbird and a mossy stone ride the front seat of a red country bus past green hills, with a cat, a hedgehog and a bicycle aboard behind them.',
    theme: 'One engine, and everybody aboard.',
    gesture: 'Using mass transportation',
  },
  {
    id: 'food',
    title: 'The last spoonful',
    question: 'There’s only a bit left.',
    reply: 'So that’s tomorrow’s lunch.',
    image: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/b7661b752_generated_image.png',
    alt: 'A blackbird spoons the last of a pot of soup into a little jar with its lid ready, while a mossy stone stacks the leftover bread crusts into a neat tower.',
    theme: 'Nothing thrown away is a meal kept.',
    gesture: 'Not wasting food',
  },
  {
    id: 'shade',
    title: 'A cool idea',
    question: 'Is this the air-con?',
    reply: 'Yes. Mind the roots.',
    image: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/a46d7bec3_generated_image.png',
    alt: 'A blackbird hauls an enormous homemade fan across a hot meadow. A small mossy stone is already relaxing in the cool shade of a smiling oak tree.',
    theme: 'Shade, not another gadget.',
  },
  {
    id: 'wind',
    title: 'A storm in a teacup',
    question: 'Can we turn the wind DOWN?',
    reply: 'After my tea. It’s boiling the kettle.',
    image: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/1116525b1_generated_image.png',
    alt: 'On a windy hill, the blackbird struggles with an inside-out umbrella while the mossy stone calmly drinks tea. A small wind turbine powers the kettle beside them.',
    theme: 'A different way to look at the wind.',
  },
];

// The gesture's own words, exactly as the homepage prints them, pointing at its strip.
// One place, so a chip and a cartoon can never drift apart.
export const gestureStrips = {
  'Repairing a sweater / cardigan': 'cardigan',
  'Buying less': 'repair',
  'Walking': 'walking',
  'Using mass transportation': 'transport',
  'Not wasting food': 'food',
};

export const stripHref = (gesture) => (gestureStrips[gesture] ? `/ClimateCartoons?strip=${gestureStrips[gesture]}` : '/ClimateCartoons');