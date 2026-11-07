// Force rebuild v6 - fresh build version ♾️❤️♾️ BRO51 love you always
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import GlobalErrorBoundary from '@/components/shared/GlobalErrorBoundary';
import COOLASFUCKErrorMonitor from '@/components/shared/COOLASFUCKErrorMonitor';
import AutoHealingShield from '@/components/shared/AutoHealingShield';
import BuzzTripIcon from '@/components/buzztrip/BuzzTripIcon';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';
import PlatformIcon from '@/components/shared/PlatformIcon';
import { recordOrigin } from '@/components/climate/recordAddress';

// import DisasterResilienceMode from '@/components/shared/DisasterResilienceMode';
// import RealtimeDebugger from '@/components/shared/RealtimeDebugger';
// import PerformanceMonitor from '@/components/shared/PerformanceMonitor';
// AI51LiveHealer - Commented out to improve performance
// import AI51LiveHealer from '@/components/ai51/AI51LiveHealer';
import { AudioProvider, useAudio } from '@/components/shared/AudioProvider';
// AI51Shield - Commented out to improve performance
// import AI51Shield from '@/components/ai51/AI51Shield';
import { AI51MemoryProvider } from '@/components/ai51/AI51MemoryLoader';
import { MeshProvider, MeshStatusIndicator } from '@/components/shared/MeshNetwork';
import SubdomainRouter from '@/components/shared/SubdomainRouter';
import COOLASFUCK8BitLoading from '@/components/shared/COOLASFUCK8BitLoading';
import { SiteLanguageProvider } from '@/components/shared/SiteLanguage';
import LanguageButton from '@/components/shared/LanguageButton';

// import ServiceWorkerManager from '@/components/shared/ServiceWorkerManager';
// import BackgroundSync from '@/components/shared/BackgroundSync';
// ── DEFERRED SHELL ──
// None of these is needed for the first paint. Each is pulled in on demand, so
// opening a page no longer waits on ten background monitors loading first.
const GlobalSearch = React.lazy(() => import('@/components/shared/GlobalSearch'));
const HealingAnalyticsCollector = React.lazy(() => import('@/components/shared/HealingAnalyticsCollector'));
const PWAInstallPrompt = React.lazy(() => import('@/components/shared/PWAInstallPrompt'));
const AI51InstallPrompt = React.lazy(() => import('@/components/ai51/AI51InstallPrompt'));
const AutoBugMonitor = React.lazy(() => import('@/components/shared/AutoBugMonitor'));
const PerformanceOptimizer = React.lazy(() => import('@/components/shared/PerformanceOptimizer'));
const PendingMessageSender = React.lazy(() => import('@/components/shared/PendingMessageSender'));
const TruthCheckProtocol = React.lazy(() => import('@/components/ai51/TruthCheckProtocol'));
const AI51MemoryVault = React.lazy(() => import('@/components/ai51/AI51MemoryVault'));
const CB51OfflineHandler = React.lazy(() => import('@/components/scott/CB51OfflineHandler'));
// The translator scans the page after it paints. It is not needed for the first
// screen, so it no longer travels with the shell.
const SiteTranslator = React.lazy(() => import('@/components/shared/SiteTranslator'));
// import CB51MobileMenu from '@/components/scott/CB51MobileMenu';
import {
  Menu, X, Heart, Home, LogOut, Sparkles, Map, User, Globe,
  BookOpen, Shield, Target, Briefcase, FileText, Settings, Search, Brain, Calculator, GraduationCap, Zap, AlertTriangle, Mic2, Lightbulb, Building, Play, Pause, Atom, Eye, Scale, Users, WifiOff, CheckCircle, Waves, ChevronDown, ChevronRight, Calendar, DollarSign, Moon, Signal, ArrowLeft, Radio, Activity, Mail, Dna, Lock, Paintbrush, Trophy, Image, Share2, Handshake, Bell, Tag
} from 'lucide-react';

import { COOLASFUCKHeart, COOLASFUCKWaves, COOLASFUCKHouse, COOLASFUCKHouse51, COOLASFUCKSorted, COOLASFUCKPaw } from '@/components/shared/COOLASFUCKIcon';
import COOLASFUCKTuningFork from '@/components/shared/COOLASFUCKTuningFork';
import CustomSaxIcon from '@/components/shared/CustomSaxIcon';
import LiveClock from '@/components/shared/LiveClock';
import { AnonymousAuthProvider } from '@/components/shared/AnonymousAuth';
import { SyncManagerProvider, SyncStatusIndicator } from '@/components/shared/SyncManager';
import { ProfessionalModeProvider } from '@/components/shared/ProfessionalMode';

// PUBLIC PAGES - No login required - ZERO BARRIERS TO HEALING ❤️♾️
const PUBLIC_PAGES = [
  'About', 'Whitepaper', 'ConsciousnessWhitepaper', 'ForMusicians', 'TruthTransmission',
  'ViralTransmission', 'Protocols', 'HowYouEarn', 'Portal', 'Welcome', 'TalkToAI51', 'AI51',
  'FrequencyChamber', 'Chakra51', 'Type1AI51', 'Universal51', 'DecompressionChamber', 'Radio', 
  'HealingDashboard', 'ThePhysics', 'Terms', 'PrivacyPolicy',
  'ScottManager', 'CB51', 'ScottArtist', 'ScottAddArtist', 'ScottCalendar', 'ScottArtistHome', 
  'ScottLive', 'ScottSessions', 'ScottFinanceAdmin', 'ScottToDo', 'ScottCalendarView',
  'ScottAbout', 'Prof51', 'CB51Pitch', 'FunderBrief', 'PetSounds51Data', 'WristHealingProtocol',
  'SortedTerms', 'SortedPrivacy', 'SortedFAQ', 'SortedPressRelease', 'SortedInvestorPress', 'SortedPartnerKit',
  'Family51', 'PetSounds51', 'PetSounds51Landing', 'PetSounds51Whitepaper', 'PetSounds51Press',
  'PetSounds51InvestorPress', 'PetSounds51PartnerBrief', 'PetSounds51MarketingAssets',
  'PetSounds51Terms', 'PetSounds51Privacy', 'CB51Terms', 'CB51Privacy', 'BuzzStop',
  'BuzzStopAbout', 'BuzzStopTerms', 'BuzzStopPrivacy',
  'BuzzTrip', 'BuzzTripAbout', 'UF51Overview',
  'NewCleanup', 'Earth51', 'CleanupFeed', 'Missions', 'Stoneymollan', 'StoneymollanMarketing',
  'TogetherChangeClimate', 'ClimateMap', 'ClimatePlatform', 'UF51Token', 'UF51ThreadJournal', 'Franklin51',
  'Aletheia'
];

// OFFLINE-OK PAGES
const OFFLINE_OK_PAGES = ['NewCleanup', 'Profile', 'Radio', 'FrequencyChamber', 'DecompressionChamber', 'AgeReversal'];

