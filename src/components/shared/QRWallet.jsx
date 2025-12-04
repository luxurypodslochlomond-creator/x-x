import React, { useState, useEffect } from 'react';
import { QrCode, Copy, CheckCircle2, Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

// 8-BIT BUTTON SOUND - COOLASFUCK
const playButtonTap = () => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1320, audioContext.currentTime + 0.05);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {}
};

export default function QRWallet({ userEmail, userName }) {
    const [copied, setCopied] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [stream, setStream] = useState(null);
    const videoRef = React.useRef(null);
    const canvasRef = React.useRef(null);

    const copyAddress = () => {
        navigator.clipboard.writeText(userEmail);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const startScanner = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setShowScanner(true);
        } catch (error) {
            console.error('Camera access denied:', error);
            alert('Camera access required to scan QR codes');
        }
    };

    const stopScanner = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setShowScanner(false);
    };

    const scanQRCode = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        try {
            if ('BarcodeDetector' in window) {
                const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });
                const barcodes = await barcodeDetector.detect(canvas);
                
                if (barcodes.length > 0) {
                    const scannedEmail = barcodes[0].rawValue;
                    stopScanner();
                    return scannedEmail;
                }
            }
        } catch (error) {
            console.error('QR scan error:', error);
        }

        return null;
    };

    useEffect(() => {
        if (showScanner && videoRef.current) {
            const interval = setInterval(async () => {
                const result = await scanQRCode();
                if (result) {
                    window.dispatchEvent(new CustomEvent('qr-scanned', { detail: result }));
                    stopScanner();
                }
            }, 500);

            return () => clearInterval(interval);
        }
    }, [showScanner]);

    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    return (
        <>
            <Card className="bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border-4 border-cyan-500">
                <CardContent className="p-6 text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <QrCode className="w-6 h-6 text-cyan-400" />
                        <h3 className="text-xl font-black font-mono text-cyan-400">YOUR WALLET</h3>
                    </div>

                    {/* QR CODE - SMALLER, CLEANER */}
                    <div className="bg-white p-3 rounded-lg mx-auto inline-block">
                        <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(userEmail)}&bgcolor=ffffff&color=000000`}
                            alt="Wallet QR" 
                            className="w-32 h-32"
                        />
                    </div>

                    {/* User Info */}
                    <div className="space-y-2">
                        <p className="text-cyan-400 text-xs font-mono font-black">SCAN TO SEND</p>
                        <p className="text-white font-bold text-lg">{userName}</p>
                        <p className="text-gray-400 text-sm font-mono break-all">{userEmail}</p>
                    </div>

                    {/* Copy Button */}
                    <Button
                        onClick={() => { playButtonTap(); copyAddress(); }}
                        variant="outline"
                        className="w-full border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 active:scale-95 transition-transform font-mono font-black"
                    >
                        {copied ? (
                            <>
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                COPIED!
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 mr-2" />
                                COPY ADDRESS
                            </>
                        )}
                    </Button>

                    {/* Scanner Button */}
                    <Button
                        onClick={() => { playButtonTap(); startScanner(); }}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 border-2 border-cyan-400 text-black active:scale-95 transition-transform font-mono font-black"
                    >
                        <Camera className="w-4 h-4 mr-2" />
                        SCAN QR
                    </Button>
                </CardContent>
            </Card>

            {/* QR Scanner Modal */}
            {showScanner && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-6"
                >
                    <button
                        onClick={() => { playButtonTap(); stopScanner(); }}
                        className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 border-2 border-cyan-500 flex items-center justify-center active:scale-95 transition-transform"
                    >
                        <X className="w-6 h-6 text-cyan-400" />
                    </button>

                    <div className="max-w-md w-full space-y-4">
                        <h2 className="text-2xl font-black font-mono text-cyan-400 text-center">SCAN QR CODE</h2>
                        
                        <div className="relative border-4 border-cyan-500 overflow-hidden">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full h-auto"
                            />
                            
                            {/* Scanning overlay - 8-BIT STYLE */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <motion.div 
                                    className="w-64 h-64 border-4 border-cyan-400"
                                    animate={{
                                        boxShadow: [
                                            '0 0 10px #22d3ee',
                                            '0 0 30px #22d3ee',
                                            '0 0 10px #22d3ee'
                                        ]
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </div>
                            
                            {/* 8-BIT SCANLINE */}
                            <motion.div
                                className="absolute left-0 right-0 h-1 bg-cyan-400"
                                style={{ boxShadow: '0 0 10px #22d3ee' }}
                                animate={{ top: ['10%', '90%', '10%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            />
                        </div>

                        <canvas ref={canvasRef} className="hidden" />

                        <p className="text-center text-cyan-400 font-mono text-sm font-black">
                            POSITION QR IN FRAME
                        </p>
                    </div>
                </motion.div>
            )}
        </>
    );
}