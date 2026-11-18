// Relay the original bytes, without storing or changing the drawing. Some CEEW
// image responses omit Content-Type and send nosniff; browsers refuse those embeds.
export default async function cartoonArtwork(imageUrl) {
  const url = new URL(imageUrl);
  if (url.protocol !== 'https:' || url.hostname !== 'www.ceew.in' || url.port ||
      url.username || url.password || !url.pathname.startsWith('/sites/default/files/')) return imageUrl;
  const response = await fetch(url.href, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
  if (!response.ok || response.status >= 300) throw new Error(`Drawing source returned ${response.status}`);
  const reader = response.body.getReader();
  const parts = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 4 * 1024 * 1024) { await reader.cancel(); throw new Error('Drawing exceeds the display limit'); }
    parts.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const part of parts) { bytes.set(part, offset); offset += part.length; }
  const word = (start, length) => String.fromCharCode(...bytes.subarray(start, start + length));
  const mime = word(0, 4) === 'RIFF' && word(8, 4) === 'WEBP' ? 'image/webp'
    : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 ? 'image/jpeg'
    : word(1, 3) === 'PNG' && bytes[0] === 137 ? 'image/png' : '';
  if (!mime) throw new Error('The source did not return a supported drawing');
  const chunks = [];
  for (let i = 0; i < bytes.length; i += 16384) chunks.push(String.fromCharCode(...bytes.subarray(i, i + 16384)));
  return `data:${mime};base64,${btoa(chunks.join(''))}`;
}