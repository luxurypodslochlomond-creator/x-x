// The road, as a document of record. Every fee, date and address here was checked
// against GOV.UK on 26 October 2026. Fees change each April, so it says so out loud.

export const ROAD_DOC = {
  brand: "UNIVERSAL FREQUENCY 51 CIC",
  title: "THE ROAD",
  subtitle: "FOR OUR FIRST WORKER",
  subject: "MERRICK STARR",
  role: "PERFORMER · CREATIVE ENGAGEMENT",
  version: "VERSION 1 · 26 OCTOBER 2026",
  cover_line: "The road is long. The file is ready.",
  made: "Made for Merrick Starr by Universal Frequency 51 CIC, Scotland.",
  sections: [
    {
      n: "01",
      title: "THE VERDICT",
      kicker: "Two doors. Both open. Whichever opens first, he walks through.",
      blocks: [
        { type: "para", text: "Merrick Starr comes to the United Kingdom as a performer, sponsored by Universal Frequency 51 CIC. There are two lawful roads and we walk both at once." },
        { type: "bullets", items: [
          "Door one, the Creative Worker visa. Fastest. The CIC holds a sponsor licence and assigns him a certificate. Twelve months, extendable to twenty four. No English test. No salary threshold. No Immigrations Skills Charge.",
          "Door two, Global Talent. Strongest. No sponsor, no licence, no job offer. The judgement is made by arts professionals rather than a Home Office caseworker. Up to five years, renewable without limit, and the road to citizenship.",
          "The play: file both. Whichever lands first he is lawfully here, and the switch to Global Talent can be made from inside the United Kingdom."
        ] },
        { type: "callout", label: "THE JOB TITLE, EXACTLY", text: "Performer · Creative Engagement. Occupation: musician, performing artist." }
      ]
    },
    {
      n: "02",
      title: "THE JOB TITLE",
      kicker: "Get this right and half the refusal risk disappears.",
      blocks: [
        { type: "para", text: "On the licence the type is Temporary Worker. On his certificate the role is written exactly as this:" },
        { type: "callout", label: "ON THE CERTIFICATE", text: "Performer · Creative Engagement · musician, performing artist · fixed term engagement with an end date." },
        { type: "bullets", items: [
          "A fixed term engagement with an end date. Never a permanent position: temporary work routes cannot fill one.",
          "A real fee, paid through PAYE, at the figure written on the certificate.",
          "Musicians have no Code of Practice, so his certificate must answer one further test: that he makes a unique contribution to creative life in the UK. Argue it with international standing in his field, a skill not commonly available here, continuity of a production, or membership of an established unit.",
          "Proof of that standing: press, releases, following, credits, live dates. All dated, all traced."
        ] },
        { type: "callout", label: "NEVER WRITE DIRECTOR", text: "It is not a creative occupation, the route cannot fill a permanent post, and the visa itself bars him from running a business. An invented role is the most common reason certificates and licences are refused." }
      ]
    },
    {
      n: "03",
      title: "THE MONEY",
      kicker: "Every penny, checked on 26 October 2026.",
      blocks: [
        { type: "para", text: "What the CIC pays. It must be the CIC's own money: if the worker pays the licence or certificate fee, the licence can be revoked." },
        { type: "table", head: ["ITEM", "£"], widths: [0.82, 0.18], rows: [
          ["Temporary Worker sponsor licence", "611"],
          ["Priority decision, within 10 working days", "750"],
          ["Certificate of Sponsorship, Temporary Worker", "55"],
          ["CIC TOTAL", "1,416"]
        ] },
        { type: "para", text: "What Merrick pays." },
        { type: "table", head: ["ITEM", "£"], widths: [0.82, 0.18], rows: [
          ["Creative Worker visa application", "340"],
          ["Immigration Health Surcharge, per year", "1,035"],
          ["Super priority, decision by end of next working day", "1,000"],
          ["MERRICK TOTAL", "2,375"]
        ] },
        { type: "callout", label: "BOTH TOGETHER, FASTEST", text: "£3,791 and he is here in weeks. Skip super priority and it is £2,791 with about three weeks to wait. Take priority instead of super priority and it is £3,291 with about five working days to wait." },
        { type: "para", text: "And the other door, for comparison. Global Talent costs £766 in Government fees: £561 at endorsement and £205 at the visa, plus £1,035 per year of health surcharge. Three years all in is £3,871, and with it he may be employed, self employed and a director, and change his work without telling anyone." },
        { type: "note", text: "No Immigration Skills Charge on the Creative Worker route. Each later certificate is another £55. Fees change every April. Check before paying." }
      ]
    },
    {
      n: "04",
      title: "THE DATES",
      kicker: "Who does what, and when. Nothing chased from the wrong end.",
      blocks: [
        { type: "table", head: ["WHEN", "WHAT", "WHO"], widths: [0.16, 0.62, 0.22], rows: [
          ["This week", "The CIC registers for PAYE with HMRC. A few days, no fee. Payroll must exist before he works.", "CIC"],
          ["This week", "File the sponsor licence and pay the £750 priority service, a decision within ten working days. Ask for two certificates so the extension is already there.", "CIC"],
          ["Licence issued", "Assign his certificate the same day. Its start date is his real start date.", "CIC"],
          ["Before he flies", "Every document in the file, complete. Nothing chased from Scotland while he is abroad.", "Both"],
          ["December", "He leaves the United Kingdom on or before the date he was given, and applies in Prague, the country where he actually lives.", "Merrick"],
          ["Prague", "Apply online, pay, upload, give biometrics. Super priority brings a decision by the end of the next working day.", "Merrick"],
          ["Return", "He may enter up to fourteen days before the start date on his certificate. Answer the border plainly: performer, sponsored by Universal Frequency 51 CIC. Carry the certificate and the contract on paper.", "Merrick"],
          ["12 months", "Extend to twenty four months, or switch to Global Talent, applied for before his leave expires.", "Both"]
        ] },
        { type: "note", text: "There is no stamp in his passport. His permission is an eVisa, held online in his UKVI account, and a share code is how he proves it. Never overstay: it costs the extension, the licence, and his good character for citizenship." }
      ]
    },
    {
      n: "05",
      title: "THE CONTACTS",
      kicker: "The people to ring, the addresses to use, and who answers what.",
      blocks: [
        { type: "table", head: ["WHO", "FOR", "HOW"], widths: [0.26, 0.30, 0.44], rows: [
          ["Sponsorship, employer and education helpline", "Licences, certificates, reporting", "0300 123 4699 · Monday to Friday, 9am to 4pm"],
          ["Business Helpdesk", "Licence fees, sponsor size questions", "businesshelpdesk@homeoffice.gov.uk"],
          ["Sponsor Management System", "Assigning certificates, reporting changes", "Login comes with the licence"],
          ["Visa application centre, Prague", "Biometrics, passport", "VFS Global, International Business Center, Praha 8 · visa.vfsglobal.com/gbr/en/cze"],
          ["Arts Council England", "Global Talent endorsement format questions", "artscouncil.org.uk/quality-work/global-talent-visa · nothing is sent to them directly"],
          ["Regulated immigration adviser", "Signing off the file before it is filed", "gov.uk/find-an-immigration-adviser · OISC registered only"],
          ["Citizens Advice Scotland", "Free, independent advice", "citizensadvice.org.uk/scotland"]
        ] },
        { type: "note", text: "Filing pages: gov.uk/uk-visa-sponsorship-employers/apply-for-your-licence · gov.uk/creative-worker-visa · gov.uk/global-talent-arts-culture · gov.uk/faster-decision-visa-settlement. Confirm the Prague centre's address and opening hours on its own site before travelling: centres move." }
      ]
    },
    {
      n: "06",
      title: "GLOBAL TALENT",
      kicker: "The door the Home Office barely has to decide.",
      blocks: [
        { type: "para", text: "Refusal risk lives in one decision per route. On Global Talent that decision belongs to Arts Council England, whose assessors judge whether he is a leader, or a future leader, in his specialist area of practice. Their endorsement goes back to UKVI and the visa stage is administration. He needs no sponsor, no licence, no job offer, no salary level and no English test. With that visa he may be an employee, self employed and a director of a company, and he may change or stop work without telling the Home Office." },
        { type: "bullets", items: [
          "Fees: £766 in total, split £561 at endorsement and £205 at the visa, plus £1,035 per year of health surcharge.",
          "Length: he chooses, up to five years, and may renew as many times as he likes.",
          "Settlement after three years as exceptional talent, or five years as exceptional promise. Citizenship twelve months after settlement."
        ] },
        { type: "para", text: "What Arts Council England asks for." },
        { type: "bullets", items: [
          "An artistic CV or résumé, showing a professional track record.",
          "Three letters of support: dated, written for this application, signed, each with the author's credentials and contact details, and at least one from a United Kingdom organisation working in his field.",
          "Up to ten pieces of evidence, each its own document, none longer than two pages, from the last five years: media recognition, awards, and proof of appearances.",
          "The minimum acceptable shape: CV, three letters, two pieces of media recognition, two proofs of appearances.",
          "Every document not in English needs a certified translation showing the translator's name, contact details, signature and company stamp. Browser translation is refused.",
          "Every link must open. Reviews and listings need a screenshot and a working address. Paywalled articles need the full screenshot."
        ] },
        { type: "callout", label: "THE PRIZE SHORTCUT", text: "If he holds a prize on the Government's eligible prize list, he needs no endorsement at all and pays the £766 once, at the visa stage. Check that list before anything else is filed." },
        { type: "para", text: "The strongest possible letter set is two independent United Kingdom voices plus one international heavyweight. The CIC is a United Kingdom organisation working in his field, and a documented engagement between them, on contract, with the fee paid through the CIC and the work evidenced in date, becomes a working relationship rather than a favour." },
        { type: "note", text: "Endorsement takes up to eight weeks and there is no fast track. If it is refused, the £205 visa fee was never at risk and a review exists." }
      ]
    },
    {
      n: "07",
      title: "THE DUTIES",
      kicker: "For the CIC once he is here, and the lines he cannot cross.",
      blocks: [
        { type: "para", text: "The CIC, before and while he is sponsored." },
        { type: "bullets", items: [
          "A right to work check before his first day, done online, with the record kept.",
          "Keep his contact details, address, passport copy, role and pay.",
          "Report through the Sponsor Management System within ten working days if he does not turn up for his first day, stops coming, moves, or his role or pay changes. Changes to the CIC itself: twenty working days.",
          "Pay him through PAYE at the rate on the certificate. Nothing off the books, ever.",
          "Keep records through the sponsorship and for a year after it ends.",
          "A compliance visit can come unannounced at any time. If the licence is revoked, he must leave."
        ] },
        { type: "para", text: "Merrick, while the Creative Worker visa is his permission." },
        { type: "bullets", items: [
          "Work the sponsored role for the CIC. That is the job.",
          "A second job in the same sector at the same level, up to twenty hours a week.",
          "No self employment, no running his own business, no public funds. So his own gigs earn through the CIC for now. That is a condition, not a preference.",
          "Travel abroad and return inside the visa. Short trips, kept clean."
        ] }
      ]
    },
    {
      n: "08",
      title: "THE SIX THINGS",
      kicker: "Do all six and this is as near certain as the law allows.",
      blocks: [
        { type: "numbered", items: [
          "A role the CIC genuinely needs and can show. It is the single most common reason for refusal.",
          "PAYE registered before the licence is filed.",
          "Every document ready before he leaves the United Kingdom.",
          "The right licence type and the right occupation on the certificate.",
          "He leaves on time and never overstays.",
          "Everything on the form is true. An honest file that fails still leaves a road; a false one that wins takes the licence back."
        ] },
        { type: "para", text: "And the traps, named so nobody walks into them." },
        { type: "bullets", items: [
          "The three month concession cannot be extended. It is a one off, and it leads in a circle.",
          "Ireland and Iceland are not countries he lives in. Applying there ends in refusal.",
          "Youth Mobility is not open to Czech citizens. Cross it off.",
          "Non creative job titles, including director, invite refusal and put the licence at risk.",
          "There is no joint citizenship. Each person qualifies alone.",
          "The standard settlement wait is being pushed from five years to ten. Final rules are still coming. Global Talent is the route being expanded, which is why it is the target."
        ] }
      ]
    }
  ],
  signoff: {
    title: "SIGNED INTO THE RECORD",
    text: "This record was made on 26 October 2026 for Universal Frequency 51 CIC and for Merrick Starr, the first person it sponsors. Every figure, date and address in it was checked against GOV.UK on that day. It is a record of a route and not legal advice, and it is kept for the two people named below.",
    lines: ["For Universal Frequency 51 CIC · Brian Hughes", "The artist · Merrick Starr", "Date"]
  }
};