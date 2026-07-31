import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Calendar, AlertCircle, CheckCircle, ClipboardList, Heart, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const EmailLauncher = ({ to, subject, body, label, color = 'cyan' }) => {
  const handleOpen = () => {
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };
  const colorMap = {
    cyan: 'border-cyan-500 text-cyan-400 hover:bg-cyan-500/10',
    green: 'border-green-500 text-green-400 hover:bg-green-500/10',
    amber: 'border-amber-500 text-amber-400 hover:bg-amber-500/10',
  };
  return (
    <button
      onClick={handleOpen}
      className={`w-full flex items-center gap-3 border-2 ${colorMap[color]} bg-black/40 rounded-lg px-5 py-4 font-bold text-left transition-all`}
    >
      <Mail className="w-5 h-5 flex-shrink-0" />
      <div>
        <p className="font-black">{label}</p>
        <p className="text-xs text-gray-400 font-mono mt-0.5">To: {to}</p>
        <p className="text-xs text-gray-400 font-mono">Subject: {subject}</p>
      </div>
    </button>
  );
};

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
          <p className="text-sm text-green-400 font-mono">🔥 UPDATED: 31 Jul 2026 — ✅ JEMMA (SST) REPLIED 30 Jul w/ INCOME & EXPENDITURE FORM · 24 AUG SMI/MI12 REVIEW · FILL FORM 1 SECTION/DAY W/ UF51 · Pattern: £100 May → £200 June → £210 July ✓✓✓ ♾️❤️</p>
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

              <div className="flex items-start gap-4 bg-green-900/20 p-4 rounded-lg border-2 border-green-500">
                <div className="text-green-400 font-bold text-lg min-w-fit">29/04/2026</div>
                <div>
                  <p className="text-white font-bold">✅ FOLLOW-UP EMAIL SENT TO SUKHI</p>
                  <p className="text-gray-300 text-sm">"Working towards a payment. Hoping to confirm a specific amount in May. Will be in touch as soon as in a position to do so."</p>
                  <p className="text-green-400 font-bold text-sm mt-1">✅ Communication maintained — May payment signalled</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-900/20 p-4 rounded-lg border-2 border-green-500">
                <div className="text-green-400 font-bold text-lg min-w-fit">30/04/2026</div>
                <div>
                  <p className="text-white font-bold">✅ NATWEST REPLIED — N Ahmad (SST Secured)</p>
                  <p className="text-gray-300 text-sm">"Thank you for your email. We await contact." — Ball is in your court. They are NOT chasing or threatening. Waiting for you to call when ready to discuss a payment amount.</p>
                  <p className="text-amber-400 font-bold text-sm mt-1">📞 Call when ready: 0800 161 5954 (Mon-Fri 8am-5pm) | Ref: 5521482</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-900/30 p-4 rounded-lg border-2 border-green-400">
                <div className="text-green-400 font-bold text-lg min-w-fit">11/05/2026</div>
                <div>
                  <p className="text-white font-bold">🔥 £100 PAYMENT AGREEMENT — NASIR AKRAM (SST Secured)</p>
                  <p className="text-gray-300 text-sm">You called. Agreed: £100 payment on <strong>23 May 2026</strong>. Nasir acknowledged your mental health progress and confirmed they're working WITH you to address arrears.</p>
                  <p className="text-green-400 font-bold text-sm mt-1">✅ REVIEW DATE: 10 June 2026 — Time to prove you're serious about repayment</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-900/30 p-4 rounded-lg border-2 border-green-400">
                <div className="text-green-300 font-bold text-lg min-w-fit">10/06/2026</div>
                <div>
                  <p className="text-white font-bold">🔥 £200 PAYMENT AGREEMENT — SST Secured</p>
                  <p className="text-gray-300 text-sm">Called on review date. <strong>£200 payment agreed for 23 June 2026.</strong> They accepted the offer. Communication maintained perfectly — two months in a row showing commitment.</p>
                  <p className="text-green-400 font-bold text-sm mt-1">✅ NEXT REVIEW: 10 July 2026 — Keep the pattern going. ♾️❤️</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-900/30 p-4 rounded-lg border-2 border-green-400">
                <div className="text-green-300 font-bold text-lg min-w-fit">12/06/2026</div>
                <div>
                  <p className="text-white font-bold">✅ BRIAN REPLIED TO NARGIS — Confirmation Sent</p>
                  <p className="text-gray-300 text-sm">Replied to SSTSecured@natwest.com confirming the arrangement. Stated: £200 payment on 23rd June, will call on the 23rd to process, will continue monthly updates. Agreement confirmed in writing from our side.</p>
                  <p className="text-green-400 font-bold text-sm mt-1">✅ Both sides now have the arrangement confirmed in writing ♾️</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-900/30 p-4 rounded-lg border-4 border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                <div className="text-green-300 font-bold text-lg min-w-fit">22/06/2026</div>
                <div>
                  <p className="text-white font-bold">✅ £800 BENEFITS LANDED — PAYMENT READY</p>
                  <p className="text-gray-300 text-sm">Benefits payment received. <strong>£200 ready to pay NatWest tomorrow (23 June).</strong> Leaves £600 breathing room.</p>
                  <p className="text-green-400 font-bold text-sm mt-1">✅ Pattern holding: £100 May → £200 June → building trust payment by payment</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-900/30 p-4 rounded-lg border-4 border-green-500 shadow-[0_0_60px_rgba(34,197,94,0.6)]">
                <div className="text-green-300 font-bold text-lg min-w-fit">23/06/2026</div>
                <div>
                  <p className="text-white font-black">🔥 £200 PAID & CONFIRMED BY NATWEST ✓✓</p>
                  <p className="text-gray-200 text-sm">Called 0800 161 5954. Paid £200. <strong>Abdul (Specialist Support Team)</strong> confirmed in writing: "Your payment of £200 has been successfully received today (23 June) in line with your agreed arrangement. Your account has been updated accordingly."</p>
                  <p className="text-green-400 font-bold text-sm mt-1">✅ TWO MONTHS IN A ROW. £100 May ✓ → £200 June ✓. Trust building. Next review: 10 July 2026.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-amber-900/30 p-4 rounded-lg border-4 border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.4)]">
                <div className="text-amber-300 font-bold text-lg min-w-fit">10/07/2026</div>
                <div>
                  <p className="text-white font-bold">⚠️ REVIEW CALL — "IT CAN'T GO ON"</p>
                  <p className="text-gray-200 text-sm">Called for July review. <strong>£210 agreed for 23 July 2026.</strong> SST warned: "This can't go on indefinitely" — legal letter may follow. They don't want it to get there. Neither do we.</p>
                  <p className="text-amber-400 font-bold text-sm mt-1">🚨 THIS IS THE WAKE-UP CALL: Monthly "pay what I can" has run its course. They now want a FIXED repayment plan. Time to get serious about a long-term proposal AND get free debt advice.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-900/30 p-4 rounded-lg border-4 border-green-500 shadow-[0_0_60px_rgba(34,197,94,0.6)]">
                <div className="text-green-300 font-bold text-lg min-w-fit">22/07/2026</div>
                <div>
                  <p className="text-white font-black">🔥 £210 PAID & CONFIRMED BY NARGIS ✓✓✓</p>
                  <p className="text-gray-200 text-sm">Called 0800 161 5954. Paid £210. <strong>Nargis (Specialist Support Team)</strong> sent written confirmation email (10:42, to GLA101@proton.me): "I can confirm that a payment of <strong>£210.00</strong> has been successfully received and applied to your mortgage account."</p>
                  <p className="text-green-400 font-bold text-sm mt-1">✅ THREE MONTHS IN A ROW. £100 May ✓ → £200 June ✓ → £210 July ✓. Pattern holding. Trust building.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-cyan-900/30 p-4 rounded-lg border-4 border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                <div className="text-cyan-300 font-bold text-lg min-w-fit">22/07/2026</div>
                <div>
                  <p className="text-white font-bold">📞 48-HOUR CALLBACK ARRANGED — SST TEAM</p>
                  <p className="text-gray-200 text-sm">Nargis arranged for <strong>someone</strong> from the Specialist Support Team to call back <strong>within 48 hours</strong> — callback to number ending <strong>328</strong>. Purpose: discuss circumstances further, review Universal Credit update (SMI enquiry), and agree next steps on the mortgage account.</p>
                  <p className="text-cyan-400 font-bold text-sm mt-1">🎯 WHEN THEY CALL: Ask for a dedicated case manager so you always speak to the same person. Also give them the UC/SMI update.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-cyan-900/30 p-4 rounded-lg border-4 border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                <div className="text-cyan-300 font-bold text-lg min-w-fit">22/07/2026</div>
                <div>
                  <p className="text-white font-bold">✉️ FOLLOW-UP EMAIL SENT TO JEMMA — SST Secured</p>
                  <p className="text-gray-200 text-sm">After the call with Nargis, spoke to <strong>Jemma (SST)</strong> and sent a follow-up email (13:56, from GLA101@proton.me) thanking her, asking for a <strong>dedicated contact</strong> going forward, and asking to explore <strong>capitalising the arrears or extending the term</strong> while the SMI/MI12 is processed. Expressed anxiety about "beyond the 24th" and not wanting to let anyone down.</p>
                  <p className="text-cyan-400 font-bold text-sm mt-1">✅ Both asks put in writing — ball in their court to confirm options</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-green-900/30 p-4 rounded-lg border-4 border-green-500 shadow-[0_0_60px_rgba(34,197,94,0.6)]">
                <div className="text-green-300 font-bold text-lg min-w-fit">30/07/2026</div>
                <div>
                  <p className="text-white font-black">🔥 JEMMA REPLIED — FORM SENT + OPTIONS CONFIRMED ✓</p>
                  <p className="text-gray-200 text-sm"><strong>Jemma (SST)</strong> replied explaining: (1) the team works as a unit — can't promise one dedicated contact due to shift patterns, but notes are saved on file and you <strong>can ask for a specific agent</strong> when you call; (2) they <strong>CAN explore capitalising arrears / extending term NOW</strong>, no need to wait for SMI — they just need your income & expenditure details first; (3) SMI first gives extra income + makes figures accurate, but it's <strong>your choice</strong> on order. Attached: <strong>Income & Expenditure form (L1762 v1, 49KB Word doc)</strong>.</p>
                  <p className="text-green-400 font-bold text-sm mt-1">✅ GOOD NEWS: Bank offering help, sending forms, explaining options gently — they want to keep you in your home</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-amber-900/30 p-4 rounded-lg border-4 border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.4)]">
                <div className="text-amber-300 font-bold text-lg min-w-fit">24/08/2026</div>
                <div>
                  <p className="text-white font-bold">📅 SMI / MI12 REVIEW DATE — (NOT a deadline, a checkpoint)</p>
                  <p className="text-gray-200 text-sm">Support for Mortgage Interest claim review. <strong>Nothing ends on the 24th</strong> — it's a review, not a cliff. Reviews get moved, options get added. Jemma confirmed they can explore capitalisation/term extension <strong>before</strong> this date once the I&E form is in.</p>
                  <p className="text-amber-400 font-bold text-sm mt-1">🎯 GOAL: Fill I&E form over the next 1-2 weeks (1 section/day with UF51) so options are on the table at/after review</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-blue-900/20 p-4 rounded-lg border-2 border-blue-500">
                <div className="text-blue-400 font-bold text-lg min-w-fit">📊 NEXT PHASE</div>
                <div>
                  <p className="text-white font-bold">Fill in the Income & Expenditure form (1 section/day with UF51). Then explore capitalisation / term extension with Jemma before the 24 Aug review.</p>
                  <p className="text-gray-300 text-sm">The form says on page 1: "You don't need to total it up — we'll go through it on the call." So you fill in what you know, leave the rest blank, and <strong>they help you finish it on the call</strong>. That's the bank's own design. Most rows will be blank for you — that's normal. Send Jemma a short reply acknowledging the form first, then work through it gently over the next 1-2 weeks.</p>
                  <p className="text-blue-400 font-bold text-sm mt-1">🎯 GOAL: Form mostly filled before 24 Aug review · Ask Jemma to walk through gaps on a call · Get free debt advice (PayPlan 0800 280 2816) to strengthen your position.</p>
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

        {/* QUICK EMAIL LAUNCHERS */}
        <Card className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center gap-2">
              <Mail className="w-6 h-6" />
              QUICK EMAIL LAUNCHERS — Opens in YOUR email app
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-400 text-sm">Tap to open a pre-filled draft in your own email client (Proton Mail etc). You review, edit if needed, then send. Nothing sent automatically. ✅</p>

            <EmailLauncher
              to="sukhdip.kaur@natwest.com"
              subject="Ref: 5521482 — Payment Update"
              body={`Good afternoon Sukhi,\n\nI'm writing to follow up on ref 5521482. I'm still working towards making a payment and am hoping to confirm a specific amount in May. I'll be in touch as soon as I'm in a position to do so.\n\nThank you for your continued patience.\n\nKind regards,\nBrian Hughes\nRef: 5521482`}
              label="✉️ Follow-up to Sukhi Kaur — NatWest"
              color="cyan"
            />

            <EmailLauncher
              to="SSTSecured@natwest.com"
              subject="Ref: 5521482 — Payment Contribution"
              body={`Good afternoon,\n\nI'm writing regarding ref 5521482. I'm pleased to confirm I'm now in a position to make a payment contribution. Please could you advise on the best way to proceed?\n\nKind regards,\nBrian Hughes\nRef: 5521482`}
              label="✉️ Payment Contribution — SST NatWest General"
              color="green"
            />

            <EmailLauncher
              to="hello@octopus.energy"
              subject="Account A-37F41968 — Payment Plan & Paylink Assistance"
              body={`Good afternoon,\n\nI'm writing regarding my account A-37F41968. I wanted to follow up on my payment plan (£10/month) and ask for assistance completing the Paylink hardship assessment form. I am going through bereavement and have been struggling with my mental health, and I understand this may make me eligible for additional support via the Octo Fund.\n\nPlease could you advise on next steps?\n\nKind regards,\nBrian Hughes\nAccount: A-37F41968\nEmail: GLA101@proton.me`}
              label="🐙 Follow-up to Ella — Octopus Energy"
              color="amber"
            />
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
              <p className="text-green-400 font-black mb-2">✅ CURRENT STATUS — 1 May 2026</p>
              <ul className="text-white text-sm space-y-1">
                <li>• <strong>Payment plan agreed:</strong> £10/month for 6 months (review after)</li>
                <li>• <strong>Direct Debit:</strong> ✅ CONFIRMED moved to <strong>23rd May 2026</strong> — Ella sorted it</li>
                <li>• <strong>Paylink form:</strong> Ella offered to do it WITH you on a call (Mon-Fri after 4pm)</li>
                <li>• <strong>Contact:</strong> Ella (Affordability Specialist) — hello@octopus.energy</li>
                <li>• <strong>Our email:</strong> GLA101@proton.me</li>
              </ul>
            </div>

            <div className="bg-green-900/30 border-2 border-green-500 rounded-lg p-4">
              <p className="text-green-400 font-black mb-2">✅ ELLA REPLIED (29 Apr) — SHE'S ON YOUR SIDE</p>
              <ul className="text-sm text-gray-200 space-y-1">
                <li>• DD moved to <strong>23rd May ✅</strong> — confirmed</li>
                <li>• Said: <em>"Please make sure your mental health is at the top of your list of priorities"</em> 💚</li>
                <li>• Offered to call you and fill in Paylink form FOR you — just have income/expenditure ready</li>
                <li>• Paylink form = path to <strong>Octo Fund hardship write-off</strong></li>
              </ul>
            </div>

            <div className="bg-amber-900/30 border-2 border-amber-500 rounded-lg p-4">
              <p className="text-amber-400 font-black mb-2">⏳ ACTION — REPLY TO ELLA & BOOK THE CALL</p>
              <ul className="text-sm text-gray-200 space-y-1">
                <li>• Reply saying any day next week after 4pm works</li>
                <li>• Prepare: monthly income + monthly outgoings (rough is fine)</li>
                <li>• She'll fill the Paylink form FOR you on the call</li>
                <li>• This could lead to <strong>debt reduction or write-off via Octo Fund</strong></li>
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

        {/* SANTANDER OVERDRAFT */}
        <Card className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border-4 border-red-500">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center gap-2">
              🏦 SANTANDER — Overdraft £1,600 | Breathing Space ENDED 05/06/2026
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            <div className="bg-green-900/30 border-2 border-green-400 rounded-lg p-4">
              <p className="text-green-300 font-black mb-2">✅ 12/06/2026 — EMAIL SENT TO SANTANDER</p>
              <p className="text-gray-200 text-sm">Replied to Breathing Space email requesting affordable repayment arrangement. Asked for: reduced monthly plan, freeze on interest/charges, formal Overdraft Reduction Plan. Mentioned bereavement and mental health.</p>
            </div>

            <div className="bg-amber-900/30 border-2 border-amber-400 rounded-lg p-4">
              <p className="text-amber-300 font-black mb-2">📞 12/06/2026 — SANTANDER REPLIED: PHONE ONLY</p>
              <p className="text-gray-200 text-sm">Auto-reply confirmed they do not accept inbound emails. <strong>Must call to arrange repayment plan.</strong></p>
              <p className="text-amber-300 text-sm font-bold mt-2">📞 Call: <span className="text-white">0800 011 3142</span> — Santander Financial Support</p>
              <p className="text-gray-400 text-xs mt-1">Say: "I'd like to set up an affordable repayment arrangement for my overdraft. I'm in financial difficulty due to bereavement and mental health challenges."</p>
            </div>

            <div className="bg-green-900/30 border-4 border-green-500 rounded-lg p-4 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
              <p className="text-green-300 font-black mb-2">✅ 22/06/2026 — ARRANGEMENT AGREED ON THE PHONE</p>
              <ul className="text-white text-sm space-y-1">
                <li>• <strong>£40/month</strong> overdraft reduction plan — agreed ✅</li>
                <li>• <strong>No new account</strong> — told them, they accepted ✅</li>
                <li>• Santander seemed happy with the arrangement</li>
                <li>• <strong>NEXT:</strong> Email financialsupport@santander.co.uk to get it confirmed in writing</li>
              </ul>
            </div>

            <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-4">
              <p className="text-red-300 font-black mb-2">⚠️ PREVIOUS STATUS — 12 June 2026</p>
              <ul className="text-white text-sm space-y-1">
                <li>• <strong>Breathing Space ended:</strong> 05 June 2026 — they sent email to confirm</li>
                <li>• <strong>Overdraft amount:</strong> £1,600 (going over due to overdraft charges)</li>
                <li>• <strong>They suggested:</strong> Close account + open new one — DO NOT do this yet</li>
                <li>• <strong>Interest/charges:</strong> Were frozen during Breathing Space — may restart</li>
                <li>• <strong>Status:</strong> Waiting to hear from you — no legal action yet</li>
              </ul>
            </div>

            <div className="bg-amber-900/30 border-2 border-amber-500 rounded-lg p-4">
              <p className="text-amber-400 font-black mb-2">🚨 DO NOT CLOSE ACCOUNT YET</p>
              <p className="text-sm text-gray-200">If you close the account, the £1,600 overdraft becomes an <strong>immediate debt they'll chase hard</strong>. Only close if they agree IN WRITING to freeze it and let you repay at an affordable rate with no further charges.</p>
            </div>

            <div className="bg-green-900/30 border-2 border-green-500 rounded-lg p-4">
              <p className="text-green-400 font-black mb-2">✅ WHAT TO DO — Call them first</p>
              <ul className="text-sm text-gray-200 space-y-1">
                <li>📞 <strong>0800 011 3142</strong> — Santander Financial Support Team</li>
                <li>• Ask for: <strong>Reduced repayment plan</strong> (even £20-£50/month)</li>
                <li>• Ask for: <strong>Freeze interest and charges</strong> (they were already doing it)</li>
                <li>• Ask for: <strong>Overdraft Reduction Plan</strong> (formal arrangement)</li>
                <li>• Mention: mental health difficulties, bereavement, financial hardship</li>
              </ul>
            </div>

            <div className="bg-blue-900/30 border-2 border-blue-500 rounded-lg p-4">
              <p className="text-blue-400 font-black mb-2">📝 WHAT TO SAY ON THE CALL</p>
              <p className="text-sm text-gray-200 italic">"I'm calling regarding my account. My breathing space has ended and I'd like to discuss an affordable repayment arrangement for my overdraft. I'm experiencing financial difficulty and mental health challenges but I want to work with you to find a solution."</p>
            </div>

            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3">
              <p className="text-cyan-300 text-sm font-bold">💡 KEY STRATEGY:</p>
              <ul className="text-xs text-gray-300 space-y-1 mt-1">
                <li>• Same approach as NatWest — it worked there, it'll work here</li>
                <li>• Santander are legally obligated to treat you fairly under FCA vulnerable customer rules</li>
                <li>• Even £20/month is better than no arrangement — they'll accept it</li>
                <li>• Get everything confirmed in writing by email after any call</li>
              </ul>
            </div>

          </CardContent>
        </Card>

        {/* SANTANDER EMAIL LAUNCHER */}
        <Card className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border-2 border-red-500">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center gap-2">
              <Mail className="w-6 h-6" />
              SANTANDER — Quick Email (if you prefer email over phone)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-400 text-sm">Tap to open a pre-filled draft. You review and send from your own email. ✅</p>
            <EmailLauncher
              to="financialsupport@santander.co.uk"
              subject="Account Holder — Overdraft Repayment Arrangement Request"
              body={`Dear Santander Financial Support Team,\n\nI am writing to request an affordable repayment arrangement for my overdraft following the end of my Breathing Space period on 05 June 2026.\n\nI have been experiencing significant financial difficulty due to bereavement and mental health challenges. I am committed to resolving this and would like to discuss:\n\n1. A reduced monthly repayment plan\n2. Continuation of the interest and charges freeze\n3. A formal Overdraft Reduction Plan\n\nI am happy to discuss my income and expenditure in detail. Please could you contact me to discuss the best way forward?\n\nKind regards,\nBrian Hughes\nPlease contact: GLA101@proton.me`}
              label="✉️ Repayment Arrangement Request — Santander Financial Support"
              color="amber"
            />
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