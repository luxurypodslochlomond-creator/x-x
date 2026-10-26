// Merrick's route, written plain. Fees and times are GOV.UK's, checked 26 October 2026.
// Official routes only. Nothing here is immigration advice.

export const WHERE = {
  answer: "Prague — not Ireland, not Iceland.",
  reasons: [
    "A visa is applied for in the country where he lives, not where he happens to be visiting. He lives in Czechia, so Prague is where the application is made and where his passport is handed in.",
    "Ireland and Iceland are both fine as trips. He'd be a visitor in each, and a visa centre will turn the application back.",
    "Ireland only ever mattered for the 3-month concession — walking in and getting a stamp. That door stays shut: the concession cannot be extended, so it would mean a second £55 certificate and a second trip to Prague.",
    "One trip, done properly, beats two.",
  ],
};

export const PLAN = [
  {
    who: "Brian · the CIC",
    when: "This week",
    title: "Open the gate",
    lines: [
      "Register for PAYE with HMRC. Free, online, usually days. Nothing works without it.",
      "File the sponsor licence on GOV.UK → UK visa sponsorship for employers. £611, plus £750 priority.",
      "On the form: licence type Temporary Worker · authorising officer you · a Level 1 User appointed · estimate 1 undefined certificate for the first year.",
      "If the form stalls, ring the Sponsorship and Employer Helpline on 0300 123 4699. Free.",
    ],
  },
  {
    who: "Brian · the CIC",
    when: "Mid-November",
    title: "Assign his certificate",
    lines: [
      "The licence lands — about 10 working days with priority.",
      "Assign his certificate the same day. £55.",
      "This is the fast bit: Creative Worker uses undefined certificates. There is no monthly panel and no Home Office approval — you assign it yourself, straight from your allocation.",
      "On the certificate: musician / performing artist · his real start date, not the day the licence arrived · tick “sponsor certifies maintenance”, which removes his £1,270 bank rule.",
    ],
  },
  {
    who: "Both of you",
    when: "Before he leaves",
    title: "Get the file in order",
    lines: [
      "Brian takes copies of: passport and its expiry date, his Czech address, residence proof, artistic CV and press, the agreed fee and the schedule.",
      "Merrick does nothing paid for the CIC while he is here as a visitor. Conversations only.",
      "His own channels and his overseas work carry on as normal.",
    ],
  },
  {
    who: "Merrick",
    when: "December",
    title: "Fly out, apply, fly back",
    lines: [
      "He leaves the UK on the date he has to. No overstay — that is what would end this plan.",
      "From Prague, he applies online for the Creative Worker visa: £340 + £1,035 health surcharge.",
      "He adds super priority: £1,000, decision the next working day. This is the whole trick — three weeks in Prague becomes two days.",
      "Biometrics at the visa centre in Prague, passport handed in.",
      "Decision, passport back, flight home — on 12 months, extendable in the UK to 24.",
    ],
  },
  {
    who: "Brian · the CIC",
    when: "Once he's back",
    title: "Keep it clean",
    lines: [
      "Report any change through the Home Office system, mostly within 10 working days.",
      "Keep his records — a compliance visit can come.",
      "Keep every trace of the engagement: contract, invoices, flyers, press. That pile is his Global Talent application in two years.",
    ],
  },
];

export const MONEY = [
  ["The CIC pays", "£611 licence + £750 priority + £55 certificate", "= £1,416"],
  ["Merrick pays, fast", "£340 visa + £1,035 surcharge + £1,000 super priority", "= £2,375"],
  ["Merrick pays, slow", "the same without super priority", "= £1,375"],
  ["What the £1,000 buys", "about three weeks of his life back", "two or three days abroad instead of three"],
];

export const NO_TRICK =
  "There is no trick left off this page. No job title he does not do, no paid work before permission, no date stretched. Those are not shortcuts — they are how the licence and his future are lost.";