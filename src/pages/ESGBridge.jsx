import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import QuantumButton from '@/components/shared/QuantumButton';
import ESGContactModal from '@/components/ESGContactModal';
import { Shield, GitMerge, Target, Layers, ArrowRight, CheckCircle, BarChart, Globe } from 'lucide-react';

const StrategyCard = ({ icon: Icon, title, children }) => (
    <div className="bg-black/40 rounded-2xl p-6 border border-gray-700/50 h-full">
        <div className="flex items-center gap-4 mb-4">
            <Icon className="w-8 h-8 text-green-300" />
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="text-gray-400 space-y-2 text-sm">
            {children}
        </div>
    </div>
);

export default function ESGBridge() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-green-950/50 to-black text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-16">

        <header className="text-center space-y-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
            <GitMerge className="w-24 h-24 text-green-300 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #6ee7b7)'}} />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-green-300 via-cyan-300 to-white bg-clip-text text-transparent">
            The ESG Bridge
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your direct, verifiable, and frictionless API for real-world Environmental, Social, and Governance impact.
          </p>
        </header>

        <section>
          <Card className="bg-black/50 border-2 border-green-500/30 rounded-3xl p-8 md:p-12">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-3xl font-bold text-center text-white">Supercharge Your Sustainability Goals</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-center text-lg text-gray-300 max-w-3xl mx-auto">
              <p>
                UniversalFamily51 provides a revolutionary solution for funds, corporations, and foundations seeking to meet and exceed their ESG mandates. We have eliminated the distance between capital and consequence, creating an auditable, real-time trail of positive planetary and social change.
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
            <Card className="bg-gradient-to-br from-gray-900 to-black/50 border-2 border-purple-500/30 rounded-3xl p-8 md:p-12">
                <CardHeader className="p-0 mb-6 text-center">
                    <Shield className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                    <CardTitle className="text-3xl font-bold text-white">Fulfilling Your Fiduciary Duty</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto mb-8">
                        We understand that a trustee's primary role is to act in the best interest of beneficiaries. In today's landscape, ignoring material ESG factors can be a breach of that duty. UF51 transforms this risk into an opportunity.
                    </p>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                            <span><strong className="text-white">De-risk Your Portfolio:</strong> By providing a direct, auditable line to positive environmental and social action, we help you mitigate risks associated with inaction on ESG mandates.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                            <span><strong className="text-white">Verifiable Impact, Not Vague Promises:</strong> Move beyond corporate self-reporting. Our platform provides immutable, real-time data on every action funded, providing the proof you need.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                            <span><strong className="text-white">Align with Long-Term Value:</strong> A healthy planet and stable society are prerequisites for long-term economic value. Funding UF51 is a direct investment in the foundational stability that all other investments depend on.</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </section>

        <section>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">How UF51 Aligns With Your ESG Strategy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <StrategyCard icon={Target} title="Sustainability-Themed Investing">
                    <p>For funds focused on specific themes like <strong className="text-white">waste reduction, pollution control, or ecosystem restoration,</strong> UF51 is your ultimate asset.</p>
                    <p>Every contribution directly funds on-the-ground cleanup operations, providing a direct investment in a cleaner planet.</p>
                </StrategyCard>
                <StrategyCard icon={CheckCircle} title="Positive Screening & Impact">
                    <p>Our platform is a "best-in-class" impact asset by design. We don't just exclude bad actors; <strong className="text-white">we exclusively generate value from positive actions.</strong></p>
                    <p>This provides a powerful, pre-screened tool for portfolios aiming to hold assets that create tangible social and environmental good.</p>
                </StrategyCard>
                 <StrategyCard icon={Layers} title="ESG Integration">
                    <p>Easily integrate high-impact, <strong className="text-white">material ESG factors</strong> into your existing portfolio.</p>
                    <p>Our system provides the clear, simple data you need on environmental cleanup (E) and community engagement (S), making your reporting and analysis effortless.</p>
                </StrategyCard>
            </div>
        </section>

        <section>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Irrefutable Data Loop</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">We provide an unbroken, publicly verifiable chain of evidence from contribution to impact, eliminating "impact washing" and guaranteeing authenticity.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center font-mono text-sm text-cyan-300">
                <div className="p-4 border border-cyan-500/30 rounded-xl bg-black/30">CAPITAL IN</div>
                <div className="flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-cyan-500" />
                </div>
                <div className="p-4 border border-cyan-500/30 rounded-xl bg-black/30">HEALING ACTION</div>
                <div className="hidden md:flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-cyan-500" />
                </div>
                <div className="p-4 border border-cyan-500/30 rounded-xl bg-black/30 md:hidden">VERIFIED PROOF</div>
                <div className="hidden md:block p-4 border border-cyan-500/30 rounded-xl bg-black/30">VERIFIED PROOF (Photo+GPS)</div>
                <div className="flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-cyan-500" />
                </div>
                <div className="p-4 border border-cyan-500/30 rounded-xl bg-black/30">IMPACT DATA OUT</div>
            </div>
          </div>
        </section>

        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-black/40 p-8 rounded-2xl border border-gray-700">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><BarChart className="w-6 h-6 text-green-300"/> For Fund Managers</h3>
                    <ul className="space-y-3 text-gray-300 list-disc list-inside">
                        <li>Access real-time, auditable data for ESG reporting.</li>
                        <li>Directly satisfy FCA "Sustainability Impact" labels.</li>
                        <li>Gain a powerful narrative of tangible, ground-level change.</li>
                        <li>Eliminate the risk of "greenwashing" with our transparent ledger.</li>
                    </ul>
                </div>
                <div className="bg-black/40 p-8 rounded-2xl border border-gray-700">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><Globe className="w-6 h-6 text-cyan-300"/> For Our Planet</h3>
                     <ul className="space-y-3 text-gray-300 list-disc list-inside">
                        <li>Direct funding for waste removal from oceans, rivers, and forests.</li>
                        <li>Empowerment of local communities to become planetary stewards.</li>
                        <li>A scalable model for global ecosystem restoration.</li>
                        <li>Creation of a new economy based on healing, not extraction.</li>
                    </ul>
                </div>
            </div>
        </section>

        <section className="text-center pt-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Build a Better World?</h2>
            <p className="text-lg text-gray-400 mb-8">Connect with our alliance team to explore a partnership.</p>
            <a href="mailto:family@uf51.love">
                <QuantumButton className="!bg-gradient-to-r !from-green-500 !to-cyan-500 !text-black !font-bold">
                    Contact Us
                </QuantumButton>
            </a>
        </section>

      </div>
    </div>
  );
}