import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Lock, Eye, Zap, Package, Bell, Smartphone, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';

export default function ScottSettings() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('security');
    const [extensionPin] = useState('5717');

    const tabs = [
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'extension', label: 'Extension', icon: Package },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'devices', label: 'Devices', icon: Smartphone }
    ];

    const handleCopyPin = () => {
        navigator.clipboard.writeText(extensionPin);
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-20">
            {/* HEADER */}
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">BACK</span>
            </button>

            {/* TITLE */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-8 h-8 text-cyan-400" />
                    <h1 className="text-3xl font-black text-white">Settings</h1>
                </div>
                <p className="text-gray-500 font-mono text-sm">Manage extension, devices & security</p>
            </div>

            {/* TABS */}
            <div className="mb-8 flex gap-2 overflow-x-auto border border-cyan-500/30 rounded-lg p-1 bg-black/40">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded font-mono text-xs font-bold whitespace-nowrap transition-all ${
                                activeTab === tab.id
                                    ? 'bg-cyan-500 text-black'
                                    : 'text-cyan-400 hover:text-cyan-300'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* TAB CONTENT */}
            {activeTab === 'security' && (
                <div className="space-y-4">
                    <div className="border border-cyan-500/50 rounded-lg p-6 bg-black/40">
                        <div className="flex items-start gap-3 mb-6">
                            <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-black text-cyan-400 mb-2">Security & Privacy</h3>
                                <p className="text-sm text-gray-400">Your data is protected by military-grade encryption. You're in control.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {[
                            { icon: Lock, title: 'End-to-End Encryption', desc: 'Your data stays yours' },
                            { icon: Shield, title: 'User Data Sovereignty', desc: 'You own everything' },
                            { icon: Package, title: 'Data Isolation', desc: 'Clean separation' },
                            { icon: Eye, title: 'Privacy by Design', desc: 'Built in from the start' },
                            { icon: Zap, title: 'Infrastructure Security', desc: 'Bulletproof setup' }
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} className="border border-cyan-500/30 rounded-lg p-4 bg-black/40 flex items-center justify-between hover:border-cyan-500/50 transition-all cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold text-cyan-400">{item.title}</p>
                                            <p className="text-xs text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                    <span className="text-cyan-400 text-lg">›</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="border border-cyan-500/30 rounded-lg p-4 bg-black/40 text-xs text-gray-500 mt-6">
                        Questions? Email <span className="text-cyan-400 font-mono">family@uf51.love</span> – we answer everything.
                    </div>
                </div>
            )}

            {activeTab === 'extension' && (
                <div className="space-y-4">
                    <div className="border border-cyan-500/50 rounded-lg p-6 bg-black/40">
                        <h3 className="text-lg font-black text-cyan-400 mb-3">Extension PIN</h3>
                        <p className="text-sm text-gray-400 mb-4">Use this PIN to connect the email scanner to CB51</p>
                        
                        <div className="flex gap-3">
                            <div className="flex-1 bg-black border border-cyan-500/30 rounded-lg p-4 text-center">
                                <p className="text-3xl font-black text-cyan-400 font-mono">{extensionPin}</p>
                            </div>
                            <button
                                onClick={handleCopyPin}
                                className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-6 rounded-lg transition-all font-mono text-sm"
                            >
                                Copy
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 mt-4 flex items-start gap-2">
                            <span className="text-cyan-400">📋</span>
                            <span>Share this PIN with team members to let them access the extension for this artist.</span>
                        </p>
                    </div>
                </div>
            )}

            {activeTab === 'notifications' && (
                <div className="space-y-4">
                    <div className="border border-cyan-500/50 rounded-lg p-6 bg-black/40">
                        <h3 className="text-lg font-black text-cyan-400 mb-2">Push Notifications</h3>
                        <p className="text-sm text-gray-400">Get notified when new gigs arrive</p>
                    </div>
                    <p className="text-gray-500 font-mono text-xs text-center py-8">Notification settings coming soon</p>
                </div>
            )}

            {activeTab === 'devices' && (
                <div className="space-y-4">
                    <div className="border border-cyan-500/50 rounded-lg p-6 bg-black/40">
                        <h3 className="text-lg font-black text-cyan-400 mb-2">Connected Devices</h3>
                        <p className="text-sm text-gray-400 mb-4">Remove devices to revoke access instantly</p>
                        <p className="text-sm text-gray-600">No connected devices yet</p>
                    </div>
                </div>
            )}
        </div>
    );
}