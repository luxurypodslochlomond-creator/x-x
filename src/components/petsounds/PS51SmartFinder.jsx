import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, Heart, Zap, Home, Shield, Moon, Waves, Activity, Clock } from 'lucide-react';
import { PS51Icons } from '@/components/petsounds/PS51CustomIcons';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';

// The intelligence layer — maps answers to protocol + reasoning
const RECOMMENDATION_ENGINE = {
  dog: {
    alone: {
      puppy: { protocol: 'separation', reason: 'Young dogs bond intensely and panic quickly when alone. The 432Hz slow-tempo layer with heartbeat mimicry is calibrated for this exact neurological state.' },
      adult: { protocol: 'separation', reason: "Adult dogs with separation anxiety show elevated cortisol for up to 4 hours. Our 432Hz heartbeat-anchored audio reduces this measurably within 15-20 minutes." },
      senior: { protocol: 'separation', reason: "Older dogs feel vulnerability more acutely when alone. The separation protocol's brown noise foundation masks startling sounds that spike senior dog anxiety." },
    },
    loud_sounds: {
      puppy: { protocol: 'thunderstorm', reason: 'Puppies haven\'t learned that thunder isn\'t fatal. The ambient masking layer reduces perceived loudness while the slow carrier tone overrides panic signals.' },
      adult: { protocol: 'thunderstorm', reason: 'Dogs hear 4x our frequency range — thunder registers as far more violent to them. Our layered masking is tuned specifically to canine high-frequency panic triggers.' },
      senior: { protocol: 'thunderstorm', reason: "Senior dogs often develop sound sensitivity as hearing changes with age. The masking layer here compensates for the frequencies that distress them most." },
    },
    pain: {
      puppy: { protocol: 'recovery', reason: 'Young dogs in recovery need environmental calm to rest properly. 40Hz gamma isochronic tones reduce stress-amplified pain perception during healing.' },
      adult: { protocol: 'arthritis', reason: 'Pain is amplified by stress. Our pain protocol uses 40Hz gamma frequencies — the same range showing promise in Alzheimer\'s and neurological research — to reduce cortisol-driven pain amplification.' },
      senior: { protocol: 'arthritis', reason: 'Chronic arthritis in older dogs is severely worsened by environmental stress. Daily use of this protocol measurably reduces the stress layer on top of baseline pain.' },
    },
    trauma: {
      puppy: { protocol: 'separation', reason: 'Early trauma protocols start gentle. The separation anxiety audio is the right foundation — it builds safety associations before moving to more targeted work.' },
      adult: { protocol: 'rescue_trauma', reason: 'Rescue trauma in adult dogs is held in the nervous system. The warm harmonic stack here, combined with the slow heartbeat layer, signals safety without overwhelming a fragile system.' },
      senior: { protocol: 'grief', reason: 'Senior dogs who have lost companions or moved homes need consistent ambient companionship. This protocol runs for hours without fatiguing them — designed for daily use.' },
    },
    wont_settle: {
      puppy: { protocol: 'hyperactive', reason: 'Puppy hyperactivity is often under-stimulated nervous energy. Under-60 BPM pacing in our audio physically down-regulates the sympathetic nervous system over time.' },
      adult: { protocol: 'hyperactive', reason: "High-reactivity dogs have nervous systems stuck in 'on'. Our hyperactivity protocol uses entrainment — the brain naturally syncs to external rhythms — to gently pull them down." },
      senior: { protocol: 'night_anxiety', reason: "Older dogs that won't settle often have cognitive changes. The night anxiety protocol's ultra-slow ambient is designed to reduce sundowning confusion and support sleep onset." },
    }
  },
  cat: {
    alone: {
      puppy: { protocol: 'separation', reason: "Young kittens separated from siblings show measurably elevated stress hormones. Our feline-tuned audio compensates for the cat hearing range (up to 79kHz) with higher-frequency calming tones." },
      adult: { protocol: 'separation', reason: "Despite the myth — cats absolutely feel your absence. Our feline profile removes the harsh frequencies that cats find aversive while amplifying the calm-inducing range." },
      senior: { protocol: 'cognitive_decline', reason: "Senior cats with feline cognitive dysfunction show significantly increased anxiety when alone. Consistent daily audio therapy provides the environmental predictability they need." },
    },
    loud_sounds: {
      puppy: { protocol: 'thunderstorm', reason: "Kittens are hypersensitive to sudden loud sounds. The masking layer here is adjusted for feline frequency sensitivity — covering the exact ranges that trigger acute feline stress responses." },
      adult: { protocol: 'thunderstorm', reason: "Cats hear significantly higher frequencies than dogs — making thunder and fireworks register differently. Our feline masking profile is distinct from the canine version for this reason." },
      senior: { protocol: 'thunderstorm', reason: "Elderly cats with reduced hearing sometimes become MORE startled by sounds, not less. The broad-spectrum masking here covers the gap." },
    },
    pain: {
      puppy: { protocol: 'recovery', reason: "Young cats in recovery benefit enormously from environmental calm — it directly reduces cortisol-driven pain amplification and supports faster healing." },
      adult: { protocol: 'recovery', reason: "Post-surgical feline recovery is critically affected by stress. Cats hide pain well — which means ambient calm is doing more than you can see." },
      senior: { protocol: 'arthritis', reason: "Feline arthritis is massively underdiagnosed. Our pain protocol reduces the environmental stress that amplifies perceived pain — giving your cat genuine relief without medication." },
    },
    trauma: {
      puppy: { protocol: 'rescue_trauma', reason: "Early trauma in kittens shapes their entire nervous system. The gentle warm tones here create new safety associations — this works best as a long-term daily practice." },
      adult: { protocol: 'rescue_trauma', reason: "Adult rescue cats carry body-level fear. Our trauma protocol is designed to be non-intrusive — it works without demanding anything from them." },
      senior: { protocol: 'grief', reason: "Cats grieve deeply and quietly. Consistent ambient companionship signals that the world is still safe — which is exactly what a grieving senior cat needs." },
    },
    wont_settle: {
      puppy: { protocol: 'hyperactive', reason: "Kitten hyperactivity responds well to rhythm entrainment. Under-60 BPM carrier tones gradually pace down an overactive system — usually within one session." },
      adult: { protocol: 'hyperactive', reason: "High-reactivity in adult cats is often anxiety beneath the surface. Our entrainment protocol addresses the root, not the symptom." },
      senior: { protocol: 'night_anxiety', reason: "Night restlessness in senior cats (feline hyperesthesia, cognitive decline) responds strongly to our ultra-slow night protocol — designed for multi-hour ambient use." },
    }
  },
  horse: {
    alone: {
      puppy: { protocol: 'separation', reason: "Young horses are deeply herd-bonded. Separation distress is a genuine welfare concern. Our equine profile extends the frequency calming layer into the range horses use for social communication." },
      adult: { protocol: 'separation', reason: "Horses in isolation show significant physiological stress. Our equine-tuned separation protocol uses nature-mimicking ambient audio calibrated for the 33kHz equine hearing range." },
      senior: { protocol: 'grief', reason: "Older horses who lose herd companions can decline rapidly from grief. Consistent ambient companionship audio provides genuine neurological comfort." },
    },
    loud_sounds: {
      puppy: { protocol: 'thunderstorm', reason: "Young horses are flight animals — loud sounds trigger genuine survival panic. Our masking layer is calibrated for equine high-frequency sensitivity." },
      adult: { protocol: 'thunderstorm', reason: "Horses can't reason about thunder. Our masking layer covers the sudden sharp frequencies that trigger equine flight response, reducing the physiological panic spiral." },
      senior: { protocol: 'thunderstorm', reason: "Senior horses with reduced hearing still react to sudden sounds — sometimes more unpredictably. Our masking protocol is safe to run continuously during weather events." },
    },
    pain: {
      puppy: { protocol: 'recovery', reason: "Young horses in recovery need environmental calm to prevent stress from compounding healing. Our recovery protocol is designed for multi-hour ambient use in stable environments." },
      adult: { protocol: 'pre_race', reason: "Pre-event calm in performance horses directly affects outcome. The alert-calm balance protocol here is used by some professional equine facilities already." },
      senior: { protocol: 'arthritis', reason: "Equine arthritis pain is significantly amplified by cortisol. Our pain protocol runs continuously to reduce the background stress that makes every step harder." },
    },
    trauma: {
      puppy: { protocol: 'rescue_trauma', reason: "Traumatised young horses need patient, consistent environmental work. Our trauma protocol is designed to be safe as 24-hour stable ambient." },
      adult: { protocol: 'rescue_trauma', reason: "Adult horses with trauma histories hold it deeply in their nervous systems. The gentle harmonic stack here builds safety over time — weeks, not days." },
      senior: { protocol: 'grief', reason: "Grief in senior horses affects physical health. Our grief protocol provides consistent environmental companionship signals throughout the day." },
    },
    wont_settle: {
      puppy: { protocol: 'post_race', reason: "Young horses that won't settle are often holding excess cortisol. Our post-event recovery protocol is calibrated to bring parasympathetic activation." },
      adult: { protocol: 'post_race', reason: "Horses after high-stimulation events need active cortisol reduction. Our post-race protocol provides this over 45-90 minute sessions." },
      senior: { protocol: 'captivity_stress', reason: "Senior horses in stabling often develop captivity-related chronic stress. Our environment-focused protocol mimics natural ambient audio to reduce this." },
    }
  }
};

