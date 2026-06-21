import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const profile = {
  name: "Fergus Hughes",
  position: "Centre-Back | Right-Back",
  nationality: "Scottish",
  age: "17 Years Old",
  height: "6'1\" (185cm)",
  weight: "73kg",
  preferredFoot: "Right Footed",
  currentClub: "Dunfermline Community FC",

  about: "Fergus Hughes is a defender who plays primarily as a centre-back or right-back. He has experience playing above his age group throughout his development.\n\nHe was given captaincy responsibilities and recognised as Player of the Year during the 2025/26 season. He works hard, takes on feedback, and looks to improve his game consistently.\n\nFergus is committed to his development and looks to move up to the next level.",

  positions: {
    primary: "Centre-Back",
    secondary: "Right-Back",
    additional: "Wing-Back / Wide Defender",
    preferredFoot: "Right",
    currentClub: "Dunfermline Community FC",
  },

  journey: {
    club: "Dunfermline Community FC (2024–2026)",
    story: "Despite being one of the younger players within the group, Fergus competed at older age levels throughout his development.\n\nHe was given the captain's armband during the 2025/26 season.\n\nHis development has been built on hard work and a willingness to push himself.",
  },

  honours: [
    { icon: "trophy", text: "Player of the Year (2025/26)" },
    { icon: "captain", text: "Team Captain (2025/26)" },
    { icon: "arrowUp", text: "Regularly played above his age group" },
    { icon: "star", text: "Recognised for leadership, professionalism and commitment" },
  ],

  attributes: [
    {
      title: "Leadership",
      desc: "Given captaincy responsibilities during the 2025/26 season. Communicates with teammates and organises the back line.",
    },
    {
      title: "Defensive Mentality",
      desc: "Works hard in defensive situations and competes in individual battles.",
    },
    {
      title: "Commitment",
      desc: "Gives full effort in training and matches.",
    },
    {
      title: "Coachability",
      desc: "Takes on feedback and looks to improve his game.",
    },
  ],

  developmentFocus: "Fergus is currently working on increasing his physical strength and power.",

  playerStatement: "I'm a natural leader and someone who takes initiative on the pitch. My attitude is one of the things I am proud of — I keep my head high at all times even when I make a mistake or have a bad game. I give 100% every session.",

  whyMovingOn: "I want to move up from where I am now because I feel like I'm at an important stage with my football. I have confidence and belief that I am at the level to take it a step up now.",

  ambition: "To reach the highest level possible within the game and earn the opportunity to represent Scotland at international level.",

  character: "Away from football, Fergus is a qualified barber and cuts hair for teammates and friends.",

  availability: {
    based: "Fife",
    school: "Inverkeithing High School",
    travel: "Able to travel throughout Central Scotland",
    drivingTheory: true,
    practicalTest: "Pending",
  },

  contact: {
    name: "Brian Hughes (Father)",
    phone: "07494 023328",
  },

  references: "References available on request from Dunfermline Community FC management.",
};

const HonourIcon = ({ type }) => {
  const icons = {
    trophy: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/>
        <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
        <path d="M18 2H6v7a6 6 0 0012 0V2z"/>
      </svg>
    ),
    captain: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 19V5a2 2 0 012-2h14a2 2 0 012 2v14"/>
        <path d="M3 19l4-2 5 2 5-2 4 2"/>
        <path d="M12 7l1.2 2.4 2.6.4-1.9 1.8.5 2.6L12 13l-2.4 1.2.5-2.6L8.2 9.8l2.6-.4z"/>
      </svg>
    ),
    arrowUp: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M16 12l-4-4-4 4"/><path d="M12 8v8"/>
      </svg>
    ),
    star: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4L12 16.8 5.7 21.4 8 14 2 9.4h7.6z"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

