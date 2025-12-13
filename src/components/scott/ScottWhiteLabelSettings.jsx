import React, { useState, useEffect } from 'react';
import { Palette, Image, DollarSign, Users } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * WHITE-LABEL SETTINGS
 * Logo, colors, billing - for LA pitch
 */

export default function ScottWhiteLabelSettings() {
    const [settings, setSettings] = useState({
        logo_url: '',
        primary_color: '#ec4899',
        company_name: 'KINGDOM51',
        pricing_tier: 'solo', // solo, agency
        stripe_customer_id: null
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const user = await base44.auth.me();
            if (user.white_label_settings) {
                setSettings(user.white_label_settings);
            }
        } catch (e) {
            console.log('No settings yet');
        }
    };

    const saveSettings = async () => {
        try {
            setSaving(true);
            await base44.auth.updateMe({
                white_label_settings: settings
            });
            alert('✓ White-label settings saved');
        } catch (error) {
            alert('Error saving: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            setSettings({ ...settings, logo_url: file_url });
        } catch (error) {
            alert('Upload error: ' + error.message);
        }
    };

    return (
        <div className="bg-black border-2 border-pink-500 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-pink-400" />
                <h3 className="text-pink-400 font-black font-mono text-lg">WHITE-LABEL SETTINGS</h3>
            </div>

            {/* LOGO */}
            <div className="mb-6">
                <label className="text-white font-bold text-sm mb-2 block">YOUR LOGO</label>
                <div className="flex items-center gap-4">
                    {settings.logo_url && (
                        <img src={settings.logo_url} alt="Logo" className="w-20 h-20 object-contain border-2 border-pink-500 p-2" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="text-gray-400 text-sm"
                    />
                </div>
                <p className="text-gray-600 text-xs mt-2">This replaces KINGDOM51 logo everywhere</p>
            </div>

            {/* COMPANY NAME */}
            <div className="mb-6">
                <label className="text-white font-bold text-sm mb-2 block">COMPANY NAME</label>
                <input
                    type="text"
                    value={settings.company_name}
                    onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                    className="w-full bg-black border-2 border-pink-500/50 text-white px-4 py-2 font-mono"
                    placeholder="Your Management Company"
                />
            </div>

            {/* PRIMARY COLOR */}
            <div className="mb-6">
                <label className="text-white font-bold text-sm mb-2 block">PRIMARY COLOR</label>
                <div className="flex items-center gap-4">
                    <input
                        type="color"
                        value={settings.primary_color}
                        onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                        className="w-20 h-12 border-2 border-pink-500"
                    />
                    <input
                        type="text"
                        value={settings.primary_color}
                        onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                        className="bg-black border-2 border-pink-500/50 text-white px-4 py-2 font-mono text-sm"
                        placeholder="#ec4899"
                    />
                </div>
                <p className="text-gray-600 text-xs mt-2">Theme color for UI (buttons, borders, etc)</p>
            </div>

            {/* PRICING TIER */}
            <div className="mb-6">
                <label className="text-white font-bold text-sm mb-2 block">PRICING TIER</label>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setSettings({ ...settings, pricing_tier: 'solo' })}
                        className={`p-4 border-2 transition-all ${
                            settings.pricing_tier === 'solo'
                                ? 'border-green-500 bg-green-900/30'
                                : 'border-gray-700 bg-black'
                        }`}
                    >
                        <Users className="w-6 h-6 text-green-400 mb-2" />
                        <p className="text-white font-bold text-sm">SOLO</p>
                        <p className="text-green-400 text-xs">£50/month</p>
                        <p className="text-gray-500 text-xs">1-5 artists</p>
                    </button>

                    <button
                        onClick={() => setSettings({ ...settings, pricing_tier: 'agency' })}
                        className={`p-4 border-2 transition-all ${
                            settings.pricing_tier === 'agency'
                                ? 'border-cyan-500 bg-cyan-900/30'
                                : 'border-gray-700 bg-black'
                        }`}
                    >
                        <DollarSign className="w-6 h-6 text-cyan-400 mb-2" />
                        <p className="text-white font-bold text-sm">AGENCY</p>
                        <p className="text-cyan-400 text-xs">£200/month</p>
                        <p className="text-gray-500 text-xs">Unlimited artists</p>
                    </button>
                </div>
            </div>

            {/* SAVE */}
            <button
                onClick={saveSettings}
                disabled={saving}
                className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-black font-mono disabled:opacity-50"
            >
                {saving ? 'SAVING...' : '✓ SAVE WHITE-LABEL SETTINGS'}
            </button>

            <div className="mt-6 bg-green-900/20 border border-green-500/50 p-4">
                <p className="text-green-400 font-bold text-xs mb-2">💰 LA PITCH READY:</p>
                <ul className="text-gray-400 text-xs space-y-1">
                    <li>• Show them YOUR branded version</li>
                    <li>• Demo with their artists live</li>
                    <li>• £50/month (solo) or £200/month (agency)</li>
                    <li>• Works offline, proven tech</li>
                </ul>
            </div>
        </div>
    );
}