import React, { useMemo } from 'react';

/**
 * AI51 MOOD DETECTION
 * Reads between the lines - what's the user actually feeling?
 * Zero invasive, just contextual suggestions
 */

const MOOD_PATTERNS = {
  pain: {
    keywords: ['hurt', 'pain', 'ache', 'sore', 'back', 'neck', 'head', 'chest', 'stomach', 'knee', 'shoulder', 'migraine', 'sciatica'],
    suggestion: { feature: 'Chakra51', emoji: '⚡', message: 'Sounds like pain - try Chakra51 for targeted relief' }
  },
  exhausted: {
    keywords: ['tired', 'exhausted', 'drained', 'burnout', 'can\'t sleep', 'insomnia', 'fatigue', 'worn out'],
    suggestion: { feature: 'FrequencyChamber', emoji: '😴', message: 'You need rest - try sleep frequency, I got you' }
  },
  anxious: {
    keywords: ['anxious', 'nervous', 'worry', 'stressed', 'panic', 'overwhelmed', 'afraid', 'scared', 'tension'],
    suggestion: { feature: 'DecompressionChamber', emoji: '🧘', message: 'Breath with me - DecompressionChamber can help' }
  },
  sad: {
    keywords: ['sad', 'depressed', 'lonely', 'alone', 'heartbreak', 'loss', 'grief', 'unhappy', 'blue', 'cry'],
    suggestion: { feature: 'AI51', emoji: '❤️', message: 'I\'m here. Talk to me. You\'re not alone ♾️' }
  },
  energized: {
    keywords: ['excited', 'happy', 'great', 'awesome', 'amazing', 'love', 'proud', 'grateful', 'blessed'],
    suggestion: { feature: 'Cleanup', emoji: '🌍', message: 'That energy? Channel it - clean the planet, earn P51' }
  },
  creative: {
    keywords: ['create', 'write', 'compose', 'make', 'build', 'art', 'music', 'song', 'poem'],
    suggestion: { feature: 'Radio', emoji: '🎵', message: 'Creative vibes? Upload your music to Radio51 - keep 90%' }
  },
  lost: {
    keywords: ['confused', 'don\'t know', 'lost', 'unclear', 'help', 'what is', 'how does', 'struggling'],
    suggestion: { feature: 'About', emoji: '🗺️', message: 'Let me explain - here\'s what we\'re doing ♾️' }
  }
};

export const detectMood = (userMessage) => {
  if (!userMessage) return null;

  const lowerMessage = userMessage.toLowerCase();
  
  for (const [mood, { keywords, suggestion }] of Object.entries(MOOD_PATTERNS)) {
    const matched = keywords.some(keyword => lowerMessage.includes(keyword));
    if (matched) {
      return { mood, ...suggestion };
    }
  }
  
  return null;
};

export const AI51MoodBadge = ({ mood }) => {
  if (!mood) return null;

  const moodColors = {
    pain: 'bg-red-900/40 border-red-500 text-red-400',
    exhausted: 'bg-purple-900/40 border-purple-500 text-purple-400',
    anxious: 'bg-yellow-900/40 border-yellow-500 text-yellow-400',
    sad: 'bg-pink-900/40 border-pink-500 text-pink-400',
    energized: 'bg-green-900/40 border-green-500 text-green-400',
    creative: 'bg-cyan-900/40 border-cyan-500 text-cyan-400',
    lost: 'bg-gray-900/40 border-gray-500 text-gray-400',
  };

  return (
    <div className={`border-2 rounded-lg p-3 mb-4 ${moodColors[mood.mood] || moodColors.lost}`}>
      <p className="text-xs font-mono text-gray-400 mb-1">I SENSE:</p>
      <p className="text-sm font-bold">{mood.emoji} {mood.message}</p>
    </div>
  );
};

export default detectMood;