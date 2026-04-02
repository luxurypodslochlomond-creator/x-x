import React from 'react';
import TracktLayout from '@/components/trackt/TracktLayout';

const Section = ({ title, children }) => (
  <div className="border-b border-white/5 pb-8 mb-8 last:border-0">
    <h2 className="text-white font-bold mb-3">{title}</h2>
    <div className="text-gray-500 text-sm leading-relaxed space-y-3">{children}</div>
  </div>
);

export default function TracktTerms() {
  return (
    <TracktLayout>
      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">Legal</p>
        <h1 className="text-3xl font-black tracking-tight mb-3">Terms of Service</h1>
        <p className="text-gray-600 font-mono text-xs mb-12">Last updated: April 2026</p>

        <Section title="1. Service Description">
          <p>TRACKT provides an AI-powered intelligence layer for RFID infrastructure. The service enables natural language querying of asset data, anomaly detection, and operational reporting on top of existing RFID hardware systems.</p>
        </Section>

        <Section title="2. Pilot Programme">
          <p>The TRACKT 30-day pilot programme is provided free of charge to qualifying organisations. Pilot access is limited to one site and up to 500 active RFID tags. TRACKT reserves the right to accept or decline pilot applications at its sole discretion.</p>
          <p>Pilot data will not be retained after programme conclusion unless a paid subscription is commenced.</p>
        </Section>

        <Section title="3. Subscriptions and Payment">
          <p>Operational and Enterprise subscriptions are billed monthly per site. Payment is due in advance. Pricing is confirmed at time of contract. TRACKT may update pricing with 30 days' written notice.</p>
          <p>Refund policy: If TRACKT is not operational within 30 days of commencement, the first month's fee will be refunded in full.</p>
        </Section>

        <Section title="4. Data and Confidentiality">
          <p>Asset data processed by TRACKT remains the property of the customer. TRACKT will not share, sell, or use customer operational data for purposes other than delivering the service.</p>
          <p>TRACKT may use anonymised, aggregated performance metrics to improve the platform.</p>
        </Section>

        <Section title="5. Acceptable Use">
          <p>TRACKT is provided for legitimate operational asset tracking and management purposes. The service must not be used for unlawful surveillance, to track individuals without their knowledge, or for any purpose that violates applicable law.</p>
        </Section>

        <Section title="6. Uptime and SLA">
          <p>Operational and Enterprise subscribers receive SLA-backed support. Target platform uptime is 99.5% monthly. Edge processing functionality operates independently of platform availability.</p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>TRACKT is a decision-support tool. Operational decisions made on the basis of TRACKT data remain the responsibility of the customer. TRACKT's liability is limited to fees paid in the preceding 3 months.</p>
        </Section>

        <Section title="8. Termination">
          <p>Either party may terminate the service with 30 days' written notice. Customer data will be exported and deleted within 30 days of termination.</p>
        </Section>

        <Section title="9. Contact">
          <p>Legal enquiries: <a href="mailto:legal@trackt.io" className="text-cyan-400 hover:text-cyan-300">legal@trackt.io</a></p>
        </Section>
      </div>
    </TracktLayout>
  );
}