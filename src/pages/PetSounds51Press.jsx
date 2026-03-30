import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Copy, Mail, ArrowLeft, TrendingUp, Zap, Globe, Heart, Shield, Brain } from 'lucide-react';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';

export default function PetSounds51Press() {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const pressRelease = `FOR IMMEDIATE RELEASE

PetSounds51: The AI Platform Bringing Drug-Free Sound Therapy to Animal Healthcare

A browser-based psychoacoustic platform is quietly solving one of pet care's most overlooked problems — anxiety, pain, and stress in companion animals — without a single pill.

THE PROBLEM
Over 70% of dogs exhibit anxiety-related behaviours. Veterinary prescriptions for animal anxiety have grown 300%+ in a decade. Yet medication comes with side effects, vet costs, and compliance challenges that leave most pet owners searching for alternatives. The market is enormous, underserved, and ready.

THE SOLUTION
PetSounds51 delivers real-time, species-specific therapeutic audio protocols built on peer-reviewed neuroscience. No app download. No hardware. No prescription. Just a browser and £29.99/year.

The engine is built on psychoacoustics — the science of how sound affects the nervous system. Each protocol is tuned to the specific hearing biology of dogs, cats, and horses. Isochronic tones, binaural beats, and bio-mimetic audio triggers (heartbeat rhythms, white noise spectra) are generated in real-time by the Web Audio API — not pre-recorded files. This means every session is adaptive, not static.

WHY THIS IS DIFFERENT
• Built for animals, not repurposed from human wellness apps
• Browser-native: works on any device, no installation required
• Zero side effects — safe to combine with existing veterinary treatment
• Research-backed: protocols grounded in published veterinary neuroscience
• Affordable: £29.99/year vs £30-£100+ per vet consultation

THE TECHNOLOGY
PetSounds51 runs entirely in the browser using the Web Audio API. The frequency synthesis engine generates layered harmonic chords, species-tuned EQ filtering, isochronic tone modulation, and dense noise masking in real time. There is no streaming, no server dependency during sessions — it works offline once loaded. The architecture is lean, scalable, and built to evolve as neuroscience research advances.

THE MARKET
Global pet care market: $259 billion (2025), growing at 6.1% CAGR.
Pet anxiety treatment segment: $2+ billion and expanding.
Target audience: 67% of UK households own a pet. Average pet owner spends £1,000+/year.
PetSounds51 price point: £29.99/year — impulse-buy territory for a pet owner who has spent £50 on a vet visit.

THE VISION
A subscription layer for every vet surgery, pet insurer, and animal shelter in the world. B2B licensing, white-label protocols for veterinary brands, and a research data layer built from millions of real-world therapy sessions. The infrastructure exists. The science exists. The market exists.

Access: https://uf51.love/PetSounds51
Research & Partnerships: family@uf51.love`;

  const headlines = [
    '"The Spotify of animal therapy" — browser-based, science-backed, £29.99/year.',
    'Non-pharmaceutical anxiety relief for pets: the $2bn market no one is building for.',
    'PetSounds51: real-time AI audio therapy for dogs, cats, and horses — no app, no vet, no side effects.',
    'Species-specific psychoacoustics, built on peer-reviewed neuroscience, runs in any browser.',
    'Solving pet anxiety at scale: affordable, evidence-based, zero pharmaceutical dependency.',
  ];

  const stats = [
    { stat: '$259B', label: 'Global pet care market (2025)', icon: TrendingUp },
    { stat: '70%+', label: 'Dogs show anxiety-related behaviours', icon: Heart },
    { stat: '3', label: 'Species protocols: dogs, cats, horses', icon: Brain },
    { stat: '£29.99', label: 'Full annual access — no hardware needed', icon: Zap },
    { stat: '0', label: 'Side effects. Safe alongside vet treatment', icon: Shield },
    { stat: '100%', label: 'Browser-native — works offline once loaded', icon: Globe },
  ];

  const angles = [
    {
      headline: 'The Tech Story',
      body: 'A real-time audio synthesis engine running entirely in the browser — no streaming, no server dependency during sessions — delivering species-tuned therapeutic frequencies. The Web Audio API doing something genuinely useful.',
    },
    {
      headline: 'The Market Story',
      body: '$259B pet care market, 70% of dogs anxious, vet costs rising, pharmaceutical options limited. A subscription product at impulse-buy price point hitting an underserved segment with no dominant player.',
    },
    {
      headline: 'The Human Story',
      body: 'Built by someone who knows what it means to watch an animal suffer from anxiety and feel helpless. Not a Silicon Valley wellness app. A working platform, built from care, grounded in real science.',
    },
    {
      headline: 'The Business Story',
      body: 'Lean SaaS infrastructure, B2C subscription live, B2B licensing pathway clear. Vet surgeries, pet insurers, animal shelters — every one of them needs this. The platform is built. The partnerships are next.',
    },
  ];

  const downloadMediaKit = async (itemName) => {
    if (itemName === 'Brand Logo') {
      const svg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <rect width="512" height="512" fill="#000"/>
        <text x="256" y="280" font-size="72" font-weight="bold" fill="#d4a017" text-anchor="middle" font-family="Arial, sans-serif">PetSounds51</text>
        <circle cx="256" cy="100" r="60" fill="none" stroke="#d4a017" stroke-width="3"/>
        <path d="M 220 100 Q 256 60, 292 100" stroke="#d4a017" stroke-width="3" fill="none"/>
      </svg>`;
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'PetSounds51-Logo.svg';
      a.click();
      URL.revokeObjectURL(url);
    } else if (itemName === 'Science Whitepaper') {
      window.location.href = createPageUrl('PetSounds51Whitepaper');
    } else if (itemName === 'Data Sheet') {
      window.location.href = 'mailto:family@uf51.love?subject=PetSounds51%20Data%20Sheet%20Request&body=Hi%20PetSounds51%20team,%0A%0AI%27d%20like%20to%20request%20the%20PetSounds51%20Data%20Sheet.%0A%0AThank%20you!';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white">
      {/* Header */}
      <div className="border-b border-amber-600/30 bg-black/40 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PetSounds51Icon8Bit size={40} animate={false} />
            <div>
              <h1 className="text-2xl font-black text-white">PetSounds51</h1>
              <p className="text-xs text-amber-300 font-mono tracking-widest">PRESS CENTER</p>
            </div>
          </div>
          <Link to={createPageUrl('PetSounds51')} className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold">BACK</span>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Lede */}
        <div className="mb-16 text-center">
          <div className="inline-block bg-amber-600/20 border border-amber-600/50 rounded-full px-4 py-1 text-amber-300 text-xs font-mono tracking-widest mb-6">PRESS & MEDIA</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            The platform solving pet anxiety<br />
            <span style={{ color: '#d4a017' }}>without a single prescription</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Real-time psychoacoustic therapy for dogs, cats, and horses. Browser-native. Evidence-based. £29.99/year.
            In a $259B market with no dominant player in non-pharmaceutical wellness.
          </p>
        </div>

        {/* Story Angles */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-2 text-amber-300">Story Angles</h2>
          <p className="text-gray-500 text-sm mb-6">Four ways in. Take whichever fits your angle.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {angles.map((angle, i) => (
              <div key={i} className="p-6 bg-black/50 border border-amber-600/20 rounded-xl hover:border-amber-600/40 transition-all">
                <h3 className="font-black text-amber-300 mb-3 text-sm font-mono tracking-wider">{angle.headline.toUpperCase()}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{angle.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Stats */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-6 text-amber-300">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-6 bg-gradient-to-br from-amber-600/10 to-black border border-amber-600/30 rounded-xl text-center">
                  <Icon className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                  <div className="text-2xl font-black mb-1" style={{ color: '#d4a017' }}>{item.stat}</div>
                  <div className="text-xs text-gray-400 leading-tight">{item.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Ready-to-use headlines */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-2 text-amber-300">Ready-to-Use Headlines</h2>
          <p className="text-gray-500 text-sm mb-6">Copy any of these for social posts, articles, or pitches:</p>
          <div className="space-y-3">
            {headlines.map((line, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-black/40 border border-amber-600/20 rounded-lg hover:border-amber-600/40 transition-colors group">
                <p className="flex-1 text-white text-sm leading-relaxed">{line}</p>
                <button
                  onClick={() => copyToClipboard(line, `headline-${i}`)}
                  className="flex-shrink-0 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copied === `headline-${i}` ? '✓' : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Full Press Release */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-2 text-amber-300">Full Press Release</h2>
          <p className="text-gray-500 text-sm mb-6">Ready to publish or adapt:</p>
          <div className="bg-black/60 border border-amber-600/30 rounded-xl p-8 font-mono text-xs leading-relaxed text-gray-300 max-h-96 overflow-y-auto">
            {pressRelease.split('\n').map((line, i) => (
              <div key={i} className={line.startsWith('FOR IMMEDIATE') || (line === line.toUpperCase() && line.trim().length > 3) ? 'font-bold text-amber-200 mt-4 mb-1' : ''}>{line || <br />}</div>
            ))}
          </div>
          <button
            onClick={() => copyToClipboard(pressRelease, 'press-release')}
            className="mt-4 flex items-center gap-2 px-6 py-3 bg-amber-600/20 border border-amber-600/50 hover:border-amber-500 rounded-lg text-amber-300 hover:text-amber-200 transition-all font-bold"
          >
            <Copy className="w-4 h-4" />
            <span>{copied === 'press-release' ? '✓ Copied!' : 'Copy Full Text'}</span>
          </button>
        </section>

        {/* Media Kit */}
        <section className="mb-16">
          <h2 className="text-2xl font-black mb-2 text-amber-300">Media Kit</h2>
          <p className="text-gray-500 text-sm mb-6">Assets for editorial use:</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Brand Logo', desc: 'High-res SVG for press use' },
              { name: 'Science Whitepaper', desc: 'Full peer-reviewed research basis' },
              { name: 'Data Sheet', desc: 'Key stats, pricing, protocol detail' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-black/40 border border-amber-600/20 rounded-lg hover:border-amber-600/40 transition-colors">
                <h3 className="font-bold text-white mb-2">{item.name}</h3>
                <p className="text-xs text-gray-400 mb-4">{item.desc}</p>
                <button onClick={() => downloadMediaKit(item.name)} className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-bold transition-colors">
                  <Mail className="w-4 h-4" />
                  {item.name === 'Brand Logo' ? 'Download SVG' : item.name === 'Science Whitepaper' ? 'Read Now' : 'Request'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-br from-amber-600/10 to-black border border-amber-600/40 rounded-xl p-10 text-center">
          <h2 className="text-2xl font-black text-amber-300 mb-3">Press & Partnership Enquiries</h2>
          <p className="text-gray-400 mb-2 max-w-lg mx-auto text-sm leading-relaxed">
            Journalists, researchers, veterinary teams, investors — we're open to all conversations.
            Response within 24 hours.
          </p>
          <p className="text-gray-500 text-xs mb-8">We can arrange demos, interviews, and provide additional data on request.</p>
          <a
            href="mailto:family@uf51.love?subject=PetSounds51%20Press%20Enquiry"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-lg transition-colors text-white"
            style={{ background: '#d4a017' }}
          >
            <Mail className="w-5 h-5" />
            family@uf51.love
          </a>
          <div className="mt-6 pt-6 border-t border-amber-600/20">
            <Link to={createPageUrl('PetSounds51Whitepaper')} className="text-amber-400 hover:text-amber-300 text-sm font-bold transition-colors">
              Read the Science Whitepaper →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}