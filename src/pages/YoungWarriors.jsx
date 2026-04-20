import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'animals',
    emoji: '🐾',
    title: 'Animals',
    color: '#fb923c',
    facts: [
      { q: 'How do dogs actually see?', a: 'Dogs see in blue and yellow — not black and white like people think. They also smell about 100,000 times better than us. A dog\'s nose print is unique, exactly like a human fingerprint.' },
      { q: 'Can fish drown?', a: 'Yes. Fish need oxygen dissolved in water. If the water has too little oxygen — from pollution or heat — fish suffocate. They breathe water, but they still need it to contain oxygen.' },
      { q: 'How long can a crocodile hold its breath?', a: 'Up to 2 hours. Their hearts slow to just 2–3 beats per minute. They\'ve barely changed in 200 million years — they survived whatever wiped out the dinosaurs.' },
      { q: 'Do elephants really never forget?', a: 'Pretty much true. Elephants have the largest brain of any land animal. They remember individual humans and water sources from decades ago. They also mourn their dead.' },
      { q: 'What makes an octopus so strange?', a: 'Three hearts. Blue blood. Nine brains — one central and one in each arm. Each arm can taste and make decisions independently. They change colour in milliseconds but are colourblind.' },
      { q: 'How fast is a peregrine falcon?', a: '240 mph in a dive — the fastest animal on Earth. Faster than a Formula 1 car. A special membrane lets them see perfectly at full speed.' },
    ]
  },
  {
    id: 'plants',
    emoji: '🌱',
    title: 'Plants',
    color: '#34d399',
    facts: [
      { q: 'Do trees talk to each other?', a: 'Yes — through underground fungal networks called the "Wood Wide Web." Trees share nutrients and send attack warnings. Older trees actively feed younger ones nearby.' },
      { q: 'How old can a tree get?', a: 'A bristlecone pine in California is over 5,000 years old — alive before the pyramids. An aspen colony in Utah shares one root system estimated at 80,000 years old.' },
      { q: 'Can plants hear?', a: 'Research shows plants respond to vibrations — including running water and caterpillars chewing nearby leaves. They release defence chemicals within minutes of detecting certain sounds.' },
      { q: 'What is the most dangerous plant?', a: 'The manchineel tree. Everything about it is toxic. Rain dripping off its leaves burns skin. Eating the fruit causes extreme pain. Columbus called it "the tree of death."' },
      { q: 'How do seeds know which way is up?', a: 'Tiny starch granules called statoliths sink under gravity inside the seed\'s cells, signalling which way is down. Roots go down. Shoots go up. Every time. No brain required.' },
    ]
  },
  {
    id: 'universe',
    emoji: '🌌',
    title: 'Universe',
    color: '#818cf8',
    facts: [
      { q: 'How big is space, really?', a: 'The observable universe is 93 billion light years across. One light year is 9.5 trillion km. The nearest star to our sun — if you drove at motorway speed — would take 50 million years to reach.' },
      { q: 'What is a black hole?', a: 'A region where gravity is so extreme nothing — not even light — can escape. Time runs slower near one. To an outside observer, you\'d appear to freeze at the edge forever.' },
      { q: 'Are we made of stars?', a: 'Literally yes. Every atom in your body heavier than hydrogen was forged inside a star that exploded before our solar system existed. The iron in your blood came from dead stars.' },
      { q: 'Is there sound in space?', a: 'Not in vacuum — sound needs something to travel through. But NASA recorded pressure waves from a black hole and converted them to audio. It hums in B-flat, 57 octaves below middle C.' },
      { q: 'How many planets exist?', a: 'In our solar system, 8. In our galaxy alone, more planets than stars — over 100 billion. The universe has at least 2 trillion galaxies. The number of planets is effectively uncountable.' },
    ]
  },
  {
    id: 'human',
    emoji: '🧠',
    title: 'Human Body',
    color: '#f472b6',
    facts: [
      { q: 'How powerful is the brain?', a: 'About 86 billion neurons, each connected to thousands of others — 100 trillion connections total. It processes 11 million bits of information per second. You\'re conscious of about 50 of them.' },
      { q: 'Do we only use 10% of our brain?', a: 'Complete myth. Brain scans show we use virtually all of it, and most of it is active almost all the time — including while we sleep. No scientific basis for this at all.' },
      { q: 'How much bacteria do we carry?', a: 'Your body contains roughly 38 trillion bacteria — about equal to your number of human cells. Most live in your gut and are essential for digestion, immune function, and mental health.' },
      { q: 'How fast are nerve signals?', a: 'Some travel at 120 metres per second — about 270 mph. Pain signals travel much slower, 1–2 m/s. That\'s why when you stub your toe there\'s a slight delay before the pain hits.' },
      { q: 'Can your body make electricity?', a: 'Yes. Every heartbeat, nerve signal, and muscle movement is electrical. Your brain runs on about 20 watts — enough to power a dim light bulb. The electric eel uses the same basic mechanism.' },
    ]
  },
  {
    id: 'physics',
    emoji: '⚡',
    title: 'Physics',
    color: '#facc15',
    facts: [
      { q: 'Is anything truly solid?', a: 'No. Atoms are 99.9999999% empty space. If you removed the empty space from every atom in every human on Earth, all 8 billion of us would fit inside a sugar cube. Solid is just forces pushing back.' },
      { q: 'How hot is lightning?', a: 'Around 30,000 Kelvin — five times hotter than the surface of the sun. A bolt lasts less than a second but carries up to a billion volts. Thunder is the surrounding air exploding from the heat.' },
      { q: 'Does time actually slow down?', a: 'Yes. Einstein proved it. Time moves faster at the top of a mountain than at sea level because gravity is weaker there. GPS satellites constantly correct for this or navigation would drift within minutes.' },
      { q: 'What is the coldest possible temperature?', a: 'Absolute zero: −273.15°C. At this point atoms stop moving entirely. Scientists have gotten within billionths of a degree of it in labs. Nothing in nature is known to reach it exactly.' },
      { q: 'How fast is the Earth moving right now?', a: 'You\'re spinning at up to 1,000 mph, orbiting the sun at 67,000 mph, and the solar system orbits the galaxy at 514,000 mph. You feel nothing because everything around you moves with you.' },
    ]
  },
  {
    id: 'history',
    emoji: '🏺',
    title: 'Hidden History',
    color: '#a78bfa',
    facts: [
      { q: 'How long have modern humans existed?', a: 'About 300,000 years — in Africa. For most of that time, multiple human species existed simultaneously: Neanderthals, Denisovans and others. Most people today carry DNA from at least one of these.' },
      { q: 'Who invented the number zero?', a: 'Indian mathematician Brahmagupta in 628 AD formalised zero with rules for calculating. Before that, most number systems had no concept of it — which made advanced maths basically impossible.' },
      { q: 'How were the pyramids built?', a: 'We still don\'t fully know. But evidence points to paid, organised workers — not slaves — who received food and medical care. They used copper tools, wooden sledges, water lubrication, and ramps.' },
      { q: 'What was life like 1,000 years ago?', a: 'Most people worked sunrise to sunset, ate two meals a day, woke in the middle of the night as a normal habit, and never travelled more than 20 miles from where they were born.' },
    ]
  },
];