// Custom icon renderer — no emojis, pure PS51 style
const QIcon = ({ icon: Icon, color = '#d4a017', size = 22 }) => (
  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
    style={{ background: `${color}18`, border: `1px solid ${color}40` }}>
    <Icon size={size} style={{ color }} />
  </div>
);

const QUESTIONS = [
  {
    id: 'species',
    question: 'Who needs help?',
    Icon: PS51Icons.AnimalCare,
    options: [
      { key: 'dog', label: 'Dog', Icon: PS51Icons.Paw, iconColor: '#d4a017', desc: 'All sizes and breeds' },
      { key: 'cat', label: 'Cat', Icon: PS51Icons.Cat, iconColor: '#f472b6', desc: 'Domestic and large cats' },
      { key: 'horse', label: 'Horse', Icon: PS51Icons.Horse, iconColor: '#8aab3a', desc: 'Horses and ponies' },
    ]
  },
  {
    id: 'trigger',
    question: "What's going on?",
    Icon: PS51Icons.Frequency,
    options: [
      { key: 'alone', label: 'Separation / alone', Icon: Home, iconColor: '#06b6d4', desc: "Anxious when you're not there" },
      { key: 'loud_sounds', label: 'Thunder / fireworks', Icon: Zap, iconColor: '#f59e0b', desc: 'Panics at sudden loud sounds' },
      { key: 'pain', label: 'Pain / recovering', Icon: Activity, iconColor: '#f97316', desc: 'Arthritis, post-surgery, discomfort' },
      { key: 'trauma', label: 'Rescue trauma / grief', Icon: PS51Icons.Heart, iconColor: '#ec4899', desc: "Carrying something they've been through" },
      { key: 'wont_settle', label: "Won't settle / reactive", Icon: Waves, iconColor: '#a855f7', desc: "High energy, can't calm down" },
    ]
  },
  {
    id: 'age',
    question: 'How old are they?',
    Icon: PS51Icons.Science,
    options: [
      { key: 'puppy', label: 'Young', Icon: PS51Icons.Rescue, iconColor: '#8aab3a', desc: 'Puppy / kitten / foal' },
      { key: 'adult', label: 'Adult', Icon: PS51Icons.Speaker, iconColor: '#d4a017', desc: '1–8 years old' },
      { key: 'senior', label: 'Senior', Icon: Moon, iconColor: '#6366f1', desc: '8+ years, older animal' },
    ]
  }
];

