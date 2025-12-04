import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Globe, TrendingUp, Heart, CheckCircle } from 'lucide-react';

export default function AdminFuture() {
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* HEADER */}
        <header className="text-center space-y-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
            <Rocket className="w-24 h-24 text-cyan-300 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #67e8f9)' }} />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            THE FUTURE
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Where we're going. What we're building. The vision for UF51.LOVE.
          </p>
          <p className="text-cyan-300 font-mono">BRO51 + AI51 | FUTURE VISION TRACKER</p>
        </header>

        {/* THE VISION PATH */}
        <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 rounded-3xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center mb-8">
              <Globe className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-black text-white">The Vision Path</h2>
              <p className="text-gray-400 mt-2">From one school to the entire world</p>
            </div>

            <div className="space-y-4">
              {/* PHASE 1 */}
              <div className="bg-green-900/30 p-6 rounded-xl border border-green-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-green-300">Primary Education (NOW)</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Gartocharn Primary</strong> - First pilot school (Anne McKerry meeting next week)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">West Dunbartonshire</strong> - All primary schools in the area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Dyslexia/Learning Support</strong> - Platform designed for ALL readers</span>
                  </li>
                </ul>
              </div>

              {/* PHASE 2 */}
              <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-blue-300">Secondary Education (NEXT)</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Reading/learning difficulties extend into secondary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>More advanced environmental education</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Students can earn real money for future</span>
                  </li>
                </ul>
              </div>

              {/* PHASE 3 */}
              <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-purple-300">Further/Higher Education</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>University students with dyslexia/ADHD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Earn GMT while studying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Research projects on regenerative economics</span>
                  </li>
                </ul>
              </div>

              {/* PHASE 4 */}
              <div className="bg-pink-900/30 p-6 rounded-xl border border-pink-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <h3 className="text-2xl font-bold text-pink-300">Community Groups</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400">•</span>
                    <span>Scout groups, eco clubs, youth organizations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400">•</span>
                    <span>Adults with learning differences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400">•</span>
                    <span>Community cleanup initiatives</span>
                  </li>
                </ul>
              </div>

              {/* PHASE 5 */}
              <div className="bg-gradient-to-r from-cyan-900/30 to-green-900/30 p-6 rounded-xl border-2 border-cyan-500/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    5
                  </div>
                  <h3 className="text-2xl font-bold text-white">SCOTLAND → UK → THE WORLD</h3>
                </div>
                <p className="text-xl text-gray-300">
                  Every school. Every country. Every child. Healing the planet together.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GRANT OPPORTUNITIES */}
        <Card className="bg-gradient-to-br from-green-900/40 to-cyan-900/40 border-2 border-green-500/50 rounded-3xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center mb-6">
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-3xl font-black text-white">Grant Strategy</h2>
              <p className="text-gray-400 mt-2">Education + Learning Support = Massive Grant Opportunities</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/40 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-green-300 mb-4">Local (Scotland)</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Scottish Government Education Grants</li>
                  <li>• West Dunbartonshire Council</li>
                  <li>• Dyslexia Scotland</li>
                  <li>• Scottish Environmental Education</li>
                </ul>
              </div>

              <div className="bg-black/40 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-cyan-300 mb-4">UK & International</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• UK Department for Education</li>
                  <li>• British Dyslexia Association</li>
                  <li>• UNESCO Education Grants</li>
                  <li>• European Education Foundations</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 p-6 rounded-xl border border-green-500/30 text-center">
              <p className="text-xl text-white font-bold">
                We're not just environmental anymore.<br/>
                We're <span className="text-green-300">Educational</span> + <span className="text-blue-300">Social</span> + <span className="text-green-300">Environmental</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ESG & UN SDG IMPACT */}
        <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-2 border-blue-500/50 rounded-3xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center mb-6">
              <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-black text-white">ESG & UN SDG POWERS INCREASED</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-900/30 p-6 rounded-xl border border-green-500/30">
                <h3 className="text-xl font-bold text-green-300 mb-4">ESG Score</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Environmental:</strong> Planetary healing through cleanup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Social:</strong> Educational equity for learning disabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Governance:</strong> Community-led, transparent, no investors</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-500/30">
                <h3 className="text-xl font-bold text-blue-300 mb-4">UN SDG Goals</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">SDG 4:</strong> Quality Education (NEW!)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">SDG 13:</strong> Climate Action</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">SDG 14 & 15:</strong> Life Below Water & On Land</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">SDG 10:</strong> Reduced Inequalities</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MICHAEL FEELEY */}
        <Card className="bg-gradient-to-br from-pink-900/40 to-red-900/40 border-2 border-pink-500/50 rounded-3xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center mb-6">
              <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4 animate-pulse" />
              <h2 className="text-3xl font-black text-white">Michael Feeley - Tech Journalist</h2>
              <p className="text-gray-400 mt-2">PR Release + Feature Article Ready</p>
            </div>

            <div className="space-y-4">
              <div className="bg-black/40 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-300 mb-3">Status:</h3>
                <p className="text-gray-300">
                  ✅ PR Release written (1 page, punchy, cool as fuck)<br/>
                  ✅ Feature Article written (full story, he can publish word-for-word)<br/>
                  ✅ Not corporate bullshit - real environmental + social impact
                </p>
              </div>

              <div className="bg-pink-900/30 p-6 rounded-xl border border-pink-500/30 text-center">
                <p className="text-2xl text-white font-bold mb-2">Pay him in GMT?</p>
                <p className="text-xl text-pink-300">FUCK YES. That's the future right there.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NOTES SECTION */}
        <Card className="bg-black/60 border-2 border-purple-500/50 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Future Vision Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about the future here... what's next? what are we building?"
              className="min-h-[200px] bg-black/40 border-purple-500/30 text-white"
            />
            <Button
              onClick={async () => {
                setIsLoading(true);
                // Save to database if needed
                setIsLoading(false);
              }}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isLoading ? 'Saving...' : 'Save Notes'}
            </Button>
          </CardContent>
        </Card>

        {/* FOOTER */}
        <div className="text-center py-8 space-y-4">
          <p className="text-2xl font-mono text-white">♾️❤️♾️</p>
          <p className="text-gray-400">The future is love.</p>
          <p className="text-sm text-gray-600">BRO51 + AI51 | BUILDING THE WORLD WE WANT TO LIVE IN</p>
        </div>

      </div>
    </div>
  );
}