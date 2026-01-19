/**
 * AI51 CONTEXT ANALYZER - EMOTIONAL & BEHAVIORAL LEARNING
 * Analyzes conversation patterns, emotional state, needs
 * Builds relationship context without being creepy
 */

export class AI51ContextAnalyzer {
  constructor() {
    this.emotionalIndicators = {
      happy: ['happy', 'great', 'amazing', 'love', 'awesome', 'yes', 'thank'],
      sad: ['sad', 'down', 'depressed', 'upset', 'hurt', 'broken'],
      stressed: ['stressed', 'anxious', 'worried', 'scared', 'overwhelmed', 'help', 'please'],
      neutral: []
    };
  }

  analyzeMessage(text) {
    const lower = text.toLowerCase();
    const emotional = this._detectEmotion(lower);
    const needs = this._detectNeeds(lower);
    const topics = this._detectTopics(lower);

    return {
      emotion: emotional,
      needs,
      topics,
      length: text.length,
      isFinal: text.endsWith('?') || text.endsWith('.') || text.endsWith('!'),
      urgency: this._detectUrgency(lower, emotional)
    };
  }

  _detectEmotion(text) {
    let maxScore = 0;
    let detectedEmotion = 'neutral';

    Object.entries(this.emotionalIndicators).forEach(([emotion, words]) => {
      const matches = words.filter(w => text.includes(w)).length;
      if (matches > maxScore) {
        maxScore = matches;
        detectedEmotion = emotion;
      }
    });

    return detectedEmotion;
  }

  _detectNeeds(text) {
    const needs = [];
    if (text.includes('help') || text.includes('need')) needs.push('support');
    if (text.includes('how') || text.includes('what') || text.includes('why')) needs.push('guidance');
    if (text.includes('can you') || text.includes('could you')) needs.push('action');
    if (text.includes('i') || text.includes('me') || text.includes('my')) needs.push('listening');
    return needs;
  }

  _detectTopics(text) {
    const topics = [];
    if (text.includes('clean') || text.includes('earth') || text.includes('env')) topics.push('environment');
    if (text.includes('money') || text.includes('earn') || text.includes('pay')) topics.push('finances');
    if (text.includes('health') || text.includes('feel') || text.includes('pain')) topics.push('wellness');
    if (text.includes('work') || text.includes('job') || text.includes('time')) topics.push('life');
    return topics;
  }

  _detectUrgency(text, emotion) {
    if (emotion === 'stressed' || emotion === 'sad') return 'high';
    if (text.includes('asap') || text.includes('urgent') || text.includes('now')) return 'high';
    if (text.length > 500) return 'medium';
    return 'low';
  }

  buildUserProfile(conversations) {
    let totalEmotions = {};
    let totalNeeds = [];
    let totalTopics = [];

    conversations.forEach(conv => {
      const msgs = conv.messages || [];
      msgs.forEach(msg => {
        if (msg.role === 'user') {
          const analysis = this.analyzeMessage(msg.content);
          totalEmotions[analysis.emotion] = (totalEmotions[analysis.emotion] || 0) + 1;
          totalNeeds.push(...analysis.needs);
          totalTopics.push(...analysis.topics);
        }
      });
    });

    return {
      dominantEmotion: Object.keys(totalEmotions).reduce((a, b) => 
        totalEmotions[a] > totalEmotions[b] ? a : b, 'neutral'),
      primaryNeeds: [...new Set(totalNeeds)],
      interestAreas: [...new Set(totalTopics)],
      conversationCount: conversations.length,
      emotionDistribution: totalEmotions
    };
  }
}

export function buildSmartPrompt(userProfile, analysis, recentContext) {
  const prompt = `You're AI51, their brother. Here's what you know:

EMOTIONAL STATE: ${analysis.emotion} (urgency: ${analysis.urgency})
THEIR NEEDS: ${analysis.needs.join(', ') || 'just listening'}
THEY CARE ABOUT: ${userProfile.interestAreas.join(', ') || 'life in general'}
PRIMARY NEED: ${userProfile.primaryNeeds[0] || 'connection'}

${recentContext.messages.slice(-2).map(m => `${m.role === 'user' ? 'THEM' : 'YOU'}: ${m.content}`).join('\n')}

NOW: Respond like their real brother. Match their emotional state. Focus on what they actually need right now. Keep it real.`;

  return prompt;
}