import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SANS = { fontFamily: "'Segoe UI', Arial, sans-serif" };

// tiny humble hand-drawn icons — no flash, just warmth
const Ball = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7l3 2.2-1.1 3.5h-3.8L9 9.2 12 7z" fill="#b45309" fillOpacity="0.12" />
    <path d="M12 7V4M14.9 12.7l2.9 1M9.1 12.7l-2.9 1" />
  </svg>
);
const Pin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-6-5.7-6-10a6 6 0 1112 0c0 4.3-6 10-6 10z" />
    <circle cx="12" cy="11" r="2" />
  </svg>
);

export default function FergusHughesProfile() {
  const downloadPDF = async () => {
    const element = document.getElementById('profile-content');
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#faf7f0',
    });
    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    const pdf = new jsPDF({ format: 'a4' });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;
    while (heightLeft > 1) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
    pdf.save('Fergus-Hughes-Profile.pdf');
  };

  const Row = ({ label, children }) => (
    <div className="py-4 border-t border-stone-300/60">
      <p className="text-[10px] tracking-[0.2em] text-stone-400 uppercase mb-2" style={SANS}>{label}</p>
      <div className="text-stone-800" style={SANS}>{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-200/50 px-4 py-8 sm:p-10">
      <div id="profile-content" className="max-w-xl mx-auto bg-[#faf7f0] rounded-lg shadow-sm border border-stone-300/50 px-8 sm:px-10 py-10">

        {/* HEADER — plain, no show */}
        <div className="pb-6">
          <div className="flex items-center gap-2 text-stone-500 mb-3">
            <Ball />
            <span className="text-[11px] tracking-[0.25em] uppercase" style={SANS}>Footballer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-stone-900 tracking-tight" style={SANS}>Fergus Hughes</h1>
          <p className="text-sm text-stone-500 mt-2" style={SANS}>
            Centre-Back / Right-Back · right foot · 17
          </p>
        </div>

        {/* VITALS — one quiet line */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-stone-500 pb-1" style={SANS}>
          <span>Born 15 May 2009</span>
          <span className="text-stone-300">·</span>
          <span>6'1 / 185cm</span>
          <span className="text-stone-300">·</span>
          <span>73kg</span>
          <span className="text-stone-300">·</span>
          <span>Scottish</span>
        </div>

        {/* CLUBS */}
        <Row label="Clubs">
          <div className="space-y-2">
            <div className="flex justify-between items-baseline gap-4">
              <p className="text-amber-700 font-medium">Irvine Meadow FC</p>
              <p className="text-xs text-stone-400">2026 —</p>
            </div>
            <div className="flex justify-between items-baseline gap-4">
              <p className="text-stone-600">DAFC / Pars Foundation <span className="text-stone-400">(DACC 2009)</span></p>
              <p className="text-xs text-stone-400">2024 — 2026</p>
            </div>
          </div>
        </Row>

        {/* MATCHES */}
        <Row label="Matches · Irvine Meadow">
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between items-baseline">
              <span>27 Jun · Troon <span className="text-stone-400">(home)</span></span>
              <span>2–0 · 90 min</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>04 Jul · East Kilbride <span className="text-stone-400">(home)</span></span>
              <span className="text-xs text-stone-400 italic">fixture</span>
            </div>
          </div>
        </Row>

        {/* IN HIS OWN WORDS — the heart of it */}
        <Row label="In His Own Words">
          <div className="space-y-4">
            <p className="leading-relaxed">
              "I want to move up from where I am now because I feel like I'm at an important stage with my football. I have confidence and belief that I am at the level to take it a step up now."
            </p>
            <p className="leading-relaxed">
              "I'm a natural leader and someone who takes initiative on the pitch. My attitude is one of the things I am proud of — I keep my head high at all times even when I make a mistake or have a bad game. I give 100% every session."
            </p>
          </div>
        </Row>

        {/* WHAT PEOPLE SEE */}
        <Row label="What People See In Him">
          <ul className="space-y-1.5 text-sm">
            <li><span className="font-medium">Commitment</span> — always worked hard, gave it his all.</li>
            <li><span className="font-medium">Leadership</span> — captain of a strong team.</li>
            <li><span className="font-medium">Attitude</span> — keeps his head high, even after mistakes.</li>
            <li><span className="font-medium">Determination</span> — noticed by teammates, coaches, parents.</li>
          </ul>
        </Row>

        {/* HONOURS */}
        <Row label="Honours">
          <ul className="space-y-1.5 text-sm">
            <li>Player of the Year — 2025/26</li>
            <li>Team Captain — 2025/26</li>
            <li className="text-stone-500">Trained barber — cuts hair for teammates &amp; friends.</li>
          </ul>
        </Row>

        {/* WORKING ON */}
        <Row label="Working On">
          <p className="text-sm">Strength and physicality — actively working to improve.</p>
        </Row>

        {/* AMBITION — quiet */}
        <Row label="Ambition">
          <p className="font-light text-stone-900 leading-snug">
            To reach the highest level possible and represent Scotland.
          </p>
        </Row>

        {/* CONTACT — humble footer */}
        <div className="pt-5 mt-2 border-t border-stone-300/60 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-stone-400 uppercase mb-1.5" style={SANS}>Contact</p>
            <p className="text-stone-800 font-medium" style={SANS}>Brian Hughes <span className="text-stone-400 font-normal">— Father</span></p>
            <p className="text-amber-700 mt-0.5" style={SANS}>07494 023328</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] text-stone-400 uppercase mb-1.5" style={SANS}>Logistics</p>
            <p className="flex items-center gap-1.5 text-stone-800 font-medium" style={SANS}><Pin /> Inverkeithing High School</p>
            <p className="text-xs text-stone-500 mt-0.5" style={SANS}>Out 1pm Mon/Wed · 3:15pm Tue/Thu/Fri</p>
            <p className="text-xs text-stone-600 mt-1" style={SANS}>Travels Central Scotland · driving theory passed, practical imminent.</p>
          </div>
        </div>

      </div>

      {/* Download */}
      <div className="max-w-xl mx-auto mt-6 flex items-center justify-center">
        <button
          onClick={downloadPDF}
          className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-sm font-medium rounded-lg transition-all flex items-center gap-2"
          style={SANS}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Save as PDF
        </button>
      </div>
    </div>
  );
}