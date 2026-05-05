import React, { Suspense, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
const RedirectToSorted = () => <Navigate to="/Sorted" replace />;
import SortedLoader from './components/family51/SortedLoader';
import COOLASFUCK8BitLoading from '@/components/shared/COOLASFUCK8BitLoading';
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
const Family51Page = React.lazy(() => import('./pages/Family51'));
const Family51TermsPage = React.lazy(() => import('./pages/Family51Terms'));
const Family51PrivacyPage = React.lazy(() => import('./pages/Family51Privacy'));
const SortedTermsPage = React.lazy(() => import('./pages/SortedTerms'));
const SortedPrivacyPage = React.lazy(() => import('./pages/SortedPrivacy'));
const SortedPressReleasePage = React.lazy(() => import('./pages/SortedPressRelease.jsx'));
const SortedInvestorPressPage = React.lazy(() => import('./pages/SortedInvestorPress'));
const PetSounds51InvestorPressPage = React.lazy(() => import('./pages/PetSounds51InvestorPress'));
const SortedPartnerKitPage = React.lazy(() => import('./pages/SortedPartnerKit'));
const SortedForOrgsPage = React.lazy(() => import('./pages/SortedForOrgs'));
const SortedLayout = React.lazy(() => import('./components/family51/SortedLayout'));
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
const CTRL51Page = React.lazy(() => import('./pages/CTRL51'));
const CTRL51DashboardPage = React.lazy(() => import('./pages/CTRL51Dashboard'));
const CTRL51PricingPage = React.lazy(() => import('./pages/CTRL51Pricing'));
const CTRL51TermsPage = React.lazy(() => import('./pages/CTRL51Terms'));
const CTRL51PrivacyPage = React.lazy(() => import('./pages/CTRL51Privacy'));
const CTRL51CheckoutSuccessPage = React.lazy(() => import('./pages/CTRL51CheckoutSuccess'));
const BrianHughesCVPage = React.lazy(() => import('./pages/BrianHughesCV'));


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
    // Use View Transitions API for instant, native browser transitions
    if (document.startViewTransition) {
      document.startViewTransition();
    }
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 60);
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
      <Suspense fallback={<COOLASFUCK8BitLoading message="LOADING UF51" />}>
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
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
      <Route path="/CorporateBuyer" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="CorporateBuyer"><CorporateBuyerPage /></LayoutWrapper></Suspense>} />
      <Route path="/Draw51" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="Draw51"><Draw51Page /></LayoutWrapper></Suspense>} />
      <Route path="/CheeseAndOnionBake" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><CheeseAndOnionBakePage /></Suspense>} />
      <Route path="/CB51Terms" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><CB51TermsPage /></Suspense>} />
      <Route path="/CB51Privacy" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><CB51PrivacyPage /></Suspense>} />
      <Route path="/Stoneymollan" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="Stoneymollan"><StoneymollanPage /></LayoutWrapper></Suspense>} />
      <Route path="/PetSounds51ResearchOutreach" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="PetSounds51ResearchOutreach"><PetSounds51ResearchOutreach /></LayoutWrapper></Suspense>} />
      <Route path="/PetSounds51" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING PETSOUNDS51" />}><LayoutWrapper currentPageName="PetSounds51"><PetSounds51 /></LayoutWrapper></Suspense>} />
      <Route path="/CB51CalendarView" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="CB51CalendarView"><CB51CalendarView /></LayoutWrapper></Suspense>} />
      <Route path="/CB51MessageInbox" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="CB51MessageInbox"><CB51MessageInbox /></LayoutWrapper></Suspense>} />
      <Route path="/CB51FinanceAdmin" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="CB51FinanceAdmin"><CB51FinanceAdmin /></LayoutWrapper></Suspense>} />
      <Route path="/CB51Todo" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="CB51Todo"><CB51Todo /></LayoutWrapper></Suspense>} />
      <Route path="/ScottFinanceAdmin" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="ScottFinanceAdmin"><ScottFinanceAdmin /></LayoutWrapper></Suspense>} />
      <Route path="/StoneymollanMarketing" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="StoneymollanMarketing"><StoneymollanMarketing /></LayoutWrapper></Suspense>} />
      <Route path="/PetSounds51Landing" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="PetSounds51Landing"><PetSounds51Landing /></LayoutWrapper></Suspense>} />
      <Route path="/AI51SoulDataset" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="AI51SoulDataset"><AI51SoulDataset /></LayoutWrapper></Suspense>} />
      <Route path="/PetSounds51PartnerBrief" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="PetSounds51PartnerBrief"><PetSounds51PartnerBrief /></LayoutWrapper></Suspense>} />
      <Route path="/PetSounds51Whitepaper" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="PetSounds51Whitepaper"><PetSounds51Whitepaper /></LayoutWrapper></Suspense>} />
      <Route path="/PetSounds51Press" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="PetSounds51Press"><PetSounds51Press /></LayoutWrapper></Suspense>} />
      <Route path="/PetSounds51Data" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="PetSounds51Data"><PetSounds51Data /></LayoutWrapper></Suspense>} />
      <Route path="/PetSounds51MarketingAssets" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="PetSounds51MarketingAssets"><PetSounds51MarketingAssets /></LayoutWrapper></Suspense>} />
      <Route path="/Trackt" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="Trackt"><TracktPage /></LayoutWrapper></Suspense>} />
      <Route path="/TracktAbout" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="TracktAbout"><TracktAboutPage /></LayoutWrapper></Suspense>} />
      <Route path="/TracktRoadmap" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="TracktRoadmap"><TracktRoadmapPage /></LayoutWrapper></Suspense>} />
      <Route path="/TracktHowItWorks" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="TracktHowItWorks"><TracktHowItWorksPage /></LayoutWrapper></Suspense>} />
      <Route path="/TracktWhyBuy" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="TracktWhyBuy"><TracktWhyBuyPage /></LayoutWrapper></Suspense>} />
      <Route path="/TracktPricing" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="TracktPricing"><TracktPricingPage /></LayoutWrapper></Suspense>} />
      <Route path="/TracktTerms" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="TracktTerms"><TracktTermsPage /></LayoutWrapper></Suspense>} />
      <Route path="/TracktPrivacy" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="TracktPrivacy"><TracktPrivacyPage /></LayoutWrapper></Suspense>} />
      <Route path="/TracktDashboard" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="TracktDashboard"><TracktDashboardPage /></LayoutWrapper></Suspense>} />
      <Route path="/BuzzStop" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="BuzzStop"><BuzzStopPage /></LayoutWrapper></Suspense>} />
      <Route path="/BuzzTrip" element={<Suspense fallback={<div style={{background:'#000',minHeight:'100vh'}} />}><BuzzTripPage /></Suspense>} />
      <Route path="/BuzzTripAbout" element={<Suspense fallback={<div style={{background:'#000',minHeight:'100vh'}} />}><BuzzTripAboutPage /></Suspense>} />
      <Route path="/BuzzTripTerms" element={<Suspense fallback={<div style={{background:'#000',minHeight:'100vh'}} />}><BuzzTripTermsPage /></Suspense>} />
      <Route path="/BuzzTripPrivacy" element={<Suspense fallback={<div style={{background:'#000',minHeight:'100vh'}} />}><BuzzTripPrivacyPage /></Suspense>} />
      <Route path="/BuzzStopAbout" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="BuzzStop"><BuzzStopAboutPage /></LayoutWrapper></Suspense>} />
      <Route path="/BuzzStopTerms" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="BuzzStop"><BuzzStopTermsPage /></LayoutWrapper></Suspense>} />
      <Route path="/BuzzStopPrivacy" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="BuzzStop"><BuzzStopPrivacyPage /></LayoutWrapper></Suspense>} />
      <Route path="/FreqLift51Whitepaper" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="FreqLift51Whitepaper"><FreqLift51WhitepaperPage /></LayoutWrapper></Suspense>} />
      <Route path="/FreqLift51Lab" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><FreqLift51LabPage /></Suspense>} />
      <Route path="/WristHealingProtocol" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><WristHealingProtocolPage /></Suspense>} />
      <Route path="/WristHealingAbout" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><WristHealingAboutPage /></Suspense>} />
      <Route path="/WristHealingTerms" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><WristHealingTermsPage /></Suspense>} />
      <Route path="/WristHealingPrivacy" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><WristHealingPrivacyPage /></Suspense>} />
      <Route path="/Shed51" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><Shed51Page /></Suspense>} />
      <Route path="/Sorted" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><Family51Page /></Suspense>} />
      <Route path="/Family51" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><RedirectToSorted /></Suspense>} />
      <Route path="/Family51Terms" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><Family51TermsPage /></Suspense>} />
      <Route path="/Family51Privacy" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><Family51PrivacyPage /></Suspense>} />
      <Route path="/SortedTerms" element={<SortedLayout currentPage="SortedTerms"><SortedTermsPage /></SortedLayout>} />
      <Route path="/SortedPrivacy" element={<SortedLayout currentPage="SortedPrivacy"><SortedPrivacyPage /></SortedLayout>} />
      <Route path="/SortedPressRelease" element={<SortedLayout currentPage="SortedPressRelease"><SortedPressReleasePage /></SortedLayout>} />
      <Route path="/SortedInvestorPress" element={<SortedLayout currentPage="SortedInvestorPress"><SortedInvestorPressPage /></SortedLayout>} />
      <Route path="/PetSounds51InvestorPress" element={<SortedLayout currentPage="PetSounds51InvestorPress"><PetSounds51InvestorPressPage /></SortedLayout>} />
      <Route path="/SortedPartnerKit" element={<SortedLayout currentPage="SortedPartnerKit"><SortedPartnerKitPage /></SortedLayout>} />
      <Route path="/SortedForOrgs" element={<SortedLayout currentPage="SortedForOrgs"><SortedForOrgsPage /></SortedLayout>} />
      <Route path="/ST51" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="ST51"><ST51Page /></LayoutWrapper></Suspense>} />
      <Route path="/AdminHMRCTracker" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="AdminHMRCTracker"><AdminHMRCTrackerPage /></LayoutWrapper></Suspense>} />
      <Route path="/AdminLogoUpload" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="AdminLogoUpload"><AdminLogoUploadPage /></LayoutWrapper></Suspense>} />
      <Route path="/AdminStoneymollanLegal" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="AdminStoneymollanLegal"><AdminStoneymollanLegalPage /></LayoutWrapper></Suspense>} />
      <Route path="/AI51Soul" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="AI51Soul"><AI51SoulPage /></LayoutWrapper></Suspense>} />
      <Route path="/AdminPWAPushGuide" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="AdminPWAPushGuide"><AdminPWAPushGuidePage /></LayoutWrapper></Suspense>} />
      {/* ── MAGIC51/LEARN51 — same page, no layout ── */}
      <Route path="/Learn51" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><Magic51Page /></Suspense>} />
      <Route path="/Magic51" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><Magic51Page /></Suspense>} />
      <Route path="/Learn" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><Magic51Page /></Suspense>} />

      {/* ── LEARN51 — own layout, no UF51 nav ── */}
      <Route element={<Learn51Layout />}>
        <Route path="/AskMeAnything" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><AskMeAnythingPage /></Suspense>} />
        <Route path="/Learn51About" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><Learn51AboutPage /></Suspense>} />
        <Route path="/Literacy51" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><Literacy51Page /></Suspense>} />
        <Route path="/LifeSkills51" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LifeSkills51Page /></Suspense>} />
        <Route path="/Learn51Terms" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><Learn51TermsPage /></Suspense>} />
        <Route path="/Learn51Privacy" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><Learn51PrivacyPage /></Suspense>} />
        <Route path="/GeorgieMaths" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><GeorgieMathsPage /></Suspense>} />
        <Route path="/LennoxMaths" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LennoxMathsPage /></Suspense>} />
        <Route path="/ReadingSupport" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><ReadingSupportPage /></Suspense>} />
        <Route path="/YoungWarriors" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><YoungWarriorsPage /></Suspense>} />
        <Route path="/SupportLearn51" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><SupportLearn51Page /></Suspense>} />
      </Route>
      <Route path="/Platform" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="Platform"><PlatformPage /></LayoutWrapper></Suspense>} />
      <Route path="/CTRL51" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING CTRL51" />}><LayoutWrapper currentPageName="CTRL51"><CTRL51Page /></LayoutWrapper></Suspense>} />
      <Route path="/CTRL51Dashboard" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="CTRL51Dashboard"><CTRL51DashboardPage /></LayoutWrapper></Suspense>} />
      <Route path="/CTRL51Pricing" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="CTRL51Pricing"><CTRL51PricingPage /></LayoutWrapper></Suspense>} />
      <Route path="/CTRL51Terms" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><CTRL51TermsPage /></Suspense>} />
      <Route path="/CTRL51Privacy" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><CTRL51PrivacyPage /></Suspense>} />
      <Route path="/CTRL51CheckoutSuccess" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><LayoutWrapper currentPageName="CTRL51CheckoutSuccess"><CTRL51CheckoutSuccessPage /></LayoutWrapper></Suspense>} />
      <Route path="/BrianHughesCV" element={<Suspense fallback={<COOLASFUCK8BitLoading message="LOADING" />}><BrianHughesCVPage /></Suspense>} />
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