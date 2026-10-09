import React, { useState, useEffect, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
const RedirectToSorted = () => <Navigate to="/Sorted" replace />;
import SortedPageTransition from '@/components/shared/SortedPageTransition';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import VisualEditAgent from '@/lib/VisualEditAgent'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
const CorporateBuyerPage = React.lazy(() => import('./pages/CorporateBuyer'));
const Draw51Page = React.lazy(() => import('./pages/Draw51'));
const CheeseAndOnionBakePage = React.lazy(() => import('./pages/CheeseAndOnionBake'));
const CB51TermsPage = React.lazy(() => import('./pages/CB51Terms'));
const CB51PrivacyPage = React.lazy(() => import('./pages/CB51Privacy'));
const StoneymollanPage = React.lazy(() => import('./pages/Stoneymollan'));
const PetSounds51ResearchOutreach = React.lazy(() => import('./pages/PetSounds51ResearchOutreach'));
const PetSounds51 = React.lazy(() => import('./pages/PetSounds51'));
const CB51CalendarView = React.lazy(() => import('./pages/CB51CalendarView'));
const CB51MessageInbox = React.lazy(() => import('./pages/CB51MessageInbox'));
const CB51FinanceAdmin = React.lazy(() => import('./pages/CB51FinanceAdmin'));
const CB51Todo = React.lazy(() => import('./pages/CB51Todo'));
const ScottFinanceAdmin = React.lazy(() => import('./pages/ScottFinanceAdmin'));
const StoneymollanMarketing = React.lazy(() => import('./pages/StoneymollanMarketing'));
const PetSounds51Landing = React.lazy(() => import('./pages/PetSounds51Landing'));
const AI51SoulDataset = React.lazy(() => import('./pages/AI51SoulDataset'));
const PetSounds51PartnerBrief = React.lazy(() => import('./pages/PetSounds51PartnerBrief'));
const PetSounds51Whitepaper = React.lazy(() => import('./pages/PetSounds51Whitepaper'));
const PetSounds51Press = React.lazy(() => import('./pages/PetSounds51Press'));
const PetSounds51Data = React.lazy(() => import('./pages/PetSounds51Data'));
const PetSounds51MarketingAssets = React.lazy(() => import('./pages/PetSounds51MarketingAssets'));
const TracktPage = React.lazy(() => import('./pages/Trackt'));
const TracktAboutPage = React.lazy(() => import('./pages/TracktAbout'));
const TracktRoadmapPage = React.lazy(() => import('./pages/TracktRoadmap'));
const TracktHowItWorksPage = React.lazy(() => import('./pages/TracktHowItWorks'));
const TracktWhyBuyPage = React.lazy(() => import('./pages/TracktWhyBuy'));
const TracktPricingPage = React.lazy(() => import('./pages/TracktPricing'));
const TracktTermsPage = React.lazy(() => import('./pages/TracktTerms'));
const TracktPrivacyPage = React.lazy(() => import('./pages/TracktPrivacy'));
const TracktDashboardPage = React.lazy(() => import('./pages/TracktDashboard'));
const BuzzStopPage = React.lazy(() => import('./pages/BuzzStop'));
const BuzzTripPage = React.lazy(() => import('./pages/BuzzTrip'));
const BuzzTripAboutPage = React.lazy(() => import('./pages/BuzzTripAbout'));
const BuzzTripTermsPage = React.lazy(() => import('./pages/BuzzTripTerms'));
const BuzzTripPrivacyPage = React.lazy(() => import('./pages/BuzzTripPrivacy'));
const BuzzStopAboutPage = React.lazy(() => import('./pages/BuzzStopAbout'));
const BuzzStopTermsPage = React.lazy(() => import('./pages/BuzzStopTerms'));
const BuzzStopPrivacyPage = React.lazy(() => import('./pages/BuzzStopPrivacy'));
const FreqLift51WhitepaperPage = React.lazy(() => import('./pages/FreqLift51Whitepaper'));
const FreqLift51LabPage = React.lazy(() => import('./pages/FreqLift51Lab'));
const WristHealingProtocolPage = React.lazy(() => import('./pages/WristHealingProtocol'));
const WristHealingAboutPage = React.lazy(() => import('./pages/WristHealingAbout'));
const WristHealingTermsPage = React.lazy(() => import('./pages/WristHealingTerms'));
const WristHealingPrivacyPage = React.lazy(() => import('./pages/WristHealingPrivacy'));
const Shed51Page = React.lazy(() => import('./pages/Shed51'));
// Sorted pages - NOT lazy for instant loading
import Family51Page from './pages/Family51';
import SortedHome from './pages/SortedHome';
import SortedTermsPage from './pages/SortedTerms';
import SortedPrivacyPage from './pages/SortedPrivacy';
import SortedFAQPage from './pages/SortedFAQ';
import SortedInvestorPressPage from './pages/SortedInvestorPress';
import PetSounds51InvestorPressPage from './pages/PetSounds51InvestorPress';
import SortedForOrgsPage from './pages/SortedForOrgs';
import SortedLayout from './components/family51/SortedLayout';
import SortedGlobalAccessPage from './pages/SortedGlobalAccess';
import SortedAboutPage from './pages/SortedAbout';
import SortedResearchBriefPage from './pages/SortedResearchBrief';
import SortedReferralShowcasePage from './pages/SortedReferralShowcase';
const ST51Page = React.lazy(() => import('./pages/ST51'));
const AdminHMRCTrackerPage = React.lazy(() => import('./pages/AdminHMRCTracker'));
const AdminLogoUploadPage = React.lazy(() => import('./pages/AdminLogoUpload'));
const AdminStoneymollanLegalPage = React.lazy(() => import('./pages/AdminStoneymollanLegal'));
const AI51SoulPage = React.lazy(() => import('./pages/AI51Soul'));
const AdminPWAPushGuidePage = React.lazy(() => import('./pages/AdminPWAPushGuide'));
const Literacy51Page = React.lazy(() => import('./pages/Literacy51'));
const Learn51Page = React.lazy(() => import('./pages/Learn51'));
const Magic51Page = React.lazy(() => import('./pages/Magic51'));
const AskMeAnythingPage = React.lazy(() => import('./pages/AskMeAnything'));
const LifeSkills51Page = React.lazy(() => import('./pages/LifeSkills51'));
const Learn51AboutPage = React.lazy(() => import('./pages/Learn51About'));
const Learn51TermsPage = React.lazy(() => import('./pages/Learn51Terms'));
const Learn51PrivacyPage = React.lazy(() => import('./pages/Learn51Privacy'));
const Learn51Layout = React.lazy(() => import('./components/learn51/Learn51Layout'));
const GeorgieMathsPage = React.lazy(() => import('./pages/GeorgieMaths'));
const LennoxMathsPage = React.lazy(() => import('./pages/LennoxMaths'));
const ReadingSupportPage = React.lazy(() => import('./pages/ReadingSupport'));
const YoungWarriorsPage = React.lazy(() => import('./pages/YoungWarriors'));
const SupportLearn51Page = React.lazy(() => import('./pages/SupportLearn51'));
const PlatformPage = React.lazy(() => import('./pages/Platform'));

const BrianHughesCVPage = React.lazy(() => import('./pages/BrianHughesCV'));
const AdminSortedOutreachPage = React.lazy(() => import('./pages/AdminSortedOutreach'));
const AdminSortedInfluencersPage = React.lazy(() => import('./pages/AdminSortedInfluencers'));
const AdminNationalParklifePage = React.lazy(() => import('./pages/AdminNationalParklife'));
const CB51VotePage = React.lazy(() => import('./pages/CB51Vote'));
const CB51JoinPage = React.lazy(() => import('./pages/CB51Join'));
const CB51MainPage = React.lazy(() => import('./pages/CB51'));
const CB51HowPage = React.lazy(() => import('./pages/CB51How'));
const WalshyPitchPage = React.lazy(() => import('./pages/WalshyPitch'));
const ZappPage = React.lazy(() => import('./pages/Zapp'));
const ZappAboutPage = React.lazy(() => import('./pages/ZappAbout'));
const ZappTermsPage = React.lazy(() => import('./pages/ZappTerms'));
const ZappPrivacyPage = React.lazy(() => import('./pages/ZappPrivacy'));
const FergusHughesProfilePage = React.lazy(() => import('./pages/FergusHughesProfile'));
const RealityCheckPage = React.lazy(() => import('./pages/RealityCheck'));
const GraemeOnePagerPage = React.lazy(() => import('./pages/GraemeOnePager'));
const PartnerEvidencePage = React.lazy(() => import('./pages/PartnerEvidence'));
const Franklin51Page = React.lazy(() => import('./pages/Franklin51'));
const ExtractionProofCovenantPage = React.lazy(() => import('./pages/ExtractionProofCovenant'));
const UF51OverviewPage = React.lazy(() => import('./pages/UF51Overview'));
const TogetherChangeClimatePage = React.lazy(() => import('./pages/TogetherChangeClimate'));
const ClimateDetailPage = React.lazy(() => import('./pages/ClimateDetail'));
const UF51TokenPage = React.lazy(() => import('./pages/UF51Token'));
const UF51ThreadJournalPage = React.lazy(() => import('./pages/UF51ThreadJournal'));
const ClimateBriefPage = React.lazy(() => import('./pages/ClimateBrief'));
const AdminUF51BudgetPage = React.lazy(() => import('./pages/AdminUF51Budget'));



const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, isAuthenticated, navigateToLogin } = useAuth();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Use View Transitions API for instant, native browser transitions (iOS/Android/Samsung feel)
    if (document.startViewTransition && document.visibilityState !== 'hidden') {
      try {
        document.startViewTransition(() => {
          document.documentElement.style.viewTransitionName = 'page-transition';
        });
      } catch (e) {
        // View transitions can throw if visibility changes mid-transition — safe to ignore
      }
    }
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setTimeout(() => {
        document.documentElement.style.viewTransitionName = '';
      }, 300);
    }, 90); // Longer for smoother Samsung/Android feel
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Handle authentication errors (only hard block for registered-user-required scenarios)
  if (authError?.type === 'user_not_registered') {
    return <UserNotRegisteredError />;
  }

  // Render the main app
  return (
    <>
      <SortedPageTransition isTransitioning={isTransitioning} />
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: '#f4efe4', color: '#1a1612', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.3em' }}>LOADING · x = x</div>}>
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      <Route path="/PetSounds51" element={<PetSounds51 />} />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/BuzzStop" element={<BuzzStopPage />} />
      <Route path="/BuzzStopAbout" element={<BuzzStopAboutPage />} />
      <Route path="/BuzzStopTerms" element={<BuzzStopTermsPage />} />
      <Route path="/BuzzStopPrivacy" element={<BuzzStopPrivacyPage />} />
      <Route path="/BuzzTrip" element={<BuzzTripPage />} />
      <Route path="/BuzzTripAbout" element={<BuzzTripAboutPage />} />
      <Route path="/BuzzTripTerms" element={<BuzzTripTermsPage />} />
      <Route path="/BuzzTripPrivacy" element={<BuzzTripPrivacyPage />} />
      <Route path="/FreqLift51Lab" element={<FreqLift51LabPage />} />
      <Route path="/WristHealingProtocol" element={<WristHealingProtocolPage />} />
      <Route path="/WristHealingAbout" element={<WristHealingAboutPage />} />
      <Route path="/WristHealingTerms" element={<WristHealingTermsPage />} />
      <Route path="/WristHealingPrivacy" element={<WristHealingPrivacyPage />} />
      <Route path="/Shed51" element={<Shed51Page />} />
      <Route path="/Sorted" element={<SortedLayout currentPage="Sorted"><SortedHome /></SortedLayout>} />
      <Route path="/SortedTerms" element={<SortedLayout currentPage="SortedTerms"><SortedTermsPage /></SortedLayout>} />
      <Route path="/SortedPrivacy" element={<SortedLayout currentPage="SortedPrivacy"><SortedPrivacyPage /></SortedLayout>} />
      <Route path="/SortedFAQ" element={<SortedLayout currentPage="SortedFAQ"><SortedFAQPage /></SortedLayout>} />
      <Route path="/SortedInvestorPress" element={<SortedLayout currentPage="SortedInvestorPress"><SortedInvestorPressPage /></SortedLayout>} />
      <Route path="/PetSounds51InvestorPress" element={<SortedLayout currentPage="PetSounds51InvestorPress"><PetSounds51InvestorPressPage /></SortedLayout>} />
      <Route path="/SortedForOrgs" element={<SortedLayout currentPage="SortedForOrgs"><SortedForOrgsPage /></SortedLayout>} />
      <Route path="/SortedGlobalAccess" element={<SortedLayout currentPage="SortedGlobalAccess"><SortedGlobalAccessPage /></SortedLayout>} />
      <Route path="/SortedAbout" element={<SortedLayout currentPage="SortedAbout"><SortedAboutPage /></SortedLayout>} />
      <Route path="/SortedResearchBrief" element={<SortedLayout currentPage="SortedResearchBrief"><SortedResearchBriefPage /></SortedLayout>} />
      <Route path="/SortedReferralShowcase" element={<SortedLayout currentPage="SortedReferralShowcase"><SortedReferralShowcasePage /></SortedLayout>} />
      <Route path="/Family51" element={<RedirectToSorted />} />
      <Route path="/BrianHughesCV" element={<BrianHughesCVPage />} />
      {/* ── MAGIC51/LEARN51 — same page, no layout ── */}
      <Route path="/Learn51" element={<Magic51Page />} />
      <Route path="/Magic51" element={<Magic51Page />} />
      <Route path="/Learn" element={<Magic51Page />} />

      {/* ── LEARN51 — own layout, no UF51 nav ── */}
      <Route element={<Learn51Layout />}>
        <Route path="/AskMeAnything" element={<AskMeAnythingPage />} />
        <Route path="/Learn51About" element={<Learn51AboutPage />} />
        <Route path="/Literacy51" element={<Literacy51Page />} />
        <Route path="/LifeSkills51" element={<LifeSkills51Page />} />
        <Route path="/Learn51Terms" element={<Learn51TermsPage />} />
        <Route path="/Learn51Privacy" element={<Learn51PrivacyPage />} />
        <Route path="/GeorgieMaths" element={<GeorgieMathsPage />} />
        <Route path="/LennoxMaths" element={<LennoxMathsPage />} />
        <Route path="/ReadingSupport" element={<ReadingSupportPage />} />
        <Route path="/YoungWarriors" element={<YoungWarriorsPage />} />
        <Route path="/SupportLearn51" element={<SupportLearn51Page />} />
      </Route>
      <Route path="/Platform" element={<LayoutWrapper currentPageName="Platform"><PlatformPage /></LayoutWrapper>} />

      <Route path="/AdminSortedOutreach" element={<LayoutWrapper currentPageName="AdminSortedOutreach"><AdminSortedOutreachPage /></LayoutWrapper>} />
      <Route path="/AdminSortedInfluencers" element={<LayoutWrapper currentPageName="AdminSortedInfluencers"><AdminSortedInfluencersPage /></LayoutWrapper>} />
      <Route path="/AdminNationalParklife" element={<LayoutWrapper currentPageName="AdminNationalParklife"><AdminNationalParklifePage /></LayoutWrapper>} />
      <Route path="/CB51Vote" element={<CB51VotePage />} />
      <Route path="/CB51Join" element={<CB51JoinPage />} />
      <Route path="/CB51" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: '#f7f5f0' }}><div className="w-8 h-8 rounded-full animate-spin" style={{ border: '2px solid rgba(8,145,178,0.2)', borderTopColor: '#0891b2' }} /></div>}><CB51MainPage /></Suspense>} />
      <Route path="/CB51How" element={<CB51HowPage />} />
      <Route path="/WalshyPitch" element={<WalshyPitchPage />} />
      <Route path="/Zapp" element={<ZappPage />} />
      <Route path="/ZappAbout" element={<ZappAboutPage />} />
      <Route path="/ZappTerms" element={<ZappTermsPage />} />
      <Route path="/ZappPrivacy" element={<ZappPrivacyPage />} />
      <Route path="/FergusHughesProfile" element={<FergusHughesProfilePage />} />
      <Route path="/RealityCheck" element={<RealityCheckPage />} />
      <Route path="/GraemeOnePager" element={<GraemeOnePagerPage />} />
      <Route path="/PartnerEvidence" element={<PartnerEvidencePage />} />
      <Route path="/ExtractionProofCovenant" element={<LayoutWrapper currentPageName="ExtractionProofCovenant"><ExtractionProofCovenantPage /></LayoutWrapper>} />
      <Route path="/UF51Overview" element={<LayoutWrapper currentPageName="UF51Overview"><UF51OverviewPage /></LayoutWrapper>} />
      <Route path="/TogetherChangeClimate" element={<LayoutWrapper currentPageName="TogetherChangeClimate"><TogetherChangeClimatePage /></LayoutWrapper>} />
      <Route path="/ClimatePlatform" element={<LayoutWrapper currentPageName="TogetherChangeClimate"><TogetherChangeClimatePage /></LayoutWrapper>} />
      <Route path="/ClimateDetail/:type/:id" element={<LayoutWrapper currentPageName="TogetherChangeClimate"><ClimateDetailPage /></LayoutWrapper>} />
      <Route path="/UF51Token" element={<LayoutWrapper currentPageName="UF51Token"><UF51TokenPage /></LayoutWrapper>} />
      <Route path="/UF51ThreadJournal" element={<LayoutWrapper currentPageName="UF51ThreadJournal"><UF51ThreadJournalPage /></LayoutWrapper>} />
      <Route path="/Franklin51" element={<LayoutWrapper currentPageName="Franklin51"><Franklin51Page /></LayoutWrapper>} />
      <Route path="/ClimateBrief" element={<LayoutWrapper currentPageName="ClimateBrief"><ClimateBriefPage /></LayoutWrapper>} />
      <Route path="/AdminUF51Budget" element={<LayoutWrapper currentPageName="AdminUF51Budget"><AdminUF51BudgetPage /></LayoutWrapper>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </Suspense>
    </>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
        <VisualEditAgent />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App