import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Upload, CheckCircle, AlertCircle, Loader, Zap, MapPin, DollarSign, User, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CB51GigUploadParser({ artistId, onGigCreated }) {
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [extracted, setExtracted] = useState(null);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [saveError, setSaveError] = useState(null);

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);
    setSaveError(null);
    setParsing(true);

    try {
      const uploadRes = await base44.integrations.Core.UploadFile({
        file: selectedFile
      });

      const schema = {
        type: "object",
        properties: {
          venue_name: { type: "string" },
          date_start: { type: "string" },
          promoter_name: { type: "string" },
          fee: { type: "string" },
          location: { type: "string" }
        }
      };

      const extractRes = await base44.integrations.Core.ExtractDataFromUploadedFile({
        file_url: uploadRes.file_url,
        json_schema: schema
      });

      let content = extractRes.output ? JSON.stringify(extractRes.output) : '';

      const parseRes = await base44.functions.invoke('parseGigFromContent', {
        content,
        contentType: selectedFile.type,
        source: selectedFile.name
      });

      if (parseRes.extracted) {
        setExtracted(parseRes.extracted);
        setEditing({ ...parseRes.extracted });
        if (parseRes.missingCritical?.length > 0) {
          setError(`⚠️ Missing: ${parseRes.missingCritical.join(', ')}`);
        }
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
    <div className="bg-black border-2 border-cyan-500 rounded-lg p-4 mb-4">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-cyan-400" />
        <h2 className="text-cyan-400 font-black text-xs font-mono">AI51 PARSER</h2>
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
          <div className={`border-2 border-dashed border-cyan-500/40 rounded p-4 text-center transition-all ${
            parsing ? 'bg-cyan-900/20 border-cyan-500/60' : 'hover:border-cyan-500/70'
          }`}>
            {parsing ? (
              <>
                <Loader className="w-6 h-6 text-cyan-400 mx-auto animate-spin mb-1" />
                <p className="text-cyan-400 font-bold text-xs">PARSING...</p>
              </>
            ) : (
              <>
                <Upload className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                <p className="text-white font-bold text-xs">Drop PDF or click</p>
              </>
            )}
          </div>
        </motion.label>
      )}

      {/* EXTRACTED DATA REVIEW */}
      <AnimatePresence>
        {extracted && editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-cyan-900/10 border border-cyan-500/30 rounded p-3 mt-3 space-y-2"
          >
            {error && (
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded p-2 flex gap-2">
                <AlertCircle className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-yellow-300 text-[10px]">{error}</p>
              </div>
            )}

            {/* QUICK FIELDS */}
            <div className="space-y-1.5">
              <div>
                <label className="text-gray-500 text-[8px] font-mono uppercase block mb-0.5">Venue</label>
                <input
                  type="text"
                  value={editing.venue_name || ''}
                  onChange={(e) => setEditing({ ...editing, venue_name: e.target.value })}
                  className="w-full bg-black border border-cyan-500/40 rounded px-2 py-1 text-white text-xs"
                  placeholder="Venue name"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-500 text-[8px] font-mono uppercase block mb-0.5">Date</label>
                  <input
                    type="text"
                    value={editing.date_start || ''}
                    onChange={(e) => setEditing({ ...editing, date_start: e.target.value })}
                    className="w-full bg-black border border-cyan-500/40 rounded px-2 py-1 text-white text-xs"
                    placeholder="YYYY-MM-DD"
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-[8px] font-mono uppercase block mb-0.5">Fee £</label>
                  <input
                    type="number"
                    value={editing.fee || ''}
                    onChange={(e) => setEditing({ ...editing, fee: e.target.value ? Number(e.target.value) : null })}
                    className="w-full bg-black border border-cyan-500/40 rounded px-2 py-1 text-white text-xs"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-500 text-[8px] font-mono uppercase block mb-0.5">Promoter</label>
                <input
                  type="text"
                  value={editing.promoter_name || ''}
                  onChange={(e) => setEditing({ ...editing, promoter_name: e.target.value })}
                  className="w-full bg-black border border-cyan-500/40 rounded px-2 py-1 text-white text-xs"
                  placeholder="Name"
                />
              </div>

              <div>
                <label className="text-gray-500 text-[8px] font-mono uppercase block mb-0.5">Email</label>
                <input
                  type="email"
                  value={editing.promoter_email || ''}
                  onChange={(e) => setEditing({ ...editing, promoter_email: e.target.value })}
                  className="w-full bg-black border border-cyan-500/40 rounded px-2 py-1 text-white text-xs"
                  placeholder="contact@venue.com"
                />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 pt-2 border-t border-cyan-500/20">
              <button
                onClick={() => {
                  setExtracted(null);
                  setEditing(null);
                  setFile(null);
                }}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-1.5 rounded text-xs"
              >
                CANCEL
              </button>
              <button
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-bold py-1.5 rounded text-xs"
              >
                {saveMutation.isPending ? 'SAVING...' : 'SAVE'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}