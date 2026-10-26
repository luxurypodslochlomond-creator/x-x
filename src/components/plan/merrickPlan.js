// The plan for Merrick — written for the two of them to read together.
// Fees and times are GOV.UK's, checked 26 October 2026. Not immigration advice.

export const WHERE = {
  answer: "Prague. Not Ireland, not Iceland.",
  reasons: [
    "A visa is applied for in the country where he lives, not where he happens to be visiting. He lives in Czechia, so Prague is where he applies and where his passport goes in.",
    "Ireland and Iceland are both fine as trips. He'd be a visitor in each, and a visa centre there would turn the application back.",
    "Ireland only mattered for the 3-month concession — walking in and getting a stamp. That door is shut: it can't be extended, so it would mean a second £55 certificate and a second trip to Prague.",
    "One trip, done properly, beats two.",
  ],
};

export const PLAN = [
  {
    who: "Brian — this week",
    title: "Open the door",
    lines: [
      "Register the CIC for PAYE with HMRC. Free, online, a few days.",
      "File the sponsor licence on GOV.UK. £611, plus £750 to have it decided in about 10 working days instead of 8 weeks.",
      "On the form: Temporary Worker licence · you as authorising officer · a Level 1 User · ask for 1 certificate for the first year.",
      "Stuck on the form? Ring the Sponsorship and Employer Helpline on 0300 123 4699. Free.",
    ],
  },
  {
    who: "Brian — mid-November",
    title: "His certificate",
    lines: [
      "The licence comes back. Assign his certificate the same day. £55.",
      "This is the fast bit: no monthly panel, no Home Office approval — you assign it yourself, straight from your allocation.",
      "On the certificate: musician / performing artist · his real start date, not the day the licence arrived · tick “sponsor certifies maintenance”, so he needs no £1,270 saved.",
    ],
  },
  {
    who: "Both of you — before he leaves",
    title: "Get the paperwork ready",
    lines: [
      "Brian takes copies of: his passport and its expiry date, his Czech address, proof he lives there, his CV and press, the agreed fee, the dates.",
      "Merrick: no paid work for the CIC while he is here as a visitor. Talking only.",
      "His own channels, and work he does abroad, carry on as normal.",
    ],
  },
  {
    who: "Merrick — December",
    title: "Out, apply, back",
    lines: [
      "Fly to Prague on the date he has to leave. Do not overstay — that is what would end the plan.",
      "Apply online for the Creative Worker visa: £340 + £1,035 health surcharge.",
      "Add super priority: £1,000, decision the next working day. This is the trick — three weeks in Prague becomes two days.",
      "Biometrics at the visa centre in Prague. Passport handed in.",
      "Decision, passport back, flight home — on 12 months, extendable in the UK to 24.",
    ],
  },
  {
    who: "Brian — once he's back",
    title: "Keep it tidy",
    lines: [
      "Report any change through the Home Office system, mostly within 10 working days.",
      "Keep his records — a compliance visit can come.",
      "Keep every trace of the engagement: contract, invoices, flyers, press. That pile is his Global Talent case in two years.",
    ],
  },
];

export const MONEY = [
  ["The CIC pays", "£611 licence + £750 priority + £55 certificate", "£1,416"],
  ["Merrick pays, fast", "£340 visa + £1,035 surcharge + £1,000 super priority", "£2,375"],
  ["Merrick pays, slow", "the same, without super priority", "£1,375"],
  ["What the £1,000 buys", "two or three days abroad instead of three weeks", "about 3 weeks of his life"],
];

export const HONEST = {
  lead: "Can anyone promise this 100%? No. A person at the Home Office decides, not me and not you. What can be done is make the file impossible to turn down.",
  items: [
    "A role the CIC genuinely needs. That is the single biggest reason licences are refused.",
    "PAYE registered before the licence is filed.",
    "Every document in the file before he leaves — not chased from Scotland while he is in Prague.",
    "The right licence type and the right occupation on the certificate.",
    "He leaves on time. An overstay loses the licence, the visa, and any Global Talent case after it.",
    "Everything on the form is true. An honest file that gets refused still leaves a way forward; a false one that wins takes the licence back.",
  ],
  close: "Do all six and this is as close to certain as the law allows. Skip one and it is a coin toss.",
  note: "Official routes only. Not immigration advice — a regulated adviser signs the filing with the passport in front of them.",
};