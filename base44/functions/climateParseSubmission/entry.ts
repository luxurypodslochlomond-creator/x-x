import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// READ THE EMAIL — the machine does the typing, the person keeps the judgement.
//
// This is how the record's own people work: they get a mail with a headline, a link and a
// quote, and they send it on. Turning that into a properly sourced entry by hand is the work
// that stops an editor sending anything at all. So the machine reads the mail and fills the
// form: what it says, who said it, where the origin is, when it ran, who wrote it.
//
// TWO THINGS THIS FUNCTION WILL NOT DO:
//
// 1. It never makes up a link. A returned URL is accepted ONLY if that exact address appears
//    in the text that was pasted. A link the model "remembers" is thrown away here, in code,
//    not trusted because a prompt asked nicely. An entry whose origin is invented is worse
//    than no entry: it would sit on the record looking verified.
//
// 2. It never treats a signature as a source. Every mail from the record's own editor ends
//    with the same closing block — Horizon International, the Solutions Site, a YouTube page,
//    the Explorers Club. Those are the sender's, not the entry's, and taking one of them as
//    the origin would put the wrong link on a real claim. They are filtered out here by name,
//    whatever the model says.
//
// Nothing is written and nothing is published: the form is filled in, and a person sends it.

const SIGNATURE_DOMAINS = ['solutions-site.org', 'youtube.com/user/jselendy', 'explorers.org', 'horizoninternational'];

const KINDS: Record<string, string> = {
  entry: 'an entry for the record — a solution others can copy, or a climate crisis the world needs to know about',
  crisis: 'an entry for the record — a climate crisis the world needs to know about',
  action: 'something happening on the ground — a cleanup, planting, meeting or policy push, and how to join it',
  news: 'an entry for the wire — a fact with a traceable origin, dated and placed',
};

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const { text, kind = 'entry' } = await req.json();
    if (!text || !String(text).trim()) {
      return Response.json({ error: 'Nothing pasted.' }, { status: 400 });
    }
    const pasted = String(text).slice(0, 8000);

    // Every address that literally appears in the pasted text, minus the sender's signature.
    const urlsInText = Array.from(pasted.matchAll(/https?:\/\/[^\s<>"')\]]+/g))
      .map((m) => m[0].replace(/[.,;:)\]]+$/, ''))
      .filter((u) => !SIGNATURE_DOMAINS.some((d) => u.toLowerCase().includes(d)));

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `Read the email below and fill in the record's form. It is ${KINDS[kind] || KINDS.entry}.

Read the mail the way an editor would: find what it is actually saying, and where that came from. The mail may be short — a heading and a single link — and that is normal and fine.

THE RULES, and they matter more than filling every box:
- Use ONLY what the mail says. Never add a fact, a number, a name or a date that is not in it.
- Ignore the sender's signature block completely: the closing that names the sender, their organisations, their books, their videos and their clubs. It is not the subject and none of its links are the origin.
- The origin is the link to the thing being reported — the article, the report, the official page. If the mail gives several links, choose the one that is the content itself.
- Never write a URL that is not in the mail. If there is no usable link, leave the link empty and say so.
- Title: the mail's own heading if it has one, tidied into one plain line under 90 characters. If there is no heading, write one plain line describing what the mail says. Never a headline that overstates it.
- Summary: one or two plain sentences — what it is and why it matters. No spin, no adjectives doing the work of facts.
- The mail usually carries the line worth keeping, set in quotation marks. Where it does, keep that sentence WORD FOR WORD in "details", in quotation marks, exactly as the mail has it — and attribute it to whoever the mail attributes it to. Never reword a quotation: a quote on this record is somebody's actual words or it is not a quote. Keep no more than two sentences of another body's words.
- Details: two or three plain sentences of what the mail actually contains, including its own wording where a phrase is worth keeping.
- Who says so: the body, paper or person that published it, as named in the mail — or, if the mail names nobody, the publisher the link's address clearly belongs to (e.g. theguardian.com → The Guardian).
- Author and date: only if the mail states them. Otherwise leave empty.
- Place: only if the mail says where.
- Say what you could not tell in "unsure", in one short line. This is useful, not a failure.

THE MAIL
${pasted}`,
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'One plain line, under 90 characters.' },
          summary: { type: 'string', description: 'One or two plain sentences.' },
          details: { type: 'string', description: 'Two or three plain sentences of what the mail says.' },
          source_name: { type: 'string', description: 'Who says so — the publishing body, paper or person.' },
          source_url: { type: 'string', description: 'The origin link, copied exactly from the mail, or empty.' },
          source_author: { type: 'string', description: 'Author if named, else empty.' },
          source_date: { type: 'string', description: 'Publication date if stated, else empty.' },
          country: { type: 'string', description: 'Country if the mail says so, else empty.' },
          region_rough: { type: 'string', description: 'Rough place if the mail says so, else empty.' },
          publisher_type: { type: 'string', enum: ['official_body', 'journal', 'news_media', 'ngo', 'field_dispatch', 'document'] },
          kind: { type: 'string', enum: ['initiative', 'emergency', 'milestone'] },
          unsure: { type: 'string', description: 'What you could not tell from the mail, in one short line.' },
        },
        required: ['title', 'summary', 'unsure'],
      },
    });

    // The guarantee, in code rather than in a prompt: a link survives only if it is one of the
    // addresses that were actually pasted — and no signature link ever becomes a source.
    const clean = (s: any) => String(s || '').trim().replace(/[.,;:)\]]+$/, '');
    const claimed = clean(result?.source_url);
    const bare = (u: string) => u.replace(/^https?:\/\//i, '').replace(/\/$/, '').toLowerCase();
    const verified = claimed && urlsInText.find((u) => bare(u) === bare(claimed) || bare(u).includes(bare(claimed)));

    const fields: any = {
      title: String(result?.title || '').slice(0, 120),
      summary: String(result?.summary || ''),
      details: String(result?.details || ''),
      source_name: String(result?.source_name || ''),
      source_url: verified ? clean(verified) : '',
      source_author: String(result?.source_author || ''),
      source_date: String(result?.source_date || ''),
      country: String(result?.country || ''),
      region_rough: String(result?.region_rough || ''),
      publisher_type: result?.publisher_type || '',
      kind: result?.kind || '',
    };

    return Response.json({
      fields,
      links_in_text: urlsInText.length,
      link_verified: !!verified,
      unsure: String(result?.unsure || ''),
    });
  } catch (error: any) {
    console.error('climateParseSubmission error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}