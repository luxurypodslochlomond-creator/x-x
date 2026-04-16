import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Shield, Phone, Mail, FileText, AlertTriangle, CheckCircle, Clock, Plus, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

// Key case facts - hardcoded from the letters
const CASE_FACTS = {
  name: 'Miss G Brown',
  address: 'Upper Stoneymollan Cottage, Upper Stoneymollan Road, Alexandria, G83 8QU',
  taxRef: '23880 38313',
  paymentRef: '2388038313K',
  utrRef: 'JE042148A',
  totalOwed: '£26,414.22',
  penalty: '£1,311',
  penaltyDeadline: '2026-04-27',
  hmrcPhone: '0300 200 3310',
  appealsPhone: '0300 200 3820',
  hmrcAddress: 'HMRC Self Assessment, BX9 1AS',
  appealUrl: 'www.hmrc.gov.uk/sa',
  bankSort: '08-32-10',
  bankAccount: '12001039',
  bankName: 'HMRC Cumbernauld',
};

const TIMELINE = [
  { date: '2024-02-29', type: 'statement', label: 'Balance brought forward', amount: '£3,243.05', status: 'info' },
  { date: '2024-04-18', type: 'penalty', label: '30-day late payment penalty for 22/23', amount: '£89.00', status: 'warning' },
  { date: '2024-08-01', type: 'payment', label: 'Payment received', amount: '-£3,427.83', status: 'good' },
  { date: '2025-02-01', type: 'payment', label: 'Payment received', amount: '-£236.38', status: 'good' },
  { date: '2026-01-31', type: 'due', label: 'Balancing payment due year 24/25', amount: '£26,222.64', status: 'danger' },
  { date: '2026-03-04', type: 'interest', label: 'Interest added', amount: '£287.36', status: 'warning' },
  { date: '2026-03-17', type: 'penalty', label: 'Penalty notice issued (30 days late)', amount: '£1,311', status: 'danger' },
  { date: '2026-04-16', type: 'call', label: 'Gill called HMRC — £100 paid, Time to Pay accepted temporarily', amount: '-£100', status: 'good' },
  { date: '2026-04-27', type: 'deadline', label: '⚠️ APPEAL DEADLINE — must submit before this date', amount: '', status: 'urgent' },
];

const statusColors = {
  info: 'border-blue-500 bg-blue-500/10 text-blue-300',
  warning: 'border-amber-500 bg-amber-500/10 text-amber-300',
  good: 'border-green-500 bg-green-500/10 text-green-300',
  danger: 'border-red-500 bg-red-500/10 text-red-300',
  urgent: 'border-pink-500 bg-pink-500/10 text-pink-300 animate-pulse',
};

const typeIcons = {
  call: Phone,
  letter: Mail,
  penalty: AlertTriangle,
  payment: CheckCircle,
  deadline: Clock,
  due: FileText,
  statement: FileText,
  interest: AlertTriangle,
};

