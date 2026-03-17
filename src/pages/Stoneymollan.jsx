import React, { useState } from 'react';
import { motion } from 'framer-motion';

const IMAGES = [
  {
    url: "https://media.base44.com/images/public/6889f31e76713b9cd47e043c/6cf600d78_image.jpg",
    caption: "The ancient coffin road — Gill & Bunny walking where thousands walked before"
  },
  {
    url: "https://media.base44.com/images/public/6889f31e76713b9cd47e043c/d2ad7a1a0_image.jpg",
    caption: "Ancient beech — moss-covered, 200-300 years old, a silent witness"
  },
  {
    url: "https://media.base44.com/images/public/6889f31e76713b9cd47e043c/47dc2b93d_image.jpg",
    caption: "Looking up through the cathedral of trees"
  }
];

const StoneymollanLogo = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hill / Muir silhouette */}
    <ellipse cx="40" cy="58" rx="35" ry="12" fill="#1a3a1a" opacity="0.6"/>
    {/* Ancient tree left */}
    <rect x="14" y="28" width="5" height="28" rx="2" fill="#4a7c59"/>
    <ellipse cx="16" cy="26" rx="8" ry="10" fill="#2d5a27"/>
    {/* Ancient tree right */}
    <rect x="61" y="28" width="5" height="28" rx="2" fill="#4a7c59"/>
    <ellipse cx="64" cy="26" rx="8" ry="10" fill="#2d5a27"/>
    {/* Path going into distance */}
    <path d="M28 68 L36 38 L44 38 L52 68 Z" fill="#8B7355" opacity="0.5"/>
    {/* Loch Lomond water shimmer */}
    <ellipse cx="40" cy="70" rx="20" ry="4" fill="#1a4a6e" opacity="0.7"/>
    {/* Heart / soul center */}
    <path d="M40 45 C40 45 35 40 35 37 C35 34.5 37 33 38.5 33 C39.3 33 40 33.8 40 33.8 C40 33.8 40.7 33 41.5 33 C43 33 45 34.5 45 37 C45 40 40 45 40 45Z" fill="#ec4899" opacity="0.9"/>
    {/* Moss dots on trees */}
    <circle cx="13" cy="35" r="2" fill="#22c55e" opacity="0.7"/>
    <circle cx="18" cy="40" r="1.5" fill="#22c55e" opacity="0.6"/>
    <circle cx="63" cy="33" r="2" fill="#22c55e" opacity="0.7"/>
    <circle cx="60" cy="42" r="1.5" fill="#22c55e" opacity="0.6"/>
    {/* Stars / light above */}
    <circle cx="40" cy="10" r="1.5" fill="#ffffff" opacity="0.8"/>
    <circle cx="28" cy="15" r="1" fill="#ffffff" opacity="0.6"/>
    <circle cx="52" cy="13" r="1" fill="#ffffff" opacity="0.6"/>
  </svg>
);

const HistorySection = ({ title, emoji, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="border border-green-500/30 bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-6"
  >
    <h2 className="text-xl font-black text-green-400 mb-4 font-mono">{emoji} {title}</h2>
    <div className="text-gray-200 space-y-3 leading-relaxed">
      {children}
    </div>
  </motion.div>
);

export default function Stoneymollan() {
  const [selectedImage, setSelectedImage] = useState(null);

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
            style={{ fontFamily: 'Georgia, serif', textShadow: '0 0 40px rgba(34,197,94,0.4)' }}
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
            🏴󠁧󠁢󠁳󠁣󠁴󠁿 1000 years of Scottish history beneath your feet
          </motion.p>
        </div>
      </div>

      {/* PHOTOS */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-3 gap-3">
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              onClick={() => setSelectedImage(img)}
              className="cursor-pointer rounded-xl overflow-hidden border border-green-500/20 hover:border-green-500/60 transition-all"
              style={{ aspectRatio: '3/4' }}
            >
              <img src={img.url} alt={img.caption} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
        <p className="text-center text-green-400/60 text-xs mt-3 font-mono italic">
          📸 Photographed March 17th, 2026 — John Muir Way
        </p>
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
          <p className="text-green-500/40 text-xs mt-4 font-mono">
            ♾️ Stoneymollan • UniversalFamily51 • March 2026
          </p>
        </motion.div>
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-2xl w-full">
            <img src={selectedImage.url} alt={selectedImage.caption} className="w-full rounded-xl" />
            <p className="text-center text-green-300 mt-4 text-sm italic">{selectedImage.caption}</p>
            <p className="text-center text-gray-500 text-xs mt-2">Tap to close</p>
          </div>
        </div>
      )}
    </div>
  );
}