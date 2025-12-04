import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, AlertTriangle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminCICGrantRiskAssessmentPage() {
    const [copiedSection, setCopiedSection] = useState('');

    const copyToClipboard = (text, sectionName) => {
        navigator.clipboard.writeText(text);
        setCopiedSection(sectionName);
        setTimeout(() => setCopiedSection(''), 2000);
    };

    const riskAssessmentData = {
        projectTitle: "Fair Payment for Scottish Musicians: Loch Lomond Pilot",
        startDate: "20th January 2025 (amended from previous date)",
        
        risks: [
            {
                id: 1,
                risk: "Low musician turnout / engagement",
                likelihood: "AMBER",
                impact: "AMBER",
                score: "AMBER",
                mitigation: `- Direct outreach to local musicians through existing networks
- Partnership with Friends of Loch Lomond and community groups
- Clear communication of fair payment model (90% to artists)
- Pilot phase allows for adjustment before full rollout
- Personal connections in local music community (Stoneymollan resident)`,
                residualRisk: "GREEN - With direct outreach and fair payment model, engagement is likely. Pilot scale means we can adapt quickly."
            },
            {
                id: 2,
                risk: "Technical platform issues preventing payments",
                likelihood: "AMBER",
                impact: "RED",
                score: "RED",
                mitigation: `- Platform already built and tested (UF51.LOVE operational since 2024)
- Base44 infrastructure provides enterprise-grade reliability
- Manual payment backup option via direct bank transfer if technical issues occur
- Small pilot scale (10-20 musicians initially) allows for controlled testing
- Technical support available from platform developer (BRO51)`,
                residualRisk: "AMBER - Platform is proven, but pilot phase allows us to identify and fix any payment flow issues before scaling."
            },
            {
                id: 3,
                risk: "Public health / weather preventing outdoor performances",
                likelihood: "AMBER",
                impact: "AMBER",
                score: "AMBER",
                mitigation: `- Project timeline (Jan 2025 onwards) allows for seasonal flexibility
- Not dependent on outdoor performances only - studio recordings also qualify
- Digital platform means musicians can submit work remotely
- Pilot can be extended if weather significantly impacts timeline
- Indoor venue options available (community halls, pubs, etc.)`,
                residualRisk: "GREEN - Project design is flexible and not weather-dependent."
            },
            {
                id: 4,
                risk: "Insufficient community awareness of the initiative",
                likelihood: "AMBER",
                impact: "AMBER",
                score: "AMBER",
                mitigation: `- Local media outreach (Dumbarton Reporter, Loch Lomond Radio)
- Social media campaign targeting West Dunbartonshire
- Physical posters in community spaces (Balloch, Alexandria, Stoneymollan)
- Word of mouth through existing community networks
- Partnership promotion through Friends of Loch Lomond`,
                residualRisk: "GREEN - Multi-channel approach ensures local awareness."
            },
            {
                id: 5,
                risk: "Fraud / misuse of payment system",
                likelihood: "GREEN",
                impact: "AMBER",
                score: "GREEN",
                mitigation: `- AI + human verification of all submissions
- Small pilot scale makes fraud detection straightforward
- Community verification layer (local musicians verify each other)
- Payment records transparent and auditable
- Cryptographic proof of all transactions (blockchain-based)`,
                residualRisk: "GREEN - Multiple verification layers make fraud highly unlikely in pilot phase."
            },
            {
                id: 6,
                risk: "Budget insufficient to sustain fair payment model",
                likelihood: "AMBER",
                impact: "RED",
                score: "RED",
                mitigation: `- Pilot phase is deliberately small-scale (£5,000-£10,000 budget)
- Clear cost projections: £50-£100 per musician per submission
- 90% to artists, 10% to platform maintenance is sustainable model
- Additional funding applications in progress (Scottish Enterprise)
- Revenue model (10% platform fee) designed to be self-sustaining long-term
- Can scale pilot down if initial budget overruns`,
                residualRisk: "AMBER - Pilot budget is realistic, but we'll monitor spending closely and scale appropriately."
            }
        ]
    };

    const copyFullAssessment = () => {
        const fullText = `
CREATIVE SCOTLAND RISK ASSESSMENT
Project: ${riskAssessmentData.projectTitle}
Amended Start Date: ${riskAssessmentData.startDate}

RISK ASSESSMENT SUMMARY:
Total Risks Identified: ${riskAssessmentData.risks.length}
RED Risks (require action): 2
AMBER Risks (manageable): 4
GREEN Risks (minimal): 0

After mitigation, all risks reduced to AMBER or GREEN.

---

${riskAssessmentData.risks.map((risk, index) => `
RISK ${risk.id}: ${risk.risk}

Likelihood: ${risk.likelihood}
Impact: ${risk.impact}
Overall Score: ${risk.score}

Control Measures / Mitigation:
${risk.mitigation}

Residual Risk After Mitigation: ${risk.residualRisk}

---
`).join('\n')}

OVERALL ASSESSMENT:
This project has been designed with risk mitigation built into its core structure:
- Small pilot scale allows for controlled testing
- Multiple verification layers prevent fraud
- Flexible timeline accommodates weather/health challenges
- Proven technology platform reduces technical risk
- Strong community connections ensure engagement

All identified risks have clear, practical mitigation strategies. The pilot phase approach means we can adapt quickly to any unexpected challenges.

Signed: Brian Hughes (Project Lead)
Date: ${new Date().toLocaleDateString('en-GB')}
        `.trim();

        navigator.clipboard.writeText(fullText);
        setCopiedSection('full');
        setTimeout(() => setCopiedSection(''), 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-8">
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <Shield className="w-20 h-20 mx-auto text-green-400" style={{ filter: 'drop-shadow(0 0 20px #22d3ee)' }} />
                    <h1 className="text-5xl font-black">CREATIVE SCOTLAND RISK ASSESSMENT</h1>
                    <p className="text-xl text-gray-300">Pre-filled for your Loch Lomond Musicians project</p>
                    <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-4 max-w-2xl mx-auto">
                        <p className="text-green-300 font-bold">✅ Ready to copy and paste into their form</p>
                        <p className="text-sm text-gray-300 mt-2">I've done the paperwork. You just copy it. Easy.</p>
                    </div>
                </motion.div>

                <Card className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-2 border-purple-500/50">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-gray-300">
                        <p><strong className="text-white">Project Title:</strong> {riskAssessmentData.projectTitle}</p>
                        <p><strong className="text-white">Amended Start Date:</strong> {riskAssessmentData.startDate}</p>
                        <p><strong className="text-white">Risk Assessment Method:</strong> Traffic Light System (Creative Scotland template)</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-900/40 to-blue-900/40 border-2 border-green-500/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-2xl text-white">FULL RISK ASSESSMENT (Copy All)</CardTitle>
                        <Button
                            onClick={copyFullAssessment}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {copiedSection === 'full' ? (
                                <>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy All
                                </>
                            )}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-400 mb-4">
                            Click "Copy All" above to copy the complete risk assessment in one go.
                            Or copy individual risks below if you need to adjust anything.
                        </p>
                    </CardContent>
                </Card>

                {riskAssessmentData.risks.map((risk, index) => (
                    <motion.div
                        key={risk.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Card className={`bg-black/40 border-2 ${
                            risk.score === 'RED' ? 'border-red-500/50' :
                            risk.score === 'AMBER' ? 'border-yellow-500/50' :
                            'border-green-500/50'
                        }`}>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className={`w-6 h-6 ${
                                        risk.score === 'RED' ? 'text-red-400' :
                                        risk.score === 'AMBER' ? 'text-yellow-400' :
                                        'text-green-400'
                                    }`} />
                                    <div>
                                        <CardTitle className="text-xl text-white">RISK {risk.id}: {risk.risk}</CardTitle>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Likelihood: {risk.likelihood} | Impact: {risk.impact} | Score: <strong className={
                                                risk.score === 'RED' ? 'text-red-400' :
                                                risk.score === 'AMBER' ? 'text-yellow-400' :
                                                'text-green-400'
                                            }>{risk.score}</strong>
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => copyToClipboard(`
RISK ${risk.id}: ${risk.risk}

Likelihood: ${risk.likelihood}
Impact: ${risk.impact}
Overall Score: ${risk.score}

Control Measures / Mitigation:
${risk.mitigation}

Residual Risk After Mitigation: ${risk.residualRisk}
                                    `.trim(), `risk${risk.id}`)}
                                    className="bg-cyan-600 hover:bg-cyan-700"
                                    size="sm"
                                >
                                    {copiedSection === `risk${risk.id}` ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4 mr-2" />
                                            Copy
                                        </>
                                    )}
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="text-white font-bold mb-2">Control Measures / Mitigation:</h4>
                                    <pre className="whitespace-pre-wrap text-sm text-gray-300 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
{risk.mitigation}
                                    </pre>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-2">Residual Risk After Mitigation:</h4>
                                    <p className="text-gray-300 text-sm bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                        {risk.residualRisk}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}

                <Card className="bg-gradient-to-r from-cyan-900/40 to-green-900/40 border-2 border-cyan-500/50">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">Overall Assessment Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-gray-300">
                        <p className="text-lg">
                            <strong className="text-white">Total Risks Identified:</strong> {riskAssessmentData.risks.length}
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3">
                                <p className="text-3xl font-black text-red-400">2</p>
                                <p className="text-sm text-red-300">RED (before mitigation)</p>
                            </div>
                            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-3">
                                <p className="text-3xl font-black text-yellow-400">4</p>
                                <p className="text-sm text-yellow-300">AMBER (manageable)</p>
                            </div>
                            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-3">
                                <p className="text-3xl font-black text-green-400">0</p>
                                <p className="text-sm text-green-300">GREEN (minimal)</p>
                            </div>
                        </div>
                        <div className="p-4 bg-green-900/30 border-l-4 border-green-400">
                            <p className="font-bold text-green-300 mb-2">After Mitigation:</p>
                            <p className="text-sm">All risks reduced to AMBER or GREEN. No unmanaged RED risks remain.</p>
                        </div>
                        <p className="text-sm italic">
                            This project has been designed with risk mitigation built into its core structure. 
                            The pilot phase approach means we can adapt quickly to any unexpected challenges.
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-2 border-pink-500/50">
                    <CardContent className="p-6 text-center">
                        <h3 className="text-2xl font-black text-white mb-4">DONE. ✓</h3>
                        <p className="text-gray-300 mb-4">
                            1. Copy the full assessment (green button at top)<br />
                            2. Paste into Creative Scotland's form<br />
                            3. Email Niamh Kelly with amended start date<br />
                            4. Done. No paperwork hell.
                        </p>
                        <p className="text-lg text-pink-400 font-bold">
                            You're welcome ya dick ❤️
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}