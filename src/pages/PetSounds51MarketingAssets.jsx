import React from 'react';
import { Download, Instagram } from 'lucide-react';

export default function PetSounds51MarketingAssets() {
  const assets = [
    {
      name: 'Instagram Post',
      size: '1080x1350px',
      description: 'Feed post with Bunny & caption',
      url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/5a4cd6484_generated_image.png',
      format: 'JPG'
    },
    {
      name: 'Instagram Stories',
      size: '1080x1920px',
      description: 'Full vertical stories format',
      url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/30e898463_generated_image.png',
      format: 'JPG'
    },
    {
      name: 'Mobile Web Hero',
      size: '600x400px',
      description: 'Landing page banner',
      url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/a79e5b13d_generated_image.png',
      format: 'JPG'
    },
    {
      name: 'Instagram Post (Icon)',
      size: '1080x1350px',
      description: 'Icon-focused with gradient',
      url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/98e62bc73_generated_image.png',
      format: 'JPG'
    },
    {
      name: 'Instagram Stories (Icon)',
      size: '1080x1920px',
      description: 'Vertical icon format',
      url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/792f2924e_generated_image.png',
      format: 'JPG'
    },
    {
      name: 'Mobile Web Hero (Icon)',
      size: '600x400px',
      description: 'Icon & text minimal design',
      url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/4a1abd30b_generated_image.png',
      format: 'JPG'
    }
  ];

  const downloadImage = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `PetSounds51-${name.replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white mb-3">PetSounds51 Marketing Assets</h1>
          <p className="text-amber-300 text-lg">Download ready-to-post Bunny content featuring your custom icon 🐾</p>
        </div>

        <div className="grid gap-6 mb-12">
          {assets.map((asset) => (
            <div key={asset.name} className="border-2 border-amber-600/40 rounded-xl p-6 bg-black/40 hover:border-amber-600/80 transition-all">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Preview */}
                <div className="md:w-48 flex-shrink-0">
                  <img 
                    src={asset.url} 
                    alt={asset.name}
                    className="w-full rounded-lg object-cover border border-amber-600/20"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{asset.name}</h2>
                    <p className="text-amber-300 mb-2 font-mono text-sm">{asset.size} • {asset.format}</p>
                    <p className="text-gray-300">{asset.description}</p>
                  </div>

                  <button
                    onClick={() => downloadImage(asset.url, asset.name)}
                    className="self-start mt-4 flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-black font-bold rounded-lg transition-all transform hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Copy URLs */}
        <div className="bg-black/60 border border-amber-600/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Instagram className="w-5 h-5 text-amber-400" />
            Direct URLs (for sharing)
          </h3>
          <div className="space-y-3">
            {assets.map((asset) => (
              <div key={asset.name} className="flex items-center gap-2">
                <code className="flex-1 bg-black/40 p-3 rounded text-amber-300 text-xs break-all border border-amber-600/20">{asset.url}</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(asset.url);
                    alert('✅ URL copied!');
                  }}
                  className="px-4 py-3 bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 font-bold rounded transition-all"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}