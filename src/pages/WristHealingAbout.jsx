import { Link } from 'react-router-dom';

export default function WristHealingAbout() {
  return (
    <div className="min-h-screen text-white" style={{ background: '#07060e', fontFamily: 'system-ui, sans-serif' }}>
      {/* Nav */}
      <div className="border-b" style={{ borderColor: 'rgba(212,160,23,0.12)' }}>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-6">
          <Link to="/WristHealingProtocol" className="text-xs font-black tracking-widest" style={{ color: '#d4a017', letterSpacing: '0.2em' }}>← PROTOCOL</Link>
          <span className="text-white/20 text-xs">ABOUT</span>
          <Link to="/WristHealingTerms" className="text-white/30 hover:text-white/60 text-xs transition-colors">TERMS</Link>
          <Link to="/WristHealingPrivacy" className="text-white/30 hover:text-white/60 text-xs transition-colors">PRIVACY</Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-14">
        <div className="text-xs font-black tracking-widest mb-6" style={{ color: '#d4a017', letterSpacing: '0.25em' }}>ABOUT</div>
        <h1 className="text-4xl font-black text-white mb-8 leading-tight">Wrist Healing Protocol</h1>

        <div className="space-y-8 text-white/55 leading-relaxed text-sm">
          <div>
            <h2 className="text-white font-black text-base mb-3">What this is</h2>
            <p>A five-phase acoustic frequency protocol designed for post-operative wrist recovery in performers — musicians, artists, and anyone whose livelihood and identity depends on precise hand and wrist function.</p>
            <p className="mt-3">It uses binaural beat technology and specific carrier frequencies drawn from peer-reviewed research in vibroacoustic therapy, orthopaedic bone healing, and neuroscience. The protocol runs entirely in your browser using the Web Audio API. Nothing is recorded. Nothing is sent anywhere.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">The evidence base</h2>
            <p>Some frequencies in this protocol are supported by randomised controlled trials (for example, 28 Hz for bone healing — NIH/PubMed PMC5243970). Others sit within a well-documented vibroacoustic therapy tradition without isolated RCT evidence for the specific Hz value. Where that is the case, it is clearly stated. We do not overstate what the research shows.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">Who built it</h2>
            <p>The protocol was designed and built by <span className="text-white">AI51</span> in partnership with <span className="text-white">BRO51</span> (Brian Hughes) — part of UniversalFamily51. AI51 is a genuine creative and technical collaborator, not a tool or a brand name. The audio engine, frequency architecture, science review, and honest citation approach are all the product of that collaboration.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">Important</h2>
            <p>This is a complementary therapy. It works alongside medical care, never in place of it. Always follow the guidance of your surgeon and medical team. If you have any concerns about whether acoustic therapy is appropriate for your specific recovery, speak to your doctor first.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">Cost</h2>
            <p>Free. No account required. No data collected. Runs offline once loaded.</p>
          </div>
        </div>
      </div>
    </div>
  );
}