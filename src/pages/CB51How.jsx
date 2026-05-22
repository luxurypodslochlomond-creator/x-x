import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, CheckCircle, XCircle, Radio, ArrowRight, 
  Calendar, Users, MessageSquare, Zap, Clock
} from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: Mail,
    color: '#06b6d4',
    title: 'Gig offer lands in your inbox',
    detail: 'From a promoter, agent, or venue. Could be messy, informal, half-formed.',
    demo: (
      <div className="bg-[#0a0f1a] border border-white/10 rounded-xl p-4 text-left font-mono text-sm">
        <div className="text-gray-500 text-xs mb-3">From: promoter@pikes.co.uk</div>
        <div className="text-white/80 leading-relaxed">
          Hey, any chance your band are free Sat 14th June? Pikes Hotel, Ibiza. 
          We're thinking £2,400 + flights. Let me know ASAP as we have another act interested...
        </div>
      </div>
    )
  },
  {
    id: 2,
    icon: Radio,
    color: '#06b6d4',
    title: 'You forward it to CB51',
    detail: 'One tap. Forward the email to gigs@cb51.io — that\'s it. You\'re done for now.',
    demo: (
      <div className="bg-[#0a0f1a] border border-cyan-500/40 rounded-xl p-4 text-left">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <Mail className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">Forward</div>
            <div className="text-cyan-400 text-xs font-mono">gigs@cb51.io</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Sent. CB51 is on it.</span>
        </div>
      </div>
    )
  },
  {
    id: 3,
    icon: Zap,
    color: '#f59e0b',
    title: 'AI reads the offer in seconds',
    detail: 'CB51 extracts venue, date, fee, promoter contact — no matter how messy the email.',
    demo: (
      <div className="bg-[#0a0f1a] border border-amber-500/40 rounded-xl p-4 text-left space-y-2">
        {[
          { label: 'Venue', value: 'Pikes Hotel, Ibiza' },
          { label: 'Date', value: 'Saturday 14 June 2025' },
          { label: 'Fee', value: '£2,400 + flights' },
          { label: 'Promoter', value: 'promoter@pikes.co.uk' },
          { label: 'Urgency', value: 'High — competing offer' },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-gray-500">{label}</span>
            <span className="text-white font-medium">{value}</span>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 4,
    icon: Users,
    color: '#10b981',
    title: 'You get a YES / NO push notification',
    detail: 'Clean. Offer details. One green button. One red button. Takes 5 seconds.',
    demo: (
      <div className="bg-[#1a1a2e] border border-white/20 rounded-2xl p-4 max-w-[260px] mx-auto shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-cyan-500 rounded-md flex items-center justify-center">
            <Radio className="w-3 h-3 text-white" />
          </div>
          <span className="text-white text-xs font-bold">CB51</span>
          <span className="text-gray-500 text-xs ml-auto">now</span>
        </div>
        <div className="text-white font-bold text-sm mb-1">New gig offer</div>
        <div className="text-gray-300 text-xs mb-3">Pikes Hotel, Ibiza — 14 Jun — £2,400</div>
        <div className="flex gap-2">
          <button className="flex-1 bg-green-500 text-white text-xs font-black py-2 rounded-lg">✓ YES</button>
          <button className="flex-1 bg-red-500/80 text-white text-xs font-black py-2 rounded-lg">✗ NO</button>
        </div>
      </div>
    )
  },
  {
    id: 5,
    icon: Users,
    color: '#10b981',
    title: 'Manager says YES → band gets same notification',
    detail: 'Every band member gets the same push on their phone. No group chat chaos.',
    demo: (
      <div className="flex gap-2 justify-center flex-wrap">
        {['Jamie', 'Kev', 'Lara', 'Tom'].map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            className="bg-[#0a0f1a] border border-green-500/40 rounded-xl px-3 py-2 text-center"
          >
            <div className="text-white text-xs font-bold">{name}</div>
            <div className="text-green-400 text-xs mt-1 font-mono">✓ YES</div>
          </motion.div>
        ))}
      </div>
    )
  },
  {
    id: 6,
    icon: CheckCircle,
    color: '#10b981',
    title: 'All YES → confirmation email drafts itself',
    detail: 'CB51 writes the reply to the promoter. You review and send in one tap.',
    demo: (
      <div className="bg-[#0a0f1a] border border-green-500/40 rounded-xl p-4 text-left">
        <div className="text-gray-500 text-xs mb-1">To: promoter@pikes.co.uk</div>
        <div className="text-gray-500 text-xs mb-3">Re: Pikes Hotel — 14 June</div>
        <div className="text-white/80 text-sm leading-relaxed">
          Hi, thanks for the offer — we'd love to confirm for 14 June at Pikes. 
          Fee of £2,400 + flights works for us. Please send over the contract when ready...
        </div>
        <div className="mt-3 flex gap-2">
          <div className="flex-1 bg-green-500 text-white text-xs font-black py-2 rounded-lg text-center cursor-pointer">Send</div>
          <div className="flex-1 border border-white/20 text-white text-xs font-bold py-2 rounded-lg text-center cursor-pointer">Edit first</div>
        </div>
      </div>
    )
  },
  {
    id: 7,
    icon: Calendar,
    color: '#f59e0b',
    title: 'Goes straight into everyone\'s calendar',
    detail: 'CB51 calendar updated. Band notified. Documented. Done.',
    demo: (
      <div className="bg-[#0a0f1a] border border-amber-500/40 rounded-xl p-4 text-left">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/20 rounded-lg p-3 text-center min-w-[50px]">
            <div className="text-amber-400 font-black text-lg leading-none">14</div>
            <div className="text-amber-400/70 text-xs">JUN</div>
          </div>
          <div>
            <div className="text-white font-bold">Pikes Hotel, Ibiza</div>
            <div className="text-green-400 text-xs font-bold mt-1">✓ CONFIRMED</div>
            <div className="text-gray-400 text-xs">£2,400 · Band notified · Docs ready</div>
          </div>
        </div>
      </div>
    )
  }
];

