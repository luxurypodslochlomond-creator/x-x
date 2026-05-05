import React, { useEffect } from 'react';
import { Download, MapPin, Globe, ExternalLink } from 'lucide-react';

// Clean, human, confident. No ego. No pitch deck energy.
// Reads like a great first conversation, not a press release.

const Divider = () => <div className="border-t border-gray-200 my-8" />;

const SectionLabel = ({ children }) => (
  <p className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400 mb-4">{children}</p>
);

const Role = ({ title, org, period, location, paras }) => (
  <div className="mb-8">
    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
      <div>
        <span className="font-bold text-gray-900 text-[15px]">{title}</span>
        <span className="text-gray-500 mx-2">·</span>
        <span className="text-gray-600 text-[15px]">{org}</span>
      </div>
      <span className="text-gray-400 text-sm whitespace-nowrap">{period}</span>
    </div>
    {location && <p className="text-gray-400 text-xs mb-3">{location}</p>}
    <div className="space-y-2">
      {paras.map((p, i) => (
        <p key={i} className="text-gray-600 text-sm leading-relaxed">{p}</p>
      ))}
    </div>
  </div>
);

export default function BrianHughesCV() {
  useEffect(() => {
    document.title = 'Brian Hughes CV';
    
    // Force the share/print title
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = 'Brian Hughes CV';
    
    // Override OG tags for sharing
    const ogTags = {
      'og:title': 'Brian Hughes CV',
      'og:description': 'CV · Product & Leadership'
    };
    
    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .cv-page { padding: 32px !important; max-width: 100% !important; box-shadow: none !important; }
        }
        @media screen {
          .cv-page { max-width: 720px; }
        }
      `}</style>

      {/* TOP BAR - screen only */}
      <div className="no-print bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-10 gap-4">
        <span className="text-sm text-gray-400 font-medium">Brian Hughes · CV</span>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </button>
      </div>

      {/* CV */}
      <div className="cv-page mx-auto px-8 py-12">

        {/* NAME & ROLE */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Brian Hughes</h1>

          <div className="flex flex-wrap gap-5 text-sm text-gray-500">
            <a href="https://uf51.love" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-800 transition-colors">
              <Globe className="w-3.5 h-3.5" />
              uf51.love
            </a>
            <a href="https://en.wikipedia.org/wiki/KILTR" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-800 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
              Wikipedia · KILTR
            </a>
          </div>
        </div>

        {/* ABOUT - the most important part. Human, honest, direct. */}
        <div className="mb-10">
          <p className="text-gray-700 text-[15px] leading-relaxed mb-3">
            I build AI-powered products. I spent nine years co-founding and running KILTR, Scotland's largest social 
            network, which reached 100,000 users. I also shipped SwipeWiFi, a licensed SaaS product across multiple 
            territories. The last few years I've been exploring what's actually worth building — tools that solve real 
            problems for people who usually can't afford the professional version. Every product I ship is live and 
            in use.
          </p>
          <p className="text-gray-700 text-[15px] leading-relaxed mb-3">
            What I've learned: the best product work happens when you stay genuinely curious about who's actually 
            using it. Not personas. Real people. I'm most useful in the space between a real problem and a thing 
            that solves it — talking to users, finding what they actually need, and helping a team move toward it 
            without losing focus. I've built teams from scratch before, managed complex multi-stakeholder relationships 
            (including investors and legal teams through compliance processes), and I know how to think about what matters.
          </p>
          <p className="text-gray-700 text-[15px] leading-relaxed">
            I'm looking to join a team and focus. Solo building teaches you a lot but it's not the same as working 
            with people who challenge your thinking. That's what I want next.
          </p>
        </div>

        <Divider />

        {/* WHAT I'M DOING NOW */}
        <div className="mb-10">
          <SectionLabel>Currently</SectionLabel>

          <Role
            title="Founder"
            org="UF51"
            period="Nov 2024 — present"
            paras={[
              "After KILTR I spent a few years trying to work out what was actually worth building. That led to UF51 — a community interest company focused on tools that solve real problems for people who usually can't afford the professional version: legal letter decoders, sound therapy for anxious pets, procurement intelligence for councils, artist management for independent musicians.",
              "Everything is live. Most of it I built alone with AI tooling. It's taught me a lot about what it takes to ship something real — and also confirmed that I work better as part of a team than on my own.",
              "The products I'm most proud of aren't the technically ambitious ones. They're the ones where someone messages to say it helped."
            ]}
          />
        </div>

        <Divider />

        {/* EXPERIENCE */}
        <div className="mb-10">
          <SectionLabel>Experience</SectionLabel>

          <Role
            title="Co-Founder & CEO"
            org="KILTR · CollectivWorks"
            period="2009 — 2018"
            paras={[
              "KILTR was Scotland's professional and cultural social network — we built it from scratch in Glasgow and grew it to 100,000 users over nine years. I led product vision, roadmap and user experience throughout, and managed the company through multiple investment rounds, a major strategic pivot, and eventually closure.",
              "The most useful thing I learned there wasn't about technology. It was about what happens when you stop listening to users and start listening to investors instead. We did both well at different times, and the product was always better when users came first.",
              "In 2016 we pivoted to CollectivWorks — a WiFi marketing platform for hospitality venues — which reached 65+ locations across Scotland and secured new investment for international expansion."
            ]}
          />

          <Role
            title="Co-Publisher"
            org="Hi-Tech Scotland"
            period="2005 — 2009"
            paras={[
              "Scotland's leading business technology magazine. Running it gave me a deep network across the Scottish tech and investment community, and a working understanding of how businesses make decisions about technology — which turned out to be directly useful when we started KILTR."
            ]}
          />
        </div>

        <Divider />

        {/* HOW I WORK */}
        <div className="mb-10">
          <SectionLabel>How I work</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            {[
              {
                label: "Talking to users",
                text: "Not as a process step. As the actual job. I think the most important product work happens in conversations, not documents."
              },
              {
                label: "Making decisions with incomplete information",
                text: "I've spent years doing this. I'm comfortable with ambiguity and I know the difference between needing more data and just being afraid to commit."
              },
              {
                label: "Keeping things simple",
                text: "I have a strong bias toward removing things. Features, words, steps. The fewer decisions a user has to make, the better the product."
              },
              {
                label: "Working across the whole stack",
                text: "I can sit in a technical conversation and understand what's being traded off. I can also write the copy, draw the flow and talk to the customer. Not because I have to — because it makes the work better."
              },
            ].map(({ label, text }) => (
              <div key={label}>
                <p className="font-semibold text-gray-900 text-sm mb-1">{label}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* EDUCATION */}
        <div className="mb-10">
          <SectionLabel>Education</SectionLabel>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>MSc Enterprise & Business Growth</span>
              <span className="text-gray-400">Glasgow University Business School</span>
            </div>
            <div className="flex justify-between">
              <span>BA Marketing & Communications</span>
              <span className="text-gray-400">Glasgow</span>
            </div>
            <div className="flex justify-between">
              <span>Physics & Chemistry</span>
              <span className="text-gray-400">Glasgow Caledonian University</span>
            </div>
          </div>
        </div>

        <Divider />

        {/* FOOTER */}


        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400 mt-8">
          <span>Stoneymollan, Loch Lomond, Scotland G83 8QU</span>
          <span className="no-print">Available immediately · Right to work in UK</span>
        </div>

      </div>
    </div>
  );
}