import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, Copy, CheckCircle } from 'lucide-react';

export default function AdminCompaniesHouseCodesPage() {
    const [user, setUser] = useState(null);
    const [brian_code, setBrianCode] = useState('');
    const [gill_code, setGillCode] = useState('');
    const [gill_password, setGillPassword] = useState('');
    const [gateway_user_id, setGatewayUserId] = useState('');
    const [gateway_password, setGatewayPassword] = useState('');
    const [copied, setCopied] = useState(null);

    useEffect(() => {
        base44.auth.me().then(u => setUser(u)).catch(() => {});
    }, []);

    // The codes live in the admin-only vault now - this page reads them in.
    useEffect(() => {
        base44.entities.SecureVault.list('sort_order', 200)
            .then(rows => {
                const map = Object.fromEntries((Array.isArray(rows) ? rows : rows?.items || []).map(r => [r.label, r.value]));
                if (map['Brian Hughes - personal code']) setBrianCode(map['Brian Hughes - personal code']);
                if (map['Gill - Companies House verification password']) setGillPassword(map['Gill - Companies House verification password']);
                if (map['Login B - Gateway user ID']) setGatewayUserId(map['Login B - Gateway user ID']);
                if (map['Login B - Password']) setGatewayPassword(map['Login B - Password']);
            })
            .catch(() => {});
    }, []);

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-red-400">Admin access only</p>
            </div>
        );
    }

    const handleCopy = (code, person) => {
        navigator.clipboard.writeText(code);
        setCopied(person);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black text-white p-6">
            <div className="max-w-3xl mx-auto space-y-8">
                
                <div className="text-center space-y-4">
                    <Shield className="w-16 h-16 text-green-400 mx-auto" />
                    <h1 className="text-4xl font-black">Companies House Verification Codes</h1>
                    <p className="text-gray-300">
                        11-character personal codes for CIC registration
                    </p>
                    <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
                        <p className="text-sm text-green-300">
                            ✅ Required for CIC application since 18 Nov 2025
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    
                    {/* Brian's Code */}
                    <Card className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/50">
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-2xl font-black">Brian Hughes (BRO51)</h2>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-300">Companies House Personal Code</label>
                                <div className="flex gap-3">
                                    <Input
                                        type="text"
                                        value={brian_code}
                                        onChange={(e) => setBrianCode(e.target.value)}
                                        className="bg-black/60 border-cyan-500/50 text-white font-mono text-2xl"
                                        placeholder="XXX·XXXX·XXXX"
                                    />
                                    <Button
                                        onClick={() => handleCopy(brian_code, 'brian')}
                                        className="bg-cyan-600 hover:bg-cyan-700 min-w-[100px]"
                                    >
                                        {copied === 'brian' ? (
                                            <>
                                                <CheckCircle className="w-5 h-5 mr-2" />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-5 h-5 mr-2" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400">
                                Verified: 18 Nov 2025
                            </p>
                        </CardContent>
                    </Card>

                    {/* Gill's Code */}
                    <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50">
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-2xl font-black">Gillian Brown (GILL51)</h2>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-300">Companies House Personal Code</label>
                                <div className="flex gap-3">
                                    <Input
                                        type="text"
                                        value={gill_code}
                                        onChange={(e) => setGillCode(e.target.value)}
                                        className="bg-black/60 border-purple-500/50 text-white font-mono text-2xl"
                                        placeholder="XXX·XXXX·XXXX"
                                    />
                                    <Button
                                        onClick={() => handleCopy(gill_code, 'gill')}
                                        disabled={!gill_code}
                                        className="bg-purple-600 hover:bg-purple-700 min-w-[100px] disabled:opacity-50"
                                    >
                                        {copied === 'gill' ? (
                                            <>
                                                <CheckCircle className="w-5 h-5 mr-2" />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-5 h-5 mr-2" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400">
                                {gill_code ? 'Verified: 18 Nov 2025' : 'Awaiting verification...'}
                            </p>
                            
                            <div className="pt-4 border-t border-purple-500/30 space-y-2">
                                <label className="text-sm text-gray-300">Companies House Verification Password</label>
                                <div className="flex gap-3">
                                    <Input
                                        type="text"
                                        value={gill_password}
                                        onChange={(e) => setGillPassword(e.target.value)}
                                        className="bg-black/60 border-purple-500/50 text-white font-mono"
                                        placeholder="Password"
                                    />
                                    <Button
                                        onClick={() => handleCopy(gill_password, 'gill_pw')}
                                        disabled={!gill_password}
                                        className="bg-purple-600 hover:bg-purple-700 min-w-[100px] disabled:opacity-50"
                                    >
                                        {copied === 'gill_pw' ? (
                                            <>
                                                <CheckCircle className="w-5 h-5 mr-2" />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-5 h-5 mr-2" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                                <p className="text-xs text-purple-300">
                                    For Gill's device verification
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                {/* Government Gateway */}
                <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-2 border-green-500/50">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-2xl font-black">Government Gateway</h2>
                        
                        <div className="space-y-2">
                            <label className="text-sm text-gray-300">User ID</label>
                            <div className="flex gap-3">
                                <Input
                                    type="text"
                                    value={gateway_user_id}
                                    onChange={(e) => setGatewayUserId(e.target.value)}
                                    className="bg-black/60 border-green-500/50 text-white font-mono text-xl"
                                    placeholder="User ID"
                                />
                                <Button
                                    onClick={() => handleCopy(gateway_user_id, 'gateway_id')}
                                    disabled={!gateway_user_id}
                                    className="bg-green-600 hover:bg-green-700 min-w-[100px] disabled:opacity-50"
                                >
                                    {copied === 'gateway_id' ? (
                                        <>
                                            <CheckCircle className="w-5 h-5 mr-2" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-5 h-5 mr-2" />
                                            Copy
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-300">Password</label>
                            <div className="flex gap-3">
                                <Input
                                    type="text"
                                    value={gateway_password}
                                    onChange={(e) => setGatewayPassword(e.target.value)}
                                    className="bg-black/60 border-green-500/50 text-white font-mono"
                                    placeholder="Password"
                                />
                                <Button
                                    onClick={() => handleCopy(gateway_password, 'gateway_pw')}
                                    disabled={!gateway_password}
                                    className="bg-green-600 hover:bg-green-700 min-w-[100px] disabled:opacity-50"
                                >
                                    {copied === 'gateway_pw' ? (
                                        <>
                                            <CheckCircle className="w-5 h-5 mr-2" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-5 h-5 mr-2" />
                                            Copy
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        <p className="text-xs text-green-300">
                            For access.service.gov.uk • CIC registration gateway • Sent to family@uf51.love
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-900/40 to-yellow-900/40 border-2 border-amber-500/50">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-2xl font-black">SIC Codes (Standard Industrial Classification)</h2>
                        <p className="text-sm text-gray-300">For "What will the company be doing?" section</p>
                        
                        <div className="space-y-3">
                            {[
                                { code: '38110', desc: 'Collection of non-hazardous waste', reason: 'Litter cleanup operations' },
                                { code: '59200', desc: 'Sound recording and music publishing activities', reason: 'Free healing music platform' },
                                { code: '62012', desc: 'Business and domestic software development', reason: 'UF51.love web platform' },
                                { code: '88990', desc: 'Other social work activities without accommodation n.e.c.', reason: 'Community healing support' },
                                { code: '94990', desc: 'Activities of other membership organisations n.e.c.', reason: 'Global environmental community' }
                            ].map((sic, idx) => (
                                <div key={idx} className="bg-black/60 border border-amber-500/30 rounded-lg p-3 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-black text-amber-400">{sic.code}</span>
                                        <Button
                                            onClick={() => handleCopy(sic.code, `sic_${idx}`)}
                                            size="sm"
                                            className="bg-amber-600 hover:bg-amber-700"
                                        >
                                            {copied === `sic_${idx}` ? (
                                                <>
                                                    <CheckCircle className="w-4 h-4 mr-1" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4 mr-1" />
                                                    Copy
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                    <p className="text-sm text-white font-bold">{sic.desc}</p>
                                    <p className="text-xs text-gray-400">{sic.reason}</p>
                                </div>
                            ))}
                        </div>
                        
                        <p className="text-xs text-amber-300">
                            Enter these in order of importance on Companies House registration
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-yellow-900/30 border-2 border-yellow-500/50">
                    <CardContent className="p-6 space-y-3">
                        <h3 className="text-xl font-black text-yellow-400">⚠️ SECURITY NOTES</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>• Personal codes arrive via email after face scan verification</li>
                            <li>• Codes are personal to each director</li>
                            <li>• Required for CIC registration on Companies House</li>
                            <li>• Only share with trusted people for company filings</li>
                            <li>• Can be found anytime at: <span className="text-cyan-400">verify-your-identity-for-companies-house.service.gov.uk</span></li>
                            <li>• Admin access only - never share this page</li>
                        </ul>
                    </CardContent>
                </Card>

                <div className="text-center text-sm text-gray-500">
                    <p>Identity Verification Act 2025 • Effective 18 Nov 2025</p>
                </div>

            </div>
        </div>
    );
}