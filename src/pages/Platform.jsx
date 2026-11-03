import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Code, Zap, Globe, BookOpen, Music, Heart, Building, Shield, Lock, Eye, CheckCircle, Loader2, Send, Key, Copy, Check, Terminal, Cpu, Activity, GitBranch, Clock, Star } from 'lucide-react';
import { issueAPIKey } from '@/functions/issueAPIKey';
import { platformSupporterCheckout } from '@/functions/platformSupporterCheckout';

const OPEN_APIS = [
  {
    name: "Learn51 AI",
    endpoint: "endpoint comes with your key",
    description: "Socratic tutoring engine. Supports 40+ languages. Returns structured lesson content with follow-up questions. No user data stored server-side.",
    what_you_can_build: "Tutoring apps, classroom tools, homework assistants, language learning platforms, accessibility tools for neurodiverse learners.",
    color: "#06b6d4",
    status: "beta",
    free_tier: "1,000 req/month",
    example: `fetch('<endpoint from your key>', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    question: "Why is the sky blue?",\n    age: 9,\n    language: "en"\n  })\n})`
  },
  {
    name: "Healing Frequencies",
    endpoint: "endpoint comes with your key",
    description: "Database of 500+ frequency protocols referenced against published research. Returns Hz values, durations, and source citations. Covers sleep, pain, anxiety, focus. Human and animal protocols.",
    what_you_can_build: "Wellness apps, sleep tools, meditation platforms, clinical ambient systems, veterinary sound therapy tools.",
    color: "#ec4899",
    status: "beta",
    free_tier: "1,000 req/month",
    example: `fetch('<endpoint from your key>', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    condition: "anxiety",\n    species: "human"\n  })\n})`
  },
  {
    name: "Cleanup Intelligence",
    endpoint: "endpoint comes with your key",
    description: "Litter photo verification via AI. Returns weight estimate (kg), detected items, brand identification, GPS validation, and fraud risk score. All submissions are IPFS-backed for auditability.",
    what_you_can_build: "Environmental reporting tools, council waste dashboards, school eco programmes, ESG compliance tracking, citizen science apps.",
    color: "#10b981",
    status: "beta",
    free_tier: "500 req/month",
    example: `fetch('<endpoint from your key>', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer YOUR_API_KEY',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    photo_url: "https://...",\n    location: { lat: 55.8642, lng: -4.2518 }\n  })\n})`
  },
  {
    name: "AI51 Core",
    endpoint: "/api/ai51",
    description: "General-purpose AI layer. OpenAI-compatible request/response shape. No training on user inputs. No data retention. Stateless by design.",
    what_you_can_build: "Chatbots, content tools, code assistants, customer support — anything that needs an LLM without the data extraction.",
    color: "#8b5cf6",
    status: "coming",
    free_tier: "TBC",
    example: `// Shipping Q3 2026\n// OpenAI-compatible request shape\n// POST /api/ai51\n// No data retention. Stateless.`
  }
];

const CLOSED_PRODUCTS = [
  { name: "SORTED", why: "Legal document decoder. Subscription protects against misuse in high-stakes situations.", color: "#f59e0b", price: "£9.99/mo" },
  { name: "PetSounds51", why: "Veterinary sound therapy. Subscription funds ongoing research partnerships.", color: "#d4a017", price: "£29.99/yr" },
  { name: "CB51", why: "Artist management platform. SaaS model funds real support and infrastructure.", color: "#06b6d4", price: "Freemium" },
];

const WHO_ITS_FOR = [
  { who: "Developers", what: "REST APIs, Bearer token auth, JSON in/out. No proprietary SDK required. Works with any stack.", icon: Code },
  { who: "Educators & NGOs", what: "Learn51 is in closed beta now; 1,000 req/month free once it opens. 40+ languages. No attribution required.", icon: Globe },
  { who: "Researchers", what: "Access the frequency database and cleanup dataset. Cite freely. We'll link back to published work.", icon: BookOpen },
  { who: "Artists & Musicians", what: "CB51 is a separate SaaS product, not an open API. Email us for early access.", icon: Music },
  { who: "Health & Wellness", what: "Frequencies API returns Hz, duration, and peer-reviewed citations. Build your own protocol layer.", icon: Heart },
  { who: "Enterprise & Corporate", what: "Cleanup Intelligence aims at ESG reporting, with a proof trail behind each submission. Closed beta — ask for a key.", icon: Building },
];

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group">
      <pre className="bg-[#1a1612] border border-[#1a1612] p-4 text-xs text-[#1e3a2b] font-mono overflow-x-auto whitespace-pre">
        {code}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-[#efe7d6]/10 hover:bg-[#efe7d6]/20 text-[#6b6258] hover:text-[#f4efe4]"
      >
        {copied ? <Check className="w-3 h-3 text-[#1e3a2b]" /> : <Copy className="w-3 h-3" />}
      </button>
    </div>
  );
};

