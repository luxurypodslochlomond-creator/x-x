import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, Globe, Lock, Eye, Heart, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const complianceItems = [
    {
        area: "GDPR (EU Data Protection)",
        status: "compliant",
        details: "All user data encrypted. Right to deletion honored. No dark patterns.",
        icon: Shield,
        color: "green"
    },
    {
        area: "COPPA (Child Safety)",
        status: "compliant",
        details: "13+ age restriction enforced. Parental consent required for under 13.",
        icon: Heart,
        color: "pink"
    },
    {
        area: "UK Companies House",
        status: "in_progress",
        details: "CIC (Community Interest Company) registration active. BRO51 is director.",
        icon: FileText,
        color: "blue"
    },
    {
        area: "Accessibility (WCAG AAA)",
        status: "compliant",
        details: "High contrast, screen reader support, keyboard navigation, dyslexia-friendly fonts.",
        icon: Eye,
        color: "purple"
    },
    {
        area: "Financial Transparency",
        status: "compliant",
        details: "10% tithe to missions is automatic and visible. No hidden fees.",
        icon: Globe,
        color: "cyan"
    },
    {
        area: "Data Privacy",
        status: "compliant",
        details: "We collect only what's needed. No tracking. No selling data. Ever.",
        icon: Lock,
        color: "yellow"
    }
];

export default function ComplianceTracker() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-12">
                
                <header className="text-center space-y-6">
                    <Shield className="w-20 h-20 text-blue-400 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #3b82f6)' }} />
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Compliance Tracker
                    </h1>
                    <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
                        Our promise: Stay legal, stay beautiful, stay true.
                    </p>
                </header>

                {/* Why This Matters */}
                <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/50">
                    <CardContent className="p-12 text-center space-y-4">
                        <h2 className="text-3xl font-black text-white">Why We Track This Publicly</h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Most companies hide their compliance in 40-page legal docs.<br />
                            We put ours in the open.<br />
                            <strong className="text-blue-400">Radical transparency = radical trust.</strong>
                        </p>
                    </CardContent>
                </Card>

                {/* Compliance Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {complianceItems.map((item, i) => (
                        <motion.div
                            key={item.area}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className={`bg-black/40 border-2 border-${item.color}-500/50 h-full`}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <item.icon className={`w-10 h-10 text-${item.color}-400`} />
                                            <div>
                                                <CardTitle className="text-xl text-white">{item.area}</CardTitle>
                                                <div className="flex items-center gap-2 mt-2">
                                                    {item.status === 'compliant' ? (
                                                        <>
                                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                                            <span className="text-sm text-green-400 font-bold">Compliant</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-5 h-5 rounded-full border-2 border-yellow-400 animate-pulse" />
                                                            <span className="text-sm text-yellow-400 font-bold">In Progress</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-300">{item.details}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* The Zero Bullshit Promise */}
                <Card className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border-2 border-pink-500/50">
                    <CardContent className="p-12 text-center space-y-6">
                        <Heart className="w-16 h-16 text-pink-400 mx-auto" />
                        <h2 className="text-3xl font-black text-white">The Zero Bullshit Promise</h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            If we break a law, we'll tell you immediately.<br />
                            If we make a mistake, we'll fix it publicly.<br />
                            If a regulation changes, we'll adapt with love.<br />
                            <strong className="text-pink-400">No hiding. No corporate speak. Just truth.</strong>
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}