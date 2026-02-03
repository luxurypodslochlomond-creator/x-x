import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Lock, Eye, Zap, Package, Bell, Smartphone, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';

export default function ScottSettings() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('security');
    const [extensionPin] = useState('5717');
    const [pushEnabled, setPushEnabled] = useState(false);
    const [pwaInstalled, setPwaInstalled] = useState(false);
    const [notificationsLoading, setNotificationsLoading] = useState(false);

    useEffect(() => {
        // Check if PWA is installed
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
        setPwaInstalled(isStandalone);

        // Check if push notifications enabled
        if ('serviceWorkerContainer' in navigator && 'PushManager' in window) {
            navigator.serviceWorkerContainer.ready.then(async (reg) => {
                const sub = await reg.pushManager.getSubscription();
                setPushEnabled(!!sub);
            });
        }
    }, []);

    const handleEnablePushNotifications = async () => {
        setNotificationsLoading(true);
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                setPushEnabled(true);
            }
        } catch (e) {
            console.error('Push notification setup failed:', e);
        } finally {
            setTimeout(() => setNotificationsLoading(false), 500);
        }
    };

    const handleDisablePushNotifications = async () => {
        try {
            if ('serviceWorkerContainer' in navigator) {
                const reg = await navigator.serviceWorkerContainer.ready;
                const sub = await reg.pushManager.getSubscription();
                if (sub) {
                    await sub.unsubscribe();
                    await base44.functions.invoke('removePushSubscription', {});
                    setPushEnabled(false);
                }
            }
        } catch (e) {
            console.error('Push notification disable failed:', e);
        }
    };

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
                <div className="space-y-8 pb-8">
                    <div className="border-2 border-cyan-500/40 rounded-xl p-8 bg-cyan-500/5">
                        <div className="flex items-start gap-4">
                            <Bell className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                                <h3 className="text-2xl font-black text-cyan-400 mb-2">Push Notifications</h3>
                                <p className="text-base text-gray-300 leading-relaxed">Get instant alerts on your phone when gigs arrive</p>
                            </div>
                        </div>
                    </div>

                    {!pwaInstalled ? (
                        <button
                            onClick={() => {
                                if (window.deferredPrompt) {
                                    window.deferredPrompt.prompt();
                                } else if (navigator.userAgent.includes('iPhone')) {
                                    alert('📱 Tap Share → Add to Home Screen in Safari');
                                } else if (navigator.userAgent.includes('Android')) {
                                    alert('🤖 Tap menu (⋮) → Install app');
                                }
                            }}
                            className="w-full border-3 border-amber-500/60 rounded-xl p-8 bg-amber-900/20 hover:bg-amber-900/30 transition-all active:scale-95"
                        >
                            <div className="flex items-start gap-4">
                                <Download className="w-7 h-7 text-amber-400 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 text-left">
                                    <p className="font-black text-amber-300 text-lg mb-2">Step 1: Add CB51 to Home Screen</p>
                                    <div className="space-y-3 text-sm text-amber-200">
                                        <p className="font-mono bg-black/40 p-3 rounded text-amber-100">🍎 Safari → Share → Add to Home Screen</p>
                                        <p className="font-mono bg-black/40 p-3 rounded text-amber-100">🤖 Menu (⋮) → Install app</p>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ) : (
                        <div className="border-3 border-green-500/50 rounded-xl p-8 bg-green-900/20">
                            <div className="flex items-center gap-4">
                                <CheckCircle className="w-7 h-7 text-green-400 flex-shrink-0" />
                                <div className="flex-1 text-left">
                                    <p className="font-black text-green-300 text-lg">✓ PWA Installed</p>
                                    <p className="text-base text-green-200">Ready for notifications</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {pwaInstalled && !pushEnabled && (
                        <div className="text-center">
                            <p className="text-gray-400 text-sm font-mono mb-4">Step 2: Turn on notifications</p>
                        </div>
                    )}

                    {pwaInstalled && (
                        <button
                            onClick={pushEnabled ? handleDisablePushNotifications : handleEnablePushNotifications}
                            disabled={notificationsLoading}
                            className={`w-full py-6 rounded-xl font-black text-lg transition-all active:scale-95 ${
                                pushEnabled
                                    ? 'bg-red-600/40 hover:bg-red-600/60 text-red-300'
                                    : 'bg-cyan-500 hover:bg-cyan-600 text-black'
                            } disabled:opacity-60 disabled:cursor-not-allowed`}
                        >
                            {notificationsLoading ? '⏳ Setting up...' : pushEnabled ? '❌ Disable Notifications' : '✓ Enable Notifications'}
                        </button>
                    )}

                    {pushEnabled && (
                        <div className="bg-green-900/20 border-2 border-green-500/50 rounded-xl p-6">
                            <p className="text-base text-green-300 font-mono text-center">✓ Active — you're set!</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'devices' && (
                <div className="space-y-4">
                    <div className="border border-cyan-500/50 rounded-lg p-6 bg-black/40">
                        <div className="flex items-start gap-3 mb-4">
                            <Smartphone className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                                <h3 className="text-lg font-black text-cyan-400 mb-1">PWA Installation Status</h3>
                                <p className="text-sm text-gray-400">Manage CB51 on your devices</p>
                            </div>
                        </div>
                    </div>

                    {pwaInstalled ? (
                        <div className="border border-green-500/50 rounded-lg p-4 bg-green-900/20 flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-bold text-green-400">✓ CB51 Installed</p>
                                <p className="text-xs text-green-400/60">Runs on your home screen • You'll get push notifications</p>
                            </div>
                        </div>
                    ) : (
                        <div className="border border-amber-500/50 rounded-lg p-4 bg-amber-900/20">
                            <div className="flex items-start gap-3">
                                <Download className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-amber-400 mb-3">Add CB51 to your home screen</p>
                                    <div className="text-xs text-amber-400/80 space-y-2 mb-3 bg-black/40 p-2 rounded">
                                        <p className="font-mono"><span className="text-amber-300">🍎 iPhone:</span> open Safari, tap Share, scroll down → Add to Home Screen</p>
                                        <p className="font-mono"><span className="text-amber-300">🤖 Android:</span> tap menu (three dots), scroll down → Install app</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="border border-cyan-500/30 rounded-lg p-4 bg-black/40">
                        <p className="text-xs text-gray-400 leading-relaxed">
                            <span className="text-cyan-400 font-bold">Why install?</span> You get a home screen icon like any app, instant push notifications when gigs arrive, and works offline. That's it. ♾️
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}