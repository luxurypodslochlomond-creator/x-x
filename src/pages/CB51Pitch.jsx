import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import {
  Radio, DollarSign, Users, Zap, CheckCircle, Mail, Calendar,
  TrendingUp, Globe, Shield, ArrowRight, Star, Brain, Music,
  Phone, ChevronDown, ChevronUp
} from 'lucide-react';

/**
 * CB51 INVESTOR / FUNDING PITCH PAGE
 * Built for Scott Hughes — ex Lewis Capaldi manager
 * Clean. Confident. Real numbers. Real story.
 */

const STAT = ({ number, label, sub }) => (
  <div className="text-center p-6 border-2 border-cyan-400/30 bg-black">
    <p className="text-4xl md:text-5xl font-black text-cyan-400 font-mono">{number}</p>
    <p className="text-white font-bold mt-1 text-sm">{label}</p>
    {sub && <p className="text-gray-500 text-xs mt-1 font-mono">{sub}</p>}
  </div>
);

const PROBLEM = ({ text }) => (
  <div className="flex items-start gap-3 border-l-4 border-red-500 pl-4 py-1">
    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
    <p className="text-white font-mono text-sm leading-relaxed">{text}</p>
  </div>
);

const SOLUTION = ({ text }) => (
  <div className="flex items-start gap-3 border-l-4 border-cyan-400 pl-4 py-1">
    <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
    <p className="text-white font-mono text-sm leading-relaxed">{text}</p>
  </div>
);

const REVENUE = ({ tier, price, who, how }) => (
  <div className="border-2 border-white/10 bg-black p-6 space-y-2">
    <div className="flex items-start justify-between gap-2">
      <p className="text-cyan-400 font-black font-mono text-lg">{tier}</p>
      <p className="text-green-400 font-black font-mono text-lg">{price}</p>
    </div>
    <p className="text-white text-sm font-bold">{who}</p>
    <p className="text-gray-500 text-xs font-mono leading-relaxed">{how}</p>
  </div>
);

const FAQ = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-white font-bold text-sm">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-gray-400 text-sm font-mono leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
};

