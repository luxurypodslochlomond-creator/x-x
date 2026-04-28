import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Check } from 'lucide-react';

export default function AdminInvoiceGenerator() {
  const [guestName, setGuestName] = useState('James Conor');
  const [amount, setAmount] = useState('315');
  const [dates, setDates] = useState('27-28 April 2026');
  const [email, setEmail] = useState('james@jcinternational-transport.com');
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const generateAndDownload = async () => {
    if (!guestName.trim() || !amount.trim() || !dates.trim()) {
      alert('Please fill in guest name, amount, and dates');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/functions/generateInvoicePDF', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestName, amount, dates, email })
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice_${guestName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (err) {
      console.error('Invoice download error:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1a', padding: '40px 20px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 8 }}>
          Invoice Generator
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
          Create & download guest invoices for Stoneymollan Estate
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}
        >
          {/* Guest Name */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: 8, letterSpacing: '0.1em' }}>
              GUEST NAME
            </label>
            <input
              type="text"
              value={guestName}
              onChange={e => setGuestName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: '#fff',
                fontSize: 14,
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Amount */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: 8, letterSpacing: '0.1em' }}>
              AMOUNT (£)
            </label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: '#fff',
                fontSize: 14,
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Dates */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: 8, letterSpacing: '0.1em' }}>
              STAY DATES
            </label>
            <input
              type="text"
              value={dates}
              onChange={e => setDates(e.target.value)}
              placeholder="e.g. 27-28 April 2026"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: '#fff',
                fontSize: 14,
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: 8, letterSpacing: '0.1em' }}>
              GUEST EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: '#fff',
                fontSize: 14,
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Download Button */}
          <motion.button
            onClick={generateAndDownload}
            disabled={loading}
            whileTap={{ scale: 0.96 }}
            style={{
              marginTop: 12,
              padding: '16px 0',
              borderRadius: 12,
              border: '2px solid #22c55e',
              background: '#22c55e',
              color: '#000',
              fontSize: 14,
              fontWeight: 900,
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.2s'
            }}
          >
            {loading ? (
              <>
                <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #000', borderTopColor: 'transparent', animation: 'spin 0.6s linear infinite' }} />
                GENERATING...
              </>
            ) : downloaded ? (
              <>
                <Check size={16} />
                DOWNLOADED ✓
              </>
            ) : (
              <>
                <Download size={16} />
                DOWNLOAD INVOICE PDF
              </>
            )}
          </motion.button>

          {/* Info */}
          <div style={{ padding: '16px', borderRadius: 10, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(34,197,94,0.7)', lineHeight: 1.6 }}>
              ✓ PDF includes Stoneymollan Estate details<br/>
              ✓ Marked as PAID<br/>
              ✓ Ready to email to guest
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}