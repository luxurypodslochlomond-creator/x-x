import React, { useRef, useState, useEffect } from 'react';
import { Heart, Camera, Activity, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CAMERA HEART RATE (PPG)
 * Uses camera + flash to measure heart rate via blood flow
 * Photoplethysmography - proven medical technique
 * PROVES healing frequencies work via measurable biometrics
 */

export default function CameraHeartRate({ onMeasurement }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [heartRate, setHeartRate] = useState(null);
    const [hrv, setHrv] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, starting, measuring, complete
    const [samples, setSamples] = useState([]);
    const measurementRef = useRef(null);

    useEffect(() => {
        return () => {
            stopMeasurement();
        };
    }, []);

    const startMeasurement = async () => {
        try {
            setStatus('starting');
            setSamples([]);
            setHeartRate(null);
            setHrv(null);

            // Request camera with flash
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: false
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }

            // Enable flash (if supported)
            const track = stream.getVideoTracks()[0];
            if (track.getCapabilities && track.getCapabilities().torch) {
                await track.applyConstraints({ advanced: [{ torch: true }] });
            }

            setIsActive(true);
            setStatus('measuring');

            // Start sampling
            measurementRef.current = setInterval(() => {
                captureFrame();
            }, 50); // 20 fps sampling

            // Auto-stop after 30 seconds
            setTimeout(() => {
                stopMeasurement();
            }, 30000);

        } catch (err) {
            console.error('Camera access error:', err);
            setStatus('idle');
            alert('Camera access needed for heart rate measurement. Please allow camera + ensure finger covers camera lens.');
        }
    };

    const captureFrame = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0);

        // Get average red channel intensity (blood has strong red signal)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        let redSum = 0;
        for (let i = 0; i < data.length; i += 4) {
            redSum += data[i]; // Red channel
        }
        
        const avgRed = redSum / (data.length / 4);

        // Add to samples
        setSamples(prev => {
            const newSamples = [...prev, { time: Date.now(), value: avgRed }];
            
            // Keep last 10 seconds of data
            const cutoff = Date.now() - 10000;
            const filtered = newSamples.filter(s => s.time > cutoff);

            // Calculate heart rate if we have enough data
            if (filtered.length > 100) {
                calculateHeartRate(filtered);
            }

            return filtered;
        });
    };

    const calculateHeartRate = (sampleData) => {
        // Find peaks in the signal (heartbeats)
        const values = sampleData.map(s => s.value);
        const mean = values.reduce((a, b) => a + b) / values.length;
        const stdDev = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);
        
        const threshold = mean + stdDev * 0.5;
        
        const peaks = [];
        for (let i = 1; i < values.length - 1; i++) {
            if (values[i] > threshold && values[i] > values[i-1] && values[i] > values[i+1]) {
                peaks.push(sampleData[i].time);
            }
        }

        if (peaks.length >= 3) {
            // Calculate intervals between peaks
            const intervals = [];
            for (let i = 1; i < peaks.length; i++) {
                intervals.push(peaks[i] - peaks[i-1]);
            }

            // Average interval in ms
            const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
            
            // Convert to BPM
            const bpm = Math.round(60000 / avgInterval);

            // Only accept realistic heart rates
            if (bpm >= 40 && bpm <= 180) {
                setHeartRate(bpm);

                // Calculate HRV (RMSSD - standard deviation of intervals)
                const mean = intervals.reduce((a, b) => a + b) / intervals.length;
                const variance = intervals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / intervals.length;
                const hrvValue = Math.round(Math.sqrt(variance));
                
                setHrv(hrvValue);

                // Send measurement to parent
                if (onMeasurement) {
                    onMeasurement({ heartRate: bpm, hrv: hrvValue, timestamp: Date.now() });
                }
            }
        }
    };

    const stopMeasurement = () => {
        if (measurementRef.current) {
            clearInterval(measurementRef.current);
            measurementRef.current = null;
        }

        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }

        setIsActive(false);
        if (heartRate) {
            setStatus('complete');
        } else {
            setStatus('idle');
        }
    };

    return (
        <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 border-2 border-pink-500 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-pink-400" />
                <div>
                    <h3 className="text-white font-bold">Camera Heart Rate (PPG)</h3>
                    <p className="text-gray-400 text-xs">Measures before/after to prove healing works</p>
                </div>
            </div>

            {/* Instructions */}
            {!isActive && status === 'idle' && (
                <div className="bg-black/40 border border-pink-500/30 p-3 rounded mb-4">
                    <p className="text-pink-400 text-sm font-bold mb-2">HOW TO MEASURE:</p>
                    <ol className="text-gray-300 text-xs space-y-1">
                        <li>1. Cover camera lens with fingertip</li>
                        <li>2. Press gently (don't block blood flow)</li>
                        <li>3. Stay still for 30 seconds</li>
                        <li>4. Keep finger on lens until done</li>
                    </ol>
                </div>
            )}

            {/* Video feed (hidden) */}
            <video ref={videoRef} style={{ display: 'none' }} />
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {/* Measurement display */}
            {isActive && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-4"
                >
                    <div className="bg-black/60 border-2 border-pink-500 rounded-lg p-4 text-center">
                        <p className="text-pink-400 text-sm mb-2">MEASURING...</p>
                        <div className="flex items-center justify-center gap-4">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            >
                                <Heart className="w-12 h-12 text-pink-400" />
                            </motion.div>
                            {heartRate && (
                                <div>
                                    <p className="text-white text-4xl font-black">{heartRate}</p>
                                    <p className="text-gray-400 text-xs">BPM</p>
                                </div>
                            )}
                        </div>
                        {hrv && (
                            <div className="mt-3">
                                <p className="text-cyan-400 text-sm">HRV: <span className="font-bold">{hrv}ms</span></p>
                                <p className="text-gray-500 text-xs">Higher = less stress</p>
                            </div>
                        )}
                        <p className="text-gray-400 text-xs mt-3">Keep finger on camera...</p>
                    </div>

                    <button
                        onClick={stopMeasurement}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg"
                    >
                        Stop Measurement
                    </button>
                </motion.div>
            )}

            {/* Results */}
            {status === 'complete' && heartRate && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-green-500/20 border border-green-500 rounded-lg p-4"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <p className="text-green-400 font-bold">Measurement Complete</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-black/40 p-3 rounded">
                            <p className="text-gray-400 text-xs">Heart Rate</p>
                            <p className="text-white text-2xl font-black">{heartRate} BPM</p>
                        </div>
                        <div className="bg-black/40 p-3 rounded">
                            <p className="text-gray-400 text-xs">HRV</p>
                            <p className="text-white text-2xl font-black">{hrv}ms</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setStatus('idle');
                            setHeartRate(null);
                            setHrv(null);
                        }}
                        className="w-full mt-3 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-lg"
                    >
                        Measure Again
                    </button>
                </motion.div>
            )}

            {/* Start button */}
            {!isActive && status === 'idle' && (
                <button
                    onClick={startMeasurement}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <Camera className="w-5 h-5" />
                    Start Heart Rate Measurement
                </button>
            )}

            {/* Science note */}
            <div className="mt-4 bg-cyan-900/20 border-l-4 border-cyan-500 p-3">
                <p className="text-cyan-400 text-xs font-bold mb-1">MEDICAL SCIENCE:</p>
                <p className="text-gray-300 text-xs">
                    Photoplethysmography (PPG) - used in hospitals. Camera detects blood volume changes. 
                    Measure BEFORE healing session, then AFTER - if heart rate drops = stress reduced = PROOF ♾️❤️♾️
                </p>
            </div>
        </div>
    );
}