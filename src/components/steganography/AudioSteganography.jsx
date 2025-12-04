import React, { useRef, useState, useEffect } from 'react';

/**
 * AUDIO STEGANOGRAPHY - MUSIC = MONEY CARRIER
 * Encodes wallet addresses + data into ultrasonic range (18-22kHz)
 * Zero loss. Inaudible. Unstoppable.
 * 
 * Based on FSK (Frequency Shift Keying) - like old modems but ultrasonic
 * Bit 0 = 18kHz tone
 * Bit 1 = 20kHz tone
 * 
 * Shannon's theorem: C = B log₂(1 + S/N)
 * At 18-22kHz with good SNR: ~100 bits/second = 12.5 bytes/second
 * Wallet address (42 chars) = ~42 bytes = ~3.5 seconds to encode
 */

// ENCODE wallet address into ultrasonic audio buffer
export const encodeSteganography = (audioContext, sourceBuffer, walletAddress, trackId) => {
    const sampleRate = audioContext.sampleRate;
    const freq0 = 18000; // Bit 0 frequency (Hz)
    const freq1 = 20000; // Bit 1 frequency (Hz)
    const bitDuration = 0.01; // 10ms per bit = 100 bits/second
    const samplesPerBit = Math.floor(sampleRate * bitDuration);

    // Convert data to binary
    const dataString = JSON.stringify({
        wallet: walletAddress,
        trackId: trackId,
        timestamp: Date.now()
    });
    
    // Convert string to binary
    const binaryData = [];
    for (let i = 0; i < dataString.length; i++) {
        const charCode = dataString.charCodeAt(i);
        const binary = charCode.toString(2).padStart(8, '0');
        binaryData.push(...binary.split('').map(b => parseInt(b)));
    }

    // Add start/end markers (10101010 pattern)
    const startMarker = [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0];
    const endMarker = [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1];
    const fullData = [...startMarker, ...binaryData, ...endMarker];

    // Create new buffer with encoded data
    const newBuffer = audioContext.createBuffer(
        sourceBuffer.numberOfChannels,
        sourceBuffer.length,
        sampleRate
    );

    // Copy original audio
    for (let channel = 0; channel < sourceBuffer.numberOfChannels; channel++) {
        const sourceData = sourceBuffer.getChannelData(channel);
        const newData = newBuffer.getChannelData(channel);
        newData.set(sourceData);
    }

    // Encode ultrasonic tones into RIGHT CHANNEL ONLY
    const rightChannel = newBuffer.getChannelData(newBuffer.numberOfChannels > 1 ? 1 : 0);
    
    let sampleIndex = Math.floor(sampleRate * 0.5); // Start encoding after 0.5 seconds

    fullData.forEach((bit, bitIndex) => {
        const freq = bit === 1 ? freq1 : freq0;
        
        for (let i = 0; i < samplesPerBit; i++) {
            if (sampleIndex + i < rightChannel.length) {
                const t = (sampleIndex + i) / sampleRate;
                const amplitude = 0.05; // Very quiet ultrasonic (inaudible)
                const sample = amplitude * Math.sin(2 * Math.PI * freq * t);
                rightChannel[sampleIndex + i] += sample; // ADD to existing audio
            }
        }
        
        sampleIndex += samplesPerBit;
    });

    return newBuffer;
};

// DECODE wallet address from ultrasonic audio
export const decodeSteganography = (audioContext, audioBuffer) => {
    return new Promise((resolve, reject) => {
        const sampleRate = audioContext.sampleRate;
        const freq0 = 18000;
        const freq1 = 20000;
        const bitDuration = 0.01;
        const samplesPerBit = Math.floor(sampleRate * bitDuration);

        // Analyze RIGHT CHANNEL
        const rightChannel = audioBuffer.getChannelData(audioBuffer.numberOfChannels > 1 ? 1 : 0);
        
        // Start analyzing from 0.5 seconds
        let sampleIndex = Math.floor(sampleRate * 0.5);
        const maxSamples = Math.min(rightChannel.length, sampleIndex + (sampleRate * 10)); // Max 10 seconds of encoded data

        const decodedBits = [];

        // Decode bits
        while (sampleIndex < maxSamples) {
            const segment = rightChannel.slice(sampleIndex, sampleIndex + samplesPerBit);
            
            // FFT-like frequency detection (simplified)
            let power0 = 0;
            let power1 = 0;
            
            for (let i = 0; i < segment.length; i++) {
                const t = i / sampleRate;
                // Correlate with reference frequencies
                power0 += Math.abs(segment[i] * Math.sin(2 * Math.PI * freq0 * t));
                power1 += Math.abs(segment[i] * Math.sin(2 * Math.PI * freq1 * t));
            }

            // Detect which frequency is stronger
            const bit = power1 > power0 ? 1 : 0;
            decodedBits.push(bit);
            
            sampleIndex += samplesPerBit;

            // Stop if we've decoded enough (max 1000 bits = ~125 characters)
            if (decodedBits.length > 1000) break;
        }

        // Find start marker (10101010...)
        const startMarkerPattern = '1010101010101010';
        const bitsString = decodedBits.join('');
        const startIndex = bitsString.indexOf(startMarkerPattern);

        if (startIndex === -1) {
            resolve(null); // No encoded data found
            return;
        }

        // Find end marker (01010101...)
        const endMarkerPattern = '0101010101010101';
        const endIndex = bitsString.indexOf(endMarkerPattern, startIndex + 16);

        if (endIndex === -1) {
            resolve(null); // No end marker found
            return;
        }

        // Extract data between markers
        const dataBits = bitsString.slice(startIndex + 16, endIndex);

        // Convert binary to string
        const bytes = [];
        for (let i = 0; i < dataBits.length; i += 8) {
            const byte = dataBits.slice(i, i + 8);
            if (byte.length === 8) {
                bytes.push(parseInt(byte, 2));
            }
        }

        try {
            const dataString = String.fromCharCode(...bytes);
            const decodedData = JSON.parse(dataString);
            resolve(decodedData);
        } catch (e) {
            resolve(null); // Invalid data
        }
    });
};

