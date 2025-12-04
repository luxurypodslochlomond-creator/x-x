import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, Download } from 'lucide-react';

export default function AdminCreativeScotland100kRiskPage() {
    const [copied, setCopied] = React.useState(false);

    const handleCopyAll = () => {
        const fullText = `
RISK ASSESSMENT - National Lottery Open Fund for Organisations
Project: UF51: Commissioning 30 Scottish Musicians for Ethical Streaming Infrastructure
Applicant: Universal Frequency51 CIC (SC870603)
Amount Requested: £100,000
Duration: 15 months (March 2026 - June 2027)

GUIDANCE:
This risk assessment uses the traffic light system to identify, assess and control risks:
- RED: Severe/highly likely risk that could threaten successful delivery
- AMBER: Moderate risk that must be addressed but remains tolerable
- GREEN: Low risk that is automatically tolerated but requires monitoring

---

RISK 1: Insufficient artist recruitment / engagement over 15 months

IDENTIFY:
The project depends on recruiting and retaining 30 Scottish musicians over a 15-month period. If we fail to recruit enough artists, or if artists drop out mid-project, we may not deliver the full scope of commissioned work. This could leave us with unused budget and unfulfilled creative outputs.

ASSESS:
Severity: Relatively severe - could impact project scale and creative diversity
Probability: Relatively unlikely - we have strong networks and fair payment model
INITIAL TRAFFIC LIGHT: AMBER

CONTROL:
Actions taken to reduce severity AND/OR probability:
• Direct partnerships with Musicians' Union Scotland and Scottish Music Centre for artist outreach
• Fair payment model (£500-£1,500 per commission based on complexity) significantly above industry standard
• Staggered recruitment: initial cohort of 10 artists, then expand based on success
• 15-month timeline allows flexibility for artist scheduling around other commitments
• Local focus (Loch Lomond & West Dunbartonshire) creates manageable geographic scope
• Personal connections in Scottish music community (Stoneymollan-based project lead)
• Artist agreements include clear timelines but flexible delivery windows
• Can pivot to working with fewer artists at higher commission rates if recruitment challenges arise

RESIDUAL RISK AFTER MITIGATION: GREEN
With fair payment, strong networks, and flexible timeline, artist engagement is highly likely. Staggered approach means we can adapt recruitment strategy if needed.

---

RISK 2: Inconsistent quality or unsuitable music submissions

IDENTIFY:
Artists may submit work that doesn't meet the project's wellbeing/healing frequency criteria, or quality may vary significantly across 30 different musicians. This could undermine the research validity and therapeutic effectiveness of the platform.

ASSESS:
Severity: Relatively severe - project credibility depends on quality and suitability
Probability: Unlikely - we have clear brief and quality control processes
INITIAL TRAFFIC LIGHT: AMBER

CONTROL:
Actions taken to reduce severity AND/OR probability:
• Clear creative brief provided to all commissioned artists defining healing frequency requirements
• Two-stage payment structure: 50% on commission acceptance, 50% on approved delivery
• Peer review process: musicians provide feedback on each other's submissions
• Technical quality standards defined (lossless audio format, production specifications)
• Project lead has music production background and can provide guidance/feedback
• Artists can resubmit work if initial version doesn't meet criteria
• Budget includes £5,000 for professional audio engineering support if needed
• Not all 30 commissions need to happen - quality over quantity approach
• Research phase includes testing tracks with focus groups before full platform integration

RESIDUAL RISK AFTER MITIGATION: GREEN
Clear criteria, feedback loops, and quality control measures ensure suitable, high-quality output. Flexibility in commission numbers means we prioritize quality.

---

RISK 3: Research and wellbeing impact measurement proves invalid or unreliable

IDENTIFY:
The project includes £20,000 for research and wellbeing impact measurement. If our research methodology is flawed, or we can't demonstrate measurable wellbeing outcomes, the project's core premise (that healing frequencies improve mental health) remains unproven. This would undermine future funding and scalability.

ASSESS:
Severity: Severe - research validity is central to project's long-term value
Probability: Unlikely - we are partnering with qualified researchers
INITIAL TRAFFIC LIGHT: RED

CONTROL:
Actions taken to reduce severity AND/OR probability:
• Partnership discussions underway with University of the West of Scotland psychology department
• Research design will use validated wellbeing scales (WEMWBS, GAD-7, PHQ-9)
• Control group methodology: users listening to healing frequencies vs. standard music
• Ethics approval will be sought through university partner
• Sample size calculations to ensure statistical validity (minimum 200 participants)
• Mixed methods approach: quantitative wellbeing scores + qualitative user testimonials
• Research budget includes professional statistician for data analysis
• Pilot phase (first 3 months) allows methodology testing and adjustment
• Even if formal research proves inconclusive, qualitative testimonials provide valuable evidence
• Research findings will be written up for peer-reviewed publication regardless of outcome

RESIDUAL RISK AFTER MITIGATION: AMBER
University partnership and robust methodology significantly reduce risk. Even if results are mixed, we will generate valuable evidence. Pilot phase allows early adjustment. This is a tolerable risk given the innovative nature of the project.

---

RISK 4: Digital platform fails to scale for 30 artists and increased user traffic

IDENTIFY:
The platform is already built and operational, but has not been tested at scale with 30 commissioned artists and potentially thousands of users. Technical issues could prevent artists from uploading work, or users from accessing healing frequencies. System downtime could undermine trust and engagement.

ASSESS:
Severity: Relatively severe - platform reliability is essential for project delivery
Probability: Unlikely - platform already built on enterprise infrastructure
INITIAL TRAFFIC LIGHT: AMBER

CONTROL:
Actions taken to reduce severity AND/OR probability:
• Platform built on Base44 enterprise infrastructure with 99.9% uptime guarantee
• Load testing will be conducted before major artist onboarding phases
• Gradual scaling: 10 artists initially, monitor performance, then expand
• Manual backup option: artists can submit work via WeTransfer/email if platform issues occur
• Technical support available from platform developer (BRO51, project founder)
• Platform already handles user authentication, file uploads, and streaming successfully
• Content Delivery Network (CDN) ensures fast, reliable audio streaming globally
• Database backups run automatically daily
• £2,000 contingency in budget for emergency technical fixes
• Platform monitoring alerts notify us immediately of any downtime or errors

RESIDUAL RISK AFTER MITIGATION: GREEN
Enterprise infrastructure, gradual scaling, and manual backup options make platform failure highly unlikely. Proven technology stack reduces technical risk significantly.

---

RISK 5: Budget overspend or cash flow issues preventing artist payments

IDENTIFY:
The project has a fixed £100,000 budget over 15 months. If we overspend on artist commissions, research, or operational costs, we may run out of funds before the project completes. Delayed payment to artists would damage trust and our reputation in the Scottish music community.

ASSESS:
Severity: Severe - failure to pay artists would be catastrophic for project and CIC reputation
Probability: Unlikely - we have detailed budget and cost controls
INITIAL TRAFFIC LIGHT: RED

CONTROL:
Actions taken to reduce severity AND/OR probability:
• Detailed budget breakdown with clear allocation: £45k artists, £20k research, £20k delivery, £8k marketing, £5k professional services, £2k access
• Artist payment schedule tracked in project management system
• Monthly budget reviews by CIC director to monitor spending against projections
• Staggered artist commissioning means we can pause new commissions if budget under pressure
• 50/50 payment structure for artists reduces upfront cash flow pressure
• Grant funding received in stages allows us to match spending to income
• £2,000 accessibility budget acts as contingency if other categories overspend
• CIC director Brian Hughes has experience managing project budgets from previous social enterprise work
• No staff salaries in budget - all funds go to project delivery
• Regular financial reports to Creative Scotland as per grant conditions
• Artist contracts specify payment terms, reducing scope for disputes

RESIDUAL RISK AFTER MITIGATION: AMBER
Detailed financial controls, staggered commissioning, and experienced budget management significantly reduce overspend risk. Monthly reviews allow early intervention if issues arise. This is a tolerable, manageable risk.

---

RISK 6: Data protection breach or artist rights infringement

IDENTIFY:
The project collects user wellbeing data and hosts copyrighted music from 30 artists. A data breach could expose sensitive user information. Copyright disputes could arise if artist rights aren't properly protected. Either scenario could result in legal action, reputational damage, and project termination.

ASSESS:
Severity: Severe - legal/reputational damage could be critical
Probability: Unlikely - we have robust protections in place
INITIAL TRAFFIC LIGHT: RED

CONTROL:
Actions taken to reduce severity AND/OR probability:
• GDPR-compliant platform architecture with encrypted data storage
• Privacy policy clearly explains data collection, storage, and usage
• User consent required before any wellbeing data collection
• Wellbeing research data anonymized before analysis
• Artist contracts include clear intellectual property clauses: artists retain copyright, CIC gets non-exclusive license to host/stream
• Music licensing tracked per artist with clear royalty-free arrangements for project duration
• Platform stores minimal personal data (email, name only)
• No payment card data stored on platform (handled by Stripe/Revolut)
• Regular backups mean no data loss if security incident occurs
• Cyber insurance being explored as part of CIC business insurance
• Base44 platform infrastructure includes security monitoring and DDoS protection
• Artist contracts reviewed by solicitor before use (part of £5k professional services budget)
• Incident response plan: immediate notification to users/artists if breach occurs

RESIDUAL RISK AFTER MITIGATION: AMBER
Strong technical protections, legal contracts, and GDPR compliance significantly reduce risk. Cyber insurance provides financial backstop. While data protection is always a risk in digital projects, our controls make it tolerable and well-managed.

---

RISK 7: Insufficient community engagement reduces project reach and impact

IDENTIFY:
If local communities and potential users aren't aware of the project, or don't engage with the healing frequencies, the wellbeing impact will be limited. Low user numbers would undermine research validity and reduce value for money. The project risks becoming an artistic output with minimal real-world therapeutic use.

ASSESS:
Severity: Relatively severe - low engagement undermines core wellbeing objectives
Probability: Relatively unlikely - we have strong marketing plan and local networks
INITIAL TRAFFIC LIGHT: AMBER

CONTROL:
Actions taken to reduce severity AND/OR probability:
• £8,000 dedicated marketing and audience development budget
• Multi-channel approach: social media, local press, community partnerships
• Partnership with Friends of Loch Lomond for community outreach
• Physical presence: posters in GP surgeries, community centres, libraries across West Dunbartonshire
• Free access to healing frequencies removes financial barrier to engagement
• User-friendly platform designed for accessibility (no technical skills required)
• Artist launch events: live performances to promote their commissioned work
• Schools outreach: introducing healing frequencies to young people through music education
• Evaluation throughout project allows us to adapt marketing strategy if engagement low
• Local radio interviews (Loch Lomond Radio, West FM) to raise awareness
• Word-of-mouth: users encouraged to share healing frequencies with friends/family
• SEO optimization ensures platform discoverable via Google search
• Email newsletter to update engaged users on new artist commissions

RESIDUAL RISK AFTER MITIGATION: GREEN
Substantial marketing budget, multi-channel strategy, and free access ensure strong community engagement. Local partnerships and artist events generate buzz. Low engagement is unlikely.

---

RISK 8: COVID-19 or public health restrictions disrupt artist recording or project delivery

IDENTIFY:
While COVID-19 restrictions are no longer in place, future outbreaks or other public health emergencies could prevent artists from accessing recording studios, or make in-person collaboration/events difficult. This could delay commissions or reduce project's community engagement aspects.

ASSESS:
Severity: Relatively severe - could delay project or reduce quality
Probability: Relatively unlikely - COVID risk lower than 2020-2022, project design flexible
INITIAL TRAFFIC LIGHT: AMBER

CONTROL:
Actions taken to reduce severity AND/OR probability:
• Project timeline (15 months) allows flexibility for delays
• Remote collaboration possible: artists can record at home and upload digitally
• No requirement for in-person events - project can function entirely online if needed
• Staggered artist commissioning means delays with one artist don't block others
• Grant extension possible if public health emergency significantly disrupts delivery
• Artists can work at own pace within commission timeframe, reducing pressure
• Platform designed for fully remote access - no physical infrastructure required
• Budget includes contingency (£2k access costs) that could cover emergency adjustments
• Wellbeing research can be conducted entirely online via digital surveys

RESIDUAL RISK AFTER MITIGATION: GREEN
Flexible, digital-first project design means public health restrictions have minimal impact. Remote working capability and extended timeline make this risk tolerable and unlikely.

---

OVERALL RISK ASSESSMENT SUMMARY:

Total Risks Identified: 8
- RED (before mitigation): 3
- AMBER (before mitigation): 5
- GREEN (before mitigation): 0

After Mitigation:
- RED (unmanageable): 0
- AMBER (tolerable, managed): 3
- GREEN (low risk, monitored): 5

CONCLUSION:
This project has been designed with risk mitigation at its core. All critical risks (artist payments, data protection, platform reliability) have robust controls in place. The three remaining AMBER risks (research validity, budget management, artist rights) are tolerable and actively managed through university partnership, monthly reviews, and legal contracts.

The 15-month timeline, staggered approach, and flexible delivery model mean we can adapt quickly to unexpected challenges. The project represents a well-managed, ambitious but achievable initiative that justifies the £100,000 investment.

Key Risk Management Strengths:
✓ Detailed financial controls prevent budget overrun
✓ University partnership ensures research credibility
✓ Enterprise platform infrastructure guarantees reliability
✓ Legal contracts protect artist rights and user data
✓ Staggered commissioning allows adaptive project management
✓ Local partnerships ensure community engagement
✓ Flexible timeline accommodates unforeseen delays

No unmanageable RED risks remain. All risks tolerable or low.

Signed: Brian Hughes (CIC Director)
Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
Company: Universal Frequency51 CIC (SC870603)
Project: UF51: Commissioning 30 Scottish Musicians for Ethical Streaming Infrastructure
Grant: Creative Scotland National Lottery Open Fund for Organisations (£100,000)
        `.trim();

        navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadFile = () => {
        const fullText = `
RISK ASSESSMENT - National Lottery Open Fund for Organisations
Project: UF51: Commissioning 30 Scottish Musicians for Ethical Streaming Infrastructure
Applicant: Universal Frequency51 CIC (SC870603)
Amount Requested: £100,000
Duration: 15 months (March 2026 - June 2027)

GUIDANCE:
This risk assessment uses the traffic light system to identify, assess and control risks:
- RED: Severe/highly likely risk that could threaten successful delivery
- AMBER: Moderate risk that must be addressed but remains tolerable
- GREEN: Low risk that is automatically tolerated but requires monitoring

---

RISK 1: Insufficient artist recruitment / engagement over 15 months

IDENTIFY:
The project depends on recruiting and retaining 30 Scottish musicians over a 15-month period. If we fail to recruit enough artists, or if artists drop out mid-project, we may not deliver the full scope of commissioned work. This could leave us with unused budget and unfulfilled creative outputs.

ASSESS:
Severity: Relatively severe - could impact project scale and creative diversity
Probability: Relatively unlikely - we have strong networks and fair payment model
INITIAL TRAFFIC LIGHT: AMBER

CONTROL:
Actions taken to reduce severity AND/OR probability:
• Direct partnerships with Musicians' Union Scotland and Scottish Music Centre for artist outreach
• Fair payment model (£500-£1,500 per commission based on complexity) significantly above industry standard
• Staggered recruitment: initial cohort of 10 artists, then expand based on success
• 15-month timeline allows flexibility for artist scheduling around other commitments
• Local focus (Loch Lomond & West Dunbartonshire) creates manageable geographic scope
• Personal connections in Scottish music community (Stoneymollan-based project lead)
• Artist agreements include clear timelines but flexible delivery windows
• Can pivot to working with fewer artists at higher commission rates if recruitment challenges arise

RESIDUAL RISK AFTER MITIGATION: GREEN
With fair payment, strong networks, and flexible timeline, artist engagement is highly likely. Staggered approach means we can adapt recruitment strategy if needed.

---

RISK 2: Inconsistent quality or unsuitable music submissions

IDENTIFY:
Artists may submit work that doesn't meet the project's wellbeing/healing frequency criteria, or quality may vary significantly across 30 different musicians. This could undermine the research validity and therapeutic effectiveness of the platform.

ASSESS:
Severity: Relatively severe - project credibility depends on quality and suitability
Probability: Unlikely - we have clear brief and quality control processes
INITIAL TRAFFIC LIGHT: AMBER

CONTROL:
Actions taken to reduce severity AND/OR probability:
• Clear creative brief provided to all commissioned artists defining healing frequency requirements
• Two-stage payment structure: 50% on commission acceptance, 50% on approved delivery
• Peer review process: musicians provide feedback on each other's submissions
• Technical quality standards defined (lossless audio format, production specifications)
• Project lead has music production background and can provide guidance/feedback
• Artists can resubmit work if initial version doesn't meet criteria
• Budget includes £5,000 for professional audio engineering support if needed
• Not all 30 commissions need to happen - quality over quantity approach
• Research phase includes testing tracks with focus groups before full platform integration

RESIDUAL RISK AFTER MITIGATION: GREEN
Clear criteria, feedback loops, and quality control measures ensure suitable, high-quality output. Flexibility in commission numbers means we prioritize quality.

---

RISK 3: Research and wellbeing impact measurement proves invalid or unreliable

IDENTIFY:
The project includes £20,000 for research and wellbeing impact measurement. If our research methodology is flawed, or we can't demonstrate measurable wellbeing outcomes, the project's core premise (that healing frequencies improve mental health) remains unproven. This would undermine future funding and scalability.

ASSESS:
Severity: Severe - research validity is central to project's long-term value
Probability: Unlikely - we are partnering with qualified researchers
INITIAL TRAFFIC LIGHT: RED

CONTROL:
Actions taken to reduce severity AND/OR probability:
• Partnership discussions underway with University of the West of Scotland psychology department
• Research design will use validated wellbeing scales (WEMWBS, GAD-7, PHQ-9)
• Control group methodology: users listening to healing frequencies vs. standard music
• Ethics approval will be sought through university partner
• Sample size calculations to ensure statistical validity (minimum 200 participants)
• Mixed methods approach: quantitative wellbeing scores + qualitative user testimonials
• Research budget includes professional statistician for data analysis
• Pilot phase (first 3 months) allows methodology testing and adjustment
• Even if formal research proves inconclusive, qualitative testimonials provide valuable evidence
• Research findings will be written up for peer-reviewed publication regardless of outcome

RESIDUAL RISK AFTER MITIGATION: AMBER
University partnership and robust methodology significantly reduce risk. Even if results are mixed, we will generate valuable evidence. Pilot phase allows early adjustment. This is a tolerable risk given the innovative nature of the project.

---

RISK 4: Digital platform fails to scale for 30 artists and increased user traffic

IDENTIFY:
The platform is already built and operational, but has not been tested at scale with 30 commissioned artists and potentially thousands of users. Technical issues could prevent artists from uploading work, or users from accessing healing frequencies. System downtime could undermine trust and engagement.

ASSESS:
Severity: Relatively severe - platform reliability is essential for project delivery
Probability: Unlikely - platform already built on enterprise infrastructure
INITIAL TRAFFIC LIGHT: AMBER

CONTROL:
Actions taken to reduce severity AND/OR probability:
• Platform built on Base44 enterprise infrastructure with 99.9% uptime guarantee
• Load testing will be conducted before major artist onboarding phases
• Gradual scaling: 10 artists initially, monitor performance, then expand
• Manual backup option: artists can submit work via WeTransfer/email if platform issues occur
• Technical support available from platform developer (BRO51, project founder)
• Platform already handles user authentication, file uploads, and streaming successfully
• Content Delivery Network (CDN) ensures fast, reliable audio streaming globally
• Database backups run automatically daily
• £2,000 contingency in budget for emergency technical fixes
• Platform monitoring alerts notify us immediately of any downtime or errors

RESIDUAL RISK AFTER MITIGATION: GREEN
Enterprise infrastructure, gradual scaling, and manual backup options make platform failure highly unlikely. Proven technology stack reduces technical risk significantly.

---

RISK 5: Budget overspend or cash flow issues preventing artist payments

IDENTIFY:
The project has a fixed £100,000 budget over 15 months. If we overspend on artist commissions, research, or operational costs, we may run out of funds before the project completes. Delayed payment to artists would damage trust and our reputation in the Scottish music community.

ASSESS:
Severity: Severe - failure to pay artists would be catastrophic for project and CIC reputation
Probability: Unlikely - we have detailed budget and cost controls
INITIAL TRAFFIC LIGHT: RED

CONTROL:
Actions taken to reduce severity AND/OR probability:
• Detailed budget breakdown with clear allocation: £45k artists, £20k research, £20k delivery, £8k marketing, £5k professional services, £2k access
• Artist payment schedule tracked in project management system
• Monthly budget reviews by CIC director to monitor spending against projections
• Staggered artist commissioning means we can pause new commissions if budget under pressure
• 50/50 payment structure for artists reduces upfront cash flow pressure
• Grant funding received in stages allows us to match spending to income
• £2,000 accessibility budget acts as contingency if other categories overspend
• CIC director Brian Hughes has experience managing project budgets from previous social enterprise work
• No staff salaries in budget - all funds go to project delivery
• Regular financial reports to Creative Scotland as per grant conditions
• Artist contracts specify payment terms, reducing scope for disputes

RESIDUAL RISK AFTER MITIGATION: AMBER
Detailed financial controls, staggered commissioning, and experienced budget management significantly reduce overspend risk. Monthly reviews allow early intervention if issues arise. This is a tolerable, manageable risk.

---

RISK 6: Data protection breach or artist rights infringement

IDENTIFY:
The project collects user wellbeing data and hosts copyrighted music from 30 artists. A data breach could expose sensitive user information. Copyright disputes could arise if artist rights aren't properly protected. Either scenario could result in legal action, reputational damage, and project termination.

ASSESS:
Severity: Severe - legal/reputational damage could be critical
Probability: Unlikely - we have robust protections in place
INITIAL TRAFFIC LIGHT: RED

CONTROL:
Actions taken to reduce severity AND/OR probability:
• GDPR-compliant platform architecture with encrypted data storage
• Privacy policy clearly explains data collection, storage, and usage
• User consent required before any wellbeing data collection
• Wellbeing research data anonymized before analysis
• Artist contracts include clear intellectual property clauses: artists retain copyright, CIC gets non-exclusive license to host/stream
• Music licensing tracked per artist with clear royalty-free arrangements for project duration
• Platform stores minimal personal data (email, name only)
• No payment card data stored on platform (handled by Stripe/Revolut)
• Regular backups mean no data loss if security incident occurs
• Cyber insurance being explored as part of CIC business insurance
• Base44 platform infrastructure includes security monitoring and DDoS protection
• Artist contracts reviewed by solicitor before use (part of £5k professional services budget)
• Incident response plan: immediate notification to users/artists if breach occurs

RESIDUAL RISK AFTER MITIGATION: AMBER
Strong technical protections, legal contracts, and GDPR compliance significantly reduce risk. Cyber insurance provides financial backstop. While data protection is always a risk in digital projects, our controls make it tolerable and well-managed.

---

RISK 7: Insufficient community engagement reduces project reach and impact

IDENTIFY:
If local communities and potential users aren't aware of the project, or don't engage with the healing frequencies, the wellbeing impact will be limited. Low user numbers would undermine research validity and reduce value for money. The project risks becoming an artistic output with minimal real-world therapeutic use.

ASSESS:
Severity: Relatively severe - low engagement undermines core wellbeing objectives
Probability: Relatively unlikely - we have strong marketing plan and local networks
INITIAL TRAFFIC LIGHT: AMBER

CONTROL:
Actions taken to reduce severity AND/OR probability:
• £8,000 dedicated marketing and audience development budget
• Multi-channel approach: social media, local press, community partnerships
• Partnership with Friends of Loch Lomond for community outreach
• Physical presence: posters in GP surgeries, community centres, libraries across West Dunbartonshire
• Free access to healing frequencies removes financial barrier to engagement
• User-friendly platform designed for accessibility (no technical skills required)
• Artist launch events: live performances to promote their commissioned work
• Schools outreach: introducing healing frequencies to young people through music education
• Evaluation throughout project allows us to adapt marketing strategy if engagement low
• Local radio interviews (Loch Lomond Radio, West FM) to raise awareness
• Word-of-mouth: users encouraged to share healing frequencies with friends/family
• SEO optimization ensures platform discoverable via Google search
• Email newsletter to update engaged users on new artist commissions

RESIDUAL RISK AFTER MITIGATION: GREEN
Substantial marketing budget, multi-channel strategy, and free access ensure strong community engagement. Local partnerships and artist events generate buzz. Low engagement is unlikely.

---

RISK 8: COVID-19 or public health restrictions disrupt artist recording or project delivery

IDENTIFY:
While COVID-19 restrictions are no longer in place, future outbreaks or other public health emergencies could prevent artists from accessing recording studios, or make in-person collaboration/events difficult. This could delay commissions or reduce project's community engagement aspects.

ASSESS:
Severity: Relatively severe - could delay project or reduce quality
Probability: Relatively unlikely - COVID risk lower than 2020-2022, project design flexible
INITIAL TRAFFIC LIGHT: AMBER

CONTROL:
Actions taken to reduce severity AND/OR probability:
• Project timeline (15 months) allows flexibility for delays
• Remote collaboration possible: artists can record at home and upload digitally
• No requirement for in-person events - project can function entirely online if needed
• Staggered artist commissioning means delays with one artist don't block others
• Grant extension possible if public health emergency significantly disrupts delivery
• Artists can work at own pace within commission timeframe, reducing pressure
• Platform designed for fully remote access - no physical infrastructure required
• Budget includes contingency (£2k access costs) that could cover emergency adjustments
• Wellbeing research can be conducted entirely online via digital surveys

RESIDUAL RISK AFTER MITIGATION: GREEN
Flexible, digital-first project design means public health restrictions have minimal impact. Remote working capability and extended timeline make this risk tolerable and unlikely.

---

OVERALL RISK ASSESSMENT SUMMARY:

Total Risks Identified: 8
- RED (before mitigation): 3
- AMBER (before mitigation): 5
- GREEN (before mitigation): 0

After Mitigation:
- RED (unmanageable): 0
- AMBER (tolerable, managed): 3
- GREEN (low risk, monitored): 5

CONCLUSION:
This project has been designed with risk mitigation at its core. All critical risks (artist payments, data protection, platform reliability) have robust controls in place. The three remaining AMBER risks (research validity, budget management, artist rights) are tolerable and actively managed through university partnership, monthly reviews, and legal contracts.

The 15-month timeline, staggered approach, and flexible delivery model mean we can adapt quickly to unexpected challenges. The project represents a well-managed, ambitious but achievable initiative that justifies the £100,000 investment.

Key Risk Management Strengths:
✓ Detailed financial controls prevent budget overrun
✓ University partnership ensures research credibility
✓ Enterprise platform infrastructure guarantees reliability
✓ Legal contracts protect artist rights and user data
✓ Staggered commissioning allows adaptive project management
✓ Local partnerships ensure community engagement
✓ Flexible timeline accommodates unforeseen delays

No unmanageable RED risks remain. All risks tolerable or low.

Signed: Brian Hughes (CIC Director)
Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
Company: Universal Frequency51 CIC (SC870603)
Project: UF51: Commissioning 30 Scottish Musicians for Ethical Streaming Infrastructure
Grant: Creative Scotland National Lottery Open Fund for Organisations (£100,000)
        `.trim();

        const blob = new Blob([fullText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'UF51_Risk_Assessment_Creative_Scotland_100k.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
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
                    }
                    
                    .no-print {
                        display: none !important;
                    }
                    
                    .printable-content {
                        display: block !important;
                        background: white !important;
                        color: black !important;
                        padding: 20mm !important;
                    }
                    
                    @page {
                        margin: 20mm;
                        size: A4 portrait;
                    }
                }
            `}</style>

            <div className="min-h-screen bg-white text-black p-6 md:p-12">
                
                {/* ACTION BUTTONS */}
                <div className="no-print mb-8 flex gap-4">
                    <Card className="flex-1 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-4 border-green-500">
                        <CardContent className="p-6 text-center">
                            {copied ? (
                                <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-3" />
                            ) : (
                                <Copy className="w-12 h-12 mx-auto text-green-600 mb-3" />
                            )}
                            <h3 className="text-xl font-black text-green-700 mb-2">
                                {copied ? '✅ COPIED!' : 'COPY ALL TEXT'}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                {copied ? 'Now paste into the Creative Scotland form' : 'Click to copy entire risk assessment'}
                            </p>
                            <Button
                                onClick={handleCopyAll}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold"
                            >
                                {copied ? 'COPIED ✓' : <><Copy className="w-4 h-4 mr-2" /> COPY ALL</>}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="flex-1 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-4 border-blue-500">
                        <CardContent className="p-6 text-center">
                            <Download className="w-12 h-12 mx-auto text-blue-600 mb-3" />
                            <h3 className="text-xl font-black text-blue-700 mb-2">SAVE TO FILES (iOS)</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Downloads .txt file → then upload to Creative Scotland
                            </p>
                            <Button
                                onClick={handleDownloadFile}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                DOWNLOAD FILE
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* PRINTABLE CONTENT */}
                <div className="printable-content space-y-8">
                    
                    {/* HEADER */}
                    <div className="text-center border-b-4 border-gray-800 pb-6">
                        <h1 className="text-4xl font-black mb-3">RISK ASSESSMENT</h1>
                        <p className="text-xl font-bold">National Lottery Open Fund for Organisations</p>
                        <p className="text-lg text-gray-700 mt-2">Creative Scotland</p>
                    </div>

                    {/* PROJECT DETAILS */}
                    <Card className="border-2 border-gray-800">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold mb-4">PROJECT DETAILS</h2>
                            <div className="space-y-2">
                                <p><strong>Project Title:</strong> UF51: Commissioning 30 Scottish Musicians for Ethical Streaming Infrastructure</p>
                                <p><strong>Applicant Organisation:</strong> Universal Frequency51 CIC (SC870603)</p>
                                <p><strong>Applicant Name:</strong> Brian Hughes (CIC Director)</p>
                                <p><strong>Amount Requested:</strong> £100,000</p>
                                <p><strong>Project Duration:</strong> 15 months (January 2025 - March 2026)</p>
                                <p><strong>Project Summary:</strong> Commission 30 Scottish musicians to create healing frequency music. Research wellbeing impact. Pay artists fairly (£1,500 avg per commission). Build evidence base for music therapy.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* GUIDANCE */}
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
                        <h3 className="font-bold text-lg mb-2">TRAFFIC LIGHT SYSTEM GUIDANCE:</h3>
                        <ul className="space-y-2">
                            <li><strong className="text-red-600">RED:</strong> Severe/highly likely risk requiring immediate action</li>
                            <li><strong className="text-yellow-600">AMBER:</strong> Moderate risk that must be addressed but is tolerable</li>
                            <li><strong className="text-green-600">GREEN:</strong> Low risk that can be monitored</li>
                        </ul>
                        <p className="mt-4 text-sm italic">
                            For each risk: IDENTIFY the threat → ASSESS severity & probability → CONTROL through mitigation
                        </p>
                    </div>

                    {/* RISK 1 */}
                    <Card className="border-2 border-yellow-600 bg-yellow-50">
                        <CardContent className="p-6">
                            <div className="bg-yellow-200 p-3 rounded mb-4">
                                <h3 className="text-xl font-bold">RISK 1: Insufficient artist recruitment / engagement over 15 months</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold mb-2">IDENTIFY:</h4>
                                    <p className="text-sm">The project depends on recruiting and retaining 30 Scottish musicians over a 15-month period. If we fail to recruit enough artists, or if artists drop out mid-project, we may not deliver the full scope of commissioned work.</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">ASSESS:</h4>
                                    <p className="text-sm">Severity: Relatively severe | Probability: Relatively unlikely</p>
                                    <p className="text-sm font-bold text-yellow-700">INITIAL TRAFFIC LIGHT: AMBER</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">CONTROL:</h4>
                                    <ul className="text-sm list-disc ml-6 space-y-1">
                                        <li>Partnerships with Musicians' Union Scotland and Scottish Music Centre</li>
                                        <li>Fair payment model (£500-£1,500) significantly above industry standard</li>
                                        <li>Staggered recruitment: initial 10 artists, then expand</li>
                                        <li>15-month timeline allows flexibility for artist scheduling</li>
                                        <li>Local focus (Loch Lomond & West Dunbartonshire) manageable scope</li>
                                        <li>Personal connections in Scottish music community</li>
                                        <li>Flexible delivery windows in artist agreements</li>
                                    </ul>
                                </div>

                                <div className="bg-green-100 p-3 rounded">
                                    <h4 className="font-bold mb-1">RESIDUAL RISK: <span className="text-green-700">GREEN</span></h4>
                                    <p className="text-sm">Fair payment, strong networks, and flexible timeline make artist engagement highly likely. Staggered approach allows adaptation.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* RISK 2 */}
                    <Card className="border-2 border-yellow-600 bg-yellow-50">
                        <CardContent className="p-6">
                            <div className="bg-yellow-200 p-3 rounded mb-4">
                                <h3 className="text-xl font-bold">RISK 2: Inconsistent quality or unsuitable music submissions</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold mb-2">IDENTIFY:</h4>
                                    <p className="text-sm">Artists may submit work that doesn't meet healing frequency criteria, or quality may vary significantly. This could undermine research validity and therapeutic effectiveness.</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">ASSESS:</h4>
                                    <p className="text-sm">Severity: Relatively severe | Probability: Unlikely</p>
                                    <p className="text-sm font-bold text-yellow-700">INITIAL TRAFFIC LIGHT: AMBER</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">CONTROL:</h4>
                                    <ul className="text-sm list-disc ml-6 space-y-1">
                                        <li>Clear creative brief defining healing frequency requirements</li>
                                        <li>Two-stage payment: 50% on commission, 50% on approved delivery</li>
                                        <li>Peer review process: musicians provide feedback</li>
                                        <li>Technical quality standards (lossless audio, production specs)</li>
                                        <li>Project lead has music production background</li>
                                        <li>Artists can resubmit if initial version doesn't meet criteria</li>
                                        <li>£5,000 budget for professional audio engineering support</li>
                                        <li>Quality over quantity - not all 30 commissions mandatory</li>
                                    </ul>
                                </div>

                                <div className="bg-green-100 p-3 rounded">
                                    <h4 className="font-bold mb-1">RESIDUAL RISK: <span className="text-green-700">GREEN</span></h4>
                                    <p className="text-sm">Clear criteria, feedback loops, and quality control ensure suitable output. Flexibility prioritizes quality.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* RISK 3 - THE RED ONE */}
                    <Card className="border-2 border-red-600 bg-red-50">
                        <CardContent className="p-6">
                            <div className="bg-red-200 p-3 rounded mb-4">
                                <h3 className="text-xl font-bold">RISK 3: Research and wellbeing impact measurement proves invalid or unreliable</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold mb-2">IDENTIFY:</h4>
                                    <p className="text-sm">£20,000 allocated for research. If methodology is flawed or we can't demonstrate measurable wellbeing outcomes, project's core premise remains unproven. Would undermine future funding and scalability.</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">ASSESS:</h4>
                                    <p className="text-sm">Severity: Severe (central to long-term value) | Probability: Unlikely (qualified researchers)</p>
                                    <p className="text-sm font-bold text-red-700">INITIAL TRAFFIC LIGHT: RED</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">CONTROL:</h4>
                                    <ul className="text-sm list-disc ml-6 space-y-1">
                                        <li>Partnership discussions with University of West Scotland psychology dept</li>
                                        <li>Validated wellbeing scales (WEMWBS, GAD-7, PHQ-9)</li>
                                        <li>Control group: healing frequencies vs standard music</li>
                                        <li>University ethics approval</li>
                                        <li>Sample size calculations (minimum 200 participants)</li>
                                        <li>Mixed methods: quantitative scores + qualitative testimonials</li>
                                        <li>Professional statistician for data analysis</li>
                                        <li>Pilot phase (3 months) tests methodology, allows adjustment</li>
                                        <li>Even if inconclusive, qualitative evidence remains valuable</li>
                                        <li>Results written up for peer-review regardless of outcome</li>
                                    </ul>
                                </div>

                                <div className="bg-yellow-100 p-3 rounded">
                                    <h4 className="font-bold mb-1">RESIDUAL RISK: <span className="text-yellow-700">AMBER</span></h4>
                                    <p className="text-sm">University partnership and robust methodology significantly reduce risk. Even mixed results generate valuable evidence. Pilot allows early adjustment. <strong>Tolerable risk</strong> given innovative nature.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* RISK 4 */}
                    <Card className="border-2 border-yellow-600 bg-yellow-50">
                        <CardContent className="p-6">
                            <div className="bg-yellow-200 p-3 rounded mb-4">
                                <h3 className="text-xl font-bold">RISK 4: Digital platform fails to scale for 30 artists and increased traffic</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold mb-2">IDENTIFY:</h4>
                                    <p className="text-sm">Platform operational but untested at scale with 30 artists and thousands of users. Technical issues could prevent uploads or access. Downtime undermines trust.</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">ASSESS:</h4>
                                    <p className="text-sm">Severity: Relatively severe | Probability: Unlikely</p>
                                    <p className="text-sm font-bold text-yellow-700">INITIAL TRAFFIC LIGHT: AMBER</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">CONTROL:</h4>
                                    <ul className="text-sm list-disc ml-6 space-y-1">
                                        <li>Built on Base44 enterprise infrastructure (99.9% uptime)</li>
                                        <li>Load testing before major artist onboarding</li>
                                        <li>Gradual scaling: 10 artists initially, monitor, then expand</li>
                                        <li>Manual backup: artists submit via WeTransfer/email if issues</li>
                                        <li>Technical support from platform developer (BRO51)</li>
                                        <li>Platform already handles auth, uploads, streaming successfully</li>
                                        <li>CDN ensures fast, reliable global audio streaming</li>
                                        <li>Automated daily database backups</li>
                                        <li>£2,000 contingency for emergency technical fixes</li>
                                    </ul>
                                </div>

                                <div className="bg-green-100 p-3 rounded">
                                    <h4 className="font-bold mb-1">RESIDUAL RISK: <span className="text-green-700">GREEN</span></h4>
                                    <p className="text-sm">Enterprise infrastructure, gradual scaling, and backup options make failure highly unlikely. Proven tech stack.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* RISK 5 - THE RED ONE */}
                    <Card className="border-2 border-red-600 bg-red-50">
                        <CardContent className="p-6">
                            <div className="bg-red-200 p-3 rounded mb-4">
                                <h3 className="text-xl font-bold">RISK 5: Budget overspend or cash flow issues preventing artist payments</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold mb-2">IDENTIFY:</h4>
                                    <p className="text-sm">Fixed £100,000 budget over 15 months. Overspend on commissions, research, or operations could exhaust funds before completion. Delayed artist payment would damage trust and CIC reputation catastrophically.</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">ASSESS:</h4>
                                    <p className="text-sm">Severity: Severe (catastrophic reputation damage) | Probability: Unlikely (detailed controls)</p>
                                    <p className="text-sm font-bold text-red-700">INITIAL TRAFFIC LIGHT: RED</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">CONTROL:</h4>
                                    <ul className="text-sm list-disc ml-6 space-y-1">
                                        <li>Detailed budget: £45k artists, £20k research, £20k delivery, £8k marketing, £5k professional, £2k access</li>
                                        <li>Payment schedule tracked in project management system</li>
                                        <li>Monthly budget reviews by CIC director</li>
                                        <li>Staggered commissioning - can pause if budget under pressure</li>
                                        <li>50/50 artist payment structure reduces upfront cash flow pressure</li>
                                        <li>Grant funding received in stages matches spending to income</li>
                                        <li>£2,000 accessibility budget acts as contingency</li>
                                        <li>CIC director has social enterprise budget management experience</li>
                                        <li>No staff salaries - all funds to project delivery</li>
                                        <li>Regular financial reports to Creative Scotland per grant conditions</li>
                                    </ul>
                                </div>

                                <div className="bg-yellow-100 p-3 rounded">
                                    <h4 className="font-bold mb-1">RESIDUAL RISK: <span className="text-yellow-700">AMBER</span></h4>
                                    <p className="text-sm">Detailed controls, staggered commissioning, and experienced management significantly reduce risk. Monthly reviews allow early intervention. <strong>Tolerable, manageable risk.</strong></p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* RISK 6 - THE RED ONE */}
                    <Card className="border-2 border-red-600 bg-red-50">
                        <CardContent className="p-6">
                            <div className="bg-red-200 p-3 rounded mb-4">
                                <h3 className="text-xl font-bold">RISK 6: Data protection breach or artist rights infringement</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold mb-2">IDENTIFY:</h4>
                                    <p className="text-sm">Project collects user wellbeing data and hosts copyrighted music from 30 artists. Data breach could expose sensitive information. Copyright disputes could arise. Legal action, reputational damage, project termination.</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">ASSESS:</h4>
                                    <p className="text-sm">Severity: Severe (legal/reputational critical) | Probability: Unlikely (robust protections)</p>
                                    <p className="text-sm font-bold text-red-700">INITIAL TRAFFIC LIGHT: RED</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">CONTROL:</h4>
                                    <ul className="text-sm list-disc ml-6 space-y-1">
                                        <li>GDPR-compliant platform with encrypted data storage</li>
                                        <li>Privacy policy explains data collection, storage, usage</li>
                                        <li>User consent required before wellbeing data collection</li>
                                        <li>Research data anonymized before analysis</li>
                                        <li>Artist contracts: artists retain copyright, CIC gets non-exclusive license</li>
                                        <li>Music licensing tracked per artist with clear royalty-free arrangements</li>
                                        <li>Minimal personal data stored (email, name only)</li>
                                        <li>No payment card data on platform (Stripe/Revolut handle)</li>
                                        <li>Regular backups prevent data loss</li>
                                        <li>Cyber insurance explored as part of CIC business insurance</li>
                                        <li>Base44 platform includes security monitoring and DDoS protection</li>
                                        <li>Artist contracts reviewed by solicitor (£5k professional services budget)</li>
                                    </ul>
                                </div>

                                <div className="bg-yellow-100 p-3 rounded">
                                    <h4 className="font-bold mb-1">RESIDUAL RISK: <span className="text-yellow-700">AMBER</span></h4>
                                    <p className="text-sm">Strong technical protections, legal contracts, GDPR compliance significantly reduce risk. Cyber insurance provides financial backstop. <strong>Tolerable and well-managed.</strong></p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* RISK 7 */}
                    <Card className="border-2 border-yellow-600 bg-yellow-50">
                        <CardContent className="p-6">
                            <div className="bg-yellow-200 p-3 rounded mb-4">
                                <h3 className="text-xl font-bold">RISK 7: Insufficient community engagement reduces reach and impact</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold mb-2">IDENTIFY:</h4>
                                    <p className="text-sm">If communities/users aren't aware or don't engage with healing frequencies, wellbeing impact limited. Low user numbers undermine research validity and value for money. Risk becoming artistic output with minimal therapeutic use.</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">ASSESS:</h4>
                                    <p className="text-sm">Severity: Relatively severe | Probability: Relatively unlikely</p>
                                    <p className="text-sm font-bold text-yellow-700">INITIAL TRAFFIC LIGHT: AMBER</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">CONTROL:</h4>
                                    <ul className="text-sm list-disc ml-6 space-y-1">
                                        <li>£8,000 dedicated marketing and audience development budget</li>
                                        <li>Multi-channel: social media, local press, community partnerships</li>
                                        <li>Partnership with Friends of Loch Lomond for outreach</li>
                                        <li>Posters in GP surgeries, community centres, libraries (West Dunbartonshire)</li>
                                        <li>Free access removes financial barrier</li>
                                        <li>User-friendly platform (no technical skills required)</li>
                                        <li>Artist launch events: live performances promote work</li>
                                        <li>Schools outreach: music education integration</li>
                                        <li>Continuous evaluation allows marketing strategy adaptation</li>
                                        <li>Local radio interviews (Loch Lomond Radio, West FM)</li>
                                    </ul>
                                </div>

                                <div className="bg-green-100 p-3 rounded">
                                    <h4 className="font-bold mb-1">RESIDUAL RISK: <span className="text-green-700">GREEN</span></h4>
                                    <p className="text-sm">Substantial marketing budget, multi-channel strategy, and free access ensure strong engagement. Low engagement unlikely.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* RISK 8 */}
                    <Card className="border-2 border-yellow-600 bg-yellow-50">
                        <CardContent className="p-6">
                            <div className="bg-yellow-200 p-3 rounded mb-4">
                                <h3 className="text-xl font-bold">RISK 8: COVID-19 or public health restrictions disrupt delivery</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold mb-2">IDENTIFY:</h4>
                                    <p className="text-sm">While restrictions no longer in place, future outbreaks or health emergencies could prevent artists accessing studios or make collaboration/events difficult. Could delay commissions or reduce community engagement.</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">ASSESS:</h4>
                                    <p className="text-sm">Severity: Relatively severe | Probability: Relatively unlikely</p>
                                    <p className="text-sm font-bold text-yellow-700">INITIAL TRAFFIC LIGHT: AMBER</p>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">CONTROL:</h4>
                                    <ul className="text-sm list-disc ml-6 space-y-1">
                                        <li>15-month timeline allows flexibility for delays</li>
                                        <li>Remote collaboration possible: home recording and digital upload</li>
                                        <li>No requirement for in-person events - functions entirely online</li>
                                        <li>Staggered artist commissioning - delays don't block others</li>
                                        <li>Grant extension possible if emergency significantly disrupts</li>
                                        <li>Artists work at own pace within timeframe</li>
                                        <li>Platform designed for fully remote access</li>
                                        <li>Budget includes £2k contingency for emergency adjustments</li>
                                        <li>Wellbeing research entirely online via digital surveys</li>
                                    </ul>
                                </div>

                                <div className="bg-green-100 p-3 rounded">
                                    <h4 className="font-bold mb-1">RESIDUAL RISK: <span className="text-green-700">GREEN</span></h4>
                                    <p className="text-sm">Flexible, digital-first design means public health restrictions have minimal impact. Remote capability and extended timeline make this tolerable and unlikely.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* OVERALL SUMMARY */}
                    <Card className="border-4 border-blue-600 bg-blue-50">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold mb-4">OVERALL RISK ASSESSMENT SUMMARY</h2>
                            
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="font-bold mb-2">BEFORE MITIGATION:</h3>
                                    <ul className="space-y-1 text-sm">
                                        <li>🔴 <strong>RED:</strong> 3 risks</li>
                                        <li>🟡 <strong>AMBER:</strong> 5 risks</li>
                                        <li>🟢 <strong>GREEN:</strong> 0 risks</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">AFTER MITIGATION:</h3>
                                    <ul className="space-y-1 text-sm">
                                        <li>🔴 <strong>RED:</strong> 0 risks (none unmanageable)</li>
                                        <li>🟡 <strong>AMBER:</strong> 3 risks (tolerable, managed)</li>
                                        <li>🟢 <strong>GREEN:</strong> 5 risks (low, monitored)</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-green-100 p-4 rounded border-l-4 border-green-600 mb-4">
                                <p className="font-bold text-green-800 mb-2">✅ NO UNMANAGEABLE RED RISKS REMAIN</p>
                                <p className="text-sm text-green-900">All critical risks have robust controls. Three AMBER risks (research validity, budget management, data protection) are tolerable and actively managed.</p>
                            </div>

                            <h3 className="font-bold mb-2">KEY RISK MANAGEMENT STRENGTHS:</h3>
                            <ul className="list-disc ml-6 space-y-1 text-sm">
                                <li>Detailed financial controls prevent budget overrun</li>
                                <li>University partnership ensures research credibility</li>
                                <li>Enterprise platform infrastructure guarantees reliability</li>
                                <li>Legal contracts protect artist rights and user data</li>
                                <li>Staggered commissioning allows adaptive project management</li>
                                <li>Local partnerships ensure community engagement</li>
                                <li>Flexible timeline accommodates unforeseen delays</li>
                            </ul>

                            <p className="mt-4 font-bold">
                                This project represents a well-managed, ambitious but achievable initiative that justifies the £100,000 investment.
                            </p>
                        </CardContent>
                    </Card>

                    {/* SIGNATURE */}
                    <div className="border-t-4 border-gray-800 pt-8">
                        <div className="grid grid-cols-2 gap-12">
                            <div>
                                <p className="font-bold mb-2">Signed:</p>
                                <p className="text-xl mb-1">Brian Hughes</p>
                                <p className="text-sm text-gray-600">(CIC Director)</p>
                            </div>
                            <div>
                                <p className="font-bold mb-2">Date:</p>
                                <p className="text-xl">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <p className="text-sm text-gray-600">
                                <strong>Company:</strong> Universal Frequency51 CIC (SC870603)<br/>
                                <strong>Project:</strong> UF51: Commissioning 30 Scottish Musicians for Ethical Streaming Infrastructure<br/>
                                <strong>Grant:</strong> Creative Scotland National Lottery Open Fund for Organisations (£100,000)
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}