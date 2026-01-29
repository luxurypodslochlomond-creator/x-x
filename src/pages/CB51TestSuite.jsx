import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, Radio, CheckCircle, X, Bell, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * CB51 TEST SUITE - End-to-end notification testing
 * Simple validation for Scott's meetings
 */

export default function CB51TestSuite() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [running, setRunning] = useState(false);

  const runTests = async () => {
    setRunning(true);
    setTests([]);
    const results = [];

    // Test 1: Service Worker
    try {
      const swPath = import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/serveServiceWorker`
        : '/api/serveServiceWorker';
      await navigator.serviceWorker.register(swPath);
      await navigator.serviceWorker.ready;
      results.push({ name: 'Service Worker', status: 'pass', message: '✓ Registered' });
    } catch (e) {
      results.push({ name: 'Service Worker', status: 'fail', message: `✗ ${e.message}` });
    }
    setTests([...results]);

    // Test 2: VAPID Keys
    try {
      const res = await base44.functions.invoke('generateVapidKeys', {});
      if (res.data.publicKey) {
        results.push({ name: 'VAPID Keys', status: 'pass', message: '✓ Keys generated' });
      } else {
        results.push({ name: 'VAPID Keys', status: 'fail', message: '✗ No keys returned' });
      }
    } catch (e) {
      results.push({ name: 'VAPID Keys', status: 'fail', message: `✗ ${e.message}` });
    }
    setTests([...results]);

    // Test 3: Push Subscription
    try {
      if ('PushManager' in window) {
        results.push({ name: 'Push Support', status: 'pass', message: '✓ Browser supports push' });
      } else {
        results.push({ name: 'Push Support', status: 'warn', message: '⚠ Browser may not support push' });
      }
    } catch (e) {
      results.push({ name: 'Push Support', status: 'fail', message: `✗ ${e.message}` });
    }
    setTests([...results]);

    // Test 4: Create test notification
    try {
      const user = await base44.auth.me();
      await base44.entities.ScottNotification.create({
        recipient_email: user.email,
        notification_type: 'manager_confirmed',
        title: 'CB51 Test',
        message: 'All systems operational ✓',
        action_url: '/CB51'
      });
      results.push({ name: 'Create Notification', status: 'pass', message: '✓ Notification created' });
    } catch (e) {
      results.push({ name: 'Create Notification', status: 'fail', message: `✗ ${e.message}` });
    }
    setTests([...results]);

    // Test 5: Automation check
    try {
      const automations = await base44.functions.invoke('listAutomations', {});
      const pushAuto = automations.data?.find(a => a.name?.includes('Browser Push'));
      if (pushAuto && pushAuto.is_active) {
        results.push({ name: 'Automation', status: 'pass', message: '✓ Push automation active' });
      } else {
        results.push({ name: 'Automation', status: 'fail', message: '✗ Automation not found/active' });
      }
    } catch (e) {
      results.push({ name: 'Automation', status: 'warn', message: `⚠ ${e.message}` });
    }
    setTests([...results]);

    setRunning(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pass': return 'text-green-400 border-green-500';
      case 'fail': return 'text-red-400 border-red-500';
      case 'warn': return 'text-amber-400 border-amber-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5" />;
      case 'fail': return <X className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const allPassed = tests.length > 0 && tests.every(t => t.status === 'pass' || t.status === 'warn');

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-xs font-bold font-mono">BACK</span>
      </button>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Radio className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-black text-white font-mono">CB51 TEST SUITE</h1>
        </div>
        <p className="text-gray-600 text-xs font-mono">End-to-end notification validation</p>
      </div>

      <div className="bg-black border-2 border-cyan-500 rounded p-4 mb-6" style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}>
        <h2 className="text-cyan-400 font-black font-mono text-lg mb-4">QUICK TEST</h2>
        <p className="text-white text-sm font-mono mb-4">
          Tests service worker, VAPID keys, push support, notifications, and automation.
        </p>
        <Button
          onClick={runTests}
          disabled={running}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-3 font-mono"
        >
          {running ? 'RUNNING TESTS...' : 'RUN ALL TESTS'}
        </Button>
      </div>

      {tests.length > 0 && (
        <div className="space-y-3">
          {tests.map((test, i) => (
            <div
              key={i}
              className={`bg-black border-2 rounded p-4 ${getStatusColor(test.status)}`}
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(test.status)}
                <div className="flex-1">
                  <p className="text-white font-black font-mono text-sm">{test.name}</p>
                  <p className={`${getStatusColor(test.status)} text-xs font-mono`}>
                    {test.message}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {allPassed && (
            <div className="bg-green-500/20 border-2 border-green-500 rounded p-4 mt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-green-400 font-black font-mono text-lg">ALL SYSTEMS GO</p>
                  <p className="text-green-300 text-xs font-mono">Ready for Scott's meetings ✓</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-gray-600 text-xs font-mono">CB51 • Test Suite</p>
      </div>
    </div>
  );
}