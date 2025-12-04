import React, { useEffect, useRef } from 'react';

export default function QuantumWave({ analyserRef, isPlaying }) {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!analyserRef || !isPlaying) {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const analyser = analyserRef;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const draw = () => {
            analyser.getByteFrequencyData(dataArray);
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 9TH DIMENSION GRAPHIC EQUALIZER
            const barCount = 16;
            const barWidth = canvas.width / barCount;
            const step = Math.floor(dataArray.length / barCount);
            
            for (let i = 0; i < barCount; i++) {
                const barHeight = (dataArray[i * step] / 255) * canvas.height;
                
                // Create gradient for each bar
                const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
                gradient.addColorStop(0, '#f59e0b'); // amber top
                gradient.addColorStop(0.5, '#ec4899'); // pink middle
                gradient.addColorStop(1, '#8b5cf6'); // purple bottom
                
                ctx.fillStyle = gradient;
                ctx.fillRect(
                    i * barWidth + 1,
                    canvas.height - barHeight,
                    barWidth - 2,
                    barHeight
                );
                
                // Add glow effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#f59e0b';
            }
            
            ctx.shadowBlur = 0;
            
            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [analyserRef, isPlaying]);

    if (!isPlaying) {
        return (
            <div className="w-20 h-10 md:w-32 md:h-12 flex items-center justify-center">
                <div className="flex gap-1 items-end">
                    {[...Array(8)].map((_, i) => (
                        <div 
                            key={i} 
                            className="w-1 md:w-1.5 bg-gray-700 rounded-t"
                            style={{ height: `${20 + (i % 3) * 10}%` }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <canvas 
            ref={canvasRef} 
            width={128}
            height={48}
            className="w-20 h-10 md:w-32 md:h-12"
        />
    );
}