import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ARIAL = { fontFamily: 'Arial, sans-serif' };

export default function FergusHughesProfile() {
  const downloadPDF = async () => {
    const element = document.getElementById('profile-content');
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
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

  const Step = ({ n, title }) => (
    <div className="flex items-center gap-3 mb-3">
      <span className="w-7 h-7 bg-gray-900 text-white font-black text-xs flex items-center justify-center rounded-full" style={ARIAL}>{n}</span>
      <p className="text-xs font-black tracking-widest text-gray-900 uppercase" style={ARIAL}>{title}</p>
      <span className="flex-1 h-px bg-gray-200" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:p-8">
      <div id="profile-content" className="max-w-3xl mx-auto bg-white shadow-2xl overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>

        {/* PLAYER CARD HERO */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-8 py-7 overflow-hidden">
          {/* jersey number watermark */}
          <span className="absolute -right-2 -top-6 text-[180px] font-black text-white/5 leading-none select-none" style={ARIAL}>5</span>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-red-500 text-[11px] font-black tracking-[0.3em] uppercase mb-2" style={ARIAL}>Player Profile</p>
              <h1 className="text-5xl font-black tracking-tight leading-none" style={ARIAL}>FERGUS<br />HUGHES</h1>
              <div className="flex items-center gap-2 mt-3">
                <span className="bg-red-700 text-white text-[11px] font-black tracking-widest uppercase px-2.5 py-1 rounded" style={ARIAL}>CB / RB</span>
                <span className="bg-white/10 border border-white/20 text-white text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded" style={ARIAL}>Right Foot</span>
              </div>
            </div>
            <div className="text-right">
              <div className="border-2 border-red-600 rounded-lg px-4 py-3 bg-black/40">
                <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase" style={ARIAL}>Shirt No.</p>
                <p className="text-5xl font-black text-white leading-none" style={ARIAL}>5</p>
              </div>
              <p className="text-[11px] font-bold text-gray-300 mt-3 tracking-wide" style={ARIAL}>IRVINE MEADOW FC</p>
              <p className="text-[10px] text-gray-500" style={ARIAL}>Senior Debut · 27 Jun 2026</p>
            </div>
          </div>
        </div>

        {/* VITAL STAT RAIL */}
        <div className="grid grid-cols-5 divide-x divide-gray-200 border-b-2 border-red-700">
          {[
            ['Age', '17'],
            ['Height', "6'1"],
            ['Weight', '73kg'],
            ['Nation', 'SCO'],
            ['DOB', '15/05/09'],
          ].map(([label, value]) => (
            <div key={label} className="px-2 py-3 text-center">
              <p className="text-[9px] font-black tracking-widest text-gray-400 uppercase" style={ARIAL}>{label}</p>
              <p className="text-lg font-black text-gray-900 mt-0.5 leading-none" style={ARIAL}>{value}</p>
            </div>
          ))}
        </div>

        {/* BODY */}
        <div className="px-8 py-7 space-y-7">

          {/* 01 — CAREER */}
          <div>
            <Step n="1" title="Career" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="w-2.5 h-2.5 bg-red-700 rounded-full flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-black text-gray-900 text-sm" style={ARIAL}>Irvine Meadow FC</p>
                    <p className="text-gray-500 text-xs" style={ARIAL}>2026–present · senior debut 27 Jun 2026</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="w-2.5 h-2.5 bg-gray-300 rounded-full flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-700 text-sm font-bold" style={ARIAL}>DAFC / Pars Foundation</p>
                    <p className="text-gray-500 text-xs" style={ARIAL}>DACC 2009 · 2024–2026 · released Jun 2026</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2" style={ARIAL}>Match Log · Irvine Meadow</p>
                <div className="flex justify-between items-baseline border-b border-gray-100 pb-1 mb-1">
                  <span className="text-sm text-gray-800" style={ARIAL}><strong>27 Jun</strong> · Troon (H)</span>
                  <span className="font-black text-gray-900 text-sm" style={ARIAL}>2–0 · 90'</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-800" style={ARIAL}><strong>04 Jul</strong> · East Kilbride (H)</span>
                  <span className="text-gray-400 italic text-[11px]" style={ARIAL}>fixture</span>
                </div>
              </div>
            </div>
          </div>

          {/* 02 — HONOURS */}
          <div>
            <Step n="2" title="Honours & Strengths" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-gray-50 border-l-2 border-red-700 rounded-r px-4 py-3">
                <ul className="space-y-1.5 text-sm text-gray-800" style={ARIAL}>
                  <li className="font-bold text-gray-900">★ Player of the Year <span className="text-gray-400 font-normal">· 25/26</span></li>
                  <li className="font-bold text-gray-900">★ Team Captain <span className="text-gray-400 font-normal">· 25/26</span></li>
                  <li className="text-gray-700">✂ Trained Barber — cuts teammates' hair</li>
                </ul>
              </div>
              <ul className="space-y-1.5 text-sm text-gray-800 pl-1" style={ARIAL}>
                <li><strong>Commitment</strong> — Always worked hard, gave it my all</li>
                <li><strong>Leadership</strong> — Captain of a strong team</li>
                <li><strong>Attitude</strong> — Head high at all times, even after mistakes</li>
                <li><strong>Determination</strong> — Noticed by teammates, coaches, parents</li>
              </ul>
            </div>
          </div>

          {/* 03 — VOICE */}
          <div>
            <Step n="3" title="In His Voice" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-gray-50 rounded px-4 py-3 relative">
                <span className="absolute top-1 left-2 text-4xl text-red-700/30 font-black leading-none" style={ARIAL}>"</span>
                <p className="text-sm text-gray-700 italic leading-relaxed pl-3 pt-2">
                  I want to move up because I'm at an important stage with my football. I have the confidence and belief I'm at the level to take it a step up now.
                </p>
                <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mt-2" style={ARIAL}>Why I'm Moving On</p>
              </div>
              <div className="bg-gray-50 rounded px-4 py-3 relative">
                <span className="absolute top-1 left-2 text-4xl text-red-700/30 font-black leading-none" style={ARIAL}>"</span>
                <p className="text-sm text-gray-700 italic leading-relaxed pl-3 pt-2">
                  I'm a natural leader who takes initiative. My attitude is what I'm proudest of — I keep my head high even after a mistake or a bad game. I give 100% every session.
                </p>
                <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mt-2" style={ARIAL}>In His Own Words</p>
              </div>
            </div>
          </div>

          {/* 04 — NEXT STEP */}
          <div>
            <Step n="4" title="Next Step" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1" style={ARIAL}>Developing</p>
                <p className="text-sm text-gray-800" style={ARIAL}>Strength &amp; physicality — actively working on it.</p>
              </div>
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1" style={ARIAL}>Ambition</p>
                <p className="text-base font-black text-gray-900 leading-snug" style={ARIAL}>
                  Reach the highest level possible &amp; represent Scotland.
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT + LOGISTICS */}
          <div className="bg-gray-900 text-white rounded px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1" style={ARIAL}>Contact</p>
              <p className="font-black text-white text-sm" style={ARIAL}>Brian Hughes <span className="text-gray-400 font-normal">(Father)</span></p>
              <p className="text-red-400 text-sm font-bold" style={ARIAL}>07494 023328</p>
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1" style={ARIAL}>Logistics</p>
              <p className="font-bold text-white text-sm" style={ARIAL}>Inverkeithing High School</p>
              <p className="text-gray-400 text-[11px]" style={ARIAL}>Out 1pm Mon/Wed · 3:15pm Tue/Thu/Fri</p>
              <p className="text-gray-300 text-xs mt-1" style={ARIAL}>Travels Central Scotland · driving theory passed, practical imminent.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Download */}
      <div className="max-w-3xl mx-auto mt-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <p className="text-xs text-gray-500" style={ARIAL}>Scout-ready · Greg Gordon · Tony Begg</p>
        <button
          onClick={downloadPDF}
          className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg transition-all flex items-center gap-2"
          style={ARIAL}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
}