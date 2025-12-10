import React, { useState } from 'react';
import { FileText, Loader2, Download, Send } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import KingdomCrown8Bit from '@/components/shared/KingdomCrown8Bit';

/**
 * CONTRACT GENERATOR - LEGALLY SOUND + COOLASFUCK
 * AI generates contracts with Scott's branding
 * Performance agreements, split sheets, management deals
 * ONE TAP - DONE
 */

export default function ScottContractGenerator({ artistId, artistName }) {
    const [contractType, setContractType] = useState('performance');
    const [isGenerating, setIsGenerating] = useState(false);
    const [contractDetails, setContractDetails] = useState({
        amount: '',
        start_date: '',
        end_date: '',
        venue: '',
        deliverables: '',
        payment_schedule: ''
    });
    const [generatedContract, setGeneratedContract] = useState(null);

    const generateContract = async () => {
        setIsGenerating(true);
        try {
            // AI generates legally sound contract with branding
            const prompt = `Generate a professional ${contractType} contract for music industry.

Artist: ${artistName}
Manager: Scott Kirkwood / Kingdom Management
Amount: £${contractDetails.amount || 'TBC'}
Start Date: ${contractDetails.start_date || 'TBC'}
End Date: ${contractDetails.end_date || 'TBC'}
${contractType === 'performance' ? `Venue: ${contractDetails.venue || 'TBC'}` : ''}
Deliverables: ${contractDetails.deliverables || 'TBC'}
Payment Schedule: ${contractDetails.payment_schedule || 'TBC'}

Create a legally binding contract with:
1. Clear terms and conditions
2. Payment clauses
3. Rights and obligations
4. Termination clauses
5. Kingdom Management branding (clean, professional, modern)
6. UK law compliance

Return CLEAN HTML (no markdown, no code blocks) - ready to display.
Use subtle gold accents (#d4af37) for Kingdom branding.
Professional font, clear sections, signature blocks at bottom.`;

            const contractHtml = await base44.integrations.Core.InvokeLLM({
                prompt: prompt,
                response_json_schema: {
                    type: "object",
                    properties: {
                        html: { type: "string" }
                    }
                }
            });

            // Save contract
            const contract = await base44.entities.ScottContract.create({
                artist_id: artistId,
                contract_type: contractType,
                title: `${contractType} Agreement - ${artistName}`,
                generated_html: contractHtml.html,
                status: 'draft',
                amount: parseFloat(contractDetails.amount) || 0,
                start_date: contractDetails.start_date || null,
                end_date: contractDetails.end_date || null,
                terms: {
                    payment_schedule: contractDetails.payment_schedule,
                    deliverables: contractDetails.deliverables
                }
            });

            setGeneratedContract(contract);
        } catch (error) {
            console.error('Contract generation error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-black border-4 border-amber-500 p-6">
            <div className="flex items-center gap-3 mb-6">
                <KingdomCrown8Bit size={32} animate={true} />
                <div>
                    <h3 className="text-amber-400 font-black font-mono text-lg">CONTRACT GENERATOR</h3>
                    <p className="text-gray-500 text-xs font-mono">Legally sound + COOLASFUCK branding</p>
                </div>
            </div>

            {!generatedContract ? (
                <>
                    <select
                        value={contractType}
                        onChange={(e) => setContractType(e.target.value)}
                        className="w-full bg-black border-2 border-amber-500/50 text-white px-4 py-3 mb-4 font-mono"
                    >
                        <option value="performance">Performance Agreement</option>
                        <option value="recording">Recording Agreement</option>
                        <option value="management">Management Agreement</option>
                        <option value="publishing">Publishing Agreement</option>
                        <option value="split_sheet">Split Sheet</option>
                        <option value="work_for_hire">Work for Hire</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Amount (£)"
                        value={contractDetails.amount}
                        onChange={(e) => setContractDetails({...contractDetails, amount: e.target.value})}
                        className="w-full bg-black border-2 border-amber-500/50 text-white px-4 py-3 mb-3 font-mono"
                    />

                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <input
                            type="date"
                            placeholder="Start Date"
                            value={contractDetails.start_date}
                            onChange={(e) => setContractDetails({...contractDetails, start_date: e.target.value})}
                            className="bg-black border-2 border-amber-500/50 text-white px-4 py-3 font-mono"
                        />
                        <input
                            type="date"
                            placeholder="End Date"
                            value={contractDetails.end_date}
                            onChange={(e) => setContractDetails({...contractDetails, end_date: e.target.value})}
                            className="bg-black border-2 border-amber-500/50 text-white px-4 py-3 font-mono"
                        />
                    </div>

                    {contractType === 'performance' && (
                        <input
                            type="text"
                            placeholder="Venue"
                            value={contractDetails.venue}
                            onChange={(e) => setContractDetails({...contractDetails, venue: e.target.value})}
                            className="w-full bg-black border-2 border-amber-500/50 text-white px-4 py-3 mb-3 font-mono"
                        />
                    )}

                    <textarea
                        placeholder="Deliverables / Key Terms"
                        value={contractDetails.deliverables}
                        onChange={(e) => setContractDetails({...contractDetails, deliverables: e.target.value})}
                        className="w-full bg-black border-2 border-amber-500/50 text-white px-4 py-3 mb-3 font-mono h-24"
                    />

                    <input
                        type="text"
                        placeholder="Payment Schedule (e.g., 50% upfront, 50% on delivery)"
                        value={contractDetails.payment_schedule}
                        onChange={(e) => setContractDetails({...contractDetails, payment_schedule: e.target.value})}
                        className="w-full bg-black border-2 border-amber-500/50 text-white px-4 py-3 mb-4 font-mono"
                    />

                    <button
                        onClick={generateContract}
                        disabled={isGenerating}
                        className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-700 disabled:to-gray-800 text-black disabled:text-gray-500 font-black font-mono text-lg flex items-center justify-center gap-3"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                GENERATING...
                            </>
                        ) : (
                            <>
                                <FileText className="w-6 h-6" />
                                GENERATE CONTRACT
                            </>
                        )}
                    </button>
                </>
            ) : (
                <div className="space-y-4">
                    <div className="bg-green-900/40 border-2 border-green-500 p-4">
                        <p className="text-green-400 font-mono font-bold mb-2">✓ CONTRACT GENERATED</p>
                        <p className="text-gray-400 text-sm font-mono">{generatedContract.title}</p>
                    </div>

                    <div 
                        className="bg-white text-black p-8 max-h-96 overflow-y-auto"
                        dangerouslySetInnerHTML={{ __html: generatedContract.generated_html }}
                    />

                    <div className="flex gap-3">
                        <button className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-mono flex items-center justify-center gap-2">
                            <Download className="w-5 h-5" />
                            DOWNLOAD PDF
                        </button>
                        <button className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-mono flex items-center justify-center gap-2">
                            <Send className="w-5 h-5" />
                            SEND TO SIGN
                        </button>
                    </div>

                    <button
                        onClick={() => setGeneratedContract(null)}
                        className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white font-mono text-sm"
                    >
                        GENERATE NEW
                    </button>
                </div>
            )}
        </div>
    );
}