import React, { useEffect, useRef } from 'react';

export default function AudioReactiveField({ color, isPlaying, analyserRef }) {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize particles
        const particleCount = 150;
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            energy: 0
        }));

        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Get frequency data
            let avgFrequency = 0;
            let bassEnergy = 0;
            let midEnergy = 0;
            let highEnergy = 0;

            if (isPlaying && analyserRef?.current) {
                const analyser = analyserRef.current;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                analyser.getByteFrequencyData(dataArray);

                // Calculate energy in different frequency bands
                const bassEnd = Math.floor(bufferLength * 0.1);
                const midEnd = Math.floor(bufferLength * 0.5);

                for (let i = 0; i < bassEnd; i++) {
                    bassEnergy += dataArray[i];
                }
                bassEnergy /= bassEnd;

                for (let i = bassEnd; i < midEnd; i++) {
                    midEnergy += dataArray[i];
                }
                midEnergy /= (midEnd - bassEnd);

                for (let i = midEnd; i < bufferLength; i++) {
                    highEnergy += dataArray[i];
                }
                highEnergy /= (bufferLength - midEnd);

                avgFrequency = (bassEnergy + midEnergy + highEnergy) / 3;
            }

            // Normalize energy values
            bassEnergy = bassEnergy / 255;
            midEnergy = midEnergy / 255;
            highEnergy = highEnergy / 255;
            avgFrequency = avgFrequency / 255;

            // Update and draw particles
            particlesRef.current.forEach((particle, i) => {
                // Apply frequency-based energy
                particle.energy = avgFrequency;

                // Move particles
                particle.x += particle.vx * (1 + particle.energy * 2);
                particle.y += particle.vy * (1 + particle.energy * 2);

                // Wrap around screen
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                const opacity = 0.3 + particle.energy * 0.7;
                ctx.fillStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius * (1 + particle.energy), 0, Math.PI * 2);
                ctx.fill();

                // Draw connections to nearby particles (Starlink-style)
                particlesRef.current.slice(i + 1).forEach(other => {
                    const dx = other.x - particle.x;
                    const dy = other.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const maxDistance = 150 * (1 + avgFrequency);
                    if (distance < maxDistance) {
                        const lineOpacity = (1 - distance / maxDistance) * 0.3 * (1 + avgFrequency);
                        ctx.strokeStyle = `${color}${Math.floor(lineOpacity * 255).toString(16).padStart(2, '0')}`;
                        ctx.lineWidth = 0.5 + avgFrequency;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                });
            });

            // Draw central geometry that reacts to bass
            if (isPlaying && bassEnergy > 0.1) {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const sides = 6;
                const radius = 100 + bassEnergy * 200;

                ctx.strokeStyle = `${color}${Math.floor((0.3 + bassEnergy * 0.7) * 255).toString(16).padStart(2, '0')}`;
                ctx.lineWidth = 2 + bassEnergy * 3;
                ctx.beginPath();

                for (let i = 0; i <= sides; i++) {
                    const angle = (Math.PI * 2 * i) / sides;
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.closePath();
                ctx.stroke();

                // Inner rotating geometry for mids
                if (midEnergy > 0.1) {
                    const time = Date.now() * 0.001;
                    const innerRadius = 50 + midEnergy * 100;
                    ctx.strokeStyle = `${color}${Math.floor((0.2 + midEnergy * 0.6) * 255).toString(16).padStart(2, '0')}`;
                    ctx.lineWidth = 1.5 + midEnergy * 2;
                    ctx.beginPath();

                    for (let i = 0; i <= sides; i++) {
                        const angle = (Math.PI * 2 * i) / sides + time;
                        const x = centerX + Math.cos(angle) * innerRadius;
                        const y = centerY + Math.sin(angle) * innerRadius;
                        if (i === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    }
                    ctx.closePath();
                    ctx.stroke();
                }
            }

            // Draw frequency bars around edges (like Starlink dashboard)
            if (isPlaying && analyserRef?.current) {
                const analyser = analyserRef.current;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                analyser.getByteFrequencyData(dataArray);

                const barCount = 64;
                const step = Math.floor(bufferLength / barCount);

                for (let i = 0; i < barCount; i++) {
                    const value = dataArray[i * step] / 255;
                    const barHeight = value * 100;
                    const x = (canvas.width / barCount) * i;

                    // Top bars
                    ctx.fillStyle = `${color}${Math.floor(value * 128).toString(16).padStart(2, '0')}`;
                    ctx.fillRect(x, 0, canvas.width / barCount - 2, barHeight);

                    // Bottom bars
                    ctx.fillRect(x, canvas.height - barHeight, canvas.width / barCount - 2, barHeight);
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [color, isPlaying, analyserRef]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: isPlaying ? 1 : 0.3 }}
        />
    );
}