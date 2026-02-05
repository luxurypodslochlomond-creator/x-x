import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, ArrowLeft, Radio, Calendar, DollarSign, CheckCircle, Mail, Eye, FileText, Users, AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react';
import GlobalErrorBoundary from '@/components/shared/GlobalErrorBoundary';
import LiveClock from '@/components/shared/LiveClock';

/**
 * CB51 STANDALONE LAYOUT
 * Completely isolated from UF51
 * Multi-tenant ready (any manager can use)
 * Radio icon + monospace design
 */

const NavSection = ({ title, items, isActivePage, isMobile = false, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full mb-2"
      >
        <div className={`bg-black border-2 border-cyan-500 px-4 py-2 flex items-center justify-between hover:bg-cyan-500/10 transition-all`}>
          <div className="text-cyan-400 font-black font-mono text-sm tracking-wider">
            {title}
          </div>
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-cyan-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-cyan-400" />
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
            className={`flex items-center gap-3 p-4 transition-all w-full border-2 ${
              isActive 
                ? 'bg-cyan-500/20 text-white border-cyan-500' 
                : 'border-white/10 hover:border-white/30 text-white'
            }`}
            style={isActive ? { boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' } : {}}
          >
            <IconComponent className="w-6 h-6 flex-shrink-0" />
            <div className="flex-1">
              <span className="text-sm font-bold block">{item.title}</span>
              {item.description && <span className="text-xs text-cyan-300 block mt-1">{item.description}</span>}
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default function CB51StandaloneLayout({ children, currentPageName }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [canGoBack, setCanGoBack] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Offline detection
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

  // Auth check
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        setAuthError(false);
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        setAuthError(true);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [location.pathname]);

  // Page transition
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCanGoBack(window.history.length > 1);
  }, [location.pathname, currentPageName]);

  // Branding
  useEffect(() => {
    document.title = 'CB51 • AI Co-Manager for Artists';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Professional artist management powered by AI51. Gigs, calendar, band coordination, and finance.';
  }, [currentPageName]);

  const handleSignOut = () => {
    base44.auth.logout();
    navigate(createPageUrl("Welcome"));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
            <Radio className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          </motion.div>
          <p className="text-white font-mono text-xl font-black">CB51 LOADING</p>
        </div>
      </div>
    );
  }

  if (authError && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto animate-pulse" />
          <h1 className="text-3xl font-black text-red-300">Connection required</h1>
          <button onClick={() => window.location.reload()} className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold font-mono">RETRY</button>
        </div>
      </div>
    );
  }

  if (!user && !isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <Radio className="w-16 h-16 text-cyan-400 mx-auto" />
          <h1 className="text-3xl font-black font-mono">CB51</h1>
          <p className="text-gray-300">AI Co-Manager for Artists</p>
          <button 
            onClick={() => base44.auth.redirectToLogin(createPageUrl("CB51"))}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-bold font-mono"
          >
            LOGIN
          </button>
        </div>
      </div>
    );
  }

  // Navigation
  const cb51Nav = [
    { title: "Dashboard", url: createPageUrl("CB51"), icon: Radio, description: "Overview" },
    { title: "Calendar", url: createPageUrl("ScottCalendarView"), icon: Calendar, description: "All shows" },
    { title: "Messages", url: createPageUrl("ScottMessageInbox"), icon: Mail, description: "Inbox" },
    { title: "Finance", url: createPageUrl("ScottFinanceAdmin"), icon: DollarSign, description: "Money tracker" },
    { title: "Tasks", url: createPageUrl("ScottToDo"), icon: CheckCircle, description: "To-do list" },
  ];

  const supportNav = [
    { title: "Privacy", url: createPageUrl("CB51Privacy"), icon: Eye, description: "Data protection" },
    { title: "Terms", url: createPageUrl("CB51Terms"), icon: FileText, description: "Service terms" },
    { title: "Support", url: createPageUrl("CB51Support"), icon: Users, description: "Get help" },
  ];

  const isActivePage = (url) => {
    const navPath = new URL(url, window.location.origin).pathname;
    return location.pathname === navPath;
  };

  return (
    <GlobalErrorBoundary>
      <style>{`
        @media (display-mode: standalone) { body { -webkit-touch-callout: none; -webkit-user-select: none; } }
        @keyframes radio-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
      `}</style>

      <div className="min-h-screen text-white bg-black">
        
        {isOffline && (
          <div className="fixed top-0 left-0 right-0 z-[70] bg-gradient-to-r from-cyan-500/90 to-cyan-700/90 backdrop-blur-sm py-3 px-4">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <p className="text-white font-bold text-sm font-mono">OFFLINE MODE</p>
              </div>
            </div>
          </div>
        )}

        {/* MOBILE HEADER */}
        <header className={`lg:hidden fixed ${isOffline ? 'top-10' : 'top-0'} left-0 right-0 z-[60] bg-black/95 backdrop-blur-xl border-b border-cyan-500/30`}>
          <div className="flex items-center justify-between p-4">
            <Link to={createPageUrl("CB51")} className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <Radio className="w-7 h-7 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-xl font-black text-cyan-400 font-mono">CB51</span>
            </Link>

            <div className="flex items-center gap-2">
              {canGoBack && (
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-cyan-500/10 rounded-lg">
                  <ArrowLeft className="w-5 h-5 text-cyan-400" />
                </button>
              )}
              <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg hover:bg-cyan-500/20">
                {isMobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6 text-cyan-400" />}
              </button>
            </div>
          </div>
        </header>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden fixed inset-0 ${isOffline ? 'top-[122px]' : 'top-[72px]'} bg-black/95 backdrop-blur-xl z-[50] overflow-y-auto pb-6`}>
            <div className="p-3 pt-6 space-y-2">
              <NavSection title="MANAGER" items={cb51Nav} isActivePage={isActivePage} isMobile defaultOpen={true} />
              <NavSection title="SUPPORT" items={supportNav} isActivePage={isActivePage} isMobile />
              
              <div className="h-px bg-white/10 my-3" />
              
              <button onClick={handleSignOut} className="w-full flex items-center gap-3 p-3 border-2 border-red-500/50 hover:border-red-500 text-red-400">
                <LogOut className="w-5 h-5" />
                <span className="font-bold">Sign Out</span>
              </button>

              <div className="mt-4 pt-4 border-t border-white/10 text-center">
                <LiveClock />
              </div>
            </div>
          </div>
        )}

        {/* DESKTOP SIDEBAR */}
        <aside className={`hidden lg:block fixed left-0 ${isOffline ? 'top-10' : 'top-0'} w-80 h-screen border-r border-cyan-500/30 bg-black overflow-y-auto z-50`}>
          <div className="p-6 border-b border-cyan-500/30">
            <Link to={createPageUrl("CB51")} className="flex items-center gap-3 mb-4">
              <Radio className="w-10 h-10 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-3xl font-black text-cyan-400 font-mono">CB51</span>
            </Link>
            {canGoBack && (
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
              </button>
            )}
          </div>

          <div className="p-6 space-y-3">
            <NavSection title="MANAGER" items={cb51Nav} isActivePage={isActivePage} defaultOpen={true} />
            <NavSection title="SUPPORT" items={supportNav} isActivePage={isActivePage} />

            {user && (
              <>
                <div className="h-px bg-white/20 my-6" />
                <button onClick={handleSignOut} className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-900/20 text-red-400">
                  <LogOut className="w-6 h-6" />
                  <span className="text-lg font-bold">Sign Out</span>
                </button>
              </>
            )}

            <div className="mt-8 pt-6 border-t border-white/10">
              <LiveClock />
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className={`lg:ml-80 ${isOffline ? 'pt-[122px] lg:pt-10' : 'pt-[72px] lg:pt-0'} min-h-screen`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>

          <footer className="border-t border-cyan-500/20 bg-black/60 py-4">
            <LiveClock />
          </footer>
        </main>
      </div>
    </GlobalErrorBoundary>
  );
}