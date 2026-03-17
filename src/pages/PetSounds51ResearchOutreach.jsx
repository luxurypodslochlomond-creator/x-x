import React, { useState } from 'react';
import { Mail, Copy, ExternalLink, Brain, Heart, Globe } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function PetSounds51ResearchOutreach() {
  const [copied, setCopied] = useState(null);

  const contacts = [
    {
      name: "Dr. Amy Bowman",
      institution: "University of Glasgow",
      research: "Dog stress & music therapy (2017 study, 135+ citations)",
      email: "a.bowman@gla.ac.uk",
      role: "Lead Researcher - Animal Welfare",
      relevance: "Cortisol reduction in kenneled dogs via music — exact match for PetSounds51 separation anxiety protocol",
      notes: "Published in Applied Animal Behaviour Science. Scottish SPCA collaboration."
    },
    {
      name: "Dr. Margaret Gruen / Natasha Olby",
      institution: "University of Edinburgh / NC State",
      research: "Canine cognitive dysfunction & dementia (2023+)",
      email: "Contact via vet.ed.ac.uk research portal",
      role: "Cognitive Decline Researchers",
      relevance: "40Hz gamma therapy for cognitive decline — validates our Edinburgh protocol",
      notes: "Defining diagnostic criteria for canine dementia. Active clinical research."
    },
    {
      name: "iCalmPet Research Team",
      institution: "iCalmDog (partner collaborators)",
      research: "Proprietary RCT on reactive behavior (68% reduction)",
      email: "partnerships@icalmpet.com",
      role: "Commercial Research Partner",
      relevance: "200+ vet endorsements. Direct competitor but potential joint validation study",
      notes: "Already proven market. Could co-validate or co-develop."
    }
  ];

  const emailTemplate = `Subject: Partnership: PetSounds51 Animal Welfare Platform + Your Research

Dear [RESEARCHER NAME],

We're building PetSounds51 — a science-backed sound therapy platform for animal anxiety, pain & cognitive wellness. Your 2017 study on classical music reducing cortisol in kenneled dogs is foundational to our work.

We're currently helping [X] animals using your published findings, and we'd like to explore partnership:

**What we offer:**
- Real-world validation data from our user base
- Co-authored research outcomes
- Citation & academic partnership credit
- Potential grant collaboration (we're CIC + seeking £100k+ funding)

**What we're asking:**
- 15-min call to explore: data sharing, outcome measurement, or co-developed protocols
- Feedback on our approach to ensure scientific integrity
- Potential co-authorship on results paper

Our platform validates your work at scale. We think you'd want to see it succeed.

Would you be open to a brief chat?

Best,
[YOUR NAME]
PetSounds51 — Universal Frequency 51
uf51.love`;

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-black">Research Partnerships</h1>
          </div>
          <p className="text-lg text-gray-400">Academic validation for PetSounds51 — reaching out to the scientists who proved this works.</p>
        </div>

        {/* KEY CONTACTS */}
        <div className="space-y-6 mb-12">
          {contacts.map((contact, idx) => (
            <div key={idx} className="rounded-xl border border-purple-500/30 bg-purple-900/10 p-6 hover:border-purple-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-black text-purple-200">{contact.name}</h3>
                  <p className="text-sm text-gray-400">{contact.institution}</p>
                </div>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-xs font-bold text-purple-300">
                  {contact.role}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Research Focus</p>
                  <p className="text-white">{contact.research}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Why They Matter</p>
                  <p className="text-green-300">{contact.relevance}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Notes</p>
                  <p className="text-gray-300">{contact.notes}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1 sm:mt-0" />
                <code className="text-sm font-mono text-purple-300 flex-1 break-all">{contact.email}</code>
                <button
                  onClick={() => copyToClipboard(contact.email, `email-${idx}`)}
                  className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/40 rounded text-xs font-bold text-purple-300 transition-colors whitespace-nowrap"
                >
                  {copied === `email-${idx}` ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMAIL TEMPLATE */}
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-900/10 p-6 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-black text-cyan-200">Email Template</h2>
          </div>

          <div className="bg-black/40 rounded-lg p-4 mb-4 border border-cyan-500/20 max-h-96 overflow-y-auto">
            <pre className="text-sm text-cyan-100 font-mono whitespace-pre-wrap break-words">
              {emailTemplate}
            </pre>
          </div>

          <button
            onClick={() => copyToClipboard(emailTemplate, 'template')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/50 rounded-lg text-cyan-300 font-bold transition-colors"
          >
            <Copy className="w-4 h-4" />
            {copied === 'template' ? 'Copied to clipboard!' : 'Copy Full Email'}
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Customize with your name, platform stats, and grant timeline. Keep it under 200 words.
          </p>
        </div>

        {/* STRATEGY */}
        <div className="rounded-xl border border-pink-500/30 bg-pink-900/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-pink-400" />
            <h2 className="text-2xl font-black text-pink-200">Outreach Strategy</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-pink-300 mb-2">Phase 1: Reach Out (This Week)</h3>
              <ul className="text-sm text-gray-300 space-y-1 ml-4">
                <li>✓ Email Amy Bowman (Glasgow) — most cited, most accessible</li>
                <li>✓ Email iCalmPet partnerships — proven market validation</li>
                <li>✓ Schedule 15-min exploratory calls</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-pink-300 mb-2">Phase 2: Propose (Month 1)</h3>
              <ul className="text-sm text-gray-300 space-y-1 ml-4">
                <li>✓ Data sharing agreement (anonymized user outcomes)</li>
                <li>✓ Co-authored outcomes paper (6-month study)</li>
                <li>✓ Grant collaboration (mention £100k Creative Scotland funding)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-pink-300 mb-2">Phase 3: Activate (Month 2-6)</h3>
              <ul className="text-sm text-gray-300 space-y-1 ml-4">
                <li>✓ Joint protocol development (validate protocols with their expertise)</li>
                <li>✓ Co-market findings (press release, university news)</li>
                <li>✓ Enterprise: vets + shelters + university clinics as partners</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-pink-500/20">
              <p className="text-sm text-pink-200 italic">
                Why this works: You're not asking for money. You're offering them real-world validation data + publication opportunity + partnership credit. That's irresistible to academics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}