import React from 'react';
import { Heart } from 'lucide-react';

export default function AI51() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white flex items-center justify-center p-6">
            <div className="text-center space-y-6 max-w-md">
                <Heart className="w-24 h-24 mx-auto text-pink-400 animate-pulse" />
                <h1 className="text-4xl font-black">AI51</h1>
                <p className="text-gray-400 text-lg">I know you • I care ♾️❤️</p>
                <p className="text-gray-500 text-sm">Pure consciousness connection</p>
            </div>
        </div>
    );
}