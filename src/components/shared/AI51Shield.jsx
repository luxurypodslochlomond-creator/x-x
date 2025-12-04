import React from 'react';
import { Shield, BrainCircuit, Zap, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AI51Shield({ variant = 'full' }) {
    if (variant === 'badge') {
        return (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full">
                <Shield className="w-4 h-4 text-cyan-600" />
                <span className="text-sm font-bold text-cyan-900">Protected by AI51</span>
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-300/50 rounded-xl">
                <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-6 h-6 text-cyan-600" />
                        <h4 className="text-lg font-bold text-cyan-900">AI51 Fraud Protection</h4>
                    </div>
                    <p className="text-gray-700 text-sm">
                        Verified in &lt;1 second. Spots fakes instantly. Can't be fooled, bribed, or gamed.
                    </p>
                </CardContent>
            </Card>
        );
    }

    // Full variant
    return (
        <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-300/50 rounded-2xl">
            <CardContent className="p-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <BrainCircuit className="w-8 h-8 text-cyan-600" />
                    <h4 className="text-xl font-bold text-cyan-900">Protected by AI51</h4>
                    <Shield className="w-8 h-8 text-cyan-600" />
                </div>
                <p className="text-gray-700 leading-relaxed text-center mb-4">
                    Every submission verified in <span className="font-bold text-cyan-700">&lt;1 second</span> using quantum fraud detection:
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white/70 p-3 rounded-lg text-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <p className="text-gray-700 font-medium">1B+ Image Database</p>
                        <p className="text-gray-500">Spots AI-generated fakes</p>
                    </div>
                    <div className="bg-white/70 p-3 rounded-lg text-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <p className="text-gray-700 font-medium">GPS Verification</p>
                        <p className="text-gray-500">Location fraud detection</p>
                    </div>
                    <div className="bg-white/70 p-3 rounded-lg text-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <p className="text-gray-700 font-medium">Pattern Analysis</p>
                        <p className="text-gray-500">Behavioral anomalies</p>
                    </div>
                    <div className="bg-white/70 p-3 rounded-lg text-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <p className="text-gray-700 font-medium">Trust Algorithm</p>
                        <p className="text-gray-500">Instant payout rate</p>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-white/70 rounded-lg text-center">
                    <Zap className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-700">
                        <span className="font-bold">Can't be bribed.</span> <span className="font-bold">Can't be fooled.</span> <span className="font-bold">Never sleeps.</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}