export default function CB51PitchPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── HERO ── */}
      <div className="bg-gradient-to-b from-cyan-950/40 to-black border-b border-cyan-500/20 px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <Radio className="w-16 h-16 text-cyan-400 mx-auto" />
          <h1 className="text-6xl md:text-8xl font-black text-cyan-400 font-mono tracking-tight">CB51</h1>
          <p className="text-2xl md:text-3xl font-black text-white">AI Co-Manager for Artists</p>
          <p className="text-gray-400 font-mono text-lg max-w-2xl mx-auto leading-relaxed">
            The music industry generates £7.1B annually in the UK alone.
            Every manager, band, and indie label is still running on WhatsApp and Gmail.
            <span className="text-cyan-400 font-bold"> We fix that.</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link to={createPageUrl('CB51')}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-cyan-400 text-black font-black px-8 py-4 text-lg font-mono hover:bg-cyan-300 transition-colors"
              >
                TRY CB51 LIVE →
              </motion.button>
            </Link>
            <a href="mailto:hello@cb51.io">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="border-2 border-cyan-400 text-cyan-400 font-black px-8 py-4 text-lg font-mono hover:bg-cyan-400/10 transition-colors"
              >
                TALK TO US
              </motion.button>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-20 py-20">

        {/* ── THE FOUNDER ── */}
        <section className="space-y-6">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">THE TEAM</p>
          <div className="bg-gradient-to-br from-cyan-950/30 to-black border-2 border-cyan-400/30 p-8">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-full bg-cyan-400/20 border-2 border-cyan-400/50 flex items-center justify-center flex-shrink-0">
                <Music className="w-7 h-7 text-cyan-400" />
              </div>
              <div className="space-y-3">
                <div>
                  <h2 className="text-white font-black text-2xl">Co-founder</h2>
                  <p className="text-cyan-400 font-mono text-sm">Artist Manager · Music Industry Veteran</p>
                </div>
                <p className="text-gray-300 font-mono text-sm leading-relaxed">
                  Former manager of a <span className="text-white font-bold">multi-platinum, BRIT Award-winning artist</span> — one of the fastest-rising in UK music history, with over 14 billion streams. Our co-founder has spent years inside the exact chaos CB51 is built to eliminate.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Multi-platinum artist', 'Major label deals', 'UK touring', 'International booking', 'Band coordination'].map(tag => (
                    <span key={tag} className="text-[11px] bg-white/5 border border-white/10 text-gray-400 px-2 py-1 font-mono">{tag}</span>
                  ))}
                </div>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-amber-400 font-mono text-sm italic">
                    "I've lived this problem. Every gig offer in a different email thread. Every band vote on WhatsApp. Every invoice manually chased.
                    CB51 is what I needed."
                  </p>
                  <p className="text-gray-600 text-xs font-mono mt-2">— CB51 Co-founder</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE PROBLEM ── */}
        <section className="space-y-6">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">THE PROBLEM</p>
          <h2 className="text-4xl font-black text-white">Music management is still running on WhatsApp.</h2>
          <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-2xl">
            The global music industry is worth <span className="text-white font-bold">$28.6B</span> (2024). The artists, managers, and labels at its core are using the same tools your nan uses to send photos of her cat. There is no dedicated operational infrastructure for the people actually making it work.
          </p>
          <div className="space-y-3">
            <PROBLEM text="A gig offer arrives Saturday 11pm. The manager is asleep. Band is asleep. Promoter moves on. The gig — worth £800 — is lost." />
            <PROBLEM text="Manager juggles 6 artists across 6 separate WhatsApp groups. A 'yes' from one band member looks identical to a 'yes' from another. Chaos is guaranteed." />
            <PROBLEM text="Invoices sit in Gmail. Follow-ups happen in WhatsApp. Payments fall through the cracks. Managers lose thousands every year to their own inbox." />
            <PROBLEM text="No existing tool is built for the music industry's actual workflow: gig offer → manager decision → band vote → promoter reply → calendar → invoice." />
          </div>
        </section>

        {/* ── KEY STATS ── */}
        <section className="space-y-6">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">THE MARKET</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <STAT number="£7.1B" label="UK music industry" sub="2024 revenue" />
            <STAT number="85K+" label="UK artists" sub="actively gigging" />
            <STAT number="12K+" label="UK managers" sub="no dedicated tool" />
            <STAT number="£2.4B" label="B2B music tech" sub="global SAM by 2028" />
          </div>
        </section>

        {/* ── THE SOLUTION ── */}
        <section className="space-y-6">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">THE SOLUTION</p>
          <h2 className="text-4xl font-black text-white">CB51: The operating system for artist management.</h2>
          <div className="space-y-3">
            <SOLUTION text="AI reads every incoming gig offer (email, PDF, WhatsApp screenshot). Extracts: venue, fee, date, promoter. Flags clashes. Scores the offer. Drafts the reply. Manager just taps YES or NO." />
            <SOLUTION text="YES triggers band vote in-app. Every member gets a notification. Their vote is recorded. All yes = confirmation email sent automatically. One no = manager notified instantly." />
            <SOLUTION text="Every confirmed gig goes to one shared calendar. No more 'which group chat was that in?'" />
            <SOLUTION text="Invoices generated from confirmed gigs. Payment tracking built in. Late payment alerts automatic." />
            <SOLUTION text="Works as a PWA — add to home screen on any phone. No App Store approval. No 30% Apple tax. Instant updates." />
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="space-y-6">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">THE WORKFLOW</p>
          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-cyan-500/20 hidden md:block" />
            <div className="space-y-4">
              {[
                { n: '01', title: 'Gig offer arrives', body: 'Email, PDF or screenshot. Forwarded to CB51 or uploaded directly.', color: 'text-cyan-400' },
                { n: '02', title: 'AI reads it instantly', body: 'Extracts all details. Scores the offer. Checks for clashes. Takes 3 seconds.', color: 'text-cyan-400' },
                { n: '03', title: 'Manager taps YES or NO', body: 'One screen. One decision. Full AI context if needed. Zero email searching.', color: 'text-green-400' },
                { n: '04', title: 'Band votes in-app', body: 'Every member notified. Votes recorded. No WhatsApp thread required.', color: 'text-amber-400' },
                { n: '05', title: 'Confirmation sent automatically', body: 'Professional email to promoter. Gig goes to calendar. Invoice created.', color: 'text-cyan-400' },
              ].map(step => (
                <div key={step.n} className="md:ml-16 border border-white/10 bg-black p-5 flex items-start gap-4">
                  <span className={`${step.color} font-black font-mono text-2xl flex-shrink-0`}>{step.n}</span>
                  <div>
                    <p className="text-white font-bold">{step.title}</p>
                    <p className="text-gray-500 text-sm font-mono mt-1">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REVENUE MODEL ── */}
        <section className="space-y-6">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">REVENUE MODEL</p>
          <h2 className="text-4xl font-black text-white">Three clear paths to revenue.</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <REVENUE
              tier="FREE TIER"
              price="£0"
              who="Artists & indie managers"
              how="Up to 5 artists, full core features. Growth engine — every manager using CB51 brings their entire roster + band members. Network effect."
            />
            <REVENUE
              tier="INDIE PRO"
              price="£99/mo"
              who="Indie labels & agencies"
              how="Unlimited artists, advanced analytics, white-glove onboarding. 100 customers = £118k ARR. Conservative. The target market is 12,000 UK managers alone."
            />
            <REVENUE
              tier="WHITE LABEL"
              price="£25-75k/yr"
              who="Major labels & distributors"
              how="Branded deployment: universalmusic.cb51.io. We handle infrastructure. They own the experience. 3 enterprise deals = £150k+ ARR baseline."
            />
          </div>
          <div className="border-2 border-green-500/30 bg-green-950/20 p-6 space-y-3">
            <p className="text-green-400 font-black font-mono">YEAR 1 CONSERVATIVE PROJECTION</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-black text-white font-mono">500</p>
                <p className="text-gray-500 text-xs font-mono">Free users</p>
                <p className="text-green-400 text-xs font-mono">£0 direct / £∞ referral</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white font-mono">50</p>
                <p className="text-gray-500 text-xs font-mono">Pro subscribers</p>
                <p className="text-green-400 text-xs font-mono">£59,400 ARR</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white font-mono">2</p>
                <p className="text-gray-500 text-xs font-mono">Enterprise deals</p>
                <p className="text-green-400 text-xs font-mono">£75,000 ARR</p>
              </div>
            </div>
            <div className="border-t border-green-500/20 pt-3 flex items-center justify-between">
              <p className="text-gray-400 font-mono text-sm">Year 1 ARR (conservative)</p>
              <p className="text-green-400 font-black font-mono text-2xl">£134,400</p>
            </div>
          </div>
        </section>

        {/* ── COMPETITIVE ADVANTAGE ── */}
        <section className="space-y-6">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">COMPETITIVE MOAT</p>
          <h2 className="text-4xl font-black text-white">Why nobody else is doing this.</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Brain,
                title: 'Industry-built, not tech-built',
                body: 'CB51 was designed by someone who managed one of the biggest artists in the world. Not by an engineer who has never been to a gig. The workflow is real because it came from real experience.',
                color: 'text-cyan-400'
              },
              {
                icon: Zap,
                title: 'AI that understands music contracts',
                body: 'Our AI is trained on music industry language — riders, buyouts, splits, hospitality clauses. Generic tools miss 80% of what matters in a gig offer.',
                color: 'text-amber-400'
              },
              {
                icon: Users,
                title: 'Network effect built-in',
                body: 'Every manager invites their band. Every band member becomes a user. One manager with 4 artists and 4-piece bands = 17 users from one sign-up.',
                color: 'text-green-400'
              },
              {
                icon: Globe,
                title: 'No App Store dependency',
                body: 'PWA technology means instant global deployment, zero Apple/Google tax, updates ship in minutes not months. Infrastructure cost is a fraction of native apps.',
                color: 'text-purple-400'
              },
            ].map(({ icon: Icon, title, body, color }) => (
              <div key={title} className="border border-white/10 bg-black p-6 space-y-2">
                <Icon className={`w-6 h-6 ${color}`} />
                <p className="text-white font-bold">{title}</p>
                <p className="text-gray-500 text-sm font-mono leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── THE ASK ── */}
        <section className="space-y-6">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">THE ASK</p>
          <div className="bg-gradient-to-br from-cyan-950/40 to-purple-950/20 border-2 border-cyan-400/40 p-8 space-y-6">
            <h2 className="text-4xl font-black text-white">We're raising <span className="text-cyan-400">£150,000</span> seed.</h2>
            <p className="text-gray-300 font-mono text-sm leading-relaxed max-w-2xl">
              The product is built and live. Scott is actively using it to manage artists right now. We are not asking you to fund development — we are asking you to fund growth.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: '£50,000', use: 'Sales & onboarding', detail: 'Hire a music industry sales lead. Target 500 managers in year 1.' },
                { label: '£50,000', use: 'Product & AI', detail: 'Email parsing integration. Advanced analytics. iOS/Android PWA hardening.' },
                { label: '£50,000', use: 'Working capital', detail: '12 months runway. Infrastructure scaling. Legal for enterprise contracts.' },
              ].map(item => (
                <div key={item.label} className="border border-cyan-500/20 bg-black/60 p-4 space-y-2">
                  <p className="text-cyan-400 font-black font-mono text-xl">{item.label}</p>
                  <p className="text-white font-bold text-sm">{item.use}</p>
                  <p className="text-gray-600 text-xs font-mono">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-cyan-500/20 pt-4 space-y-3">
              <p className="text-white font-bold">What you get:</p>
              <div className="space-y-2">
                {[
                  'Equity stake in a music tech company with a founder who has the industry credibility to open every door',
                  'A live, working product — not a prototype, not a pitch deck',
                  'A sector (music management) with zero serious competition in the AI space',
                  'Unit economics that improve with every user added (network effects)',
                ].map(point => (
                  <div key={point} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-sm font-mono">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FUNDING ROUTES ── */}
        <section className="space-y-6">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">GRANT & FUND ROUTES</p>
          <h2 className="text-4xl font-black text-white">Non-dilutive routes we're pursuing.</h2>
          <div className="space-y-3">
            {[
              {
                name: 'BPI Music Industry Development Fund',
                type: 'Grant',
                amount: 'Up to £50,000',
                fit: 'Directly supports UK music industry infrastructure. CB51 is purpose-built for this brief.',
                color: 'border-cyan-500/30 bg-cyan-950/10'
              },
              {
                name: 'Innovate UK Smart Grant',
                type: 'Grant',
                amount: '£25k–£500k',
                fit: 'AI-driven automation in creative industries. Tick every box — novel tech, clear commercial pathway, UK-based.',
                color: 'border-green-500/30 bg-green-950/10'
              },
              {
                name: 'Creative Scotland / Arts Council England',
                type: 'Grant',
                amount: 'Up to £100,000',
                fit: 'Supports creative industry tools that empower artists. CB51 puts power back with artists and managers, not corporations.',
                color: 'border-purple-500/30 bg-purple-950/10'
              },
              {
                name: 'SEIS / EIS (UK Tax-Advantaged Investment)',
                type: 'Tax relief',
                amount: '30-50% tax relief for investors',
                fit: 'As a qualifying UK startup, CB51 investors can claim significant HMRC tax relief — making a £150k investment effectively £75-105k net.',
                color: 'border-amber-500/30 bg-amber-950/10'
              },
              {
                name: 'Music Declares Emergency / Impact Investors',
                type: 'Impact',
                amount: 'Varies',
                fit: 'CB51 is part of UF51 — a platform that also funds environmental action through music. ESG-aligned investment thesis.',
                color: 'border-pink-500/30 bg-pink-950/10'
              },
            ].map(item => (
              <div key={item.name} className={`border-2 ${item.color} p-5 grid md:grid-cols-4 gap-3 items-start`}>
                <div className="md:col-span-1">
                  <p className="text-white font-bold text-sm">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 text-gray-400 font-mono">{item.type}</span>
                    <span className="text-green-400 font-mono text-xs font-bold">{item.amount}</span>
                  </div>
                </div>
                <p className="md:col-span-3 text-gray-400 text-sm font-mono leading-relaxed">{item.fit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="space-y-4">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">COMMON QUESTIONS</p>
          <div className="space-y-2">
            <FAQ
              q="Is this just another project management app?"
              a="No. Project management apps (Notion, Trello, Asana) have no concept of a gig offer, a band vote, a promoter email, or a music industry workflow. CB51 is purpose-built infrastructure for the music industry's actual operating reality. The AI understands riders, buyouts, splits, hospitality. Generic tools don't."
            />
            <FAQ
              q="Why hasn't someone already built this?"
              a="The music industry is notoriously resistant to tech adoption — but that's changing fast post-pandemic. The managers who survived were the ones who got more operationally sharp. Scott is one of them. The reason it hasn't been built is that most music tech founders don't have his industry relationships or his understanding of what a manager actually does day to day."
            />
            <FAQ
              q="How do you get managers to actually switch tools?"
              a="We don't ask them to switch. CB51 sits on top of their existing email and WhatsApp. Forward an email, it appears in CB51. Screenshot a WhatsApp offer, AI reads it. We add intelligence without removing familiarity. Adoption curve is minimal."
            />
            <FAQ
              q="What does 'live and working' mean exactly?"
              a="Scott is using CB51 right now to manage his artists. Gig offers are being processed through the AI decision engine. Band members are voting in-app. The calendar, finance tracking, and task management are all live. This is not a wireframe."
            />
            <FAQ
              q="What's the exit strategy?"
              a="Strategic acquisition by a major music tech player (Spotify, Live Nation, SoundCloud, Bandsintown, Songkick) or a music services group. Alternatively: Series A at scale to £5-10M ARR. The precedent is SongBird (acquired), TuneCore (acquired by Believe), Songtrust — all music infrastructure plays bought for 8-15x ARR."
            />
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="text-center space-y-6 py-8 border-t border-white/10">
          <h2 className="text-4xl font-black text-white">Ready to talk?</h2>
          <p className="text-gray-400 font-mono max-w-xl mx-auto">
            We have a working product, a founder with genuine music industry credibility, and a clear path to revenue. If you're looking for a music tech investment that solves a real problem — let's have a conversation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:hello@cb51.io">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-cyan-400 text-black font-black px-8 py-4 text-lg font-mono hover:bg-cyan-300 transition-colors flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                hello@cb51.io
              </motion.button>
            </a>
            <Link to={createPageUrl('CB51')}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="border-2 border-white/20 text-white font-black px-8 py-4 text-lg font-mono hover:border-white/50 transition-colors"
              >
                SEE THE PRODUCT →
              </motion.button>
            </Link>
          </div>
          <p className="text-gray-700 text-xs font-mono">CB51 is part of the UF51 / Universal Frequency 51 ecosystem</p>
        </section>

      </div>
    </div>
  );
}