import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, DollarSign, FileText, Globe, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CB51FinanceAdmin() {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const sections = [
        { title: 'INVOICES', icon: DollarSign, link: createPageUrl('CB51Invoices') + (artistId ? `?id=${artistId}` : '') },
        { title: 'ACCOUNTS', icon: FileText, link: createPageUrl('CB51FinancialDashboard') + (artistId ? `?id=${artistId}` : '') },
        { title: 'VISAS', icon: Globe, link: createPageUrl('CB51Visas') + (artistId ? `?id=${artistId}` : '') },
        { title: 'LEGAL', icon: Scale, link: createPageUrl('CB51Contracts') + (artistId ? `?id=${artistId}` : '') },
    ];

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <h1 className="text-3xl font-black text-cyan-400 font-mono mb-4">FINANCE</h1>

            <div className="grid grid-cols-1 gap-2">
                {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <Link key={section.title} to={section.link}>
                            <motion.div whileHover={{ scale: 0.98 }} className="bg-black border-2 border-amber-500 rounded p-4 flex items-center gap-3">
                                <Icon className="w-6 h-6 text-amber-400" />
                                <span className="text-white font-black font-mono">{section.title}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}