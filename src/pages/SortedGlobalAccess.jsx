import React, { useState, useEffect } from 'react';
import { WifiOff, Globe, Languages, Zap, Download, Smartphone, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, desc, status, color }) => (
  <div style={{
    background: '#fff', borderRadius: 14, padding: 18,
    border: `1.5px solid ${color}20`, marginBottom: 12,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
      <div style={{
        width: 42, height: 42, borderRadius: 10, background: `${color}12`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={22} color={color} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#1a1208', marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'rgba(26,18,8,0.5)', lineHeight: 1.5 }}>{desc}</div>
      </div>
      {status && (
        <span style={{
          fontSize: 10, fontWeight: 800, color: '#22c55e',
          background: '#DCFCE7', borderRadius: 6, padding: '3px 8px',
        }}>{status}</span>
      )}
    </div>
  </div>
);

const RegionCard = ({ region, features, status }) => (
  <div style={{
    background: '#fff', borderRadius: 12, padding: 14,
    border: '1px solid rgba(26,18,8,0.08)', marginBottom: 10,
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1208' }}>{region}</div>
      {status === 'ready' ? (
        <CheckCircle size={16} color="#22c55e" />
      ) : status === 'limited' ? (
        <span style={{ fontSize: 10, fontWeight: 700, color: '#f97316', background: '#FEF3C7', padding: '2px 8px', borderRadius: 6 }}>LIMITED</span>
      ) : (
        <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', background: '#F1F5F9', padding: '2px 8px', borderRadius: 6 }}>COMING</span>
      )}
    </div>
    <div style={{ fontSize: 12, color: 'rgba(26,18,8,0.5)', lineHeight: 1.6 }}>{features}</div>
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
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    setDeferredPrompt(null);
    setInstallable(false);
  };

  const features = [
    {
      icon: Smartphone,
      title: 'Install as an App (PWA)',
      desc: 'Add to your home screen and it loads faster. Works well on slow mobile connections.',
      status: 'READY',
      color: '#06b6d4',
    },
    {
      icon: Languages,
      title: 'Any Language',
      desc: 'Upload a letter in Arabic, Farsi, Russian, Swahili, Spanish, Tagalog, French, Polish — SORTED decodes it. Mention the country if the law applies somewhere different to where you are.',
      status: 'READY',
      color: '#22c55e',
    },
    {
      icon: Globe,
      title: 'Cross-Border Legal Help',
      desc: 'Visiting another country? Got property abroad? Just tell SORTED which jurisdiction applies — it handles the rest.',
      status: 'READY',
      color: '#8b5cf6',
    },
    {
      icon: WifiOff,
      title: 'Works on Poor Signal',
      desc: 'Lightweight design — works on slow 3G connections. No video, no heavy assets.',
      status: 'READY',
      color: '#f97316',
    },
    {
      icon: Zap,
      title: 'No Account Required',
      desc: '10 free uses with no sign-up. Nothing stored. Nothing linked to you.',
      status: 'READY',
      color: '#ec4899',
    },
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
      minHeight: '100vh', background: 'linear-gradient(135deg, #faf8f5 0%, #f0e9e2 100%)',
      padding: '20px 16px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Link to="/Sorted" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16, color: '#1a1208', textDecoration: 'none' }}>
          <ArrowLeft size={18} />
          <span style={{ fontSize: 13, fontWeight: 700 }}>Back to SORTED</span>
        </Link>
        
        <div style={{
          background: '#1a1208', borderRadius: 16, padding: '24px 20px',
          color: '#fff', marginBottom: 20,
        }}>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.7, marginBottom: 6 }}>
            SORTED GLOBAL ACCESS
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, lineHeight: 1.2 }}>
            SORTED works everywhere ♾️
          </div>
          <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.6 }}>
            Any language. Any country. Visiting abroad, living abroad, or dealing with a letter from overseas — just tell SORTED where the law applies and it handles the rest.
          </div>
          {!isOnline && (
            <div style={{
              marginTop: 12, padding: '10px 14px', borderRadius: 10,
              background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)',
              fontSize: 12, fontWeight: 700, color: '#86EFAC',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <WifiOff size={14} />
              YOU'RE OFFLINE — SORTED STILL WORKS
            </div>
          )}
          {installable && (
            <motion.button
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleInstall}
              style={{
                marginTop: 12, width: '100%', padding: '14px 0', borderRadius: 12,
                fontSize: 13, fontWeight: 900, letterSpacing: '0.06em',
                background: '#22c55e', color: '#fff', border: 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <Download size={16} />
              INSTALL SORTED (WORKS OFFLINE)
            </motion.button>
          )}
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(26,18,8,0.35)', marginBottom: 12 }}>
          GLOBAL FEATURES
        </div>
        {features.map(f => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>

      {/* Regions */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(26,18,8,0.35)', marginBottom: 12 }}>
          REGIONAL SUPPORT
        </div>
        {regions.map(r => (
          <RegionCard key={r.region} {...r} />
        ))}
      </div>

      {/* Install Instructions */}
      <div style={{
        background: '#fff', borderRadius: 14, padding: 18,
        border: '1.5px dashed rgba(26,18,8,0.15)',
      }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#1a1208', marginBottom: 8 }}>
          Add to your home screen
        </div>
        <ol style={{ margin: 0, paddingLeft: 20, fontSize: 12, color: 'rgba(26,18,8,0.6)', lineHeight: 1.8 }}>
          <li>On iPhone: tap Share → "Add to Home Screen"</li>
          <li>On Android: tap the browser menu → "Add to Home Screen" or "Install App"</li>
          <li>It opens like a normal app — no App Store needed</li>
        </ol>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 24, textAlign: 'center',
        fontSize: 12, color: 'rgba(26,18,8,0.35)', lineHeight: 1.6,
      }}>
        <p style={{ marginBottom: 8 }}>
          Built with ♾️❤️ by Universal Frequency 51 CIC
        </p>
        <p>
          Can't afford it? Email <strong style={{ color: '#d97706' }}>family@uf51.love</strong> — we'll sort it.
        </p>
      </div>
    </div>
  );
}