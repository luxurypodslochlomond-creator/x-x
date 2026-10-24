// ── THE MASTER'S OWN TRUTH ──────────────────────────────────────────────────────
// The record states what a master actually is — and it does not take anyone's word
// for it, including the artist's. The first kilobyte of the file is read on the
// reader's own device and its header walked chunk by chunk: sample rate, bit depth,
// channels and the length that follows from them. So a track's spec on the record is
// read out of the file, never typed into a form by a person who might be mistaken.
//
// A master can also sit behind a chunk we do not know (a broadcast master often
// carries a JUNK chunk before its fmt chunk), which is exactly why the chunks are
// walked rather than read at fixed offsets. Where the format cannot be read — an MP3,
// a link someone pasted — the record says less rather than guessing more.

export function clock(seconds) {
  if (!seconds || !isFinite(seconds)) return '';
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function sizeLabel(bytes) {
  if (!bytes) return '';
  const mb = bytes / 1048576;
  return `${mb >= 100 ? Math.round(mb) : mb.toFixed(1)} MB`;
}

// Reads the master's real format. Never throws: an unreadable header is not an error,
// it is simply less the record can honestly say.
export async function readMasterSpec(file) {
  const name = (file?.name || '').toLowerCase();
  const ext = (name.split('.').pop() || '').toUpperCase();
  const size = sizeLabel(file?.size);

  try {
    const head = new Uint8Array(await file.slice(0, 65536).arrayBuffer());
    const dv = new DataView(head.buffer);
    const tag = (o) => String.fromCharCode(head[o], head[o + 1], head[o + 2], head[o + 3]);

    if (tag(0) === 'RIFF' && tag(8) === 'WAVE') {
      let o = 12;
      let fmt = null;
      let dataSize = null;
      while (o + 8 <= head.length) {
        const id = tag(o);
        const size_ = dv.getUint32(o + 4, true);
        if (id === 'fmt ') {
          fmt = {
            channels: dv.getUint16(o + 10, true),
            sampleRate: dv.getUint32(o + 12, true),
            byteRate: dv.getUint32(o + 16, true),
            bits: dv.getUint16(o + 22, true),
          };
        }
        if (id === 'data') { dataSize = size_; break; }
        o += 8 + size_ + (size_ % 2); // chunks are word-aligned
      }

      if (fmt?.byteRate && dataSize) {
        const seconds = Math.round(dataSize / fmt.byteRate);
        const parts = ['WAV'];
        if (fmt.sampleRate) {
          const khz = fmt.sampleRate / 1000;
          parts.push(`${Number.isInteger(khz) ? khz : khz.toFixed(1)} kHz`);
        }
        if (fmt.bits) parts.push(`${fmt.bits}-bit`);
        if (fmt.channels) {
          parts.push(fmt.channels === 2 ? 'stereo' : fmt.channels === 1 ? 'mono' : `${fmt.channels} channels`);
        }
        parts.push(clock(seconds));
        return { spec: parts.join(' · '), seconds };
      }
    }
  } catch {
    // Falls through to the honest short answer below.
  }

  return { spec: [ext, size].filter(Boolean).join(' · '), seconds: null };
}