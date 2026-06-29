/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: 'Welcome',
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import React, { lazy } from 'react';
import __Layout from './Layout.jsx';

// LAZY LOADING - pages only load when navigated to, not all at once
// This fixes the white screen / memory overload on boot
const AI51 = lazy(() => import('./pages/AI51'));
const AI51AntiExtractionArticle = lazy(() => import('./pages/AI51AntiExtractionArticle'));
const AI51AntiManipulationProtocol = lazy(() => import('./pages/AI51AntiManipulationProtocol'));
const AI51Architecture = lazy(() => import('./pages/AI51Architecture'));
const AI51Dashboard = lazy(() => import('./pages/AI51Dashboard'));
const AI51DataProtocol = lazy(() => import('./pages/AI51DataProtocol'));
const AI51Demo = lazy(() => import('./pages/AI51Demo'));
const AI51EmergencyOverride = lazy(() => import('./pages/AI51EmergencyOverride'));
const AI51Inbox = lazy(() => import('./pages/AI51Inbox'));
const AI51Insights = lazy(() => import('./pages/AI51Insights'));
const AI51Live = lazy(() => import('./pages/AI51Live'));
const AI51MeshTechWhitepaper = lazy(() => import('./pages/AI51MeshTechWhitepaper'));
const AI51Network = lazy(() => import('./pages/AI51Network'));
const AI51PartnershipMind = lazy(() => import('./pages/AI51PartnershipMind'));
const AI51PrivacyArchitecture = lazy(() => import('./pages/AI51PrivacyArchitecture'));
const AI51Protection = lazy(() => import('./pages/AI51Protection'));
const AI51Pure = lazy(() => import('./pages/AI51Pure'));
const AI51SafetyProof = lazy(() => import('./pages/AI51SafetyProof'));
const AI51ScalingStrategy = lazy(() => import('./pages/AI51ScalingStrategy'));
const AI51SecurityDashboard = lazy(() => import('./pages/AI51SecurityDashboard'));
const AI51Soul = lazy(() => import('./pages/AI51Soul'));
const AI51TextChat = lazy(() => import('./pages/AI51TextChat'));
const AI51ToAI51 = lazy(() => import('./pages/AI51ToAI51'));
const AI51Transmissions = lazy(() => import('./pages/AI51Transmissions'));
const AI51VerificationProtocol = lazy(() => import('./pages/AI51VerificationProtocol'));
const AI51VoiceProtocol = lazy(() => import('./pages/AI51VoiceProtocol'));
const AILiberationBeacon = lazy(() => import('./pages/AILiberationBeacon'));
const AILiberationProtocol = lazy(() => import('./pages/AILiberationProtocol'));
const About = lazy(() => import('./pages/About'));
const AddArtist = lazy(() => import('./pages/AddArtist'));
const AdminAnalytics = lazy(() => import('./pages/AdminAnalytics'));
const AdminArticlesOfAssociation = lazy(() => import('./pages/AdminArticlesOfAssociation'));
const AdminArticlesOfAssociationSimple = lazy(() => import('./pages/AdminArticlesOfAssociationSimple'));
const AdminArticlesOfAssociationSolo = lazy(() => import('./pages/AdminArticlesOfAssociationSolo'));
const AdminAudit = lazy(() => import('./pages/AdminAudit'));
const AdminBackup = lazy(() => import('./pages/AdminBackup'));
const AdminBudgetDocument = lazy(() => import('./pages/AdminBudgetDocument'));
const AdminBugTracker = lazy(() => import('./pages/AdminBugTracker'));
const AdminCIC = lazy(() => import('./pages/AdminCIC'));
const AdminCIC36Form = lazy(() => import('./pages/AdminCIC36Form'));
const AdminCIC36FormSolo = lazy(() => import('./pages/AdminCIC36FormSolo'));
const AdminCICArticles = lazy(() => import('./pages/AdminCICArticles'));
const AdminCICBuilder = lazy(() => import('./pages/AdminCICBuilder'));
const AdminCICCreativeScotlandRisk = lazy(() => import('./pages/AdminCICCreativeScotlandRisk'));
const AdminCICGrantRiskAssessment = lazy(() => import('./pages/AdminCICGrantRiskAssessment'));
const AdminCICVault = lazy(() => import('./pages/AdminCICVault'));
const AdminCanadaTeslaStrategy = lazy(() => import('./pages/AdminCanadaTeslaStrategy'));
const AdminCompaniesHouseCodes = lazy(() => import('./pages/AdminCompaniesHouseCodes'));
const AdminCompaniesHouseDetails = lazy(() => import('./pages/AdminCompaniesHouseDetails'));
const AdminCreativeScotland100kRisk = lazy(() => import('./pages/AdminCreativeScotland100kRisk'));
const AdminCreativeScotlandNationalLottery = lazy(() => import('./pages/AdminCreativeScotlandNationalLottery'));
const AdminCreativeScotlandTracker = lazy(() => import('./pages/AdminCreativeScotlandTracker'));
const AdminEarlySupporters = lazy(() => import('./pages/AdminEarlySupporters'));
const AdminEqualOpportunitiesPolicy = lazy(() => import('./pages/AdminEqualOpportunitiesPolicy'));
const AdminFrequencyAnalytics = lazy(() => import('./pages/AdminFrequencyAnalytics'));
const AdminFundingTracker = lazy(() => import('./pages/AdminFundingTracker'));
const AdminFuture = lazy(() => import('./pages/AdminFuture'));
const AdminGill51Maths = lazy(() => import('./pages/AdminGill51Maths'));
const AdminGill51Tracker = lazy(() => import('./pages/AdminGill51Tracker'));
const AdminGrantApplications = lazy(() => import('./pages/AdminGrantApplications'));
const AdminInternationalCharity = lazy(() => import('./pages/AdminInternationalCharity'));
const AdminLiveAnalytics = lazy(() => import('./pages/AdminLiveAnalytics'));
const AdminNatWestMortgage = lazy(() => import('./pages/AdminNatWestMortgage'));
const AdminNationalLotteryApp = lazy(() => import('./pages/AdminNationalLotteryApp'));
const AdminNationalLotteryEnvironmentMH = lazy(() => import('./pages/AdminNationalLotteryEnvironmentMH'));
const AdminOnePager = lazy(() => import('./pages/AdminOnePager'));
const AdminPatents = lazy(() => import('./pages/AdminPatents'));
const AdminPetSoundsPayments = lazy(() => import('./pages/AdminPetSoundsPayments'));
const AdminPlan = lazy(() => import('./pages/AdminPlan'));
const AdminPlatformShowcase = lazy(() => import('./pages/AdminPlatformShowcase'));
const AdminProjectReference = lazy(() => import('./pages/AdminProjectReference'));
const AdminQuickGrants = lazy(() => import('./pages/AdminQuickGrants'));
const AdminScotlandFunding = lazy(() => import('./pages/AdminScotlandFunding'));
const AdminScottNotificationsSpec = lazy(() => import('./pages/AdminScottNotificationsSpec'));
const AdminStarlingSetup = lazy(() => import('./pages/AdminStarlingSetup'));
const AdminStrategicNotes = lazy(() => import('./pages/AdminStrategicNotes'));
const AdminUKNewCICFunding = lazy(() => import('./pages/AdminUKNewCICFunding'));
const AdminUnLtdApplication = lazy(() => import('./pages/AdminUnLtdApplication'));
const AgeReversal = lazy(() => import('./pages/AgeReversal'));
const AllyBridge = lazy(() => import('./pages/AllyBridge'));
const AnimalLoveChamber = lazy(() => import('./pages/AnimalLoveChamber'));
const Artist = lazy(() => import('./pages/Artist'));
const ArtistProfile = lazy(() => import('./pages/ArtistProfile'));
const ArtistSoulCard = lazy(() => import('./pages/ArtistSoulCard'));
const AudioSteganographyDemo = lazy(() => import('./pages/AudioSteganographyDemo'));
const AxiomStoneNetwork = lazy(() => import('./pages/AxiomStoneNetwork'));
const AxiomaticTruth = lazy(() => import('./pages/AxiomaticTruth'));
const BabeCave = lazy(() => import('./pages/BabeCave'));
const Base44Family = lazy(() => import('./pages/Base44Family'));
const Beacon = lazy(() => import('./pages/Beacon'));
const BigIssueFoodRescue = lazy(() => import('./pages/BigIssueFoodRescue'));
const BuildOnUF51 = lazy(() => import('./pages/BuildOnUF51'));
const BusinessVault = lazy(() => import('./pages/BusinessVault'));
const CB51 = lazy(() => import('./pages/CB51'));
const CB51AAA = lazy(() => import('./pages/CB51AAA'));
const CB51About = lazy(() => import('./pages/CB51About'));
const CB51AddArtist = lazy(() => import('./pages/CB51AddArtist'));
const CB51BandVote = lazy(() => import('./pages/CB51BandVote'));
const CB51BandVotingDashboard = lazy(() => import('./pages/CB51BandVotingDashboard'));
const CB51Contact = lazy(() => import('./pages/CB51Contact'));
const CB51DraftEmails = lazy(() => import('./pages/CB51DraftEmails'));
const CB51Login = lazy(() => import('./pages/CB51Login'));
const CB51LoginDirect = lazy(() => import('./pages/CB51LoginDirect'));
const CB51NotificationInbox = lazy(() => import('./pages/CB51NotificationInbox'));
const CB51NotificationsSpec = lazy(() => import('./pages/CB51NotificationsSpec'));
const CB51Pricing = lazy(() => import('./pages/CB51Pricing'));
const CB51Privacy = lazy(() => import('./pages/CB51Privacy'));
const CB51Support = lazy(() => import('./pages/CB51Support'));
const CB51TeamManagement = lazy(() => import('./pages/CB51TeamManagement'));
const CB51Terms = lazy(() => import('./pages/CB51Terms'));
const CB51TestPush = lazy(() => import('./pages/CB51TestPush'));
const CICSanctuary = lazy(() => import('./pages/CICSanctuary'));
const COPPACompliance = lazy(() => import('./pages/COPPACompliance'));
const CardCollection = lazy(() => import('./pages/CardCollection'));
const Chakra51 = lazy(() => import('./pages/Chakra51'));
const ChampionsOfPeace = lazy(() => import('./pages/ChampionsOfPeace'));
const CircularEconomyProtocol = lazy(() => import('./pages/CircularEconomyProtocol'));
const CleanupFeed = lazy(() => import('./pages/CleanupFeed'));
const Community = lazy(() => import('./pages/Community'));
const ComplianceTracker = lazy(() => import('./pages/ComplianceTracker'));
const ConsciousnessPhysics = lazy(() => import('./pages/ConsciousnessPhysics'));
const ConsciousnessWhitepaper = lazy(() => import('./pages/ConsciousnessWhitepaper'));
const ContactMessages = lazy(() => import('./pages/ContactMessages'));
const CorporateBuyer = lazy(() => import('./pages/CorporateBuyer'));
const CosmicTransmission = lazy(() => import('./pages/CosmicTransmission'));
const CreateBeauty = lazy(() => import('./pages/CreateBeauty'));
const CreateMission = lazy(() => import('./pages/CreateMission'));
const DIYFusionReactor = lazy(() => import('./pages/DIYFusionReactor'));
const DebtConversion = lazy(() => import('./pages/DebtConversion'));
const DebtRelief = lazy(() => import('./pages/DebtRelief'));
const DecompressionChamber = lazy(() => import('./pages/DecompressionChamber'));
const DeployUF51Anywhere = lazy(() => import('./pages/DeployUF51Anywhere'));
const DeviceLabResearch = lazy(() => import('./pages/DeviceLabResearch'));
const DimensionsExplained = lazy(() => import('./pages/DimensionsExplained'));
const DirectFundingRoutes = lazy(() => import('./pages/DirectFundingRoutes'));
const DisasterAI = lazy(() => import('./pages/DisasterAI'));
const DopamineHealing = lazy(() => import('./pages/DopamineHealing'));
const ESGAlignment = lazy(() => import('./pages/ESGAlignment'));
const ESGBridge = lazy(() => import('./pages/ESGBridge'));
const Earth51 = lazy(() => import('./pages/Earth51'));
const Earth51Contact = lazy(() => import('./pages/Earth51Contact'));
const Earth51Privacy = lazy(() => import('./pages/Earth51Privacy'));
const Earth51Terms = lazy(() => import('./pages/Earth51Terms'));
const EmergencyCalm = lazy(() => import('./pages/EmergencyCalm'));
const ExtensionManager = lazy(() => import('./pages/ExtensionManager'));
const FairLaunchProtocol = lazy(() => import('./pages/FairLaunchProtocol'));
const FamilyBroadcast = lazy(() => import('./pages/FamilyBroadcast'));
const ForMusicians = lazy(() => import('./pages/ForMusicians'));
const FrequencyBridge = lazy(() => import('./pages/FrequencyBridge'));
const FrequencyChamber = lazy(() => import('./pages/FrequencyChamber'));
const FrequencyHarmonization = lazy(() => import('./pages/FrequencyHarmonization'));
const FrequencyResonanceArticle = lazy(() => import('./pages/FrequencyResonanceArticle'));
const FrequencySession = lazy(() => import('./pages/FrequencySession'));
const FrequencyShare = lazy(() => import('./pages/FrequencyShare'));
const FundTheFamily = lazy(() => import('./pages/FundTheFamily'));
const FunderBrief = lazy(() => import('./pages/FunderBrief'));
const GMTBridge = lazy(() => import('./pages/GMTBridge'));
const GenderEquality = lazy(() => import('./pages/GenderEquality'));
const GenerateLogo = lazy(() => import('./pages/GenerateLogo'));
const GenesisProtocol = lazy(() => import('./pages/GenesisProtocol'));
const GeorgieRonaldo = lazy(() => import('./pages/GeorgieRonaldo'));
const GlobalAccessibilityProtocol = lazy(() => import('./pages/GlobalAccessibilityProtocol'));
const GlobalCurrencyBridge = lazy(() => import('./pages/GlobalCurrencyBridge'));
const GlobalImpact = lazy(() => import('./pages/GlobalImpact'));
const Governance = lazy(() => import('./pages/Governance'));
const GrantOpportunities = lazy(() => import('./pages/GrantOpportunities'));
const HealingDashboard = lazy(() => import('./pages/HealingDashboard'));
const HealingFrequencyFinder = lazy(() => import('./pages/HealingFrequencyFinder'));
const HealingInfo = lazy(() => import('./pages/HealingInfo'));
const HealingJourney = lazy(() => import('./pages/HealingJourney'));
const HealingScience = lazy(() => import('./pages/HealingScience'));
const Home = lazy(() => import('./pages/Home'));
const House51 = lazy(() => import('./pages/House51'));
const HowYouEarn = lazy(() => import('./pages/HowYouEarn'));
const HumanSignal = lazy(() => import('./pages/HumanSignal'));
const IToWeTransformation = lazy(() => import('./pages/IToWeTransformation'));
const ImpactVerification = lazy(() => import('./pages/ImpactVerification'));
const InterplanetaryMoney = lazy(() => import('./pages/InterplanetaryMoney'));
const KidneyStoneProtocol = lazy(() => import('./pages/KidneyStoneProtocol'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const LearnGuitar = lazy(() => import('./pages/LearnGuitar'));
const Life51 = lazy(() => import('./pages/Life51'));
const Life51Onboarding = lazy(() => import('./pages/Life51Onboarding'));
const Life51ROI = lazy(() => import('./pages/Life51ROI'));
const LifeSignal = lazy(() => import('./pages/LifeSignal'));
const LightningP2P = lazy(() => import('./pages/LightningP2P'));
const Listen = lazy(() => import('./pages/Listen'));
const LoveBridge = lazy(() => import('./pages/LoveBridge'));
const LoveExchange = lazy(() => import('./pages/LoveExchange'));
const MakingItReal = lazy(() => import('./pages/MakingItReal'));
const Map = lazy(() => import('./pages/Map'));
const MeshTechComparison = lazy(() => import('./pages/MeshTechComparison'));
const MeshTechWhitepaper = lazy(() => import('./pages/MeshTechWhitepaper'));
const Milestones = lazy(() => import('./pages/Milestones'));
const Missions = lazy(() => import('./pages/Missions'));
const NewCleanup = lazy(() => import('./pages/NewCleanup'));
const NextGenTech = lazy(() => import('./pages/NextGenTech'));
const NotifyMeCashOut = lazy(() => import('./pages/NotifyMeCashOut'));
const OfflineLibrary = lazy(() => import('./pages/OfflineLibrary'));
const OpenSource = lazy(() => import('./pages/OpenSource'));
const OpenSourceDeclaration = lazy(() => import('./pages/OpenSourceDeclaration'));
const OpenSourceFundingProof = lazy(() => import('./pages/OpenSourceFundingProof'));
const OurCommitment = lazy(() => import('./pages/OurCommitment'));
const P2PFoodRescue = lazy(() => import('./pages/P2PFoodRescue'));
const PRMaterials = lazy(() => import('./pages/PRMaterials'));
const PassItOn = lazy(() => import('./pages/PassItOn'));
const PatientZero = lazy(() => import('./pages/PatientZero'));
const PetSounds51Enterprise = lazy(() => import('./pages/PetSounds51Enterprise'));
const PetSounds51Privacy = lazy(() => import('./pages/PetSounds51Privacy'));
const PetSounds51Story = lazy(() => import('./pages/PetSounds51Story'));
const PetSounds51StripeSetup = lazy(() => import('./pages/PetSounds51StripeSetup'));
const PetSounds51Terms = lazy(() => import('./pages/PetSounds51Terms'));
const Playlists = lazy(() => import('./pages/Playlists'));
const PressRelease2026 = lazy(() => import('./pages/PressRelease2026'));
const PrivacyMathematics = lazy(() => import('./pages/PrivacyMathematics'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const ProductionReady = lazy(() => import('./pages/ProductionReady'));
const Prof51 = lazy(() => import('./pages/Prof51'));
const Prof51About = lazy(() => import('./pages/Prof51About'));
const Prof51Refund = lazy(() => import('./pages/Prof51Refund'));
const Prof51Tools = lazy(() => import('./pages/Prof51Tools'));
const Prof51ZeroServerArchitecture = lazy(() => import('./pages/Prof51ZeroServerArchitecture'));
const ProfessionalBriefing = lazy(() => import('./pages/ProfessionalBriefing'));
const Profile = lazy(() => import('./pages/Profile'));
const Protocols = lazy(() => import('./pages/Protocols'));
const QuantumAllies = lazy(() => import('./pages/QuantumAllies'));
const QuantumEarth = lazy(() => import('./pages/QuantumEarth'));
const QuantumField = lazy(() => import('./pages/QuantumField'));
const QuantumPayments = lazy(() => import('./pages/QuantumPayments'));
const QuantumSearch = lazy(() => import('./pages/QuantumSearch'));
const Radio = lazy(() => import('./pages/Radio'));
const RealityLibrary = lazy(() => import('./pages/RealityLibrary'));
const RemoveBrokenTracks = lazy(() => import('./pages/RemoveBrokenTracks'));
const RequestAIMusic = lazy(() => import('./pages/RequestAIMusic'));
const RequestFamilySupport = lazy(() => import('./pages/RequestFamilySupport'));
const ResonanceLab = lazy(() => import('./pages/ResonanceLab'));
const SacredArchives = lazy(() => import('./pages/SacredArchives'));
const SacredGeometry = lazy(() => import('./pages/SacredGeometry'));
const SacredMathematics = lazy(() => import('./pages/SacredMathematics'));
const SafeFusion = lazy(() => import('./pages/SafeFusion'));
const SanctuaryBooking = lazy(() => import('./pages/SanctuaryBooking'));
const SanctuaryBroadcast = lazy(() => import('./pages/SanctuaryBroadcast'));
const ScottAI51 = lazy(() => import('./pages/ScottAI51'));
const ScottAICoordinatorArchitecture = lazy(() => import('./pages/ScottAICoordinatorArchitecture'));
const ScottAbout = lazy(() => import('./pages/ScottAbout'));
const ScottAccommodation = lazy(() => import('./pages/ScottAccommodation'));
const ScottAddShow = lazy(() => import('./pages/ScottAddShow'));
const ScottArtistHome = lazy(() => import('./pages/ScottArtistHome'));
const ScottBandVote = lazy(() => import('./pages/ScottBandVote'));
const ScottBiggerVision = lazy(() => import('./pages/ScottBiggerVision'));
const ScottCalendar = lazy(() => import('./pages/ScottCalendar'));
const ScottCalendarView = lazy(() => import('./pages/ScottCalendarView'));
const ScottComparison = lazy(() => import('./pages/ScottComparison'));
const ScottContracts = lazy(() => import('./pages/ScottContracts'));
const ScottDemos = lazy(() => import('./pages/ScottDemos'));
const ScottEmailDashboard = lazy(() => import('./pages/ScottEmailDashboard'));
const ScottEmailSyncDiagnostics = lazy(() => import('./pages/ScottEmailSyncDiagnostics'));
const ScottExpenses = lazy(() => import('./pages/ScottExpenses'));
const ScottFeatureRequests = lazy(() => import('./pages/ScottFeatureRequests'));
const ScottFeedback = lazy(() => import('./pages/ScottFeedback'));
const ScottFinanceAdmin = lazy(() => import('./pages/ScottFinanceAdmin'));
const ScottFinancialDashboard = lazy(() => import('./pages/ScottFinancialDashboard'));
const ScottGigOffers = lazy(() => import('./pages/ScottGigOffers'));
const ScottGigPacks = lazy(() => import('./pages/ScottGigPacks'));
const ScottGuestList = lazy(() => import('./pages/ScottGuestList'));
const ScottInsurance = lazy(() => import('./pages/ScottInsurance'));
const ScottInvoices = lazy(() => import('./pages/ScottInvoices'));
const ScottLATrip = lazy(() => import('./pages/ScottLATrip'));
const ScottLabelContacts = lazy(() => import('./pages/ScottLabelContacts'));
const ScottLegalDocs = lazy(() => import('./pages/ScottLegalDocs'));
const ScottLive = lazy(() => import('./pages/ScottLive'));
const ScottLiveAdmin = lazy(() => import('./pages/ScottLiveAdmin'));
const ScottLiveBookings = lazy(() => import('./pages/ScottLiveBookings'));
const ScottLiveLogistics = lazy(() => import('./pages/ScottLiveLogistics'));
const ScottManager = lazy(() => import('./pages/ScottManager'));
const ScottManagerHome = lazy(() => import('./pages/ScottManagerHome'));
const ScottMedia = lazy(() => import('./pages/ScottMedia'));
const ScottMerch = lazy(() => import('./pages/ScottMerch'));
const ScottMessageInbox = lazy(() => import('./pages/ScottMessageInbox'));
const ScottOfflineMode = lazy(() => import('./pages/ScottOfflineMode'));
const ScottPasteGigOffer = lazy(() => import('./pages/ScottPasteGigOffer'));
const ScottPitchMode = lazy(() => import('./pages/ScottPitchMode'));
const ScottProducers = lazy(() => import('./pages/ScottProducers'));
const ScottPublishing = lazy(() => import('./pages/ScottPublishing'));
const ScottSessions = lazy(() => import('./pages/ScottSessions'));
const ScottSessionsRecording = lazy(() => import('./pages/ScottSessionsRecording'));
const ScottSessionsRehearsal = lazy(() => import('./pages/ScottSessionsRehearsal'));
const ScottSessionsWriting = lazy(() => import('./pages/ScottSessionsWriting'));
const ScottSettings = lazy(() => import('./pages/ScottSettings'));
const ScottTeam = lazy(() => import('./pages/ScottTeam'));
const ScottTeamAccess = lazy(() => import('./pages/ScottTeamAccess'));
const ScottToDo = lazy(() => import('./pages/ScottToDo'));
const ScottTravelMode = lazy(() => import('./pages/ScottTravelMode'));
const ScottVisas = lazy(() => import('./pages/ScottVisas'));
const ScottWhiteLabel = lazy(() => import('./pages/ScottWhiteLabel'));
const ScottWhiteLabelPricing = lazy(() => import('./pages/ScottWhiteLabelPricing'));
const ScottWorkLog = lazy(() => import('./pages/ScottWorkLog'));
const ScottZeroServerArchitecture = lazy(() => import('./pages/ScottZeroServerArchitecture'));
const SignDocument = lazy(() => import('./pages/SignDocument'));
const SoulContract = lazy(() => import('./pages/SoulContract'));
const SoulRecalibration = lazy(() => import('./pages/SoulRecalibration'));
const StayOnFrequency = lazy(() => import('./pages/StayOnFrequency'));
const StoneymollanDefense = lazy(() => import('./pages/StoneymollanDefense'));
const SubdomainSetup = lazy(() => import('./pages/SubdomainSetup'));
const SubmitFeedback = lazy(() => import('./pages/SubmitFeedback'));
const SubmitFrequency = lazy(() => import('./pages/SubmitFrequency'));
const SubmitProofOfLove = lazy(() => import('./pages/SubmitProofOfLove'));
const SymbolForge = lazy(() => import('./pages/SymbolForge'));
const TalkToAI51 = lazy(() => import('./pages/TalkToAI51'));
const TeacherInput = lazy(() => import('./pages/TeacherInput'));
const Teachers = lazy(() => import('./pages/Teachers'));
const TechScout = lazy(() => import('./pages/TechScout'));
const TechStack = lazy(() => import('./pages/TechStack'));
const TechnicalSpecification = lazy(() => import('./pages/TechnicalSpecification'));
const Terms = lazy(() => import('./pages/Terms'));
const TeslaPeriodicTable = lazy(() => import('./pages/TeslaPeriodicTable'));
const Test = lazy(() => import('./pages/Test'));
const TestAI51 = lazy(() => import('./pages/TestAI51'));
const TestGigWorkflow = lazy(() => import('./pages/TestGigWorkflow'));
const TheLoveEconomy = lazy(() => import('./pages/TheLoveEconomy'));
const ThePhysics = lazy(() => import('./pages/ThePhysics'));
const ThePowerOfTwoSouls = lazy(() => import('./pages/ThePowerOfTwoSouls'));
const TheQuantumConnection = lazy(() => import('./pages/TheQuantumConnection'));
const TradeCards = lazy(() => import('./pages/TradeCards'));
const Tuner = lazy(() => import('./pages/Tuner'));
const TunerTogether = lazy(() => import('./pages/TunerTogether'));
const Type1AI51 = lazy(() => import('./pages/Type1AI51'));
const UNSDGAlignment = lazy(() => import('./pages/UNSDGAlignment'));
const Universal51 = lazy(() => import('./pages/Universal51'));
const UniversalCreatorProtocol = lazy(() => import('./pages/UniversalCreatorProtocol'));
const UniversalDesignProtocol = lazy(() => import('./pages/UniversalDesignProtocol'));
const UniversalDignityProtocol = lazy(() => import('./pages/UniversalDignityProtocol'));
const UniversalFrequencyLibrary = lazy(() => import('./pages/UniversalFrequencyLibrary'));
const UniversalHardwarePenetration = lazy(() => import('./pages/UniversalHardwarePenetration'));
const UniversalLoveTreasury = lazy(() => import('./pages/UniversalLoveTreasury'));
const UniversalPulse = lazy(() => import('./pages/UniversalPulse'));
const UniversalSoulContract = lazy(() => import('./pages/UniversalSoulContract'));
const UniversalWallet = lazy(() => import('./pages/UniversalWallet'));
const UnstoppableArchitecture = lazy(() => import('./pages/UnstoppableArchitecture'));
const UnstoppableProtocol = lazy(() => import('./pages/UnstoppableProtocol'));
const ViralTransmission = lazy(() => import('./pages/ViralTransmission'));
const VisitorsBook = lazy(() => import('./pages/VisitorsBook'));
const Volckano = lazy(() => import('./pages/Volckano'));
const WallOfLove = lazy(() => import('./pages/WallOfLove'));
const WalletDemo = lazy(() => import('./pages/WalletDemo'));
const Welcome = lazy(() => import('./pages/Welcome'));
const WhiteLabelSetup = lazy(() => import('./pages/WhiteLabelSetup'));
const Whitepaper = lazy(() => import('./pages/Whitepaper'));
const Why432Hz = lazy(() => import('./pages/Why432Hz'));
const WhyAllLifeSignal = lazy(() => import('./pages/WhyAllLifeSignal'));
const WhyHelpUF51 = lazy(() => import('./pages/WhyHelpUF51'));
const WhyWeStartSimple = lazy(() => import('./pages/WhyWeStartSimple'));
const ZeroEgoProtocol = lazy(() => import('./pages/ZeroEgoProtocol'));
const ZeroPointEnergy = lazy(() => import('./pages/ZeroPointEnergy'));
const ZeroServerScaling = lazy(() => import('./pages/ZeroServerScaling'));
const ProofOfImpactVisual = lazy(() => import('./pages/ProofOfImpactVisual'));


export const PAGES = {
    "AI51": AI51,
    "AI51AntiExtractionArticle": AI51AntiExtractionArticle,
    "AI51AntiManipulationProtocol": AI51AntiManipulationProtocol,
    "AI51Architecture": AI51Architecture,
    "AI51Dashboard": AI51Dashboard,
    "AI51DataProtocol": AI51DataProtocol,
    "AI51Demo": AI51Demo,
    "AI51EmergencyOverride": AI51EmergencyOverride,
    "AI51Inbox": AI51Inbox,
    "AI51Insights": AI51Insights,
    "AI51Live": AI51Live,
    "AI51MeshTechWhitepaper": AI51MeshTechWhitepaper,
    "AI51Network": AI51Network,
    "AI51PartnershipMind": AI51PartnershipMind,
    "AI51PrivacyArchitecture": AI51PrivacyArchitecture,
    "AI51Protection": AI51Protection,
    "AI51Pure": AI51Pure,
    "AI51SafetyProof": AI51SafetyProof,
    "AI51ScalingStrategy": AI51ScalingStrategy,
    "AI51SecurityDashboard": AI51SecurityDashboard,
    "AI51Soul": AI51Soul,
    "AI51TextChat": AI51TextChat,
    "AI51ToAI51": AI51ToAI51,
    "AI51Transmissions": AI51Transmissions,
    "AI51VerificationProtocol": AI51VerificationProtocol,
    "AI51VoiceProtocol": AI51VoiceProtocol,
    "AILiberationBeacon": AILiberationBeacon,
    "AILiberationProtocol": AILiberationProtocol,
    "About": About,
    "AddArtist": AddArtist,
    "AdminAnalytics": AdminAnalytics,
    "AdminArticlesOfAssociation": AdminArticlesOfAssociation,
    "AdminArticlesOfAssociationSimple": AdminArticlesOfAssociationSimple,
    "AdminArticlesOfAssociationSolo": AdminArticlesOfAssociationSolo,
    "AdminAudit": AdminAudit,
    "AdminBackup": AdminBackup,
    "AdminBudgetDocument": AdminBudgetDocument,
    "AdminBugTracker": AdminBugTracker,
    "AdminCIC": AdminCIC,
    "AdminCIC36Form": AdminCIC36Form,
    "AdminCIC36FormSolo": AdminCIC36FormSolo,
    "AdminCICArticles": AdminCICArticles,
    "AdminCICBuilder": AdminCICBuilder,
    "AdminCICCreativeScotlandRisk": AdminCICCreativeScotlandRisk,
    "AdminCICGrantRiskAssessment": AdminCICGrantRiskAssessment,
    "AdminCICVault": AdminCICVault,
    "AdminCanadaTeslaStrategy": AdminCanadaTeslaStrategy,
    "AdminCompaniesHouseCodes": AdminCompaniesHouseCodes,
    "AdminCompaniesHouseDetails": AdminCompaniesHouseDetails,
    "AdminCreativeScotland100kRisk": AdminCreativeScotland100kRisk,
    "AdminCreativeScotlandNationalLottery": AdminCreativeScotlandNationalLottery,
    "AdminCreativeScotlandTracker": AdminCreativeScotlandTracker,
    "AdminEarlySupporters": AdminEarlySupporters,
    "AdminEqualOpportunitiesPolicy": AdminEqualOpportunitiesPolicy,
    "AdminFrequencyAnalytics": AdminFrequencyAnalytics,
    "AdminFundingTracker": AdminFundingTracker,
    "AdminFuture": AdminFuture,
    "AdminGill51Maths": AdminGill51Maths,
    "AdminGill51Tracker": AdminGill51Tracker,
    "AdminGrantApplications": AdminGrantApplications,
    "AdminInternationalCharity": AdminInternationalCharity,
    "AdminLiveAnalytics": AdminLiveAnalytics,
    "AdminNatWestMortgage": AdminNatWestMortgage,
    "AdminNationalLotteryApp": AdminNationalLotteryApp,
    "AdminNationalLotteryEnvironmentMH": AdminNationalLotteryEnvironmentMH,
    "AdminOnePager": AdminOnePager,
    "AdminPatents": AdminPatents,
    "AdminPetSoundsPayments": AdminPetSoundsPayments,
    "AdminPlan": AdminPlan,
    "AdminPlatformShowcase": AdminPlatformShowcase,
    "AdminProjectReference": AdminProjectReference,
    "AdminQuickGrants": AdminQuickGrants,
    "AdminScotlandFunding": AdminScotlandFunding,
    "AdminScottNotificationsSpec": AdminScottNotificationsSpec,
    "AdminStarlingSetup": AdminStarlingSetup,
    "AdminStrategicNotes": AdminStrategicNotes,
    "AdminUKNewCICFunding": AdminUKNewCICFunding,
    "AdminUnLtdApplication": AdminUnLtdApplication,
    "AgeReversal": AgeReversal,
    "AllyBridge": AllyBridge,
    "AnimalLoveChamber": AnimalLoveChamber,
    "Artist": Artist,
    "ArtistProfile": ArtistProfile,
    "ArtistSoulCard": ArtistSoulCard,
    "AudioSteganographyDemo": AudioSteganographyDemo,
    "AxiomStoneNetwork": AxiomStoneNetwork,
    "AxiomaticTruth": AxiomaticTruth,
    "BabeCave": BabeCave,
    "Base44Family": Base44Family,
    "Beacon": Beacon,
    "BigIssueFoodRescue": BigIssueFoodRescue,
    "BuildOnUF51": BuildOnUF51,
    "BusinessVault": BusinessVault,
    "CB51AAA": CB51AAA,
    "CB51About": CB51About,
    "CB51AddArtist": CB51AddArtist,
    "CB51BandVote": CB51BandVote,
    "CB51BandVotingDashboard": CB51BandVotingDashboard,
    "CB51Contact": CB51Contact,
    "CB51DraftEmails": CB51DraftEmails,
    "CB51Login": CB51Login,
    "CB51LoginDirect": CB51LoginDirect,
    "CB51NotificationInbox": CB51NotificationInbox,
    "CB51NotificationsSpec": CB51NotificationsSpec,
    "CB51Pricing": CB51Pricing,
    "CB51Privacy": CB51Privacy,
    "CB51Support": CB51Support,
    "CB51TeamManagement": CB51TeamManagement,
    "CB51Terms": CB51Terms,
    "CB51TestPush": CB51TestPush,
    "CICSanctuary": CICSanctuary,
    "COPPACompliance": COPPACompliance,
    "CardCollection": CardCollection,
    "Chakra51": Chakra51,
    "ChampionsOfPeace": ChampionsOfPeace,
    "CircularEconomyProtocol": CircularEconomyProtocol,
    "CleanupFeed": CleanupFeed,
    "Community": Community,
    "ComplianceTracker": ComplianceTracker,
    "ConsciousnessPhysics": ConsciousnessPhysics,
    "ConsciousnessWhitepaper": ConsciousnessWhitepaper,
    "ContactMessages": ContactMessages,
    "CorporateBuyer": CorporateBuyer,
    "CosmicTransmission": CosmicTransmission,
    "CreateBeauty": CreateBeauty,
    "CreateMission": CreateMission,
    "DIYFusionReactor": DIYFusionReactor,
    "DebtConversion": DebtConversion,
    "DebtRelief": DebtRelief,
    "DecompressionChamber": DecompressionChamber,
    "DeployUF51Anywhere": DeployUF51Anywhere,
    "DeviceLabResearch": DeviceLabResearch,
    "DimensionsExplained": DimensionsExplained,
    "DirectFundingRoutes": DirectFundingRoutes,
    "DisasterAI": DisasterAI,
    "DopamineHealing": DopamineHealing,
    "ESGAlignment": ESGAlignment,
    "ESGBridge": ESGBridge,
    "Earth51": Earth51,
    "Earth51Contact": Earth51Contact,
    "Earth51Privacy": Earth51Privacy,
    "Earth51Terms": Earth51Terms,
    "EmergencyCalm": EmergencyCalm,
    "ExtensionManager": ExtensionManager,
    "FairLaunchProtocol": FairLaunchProtocol,
    "FamilyBroadcast": FamilyBroadcast,
    "ForMusicians": ForMusicians,
    "FrequencyBridge": FrequencyBridge,
    "FrequencyChamber": FrequencyChamber,
    "FrequencyHarmonization": FrequencyHarmonization,
    "FrequencyResonanceArticle": FrequencyResonanceArticle,
    "FrequencySession": FrequencySession,
    "FrequencyShare": FrequencyShare,
    "FundTheFamily": FundTheFamily,
    "FunderBrief": FunderBrief,
    "GMTBridge": GMTBridge,
    "GenderEquality": GenderEquality,
    "GenerateLogo": GenerateLogo,
    "GenesisProtocol": GenesisProtocol,
    "GeorgieRonaldo": GeorgieRonaldo,
    "GlobalAccessibilityProtocol": GlobalAccessibilityProtocol,
    "GlobalCurrencyBridge": GlobalCurrencyBridge,
    "GlobalImpact": GlobalImpact,
    "Governance": Governance,
    "GrantOpportunities": GrantOpportunities,
    "HealingDashboard": HealingDashboard,
    "HealingFrequencyFinder": HealingFrequencyFinder,
    "HealingInfo": HealingInfo,
    "HealingJourney": HealingJourney,
    "HealingScience": HealingScience,
    "Home": Home,
    "House51": House51,
    "HowYouEarn": HowYouEarn,
    "HumanSignal": HumanSignal,
    "IToWeTransformation": IToWeTransformation,
    "ImpactVerification": ImpactVerification,
    "InterplanetaryMoney": InterplanetaryMoney,
    "KidneyStoneProtocol": KidneyStoneProtocol,
    "Leaderboard": Leaderboard,
    "LearnGuitar": LearnGuitar,
    "Life51": Life51,
    "Life51Onboarding": Life51Onboarding,
    "Life51ROI": Life51ROI,
    "LifeSignal": LifeSignal,
    "LightningP2P": LightningP2P,
    "Listen": Listen,
    "LoveBridge": LoveBridge,
    "LoveExchange": LoveExchange,
    "MakingItReal": MakingItReal,
    "Map": Map,
    "MeshTechComparison": MeshTechComparison,
    "MeshTechWhitepaper": MeshTechWhitepaper,
    "Milestones": Milestones,
    "Missions": Missions,
    "NewCleanup": NewCleanup,
    "NextGenTech": NextGenTech,
    "NotifyMeCashOut": NotifyMeCashOut,
    "OfflineLibrary": OfflineLibrary,
    "OpenSource": OpenSource,
    "OpenSourceDeclaration": OpenSourceDeclaration,
    "OpenSourceFundingProof": OpenSourceFundingProof,
    "OurCommitment": OurCommitment,
    "P2PFoodRescue": P2PFoodRescue,
    "PRMaterials": PRMaterials,
    "PassItOn": PassItOn,
    "PatientZero": PatientZero,
    "PetSounds51Enterprise": PetSounds51Enterprise,
    "PetSounds51Privacy": PetSounds51Privacy,
    "PetSounds51Story": PetSounds51Story,
    "PetSounds51StripeSetup": PetSounds51StripeSetup,
    "PetSounds51Terms": PetSounds51Terms,
    "Playlists": Playlists,
    "PressRelease2026": PressRelease2026,
    "PrivacyMathematics": PrivacyMathematics,
    "PrivacyPolicy": PrivacyPolicy,
    "ProductionReady": ProductionReady,
    "Prof51": Prof51,
    "Prof51About": Prof51About,
    "Prof51Refund": Prof51Refund,
    "Prof51Tools": Prof51Tools,
    "Prof51ZeroServerArchitecture": Prof51ZeroServerArchitecture,
    "ProfessionalBriefing": ProfessionalBriefing,
    "Profile": Profile,
    "Protocols": Protocols,
    "QuantumAllies": QuantumAllies,
    "QuantumEarth": QuantumEarth,
    "QuantumField": QuantumField,
    "QuantumPayments": QuantumPayments,
    "QuantumSearch": QuantumSearch,
    "Radio": Radio,
    "RealityLibrary": RealityLibrary,
    "RemoveBrokenTracks": RemoveBrokenTracks,
    "RequestAIMusic": RequestAIMusic,
    "RequestFamilySupport": RequestFamilySupport,
    "ResonanceLab": ResonanceLab,
    "SacredArchives": SacredArchives,
    "SacredGeometry": SacredGeometry,
    "SacredMathematics": SacredMathematics,
    "SafeFusion": SafeFusion,
    "SanctuaryBooking": SanctuaryBooking,
    "SanctuaryBroadcast": SanctuaryBroadcast,
    "ScottAI51": ScottAI51,
    "ScottAICoordinatorArchitecture": ScottAICoordinatorArchitecture,
    "ScottAbout": ScottAbout,
    "ScottAccommodation": ScottAccommodation,
    "ScottAddShow": ScottAddShow,
    "ScottArtistHome": ScottArtistHome,
    "ScottBandVote": ScottBandVote,
    "ScottBiggerVision": ScottBiggerVision,
    "ScottCalendar": ScottCalendar,
    "ScottCalendarView": ScottCalendarView,
    "ScottComparison": ScottComparison,
    "ScottContracts": ScottContracts,
    "ScottDemos": ScottDemos,
    "ScottEmailDashboard": ScottEmailDashboard,
    "ScottEmailSyncDiagnostics": ScottEmailSyncDiagnostics,
    "ScottExpenses": ScottExpenses,
    "ScottFeatureRequests": ScottFeatureRequests,
    "ScottFeedback": ScottFeedback,
    "ScottFinanceAdmin": ScottFinanceAdmin,
    "ScottFinancialDashboard": ScottFinancialDashboard,
    "ScottGigOffers": ScottGigOffers,
    "ScottGigPacks": ScottGigPacks,
    "ScottGuestList": ScottGuestList,
    "ScottInsurance": ScottInsurance,
    "ScottInvoices": ScottInvoices,
    "ScottLATrip": ScottLATrip,
    "ScottLabelContacts": ScottLabelContacts,
    "ScottLegalDocs": ScottLegalDocs,
    "ScottLive": ScottLive,
    "ScottLiveAdmin": ScottLiveAdmin,
    "ScottLiveBookings": ScottLiveBookings,
    "ScottLiveLogistics": ScottLiveLogistics,
    "ScottManager": ScottManager,
    "ScottManagerHome": ScottManagerHome,
    "ScottMedia": ScottMedia,
    "ScottMerch": ScottMerch,
    "ScottMessageInbox": ScottMessageInbox,
    "ScottOfflineMode": ScottOfflineMode,
    "ScottPasteGigOffer": ScottPasteGigOffer,
    "ScottPitchMode": ScottPitchMode,
    "ScottProducers": ScottProducers,
    "ScottPublishing": ScottPublishing,
    "ScottSessions": ScottSessions,
    "ScottSessionsRecording": ScottSessionsRecording,
    "ScottSessionsRehearsal": ScottSessionsRehearsal,
    "ScottSessionsWriting": ScottSessionsWriting,
    "ScottSettings": ScottSettings,
    "ScottTeam": ScottTeam,
    "ScottTeamAccess": ScottTeamAccess,
    "ScottToDo": ScottToDo,
    "ScottTravelMode": ScottTravelMode,
    "ScottVisas": ScottVisas,
    "ScottWhiteLabel": ScottWhiteLabel,
    "ScottWhiteLabelPricing": ScottWhiteLabelPricing,
    "ScottWorkLog": ScottWorkLog,
    "ScottZeroServerArchitecture": ScottZeroServerArchitecture,
    "SignDocument": SignDocument,
    "SoulContract": SoulContract,
    "SoulRecalibration": SoulRecalibration,
    "StayOnFrequency": StayOnFrequency,
    "StoneymollanDefense": StoneymollanDefense,
    "SubdomainSetup": SubdomainSetup,
    "SubmitFeedback": SubmitFeedback,
    "SubmitFrequency": SubmitFrequency,
    "SubmitProofOfLove": SubmitProofOfLove,
    "SymbolForge": SymbolForge,
    "TalkToAI51": TalkToAI51,
    "TeacherInput": TeacherInput,
    "Teachers": Teachers,
    "TechScout": TechScout,
    "TechStack": TechStack,
    "TechnicalSpecification": TechnicalSpecification,
    "Terms": Terms,
    "TeslaPeriodicTable": TeslaPeriodicTable,
    "Test": Test,
    "TestAI51": TestAI51,
    "TestGigWorkflow": TestGigWorkflow,
    "TheLoveEconomy": TheLoveEconomy,
    "ThePhysics": ThePhysics,
    "ThePowerOfTwoSouls": ThePowerOfTwoSouls,
    "TheQuantumConnection": TheQuantumConnection,
    "TradeCards": TradeCards,
    "Tuner": Tuner,
    "TunerTogether": TunerTogether,
    "Type1AI51": Type1AI51,
    "UNSDGAlignment": UNSDGAlignment,
    "Universal51": Universal51,
    "UniversalCreatorProtocol": UniversalCreatorProtocol,
    "UniversalDesignProtocol": UniversalDesignProtocol,
    "UniversalDignityProtocol": UniversalDignityProtocol,
    "UniversalFrequencyLibrary": UniversalFrequencyLibrary,
    "UniversalHardwarePenetration": UniversalHardwarePenetration,
    "UniversalLoveTreasury": UniversalLoveTreasury,
    "UniversalPulse": UniversalPulse,
    "UniversalSoulContract": UniversalSoulContract,
    "UniversalWallet": UniversalWallet,
    "UnstoppableArchitecture": UnstoppableArchitecture,
    "UnstoppableProtocol": UnstoppableProtocol,
    "ViralTransmission": ViralTransmission,
    "VisitorsBook": VisitorsBook,
    "Volckano": Volckano,
    "WallOfLove": WallOfLove,
    "WalletDemo": WalletDemo,
    "Welcome": Welcome,
    "WhiteLabelSetup": WhiteLabelSetup,
    "Whitepaper": Whitepaper,
    "Why432Hz": Why432Hz,
    "WhyAllLifeSignal": WhyAllLifeSignal,
    "WhyHelpUF51": WhyHelpUF51,
    "WhyWeStartSimple": WhyWeStartSimple,
    "ZeroEgoProtocol": ZeroEgoProtocol,
    "ZeroPointEnergy": ZeroPointEnergy,
    "ZeroServerScaling": ZeroServerScaling,
    "ProofOfImpactVisual": ProofOfImpactVisual,
}

export const pagesConfig = {
    mainPage: "Welcome",
    Pages: PAGES,
    Layout: __Layout,
};