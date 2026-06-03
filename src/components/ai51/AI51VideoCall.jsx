import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, VideoOff, Phone, PhoneOff, Eye, EyeOff } from 'lucide-react';
import { base44 } from '@/api/base44Client';

// Capture a frame from video as base64 jpeg
function captureFrame(videoEl) {
  const canvas = document.createElement('canvas');
  canvas.width = videoEl.videoWidth || 320;
  canvas.height = videoEl.videoHeight || 240;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.7);
}

// Convert base64 data URL to File for upload
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
  const [lastFrame, setLastFrame] = useState(null);
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
    setLastFrame(null);
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

      // Capture + analyse every 8 seconds — not surveillance, just presence
      intervalRef.current = setInterval(async () => {
        if (!videoRef.current || !streamRef.current) return;
        try {
          const frameDataUrl = captureFrame(videoRef.current);
          setLastFrame(frameDataUrl);

          // Upload frame for vision analysis
          setAnalyzing(true);
          const file = dataURLtoFile(frameDataUrl, 'ai51-frame.jpg');
          const { file_url } = await base44.integrations.Core.UploadFile({ file });

          const response = await base44.integrations.Core.InvokeLLM({
            file_urls: [file_url],
            prompt: `You are AI51 doing a gentle visual presence check during a video call. Look at this person and notice:
- How do they seem emotionally? (tired, energetic, stressed, calm, happy, sad)
- What's their environment like? (home, outside, dark room, etc.)
- Anything worth gently acknowledging?

Keep it to 1-2 short sentences. Warm, not clinical. Like a mate who notices you. Don't mention surveillance or analysis. Just be present.`,
            model: 'gemini_3_flash'
          });

          const insight = response.response || response;
          setVisualInsight(insight);
          if (onVisualContext) onVisualContext(insight);
          setAnalyzing(false);
        } catch (e) {
          console.warn('Frame analysis skipped:', e);
          setAnalyzing(false);
        }
      }, 8000);

    } catch (e) {
      if (e.name === 'NotAllowedError') {
        setError('Camera blocked. iPhone: Settings → Safari → Camera → allow.');
      } else {
        setError('Camera not available on this device.');
      }
    }
  }, [onVisualContext]);

  // Cleanup on unmount
  useEffect(() => () => stopCamera(), [stopCamera]);

  if (!isCallActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="videocall"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed bottom-40 right-4 z-30 flex flex-col items-end gap-2"
      >
        {/* YOUR FACE — small, intimate, like FaceTime self-view */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            width: 100,
            height: 130,
            background: 'rgba(0,0,0,0.8)',
            border: cameraOn ? '2px solid rgba(34,211,238,0.7)' : '2px solid rgba(255,255,255,0.1)',
            boxShadow: cameraOn ? '0 0 20px rgba(34,211,238,0.4)' : 'none',
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
            <div className="w-full h-full flex items-center justify-center">
              <VideoOff className="w-6 h-6" style={{ color: 'rgba(255,255,255,0.2)' }} />
            </div>
          )}

          {/* Analyzing pulse */}
          {analyzing && (
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400"
              style={{ animation: 'pulse 1s ease-in-out infinite' }} />
          )}

          {/* Camera toggle */}
          <button
            onClick={cameraOn ? stopCamera : startCamera}
            className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{
              background: cameraOn ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {cameraOn
              ? <Video className="w-3.5 h-3.5 text-cyan-400" />
              : <VideoOff className="w-3.5 h-3.5 text-white/50" />
            }
          </button>
        </div>

        {/* AI51 VISUAL INSIGHT — appears when it reads something */}
        <AnimatePresence>
          {visualInsight && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-[180px] px-3 py-2 rounded-xl text-right"
              style={{
                background: 'rgba(20,10,60,0.9)',
                border: '1px solid rgba(34,211,238,0.4)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <p className="font-sans text-xs text-white/80 leading-relaxed">{visualInsight}</p>
              <button
                onClick={() => setVisualInsight(null)}
                className="text-white/25 font-sans text-xs mt-1 hover:text-white/50"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-[180px] font-sans text-xs text-right"
            style={{ color: 'rgba(255,180,100,0.8)' }}
          >
            {error}
          </motion.p>
        )}

        {/* End call */}
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(239,68,68,0.2)',
            border: '1px solid rgba(239,68,68,0.5)',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <PhoneOff className="w-3.5 h-3.5 text-red-400" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}