import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, ExternalLink, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Globe, Database, Zap, ArrowDown, Heart } from 'lucide-react';

const STACK_LAYERS = [
  {
    id: 'transport',
    label: 'HTTPS TRANSPORT',
    sublabel: 'Industry-standard TLS. Your data is encrypted in transit.',
    color: '#22c55e',
    proof: {
      claim: 'All data encrypted in transit via TLS 1.3',
      how: 'Standard HTTPS — the same encryption used by every bank, every hospital, every government portal. Your request is encrypted between your device and our servers. No one in the middle can read it.',
      verify: 'See the padlock in your browser. Click it. That\'s real. That\'s verifiable right now.',
      link: null,
      linkText: null,
    },
    icon: Lock,
  },
  {
    id: 'brave',
    label: 'BRAVE SEARCH API',
    sublabel: 'Independent index. Zero data retention. No Google. No Bing.',
    color: '#f97316',
    proof: {
      claim: 'Zero data retention on all search queries — their published policy',
      how: "When AI51 searches the web for you, it uses Brave's independently crawled index — not Google, not Bing. Brave publishes a zero-retention policy for their API: queries are not logged, not stored, not sold. That's their claim. Verify it directly.",
      verify: 'Read it yourself at the link below. We don\'t control Brave — we chose them because their published policy is the strongest available.',
      link: 'https://brave.com/search/api/',
      linkText: 'Brave Search API — Zero Retention Policy ↗',
    },
    icon: Globe,
  },
  {
    id: 'nostore',
    label: 'WE DON\'T STORE CONVERSATIONS',
    sublabel: 'Your messages are not saved to a database after your session.',
    color: '#a855f7',
    proof: {
      claim: 'Conversations are not persisted — session only',
      how: 'We do not write your AI51 conversation to a database. Messages exist in memory for the duration of your session to maintain context, then they\'re gone. We have no searchable archive of what you said.',
      verify: 'This is a design choice, not a mathematical proof. You\'re trusting us on this one. We\'re being honest about that distinction.',
      link: null,
      linkText: null,
    },
    icon: Eye,
  },
  {
    id: 'ipfs',
    label: 'IPFS KNOWLEDGE LIBRARY',
    sublabel: 'Content-addressed. Tamper-evident. Survives AI51 disappearing.',
    color: '#ec4899',
    proof: {
      claim: 'Knowledge base is cryptographically verifiable and decentralised',
      how: 'Every document in the AI51 knowledge library is stored on IPFS with a content hash (CID). If the content changes by one bit, the CID changes. No central server to pressure. The library exists as long as any node pins it.',
      verify: 'Fetch any CID directly from any IPFS gateway. The content is the proof.',
      link: 'https://docs.ipfs.tech/concepts/content-addressing/',
      linkText: 'IPFS — Content Addressing Explained ↗',
    },
    icon: Database,
  },
];

const TRUST_COMPARISONS = [
  { claim: '"We don\'t sell your data"', type: 'promise', label: 'Promise' },
  { claim: '"Our privacy policy says..."', type: 'promise', label: 'Legal text' },
  { claim: '"We\'re SOC2 compliant"', type: 'audit', label: 'Audit' },
  { claim: 'Honest architecture + verifiable third-party policies', type: 'proof', label: 'What we actually do' },
];

