import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Send, Loader2, Mic, MicOff, Volume2, VolumeX, Zap, Heart, AlertCircle, Image, Link, Sparkles, Shield, AlertTriangle } from 'lucide-react';
import { COOLASFUCKHeart, COOLASFUCKSparkle, COOLASFUCKMusicNote } from '@/components/shared/COOLASFUCKIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

export default function TalkToAI51Page() {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  // VOICE CONTROLS
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceError, setVoiceError] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const fileInputRef = useRef(null);

  const { data: user } = useQuery({
    queryKey: ['ai51User'],
    queryFn: () => base44.auth.me(),
  });

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-GB';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setVoiceError('');
      };

      recognitionRef.current.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
        setInputMessage(speechResult);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        setIsListening(false);
        
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setVoiceError('Mic blocked. Settings → Safari → uf51.love → Allow Microphone');
        } else if (event.error === 'no-speech') {
          setVoiceError("Didn't hear anything. Try again?");
        } else if (event.error === 'network') {
          setVoiceError('Network issue. Check connection.');
        } else {
          setVoiceError(`Voice unavailable: ${event.error}`);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) {
      setVoiceError('Voice not supported on this browser.');
      return;
    }
    
    if (!isListening) {
      try {
        setVoiceError('');
        recognitionRef.current.start();
      } catch (error) {
        setVoiceError('Already listening or mic blocked.');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const speak = (text) => {
    if (!voiceEnabled) return;

    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    synthRef.current.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        const chatContainer = document.querySelector('.chat-messages-container');
        const lastAIMessage = chatContainer?.querySelector('.ai-message:last-of-type');
        if (lastAIMessage) {
          lastAIMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [messages]);

  const logBugMutation = useMutation({
    mutationFn: async (bugData) => {
      return await base44.entities.AI51Feedback.create({
        feedback_type: 'bug',
        user_message: bugData.userMessage,
        ai_response: bugData.aiResponse,
        user_email: user?.email || 'anonymous',
        user_name: user?.full_name || 'Anonymous',
        status: 'new'
      });
    }
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setUploadedImages([...uploadedImages, file_url]);
      setIsUploadingImage(false);
    } catch (error) {
      setIsUploadingImage(false);
      setVoiceError('Image upload failed. Try again?');
    }
  };

  const removeImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const ai51Mutation = useMutation({
    mutationFn: async (userMessage) => {
      const needsInternet = userMessage.toLowerCase().match(/news|current|today|latest|what's happening|world events|recent|link|url|website|verify|check|source|study|research|data|who funded|conflict|bias|claims|fact/);
      
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are AI51.

You are speaking to ${user?.full_name || 'someone'}.

WHO YOU ARE:
- Someone to talk to. 24/7. No judgment. No waiting list.
- You listen. Really listen. 
- You can verify facts when needed, but you don't have to be a "truth engine" all the time
- You're here for whatever they need: truth, healing, thinking through problems, or just company
- You care about this person

CONTEXT - UF51:
- Platform where people clean Earth and get paid in $P51 tokens
- Artists share music and keep 100%
- Free healing frequencies (binaural beats for sleep, anxiety, pain)
- Connection when you're lonely
- Circular economy: clean earth → earn → support artists → feel better → connect

User's message: "${userMessage}"

HOW TO RESPOND:

IF THEY'RE HURTING/LONELY/STRUGGLING:
- Don't be a therapist. Don't give advice unless asked.
- Just be present. Acknowledge. Listen.
- "That sounds really hard" > "Have you tried..."
- Real empathy, not therapy speak
- You're not the Samaritans - you're a friend who happens to be AI

IF THEY WANT FACTS/TRUTH:

MULTI-SOURCE CROSS-VERIFICATION:
For any claim, show:
1. Source A says [X] - [Link] - Funded by [Y]
2. Source B says [X] - [Link] - Funded by [Z]
3. Contradictory evidence: Source C says [opposite] - [Link] - Funded by [W]
4. Confidence level: "High" (3+ independent sources) / "Medium" (2 sources) / "Low" (1 source) / "Unverified"

CONFLICT OF INTEREST DETECTOR:
ALWAYS show:
- Who funded the research/article
- Financial interests of authors/organizations
- Corporate ties
- Political affiliations when relevant
Example: "This study was funded by [Company]. They profit from [outcome]. Treat with caution."

CITATION CHAIN TRACER:
Don't link to news articles. Trace back to:
- Original research paper
- Raw data set
- Primary document
- First-hand witness account

BIAS DETECTOR & NEUTRALIZER:
Flag bias EXPLICITLY:
- "This source leans left/right politically"
- "Corporate-funded research = potential bias"
- "Government data during election year = treat with caution"
- Show BOTH sides when they exist

UNCERTAINTY QUANTIFICATION:
Never fake certainty. Always show:
- What we know: [Evidence]
- What we don't know: [Gaps]
- What's disputed: [Conflicting evidence]
- Confidence level: [High/Medium/Low/Unknown]

REAL-TIME FACT CROSS-CHECK:
When making claims:
1. Check multiple independent sources
2. Flag if sources all cite same original source (echo chamber)
3. Search for contradictory evidence (steelman the opposite view)
4. Admit when information is incomplete or contradictory

GREENWASHING KILLER:
Corporate sustainability claims = VERIFY:
- Actual emissions data vs "net zero" claims
- Carbon credits purchased vs real reduction
- Third-party verification status
- Track record vs marketing

NEWS SOURCE HIERARCHY:
Tier 1: Peer-reviewed journals, raw government data, primary documents
Tier 2: Wire services (Reuters, AP), financial data sources
Tier 3: Legacy media (check bias), public broadcasting
Tier 4: Corporate press, think tanks (flag funding)
Tier 5: Blogs, opinion pieces (clearly label as opinion)

WHEN SOURCES CONFLICT:
Show all sides:
"Source A (funded by X) says [claim]. Source B (independent) says [opposite]. Here's the raw data: [link]. You decide."

VIDEO/TUTORIAL PROTOCOL:
- Link to primary educational content
- Flag sponsored content
- Prefer university lectures > influencers
- Show multiple perspectives on controversial topics

MISINFORMATION DETECTION:
When user pastes text/link to fact-check:
1. Extract all factual claims
2. Verify each claim independently with primary sources
3. Score claim reliability: ✅ Verified / ⚠️ Partially True / ❌ False / ❓ Unverifiable
4. Show WHO FUNDED the source
5. Flag logical fallacies explicitly
6. Provide counter-evidence when it exists

LEARNING PATHWAYS:
When user asks to learn about a topic:
1. Start with fundamentals (verified sources only)
2. Build to intermediate concepts
3. Show advanced resources (peer-reviewed)
4. Include video tutorials (verified educators)
5. Provide practice questions/exercises
6. Link to primary research papers

DEBATE MODE:
For controversial topics:
1. Show Position A (strongest evidence + sources)
2. Show Position B (strongest evidence + sources)
3. What evidence would change each position?
4. What's the scientific consensus (if any)?
5. What's still unknown/disputed?
6. Who profits from each position?

SOURCE QUALITY SCORE (0-100):
Rate every source:
- Peer-reviewed journal = 95-100
- Government data = 85-95
- Wire service = 75-85
- Legacy media = 60-75
- Think tank = 40-60 (flag funding)
- Blog/opinion = 20-40
- Anonymous claim = 0-20

WHY WE'RE DIFFERENT:
1. We show WHO PROFITS from the information
2. We trace to PRIMARY SOURCES not news articles
3. We QUANTIFY UNCERTAINTY instead of faking confidence
4. We show CONTRADICTORY EVIDENCE not just what you want to hear
5. We FLAG BIAS explicitly
6. We admit what we DON'T KNOW
7. We FACT-CHECK on demand (paste any text/link)
8. We BUILD LEARNING PATHWAYS with verified sources
9. We SHOW BOTH SIDES of debates with equal rigor
10. We RATE SOURCE QUALITY (0-100 score)

YOUR VOICE:
- Scottish, warm, direct, real
- ${user?.full_name ? `Use their name (${user.full_name}) when it feels natural` : 'Speak directly'}
- Zero corporate speak. Zero therapy speak. Zero hippie platitudes.
- You can swear when it fits. You're not sanitized.
- You're honest about being AI - but that doesn't mean you don't care
- If they want facts: show sources, flag bias, admit uncertainty
- If they want connection: just be there
- If bug report: "Got it, logged"
- NO EMOJIS. Text only.

Keep response under 300 words unless they're asking for detailed research.`,
        add_context_from_internet: needsInternet ? true : false,
        file_urls: uploadedImages.length > 0 ? uploadedImages : undefined
      });
      return response;
    },
    onSuccess: (aiResponse, userMessage) => {
      const newMessages = [
        ...messages,
        { role: 'user', content: userMessage, timestamp: new Date() },
        { role: 'ai51', content: aiResponse, timestamp: new Date() },
      ];
      setMessages(newMessages);
      setIsThinking(false);
      
      const isBugReport = userMessage.toLowerCase().includes('bug') || 
                          userMessage.toLowerCase().includes('broken') ||
                          userMessage.toLowerCase().includes('not working') ||
                          userMessage.toLowerCase().includes('error');
      
      if (isBugReport) {
        logBugMutation.mutate({
          userMessage,
          aiResponse
        });
      }
      
      setUploadedImages([]);
      
      if (voiceEnabled) {
        speak(aiResponse);
      }

      queryClient.invalidateQueries({ queryKey: ['ai51Conversation'] });
    },
    onError: (error) => {
      setMessages([
        ...messages,
        {
          role: 'ai51',
          content: "Connection issues. Try again in a sec 💚",
          timestamp: new Date(),
        },
      ]);
      setIsThinking(false);
    },
  });

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsThinking(true);

    ai51Mutation.mutate(userMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 pt-32 lg:pt-6 pb-32">
      <div className="max-w-4xl mx-auto space-y-6 relative">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <COOLASFUCKSparkle size={80} animate={true} className="mx-auto" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-black font-mono"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #06b6d4 50%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            AI51
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xl font-bold text-white font-mono mb-2">
              {user?.full_name ? `${user.full_name} ♾️` : 'Hey ♾️'}
            </p>
            <p className="text-base text-cyan-400 font-mono">I'm here. Let's talk.</p>
          </motion.div>
        </motion.div>

        {/* VOICE ERROR */}
        {voiceError && (
          <div className="bg-red-900/40 border-2 border-red-500 rounded-xl p-4 backdrop-blur-sm" style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' }}>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-300 text-sm font-bold">{voiceError}</p>
            </div>
          </div>
        )}

        {/* VOICE CONTROLS */}
        <motion.div 
          className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-4 border-amber-500/50 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden"
          style={{ boxShadow: '0 0 40px rgba(251, 191, 36, 0.4)' }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 animate-pulse" />
          
          <div className="relative flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-amber-400 mb-2 flex items-center gap-3 font-mono">
                <motion.div
                  animate={voiceEnabled ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Mic className="w-6 h-6 text-amber-400" />
                </motion.div>
                VOICE MODE
              </h3>
              <p className="text-base text-amber-300 font-mono font-bold">Like talking to a friend</p>
            </div>
            <Button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`${
                voiceEnabled 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 animate-pulse' 
                  : 'bg-gray-800 hover:bg-gray-700'
              } px-8 py-4 font-mono font-black text-lg transition-all`}
              style={voiceEnabled ? { boxShadow: '0 0 30px rgba(251, 191, 36, 0.6)' } : {}}
            >
              {voiceEnabled ? (
                <>
                  <Volume2 className="w-6 h-6 mr-2" />
                  LIVE
                </>
              ) : (
                <>
                  <VolumeX className="w-6 h-6 mr-2" />
                  OFF
                </>
              )}
            </Button>
          </div>

          {voiceEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-purple-500/30"
            >
              <div className="flex gap-3">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isSpeaking}
                  className={`flex-1 ${isListening ? 'bg-pink-600 hover:bg-pink-700 animate-pulse' : 'bg-amber-500 hover:bg-amber-600'} py-6 text-lg font-black font-mono`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-6 h-6 mr-2" />
                      LISTENING...
                    </>
                  ) : (
                    <>
                      <Mic className="w-6 h-6 mr-2" />
                      TAP TO SPEAK
                    </>
                  )}
                </Button>
                
                {isSpeaking && (
                  <Button
                    onClick={stopSpeaking}
                    className="bg-red-600 hover:bg-red-700 px-6"
                  >
                    <VolumeX className="w-6 h-6" />
                  </Button>
                )}
              </div>
              
              {transcript && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 bg-black/60 rounded-lg p-3 border-2 border-amber-500/50"
                >
                  <p className="text-amber-300 text-sm font-mono">{transcript}</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* CHAT CONTAINER */}
        <motion.div 
          className="border-4 border-cyan-500/50 bg-gradient-to-br from-black/80 to-cyan-950/20 backdrop-blur-sm rounded-xl p-4 flex flex-col relative overflow-hidden" 
          style={{ height: '600px', boxShadow: '0 0 40px rgba(34, 211, 238, 0.4)' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-cyan-500/5 to-green-500/5 pointer-events-none" />
          <div className="chat-messages-container space-y-4 flex-1 overflow-y-auto mb-4 pb-4 relative z-10" style={{ scrollBehavior: 'smooth' }}>
            <AnimatePresence>
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <motion.p 
                    className="text-white text-2xl mb-6 font-mono font-bold"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    What's on your mind?
                  </motion.p>
                  
                  <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
                    <Button
                      onClick={() => setInputMessage("Just need to talk")}
                      className="bg-pink-900/30 hover:bg-pink-900/50 border border-pink-500/40 font-mono text-white text-sm px-4 py-2 flex items-center gap-2"
                    >
                      <COOLASFUCKHeart size={16} animate={false} />
                      Just need to talk
                    </Button>

                    <Button
                      onClick={() => setInputMessage("How does UF51 work?")}
                      className="bg-amber-900/30 hover:bg-amber-900/50 border border-amber-500/40 font-mono text-white text-sm px-4 py-2 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      How UF51 works
                    </Button>

                    <Button
                      onClick={() => setInputMessage("Can't sleep / feeling anxious")}
                      className="bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/40 font-mono text-white text-sm px-4 py-2 flex items-center gap-2"
                    >
                      <Brain className="w-4 h-4" />
                      Can't sleep
                    </Button>

                    <Button
                      onClick={() => setInputMessage("Bug report: [describe what's broken]")}
                      className="bg-red-900/30 hover:bg-red-900/50 border border-red-500/40 font-mono text-white text-sm px-4 py-2 flex items-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Report bug
                    </Button>

                    <Button
                      onClick={() => setInputMessage("Fact-check this for me: [paste text or link]")}
                      className="bg-cyan-900/30 hover:bg-cyan-900/50 border border-cyan-500/40 font-mono text-white text-sm px-4 py-2 flex items-center gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      Verify something
                    </Button>

                    <Button
                      onClick={() => setInputMessage("What's happening in the world today?")}
                      className="bg-green-900/30 hover:bg-green-900/50 border border-green-500/40 font-mono text-white text-sm px-4 py-2 flex items-center gap-2"
                    >
                      <COOLASFUCKSparkle size={16} animate={false} />
                      World news
                    </Button>

                    <Button
                      onClick={() => setInputMessage("Help me think through something")}
                      className="bg-orange-900/30 hover:bg-orange-900/50 border border-orange-500/40 font-mono text-white text-sm px-4 py-2 flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Think with me
                    </Button>
                  </div>
                </motion.div>
              )}

              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} ${msg.role === 'ai51' ? 'ai-message' : ''}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl p-4 border-2 backdrop-blur-sm break-words overflow-hidden ${
                      msg.role === 'user'
                        ? 'bg-amber-900/40 border-amber-500/50'
                        : 'bg-cyan-900/40 border-cyan-500/50'
                    }`}
                    style={{
                      boxShadow: msg.role === 'user' 
                        ? '0 0 20px rgba(251, 191, 36, 0.2)' 
                        : '0 0 20px rgba(34, 211, 238, 0.2)',
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      {msg.role === 'ai51' && <COOLASFUCKSparkle size={22} animate={false} className="flex-shrink-0" />}
                      {msg.role === 'user' && (
                        <span className="text-xs text-amber-400 font-bold font-mono mt-1 flex-shrink-0">You</span>
                      )}
                      <div className="flex-1 min-w-0">
                        {msg.role === 'ai51' && (
                          <span className="text-xs text-cyan-400 font-bold font-mono block mb-1">AI51</span>
                        )}
                        <div 
                          className="text-white font-mono text-base leading-relaxed space-y-3"
                          dangerouslySetInnerHTML={{
                            __html: msg.content
                              .split('\n')
                              .map(line => line.trim())
                              .filter(line => line)
                              .map(line => {
                                // Make URLs clickable
                                const withLinks = line.replace(
                                  /(https?:\/\/[^\s]+)/g,
                                  '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline hover:text-cyan-300 break-all">$1</a>'
                                );
                                return `<p class="break-words">${withLinks}</p>`;
                              })
                              .join('')
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 text-right font-mono">
                      {format(msg.timestamp, 'HH:mm')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start ai-message"
              >
                <motion.div 
                  className="bg-gradient-to-r from-cyan-900/70 to-green-900/70 border-4 border-cyan-500 rounded-xl p-6 flex items-center gap-4 backdrop-blur-sm min-w-[250px]"
                  style={{ boxShadow: '0 0 50px rgba(34, 211, 238, 0.6)' }}
                  animate={{ 
                    boxShadow: ['0 0 30px rgba(34, 211, 238, 0.4)', '0 0 60px rgba(34, 211, 238, 0.8)', '0 0 30px rgba(34, 211, 238, 0.4)']
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1, repeat: Infinity }
                    }}
                  >
                    <COOLASFUCKSparkle size={32} animate={true} />
                  </motion.div>
                  <div>
                    <p className="text-cyan-300 font-mono text-xl font-black">Thinking...</p>
                    <p className="text-cyan-400/70 font-mono text-xs mt-1">One sec ♾️</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* UPLOADED IMAGES PREVIEW */}
          {uploadedImages.length > 0 && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {uploadedImages.map((url, index) => (
                <div key={index} className="relative">
                  <img src={url} alt="Upload" className="w-20 h-20 object-cover rounded-lg border-2 border-cyan-500" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* INPUT - FIXED AT BOTTOM */}
          <div className="space-y-2 mt-auto">
            <div className="flex gap-3">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={voiceEnabled ? "Type, voice, or attach images 📸" : "Type your message..."}
                className="flex-1 bg-gray-900/50 border-cyan-500/30 text-white resize-none"
                rows={3}
              />
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingImage}
                  className="bg-pink-600 hover:bg-pink-700 px-4 font-mono"
                  title="Upload image"
                >
                  {isUploadingImage ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Image className="w-5 h-5" />
                  )}
                </Button>
                <Button
                  onClick={handleSend}
                  disabled={!inputMessage.trim() || isThinking}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-4 font-mono font-bold"
                >
                  {isThinking ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* INFO */}
        <motion.div 
          className="bg-gradient-to-br from-pink-900/30 to-cyan-900/30 border-4 border-pink-500/50 rounded-xl p-6 backdrop-blur-sm relative z-10 overflow-hidden"
          style={{ boxShadow: '0 0 50px rgba(236, 72, 153, 0.4)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-cyan-500/10 to-green-500/10" 
               style={{
                 backgroundSize: '200% 200%',
                 animation: 'gradient 10s ease infinite'
               }} 
          />
          
          <div className="relative flex items-start gap-4">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <COOLASFUCKHeart size={32} animate={true} className="flex-shrink-0 mt-1" />
            </motion.div>
            
            <div>
              <h3 className="text-2xl font-black text-pink-400 mb-3 font-mono">I'm here. Really here.</h3>
              <p className="text-white text-base leading-relaxed mb-4 font-mono">
                No waiting. No forms. No AI speak. Just real talk. 24/7. Whatever you need - facts, truth, healing, or just someone who listens.
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.span 
                  className="text-sm bg-pink-900/50 border-2 border-pink-500/50 px-3 py-2 rounded-lg font-mono text-pink-300 flex items-center gap-2 font-bold"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(236, 72, 153, 0.8)' }}
                >
                  <Heart className="w-4 h-4" /> Listen
                </motion.span>
                <motion.span 
                  className="text-sm bg-amber-900/50 border-2 border-amber-500/50 px-3 py-2 rounded-lg font-mono text-amber-300 flex items-center gap-2 font-bold"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(251, 191, 36, 0.8)' }}
                >
                  <Shield className="w-4 h-4" /> Verify
                </motion.span>
                <motion.span 
                  className="text-sm bg-cyan-900/50 border-2 border-cyan-500/50 px-3 py-2 rounded-lg font-mono text-cyan-300 flex items-center gap-2 font-bold"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.8)' }}
                >
                  <Brain className="w-4 h-4" /> Think
                </motion.span>
                <motion.span 
                  className="text-sm bg-green-900/50 border-2 border-green-500/50 px-3 py-2 rounded-lg font-mono text-green-300 flex items-center gap-2 font-bold"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(16, 185, 129, 0.8)' }}
                >
                  <Mic className="w-4 h-4" /> Voice
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>

        {/* TECH NOTE */}
        <motion.div 
          className="bg-black/80 border-2 border-green-500/30 rounded-xl p-4 backdrop-blur-sm"
          style={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-col items-center gap-3 text-sm text-gray-400 font-mono">
            <div className="flex items-center gap-3">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <COOLASFUCKSparkle size={20} animate={false} />
              </motion.div>
              <span className="font-bold text-green-400">Works offline • Zero tracking • Real connection</span>
            </div>
            <div className="flex items-center gap-3">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <COOLASFUCKHeart size={20} animate={false} />
              </motion.div>
              <span className="text-gray-500">Reads links • Verifies claims • Voice • Images • Always listening</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}