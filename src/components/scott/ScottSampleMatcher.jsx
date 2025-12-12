import React, { useState } from 'react';
import { Upload, Music, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery } from '@tanstack/react-query';

/**
 * SAMPLE MATCHER
 * Upload/record audio sample, AI identifies it, checks against licensed catalogue
 * Tells Scott if it's cleared or needs clearance
 */

export default function ScottSampleMatcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [audioFile, setAudioFile] = useState(null);
    const [result, setResult] = useState(null);
    const [matches, setMatches] = useState([]);

    // Get Scott's licensed tracks
    const { data: licensedTracks } = useQuery({
        queryKey: ['scott-publishing'],
        queryFn: async () => {
            const tracks = await base44.entities.ScottPublishing.list();
            return tracks || [];
        }
    });

    const analyzeMutation = useMutation({
        mutationFn: async (file) => {
            // Upload file
            const { file_url } = await base44.asServiceRole.integrations.Core.UploadFile({ file });

            // AI analyze the audio
            const prompt = `You are analyzing an audio file to identify what music sample it contains.

TASK:
1. Listen to the audio and identify:
   - Song title (if recognizable)
   - Artist name
   - Genre/style
   - Key musical elements (melody, rhythm, specific sounds)
   - Era/year if possible

2. If you can identify it, provide:
   - Exact song name
   - Artist name
   - Label that released it
   - Publisher info if known

3. If you can't identify it exactly, describe:
   - What it sounds like
   - Similar songs/artists
   - Genre characteristics

Be specific and confident if you recognize it. Say "cannot identify" if truly unknown.`;

            const analysis = await base44.asServiceRole.integrations.Core.InvokeLLM({
                prompt,
                file_urls: [file_url]
            });

            return { analysis, file_url };
        },
        onSuccess: ({ analysis }) => {
            setResult(analysis);

            // Check for matches in licensed catalogue
            if (licensedTracks && licensedTracks.length > 0) {
                const foundMatches = licensedTracks.filter(track => {
                    const trackTitle = track.track_title?.toLowerCase() || '';
                    const artistName = track.artist_id?.toLowerCase() || '';
                    const analysisLower = analysis.toLowerCase();
                    
                    return analysisLower.includes(trackTitle) || analysisLower.includes(artistName);
                });

                setMatches(foundMatches);
            }
        }
    });

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && (file.type.includes('audio') || file.type.includes('video'))) {
            setAudioFile(file);
            setResult(null);
            setMatches([]);
            analyzeMutation.mutate(file);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full text-left bg-black border-2 border-purple-500 hover:border-purple-400 rounded-lg p-4 transition-all"
                style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' }}
            >
                <div className="flex items-center gap-3">
                    <Music className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <div>
                        <p className="text-white text-sm font-bold font-mono">Audio Sample Identifier</p>
                        <p className="text-purple-400 text-xs font-mono">Upload audio → AI identifies it → Check clearance</p>
                    </div>
                </div>
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto p-4">
                    <div className="max-w-2xl mx-auto py-8">
                        <div className="bg-black border-2 border-purple-500 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-purple-400 font-mono">SAMPLE IDENTIFIER</h2>
                                <button
                                    onClick={() => { setIsOpen(false); setResult(null); setMatches([]); }}
                                    className="text-gray-400 hover:text-white font-mono text-sm"
                                >
                                    CLOSE ✕
                                </button>
                            </div>

                            {/* UPLOAD */}
                            {!analyzeMutation.isPending && !result && (
                                <div className="space-y-4">
                                    <label className="block">
                                        <div className="border-2 border-dashed border-purple-500/50 hover:border-purple-500 rounded-lg p-8 text-center cursor-pointer transition-all">
                                            <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                                            <p className="text-white font-bold font-mono mb-1">Upload Audio Sample</p>
                                            <p className="text-gray-500 text-xs font-mono">MP3, WAV, M4A, or video file</p>
                                            <input
                                                type="file"
                                                accept="audio/*,video/*"
                                                onChange={handleFileUpload}
                                                className="hidden"
                                            />
                                        </div>
                                    </label>

                                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                                        <p className="text-purple-400 font-bold text-xs font-mono mb-2">HOW IT WORKS</p>
                                        <ul className="text-gray-400 text-xs font-mono space-y-1">
                                            <li>• AI listens to your sample</li>
                                            <li>• Identifies the song/artist</li>
                                            <li>• Checks your licensed catalogue</li>
                                            <li>• Tells you if you're cleared or need clearance</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* ANALYZING */}
                            {analyzeMutation.isPending && (
                                <div className="text-center py-12">
                                    <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
                                    <p className="text-purple-400 font-bold font-mono">ANALYZING SAMPLE...</p>
                                    <p className="text-gray-500 text-xs font-mono mt-2">AI is identifying the music</p>
                                </div>
                            )}

                            {/* RESULTS */}
                            {result && (
                                <div className="space-y-4">
                                    {/* CLEARANCE STATUS */}
                                    {matches.length > 0 ? (
                                        <div className="bg-green-900/20 border-2 border-green-500 rounded-lg p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <CheckCircle className="w-6 h-6 text-green-400" />
                                                <p className="text-green-400 font-black text-lg font-mono">YOU OWN THIS!</p>
                                            </div>
                                            <p className="text-green-300 text-sm font-mono mb-4">
                                                This sample is in your licensed catalogue. You're cleared to use it.
                                            </p>
                                            {matches.map(track => (
                                                <div key={track.id} className="bg-black border border-green-500/30 rounded p-3 mb-2">
                                                    <p className="text-white font-bold font-mono">{track.track_title}</p>
                                                    {track.master_ownership && (
                                                        <p className="text-green-400 text-xs font-mono mt-1">
                                                            Master: {track.master_ownership}
                                                        </p>
                                                    )}
                                                    {track.writers && track.writers.length > 0 && (
                                                        <p className="text-gray-400 text-xs font-mono mt-1">
                                                            Writers: {track.writers.map(w => w.name).join(', ')}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-amber-900/20 border-2 border-amber-500 rounded-lg p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <AlertCircle className="w-6 h-6 text-amber-400" />
                                                <p className="text-amber-400 font-black text-lg font-mono">WHY IT NEEDS CLEARANCE</p>
                                            </div>
                                            <div className="bg-black border border-amber-500/30 rounded p-4 mb-4">
                                                <p className="text-white text-sm font-mono mb-2">
                                                    Using this sample without permission = copyright infringement (illegal)
                                                </p>
                                                <p className="text-gray-400 text-xs font-mono leading-relaxed">
                                                    Two separate rights exist: (1) the RECORDING itself (master rights - owned by label/artist) 
                                                    and (2) the SONG/COMPOSITION (publishing rights - owned by writers/publishers). 
                                                    You need both cleared or you can't legally release it. Otherwise they can sue, 
                                                    take your track down, and claim all your revenue.
                                                </p>
                                            </div>

                                            <p className="text-amber-400 font-black text-sm font-mono mb-3">LET'S FIND THE RIGHT ROUTE:</p>
                                            
                                            <div className="space-y-3">
                                                <div className="bg-black border border-green-500/30 rounded p-3">
                                                    <p className="text-green-400 font-bold text-sm font-mono mb-1">OPTION 1: CLEAR IT</p>
                                                    <p className="text-gray-400 text-xs font-mono mb-2">Get legal permission from rights holders</p>
                                                    <div className="flex gap-2">
                                                        <span className="px-2 py-1 bg-green-500/20 rounded text-green-400 text-[10px] font-mono">PRO: Legit forever</span>
                                                        <span className="px-2 py-1 bg-amber-500/20 rounded text-amber-400 text-[10px] font-mono">CON: Costs £££, takes time</span>
                                                    </div>
                                                </div>

                                                <div className="bg-black border border-cyan-500/30 rounded p-3">
                                                    <p className="text-cyan-400 font-bold text-sm font-mono mb-1">OPTION 2: INTERPOLATION</p>
                                                    <p className="text-gray-400 text-xs font-mono mb-2">Re-record it yourself (same melody/composition)</p>
                                                    <div className="flex gap-2">
                                                        <span className="px-2 py-1 bg-green-500/20 rounded text-green-400 text-[10px] font-mono">PRO: Cheaper, only publishing split</span>
                                                        <span className="px-2 py-1 bg-amber-500/20 rounded text-amber-400 text-[10px] font-mono">CON: Still need publishing clearance</span>
                                                    </div>
                                                </div>

                                                <div className="bg-black border border-purple-500/30 rounded p-3">
                                                    <p className="text-purple-400 font-bold text-sm font-mono mb-1">OPTION 3: INSPIRED ALTERNATIVE</p>
                                                    <p className="text-gray-400 text-xs font-mono mb-2">Create similar vibe, change melody enough</p>
                                                    <div className="flex gap-2">
                                                        <span className="px-2 py-1 bg-green-500/20 rounded text-green-400 text-[10px] font-mono">PRO: Free, zero hassle</span>
                                                        <span className="px-2 py-1 bg-amber-500/20 rounded text-amber-400 text-[10px] font-mono">CON: Loses exact original vibe</span>
                                                    </div>
                                                </div>

                                                <div className="bg-black border border-pink-500/30 rounded p-3">
                                                    <p className="text-pink-400 font-bold text-sm font-mono mb-1">OPTION 4: ROYALTY-FREE ALTERNATIVE</p>
                                                    <p className="text-gray-400 text-xs font-mono mb-2">Find similar sample from royalty-free library</p>
                                                    <div className="flex gap-2">
                                                        <span className="px-2 py-1 bg-green-500/20 rounded text-green-400 text-[10px] font-mono">PRO: Instant, pre-cleared</span>
                                                        <span className="px-2 py-1 bg-amber-500/20 rounded text-amber-400 text-[10px] font-mono">CON: Generic sound</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-amber-500 text-xs font-mono mt-4 pt-4 border-t border-amber-500/30">
                                                💡 SCOTT & AI51 CAN HELP WITH ANY OF THESE - choose what fits your timeline + budget
                                            </p>
                                        </div>
                                    )}

                                    {/* IDENTIFICATION */}
                                    <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6">
                                        <p className="text-purple-400 font-bold text-sm font-mono mb-3">AI IDENTIFICATION:</p>
                                        <div className="text-white text-sm font-mono whitespace-pre-wrap leading-relaxed">
                                            {result}
                                        </div>
                                    </div>

                                    {/* SOLUTION ACTIONS */}
                                    {matches.length === 0 && (
                                        <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-4">
                                            <p className="text-cyan-400 font-bold text-xs font-mono mb-3">NEXT STEPS - PICK YOUR ROUTE:</p>
                                            <div className="space-y-2">
                                                <Button
                                                    onClick={() => {
                                                        setIsOpen(false);
                                                        // Trigger sample analyzer
                                                    }}
                                                    className="w-full bg-green-500 hover:bg-green-600 text-black font-mono text-sm justify-start"
                                                >
                                                    → Find who owns it + get clearance
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full font-mono text-sm justify-start text-cyan-400 border-cyan-500/50"
                                                >
                                                    → Talk to producer about re-recording it
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full font-mono text-sm justify-start text-purple-400 border-purple-500/50"
                                                >
                                                    → Ask AI51 for similar royalty-free samples
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full font-mono text-sm justify-start text-pink-400 border-pink-500/50"
                                                >
                                                    → Create inspired alternative (safe route)
                                                </Button>
                                            </div>
                                            <p className="text-gray-500 text-xs font-mono mt-3">
                                                All routes work - depends on budget/timeline/vibe you want
                                            </p>
                                        </div>
                                    )}

                                    <Button
                                        onClick={() => { setResult(null); setMatches([]); setAudioFile(null); }}
                                        variant="outline"
                                        className="w-full font-mono"
                                    >
                                        Analyze Another Sample
                                    </Button>
                                </div>
                            )}

                            {analyzeMutation.isError && (
                                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                                    <p className="text-red-400 text-sm font-mono">Analysis failed. Try a different file format or check your connection.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}