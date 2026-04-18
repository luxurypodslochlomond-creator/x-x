import React, { useState } from 'react';
// Note: this file has no currency symbols by design — globally accessible
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

const TOPICS = [
  {
    id: 'money',
    icon: '💰',
    title: 'Money & Budgeting',
    color: 'from-yellow-400 to-amber-500',
    border: 'border-yellow-400',
    bg: 'bg-yellow-50',
    intro: 'Money is just a tool. Once you understand it, it works for you — not against you.',
    sections: [
      {
        title: 'What is money, really?',
        body: `Money is just a way of swapping work for things. You do something useful → you get paid → you swap that for other useful things. That's it. No magic.

The problem is nobody teaches the rules — so most people end up stressed, in debt, or working their whole life without knowing why.`,
      },
      {
        title: 'The most important rule: spend less than you earn',
        body: `If you earn 100 and spend 90 → you keep 10. That 10 is your power.
If you earn 100 and spend 110 → you owe 10. That debt costs you more.

Sounds obvious. But most people never really apply it. The ones who do — they build freedom.`,
      },
      {
        title: 'Budgeting in 3 steps',
        body: `1️⃣ Write down everything coming IN (wages, benefits, anything)
2️⃣ Write down everything going OUT (rent, food, phone, subscriptions)
3️⃣ The difference is what you actually have. If it's negative — something has to change.

Start with just one week. Write it all down. Most people are shocked by what they find.`,
      },
      {
        title: 'Debt — the stuff nobody explains',
        body: `Debt is borrowing future money to use today. That costs you extra (interest).

Good debt: something that earns you back more than it costs (some education, a tool for work).
Bad debt: buying things you don't need that lose value immediately.

Credit cards are fine IF you pay the full balance every month. If you don't, you're paying 20-30% interest — which is crazy expensive.

Payday loans and buy-now-pay-later can trap people fast. Avoid them if you can.`,
      },
      {
        title: 'Saving — even tiny amounts change everything',
        body: `You don't need loads of money to start saving. Even putting aside 5 a week is 260 a year — that's an emergency fund starting to exist.

Emergency fund = 3 months of basic living costs saved. When something breaks or you lose work, you're not in crisis.

After that, saving for something specific makes spending feel purposeful rather than random.`,
      },
      {
        title: 'The scam to watch out for',
        body: `Ads are designed to make you feel like you NEED things to be happy. You don't.

Subscriptions add up fast. Most people have 3-5 they've forgotten about.
Sales make you spend money to "save" money. You only save if you were buying it anyway.
"Treat yourself" culture is worth questioning. Treats are fine. Using them as emotional coping can get expensive.

Ask before every non-essential purchase: do I need this, or am I just feeling something?`,
      },
    ],
  },
  {
    id: 'cooking',
    icon: '🍳',
    title: 'Cooking & Food',
    color: 'from-orange-400 to-red-500',
    border: 'border-orange-400',
    bg: 'bg-orange-50',
    intro: 'Knowing how to feed yourself well is one of the most powerful things you can do for your health, your wallet and your mood.',
    sections: [
      {
        title: 'Why cooking matters more than people think',
        body: `Takeaways and ready meals are 3-5x more expensive than cooking the same thing yourself.
They're often full of salt, sugar and processed fats — which affect your energy and mood.

Learning to cook basic meals is one of the best investments of time you can make. It saves money, feels good, and you know exactly what's in your food.`,
      },
      {
        title: '5 meals everyone should know',
        body: `🍳 Scrambled eggs — protein, fast, cheap, endlessly versatile
🍝 Pasta with sauce — carbs + whatever veg you have + tin of tomatoes
🥣 Porridge — the best cheap breakfast on the planet
🍲 Any one-pot soup — chop things, add stock, done
🌯 Rice + beans or lentils — complete protein, incredibly cheap, used across the whole world`,
      },
      {
        title: 'The basics of nutrition (simply)',
        body: `Your body needs:
🥩 Protein — for building and repairing (eggs, meat, fish, beans, lentils, tofu)
🍞 Carbs — for energy (rice, pasta, bread, oats, potato)
🥑 Fats — for brain and hormones (olive oil, nuts, avocado, fish)
🥦 Vitamins & minerals — from vegetables and fruit
💧 Water — most people are mildly dehydrated all the time

You don't need to be perfect. Just aim for most meals to have some protein, some veg, and not too much processed stuff.`,
      },
      {
        title: 'Eating well on a low budget',
        body: `Cheapest nutritious foods on the planet:
- Eggs, oats, rice, lentils, tinned beans, tinned tomatoes, frozen veg, bananas, bread

Frozen veg is just as nutritious as fresh — often more so, because it's frozen immediately after picking.

Batch cooking saves time and money. Cook a big pot once, eat it for 3 days.

Own-brand supermarket versions of basics (rice, pasta, oats, tinned goods) are almost always identical to branded ones.`,
      },
      {
        title: 'Food and your mood',
        body: `There's a real link between what you eat and how you feel. Ultra-processed food spikes your blood sugar and crashes it — leaving you tired and irritable.

Eating regularly (don't skip meals) keeps your brain working properly.
Protein in the morning helps with focus and reduces anxiety.
Caffeine is fine in moderation — but too much makes anxiety worse.
Alcohol depletes vitamins and wrecks sleep — both of which affect mental health.`,
      },
    ],
  },
  {
    id: 'mental',
    icon: '🧠',
    title: 'Mental Health',
    color: 'from-pink-400 to-purple-500',
    border: 'border-pink-400',
    bg: 'bg-pink-50',
    intro: 'Your mind is just as important as your body. Understanding it changes everything.',
    sections: [
      {
        title: 'What mental health actually means',
        body: `Mental health isn't just about being ill. It's about how you think, feel, cope and relate to others — every single day.

Everyone has mental health, just like everyone has physical health. It goes up and down. That's normal.

The goal isn't to be happy all the time — that's not real. The goal is to understand yourself well enough to keep going, even through hard times.`,
      },
      {
        title: 'Anxiety — what it is and what to do',
        body: `Anxiety is your brain's alarm system going off. It's designed to keep you safe. But sometimes it fires when there's no real danger.

Physical signs: racing heart, tight chest, short breath, stomach churning.
Thoughts: "something bad will happen", "I can't cope", "what if..."

What actually helps:
🌬️ Box breathing — breathe in 4 counts, hold 4, out 4, hold 4. Repeat 4 times.
🧘 Name what you're feeling — "I'm feeling anxious about X" — reduces its power
🚶 Move your body — even a short walk changes brain chemistry
📝 Write it down — gets it out of your head and into something you can look at`,
      },
      {
        title: 'Depression — recognising it',
        body: `Depression isn't just sadness. It's a heaviness that makes things that used to feel easy feel impossible.

Signs: low energy, losing interest in things you liked, sleeping too much or too little, feeling worthless, not caring about the future.

If this sounds like you — please tell someone. A doctor, a family member, anyone.
Depression is treatable. Most people get significantly better with the right help.

You're not weak. You're not broken. Your brain is struggling and it needs support.`,
      },
      {
        title: 'The basics that actually work',
        body: `These aren't magic cures — but the evidence is solid:

😴 Sleep — probably the single most powerful thing for mental health. 7-9 hours.
🏃 Exercise — 20 minutes a day has the same effect as antidepressants for mild-moderate depression.
🌿 Time outside — especially in green spaces. Sunlight regulates your whole system.
🤝 Connection — talking to people you trust. Even a short conversation helps.
📵 Less doom-scrolling — social media is designed to make you feel inadequate. Limit it.
🎵 Music, creativity, movement — things that absorb you and make time disappear.`,
      },
      {
        title: 'How to support someone else',
        body: `You don't need to fix them. You just need to show up.

✅ "I'm here" is enough.
✅ Listen without trying to solve.
✅ Don't say "just cheer up" or "others have it worse."
✅ Check in again later — not just once.
✅ If you're worried about their safety, don't leave them alone and get help.

Looking after someone else while struggling yourself is hard. You matter too. Ask for support yourself.`,
      },
    ],
  },
  {
    id: 'relationships',
    icon: '❤️',
    title: 'Relationships',
    color: 'from-red-400 to-rose-500',
    border: 'border-red-400',
    bg: 'bg-red-50',
    intro: 'How you relate to people shapes almost everything in your life. These skills can be learned.',
    sections: [
      {
        title: 'What makes a healthy relationship',
        body: `Whether it's friendship, family or romance — healthy relationships have the same foundations:

✅ Respect — you treat each other's feelings, time and opinions as worth something
✅ Trust — you do what you say, and they do the same
✅ Honesty — you can say hard things without fear
✅ Space — you both have your own lives, interests and time apart
✅ Equality — no one person always gets their way

Love is not enough on its own. Love without respect creates problems.`,
      },
      {
        title: 'Boundaries — what they are and why you need them',
        body: `A boundary is knowing what you're okay with and what you're not — and being able to say so.

"I'm not okay with being spoken to like that."
"I need some time to myself today."
"I don't want to do that."

These are not selfish. They are healthy.

People who don't respect your boundaries when you've stated them clearly are showing you something important about themselves.

You are allowed to say no. To anyone.`,
      },
      {
        title: 'Conflict — how to handle it without destroying things',
        body: `Conflict is normal. How you handle it is what matters.

What doesn't work: shouting, name-calling, bringing up old stuff, going silent for days, saying things you don't mean to hurt.

What does work:
🗣️ "I feel [X] when [Y]" — not "you always do [Z]"
⏸️ Taking a break if it's escalating — not storming off, just: "I need 20 minutes, then we can talk"
👂 Actually listening, not just waiting to speak
🤝 Looking for what you both actually need, not just who wins the argument`,
      },
      {
        title: 'Toxic patterns to recognise',
        body: `These are warning signs — in any relationship:

🚩 They make you feel small, stupid or worthless
🚩 You're walking on eggshells, always scared of their reaction
🚩 They isolate you from friends and family
🚩 They guilt-trip you when you have needs
🚩 Everything is your fault, they take no responsibility
🚩 They say sorry but nothing changes

These things get worse over time, not better. If this sounds familiar — talk to someone you trust.`,
      },
      {
        title: 'The relationship with yourself',
        body: `This is the one most people forget — but it underlies everything else.

How you talk to yourself matters. If you're constantly telling yourself you're not enough, you'll either push people away or accept being treated badly.

Practice noticing the voice in your head. Would you say that to someone you love? If not, question it.

You deserve kindness — from others, and from yourself. That's not arrogance. That's the foundation of every good relationship you'll ever have.`,
      },
    ],
  },
  {
    id: 'work',
    icon: '🎯',
    title: 'Work & Purpose',
    color: 'from-indigo-400 to-blue-500',
    border: 'border-indigo-400',
    bg: 'bg-indigo-50',
    intro: 'Work takes up a huge part of your life. Understanding how it works — and finding what drives you — changes everything.',
    sections: [
      {
        title: 'The difference between a job and purpose',
        body: `A job is what you do for money. Purpose is what makes you feel like your existence matters.

The lucky ones find overlap. But it's okay if they're separate — especially starting out.

The myth: "follow your passion and the money follows." The reality: passion often grows AFTER you get good at something. Start with what you're decent at and curious about.`,
      },
      {
        title: 'How to actually get a job',
        body: `📄 CV — keep it to 1-2 pages. Clear, honest, no fancy graphics. Start with the most recent experience first. Every job, even unpaid, teaches something.

✉️ Cover letter — not a summary of your CV. It's: "I want this specific job because [reason], and here's why I'd be useful to you."

🤝 Interviews — they're not testing if you're perfect. They're checking if you're honest, can communicate, and will actually turn up.

Tip: Research the company first. Ask one thoughtful question. Thank them at the end. Most people don't do these basic things.`,
      },
      {
        title: 'Your rights at work',
        body: `In the UK you are entitled to:
⏰ Minimum wage (varies by age — look up current rates)
📅 Holiday pay (28 days for full-time, including bank holidays)
🛡️ Protection from discrimination (race, gender, disability, religion, age etc.)
📜 A written contract or terms within 2 months of starting
🔒 Not to be dismissed unfairly after 2 years of service

If someone says "you don't have rights, you're self-employed" — check. Many people are misclassified. ACAS (acas.org.uk) gives free advice.`,
      },
      {
        title: 'Tax — how it works simply',
        body: `When you earn money, some of it goes to the government as tax. This funds schools, hospitals, roads, etc.

In the UK:
- The first chunk of your earnings each year is tax free (called a Personal Allowance — check gov.uk for current amount)
- Above that, you pay a basic rate (around 20%)
- Much higher earnings = higher rates

PAYE: if you're employed, tax is deducted automatically. You don't have to do anything.
Self-employed: you pay your own tax via Self Assessment. You MUST register with HMRC if you earn over a certain threshold from self-employment. Don't ignore this — check gov.uk for current figures.`,
      },
      {
        title: 'Finding what actually drives you',
        body: `Questions worth sitting with:

🤔 What would I do even if I wasn't paid?
🤔 When have I felt most alive and useful?
🤔 What problems in the world make me angry enough to want to fix them?
🤔 What do people often ask me for help with?

Purpose isn't always one big dramatic calling. Sometimes it's just: I'm good at making people feel heard. I'm good at building things. I love teaching kids. That's enough to build something real from.`,
      },
    ],
  },
  {
    id: 'rights',
    icon: '⚖️',
    title: 'Your Rights',
    color: 'from-teal-400 to-green-500',
    border: 'border-teal-400',
    bg: 'bg-teal-50',
    intro: 'Knowing your rights means nobody can take advantage of your not knowing them.',
    sections: [
      {
        title: 'Renting — what you need to know',
        body: `Your landlord MUST:
✅ Give you a written tenancy agreement
✅ Put your deposit in a government-protected scheme
✅ Fix serious problems (no heating, no hot water, structural damage)
✅ Give you proper notice before entering your home (usually 24 hours)
✅ Follow legal process to evict you — they cannot just change the locks

You have the right to live in a property that is safe and fit for humans. If your landlord won't fix it — contact your local council's housing department.`,
      },
      {
        title: 'Benefits — you deserve what you\'re entitled to',
        body: `Billions in benefits go unclaimed every year because people don't know they're eligible or feel ashamed to claim.

Common ones:
🏠 Universal Credit — for people on low income or out of work
👶 Child Benefit — for anyone with children
💊 Carer's Allowance — if you look after someone who is disabled or ill
🏥 Free prescriptions — if on certain benefits or low income
🦷 NHS dental care — free or reduced if on certain benefits

Use entitledto.co.uk or gov.uk/benefits to check what you may be owed. There's no shame in this. You paid into the system, or you have a genuine need.`,
      },
      {
        title: 'Consumer rights — when you buy something',
        body: `In the UK, anything you buy must be:
- As described
- Fit for purpose  
- Of satisfactory quality

If it isn't, you have the right to a refund, repair or replacement. Even without a receipt in many cases.

Online shopping: you have 14 days to return almost anything for any reason (Distance Selling Regulations).

If a company ignores your complaint: go to Citizens Advice, your bank (chargeback), or the relevant ombudsman (energy, telecoms, financial services all have them).`,
      },
      {
        title: 'Your rights with police',
        body: `You have the right to:
✅ Know why you're being stopped
✅ Know the officer's name and number
✅ Remain silent (except your name and address in some situations)
✅ Legal advice before being questioned (if arrested)
✅ Have someone told if you're arrested

You do NOT have to answer questions about where you're going or what you're doing unless in specific circumstances.

If you're searched: they need reasonable grounds. Ask why. Stay calm. Comply in the moment — challenge it afterwards through official complaints if needed.`,
      },
      {
        title: 'Debt and your rights',
        body: `If you owe money:
❌ Debt collectors cannot enter your home without your permission
❌ They cannot take essential household items  
❌ They cannot contact you at unreasonable hours
❌ They cannot threaten you with prison for most debts (non-criminal)

Priority debts (deal with first): rent, council tax, energy, court fines
Non-priority: credit cards, personal loans, catalogues

Free help: StepChange (stepchange.org), Citizens Advice, National Debtline. These are free, confidential and genuinely good. Don't pay for debt advice.`,
      },
    ],
  },
];

