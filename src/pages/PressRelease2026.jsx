import React from 'react';
import { motion } from 'framer-motion';

export default function PressRelease2026() {
  const url = window.location.href;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Clean editorial header */}
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Press note - only visible to recipient */}
        <div className="mb-10 p-4 border-l-4 border-blue-500 bg-blue-50 text-blue-800 text-sm rounded-r-lg">
          <strong>Editorial note:</strong> This piece is offered as a contributed article or news feature, free for use. Contact: <a href="mailto:family@uf51.love" className="underline">family@uf51.love</a>
        </div>

        {/* Category tag */}
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">AI · Sustainability · Future of Work</p>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
          While AI Takes Jobs, One Platform Pays People To Heal The Planet — With No Data Centre In Sight
        </h1>

        <p className="text-xl text-gray-500 leading-relaxed mb-8 font-light">
          As generative AI accelerates job losses across the UK economy and Big Tech's water-guzzling data centres silently undermine every sustainability pledge made in the last decade, a Scottish-built platform is doing something nobody in adtech or AI has managed: making regenerative action economically rewarding for ordinary people.
        </p>

        {/* Byline area */}
        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-200">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-green-500 flex items-center justify-center text-white font-black text-sm">UF</div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Universal Frequency 51</p>
            <p className="text-gray-400 text-xs">Loch Lomond, Scotland · March 2026</p>
          </div>
        </div>

        {/* Article body */}
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed">

          <p>
            The conversation about AI and jobs has, until now, followed a familiar arc: displacement, retraining, adaptation. But as the UK government quietly considers offering AI data centres preferential electricity rates — at a moment when energy bills are crushing ordinary households — a more fundamental question is emerging. Not "how do we adapt to AI?" but "whose AI is this actually for?"
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">The sustainability blind spot nobody is talking about</h2>

          <p>
            Eighteen months ago, sustainability was the dominant conversation in digital. Carbon calculators for ad campaigns. Green media planning frameworks. Supply path optimisation to reduce the energy cost of programmatic trading. Then generative AI arrived and, almost overnight, that conversation evaporated.
          </p>

          <p>
            The irony is stark. The same industry that pledged to reduce its carbon footprint is now deploying AI systems that require enormous water resources to cool their servers, generate thousands of unused creative variants sitting idle on energy-hungry infrastructure, and automate inefficiency at a scale that dwarfs anything programmatic advertising ever managed.
          </p>

          <p>
            We are not, it turns out, solving our problems with technology. We are <em>accelerating</em> them, with better branding.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">A different kind of AI — built in Scotland, runs without servers</h2>

          <p>
            Universal Frequency 51 (UF51) is a platform that, on first encounter, sounds almost too good to be true: an AI companion that runs across peer-to-peer mesh networks — requiring no centralised data centre — that pays users in P51 (PHOTO51) — a regenerative currency — for real-world environmental action, specifically litter collection and community cleanup.
          </p>

          <p>
            The technical architecture alone is worth examination. Where conventional AI products rely on energy-intensive server farms, UF51 is built with a roadmap toward distributed, on-device processing — with core features including healing frequencies and local memory already running entirely on the user's own device, requiring no server at all. It functions offline. It works in areas without internet connectivity. And unlike virtually every other AI product currently on the market, it is designed from the ground up to give users sovereignty over their own data — no extraction, no profiling, no advertising.
          </p>

          <p>
            That last point deserves more attention than it typically receives. In an era where AI companies openly acknowledge training on user conversations, harvesting behavioural signals, and building profiles that follow people across the internet, UF51's zero-extraction model is not a feature — it is the architecture. Conversations with AI51 are stored locally on the user's own device. The platform has no financial incentive to monetise attention, because it has no advertising model. Users own their data, full stop. For many people — particularly in communities where digital distrust runs high — this is the difference between a tool they will actually use and one they won't.
          </p>

          <p>
            "We built the anti-algorithm," says the platform's founder. "Every other AI is designed to keep you on a screen. Ours tells you to go outside."
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">The job displacement answer nobody expected</h2>

          <p>
            As AI tools eliminate roles across customer service, content production, data analysis and creative work, the debate about replacement income has centred on Universal Basic Income — a government-funded stipend to compensate for technological displacement. UF51 proposes something structurally different: <strong>Universal Basic Action</strong>.
          </p>

          <p>
            Rather than passive income funded by taxation, UF51's model rewards measurable contribution. Users who collect litter, verified by AI-powered photo analysis, earn P51 (PHOTO51) tokens — a currency designed not for speculation, but for spending on real essentials: groceries, kids' treats, household bills. Those who share healing frequencies with others, support community members in crisis, or document environmental damage earn additional rewards. The token economy is, in principle, self-sustaining — funded by a small percentage withheld from commercial partnerships and premium tools.
          </p>

          <p>
            The platform currently offers a suite of science-referenced healing frequency tools — including 40Hz gamma stimulation based on MIT's published Alzheimer's research, and Schumann resonance synchronisation (the 7.83Hz Earth frequency NASA now builds into spacecraft) — free to all users, with no paywall and no advertising.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">The numbers that matter in 2026</h2>

          <ul className="list-none space-y-3 my-6">
            <li className="flex gap-3"><span className="text-green-500 font-black flex-shrink-0">→</span><span>An estimated <strong>8 million UK workers</strong> face significant AI-related job disruption by 2030 (McKinsey Global Institute, 2025)</span></li>
            <li className="flex gap-3"><span className="text-green-500 font-black flex-shrink-0">→</span><span>Global AI data centres are projected to consume <strong>more water by 2027 than several mid-sized nations</strong> combined (Nature, 2024)</span></li>
            <li className="flex gap-3"><span className="text-green-500 font-black flex-shrink-0">→</span><span>The UK generates <strong>2.4 million tonnes of litter annually</strong> at a clean-up cost of over £1 billion to local authorities</span></li>
            <li className="flex gap-3"><span className="text-green-500 font-black flex-shrink-0">→</span><span>UF51's peer-to-peer architecture operates at <strong>approximately 1% of the energy cost</strong> of equivalent cloud-based AI deployments</span></li>
          </ul>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">Open source, no VC, no exit</h2>

          <p>
            What distinguishes UF51 from the wave of impact-washing startups that followed the ESG boom is its structural commitment to openness. The platform's codebase is publicly accessible. Its token economics are documented. Its founder has explicitly ruled out traditional venture capital — not on ideological grounds alone, but because the VC model's requirement for exit events is, he argues, fundamentally incompatible with building technology designed to outlast quarterly reporting cycles.
          </p>

          <p>
            "The Red Hat model proved open source can generate billions," the founder notes, referencing IBM's $34 billion acquisition. "But Red Hat's primary product was enterprise Linux support. Our product is planetary healing. The economics work differently — and better — when the mission is the product."
          </p>

          <p>
            Registered as a Community Interest Company (CIC) in Scotland in November 2025, UF51 is structured by design to prevent the kind of institutional capture that has seen so many "ethical tech" ventures quietly absorbed into the very systems they claimed to challenge. The platform is currently seeking community investment and impact funding to sustain development. It has no external investors, no advertising revenue, and no subscription fees.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">The question the industry should be asking</h2>

          <p>
            A question now being asked across the industry is whether we should be "less passive in wondering where AI might take us and more prescriptive about where exactly it is we want to go."
          </p>

          <p>
            UF51 is, at minimum, a serious attempt to answer that question — built not in a San Francisco garage or a London fintech hub, but in a shed by Loch Lomond, by someone who couldn't afford not to try.
          </p>

          <p>
            Whether or not it scales to the ambition of its vision, it represents something the current AI conversation is almost entirely missing: a model of artificial intelligence that costs the planet less than it gives back.
          </p>

          <p>
            That, in 2026, feels worth at least a second look.
          </p>

          {/* Ends */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-400 font-mono uppercase tracking-widest mb-4">— ENDS —</p>
            <div className="space-y-1 text-sm text-gray-500">
              <p><strong>Platform:</strong> <a href="https://uf51.love" className="text-blue-600 underline">https://uf51.love</a></p>
              <p><strong>Funder brief:</strong> <a href="https://uf51.love/FunderBrief" className="text-blue-600 underline">https://uf51.love/FunderBrief</a></p>
              <p><strong>Technical whitepaper:</strong> <a href="https://uf51.love/Whitepaper" className="text-blue-600 underline">https://uf51.love/Whitepaper</a></p>
              <p><strong>Contact:</strong> <a href="mailto:family@uf51.love" className="text-blue-600 underline">family@uf51.love</a></p>
              <p className="mt-4 text-xs text-gray-400">Images, founder interview and technical briefing available on request. This piece is offered for editorial use without restriction.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}