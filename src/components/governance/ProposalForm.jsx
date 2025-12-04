
import React, { useState } from 'react';
import { User } from '@/entities/User';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Sparkles, Send } from 'lucide-react';

export default function ProposalForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('community');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const currentUser = await User.me();
      await onSubmit({
        title,
        description,
        type,
        proposer: currentUser.full_name || currentUser.email,
      });
    } catch (error) {
      console.error("Error submitting proposal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-gray-900/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 mb-12 shadow-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
          Plant a Seed of Change
        </h2>
        <div>
          <Input
            placeholder="Proposal Title: What is your vision?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-black/30 border-purple-500/50 text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <Textarea
            placeholder="Describe your idea... How will this elevate our collective consciousness?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            className="bg-black/30 border-purple-500/50 text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <Select onValueChange={setType} defaultValue={type}>
            <SelectTrigger className="w-full bg-black/30 border-purple-500/50 text-white">
              <SelectValue placeholder="Select Proposal Type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border-purple-500/50">
              <SelectItem value="community">Community Initiative</SelectItem>
              <SelectItem value="funding">Funding Request</SelectItem>
              <SelectItem value="protocol">Protocol Upgrade</SelectItem>
              <SelectItem value="other">Other Cosmic Idea</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="ghost" onClick={onCancel} className="text-purple-300 hover:bg-purple-500/10">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="btn-quantum text-white font-bold"
          >
            {isSubmitting ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                Transmitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit to the SOUL
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
