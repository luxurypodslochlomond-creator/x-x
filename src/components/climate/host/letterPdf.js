import { jsPDF } from 'jspdf';
import { LETTER_PARAGRAPHS, LETTER_SUBJECT, LETTER_SIGN_OFF, letterDate } from './letterText';

// ── THE LETTER AS A FILE SHE CAN ACTUALLY SEND ────────────────────────────────
// One page, warm paper, the record's own signal at the head. Typeset rather than
// exported from a browser: a PDF is what an institution forwards, and a screenshot
// of a web page is not one. The three blanks stay blanks on purpose.
export function buildLetterPdf() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210;
  const L = 22;
  const R = W - 22;

  // Paper ground
  doc.setFillColor(247, 241, 229);
  doc.rect(0, 0, W, 297, 'F');

  // Head band — deep earth, signal rule
  doc.setFillColor(36, 29, 22);
  doc.rect(0, 0, W, 30, 'F');
  doc.setFillColor(226, 96, 42);
  doc.rect(0, 30, W, 1.6, 'F');

  doc.setTextColor(239, 231, 214);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('UNIVERSAL FREQUENCY 51 CIC', L, 13);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.4);
  doc.text('Together We Can Change the Course of Climate Change', L, 19);
  doc.text('Community Interest Company, registered in Scotland, SC870603', L, 23.5);

  // Date and the three blanks that are hers
  doc.setTextColor(107, 98, 88);
  doc.setFontSize(8.6);
  doc.text(letterDate(), L, 43);

  doc.setTextColor(26, 22, 18);
  doc.setFontSize(9.4);
  doc.text('[Name]', L, 51);
  doc.text('[Role or department]', L, 56);
  doc.text('[Institution]', L, 61);

  // Re: line
  doc.setDrawColor(26, 22, 18);
  doc.setLineWidth(0.3);
  doc.line(L, 68, R, 68);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.6);
  const subject = doc.splitTextToSize(LETTER_SUBJECT, R - L);
  doc.text(subject, L, 74);
  const afterSubject = 74 + subject.length * 4;
  doc.line(L, afterSubject + 2, R, afterSubject + 2);

  // Body — three paragraphs, one voice, no shouting
  doc.setFont('times', 'normal');
  doc.setFontSize(10.4);
  let y = afterSubject + 11;
  doc.text('Dear [Name],', L, y);
  y += 8;

  LETTER_PARAGRAPHS.forEach((para) => {
    const lines = doc.splitTextToSize(para, R - L);
    doc.text(lines, L, y);
    y += lines.length * 5.1 + 5;
  });

  // Sign-off
  y += 2;
  doc.text('With every good wish,', L, y);
  y += 12;
  doc.setFont('times', 'bold');
  doc.setFontSize(11.5);
  doc.text('Janine M. H. Selendy', L, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(107, 98, 88);
  doc.text('Founder, Horizon International', L, y);

  // Foot — the line the whole record rests on
  doc.setDrawColor(26, 22, 18);
  doc.setLineWidth(0.2);
  doc.line(L, 279, R, 279);
  doc.setFontSize(7);
  doc.text('Together we can change the course of climate change.', L, 284);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(179, 38, 30);
  doc.text('x = x', R, 284, { align: 'right' });

  doc.save('letter-climate-record.pdf');
}