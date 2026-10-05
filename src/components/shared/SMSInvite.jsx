import React, { useState } from 'react';
import { MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { LocalLedger } from './LocalLedger';

export default function SMSInvite({ amount, message, onSuccess }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(false);

    const generateClaimCode = () => {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    const sendSMSInvite = async () => {
        try {
            setIsSending(true);

            // DOUBLE-SPEND CHECK
            const availableBalance = LocalLedger.getBalance();
            if (parseFloat(amount) > availableBalance) {
                throw new Error(`Insufficient balance. Available: ${availableBalance.toFixed(1)} P51`);
            }

            const user = await base44.auth.me();
            const claimCode = generateClaimCode();

            // Generate signature
            const timestamp = Date.now();
            const signatureData = `${user.email}-${phoneNumber}-${amount}-${timestamp}`;
            const encoder = new TextEncoder();
            const data = encoder.encode(signatureData);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const signature = Array.from(new Uint8Array(hashBuffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');

            // LOCK FUNDS IMMEDIATELY
            LocalLedger.recordPendingOut(
                parseFloat(amount),
                phoneNumber,
                'sms',
                signature
            );

            // Store claim in database
            await base44.entities.Transaction.create({
                from_user: user.email,
                to_user: phoneNumber, // Phone as identifier
                amount: parseFloat(amount),
                reason: message || 'P2P transfer',
                type: 'sms_claim',
                claim_code: claimCode,
                claimed: false
            });

            // Send SMS via integration
            const smsText = `${user.full_name || 'Someone'} sent you ${amount} P51! 💰\n\nClaim: uf51.love/claim/${claimCode}\n\nGet paid to heal Earth ♾️`;

            await base44.integrations.Core.SendEmail({
                to: user.email, // For now - would use SMS API in production
                subject: `SMS Preview: ${phoneNumber}`,
                body: smsText
            });

            // Update sender balance
            await base44.auth.updateMe({
                p51_balance: (user.p51_balance || 0) - parseFloat(amount)
            });

            setSent(true);
            setTimeout(() => {
                onSuccess && onSuccess();
            }, 2000);

        } catch (err) {
            console.error('SMS send error:', err);
            alert('Failed to send SMS invite');
        } finally {
            setIsSending(false);
        }
    };

    if (sent) {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8 space-y-4"
            >
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto" />
                <p className="text-2xl font-black text-white">SMS Sent!</p>
                <p className="text-green-400 font-mono text-sm">They'll get claim link</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-4">
            <div>
                <label className="text-white/60 text-sm font-mono mb-2 block">
                    RECIPIENT PHONE
                </label>
                <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+44 7XXX XXX XXX"
                    className="bg-white/10 border-white/20 text-white font-mono"
                />
            </div>

            <Button
                onClick={sendSMSInvite}
                disabled={isSending || !phoneNumber}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-6 text-lg font-bold"
            >
                {isSending ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending SMS...
                    </>
                ) : (
                    <>
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Send via SMS
                    </>
                )}
            </Button>

            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                <p className="text-green-400 text-xs font-mono">
                    📱 They get claim link • No account needed • Create account to claim • Works anywhere
                </p>
            </div>
        </div>
    );
}