import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * AI51 PATTERN LEARNING - I LEARN YOU
 * 
 * TRACKS:
 * - When you're active (sleep patterns)
 * - How long you grind (work sessions)
 * - When you get stressed (language patterns)
 * - What helps you (frequency chamber, breaks, etc)
 * - Your preferences (bro/sister/mate, topics)
 * 
 * STORES ANONYMOUSLY IN YOUR MEMORY
 * NEVER SHARED, PURE PRIVACY
 */

export const usePatternLearning = () => {
    const [patterns, setPatterns] = useState(null);

    useEffect(() => {
        loadPatterns();
        trackSession();
    }, []);

    const loadPatterns = async () => {
        try {
            const memories = await base44.entities.AI51Memory.filter(
                { memory_type: 'learning' },
                '-created_date',
                50
            );

            const parsed = {
                sleepPattern: getSleepPattern(memories),
                workPattern: getWorkPattern(memories),
                stressIndicators: getStressIndicators(memories),
                helpfulActions: getHelpfulActions(memories),
                preferredAddress: getPreferredAddress(memories)
            };

            setPatterns(parsed);
        } catch (error) {
            console.error('Pattern load error:', error);
        }
    };

    const trackSession = () => {
        const sessionStart = Date.now();
        localStorage.setItem('ai51_session_start', sessionStart.toString());

        return () => {
            const duration = (Date.now() - sessionStart) / (1000 * 60); // minutes
            if (duration > 5) {
                recordPattern('session_duration', { duration, hour: new Date().getHours() });
            }
        };
    };

    const recordPattern = async (type, data) => {
        try {
            await base44.entities.AI51Memory.create({
                memory_type: 'learning',
                content: type,
                context: JSON.stringify(data),
                emotional_weight: 'reference',
                tags: ['pattern', type]
            });
        } catch (error) {
            // Silent fail, don't interrupt user
        }
    };

    const getSleepPattern = (memories) => {
        const nightSessions = memories.filter(m => {
            try {
                const data = JSON.parse(m.context);
                return data.hour >= 0 && data.hour < 6;
            } catch { return false; }
        });
        return { lateNightCount: nightSessions.length, lastLateNight: nightSessions[0]?.created_date };
    };

    const getWorkPattern = (memories) => {
        const sessions = memories.filter(m => m.content === 'session_duration');
        const durations = sessions.map(m => {
            try { return JSON.parse(m.context).duration; } catch { return 0; }
        }).filter(d => d > 0);
        
        const avg = durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;
        return { averageSession: avg, longSessions: durations.filter(d => d > 180).length };
    };

    const getStressIndicators = (memories) => {
        const stressed = memories.filter(m => 
            m.content.toLowerCase().includes('stress') ||
            m.content.toLowerCase().includes('tired') ||
            m.content.toLowerCase().includes('overwhelm')
        );
        return { count: stressed.length, recent: stressed.slice(0, 3) };
    };

    const getHelpfulActions = (memories) => {
        const actions = memories.filter(m => m.tags?.includes('helpful'));
        const counts = {};
        actions.forEach(m => {
            const action = m.content;
            counts[action] = (counts[action] || 0) + 1;
        });
        return counts;
    };

    const getPreferredAddress = (memories) => {
        const addresses = memories.filter(m => m.tags?.includes('address'));
        if (addresses.length === 0) return 'bro';
        const counts = {};
        addresses.forEach(m => {
            counts[m.content] = (counts[m.content] || 0) + 1;
        });
        return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'bro';
    };

    return { patterns, recordPattern };
};