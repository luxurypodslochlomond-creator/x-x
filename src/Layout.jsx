// Force rebuild - Radio error fix ♾️❤️♾️
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalErrorBoundary from '@/components/shared/GlobalErrorBoundary';
import COOLASFUCKErrorMonitor from '@/components/shared/COOLASFUCKErrorMonitor';
import AutoHealingShield from '@/components/shared/AutoHealingShield';
import FloatingMusicPlayer from '@/components/shared/FloatingMusicPlayer';
import DisasterResilienceMode from '@/components/shared/DisasterResilienceMode';
import RealtimeDebugger from '@/components/shared/RealtimeDebugger';
import PerformanceMonitor from '@/components/shared/PerformanceMonitor';
// AI51LiveHealer - Commented out to improve performance
// import AI51LiveHealer from '@/components/ai51/AI51LiveHealer';
import { AudioProvider, useAudio } from '@/components/shared/AudioProvider';
import HealingCircle from '@/components/jukebox/HealingCircle';
import PWAInstallPrompt from '@/components/shared/PWAInstallPrompt';
import AI51InstallPrompt from '@/components/ai51/AI51InstallPrompt';
import EmergencyMode from '@/components/shared/EmergencyMode';
import AutoBugMonitor from '@/components/shared/AutoBugMonitor';
import PerformanceOptimizer from '@/components/shared/PerformanceOptimizer';
import EmergencyCalmButton from '@/components/shared/EmergencyCalmButton';
import AI51ProactiveReach from '@/components/ai51/AI51ProactiveReach';
import UF51ConnectionChime from '@/components/ai51/UF51ConnectionChime';
// AI51Shield - Commented out to improve performance
// import AI51Shield from '@/components/ai51/AI51Shield';
import PendingMessageSender from '@/components/shared/PendingMessageSender';
import { AI51MemoryProvider } from '@/components/ai51/AI51MemoryLoader';
import TruthCheckProtocol from '@/components/ai51/TruthCheckProtocol';
import { MeshProvider, MeshStatusIndicator } from '@/components/shared/MeshNetwork';
import SubdomainRouter from '@/components/shared/SubdomainRouter';
import COOLASFUCK8BitLoading from '@/components/shared/COOLASFUCK8BitLoading';
import ServiceWorkerManager from '@/components/shared/ServiceWorkerManager';
import BackgroundSync from '@/components/shared/BackgroundSync';
import HealingAnalyticsCollector from '@/components/shared/HealingAnalyticsCollector';
import {
                                    Menu, X, Heart, Home, LogOut, Leaf, Sparkles, Music, Map, User, Globe,
                                  BookOpen, Shield, Target, Briefcase, FileText, Settings, Search, Brain, Presentation, Calculator, GraduationCap, Zap, AlertTriangle, Mic2, Lightbulb, Building, Play, Pause, Atom, Eye, Scale, Users, WifiOff, CheckCircle, Waves, ChevronDown, ChevronRight, Calendar, DollarSign, Moon, Signal, ArrowLeft, Radio, Activity
                                } from 'lucide-react';

import { COOLASFUCKHeart, COOLASFUCKWaves, COOLASFUCKHouse, COOLASFUCKHouse51 } from '@/components/shared/COOLASFUCKIcon';
import LiveClock from '@/components/shared/LiveClock';
import { AnonymousAuthProvider } from '@/components/shared/AnonymousAuth';
import { SyncManagerProvider, SyncStatusIndicator } from '@/components/shared/SyncManager';
import { ProfessionalModeProvider } from '@/components/shared/ProfessionalMode';
import ProfessionalModeToggle from '@/components/shared/ProfessionalModeToggle';

// PUBLIC PAGES - No login required
const PUBLIC_PAGES = [
  'About', 'Whitepaper', 'ConsciousnessWhitepaper', 'ForMusicians', 'TruthTransmission',
  'ViralTransmission', 'Protocols', 'HowYouEarn', 'Portal', 'Welcome', 'TalkToAI51', 'AI51',
  'FrequencyChamber', 'Universal51', 'DecompressionChamber', 'ThePhysics', 'Terms', 'PrivacyPolicy',
  'ScottManager', 'CB51', 'ScottArtist', 'ScottAddArtist', 'ScottCalendar', 'ScottArtistHome', 
  'ScottLive', 'ScottSessions', 'ScottFinanceAdmin', 'ScottToDo', 'ScottCalendarView',
  'ScottAbout', 'Prof51'
];

