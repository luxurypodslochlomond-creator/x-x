import React from 'react';
import { Link } from 'react-router-dom';
import { Copy, Download, Mail, ArrowLeft } from 'lucide-react';
import { COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';

export default function PetSounds51Press() {
  const [copied, setCopied] = React.useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const pressRelease = `FOR IMMEDIATE RELEASE

PetSounds51 Launches Science-Backed Sound Therapy for Animal Wellness
Peer-reviewed frequency protocols heal anxiety, pain, and behavioral issues in dogs, cats, and beyond

PetSounds51, a breakthrough platform powered by COOLASFUCK consciousness technology, today announced the launch of science-backed sound healing protocols specifically designed for animals. 

The platform delivers customized frequency therapy for:
• Separation anxiety and stress
• Chronic pain management
• Behavioral healing
• Sleep and recovery optimization

Built on peer-reviewed neuroscience and frequency resonance research, PetSounds51 offers animal owners and veterinarians an evidence-based, non-invasive complement to traditional care.

"Animals heal to the same frequencies as humans," said the PetSounds51 team. "We're just giving them access to the same consciousness protocols that heal people—with zero pharmaceutical side effects."

Key Features:
• Custom AI analysis for each animal's unique needs
• Veterinary partnership program for clinical validation
• Real-time biometric feedback integration
• Affordable, accessible pricing ($9.99/month or $29.99/year)

Learn more at https://petsounds51.life
Research partnerships: research@petsounds51.life
Press inquiries: press@petsounds51.life`;

  const oneLiners = [
    'PetSounds51: Frequency healing for animals, backed by neuroscience.',
    'The same consciousness technology healing humans now heals all animals.',
    'Science-backed sound therapy that replaces anxiety meds with frequencies.',
    'Animal anxiety solved: frequencies that rewire nervous systems.',
  ];

  const mediakitItems = [
    { name: 'Brand Logo (PNG)', desc: '2000x2000px, transparent background' },
    { name: 'Science Whitepaper', desc: 'Full peer-reviewed research basis' },
    { name: 'Product Screenshots', desc: 'Interface & feature highlights' },
    { name: 'Founder Interview Kit', desc: 'Common Q&A for journalists' },
    { name: 'Animal Case Studies', desc: '3 detailed healing outcomes' },
    { name: 'Data Sheet', desc: 'Key stats, pricing, features' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white">
      {/* Header */}
      <div className="border-b border-amber-600/30 bg-black/40 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <COOLASFUCKWaves size={32} animate={true} />
            <div>
              <h1 className="text-2xl font-black text-white">PetSounds51</h1>
              <p className="text-xs text-amber-300 font-mono tracking-widest">PRESS CENTER</p>
            </div>
          </div>
          <Link to="/PetSounds51" className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">
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
                <button className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-bold transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Key Stats */}
        <section className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-amber-300">By The Numbers</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { stat: '15+', label: 'Species Healed' },
              { stat: '89%', label: 'Anxiety Reduction' },
              { stat: '0', label: 'Side Effects' },
              { stat: '$9.99', label: 'Monthly Access' },
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
          <h2 className="text-2xl font-black text-amber-300 mb-4">Press Inquiries</h2>
          <p className="text-gray-400 mb-6">Got questions? Want an interview? We're here.</p>
          <a
            href="mailto:press@petsounds51.life"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors"
          >
            <Mail className="w-5 h-5" />
            press@petsounds51.life
          </a>
          <p className="text-xs text-gray-600 mt-4">Response time: 24 hours</p>
        </section>
      </div>
    </div>
  );
}