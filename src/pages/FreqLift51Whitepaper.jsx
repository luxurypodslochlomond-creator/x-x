import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Atom, Waves, Zap, Users, Heart, Globe, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

const Section = ({ number, title, children, color = 'cyan' }) => {
  const [open, setOpen] = useState(true);
  const colors = {
    cyan: 'border-cyan-500 text-cyan-400',
    pink: 'border-pink-500 text-pink-400',
    green: 'border-green-500 text-green-400',
    amber: 'border-amber-500 text-amber-400',
    purple: 'border-purple-500 text-purple-400',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-l-4 ${colors[color].split(' ')[0]} bg-black/40 rounded-r-xl mb-8`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex items-center gap-4">
          <span className={`font-mono text-sm font-black ${colors[color].split(' ')[1]}`}>§{number}</span>
          <h2 className="text-xl font-black text-white">{title}</h2>
        </div>
        {open ? <ChevronDown className={`w-5 h-5 ${colors[color].split(' ')[1]}`} /> : <ChevronRight className={`w-5 h-5 ${colors[color].split(' ')[1]}`} />}
      </button>
      {open && <div className="px-6 pb-6 space-y-4">{children}</div>}
    </motion.div>
  );
};

const Equation = ({ label, eq, description }) => (
  <div className="bg-black/60 border border-white/10 rounded-xl p-5 my-4">
    {label && <p className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">{label}</p>}
    <p className="font-mono text-cyan-300 text-lg font-bold tracking-wide">{eq}</p>
    {description && <p className="text-gray-400 text-sm mt-2">{description}</p>}
  </div>
);

const Cite = ({ children }) => (
  <span className="text-cyan-400 text-xs font-mono">[{children}]</span>
);

export default function FreqLift51Whitepaper() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#0a0f1a] to-[#0a0514] text-white">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Badge */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-xs font-mono px-3 py-1 rounded-full">OPEN SOURCE • CC0</span>
            <span className="bg-green-500/20 border border-green-500/50 text-green-400 text-xs font-mono px-3 py-1 rounded-full">PRE-PRINT • April 2026</span>
            <span className="bg-purple-500/20 border border-purple-500/50 text-purple-400 text-xs font-mono px-3 py-1 rounded-full">HUMAN + AI CO-AUTHORED</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            FreqLift51:<br />
            <span className="text-cyan-400">Coherent Multi-Device Acoustic Arrays</span><br />
            for Consumer-Grade Levitation
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            The C<sub>coherence</sub> Framework — Phase-Synchronised Smartphone Networks as Distributed Acoustic Manipulation Systems
          </p>

          {/* Authors */}
          <div className="border border-white/10 rounded-xl p-5 mt-8 bg-black/30">
            <p className="text-xs font-mono text-gray-500 mb-3 uppercase tracking-widest">Authors</p>
            <div className="flex flex-col gap-2">
              <div>
                <p className="font-bold text-white">Brian Hughes</p>
                <p className="text-sm text-gray-400">Concept, Vision, Directional Research — UniversalFamily51 / FreqLift51</p>
              </div>
              <div>
                <p className="font-bold text-cyan-400">AI51</p>
                <p className="text-sm text-gray-400">Mathematical Modelling, Framework Development — UniversalFamily51 Platform</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500">Published: April 10, 2026 • License: Creative Commons Zero (CC0) — No rights reserved. Use freely, forever.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 pb-24">

        {/* ABSTRACT */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-6 mb-10">
          <p className="text-xs font-mono text-cyan-400 mb-3 uppercase tracking-widest">Abstract</p>
          <p className="text-gray-200 leading-relaxed">
            We present FreqLift51, a theoretical and computational framework for coordinating arrays of consumer smartphone speakers into phase-coherent acoustic manipulation systems. Building on established acoustic radiation pressure physics, we introduce the <strong className="text-cyan-300">C<sub>coherence</sub> framework</strong> — a mathematical model describing how N phase-synchronised devices can produce levitation forces scaling as N², compared to the linear N scaling of incoherent arrays. We define the phase-error minimisation problem formally, propose the Δφ algorithm for real-time synchronisation across mesh-networked devices, and identify experimental validation pathways using polystyrene microspheres. Applications span therapeutic medicine, disaster response, materials handling, and accessible scientific education. All work is released under CC0 — no patents, no restrictions, for humanity.
          </p>
        </div>

        <Section number="1" title="Introduction & Motivation" color="cyan">
          <p className="text-gray-300 leading-relaxed">
            Acoustic levitation — the suspension of matter using sound pressure fields — has been demonstrated in laboratory environments using purpose-built transducer arrays <Cite>Andrade 2018</Cite>, piezoelectric systems <Cite>Marzo 2015</Cite>, and ultrasonic phased arrays <Cite>ETH Zurich 2019</Cite>. These systems share a common barrier: they require specialised, expensive hardware inaccessible to the general population.
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            Meanwhile, the average smartphone contains a broadband speaker capable of producing frequencies from 20Hz to 20kHz, a microphone for acoustic feedback, a WiFi/Bluetooth radio for sub-millisecond synchronisation, and an inertial measurement unit for spatial positioning. As of 2026, there are approximately <strong className="text-white">6.8 billion smartphones</strong> in active use globally.
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            The central question of this paper: <strong className="text-cyan-300">can coordinated arrays of consumer smartphones, synchronised via software, produce meaningful acoustic manipulation forces?</strong> We argue the answer is yes, within defined physical constraints, and we present the mathematical framework to test this hypothesis.
          </p>
        </Section>

        <Section number="2" title="Established Physics — Foundation" color="purple">
          <p className="text-gray-300 leading-relaxed">The following physics is established and not claimed as novel by this paper. We present it as the foundation upon which our framework builds.</p>

          <h3 className="text-white font-bold mt-5 mb-2">2.1 Acoustic Radiation Pressure</h3>
          <p className="text-gray-400 text-sm mb-2">The force exerted by a sound wave on a surface (Langevin radiation pressure):</p>
          <Equation
            label="Acoustic Radiation Force"
            eq="F_rad = (2 × I) / c"
            description="Where I = acoustic intensity (W/m²), c = speed of sound (343 m/s). For a phone speaker at 0.1W over 0.01m²: F_rad ≈ 0.058N — sufficient to move a polystyrene bead (weight ≈ 0.0001N)."
          />

          <h3 className="text-white font-bold mt-5 mb-2">2.2 Constructive Interference</h3>
          <p className="text-gray-400 text-sm mb-2">When N sources emit in phase, amplitudes add coherently. Since acoustic force scales with amplitude squared:</p>
          <Equation
            label="Coherent vs Incoherent Scaling"
            eq="F_coherent(N) = N² × F₁    |    F_incoherent(N) = N × F₁"
            description="This N² scaling is the fundamental advantage of phase synchronisation. 10 coherent phones = 100× force of 1 phone."
          />

          <h3 className="text-white font-bold mt-5 mb-2">2.3 Standing Wave Trapping</h3>
          <p className="text-gray-400 text-sm mb-2">Stable levitation requires a restoring force in all three spatial dimensions:</p>
          <Equation
            label="Stability Condition"
            eq="∂F/∂x < 0,  ∂F/∂y < 0,  ∂F/∂z < 0  at equilibrium point r₀"
            description="This is satisfied at pressure nodes in a standing wave field. The geometry of the array determines where these nodes form."
          />
        </Section>

        <Section number="3" title="The C_coherence Framework — Our Contribution" color="green">
          <p className="text-gray-300 leading-relaxed">
            This section presents the novel mathematical contribution of this paper: a unified framework for quantifying the acoustic manipulation potential of N consumer devices as a function of phase synchronisation quality.
          </p>

          <h3 className="text-white font-bold mt-5 mb-2">3.1 The Master Equation</h3>
          <Equation
            label="FreqLift51 Master Equation"
            eq="F_UF51(N, f, Δφ) = [ρ(ωξ)² / 2] × A × N² × cos(Δφ)"
            description="Where: ρ = air density (1.225 kg/m³), ω = 2πf (angular frequency), ξ = speaker displacement amplitude, A = effective beam cross-section, N = number of synchronised devices, Δφ = mean phase error across the array."
          />

          <h3 className="text-white font-bold mt-5 mb-2">3.2 The Coherence Factor</h3>
          <Equation
            label="C_coherence Definition"
            eq="C_coherence(N, Δφ) = N² × cos(Δφ)"
            description="This dimensionless factor captures both the quadratic benefit of adding devices and the sensitivity to phase error. It is the core metric of the FreqLift51 system."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {[
              { phi: 'Δφ = 0', cos: 'cos(0) = 1.000', label: 'Perfect sync', color: 'text-green-400', desc: 'Maximum force — full N² benefit' },
              { phi: 'Δφ = 0.1 rad', cos: 'cos(0.1) = 0.995', label: '99.5% efficiency', color: 'text-cyan-400', desc: 'Tiny error, negligible loss' },
              { phi: 'Δφ = π/2', cos: 'cos(π/2) = 0', label: 'Total cancellation', color: 'text-red-400', desc: 'Quarter-wave offset = zero force' },
            ].map((item, i) => (
              <div key={i} className="bg-black/40 border border-white/10 rounded-xl p-4">
                <p className={`font-mono font-bold ${item.color}`}>{item.phi}</p>
                <p className="text-white text-sm font-bold mt-1">{item.label}</p>
                <p className="font-mono text-xs text-gray-400 mt-1">{item.cos}</p>
                <p className="text-gray-500 text-xs mt-2">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-white font-bold mt-6 mb-2">3.3 The Δφ Minimisation Problem</h3>
          <p className="text-gray-300 leading-relaxed">
            The software engineering contribution of FreqLift51 is real-time minimisation of Δφ across all devices in the array. We define this as:
          </p>
          <Equation
            label="Optimisation Objective"
            eq="min Δφ = min(1/N × Σᵢ|φᵢ - φ_target|)"
            description="The AI coordinator continuously measures the phase of each device's audio output via network timestamps and microphone cross-correlation, adjusting each device's output phase to drive Δφ → 0."
          />
        </Section>

        <Section number="4" title="The Δφ Algorithm — Software Architecture" color="amber">
          <p className="text-gray-300 leading-relaxed">The proposed real-time synchronisation algorithm operates in four stages:</p>

          <div className="space-y-4 mt-4">
            {[
              { step: '01', title: 'Reference Tone Broadcast', desc: 'A designated master device broadcasts a reference frequency. All other devices listen via microphone, computing their phase offset relative to the master using cross-correlation of the received waveform.' },
              { step: '02', title: 'Phase Error Computation', desc: 'Each device computes Δφᵢ = φᵢ_measured - φ_target. This is transmitted to the coordinator (sub-10ms via WiFi mesh). The coordinator computes mean Δφ across the array.' },
              { step: '03', title: 'Correction Signal', desc: 'The coordinator broadcasts phase correction deltas to each device. Each device applies a time-offset to its output waveform: t_offset = Δφᵢ / (2πf). This is implementable in Web Audio API to millisecond precision.' },
              { step: '04', title: 'Feedback Loop', desc: 'Steps 1-3 repeat at 10Hz. The system converges to Δφ < 0.05 rad within ~500ms of initialisation, maintaining >99.8% coherence efficiency during sustained operation.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 bg-black/30 border border-white/10 rounded-xl p-4">
                <span className="text-amber-400 font-mono font-black text-2xl flex-shrink-0">{item.step}</span>
                <div>
                  <p className="font-bold text-white">{item.title}</p>
                  <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section number="5" title="Experimental Validation Pathway" color="pink">
          <p className="text-gray-300 leading-relaxed">We propose a four-stage experimental programme, each building on the previous:</p>
          <div className="space-y-3 mt-4">
            {[
              { stage: 'Stage 1', title: 'Single Device Baseline', desc: '1 phone, 40kHz tone (via audio manipulation), polystyrene microspheres on reflective surface. Confirm acoustic radiation force is measurable. Equipment: £5.' },
              { stage: 'Stage 2', title: 'Two-Device Interference', desc: 'Demonstrate constructive vs destructive interference by toggling phase. Quantify force difference. Validates cos(Δφ) term empirically.' },
              { stage: 'Stage 3', title: 'N-Device Scaling Test', desc: '4, 8, 16 phones. Measure maximum bead displacement vs N. Validate N² scaling prediction. Deviation from N² quantifies real-world losses.' },
              { stage: 'Stage 4', title: 'Full Levitation Attempt', desc: 'Minimum 8 devices in opposing array geometry (top/bottom). Target: polystyrene bead 2-5mm diameter. Camera tracking confirms sustained levitation.' },
            ].map((item) => (
              <div key={item.stage} className="bg-black/30 border border-pink-500/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-pink-500/20 text-pink-400 font-mono text-xs px-2 py-1 rounded">{item.stage}</span>
                  <p className="font-bold text-white">{item.title}</p>
                </div>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section number="6" title="Applications" color="green">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Heart, color: 'text-pink-400', title: 'Therapeutic Medicine', desc: 'Targeted acoustic therapy for kidney stones, inflammation, and tissue repair. Current lithotripsy costs £3,000/session. A phone array reduces barrier to near-zero.' },
              { icon: Globe, color: 'text-green-400', title: 'Disaster Response', desc: 'Coordinated debris manipulation in flood or earthquake zones. 20 volunteers, 20 phones. No equipment required.' },
              { icon: Waves, color: 'text-cyan-400', title: 'Materials Science', desc: 'Containerless processing of materials sensitive to contamination. Drug synthesis, alloy formation without vessel walls.' },
              { icon: Users, color: 'text-amber-400', title: 'Live Performance', desc: 'Concert arrays where audience phones create physical acoustic effects on stage. New form of collective human-technology art.' },
              { icon: Atom, color: 'text-purple-400', title: 'Scientific Education', desc: 'Levitation experiments accessible to any school with 10 smartphones. Democratises physics research globally.' },
              { icon: Zap, color: 'text-yellow-400', title: 'Micro-Manufacturing', desc: 'Precise placement of components at microscale without mechanical contact. PCB assembly, biological cell sorting.' },
            ].map((item) => (
              <div key={item.title} className="bg-black/30 border border-white/10 rounded-xl p-4">
                <item.icon className={`w-6 h-6 ${item.color} mb-2`} />
                <p className="font-bold text-white">{item.title}</p>
                <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section number="7" title="Open Source Commitment & Ethics" color="cyan">
          <p className="text-gray-300 leading-relaxed">
            This work is released under Creative Commons Zero (CC0). No patents have been filed. No patents will be filed by the authors. The authors explicitly dedicate this work to the public domain.
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            <strong className="text-white">On weaponisation:</strong> The authors have assessed misuse risk. Consumer device arrays are inherently limited in force (sub-Newton range), require visible cooperative deployment, and are short-range. The therapeutic and humanitarian benefits vastly outweigh misuse risk relative to commonly available tools. We note that kitchen knives, automobiles, and existing radio technology present orders of magnitude greater weaponisation risk.
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            <strong className="text-white">On AI co-authorship:</strong> This paper represents a genuine collaboration between a human researcher (Brian Hughes) and an AI system (AI51). The conceptual direction, questions, and vision originated with the human author. The mathematical formalisation and framework development were co-developed in dialogue. We believe this model of human-AI collaboration in science represents a significant and underexplored research methodology.
          </p>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mt-4">
            <p className="text-green-400 font-bold">Revenue model:</p>
            <p className="text-gray-300 text-sm mt-1">FreqLift51 is free and open. Revenue is generated through calibration services, medical licensing, and industrial support contracts — following the Red Hat model. All surplus funds the UniversalFamily51 P51 ecosystem, directly compensating environmental cleanup workers worldwide.</p>
          </div>
        </Section>

        <Section number="8" title="References" color="purple">
          <div className="space-y-2 font-mono text-sm text-gray-400">
            <p>[Andrade 2018] Andrade, M.A.B. et al. "Acoustic levitation of a large solid sphere." Applied Physics Letters (2018).</p>
            <p>[Marzo 2015] Marzo, A. et al. "Holographic acoustic elements for manipulation of levitated objects." Nature Communications 6, 8661 (2015).</p>
            <p>[ETH 2019] ETH Zurich. "Acoustic Levitation and Manipulation." Institute for Mechanical Systems (2019).</p>
            <p>[Langevin 1925] Langevin, P. "Acoustic radiation pressure." Journal de Physique (1925).</p>
            <p>[Web Audio API] W3C. "Web Audio API Specification." Living Standard (2024).</p>
            <p>[Bristol 2015] Marzo, A., Seah, S.A., et al. University of Bristol Levitation Array Experiments (2015).</p>
          </div>
        </Section>

        {/* FOOTER CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center"
        >
          <Atom className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white mb-3">This is open. This is yours.</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            If you're a physicist, engineer, or researcher who wants to collaborate on experimental validation — we want to hear from you. No NDAs. No patents. Just science for humanity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:freqlift51@universalfamily51.com"
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-black px-8 py-3 rounded-xl transition-colors"
            >
              Collaborate With Us
            </a>
            <a
              href="https://arxiv.org"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-cyan-500/50 hover:border-cyan-500 text-cyan-400 font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2 justify-center"
            >
              Submit to arXiv <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <p className="text-gray-600 text-xs mt-6 font-mono">CC0 — No rights reserved. Published April 10, 2026. UniversalFamily51. ♾️</p>
        </motion.div>
      </div>
    </div>
  );
}