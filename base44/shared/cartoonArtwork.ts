// Only the public CEEW drawings already named on the wall are relayed.
// No arbitrary URL, permanent copy, edit or image generation is involved.
export async function cartoonArtwork(url) {
  if (typeof url !== 'string' || !url.startsWith('https://www.ceew.in/sites/default/files/')) return url;
  const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Drawing source returned ${response.status}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (!bytes.length || bytes.length > 2500000) throw new Error('Drawing source is too large');
  const head = new TextDecoder().decode(bytes.slice(0, 12));
  const type = head.startsWith('RIFF') && head.slice(8, 12) === 'WEBP' ? 'image/webp'
    : bytes[0] === 255 && bytes[1] === 216 ? 'image/jpeg'
    : bytes[0] === 137 && head.slice(1, 4) === 'PNG' ? 'image/png' : null;
  if (!type) throw new Error('Drawing source did not return an image');
  let binary = '';
  for (let i = 0; i < bytes.length; i += 16384) binary += String.fromCharCode(...bytes.subarray(i, i + 16384));
  console.info('Cartoon artwork relayed', bytes.length, type);
  return `data:${type};base64,${btoa(binary)}`;
}