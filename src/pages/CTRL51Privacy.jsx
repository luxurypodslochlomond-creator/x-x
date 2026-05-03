import React from 'react';
import { Link } from 'react-router-dom';

export default function CTRL51Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1a] to-black text-white p-6 lg:p-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/CTRL51" className="text-cyan-400 hover:text-cyan-300 text-sm mb-8 inline-block">← Back to CTRL51</Link>
        
        <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">1. Data Collection</h2>
            <p>CTRL51 collects procurement data that you upload via CSV. This includes product names, supplier names, prices, and quantities. We do not collect personal data unless you provide it voluntarily.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">2. Data Usage</h2>
            <p>Your data is used exclusively for:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Analyzing procurement patterns</li>
              <li>Generating AI insights</li>
              <li>Identifying fragmentation and anomalies</li>
              <li>Supporting your account</li>
            </ul>
            <p className="mt-3">We do not sell, share, or trade your data with third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">3. Data Security</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All data is encrypted in transit (TLS 1.3)</li>
              <li>All data is encrypted at rest (AES-256)</li>
              <li>Access controls limit who can view your data</li>
              <li>Regular security audits ensure compliance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">4. Data Retention</h2>
            <p>We retain your data for as long as your subscription is active. Upon termination, data is deleted within 30 days unless required by law for 7+ years.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">5. Your Rights</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
              <li>Access your data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data</li>
              <li>Port your data to another service</li>
              <li>Object to processing</li>
            </ul>
            <p className="mt-3">Contact us at hello@ctrl51.uk to exercise these rights.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">6. AI Analysis</h2>
            <p>CTRL51 uses AI (Claude Sonnet 4.6) to analyze your procurement data. The AI has no memory between analyses and does not use your data for model training.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">7. Cookies</h2>
            <p>We use minimal cookies for authentication and session management. You can disable cookies in your browser, though this may affect functionality.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">8. Changes</h2>
            <p>We may update this policy. Material changes will be notified via email.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">9. Contact</h2>
            <p>For privacy concerns, contact our Data Protection Officer at dpo@ctrl51.uk</p>
          </section>
        </div>

        <div className="border-t border-cyan-500/20 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>Last updated: May 2026</p>
        </div>
      </div>
    </div>
  );
}