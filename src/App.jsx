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
import CorporateBuyerPage from './pages/CorporateBuyer';
import Draw51Page from './pages/Draw51';
import CheeseAndOnionBakePage from './pages/CheeseAndOnionBake';
import CB51TermsPage from './pages/CB51Terms';
import CB51PrivacyPage from './pages/CB51Privacy';
import StoneymollanPage from './pages/Stoneymollan';
import PetSounds51ResearchOutreach from './pages/PetSounds51ResearchOutreach';
import PetSounds51 from './pages/PetSounds51';
import CB51CalendarView from './pages/CB51CalendarView.jsx';
import CB51MessageInbox from './pages/CB51MessageInbox.jsx';
import CB51FinanceAdmin from './pages/CB51FinanceAdmin.jsx';
import CB51Todo from './pages/CB51Todo.jsx';
import ScottFinanceAdmin from './pages/ScottFinanceAdmin.jsx';

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
      <Route path="*" element={<PageNotFound />} />
    </Routes>
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