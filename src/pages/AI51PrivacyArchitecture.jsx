import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, EyeOff, ExternalLink, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Cpu, Globe, Database, Zap, ArrowDown } from 'lucide-react';

const STACK_LAYERS = [
  {
    id: 'device',
    label: 'YOUR DEVICE',
    sublabel: 'Encryption happens here. Before anything leaves.',
    color: '#22c55e',
    proof: {
      claim: 'End-to-end encryption before transmission',
      how: 'AES-256-GCM client-side encryption. The plaintext never leaves your device. Only ciphertext travels the wire.',
      verify: 'Open browser devtools → Network tab → inspect any AI51 request. The payload is ciphertext.',
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
      claim: 'Zero data retention on all API queries',
      how: "Brave's search index is independently crawled — not licensed from Google or Bing. Their API has a published zero-retention policy: queries are not logged, not stored, not sold.",
      verify: 'Read the policy directly.',
      link: 'https://brave.com/search/api/',
      linkText: 'Brave Search API — Zero Retention Policy ↗',
    },
    icon: Globe,
  },
  {
    id: 'enclave',
    label: 'AWS NITRO ENCLAVE',
    sublabel: 'Hardware-isolated. AWS cannot see inside. We cannot see inside.',
    color: '#06b6d4',
    proof: {
      claim: 'Cryptographic attestation — mathematically verifiable isolation',
      how: "Nitro Enclaves are stripped-down virtual machines with no persistent storage, no operator access, no external networking. AWS generates a signed attestation document proving the enclave's identity and integrity. No human — including AWS engineers — can access the enclave memory.",
      verify: 'Request the attestation document. Verify the signature against AWS root CA.',
      link: 'https://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave-concepts.html',
      linkText: 'AWS Nitro Enclave — Attestation Docs ↗',
    },
    icon: Cpu,
  },
  {
    id: 'ai51',
    label: 'AI51 INFERENCE',
    sublabel: 'Runs inside the enclave. In the dark. For you only.',
    color: '#a855f7',
    proof: {
      claim: 'AI inference runs in sealed hardware — no operator visibility',
      how: 'The model weights and your query meet inside the enclave and nowhere else. No logs. No training on your data. The enclave is destroyed after every session. What happened inside is cryptographically unreachable.',
      verify: 'The enclave attestation document proves what code is running. Nothing else can run in that environment.',
      link: null,
      linkText: null,
    },
    icon: Zap,
  },
  {
    id: 'ipfs',
    label: 'IPFS KNOWLEDGE LIBRARY',
    sublabel: 'Content-addressed. Tamper-evident. Survives AI51 disappearing.',
    color: '#ec4899',
    proof: {
      claim: 'Knowledge base is cryptographically verifiable and decentralised',
      how: 'Every document in the AI51 knowledge library is stored on IPFS with a content hash (CID). If the content changes by one bit, the CID changes. No central server to pressure, no single throat to choke. The library exists as long as any node pins it.',
      verify: 'Fetch any CID directly from any IPFS gateway. The content is the proof.',
      link: 'https://docs.ipfs.tech/concepts/content-addressing/',
      linkText: 'IPFS — Content Addressing Explained ↗',
    },
    icon: Database,
  },
  {
    id: 'output',
    label: 'YOUR ANSWER',
    sublabel: 'Arrives encrypted. Decrypted only on your device.',
    color: '#22c55e',
    proof: {
      claim: 'Response decryption happens client-side only',
      how: 'The enclave encrypts the response before it exits. It decrypts on your device. In transit it is ciphertext. At rest on our servers: nothing. There is no "our servers" for your data.',
      verify: 'Network tab again. The response payload is ciphertext until your device decrypts it locally.',
      link: null,
      linkText: null,
    },
    icon: Shield,
  },
];

const TRUST_COMPARISONS = [
  { claim: '"We don\'t sell your data"', type: 'promise', label: 'Promise' },
  { claim: '"Our privacy policy says..."', type: 'promise', label: 'Legal text' },
  { claim: '"We\'re SOC2 compliant"', type: 'audit', label: 'Audit' },
  { claim: 'Cryptographic attestation + verifiable architecture', type: 'proof', label: 'Mathematical proof' },
];