export default function FergusHughesProfile() {
  const downloadPDF = async () => {
    const element = document.getElementById('profile-content');
    
    // Wait for all images to fully load before capturing
    const images = element.querySelectorAll('img');
    await Promise.all(Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));

    const canvas = await html2canvas(element, { scale: 2, useCORS: true, allowTaint: false, backgroundColor: '#ffffff', imageTimeout: 15000 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({ format: 'a4' });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save('Fergus-Hughes-Profile.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:p-8">
      <style>{`
        @media print {
          button { display: none !important; }
        }
      `}</style>

      <div id="profile-content" className="max-w-3xl mx-auto bg-white shadow-2xl">
        {/* ── HEADER ── */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden bg-gray-900">
            <img src="https://media.base44.com/images/public/6889f31e76713b9cd47e043c/fd878de13_IMG_0358.png" alt="Fergus Hughes in action" className="block w-full h-full object-cover object-top" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          </div>
          <div className="px-6 sm:px-8 py-8 sm:py-10">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{profile.name}</h1>
          <p className="text-lg sm:text-xl font-bold text-gray-300 mt-1">{profile.position}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm font-sans text-gray-400 items-center">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 2 L21 2 L21 12 C21 16 17 20 12 22 C7 20 3 16 3 12 Z"/></svg>
              {profile.nationality}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              {profile.age}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>
              {profile.height}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="3"/><path d="M12 8v8m-3-3h6"/></svg>
              {profile.weight}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l5 5"/></svg>
              {profile.preferredFoot}
            </span>
          </div>
          </div>
        </div>

        <div className="px-6 sm:px-8 py-8 space-y-8" style={{ fontFamily: 'Georgia, serif' }}>
          {/* ── ACTION PHOTO GALLERY ── */}
          <section>
            <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase font-sans mb-3 border-b-2 border-gray-800 pb-1">In Action</h2>
            <div className="grid grid-cols-2 gap-2">
              <img src="https://media.base44.com/images/public/6889f31e76713b9cd47e043c/f5ecc23e6_IMG_0359.png" alt="Fergus Hughes on the ball" className="block w-full aspect-video object-cover rounded" crossOrigin="anonymous" referrerPolicy="no-referrer" />
              <img src="https://media.base44.com/images/public/6889f31e76713b9cd47e043c/2489f755c_IMG_0356.png" alt="Fergus Hughes striking the ball" className="block w-full aspect-video object-cover rounded" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            </div>
          </section>
          {/* ── ABOUT FERGUS ── */}
          <section>
            <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase font-sans mb-3 border-b-2 border-gray-800 pb-1">About Fergus</h2>
            {profile.about.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm sm:text-base text-gray-800 leading-relaxed mb-3">{para}</p>
            ))}
          </section>

          {/* ── PLAYER PROFILE ── */}
          <section>
            <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase font-sans mb-3 border-b-2 border-gray-800 pb-1">Player Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 font-sans text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-100 pb-1.5 gap-0.5">
                <span className="text-gray-500 font-semibold">Position</span>
                <span className="text-gray-900 font-bold">{profile.positions.primary}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-100 pb-1.5 gap-0.5">
                <span className="text-gray-500 font-semibold">Secondary Position</span>
                <span className="text-gray-900 font-bold">{profile.positions.secondary}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-100 pb-1.5 sm:col-span-2 gap-0.5">
                <span className="text-gray-500 font-semibold">Additional Position</span>
                <span className="text-gray-900 font-bold">{profile.positions.additional}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-100 pb-1.5 gap-0.5">
                <span className="text-gray-500 font-semibold">Preferred Foot</span>
                <span className="text-gray-900 font-bold">{profile.positions.preferredFoot}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-100 pb-1.5 sm:col-span-2 gap-0.5">
                <span className="text-gray-500 font-semibold">Current Club</span>
                <span className="text-gray-900 font-bold">{profile.positions.currentClub}</span>
              </div>
            </div>
          </section>

          {/* ── FOOTBALL JOURNEY ── */}
          <section>
            <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase font-sans mb-3 border-b-2 border-gray-800 pb-1">Football Journey</h2>
            <p className="text-sm font-sans font-bold text-gray-900 mb-2">{profile.journey.club}</p>
            {profile.journey.story.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm sm:text-base text-gray-800 leading-relaxed mb-3">{para}</p>
            ))}
          </section>

          {/* ── HONOURS & RECOGNITION ── */}
          <section>
            <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase font-sans mb-3 border-b-2 border-gray-800 pb-1">Honours & Recognition</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {profile.honours.map((h, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-3 py-2.5 rounded">
                  <span className="text-gray-700 flex-shrink-0"><HonourIcon type={h.icon} /></span>
                  <span className="font-sans text-sm text-gray-800 font-semibold">{h.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── KEY ATTRIBUTES ── */}
          <section>
            <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase font-sans mb-3 border-b-2 border-gray-800 pb-1">Key Attributes</h2>
            <div className="space-y-3">
              {profile.attributes.map((attr, i) => (
                <div key={i} className="border-l-4 border-gray-800 pl-3">
                  <p className="font-sans font-black text-sm text-gray-900">{attr.title}</p>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed mt-0.5">{attr.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CURRENT DEVELOPMENT FOCUS ── */}
          <section>
            <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase font-sans mb-3 border-b-2 border-gray-800 pb-1">Current Development Focus</h2>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{profile.developmentFocus}</p>
          </section>

          {/* ── PLAYER STATEMENT ── */}
          <section className="bg-gray-900 text-white px-6 py-6 rounded">
            <h2 className="text-xs font-black tracking-widest text-gray-400 uppercase font-sans mb-3">In Fergus's Words</h2>
            <p className="text-sm sm:text-base leading-relaxed italic mb-4 text-gray-200">"{profile.playerStatement}"</p>
            <h2 className="text-xs font-black tracking-widest text-gray-400 uppercase font-sans mb-3 mt-5">Why I'm Ready For The Next Level</h2>
            <p className="text-sm sm:text-base leading-relaxed italic text-gray-200">"{profile.whyMovingOn}"</p>
          </section>

          {/* ── AMBITION ── */}
          <section>
            <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase font-sans mb-3 border-b-2 border-gray-800 pb-1">Ambition</h2>
            <p className="text-base sm:text-lg text-gray-900 font-bold leading-relaxed">{profile.ambition}</p>
          </section>

          {/* ── CHARACTER OFF THE PITCH ── */}
          <section>
            <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase font-sans mb-3 border-b-2 border-gray-800 pb-1">Character Off The Pitch</h2>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{profile.character}</p>
          </section>

          {/* ── AVAILABILITY ── */}
          <section>
            <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase font-sans mb-3 border-b-2 border-gray-800 pb-1">Availability</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-gray-800">Based in {profile.availability.based}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                <span className="text-gray-800">{profile.availability.school}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3v-6l2-5h9l4 5h2a2 2 0 012 2v4h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
                <span className="text-gray-800">{profile.availability.travel}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                <span className="text-gray-800">Driving Theory Passed</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span className="text-gray-800">Practical Test {profile.availability.practicalTest}</span>
              </div>
            </div>
          </section>

          {/* ── CONTACT ── */}
          <section>
            <h2 className="text-xs font-black tracking-widest text-gray-500 uppercase font-sans mb-3 border-b-2 border-gray-800 pb-1">Contact</h2>
            <p className="font-sans text-base font-bold text-gray-900">{profile.contact.name}</p>
            <p className="font-sans text-lg font-black text-gray-900 mt-1 flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
              {profile.contact.phone}
            </p>
          </section>

          {/* ── REFERENCES ── */}
          <section className="bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-800 px-6 py-6 rounded">
            <h2 className="text-xs font-black tracking-widest text-gray-800 uppercase font-sans mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
              References
            </h2>
            <p className="text-sm sm:text-base text-gray-900 leading-relaxed font-semibold">{profile.references}</p>
          </section>
        </div>
      </div>

      {/* Download PDF Button */}
      <div className="max-w-3xl mx-auto mt-6">
        <button
          onClick={downloadPDF}
          className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
}