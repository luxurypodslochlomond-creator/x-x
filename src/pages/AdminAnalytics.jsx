import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Eye, AlertTriangle, Heart, Music, Globe, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ADMIN ANALYTICS DASHBOARD
 * Privacy-first metrics - WHAT works, not WHO
 */

export default function AdminAnalytics() {
    const [timeRange, setTimeRange] = useState(7); // days

    const { data: analytics = [], isLoading } = useQuery({
        queryKey: ['privacyAnalytics'],
        queryFn: () => base44.entities.PrivacyAnalytics.list('-created_date', 10000)
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <Activity className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-mono">Loading analytics...</p>
                </div>
            </div>
        );
    }

    // Aggregate by event type
    const eventCounts = analytics.reduce((acc, item) => {
        acc[item.event_type] = (acc[item.event_type] || 0) + 1;
        return acc;
    }, {});

    const eventData = Object.entries(eventCounts).map(([name, value]) => ({ name, value }));

    // Aggregate by page
    const pageCounts = analytics
        .filter(a => a.page_name)
        .reduce((acc, item) => {
            acc[item.page_name] = (acc[item.page_name] || 0) + 1;
            return acc;
        }, {});

    const pageData = Object.entries(pageCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    // Device breakdown
    const deviceCounts = analytics.reduce((acc, item) => {
        acc[item.device_type] = (acc[item.device_type] || 0) + 1;
        return acc;
    }, {});

    const deviceData = Object.entries(deviceCounts).map(([name, value]) => ({ name, value }));

    // Errors
    const errors = analytics.filter(a => a.event_type === 'error').slice(0, 20);

    // Offline usage
    const offlineCount = analytics.filter(a => a.is_offline).length;
    const offlinePercent = Math.round((offlineCount / analytics.length) * 100);

    const COLORS = ['#22d3ee', '#a855f7', '#ec4899', '#10b981', '#f59e0b'];

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-24">
            
            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-4xl font-black text-cyan-400 mb-2">PRIVACY-FIRST ANALYTICS</h1>
                <p className="text-gray-500 font-mono text-sm">Aggregate patterns • Zero individual tracking ♾️</p>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-lg p-4"
                >
                    <Eye className="w-8 h-8 text-cyan-400 mb-2" />
                    <p className="text-3xl font-black text-white">{analytics.length}</p>
                    <p className="text-xs text-gray-400 font-mono">Total Events</p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-lg p-4"
                >
                    <Activity className="w-8 h-8 text-purple-400 mb-2" />
                    <p className="text-3xl font-black text-white">{Object.keys(pageCounts).length}</p>
                    <p className="text-xs text-gray-400 font-mono">Pages Used</p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-lg p-4"
                >
                    <Globe className="w-8 h-8 text-green-400 mb-2" />
                    <p className="text-3xl font-black text-white">{offlinePercent}%</p>
                    <p className="text-xs text-gray-400 font-mono">Offline Usage</p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500 rounded-lg p-4"
                >
                    <AlertTriangle className="w-8 h-8 text-red-400 mb-2" />
                    <p className="text-3xl font-black text-white">{errors.length}</p>
                    <p className="text-xs text-gray-400 font-mono">Errors Logged</p>
                </motion.div>
            </div>

            {/* CHARTS */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                
                {/* Event Types */}
                <div className="bg-gray-900/60 border border-cyan-500/30 rounded-lg p-6">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-cyan-400" />
                        Event Types
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={eventData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                {eventData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #22d3ee' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Device Types */}
                <div className="bg-gray-900/60 border border-purple-500/30 rounded-lg p-6">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-purple-400" />
                        Device Breakdown
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                {deviceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #a855f7' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>

            {/* TOP PAGES */}
            <div className="bg-gray-900/60 border border-green-500/30 rounded-lg p-6 mb-8">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-green-400" />
                    Most Used Pages
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={pageData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#999" fontSize={12} />
                        <YAxis stroke="#999" />
                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #10b981' }} />
                        <Bar dataKey="count" fill="#10b981" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* RECENT ERRORS */}
            {errors.length > 0 && (
                <div className="bg-gray-900/60 border border-red-500/30 rounded-lg p-6">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        Recent Errors (Last {errors.length})
                    </h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {errors.map((error, i) => (
                            <div key={i} className="bg-black border border-red-500/20 rounded p-3">
                                <p className="text-red-400 font-mono text-xs mb-1">{error.error_message}</p>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span>Page: {error.page_name}</span>
                                    <span>•</span>
                                    <span>{new Date(error.created_date).toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* PRIVACY NOTICE */}
            <div className="mt-8 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-lg p-6 text-center">
                <Heart className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-green-400 font-black text-xl mb-2">ZERO INDIVIDUAL TRACKING ✓</p>
                <p className="text-gray-300 text-sm">
                    We track WHAT works (features, pages, errors) - NOT WHO uses it.
                    <br/>No cookies. No third parties. No surveillance. Just aggregate patterns.
                </p>
                <p className="text-cyan-400 font-bold text-xs mt-3 font-mono">
                    Privacy = love ♾️❤️♾️
                </p>
            </div>

        </div>
    );
}