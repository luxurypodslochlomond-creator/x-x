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

  // small clean custom icons
  const Ball = ({ c = '#16a34a' }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.5l3 2.3-1.2 3.7h-3.6L9 8.8 12 6.5z" fill={c} fillOpacity="0.15" />
      <path d="M12 6.5V3.5M14.8 12.5l3 1M9.2 12.5l-3 1" />
    </svg>
  );
  const Pin = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-6-5.7-6-10a6 6 0 1112 0c0 4.3-6 10-6 10z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  );

  const Tag = ({ children }) => (
    <span className="inline-block text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-stone-100 text-stone-600" style={SANS}>{children}</span>
  );

  const Section = ({ title, children }) => (
    <div className="pt-5 mt-5 border-t border-stone-200">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1 h-4 bg-green-600 rounded-full" />
        <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-stone-500" style={SANS}>{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-200/50 px-4 py-8 sm:p-10">
      <div id="profile-content" className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-stone-200">

        {/* TOP — fresh, young, but not loud */}
        <div className="px-8 pt-8 pb-6 bg-gradient-to-br from-white to-stone-50">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Ball />
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-green-700" style={SANS}>Footballer · 17</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-none" style={SANS}>Fergus Hughes</h1>
              <p className="text-sm text-stone-500 mt-2" style={SANS}>Centre-Back / Right-Back · right foot</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase" style={SANS}>Shirt</p>
              <p className="text-4xl font-bold text-stone-800 leading-none" style={SANS}>5</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Tag>Irvine Meadow FC</Tag>
            <Tag>Born 15 May 2009</Tag>
            <Tag>6'1 / 185cm</Tag>
            <Tag>Scottish</Tag>
          </div>
        </div>

        {/* BODY */}
        <div className="px-8 pb-8">

          {/* IN HIS OWN WORDS — first, this is the real him */}
          <div className="pt-2">
            <p className="leading-relaxed text-stone-800 text-[15px]" style={SANS}>
              "I want to move up from where I am now because I feel like I'm at an important stage with my football. I have confidence and belief that I am at the level to take it a step up now."
            </p>
            <p className="text-[10px] tracking-widest text-stone-400 uppercase mt-2" style={SANS}>Why I'm Moving On</p>
          </div>

          <Section title="Clubs">
            <div className="space-y-2.5">
              <div className="flex justify-between items-baseline gap-4">
                <div>
                  <p className="text-stone-900 font-semibold" style={SANS}>Irvine Meadow FC</p>
                  <p className="text-xs text-stone-400 mt-0.5" style={SANS}>senior debut 27 Jun 2026</p>
                </div>
                <p className="text-xs text-stone-400 whitespace-nowrap" style={SANS}>2026 —</p>
              </div>
              <div className="flex justify-between items-baseline gap-4">
                <div>
                  <p className="text-stone-600" style={SANS}>DAFC / Pars Foundation <span className="text-stone-400">(DACC 2009)</span></p>
                  <p className="text-xs text-stone-400 mt-0.5" style={SANS}>released Jun 2026</p>
                </div>
                <p className="text-xs text-stone-400 whitespace-nowrap" style={SANS}>2024 — 2026</p>
              </div>
            </div>
          </Section>

          <Section title="Matches · Irvine Meadow">
            <div className="space-y-2">
              <div className="flex justify-between items-baseline border-b border-stone-100 pb-1.5">
                <span className="text-sm text-stone-800" style={SANS}>27 Jun · Troon <span className="text-stone-400">(home)</span></span>
                <span className="text-sm font-semibold text-stone-900" style={SANS}>2–0 · 90'</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-stone-800" style={SANS}>04 Jul · East Kilbride <span className="text-stone-400">(home)</span></span>
                <span className="text-xs text-stone-400 italic" style={SANS}>fixture</span>
              </div>
            </div>
          </Section>

          <Section title="What People See In Him">
            <ul className="space-y-1.5 text-sm text-stone-800" style={SANS}>
              <li><span className="font-semibold">Commitment</span> — always worked hard, gave it his all.</li>
              <li><span className="font-semibold">Leadership</span> — captain of a strong team.</li>
              <li><span className="font-semibold">Attitude</span> — keeps his head high, even after mistakes.</li>
              <li><span className="font-semibold">Determination</span> — noticed by teammates, coaches, parents.</li>
            </ul>
          </Section>

          <Section title="Honours">
            <ul className="space-y-1.5 text-sm text-stone-800" style={SANS}>
              <li>Player of the Year — 2025/26</li>
              <li>Team Captain — 2025/26</li>
              <li className="text-stone-500">Trained barber — cuts hair for teammates &amp; friends.</li>
            </ul>
          </Section>

          <Section title="Working On">
            <p className="text-sm text-stone-700" style={SANS}>Strength and physicality — actively working to improve.</p>
          </Section>

          {/* AMBITION + second quote — close it out honest */}
          <Section title="In His Own Words">
            <p className="leading-relaxed text-stone-800 text-[15px]" style={SANS}>
              "I'm a natural leader and someone who takes initiative on the pitch. My attitude is one of the things I am proud of — I keep my head high at all times even when I make a mistake or have a bad game. I give 100% every session."
            </p>
          </Section>

          <Section title="Ambition">
            <p className="text-lg font-semibold text-stone-900 leading-snug" style={SANS}>
              To reach the highest level possible and represent Scotland.
            </p>
          </Section>

          {/* CONTACT */}
          <div className="pt-5 mt-5 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <div>
              <p className="text-[10px] tracking-widest text-stone-400 uppercase mb-1.5" style={SANS}>Contact</p>
              <p className="text-stone-900 font-semibold" style={SANS}>Brian Hughes <span className="text-stone-400 font-normal">— Father</span></p>
              <p className="text-green-700 mt-0.5 font-medium" style={SANS}>07494 023328</p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest text-stone-400 uppercase mb-1.5" style={SANS}>Logistics</p>
              <p className="flex items-center gap-1.5 text-stone-900 font-semibold" style={SANS}><Pin /> Inverkeithing High School</p>
              <p className="text-xs text-stone-500 mt-0.5" style={SANS}>Out 1pm Mon/Wed · 3:15pm Tue/Thu/Fri</p>
              <p className="text-xs text-stone-600 mt-1" style={SANS}>Travels Central Scotland · driving theory passed, practical imminent.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Download */}
      <div className="max-w-2xl mx-auto mt-6 flex items-center justify-center">
        <button
          onClick={downloadPDF}
          className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-lg transition-all flex items-center gap-2"
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