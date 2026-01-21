import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Calendar, Users, Mail, MessageSquare } from 'lucide-react';

/**
 * SCOTT'S GIG APPROVAL NOTIFICATION SYSTEM
 * 
 * Version: 1.0
 * Last Updated: 2026-01-21
 * Owner: Scott Kirkwood
 * Status: SPEC (Build in progress)
 * 
 * PURPOSE:
 * Save bands and managers time by automating gig approval notifications + calendar sync.
 * One notification per person, GREEN YES or RED NO, everything auto-syncs.
 * No logging in, no checking multiple places.
 */

export default function AdminScottNotificationsSpec() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="border-b-4 border-cyan-500 pb-6">
          <h1 className="text-4xl font-black font-mono mb-2">SCOTT'S GIG APPROVAL SYSTEM</h1>
          <p className="text-cyan-400 font-mono">Notification spec - DEFINITIVE SOURCE</p>
          <p className="text-gray-400 text-sm mt-2">Last updated: 2026-01-21 • Status: SPEC LOCKED</p>
        </div>

        {/* CORE PRINCIPLES */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-cyan-900/20 border-2 border-cyan-500 p-6">
          <h2 className="text-2xl font-black font-mono text-cyan-400 mb-4">CORE DESIGN</h2>
          <div className="space-y-3 font-mono text-sm">
            <p>✓ CLUTTER FREE - One notification, one decision</p>
            <p>✓ SIMPLE - GREEN YES or RED NO (no rates, no complexity)</p>
            <p>✓ STREAMLINED - Eliminates need to check WhatsApp/calendar/emails</p>
            <p>✓ EASY - No setup, no logging into anything</p>
            <p>✓ STRESS FREE - Notifications do the work for them</p>
          </div>
        </motion.div>

        {/* THE FLOW */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-black border-4 border-green-500 p-6">
          <h2 className="text-2xl font-black font-mono text-green-400 mb-6">THE FLOW</h2>
          
          <div className="space-y-6">
            
            {/* STEP 1 */}
            <div className="bg-green-900/20 p-4 border-2 border-green-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-green-500 text-black w-8 h-8 rounded flex items-center justify-center font-black">1</span>
                <h3 className="text-lg font-black font-mono">MANAGER RECEIVES GIG OFFER</h3>
              </div>
              <p className="text-gray-300 font-mono text-sm ml-11">Manager pastes gig offer text, uploads screenshot, or AI scans email for offer</p>
            </div>

            {/* STEP 2 */}
            <div className="bg-green-900/20 p-4 border-2 border-green-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-green-500 text-black w-8 h-8 rounded flex items-center justify-center font-black">2</span>
                <h3 className="text-lg font-black font-mono">CB51 PROCESSES + SENDS MANAGER NOTIFICATION</h3>
              </div>
              <div className="text-gray-300 font-mono text-sm ml-11 space-y-2">
                <p>• CB51 receives offer details</p>
                <p>• Sends Manager a notification: <strong>"GREEN YES / RED NO?"</strong></p>
                <p>• Manager has 2 options on the notification itself</p>
              </div>
            </div>

            {/* STEP 3A - YES */}
            <div className="bg-blue-900/20 p-4 border-2 border-blue-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-blue-500 text-black w-8 h-8 rounded flex items-center justify-center font-black">3A</span>
                <h3 className="text-lg font-black font-mono">IF MANAGER CLICKS YES</h3>
              </div>
              <div className="text-gray-300 font-mono text-sm ml-11 space-y-2">
                <p>→ Band members get same notification: <strong>"Manager says YES - you in?"</strong></p>
                <p>→ Same format: <strong>GREEN YES / RED NO</strong></p>
                <p>→ Band checks their personal diary (in their head or on their calendar)</p>
              </div>
            </div>

            {/* STEP 3B - NO */}
            <div className="bg-red-900/20 p-4 border-2 border-red-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-red-500 text-black w-8 h-8 rounded flex items-center justify-center font-black">3B</span>
                <h3 className="text-lg font-black font-mono">IF MANAGER CLICKS NO</h3>
              </div>
              <div className="text-gray-300 font-mono text-sm ml-11">
                <p>Done. Nothing happens. Band never hears about it.</p>
              </div>
            </div>

            {/* STEP 4A - ALL YES */}
            <div className="bg-purple-900/20 p-4 border-2 border-purple-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-purple-500 text-black w-8 h-8 rounded flex items-center justify-center font-black">4A</span>
                <h3 className="text-lg font-black font-mono">IF ALL BAND MEMBERS CLICK YES</h3>
              </div>
              <div className="text-gray-300 font-mono text-sm ml-11 space-y-3">
                <p><strong>Manager gets notification:</strong> "Band confirmed - all YES ✓"</p>
                <p><strong>Auto-actions happen:</strong></p>
                <div className="ml-4 space-y-2">
                  <p>• CB51 drafts confirmation email to agent/promoter</p>
                  <p>• Manager can send it directly (1 click)</p>
                  <p>• Auto-syncs gig to:</p>
                  <div className="ml-4 space-y-1 text-cyan-300">
                    <p>- CB51 calendar (main calendar)</p>
                    <p>- Band members' calendars (if linked)</p>
                    <p>- Personal calendars (if synced)</p>
                  </div>
                </div>
                <p className="mt-3"><strong>Everything documented in CB51</strong> - full audit trail</p>
              </div>
            </div>

            {/* STEP 4B - ANY NO */}
            <div className="bg-orange-900/20 p-4 border-2 border-orange-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-orange-500 text-black w-8 h-8 rounded flex items-center justify-center font-black">4B</span>
                <h3 className="text-lg font-black font-mono">IF ANY BAND MEMBER CLICKS NO</h3>
              </div>
              <div className="text-gray-300 font-mono text-sm ml-11 space-y-2">
                <p>• Notification asks them: <strong>"Why not?"</strong> (simple text reply)</p>
                <p>• They give reason: "Clash with session", "Can't get to venue", etc</p>
                <p>• Manager gets notification: <strong>"Band said NO - [reason]"</strong></p>
                <p>• Manager discusses with them directly to find resolution</p>
                <p>• If resolved: Manager can re-send YES/NO</p>
                <p>• If not resolved: Gig is dead, documented in CB51</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* NOTIFICATION REQUIREMENTS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-black border-4 border-pink-500 p-6">
          <h2 className="text-2xl font-black font-mono text-pink-400 mb-6">NOTIFICATION REQUIREMENTS</h2>
          
          <div className="space-y-4 font-mono text-sm">
            <div className="bg-pink-900/20 p-4 border border-pink-500">
              <p className="font-bold text-pink-300 mb-2">✓ Notifications must be:</p>
              <ul className="space-y-1 text-gray-300">
                <li>• Clutter-free (no extra info, just offer summary)</li>
                <li>• Simple (GREEN YES / RED NO buttons only)</li>
                <li>• Easy to understand (one decision)</li>
                <li>• Fast to respond to (no thinking required)</li>
                <li>• Stress-free (binary choice, that's it)</li>
              </ul>
            </div>

            <div className="bg-pink-900/20 p-4 border border-pink-500">
              <p className="font-bold text-pink-300 mb-2">✗ Notifications must NOT include:</p>
              <ul className="space-y-1 text-gray-300">
                <li>• Rates or money (remove entirely)</li>
                <li>• Travel details (can be discussed after YES)</li>
                <li>• Contract terms (separate conversation)</li>
                <li>• Multiple choice options (YES or NO only)</li>
                <li>• Any setup or configuration needed</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* OFFER CAPTURE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-black border-4 border-amber-500 p-6">
          <h2 className="text-2xl font-black font-mono text-amber-400 mb-4">HOW MANAGER SUBMITS OFFER</h2>
          
          <div className="space-y-3 font-mono text-sm text-gray-300">
            <p><strong className="text-amber-300">Option 1:</strong> Pastes gig offer text directly</p>
            <p><strong className="text-amber-300">Option 2:</strong> Uploads screenshot of offer</p>
            <p><strong className="text-amber-300">Option 3:</strong> AI scans email for offer (future)</p>
            <p className="text-cyan-300 mt-4">→ CB51 extracts key details: venue, date, time, contact</p>
          </div>
        </motion.div>

        {/* CALENDAR SYNC */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-black border-4 border-green-500 p-6">
          <h2 className="text-2xl font-black font-mono text-green-400 mb-4">CALENDAR SYNC (WHEN ALL YES)</h2>
          
          <div className="space-y-3 font-mono text-sm text-gray-300">
            <p><strong className="text-green-300">1. CB51 Calendar:</strong> Gig appears immediately</p>
            <p><strong className="text-green-300">2. Band Members' Calendars:</strong> If they've linked their calendars (Google/Apple)</p>
            <p><strong className="text-green-300">3. Personal Calendars:</strong> If they've given permission</p>
            <p className="text-cyan-300 mt-4">→ No manual data entry. No copy/pasting. Just syncs.</p>
          </div>
        </motion.div>

        {/* AUTO-EMAIL TO AGENT */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-black border-4 border-cyan-500 p-6">
          <h2 className="text-2xl font-black font-mono text-cyan-400 mb-4">AUTO-DRAFTED EMAIL TO AGENT</h2>
          
          <div className="space-y-3 font-mono text-sm text-gray-300">
            <p><strong className="text-cyan-300">When all band members say YES:</strong></p>
            <p className="ml-4">CB51 generates email template confirming:</p>
            <ul className="ml-8 space-y-1 text-cyan-200">
              <li>✓ Band confirmed</li>
              <li>✓ All members available</li>
              <li>✓ Details (venue, date, time)</li>
              <li>✓ Contact info</li>
            </ul>
            <p className="mt-4"><strong className="text-cyan-300">Manager:</strong> 1-click send or edit first</p>
            <p className="text-amber-300 mt-3">→ Takes 5 seconds. Eliminates typing the same email 50 times.</p>
          </div>
        </motion.div>

        {/* DOCUMENTATION IN CB51 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-black border-4 border-purple-500 p-6">
          <h2 className="text-2xl font-black font-mono text-purple-400 mb-4">EVERYTHING DOCUMENTED IN CB51</h2>
          
          <div className="space-y-3 font-mono text-sm text-gray-300">
            <p><strong className="text-purple-300">Full audit trail captured:</strong></p>
            <ul className="ml-4 space-y-2 text-purple-200">
              <li>• Original offer received (date/time)</li>
              <li>• Manager's decision (YES/NO)</li>
              <li>• Each band member's response (YES/NO + reason if NO)</li>
              <li>• Resolution (confirmed or rejected)</li>
              <li>• Email sent to agent (timestamp, content)</li>
              <li>• Calendar entries created</li>
            </ul>
            <p className="mt-4"><strong className="text-purple-300">Why:</strong> No more "did we confirm this?" - everything's searchable, timestamped, auditable</p>
          </div>
        </motion.div>

        {/* KEY POINTS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-black border-4 border-red-500 p-6">
          <h2 className="text-2xl font-black font-mono text-red-400 mb-4">CRITICAL POINTS (DON'T MISS)</h2>
          
          <div className="space-y-3 font-mono text-sm text-gray-300">
            <p className="text-red-300">⚠️ NO RATES OR MONEY MENTIONED IN NOTIFICATIONS</p>
            <p className="text-red-300">⚠️ GREEN YES / RED NO ONLY (no other options)</p>
            <p className="text-red-300">⚠️ STRESS FREE - manager/band answer ONE notification each</p>
            <p className="text-red-300">⚠️ PURPOSE: Save time by automating calendar sync + agent confirmation</p>
            <p className="text-red-300">⚠️ If ANY member says NO, they explain why + manager discusses</p>
            <p className="text-red-300">⚠️ Everything documented for audit trail</p>
          </div>
        </motion.div>

        {/* FOOTER */}
        <div className="border-t border-cyan-500 pt-6 text-center">
          <p className="text-cyan-400 font-mono text-sm">
            Spec locked: 2026-01-21 • Next: Build notification system based on this spec
          </p>
        </div>

      </div>
    </div>
  );
}