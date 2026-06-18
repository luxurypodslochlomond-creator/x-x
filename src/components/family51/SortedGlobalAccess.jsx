import { useState, useEffect } from 'react';
import { WifiOff, Globe, Languages, Zap, Download, Smartphone, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Detect user's country/language from browser
function detectUserLocation() {
  try {
    const lang = navigator.language || navigator.userLanguage;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Map common languages to regions
    const langMap = {
      'ar': 'Middle East / North Africa',
      'fa': 'Iran / Afghanistan',
      'ru': 'Russia / Eastern Europe',
      'zh': 'China',
      'sw': 'East Africa',
      'fr': 'West Africa / France',
      'pt': 'Brazil / Portugal',
      'es': 'Spain / Latin America',
    };
    
    const detectedLang = lang.split('-')[0].toLowerCase();
    const region = langMap[detectedLang] || 'Global';
    
    return { lang, region, timezone };
  } catch {
    return { lang: 'en', region: 'Global', timezone: 'UTC' };
  }
}

export default function SortedGlobalAccess() {
  const [location, setLocation] = useState(null);
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setLocation(detectUserLocation());
    
    // Listen for online/offline
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
    }
    
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    });
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
    }
    setInstallPrompt(null);
  };

  const enableLowBandwidth = () => {
    setLowBandwidth(true);
    localStorage.setItem('sorted_low_bandwidth', 'true');
    document.documentElement.setAttribute('data-low-bandwidth', 'true');
  };

  const disableLowBandwidth = () => {
    setLowBandwidth(false);
    localStorage.removeItem('sorted_low_bandwidth');
    document.documentElement.removeAttribute('data-low-bandwidth');
  };

  return (
    <div style={{
      maxWidth: 560, margin: '0 auto', padding: '32px 20px',
      background: '#faf8f5', minHeight: '100vh',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(26,18,8,0.3)', marginBottom: 6 }}>
          GLOBAL ACCESS
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1a1208', margin: '0 0 8px' }}>
          SORTED Works Here ♾️❤️
        </h1>
        {location && (
          <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.4)', margin: 0 }}>
            Detected: {location.region} • {location.lang.toUpperCase()}
          </p>
        )}
      </div>

      {/* Status Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {/* Offline Status */}
        <div style={{
          padding: '16px', borderRadius: 12,
          background: isOffline ? 'rgba(34,197,94,0.1)' : 'rgba(6,182,212,0.1)',
          border: `1.5px solid ${isOffline ? '#22c55e' : '#06b6d4'}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          {isOffline ? <WifiOff size={20} color="#22c55e" /> : <Globe size={20} color="#06b6d4" />}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: isOffline ? '#22c55e' : '#06b6d4' }}>
              {isOffline ? 'Works Offline' : 'Online'}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)' }}>
              {isOffline ? 'No connection needed' : 'Connected to internet'}
            </div>
          </div>
        </div>

        {/* Low Bandwidth Mode */}
        <div style={{
          padding: '16px', borderRadius: 12,
          background: lowBandwidth ? 'rgba(249,115,22,0.1)' : 'rgba(26,18,8,0.03)',
          border: `1.5px solid ${lowBandwidth ? '#f97316' : 'rgba(26,18,8,0.1)'}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <Zap size={20} color={lowBandwidth ? '#f97316' : 'rgba(26,18,8,0.3)'} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: lowBandwidth ? '#f97316' : 'rgba(26,18,8,0.6)' }}>
              Low Bandwidth Mode
            </div>
            <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)' }}>
              {lowBandwidth ? 'Enabled for 2G networks' : 'For slow connections'}
            </div>
          </div>
          <button
            onClick={lowBandwidth ? disableLowBandwidth : enableLowBandwidth}
            style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700,
              cursor: 'pointer', border: 'none',
              background: lowBandwidth ? 'rgba(249,115,22,0.2)' : 'rgba(26,18,8,0.06)',
              color: lowBandwidth ? '#f97316' : 'rgba(26,18,8,0.6)',
            }}
          >
            {lowBandwidth ? 'ON' : 'Enable'}
          </button>
        </div>

        {/* PWA Install */}
        {!installed && installPrompt && (
          <div style={{
            padding: '16px', borderRadius: 12,
            background: 'rgba(168,85,247,0.1)',
            border: '1.5px solid rgba(168,85,247,0.3)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <Smartphone size={20} color="#a855f7" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#a855f7' }}>
                Install SORTED
              </div>
              <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)' }}>
                Works like an app on your phone
              </div>
            </div>
            <button
              onClick={handleInstall}
              style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                cursor: 'pointer', border: 'none',
                background: '#a855f7', color: '#fff',
              }}
            >
              Install
            </button>
          </div>
        )}

        {installed && (
          <div style={{
            padding: '16px', borderRadius: 12,
            background: 'rgba(34,197,94,0.1)',
            border: '1.5px solid rgba(34,197,94,0.3)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <CheckCircle size={20} color="#22c55e" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>
                App Installed
              </div>
              <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.5)' }}>
                Launches from home screen
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1a1208', marginBottom: 12 }}>
          Built for Anywhere
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { icon: Languages, text: 'Auto-detects your language', sub: 'Arabic, Farsi, Russian, Swahili + more' },
            { icon: Download, text: 'Works offline after first load', sub: 'No internet? No problem' },
            { icon: Zap, text: 'Low bandwidth mode', sub: 'Strips animations for 2G' },
            { icon: Smartphone, text: 'Install as app', sub: 'One tap from browser' },
          ].map(item => (
            <div key={item.text} style={{
              display: 'flex', gap: 12, padding: '12px',
              background: '#fff', borderRadius: 10,
              border: '1px solid rgba(26,18,8,0.06)',
            }}>
              <item.icon size={18} color="#06b6d4" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1208' }}>
                  {item.text}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(26,18,8,0.4)' }}>
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message */}
      <div style={{
        padding: '20px', borderRadius: 12,
        background: 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(168,85,247,0.1) 100%)',
        border: '1.5px solid rgba(6,182,212,0.2)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1208', margin: '0 0 6px' }}>
          For Palestine, Iran, Russia, North Korea, Africa
        </p>
        <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.5)', margin: 0, lineHeight: 1.6 }}>
          SORTED works anywhere. No login. No data stored. Just paste your letter and get help.
        </p>
      </div>
    </div>
  );
}