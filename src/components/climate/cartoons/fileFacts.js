// ── WHAT THE FILE ALREADY KNOWS ABOUT ITSELF ────────────────────────────────────
// Brian, 26 November: "if one cartoonist upload file surely all details in there …
// might be in image they upload or link or whatever … zero barriers."
//
// He is right, and it matters for more than typing. A credit retyped by hand is a credit
// that gets mangled, and the person handing the drawing over is the last person who should
// have to retype something already attached to the artwork. So the record reads what the
// file says about itself before it asks anybody anything:
//
//   the filename   — often the title, or the hand's own name for the drawing
//   the metadata   — a designer's export carries the author and the copyright line
//                    (XMP, which is plain text inside the file, or PNG text chunks)
//
// Best effort, and nothing more. Anything not found is simply not offered, and every box
// stays open for a person to rewrite — this fills boxes, it never fills the record.

const tidy = (value) =>
  String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .replace(/^["'\s]+|["'\s]+$/g, '')
    .trim();

// A camera's default name is not a title. Nor is "screenshot" or "slide-4".
const isJunk = (name) => {
  const bare = String(name || '').trim();
  if (!/[a-z]/i.test(bare)) return true;
  if (/^(img|dsc|dscf|pxl|mvimg|photo|image|screenshot|screen shot|slide|untitled|final|export)[-_ ]?\d*$/i.test(bare)) return true;
  if (/^[0-9a-f]{16,}$/i.test(bare.replace(/[-_ ]/g, ''))) return true;
  return false;
};

const titleFromName = (name) => {
  const bare = String(name || '').replace(/\.[a-z0-9]+$/i, '');
  const said = tidy(bare.replace(/[_]+/g, ' ').replace(/-+/g, ' '));
  return isJunk(said) ? '' : said.slice(0, 120);
};

export async function factsFromFile(file) {
  const facts = { title: titleFromName(file?.name), artist: '', credit: '', description: '' };
  if (!file || !file.type?.startsWith('image/')) return facts;

  try {
    // The first 400 KB is where a file keeps its own paperwork: XMP sits near the start,
    // and a PNG's text chunks come before the pixel data.
    const head = await file.slice(0, 400000).arrayBuffer();
    const text = new TextDecoder('latin1').decode(new Uint8Array(head));
    const grab = (...patterns) => {
      for (const pattern of patterns) {
        const found = text.match(pattern);
        const value = tidy(found?.[1]);
        if (value) return value;
      }
      return '';
    };

    facts.artist = grab(
      /<dc:creator>[\s\S]{0,80}?<rdf:li[^>]*>([^<]{1,120})<\/rdf:li>/i,
      /(?:^|\x00)Author\x00([^\x00]{1,120})/,
      /<photoshop:Credit>([^<]{1,120})<\/photoshop:Credit>/i
    );

    facts.credit = grab(
      /<dc:rights>[\s\S]{0,80}?<rdf:li[^>]*>([^<]{1,160})<\/rdf:li>/i,
      /(?:^|\x00)(?:Copyright|Credit)\x00([^\x00]{1,160})/,
      /(©\s?[^\x00<]{1,80}?(?:19|20)\d\d)/
    );

    facts.description = grab(
      /<dc:description>[\s\S]{0,80}?<rdf:li[^>]*>([^<]{1,200})<\/rdf:li>/i,
      /(?:^|\x00)Description\x00([^\x00]{1,200})/
    );
  } catch {
    // A file that says nothing about itself is completely normal.
  }

  return facts;
}