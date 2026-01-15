import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, ArrowLeft, Mail, DollarSign, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * LIVE - Scott's sketch
 * 3 sections: Bookings, Admin, Logistics
 */

export default function ScottLive() {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    const sections = [
        {
            title: 'BOOKINGS',
            subtitle: '99 overview of App, pick up from Email',
            icon: Mail,
            color: 'pink',
            link: createPageUrl('ScottLiveBookings') + (artistId ? `?id=${artistId}` : '')
        },
        {
            title: 'CONTRACTS & DOCS',
            subtitle: 'Legal • Contracts • Insurance • Invoices',
            icon: DollarSign,
            color: 'amber',
            link: createPageUrl('ScottLiveAdmin') + (artistId ? `?id=${artistId}` : '')
        },
        {
            title: 'LOGISTICS',
            subtitle: 'On tour',
            icon: MapPin,
            color: 'cyan',
            link: createPageUrl('ScottLiveLogistics') + (artistId ? `?id=${artistId}` : '')
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-all mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">BACK</span>
            </button>

            <div className="mb-8">
                <h1 className="text-4xl font-black text-white font-mono mb-2">LIVE</h1>
                <p className="text-gray-600 text-xs font-mono">Gigs • Shows • Events</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {sections.map((section) => {
                    const Icon = section.icon;
                    
                    return (
                        <Link key={section.title} to={section.link}>
                            <motion.div
                                whileHover={{ scale: 0.98 }}
                                whileTap={{ scale: 0.96 }}
                                className="bg-black border border-gray-800 hover:border-cyan-400 rounded p-6 transition-all flex items-center gap-4"
                            >
                                <Icon className="w-6 h-6 text-gray-500" />
                                <div className="flex-1">
                                    <p className="text-white font-black text-lg font-mono">
                                        {section.title}
                                    </p>
                                    <p className="text-gray-600 text-xs font-mono mt-1">
                                        {section.subtitle}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-12 text-center">
                <p className="text-gray-600 text-xs font-mono">CB51 • Live Performance</p>
            </div>
        </div>
    );
}