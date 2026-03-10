import React, { useState } from 'react';
import { Shield, Heart, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';

const Section = ({ number, title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-orange-300 bg-white/40 rounded-xl overflow-hidden shadow-sm">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 hover:bg-white/60 transition-all text-left">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-amber-700">{String(number).padStart(2, '0')}</span>
          <h2 className="font-black text-amber-900">{title}</h2>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-orange-700 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-orange-700 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-amber-900 leading-relaxed border-t-2 border-orange-300">
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
};

export default function PetSounds51Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-yellow-50 text-amber-900 p-4 sm:p-6 pb-24 pt-24">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10 pt-4">
          <PetSounds51Icon8Bit size={52} animate={false} />
          <h1 className="text-3xl sm:text-4xl font-black mt-4 mb-2">
            <span className="text-orange-700">PET SOUNDS</span>
          </h1>
          <p className="text-amber-700 font-mono text-xs tracking-widest">TERMS & CONDITIONS</p>
          <p className="text-amber-600 text-xs mt-2">Last Updated: March 2026</p>
        </div>

        {/* THE ONE BIG DISCLAIMER — always visible */}
        <div className="bg-orange-100/50 border-2 border-orange-400 rounded-xl p-5 mb-8 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-orange-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-black text-orange-800 mb-2">THIS IS NOT VETERINARY ADVICE.</p>
            <p className="text-amber-900 text-sm leading-relaxed">
              PetSounds is complementary sound therapy. It is not a diagnosis. It is not a treatment. It does not replace your vet.
              If your animal is unwell, injured, or in distress — <strong className="text-amber-950">call a vet first.</strong> Use this alongside professional care, never instead of it.
            </p>
          </div>
        </div>

        {/* THE HONEST ONE-LINER */}
        <div className="bg-yellow-100/60 border-2 border-orange-300 rounded-xl p-5 mb-8 text-center">
          <p className="text-orange-800 font-black text-lg mb-1">What we actually are:</p>
          <p className="text-amber-900 text-sm">Evidence-based sound therapy for animals. No side effects. No medication interactions. Just frequencies that peer-reviewed science says help. Works through any speaker. You can turn it off anytime.</p>
        </div>

        {/* SECTIONS — collapsible */}
        <div className="space-y-3 mb-10">

          <Section number={1} title="What This Service Is">
            <p className="mb-3">PetSounds51 delivers specific sound frequency protocols — isochronic tones, carrier frequencies, and monaural beats — through your device's speaker. No headphones required. The protocols are based on peer-reviewed research (MIT, iCalmDog RCT, Glasgow, Edinburgh) and designed to support animal behavioural wellness.</p>
            <p>AI51 analysis provides behavioural pattern observations — not medical diagnoses. Think of it as a very smart, very caring second opinion. Your vet is still the professional.</p>
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
              <li>• Email <a href="mailto:petsounds@uf51.love" className="text-orange-700 hover:underline font-bold">petsounds@uf51.love</a> within 30 days</li>
              <li>• We'll process it within 5–7 business days</li>
              <li>• No passive-aggressive delays. No guilt trips.</li>
              <li>• If something genuinely went wrong, tell us. We want to know.</li>
            </ul>
          </Section>

          <Section number={5} title="Subscriptions & Billing">
            <ul className="space-y-2">
              <li>• Annual billing — £29.99/year (approx. $38 USD / €35 EUR — charged in your local currency via Stripe)</li>
              <li>• <strong className="text-white">Auto-renews after 12 months.</strong> You'll receive an email reminder 7 days before renewal.</li>
              <li>• Cancel any time before renewal by emailing <a href="mailto:family@uf51.love" className="text-cyan-400 hover:underline">family@uf51.love</a> — no hoops, no guilt</li>
              <li>• Cancellation takes effect at end of your current paid year</li>
              <li>• 30-day full refund from date of purchase — no questions asked</li>
              <li>• Payments processed securely by Stripe. We never store your card details.</li>
              <li>• One honest price. We don't charge more based on your country.</li>
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
              <li>• AI51 conversations are private</li>
              <li>• Your animal's data is yours</li>
              <li>• Full privacy policy at <a href="/PrivacyPolicy" className="text-cyan-400 hover:underline">uf51.love/PrivacyPolicy</a></li>
            </ul>
          </Section>

          <Section number={7} title="Limitation of Liability">
            <p className="mb-3">Sound therapy carries no known risks. There are no side effects. It does not interact with medication. However:</p>
            <p className="mb-3">PetSounds51 and Universal Frequency 51 are not liable for medical outcomes arising from use of this service. Maximum liability is capped at the amount you paid. You use this service at your own discretion.</p>
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
        <div className="bg-gray-900/60 border border-white/10 rounded-xl p-6 mb-8 text-center">
          <p className="text-white font-black mb-3">Contact Us</p>
          <p className="text-gray-400 text-sm mb-1">Everything goes to one place. We actually read it.</p>
          <a href="mailto:family@uf51.love" className="text-cyan-400 font-black text-lg hover:text-cyan-300 transition-colors">
            family@uf51.love
          </a>
          <p className="text-gray-600 text-xs mt-3">Refunds · Legal · Support · Questions · Feedback · Just saying hi</p>
        </div>

        {/* FOOTER */}
        <div className="text-center border-t border-white/10 pt-8">
          <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Built with love. For every animal. ♾️❤️</p>
          <p className="text-gray-700 text-xs mt-1">Part of Universal Frequency 51 · uf51.love</p>
        </div>

      </div>
    </div>
  );
}