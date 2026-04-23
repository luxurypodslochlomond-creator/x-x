import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const OPEN_APIS = [
  {
    name: "Learn51 AI",
    endpoint: "ai51.learn",
    description: "Adaptive AI tutor. Socratic. Private. No data stored. Works in any language.",
    what_you_can_build: "Schools. Apps. Tutoring bots. Homework helpers. Anything that teaches.",
    color: "#06b6d4",
    status: "open",
    example: `fetch('https://uf51.love/api/learn', {\n  method: 'POST',\n  body: JSON.stringify({\n    question: "Why is the sky blue?",\n    age: 9,\n    language: "en"\n  })\n})`
  },
  {
    name: "Healing Frequencies",
    endpoint: "ai51.frequencies",
    description: "500+ scientifically referenced frequencies. Sleep, pain, anxiety, focus. Open forever.",
    what_you_can_build: "Wellness apps. Sleep tools. Meditation platforms. Hospital ambient systems.",
    color: "#ec4899",
    status: "open",
    example: `fetch('https://uf51.love/api/frequencies', {\n  method: 'POST',\n  body: JSON.stringify({\n    condition: "anxiety",\n    species: "human"\n  })\n})`
  },
  {
    name: "Cleanup Intelligence",
    endpoint: "ai51.cleanup",
    description: "AI litter verification. Weight estimation. Fraud detection. Corporate brand accountability.",
    what_you_can_build: "Environmental apps. Council tools. School programs. Corporate ESG tracking.",
    color: "#10b981",
    status: "open",
    example: `fetch('https://uf51.love/api/cleanup', {\n  method: 'POST',\n  body: JSON.stringify({\n    photo_url: "...",\n    location: { lat: 55.8, lng: -4.2 }\n  })\n})`
  },
  {
    name: "AI51 Core",
    endpoint: "ai51.core",
    description: "The ethical AI layer. No tracking. No model training on your data. No corporate ownership.",
    what_you_can_build: "Any AI product that needs to be honest about what it is.",
    color: "#8b5cf6",
    status: "coming",
    example: `// Coming 2026\n// Same API shape as OpenAI\n// Zero extraction\n// Your data stays yours`
  }
];

const CLOSED_PRODUCTS = [
  { name: "SORTED", why: "Legal advice tools need accountability and care. Free abuse would harm vulnerable people.", color: "#f59e0b" },
  { name: "PetSounds51", why: "Subscription funds the research partnerships and keeps the science honest.", color: "#d4a017" },
  { name: "CB51", why: "Artist management requires trust, security and real support. Not a free-for-all.", color: "#06b6d4" },
];

const CodeBlock = ({ code }) => (
  <pre className="bg-black/80 border border-white/10 rounded-lg p-4 text-xs text-green-400 font-mono overflow-x-auto whitespace-pre">
    {code}
  </pre>
);

