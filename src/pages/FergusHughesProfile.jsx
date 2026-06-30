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
  const Ball = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.5l3 2.3-1.2 3.7h-3.6L9 8.8 12 6.5z" fill="#16a34a" fillOpacity="0.12" />
      <path d="M12 6.5V3.5M14.8 12.5l3 1M9.2 12.5l-3 1" />
    </svg>
  );
  const Pin = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-6-5.7-6-10a6 6 0 1112 0c0 4.3-6 10-6 10z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  );

  const Section = ({ title, children }) => (
    <section className="py-7 border-t border-stone-100 first:border-t-0">
      <h3 className="text-[11px] font-bold tracking-[0.22em] uppercase text-stone-400 mb-4" style={SANS}>{title}</h3>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-stone-200/40 flex items-start justify-center px-4 py-10 sm:py-14">
      <div className="w-full max-w-[640px]">

        <article id="profile-content" className="bg-white rounded-2xl shadow-sm border border-stone-200/80 overflow-hidden">

          {/* HERO */}
          <header className="px-8 sm:px-10 pt-9 pb-8">
            <div className="flex items-start gap-5">
              {/* initials avatar */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-700 flex items-center justify-center">
                <span className="text-white text-xl font-bold tracking-tight" style={SANS}>FH</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Ball />
                  <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-green-700" style={SANS}>Footballer</span>
                </div>
                <h1 className="text-[28px] sm:text-[32px] font-bold text-stone-900 leading-none tracking-tight" style={SANS}>Fergus Hughes</h1>
                <p className="text-[15px] text-stone-500 mt-2" style={SANS}>Centre-Back / Right-Back · right foot · 17</p>
              </div>
            </div>

            {/* stat strip — clean row */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-stone-100 mt-8 rounded-xl overflow-hidden">
              {[
                { k: 'Club', v: 'Irvine Meadow' },
                { k: 'Born', v: '15 May 2009' },
                { k: 'Height', v: "6'1 / 185cm" },
                { k: 'Nationality', v: 'Scottish' },
              ].map((s) => (
                <div key={s.k} className="bg-white px-4 py-3.5">
                  <dt className="text-[10px] font-semibold tracking-[0.15em] uppercase text-stone-400" style={SANS}>{s.k}</dt>
                  <dd className="text-[13px] font-semibold text-stone-800 mt-1 leading-tight" style={SANS}>{s.v}</dd>
                </div>
              ))}
            </dl>
          </header>

          {/* BODY */}
          <div className="px-8 sm:px-10 pb-10">

            {/* LEAD QUOTE — the real him */}
            <blockquote className="border-l-2 border-green-600 pl-4 my-1">
              <p className="text-[16px] leading-relaxed text-stone-800" style={SANS}>
                "I want to move up from where I am now because I feel like I'm at an important stage with my football. I have confidence and belief that I am at the level to take it a step up now."
              </p>
              <footer className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mt-3" style={SANS}>Why I'm Moving On</footer>
            </blockquote>

            <Section title="Clubs">
              <ul className="space-y-3">
                <li className="flex justify-between items-baseline gap-4">
                  <div>
                    <p className="text-stone-900 font-semibold text-[15px]" style={SANS}>Irvine Meadow FC</p>
                    <p className="text-xs text-stone-400 mt-0.5" style={SANS}>senior debut 27 Jun 2026</p>
                  </div>
                  <p className="text-xs text-stone-400 whitespace-nowrap" style={SANS}>2026 —</p>
                </li>
                <li className="flex justify-between items-baseline gap-4">
                  <div>
                    <p className="text-stone-700 text-[15px]" style={SANS}>DAFC / Pars Foundation <span className="text-stone-400">(DACC 2009)</span></p>
                    <p className="text-xs text-stone-400 mt-0.5" style={SANS}>released Jun 2026</p>
                  </div>
                  <p className="text-xs text-stone-400 whitespace-nowrap" style={SANS}>2024 — 2026</p>
                </li>
              </ul>
            </Section>

            <Section title="Matches · Irvine Meadow">
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

            <Section title="What People See In Him">
              <ul className="space-y-2.5 text-[15px] text-stone-800" style={SANS}>
                <li><span className="font-semibold">Commitment</span> — always worked hard, gave it his all.</li>
                <li><span className="font-semibold">Leadership</span> — captain of a strong team.</li>
                <li><span className="font-semibold">Attitude</span> — keeps his head high, even after mistakes.</li>
                <li><span className="font-semibold">Determination</span> — noticed by teammates, coaches, parents.</li>
              </ul>
            </Section>

            <Section title="Honours">
              <ul className="space-y-2.5 text-[15px] text-stone-800" style={SANS}>
                <li>Player of the Year — 2025/26</li>
                <li>Team Captain — 2025/26</li>
                <li className="text-stone-500">Trained barber — cuts hair for teammates &amp; friends.</li>
              </ul>
            </Section>

            <Section title="Working On">
              <p className="text-[15px] text-stone-700" style={SANS}>Strength and physicality — actively working to improve.</p>
            </Section>

            <Section title="In His Own Words">
              <blockquote className="border-l-2 border-stone-200 pl-4">
                <p className="text-[16px] leading-relaxed text-stone-800" style={SANS}>
                  "I'm a natural leader and someone who takes initiative on the pitch. My attitude is one of the things I am proud of — I keep my head high at all times even when I make a mistake or have a bad game. I give 100% every session."
                </p>
              </blockquote>
            </Section>

            <Section title="Ambition">
              <p className="text-[19px] font-semibold text-stone-900 leading-snug" style={SANS}>
                To reach the highest level possible and represent Scotland.
              </p>
            </Section>

            {/* CONTACT */}
            <section className="pt-7 mt-7 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-[11px] font-bold tracking-[0.22em] uppercase text-stone-400 mb-3" style={SANS}>Contact</h4>
                <p className="text-stone-900 font-semibold text-[15px]" style={SANS}>Brian Hughes <span className="text-stone-400 font-normal">— Father</span></p>
                <p className="text-green-700 mt-1 font-medium text-[15px]" style={SANS}>07494 023328</p>
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-[0.22em] uppercase text-stone-400 mb-3" style={SANS}>Logistics</h4>
                <p className="flex items-center gap-1.5 text-stone-900 font-semibold text-[15px]" style={SANS}><Pin /> Inverkeithing High School</p>
                <p className="text-[13px] text-stone-500 mt-1" style={SANS}>Out 1pm Mon/Wed · 3:15pm Tue/Thu/Fri</p>
                <p className="text-[13px] text-stone-600 mt-1.5" style={SANS}>Travels Central Scotland · driving theory passed, practical imminent.</p>
              </div>
            </section>

          </div>
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