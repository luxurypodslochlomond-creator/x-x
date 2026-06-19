import React from 'react';

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
    "Commitment — Always worked hard and gave it my all",
    "Leadership — Captain of a strong team through a respectable season",
    "Attitude — Keep my head high at all times, even after mistakes",
    "Determination — Teammates, coaches and parents have all noticed",
  ],
  developmentArea: "Strength and physicality — actively working to improve",
  playerDescription: "I'm a natural leader and someone who takes initiative on the pitch. My attitude is one of the things I am proud of — I keep my head high at all times even when I make a mistake or have a bad game. I give 100% every session.",
  whyMovingOn: "I want to move up from where I am now because I feel like I'm at an important stage with my football. I have confidence and belief that I am at the level to take it a step up now.",
  goal: "To play for the national team",
  contactName: "Brian Hughes (Father)",
  contactPhone: "07494 023328",
  school: "Inverkeithing High School",
  schoolSchedule: "Finishes 1pm Mon/Wed, 3:15pm Tue/Thu/Fri",
  canTravelTo: "Can travel to Falkirk training. Driving theory passed, practical test imminent.",
};

export default function FergusHughesProfile() {
  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:p-8">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #profile-content, #profile-content * { visibility: visible; }
          #profile-content { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            margin: 0; 
            padding: 0;
            border: none;
          }
          @page { margin: 1cm; size: A4; }
          /* Remove all footers and headers */
          footer, header { display: none !important; }
          /* Remove default browser footer (URL, date, page numbers) */
          @page { @bottom-center { content: none; } @bottom-left { content: none; } @bottom-right { content: none; } }
        }
      `}</style>
      
      <div id="profile-content" className="max-w-3xl mx-auto bg-white border border-gray-200 p-4 sm:p-6 md:p-8" style={{ fontFamily: 'Georgia, serif' }}>
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-4 mb-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-sm text-gray-600 mt-1 font-sans">Football Player Profile</p>
            </div>
            <div className="text-right text-xs text-gray-600 font-sans space-y-0.5">
              <p className="font-semibold">DOB: {profile.dob}</p>
              <p>Age {profile.age} • {profile.nationality}</p>
              <p>{profile.height} • {profile.weight}</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Key Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase font-sans mb-1">Position</p>
              <p className="text-gray-900 font-semibold text-sm">{profile.position}</p>
              {profile.secondPosition && <p className="text-gray-500 text-xs mt-0.5">Also: {profile.secondPosition}</p>}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase font-sans mb-1">Preferred Foot</p>
              <p className="text-gray-900 font-semibold text-sm">{profile.preferredFoot}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase font-sans mb-1">Current Club</p>
              <p className="text-gray-900 font-semibold text-sm">{profile.currentClub}</p>
            </div>
          </div>

          {/* Club History */}
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase font-sans mb-2">Club History</h2>
            {profile.previousClubs.map((c, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span className="text-gray-900 font-sans text-sm font-semibold w-44">{c.club}</span>
                <span className="text-gray-500 font-sans text-sm">{c.years}</span>
                {c.details && <span className="text-gray-400 font-sans text-sm">— {c.details}</span>}
              </div>
            ))}
          </div>

          {/* Why Moving On */}
          <div className="bg-gray-50 border-l-4 border-gray-400 p-4">
            <h2 className="text-xs font-bold text-gray-500 uppercase font-sans mb-1">Why I'm Moving On</h2>
            <p className="font-sans text-sm text-gray-800 italic">{profile.whyMovingOn}</p>
          </div>

          {/* Achievements & Strengths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xs font-bold text-gray-500 uppercase font-sans mb-2">Achievements</h2>
              <ul className="space-y-1.5">
                {profile.achievements.map((a, i) => (
                  <li key={i} className="font-sans text-sm text-gray-800">• {a}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-bold text-gray-500 uppercase font-sans mb-2">Strengths</h2>
              <ul className="space-y-1.5">
                {profile.strengths.map((s, i) => (
                  <li key={i} className="font-sans text-sm text-gray-800">• {s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Development */}
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase font-sans mb-1">Area of Development</h2>
            <p className="font-sans text-sm text-gray-700">{profile.developmentArea}</p>
          </div>

          {/* In His Own Words */}
          <div className="border-l-4 border-gray-300 pl-4 py-2">
            <h2 className="text-xs font-bold text-gray-500 uppercase font-sans mb-1">In His Own Words</h2>
            <p className="text-gray-700 italic text-sm leading-relaxed">"{profile.playerDescription}"</p>
          </div>

          {/* Ambition */}
          <div>
            <h2 className="text-xs font-bold text-gray-500 uppercase font-sans mb-1">Ambition</h2>
            <p className="font-sans text-base text-gray-900 font-semibold">{profile.goal}</p>
          </div>

          {/* Contact & Logistics */}
          <div className="border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xs font-bold text-gray-500 uppercase font-sans mb-1">Contact</h2>
              <p className="font-sans text-sm text-gray-900 font-semibold">{profile.contactName}</p>
              <p className="font-sans text-sm text-gray-600">{profile.contactPhone}</p>
            </div>
            <div>
              <h2 className="text-xs font-bold text-gray-500 uppercase font-sans mb-1">Logistics</h2>
              <p className="font-sans text-sm text-gray-700">{profile.school}</p>
              <p className="font-sans text-xs text-gray-500 mt-0.5">{profile.schoolSchedule}</p>
              <p className="font-sans text-sm text-gray-600 mt-1">Travel: {profile.canTravelTo}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Download PDF Button */}
      <div className="max-w-3xl mx-auto mt-6 flex flex-col sm:flex-row gap-4 items-center">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Download PDF
        </button>
        <p className="text-xs text-gray-500">Click then select "Save as PDF" to download the file</p>
      </div>
    </div>
  );
}