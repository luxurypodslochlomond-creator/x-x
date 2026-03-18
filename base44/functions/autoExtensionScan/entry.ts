import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * AUTO EXTENSION SCANNER
 * Called by browser extension when new email arrives
 * Handles: gigs, tasks, invoices, Excel/CSV data, contracts
 * Returns structured data ready for CB51
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { emailText, emailSubject, attachments, artistId, fromEmail, timestamp } = await req.json();
    
    // Generic extraction prompt that identifies type + data
    const prompt = `You are an intelligent email scanner for artists/managers. Analyze this email and identify what type of document it contains, then extract relevant data.

EMAIL SUBJECT: ${emailSubject}
FROM: ${fromEmail}
EMAIL TEXT: ${emailText}
${attachments?.length > 0 ? `ATTACHMENTS: ${attachments.map(a => a.filename).join(', ')}` : ''}

IDENTIFY THE TYPE:
1. "gig_offer" - Music venue booking/gig offer
2. "task" - Action item, reminder, request
3. "invoice" - Payment request or bill
4. "contract" - Legal agreement, licensing deal
5. "expense" - Expense receipt, cost documentation
6. "excel_data" - Spreadsheet data, rates sheet, tour schedule
7. "other" - None of the above

Return JSON:
{
  "type": "gig_offer|task|invoice|contract|expense|excel_data|other",
  "confidence": 0.0-1.0,
  "data": {
    // For gig_offer:
    "venue": "string or null",
    "city": "string or null",
    "date": "YYYY-MM-DD or null",
    "fee": "number or null",
    
    // For task:
    "title": "string or null",
    "priority": "high|medium|low",
    "deadline": "YYYY-MM-DD or null",
    
    // For invoice:
    "vendor": "string or null",
    "amount": "number or null",
    "due_date": "YYYY-MM-DD or null",
    
    // For any type:
    "contact_name": "string or null",
    "contact_email": "string or null",
    "contact_phone": "string or null",
    "notes": "string with key details"
  },
  "raw_email": "full email text",
  "extracted_text": "summary of key extracted info"
}`;

    const extraction = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: "object",
        properties: {
          type: { type: "string" },
          confidence: { type: "number" },
          data: { type: "object" },
          raw_email: { type: "string" },
          extracted_text: { type: "string" }
        }
      }
    });

    // Route to appropriate handler based on type
    let result = null;

    if (extraction.type === 'gig_offer' && extraction.confidence > 0.7) {
      result = await createGigOffer(base44, extraction.data, artistId, emailText);
    } else if (extraction.type === 'task' && extraction.confidence > 0.6) {
      result = await createTask(base44, extraction.data, artistId);
    } else if (extraction.type === 'invoice' && extraction.confidence > 0.7) {
      result = await createInvoice(base44, extraction.data, artistId);
    } else if (extraction.type === 'expense' && extraction.confidence > 0.7) {
      result = await createExpense(base44, extraction.data, artistId);
    } else {
      result = {
        type: extraction.type,
        status: 'low_confidence',
        confidence: extraction.confidence,
        extracted_text: extraction.extracted_text,
        requires_manual_review: true
      };
    }

    return Response.json({
      success: true,
      extraction_type: extraction.type,
      confidence: extraction.confidence,
      result
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function createGigOffer(base44, data, artistId, rawEmail) {
  const offer = await base44.asServiceRole.entities.ScottGigOffer.create({
    artist_id: artistId,
    venue: data.venue,
    city: data.city,
    date: data.date,
    fee: data.fee,
    contact_name: data.contact_name,
    contact_email: data.contact_email,
    contact_phone: data.contact_phone,
    notes: data.notes,
    raw_email: rawEmail,
    status: 'pending_manager_review',
    auto_extracted: true
  });

  // Auto-notify manager
  try {
    await base44.functions.invoke('notifyManager', {
      offerId: offer.id,
      venue: offer.venue,
      date: offer.date,
      auto_extracted: true
    });
  } catch (e) {
    console.log('Notify failed:', e);
  }

  return { id: offer.id, type: 'gig_offer', venue: offer.venue };
}

async function createTask(base44, data, artistId) {
  const task = await base44.asServiceRole.entities.ScottTask.create({
    artist_id: artistId,
    title: data.title,
    priority: data.priority,
    deadline: data.deadline,
    notes: data.notes,
    status: 'pending',
    auto_extracted: true
  });
  return { id: task.id, type: 'task', title: task.title };
}

async function createInvoice(base44, data, artistId) {
  const invoice = await base44.asServiceRole.entities.ScottInvoice.create({
    artist_id: artistId,
    vendor: data.vendor,
    amount: data.amount,
    due_date: data.due_date,
    contact_name: data.contact_name,
    contact_email: data.contact_email,
    notes: data.notes,
    status: 'pending',
    auto_extracted: true
  });
  return { id: invoice.id, type: 'invoice', vendor: invoice.vendor };
}

async function createExpense(base44, data, artistId) {
  const expense = await base44.asServiceRole.entities.ScottExpense.create({
    artist_id: artistId,
    vendor: data.vendor,
    amount: data.amount,
    category: 'other',
    notes: data.notes,
    date: data.due_date,
    auto_extracted: true
  });
  return { id: expense.id, type: 'expense', vendor: expense.vendor };
}