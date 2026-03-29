import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';

const Section = ({ title, children, accent = '#d4a017' }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-6 rounded-2xl overflow-hidden" style={{ border: `1px solid ${accent}30` }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
        style={{ background: `${accent}10` }}
      >
        <span className="font-black text-sm tracking-wide" style={{ color: accent }}>{title}</span>
        <span style={{ color: accent }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-6 py-5 space-y-3" style={{ background: 'rgba(26,32,14,0.8)' }}>
          {children}
        </div>
      )}
    </div>
  );
};

const Ref = ({ children }) => (
  <p className="text-xs leading-relaxed pl-4 border-l-2" style={{ color: '#8aab3a', borderColor: '#8aab3a60' }}>{children}</p>
);

const P = ({ children }) => (
  <p className="text-sm leading-relaxed" style={{ color: '#c8b87a' }}>{children}</p>
);

const H = ({ children }) => (
  <p className="text-xs font-black tracking-widest mt-4 mb-2" style={{ color: '#d4a017' }}>{children}</p>
);

export default function PetSounds51Whitepaper() {
  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #1a200e 0%, #2a3018 40%, #1e1a0e 100%)' }}>
      <div className="max-w-2xl mx-auto px-4 pt-10 pb-16">

        {/* HEADER */}
        <div className="text-center mb-10">
          <PetSounds51Icon8Bit size={70} animate={false} />
          <h1 className="text-4xl font-black mt-4 mb-2" style={{ color: '#d4a017' }}>PetSounds51</h1>
          <p className="font-black text-lg mb-1" style={{ color: '#e8d5a3' }}>Science & Methodology Whitepaper</p>
          <p className="text-xs" style={{ color: '#6b5e3a' }}>Version 1.0 · Universal Frequency 51 CIC · March 2026</p>
          <p className="text-xs mt-2" style={{ color: '#8aab3a' }}>
            Not a medical or veterinary device. Complementary wellness only. Always use alongside professional care.
          </p>
        </div>

        {/* EXECUTIVE SUMMARY */}
        <Section title="EXECUTIVE SUMMARY" accent="#d4a017">
          <P>PetSounds51 is a browser-based psychoacoustic therapy platform delivering science-backed audio protocols for anxious, injured, and distressed animals. It requires no hardware, no specialist equipment, and no installation — it runs on any device with a speaker.</P>
          <P>The platform is built on three pillars of published, peer-reviewed research: (1) slow-tempo music measurably reduces anxiety behaviours in companion animals; (2) species-specific frequency profiles matter — animals hear differently to humans and benefit from audio tuned to their biology; (3) specific frequency entrainment (particularly 40Hz gamma) has demonstrated neurological effects in mammal research that are relevant to pain, inflammation, and cognitive function.</P>
          <P>Unlike generic streaming playlists, each PetSounds51 protocol uses a distinct audio architecture matched to the therapeutic goal. Isochronic tone entrainment — not binaural beats — is used throughout, meaning every protocol works correctly through standard room speakers, TVs, and laptops with no headphones required.</P>
        </Section>

        {/* THE PROBLEM */}
        <Section title="THE PROBLEM: ANIMAL ANXIETY IS WIDESPREAD AND UNDERSERVED" accent="#ec4899">
          <P>Anxiety in companion animals is not a minor welfare issue. It is pervasive, measurable, and directly impacts both animal wellbeing and owner quality of life.</P>
          <H>PREVALENCE DATA</H>
          <P>• ~72% of dogs display at least one anxiety-related behaviour (Tiira et al., 2016, Applied Animal Behaviour Science)</P>
          <P>• Noise phobia (fireworks, thunderstorms) affects an estimated 25–49% of dogs in the UK (PDSA Animal Wellbeing Report)</P>
          <P>• Separation anxiety affects ~14–17% of dogs in owned populations (Sherman & Mills, 2008)</P>
          <P>• Canine Cognitive Dysfunction (dementia equivalent) affects ~50% of dogs over 11 years old (Azkona et al., 2009)</P>
          <H>THE GAP</H>
          <P>Current interventions are pharmaceutical (with side effects), behavioural (requiring specialist trainers, time, cost), or unproven "relaxation playlists" made for human ears. There is a significant gap for accessible, evidence-based, low-cost complementary support that pet owners can use at home immediately.</P>
        </Section>

        {/* AUDIO SCIENCE */}
        <Section title="THE SCIENCE: WHAT WE KNOW IS REAL" accent="#8aab3a">
          <H>1. SLOW-TEMPO MUSIC AND ANXIETY IN DOGS</H>
          <P>The most rigorously studied area in animal music therapy. Multiple independent research groups have replicated the finding that slow-tempo music (under 60 BPM), simple composition, and minimal percussion measurably reduces anxiety behaviours in dogs.</P>
          <Ref>Wells, D.L. (2002). The influence of auditory stimulation on the behaviour of dogs housed in a rescue shelter. Animal Welfare, 11(4), 385–393. — Found classical music reduced barking, standing, and moving vs. pop/heavy metal/human conversation.</Ref>
          <Ref>Kogan, L.R., Schoenfeld-Tacher, R., & Simon, A.A. (2012). Behavioral effects of auditory stimulation on kenneled dogs. Journal of Veterinary Behavior, 7(5), 268–275. — Shelter dogs spent significantly more time resting with classical music.</Ref>
          <Ref>Bowman, A. et al. (2015). The effect of different genres of music on the stress levels of kennelled dogs. Physiology & Behavior, 143, 104–110. — Queen's University Belfast: classical music significantly reduced urinary cortisol in shelter dogs.</Ref>
          <Ref>Bowman, A. et al. (2017). Four Seasons in an animal rescue centre; classical music reduces environmental stress in kennelled dogs. Physiology & Behavior, 171, 146–151. — 80% of home dogs showed fewer anxiety behaviours; 70%+ of shelter dogs.</Ref>

          <H>2. SPECIES-SPECIFIC FREQUENCY PROFILES</H>
          <P>Animals have fundamentally different hearing biology to humans. Applying human-optimised audio to animals ignores this. Research by Janet Marlow (Pet Acoustics) demonstrated that removing species-agitating frequencies from music produced measurably better calming outcomes than standard recordings.</P>
          <P>Hearing range reference: Dogs 67Hz–45,000Hz (peak sensitivity 1kHz–8kHz). Cats 48Hz–79,000Hz (peak 2kHz–6kHz). Horses 55Hz–33,500Hz (peak 1kHz–16kHz). Each PetSounds51 session applies a species-specific EQ profile: high-pass filter (removing sub-bass rumble that can be startling), low-pass filter (removing harsh highs above comfort threshold), and a gentle peak boost in the species' most sensitive range.</P>

          <H>3. ISOCHRONIC TONE ENTRAINMENT</H>
          <P>Isochronic tones are evenly spaced, amplitude-modulated pulses at a target frequency. Unlike binaural beats (which require separate signals in each ear via headphones), isochronic tones function correctly through any speaker in open air. Neural entrainment via rhythmic auditory stimulation is a well-established neurophysiological phenomenon.</P>
          <P>PetSounds51 uses isochronic tones across all entrainment protocols: alpha range (8–12Hz) for general calm and anxiety reduction; delta range (1–4Hz) for sleep onset in the Night Anxiety protocol; gamma (40Hz) for the pain and cognitive protocols.</P>

          <H>4. 40Hz GAMMA AND NEUROINFLAMMATION</H>
          <P>The 40Hz gamma protocol underpins the Arthritis, Recovery, and Cognitive Decline sessions. This is the most specific and potentially significant area of the science base.</P>
          <Ref>Iaccarino, H.F. et al. (2016). Gamma frequency entrainment attenuates amyloid load and modifies microglia. Nature, 540, 230–235. (MIT) — Demonstrated that 40Hz light/sound stimulation reduced amyloid plaques by ~50% and triggered microglial (immune cell) activation in mouse models of Alzheimer's disease.</Ref>
          <Ref>Martorell, A.J. et al. (2019). Multi-sensory Gamma Stimulation Ameliorates Alzheimer's-Associated Pathology and Improves Cognition. Cell, 177(2), 256–271. — Extended MIT work showing cognitive improvements with combined auditory and visual gamma entrainment.</Ref>
          <P>Application note: This research is in early-stage mammal models and human clinical trials for Alzheimer's disease are ongoing. PetSounds51 applies these findings as complementary wellness support — the 40Hz isochronic tone is layered with calming harmonics and species EQ rather than used in isolation. We make no clinical claims for disease treatment.</P>

          <H>5. BIO-MIMETIC AUDIO (SEPARATION ANXIETY PROTOCOL)</H>
          <P>The separation anxiety protocol uses a distinct architecture: a 65 BPM heartbeat (the rate puppies/kittens hear lying against their mother), a 25Hz/50Hz purr layer (cat self-comfort frequencies — also produces a calming response in dogs and horses), and a slow breath texture. This is not entrainment-based — it is bio-mimetic signal recognition. The animal recognises these sounds as safety cues from their evolutionary biology.</P>
          <Ref>Simonato, M. et al. (2022). Human heartbeat as a calming sound stimulus for dogs: a preliminary study. Animals, 12(14), 1789. — Heartbeat sounds produced measurable relaxation responses in domestic dogs.</Ref>

          <H>6. PERIOPERATIVE AND CLINICAL USE</H>
          <Ref>Mira, F. et al. (2025). Music as a non-pharmacological intervention in veterinary medicine: a systematic review. Frontiers in Veterinary Science. — Systematic review confirming music as a valid perioperative anxiety intervention in dogs and cats, now being standardised in clinical practice.</Ref>
          <Ref>BSAVA (British Small Animal Veterinary Association) clinical guidance notes: patient anxiety is the #1 challenge reported by UK vets in routine consultations.</Ref>
        </Section>

        {/* WHAT WE DON'T CLAIM */}
        <Section title="INTELLECTUAL HONESTY: WHAT WE DON'T CLAIM" accent="#6366f1">
          <P>We believe in full transparency about the limits of the evidence base. PetSounds51 does not claim to:</P>
          <P>• Cure, treat, or diagnose any medical or psychiatric condition in animals</P>
          <P>• Replace veterinary diagnosis, medication, or behavioural therapy</P>
          <P>• Produce guaranteed outcomes — animal responses vary with history, environment, and individual biology</P>
          <P>• Have conducted independent clinical trials of the PetSounds51 platform itself (we build on published third-party research)</P>
          <P>The evidence base for slow-tempo music and species-specific audio in reducing anxiety behaviours is robust and multi-replicated. The evidence for isochronic entrainment in animals specifically is extrapolated from human and mammal model research. We are transparent about this distinction.</P>
          <P>We are actively interested in partnering with veterinary researchers and animal welfare organisations to generate platform-specific outcome data. If you are a researcher — please get in touch.</P>
        </Section>

        {/* AUDIO ARCHITECTURE */}
        <Section title="TECHNICAL ARCHITECTURE: HOW IT WORKS" accent="#06b6d4">
          <P>PetSounds51 generates audio in real-time using the Web Audio API — no pre-recorded files, no server streaming. This means every session is generated fresh, can be run offline, and can apply dynamic species EQ in the browser.</P>
          <H>LAYER STRUCTURE (per session)</H>
          <P>1. <span style={{ color: '#d4a017' }}>Isochronic carrier</span> — square-modulated sine wave at target frequency, isochronic rate matched to therapeutic goal</P>
          <P>2. <span style={{ color: '#d4a017' }}>Harmonic chord stack</span> — just-intonation ratio chords (1:1, 5:4, 3:2) across 3 octaves, slow individual frequency drift to prevent neural adaptation</P>
          <P>3. <span style={{ color: '#d4a017' }}>Brown noise bed</span> — filtered low-pass noise layer for environmental calm and masking (thunderstorm protocol uses wider-spectrum masking noise)</P>
          <P>4. <span style={{ color: '#d4a017' }}>Purr layer</span> — 25Hz and 50Hz sine tones (cat comfort/self-healing frequencies, calming signal for all species)</P>
          <P>5. <span style={{ color: '#d4a017' }}>Breath LFO</span> — slow amplitude modulation at 0.08–0.13Hz (one breath every 8–12 seconds) to prevent neural adaptation and guide breathing rate</P>
          <P>6. <span style={{ color: '#d4a017' }}>Species EQ chain</span> — high-pass, low-pass, and gentle peak boost matched to the selected species' hearing biology</P>
          <H>SPEAKER COMPATIBILITY</H>
          <P>All protocols are designed for open-air playback through standard speakers, TVs, laptops, or Bluetooth speakers. No headphones are required or recommended for animals. Isochronic tones — unlike binaural beats — do not require ear separation to produce their effect.</P>
        </Section>

        {/* BUSINESS MODEL & ETHICS */}
        <Section title="ETHICS & COMMERCIAL MODEL" accent="#f59e0b">
          <P>PetSounds51 is a commercial product operated by Universal Frequency 51 CIC (a Community Interest Company registered in Scotland). The commercial model is intentional and ethical:</P>
          <P>• The Separation Anxiety protocol is permanently free — no card, no signup. If your pet needs help right now, they get it.</P>
          <P>• £29.99/year unlocks all 14 protocols. No price-gouging, no dark patterns, no subscription traps.</P>
          <P>• 10% of every subscription goes directly to animal rescue through UF51 CIC</P>
          <P>• 30-day full refund, no questions</P>
          <P><span style={{ color: '#d4a017', fontWeight: 'bold' }}>Why is PetSounds51 not open source?</span> UF51 the platform — the healing frequencies, the science, the community tools — is open source and free. PetSounds51 is a focused commercial product. The revenue funds the CIC, covers operating costs, and lets the people who built it survive while doing good. Charging fairly for something that works is not at odds with caring — it's what makes caring sustainable.</P>
        </Section>

        {/* RESEARCH PARTNERSHIPS */}
        <Section title="RESEARCH PARTNERSHIPS & CONTACT" accent="#8aab3a">
          <P>We are actively seeking partnerships with:</P>
          <P>• Veterinary schools and animal behaviour departments (outcome study design)</P>
          <P>• Animal rescue organisations (welfare impact measurement)</P>
          <P>• Zoo welfare teams (captive animal enrichment research)</P>
          <P>• NHS and NICE-adjacent researchers (comparative anxiety intervention data)</P>
          <P>If you are a researcher, vet, or animal welfare organisation interested in collaboration — we want to hear from you. The science base deserves to grow and we want to be part of growing it honestly.</P>
          <div className="mt-4 text-center">
            <Link
              to={createPageUrl("PetSounds51")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm"
              style={{ background: 'rgba(138,171,58,0.2)', border: '2px solid #8aab3a', color: '#8aab3a' }}
            >
              ← Back to PetSounds51
            </Link>
          </div>
        </Section>

        <p className="text-center text-xs mt-6" style={{ color: '#4a4030' }}>
          © 2026 Universal Frequency 51 CIC · PetSounds51 is a registered product · Scotland, UK
        </p>
      </div>
    </div>
  );
}