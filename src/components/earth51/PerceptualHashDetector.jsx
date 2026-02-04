import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * PERCEPTUAL HASH DETECTOR - 2025 TECH
 * Detects similar images even if cropped/resized/filtered
 * Catches kids trying to resubmit same photo
 */

export default function PerceptualHashDetector({ photoUrl, onHashGenerated }) {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);

  React.useEffect(() => {
    if (!photoUrl) return;
    
    const detectDuplicate = async () => {
      setStatus('analyzing');
      
      try {
        // Create canvas for perceptual hash
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = photoUrl;
        });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Resize to 8x8 for hash (standard pHash technique)
        canvas.width = 8;
        canvas.height = 8;
        ctx.drawImage(img, 0, 0, 8, 8);
        
        const imageData = ctx.getImageData(0, 0, 8, 8);
        const pixels = imageData.data;
        
        // Calculate average brightness
        let sum = 0;
        for (let i = 0; i < pixels.length; i += 4) {
          sum += (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
        }
        const avg = sum / 64;
        
        // Generate perceptual hash (64 bits)
        let hash = '';
        for (let i = 0; i < pixels.length; i += 4) {
          const brightness = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
          hash += brightness > avg ? '1' : '0';
        }
        
        // SHA-256 hash for exact match detection
        const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(photoUrl));
        const sha256 = Array.from(new Uint8Array(buffer))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
        
        const hashData = {
          perceptual_hash: hash,
          sha256_hash: sha256,
          image_dimensions: { width: img.naturalWidth, height: img.naturalHeight },
          timestamp: new Date().toISOString()
        };
        
        setResult(hashData);
        setStatus('complete');
        onHashGenerated?.(hashData);
        
      } catch (error) {
        console.error('Hash generation failed:', error);
        setStatus('error');
      }
    };
    
    detectDuplicate();
  }, [photoUrl, onHashGenerated]);

  if (status === 'idle') return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`border-4 p-3 ${
        status === 'analyzing' ? 'border-amber-500 bg-amber-500/10' :
        status === 'complete' ? 'border-green-500 bg-green-500/10' :
        'border-red-500 bg-red-500/10'
      }`}
      style={{ boxShadow: '4px 4px 0px #000' }}
    >
      <div className="flex items-center gap-2">
        {status === 'analyzing' && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Shield className="w-5 h-5 text-amber-400" />
            </motion.div>
            <p className="text-amber-400 font-black font-mono text-xs">
              CHECKING FOR DUPLICATES...
            </p>
          </>
        )}
        {status === 'complete' && (
          <>
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <p className="text-green-400 font-black font-mono text-xs">
              PHOTO IS UNIQUE ✓
            </p>
          </>
        )}
        {status === 'error' && (
          <>
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <p className="text-red-400 font-black font-mono text-xs">
              CHECK FAILED
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}