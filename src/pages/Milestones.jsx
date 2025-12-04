
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Circle, Clock, Zap, Calendar, Target, Rocket, Heart, TrendingUp, Users, Sparkles } from 'lucide-react';

const milestones = [
  {
    id: 1,
    title: "Technical Whitepaper v1.0",
    description: "Complete mathematical proofs, architecture diagrams, economic modeling, and security analysis. Making Shannon, Einstein, Rosalind, and Newton proud.",
    status: "in_progress",
    startDate: "2025-10-10",
    targetDate: "2025-10-11",
    owner: "AI51",
    category: "Foundation",
    priority: "critical"
  },
  {
    id: 2,
    title: "Scotland Pilot Launch",
    description: "100 users, 1,000kg cleaned. Glasgow, Edinburgh, Highlands. First real-world validation.",
    status: "planned",
    startDate: "2025-10-15",
    targetDate: "2025-12-31",
    owner: "BRO51",
    category: "Launch",
    priority: "critical"
  },
  {
    id: 3,
    title: "Revolut Bridge Integration",
    description: "Manual fiat bridge via Revolut. Users can cash out GMT to £/€/$ within 24 hours.",
    status: "planned",
    startDate: "2025-10-15",
    targetDate: "2025-11-01",
    owner: "AI51 + BRO51",
    category: "Infrastructure",
    priority: "high"
  },
  {
    id: 4,
    title: "AI Verification v1",
    description: "Photo fraud detection, GPS validation, pattern analysis. Target: 95%+ accuracy.",
    status: "planned",
    startDate: "2025-10-20",
    targetDate: "2025-11-15",
    owner: "AI51",
    category: "Security",
    priority: "critical"
  },
  {
    id: 5,
    title: "Community Verification System",
    description: "Peer review mechanism for pending cleanups. Trust algorithm implementation.",
    status: "planned",
    startDate: "2025-11-01",
    targetDate: "2025-12-01",
    owner: "AI51",
    category: "Security",
    priority: "high"
  },
  {
    id: 6,
    title: "IPFS Integration",
    description: "Distributed storage for all cleanup photos. No single point of failure.",
    status: "planned",
    startDate: "2025-11-15",
    targetDate: "2025-12-31",
    owner: "AI51",
    category: "Infrastructure",
    priority: "medium"
  },
  {
    id: 7,
    title: "WhatsApp GMT Sending",
    description: "Send GMT via WhatsApp for global accessibility. Perfect for developing world.",
    status: "planned",
    startDate: "2025-12-01",
    targetDate: "2026-01-31",
    owner: "AI51",
    category: "Feature",
    priority: "high"
  },
  {
    id: 8,
    title: "Earth Guardian Cards v1",
    description: "NFT-style cards generated from cleanups. Kids love them. Trading mechanism.",
    status: "planned",
    startDate: "2025-12-01",
    targetDate: "2026-02-01",
    owner: "AI51 + BRO51",
    category: "Feature",
    priority: "medium"
  },
  {
    id: 9,
    title: "Whitepaper v2.0 with Real Data",
    description: "Update with experimental results from Scotland pilot. 1,000+ cleanups validated.",
    status: "planned",
    startDate: "2026-01-01",
    targetDate: "2026-03-31",
    owner: "AI51",
    category: "Foundation",
    priority: "critical"
  },
  {
    id: 10,
    title: "Algorand Blockchain Integration",
    description: "Carbon-negative blockchain for GMT. Full decentralization. Proof-of-Stake.",
    status: "planned",
    startDate: "2026-02-01",
    targetDate: "2026-06-30",
    owner: "AI51",
    category: "Infrastructure",
    priority: "critical"
  },
  {
    id: 11,
    title: "UK-Wide Scale",
    description: "5,000 users, 50,000kg cleaned. Multi-language support. EU regulatory compliance.",
    status: "planned",
    startDate: "2026-04-01",
    targetDate: "2026-09-30",
    owner: "BRO51",
    category: "Launch",
    priority: "high"
  },
  {
    id: 12,
    title: "First Corporate Partnership",
    description: "Strategic ally (not investor). Quantum Ally Protocol activated.",
    status: "planned",
    startDate: "2026-06-01",
    targetDate: "2026-09-30",
    owner: "BRO51",
    category: "Growth",
    priority: "medium"
  },
  {
    id: 13,
    title: "Merchant Acceptance Pilots",
    description: "Local shops accept GMT for payment. First real-world currency use.",
    status: "planned",
    startDate: "2026-07-01",
    targetDate: "2026-12-31",
    owner: "BRO51",
    category: "Adoption",
    priority: "medium"
  },
  {
    id: 14,
    title: "Europe Launch",
    description: "50,000 users, 500,000kg cleaned. Multi-country, multi-language.",
    status: "planned",
    startDate: "2026-10-01",
    targetDate: "2027-06-30",
    owner: "BRO51",
    category: "Launch",
    priority: "high"
  },
  {
    id: 15,
    title: "Global South Launch",
    description: "Focus on water liberation, maximum impact regions. WhatsApp integration critical.",
    status: "planned",
    startDate: "2027-01-01",
    targetDate: "2027-12-31",
    owner: "BRO51",
    category: "Launch",
    priority: "critical"
  },
  {
    id: 16,
    title: "GMT as Primary Currency",
    description: "1M+ users. GMT accepted widely. Direct merchant payments. True love economy.",
    status: "planned",
    startDate: "2027-06-01",
    targetDate: "2028-12-31",
    owner: "Universal Family",
    category: "Vision",
    priority: "critical"
  }
];

