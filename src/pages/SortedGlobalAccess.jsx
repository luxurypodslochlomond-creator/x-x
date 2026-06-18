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
      title: 'Offline Mode (PWA)',
      desc: 'Download once, use forever without internet. Works on 2G networks.',
      status: 'READY',
      color: '#06b6d4',
    },
    {
      icon: Languages,
      title: 'Auto Language Detection',
      desc: 'Arabic, Farsi, Russian, Swahili, Spanish, French — auto-translates to your language.',
      status: 'READY',
      color: '#22c55e',
    },
    {
      icon: WifiOff,
      title: 'Low Bandwidth Mode',
      desc: 'Strips images and animations for slow connections. Text-only mode.',
      status: 'READY',
      color: '#f97316',
    },
    {
      icon: Globe,
      title: 'Works Anywhere',
      desc: 'Palestine, Russia, Iran, North Korea, Africa — no blocks, no restrictions.',
      status: 'READY',
      color: '#8b5cf6',
    },
    {
      icon: Download,
      title: 'SMS / WhatsApp Fallback',
      desc: 'Send letter photo via SMS/WhatsApp, get AI analysis back. Coming soon.',
      status: 'COMING',
      color: '#ec4899',
    },
  ];

  const regions = [
    { region: 'Palestine', features: 'Arabic auto-detection, offline mode, low-bandwidth', status: 'ready' },
    { region: 'Russia', features: 'Russian language support, works without VPN', status: 'ready' },
    { region: 'Iran', features: 'Farsi/Persian detection, SMS fallback coming', status: 'ready' },
    { region: 'North Korea', features: 'Offline-only mode, no internet required after install', status: 'limited' },
    { region: 'Africa (All)', features: '2G-optimized, Swahili/French/Arabic support', status: 'ready' },
    { region: 'Syria', features: 'Arabic support, offline mode', status: 'ready' },
    { region: 'Yemen', features: 'Low-bandwidth mode, Arabic', status: 'ready' },
    { region: 'Afghanistan', features: 'Dari/Pashto coming, offline mode', status: 'limited' },
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
            Free Legal Help for Everyone, Everywhere ♾️
          </div>
          <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.6 }}>
            Works offline. Auto-detects your language. No blocks. No restrictions. Built for people who need it most.
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
          How to Install for Offline Use
        </div>
        <ol style={{ margin: 0, paddingLeft: 20, fontSize: 12, color: 'rgba(26,18,8,0.6)', lineHeight: 1.8 }}>
          <li>Tap "INSTALL SORTED" button above (if shown)</li>
          <li>Or use your browser menu: "Add to Home Screen"</li>
          <li>Once installed, works completely offline</li>
          <li>No internet needed after first load</li>
        </ol>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 24, textAlign: 'center',
        fontSize: 12, color: 'rgba(26,18,8,0.35)', lineHeight: 1.6,
      }}>
        <p style={{ marginBottom: 8 }}>
          Built with ♾️❤️ for people who need it most.
        </p>
        <p>
          If you're in a crisis zone or conflict area, SORTED is free forever. No paywall. No restrictions.
        </p>
      </div>
    </div>
  );
}