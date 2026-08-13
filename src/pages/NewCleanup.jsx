import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { signCleanup, verifyChainIntegrity } from '@/components/security/CryptoSecurity';
import CleanupLanding from '@/components/cleanup/steps/CleanupLanding';
import CleanupScanning from '@/components/cleanup/steps/CleanupScanning';
import CleanupAnalysis from '@/components/cleanup/steps/CleanupAnalysis';
import CleanupReview from '@/components/cleanup/steps/CleanupReview';
import CleanupSuccess from '@/components/cleanup/steps/CleanupSuccess';

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

    const { data: recentActivity = [] } = useQuery({
        queryKey: ['recentActivity'],
        queryFn: async () => {
            try {
                const cleanups = await base44.entities.Cleanup.list('-created_date', 6).catch(() => []);
                return cleanups.map(c => ({
                    type: 'cleanup',
                    id: c.id,
                    photo_url: c.photo_url,
                    title: c.county || c.location,
                    subtitle: `${c.litter_weight}kg cleaned`,
                    created_date: c.created_date,
                    data: c
                }));
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

        for (const cleanup of offlineCleanups) {
            try {
                if (cleanup.photo_url && cleanup.photo_url.startsWith('data:')) {
                    const blob = await fetch(cleanup.photo_url).then(r => r.blob());
                    const file = new File([blob], 'cleanup.jpg', { type: 'image/jpeg' });
                    const { file_url } = await base44.integrations.Core.UploadFile({ file });
                    cleanup.photo_url = file_url;

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

                    if (!analysis.is_legitimate || analysis.fraud_risk_score > 80 || cleanup.litter_weight > 100) {
                        cleanup.verification_status = 'pending_verification';
                        cleanup.ai_notes = analysis.notes;
                        cleanup.fraud_flags = analysis.red_flags;
                        cleanup.tokens_instant = 0;
                        cleanup.tokens_pending = cleanup.tokens_awarded;
                    } else {
                        cleanup.tokens_instant = cleanup.tokens_awarded;
                        cleanup.tokens_pending = 0;
                    }
                }

                await base44.entities.Cleanup.create(cleanup);

                const user = await base44.auth.me();
                const tokensToAward = cleanup.tokens_instant || cleanup.tokens_awarded;
                await base44.auth.updateMe({
                    p51_balance: (user.p51_balance || 0) + tokensToAward
                });

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

        localStorage.removeItem('offlineCleanups');
        queryClient.invalidateQueries({ queryKey: ['cleanups'] });
        queryClient.invalidateQueries({ queryKey: ['recentActivity'] });

        setSyncNotification(`✓ ${offlineCleanups.length} cleanup${offlineCleanups.length > 1 ? 's' : ''} synced & verified!`);
        setTimeout(() => setSyncNotification(null), 5000);
    };

    const analyzePhotoWithAI = async (photoUrl) => {
        if (isOffline || !navigator.onLine) {
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

            **VISUAL SCENE ANALYSIS:**
            - Describe EXACTLY what you see: outdoor/indoor, ground type, background elements
            - Time of day estimate (from lighting/shadows)
            - Weather conditions visible (sunny/rainy/cloudy)
            - Location TYPE: urban street, park, beach, forest, waterway, roadside, etc
            - Is this REAL outdoor litter? Or staged indoors?

            **BRAND DETECTION (CRITICAL):**
            - SCAN EVERY SINGLE ITEM for ANY visible text, logos, brand names
            - Known culprits: Coca-Cola, Pepsi, McDonald's, Starbucks, Cadbury, Nestlé, Budweiser, Irn-Bru, Tesco, Greggs, KFC, Subway, Tennent's, etc
            - Partial logos count: "oca-C" = Coca-Cola, "epsi" = Pepsi
            - Return ALL in brands array

            **MATERIAL IDENTIFICATION (SPECIFIC):**
            - List EXACT materials: "Tennent's aluminum can", "Coca-Cola PET bottle", etc
            - Include brand IN material name

            **ITEM-BY-ITEM COUNT (CRITICAL):**
            - Count EACH distinct item visible
            - Format: "3 Tennent's cans, 1 plastic bottle, 2 crisp packets"

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
            - Real cleanups: outdoor, dirt visible, ground/pavement, natural light

            **ENVIRONMENTAL CONTEXT:**
            - Decomposition times for each material type
            - Ocean threat level (0-10) if near water
            - Wildlife danger (0-10)
            - Carbon saved by preventing this litter entering ecosystem
            - Microplastic risk assessment

            **ANTI-FRAUD (CRITICAL):**
            - Real outdoor cleanup? Or staged?
            - Red flags: indoor, shelf, too clean, pro lighting, single item
            - Confidence: high (95%+), medium (70-94%), low (<70%)

            Return ultra-detailed JSON:`,
                file_urls: [photoUrl],
                response_json_schema: {
                    type: 'object',
                    properties: {
                        scene_description: { type: 'string' },
                        estimated_location: { type: 'string' },
                        estimated_location_detail: { type: 'string' },
                        weather_visible: { type: 'string' },
                        time_of_day_estimate: { type: 'string' },
                        item_by_item_count: { type: 'string' },
                        estimated_weight_kg: { type: 'number' },
                        materials: { type: 'array', items: { type: 'string' } },
                        brands: { type: 'array', items: { type: 'string' } },
                        item_counts: { type: 'string' },
                        location_type: { type: 'string' },
                        recyclable_percentage: { type: 'number' },
                        decomposition_times: { type: 'string' },
                        carbon_saved_kg: { type: 'number' },
                        microplastic_risk: { type: 'string' },
                        ocean_threat_level: { type: 'number' },
                        wildlife_danger_score: { type: 'number' },
                        observations: { type: 'string' },
                        confidence_score: { type: 'number' },
                        is_legitimate: { type: 'boolean' },
                        fraud_flags: { type: 'array', items: { type: 'string' } },
                        is_indoor_staging: { type: 'boolean' }
                    }
                }
            });

            const analysis = await Promise.race([analysisPromise, timeoutPromise]);

            setAiAnalysis(analysis);

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

            existingCleanups.push(photoHash);
            localStorage.setItem('usedPhotoHashes', JSON.stringify(existingCleanups));

            setFormData(prev => ({ ...prev, photo_hash: photoHash }));

            if (isOffline) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Photo = reader.result;
                    setCapturedPhotos(prev => [...prev, base64Photo]);
                    setFormData(prev => ({ ...prev, photo_url: base64Photo }));
                    setIsLoading(false);
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
                            setFormData(prev => ({ ...prev, photo_url: base64Photo }));
                            setIsLoading(false);
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
                setTimeout(() => setError(null), 2000);
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

            // CRYPTOGRAPHIC SIGNING
            let cryptoSignature;
            try {
                cryptoSignature = await signCleanup({
                    ...formData,
                    litter_weight: formData.litter_weight,
                    location: formData.location || formData.county || 'Unknown',
                    photo_hash: formData.photo_hash,
                    coordinates: formData.coordinates
                });

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

                if (!isAuthenticated) {
                    const localBalance = parseFloat(localStorage.getItem('anonymous_p51_balance') || '0');
                    localStorage.setItem('anonymous_p51_balance', (localBalance + tokens).toString());
                }

                setTimeout(() => { navigate(createPageUrl('Profile')); }, 3000);
            } else {
                try {
                    await createCleanupMutation.mutateAsync(cleanupData);

                    if (!isAuthenticated) {
                        const localBalance = parseFloat(localStorage.getItem('anonymous_p51_balance') || '0');
                        localStorage.setItem('anonymous_p51_balance', (localBalance + tokens).toString());
                    } else {
                        const user = await base44.auth.me();
                        const currentBalance = user.p51_balance || 0;
                        const newBalance = currentBalance + tokens;

                        await base44.auth.updateMe({ p51_balance: newBalance });

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

                    setTimeout(() => { navigate(createPageUrl('Profile')); }, 2000);
                } catch (submitErr) {
                    if (submitErr.message === 'OFFLINE' || !navigator.onLine) {
                        saveOffline(cleanupData);
                        setIsLoading(false);
                        setStep('success_offline');

                        if (!isAuthenticated) {
                            const localBalance = parseFloat(localStorage.getItem('anonymous_p51_balance') || '0');
                            localStorage.setItem('anonymous_p51_balance', (localBalance + tokens).toString());
                        }

                        setTimeout(() => { navigate(createPageUrl('Profile')); }, 2000);
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
                setTimeout(() => { setStep('success_offline'); }, 2000);
            }
        }
    };

    const handleShare = async () => {
        const shareText = `Just earned ${formData.tokens_awarded.toFixed(1)} $P51 cleaning ${formData.litter_weight}kg of litter from ${formData.location || 'my area'}!\n\nGet paid to heal Earth: uf51.love`;

        if (navigator.share) {
            try {
                await navigator.share({
                    text: shareText,
                    files: formData.photo_url && formData.photo_url.startsWith('http') ? [] : undefined
                });
            } catch (err) {
                console.log('Share cancelled or failed:', err);
            }
        } else {
            navigator.clipboard.writeText(shareText);
            alert('Share text copied! Paste to Instagram/TikTok');
        }
    };

    // === STEP ROUTING ===
    if (step === 'landing') {
        return <CleanupLanding
            formData={formData} isOffline={isOffline} isLoading={isLoading}
            recentActivity={recentActivity}
            viewingPhoto={viewingPhoto} setViewingPhoto={setViewingPhoto}
            showScanner={showScanner} setShowScanner={setShowScanner}
            handlePhotoCapture={handlePhotoCapture} handleScannerPhoto={handleScannerPhoto}
            syncNotification={syncNotification}
            showGPSExplainer={showGPSExplainer} setShowGPSExplainer={setShowGPSExplainer}
            setError={setError}
        />;
    }

    if (step === 'scanning') {
        return <CleanupScanning formData={formData} afterPhoto={afterPhoto} setAfterPhoto={setAfterPhoto} isOffline={isOffline} />;
    }

    if (step === 'analysis') {
        return <CleanupAnalysis
            aiAnalysis={aiAnalysis} isLoading={isLoading}
            formData={formData} setFormData={setFormData}
            afterPhoto={afterPhoto} setAfterPhoto={setAfterPhoto}
            calculateTokens={calculateTokens} setStep={setStep}
            showFraudModal={showFraudModal} setShowFraudModal={setShowFraudModal}
            showTechModal={showTechModal} setShowTechModal={setShowTechModal}
        />;
    }

    if (step === 'review') {
        return <CleanupReview
            formData={formData} supportAmount={supportAmount} setSupportAmount={setSupportAmount}
            isLoading={isLoading} isOffline={isOffline} error={error}
            setStep={setStep} handleSubmit={handleSubmit}
        />;
    }

    if (step === 'success' || step === 'success_offline') {
        return <CleanupSuccess
            formData={formData} step={step}
            setStep={setStep} setCapturedPhotos={setCapturedPhotos}
            setFormData={setFormData} setAiAnalysis={setAiAnalysis} setAfterPhoto={setAfterPhoto}
            handleShare={handleShare}
            showFraudModal={showFraudModal} setShowFraudModal={setShowFraudModal}
            showTechModal={showTechModal} setShowTechModal={setShowTechModal}
        />;
    }

    return null;
}