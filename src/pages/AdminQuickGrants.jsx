import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Copy, CheckCircle, ExternalLink, DollarSign, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminQuickGrantsPage() {
  const [copiedSection, setCopiedSection] = useState(null);

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const companyDetails = {
    name: "UNIVERSAL FREQUENCY51 CIC",
    number: "SC870603",
    incorporationDate: "19 November 2025",
    type: "Community Interest Company (CIC)",
    registeredAddress: "Upper Stoneymollan Cottage, Upper Stoneymollan Road, Alexandria, Scotland, GB3 8QU",
    directors: "Brian Hughes, Gillian Barbara Brown",
    contactEmail: "family@uf51.love"
  };

  const mission = `We incentivize environmental healing by rewarding verified cleanup actions with our love currency ($P51). Users photograph litter removal, AI verifies it, and they earn tokens instantly. We also provide free lossless music streaming (FLAC/WAV) where artists keep 90%, and free medical-grade healing frequencies for conditions like tinnitus, anxiety, and sleep disorders. 10% of all value flows to humanitarian missions.`;

  const quickGrants = [
    {
      name: "Scotmid Community Grant",
      amount: "Up to £500",
      deadline: "Rolling",
      url: "https://www.scotmid.coop/community/community-grant/",
      difficulty: "⭐ EASY",
      estimatedTime: "15 mins",
      autofill: {
        organizationName: companyDetails.name,
        organizationType: companyDetails.type,
        address: companyDetails.registeredAddress,
        contact: companyDetails.contactEmail,
        projectDescription: "Environmental cleanup incentive program across Scotland. Community members photograph litter removal, receive instant verification via AI, and earn rewards. Targets urban areas with high litter accumulation (parks, streets, waterways). All waste is properly disposed of or recycled. Project creates measurable environmental impact while building community engagement.",
        howFundsUsed: "Grant will fund: (1) AI verification infrastructure costs, (2) Reward pool for community participants, (3) Educational materials on proper waste disposal and recycling. Expected outcome: removal of 500+ kg litter from Scottish communities within 6 months.",
        beneficiaries: "Local communities across Scotland, particularly urban areas. Direct benefit to residents through cleaner public spaces. Secondary benefit to councils through reduced cleanup costs.",
        amountRequested: "£500"
      }
    },
    {
      name: "Action Earth Volunteering Matters",
      amount: "£50-£250",
      deadline: "Rolling",
      url: "https://volunteeringmatters.org.uk/opportunity/action-earth-grants/",
      difficulty: "⭐ EASY",
      estimatedTime: "10 mins",
      autofill: {
        organizationName: companyDetails.name,
        projectTitle: "Urban Greenspace Cleanup Initiative - West Dunbartonshire",
        projectDescription: "Community-led litter cleanup targeting urban greenspaces in Alexandria and surrounding areas. Using smartphone technology, volunteers photograph before/after cleanup efforts, receive instant verification, and earn recognition. Focus on parks, pathways, and community spaces.",
        volunteersInvolved: "15+ volunteers",
        environmentalImpact: "Target: 100kg+ litter removed from urban greenspaces. Improves biodiversity by removing plastic waste from natural habitats. Creates cleaner, safer public spaces for families.",
        amountRequested: "£250"
      }
    },
    {
      name: "West Dunbartonshire Climate Fund",
      amount: "£500-£2,000",
      deadline: "Check council website",
      url: "https://www.west-dunbarton.gov.uk/",
      difficulty: "⭐⭐ MODERATE",
      estimatedTime: "30 mins",
      autofill: {
        organizationName: companyDetails.name,
        companyNumber: companyDetails.number,
        address: companyDetails.registeredAddress,
        projectTitle: "Community Climate Action Through Litter Reduction",
        projectDescription: "Innovative climate action program addressing plastic pollution and waste reduction in West Dunbartonshire. Participants use mobile technology to document and verify litter cleanup actions, creating accountability and measurable impact. System incentivizes regular participation, building long-term behavior change.",
        climateImpact: "Reduces plastic entering waterways (→ Loch Lomond ecosystem protection). Prevents microplastic pollution. Diverts waste from landfill. Builds community climate awareness and action.",
        targetArea: "Alexandria, Clydebank, Dumbarton",
        participantsExpected: "50+ active participants in first 6 months",
        amountRequested: "£1,500"
      }
    },
    {
      name: "NESCAN LEAF Fund",
      amount: "Up to £3,000",
      deadline: "Check NESCAN website",
      url: "https://nescan.org/",
      difficulty: "⭐⭐ MODERATE",
      estimatedTime: "45 mins",
      autofill: {
        organizationName: companyDetails.name,
        projectTitle: "Technology-Enabled Environmental Action Network",
        projectDescription: "Building community-led environmental action through verified cleanup initiatives. Combines mobile technology, AI verification, and community recognition to create sustainable behavior change. Participants document litter removal, receive instant feedback, and contribute to measurable environmental impact data.",
        environmentalGoals: "Remove 500kg+ litter from Scottish communities. Protect local waterways and green spaces. Build lasting environmental stewardship habits. Create open data on litter hotspots for council planning.",
        communityEngagement: "Open to all community members. No barriers to entry. Mobile-first design ensures accessibility. Builds intergenerational participation through gamification and recognition.",
        sustainability: "Self-sustaining model: system operates digitally with minimal overhead. Participant incentives funded through diverse revenue streams (music streaming, partnerships). Open-source model enables replication.",
        amountRequested: "£3,000"
      }
    },
    {
      name: "Scottish Forestry Community Fund",
      amount: "£1,000+",
      deadline: "Check Scottish Forestry website",
      url: "https://forestry.gov.scot/support-regulations/grants-and-regulations/community-asset-ownership",
      difficulty: "⭐⭐⭐ DETAILED",
      estimatedTime: "60 mins",
      autofill: {
        organizationName: companyDetails.name,
        projectTitle: "Woodland and Forest Path Cleanup Initiative",
        projectDescription: "Community program targeting litter accumulation in woodland areas, forest paths, and rural greenspaces. Combines traditional volunteering with modern verification technology. Participants photograph cleanup efforts, receive AI verification, and contribute to environmental data collection for forestry planning.",
        forestryConnection: "Protects woodland ecosystems from plastic pollution. Improves visitor experience on forest paths. Supports Scottish Forestry goals of accessible, clean natural spaces. Creates community connection to local woodlands.",
        communityBenefit: "Cleaner, safer woodland access. Protects biodiversity. Builds environmental awareness. Creates opportunities for families to engage with nature.",
        partnerships: "Open to partnership with Scottish Forestry, local councils, and conservation groups. Data sharing on litter hotspots. Potential for volunteer coordination.",
        amountRequested: "£1,500"
      }
    }
  ];

  const bankComparison = [
    {
      name: "REVOLUT BUSINESS",
      rating: "⭐⭐⭐⭐⭐ BEST",
      pros: [
        "Fast CIC account setup (1-2 weeks)",
        "API access → automate Stripe integration",
        "Multi-currency (for international missions)",
        "Low international transfer fees",
        "Real-time accounting",
        "Virtual cards for team spending"
      ],
      cons: [
        "Online-only (no physical branches)",
        "Some grant funders prefer traditional banks"
      ],
      verdict: "Perfect for UF51. Tech-forward, API-driven, international-ready."
    },
    {
      name: "MONZO BUSINESS",
      rating: "⭐⭐⭐ GOOD",
      pros: [
        "UK-focused (good for local grants)",
        "Simple interface",
        "Good customer support",
        "Integrates with accounting software"
      ],
      cons: [
        "No API access",
        "Expensive international transfers",
        "Limited multi-currency",
        "Slower CIC setup process"
      ],
      verdict: "Good for UK-only operations. Not ideal for international missions."
    },
    {
      name: "STARLING BANK",
      rating: "⭐⭐⭐⭐ VERY GOOD",
      pros: [
        "CIC-friendly",
        "API access available",
        "Good for grants (traditional bank feel)",
        "Multi-user access"
      ],
      cons: [
        "International transfers expensive",
        "Slower than Revolut"
      ],
      verdict: "Solid backup option. Good hybrid of traditional + modern."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Zap className="w-12 h-12 text-yellow-400" style={{ filter: 'drop-shadow(0 0 20px #facc15)' }} />
            <h1 className="text-4xl font-black">QUICK WIN GRANTS</h1>
          </div>
          <p className="text-yellow-400 text-lg font-bold">
            Auto-filled applications → Copy/paste → Submit → Get £££
          </p>
          <p className="text-gray-400 text-sm">
            SC870603 unlocked this. Let's get funded.
          </p>
        </div>

        {/* BANK COMPARISON */}
        <Card className="bg-gradient-to-br from-green-900/40 to-cyan-900/40 border-2 border-green-500">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-400" />
              <h2 className="text-2xl font-black">BEST BANK FOR CIC</h2>
            </div>

            {bankComparison.map((bank, idx) => (
              <div key={idx} className={`bg-black/60 rounded-xl p-6 border-2 ${idx === 0 ? 'border-green-500' : 'border-gray-600'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-white">{bank.name}</h3>
                  <span className="text-sm font-bold text-yellow-400">{bank.rating}</span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-green-400 font-bold mb-2">✅ PROS</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {bank.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-red-400 font-bold mb-2">⚠️ CONS</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {bank.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-400">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-3">
                  <p className="text-sm text-purple-300">
                    <strong>VERDICT:</strong> {bank.verdict}
                  </p>
                </div>
              </div>
            ))}

            <div className="bg-green-900/40 border-2 border-green-500 rounded-xl p-4 text-center">
              <p className="text-green-300 font-black text-lg">
                🏆 WINNER: REVOLUT BUSINESS
              </p>
              <p className="text-sm text-gray-300 mt-2">
                API access + international + fast = perfect for UF51 scaling
              </p>
            </div>
          </CardContent>
        </Card>

        {/* GRANTS */}
        {quickGrants.map((grant, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-2 border-purple-500">
              <CardContent className="p-6 space-y-4">
                
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">{grant.name}</h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-green-400 font-bold text-lg">{grant.amount}</span>
                      <span className="text-yellow-400 text-sm">{grant.difficulty}</span>
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {grant.estimatedTime}
                      </span>
                    </div>
                  </div>
                  <a 
                    href={grant.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm"
                  >
                    Apply <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="bg-black/60 rounded-xl p-4 border border-purple-500/30 space-y-3">
                  <p className="text-purple-400 font-bold text-sm">📋 AUTO-FILLED ANSWERS</p>
                  
                  {Object.entries(grant.autofill).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400 font-mono uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <button
                          onClick={() => copyToClipboard(value, `${idx}-${key}`)}
                          className="text-cyan-400 hover:text-cyan-300 text-xs flex items-center gap-1"
                        >
                          {copiedSection === `${idx}-${key}` ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-gray-900/50 rounded p-2 text-sm text-gray-300 border border-gray-700">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      const fullText = Object.entries(grant.autofill)
                        .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').trim()}:\n${value}\n`)
                        .join('\n');
                      copyToClipboard(fullText, `full-${idx}`);
                    }}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All
                  </Button>
                  <a href={grant.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  </a>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* TIPS */}
        <Card className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-2xl font-black text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              TIPS FOR SUCCESS
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Start with Scotmid + Action Earth (easiest, rolling deadlines)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Attach certificate of incorporation (received via email from Companies House)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Use Revolut bank details once account is open (shows legitimacy)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Apply to multiple at once - grants aren't exclusive</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Personalize slightly - don't paste word-for-word (shows effort)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}