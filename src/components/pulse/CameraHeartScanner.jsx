import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * CAMERA HEART SCANNER
 * Real heartbeat detection using camera photoplethysmography (PPG)
 * Detects blood flow changes through fingertip color variations
 */

export default function CameraHeartScanner({ onHeartbeatDetected, onClose }) {
    const [isScanning, setIsScanning] = useState(false);
    const [stream, setStream] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, scanning, detected, error
    const [bpm, setBpm] = useState(null);
    const [coherence, setCoherence] = useState(null);
    const [signalQuality, setSignalQuality] = useState(0);
    
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const animationFrameRef = useRef(null);
    const measurementsRef = useRef([]);
    const startTimeRef = useRef(null);

    useEffect(() => {
        return () => {
            stopScanning();
        };
    }, []);

    const startScanning = async () => {
        try {
            setStatus('scanning');
            setIsScanning(true);

            // Request camera access - rear camera preferred for fingertip
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { 
                    facingMode: 'environment', // Try rear camera first
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                }
            });

            setStream(mediaStream);
            
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play();
                
                // Start analysis after video loads
                videoRef.current.onloadedmetadata = () => {
                    startTimeRef.current = Date.now();
                    measurementsRef.current = [];
                    analyzeFrame();
                };
            }

        } catch (error) {
            console.error('Camera access error:', error);
            setStatus('error');
            alert('Camera access needed to measure heartbeat. Please allow camera access.');
        }
    };

    const analyzeFrame = () => {
        if (!videoRef.current || !canvasRef.current || status !== 'scanning') return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size to match video
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;

        // Draw current video frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get image data from center region (where fingertip should be)
        const centerX = canvas.width / 2 - 50;
        const centerY = canvas.height / 2 - 50;
        const imageData = ctx.getImageData(centerX, centerY, 100, 100);
        const data = imageData.data;

        // Calculate average red channel intensity (blood absorbs green, reflects red)
        let redSum = 0;
        let greenSum = 0;
        const pixelCount = data.length / 4;

        for (let i = 0; i < data.length; i += 4) {
            redSum += data[i];
            greenSum += data[i + 1];
        }

        const avgRed = redSum / pixelCount;
        const avgGreen = greenSum / pixelCount;
        
        // Signal quality based on brightness and color balance
        const brightness = (avgRed + avgGreen) / 2;
        const quality = Math.min(100, Math.max(0, (brightness / 255) * 100));
        setSignalQuality(Math.round(quality));

        // Record measurement with timestamp
        const timestamp = Date.now();
        measurementsRef.current.push({
            time: timestamp,
            value: avgRed,
            green: avgGreen
        });

        // Keep only last 10 seconds of data
        const tenSecondsAgo = timestamp - 10000;
        measurementsRef.current = measurementsRef.current.filter(m => m.time > tenSecondsAgo);

        // Calculate BPM after 5 seconds of data
        const scanDuration = (timestamp - startTimeRef.current) / 1000;
        if (scanDuration >= 5 && measurementsRef.current.length > 50) {
            calculateHeartRate();
        }

        // Continue scanning
        animationFrameRef.current = requestAnimationFrame(analyzeFrame);
    };

    const calculateHeartRate = () => {
        const measurements = measurementsRef.current;
        if (measurements.length < 50) return;

        // Detrend the signal (remove DC component)
        const values = measurements.map(m => m.value);
        const mean = values.reduce((a, b) => a + b) / values.length;
        const detrended = values.map(v => v - mean);

        // Find peaks (simplified peak detection)
        const peaks = [];
        for (let i = 1; i < detrended.length - 1; i++) {
            if (detrended[i] > detrended[i - 1] && detrended[i] > detrended[i + 1] && detrended[i] > 5) {
                peaks.push({ index: i, time: measurements[i].time });
            }
        }

        if (peaks.length >= 3) {
            // Calculate intervals between peaks
            const intervals = [];
            for (let i = 1; i < peaks.length; i++) {
                intervals.push(peaks[i].time - peaks[i - 1].time);
            }

            // Average interval in milliseconds
            const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
            const calculatedBPM = Math.round(60000 / avgInterval);

            // Sanity check (40-200 BPM range)
            if (calculatedBPM >= 40 && calculatedBPM <= 200) {
                setBpm(calculatedBPM);

                // Calculate HRV coherence (variability between beats)
                const variance = intervals.reduce((sum, val) => {
                    const diff = val - avgInterval;
                    return sum + (diff * diff);
                }, 0) / intervals.length;
                const stdDev = Math.sqrt(variance);
                const coherenceScore = Math.max(0, Math.min(100, 100 - (stdDev / 10)));
                setCoherence(Math.round(coherenceScore));

                setStatus('detected');
            }
        }
    };

    const stopScanning = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsScanning(false);
    };

    const handleConfirm = () => {
        if (bpm && coherence && onHeartbeatDetected) {
            onHeartbeatDetected({ bpm, hrv_coherence: coherence });
            stopScanning();
            if (onClose) onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <Card className="bg-gradient-to-br from-purple-900 to-black border-4 border-pink-500 max-w-md w-full">
                <CardContent className="p-6 space-y-4">
                    
                    {/* HEADER */}
                    <div className="text-center">
                        <Heart className="w-16 h-16 text-pink-400 mx-auto mb-2 animate-pulse" />
                        <h2 className="text-2xl font-black font-mono text-pink-400">
                            REAL HEARTBEAT SCAN
                        </h2>
                        <p className="text-pink-300 font-mono text-xs mt-1">
                            Camera-based PPG detection
                        </p>
                    </div>

                    {/* VIDEO FEED */}
                    {status === 'scanning' && (
                        <div className="relative">
                            <video
                                ref={videoRef}
                                className="w-full rounded-lg border-4 border-pink-500"
                                playsInline
                                muted
                            />
                            <canvas ref={canvasRef} className="hidden" />
                            
                            {/* OVERLAY GUIDE */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-32 h-32 border-4 border-green-400 rounded-full animate-pulse">
                                    <div className="w-full h-full flex items-center justify-center">
                                        <p className="text-green-400 font-black font-mono text-xs text-center">
                                            COVER<br/>CAMERA
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* INSTRUCTIONS */}
                    {status === 'idle' && (
                        <div className="bg-black border-4 border-cyan-500 p-4 space-y-2">
                            <p className="text-cyan-400 font-black font-mono text-sm">📸 INSTRUCTIONS:</p>
                            <ol className="text-cyan-300 font-mono text-xs space-y-1 list-decimal list-inside">
                                <li>Press your fingertip against the camera lens</li>
                                <li>Cover the lens completely (blocks out light)</li>
                                <li>Hold very still for 5-10 seconds</li>
                                <li>Your pulse will be detected through color changes</li>
                            </ol>
                        </div>
                    )}

                    {/* SIGNAL QUALITY */}
                    {status === 'scanning' && (
                        <div className="bg-black border-4 border-green-500 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-green-400 font-black font-mono text-sm">SIGNAL:</span>
                                <span className="text-green-300 font-black font-mono text-sm">{signalQuality}%</span>
                            </div>
                            <div className="w-full bg-gray-800 h-4 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-green-400 to-green-600"
                                    animate={{ width: `${signalQuality}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            {signalQuality < 30 && (
                                <p className="text-amber-400 font-mono text-xs mt-2">
                                    ⚠️ Cover lens completely with fingertip
                                </p>
                            )}
                        </div>
                    )}

                    {/* DETECTED RESULT */}
                    {status === 'detected' && bpm && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-black border-4 border-green-500 p-6 text-center space-y-3"
                        >
                            <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                            <div>
                                <p className="text-green-400 font-black font-mono text-sm mb-2">HEARTBEAT DETECTED:</p>
                                <p className="text-6xl font-black font-mono text-green-300">{bpm}</p>
                                <p className="text-green-400 font-mono text-sm">BPM</p>
                            </div>
                            <div className="text-cyan-300 font-mono text-xs">
                                Coherence: {coherence}%
                            </div>
                        </motion.div>
                    )}

                    {/* ERROR */}
                    {status === 'error' && (
                        <div className="bg-black border-4 border-red-500 p-4 text-center">
                            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-2" />
                            <p className="text-red-400 font-black font-mono text-sm">
                                Camera access denied
                            </p>
                        </div>
                    )}

                    {/* BUTTONS */}
                    <div className="flex gap-3">
                        {status === 'idle' && (
                            <>
                                <Button
                                    onClick={onClose}
                                    variant="outline"
                                    className="flex-1 border-4 border-gray-600 font-black font-mono"
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    onClick={startScanning}
                                    className="flex-1 bg-green-600 hover:bg-green-700 border-4 border-green-400 font-black font-mono"
                                >
                                    <Camera className="w-5 h-5 mr-2" />
                                    START SCAN
                                </Button>
                            </>
                        )}

                        {status === 'scanning' && (
                            <Button
                                onClick={() => {
                                    stopScanning();
                                    setStatus('idle');
                                }}
                                className="w-full bg-red-600 hover:bg-red-700 border-4 border-red-400 font-black font-mono"
                            >
                                CANCEL SCAN
                            </Button>
                        )}

                        {status === 'detected' && (
                            <>
                                <Button
                                    onClick={() => {
                                        stopScanning();
                                        setStatus('idle');
                                        setBpm(null);
                                        setCoherence(null);
                                    }}
                                    variant="outline"
                                    className="flex-1 border-4 border-gray-600 font-black font-mono"
                                >
                                    RE-SCAN
                                </Button>
                                <Button
                                    onClick={handleConfirm}
                                    className="flex-1 bg-pink-600 hover:bg-pink-700 border-4 border-pink-400 font-black font-mono"
                                >
                                    <Heart className="w-5 h-5 mr-2" />
                                    JOIN PULSE
                                </Button>
                            </>
                        )}
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}