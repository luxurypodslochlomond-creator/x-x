
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, Mail, Send, Copy, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function AdminCICCreativeScotlandRiskPage() {
    const [user, setUser] = React.useState(null);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
        base44.auth.me().then(u => setUser(u)).catch(() => {});
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const handleCopyAllText = () => {
        const textContent = `
RISK ASSESSMENT - SIMPLE MODEL
Creative Scotland Open Fund for Individuals

PROJECT DETAILS
Project Title: Fair Payment for Scottish Musicians: Loch Lomond Pilot
Applicant Name: Brian Hughes
Application Reference: CS-OFI-31740-2FE3
Start Date: 20th January 2026
Funding Requested: £4,800

How to Assess Risk:
In the grid below you will find a 'traffic light' system for assessing risk:
• RED – this risk might threaten my project being delivered successfully and/or safely
• AMBER – this risk is not a threat to safety. It might make my project more difficult to deliver
• GREEN – this risk would not threaten my project being delivered and is not a threat to safety

RISK ASSESSMENT

RISK 1: Low musician turnout / engagement
Initial Risk Level: AMBER
This risk might make my project more difficult to deliver. But it is not probable that the risk will occur.

How I will control this risk:
• Direct outreach to local musicians through existing networks
• Partnership with Friends of Loch Lomond and community groups
• Clear communication of fair payment model (90% to artists)
• Pilot phase allows for adjustment before full rollout
• Personal connections in local music community (Stoneymollan resident)

Residual Risk Level: GREEN
With direct outreach and fair payment model, engagement is likely. Pilot scale means we can adapt quickly.

---

RISK 2: Payment system issues preventing artists receiving funds
Initial Risk Level: RED
This risk might threaten my project being delivered successfully. However, I have measures in place to reduce this risk.

How I will control this risk:
• Payment system already built and tested with reliable web infrastructure
• Manual payment backup option via direct bank transfer if technical issues occur
• Small pilot scale (10-20 musicians initially) allows for controlled testing
• I have experience managing online payment systems and can troubleshoot issues
• Partnership with established payment providers (Revolut/Stripe) for reliability

Residual Risk Level: AMBER
System is functional, but pilot phase allows us to identify and fix any payment flow issues before scaling.

---

RISK 3: Public health / weather preventing outdoor performances
Initial Risk Level: AMBER
This risk might make delivery more challenging but is manageable.

How I will control this risk:
• Project timeline (Jan 2026 onwards) allows for seasonal flexibility
• Not dependent on outdoor performances only - studio recordings also qualify
• Online submission system means musicians can submit work remotely
• Pilot can be extended if weather significantly impacts timeline
• Indoor venue options available (community halls, pubs, etc.)

Residual Risk Level: GREEN
Project design is flexible and not weather-dependent.

---

RISK 4: Insufficient community awareness of the initiative
Initial Risk Level: AMBER
This risk might reduce initial participation but can be mitigated through outreach.

How I will control this risk:
• Local media outreach (Dumbarton Reporter, Loch Lomond Radio)
• Social media campaign targeting West Dunbartonshire
• Physical posters in community spaces (Balloch, Alexandria, Stoneymollan)
• Word of mouth through existing community networks
• Partnership promotion through Friends of Loch Lomond

Residual Risk Level: GREEN
Multi-channel approach ensures local awareness.

---

RISK 5: Fraud / misuse of payment system
Initial Risk Level: GREEN
This risk is minimal and well-controlled from the start.

How I will control this risk:
• Automated + manual verification of all submissions
• Small pilot scale makes fraud detection straightforward
• Community verification layer (local musicians verify each other)
• Payment records transparent and auditable
• Secure record-keeping of all transactions

Residual Risk Level: GREEN
Multiple verification layers make fraud highly unlikely in pilot phase.

---

RISK 6: Budget insufficient to sustain fair payment model
Initial Risk Level: AMBER
This risk could impact project sustainability, but is manageable with careful planning.

How I will control this risk:
• Pilot phase budget: £4,800 from Creative Scotland Open Fund
• Clear cost projections: £50-£100 per musician per submission
• 90% to artists, 10% to admin/maintenance is sustainable model
• Can scale pilot down if budget requires (fewer initial participants)
• Revenue model (10% admin fee) designed to be self-sustaining long-term
• No other large funding applications active - this is our focused start

Residual Risk Level: GREEN
£4,800 budget is realistic for 10-20 musicians in pilot phase. Careful spending ensures project success.

---

OVERALL ASSESSMENT
This project has been designed with risk mitigation built into its core structure:
• Small pilot scale allows for controlled testing
• Multiple verification layers prevent fraud
• Flexible timeline accommodates weather/health challenges
• Proven payment system reduces delivery risk
• Strong community connections ensure engagement

All identified risks have clear, practical mitigation strategies. The pilot phase approach means we can adapt quickly to any unexpected challenges.

Signed: Brian Hughes (Project Lead)
Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        `;

        navigator.clipboard.writeText(textContent.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleOneClickMagic = async () => {
        setIsGenerating(true);
        await new Promise(resolve => setTimeout(resolve, 100));
        window.print();
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const subject = encodeURIComponent('Creative Scotland Risk Assessment - READY TO SUBMIT');
        const body = encodeURIComponent(`Hey Niamh,

Here's the risk assessment for my Creative Scotland Open Fund application (CS-OFI-31740-2FE3).

Project: Fair Payment for Scottish Musicians - Loch Lomond Pilot
Start Date: 20th January 2026

I've attached the risk assessment PDF.

Looking forward to moving to full assessment!

Best,
Brian Hughes
brian@uf51.love
07494023328`);

        window.location.href = `mailto:niamh.kelly@creativescotland.com?subject=${subject}&body=${body}`;
        setIsGenerating(false);
    };

    return (
        <>
            <style>{`
                @media print {
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                    }
                    
                    body, html {
                        background: white !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                        height: auto !important;
                    }
                    
                    .no-print, header, nav, aside, footer {
                        display: none !important;
                    }
                    
                    main {
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    
                    .printable-content {
                        display: block !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        position: relative !important;
                        background: white !important;
                        color: black !important;
                        width: 100% !important;
                        padding: 20mm !important;
                    }
                    
                    .printable-content * {
                        visibility: visible !important;
                        opacity: 1 !important;
                        color: black !important;
                        background: white !important;
                        border-color: #333 !important;
                    }
                    
                    @page {
                        margin: 20mm;
                        size: A4 portrait;
                    }
                }
            `}</style>

            <div className="min-h-screen bg-white text-black p-4 md:p-12">
                
                {/* GIANT COPY BUTTON */}
                <div className="no-print mb-8">
                    <Card className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-4 border-cyan-500">
                        <CardContent className="p-8 text-center">
                            {copied ? (
                                <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-4" />
                            ) : (
                                <Copy className="w-20 h-20 mx-auto text-cyan-500 mb-4" style={{ filter: 'drop-shadow(0 0 10px #06b6d4)' }} />
                            )}
                            <h2 className="text-3xl font-black text-cyan-700 mb-3">
                                {copied ? '✅ COPIED!' : 'FOOLPROOF METHOD'}
                            </h2>
                            <p className="text-gray-700 mb-6 text-lg">
                                {copied ? 'Now paste into Word/Google Docs and save as PDF' : 'Click button → Paste into Word/Google Docs → Save as PDF'}
                            </p>
                            <Button
                                onClick={handleCopyAllText}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white font-black py-8 px-12 text-2xl"
                            >
                                {copied ? 'COPIED ✓' : <><Copy className="w-6 h-6 mr-3" /> COPY ALL TEXT</>}
                            </Button>
                            {copied && (
                                <div className="mt-6 bg-green-100 border-2 border-green-500 rounded-xl p-4">
                                    <p className="font-bold text-green-900">NOW:</p>
                                    <ol className="text-left text-green-800 space-y-1 mt-2">
                                        <li>1. Open Word or Google Docs</li>
                                        <li>2. Paste (CMD+V or CTRL+V)</li>
                                        <li>3. File → Save as PDF</li>
                                        <li>4. Done!</li>
                                    </ol>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* BACKUP: One-Click Magic */}
                <div className="no-print mb-8">
                    <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-4 border-green-500">
                        <CardContent className="p-8 text-center">
                            <Send className="w-20 h-20 mx-auto text-green-500 mb-4" style={{ filter: 'drop-shadow(0 0 10px #22c55e)' }} />
                            <h2 className="text-3xl font-black text-green-700 mb-3">OR: One-Click Print Method</h2>
                            <p className="text-gray-700 mb-6 text-lg">
                                Click button below, then in print dialog → "PDF" (bottom left) → "Save as PDF"
                            </p>
                            <Button
                                onClick={handleOneClickMagic}
                                disabled={isGenerating}
                                className="bg-green-600 hover:bg-green-700 text-white font-black py-8 px-12 text-2xl"
                            >
                                {isGenerating ? 'Working...' : '🖨️ PRINT TO PDF'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* BACKUP MANUAL BUTTONS */}
                <div className="no-print mb-8">
                    <details className="bg-gray-100 rounded-xl p-4">
                        <summary className="cursor-pointer font-bold text-gray-700">
                            ⚙️ Manual Steps (if needed)
                        </summary>
                        <div className="flex gap-4 mt-4">
                            <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                                <Printer className="w-5 h-5 mr-2" />
                                Step 1: Print
                            </Button>
                            <Button 
                                onClick={() => {
                                    const subject = encodeURIComponent('Creative Scotland Risk Assessment - READY TO SUBMIT');
                                    const body = encodeURIComponent(`Hey Niamh,

Here's the risk assessment for my Creative Scotland Open Fund application (CS-OFI-31740-2FE3).

Project: Fair Payment for Scottish Musicians - Loch Lomond Pilot
Start Date: 20th January 2026

I've attached the completed risk assessment template.

Looking forward to moving to full assessment!

Best,
Brian Hughes
brian@uf51.love
07494023328`);
                                    window.location.href = `mailto:niamh.kelly@creativescotland.com?subject=${subject}&body=${body}`;
                                }}
                                className="bg-green-600 hover:bg-green-700 text-white flex-1"
                            >
                                <Mail className="w-5 h-5 mr-2" />
                                Step 2: Open Email
                            </Button>
                        </div>
                    </details>
                </div>

                {/* PRINTABLE CONTENT */}
                <div className="printable-content">
                    <div className="space-y-8">
                        {/* HEADER */}
                        <div className="text-center mb-12">
                            <h1 className="text-3xl font-bold mb-2">RISK ASSESSMENT - SIMPLE MODEL</h1>
                            <p className="text-xl text-gray-700">Creative Scotland Open Fund for Individuals</p>
                        </div>

                        {/* PROJECT DETAILS */}
                        <Card className="border-2 border-gray-300">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold mb-4">PROJECT DETAILS</h2>
                                <div className="space-y-2">
                                    <p><strong>Project Title:</strong> Fair Payment for Scottish Musicians: Loch Lomond Pilot</p>
                                    <p><strong>Applicant Name:</strong> Brian Hughes</p>
                                    <p><strong>Application Reference:</strong> CS-OFI-31740-2FE3</p>
                                    <p><strong>Start Date:</strong> 20th January 2026</p>
                                    <p><strong>Funding Requested:</strong> £4,800</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* EXPLANATION */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                            <h3 className="font-bold mb-2">How to Assess Risk:</h3>
                            <p className="mb-4">In the grid below you will find a 'traffic light' system for assessing risk:</p>
                            <ul className="space-y-2 ml-6 list-disc">
                                <li><strong className="text-red-600">RED</strong> – this risk might threaten my project being delivered successfully and/or safely</li>
                                <li><strong className="text-amber-600">AMBER</strong> – this risk is not a threat to safety. It might make my project more difficult to deliver</li>
                                <li><strong className="text-green-600">GREEN</strong> – this risk would not threaten my project being delivered and is not a threat to safety</li>
                            </ul>
                        </div>

                        {/* RISK ASSESSMENT TABLE */}
                        <Card className="border-2 border-gray-300">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold mb-6">RISK ASSESSMENT</h2>

                                {/* RISK 1 */}
                                <div className="mb-8 pb-8 border-b-2 border-gray-200">
                                    <div className="bg-amber-100 p-4 rounded mb-4">
                                        <h3 className="font-bold text-lg">RISK 1: Low musician turnout / engagement</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-bold">Initial Risk Level: <span className="text-amber-600">AMBER</span></p>
                                            <p className="text-sm text-gray-600">This risk might make my project more difficult to deliver. But it is not probable that the risk will occur.</p>
                                        </div>
                                        <div>
                                            <p className="font-bold mb-2">How I will control this risk:</p>
                                            <ul className="list-disc ml-6 space-y-1 text-sm">
                                                <li>Direct outreach to local musicians through existing networks</li>
                                                <li>Partnership with Friends of Loch Lomond and community groups</li>
                                                <li>Clear communication of fair payment model (90% to artists)</li>
                                                <li>Pilot phase allows for adjustment before full rollout</li>
                                                <li>Personal connections in local music community (Stoneymollan resident)</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-bold">Residual Risk Level: <span className="text-green-600">GREEN</span></p>
                                            <p className="text-sm text-gray-600">With direct outreach and fair payment model, engagement is likely. Pilot scale means we can adapt quickly.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* RISK 2 */}
                                <div className="mb-8 pb-8 border-b-2 border-gray-200">
                                    <div className="bg-red-100 p-4 rounded mb-4">
                                        <h3 className="font-bold text-lg">RISK 2: Payment system issues preventing artists receiving funds</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-bold">Initial Risk Level: <span className="text-red-600">RED</span></p>
                                            <p className="text-sm text-gray-600">This risk might threaten my project being delivered successfully. However, I have measures in place to reduce this risk.</p>
                                        </div>
                                        <div>
                                            <p className="font-bold mb-2">How I will control this risk:</p>
                                            <ul className="list-disc ml-6 space-y-1 text-sm">
                                                <li>Payment system already built and tested with reliable web infrastructure</li>
                                                <li>Manual payment backup option via direct bank transfer if technical issues occur</li>
                                                <li>Small pilot scale (10-20 musicians initially) allows for controlled testing</li>
                                                <li>I have experience managing online payment systems and can troubleshoot issues</li>
                                                <li>Partnership with established payment providers (Revolut/Stripe) for reliability</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-bold">Residual Risk Level: <span className="text-amber-600">AMBER</span></p>
                                            <p className="text-sm text-gray-600">System is functional, but pilot phase allows us to identify and fix any payment flow issues before scaling.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* RISK 3 */}
                                <div className="mb-8 pb-8 border-b-2 border-gray-200">
                                    <div className="bg-amber-100 p-4 rounded mb-4">
                                        <h3 className="font-bold text-lg">RISK 3: Public health / weather preventing outdoor performances</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-bold">Initial Risk Level: <span className="text-amber-600">AMBER</span></p>
                                            <p className="text-sm text-gray-600">This risk might make delivery more challenging but is manageable.</p>
                                        </div>
                                        <div>
                                            <p className="font-bold mb-2">How I will control this risk:</p>
                                            <ul className="list-disc ml-6 space-y-1 text-sm">
                                                <li>Project timeline (Jan 2026 onwards) allows for seasonal flexibility</li>
                                                <li>Not dependent on outdoor performances only - studio recordings also qualify</li>
                                                <li>Online submission system means musicians can submit work remotely</li>
                                                <li>Pilot can be extended if weather significantly impacts timeline</li>
                                                <li>Indoor venue options available (community halls, pubs, etc.)</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-bold">Residual Risk Level: <span className="text-green-600">GREEN</span></p>
                                            <p className="text-sm text-gray-600">Project design is flexible and not weather-dependent.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* RISK 4 */}
                                <div className="mb-8 pb-8 border-b-2 border-gray-200">
                                    <div className="bg-amber-100 p-4 rounded mb-4">
                                        <h3 className="font-bold text-lg">RISK 4: Insufficient community awareness of the initiative</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-bold">Initial Risk Level: <span className="text-amber-600">AMBER</span></p>
                                            <p className="text-sm text-gray-600">This risk might reduce initial participation but can be mitigated through outreach.</p>
                                        </div>
                                        <div>
                                            <p className="font-bold mb-2">How I will control this risk:</p>
                                            <ul className="list-disc ml-6 space-y-1 text-sm">
                                                <li>Local media outreach (Dumbarton Reporter, Loch Lomond Radio)</li>
                                                <li>Social media campaign targeting West Dunbartonshire</li>
                                                <li>Physical posters in community spaces (Balloch, Alexandria, Stoneymollan)</li>
                                                <li>Word of mouth through existing community networks</li>
                                                <li>Partnership promotion through Friends of Loch Lomond</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-bold">Residual Risk Level: <span className="text-green-600">GREEN</span></p>
                                            <p className="text-sm text-gray-600">Multi-channel approach ensures local awareness.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* RISK 5 */}
                                <div className="mb-8 pb-8 border-b-2 border-gray-200">
                                    <div className="bg-green-100 p-4 rounded mb-4">
                                        <h3 className="font-bold text-lg">RISK 5: Fraud / misuse of payment system</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-bold">Initial Risk Level: <span className="text-green-600">GREEN</span></p>
                                            <p className="text-sm text-gray-600">This risk is minimal and well-controlled from the start.</p>
                                        </div>
                                        <div>
                                            <p className="font-bold mb-2">How I will control this risk:</p>
                                            <ul className="list-disc ml-6 space-y-1 text-sm">
                                                <li>Automated + manual verification of all submissions</li>
                                                <li>Small pilot scale makes fraud detection straightforward</li>
                                                <li>Community verification layer (local musicians verify each other)</li>
                                                <li>Payment records transparent and auditable</li>
                                                <li>Secure record-keeping of all transactions</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-bold">Residual Risk Level: <span className="text-green-600">GREEN</span></p>
                                            <p className="text-sm text-gray-600">Multiple verification layers make fraud highly unlikely in pilot phase.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* RISK 6 */}
                                <div className="mb-8">
                                    <div className="bg-amber-100 p-4 rounded mb-4"> {/* Changed from bg-red-100 to bg-amber-100 */}
                                        <h3 className="font-bold text-lg">RISK 6: Budget insufficient to sustain fair payment model</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-bold">Initial Risk Level: <span className="text-amber-600">AMBER</span></p> {/* Changed from text-red-600 to text-amber-600 */}
                                            <p className="text-sm text-gray-600">This risk could impact project sustainability, but is manageable with careful planning.</p>
                                        </div>
                                        <div>
                                            <p className="font-bold mb-2">How I will control this risk:</p>
                                            <ul className="list-disc ml-6 space-y-1 text-sm">
                                                <li>Pilot phase budget: £4,800 from Creative Scotland Open Fund</li>
                                                <li>Clear cost projections: £50-£100 per musician per submission</li>
                                                <li>90% to artists, 10% to admin/maintenance is sustainable model</li>
                                                <li>Can scale pilot down if budget requires (fewer initial participants)</li>
                                                <li>Revenue model (10% admin fee) designed to be self-sustaining long-term</li>
                                                <li>No other large funding applications active - this is our focused start</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-bold">Residual Risk Level: <span className="text-green-600">GREEN</span></p> {/* Changed from text-amber-600 to text-green-600 */}
                                            <p className="text-sm text-gray-600">£4,800 budget is realistic for 10-20 musicians in pilot phase. Careful spending ensures project success.</p> {/* Updated explanation */}
                                        </div>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>

                        {/* OVERALL ASSESSMENT */}
                        <Card className="border-2 border-blue-500 bg-blue-50">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold mb-4">OVERALL ASSESSMENT</h2>
                                <p className="mb-4">This project has been designed with risk mitigation built into its core structure:</p>
                                <ul className="list-disc ml-6 space-y-2">
                                    <li>Small pilot scale allows for controlled testing</li>
                                    <li>Multiple verification layers prevent fraud</li>
                                    <li>Flexible timeline accommodates weather/health challenges</li>
                                    <li>Proven payment system reduces delivery risk</li>
                                    <li>Strong community connections ensure engagement</li>
                                </ul>
                                <p className="mt-4 font-bold">All identified risks have clear, practical mitigation strategies. The pilot phase approach means we can adapt quickly to any unexpected challenges.</p>
                            </CardContent>
                        </Card>

                        {/* SIGNATURE */}
                        <div className="mt-12 pt-8 border-t-2 border-gray-300">
                            <div className="grid grid-cols-2 gap-12">
                                <div>
                                    <p className="font-bold mb-2">Signed:</p>
                                    <p className="text-lg">Brian Hughes</p>
                                    <p className="text-sm text-gray-600">(Project Lead)</p>
                                </div>
                                <div>
                                    <p className="font-bold mb-2">Date:</p>
                                    <p className="text-lg">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