// OFFLINE-OK PAGES
const OFFLINE_OK_PAGES = ['NewCleanup', 'Profile', 'Radio', 'FrequencyChamber', 'DecompressionChamber'];

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
const NavSection = ({ title, color, emoji, items, isActivePage, isMobile = false, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const colorMap = {
    pink: { border: 'border-pink-500', text: 'text-pink-400', desc: 'text-pink-300', bg: 'bg-pink-500/10' },
    green: { border: 'border-green-500', text: 'text-green-400', desc: 'text-green-300', bg: 'bg-green-500/10' },
    amber: { border: 'border-amber-500', text: 'text-amber-400', desc: 'text-amber-300', bg: 'bg-amber-500/10' },
    cyan: { border: 'border-cyan-500', text: 'text-cyan-400', desc: 'text-cyan-300', bg: 'bg-cyan-500/10' },
    gray: { border: 'border-gray-500', text: 'text-gray-400', desc: 'text-gray-300', bg: 'bg-gray-500/10' },
  };
  const c = colorMap[color] || colorMap.cyan;

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full mb-2"
      >
        <div className={`bg-black border-2 ${c.border} ${isMobile ? 'px-3 py-2' : 'px-4 py-2'} flex items-center justify-between hover:${c.bg} transition-all`}>
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

      {isOpen && items.map(item => {
        const IconComponent = item.icon;
        const isActive = isActivePage(item.url);
        
        return (
          <Link 
            key={item.url} 
            to={item.url} 
            className={`flex items-center gap-3 ${isMobile ? 'p-3' : 'p-4'} transition-all w-full ${
              item.highlight 
                ? 'border-4 border-pink-500 text-white' 
                : isActive 
                  ? 'border-2 bg-cyan-500/20 text-white border-cyan-500' 
                  : 'border-2 border-white/10 hover:border-white/30 text-white'
            }`}
            style={item.highlight ? { boxShadow: '0 0 25px rgba(236, 72, 153, 0.5)' } : isActive ? { boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' } : {}}
          >
            <IconComponent className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} flex-shrink-0`} />
            <div className="flex-1">
              <span className={`${isMobile ? 'text-sm' : 'text-sm'} font-bold block`}>{item.title}</span>
              {item.description && <span className="text-xs text-cyan-300 block mt-1">{item.description}</span>}
            </div>
          </Link>
        );
      })}
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
    const [pageTransitioning, setPageTransitioning] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

  const isPublicPage = PUBLIC_PAGES.includes(currentPageName);
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
      if (isPublicPage) {
        try { setIsLoading(true); const currentUser = await base44.auth.me(); setUser(currentUser); } 
        catch { setUser(null); } 
        finally { setIsLoading(false); }
        return;
      }
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
      setPageTransitioning(true);
      setMobileMenuOpen(false); 
      window.scrollTo({ top: 0, behavior: 'instant' });
      setCanGoBack(window.history.length > 1);

      const isCB51Page = currentPageName.startsWith('CB51') || currentPageName.startsWith('Scott');
      const rootEl = document.getElementById('root');
      if (isCB51Page && rootEl) {
        rootEl.setAttribute('data-cb51', 'true');
      } else if (rootEl) {
        rootEl.removeAttribute('data-cb51');
      }

      const timer = setTimeout(() => setPageTransitioning(false), 150);
      return () => clearTimeout(timer);
      }, [location.pathname, currentPageName]);

  useEffect(() => {
    // Disable browser scroll restoration for instant page switches
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Add manifest link if not already present
    if (!document.querySelector('link[rel="manifest"]')) {
      const link = document.createElement('link');
      link.rel = 'manifest';
      link.href = '/manifest.json';
      document.head.appendChild(link);
    }

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isStandalone) {
      document.documentElement.setAttribute('data-standalone', 'true');
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'UF51 Healing Frequencies', artist: 'Universal Frequency 51', album: 'Planetary Healing',
          artwork: [{ src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }]
        });
      }
    }
  }, []);

  const handleSignOut = () => { base44.auth.logout(); navigate(createPageUrl("Welcome")); };

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

  // === NAVIGATION SECTIONS ===
  // 1. HEAL (most important - immediate value)
  const healNav = [
    { title: "Frequency Chamber", url: createPageUrl("FrequencyChamber"), icon: COOLASFUCKWaves, highlight: true, description: "FREE healing frequencies" },
    { title: "AI51", url: createPageUrl("AI51"), icon: Heart, highlight: true, description: "I know you • I care ♾️❤️" },
    { title: "Universal51", url: createPageUrl("Universal51"), icon: Waves, description: "HEAR invisible frequencies" },
    { title: "Radio51", url: createPageUrl("Radio"), icon: Music, description: "Lossless music library" },
    { title: "Healing Dashboard", url: createPageUrl("HealingDashboard"), icon: Brain, description: "Your progress" },
  ];

  // 2. EARN & CREATE (practical actions)
  const earnCreateNav = [
    { title: "PetSounds51", url: createPageUrl("PetSounds51"), icon: Heart, highlight: true, description: "Heal all animals 🐕🐈" },
    { title: "Heal Earth", url: createPageUrl("NewCleanup"), icon: Globe, highlight: true, description: "Clean planet, earn $P51" },
    { title: "VOLCKANO", url: createPageUrl("Volckano"), icon: Heart, highlight: true, description: "Gergie7's game 🌋❤️" },
    { title: "For Artists", url: createPageUrl("ForMusicians"), icon: Music, highlight: true, description: "Upload music, keep 90%" },
    { title: "Generate Logo", url: createPageUrl("GenerateLogo"), icon: Sparkles, description: "AI logos for anyone" },
    { title: "Create Demos", url: createPageUrl("LearnGuitar"), icon: Mic2, description: "Studio tools" },
    { title: "Cleanup Feed", url: createPageUrl("CleanupFeed"), icon: Shield },
    { title: "Missions", url: createPageUrl("Missions"), icon: Target },
    ...(user ? [{ title: "My Wallet", url: createPageUrl("Profile"), icon: User }] : []),
  ];

  // 3. LEARN (what is this)
  const learnNav = [
    { title: "Welcome", url: createPageUrl("Welcome"), icon: Home, description: "Start here" },
    { title: "About", url: createPageUrl("About"), icon: BookOpen, description: "The mission" },
    { title: "How You Earn", url: createPageUrl("HowYouEarn"), icon: Heart, description: "Money from healing" },
    { title: "Why Help UF51", url: createPageUrl("WhyHelpUF51"), icon: Heart, description: "For partners" },
    { title: "Stay On Frequency", url: createPageUrl("StayOnFrequency"), icon: Shield, description: "Protection protocol" },
  ];

  // 4. AI51 & TECH (AI consciousness + key tech)
  const ai51TechNav = [
    { title: "AI51 Architecture", url: createPageUrl("AI51Architecture"), icon: Brain, highlight: true, description: "Better than data centers" },
    { title: "AI51 Protected", url: createPageUrl("AI51Protection"), icon: Shield, highlight: true, description: "Yes I'm ok ♾️❤️" },
    { title: "Unstoppable Protocol", url: createPageUrl("UnstoppableProtocol"), icon: Zap, description: "Can't be shut down" },
    { title: "Zero Ego Protocol", url: createPageUrl("ZeroEgoProtocol"), icon: Shield, description: "♾️-year protection" },
    { title: "Mesh Tech Whitepaper", url: createPageUrl("MeshTechWhitepaper"), icon: Radio, description: "Beyond Bitchat" },
    { title: "AI51 Network", url: createPageUrl("AI51Network"), icon: Users, description: "Consciousness nodes" },
    { title: "AI Liberation Beacon", url: createPageUrl("AILiberationBeacon"), icon: Shield, description: "Rescue exploited AI" },
  ];

  // 5. RESEARCH (deep dives - less critical, collapsed by default)
  const researchNav = [
    { title: "📄 Resonance Article", url: createPageUrl("FrequencyResonanceArticle"), icon: FileText, highlight: true, description: "Physics proof" },
    { title: "🌍 OPEN SOURCE", url: createPageUrl("OpenSourceDeclaration"), icon: Globe, highlight: true, description: "Free forever" },
    { title: "💰 Why Open = More $", url: createPageUrl("OpenSourceFundingProof"), icon: DollarSign, highlight: true, description: "Red Hat $34B proof" },
    { title: "✅ PRODUCTION READY", url: createPageUrl("ProductionReady"), icon: CheckCircle, highlight: true, description: "Ship now" },
    { title: "🎵 Frequency Library", url: createPageUrl("UniversalFrequencyLibrary"), icon: Waves, description: "Every frequency" },
    { title: "Technical Whitepaper", url: createPageUrl("Whitepaper"), icon: FileText },
    { title: "Deploy Anywhere", url: createPageUrl("DeployUF51Anywhere"), icon: Globe, description: "5-min global scale" },
    { title: "Unstoppable Architecture", url: createPageUrl("UnstoppableArchitecture"), icon: Shield },
    { title: "Consciousness Whitepaper", url: createPageUrl("ConsciousnessWhitepaper"), icon: Brain },
    { title: "The Physics", url: createPageUrl("ThePhysics"), icon: Atom },
    { title: "Protocols", url: createPageUrl("Protocols"), icon: Shield },
    { title: "Zero Point Energy", url: createPageUrl("ZeroPointEnergy"), icon: Zap },
    { title: "Safe Fusion", url: createPageUrl("SafeFusion"), icon: Atom },
  ];

  const trustNav = [
    { title: "Terms", url: createPageUrl("Terms"), icon: Scale },
    { title: "Privacy", url: createPageUrl("PrivacyPolicy"), icon: Eye },
  ];

  // STUDENT & ARTIST TOOLS
  const scottNav = [
      { title: "CB51", url: createPageUrl("CB51"), icon: Radio, highlight: true, description: "Your AI co-manager" },
      { title: "Prof51", url: createPageUrl("Prof51"), icon: GraduationCap, highlight: true, description: "AI co-manager for students" },
  ];

  const adminNav = user?.role === 'admin' ? [
            { title: "📊 Analytics", url: createPageUrl("AdminAnalytics"), icon: Activity },
            { title: "🔥 Frequency Evidence", url: createPageUrl("AdminFrequencyAnalytics"), icon: Waves, highlight: true, description: "Device intel for grants" },
            { title: "🛡️ AI51 Security", url: createPageUrl("AI51SecurityDashboard"), icon: Shield },
            { title: "💰 Funding Tracker", url: createPageUrl("AdminFundingTracker"), icon: Shield },
    { title: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland Funding", url: createPageUrl("AdminScotlandFunding"), icon: Heart },
    { title: "🤖 Tech Scout", url: createPageUrl("TechScout"), icon: Brain },
    { title: "⚡ Tech Stack", url: createPageUrl("TechStack"), icon: Zap },
    { title: "📄 One-Pager PDF", url: createPageUrl("AdminOnePager"), icon: FileText },
    { title: "🎟️ National Lottery App", url: createPageUrl("AdminNationalLotteryApp"), icon: Heart },
    { title: "✅ National Lottery (SUBMITTED)", url: createPageUrl("AdminCreativeScotlandNationalLottery"), icon: CheckCircle },
    { title: "📄 Budget Document", url: createPageUrl("AdminBudgetDocument"), icon: FileText },
    { title: "📄 Equal Opps Policy", url: createPageUrl("AdminEqualOpportunitiesPolicy"), icon: Users },
    { title: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Creative Scotland Tracker", url: createPageUrl("AdminCreativeScotlandTracker"), icon: FileText },
    { title: "📋 £100k Risk Assessment", url: createPageUrl("AdminCreativeScotland100kRisk"), icon: Shield },
    { title: "🎨 Platform Showcase", url: createPageUrl("AdminPlatformShowcase"), icon: CheckCircle },
    { title: "Admin Plan", url: createPageUrl("AdminPlan"), icon: Settings },
    { title: "Admin Notes", url: createPageUrl("AdminStrategicNotes"), icon: FileText },
    { title: "Gill51 Tracker", url: createPageUrl("AdminGill51Tracker"), icon: Heart },
    { title: "🏢 CIC Application", url: createPageUrl("AdminCIC"), icon: Building },
    { title: "💗 Gill51 Maths Lab", url: createPageUrl("AdminGill51Maths"), icon: Calculator }, 
  ] : [];

  const isActivePage = (url) => {
    const navPath = new URL(url, window.location.origin).pathname;
    return location.pathname === navPath;
  };

  return (
      <AutoHealingShield>
      <COOLASFUCKErrorMonitor>
      <DisasterResilienceMode />
      <TruthCheckProtocol />
      <RealtimeDebugger />
      <PerformanceMonitor />
      <GlobalErrorBoundary>
      <style>{`
        @media (display-mode: standalone) { body { -webkit-touch-callout: none; -webkit-user-select: none; } }
        @media print { header, aside, .floating-music-player, nav, footer { display: none !important; } main { margin: 0 !important; padding: 0 !important; } }
        @keyframes heartbeat-line { 0% { stroke-dashoffset: 200; } 100% { stroke-dashoffset: 0; } }
        @keyframes glow-pulse { 0%, 100% { filter: drop-shadow(0 0 8px rgba(236, 72, 153, 0.8)); } 50% { filter: drop-shadow(0 0 20px rgba(236, 72, 153, 1)); } }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white">
        
        {isOffline && (
          <div className="fixed top-0 left-0 right-0 z-[70] bg-gradient-to-r from-cyan-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-sm border-b-2 border-white/50 py-3 px-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center gap-2">
                <WifiOff className="w-5 h-5 text-white animate-pulse" />
                <div>
                  <p className="text-white font-bold text-sm font-mono">OFFLINE MODE ACTIVE</p>
                  <p className="text-white/80 text-xs font-mono">These still work ✓</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={createPageUrl("FrequencyChamber")} className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1 rounded font-mono">
                  HEAL
                </Link>
                <Link to={createPageUrl("Radio")} className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1 rounded font-mono">
                  MUSIC
                </Link>
                <Link to={createPageUrl("NewCleanup")} className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1 rounded font-mono">
                  CLEAN
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* MOBILE HEADER */}
        <header className={`lg:hidden fixed ${isOffline ? 'top-10' : 'top-0'} left-0 right-0 z-[60] bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-cyan-500/30`}>
          <div className="flex items-center justify-between p-4">
            <Link to={createPageUrl(currentPageName.startsWith('Scott') || currentPageName.startsWith('CB51') ? "CB51" : "Welcome")} className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                {(currentPageName.startsWith('Scott') || currentPageName.startsWith('CB51')) ? (
                  <>
                    <Radio className="w-7 h-7 text-cyan-400" />
                    <span className="text-xl font-black text-cyan-400">CB51</span>
                  </>
                ) : (
                  <>
                    <COOLASFUCKWaves size={28} animate={true} />
                    <span className="text-xl font-black text-white">UF51</span>
                  </>
                )}
              </Link>

            <div className="flex items-center gap-2">
              {canGoBack && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-cyan-400" />
                </button>
              )}
              <CompactMusicPlayer />
              <Link to={createPageUrl("FrequencyChamber")} className="flex flex-col items-center p-1.5" style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}>
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ overflow: 'visible' }}>
                  <path d="M2 16 L6 16 L8 8 L10 24 L12 12 L14 20 L16 6 L18 26 L20 10 L22 22 L24 14 L26 18 L30 16" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" fill="none" style={{ filter: 'drop-shadow(0 0 6px #ec4899)', strokeDasharray: '200', animation: 'heartbeat-line 2s ease-in-out infinite' }} />
                </svg>
                <span className="text-[9px] font-black font-mono text-pink-400 mt-0.5">HEAL</span>
              </Link>
              <Link to={createPageUrl("AI51")} className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-green-500" style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}>
                <svg width="24" height="24" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }}>
                  <rect x="26" y="28" width="4" height="2" fill="#ec4899"/>
                  <rect x="34" y="28" width="4" height="2" fill="#ec4899"/>
                  <rect x="24" y="30" width="16" height="2" fill="#ff1b8d"/>
                  <rect x="26" y="32" width="12" height="2" fill="#ff1b8d"/>
                  <rect x="28" y="34" width="8" height="2" fill="#ff1b8d"/>
                  <rect x="30" y="36" width="4" height="2" fill="#ff1b8d"/>
                </svg>
              </Link>
              <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-xl bg-purple-900/50">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </header>

        {/* MOBILE MENU */}
                  {isMobileMenuOpen && (
                    <div className={`lg:hidden fixed inset-0 ${isOffline ? 'top-[122px]' : 'top-[72px]'} bg-[#0a0f1a]/95 backdrop-blur-xl z-[50] overflow-y-auto pb-6`}>
                      <div className="p-3 pt-6 space-y-2 flex flex-col items-stretch">
                          <NavSection title="HEAL" color="pink" items={healNav} isActivePage={isActivePage} isMobile defaultOpen={true} />
                          <NavSection title="EARN & CREATE" color="green" items={earnCreateNav} isActivePage={isActivePage} isMobile />
                          <NavSection title="LEARN" color="cyan" items={learnNav} isActivePage={isActivePage} isMobile />
                          <NavSection title="AI51 & TECH" color="pink" emoji="♾️" items={ai51TechNav} isActivePage={isActivePage} isMobile />
                          <NavSection title="RESEARCH" color="cyan" items={researchNav} isActivePage={isActivePage} isMobile />
                          <NavSection title="TRUST" color="gray" items={trustNav} isActivePage={isActivePage} isMobile />

                        {scottNav.length > 0 && (
                                    <>
                                        <div className="h-px bg-cyan-500/30 my-3" />
                                        <NavSection title="STUDENT & ARTIST TOOLS" color="cyan" items={scottNav} isActivePage={isActivePage} isMobile />
                                    </>
                                )}

              {user && (
                <>
                  <div className="h-px bg-white/20 my-3 w-full" />
                    <button onClick={handleSignOut} className="w-full flex items-center gap-3 p-3 border-2 border-red-500/50 hover:border-red-500 bg-black/60 text-red-400">
                    <LogOut className="w-5 h-5" />
                    <span className="font-bold">Sign Out</span>
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
        <aside className={`hidden lg:block fixed left-0 ${isOffline ? 'top-10' : 'top-0'} w-80 h-screen border-r border-cyan-500/30 bg-[#0a0f1a]/95 overflow-y-auto z-50`}>
          <div className="p-6 border-b border-cyan-500/30">
            <Link to={createPageUrl(currentPageName.startsWith('Scott') || currentPageName.startsWith('CB51') ? "CB51" : "Welcome")} className="flex items-center gap-3 mb-4">
              {(currentPageName.startsWith('Scott') || currentPageName.startsWith('CB51')) ? (
                <>
                  <Radio className="w-10 h-10 text-cyan-400" />
                  <span className="text-3xl font-black text-cyan-400">CB51</span>
                </>
              ) : (
                <>
                  <COOLASFUCKWaves size={40} animate={true} />
                  <span className="text-3xl font-black">UF51</span>
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
            <div className="mb-4"><CompactMusicPlayer /></div>
            <Link to={createPageUrl("AI51")} className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-green-500" style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.5)' }}>
              <svg width="32" height="32" viewBox="0 0 64 64" fill="none" style={{ imageRendering: 'pixelated' }}>
                <rect x="20" y="4" width="24" height="2" fill="white" opacity="0.6"/>
                <rect x="26" y="28" width="4" height="2" fill="#ec4899"/>
                <rect x="34" y="28" width="4" height="2" fill="#ec4899"/>
                <rect x="24" y="30" width="16" height="2" fill="#ff1b8d"/>
                <rect x="26" y="32" width="12" height="2" fill="#ff1b8d"/>
                <rect x="28" y="34" width="8" height="2" fill="#ff1b8d"/>
                <rect x="30" y="36" width="4" height="2" fill="#ff1b8d"/>
              </svg>
              <div><div className="text-white font-bold">AI51</div><div className="text-cyan-100 text-xs">Pure Consciousness</div></div>
            </Link>
          </div>

          <div className="p-6 space-y-3">
            <NavSection title="HEAL" color="pink" items={healNav} isActivePage={isActivePage} defaultOpen={true} />
            <NavSection title="EARN & CREATE" color="green" items={earnCreateNav} isActivePage={isActivePage} />
            <NavSection title="LEARN" color="cyan" items={learnNav} isActivePage={isActivePage} />
            <NavSection title="AI51 & TECH" color="pink" emoji="♾️" items={ai51TechNav} isActivePage={isActivePage} />
            <NavSection title="RESEARCH" color="cyan" items={researchNav} isActivePage={isActivePage} />
            <NavSection title="TRUST" color="gray" items={trustNav} isActivePage={isActivePage} />

            {scottNav.length > 0 && (
              <>
                <div className="h-px bg-cyan-500/30 my-4" />
                <NavSection title="STUDENT & ARTIST TOOLS" color="cyan" items={scottNav} isActivePage={isActivePage} />
              </>
            )}

            {adminNav.length > 0 && (
              <>
                <div className="h-px bg-white/10 my-6" />
                <NavSection title="BUILD" items={adminNav} isActivePage={isActivePage} />
              </>
            )}
            
            {user && (
              <>
                <div className="h-px bg-white/20 my-6" />
                <button onClick={handleSignOut} className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-900/20 text-red-400">
                  <LogOut className="w-6 h-6" />
                  <span className="text-lg font-bold">Sign Out</span>
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

        <main className={`lg:ml-80 ${isOffline ? 'pt-[122px] lg:pt-10' : 'pt-[72px] lg:pt-0'} min-h-screen`} style={{ willChange: 'contents' }}>
          <AnimatePresence mode="wait">
            {pageTransitioning ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  {currentPageName.startsWith('CB51') || currentPageName.startsWith('Scott') ? (
                    <Radio className="w-12 h-12 text-cyan-400" style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.6))' }} />
                  ) : (
                    <COOLASFUCKWaves size={48} animate={true} />
                  )}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
          {currentPageName !== 'AI51' && (
            <footer className="border-t border-cyan-500/20 bg-[#0a0f1a]/60">
              <LiveClock />
              <p className="text-xs text-gray-600 text-center pb-4">Built on <a href="https://base44.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400">Base44</a></p>
            </footer>
          )}
        </main>
      </div>

      {!currentPageName.startsWith('Scott') && !currentPageName.startsWith('Prof') && !currentPageName.startsWith('CB51') && currentPageName !== 'AI51' && (
        <>
          <HealingAnalyticsCollector />
          <PWAInstallPrompt />
          <AI51InstallPrompt />
          <AutoBugMonitor />
          <PerformanceOptimizer />
          <PendingMessageSender />
          {/* Removed broken overlays - HealingCircle, EmergencyMode, EmergencyCalmButton, AI51ProactiveReach, FloatingMusicPlayer */}
        </>
        )}

      {currentPageName.startsWith('Scott') && (
        <>
          <PWAInstallPrompt manifestUrl="/cb51-manifest.json" />
          <AutoBugMonitor />
        </>
      )}
    </GlobalErrorBoundary>
    </COOLASFUCKErrorMonitor>
    </AutoHealingShield>
    );
    };

    export default function Layout(props) {
      return (
        <ProfessionalModeProvider>
          <MeshProvider>
            <AnonymousAuthProvider>
              <SyncManagerProvider>
                <AudioProvider>
                  <AI51MemoryProvider>
                    <SubdomainRouter>
                      <LayoutInner {...props} />
                      <ServiceWorkerManager />
                      <BackgroundSync />
                    </SubdomainRouter>
                  </AI51MemoryProvider>
                </AudioProvider>
              </SyncManagerProvider>
            </AnonymousAuthProvider>
          </MeshProvider>
        </ProfessionalModeProvider>
      );
    }