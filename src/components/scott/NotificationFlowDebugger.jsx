import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * NOTIFICATION FLOW DEBUGGER
 * Tests full flow: offer → band → vote → promoter
 * Shows live logs
 */

export default function NotificationFlowDebugger({ artistId }) {
  const [testing, setTesting] = useState(false);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);

  const runTest = async () => {
    setTesting(true);
    setLogs([]);
    setResult(null);

    try {
      const response = await base44.functions.invoke('testNotificationFlow', {
        artistId,
        testMode: true
      });

      if (response.data?.log) {
        setLogs(response.data.log);
      }
      setResult(response.data);
    } catch (error) {
      setLogs([`❌ Test failed: ${error.message}`]);
      setResult({ success: false, error: error.message });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-black border-2 border-cyan-500 rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Zap className="w-6 h-6 text-cyan-400" />
        <h3 className="text-cyan-400 font-black text-lg">Notification Flow Test</h3>
      </div>

      <p className="text-gray-400 text-sm">Tests: gig offer → band notified → band votes → promoter notified</p>

      <button
        onClick={runTest}
        disabled={testing}
        className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
      >
        {testing ? 'Testing...' : 'Run Full Test'}
      </button>

      {logs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-900 rounded-lg p-4 space-y-2 max-h-96 overflow-y-auto font-mono text-xs"
        >
          {logs.map((log, i) => (
            <div
              key={i}
              className={`${
                log.includes('✓')
                  ? 'text-green-400'
                  : log.includes('❌')
                    ? 'text-red-400'
                    : log.includes('⚠')
                      ? 'text-amber-400'
                      : 'text-gray-300'
              }`}
            >
              {log}
            </div>
          ))}
        </motion.div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-4 rounded-lg border-2 flex items-center gap-3 ${
            result.success
              ? 'bg-green-500/10 border-green-500 text-green-400'
              : 'bg-red-500/10 border-red-500 text-red-400'
          }`}
        >
          {result.success ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <div>
            <p className="font-bold text-sm">{result.message || 'Test failed'}</p>
            {result.error && <p className="text-xs opacity-75">{result.error}</p>}
          </div>
        </motion.div>
      )}
    </div>
  );
}