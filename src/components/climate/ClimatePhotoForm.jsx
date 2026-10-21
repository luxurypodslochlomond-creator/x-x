import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Check, X, ImagePlus } from 'lucide-react';

// A photograph straight from a camera is often 10–20 MB. On a phone that is the
// difference between a picture appearing and a blank space, so it is shrunk here,
// in the browser, before it is ever stored.
const MAX_WIDTH = 1800; // wide enough to look sharp on a phone at 3× and on a desktop
const QUALITY = 0.82; // the point where a photograph still looks like itself

async function shrinkForWeb(file) {
  const bitmap = await window.createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', QUALITY));
  bitmap.close?.();
  return new File([blob], `${(file.name || 'photo').replace(/\.[^.]+$/, '')}.jpg`, { type: 'image/jpeg' });
}

const size = (bytes) => (bytes > 1024 * 1024 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`);

export default function ClimatePhotoForm({ onSaved, onClose }) {
  const [webFile, setWebFile] = useState(null);
  const [original, setOriginal] = useState(null);
  const [preview, setPreview] = useState('');
  const [caption, setCaption] = useState('');
  const [credit, setCredit] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handlePick = async (event) => {
    const picked = event.target.files?.[0];
    if (!picked) return;
    setError('');
    setOriginal(picked);
    try {
      const small = await shrinkForWeb(picked);
      setWebFile(small);
      setPreview(URL.createObjectURL(small));
    } catch {
      setWebFile(picked);
      setPreview(URL.createObjectURL(picked));
      setError('This device could not shrink that picture, so it would be stored at full size. Choose a smaller copy if you can.');
    }
  };

  const handleSave = async () => {
    if (!webFile) { setError('Choose a picture first.'); return; }
    if (!credit.trim()) { setError('A picture needs its credit — who made it.'); return; }
    setBusy(true);
    setError('');
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file: webFile });
      await base44.entities.ClimatePhoto.create({
        image_url: file_url,
        caption: caption.trim(),
        credit: credit.trim(),
        status: 'published',
      });
      onSaved();
    } catch (err) {
      setError(err?.message || 'The picture could not be saved.');
      setBusy(false);
    }
  };

  const field = 'w-full bg-[#f7f1e5] border border-[#141210] px-3 py-2.5 min-h-[44px] text-[12px] font-mono text-[#141210] placeholder-[#5a5246] outline-none focus:border-[#e2602a]';
  const label = 'text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] block mb-1';

  return (
    <div className="fixed inset-0 z-[100] bg-[#efe7d6] overflow-y-auto">
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#141210] border-b-2 border-[#e2602a]">
        <h2 className="font-black uppercase text-[#efe7d6]" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '-0.02em' }}>
          New picture
        </h2>
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-[#efe7d6] border-2 border-[#efe7d6] text-[#141210] active:bg-[#e2602a] transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 max-w-[500px] mx-auto space-y-4">
        <div>
          <label className={label}>The picture</label>
          <label className="flex items-center justify-center gap-2 w-full px-4 py-4 min-h-[52px] bg-[#141210] text-[#efe7d6] text-[12px] font-black font-mono uppercase border-2 border-[#141210] cursor-pointer active:bg-[#e2602a] active:text-[#141210] transition-colors">
            <ImagePlus className="w-4 h-4" />
            Choose a picture
            <input type="file" accept="image/*" onChange={handlePick} className="hidden" />
          </label>
        </div>

        {preview && (
          <div className="border border-[#141210]/20 bg-[#f7f1e5] p-2">
            <img src={preview} alt="" className="w-full h-auto" />
            {original && webFile && (
              <p className="text-[10px] font-mono text-[#5a5246] mt-2">
                {size(original.size)} → <span className="text-[#1e3a2b] font-black">{size(webFile.size)}</span> for the record
              </p>
            )}
          </div>
        )}

        <div>
          <label className={label}>What it shows</label>
          <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Mangroves above · coral below" className={field} />
        </div>

        <div>
          <label className={label}>Credit * — who made it</label>
          <input value={credit} onChange={(e) => setCredit(e.target.value)} placeholder="Ocean Image Bank · Photographer Alex Mustard" className={field} />
        </div>

        {error && <p className="text-[11px] font-mono text-[#b3261e]">{error}</p>}

        <button onClick={handleSave} disabled={busy} className="w-full flex items-center justify-center gap-2 px-4 py-4 min-h-[52px] bg-[#141210] text-[#efe7d6] text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors disabled:opacity-50">
          <Check className="w-4 h-4" />
          {busy ? 'Saving…' : 'Put it in the crawl'}
        </button>
      </div>
    </div>
  );
}