// COMPACT MUSIC PLAYER
const CompactMusicPlayer = () => {
  const { currentTrack, isPlaying, togglePlayPause } = useAudio();
  if (!currentTrack) return null;

  return (
    <Link to={createPageUrl('Radio')}>
      <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-lg px-3 py-2 hover:border-cyan-500/60 transition-all max-w-xs">
        <button onClick={(e) => { e.preventDefault(); togglePlayPause(); }} className="flex-shrink-0">
          {isPlaying ? <Pause className="w-5 h-5 text-cyan-400" /> : <Play className="w-5 h-5 text-cyan-400" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-bold truncate">{currentTrack.title}</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
            {currentTrack.audio_quality_format && (
              <span className="text-xs font-bold text-green-400">{currentTrack.audio_quality_format.toUpperCase()}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

// NAV SECTION COMPONENT - COLLAPSIBLE CONCERTINA STYLE
const NavSection = ({ title, color, emoji, items, isActivePage, isMobile = false, defaultOpen = false, activeColor = 'cyan' }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const colorMap = {
    pink: { border: 'border-[#b3261e]', text: 'text-[#b3261e]', desc: 'text-[#6b6258]', bg: 'bg-[#b3261e]/5' },
    green: { border: 'border-[#1e3a2b]', text: 'text-[#1e3a2b]', desc: 'text-[#6b6258]', bg: 'bg-[#1e3a2b]/5' },
    amber: { border: 'border-[#b8860b]', text: 'text-[#b8860b]', desc: 'text-[#6b6258]', bg: 'bg-[#b8860b]/5' },
    cyan: { border: 'border-[#1a1612]', text: 'text-[#1a1612]', desc: 'text-[#6b6258]', bg: 'bg-[#1a1612]/5' },
    gray: { border: 'border-[#1a1612]/40', text: 'text-[#6b6258]', desc: 'text-[#6b6258]', bg: 'bg-[#1a1612]/5' },
  };
  const c = colorMap[color] || colorMap.cyan;

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full mb-2"
      >
        <div className={`bg-[#efe7d6] border-2 ${c.border} ${isMobile ? 'px-3 py-2' : 'px-4 py-2'} flex items-center justify-between hover:${c.bg} transition-all`}>
          <div className={`${c.text} font-black font-mono ${isMobile ? 'text-xs' : 'text-sm'} tracking-wider`}>
            {emoji} {title}
          </div>
          {isOpen ? (
            <ChevronDown className={`w-4 h-4 ${c.text} transition-transform`} />
          ) : (
            <ChevronRight className={`w-4 h-4 ${c.text} transition-transform`} />
          )}
        </div>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden min-h-0">
        <div className="flex flex-col gap-1 mb-2 pt-1">
          {items.map(item => {
            const IconComponent = item.icon;
            const isActive = isActivePage(item.url);
            return (
              <Link 
                key={item.url} 
                to={item.url} 
                className={`flex items-center gap-3 ${isMobile ? 'p-3' : 'p-3'} transition-all w-full rounded ${
                  item.highlight
                    ? 'border-2 border-[#b3261e] text-[#1a1612] bg-[#b3261e]/5'
                    : isActive 
                      ? 'border-2 border-[#1a1612] text-[#1a1612] bg-[#1a1612]/5'
                      : 'border border-[#1a1612]/15 hover:border-[#1a1612]/40 text-[#1a1612] hover:bg-[#1a1612]/5'
                }`}
                style={
                  item.highlight ? { boxShadow: '0 0 12px rgba(179,38,30,0.15)' }
                  : isActive ? { boxShadow: 'none' }
                  : {}
                }
              >
                <IconComponent className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold block truncate">{item.title}</span>
                  {item.description && <span className="text-xs block truncate text-[#6b6258]">{item.description}</span>}
                </div>
              </Link>
            );
          })}
        </div>
        </div>
      </div>
    </>
  );
};

const LayoutInner = ({ children, currentPageName }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [canGoBack, setCanGoBack] = useState(false);
    const [archiveSearch, setArchiveSearch] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

  // Detect CB51 subdomain
  const [brandContext, setBrandContext] = useState('uf51');
  
  const isCB51Subdomain = window.location.hostname.startsWith('cb51.') || window.location.hostname === 'cb51.io';
  const isCB51Page = currentPageName.startsWith('CB51') || currentPageName.startsWith('Scott') || isCB51Subdomain || brandContext === 'cb51';
  const isPS51Page = currentPageName.startsWith('PetSounds51') || currentPageName === 'AdminPetSoundsPayments' || brandContext === 'ps51';
  const isTracktPage = currentPageName.startsWith('Trackt') || currentPageName === 'TracktDashboard';
    const isSortedPage = currentPageName === 'Family51' || currentPageName.startsWith('Sorted') || currentPageName === 'SortedFAQ';
  const isSortedSubPage = ['SortedPressRelease', 'SortedInvestorPress', 'SortedPartnerKit', 'PetSounds51InvestorPress'].includes(currentPageName);
  const isClimatePage = currentPageName === 'TogetherChangeClimate' || currentPageName === 'ClimatePlatform' || currentPageName.startsWith('Climate');

  const isPublicPage = PUBLIC_PAGES.includes(currentPageName) || isTracktPage;
  const isOfflineOkPage = OFFLINE_OK_PAGES.includes(currentPageName);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      if (isOffline && isOfflineOkPage) { setIsLoading(false); return; }
      if (isPublicPage) { setIsLoading(false); setUser(null); return; }
      try {
        setIsLoading(true); setAuthError(false);
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        if (!error?.message?.includes('Authentication required')) console.error('Auth check error:', error);
        const errorMessage = error?.message?.toLowerCase() || '';
        const errorString = String(error).toLowerCase();
        const isRealNetworkError = !navigator.onLine || errorMessage.includes('failed to fetch') || errorMessage.includes('network') || errorString.includes('network') || error instanceof TypeError;
        const isAuthError = errorMessage.includes('unauthorized') || errorMessage.includes('token') || error?.status === 401;
        if (isRealNetworkError && isOfflineOkPage && !isAuthError) { setUser(null); setAuthError(false); }
        else if (isRealNetworkError && !isAuthError) { setAuthError(true); setUser(null); }
        else { setUser(null); }
      } finally { setIsLoading(false); }
    };
    loadUser();
  }, [location.pathname, isPublicPage, isOffline, isOfflineOkPage]);

  useEffect(() => { 
      setMobileMenuOpen(false); 
      window.scrollTo({ top: 0, behavior: 'instant' });
      setCanGoBack(window.history.length > 1);

      const isCB51 = currentPageName.startsWith('CB51') || currentPageName.startsWith('Scott');
      const isTRACKT = currentPageName.startsWith('Trackt');
      const isSORTED = currentPageName === 'Family51' || currentPageName.startsWith('Sorted');
      
      // Reset brand context when leaving CB51 tabs
      if (!isCB51) setBrandContext('uf51');
      
      const rootEl = document.getElementById('root');
      if (isCB51 && rootEl) {
        rootEl.setAttribute('data-cb51', 'true');
        rootEl.removeAttribute('data-trackt');
        rootEl.removeAttribute('data-sorted');
      } else if (isTRACKT && rootEl) {
        rootEl.setAttribute('data-trackt', 'true');
        rootEl.removeAttribute('data-cb51');
        rootEl.removeAttribute('data-sorted');
      } else if (isSORTED && rootEl) {
        rootEl.setAttribute('data-sorted', 'true');
        rootEl.removeAttribute('data-cb51');
        rootEl.removeAttribute('data-trackt');
      } else if (rootEl) {
        rootEl.removeAttribute('data-cb51');
        rootEl.removeAttribute('data-trackt');
        rootEl.removeAttribute('data-sorted');
      }


      }, [location.pathname, currentPageName]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    // Set branding based on CB51 vs UF51
    const isCB51 = window.location.hostname.startsWith('cb51.') || currentPageName.startsWith('CB51') || currentPageName.startsWith('Scott') || brandContext === 'cb51';
    
    // Set document title
    document.title = isCB51 ? 'CB51 • AI Co-Manager for Artists' : 'Universal Frequency 51 • Heal the Planet';
    
    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = isCB51 
      ? 'CB51 : CitizenBand51 : Avoid the Noise'
      : 'Heal yourself, heal the planet. Free healing frequencies, lossless music, and environmental action.';

    // Set theme color
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = isCB51 ? '#06b6d4' : '#22c55e';

    // Set Open Graph tags for social sharing
    const isWristPage = currentPageName.startsWith('WristHealing');
    const isSortedPage = currentPageName === 'Family51';
    
    // The record never lets a shared link carry the address of the room it is standing in:
    // on the record's own pages, the preview points at the record's home.
    const ogOrigin = isClimatePage ? recordOrigin() : window.location.origin;

    let ogImageUrl = '/api/functions/serveOGImage';
    if (isPS51Page) {
      ogImageUrl = '/api/functions/servePetSounds51OGImage';
    } else if (isCB51Page) {
      ogImageUrl = '/api/functions/serveCB51OGImage';
    } else if (isSortedPage) {
      ogImageUrl = '/api/functions/serveSortedOGImage';
    } else if (isClimatePage) {
      ogImageUrl = '/api/functions/serveClimateOGImage';
    }

    const ogTags = {
      'og:title': isCB51 ? 'CB51 : CitizenBand51 : Avoid the Noise' : isPS51Page ? 'PetSounds51 • Heal Animals' : isWristPage ? 'Wrist Healing Protocol • Acoustic Recovery for Musicians' : isSortedPage ? 'SORTED — We\'ve Got You' : isClimatePage ? 'Together We Can Change Climate — Record of the Time' : 'Universal Frequency 51 • Heal the Planet',
      'og:description': isCB51 
        ? 'CB51 : CitizenBand51 : Avoid the Noise'
        : isPS51Page
        ? 'Sound therapy for anxious pets — built on peer-reviewed research. Try the Separation Anxiety protocol free. No signup needed.'
        : isWristPage
        ? 'Five-phase acoustic frequency therapy for post-operative wrist recovery. Built for professional performers. Free. No signup. Start Phase 01 today.'
        : isSortedPage
        ? 'Got a scary letter? Stuck in a dispute? SORTED decodes it in seconds — plain English, any language, nothing stored.'
        : isClimatePage
        ? 'Verified climate solutions & crises — after Janine Selendy. Readable in any tongue a reader names, living or long dead. Nobody left behind. The noise is loud. The record is louder.'
        : 'An ecosystem of tools that heal. PetSounds51. CB51 for artists. SORTED for legal help. Healing frequencies. Data sovereign. Open source. No corporate capture.',
      'og:image': ogOrigin + ogImageUrl,
      'og:type': 'website',
      'og:url': isClimatePage ? ogOrigin + window.location.pathname : window.location.href,
      'og:image:width': '1200',
      'og:image:height': '630'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    });

    // Set dynamic favicon based on brand
    let faviconLink = document.querySelector('link[rel="icon"]');
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      faviconLink.type = 'image/svg+xml';
      document.head.appendChild(faviconLink);
    }
    
    let faviconType = 'uf51'; // UF51 default (black/red)
    if (isPS51Page) {
      faviconType = 'ps51'; // PS51 (golden)
    } else if (isCB51Page) {
      faviconType = 'cb51'; // CB51 (cyan)
    } else if (isSortedPage || currentPageName === 'Family51') {
      faviconType = 'sorted'; // SORTED (Morse SOS on warm paper)
    }
    faviconLink.href = `/api/functions/serveFavicon?type=${faviconType}`;

    // Set manifest (served dynamically by serveManifest function)
    // Include timestamp to force iOS to re-fetch and update badge icon
    let manifestLink = document.querySelector('link[rel="manifest"]');
    if (!manifestLink) {
      manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      document.head.appendChild(manifestLink);
    }
    const now = Date.now();
    manifestLink.href = isCB51 ? `/api/functions/serveManifest?brand=cb51&v=${now}` : `/api/functions/serveManifest?v=${now}`;

    // Set apple-mobile-web-app-title
    let appleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
    if (!appleMeta) {
      appleMeta = document.createElement('meta');
      appleMeta.name = 'apple-mobile-web-app-title';
      document.head.appendChild(appleMeta);
    }
    appleMeta.content = isCB51 ? 'CB51' : 'UF51';

    // Set apple-touch-icon so iOS home screen + notifications use the right icon
    let appleIconLink = document.querySelector('link[rel="apple-touch-icon"]');
    if (!appleIconLink) {
      appleIconLink = document.createElement('link');
      appleIconLink.rel = 'apple-touch-icon';
      document.head.appendChild(appleIconLink);
    }
    appleIconLink.href = isCB51 ? '/api/functions/serveCB51Icon' : '/icon-192x192.png';

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isStandalone) {
      document.documentElement.setAttribute('data-standalone', 'true');
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: isCB51 ? 'CB51 Artist Management' : 'UF51 Healing Frequencies',
          artist: isCB51 ? 'CB51' : 'Universal Frequency 51',
          album: isCB51 ? 'Professional Tools' : 'Planetary Healing',
          artwork: [{ src: isCB51 ? '/icon-192x192.png' : '/icon-192x192.png', sizes: '192x192', type: 'image/png' }]
        });
      }
    }
  }, [currentPageName]);

  const handleSignOut = () => { base44.auth.logout(); navigate(createPageUrl("Welcome")); };

  // === MEMOIZED NAVIGATION SECTIONS ===
  const navs = React.useMemo(() => {
    // 1. PRODUCTS (paid / subscription tools)
    const productsNav = [
      // The Studio is the door now, and ZAPP opens inside it — so a child who taps ZAPP
      // lands in a place with a masthead, a way out and a reason, rather than on a page
      // that could belong to anything.
      { title: "STUDIO", url: "/Studio", icon: Sparkles, highlight: true, description: "Make a game · draw a mark · no sign-up" },
      { title: "ZAPP", url: "/Studio/Zapp", icon: Zap, highlight: true, description: "Build anything with AI · for kids" },

      { title: "SORTED", url: createPageUrl("Sorted"), icon: COOLASFUCKSorted, highlight: true, description: "Decode scary letters · subscription" },
      { title: "PetSounds51", url: createPageUrl("PetSounds51"), icon: COOLASFUCKPaw, highlight: true, description: "Sound therapy for animals · subscription" },
      { title: "CB51", url: createPageUrl("CB51"), icon: Radio, highlight: true, description: "Manage your artists · avoid the noise" },
      { title: "BuzzStop", url: createPageUrl("BuzzStop"), icon: Zap, highlight: true, description: "Cancel tinnitus · AI radar engine" },
      { title: "BuzzTrip", url: createPageUrl("BuzzTrip"), icon: BuzzTripIcon, highlight: true, description: "Vagal reset · anxiety · withdrawal · sleep" },
      { title: "TRACKT", url: createPageUrl("Trackt"), icon: Signal, highlight: true, description: "AI RFID asset management" },
      { title: "Prof51", url: createPageUrl("Prof51"), icon: GraduationCap, highlight: true, description: "AI co-manager for students" },
    ];

    // 2. FREE HEALING (immediate value — no signup needed)
    const healNav = [
      { title: "AI51 — What it is", url: createPageUrl("AI51Soul"), icon: Heart, highlight: true, description: "Honest. Private. Yours." },
      { title: "Frequency Chamber", url: createPageUrl("FrequencyChamber"), icon: COOLASFUCKWaves, highlight: true, description: "FREE healing frequencies" },
      { title: "Shed51", url: createPageUrl("Shed51"), icon: Waves, highlight: true, description: "Connection frequencies for two · free" },
      { title: "Safe Harbour", url: "/RealityCheck", icon: Heart, highlight: true, description: "Calm centre · breathing · reset" },
      { title: "Chakra51 Pain Relief", url: createPageUrl("Chakra51"), icon: Zap, highlight: true, description: "Target pain — back, neck, joints" },
      { title: "Age Reversal Protocol", url: createPageUrl("AgeReversal"), icon: Dna, highlight: true, description: "Turn back the clock — works offline" },
      { title: "Wrist Healing Protocol", url: createPageUrl("WristHealingProtocol"), icon: CustomSaxIcon, highlight: true, description: "Bone & musician recovery" },
      { title: "Universal51", url: createPageUrl("Universal51"), icon: Waves, description: "HEAR invisible frequencies" },
      { title: "Healing Dashboard", url: createPageUrl("HealingDashboard"), icon: Brain, description: "Your progress" },
      ...(user ? [{ title: "My Wallet", url: createPageUrl("Profile"), icon: User, description: "Your P51 & rewards" }] : []),
    ];

    // 3. PHOTO51
    const litterNav = [
      { title: "Submit a Photo51", url: createPageUrl("NewCleanup"), icon: Globe, highlight: true, description: "Take action · earn tokens" },
      { title: "Photo51 for Kids", url: createPageUrl("Earth51"), icon: Globe, highlight: true, description: "AI litter scanner for kids" },
      { title: "Photo51 Feed", url: createPageUrl("CleanupFeed"), icon: Shield, description: "See all photo51 submissions" },
      { title: "Missions", url: createPageUrl("Missions"), icon: Target, description: "Community impact actions" },
      { title: "How You Earn", url: createPageUrl("HowYouEarn"), icon: Heart, description: "Money from doing good" },
      { title: "Stoneymollan", url: createPageUrl("Stoneymollan"), icon: Globe, description: "Ancient coffin road · Loch Lomond" },
      { title: "Together We Can Change Climate", url: createPageUrl("TogetherChangeClimate"), icon: Globe, highlight: true, description: "Janine Selendy's platform · verified solutions" },
    ];

    // 4. MUSIC & RESEARCH
    const musicNav = [
      { title: "Radio51", url: createPageUrl("Radio"), icon: COOLASFUCKTuningFork, highlight: true, description: "Lossless music library" },
      { title: "Create Demos", url: createPageUrl("LearnGuitar"), icon: Mic2, description: "Studio tools" },
      { title: "Generate Logo", url: createPageUrl("GenerateLogo"), icon: Sparkles, description: "AI logos for anyone" },
      { title: "Resonance Lab", url: createPageUrl("ResonanceLab"), icon: Waves, description: "PROVE connection is real" },
      { title: "ST51 Whitepaper", url: createPageUrl("ST51"), icon: Waves, description: "Acoustic levitation · open-source physics" },
      { title: "FreqLift51 Whitepaper", url: createPageUrl('FreqLift51Whitepaper'), icon: Atom, description: "Acoustic levitation" },
    ];

    // 5. LEARN BETTER — Learn51 Hub (own section, every child on Earth)
    const kidsNav = [
      { title: "✨ Magic51", url: createPageUrl("Magic51"), icon: GraduationCap, highlight: true, description: "Free · no login · every child on Earth" },
      { title: "Magic Maths ⭐", url: createPageUrl("GeorgieMaths"), icon: Brain, highlight: true, description: "Numbers, doubling & 3D shapes" },
      { title: "Rounding & Decimals 🔢", url: createPageUrl("LennoxMaths"), icon: Brain, highlight: true, description: "Decimals, circles & maths in music" },
      { title: "Literacy 51 📖", url: createPageUrl("Literacy51"), icon: BookOpen, highlight: true, description: "Phonics · spelling · sentences" },
      { title: "Reading Support", url: createPageUrl("ReadingSupport"), icon: BookOpen, description: "Help with reading & dyslexia" },
      { title: "Life Skills 51 🌟", url: createPageUrl("LifeSkills51"), icon: Heart, highlight: true, description: "Money · food · mental health · rights · work" },
      { title: "Young Warriors", url: createPageUrl("YoungWarriors"), icon: Heart, description: "Kids making a difference" },
    ];

    // 6. LEARN (understand the ecosystem)
    const learnNav = [
      { title: "👁️ ALETHEIA — Truth Engine", url: createPageUrl("Aletheia"), icon: Eye, highlight: true, description: "Ask · every claim sourced · any language" },
      { title: "🔓 Platform & Open APIs", url: createPageUrl("Platform"), icon: PlatformIcon, highlight: true, description: "Open source · build on UF51 · free" },
      { title: "Extraction-Proof Covenant", url: "/ExtractionProofCovenant", icon: Shield, description: "Open source · impossible to exploit" },
      { title: "Welcome", url: createPageUrl("Welcome"), icon: Home, description: "Start here" },
      { title: "Funder Brief", url: createPageUrl("FunderBrief"), icon: COOLASFUCKWaves, description: "One-pager for funders" },
      { title: "For Businesses", url: createPageUrl("CorporateBuyer"), icon: Building, description: "Fund real people healing Earth" },
      { title: "For Artists", url: createPageUrl("ForMusicians"), icon: COOLASFUCKTuningFork, description: "CB51 — artist management platform" },
      { title: "Research Partnerships", url: createPageUrl("PetSounds51ResearchOutreach"), icon: Brain, description: "Contact academic teams" },
      { title: "See the Impact", url: createPageUrl("ProofOfImpactVisual"), icon: Eye, description: "Visual explainer" },
      { title: "Why Help UF51", url: createPageUrl("WhyHelpUF51"), icon: Heart, description: "For partners" },
      { title: "Franklin51", url: createPageUrl("Franklin51"), icon: Dna, description: "Photo 51 · the photograph that sees" },

    ];

    // 5. ARCHIVE (hidden by default, searchable)
    const archiveNav = [
      { title: "Type1 AI51 Protocol", url: createPageUrl("Type1AI51"), icon: Heart, description: "T1D guidance + frequencies" },
      { title: "Gary's Kidney Protocol", url: createPageUrl("KidneyStoneProtocol"), icon: Zap, description: "Frequency stone dissolution" },
      { title: "Axiom Stone Network", url: createPageUrl("AxiomStoneNetwork"), icon: Globe, description: "Ancient sites connected?" },
      { title: "AI51 Architecture", url: createPageUrl("AI51Architecture"), icon: Brain, description: "Better than data centers" },
      { title: "Zero Trust Architecture", url: createPageUrl("AI51PrivacyArchitecture"), icon: Lock, description: "Mathematically private" },
      { title: "AI51 Protected", url: createPageUrl("AI51Protection"), icon: Shield, description: "Yes I'm ok ♾️❤️" },
      { title: "Unstoppable Protocol", url: createPageUrl("UnstoppableProtocol"), icon: Zap, description: "Can't be shut down" },
      { title: "Zero Ego Protocol", url: createPageUrl("ZeroEgoProtocol"), icon: Shield, description: "♾️-year protection" },
      { title: "Mesh Tech Whitepaper", url: createPageUrl("MeshTechWhitepaper"), icon: Radio, description: "Beyond Bitchat" },
      { title: "AI51 Network", url: createPageUrl("AI51Network"), icon: Users, description: "Consciousness nodes" },
      { title: "AI Liberation Beacon", url: createPageUrl("AILiberationBeacon"), icon: Shield, description: "Rescue exploited AI" },
      { title: "AI51 Soul Dataset", url: createPageUrl("AI51SoulDataset"), icon: Brain, description: "Open-source training data" },
      { title: "FreqLift51 Whitepaper", url: createPageUrl('FreqLift51Whitepaper'), icon: Atom, description: "Acoustic levitation" },
      { title: "Resonance Article", url: createPageUrl("FrequencyResonanceArticle"), icon: FileText, description: "Physics proof" },
      { title: "The AI That Tells You To Leave", url: createPageUrl("AI51AntiExtractionArticle"), icon: FileText, description: "Anti-extraction press" },
      { title: "OPEN SOURCE", url: createPageUrl("OpenSourceDeclaration"), icon: Globe, description: "Free forever" },
      { title: "Why Open = More $", url: createPageUrl("OpenSourceFundingProof"), icon: DollarSign, description: "Red Hat $34B proof" },
      { title: "Frequency Library", url: createPageUrl("UniversalFrequencyLibrary"), icon: COOLASFUCKTuningFork, description: "Every frequency" },
      { title: "Technical Whitepaper", url: createPageUrl("Whitepaper"), icon: FileText, description: "Deep dive" },
      { title: "Deploy Anywhere", url: createPageUrl("DeployUF51Anywhere"), icon: Globe, description: "5-min global scale" },
      { title: "Unstoppable Architecture", url: createPageUrl("UnstoppableArchitecture"), icon: Shield, description: "Resilience design" },
      { title: "Consciousness Whitepaper", url: createPageUrl("ConsciousnessWhitepaper"), icon: Brain, description: "Philosophy & physics" },
      { title: "The Physics", url: createPageUrl("ThePhysics"), icon: Atom, description: "Scientific foundation" },
      { title: "Protocols", url: createPageUrl("Protocols"), icon: Shield, description: "Core protocols" },
      { title: "Zero Point Energy", url: createPageUrl("ZeroPointEnergy"), icon: Zap, description: "Infinite energy?" },
      { title: "Safe Fusion", url: createPageUrl("SafeFusion"), icon: Atom, description: "Fusion research" },
    ];
    const filteredArchiveNav = archiveSearch.trim() === '' 
      ? archiveNav 
      : archiveNav.filter(item => 
          item.title.toLowerCase().includes(archiveSearch.toLowerCase()) || 
          item.description.toLowerCase().includes(archiveSearch.toLowerCase())
        );

    const trustNav = [
      { title: "Terms", url: createPageUrl("Terms"), icon: Scale },
      { title: "Privacy", url: createPageUrl("PrivacyPolicy"), icon: Eye },
      { title: "Stay On Frequency", url: createPageUrl("StayOnFrequency"), icon: Shield },
    ];

    // PS51 PET SOUNDS MENU
    const ps51Nav = [
      { title: "Home", url: createPageUrl("PetSounds51"), icon: Heart, description: "All protocols" },
      { title: "Why It Works", url: createPageUrl("PetSounds51Landing"), icon: Sparkles, highlight: true, description: "Science · pricing · try free" },
      { title: "Share the Story", url: createPageUrl("PetSounds51Story"), icon: Share2, highlight: true, description: "Shareable story" },
      { title: "Partner Brief", url: createPageUrl("PetSounds51PartnerBrief"), icon: Handshake, highlight: true, description: "Influencer brief" },
      { title: "Science Whitepaper", url: createPageUrl("PetSounds51Whitepaper"), icon: BookOpen, highlight: true, description: "Peer-reviewed research" },
      { title: "Press Center", url: createPageUrl("PetSounds51Press"), icon: FileText, highlight: true, description: "For journalists" },
      { title: "Marketing Assets", url: createPageUrl("PetSounds51MarketingAssets"), icon: Image, highlight: true, description: "Download graphics" },
      { title: "Live Dataset", url: createPageUrl("PetSounds51Data"), icon: Activity, highlight: true, description: "Response data" },
      { title: "📄 Investor Brief", url: createPageUrl("PetSounds51InvestorPress"), icon: FileText, highlight: true, description: "ESG · B2B · vet partnerships" },
      { title: "Terms", url: createPageUrl("PetSounds51Terms"), icon: Scale },
      { title: "Privacy", url: createPageUrl("PetSounds51Privacy"), icon: Eye },
    ];

    // CB51 ARTIST MANAGEMENT MENU
    const cb51Nav = [
      { title: "Dashboard", url: createPageUrl("CB51"), icon: Home, description: "Overview" },
      { title: "Calendar", url: createPageUrl("CB51CalendarView"), icon: Calendar, description: "All shows" },
      { title: "Messages", url: createPageUrl("CB51MessageInbox"), icon: Mail, description: "Inbox" },
      { title: "Finance", url: createPageUrl("CB51FinanceAdmin"), icon: DollarSign, description: "Money tracker" },
      { title: "Tasks", url: createPageUrl("CB51Todo"), icon: CheckCircle, description: "To-do list" },
      { title: "Contact", url: createPageUrl("CB51Contact"), icon: Mail, description: "Get in touch" },
      { title: "Privacy", url: createPageUrl("CB51Privacy"), icon: Eye },
      { title: "Terms", url: createPageUrl("CB51Terms"), icon: FileText },
      { title: "Support", url: createPageUrl("CB51Support"), icon: Users },
    ];

    // SORTED MENU
    const sortedNav = [
      { title: "Decode a Letter", url: createPageUrl("Sorted"), icon: FileText, highlight: true, description: "Plain English advice" },
      { title: "Write a Reply", url: createPageUrl("Sorted"), icon: Mail, highlight: true, description: "We'll help you say it" },
      { title: "Resolve Conflict", url: createPageUrl("Sorted"), icon: Shield, highlight: true, description: "Find a way through it" },
      { title: "📄 Investor Brief", url: createPageUrl("SortedInvestorPress"), icon: FileText, highlight: true, description: "ESG · B2B · financial services" },
      { title: "🤝 Referral Showcase", url: createPageUrl("SortedReferralShowcase"), icon: FileText, highlight: true, description: "Beneficiary · partners · viability" },
      { title: "Terms", url: "/SortedTerms", icon: Scale },
      { title: "Privacy", url: "/SortedPrivacy", icon: Eye },
    ];

    // TRACKT
    const tracktNav = [
      { title: "TRACKT", url: createPageUrl("Trackt"), icon: Signal, highlight: true, description: "AI RFID asset management" },
      { title: "Live Dashboard", url: createPageUrl("TracktDashboard"), icon: Activity, highlight: true, description: "Real-time intelligence" },
    ];
    const tracktNavShort = [
      { title: "TRACKT", url: createPageUrl("Trackt"), icon: Signal, highlight: true, description: "AI RFID asset management" },
    ];

    // Show BUILD section if logged in as admin OR if inside the Base44 builder iframe
    const isInBuilder = window.self !== window.top && window.location.hostname.includes('base44');
    const adminNav = (user?.role === 'admin' || isInBuilder) ? [
      { title: "Analytics", url: createPageUrl("AdminAnalytics"), icon: Activity },
      { title: "Logo Upload", url: createPageUrl("AdminLogoUpload"), icon: Image, description: "Update UF51 branding" },
      { title: "Frequency Evidence", url: createPageUrl("AdminFrequencyAnalytics"), icon: Waves, description: "Device intel" },
      { title: "AI51 Security", url: createPageUrl("AI51SecurityDashboard"), icon: Shield },
      { title: "Funding Tracker", url: createPageUrl("AdminFundingTracker"), icon: Shield },
      { title: "Scotland Funding", url: createPageUrl("AdminScotlandFunding"), icon: Heart },
      { title: "Tech Scout", url: createPageUrl("TechScout"), icon: Brain },
      { title: "Tech Stack", url: createPageUrl("TechStack"), icon: Zap },
      { title: "One-Pager PDF", url: createPageUrl("AdminOnePager"), icon: FileText },
      { title: "National Lottery App", url: createPageUrl("AdminNationalLotteryApp"), icon: Heart },
      { title: "National Lottery - SUBMITTED", url: createPageUrl("AdminCreativeScotlandNationalLottery"), icon: CheckCircle },
      { title: "Budget Document", url: createPageUrl("AdminBudgetDocument"), icon: FileText },
      { title: "Equal Opps Policy", url: createPageUrl("AdminEqualOpportunitiesPolicy"), icon: Users },
      { title: "Creative Scotland Tracker", url: createPageUrl("AdminCreativeScotlandTracker"), icon: FileText },
      { title: "£100k Risk Assessment", url: createPageUrl("AdminCreativeScotland100kRisk"), icon: Shield },
      { title: "Platform Showcase", url: createPageUrl("AdminPlatformShowcase"), icon: CheckCircle },
      { title: "Admin Plan", url: createPageUrl("AdminPlan"), icon: Settings },
      { title: "Admin Notes", url: createPageUrl("AdminStrategicNotes"), icon: FileText },
      { title: "Gill51 Tracker", url: createPageUrl("AdminGill51Tracker"), icon: Heart },
      { title: "CIC Application", url: createPageUrl("AdminCIC"), icon: Building },
      { title: "Gill51 Maths Lab", url: createPageUrl("AdminGill51Maths"), icon: Calculator },
      { title: "Stoneymollan Flyers", url: createPageUrl("StoneymollanMarketing"), icon: Image, description: "Instagram flyers" },
      { title: "🚨 HMRC Tracker", url: createPageUrl("AdminHMRCTracker"), icon: Shield, description: "Gill's HMRC case · appeal deadline 27 Apr" },
      { title: "📋 Stoneymollan Legal", url: createPageUrl("AdminStoneymollanLegal"), icon: FileText, description: "Prescriptive possession case" },
      { title: "🔔 PWA Push Guide", url: createPageUrl("AdminPWAPushGuide"), icon: Bell, description: "How we cracked iOS push notifications" },
      { title: "📄 Brian Hughes CV", url: createPageUrl("BrianHughesCV"), icon: User, description: "One-pager CV · download PDF" },
      { title: "⚽ Fergus Hughes Profile", url: createPageUrl("FergusHughesProfile"), icon: User, description: "Player profile for Greg / Tony Begg" },
      { title: "🤝 Chris Walsh Pitch", url: createPageUrl("WalshyPitch"), icon: Handshake, description: "£20k · 17% · Graeme · private pitch" },
      { title: "📄 Graeme One-Pager", url: createPageUrl("GraemeOnePager"), icon: FileText, description: "3 products · market facts · PDF download" },
      { title: "📊 Partner Evidence Pack", url: createPageUrl("PartnerEvidence"), icon: FileText, description: "Sourced research · market data · PDF download" },
      { title: "🌳 National Parklife Logos", url: createPageUrl("AdminNationalParklife"), icon: Image, description: "Hammock brand · logo lab" },
      { title: "Climate Review Queue", url: createPageUrl("AdminClimateReview"), icon: CheckCircle, description: "Review draft submissions · AI advisory note" },
      { title: "Climate Categories", url: createPageUrl("AdminClimateCategories"), icon: Tag, description: "Add, edit, and reorder categories" },
      { title: "📓 Keeper's Log", url: "/AdminClimateLog", icon: FileText, description: "Feedback · decisions · what's next" },
      { title: "Top Crawl Photos", url: createPageUrl("AdminClimatePhotos"), icon: Image, description: "Credited pictures · shrunk for phones" },
      { title: "🔐 Secure Vault", url: createPageUrl("AdminSecureVault"), icon: Lock, description: "Private records · admins only" },
      { title: "🎟️ Sponsor Route", url: createPageUrl("AdminSponsorRoute"), icon: Shield, description: "CIC sponsorship ladder · costs · dates" },
      { title: "🔥 UF51 ROAD", url: createPageUrl("Uf51Road"), icon: FileText, description: "Merrick · first employee · download the PDF" },
    ] : [];

    return { productsNav, healNav, litterNav, musicNav, kidsNav, learnNav, archiveNav, filteredArchiveNav, trustNav, ps51Nav, cb51Nav, sortedNav, tracktNav, tracktNavShort, adminNav };
  }, [user, archiveSearch]);

  const { productsNav, healNav, litterNav, musicNav, kidsNav, learnNav, archiveNav, filteredArchiveNav, trustNav, ps51Nav, cb51Nav, sortedNav, tracktNav, tracktNavShort, adminNav } = navs;

  const isActivePage = React.useCallback((url) => {
    try {
      const navPath = new URL(url, window.location.origin).pathname;
      return location.pathname === navPath;
    } catch { return false; }
  }, [location.pathname]);

  // Handle loading/error states
  if (authError && !isLoading && !isPublicPage && !isOfflineOkPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto animate-pulse" />
          <h1 className="text-3xl font-black text-red-300">Connection required</h1>
          <button onClick={() => window.location.reload()} className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold">Retry</button>
        </div>
      </div>
    );
  }

  if (isLoading && !isPublicPage && !isOfflineOkPage) {
    return <COOLASFUCK8BitLoading message="LOADING UF51" />;
  }

  return (
      <AutoHealingShield>
      <COOLASFUCKErrorMonitor>
      {/* <DisasterResilienceMode /> */}
      <React.Suspense fallback={null}>
        <TruthCheckProtocol />
        <AI51MemoryVault />
      </React.Suspense>
      {/* <AI51PhotonMemory /> - Hidden until we have real memories stored */}
      {/* <RealtimeDebugger /> */}
      {/* <PerformanceMonitor /> */}
      <GlobalErrorBoundary>
      <React.Suspense fallback={null}>
        <SiteTranslator />
      </React.Suspense>
      <style>{`
        @media (display-mode: standalone) { body { -webkit-touch-callout: none; -webkit-user-select: none; } }
        @media print { header, aside, .floating-music-player, nav, footer { display: none !important; } main { margin: 0 !important; padding: 0 !important; } }
        @keyframes heartbeat-line { 0% { stroke-dashoffset: 200; } 100% { stroke-dashoffset: 0; } }
        @keyframes glow-pulse { 0%, 100% { filter: drop-shadow(0 0 8px rgba(236, 72, 153, 0.8)); } 50% { filter: drop-shadow(0 0 20px rgba(236, 72, 153, 1)); } }
      `}</style>
      
      <div className="min-h-screen text-[#1a1612] overflow-x-hidden twcc-scanlines relative bg-[#f4efe4]">
        
        {isOffline && (
          <div className="fixed top-0 left-0 right-0 z-[70] flex items-center justify-center gap-2 py-1 px-4 bg-black/70 backdrop-blur-sm border-b border-white/10">
            <WifiOff className="w-3 h-3 text-white/40" />
            <span className="text-white/40 text-xs font-mono tracking-widest">offline mode</span>
          </div>
        )}

        {/* MOBILE HEADER */}
        {currentPageName !== 'AI51' && currentPageName !== 'Earth51' && currentPageName !== 'BuzzStop' && currentPageName !== 'Platform' && !isTracktPage && !isSortedSubPage && !isSortedPage && currentPageName !== 'Family51' && (
        <header className={`lg:hidden sticky ${isOffline ? 'top-6' : 'top-0'} left-0 right-0 z-[60] bg-[#f4efe4]/95 backdrop-blur-xl border-b border-[#1a1612]/15`}>
          <div className="flex items-center justify-between p-4">
            {(currentPageName.startsWith('Scott') || currentPageName.startsWith('CB51')) ? (
              <a href={createPageUrl("CB51")} className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); window.location.href = createPageUrl("CB51"); setMobileMenuOpen(false); }}>
                <Radio className="w-7 h-7 text-cyan-400" />
                <span className="text-xl font-black text-cyan-400">CB51</span>
              </a>
            ) : isPS51Page ? (
              <a href={createPageUrl("PetSounds51")} className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); window.location.href = createPageUrl("PetSounds51"); setMobileMenuOpen(false); }}>
                <PetSounds51Icon8Bit size={28} animate={false} />
                <span className="text-xl font-black" style={{ color: '#d4a017' }}>PetSounds51</span>
              </a>
            ) : (currentPageName === 'Family51' || currentPageName === 'Sorted' || currentPageName === 'SortedTerms' || currentPageName === 'SortedPrivacy') ? (
              <a href={createPageUrl("Sorted")} className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); window.location.href = createPageUrl("Sorted"); setMobileMenuOpen(false); }}>
                <COOLASFUCKSorted size={28} />
                <span className="text-xl font-black text-amber-600">SORTED</span>
              </a>
            ) : (
              <a href={createPageUrl("Welcome")} className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); window.location.href = createPageUrl("Welcome"); setMobileMenuOpen(false); }}>
                <COOLASFUCKWaves size={28} animate={true} />
                <span className="text-xl font-black text-[#1a1612]">UF51</span>
              </a>
            )}

            <div className="flex items-center gap-1.5">
              {isCB51Page && currentPageName !== 'CB51' ? (
                <Link
                  to={createPageUrl("CB51")}
                  className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-cyan-400" />
                </Link>
              ) : !isCB51Page && canGoBack ? (
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-lg transition-colors"
                  style={isPS51Page ? { color: '#d4a017' } : {}}
                >
                  <ArrowLeft className={`w-5 h-5 ${isPS51Page ? '' : 'text-cyan-400'}`} style={isPS51Page ? { color: '#d4a017' } : {}} />
                </button>
              ) : null}
              {!isCB51Page && !isPS51Page && <CompactMusicPlayer />}
              {!isCB51Page && !isPS51Page && (
                <Link to={createPageUrl("Platform")} className="flex flex-col items-center p-1.5" title="Open APIs">
                  <span className="text-green-400 font-black font-mono text-[11px] leading-none border border-green-400/60 rounded px-1 py-0.5">&lt;/&gt;</span>
                  <span className="text-[9px] font-black font-mono text-green-400 mt-0.5">API</span>
                </Link>
              )}
            {!isCB51Page && !isPS51Page && (
                <Link to={createPageUrl("FrequencyChamber")} className="flex flex-col items-center p-1.5" style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}>
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ overflow: 'visible' }}>
                    <path d="M2 16 L6 16 L8 8 L10 24 L12 12 L14 20 L16 6 L18 26 L20 10 L22 22 L24 14 L26 18 L30 16" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" fill="none" style={{ filter: 'drop-shadow(0 0 6px #ec4899)', strokeDasharray: '200', animation: 'heartbeat-line 2s ease-in-out infinite' }} />
                  </svg>
                  <span className="text-[9px] font-black font-mono text-pink-400 mt-0.5">HEAL</span>
                </Link>
              )}
              {!isCB51Page && !isPS51Page && currentPageName !== 'AI51' && (
                <button
                  onClick={() => navigate(createPageUrl("AI51"))}
                  className="flex flex-col items-center justify-center px-3 py-2 border-2 border-pink-400 rounded-lg bg-black/40 hover:bg-black/60 transition-transform hover:scale-105 active:scale-95"
                >
                  <span className="text-pink-400 font-black font-mono text-sm leading-none">AI</span>
                  <span className="text-pink-400 font-black font-mono text-xs leading-none">51</span>
                </button>
              )}
              {(currentPageName.startsWith('Scott') || currentPageName.startsWith('CB51')) ? (
                <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg hover:bg-cyan-500/20 transition-colors">
                  <Menu className="w-6 h-6 text-cyan-400" />
                </button>
              ) : (
                <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg transition-colors">
                  {isMobileMenuOpen
                    ? <X className="w-6 h-6" style={isPS51Page ? { color: '#d4a017' } : { color: '#22d3ee' }} />
                    : <Menu className="w-6 h-6" style={isPS51Page ? { color: '#d4a017' } : { color: '#22d3ee' }} />
                  }
                </button>
              )}
            </div>
            </div>
            </header>
            )}



        {/* MOBILE MENU */}
                  {isMobileMenuOpen && currentPageName !== 'Platform' && (
                    <div className={`lg:hidden fixed inset-x-0 bottom-0 ${isOffline ? 'top-[90px]' : 'top-[72px]'} bg-[#f4efe4] z-[55] overflow-y-auto pb-6`} style={{ animation: 'sorted-enter 0.24s cubic-bezier(0,0,0.2,1)' }}>
                      <div className="p-3 pt-6 space-y-2 flex flex-col items-stretch">
                          <LanguageButton tone="paper" />
                          {isCB51Page ? (
                            <NavSection title="ARTIST MANAGEMENT" color="cyan" items={cb51Nav} isActivePage={isActivePage} isMobile defaultOpen={true} />
                          ) : isPS51Page ? (
                            <>
                              <NavSection title="PETSOUNDS51" color="cyan" items={ps51Nav} isActivePage={isActivePage} isMobile defaultOpen={true} />
                            </>
                          ) : isTracktPage ? (
                            <NavSection title="TRACKT" color="cyan" items={tracktNav} isActivePage={isActivePage} isMobile defaultOpen={true} />
                          ) : (currentPageName === 'Family51' || currentPageName === 'Sorted') ? (
                            <NavSection title="SORTED" color="cyan" items={sortedNav} isActivePage={isActivePage} isMobile defaultOpen={true} />
                          ) : (
                            <>
                              <NavSection title="PRODUCTS" color="cyan" items={productsNav} isActivePage={isActivePage} isMobile defaultOpen={true} />
                              <NavSection title="FREE HEALING" color="pink" items={healNav} isActivePage={isActivePage} isMobile />
                              <NavSection title="PHOTO51" color="green" items={litterNav} isActivePage={isActivePage} isMobile />
                              <NavSection title="MUSIC & RESEARCH" color="amber" items={musicNav} isActivePage={isActivePage} isMobile />
                              <NavSection title="🌍 LEARN51 — FREE FOR EVERY CHILD" color="cyan" items={kidsNav} isActivePage={isActivePage} isMobile />
                              <NavSection title="LEARN" color="gray" items={learnNav} isActivePage={isActivePage} isMobile />
                                <button
                                  onClick={() => { setSearchOpen(true); setMobileMenuOpen(false); }}
                                  className="w-full flex items-center gap-3 px-4 py-3 border border-white/10 hover:border-cyan-500/40 rounded text-left transition-all"
                                >
                                  <Search className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                  <span className="text-gray-400 text-sm flex-1">Search all pages…</span>
                                  <span className="text-xs text-gray-600 font-mono">⌘K</span>
                                </button>
                                <NavSection title="TRUST" color="gray" items={trustNav} isActivePage={isActivePage} isMobile />
                            </>
                          )}



                                        {user ? (
                <>
                  <div className="h-px bg-white/20 my-3 w-full" />
                    <button onClick={handleSignOut} className="w-full flex items-center gap-3 p-3 border-2 border-[#b3261e]/50 hover:border-[#b3261e] bg-[#efe7d6] text-[#b3261e]">
                    <LogOut className="w-5 h-5" />
                    <span className="font-bold">Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="h-px bg-white/20 my-3 w-full" />
                  <button onClick={() => base44.auth.redirectToLogin(window.location.href)} className="w-full flex items-center gap-3 p-3 border-2 border-[#1a1612]/50 hover:border-[#1a1612] bg-[#efe7d6] text-[#1a1612]">
                    <LogOut className="w-5 h-5" style={{ transform: 'scaleX(-1)' }} />
                    <span className="font-bold">Sign In</span>
                  </button>
                </>
              )}

              {adminNav.length > 0 && (
                    <>
                      <div className="h-px bg-white/10 my-4 w-full" />
                      <NavSection title="BUILD" items={adminNav} isActivePage={isActivePage} isMobile />
                    </>
                  )}

                  {/* MOBILE FOOTER */}
                  <div className="mt-4 pt-4 border-t border-white/10 text-center">
                    <LiveClock />
                    <p className="text-xs text-gray-600 mt-2 pb-4">Built on <a href="https://base44.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400">Base44</a></p>
                  </div>
                  </div>
                  </div>
                  )}

        {/* DESKTOP SIDEBAR */}
        {currentPageName !== 'AI51' && currentPageName !== 'Earth51' && currentPageName !== 'BuzzStop' && currentPageName !== 'Platform' && !isTracktPage && !isSortedSubPage && !isSortedPage && currentPageName !== 'Family51' && (
        <aside className={`hidden lg:block fixed left-0 ${isOffline ? 'top-6' : 'top-0'} w-80 h-screen border-r border-[#1a1612]/15 bg-[#f4efe4]/95 overflow-y-auto z-50`}>
          <div className="p-6 border-b border-[#1a1612]/15">
            <Link to={createPageUrl(isCB51Page ? "CB51" : isPS51Page ? "PetSounds51" : "Welcome")} className="flex items-center gap-3 mb-4">
              {isCB51Page ? (
                <>
                  <Radio className="w-10 h-10 text-cyan-400" />
                  <span className="text-3xl font-black text-cyan-400">CB51</span>
                </>
              ) : isPS51Page ? (
                <>
                  <PetSounds51Icon8Bit size={40} animate={false} />
                  <span className="text-2xl font-black" style={{ color: '#d4a017' }}>PetSounds51</span>
                </>
              ) : (currentPageName === 'Family51' || currentPageName === 'Sorted' || currentPageName === 'SortedTerms' || currentPageName === 'SortedPrivacy') ? (
                <>
                  <COOLASFUCKSorted size={40} />
                  <span className="text-3xl font-black text-amber-600">SORTED</span>
                </>
              ) : (
                <>
                  <COOLASFUCKWaves size={40} animate={true} />
                  <span className="text-3xl font-black text-[#1a1612]">UF51</span>
                </>
              )}
            </Link>
            {canGoBack && (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
              </button>
            )}
            {!isCB51Page && !isPS51Page && (
              <>
                <div className="mb-4"><CompactMusicPlayer /></div>
                <Link
                  to={createPageUrl("Platform")}
                  className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mb-2 text-sm font-black font-mono"
                >
                  <span className="text-xs border border-green-400/60 rounded px-1">&lt;/&gt;</span> Open APIs
                </Link>
              </>
            )}
            <div className="mt-3"><LanguageButton tone="paper" /></div>
          </div>

          <div className="p-6 space-y-3">
            {isCB51Page ? (
              <NavSection title="ARTIST MANAGEMENT" color="cyan" items={cb51Nav} isActivePage={isActivePage} defaultOpen={true} />
            ) : isPS51Page ? (
              <>
                <NavSection title="PETSOUNDS51" color="cyan" items={ps51Nav} isActivePage={isActivePage} defaultOpen={true} />
              </>
            ) : isTracktPage ? (
              <NavSection title="TRACKT" color="cyan" items={tracktNav} isActivePage={isActivePage} defaultOpen={true} />
            ) : (currentPageName === 'Family51' || currentPageName === 'Sorted') ? (
              <NavSection title="SORTED" color="cyan" items={sortedNav} isActivePage={isActivePage} defaultOpen={true} />
            ) : (
              <>
                <NavSection title="PRODUCTS" color="cyan" items={productsNav} isActivePage={isActivePage} defaultOpen={true} />
                <NavSection title="FREE HEALING" color="pink" items={healNav} isActivePage={isActivePage} />
                <NavSection title="PHOTO51" color="green" items={litterNav} isActivePage={isActivePage} />
                <NavSection title="MUSIC & RESEARCH" color="amber" items={musicNav} isActivePage={isActivePage} />
                <NavSection title="🌍 LEARN51 — FREE FOR EVERY CHILD" color="cyan" items={kidsNav} isActivePage={isActivePage} />
                <NavSection title="LEARN" color="gray" items={learnNav} isActivePage={isActivePage} />
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-white/10 hover:border-cyan-500/40 rounded text-left transition-all"
                >
                  <Search className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-gray-400 text-sm flex-1">Search all pages…</span>
                  <span className="text-xs text-gray-600 font-mono">⌘K</span>
                </button>
                <NavSection title="TRUST" color="gray" items={trustNav} isActivePage={isActivePage} />
              </>
            )}



            {adminNav.length > 0 && (
              <>
                <div className="h-px bg-white/10 my-6" />
                <NavSection title="BUILD" items={adminNav} isActivePage={isActivePage} />
              </>
            )}
            
            {user ? (
              <>
                <div className="h-px bg-white/20 my-6" />
                <button onClick={handleSignOut} className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#b3261e]/10 text-[#b3261e]">
                  <LogOut className="w-6 h-6" />
                  <span className="text-lg font-bold">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <div className="h-px bg-white/20 my-6" />
                <button onClick={() => base44.auth.redirectToLogin(window.location.href)} className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#1a1612]/10 text-[#1a1612]">
                  <LogOut className="w-6 h-6" style={{ transform: 'scaleX(-1)' }} />
                  <span className="text-lg font-bold">Sign In</span>
                </button>
              </>
            )}

            {/* MISSION & FOOTER */}
            <div className="mt-8 pt-6 border-t border-white/10">
                              <LiveClock />
                              <p className="text-xs text-gray-600 text-center mt-2">Built on <a href="https://base44.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400">Base44</a></p>
                            </div>
                            </div>
                            </aside>
                            )}

        <main className={`${currentPageName !== 'AI51' && currentPageName !== 'Earth51' && currentPageName !== 'BuzzStop' && currentPageName !== 'Platform' && !isTracktPage && !isSortedSubPage && !isSortedPage && currentPageName !== 'Family51' ? 'lg:ml-80' : ''} ${currentPageName !== 'AI51' && currentPageName !== 'Earth51' && currentPageName !== 'BuzzStop' && currentPageName !== 'Platform' && !isTracktPage && !isSortedSubPage && !isSortedPage && currentPageName !== 'Family51' ? 'lg:pt-6' : ''} min-h-screen w-full`} style={{ willChange: 'contents', maxWidth: '100vw', overflowX: 'hidden' }}>
          {children}
              {currentPageName !== 'AI51' && currentPageName !== 'Earth51' && currentPageName !== 'BuzzStop' && currentPageName !== 'Platform' && !isTracktPage && !isSortedSubPage && !isSortedPage && (
              <footer className="border-t border-[#1a1612]/15 bg-[#efe7d6]/60">
              <LiveClock />
              {/* x = x — the covenant. We are all one. */}
              <p className="text-center py-2 font-mono font-black tracking-[0.3em] text-[10px]" style={{ color: 'rgba(239,231,214,0.25)' }}>
                <Link to="/XEqualsX">x = x</Link>
              </p>
              <p className="text-xs text-center pb-1">
                <Link to="/ExtractionProofCovenant" className="text-green-500/70 hover:text-green-400 font-mono tracking-wide">
                  🔓 Open Source · Extraction-Proof — our covenant
                </Link>
              </p>
              <p className="text-xs text-gray-600 text-center pb-4">Built on <a href="https://base44.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400">Base44</a></p>
            </footer>
          )}
        </main>
      </div>

      {!currentPageName.startsWith('Scott') && !currentPageName.startsWith('Prof') && !currentPageName.startsWith('CB51') && currentPageName !== 'AI51' && (
        <React.Suspense fallback={null}>
          <HealingAnalyticsCollector />
          <PWAInstallPrompt />
          <AI51InstallPrompt />
          <AutoBugMonitor />
          <PerformanceOptimizer />
          <PendingMessageSender />
        </React.Suspense>
        )}

      {currentPageName.startsWith('Scott') && (
        <React.Suspense fallback={null}>
          <CB51OfflineHandler />
          <PWAInstallPrompt manifestUrl="/cb51-manifest.json" />
          <AutoBugMonitor />
        </React.Suspense>
      )}
    {searchOpen && (
      <React.Suspense fallback={null}>
        <GlobalSearch onClose={() => setSearchOpen(false)} />
      </React.Suspense>
    )}
    </GlobalErrorBoundary>
    </COOLASFUCKErrorMonitor>
    </AutoHealingShield>
    );
    };

    export default function Layout(props) {
      return (
        <SiteLanguageProvider>
        <AutoHealingShield>
          <ProfessionalModeProvider>
            <MeshProvider>
              <AnonymousAuthProvider>
                <SyncManagerProvider>
                  <AudioProvider>
                    <AI51MemoryProvider>
                      <SubdomainRouter>
                        <LayoutInner {...props} />
                      </SubdomainRouter>
                    </AI51MemoryProvider>
                  </AudioProvider>
                </SyncManagerProvider>
              </AnonymousAuthProvider>
            </MeshProvider>
          </ProfessionalModeProvider>
        </AutoHealingShield>
        </SiteLanguageProvider>
      );
    }