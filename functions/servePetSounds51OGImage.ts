import { createCanvas } from 'npm:canvas@2.11.2';

Deno.serve(async (req) => {
  try {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#1a200e');
    gradient.addColorStop(0.5, '#2a3018');
    gradient.addColorStop(1, '#1e1a0e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Title
    ctx.font = 'bold 90px Arial, sans-serif';
    ctx.fillStyle = '#d4a017';
    ctx.textAlign = 'center';
    ctx.fillText('PetSounds51', 600, 150);

    // Tagline
    ctx.font = '36px Arial, sans-serif';
    ctx.fillStyle = '#e8d5a3';
    ctx.fillText('Science-backed sound therapy for anxious pets', 600, 220);

    // Key messages
    ctx.font = '28px Arial, sans-serif';
    ctx.fillStyle = '#8aab3a';
    ctx.fillText('✓ Try FREE: Separation Anxiety', 600, 330);
    ctx.fillText('✓ Pain Relief • Stress Reduction • Healing', 600, 390);
    ctx.fillText('✓ £29.99/year for all protocols', 600, 450);

    // Bottom badge
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.fillStyle = '#6b5e3a';
    ctx.fillText('Research-backed by MIT, iCalmDog, Glasgow, Edinburgh', 600, 580);

    const png = canvas.toBuffer('image/png');
    return new Response(png, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (error) {
    console.error('OG image generation failed:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});