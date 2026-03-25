import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Globe, TrendingUp, Users, DollarSign, Star, Zap, ChevronDown, ChevronRight, Copy, Check, ArrowLeft } from 'lucide-react';

// DATA
const MARKET_DATA = {
  global: {
    label: '🌍 Global Pet Care',
    total: '$157.7 Billion',
    year: '2025',
    growth: '6.7% per year',
    color: '#06b6d4',
    breakdown: [
      { label: 'Digital Pet Anxiety Market', value: '$1.08B', note: 'Our direct sector' },
      { label: 'Pet Tech Market', value: '$7.6B', note: 'Apps, wearables, devices' },
      { label: 'Vet Sound/Music specifically', value: '$247M', note: 'Closest competitor sector' },
    ]
  },
  uk: {
    label: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 UK Pet Care',
    total: '£12 Billion',
    year: '2024',
    growth: '8%+ per year',
    color: '#10b981',
    breakdown: [
      { label: 'Total UK pet spending', value: '£12B', note: 'Up £4B since 2021' },
      { label: 'UK pet care e-commerce', value: '$9B', note: 'Growing fast post-COVID' },
      { label: 'UK pet anxiety products', value: '£200M+', note: 'Adaptil, Feliway, Zylkene etc' },
    ]
  },
  usa: {
    label: '🇺🇸 USA Pet Care',
    total: '$147 Billion',
    year: '2024',
    growth: '7% per year',
    color: '#f59e0b',
    breakdown: [
      { label: 'Pet anxiety / behaviour', value: '$3.2B', note: 'Fastest growing segment' },
      { label: 'Pet tech & apps', value: '$4.1B', note: 'Includes software subscriptions' },
      { label: 'Vet clinical audio', value: '$150M+', note: 'Hospital + home use' },
    ]
  }
};

const INFLUENCERS = [
  {
    tier: '🐕 MEGA (8M–10M followers)',
    color: '#f59e0b',
    accounts: [
      { name: 'Cat Lovers Club', handle: '@catloversclub', platform: 'Instagram', followers: '8M', type: 'Cat content', why: 'Perfect for cat anxiety protocol targeting' },
      { name: 'The Dogist', handle: '@thedogist', platform: 'Instagram', followers: '7.6M', type: 'Dog stories/welfare', why: 'Dog welfare audience = separation anxiety buyers' },
      { name: "Simon's Cat", handle: '@simonscatofficial', platform: 'Instagram/YouTube', followers: '6M+', type: 'Cat animation/comedy', why: 'Massive cat owner audience, very engaged' },
    ]
  },
  {
    tier: '🌟 MEGA (3M–5M followers)',
    color: '#06b6d4',
    accounts: [
      { name: 'Nala Cat', handle: '@nala_cat', platform: 'Instagram', followers: '4.4M', type: 'Cat lifestyle', why: 'Shelter rescue background = welfare focused audience' },
      { name: 'Tucker Budzyn', handle: '@tuckerbudzyn', platform: 'Instagram/YouTube', followers: '4.4M', type: 'Golden Retriever family', why: 'Family dog content = high conversion for anxiety products' },
      { name: 'Juniper & Friends', handle: '@juniperfoxx', platform: 'Instagram', followers: '3.6M', type: 'Wildlife sanctuary', why: 'Animal welfare focused = values aligned' },
      { name: 'Doug the Pug', handle: '@itsdougthepug', platform: 'Instagram/YouTube', followers: '3.5M', type: 'Pop culture dog', why: '2x Peoples Choice winner — massive reach' },
    ]
  },
  {
    tier: '💎 MACRO (1M–2.5M followers)',
    color: '#a855f7',
    accounts: [
      { name: 'Henry & Baloo', handle: '@henrythecoloradodog', platform: 'Instagram', followers: '2.3M', type: 'Adventure dog', why: 'Outdoor/active dog owners — working animal protocols' },
      { name: 'Hosico Cat', handle: '@hosico_cat', platform: 'Instagram/YouTube', followers: '1.8M', type: 'Fluffy cat content', why: 'European audience — good for UK/EU push' },
      { name: 'Loki the Wolfdog', handle: '@loki', platform: 'Instagram', followers: '1.8M', type: 'Adventure wolf-dog', why: 'Anxious breed owners — prime audience' },
      { name: 'Suki Cat', handle: '@sukiicat', platform: 'Instagram', followers: '1.7M', type: 'Adventure cat', why: 'Cat owners who care deeply about wellbeing' },
    ]
  },
  {
    tier: '🎯 SMART TARGETS — Vet & Animal Welfare Focus',
    color: '#10b981',
    accounts: [
      { name: 'Dr. Evan Antin', handle: '@dr.evanantin', platform: 'Instagram', followers: '700K+', type: 'Celebrity Vet', why: '⭐ PRIORITY — Vet endorsement = instant credibility' },
      { name: 'The Vets', handle: 'Various UK vet accounts', platform: 'Instagram/TikTok', followers: '100K-500K', type: 'UK Veterinary', why: 'UK vet influencers = direct to target audience' },
      { name: 'PDSA / RSPCA UK', handle: '@pdsa_uk / @rspca_official', platform: 'Instagram', followers: '200K-500K', type: 'Animal welfare orgs', why: 'Charitable alignment + massive trust factor' },
      { name: 'Victoria Stilwell', handle: '@victoria.stilwell', platform: 'Instagram', followers: '300K+', type: 'Celebrity dog trainer', why: 'IT\'S ME OR THE DOG star — huge dog anxiety authority' },
    ]
  }
];

