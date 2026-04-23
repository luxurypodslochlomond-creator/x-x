import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Code, Zap, Globe, BookOpen, Music, Heart, Building, Shield, Lock, Eye, CheckCircle, Loader2, Send, Key } from 'lucide-react';
import { issueAPIKey } from '@/functions/issueAPIKey';
import { platformSupporterCheckout } from '@/functions/platformSupporterCheckout';

const OPEN_APIS = [
  {
    name: "Learn51 AI",
    endpoint: "ai51.learn",
    description: "Adaptive AI tutor. Socratic. Private. No data stored. Works in any language.",
    what_you_can_build: "Schools. Apps. Tutoring bots. Homework helpers. Anything that teaches.",
    color: "#06b6d4",
    status: "open",
    example: `fetch('https://uf51.love/api/learn', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    question: "Why is the sky blue?",\n    age: 9,\n    language: "en"\n  })\n})`
  },
  {
    name: "Healing Frequencies",
    endpoint: "ai51.frequencies",
    description: "500+ scientifically referenced frequencies. Sleep, pain, anxiety, focus. Open forever.",
    what_you_can_build: "Wellness apps. Sleep tools. Meditation platforms. Hospital ambient systems.",
    color: "#ec4899",
    status: "open",
    example: `fetch('https://uf51.love/api/frequencies', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    condition: "anxiety",\n    species: "human"\n  })\n})`
  },
  {
    name: "Cleanup Intelligence",
    endpoint: "ai51.cleanup",
    description: "AI litter verification. Weight estimation. Fraud detection. Corporate brand accountability.",
    what_you_can_build: "Environmental apps. Council tools. School programs. Corporate ESG tracking.",
    color: "#10b981",
    status: "open",
    example: `fetch('https://uf51.love/api/cleanup', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    photo_url: "...",\n    location: { lat: 55.8, lng: -4.2 }\n  })\n})`
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

const WHO_ITS_FOR = [
  { who: "Developers", what: "Build products on ethical AI infrastructure. No surveillance. No extraction. Your users stay yours.", icon: Code },
  { who: "Educators & NGOs", what: "Take Learn51. Adapt it for your language, your kids, your community. We don't need credit.", icon: Globe },
  { who: "Researchers", what: "Access the frequency database, cleanup data, healing outcomes. Publish freely. Make it better.", icon: BookOpen },
  { who: "Artists & Musicians", what: "CB51 is for you. Not open API — but built for artists, by someone who gets it.", icon: Music },
  { who: "Health & Wellness", what: "PetSounds51 shows what's possible. Build your own protocol on our frequency engine.", icon: Heart },
  { who: "Businesses that care", what: "ESG isn't a checkbox. Use our cleanup verification, litter intelligence, real impact data.", icon: Building },
];

const CodeBlock = ({ code }) => (
  <pre className="bg-black/80 border border-white/10 rounded-lg p-4 text-xs text-green-400 font-mono overflow-x-auto whitespace-pre">
    {code}
  </pre>
);

export default function Platform() {
  const [activeApi, setActiveApi] = useState(0);

  // API key form state
  const [keyForm, setKeyForm] = useState({ name: '', email: '', what_building: '', which_api: 'learn51' });
  const [keyLoading, setKeyLoading] = useState(false);
  const [keyDone, setKeyDone] = useState(false);
  const [keyError, setKeyError] = useState('');

  const handleKeyRequest = async (e) => {
    e.preventDefault();
    setKeyLoading(true);
    setKeyError('');
    const res = await issueAPIKey(keyForm);
    setKeyLoading(false);
    if (res.data?.success) {
      setKeyDone(true);
    } else {
      setKeyError('Something went wrong — email family@uf51.love directly.');
    }
  };

  // Supporter checkout
  const [supportLoading, setSupportLoading] = useState('');
  const [currency, setCurrency] = useState('gbp');
  const [customAmount, setCustomAmount] = useState('');

  const CURRENCIES = [
    { code: 'gbp', symbol: '£', label: 'GBP' },
    { code: 'usd', symbol: '$', label: 'USD' },
    { code: 'eur', symbol: '€', label: 'EUR' },
    { code: 'aud', symbol: 'A$', label: 'AUD' },
    { code: 'cad', symbol: 'C$', label: 'CAD' },
    { code: 'jpy', symbol: '¥', label: 'JPY' },
    { code: 'inr', symbol: '₹', label: 'INR' },
    { code: 'brl', symbol: 'R$', label: 'BRL' },
    { code: 'sgd', symbol: 'S$', label: 'SGD' },
    { code: 'nzd', symbol: 'NZ$', label: 'NZD' },
    { code: 'chf', symbol: 'CHF', label: 'CHF' },
    { code: 'sek', symbol: 'kr', label: 'SEK' },
    { code: 'nok', symbol: 'kr', label: 'NOK' },
    { code: 'mxn', symbol: 'MX$', label: 'MXN' },
    { code: 'hkd', symbol: 'HK$', label: 'HKD' },
    { code: 'pln', symbol: 'zł', label: 'PLN' },
  ];
  const ZERO_DECIMAL_CURRENCIES = ['jpy'];
  const activeCurrency = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];

  const handleOneOffDonation = async (amountDisplay, key) => {
    if (window.self !== window.top) { alert('Checkout works from the published app only.'); return; }
    const isZero = ZERO_DECIMAL_CURRENCIES.includes(currency);
    const amount_pence = isZero ? Math.round(amountDisplay) : Math.round(amountDisplay * 100);
    setSupportLoading(key);
    const res = await platformSupporterCheckout({ mode: 'once', amount_pence, currency });
    setSupportLoading('');
    if (res.data?.url) window.location.href = res.data.url;
    else if (res.data?.error) alert(res.data.error);
  };

  const handleCustomDonate = async () => {
    const val = parseFloat(customAmount);
    if (!val || val < 0.5) { alert('Minimum donation is 0.50'); return; }
    await handleOneOffDonation(val, 'custom');
  };

  // Show success if redirected back
  const supported = new URLSearchParams(window.location.search).get('supported');

  // Scroll to support section if ?scroll=support
  React.useEffect(() => { // eslint-disable-line
    if (new URLSearchParams(window.location.search).get('scroll') === 'support') {
      setTimeout(() => {
        document.getElementById('support-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }, []);

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

      <div className="max-w-5xl mx-auto px-6 pb-20">

        {/* GET YOUR API KEY — instant */}
        <div className="mb-24">
          <h2 className="text-3xl font-black mb-2">Get your API key.</h2>
          <p className="text-gray-500 mb-8">Fill this in. Key hits your inbox instantly. No waiting. No sales call.</p>

          <div className="border border-cyan-500/30 rounded-2xl p-8 bg-cyan-500/5">
            <AnimatePresence mode="wait">
              {keyDone ? (
                <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                  <Key className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-black mb-2">Key sent.</h3>
                  <p className="text-gray-400">Check your inbox — your API key is there now. Reply with any questions.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleKeyRequest} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 font-mono block mb-1">YOUR NAME</label>
                      <input
                        required
                        value={keyForm.name}
                        onChange={e => setKeyForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-cyan-500/60 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-mono block mb-1">YOUR EMAIL</label>
                      <input
                        required
                        type="email"
                        value={keyForm.email}
                        onChange={e => setKeyForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@yourproject.com"
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-cyan-500/60 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-mono block mb-1">WHICH API</label>
                    <select
                      value={keyForm.which_api}
                      onChange={e => setKeyForm(f => ({ ...f, which_api: e.target.value }))}
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-cyan-500/60 focus:outline-none"
                    >
                      <option value="learn51">Learn51 AI — tutoring engine</option>
                      <option value="frequencies">Healing Frequencies — 500+ protocols</option>
                      <option value="cleanup">Cleanup Intelligence — litter AI</option>
                      <option value="all">All APIs</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-mono block mb-1">WHAT ARE YOU BUILDING?</label>
                    <textarea
                      required
                      value={keyForm.what_building}
                      onChange={e => setKeyForm(f => ({ ...f, what_building: e.target.value }))}
                      placeholder="One sentence is fine. Who's it for, what does it do."
                      rows={3}
                      className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-cyan-500/60 focus:outline-none resize-none"
                    />
                  </div>
                  {keyError && <p className="text-red-400 text-sm">{keyError}</p>}
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-xs">Free. 1,000 req/month. Key tied to stated purpose.</p>
                    <button
                      type="submit"
                      disabled={keyLoading}
                      className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-black rounded-xl hover:bg-cyan-400 transition-all disabled:opacity-50"
                    >
                      {keyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {keyLoading ? 'Sending…' : 'Get my key'}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm text-gray-400">
            <div className="border border-white/5 rounded-xl p-4"><span className="text-white font-bold block">Free tier</span>1,000 requests/month. No cost. No catch.</div>
            <div className="border border-white/5 rounded-xl p-4"><span className="text-white font-bold block">Instant</span>Key in your inbox before you close this tab.</div>
            <div className="border border-white/5 rounded-xl p-4"><span className="text-white font-bold block">Rate limit hit?</span>Email us. If it's good, we'll sort it.</div>
          </div>
        </div>

        {/* THE HONEST SPLIT */}
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
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> {item}
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
                    ? <span className="text-green-400 text-xs font-mono">LIVE</span>
                    : <span className="text-amber-400 text-xs font-mono">COMING 2026</span>
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
                <p className="text-xs text-gray-600 mt-3">Endpoints are in closed beta — the live URL ships with your key. Email us first.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* WHO THIS IS FOR */}
        <div className="mb-24">
          <h2 className="text-3xl font-black mb-2">Who this is for.</h2>
          <p className="text-gray-500 mb-10">If you're building something that helps people — this is for you.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {WHO_ITS_FOR.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.who}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 border border-white/10 rounded-xl p-5 hover:border-cyan-500/30 transition-all"
                >
                  <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-black mb-1">{item.who}</h3>
                    <p className="text-gray-400 text-sm">{item.what}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* HOW WE KEEP IT SAFE — legal & ethical */}
        <div className="mb-24">
          <h2 className="text-3xl font-black mb-2">How we keep it safe.</h2>
          <p className="text-gray-500 mb-2">Open doesn't mean unguarded.</p>
          <div className="border border-white/5 rounded-xl p-5 bg-white/2 mb-10">
            <p className="text-gray-500 text-xs font-mono mb-3">LEGAL COMPLIANCE</p>
            <div className="grid md:grid-cols-2 gap-3 text-xs text-gray-400">
              <div><span className="text-white font-bold block mb-1">UK & EU</span>UK GDPR compliant. EU AI Act aligned. Data processed under UK adequacy decisions. No EEA transfer without safeguards.</div>
              <div><span className="text-white font-bold block mb-1">USA</span>CCPA compliant for California users. No sale of personal data. No user profiling. COPPA compliant — no data collected from under-13s.</div>
              <div><span className="text-white font-bold block mb-1">Global</span>We do not collect, store, or process biometric data. No cross-border data transfer without legal basis. API keys tied to a named responsible party in every jurisdiction.</div>
              <div><span className="text-white font-bold block mb-1">Questions?</span>If your jurisdiction has specific AI or data law requirements, email us before integrating. We'll work through it. <a href="mailto:family@uf51.love?subject=Legal Compliance" className="text-cyan-400 hover:text-cyan-300">family@uf51.love</a></div>
            </div>
          </div>
          <div className="space-y-4">
            {[
              {
                layer: "01",
                title: "Intent detection — under the hood, always",
                body: "Every API request passes through a values filter before it touches a model. Not keyword blocking — actual intent classification. Framing something as 'educational' or 'research' doesn't fool it. If the intent is harm, it's refused. No override, no exceptions.",
                icon: Shield,
                color: "#06b6d4"
              },
              {
                layer: "02",
                title: "API keys are tied to stated purpose — not anonymous",
                body: "Open doesn't mean anonymous. Keys are issued against a declared use case and a real contact. If your calls stop matching what you said you'd build — the key is revoked. We maintain a minimal log of key-to-purpose mapping for accountability. This is required by UK law for AI providers and we take it seriously.",
                icon: Lock,
                color: "#ec4899"
              },
              {
                layer: "03",
                title: "Zero knowledge by architecture — GDPR compliant",
                body: "Your users' data isn't stored, logged, or piped into training sets. Requests are processed and dropped. We do not transfer data outside the UK/EEA without appropriate safeguards. Privacy isn't just a policy — it's structurally enforced.",
                icon: Eye,
                color: "#10b981"
              },
              {
                layer: "04",
                title: "Open source — anyone can audit it",
                body: "Anyone can read the values filter. Any researcher can verify it works. Any developer can fork it and make it stricter. Transparency is the security. Not a dashboard that says 'trust us'.",
                icon: Code,
                color: "#8b5cf6"
              },
              {
                layer: "05",
                title: "Legally locked — mission written into law",
                body: "The mission isn't just a README. It's encoded in our legal structure — a Community Interest Company with a statutory asset lock registered at Companies House. No future owner, acquirer, or board change can flip this to extraction mode. The law prevents it. That's not a promise — it's a legal constraint.",
                icon: Building,
                color: "#f59e0b"
              },
            ].map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={layer.layer}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-6 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: layer.color + '20', color: layer.color }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg mb-2">{layer.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{layer.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-8 border border-white/5 rounded-xl p-6 bg-white/2 text-center">
            <p className="text-gray-500 text-sm">The honest caveat: <span className="text-gray-300">no system is perfect. If you find a gap in our legal compliance or safety — tell us. We'd rather be corrected than wrong.</span></p>
            <a href="mailto:family@uf51.love?subject=Safety Gap" className="text-cyan-400 text-sm font-bold mt-2 inline-block hover:text-cyan-300 transition-colors">family@uf51.love — subject: Safety Gap</a>
          </div>
        </div>

        {/* THE HONEST BIT */}
        <div className="border border-cyan-500/20 rounded-2xl p-10 mb-24 text-center bg-cyan-500/5">
          <h2 className="text-3xl font-black mb-6">The honest bit.</h2>
          <div className="max-w-2xl mx-auto space-y-4 text-gray-300 text-lg leading-relaxed">
            <p>CIC registered. Mission locked in law. No VC. No shareholders. No extraction.</p>
            <p>The commercial products fund the open ones. That's the whole model — and it works.</p>
            <p>We believe someone in a classroom in Lagos or a dev in Glasgow or a healer in Sao Paulo can build something better than us with the right tools.</p>
            <p className="text-white font-bold">So here are the tools.</p>
          </div>
        </div>

        {/* FOUNDERS — Stripe powered */}
        <div className="mb-24" id="support-section">
          <div className="border border-purple-500/20 rounded-2xl p-10 bg-purple-500/5">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-purple-400 font-mono text-xs tracking-widest mb-4">NO ACCOUNT. NO PRESSURE. JUST YOU.</p>
              <h2 className="text-3xl font-black mb-4">Help keep it free.</h2>
              {supported ? (
                <div className="py-6 mb-6">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="text-green-400 font-black text-xl">Thank you. Seriously.</p>
                  <p className="text-gray-400 mt-2">You're keeping the open layer alive for everyone who can't afford it.</p>
                </div>
              ) : null}
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                The open APIs cost real money to run. Every pound goes into infrastructure, not shareholders. Help keep it free for everyone who can't afford it.
              </p>

              {/* Currency picker */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {CURRENCIES.map(c => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all border ${currency === c.code ? 'bg-purple-500 border-purple-500 text-white' : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}
                  >
                    {c.symbol} {c.label}
                  </button>
                ))}
              </div>

              {/* Quick amounts */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-5">
                {[1, 5, 10, 25, 50, 100].map(amt => (
                  <button
                    key={amt}
                    onClick={() => handleOneOffDonation(amt, `quick_${amt}`)}
                    disabled={!!supportLoading}
                    className="border border-white/10 hover:border-purple-500/60 rounded-xl py-3 font-black text-sm transition-all hover:bg-purple-500/10 disabled:opacity-50 flex items-center justify-center"
                  >
                    {supportLoading === `quick_${amt}` ? (
                      <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                    ) : (
                      <span className="text-purple-300">{activeCurrency.symbol}{amt}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Bigger amounts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[250, 500, 1000, 10000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => amt === 10000 ? window.location.href = 'mailto:family@uf51.love?subject=Big%20Donation' : handleOneOffDonation(amt, `big_${amt}`)}
                    disabled={!!supportLoading && supportLoading !== `big_${amt}`}
                    className="border border-white/10 hover:border-purple-500/60 rounded-xl py-3 text-center transition-all hover:bg-purple-500/10 disabled:opacity-50 flex items-center justify-center"
                  >
                    {supportLoading === `big_${amt}` ? (
                      <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                    ) : (
                      <span className="font-black text-purple-300">{activeCurrency.symbol}{amt.toLocaleString()}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="border border-white/10 rounded-xl p-4 mb-4">
                <p className="text-xs text-gray-500 font-mono mb-3">YOUR OWN AMOUNT</p>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 flex-1 bg-black/60 border border-white/10 rounded-lg px-4">
                    <span className="text-gray-400 font-bold">{activeCurrency.symbol}</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={customAmount}
                      onChange={e => setCustomAmount(e.target.value)}
                      placeholder="Any amount"
                      className="flex-1 bg-transparent py-3 text-white text-sm focus:outline-none"
                    />
                    <span className="text-gray-600 text-xs font-mono">{activeCurrency.label}</span>
                  </div>
                  <button
                    onClick={handleCustomDonate}
                    disabled={!customAmount || !!supportLoading}
                    className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-black rounded-lg transition-all disabled:opacity-40 flex items-center gap-2"
                  >
                    {supportLoading === 'custom' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {supportLoading === 'custom' ? '…' : 'Give ♥'}
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-xs">Any amount. Any currency. No account needed. 💜</p>

              <p className="text-gray-600 text-xs mt-6">Powered by Stripe. Card, Apple Pay, Google Pay accepted.</p>
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
              <Link to={createPageUrl('Magic51')} className="text-cyan-400 hover:text-cyan-300 text-sm font-bold transition-colors">Learn51</Link>
              <Link to={createPageUrl('FrequencyChamber')} className="text-pink-400 hover:text-pink-300 text-sm font-bold transition-colors">Frequencies</Link>
              <Link to={createPageUrl('NewCleanup')} className="text-green-400 hover:text-green-300 text-sm font-bold transition-colors">Cleanup</Link>
              <Link to={createPageUrl('AI51Soul')} className="text-purple-400 hover:text-purple-300 text-sm font-bold transition-colors">AI51</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}