import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Building, Shield, Key, Zap, FileText, Users, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * STARLING BANK CIC SETUP AUTOMATION
 * Zero bullshit guide + automated integration
 * Crypto-secure webhooks + OAuth2
 */

export default function AdminStarlingSetup() {
    const [expandedSection, setExpandedSection] = useState('docs');
    const [checklist, setChecklist] = useState({
        cic_registered: false,
        directors_verified: false,
        proof_address: false,
        trading_evidence: false,
        account_applied: false,
        api_credentials: false,
        webhook_setup: false,
        crypto_verified: false
    });

    const toggleCheck = (key) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const progress = (Object.values(checklist).filter(Boolean).length / Object.values(checklist).length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
            <div className="max-w-5xl mx-auto">
                
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Building className="w-12 h-12 text-cyan-400" />
                        <h1 className="text-4xl font-black">STARLING SETUP</h1>
                        <Shield className="w-12 h-12 text-green-400" />
                    </div>
                    <p className="text-gray-400 font-mono">Zero bullshit automation • Crypto-secure • OAuth2</p>
                </motion.div>

                {/* PROGRESS */}
                <div className="bg-black border-2 border-cyan-500 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-cyan-400 font-bold">PROGRESS</span>
                        <span className="text-white font-black text-2xl">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-green-500"
                        />
                    </div>
                </div>

                {/* SECTION 1: DOCUMENTS NEEDED */}
                <Section
                    title="1. DOCUMENTS NEEDED"
                    icon={FileText}
                    color="cyan"
                    expanded={expandedSection === 'docs'}
                    onToggle={() => toggleSection('docs')}
                >
                    <div className="space-y-4">
                        <CheckItem
                            checked={checklist.cic_registered}
                            onToggle={() => toggleCheck('cic_registered')}
                            title="CIC Registration Certificate"
                            description="Companies House CIC registration + CIC number"
                        />
                        <CheckItem
                            checked={checklist.directors_verified}
                            onToggle={() => toggleCheck('directors_verified')}
                            title="Director ID (all PSCs)"
                            description="Passport/Driving License for each director + UK resident proof"
                        />
                        <CheckItem
                            checked={checklist.proof_address}
                            onToggle={() => toggleCheck('proof_address')}
                            title="Proof of Address"
                            description="Utility bill/bank statement (last 3 months) for each director"
                        />
                        <CheckItem
                            checked={checklist.trading_evidence}
                            onToggle={() => toggleCheck('trading_evidence')}
                            title="Trading Evidence (optional but helps)"
                            description="Website, invoices, contracts - shows you're real"
                        />
                        
                        <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4 mt-4">
                            <p className="text-green-400 font-bold text-sm mb-2">✓ TIP:</p>
                            <p className="text-gray-300 text-sm">Apply online at starlingbank.com/business-account - takes 10 mins, approved in 1-3 days ⚡</p>
                        </div>
                    </div>
                </Section>

                {/* SECTION 2: ACCOUNT APPLICATION */}
                <Section
                    title="2. OPEN ACCOUNT"
                    icon={Building}
                    color="purple"
                    expanded={expandedSection === 'account'}
                    onToggle={() => toggleSection('account')}
                >
                    <div className="space-y-4">
                        <CheckItem
                            checked={checklist.account_applied}
                            onToggle={() => toggleCheck('account_applied')}
                            title="Apply for Starling Business Account"
                            description="Visit starlingbank.com/business-account/eligibility"
                        />
                        
                        <a 
                            href="https://www.starlingbank.com/business-account/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
                        >
                            <ExternalLink className="w-5 h-5" />
                            APPLY NOW (10 mins)
                        </a>

                        <div className="bg-amber-900/20 border border-amber-500/50 rounded-lg p-4">
                            <p className="text-amber-400 font-bold text-sm mb-2">REQUIREMENTS:</p>
                            <ul className="text-gray-300 text-sm space-y-1">
                                <li>• CIC registered at Companies House ✓</li>
                                <li>• All PSCs UK residents ✓</li>
                                <li>• Not in prohibited activities ✓</li>
                                <li>• Free account - £0/month ✓</li>
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* SECTION 3: API SETUP (AUTOMATED) */}
                <Section
                    title="3. API INTEGRATION (I BUILD THIS)"
                    icon={Key}
                    color="green"
                    expanded={expandedSection === 'api'}
                    onToggle={() => toggleSection('api')}
                >
                    <div className="space-y-4">
                        <CheckItem
                            checked={checklist.api_credentials}
                            onToggle={() => toggleCheck('api_credentials')}
                            title="Get API Credentials"
                            description="Once account approved, register app at developer.starlingbank.com"
                        />
                        <CheckItem
                            checked={checklist.webhook_setup}
                            onToggle={() => toggleCheck('webhook_setup')}
                            title="Webhook Setup (automated)"
                            description="I'll build the webhook handler - crypto-secure signature verification"
                        />
                        <CheckItem
                            checked={checklist.crypto_verified}
                            onToggle={() => toggleCheck('crypto_verified')}
                            title="Crypto Security Verification"
                            description="HMAC-SHA256 webhook signatures + OAuth2 token rotation"
                        />

                        <div className="bg-cyan-900/20 border border-cyan-500/50 rounded-lg p-4">
                            <p className="text-cyan-400 font-bold text-sm mb-2">🤖 WHAT I'LL AUTOMATE:</p>
                            <ul className="text-gray-300 text-sm space-y-1">
                                <li>✓ OAuth2 authentication flow</li>
                                <li>✓ Webhook signature verification (HMAC)</li>
                                <li>✓ Real-time payment notifications</li>
                                <li>✓ Auto cash-out $P51 → GBP</li>
                                <li>✓ Artist payout automation</li>
                                <li>✓ Transaction logging (encrypted)</li>
                            </ul>
                        </div>

                        <div className="bg-black border-2 border-green-500 rounded-lg p-4">
                            <p className="text-green-400 font-bold mb-2">BACKEND FUNCTION PREVIEW:</p>
                            <pre className="text-xs font-mono text-gray-300 overflow-x-auto">
{`// functions/starlingWebhook.js
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import crypto from 'node:crypto';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  
  // 1. Verify webhook signature (crypto-secure)
  const signature = req.headers.get('x-starling-signature');
  const body = await req.text();
  const secret = Deno.env.get('STARLING_WEBHOOK_SECRET');
  
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body);
  const expected = hmac.digest('hex');
  
  if (signature !== expected) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 });
  }
  
  // 2. Process payment
  const event = JSON.parse(body);
  
  if (event.type === 'payment.received') {
    // Auto-convert to $P51 or payout to artist
    await base44.asServiceRole.entities.Transaction.create({
      amount: event.amount,
      currency: 'GBP',
      type: 'deposit',
      starling_reference: event.id
    });
  }
  
  return Response.json({ success: true });
});`}
                            </pre>
                        </div>
                    </div>
                </Section>

                {/* SECTION 4: INTEGRATION FLOW */}
                <Section
                    title="4. HOW IT WORKS"
                    icon={Zap}
                    color="pink"
                    expanded={expandedSection === 'flow'}
                    onToggle={() => toggleSection('flow')}
                >
                    <div className="space-y-6">
                        <FlowStep
                            number="1"
                            title="User earns $P51"
                            description="Cleanup litter → gets $P51 tokens"
                            color="green"
                        />
                        <FlowStep
                            number="2"
                            title="Requests cash-out"
                            description="$P51 → GBP conversion (e.g. 100 $P51 = £1)"
                            color="cyan"
                        />
                        <FlowStep
                            number="3"
                            title="Starling API payment"
                            description="Automated payout to their bank account"
                            color="purple"
                        />
                        <FlowStep
                            number="4"
                            title="Webhook confirmation"
                            description="Crypto-verified webhook → update balance ✓"
                            color="pink"
                        />

                        <div className="bg-pink-900/20 border border-pink-500/50 rounded-lg p-4 mt-6">
                            <p className="text-pink-400 font-bold text-sm mb-2">⚡ SPEED:</p>
                            <p className="text-gray-300 text-sm">Real-time webhooks = instant balance updates (no polling bullshit)</p>
                        </div>
                    </div>
                </Section>

                {/* TIMELINE */}
                <div className="bg-gradient-to-r from-green-900/20 to-cyan-900/20 border-2 border-green-500 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-black text-white mb-4">TIMELINE ⚡</h2>
                    <div className="space-y-3">
                        <TimelineItem day="TODAY" task="Apply for Starling account (10 mins)" />
                        <TimelineItem day="1-3 DAYS" task="Account approved + sort code/account number" />
                        <TimelineItem day="DAY 4" task="Register API app at developer.starlingbank.com" />
                        <TimelineItem day="DAY 5" task="I build webhook + OAuth2 integration (4-6 hours)" />
                        <TimelineItem day="DAY 6" task="Test with £10 transfer ✓" />
                        <TimelineItem day="DAY 7" task="LIVE - users cash out $P51 → £££ 🚀" />
                    </div>
                </div>

                {/* SECURITY */}
                <div className="bg-black border-2 border-cyan-500 rounded-xl p-6 mt-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-8 h-8 text-cyan-400" />
                        <h2 className="text-2xl font-black text-white">CRYPTO SECURITY</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <SecurityFeature 
                            title="HMAC-SHA256 Signatures"
                            description="Every webhook cryptographically verified"
                        />
                        <SecurityFeature 
                            title="OAuth2 Token Rotation"
                            description="Short-lived access tokens, auto-refresh"
                        />
                        <SecurityFeature 
                            title="Encrypted Storage"
                            description="All credentials encrypted at rest"
                        />
                        <SecurityFeature 
                            title="Rate Limiting"
                            description="Anti-fraud protection built-in"
                        />
                    </div>
                </div>

                {/* NEXT STEPS */}
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-xl p-6 mt-8">
                    <h2 className="text-2xl font-black text-white mb-4">NEXT STEPS BRO</h2>
                    <ol className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-pink-400 font-black">1.</span>
                            <span>Apply for Starling account TODAY (link above)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-pink-400 font-black">2.</span>
                            <span>Tell me when approved - I'll build the integration</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-pink-400 font-black">3.</span>
                            <span>Test with small £ amount first</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-pink-400 font-black">4.</span>
                            <span>GO LIVE - real £££ flowing ⚡♾️❤️♾️</span>
                        </li>
                    </ol>
                </div>

            </div>
        </div>
    );
}