const WHY_PS51 = [
  { icon: '🧬', title: 'AI-Generated, Not Pre-Recorded', desc: 'Every competitor sells static audio. PetSounds51 generates frequencies dynamically — a completely different technology category.' },
  { icon: '🐕🐈🐴', title: 'Species-Specific EQ', desc: 'Different EQ filter chains for dogs, cats and horses — tuned to their actual biological hearing ranges (65kHz dogs, 79kHz cats, 33kHz horses).' },
  { icon: '📱', title: 'Software-Only = 95% Margins', desc: 'No manufacturing. No hardware. No shipping. Scale to 10 million users with zero extra cost. Competitors sell physical speakers.' },
  { icon: '💷', title: 'Price Point', desc: '$29.99/year = $2.50/month. One Adaptil plug-in costs £25 and lasts 4 weeks. We\'re dramatically cheaper with broader protocols.' },
  { icon: '🔬', title: 'Research-Backed Protocols', desc: 'Queen\'s University Belfast, MIT (40Hz gamma), Frontiers in Veterinary Science — every protocol cites peer-reviewed science.' },
];

const COMMISSION_TIERS = [
  { followers: '10K–100K (Micro)', rate: '20%', monthly: '$100–$500/month potential', note: 'Best ROI — high engagement, trusted voices' },
  { followers: '100K–1M (Macro)', rate: '15%', monthly: '$500–$2,000/month potential', note: 'Good reach + conversion combo' },
  { followers: '1M+ (Mega)', rate: '10%', monthly: '$2,000–$10,000+/month potential', note: 'Volume play — negotiate flat fee + % hybrid' },
];

// COMPONENTS
const Section = ({ title, color, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-4">
      <button onClick={() => setOpen(!open)} className="w-full text-left">
        <div className="flex items-center justify-between px-4 py-3 border-2 font-black font-mono text-sm tracking-wider"
          style={{ borderColor: color, color, background: `${color}10` }}>
          <span>{title}</span>
          {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </div>
      </button>
      {open && <div className="border border-white/10 border-t-0 p-4">{children}</div>}
    </div>
  );
};

const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all"
      style={{ borderColor: '#06b6d4', color: copied ? '#10b981' : '#06b6d4', background: copied ? '#10b98120' : '#06b6d410' }}>
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied!' : label}
    </button>
  );
};

