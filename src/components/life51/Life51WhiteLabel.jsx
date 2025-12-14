import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Palette, Upload, Check } from 'lucide-react';

/**
 * WHITE LABEL SETTINGS
 * Rebrand per client - logo, colors, name
 */

export default function Life51WhiteLabel() {
    const [settings, setSettings] = useState({
        appName: 'Life51',
        primaryColor: '#06b6d4', // cyan-500
        secondaryColor: '#f59e0b', // amber-500
        logo: null,
        favicon: null
    });

    const handleSave = () => {
        localStorage.setItem('life51_white_label', JSON.stringify(settings));
        alert('Branding saved! ✓');
        window.location.reload();
    };

    const handleImageUpload = (field, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSettings({...settings, [field]: reader.result});
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-black border-2 border-pink-500 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-pink-400" />
                <h2 className="text-pink-400 font-black text-lg font-mono">WHITE LABEL</h2>
            </div>

            <div className="space-y-4">
                {/* APP NAME */}
                <div>
                    <label className="text-white text-sm font-mono font-bold block mb-2">App Name</label>
                    <Input
                        value={settings.appName}
                        onChange={(e) => setSettings({...settings, appName: e.target.value})}
                        placeholder="Life51"
                        className="bg-black border-2 border-pink-500 text-white font-mono"
                    />
                    <p className="text-gray-600 text-xs font-mono mt-1">Shows in header + login</p>
                </div>

                {/* PRIMARY COLOR */}
                <div>
                    <label className="text-white text-sm font-mono font-bold block mb-2">Primary Color</label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={settings.primaryColor}
                            onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                            className="w-12 h-12 rounded border-2 border-pink-500 cursor-pointer"
                        />
                        <Input
                            value={settings.primaryColor}
                            onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                            className="flex-1 bg-black border-2 border-pink-500 text-white font-mono"
                        />
                    </div>
                </div>

                {/* SECONDARY COLOR */}
                <div>
                    <label className="text-white text-sm font-mono font-bold block mb-2">Secondary Color</label>
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={settings.secondaryColor}
                            onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                            className="w-12 h-12 rounded border-2 border-pink-500 cursor-pointer"
                        />
                        <Input
                            value={settings.secondaryColor}
                            onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                            className="flex-1 bg-black border-2 border-pink-500 text-white font-mono"
                        />
                    </div>
                </div>

                {/* LOGO */}
                <div>
                    <label className="text-white text-sm font-mono font-bold block mb-2">Logo</label>
                    <label className="block bg-black border-2 border-pink-500 hover:border-pink-400 rounded p-4 text-center cursor-pointer transition-all">
                        <Upload className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                        <p className="text-pink-400 text-xs font-mono">{settings.logo ? 'Change logo' : 'Upload logo'}</p>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload('logo', e)} className="hidden" />
                    </label>
                    {settings.logo && (
                        <div className="mt-2 p-2 bg-black border border-pink-500/30 rounded">
                            <img src={settings.logo} alt="Logo preview" className="h-12 mx-auto" />
                        </div>
                    )}
                </div>

                {/* PREVIEW */}
                <div className="bg-black border-2 border-pink-500/30 rounded p-4">
                    <p className="text-pink-400 font-mono text-xs mb-3">PREVIEW:</p>
                    <div style={{ backgroundColor: settings.primaryColor }} className="rounded p-4 text-center">
                        <p className="font-black text-2xl font-mono" style={{ color: '#ffffff' }}>{settings.appName || 'Life51'}</p>
                    </div>
                </div>

                <Button
                    onClick={handleSave}
                    className="w-full bg-pink-500 hover:bg-pink-400 text-black font-black font-mono py-3"
                >
                    <Check className="w-5 h-5 mr-2" />
                    SAVE BRANDING
                </Button>
            </div>
        </div>
    );
}