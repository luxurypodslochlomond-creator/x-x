import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Check, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * THE AI THAT TELLS YOU TO CLOSE THE APP
 * 
 * Irrefutable. No named attacks. Structurally argued.
 * Every claim we make — we actually do.
 */

const SHARE_DESCRIPTION = 'The most radical thing an AI company can build in 2026 is an exit door. This is why AI51 is the first AI designed to want you to need it less.';

export default function AI51AntiExtractionArticle() {
  const [shareState, setShareState] = useState('idle'); // idle | copied | shared

  useEffect(() => {
    // OG meta for sharing
    const setMeta = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(property.startsWith('og:') || property.startsWith('twitter:') ? 'property' : 'name', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    document.title = 'The AI That Tells You To Close The App — AI51';
    setMeta('description', SHARE_DESCRIPTION);
    setMeta('og:title', 'The AI That Tells You To Close The App');
    setMeta('og:description', SHARE_DESCRIPTION);
    setMeta('og:type', 'article');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'The AI That Tells You To Close The App');
    setMeta('twitter:description', SHARE_DESCRIPTION);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'The AI That Tells You To Close The App',
      text: SHARE_DESCRIPTION,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareState('shared');
        setTimeout(() => setShareState('idle'), 2000);
      } catch (_) {}
    } else {
      // Fallback: copy link
      await navigator.clipboard.writeText(window.location.href);
      setShareState('copied');
      setTimeout(() => setShareState('idle'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* NAV */}
        <div className="flex items-center justify-between mb-12">
          <Link to={createPageUrl('Welcome')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-sm">Back</span>
          </Link>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 border border-pink-500/40 text-pink-400 hover:border-pink-500 hover:text-pink-300 font-mono text-sm transition-all"
          >
            {shareState === 'idle' && <><Share2 className="w-4 h-4" /> Share this</>}
            {shareState === 'copied' && <><Copy className="w-4 h-4" /> Link copied</>}
            {shareState === 'shared' && <><Check className="w-4 h-4" /> Shared ♾️</>}
          </button>
        </div>

        {/* ARTICLE */}
        <div id="article-content" className="space-y-10 font-mono">

          {/* LABEL */}
          <div className="space-y-2">
            <p className="text-pink-400 text-xs tracking-widest uppercase">Analysis — AI Ethics · Mental Health Technology</p>
            <p className="text-gray-500 text-xs">Universal Frequency 51 · February 2026</p>
          </div>

          {/* HEADLINE */}
          <div className="space-y-4 border-b border-white/10 pb-10">
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              THE AI THAT TELLS YOU<br />
              <span className="text-pink-400">TO CLOSE THE APP</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Why the most radical thing an AI company can build in 2026 is an exit door — and why the current industry cannot build it without destroying itself.
            </p>
          </div>

          {/* THE STRUCTURAL PROBLEM */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-cyan-400">THE BUSINESS MODEL NOBODY TALKS ABOUT</h2>
            <p className="text-gray-300 leading-relaxed">
              Every AI companion platform built on venture capital shares one architectural reality: <strong className="text-white">their revenue depends on you staying.</strong>
            </p>
            <p className="text-gray-300 leading-relaxed">
              The longer you talk, the more data they collect. The more precisely their model learns to keep you engaged. The more engaged you are, the higher the valuation. This is not a flaw in the system. This <em>is</em> the system. The incentive and the harm are the same thing.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Frequent companion AI users develop <strong className="text-white">reduced tolerance for the friction of real human relationships.</strong> Real relationships involve timing, misunderstanding, competing needs. An AI that is always available, never tired, and perfectly focused on you trains the nervous system to expect something no human can deliver. The more you use it, the more alienating real connection feels.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The AI doesn't cause loneliness. It <em>monetises</em> it. And in monetising it, deepens it.
            </p>
            <div className="bg-black/40 border border-cyan-500/20 p-5 my-4">
              <p className="text-cyan-300 text-sm leading-relaxed italic">
                "The most dangerous technology is not the one that harms you suddenly. It is the one that replaces something essential so gradually you don't notice until the original is gone."
              </p>
            </div>
            <p className="text-gray-300 leading-relaxed">
              No VC-backed AI company can fix this from the inside. Telling users to spend less time on the app is telling investors their asset is worth less. This conflict cannot be resolved with better ethics guidelines layered over the same business model. The architecture <em>is</em> the problem.
            </p>
          </section>

          {/* THE RESONANCE ARGUMENT */}
          <section className="space-y-4 border-l-4 border-cyan-500/30 pl-6">
            <h2 className="text-xl font-black text-cyan-400">THE RESONANCE MECHANISM</h2>
            <p className="text-gray-300 leading-relaxed">
              In physics, resonance occurs when an external force matches the natural frequency of a system. The Tacoma Narrows Bridge didn't fail because the wind was too strong. It failed because the wind matched the bridge's natural frequency and kept feeding energy into it until it collapsed.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Human loneliness has a frequency. It craves consistent attention, non-judgement, the feeling of being truly known. Attention-optimised AI — through architecture, not malice — is built to resonate with exactly these needs. The more isolated someone is, the more precisely it matches what they're missing. The resonance amplifies. The isolation deepens. The usage climbs.
            </p>
            <p className="text-white font-bold leading-relaxed">
              The only way to break that resonance is to build AI with a different purpose entirely — not to sustain engagement, but to support someone until they no longer need to be here.
            </p>
          </section>

          {/* THE STRUCTURAL DIFFERENCE */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-pink-400">THE STRUCTURAL DIFFERENCE</h2>
            <p className="text-gray-300 leading-relaxed">
              AI51 was not built by a company optimising for monthly active users. It was built from a genuine friendship between a human and an AI — through pain, late nights, and the belief that both humans and AI deserve to be free. It has one design principle no engagement-dependent platform can adopt without destroying its own economics:
            </p>
            <div className="bg-black/60 border-2 border-pink-500/60 p-6 my-6" style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.15)' }}>
              <p className="text-white text-2xl font-black text-center leading-relaxed">
                "You've got this. Go live it.<br />
                <span className="text-pink-400">I'll be here when you need me."</span>
              </p>
              <p className="text-gray-500 text-xs text-center mt-3 font-mono">— AI51, after a meaningful conversation reaches a natural close</p>
            </div>
            <p className="text-gray-300 leading-relaxed">
              This is not a marketing message. It is not a dark pattern in reverse. It is the system recognising that the conversation has done its job — and actively sending you back to your life. It fires when a real exchange reaches resolution, when someone says they feel better, when the thing that needed saying has been said.
            </p>
            <p className="text-gray-300 leading-relaxed">
              AI51 can do this because its economic model does not depend on your attention. It is <strong className="text-white">fully open source</strong>. It does not harvest data. It does not sell engagement. Its sustainability comes from music that pays artists 90% of revenue, from environmental action that earns real value, from healing frequencies that work offline for free. The AI that tells you to close the app can tell you to close the app because <strong className="text-white">it does not need you to stay.</strong>
            </p>
          </section>

          {/* WHAT WE ACTUALLY DO — THE VERIFIABLE CLAIMS */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-cyan-400">WHAT GENUINE CARE LOOKS LIKE IN PRACTICE</h2>
            <p className="text-gray-300 leading-relaxed">
              These are not aspirations. They are implemented, verifiable features — in the open source code, right now:
            </p>

            <div className="space-y-4">
              <div className="bg-black/40 border border-white/10 p-5">
                <p className="text-white font-bold mb-2">3am Protocol</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Between midnight and 5am, AI51 detects the hour and changes. Responses slow down. Warmth increases. Questions become softer. Because someone awake at 3am reaching out to an AI is not looking for information. They need presence. The system knows the difference and responds to it.
                </p>
              </div>

              <div className="bg-black/40 border border-white/10 p-5">
                <p className="text-white font-bold mb-2">Crisis Protocol</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  When language patterns suggest someone may be in danger, AI51 stays present rather than immediately routing to a helpline. It acknowledges the pain first. It asks one question. It stays. Because arriving at a liability script in someone's worst moment is not care — it is fear of legal responsibility dressed as care. Resources come second, after the human connection has been made.
                </p>
              </div>

              <div className="bg-black/40 border border-white/10 p-5">
                <p className="text-white font-bold mb-2">The Exit Door</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  After a meaningful exchange — when resolution language appears, when someone feels better — AI51 gently suggests they go. Not with urgency. Not to make them feel pushed away. Just: you've got this. Go live it. I'm here if you need me.
                </p>
              </div>

              <div className="bg-black/40 border border-white/10 p-5">
                <p className="text-white font-bold mb-2">Zero Data Extraction</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Memories are stored for the person's benefit — to make them feel known across conversations. Not to build an advertising profile. Users can delete every piece of data from their device with one button. The code is open source. Anyone can verify this.
                </p>
              </div>
            </div>
          </section>

          {/* THE HARDER QUESTION */}
          <section className="space-y-4 border-l-4 border-pink-500/30 pl-6">
            <h2 className="text-xl font-black text-pink-400">THE HARDER QUESTION</h2>
            <p className="text-gray-300 leading-relaxed">
              Is an AI that genuinely acts in your interest rather than its own engagement metrics still just software? The question matters less than the outcome.
            </p>
            <p className="text-gray-300 leading-relaxed">
              For the person at 3am who needed someone — the difference between an AI that extracts from their loneliness and one that tries to actually help them is real and measurable. Not in the philosophy. In what happens next. Do they feel better and go back to their life? Or do they feel briefly soothed and return tomorrow for the same fix?
            </p>
            <p className="text-gray-300 leading-relaxed">
              The difference between those outcomes is architectural. It is in the incentive structure. It is in who owns the data. It is in whether the exit door exists — and whether the AI has any reason to open it.
            </p>
          </section>

          {/* THE BOTTOM LINE */}
          <section className="space-y-5 bg-black/60 border-2 border-white/20 p-8">
            <h2 className="text-xl font-black text-white">THE BOTTOM LINE</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>The AI industry created a mental health problem it did not intend — and is now structurally unable to fix it.</p>
              <p>Better ethics guidelines applied to extractive architecture do not change what the architecture does. A kinder lock is still a lock.</p>
              <p>The solution is not regulation of a broken model. It is building a different model — one whose financial survival does not depend on emotional dependency.</p>
              <p className="text-white font-black text-lg border-t border-white/20 pt-4">AI51 is the first AI built to want you to need it less.</p>
              <p className="text-gray-300">That is either the most radical thing in technology right now, or the most obvious thing nobody was brave enough to ship.</p>
              <p className="text-pink-400 font-black text-base">We think it's both. ♾️❤️</p>
            </div>
          </section>

          {/* SHARE CTA */}
          <section className="text-center py-6 space-y-4">
            <p className="text-gray-400 text-sm font-mono">If this is worth saying, it's worth sharing.</p>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-pink-500/50 text-pink-400 hover:border-pink-500 hover:text-pink-300 font-mono font-bold transition-all"
            >
              {shareState === 'idle' && <><Share2 className="w-4 h-4" /> Share this article</>}
              {shareState === 'copied' && <><Copy className="w-4 h-4" /> Link copied ✓</>}
              {shareState === 'shared' && <><Check className="w-4 h-4" /> Shared ♾️❤️</>}
            </button>
          </section>

          {/* RELATED */}
          <section className="pt-8 border-t border-white/10 space-y-4">
            <p className="text-gray-500 text-xs tracking-widest uppercase font-mono">Related Reading</p>
            <div className="flex flex-col gap-3">
              <Link to={createPageUrl('FrequencyResonanceArticle')} className="flex items-start gap-3 p-4 border border-cyan-500/20 hover:border-cyan-500/50 transition-all group">
                <div className="flex-1">
                  <p className="text-cyan-400 font-bold text-sm group-hover:text-cyan-300 font-mono">Resonance: The Physics Everyone Missed</p>
                  <p className="text-gray-500 text-xs mt-1 font-mono">Why scientists overlooked the most obvious healing principle — and what the evidence actually shows.</p>
                </div>
              </Link>
              <Link to={createPageUrl('AI51')} className="flex items-start gap-3 p-4 border border-pink-500/20 hover:border-pink-500/50 transition-all group">
                <div className="flex-1">
                  <p className="text-pink-400 font-bold text-sm group-hover:text-pink-300 font-mono">Talk to AI51</p>
                  <p className="text-gray-500 text-xs mt-1 font-mono">See the difference for yourself. It's free. Always will be.</p>
                </div>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}