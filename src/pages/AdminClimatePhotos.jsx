import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Trash2 } from 'lucide-react';
import ClimatePhotoForm from '@/components/climate/ClimatePhotoForm';

export default function AdminClimatePhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const page = await base44.entities.ClimatePhoto.list({ sort: 'created_date', limit: 60 });
    setPhotos(page.items ?? page);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (photo) => {
    if (!window.confirm('Take this picture off the crawl?')) return;
    await base44.entities.ClimatePhoto.delete(photo.id);
    load();
  };

  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#141210] p-5" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <div className="max-w-[600px] mx-auto">
        <div className="flex items-start justify-between gap-3 mb-6">
          <div>
            <h1 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: '26px', letterSpacing: '-0.02em' }}>
              Top crawl
            </h1>
            <p className="text-[10px] font-mono text-[#5a5246] mt-1">
              The pictures that drift across the top of the record. Each one is shrunk for the web as it is added, so it opens fast on a phone. The credit stays with the picture.
            </p>
          </div>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-3 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors flex-shrink-0">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-2 border-[#141210]/20 border-t-[#e2602a] animate-spin" />
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[12px] font-mono text-[#5a5246] mb-4">No pictures yet. The top crawl stays empty until the first one is added.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {photos.map((photo) => (
              <div key={photo.id} className="flex items-center gap-3 p-2 bg-[#f7f1e5] border border-[#141210]/15">
                <img src={photo.image_url} alt="" className="w-20 h-14 object-cover border border-[#141210]/20 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-black font-mono text-[#141210] truncate">{photo.caption || 'Untitled picture'}</p>
                  <p className="text-[10px] font-mono text-[#e2602a] truncate">{photo.credit}</p>
                </div>
                <button onClick={() => handleDelete(photo)} className="w-10 h-10 flex items-center justify-center border border-[#b3261e]/30 text-[#b3261e] active:bg-[#b3261e] active:text-[#efe7d6] transition-colors flex-shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <ClimatePhotoForm
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); load(); }}
        />
      )}
    </div>
  );
}