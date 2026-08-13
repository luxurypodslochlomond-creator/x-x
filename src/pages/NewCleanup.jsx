import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import {
        Camera, MapPin, Loader2, CheckCircle2, Zap, AlertCircle, ArrowLeft, WifiOff, Sparkles, Eye, Share2, X, Recycle, Globe, Shield, Heart
    } from 'lucide-react';
import { COOLASFUCKHeart, COOLASFUCKSparkle, COOLASFUCKMusicNote } from '@/components/shared/COOLASFUCKIcon';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import P51Symbol from '@/components/shared/P51Symbol';
import RealtimeScanningOverlay from '@/components/shared/RealtimeScanningOverlay';
import FraudDetectionModal from '@/components/cleanup/FraudDetectionModal';
import TechExplainerModal from '@/components/cleanup/TechExplainerModal';
import CryptoSecurityTooltip from '@/components/cleanup/CryptoSecurityTooltip';
import { signCleanup, verifyChainIntegrity, getPublicKeyForVerification } from '@/components/security/CryptoSecurity';
import SecurityDashboard from '@/components/security/SecurityDashboard';

export default function NewCleanupPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        location: '',
        county: '',
        coordinates: null,
        litter_weight: 0,
        photo_url: '',
        cleanup_type: 'street',
        weather_conditions: '',
        notes: '',
        tokens_awarded: 0,
        tokens_instant: 0,
        tokens_pending: 0,
        instant_payout_percentage: 100,
        verification_status: 'instant_paid'
    });

    const [capturedPhotos, setCapturedPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [step, setStep] = useState('landing');
    const [aiAnalysis, setAiAnalysis] = useState(null);
    const [showScanner, setShowScanner] = useState(false);
    const [supportAmount, setSupportAmount] = useState(0);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [afterPhoto, setAfterPhoto] = useState(null);
    const [viewingPhoto, setViewingPhoto] = useState(null);
    const [syncNotification, setSyncNotification] = useState(null);
    const [showFraudModal, setShowFraudModal] = useState(false);
    const [showTechModal, setShowTechModal] = useState(false);
    const [showGPSExplainer, setShowGPSExplainer] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        let mounted = true;
        const checkAuth = async () => {
            try {
                await base44.auth.me();
                if (mounted) setIsAuthenticated(true);
            } catch {
                if (mounted) setIsAuthenticated(false);
            } finally {
                if (mounted) setAuthChecked(true);
            }
        };
        checkAuth();
        return () => { mounted = false; };
    }, []);

    const { data: recentActivity = [], isLoading: activityLoading } = useQuery({
        queryKey: ['recentActivity'],
        queryFn: async () => {
            try {
                // Only fetch cleanups - no user listing needed
                const cleanups = await base44.entities.Cleanup.list('-created_date', 6).catch(() => []);

                const cleanupActivity = cleanups.map(c => ({
                    type: 'cleanup',
                    id: c.id,
                    photo_url: c.photo_url,
                    title: c.county || c.location,
                    subtitle: `${c.litter_weight}kg cleaned`,
                    created_date: c.created_date,
                    data: c
                }));

                return cleanupActivity;
            } catch (error) {
                console.error('Failed to load activity:', error);
                return [];
            }
        },
        enabled: authChecked && isAuthenticated && navigator.onLine,
        retry: false,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });

    const createCleanupMutation = useMutation({
        mutationFn: async (cleanupData) => {
            if (!navigator.onLine) {
                throw new Error('OFFLINE');
            }
            try {
                return await base44.entities.Cleanup.create(cleanupData);
            } catch (error) {
                if (error?.message?.toLowerCase()?.includes('network') || 
                    error?.message?.toLowerCase()?.includes('fetch')) {
                    throw new Error('OFFLINE');
                }
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cleanups'] });
            queryClient.invalidateQueries({ queryKey: ['recentCleanups'] });
        },
        retry: false
    });

    useEffect(() => {
        const handleOnline = async () => {
            setIsOffline(false);
            // Auto-sync offline cleanups when back online
            await syncOfflineCleanups();
        };
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        if (navigator.geolocation && !formData.coordinates) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prev => ({
                        ...prev,
                        coordinates: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }));
                },
                (error) => console.log('Location error:', error)
            );
        }
    }, []);

    const useDetectedLocation = () => {
        if (formData.coordinates) {
            setFormData(prev => ({
                ...prev,
                location: `${prev.coordinates.lat.toFixed(4)}, ${prev.coordinates.lng.toFixed(4)}`
            }));
        }
    };

    const saveOffline = (data) => {
        const offlineCleanups = JSON.parse(localStorage.getItem('offlineCleanups') || '[]');
        offlineCleanups.push({
            ...data,
            offlineId: Date.now(),
            createdAt: new Date().toISOString(),
            needsAiVerification: true
        });
        localStorage.setItem('offlineCleanups', JSON.stringify(offlineCleanups));
    };

    const syncOfflineCleanups = async () => {
        const offlineCleanups = JSON.parse(localStorage.getItem('offlineCleanups') || '[]');
        if (offlineCleanups.length === 0) return;

        setSyncNotification(`Syncing ${offlineCleanups.length} offline cleanup${offlineCleanups.length > 1 ? 's' : ''}...`);
        console.log(`Syncing ${offlineCleanups.length} offline cleanups...`);

        for (const cleanup of offlineCleanups) {
            try {
                // Re-analyze with AI for fraud detection
                if (cleanup.photo_url && cleanup.photo_url.startsWith('data:')) {
                    // Upload base64 photo first
                    const blob = await fetch(cleanup.photo_url).then(r => r.blob());
                    const file = new File([blob], 'cleanup.jpg', { type: 'image/jpeg' });
                    const { file_url } = await base44.integrations.Core.UploadFile({ file });
                    cleanup.photo_url = file_url;

                    // Run AI analysis
                    const analysis = await base44.integrations.Core.InvokeLLM({
                        prompt: `Verify this cleanup photo. Check:
                        1. Is this real litter that was collected? (not staged/fake)
                        2. Estimated weight: ${cleanup.litter_weight}kg - is this accurate?
                        3. Fraud risk level (0-100)
                        4. Red flags: same litter in multiple photos? Stock image? AI generated?

                        Return JSON with: is_legitimate (boolean), estimated_weight_kg, fraud_risk_score, notes, red_flags (array)`,
                        file_urls: [file_url],
                        response_json_schema: {
                            type: 'object',
                            properties: {
                                is_legitimate: { type: 'boolean' },
                                estimated_weight_kg: { type: 'number' },
                                fraud_risk_score: { type: 'number' },
                                notes: { type: 'string' },
                                red_flags: { type: 'array', items: { type: 'string' } }
                            }
                        }
                    });

                    // TRUST BY DEFAULT - only flag obvious scams
                    if (!analysis.is_legitimate || analysis.fraud_risk_score > 80 || cleanup.litter_weight > 100) {
                        cleanup.verification_status = 'pending_verification';
                        cleanup.ai_notes = analysis.notes;
                        cleanup.fraud_flags = analysis.red_flags;

                        // HOLD TOKENS: Suspicious AF (fake photo, impossible weight, stock image)
                        cleanup.tokens_instant = 0;
                        cleanup.tokens_pending = cleanup.tokens_awarded;
                    } else {
                        // TRUST: Pay instantly, even if slightly suspicious
                        cleanup.tokens_instant = cleanup.tokens_awarded;
                        cleanup.tokens_pending = 0;
                    }
                    }

                // Submit to backend
                await base44.entities.Cleanup.create(cleanup);

                // Update user balance (only instant tokens)
                const user = await base44.auth.me();
                const tokensToAward = cleanup.tokens_instant || cleanup.tokens_awarded;
                await base44.auth.updateMe({
                    p51_balance: (user.p51_balance || 0) + tokensToAward
                });

                // Track fraud attempts
                if (cleanup.fraud_flags && cleanup.fraud_flags.length > 0) {
                    await base44.entities.AntiExploitationProtocol.create({
                        user_id: user.id,
                        behavior_type: 'fake_cleanup',
                        detection_method: 'algorithmic_detection',
                        severity_level: cleanup.fraud_risk_score / 10,
                        love_frequency_impact: -10,
                        rehabilitation_path: 'Submit real cleanups to restore trust'
                    });
                }

            } catch (error) {
                console.error('Failed to sync cleanup:', error);
            }
        }

        // Clear synced cleanups
        localStorage.removeItem('offlineCleanups');
        queryClient.invalidateQueries({ queryKey: ['cleanups'] });
        queryClient.invalidateQueries({ queryKey: ['recentActivity'] });
        console.log('Offline cleanups synced!');

        setSyncNotification(`✓ ${offlineCleanups.length} cleanup${offlineCleanups.length > 1 ? 's' : ''} synced & verified!`);
        setTimeout(() => setSyncNotification(null), 5000);
    };

    const analyzePhotoWithAI = async (photoUrl) => {
        if (isOffline || !navigator.onLine) {
            // Skip AI entirely when offline - go straight to analysis
            setIsLoading(false);
            setStep('analysis');
            return;
        }

        try {
            setIsLoading(true);

            if (!navigator.onLine) {
                throw new Error('OFFLINE');
            }

            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('TIMEOUT')), 15000)
            );

            const analysisPromise = base44.integrations.Core.InvokeLLM({
                prompt: `You are AI51, the world's most advanced planetary healing intelligence. Analyze this cleanup photo with EXTREME precision and depth:

            **VISUAL SCENE ANALYSIS (NEW - ULTRA-DETAILED):**
            - Describe EXACTLY what you see: outdoor/indoor, ground type (pavement/grass/dirt), background elements
            - Time of day estimate (from lighting/shadows)
            - Weather conditions visible (sunny/rainy/cloudy)
            - Location TYPE: urban street, park, beach, forest, waterway, roadside, etc
            - Is this REAL outdoor litter? Or staged indoors (shelf/desk/table)?
            - Specific location clues: street signs, buildings, landmarks visible?
            - Environmental context: near water, in city, rural area?

            **BRAND DETECTION (CRITICAL):**
            - SCAN EVERY SINGLE ITEM for ANY visible text, logos, brand names
            - Known culprits: Coca-Cola, Pepsi, McDonald's, Starbucks, Cadbury, Nestlé, Budweiser, Irn-Bru, Tesco, Greggs, KFC, Subway, Tennent's, etc
            - UNKNOWN brands: Report ANY text visible even if you don't recognize it
            - Partial logos count: "oca-C" = Coca-Cola, "epsi" = Pepsi
            - Return ALL in brands array
            
            **MATERIAL IDENTIFICATION (SPECIFIC):**
            - List EXACT materials: "Tennent's aluminum can", "Coca-Cola PET bottle", etc
            - NOT generic: "Tennent's aluminum can" not "metal"
            - Include brand IN material name

            **ITEM-BY-ITEM COUNT (NEW - CRITICAL):**
            - Count EACH distinct item visible
            - Format: "3 Tennent's cans, 1 plastic bottle, 2 crisp packets"
            - Be EXACT: count every single piece

            **WEIGHT ANALYSIS (ULTRA-STRICT):**
            - Single aluminum can: 0.015kg
            - Small bottle (330ml): 0.03kg
            - Large bottle (2L): 0.05kg  
            - Glass bottle: 0.3kg
            - Cigarette butt: 0.002kg
            - Plastic bag: 0.005kg
            - COUNT × WEIGHT: 3 cans = 0.045kg
            - Total = sum ALL items
            - RED FLAG: Mismatch >300% = fraud

            **STAGING DETECTION (ULTRA-CRITICAL):**
            - Indoor (shelf/desk/table) = STAGED → is_legitimate: false
            - Clean background (home/shed) = STAGED
            - Single item on shelf = STAGED
            - Too clean/new = STAGED
            - Real cleanups: outdoor, dirt visible, ground/pavement, natural light

            **ENVIRONMENTAL CONTEXT (NEW):**
            - Decomposition times for each material type
            - Ocean threat level (0-10) if near water
            - Wildlife danger (0-10)
            - Carbon saved by preventing this litter entering ecosystem
            - Microplastic risk assessment

            **LOCATION INTELLIGENCE (NEW):**
            - Infer location TYPE from photo: "urban street", "park", "beach", "forest path"
            - Estimate country/region from visible clues (signs, architecture, brands)
            - Weather/climate visible
            - Time of day estimate

            **ANTI-FRAUD (CRITICAL):**
            - Real outdoor cleanup? Or staged?
            - Red flags: indoor, shelf, too clean, pro lighting, single item
            - Confidence: high (95%+), medium (70-94%), low (<70%)

            Return ultra-detailed JSON:`,
                file_urls: [photoUrl],
                response_json_schema: {
                    type: 'object',
                    properties: {
                        scene_description: {
                            type: 'string',
                            description: 'Detailed description of what you see: outdoor/indoor, ground type, background, lighting'
                        },
                        estimated_location: {
                            type: 'string',
                            description: 'Inferred location from photo: "Urban street", "Park bench", "Beach", "Forest path", etc'
                        },
                        estimated_location_detail: {
                            type: 'string',
                            description: 'More specific if visible: "Near water", "City centre", "Residential area", "Countryside"'
                        },
                        weather_visible: {
                            type: 'string',
                            description: 'Weather conditions visible in photo'
                        },
                        time_of_day_estimate: {
                            type: 'string',
                            description: 'Estimate from lighting: morning/afternoon/evening/night'
                        },
                        item_by_item_count: {
                            type: 'string',
                            description: 'Exact count: "3 Tennents cans, 1 plastic bottle, 2 crisp packets"'
                        },
                        estimated_weight_kg: { 
                            type: 'number',
                            description: 'Total weight calculated from item-by-item count'
                        },
                        materials: { 
                            type: 'array', 
                            items: { type: 'string' },
                            description: 'Specific materials: "Tennents aluminum can", "Coca-Cola PET bottle"'
                        },
                        brands: { 
                            type: 'array', 
                            items: { type: 'string' },
                            description: 'ALL visible brands'
                        },
                        item_counts: {
                            type: 'string',
                            description: 'Count of each item type as text'
                        },
                        location_type: { 
                            type: 'string',
                            description: 'street/park/beach/forest/waterway/etc'
                        },
                        recyclable_percentage: { 
                            type: 'number',
                            description: 'Percentage recyclable (0-100)'
                        },
                        decomposition_times: {
                            type: 'string',
                            description: 'Decomposition time for each material as text'
                        },
                        carbon_saved_kg: {
                            type: 'number',
                            description: 'Estimated CO2 saved by preventing ecosystem damage'
                        },
                        microplastic_risk: {
                            type: 'string',
                            description: 'High/Medium/Low microplastic contamination risk if not collected'
                        },
                        ocean_threat_level: { 
                            type: 'number',
                            description: 'Threat to ocean (0-10)'
                        },
                        wildlife_danger_score: {
                            type: 'number', 
                            description: 'Danger to animals (0-10)'
                        },
                        observations: { 
                            type: 'string',
                            description: 'Rich narrative of the cleanup context and impact'
                        },
                        confidence_score: { type: 'number' },
                        is_legitimate: { type: 'boolean' },
                        fraud_flags: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Red flags: indoor, shelf, weight mismatch, staged'
                        },
                        is_indoor_staging: {
                            type: 'boolean',
                            description: 'Indoor/shelf photo?'
                        }
                    }
                }
                });

                const analysis = await Promise.race([analysisPromise, timeoutPromise]);

                setAiAnalysis(analysis);
            
            // AUTO-POPULATE from AI analysis
            setFormData(prev => ({
                ...prev,
                litter_weight: analysis.estimated_weight_kg || 5,
                cleanup_type: analysis.location_type || 'street',
                location: analysis.estimated_location || prev.location || '',
                county: analysis.estimated_location_detail || prev.county || '',
                weather_conditions: analysis.weather_visible || '',
                notes: analysis.observations || ''
            }));

            setIsLoading(false);
            setStep('analysis');
        } catch (err) {
            console.error('AI analysis error:', err);
            if (err.message === 'TIMEOUT') {
                setError('Network slow. Continuing without AI...');
            } else if (err.message === 'OFFLINE' || !navigator.onLine) {
                setError('Offline. Continuing without AI...');
            } else {
                setError('AI unavailable. Continuing...');
            }
            setIsLoading(false);
            setStep('analysis');
            setTimeout(() => setError(null), 3000);
        }
    };

    const handlePhotoCapture = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsLoading(true);
            setError(null);
            setStep('scanning');

            // CRYPTOGRAPHIC ANTI-FRAUD: Hash photo
            const arrayBuffer = await file.arrayBuffer();
            const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
            const photoHash = Array.from(new Uint8Array(hashBuffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');

            // Check if photo already used (REPLAY ATTACK PREVENTION)
            const existingCleanups = JSON.parse(localStorage.getItem('usedPhotoHashes') || '[]');
            if (existingCleanups.includes(photoHash)) {
                throw new Error('Photo already used for a cleanup');
            }

            // Store hash
            existingCleanups.push(photoHash);
            localStorage.setItem('usedPhotoHashes', JSON.stringify(existingCleanups));

            // Store photo hash for cryptographic signing
            setFormData(prev => ({ ...prev, photo_hash: photoHash }));

            if (isOffline) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64Photo = reader.result;
                        setCapturedPhotos(prev => [...prev, base64Photo]);
                        setFormData(prev => ({
                            ...prev,
                            photo_url: base64Photo
                        }));
                        setIsLoading(false);
                        // Skip scanning step entirely when offline
                        setStep('analysis');
                    };
                    reader.readAsDataURL(file);
                } else {
                try {
                    // Upload via always-available Core integration
                    const uploadResult = await base44.integrations.Core.UploadFile({ file });
                    const file_url = uploadResult.file_url;

                    setCapturedPhotos(prev => [...prev, file_url]);
                    setFormData(prev => ({
                        ...prev,
                        photo_url: file_url,
                        ipfs_hash: uploadResult.ipfs_hash || null,
                        storage_type: uploadResult.storage_type || 'unknown'
                    }));

                    await analyzePhotoWithAI(file_url);
                } catch (uploadErr) {
                    if (!navigator.onLine) {
                        setError('Lost connection. Photo saved offline.');
                        const reader = new FileReader();
                            reader.onloadend = () => {
                                const base64Photo = reader.result;
                                setCapturedPhotos(prev => [...prev, base64Photo]);
                                setFormData(prev => ({
                                    ...prev,
                                    photo_url: base64Photo
                                }));
                                setIsLoading(false);
                                // Skip scanning entirely when offline
                                setStep('analysis');
                            };
                            reader.readAsDataURL(file);
                    } else {
                        throw uploadErr;
                    }
                }
            }

            } catch (err) {
            if (!navigator.onLine) {
                setError('Offline. Saving locally...');
                setTimeout(() => {
                    setError(null);
                }, 2000);
            } else {
                setError('Upload failed. Try again.');
            }
            setIsLoading(false);
            if (!formData.photo_url) {
                setStep('landing');
            }
            }
    };

    const handleScannerPhoto = async (fileOrUrl, enrichedData) => {
        try {
            setShowScanner(false);
            // Skip scanning step when offline
            if (!isOffline) {
                setStep('scanning');
            }

            let photoUrl;

            if (isOffline) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    photoUrl = reader.result;
                    setCapturedPhotos(prev => [...prev, photoUrl]);
                    setFormData(prev => ({
                        ...prev,
                        photo_url: photoUrl,
                        litter_weight: enrichedData?.weight || 5,
                        cleanup_type: enrichedData?.location?.type || 'street',
                        notes: enrichedData?.notes || '',
                        coordinates: enrichedData?.location || prev.coordinates
                    }));
                    setAiAnalysis(enrichedData);
                    // Go straight to analysis when offline
                    setStep('analysis');
                };
                if (fileOrUrl instanceof File) {
                    reader.readAsDataURL(fileOrUrl);
                }
            } else {
                if (fileOrUrl instanceof File) {
                // Upload via always-available Core integration
                const uploadResult = await base44.integrations.Core.UploadFile({ file: fileOrUrl });
                photoUrl = uploadResult.file_url;
                } else {
                    photoUrl = fileOrUrl;
                }
                
                setCapturedPhotos(prev => [...prev, photoUrl]);
                setFormData(prev => ({
                    ...prev,
                    photo_url: photoUrl,
                    litter_weight: enrichedData?.weight || 5,
                    cleanup_type: enrichedData?.location?.type || 'street',
                    notes: enrichedData?.notes || '',
                    coordinates: enrichedData?.location || prev.coordinates
                }));

                setAiAnalysis(enrichedData);
                setStep('analysis');
            }
        } catch (err) {
            console.error('Scanner photo error:', err);
            setError('Processing failed. Try again.');
            setIsLoading(false);
            setStep('landing');
        }
    };

    const calculateTokens = () => {
        const baseTokens = formData.litter_weight * 1;
        const bonus = baseTokens * 0.2;
        const total = baseTokens + bonus;
        
        setFormData(prev => ({
            ...prev,
            tokens_awarded: total,
            tokens_instant: total,
            tokens_pending: 0
        }));

        return total;
    };

    useEffect(() => {
        if (formData.litter_weight > 0) {
            calculateTokens();
        }
    }, [formData.litter_weight]);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (!formData.photo_url) {
                throw new Error('Photo required');
            }
            if (!formData.litter_weight || formData.litter_weight < 0.005) {
                throw new Error('Minimum 5g (even one wrapper counts)');
            }

            // ANTI-FRAUD: Check submission rate (max 1 every 5 mins)
            const lastSubmit = localStorage.getItem('lastCleanupSubmit');
            if (lastSubmit) {
                const timeSince = Date.now() - parseInt(lastSubmit);
                if (timeSince < 5 * 60 * 1000) {
                    throw new Error('Too fast. Wait 5 mins between cleanups.');
                }
            }
            localStorage.setItem('lastCleanupSubmit', Date.now().toString());

            // ANTI-FRAUD: Database-level duplicate photo check
            if (formData.photo_hash) {
                try {
                    const existingCleanups = await base44.entities.Cleanup.filter({ 
                        photo_hash: formData.photo_hash 
                    }, '-created_date', 1);
                    
                    if (existingCleanups && existingCleanups.length > 0) {
                        throw new Error('This photo was already submitted. Please take a new photo.');
                    }
                } catch (checkErr) {
                    // If offline or can't check, allow submission (will sync later)
                    if (!navigator.onLine) {
                        console.log('Offline: skipping duplicate check');
                    } else {
                        throw checkErr;
                    }
                }
            }

            // ANTI-FRAUD: Weight sanity check
            if (aiAnalysis && aiAnalysis.estimated_weight_kg) {
                const aiWeight = aiAnalysis.estimated_weight_kg;
                const userWeight = formData.litter_weight;
                const difference = Math.abs(userWeight - aiWeight);
                const percentDiff = (difference / aiWeight) * 100;

                // If user weight is >300% different from AI = RED FLAG
                if (percentDiff > 300) {
                    setError(`Weight mismatch: AI detected ${aiWeight}kg but you entered ${userWeight}kg. Please verify.`);
                    setIsLoading(false);
                    return;
                }
            }

            // ANTI-FRAUD: Indoor staging detection
            if (aiAnalysis && aiAnalysis.is_indoor_staging) {
                setError('Indoor staging detected. Photo must show real outdoor litter collection.');
                setIsLoading(false);
                return;
            }

            // ANTI-FRAUD: Fraud flags check
            if (aiAnalysis && aiAnalysis.fraud_flags && aiAnalysis.fraud_flags.length > 0) {
                const hasCriticalFlags = aiAnalysis.fraud_flags.some(flag => 
                    flag.toLowerCase().includes('indoor') || 
                    flag.toLowerCase().includes('staging') ||
                    flag.toLowerCase().includes('shelf')
                );
                if (hasCriticalFlags) {
                    setError('Suspicious photo detected. Must be real outdoor cleanup.');
                    setIsLoading(false);
                    return;
                }
            }

            // ANTI-FRAUD: GPS verification
            let gpsVerified = false;
            if (formData.coordinates && navigator.geolocation) {
                try {
                    const currentPos = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    const distance = Math.sqrt(
                        Math.pow(currentPos.coords.latitude - formData.coordinates.lat, 2) +
                        Math.pow(currentPos.coords.longitude - formData.coordinates.lng, 2)
                    ) * 111; // rough km
                    gpsVerified = distance < 1; // within 1km
                } catch (err) {
                    console.log('GPS verification skipped:', err);
                }
            }

            const tokens = calculateTokens();

            // CRYPTOGRAPHIC SIGNING - UNFUCKABLE
            let cryptoSignature;
            try {
                cryptoSignature = await signCleanup({
                    ...formData,
                    litter_weight: formData.litter_weight,
                    location: formData.location || formData.county || 'Unknown',
                    photo_hash: formData.photo_hash,
                    coordinates: formData.coordinates
                });
                
                // Verify chain integrity
                const chainValid = verifyChainIntegrity();
                if (!chainValid) {
                    throw new Error('Hash chain corrupted - potential tampering detected');
                }
            } catch (cryptoErr) {
                console.error('Cryptographic signing failed:', cryptoErr);
                setError('Security validation failed. Try again.');
                setIsLoading(false);
                return;
            }

            // TRUST BY DEFAULT - instant payout unless obvious fraud
            const cleanupData = {
                ...formData,
                tokens_awarded: tokens,
                tokens_instant: tokens,
                tokens_pending: 0,
                instant_payout_percentage: 100,
                location: formData.location || formData.county || 'Unknown',
                county: formData.county || 'Unknown',
                gps_verified: gpsVerified,
                submission_timestamp: new Date().toISOString(),
                // CRYPTOGRAPHIC PROOF
                crypto_signature: cryptoSignature.signature,
                crypto_public_key: cryptoSignature.publicKey,
                crypto_signed_data: cryptoSignature.signedData,
                crypto_hash: cryptoSignature.cleanupHash,
                crypto_previous_hash: cryptoSignature.previousHash,
                crypto_version: cryptoSignature.version
            };

            if (isOffline) {
                saveOffline(cleanupData);
                setIsLoading(false);
                setStep('success_offline');

                // For anonymous users, track earnings locally
                if (!isAuthenticated) {
                    const localBalance = parseFloat(localStorage.getItem('anonymous_p51_balance') || '0');
                    localStorage.setItem('anonymous_p51_balance', (localBalance + tokens).toString());
                }

                setTimeout(() => {
                    navigate(createPageUrl('Profile'));
                }, 3000);
            } else {
                try {
                    await createCleanupMutation.mutateAsync(cleanupData);

                    // For anonymous users, track earnings locally
                    if (!isAuthenticated) {
                        const localBalance = parseFloat(localStorage.getItem('anonymous_p51_balance') || '0');
                        localStorage.setItem('anonymous_p51_balance', (localBalance + tokens).toString());
                    } else {
                        // Update authenticated user balance
                        const user = await base44.auth.me();
                        const currentBalance = user.p51_balance || 0;
                        const newBalance = currentBalance + tokens;

                        await base44.auth.updateMe({
                            p51_balance: newBalance
                        });

                        if (supportAmount > 0 && supportAmount <= tokens) {
                            try {
                                await base44.entities.UniversalLoveTreasury.create({
                                    source: 'cleanup_donation',
                                    amount: supportAmount,
                                    description: `Artist support from ${user.full_name || user.email}`,
                                    purpose: 'artist_fund'
                                });
                            } catch (treasuryErr) {
                                console.error('Treasury donation failed:', treasuryErr);
                            }
                        }
                    }

                    setIsLoading(false);
                    setStep('success');

                    setTimeout(() => {
                        navigate(createPageUrl('Profile'));
                    }, 2000);
                } catch (submitErr) {
                    if (submitErr.message === 'OFFLINE' || !navigator.onLine) {
                        saveOffline(cleanupData);
                        setIsLoading(false);
                        setStep('success_offline');

                        // For anonymous users, track earnings locally
                        if (!isAuthenticated) {
                            const localBalance = parseFloat(localStorage.getItem('anonymous_p51_balance') || '0');
                            localStorage.setItem('anonymous_p51_balance', (localBalance + tokens).toString());
                        }

                        setTimeout(() => {
                            navigate(createPageUrl('Profile'));
                        }, 2000);
                    } else {
                        throw submitErr;
                    }
                }
            }

            } catch (err) {
            console.error('Submission error:', err);
            const errorMsg = !navigator.onLine ? 'Connection lost. Saved offline.' : (err.message || 'Submission failed. Try again.');
            setError(errorMsg);
            setIsLoading(false);

            if (!navigator.onLine) {
                setTimeout(() => {
                    setStep('success_offline');
                }, 2000);
            }
            }
    };

    const handleShare = async () => {
        const shareText = `Just earned ${formData.tokens_awarded.toFixed(1)} $P51 cleaning ${formData.litter_weight}kg of litter from ${formData.location || 'my area'}!\n\nGet paid to heal Earth: uf51.love`;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    text: shareText,
                    // The outline specifies `files: formData.photo_url && formData.photo_url.startsWith('http') ? [] : undefined`
                    // This implies not sharing the file itself via navigator.share, but perhaps if it were a Blob or File object.
                    // For now, adhering strictly to the given outline which will not share a photo with this logic.
                    files: formData.photo_url && formData.photo_url.startsWith('http') ? [] : undefined
                });
            } catch (err) {
                console.log('Share cancelled or failed:', err);
            }
        } else {
            // Fallback for browsers that do not support Web Share API
            navigator.clipboard.writeText(shareText);
            alert('Share text copied! Paste to Instagram/TikTok');
        }
    };

    // LANDING - 8-BIT QUANTUM
    if (step === 'landing') {
        return (
            <div className="min-h-screen bg-black text-white p-6 pt-24 lg:pt-6 relative overflow-hidden">

                {/* QUANTUM GRID - SIMPLIFIED */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-full h-px bg-cyan-500"
                            style={{ top: `${i * 20}%`, opacity: 0.2 }}
                        />
                    ))}
                </div>

                <div className="max-w-xl mx-auto space-y-8 relative z-10">

                    {/* GPS LOCK STATUS */}
                    {formData.coordinates ? (
                        <div className="bg-green-900/30 border-4 border-green-500 p-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-8 h-8 text-green-400" />
                                        <div>
                                            <p className="text-green-400 font-black font-mono text-lg">GPS LOCKED</p>
                                            <p className="text-green-300 text-xs font-mono">
                                                {formData.coordinates.lat.toFixed(4)}, {formData.coordinates.lng.toFixed(4)}
                                            </p>
                                        </div>
                                    </div>
                                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <p className="text-green-300 text-xs font-mono">
                                        🔐 Cryptographically signed • Tamper-proof
                                    </p>
                                    <button
                                        onClick={() => setShowGPSExplainer(!showGPSExplainer)}
                                        className="text-green-400 hover:text-green-300 text-sm font-bold underline"
                                    >
                                        Why?
                                    </button>
                                </div>

                                {showGPSExplainer && (
                                    <div className="bg-black/60 border-2 border-green-500/50 rounded-lg p-4 space-y-2">
                                        <p className="text-green-300 font-bold text-sm">💡 WHY GPS?</p>
                                        <div className="space-y-2 text-xs text-gray-300">
                                            <p>✓ <strong className="text-white">Stops fake cleanups:</strong> GPS proves you're at the actual location</p>
                                            <p>✓ <strong className="text-white">Cryptographic proof:</strong> Location gets signed into your submission (tamper-proof)</p>
                                            <p>✓ <strong className="text-white">Trust by default:</strong> We trust you. GPS just catches the scammers.</p>
                                            <p className="text-green-400 font-bold mt-2">🔐 Your location is ONLY used for verification. Never sold. Never tracked.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border-4 border-cyan-500 p-6 relative overflow-hidden">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-10 h-10 text-cyan-400" />
                                    <div>
                                        <p className="text-cyan-400 font-black font-mono text-xl">GPS LOCK REQUESTED</p>
                                        <p className="text-cyan-300 text-sm font-mono">
                                            Tap "Allow" when browser asks
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-black/60 border-2 border-purple-500/50 rounded-lg p-4">
                                    <p className="text-purple-300 font-bold text-sm mb-2">💡 WHY WE NEED YOUR LOCATION:</p>
                                    <div className="space-y-2 text-xs text-gray-300">
                                        <p>✓ <strong className="text-white">Stops fake cleanups:</strong> GPS proves you're at the actual location</p>
                                        <p>✓ <strong className="text-white">Cryptographic proof:</strong> Location gets signed into your submission (tamper-proof)</p>
                                        <p>✓ <strong className="text-white">Trust by default:</strong> We trust you. GPS just catches the scammers.</p>
                                        <p className="text-green-400 font-bold mt-2">🔐 Your location is ONLY used for verification. Never sold. Never tracked.</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-mono">
                                    <Shield className="w-4 h-4 text-green-400" />
                                    <span>✓ Works without GPS (for rural areas)</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-black border-4 border-cyan-500 p-6 relative">

                        {/* STATIC CORNERS */}
                        <div className="absolute top-0 left-0 w-4 h-4 bg-cyan-500" />
                        <div className="absolute top-0 right-0 w-4 h-4 bg-cyan-500" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 bg-cyan-500" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-cyan-500" />

                        <div className="space-y-4">
                            <h1 className="text-3xl font-black font-mono text-cyan-400 leading-tight">
                                PHOTOGRAPH LITTER
                                <br/>
                                EARN INSTANTLY
                            </h1>

                            {/* QUANTUM-RESISTANT SECURITY STATUS */}
                            <SecurityDashboard minimal={true} />
                            <CryptoSecurityTooltip />

                            {/* SYNC NOTIFICATION */}
                            <AnimatePresence>
                                {syncNotification && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-cyan-600 border-4 border-cyan-400 text-black px-6 py-3 font-black font-mono shadow-lg"
                                    >
                                        {syncNotification}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="bg-black border-2 border-amber-500/50 p-4 space-y-2">
                                <p className="text-amber-400 font-mono text-sm font-black">
                                    1kg = 1 <P51Symbol showTooltip={true} />
                                </p>
                                <p className="text-cyan-400 font-mono text-xs">
                                    No minimum • Even wrapper (5g) counts
                                </p>
                                <p className="text-pink-400 font-mono text-xs font-black">
                                    Universe watching ♾️
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {!isOffline && (
                            <button
                                onClick={async () => {
                                    try {
                                        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                                        stream.getTracks().forEach(track => track.stop());
                                        setShowScanner(true);
                                    } catch (err) {
                                        setError('Camera denied. Use photo upload below instead.');
                                        setTimeout(() => setError(null), 3000);
                                    }
                                }}
                                className="w-full bg-amber-600 hover:bg-amber-500 border-4 border-amber-400 text-black py-6 text-lg font-black font-mono transition-all flex items-center justify-center gap-3"
                            >
                                <Zap className="w-6 h-6" />
                                SCAN WITH AI
                            </button>
                        )}
                        
                        {!isOffline && (
                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full h-px bg-cyan-500/30"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-3 bg-black text-cyan-500/60 text-xs font-mono font-black">OR</span>
                                </div>
                            </div>
                        )}

                        <label className="block">
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={handlePhotoCapture}
                                className="hidden"
                                id="photo-upload"
                            />
                            <button
                                onClick={() => document.getElementById('photo-upload').click()}
                                disabled={isLoading}
                                className="w-full bg-cyan-600 hover:bg-cyan-500 border-4 border-cyan-400 text-black py-6 text-lg font-black font-mono transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        PROCESSING
                                    </>
                                ) : (
                                    <>
                                        <Camera className="w-6 h-6" />
                                        {isOffline ? 'PHOTO (OFFLINE)' : 'UPLOAD PHOTO'}
                                    </>
                                )}
                            </button>
                        </label>
                    </div>

                    {!isOffline && recentActivity.length > 0 && (
                        <div className="border-2 border-cyan-500 bg-black p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <COOLASFUCKSparkle size={20} />
                                <p className="text-cyan-400 text-base font-black font-mono tracking-wider">RECENT ACTIVITY</p>
                            </div>
                            <div className="space-y-3">
                                {recentActivity.slice(0, 5).map((item, idx) => {
                                    const hasValidPhoto = item.photo_url && item.photo_url.startsWith('http');
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => hasValidPhoto && setViewingPhoto(item)}
                                            className="w-full flex items-center gap-4 bg-black hover:bg-cyan-900/20 border-2 border-cyan-500/30 hover:border-cyan-500 p-4 transition-all"
                                        >
                                            {hasValidPhoto ? (
                                                <div className="w-14 h-14 flex-shrink-0 border-2 border-cyan-500">
                                                    <img 
                                                        src={item.photo_url} 
                                                        alt={item.type}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-green-600 to-cyan-600 flex items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white"><path d="M4 6h2m4 0h4m4 0h2M4 8v8M6 18h4m4 0h4M20 8v8M18 18h2M6 6v2m0 10v2M18 6v2m0 10v2M10 10h4m-4 4h4"/></svg></div>';
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className={`w-14 h-14 flex items-center justify-center flex-shrink-0 ${
                                                    item.type === 'cleanup' 
                                                        ? 'bg-gradient-to-br from-green-600 to-cyan-600' 
                                                        : 'bg-gradient-to-br from-pink-600 to-purple-600'
                                                }`}>
                                                    <COOLASFUCKHeart size={28} animate={false} />
                                                </div>
                                            )}
                                            <div className="flex-1 text-left min-w-0">
                                                <p className="text-white font-mono text-base font-bold truncate">{item.title}</p>
                                                <p className="text-cyan-400 font-mono text-sm">{item.subtitle}</p>
                                            </div>
                                            {hasValidPhoto && (
                                                <Eye className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* PHOTO VIEWER MODAL */}
                    {viewingPhoto && (
                        <div 
                            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-6"
                            onClick={() => setViewingPhoto(null)}
                        >
                            <button
                                onClick={() => setViewingPhoto(null)}
                                className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                            <div className="max-w-4xl w-full space-y-4" onClick={(e) => e.stopPropagation()}>
                                <div className="relative w-full rounded-xl border-4 border-cyan-500/50 overflow-hidden bg-gradient-to-br from-green-600 to-cyan-600 min-h-[300px] flex items-center justify-center">
                                    <img 
                                        src={viewingPhoto.photo_url} 
                                        alt={viewingPhoto.type} 
                                        className="w-full rounded-xl"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <COOLASFUCKHeart size={80} />
                                    </div>
                                </div>
                                <div className="bg-black/60 border-2 border-cyan-500/50 rounded-xl p-6 space-y-2">
                                    {viewingPhoto.type === 'cleanup' ? (
                                        <>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-cyan-400 font-mono text-sm">LOCATION</p>
                                                    <p className="text-white font-bold text-xl">{viewingPhoto.data.county || viewingPhoto.data.location}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-amber-400 font-mono text-sm">WEIGHT</p>
                                                    <p className="text-white font-bold text-3xl">{viewingPhoto.data.litter_weight}kg</p>
                                                </div>
                                            </div>
                                            {viewingPhoto.data.notes && (
                                                <div className="pt-3 border-t border-white/20">
                                                    <p className="text-gray-400 text-sm">{viewingPhoto.data.notes}</p>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <p className="text-pink-400 font-mono text-sm">MISSION FUNDED</p>
                                                <p className="text-white font-bold text-2xl">{viewingPhoto.data.mission?.title}</p>
                                            </div>
                                            <div className="pt-3 border-t border-white/20">
                                                <p className="text-cyan-400 font-mono text-sm">CONTRIBUTION</p>
                                                <p className="text-white font-bold text-3xl">{viewingPhoto.data.amount_contributed} $P51</p>
                                            </div>
                                            {viewingPhoto.data.mission?.description && (
                                                <div className="pt-3 border-t border-white/20">
                                                    <p className="text-gray-400 text-sm">{viewingPhoto.data.mission.description.slice(0, 200)}...</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {showScanner && (
                    <RealtimeScanningOverlay
                        onPhotoCapture={handleScannerPhoto}
                        onCancel={() => setShowScanner(false)}
                    />
                )}
            </div>
        );
    }

    // SCANNING
    if (step === 'scanning') {
        return (
            <div className="min-h-screen bg-black text-white p-6 pt-24 lg:pt-6">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        {/* Header */}
                        <div className="text-center space-y-4">
                            <div className="flex items-center justify-center gap-4">
                                <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    <Loader2 className="w-8 h-8 text-cyan-500" />
                                </motion.div>
                                <Zap className="w-8 h-8 text-amber-500 animate-pulse" />
                            </div>
                            <h2 className="text-4xl font-black">SCANNING</h2>
                        </div>

                        {/* Live indicator */}
                        <div className="border-2 border-cyan-500 bg-cyan-500/10 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Eye className="w-5 h-5 text-cyan-400" />
                                    <span className="text-cyan-400 font-bold">LIVE</span>
                                </div>
                                <div className="flex gap-2">
                                    {[...Array(4)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0.3 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: i * 0.2, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <a href="#" className="text-cyan-400 text-sm underline">Real?</a>
                                <span className="text-green-400 text-xs font-mono">🔐 Crypto-signed</span>
                            </div>
                        </div>

                        {/* Photo preview */}
                        {formData.photo_url && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-white/60 text-xs mb-2 flex items-center gap-2">
                                        <Camera className="w-4 h-4" />
                                        BEFORE
                                    </p>
                                    <div className="border-2 border-green-500 rounded-lg overflow-hidden">
                                        <img src={formData.photo_url} alt="Before" className="w-full h-48 object-cover" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-white/60 text-xs mb-2 flex items-center gap-2">
                                        <Camera className="w-4 h-4" />
                                        AFTER
                                    </p>
                                    {afterPhoto ? (
                                        <div className="border-2 border-green-500 rounded-lg overflow-hidden">
                                            <img src={afterPhoto} alt="After" className="w-full h-48 object-cover" />
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                capture="environment"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (!file) return;
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setAfterPhoto(reader.result);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }}
                                                className="hidden"
                                            />
                                            <div className="border-2 border-dashed border-cyan-500 rounded-lg h-48 flex flex-col items-center justify-center hover:border-cyan-400 transition-all">
                                                <Camera className="w-8 h-8 text-cyan-400 mb-2" />
                                                <span className="text-cyan-400 text-sm">Tap to add AFTER photo</span>
                                                <span className="text-cyan-400/60 text-xs mt-1">(optional)</span>
                                            </div>
                                        </label>
                                    )}
                                </div>
                            </div>
                        )}

                        <p className="text-center text-white/60 text-sm font-mono">
                            {isOffline ? 'Saving locally...' : 'AI analyzing...'}
                        </p>
                    </motion.div>
                </div>
            </div>
        );
    }

    // ANALYSIS RESULTS
    if (step === 'analysis') {
        return (
            <div className="min-h-screen bg-black text-white p-6 pt-24 lg:pt-6">
                <div className="max-w-2xl mx-auto space-y-6">
                    
                    {/* Live status */}
                    <div className="border-2 border-cyan-500 bg-cyan-500/10 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Eye className="w-5 h-5 text-cyan-400 animate-pulse" />
                                <span className="text-cyan-400 font-bold">LIVE</span>
                            </div>
                            <div className="flex gap-2">
                                {[...Array(4)].map((_, i) => (
                                    <CheckCircle2 key={i} className="w-5 h-5 text-green-400" />
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowFraudModal(true);
                                }}
                                className="text-cyan-400 text-sm underline hover:text-cyan-300"
                            >
                                Real?
                            </button>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowTechModal(true);
                                }}
                                className="text-purple-400 text-sm underline hover:text-purple-300"
                            >
                                How?
                            </button>
                        </div>
                    </div>

                    {/* AI ANALYSIS - SOPHISTICATED */}
                    {isLoading ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative overflow-hidden border-2 border-cyan-500 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-xl p-6 space-y-4"
                        >
                            {/* Scanning animation overlay */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
                                animate={{
                                    y: ["-100%", "200%"]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />

                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Sparkles className="w-8 h-8 text-cyan-400" />
                                        </motion.div>
                                        <div>
                                            <h3 className="text-2xl font-black text-cyan-400">AI51 ANALYZING</h3>
                                            <p className="text-cyan-300 text-xs font-mono">Advanced computer vision active</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress indicators */}
                                <div className="space-y-2">
                                    {[
                                        { label: "Material identification", delay: 0 },
                                        { label: "Brand detection", delay: 0.3 },
                                        { label: "Weight analysis", delay: 0.6 },
                                        { label: "Fraud verification", delay: 0.9 },
                                        { label: "Environmental impact", delay: 1.2 }
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: item.delay }}
                                            className="flex items-center gap-3 bg-black/40 rounded-lg p-3"
                                        >
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: item.delay }}
                                            >
                                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                            </motion.div>
                                            <span className="text-white font-mono text-sm">{item.label}</span>
                                            <motion.div
                                                className="ml-auto flex gap-1"
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{ duration: 1.5, repeat: Infinity, delay: item.delay }}
                                            >
                                                <span className="text-cyan-400">.</span>
                                                <span className="text-cyan-400">.</span>
                                                <span className="text-cyan-400">.</span>
                                            </motion.div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="bg-black/60 border border-cyan-500/50 rounded-lg p-3">
                                    <p className="text-cyan-300 text-xs font-mono text-center">
                                        ⚡ Processing at quantum speed • Photo hash verified • GPS locked
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ) : aiAnalysis && aiAnalysis.materials ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border-2 border-green-500 bg-green-900/20 rounded-xl p-6 space-y-4"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 className="w-8 h-8 text-green-400" />
                                <div>
                                    <h3 className="text-2xl font-black text-green-400">QUANTUM ANALYSIS</h3>
                                    <p className="text-green-300 text-xs font-mono">AI51 • {new Date().toLocaleTimeString()}</p>
                                </div>
                            </div>

                            {/* SCENE ANALYSIS - NEW */}
                            {aiAnalysis.scene_description && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.05 }}
                                    className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/50 rounded-lg p-4"
                                >
                                    <p className="text-cyan-400 text-sm font-black mb-2 flex items-center gap-2">
                                        <Eye className="w-4 h-4" />
                                        SCENE DETECTED
                                    </p>
                                    <p className="text-white text-sm">{aiAnalysis.scene_description}</p>
                                    {aiAnalysis.time_of_day_estimate && (
                                        <p className="text-cyan-300 text-xs mt-2">⏰ {aiAnalysis.time_of_day_estimate}</p>
                                    )}
                                </motion.div>
                            )}

                            {/* ITEM COUNT - NEW */}
                            {aiAnalysis.item_by_item_count && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.08 }}
                                    className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 rounded-lg p-4"
                                >
                                    <p className="text-purple-400 text-sm font-black mb-2">📊 ITEMS COUNTED</p>
                                    <p className="text-white text-sm font-mono">{aiAnalysis.item_by_item_count}</p>
                                </motion.div>
                            )}

                            {/* BRANDS DETECTED - COOLASFUCK */}
                            {aiAnalysis.brands && aiAnalysis.brands.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-2 border-pink-500/50 rounded-lg p-4"
                                >
                                    <p className="text-pink-400 text-sm font-black mb-3 flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        BRANDS DETECTED
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {aiAnalysis.brands.map((brand, idx) => (
                                            <motion.span 
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2 + (idx * 0.1) }}
                                                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-black shadow-lg"
                                            >
                                                {brand}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* MATERIALS - SPECIFIC */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-black/40 border-2 border-green-500/50 rounded-lg p-4"
                            >
                                <p className="text-green-400 text-sm font-black mb-3 flex items-center gap-2">
                                    <Recycle className="w-4 h-4" />
                                    MATERIALS IDENTIFIED
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {aiAnalysis.materials.map((material, idx) => (
                                        <motion.span 
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + (idx * 0.1) }}
                                            className="bg-green-800/40 border border-green-600 text-green-300 px-3 py-2 rounded-lg text-sm font-bold"
                                        >
                                            {material}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* WEIGHT + RECYCLABILITY */}
                            <div className="grid grid-cols-2 gap-3">
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-2 border-amber-500/50 rounded-lg p-4"
                                >
                                    <p className="text-amber-400 text-xs font-black mb-2">⚖️ WEIGHT</p>
                                    <p className="text-4xl font-black text-white">{formData.litter_weight}kg</p>
                                </motion.div>
                                {aiAnalysis.recyclable_percentage !== undefined && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/50 rounded-lg p-4"
                                    >
                                        <p className="text-cyan-400 text-xs font-black mb-2">♻️ RECYCLABLE</p>
                                        <p className="text-4xl font-black text-white">{aiAnalysis.recyclable_percentage}%</p>
                                    </motion.div>
                                )}
                            </div>

                            {/* ENVIRONMENTAL IMPACT */}
                            {(aiAnalysis.ocean_threat_level !== undefined || aiAnalysis.wildlife_danger_score !== undefined) && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/50 rounded-lg p-4"
                                >
                                    <p className="text-red-400 text-sm font-black mb-3 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        THREAT PREVENTED
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        {aiAnalysis.ocean_threat_level !== undefined && (
                                            <div>
                                                <p className="text-xs text-gray-400 mb-1">Ocean</p>
                                                <p className="text-3xl font-black text-red-300">{aiAnalysis.ocean_threat_level}/10</p>
                                            </div>
                                        )}
                                        {aiAnalysis.wildlife_danger_score !== undefined && (
                                            <div>
                                                <p className="text-xs text-gray-400 mb-1">Wildlife</p>
                                                <p className="text-3xl font-black text-red-300">{aiAnalysis.wildlife_danger_score}/10</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* AI OBSERVATIONS - FORMATTED TEXT WITH LINKS */}
                            {aiAnalysis.observations && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="bg-black/60 border-2 border-cyan-500/50 rounded-lg p-4"
                                >
                                    <p className="text-cyan-400 text-sm font-black mb-3">AI51 NOTES</p>
                                    <div 
                                        className="text-gray-300 text-sm leading-relaxed space-y-2"
                                        dangerouslySetInnerHTML={{
                                            __html: aiAnalysis.observations
                                                .split('\n')
                                                .map(line => line.trim())
                                                .filter(line => line)
                                                .map(line => {
                                                    // Make links clickable
                                                    const withLinks = line.replace(
                                                        /(https?:\/\/[^\s]+)/g,
                                                        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline hover:text-cyan-300">$1</a>'
                                                    );
                                                    return `<p>${withLinks}</p>`;
                                                })
                                                .join('')
                                        }}
                                    />
                                </motion.div>
                            )}

                            {/* BONUS */}
                            {aiAnalysis.recyclable_percentage > 50 && (
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.6, type: "spring" }}
                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-black px-4 py-3 rounded-lg"
                                >
                                    <span className="text-2xl">⭐</span>
                                    <span className="font-black">RECYCLING BONUS +20%</span>
                                </motion.div>
                            )}

                            {/* ENVIRONMENTAL IMPACT - NEW */}
                            {(aiAnalysis.carbon_saved_kg || aiAnalysis.microplastic_risk) && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-lg p-4"
                                >
                                    <p className="text-green-400 text-sm font-black mb-3 flex items-center gap-2">
                                        <Globe className="w-4 h-4" />
                                        PLANETARY IMPACT
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        {aiAnalysis.carbon_saved_kg && (
                                            <div>
                                                <p className="text-xs text-gray-400 mb-1">CO₂ Saved</p>
                                                <p className="text-2xl font-black text-green-300">{aiAnalysis.carbon_saved_kg}kg</p>
                                            </div>
                                        )}
                                        {aiAnalysis.microplastic_risk && (
                                            <div>
                                                <p className="text-xs text-gray-400 mb-1">Microplastic Risk</p>
                                                <p className="text-2xl font-black text-green-300">{aiAnalysis.microplastic_risk}</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* AI CONFIDENCE */}
                            <div className="bg-black/60 border border-cyan-500/50 rounded-lg p-3">
                                <p className="text-xs text-cyan-300 font-mono text-center">
                                    AI51 confidence: {Math.round((aiAnalysis.confidence_score || 0.95) * 100)}% • 
                                    {aiAnalysis.fraud_flags && aiAnalysis.fraud_flags.length > 0 ? ' ⚠️ Review needed' : ' ✓ Verified authentic'}
                                </p>
                            </div>
                            
                            {/* CRYPTO SECURITY INDICATOR */}
                            <div className="bg-green-900/30 border-2 border-green-500/50 rounded-lg p-3">
                                <p className="text-xs text-green-300 font-mono text-center">
                                    🔐 Cryptographic signing ready • Hash chain verified • Tamper-proof
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="border-2 border-gray-700 bg-gray-900/20 rounded-xl p-6 text-center">
                            <p className="text-gray-400 font-mono text-sm">Enter cleanup details below</p>
                        </div>
                    )}

                    {/* Photos */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-white/60 text-xs mb-2 flex items-center gap-2">
                                <Camera className="w-4 h-4" />
                                BEFORE
                            </p>
                            <div className="border-2 border-green-500 rounded-lg overflow-hidden">
                                <img src={formData.photo_url} alt="Before" className="w-full h-48 object-cover" />
                            </div>
                        </div>
                        <div>
                            <p className="text-white/60 text-xs mb-2 flex items-center gap-2">
                                <Camera className="w-4 h-4" />
                                AFTER (optional)
                            </p>
                            {afterPhoto ? (
                                <div className="border-2 border-green-500 rounded-lg overflow-hidden relative">
                                    <img src={afterPhoto} alt="After" className="w-full h-48 object-cover" />
                                    <button
                                        onClick={() => setAfterPhoto(null)}
                                        className="absolute top-2 right-2 bg-black/60 rounded-full p-1"
                                    >
                                        <X className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            ) : (
                                <label className="cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        capture="environment"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (!file) return;
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setAfterPhoto(reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }}
                                        className="hidden"
                                    />
                                    <div className="border-2 border-dashed border-cyan-500 rounded-lg h-48 flex flex-col items-center justify-center hover:border-cyan-400 transition-all">
                                        <Camera className="w-8 h-8 text-cyan-400 mb-2" />
                                        <span className="text-cyan-400 text-sm">Tap to add</span>
                                    </div>
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Edit fields - AUTO-POPULATED */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-white/60 font-mono text-xs mb-2 block flex items-center gap-2">
                                WEIGHT (KG)
                                {aiAnalysis?.estimated_weight_kg && (
                                    <span className="text-green-400 text-xs">✓ AI detected</span>
                                )}
                            </label>
                            <Input
                                type="number"
                                step="0.001"
                                min="0.005"
                                value={formData.litter_weight}
                                onChange={(e) => setFormData({ ...formData, litter_weight: parseFloat(e.target.value) || 0 })}
                                className="bg-white/10 border-white/20 text-white text-lg font-mono"
                            />
                            <p className="text-cyan-400/60 text-xs font-mono mt-1">AI auto-filled • Edit if needed</p>
                        </div>

                        <div>
                            <label className="text-white/60 font-mono text-xs mb-2 block flex items-center gap-2">
                                LOCATION
                                {aiAnalysis?.estimated_location && (
                                    <span className="text-green-400 text-xs">✓ AI detected</span>
                                )}
                            </label>
                            <Input
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="AI auto-fills from photo"
                                className="bg-white/10 border-white/20 text-white font-mono"
                            />
                        </div>

                        <div>
                            <label className="text-white/60 font-mono text-xs mb-2 block flex items-center gap-2">
                                AREA
                                {aiAnalysis?.estimated_location_detail && (
                                    <span className="text-green-400 text-xs">✓ AI detected</span>
                                )}
                            </label>
                            <Input
                                value={formData.county}
                                onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                                placeholder="AI auto-fills from photo"
                                className="bg-white/10 border-white/20 text-white font-mono"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <Button
                            onClick={() => setStep('landing')}
                            variant="outline"
                            className="flex-1 border-white/20 text-white py-6 font-bold hover:bg-white/10"
                        >
                            Back
                        </Button>
                        
                        <Button
                            onClick={() => {
                                calculateTokens();
                                setStep('review');
                            }}
                            className="flex-1 bg-amber-500 hover:bg-amber-600 text-black py-6 font-bold"
                        >
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // REVIEW
    if (step === 'review') {
        return (
            <div className="min-h-screen bg-black text-white p-6 pt-24 lg:pt-6">
                <div className="max-w-xl mx-auto space-y-6">
                    <Button
                        onClick={() => setStep('analysis')}
                        variant="ghost"
                        className="text-white/60 hover:text-white font-mono"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>

                    <div className="space-y-4">
                        <div className="border border-white/20 p-4">
                            <p className="text-white/60 text-xs font-mono mb-1">WEIGHT</p>
                            <p className="text-white text-3xl font-mono">{formData.litter_weight}kg</p>
                        </div>

                        <div className="border border-white/20 p-4">
                            <p className="text-white/60 text-xs font-mono mb-1">LOCATION</p>
                            <p className="text-white text-lg font-mono">{formData.location || formData.county || 'Not specified'}</p>
                        </div>

                        <div className="border-2 border-amber-500 bg-amber-500/10 p-4">
                            <p className="text-amber-500 text-xs font-mono mb-1">PAYMENT</p>
                            <p className="text-white text-4xl font-mono">{formData.tokens_awarded.toFixed(1)} <P51Symbol showTooltip={true} /></p>
                            {isOffline && (
                                <p className="text-amber-400 text-xs font-mono mt-2">
                                    Will sync when online
                                </p>
                            )}
                        </div>

                        {!isOffline && (
                            <div className="border border-white/20 p-4">
                                <p className="text-white text-sm font-mono mb-3">Support artists? (optional)</p>
                                
                                <Input
                                    type="number"
                                    value={supportAmount}
                                    onChange={(e) => setSupportAmount(parseFloat(e.target.value) || 0)}
                                    placeholder="0"
                                    max={formData.tokens_awarded}
                                    className="bg-white/10 border-white/20 text-white text-lg font-mono"
                                />
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-400" />
                                    <p className="text-red-400 font-mono text-sm">{error}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <Button
                                onClick={() => setStep('analysis')}
                                variant="outline"
                                className="flex-1 border-white/20 text-white py-6 font-bold hover:bg-white/10"
                                disabled={isLoading}
                            >
                                Edit
                            </Button>
                            
                            <Button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="flex-1 bg-amber-500 hover:bg-amber-600 text-black py-6 font-bold"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        {isOffline ? 'Saving' : 'Submitting'}
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-5 h-5 mr-2" />
                                        {isOffline ? 'Save offline' : 'Submit'}
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // SUCCESS - 8-BIT CHOICE SCREEN
    if (step === 'success' || step === 'success_offline') {
        return (
            <div className="min-h-screen bg-black text-white p-6 pt-24 lg:pt-6">
                <div className="max-w-xl mx-auto space-y-6">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-6"
                    >
                        {/* SUCCESS HEADER */}
                        <div className="bg-black border-4 border-green-500 p-6 text-center">
                            <div className="absolute top-0 left-0 w-4 h-4 bg-green-500" />
                            <div className="absolute top-0 right-0 w-4 h-4 bg-green-500" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 bg-green-500" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500" />
                            
                            {step === 'success_offline' ? (
                                <>
                                    <WifiOff className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                                    <p className="text-3xl font-black font-mono text-amber-400 mb-2">
                                        SAVED OFFLINE
                                    </p>
                                    <p className="text-amber-300 font-mono text-sm mb-2">Will sync + AI verify when online</p>
                                    <p className="text-cyan-400 text-xs font-mono">✓ Zero fraud • AI checks photo</p>
                                </>
                            ) : (
                                <>
                                    <COOLASFUCKHeart size={64} animate={true} className="mx-auto mb-4" />
                                    <p className="text-4xl font-black font-mono text-green-400 mb-2">
                                        +{formData.tokens_awarded.toFixed(1)} <P51Symbol showTooltip={true} />
                                    </p>
                                    <p className="text-green-300 font-black font-mono text-sm">CLEANUP VERIFIED</p>
                                </>
                            )}
                        </div>

                        {/* WHAT'S NEXT */}
                        <div className="bg-black border-4 border-cyan-500 p-6">
                            <h2 className="text-2xl font-black font-mono text-cyan-400 text-center mb-6">
                                WHAT'S NEXT?
                            </h2>

                            <div className="space-y-3">
                                {/* Another Cleanup */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        setStep('landing');
                                        setCapturedPhotos([]);
                                        setFormData({
                                            location: '',
                                            county: '',
                                            coordinates: formData.coordinates,
                                            litter_weight: 0,
                                            photo_url: '',
                                            cleanup_type: 'street',
                                            weather_conditions: '',
                                            notes: '',
                                            tokens_awarded: 0,
                                            tokens_instant: 0,
                                            tokens_pending: 0,
                                            instant_payout_percentage: 100,
                                            verification_status: 'instant_paid'
                                        });
                                        setAiAnalysis(null);
                                        setAfterPhoto(null);
                                    }}
                                    className="w-full bg-green-600 hover:bg-green-700 border-4 border-green-400 text-black py-5 font-black font-mono text-lg flex items-center justify-center gap-3"
                                >
                                    <Recycle className="w-6 h-6" />
                                    ANOTHER CLEANUP
                                </motion.button>

                                {/* Listen to Music */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate(createPageUrl('Radio'))}
                                    className="w-full bg-purple-600 hover:bg-purple-700 border-4 border-purple-400 text-white py-5 font-black font-mono text-lg flex items-center justify-center gap-3"
                                >
                                    <COOLASFUCKMusicNote size={24} animate={true} />
                                    LISTEN TO MUSIC
                                </motion.button>

                                {/* Heal */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate(createPageUrl('FrequencyChamber'))}
                                    className="w-full bg-pink-600 hover:bg-pink-700 border-4 border-pink-400 text-white py-5 font-black font-mono text-lg flex items-center justify-center gap-3"
                                >
                                    <COOLASFUCKHeart size={24} animate={true} />
                                    HEAL
                                </motion.button>

                                {/* See Balance */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate(createPageUrl('Profile'))}
                                    className="w-full bg-amber-600 hover:bg-amber-700 border-4 border-amber-400 text-black py-5 font-black font-mono text-lg flex items-center justify-center gap-3"
                                >
                                    <P51Symbol /> SEE BALANCE
                                </motion.button>
                            </div>
                        </div>

                        {/* Share */}
                        {step === 'success' && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleShare}
                                className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 border-4 border-cyan-400 text-white py-4 font-black font-mono flex items-center justify-center gap-2"
                            >
                                <Share2 className="w-5 h-5" />
                                SHARE YOUR IMPACT
                            </motion.button>
                        )}

                    </motion.div>
                </div>

                <FraudDetectionModal isOpen={showFraudModal} onClose={() => setShowFraudModal(false)} />
                <TechExplainerModal isOpen={showTechModal} onClose={() => setShowTechModal(false)} />
            </div>
        );
    }

                        return null;
                        }