const directions = { enter: 1, exit: -1 };

export default function YoungWarriorsPage() {
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [direction, setDirection] = useState(1);

  const category = CATEGORIES[activeCatIndex];
  const fact = category.facts[factIndex];
  const total = category.facts.length;

  const goTo = (newIndex, dir) => {
    setDirection(dir);
    setFactIndex(newIndex);
    setRevealed(false);
  };

  const prev = () => {
    if (factIndex > 0) goTo(factIndex - 1, -1);
  };

  const next = () => {
    if (factIndex < total - 1) goTo(factIndex + 1, 1);
  };

  const switchCategory = (idx) => {
    setActiveCatIndex(idx);
    setFactIndex(0);
    setRevealed(false);
  };

  return (
    <div className="min-h-screen bg-[#05080f] text-white flex flex-col">
      <div className="max-w-xl mx-auto w-full px-5 py-10 flex flex-col flex-1">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white tracking-tight">Real World</h1>
          <p className="text-white/40 text-sm mt-1">The stuff nobody taught you. Tap to reveal.</p>
        </div>

        {/* CATEGORY PILLS */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => switchCategory(i)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border"
              style={activeCatIndex === i
                ? { color: cat.color, borderColor: cat.color + '80', background: cat.color + '18' }
                : { color: '#ffffff30', borderColor: '#ffffff12', background: 'transparent' }
              }
            >
              <span>{cat.emoji}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* FACT CARD */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${activeCatIndex}-${factIndex}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* QUESTION */}
              <div
                className="rounded-3xl p-7 mb-4 cursor-pointer select-none"
                style={{ background: `linear-gradient(135deg, ${category.color}18, ${category.color}08)`, border: `1.5px solid ${category.color}30` }}
                onClick={() => setRevealed(!revealed)}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{category.emoji}</span>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: category.color }}>
                    {category.title}
                  </span>
                  <span className="text-white/20 text-xs ml-auto">{factIndex + 1} / {total}</span>
                </div>

                <p className="text-white text-2xl font-black leading-snug mb-6">{fact.q}</p>

                {/* REVEAL BUTTON / ANSWER */}
                <AnimatePresence mode="wait">
                  {!revealed ? (
                    <motion.div
                      key="btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <button
                        className="w-full py-3 rounded-2xl font-black text-sm tracking-wide transition-all"
                        style={{ background: category.color + '25', color: category.color, border: `1px solid ${category.color}40` }}
                      >
                        Tap to find out →
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t pt-5"
                      style={{ borderColor: category.color + '25' }}
                    >
                      <p className="text-white/80 text-base leading-relaxed">{fact.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* PROGRESS DOTS */}
              <div className="flex justify-center gap-1.5 mb-6">
                {category.facts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > factIndex ? 1 : -1)}
                    className="rounded-full transition-all"
                    style={{
                      width: i === factIndex ? '20px' : '6px',
                      height: '6px',
                      background: i === factIndex ? category.color : category.color + '30',
                    }}
                  />
                ))}
              </div>

            </motion.div>
          </AnimatePresence>

          {/* PREV / NEXT */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              disabled={factIndex === 0}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all border"
              style={factIndex === 0
                ? { color: '#ffffff15', borderColor: '#ffffff08', background: 'transparent' }
                : { color: '#ffffff80', borderColor: '#ffffff20', background: '#ffffff08' }
              }
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={next}
              disabled={factIndex === total - 1}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all border"
              style={factIndex === total - 1
                ? { color: '#ffffff15', borderColor: '#ffffff08', background: 'transparent' }
                : { color: category.color, borderColor: category.color + '50', background: category.color + '12' }
              }
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/10 text-xs">Learn51 · Free forever · No login ♾️</p>
        </div>

      </div>
    </div>
  );
}