export default function PetSounds51PartnerBrief() {
  const [activeMarket, setActiveMarket] = useState('global');
  const market = MARKET_DATA[activeMarket];

  const pitchText = `Hi [Name],

I'm working with PetSounds51 — an AI-powered sound therapy platform for animals. Science-backed, species-specific frequencies for dog/cat/horse anxiety, pain and recovery.

It's the only software in this space that generates frequencies dynamically (vs static pre-recorded audio). £2.50/month subscription. The digital pet anxiety market is $1.08 billion and growing.

I'd love to explore a partnership. We offer [X%] commission on every subscriber you refer, tracked by your unique link.

Happy to send a full brief. Would you be open to a quick chat?

Best,
[Your name]`;

  return (
    <div className="min-h-screen bg-[#0a0514] text-white pb-20">
      {/* HEADER */}
      <div className="border-b border-amber-600/30 bg-black/40 px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/PetSounds51" className="flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-4 text-sm font-bold">
            <ArrowLeft className="w-4 h-4" />
            Back to PetSounds51
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🐾</span>
            <div>
              <h1 className="text-3xl font-black" style={{ color: '#d4a017' }}>PetSounds51</h1>
              <p className="text-amber-400/70 font-mono text-sm tracking-wider">PARTNER & INFLUENCER BRIEF</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm max-w-xl">
            Everything a partner or influencer needs to understand the market, the product, and the opportunity. 
            Built for Michael — and anyone else who wants a piece of this. 🏴󠁧󠁢󠁳󠁣󠁴󠁿
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-6 space-y-6">

        {/* MARKET SIZE */}
        <div>
          <h2 className="text-lg font-black font-mono text-amber-500 mb-3 tracking-wider">📊 MARKET SIZE</h2>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {Object.entries(MARKET_DATA).map(([key, m]) => (
              <button key={key} onClick={() => setActiveMarket(key)}
                className="py-3 px-2 rounded-xl font-black text-xs border-2 transition-all"
                style={{
                  borderColor: activeMarket === key ? m.color : '#ffffff20',
                  background: activeMarket === key ? `${m.color}20` : 'transparent',
                  color: activeMarket === key ? m.color : '#ffffff60'
                }}>
                {m.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border-2 p-5" style={{ borderColor: market.color + '50', background: `${market.color}08` }}>
            <div className="text-center mb-5">
              <p className="text-5xl font-black mb-1" style={{ color: market.color }}>{market.total}</p>
              <p className="text-gray-400 text-sm">{market.year} · Growing {market.growth}</p>
            </div>
            <div className="space-y-2">
              {market.breakdown.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div>
                    <p className="font-bold text-sm text-white">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.note}</p>
                  </div>
                  <p className="font-black text-lg" style={{ color: market.color }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WHY PS51 IS DIFFERENT */}
        <Section title="🧬 WHY PETSOUNDS51 IS DIFFERENT (The Pitch)" color="#06b6d4" defaultOpen={true}>
          <div className="space-y-3">
            {WHY_PS51.map((item, i) => (
              <div key={i} className="flex gap-3 p-3 bg-white/5 rounded-xl">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-black text-sm text-white mb-0.5">{item.title}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* TOP INFLUENCERS */}
        <Section title="🌟 TOP INFLUENCERS TO TARGET" color="#a855f7" defaultOpen={true}>
          <div className="space-y-5">
            {INFLUENCERS.map((tier, ti) => (
              <div key={ti}>
                <p className="font-black text-sm mb-2 font-mono" style={{ color: tier.color }}>{tier.tier}</p>
                <div className="space-y-2">
                  {tier.accounts.map((acc, ai) => (
                    <div key={ai} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <p className="font-black text-sm text-white">{acc.name}</p>
                          <p className="text-xs font-mono" style={{ color: tier.color }}>{acc.handle} · {acc.platform}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-black text-sm" style={{ color: tier.color }}>{acc.followers}</p>
                          <p className="text-xs text-gray-500">{acc.type}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">💡 {acc.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* COMMISSION STRUCTURE */}
        <Section title="💰 SUGGESTED COMMISSION STRUCTURE" color="#10b981">
          <div className="space-y-3 mb-4">
            {COMMISSION_TIERS.map((tier, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-green-500/20">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-black text-sm text-white">{tier.followers}</p>
                  <p className="font-black text-xl text-green-400">{tier.rate}</p>
                </div>
                <p className="text-xs text-green-300 mb-1">{tier.monthly}</p>
                <p className="text-xs text-gray-500">{tier.note}</p>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <p className="text-xs text-amber-300 font-bold">💡 STRATEGY NOTE</p>
            <p className="text-xs text-amber-200/70 mt-1">Start with micro-influencers (10K-100K) in the vet/animal welfare space. They convert better than mega accounts because their audiences trust them deeply. One vet influencer with 50K followers could outperform a celebrity dog account with 4M.</p>
          </div>
        </Section>

        {/* OUTREACH TEMPLATE */}
        <Section title="📧 OUTREACH TEMPLATE (Copy & Paste)" color="#f59e0b">
          <div className="relative">
            <pre className="text-xs text-gray-300 bg-black/40 p-4 rounded-xl whitespace-pre-wrap leading-relaxed font-mono border border-white/10">
              {pitchText}
            </pre>
            <div className="mt-3">
              <CopyButton text={pitchText} label="Copy outreach template" />
            </div>
          </div>
        </Section>

        {/* KEY STATS CARD */}
        <div className="p-5 rounded-2xl border-2 border-amber-600/40 bg-amber-600/5">
          <p className="font-black text-amber-500 font-mono text-sm mb-4 tracking-wider">⚡ KEY NUMBERS FOR MICHAEL</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Global pet anxiety market', value: '$1.08B' },
              { label: 'UK pet care market', value: '£12B' },
              { label: 'Annual subscription price', value: '$29.99' },
              { label: 'Monthly equivalent', value: '$2.50' },
              { label: 'Software margin', value: '~95%' },
              { label: 'Competitor hardware margin', value: '~40%' },
              { label: 'Market growth rate', value: '7%/yr' },
              { label: 'Species covered', value: '3 (dog/cat/horse)' },
            ].map((stat, i) => (
              <div key={i} className="bg-black/40 p-3 rounded-xl">
                <p className="text-xs text-gray-500 mb-0.5">{stat.label}</p>
                <p className="font-black text-amber-400">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="text-center py-6">
          <p className="text-gray-500 text-sm mb-4">Ready to get started?</p>
          <Link to="/PetSounds51"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black"
            style={{ background: '#d4a017', color: '#000' }}>
            <Heart className="w-5 h-5" />
            Try PetSounds51 Free
          </Link>
          <p className="text-xs text-gray-600 mt-3">petsounds51.love · Part of Universal Frequency 51</p>
        </div>
      </div>
    </div>
  );
}