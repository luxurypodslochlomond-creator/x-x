import React from 'react';
import { Link } from 'react-router-dom';
import RecordBackBar from '@/components/climate/RecordBackBar';
import { ArrowRight, Globe, BookOpen, Film, Award } from 'lucide-react';
import SignalBeacon from '@/components/climate/SignalBeacon';
import RecordPaintedBand from '@/components/climate/RecordPaintedBand';

// ── Janine's life work — factual, dignified, no contact details (per her wish).
// This page exists so her legacy has a home on the platform she inspired.
// Cold transmission aesthetic — same world as the record. x = x. ──

const ACHIEVEMENTS = [
  {
    icon: Globe,
    title: 'Horizon International',
    body: 'Founder of Horizon International, at Yale University and formerly a Guest of Harvard University. For forty years it worked to find and advance solutions to the interrelated concerns of global health, environment, and poverty.',
  },
  {
    icon: BookOpen,
    title: 'Two Books, 75 Experts',
    body: 'She conceived and was Editor of two books, with original chapters written by 75 experts, published by Wiley-Blackwell with Horizon International: Water and Sanitation-Related Diseases and the Environment — Challenges, Interventions, and Preventive Measures, and Water and Sanitation-Related Diseases and the Changing Environment — Challenges, Interventions, and Preventive Measures. The Late Dr. Paul Farmer, University Professor at Harvard and Co-Founder of Partners In Health, wrote the Foreword.',
  },
  {
    icon: Film,
    title: '20 Television Documentaries',
    body: 'Under her direction as Executive Producer, Producer, and Director, Horizon International produced 20 television documentaries — many addressing climate change, from the loss of coral reefs to sustainable energy. Swedish, German, Chinese, and Mexican TV stations were among the co-producers. Lynn Redgrave, Raso Ouedraogo, Johan Forssblad, and Sam Waterston were among the hosts and narrators.',
  },
  {
    icon: Award,
    title: 'Recognition & Attribution',
    body: 'National Science Foundation PI for a grant on oceans. Collaborator with several UN entities. Lecturer at Harvard, Yale, Tufts, and Johns Hopkins. Speaker at the World Bank, for the Government of Pakistan, and for the Princess Chulabhorn conference in Thailand. Cancer research at Tufts New-England Medical Center. The UN attributed her and her Horizon team with advancing shea butter production and use by women and children. IUCN, WWF, and the government of Peru attributed her with helping save the vicuña. Horizon International endorsed the One Health Initiative in 2013 — medicine, veterinary science and the environment working as one — joining more than 700 scientists and physicians worldwide. Fellow Emeritus of the Explorers Club, 1996.',
  },
];

