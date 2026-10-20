Deno.serve(async (req) => {
  const url = new URL(req.url);
  const type = url.searchParams.get('type') || 'uf51';

  const favicons = {
    uf51: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#000000"/><path d="M2 16 L6 16 L8 8 L10 24 L12 12 L14 20 L16 6 L18 26 L20 10 L22 22 L24 14 L26 18 L30 16" stroke="#ec4899" stroke-width="2" stroke-linecap="round" fill="none"/></svg>',
    ps51: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#d4a017"/><circle cx="16" cy="12" r="3" fill="#000000"/><circle cx="12" cy="16" r="2" fill="#000000"/><circle cx="20" cy="16" r="2" fill="#000000"/><path d="M14 22 Q16 24 18 22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>',
    cb51: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#06b6d4"/><circle cx="16" cy="16" r="8" fill="none" stroke="#000000" stroke-width="2"/><circle cx="16" cy="16" r="4" fill="#000000"/><path d="M16 8 L16 6 M16 26 L16 24 M24 16 L26 16 M8 16 L6 16" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/></svg>',
    sorted: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#fcfaf6"/><g fill="#b8860b"><circle cx="4" cy="16" r="2.2"/><circle cx="9" cy="16" r="2.2"/><circle cx="14" cy="16" r="2.2"/><rect x="17" y="13.8" width="5" height="4.4" rx="2.2"/><rect x="24" y="13.8" width="5" height="4.4" rx="2.2"/><circle cx="30" cy="16" r="2.2"/></g></svg>',
    climate: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#efe7d6"/><circle cx="16" cy="16" r="3" fill="#b3261e"/><path d="M22.5 9.5 A9.2 9.2 0 0 1 22.5 22.5" stroke="#b3261e" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M9.5 9.5 A9.2 9.2 0 0 0 9.5 22.5" stroke="#b3261e" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>'
  };

  const svg = favicons[type] || favicons.uf51;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400'
    }
  });
});