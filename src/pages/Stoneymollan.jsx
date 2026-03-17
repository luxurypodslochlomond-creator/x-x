import React, { useState } from 'react';
import { motion } from 'framer-motion';

const IMAGES = [
  {
    url: "https://media.base44.com/images/public/6889f31e76713b9cd47e043c/bbf887cc6_IMG_8405.png",
    caption: "Home — Stoneymollan, standing in the golden muir",
    subtitle: "Golden light across ancient moorland"
  },
  {
    url: "https://media.base44.com/images/public/6889f31e76713b9cd47e043c/b78d8da95_image.jpg",
    caption: "The resting stone",
    subtitle: "Where coffins rested for eight centuries"
  },
  {
    url: "https://media.base44.com/images/public/6889f31e76713b9cd47e043c/bf4016447_image.jpg",
    caption: "Gill and Bunny on the muir",
    subtitle: "Loch Lomond stretching into the distance"
  },
  {
    url: "https://media.base44.com/images/public/6889f31e76713b9cd47e043c/91e4d7d1e_image.jpg",
    caption: "The wild moorland",
    subtitle: "Unchanged landscape, thousand years deep"
  },
  {
    url: "https://media.base44.com/images/public/6889f31e76713b9cd47e043c/040ae5497_image.jpg",
    caption: "Surveying the kingdom",
    subtitle: "Walking the path of ancient bearers"
  },
  {
    url: "https://media.base44.com/images/public/6889f31e76713b9cd47e043c/6cf600d78_image.jpg",
    caption: "The coffin road",
    subtitle: "Beech avenue lined the sacred passage"
  },
  {
    url: "https://media.base44.com/images/public/6889f31e76713b9cd47e043c/d2ad7a1a0_image.jpg",
    caption: "Ancient beech",
    subtitle: "Moss-covered witness to centuries"
  },
  {
    url: "https://media.base44.com/images/public/6889f31e76713b9cd47e043c/7e35c473e_image.jpg",
    caption: "Forest spirit",
    subtitle: "The old trees remember"
  },
  {
    url: "https://media.base44.com/images/public/6889f31e76713b9cd47e043c/47dc2b93d_image.jpg",
    caption: "Cathedral of trees",
    subtitle: "Looking up through living history"
  }
];

const LOGO_URL = "https://media.base44.com/images/public/6889f31e76713b9cd47e043c/5c334744c_Logo-Icon-Dark.png";

const StoneymollanLogo = ({ size = 60 }) => (
  <img
    src={LOGO_URL}
    alt="Stoneymollan Logo"
    width={size}
    height={size}
    style={{ objectFit: 'contain', filter: 'invert(1) sepia(1) saturate(3) hue-rotate(80deg) brightness(0.9)' }}
  />
);