export default function Platform() {
  const [activeApi, setActiveApi] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan-400 font-mono text-sm tracking-widest mb-6">UF51 PLATFORM</p>
          <h1 className="text-5xl md:text-7xl font-black leading-none mb-8">
            The internet<br />
            <span className="text-cyan-400">was supposed<br />to be free.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-4">
            We're building AI infrastructure for humans. Not shareholders. 
            Some of it funds us. All of it serves you. The open parts? 
            Take them. Build something we haven't imagined.
          </p>
          <p className="text-gray-500 text-base">
            This is how the web was supposed to work — before it got captured.
          </p>
        </motion.div>
      </div>

      {/* THE HONEST SPLIT */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          
          {/* OPEN */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-green-500/30 rounded-2xl p-8 bg-green-500/5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-mono text-sm font-bold tracking-widest">OPEN FOREVER</span>
            </div>
            <h2 className="text-2xl font-black mb-4">Build on this.</h2>
            <p className="text-gray-400 mb-6">
              Learning. Healing frequencies. Environmental intelligence. AI51 core. 
              These belong to humanity. Use them. Extend them. Make them better than us.
            </p>
            <ul className="space-y-2">
              {['Learn51 AI tutoring engine', 'Healing frequency database', 'Litter cleanup AI', 'AI51 ethical layer (2026)'].map(item => (
                <li key={item} className="flex items-center gap-2 text-gray-300 text-sm">
                  <span className="text-green-400">✓</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* PROTECTED */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-amber-500/30 rounded-2xl p-8 bg-amber-500/5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="text-amber-400 font-mono text-sm font-bold tracking-widest">FUNDS EVERYTHING</span>
            </div>
            <h2 className="text-2xl font-black mb-4">This keeps it alive.</h2>
            <p className="text-gray-400 mb-6">
              SORTED, PetSounds51, CB51 — these are subscription products. 
              The revenue from these is what lets us keep everything else free. 
              That's the honest model.
            </p>
            <ul className="space-y-3">
              {CLOSED_PRODUCTS.map(p => (
                <li key={p.name} className="text-sm">
                  <span className="font-bold" style={{ color: p.color }}>{p.name}</span>
                  <span className="text-gray-500 block text-xs mt-0.5">{p.why}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* OPEN APIs */}
        <div className="mb-24">
          <h2 className="text-3xl font-black mb-2">Open APIs.</h2>
          <p className="text-gray-500 mb-10">No enterprise sales call. No pricing tiers. Just use it.</p>

          {/* API selector */}
          <div className="flex flex-wrap gap-3 mb-8">
            {OPEN_APIS.map((api, i) => (
              <button
                key={api.name}
                onClick={() => setActiveApi(i)}
                className={`px-4 py-2 rounded-lg font-mono text-sm font-bold transition-all border ${
                  activeApi === i
                    ? 'text-black'
                    : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                } ${api.status === 'coming' ? 'opacity-60' : ''}`}
                style={activeApi === i ? { backgroundColor: api.color, borderColor: api.color } : {}}
              >
                {api.name}
                {api.status === 'coming' && <span className="ml-2 text-xs opacity-70">soon</span>}
              </button>
            ))}
          </div>

          {/* Active API detail */}
          <motion.div
            key={activeApi}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-white/10 rounded-2xl p-8 bg-white/2"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-sm px-3 py-1 rounded-full border" style={{ color: OPEN_APIS[activeApi].color, borderColor: OPEN_APIS[activeApi].color + '40' }}>
                    {OPEN_APIS[activeApi].endpoint}
                  </span>
                  {OPEN_APIS[activeApi].status === 'open'
                    ? <span className="text-green-400 text-xs font-mono">● LIVE</span>
                    : <span className="text-amber-400 text-xs font-mono">◌ COMING 2026</span>
                  }
                </div>
                <h3 className="text-2xl font-black mb-3">{OPEN_APIS[activeApi].name}</h3>
                <p className="text-gray-400 mb-6">{OPEN_APIS[activeApi].description}</p>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-xs text-gray-500 font-mono mb-2">WHAT YOU CAN BUILD</p>
                  <p className="text-gray-300 text-sm">{OPEN_APIS[activeApi].what_you_can_build}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-mono mb-3">EXAMPLE REQUEST</p>
                <CodeBlock code={OPEN_APIS[activeApi].example} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* WHO THIS IS FOR */}
        <div className="mb-24">
          <h2 className="text-3xl font-black mb-2">Who this is for.</h2>
          <p className="text-gray-500 mb-10">If you're building something that helps people — this is for you.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { who: "Developers", what: "Build products on ethical AI infrastructure. No surveillance. No extraction. Your users stay yours.", icon: "⌨️" },
              { who: "Educators & NGOs", what: "Take Learn51. Adapt it for your language, your kids, your community. We don't need credit.", icon: "🌍" },
              { who: "Researchers", what: "Access the frequency database, cleanup data, healing outcomes. Publish freely. Make it better.", icon: "🔬" },
              { who: "Artists & Musicians", what: "CB51 is for you. Not open API — but built for artists, by someone who gets it.", icon: "🎵" },
              { who: "Health & Wellness", what: "PetSounds51 shows what's possible. Build your own protocol on our frequency engine.", icon: "💚" },
              { who: "Businesses that care", what: "ESG isn't a checkbox. Use our cleanup verification, litter intelligence, real impact data.", icon: "🏢" },
            ].map((item, i) => (
              <motion.div
                key={item.who}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-all"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-black text-lg mb-2">{item.who}</h3>
                <p className="text-gray-400 text-sm">{item.what}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* HOW WE KEEP IT SAFE */}
        <div className="mb-24">
          <h2 className="text-3xl font-black mb-2">How we keep it safe.</h2>
          <p className="text-gray-500 mb-10">Open doesn't mean unguarded. Here's how the values are enforced — not just stated.</p>
          <div className="space-y-4">
            {[
              {
                layer: "01",
                title: "Intent detection — under the hood, always",
                body: "Every API request passes through a values filter before it touches a model. Not keyword blocking — actual intent classification. Framing something as 'educational' or 'research' doesn't fool it. If the intent is harm, it's refused. No override, no exceptions.",
                color: "#06b6d4"
              },
              {
                layer: "02",
                title: "API keys are tied to stated purpose",
                body: "Open doesn't mean anonymous. Keys are issued against a declared use case. If your calls stop matching what you said you'd build — the key is revoked. No appeal process for bad actors.",
                color: "#ec4899"
              },
              {
                layer: "03",
                title: "Zero knowledge by architecture",
                body: "We can't leak what we don't have. Your users' data isn't stored, logged, or piped into training sets. Privacy isn't a policy — it's a structural impossibility to violate it. The data literally doesn't exist after the response.",
                color: "#10b981"
              },
              {
                layer: "04",
                title: "Open source = community audit",
                body: "Anyone can read the values filter. Any researcher can verify it works. Any developer can fork it and make it stricter. Transparency IS the security — not a dashboard that says 'we're safe, trust us'.",
                color: "#8b5cf6"
              },
              {
                layer: "05",
                title: "Legally locked — the CIC structure",
                body: "We're a Community Interest Company. The mission is written into law, not just a README. A future owner, acquirer, or board change cannot flip this to extraction mode. It is legally prevented. The asset lock is real.",
                color: "#f59e0b"
              },
            ].map((layer, i) => (
              <motion.div
                key={layer.layer}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-black font-mono text-sm" style={{ backgroundColor: layer.color + '20', color: layer.color }}>
                  {layer.layer}
                </div>
                <div>
                  <h3 className="font-black text-lg mb-2">{layer.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{layer.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 border border-white/5 rounded-xl p-6 bg-white/2 text-center">
            <p className="text-gray-500 text-sm">The honest caveat: <span className="text-gray-300">no system is perfect. If you find a gap, tell us. We'd rather be corrected than wrong.</span></p>
            <a href="mailto:family@uf51.love?subject=Safety Gap" className="text-cyan-400 text-sm font-bold mt-2 inline-block hover:text-cyan-300 transition-colors">family@uf51.love — subject: Safety Gap</a>
          </div>
        </div>

        {/* THE HONEST BIT */}
        <div className="border border-cyan-500/20 rounded-2xl p-10 mb-24 text-center bg-cyan-500/5">
          <h2 className="text-3xl font-black mb-6">The honest bit.</h2>
          <div className="max-w-2xl mx-auto space-y-4 text-gray-300 text-lg leading-relaxed">
            <p>We're a small team. CIC registered. No VC. No shareholders pulling strings.</p>
            <p>The commercial products fund the open ones. That's the whole model.</p>
            <p>We believe someone in a classroom in Lagos or a dev in Glasgow or a healer in São Paulo can build something better than us with the right tools.</p>
            <p className="text-white font-bold">So here are the tools.</p>
          </div>
        </div>

        {/* FOUNDERS */}
        <div className="mb-24">
          <div className="border border-purple-500/20 rounded-2xl p-10 bg-purple-500/5">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-purple-400 font-mono text-xs tracking-widest mb-4">FOR FOUNDERS & BELIEVERS</p>
              <h2 className="text-3xl font-black mb-6">Keep it free.</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                The honest truth? We're a tiny CIC with no VC, no salary, no safety net. 
                The open APIs cost real money to run — AI calls, servers, bandwidth.
              </p>
              <p className="text-gray-400 mb-4">
                If you build something on UF51 that works — that earns, that helps, that scales — 
                and you want the infrastructure to stay free for everyone else who can't afford it?
              </p>
              <p className="text-white font-bold text-xl mb-8">
                Become a founding supporter.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-10">
                {[
                  { tier: "Friend", amount: "£10/mo", desc: "Keeps one child's AI tutor running for a month" },
                  { tier: "Builder", amount: "£50/mo", desc: "Funds API calls for a small developer using our stack" },
                  { tier: "Founder", amount: "£200/mo", desc: "Keeps the whole open layer alive. Your name in the foundation." },
                ].map(t => (
                  <div key={t.tier} className="border border-purple-500/20 rounded-xl p-5 text-center">
                    <p className="text-purple-400 font-mono text-xs mb-2">{t.tier.toUpperCase()}</p>
                    <p className="text-2xl font-black mb-2">{t.amount}</p>
                    <p className="text-gray-500 text-xs">{t.desc}</p>
                  </div>
                ))}
              </div>
              <a
                href="mailto:family@uf51.love?subject=Founding Supporter"
                className="inline-block px-8 py-4 border-2 border-purple-500 text-purple-300 font-black rounded-xl hover:bg-purple-500/10 transition-all"
              >
                family@uf51.love — subject: Founding Supporter
              </a>
              <p className="text-gray-600 text-xs mt-4">No platform. No payment processor taking a cut. Just an email and a conversation.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-4xl font-black mb-6">
              Want to build<br />
              <span className="text-cyan-400">something together?</span>
            </h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
              No forms. No sales process. Just email us what you're building 
              and who it's for. If it helps people, we want to hear it.
            </p>
            
            <a
              href="mailto:family@uf51.love"
              className="inline-block px-10 py-5 bg-cyan-500 text-black font-black text-xl rounded-xl hover:bg-cyan-400 transition-all"
              style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}
            >
              family@uf51.love
            </a>

            <p className="text-gray-600 text-sm mt-6">
              Or explore what we've already built
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link to={createPageUrl('Magic51')} className="text-cyan-400 hover:text-cyan-300 text-sm font-bold transition-colors">Learn51 →</Link>
              <Link to={createPageUrl('FrequencyChamber')} className="text-pink-400 hover:text-pink-300 text-sm font-bold transition-colors">Frequencies →</Link>
              <Link to={createPageUrl('NewCleanup')} className="text-green-400 hover:text-green-300 text-sm font-bold transition-colors">Cleanup →</Link>
              <Link to={createPageUrl('AI51Soul')} className="text-purple-400 hover:text-purple-300 text-sm font-bold transition-colors">AI51 →</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}