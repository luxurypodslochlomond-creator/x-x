import React, { useState } from 'react';

const profile = {
  name: "Fergus Hughes",
  dob: "May 2009",
  age: "17",
  nationality: "Scottish",
  position: "Centre-Back / Right-Back",
  secondPosition: "Wing",
  preferredFoot: "Right",
  height: "",
  weight: "",
  currentClub: "TBC",
  previousClubs: [
    { club: "Dunfermline Community", years: "2024-2026", ageGroup: "U17s (age 15), U16s (age 16)" }
  ],
  achievements: [
    "Player of the Year — 2025/26 Season",
    "Team Captain — 2025/26 Season",
  ],
  strengths: [
    "Commitment & Work Rate — 100% every session, gave everything earning Player of the Year",
    "Leadership — Captain of a strong team, takes initiative on pitch",
    "Attitude — Keeps head high at all times, even after mistakes or bad games",
  ],
  developmentArea: "Strength and physicality — actively working to improve",
  playerDescription: "I'm a natural leader and someone who takes initiative on the pitch. My attitude is one of the things I am proud of — I keep my head high at all times even when I make a mistake or have a bad game. I give 100% every session.",
  whyMovingOn: "I want to move up from where I am now because I feel like I'm at an important stage with my football. I have confidence and belief that I am at the level to take it a step up now.",
  goal: "To play for the national team",
  videoLink: "",
  contactName: "Brian Hughes (Father)",
  contactPhone: "TBC — add your number",
  school: "Inverkeithing High School",
  canTravelTo: "Can travel to Falkirk training. Driving theory passed, practical test imminent.",
};

export default function FergusHughesProfile() {
  const [showPrintTip, setShowPrintTip] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Admin toolbar — hidden on print */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Fergus Hughes — Player Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Update the profile object at the top of this file once Fergus replies. Then print or share as PDF.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPrintTip(!showPrintTip)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            How to export PDF
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700"
          >
            Print / Save PDF
          </button>
        </div>
      </div>

      {showPrintTip && (
        <div className="max-w-3xl mx-auto mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 print:hidden">
          Click Print, then change destination to "Save as PDF". Set margins to Minimum and disable headers/footers for a clean one-pager.
        </div>
      )}

      {/* THE ONE-PAGER — this is what prints */}
      <div
        className="max-w-3xl mx-auto bg-white shadow-sm"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {/* Header */}
        <div className="border-b-4 border-gray-900 px-10 pt-10 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{profile.name}</h1>
              <p className="text-lg text-gray-500 mt-1 font-sans">Player Profile — {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="text-right text-sm text-gray-500 font-sans mt-1 space-y-0.5">
              <p>DOB: {profile.dob} (Age {profile.age})</p>
              <p>Nationality: {profile.nationality}</p>
              {profile.height && <p>Height: {profile.height}</p>}
            </div>
          </div>
        </div>

        <div className="px-10 py-8 space-y-8">

          {/* Position & Playing Style */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">Position</h2>
              <p className="text-gray-900 text-base">{profile.position}</p>
              {profile.secondPosition && (
                <p className="text-gray-500 text-sm mt-1">Also plays: {profile.secondPosition}</p>
              )}
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">Preferred Foot</h2>
              <p className="text-gray-900 text-base">{profile.preferredFoot || "TBC"}</p>
            </div>
          </div>

          {/* Career History */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-3">Club History</h2>
            <div className="space-y-1">
              {profile.previousClubs.map((c, i) => (
                <div key={i} className="flex items-baseline gap-3">
                  <span className="text-gray-900 font-sans text-sm font-semibold w-56">{c.club}</span>
                  <span className="text-gray-500 font-sans text-sm">{c.years}</span>
                  {c.ageGroup && <span className="text-gray-400 font-sans text-sm">— {c.ageGroup}</span>}
                </div>
              ))}
              <div className="flex items-baseline gap-3">
                <span className="text-gray-900 font-sans text-sm font-semibold w-56">{profile.currentClub}</span>
                <span className="text-gray-500 font-sans text-sm">Current</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-3">Achievements</h2>
            <ul className="space-y-1">
              {profile.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-2 font-sans text-sm text-gray-800">
                  <span className="text-gray-400 mt-0.5">—</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Strengths */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-3">Strengths</h2>
            <ul className="space-y-1">
              {profile.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 font-sans text-sm text-gray-800">
                  <span className="text-gray-400 mt-0.5">—</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Development */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">Area of Development</h2>
            <p className="font-sans text-sm text-gray-700">{profile.developmentArea}</p>
          </div>

          {/* In his own words */}
          <div className="border-l-4 border-gray-200 pl-5">
            <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">In His Own Words</h2>
            <p className="text-gray-700 italic text-sm leading-relaxed">"{profile.playerDescription}"</p>
          </div>

          {/* Ambition */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">Ambition</h2>
            <p className="font-sans text-sm text-gray-700">{profile.goal}</p>
          </div>

          {/* Video */}
          {profile.videoLink && (
            <div>
              <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">Match Footage</h2>
              <p className="font-sans text-sm text-blue-700 break-all">{profile.videoLink}</p>
            </div>
          )}

          {/* Footer / Contact */}
          <div className="border-t border-gray-200 pt-6 flex items-start justify-between">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">Contact</h2>
              <p className="font-sans text-sm text-gray-800">{profile.contactName}</p>
              <p className="font-sans text-sm text-gray-500">{profile.contactPhone}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase font-sans mb-2">Logistics</h2>
              <p className="font-sans text-sm text-gray-500">{profile.school}</p>
              <p className="font-sans text-sm text-gray-500">Travel: {profile.canTravelTo}</p>
            </div>
          </div>

        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6 print:hidden">
        Admin only — not publicly linked. Update the profile object at the top of FergusHughesProfile.jsx with Fergus's answers.
      </p>
    </div>
  );
}