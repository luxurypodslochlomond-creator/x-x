import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export const AudioContext = createContext();

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within AudioProvider');
    }
    return context;
};

// **CRITICAL: Global singletons for Web Audio API**
let globalAudioContext = null;
let globalAnalyser = null;

export const AudioProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [loop, setLoop] = useState(false);
    const [playlist, setPlaylist] = useState([]); // NEW: Track playlist
    const [currentIndex, setCurrentIndex] = useState(0); // NEW: Current track index
    const [lowPowerMode, setLowPowerMode] = useState(false); // NEW: battery optimization
    const [userDNAProfile, setUserDNAProfile] = useState(null); // NEW: User's DNA frequency profile
    
    const audioRef = useRef(null);
    const sourceNodeRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const keepAliveIntervalRef = useRef(null);
    const wakeLockRef = useRef(null);
    
    // **CRITICAL: Prevent concurrent operations**
    const isLoadingTrackRef = useRef(false);
    const cleanupInProgressRef = useRef(false);
    const currentAudioElementRef = useRef(null); // Track which audio element the source node is for
    
    const queryClient = useQueryClient();

    // NEW: Battery status detection
    useEffect(() => {
        const checkBatteryStatus = async () => {
            if ('getBattery' in navigator) {
                try {
                    const battery = await navigator.getBattery();
                    
                    // Auto-enable low power mode when battery < 20% and not charging
                    const updatePowerMode = () => {
                        if (battery.level < 0.2 && !battery.charging) {
                            setLowPowerMode(true);
                        } else {
                            // If battery is above 20% or charging, disable low power mode
                            // This ensures the user can still manually toggle it off if needed
                            setLowPowerMode(false); 
                        }
                    };
                    
                    updatePowerMode(); // Initial check
                    battery.addEventListener('levelchange', updatePowerMode);
                    battery.addEventListener('chargingchange', updatePowerMode);
                    
                    return () => {
                        battery.removeEventListener('levelchange', updatePowerMode);
                        battery.removeEventListener('chargingchange', updatePowerMode);
                    };
                } catch (err) {
                    // Battery API not available, that's okay
                    console.warn("Battery API not available or error:", err);
                }
            }
        };
        
        checkBatteryStatus();
    }, []);

    // NEW: Page visibility optimization - pause visualizations when hidden
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && isPlaying) {
                // Keep audio playing but signal to stop visualizations
                // (individual visualization components should check this)
                // For now, we don't change `isPlaying` state here,
                // this `lowPowerMode` can be used by visualization components.
            }
            // You might want to implement a mechanism to signal visualization components to pause/resume
            // based on document.hidden state, potentially via another context value or prop.
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [isPlaying]);

    // **Initialize global audio context once**
    useEffect(() => {
        if (!globalAudioContext) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            globalAudioContext = new AudioContextClass();
            globalAnalyser = globalAudioContext.createAnalyser();
            globalAnalyser.fftSize = 2048;
        }
        audioContextRef.current = globalAudioContext;
        analyserRef.current = globalAnalyser;

        // iOS: Resume audio context on user interaction
        const resumeAudio = () => {
            if (audioContextRef.current?.state === 'suspended') {
                audioContextRef.current.resume();
            }
        };
        document.addEventListener('touchstart', resumeAudio, { once: true });
        document.addEventListener('click', resumeAudio, { once: true });

        // BLUETOOTH FIX: Resume audio context when audio output changes
        const handleAudioOutputChange = async () => {
            if (audioContextRef.current?.state === 'suspended') {
                await audioContextRef.current.resume();
            }
            // Force audio element to reconnect
            if (audioRef.current && isPlaying) {
                const currentTime = audioRef.current.currentTime;
                audioRef.current.load();
                audioRef.current.currentTime = currentTime;
                audioRef.current.play().catch(err => console.warn('Audio restart failed:', err));
            }
        };

        // Listen for device changes (Bluetooth connect/disconnect)
        if (navigator.mediaDevices) {
            navigator.mediaDevices.addEventListener('devicechange', handleAudioOutputChange);
        }

        // Placeholder for stopping oscillators if they were ever used directly
        const stopAllOscillators = () => {
            // No direct oscillators used with MediaElementSource, but good practice
            // to have this if we ever generate tones/frequencies directly.
        };

        return () => {
            stopAllOscillators();
            document.removeEventListener('touchstart', resumeAudio);
            document.removeEventListener('click', resumeAudio);
            if (navigator.mediaDevices) {
                navigator.mediaDevices.removeEventListener('devicechange', handleAudioOutputChange);
            }
        };
    }, [isPlaying]);

    // NEW: Load DNA profile on mount
    useEffect(() => {
        const loadDNAProfile = async () => {
            try {
                const user = await base44.auth.me();
                if (user?.email) {
                    const profiles = await base44.entities.DNAFrequencyProfile.filter({ user_email: user.email });
                    if (profiles && profiles.length > 0) {
                        setUserDNAProfile(profiles[0]);
                    }
                }
            } catch (err) {
                // No DNA profile yet, that's okay
                console.warn("Failed to load DNA profile, or none exists.", err);
            }
        };
        loadDNAProfile();
    }, []);

    // NEW: Sync offline plays when back online
    useEffect(() => {
        const syncOfflinePlays = async () => {
            if (!navigator.onLine) return;

            const offlinePlays = JSON.parse(localStorage.getItem('uf51_offline_plays') || '[]');
            if (offlinePlays.length === 0) return;

            const updatedPlays = [];
            
            try {
                for (const play of offlinePlays) {
                    if (!play.synced_to_server) {
                        try {
                            // Sync to BluetoothTransmission entity
                            await base44.entities.BluetoothTransmission.create({
                                track_id: play.track_id,
                                track_title: play.track_title || 'Unknown',
                                artist: play.artist,
                                sender_device_id: navigator.userAgent, // Simple device ID
                                receiver_device_id: 'self',
                                transmission_timestamp: play.played_at,
                                receiver_played_offline: true,
                                receiver_synced_online: true,
                                artist_credited: true
                            });

                            // Update play count
                            const track = await base44.entities.Soundtrack.filter({ id: play.track_id });
                            if (track && track.length > 0) {
                                await base44.entities.Soundtrack.update(play.track_id, {
                                    play_count: (track[0].play_count || 0) + 1
                                });
                                queryClient.invalidateQueries(['soundtracks']); // Invalidate cache after update
                            }

                            play.synced_to_server = true;
                            updatedPlays.push(play); // Mark as synced successfully
                        } catch (err) {
                            console.error(`Failed to sync individual offline play for track ${play.track_id}:`, err);
                            updatedPlays.push(play); // Keep even if failed, to avoid reprocessing forever if there's a persistent error
                        }
                    } else {
                        updatedPlays.push(play); // Already synced, keep it
                    }
                }

                // Remove synced plays from localStorage
                const remainingPlays = updatedPlays.filter(p => !p.synced_to_server);
                localStorage.setItem('uf51_offline_plays', JSON.stringify(remainingPlays));

                if (offlinePlays.length > 0 && remainingPlays.length < offlinePlays.length) {
                    console.log(`✅ Synced ${offlinePlays.length - remainingPlays.length} offline plays. Artists credited.`);
                }
            } catch (err) {
                console.error('Failed to sync offline plays batch:', err);
                // In case of a batch error, re-save current state to avoid data loss
                localStorage.setItem('uf51_offline_plays', JSON.stringify(updatedPlays));
            }
        };

        // Sync when online
        window.addEventListener('online', syncOfflinePlays);
        syncOfflinePlays(); // Try on load

        return () => window.removeEventListener('online', syncOfflinePlays);
    }, [queryClient]); // Add queryClient to dependencies

    // **Update media session metadata**
    useEffect(() => {
        if ('mediaSession' in navigator && currentTrack) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: currentTrack.title,
                artist: currentTrack.artist,
                album: 'Healing Frequencies',
                artwork: [
                    { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
                    { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
                ]
            });
        }
        if ('mediaSession' in navigator && !currentTrack) {
             navigator.mediaSession.metadata = null;
        }
    }, [currentTrack]);

    // **Request wake lock**
    useEffect(() => {
        const requestWakeLock = async () => {
            if ('wakeLock' in navigator && isPlaying && !lowPowerMode) { // Conditioned by lowPowerMode
                try {
                    wakeLockRef.current = await navigator.wakeLock.request('screen');
                } catch (err) {
                    // Silent fail
                }
            }
        };

        if (isPlaying && !lowPowerMode) {
            requestWakeLock();
        } else {
            if (wakeLockRef.current) {
                wakeLockRef.current.release();
                wakeLockRef.current = null;
            }
        }

        return () => {
            if (wakeLockRef.current) {
                wakeLockRef.current.release();
                wakeLockRef.current = null;
            }
        };
    }, [isPlaying, lowPowerMode]); // Added lowPowerMode to dependency array

    // **Keep audio context alive (iOS fix)**
    useEffect(() => {
        if (isPlaying && globalAudioContext) {
            keepAliveIntervalRef.current = setInterval(() => {
                if (globalAudioContext.state === 'suspended') {
                    globalAudioContext.resume();
                }
            }, 100);
        } else {
            if (keepAliveIntervalRef.current) {
                clearInterval(keepAliveIntervalRef.current);
            }
        }

        return () => {
            if (keepAliveIntervalRef.current) {
                clearInterval(keepAliveIntervalRef.current);
            }
        };
    }, [isPlaying]);
    
    // **Update volume**
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // **Update loop**
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = loop;
        }
    }, [loop]);

    // **CRITICAL: Complete cleanup function**
    const performCleanup = useCallback(async () => {
        if (cleanupInProgressRef.current) {
            await new Promise(resolve => setTimeout(resolve, 250));
            return;
        }

        cleanupInProgressRef.current = true;

        try {
            // **CRITICAL FIX: Only disconnect if this is OUR source node**
            if (sourceNodeRef.current && currentAudioElementRef.current === audioRef.current) {
                try {
                    sourceNodeRef.current.disconnect();
                    sourceNodeRef.current = null;
                    currentAudioElementRef.current = null;
                } catch (e) {
                    // Already disconnected
                    sourceNodeRef.current = null;
                    currentAudioElementRef.current = null;
                }
            }

            // 2. Clean up audio element
            if (audioRef.current) {
                const oldAudio = audioRef.current;
                audioRef.current = null;
                
                try {
                    oldAudio.pause();
                    oldAudio.src = '';
                    oldAudio.load();
                    oldAudio.remove();
                } catch (e) {
                    // Already cleaned
                }
            }

            // 3. Wait for cleanup to settle
            await new Promise(resolve => setTimeout(resolve, 200));
        } finally {
            cleanupInProgressRef.current = false;
        }
    }, []);

    const stopTrack = useCallback(async () => {
        await performCleanup();
        setIsPlaying(false);
        setCurrentTrack(null);
        setCurrentTime(0);
        setDuration(0);
        setError(null);
        isLoadingTrackRef.current = false;
    }, [performCleanup]);

    const togglePlayPause = async () => {
        if (!audioRef.current || !currentTrack) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            if (globalAudioContext?.state === 'suspended') {
                await globalAudioContext.resume();
            }
            await audioRef.current.play().catch(err => {
                const isNetworkError = 
                    !navigator.onLine ||
                    err?.message?.toLowerCase().includes('network') ||
                    err?.message?.toLowerCase().includes('failed to fetch');
                
                if (!isNetworkError) {
                    console.error('Failed to resume playback:', err);
                    setError(err.message || 'Failed to resume playback');
                }
                setIsPlaying(false);
            });
            setIsPlaying(true);
        }
    };

    const playTrack = async (track) => {
        if (!track || !track.file_url) {
            setError('No track file available');
            return;
        }

        try {
            // **CRITICAL: Block concurrent loading**
            if (isLoadingTrackRef.current) {
                return;
            }

            // **CRITICAL: If same track, just toggle**
            if (currentTrack?.id === track.id) {
                togglePlayPause();
                return;
            }

            isLoadingTrackRef.current = true;

            // Smooth fade out if currently playing
            if (audioRef.current && isPlaying) {
                const currentAudio = audioRef.current;
                const fadeSteps = 8;
                const fadeInterval = 25;
                const currentVolume = currentAudio.volume;
                const volumeStep = currentVolume / fadeSteps;
                
                for (let i = 0; i < fadeSteps; i++) {
                    await new Promise(resolve => setTimeout(resolve, fadeInterval));
                    if (currentAudio && currentAudio.volume > 0) {
                        currentAudio.volume = Math.max(0, currentAudio.volume - volumeStep);
                    }
                }
                
                if (currentAudio) {
                    currentAudio.pause();
                }
            }

            // **CRITICAL: Complete cleanup before creating new audio**
            await performCleanup();

            setCurrentTrack(track);
            setIsPlaying(false);
            setIsLoading(true);
            setError(null);

            // Create fresh audio element
            const audio = new Audio(track.file_url);
            audio.crossOrigin = "anonymous";
            audio.preload = "auto";
            audio.setAttribute('playsinline', 'true');
            audio.volume = 0; // Start silent for fade-in
            audio.loop = loop;
            audioRef.current = audio;

            // Set up event listeners
            const handleLoadedMetadata = () => {
                setDuration(audio.duration);
                setIsLoading(false);
            };
            const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
            const handleEnded = () => {
                if (!loop) {
                    setIsPlaying(false);
                    setCurrentTime(0);
                    // Automatically play next track if not looping and part of a playlist
                    if (playlist.length > 0 && currentIndex < playlist.length - 1) {
                        nextTrack();
                    } else if (playlist.length > 0 && currentIndex === playlist.length - 1) {
                        // If it's the last track, stop
                        stopTrack(); 
                    }
                }
            };
            const handleError = (e) => {
                const isNetworkError = 
                    !navigator.onLine ||
                    e.target?.error?.code === MediaError.MEDIA_ERR_NETWORK ||
                    e.target?.error?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED ||
                    (e.message && (e.message.toLowerCase().includes('network') || e.message.toLowerCase().includes('failed to fetch')));
                
                if (!isNetworkError) {
                    console.error('Audio playback error:', e);
                    setError(e.message || 'Audio playback error');
                }
                setIsPlaying(false);
                setIsLoading(false);
                isLoadingTrackRef.current = false;
            };

            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('durationchange', handleLoadedMetadata);
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('ended', handleEnded);
            audio.addEventListener('error', handleError);

            // **SAFER WEB AUDIO API CONNECTION**
            // Only connect if:
            // 1. Not in low power mode
            // 2. No existing source node (ensures unique connection)
            // 3. Context is available and not closed
            if (!lowPowerMode && 
                !sourceNodeRef.current && 
                globalAudioContext && 
                globalAudioContext.state !== 'closed') {
                
                try {
                    if (globalAudioContext.state === 'suspended') {
                        await globalAudioContext.resume();
                    }

                    const newSourceNode = globalAudioContext.createMediaElementSource(audio);
                    newSourceNode.connect(globalAnalyser);
                    globalAnalyser.connect(globalAudioContext.destination);
                    sourceNodeRef.current = newSourceNode;
                    currentAudioElementRef.current = audio; // Associate source node with this specific audio element
                } catch (sourceError) {
                    // **If Web Audio API fails, just continue without visualizations**
                    // Audio will still play through normal browser audio
                    console.warn('Web Audio API unavailable (visualizations disabled):', sourceError.message);
                    sourceNodeRef.current = null;
                    currentAudioElementRef.current = null;
                }
            }

            // Play and fade in
            await audio.play();
            
            const fadeSteps = 10;
            const fadeInterval = 50;
            const targetVolume = volume;
            const volumeStep = targetVolume / fadeSteps;
            
            for (let i = 0; i < fadeSteps; i++) {
                await new Promise(resolve => setTimeout(resolve, fadeInterval));
                if (audio && audio.volume < targetVolume) {
                    audio.volume = Math.min(targetVolume, audio.volume + volumeStep);
                }
            }
            
            setIsPlaying(true);
            setIsLoading(false);
            isLoadingTrackRef.current = false;

            const playRecord = {
                track_id: track.id,
                track_title: track.title,
                artist: track.artist,
                played_at: new Date().toISOString(),
                synced_to_server: false,
            };

            const storeOfflinePlay = (play) => {
                const offlinePlays = JSON.parse(localStorage.getItem('uf51_offline_plays') || '[]');
                offlinePlays.push(play);
                localStorage.setItem('uf51_offline_plays', JSON.stringify(offlinePlays));
            };

            try {
                if (navigator.onLine) {
                    // Attempt to create BluetoothTransmission
                    await base44.entities.BluetoothTransmission.create({
                        track_id: playRecord.track_id,
                        track_title: playRecord.track_title,
                        artist: playRecord.artist,
                        sender_device_id: navigator.userAgent, // Simple device ID
                        receiver_device_id: 'self',
                        transmission_timestamp: playRecord.played_at,
                        receiver_played_offline: false, // Played online, so not considered "offline played"
                        receiver_synced_online: true, // Synced immediately
                        artist_credited: true
                    });

                    // Attempt to update play count
                    await base44.entities.Soundtrack.update(playRecord.track_id, {
                        play_count: (track.play_count || 0) + 1
                    });
                    queryClient.invalidateQueries(['soundtracks']);
                    playRecord.synced_to_server = true; // Mark as synced
                } else {
                    storeOfflinePlay(playRecord);
                }
            } catch (err) {
                // If any online operation fails (e.g., network error), store for offline sync
                console.warn('Failed to log play event online, storing for offline sync:', err);
                storeOfflinePlay(playRecord);
            }

        } catch (err) {
            const isNetworkError = 
                !navigator.onLine ||
                err?.message?.toLowerCase().includes('network') ||
                err?.message?.toLowerCase().includes('failed to fetch');
            
            if (!isNetworkError) {
                console.error('Error playing track:', err);
                setError(err.message || 'Playback failed');
            }
            setIsPlaying(false);
            setIsLoading(false);
            isLoadingTrackRef.current = false;
        }
    };

    // NEW: Next track function
    const nextTrack = useCallback(() => {
        if (playlist.length === 0) return;
        const nextIndex = (currentIndex + 1) % playlist.length;
        setCurrentIndex(nextIndex);
        playTrack(playlist[nextIndex]);
    }, [playlist, currentIndex, playTrack]);

    // NEW: Previous track function
    const previousTrack = useCallback(() => {
        if (playlist.length === 0) return;
        const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
        playTrack(playlist[prevIndex]);
    }, [playlist, currentIndex, playTrack]);

    // NEW: Set playlist function
    const setPlaylistAndPlay = useCallback((tracks, startIndex = 0) => {
        setPlaylist(tracks);
        setCurrentIndex(startIndex);
        if (tracks[startIndex]) {
            playTrack(tracks[startIndex]);
        }
    }, [playTrack]);

    const seekTo = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const skipForward = (seconds = 10) => {
        if (audioRef.current) {
            const newTime = Math.min(audioRef.current.currentTime + seconds, duration);
            seekTo(newTime);
        }
    };

    const skipBackward = (seconds = 10) => {
        if (audioRef.current) {
            const newTime = Math.max(audioRef.current.currentTime - seconds, 0);
            seekTo(newTime);
        }
    };

    const toggleLoop = () => {
        setLoop(!loop);
    };

    const changeVolume = (newVolume) => {
        setVolume(Math.max(0, Math.min(1, newVolume)));
    };

    const toggleLowPowerMode = () => {
        setLowPowerMode(!lowPowerMode);
    };

    const value = {
        currentTrack,
        isPlaying,
        isLoading,
        error,
        currentTime,
        duration,
        volume,
        loop,
        playlist,
        currentIndex,
        audioRef,
        audioContextRef,
        analyserRef,
        sourceNodeRef,
        // NEW
        lowPowerMode,
        toggleLowPowerMode,
        userDNAProfile, // NEW
        setUserDNAProfile, // NEW
        // NEW: Aliased function names for convenience
        play: playTrack,
        pause: togglePlayPause,
        next: nextTrack,
        previous: previousTrack,
        // Original function names
        playTrack,
        togglePlayPause,
        stopTrack,
        nextTrack,
        previousTrack,
        setPlaylistAndPlay,
        seekTo,
        skipForward,
        skipBackward,
        toggleLoop,
        changeVolume
    };

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};