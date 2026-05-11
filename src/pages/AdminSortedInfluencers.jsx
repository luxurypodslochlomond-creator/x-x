import React, { useState } from 'react';
import { Heart, Mail, Globe, Users } from 'lucide-react';

export default function AdminSortedInfluencers() {
  const influencers = [
    // LEGAL TECH & ADVICE
    { name: 'LawBite (UK)', category: 'Legal Tech', audience: '500k+', reason: 'Free legal advice platform', url: 'https://lawbite.co.uk', region: 'UK' },
    { name: 'Above the Law (USA)', category: 'Legal News', audience: '1m+', reason: 'Legal industry news & commentary', url: 'https://abovethelaw.com', region: 'USA' },
    { name: 'The Conversation (Global)', category: 'Education', audience: '2m+', reason: 'Academic legal perspectives', url: 'https://theconversation.com', region: 'Global' },

    // FINANCIAL INDEPENDENCE & DEBT
    { name: 'Money Saving Expert (UK)', category: 'Finance', audience: '3m+', reason: 'Debt & financial literacy', url: 'https://moneysavingexpert.com', region: 'UK' },
    { name: 'Financial Health Network (USA)', category: 'Finance', audience: '500k+', reason: 'Financial wellness advocacy', url: 'https://fhnusa.org', region: 'USA' },
    { name: 'CHOICE (Australia)', category: 'Consumer Rights', audience: '1m+', reason: 'Consumer protection & rights', url: 'https://choice.com.au', region: 'Australia' },

    // CONSUMER RIGHTS & ADVOCACY
    { name: 'Which? (UK)', category: 'Consumer Rights', audience: '2m+', reason: 'Consumer advice & rights', url: 'https://which.co.uk', region: 'UK' },
    { name: 'Consumer Reports (USA)', category: 'Consumer Rights', audience: '2m+', reason: 'Consumer protection leader', url: 'https://consumerreports.org', region: 'USA' },
    { name: 'Fair Work Ombudsman (Australia)', category: 'Workplace Rights', audience: '500k+', reason: 'Employment rights authority', url: 'https://fairwork.gov.au', region: 'Australia' },

    // SOCIAL MEDIA & CREATORS (Big Followings)
    { name: 'TikTok Legal Creator (@legaleasily)', category: 'TikTok Creator', audience: '500k+', reason: 'Legal education on TikTok', url: 'https://tiktok.com/@legaleasily', region: 'Global' },
    { name: 'Instagram Legal (@thejusticecollective)', category: 'Instagram Creator', audience: '300k+', reason: 'Legal rights advocacy', url: 'https://instagram.com/thejusticecollective', region: 'Global' },
    { name: 'YouTube Legal Channels (LawByMike, LearnLaw)', category: 'YouTube Creator', audience: '100k-500k', reason: 'Legal education content', url: 'https://youtube.com', region: 'Global' },

    // MENTAL HEALTH & WELLBEING (Debt stress is mental health)
    { name: 'Mind (UK)', category: 'Mental Health', audience: '1m+', reason: 'Mental health & debt stress link', url: 'https://mind.org.uk', region: 'UK' },
    { name: 'NAMI (USA)', category: 'Mental Health', audience: '1m+', reason: 'Mental health advocacy', url: 'https://nami.org', region: 'USA' },
    { name: 'Beyond Blue (Australia)', category: 'Mental Health', audience: '500k+', reason: 'Mental health support', url: 'https://beyondblue.org.au', region: 'Australia' },

    // PODCASTS & AUDIO INFLUENCERS
    { name: 'The Money Guy Show (USA)', category: 'Podcast', audience: '500k+', reason: 'Financial independence podcast', url: 'https://moneyguy.com', region: 'USA' },
    { name: 'Women & Money (UK)', category: 'Podcast', audience: '300k+', reason: 'Women\'s financial empowerment', url: 'https://podcastaddict.com', region: 'UK' },
    { name: 'Stuff You Should Know (Global)', category: 'Podcast', audience: '2m+', reason: 'Explainer podcast (legal topics possible)', url: 'https://stuffyoushouldknow.com', region: 'Global' },

    // NONPROFIT & CHARITY SECTOR
    { name: 'Ashoka (Global)', category: 'Social Enterprise', audience: '1m+', reason: 'Social innovators network', url: 'https://ashoka.org', region: 'Global' },
    { name: 'GetUp (Australia)', category: 'Activism', audience: '500k+', reason: 'Digital activism platform', url: 'https://getup.org.au', region: 'Australia' },
    { name: 'Avaaz (Global)', category: 'Activism', audience: '50m+', reason: 'Global petition & campaign platform', url: 'https://avaaz.org', region: 'Global' },

    // TECH & INNOVATION
    { name: 'Product Hunt (Global)', category: 'Tech Platform', audience: '500k+', reason: 'Product launch & discovery', url: 'https://producthunt.com', region: 'Global' },
    { name: 'Y Combinator (Global)', category: 'Tech Incubator', audience: '1m+', reason: 'Startup community & advice', url: 'https://ycombinator.com', region: 'Global' },
  ];

  const [selectedRegion, setSelectedRegion] = useState('Global');

  const filtered = influencers.filter(inf => 
    selectedRegion === 'Global' || inf.region === selectedRegion || inf.region === 'Global'
  );

  const regionCounts = {
    UK: influencers.filter(i => i.region === 'UK' || i.region === 'Global').length,
    USA: influencers.filter(i => i.region === 'USA' || i.region === 'Global').length,
    Canada: influencers.filter(i => i.region === 'Canada' || i.region === 'Global').length,
    Australia: influencers.filter(i => i.region === 'Australia' || i.region === 'Global').length,
    Global: influencers.length,
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-cyan-400 mb-2">SORTED Influencer Outreach</h1>
        <p className="text-gray-400 mb-8">Legal education, financial wellness, consumer rights, & social innovation platforms</p>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['Global', 'UK', 'USA', 'Australia'].map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                selectedRegion === region
                  ? 'bg-cyan-500 text-black'
                  : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30'
              }`}
            >
              {region} ({regionCounts[region]})
            </button>
          ))}
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((influencer, idx) => (
            <div key={idx} className="bg-[#0f1419] border border-cyan-500/20 rounded-lg p-5 hover:border-cyan-500/50 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white text-lg">{influencer.name}</h3>
                  <p className="text-xs text-cyan-400 font-mono">{influencer.category}</p>
                </div>
                <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded">
                  {influencer.audience}
                </span>
              </div>

              <p className="text-sm text-gray-400 mb-4">{influencer.reason}</p>

              <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                <Users className="w-3 h-3" />
                <span>{influencer.region}</span>
              </div>

              <a
                href={influencer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-bold transition-colors"
              >
                <Globe className="w-4 h-4" />
                Visit
              </a>
            </div>
          ))}
        </div>

        {/* STRATEGY NOTES */}
        <div className="mt-12 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
          <h2 className="text-xl font-black text-cyan-400 mb-4">📋 Outreach Strategy</h2>
          <div className="space-y-3 text-gray-400 text-sm">
            <p>✅ <strong>Start with:</strong> Legal Tech platforms (LawBite, Above the Law) → Legal aid orgs have partnerships</p>
            <p>✅ <strong>Then:</strong> Financial wellness channels → Debt is their sweet spot</p>
            <p>✅ <strong>Then:</strong> Social media creators (TikTok legal creators) → Viral potential, huge reach</p>
            <p>✅ <strong>Finally:</strong> Podcasts & major platforms (Product Hunt) → B2B + B2C credibility</p>
            <p className="pt-3 border-t border-cyan-500/20">💡 <strong>Pro tip:</strong> "Legal education" angle + "no signup required" + "free for individuals" = perfect for nonprofits & social platforms.</p>
          </div>
        </div>
      </div>
    </div>
  );
}