import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SERIF = { fontFamily: 'Georgia, "Times New Roman", serif' };
const SANS = { fontFamily: "'Segoe UI', Arial, sans-serif" };

export default function FergusHughesProfile() {
  const downloadPDF = async () => {
    const element = document.getElementById('profile-content');
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#fafaf9',
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

  const Pin = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9a3412" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-6-5.7-6-10a6 6 0 1112 0c0 4.3-6 10-6 10z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  );

  // numbered editorial section
  const Section = ({ n, title, children }) => (
    <section className="grid grid-cols-12 gap-4 py-7 border-t border-stone-200/80">
      <div className="col-span-12 sm:col-span-4">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[13px] font-semibold text-[#9a3412]" style={SANS}>{n}</span>
          <h3 className="text-[11px] font-bold tracking-[0.22em] uppercase text-stone-400" style={SANS}>{title}</h3>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-8 sm:pl-2">
        {children}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-stone-200/40 flex items-start justify-center px-4 py-10 sm:py-14">
      <div className="w-full max-w-[620px]">

        <article id="profile-content" className="bg-[#fafaf9] rounded-2xl shadow-sm border border-stone-200/80 overflow-hidden">

          {/* MASTHEAD */}
          <header className="px-8 sm:px-10 pt-10 pb-9 border-b border-stone-200/80">
            <div className="flex items-center justify-between mb-7">
              {/* monogram crest */}
              <div className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center">
                <span className="text-[15px] font-bold text-stone-800 tracking-tight" style={SERIF}>FH</span>
              </div>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-400" style={SANS}>Player Profile · 2026</span>
            </div>

            <h1 className="text-[40px] sm:text-[46px] font-bold text-stone-900 leading-[1.02] tracking-tight" style={SERIF}>Fergus Hughes</h1>
            <p className="text-[15px] text-stone-500 mt-3" style={SANS}>Centre-Back / Right-Back &nbsp;·&nbsp; right foot &nbsp;·&nbsp; 17</p>

            {/* inline stat row — hairlines, not boxes */}
            <div className="flex flex-wrap items-center mt-7 text-[13px]" style={SANS}>
              <span className="text-stone-800 font-semibold">Irvine Meadow FC</span>
              <span className="mx-3 text-stone-300">/</span>
              <span className="text-stone-600">b. 15 May 2009</span>
              <span className="mx-3 text-stone-300">/</span>
              <span className="text-stone-600">6'1 · 185cm</span>
              <span className="mx-3 text-stone-300">/</span>
              <span className="text-stone-600">Scottish</span>
            </div>
          </header>

          {/* LEAD PULL QUOTE */}
          <div className="px-8 sm:px-10 py-10 bg-white/40">
            <div className="relative pl-7">
              <span className="absolute -left-1 -top-3 text-5xl leading-none text-[#9a3412]/40" style={SERIF}>"</span>
              <blockquote className="text-[19px] leading-[1.6] text-stone-800" style={SERIF}>
                I want to move up from where I am now because I feel like I'm at an important stage with my football. I have confidence and belief that I am at the level to take it a step up now.
              </blockquote>
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mt-4" style={SANS}>Why I'm Moving On</p>
            </div>
          </div>

          {/* NUMBERED SECTIONS */}
          <div className="px-8 sm:px-10 pb-10">

            <Section n="01" title="Clubs">
              <ul className="space-y-3.5">
                <li className="flex justify-between items-baseline gap-4">
                  <div>
                    <p className="text-stone-900 font-semibold text-[15px]" style={SANS}>Irvine Meadow FC</p>
                    <p className="text-xs text-stone-400 mt-0.5" style={SANS}>senior debut · 27 Jun 2026</p>
                  </div>
                  <p className="text-xs text-stone-400 whitespace-nowrap" style={SANS}>2026 —</p>
                </li>
                <li className="flex justify-between items-baseline gap-4">
                  <div>
                    <p className="text-stone-700 text-[15px]" style={SANS}>DAFC / Pars Foundation <span className="text-stone-400">(DACC 2009)</span></p>
                    <p className="text-xs text-stone-400 mt-0.5" style={SANS}>released · Jun 2026</p>
                  </div>
                  <p className="text-xs text-stone-400 whitespace-nowrap" style={SANS}>2024 — 26</p>
                </li>
              </ul>
            </Section>

            <Section n="02" title="Matches · Irvine Meadow">
              <ul className="space-y-2.5">
                <li className="flex justify-between items-baseline gap-4 pb-2.5 border-b border-stone-100">
                  <span className="text-[15px] text-stone-800" style={SANS}>27 Jun · Troon <span className="text-stone-400">(home)</span></span>
                  <span className="text-[15px] font-semibold text-stone-900" style={SANS}>2–0 · 90'</span>
                </li>
                <li className="flex justify-between items-baseline gap-4">
                  <span className="text-[15px] text-stone-800" style={SANS}>04 Jul · East Kilbride <span className="text-stone-400">(home)</span></span>
                  <span className="text-xs text-stone-400 italic" style={SANS}>fixture</span>
                </li>
              </ul>
            </Section>

            <Section n="03" title="In His Own Words">
              <blockquote className="border-l-2 border-stone-300 pl-4">
                <p className="text-[16px] leading-[1.65] text-stone-800" style={SERIF}>
                  I'm a natural leader and someone who takes initiative on the pitch. My attitude is one of the things I am proud of — I keep my head high at all times even when I make a mistake or have a bad game. I give 100% every session.
                </p>
              </blockquote>
            </Section>

            <Section n="04" title="What People See">
              <ul className="space-y-2.5 text-[15px] text-stone-800 leading-relaxed" style={SANS}>
                <li><span className="font-semibold">Commitment</span> — always worked hard, gave it his all.</li>
                <li><span className="font-semibold">Leadership</span> — captain of a strong team.</li>
                <li><span className="font-semibold">Attitude</span> — keeps his head high, even after mistakes.</li>
                <li><span className="font-semibold">Determination</span> — noticed by teammates, coaches, parents.</li>
              </ul>
            </Section>

            <Section n="05" title="Honours">
              <ul className="space-y-2.5 text-[15px] text-stone-800" style={SANS}>
                <li>Player of the Year — 2025/26</li>
                <li>Team Captain — 2025/26</li>
                <li className="text-stone-500">Trained barber — cuts hair for teammates &amp; friends.</li>
              </ul>
            </Section>

            <Section n="06" title="Working On">
              <p className="text-[15px] text-stone-700" style={SANS}>Strength and physicality — actively working to improve.</p>
            </Section>

            <Section n="07" title="Ambition">
              <p className="text-[21px] font-semibold text-stone-900 leading-snug" style={SERIF}>
                To reach the highest level possible and represent Scotland.
              </p>
            </Section>
          </div>

          {/* COLOPHON — the soul */}
          <footer className="px-8 sm:px-10 py-9 bg-stone-900 text-stone-300">
            <p className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-5" style={SANS}>Colophon</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div>
                <p className="text-[15px] text-stone-100" style={SERIF}>
                  Profile maintained by Brian Hughes — musician &amp; father.
                </p>
                <p className="text-[13px] text-stone-400 mt-3 leading-relaxed" style={SANS}>
                  Built with care, not fanfare. Updated as the journey moves.
                </p>
              </div>
              <div>
                <h4 className="text-[10px] tracking-[0.25em] uppercase text-stone-500 mb-2" style={SANS}>Contact</h4>
                <p className="text-stone-100 font-semibold text-[15px]" style={SANS}>Brian Hughes</p>
                <p className="text-[#fbbf24] mt-1 text-[15px]" style={SANS}>07494 023328</p>
                <p className="flex items-center gap-1.5 text-stone-300 font-semibold text-[14px] mt-3" style={SANS}><Pin /> Inverkeithing High School</p>
                <p className="text-[12px] text-stone-400 mt-1" style={SANS}>Out 1pm Mon/Wed · 3:15pm Tue/Thu/Fri</p>
                <p className="text-[12px] text-stone-400 mt-1.5" style={SANS}>Travels Central Scotland · driving theory passed, practical imminent.</p>
              </div>
            </div>

            <div className="flex items-end justify-between mt-9 pt-6 border-t border-stone-700/60">
              <span className="text-[22px] text-stone-100" style={SERIF}>F.H.</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-stone-500" style={SANS}>No. 5 · 2026</span>
            </div>
          </footer>

        </article>

        {/* Download */}
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={downloadPDF}
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm"
            style={SANS}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Save as PDF
          </button>
        </div>

      </div>
    </div>
  );
}