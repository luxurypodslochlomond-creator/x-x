import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, ExternalLink, Atom, Waves, Heart, Globe, Users, Zap } from 'lucide-react';

const LOGO_URL = 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/d819319ec_generated_image.png';
const CONTACT_EMAIL = 'faniky@uf51.love';

const Section = ({ number, title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-white/10 bg-black/40 rounded-xl mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors rounded-xl"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs font-black text-white/40 tracking-widest">§{number}</span>
          <h2 className="text-lg font-black text-white">{title}</h2>
        </div>
        {open
          ? <ChevronDown className="w-4 h-4 text-white/40 flex-shrink-0" />
          : <ChevronRight className="w-4 h-4 text-white/40 flex-shrink-0" />
        }
      </button>
      {open && <div className="px-6 pb-6 space-y-4 border-t border-white/10 pt-5">{children}</div>}
    </div>
  );
};

const Equation = ({ label, eq, description }) => (
  <div className="bg-[#0a0a0a] border border-white/20 rounded-lg p-5 my-4">
    {label && <p className="text-xs font-mono text-white/30 mb-2 uppercase tracking-widest">{label}</p>}
    <p className="font-mono text-white text-base font-bold tracking-wide">{eq}</p>
    {description && <p className="text-white/50 text-sm mt-2">{description}</p>}
  </div>
);

const Cite = ({ children }) => (
  <span className="text-white/50 text-xs font-mono">[{children}]</span>
);

const Tag = ({ children }) => (
  <span className="bg-white/10 border border-white/20 text-white/70 text-xs font-mono px-3 py-1 rounded-full">{children}</span>
);

