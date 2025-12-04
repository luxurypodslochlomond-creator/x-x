
import React, { useEffect, useRef } from 'react';

export default function NeuralVisualizer({ audioRef, isPlaying, onStateChange }) {
    const canvasRef = useRef(null);
    const analyzerRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);
    const waveDataRef = useRef(new Uint8Array(128)); // Initial size, will be updated by analyzer.frequencyBinCount

    useEffect(() => {
        if (!audioRef?.current || analyzerRef.current) return;

        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyzer = audioContext.createAnalyser();
            analyzer.fftSize = 256; // Common fftSize for a balance of detail and performance

            const source = audioContext.createMediaElementSource(audioRef.current);
            source.connect(analyzer);
            analyzer.connect(audioContext.destination); // Connect to output

            analyzerRef.current = analyzer;
            waveDataRef.current = new Uint8Array(analyzer.frequencyBinCount); // Update waveDataRef size

            // Initialize particles. Using fixed 800x600 as per canvas element dimensions.
            particlesRef.current = Array.from({ length: 100 }, () => ({
                x: Math.random() * 800,
                y: Math.random() * 600,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 3 + 1,
                hue: Math.random() * 360
            }));
        } catch (err) {
            console.error('Audio context setup failed:', err);
        }
    }, [audioRef]); // Re-run if audioRef changes

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        // Define canvas dimensions for use in draw function, matching JSX props
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const draw = () => {
            if (!analyzerRef.current) return;

            analyzerRef.current.getByteFrequencyData(waveDataRef.current);

            // Clear with fade effect, creating trails
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            const avgFreq = waveDataRef.current.reduce((a, b) => a + b, 0) / waveDataRef.current.length;

            // Update and draw particles (quantum subatomic nodes)
            particlesRef.current.forEach((particle, i) => {
                particle.x += particle.vx * (1 + avgFreq / 500);
                particle.y += particle.vy * (1 + avgFreq / 500);

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvasWidth) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvasHeight) particle.vy *= -1;

                // Draw particle
                const intensity = waveDataRef.current[i % waveDataRef.current.length] / 255;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius * (1 + intensity), 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${particle.hue + avgFreq}, 80%, 60%, ${intensity})`;
                ctx.fill();

                // Connect nearby particles (neural pathways)
                particlesRef.current.forEach((other, j) => {
                    if (j <= i) return; // Avoid duplicate connections and connecting to self
                    const dx = other.x - particle.x;
                    const dy = other.y - particle.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) { // Connect particles within a certain distance
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        // Connection color and opacity based on distance and audio intensity
                        ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - dist / 100) * intensity * 0.5})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            // Frequency wave visualization
            ctx.beginPath();
            ctx.lineWidth = 2;
            const barWidth = canvasWidth / waveDataRef.current.length;

            waveDataRef.current.forEach((value, i) => {
                const barHeight = (value / 255) * canvasHeight * 0.6; // Scale height
                const x = i * barWidth;
                const y = canvasHeight - barHeight; // Draw from bottom up

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });

            ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)'; // Purple wave color
            ctx.stroke();

            // Send state update to parent if onStateChange prop is provided
            if (onStateChange && typeof onStateChange === 'function') {
                onStateChange({
                    particles: particlesRef.current.length,
                    avgFrequency: avgFreq,
                    waveform: Array.from(waveDataRef.current),
                    timestamp: Date.now()
                });
            }
        };

        const animate = () => {
            if (isPlaying) {
                draw(); // Only draw if audio is playing
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animate(); // Start the animation loop

        // Cleanup function for the effect
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isPlaying, onStateChange]); // Dependencies: re-run if playing state or callback changes

    return (
        <div className="relative w-full h-full bg-black overflow-hidden">
            <canvas
                ref={canvasRef}
                width={800} // Fixed canvas width
                height={600} // Fixed canvas height
                className="absolute inset-0 w-full h-full" // CSS to make it fill its parent, then scale
                style={{
                    imageRendering: 'crisp-edges', // For potentially sharper pixel rendering if scaled
                }}
            />
            
            {/* Overlay info */}
            <div className="absolute bottom-4 left-4 z-10">
                <div className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/30">
                    <p className="text-xs text-cyan-400 font-mono">
                        Neural Pathways Active • Quantum Visualization
                    </p>
                </div>
            </div>
        </div>
    );
}
