import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function AdminBudgetDocumentPage() {
    const [copied, setCopied] = useState(false);

    const budgetData = [
        { category: "Artist Commissions", description: "30 Scottish musicians × £500-1500 per commission", amount: 40000 },
        { category: "Directors' Salaries", description: "Brian Hughes £12,500 + Gillian Barbara Brown £12,500 (15 months, part-time)", amount: 25000 },
        { category: "Project Support", description: "Dedicated artist liaison and programme coordination role", amount: 15000 },
        { category: "Platform Technology & Infrastructure", description: "FLAC streaming, artist dashboards, binaural rendering, hosting", amount: 10000 },
        { category: "Research & Evaluation Partnership", description: "University partnership, clinical surveys, peer-reviewed publication", amount: 5000 },
        { category: "Marketing & Artist Outreach", description: "Recruitment, artist onboarding, community events", amount: 3000 },
        { category: "Business & Administrative Costs", description: "CIC compliance, insurance, legal, accounting", amount: 2000 },
    ];

    const total = budgetData.reduce((sum, item) => sum + item.amount, 0);

    const copyBudgetText = () => {
        const text = `UF51: COMMISSIONING 30 SCOTTISH MUSICIANS FOR ETHICAL STREAMING INFRASTRUCTURE
PROJECT BUDGET - £100,000

Application Reference: CS-OFO-37512-4C94
Applicant: Universal Frequency51 CIC (SC870603)
Project Duration: 15 months (March 2026 - June 2027)

BUDGET BREAKDOWN:

1. Artist Commissions: £40,000
   - 30 Scottish musicians creating original compositions
   - £500-1500 per commission depending on complexity
   - Artists retain full copyright
   - Artists receive 90% of ongoing streaming revenue

2. Directors' Salaries: £25,000
   - Co-Director 1 (Brian Hughes): £12,500 over 15 months (project management, platform development)
   - Co-Director 2 (Gillian Barbara Brown): £12,500 over 15 months (operations, community engagement)
   - Part-time roles overseeing £100k project, strategic direction, reporting

3. Project Support: £15,000
   - Dedicated project support role for artist liaison and programme coordination
   - Creative briefs, technical guidance, feedback on drafts
   - Quality assurance and production assistance
   - Artist onboarding and ongoing support

4. Platform Technology & Infrastructure: £10,000
   - Lossless FLAC streaming infrastructure
   - Artist earnings dashboard with real-time analytics
   - Binaural rendering capability for headphone users
   - Offline functionality for accessibility
   - Server hosting, bandwidth, security compliance

5. Research & Evaluation Partnership: £5,000
   - University partnership (in discussions with UWS Applied Psychology Research Group)
   - Pre/post wellness surveys using validated clinical tools (GAD-7, PSQI, BPI)
   - Statistical analysis of music's impact on mental health outcomes
   - Peer-reviewed publication costs

6. Marketing & Artist Outreach: £3,000
   - Artist recruitment through Musicians' Union Scotland, Scottish Music Centre
   - Artist onboarding materials and creative briefs
   - Platform promotion to target user groups
   - Quarterly artist feedback sessions

7. Business & Administrative Costs: £2,000
   - CIC compliance and reporting
   - Public liability and professional indemnity insurance
   - Business banking and accounting
   - Legal advice on artist contracts

TOTAL: £100,000

NOTES:
- Directors' salaries included - fair compensation for part-time project management (£833/month each)
- Artist commissions represent 40% of total budget - artist-first approach
- All figures are estimates based on current market rates
- Quarterly financial reporting to Creative Scotland
- CIC asset lock ensures all funds benefit community

Prepared by: Brian Hughes & Gillian Barbara Brown, Co-Directors
Universal Frequency51 CIC (SC870603)
Contact: family@uf51.love
Website: uf51.love
Date: ${new Date().toLocaleDateString('en-GB')}`;

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div className="min-h-screen bg-white text-black p-8 print:p-4">
            <style>{`
                @media print {
                    body { background: white !important; }
                    .no-print { display: none !important; }
                    * { color: black !important; background: white !important; }
                }
                @page {
                    margin: 1cm;
                    size: A4;
                }
                @page :footer { display: none; }
                @page :header { display: none; }
            `}</style>

            <div className="max-w-4xl mx-auto">
                
                {/* Action buttons */}
                <div className="flex gap-4 mb-8 no-print">
                    <Button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700">
                        <Printer className="w-5 h-5 mr-2" />
                        Print / Save as PDF
                    </Button>
                    <Button onClick={copyBudgetText} className="bg-green-600 hover:bg-green-700">
                        {copied ? <CheckCircle className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
                        {copied ? 'Copied!' : 'Copy as Text'}
                    </Button>
                </div>

                {/* Header */}
                <div className="text-center mb-8 border-b-2 border-black pb-6">
                    <h1 className="text-2xl font-bold mb-2">PROJECT BUDGET</h1>
                    <h2 className="text-xl mb-4">UF51: Commissioning 30 Scottish Musicians for Ethical Streaming Infrastructure</h2>
                    <div className="text-sm space-y-1">
                        <p><strong>Application Reference:</strong> CS-OFO-37512-4C94</p>
                        <p><strong>Applicant:</strong> Universal Frequency51 CIC (SC870603)</p>
                        <p><strong>Project Duration:</strong> 15 months (March 2026 - June 2027)</p>
                        <p><strong>Total Requested:</strong> £100,000</p>
                    </div>
                </div>

                {/* Budget Table */}
                <table className="w-full border-collapse mb-8">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-black p-3 text-left">Category</th>
                            <th className="border border-black p-3 text-left">Description</th>
                            <th className="border border-black p-3 text-right">Amount (£)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgetData.map((item, idx) => (
                            <tr key={idx}>
                                <td className="border border-black p-3 font-semibold">{item.category}</td>
                                <td className="border border-black p-3 text-sm">{item.description}</td>
                                <td className="border border-black p-3 text-right font-mono">£{item.amount.toLocaleString()}</td>
                            </tr>
                        ))}
                        <tr className="bg-gray-200 font-bold">
                            <td className="border border-black p-3" colSpan={2}>TOTAL</td>
                            <td className="border border-black p-3 text-right font-mono">£{total.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Detailed Breakdown */}
                <div className="space-y-6 mb-8">
                    <h3 className="text-lg font-bold border-b border-black pb-2">DETAILED BREAKDOWN</h3>

                    <div>
                        <h4 className="font-bold">1. Artist Commissions (£40,000)</h4>
                        <ul className="list-disc ml-6 text-sm space-y-1">
                            <li>30 Scottish musicians creating original compositions for mental health and wellbeing</li>
                            <li>£500-1500 per commission depending on complexity and duration</li>
                            <li>Artists retain full copyright ownership</li>
                            <li>Artists receive 90% of ongoing streaming revenue</li>
                            <li>Covers composition, recording, and mastering costs</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold">2. Directors' Salaries (£25,000)</h4>
                        <ul className="list-disc ml-6 text-sm space-y-1">
                            <li>Co-Director 1 (Brian Hughes): £12,500 over 15 months - project management, platform development, artist relations</li>
                            <li>Co-Director 2 (Gillian Barbara Brown): £12,500 over 15 months - operations, community engagement, financial oversight</li>
                            <li>Equivalent to £833/month each - fair compensation for part-time strategic roles</li>
                            <li>Responsible for Creative Scotland reporting, budget management, and project delivery</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold">3. Project Support (£15,000)</h4>
                        <ul className="list-disc ml-6 text-sm space-y-1">
                            <li>Dedicated project support role for artist liaison and programme coordination</li>
                            <li>Creative briefs, technical guidance, feedback on drafts</li>
                            <li>Quality assurance and production assistance</li>
                            <li>Artist onboarding and ongoing support throughout 15 months</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold">4. Platform Technology & Infrastructure (£10,000)</h4>
                        <ul className="list-disc ml-6 text-sm space-y-1">
                            <li>Lossless FLAC streaming infrastructure</li>
                            <li>Artist earnings dashboard with real-time analytics</li>
                            <li>Binaural rendering capability for headphone users</li>
                            <li>Offline functionality for accessibility</li>
                            <li>Server hosting, bandwidth, and security compliance</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold">5. Research & Evaluation Partnership (£5,000)</h4>
                        <ul className="list-disc ml-6 text-sm space-y-1">
                            <li>University partnership for academic validation (in discussions with UWS Applied Psychology Research Group)</li>
                            <li>Pre/post wellness surveys using validated clinical tools (GAD-7 for anxiety, PSQI for sleep, BPI for pain)</li>
                            <li>Statistical analysis of music's impact on mental health outcomes</li>
                            <li>Peer-reviewed publication costs</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold">6. Marketing & Artist Outreach (£3,000)</h4>
                        <ul className="list-disc ml-6 text-sm space-y-1">
                            <li>Artist recruitment through Musicians' Union Scotland and Scottish Music Centre</li>
                            <li>Artist onboarding materials and creative briefs</li>
                            <li>Platform promotion to target user groups</li>
                            <li>Quarterly artist feedback sessions</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold">7. Business & Administrative Costs (£2,000)</h4>
                        <ul className="list-disc ml-6 text-sm space-y-1">
                            <li>CIC compliance and reporting requirements</li>
                            <li>Public liability and professional indemnity insurance</li>
                            <li>Business banking and accounting services</li>
                            <li>Legal advice on artist contracts and intellectual property</li>
                        </ul>
                    </div>
                </div>

                {/* Notes */}
                <div className="border-t-2 border-black pt-6 mb-8">
                    <h3 className="text-lg font-bold mb-4">NOTES</h3>
                    <ul className="list-disc ml-6 text-sm space-y-2">
                        <li><strong>Directors' salaries included</strong> - fair compensation for part-time project management (£833/month each)</li>
                        <li><strong>Artist-first approach</strong> - artist commissions represent 40% of total budget</li>
                        <li>All figures are estimates based on current market rates and may be adjusted within categories</li>
                        <li>Quarterly financial reporting to Creative Scotland</li>
                        <li>CIC asset lock ensures all funds benefit community - no profit extraction possible</li>
                    </ul>
                </div>

                {/* Footer */}
                <div className="border-t border-black pt-6 text-sm">
                    <p><strong>Prepared by:</strong> Brian Hughes & Gillian Barbara Brown, Co-Directors</p>
                    <p><strong>Organisation:</strong> Universal Frequency51 CIC (SC870603)</p>
                    <p><strong>Contact:</strong> family@uf51.love</p>
                    <p><strong>Website:</strong> uf51.love</p>
                    <p><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</p>
                </div>

            </div>
        </div>
    );
}