import { jsPDF } from 'npm:jspdf@2.5.2';

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const { guestName, amount, dates, email } = body;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('INVOICE', pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(100);

    // Company info
    const companyInfo = [
      'Stoneymollan Estate',
      'Loch Lomond, Scotland',
      'Phone: +44 1389 750 xxx',
      'Email: info@stoneymollan.com'
    ];
    let yPos = 35;
    companyInfo.forEach(line => {
      doc.text(line, 20, yPos);
      yPos += 5;
    });

    // Invoice details
    doc.setTextColor(0);
    doc.setFont(undefined, 'bold');
    yPos = 65;
    doc.text('INVOICE DETAILS', 20, yPos);

    doc.setFont(undefined, 'normal');
    yPos = 75;
    doc.text(`Invoice Date: ${new Date().toLocaleDateString('en-GB')}`, 20, yPos);
    yPos += 8;
    doc.text(`Guest: ${guestName}`, 20, yPos);
    yPos += 8;
    doc.text(`Email: ${email || 'Not provided'}`, 20, yPos);
    yPos += 8;
    doc.text(`Stay Dates: ${dates}`, 20, yPos);

    // Service details
    yPos += 18;
    doc.setFont(undefined, 'bold');
    doc.text('SERVICE DESCRIPTION', 20, yPos);

    doc.setFont(undefined, 'normal');
    yPos += 10;
    doc.text('Evening Cabin Stay at Stoneymollan Estate', 20, yPos);

    // Amount section
    yPos += 25;
    doc.setLineWidth(0.5);
    doc.line(20, yPos, pageWidth - 20, yPos);
    yPos += 10;

    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text('Amount Due: £' + amount, 20, yPos);

    yPos += 15;
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Status: PAID', 20, yPos, { textColor: [34, 197, 94] });

    // Footer
    yPos = pageHeight - 20;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('Thank you for your stay at Stoneymollan Estate', pageWidth / 2, yPos, { align: 'center' });

    const pdfBytes = doc.output('arraybuffer');
    const filename = `Invoice_${guestName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Invoice generation error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});