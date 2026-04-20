import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'animals',
    emoji: '🐾',
    title: 'Animals',
    color: '#fb923c',
    facts: [
      { q: 'How do dogs actually see the world?', a: 'Dogs see in blue and yellow — not black and white like people think. They also smell about 100,000 times better than us. A dog\'s nose print is unique, like a human fingerprint.' },
      { q: 'Can fish drown?', a: 'Yes. Fish need oxygen dissolved in water. If the water has too little oxygen — from pollution or heat — fish suffocate. They breathe water, but they still need it to have oxygen in it.' },
      { q: 'How long can a crocodile hold its breath?', a: 'Up to 2 hours underwater. Their hearts can slow to just 2–3 beats per minute to conserve oxygen. They\'ve barely changed in 200 million years — they survived whatever killed the dinosaurs.' },
      { q: 'Do elephants really never forget?', a: 'Pretty much true. Elephants have the largest brain of any land animal. They remember individual humans, old friends, and water sources from decades ago. They also mourn their dead.' },
      { q: 'What makes a octopus so weird?', a: 'Three hearts, blue blood, and nine brains — one central brain and one in each arm. Each arm can taste, touch and make decisions on its own. They can also change colour in milliseconds despite being colourblind.' },
      { q: 'How fast is a peregrine falcon?', a: '240 mph in a dive — the fastest animal on Earth. That\'s faster than a Formula 1 car. Their eyes have a protective membrane so they can see perfectly at full speed.' },
    ]
  },
  {
    id: 'plants',
    emoji: '🌱',
    title: 'Plants',
    color: '#34d399',
    facts: [
      { q: 'Do trees actually talk to each other?', a: 'Yes — through underground fungal networks nicknamed the "Wood Wide Web." Trees share nutrients and even send warning signals when insects attack. Older trees actively feed younger trees nearby.' },
      { q: 'How old can a tree get?', a: 'A bristlecone pine in California is over 5,000 years old — alive before the pyramids were built. Underground, a colony of quaking aspen trees in Utah shares one root system estimated at 80,000 years old.' },
      { q: 'Can plants hear?', a: 'Research shows plants respond to vibrations — including the sound of running water and even caterpillars chewing nearby leaves. They produce defence chemicals within minutes of detecting certain sounds.' },
      { q: 'What is the most dangerous plant?', a: 'The manchineel tree — everything about it is toxic. Rain dripping off the leaves burns skin. Eating the fruit causes extreme pain. Standing under it in rain can blister you. Columbus called it "the tree of death."' },
      { q: 'How do seeds know which way is up?', a: 'Tiny starch granules called statoliths sink under gravity inside the seed\'s cells, telling it which direction is down. Roots grow down. Shoots grow up. Every time, automatically, with no brain.' },
    ]
  },
  {
    id: 'universe',
    emoji: '🌌',
    title: 'Universe',
    color: '#818cf8',
    facts: [
      { q: 'How big is space, really?', a: 'The observable universe is 93 billion light years across. One light year is about 9.5 trillion km. The nearest star to our sun is 4.2 light years away — if you drove at motorway speed, it would take 50 million years to get there.' },
      { q: 'What is a black hole actually?', a: 'A region where gravity is so strong that nothing — not even light — can escape. Time runs slower near one. If you fell in, someone watching from far away would see you freeze at the edge forever. You would not notice anything unusual as you crossed it.' },
      { q: 'Are we made of stars?', a: 'Literally yes. Every atom in your body heavier than hydrogen was forged inside a star that exploded before our solar system formed. The iron in your blood, the calcium in your bones — all came from dead stars.' },
      { q: 'Is there sound in space?', a: 'Not in the vacuum — sound needs a medium to travel through. But NASA has recorded pressure waves from black holes moving through gas clouds and converted them to sound. A black hole 250 million light years away hums in B-flat, 57 octaves below middle C.' },
      { q: 'How many planets are there?', a: 'In our solar system, 8. But in our galaxy alone, astronomers estimate there are more planets than stars — likely over 100 billion. The universe has at least 2 trillion galaxies. The number of planets is effectively uncountable.' },
    ]
  },
  {
    id: 'human',
    emoji: '🧠',
    title: 'Human Body',
    color: '#f472b6',
    facts: [
      { q: 'How powerful is the human brain?', a: 'Your brain has about 86 billion neurons, each connected to thousands of others — roughly 100 trillion connections. It processes 11 million bits of information per second but you\'re only conscious of about 50 of them.' },
      { q: 'Do we really only use 10% of our brain?', a: 'Complete myth. Brain scans show we use virtually all of our brain, and most of it is active almost all the time — even when we sleep. The 10% myth has no scientific basis at all.' },
      { q: 'How much bacteria do we carry?', a: 'Your body contains roughly 38 trillion bacteria — about the same number as human cells. Most live in your gut and are essential for digestion, immune function, and even mental health. You are as much microbe as you are human.' },
      { q: 'How fast do nerve signals travel?', a: 'Some nerve signals travel at 120 metres per second — about 270 mph. But pain signals travel much slower, around 1–2 metres per second. That\'s why when you stub your toe there\'s a slight delay before the pain hits.' },
      { q: 'Can the human body generate electricity?', a: 'Yes. Every heartbeat, nerve signal, and muscle movement is electrical. Your brain runs on about 20 watts — enough to power a dim light bulb. The electric eel generates up to 600 volts using the same basic biological mechanism.' },
    ]
  },
  {
    id: 'physics',
    emoji: '⚡',
    title: 'Physics & Forces',
    color: '#facc15',
    facts: [
      { q: 'Is anything truly solid?', a: 'No. Atoms are 99.9999999% empty space. If you removed all empty space from every atom in every human on Earth, all 8 billion of us would fit into a sugar cube. What feels solid is just electromagnetic forces pushing back.' },
      { q: 'How hot is lightning?', a: 'Around 30,000 Kelvin — five times hotter than the surface of the sun. A bolt lasts less than a second but carries up to a billion volts. The thunder you hear is the air around it exploding outward from the heat.' },
      { q: 'Does time actually slow down?', a: 'Yes — Einstein proved it. Time moves slightly faster at the top of a mountain than at sea level because gravity is weaker there. GPS satellites have to constantly correct for this or they\'d give wrong directions within minutes.' },
      { q: 'What is the coldest temperature possible?', a: 'Absolute zero: −273.15°C. At this temperature atoms stop moving entirely. Scientists have gotten within billionths of a degree of it in labs. Nothing in the natural universe is known to reach it exactly.' },
      { q: 'How fast is the Earth actually moving?', a: 'Right now you\'re spinning at up to 1,000 mph (at the equator), orbiting the sun at 67,000 mph, and our solar system is orbiting the galaxy at 514,000 mph. You feel none of it because everything around you moves with you.' },
    ]
  },
  {
    id: 'history',
    emoji: '🏺',
    title: 'History Nobody Tells You',
    color: '#a78bfa',
    facts: [
      { q: 'How long ago did modern humans first appear?', a: 'About 300,000 years ago in Africa. For most of that time, multiple species of humans existed at the same time — Neanderthals, Denisovans, and others. Most people today carry DNA from at least one of these other species.' },
      { q: 'Who invented the number zero?', a: 'Indian mathematician Brahmagupta in 628 AD formalised zero as a number with rules for calculating with it. Before that, most number systems had no concept of zero at all — which made advanced maths basically impossible.' },
      { q: 'How did the ancient Egyptians actually build the pyramids?', a: 'We still don\'t fully know. But evidence points to large organised workforces — not slaves — who were paid, fed, and given medical care. They used copper tools, wooden sledges, water lubrication, and ramps. It took about 20 years.' },
      { q: 'What was daily life like 1,000 years ago?', a: 'Most people worked from sunrise to sunset, ate two meals a day, slept in shifts (waking in the middle of the night for an hour or two was normal), and rarely travelled more than 20 miles from where they were born their whole lives.' },
    ]
  },
];

