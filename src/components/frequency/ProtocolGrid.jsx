import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';

const PixelIcon = ({ icon: Icon, color, size = 48 }) => (
  <div style={{ filter: `drop-shadow(0 0 8px ${color}50)` }}>
    <Icon size={size} color={color} strokeWidth={2.5} />
  </div>
);

export default function ProtocolGrid({ PROTOCOLS, PROTOCOL_SECTIONS, suggestedProtocol, onProtocolSelect }) {
  const [expandedInfo, setExpandedInfo] = useState(null);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {PROTOCOL_SECTIONS.map((section) => (
        <div key={section.id}>
          <div className="border-4 bg-black p-6" style={{ borderColor: section.color }}>
            <div className="mb-4">
              <h3 className="text-xl font-black font-mono" style={{ color: section.color }}>
                {section.name}
              </h3>
              <p className="text-gray-500 text-sm font-mono">{section.description}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {section.protocols.map((protocolId) => {
                const protocol = PROTOCOLS[protocolId];
                if (!protocol) return null;
                return (
                  <motion.button
                    key={protocol.id}
                    onClick={() => { onProtocolSelect(protocol.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="relative p-6 border-4 bg-black hover:bg-white/5 transition-all"
                    style={{ borderColor: protocol.color + '60' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); setExpandedInfo(expandedInfo === protocol.id ? null : protocol.id); }}
                      className="absolute top-2 right-2 text-gray-500 hover:text-white"
                    >
                      <Info size={16} />
                    </button>

                    <div className="flex flex-col items-center gap-3">
                      <PixelIcon icon={protocol.icon} color={protocol.color} size={40} />
                      <p className="font-black font-mono text-sm" style={{ color: protocol.color }}>
                        {protocol.name}
                      </p>
                      <p className="text-gray-400 text-xs text-center">
                        {protocol.description}
                      </p>
                      {protocol.config.isBinaural && (
                        <p className="text-cyan-400 text-xs font-mono mt-2 px-2 py-1 bg-cyan-900/30 rounded">
                          🎧 Headphones best
                        </p>
                      )}
                      {!protocol.config.isBinaural && (
                        <p className="text-green-400 text-xs font-mono mt-2 px-2 py-1 bg-green-900/30 rounded">
                          🔊 Speakers work great
                        </p>
                      )}
                    </div>

                    {protocol.id === suggestedProtocol && (
                      <div 
                        className="absolute -top-2 -right-2 px-2 py-1 text-xs font-black font-mono"
                        style={{ backgroundColor: protocol.color, color: 'black' }}
                      >
                        NOW
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {section.protocols.some(pid => expandedInfo === pid) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4"
                >
                  {section.protocols.map((protocolId) => {
                    const protocol = PROTOCOLS[protocolId];
                    if (!protocol || expandedInfo !== protocol.id) return null;
                    return (
                      <div 
                        key={protocol.id}
                        className="bg-black border-4 p-4 space-y-3"
                        style={{ borderColor: protocol.color }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <PixelIcon icon={protocol.icon} color={protocol.color} size={24} />
                            <h4 className="text-lg font-black font-mono" style={{ color: protocol.color }}>
                              {protocol.name}
                            </h4>
                          </div>
                          <button 
                            onClick={() => setExpandedInfo(null)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        <div>
                          <p className="text-gray-400 text-xs font-mono mb-1">THE SCIENCE:</p>
                          <p className="text-white text-sm">{protocol.science}</p>
                        </div>

                        <div>
                          <p className="text-gray-400 text-xs font-mono mb-1">SOURCES:</p>
                          <ul className="space-y-1">
                            {protocol.sources.map((source, i) => (
                              <li key={i} className="text-cyan-400 text-sm font-mono">• {source}</li>
                            ))}
                          </ul>
                        </div>

                        {protocol.ancientWisdom && (
                          <div>
                            <p className="text-gray-400 text-xs font-mono mb-1">ANCIENT WISDOM:</p>
                            <p className="text-amber-400 text-sm italic">{protocol.ancientWisdom}</p>
                          </div>
                        )}

                        <div>
                          <p className="text-gray-400 text-xs font-mono mb-1">FREQUENCIES:</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="bg-white/5 p-2 border border-white/10">
                              <span className="text-gray-400">Primary:</span>
                              <span className="text-white font-mono ml-2">{protocol.config.primary}Hz</span>
                            </div>
                            <div className="bg-white/5 p-2 border border-white/10">
                              <span className="text-gray-400">Secondary:</span>
                              <span className="text-white font-mono ml-2">{protocol.config.secondary}Hz</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}