import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:p-8">
      <div id="profile-content" className="max-w-2xl mx-auto bg-white p-10" style={{ fontFamily: 'Georgia, serif' }}>

        {/* HEADER */}
        <div className="flex justify-between items-start border-b-2 border-gray-300 pb-5 mb-5">
          <div>
            <h1 className="text-4xl font-black text-gray-900" style={{ fontFamily: 'Arial, sans-serif' }}>Fergus Hughes</h1>
            <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>Football Player Profile</p>
          </div>
          <div className="text-right text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
            <p className="font-bold text-gray-800">DOB: 15/05/2009</p>
            <p className="text-gray-600">Age 17 • Scottish</p>
            <p className="text-gray-600">6'1" (185 cm) • 73 kg</p>
          </div>
        </div>

        {/* POSITION / FOOT / CLUB — inline grid */}
        <div className="grid grid-cols-3 gap-4 mb-5 border-b border-gray-200 pb-5">
          <div>
            <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>Position</p>
            <p className="font-black text-gray-900 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Centre-Back / Right-Back</p>
            <p className="text-gray-500 text-xs mt-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>Also: Wing-Back</p>
          </div>
          <div>
            <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>Preferred Foot</p>
            <p className="font-black text-gray-900 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Right</p>
          </div>
          <div>
            <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>Current Club</p>
            <p className="font-black text-gray-900 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Dunfermline Community FC</p>
          </div>
        </div>

        {/* CLUB HISTORY */}
        <div className="mb-5 border-b border-gray-200 pb-5">
          <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Club History</p>
          <div className="flex gap-4 items-baseline">
            <span className="font-black text-gray-900 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Dunfermline Community FC</span>
            <span className="text-gray-500 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>2024–2026 — U17s at age 15, then U16s at age 16</span>
          </div>
        </div>

        {/* WHY MOVING ON */}
        <div className="mb-5 border-l-4 border-gray-300 pl-4">
          <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Why I'm Moving On</p>
          <p className="text-sm text-gray-700 italic leading-relaxed">
            "I want to move up from where I am now because I feel like I'm at an important stage with my football. I have confidence and belief that I am at the level to take it a step up now."
          </p>
        </div>

        {/* ACHIEVEMENTS */}
        <div className="mb-5">
          <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Achievements</p>
          <ul className="space-y-1 text-sm text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>
            <li>• Player of the Year — 2025/26 Season</li>
            <li>• Team Captain — 2025/26 Season</li>
            <li>• Trained Barber — cuts hair for teammates &amp; friends while at school</li>
          </ul>
        </div>

        {/* STRENGTHS */}
        <div className="mb-5">
          <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Strengths</p>
          <ul className="space-y-1 text-sm text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>
            <li>• <strong>Commitment</strong> — Always worked hard and gave it my all</li>
            <li>• <strong>Leadership</strong> — Captain of a strong team through a respectable season</li>
            <li>• <strong>Attitude</strong> — Keep my head high at all times, even after mistakes</li>
            <li>• <strong>Determination</strong> — Teammates, coaches and parents have all noticed</li>
          </ul>
        </div>

        {/* AREA OF DEVELOPMENT */}
        <div className="mb-5 border-b border-gray-200 pb-5">
          <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Area of Development</p>
          <p className="text-sm text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>Strength and physicality — actively working to improve</p>
        </div>

        {/* IN HIS OWN WORDS */}
        <div className="mb-5 border-l-4 border-gray-300 pl-4">
          <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>In His Own Words</p>
          <p className="text-sm text-gray-700 italic leading-relaxed">
            "I'm a natural leader and someone who takes initiative on the pitch. My attitude is one of the things I am proud of — I keep my head high at all times even when I make a mistake or have a bad game. I give 100% every session."
          </p>
        </div>

        {/* AMBITION */}
        <div className="mb-5 border-b border-gray-200 pb-5">
          <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Ambition</p>
          <p className="text-lg font-black text-gray-900" style={{ fontFamily: 'Arial, sans-serif' }}>To reach the highest level possible and represent Scotland internationally</p>
        </div>

        {/* CONTACT + LOGISTICS side by side */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Contact</p>
            <p className="font-black text-gray-900 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Brian Hughes (Father)</p>
            <p className="text-gray-700 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>07494 023328</p>
          </div>
          <div>
            <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Logistics</p>
            <p className="font-black text-gray-900 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Inverkeithing High School</p>
            <p className="text-gray-500 text-xs mt-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>Finishes 1pm Mon/Wed, 3:15pm Tue/Thu/Fri</p>
            <p className="text-gray-700 text-sm mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>Travel: Can travel throughout Central Scotland. Driving theory passed, practical test imminent.</p>
          </div>
        </div>

      </div>

      {/* Download Button */}
      <div className="max-w-2xl mx-auto mt-6">
        <button
          onClick={downloadPDF}
          className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg transition-all flex items-center gap-2"
          style={{ fontFamily: 'Arial, sans-serif' }}
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