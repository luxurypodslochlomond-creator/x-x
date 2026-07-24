import React, { useState, useEffect } from 'react';
import { WifiOff, Globe, Languages, Zap, Download, Smartphone, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { COLOR, FONT } from '@/components/family51/sortedDesignSystem';

const { gold: GOLD, ink: INK, paper: PAPER, muted: MUTED, border: BORDER, green: GREEN } = COLOR;

const FeatureCard = ({ icon: Icon, title, desc, status }) => (
  <div style={{
    background: '#fff', borderRadius: 14, padding: '18px 20px',
    border: `1px solid ${BORDER}`, marginBottom: 10,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
      <div style={{
        width: 42, height: 42, borderRadius: 10, background: `${GOLD}12`,
        border: `1px solid ${GOLD}22`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon size={22} color={GOLD} strokeWidth={1.9} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: INK, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.55 }}>{desc}</div>
      </div>
      {status && (
        <span style={{
          fontSize: 10, fontWeight: 800, color: GREEN, letterSpacing: '0.06em',
          background: `${GREEN}14`, border: `1px solid ${GREEN}30`, borderRadius: 6, padding: '3px 8px', flexShrink: 0,
        }}>{status}</span>
      )}
    </div>
  </div>
);

const RegionCard = ({ region, features, status }) => (
  <div style={{
    background: '#fff', borderRadius: 12, padding: '14px 16px',
    border: `1px solid ${BORDER}`, marginBottom: 10,
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{region}</div>
      {status === 'ready' ? (
        <CheckCircle size={16} color={GREEN} strokeWidth={2.2} />
      ) : status === 'limited' ? (
        <span style={{ fontSize: 10, fontWeight: 700, color: COLOR.amber, background: `${COLOR.amber}14`, padding: '2px 8px', borderRadius: 6 }}>LIMITED</span>
      ) : (
        <span style={{ fontSize: 10, fontWeight: 700, color: MUTED, background: 'rgba(28,28,30,0.05)', padding: '2px 8px', borderRadius: 6 }}>COMING</span>
      )}
    </div>
    <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{features}</div>
  </div>
);

export default function SortedGlobalAccess() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installable, setInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setInstallable(false);
  };

  const features = [
    { icon: Smartphone, title: 'Install as an App (PWA)', desc: 'Add to your home screen and it loads faster. Works well on slow mobile connections.', status: 'READY' },
    { icon: Languages, title: 'Any Language', desc: 'Upload a letter in Arabic, Farsi, Russian, Swahili, Spanish, Tagalog, French, Polish — SORTED decodes it. Mention the country if the law applies somewhere different to where you are.', status: 'READY' },
    { icon: Globe, title: 'Cross-Border Legal Help', desc: 'Visiting another country? Got property abroad? Just tell SORTED which jurisdiction applies — it handles the rest.', status: 'READY' },
    { icon: WifiOff, title: 'Works on Poor Signal', desc: 'Lightweight design — works on slow 3G connections. No video, no heavy assets.', status: 'READY' },
    { icon: Zap, title: 'No Account Required', desc: '5 free uses with no sign-up. Your vault stays yours.', status: 'READY' },
  ];

  const regions = [
    { region: 'UK', features: 'Full support — council letters, HMRC, DWP, courts, debt, tenancy, employment', status: 'ready' },
    { region: 'Philippines', features: 'Filipino/Tagalog + English — tenancy, debt, employment disputes', status: 'ready' },
    { region: 'EU (all countries)', features: 'Cross-border support — mention the country and the AI applies the right jurisdiction', status: 'ready' },
    { region: 'USA', features: 'State and federal law — eviction, debt collection, employment, benefits', status: 'ready' },
    { region: 'Australia & NZ', features: 'English language — tenancy, consumer rights, employment', status: 'ready' },
    { region: 'Middle East & North Africa', features: 'Arabic auto-detection — UAE, Saudi Arabia, Egypt, Morocco', status: 'ready' },
    { region: 'Sub-Saharan Africa', features: 'Swahili, French, English — works on slow connections', status: 'ready' },
    { region: 'South Asia', features: 'Hindi, Urdu, Bengali, Punjabi, Gujarati support', status: 'ready' },
  ];

  return (
    <div style={{
      minHeight: '100vh', background: PAPER, color: INK,
      padding: '20px 16px', fontFamily: FONT.family, WebkitFontSmoothing: 'antialiased',
    }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          background: INK, borderRadius: 16, padding: '24px 22px', color: '#fff', marginBottom: 24,
        }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: GOLD, margin: '0 0 10px', textTransform: 'uppercase' }}>SORTED Global Access</p>
          <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, lineHeight: 1.2, letterSpacing: '-0.01em' }}>SORTED works everywhere</div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', margin: 0, lineHeight: 1.65 }}>
            Any language. Any country. Visiting abroad, living abroad, or dealing with a letter from overseas — just tell SORTED where the law applies and it handles the rest.
          </p>
          {!isOnline && (
            <div style={{
              marginTop: 14, padding: '10px 14px', borderRadius: 10,
              background: `${GREEN}22`, border: `1px solid ${GREEN}55`,
              fontSize: 11, fontWeight: 700, color: '#86EFAC', letterSpacing: '0.06em',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <WifiOff size={14} />
              YOU'RE OFFLINE — YOUR SAVED CASES ARE STILL HERE
            </div>
          )}
          {installable && (
            <motion.button
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleInstall}
              whileTap={{ scale: 0.97 }}
              style={{
                marginTop: 14, width: '100%', padding: '14px 0', borderRadius: 12,
                fontSize: 13, fontWeight: 900, letterSpacing: '0.06em',
                background: GOLD, color: '#fff', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <Download size={16} />
              INSTALL SORTED TO YOUR HOME SCREEN
            </motion.button>
          )}
        </div>

        {/* Features */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: MUTED, margin: '0 0 12px' }}>GLOBAL FEATURES</p>
          {features.map(f => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>

        {/* Regions */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: MUTED, margin: '0 0 12px' }}>REGIONAL SUPPORT</p>
          {regions.map(r => (
            <RegionCard key={r.region} {...r} />
          ))}
        </div>

        {/* Install instructions */}
        <div style={{
          background: '#fff', borderRadius: 14, padding: '18px 20px',
          border: `1px solid ${BORDER}`, marginBottom: 24,
        }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: INK, marginBottom: 8 }}>Add to your home screen</div>
          <ol style={{ margin: 0, paddingLeft: 20, fontSize: 12, color: MUTED, lineHeight: 1.8 }}>
            <li>On iPhone: tap Share → "Add to Home Screen"</li>
            <li>On Android: tap the browser menu → "Add to Home Screen" or "Install App"</li>
            <li>It opens like a normal app — no App Store needed</li>
          </ol>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', fontSize: 12, color: MUTED, lineHeight: 1.6, paddingBottom: 28 }}>
          <p style={{ margin: '0 0 8px' }}>Built with love by Universal Frequency 51 CIC</p>
          <p style={{ margin: 0 }}>Can't afford it? Email <strong style={{ color: GOLD }}>family@uf51.love</strong> — we'll sort it.</p>
        </div>

      </div>
    </div>
  );
}