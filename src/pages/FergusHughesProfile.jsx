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

  const Section = ({ title, children, last = false }) => (
    <div className={last ? '' : 'mb-5 pb-5 border-b border-gray-200'}>
      <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={ARIAL}>{title}</p>
      {children}
    </div>
  );

  const StatChip = ({ label, value }) => (
    <div className="bg-gray-50 border border-gray-200 rounded px-3 py-2 text-center">
      <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase" style={ARIAL}>{label}</p>
      <p className="text-sm font-black text-gray-900 mt-0.5" style={ARIAL}>{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:p-8">
      <div id="profile-content" className="max-w-3xl mx-auto bg-white shadow-xl" style={{ fontFamily: 'Georgia, serif' }}>

        {/* HEADER BAND */}
        <div className="bg-gray-900 text-white px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight" style={ARIAL}>FERGUS HUGHES</h1>
            <p className="text-gray-300 text-sm mt-1 tracking-wide uppercase" style={ARIAL}>Football Player Profile</p>
            <p className="text-red-400 text-sm mt-2 font-bold" style={ARIAL}>Centre-Back / Right-Back · Right Foot</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black tracking-widest text-gray-400 uppercase" style={ARIAL}>Current Club</p>
            <p className="text-xl font-black text-white mt-0.5" style={ARIAL}>Irvine Meadow FC</p>
            <p className="text-gray-400 text-xs mt-0.5" style={ARIAL}>Senior Debut · 27 Jun 2026</p>
          </div>
        </div>

        {/* VITAL STATS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 px-8 py-4 border-b-2 border-red-700">
          <StatChip label="Age" value="17" />
          <StatChip label="Height" value="6'1 / 185cm" />
          <StatChip label="Weight" value="73 kg" />
          <StatChip label="Nationality" value="Scottish" />
          <StatChip label="DOB" value="15/05/2009" />
        </div>

        {/* BODY */}
        <div className="px-8 py-6">

          {/* CLUB HISTORY + MATCH LOG side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 pb-5 border-b border-gray-200">
            <Section title="Club History">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="w-2 h-2 bg-red-700 rounded-full flex-shrink-0 mt-1.5" />
                  <div>
                    <p className="font-black text-gray-900 text-sm" style={ARIAL}>Irvine Meadow FC</p>
                    <p className="text-gray-500 text-xs" style={ARIAL}>2026–present · senior debut 27 Jun 2026</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="w-2 h-2 bg-gray-300 rounded-full flex-shrink-0 mt-1.5" />
                  <div>
                    <p className="text-gray-700 text-sm font-bold" style={ARIAL}>DAFC / Pars Foundation</p>
                    <p className="text-gray-500 text-xs" style={ARIAL}>DACC 2009 · 2024–2026 · released Jun 2026</p>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Match Log (Irvine Meadow)">
              <ul className="space-y-2 text-sm text-gray-800" style={ARIAL}>
                <li className="flex justify-between items-baseline border-b border-gray-100 pb-1">
                  <span><strong>27 Jun 2026</strong> · Troon (H)</span>
                  <span className="font-black text-gray-900">2–0 · 90'</span>
                </li>
                <li className="flex justify-between items-baseline">
                  <span><strong>04 Jul 2026</strong> · East Kilbride (H)</span>
                  <span className="text-gray-400 italic text-xs">fixture</span>
                </li>
              </ul>
              <p className="text-[11px] text-gray-400 mt-2 italic" style={ARIAL}>Shirt 5 · senior debut vs Troon</p>
            </Section>
          </div>

          {/* ACHIEVEMENTS + STRENGTHS side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 pb-5 border-b border-gray-200">
            <Section title="Achievements">
              <ul className="space-y-1 text-sm text-gray-800" style={ARIAL}>
                <li>• Player of the Year — 2025/26 Season</li>
                <li>• Team Captain — 2025/26 Season</li>
                <li>• Trained Barber — cuts hair for teammates &amp; friends while at school</li>
              </ul>
            </Section>

            <Section title="Strengths">
              <ul className="space-y-1 text-sm text-gray-800" style={ARIAL}>
                <li>• <strong>Commitment</strong> — Always worked hard and gave it my all</li>
                <li>• <strong>Leadership</strong> — Captain of a strong team through a respectable season</li>
                <li>• <strong>Attitude</strong> — Keep my head high at all times, even after mistakes</li>
                <li>• <strong>Determination</strong> — Teammates, coaches and parents have all noticed</li>
              </ul>
            </Section>
          </div>

          {/* QUOTES — full width, two quote blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 pb-5 border-b border-gray-200">
            <div className="border-l-4 border-red-700 pl-4">
              <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={ARIAL}>Why I'm Moving On</p>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                "I want to move up from where I am now because I feel like I'm at an important stage with my football. I have confidence and belief that I am at the level to take it a step up now."
              </p>
            </div>
            <div className="border-l-4 border-gray-300 pl-4">
              <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={ARIAL}>In His Own Words</p>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                "I'm a natural leader and someone who takes initiative on the pitch. My attitude is one of the things I am proud of — I keep my head high at all times even when I make a mistake or have a bad game. I give 100% every session."
              </p>
            </div>
          </div>

          {/* DEVELOPMENT + AMBITION side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 pb-5 border-b border-gray-200">
            <Section title="Area of Development">
              <p className="text-sm text-gray-800" style={ARIAL}>Strength and physicality — actively working to improve</p>
            </Section>
            <div>
              <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={ARIAL}>Ambition</p>
              <p className="text-base font-black text-gray-900 leading-snug" style={ARIAL}>
                To reach the highest level possible and represent Scotland internationally.
              </p>
            </div>
          </div>

          {/* CONTACT + LOGISTICS side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={ARIAL}>Contact</p>
              <p className="font-black text-gray-900 text-sm" style={ARIAL}>Brian Hughes (Father)</p>
              <p className="text-gray-700 text-sm" style={ARIAL}>07494 023328</p>
            </div>
            <div>
              <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={ARIAL}>Logistics</p>
              <p className="font-black text-gray-900 text-sm" style={ARIAL}>Inverkeithing High School</p>
              <p className="text-gray-500 text-xs mt-0.5" style={ARIAL}>Finishes 1pm Mon/Wed · 3:15pm Tue/Thu/Fri</p>
              <p className="text-gray-700 text-sm mt-1" style={ARIAL}>Travel: Can travel throughout Central Scotland. Driving theory passed, practical test imminent.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Download Button */}
      <div className="max-w-3xl mx-auto mt-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <p className="text-xs text-gray-500" style={ARIAL}>Ready for scouts · Greg Gordon · Tony Begg</p>
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