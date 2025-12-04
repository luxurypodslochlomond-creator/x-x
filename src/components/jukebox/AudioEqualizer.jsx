
import React, { useRef, useEffect } from 'react';

const AudioEqualizer = ({ frequency_type, isPlaying }) => {
    const canvasRef = useRef(null);

    const getFrequencyColor = () => {
        const frequencyColors = {
            'Healing': { primary: '#00FF88', secondary: '#00DD77' },        // Green DNA repair
            'Creation': { primary: '#FFD700', secondary: '#FFA500' },       // Gold creativity
            'Focus': { primary: '#00D9FF', secondary: '#0088FF' },          // Cyan focus
            'Decompression': { primary: '#9D4EDD', secondary: '#7B2CBF' },  // Purple calm
            'Love': { primary: '#FF1B8D', secondary: '#FF006E' },           // Pink heart
            'Genesis': { primary: '#FFFFFF', secondary: '#E0E0E0' },        // White light
            'Revolution': { primary: '#FF6B35', secondary: '#FF4500' },     // Orange fire
            'Cosmic': { primary: '#8B5CF6', secondary: '#6D28D9' },         // Purple universe
            'Soul_Signature': { primary: '#F59E0B', secondary: '#D97706' }  // Amber soul
        };
        return frequencyColors[frequency_type] || frequencyColors['Healing'];
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        // Set canvas to be high-DPI aware
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;

        const colors = getFrequencyColor();
        const bars = 64;
        const barWidth = width / bars;

        let animationFrameId;

        const draw = () => {
            // Clear canvas with transparency to create a trailing effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, width, height);

            if (!isPlaying) {
                animationFrameId = requestAnimationFrame(draw); // Keep drawing background clear effect
                return;
            }

            for (let i = 0; i < bars; i++) {
                const barHeight = (Math.random() * (height / 2)) + (height / 10); // Random height, minimum 10% of canvas height
                const x = i * barWidth;
                const y = height - barHeight; // Draw bars from the bottom up

                // Create gradient for each bar
                const gradient = ctx.createLinearGradient(x, y, x, height);
                gradient.addColorStop(0, colors.primary);
                gradient.addColorStop(1, colors.secondary);

                ctx.fillStyle = gradient;
                ctx.fillRect(x, y, barWidth - 2, barHeight);

                // Add glow effect (applied globally, so set before drawing each bar)
                ctx.shadowBlur = 10;
                ctx.shadowColor = colors.primary;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [frequency_type, isPlaying]); // Re-run effect if frequency_type or isPlaying changes

    const colors = getFrequencyColor();

    return (
        <div className="relative w-full h-32 bg-black/40 rounded-xl overflow-hidden border"
             style={{ borderColor: colors.primary }}>
            <canvas 
                ref={canvasRef}
                className="w-full h-full"
            />
            <div 
                className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-black border"
                style={{
                    background: colors.primary,
                    color: '#000',
                    borderColor: colors.primary, // Ensure consistent border color
                    boxShadow: `0 0 10px ${colors.primary}`
                }}
            >
                {(frequency_type || 'HEALING').toUpperCase()} FREQUENCY
            </div>
        </div>
    );
};

export default AudioEqualizer;
