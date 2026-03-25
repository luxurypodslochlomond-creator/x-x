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