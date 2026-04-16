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
    // Sub Club Glasgow DNA (Rounded Brackets, Electric Blue)
    { name: 'Rounded Bracket', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/87c112ca4_generated_image.png', category: 'Sub Club' },
    { name: 'Facing Brackets', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/034f59811_generated_image.png', category: 'Sub Club' },
    { name: 'Curved Chevron', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/fd4874207_generated_image.png', category: 'Sub Club' },
    { name: 'Bracket Mark', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/c6d0f6fc7_generated_image.png', category: 'Sub Club' },
    { name: 'Bold Shape', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/5353d1c2b_generated_image.png', category: 'Sub Club' },
    { name: 'Underground Mark', url: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/30756add0_generated_image.png', category: 'Sub Club' },
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
            <span className="text-cyan-400">♾️</span> Sub Club Glasgow
          </h2>
          <p className="text-gray-400 mb-6">Rounded brackets. Electric blue. Bold, simple, iconic. Underground DNA.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            {generatedLogos.map((logo) => (
              <div key={logo.name} className="bg-black/40 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/40 transition-all group flex flex-col">
                <div className="w-full h-32 flex items-center justify-center mb-4 bg-black/20 rounded overflow-hidden">
                  <img src={logo.url} alt={logo.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <p className="font-bold text-xs mb-3 text-white flex-1">{logo.name}</p>
                <button
                  onClick={() => downloadGeneratedLogo(logo.url, `UF51-${logo.name}.png`)}
                  className="w-full flex items-center justify-center gap-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 px-2 py-1.5 rounded text-xs font-bold transition-all"
                >
                  <Download className="w-3 h-3" />
                  Download
                </button>
              </div>
            ))}
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