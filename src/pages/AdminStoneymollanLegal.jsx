import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, CheckCircle, Clock, Users, Link2, MapPin, Briefcase } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function AdminStoneymollanLegal() {
  const { data: legalDocs = [], isLoading } = useQuery({
    queryKey: ['stoneymollanLegal'],
    queryFn: () => base44.entities.GlasgowGarageLegal.filter({ title: { $regex: 'Stoneymollan' } })
  });

  const [caseStatus, setCaseStatus] = useState({
    property: 'Barn at Upper Stoneymollan, Loch Lomond',
    claimType: 'Prescriptive Possession',
    currentSolicitor: 'Lynn Pacitti',
    status: 'REASSIGNMENT_NEEDED',
    dateOpened: '2026-04-16',
    
    // Key facts
    keyIssues: [
      {
        id: 1,
        title: 'Land Owner Tracing',
        description: 'Must trace current registered owner at Land Register of Scotland',
        status: 'pending',
        priority: 'critical'
      },
      {
        id: 2,
        title: 'KLTR Procedure',
        description: 'If owner cannot be traced, Keeper of Land Register must sign transfer deed (lengthy process)',
        status: 'pending',
        priority: 'critical'
      },
      {
        id: 3,
        title: 'Timescale',
        description: 'Process is lengthy and complex - not straightforward application',
        status: 'pending',
        priority: 'high'
      }
    ],

    // Communications
    communications: [
      {
        date: '2026-04-16',
        from: 'Gillian & Brian',
        to: 'Lynn Pacitti',
        type: 'email',
        subject: 'Prescriptive Possession Application / Barn at Upper Stoneymollan',
        status: 'inbox',
        summary: 'Request for legal advice on prescriptive possession claim for barn. Asking: Can you assist? What\'s the cost? What\'s the strength of our position?',
        key_quote: 'The barn has been in continuous use by the occupiers of Upper Stoneymollan for approximately 28+ years — the previous owner used it for around 24 years, and we have been using it since February 2022.',
        details: [
          '✓ Barn NOT in registered title boundary (Scots Land Register)',
          '✓ Cameron Estate owns adjacent field but NO specific deed for barn',
          '✓ 28+ years continuous use (exceeds 10-year Scots law threshold) — previous owner 24yrs + Brian/Gill from Feb 2022',
          '✓ Felling application went quiet (water rights/access leverage)',
          '✓ Full water servitude + only road access to barn'
        ]
      },
      {
        date: '2026-04-16',
        from: 'Lynn Pacitti',
        type: 'email',
        subject: 'RE: Prescriptive Possession Application / Barn at Upper Stoneymollan',
        status: 'inbox',
        summary: 'Case not straightforward. Lynn overcommitted. Recommends alternative solicitor. KLTR procedure required if owner untraceable.',
        key_quote: 'The process is quite lengthy and not the most straightforward and, at this time, is not something I am able to take on due to my current work commitments.'
      }
    ],

    // Next steps
    nextSteps: [
      {
        step: 1,
        action: 'Find Alternative Solicitor',
        description: 'Lynn recommends another solicitor who can assist with prescriptive possession + KLTR procedure',
        owner: 'Gill51',
        status: 'todo',
        dueDate: null
      },
      {
        step: 2,
        action: 'Land Register Search',
        description: 'Request current owner information from Land Register of Scotland (KLTR)',
        owner: 'New Solicitor',
        status: 'todo',
        dueDate: null
      },
      {
        step: 3,
        action: 'Ownership Tracing',
        description: 'If owner found, attempt to contact and negotiate. If untraceable, proceed with KLTR formal procedure.',
        owner: 'New Solicitor',
        status: 'todo',
        dueDate: null
      },
      {
        step: 4,
        action: 'KLTR Deed Signature',
        description: 'Keeper of Land Register signs transfer deed (only if owner untraceable)',
        owner: 'KLTR',
        status: 'todo',
        dueDate: null
      }
    ],

    // Key people
    keyPeople: [
      {
        name: 'E C Henderson',
        org: 'Hendersons Chartered Surveyors',
        address: 'East Netherton, Milnathort',
        role: 'Former Chartered Surveyor — NO LONGER INVOLVED',
        notes: 'Eddie filed the original objections that sent the felling application quiet. But after the last email setting out what we needed, Alice went quiet and Eddie phoned to say they\'re too busy to take it further. PAID IN FULL: £786 on 28 March 2026. Chapter closed — move forward without them.',
        status: 'TOO BUSY — CLOSED',
        color: 'amber'
      },
      {
        name: 'Scottish Woodlands',
        org: 'Acting for Cameron Estate',
        role: 'Opposing Party — Felling Application',
        notes: 'Applied to Forest and Land Scotland to fell trees at Cameron Home Farm Wood. Proposed extraction routes would have crossed Brian & Gill\'s access. Application has gone quiet — Henderson\'s objection appears to have worked.',
        status: 'QUIET — WATCHING',
        color: 'amber'
      },
      {
        name: 'Cameron Estate / Cameron Home Farm',
        org: 'Adjacent landowner',
        role: 'Field owner — NO deed for barn',
        notes: 'Own the adjacent field. Do NOT hold a specific registered deed for the barn itself. This is the critical gap that supports the prescriptive possession claim.',
        status: 'NO BARN DEED',
        color: 'red'
      },
      {
        name: 'Alistair (Land Agent)',
        org: 'Independent Land Agent — came to the property 01 Sep 2026',
        role: 'NEW ADVISOR — sees the woodland issue clearly',
        notes: 'Came today. Could see exactly what\'s going on with the Auchendennan Muir woodland creation. Willing to help and advise. His advice: go straight to Barry Harper (Scottish Woodlands) yourself — not through him — to keep costs down. For the prescriptive possession (barn), you still need a lawyer. He\'s a practical ally, not a solicitor.',
        status: 'NEW — WILL ADVISE',
        color: 'green'
      },
      {
        name: 'Lynn Pacitti',
        org: 'Solicitor',
        role: 'First solicitor approached re: prescriptive possession',
        notes: 'Confirmed the prescriptive possession route is valid but said she is too overcommitted to take it on. Recommended finding another solicitor. NOT negative about the claim itself.',
        status: 'DECLINED — FIND ANOTHER',
        color: 'amber'
      }
    ],

    // References
    references: [
      {
        title: 'Land Register of Scotland - KLTR',
        url: 'https://www.kltr.gov.uk/',
        description: 'Official keeper of Scottish land records'
      },
      {
        title: 'Law Society of Scotland - Find a Solicitor',
        url: 'https://www.lawscot.org.uk/',
        description: 'Locate solicitor experienced in conveyancing & prescriptive possession'
      }
    ]
  });

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'border-red-500 bg-red-900/20';
      case 'high': return 'border-amber-500 bg-amber-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-900/20';
      default: return 'border-blue-500 bg-blue-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'todo': return <Clock className="w-4 h-4 text-amber-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-400" />;
      case 'done': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'inbox': return <FileText className="w-4 h-4 text-cyan-400" />;
      default: return <AlertCircle className="w-4 h-4 text-white/40" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-20">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-4 border-cyan-500 bg-black/80 p-6"
        >
          <h1 className="text-3xl font-black font-mono text-cyan-400 mb-2">STONEYMOLLAN LEGAL</h1>
          <p className="text-white/60 font-mono text-sm">Barn at Upper Stoneymollan — Prescriptive Possession Case</p>
        </motion.div>

        {/* WHAT'S SAVED BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-2 border-green-500/50 bg-green-900/10 p-4 rounded-lg"
        >
          <h3 className="font-black text-green-400 mb-2 text-sm font-mono">✅ SAVED & SAFE IN THIS HUB</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-white/70">
            <span>✓ Scots Land Register title boundary (purchased 15 May 1998 — £145,500)</span>
            <span>✓ Barn sits outside/at edge of registered red line boundary</span>
            <span>✓ 28+ years combined use — former owner 24yrs + Brian/Gill from Feb 2022</span>
            <span>✓ Cameron Estate — NO deed for barn specifically</span>
            <span>✓ Eddie Henderson (Hendersons Surveyors, Milnathort) — PAID £786</span>
            <span>✓ Felling application (Scottish Woodlands) — went quiet after Henderson</span>
            <span>✓ Water servitude rights + sole road access to barn</span>
            <span>✓ Email to Lynn Pacitti + her response on file</span>
          </div>
        </motion.div>

        {/* PROPERTY + STATUS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Card className="bg-black/60 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-white font-mono font-bold">{caseStatus.property}</p>
              <p className="text-white/50 text-sm">Claim: {caseStatus.claimType}</p>
              <p className="text-white/50 text-sm">Opened: {caseStatus.dateOpened}</p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white font-mono font-bold text-lg">REASSIGNMENT NEEDED</p>
              <p className="text-red-300 text-xs mt-2">Lynn Pacitti cannot proceed — overcommitted</p>
              <p className="text-white/60 text-xs mt-1">Need solicitor experienced in prescriptive possession + KLTR procedure</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* KEY ISSUES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            Key Legal Issues
          </h2>
          <div className="space-y-3">
            {caseStatus.keyIssues.map((issue, idx) => (
              <div key={issue.id} className={`border-2 p-4 rounded-lg ${getPriorityColor(issue.priority)}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-black text-white">{issue.title}</h3>
                  {getStatusIcon(issue.status)}
                </div>
                <p className="text-white/80 text-sm">{issue.description}</p>
                <p className="text-white/40 text-xs mt-2">Priority: {issue.priority.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* COMMUNICATIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Communications
          </h2>
          <div className="space-y-3">
            {caseStatus.communications.map((comm, idx) => (
              <Card key={idx} className="bg-black/60 border-cyan-500/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-base">{comm.subject}</CardTitle>
                      <p className="text-white/50 text-xs mt-1">{comm.from} {comm.to ? `→ ${comm.to}` : ''} • {comm.date}</p>
                    </div>
                    {getStatusIcon(comm.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-white/80 text-sm">{comm.summary}</p>
                  <div className="bg-black/40 border border-white/10 p-3 rounded">
                    <p className="text-white/70 text-xs italic">"{comm.key_quote}"</p>
                  </div>
                  {comm.details && (
                    <div className="bg-green-900/20 border-l-4 border-green-500 p-3 rounded text-white/80 text-xs space-y-1">
                      {comm.details.map((detail, i) => (
                        <p key={i}>{detail}</p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* KEY PEOPLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            Key People & Parties
          </h2>
          <div className="space-y-3">
            {caseStatus.keyPeople.map((person, idx) => {
              const borderColor = person.color === 'green' ? 'border-green-500/50 bg-green-900/10' : person.color === 'red' ? 'border-red-500/50 bg-red-900/10' : 'border-amber-500/50 bg-amber-900/10';
              const badgeColor = person.color === 'green' ? 'text-green-400 bg-green-900/30' : person.color === 'red' ? 'text-red-400 bg-red-900/30' : 'text-amber-400 bg-amber-900/30';
              return (
                <div key={idx} className={`border-2 p-4 rounded-lg ${borderColor}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-black text-white">{person.name}</h3>
                      <p className="text-white/50 text-xs">{person.org}{person.address ? ` — ${person.address}` : ''}</p>
                      <p className="text-white/60 text-xs italic mt-0.5">{person.role}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded font-mono ${badgeColor}`}>{person.status}</span>
                  </div>
                  <p className="text-white/80 text-sm mt-2">{person.notes}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* NEXT STEPS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Action Plan
          </h2>
          <div className="space-y-3">
            {caseStatus.nextSteps.map((step, idx) => (
              <div key={idx} className="border-2 border-green-500/40 bg-green-900/10 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-black text-sm">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-white">{step.action}</h3>
                    <p className="text-white/80 text-sm mt-1">{step.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
                      <span>Owner: {step.owner}</span>
                      <span>Status: {step.status.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* LEGAL RESEARCH (from GlasgowGarageLegal entity) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amber-400" />
            Research & Evidence
          </h2>
          {isLoading ? (
            <p className="text-white/60">Loading research...</p>
          ) : legalDocs.length > 0 ? (
            <div className="space-y-3">
              {legalDocs.map((doc, idx) => (
                <Card key={idx} className="bg-black/60 border-amber-500/20">
                  <CardHeader>
                    <CardTitle className="text-amber-400 text-base">{doc.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-white/60 text-xs font-bold mb-1">KEY POINTS:</p>
                      <p className="text-white/80 text-sm">{doc.key_legal_points}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-bold mb-1">DETAILS:</p>
                      <p className="text-white/80 text-sm">{doc.detailed_notes}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50 pt-2 border-t border-white/10">
                      <span>Parties: {doc.parties_involved}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-white/60">No research documents found.</p>
          )}
        </motion.div>

        {/* REFERENCES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-blue-400" />
            References & Resources
          </h2>
          <div className="space-y-2">
            {caseStatus.references.map((ref, idx) => (
              <a 
                key={idx}
                href={ref.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block border border-blue-500/30 hover:border-blue-500/60 bg-black/40 p-3 rounded transition-all"
              >
                <p className="text-blue-400 font-mono text-sm">{ref.title}</p>
                <p className="text-white/60 text-xs mt-1">{ref.description}</p>
              </a>
            ))}
          </div>
        </motion.div>

        {/* WHAT TO DO NOW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="border-4 border-green-500 bg-green-900/20 p-6 rounded-lg"
        >
          <h2 className="text-2xl font-black text-green-400 mb-4">🎯 WHAT TO DO NOW — Updated 01 Sep 2026</h2>
          <div className="space-y-4">
            <div className="border-2 border-green-400 bg-black/40 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-black text-green-400 font-mono">1</span>
                <h3 className="font-black text-white text-lg">WOODLAND: GO STRAIGHT TO BARRY HARPER</h3>
              </div>
              <p className="text-white/80 text-sm mb-2">Alistair (land agent, came today) can see exactly what\'s going on. His advice: <span className="text-green-300 font-bold">contact Barry Harper at Scottish Woodlands directly</span> — not through a surveyor — to keep costs down. You don\'t need Eddie for this. The five-pillar objection is already drafted and verified.</p>
              <div className="bg-green-900/30 border border-green-500/40 p-3 rounded text-xs text-white/70 space-y-1">
                <p>✓ Five-pillar objection is drafted, verified, ready (see Research below)</p>
                <p>✓ Cameron Home Farm has its own access — they don\'t need your road</p>
                <p>✓ Going direct to Barry Harper saves surveyor fees</p>
                <p>✓ Alistair will advise from the side if you need him</p>
              </div>
            </div>

            <div className="border border-amber-500/40 bg-amber-900/10 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl font-black text-amber-400 font-mono">2</span>
                <h3 className="font-black text-white">BARN: FIND A LAWYER FOR PRESCRIPTIVE POSSESSION</h3>
              </div>
              <p className="text-white/70 text-sm">The woodland issue and the barn are <span className="text-amber-300 font-bold">two separate matters</span>. The barn (prescriptive possession) still needs a solicitor experienced in KLTR procedure. Lynn Pacitti declined — ask Alistair or search Law Society of Scotland for a rural property solicitor.</p>
            </div>

            <div className="border border-amber-500/40 bg-amber-900/10 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl font-black text-amber-400 font-mono">3</span>
                <h3 className="font-black text-white">GET JOHN GILBERT AFFIDAVIT</h3>
              </div>
              <p className="text-white/70 text-sm">Previous owner John Gilbert used barn 24 years — put the roof on. A sworn affidavit from him confirming this is <span className="text-amber-300 font-bold">near-unassailable evidence</span>. This is for the barn case, not the woodland.</p>
            </div>

            <div className="border border-amber-500/40 bg-amber-900/10 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl font-black text-amber-400 font-mono">4</span>
                <h3 className="font-black text-white">GATHER MAINTENANCE EVIDENCE</h3>
              </div>
              <p className="text-white/70 text-sm">Receipts for door repair, roof maintenance, water work, any spend on the barn. Photos showing you use it. This shows proprietor-level possession — for the barn case.</p>
            </div>
          </div>
        </motion.div>

        {/* SMOKING GUN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="border-4 border-red-500 bg-red-900/20 p-5 rounded-lg"
        >
          <h3 className="font-black text-red-400 mb-3 text-lg">🔥 THE SMOKING GUN — Estate Manager's Admission</h3>
          <blockquote className="border-l-4 border-red-400 pl-4 text-white text-lg italic mb-3">
            "You know the barn technically isn't yours, don't you?"
          </blockquote>
          <p className="text-white/70 text-sm">— Cameron Estate Manager, spoken directly to Brian Hughes</p>
          <p className="text-red-300 text-sm mt-3 font-bold">This acknowledges the Estate was aware of Brian's use of the byre. They have never written, interdicted, or taken any legal action to stop that use in 28 years. Combined with 28+ years of use (former owner 24yrs + Brian/Gill from Feb 2022), maintenance investment, and sole road access — this case is extremely strong.</p>
        </motion.div>

        {/* NOTES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-2 border-amber-500/30 bg-amber-900/10 p-4 rounded-lg"
        >
          <h3 className="font-black text-amber-400 mb-2">⚠️ Important Notes</h3>
          <ul className="text-white/80 text-sm space-y-2">
            <li>• Prescriptive possession claims are complex and lengthy</li>
            <li>• KLTR (Keeper of Land Register) procedure required if owner untraceable</li>
            <li>• Lynn cannot proceed — must find solicitor with KLTR experience</li>
            <li>• Timeline unknown until new solicitor engaged</li>
            <li>• This case affects Stoneymollan community access & development</li>
          </ul>
        </motion.div>

      </div>
    </div>
  );
}