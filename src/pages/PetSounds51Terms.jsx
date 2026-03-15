import React, { useState } from 'react';
import { Shield, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';

const Section = ({ number, title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-amber-700/40 bg-black/40 rounded-xl overflow-hidden shadow-sm hover:border-amber-700/60 transition-colors">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 hover:bg-amber-700/10 transition-all text-left">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: '#d4a017' }}>{String(number).padStart(2, '0')}</span>
          <h2 className="font-black" style={{ color: '#d4a017' }}>{title}</h2>
        </div>
        {open ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: '#d4a017' }} /> : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: '#d4a017' }} />}
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t-2 border-amber-700/40">
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
};

export default function PetSounds51Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 text-white p-4 sm:p-6 pb-24 pt-24">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10 pt-4">
          <PetSounds51Icon8Bit size={52} animate={false} />
          <h1 className="text-3xl sm:text-4xl font-black mt-4 mb-2">
            <span style={{ color: '#d4a017' }}>PET SOUNDS</span>
          </h1>
          <p className="font-mono text-xs tracking-widest" style={{ color: '#d4a017' }}>TERMS & CONDITIONS</p>
          <p className="text-gray-400 text-xs mt-2">Last Updated: March 2026</p>
        </div>

        {/* THE ONE BIG DISCLAIMER — always visible */}
        <div className="bg-red-950/30 border-2 border-red-700/50 rounded-xl p-5 mb-8 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#d4a017' }} />
          <div>
            <p className="font-black mb-2" style={{ color: '#d4a017' }}>THIS IS NOT VETERINARY ADVICE.</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              PetSounds is complementary sound therapy. It is not a diagnosis. It is not a treatment. It does not replace your vet.
              If your animal is unwell, injured, or in distress — <strong>call a vet first.</strong> Use this alongside professional care, never instead of it.
            </p>
          </div>
        </div>

        {/* THE HONEST ONE-LINER */}
        <div className="bg-green-950/30 border-2 border-green-700/50 rounded-xl p-5 mb-8 text-center">
          <p className="font-black text-lg mb-1" style={{ color: '#d4a017' }}>What we actually are:</p>
          <p className="text-gray-300 text-sm">Evidence-based sound therapy for animals. No side effects. No medication interactions. Just frequencies that peer-reviewed science says help. Works through any speaker. You can turn it off anytime.</p>
        </div>

        {/* SECTIONS — collapsible */}
        <div className="space-y-3 mb-10">

          <Section number={1} title="What This Service Is">
            <p className="mb-3">PetSounds delivers specific sound frequency protocols — isochronic tones, carrier frequencies, and monaural beats — through your device's speaker. No headphones required. The protocols are based on peer-reviewed research (MIT, iCalmDog RCT, Glasgow, Edinburgh) and designed to support animal behavioural wellness.</p>
            <p>Think of this as complementary care — your vet is still the professional.</p>
          </Section>

          <Section number={2} title="What We Are Not (Important)">
            <ul className="space-y-2">
              <li>❌ Not veterinary medical professionals</li>
              <li>❌ Not providing diagnosis or treatment</li>
              <li>❌ Not a substitute for professional vet care</li>
              <li>❌ Not making medical guarantees</li>
              <li>✅ A genuine, care-driven complementary wellness tool</li>
              <li>✅ Built by humans who love animals, not a corporation</li>
            </ul>
          </Section>

          <Section number={3} title="Your Responsibilities">
            <ul className="space-y-2">
              <li>• See a licensed vet for medical concerns — always</li>
              <li>• Watch your animal while using the app. If they seem distressed, stop.</li>
              <li>• Use this as a complement to care, not a replacement</li>
              <li>• Don't use it as an excuse to avoid professional help</li>
              <li>• You're an adult (or guardian). You make the call.</li>
            </ul>
          </Section>

          <Section number={4} title="Refund Policy — No Nonsense">
            <p className="mb-3">30-day full refund. No questions. We mean it.</p>
            <ul className="space-y-2">
              <li>• Email <a href="mailto:family@uf51.love" className="hover:underline font-bold" style={{ color: '#d4a017' }}>family@uf51.love</a> within 30 days</li>
              <li>• We'll process it within 5–7 business days</li>
              <li>• No passive-aggressive delays. No guilt trips.</li>
              <li>• If something genuinely went wrong, tell us. We want to know.</li>
            </ul>
          </Section>

          <Section number={5} title="Subscriptions & Billing">
            <ul className="space-y-2">
              <li>• Annual billing — £29.99/year (charged in your local currency via Stripe)</li>
              <li>• <strong className="text-amber-950">Auto-renews after 12 months.</strong> You'll receive an email reminder 7 days before renewal.</li>
              <li>• Cancel any time before renewal by emailing <a href="mailto:family@uf51.love" className="hover:underline font-bold" style={{ color: '#d4a017' }}>family@uf51.love</a> — no hoops, no guilt</li>
              <li>• Cancellation takes effect at end of your current paid year</li>
              <li>• 30-day full refund from date of purchase — no questions asked</li>
              <li>• Payments processed securely by Stripe. We never store your card details.</li>
              <li>• One honest price. No hidden fees.</li>
            </ul>
          </Section>

          <Section number={5.1} title="Free Access">
            <p className="mb-3">The Separation Anxiety protocol is permanently free. No subscription required. No catch.</p>
            <p>We believe every pet owner who needs it should be able to access the most important protocol without paying first. Try it. See if it works. Then decide.</p>
          </Section>

          <Section number={6} title="Data & Privacy">
            <p className="mb-3">We collect the minimum we need to run the service: email, payment info, usage patterns. That's it.</p>
            <ul className="space-y-2">
              <li>• We never sell your data. Ever.</li>
              <li>• Your sessions are private</li>
              <li>• Your animal's data is yours</li>
              <li>• Full privacy policy at <a href="/PrivacyPolicy" className="hover:underline font-bold" style={{ color: '#d4a017' }}>Privacy Policy</a></li>
            </ul>
          </Section>

          <Section number={7} title="Limitation of Liability">
            <p className="mb-3">Sound therapy carries no known risks. There are no side effects. It does not interact with medication. However:</p>
            <p className="mb-3">PetSounds is not liable for medical outcomes arising from use of this service. Maximum liability is capped at the amount you paid. You use this service at your own discretion.</p>
            <p>This is standard legal protection — not because we don't care, but because we're not vets and we're being honest about that.</p>
          </Section>

          <Section number={8} title="Acceptable Use">
            <p className="mb-2">Please don't:</p>
            <ul className="space-y-2">
              <li>• Resell or redistribute our protocols</li>
              <li>• Claim PetSounds51 replaces veterinary care</li>
              <li>• Use for any harmful, illegal, or exploitative purpose</li>
              <li>• Spam or abuse our support</li>
            </ul>
          </Section>

          <Section number={9} title="Changes to These Terms">
            <p>We may update these terms. If we make significant changes, active subscribers get an email. Continued use after changes = acceptance. If something changes you genuinely disagree with, email us before assuming the worst.</p>
          </Section>

          <Section number={10} title="Governing Law">
            <p>These terms are governed by the laws of Scotland, United Kingdom. Any disputes will be subject to the jurisdiction of Scottish courts. We are a small, ethical, UK-based operation.</p>
          </Section>

        </div>

        {/* CONTACT */}
        <div className="bg-green-950/30 border-2 border-green-700/50 rounded-xl p-6 mb-8 text-center shadow-sm">
          <p className="font-black mb-3" style={{ color: '#d4a017' }}>Contact Us</p>
          <p className="text-gray-300 text-sm mb-1">Everything goes to one place. We actually read it.</p>
          <a href="mailto:family@uf51.love" className="font-black text-lg transition-colors" style={{ color: '#d4a017' }}>
            family@uf51.love
          </a>
          <p className="text-gray-400 text-xs mt-3">Refunds · Support · Questions · Feedback · Hi</p>
        </div>

        {/* FOOTER */}
         <div className="text-center border-t-2 border-amber-700/40 pt-8">
           <PetSounds51Icon8Bit size={48} animate={false} />
           <p className="text-gray-300 text-sm mt-3">Built with love. For every animal.</p>
           <p className="text-gray-400 text-xs mt-1">PetSounds Healing</p>
         </div>

      </div>
    </div>
  );
}