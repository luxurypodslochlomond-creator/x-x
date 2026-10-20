import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Globe, BookOpen, Film, Award, Heart } from 'lucide-react';
import SignalBeacon from '@/components/climate/SignalBeacon';

// ── Janine's life work — factual, dignified, no contact details (per her wish).
// This page exists so her legacy has a home on the platform she inspired. ──

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
    body: 'She conceived and was Editor of two books with original chapters written by 75 experts: Water and Sanitation Related Diseases and the Changing Environment — Challenges, Interventions and Preventive Measures. Published by Wiley-Blackwell with Horizon International. The Late Dr. Paul Farmer, University Professor at Harvard and Co-Founder of Partners In Health, wrote the Foreword.',
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
    title: 'Recognition &Attribution',
    body: 'National Science Foundation PI for a grant on oceans. Collaborator with several UN entities. Lecturer at Harvard, Yale, Tufts, and Johns Hopkins. Speaker at the World Bank, for the Government of Pakistan, and for the Princess Chulabhorn conference in Thailand. Cancer research at Tufts New-England Medical Center. The UN attributed her and her Horizon team with advancing shea butter production and use by women and children. IUCN, WWF, and the government of Peru attributed her with helping save the vicuña. Fellow Emeritus of the Explorers Club, 1996.',
    color: '#1e3a2b',
  },
];

export default function ClimateFounder() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#141210]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      {/* Header — paper, beacon, back */}
      <div className="sticky top-0 z-50 flex items-center gap-3 px-4 py-3 border-b-2 border-[#141210] bg-[#efe7d6]">
        <button onClick={() => navigate(-1)} aria-label="Back" className="w-11 h-11 flex items-center justify-center bg-[#f7f1e5] border-2 border-[#141210] text-[#141210] active:bg-[#e2602a] transition-colors flex-shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#5a5246]">The Founder</span>
      </div>

      {/* Hero — the Beirut moment, the awakening */}
      <div className="relative min-h-[260px] bg-[#f7f1e5] border-b-2 border-[#141210] flex flex-col items-center justify-center gap-4 px-6 py-10 text-center">
        <SignalBeacon size={48} color="#b3261e" />
        <blockquote className="text-[15px] font-mono leading-relaxed text-[#141210] max-w-md italic">
          “Startled by oil coating me as I surfaced after my long dive from the deck of the freighter into the Beirut, Lebanon, harbor water, it aroused my initial awareness to damage to Earth. I was 15 years old.”
        </blockquote>
        <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#5a5246]">Janine M. H. Selendy</p>
      </div>

      {/* Name & role */}
      <div className="px-5 py-8 text-center border-b-2 border-[#141210]">
        <h1 className="text-3xl font-black uppercase text-[#141210] leading-none" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', letterSpacing: '-0.02em' }}>
          Janine M. H. Selendy
        </h1>
        <p className="text-[11px] font-mono text-[#5a5246] mt-3 leading-relaxed max-w-sm mx-auto">
          Founder of Horizon International · Yale University<br />
          Four decades of finding and advancing solutions to the interrelated concerns of global health, environment, and poverty.
        </p>
      </div>

      {/* Achievements */}
      <div className="px-5 py-8 space-y-4">
        {ACHIEVEMENTS.map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.title} className="bg-[#f7f1e5] border border-[#141210] border-t-4 p-5" style={{ borderTopColor: a.color }}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4" style={{ color: a.color }} />
                <h3 className="text-[13px] font-black font-mono uppercase tracking-wide text-[#141210]">{a.title}</h3>
              </div>
              <p className="text-[12px] font-mono text-[#141210] leading-relaxed">{a.body}</p>
            </div>
          );
        })}
      </div>

      {/* Her vision — the mantra */}
      <div className="px-5 py-8 bg-[#1e3a2b] text-[#efe7d6] text-center">
        <Heart className="w-6 h-6 text-[#e2602a] mx-auto mb-4" />
        <p className="text-[14px] font-black font-mono uppercase leading-relaxed max-w-sm mx-auto">
          “Together we can change the course of climate change.”
        </p>
        <p className="text-[10px] font-mono text-[#efe7d6]/70 mt-4 leading-relaxed max-w-sm mx-auto">
          This platform is built to carry that vision forward — a public record, open to every nation, every tongue, so no one is left behind.
        </p>
      </div>

      {/* Back to the record */}
      <div className="px-5 py-8 text-center">
        <Link to="/TogetherChangeClimate" className="inline-flex items-center gap-2 px-5 py-4 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors">
          Return to the record <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Footer — no contact details, per her wish */}
      <p className="px-5 pb-8 text-center text-[9px] font-mono text-[#5a5246]/60 leading-relaxed">
        In honour of her life's work.<br />
        Horizon International · Yale University
      </p>
    </div>
  );
}