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
      if (!editing.venue_name || !editing.date_start || !editing.promoter_name) {
        setSaveError('Need: Venue, Date & Promoter name');
        throw new Error('Missing required fields');
      }

      const gig = await base44.entities.GigOffer.create({
            artist_id: artistId,
            title: editing.venue_name || 'Untitled Gig',
            venue: editing.venue_name,
            location: editing.location || '',
            date_start: editing.date_start,
            time_start: editing.time_start || '',
            fee: editing.fee ? Number(editing.fee) : null,
            promoter_name: editing.promoter_name,
            promoter_email: editing.promoter_email || '',
            promoter_phone: editing.promoter_phone || '',
            offer_details: editing.offer_details || editing.notes || '',
            status: 'manager_reviewing'
          });

          // Fire notification after gig created
          try {
            await base44.functions.invoke('notifyManagerPendingGig', {
              gigId: gig.id,
              artistId: artistId,
              venueName: editing.venue_name,
              promoterName: editing.promoter_name
            });
          } catch (notifyErr) {
            console.log('Notification send failed (non-critical):', notifyErr.message);
          }

          return gig;
    },
    onSuccess: (gig) => {
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      setExtracted(null);
      setEditing(null);
      setFile(null);
      setSaveError(null);
      onGigCreated?.(gig);
    },
    onError: (err) => {
      setSaveError(err.message);
    }
  });

  return (
    <div className="mb-4 space-y-2">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-cyan-400" />
        <h2 className="text-cyan-400 font-black text-sm font-mono">GIG UPLOAD</h2>
      </div>

      {/* UPLOAD AREA */}
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
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          />
          <div className={`border-2 border-dashed border-cyan-500/40 rounded-lg p-6 text-center transition-all ${
            parsing ? 'bg-cyan-900/20 border-cyan-500/60' : 'hover:border-cyan-500/70 hover:bg-cyan-900/10'
          }`}>
            {parsing ? (
              <>
                <Loader className="w-8 h-8 text-cyan-400 mx-auto animate-spin mb-2" />
                <p className="text-cyan-400 font-bold text-sm">PARSING PDF...</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-bold text-sm">Drop PDF or click</p>
                <p className="text-gray-500 text-xs mt-1">Contracts, offers, details</p>
              </>
            )}
          </div>
        </motion.label>
      )}

      {/* EXTRACTED PREVIEW */}
      <AnimatePresence mode="wait">
        {extracted && editing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {error && (
              <div className="bg-yellow-900/30 border border-yellow-500/40 rounded-lg p-3 flex gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-yellow-300 text-xs">{error}</p>
              </div>
            )}

            {/* GRID CARDS */}
            <div className="grid grid-cols-2 gap-2">
              {/* VENUE */}
              <div className="bg-black border-2 border-cyan-500/40 rounded-lg p-3">
                <label className="text-gray-500 text-[9px] font-mono uppercase block mb-1">VENUE</label>
                <input
                  type="text"
                  value={editing.venue_name || ''}
                  onChange={(e) => setEditing({ ...editing, venue_name: e.target.value })}
                  className="w-full bg-cyan-900/20 border border-cyan-500/30 rounded px-2 py-2 text-white text-xs font-bold placeholder-gray-600"
                  placeholder="Required"
                />
              </div>

              {/* DATE */}
              <div className="bg-black border-2 border-cyan-500/40 rounded-lg p-3">
                <label className="text-gray-500 text-[9px] font-mono uppercase block mb-1">DATE</label>
                <input
                  type="text"
                  value={editing.date_start || ''}
                  onChange={(e) => setEditing({ ...editing, date_start: e.target.value })}
                  className="w-full bg-cyan-900/20 border border-cyan-500/30 rounded px-2 py-2 text-white text-xs font-bold placeholder-gray-600"
                  placeholder="YYYY-MM-DD"
                />
              </div>

              {/* FEE */}
              <div className="bg-black border-2 border-green-500/40 rounded-lg p-3">
                <label className="text-gray-500 text-[9px] font-mono uppercase block mb-1">FEE</label>
                <input
                  type="text"
                  value={editing.fee || ''}
                  onChange={(e) => setEditing({ ...editing, fee: e.target.value })}
                  className="w-full bg-green-900/20 border border-green-500/30 rounded px-2 py-2 text-white text-xs font-bold placeholder-gray-600"
                  placeholder="£"
                />
              </div>

              {/* PROMOTER */}
              <div className="bg-black border-2 border-cyan-500/40 rounded-lg p-3">
                <label className="text-gray-500 text-[9px] font-mono uppercase block mb-1">PROMOTER</label>
                <input
                  type="text"
                  value={editing.promoter_name || ''}
                  onChange={(e) => setEditing({ ...editing, promoter_name: e.target.value })}
                  className="w-full bg-cyan-900/20 border border-cyan-500/30 rounded px-2 py-2 text-white text-xs font-bold placeholder-gray-600"
                  placeholder="Required"
                />
              </div>
            </div>

            {/* CONTACT DETAILS - Full width */}
            <div className="space-y-2">
              <div className="bg-black border-2 border-cyan-500/40 rounded-lg p-3">
                <label className="text-gray-500 text-[9px] font-mono uppercase block mb-1">EMAIL</label>
                <input
                  type="email"
                  value={editing.promoter_email || ''}
                  onChange={(e) => setEditing({ ...editing, promoter_email: e.target.value })}
                  className="w-full bg-cyan-900/20 border border-cyan-500/30 rounded px-2 py-2 text-white text-xs placeholder-gray-600"
                  placeholder="promoter@venue.com"
                />
              </div>

              {editing.offer_details && (
                <div className="bg-black border-2 border-cyan-500/20 rounded-lg p-3">
                  <label className="text-gray-500 text-[9px] font-mono uppercase block mb-1">DETAILS</label>
                  <div className="bg-cyan-900/10 p-2 rounded text-white text-[11px] max-h-20 overflow-y-auto border border-cyan-500/20">
                    {editing.offer_details}
                  </div>
                </div>
              )}
            </div>

            {saveError && (
              <div className="bg-red-900/30 border border-red-500/40 rounded-lg p-2 text-red-300 text-xs">
                {saveError}
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setExtracted(null);
                  setEditing(null);
                  setFile(null);
                  setSaveError(null);
                }}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded text-xs transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 rounded text-xs transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-3 h-3" />
                {saveMutation.isPending ? 'SAVING...' : 'SAVE GIG'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}