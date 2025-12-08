import React from 'react';
import { COOLASFUCKWaves } from '@/components/shared/COOLASFUCKIcon';

/**
 * UF51 ONE-PAGER - PDF READY
 * Clean, printable pitch doc
 */

export default function AdminOnePager() {
    React.useEffect(() => {
        // Hide page styling for clean PDF
        document.body.style.background = 'white';
        
        // Hide Base44 footer completely
        const footer = document.querySelector('footer');
        if (footer) footer.style.display = 'none';
        
        return () => {
            document.body.style.background = '';
            if (footer) footer.style.display = '';
        };
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <style>{`
                @media print {
                    body { background: white !important; }
                    header, nav, aside, footer, .no-print { display: none !important; }
                    main { margin: 0 !important; padding: 0 !important; }
                    @page { margin: 0; }
                }
            `}</style>

            <div className="min-h-screen bg-white text-black p-12">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    {/* PRINT BUTTON - HIDE ON PRINT */}
                    <div className="no-print mb-8 text-center">
                        <button
                            onClick={handlePrint}
                            className="px-8 py-4 bg-cyan-600 text-white font-black font-mono text-lg hover:bg-cyan-700"
                        >
                            💾 SAVE AS PDF
                        </button>
                        <p className="text-sm text-gray-600 mt-2 font-mono">Click to save/print as PDF</p>
                    </div>

                    {/* HEADER */}
                    <div className="text-center border-b-4 border-cyan-500 pb-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <COOLASFUCKWaves size={60} animate={false} />
                            <h1 className="text-6xl font-black font-mono">UF51</h1>
                        </div>
                        <p className="text-cyan-600 font-mono text-xl font-bold">UNIVERSAL FREQUENCY 51</p>
                        <p className="text-gray-700 font-mono text-lg mt-2">Free Evidence-Based Mental Health Technology</p>
                    </div>

                    {/* THE PROBLEM */}
                    <div className="space-y-3">
                        <h2 className="text-3xl font-black font-mono text-red-600">THE PROBLEM</h2>
                        <div className="bg-red-50 border-l-4 border-red-600 p-4 space-y-2 text-sm">
                            <p><strong>Scotland's mental health crisis:</strong> 1 in 4 experience anxiety/depression (NHS Scotland)</p>
                            <p><strong>NHS wait times:</strong> 18+ weeks for mental health support</p>
                            <p><strong>Economic impact:</strong> £8.8 billion annual cost to Scottish economy (Audit Scotland 2023)</p>
                            <p><strong>Access barrier:</strong> Private therapy costs £80-£200/hour, neurofeedback £500+/session</p>
                        </div>
                    </div>

                    {/* THE SOLUTION */}
                    <div className="space-y-3">
                        <h2 className="text-3xl font-black font-mono text-green-600">THE SOLUTION</h2>
                        <div className="bg-green-50 border-l-4 border-green-600 p-4 space-y-2 text-sm">
                            <p><strong>Universal Frequency51:</strong> Free digital healing frequencies platform</p>
                            <p><strong>Already live:</strong> uf51.love/FrequencyChamber</p>
                            <p><strong>Protocols:</strong> Anxiety, depression, PTSD, ADHD, sleep, pain, burnout, grief</p>
                            <p><strong>Zero cost:</strong> Free forever, no ads, no data extraction</p>
                            <p><strong>Scottish-built:</strong> West Dunbartonshire entrepreneur</p>
                        </div>
                    </div>

                    {/* IMPACT POTENTIAL */}
                    <div className="space-y-3">
                        <h2 className="text-3xl font-black font-mono text-pink-600">IMPACT POTENTIAL</h2>
                        <div className="bg-pink-50 border-l-4 border-pink-600 p-4 space-y-2 text-sm">
                            <p><strong>Cost to NHS:</strong> £0 per user (vs £80-£200 per therapy session, £500+ for neurofeedback)</p>
                            <p><strong>Reach:</strong> Unlimited (digital, scalable)</p>
                            <p><strong>Evidence-based:</strong> Published research, not wellness apps</p>
                            <p><strong>Preventative:</strong> Catch anxiety/depression early, before crisis</p>
                            <p><strong>Already working:</strong> Live platform with active users</p>
                        </div>
                    </div>

                    {/* THE SCIENCE */}
                    <div className="space-y-3">
                        <h2 className="text-3xl font-black font-mono text-cyan-600">THE SCIENCE</h2>
                        <div className="bg-cyan-50 border-l-4 border-cyan-600 p-4 space-y-2 text-sm">
                            <p><strong>40Hz gamma waves:</strong> Proven to increase neuroplasticity (MIT Tsai Lab, Nature 2016-2023)</p>
                            <p><strong>Alpha waves (10Hz):</strong> Reduce cortisol, activate vagal tone (HeartMath Institute)</p>
                            <p><strong>Delta waves (2Hz):</strong> Enhance deep sleep 75%, improve memory 2x (Northwestern, Nature 2017)</p>
                            <p><strong>Binaural beats:</strong> Used in clinical EMDR therapy for PTSD</p>
                            <p className="text-cyan-700 font-bold pt-2">Evidence-based. Published research. Zero pseudo-science.</p>
                        </div>
                    </div>

                    {/* THE ASK */}
                    <div className="space-y-3">
                        <h2 className="text-3xl font-black font-mono text-purple-600">THE ASK</h2>
                        <div className="bg-purple-50 border-l-4 border-purple-600 p-4 space-y-2 text-sm">
                            <p><strong>Funding:</strong> £10,000-£15,000</p>
                            <p><strong>Purpose:</strong></p>
                            <ul className="list-disc list-inside ml-4 space-y-1">
                                <li>NHS Scotland pilot study (measure clinical outcomes)</li>
                                <li>User research in West Dunbartonshire</li>
                                <li>Mental health professional partnerships</li>
                                <li>Accessibility improvements (screen readers, translations)</li>
                                <li>Marketing to reach those who need it most</li>
                            </ul>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="border-t-4 border-cyan-500 pt-6 text-center space-y-3">
                        <div className="flex items-center justify-center gap-3">
                            <COOLASFUCKWaves size={40} animate={false} />
                        </div>
                        <p className="text-xl font-black font-mono">uf51.love</p>
                        <p className="text-sm text-gray-600 font-mono">Making healing accessible to everyone, starting in Scotland</p>
                        <p className="text-xs text-gray-500 font-mono mt-4">Contact: family@uf51.love | Live Demo: uf51.love/FrequencyChamber</p>
                    </div>

                </div>
            </div>
        </>
    );
}