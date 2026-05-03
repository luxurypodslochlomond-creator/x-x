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

      // AI analysis
      const requests = extracted?.output?.requests || [];
      const prompt = `Analyze this procurement data for fragmentation and anomalies:\n${JSON.stringify(requests)}\n\nReturn JSON with: total_requests, fragmentation_score (0-100), price_anomalies (array), potential_savings (£), key_alerts (array).`;

      const aiResult = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: 'object',
          properties: {
            total_requests: { type: 'number' },
            fragmentation_score: { type: 'number' },
            price_anomalies: { type: 'array', items: { type: 'string' } },
            potential_savings: { type: 'number' },
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <p className="text-sm text-cyan-400 mb-2">Requests Analyzed</p>
                  <p className="text-3xl font-black">{analysis.total_requests || 'N/A'}</p>
                </div>
                <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-400 mb-2">Potential Savings</p>
                  <p className="text-3xl font-black">£{analysis.potential_savings || '0'}</p>
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
                  <ul className="space-y-2">
                    {analysis.price_anomalies.map((anom, i) => (
                      <li key={i} className="text-sm text-gray-300">{anom}</li>
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