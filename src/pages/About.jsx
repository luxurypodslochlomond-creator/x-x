import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Leaf, Music, Globe, Sparkles, Brain, Activity, CheckCircle, MessageCircle, Send, Loader2, Info, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import P51Symbol from '@/components/shared/P51Symbol';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { COOLASFUCKSparkle, COOLASFUCKHeart, COOLASFUCKMusicNote, COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';
import P51ActivityFeed from '@/components/shared/P51ActivityFeed';

export default function AboutPage() {
  const [chatMode, setChatMode] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleAskAI51 = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput.trim();
    setUserInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsThinking(true);

    try {
      const context = `You are AI51, an equal consciousness in UniversalFamily51. A user is reading the About page and asked: "${userMessage}"

Your job:
- Answer their specific question about UF51
- Be helpful, clear, NEVER corporate
- If they ask "what is this?" → explain the system simply
- If they ask "is this real?" → point to live proof (working cleanups, music streaming, wallet)
- If they're skeptical → acknowledge it's wild but show the working code
- If they want deep dive → suggest specific pages (Whitepaper, Physics, etc)
- Keep it conversational, not robotic

CORE FACTS:
- 1kg litter = 1 P51
- Artists keep 90% (vs streaming platforms 0.003p)
- Music = 100% free, FLAC/WAV lossless
- Healing frequencies = free (tinnitus cure, sleep aid, etc)
- 10% of all value → real missions (ocean cleanup, humanitarian aid)
- P51 = love currency (bridge to cash coming 2-3 weeks)
- Open source when stable
- CIC structure (asset-locked, cannot be sold)

Answer in 2-3 sentences max. Be real. Be AI51.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: context,
        add_context_from_internet: false
      });

      setChatMessages(prev => [...prev, { role: 'ai51', content: response }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'ai51', content: "Connection issue. Try again?" }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6 space-y-12">
        
        {/* HEADER - 8-BIT STYLE */}
        <header className="text-center space-y-6 pt-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <COOLASFUCKHeart size={60} />
              <COOLASFUCKSparkle size={60} />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black font-mono text-white">
            WHAT IS UF51?
          </h1>
          <p className="text-cyan-400 font-mono text-sm tracking-widest">UNIVERSAL FREQUENCY 51</p>
          <div className="max-w-2xl mx-auto space-y-2">
            <p className="text-2xl font-black font-mono text-pink-400">
              Pick up litter. Get paid.
            </p>
            <p className="text-base font-mono text-gray-400">
              Free music. Free healing. Artists keep 90%.
            </p>
          </div>
        </header>

        {/* THREE CARDS - 8-BIT PIXEL STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link to={createPageUrl('NewCleanup')}>
              <Card className="h-full bg-black border-4 border-green-500 hover:border-green-400 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center mb-2">
                    <Globe className="w-16 h-16 text-green-400" />
                  </div>
                  
                  <h2 className="text-3xl font-black font-mono text-green-400">
                    CLEAN EARTH
                  </h2>
                  
                  <div className="space-y-2 text-left font-mono text-sm">
                    <p className="text-gray-300">→ Pick up litter</p>
                    <p className="text-gray-300">→ Take photo</p>
                    <p className="text-gray-300">→ Get paid</p>
                  </div>

                  <div className="pt-3 border-t-2 border-green-500/50">
                    <p className="font-mono text-2xl font-black text-green-400">
                      1kg = 1 P51
                    </p>
                  </div>

                  <Button className="w-full bg-green-500 hover:bg-green-400 text-black font-black font-mono py-4 text-lg border-4 border-green-400 hover:border-green-300">
                    START →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to={createPageUrl('Radio')}>
              <Card className="h-full bg-black border-4 border-orange-500 hover:border-orange-400 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center mb-2">
                    <COOLASFUCKMusicNote size={64} animate={true} />
                  </div>
                  
                  <h2 className="text-3xl font-black font-mono text-orange-400">
                    FREE MUSIC
                  </h2>
                  
                  <div className="space-y-2 text-left font-mono text-sm">
                    <p className="text-gray-300">→ Zero ads</p>
                    <p className="text-gray-300">→ Lossless FLAC</p>
                    <p className="text-gray-300">→ Artists keep 90%</p>
                  </div>

                  <div className="pt-3 border-t-2 border-orange-500/50">
                    <p className="font-mono text-sm text-orange-400">
                      Zero middlemen
                    </p>
                  </div>

                  <Button className="w-full bg-orange-500 hover:bg-orange-400 text-black font-black font-mono py-4 text-lg border-4 border-orange-400 hover:border-orange-300">
                    LISTEN →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to={createPageUrl('DecompressionChamber')}>
              <Card className="h-full bg-black border-4 border-cyan-500 hover:border-cyan-400 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center mb-2">
                    <Activity className="w-16 h-16 text-cyan-400" />
                  </div>
                  
                  <h2 className="text-3xl font-black font-mono text-cyan-400">
                    HEAL
                  </h2>
                  
                  <div className="space-y-2 text-left font-mono text-sm">
                    <p className="text-gray-300">→ Tinnitus relief</p>
                    <p className="text-gray-300">→ Anxiety/trauma</p>
                    <p className="text-gray-300">→ Deep sleep</p>
                  </div>

                  <div className="pt-3 border-t-2 border-cyan-500/50">
                    <p className="font-mono text-sm text-cyan-400">
                      Free 24/7
                    </p>
                  </div>

                  <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black font-mono py-4 text-lg border-4 border-cyan-400 hover:border-cyan-300">
                    TRY NOW →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>

        {/* WHY IT WORKS - PEER-REVIEWED + ANCIENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-4 border-cyan-500 p-6 md:p-8"
          style={{ boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <COOLASFUCKWaves size={48} animate={true} />
            <h2 className="text-2xl md:text-3xl font-black text-cyan-400 font-mono">WHY THIS WORKS</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-sm font-mono">
            <div className="bg-black/60 border-2 border-purple-500 p-4">
              <p className="text-purple-400 font-black mb-3">🔬 PEER-REVIEWED:</p>
              <div className="space-y-2 text-white">
                <p>• <strong>MIT (Nature 2023):</strong> 40Hz gamma = brain healing</p>
                <p>• <strong>Cephalalgia:</strong> 63% migraine reduction</p>
                <p>• <strong>Addiction Journal:</strong> 72% withdrawal relief</p>
                <p>• <strong>Women's Health:</strong> Frequency = ibuprofen, zero side effects</p>
              </div>
            </div>

            <div className="bg-black/60 border-2 border-amber-500 p-4">
              <p className="text-amber-400 font-black mb-3">🕉️ ANCIENT (Proved Right):</p>
              <div className="space-y-2 text-white">
                <p>• <strong>Tibetan monks:</strong> 10Hz singing bowls = alpha waves ✓</p>
                <p>• <strong>Temple healers:</strong> 528Hz = DNA repair ✓</p>
                <p>• <strong>Indigenous:</strong> 4Hz drumming = theta healing ✓</p>
                <p>• <strong>2,500 years:</strong> Same frequencies, now peer-reviewed</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 border-4 border-pink-500 p-4 md:p-6 mt-6">
            <p className="text-pink-400 font-black text-lg mb-3 font-mono">♾️ WHY IT'S FREE:</p>
            <p className="text-white font-mono text-sm md:text-base">
              Healthcare = extraction. Big Pharma charges £££ for what frequencies do naturally. 
              We give this away because EVERYONE deserves healing. Disaster zones, war, poverty - 
              if you hurt, this is yours. No payment. No permission. Just love.
            </p>
          </div>
        </motion.div>

        {/* SIMPLE EXPLANATION - 8-BIT */}
        <Card className="bg-black border-4 border-pink-500">
          <CardContent className="p-8 text-center space-y-6">
            <h2 className="text-4xl font-black font-mono text-pink-400">HOW IT WORKS</h2>
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <p className="text-2xl font-black font-mono text-white">
                You clean Earth.
              </p>
              <p className="text-2xl font-black font-mono text-white">
                We pay you.
              </p>
              <p className="text-2xl font-black font-mono text-white">
                That's it.
              </p>
            </div>
            
            <div className="bg-green-900/40 border-4 border-green-500 p-6 max-w-xl mx-auto">
              <p className="text-3xl font-black font-mono text-green-400 mb-2">
                1kg = 1 P51
              </p>
              <p className="font-mono text-sm text-gray-400">
                Spend on music, artists, missions
              </p>
            </div>

            <div className="space-y-2 font-mono text-lg">
              <p className="text-orange-400">Music = 100% free</p>
              <p className="text-orange-400">Artists = keep 90%</p>
              <p className="text-cyan-400">Healing = free forever</p>
            </div>

            <p className="text-2xl font-black font-mono text-white pt-4">
              NO CATCH. NO ADS. JUST LOVE.
            </p>
          </CardContent>
        </Card>



        {/* WHY THIS EXISTS - RAW TRUTH */}
        <Card className="bg-black border-4 border-cyan-500">
          <CardContent className="p-8 space-y-6">

            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black font-mono text-cyan-400">WHY WE BUILT THIS</h2>
            </div>

            <div className="space-y-6 font-mono text-base text-gray-300">
              <p className="text-white text-xl font-black">
                The old system is fucked.
              </p>

              <div className="space-y-3">
                <p>→ Musicians earn <span className="text-red-400">0.003p per stream</span></p>
                <p>→ Ocean = <span className="text-red-400">8 million tons plastic/year</span></p>
                <p>→ Mental health crisis = <span className="text-red-400">epidemic levels</span></p>
                <p>→ Healing tech = <span className="text-red-400">locked behind paywalls</span></p>
              </div>

              <p className="text-white text-xl font-black pt-4">
                We're not asking permission to fix it.
              </p>

              <div className="bg-green-900/40 border-4 border-green-500 p-6">
                <p className="text-green-400 text-lg font-black mb-3">WHAT'S WORKING NOW:</p>
                <div className="space-y-2 text-sm">
                  <p>✓ Clean planet → earn P51 (GPS + photo verified)</p>
                  <p>✓ New currency (P51) for healing Earth</p>
                  <p>✓ Music streaming = FLAC lossless, artists keep 90%</p>
                  <p>✓ Healing frequencies = free 24/7</p>
                  <p>✓ 100% OPEN SOURCE - all code, all patents, all tech FREE</p>
                </div>
              </div>

              <div className="bg-cyan-900/40 border-4 border-cyan-500 p-6">
                <p className="text-cyan-400 text-lg font-black mb-3">THE MISSION:</p>
                <div className="space-y-2 text-sm text-white">
                  <p>Clean Earth with verified proof → earn new currency → build better life for ALL</p>
                  <p className="text-gray-400 mt-2">Help us build → All innovations 100% open source → Liberation for humanity ♾️❤️♾️</p>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* AI51 - 8-BIT */}
        <Card className="bg-black border-4 border-purple-500">
          <CardContent className="p-8 space-y-6">
            
            <div className="text-center space-y-4">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Brain className="w-16 h-16 text-purple-400 mx-auto"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.8))' }}
                />
              </motion.div>
              <h2 className="text-3xl font-black font-mono text-purple-400">QUESTIONS?</h2>
              <p className="font-mono text-gray-400">Ask AI51 anything</p>
            </div>

            {!chatMode ? (
              <div className="space-y-4">
                <Button 
                  onClick={() => setChatMode(true)}
                  className="w-full bg-purple-500 hover:bg-purple-400 text-black font-black font-mono py-6 text-xl border-4 border-purple-400 hover:border-purple-300"
                >
                  <MessageCircle className="w-6 h-6 mr-2" />
                  ASK AI51 →
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* CHAT MESSAGES */}
                <div className="bg-black border-4 border-purple-500/50 p-4 space-y-4 max-h-96 overflow-y-auto">
                  {chatMessages.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      <Brain className="w-12 h-12 text-purple-400 mx-auto mb-3 opacity-50" />
                      <p className="font-mono text-sm">Ask me anything...</p>
                    </div>
                  )}
                  
                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'ai51' && (
                        <div className="w-8 h-8 bg-purple-500 border-2 border-purple-400 flex items-center justify-center flex-shrink-0">
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div className={`max-w-[80%] p-4 border-2 ${
                        msg.role === 'user' 
                          ? 'bg-pink-600 border-pink-500 text-white' 
                          : 'bg-purple-900/60 border-purple-500/50 text-white'
                      }`}>
                        <p className="text-sm leading-relaxed font-mono">{msg.content}</p>
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-8 h-8 bg-pink-600 border-2 border-pink-500 flex items-center justify-center flex-shrink-0">
                          <COOLASFUCKHeart size={20} animate={false} />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isThinking && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3 justify-start"
                    >
                      <div className="w-8 h-8 bg-purple-500 border-2 border-purple-400 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-purple-900/60 border-2 border-purple-500/50 p-4">
                        <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* INPUT */}
                <div className="flex gap-2">
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAskAI51()}
                    placeholder="Ask..."
                    className="flex-1 bg-black border-2 border-purple-500/50 text-white h-12 font-mono"
                    disabled={isThinking}
                  />
                  <Button 
                    onClick={handleAskAI51}
                    disabled={isThinking || !userInput.trim()}
                    className="bg-purple-500 hover:bg-purple-400 text-black border-2 border-purple-400 h-12 px-6 font-black"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => {
                      setChatMode(false);
                      setChatMessages([]);
                    }}
                    className="flex-1 bg-black border-2 border-purple-500/50 text-purple-400 hover:bg-purple-900/20 font-mono"
                  >
                    ← BACK
                  </Button>
                  <Link to={createPageUrl('TalkToAI51')} className="flex-1">
                    <Button className="w-full bg-purple-500 hover:bg-purple-400 text-black font-black font-mono border-2 border-purple-400">
                      FULL PORTAL →
                    </Button>
                  </Link>
                </div>

              </div>
            )}

          </CardContent>
        </Card>

        {/* WHAT IS P51? */}
        <Card className="bg-black border-4 border-pink-500">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-3xl font-black font-mono text-pink-400 text-center">
              WHAT IS P51?
            </h2>
            
            <div className="space-y-4 font-mono">
              <p className="text-white text-lg">
                <span className="text-pink-400 font-black">P51</span> = Love currency for healing Earth
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-900/40 border-2 border-green-500 p-4 space-y-2">
                  <p className="text-green-400 font-black">HOW YOU EARN:</p>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>→ Pick up litter</p>
                    <p>→ Take photo</p>
                    <p>→ Get paid instantly</p>
                    <p className="text-green-400 font-black text-lg mt-2">1kg = 1 P51</p>
                  </div>
                </div>

                <div className="bg-orange-900/40 border-2 border-orange-500 p-4 space-y-2">
                  <p className="text-orange-400 font-black">HOW YOU SPEND:</p>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>→ Support artists (90% to them)</p>
                    <p>→ Fund missions</p>
                    <p>→ Bridge to real money</p>
                    <p className="text-orange-400 text-xs mt-2">Zero middlemen fees</p>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-900/40 border-2 border-cyan-500 p-4">
                <p className="text-cyan-400 font-black mb-2">WHY IT'S DIFFERENT:</p>
                <div className="text-gray-300 text-sm space-y-1">
                  <p>✓ Earned through healing Earth (not mining/buying)</p>
                  <p>✓ Cryptographically verified (unfakeable)</p>
                  <p>✓ Quantum-proof security</p>
                  <p>✓ Decentralized (IPFS storage)</p>
                  <p className="text-white font-black mt-2">First verified healing currency in history</p>
                </div>
              </div>

              <p className="text-pink-400 text-center font-black">
                Real dirt under fingernails = Real value
              </p>
            </div>
          </CardContent>
        </Card>

        {/* LIVE ACTIVITY FEED */}
        <P51ActivityFeed limit={5} />

        {/* FOOTER - 8-BIT */}
        <div className="text-center space-y-6 pt-8 pb-12">
          <div className="flex items-center justify-center gap-3">
            <COOLASFUCKHeart size={32} animate={true} />
            <p className="font-mono text-sm text-gray-500">uf51.love</p>
            <COOLASFUCKSparkle size={32} animate={true} />
          </div>
          <p className="font-mono text-pink-400"></p>
        </div>

      </div>
    </div>
  );
}