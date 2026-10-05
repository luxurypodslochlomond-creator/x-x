import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * SHARE APP P2P - Web Share API
 * Let people share UF51 directly with friends/family via native share sheet
 */

export default function ShareAppButton({ 
    variant = "default", 
    className = "",
    text = "Share UF51",
    icon = true 
}) {
    const shareApp = async () => {
        const shareData = {
            title: 'UF51 - Clean Earth, Get Paid, Listen Free',
            text: `💚 I'm using UF51 and thought you'd love it bro:

🌍 Clean Earth → Earn P51 tokens
🎵 Healing music → 100% free, artists get 90%
💗 Love-based economy → No ads, no bullshit

Join the family 💚`,
            url: window.location.origin
        };

        // Check if Web Share API is supported
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // User cancelled or error - no need to show error
                if (err.name !== 'AbortError') {
                    console.log('Share failed:', err);
                }
            }
        } else {
            // Fallback: Copy link to clipboard
            try {
                await navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`);
                alert('✅ Link copied to clipboard! Share it anywhere 💚');
            } catch (err) {
                // Last resort: Show text in alert for manual copy
                alert(`Copy this and share:\n\n${shareData.text}\n\n${shareData.url}`);
            }
        }
    };

    return (
        <motion.div whileTap={{ scale: 0.95 }}>
            <Button 
                onClick={shareApp}
                variant={variant}
                className={className}
            >
                {icon && <Share2 className="w-5 h-5 mr-2" />}
                {text}
            </Button>
        </motion.div>
    );
}