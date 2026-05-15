import React from 'react';

export default function SortedPrivacy() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: 640, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, color: '#1a1208' }}>SORTED</h1>
        <p style={{ fontSize: 13, letterSpacing: '0.08em', color: 'rgba(26,18,8,0.55)', textTransform: 'uppercase' }}>Privacy Policy</p>
        <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.4)', marginTop: 6 }}>Last updated: May 2026</p>
      </div>

      <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(26,18,8,0.7)', marginBottom: 36, fontStyle: 'italic' }}>
        Privacy isn't a legal checkbox for us — it's the whole point. You're sharing sensitive documents. We designed SORTED so we literally cannot betray your trust, because we never hold your data in the first place.
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>1. What We Collect</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          <strong>Almost nothing.</strong> We do not collect your name, email address, location, or any personal identifiers unless you choose to contact us directly. Your letter or document is sent securely to an AI model for analysis, then immediately discarded — it is never stored on our servers. The result lives only in your browser session.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)', marginTop: 10 }}>
          If you subscribe (SORTED for Life), Stripe processes your payment. We receive confirmation that a payment was made — not your card details. Stripe's privacy policy applies to that transaction.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>2. How We Use AI</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          Your document is processed by a large language model (LLM) via encrypted HTTPS. The AI provider we use operates under terms that explicitly prohibit training on API-submitted data — your content is processed and discarded, not retained or used for model training.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)', marginTop: 10 }}>
          We may create fully anonymised pattern summaries from interactions — for example, noting that "a debt letter was submitted" without any names, amounts, dates, or identifying information — to help improve future advice quality. These patterns cannot be traced back to you.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>3. What We Never Do</h2>
        <ul style={{ fontSize: 14, lineHeight: 2, color: 'rgba(26,18,8,0.65)', paddingLeft: 20, margin: 0 }}>
          <li>Store your letter, document, or personal content</li>
          <li>Sell, rent, or share your data with anyone</li>
          <li>Use your documents to train AI models</li>
          <li>Share your information with third parties for advertising or marketing</li>
          <li>Require an account, login, or email address to use SORTED</li>
          <li>Use tracking cookies or advertising trackers</li>
          <li>Build a profile about you over time</li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>4. Your Control</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          Close the tab — everything is gone. Use the "Clear all my data" button at any time to wipe your local browser history. No account needed. No deletion request needed. There's nothing stored on our end to delete.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>5. GDPR & International Rights</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          SORTED is operated by Universal Frequency 51 CIC, based in Scotland, UK — subject to UK GDPR and the Data Protection Act 2018. Because we collect almost no personal data and process it transiently, our GDPR footprint is minimal by design.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)', marginTop: 10 }}>
          If you are in the <strong>European Union</strong>, your rights under the EU GDPR apply — including the right to access, rectify, or erase any personal data we hold about you. In practice, we hold almost none — but if you want to confirm, email us.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)', marginTop: 10 }}>
          If you are in <strong>California, USA</strong>, your rights under the CCPA apply. We do not sell personal information. Ever.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)', marginTop: 10 }}>
          Wherever you are in the world — your data is yours. That's not a legal formality. That's just how we built it.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>6. Data Transfers</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          When your document is processed by our AI provider, it may transit servers outside the UK or EU. This transfer happens under appropriate safeguards (standard contractual clauses or equivalent protections). The data is processed in real-time and not retained by the AI provider under their API terms.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>7. Children</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          SORTED is not directed at children under 13. We don't knowingly collect data from children. If a young person needs help understanding a letter, a parent or guardian should use the tool on their behalf.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f5a623' }}>8. Contact & Complaints</h2>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(26,18,8,0.65)' }}>
          Questions, concerns, or requests? Email us at <a href="mailto:family@uf51.love" style={{ color: '#f5a623', textDecoration: 'none', fontWeight: 600 }}>family@uf51.love</a> — a real person will read it and reply. If you're in the UK and feel we've mishandled your data, you can also contact the <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#f5a623', textDecoration: 'none', fontWeight: 600 }}>ICO (ico.org.uk)</a>. If you're in the EU, contact your national data protection authority.
        </p>
      </section>

      <p style={{ fontSize: 13, color: 'rgba(26,18,8,0.4)', marginTop: 50, paddingTop: 20, borderTop: '1px solid rgba(245,166,35,0.2)' }}>
        SORTED is part of <strong>Universal Frequency 51 CIC</strong> — a community interest company built to help people, not harvest them. ♾️❤️
      </p>
    </div>
  );
}