const HistorySection = ({ title, emoji, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="border border-green-500/30 bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-6"
  >
    <h2 className="text-xl font-black text-green-400 mb-4 font-mono">{emoji} {title}</h2>
    <div className="text-gray-200 space-y-3 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
      {children}
    </div>
  </motion.div>
);

export default function Stoneymollan() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleCarouselNav = (direction) => {
    if (direction === 'next') {
      setCarouselIndex((carouselIndex + 1) % IMAGES.length);
    } else {
      setCarouselIndex((carouselIndex - 1 + IMAGES.length) % IMAGES.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050f05] via-[#0a1a0a] to-[#050f05] text-white">

      {/* HERO */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${IMAGES[0].url})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050f05]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <StoneymollanLogo size={100} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-black mb-4 tracking-tight"
            style={{ fontFamily: 'monospace', textShadow: '0 0 40px rgba(34,197,94,0.4)', letterSpacing: '0.05em' }}
          >
            Stoneymollan
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-green-400 font-mono text-lg mb-2"
          >
            Muir • Coffin Road • Loch Lomond
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-400 text-sm font-mono"
          >
            1000 years of Scottish history beneath your feet
          </motion.p>
        </div>
      </div>

      {/* CAROUSEL - MOBILE & DESKTOP */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 mb-16">
        {/* MAIN CAROUSEL */}
        <div className="relative rounded-2xl overflow-hidden border border-green-500/20 mb-8">
          <motion.div
            key={carouselIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
            style={{ aspectRatio: '16/10' }}
          >
            <img 
              src={IMAGES[carouselIndex].url} 
              alt={IMAGES[carouselIndex].caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* CAPTION OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                  {IMAGES[carouselIndex].caption}
                </h3>
                <p className="text-green-300/80 text-sm md:text-base">
                  {IMAGES[carouselIndex].subtitle}
                </p>
              </motion.div>
            </div>

            {/* COUNTER */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-green-500/30">
              <span className="text-green-400 text-xs font-mono">
                {String(carouselIndex + 1).padStart(2, '0')} / {String(IMAGES.length).padStart(2, '0')}
              </span>
            </div>
          </motion.div>

          {/* NAV ARROWS */}
          <button
            onClick={() => handleCarouselNav('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 backdrop-blur-sm w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all border border-green-500/30 hover:border-green-500/60"
          >
            <span className="text-white text-xl">←</span>
          </button>
          <button
            onClick={() => handleCarouselNav('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 backdrop-blur-sm w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all border border-green-500/30 hover:border-green-500/60"
          >
            <span className="text-white text-xl">→</span>
          </button>
        </div>

        {/* THUMBNAIL STRIP */}
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-4 md:pb-2">
          {IMAGES.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setCarouselIndex(i)}
              className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                i === carouselIndex 
                  ? 'border-green-400 ring-2 ring-green-500/50' 
                  : 'border-green-500/20 hover:border-green-500/40'
              }`}
              style={{ width: '80px', height: '80px', minWidth: '80px' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={img.url} 
                alt={img.caption}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* HISTORY */}
      <div className="max-w-3xl mx-auto px-6 pb-16">

        <HistorySection title="The Coffin Road" emoji="⚰️" delay={0.1}>
          <p>Stoneymollan Muir is home to one of Scotland's most poignant ancient routes — a <strong className="text-green-300">coffin road</strong>, also known as a corpse road or lych way.</p>
          <p>For centuries, Highland communities had no local consecrated burial ground. When someone died, the family and neighbours were legally required to carry the coffin along designated paths to the nearest parish church — sometimes <strong className="text-green-300">miles across open moorland</strong>, rain, wind and all.</p>
          <p>Bearers would take turns carrying the weight, resting the coffin on flat <strong className="text-green-300">"resting stones"</strong> along the route. Some of those stones may still be there today, hidden in the grass beside the path.</p>
        </HistorySection>

        <HistorySection title="The Ancient Beech Avenue" emoji="🌳" delay={0.2}>
          <p>The extraordinary avenue of beech trees lining the coffin road are estimated to be <strong className="text-green-300">200-300 years old</strong> — planted deliberately to line the route, their thick trunks now draped in deep green moss.</p>
          <p>These trees have stood through Jacobite risings, Highland Clearances, two World Wars, and every Scottish winter imaginable. Their roots are intertwined with the history of everyone who ever walked this path.</p>
          <p>What makes them remarkable is how they <strong className="text-green-300">frame the path like a cathedral nave</strong> — as if nature itself was honouring the processions that passed beneath them.</p>
        </HistorySection>

        <HistorySection title="The Kingdom of Strathclyde" emoji="👑" delay={0.3}>
          <p>The place name <strong className="text-green-300">Stoneymollan</strong> likely derives from ancient Gaelic — this entire area sits within what was once the <strong className="text-green-300">Kingdom of Strathclyde</strong>, one of the early medieval kingdoms of Scotland, dating to at least the 6th and 7th century.</p>
          <p>The <strong className="text-green-300">Earls of Lennox</strong> — the great medieval lords of this region — controlled these lands for centuries. Their stronghold, Balloch Castle, sits directly below Stoneymollan Muir, and they would have looked up at this very hillside from its walls.</p>
          <p>Loch Lomond was a <strong className="text-green-300">strategic frontier</strong> — the boundary between Highland and Lowland Scotland, between Gaelic and Scots culture, between clan law and crown law.</p>
        </HistorySection>

        <HistorySection title="Robert the Bruce" emoji="⚔️" delay={0.4}>
          <p><strong className="text-green-300">Robert the Bruce</strong> knew this landscape intimately. In the years before Bannockburn (1314), he campaigned extensively around Loch Lomond — hiding, regrouping, fighting back from near-total defeat.</p>
          <p>There is a famous story of Bruce and his men crossing Loch Lomond by finding a single small boat and ferrying his army across <strong className="text-green-300">one man at a time</strong> — reading to his men from a chivalric romance to keep morale up as they waited.</p>
          <p>Paths like the one you walked were the veins of his world. The land you stood on was the land that made Scotland. 🏴󠁧󠁢󠁳󠁣󠁴󠁿</p>
        </HistorySection>

        <HistorySection title="The John Muir Way" emoji="🌿" delay={0.5}>
          <p><strong className="text-green-300">John Muir</strong> — the Scottish-born father of the modern conservation movement and founder of the concept of National Parks — was born in Dunbar in 1838. He emigrated to America and his writings inspired the creation of Yosemite, Sequoia and countless other protected wild places.</p>
          <p>The <strong className="text-green-300">John Muir Way</strong> runs 134 miles coast to coast across Scotland — from Helensburgh on the Clyde to Dunbar on the East Lothian coast — passing right through Stoneymollan Muir above Loch Lomond.</p>
          <p>That ancient coffin road is now a <strong className="text-green-300">living trail of healing</strong> — walked by thousands every year, connecting people back to the wild, ancient Scotland that Muir loved so deeply.</p>
        </HistorySection>

        {/* FOOTER SOUL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 pt-8 border-t border-green-500/20"
        >
          <StoneymollanLogo size={60} />
          <p className="text-green-400 font-mono mt-4 text-sm">
            "The clearest way into the Universe is through a forest wilderness."
          </p>
          <p className="text-gray-500 text-xs mt-2">— John Muir</p>
          <a
            href="https://www.overlochlomond.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-green-400 hover:text-green-300 font-mono text-sm border border-green-500/30 hover:border-green-500/60 px-4 py-2 rounded-lg transition-all"
          >
            🌿 overlochlomond.com
          </a>
          <p className="text-green-500/40 text-xs mt-4 font-mono">
            ♾️ Stoneymollan • UniversalFamily51 • March 2026
          </p>
        </motion.div>
      </div>


    </div>
  );
}