// REACT COMPONENT - Steganography Encoder
export const SteganographyEncoder = ({ audioFile, walletAddress, trackId, onEncoded }) => {
    const [isEncoding, setIsEncoding] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioContextRef = useRef(null);

    const encodeAudio = async () => {
        setIsEncoding(true);
        setProgress(10);

        try {
            // Create audio context
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContextRef.current = new AudioContext();

            setProgress(25);

            // Load audio file
            const arrayBuffer = await audioFile.arrayBuffer();
            const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

            setProgress(50);

            // Encode steganography
            const encodedBuffer = encodeSteganography(
                audioContextRef.current,
                audioBuffer,
                walletAddress,
                trackId
            );

            setProgress(75);

            // Convert back to WAV blob
            const wavBlob = await bufferToWav(encodedBuffer);
            
            setProgress(100);

            onEncoded(wavBlob);
        } catch (err) {
            console.error('Encoding failed:', err);
            alert('Encoding failed. See console.');
        } finally {
            setIsEncoding(false);
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        }
    };

    return (
        <div className="space-y-4">
            {!isEncoding ? (
                <button
                    onClick={encodeAudio}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-4 rounded-xl font-black text-lg"
                >
                    🔐 ENCODE WALLET INTO MUSIC
                </button>
            ) : (
                <div className="bg-black/60 border-2 border-cyan-500 rounded-xl p-6">
                    <p className="text-white font-bold mb-3 text-center">Encoding...</p>
                    <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                        <div
                            className="h-4 bg-gradient-to-r from-cyan-500 to-purple-500"
                            style={{ width: `${progress}%`, transition: 'width 0.3s' }}
                        />
                    </div>
                    <p className="text-center text-cyan-400 text-sm mt-2">{progress}%</p>
                </div>
            )}
        </div>
    );
};

// REACT COMPONENT - Steganography Decoder
export const SteganographyDecoder = ({ audioUrl, onDecoded }) => {
    const [isDecoding, setIsDecoding] = useState(false);
    const [decodedData, setDecodedData] = useState(null);
    const audioContextRef = useRef(null);

    const decodeAudio = async () => {
        setIsDecoding(true);

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContextRef.current = new AudioContext();

            // Fetch audio file
            const response = await fetch(audioUrl);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

            // Decode steganography
            const data = await decodeSteganography(audioContextRef.current, audioBuffer);

            setDecodedData(data);
            if (onDecoded) onDecoded(data);
        } catch (err) {
            console.error('Decoding failed:', err);
            setDecodedData(null);
        } finally {
            setIsDecoding(false);
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        }
    };

    useEffect(() => {
        if (audioUrl) {
            decodeAudio();
        }
    }, [audioUrl]);

    if (isDecoding) {
        return (
            <div className="bg-cyan-900/30 border-2 border-cyan-500 rounded-lg p-4">
                <p className="text-cyan-300 text-sm font-bold">🔍 Scanning for hidden data...</p>
            </div>
        );
    }

    if (decodedData) {
        return (
            <div className="bg-green-900/30 border-2 border-green-500 rounded-lg p-4 space-y-2">
                <p className="text-green-300 font-bold text-sm">✅ DECODED:</p>
                <p className="text-white text-xs break-all">
                    <strong>Wallet:</strong> {decodedData.wallet}
                </p>
                <p className="text-white text-xs">
                    <strong>Track ID:</strong> {decodedData.trackId}
                </p>
            </div>
        );
    }

    return null;
};

// Helper: Convert AudioBuffer to WAV Blob
async function bufferToWav(audioBuffer) {
    const numberOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;

    const bytesPerSample = bitDepth / 8;
    const blockAlign = numberOfChannels * bytesPerSample;

    const data = [];
    for (let i = 0; i < audioBuffer.length; i++) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
            const sample = audioBuffer.getChannelData(channel)[i];
            const intSample = Math.max(-1, Math.min(1, sample)) * 0x7FFF;
            data.push(intSample);
        }
    }

    const dataLength = data.length * bytesPerSample;
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    // WAV header
    const writeString = (offset, string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataLength, true);

    // Write audio data
    let offset = 44;
    for (let i = 0; i < data.length; i++) {
        view.setInt16(offset, data[i], true);
        offset += 2;
    }

    return new Blob([buffer], { type: 'audio/wav' });
}

export default { encodeSteganography, decodeSteganography, SteganographyEncoder, SteganographyDecoder };