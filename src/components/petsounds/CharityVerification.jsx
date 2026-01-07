import React, { useState } from 'react';
import { Heart, Upload, Check, Loader2, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

/**
 * CHARITY VERIFICATION - 100% FREE ACCESS
 * For wildlife rescues, animal shelters, sanctuaries
 * Upload charity registration docs → manual verification → lifetime free access
 */

export default function CharityVerification({ onSuccess }) {
    const [charityDetails, setCharityDetails] = useState({
        name: '',
        country: '',
        registrationNumber: '',
        email: '',
        type: 'wildlife_rescue', // wildlife_rescue, shelter, sanctuary, marine_rescue
        description: ''
    });
    const [proofFile, setProofFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const charityTypes = [
        { value: 'wildlife_rescue', label: 'Wildlife Rescue/Hospital' },
        { value: 'shelter', label: 'Animal Shelter' },
        { value: 'sanctuary', label: 'Animal Sanctuary' },
        { value: 'marine_rescue', label: 'Marine Animal Rescue' }
    ];

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProofFile(file);
        }
    };

    const submitVerification = async () => {
        if (!charityDetails.name || !charityDetails.email || !proofFile) {
            alert('Please fill all required fields and upload proof');
            return;
        }

        setSubmitting(true);

        try {
            // Upload proof document
            const uploadResponse = await base44.integrations.Core.UploadFile({
                file: proofFile
            });

            // Create verification request
            await base44.entities.PetSounds51CharityVerification.create({
                charity_name: charityDetails.name,
                country: charityDetails.country,
                registration_number: charityDetails.registrationNumber,
                email: charityDetails.email,
                charity_type: charityDetails.type,
                description: charityDetails.description,
                proof_url: uploadResponse.file_url,
                status: 'pending_verification'
            });

            setSubmitted(true);

        } catch (error) {
            console.error('Verification submission error:', error);
            alert('Submission failed - please try again');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-900/20 border-2 border-green-500 rounded-xl p-8 text-center"
            >
                <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-white mb-2">Application Submitted!</h3>
                <p className="text-gray-300 mb-4">
                    We'll verify your charity registration within 24 hours.
                </p>
                <p className="text-sm text-gray-400 mb-4">
                    Email confirmation will be sent to:<br/>
                    <span className="text-cyan-400 font-bold">{charityDetails.email}</span>
                </p>
                <div className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-4">
                    <Heart className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                    <p className="text-sm text-pink-300">
                        Once verified, you'll get 100% FREE lifetime access to all features
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6">
            
            {/* Info Banner */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-1 rounded-xl">
                <div className="bg-black rounded-lg p-6">
                    <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                    <h3 className="text-2xl font-black text-white text-center mb-2">
                        100% FREE For Charities
                    </h3>
                    <p className="text-gray-400 text-sm text-center">
                        Wildlife rescues, shelters, sanctuaries - no payment ever
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
                <div>
                    <label className="block text-white font-bold mb-2 text-sm">Charity Name *</label>
                    <input
                        type="text"
                        value={charityDetails.name}
                        onChange={(e) => setCharityDetails({...charityDetails, name: e.target.value})}
                        placeholder="e.g., Wildlife Rescue Trust"
                        className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-white font-bold mb-2 text-sm">Charity Type *</label>
                    <select
                        value={charityDetails.type}
                        onChange={(e) => setCharityDetails({...charityDetails, type: e.target.value})}
                        className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                    >
                        {charityTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-white font-bold mb-2 text-sm">Country *</label>
                        <input
                            type="text"
                            value={charityDetails.country}
                            onChange={(e) => setCharityDetails({...charityDetails, country: e.target.value})}
                            placeholder="e.g., UK"
                            className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-white font-bold mb-2 text-sm">Registration Number</label>
                        <input
                            type="text"
                            value={charityDetails.registrationNumber}
                            onChange={(e) => setCharityDetails({...charityDetails, registrationNumber: e.target.value})}
                            placeholder="e.g., 123456"
                            className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-white font-bold mb-2 text-sm">Email *</label>
                    <input
                        type="email"
                        value={charityDetails.email}
                        onChange={(e) => setCharityDetails({...charityDetails, email: e.target.value})}
                        placeholder="contact@charity.org"
                        className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-white font-bold mb-2 text-sm">Description</label>
                    <textarea
                        value={charityDetails.description}
                        onChange={(e) => setCharityDetails({...charityDetails, description: e.target.value})}
                        placeholder="Tell us about your rescue/shelter..."
                        className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white min-h-[80px] focus:border-cyan-500 focus:outline-none"
                    />
                </div>

                {/* Upload Proof */}
                <div>
                    <label className="block text-white font-bold mb-2 text-sm">Charity Registration Proof *</label>
                    <p className="text-xs text-gray-500 mb-2">
                        Upload charity certificate, registration docs, or official letter
                    </p>
                    <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="charity-proof-upload"
                    />
                    <label
                        htmlFor="charity-proof-upload"
                        className="w-full bg-gray-800 hover:bg-gray-700 border-2 border-dashed border-cyan-500/30 hover:border-cyan-500 rounded-lg p-6 cursor-pointer flex flex-col items-center justify-center transition-all"
                    >
                        {proofFile ? (
                            <>
                                <Check className="w-8 h-8 text-green-400 mb-2" />
                                <p className="text-white font-bold">{proofFile.name}</p>
                                <p className="text-xs text-gray-400 mt-1">Click to change</p>
                            </>
                        ) : (
                            <>
                                <Upload className="w-8 h-8 text-cyan-400 mb-2" />
                                <p className="text-white font-bold">Upload Charity Proof</p>
                                <p className="text-xs text-gray-400 mt-1">PDF or image</p>
                            </>
                        )}
                    </label>
                </div>
            </div>

            {/* Submit */}
            <button
                onClick={submitVerification}
                disabled={submitting || !charityDetails.name || !charityDetails.email || !proofFile}
                className={`w-full py-4 rounded-lg font-bold transition-all ${
                    submitting || !charityDetails.name || !charityDetails.email || !proofFile
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-black'
                }`}
            >
                {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                    </span>
                ) : (
                    'Apply For Free Access'
                )}
            </button>

            {/* Info */}
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-cyan-300 space-y-1">
                        <p>• Verification takes 24 hours</p>
                        <p>• 100% free, forever - no hidden costs</p>
                        <p>• All features included (same as £499 tier)</p>
                        <p>• Help heal animals worldwide ♾️❤️</p>
                    </div>
                </div>
            </div>

        </div>
    );
}