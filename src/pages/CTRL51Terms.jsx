import React from 'react';
import { Link } from 'react-router-dom';

export default function CTRL51Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1a] to-black text-white p-6 lg:p-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/CTRL51" className="text-cyan-400 hover:text-cyan-300 text-sm mb-8 inline-block">← Back to CTRL51</Link>
        
        <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
        
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">1. Agreement</h2>
            <p>By using CTRL51, you agree to these terms and conditions. If you do not agree, do not use the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">2. Service Description</h2>
            <p>CTRL51 provides procurement intelligence and analysis tools for public sector organizations. The service analyzes procurement data to identify fragmentation, price anomalies, and savings opportunities.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">3. User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You must ensure data uploaded is accurate and legally yours to share</li>
              <li>You agree not to use CTRL51 for unlawful purposes</li>
              <li>You must comply with all applicable data protection regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">4. Intellectual Property</h2>
            <p>CTRL51, its design, features, and functionality are owned by UF51. You may not reproduce, distribute, or modify any part of the service without permission.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">5. Limitation of Liability</h2>
            <p>CTRL51 is provided "as is" without warranty. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">6. Payment Terms</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Payment is due upon invoice</li>
              <li>Subscriptions auto-renew unless cancelled</li>
              <li>No refunds for partial months</li>
              <li>Pricing may change with 30 days notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">7. Termination</h2>
            <p>Either party may terminate the agreement with 30 days written notice. Upon termination, your data will be deleted within 30 days unless required by law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">8. Governing Law</h2>
            <p>These terms are governed by the laws of England and Wales.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">9. Contact</h2>
            <p>For questions about these terms, contact us at hello@ctrl51.uk</p>
          </section>
        </div>

        <div className="border-t border-cyan-500/20 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>Last updated: May 2026</p>
        </div>
      </div>
    </div>
  );
}