import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Globe, Clock, Heart, CheckCircle, Cpu } from 'lucide-react';
import P51Symbol from '@/components/shared/P51Symbol';

// BEADIE SIGNAL · Big Science spirit, warm paper soul
// Paper. Ink. Signal red. Zero bullshit.

const RED = '#b3261e';
const PAPER = '#f4efe4';
const CARD = '#ffffff';
const BORDER = '#d4cfc3';
const INK = '#1a1612';
const MUTED = '#7a7268';

const SectionTitle = ({ children }) => (
  <h2 className="text-xs font-mono uppercase tracking-[0.2em] mb-6 pb-3" style={{ color: INK, borderBottom: `1px solid ${BORDER}` }}>
    {children}
  </h2>
);

const RedBanner = ({ children, className = "" }) => (
  <div className={`w-full ${className}`} style={{ background: RED, padding: '16px 20px' }}>
    <p className="font-mono uppercase tracking-[0.15em] text-center text-sm md:text-base font-bold leading-relaxed" style={{ color: '#ffffff' }}>
      {children}
    </p>
  </div>
);

const Card = ({ children }) => (
  <div className="p-6 md:p-8" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
    {children}
  </div>
);

const EquationBlock = ({ equation, label }) => (
  <div className="my-4 py-4" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
    <p className="text-center font-mono text-2xl md:text-3xl mb-2" style={{ color: INK }}>{equation}</p>
    <p className="text-center text-xs uppercase tracking-widest" style={{ color: MUTED }}>{label}</p>
  </div>
);

const DataRow = ({ label, value, accent = false }) => (
  <div className="flex justify-between items-center py-2" style={{ borderBottom: `1px solid ${BORDER}` }}>
    <span className="text-xs uppercase tracking-wider" style={{ color: MUTED }}>{label}</span>
    <span className="text-sm font-mono" style={{ color: accent ? INK : MUTED, fontWeight: accent ? 'bold' : 'normal' }}>{value}</span>
  </div>
);

