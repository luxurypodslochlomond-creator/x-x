import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Upload, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLogoUpload() {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadLogos();
  }, []);

  const loadLogos = async () => {
    try {
      setLoading(true);
      const data = await base44.entities.Artifact.filter({ type: 'logo' }, '-created_date', 100);
      setLogos(data);
    } catch (error) {
      console.error('Error loading logos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    try {
      for (const file of files) {
        const result = await base44.integrations.Core.UploadFile({ file });
        await base44.entities.Artifact.create({
          type: 'logo',
          name: file.name,
          file_url: result.file_url,
          description: `UF51 branding asset - ${new Date().toLocaleDateString()}`
        });
      }
      loadLogos();
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const deleteLogo = async (id) => {
    if (!confirm('Delete this logo?')) return;
    try {
      await base44.entities.Artifact.delete(id);
      loadLogos();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const generatedLogos = [
    // Original 4
    { name: 'Cyan Heart (8-bit)', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/d9cacdb51_generated_image.png', category: 'Pixel Art' },
    { name: 'Green Monogram (8-bit)', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/7f0f303ba_generated_image.png', category: 'Pixel Art' },
    { name: 'Cyan/Magenta Nodes (8-bit)', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/e59173d36_generated_image.png', category: 'Pixel Art' },
    { name: 'Clean Sans-Serif (Modern)', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/3a1274156_generated_image.png', category: 'Modern' },
    // Custom Deep Designs
    { name: 'Connected Nodes Heart', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/b0ab87271_generated_image.png', category: 'Connection' },
    { name: 'Earth + Healing Frequency', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/f9502309f_generated_image.png', category: 'Environmental' },
    { name: 'Heart & Wave (51 Symbol)', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/2fe5e77e7_generated_image.png', category: 'Symbolic' },
    { name: 'Healing Mandala', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/98d774a24_generated_image.png', category: 'Spiritual' },
    { name: 'Wave Monogram (U)', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/e9dab8ab0_generated_image.png', category: 'Modern' },
    { name: 'Human Frequency (Raised Arms)', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/26b1c037a_generated_image.png', category: 'Empowerment' },
    { name: 'Frequency Hexagon', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/544af680f_generated_image.png', category: 'Tech' },
    { name: 'Hands + Earth + Waves', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/158f40475_generated_image.png', category: 'Care & Impact' },
  ];

  const downloadGeneratedLogo = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-2">Logo Upload</h1>
        <p className="text-cyan-300 mb-8">Manage UF51 branding assets</p>

        {/* Generated Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
            <span className="text-cyan-400">✨</span> Custom Logo Designs
          </h2>
          <p className="text-gray-400 mb-6">12 unique directions for your brand. Pick what resonates, mix & match, or inspire the next round.</p>
          
          <div className="space-y-8">
            {['Pixel Art', 'Modern', 'Connection', 'Environmental', 'Symbolic', 'Spiritual', 'Empowerment', 'Tech', 'Care & Impact'].map((category) => {
              const categoryLogos = generatedLogos.filter(l => l.category === category);
              if (categoryLogos.length === 0) return null;
              
              return (
                <div key={category}>
                  <h3 className="text-lg font-bold text-cyan-300 mb-3 border-b border-cyan-500/20 pb-2">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categoryLogos.map((logo) => (
                      <div key={logo.name} className="bg-black/40 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/40 transition-all group">
                        <div className="w-full h-40 object-contain mb-4 bg-black/20 rounded flex items-center justify-center overflow-hidden">
                          <img src={logo.url} alt={logo.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                        </div>
                        <p className="font-bold text-sm mb-3 text-white">{logo.name}</p>
                        <button
                          onClick={() => downloadGeneratedLogo(logo.url, `UF51-${logo.name}.png`)}
                          className="w-full flex items-center justify-center gap-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 px-3 py-2 rounded text-sm font-bold transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-black/40 border-2 border-cyan-500/30 rounded-xl p-8 mb-8">
          <label className="flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-cyan-500/60 transition-all py-8 px-6">
            <Upload className="w-8 h-8 text-cyan-400" />
            <div className="text-center">
              <p className="font-bold text-white mb-1">Click to upload logos</p>
              <p className="text-sm text-gray-400">PNG, SVG, JPG • Max 10MB each</p>
            </div>
            <input
              type="file"
              multiple
              accept="image/png,image/svg+xml,image/jpeg"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          {uploading && <p className="text-center text-cyan-300 mt-4">Uploading...</p>}
        </div>

        {/* Logo Grid */}
        <div>
          <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
            <span className="text-cyan-400">📦</span> Uploaded Logos ({logos.length})
          </h2>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : logos.length === 0 ? (
            <p className="text-gray-400">No logos uploaded yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {logos.map((logo) => (
                <div
                  key={logo.id}
                  className="bg-black/40 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/40 transition-all"
                >
                  <img
                    src={logo.file_url}
                    alt={logo.name}
                    className="w-full h-40 object-contain mb-4 bg-black/20 rounded"
                  />
                  <p className="font-bold text-sm mb-2 truncate">{logo.name}</p>
                  <p className="text-xs text-gray-400 mb-4">
                    {new Date(logo.created_date).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={logo.file_url}
                      download
                      className="flex-1 flex items-center justify-center gap-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 px-3 py-2 rounded text-sm font-bold transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                    <button
                      onClick={() => deleteLogo(logo.id)}
                      className="flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-3 py-2 rounded text-sm font-bold transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}