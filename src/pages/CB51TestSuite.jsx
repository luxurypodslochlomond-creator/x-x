import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Play, CheckCircle, XCircle, Clock, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

/**
 * CB51 AUTOMATED TEST SUITE
 * One-click workflow testing
 */

export default function CB51TestSuite() {
    const navigate = useNavigate();
    const [testing, setTesting] = useState(false);
    const [results, setResults] = useState(null);

    const runTests = async () => {
        setTesting(true);
        setResults(null);

        try {
            const response = await base44.functions.invoke('testCB51Workflow', {});
            setResults(response.data);
        } catch (error) {
            setResults({
                status: 'ERROR',
                error: error.message,
                tests: []
            });
        }

        setTesting(false);
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <button
                onClick={() => navigate(createPageUrl('CB51'))}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">BACK</span>
            </button>

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Radio className="w-8 h-8 text-cyan-400" />
                        <h1 className="text-4xl font-black text-white font-mono">CB51 TEST SUITE</h1>
                    </div>
                    <p className="text-gray-600 text-sm font-mono">Automated workflow testing</p>
                </div>

                {/* RUN BUTTON */}
                <motion.button
                    onClick={runTests}
                    disabled={testing}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-6 rounded-lg border-2 flex items-center justify-center gap-3 font-black text-xl mb-8 transition-all ${
                        testing 
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 cursor-not-allowed'
                            : 'bg-black border-cyan-500 text-cyan-400 hover:bg-cyan-500/10'
                    }`}
                    style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
                >
                    {testing ? (
                        <>
                            <Clock className="w-6 h-6 animate-spin" />
                            RUNNING TESTS...
                        </>
                    ) : (
                        <>
                            <Play className="w-6 h-6" />
                            RUN FULL WORKFLOW TEST
                        </>
                    )}
                </motion.button>

                {/* WHAT GETS TESTED */}
                <div className="bg-black border-2 border-gray-800 rounded-lg p-6 mb-8">
                    <h2 className="text-white font-black font-mono text-lg mb-4">TESTS INCLUDED:</h2>
                    <ul className="space-y-2 text-sm text-gray-400 font-mono">
                        <li>✓ Create test artist + band members</li>
                        <li>✓ AI gig offer extraction (email → database)</li>
                        <li>✓ Manager approval → band notifications</li>
                        <li>✓ Band voting (YES/NO responses)</li>
                        <li>✓ Auto-confirmation trigger</li>
                        <li>✓ Google Calendar sync</li>
                        <li>✓ Promoter email draft generation</li>
                        <li>✓ Cleanup (delete test data)</li>
                    </ul>
                </div>

                {/* RESULTS */}
                <AnimatePresence>
                    {results && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            {/* SUMMARY */}
                            <div className={`p-6 rounded-lg border-2 ${
                                results.status.includes('PASSED')
                                    ? 'bg-green-500/10 border-green-500'
                                    : 'bg-red-500/10 border-red-500'
                            }`}>
                                <h2 className={`text-2xl font-black font-mono mb-2 ${
                                    results.status.includes('PASSED') ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {results.status}
                                </h2>
                                {results.summary && (
                                    <p className="text-white font-mono text-sm">
                                        {results.summary.passed} passed • {results.summary.failed} failed
                                    </p>
                                )}
                                {results.timestamp && (
                                    <p className="text-gray-500 font-mono text-xs mt-2">
                                        {new Date(results.timestamp).toLocaleString()}
                                    </p>
                                )}
                            </div>

                            {/* INDIVIDUAL TEST RESULTS */}
                            <div className="space-y-3">
                                {results.tests?.map((test, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className={`p-4 rounded-lg border-2 ${
                                            test.passed
                                                ? 'bg-black border-green-500/30'
                                                : 'bg-black border-red-500/30'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {test.passed ? (
                                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                            )}
                                            <div className="flex-1">
                                                <p className={`font-black font-mono text-sm mb-1 ${
                                                    test.passed ? 'text-green-400' : 'text-red-400'
                                                }`}>
                                                    {test.test}
                                                </p>
                                                <p className="text-gray-400 text-xs font-mono">
                                                    {test.message}
                                                </p>
                                                {test.data && (
                                                    <details className="mt-2">
                                                        <summary className="text-cyan-400 text-xs font-mono cursor-pointer hover:text-cyan-300">
                                                            View data
                                                        </summary>
                                                        <pre className="bg-gray-900 p-2 rounded mt-2 text-xs text-gray-400 overflow-x-auto">
                                                            {JSON.stringify(test.data, null, 2)}
                                                        </pre>
                                                    </details>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {results.error && (
                                <div className="bg-red-500/10 border-2 border-red-500 rounded-lg p-4">
                                    <p className="text-red-400 font-mono text-sm">
                                        {results.error}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* INFO */}
                <div className="mt-12 bg-cyan-500/10 border-2 border-cyan-500/30 rounded-lg p-4">
                    <p className="text-cyan-400 text-sm font-mono mb-2">
                        💡 This test simulates the entire CB51 workflow end-to-end
                    </p>
                    <ul className="text-gray-400 text-xs font-mono space-y-1">
                        <li>• Creates temporary test data</li>
                        <li>• Runs through complete gig approval flow</li>
                        <li>• Verifies all automations fire correctly</li>
                        <li>• Cleans up after itself (no junk data left)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}