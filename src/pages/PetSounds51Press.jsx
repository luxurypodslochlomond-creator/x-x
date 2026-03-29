import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

PetSounds51: AI-Powered Sound Therapy for Animals
Adaptive frequency protocols continuously improve through peer-reviewed research and real-world feedback

PetSounds51 is an evolving platform that applies AI-driven frequency science to animal wellness. Rather than static protocols, the system continuously learns from neuroscience research and user outcomes to refine therapeutic audio.

Current Focus:
• Species-specific frequency adaptation (dogs, cats, horses)
• Anxiety and stress response support
• Pain management complementary care
• Sleep and recovery optimization

The platform is built on peer-reviewed neuroscience showing how tailored audio can influence animal nervous systems. Each species receives uniquely tuned frequencies—not generic sounds.

"This isn't a finished product. These protocols evolve as we learn more," said the PetSounds51 team. "We're combining published research with adaptive learning to make better tools for animals and the people who care for them."

Current Science Foundation:
• Peer-reviewed research on bioacoustic stress reduction
• Species-specific frequency mapping
• Partnership pathways with veterinary research teams
• Transparent methodology (no black box)

Pricing & Access:
• £29.99/year for full protocol library
• Open to research collaboration
• Non-invasive, no side effects

Learn more: https://petsounds51.life
Research partnerships & inquiries: family@uf51.love`;

  const oneLiners = [
    'PetSounds51: AI-powered frequency protocols that evolve through research.',
    'Species-tuned audio for animal anxiety and pain—continuously learning.',
    'Adaptive sound therapy built on peer-reviewed neuroscience.',
    'PetSounds51: Where animal care meets evolving frequency science.',
    'Not finished, always learning. Frequencies that adapt with the research.',
  ];

  const downloadMediaKit = async (itemName) => {
    // Trigger downloads for press materials
    const downloads = {
      'Brand Logo': 'https://uf51.love/assets/petsounds51-logo.png',
      'Science Whitepaper': '/PetSounds51Whitepaper',
      'Data Sheet': 'mailto:family@uf51.love?subject=PetSounds51%20Data%20Sheet%20Request',
    };
    const url = downloads[itemName];
    if (url) {
      if (url.startsWith('mailto')) {
        window.location.href = url;
      } else if (url.startsWith('/')) {
        window.open(url, '_blank');
      } else {
        const a = document.createElement('a');
        a.href = url;
        a.download = itemName;
        a.click();
      }
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