export default function PS51SmartFinder({ onSelectProtocol, onDismiss }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Generate recommendation
      const { species, trigger, age } = newAnswers;
      const rec = RECOMMENDATION_ENGINE[species]?.[trigger]?.[age];
      setRecommendation(rec || { protocol: 'separation', reason: 'Starting with our most-used protocol — Separation Anxiety — as a calm foundation.' });
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setRecommendation(null);
  };

  const currentQuestion = QUESTIONS[step];

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(20,28,10,0.95)', border: '2px solid rgba(212,160,23,0.4)', boxShadow: '0 0 40px rgba(212,160,23,0.1)' }}>
      
      {/* HEADER */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(212,160,23,0.15)' }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" style={{ color: '#d4a017' }} />
          <span className="font-black text-sm tracking-wide" style={{ color: '#d4a017' }}>AI PROTOCOL FINDER</span>
        </div>
        <div className="flex items-center gap-3">
          {(step > 0 || recommendation) && (
            <button onClick={reset} className="flex items-center gap-1 text-xs" style={{ color: '#6b5e3a' }}>
              <RotateCcw className="w-3 h-3" /> start over
            </button>
          )}
          {onDismiss && (
            <button onClick={onDismiss} className="text-xs" style={{ color: '#6b5e3a' }}>✕ close</button>
          )}
        </div>
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait">
          {!recommendation ? (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* PROGRESS */}
              <div className="flex gap-1.5 mb-5">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{ background: i <= step ? '#d4a017' : 'rgba(212,160,23,0.15)' }} />
                ))}
              </div>

              {/* QUESTION */}
              <div className="flex items-center gap-2 mb-1">
                <currentQuestion.Icon size={20} style={{ color: '#d4a017' }} />
                <p className="text-lg font-black" style={{ color: '#e8d5a3' }}>{currentQuestion.question}</p>
              </div>
              <p className="text-xs mb-4" style={{ color: '#6b5e3a' }}>
                Question {step + 1} of {QUESTIONS.length}
              </p>

              {/* OPTIONS */}
              <div className="space-y-2">
                {currentQuestion.options.map(option => (
                  <button
                    key={option.key}
                    onClick={() => handleAnswer(currentQuestion.id, option.key)}
                    className="w-full text-left px-4 py-3 rounded-xl transition-all active:scale-98 flex items-center gap-3"
                    style={{ background: 'rgba(42,48,24,0.8)', border: '1px solid rgba(138,171,58,0.2)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,160,23,0.5)'; e.currentTarget.style.background = 'rgba(42,48,24,1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(138,171,58,0.2)'; e.currentTarget.style.background = 'rgba(42,48,24,0.8)'; }}
                  >
                    <QIcon icon={option.Icon} color={option.iconColor} />
                    <div className="flex-1">
                      <p className="font-bold text-sm" style={{ color: '#e8d5a3' }}>{option.label}</p>
                      <p className="text-xs" style={{ color: '#6b5e3a' }}>{option.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: '#4a4030' }} />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="recommendation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* RESULT */}
              <div className="text-center mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black mb-3"
                  style={{ background: 'rgba(138,171,58,0.15)', border: '1px solid rgba(138,171,58,0.4)', color: '#8aab3a' }}>
                  <PS51Icons.Science size={12} style={{ color: '#8aab3a' }} /> PROTOCOL MATCHED
                </div>
                <p className="text-xs mb-2" style={{ color: '#6b5e3a' }}>Based on your answers:</p>
              </div>

              <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.3)' }}>
                <p className="font-black mb-1" style={{ color: '#d4a017', fontSize: '1rem' }}>
                  Why this protocol
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#c8b87a' }}>
                  {recommendation.reason}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onSelectProtocol(recommendation.protocol, answers.species)}
                  className="w-full py-4 rounded-xl font-black text-base flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #d4a017, #f0c040)', color: '#1a1a0a', boxShadow: '0 0 25px rgba(212,160,23,0.3)' }}
                >
                  ▶ Start Recommended Protocol
                </button>
                <button
                  onClick={reset}
                  className="w-full py-2 rounded-xl text-sm transition-colors"
                  style={{ color: '#6b5e3a', border: '1px solid rgba(138,171,58,0.2)' }}
                >
                  ← Try different answers
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}