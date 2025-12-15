import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Loader, Copy } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';

export default function EssayOutliner() {
    const [topic, setTopic] = useState('');
    const [wordCount, setWordCount] = useState('2000');
    const [result, setResult] = useState(null);

    const generate = useMutation({
        mutationFn: async ({ topic, words }) => {
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `Create essay outline for Economics student:

Topic: ${topic}
Word count: ${words}

Return structured outline with:
- Introduction (thesis statement)
- 3-5 main arguments (with evidence suggestions)
- Counter-arguments section
- Conclusion

Make it PRACTICAL for ${words} word essay. University level.`,
            });
            return response;
        },
        onSuccess: (data) => setResult(data)
    });

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-4 border-purple-500 rounded-xl p-6" style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)' }}>
                <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-10 h-10 text-purple-400" />
                    <div>
                        <h2 className="text-purple-400 font-black text-xl font-mono">ESSAY OUTLINER</h2>
                        <p className="text-gray-400 text-xs font-mono">Structure any assignment in seconds</p>
                    </div>
                </div>

                <Textarea
                    placeholder="Essay topic or question..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="bg-black border-purple-500/30 text-white font-mono text-sm mb-3 h-24"
                />

                <input
                    type="number"
                    placeholder="Word count"
                    value={wordCount}
                    onChange={(e) => setWordCount(e.target.value)}
                    className="w-full bg-black border border-purple-500/30 rounded-lg px-4 py-2 text-white font-mono text-sm mb-4"
                />

                <Button
                    onClick={() => generate.mutate({ topic, words: wordCount })}
                    disabled={!topic || generate.isPending}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-black py-4"
                >
                    {generate.isPending ? (
                        <>
                            <Loader className="w-5 h-5 mr-2 animate-spin" />
                            AI OUTLINING...
                        </>
                    ) : (
                        'GENERATE OUTLINE'
                    )}
                </Button>
            </div>

            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black border-2 border-green-500 rounded-xl p-4"
                >
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-green-400 font-black font-mono">YOUR ESSAY OUTLINE ✓</p>
                        <Button
                            onClick={() => navigator.clipboard.writeText(result)}
                            size="sm"
                            variant="outline"
                            className="text-xs"
                        >
                            <Copy className="w-4 h-4 mr-1" />
                            COPY
                        </Button>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
                        <pre className="text-white text-sm font-mono whitespace-pre-wrap">{result}</pre>
                    </div>
                </motion.div>
            )}
        </div>
    );
}