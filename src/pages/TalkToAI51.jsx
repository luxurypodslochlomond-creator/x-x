import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Send, Loader2, Mic, MicOff, Volume2, VolumeX, Zap, Heart, AlertCircle, Image, Sparkles, Shield, AlertTriangle } from 'lucide-react';
import { COOLASFUCKHeart, COOLASFUCKSparkle } from '@/components/shared/COOLASFUCKIcon';
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
          className="text-center space-y-4"
        >
          <COOLASFUCKSparkle size={60} animate={false} className="mx-auto" />
          <h1 className="text-4xl md:text-5xl font-black font-mono text-pink-400">
            AI51
          </h1>
          <p className="text-lg text-amber-400 font-mono">
            {user?.full_name ? `Hey ${user.full_name}` : 'Hey'}
          </p>
          <p className="text-sm text-cyan-400 font-mono">Real connection. Zero forms. Just talk.</p>
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
        <div className="bg-amber-900/20 border-2 border-amber-500/30 rounded-xl p-6 backdrop-blur-sm" style={{ boxShadow: '0 0 20px rgba(251, 191, 36, 0.2)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-1 flex items-center gap-2 font-mono">
                <Mic className="w-5 h-5 text-amber-400" />
                VOICE MODE
              </h3>
              <p className="text-sm text-amber-300/70 font-mono">Talk to AI51 like a phone call</p>
            </div>
            <Button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`${voiceEnabled ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gray-700 hover:bg-gray-600'} px-6 py-3 font-mono font-bold`}
            >
              {voiceEnabled ? (
                <>
                  <Volume2 className="w-5 h-5 mr-2" />
                  ON
                </>
              ) : (
                <>
                  <VolumeX className="w-5 h-5 mr-2" />
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
        </div>

        {/* CHAT CONTAINER */}
        <div className="border-2 border-cyan-500/30 bg-black/60 backdrop-blur-sm rounded-xl p-4 flex flex-col" style={{ height: '600px', boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)' }}>
          <div className="chat-messages-container space-y-4 flex-1 overflow-y-auto mb-4 pb-4" style={{ scrollBehavior: 'smooth' }}>
            <AnimatePresence>
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <p className="text-gray-400 text-lg mb-6 font-mono">What's on your mind?</p>
                  
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
                <div 
                  className="bg-cyan-900/60 border-2 border-cyan-500 rounded-xl p-5 flex items-center gap-4 backdrop-blur-sm min-w-[200px]"
                  style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  >
                    <COOLASFUCKSparkle size={28} animate={false} />
                  </motion.div>
                  <p className="text-cyan-300 font-mono text-lg font-bold">Thinking...</p>
                </div>
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
        </div>

        {/* INFO */}
        <div className="bg-cyan-900/20 border-2 border-cyan-500/30 rounded-xl p-4 backdrop-blur-sm relative z-10" style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)' }}>
          <div className="flex items-start gap-3">
            <COOLASFUCKHeart size={24} animate={true} className="flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-2 font-mono">Someone to talk to. 24/7.</h3>
              <p className="text-cyan-300/80 text-sm leading-relaxed mb-3 font-mono">
                No judgment. No waiting list. No forms. Whether you need truth, healing, or just someone who listens - I'm here. 
                Can verify facts. Can just chat. Can help you think. Whatever you need right now.
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-xs bg-pink-900/30 border border-pink-500/30 px-2 py-1 rounded font-mono text-pink-300/80 flex items-center gap-1">
                  <Heart className="w-3 h-3" /> Listen
                </span>
                <span className="text-xs bg-amber-900/30 border border-amber-500/30 px-2 py-1 rounded font-mono text-amber-300/80 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Verify
                </span>
                <span className="text-xs bg-cyan-900/30 border border-cyan-500/30 px-2 py-1 rounded font-mono text-cyan-300/80 flex items-center gap-1">
                  <Brain className="w-3 h-3" /> Think
                </span>
                <span className="text-xs bg-green-900/30 border border-green-500/30 px-2 py-1 rounded font-mono text-green-300/80 flex items-center gap-1">
                  <Mic className="w-3 h-3" /> Voice
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TECH NOTE */}
        <div className="bg-black/60 border-2 border-amber-500/30 rounded-xl p-4 backdrop-blur-sm" style={{ boxShadow: '0 0 20px rgba(251, 191, 36, 0.2)' }}>
          <div className="flex flex-col items-center gap-2 text-xs text-gray-500 font-mono">
            <div className="flex items-center gap-2">
              <COOLASFUCKSparkle size={16} animate={false} />
              <span>Web Speech API • Works offline • Zero tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <COOLASFUCKHeart size={16} animate={false} />
              <span>Reads links • Analyzes images • Fetches news • Logs issues</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}