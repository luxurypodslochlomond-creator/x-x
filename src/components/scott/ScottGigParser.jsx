import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Upload, Zap, CheckCircle, AlertCircle, Copy, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EXTRACTION_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string", description: "Gig name/festival" },
    promoter_name: { type: "string", description: "Who's promoting" },
    promoter_email: { type: "string", description: "Promoter email" },
    promoter_phone: { type: "string", description: "Promoter phone" },
    location: { type: "string", description: "City/venue" },
    date_start: { type: "string", format: "date", description: "Start date YYYY-MM-DD" },
    date_end: { type: "string", format: "date", description: "End date if multi-day" },
    fee: { type: "number", description: "Payment in GBP" },
    accommodation_included: { type: "boolean" },
    travel_included: { type: "boolean" },
    offer_details: { type: "string", description: "Full offer text" },
    confidence_scores: {
      type: "object",
      description: "Confidence (0-100) for each field"
    }
  }
};

export default function ScottGigParser({ artistId, onSuccess, onCancel }) {
  const queryClient = useQueryClient();
  const [mode, setMode] = useState('paste'); // 'paste' or 'upload'
  const [rawInput, setRawInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [error, setError] = useState('');

  const parseInput = async () => {
    if (!rawInput.trim()) {
      setError('Paste text or upload file');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Extract gig offer details from this text. Be strict - only extract what's clearly stated. Return ONLY the JSON with confidence scores (0-100) for each field. If a field can't be extracted, set to null but include confidence_scores.\n\n${rawInput}`,
        response_json_schema: EXTRACTION_SCHEMA
      });

      setExtractedData(response);
      setEditedData(response);
    } catch (err) {
      setError('AI parse failed: ' + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setError('');

    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      const { output } = await base44.integrations.Core.ExtractDataFromUploadedFile({
        file_url,
        json_schema: { type: "object", properties: { text: { type: "string" } } }
      });

      if (output?.text) {
        setRawInput(output.text);
        setMode('paste');
      } else {
        setError('Could not extract text from file');
      }
    } catch (err) {
      setError('File upload failed: ' + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      const cleaned = { ...data };
      delete cleaned.confidence_scores;

      const gig = await base44.entities.GigOffer.create({
        artist_id: artistId,
        ...cleaned,
        status: 'manager_reviewing',
        manager_decision: null
      });

      return gig;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      onSuccess?.();
    }
  });

  const ConfidenceBar = ({ confidence }) => {
    const color = confidence >= 85 ? 'bg-green-500' : confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500';
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-black/60 rounded-full overflow-hidden">
          <div className={`h-full ${color}`} style={{ width: `${confidence}%` }} />
        </div>
        <span className="text-xs text-gray-400 w-10 text-right">{confidence}%</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-b from-black via-cyan-950/20 to-black border-2 border-cyan-500/50 rounded-xl p-6 space-y-4"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-cyan-400" />
          <h2 className="text-white font-black text-lg font-mono">AI GIG PARSER</h2>
        </div>
        <button onClick={onCancel} className="p-1.5 hover:bg-cyan-500/20 rounded-lg transition-colors">
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {!extractedData ? (
        <>
          {/* MODE TABS */}
          <div className="flex gap-2 border-b border-cyan-500/30">
            <button
              onClick={() => setMode('paste')}
              className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                mode === 'paste'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-gray-500 hover:text-gray-400'
              }`}
            >
              PASTE TEXT
            </button>
            <button
              onClick={() => setMode('upload')}
              className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${
                mode === 'upload'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-gray-500 hover:text-gray-400'
              }`}
            >
              UPLOAD FILE
            </button>
          </div>

          {/* PASTE MODE */}
          {mode === 'paste' && (
            <textarea
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="Paste email, WhatsApp, doc content... anything with gig details"
              className="w-full h-32 bg-black border-2 border-cyan-500/30 rounded-lg p-3 text-white placeholder-gray-600 font-mono text-sm focus:border-cyan-400 focus:outline-none resize-none"
            />
          )}

          {/* UPLOAD MODE */}
          {mode === 'upload' && (
            <label className="border-2 border-dashed border-cyan-500/50 rounded-lg p-6 text-center hover:border-cyan-400 hover:bg-cyan-500/5 transition-all cursor-pointer">
              <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-cyan-400 font-bold text-sm">Click to upload PDF, DOC, image, etc</p>
              <p className="text-gray-500 text-xs mt-1">AI will extract the gig details</p>
              <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx,.txt,.jpg,.png,.jpeg" />
            </label>
          )}

          {error && (
            <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/50 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-xs">{error}</p>
            </div>
          )}

          {/* ANALYZE BUTTON */}
          <button
            onClick={parseInput}
            disabled={isAnalyzing || !rawInput.trim()}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black py-3 rounded-lg transition-colors"
          >
            {isAnalyzing ? 'ANALYZING...' : 'ANALYZE WITH AI'}
          </button>
        </>
      ) : (
        <>
          {/* REVIEW EXTRACTED DATA */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {[
              { key: 'title', label: 'Gig Name', type: 'text' },
              { key: 'promoter_name', label: 'Promoter', type: 'text' },
              { key: 'promoter_email', label: 'Email', type: 'email' },
              { key: 'promoter_phone', label: 'Phone', type: 'text' },
              { key: 'location', label: 'Location', type: 'text' },
              { key: 'date_start', label: 'Start Date', type: 'date' },
              { key: 'date_end', label: 'End Date', type: 'date' },
              { key: 'fee', label: 'Fee (£)', type: 'number' },
              { key: 'accommodation_included', label: 'Accommodation?', type: 'checkbox' },
              { key: 'travel_included', label: 'Travel?', type: 'checkbox' },
              { key: 'offer_details', label: 'Details', type: 'textarea' }
            ].map(field => {
              const confidence = extractedData?.confidence_scores?.[field.key] || 0;
              const value = editedData?.[field.key];

              return (
                <div key={field.key} className="bg-black/60 border border-cyan-500/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-cyan-400 font-bold text-xs font-mono">{field.label}</label>
                    <ConfidenceBar confidence={confidence} />
                  </div>

                  {field.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={(e) => setEditedData({ ...editedData, [field.key]: e.target.checked })}
                      className="w-5 h-5"
                    />
                  ) : field.type === 'textarea' ? (
                    <textarea
                      value={value || ''}
                      onChange={(e) => setEditedData({ ...editedData, [field.key]: e.target.value })}
                      className="w-full h-20 bg-black border border-cyan-500/20 rounded p-2 text-white text-sm resize-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={value || ''}
                      onChange={(e) => setEditedData({ ...editedData, [field.key]: e.target.value })}
                      className="w-full bg-black border border-cyan-500/20 rounded p-2 text-white text-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setExtractedData(null)}
              className="flex-1 bg-black border-2 border-gray-500/30 hover:border-gray-500/50 text-gray-400 font-bold py-2 rounded-lg transition-colors"
            >
              BACK
            </button>
            <button
              onClick={() => saveMutation.mutate(editedData)}
              disabled={saveMutation.isPending}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              {saveMutation.isPending ? 'SAVING...' : 'SAVE AS PENDING'}
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}