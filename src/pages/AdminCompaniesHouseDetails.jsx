import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Building, User, FileText, CheckCircle, ExternalLink, Key } from 'lucide-react';

export default function AdminCompaniesHouseDetailsPage() {
  const [vault, setVault] = useState({});

  // The logins live in the admin-only vault now - this page only reads them,
  // so nothing is written into this page's own code.
  useEffect(() => {
    base44.entities.SecureVault.list('sort_order', 200)
      .then(rows => setVault(Object.fromEntries((Array.isArray(rows) ? rows : rows?.items || []).map(r => [r.label, r.value]))))
      .catch(() => setVault({}));
  }, []);

  const fromVault = (label) => vault[label] || '\u2014';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* The reminder that arrived on 20 November carries a date, a penalty and a personal
            responsibility on a named director. It belongs above the paperwork, not below it. */}
        <Link
          to="/AdminCompaniesHouseFiling"
          className="block border-2 border-red-400 bg-red-900/30 px-4 py-3 hover:bg-red-900/50 transition-colors"
        >
          <p className="text-red-300 font-black text-sm uppercase tracking-widest">Confirmation statement · due 2 December 2026</p>
          <p className="text-white text-sm mt-1">Seven steps, with the company number, both personal codes and the Gateway logins already beside them. Open the filing →</p>
        </Link>

        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="w-12 h-12 text-green-400" />
            <h1 className="text-4xl font-black">COMPANIES HOUSE DETAILS</h1>
          </div>
          <p className="text-green-400 text-lg font-bold">
            ✅ REGISTERED • SC870603 • ASSET-LOCKED CIC
          </p>
          <p className="text-gray-400 text-sm">
            Last updated: 19 November 2025
          </p>
        </div>

        {/* OFFICIAL DOCUMENTS RECEIVED */}
        <Card className="bg-purple-900/40 border-2 border-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-black text-purple-400">OFFICIAL DOCUMENTS RECEIVED</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-black/60 border border-purple-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">Certificate of Incorporation</h3>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="space-y-1 text-sm text-gray-300">
                  <p><strong className="text-purple-400">Document:</strong> Certificate of Incorporation of a Community Interest Company</p>
                  <p><strong className="text-purple-400">Company Number:</strong> 870603</p>
                  <p><strong className="text-purple-400">Company Name:</strong> UNIVERSAL FREQUENCY51 CIC</p>
                  <p><strong className="text-purple-400">Registration Date:</strong> 19th November 2025</p>
                  <p><strong className="text-purple-400">Issued By:</strong> Registrar of Companies for Scotland, Edinburgh</p>
                  <p><strong className="text-purple-400">Authentication:</strong> Electronic authentication under section 1115 of the Companies Act 2006</p>
                  <p className="text-xs text-gray-500 mt-2">📄 Received: 19/11/2025 11:37 via email to family@uf51.love</p>
                </div>
              </div>

              <div className="bg-black/60 border border-purple-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">Memorandum of Association</h3>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="space-y-1 text-sm text-gray-300">
                  <p><strong className="text-purple-400">Document:</strong> Company Not Having Share Capital</p>
                  <p><strong className="text-purple-400">Subscribers:</strong> Brian Hughes (Authenticated Electronically), Gillian Brown (Authenticated Electronically)</p>
                  <p><strong className="text-purple-400">Dated:</strong> 18/11/2025</p>
                  <p><strong className="text-purple-400">Purpose:</strong> Formation of company under Companies Act 2006</p>
                  <p><strong className="text-purple-400">Official Seal:</strong> Companies House Seal of the Registrar of Companies</p>
                  <p className="text-xs text-gray-500 mt-2">📄 Received: 19/11/2025 11:37 via email to family@uf51.love</p>
                </div>
              </div>
            </div>

            <div className="bg-green-900/30 border-2 border-green-500 rounded-xl p-3 mt-4">
              <p className="text-green-300 font-bold text-center text-sm">
                ✅ COMPLETE OFFICIAL DOCUMENTATION SET SECURED
              </p>
              <p className="text-xs text-gray-400 text-center mt-1">
                All documents authenticated by Registrar of Companies. Stored securely. Admin access only.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* REGISTRATION STATUS */}
        <Card className="bg-green-900/40 border-2 border-green-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <h2 className="text-2xl font-black text-green-400">✅ REGISTERED</h2>
            </div>
            <div className="space-y-3 text-base">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Company Number</p>
                  <p className="text-4xl font-mono font-black text-green-300">SC870603</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Incorporation Date</p>
                  <p className="text-2xl font-bold text-white">19 November 2025</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-gray-400 text-sm">Company Type</p>
                  <p className="text-2xl font-bold text-white">Private Limited by Guarantee</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">CIC Status</p>
                  <p className="text-2xl font-bold text-green-400">Asset-Locked</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-gray-400 text-sm">Companies House Submission</p>
                  <p className="text-2xl font-mono font-black text-green-300">111-693557</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Corporation Tax Registration</p>
                  <p className="text-2xl font-mono font-black text-green-300">BRCT0000358715B</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-gray-400 text-sm">Corporation Tax Activation Code</p>
                  <p className="text-2xl font-mono font-black text-cyan-300">863883389524</p>
                  <p className="text-xs text-gray-400 mt-1">Expires: 01/12/2025</p>
                </div>
              </div>
              <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 mt-4">
                <p className="text-sm text-green-300 font-bold mb-2">
                  ✅ REGISTRATION COMPLETE
                </p>
                <ul className="text-xs text-gray-300 mt-2 space-y-1 list-disc list-inside">
                  <li>Certificate of Incorporation received</li>
                  <li>Memorandum of Association received</li>
                  <li>eReminder Service activated for family@uf51.love</li>
                  <li>VAT registration now available</li>
                  <li>Bank account setup unlocked (Revolut/Stripe)</li>
                  <li>Grant applications unlocked</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GOVERNMENT GATEWAY LOGIN */}
        <Card className="bg-green-900/40 border-2 border-green-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-8 h-8 text-green-400" />
              <h2 className="text-2xl font-black text-green-400">GOVERNMENT GATEWAY LOGIN</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Gateway User ID</p>
                <p className="text-4xl font-mono font-black text-green-300">{fromVault('Login A - Gateway user ID')}</p>
                <p className="text-xs text-gray-400 mt-3">Sent to: family@uf51.love</p>
              </div>

              <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Passwords</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-400">Password 1:</p>
                    <p className="text-2xl font-mono font-black text-green-300">{fromVault('Login A - Password 1')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Password 2:</p>
                    <p className="text-2xl font-mono font-black text-green-300">{fromVault('Login A - Password 2')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-3 mt-4">
                <p className="text-xs text-yellow-300">
                  <strong>🔐 SECURITY:</strong> Admin-only page. Brian + Gill can now login to Companies House anytime.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PERSONAL CODES */}
        <Card className="bg-cyan-900/40 border-2 border-cyan-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-8 h-8 text-cyan-400" />
              <h2 className="text-2xl font-black text-cyan-400">PERSONAL CODES (11-CHARACTER)</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-cyan-900/30 border border-cyan-500/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Brian Hughes</p>
                <p className="text-3xl font-mono font-black text-cyan-300">{fromVault('Brian Hughes - personal code')}</p>
                <p className="text-xs text-gray-400 mt-2">DOB: {fromVault('Brian Hughes - date of birth')}</p>
              </div>
              <div className="bg-cyan-900/30 border border-cyan-500/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-2">Gillian Barbara Brown</p>
                <p className="text-3xl font-mono font-black text-cyan-300">{fromVault('Gillian Barbara Brown - personal code')}</p>
                <p className="text-xs text-gray-400 mt-2">DOB: {fromVault('Gillian Barbara Brown - date of birth')}</p>
              </div>
              <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-3 mt-4">
                <p className="text-xs text-yellow-300">
                  <strong>⚠️ SECURITY:</strong> These codes are like passwords. Only share with people you trust for company filings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* COMPANY DETAILS */}
        <Card className="bg-purple-900/40 border-2 border-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-black text-purple-400">COMPANY DETAILS</h2>
            </div>
            <div className="space-y-3 text-base">
              <div>
                <p className="text-gray-400 text-sm">Legal Name</p>
                <p className="text-2xl font-black text-purple-300">UNIVERSAL FREQUENCY51 CIC</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Company Number</p>
                <p className="text-3xl font-mono font-black text-green-400">SC870603</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Company Type</p>
                <p className="text-lg font-bold text-white">Community Interest Company (CIC)</p>
                <p className="text-sm text-green-400 mt-1">Private Limited by Guarantee</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Registered Office Address</p>
                <p className="text-lg font-bold text-white">
                  Upper Stoneymollan Cottage<br/>
                  Upper Stoneymollan Road<br/>
                  Alexandria, Scotland<br/>
                  GB3 8QU
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GUARANTORS (PSC) */}
        <Card className="bg-indigo-900/40 border-2 border-indigo-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-indigo-400" />
              <h2 className="text-2xl font-black text-indigo-400">GUARANTORS (SUBSCRIBERS)</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-4">
                <p className="text-xl font-black text-white mb-2">Brian Hughes</p>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><strong>Address:</strong> Upper Stoneymollan Cottage, Upper Stoneymollan Road, Alexandria, Scotland, GB3 8QU</p>
                  <p><strong>Country:</strong> Scotland</p>
                  <p><strong>Voting Rights:</strong> More than 25%, not more than 50%</p>
                  <p><strong>Can Appoint/Remove Directors:</strong> Yes (directly or indirectly, majority of board)</p>
                </div>
              </div>
              <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-4">
                <p className="text-xl font-black text-white mb-2">Gillian Barbara Brown</p>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><strong>Address:</strong> Upper Stoneymollan Cottage, Upper Stoneymollan Road, Alexandria, Scotland, GB3 8QU</p>
                  <p><strong>Country:</strong> Scotland</p>
                  <p><strong>Voting Rights:</strong> More than 25%, not more than 50%</p>
                  <p><strong>Can Appoint/Remove Directors:</strong> Yes (directly or indirectly, majority of board)</p>
                  <p><strong>Share of Profits:</strong> No</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PAYMENT RECORD */}
        <Card className="bg-green-900/40 border-2 border-green-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <h2 className="text-2xl font-black text-green-400">PAYMENT CONFIRMED</h2>
            </div>
            <div className="space-y-3">
              <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Amount Paid</p>
                <p className="text-3xl font-black text-green-300">£65.00</p>
              </div>
              <p className="text-sm text-gray-300">
                Submission number <strong className="text-white">111-693557</strong> - quote this if there's a problem with your application
              </p>
              <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-3">
                <p className="text-xs text-yellow-300">
                  If application is rejected, Companies House will refund you.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* USEFUL LINKS */}
        <Card className="bg-gray-900/40 border-2 border-gray-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <ExternalLink className="w-8 h-8 text-gray-400" />
              <h2 className="text-2xl font-black text-gray-400">USEFUL LINKS</h2>
            </div>
            <div className="space-y-2 text-sm">
              <a 
                href="https://find-and-update.company-information.service.gov.uk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                <ExternalLink className="w-4 h-4" />
                Companies House - Find and Update Service
              </a>
              <a 
                href="https://www.gov.uk/government/organisations/companies-house" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                <ExternalLink className="w-4 h-4" />
                Companies House - GOV.UK
              </a>
              <a 
                href="https://www.gov.uk/log-in-file-company-annual-accounts" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                <ExternalLink className="w-4 h-4" />
                File Annual Accounts
              </a>
            </div>
          </CardContent>
        </Card>

        {/* MEMORANDUM OF ASSOCIATION */}
        <Card className="bg-purple-900/40 border-2 border-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-black text-purple-400">MEMORANDUM OF ASSOCIATION</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4">
                <p className="text-white font-bold mb-2">✓ Confirmed Statements:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Persons named agree to form the company stated in the memorandum of association and have met all requirements in accordance with law</li>
                  <li>Persons named wish to form the company for lawful purposes</li>
                </ul>
              </div>
              <p className="text-xs text-gray-400">
                You'll be sent the official version by email once registered.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FINAL NOTE */}
        <Card className="bg-pink-900/40 border-2 border-pink-500">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-black text-pink-400 mb-3">
              ♾️❤️♾️ STORED FOREVER ♾️❤️♾️
            </p>
            <p className="text-sm text-gray-300">
              This page is admin-only. Your database. Your control. Never lost. COOLASFUCK.GMT
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}