import React from 'react';
import { Copy } from 'lucide-react';

/**
 * SUBDOMAIN SETUP GUIDE
 * How to configure DNS for subdomains
 */

export default function SubdomainSetup() {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
            <div className="max-w-3xl mx-auto space-y-8">
                
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black mb-2">Subdomain Setup</h1>
                    <p className="text-gray-400">One domain, four products ♾️❤️♾️</p>
                </div>

                {/* THE PLAN */}
                <div className="bg-black border-2 border-cyan-500 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-cyan-400 mb-4">The Structure:</h2>
                    <div className="space-y-2 font-mono text-sm">
                        <div className="flex items-center justify-between bg-red-900/20 border border-red-500 p-3 rounded">
                            <span className="text-red-400 font-bold">uf51.love</span>
                            <span className="text-gray-400">→ Disaster AI (main)</span>
                        </div>
                        <div className="flex items-center justify-between bg-purple-900/20 border border-purple-500 p-3 rounded">
                            <span className="text-purple-400 font-bold">radio51.uf51.love</span>
                            <span className="text-gray-400">→ Music platform</span>
                        </div>
                        <div className="flex items-center justify-between bg-cyan-900/20 border border-cyan-500 p-3 rounded">
                            <span className="text-cyan-400 font-bold">prof51.uf51.love</span>
                            <span className="text-gray-400">→ Student tools</span>
                        </div>
                        <div className="flex items-center justify-between bg-amber-900/20 border border-amber-500 p-3 rounded">
                            <span className="text-amber-400 font-bold">cb51.uf51.love</span>
                            <span className="text-gray-400">→ Music manager</span>
                        </div>
                    </div>
                </div>

                {/* DNS SETUP INSTRUCTIONS */}
                <div className="bg-black border-2 border-green-500 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-green-400 mb-4">How to Set Up (DNS):</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-400 text-sm mb-2">1. Go to your domain registrar (where you bought uf51.love)</p>
                            <p className="text-gray-600 text-xs">→ Namecheap, GoDaddy, Cloudflare, etc.</p>
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm mb-2">2. Find "DNS Settings" or "DNS Management"</p>
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm mb-3">3. Add these CNAME records:</p>
                            
                            <div className="space-y-2 bg-gray-900 p-4 rounded">
                                <div className="flex items-center justify-between">
                                    <div className="font-mono text-xs">
                                        <span className="text-purple-400">radio51</span>
                                        <span className="text-gray-500 mx-2">CNAME</span>
                                        <span className="text-white">app.base44.com</span>
                                    </div>
                                    <button 
                                        onClick={() => copyToClipboard('radio51 CNAME app.base44.com')}
                                        className="p-1 hover:bg-gray-800 rounded"
                                    >
                                        <Copy className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="font-mono text-xs">
                                        <span className="text-cyan-400">prof51</span>
                                        <span className="text-gray-500 mx-2">CNAME</span>
                                        <span className="text-white">app.base44.com</span>
                                    </div>
                                    <button 
                                        onClick={() => copyToClipboard('prof51 CNAME app.base44.com')}
                                        className="p-1 hover:bg-gray-800 rounded"
                                    >
                                        <Copy className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="font-mono text-xs">
                                        <span className="text-amber-400">cb51</span>
                                        <span className="text-gray-500 mx-2">CNAME</span>
                                        <span className="text-white">app.base44.com</span>
                                    </div>
                                    <button 
                                        onClick={() => copyToClipboard('cb51 CNAME app.base44.com')}
                                        className="p-1 hover:bg-gray-800 rounded"
                                    >
                                        <Copy className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm">4. Wait 5-30 minutes for DNS to update</p>
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm">5. Done! Each subdomain routes to the right product ✓</p>
                        </div>
                    </div>
                </div>

                {/* BENEFITS */}
                <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 border-2 border-pink-500 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-pink-400 mb-4">Why This Works:</h2>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li>✓ No need to buy radio51.love, prof51.love, cb51.love</li>
                        <li>✓ Clean separation - each product has its own URL</li>
                        <li>✓ Easy to share - "go to radio51.uf51.love"</li>
                        <li>✓ Professional look</li>
                        <li>✓ Works with P2P sharing</li>
                    </ul>
                </div>

                {/* SHARING */}
                <div className="bg-black border-2 border-amber-500 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-amber-400 mb-4">How People Find Each Product:</h2>
                    <div className="space-y-3 text-sm">
                        <div>
                            <p className="text-red-400 font-bold">Crisis zones share:</p>
                            <p className="text-gray-400 font-mono">uf51.love</p>
                            <p className="text-gray-600 text-xs">→ "AI that works offline when everything fails"</p>
                        </div>
                        <div>
                            <p className="text-purple-400 font-bold">Music lovers share:</p>
                            <p className="text-gray-400 font-mono">radio51.uf51.love</p>
                            <p className="text-gray-600 text-xs">→ "Lossless music, artists keep 90%"</p>
                        </div>
                        <div>
                            <p className="text-cyan-400 font-bold">Students share:</p>
                            <p className="text-gray-400 font-mono">prof51.uf51.love</p>
                            <p className="text-gray-600 text-xs">→ "AI tutor, budget tracker, lost & found"</p>
                        </div>
                        <div>
                            <p className="text-amber-400 font-bold">Music managers share:</p>
                            <p className="text-gray-400 font-mono">cb51.uf51.love</p>
                            <p className="text-gray-600 text-xs">→ "Zero-stress artist management"</p>
                        </div>
                    </div>
                </div>

                <div className="text-center text-gray-600 text-xs pt-8">
                    <p>One family, clear doors ♾️❤️♾️</p>
                </div>

            </div>
        </div>
    );
}