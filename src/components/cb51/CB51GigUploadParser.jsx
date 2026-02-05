import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';

export default function CB51GigUploadParser({ artistId, onGigCreated }) {
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [extracted, setExtracted] = useState(null);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);
    setParsing(true);

    try {
      // Upload file to get URL
      const uploadRes = await base44.integrations.Core.UploadFile({
        file: selectedFile
      });

      // Extract text from uploaded file
      const schema = {
        type: "object",
        properties: {
          venue_name: { type: "string" },
          date_start: { type: "string" },
          promoter_name: { type: "string" }
        }
      };

      const extractRes = await base44.integrations.Core.ExtractDataFromUploadedFile({
        file_url: uploadRes.file_url,
        json_schema: schema
      });

      let content = '';
      if (extractRes.output) {
        content = typeof extractRes.output === 'string' 
          ? extractRes.output 
          : JSON.stringify(extractRes.output);
      }

      // Parse with AI
      const parseRes = await base44.functions.invoke('parseGigFromContent', {
        content: content,
        contentType: selectedFile.type,
        source: selectedFile.name
      });

      setExtracted(parseRes.extracted);
      setEditing({ ...parseRes.extracted });

      if (parseRes.missingCritical?.length > 0) {
        setError(`Missing: ${parseRes.missingCritical.join(', ')}`);
      }
    } catch (err) {
      setError(err.message || 'Failed to parse file');
      console.error(err);
    } finally {
      setParsing(false);
    }
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const gig = await base44.entities.GigOffer.create({
        artist_id: artistId,
        title: editing.venue_name || 'Untitled Gig',
        venue: editing.venue_name,
        location: editing.location,
        date_start: editing.date_start,
        time_start: editing.time_start,
        fee: editing.fee,
        promoter_name: editing.promoter_name,
        promoter_email: editing.promoter_email,
        promoter_phone: editing.promoter_phone,
        offer_details: editing.notes,
        status: 'manager_reviewing',
        manager_decision: null
      });

      // Trigger notification
      await base44.functions.invoke('notifyManagerGigOffer', {
        gigOfferId: gig.id
      });

      return gig;
    },
    onSuccess: (gig) => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      setExtracted(null);
      setEditing(null);
      setFile(null);
      onGigCreated?.(gig);
    }
  });

  return (
    <div className="bg-black border-2 border-cyan-500/50 rounded-lg p-4">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">
        <COOLASFUCKWaves size={32} animate={true} />
        <div>
          <h2 className="text-cyan-400 font-black text-sm font-mono">AI51 GIG UPLOAD</h2>
          <p className="text-gray-600 text-xs">Email, PDF, Word, Excel, images</p>
        </div>
      </div>

      {/* UPLOAD INPUT */}
      {!extracted && (
        <motion.label
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="block cursor-pointer"
        >
          <input
            type="file"
            onChange={handleFileSelect}
            disabled={parsing}
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.eml,.txt"
          />
          <div className={`border-2 border-dashed border-cyan-500/30 rounded-lg p-6 text-center transition-all ${
            parsing ? 'bg-cyan-900/10 border-cyan-500/50' : 'hover:border-cyan-500/60 hover:bg-cyan-900/5'
          }`}>
            {parsing ? (
              <>
                <Loader className="w-8 h-8 text-cyan-400 mx-auto animate-spin mb-2" />
                <p className="text-cyan-400 font-bold text-sm">AI51 PARSING...</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-bold text-sm">DROP FILE OR CLICK</p>
                <p className="text-gray-600 text-xs mt-1">PDF, email, Excel, Word, screenshot</p>
              </>
            )}
          </div>
        </motion.label>
      )}

      {/* EXTRACTED DATA REVIEW */}
      <AnimatePresence>
        {extracted && editing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 mt-4"
          >
            {error && (
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded p-3 flex gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-yellow-300 text-xs">{error}</p>
              </div>
            )}

            {/* EDITABLE FIELDS */}
            <div className="space-y-2">
              <div>
                <label className="text-gray-600 text-[9px] font-mono uppercase">VENUE</label>
                <input
                  type="text"
                  value={editing.venue_name || ''}
                  onChange={(e) => setEditing({ ...editing, venue_name: e.target.value })}
                  className="w-full bg-cyan-900/10 border border-cyan-500/30 rounded px-2 py-1 text-white text-xs"
                />
                {extracted.confidence_scores?.venue && (
                  <p className="text-[8px] text-gray-600 mt-0.5">Confidence: {Math.round(extracted.confidence_scores.venue * 100)}%</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-600 text-[9px] font-mono uppercase">DATE</label>
                  <input
                    type="text"
                    value={editing.date_start || ''}
                    onChange={(e) => setEditing({ ...editing, date_start: e.target.value })}
                    className="w-full bg-cyan-900/10 border border-cyan-500/30 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-[9px] font-mono uppercase">TIME</label>
                  <input
                    type="text"
                    value={editing.time_start || ''}
                    onChange={(e) => setEditing({ ...editing, time_start: e.target.value })}
                    className="w-full bg-cyan-900/10 border border-cyan-500/30 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-600 text-[9px] font-mono uppercase">FEE</label>
                  <input
                    type="number"
                    value={editing.fee || ''}
                    onChange={(e) => setEditing({ ...editing, fee: e.target.value ? Number(e.target.value) : null })}
                    className="w-full bg-cyan-900/10 border border-cyan-500/30 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-[9px] font-mono uppercase">PROMOTER</label>
                  <input
                    type="text"
                    value={editing.promoter_name || ''}
                    onChange={(e) => setEditing({ ...editing, promoter_name: e.target.value })}
                    className="w-full bg-cyan-900/10 border border-cyan-500/30 rounded px-2 py-1 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-600 text-[9px] font-mono uppercase">EMAIL</label>
                <input
                  type="email"
                  value={editing.promoter_email || ''}
                  onChange={(e) => setEditing({ ...editing, promoter_email: e.target.value })}
                  className="w-full bg-cyan-900/10 border border-cyan-500/30 rounded px-2 py-1 text-white text-xs"
                />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setExtracted(null);
                  setEditing(null);
                }}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded text-xs"
              >
                CANCEL
              </button>
              <button
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-bold py-2 rounded text-xs flex items-center justify-center gap-2"
              >
                {saveMutation.isPending ? (
                  <>
                    <Loader className="w-3 h-3 animate-spin" />
                    SAVING...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    SAVE GIG
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}