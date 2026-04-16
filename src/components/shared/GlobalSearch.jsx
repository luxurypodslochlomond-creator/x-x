import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { createPageUrl } from '@/utils';

const ALL_PAGES = [
  // PRODUCTS
  { title: "SORTED", url: createPageUrl("Family51"), description: "Decode scary letters · subscription", section: "Products" },
  { title: "PetSounds51", url: createPageUrl("PetSounds51"), description: "Heal animals · subscription", section: "Products" },
  { title: "CB51", url: createPageUrl("CB51"), description: "Manage your artists · subscription", section: "Products" },
  { title: "BuzzStop", url: createPageUrl("BuzzStop"), description: "Cancel tinnitus · subscription", section: "Products" },
  { title: "TRACKT", url: createPageUrl("Trackt"), description: "AI RFID asset management", section: "Products" },
  { title: "Shed51", url: createPageUrl("Shed51"), description: "Connection frequencies for two", section: "Products" },
  { title: "earth51.love", url: createPageUrl("Earth51"), description: "AI litter scanner for kids", section: "Products" },
  { title: "Prof51", url: createPageUrl("Prof51"), description: "AI co-manager for students", section: "Products" },
  // FREE TOOLS
  { title: "Frequency Chamber", url: createPageUrl("FrequencyChamber"), description: "Free sound therapy frequencies", section: "Free Tools" },
  { title: "Chakra51", url: createPageUrl("Chakra51"), description: "Target pain — back, neck, joints", section: "Free Tools" },
  { title: "Age Reversal Protocol", url: createPageUrl("AgeReversal"), description: "Turn back the clock", section: "Free Tools" },
  { title: "Wrist Healing Protocol", url: createPageUrl("WristHealingProtocol"), description: "Bone & musician recovery", section: "Free Tools" },
  { title: "Universal51", url: createPageUrl("Universal51"), description: "Hear invisible frequencies", section: "Free Tools" },
  { title: "Radio51", url: createPageUrl("Radio"), description: "Lossless music library", section: "Free Tools" },
  { title: "Stoneymollan", url: createPageUrl("Stoneymollan"), description: "Ancient coffin road · Loch Lomond", section: "Free Tools" },
  // LEARN
  { title: "Welcome", url: createPageUrl("Welcome"), description: "Start here", section: "Learn" },
  { title: "Funder Brief", url: createPageUrl("FunderBrief"), description: "One-pager for funders", section: "Learn" },
  { title: "For Businesses", url: createPageUrl("CorporateBuyer"), description: "Corporate / ESG", section: "Learn" },
  { title: "For Artists", url: createPageUrl("ForMusicians"), description: "CB51 artist management", section: "Learn" },
  { title: "ST51 Whitepaper", url: createPageUrl("ST51"), description: "Acoustic levitation · open-source", section: "Learn" },
  { title: "How You Earn", url: createPageUrl("HowYouEarn"), description: "Money from your actions", section: "Learn" },
  { title: "Resonance Lab", url: createPageUrl("ResonanceLab"), description: "Prove connection is real", section: "Learn" },
  { title: "PetSounds51 Science", url: createPageUrl("PetSounds51Whitepaper"), description: "Peer-reviewed research", section: "Learn" },
  { title: "PetSounds51 Press", url: createPageUrl("PetSounds51Press"), description: "For journalists", section: "Learn" },
  // ARCHIVE
  { title: "Type1 AI51 Protocol", url: createPageUrl("Type1AI51"), description: "T1D guidance + frequencies", section: "Archive" },
  { title: "Kidney Stone Protocol", url: createPageUrl("KidneyStoneProtocol"), description: "Frequency stone dissolution", section: "Archive" },
  { title: "AI51 Architecture", url: createPageUrl("AI51Architecture"), description: "Better than data centers", section: "Archive" },
  { title: "Zero Trust Architecture", url: createPageUrl("AI51PrivacyArchitecture"), description: "Mathematically private", section: "Archive" },
  { title: "FreqLift51 Whitepaper", url: createPageUrl("FreqLift51Whitepaper"), description: "Acoustic levitation", section: "Archive" },
  { title: "Consciousness Whitepaper", url: createPageUrl("ConsciousnessWhitepaper"), description: "Philosophy & physics", section: "Archive" },
  { title: "The Physics", url: createPageUrl("ThePhysics"), description: "Scientific foundation", section: "Archive" },
  { title: "Mesh Tech Whitepaper", url: createPageUrl("MeshTechWhitepaper"), description: "Beyond Bitchat", section: "Archive" },
  { title: "AI51 Network", url: createPageUrl("AI51Network"), description: "Consciousness nodes", section: "Archive" },
  { title: "Healing Dashboard", url: createPageUrl("HealingDashboard"), description: "Your progress", section: "Archive" },
  { title: "Cleanup Feed", url: createPageUrl("CleanupFeed"), description: "Submit cleanups", section: "Archive" },
  { title: "Missions", url: createPageUrl("Missions"), description: "Impact actions", section: "Archive" },
  { title: "Open Source Declaration", url: createPageUrl("OpenSourceDeclaration"), description: "Free forever", section: "Archive" },
  { title: "Technical Whitepaper", url: createPageUrl("Whitepaper"), description: "Deep dive", section: "Archive" },
  { title: "Zero Point Energy", url: createPageUrl("ZeroPointEnergy"), description: "Infinite energy?", section: "Archive" },
  { title: "Terms", url: createPageUrl("Terms"), description: "Terms of service", section: "Trust" },
  { title: "Privacy", url: createPageUrl("PrivacyPolicy"), description: "Privacy policy", section: "Trust" },
];