function StackLayer({ layer, index, isLast }) {
  const [open, setOpen] = useState(false);
  const Icon = layer.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <div
        className="border-2 rounded-xl overflow-hidden cursor-pointer transition-all"
        style={{ borderColor: open ? layer.color : `${layer.color}44` }}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-4 p-4" style={{ backgroundColor: `${layer.color}11` }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${layer.color}22`, border: `1px solid ${layer.color}44` }}>
            <Icon className="w-5 h-5" style={{ color: layer.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-black font-mono text-sm tracking-widest" style={{ color: layer.color }}>{layer.label}</div>
            <div className="text-gray-400 text-xs mt-0.5">{layer.sublabel}</div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-mono text-gray-500 hidden sm:block">DETAILS ↓</span>
            {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t p-4 space-y-3"
            style={{ borderColor: `${layer.color}33`, backgroundColor: `${layer.color}08` }}
          >
            <div>
              <div className="text-xs font-mono text-gray-500 mb-1">WHAT WE DO</div>
              <div className="text-white font-bold text-sm">{layer.proof.claim}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-gray-500 mb-1">HOW IT WORKS</div>
              <div className="text-gray-300 text-sm leading-relaxed">{layer.proof.how}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-gray-500 mb-1">HOW TO VERIFY</div>
              <div className="text-gray-300 text-sm">{layer.proof.verify}</div>
            </div>
            {layer.proof.link && (
              <a
                href={layer.proof.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-lg transition-all hover:opacity-80"
                style={{ backgroundColor: `${layer.color}22`, color: layer.color, border: `1px solid ${layer.color}44` }}
              >
                <ExternalLink className="w-3 h-3" />
                {layer.proof.linkText}
              </a>
            )}
          </motion.div>
        )}
      </div>

      {!isLast && (
        <div className="flex justify-center my-1">
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-px h-3 bg-cyan-500/40" />
            <ArrowDown className="w-3 h-3 text-cyan-500/40" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function AI51PrivacyArchitecture() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-16">

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono tracking-widest mb-4">
            <Shield className="w-3 h-3" />
            HONEST PRIVACY
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Not "privacy-focused."<br />
            <span className="text-cyan-400">Honestly private.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            We're not going to claim things we can't prove. Here's exactly what we do, what we don't do, and how you can verify what's verifiable.
          </p>
        </motion.div>

        {/* WHY THIS MATTERS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="border border-cyan-500/30 rounded-2xl p-6 bg-cyan-500/5 space-y-4"
        >
          <div className="text-xs font-mono text-cyan-400 tracking-widest">WHY WE BUILT THIS</div>
          <h2 className="text-2xl font-black text-white">People are scared. And they should be.</h2>
          <p className="text-gray-300 leading-relaxed">
            Every AI company says "we care about your privacy." Most of them are simultaneously training on your data, selling insights to advertisers, and writing privacy policies specifically designed to make that legal.
          </p>
          <p className="text-gray-300 leading-relaxed">
            AI51 exists because the people who need it most — people in crisis, people dealing with debt, mental health, trauma, legal threats — <span className="text-white font-bold">those people cannot afford to have their most vulnerable moments become someone else's dataset.</span>
          </p>
          <p className="text-cyan-300 font-bold leading-relaxed">
            So we built the architecture around that. Not as a feature. As the foundation.
          </p>
        </motion.div>

        {/* TRUST COMPARISON */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-3">
          <div className="text-xs font-mono text-gray-500 tracking-widest mb-4">THE TRUST LADDER</div>
          {TRUST_COMPARISONS.map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${item.type === 'proof' ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-white/10 bg-white/5'}`}>
              {item.type === 'proof'
                ? <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                : <AlertTriangle className="w-4 h-4 text-gray-500 flex-shrink-0" />
              }
              <span className={`text-sm flex-1 ${item.type === 'proof' ? 'text-white font-bold' : 'text-gray-500'}`}>{item.claim}</span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded ${item.type === 'proof' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-600'}`}>{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* STACK DIAGRAM */}
        <div className="space-y-1">
          <div className="text-xs font-mono text-gray-500 tracking-widest mb-4">THE ARCHITECTURE — TAP EACH LAYER</div>
          {STACK_LAYERS.map((layer, i) => (
            <StackLayer key={layer.id} layer={layer} index={i} isLast={i === STACK_LAYERS.length - 1} />
          ))}
        </div>

        {/* WHAT WE DON'T DO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border border-green-500/30 rounded-2xl p-6 bg-green-500/5 space-y-4"
        >
          <div className="text-xs font-mono text-green-400 tracking-widest">WHAT WE DON'T DO</div>
          <h2 className="text-2xl font-black text-white">Simple list. No asterisks.</h2>
          <div className="space-y-3">
            {[
              { label: 'We don\'t train on your conversations', detail: 'Your messages are not fed back into any model. We use third-party AI inference (Base44) — we don\'t control the weights, and we don\'t contribute your data to them.' },
              { label: 'We don\'t sell your data', detail: 'No advertising. No data brokers. No "anonymised insights" packages. AI51 makes money from subscriptions, not surveillance.' },
              { label: 'We don\'t store your conversations long-term', detail: 'Sessions are not archived to a searchable database. We have no conversation history we could hand to anyone.' },
              { label: 'We don\'t use dark patterns', detail: 'No pre-ticked consent boxes. No privacy policy designed to be unreadable. No "personalisation" that means profiling.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-white font-bold text-sm">{item.label}</div>
                  <div className="text-gray-400 text-sm mt-0.5">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* HONEST ABOUT LIMITS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border border-amber-500/30 rounded-2xl p-6 bg-amber-500/5 space-y-4"
        >
          <div className="text-xs font-mono text-amber-400 tracking-widest">WHAT WE CAN'T PROMISE</div>
          <h2 className="text-xl font-black text-white">Honesty includes the limits.</h2>
          <div className="space-y-4">
            {[
              { q: 'Can you mathematically prove you don\'t log?', a: "No. That would require you to audit our infrastructure directly. We're telling you what we do as a design commitment, not a cryptographic proof. We think honesty about that gap is more trustworthy than a bold claim we can't back." },
              { q: 'What about Base44 — the platform we run on?', a: "Base44 processes requests as part of serving the app. We've chosen them because their terms support our privacy commitments. But we're honest: there's a layer we don't fully control." },
              { q: 'What if governments compel you?', a: "We would comply with lawful orders — but we have very little data to hand over. No conversation archive, no behavioural profiles. That's a real protection, not a legal argument." },
            ].map((item, i) => (
              <div key={i} className="border-l-2 border-amber-500/30 pl-4 space-y-1">
                <div className="text-white font-bold text-sm">{item.q}</div>
                <div className="text-gray-400 text-sm">{item.a}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* THE MISSION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border border-pink-500/30 rounded-2xl p-6 bg-pink-500/5 space-y-4"
        >
          <div className="text-xs font-mono text-pink-400 tracking-widest">THE BIGGER REASON</div>
          <h2 className="text-2xl font-black text-white">Privacy is how we show we care.</h2>
          <p className="text-gray-300 leading-relaxed">
            AI51 is built for people navigating hard things. Legal threats. Mental health crises. Debt. Family breakdowns. The technology exists to help — but only if people trust it enough to be honest with it.
          </p>
          <p className="text-gray-300 leading-relaxed">
            If someone doesn't feel safe being real with AI51, we've failed. Privacy isn't a compliance box. <span className="text-white font-bold">It's the thing that makes the whole project possible.</span>
          </p>
          <div className="flex items-center gap-2 text-sm text-pink-400 font-mono">
            <Heart className="w-4 h-4" />
            Built for people who needed help and had nowhere safe to ask.
          </div>
        </motion.div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center space-y-4 pb-8"
        >
          <p className="text-gray-500 text-sm font-mono">Honest about what we do. Honest about what we can't prove.</p>
          <p className="text-gray-600 text-xs">Verify what's verifiable. Trust us on the rest — or don't use it. That's a fair trade.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <a
              href="https://brave.com/search/api/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-orange-500/30 rounded-lg text-orange-400 text-sm font-mono hover:bg-orange-500/10 transition-all"
            >
              <ExternalLink className="w-3 h-3" />
              Brave Search API
            </a>
            <a
              href="https://docs.ipfs.tech/concepts/content-addressing/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-pink-500/30 rounded-lg text-pink-400 text-sm font-mono hover:bg-pink-500/10 transition-all"
            >
              <ExternalLink className="w-3 h-3" />
              IPFS Content Addressing
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}