export default function AdminHMRCTracker() {
  const [user, setUser] = useState(null);
  const [showAddLog, setShowAddLog] = useState(false);
  const [showAppealLetter, setShowAppealLetter] = useState(false);
  const [logEntry, setLogEntry] = useState({ date: '', type: 'call', label: '', amount: '', notes: '' });
  const [customLogs, setCustomLogs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hmrc_logs') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const daysUntilDeadline = Math.ceil((new Date('2026-04-27') - new Date()) / (1000 * 60 * 60 * 24));

  const addLog = () => {
    if (!logEntry.date || !logEntry.label) return;
    const updated = [...customLogs, { ...logEntry, id: Date.now() }];
    setCustomLogs(updated);
    localStorage.setItem('hmrc_logs', JSON.stringify(updated));
    setLogEntry({ date: '', type: 'call', label: '', amount: '', notes: '' });
    setShowAddLog(false);
  };

  const allTimeline = [...TIMELINE, ...customLogs.map(l => ({ ...l, status: 'info' }))]
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-400 font-mono">Admin access required</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="border-2 border-red-500 bg-red-500/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-red-400" />
            <h1 className="text-2xl font-black text-white font-mono">HMRC CASE TRACKER</h1>
          </div>
          <p className="text-red-300 font-mono text-sm">Miss G Brown · Tax Ref: 23880 38313 · CONFIDENTIAL</p>
        </div>

        {/* URGENT DEADLINE BANNER */}
        {daysUntilDeadline > 0 && (
          <motion.div
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="border-2 border-pink-500 bg-pink-500/20 p-4 flex items-center gap-4"
          >
            <AlertTriangle className="w-8 h-8 text-pink-400 flex-shrink-0" />
            <div>
              <p className="text-pink-300 font-black font-mono text-lg">APPEAL DEADLINE: 27 APRIL 2026</p>
              <p className="text-pink-200 font-mono text-sm">{daysUntilDeadline} days remaining · Appeal £1,311 penalty at www.hmrc.gov.uk/sa</p>
            </div>
          </motion.div>
        )}

        {/* KEY FACTS */}
        <div className="border border-cyan-500/30 bg-cyan-500/5 p-6">
          <h2 className="text-cyan-400 font-black font-mono mb-4">📋 KEY CASE FACTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-mono">
            {[
              ['Name', CASE_FACTS.name],
              ['Tax Reference', CASE_FACTS.taxRef],
              ['Payment Reference', CASE_FACTS.paymentRef],
              ['UTR Reference', CASE_FACTS.utrRef],
              ['Total Owed', CASE_FACTS.totalOwed],
              ['Penalty', CASE_FACTS.penalty],
              ['HMRC Enquiries', CASE_FACTS.hmrcPhone],
              ['HMRC Appeals', CASE_FACTS.appealsPhone],
              ['Bank Sort Code', CASE_FACTS.bankSort],
              ['Bank Account', CASE_FACTS.bankAccount],
              ['Bank Name', CASE_FACTS.bankName],
              ['Appeal URL', CASE_FACTS.appealUrl],
            ].map(([key, val]) => (
              <div key={key} className="flex gap-2">
                <span className="text-gray-500 w-36 flex-shrink-0">{key}:</span>
                <span className="text-white">{val}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs font-mono mt-3">Address: {CASE_FACTS.address}</p>
        </div>

        {/* TIMELINE */}
        <div className="border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-black font-mono">📅 FULL TIMELINE</h2>
            <button
              onClick={() => setShowAddLog(!showAddLog)}
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-2 text-sm font-mono font-bold"
            >
              <Plus className="w-4 h-4" /> Log Entry
            </button>
          </div>

          {showAddLog && (
            <div className="border border-cyan-500/40 bg-cyan-500/5 p-4 mb-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={logEntry.date} onChange={e => setLogEntry({...logEntry, date: e.target.value})}
                  className="bg-black border border-white/20 text-white px-3 py-2 text-sm font-mono" />
                <select value={logEntry.type} onChange={e => setLogEntry({...logEntry, type: e.target.value})}
                  className="bg-black border border-white/20 text-white px-3 py-2 text-sm font-mono">
                  <option value="call">📞 Phone Call</option>
                  <option value="letter">✉️ Letter</option>
                  <option value="payment">💳 Payment</option>
                  <option value="penalty">⚠️ Penalty</option>
                  <option value="deadline">⏰ Deadline</option>
                </select>
              </div>
              <input placeholder="What happened?" value={logEntry.label} onChange={e => setLogEntry({...logEntry, label: e.target.value})}
                className="w-full bg-black border border-white/20 text-white px-3 py-2 text-sm font-mono" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Amount (e.g. £100)" value={logEntry.amount} onChange={e => setLogEntry({...logEntry, amount: e.target.value})}
                  className="bg-black border border-white/20 text-white px-3 py-2 text-sm font-mono" />
                <input placeholder="Extra notes" value={logEntry.notes} onChange={e => setLogEntry({...logEntry, notes: e.target.value})}
                  className="bg-black border border-white/20 text-white px-3 py-2 text-sm font-mono" />
              </div>
              <button onClick={addLog} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-mono font-bold">
                SAVE LOG ENTRY
              </button>
            </div>
          )}

          <div className="space-y-3">
            {allTimeline.map((item, i) => {
              const Icon = typeIcons[item.type] || FileText;
              return (
                <div key={i} className={`border-l-4 pl-4 py-2 ${statusColors[item.status] || statusColors.info}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-mono text-sm font-bold">{item.label}</p>
                        {item.notes && <p className="text-xs text-gray-400 font-mono mt-1">{item.notes}</p>}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {item.amount && <p className="font-mono text-sm font-bold">{item.amount}</p>}
                      <p className="font-mono text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* APPEAL LETTER */}
        <div className="border border-amber-500/30 bg-amber-500/5 p-6">
          <button onClick={() => setShowAppealLetter(!showAppealLetter)} className="w-full flex items-center justify-between">
            <h2 className="text-amber-400 font-black font-mono">✉️ APPEAL LETTER (READY TO SEND)</h2>
            {showAppealLetter ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5 text-amber-400" />}
          </button>
          {showAppealLetter && (
            <div className="mt-4 bg-black border border-white/10 p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
{`Miss G Brown
Upper Stoneymollan Cottage
Upper Stoneymollan Road
Alexandria, G83 8QU

Date: 16 April 2026

HM Revenue & Customs
Self Assessment
BX9 1AS

Re: Appeal against Late Payment Penalty — Tax Reference 23880 38313
Penalty Notice dated 17 March 2026 — £1,311

Dear Sir or Madam,

I am writing to formally appeal the late payment penalty of £1,311 issued on 17 March 2026, for the tax year ended 5 April 2025, under the grounds of special circumstances.

Grounds for Appeal:

During the period in which payment became due, I experienced exceptional personal circumstances which made it impossible for me to meet my tax obligations on time:

1. Bereavement — I suffered the loss of a close family member who was a significant source of emotional and practical support to our household. This loss had a profound impact on my ability to manage financial and administrative matters during this period.

2. Health difficulties — Our household has been affected by serious health issues which have significantly impacted our capacity and resources.

3. Financial hardship — As a result of the above, I have faced severe financial hardship whilst caring for two dependent children.

I want to be clear that I take my tax obligations seriously. I have already contacted HMRC and made an initial payment, and I am committed to repaying the full amount owed through an agreed Time to Pay arrangement.

I respectfully request that the penalty of £1,311 be cancelled or reduced under special circumstances, in accordance with Section 102 of the Finance Act 2009.

Yours faithfully,

Miss G Brown
Tax Reference: 23880 38313`}
            </div>
          )}
          <p className="text-amber-300/70 text-xs font-mono mt-3">Submit online: gov.uk → Self Assessment → Appeal a penalty · OR post to BX9 1AS · OR call 0300 200 3820</p>
        </div>

        {/* NEXT ACTIONS */}
        <div className="border border-green-500/30 bg-green-500/5 p-6">
          <h2 className="text-green-400 font-black font-mono mb-4">✅ NEXT ACTIONS</h2>
          <div className="space-y-3">
            {[
              { urgent: true, text: 'Submit appeal for £1,311 penalty BEFORE 27 April 2026', how: 'gov.uk → Self Assessment → Appeal a penalty' },
              { urgent: false, text: 'Continue £100/month Time to Pay payments', how: 'Sort: 08-32-10, Acc: 12001039, Ref: 2388038313K' },
              { urgent: false, text: 'Call to formalise Time to Pay arrangement', how: '0300 200 3820 — ask for affordable monthly instalments' },
              { urgent: false, text: 'Log every call and payment here', how: 'Use the + Log Entry button above' },
            ].map((action, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 border ${action.urgent ? 'border-pink-500/50 bg-pink-500/10' : 'border-white/10'}`}>
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${action.urgent ? 'bg-pink-400' : 'bg-green-400'}`} />
                <div>
                  <p className="font-mono text-sm font-bold text-white">{action.text}</p>
                  <p className="font-mono text-xs text-gray-400 mt-1">{action.how}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}