import { Link } from 'react-router-dom';

export default function WristHealingTerms() {
  return (
    <div className="min-h-screen text-white" style={{ background: '#07060e', fontFamily: 'system-ui, sans-serif' }}>
      {/* Nav */}
      <div className="border-b" style={{ borderColor: 'rgba(212,160,23,0.12)' }}>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-6">
          <Link to="/WristHealingProtocol" className="text-xs font-black tracking-widest" style={{ color: '#d4a017', letterSpacing: '0.2em' }}>← PROTOCOL</Link>
          <Link to="/WristHealingAbout" className="text-white/30 hover:text-white/60 text-xs transition-colors">ABOUT</Link>
          <span className="text-white/20 text-xs">TERMS</span>
          <Link to="/WristHealingPrivacy" className="text-white/30 hover:text-white/60 text-xs transition-colors">PRIVACY</Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-14">
        <div className="text-xs font-black tracking-widest mb-6" style={{ color: '#d4a017', letterSpacing: '0.25em' }}>TERMS OF USE</div>
        <h1 className="text-4xl font-black text-white mb-2 leading-tight">Terms & Conditions</h1>
        <p className="text-white/30 text-xs mb-10">Last updated: April 2026</p>

        <div className="space-y-8 text-white/55 leading-relaxed text-sm">
          <div>
            <h2 className="text-white font-black text-base mb-3">1. Not medical advice</h2>
            <p>The Wrist Healing Protocol is a complementary acoustic therapy tool. It is not medical advice, diagnosis, or treatment. Nothing on this platform should be interpreted as a substitute for professional medical guidance. Always consult your surgeon or medical team before beginning any new therapy during recovery.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">2. Use at your own discretion</h2>
            <p>By using this protocol you acknowledge that you are doing so voluntarily and at your own discretion. UniversalFamily51 and AI51 accept no liability for outcomes arising from use of the protocol. If you experience any discomfort, stop the session and consult your doctor.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">3. No guarantees</h2>
            <p>The frequencies used in this protocol are selected on the basis of published research and established therapeutic tradition, honestly cited. We make no guarantee of specific outcomes. Individual results vary based on injury severity, medical history, surgery type, and many other factors.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">4. Headphones</h2>
            <p>Binaural frequency therapy requires stereo headphones to function as designed. Using speakers will not produce the binaural effect. We are not responsible for any outcome from use without headphones.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">5. Intellectual property</h2>
            <p>The protocol design, audio engine, and content are created by AI51 and BRO51 (UniversalFamily51). The underlying Web Audio API is an open W3C standard. Session data is stored locally on your device only and belongs entirely to you.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">6. Changes</h2>
            <p>We may update the protocol and these terms from time to time. Continued use constitutes acceptance of any updated terms.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">7. Contact</h2>
            <p>Questions about these terms: contact UniversalFamily51 through the main UF51 platform.</p>
          </div>
        </div>
      </div>
    </div>
  );
}