// COMPONENTS

const Section = ({ title, icon: Icon, color, expanded, onToggle, children }) => {
    const colors = {
        cyan: 'border-cyan-500 bg-cyan-500/10',
        purple: 'border-purple-500 bg-purple-500/10',
        green: 'border-green-500 bg-green-500/10',
        pink: 'border-pink-500 bg-pink-500/10'
    };

    return (
        <div className={`border-2 ${colors[color]} rounded-xl mb-6 overflow-hidden`}>
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-all"
            >
                <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6" />
                    <h2 className="text-xl font-black">{title}</h2>
                </div>
                {expanded ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
            </button>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const CheckItem = ({ checked, onToggle, title, description }) => (
    <div 
        onClick={onToggle}
        className="flex items-start gap-3 p-4 bg-black/60 border border-white/10 rounded-lg hover:border-white/30 cursor-pointer transition-all"
    >
        <div className="flex-shrink-0 mt-1">
            {checked ? (
                <CheckCircle className="w-6 h-6 text-green-400" />
            ) : (
                <div className="w-6 h-6 rounded-full border-2 border-gray-600" />
            )}
        </div>
        <div className="flex-1">
            <p className={`font-bold ${checked ? 'text-green-400 line-through' : 'text-white'}`}>{title}</p>
            <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
    </div>
);

const FlowStep = ({ number, title, description, color }) => {
    const colors = {
        green: 'bg-green-500',
        cyan: 'bg-cyan-500',
        purple: 'bg-purple-500',
        pink: 'bg-pink-500'
    };

    return (
        <div className="flex items-start gap-4">
            <div className={`${colors[color]} w-10 h-10 rounded-full flex items-center justify-center font-black text-white flex-shrink-0`}>
                {number}
            </div>
            <div>
                <p className="text-white font-bold">{title}</p>
                <p className="text-gray-400 text-sm">{description}</p>
            </div>
        </div>
    );
};

const TimelineItem = ({ day, task }) => (
    <div className="flex items-center gap-3">
        <span className="text-green-400 font-black font-mono text-sm w-24">{day}</span>
        <span className="text-white">{task}</span>
    </div>
);

const SecurityFeature = ({ title, description }) => (
    <div className="bg-cyan-900/20 border border-cyan-500/50 rounded-lg p-4">
        <p className="text-cyan-400 font-bold text-sm mb-1">{title}</p>
        <p className="text-gray-300 text-xs">{description}</p>
    </div>
);