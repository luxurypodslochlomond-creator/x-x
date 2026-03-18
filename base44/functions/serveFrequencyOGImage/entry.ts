import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Generates OG (Open Graph) images for frequency sharing
 * Discord/Twitter preview cards show this image + title + description
 * Returns SVG image on the fly
 */

const FREQUENCIES = {
  chest_heart: { name: "CHEST + HEART HEALING", hz: "528 Hz", color: "#ec4899", color2: "#10b981" },
  nerve_pain: { name: "NERVE PAIN RELIEF", hz: "174 Hz", color: "#f59e0b", color2: "#ef4444" },
  inflammation: { name: "INFLAMMATION KILLER", hz: "304 Hz", color: "#ef4444", color2: "#06b6d4" },
  muscle_tension: { name: "MUSCLE RELEASE", hz: "136.1 Hz", color: "#10b981", color2: "#10b981" },
  anxiety: { name: "ANXIETY DESTROYER", hz: "396 Hz", color: "#a855f7", color2: "#10b981" },
  depression: { name: "DEPRESSION LIFT", hz: "10 Hz", color: "#fbbf24", color2: "#ec4899" },
  calm: { name: "UNIVERSAL CALM", hz: "432 Hz", color: "#06b6d4", color2: "#3b82f6" },
  focus: { name: "LASER FOCUS", hz: "40 Hz", color: "#22c55e", color2: "#fbbf24" },
  earth: { name: "EARTH'S HEARTBEAT", hz: "7.83 Hz", color: "#10b981", color2: "#10b981" },
  sleep: { name: "DEEP SLEEP", hz: "2 Hz", color: "#3b82f6", color2: "#a855f7" },
  root_canal_pain: { name: "ROOT CANAL RELIEF", hz: "174 Hz", color: "#ef4444", color2: "#06b6d4" },
  tooth_infection: { name: "TOOTH INFECTION FIGHTER", hz: "304 Hz", color: "#f59e0b", color2: "#10b981" },
  cat_healing: { name: "CAT PURR HEALING", hz: "25 Hz", color: "#ec4899", color2: "#ec4899" },
  tinnitus_sweep: { name: "TINNITUS DESTROYER", hz: "20-20kHz", color: "#ef4444", color2: "#06b6d4" },
};

Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    const freqId = url.searchParams.get('freq') || 'generic';
    const freq = FREQUENCIES[freqId];

    // If no frequency param or invalid, serve generic OG image
    if (!freq) {
      const svg = generateGenericOG();
      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    // Generate frequency-specific OG image
    const svg = generateFrequencyOG(freq, freqId);
    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('OG Image error:', error);
    return new Response('Error generating OG image', { status: 500 });
  }
});

function generateGenericOG() {
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0514;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a0f2a;stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <rect width="1200" height="630" fill="url(#bgGrad)"/>
    
    <!-- Waves icon -->
    <g transform="translate(100, 100)">
      <rect x="20" y="50" width="20" height="40" fill="#06b6d4" opacity="0.6"/>
      <rect x="60" y="20" width="20" height="100" fill="#06b6d4" opacity="0.8"/>
      <rect x="100" y="0" width="20" height="140" fill="#06b6d4"/>
      <rect x="140" y="20" width="20" height="100" fill="#06b6d4" opacity="0.8"/>
      <rect x="180" y="50" width="20" height="40" fill="#06b6d4" opacity="0.6"/>
    </g>
    
    <!-- Title -->
    <text x="450" y="200" font-size="72" font-weight="bold" fill="#ffffff" font-family="Arial, sans-serif">
      FREQUENCY CHAMBER
    </text>
    
    <!-- Subtitle -->
    <text x="450" y="280" font-size="40" fill="#06b6d4" font-family="Arial, sans-serif">
      Free Healing Frequencies
    </text>
    
    <!-- Description -->
    <text x="450" y="350" font-size="28" fill="#d4c5b8" font-family="Arial, sans-serif">
      Play now • No login • Offline ready • Science-backed
    </text>
    
    <!-- CTA -->
    <rect x="450" y="420" width="400" height="80" rx="10" fill="#ec4899" opacity="0.2"/>
    <text x="650" y="475" font-size="32" font-weight="bold" fill="#ec4899" text-anchor="middle" font-family="Arial, sans-serif">
      ▶ PLAY HEALING
    </text>
  </svg>`;
}

function generateFrequencyOG(freq, freqId) {
  const titleMaxWidth = 900;
  
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0a0514;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a0f2a;stop-opacity:1" />
      </linearGradient>
      <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:${freq.color};stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:${freq.color};stop-opacity:0" />
      </radialGradient>
    </defs>
    
    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bgGrad)"/>
    
    <!-- Frequency glow core -->
    <circle cx="150" cy="150" r="120" fill="url(#coreGrad)"/>
    
    <!-- Frequency Hz large -->
    <text x="150" y="180" font-size="88" font-weight="bold" fill="${freq.color}" text-anchor="middle" font-family="monospace">
      ${freq.hz}
    </text>
    
    <!-- Title -->
    <text x="450" y="150" font-size="68" font-weight="bold" fill="${freq.color}" font-family="Arial, sans-serif">
      ${freq.name.substring(0, 25)}
    </text>
    ${freq.name.length > 25 ? `<text x="450" y="230" font-size="68" font-weight="bold" fill="${freq.color}" font-family="Arial, sans-serif">
      ${freq.name.substring(25)}
    </text>` : ''}
    
    <!-- Description based on frequency -->
    <text x="450" y="320" font-size="32" fill="#d4c5b8" font-family="Arial, sans-serif">
      ${getFrequencyTagline(freqId)}
    </text>
    
    <!-- CTA with frequency color -->
    <rect x="450" y="400" width="380" height="70" rx="10" fill="${freq.color}" opacity="0.2"/>
    <text x="640" y="455" font-size="36" font-weight="bold" fill="${freq.color}" text-anchor="middle" font-family="Arial, sans-serif">
      ▶ PLAY NOW
    </text>
    
    <!-- Badge -->
    <rect x="1000" y="50" width="150" height="50" rx="5" fill="${freq.color}" opacity="0.3"/>
    <text x="1075" y="85" font-size="18" font-weight="bold" fill="${freq.color}" text-anchor="middle" font-family="monospace">
      UF51
    </text>
  </svg>`;
}

function getFrequencyTagline(freqId) {
  const taglines = {
    chest_heart: "DNA repair • chest healing",
    nerve_pain: "Sharp pain gone",
    inflammation: "Swelling dissolves",
    muscle_tension: "Tension releases",
    anxiety: "Fear transforms",
    depression: "Light returns",
    calm: "Nervous system resets",
    focus: "Brain sharpens",
    earth: "Ground yourself",
    sleep: "Deep rest",
    root_canal_pain: "Dental relief",
    tooth_infection: "Infection clears",
    cat_healing: "Bones heal fast",
    tinnitus_sweep: "Phantom sounds fade",
  };
  return taglines[freqId] || "Healing frequencies";
}