export default function CB51How() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= steps.length - 1) {
          setIsAutoPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2200);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const currentStep = steps[activeStep];
  const IconComp = currentStep.icon;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-cyan-500/20 bg-[#0a0f1a]/90 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={createPageUrl('CB51')} className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-cyan-400" />
            <span className="font-black text-cyan-400">CB51</span>
          </Link>
          <span className="text-gray-400 text-sm">How it works</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black mb-3">
            Gig offer to confirmed show.<br />
            <span className="text-cyan-400">Under 10 minutes.</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Forward the email. CB51 handles the rest.
          </p>
        </div>

        {/* Step progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setActiveStep(i); setIsAutoPlaying(false); }}
              className={`transition-all rounded-full ${
                i === activeStep 
                  ? 'w-6 h-2 bg-cyan-400' 
                  : i < activeStep 
                    ? 'w-2 h-2 bg-cyan-400/60' 
                    : 'w-2 h-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Active step card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0a0f1a] border border-white/10 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${currentStep.color}20`, border: `1px solid ${currentStep.color}40` }}
              >
                <IconComp className="w-5 h-5" style={{ color: currentStep.color }} />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono">STEP {activeStep + 1} OF {steps.length}</div>
                <div className="text-white font-black">{currentStep.title}</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-5">{currentStep.detail}</p>
            {currentStep.demo}
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex gap-3 mb-10">
          <button
            onClick={() => { setActiveStep(Math.max(0, activeStep - 1)); setIsAutoPlaying(false); }}
            disabled={activeStep === 0}
            className="flex-1 border border-white/20 text-white py-3 rounded-xl font-bold disabled:opacity-30 hover:border-white/40 transition-all"
          >
            ← Back
          </button>
          {activeStep < steps.length - 1 ? (
            <button
              onClick={() => { setActiveStep(activeStep + 1); setIsAutoPlaying(false); }}
              className="flex-1 bg-cyan-500 text-black py-3 rounded-xl font-black hover:bg-cyan-400 transition-all"
            >
              Next →
            </button>
          ) : (
            <Link
              to={createPageUrl('CB51')}
              className="flex-1 bg-green-500 text-black py-3 rounded-xl font-black text-center hover:bg-green-400 transition-all"
            >
              Get started →
            </Link>
          )}
        </div>

        {/* The one missing piece */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 text-center">
          <div className="text-amber-400 font-black mb-1">Your CB51 forwarding address</div>
          <div className="font-mono text-white text-lg mb-2">gigs@cb51.io</div>
          <div className="text-gray-400 text-sm">Forward any gig offer there. That's the whole trick.</div>
        </div>

        {/* No signup needed for band */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { icon: '📱', text: 'Band votes on phone' },
            { icon: '🔐', text: 'No login needed for band' },
            { icon: '📄', text: 'Auto-drafts reply email' },
          ].map(({ icon, text }) => (
            <div key={text} className="bg-[#0a0f1a] border border-white/10 rounded-xl p-3">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-xs text-gray-400 font-medium">{text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}