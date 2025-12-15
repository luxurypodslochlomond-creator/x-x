import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileSpreadsheet, Loader, Download } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';

export default function ExcelGenerator() {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState(null);

    const generate = useMutation({
        mutationFn: async (userPrompt) => {
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: `You're helping an Economics student at Edinburgh. Generate Excel formulas/model for: ${userPrompt}

Return CLEAN, WORKING formulas. Format like:
- Cell A1: [Label]
- Cell B1: =FORMULA
- Cell C1: =CALCULATION

Be practical. Economics student level. Make it USEFUL.`,
            });
            return response;
        },
        onSuccess: (data) => setResult(data)
    });

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-4 border-cyan-500 rounded-xl p-6" style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)' }}>
                <div className="flex items-center gap-3 mb-4">
                    <FileSpreadsheet className="w-10 h-10 text-cyan-400" />
                    <div>
                        <h2 className="text-cyan-400 font-black text-xl font-mono">EXCEL GENERATOR</h2>
                        <p className="text-gray-400 text-xs font-mono">AI builds your economics models</p>
                    </div>
                </div>

                <Textarea
                    placeholder="E.g. 'GDP growth model for UK 2020-2024' or 'Supply/demand equilibrium calculator'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-black border-cyan-500/30 text-white font-mono text-sm mb-4 h-24"
                />

                <Button
                    onClick={() => generate.mutate(prompt)}
                    disabled={!prompt || generate.isPending}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-4"
                >
                    {generate.isPending ? (
                        <>
                            <Loader className="w-5 h-5 mr-2 animate-spin" />
                            AI GENERATING...
                        </>
                    ) : (
                        'GENERATE EXCEL MODEL'
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
                        <p className="text-green-400 font-black font-mono">YOUR EXCEL MODEL ✓</p>
                        <Button
                            onClick={() => navigator.clipboard.writeText(result)}
                            size="sm"
                            variant="outline"
                            className="text-xs"
                        >
                            <Download className="w-4 h-4 mr-1" />
                            COPY
                        </Button>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
                        <pre className="text-white text-xs font-mono whitespace-pre-wrap">{result}</pre>
                    </div>
                </motion.div>
            )}
        </div>
    );
}