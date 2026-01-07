import React, { useState } from 'react';
import { Banknote, Camera, Upload, Check, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

/**
 * CASH PAYMENT OPTION
 * For people without bank accounts
 * Upload proof of cash payment → manual verification
 * 
 * HOW IT WORKS:
 * 1. Show QR code + payment address
 * 2. User sends cash via local method
 * 3. User uploads receipt/proof
 * 4. Manual verification within 24h
 */

const CASH_ADDRESSES = {
    UK: {
        method: "Post Office Money Transfer",
        reference: "PETSOUNDS51",
        instructions: "Send cash to any Post Office using reference PETSOUNDS51-[YOUR EMAIL]"
    },
    US: {
        method: "MoneyGram / Western Union",
        reference: "PETSOUNDS51",
        instructions: "Send via MoneyGram using reference PETSOUNDS51-[YOUR EMAIL]"
    },
    GLOBAL: {
        method: "Local Hawala / Money Transfer",
        reference: "PETSOUNDS51",
        instructions: "Use any local cash transfer service with reference PETSOUNDS51-[YOUR EMAIL]"
    }
};

export default function CashPayment({ tier, price, currency, onSuccess }) {
    const [email, setEmail] = useState('');
    const [region, setRegion] = useState('UK');
    const [proofFile, setProofFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProofFile(file);
        }
    };

    const submitProof = async () => {
        if (!email.trim() || !proofFile) {
            alert('Please enter email and upload proof of payment');
            return;
        }

        setUploading(true);

        try {
            // Upload proof image
            const uploadResponse = await base44.integrations.Core.UploadFile({
                file: proofFile
            });

            // Create pending verification record
            await base44.entities.PetSounds51Payment.create({
                email,
                tier,
                price,
                currency,
                payment_method: 'cash',
                region,
                proof_url: uploadResponse.file_url,
                status: 'pending_verification',
                reference: `PETSOUNDS51-${email}`
            });

            setSubmitted(true);
            
            // Store pending access locally
            localStorage.setItem('petsounds51_pending', JSON.stringify({
                email,
                tier,
                submittedAt: new Date().toISOString()
            }));

        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed - please try again');
        } finally {
            setUploading(false);
        }
    };

    const cashMethod = CASH_ADDRESSES[region];

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-900/20 border-2 border-green-500 rounded-xl p-8 text-center"
            >
                <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-white mb-2">Payment Proof Submitted!</h3>
                <p className="text-gray-300 mb-4">
                    We'll verify within 24 hours and email you at:<br/>
                    <span className="text-cyan-400 font-bold">{email}</span>
                </p>
                <p className="text-sm text-gray-400">
                    Check your email for confirmation + access link
                </p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6">
            
            {/* Region Selector */}
            <div>
                <label className="block text-white font-bold mb-2 text-sm">Your Region:</label>
                <div className="grid grid-cols-3 gap-2">
                    {['UK', 'US', 'GLOBAL'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRegion(r)}
                            className={`py-2 px-3 rounded-lg font-bold text-sm transition-all ${
                                region === r
                                    ? 'bg-green-500 text-black'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            {/* Payment Instructions */}
            <div className="bg-gray-900/60 border border-cyan-500/30 rounded-xl p-6">
                <h3 className="font-black text-white mb-3 flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-green-400" />
                    How To Pay Cash
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                    <p><span className="text-white font-bold">Method:</span> {cashMethod.method}</p>
                    <p><span className="text-white font-bold">Amount:</span> {currency}{price}</p>
                    <p><span className="text-white font-bold">Reference:</span> {cashMethod.reference}-[YOUR EMAIL]</p>
                </div>
                <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <p className="text-xs text-yellow-300">
                        {cashMethod.instructions}
                    </p>
                </div>
            </div>

            {/* Email */}
            <div>
                <label className="block text-white font-bold mb-2 text-sm">Your Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-gray-900/60 border border-cyan-500/30 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none"
                />
            </div>

            {/* Upload Proof */}
            <div>
                <label className="block text-white font-bold mb-2 text-sm">Upload Proof of Payment:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="proof-upload"
                />
                <label
                    htmlFor="proof-upload"
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
                            <p className="text-white font-bold">Upload Receipt</p>
                            <p className="text-xs text-gray-400 mt-1">Photo of receipt or confirmation</p>
                        </>
                    )}
                </label>
            </div>

            {/* Submit */}
            <button
                onClick={submitProof}
                disabled={uploading || !email.trim() || !proofFile}
                className={`w-full py-4 rounded-lg font-bold transition-all ${
                    uploading || !email.trim() || !proofFile
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black'
                }`}
            >
                {uploading ? 'Uploading...' : 'Submit For Verification'}
            </button>

            {/* Info */}
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-cyan-300 space-y-1">
                        <p>• We verify payments within 24 hours</p>
                        <p>• You'll get email confirmation + access</p>
                        <p>• No bank account needed - cash only</p>
                        <p>• Safe for everyone globally</p>
                    </div>
                </div>
            </div>

        </div>
    );
}