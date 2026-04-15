export default function SortedPrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#fff', fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", padding: '40px 20px', fontSize: '16px', lineHeight: 1.6 }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, color: '#f97316' }}>SORTED</h1>
          <p style={{ fontSize: 13, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)' }}>PRIVACY POLICY</p>
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: 32 }}>
          Your privacy is real. We don't store your data. We don't sell it. We don't track you. That's not zero ego — that's just respect.
        </p>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f97316' }}>What We See</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}>
            You paste in a letter. We see it. Our AI reads it. That's all. We don't see who you are, where you live, or what device you're using. No tracking. No cookies. No ads.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f97316' }}>What We Keep</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}>
            Nothing. Your letter gets processed and forgotten. We don't log it. We don't use it to train AI. It's gone the moment you leave the page.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f97316' }}>How We Talk to Our AI</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}>
            We send your letter to an AI service to decode it. That service sees it once. We don't sell your data to anyone. We don't rent it out. You're not a product.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f97316' }}>Keeping It Safe</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}>
            We use encryption (HTTPS) to move your data. It's standard web security. Not bulletproof, but solid. If something goes wrong, we own it.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f97316' }}>Your Rights</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}>
            We don't keep anything, so there's nothing to delete. Your privacy is by design, not by policy.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#f97316' }}>If We Change This</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}>
            We'll update this policy and tell you. If you keep using SORTED, you agree to the new version.
          </p>
        </section>

        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 50, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          Questions? <a href="mailto:family@uf51.love" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 600 }}>family@uf51.love</a>
        </p>
      </div>
    </div>
  );
}