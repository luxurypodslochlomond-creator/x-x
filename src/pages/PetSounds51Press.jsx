import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Copy, Mail, ArrowLeft } from 'lucide-react';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';

export default function PetSounds51Press() {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const pressRelease = `FOR IMMEDIATE RELEASE

PetSounds51: Building the Future of Evidence-Based Animal Wellness
Species-specific frequency protocols designed to evolve with emerging neuroscience research

PetSounds51 is a research-driven platform focused on applying frequency science to real animal health outcomes. Rather than static tools, these protocols are designed to improve as our understanding of animal neurology advances and we gather clinical feedback.

Current Work:
• Species-specific frequency tuning (dogs, cats, horses)
• Complementary support for anxiety, stress, and pain management
• Evidence-based methodology grounded in peer-reviewed research
• Active research partnerships with veterinary teams

The foundation: peer-reviewed neuroscience showing that specific audio frequencies influence animal nervous systems. We're building frequency maps for each species based on their unique biology—not repurposed human protocols.

"We're not claiming this is done. This work evolves," the team explains. "What we're doing now is better than what exists. What we'll be doing in two years will be better than now. That's the whole point."

Active Research Directions:
• Veterinary partnership studies on anxiety reduction
• Long-term outcome tracking for pain management
• Species-specific frequency refinement (ongoing)
• Open methodology—no proprietary black boxes

Access:
• £29.99/year for full protocol library
• Open to research collaboration and clinical partnerships
• Non-invasive, evidence-based, zero side effects

More: https://uf51.love/PetSounds51
Research: family@uf51.love`;

  const oneLiners = [
    'PetSounds51: Evidence-based frequency protocols designed to improve as we learn.',
    'Species-specific audio therapy grounded in peer-reviewed neuroscience.',
    'Research-driven approach to animal anxiety, stress, and pain support.',
    'Honest science. Better today than yesterday, better tomorrow than today.',
    'Veterinary research partnerships building the future of animal wellness.',
  ];

  const downloadMediaKit = async (itemName) => {
    if (itemName === 'Brand Logo') {
      // Generate SVG logo for download
      const svg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <rect width="512" height="512" fill="#000"/>
        <text x="256" y="280" font-size="120" font-weight="bold" fill="#d4a017" text-anchor="middle" font-family="Arial, sans-serif">PetSounds51</text>
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

  const mediakitItems = [
    { name: 'Brand Logo', desc: 'High-res logo for press use' },
    { name: 'Science Whitepaper', desc: 'Full peer-reviewed research basis' },
    { name: 'Data Sheet', desc: 'Key stats, pricing, species protocols' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white">
      {/* Header */}
      <div className="border-b border-amber-600/30 bg-black/40 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
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

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Press Release */}
        <section className="mb-16">
          <h2 className="text-4xl font-black mb-8 text-amber-300">Press Release</h2>
          <div className="bg-black/60 border border-amber-600/40 rounded-xl p-8 font-mono text-sm leading-relaxed space-y-4">
            {pressRelease.split('\n').map((line, i) => (
              <div key={i}>{line || <br />}</div>
            ))}
          </div>
          <button
            onClick={() => copyToClipboard(pressRelease, 'press-release')}
            className="mt-4 flex items-center gap-2 px-6 py-3 bg-amber-600/20 border border-amber-600/50 hover:border-amber-500 rounded-lg text-amber-300 hover:text-amber-200 transition-all"
          >
            <Copy className="w-4 h-4" />
            <span>{copied === 'press-release' ? 'Copied!' : 'Copy Full Text'}</span>
          </button>
        </section>

        {/* Quick One-Liners */}
        <section className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-amber-300">Quick Descriptions</h2>
          <p className="text-gray-400 mb-6 text-sm">Use these in headlines, social posts, or pitches:</p>
          <div className="space-y-3">
            {oneLiners.map((line, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-black/40 border border-amber-600/20 rounded-lg hover:border-amber-600/40 transition-colors group">
                <p className="flex-1 text-white">{line}</p>
                <button
                  onClick={() => copyToClipboard(line, `oneliner-${i}`)}
                  className="flex-shrink-0 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copied === `oneliner-${i}` ? '✓' : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Media Kit */}
        <section className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-amber-300">Media Kit</h2>
          <p className="text-gray-400 mb-6 text-sm">Essential resources for coverage:</p>
          <div className="grid md:grid-cols-2 gap-4">
            {mediakitItems.map((item, i) => (
              <div key={i} className="p-6 bg-black/40 border border-amber-600/20 rounded-lg hover:border-amber-600/40 transition-colors">
                <h3 className="font-bold text-white mb-2">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{item.desc}</p>
                <button onClick={() => downloadMediaKit(item.name)} className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-bold transition-colors">
                  <Mail className="w-4 h-4" />
                  {item.name === 'Brand Logo' ? 'Download' : item.name === 'Science Whitepaper' ? 'View' : 'Request'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Key Stats */}
        <section className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-amber-300">By The Numbers</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { stat: '3', label: 'Species Protocols (Dogs, Cats, Horses)' },
              { stat: '£29.99', label: 'Annual Subscription' },
              { stat: '0', label: 'Side Effects' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gradient-to-br from-amber-600/10 to-black border border-amber-600/30 rounded-lg text-center">
                <div className="text-3xl font-black text-amber-300 mb-2">{item.stat}</div>
                <div className="text-sm text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-black/60 border border-amber-600/40 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-black text-amber-300 mb-4">Questions & Partnerships</h2>
          <p className="text-gray-400 mb-6">Research teams, journalists, animal care professionals—reach out.</p>
          <a
            href="mailto:family@uf51.love"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors"
          >
            <Mail className="w-5 h-5" />
            family@uf51.love
          </a>
          <p className="text-xs text-gray-600 mt-4">Let's talk about the science.</p>
        </section>
      </div>
    </div>
  );
}