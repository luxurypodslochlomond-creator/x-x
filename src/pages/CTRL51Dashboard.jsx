import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import CTRL51Icon from '@/components/ctrl51/CTRL51Icon';

export default function CTRL51Dashboard() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1a] to-black text-white p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <CTRL51Icon size={60} animate={true} />
          </div>
          <h1 className="text-4xl font-black mb-2">CTRL51 Dashboard</h1>
          <p className="text-gray-300">Upload your CSV. Get instant insights.</p>
        </motion.div>

        {/* UPLOAD AREA */}
        {!analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <label className="block p-12 border-2 border-dashed border-cyan-500/40 rounded-xl text-center cursor-pointer hover:border-cyan-500 transition bg-cyan-500/5">
              <Upload className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
              <p className="text-lg font-bold mb-2">Drop your procurement CSV</p>
              <p className="text-sm text-gray-400">Supports: Site, Product, Supplier, Quantity, Price</p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={loading}
                className="hidden"
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
              className="text-center py-12"
            >
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-300">Analyzing procurement data...</p>
              </div>
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
              className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 mb-8"
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <p className="text-sm text-cyan-400 mb-2">Requests Analyzed</p>
                  <p className="text-3xl font-black">{analysis.total_requests || 'N/A'}</p>
                </div>
                <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <p className="text-sm text-amber-400 mb-2">Unique Suppliers</p>
                  <p className="text-3xl font-black">{analysis.supplier_count || 'N/A'}</p>
                </div>
                <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-400 mb-2">Monthly Savings Potential</p>
                  <p className="text-3xl font-black">£{(analysis.potential_savings || 0).toLocaleString()}</p>
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
              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => {
                    setAnalysis(null);
                    setFile(null);
                  }}
                  className="flex-1 px-6 py-3 border border-cyan-500/40 text-cyan-400 font-bold rounded-lg hover:border-cyan-500 transition"
                >
                  Upload New File
                </button>
                <button className="flex-1 px-6 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition">
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