import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SANS = { fontFamily: "'Segoe UI', Arial, sans-serif" };

export default function FergusHughesProfile() {
  const downloadPDF = async () => {
    const element = document.getElementById('profile-content');
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#f5f1ea',
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

  const Section = ({ label, children }) => (
    <div className="border-t border-stone-300/70 pt-5">
      <p className="text-[10px] font-semibold tracking-[0.25em] text-stone-500 uppercase mb-4" style={SANS}>{label}</p>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-200/60 px-4 py-8 sm:p-10">
      <div id="profile-content" className="max-w-2xl mx-auto bg-[#f5f1ea] rounded-lg shadow-sm border border-stone-300/60">

        {/* HEADER — quiet */}
        <div className="px-8 pt-10 pb-8">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-amber-700 uppercase mb-3" style={SANS}>A Footballer's Profile</p>
          <h1 className="text-4xl sm:text-5xl font-light text-stone-900 leading-[1.05] tracking-tight" style={SANS}>
            Fergus Hughes
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 text-sm text-stone-600" style={SANS}>
            <span>Centre-Back · Right-Back</span>
            <span className="text-stone-300">·</span>
            <span>Right foot</span>
            <span className="text-stone-300">·</span>
            <span className="text-amber-700">Irvine Meadow FC</span>
          </div>
        </div>

        {/* VITALS — quiet text row */}
        <div className="px-8 pb-6 grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6 text-sm" style={SANS}>
          <div>
            <p className="text-[10px] tracking-widest text-stone-400 uppercase">Born</p>
            <p className="text-stone-800 font-medium mt-0.5">15 May 2009</p>
          </div>
          <div>
            <p className="text-[10px] tracking-widest text-stone-400 uppercase">Age</p>
            <p className="text-stone-800 font-medium mt-0.5">17</p>
          </div>
          <div>
            <p className="text-[10px] tracking-widest text-stone-400 uppercase">Height</p>
            <p className="text-stone-800 font-medium mt-0.5">6'1 · 185cm</p>
          </div>
          <div>
            <p className="text-[10px] tracking-widest text-stone-400 uppercase">Nationality</p>
            <p className="text-stone-800 font-medium mt-0.5">Scottish</p>
          </div>
        </div>

        {/* BODY */}
        <div className="px-8 pb-10 space-y-7">

          {/* CAREER */}
          <Section label="Where I've Played">
            <div className="space-y-3">
              <div className="flex justify-between items-baseline gap-4">
                <div>
                  <p className="text-stone-900 font-medium" style={SANS}>Irvine Meadow FC</p>
                  <p className="text-xs text-stone-500 mt-0.5" style={SANS}>senior debut 27 Jun 2026</p>
                </div>
                <p className="text-xs text-stone-500 whitespace-nowrap" style={SANS}>2026 —</p>
              </div>
              <div className="flex justify-between items-baseline gap-4">
                <div>
                  <p className="text-stone-700" style={SANS}>DAFC / Pars Foundation <span className="text-stone-400">(DACC 2009)</span></p>
                  <p className="text-xs text-stone-500 mt-0.5" style={SANS}>released Jun 2026</p>
                </div>
                <p className="text-xs text-stone-500 whitespace-nowrap" style={SANS}>2024 — 2026</p>
              </div>
            </div>
          </Section>

          {/* MATCH LOG */}
          <Section label="Matches · Irvine Meadow">
            <div className="space-y-2">
              <div className="flex justify-between items-baseline border-b border-stone-300/50 pb-1.5">
                <span className="text-sm text-stone-800" style={SANS}>27 Jun · Troon <span className="text-stone-400">(home)</span></span>
                <span className="text-sm text-stone-800" style={SANS}>2–0 · 90 min</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-stone-800" style={SANS}>04 Jul · East Kilbride <span className="text-stone-400">(home)</span></span>
                <span className="text-xs text-stone-400 italic" style={SANS}>fixture confirmed</span>
              </div>
            </div>
          </Section>

          {/* IN HIS OWN WORDS — the honest centrepiece */}
          <Section label="In His Own Words">
            <div className="space-y-5">
              <div>
                <p className="text-stone-800 leading-relaxed" style={SANS}>
                  "I want to move up from where I am now because I feel like I'm at an important stage with my football. I have confidence and belief that I am at the level to take it a step up now."
                </p>
                <p className="text-[10px] tracking-widest text-stone-400 uppercase mt-2" style={SANS}>Why I'm Moving On</p>
              </div>
              <div>
                <p className="text-stone-800 leading-relaxed" style={SANS}>
                  "I'm a natural leader and someone who takes initiative on the pitch. My attitude is one of the things I am proud of — I keep my head high at all times even when I make a mistake or have a bad game. I give 100% every session."
                </p>
                <p className="text-[10px] tracking-widest text-stone-400 uppercase mt-2" style={SANS}>On His Game</p>
              </div>
            </div>
          </Section>

          {/* STRENGTHS — honest, no stars */}
          <Section label="What People See In Him">
            <ul className="space-y-2 text-sm text-stone-800" style={SANS}>
              <li className="flex gap-3"><span className="text-amber-700 mt-1.5">—</span><span><span className="font-medium">Commitment.</span> Always worked hard and gave it his all.</span></li>
              <li className="flex gap-3"><span className="text-amber-700 mt-1.5">—</span><span><span className="font-medium">Leadership.</span> Captain of a strong team through a respectable season.</span></li>
              <li className="flex gap-3"><span className="text-amber-700 mt-1.5">—</span><span><span className="font-medium">Attitude.</span> Keeps his head high at all times, even after mistakes.</span></li>
              <li className="flex gap-3"><span className="text-amber-700 mt-1.5">—</span><span><span className="font-medium">Determination.</span> Noticed by teammates, coaches and parents.</span></li>
            </ul>
          </Section>

          {/* HONOURS — quiet list */}
          <Section label="Honours">
            <ul className="space-y-1.5 text-sm text-stone-800" style={SANS}>
              <li>Player of the Year — 2025/26 Season</li>
              <li>Team Captain — 2025/26 Season</li>
              <li className="text-stone-600">Trained barber — cuts hair for teammates &amp; friends while at school.</li>
            </ul>
          </Section>

          {/* DEVELOPMENT — honest about it */}
          <Section label="Working On">
            <p className="text-sm text-stone-800" style={SANS}>Strength and physicality — actively working to improve.</p>
          </Section>

          {/* AMBITION */}
          <Section label="Ambition">
            <p className="text-lg text-stone-900 font-light leading-snug" style={SANS}>
              To reach the highest level possible and represent Scotland internationally.
            </p>
          </Section>

          {/* CONTACT — calm footer */}
          <div className="border-t border-stone-300/70 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] tracking-widest text-stone-400 uppercase mb-1.5" style={SANS}>Contact</p>
              <p className="text-sm text-stone-900 font-medium" style={SANS}>Brian Hughes <span className="text-stone-400 font-normal">— Father</span></p>
              <p className="text-sm text-amber-700 mt-0.5" style={SANS}>07494 023328</p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest text-stone-400 uppercase mb-1.5" style={SANS}>Logistics</p>
              <p className="text-sm text-stone-900 font-medium" style={SANS}>Inverkeithing High School</p>
              <p className="text-xs text-stone-500 mt-0.5" style={SANS}>Out 1pm Mon/Wed · 3:15pm Tue/Thu/Fri</p>
              <p className="text-xs text-stone-600 mt-1.5" style={SANS}>Travels throughout Central Scotland. Driving theory passed — practical test imminent.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Download */}
      <div className="max-w-2xl mx-auto mt-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <p className="text-xs text-stone-400" style={SANS}>Fergus Hughes · 2026</p>
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