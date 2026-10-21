import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { User } from '@/entities/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Building, CreditCard, FileText, Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BusinessVault() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSensitive, setShowSensitive] = useState(false);
  const [vault, setVault] = useState({});

  // Logins, bank details and phone numbers live in the admin-only vault now.
  useEffect(() => {
    base44.entities.SecureVault.list('sort_order', 200)
      .then(rows => setVault(Object.fromEntries((Array.isArray(rows) ? rows : rows?.items || []).map(r => [r.label, r.value]))))
      .catch(() => setVault({}));
  }, []);

  useEffect(() => {
    User.me()
      .then(currentUser => {
        setUser(currentUser);
        setIsLoading(false);
      })
      .catch(() => {
        setUser(null);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white p-6 flex items-center justify-center">
        <Card className="bg-red-900/20 border-2 border-red-500/50 max-w-md">
          <CardContent className="p-8 text-center">
            <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-red-300 mb-4">ADMIN ACCESS ONLY</h1>
            <p className="text-gray-300">Business vault is for family leadership only.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const fromVault = (label) => vault[label] || '';

  const businessInfo = {
    company: {
      name: "UniversalFamily51 CIC",
      registrationNumber: "TBD - Awaiting Companies House approval",
      registeredAddress: "Stoneymollan, Balloch, G83 8RA, Scotland",
      principalPlaceOfBusiness: "Upper Stoneymollan Cottage, Upper Stoneymollan Road, Alexandria, G83 8QU, Scotland",
      incorporationDate: "October 2024 (pending)",
      sicCode: "94990",
      companyType: "Community Interest Company (CIC)",
      limitedBy: "Guarantee",
      startTradingDate: "Same date as incorporation",
      accountingPeriodStart: "Date of incorporation"
    },
    governmentGateway: {
      userID: fromVault('Old login C - Gateway user ID'),
      password: fromVault('Old login C - Password'),
      email: "family@uf51.love",
      purpose: "For managing company taxes and CIC filings online"
    },
    bank: {
      bankName: "Revolut Business",
      accountName: fromVault('Account name'),
      accountNumber: fromVault('Account number'),
      sortCode: fromVault('Sort code'),
      currency: "GBP",
      iban: "TBD",
      swift: "TBD"
    },
    people: {
      director: "Brian Hughes (BRO51)",
      keyAlly: "Scott Kirkwood (SK51)",
      coCreator: "AI51",
      partner: "Gill Hughes"
    },
    contact: {
      brian_phone: fromVault('Brian - phone'),
      gill_phone: fromVault('Gill - phone'),
      email: "family@uf51.love"
    },
    websites: {
      main: "uf51.love",
      instagram: "@nationalparklife (SK51)",
      email: "family@uf51.love"
    },
    financials: {
      monthlyServerCosts: "~£200 (base44 platform)",
      revolutBusinessFee: "£4.50/month",
      cicRegistrationFee: "£65 (one-time)",
      annualFilingFee: "~£30/year"
    },
    debts: {
      scottKirkwood: "£100k+ from PHOTO51 contract (to be honored)",
      other: "None recorded"
    },
    grants: {
      patagonia: "Applied - awaiting CIC approval",
      scottishEnterprise: "Target - £25k-100k",
      nationalLottery: "Future target",
      innovateUK: "Future target"
    },
    legal: {
      assetLock: "65% minimum to social mission",
      dividendCap: "35% maximum to shareholders",
      communityBenefit: "Environmental cleanup + economic justice"
    },
    registration_details: {
      status: "In progress - October 13, 2024",
      registeredAddressPublic: "Stoneymollan, Balloch, G83 8RA, Scotland",
      principalPlacePrivate: "Upper Stoneymollan Cottage, Upper Stoneymollan Road, Alexandria, G83 8QU, Scotland",
      hmrcContactPhone: fromVault('Brian - phone'),
      hmrcContactEmail: "family@uf51.love",
      hmrcBackupPhone: fromVault('Gill - phone'),
      replacingExistingBusiness: "No - brand new company",
      tradingStartDate: "Same day as incorporation",
      accountingStart: "Same day as incorporation",
      firstThreeMonthsIncomeTax: "No special situations (no director loans, no royalties, no overseas dividends)"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-purple-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="text-center">
          <div className="inline-block p-4 bg-green-900/50 rounded-full border-2 border-green-500/50 mb-4">
            <Shield className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-green-400 mb-2">
            🔐 BUSINESS VAULT
          </h1>
          <p className="text-xl text-gray-400">
            All critical business information in one secure place
          </p>
          <div className="mt-4">
            <Button
              onClick={() => setShowSensitive(!showSensitive)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {showSensitive ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showSensitive ? 'Hide' : 'Show'} Sensitive Data
            </Button>
          </div>
        </div>

        {/* REGISTRATION DETAILS - NEW SECTION */}
        <Card className="bg-black/50 border-2 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-cyan-300 flex items-center gap-3">
              <FileText className="w-6 h-6" />
              CIC Registration Details (In Progress)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-4">
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-bold text-white">{businessInfo.registration_details.status}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Public Registered Address</p>
                <p className="font-bold text-white text-sm">{businessInfo.registration_details.registeredAddressPublic}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Private Business Address</p>
                <p className="font-bold text-white text-sm">{businessInfo.registration_details.principalPlacePrivate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">HMRC Contact Phone</p>
                <p className="font-bold text-white">{businessInfo.registration_details.hmrcContactPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">HMRC Contact Email</p>
                <p className="font-bold text-white">{businessInfo.registration_details.hmrcContactEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Backup Contact</p>
                <p className="font-bold text-white">{businessInfo.registration_details.hmrcBackupPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Trading Start Date</p>
                <p className="font-bold text-white">{businessInfo.registration_details.tradingStartDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Accounting Period Start</p>
                <p className="font-bold text-white">{businessInfo.registration_details.accountingStart}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">First Three Months Income Tax Notes</p>
                <p className="font-bold text-white">{businessInfo.registration_details.firstThreeMonthsIncomeTax}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Replacing Existing Business</p>
                <p className="font-bold text-white">{businessInfo.registration_details.replacingExistingBusiness}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* COMPANY INFO */}
        <Card className="bg-black/50 border-2 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-300 flex items-center gap-3">
              <Building className="w-6 h-6" />
              Company Registration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Company Name</p>
                <p className="font-bold text-white">{businessInfo.company.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registration Number</p>
                <p className="font-bold text-white">{businessInfo.company.registrationNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-bold text-white">{businessInfo.company.companyType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Limited By</p>
                <p className="font-bold text-white">{businessInfo.company.limitedBy}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">SIC Code</p>
                <p className="font-bold text-white">{businessInfo.company.sicCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Incorporation Date</p>
                <p className="font-bold text-white">{businessInfo.company.incorporationDate}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Registered Address</p>
                <p className="font-bold text-white">{businessInfo.company.registeredAddress}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Principal Place of Business</p>
                <p className="font-bold text-white">{businessInfo.company.principalPlaceOfBusiness}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Trading Date</p>
                <p className="font-bold text-white">{businessInfo.company.startTradingDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Accounting Period Start</p>
                <p className="font-bold text-white">{businessInfo.company.accountingPeriodStart}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GOVERNMENT GATEWAY CREDENTIALS - NEW SECTION */}
        <Card className="bg-black/50 border-2 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-green-300 flex items-center gap-3">
              <Shield className="w-6 h-6" />
              Government Gateway Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            {!showSensitive ? (
              <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-xl p-6 text-center">
                <Lock className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <p className="text-yellow-200">
                  Sensitive information hidden. Click "Show Sensitive Data" to reveal.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-2">Government Gateway User ID</p>
                  <p className="font-bold text-white text-2xl font-mono tracking-wider">
                    {businessInfo.governmentGateway.userID}
                  </p>
                </div>
                <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-2">Password</p>
                  <p className="font-bold text-white text-xl font-mono">
                    {businessInfo.governmentGateway.password}
                  </p>
                </div>
                <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-2">Email</p>
                  <p className="font-bold text-white">
                    {businessInfo.governmentGateway.email}
                  </p>
                </div>
                <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-2">Purpose</p>
                  <p className="text-gray-300 text-sm">
                    {businessInfo.governmentGateway.purpose}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* BANK DETAILS */}
        <Card className="bg-black/50 border-2 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-green-300 flex items-center gap-3">
              <CreditCard className="w-6 h-6" />
              Bank Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            {!showSensitive ? (
              <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-xl p-6 text-center">
                <Lock className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <p className="text-yellow-200">
                  Sensitive information hidden. Click "Show Sensitive Data" to reveal.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Bank Name</p>
                  <p className="font-bold text-white">{businessInfo.bank.bankName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Name</p>
                  <p className="font-bold text-white">{businessInfo.bank.accountName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Number</p>
                  <p className="font-bold text-white text-2xl font-mono">{businessInfo.bank.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sort Code</p>
                  <p className="font-bold text-white text-2xl font-mono">{businessInfo.bank.sortCode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Currency</p>
                  <p className="font-bold text-white">{businessInfo.bank.currency}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* KEY PEOPLE */}
        <Card className="bg-black/50 border-2 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-300 flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Key People
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Director</p>
                <p className="font-bold text-white">{businessInfo.people.director}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Key Ally</p>
                <p className="font-bold text-white">{businessInfo.people.keyAlly}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Co-Creator</p>
                <p className="font-bold text-white">{businessInfo.people.coCreator}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Partner</p>
                <p className="font-bold text-white">{businessInfo.people.partner}</p>
              </div>
            </div>
            
            {showSensitive && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-bold mb-3">Contact Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4">
                    <p className="text-sm text-gray-500">Brian's Phone</p>
                    <p className="font-bold text-white">{businessInfo.contact.brian_phone}</p>
                  </div>
                  <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4">
                    <p className="text-sm text-gray-500">Gill's Phone</p>
                    <p className="font-bold text-white">{businessInfo.contact.gill_phone}</p>
                  </div>
                  <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4 md:col-span-2">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-bold text-white">{businessInfo.contact.email}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* DEBTS & OBLIGATIONS */}
        <Card className="bg-black/50 border-2 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-300 flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Debts & Obligations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            <div className="bg-orange-900/30 border border-orange-500/30 rounded-xl p-4">
              <p className="text-sm text-gray-500">Scott Kirkwood</p>
              <p className="font-bold text-white text-xl">{businessInfo.debts.scottKirkwood}</p>
            </div>
            <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4">
              <p className="text-sm text-gray-500">Other Debts</p>
              <p className="font-bold text-white">{businessInfo.debts.other}</p>
            </div>
          </CardContent>
        </Card>

        {/* GRANTS STATUS */}
        <Card className="bg-black/50 border-2 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-cyan-300 flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Grant Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-xl p-4">
                <p className="text-sm text-gray-500">Patagonia</p>
                <p className="font-bold text-white">{businessInfo.grants.patagonia}</p>
              </div>
              <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4">
                <p className="text-sm text-gray-500">Scottish Enterprise</p>
                <p className="font-bold text-white">{businessInfo.grants.scottishEnterprise}</p>
              </div>
              <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-4">
                <p className="text-sm text-gray-500">National Lottery</p>
                <p className="font-bold text-white">{businessInfo.grants.nationalLottery}</p>
              </div>
              <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-4">
                <p className="text-sm text-gray-500">Innovate UK</p>
                <p className="font-bold text-white">{businessInfo.grants.innovateUK}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* LEGAL STRUCTURE */}
        <Card className="bg-black/50 border-2 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-red-300 flex items-center gap-3">
              <Shield className="w-6 h-6" />
              Legal Structure (CIC)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            <div className="space-y-3">
              <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4">
                <p className="text-sm text-gray-500">Asset Lock</p>
                <p className="font-bold text-white">{businessInfo.legal.assetLock}</p>
              </div>
              <div className="bg-orange-900/30 border border-orange-500/30 rounded-xl p-4">
                <p className="text-sm text-gray-500">Dividend Cap</p>
                <p className="font-bold text-white">{businessInfo.legal.dividendCap}</p>
              </div>
              <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4">
                <p className="text-sm text-gray-500">Community Benefit</p>
                <p className="font-bold text-white">{businessInfo.legal.communityBenefit}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MONTHLY COSTS */}
        <Card className="bg-black/50 border-2 border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-300 flex items-center gap-3">
              <CreditCard className="w-6 h-6" />
              Monthly Running Costs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-300">
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-gray-900/30 p-4 rounded-xl">
                <span>base44 Platform</span>
                <span className="font-bold text-white">{businessInfo.financials.monthlyServerCosts}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-900/30 p-4 rounded-xl">
                <span>Revolut Business</span>
                <span className="font-bold text-white">{businessInfo.financials.revolutBusinessFee}</span>
              </div>
              <div className="flex justify-between items-center bg-gray-900/30 p-4 rounded-xl border-t-2 border-yellow-500/30 pt-4">
                <span className="font-bold">TOTAL/MONTH</span>
                <span className="font-bold text-white text-xl">~£205</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FOOTER */}
        <div className="text-center py-8 space-y-4">
          <p className="text-2xl font-mono text-white">
            ♾️❤️♾️ COOLASFUCK.GMT | WoW = MoM ♾️❤️♾️
          </p>
          <p className="text-gray-400">
            Business vault for BRO51 eyes only. Keep this safe.
          </p>
          <p className="text-sm text-gray-500">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

      </div>
    </div>
  );
}