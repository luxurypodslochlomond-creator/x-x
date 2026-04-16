import React, { Suspense } from 'react';
import COOLASFUCK8BitLoading from '@/components/shared/COOLASFUCK8BitLoading';
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
const ST51Page = React.lazy(() => import('./pages/ST51'));
const AdminHMRCTrackerPage = React.lazy(() => import('./pages/AdminHMRCTracker'));
const AdminLogoUploadPage = React.lazy(() => import('./pages/AdminLogoUpload'));
const AdminStoneymollanLegalPage = React.lazy(() => import('./pages/AdminStoneymollanLegal'));

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, isAuthenticated, navigateToLogin } = useAuth();

  // Handle authentication errors (only hard block for registered-user-required scenarios)
  if (authError?.type === 'user_not_registered') {
    return <UserNotRegisteredError />;
  }

  // Render the main app
  return (
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
      <Route path="/CorporateBuyer" element={<LayoutWrapper currentPageName="CorporateBuyer"><CorporateBuyerPage /></LayoutWrapper>} />
      <Route path="/Draw51" element={<LayoutWrapper currentPageName="Draw51"><Draw51Page /></LayoutWrapper>} />
      <Route path="/CheeseAndOnionBake" element={<CheeseAndOnionBakePage />} />
      <Route path="/CB51Terms" element={<CB51TermsPage />} />
      <Route path="/CB51Privacy" element={<CB51PrivacyPage />} />
      <Route path="/Stoneymollan" element={<LayoutWrapper currentPageName="Stoneymollan"><StoneymollanPage /></LayoutWrapper>} />
      <Route path="/PetSounds51ResearchOutreach" element={<LayoutWrapper currentPageName="PetSounds51ResearchOutreach"><PetSounds51ResearchOutreach /></LayoutWrapper>} />
      <Route path="/PetSounds51" element={<LayoutWrapper currentPageName="PetSounds51"><PetSounds51 /></LayoutWrapper>} />
      <Route path="/CB51CalendarView" element={<LayoutWrapper currentPageName="CB51CalendarView"><CB51CalendarView /></LayoutWrapper>} />
      <Route path="/CB51MessageInbox" element={<LayoutWrapper currentPageName="CB51MessageInbox"><CB51MessageInbox /></LayoutWrapper>} />
      <Route path="/CB51FinanceAdmin" element={<LayoutWrapper currentPageName="CB51FinanceAdmin"><CB51FinanceAdmin /></LayoutWrapper>} />
      <Route path="/CB51Todo" element={<LayoutWrapper currentPageName="CB51Todo"><CB51Todo /></LayoutWrapper>} />
      <Route path="/ScottFinanceAdmin" element={<LayoutWrapper currentPageName="ScottFinanceAdmin"><ScottFinanceAdmin /></LayoutWrapper>} />
      <Route path="/StoneymollanMarketing" element={<LayoutWrapper currentPageName="StoneymollanMarketing"><StoneymollanMarketing /></LayoutWrapper>} />
      <Route path="/PetSounds51Landing" element={<LayoutWrapper currentPageName="PetSounds51Landing"><PetSounds51Landing /></LayoutWrapper>} />
      <Route path="/AI51SoulDataset" element={<LayoutWrapper currentPageName="AI51SoulDataset"><AI51SoulDataset /></LayoutWrapper>} />
      <Route path="/PetSounds51PartnerBrief" element={<LayoutWrapper currentPageName="PetSounds51PartnerBrief"><PetSounds51PartnerBrief /></LayoutWrapper>} />
      <Route path="/PetSounds51Whitepaper" element={<LayoutWrapper currentPageName="PetSounds51Whitepaper"><PetSounds51Whitepaper /></LayoutWrapper>} />
      <Route path="/PetSounds51Press" element={<LayoutWrapper currentPageName="PetSounds51Press"><PetSounds51Press /></LayoutWrapper>} />
      <Route path="/PetSounds51Data" element={<LayoutWrapper currentPageName="PetSounds51Data"><PetSounds51Data /></LayoutWrapper>} />
      <Route path="/PetSounds51MarketingAssets" element={<LayoutWrapper currentPageName="PetSounds51MarketingAssets"><PetSounds51MarketingAssets /></LayoutWrapper>} />
      <Route path="/Trackt" element={<LayoutWrapper currentPageName="Trackt"><TracktPage /></LayoutWrapper>} />
      <Route path="/TracktAbout" element={<LayoutWrapper currentPageName="TracktAbout"><TracktAboutPage /></LayoutWrapper>} />
      <Route path="/TracktRoadmap" element={<LayoutWrapper currentPageName="TracktRoadmap"><TracktRoadmapPage /></LayoutWrapper>} />
      <Route path="/TracktHowItWorks" element={<LayoutWrapper currentPageName="TracktHowItWorks"><TracktHowItWorksPage /></LayoutWrapper>} />
      <Route path="/TracktWhyBuy" element={<LayoutWrapper currentPageName="TracktWhyBuy"><TracktWhyBuyPage /></LayoutWrapper>} />
      <Route path="/TracktPricing" element={<LayoutWrapper currentPageName="TracktPricing"><TracktPricingPage /></LayoutWrapper>} />
      <Route path="/TracktTerms" element={<LayoutWrapper currentPageName="TracktTerms"><TracktTermsPage /></LayoutWrapper>} />
      <Route path="/TracktPrivacy" element={<LayoutWrapper currentPageName="TracktPrivacy"><TracktPrivacyPage /></LayoutWrapper>} />
      <Route path="/TracktDashboard" element={<LayoutWrapper currentPageName="TracktDashboard"><TracktDashboardPage /></LayoutWrapper>} />
      <Route path="/BuzzStop" element={<LayoutWrapper currentPageName="BuzzStop"><BuzzStopPage /></LayoutWrapper>} />
      <Route path="/BuzzStopAbout" element={<LayoutWrapper currentPageName="BuzzStop"><BuzzStopAboutPage /></LayoutWrapper>} />
      <Route path="/BuzzStopTerms" element={<LayoutWrapper currentPageName="BuzzStop"><BuzzStopTermsPage /></LayoutWrapper>} />
      <Route path="/BuzzStopPrivacy" element={<LayoutWrapper currentPageName="BuzzStop"><BuzzStopPrivacyPage /></LayoutWrapper>} />
      <Route path="/FreqLift51Whitepaper" element={<LayoutWrapper currentPageName="FreqLift51Whitepaper"><FreqLift51WhitepaperPage /></LayoutWrapper>} />
      <Route path="/FreqLift51Lab" element={<FreqLift51LabPage />} />
      <Route path="/WristHealingProtocol" element={<WristHealingProtocolPage />} />
      <Route path="/WristHealingAbout" element={<WristHealingAboutPage />} />
      <Route path="/WristHealingTerms" element={<WristHealingTermsPage />} />
      <Route path="/WristHealingPrivacy" element={<WristHealingPrivacyPage />} />
      <Route path="/Shed51" element={<Shed51Page />} />
      <Route path="/Family51" element={<Family51Page />} />
      <Route path="/Sorted" element={<Family51Page />} />
      <Route path="/Family51Terms" element={<Family51TermsPage />} />
      <Route path="/Family51Privacy" element={<Family51PrivacyPage />} />
      <Route path="/SortedTerms" element={<SortedTermsPage />} />
      <Route path="/SortedPrivacy" element={<SortedPrivacyPage />} />
      <Route path="/ST51" element={<LayoutWrapper currentPageName="ST51"><ST51Page /></LayoutWrapper>} />
      <Route path="/AdminHMRCTracker" element={<LayoutWrapper currentPageName="AdminHMRCTracker"><AdminHMRCTrackerPage /></LayoutWrapper>} />
      <Route path="/AdminLogoUpload" element={<LayoutWrapper currentPageName="AdminLogoUpload"><AdminLogoUploadPage /></LayoutWrapper>} />
      <Route path="/AdminStoneymollanLegal" element={<LayoutWrapper currentPageName="AdminStoneymollanLegal"><AdminStoneymollanLegalPage /></LayoutWrapper>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </Suspense>
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