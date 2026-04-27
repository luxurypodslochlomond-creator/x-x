export default function SortedLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #080a0f 0%, #1a0f2a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ position: 'relative', width: 64, height: 64 }}>
        {/* Spinning ring */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: '3px solid rgba(249,115,22,0.15)',
          borderTopColor: '#f97316',
          animation: 'sorted-spin 0.8s linear infinite'
        }} />
        {/* Inner pulse */}
        <div style={{
          position: 'absolute', inset: 12,
          borderRadius: '50%',
          background: 'rgba(249,115,22,0.2)',
          animation: 'sorted-pulse 1.2s ease-in-out infinite'
        }} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 22, fontWeight: 900, color: '#f97316', letterSpacing: '-0.02em' }}>SORTED</p>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>LOADING…</p>
      </div>
      <style>{`
        @keyframes sorted-spin { to { transform: rotate(360deg); } }
        @keyframes sorted-pulse { 0%,100% { opacity:0.4; transform:scale(0.9); } 50% { opacity:1; transform:scale(1.1); } }
      `}</style>
    </div>
  );
}