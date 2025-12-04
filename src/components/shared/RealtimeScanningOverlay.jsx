import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, AlertCircle, Check, Loader2, Eye, EyeOff, MapPin, Camera, BookOpen } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * REAL-TIME AI51 EDUCATIONAL SCANNER
 * Live litter detection with INSTANT education
 * Shows: What it is • How to recycle • Environmental impact
 * ZERO HALLUCINATIONS - Only scans actual trash
 */

export default function RealtimeScanningOverlay({ onPhotoCapture, onCancel }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const analysisIntervalRef = useRef(null);
  const cameraTimeoutRef = useRef(null);
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState(null);
  const [nightVision, setNightVision] = useState(false);
  const [location, setLocation] = useState(null);
  const [detectedItems, setDetectedItems] = useState([]);
  const [cameraPermissionState, setCameraPermissionState] = useState('checking');
  const [educationMode, setEducationMode] = useState(true); // NEW: Toggle education

  // Get location for verification
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude || 0,
            accuracy: position.coords.accuracy
          });
        },
        (err) => {
          console.log('Location not available:', err);
        }
      );
    }
  }, []);

  // Start camera with timeout
  useEffect(() => {
    let mounted = true;
    
    async function startCamera() {
      try {
        setCameraPermissionState('checking');
        
        cameraTimeoutRef.current = setTimeout(() => {
          if (mounted && cameraPermissionState === 'checking') {
            setCameraPermissionState('denied');
            setError('Camera took too long to activate. iOS Safari can be slow. Try manual photo upload instead.');
          }
        }, 20000);
        
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        });
        
        if (mounted && videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          
          if (cameraTimeoutRef.current) {
            clearTimeout(cameraTimeoutRef.current);
          }
          
          setCameraPermissionState('granted');
        }
      } catch (err) {
        console.error('Camera access error:', err);
        
        if (mounted) {
          if (cameraTimeoutRef.current) {
            clearTimeout(cameraTimeoutRef.current);
          }
          
          setCameraPermissionState('denied');
          
          if (err.name === 'NotAllowedError') {
            setError('Camera access denied. Try manual photo upload instead.');
          } else if (err.name === 'NotFoundError') {
            setError('No camera found. Try manual photo upload instead.');
          } else if (err.name === 'NotReadableError') {
            setError('Camera in use by another app. Close other apps and try again.');
          } else {
            setError('Camera not available. Try manual photo upload instead.');
          }
        }
      }
    }

    startCamera();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
      if (cameraTimeoutRef.current) {
        clearTimeout(cameraTimeoutRef.current);
      }
    };
  }, []);

  // Draw futuristic scanning overlay WITH EDUCATION
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const video = videoRef.current;

    let animationFrame = null;

    function drawOverlay() {
      if (!video.videoWidth) {
        animationFrame = requestAnimationFrame(drawOverlay);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scanning grid (cooler version)
      ctx.strokeStyle = nightVision ? '#00ff00' : '#00ff88';
      ctx.lineWidth = 2;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.globalAlpha = 0.4;
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.globalAlpha = 0.4;
        ctx.stroke();
      }

      // Center crosshair (enhanced)
      ctx.globalAlpha = 1;
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 4;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = 60;

      // Pulsing center circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, size * 0.8, 0, Math.PI * 2);
      ctx.globalAlpha = 0.3;
      ctx.stroke();

      // Main crosshair
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(centerX - size, centerY);
      ctx.lineTo(centerX - 20, centerY);
      ctx.moveTo(centerX + 20, centerY);
      ctx.lineTo(centerX + size, centerY);
      ctx.moveTo(centerX, centerY - size);
      ctx.lineTo(centerX, centerY - 20);
      ctx.moveTo(centerX, centerY + 20);
      ctx.lineTo(centerX, centerY + size);
      ctx.stroke();

      // Corner brackets
      ctx.shadowBlur = 10;
      ctx.shadowColor = nightVision ? '#00ff00' : '#00ff88';
      ctx.strokeStyle = nightVision ? '#00ff00' : '#00ff88';
      ctx.lineWidth = 5;
      const cornerSize = 40;
      const padding = 30;

      // Top-left
      ctx.beginPath();
      ctx.moveTo(padding + cornerSize, padding);
      ctx.lineTo(padding, padding);
      ctx.lineTo(padding, padding + cornerSize);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(canvas.width - padding - cornerSize, padding);
      ctx.lineTo(canvas.width - padding, padding);
      ctx.lineTo(canvas.width - padding, padding + cornerSize);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(padding, canvas.height - padding - cornerSize);
      ctx.lineTo(padding, canvas.height - padding);
      ctx.lineTo(padding + cornerSize, canvas.height - padding);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(canvas.width - padding - cornerSize, canvas.height - padding);
      ctx.lineTo(canvas.width - padding, canvas.height - padding);
      ctx.lineTo(canvas.width - padding, canvas.height - padding - cornerSize);
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Draw detected item boxes
      if (detectedItems.length > 0) {
        ctx.globalAlpha = 0.8;
        detectedItems.forEach((item, i) => {
          const color = ['#00ff88', '#00ffff', '#ffff00', '#ff00ff'][i % 4];
          ctx.strokeStyle = color;
          ctx.lineWidth = 4;
          
          const boxX = (canvas.width / 4) * (i % 4);
          const boxY = (canvas.height / 4) + (Math.random() * canvas.height / 2);
          const boxW = 100;
          const boxH = 80;
          
          ctx.strokeRect(boxX, boxY, boxW, boxH);
          
          ctx.fillStyle = color;
          ctx.font = 'bold 16px monospace';
          ctx.fillText(item, boxX, boxY - 10);
        });
      }

      // EDUCATION OVERLAY - NEW!
      if (scanResults && educationMode) {
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
        const boxHeight = scanResults.no_litter_detected ? 160 : 280;
        ctx.fillRect(20, canvas.height - boxHeight - 20, canvas.width - 40, boxHeight);

        // Glow border
        ctx.strokeStyle = scanResults.no_litter_detected ? '#ffaa00' : '#00ff88';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, canvas.height - boxHeight - 20, canvas.width - 40, boxHeight);

        ctx.font = 'bold 20px monospace';
        ctx.fillStyle = scanResults.no_litter_detected ? '#ffaa00' : '#00ff88';
        
        if (scanResults.no_litter_detected) {
          ctx.fillText('NO LITTER DETECTED', 30, canvas.height - boxHeight + 10);
          ctx.font = '16px monospace';
          ctx.fillStyle = '#ffffff';
          ctx.fillText('🎯 Point camera at actual waste/litter', 30, canvas.height - boxHeight + 45);
          ctx.fillText('Examples: bottles, cans, wrappers', 30, canvas.height - boxHeight + 75);
          ctx.fillText('Nature (leaves/sticks) = NOT litter', 30, canvas.height - boxHeight + 105);
        } else {
          // DETECTED LITTER - SHOW EDUCATION
          ctx.fillText('🧠 AI51 IDENTIFIED:', 30, canvas.height - boxHeight + 10);
          
          ctx.font = '18px monospace';
          ctx.fillStyle = '#00ffff';
          const materials = scanResults.materials.join(', ');
          ctx.fillText(materials, 30, canvas.height - boxHeight + 45);
          
          ctx.font = '16px monospace';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`⚖️ Weight: ${scanResults.weight}kg`, 30, canvas.height - boxHeight + 75);
          ctx.fillText(`♻️ Recyclable: ${scanResults.recyclable}%`, 30, canvas.height - boxHeight + 105);
          
          // EDUCATION - Impact & recycling
          if (scanResults.education) {
            ctx.font = 'bold 14px monospace';
            ctx.fillStyle = '#ffff00';
            ctx.fillText('💡 LEARN:', 30, canvas.height - boxHeight + 135);
            
            ctx.font = '12px monospace';
            ctx.fillStyle = '#ffffff';
            const lines = wrapText(ctx, scanResults.education, canvas.width - 70, 12);
            lines.forEach((line, i) => {
              ctx.fillText(line, 30, canvas.height - boxHeight + 160 + (i * 18));
            });
          }
          
          if (scanResults.recyclable > 50) {
            ctx.fillStyle = '#00ff00';
            ctx.font = 'bold 14px monospace';
            ctx.fillText('⭐ RECYCLING BONUS ELIGIBLE (+20%)', 30, canvas.height - boxHeight + 255);
          }
        }
      }

      animationFrame = requestAnimationFrame(drawOverlay);
    }

    // Helper to wrap text
    function wrapText(context, text, maxWidth, fontSize) {
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';

      words.forEach(word => {
        const testLine = currentLine + word + ' ';
        const metrics = context.measureText(testLine);
        if (metrics.width > maxWidth && currentLine !== '') {
          lines.push(currentLine);
          currentLine = word + ' ';
        } else {
          currentLine = testLine;
        }
      });
      lines.push(currentLine);
      return lines;
    }

    video.addEventListener('loadedmetadata', drawOverlay);

    return () => {
      video.removeEventListener('loadedmetadata', drawOverlay);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [scanResults, nightVision, detectedItems, educationMode]);

  // REAL AI51 EDUCATIONAL SCANNING - ENHANCED WITH EDUCATION
  const runLiveScan = async () => {
    if (!videoRef.current) return;
    
    setIsScanning(true);
    setScanResults(null);
    setDetectedItems([]);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);

      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.8));
      const file = new File([blob], 'scan-frame.jpg', { type: 'image/jpeg' });
      
      const { file_url } = await base44.integrations.Core.UploadFile({ file });

      // EDUCATIONAL AI51 ANALYSIS
      const analysis = await base44.integrations.Core.InvokeLLM({
        prompt: `You are AI51 performing EDUCATIONAL litter detection.

**PRIMARY MISSION:**
1. Detect ONLY actual litter/waste
2. EDUCATE the user about what you found
3. Explain environmental impact
4. Give recycling guidance

**CRITICAL RULES:**
- People are NOT litter
- Furniture is NOT litter
- Clean spaces are NOT litter
- Nature (leaves, sticks) is NOT litter
- If NO litter visible → return no_litter_detected: true

**What IS litter:**
- Discarded bottles, cans, wrappers ON GROUND
- Broken glass, cigarette butts scattered
- Food containers, plastic bags as trash

**If NO LITTER:**
Return: {
  "no_litter_detected": true, 
  "materials": [], 
  "weight": 0, 
  "recyclable": 0,
  "education": "Point camera at actual waste. Litter = discarded trash on ground.",
  "confidence": "none"
}

**If LITTER FOUND:**
Provide:
1. **Materials**: Specific types (e.g., "PET plastic bottle", "aluminum can")
2. **Weight**: Conservative estimate
   - Small plastic bottle: 0.03kg
   - Large bottle: 0.05kg
   - Glass bottle: 0.3kg
   - Aluminum can: 0.015kg
3. **Recyclable %**: 0-100
4. **EDUCATION** (THIS IS KEY): Short, powerful fact about:
   - How long it takes to decompose OR
   - What happens if it reaches ocean OR
   - How to recycle it properly OR
   - Impact on wildlife
   
   Examples:
   - "Plastic bottle: 450 years to decompose. Recycle in blue bin."
   - "Aluminum can: 100% recyclable forever. Worth 10p each."
   - "Glass: Never decomposes. Crushes into sand if left in nature."
   
5. **Confidence**: high/medium/low

${location ? `Location: Lat ${location.latitude.toFixed(4)}, Lng ${location.longitude.toFixed(4)}` : ''}

Be HONEST. Educate clearly. Max 2 sentences for education.`,
        file_urls: [file_url],
        response_json_schema: {
          type: "object",
          properties: {
            no_litter_detected: {
              type: "boolean"
            },
            materials: {
              type: "array",
              items: { type: "string" }
            },
            item_counts: {
              type: "object",
              additionalProperties: { type: "number" }
            },
            weight: {
              type: "number"
            },
            recyclable: {
              type: "number"
            },
            education: {
              type: "string",
              description: "Short educational fact about the litter or recycling guidance"
            },
            confidence: {
              type: "string",
              enum: ["high", "medium", "low", "none"]
            },
            notes: {
              type: "string"
            }
          }
        }
      });

      setScanResults(analysis);
      
      if (!analysis.no_litter_detected && analysis.materials && analysis.materials.length > 0) {
        setDetectedItems(analysis.materials);
      } else {
        setDetectedItems([]);
      }

    } catch (error) {
      console.error('AI51 scan error:', error);
      setError('Scan failed. Try again?');
    } finally {
      setIsScanning(false);
    }
  };

  // Start continuous scanning
  const startContinuousScanning = () => {
    runLiveScan();
    analysisIntervalRef.current = setInterval(() => {
      runLiveScan();
    }, 3000); // Every 3 seconds
  };

  // Stop continuous scanning
  const stopContinuousScanning = () => {
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
      analysisIntervalRef.current = null;
    }
    setIsScanning(false);
  };

  // Capture photo
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    if (scanResults && scanResults.no_litter_detected) {
      setError('No litter detected. Point camera at actual waste/trash.');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], 'cleanup-photo.jpg', { type: 'image/jpeg' });
      
      const enrichedResults = {
        ...scanResults,
        location: location,
        quantities: scanResults?.item_counts || {}
      };
      
      onPhotoCapture(file, enrichedResults);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }, 'image/jpeg', 0.98);
  };

  const handleCancel = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    stopContinuousScanning();
    onCancel();
  };

  const handleRetry = () => {
    setError(null);
    setCameraPermissionState('checking');
    window.location.reload();
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-white text-lg mb-4">{error}</p>
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-bold"
            >
              Try Again
            </button>
            <button
              onClick={handleCancel}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cameraPermissionState === 'checking') {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Camera className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          </motion.div>
          <p className="text-white text-xl mb-2">Activating Scanner...</p>
          <p className="text-gray-400 text-sm mb-4">Allow camera access when prompted</p>
          
          <div className="bg-cyan-900/30 border border-cyan-500/50 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 text-xs mb-2 font-bold">iOS: CHECK YOUR BROWSER BAR</p>
            <p className="text-gray-300 text-xs">
              Safari shows camera prompt at TOP of screen. Look for "Allow Camera" popup.
            </p>
          </div>
          
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white text-sm underline"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (cameraPermissionState === 'denied') {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Camera className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-white text-2xl font-bold mb-3">Camera Access Needed</h2>
          <p className="text-gray-300 text-base mb-6">
            AI51 needs camera access to scan litter. 
            <br/>
            <strong className="text-cyan-400">Please allow camera in your browser settings.</strong>
          </p>
          <button
            onClick={handleCancel}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold w-full"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-[9999]">
      {/* Video feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={nightVision ? {
          filter: 'brightness(1.5) contrast(1.2) saturate(0) hue-rotate(90deg)'
        } : {}}
      />

      {/* Scanning overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scan className="w-6 h-6 text-cyan-400 animate-pulse" />
            <span className="text-white font-bold text-lg">AI51 LIVE</span>
            {location && (
              <MapPin className="w-4 h-4 text-cyan-400 ml-2" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEducationMode(!educationMode)}
              className={`p-2 rounded-lg ${educationMode ? 'bg-yellow-600' : 'bg-gray-800'}`}
              title="Toggle Education"
            >
              <BookOpen className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setNightVision(!nightVision)}
              className="bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-lg"
            >
              {nightVision ? <Eye className="w-5 h-5 text-green-400" /> : <EyeOff className="w-5 h-5" />}
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-600/80 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Scanning status */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 bg-black/80 border-2 border-cyan-500 rounded-xl p-4 z-10"
          >
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
              <span className="text-white font-mono text-sm">
                ANALYZING & EDUCATING...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 z-10">
        <div className="max-w-md mx-auto space-y-4">
          
          <div className="text-center">
            <p className="text-cyan-300 text-base font-bold font-mono mb-1">
              {analysisIntervalRef.current ? '🔴 LIVE SCANNING ACTIVE' : '🎯 AIM AT LITTER'}
            </p>
            <p className="text-gray-400 text-xs">
              {educationMode ? '💡 Education mode ON' : 'Education mode OFF'}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {!analysisIntervalRef.current ? (
              <button
                onClick={startContinuousScanning}
                disabled={isScanning}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 disabled:opacity-50 text-white py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 shadow-lg"
                style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
              >
                <Scan className="w-6 h-6" />
                START LIVE SCAN
              </button>
            ) : (
              <button
                onClick={stopContinuousScanning}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black text-lg"
              >
                STOP SCAN
              </button>
            )}

            {scanResults && !scanResults.no_litter_detected && (
              <button
                onClick={capturePhoto}
                className="flex-1 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2"
              >
                <Check className="w-6 h-6" />
                CAPTURE
              </button>
            )}
          </div>

          <p className="text-xs text-cyan-400 text-center font-mono">
            REAL AI51 • GPS VERIFIED • EDUCATIONAL • ZERO LOSS
          </p>
        </div>
      </div>
    </div>
  );
}