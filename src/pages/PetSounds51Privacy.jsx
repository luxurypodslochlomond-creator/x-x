import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';
import { ArrowLeft } from 'lucide-react';

export default function PetSounds51Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 text-white p-4 pt-24">
      <div className="max-w-2xl mx-auto">
        <Link to={createPageUrl("PetSounds51")} className="inline-flex items-center gap-2 text-sm font-bold mb-8 transition-colors hover:opacity-80" style={{ color: '#d4a017' }}>
          <ArrowLeft className="w-4 h-4" /> Back to PetSounds51
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <PetSounds51Icon8Bit size={40} animate={false} />
          <h1 className="text-3xl font-black" style={{ color: '#d4a017' }}>Privacy Policy</h1>
        </div>

        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <p className="text-gray-400 text-xs">Last updated: March 2026</p>

          <section>
            <h2 className="font-bold text-lg mb-2" style={{ color: '#d4a017' }}>What we collect</h2>
            <p className="text-gray-300">When you subscribe, Stripe collects your payment details securely. We receive only confirmation that a payment was made — we never see your card number.</p>
            <p className="mt-2 text-gray-300">We store your subscription status locally on your device using localStorage. No account is required.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2" style={{ color: '#d4a017' }}>What we don't collect</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>We do not track which frequencies you play</li>
              <li>We do not store your pet's data</li>
              <li>We do not sell any data to third parties</li>
              <li>We do not use advertising trackers</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2" style={{ color: '#d4a017' }}>How audio works</h2>
            <p className="text-gray-300">All frequency generation happens locally in your browser using the Web Audio API. No audio is recorded or transmitted anywhere.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2" style={{ color: '#d4a017' }}>Stripe payments</h2>
            <p className="text-gray-300">Payments are processed by Stripe. Their privacy policy is at <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#d4a017' }}>stripe.com/privacy</a>. We use Stripe in test/sandbox mode and do not store card details.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2" style={{ color: '#d4a017' }}>10% charity donation</h2>
            <p className="text-gray-300">10% of all subscription revenue is donated to animal rescue organisations. Donation records are kept for accounting purposes only.</p>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-2" style={{ color: '#d4a017' }}>Contact</h2>
            <p className="text-gray-300">Questions about privacy? Email us at <span style={{ color: '#d4a017' }}>family@uf51.love</span></p>
          </section>

          <p className="text-xs text-gray-500 border-t border-amber-700/40 pt-4">PetSounds51 is part of the Universal Frequency 51 family. Safe & drug-free.</p>
        </div>
      </div>
    </div>
  );
}