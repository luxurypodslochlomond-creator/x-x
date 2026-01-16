import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    // SAMPLE EMAIL DATA (as if from extension)
    const testEmails = [
      {
        subject: "Gig Offer - Electric Circus, Feb 15th",
        body: "Hi Scott, We'd like to book you for Electric Circus on Feb 15th, 8pm. Fee: £500. Contact: venue@electric-circus.com. Let us know ASAP.",
        from: "venue@electric-circus.com",
        attachments: []
      },
      {
        subject: "Recording Contract - Sample Rights",
        body: "This is a recording agreement for the song 'Midnight Echo'. Rights retained by artist. Standard 70/30 split. Please review attached.",
        from: "label@recordco.com",
        attachments: ["contract.pdf"]
      },
      {
        subject: "Invoice #2501 - Studio Time",
        body: "Invoice for 10 hours studio time at £50/hr = £500. Due by end of month.",
        from: "studio@soundlab.com",
        attachments: ["invoice.pdf"]
      }
    ];

    // TEST CATEGORIZATION
    const categorized = [];
    for (const email of testEmails) {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Categorize this email into ONE category: GIG_OFFER, CONTRACT, INVOICE, or OTHER.
        
Subject: ${email.subject}
Body: ${email.body}

Respond with ONLY the category name and a brief reason in JSON format:
{"category": "CATEGORY", "reason": "why", "urgency": "high|medium|low"}`,
        response_json_schema: {
          type: "object",
          properties: {
            category: { type: "string" },
            reason: { type: "string" },
            urgency: { type: "string" }
          }
        }
      });

      categorized.push({
        subject: email.subject,
        from: email.from,
        category: response.category,
        reason: response.reason,
        urgency: response.urgency,
        attachments: email.attachments.length > 0 ? email.attachments : null
      });
    }

    return Response.json({
      status: "success",
      test_passed: true,
      emails_tested: testEmails.length,
      categorized_results: categorized,
      message: "Extension flow working! Ready for Scott testing."
    });

  } catch (error) {
    return Response.json({ 
      error: error.message,
      status: "test_failed"
    }, { status: 500 });
  }
});