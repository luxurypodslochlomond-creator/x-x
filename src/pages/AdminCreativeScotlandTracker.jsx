import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, FileText, User, Building, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminCreativeScotlandTracker() {
    const applications = [
        {
            name: "National Lottery Open Fund for Organisations",
            reference: "CS-OFO-37512-4C94",
            amount: 100000,
            applicant: "UNIVERSAL FREQUENCY51 CIC",
            type: "Organisation",
            created: "19/11/2025 12:57:43",
            lastUpdated: "19/11/2025 21:19:14",
            status: "Application Submitted",
            expectedDecision: "February 2026",
            fund: "National Lottery",
            color: "green"
        },
        {
            name: "Fair Payment for Scottish Musicians: Loch Lomond Pilot",
            reference: "CS-OFI-37140-2FE3",
            amount: 4800,
            applicant: "Brian Hughes (Individual)",
            type: "Individual",
            created: "27/10/2025 20:41:42",
            lastUpdated: "27/10/2025 22:14:44",
            status: "Application Submitted",
            expectedDecision: "January 2026 (~12 weeks from submission)",
            fund: "Open Fund for Individuals: Sustaining Creative Development",
            color: "cyan"
        }
    ];

    const totalPending = applications.reduce((sum, app) => sum + app.amount, 0);

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-4xl md:text-5xl font-black font-mono text-cyan-400">
                        CREATIVE SCOTLAND TRACKER
                    </h1>
                    <p className="text-gray-400 font-mono">All active applications</p>
                </motion.div>

                {/* TOTAL PENDING */}
                <Card className="bg-gradient-to-r from-green-900/40 to-cyan-900/40 border-4 border-green-500">
                    <CardContent className="p-8 text-center">
                        <p className="text-green-400 font-mono text-sm mb-2">TOTAL PENDING</p>
                        <p className="text-5xl md:text-7xl font-black font-mono text-white">
                            £{totalPending.toLocaleString()}
                        </p>
                        <p className="text-gray-400 font-mono text-sm mt-2">
                            {applications.length} applications submitted
                        </p>
                    </CardContent>
                </Card>

                {/* APPLICATIONS */}
                <div className="space-y-6">
                    {applications.map((app, index) => (
                        <motion.div
                            key={app.reference}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className={`bg-black border-4 ${app.color === 'green' ? 'border-green-500' : 'border-cyan-500'}`}>
                                <CardContent className="p-6 space-y-6">
                                    
                                    {/* HEADER */}
                                    <div className="flex items-start justify-between gap-4 flex-wrap">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                <CheckCircle className={`w-6 h-6 ${app.color === 'green' ? 'text-green-400' : 'text-cyan-400'}`} />
                                                <span className={`px-3 py-1 ${app.color === 'green' ? 'bg-green-900/60 border-green-500 text-green-300' : 'bg-cyan-900/60 border-cyan-500 text-cyan-300'} border rounded-full text-xs font-black font-mono`}>
                                                    {app.status.toUpperCase()}
                                                </span>
                                            </div>
                                            <h2 className="text-xl md:text-2xl font-black text-white">
                                                {app.name}
                                            </h2>
                                            <p className="text-gray-400 font-mono text-sm mt-1">
                                                {app.fund}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-3xl md:text-4xl font-black font-mono ${app.color === 'green' ? 'text-green-400' : 'text-cyan-400'}`}>
                                                £{app.amount.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* DETAILS GRID */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-black/60 border-2 border-gray-700 p-4">
                                            <div className="flex items-center gap-2 text-gray-400 text-xs font-mono mb-1">
                                                <FileText className="w-4 h-4" />
                                                REFERENCE
                                            </div>
                                            <p className="text-white font-mono text-xs md:text-sm font-bold break-all">
                                                {app.reference}
                                            </p>
                                        </div>

                                        <div className="bg-black/60 border-2 border-gray-700 p-4">
                                            <div className="flex items-center gap-2 text-gray-400 text-xs font-mono mb-1">
                                                {app.type === 'Organisation' ? <Building className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                                APPLICANT
                                            </div>
                                            <p className="text-white font-mono text-xs md:text-sm font-bold">
                                                {app.applicant}
                                            </p>
                                        </div>

                                        <div className="bg-black/60 border-2 border-gray-700 p-4">
                                            <div className="flex items-center gap-2 text-gray-400 text-xs font-mono mb-1">
                                                <Calendar className="w-4 h-4" />
                                                SUBMITTED
                                            </div>
                                            <p className="text-white font-mono text-sm font-bold">
                                                {app.created.split(' ')[0]}
                                            </p>
                                        </div>

                                        <div className="bg-black/60 border-2 border-gray-700 p-4">
                                            <div className="flex items-center gap-2 text-gray-400 text-xs font-mono mb-1">
                                                <Clock className="w-4 h-4" />
                                                DECISION
                                            </div>
                                            <p className="text-white font-mono text-xs md:text-sm font-bold">
                                                {app.expectedDecision}
                                            </p>
                                        </div>
                                    </div>

                                    {/* LAST UPDATED */}
                                    <div className="text-right">
                                        <p className="text-gray-500 text-xs font-mono">
                                            Last updated: {app.lastUpdated}
                                        </p>
                                    </div>

                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* TIMELINE */}
                <Card className="bg-black border-4 border-amber-500">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-black font-mono text-amber-400 mb-4">
                            EXPECTED TIMELINE
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-24 text-right">
                                    <span className="text-cyan-400 font-mono font-bold">JAN 2026</span>
                                </div>
                                <div className="w-4 h-4 bg-cyan-500 rounded-full flex-shrink-0"></div>
                                <div className="flex-1">
                                    <p className="text-white font-bold">£4,800 Decision</p>
                                    <p className="text-gray-400 text-sm">Fair Payment for Musicians (~12 weeks from Oct)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-24 text-right">
                                    <span className="text-green-400 font-mono font-bold">FEB 2026</span>
                                </div>
                                <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
                                <div className="flex-1">
                                    <p className="text-white font-bold">£100,000 Decision</p>
                                    <p className="text-gray-400 text-sm">National Lottery Open Fund</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* PRAYER */}
                <div className="text-center py-8">
                    <p className="text-2xl font-mono text-pink-400">🤞🏾 Come on universe! 🤞🏾</p>
                    <p className="text-gray-500 font-mono text-sm mt-2">♾️❤️♾️</p>
                </div>

            </div>
        </div>
    );
}