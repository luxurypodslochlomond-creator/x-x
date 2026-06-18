import React, { useState } from 'react';

const profile = {
  name: "Fergus Hughes",
  dob: "15/05/2009",
  age: "17",
  nationality: "Scottish",
  position: "Centre-Back / Right-Back",
  secondPosition: "Wing",
  preferredFoot: "Right",
  height: "6'1\" (185 cm)",
  weight: "73 kg",
  currentClub: "Dunfermline Community",
  previousClubs: [
    { club: "Dunfermline Community", years: "2024-2026", details: "U17s at age 15, then U16s at age 16" }
  ],
  achievements: [
    "Player of the Year — 2025/26 Season",
    "Team Captain — 2025/26 Season",
    "Trained Barber — cuts hair for teammates & friends while at school",
  ],
  strengths: [
    "Commitment & Work Rate — 100% every session, always worked hard and gave it my all",
    "Leadership — Captain of a strong team through a respectable season",
    "Attitude — Keep my head high at all times, even after mistakes or bad games",
    "Determination — Something teammates, coaches and parents have noticed",
  ],
  developmentArea: "Strength and physicality — actively working to improve",
  playerDescription: "I'm a natural leader and someone who takes initiative on the pitch. My attitude is one of the things I am proud of — I keep my head high at all times even when I make a mistake or have a bad game. I give 100% every session.",
  whyMovingOn: "I want to move up from where I am now because I feel like I'm at an important stage with my football. I have confidence and belief that I am at the level to take it a step up now.",
  goal: "To play for the national team",
  videoLink: "",
  contactName: "Brian Hughes (Father)",
  contactPhone: "07494 023328",
  school: "Inverkeithing High School",
  schoolSchedule: "Finishes 1pm Mon/Wed, 3:15pm Tue/Thu/Fri",
  canTravelTo: "Can travel to Falkirk training. Driving theory passed, practical test imminent.",
};

export default function FergusHughesProfile() {
  const [showPrintTip, setShowPrintTip] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <style>{`
        @media print {
          header, footer, aside, nav, main > header, main > footer, [data-standalone], .lg\\:block, .lg\\:ml-80, .fixed, .sticky, body > div > div {
            display: none !important;
            visibility: hidden !important;
          }
          body, body * { background: white !important; }
          button, [role="button"] { display: none !important; }
          .print-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 1.5cm !important;
            box-shadow: none !important;
            background: white !important;
          }
          .print-container, .print-container * {
            visibility: visible !important;
            display: block !important;
            color: black !important;
          }
          @page { margin: 0; size: A4; }
        }
      `}</style>
      
      {/* Admin toolbar */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Fergus Hughes — Player Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Professional one-pager for scouts & coaches</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowPrintTip(!showPrintTip)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            How to export PDF
          </button>
          <button onClick={handlePrint} className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700">
            Print / Save PDF
          </button>
        </div>
      </div>

      {showPrintTip && (
        <div className="max-w-4xl mx-auto mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 print:hidden">
          Click Print → Change destination to "Save as PDF" → Set margins to "Minimum" → Disable headers/footers
        </div>
      )}

      {/* THE ONE-PAGER */}
      <div className="print-container max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden" style={{ fontFamily: 'Georgia, serif' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 pt-8 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">{profile.name}</h1>
              <p className="text-gray-300 mt-1.5 font-sans text-base">Football Player Profile</p>
            </div>
            <div className="text-right text-xs text-gray-300 font-sans mt-1.5 space-y-0.5">
              <p className="text-white font-semibold">DOB: {profile.dob}</p>
              <p>Age {profile.age} • {profile.nationality}</p>
              {profile.height && <p>{profile.height}</p>}
            </div>
          </div>
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* Key Stats - 3 columns */}
          <div className="grid grid-cols-3 gap-4 border-b border-gray-200 pb-5">
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-1">Position</p>
              <p className="text-gray-900 font-semibold text-sm">{profile.position}</p>
              {profile.secondPosition && <p className="text-gray-500 text-xs mt-0.5">Also: {profile.secondPosition}</p>}
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-1">Preferred Foot</p>
              <p className="text-gray-900 font-semibold text-sm">{profile.preferredFoot}</p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-1">Current Club</p>
              <p className="text-gray-900 font-semibold text-sm">{profile.currentClub}</p>
            </div>
          </div>

          {/* Club History */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">Club History</h2>
            <div className="space-y-1">
              {profile.previousClubs.map((c, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="text-gray-900 font-sans text-sm font-semibold w-48">{c.club}</span>
                  <span className="text-gray-500 font-sans text-sm">{c.years}</span>
                  {c.details && <span className="text-gray-400 font-sans text-sm">— {c.details}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Why Moving On */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <h2 className="text-xs font-bold tracking-widest text-blue-600 uppercase font-sans mb-2">Why I'm Moving On</h2>
            <p className="font-sans text-sm text-blue-900 italic">{profile.whyMovingOn}</p>
          </div>

          {/* Achievements & Strengths - 2 columns */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">Achievements</h2>
              <ul className="space-y-1.5">
                {profile.achievements.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-sm text-gray-800">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">Strengths</h2>
              <ul className="space-y-1.5">
                {profile.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-sm text-gray-800">
                    <span className="text-blue-600 mt-0.5">●</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Development */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
            <h2 className="text-xs font-bold tracking-widest text-amber-600 uppercase font-sans mb-2">Area of Development</h2>
            <p className="font-sans text-sm text-amber-900">{profile.developmentArea}</p>
          </div>

          {/* In His Own Words */}
          <div className="border-l-4 border-gray-300 pl-4 py-2">
            <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">In His Own Words</h2>
            <p className="text-gray-700 italic text-sm leading-relaxed">"{profile.playerDescription}"</p>
          </div>

          {/* Ambition */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">Ambition</h2>
            <p className="font-sans text-base text-gray-900 font-semibold">{profile.goal}</p>
          </div>

          {/* Contact & Logistics */}
          <div className="border-t-2 border-gray-200 pt-5 grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">Contact</h2>
              <p className="font-sans text-sm text-gray-900 font-semibold">{profile.contactName}</p>
              <p className="font-sans text-sm text-gray-600">{profile.contactPhone}</p>
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">Logistics</h2>
              <p className="font-sans text-sm text-gray-700">{profile.school}</p>
              <p className="font-sans text-xs text-gray-500 mt-0.5">{profile.schoolSchedule}</p>
              <p className="font-sans text-sm text-gray-600 mt-1">Travel: {profile.canTravelTo}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6 print:hidden">
        Admin only — Update the profile object at the top of this file
      </p>
    </div>
  );
}