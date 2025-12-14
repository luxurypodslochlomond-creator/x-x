import React, { useState } from 'react';
import { Smartphone, Headphones, Zap, Brain, Heart, Waves, Eye, Thermometer, Navigation, Radio, Fingerprint, Camera, Vibrate, Globe, Wind, Droplet, Sun, Moon, AlertTriangle, CheckCircle, Sparkles, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * DEVICE LAB RESEARCH
 * Deep dive into phone/headphone hardware capabilities
 * What we're using, what we're missing, innovations possible
 */

export default function DeviceLabResearch() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    // HARDWARE CAPABILITIES RESEARCH
    const hardware = {
        sensors: {
            title: "SENSORS",
            icon: Smartphone,
            items: [
                {
                    name: "Gyroscope",
                    status: "unused",
                    capability: "Rotation/orientation in 3D space",
                    innovation: "Could detect: head movements during meditation, posture during healing sessions, rotation for VR frequency therapy",
                    accuracy: "±0.1°/sec",
                    color: "cyan"
                },
                {
                    name: "Proximity Sensor",
                    status: "unused",
                    capability: "Detects objects near screen (infrared)",
                    innovation: "Could measure: hand energy fields (IR heat), sleep detection (phone near face), gesture control without touch",
                    accuracy: "0-5cm range",
                    color: "purple"
                },
                {
                    name: "Magnetometer",
                    status: "working",
                    capability: "EM field strength (µT)",
                    innovation: "Already measuring: EMF pollution, wireless charging, coils. Could add: compass for Earth alignment during healing",
                    accuracy: "±0.5µT",
                    color: "green"
                },
                {
                    name: "Accelerometer",
                    status: "working",
                    capability: "Vibration/acceleration (m/s²)",
                    innovation: "Already measuring: sub-20Hz vibrations, earthquakes. Could add: gait analysis for health, dance/movement therapy",
                    accuracy: "±0.01 m/s²",
                    color: "green"
                },
                {
                    name: "Ambient Light",
                    status: "working",
                    capability: "Brightness in lux",
                    innovation: "Already measuring: circadian rhythm, workspace. Could add: flicker detection (LED/screen), seasonal affective disorder tracking",
                    accuracy: "1-10,000+ lux",
                    color: "green"
                },
                {
                    name: "Barometer",
                    status: "partial",
                    capability: "Air pressure (hPa/mbar)",
                    innovation: "Could measure: weather changes, migraine prediction, altitude (hiking safety), building pressure (HVAC health)",
                    accuracy: "±1 hPa",
                    color: "yellow"
                },
                {
                    name: "GPS",
                    status: "working",
                    capability: "Location (lat/lon)",
                    innovation: "Already using: cleanup tracking. Could add: geomagnetic field mapping, sacred site frequencies, Earth grid energy",
                    accuracy: "5-10m",
                    color: "green"
                },
                {
                    name: "Temperature",
                    status: "unused",
                    capability: "Device temp (°C)",
                    innovation: "Could measure: battery temp (EM interference?), room temp, fever detection (skin contact), thermal comfort",
                    accuracy: "±1°C",
                    color: "orange"
                },
                {
                    name: "Pedometer",
                    status: "unused",
                    capability: "Step counting",
                    innovation: "Could track: daily movement (healing requires motion), walking meditation, grounding time outdoors",
                    accuracy: "±5%",
                    color: "cyan"
                }
            ]
        },
        
        audio: {
            title: "AUDIO HARDWARE",
            icon: Headphones,
            items: [
                {
                    name: "Microphone Array",
                    status: "partial",
                    capability: "Multi-mic for directional audio",
                    innovation: "Currently: frequency detection. Could add: sound source location, noise isolation, echolocation (like bats - measure room dimensions)",
                    tech: "2-4 mics on most phones",
                    color: "green"
                },
                {
                    name: "Speakers as Sensors",
                    status: "unused",
                    capability: "Emit ultrasound, measure reflections",
                    innovation: "Could create: phone-to-phone P2P via ultrasound (no internet!), room mapping, heart rate via Doppler, gesture control",
                    tech: "Most speakers can do 18-22kHz",
                    color: "pink"
                },
                {
                    name: "Headphone Detection",
                    status: "unused",
                    capability: "Know when headphones plugged in",
                    innovation: "Could auto-switch: binaural beats mode, safe volume limits, headphone-optimized EQ for healing frequencies",
                    tech: "Hardware + software detection",
                    color: "cyan"
                },
                {
                    name: "Bone Conduction",
                    status: "unused",
                    capability: "Vibrations through skull",
                    innovation: "Could measure: your own heartbeat (via skull), inner ear health, voice resonance (see your own frequency)",
                    tech: "Requires bone conduction headphones",
                    color: "purple"
                },
                {
                    name: "Active Noise Cancellation",
                    status: "unused",
                    capability: "Inverse wave generation",
                    innovation: "Could use: targeted silence for meditation, cancel specific anxiety frequencies, create 'healing silence' chambers",
                    tech: "ANC headphones required",
                    color: "yellow"
                }
            ]
        },

        camera: {
            title: "CAMERA/VISION",
            icon: Camera,
            items: [
                {
                    name: "Dual Camera Depth",
                    status: "unused",
                    capability: "3D mapping via parallax",
                    innovation: "Could measure: body posture during healing, room geometry for acoustics, sacred geometry in nature",
                    tech: "Most phones have 2+ cameras",
                    color: "cyan"
                },
                {
                    name: "Color Analysis",
                    status: "unused",
                    capability: "RGB + spectrum analysis",
                    innovation: "Could detect: plant health (chlorophyll), water quality, light spectrum (LED vs sun), color therapy feedback",
                    tech: "Camera sensor + algorithms",
                    color: "pink"
                },
                {
                    name: "Flicker Detection",
                    status: "unused",
                    capability: "See LED/screen flicker invisible to eye",
                    innovation: "Could measure: hidden screen flicker causing headaches, LED bulb quality, EM interference in lighting",
                    tech: "High-speed camera mode",
                    color: "yellow"
                },
                {
                    name: "Heart Rate (PPG)",
                    status: "unused",
                    capability: "Photoplethysmography via camera+flash",
                    innovation: "Could measure: real-time HRV, stress levels, frequency effects on heart, meditation coherence",
                    tech: "Camera + LED flash",
                    color: "pink"
                },
                {
                    name: "Facial Expression AI",
                    status: "unused",
                    capability: "Emotion detection",
                    innovation: "Could track: emotional state before/after healing, stress markers, smile frequency (happiness metric)",
                    tech: "On-device ML",
                    color: "purple"
                }
            ]
        },

        haptic: {
            title: "HAPTIC/TOUCH",
            icon: Vibrate,
            items: [
                {
                    name: "Vibration Motor",
                    status: "unused",
                    capability: "Precise vibration patterns",
                    innovation: "Could use: haptic healing (sub-20Hz via touch), meditation timers (gentle), Morse code P2P, rhythm therapy",
                    tech: "Linear actuators in modern phones",
                    color: "cyan"
                },
                {
                    name: "3D Touch/Force",
                    status: "unused",
                    capability: "Pressure-sensitive screen",
                    innovation: "Could measure: stress levels via tap pressure, finger tremor (Parkinson's detection), grip strength",
                    tech: "iPhone + some Android",
                    color: "orange"
                },
                {
                    name: "Fingerprint Sensor",
                    status: "unused",
                    capability: "Biometric + heart rate",
                    innovation: "Could measure: stress (from heart rate), hydration (skin conductivity), identity for personalized healing",
                    tech: "Optical or ultrasonic sensor",
                    color: "purple"
                }
            ]
        },

        connectivity: {
            title: "CONNECTIVITY",
            icon: Radio,
            items: [
                {
                    name: "Bluetooth RSSI",
                    status: "unused",
                    capability: "Signal strength measurement",
                    innovation: "Could measure: RF exposure, device proximity for P2P, crowd density (privacy-safe), mesh network quality",
                    tech: "Bluetooth 4.0+",
                    color: "cyan"
                },
                {
                    name: "WiFi Scanning",
                    status: "unused",
                    capability: "Detect networks + signal strength",
                    innovation: "Could measure: EM pollution map, location without GPS (WiFi triangulation), network congestion",
                    tech: "Native APIs",
                    color: "yellow"
                },
                {
                    name: "NFC",
                    status: "unused",
                    capability: "Near-field communication",
                    innovation: "Could use: tap-to-share healing frequencies, offline P2P token transfer, physical 'healing tags' at locations",
                    tech: "13.56 MHz RFID",
                    color: "pink"
                },
                {
                    name: "Ultra-Wideband (UWB)",
                    status: "unused",
                    capability: "Precise spatial awareness",
                    innovation: "Could measure: sub-centimeter positioning, device-to-device distance, direction finding for navigation",
                    tech: "iPhone 11+, Samsung S21+",
                    color: "purple"
                }
            ]
        },

        forgotten: {
            title: "FORGOTTEN/HIDDEN TECH",
            icon: Lightbulb,
            items: [
                {
                    name: "FM Radio Chip",
                    status: "disabled",
                    capability: "Built-in but software-locked",
                    innovation: "Could use: emergency broadcast (no internet), free music, NOAA weather alerts, freedom from streaming",
                    tech: "Most phones have chip, but disabled by carriers",
                    color: "red"
                },
                {
                    name: "IR Blaster",
                    status: "removed",
                    capability: "Infrared remote control",
                    innovation: "Could use: universal remote, P2P data transfer (line-of-sight), heat signature detection",
                    tech: "Removed from most modern phones",
                    color: "red"
                },
                {
                    name: "Stereo Speakers",
                    status: "underused",
                    capability: "Spatial audio positioning",
                    innovation: "Could use: 3D sound healing, binaural without headphones, speaker-based ultrasound communication",
                    tech: "Most phones have stereo now",
                    color: "green"
                },
                {
                    name: "Battery as Sensor",
                    status: "unused",
                    capability: "Drain rate = EM interference",
                    innovation: "Could detect: high EM areas (battery drains faster), app energy waste, device health",
                    tech: "Battery stats APIs",
                    color: "orange"
                }
            ]
        }
    };

    const categories = Object.keys(hardware);
    const filteredCategories = selectedCategory === 'all' ? categories : [selectedCategory];

    const statusColors = {
        working: { bg: 'bg-green-500/10', border: 'border-green-500', text: 'text-green-400' },
        unused: { bg: 'bg-cyan-500/10', border: 'border-cyan-500', text: 'text-cyan-400' },
        partial: { bg: 'bg-yellow-500/10', border: 'border-yellow-500', text: 'text-yellow-400' },
        disabled: { bg: 'bg-red-500/10', border: 'border-red-500', text: 'text-red-400' },
        removed: { bg: 'bg-gray-500/10', border: 'border-gray-500', text: 'text-gray-400' }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Smartphone className="w-12 h-12 text-cyan-400" />
                        <Zap className="w-10 h-10 text-yellow-400" />
                        <Brain className="w-12 h-12 text-pink-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-3">DEVICE LAB RESEARCH</h1>
                    <p className="text-gray-400 text-sm md:text-base max-w-3xl mx-auto">
                        Deep dive into phone hardware capabilities - what we're using, missing, and could innovate
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                            <span className="text-green-400">Working</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-cyan-500 rounded-full" />
                            <span className="text-cyan-400">Unused</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                            <span className="text-yellow-400">Partial</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                            <span className="text-red-400">Disabled</span>
                        </div>
                    </div>
                </motion.div>

                {/* CATEGORY FILTER */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                            selectedCategory === 'all'
                                ? 'bg-cyan-500 text-black'
                                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                        }`}
                    >
                        All
                    </button>
                    {categories.map(cat => {
                        const Icon = hardware[cat].icon;
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                                    selectedCategory === cat
                                        ? 'bg-cyan-500 text-black'
                                        : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {hardware[cat].title}
                            </button>
                        );
                    })}
                </div>

                {/* HARDWARE CATEGORIES */}
                <div className="space-y-8">
                    {filteredCategories.map(catKey => {
                        const category = hardware[catKey];
                        const Icon = category.icon;
                        
                        return (
                            <motion.div
                                key={catKey}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-black border-2 border-cyan-500 rounded-xl p-6"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <Icon className="w-8 h-8 text-cyan-400" />
                                    <h2 className="text-2xl font-black text-white">{category.title}</h2>
                                </div>

                                <div className="grid gap-4">
                                    {category.items.map((item, idx) => {
                                        const colors = statusColors[item.status];
                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className={`${colors.bg} border-l-4 ${colors.border} p-4 rounded-lg`}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="text-white font-bold text-lg">{item.name}</h3>
                                                        <p className="text-gray-400 text-sm">{item.capability}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 ${colors.bg} ${colors.border} border rounded-full text-xs font-bold ${colors.text}`}>
                                                        {item.status.toUpperCase()}
                                                    </span>
                                                </div>

                                                <div className="mt-3 space-y-2">
                                                    <div className="bg-black/40 border border-white/10 p-3 rounded">
                                                        <p className="text-cyan-400 text-xs font-bold mb-1">INNOVATION:</p>
                                                        <p className="text-gray-300 text-sm">{item.innovation}</p>
                                                    </div>

                                                    {item.accuracy && (
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                                            <span className="text-gray-400">Accuracy: <span className="text-green-400 font-bold">{item.accuracy}</span></span>
                                                        </div>
                                                    )}
                                                    
                                                    {item.tech && (
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <Sparkles className="w-4 h-4 text-purple-400" />
                                                            <span className="text-gray-400">Tech: <span className="text-purple-400 font-bold">{item.tech}</span></span>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* INNOVATION SUMMARY */}
                <div className="mt-8 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border-2 border-pink-500 rounded-xl p-6">
                    <h3 className="text-pink-400 font-black text-xl mb-4">🚀 TOP INNOVATIONS WE COULD BUILD</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-black/60 border border-pink-500/30 p-4 rounded">
                            <p className="text-white font-bold mb-2">1. Ultrasonic P2P Transfer</p>
                            <p className="text-gray-300 text-sm">Phone speakers emit ultrasound (18-22kHz) - phones exchange data via sound, no internet needed. Perfect for mesh networks.</p>
                        </div>
                        <div className="bg-black/60 border border-cyan-500/30 p-4 rounded">
                            <p className="text-white font-bold mb-2">2. Heart Rate via Camera</p>
                            <p className="text-gray-300 text-sm">Camera + flash measures blood flow (PPG) - real-time HRV/stress before/after healing sessions. Proves frequency effects.</p>
                        </div>
                        <div className="bg-black/60 border border-purple-500/30 p-4 rounded">
                            <p className="text-white font-bold mb-2">3. Haptic Sub-20Hz Therapy</p>
                            <p className="text-gray-300 text-sm">Vibration motor delivers healing frequencies via touch - bypass ears, straight to body. Like massage + frequency combined.</p>
                        </div>
                        <div className="bg-black/60 border border-yellow-500/30 p-4 rounded">
                            <p className="text-white font-bold mb-2">4. Gyroscope Posture Tracking</p>
                            <p className="text-gray-300 text-sm">Track head/body position during meditation - verify if posture affects healing. Could detect stress in movement patterns.</p>
                        </div>
                        <div className="bg-black/60 border border-green-500/30 p-4 rounded">
                            <p className="text-white font-bold mb-2">5. LED Flicker Detection</p>
                            <p className="text-gray-300 text-sm">High-speed camera sees invisible flicker causing headaches. Map which lights are safe, which cause harm.</p>
                        </div>
                        <div className="bg-black/60 border border-orange-500/30 p-4 rounded">
                            <p className="text-white font-bold mb-2">6. NFC Healing Tags</p>
                            <p className="text-gray-300 text-sm">Physical tags at locations - tap phone, get location-specific healing frequency. Sacred sites, nature spots, safe zones.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}