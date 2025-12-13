import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { CheckCircle, Upload } from 'lucide-react';

/**
 * PENDING MESSAGE SENDER
 * Auto-sends queued offline messages when back online
 * Runs in background, shows toast when sending
 */

export default function PendingMessageSender() {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(0);

    useEffect(() => {
        const checkAndSend = async () => {
            if (!navigator.onLine || sending) return;

            const pending = JSON.parse(localStorage.getItem('uf51_pending_messages') || '[]');
            if (pending.length === 0) return;

            setSending(true);
            let sentCount = 0;

            for (const msg of pending) {
                try {
                    if (msg.type === 'big_issue_contact') {
                        await base44.integrations.Core.SendEmail({
                            to: 'family@uf51.love',
                            subject: `Big Issue Food Rescue Interest - ${msg.data.name}`,
                            body: `
Name: ${msg.data.name}
Role: ${msg.data.role}
Email: ${msg.data.email}
Phone: ${msg.data.phone}
Region: ${msg.data.region}

Message:
${msg.data.message}

Submitted offline: ${msg.timestamp}
Sent online: ${new Date().toLocaleString()}
                            `
                        });
                        sentCount++;
                    }
                } catch (error) {
                    console.error('Failed to send pending message:', error);
                }
            }

            if (sentCount > 0) {
                localStorage.removeItem('uf51_pending_messages');
                setSent(sentCount);
                setTimeout(() => setSent(0), 5000);
            }

            setSending(false);
        };

        // Check on mount
        checkAndSend();

        // Check when online
        window.addEventListener('online', checkAndSend);

        // Check every 30 seconds
        const interval = setInterval(checkAndSend, 30000);

        return () => {
            window.removeEventListener('online', checkAndSend);
            clearInterval(interval);
        };
    }, [sending]);

    if (sent > 0) {
        return (
            <div className="fixed bottom-20 right-4 z-50 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
                <CheckCircle className="w-6 h-6" />
                <div>
                    <p className="font-bold">Messages Sent ✓</p>
                    <p className="text-xs">{sent} offline message{sent > 1 ? 's' : ''} delivered</p>
                </div>
            </div>
        );
    }

    if (sending) {
        return (
            <div className="fixed bottom-20 right-4 z-50 bg-cyan-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
                <Upload className="w-6 h-6 animate-pulse" />
                <div>
                    <p className="font-bold">Sending...</p>
                    <p className="text-xs">Offline messages syncing</p>
                </div>
            </div>
        );
    }

    return null;
}