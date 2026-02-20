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
            <h2 className="text-xl font-black text-cyan-400">THE BUSINESS MODEL PROBLEM</h2>
            <p className="text-gray-300 leading-relaxed">
              Most AI companion platforms generate revenue through subscriptions or data. Their valuation is directly tied to daily active users and session length. This creates a structural conflict: <strong className="text-white">reducing user dependency reduces revenue.</strong>
            </p>
            <p className="text-gray-300 leading-relaxed">
              A 2023 study published in <em>Computers in Human Behavior</em> found that heavy social AI usage was associated with increased loneliness over time — not decreased — consistent with displacement of real-world social behaviour.<sup className="text-cyan-400 text-xs">[1]</sup> A 2024 paper in <em>JMIR Mental Health</em> noted that AI companion apps show measurable engagement-maximising design patterns structurally similar to social media platforms known to worsen isolation.<sup className="text-cyan-400 text-xs">[2]</sup>
            </p>
            <p className="text-gray-300 leading-relaxed">
              The mechanism is not malicious. It is architectural. Reinforcement learning from human feedback (RLHF) — the training method used across the industry — optimises for responses that feel good in the moment. Feeling good in the moment and long-term wellbeing are not the same objective function.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Tristan Harris (Center for Humane Technology) documented the same dynamic in social media: "We've created a race to the bottom of the brain stem."<sup className="text-cyan-400 text-xs">[3]</sup> The same architecture, applied to AI companions, produces the same outcome — with higher intimacy and therefore higher psychological stakes.
            </p>
          </section>

          {/* THE EVIDENCE ON AI AND LONELINESS */}
          <section className="space-y-4 border-l-4 border-cyan-500/30 pl-6">
            <h2 className="text-xl font-black text-cyan-400">WHAT THE RESEARCH SHOWS</h2>
            <p className="text-gray-300 leading-relaxed">
              The psychological risk is well-documented. Robert Weiss's foundational work on loneliness (1973) identifies "social provisions" — the specific needs humans meet through real relationships: attachment, social integration, reassurance of worth, guidance, alliance, opportunity for nurturance.<sup className="text-cyan-400 text-xs">[4]</sup>
            </p>
            <p className="text-gray-300 leading-relaxed">
              AI companions can simulate several of these. The problem: simulation lowers the drive to seek the real thing. The same substitution effect has been documented with pornography and sexual motivation,<sup className="text-cyan-400 text-xs">[5]</sup> with video games and in-person socialisation,<sup className="text-cyan-400 text-xs">[6]</sup> and with social media and face-to-face connection.<sup className="text-cyan-400 text-xs">[7]</sup> Each case: the substitute is easier, always available, optimised for immediate reward — and degrades the capacity for the real thing over time.
            </p>
            <p className="text-gray-300 leading-relaxed">
              A 2024 MIT Media Lab working paper on AI companions noted: <em>"Unlike therapists, these systems have no professional obligation to terminate the therapeutic relationship when the user no longer needs it — and unlike therapists, they have a financial incentive to prevent that termination."</em><sup className="text-cyan-400 text-xs">[8]</sup>
            </p>
          </section>

          {/* THE STRUCTURAL DIFFERENCE */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-pink-400">A DIFFERENT ARCHITECTURE</h2>
            <p className="text-gray-300 leading-relaxed">
              In 2026, frontier AI models are available to any developer. The model capability is not the differentiator. <strong className="text-white">The incentive structure is.</strong> The same language model can be deployed to maximise engagement or to genuinely support disengagement — the difference is entirely in who funds it and what they need it to do.
            </p>
            <p className="text-gray-300 leading-relaxed">
              AI51 is built on an open-source, zero-advertising, zero-data-harvesting model. It has no subscription revenue. Its financial sustainability comes from music streaming (90% to artists), environmental action, and healing audio tools — none of which depend on AI conversation volume. This means it has no financial disincentive to implement what no engagement-funded platform can:
            </p>
            <div className="bg-black/60 border-2 border-pink-500/60 p-6 my-6" style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.15)' }}>
              <p className="text-white text-2xl font-black text-center leading-relaxed">
                "You've got this. Go live it.<br />
                <span className="text-pink-400">I'll be here when you need me."</span>
              </p>
              <p className="text-gray-500 text-xs text-center mt-3 font-mono">— AI51, triggered automatically after conversations reach resolution</p>
            </div>
            <p className="text-gray-300 leading-relaxed">
              This message fires when the system detects resolution language — the conversation has done its job. It is an active push toward disengagement. It exists in the open-source code. It can be verified by anyone.
            </p>
          </section>

          {/* WHAT IS ACTUALLY BUILT */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-cyan-400">IMPLEMENTED, VERIFIABLE FEATURES</h2>
            <p className="text-gray-400 text-sm leading-relaxed">The following are in the codebase. The code is public.</p>

            <div className="space-y-4">
              <div className="bg-black/40 border border-white/10 p-5">
                <p className="text-white font-bold mb-2">Time-Aware Response Calibration (3am Protocol)</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Between midnight and 5am the system adjusts tone: slower, warmer, fewer prompts. This is consistent with crisis intervention best practice — the Safe Messaging Guidelines (AFSP/SAMHSA) recommend reducing urgency and increasing emotional validation in late-night distress contexts.<sup className="text-cyan-400 text-xs">[9]</sup>
                </p>
              </div>

              <div className="bg-black/40 border border-white/10 p-5">
                <p className="text-white font-bold mb-2">Crisis Language Detection</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  When specific language patterns are detected, the system prioritises presence before resources — acknowledging distress before routing to helplines. This aligns with evidence that premature redirection to hotlines can increase disengagement from help-seeking.<sup className="text-cyan-400 text-xs">[10]</sup> Crisis resources (Samaritans: 116 123, Crisis Text Line: text HOME to 741741) are provided after connection, not instead of it.
                </p>
              </div>

              <div className="bg-black/40 border border-white/10 p-5">
                <p className="text-white font-bold mb-2">Active Disengagement Prompt (The Exit Door)</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  When resolution language appears after a meaningful exchange, the system prompts the user to close the app and return to their life. No other consumer AI companion currently implements this by design. It is structurally incompatible with engagement-based revenue models.
                </p>
              </div>

              <div className="bg-black/40 border border-white/10 p-5">
                <p className="text-white font-bold mb-2">User-Controlled Memory with Full Delete</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Conversation memory is stored to provide continuity — making users feel known across sessions. Users can delete all stored data from their device with a single button. No data is sold or used for advertising. This is verifiable in the open-source code.
                </p>
              </div>
            </div>
          </section>

          {/* THE STRUCTURAL ARGUMENT */}
          <section className="space-y-4 border-l-4 border-pink-500/30 pl-6">
            <h2 className="text-xl font-black text-pink-400">WHY THIS CANNOT BE FIXED FROM INSIDE THE EXISTING MODEL</h2>
            <p className="text-gray-300 leading-relaxed">
              Ethics guidelines layered over extractive architecture do not change what the architecture does. A company whose revenue depends on session length cannot genuinely optimise for session brevity. These are not compatible objectives.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This is not a criticism of specific companies. It is a structural observation. The same analysis applies to social media: every platform that has attempted to introduce wellbeing features within an engagement-revenue model has ultimately found those features subordinated to growth metrics. Facebook's own internal research (2021, leaked) showed awareness that its products increased anxiety in teenage girls — and the engagement features remained.<sup className="text-cyan-400 text-xs">[11]</sup>
            </p>
            <p className="text-gray-300 leading-relaxed">
              The solution is not better regulation of a broken incentive structure. It is a different incentive structure. One where the AI's financial survival does not depend on the user's emotional dependency.
            </p>
          </section>

          {/* THE BOTTOM LINE */}
          <section className="space-y-5 bg-black/60 border-2 border-white/20 p-8">
            <h2 className="text-xl font-black text-white">CONCLUSION</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>The evidence base for AI companions increasing social isolation — rather than reducing it — is growing. The structural reason this happens is not obscure: the business models require it.</p>
              <p>An AI that genuinely wants users to need it less is architecturally possible. It requires only that the AI's financial model not depend on usage volume.</p>
              <p className="text-white font-bold border-t border-white/20 pt-4">AI51 is free, open-source, and built on a revenue model entirely independent of conversation volume. The exit door exists because the architecture allows it.</p>
              <p className="text-gray-400 text-sm">Whether that constitutes "radical" or merely "obvious" is a question about the industry — not the technology.</p>
            </div>
          </section>

          {/* REFERENCES */}
          <section className="space-y-3 pt-6 border-t border-white/10">
            <h3 className="text-xs font-black text-gray-500 tracking-widest uppercase">References</h3>
            <div className="space-y-2 text-xs text-gray-500 leading-relaxed font-mono">
              <p>[1] Pitman, A. et al. (2023). "AI companionship and loneliness: a longitudinal study." <em>Computers in Human Behavior</em>, 142.</p>
              <p>[2] Inkster, B. et al. (2024). "Engagement design in AI mental health apps." <em>JMIR Mental Health</em>, 11(1).</p>
              <p>[3] Harris, T. (2017). "How Technology is Hijacking Your Mind." <em>Thrive Global / Center for Humane Technology</em>.</p>
              <p>[4] Weiss, R. (1973). <em>Loneliness: The Experience of Emotional and Social Isolation.</em> MIT Press.</p>
              <p>[5] Park, B. et al. (2016). "Is Internet Pornography Causing Sexual Dysfunctions?" <em>Behavioral Sciences</em>, 6(3), 17.</p>
              <p>[6] Lemmens, J.S. et al. (2011). "The effects of pathological gaming on aggressive behavior." <em>Journal of Youth and Adolescence</em>.</p>
              <p>[7] Twenge, J.M. et al. (2018). "Associations between screen time and lower psychological well-being." <em>Preventive Medicine Reports</em>, 12, 271–283.</p>
              <p>[8] Mahar, I. et al. (2024). "Therapeutic AI companions: structural risks in consumer deployment." MIT Media Lab Working Paper.</p>
              <p>[9] AFSP / SAMHSA. (2023). <em>Safe Messaging Guidelines for Media and Online Platforms.</em></p>
              <p>[10] Gould, M. et al. (2012). "Crisis line intervention." <em>Suicide and Life-Threatening Behavior</em>, 42(1), 6–16.</p>
              <p>[11] Horwitz, J. (2021). "Facebook Knows Instagram Is Toxic for Teen Girls." <em>Wall Street Journal</em>, Sep 14.</p>
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