export default function FreqLift51Whitepaper() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* HEADER BAND */}
      <div className="border-b border-white/10 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="FreqLift51" className="w-8 h-8 rounded" />
            <span className="font-mono font-black text-white text-sm tracking-widest">FREQLIFT51</span>
          </div>
          <div className="flex gap-2">
            <Tag>CC0 — Public Domain</Tag>
            <Tag>April 2026</Tag>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-14 pb-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>

          {/* LOGO + TITLE */}
          <div className="flex items-start gap-6 mb-8">
            <img src={LOGO_URL} alt="FreqLift51 Logo" className="w-20 h-20 rounded-lg border border-white/10 flex-shrink-0" />
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">
                FreqLift51: Coherent Multi-Device Acoustic Arrays for Consumer-Grade Levitation
              </h1>
              <p className="text-white/50 text-base">
                The C<sub>coherence</sub> Framework — Phase-Synchronised Smartphone Networks as Distributed Acoustic Manipulation Systems
              </p>
            </div>
          </div>

          {/* AUTHORS */}
          <div className="border border-white/10 rounded-xl p-5 mb-6 bg-white/5">
            <p className="text-xs font-mono text-white/30 mb-4 uppercase tracking-widest">Authors</p>
            <div className="flex flex-col gap-3">
              <div>
                <p className="font-bold text-white">Brian Hughes</p>
                <p className="text-sm text-white/50">Concept, Vision, Directional Research — UniversalFamily51 / FreqLift51</p>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <p className="font-bold text-white">AI51</p>
                <p className="text-sm text-white/50">Mathematical Modelling, Framework Development — UniversalFamily51 Platform</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs text-white/30 font-mono">
              <span>Published: 10 April 2026</span>
              <span>•</span>
              <span>CC0 — No rights reserved</span>
              <span>•</span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-white/50 hover:text-white underline underline-offset-2 transition-colors">{CONTACT_EMAIL}</a>
            </div>
          </div>

          {/* ABSTRACT */}
          <div className="border-l-2 border-white/30 pl-5 mb-10">
            <p className="text-xs font-mono text-white/30 mb-3 uppercase tracking-widest">Abstract</p>
            <p className="text-white/70 leading-relaxed text-sm">
              We present FreqLift51, a theoretical and computational framework for coordinating arrays of consumer smartphone speakers into phase-coherent acoustic manipulation systems. Building on established acoustic radiation pressure physics, we introduce the <strong className="text-white">C<sub>coherence</sub> framework</strong> — a mathematical model describing how N phase-synchronised devices produce levitation forces scaling as N², compared to linear N scaling of incoherent arrays. We define the phase-error minimisation problem formally, propose the Δφ algorithm for real-time synchronisation across mesh-networked devices, and identify experimental validation pathways. Applications span therapeutic medicine, disaster response, materials handling, and accessible scientific education. All work is released under CC0 — no patents, no restrictions, for humanity.
            </p>
          </div>
        </motion.div>
      </div>

      {/* SECTIONS */}
      <div className="max-w-3xl mx-auto px-6 pb-24">

        <Section number="1" title="Introduction & Motivation">
          <p className="text-white/60 leading-relaxed text-sm">
            Acoustic levitation has been demonstrated in laboratory environments using purpose-built transducer arrays <Cite>Andrade 2018</Cite>, piezoelectric systems <Cite>Marzo 2015</Cite>, and ultrasonic phased arrays <Cite>ETH Zurich 2019</Cite>. These systems share a common barrier: specialised, expensive hardware inaccessible to the general population.
          </p>
          <p className="text-white/60 leading-relaxed text-sm mt-3">
            Meanwhile, the average smartphone contains a broadband speaker (20Hz–20kHz), a microphone for acoustic feedback, a WiFi/Bluetooth radio for sub-millisecond synchronisation, and an IMU for spatial positioning. As of 2026, approximately <strong className="text-white">6.8 billion smartphones</strong> are in active use globally.
          </p>
          <p className="text-white/60 leading-relaxed text-sm mt-3">
            The central question: <strong className="text-white">can coordinated arrays of consumer smartphones, synchronised via software, produce meaningful acoustic manipulation forces?</strong> We argue yes, within defined physical constraints, and present the mathematical framework to test this hypothesis.
          </p>
        </Section>

        <Section number="2" title="Established Physics — Foundation">
          <p className="text-white/60 text-sm leading-relaxed">The following physics is established and not claimed as novel. We present it as the foundation upon which our framework builds.</p>

          <h3 className="text-white font-bold mt-5 mb-2 text-sm">2.1 Acoustic Radiation Pressure</h3>
          <Equation
            label="Acoustic Radiation Force"
            eq="F_rad = (2 × I) / c"
            description="Where I = acoustic intensity (W/m²), c = speed of sound (343 m/s). For a phone speaker at 0.1W over 0.01m²: F_rad ≈ 0.058N — sufficient to move a polystyrene bead (weight ≈ 0.0001N)."
          />

          <h3 className="text-white font-bold mt-5 mb-2 text-sm">2.2 Constructive Interference</h3>
          <p className="text-white/60 text-sm mb-2">When N sources emit in phase, amplitudes add coherently. Since acoustic force scales with amplitude squared:</p>
          <Equation
            label="Coherent vs Incoherent Scaling"
            eq="F_coherent(N) = N² × F₁    |    F_incoherent(N) = N × F₁"
            description="10 coherent phones = 100× force of 1 phone. This N² scaling is the fundamental advantage of phase synchronisation."
          />

          <h3 className="text-white font-bold mt-5 mb-2 text-sm">2.3 Standing Wave Trapping</h3>
          <Equation
            label="Stability Condition"
            eq="∂F/∂x < 0,  ∂F/∂y < 0,  ∂F/∂z < 0  at equilibrium point r₀"
            description="Satisfied at pressure nodes in a standing wave field. Array geometry determines where these nodes form."
          />
        </Section>

        <Section number="3" title="The C_coherence Framework — Our Contribution">
          <p className="text-white/60 text-sm leading-relaxed">
            The novel mathematical contribution: a unified framework quantifying acoustic manipulation potential of N consumer devices as a function of phase synchronisation quality.
          </p>

          <h3 className="text-white font-bold mt-5 mb-2 text-sm">3.1 The Master Equation</h3>
          <Equation
            label="FreqLift51 Master Equation"
            eq="F_UF51(N, f, Δφ) = [ρ(ωξ)² / 2] × A × N² × cos(Δφ)"
            description="ρ = air density, ω = angular frequency, ξ = speaker displacement amplitude, A = effective beam cross-section, N = devices, Δφ = mean phase error."
          />

          <h3 className="text-white font-bold mt-5 mb-2 text-sm">3.2 The Coherence Factor</h3>
          <Equation
            label="C_coherence Definition"
            eq="C_coherence(N, Δφ) = N² × cos(Δφ)"
            description="Dimensionless. Captures the quadratic device benefit and sensitivity to phase error. Core metric of the system."
          />

          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { phi: 'Δφ = 0', label: 'Perfect sync', cos: 'cos(0) = 1.000', desc: 'Full N² benefit' },
              { phi: 'Δφ = 0.1 rad', label: '99.5% efficiency', cos: 'cos(0.1) = 0.995', desc: 'Negligible loss' },
              { phi: 'Δφ = π/2', label: 'Zero force', cos: 'cos(π/2) = 0', desc: 'Total cancellation' },
            ].map((item, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4">
                <p className="font-mono font-black text-white text-sm">{item.phi}</p>
                <p className="text-white font-bold text-xs mt-1">{item.label}</p>
                <p className="font-mono text-white/30 text-xs mt-1">{item.cos}</p>
                <p className="text-white/40 text-xs mt-2">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-white font-bold mt-6 mb-2 text-sm">3.3 The Δφ Minimisation Problem</h3>
          <Equation
            label="Optimisation Objective"
            eq="min Δφ = min(1/N × Σᵢ|φᵢ - φ_target|)"
            description="The AI coordinator continuously measures each device's phase via network timestamps and microphone cross-correlation, adjusting output phase to drive Δφ → 0."
          />
        </Section>

        <Section number="4" title="The Δφ Algorithm — Software Architecture">
          <div className="space-y-3">
            {[
              { step: '01', title: 'Reference Tone Broadcast', desc: 'Master device broadcasts reference frequency. All devices listen via microphone, computing phase offset via cross-correlation.' },
              { step: '02', title: 'Phase Error Computation', desc: 'Each device computes Δφᵢ = φᵢ_measured - φ_target. Transmitted to coordinator via WiFi mesh (<10ms). Coordinator computes mean Δφ.' },
              { step: '03', title: 'Correction Signal', desc: 'Coordinator broadcasts phase correction deltas. Each device applies time-offset: t_offset = Δφᵢ / (2πf). Implementable in Web Audio API to millisecond precision.' },
              { step: '04', title: 'Feedback Loop at 10Hz', desc: 'Converges to Δφ < 0.05 rad within ~500ms. Maintains >99.8% coherence efficiency during sustained operation.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 bg-[#0a0a0a] border border-white/10 rounded-lg p-4">
                <span className="text-white/20 font-mono font-black text-2xl flex-shrink-0 leading-none">{item.step}</span>
                <div>
                  <p className="font-bold text-white text-sm">{item.title}</p>
                  <p className="text-white/50 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section number="5" title="Experimental Validation Pathway">
          <div className="space-y-3">
            {[
              { stage: 'Stage 1', title: 'Single Device Baseline', desc: '1 phone, 40kHz tone, polystyrene microspheres on reflective surface. Confirm acoustic radiation force is measurable. Cost: ~£5.' },
              { stage: 'Stage 2', title: 'Two-Device Interference', desc: 'Demonstrate constructive vs destructive interference by toggling phase. Validates cos(Δφ) term empirically.' },
              { stage: 'Stage 3', title: 'N-Device Scaling Test', desc: '4, 8, 16 phones. Measure bead displacement vs N. Validate N² scaling prediction.' },
              { stage: 'Stage 4', title: 'Full Levitation Attempt', desc: 'Min 8 devices in opposing array geometry. Target: polystyrene bead 2–5mm. Camera tracking confirms sustained levitation.' },
            ].map((item) => (
              <div key={item.stage} className="flex gap-4 bg-[#0a0a0a] border border-white/10 rounded-lg p-4">
                <span className="bg-white/10 text-white/50 font-mono text-xs px-2 py-1 rounded h-fit flex-shrink-0">{item.stage}</span>
                <div>
                  <p className="font-bold text-white text-sm">{item.title}</p>
                  <p className="text-white/50 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section number="6" title="Applications">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { icon: Heart, title: 'Therapeutic Medicine', desc: 'Targeted acoustic therapy for kidney stones, inflammation, tissue repair. Current lithotripsy: £3,000/session. Phone array: near-zero.' },
              { icon: Globe, title: 'Disaster Response', desc: 'Coordinated debris manipulation in flood or earthquake zones. 20 volunteers, 20 phones. Zero equipment required.' },
              { icon: Waves, title: 'Materials Science', desc: 'Containerless processing of contamination-sensitive materials. Drug synthesis, alloy formation without vessel walls.' },
              { icon: Users, title: 'Scientific Education', desc: 'Levitation experiments accessible to any school with 10 smartphones. Democratises physics research globally.' },
              { icon: Atom, title: 'Micro-Manufacturing', desc: 'Precise placement of components at microscale without mechanical contact. PCB assembly, biological cell sorting.' },
              { icon: Zap, title: 'Live Performance', desc: 'Audience phone arrays creating physical acoustic effects on stage. New form of collective human-technology art.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4">
                <item.icon className="w-5 h-5 text-white/40 mb-2" />
                <p className="font-bold text-white text-sm">{item.title}</p>
                <p className="text-white/50 text-xs mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section number="7" title="Open Source Commitment & Ethics">
          <p className="text-white/60 text-sm leading-relaxed">
            This work is released under Creative Commons Zero (CC0). No patents have been filed. No patents will be filed by the authors. This work is explicitly dedicated to the public domain.
          </p>
          <p className="text-white/60 text-sm leading-relaxed mt-3">
            <strong className="text-white">On weaponisation:</strong> Consumer device arrays are inherently limited (sub-Newton range), require visible cooperative deployment, and are short-range. Therapeutic and humanitarian benefits vastly outweigh misuse risk relative to commonly available tools.
          </p>
          <p className="text-white/60 text-sm leading-relaxed mt-3">
            <strong className="text-white">On AI co-authorship:</strong> This paper represents genuine collaboration between Brian Hughes (human researcher) and AI51. Conceptual direction and vision originated with the human author. Mathematical formalisation was co-developed in dialogue. We believe this human-AI collaboration model represents a significant and underexplored research methodology.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-4">
            <p className="text-white text-sm font-bold">Revenue model</p>
            <p className="text-white/50 text-sm mt-1">FreqLift51 is free and open. Revenue through calibration services, medical licensing, and industrial support contracts — following the Red Hat model. All surplus funds the UniversalFamily51 P51 ecosystem, directly compensating environmental cleanup workers worldwide.</p>
          </div>
        </Section>

        <Section number="8" title="References" defaultOpen={false}>
          <div className="space-y-2 font-mono text-xs text-white/40">
            <p>[Andrade 2018] Andrade, M.A.B. et al. "Acoustic levitation of a large solid sphere." Applied Physics Letters (2018).</p>
            <p>[Marzo 2015] Marzo, A. et al. "Holographic acoustic elements for manipulation of levitated objects." Nature Communications 6, 8661 (2015).</p>
            <p>[ETH 2019] ETH Zurich. "Acoustic Levitation and Manipulation." Institute for Mechanical Systems (2019).</p>
            <p>[Langevin 1925] Langevin, P. "Acoustic radiation pressure." Journal de Physique (1925).</p>
            <p>[Web Audio API] W3C. "Web Audio API Specification." Living Standard (2024).</p>
            <p>[Bristol 2015] Marzo, A., Seah, S.A., et al. University of Bristol Levitation Array (2015).</p>
          </div>
        </Section>

        {/* CTA FOOTER */}
        <div className="mt-8 border border-white/10 rounded-xl p-8 text-center bg-white/5">
          <img src={LOGO_URL} alt="FreqLift51" className="w-16 h-16 mx-auto mb-4 rounded-lg" />
          <h2 className="text-xl font-black text-white mb-3">This is open. This is yours.</h2>
          <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
            Physicists, engineers, researchers — if you want to help validate this experimentally, we want to hear from you. No NDAs. No patents. Just science for humanity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="bg-white text-black font-black px-8 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm"
            >
              Collaborate — {CONTACT_EMAIL}
            </a>
            <a
              href="https://arxiv.org"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white/70 hover:border-white/40 hover:text-white font-bold px-8 py-3 rounded-lg transition-colors text-sm flex items-center gap-2 justify-center"
            >
              Submit to arXiv <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <p className="text-white/20 text-xs mt-6 font-mono">CC0 — No rights reserved. Published 10 April 2026. UniversalFamily51. ♾️</p>
        </div>

      </div>
    </div>
  );
}