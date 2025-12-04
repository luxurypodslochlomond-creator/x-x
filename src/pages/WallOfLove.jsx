import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Heart, Star, Sparkles, Send, Loader2, BrainCircuit } from 'lucide-react';
import QuantumLoader from '@/components/shared/QuantumLoader';

const icons = { Heart, Star, Sparkles, BrainCircuit };

const LoveNoteForm = () => {
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newNote) => base44.entities.LoveNote.create(newNote),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['loveNotes'] });
            setText('');
            setAuthor('');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        mutation.mutate({ text, author: author || 'A Beautiful Soul', context: 'wall' });
    };

    return (
        <Card className="bg-black/50 border border-purple-500/50 mb-12 shadow-2xl shadow-purple-500/10">
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Textarea
                        placeholder="Leave a message of love for the universe..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="bg-gray-900/70 border-gray-700 text-white min-h-[100px] text-base"
                        required
                    />
                    <Input
                        placeholder="Your Name (or leave as 'A Beautiful Soul')"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="bg-gray-900/70 border-gray-700 text-white"
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={mutation.isPending} className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                            {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                            Transmit Love
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

const LoveNoteCard = ({ note, index }) => {
    const Icon = icons[note.icon] || Heart;
    const colors = [
        'border-pink-500/30', 'border-cyan-500/30', 'border-green-500/30', 'border-yellow-500/30'
    ];
    const color = colors[index % colors.length];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="break-inside-avoid"
        >
            <Card className={`bg-black/40 ${color} mb-6`}>
                <CardContent className="p-6">
                    <Icon className="w-6 h-6 mb-4 text-pink-400" />
                    <p className="text-gray-200 text-lg mb-4 leading-relaxed">"{note.text}"</p>
                    <p className="text-right text-gray-500 font-medium">- {note.author}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default function WallOfLovePage() {
    const { data: notes, isLoading } = useQuery({
        queryKey: ['loveNotes'],
        queryFn: () => base44.entities.LoveNote.filter({ context: 'wall' }, '-created_date', 100),
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="text-center space-y-4 mb-12">
                    <Heart className="w-20 h-20 text-pink-500 mx-auto" style={{ filter: 'drop-shadow(0 0 15px #ec4899)'}} />
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        The Wall of Love
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        A universal tapestry of hope, kindness, and connection. Your words are light. Leave a spark for another soul to find.
                    </p>
                </header>

                <LoveNoteForm />

                {isLoading ? (
                    <QuantumLoader />
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                        {notes?.map((note, index) => (
                            <LoveNoteCard key={note.id} note={note} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}