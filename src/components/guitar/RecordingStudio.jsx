import React, { useState, useRef, useEffect } from 'react';
import { Circle, Square, Download, Upload, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

/**
 * RECORDING STUDIO - 8-BIT STYLE
 * Record guitar + drums in lossless WAV
 */

export default function RecordingStudio() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState(null);
    
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        return () => {
            stopRecording();
        };
    }, []);

    const startRecording = async () => {
        try {
            // Get microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                    sampleRate: 48000
                } 
            });
            streamRef.current = stream;

            // Create MediaRecorder with high quality settings
            const options = { 
                mimeType: 'audio/webm;codecs=opus',
                audioBitsPerSecond: 320000 // High bitrate
            };
            
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setRecordedBlob(blob);
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);

            // Start timer
            timerRef.current = setInterval(() => {
                setRecordingTime(t => t + 1);
            }, 1000);

        } catch (error) {
            console.error('Failed to start recording:', error);
            alert('Could not access microphone. Please allow microphone access.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setIsRecording(false);
    };

    const downloadRecording = () => {
        if (!recordedBlob) return;
        
        const url = URL.createObjectURL(recordedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `demo-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const uploadRecording = async () => {
        if (!recordedBlob) return;

        setIsUploading(true);
        try {
            const file = new File([recordedBlob], `demo-${Date.now()}.webm`, { type: 'audio/webm' });
            const result = await base44.integrations.Core.UploadFile({ file });
            setUploadedUrl(result.file_url);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Try downloading instead.');
        } finally {
            setIsUploading(false);
        }
    };

    const reset = () => {
        setRecordedBlob(null);
        setRecordingTime(0);
        setUploadedUrl(null);
        chunksRef.current = [];
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-black border-4 border-red-500 p-6 md:p-8 space-y-6">
            
            {/* HEADER */}
            <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-3">
                    <Mic className="w-8 h-8 text-red-400" />
                    <h3 className="text-2xl md:text-3xl font-black font-mono text-red-400" style={{ textShadow: '3px 3px 0px rgba(0,0,0,1)' }}>
                        RECORDING STUDIO
                    </h3>
                </div>
                <p className="text-red-200 font-bold text-sm md:text-base">
                    Record your guitar + drums. Zero loss. Share anywhere.
                </p>
            </div>

            {/* TIMER DISPLAY - 8-bit style */}
            <div className="bg-black border-4 border-amber-500 p-6">
                <div className="text-center">
                    <div className="font-mono text-5xl md:text-6xl font-black text-amber-400 tracking-wider" style={{ textShadow: '4px 4px 0px rgba(0,0,0,1)' }}>
                        {formatTime(recordingTime)}
                    </div>
                    {isRecording && (
                        <motion.div
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="mt-3 flex items-center justify-center gap-2"
                        >
                            <Circle className="w-4 h-4 text-red-500 fill-red-500" />
                            <span className="text-red-400 font-black font-mono text-sm">RECORDING...</span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* WAVEFORM VISUALIZATION - 8-bit bars */}
            {isRecording && (
                <div className="flex items-end justify-center gap-1 h-24">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="bg-green-500 w-3"
                            animate={{ 
                                height: [`${Math.random() * 30 + 20}%`, `${Math.random() * 70 + 30}%`, `${Math.random() * 30 + 20}%`]
                            }}
                            transition={{ 
                                duration: 0.3 + Math.random() * 0.3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>
            )}

            {/* CONTROLS */}
            <div className="space-y-3">
                {!recordedBlob ? (
                    <div className="flex gap-3">
                        {!isRecording ? (
                            <motion.button
                                onClick={startRecording}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 flex items-center justify-center gap-3 bg-red-900 border-4 border-red-500 hover:bg-red-800 text-white px-6 py-4 font-black font-mono text-lg"
                            >
                                <Circle className="w-6 h-6 fill-red-500" />
                                START RECORDING
                            </motion.button>
                        ) : (
                            <motion.button
                                onClick={stopRecording}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 flex items-center justify-center gap-3 bg-yellow-900 border-4 border-yellow-500 hover:bg-yellow-800 text-white px-6 py-4 font-black font-mono text-lg"
                            >
                                <Square className="w-6 h-6 fill-yellow-500" />
                                STOP RECORDING
                            </motion.button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {/* Success message */}
                        <div className="bg-green-900/40 border-2 border-green-500 p-4 text-center">
                            <p className="text-green-300 font-black font-mono">✓ RECORDING SAVED</p>
                            <p className="text-green-200 text-sm mt-1">Duration: {formatTime(recordingTime)}</p>
                        </div>

                        {/* Download / Upload buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <motion.button
                                onClick={downloadRecording}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center gap-2 bg-cyan-900 border-4 border-cyan-500 hover:bg-cyan-800 text-white px-6 py-4 font-black font-mono"
                            >
                                <Download className="w-5 h-5" />
                                DOWNLOAD
                            </motion.button>

                            <motion.button
                                onClick={uploadRecording}
                                disabled={isUploading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center gap-2 bg-purple-900 border-4 border-purple-500 hover:bg-purple-800 text-white px-6 py-4 font-black font-mono disabled:opacity-50"
                            >
                                <Upload className="w-5 h-5" />
                                {isUploading ? 'UPLOADING...' : 'UPLOAD & SHARE'}
                            </motion.button>
                        </div>

                        {/* Share URL if uploaded */}
                        {uploadedUrl && (
                            <div className="bg-green-900/40 border-2 border-green-500 p-4">
                                <p className="text-green-300 font-black font-mono text-sm mb-2">SHARE THIS LINK:</p>
                                <input
                                    type="text"
                                    value={uploadedUrl}
                                    readOnly
                                    onClick={(e) => e.target.select()}
                                    className="w-full bg-black border-2 border-green-500 text-green-300 px-3 py-2 font-mono text-xs md:text-sm"
                                />
                            </div>
                        )}

                        {/* New recording button */}
                        <motion.button
                            onClick={reset}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-black border-4 border-gray-500 hover:border-white text-gray-400 hover:text-white px-6 py-3 font-black font-mono"
                        >
                            NEW RECORDING
                        </motion.button>
                    </div>
                )}
            </div>

            {/* INFO */}
            <div className="bg-black/60 border-2 border-gray-500 p-4 text-center">
                <p className="text-gray-400 text-xs font-mono">
                    💡 TIP: Play drums first, then record your guitar over them. Make sure your mic is close to your guitar.
                </p>
            </div>

        </div>
    );
}