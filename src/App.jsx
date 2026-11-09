import React, { useState, useEffect, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
const RedirectToSorted = () => <Navigate to="/Sorted" replace />;
import SortedPageTransition from '@/components/shared/SortedPageTransition';
import RoutePrefetcher from '@/components/shared/RoutePrefetcher';
import AdminOnly from '@/components/shared/AdminOnly';
import KeeperKey from '@/components/climate/KeeperKey';
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
// SORTED + the climate shell — fetched on demand instead of riding in the first load.
// The router prefetcher warms them on hover/tap, so opening one feels the same. Nothing removed.
const Family51Page = React.lazy(() => import('./pages/Family51'));
const SortedHome = React.lazy(() => import('./pages/SortedHome'));
const SortedTermsPage = React.lazy(() => import('./pages/SortedTerms'));
const SortedPrivacyPage = React.lazy(() => import('./pages/SortedPrivacy'));
const SortedFAQPage = React.lazy(() => import('./pages/SortedFAQ'));
const SortedInvestorPressPage = React.lazy(() => import('./pages/SortedInvestorPress'));
const PetSounds51InvestorPressPage = React.lazy(() => import('./pages/PetSounds51InvestorPress'));
const SortedForOrgsPage = React.lazy(() => import('./pages/SortedForOrgs'));
const SortedLayout = React.lazy(() => import('./components/family51/SortedLayout'));
const ClimateLayout = React.lazy(() => import('./components/climate/ClimateLayout'));
const SortedGlobalAccessPage = React.lazy(() => import('./pages/SortedGlobalAccess'));
const SortedAboutPage = React.lazy(() => import('./pages/SortedAbout'));
const SortedResearchBriefPage = React.lazy(() => import('./pages/SortedResearchBrief'));
const SortedReferralShowcasePage = React.lazy(() => import('./pages/SortedReferralShowcase'));
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
const AletheiaPage = React.lazy(() => import('./pages/Aletheia'));
const XEqualsXPage = React.lazy(() => import('./pages/XEqualsX'));
const ExtractionProofCovenantPage = React.lazy(() => import('./pages/ExtractionProofCovenant'));
const UF51OverviewPage = React.lazy(() => import('./pages/UF51Overview'));
const TogetherChangeClimatePage = React.lazy(() => import('./pages/TogetherChangeClimate'));
const ClimateDetailPage = React.lazy(() => import('./pages/ClimateDetail'));
const UF51TokenPage = React.lazy(() => import('./pages/UF51Token'));
const UF51ThreadJournalPage = React.lazy(() => import('./pages/UF51ThreadJournal'));
const ClimateBriefPage = React.lazy(() => import('./pages/ClimateBrief'));
const AdminUF51BudgetPage = React.lazy(() => import('./pages/AdminUF51Budget'));
const AdminClimateReviewPage = React.lazy(() => import('./pages/AdminClimateReview'));
const ClimateMapPage = React.lazy(() => import('./pages/ClimateMapPage'));
const AdminClimateCategoriesPage = React.lazy(() => import('./pages/AdminClimateCategories'));
const AdminClimatePhotosPage = React.lazy(() => import('./pages/AdminClimatePhotos'));
const AdminClimateLogPage = React.lazy(() => import('./pages/AdminClimateLog'));
const ClimateCheckingPage = React.lazy(() => import('./pages/ClimateChecking'));
const AdminClimateCheckersPage = React.lazy(() => import('./pages/AdminClimateCheckers'));
const AdminClimateDeskPage = React.lazy(() => import('./pages/AdminClimateDesk'));
const AdminSecureVaultPage = React.lazy(() => import('./pages/AdminSecureVault'));
const AdminSponsorRoutePage = React.lazy(() => import('./pages/AdminSponsorRoute'));
const Uf51RoadPage = React.lazy(() => import('./pages/Uf51Road'));
const ClimateImpactPage = React.lazy(() => import('./pages/ClimateImpact'));
const ClimateTermsPage = React.lazy(() => import('./pages/ClimateTerms'));
const ClimatePrivacyPage = React.lazy(() => import('./pages/ClimatePrivacy'));
const ClimateReachPlacePage = React.lazy(() => import('./pages/ClimateReachPlace'));
const ClimateFounderPage = React.lazy(() => import('./pages/ClimateFounder'));
const ClimateSupportPage = React.lazy(() => import('./pages/ClimateSupport'));
const ClimateWirePage = React.lazy(() => import('./pages/ClimateWire'));
const ClimateMethodPage = React.lazy(() => import('./pages/ClimateMethod'));
const ClimateSearchPage = React.lazy(() => import('./pages/ClimateSearch'));
const ClimateWireEntryPage = React.lazy(() => import('./pages/ClimateWireEntry'));
const ClimateGuidePage = React.lazy(() => import('./pages/ClimateGuide'));
const ClimateMusicPage = React.lazy(() => import('./pages/ClimateMusic'));
const ClimateHostPage = React.lazy(() => import('./pages/ClimateHost'));
const ClimateHandoverPage = React.lazy(() => import('./pages/ClimateHandover'));
const ClimateCorrectionsPage = React.lazy(() => import('./pages/ClimateCorrections'));
const ClimateFellowsPage = React.lazy(() => import('./pages/ClimateFellows'));
const ClimateYaleBriefPage = React.lazy(() => import('./pages/ClimateYaleBrief'));
const ClimateSealsPage = React.lazy(() => import('./pages/ClimateSeals'));
const ClimateKeeperRoomPage = React.lazy(() => import('./pages/ClimateKeeperRoom'));
const ClimateLetterToJaninePage = React.lazy(() => import('./pages/ClimateLetterToJanine'));
// THE STUDIO — its own room, with its own masthead, so ZAPP and the logo room open
// inside a place that still has context around them instead of dropping a child onto a
// page that looks like nothing they were just doing.
const StudioPage = React.lazy(() => import('./pages/Studio'));
const StudioShell = React.lazy(() => import('./components/studio/StudioShell'));
const GenerateLogoPage = React.lazy(() => import('./pages/GenerateLogo'));



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
      <RoutePrefetcher />
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: '#f4efe4', color: '#1a1612', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.3em' }}>LOADING · x = x</div>}>
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      <Route path="/PetSounds51" element={<PetSounds51 />} />
      {/* TRACKT — nine pages were imported here and not one of them had a route, so the
          TRACKT product sitting in the main nav opened the not-found page. Each page
          already wears its own TracktLayout, so nothing is wrapped around them. */}
      <Route path="/Trackt" element={<TracktPage />} />
      <Route path="/TracktAbout" element={<TracktAboutPage />} />
      <Route path="/TracktRoadmap" element={<TracktRoadmapPage />} />
      <Route path="/TracktHowItWorks" element={<TracktHowItWorksPage />} />
      <Route path="/TracktWhyBuy" element={<TracktWhyBuyPage />} />
      <Route path="/TracktPricing" element={<TracktPricingPage />} />
      <Route path="/TracktTerms" element={<TracktTermsPage />} />
      <Route path="/TracktPrivacy" element={<TracktPrivacyPage />} />
      <Route path="/TracktDashboard" element={<TracktDashboardPage />} />
      {/* ── ONE DOOR ON EVERY WORKING SCREEN ──
          The tables behind these screens were already locked by their own rules, so a stranger
          arriving at one of them got an empty, broken-looking page rather than an answer. Now
          every screen whose name begins with Admin is behind the same door the desk already
          uses: a visitor sees "Admins only", a keeper sees the screen. The door decides nothing
          about the data — the permission rules still do — it only stops a working screen from
          ever being someone else's blank page. */}
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              {path.startsWith('Admin') ? (
                <AdminOnly>
                  <Page />
                </AdminOnly>
              ) : (
                <Page />
              )}
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
      {/* The covenant is the record's own page — it wears the record's shell and its nav,
          so a reader arriving from the record's governance line stays in the record. */}
      <Route path="/ExtractionProofCovenant" element={<ClimateLayout currentPage="ExtractionProofCovenant"><ExtractionProofCovenantPage /></ClimateLayout>} />
      {/* One pledge, one address — the old /OpenSourceDeclaration address used to carry a
          separate declaration that disagreed with this one. It now opens this page, so a
          reader (or a reviewer) can never find two versions of the same promise. */}
      <Route path="/OpenSourceDeclaration" element={<ClimateLayout currentPage="ExtractionProofCovenant"><ExtractionProofCovenantPage /></ClimateLayout>} />
      <Route path="/UF51Overview" element={<LayoutWrapper currentPageName="UF51Overview"><UF51OverviewPage /></LayoutWrapper>} />
      <Route path="/TogetherChangeClimate" element={<ClimateLayout currentPage="TogetherChangeClimate"><TogetherChangeClimatePage /></ClimateLayout>} />
      <Route path="/ClimatePlatform" element={<ClimateLayout currentPage="TogetherChangeClimate"><TogetherChangeClimatePage /></ClimateLayout>} />
      <Route path="/ClimateDetail/:type/:id" element={<ClimateLayout currentPage="TogetherChangeClimate"><ClimateDetailPage /></ClimateLayout>} />
      <Route path="/ClimateWire" element={<ClimateLayout currentPage="ClimateWire"><ClimateWirePage /></ClimateLayout>} />
      <Route path="/ClimateMethod" element={<ClimateLayout currentPage="ClimateMethod"><ClimateMethodPage /></ClimateLayout>} />
      <Route path="/ClimateSearch" element={<ClimateLayout currentPage="ClimateSearch"><ClimateSearchPage /></ClimateLayout>} />
      <Route path="/ClimateWireEntry/:id" element={<ClimateLayout currentPage="ClimateWire"><ClimateWireEntryPage /></ClimateLayout>} />
      <Route path="/ClimateGuide" element={<ClimateLayout currentPage="ClimateGuide"><ClimateGuidePage /></ClimateLayout>} />
      <Route path="/ClimateMusic" element={<ClimateLayout currentPage="ClimateMusic"><ClimateMusicPage /></ClimateLayout>} />
      <Route path="/ClimateHost" element={<ClimateLayout currentPage="ClimateHost"><ClimateHostPage /></ClimateLayout>} />
      <Route path="/ClimateHandover" element={<ClimateLayout currentPage="ClimateHandover"><ClimateHandoverPage /></ClimateLayout>} />
      <Route path="/ClimateCorrections" element={<ClimateLayout currentPage="ClimateCorrections"><ClimateCorrectionsPage /></ClimateLayout>} />
      {/* The seal: every entry fingerprinted, and the check run in the reader's own
          browser rather than on our server. The one page that lets a sceptic verify
          the record without trusting anybody who built it. */}
      <Route path="/ClimateSeals" element={<ClimateLayout currentPage="ClimateSeals"><ClimateSealsPage /></ClimateLayout>} />
      {/* The keeper's own room: where the founder says yes or not yet. Deliberately NOT
          behind the app's admin door — the record checks her against its own guest list on
          the server, so she holds the record's keys and none of the building's. */}
      <Route path="/ClimateKeeperRoom" element={<ClimateLayout currentPage="ClimateKeeperRoom"><ClimateKeeperRoomPage /></ClimateLayout>} />
      <Route path="/ClimateFellows" element={<ClimateLayout currentPage="ClimateFellows"><ClimateFellowsPage /></ClimateLayout>} />
      {/* A letter is one person writing to another, so it is not printed on the brief and
          not linked from the record. It opens only to a keeper's key. */}
      <Route path="/ClimateLetterToJanine" element={<ClimateLayout currentPage="ClimateLetterToJanine"><ClimateLetterToJaninePage /></ClimateLayout>} />
      {/* ── THE STUDIO — the record's own workshop ──
          These three addresses are one room, and the room is inside the record: the record's
          masthead, nav and foot stay above and below it, so a child who taps Studio from the
          nav has not left the book, and one who then taps ZAPP still knows where they are.
          Both tools already work without an account, so nothing here needs a gate. */}
      <Route path="/Studio" element={<ClimateLayout currentPage="Studio"><StudioShell><StudioPage /></StudioShell></ClimateLayout>} />
      <Route path="/Studio/Zapp" element={<ClimateLayout currentPage="Studio"><StudioShell><ZappPage /></StudioShell></ClimateLayout>} />
      <Route path="/Studio/Logo" element={<ClimateLayout currentPage="Studio"><StudioShell><GenerateLogoPage /></StudioShell></ClimateLayout>} />
      {/* The brief a host reads before it agrees to carry anything, and the letter the
          founder signs. Not in the navigation: it is written for one conversation, and
          reached from the page that answers her questions.

          It is behind the keeper's key now, and it was on an open address before. A letter
          addressed to a named institution, which says out loud what the record has not got
          and leaves the signature to be added by hand, is a document for one correspondent
          and not a page for the world: anybody could find it, quote it back at Yale before
          Yale had read it, or read the gaps as a public confession rather than as the
          honesty that makes the rest of it believable. She still hands it over herself —
          the page prints and copies — so nothing has been taken away from her; it simply is
          not standing open in the street while she writes her introduction. */}
      <Route path="/ClimateYaleBrief" element={<ClimateLayout currentPage="ClimateYaleBrief"><KeeperKey><ClimateYaleBriefPage /></KeeperKey></ClimateLayout>} />
      <Route path="/UF51Token" element={<LayoutWrapper currentPageName="UF51Token"><UF51TokenPage /></LayoutWrapper>} />
      <Route path="/UF51ThreadJournal" element={<LayoutWrapper currentPageName="UF51ThreadJournal"><UF51ThreadJournalPage /></LayoutWrapper>} />
      <Route path="/Franklin51" element={<LayoutWrapper currentPageName="Franklin51"><Franklin51Page /></LayoutWrapper>} />
      <Route path="/Aletheia" element={<AletheiaPage />} />
      <Route path="/XEqualsX" element={<ClimateLayout currentPage="XEqualsX"><XEqualsXPage /></ClimateLayout>} />
      <Route path="/ClimateBrief" element={<ClimateLayout currentPage="ClimateBrief"><ClimateBriefPage /></ClimateLayout>} />
      <Route path="/AdminUF51Budget" element={<LayoutWrapper currentPageName="AdminUF51Budget"><AdminOnly><AdminUF51BudgetPage /></AdminOnly></LayoutWrapper>} />
      <Route path="/AdminClimateReview" element={<ClimateLayout currentPage="AdminClimateReview"><AdminOnly><AdminClimateReviewPage /></AdminOnly></ClimateLayout>} />
      <Route path="/ClimateMap" element={<ClimateLayout currentPage="ClimateMap"><ClimateMapPage /></ClimateLayout>} />
      {/* The record's own working pages wear the record's shell. These three were built
          before the record had a shell and were still mounted inside UF51's, so a keeper
          walking from the desk into the log, the categories or the crawl left the record
          and landed in a different product's sidebar. Same gate, same pages, right home. */}
      <Route path="/AdminClimateCategories" element={<ClimateLayout currentPage="AdminClimateCategories"><AdminOnly><AdminClimateCategoriesPage /></AdminOnly></ClimateLayout>} />
      <Route path="/AdminClimatePhotos" element={<ClimateLayout currentPage="AdminClimatePhotos"><AdminOnly><AdminClimatePhotosPage /></AdminOnly></ClimateLayout>} />
      <Route path="/AdminClimateLog" element={<ClimateLayout currentPage="AdminClimateLog"><AdminOnly><AdminClimateLogPage /></AdminOnly></ClimateLayout>} />
      <Route path="/ClimateChecking" element={<Navigate to="/ClimateKeeperRoom?tab=check" replace />} />
      {/* The guest list is the record's own, so it opens to the record's own keys. Behind the
          app's admin door, the second keeper who has to agree to every access change could
          never reach the page that asks them — and a two-key rule nobody can turn is a lock. */}
      <Route path="/AdminClimateCheckers" element={<ClimateLayout currentPage="AdminClimateCheckers"><KeeperKey><AdminClimateCheckersPage /></KeeperKey></ClimateLayout>} />
      {/* The desk is the record's own desk, so it opens to the record's own keys. Behind the
          building's admin door, a keeper invited to hold them was stopped on the one page built
          for her and told "Admins only". KeeperKey asks the record instead. */}
      {/* The desk was sent to ?tab=desk, and the shed's rooms are decide, check, people,
          counts and sourcing — so "desk" matched nothing, the room fell back to the first
          door, and the counts page could not be reached from its own address at all. The
          desk is the counts room; it now lands on it. */}
      <Route path="/AdminClimateDesk" element={<Navigate to="/ClimateKeeperRoom?tab=counts" replace />} />
      <Route path="/AdminSecureVault" element={<LayoutWrapper currentPageName="AdminSecureVault"><AdminOnly><AdminSecureVaultPage /></AdminOnly></LayoutWrapper>} />
      <Route path="/AdminSponsorRoute" element={<LayoutWrapper currentPageName="AdminSponsorRoute"><AdminOnly><AdminSponsorRoutePage /></AdminOnly></LayoutWrapper>} />
      <Route path="/Uf51Road" element={<LayoutWrapper currentPageName="Uf51Road"><AdminOnly><Uf51RoadPage /></AdminOnly></LayoutWrapper>} />
      <Route path="/ClimateImpact" element={<ClimateLayout currentPage="ClimateImpact"><ClimateImpactPage /></ClimateLayout>} />
      <Route path="/ClimateTerms" element={<ClimateLayout currentPage="ClimateTerms"><ClimateTermsPage /></ClimateLayout>} />
      <Route path="/ClimatePrivacy" element={<ClimateLayout currentPage="ClimatePrivacy"><ClimatePrivacyPage /></ClimateLayout>} />
      <Route path="/ClimateReachPlace/:placeType/:place" element={<ClimateLayout currentPage="ClimateImpact"><ClimateReachPlacePage /></ClimateLayout>} />
      <Route path="/ClimateFounder" element={<ClimateLayout currentPage="ClimateFounder"><ClimateFounderPage /></ClimateLayout>} />
      <Route path="/ClimateSupport" element={<ClimateLayout currentPage="ClimateSupport"><ClimateSupportPage /></ClimateLayout>} />
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