function FactCard({ fact, accent }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-white/4 hover:bg-white/7 border border-white/8 hover:border-white/15 rounded-2xl px-5 py-4 transition-all"
    >
      <div className="flex items-start gap-3 justify-between">
        <p className="text-white font-bold text-sm leading-snug flex-1">{fact.q}</p>
        {open
          ? <ChevronUp className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
          : <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
        }
      </div>
      {open && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-400 text-sm mt-3 leading-relaxed border-t border-white/8 pt-3"
        >
          {fact.a}
        </motion.p>
      )}
    </button>
  );
}

export default function YoungWarriorsPage() {
  const [activeCategory, setActiveCategory] = useState('animals');
  const category = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#05080f] text-white">
      <div className="max-w-2xl mx-auto px-5 py-12">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">Real World</h1>
          <p className="text-gray-400 text-lg">
            The stuff you were never taught at school.<br />
            <span className="text-gray-600 text-sm">Tap any question to find out.</span>
          </p>
        </motion.div>

        {/* CATEGORY TABS */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all border"
              style={activeCategory === cat.id
                ? { color: cat.color, borderColor: cat.color + '60', background: cat.color + '15' }
                : { color: '#ffffff40', borderColor: '#ffffff10', background: 'transparent' }
              }
            >
              <span>{cat.emoji}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* FACTS */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {category.facts.map((fact, i) => (
            <FactCard key={i} fact={fact} accent={category.color} />
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <p className="text-white/15 text-xs">Learn51 · Free forever · No login needed ♾️</p>
        </div>

      </div>
    </div>
  );
}