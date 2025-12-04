import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const QuantumVisualizer = ({ audioRef, isPlaying }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    const cleanup = () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };

    if (!audioRef.current || !isPlaying) {
      cleanup();
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!audioContextRef.current) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        // Important: set crossOrigin on the audio element BEFORE connecting it
        audioRef.current.crossOrigin = "anonymous";
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
        
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        
        analyserRef.current.fftSize = 512;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
      } catch (e) {
        console.error("Quantum Visualizer Error: Web Audio API may not be supported or there was a context issue.", e);
        // Hide canvas if it fails
        if(canvas) canvas.style.display = 'none';
        return;
      }
    }

    const draw = () => {
      animationFrameIdRef.current = requestAnimationFrame(draw);
      
      if (!analyserRef.current || !dataArrayRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      
      const WIDTH = canvas.width = canvas.offsetWidth;
      const HEIGHT = canvas.height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      const barWidth = 4;
      let x = 0;

      for(let i = 0; i < bufferLength; i++) {
        const barHeight = dataArrayRef.current[i] * 1.5;
        
        const hue = 200 + (i / bufferLength) * 160;
        
        if (barHeight > 0) {
            // Create a gradient for each bar
            const gradient = ctx.createLinearGradient(x, HEIGHT, x, HEIGHT - barHeight);
            gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.1)`);
            gradient.addColorStop(0.5, `hsla(${hue}, 100%, 50%, 0.7)`);
            gradient.addColorStop(1, `hsla(${hue + 20}, 100%, 70%, 1)`);
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
            
            // Add a sparkle on top of high peaks
            if (barHeight > 200) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(x, HEIGHT - barHeight - 2, 2, 2);
            }
        }
        
        x += barWidth + 2;
      }
    };

    draw();

    return cleanup;
  }, [isPlaying, audioRef]);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <motion.canvas 
            ref={canvasRef} 
            className="absolute bottom-0 left-0 w-full h-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isPlaying ? 0.6 : 0 }}
            transition={{ duration: 1.5 }}
        />
    </div>
  );
};

export default QuantumVisualizer;