import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import CTRL51Icon from '@/components/ctrl51/CTRL51Icon';
import { CheckCircle } from 'lucide-react';

export default function CTRL51CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1a] to-black text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle className="w-16 h-16 text-green-400" />
        </motion.div>

        <h1 className="text-4xl font-black mb-4">Welcome to CTRL51</h1>
        
        <p className="text-gray-300 mb-8">
          Your pilot subscription is active. You can now upload procurement data and start analyzing immediately.
        </p>

        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8">
          <p className="text-sm text-gray-400 mb-2">Session ID</p>
          <p className="font-mono text-xs text-cyan-400 break-all">{sessionId}</p>
        </div>

        <div className="space-y-3 mb-8">
          <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg text-left">
            <p className="text-sm font-bold mb-1">Next Steps</p>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>✓ Check your email for account details</li>
              <li>✓ Log in to your council dashboard</li>
              <li>✓ Upload your first CSV file</li>
              <li>✓ See fragmentation & savings instantly</li>
            </ul>
          </div>
        </div>

        <Link
          to="/CTRL51Dashboard"
          className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-cyan-500 transition w-full"
        >
          Go to Dashboard
        </Link>

        <p className="text-xs text-gray-500 mt-8">
          Need help? Email <a href="mailto:hello@ctrl51.uk" className="text-cyan-400 hover:text-cyan-300">hello@ctrl51.uk</a>
        </p>
      </motion.div>
    </div>
  );
}