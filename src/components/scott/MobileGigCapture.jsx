import React, { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Mic, Camera, Send, Loader2, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileGigCapture({ artistId, onGigCreated }) {
  const [mode, setMode] = useState(null); // 'voice' | 'photo' | null
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [extracted, setExtracted] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startVoiceCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorder.onstart = () => setRecording(true);
      mediaRecorder.onstop = () => setRecording(false);

      mediaRecorder.start();
    } catch (error) {
      alert('Mic access needed');
    }
  };

  const stopVoiceCapture = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
      await processCapture(audioBlob, 'audio');
    }
  };

  const startPhotoCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      alert('Camera access needed');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      canvasRef.current.toBlob(async (blob) => {
        if (videoRef.current?.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setPreview(canvasRef.current.toDataURL());
        await processCapture(blob, 'photo');
      });
    }
  };

  const processCapture = async (blob, type) => {
    setProcessing(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file: blob });

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: type === 'audio' 
          ? 'Transcribe this audio recording about a music gig offer. Extract: venue, date, fee, promoter name, contact info, any special requirements.'
          : 'Analyze this contract/document photo. Extract: venue, date, fee, duration, technical requirements, payment terms, contact info.',
        file_urls: [file_url],
        response_json_schema: {
          type: 'object',
          properties: {
            venue: { type: 'string' },
            date: { type: 'string' },
            fee: { type: 'number' },
            promoter_name: { type: 'string' },
            promoter_contact: { type: 'string' },
            technical_requirements: { type: 'string' },
            notes: { type: 'string' }
          }
        }
      });

      setExtracted(response);
    } catch (error) {
      alert('AI extraction failed');
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  const saveGigOffer = async () => {
    if (!extracted) return;

    try {
      setProcessing(true);
      await base44.entities.ScottGigOffer.create({
        artist_id: artistId,
        status: 'pending_manager_review',
        venue: extracted.venue,
        date: extracted.date,
        fee: extracted.fee,
        promoter_name: extracted.promoter_name,
        promoter_contact: extracted.promoter_contact,
        technical_requirements: extracted.technical_requirements,
        notes: extracted.notes,
        auto_extracted: true,
        capture_method: mode
      });

      setExtracted(null);
      setPreview(null);
      setMode(null);
      onGigCreated?.();
    } catch (error) {
      alert('Failed to save gig offer');
    } finally {
      setProcessing(false);
    }
  };

  if (!mode) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex gap-3"
      >
        <button
          onClick={() => {
            setMode('voice');
            startVoiceCapture();
          }}
          className="flex-1 bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <Mic className="w-5 h-5" />
          Voice
        </button>
        <button
          onClick={() => {
            setMode('photo');
            startPhotoCapture();
          }}
          className="flex-1 bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          <Camera className="w-5 h-5" />
          Camera
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Video Feed */}
      {mode === 'photo' && (
        <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="hidden"
          />
          <button
            onClick={capturePhoto}
            disabled={processing}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-cyan-500 hover:bg-cyan-600 text-white font-black px-8 py-3 rounded-full transition-all disabled:opacity-50"
          >
            {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Snap'}
          </button>
        </div>
      )}

      {/* Recording Indicator */}
      {mode === 'voice' && recording && (
        <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-4 flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-300 font-bold">Recording...</span>
        </div>
      )}

      {/* Preview / Extraction Results */}
      <AnimatePresence>
        {extracted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black border-2 border-green-500 rounded-xl p-4 space-y-3"
          >
            {preview && (
              <img src={preview} alt="Captured" className="w-full rounded-lg" />
            )}
            
            <div className="space-y-2">
              <p className="text-green-400 font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                AI Extracted Data:
              </p>
              <div className="bg-gray-900 rounded-lg p-3 space-y-2 text-sm text-gray-300">
                <p><strong>Venue:</strong> {extracted.venue || 'N/A'}</p>
                <p><strong>Date:</strong> {extracted.date || 'N/A'}</p>
                <p><strong>Fee:</strong> £{extracted.fee || '0'}</p>
                <p><strong>Promoter:</strong> {extracted.promoter_name || 'N/A'}</p>
                <p><strong>Contact:</strong> {extracted.promoter_contact || 'N/A'}</p>
              </div>
            </div>

            <button
              onClick={saveGigOffer}
              disabled={processing}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {processing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Save Gig Offer
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stop/Cancel */}
      <button
        onClick={() => {
          if (mode === 'voice' && recording) {
            stopVoiceCapture();
          } else if (mode === 'photo' && videoRef.current?.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
          }
          setMode(null);
          setPreview(null);
          setExtracted(null);
        }}
        disabled={processing}
        className="w-full bg-gray-700 hover:bg-gray-600 text-white font-black py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        <X className="w-5 h-5" />
        {recording ? 'Stop & Extract' : 'Cancel'}
      </button>
    </motion.div>
  );
}