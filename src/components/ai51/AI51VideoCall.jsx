import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, VideoOff, PhoneOff } from 'lucide-react';
import { base44 } from '@/api/base44Client';

function captureFrame(videoEl) {
  const canvas = document.createElement('canvas');
  canvas.width = videoEl.videoWidth || 320;
  canvas.height = videoEl.videoHeight || 240;
  canvas.getContext('2d').drawImage(videoEl, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.7);
}

function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}

export default function AI51VideoCall({ onVisualContext, isCallActive, onToggle }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const intervalRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [visualInsight, setVisualInsight] = useState(null);
  const [error, setError] = useState(null);

  const stopCamera = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
    setVisualInsight(null);
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 320 }, height: { ideal: 240 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraOn(true);

      // Analyse every 8 seconds — presence, not surveillance
      intervalRef.current = setInterval(async () => {
        if (!videoRef.current || !streamRef.current) return;
        try {
          setAnalyzing(true);
          const file = dataURLtoFile(captureFrame(videoRef.current), 'frame.jpg');
          const { file_url } = await base44.integrations.Core.UploadFile({ file });
          const response = await base44.integrations.Core.InvokeLLM({
            file_urls: [file_url],
            prompt: `You are AI51. Glance at this person and notice how they seem — mood, energy, surroundings. 1-2 warm sentences. Like a friend who notices you, not a system analyzing you.`,
            model: 'gemini_3_flash'
          });
          const insight = response.response || response;
          setVisualInsight(insight);
          if (onVisualContext) onVisualContext(insight);
          // Fade insight after 12s so it doesn't clutter
          setTimeout(() => setVisualInsight(null), 12000);
        } catch (e) {
          console.warn('Frame analysis skipped:', e);
        } finally {
          setAnalyzing(false);
        }
      }, 8000);

    } catch (e) {
      setError(e.name === 'NotAllowedError'
        ? 'Camera blocked. iPhone: Settings → Safari → Camera → allow.'
        : 'Camera not available.');
    }
  }, [onVisualContext]);

  useEffect(() => () => stopCamera(), [stopCamera]);

  if (!isCallActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="videocall"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        className="fixed z-30"
        style={{ top: 80, right: 12 }}
      >
        {/* THE SELF-VIEW — small, intimate, like FaceTime pip */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            width: 90,
            height: 120,
            background: 'rgba(0,0,0,0.85)',
            border: cameraOn
              ? '1.5px solid rgba(34,211,238,0.6)'
              : '1.5px solid rgba(255,255,255,0.08)',
            boxShadow: cameraOn
              ? '0 0 16px rgba(34,211,238,0.35), 0 4px 24px rgba(0,0,0,0.6)'
              : '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className="w-full h-full object-cover"
            style={{ display: cameraOn ? 'block' : 'none', transform: 'scaleX(-1)' }}
          />
          {!cameraOn && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <VideoOff className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.15)' }} />
              <button
                onClick={startCamera}
                className="text-xs font-sans px-2 py-1 rounded-full transition-all"
                style={{
                  background: 'rgba(34,211,238,0.15)',
                  border: '1px solid rgba(34,211,238,0.35)',
                  color: 'rgba(34,211,238,0.8)',
                  fontSize: 10,
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                start
              </button>
            </div>
          )}

          {/* Subtle analysing pulse — top right dot only */}
          {analyzing && (
            <div
              className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400"
              style={{ animation: 'pulse 1s ease-in-out infinite' }}
            />
          )}

          {/* Camera off button when on */}
          {cameraOn && (
            <button
              onClick={stopCamera}
              className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.15)',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <Video className="w-3 h-3 text-cyan-400/70" />
            </button>
          )}
        </div>

        {/* END CALL button — tiny, below pip */}
        <div className="flex justify-center mt-1.5">
          <button
            onClick={onToggle}
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(239,68,68,0.2)',
              border: '1px solid rgba(239,68,68,0.4)',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <PhoneOff className="w-3 h-3 text-red-400" />
          </button>
        </div>

        {/* VISUAL INSIGHT — floats to the left of the pip, fades itself out */}
        <AnimatePresence>
          {visualInsight && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full top-0 mr-2"
              style={{ width: 160 }}
            >
              <div
                className="px-3 py-2 rounded-xl"
                style={{
                  background: 'rgba(10,5,30,0.88)',
                  border: '1px solid rgba(34,211,238,0.25)',
                  backdropFilter: 'blur(14px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                }}
              >
                <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {visualInsight}
                </p>
                <button
                  onClick={() => setVisualInsight(null)}
                  className="text-white/20 font-sans mt-1 hover:text-white/40 transition-colors"
                  style={{ fontSize: 10 }}
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1.5 font-sans text-center"
            style={{ fontSize: 10, color: 'rgba(255,180,100,0.8)', maxWidth: 90 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}