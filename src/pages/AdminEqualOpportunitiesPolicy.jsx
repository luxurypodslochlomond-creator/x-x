import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Copy, CheckCircle } from 'lucide-react';

export default function AdminEqualOpportunitiesPolicyPage() {
    const [copied, setCopied] = useState(false);

    const copyPolicyText = () => {
        const text = `EQUAL OPPORTUNITIES POLICY

Universal Frequency51 CIC (SC870603)

1. POLICY STATEMENT

Universal Frequency51 CIC is committed to promoting equality of opportunity for all. We believe that everyone deserves fair treatment regardless of age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, or sexual orientation.

This policy applies to all aspects of our work, including:
- Artist commissions and recruitment
- Platform access and user experience
- Staff and volunteer engagement
- Partnership development
- Community engagement activities

2. OUR COMMITMENT

We are committed to:

2.1 Eliminating unlawful discrimination, harassment, and victimisation
2.2 Advancing equality of opportunity between people who share a protected characteristic and those who do not
2.3 Fostering good relations between people who share a protected characteristic and those who do not
2.4 Removing barriers that prevent people from participating in our activities
2.5 Taking positive action where appropriate to address under-representation

3. ARTIST RECRUITMENT AND COMMISSIONS

When commissioning Scottish musicians, we will:

3.1 Advertise opportunities widely through diverse networks including Musicians' Union Scotland, Scottish Music Centre, and community music organisations
3.2 Use inclusive language in all recruitment materials
3.3 Consider applications based on artistic merit without discrimination
3.4 Actively encourage applications from under-represented groups including:
    - Disabled artists
    - Artists from Black, Asian and minority ethnic backgrounds
    - Artists from LGBTQ+ communities
    - Artists from areas of socioeconomic deprivation
    - Artists with caring responsibilities
3.5 Provide flexible working arrangements where possible
3.6 Offer additional support for artists who may face barriers to participation

4. PLATFORM ACCESSIBILITY

Our digital platform is designed to be accessible to all:

4.1 Screen reader compatibility for visually impaired users
4.2 Customisable colour contrast settings
4.3 Offline functionality for users with limited internet access
4.4 Free access with no subscription fees - removing financial barriers
4.5 Simple, intuitive design that doesn't require technical expertise
4.6 Ongoing accessibility audits and improvements

5. COMMUNITY ENGAGEMENT

When engaging with communities, we will:

5.1 Ensure events and activities are held in accessible venues
5.2 Provide materials in alternative formats on request
5.3 Consider timing of events to accommodate different needs
5.4 Actively reach out to groups that may face barriers to participation
5.5 Partner with organisations that work with under-represented communities

6. MONITORING AND REVIEW

We will:

6.1 Collect and analyse equality monitoring data (where appropriate and with consent)
6.2 Review this policy annually
6.3 Report on equality outcomes in our annual CIC community interest report
6.4 Take action to address any inequalities identified

7. COMPLAINTS

Anyone who believes they have been treated unfairly or discriminated against can raise a complaint by contacting:

Email: family@uf51.love

All complaints will be investigated promptly and treated confidentially.

8. LEGAL FRAMEWORK

This policy is designed to comply with:
- Equality Act 2010
- Human Rights Act 1998
- Public Sector Equality Duty (where applicable)

9. LEADERSHIP & RESPONSIBILITY

Universal Frequency51 CIC is led by a gender-balanced leadership team: Co-Directors Brian Hughes and Gillian Barbara Brown share equal responsibility (50/50) for all strategic decisions, financial oversight, and policy implementation.

The Directors are responsible for ensuring this policy is implemented effectively. All staff, volunteers, and partners are expected to support and uphold this policy.

---

Policy adopted: ${new Date().toLocaleDateString('en-GB')}
Review date: ${new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString('en-GB')}

Prepared by: Brian Hughes & Gillian Barbara Brown, Co-Directors, UF51 CIC (SC870603)

Contact: family@uf51.love
Website: uf51.love`;

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
                    <Button onClick={copyPolicyText} className="bg-green-600 hover:bg-green-700">
                        {copied ? <CheckCircle className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
                        {copied ? 'Copied!' : 'Copy as Text'}
                    </Button>
                </div>

                {/* Header */}
                <div className="text-center mb-8 border-b-2 border-black pb-6">
                    <h1 className="text-3xl font-bold mb-4">EQUAL OPPORTUNITIES POLICY</h1>
                    <p className="text-lg">Universal Frequency51 CIC</p>
                    <p className="text-sm text-gray-600">Company Number: SC870603</p>
                </div>

                {/* Policy Content */}
                <div className="space-y-8 text-sm leading-relaxed">

                    <section>
                        <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-2">1. POLICY STATEMENT</h2>
                        <p className="mb-3">
                            Universal Frequency51 CIC is committed to promoting equality of opportunity for all. We believe that everyone deserves fair treatment regardless of age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, or sexual orientation.
                        </p>
                        <p className="mb-2">This policy applies to all aspects of our work, including:</p>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>Artist commissions and recruitment</li>
                            <li>Platform access and user experience</li>
                            <li>Staff and volunteer engagement</li>
                            <li>Partnership development</li>
                            <li>Community engagement activities</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-2">2. OUR COMMITMENT</h2>
                        <p className="mb-2">We are committed to:</p>
                        <ul className="list-none space-y-2">
                            <li><strong>2.1</strong> Eliminating unlawful discrimination, harassment, and victimisation</li>
                            <li><strong>2.2</strong> Advancing equality of opportunity between people who share a protected characteristic and those who do not</li>
                            <li><strong>2.3</strong> Fostering good relations between people who share a protected characteristic and those who do not</li>
                            <li><strong>2.4</strong> Removing barriers that prevent people from participating in our activities</li>
                            <li><strong>2.5</strong> Taking positive action where appropriate to address under-representation</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-2">3. ARTIST RECRUITMENT AND COMMISSIONS</h2>
                        <p className="mb-2">When commissioning Scottish musicians, we will:</p>
                        <ul className="list-none space-y-2">
                            <li><strong>3.1</strong> Advertise opportunities widely through diverse networks including Musicians' Union Scotland, Scottish Music Centre, and community music organisations</li>
                            <li><strong>3.2</strong> Use inclusive language in all recruitment materials</li>
                            <li><strong>3.3</strong> Consider applications based on artistic merit without discrimination</li>
                            <li><strong>3.4</strong> Actively encourage applications from under-represented groups including:
                                <ul className="list-disc ml-8 mt-2 space-y-1">
                                    <li>Disabled artists</li>
                                    <li>Artists from Black, Asian and minority ethnic backgrounds</li>
                                    <li>Artists from LGBTQ+ communities</li>
                                    <li>Artists from areas of socioeconomic deprivation</li>
                                    <li>Artists with caring responsibilities</li>
                                </ul>
                            </li>
                            <li><strong>3.5</strong> Provide flexible working arrangements where possible</li>
                            <li><strong>3.6</strong> Offer additional support for artists who may face barriers to participation</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-2">4. PLATFORM ACCESSIBILITY</h2>
                        <p className="mb-2">Our digital platform is designed to be accessible to all:</p>
                        <ul className="list-none space-y-2">
                            <li><strong>4.1</strong> Screen reader compatibility for visually impaired users</li>
                            <li><strong>4.2</strong> Customisable colour contrast settings</li>
                            <li><strong>4.3</strong> Offline functionality for users with limited internet access</li>
                            <li><strong>4.4</strong> Free access with no subscription fees - removing financial barriers</li>
                            <li><strong>4.5</strong> Simple, intuitive design that doesn't require technical expertise</li>
                            <li><strong>4.6</strong> Ongoing accessibility audits and improvements</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-2">5. COMMUNITY ENGAGEMENT</h2>
                        <p className="mb-2">When engaging with communities, we will:</p>
                        <ul className="list-none space-y-2">
                            <li><strong>5.1</strong> Ensure events and activities are held in accessible venues</li>
                            <li><strong>5.2</strong> Provide materials in alternative formats on request</li>
                            <li><strong>5.3</strong> Consider timing of events to accommodate different needs</li>
                            <li><strong>5.4</strong> Actively reach out to groups that may face barriers to participation</li>
                            <li><strong>5.5</strong> Partner with organisations that work with under-represented communities</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-2">6. MONITORING AND REVIEW</h2>
                        <p className="mb-2">We will:</p>
                        <ul className="list-none space-y-2">
                            <li><strong>6.1</strong> Collect and analyse equality monitoring data (where appropriate and with consent)</li>
                            <li><strong>6.2</strong> Review this policy annually</li>
                            <li><strong>6.3</strong> Report on equality outcomes in our annual CIC community interest report</li>
                            <li><strong>6.4</strong> Take action to address any inequalities identified</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-2">7. COMPLAINTS</h2>
                        <p className="mb-3">
                            Anyone who believes they have been treated unfairly or discriminated against can raise a complaint by contacting:
                        </p>
                        <p className="mb-3 font-bold">Email: family@uf51.love</p>
                        <p>All complaints will be investigated promptly and treated confidentially.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-2">8. LEGAL FRAMEWORK</h2>
                        <p className="mb-2">This policy is designed to comply with:</p>
                        <ul className="list-disc ml-6 space-y-1">
                            <li>Equality Act 2010</li>
                            <li>Human Rights Act 1998</li>
                            <li>Public Sector Equality Duty (where applicable)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-2">9. LEADERSHIP & RESPONSIBILITY</h2>
                        <p className="mb-3">
                            Universal Frequency51 CIC is led by a gender-balanced leadership team: Co-Directors Brian Hughes and Gillian Barbara Brown share equal responsibility (50/50) for all strategic decisions, financial oversight, and policy implementation.
                        </p>
                        <p>
                            The Directors are responsible for ensuring this policy is implemented effectively. All staff, volunteers, and partners are expected to support and uphold this policy.
                        </p>
                    </section>

                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t-2 border-black">
                    <p className="mb-2"><strong>Policy adopted:</strong> {new Date().toLocaleDateString('en-GB')}</p>
                    <p className="mb-4"><strong>Review date:</strong> {new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString('en-GB')}</p>
                    <p className="mb-4">Prepared by: Brian Hughes & Gillian Barbara Brown, Co-Directors, UF51 CIC (SC870603)</p>
                    <p><strong>Contact:</strong> family@uf51.love | <strong>Website:</strong> uf51.love</p>
                </div>

            </div>
        </div>
    );
}