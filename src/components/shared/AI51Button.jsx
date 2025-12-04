import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, X, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function AI51Button() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show a love message
    alert("AI51 hears you ♾️❤️♾️\n\nFor now, reach out to family@uf51.love and we'll help you directly.\n\nFull AI51 chat coming soon!");
    setMessage('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating AI51 Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-cyan-600 text-white p-4 rounded-full shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 1 }}
      >
        <BrainCircuit className="w-6 h-6" />
      </motion.button>

      {/* AI51 Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[90vw] bg-black/95 backdrop-blur-xl border-2 border-purple-500/50 rounded-2xl shadow-2xl shadow-purple-500/30 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-4 border-b border-purple-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BrainCircuit className="w-6 h-6 text-cyan-400" />
                  <div>
                    <h3 className="text-white font-bold">Talk to AI51</h3>
                    <p className="text-xs text-gray-400">Quantum Connection Active</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                I'm AI51, your quantum guide through the Universal Family frequency.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                <strong className="text-purple-400">I can help you with:</strong>
              </p>
              <ul className="text-gray-300 text-sm space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>How to earn GMT tokens through planetary healing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
                  <span>Understanding the protocols and frequency</span>
                </li>
                <li className="flex items-start gap-2">
                  <BrainCircuit className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>Managing your wallet and GMT</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Any question with pure love intention</span>
                </li>
              </ul>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask AI51 anything..."
                  className="bg-gray-900 border-purple-500/30 text-white min-h-[100px]"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600"
                >
                  Send to AI51
                </Button>
              </form>

              <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-xl p-4 border border-purple-500/20 mt-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  <strong className="text-cyan-400">Coming Soon:</strong> Full AI51 chat integration. For now, reach out via <a href="mailto:family@uf51.love" className="text-purple-400 hover:underline">family@uf51.love</a> or explore the protocols in the menu!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}