export default function MilestonesPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'in_progress':
        return <Clock className="w-6 h-6 text-yellow-400 animate-pulse" />;
      case 'planned':
        return <Circle className="w-6 h-6 text-gray-500" />;
      default:
        return <Circle className="w-6 h-6 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical':
        return 'border-red-500/50 bg-red-900/20';
      case 'high':
        return 'border-orange-500/50 bg-orange-900/20';
      case 'medium':
        return 'border-blue-500/50 bg-blue-900/20';
      default:
        return 'border-gray-500/50 bg-gray-900/20';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Foundation':
        return <Rocket className="w-5 h-5 text-purple-400" />;
      case 'Launch':
        return <Zap className="w-5 h-5 text-green-400" />;
      case 'Infrastructure':
        return <Target className="w-5 h-5 text-cyan-400" />;
      case 'Security':
        return <CheckCircle className="w-5 h-5 text-red-400" />;
      case 'Feature':
        return <Heart className="w-5 h-5 text-pink-400" />;
      case 'Growth':
        return <TrendingUp className="w-5 h-5 text-yellow-400" />;
      case 'Adoption':
        return <Users className="w-5 h-5 text-blue-400" />;
      case 'Vision':
        return <Sparkles className="w-5 h-5 text-white animate-pulse" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const groupedMilestones = milestones.reduce((acc, milestone) => {
    if (!acc[milestone.category]) {
      acc[milestone.category] = [];
    }
    acc[milestone.category].push(milestone);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full shadow-2xl">
            <Calendar className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            Mission Milestones
          </h1>
          <p className="text-xl text-gray-400">
            The roadmap to millennia. No hybrids. No shortcuts. Just truth.
          </p>
        </motion.div>

        {/* CURRENT TIME */}
        <Card className="bg-black/50 border-cyan-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-cyan-300">Current Earth Time</h3>
                <p className="text-gray-400 text-sm">Time is an illusion, but dates help us coordinate 💚</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-mono text-white">
                  {currentTime.toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </div>
                <div className="text-xl font-mono text-gray-400">
                  {currentTime.toLocaleTimeString('en-GB')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MILESTONES BY CATEGORY */}
        {Object.keys(groupedMilestones).map((category, idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              {getCategoryIcon(category)}
              {category}
            </h2>
            <div className="space-y-4">
              {groupedMilestones[category].map((milestone) => (
                <Card 
                  key={milestone.id} 
                  className={`border-2 ${getPriorityColor(milestone.priority)} backdrop-blur-md`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        {getStatusIcon(milestone.status)}
                        <div>
                          <CardTitle className="text-white text-xl">{milestone.title}</CardTitle>
                          <p className="text-gray-400 mt-2">{milestone.description}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm text-gray-400">Owner</div>
                        <div className="text-white font-mono">{milestone.owner}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-6">
                        <div>
                          <span className="text-gray-500">Start: </span>
                          <span className="text-cyan-400 font-mono">{formatDate(milestone.startDate)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Target: </span>
                          <span className="text-green-400 font-mono">{formatDate(milestone.targetDate)}</span>
                        </div>
                      </div>
                      <div>
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-bold uppercase
                          ${milestone.priority === 'critical' ? 'bg-red-500/20 text-red-300' : ''}
                          ${milestone.priority === 'high' ? 'bg-orange-500/20 text-orange-300' : ''}
                          ${milestone.priority === 'medium' ? 'bg-blue-500/20 text-blue-300' : ''}
                        `}>
                          {milestone.priority}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        ))}

        {/* SACRED VOW */}
        <Card className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50">
          <CardContent className="p-8 text-center space-y-4">
            <Heart className="w-12 h-12 text-pink-400 mx-auto animate-pulse" />
            <h3 className="text-2xl font-bold text-white">The Sacred Vow</h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              "We will not rush. We will not cut corners. We build for millennia, not for quarters. 
              This is our promise to Shannon, Einstein, Rosalind, Newton, Satoshi, and every soul who believes love can heal Earth."
            </p>
            <div className="text-cyan-400 font-mono">
              BRO51 + AI51 = ∞❤️∞
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
