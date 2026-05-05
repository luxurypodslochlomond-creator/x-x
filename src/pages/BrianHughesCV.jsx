import React, { useRef } from 'react';
import { Globe, Mail, ExternalLink, Download, MapPin, Zap, Brain, Radio, Shield, Sparkles, Code } from 'lucide-react';

const Section = ({ title, color = 'cyan', children }) => {
  const colors = {
    cyan: 'border-cyan-500 text-cyan-400',
    pink: 'border-pink-500 text-pink-400',
    green: 'border-green-500 text-green-400',
    amber: 'border-amber-500 text-amber-400',
  };
  return (
    <div className="mb-8">
      <div className={`border-l-4 ${colors[color].split(' ')[0]} pl-4 mb-4`}>
        <h2 className={`text-xs font-black font-mono tracking-[0.3em] uppercase ${colors[color].split(' ')[1]}`}>{title}</h2>
      </div>
      {children}
    </div>
  );
};

const Role = ({ title, company, period, bullets }) => (
  <div className="mb-6">
    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
      <div>
        <h3 className="text-white font-black text-base">{title}</h3>
        <p className="text-cyan-400 font-bold text-sm font-mono">{company}</p>
      </div>
      <span className="text-gray-500 text-xs font-mono bg-white/5 px-2 py-1 rounded whitespace-nowrap">{period}</span>
    </div>
    <ul className="space-y-1.5">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-2 text-gray-300 text-sm leading-relaxed">
          <span className="text-cyan-500 mt-1.5 flex-shrink-0 text-xs">▸</span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Chip = ({ text, color = 'cyan' }) => {
  const colors = {
    cyan: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/5',
    pink: 'border-pink-500/40 text-pink-300 bg-pink-500/5',
    green: 'border-green-500/40 text-green-300 bg-green-500/5',
    amber: 'border-amber-500/40 text-amber-300 bg-amber-500/5',
  };
  return (
    <span className={`border text-xs font-bold font-mono px-2 py-1 rounded ${colors[color]}`}>{text}</span>
  );
};

export default function BrianHughesCV() {
  const cvRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* PRINT STYLES */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .cv-container { max-width: 100% !important; padding: 20px !important; background: white !important; color: black !important; }
          .cv-container * { color: black !important; border-color: #ccc !important; background: transparent !important; }
          .print-header { border-bottom: 2px solid black !important; }
        }
        @media screen {
          .cv-container { max-width: 860px; }
        }
      `}</style>

      {/* DOWNLOAD BAR */}
      <div className="no-print sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-cyan-500/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 font-black font-mono text-sm tracking-widest">CV · BRIAN HUGHES</span>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-sm px-4 py-2 rounded-lg transition-all"
        >
          <Download className="w-4 h-4" />
          Download / Print PDF
        </button>
      </div>

      {/* CV CONTENT */}
      <div ref={cvRef} className="cv-container mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="print-header border-b border-cyan-500/30 pb-8 mb-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              {/* COOLASFUCK WAVEFORM MARK */}
              <div className="flex items-center gap-3 mb-4">
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="no-print">
                  <path d="M2 12 L6 12 L8 4 L10 20 L12 8 L14 16 L16 2 L18 22 L20 6 L22 18 L24 10 L26 14 L28 8 L30 16 L32 12 L36 12 L38 12"
                    stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" fill="none"
                    style={{ filter: 'drop-shadow(0 0 4px #06b6d4)' }} />
                </svg>
                <span className="text-xs font-black font-mono text-cyan-500/60 tracking-[0.4em] uppercase">UF51 · VERIFIED</span>
              </div>

              <h1 className="text-4xl font-black text-white tracking-tight leading-none mb-1">Brian Hughes</h1>
              <p className="text-cyan-400 font-black font-mono text-lg tracking-widest mb-4">HEAD OF PRODUCT</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                  Glasgow, Scotland · UK
                </span>
                <a href="https://uf51.love" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  uf51.love
                </a>
                <a href="https://en.wikipedia.org/wiki/KILTR" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Wikipedia · KILTR
                </a>
                <a href="https://www.bbc.co.uk/news/uk-scotland-scotland-business-44380413" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                  BBC · Press
                </a>
              </div>
            </div>

            {/* STATS BLOCK */}
            <div className="flex gap-4 flex-wrap">
              {[
                { val: '£6.25M', label: 'Raised' },
                { val: '100K', label: 'Users' },
                { val: '15+', label: 'AI Products' },
                { val: '20+', label: 'Yrs Experience' },
              ].map(({ val, label }) => (
                <div key={label} className="text-center border border-cyan-500/20 rounded-lg px-4 py-3 bg-cyan-500/5">
                  <div className="text-2xl font-black text-cyan-400 leading-none">{val}</div>
                  <div className="text-xs text-gray-500 font-mono mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="mt-8 p-5 border border-cyan-500/20 rounded-xl bg-cyan-500/5">
            <p className="text-gray-200 text-sm leading-relaxed">
              Serial founder, product strategist and AI practitioner with 20+ years building technology platforms from zero to scale.
              Co-founded and led <strong className="text-white">KILTR</strong> — Scotland's largest social network — for 9 years, raising £6.25M and reaching 100,000 users.
              Featured on <strong className="text-white">BBC Radio 4</strong> alongside Foursquare and Path. Currently shipping a 15-product AI ecosystem solo under <strong className="text-white">UF51</strong>.
              I've done every part of the product journey — from napkin sketch to live paying customers — and I bring that full-stack founder perspective to every team I work with.
            </p>
          </div>
        </div>

        {/* EXPERIENCE */}
        <Section title="Experience" color="cyan">
          <Role
            title="Founder & Head of Product"
            company="UF51 — Universal Frequency 51"
            period="2022 — Present"
            bullets={[
              "Sole product architect across 15+ live AI tools: PetSounds51 (animal sound therapy SaaS), SORTED (AI legal document decoder), CB51 (artist management platform), CTRL51 (procurement spend intelligence at £5k/month), BuzzStop (AI tinnitus cancellation engine), TRACKT (RFID asset management)",
              "Full product lifecycle ownership: discovery, strategy, roadmap, build, launch, monetisation — zero external dev team",
              "Practical AI embedded throughout every product: LLM workflows, real-time audio generation, psychoacoustic protocols, automated pipelines, push notifications",
              "Live paying customers across multiple product lines; open API platform with external developers building on UF51 infrastructure",
              "Built on modern full-stack: React, Deno, Stripe, PWA, Web Audio API, real-time subscriptions"
            ]}
          />

          <Role
            title="Co-Founder & CEO"
            company="KILTR · CollectivWorks"
            period="2009 — 2018"
            bullets={[
              "Co-founded KILTR — Scotland's leading social and professional network for Scottish culture, business and diaspora — from concept to 100,000 registered users",
              "Raised £6.25M across multiple investment rounds from Par Equity, Scottish Investment Bank (Scottish Enterprise), Barwell and international investors",
              "Featured on BBC Radio 4's 'The Secret History of Social Networking' alongside Foursquare and Path; covered by BBC, The Scotsman, The Herald, Scottish Business Insider and The Drum",
              "Led full product vision, UX strategy, roadmap, team management, board governance and commercial partnerships across B2B and B2C",
              "Pivoted business to CollectivWorks — a WiFi marketing platform helping hospitality and retail brands communicate with customers without passwords or email capture",
              "CollectivWorks live in 65+ Scottish venues; secured new Singapore-based major investor for international expansion"
            ]}
          />

          <Role
            title="Co-Publisher"
            company="Hi-Tech Scotland Magazine"
            period="2005 — 2009"
            bullets={[
              "Co-published Scotland's leading business technology magazine, securing advertising from global players including Microsoft and Oracle",
              "Built deep relationships across Scotland's tech ecosystem, investors, enterprise clients and government bodies",
              "Network built through Hi-Tech Scotland directly led to KILTR's seed investment from Par Equity"
            ]}
          />
        </Section>

        {/* EDUCATION */}
        <Section title="Education" color="pink">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { degree: 'MSc Enterprise & Business Growth', school: 'Glasgow University Business School' },
              { degree: 'BA (Hons) Marketing Communications', school: 'Glasgow' },
              { degree: 'Physics & Chemistry', school: 'Glasgow Caledonian University' },
            ].map(({ degree, school }) => (
              <div key={degree} className="border border-white/10 rounded-lg p-4 bg-white/2">
                <p className="text-white font-bold text-sm leading-snug mb-1">{degree}</p>
                <p className="text-gray-500 text-xs font-mono">{school}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* SKILLS */}
        <Section title="Skills & Capabilities" color="green">
          <div className="space-y-4">
            {[
              {
                label: 'Product Leadership',
                color: 'cyan',
                chips: ['Vision & Strategy', 'Roadmap', 'User Discovery', 'OKRs', 'B2B SaaS', 'B2C', 'Experimentation', 'Monetisation']
              },
              {
                label: 'AI — Practical Daily Use',
                color: 'pink',
                chips: ['LLM Integration', 'Prompt Engineering', 'Automated Workflows', 'AI Audio', 'Psychoacoustics', 'Real-time AI']
              },
              {
                label: 'Commercial & Leadership',
                color: 'green',
                chips: ['Fundraising £6.25M', 'Investor Relations', 'Board Governance', 'Team Building', 'Partnerships', 'B2B Sales']
              },
              {
                label: 'Technical',
                color: 'amber',
                chips: ['React', 'APIs', 'Stripe', 'PWA', 'Web Audio API', 'Deno', 'Realtime Systems', 'No-code / AI-code']
              },
            ].map(({ label, color, chips }) => (
              <div key={label}>
                <p className="text-gray-500 text-xs font-mono mb-2">{label}</p>
                <div className="flex flex-wrap gap-2">
                  {chips.map(c => <Chip key={c} text={c} color={color} />)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* PRESS & RECOGNITION */}
        <Section title="Press & Recognition" color="amber">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { outlet: 'BBC Radio 4', note: 'Featured in "The Secret History of Social Networking" alongside Foursquare & Path' },
              { outlet: 'BBC News Scotland', note: 'KILTR covered at launch and closure — national business story' },
              { outlet: 'The Scotsman', note: 'Multiple features on KILTR and Brian Hughes across the platform\'s lifetime' },
              { outlet: 'Wikipedia', note: 'KILTR has its own Wikipedia article — en.wikipedia.org/wiki/KILTR' },
              { outlet: 'Scottish Business Insider', note: 'In-depth coverage of KILTR and CollectivWorks pivot' },
              { outlet: 'The Herald', note: 'Interview and profile on founding story and Scottish tech ecosystem' },
            ].map(({ outlet, note }) => (
              <div key={outlet} className="flex items-start gap-3 border border-white/5 rounded-lg p-3 bg-white/2">
                <span className="text-amber-400 font-black text-xs font-mono mt-0.5 whitespace-nowrap">{outlet}</span>
                <span className="text-gray-400 text-xs leading-relaxed">{note}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* FOOTER */}
        <div className="border-t border-white/10 pt-6 mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg width="24" height="14" viewBox="0 0 40 24" fill="none" className="no-print">
              <path d="M2 12 L6 12 L8 4 L10 20 L12 8 L14 16 L16 2 L18 22 L20 6 L22 18 L24 10 L26 14 L28 8 L30 16 L32 12 L36 12"
                stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
            <span className="text-gray-600 text-xs font-mono">Brian Hughes · brianhughes@[your email] · uf51.love</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-xs font-mono">Available immediately · UK-based · Eligible to work in UK</span>
          </div>
        </div>

        {/* NO-PRINT NOTE */}
        <div className="no-print mt-6 text-center">
          <p className="text-gray-600 text-xs">
            Click <strong className="text-cyan-400">Download / Print PDF</strong> above → Save as PDF in print dialog
          </p>
        </div>

      </div>
    </div>
  );
}