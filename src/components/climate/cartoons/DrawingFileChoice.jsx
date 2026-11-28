import React, { useRef, useState } from 'react';
import '@/components/climate/cartoons/drawing-file-choice.css';

export default function DrawingFileChoice({ onFile }) {
  const fileInput = useRef(null);
  const cameraInput = useRef(null);
  const [over, setOver] = useState(false);
  const choose = event => { const file = event.target.files?.[0]; event.target.value = ''; if (file) onFile(file); };
  return <div className="drawing-file-choice" data-over={over}
    onDragOver={event => { event.preventDefault(); setOver(true); }}
    onDragLeave={() => setOver(false)}
    onDrop={event => { event.preventDefault(); setOver(false); const file = event.dataTransfer.files?.[0]; if (file) onFile(file); }}>
    <p>Drop a drawing file here.</p>
    <div><button type="button" onClick={() => fileInput.current.click()}>Choose a file</button><span>or</span><button type="button" onClick={() => cameraInput.current.click()}>Take a photo</button></div>
    <small>JPG, PNG, WebP or GIF · up to 20 MB</small>
    <input ref={fileInput} type="file" accept=".jpg,.jpeg,.png,.webp,.gif" className="sr-only" aria-label="Choose a drawing file" onChange={choose} />
    <input ref={cameraInput} type="file" accept="image/*" capture="environment" className="sr-only" aria-label="Photograph a drawing" onChange={choose} />
  </div>;
}