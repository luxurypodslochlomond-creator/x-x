import React, { useState } from 'react';
import { Play, CheckCircle, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SCOTT TEST MODE - Try it out
 * Loads demo data, tests flows, zero risk
 */

export default function ScottTestMode() {
    const [isOpen, setIsOpen] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [results, setResults] = useState([]);

    const runTests = async () => {
        setIsRunning(true);
        setResults([]);

        const tests = [
            { name: 'Add Person', fn: async () => {
                await base44.entities.ScottArtist.create({
                    name: 'Test Artist',
                    type: 'artist',
                    phone: '07000000000'
                });
            }},
            { name: 'Add Event', fn: async () => {
                const artists = await base44.entities.ScottArtist.list();
                if (artists.length > 0) {
                    await base44.entities.ScottEvent.create({
                        artist_id: artists[0].id,
                        title: 'Test Gig',
                        date: new Date().toISOString().split('T')[0],
                        venue: 'Test Venue'
                    });
                }
            }},
            { name: 'Add Task', fn: async () => {
                await base44.entities.ScottTask.create({
                    title: 'Test Task',
                    status: 'todo',
                    priority: 'medium'
                });
            }}
        ];

        for (const test of tests) {
            try {
                await test.fn();
                setResults(prev => [...prev, { name: test.name, pass: true }]);
            } catch (error) {
                setResults(prev => [...prev, { name: test.name, pass: false, error: error.message }]);
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        setIsRunning(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 left-4 z-30 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-mono text-xs font-bold border-2 border-purple-400"
            >
                <Play className="w-4 h-4 inline mr-1" />
                TEST
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    >
                        <div className="bg-black border-2 border-purple-500 rounded-xl p-6 max-w-md w-full">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-black text-lg font-mono">TEST MODE</h3>
                                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <p className="text-gray-400 text-xs font-mono mb-4">
                                Creates demo data to test flows - safe to run
                            </p>

                            {!isRunning && results.length === 0 && (
                                <button
                                    onClick={runTests}
                                    className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded font-mono font-bold"
                                >
                                    RUN TESTS
                                </button>
                            )}

                            {isRunning && (
                                <div className="text-center py-4">
                                    <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                                    <p className="text-gray-400 text-xs font-mono">Running...</p>
                                </div>
                            )}

                            {results.length > 0 && (
                                <div className="space-y-2">
                                    {results.map((result, idx) => (
                                        <div key={idx} className={`flex items-center gap-2 p-2 rounded border ${
                                            result.pass 
                                                ? 'bg-green-900/20 border-green-500/50' 
                                                : 'bg-red-900/20 border-red-500/50'
                                        }`}>
                                            {result.pass ? (
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                            ) : (
                                                <X className="w-4 h-4 text-red-400" />
                                            )}
                                            <span className={`text-xs font-mono ${result.pass ? 'text-green-400' : 'text-red-400'}`}>
                                                {result.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}