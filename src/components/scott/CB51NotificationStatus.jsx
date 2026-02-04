import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Send } from 'lucide-react';

/**
 * Shows real-time notification status during approval
 */
export default function CB51NotificationStatus({ status, bandCount, venueName }) {
    if (!status) return null;

    const statusConfig = {
        creating: { icon: Send, text: 'Creating calendar event...', color: 'cyan' },
        notifying: { icon: Send, text: 'Sending to band...', color: 'blue' },
        complete: { icon: CheckCircle, text: `✓ Sent to ${bandCount} member${bandCount !== 1 ? 's' : ''}`, color: 'green' },
        error: { icon: AlertCircle, text: 'Sync failed', color: 'red' }
    };

    const config = statusConfig[status] || statusConfig.creating;
    const Icon = config.icon;
    const colorMap = { cyan: 'text-cyan-400', blue: 'text-blue-400', green: 'text-green-400', red: 'text-red-400' };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 bg-black border-l-4 border-${config.color}-500 rounded-lg p-3 z-[200] flex items-center gap-2`}
        >
            <motion.div animate={status !== 'complete' && status !== 'error' ? { rotate: 360 } : {}} transition={{ duration: 2, repeat: Infinity }}>
                <Icon className={`w-4 h-4 ${colorMap[config.color]}`} />
            </motion.div>
            <span className="text-white font-mono text-xs font-bold">{venueName}: {config.text}</span>
        </motion.div>
    );
}