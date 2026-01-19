import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Heart, Mail, Check } from 'lucide-react';

export default function AdminGill51Tracker() {
  const [outreach, setOutreach] = useState({
    "Vitalik Buterin": {
      email: "vitalik@ethereum.org",
      date: "2026-01-19",
      status: "sent",
      subject: "GROW51: Regenerative Proof-of-Work ♾️❤️",
      proofOfLoveId: "pending"
    },
    "Chris Larsen": {
      email: "contactus@llccf.org",
      date: null,
      status: "draft",
      subject: "GROW51 + Climate Healing via Decentralized Impact",
      draft: `Hi Chris,

GROW51 is building what ReFi is meant to be: healing planetary systems while distributing value infinitely.

We're cleaning oceans + forests, and every cleanup earns $P51 (regenerative currency). The math is simple: 1kg trash cleaned = 1 $P51, forever, trustlessly.

Your LLCCF vision + our technology could fund climate action at scale.

Can we talk?

With love,
Gill51
♾️❤️`
    },
    "Hayden Adams": {
      email: "hayden@uniswap.io",
      date: null,
      status: "draft",
      subject: "Uniswap + GROW51: Decentralized Healing Protocol",
      draft: `Hayden,

You built the DEX that changed DeFi. We're building the economy that heals Earth.

GROW51: cleanup → $P51 → full liquidity. Trustless. Decentralized. Regenerative.

Your Uniswap pools could be the heart of a healing economy.

Worth a 15min call?

Gill51
♾️❤️`
    }
  });

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-4 border-cyan-500 bg-black/80 p-6"
        >
          <h1 className="text-3xl font-black font-mono text-cyan-400 mb-2">GILL51 TRACKER</h1>
          <p className="text-white/60 font-mono text-sm">Outreach to visionaries who get it ♾️❤️</p>
        </motion.div>

        {Object.entries(outreach).map(([name, data], idx) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`border-4 p-6 ${
              data.status === 'sent' 
                ? 'border-green-500 bg-green-900/20' 
                : 'border-amber-500 bg-amber-900/20'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className={`text-2xl font-black font-mono ${
                  data.status === 'sent' ? 'text-green-400' : 'text-amber-400'
                }`}>
                  {name}
                </h2>
                <p className="text-white/60 font-mono text-sm mt-1">{data.email}</p>
              </div>
              <div className="flex items-center gap-2">
                {data.status === 'sent' && (
                  <>
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-bold font-mono text-sm">SENT {data.date}</span>
                  </>
                )}
                {data.status === 'draft' && (
                  <span className="text-amber-400 font-bold font-mono text-sm">DRAFT</span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-white/80 font-mono text-sm mb-2">SUBJECT:</p>
                <p className="text-white font-mono text-sm bg-black/60 p-3 rounded">{data.subject}</p>
              </div>

              {data.draft && (
                <div>
                  <p className="text-white/80 font-mono text-sm mb-2">DRAFT:</p>
                  <p className="text-white font-mono text-sm bg-black/60 p-4 rounded whitespace-pre-wrap">{data.draft}</p>
                </div>
              )}

              {data.status === 'draft' && (
                <div className="flex gap-2">
                  <Button className="bg-cyan-600 hover:bg-cyan-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Email
                  </Button>
                </div>
              )}

              {data.status === 'sent' && data.proofOfLoveId && (
                <div className="bg-black/60 p-3 rounded border-2 border-green-500/30">
                  <p className="text-green-400 text-xs font-mono">✓ Logged as Proof of Love</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-4 border-pink-500 bg-pink-900/20 p-6 text-center"
        >
          <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
          <p className="text-white font-mono text-sm">
            Each email is a Proof of Love entry in the system
          </p>
          <p className="text-white/60 font-mono text-xs mt-2">
            Funded by the universe, executed by humans who care
          </p>
        </motion.div>

      </div>
    </div>
  );
}