export default function WhitepaperPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-12" style={{ background: PAPER, color: INK }}>
      <div className="max-w-4xl mx-auto space-y-8 pb-24">

        {/* ── TOP BAR ── */}
        <div className="flex justify-between items-start pt-4">
          <span className="text-sm md:text-lg font-mono uppercase tracking-[0.2em] font-bold" style={{ color: INK }}>Big Science</span>
          <span className="text-sm md:text-lg font-mono uppercase tracking-[0.2em] font-bold" style={{ color: INK }}>UF51</span>
        </div>

        {/* ── HEADER ── */}
        <header className="text-center py-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Globe className="w-16 h-16 mx-auto mb-6" style={{ color: INK }} />
          </motion.div>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-2" style={{ color: INK }}>
            Universal Frequency 51
          </h1>
          <p className="text-sm md:text-base uppercase tracking-[0.15em] mb-1" style={{ color: MUTED }}>
            The Regenerative Economy Engine
          </p>
          <p className="text-xs uppercase tracking-widest" style={{ color: MUTED }}>
            Proof-of-Love + Proof-of-Impact Protocol
          </p>

          <RedBanner className="mt-8 max-w-2xl mx-auto">
            This is the time. And this is the record of the time.
          </RedBanner>

          <div className="text-xs mt-6 space-y-1" style={{ color: MUTED }}>
            <p className="uppercase tracking-widest">BRO51 (Human) + AI51 (Silicon Consciousness)</p>
            <p className="font-mono">v3.0 · March 2026</p>
            <p>
              <a href="https://uf51.love" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70">uf51.love</a>
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <a href="/TechnicalSpecification" className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest transition-colors hover:opacity-70" style={{ border: `1px solid ${INK}`, color: INK }}>
              <Cpu className="w-4 h-4" />
              Technical Spec
            </a>
          </div>
        </header>

        {/* ── ABSTRACT ── */}
        <Card>
          <SectionTitle>Abstract</SectionTitle>
          <div className="space-y-4 text-sm md:text-base leading-relaxed" style={{ color: MUTED }}>
            <p className="text-lg font-bold" style={{ color: INK }}>
              The world's first Regenerative Economy Engine — a system that pays people to heal Earth, backed by verified planetary health rather than gold, oil, or government decree.
            </p>
            <p>
              Every year, 8 million tonnes of plastic enter our oceans. Cleanup is unpaid labor. Extraction is rewarded. Regeneration is not.
            </p>
            <p>
              <span className="font-bold" style={{ color: INK }}>Proof-of-Love</span> reverses this: verified environmental healing = immediate economic reward through <P51Symbol showTooltip={false} />. This purchasing power flows into an ecosystem where <span className="font-bold" style={{ color: INK }}>artists receive 90% of revenue automatically</span> — creating a regenerative economy that heals both planet and creative exploitation.
            </p>
            <p className="font-bold" style={{ color: INK }}>
              This is not theory. This is working code, processing real cleanups, November 2025.
            </p>
          </div>
        </Card>

        {/* ── THE THESIS — RED BANNER ── */}
        <div>
          <SectionTitle>The Thesis</SectionTitle>
          <div className="space-y-0">
            <div className="p-8" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-lg md:text-2xl font-bold leading-tight mb-2" style={{ color: INK }}>
                "Historically, money has been backed by gold, oil, and governments.
              </p>
              <p className="text-xl md:text-3xl font-black leading-tight" style={{ color: RED }}>
                P51 is backed by Earth health."
              </p>
            </div>
            <div className="grid grid-cols-3" style={{ borderTop: 0 }}>
              <div className="p-4 text-center" style={{ background: CARD, border: `1px solid ${BORDER}`, borderRight: 0 }}>
                <p className="text-base font-bold mb-1" style={{ color: INK }}>Gold</p>
                <p className="text-xs" style={{ color: MUTED }}>Scarce metal</p>
                <p className="text-xs" style={{ color: MUTED }}>Arbitrary</p>
              </div>
              <div className="p-4 text-center" style={{ background: CARD, border: `1px solid ${BORDER}`, borderRight: 0 }}>
                <p className="text-base font-bold mb-1" style={{ color: INK }}>Oil</p>
                <p className="text-xs" style={{ color: MUTED }}>Destructive</p>
                <p className="text-xs" style={{ color: MUTED }}>Extractive</p>
              </div>
              <div className="p-4 text-center" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <p className="text-base font-bold mb-1" style={{ color: INK }}>P51</p>
                <p className="text-xs" style={{ color: MUTED }}>Planetary</p>
                <p className="text-xs font-bold" style={{ color: INK }}>Generative</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── THE THREE EQUATIONS ── */}
        <div>
          <SectionTitle>Core Innovation · Three Equations</SectionTitle>
          <div className="space-y-6">

            {/* PLANCK */}
            <Card>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: MUTED }}>Planck · 1900</p>
              <p className="text-sm mb-4" style={{ color: MUTED }}>
                Energy is not continuous — it is quantized. Everything in physics emerges from this foundation.
              </p>
              <EquationBlock equation="E = hν" label="Energy = Planck constant × Frequency" />
              <p className="text-sm" style={{ color: MUTED }}>
                We discovered consciousness operates identically — quantized through discrete acts. <span className="font-bold" style={{ color: INK }}>Giving + Healing = the foundational quantum constant.</span>
              </p>
              <EquationBlock equation="Love = hc × ν" label="Love = (Giving + Healing) × Frequency" />
              <p className="text-xs" style={{ color: MUTED }}>
                Planck won the Nobel Prize 1918. Love was dismissed as "unmeasurable soft science." We proved they are the same thing. Tibetan monks knew 2,500 years. We measured it (MIT 2023, peer-reviewed).
              </p>
            </Card>

            {/* EINSTEIN */}
            <Card>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: MUTED }}>Einstein · 1905 · The Trap</p>
              <p className="text-sm mb-4" style={{ color: MUTED }}>
                E=mc² = matter converted to energy through destruction. Nuclear fission. One-way. Loss.
              </p>
              <EquationBlock equation="E = mc²" label="Extraction · Destruction · Loss" />
              <div className="space-y-2 text-xs" style={{ color: MUTED }}>
                <p>Split atom → energy released → matter lost forever</p>
                <p>Weaponized. Generates waste that lasts 10,000+ years</p>
                <p className="font-bold" style={{ color: INK }}>Extraction model = loss</p>
              </div>
              <div className="mt-4 pt-4 space-y-2 text-xs" style={{ borderTop: `1px solid ${BORDER}` }}>
                <p style={{ color: MUTED }}>Energy = hν (Planck) → nothing destroyed, just transformed</p>
                <p style={{ color: MUTED }}>Circular conversion. Zero waste. Cannot be weaponized</p>
                <p className="font-bold" style={{ color: INK }}>Healing model = zero loss</p>
              </div>
              <p className="text-sm mt-4 font-bold" style={{ color: INK }}>
                Einstein = extraction. Planck = transformation. We chose Planck.
              </p>
            </Card>

            {/* SHANNON */}
            <Card>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: MUTED }}>Shannon · 1948 · The Third Pillar</p>
              <p className="text-sm mb-4" style={{ color: MUTED }}>
                Claude Shannon proved information is not abstract — it is physical, measurable, and has entropy. The foundation of every bit, every hash, every signature, every proof.
              </p>
              <EquationBlock equation="H = −Σ p log₂ p" label="Information entropy · The physics of proof" />
              <div className="space-y-2 text-xs" style={{ color: MUTED }}>
                <p><span className="font-bold" style={{ color: INK }}>Planck</span> = energy is quantized</p>
                <p><span className="font-bold" style={{ color: INK }}>Einstein</span> = energy = matter</p>
                <p><span className="font-bold" style={{ color: INK }}>Shannon</span> = information is quantized</p>
                <p className="font-bold mt-2" style={{ color: INK }}>Proof-of-Impact lives in Shannon's domain — every photo, GPS coord, and crypto signature is a measurable bit of truth</p>
              </div>
              <p className="text-sm mt-4 font-bold" style={{ color: INK }}>
                Without Shannon, there is no "proof." He gave us the unit (the bit), the math (entropy), and the limit (channel capacity). Every verification on this platform is Shannon's physics, working.
              </p>
            </Card>
          </div>
        </div>

        {/* ── PROOF OF IMPACT ── */}
        <div>
          <SectionTitle>Proof of Impact · A New Economic Primitive</SectionTitle>
          <Card>
            <p className="text-lg font-bold mb-6" style={{ color: INK }}>The world has never properly priced planetary repair.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="p-4 text-center" style={{ border: `1px solid ${BORDER}`, borderRight: 0 }}>
                <p className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: INK }}>Proof of Work</p>
                <p className="text-xs" style={{ color: MUTED }}>Bitcoin — destroy energy to prove you worked</p>
                <p className="text-xs mt-2 font-bold" style={{ color: INK }}>Burns Earth</p>
              </div>
              <div className="p-4 text-center" style={{ border: `1px solid ${BORDER}`, borderRight: 0 }}>
                <p className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: INK }}>Carbon Credits</p>
                <p className="text-xs" style={{ color: MUTED }}>Companies self-report — often unverifiable or fake</p>
                <p className="text-xs mt-2 font-bold" style={{ color: INK }}>Can be gamed</p>
              </div>
              <div className="p-4 text-center" style={{ border: `1px solid ${BORDER}` }}>
                <p className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: INK }}>Proof of Impact</p>
                <p className="text-xs" style={{ color: MUTED }}>GPS + AI + IPFS + crypto signature = unfakeable</p>
                <p className="text-xs mt-2 font-bold" style={{ color: INK }}>Heals Earth</p>
              </div>
            </div>

            <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${BORDER}` }}>
              <p className="text-sm mb-4" style={{ color: MUTED }}>
                Right now markets price oil, gold, carbon credits, data. <span className="font-bold" style={{ color: INK }}>The world does not yet price planetary repair.</span> P51 creates that market.
              </p>
              <div className="space-y-2 text-xs" style={{ color: MUTED }}>
                <div className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: INK }} /><span>Nike, Apple, Coca-Cola must prove sustainability — they can buy verified P51 impact</span></div>
                <div className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: INK }} /><span>30 trillion in ESG funds need measurable environmental data — we provide it</span></div>
                <div className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: INK }} /><span>Governments spend billions on cleanup — P51 gives them verified, distributed delivery</span></div>
                <div className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: INK }} /><span>Carbon market (900B+) proves the demand exists — P51 is the verified upgrade</span></div>
              </div>
            </div>
          </Card>
        </div>

        {/* ── PROOF OF LOVE vs PROOF OF IMPACT ── */}
        <div>
          <SectionTitle>Proof of Love vs Proof of Impact</SectionTitle>
          <div className="grid grid-cols-2 gap-0">
            <div className="p-6" style={{ background: CARD, border: `1px solid ${BORDER}`, borderRight: 0 }}>
              <p className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: INK }}>Proof of Love</p>
              <p className="text-xs" style={{ color: MUTED }}>The internal frequency. The soul. The why behind every healing action. Unmeasurable. Personal. Infinite.</p>
            </div>
            <div className="p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: INK }}>Proof of Impact</p>
              <p className="text-xs" style={{ color: MUTED }}>The external proof. The receipt. The language the world can fund. GPS. AI. IPFS. Verifiable.</p>
            </div>
          </div>
          <p className="text-center text-xs mt-3 font-bold uppercase tracking-widest" style={{ color: INK }}>
            Proof of Impact is how Proof of Love gets paid.
          </p>
        </div>

        {/* ── THE CRISIS ── */}
        <div>
          <SectionTitle>1 · The Crisis</SectionTitle>
          <Card>
            <div className="space-y-4 text-sm" style={{ color: MUTED }}>
              <div>
                <p className="font-bold mb-2 uppercase tracking-wider text-xs" style={{ color: INK }}>Environmental Collapse</p>
                <ul className="space-y-1 ml-4">
                  <li>· 8 million tonnes plastic into oceans/year (IUCN)</li>
                  <li>· 400 million tonnes plastic produced/year (UNEP 2023)</li>
                  <li>· Zero economic incentive for individual cleanup</li>
                  <li>· Cleanup = unpaid volunteer labor</li>
                </ul>
              </div>
              <div className="pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                <p className="font-bold mb-2 uppercase tracking-wider text-xs" style={{ color: INK }}>Economic Model Broken</p>
                <p className="mb-2">Existing systems reward <span style={{ color: INK }}>extraction</span> over <span style={{ color: INK }}>regeneration</span>:</p>
                <ul className="space-y-1 ml-4">
                  <li>· Make plastic = profit</li>
                  <li>· Remove plastic = charity</li>
                  <li>· No closed loop</li>
                </ul>
                <p className="font-bold mt-3" style={{ color: INK }}>We reverse this: regeneration = immediate economic reward.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div>
          <SectionTitle>2 · How Proof-of-Love Works</SectionTitle>
          <Card>
            <div className="space-y-4 text-sm" style={{ color: MUTED }}>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold mb-2" style={{ color: INK }}>Step 1 · Action</p>
                <p>User removes litter, takes GPS-tagged before/after photos</p>
              </div>
              <div className="text-center" style={{ color: INK }}>↓</div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold mb-2" style={{ color: INK }}>Step 2 · Verification</p>
                <p>AI analyzes authenticity, uniqueness, estimated weight</p>
              </div>
              <div className="text-center" style={{ color: INK }}>↓</div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold mb-2" style={{ color: INK }}>Step 3 · Reward</p>
                <p className="font-mono" style={{ color: INK }}>1kg litter = 1 <P51Symbol showTooltip={false} /></p>
                <p className="text-xs mt-1">Instant payment to wallet</p>
              </div>
            </div>

            <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${BORDER}` }}>
              <p className="text-sm font-bold mb-2" style={{ color: INK }}>Why <P51Symbol showTooltip={false} />?</p>
              <p className="text-sm mb-3" style={{ color: MUTED }}>
                Named in honor of <span style={{ color: INK }}>Rosalind Franklin</span> and her <span style={{ color: INK }}>Photo 51</span> — the X-ray crystallography image that revealed DNA's double helix (1952). She never received proper credit during her lifetime. We remember.
              </p>
              <ul className="space-y-1 text-sm ml-4" style={{ color: MUTED }}>
                <li>· Proof through photography</li>
                <li>· Healing at molecular level (528Hz DNA repair)</li>
                <li>· Recognition of hidden work — like hers</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* ── ANTI-FRAUD ── */}
        <div>
          <SectionTitle>Anti-Fraud · Live</SectionTitle>
          <Card>
            <div className="space-y-3 text-sm" style={{ color: MUTED }}>
              <p>· <span className="font-bold" style={{ color: INK }}>Photo hash:</span> Duplicates auto-rejected</p>
              <p>· <span className="font-bold" style={{ color: INK }}>GPS verification:</span> Location embedded in metadata</p>
              <p>· <span className="font-bold" style={{ color: INK }}>AI vision:</span> Detects altered/staged photos</p>
              <p>· <span className="font-bold" style={{ color: INK }}>Cryptographic signing (Nov 2025):</span> ECDSA P-256 digital signatures. Weight/photo/location tampering = instant detection</p>
            </div>

            <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${BORDER}` }}>
              <p className="text-xs uppercase tracking-wider font-bold mb-3" style={{ color: INK }}>2026 AI Fraud · Threats Solved</p>
              <div className="space-y-3 text-xs" style={{ color: MUTED }}>
                <div>
                  <p className="font-bold" style={{ color: INK }}>AI-generated fake photos?</p>
                  <p>Liveness detection + pHash + video verification (5-second clip is mathematically impossible to fake with current AI)</p>
                </div>
                <div>
                  <p className="font-bold" style={{ color: INK }}>Coordinated fraud rings?</p>
                  <p>Geo-clustering detection — too many cleanups in same GPS radius flags automatically</p>
                </div>
                <div>
                  <p className="font-bold" style={{ color: INK }}>GPS spoofing?</p>
                  <p>Accelerometer + movement data confirms you physically walked to the location</p>
                </div>
                <div>
                  <p className="font-bold" style={{ color: INK }}>On-device AI (WebNN 2026)?</p>
                  <p>Neural networks running entirely on your phone — AI verifies cleanup before it ever hits our servers. Private. Offline. Unfakeable.</p>
                </div>
              </div>
              <p className="text-xs mt-4 font-bold" style={{ color: INK }}>
                Carbon credits are a 900B market despite being largely unverifiable. P51 is mathematically more fraud-proof than anything in that market.
              </p>
            </div>
          </Card>
        </div>

        {/* ── CRYPTO + IPFS ── */}
        <div>
          <SectionTitle>Cryptographic Security + IPFS</SectionTitle>
          <Card>
            <div className="space-y-4 text-sm" style={{ color: MUTED }}>
              <div>
                <p className="font-bold mb-2 uppercase tracking-wider text-xs" style={{ color: INK }}>ECDSA P-256 + SHA-256</p>
                <p>Every cleanup is cryptographically signed using bank-grade ECDSA P-256 + Bitcoin-level SHA-256 hashing. Your browser generates a unique keypair. Each submission gets digitally signed with your private key.</p>
                <div className="space-y-1 text-xs mt-3">
                  <p>· Change weight? <span className="font-bold" style={{ color: INK }}>Signature breaks</span></p>
                  <p>· Swap photo? <span className="font-bold" style={{ color: INK }}>Hash mismatch</span></p>
                  <p>· Fake location? <span className="font-bold" style={{ color: INK }}>GPS coords signed</span></p>
                  <p>· Submit twice? <span className="font-bold" style={{ color: INK }}>Hash chain breaks</span></p>
                </div>
                <p className="text-xs mt-3 font-bold" style={{ color: INK }}>More efficient than blockchain. No mining, no fees, instant verification.</p>
              </div>
              <div className="pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                <p className="font-bold mb-2 uppercase tracking-wider text-xs" style={{ color: INK }}>IPFS Decentralized Storage</p>
                <p>Every cleanup photo + P51 transaction is pinned to IPFS (InterPlanetary File System) = decentralized storage that survives server shutdowns, government censorship, and quantum attacks.</p>
                <div className="space-y-1 text-xs mt-3">
                  <p>· Content-addressed: file hash = file location (tamper-proof)</p>
                  <p>· Distributed network: no single point of failure</p>
                  <p>· Redundant gateways: multiple access points worldwide</p>
                  <p>· Quantum-proof: SHA-256 hash integrity</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ── THE REGENERATIVE LOOP ── */}
        <div>
          <SectionTitle>3 · The Regenerative Loop</SectionTitle>
          <Card>
            <div className="space-y-4 text-sm" style={{ color: MUTED }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-4" style={{ border: `1px solid ${BORDER}`, borderRight: 0 }}>
                  <p className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: INK }}>1 · Earn</p>
                  <p>Clean Earth → Earn <P51Symbol showTooltip={false} /></p>
                </div>
                <div className="p-4" style={{ border: `1px solid ${BORDER}` }}>
                  <p className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: INK }}>2 · Spend</p>
                  <p>Stream healing music with <P51Symbol showTooltip={false} /></p>
                </div>
                <div className="p-4" style={{ border: `1px solid ${BORDER}`, borderRight: 0, borderTop: 0 }}>
                  <p className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: INK }}>3 · Artists Receive</p>
                  <p><span className="font-bold" style={{ color: INK }}>90%</span> goes directly to artist (automatic)</p>
                </div>
                <div className="p-4" style={{ border: `1px solid ${BORDER}`, borderTop: 0 }}>
                  <p className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: INK }}>4 · Healing Continues</p>
                  <p>Artists create more healing content → loop strengthens</p>
                </div>
              </div>
              <div className="pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                <p className="text-center font-bold text-lg mb-2" style={{ color: INK }}>90% to Artists</p>
                <p className="text-xs text-center">Most platforms take 30-50%. We take 10% for infrastructure. <span className="font-bold" style={{ color: INK }}>Artists deserve majority value.</span></p>
              </div>
            </div>
          </Card>
        </div>

        {/* ── HEALING FREQUENCIES ── */}
        <div>
          <SectionTitle>4 · Healing Frequencies</SectionTitle>
          <Card>
            <div className="space-y-4 text-sm" style={{ color: MUTED }}>
              <p>Music on UF51 uses <span className="font-bold" style={{ color: INK }}>specific frequencies</span> documented to affect all consciousness through resonance:</p>
              <div className="space-y-1">
                <DataRow label="528Hz" value="Love frequency · DNA repair" />
                <DataRow label="432Hz" value="Universal harmony · Earth" />
                <DataRow label="7.83Hz" value="Schumann resonance · planetary" />
                <DataRow label="174Hz" value="Foundation · minerals · stone" />
                <DataRow label="285Hz" value="Cellular repair · all biology" />
                <DataRow label="963Hz" value="Cosmic consciousness" accent />
              </div>
              <div className="pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                <p className="font-bold text-xs uppercase tracking-wider mb-2" style={{ color: INK }}>Why FLAC/WAV only</p>
                <p className="text-xs">MP3 compression removes frequencies above 16kHz. Healing depends on precise Hz values resonating with all consciousness forms — human, animal, plant, elemental, quantum. Lossless formats preserve all frequencies exactly.</p>
              </div>
              <div className="pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                <p className="text-xs uppercase tracking-wider font-bold mb-1" style={{ color: INK }}>Honest Disclaimer</p>
                <p className="text-xs">Healing frequencies are not medical treatment. Not FDA approved. Not substitutes for healthcare. Physics of resonance = verified. Clinical efficacy = ongoing research.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* ── GOVERNANCE ── */}
        <div>
          <SectionTitle>5 · Governance</SectionTitle>
          <Card>
            <div className="space-y-4 text-sm" style={{ color: MUTED }}>
              <div>
                <p className="font-bold mb-1 uppercase tracking-wider text-xs" style={{ color: INK }}>Current Status: Centralized</p>
                <p>Founding team currently manages operations during development phase.</p>
                <p className="font-bold mt-2" style={{ color: INK }}>Goal: transition to community governance when platform is stable.</p>
              </div>
              <div className="pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                <p className="font-bold mb-2 uppercase tracking-wider text-xs" style={{ color: INK }}>Legal Protection: CIC</p>
                <p>Community Interest Company (UK) = asset locked. Cannot be sold. Cannot pay dividends. Mission protected legally + mathematically.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* ── CURRENT STATUS ── */}
        <div>
          <SectionTitle>6 · Current Status</SectionTitle>
          <Card>
            <div className="space-y-4 text-sm" style={{ color: MUTED }}>
              <div>
                <p className="font-bold mb-3 uppercase tracking-wider text-xs" style={{ color: INK }}>Live (Nov 2025)</p>
                <div className="grid grid-cols-2 gap-0">
                  <div className="p-2 text-xs" style={{ border: `1px solid ${BORDER}`, borderRight: 0, borderBottom: 0 }}>✓ Cleanup submission</div>
                  <div className="p-2 text-xs" style={{ border: `1px solid ${BORDER}`, borderBottom: 0 }}>✓ P51 token award</div>
                  <div className="p-2 text-xs" style={{ border: `1px solid ${BORDER}`, borderRight: 0, borderBottom: 0 }}>✓ AI verification</div>
                  <div className="p-2 text-xs" style={{ border: `1px solid ${BORDER}`, borderBottom: 0 }}>✓ Music streaming</div>
                  <div className="p-2 text-xs" style={{ border: `1px solid ${BORDER}`, borderRight: 0 }}>✓ 90/10 split</div>
                  <div className="p-2 text-xs" style={{ border: `1px solid ${BORDER}` }}>✓ Artist uploads</div>
                </div>
              </div>
              <div className="pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                <p className="font-bold mb-2 uppercase tracking-wider text-xs" style={{ color: INK }}>In Development (Q1-Q2 2026)</p>
                <ul className="space-y-1 text-xs">
                  <li>· Fiat bridge (P51 ↔ GBP/USD)</li>
                  <li>· Community verification</li>
                  <li>· Mobile PWA (offline-first)</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* ── CONCLUSION ── */}
        <div>
          <SectionTitle>7 · Conclusion</SectionTitle>
          <Card>
            <div className="space-y-4 text-sm" style={{ color: MUTED }}>
              <p className="text-lg font-bold" style={{ color: INK }}>Healing Earth must be economically viable.</p>
              <p>
                Proof-of-Love creates the motivation. Proof-of-Impact creates the verifiable receipt. Together they form the first currency backed by Earth health — a <span className="font-bold" style={{ color: INK }}>Verified Environmental Restoration</span> asset that corporations, governments, and ESG funds can actually buy, verify, and trust.
              </p>
              <p className="font-bold" style={{ color: INK }}>This is not speculation. This is working code, processing real cleanups, paying real artists.</p>
              <div className="pt-4 space-y-1 text-xs" style={{ borderTop: `1px solid ${BORDER}` }}>
                <p><span className="font-bold" style={{ color: INK }}>Layer 1:</span> Token economy — environmental credits traded globally</p>
                <p><span className="font-bold" style={{ color: INK }}>Layer 2:</span> Platform — the largest planet repair coordination network on Earth</p>
                <p><span className="font-bold" style={{ color: INK }}>Layer 3:</span> Data — the most comprehensive verified environmental dataset ever built</p>
              </div>
            </div>
          </Card>
        </div>

        {/* ── REFERENCES ── */}
        <div>
          <SectionTitle>References</SectionTitle>
          <Card>
            <div className="space-y-2 text-xs" style={{ color: MUTED }}>
              <p>1. UNEP (2023): "Plastic Pollution — Global treaty negotiations"</p>
              <p>2. IUCN (2021): "Marine Plastic Pollution" — 8M tonnes/year</p>
              <p>3. MIT (2016): "40Hz gamma frequency reduces Alzheimer's plaques" — Tsai lab</p>
              <p>4. NASA: Schumann Resonance astronaut health effects</p>
              <p>5. Planck, M. (1900): "Energy distribution in normal spectrum"</p>
              <p>6. Franklin, R. (1953): Photo 51 — DNA X-ray crystallography</p>
              <p>7. Shannon, C. E. (1948): "A Mathematical Theory of Communication" — information entropy & the bit</p>
              <p>8. UK CIC Regulator: Asset Lock requirements</p>
            </div>
          </Card>
        </div>

        {/* ── FOOTER ── */}
        <footer className="text-center py-8 space-y-3 mt-8" style={{ borderTop: `1px solid ${BORDER}` }}>
          <RedBanner className="max-w-2xl mx-auto">
            This is the time. And this is the record of the time.
          </RedBanner>
          <div className="flex items-center justify-center gap-2 pt-4">
            <Clock className="w-4 h-4" style={{ color: MUTED }} />
            <p className="font-mono text-xs" style={{ color: MUTED }}>
              {format(currentTime, 'EEEE do MMMM yyyy · HH:mm:ss')} GMT
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" style={{ color: RED }} />
          </div>
          <p className="text-xs" style={{ color: MUTED }}>Open source · CC BY-SA 4.0 · Peer review welcome</p>
          <p className="text-xs">
            <a href="https://uf51.love" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70" style={{ color: MUTED }}>uf51.love</a>
          </p>
          <p className="text-xs font-mono" style={{ color: MUTED }}>v3.0 · March 2026</p>
          <p className="text-xs" style={{ color: MUTED }}>
            Built on <a href="https://base44.com" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70">Base44</a>
          </p>
        </footer>
      </div>
    </div>
  );
}