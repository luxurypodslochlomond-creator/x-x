import React, { useState } from 'react';
import { Shield, Lock, Eye, Database, Zap, ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CB51 SECURITY & PRIVACY SETTINGS
 * Explains why user data is protected + emphasizes sovereignty
 * Not interrupting - lives in Settings where users can read when they want
 */

export default function CB51SecuritySettings() {
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      id: 'encryption',
      title: 'End-to-End Encryption',
      icon: Lock,
      description: 'Your data stays yours',
      details: [
        'All gig offers, messages, and artist details encrypted on transmission',
        'CB51 servers never see unencrypted data',
        'Only you and your team can decrypt—not even our system has the keys',
        'Standard TLS 1.3 + application-level encryption'
      ]
    },
    {
      id: 'sovereignty',
      title: 'User Data Sovereignty',
      icon: Shield,
      description: 'You own everything',
      details: [
        'Your artist roster = your data. Period.',
        'No AI training on your gigs, messages, or contracts',
        'No selling, sharing, or monetizing your information',
        'You can export or delete everything anytime',
        'GDPR + UK data protection laws—fully compliant'
      ]
    },
    {
      id: 'isolation',
      title: 'Data Isolation',
      icon: Database,
      description: 'Clean separation',
      details: [
        'Each artist's data completely isolated',
        'Team members only see artists you assign them to',
        'Manager admins cannot see other managers' data',
        'No cross-contamination between your roster and other users'
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy by Design',
      icon: Eye,
      description: 'Built in from the start',
      details: [
        'Minimal data collection—only what's essential for management',
        'No tracking pixels, analytics cookies, or fingerprinting',
        'No third-party data brokers',
        'Your activity stays between you and CB51'
      ]
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Security',
      icon: Zap,
      description: 'Bulletproof setup',
      details: [
        'Servers in secure, certified data centers',
        'Regular security audits + penetration testing',
        'Automatic backups with encryption',
        'Zero-knowledge architecture—CB51 cannot be forced to give up your data'
      ]
    }
  ];

  const SectionButton = ({ section }) => {
    const isExpanded = expandedSection === section.id;
    const Icon = section.icon;

    return (
      <motion.div key={section.id} className="mb-2">
        <button
          onClick={() => setExpandedSection(isExpanded ? null : section.id)}
          className="w-full bg-black border-2 border-cyan-500/40 rounded-lg p-3 flex items-start justify-between hover:border-cyan-500/70 transition-all"
        >
          <div className="flex items-start gap-3 text-left">
            <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-cyan-400 font-black font-mono text-sm">{section.title}</h3>
              <p className="text-gray-400 text-xs font-mono mt-1">{section.description}</p>
            </div>
          </div>
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-cyan-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-cyan-400" />
            )}
          </div>
        </button>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black/50 border-2 border-cyan-500/20 border-t-0 rounded-b-lg p-3 space-y-2"
          >
            {section.details.map((detail, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-cyan-400 flex-shrink-0 font-mono">✓</span>
                <p className="text-white text-xs font-mono leading-relaxed">{detail}</p>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-cyan-400 font-black font-mono text-lg">Security & Privacy</h2>
            <p className="text-gray-300 text-sm font-mono mt-2">
              Your data is protected by military-grade encryption. You're in control.
            </p>
          </div>
        </div>
      </div>

      {/* SECTIONS */}
      <div className="space-y-2">
        {sections.map(section => (
          <SectionButton key={section.id} section={section} />
        ))}
      </div>

      {/* FOOTER NOTE */}
      <div className="bg-black border border-cyan-500/30 rounded-lg p-3">
        <p className="text-gray-400 text-xs font-mono leading-relaxed">
          Questions? Email <span className="text-cyan-400 font-black">security@cb51.com</span> — we answer everything.
        </p>
      </div>
    </div>
  );
}