function TopicSection({ section }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-black text-gray-800 text-base">{section.title}</span>
        {open ? <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">{section.body}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TopicCard({ topic, active, onSelect }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(topic.id)}
      className={`rounded-2xl border-2 p-4 text-left w-full transition-all ${
        active ? `bg-gradient-to-br ${topic.color} text-white border-transparent shadow-lg` : `bg-white ${topic.border} text-gray-800 hover:shadow-md`
      }`}
    >
      <div className="text-3xl mb-2">{topic.icon}</div>
      <div className="font-black text-base leading-tight">{topic.title}</div>
    </motion.button>
  );
}

export default function LifeSkills51Page() {
  const [activeTopic, setActiveTopic] = useState(null);
  const topic = TOPICS.find(t => t.id === activeTopic);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50 text-gray-900 pb-32">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white px-4 py-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-6xl mb-3">🌟</div>
          <h1 className="text-4xl md:text-5xl font-black mb-2">Life Skills 51</h1>
          <p className="text-xl text-orange-100 font-bold mb-1">Real stuff. For real life.</p>
          <p className="text-orange-200 text-base">Money · Food · Mental Health · Relationships · Work · Your Rights</p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">

        {/* BACK TO HUB */}
        <Link to="/Learn51" className="inline-flex items-center gap-2 text-indigo-700 font-bold hover:text-indigo-900 transition-colors">
          <GraduationCap className="w-5 h-5" />
          ← Back to Learn51 Hub
        </Link>

        {/* INTRO */}
        <div className="bg-white border-2 border-amber-400 rounded-2xl p-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            School teaches a lot of things. But often not the stuff you actually need to live well —
            how to handle money, cook a meal, protect your mental health, know your rights, find work that matters.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-3">
            This is that stuff. Honest, practical, free. No judgement. Pick what you need.
          </p>
        </div>

        {/* TOPIC PICKER */}
        <div>
          <h2 className="text-2xl font-black text-gray-800 mb-4">Choose a topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {TOPICS.map(t => (
              <TopicCard key={t.id} topic={t} active={activeTopic === t.id} onSelect={id => setActiveTopic(activeTopic === id ? null : id)} />
            ))}
          </div>
        </div>

        {/* TOPIC CONTENT */}
        <AnimatePresence mode="wait">
          {topic && (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className={`bg-gradient-to-r ${topic.color} text-white rounded-2xl p-6`}>
                <div className="text-5xl mb-3">{topic.icon}</div>
                <h2 className="text-3xl font-black mb-2">{topic.title}</h2>
                <p className="text-white/90 text-lg">{topic.intro}</p>
              </div>
              <div className="space-y-3">
                {topic.sections.map((s, i) => (
                  <TopicSection key={i} section={s} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER MESSAGE */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">♾️</div>
          <h3 className="text-2xl font-black mb-2">You deserve to know this stuff</h3>
          <p className="text-blue-100 leading-relaxed">
            None of this makes you an expert overnight. But knowing the basics means
            nobody can take advantage of you not knowing.
            Knowledge is freedom. Use it well. ❤️
          </p>
          <Link to="/Learn51" className="inline-flex items-center gap-2 mt-5 bg-white text-indigo-700 font-black px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            <GraduationCap className="w-5 h-5" />
            Back to Learn51 Hub
          </Link>
        </div>

      </div>
    </div>
  );
}