// Pass on the existing picture, unchanged. No canvas, crop, re-encoding or upload.
export default async function buildArtworkShare(entry) {
  const response = await fetch(entry.image_url);
  if (!response.ok) throw new Error('This picture could not be opened. Please try again.');
  const blob = await response.blob();
  if (!blob.type.startsWith('image/')) throw new Error('This address did not return a picture.');
  return blob;
}