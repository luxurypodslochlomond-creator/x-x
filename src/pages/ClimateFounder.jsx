import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Globe, BookOpen, Film, Award, Heart } from 'lucide-react';
import SignalBeacon from '@/components/climate/SignalBeacon';

// ── Janine's life work — factual, dignified, no contact details (per her wish).
// This page exists so her legacy has a home on the platform she inspired.
// Cold transmission aesthetic — same world as the record. x = x. ──

const ACHIEVEMENTS = [
  {
    icon: Globe,
    title: 'Horizon International',
    body: 'Founder of Horizon International, at Yale University and formerly a Guest of Harvard University. For forty years it worked to find and advance solutions to the interrelated concerns of global health, environment, and poverty.',
    color: '#1e3a2b',
  },
  {
    icon: BookOpen,
    title: 'Two Books, 75 Experts',
    body: 'She conceived and was Editor of two books, with original chapters written by 75 experts, published by Wiley-Blackwell with Horizon International: Water and Sanitation-Related Diseases and the Environment — Challenges, Interventions, and Preventive Measures, and Water and Sanitation-Related Diseases and the Changing Environment — Challenges, Interventions, and Preventive Measures. The Late Dr. Paul Farmer, University Professor at Harvard and Co-Founder of Partners In Health, wrote the Foreword.',
    color: '#1e3a2b',
  },
  {
    icon: Film,
    title: '20 Television Documentaries',
    body: 'Under her direction as Executive Producer, Producer, and Director, Horizon International produced 20 television documentaries — many addressing climate change, from the loss of coral reefs to sustainable energy. Swedish, German, Chinese, and Mexican TV stations were among the co-producers. Lynn Redgrave, Raso Ouedraogo, Johan Forssblad, and Sam Waterston were among the hosts and narrators.',
    color: '#e2602a',
  },
  {
    icon: Award,
    title: 'Recognition & Attribution',
    body: 'National Science Foundation PI for a grant on oceans. Collaborator with several UN entities. Lecturer at Harvard, Yale, Tufts, and Johns Hopkins. Speaker at the World Bank, for the Government of Pakistan, and for the Princess Chulabhorn conference in Thailand. Cancer research at Tufts New-England Medical Center. The UN attributed her and her Horizon team with advancing shea butter production and use by women and children. IUCN, WWF, and the government of Peru attributed her with helping save the vicuña. Horizon International endorsed the One Health Initiative in 2013 — medicine, veterinary science and the environment working as one — joining more than 700 scientists and physicians worldwide. Fellow Emeritus of the Explorers Club, 1996.',
    color: '#1e3a2b',
  },
];

