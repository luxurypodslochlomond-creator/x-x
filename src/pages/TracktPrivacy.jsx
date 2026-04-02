import React from 'react';
import TracktLayout from '@/components/trackt/TracktLayout';
import { Shield } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="border-b border-white/5 pb-8 mb-8 last:border-0">
    <h2 className="text-white font-bold mb-3">{title}</h2>
    <div className="text-gray-500 text-sm leading-relaxed space-y-3">{children}</div>
  </div>
);

export default function TracktPrivacy() {
  return (
    <TracktLayout>
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-cyan-400" />
          <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase">Privacy Policy</p>
        </div>
        <h1 className="text-3xl font-black tracking-tight mb-3">Your data, protected.</h1>
        <p className="text-gray-600 font-mono text-xs mb-4">Last updated: April 2026</p>
        <p className="text-gray-400 leading-relaxed mb-12">
          TRACKT is an enterprise B2B platform. We process operational asset data on behalf of our customers. We do not collect personal consumer data, show advertising, or sell data to third parties.
        </p>

        <Section title="Data we process">
          <p><strong className="text-white">Asset data:</strong> RFID tag IDs, scan timestamps, reader location, movement history. This data belongs to the customer and is processed solely to deliver the TRACKT service.</p>
          <p><strong className="text-white">Account data:</strong> Name, email address, and organisation for account holders. Used to provide and administer the service.</p>
          <p><strong className="text-white">Usage data:</strong> Platform usage patterns, query logs, and performance metrics. Used to improve the service. Anonymised before any aggregation.</p>
        </Section>

        <Section title="What we do not do">
          <p>We do not sell customer data. We do not use asset data to train AI models without explicit customer consent. We do not track individuals — TRACKT is an asset tracking platform, not a people tracking platform.</p>
        </Section>

        <Section title="Data storage and security">
          <p>Customer data is stored on UK/EU infrastructure. Data at rest is encrypted (AES-256). Data in transit uses TLS 1.3. Access is role-controlled and audited.</p>
          <p>Edge processing (on-device AI) operates locally and does not transmit raw scan data to TRACKT servers except for sync operations explicitly configured by the customer.</p>
        </Section>

        <Section title="Data retention">
          <p>Active subscription: data retained for the duration of the contract plus 90 days.</p>
          <p>Pilot programme: data deleted within 30 days of programme end unless a subscription commences.</p>
          <p>On termination: data exported to customer and deleted from TRACKT systems within 30 days.</p>
        </Section>

        <Section title="Your rights (UK GDPR)">
          <p>You have the right to access, rectify, or delete personal data we hold about you. You may also request data portability or restrict processing. Contact us at <a href="mailto:privacy@trackt.io" className="text-cyan-400 hover:text-cyan-300">privacy@trackt.io</a>.</p>
        </Section>

        <Section title="Cookies">
          <p>TRACKT uses only technically necessary cookies for session management. We do not use tracking cookies, analytics cookies, or advertising cookies.</p>
        </Section>

        <Section title="Contact">
          <p>Data controller: TRACKT Ltd</p>
          <p>Privacy enquiries: <a href="mailto:privacy@trackt.io" className="text-cyan-400 hover:text-cyan-300">privacy@trackt.io</a></p>
        </Section>

      </div>
    </TracktLayout>
  );
}