import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  Heart,
  HelpCircle,
  Info,
  CheckCircle,
  Shield,
  Users,
  Coins,
  ArrowLeft
} from 'lucide-react';

export default function RequestFamilySupport() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [fundBalance, setFundBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      
      const treasury = await base44.entities.UniversalLoveTreasury.list();
      if (treasury && treasury.length > 0) {
        setFundBalance(treasury[0].current_balance_gmt || 0);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    // AI51 will verify and process the request
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">

        <Button
          variant="ghost"
          onClick={() => navigate(createPageUrl("UniversalWallet"))}
          className="mb-4 hover:bg-green-900/30 text-green-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Wallet
        </Button>

        {/* HEADER */}
        <header className="text-center space-y-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
            <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/50">
              <HelpCircle className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            REQUEST FAMILY SUPPORT
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The UF51 Fund exists to help family members in genuine need. This isn't a loan. There's no debt. It's family looking after family.
          </p>
        </header>

        {!submitted ? (
          <>
            {/* INFO CARDS */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-green-900/20 border-2 border-green-500/30 rounded-2xl">
                <CardContent className="p-6">
                  <Shield className="w-10 h-10 text-green-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Protected by AI51</h3>
                  <p className="text-gray-300 text-sm">
                    Every request is verified by AI51 to ensure genuine need and prevent abuse. 
                    Good souls are helped. Bad actors are blocked.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-cyan-900/20 border-2 border-cyan-500/30 rounded-2xl">
                <CardContent className="p-6">
                  <Users className="w-10 h-10 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">Circular Economy</h3>
                  <p className="text-gray-300 text-sm">
                    When you're back on your feet, your cleanups contribute 10% to the fund (like everyone). 
                    No debt. Just natural flow.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* FUND BALANCE */}
            <Card className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-2 border-yellow-500/50 rounded-2xl">
              <CardContent className="p-6 text-center">
                <Coins className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <p className="text-yellow-300 font-bold mb-2">UF51 Fund Balance</p>
                <p className="text-4xl font-black text-white">
                  {fundBalance.toLocaleString()} <span className="text-yellow-400">❤️GMT</span>
                </p>
                <p className="text-gray-300 text-sm mt-2">Available to help family members</p>
              </CardContent>
            </Card>

            {/* REQUEST FORM */}
            <Card className="bg-black/50 border-2 border-green-500/50 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Make Your Request</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* AMOUNT */}
                  <div>
                    <label className="text-white font-bold mb-2 block text-lg">How much GMT do you need?</label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g., 50 for food, 100 for bills"
                      required
                      className="bg-black/40 border-green-500/30 text-white text-xl p-6"
                    />
                    {amount && (
                      <p className="text-green-300 mt-2">
                        ≈ £{(Number(amount) * 0.1).toFixed(2)} value
                      </p>
                    )}
                  </div>

                  {/* REASON */}
                  <div>
                    <label className="text-white font-bold mb-2 block text-lg">What do you need help with?</label>
                    <Textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Tell us what's happening. Be honest - we're family."
                      required
                      className="bg-black/40 border-green-500/30 text-white min-h-[120px] text-base"
                    />
                  </div>

                  {/* INFO BOX */}
                  <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 flex items-start gap-4">
                    <Info className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div className="text-gray-300 text-sm">
                      <p className="font-bold text-white mb-2">What Happens Next?</p>
                      <ul className="space-y-1">
                        <li>• AI51 verifies your request (usually instant)</li>
                        <li>• If genuine need, GMT is sent to your wallet</li>
                        <li>• You use it for food, bills, emergencies</li>
                        <li>• When you're better, you contribute back through cleanups</li>
                        <li>• No debt. No shame. Just love.</li>
                      </ul>
                    </div>
                  </div>

                  {/* SUBMIT */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-xl py-6"
                  >
                    <Heart className="w-6 h-6 mr-2" />
                    Request Family Support
                  </Button>

                </form>
              </CardContent>
            </Card>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 bg-green-900/20 border-2 border-green-500/50 rounded-3xl p-12"
          >
            <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
            <h2 className="text-4xl font-black text-white">Request Received</h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
              AI51 is reviewing your request now. If verified, GMT will be sent to your wallet within minutes. 
              Check your email for updates.
            </p>
            <p className="text-2xl text-green-400 font-bold">You're not alone. We've got you.</p>
            <Button
              onClick={() => navigate(createPageUrl("UniversalWallet"))}
              className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-4"
            >
              Return to Wallet
            </Button>
          </motion.div>
        )}

      </div>
    </div>
  );
}