export default function ClimateFounder() {
  const navigate = useNavigate();

  return (
    <div className="twcc-scanlines min-h-screen bg-[#efe7d6] text-[#141210] relative" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      {/* Header — paper, beacon, back */}
      <div className="sticky top-0 z-50 flex items-center gap-3 px-4 py-3 border-b-2 border-[#141210] bg-[#efe7d6]">
        <button onClick={() => navigate(-1)} aria-label="Back" className="w-11 h-11 flex items-center justify-center bg-[#f7f1e5] border-2 border-[#141210] text-[#141210] active:bg-[#e2602a] transition-colors flex-shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#5a5246]">The Founder</span>
      </div>

      {/* Cold epigraph — the covenant mark, same as the record */}
      <div className="bg-[#141210] px-5 py-3 flex flex-col items-center justify-center gap-1.5 border-b border-[#e2602a]/20" style={{ animation: 'twcc-epigraph 1.2s ease-out both' }}>
        <div className="flex items-center justify-center gap-2 w-full">
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
          <span className="text-[8px] font-black font-mono uppercase tracking-[0.15em] text-[#efe7d6]/60 text-center leading-tight">
            A life spent finding what works
          </span>
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
        </div>
        <div className="text-[10px] font-black font-mono text-[#e2602a] tracking-[0.2em] leading-none">
          x = x
        </div>
      </div>

      {/* Hero — the Beirut moment, cold ink, the awakening */}
      <div className="relative bg-[#141210] overflow-hidden">
        {/* O Superman — the pilot's voice, cold in the corner */}
        <div className="absolute top-3 left-5 z-20 flex items-center gap-1.5 pointer-events-none" style={{ animation: 'twcc-flicker 7s linear 2s infinite' }}>
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse" />
          <span className="text-[7px] font-black font-mono uppercase tracking-[0.25em] text-[#efe7d6]/30">Beirut · 1956</span>
        </div>
        {/* Scanline texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #efe7d6 2px, #efe7d6 3px)', animation: 'twcc-scan 0.8s linear infinite' }} />

        <div className="relative z-10 px-6 py-12 flex flex-col items-center justify-center gap-5 text-center min-h-[300px]">
          <SignalBeacon size={48} color="#e2602a" />
          <blockquote className="text-[14px] font-mono leading-relaxed text-[#efe7d6] max-w-md italic" style={{ animation: 'twcc-epigraph 1.4s ease-out .2s both' }}>
            “Startled by oil coating me as I surfaced after my long dive from the deck of the freighter into the Beirut, Lebanon, harbor water, it aroused my initial awareness to damage to Earth. I was 15 years old.”
          </blockquote>
          <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#e2602a]" style={{ animation: 'twcc-epigraph 1.4s ease-out .4s both' }}>
            Janine M. H. Selendy
          </p>
        </div>

        {/* Signal band — the awakening, in orange */}
        <div className="relative z-10 bg-[#e2602a] px-5 py-4" style={{ animation: 'twcc-enter .25s ease-out .08s both' }}>
          <p className="text-[10px] font-black font-mono uppercase leading-relaxed text-[#141210] tracking-wide text-center">
            One moment of clarity became forty years of work
          </p>
        </div>
      </div>

      {/* Name & role — bone band */}
      <div className="px-5 py-8 text-center border-b-2 border-[#141210] bg-[#f7f1e5]">
        <h1 className="text-3xl font-black uppercase text-[#141210] leading-none" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
          Janine M. H. Selendy
        </h1>
        <p className="text-[11px] font-mono text-[#5a5246] mt-3 leading-relaxed max-w-sm mx-auto">
          Chairman, President and Publisher, Horizon International · Yale University<br />
          Four decades of finding and advancing solutions to the interrelated concerns of global health, environment, and poverty.
        </p>

        {/* Build credit — asked for by Janine. Held apart from her own credentials by
            a rule, so it reads as who built the page, never as a title she holds. */}
        <div className="mt-6 pt-5 border-t border-[#141210]/15 max-w-[260px] mx-auto">
          <p className="text-[10px] font-black font-mono uppercase tracking-[0.15em] text-[#e2602a]">
            Made in Scotland from photons
          </p>
          <p className="text-[10px] font-mono text-[#5a5246] mt-1.5 leading-relaxed">
            Platform by Brian Hughes · UF51 CIC
          </p>
        </div>
      </div>

      {/* Achievements — the record of the work */}
      <div className="px-5 py-8 space-y-4">
        <h2 className="text-center font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.025em' }}>
          The Record of the Work
        </h2>
        {ACHIEVEMENTS.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={a.title} className="bg-[#f7f1e5] border border-[#141210] border-t-4 p-5" style={{ borderTopColor: a.color, animation: `twcc-epigraph .5s ease-out ${0.1 * i}s both` }}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4" style={{ color: a.color }} />
                <h3 className="text-[13px] font-black font-mono uppercase tracking-wide text-[#141210]">{a.title}</h3>
              </div>
              <p className="text-[12px] font-mono text-[#141210] leading-relaxed">{a.body}</p>
            </div>
          );
        })}
      </div>

      {/* The signature — her formal attribution, exactly as she writes it.
          The record has to be able to point back to the source. */}
      <div className="px-5 pb-8">
        <div className="bg-[#f7f1e5] border-2 border-[#141210] p-5" style={{ animation: 'twcc-epigraph .5s ease-out .5s both' }}>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-[#e2602a]" />
            <h3 className="text-[13px] font-black font-mono uppercase tracking-wide text-[#141210]">The Signature</h3>
          </div>

          <p className="text-[12px] font-black font-mono text-[#141210] leading-relaxed mb-1">
            Janine M. H. Selendy
          </p>
          <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-5">
            Chairman, President and Publisher, Horizon International<br />
            Fellow Emeritus, The Explorers Club (FN'96)
          </p>

          <div className="space-y-3">
            <a
              href="https://www.solutions-site.org"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-[#141210] bg-[#efe7d6] p-3 active:bg-[#e2602a] transition-colors"
            >
              <span className="block text-[9px] font-black font-mono uppercase tracking-widest text-[#5a5246] mb-1">
                Horizon International Solutions Site
              </span>
              <span className="block text-[12px] font-mono text-[#141210] break-all">
                solutions-site.org
              </span>
            </a>

            <a
              href="https://www.youtube.com/user/jselendy"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-[#141210] bg-[#efe7d6] p-3 active:bg-[#e2602a] transition-colors"
            >
              <span className="block text-[9px] font-black font-mono uppercase tracking-widest text-[#5a5246] mb-1">
                Documentaries &amp; Film Clips
              </span>
              <span className="block text-[12px] font-mono text-[#141210] break-all">
                youtube.com/user/jselendy
              </span>
            </a>
          </div>

          <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mt-5">
            The Solutions Site was created by Horizon International with UNEP, UNDP, UNFPA, UNICEF, the IDRC of Canada, Yale University and colleagues at Harvard — a forum where every accepted entry has been reviewed before publication.
          </p>
        </div>
      </div>

      {/* Her vision — the mantra, cold ink */}
      <div className="relative bg-[#141210] px-5 py-10 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #efe7d6 2px, #efe7d6 3px)', animation: 'twcc-scan 0.8s linear infinite' }} />
        <div className="relative z-10">
          <Heart className="w-6 h-6 text-[#e2602a] mx-auto mb-4" />
          <p className="text-[14px] font-black font-mono uppercase leading-relaxed max-w-sm mx-auto text-[#efe7d6]">
            “Together we can change the course of climate change.”
          </p>
        </div>
      </div>

      {/* Signal band — return */}
      <div className="bg-[#e2602a] px-5 py-5 text-center">
        <Link to="/TogetherChangeClimate" className="inline-flex items-center gap-2 px-5 py-4 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#efe7d6] active:text-[#141210] transition-colors">
          Return to the record <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Footer — no contact details, per her wish */}
      <p className="px-5 py-6 text-center text-[9px] font-mono text-[#5a5246]/60 leading-relaxed">
        In honour of her life's work.<br />
        Horizon International · Yale University
      </p>

      {/* Our voice, in our own footer — never placed under her words. */}
      <p className="px-5 pb-8 text-center text-[9px] font-mono text-[#5a5246]/60 leading-relaxed max-w-md mx-auto">
        This record is built by us, to carry that vision forward — a public service, open to every nation and every tongue.
      </p>
    </div>
  );
}