export default function ClimateFounder() {
  return (
    <div className="relative min-h-screen text-record-ink" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Header — paper, the way back, the page's name: the record's one bar. */}
      <RecordBackBar eyebrow="The Founder" />

      {/* Cold epigraph — the covenant mark, same as the record */}
      <div className="record-continuous-band px-5 py-3 flex flex-col items-center justify-center gap-1.5 border-b border-record-paper/20" style={{ animation: 'twcc-epigraph 1.2s ease-out both' }}>
        <div className="flex items-center justify-center gap-2 w-full">
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
          <span className="text-[8px] font-black font-mono uppercase tracking-[0.15em] text-[#efe7d6]/60 text-center leading-tight">
            A life spent finding what works
          </span>
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
        </div>
        <div className="text-[10px] font-black font-mono text-record-mark tracking-[0.2em] leading-none">
          x = x
        </div>
      </div>

      {/* Hero — the Beirut moment, cold ink, the awakening.
          The record's painting stands in the ground behind her sentence now. This is the one
          page where the reader is told what started the whole thing — a girl in harbour water
          at fifteen — so the plate is not flat ink any more: it is the living earth, held far
          back and cooled, and her words sit lit in front of it. The same work, at another
          depth, so the founder's page and the record's front page are printed from one book
          rather than looking like two products by the same hand. */}
      <RecordPaintedBand continuous>
        {/* O Superman — the pilot's voice, cold in the corner */}
        <div className="absolute top-3 left-5 z-20 flex items-center gap-1.5 pointer-events-none" style={{ animation: 'twcc-flicker 7s linear 2s infinite' }}>
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse" />
          <span className="text-[7px] font-black font-mono uppercase tracking-[0.25em] text-[#efe7d6]/30">Beirut · 1956</span>
        </div>


        <div className="relative z-10 px-6 lg:px-10 py-12 lg:py-20 flex flex-col items-center justify-center gap-5 text-center min-h-[300px] lg:min-h-[400px]">
          <SignalBeacon size={48} color="rgb(var(--cartoon-sun))" />
          {/* Her own sentence, in the record's reading voice — it was set in monospace,
              italic, which is the lettering of a listing pretending to be a quotation.
              These are the most human words on the page and they now look like it. */}
          <blockquote className="text-[#efe7d6] max-w-md lg:max-w-3xl italic" style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(20px, 2.4vw, 27px)', lineHeight: 1.5, animation: 'twcc-epigraph 1.4s ease-out .2s both' }}>
            “Startled by oil coating me as I surfaced after my long dive from the deck of the freighter into the Beirut, Lebanon, harbor water, it aroused my initial awareness to damage to Earth. I was 15 years old.”
          </blockquote>
          <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#e2602a]" style={{ animation: 'twcc-epigraph 1.4s ease-out .4s both' }}>
            Janine M. H. Selendy
          </p>
        </div>

        {/* Signal band — the awakening, in orange */}
        <div className="relative z-10 bg-[#e2602a] px-5 lg:px-10 py-4 lg:py-5" style={{ animation: 'twcc-enter .25s ease-out .08s both' }}>
          <p className="text-[10px] font-black font-mono uppercase leading-relaxed text-[#141210] tracking-wide text-center">
            One moment of clarity became forty years of work
          </p>
        </div>
      </RecordPaintedBand>

      {/* Name & role — bone band */}
      <div className="record-reading-panel px-5 lg:px-10 py-8 lg:py-14 text-center border-b-2 border-[#141210] bg-[#f7f1e5]">
        <h1 className="uppercase text-[#141210] leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 3.4vw, 54px)', letterSpacing: '0.004em' }}>
          Janine M. H. Selendy
        </h1>
        {/* Her role gets its own line and one clear step above the sentence that
            explains it. Both used to sit in one paragraph at one size, so the eye
            could not tell her title from its own description. Her name is untouched. */}
        <p className="text-[15px] lg:text-[17px] font-black font-mono uppercase tracking-[0.16em] text-[#141210] mt-5">
          Founder
        </p>
        <p className="text-[11px] lg:text-[13px] font-mono text-[#5a5246] mt-3 leading-relaxed max-w-sm lg:max-w-2xl mx-auto">
          Four decades of finding and advancing solutions to the interrelated concerns of global health, environment, and poverty.
        </p>

        {/* Build credit. Held apart from her own credentials by a rule, so it reads as
            who built the page, never as a title she holds. No badge, no handle: the
            platform is named plainly and the CIC is the only address, and it never
            prints itself — it opens the mail app when tapped. */}
        <div className="mt-6 pt-5 border-t border-[#141210]/15 max-w-[400px] mx-auto">
          <span className="block text-[10px] font-black font-mono uppercase tracking-[0.15em] text-[#e2602a]">
            Made in Scotland from photons
          </span>

          {/* The plate is not printed here. It stood under her name for one evening and it
              was in the wrong place twice over: a printer's colophon belongs at the foot of
              the sheet, not between the founder's name and her work, and the record already
              prints it at the foot of every page. What stays is the one line that belongs to
              this page — where it was made — and the only address the record gives.

              "Record kept by UF51 CIC" was taken off here at Janine's request, 9 November:
              "'Kept by…' adds confusion and uncertainty" for a potential host. */}
          <a
            href="mailto:family@uf51.love"
            aria-label="Contact UF51 CIC about this record"
            className="block mt-3 transition-opacity active:opacity-60"
          >
            <span className="block text-[9px] font-black font-mono uppercase tracking-[0.18em] text-[#141210] underline underline-offset-4 decoration-[#e2602a]">
              Contact UF51 CIC
            </span>
          </a>
        </div>
      </div>

      <div className="record-reading-panel">
      {/* Achievements — the record of the work */}
      <div className="record-reading-column mx-auto w-full max-w-[820px] lg:max-w-[900px] px-5 lg:px-0 py-8 lg:py-14 space-y-4 lg:space-y-5">
        <h2 className="text-center font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.2vw, 32px)', letterSpacing: '-0.025em' }}>
          The Record of the Work
        </h2>
        {/* One rule and one accent for every card. These four used to carry the record's
            semantic colours as decoration — the green that means "action" and the ocean that
            means "a wire entry" — so a colour that means something on the map meant nothing
            here. On this page the only accent is the record's own signal. */}
        {ACHIEVEMENTS.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={a.title} className="bg-[#f7f1e5] border border-[#141210] border-t-4 p-5 lg:p-7" style={{ animation: `twcc-epigraph .5s ease-out ${0.1 * i}s both` }}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-[#e2602a]" />
                <h3 className="text-[13px] font-black font-mono uppercase tracking-wide text-[#141210]">{a.title}</h3>
              </div>
              <p className="text-[12px] lg:text-[13.5px] font-mono text-[#141210] leading-relaxed lg:leading-[1.75]">{a.body}</p>
            </div>
          );
        })}
      </div>

      {/* The signature — her own words only: "Founder". She asked for the other
          titles to come off, at the top and at the end, 23 October 2026. */}
      <div className="mx-auto w-full max-w-[820px] lg:max-w-[900px] px-5 lg:px-0 pb-8 lg:pb-14">
        <div className="bg-[#f7f1e5] border-2 border-[#141210] p-5 lg:p-7" style={{ animation: 'twcc-epigraph .5s ease-out .5s both' }}>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-[#e2602a]" />
            <h3 className="text-[13px] font-black font-mono uppercase tracking-wide text-[#141210]">The Signature</h3>
          </div>

          <p className="text-[12px] font-black font-mono text-[#141210] leading-relaxed mb-1">
            Janine M. H. Selendy
          </p>
          <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-5">
            Founder
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

          {/* Her own closing credits, in her own words — the fellowship she prints
              herself. Not a post she held, so it stays off the title line above. */}
          <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mt-5">
            Selendy FN'96 Explorers Club. Fellow Emeritus.
          </p>

          <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mt-3">
            The Solutions Site was created by Horizon International with UNEP, UNDP, UNFPA, UNICEF, the IDRC of Canada, Yale University and colleagues at Harvard — a forum where every accepted entry has been reviewed before publication.
          </p>
        </div>
      </div>

      </div>

      {/* Her vision — the mantra, in the light of the same painting. The last dark block of
          her page carries the work at its warmest crop: a book should not close on a slab of
          ink after opening on a world. */}
      <RecordPaintedBand continuous className="px-5 lg:px-10 py-10 lg:py-20 text-center">
        <div className="relative z-10">
          {/* The same living beacon she is met with at the top of the page, so the page
              opens and closes on one signal rather than on a heart that only sits there. */}
          <div className="flex justify-center mb-4">
            <SignalBeacon size={34} color="#e2602a" />
          </div>
          <p className="max-w-sm lg:max-w-2xl mx-auto text-[#efe7d6]" style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(21px, 2.6vw, 30px)', lineHeight: 1.42 }}>
            “Together we can change the course of climate change.”
          </p>
        </div>
      </RecordPaintedBand>

      {/* Signal band — return */}
      <div className="bg-[#e2602a] px-5 lg:px-10 py-5 lg:py-8 text-center">
        <Link to="/TogetherChangeClimate" className="inline-flex items-center gap-2 px-5 py-4 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#efe7d6] active:text-[#141210] transition-colors">
          Return to the record <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Footer — no contact details, per her wish */}
      <p className="record-reading-panel px-5 py-6 text-center text-[9px] font-mono text-[#5a5246]/60 leading-relaxed">
        In honour of her life's work.<br />
        Horizon International · Yale University
      </p>

      {/* Our voice used to be printed here as a small grey paragraph. It said, in one
          sentence, what the record's own colophon now says in names at the foot of the
          page — so it is not said twice. Her page closes on her, and the book closes on
          who made it. */}
    </div>
  );
}