function fuzzyMatch(text, query) {
  if (!query) return true;
  const t = text.toLowerCase();
  const q = query.toLowerCase();
  if (t.includes(q)) return true;
  // simple fuzzy: all chars of query appear in order
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

const SECTION_COLORS = {
  Products: 'text-cyan-400',
  'Free Tools': 'text-green-400',
  Learn: 'text-purple-400',
  Archive: 'text-gray-400',
  Trust: 'text-gray-500',
};

export default function GlobalSearch({ onClose }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  const results = query.trim()
    ? ALL_PAGES.filter(p => fuzzyMatch(p.title, query) || fuzzyMatch(p.description, query))
    : [];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, results.length - 1));
      if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0));
      if (e.key === 'Enter' && results[selected]) {
        window.location.href = results[selected].url;
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [results, selected, onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4" onClick={onClose}>
      <div
        className="w-full max-w-xl bg-[#0a0f1a] border border-cyan-500/40 rounded-xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ boxShadow: '0 0 40px rgba(6,182,212,0.15)' }}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search everything…"
            className="flex-1 bg-transparent text-white placeholder-gray-500 text-base outline-none"
          />
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="max-h-[60vh] overflow-y-auto">
            {results.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">Nothing found for "{query}"</div>
            ) : (
              results.map((page, i) => (
                <Link
                  key={page.url}
                  to={page.url}
                  onClick={onClose}
                  className={`flex items-center justify-between px-4 py-3 transition-colors ${
                    i === selected ? 'bg-cyan-500/10' : 'hover:bg-white/5'
                  }`}
                >
                  <div>
                    <span className="text-white text-sm font-bold">{page.title}</span>
                    <p className="text-gray-400 text-xs mt-0.5">{page.description}</p>
                  </div>
                  <span className={`text-xs font-mono font-bold ${SECTION_COLORS[page.section] || 'text-gray-500'}`}>
                    {page.section}
                  </span>
                </Link>
              ))
            )}
          </div>
        )}

        {/* Hint when empty */}
        {!query.trim() && (
          <div className="px-4 py-6 text-center text-gray-600 text-xs font-mono">
            TYPE TO SEARCH ALL PAGES · ESC TO CLOSE
          </div>
        )}
      </div>
    </div>
  );
}