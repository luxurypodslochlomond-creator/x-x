import { Link } from 'react-router-dom';

export default function WristHealingPrivacy() {
  return (
    <div className="min-h-screen text-white" style={{ background: '#07060e', fontFamily: 'system-ui, sans-serif' }}>
      {/* Nav */}
      <div className="border-b" style={{ borderColor: 'rgba(212,160,23,0.12)' }}>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-6">
          <Link to="/WristHealingProtocol" className="text-xs font-black tracking-widest" style={{ color: '#d4a017', letterSpacing: '0.2em' }}>← PROTOCOL</Link>
          <Link to="/WristHealingAbout" className="text-white/30 hover:text-white/60 text-xs transition-colors">ABOUT</Link>
          <Link to="/WristHealingTerms" className="text-white/30 hover:text-white/60 text-xs transition-colors">TERMS</Link>
          <span className="text-white/20 text-xs">PRIVACY</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-14">
        <div className="text-xs font-black tracking-widest mb-6" style={{ color: '#d4a017', letterSpacing: '0.25em' }}>PRIVACY POLICY</div>
        <h1 className="text-4xl font-black text-white mb-2 leading-tight">Privacy Policy</h1>
        <p className="text-white/30 text-xs mb-10">Last updated: April 2026</p>

        <div className="space-y-8 text-white/55 leading-relaxed text-sm">
          <div>
            <h2 className="text-white font-black text-base mb-3">The short version</h2>
            <p className="text-white/70">We collect nothing. Zero. Your session data stays on your device. Nothing is transmitted anywhere.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">What data is stored</h2>
            <p>The only data stored is your session log — which phases you completed and when. This is stored in your browser's <span className="text-white font-bold">localStorage</span>, on your device only. It never leaves your device. It is used solely to show you your session history within the app.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">Audio processing</h2>
            <p>All audio is generated locally in your browser using the Web Audio API. No audio is recorded, captured, or transmitted. The frequency generation happens entirely on your device in real time.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">No analytics</h2>
            <p>We do not use analytics, tracking pixels, third-party cookies, or any form of behavioural monitoring on this page.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">No accounts</h2>
            <p>No account is required. No email address is collected. No personal information of any kind is requested or stored.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">Clearing your data</h2>
            <p>You can clear your session history at any time by clearing your browser's localStorage (Settings → Privacy → Clear browsing data, or equivalent in your browser). This deletes everything the app stored locally.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">Third parties</h2>
            <p>No data is shared with any third party. There are no third-party integrations on this page.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-base mb-3">Contact</h2>
            <p>Privacy questions: contact UniversalFamily51 through the main UF51 platform.</p>
          </div>
        </div>
      </div>
    </div>
  );
}