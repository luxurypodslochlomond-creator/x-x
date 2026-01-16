import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function TestExtensionFlow() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await base44.functions.invoke('testExtensionFlow', {});
      setResults(response.data);
    } catch (err) {
      setError(err.message || 'Test failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-6">Extension Flow Test</h1>
        
        <Button 
          onClick={runTest}
          disabled={loading}
          className="mb-6 bg-cyan-600 hover:bg-cyan-700 h-12 text-lg font-bold gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Running Test...
            </>
          ) : (
            'Run Extension Test'
          )}
        </Button>

        {error && (
          <Card className="bg-red-900/20 border-2 border-red-500 mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-red-300 font-bold">Test Failed</p>
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {results && (
          <div className="space-y-6">
            <Card className="bg-black border-2 border-green-500">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  Test Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
                  <p className="text-green-300 font-bold">{results.message}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-4">
                    <p className="text-cyan-400 text-xs font-mono">EMAILS TESTED</p>
                    <p className="text-white text-2xl font-black">{results.emails_tested}</p>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-4">
                    <p className="text-cyan-400 text-xs font-mono">STATUS</p>
                    <p className="text-white text-2xl font-black">{results.test_passed ? '✅ PASS' : '❌ FAIL'}</p>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-4">
                    <p className="text-cyan-400 text-xs font-mono">READY</p>
                    <p className="text-white text-2xl font-black">GO</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-white font-bold mb-3">Categorized Emails:</h3>
                  <div className="space-y-3">
                    {results.categorized_results.map((email, idx) => (
                      <div key={idx} className="bg-gray-900/50 border border-gray-700 rounded p-4">
                        <div className="flex justify-between items-start gap-3 mb-2">
                          <div>
                            <p className="text-white font-bold">{email.subject}</p>
                            <p className="text-gray-400 text-sm">{email.from}</p>
                          </div>
                          <span className={`px-3 py-1 rounded font-bold text-xs font-mono ${
                            email.category === 'GIG_OFFER' ? 'bg-pink-500/30 text-pink-300' :
                            email.category === 'CONTRACT' ? 'bg-blue-500/30 text-blue-300' :
                            email.category === 'INVOICE' ? 'bg-green-500/30 text-green-300' :
                            'bg-gray-500/30 text-gray-300'
                          }`}>
                            {email.category}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{email.reason}</p>
                        {email.attachments && (
                          <p className="text-gray-500 text-xs mt-2">📎 {email.attachments.join(', ')}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}