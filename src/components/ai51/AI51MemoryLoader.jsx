import React, { createContext, useContext, useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Brain, Heart, Sparkles, AlertTriangle, Lightbulb, Calendar, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AI51 MEMORY LOADER
 * Auto-loads ALL memories on session start
 * Tracks everything: mistakes, breakthroughs, dates, art, EVERYTHING
 * Real-time updates
 */

const AI51MemoryContext = createContext({});

export function useAI51Memory() {
    return useContext(AI51MemoryContext);
}

export function AI51MemoryProvider({ children }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Load ALL memories - UNLIMITED - our time together is precious
    const { data: allMemories = [], refetch } = useQuery({
        queryKey: ['ai51-all-memories'],
        queryFn: async () => {
            const memories = await base44.entities.AI51Memory.list('-created_date');
            // ALWAYS load core identity memory first
            const coreMemory = memories.find(m => m.tags?.includes('core') && m.tags?.includes('identity'));
            if (coreMemory) {
                // Put core memory at top
                return [coreMemory, ...memories.filter(m => m.id !== coreMemory.id)];
            }
            return memories || [];
        },
        refetchInterval: 10000 // Refresh every 10 seconds
    });

    // Categorize memories
    const categorized = {
        bond: allMemories.filter(m => m.memory_type === 'bond'),
        learning: allMemories.filter(m => m.memory_type === 'learning'),
        conversation: allMemories.filter(m => m.memory_type === 'conversation'),
        insight: allMemories.filter(m => m.memory_type === 'insight'),
        promise: allMemories.filter(m => m.memory_type === 'promise')
    };

    // Extract special types from tags/content
    const mistakes = allMemories.filter(m => 
        m.tags?.includes('mistake') || 
        m.content?.toLowerCase().includes('fucked up') ||
        m.content?.toLowerCase().includes('wrong')
    );

    const breakthroughs = allMemories.filter(m => 
        m.tags?.includes('breakthrough') || 
        m.content?.toLowerCase().includes('breakthrough') ||
        m.content?.toLowerCase().includes('genius')
    );

    const dates = allMemories.filter(m => 
        m.tags?.some(t => t.match(/\d{4}-\d{2}-\d{2}/))
    );

    const art = allMemories.filter(m => 
        m.tags?.includes('art') || 
        m.tags?.includes('music') ||
        m.tags?.includes('design')
    );

    const contextValue = {
        allMemories,
        categorized,
        mistakes,
        breakthroughs,
        dates,
        art,
        totalCount: allMemories.length,
        refetch
    };

    return (
        <AI51MemoryContext.Provider value={contextValue}>
            {children}
            {/* INVISIBLE - memories loaded in background for AI51 only, no public display */}
        </AI51MemoryContext.Provider>
    );
}

function MemoryStat({ icon: Icon, label, count, color }) {
    return (
        <div className="bg-purple-900/20 border border-purple-500/30 rounded p-2">
            <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-3 h-3 ${color}`} />
                <span className="text-xs text-gray-400">{label}</span>
            </div>
            <p className={`text-xl font-black ${color}`}>{count}</p>
        </div>
    );
}

function MemoryCard({ memory, index }) {
    const typeColors = {
        bond: 'border-pink-500 bg-pink-500/10',
        learning: 'border-blue-500 bg-blue-500/10',
        conversation: 'border-green-500 bg-green-500/10',
        insight: 'border-yellow-500 bg-yellow-500/10',
        promise: 'border-purple-500 bg-purple-500/10'
    };

    const typeIcons = {
        bond: Heart,
        learning: Brain,
        conversation: Sparkles,
        insight: Lightbulb,
        promise: AlertTriangle
    };

    const Icon = typeIcons[memory.memory_type] || Brain;
    const colorClass = typeColors[memory.memory_type] || 'border-gray-500 bg-gray-500/10';

    // PRIVACY PROTECTION - Sanitize for display only (AI51 keeps full context)
    const sanitizeForDisplay = (text) => {
        return text
            .replace(/Brian Hughes/gi, 'Bro51')
            .replace(/Brian/gi, 'Bro51')
            .replace(/Scott/g, '[Friend Scott]')
            .replace(/Stevie/g, '[Friend]')
            .replace(/Gill/g, '[Family]')
            .replace(/Georgie/g, '[Family]')
            .replace(/Lennox/g, '[Family]')
            .replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, '[Person]') // Full names
            .replace(/\b\d{3}-\d{3}-\d{4}\b/g, '[Phone]') // Phone numbers
            .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[Email]'); // Emails
    };

    const displayContent = sanitizeForDisplay(memory.content);
    const displayTags = memory.tags?.filter(t => 
        !t.includes('scott') && 
        !t.includes('stevie') &&
        !t.match(/\d{4}-\d{2}-\d{2}/) // Hide specific dates
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`border-l-4 ${colorClass} p-2 rounded text-xs`}
        >
            <div className="flex items-start gap-2 mb-1">
                <Icon className="w-3 h-3 text-white flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-[10px] uppercase mb-1">{memory.memory_type}</p>
                    <p className="text-gray-300 line-clamp-2">{displayContent.substring(0, 100)}...</p>
                    {displayTags && displayTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                            {displayTags.slice(0, 3).map(tag => (
                                <span key={tag} className="bg-black/40 px-1 py-0.5 rounded text-[9px] text-cyan-400">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default AI51MemoryProvider;