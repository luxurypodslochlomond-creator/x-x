import { jsPDF } from "jspdf";
import { ROAD_DOC } from "./roadDoc";

const A4_W = 595.28;
const A4_H = 841.89;
const M = 56;
const W = A4_W - M * 2;
const BOTTOM = A4_H - 84;

const PAPER = [244, 239, 228];
const BONE = [239, 231, 214];
const INK = [26, 22, 18];
const RED = [179, 38, 30];
const MUTED = [107, 98, 88];

const sheet = (doc) => {
  doc.setFillColor(PAPER[0], PAPER[1], PAPER[2]);
  doc.rect(0, 0, A4_W, A4_H, "F");
};

const ink = (doc, c) => doc.setTextColor(c[0], c[1], c[2]);

// Draws a run of wrapped lines and returns the next free y.
const flow = (doc, text, y, { size = 10.5, font = "helvetica", style = "normal", color = INK, indent = 0, lead = 1.55 } = {}) => {
  doc.setFont(font, style);
  doc.setFontSize(size);
  ink(doc, color);
  const lines = doc.splitTextToSize(text, W - indent);
  doc.text(lines, M + indent, y);
  return y + lines.length * size * lead;
};

const room = (doc, y, h, head) => {
  if (y + h <= BOTTOM) return y;
  doc.addPage();
  sheet(doc);
  const y2 = flow(doc, head.toUpperCase(), 84, { size: 8.5, font: "courier", style: "bold", color: MUTED });
  doc.setDrawColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.setLineWidth(0.5);
  doc.line(M, y2 + 4, A4_W - M, y2 + 4);
  return y2 + 26;
};

const drawBullets = (doc, items, y, head, numbered = false) => {
  items.forEach((item, i) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(item, W - 26);
    y = room(doc, y, lines.length * 16.3 + 6, head);
    doc.setFillColor(RED[0], RED[1], RED[2]);
    doc.rect(M, y - 7, numbered ? 2.5 : 7, numbered ? 6 : 7, "F");
    doc.setFont("courier", "bold");
    doc.setFontSize(10);
    if (numbered) {
      ink(doc, RED);
      doc.text(String(i + 1).padStart(2, "0"), M + 10, y);
    }
    ink(doc, INK);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(lines, M + 26, y);
    y += lines.length * 16.3 + 9;
  });
  return y + 2;
};

const drawTable = (doc, t, y, head) => {
  const widths = t.widths.map((w) => w * W);
  const cell = (text, x, w, size, style, color) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    ink(doc, color);
    return doc.splitTextToSize(String(text), w - 10);
  };
  const headerLines = t.head.map((h, c) => cell(h, 0, widths[c], 8.2, "bold", MUTED));
  const headerH = Math.max(...headerLines.map((l) => l.length)) * 12 + 12;
  y = room(doc, y, headerH + 40, head);
  doc.setFillColor(BONE[0], BONE[1], BONE[2]);
  doc.rect(M, y - 12, W, headerH, "F");
  let x = M + 6;
  headerLines.forEach((lines, c) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    ink(doc, MUTED);
    doc.text(lines, x, y);
    x += widths[c];
  });
  y += headerH - 12 + 14;
  t.rows.forEach((row) => {
    const cells = row.map((v, c) => cell(v, 0, widths[c], 9.4, c === 0 ? "bold" : "normal", INK));
    const rowH = Math.max(...cells.map((l) => l.length)) * 13.4 + 12;
    y = room(doc, y, rowH + 8, head);
    x = M + 6;
    cells.forEach((lines, c) => {
      doc.setFont("helvetica", c === 0 ? "bold" : "normal");
      doc.setFontSize(9.4);
      ink(doc, c === 0 ? INK : MUTED);
      doc.text(lines, x, y);
      x += widths[c];
    });
    y += rowH;
    doc.setDrawColor(200, 192, 178);
    doc.setLineWidth(0.4);
    doc.line(M, y - 14, A4_W - M, y - 14);
  });
  return y + 10;
};

const drawCallout = (doc, b, y, head) => {
  const bodyLines = doc.splitTextToSize(b.text, W - 34);
  const h = 44 + bodyLines.length * 15;
  y = room(doc, y, h + 16, head);
  doc.setFillColor(BONE[0], BONE[1], BONE[2]);
  doc.rect(M, y - 16, W, h, "F");
  doc.setFillColor(RED[0], RED[1], RED[2]);
  doc.rect(M, y - 16, 3, h, "F");
  doc.setFont("courier", "bold");
  doc.setFontSize(8.6);
  ink(doc, RED);
  doc.text(b.label.toUpperCase(), M + 18, y + 2);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.6);
  ink(doc, INK);
  doc.text(bodyLines, M + 18, y + 22);
  return y + h + 6;
};

const drawBlocks = (doc, blocks, y, head) => {
  blocks.forEach((b) => {
    if (b.type === "para") {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      const lines = doc.splitTextToSize(b.text, W);
      y = room(doc, y, lines.length * 16.3 + 10, head);
      y = flow(doc, b.text, y, {}) + 10;
    } else if (b.type === "bullets") {
      y = drawBullets(doc, b.items, y, head);
    } else if (b.type === "numbered") {
      y = drawBullets(doc, b.items, y, head, true);
    } else if (b.type === "table") {
      y = drawTable(doc, b, y, head);
    } else if (b.type === "callout") {
      y = drawCallout(doc, b, y, head);
    } else if (b.type === "note") {
      doc.setFont("courier", "normal");
      doc.setFontSize(8.6);
      const lines = doc.splitTextToSize(b.text, W);
      y = room(doc, y, lines.length * 12.4 + 12, head);
      y = flow(doc, b.text, y, { size: 8.6, font: "courier", color: MUTED, lead: 1.45 }) + 12;
    }
  });
  return y;
};

