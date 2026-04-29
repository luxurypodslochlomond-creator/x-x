import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Calendar, AlertCircle, CheckCircle, ClipboardList, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminNatWestMortgage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-block p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black">NATWEST MORTGAGE</h1>
          <p className="text-xl text-gray-300">Reference: 5521482 • You Negotiated This ♾️</p>
          <p className="text-sm text-green-400 font-mono">🔥 UPDATED: 31 Mar 2026 — REPLIED TO SUKHI KAUR — April/May payment committed</p>
        </motion.div>

        {/* CURRENT STATUS - 3 MONTH DEFERRAL + 30 DAY BREATHING SPACE */}
        <Card className="bg-gradient-to-r from-green-900/40 to-cyan-900/40 border-4 border-green-500 shadow-[0_0_80px_rgba(34,211,238,0.6)]">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-12 h-12 text-green-400" />
              <h2 className="text-3xl font-black text-green-300">3-MONTH DEFERRAL + 30 DAY BREATHING SPACE ✓</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-black/60 border-2 border-green-500 rounded-xl p-6">
                <p className="text-green-300 font-bold text-lg mb-3">🔥 LATEST — WRITTEN HOLD (17 Mar 2026)</p>
                <div className="space-y-2 text-white">
                  <p><strong>From:</strong> Mr J Dempsey — NatWest Specialised Support Team (SSTSecured@natwest.com)</p>
                  <p><strong>Ref:</strong> 5521482</p>
                  <p><strong>Hold confirmed IN WRITING:</strong> No contact or action until <span className="text-green-400 font-black">31/03/2026</span></p>
                  <p><strong>Action required:</strong> Reply to email or call 0800 161 5954 BEFORE 31/03/2026</p>
                  <p><strong>Office hours:</strong> 8am–5pm, Monday to Friday</p>
                </div>
              </div>

              <div className="bg-black/60 border-2 border-cyan-500/50 rounded-xl p-6">
                <p className="text-cyan-300 font-bold text-lg mb-3">✅ WHAT YOU GOT (27 Jan 2026)</p>
                <div className="space-y-2 text-white">
                  <p><strong>3-month deferral:</strong> You benefited from this (breathing room secured)</p>
                  <p><strong>30-day breathing space APPLIED:</strong> Account paused for 30 days (from 27 Jan 2026)</p>
                  <p><strong>Month-by-month review:</strong> They'll work with you and delay account until situation improves</p>
                </div>
              </div>

              <div className="bg-cyan-900/30 border-2 border-cyan-500 rounded-lg p-4">
                <p className="text-cyan-300 font-bold mb-2">📞 WHAT RAJ SAID (SST Secured):</p>
                <ul className="text-sm text-gray-200 space-y-1">
                  <li>✓ 30 day breathing space applied today (27 Jan)</li>
                  <li>✓ Will continue to work with you and delay account</li>
                  <li>✓ Review situation month by month</li>
                  <li>✓ Contact them at end of February with update</li>
                </ul>
              </div>

              <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-4">
                <p className="text-amber-300 font-bold mb-2">⚠️ IMPORTANT:</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Interest continues to accrue (you'll pay more total)</li>
                  <li>• But account is DELAYED month by month (gives you breathing room)</li>
                  <li>• NatWest is actively working WITH you (brilliant sign)</li>
                  <li>• Keep communication open - email AND call them</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ACCOUNT DETAILS */}
        <Card className="bg-black border-2 border-cyan-500/50">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center gap-2">
              <ClipboardList className="w-6 h-6" />
              ACCOUNT DETAILS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-cyan-400 font-bold text-sm mb-1">Sort Code</p>
                <p className="text-white font-mono text-lg">600657</p>
              </div>
              <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-cyan-400 font-bold text-sm mb-1">Account Ending</p>
                <p className="text-white font-mono text-lg">766</p>
              </div>
              <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-cyan-400 font-bold text-sm mb-1">Reference</p>
                <p className="text-white font-mono text-lg">5521482</p>
              </div>
              <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-cyan-400 font-bold text-sm mb-1">Postcode</p>
                <p className="text-white font-mono text-lg">8QU</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CRITICAL DATES */}
        <Card className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-2 border-pink-500/50">
          <CardHeader>
            <CardTitle className="text-pink-300 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              CRITICAL DATES
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-4 bg-green-900/20 p-4 rounded-lg border-2 border-green-500">
                <div className="text-green-400 font-bold text-lg min-w-fit">27/01/2026</div>
                <div>
                  <p className="text-white font-bold">✅ 30 Day Breathing Space Applied</p>
                  <p className="text-gray-400 text-sm">Account paused for 30 days from today</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-amber-900/20 p-4 rounded-lg border-2 border-amber-500">
                <div className="text-amber-400 font-bold text-lg min-w-fit">26/02/2026</div>
                <div>
                  <p className="text-white font-bold">Breathing Space Ends</p>
                  <p className="text-gray-400 text-sm">30 days from 27 Jan</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-900/30 p-4 rounded-lg border-2 border-green-400">
                <div className="text-green-300 font-bold text-lg min-w-fit">17/03/2026</div>
                <div>
                  <p className="text-white font-bold">🔥 WRITTEN HOLD RECEIVED — Mr J Dempsey</p>
                  <p className="text-green-300 text-sm font-bold">Hold confirmed until 31/03/2026. No action or contact until then.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-900/30 p-4 rounded-lg border-2 border-green-400">
                <div className="text-green-300 font-bold text-lg min-w-fit">30/03/2026</div>
                <div>
                  <p className="text-white font-bold">✅ SUKHI KAUR REPLIED — SST Secured</p>
                  <p className="text-gray-300 text-sm">Account updated. Said sorry for your loss. Asked: "When are you looking to make a payment?"</p>
                  <p className="text-gray-400 text-xs mt-1">Contact: sukhdip.kaur@natwest.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-900/20 p-4 rounded-lg border-2 border-green-500">
                <div className="text-green-400 font-bold text-lg min-w-fit">31/03/2026</div>
                <div>
                  <p className="text-white font-bold">✅ BRIAN REPLIED TO SUKHI</p>
                  <p className="text-gray-300 text-sm">"Actively working on improving income. Expect to be in position to make a contribution in April/May. Will be in touch as soon as I have a confirmed amount."</p>
                  <p className="text-green-400 font-bold text-sm mt-1">✅ Contact maintained before deadline — account noted</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-amber-900/20 p-4 rounded-lg border-2 border-amber-500">
                <div className="text-amber-400 font-bold text-lg min-w-fit">NOW ⚠️</div>
                <div>
                  <p className="text-white font-bold">NEXT: Contact Sukhi — April/May payment update</p>
                  <p className="text-gray-300 text-sm">You committed to April/May. Now is the time to follow up with whatever you can offer — even a small amount shows good faith.</p>
                  <p className="text-amber-400 font-bold text-sm mt-1">Email: sukhdip.kaur@natwest.com | Ref: 5521482 | 📅 Send NOW — late April, committed to May</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CONTACT INFO */}
        <Card className="bg-black border-2 border-green-500/50">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Phone className="w-6 h-6" />
              NATWEST CONTACTS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
              <p className="text-green-400 font-bold mb-2">Primary Number</p>
              <p className="text-white text-2xl font-mono font-bold mb-1">0800 161 5954</p>
              <p className="text-gray-400 text-sm">Monday-Friday, 8am-5pm (excluding Bank Holidays)</p>
              <p className="text-gray-500 text-xs mt-2">Contact: Raj | SST Secured (Specialised Support Team)</p>
              <p className="text-gray-500 text-xs">Email: SSTSecured@natwest.com</p>
            </div>

            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-cyan-400 font-bold mb-2">Online Chat</p>
              <p className="text-white">Visit: <strong>www.natwest.com/strugglingfinancially</strong></p>
              <p className="text-gray-400 text-sm mt-1">Chat with Cora (AI agent) - available 24/7</p>
            </div>

            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400 font-bold mb-2">Free Support Partners</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• <strong>PayPlan:</strong> 0800 280 2816 (debt advice - FREE)</li>
                <li>• <strong>Relay UK:</strong> 18001 then 0800 161 5954 (if deaf/hard of hearing)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* YOUR ACTION PLAN */}
        <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-purple-300">ACTION PLAN — Before 31/03/2026</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="text-pink-400 font-black text-lg min-w-fit">1.</span>
                <div>
                  <p className="text-white font-bold">🔥 Hold confirmed until 31/03/2026 IN WRITING</p>
                  <p className="text-gray-400 text-sm">Mr J Dempsey confirmed. No action until end of March. You've got breathing room.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 font-black text-lg min-w-fit">2.</span>
                <div>
                  <p className="text-white font-bold">Get income forecast for April</p>
                  <p className="text-gray-400 text-sm">What money is coming in? Be realistic and clear with them.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 font-black text-lg min-w-fit">3.</span>
                <div>
                  <p className="text-white font-bold">Contact Mr J Dempsey BEFORE 31/03/2026</p>
                  <p className="text-gray-400 text-sm">Reply to his email (SSTSecured@natwest.com) OR call 0800 161 5954</p>
                  <p className="text-green-400 text-sm font-bold">His ref: 5521482 — mention it every time</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 font-black text-lg min-w-fit">4.</span>
                <div>
                  <p className="text-white font-bold">Keep communication OPEN</p>
                  <p className="text-gray-400 text-sm">Email AND call. Don't ghost them. They're working WITH you month by month.</p>
                </div>
              </li>
            </ol>

            <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-4 mt-6">
              <p className="text-green-300 font-bold mb-2">✅ NO INITIATING LETTER NEEDED:</p>
              <p className="text-white">They came to YOU in writing. Mr Dempsey confirmed the hold. ~15 days left — no panic, but get your income update ready and reply before 31/03/2026. 🙏</p>
            </div>
          </CardContent>
        </Card>

        {/* OCTOPUS ENERGY */}
        <Card className="bg-gradient-to-r from-orange-900/40 to-yellow-900/40 border-4 border-orange-500">
          <CardHeader>
            <CardTitle className="text-orange-300 flex items-center gap-2">
              🐙 OCTOPUS ENERGY — Account A-37F41968
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            <div className="bg-green-900/30 border-2 border-green-500 rounded-lg p-4">
              <p className="text-green-400 font-black mb-2">✅ CURRENT STATUS — 29 Apr 2026</p>
              <ul className="text-white text-sm space-y-1">
                <li>• <strong>Payment plan agreed:</strong> £10/month for 6 months (review after)</li>
                <li>• <strong>Direct Debit:</strong> 23rd of each month — requested move from Oct 2026 → May 2026</li>
                <li>• <strong>Contact:</strong> Ella (Affordability Specialist) — hello@octopus.energy</li>
                <li>• <strong>Our email:</strong> GLA101@proton.me</li>
              </ul>
            </div>

            <div className="bg-amber-900/30 border-2 border-amber-500 rounded-lg p-4">
              <p className="text-amber-400 font-black mb-2">⏳ AWAITING RESPONSE FROM ELLA</p>
              <ul className="text-sm text-gray-200 space-y-1">
                <li>• Asked Ella to move DD start to <strong>May 23rd</strong> ✅</li>
                <li>• Asked for <strong>assistance completing the Paylink form</strong> (vulnerability/bereavement)</li>
                <li>• Mentioned bereavement + mental health — unlocks <strong>Octo Fund hardship support</strong></li>
                <li>• Paylink form = could lead to debt reduction or write-off via Octo Fund</li>
              </ul>
            </div>

            <div className="bg-purple-900/30 border-2 border-purple-500 rounded-lg p-4">
              <p className="text-purple-400 font-black mb-2">🎯 NEXT STEPS</p>
              <ul className="text-sm text-gray-200 space-y-1">
                <li>1. Wait for Ella to respond (usually 1-3 days)</li>
                <li>2. Complete Paylink form WITH Ella's assistance</li>
                <li>3. Ask specifically about <strong>Octo Fund</strong> — hardship fund for bereavement/MH</li>
                <li>4. Keep paying £10/month — shows good faith</li>
              </ul>
            </div>

            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3">
              <p className="text-cyan-300 text-sm font-bold">💡 KEY FACTS:</p>
              <ul className="text-xs text-gray-300 space-y-1 mt-1">
                <li>• They will NOT cut you off while payment plan is active</li>
                <li>• Ella is an affordability specialist — she's on your side</li>
                <li>• Octo Fund = Octopus's hardship fund — can clear debt for vulnerable customers</li>
                <li>• Always reference Account: <strong>A-37F41968</strong></li>
              </ul>
            </div>

          </CardContent>
        </Card>

        {/* THE REAL TALK */}
        <Card className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/50">
          <CardContent className="p-8">
            <h3 className="text-cyan-300 font-bold text-lg mb-4">💚 REAL TALK</h3>
            <div className="space-y-3 text-gray-200">
              <p>You got a bank to give you 3 months + 30 day breathing space + month-by-month support. That's not failure. That's exceptional negotiation.</p>
              <p>Raj said "we'll continue to work with you and delay the account until your situation improves." That's as good as it gets.</p>
              <p>Yes, interest accrues. But they're giving you TIME. Month by month. That's rare.</p>
              <p>The mortgage won't be repossessed if you keep talking to them. Banks want payment plans, not empty houses.</p>
              <p className="text-cyan-400 font-bold mt-4">⏳ ~15 days left until 31st March deadline. No panic — but don't leave it too late. Reply to Mr Dempsey before the end of March. ♾️❤️</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}