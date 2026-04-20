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
      { q: 'How does a bee colony make decisions?', a: 'When a hive needs a new home, scout bees fly off to find options then come back and dance. The dance shows direction and distance. Other bees watch, visit the spots themselves, then dance too. The swarm moves when enough bees agree — a vote made of dancing.' },
      { q: 'How many bees are in a hive?', a: 'Up to 80,000 — and almost all of them are female. The queen can lay up to 2,000 eggs a day. A single bee in its whole lifetime produces just 1/12 of a teaspoon of honey. It takes about 60,000 bees to fill one jar.' },
      { q: 'How does an octopus think?', a: 'An octopus has 9 brains — one main brain and one in each of its 8 arms. Each arm can act on its own, even if cut off. They can open jars, recognise individual human faces, and solve puzzles. They live only 1–2 years, yet are among the smartest animals on Earth.' },
      { q: 'How do dolphins sleep without drowning?', a: 'Only half their brain sleeps at a time. The other half stays awake to breathe and watch for danger. You can see this — a resting dolphin swims slowly in circles, one eye open, one eye closed.' },
      { q: 'How strong is an ant?', a: 'An ant can carry 50 times its own body weight — the equivalent of a human carrying a car. A leafcutter ant colony of 8 million ants cuts more vegetation than a cow grazes. They grow fungus underground using the leaves as compost — farming predates humans by 50 million years.' },
      { q: 'What do elephants actually remember?', a: 'Elephants remember individual humans — including people who were kind or cruel to them — decades later. They navigate back to water sources they\'ve visited once, years before. They gather around dying family members and return to the bones of dead relatives long after.' },
      { q: 'How do whales communicate?', a: 'A blue whale\'s call is louder than a jet engine — up to 188 decibels — and can travel thousands of miles through the ocean. Humpback whales sing songs that evolve over time, spreading across oceans like music trends. Every whale in an area gradually adopts the newest version.' },
      { q: 'Can fish drown?', a: 'Yes. Fish need oxygen dissolved in water. If the water has too little oxygen — from pollution, algae blooms, or heat — fish suffocate. They breathe water, but the water still needs to contain oxygen.' },
      { q: 'How fast is a peregrine falcon?', a: '240 mph in a dive — the fastest animal on Earth, faster than a Formula 1 car. A special membrane covers their eyes so they can see perfectly at full speed. Their chest muscles take up a third of their body weight.' },
      { q: 'What makes a crocodile so ancient?', a: 'Crocodiles have barely changed in 200 million years. They survived whatever wiped out the dinosaurs. Their hearts can slow to 2–3 beats per minute underwater, letting them hold their breath for up to 2 hours. A crocodile can go months without eating.' },
      { q: 'How do dogs see the world?', a: 'Dogs see in blue and yellow — not black and white like most people think. But their real superpower is smell: 100,000 times more sensitive than ours. A dog can smell a teaspoon of sugar dissolved in a million gallons of water. Their nose print is unique, like a human fingerprint.' },
      { q: 'What is the strongest animal on Earth?', a: 'The dung beetle can pull 1,141 times its own body weight — by far the strongest animal relative to size. It can also navigate by the Milky Way, making it the only known insect to use stars for direction.' },
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
    id: 'tech',
    emoji: '💡',
    title: 'Technology',
    color: '#22d3ee',
    facts: [
      { q: 'How does the internet actually work?', a: 'Most of the internet travels through cables on the ocean floor — 1.3 million km of fibre-optic cable connecting every continent. When you send a message to someone in Japan, it likely travels down a wire under the Atlantic or Pacific Ocean and back in under a second.' },
      { q: 'What is inside a computer chip?', a: 'A modern computer chip contains up to 100 billion transistors — tiny switches that are on or off. They\'re so small that 1,000 of them side by side are thinner than a human hair. Every calculation your phone makes is billions of these switches flipping, millions of times per second.' },
      { q: 'How does GPS know where you are?', a: 'Your phone listens to signals from at least 4 satellites orbiting 20,000 km above Earth. By measuring how long each signal takes to arrive — to within a billionth of a second — it can calculate your position to within a few metres. Without Einstein\'s theory of relativity, GPS would drift by 11 km every day.' },
      { q: 'What is the internet made of?', a: 'About 5.5 billion people use the internet. All the world\'s websites and data are stored on physical computers called servers. The electricity used to run all the world\'s data centres is roughly equal to the entire electricity consumption of the UK.' },
      { q: 'How does a camera freeze a moment?', a: 'A phone camera takes in light through a lens and hits millions of tiny sensors called pixels — up to 200 million on modern phones. Each pixel measures how much red, green and blue light it received. Your phone then combines all those measurements into one image in milliseconds.' },
      { q: 'How does Wi-Fi travel through walls?', a: 'Wi-Fi is radio waves — the same type of waves as light, just a different frequency. They pass through most solid materials (walls, floors, people) but slow down. Metal reflects them. Your router and phone are constantly sending and receiving billions of these waves per second, invisibly, in every direction.' },
      { q: 'What is AI actually doing?', a: 'AI learns patterns from enormous amounts of examples — millions of photos, sentences, or sounds. It adjusts billions of tiny numbers called weights until it gets good at recognising patterns. It doesn\'t understand or think — it finds the most statistically likely answer based on what it\'s seen before.' },
      { q: 'How did we land on the moon with 1960s technology?', a: 'The Apollo computer had 4KB of memory — less than a modern digital greeting card. The engineers wrote the software by hand and tested every line. The mission succeeded not because of powerful computers but because of extraordinary precision, teamwork, and thousands of hours of human problem-solving.' },
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