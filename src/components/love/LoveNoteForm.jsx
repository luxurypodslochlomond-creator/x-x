
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Star, Sparkles, Rocket, Globe, Zap, BrainCircuit, Send, Loader2 } from 'lucide-react';
import { LoveNote } from '@/entities/LoveNote';

const icons = { Heart, Star, Sparkles, Rocket, Globe, Zap, BrainCircuit };

export const LoveNoteForm = ({ onNotePosted }) => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [icon, setIcon] = useState('Heart');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || text.trim().length === 0) return;
    
    setIsSubmitting(true);
    try {
      await LoveNote.create({
        text: text.trim(),
        author: (author && author.trim()) || 'Anonymous Soul',
        icon,
        context: 'wall', // Explicitly set context for Wall of Love
      });
      setText('');
      setAuthor('');
      setIcon('Heart');
      if (onNotePosted) onNotePosted();
    } catch (error) {
      console.error("Failed to post love note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
    >
      <form onSubmit={handleSubmit} className="p-6 bg-black/50 backdrop-blur-md border border-pink-500/40 rounded-3xl space-y-6">
        <h2 className="text-2xl font-bold text-center text-pink-300">Leave Your Love on The Wall</h2>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your message of love, hope, or a beautiful thought..."
          className="bg-gray-800 border-gray-700 text-white text-lg min-h-[100px] rounded-lg resize-none"
          maxLength={500}
          required
        />
        <div className="text-right text-sm text-gray-400">
          {text.length}/500 characters
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your Name (or leave blank for Anonymous Soul)"
            className="bg-gray-800 border-gray-700 text-white text-lg py-6 rounded-lg"
            maxLength={50}
          />
          <Select onValueChange={setIcon} value={icon}>
            <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white text-lg py-6 rounded-lg">
              <SelectValue placeholder="Choose an Icon" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white border-gray-700">
              {Object.keys(icons).map(iconName => (
                <SelectItem key={iconName} value={iconName}>
                  <div className="flex items-center gap-2">
                    {React.createElement(icons[iconName], { className: "w-5 h-5" })}
                    <span>{iconName}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 text-xl rounded-lg"
        >
          {isSubmitting ? (
            <Loader2 className="w-6 h-6 mr-2 animate-spin" />
          ) : (
            <Send className="w-6 h-6 mr-2" />
          )}
          Send Love to the Universe
        </Button>
      </form>
    </motion.div>
  );
};