const drawCover = (doc) => {
  doc.setFillColor(INK[0], INK[1], INK[2]);
  doc.rect(0, 0, A4_W, A4_H, "F");
  doc.setDrawColor(RED[0], RED[1], RED[2]);
  doc.setLineWidth(7);
  doc.line(M, 168, M + 92, 168);
  doc.setFont("courier", "bold");
  doc.setFontSize(10.5);
  ink(doc, RED);
  doc.text(ROAD_DOC.brand, M, 130, { charSpace: 2.2 });
  doc.setFont("courier", "normal");
  doc.setFontSize(9.4);
  ink(doc, PAPER);
  doc.text("EMPLOYEE No. 01 · SCOTLAND", M, 150, { charSpace: 1.4 });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(78);
  ink(doc, PAPER);
  doc.text(ROAD_DOC.title, M, 288, { charSpace: 1 });
  doc.setFont("courier", "bold");
  doc.setFontSize(12);
  ink(doc, RED);
  doc.text(ROAD_DOC.subtitle, M, 322, { charSpace: 2 });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  ink(doc, PAPER);
  doc.text(ROAD_DOC.subject, M, 372);
  doc.setFont("courier", "bold");
  doc.setFontSize(11);
  ink(doc, RED);
  doc.text(ROAD_DOC.role, M, 398, { charSpace: 1.2 });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11.5);
  ink(doc, PAPER);
  doc.text("A record of the route, the money, the dates, the job title,", M, 448);
  doc.text("the people to call, the duties owed, and the way he stays.", M, 466);
  doc.setDrawColor(RED[0], RED[1], RED[2]);
  doc.setLineWidth(1.2);
  doc.rect(M, 512, W, 156);
  doc.setFont("courier", "bold");
  doc.setFontSize(9.6);
  ink(doc, RED);
  doc.text(ROAD_DOC.version, M + 18, 542, { charSpace: 1.2 });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  ink(doc, PAPER);
  doc.text("Every fee, date and address in this record was checked against", M + 18, 570);
  doc.text("GOV.UK on the day it was written. Fees change every April.", M + 18, 588);
  doc.text("This is a record of a route and not legal advice.", M + 18, 606);
  doc.setFont("courier", "bold");
  doc.setFontSize(9.6);
  ink(doc, RED);
  doc.text(ROAD_DOC.made.toUpperCase(), M + 18, 636, { charSpace: 0.6 });
  doc.setFont("courier", "bold");
  doc.setFontSize(16);
  ink(doc, RED);
  doc.text("x = x", M, 762, { charSpace: 4 });
  doc.setFont("courier", "normal");
  doc.setFontSize(9);
  ink(doc, PAPER);
  doc.text("we are all one", M, 782, { charSpace: 1.6 });
};

const drawSection = (doc, s) => {
  doc.addPage();
  sheet(doc);
  doc.setDrawColor(RED[0], RED[1], RED[2]);
  doc.setLineWidth(6);
  doc.line(M, 74, M + 74, 74);
  doc.setFont("courier", "bold");
  doc.setFontSize(9.6);
  ink(doc, RED);
  doc.text(`SECTION ${s.n} / 08`, M, 100, { charSpace: 2 });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  ink(doc, INK);
  doc.text(s.title, M, 140);
  doc.setFont("courier", "normal");
  doc.setFontSize(10);
  ink(doc, MUTED);
  doc.text(doc.splitTextToSize(s.kicker, W), M, 164);
  doc.setDrawColor(INK[0], INK[1], INK[2]);
  doc.setLineWidth(0.8);
  doc.line(M, 186, A4_W - M, 186);
  drawBlocks(doc, s.blocks, 212, s.title);
};

const drawSignoff = (doc) => {
  doc.addPage();
  sheet(doc);
  const { title, text, lines } = ROAD_DOC.signoff;
  doc.setDrawColor(RED[0], RED[1], RED[2]);
  doc.setLineWidth(6);
  doc.line(M, 74, M + 74, 74);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  ink(doc, INK);
  doc.text(title, M, 140);
  let y = flow(doc, text, 176, { size: 10.6 }) + 40;
  lines.forEach((label) => {
    doc.setDrawColor(INK[0], INK[1], INK[2]);
    doc.setLineWidth(0.8);
    doc.line(M, y, A4_W - M, y);
    doc.setFont("courier", "normal");
    doc.setFontSize(9.4);
    ink(doc, MUTED);
    doc.text(label.toUpperCase(), M, y + 16, { charSpace: 0.8 });
    y += 96;
  });
  doc.setFont("courier", "bold");
  doc.setFontSize(24);
  ink(doc, RED);
  doc.text("x = x", M, 720, { charSpace: 6 });
  doc.setFont("courier", "normal");
  doc.setFontSize(9.4);
  ink(doc, MUTED);
  doc.text("we are all one · universal frequency 51 · scotland", M, 742, { charSpace: 1 });
};

const stampFooters = (doc) => {
  const total = doc.getNumberOfPages();
  for (let p = 2; p <= total; p += 1) {
    doc.setPage(p);
    doc.setFont("courier", "normal");
    doc.setFontSize(7.8);
    ink(doc, MUTED);
    doc.text("UF51 ROAD · 26.10.2026 · NOT LEGAL ADVICE", M, A4_H - 42, { charSpace: 0.6 });
    doc.text(String(p - 1).padStart(2, "0"), A4_W - M, A4_H - 42, { align: "right" });
  }
};

export const buildRoadPdf = () => {
  const doc = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
  drawCover(doc);
  ROAD_DOC.sections.forEach((s) => drawSection(doc, s));
  drawSignoff(doc);
  stampFooters(doc);
  return doc;
};