import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';
import { ArrowLeft } from 'lucide-react';

export default function PetSounds51Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 pt-24">
      <div className="max-w-2xl mx-auto">
        <Link to={createPageUrl("PetSounds51")} className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-bold mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to PetSounds51
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <PetSounds51Icon8Bit size={40} animate={false} />
          <h1 className="text-3xl font-black text-orange-400">Privacy Policy</h1>
        </div>

        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <p className="text-gray-400 text-xs">Last updated: March 2026</p>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">What we collect</h2>
            <p>When you subscribe, Stripe collects your payment details securely. We receive only confirmation that a payment was made — we never see your card number.</p>
            <p className="mt-2">We store your subscription status locally on your device using localStorage. No account is required.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">What we don't collect</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>We do not track which frequencies you play</li>
              <li>We do not store your pet's data</li>
              <li>We do not sell any data to third parties</li>
              <li>We do not use advertising trackers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">How audio works</h2>
            <p>All frequency generation happens locally in your browser using the Web Audio API. No audio is recorded or transmitted anywhere.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">Stripe payments</h2>
            <p>Payments are processed by Stripe. Their privacy policy is at <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">stripe.com/privacy</a>. We use Stripe in test/sandbox mode and do not store card details.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">10% charity donation</h2>
            <p>10% of all subscription revenue is donated to animal rescue organisations. Donation records are kept for accounting purposes only.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">Contact</h2>
            <p>Questions about privacy? Email us at <span className="text-orange-400">family@uf51.love</span></p>
          </section>

          <p className="text-xs text-gray-500 border-t border-slate-700 pt-4">PetSounds51 is part of the Universal Frequency 51 family. Safe & drug-free. 🐾</p>
        </div>
      </div>
    </div>
  );
}