const PLATFORM_STATS = [
  { label: "APIs live today", value: "0", icon: Code, color: "#06b6d4" },
  { label: "Free tier once live", value: "1,000", icon: Activity, color: "#10b981" },
  { label: "User data stored", value: "None", icon: Shield, color: "#ec4899" },
  { label: "UK legal structure", value: "CIC", icon: Building, color: "#f59e0b" },
];

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
    <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative">

      {/* HERO */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#b3261e] font-mono text-xs tracking-widest mb-6 uppercase">UF51 Open Platform · API Documentation</p>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            API keys.<br />
            <span className="text-[#b3261e]">No sales call. No pretending.</span>
          </h1>
          <p className="text-lg text-[#6b6258] max-w-2xl mx-auto leading-relaxed mb-4">
            Three APIs — AI tutoring, healing frequencies, litter intelligence — are in closed beta. Ask for a key and it lands in your inbox with the exact endpoint for what you are building. Nothing here is live yet, and this page will not say otherwise.
          </p>
          <p className="text-[#6b6258] text-sm">
            UF51 is a UK-registered Community Interest Company. The intent is permanent: open endpoints, free tier, no sales call. Subscription products fund the infrastructure.
          </p>
        </motion.div>
      </div>

      {/* LIVE STATS BAR */}
      <div className="border-y border-[#1a1612]/15 bg-[#efe7d6] py-6 mb-0">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {PLATFORM_STATS.map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: stat.color + '20' }}>
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-[#1a1612] font-black text-lg leading-none">{stat.value}</p>
                  <p className="text-[#6b6258] text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20 pt-16">

        {/* GET YOUR API KEY — instant */}
        <div className="mb-24">
          <h2 className="text-3xl font-black mb-2 text-[#1a1612]">Get your API key.</h2>
          <p className="text-[#6b6258] mb-8">Fill this in. Key hits your inbox instantly. No waiting. No sales call.</p>

          <div className="border-2 border-[#1a1612]/15 p-8 bg-[#efe7d6]">
            <AnimatePresence mode="wait">
              {keyDone ? (
                <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                  <Key className="w-12 h-12 text-[#b3261e] mx-auto mb-4" />
                  <h3 className="text-2xl font-black mb-2 text-[#1a1612]">Key sent.</h3>
                  <p className="text-[#6b6258]">Check your inbox — your API key is there now. Reply with any questions.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleKeyRequest} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#6b6258] font-mono block mb-1">YOUR NAME</label>
                      <input
                        required
                        value={keyForm.name}
                        onChange={e => setKeyForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full bg-[#f4efe4] border border-[#1a1612]/20 px-4 py-3 text-[#1a1612] text-sm focus:border-[#b3261e] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#6b6258] font-mono block mb-1">YOUR EMAIL</label>
                      <input
                        required
                        type="email"
                        value={keyForm.email}
                        onChange={e => setKeyForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@yourproject.com"
                        className="w-full bg-[#f4efe4] border border-[#1a1612]/20 px-4 py-3 text-[#1a1612] text-sm focus:border-[#b3261e] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#6b6258] font-mono block mb-1">WHICH API</label>
                    <select
                      value={keyForm.which_api}
                      onChange={e => setKeyForm(f => ({ ...f, which_api: e.target.value }))}
                      className="w-full bg-[#f4efe4] border border-[#1a1612]/20 px-4 py-3 text-[#1a1612] text-sm focus:border-[#b3261e] focus:outline-none"
                    >
                      <option value="learn51">Learn51 AI — tutoring engine</option>
                      <option value="frequencies">Healing Frequencies — 500+ protocols</option>
                      <option value="cleanup">Cleanup Intelligence — litter AI</option>
                      <option value="all">All APIs</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#6b6258] font-mono block mb-1">WHAT ARE YOU BUILDING?</label>
                    <textarea
                      required
                      value={keyForm.what_building}
                      onChange={e => setKeyForm(f => ({ ...f, what_building: e.target.value }))}
                      placeholder="One sentence is fine. Who's it for, what does it do."
                      rows={3}
                      className="w-full bg-[#f4efe4] border border-[#1a1612]/20 px-4 py-3 text-[#1a1612] text-sm focus:border-[#b3261e] focus:outline-none resize-none"
                    />
                  </div>
                  {keyError && <p className="text-[#b3261e] text-sm">{keyError}</p>}
                  <div className="flex items-center justify-between">
                    <p className="text-[#6b6258] text-xs">Free. 1,000 req/month. Key tied to stated purpose.</p>
                    <button
                      type="submit"
                      disabled={keyLoading}
                      className="flex items-center gap-2 px-6 py-3 bg-[#b3261e] text-[#f4efe4] font-black hover:bg-[#1a1612] transition-all disabled:opacity-50"
                    >
                      {keyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {keyLoading ? 'Sending…' : 'Get my key'}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm text-[#6b6258]">
            <div className="border border-[#1a1612]/15 p-4"><span className="text-[#1a1612] font-bold block">Free tier</span>1,000 requests/month. No cost. No catch.</div>
            <div className="border border-[#1a1612]/15 p-4"><span className="text-[#1a1612] font-bold block">Instant</span>Key in your inbox before you close this tab.</div>
            <div className="border border-[#1a1612]/15 p-4"><span className="text-[#1a1612] font-bold block">Rate limit hit?</span>Email us. If it's good, we'll sort it.</div>
          </div>
        </div>

        {/* THE HONEST SPLIT */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          
          {/* OPEN */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="border-2 border-[#1e3a2b]/30 p-8 bg-[#efe7d6]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#1e3a2b] animate-pulse" />
              <span className="text-[#1e3a2b] font-mono text-sm font-bold tracking-widest">OPEN FOREVER</span>
            </div>
            <h2 className="text-2xl font-black mb-4 text-[#1a1612]">Open APIs.</h2>
            <p className="text-[#6b6258] mb-6">
              Three production APIs. Free tier at 1,000 req/month. Standard REST. No proprietary SDK. Key issued instantly on request.
            </p>
            <ul className="space-y-2">
              {['Learn51 AI tutoring engine', 'Healing frequency database', 'Litter cleanup AI', 'AI51 ethical layer (2026)'].map(item => (
                <li key={item} className="flex items-center gap-2 text-[#1a1612] text-sm">
                  <CheckCircle className="w-4 h-4 text-[#1e3a2b] flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* PROTECTED */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="border-2 border-[#b8860b]/30 p-8 bg-[#efe7d6]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#b8860b]" />
              <span className="text-[#b8860b] font-mono text-sm font-bold tracking-widest">FUNDS EVERYTHING</span>
            </div>
            <h2 className="text-2xl font-black mb-4 text-[#1a1612]">Paid products.</h2>
            <p className="text-[#6b6258] mb-6">
              SORTED, PetSounds51, CB51 — subscription SaaS. Revenue from these funds the open APIs and infrastructure.
            </p>
            <ul className="space-y-3">
              {CLOSED_PRODUCTS.map(p => (
                <li key={p.name} className="text-sm flex items-start justify-between gap-4">
                  <div>
                    <span className="font-bold text-[#1a1612]">{p.name}</span>
                    <span className="text-[#6b6258] block text-xs mt-0.5">{p.why}</span>
                  </div>
                  <span className="text-[#6b6258] text-xs font-mono flex-shrink-0">{p.price}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* OPEN APIs */}
        <div className="mb-24">
          <h2 className="text-3xl font-black mb-2 text-[#1a1612]">Open APIs.</h2>
          <p className="text-[#6b6258] mb-10">No enterprise sales call. No pricing tiers. Just use it.</p>

          {/* API selector */}
          <div className="flex flex-wrap gap-3 mb-8">
            {OPEN_APIS.map((api, i) => (
              <button
                key={api.name}
                onClick={() => setActiveApi(i)}
                className={`px-4 py-2 font-mono text-sm font-bold transition-all border ${
                  activeApi === i
                    ? 'text-[#f4efe4]'
                    : 'bg-transparent text-[#6b6258] border-[#1a1612]/15 hover:border-[#1a1612]/40'
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
            className="border-2 border-[#1a1612]/15 p-8 bg-[#efe7d6]"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-sm px-3 py-1 border" style={{ color: OPEN_APIS[activeApi].color, borderColor: OPEN_APIS[activeApi].color + '40' }}>
                    {OPEN_APIS[activeApi].endpoint}
                  </span>
                  {OPEN_APIS[activeApi].status === 'beta'
                    ? <span className="text-[#b8860b] text-xs font-mono">CLOSED BETA</span>
                    : <span className="text-[#b8860b] text-xs font-mono">COMING 2026</span>
                  }
                </div>
                <h3 className="text-2xl font-black mb-3 text-[#1a1612]">{OPEN_APIS[activeApi].name}</h3>
                <p className="text-[#6b6258] mb-6">{OPEN_APIS[activeApi].description}</p>
                <div className="bg-[#f4efe4] border border-[#1a1612]/10 p-4 mb-3">
                  <p className="text-xs text-[#6b6258] font-mono mb-2">WHAT YOU CAN BUILD</p>
                  <p className="text-[#1a1612] text-sm">{OPEN_APIS[activeApi].what_you_can_build}</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-[#6b6258]">Free tier:</span>
                  <span className="text-[#1a1612] font-bold">{OPEN_APIS[activeApi].free_tier}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#6b6258] font-mono mb-3">EXAMPLE REQUEST</p>
                <CodeBlock code={OPEN_APIS[activeApi].example} />
                <p className="text-xs text-[#6b6258] mt-3">Endpoints are in closed beta — the live URL ships with your key. Email us first.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* WHO THIS IS FOR */}
        <div className="mb-24">
          <h2 className="text-3xl font-black mb-2 text-[#1a1612]">Who this is for.</h2>
          <p className="text-[#6b6258] mb-10">If you're building something that helps people — this is for you.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {WHO_ITS_FOR.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.who}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 border border-[#1a1612]/15 p-5 hover:border-[#b3261e]/40 transition-all"
                >
                  <Icon className="w-5 h-5 text-[#b3261e] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-black mb-1 text-[#1a1612]">{item.who}</h3>
                    <p className="text-[#6b6258] text-sm">{item.what}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* HOW WE KEEP IT SAFE — legal & ethical */}
        <div className="mb-24">
          <h2 className="text-3xl font-black mb-2 text-[#1a1612]">How we keep it safe.</h2>
          <p className="text-[#6b6258] mb-2">Open doesn't mean unguarded.</p>
          <div className="border border-[#1a1612]/15 p-5 bg-[#efe7d6] mb-10">
            <p className="text-[#6b6258] text-xs font-mono mb-3">LEGAL COMPLIANCE</p>
            <div className="grid md:grid-cols-2 gap-3 text-xs text-[#6b6258]">
              <div><span className="text-[#1a1612] font-bold block mb-1">UK & EU</span>UK GDPR compliant. EU AI Act aligned. Data processed under UK adequacy decisions. No EEA transfer without safeguards.</div>
              <div><span className="text-[#1a1612] font-bold block mb-1">USA</span>CCPA compliant for California users. No sale of personal data. No user profiling. COPPA compliant — no data collected from under-13s.</div>
              <div><span className="text-[#1a1612] font-bold block mb-1">Global</span>We do not collect, store, or process biometric data. No cross-border data transfer without legal basis. API keys tied to a named responsible party in every jurisdiction.</div>
              <div><span className="text-[#1a1612] font-bold block mb-1">Questions?</span>If your jurisdiction has specific AI or data law requirements, email us before integrating. We'll work through it. <a href="mailto:family@uf51.love?subject=Legal Compliance" className="text-[#b3261e] hover:text-[#1a1612]">family@uf51.love</a></div>
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
                title: "Open source — being published",
                body: "The commitment is AGPL-3.0: no patent, no proprietary core, no lock on it. The repository is being opened, and this page links to it the day it lands. Then any researcher can read the values filter and verify it works, and any developer can fork it and make it stricter. Until that day the covenant is a written promise — and we say so, rather than claim a repository you cannot open.",
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
                  className="flex gap-6 border border-[#1a1612]/15 p-6 hover:border-[#1a1612]/40 transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: layer.color + '20', color: layer.color }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg mb-2 text-[#1a1612]">{layer.title}</h3>
                    <p className="text-[#6b6258] text-sm leading-relaxed">{layer.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-8 border border-[#1a1612]/15 p-6 bg-[#efe7d6] text-center">
            <p className="text-[#6b6258] text-sm">The honest caveat: <span className="text-[#1a1612]">no system is perfect. If you find a gap in our legal compliance or safety — tell us. We'd rather be corrected than wrong.</span></p>
            <a href="mailto:family@uf51.love?subject=Safety Gap" className="text-[#b3261e] text-sm font-bold mt-2 inline-block hover:text-[#1a1612] transition-colors">family@uf51.love — subject: Safety Gap</a>
          </div>
        </div>

        {/* THE HONEST BIT */}
        <div className="border-2 border-[#1a1612]/15 p-10 mb-24 bg-[#efe7d6]">
          <h2 className="text-2xl font-black mb-6 text-[#1a1612]">How the model works.</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="border border-[#1a1612]/15 p-5">
              <p className="text-[#b3261e] font-mono text-xs mb-2">OPEN APIs</p>
              <p className="font-bold mb-1 text-[#1a1612]">Free, once live.</p>
              <p className="text-[#6b6258]">Learn51, Frequencies, Cleanup Intelligence — all three in closed beta today. 1,000 req/month free when they open. Key tied to stated purpose.</p>
            </div>
            <div className="border border-[#1a1612]/15 p-5">
              <p className="text-[#b8860b] font-mono text-xs mb-2">SUBSCRIPTIONS</p>
              <p className="font-bold mb-1 text-[#1a1612]">Fund the open layer.</p>
              <p className="text-[#6b6258]">SORTED, PetSounds51, CB51 are paid products. Revenue covers infrastructure and keeps the free tier running.</p>
            </div>
            <div className="border border-[#1a1612]/15 p-5">
              <p className="text-[#1e3a2b] font-mono text-xs mb-2">LEGAL STRUCTURE</p>
              <p className="font-bold mb-1 text-[#1a1612]">CIC — locked by law.</p>
              <p className="text-[#6b6258]">Registered at Companies House. Asset lock prevents the mission being changed by any future owner or acquirer.</p>
            </div>
          </div>
        </div>

        {/* FOUNDERS — Stripe powered */}
        <div className="mb-24" id="support-section">
          <div className="border-2 border-[#b3261e]/20 p-10 bg-[#efe7d6]">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-[#b3261e] font-mono text-xs tracking-widest mb-4">NO ACCOUNT REQUIRED · STRIPE-POWERED</p>
              <h2 className="text-3xl font-black mb-4 text-[#1a1612]">Support the open layer.</h2>
              {supported ? (
                <div className="py-6 mb-6">
                  <CheckCircle className="w-12 h-12 text-[#1e3a2b] mx-auto mb-3" />
                  <p className="text-[#1e3a2b] font-black text-xl">Thank you. Seriously.</p>
                  <p className="text-[#6b6258] mt-2">You're keeping the open layer alive for everyone who can't afford it.</p>
                </div>
              ) : null}
              <p className="text-[#6b6258] text-base leading-relaxed mb-8">
                The open APIs run on real infrastructure. If you use them and want to contribute, this is how. One-time. Any currency. No account needed.
              </p>

              {/* Currency picker */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {CURRENCIES.map(c => (
                  <button
                    key={c.code}
                    onClick={() => setCurrency(c.code)}
                    className={`px-3 py-1.5 text-xs font-black transition-all border ${currency === c.code ? 'bg-[#b3261e] border-[#b3261e] text-[#f4efe4]' : 'border-[#1a1612]/15 text-[#6b6258] hover:border-[#1a1612]/40 hover:text-[#1a1612]'}`}
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
                    className="border border-[#1a1612]/15 hover:border-[#b3261e]/60 py-3 font-black text-sm transition-all hover:bg-[#b3261e]/5 disabled:opacity-50 flex items-center justify-center"
                  >
                    {supportLoading === `quick_${amt}` ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#b3261e]" />
                    ) : (
                      <span className="text-[#b3261e]">{activeCurrency.symbol}{amt}</span>
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
                    className="border border-[#1a1612]/15 hover:border-[#b3261e]/60 py-3 text-center transition-all hover:bg-[#b3261e]/5 disabled:opacity-50 flex items-center justify-center"
                  >
                    {supportLoading === `big_${amt}` ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#b3261e]" />
                    ) : (
                      <span className="font-black text-[#b3261e]">{activeCurrency.symbol}{amt.toLocaleString()}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="border border-[#1a1612]/15 p-4 mb-4">
                <p className="text-xs text-[#6b6258] font-mono mb-3">YOUR OWN AMOUNT</p>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 flex-1 bg-[#f4efe4] border border-[#1a1612]/20 px-4">
                    <span className="text-[#6b6258] font-bold">{activeCurrency.symbol}</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={customAmount}
                      onChange={e => setCustomAmount(e.target.value)}
                      placeholder="Any amount"
                      className="flex-1 bg-transparent py-3 text-[#1a1612] text-sm focus:outline-none"
                    />
                    <span className="text-[#6b6258] text-xs font-mono">{activeCurrency.label}</span>
                  </div>
                  <button
                    onClick={handleCustomDonate}
                    disabled={!customAmount || !!supportLoading}
                    className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-black rounded-lg transition-all disabled:opacity-40 flex items-center gap-2"
                  >
                    {supportLoading === 'custom' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {supportLoading === 'custom' ? '…' : 'Contribute'}
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-xs">Any amount. Any currency. No account needed.</p>

              <p className="text-gray-600 text-xs mt-6">Powered by Stripe. Card, Apple Pay, Google Pay accepted.</p>
            </div>
          </div>
        </div>

        {/* SDK / QUICK START */}
        <div className="mb-24">
          <h2 className="text-3xl font-black mb-2">Quick start.</h2>
          <p className="text-gray-500 mb-8">Three lines. That's all it takes to get your first response.</p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { step: "01", title: "Get your key", desc: "Fill the form above. Key in your inbox in seconds.", icon: Key, color: "#06b6d4" },
              { step: "02", title: "Make a request", desc: "Standard REST. Bearer token. JSON in, JSON out. No SDK needed.", icon: Terminal, color: "#10b981" },
              { step: "03", title: "Ship it", desc: "Rate limits are generous. Hit them? Email us. We'll sort it.", icon: Zap, color: "#f59e0b" },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-gray-600">{s.step}</span>
                    <Icon className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                  <h3 className="font-black mb-1">{s.title}</h3>
                  <p className="text-gray-400 text-sm">{s.desc}</p>
                </div>
              );
            })}
          </div>
          <CodeBlock code={`// Example: healing frequency lookup\nconst res = await fetch('<endpoint from your key>', {\n  method: 'POST',\n  headers: {\n    'Authorization': 'Bearer uf51_your_key_here',\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({ condition: 'sleep', species: 'human' })\n});\n\nconst { frequencies, protocols } = await res.json();\n// → [{hz: 432, name: "Deep Sleep", duration_mins: 20}, ...]`} />
        </div>

        {/* CHANGELOG */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-2">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <h2 className="text-3xl font-black">Changelog.</h2>
          </div>
          <p className="text-gray-500 mb-8">What's shipped. What's coming. No hype — just what's real.</p>
          <div className="space-y-3">
            {[
              { date: "Apr 2026", tag: "LIVE", tagColor: "#10b981", title: "Learn51 AI — tutoring engine open", desc: "Socratic method. Multi-language. No data stored. Free tier: 1,000 req/month." },
              { date: "Apr 2026", tag: "LIVE", tagColor: "#10b981", title: "Healing Frequencies API open", desc: "500+ scientifically referenced protocols. Sleep, pain, anxiety, focus. Human and animal." },
              { date: "Apr 2026", tag: "LIVE", tagColor: "#10b981", title: "Cleanup Intelligence API open", desc: "AI litter verification, weight estimation, corporate brand accountability. IPFS-backed." },
              { date: "Apr 2026", tag: "LIVE", tagColor: "#10b981", title: "API key auto-issuance", desc: "Fill the form. Key in your inbox instantly. No waiting. No sales call." },
              { date: "Q3 2026", tag: "COMING", tagColor: "#f59e0b", title: "AI51 Core — ethical AI layer", desc: "Same API shape as OpenAI. Zero extraction. Your users' data never leaves." },
              { date: "Q3 2026", tag: "COMING", tagColor: "#f59e0b", title: "OpenAPI / Swagger spec", desc: "Full machine-readable spec. Postman collection. TypeScript types. All generated." },
              { date: "Q4 2026", tag: "COMING", tagColor: "#8b5cf6", title: "Developer dashboard", desc: "Usage metrics, rate limit tracking, key rotation — all in one place. No login friction." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex gap-4 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <p className="text-gray-600 text-xs font-mono">{item.date}</p>
                </div>
                <div className="w-px bg-white/10 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-black px-2 py-0.5 rounded" style={{ color: item.tagColor, backgroundColor: item.tagColor + '15' }}>{item.tag}</span>
                    <h3 className="font-bold text-sm">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}
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
              Questions or<br />
              <span className="text-cyan-400">higher rate limits?</span>
            </h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
              Email what you're building, your expected request volume, and your use case. We'll respond within 24 hours.
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