const AGLET_MOMENT = {
  year: 1995,
  who: 'IBM Research',
  what: 'Aglets — mobile software agents that travel to you, not the other way round',
  why_died: 'No way to verify what the agent had seen, done, or become in transit. Trust was impossible to establish mathematically.',
  how_we_solved: 'AWS Nitro attestation + IPFS content addressing + client-side encryption = the first provably trustworthy agent substrate. Thirty years later.',
};

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
            <span className="text-xs font-mono text-gray-500 hidden sm:block">VERIFY ↓</span>
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
              <div className="text-xs font-mono text-gray-500 mb-1">CLAIM</div>
              <div className="text-white font-bold text-sm">{layer.proof.claim}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-gray-500 mb-1">HOW IT WORKS</div>
              <div className="text-gray-300 text-sm leading-relaxed">{layer.proof.how}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-gray-500 mb-1">HOW TO VERIFY IT YOURSELF</div>
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
            ZERO TRUST ARCHITECTURE
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Not "privacy-focused."<br />
            <span className="text-cyan-400">Mathematically private.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Every layer is independently verifiable. We're not asking you to trust us. We're showing you why you don't need to.
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
          <div className="text-xs font-mono text-gray-500 tracking-widest mb-4">THE STACK — CLICK EACH LAYER TO VERIFY</div>
          {STACK_LAYERS.map((layer, i) => (
            <StackLayer key={layer.id} layer={layer} index={i} isLast={i === STACK_LAYERS.length - 1} />
          ))}
        </div>

        {/* THE AGLET MOMENT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border border-purple-500/30 rounded-2xl p-6 bg-purple-500/5 space-y-4"
        >
          <div className="text-xs font-mono text-purple-400 tracking-widest">THE {AGLET_MOMENT.year} PROBLEM — SOLVED</div>
          <h2 className="text-2xl font-black text-white">IBM had this idea thirty years ago.</h2>
          <p className="text-gray-300 leading-relaxed">
            <span className="text-purple-300 font-bold">Aglets.</span> Mobile software agents that travel to you, not the other way round. Code that runs where the data lives. It died for one reason: <span className="text-white font-bold">there was no way to verify what the agent had seen, done, or become in transit.</span> Trust was mathematically impossible.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Nitro attestation + IPFS content addressing + client-side encryption = the first provably trustworthy agent substrate. <span className="text-purple-300 font-bold">Every other AI — every agent, every model — can now run through AI51's privacy envelope.</span> Not competing with them. Being the trusted layer they all need.
          </p>
          <div className="flex items-center gap-2 text-sm text-purple-400 font-mono">
            <Zap className="w-4 h-4" />
            AI51 is not an AI. It is the trust layer for all AI.
          </div>
        </motion.div>

        {/* THE SINGLE THROAT SECTION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border border-orange-500/30 rounded-2xl p-6 bg-orange-500/5 space-y-4"
        >
          <div className="text-xs font-mono text-orange-400 tracking-widest">THE "ONE BAD ACTOR" PROBLEM</div>
          <h2 className="text-2xl font-black text-white">No single throat to choke.</h2>
          <div className="space-y-3">
            {[
              { label: 'Brave Search Index', detail: 'Independently crawled. No government can pressure one company to change what AI51 knows. Not Google. Not Bing. Brave.' },
              { label: 'IPFS Knowledge Library', detail: 'Content-addressed, decentralised. If AI51 the company disappears tomorrow, the knowledge library persists — intact, verifiable by hash, pinned across the network.' },
              { label: 'Nitro Attestation', detail: "AWS cannot modify what runs in the enclave without breaking the attestation signature. Not even AWS. The math doesn't care about legal pressure." },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-white font-bold text-sm">{item.label}</div>
                  <div className="text-gray-400 text-sm mt-0.5">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-orange-300 font-bold text-sm font-mono mt-4">
            This is the first AI that gets stronger when its creators disappear.
          </p>
        </motion.div>

        {/* FOR SCEPTICS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border border-white/10 rounded-2xl p-6 space-y-4"
        >
          <div className="text-xs font-mono text-gray-500 tracking-widest">FOR THE TECHNICALLY SCEPTICAL</div>
          <h2 className="text-xl font-black text-white">Things you should be asking.</h2>
          <div className="space-y-4">
            {[
              { q: 'What if AI51 lies about using Nitro Enclaves?', a: 'Request the attestation document. The signature is issued by AWS root CA. You can verify it independently. We cannot forge it.' },
              { q: 'What if Brave changes their retention policy?', a: "That's why the architecture doesn't rely on trust — it relies on APIs with published, versioned policies. If Brave changes, the API changes. You'd see it." },
              { q: 'What about the model weights — could they exfiltrate data?', a: 'The enclave has no outbound network access except to the encrypted response channel. The architecture document details every permitted syscall. Read it.' },
              { q: 'What if governments compel you?', a: "We genuinely cannot comply. We have no data to hand over. The enclave destroys session state. IPFS is decentralised. We aren't being brave — we're being architects." },
            ].map((item, i) => (
              <div key={i} className="border-l-2 border-cyan-500/30 pl-4 space-y-1">
                <div className="text-white font-bold text-sm">{item.q}</div>
                <div className="text-gray-400 text-sm">{item.a}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FOOTER CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center space-y-4 pb-8"
        >
          <p className="text-gray-500 text-sm font-mono">No claims. No promises. Just architecture.</p>
          <p className="text-gray-600 text-xs">Verify everything above independently. That's the point.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <a
              href="https://docs.aws.amazon.com/enclaves/latest/user/nitro-enclave-concepts.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm font-mono hover:bg-cyan-500/10 transition-all"
            >
              <ExternalLink className="w-3 h-3" />
              AWS Nitro Docs
            </a>
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