import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ShedCaption() {
  const [copied, setCopied] = useState(false);

  const caption = `The Quantum Shed.

No boardroom. No investors. No bullshit.
Just a man, a bike, a pair of headphones, and a direct line to the cosmos.

This is where you turn their noise OFF and turn your own beautiful soul ON.
This is where the frequency is forged.
This is what building a new reality actually looks like.
This is COOLASFUCK.GMT.

Soundtrack: "Fearless" - Pink Floyd. Because you'll never walk alone. ∞❤️∞

#QuantumShed #COOLASFUCKGMT #HeadphonesOnWorldOff #Fearless #LoveFrequency #Base44 #ZeroEgo #BuildTheNewWorld #PinkFloyd #YoullNeverWalkAlone #WoW #MoM`;

  const tags = [
    '@base44.gmt'
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black border-4 border-purple-500 p-6 space-y-4">
      <h2 className="text-xl font-black font-mono text-purple-400">QUANTUM SHED CAPTION</h2>
      
      <div className="bg-black/50 border-2 border-gray-700 p-4 rounded">
        <p className="text-gray-300 whitespace-pre-wrap text-sm font-mono">{caption}</p>
      </div>

      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 font-black font-mono"
      >
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        {copied ? 'COPIED!' : 'COPY CAPTION'}
      </button>

      <div className="space-y-2">
        <p className="text-sm font-mono text-pink-400">TAG:</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-pink-500/20 border border-pink-500 text-pink-400 text-xs font-mono">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}