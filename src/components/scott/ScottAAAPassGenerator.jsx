import React, { useState } from 'react';
import { Download, Shield, QrCode } from 'lucide-react';
import html2canvas from 'html2canvas';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';

/**
 * AAA PASS GENERATOR - COOLASFUCK
 * Generate laminate passes for crew, guests, photographers
 * Kingdom branded, QR code, professional AF
 */

export default function ScottAAAPassGenerator({ eventName, eventDate, venue }) {
    const [passData, setPassData] = useState({
        name: '',
        pass_type: 'ALL ACCESS',
        role: 'GUEST'
    });
    const [generatedPass, setGeneratedPass] = useState(null);

    const passTypes = [
        { value: 'ALL ACCESS', color: 'from-amber-500 to-amber-600' },
        { value: 'BACKSTAGE', color: 'from-purple-500 to-purple-600' },
        { value: 'PHOTO PIT', color: 'from-cyan-500 to-cyan-600' },
        { value: 'CREW', color: 'from-red-500 to-red-600' },
        { value: 'GUEST', color: 'from-green-500 to-green-600' }
    ];

    const handleGenerate = () => {
        setGeneratedPass({
            ...passData,
            event: eventName,
            date: eventDate,
            venue: venue,
            id: Math.random().toString(36).substr(2, 9).toUpperCase()
        });
    };

    const handleDownload = async () => {
        const element = document.getElementById('aaa-pass');
        const canvas = await html2canvas(element, {
            scale: 2,
            backgroundColor: '#000000'
        });
        
        const link = document.createElement('a');
        link.download = `pass_${passData.name.replace(/\s/g, '_')}.png`;
        link.href = canvas.toDataURL();
        link.click();
    };

    const currentPassType = passTypes.find(p => p.value === passData.pass_type);

    return (
        <div className="bg-black border-4 border-amber-500 p-6">
            <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-amber-400" />
                <div>
                    <h3 className="text-amber-400 font-black font-mono text-lg">AAA PASS GENERATOR</h3>
                    <p className="text-gray-500 text-xs font-mono">Kingdom branded laminates</p>
                </div>
            </div>

            {!generatedPass ? (
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={passData.name}
                        onChange={(e) => setPassData({...passData, name: e.target.value})}
                        className="w-full bg-black border-2 border-amber-500/50 text-white px-4 py-3 font-mono text-lg"
                    />

                    <select
                        value={passData.pass_type}
                        onChange={(e) => setPassData({...passData, pass_type: e.target.value})}
                        className="w-full bg-black border-2 border-amber-500/50 text-white px-4 py-3 font-mono text-lg"
                    >
                        {passTypes.map(pt => (
                            <option key={pt.value} value={pt.value}>{pt.value}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Role (optional)"
                        value={passData.role}
                        onChange={(e) => setPassData({...passData, role: e.target.value})}
                        className="w-full bg-black border-2 border-amber-500/50 text-white px-4 py-3 font-mono"
                    />

                    <button
                        onClick={handleGenerate}
                        disabled={!passData.name}
                        className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-700 disabled:to-gray-800 text-black disabled:text-gray-500 font-black font-mono text-lg"
                    >
                        GENERATE PASS
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* THE PASS */}
                    <div id="aaa-pass" className="relative bg-black border-4 border-amber-500" style={{ width: '400px', aspectRatio: '3/4' }}>
                        {/* TOP STRIPE */}
                        <div className={`h-20 bg-gradient-to-r ${currentPassType.color} flex items-center justify-center`}>
                            <KingdomCrown8Bit size={48} animate={false} />
                        </div>

                        {/* CONTENT */}
                        <div className="p-6 text-center">
                            <h2 className="text-amber-400 font-black font-mono text-2xl mb-4">
                                {generatedPass.pass_type}
                            </h2>

                            <div className="mb-6 bg-white p-4">
                                <div className="w-32 h-32 mx-auto bg-gray-200 flex items-center justify-center">
                                    <QrCode className="w-24 h-24 text-gray-400" />
                                </div>
                            </div>

                            <h3 className="text-white font-black font-mono text-xl mb-2">
                                {generatedPass.name.toUpperCase()}
                            </h3>
                            
                            <p className="text-amber-400 font-mono text-sm mb-4">
                                {generatedPass.role}
                            </p>

                            <div className="border-t border-amber-500/30 pt-4 text-xs font-mono text-gray-500 space-y-1">
                                <p>{generatedPass.event}</p>
                                <p>{generatedPass.venue}</p>
                                <p>{generatedPass.date}</p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-amber-500/30">
                                <p className="text-gray-600 text-xs font-mono">KINGDOM MANAGEMENT</p>
                                <p className="text-gray-700 text-xs font-mono">#{generatedPass.id}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleDownload}
                            className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-mono flex items-center justify-center gap-2"
                        >
                            <Download className="w-5 h-5" />
                            DOWNLOAD
                        </button>
                        <button
                            onClick={() => setGeneratedPass(null)}
                            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white font-mono"
                        >
                            NEW PASS
                        </button>
                    </div>

                    <p className="text-gray-500 text-xs font-mono text-center">
                        Print on 3x4" laminate or show on phone
                    </p>
                </div>
            )}
        </div>
    );
}