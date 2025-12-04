
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Shield, TrendingUp, FileText, Globe, GitMerge, Users, ArrowRight, Briefcase, Banknote } from 'lucide-react';
import QuantumButton from '@/components/shared/QuantumButton';

const InfoCard = ({ icon: Icon, title, text }) => (
    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 h-full">
        <Icon className="w-8 h-8 text-cyan-400 mb-3"/>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 mt-2 text-sm leading-relaxed">{text}</p>
    </div>
);

const LinkCard = ({ icon: Icon, title, text, url }) => (
    <Link to={url}>
        <motion.div 
            whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)' }}
            className="bg-black/40 p-6 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 h-full cursor-pointer"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Icon className="w-8 h-8 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-500" />
            </div>
            <p className="text-gray-400 text-sm mt-3">{text}</p>
        </motion.div>
    </Link>
);


export default function ProfessionalBriefing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white p-6 md:p-12 font-mono">
      <div className="max-w-4xl mx-auto space-y-16">

        <header className="text-center space-y-4 pt-12">
            <Briefcase className="w-16 h-16 text-cyan-300 mx-auto" />
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                The UF51 Impact Briefing
            </h1>
            <p className="text-lg text-cyan-200">
                Prepared for Drew.
            </p>
        </header>

        <section>
            <Card className="bg-transparent border-0">
                <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-3xl font-bold text-center text-white">A Verifiable Impact Instrument</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto mb-8">
                        UF51 is not a charity; it is a live, auditable engine for planetary and social healing. We provide a direct solution to the primary challenge of modern ESG: the need for verifiable, real-time data to satisfy fiduciary duty.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InfoCard
                            icon={Shield}
                            title="Fiduciary Duty, Fulfilled"
                            text="Our immutable ledger provides the proof of impact required to confidently meet your obligations to stakeholders."
                        />
                        <InfoCard
                            icon={TrendingUp}
                            title="Live, Auditable Data"
                            text="Go beyond static reports. We offer a real-time data feed of every healing action, providing unparalleled transparency."
                        />
                        <InfoCard
                            icon={GitMerge}
                            title="Professional Structure"
                            text="Our governance is designed for alignment with familiar, respected legal frameworks like the Jersey 'Purpose Trust' model."
                        />
                    </div>
                </CardContent>
            </Card>
        </section>

        <section className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-white">The Live Evidence</h2>
            <p className="text-center text-lg text-gray-300 max-w-2xl mx-auto">
                The following portals provide a direct, real-time view into the heart of our operations. This is not a demonstration; this is the live system.
            </p>
            <div className="space-y-6">
                 <LinkCard
                    icon={Globe}
                    title="The Live Map of Love"
                    text="Witness every cleanup, mission, and act of love appear on our global map, second by second. This is your live impact feed."
                    url={createPageUrl('Map')}
                />
                 <LinkCard
                    icon={Banknote}
                    title="The Universal Love Treasury"
                    text="Explore our transparent fund, showing every contribution and distribution. See exactly where the energy flows."
                    url={createPageUrl('UniversalLoveTreasury')}
                />
                 <LinkCard
                    icon={Users}
                    title="Our Governance Framework"
                    text="Review our professional structure, built on the principles of a Charitable Purpose Trust for maximum integrity and impact."
                    url={createPageUrl('Governance')}
                />
                 <LinkCard
                    icon={FileText}
                    title="The Foundational Mathematics"
                    text="For a deeper analysis, this document outlines the economic physics that make our verifiable value system possible."
                    url={createPageUrl('SacredMathematics')}
                />
            </div>
        </section>

        <section className="text-center pt-8">
            <h2 className="text-3xl font-bold text-white mb-4">Next Steps</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                We believe this represents a paradigm shift in how impact is measured, funded, and verified. We are ready to schedule a deeper dialogue to explore a potential alliance.
            </p>
            <QuantumButton 
                onClick={() => window.location.href = createPageUrl('Contact')}
                className="!bg-gradient-to-r !from-cyan-500 !to-purple-600 !text-lg !px-10 !py-4"
            >
                Schedule a Deeper Dialogue
            </QuantumButton>
        </section>

        <footer className="text-center border-t border-gray-800 pt-8 mt-16">
            <p className="text-gray-500 font-mono">UF51.LOVE // With love and professional respect.</p>
        </footer>

      </div>
    </div>
  );
}
