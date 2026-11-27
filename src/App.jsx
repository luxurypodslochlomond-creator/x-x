import React, { useState, useEffect, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
const RedirectToSorted = () => <Navigate to="/Sorted" replace />;
// ── THE ROOM'S OWN ADDRESS ────────────────────────────────────────────────────
// recordWords.js settled the reader's words on 17 November: custodian and witness, with the
// reasoning kept there. The one place the retired word still met a person was the address bar
// — a custodian sitting in her own room with /ClimateKeeperRoom over her head — and the
// invitation card, which prints the address at the foot of the picture.
//
// So the room lives at /CustodianRoom, and the old address keeps working, query and all,
// because it is printed on cards already handed out and sits in bookmarks made before the
// word changed. A link that stops working is a worse fault than a link with an old word in it.
// Everything underneath — the page, the function, the field names — stays as it is: a
// migration is a day of risk for a word no reader sees.
const RoomAtItsRightAddress = () => (
  <Navigate to={`/CustodianRoom${typeof window === 'undefined' ? '' : window.location.search}`} replace />
);
import SortedPageTransition from '@/components/shared/SortedPageTransition';
import RoutePrefetcher from '@/components/shared/RoutePrefetcher';
import AdminOnly from '@/components/shared/AdminOnly';
import KeeperKey from '@/components/climate/KeeperKey';
import RecordSectionRedirect from '@/components/climate/RecordSectionRedirect';
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
// ── CTRL51 — A PRODUCT ON THE FRONT PAGE WITH NO DOOR ────────────────────────
// The Welcome page has offered CTRL51 since it was written, and all six of its screens
// have been sitting in the app with no route at all: a tap on the product opened the
// not-found page. They wear their own CTRL51 header, like PetSounds51 and TRACKT, so
// they are mounted without the UF51 sidebar around them.
const CTRL51Page = React.lazy(() => import('./pages/CTRL51'));
const CTRL51PricingPage = React.lazy(() => import('./pages/CTRL51Pricing'));
const CTRL51DashboardPage = React.lazy(() => import('./pages/CTRL51Dashboard'));
const CTRL51TermsPage = React.lazy(() => import('./pages/CTRL51Terms'));
const CTRL51PrivacyPage = React.lazy(() => import('./pages/CTRL51Privacy'));
const CTRL51CheckoutSuccessPage = React.lazy(() => import('./pages/CTRL51CheckoutSuccess'));
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
// The reply to Barry Harper, written out of the saved file rather than from memory: the
// road already carrying works that did not use it, and the mains pipe his response never
// mentions. Its own address so it can be read on a phone and copied in one tap.
// The reply to Barry Harper. Named without "Admin" on purpose: the file name decides whether
// the pages loop wraps a screen in the admin door, and this one must open for the person
// sending it without a sign-in. It also wears no layout, so on a phone it is the letter and
// the copy button and nothing else.
const StoneymollanReplyPage = React.lazy(() => import('./pages/StoneymollanReply'));
// The three escalation letters — head office, council, Scottish Water — on their own open
// address, because they get sent from a phone at a kitchen table and not from a desk.
const StoneymollanEscalationPage = React.lazy(() => import('./pages/StoneymollanEscalation'));
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
// Fergus's note to the Higgsfield creator programme. Its own address, no layout, so on a
// phone it is the note and the copy button — the same shape as the reply to Barry.
const FergusHiggsfieldPage = React.lazy(() => import('./pages/FergusHiggsfield'));
// The 60-second film Higgsfield asked for: shot by shot, and how to send the link.
const FergusHiggsfieldVideoPage = React.lazy(() => import('./pages/FergusHiggsfieldVideo'));
// Fergus's own room, behind a code checked on the server. Not linked from the site:
// he is given the address and the code, and the notes stay behind it.
const FergusRoomPage = React.lazy(() => import('./pages/FergusRoom'));
// The card he can screenshot and send: one name, four facts, one line.
const FergusCardPage = React.lazy(() => import('./pages/FergusCard'));
const RealityCheckPage = React.lazy(() => import('./pages/RealityCheck'));
const GraemeOnePagerPage = React.lazy(() => import('./pages/GraemeOnePager'));
const PartnerEvidencePage = React.lazy(() => import('./pages/PartnerEvidence'));
const Franklin51Page = React.lazy(() => import('./pages/Franklin51'));
const AletheiaPage = React.lazy(() => import('./pages/Aletheia'));
const XEqualsXPage = React.lazy(() => import('./pages/XEqualsX'));
const XEqualsXNotesPage = React.lazy(() => import('./pages/XEqualsXNotes'));
const ExtractionProofCovenantPage = React.lazy(() => import('./pages/ExtractionProofCovenant'));
const UF51OverviewPage = React.lazy(() => import('./pages/UF51Overview'));
const TogetherChangeClimatePage = React.lazy(() => import('./pages/TogetherChangeClimate'));
const ClimateDetailPage = React.lazy(() => import('./pages/ClimateDetail'));
// A solution, crisis or action's own name as its address: /e/mangrove-restoration-bonaire
const ClimateEntryShortPage = React.lazy(() => import('./pages/ClimateEntryShort'));
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
const ClimateTermsPage = React.lazy(() => import('./pages/ClimateTerms'));
const ClimatePrivacyPage = React.lazy(() => import('./pages/ClimatePrivacy'));
const ClimateReachPlacePage = React.lazy(() => import('./pages/ClimateReachPlace'));
const ClimateFounderPage = React.lazy(() => import('./pages/ClimateFounder'));
const ClimateSupportPage = React.lazy(() => import('./pages/ClimateSupport'));
const ClimateWirePage = React.lazy(() => import('./pages/ClimateWire'));
const ClimateMethodPage = React.lazy(() => import('./pages/ClimateMethod'));
const ClimateSearchPage = React.lazy(() => import('./pages/ClimateSearch'));
const ClimateWireEntryPage = React.lazy(() => import('./pages/ClimateWireEntry'));
// One wire entry's own name as its address: /wire/antarctic-ozone-hole-closes
const ClimateWireShortPage = React.lazy(() => import('./pages/ClimateWireShort'));
const ClimateGuidePage = React.lazy(() => import('./pages/ClimateGuide'));
const ClimateMusicPage = React.lazy(() => import('./pages/ClimateMusic'));
const ClimateCartoonsPage = React.lazy(() => import('./pages/ClimateCartoons'));
const ClimateCartoonSheetPage = React.lazy(() => import('./pages/ClimateCartoonSheet'));
// The short door to one drawing: /w/rain-check, a name a person can say out loud.
const ClimateCartoonShortPage = React.lazy(() => import('./pages/ClimateCartoonShort'));
const ClimateCartoonArtistPage = React.lazy(() => import('./pages/ClimateCartoonArtist'));
// One hand's own address — Francis Umendu Odupute, who started the biennial, drew its cover
// and edits its book, and whose new work needs somewhere on the record to show the world.
const ClimateCartoonFrancisPage = React.lazy(() => import('./pages/ClimateCartoonFrancis'));
// The answer to "what is this?", written for a cartoonist deciding whether to trust the
// place with his work. Its own address, because a question asked in a chat deserves an
// answer that is still there when the chat is gone.
const ClimateCartoonsWhatThisIsPage = React.lazy(() => import('./pages/ClimateCartoonsWhatThisIs'));
// The line between CAIB and this record, drawn in public after Francis asked where it was.
const ClimateCartoonsCAIBPage = React.lazy(() => import('./pages/ClimateCartoonsCAIB'));
// The machine's own hand: one more hand in the same room, hung beside the wall of real ones.
const ClimateCartoonsBaseOnePage = React.lazy(() => import('./pages/ClimateCartoonsBaseOne'));
const ClimateCartoonPrintPage = React.lazy(() => import('./pages/ClimateCartoonPrint'));
// The words to carry the room out of the chat, written for the five places a person posts.
const ClimateCartoonsSharePage = React.lazy(() => import('./pages/ClimateCartoonsShare'));
const ClimateCartoonsThreadPage = React.lazy(() => import('./pages/ClimateCartoonsThread'));
// The presenter's sheet for the 29th: the same drawings, in the order the hour runs them.
const ClimateCartoonPresentPage = React.lazy(() => import('./pages/ClimateCartoonPresent'));
const ClimateCartoonExhibitionPage = React.lazy(() => import('./pages/ClimateCartoonExhibition'));
const ClimateWorkshopPage = React.lazy(() => import('./pages/ClimateWorkshop'));
// Six questions CEEW asked in writing, answered in writing, in her order — so the
// five-minute call is for the things a page cannot settle.
const ClimateWorkshopAnswersPage = React.lazy(() => import('./pages/ClimateWorkshopAnswers'));
const ClimateWorkshopWordsPage = React.lazy(() => import('./pages/ClimateWorkshopWords'));
const ClimateHostPage = React.lazy(() => import('./pages/ClimateHost'));
const ClimateHandoverPage = React.lazy(() => import('./pages/ClimateHandover'));
const ClimateFellowsPage = React.lazy(() => import('./pages/ClimateFellows'));
const ClimateRollPage = React.lazy(() => import('./pages/ClimateRoll'));
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
const Learn51AIPage = React.lazy(() => import('./pages/Learn51AI'));
// The record's mark, drawn in the browser at full size so it can be saved and uploaded
// as the app's logo and as the picture a shared link shows.
const BrandMarkPage = React.lazy(() => import('./pages/BrandMark'));



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
    // Do not rasterise the record's long pages, fine navigation and fixed artwork
    // into a whole-page transition bitmap. Render the actual text and image instead.
    const isRecordPage = /^\/(?:Climate[^/]*|AdminClimate[^/]*|TogetherChangeClimate|XEqualsX(?:Notes)?|ExtractionProofCovenant|OpenSourceDeclaration|Studio)(?:\/|$)/.test(location.pathname);
    if (isRecordPage) {
      document.documentElement.style.viewTransitionName = '';
      setIsTransitioning(false);
      return;
    }
    // Other products retain their existing transitions.
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
      {/* ── CTRL51 — THE PRODUCT THE FRONT PAGE ALREADY OFFERS ──
          Every one of these screens was built and linked from Welcome, and none of them
          had a door: the one product on the front page that opened onto nothing. */}
      <Route path="/CTRL51" element={<CTRL51Page />} />
      <Route path="/CTRL51Pricing" element={<CTRL51PricingPage />} />
      <Route path="/CTRL51Dashboard" element={<CTRL51DashboardPage />} />
      <Route path="/CTRL51Terms" element={<CTRL51TermsPage />} />
      <Route path="/CTRL51Privacy" element={<CTRL51PrivacyPage />} />
      <Route path="/CTRL51CheckoutSuccess" element={<CTRL51CheckoutSuccessPage />} />
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
      {/* ── STONEYMOLLAN ──
          The page has been sitting in the nav and imported in this file since it was
          built, with no route anywhere: every tap on it fell through to the not-found
          page, which is why the nav looked like a door onto nothing. Same wrapper the
          rest of UF51's pages wear, so it opens inside the site and not beside it. */}
      <Route path="/Stoneymollan" element={<LayoutWrapper currentPageName="Stoneymollan"><StoneymollanPage /></LayoutWrapper>} />
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
      <Route path="/FergusHiggsfield" element={<FergusHiggsfieldPage />} />
      <Route path="/FergusHiggsfieldVideo" element={<FergusHiggsfieldVideoPage />} />
      <Route path="/FergusRoom" element={<FergusRoomPage />} />
      <Route path="/FergusCard" element={<FergusCardPage />} />
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
      {/* ── AN ENTRY'S OWN NAME, AS AN ADDRESS ──
          A solution, a crisis or an action was only reachable at
          /ClimateDetail/solution/6afde227… — the same fault the drawings had. Each now also
          answers to its own title: /e/<name>. The long address keeps working, and the card
          and the citation print the short one, because those are what get passed on.
          Where two entries honestly share a name, the address shows both and the reader
          chooses: the record never opens the wrong thing under the right name. */}
      <Route path="/e/:slug" element={<ClimateLayout currentPage="TogetherChangeClimate"><ClimateEntryShortPage /></ClimateLayout>} />
      <Route path="/ClimateWire" element={<ClimateLayout currentPage="ClimateWire"><ClimateWirePage /></ClimateLayout>} />
      <Route path="/ClimateMethod" element={<ClimateLayout currentPage="ClimateMethod"><ClimateMethodPage /></ClimateLayout>} />
      <Route path="/ClimateSearch" element={<ClimateLayout currentPage="ClimateSearch"><ClimateSearchPage /></ClimateLayout>} />
      <Route path="/ClimateWireEntry/:id" element={<ClimateLayout currentPage="ClimateWire"><ClimateWireEntryPage /></ClimateLayout>} />
      {/* ── AN ENTRY'S OWN NAME, AS AN ADDRESS ──
          Brian, 27 November: the drawings got short names, so "is it the same for the wire?"
          It was. An entry was only reachable at /ClimateWireEntry/6afde227…, which is not a
          thing anyone sends. It now also answers to its own headline: /wire/<name>. The long
          address keeps working, and the card, the picture and the citation all print the
          short one, because the card is what actually gets passed on. */}
      <Route path="/wire/:slug" element={<ClimateLayout currentPage="ClimateWire"><ClimateWireShortPage /></ClimateLayout>} />
      <Route path="/ClimateGuide" element={<ClimateLayout currentPage="ClimateGuide"><ClimateGuidePage /></ClimateLayout>} />
      <Route path="/ClimateMusic" element={<ClimateLayout currentPage="ClimateMusic"><ClimateMusicPage /></ClimateLayout>} />
      {/* ── THE ROOM OF CARTOONS ──
          Opened for Janine's 29 November workshop, prepared before the day rather than
          during it. Public to read, like every other room on the record: a wall nobody
          may look at is a noticeboard, not a record. Drawings sent in wait for a keeper. */}
      <Route path="/ClimateCartoons" element={<ClimateLayout currentPage="ClimateCartoons"><ClimateCartoonsPage /></ClimateLayout>} />
      {/* ── THE MACHINE'S HAND ──
          Its own address inside the room, because a series of marks is read one after another
          and not squeezed into a newspaper spread. It wears the record's shell like every other
          room, so a reader who arrives from a shared link is still inside the record. */}
      <Route path="/ClimateCartoons/BaseOne" element={<ClimateLayout currentPage="ClimateCartoons"><ClimateCartoonsBaseOnePage /></ClimateLayout>} />
      {/* ── ONE DRAWING ON A SHEET, AND ONE HAND'S OWN PAGE ─────────────────────────
          Two addresses a cartoonist can carry away from the wall. The sheet is laid out to be
          printed and hung — it opens outside the record's shell on purpose, so a school's
          printer gets the drawing and not the navigation. The artist's page stays inside the
          record, because it is part of the record. */}
      <Route path="/ClimateCartoons/Sheet/:id" element={<ClimateCartoonSheetPage />} />
      {/* ── A DRAWING'S OWN NAME, AS AN ADDRESS ──
          Brian, 27 November: the id address was too long to say, type or send. Every
          drawing now also answers to its own title: /w/rain-check, /w/keeping-it-cool.
          The long address keeps working, and /wall opens the room. */}
      <Route path="/w/:slug" element={<ClimateCartoonShortPage />} />
      <Route path="/wall" element={<Navigate to="/ClimateCartoons" replace />} />
      <Route path="/ClimateCartoons/Artist/:name" element={<ClimateLayout currentPage="ClimateCartoons"><ClimateCartoonArtistPage /></ClimateLayout>} />
      {/* Francis's own page. Written by hand rather than generated from the wall, because a
          man who has been carrying this campaign since 2012 is not a row in a table: his own
          words, the cover he drew, and then everything he gives the record, read live from
          the same table the wall reads so his next drawing appears without anybody editing it. */}
      <Route path="/ClimateCartoons/Francis" element={<ClimateCartoonFrancisPage />} />
      <Route path="/ClimateCartoons/WhatThisIs" element={<ClimateLayout currentPage="ClimateCartoons"><ClimateCartoonsWhatThisIsPage /></ClimateLayout>} />
      <Route path="/ClimateCartoons/CAIB" element={<ClimateLayout currentPage="ClimateCartoons"><ClimateCartoonsCAIBPage /></ClimateLayout>} />

      {/* ── THE PRINT ROOM, AND THE SHOW IT MAKES ────────────────────────────────────
          Two addresses, and only one of them is a room. /ClimateCartoons/Print is a room of
          the record and wears the record's shell: a contact sheet of the wall, where a person
          chooses the drawings they want and numbers them by the order they chose them.
          /ClimateCartoons/Exhibition is paper — it opens outside the shell on purpose, like
          the single sheet, because a school's printer must get the drawings and the credits
          and not a masthead and a way out. The show travels in the address, so it can be
          bookmarked and printed again next term and the record never learns who printed it. */}
      <Route path="/ClimateCartoons/Print" element={<ClimateLayout currentPage="ClimateCartoons"><ClimateCartoonPrintPage /></ClimateLayout>} />
      <Route path="/ClimateCartoons/Exhibition" element={<ClimateCartoonExhibitionPage />} />
      {/* ── READING THE THREAD ──
          One address that opens the first drawing full size and lets a room arrow
          through them in the wall's own order — so on a call the drawings can be read
          one after another without anybody hunting for a plate to tap. */}
      <Route path="/ClimateCartoons/Thread" element={<ClimateLayout currentPage="ClimateCartoons"><ClimateCartoonsThreadPage /></ClimateLayout>} />
      {/* The words that travel with the room: five sets, one address, so a link posted
          anywhere arrives with a description of what it is. */}
      <Route path="/ClimateCartoons/Share" element={<ClimateLayout currentPage="ClimateCartoons"><ClimateCartoonsSharePage /></ClimateLayout>} />
      {/* The order the hour runs in, for whoever is sharing a window on the day. */}
      <Route path="/ClimateCartoons/Present" element={<ClimateLayout currentPage="ClimateCartoons"><ClimateCartoonPresentPage /></ClimateLayout>} />

      {/* The 29th, written down: one address Janine can send to CEEW, to the festival's
          curator or to a classroom. It carries the hour, what happens to the drawings and
          the one ask — and no addresses, no phone numbers and no joining link, because a
          workshop's link is hers to hand out. */}
      <Route path="/ClimateWorkshop" element={<ClimateLayout currentPage="ClimateWorkshop"><ClimateWorkshopPage /></ClimateLayout>} />
      {/* CEEW's six questions, answered in writing and in her order, so the call that follows
          is about the things a page cannot settle. */}
      <Route path="/ClimateWorkshopAnswers" element={<ClimateLayout currentPage="ClimateWorkshop"><ClimateWorkshopAnswersPage /></ClimateLayout>} />
      <Route path="/ClimateWorkshopAnswers" element={<ClimateLayout currentPage="ClimateWorkshop"><ClimateWorkshopAnswersPage /></ClimateLayout>} />
      {/* ── THE SCRIPT THAT IS NOT NEEDED ────────────────────────────────────────────
          This address held eight minutes of speech and a nineteen-minute drawing exercise,
          written on 16 November before anybody had seen Janine's agenda. Her agenda, sent on
          the 24th, gives Brian two minutes and has no drawing in it at all — so the script
          was instructions for an hour nobody had scheduled, sitting on a live address that
          could still be forwarded to the host or the festival.

          It is not deleted, because the words are somebody's work and a keeper can still read
          the file. It is simply off the record: the address now opens the hour as it actually
          is, so a link already in somebody's inbox cannot tell them to do something the host
          never asked for. */}
      <Route path="/ClimateWorkshopWords" element={<Navigate to="/ClimateWorkshop" replace />} />
      <Route path="/ClimateHost" element={<ClimateLayout currentPage="ClimateHost"><ClimateHostPage /></ClimateLayout>} />
      {/* ── SAVED, NOT STANDING OPEN ─────────────────────────────────────────────────
          "Please save this… for when we are discussing with a potential host" — the founder,
          9 November. So the handover sheet is kept whole and taken off the open record: it
          opens to a keeper's key, the way the host brief does, and the keeper hands it over
          herself when there is somebody to hand it to. Its public links came off the same
          day — the foot, the search guide, the brief, the host page and the three places
          x = x pointed at it — because a door that opens onto a locked page is worse than
          no door at all. */}
      <Route path="/ClimateHandover" element={<ClimateLayout currentPage="ClimateHandover"><KeeperKey><ClimateHandoverPage /></KeeperKey></ClimateLayout>} />
      {/* ── THE WALL AND THE DOORS, JOINED ───────────────────────────────────────
          Thirty-two drawings, and not one of them pointing at the entry it was about: the
          wall and the record's three doors stood in separate rooms. This is the keeper's
          desk for the join, one drawing at a time. Behind the record's key, because it is
          the record's work and a keeper holds the record's keys, not the building's. */}
      {/* One room, not two. The join between the wall and the doors was given its own
          address when it was built, and Brian asked the obvious question an hour later:
          why is there a keeper's room AND a wall room? It is the fifth door of the room
          now — /CustodianRoom?tab=wall — and this address opens that door, so a link
          already sent still lands and nobody has to remember two houses. */}
      <Route path="/WallLinks" element={<Navigate to="/CustodianRoom?tab=wall" replace />} />
      <Route path="/ClimateCorrections" element={<RecordSectionRedirect to="/ClimateMethod" fallbackHash="#corrections" />} />
      {/* The seal: every entry fingerprinted, and the check run in the reader's own
          browser rather than on our server. The one page that lets a sceptic verify
          the record without trusting anybody who built it. */}
      <Route path="/ClimateSeals" element={<ClimateLayout currentPage="ClimateSeals"><ClimateSealsPage /></ClimateLayout>} />
      {/* The keeper's own room: where the founder says yes or not yet. Deliberately NOT
          behind the app's admin door — the record checks her against its own guest list on
          the server, so she holds the record's keys and none of the building's. */}
      <Route path="/CustodianRoom" element={<ClimateLayout currentPage="ClimateKeeperRoom"><ClimateKeeperRoomPage /></ClimateLayout>} />
      <Route path="/ClimateKeeperRoom" element={<RoomAtItsRightAddress />} />
      <Route path="/ClimateFellows" element={<ClimateLayout currentPage="ClimateFellows"><ClimateFellowsPage /></ClimateLayout>} />
      {/* The roll: the people who check this record, in their own words. Its door sits on
          the contents sheet beside "Become a checker", and at the foot of the fellows page,
          because the two questions belong together: what checking is, and who is already
          doing it. It is not on the five-door rail and should not be — a roll is something
          a reader goes looking for, and a volunteer is proud of, not a room everyone enters. */}
      <Route path="/ClimateRoll" element={<ClimateLayout currentPage="ClimateRoll"><ClimateRollPage /></ClimateLayout>} />
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
      <Route path="/ClimateHostBrief" element={<ClimateLayout currentPage="ClimateYaleBrief"><KeeperKey><ClimateYaleBriefPage /></KeeperKey></ClimateLayout>} />
      <Route path="/UF51Token" element={<LayoutWrapper currentPageName="UF51Token"><UF51TokenPage /></LayoutWrapper>} />
      <Route path="/UF51ThreadJournal" element={<LayoutWrapper currentPageName="UF51ThreadJournal"><UF51ThreadJournalPage /></LayoutWrapper>} />
      <Route path="/Franklin51" element={<LayoutWrapper currentPageName="Franklin51"><Franklin51Page /></LayoutWrapper>} />
      <Route path="/Aletheia" element={<AletheiaPage />} />
      <Route path="/XEqualsX" element={<ClimateLayout currentPage="XEqualsX"><XEqualsXPage /></ClimateLayout>} />
      <Route path="/XEqualsXNotes" element={<ClimateLayout currentPage="XEqualsXNotes"><XEqualsXNotesPage /></ClimateLayout>} />
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
      {/* ── THE CHECKER'S OWN ADDRESS ──────────────────────────────────────────────
          This used to bounce to the keeper's room, so the one letter we send to a
          volunteer landed them in a page titled "Keeper's room" — someone else's desk,
          with someone else's words on it. A pair of eyes was being handed the keys'
          furniture to stand in. So the queue has its own address again: the record's
          masthead, the record's foot, and nothing on it but the work they agreed to do. */}
      <Route path="/ClimateChecking" element={<Navigate to="/CustodianRoom?tab=check" replace />} />
      {/* The guest list is the record's own, so it opens to the record's own keys. Behind the
          app's admin door, the second keeper who has to agree to every access change could
          never reach the page that asks them — and a two-key rule nobody can turn is a lock. */}
      <Route path="/AdminClimateCheckers" element={<Navigate to="/CustodianRoom?tab=people" replace />} />
      {/* The desk is the record's own desk, so it opens to the record's own keys. Behind the
          building's admin door, a keeper invited to hold them was stopped on the one page built
          for her and told "Admins only". KeeperKey asks the record instead. */}
      {/* The desk was sent to ?tab=desk, and the shed's rooms are decide, check, people,
          counts and sourcing — so "desk" matched nothing, the room fell back to the first
          door, and the counts page could not be reached from its own address at all. The
          desk is the counts room; it now lands on it. */}
      <Route path="/AdminClimateDesk" element={<Navigate to="/CustodianRoom?tab=counts" replace />} />
      <Route path="/AdminSecureVault" element={<LayoutWrapper currentPageName="AdminSecureVault"><AdminOnly><AdminSecureVaultPage /></AdminOnly></LayoutWrapper>} />
      <Route path="/AdminSponsorRoute" element={<LayoutWrapper currentPageName="AdminSponsorRoute"><AdminOnly><AdminSponsorRoutePage /></AdminOnly></LayoutWrapper>} />
      <Route path="/Uf51Road" element={<LayoutWrapper currentPageName="Uf51Road"><AdminOnly><Uf51RoadPage /></AdminOnly></LayoutWrapper>} />
      <Route path="/ClimateImpact" element={<RecordSectionRedirect to="/ClimateMap" fallbackHash="#reach" />} />
      <Route path="/ClimateTerms" element={<ClimateLayout currentPage="ClimateTerms"><ClimateTermsPage /></ClimateLayout>} />
      <Route path="/ClimatePrivacy" element={<ClimateLayout currentPage="ClimatePrivacy"><ClimatePrivacyPage /></ClimateLayout>} />
      <Route path="/ClimateReachPlace/:placeType/:place" element={<ClimateLayout currentPage="ClimateImpact"><ClimateReachPlacePage /></ClimateLayout>} />
      <Route path="/ClimateFounder" element={<ClimateLayout currentPage="ClimateFounder"><ClimateFounderPage /></ClimateLayout>} />
      <Route path="/ClimateSupport" element={<ClimateLayout currentPage="ClimateSupport"><ClimateSupportPage /></ClimateLayout>} />

      {/* ── THE DOORS THAT HAD NO ADDRESS ────────────────────────────────────────────
          Every page below was imported at the top of this file and offered in the app's own
          navigation, and not one of them had a route — so a tap on ST51, the PetSounds51
          pages, the CB51 diary or any of the admin tools fell straight through to the
          not-found page. That is the quietest kind of broken: the link looks alive, the
          list looks full, and the door opens onto nothing.
          This file is no longer auto-generated, so the loop above only knows the pages that
          existed when it last was. These are the rest, wired the same way the loop wires
          its own: the app's frame around each one, and the admin door in front of the
          screens whose names begin with Admin. */}
      <Route path="/ST51" element={<LayoutWrapper currentPageName="ST51"><ST51Page /></LayoutWrapper>} />
      <Route path="/FreqLift51Whitepaper" element={<LayoutWrapper currentPageName="FreqLift51Whitepaper"><FreqLift51WhitepaperPage /></LayoutWrapper>} />
      <Route path="/AI51SoulDataset" element={<LayoutWrapper currentPageName="AI51SoulDataset"><AI51SoulDataset /></LayoutWrapper>} />
      <Route path="/StoneymollanMarketing" element={<LayoutWrapper currentPageName="StoneymollanMarketing"><StoneymollanMarketing /></LayoutWrapper>} />
      <Route path="/Learn51AI" element={<LayoutWrapper currentPageName="Learn51AI"><Learn51AIPage /></LayoutWrapper>} />
      <Route path="/PetSounds51Landing" element={<LayoutWrapper currentPageName="PetSounds51Landing"><PetSounds51Landing /></LayoutWrapper>} />
      <Route path="/PetSounds51PartnerBrief" element={<LayoutWrapper currentPageName="PetSounds51PartnerBrief"><PetSounds51PartnerBrief /></LayoutWrapper>} />
      <Route path="/PetSounds51Whitepaper" element={<LayoutWrapper currentPageName="PetSounds51Whitepaper"><PetSounds51Whitepaper /></LayoutWrapper>} />
      <Route path="/PetSounds51Press" element={<LayoutWrapper currentPageName="PetSounds51Press"><PetSounds51Press /></LayoutWrapper>} />
      <Route path="/PetSounds51Data" element={<LayoutWrapper currentPageName="PetSounds51Data"><PetSounds51Data /></LayoutWrapper>} />
      <Route path="/PetSounds51MarketingAssets" element={<LayoutWrapper currentPageName="PetSounds51MarketingAssets"><PetSounds51MarketingAssets /></LayoutWrapper>} />
      <Route path="/PetSounds51ResearchOutreach" element={<LayoutWrapper currentPageName="PetSounds51ResearchOutreach"><PetSounds51ResearchOutreach /></LayoutWrapper>} />
      <Route path="/CB51CalendarView" element={<LayoutWrapper currentPageName="CB51CalendarView"><CB51CalendarView /></LayoutWrapper>} />
      <Route path="/CB51MessageInbox" element={<LayoutWrapper currentPageName="CB51MessageInbox"><CB51MessageInbox /></LayoutWrapper>} />
      <Route path="/CB51FinanceAdmin" element={<LayoutWrapper currentPageName="CB51FinanceAdmin"><CB51FinanceAdmin /></LayoutWrapper>} />
      <Route path="/CB51Todo" element={<LayoutWrapper currentPageName="CB51Todo"><CB51Todo /></LayoutWrapper>} />
      <Route path="/AdminHMRCTracker" element={<LayoutWrapper currentPageName="AdminHMRCTracker"><AdminOnly><AdminHMRCTrackerPage /></AdminOnly></LayoutWrapper>} />
      <Route path="/AdminLogoUpload" element={<LayoutWrapper currentPageName="AdminLogoUpload"><AdminOnly><AdminLogoUploadPage /></AdminOnly></LayoutWrapper>} />
      <Route path="/AdminPWAPushGuide" element={<LayoutWrapper currentPageName="AdminPWAPushGuide"><AdminOnly><AdminPWAPushGuidePage /></AdminOnly></LayoutWrapper>} />
      <Route path="/AdminStoneymollanLegal" element={<LayoutWrapper currentPageName="AdminStoneymollanLegal"><AdminOnly><AdminStoneymollanLegalPage /></AdminOnly></LayoutWrapper>} />
      {/* ── THE REPLY, ON AN OPEN ADDRESS ─────────────────────────────────────────
          It sat behind the admin door, which meant the one person who needs to read it
          before sending it had to sign in first. Brian asked to read and copy it in the
          preview without that, and it is his own letter about his own rights — there is
          nothing in it that is not already in the correspondence. The page asks search
          engines to leave it alone, so it can be opened on a phone at the kitchen table
          without becoming the first thing a neighbour finds. The admin address still
          works, because it is in the case file's own links. */}
      <Route path="/StoneymollanReply" element={<StoneymollanReplyPage />} />
      {/* Behind the admin door, not merely unlisted. The letters themselves are harmless to
          show — the page around them is not: it explains which question is being asked blind
          and why the barn stays out of the correspondence. That is the one thing on this record
          that must never be readable by the other side. */}
      <Route path="/StoneymollanEscalation" element={<AdminOnly><StoneymollanEscalationPage /></AdminOnly>} />
      <Route path="/AdminStoneymollanBarryReply" element={<Navigate to="/StoneymollanReply" replace />} />
      <Route path="/AdminStoneymollanBarryReplyPage" element={<Navigate to="/StoneymollanReply" replace />} />
      {/* ── THE MARK, AS AN ADDRESS ──
          x = x cannot be a domain: an equals sign is not allowed in one. It can be a path,
          and it should be, because the mark is the record's own name and a reader who has
          heard it should be able to type it and arrive. uf51.love/x=x opens the record. */}
      {/* ── THE MARK'S OWN ADDRESS OPENS THE MARK'S OWN PAGE ──────────────────────
          Brian, 27 November: "x = x page not connected linked anywhere bri, feels not
          right". He was feeling a real fault: typing the record's own name arrived at the
          record's home, so the one address the mark has never once opened the page that
          says what the mark means. It does now, and that page carries the doors onward. */}
      <Route path="/x=x" element={<Navigate to="/XEqualsX" replace />} />
      {/* ── THE SHORT DOORS ──
          One address carries the identity (uf51.love/x=x); the rooms carry the content, and
          they should be sayable out loud. "uf51.love/wire" is a sentence; "uf51.love/ClimateWire"
          is a filename. These are redirects only — every existing address keeps working, so
          nothing already printed, bookmarked or linked breaks. There is no /map: the app
          already has a Map page and React Router matches without caring about case. */}
      <Route path="/wire" element={<Navigate to="/ClimateWire" replace />} />
      <Route path="/cartoons" element={<Navigate to="/ClimateCartoons" replace />} />
      {/* Brian, 27 November: "thought /TheWall?" — the room has been called the wall all along, so
          the address people say out loud should open it too. A short door, like /wire and /music:
          the room itself stays where it is, and a link already spoken or written down still lands. */}
      <Route path="/TheWall" element={<Navigate to="/ClimateCartoons" replace />} />
      <Route path="/music" element={<Navigate to="/ClimateMusic" replace />} />
      <Route path="/method" element={<Navigate to="/ClimateMethod" replace />} />
      <Route path="/search" element={<Navigate to="/ClimateSearch" replace />} />
      <Route path="/guide" element={<Navigate to="/ClimateGuide" replace />} />
      <Route path="/seals" element={<Navigate to="/ClimateSeals" replace />} />
      <Route path="/roll" element={<Navigate to="/ClimateRoll" replace />} />
      <Route path="/founder" element={<Navigate to="/ClimateFounder" replace />} />
      {/* ── THE DOORS PEOPLE SAY OUT LOUD ──
          Brian, 27 November: "/TheWire and /TheWire/Method and /x=x etc". He is right: the
          rooms are called the wire, the method, the wall, and a reader who has heard the name
          types it with a capital and gets the not-found page. So the spoken name opens the room
          it names. Short doors only — every real address keeps working exactly as it is. */}
      <Route path="/TheWire" element={<Navigate to="/ClimateWire" replace />} />
      <Route path="/TheWire/Method" element={<Navigate to="/ClimateMethod" replace />} />
      <Route path="/TheWire/Cartoons" element={<Navigate to="/ClimateCartoons" replace />} />
      <Route path="/TheWire/Search" element={<Navigate to="/ClimateSearch" replace />} />
      <Route path="/TheMethod" element={<Navigate to="/ClimateMethod" replace />} />
      <Route path="/TheCartoons" element={<Navigate to="/ClimateCartoons" replace />} />
      <Route path="/TheMusic" element={<Navigate to="/ClimateMusic" replace />} />
      <Route path="/TheGuide" element={<Navigate to="/ClimateGuide" replace />} />
      <Route path="/TheSeals" element={<Navigate to="/ClimateSeals" replace />} />
      <Route path="/TheRoll" element={<Navigate to="/ClimateRoll" replace />} />
      <Route path="/TheSearch" element={<Navigate to="/ClimateSearch" replace />} />
      <Route path="/TheFounder" element={<Navigate to="/ClimateFounder" replace />} />
      {/* ── THE REST OF THE DOORS, SAID THE WAY A PERSON SAYS THEM ──
          Brian, 27 November: "make it all coolasfuck every page bro down to terms privacy
          etc". The rooms were already sayable; these are the ones that were not, or that a
          reader types without the capital letters. Short doors only — every real address
          keeps working exactly as it is.
          Terms and privacy sit under /record/ because /Terms and /PrivacyPolicy already
          belong to the platform's own pages, and a short door must never take a reader to a
          different document than the one they asked for. */}
      <Route path="/record" element={<Navigate to="/TogetherChangeClimate" replace />} />
      <Route path="/record/terms" element={<Navigate to="/ClimateTerms" replace />} />
      <Route path="/record/privacy" element={<Navigate to="/ClimatePrivacy" replace />} />
      <Route path="/brief" element={<Navigate to="/ClimateBrief" replace />} />
      <Route path="/workshop" element={<Navigate to="/ClimateWorkshop" replace />} />
      <Route path="/answers" element={<Navigate to="/ClimateWorkshopAnswers" replace />} />
      <Route path="/fellows" element={<Navigate to="/ClimateFellows" replace />} />
      <Route path="/support" element={<Navigate to="/ClimateSupport" replace />} />
      <Route path="/print" element={<Navigate to="/ClimateCartoons/Print" replace />} />
      <Route path="/thread" element={<Navigate to="/ClimateCartoons/Thread" replace />} />
      <Route path="/present" element={<Navigate to="/ClimateCartoons/Present" replace />} />
      <Route path="/francis" element={<Navigate to="/ClimateCartoons/Francis" replace />} />
      <Route path="/caib" element={<Navigate to="/ClimateCartoons/CAIB" replace />} />
      <Route path="/whatthisis" element={<Navigate to="/ClimateCartoons/WhatThisIs" replace />} />
      <Route path="/baseone" element={<Navigate to="/ClimateCartoons/BaseOne" replace />} />
      <Route path="/host" element={<Navigate to="/ClimateHost" replace />} />
      <Route path="/BrandMark" element={<BrandMarkPage />} />
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