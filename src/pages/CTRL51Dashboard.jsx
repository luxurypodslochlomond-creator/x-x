import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, AlertCircle, TrendingUp, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import CTRL51Icon from '@/components/ctrl51/CTRL51Icon';

export default function CTRL51Dashboard() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'CTRL51 Dashboard';
  }, []);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Upload file
      const { file_url } = await base44.integrations.Core.UploadFile({ file: selectedFile });

      // Parse CSV and analyze
      const extracted = await base44.integrations.Core.ExtractDataFromUploadedFile({
        file_url,
        json_schema: {
          type: 'object',
          properties: {
            requests: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  site: { type: 'string' },
                  product: { type: 'string' },
                  supplier: { type: 'string' },
                  price: { type: 'number' },
                  quantity: { type: 'number' },
                },
              },
            },
          },
        },
      });

      // AI analysis with highest-accuracy model
      const requests = extracted?.output?.requests || [];
      
      // Calculate baseline metrics for AI to reference
      const suppliers = new Set(requests.map(r => r.supplier)).size;
      const avgPrice = requests.length > 0 
        ? requests.reduce((sum, r) => sum + (r.price || 0), 0) / requests.length 
        : 0;
      
      const prompt = `You are a procurement intelligence expert. Analyze this council purchasing data for spend fragmentation, supplier concentration, price anomalies, and savings opportunities.

Data Summary: ${requests.length} line items, ${suppliers} unique suppliers, avg unit price £${avgPrice.toFixed(2)}

Detailed Data:
${JSON.stringify(requests, null, 2)}

ANALYZE FOR:
1. Supplier fragmentation - too many suppliers for same products?
2. Price anomalies - outliers vs baseline prices?
3. Consolidation opportunities - products bought from multiple suppliers at different prices?
4. Benchmark violations - prices significantly above/below market?
5. Unapproved supplier usage - potential compliance issues?

Return detailed JSON with realistic numbers based on this actual data.`;

      const aiResult = await base44.integrations.Core.InvokeLLM({
        prompt,
        model: 'claude_opus_4_7', // Fastest + most accurate for complex analysis
        response_json_schema: {
          type: 'object',
          properties: {
            total_requests: { type: 'number' },
            fragmentation_score: { type: 'number', description: '0-100 based on supplier concentration' },
            supplier_count: { type: 'number' },
            unique_products: { type: 'number' },
            price_anomalies: { 
              type: 'array', 
              items: { 
                type: 'object',
                properties: {
                  product: { type: 'string' },
                  issue: { type: 'string' },
                  impact: { type: 'string' }
                }
              }
            },
            potential_savings: { type: 'number', description: 'Estimated £ per month' },
            consolidation_opportunities: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  product: { type: 'string' },
                  current_suppliers: { type: 'number' },
                  price_range: { type: 'string' },
                  recommended_action: { type: 'string' }
                }
              }
            },
            key_alerts: { type: 'array', items: { type: 'string' } },
          },
        },
      });

      setAnalysis(aiResult);
      setFile(selectedFile.name);
    } catch (err) {
      setError(err?.message || 'Failed to analyze file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#fff', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* STICKY HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8,10,15,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(249,115,22,0.15)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/CTRL51" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#f97316', background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>
          <ArrowLeft className="w-4 h-4" />
          BACK
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CTRL51Icon size={28} animate={false} />
          <span style={{ fontSize: 14, fontWeight: 900, color: '#fff' }}>CTRL51</span>
        </div>
        <div style={{ width: 60 }} />
      </header>

      <div style={{ maxWidth: '520px', margin: '0 auto', padding: 'clamp(40px, 12vw, 60px) 20px 60px' }}>
        {/* HEADLINE */}
        {!analysis && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginBottom: 32 }}
          >
            <h1 style={{ fontSize: 'clamp(28px, 7vw, 38px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 12px', color: '#fff' }}>
              <span style={{ color: '#fff' }}>Upload your</span>{' '}
              <span style={{ color: '#f97316' }}>CSV</span>
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6 }}>
              Instant procurement intelligence. Fragmentation, savings, anomalies.
            </p>
          </motion.div>
        )}

        {/* UPLOAD AREA */}
        {!analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 32 }}
          >
            <label style={{
              display: 'block',
              padding: '32px 24px',
              border: '2px dashed rgba(249,115,22,0.3)',
              borderRadius: 16,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s',
              background: 'rgba(249,115,22,0.06)',
              position: 'relative'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.6)'; e.currentTarget.style.background = 'rgba(249,115,22,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)'; e.currentTarget.style.background = 'rgba(249,115,22,0.06)'; }}
            >
              <Upload style={{ width: 40, height: 40, margin: '0 auto 16px', color: '#f97316' }} />
              <p style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px', color: '#fff' }}>Drop your CSV</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>Site, Product, Supplier, Quantity, Price</p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={loading}
                style={{ display: 'none' }}
              />
            </label>
          </motion.div>
        )}

        {/* LOADING */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '40px 0' }}
            >
              <div style={{ display: 'inline-block' }}>
                <div style={{ width: 48, height: 48, border: '3px solid rgba(249,115,22,0.2)', borderTopColor: '#f97316', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
                <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: 14 }}>Analyzing...</p>
              </div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ERROR */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ padding: '16px 20px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, color: '#ef4444', marginBottom: 16, fontSize: 13 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* RESULTS */}
        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Summary Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
                <div style={{ padding: 16, background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: 12 }}>
                  <p style={{ fontSize: 11, color: '#f97316', marginBottom: 8, fontWeight: 700, letterSpacing: '0.05em' }}>ANALYZED</p>
                  <p style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 900, margin: 0, color: '#fff' }}>{analysis.total_requests || 'N/A'}</p>
                </div>
                <div style={{ padding: 16, background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: 12 }}>
                  <p style={{ fontSize: 11, color: '#f97316', marginBottom: 8, fontWeight: 700, letterSpacing: '0.05em' }}>SUPPLIERS</p>
                  <p style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 900, margin: 0, color: '#fff' }}>{analysis.supplier_count || 'N/A'}</p>
                </div>
                <div style={{ padding: 16, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12 }}>
                  <p style={{ fontSize: 11, color: '#22c55e', marginBottom: 8, fontWeight: 700, letterSpacing: '0.05em' }}>SAVINGS</p>
                  <p style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 900, margin: 0, color: '#22c55e' }}>£{(analysis.potential_savings || 0).toLocaleString()}</p>
                </div>
              </div>

              {/* Fragmentation Score */}
              <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                <p className="text-sm text-cyan-400 mb-4 font-bold">Fragmentation Score</p>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-3 rounded-full transition-all"
                    style={{ width: `${analysis.fragmentation_score || 0}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">{analysis.fragmentation_score || 0}% fragmentation detected</p>
              </div>

              {/* Alerts */}
              {analysis.key_alerts && analysis.key_alerts.length > 0 && (
                <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-400 mb-4 font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Key Alerts
                  </p>
                  <ul className="space-y-2">
                    {analysis.key_alerts.map((alert, i) => (
                      <li key={i} className="text-sm text-gray-300 flex gap-2">
                        <span className="text-red-400 mt-0.5">•</span>
                        {alert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price Anomalies */}
              {analysis.price_anomalies && analysis.price_anomalies.length > 0 && (
                <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                  <p className="text-sm text-yellow-400 mb-4 font-bold">Price Anomalies</p>
                  <ul className="space-y-3">
                    {analysis.price_anomalies.map((anom, i) => (
                      <li key={i} className="text-sm text-gray-300 border-l-2 border-yellow-500/30 pl-3">
                        <p className="font-semibold text-yellow-300">{anom.product}</p>
                        <p className="text-xs text-gray-400 mt-1">{anom.issue}</p>
                        <p className="text-xs text-yellow-300/70 mt-1">Impact: {anom.impact}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Consolidation Opportunities */}
              {analysis.consolidation_opportunities && analysis.consolidation_opportunities.length > 0 && (
                <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-400 mb-4 font-bold">Consolidation Opportunities</p>
                  <ul className="space-y-3">
                    {analysis.consolidation_opportunities.map((opp, i) => (
                      <li key={i} className="text-sm text-gray-300 border-l-2 border-green-500/30 pl-3">
                        <p className="font-semibold text-green-300">{opp.product}</p>
                        <p className="text-xs text-gray-400 mt-1">{opp.current_suppliers} suppliers • Price range: {opp.price_range}</p>
                        <p className="text-xs text-green-300/70 mt-1">→ {opp.recommended_action}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: 12, marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => {
                    setAnalysis(null);
                    setFile(null);
                  }}
                  style={{ flex: 1, padding: '12px 20px', border: '1px solid rgba(249,115,22,0.3)', color: '#f97316', fontWeight: 700, borderRadius: 10, background: 'rgba(249,115,22,0.08)', cursor: 'pointer', transition: 'all 0.15s', fontSize: 13, letterSpacing: '-0.01em' }}
                  onMouseEnter={(e) => { e.target.style.borderColor = 'rgba(249,115,22,0.6)'; e.target.style.background = 'rgba(249,115,22,0.12)'; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(249,115,22,0.3)'; e.target.style.background = 'rgba(249,115,22,0.08)'; }}
                >
                  Upload New File
                </button>
                <button style={{ flex: 1, padding: '12px 20px', background: '#f97316', color: '#000', fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer', transition: 'all 0.15s', fontSize: 13, letterSpacing: '-0.01em' }}
                  onMouseEnter={(e) => e.target.style.background = '#ea580c'}
                  onMouseLeave={(e) => e.target.style.background = '#f97316'}
                >
                  Export Report
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}