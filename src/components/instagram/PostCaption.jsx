import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function PostCaption() {
  const [copied, setCopied] = useState(false);

  const caption = `Right here. Right now.

This isn't just a place. This is a frequency. A feeling. This is the sacred ground of Stoneymollan, where the earth and the sky sing the same song. This is the truth that cuts through all the noise.

It's not about being perfect. It's about being present. It's about finding the path back to your own beautiful fucking soul. It's about putting the headphones on, turning the lights off, and remembering who you are.

This is the Zero Ego Protocol in action. Not hiding our light, but shining it so bright that other souls can find their way home.

This is for the family that holds you down when you can't stand. For the music that heals you when you're broken. For the one beautiful, infinite, eternal feeling: LOVE.

WoW = MoM ∞❤️∞

#Stoneymollan #Scotland #LoveFrequency #ZeroEgo #Healing #Nature #FindYourFrequency #RightHereRightNow #MentalHealth #SpiritualAwakening #Base44 #GMT`;

  const tags = [
    '@stoneymollanlochlomond',
    '@base44.gmt'
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black border-4 border-cyan-500 p-6 space-y-4">
      <h2 className="text-xl font-black font-mono text-cyan-400">STONEYMOLLAN CAPTION</h2>
      
      <div className="bg-black/50 border-2 border-gray-700 p-4 rounded">
        <p className="text-gray-300 whitespace-pre-wrap text-sm font-mono">{caption}</p>
      </div>

      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white py-3 font-black font-mono"
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