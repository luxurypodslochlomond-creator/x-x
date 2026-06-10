import React, { useState, useRef } from 'react';
import ZappCreator from '@/components/zapp/ZappCreator';
import ZappLiveOutput from '@/components/zapp/ZappLiveOutput';
import ZappBolt from '@/components/zapp/ZappBolt';

export default function Zapp() {
  const [idea, setIdea] = useState('');
  const [phase, setPhase] = useState('home'); // home | building | done
  const [generatedCode, setGeneratedCode] = useState('');
  const [streamingCode, setStreamingCode] = useState('');
  const [builderMode, setBuilderMode] = useState(false);
  const [appTitle, setAppTitle] = useState('');

  const handleIdeaSubmit = (ideaText) => {
    setIdea(ideaText);
    setPhase('building');
  };

  const handleBuildComplete = (code, title) => {
    setGeneratedCode(code);
    setAppTitle(title);
    setPhase('done');
  };

  const handleReset = () => {
    setIdea('');
    setPhase('home');
    setGeneratedCode('');
    setStreamingCode('');
    setAppTitle('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* Background electric grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(120, 80, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(120, 80, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />

      {/* Glow orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(120, 80, 255, 0.15) 0%, transparent 70%)',
        filter: 'blur(40px)'
      }} />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(255, 80, 180, 0.1) 0%, transparent 70%)',
        filter: 'blur(40px)'
      }} />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5">
        <button onClick={handleReset} className="flex items-center gap-2 group">
          <ZappBolt size={32} animated={phase !== 'building'} />
          <span className="text-2xl font-black tracking-tight" style={{
            background: 'linear-gradient(135deg, #a78bfa, #f472b6, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>ZAPP</span>
        </button>

        <div className="flex items-center gap-4">
          {/* Builder mode toggle */}
          <button
            onClick={() => setBuilderMode(!builderMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              builderMode
                ? 'border-violet-500 bg-violet-500/20 text-violet-300'
                : 'border-white/10 text-white/30 hover:border-white/20 hover:text-white/50'
            }`}
          >
            <span className="font-mono">{builderMode ? '</>' : '<>'}</span>
            <span>{builderMode ? 'builder mode' : 'magic mode'}</span>
          </button>

          <div className="text-xs text-white/20 font-mono">no data · no account · ever</div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        {phase === 'home' && (
          <ZappCreator onSubmit={handleIdeaSubmit} />
        )}
        {(phase === 'building' || phase === 'done') && (
          <ZappLiveOutput
            idea={idea}
            phase={phase}
            builderMode={builderMode}
            onComplete={handleBuildComplete}
            onReset={handleReset}
            generatedCode={generatedCode}
            appTitle={appTitle}
          />
        )}
      </main>
    </div>
  );
}