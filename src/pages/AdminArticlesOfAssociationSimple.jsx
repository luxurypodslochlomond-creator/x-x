
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Printer, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

// Simple signature pad component
const SignaturePad = ({ onSign, label }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
        
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
        
        const ctx = canvas.getContext('2d');
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        onSign(canvas.toDataURL());
    };

    const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onSign('');
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-white">{label}</label>
            <canvas
                ref={canvasRef}
                width={400}
                height={150}
                className="border-2 border-cyan-500/50 rounded-lg bg-white cursor-crosshair w-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
            />
            <Button onClick={clear} variant="outline" size="sm">Clear</Button>
        </div>
    );
};

export default function AdminArticlesOfAssociationSimple() {
    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: () => base44.auth.me()
    });

    const [signature1, setSignature1] = useState('');
    const [signature2, setSignature2] = useState('');
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');

    const handlePrint = () => {
        const signatureControls = document.getElementById('signature-controls');
        if (signatureControls) {
            signatureControls.style.display = 'none';
        }
        window.print();
        if (signatureControls) {
            signatureControls.style.display = 'block';
        }
    };

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Admin access required</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <style>{`
                @media print {
                    body { background: white !important; }
                    * { color: black !important; background: white !important; }
                    header, aside, nav, .no-print { display: none !important; }
                    .print-content { 
                        margin: 0 !important; 
                        padding: 20mm !important;
                        page-break-after: always;
                    }
                    h1 { font-size: 24pt !important; margin-bottom: 12pt !important; }
                    h2 { font-size: 18pt !important; margin: 12pt 0 6pt 0 !important; }
                    h3 { font-size: 14pt !important; margin: 9pt 0 6pt 0 !important; }
                    p, li { font-size: 11pt !important; line-height: 1.4 !important; }
                    .signature-box {
                        border: 1px solid black !important;
                        min-height: 60px !important;
                        margin: 10px 0 !important;
                    }
                }
            `}</style>

            <div className="max-w-4xl mx-auto space-y-6">
                
                <Card className="bg-gradient-to-r from-green-900/40 to-cyan-900/40 border-2 border-green-500 no-print" id="signature-controls">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <CheckCircle className="w-6 h-6 text-green-400" />
                            SIMPLE VERSION - Fast Approval
                        </h2>
                        <p className="text-gray-300 mb-6">
                            This version has ONLY statutory CIC provisions. No Protocol Guardian, no Sunset Clause. 
                            You can add those later with a Special Resolution (£15 fee) after you're registered.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <SignaturePad 
                                onSign={setSignature1}
                                label="Brian Hughes - Signature"
                            />
                            <SignaturePad 
                                onSign={setSignature2}
                                label="Gillian Brown - Signature"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="text-sm font-bold text-white block mb-2">Date (Brian)</label>
                                <input
                                    type="date"
                                    value={date1}
                                    onChange={(e) => setDate1(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-900 border border-cyan-500/50 rounded text-white"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-white block mb-2">Date (Gillian)</label>
                                <input
                                    type="date"
                                    value={date2}
                                    onChange={(e) => setDate2(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-900 border border-cyan-500/50 rounded text-white"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handlePrint}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg"
                            disabled={!signature1 || !signature2 || !date1 || !date2}
                        >
                            <Printer className="w-5 h-5 mr-2" />
                            Print to PDF
                        </Button>
                        
                        <p className="text-xs text-gray-400 mt-4 text-center">
                            After signing both directors, click "Print to PDF" and save as "UF51_Articles_Simple.pdf"
                        </p>
                    </CardContent>
                </Card>

                <div className="print-content bg-white text-black p-12">
                    
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black mb-2">ARTICLES OF ASSOCIATION</h1>
                        <p className="text-lg font-bold">of</p>
                        <h2 className="text-2xl font-black mt-2">UNIVERSALFREQUENCY51 CIC</h2>
                        <p className="text-sm mt-4">(A COMMUNITY INTEREST COMPANY LIMITED BY SHARES)</p>
                    </div>

                    <div className="space-y-6">
                        
                        <section>
                            <h2 className="text-xl font-black mb-3">1. NAME</h2>
                            <p>The name of the Company is UniversalFrequency51 CIC.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-3">2. TYPE OF COMPANY</h2>
                            <p>The Company is a Community Interest Company limited by shares.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-3">3. OBJECTS</h2>
                            <p className="mb-3">The objects of the Company are to carry on activities which benefit the community and in particular (without limitation) to:</p>
                            
                            <h3 className="font-bold mt-4 mb-2">3.1 Environmental Protection</h3>
                            <ul className="list-disc ml-6 space-y-1">
                                <li>Organize and incentivize community litter collection and environmental cleanup activities</li>
                                <li>Protect and restore natural ecosystems, waterways, forests, and wildlife habitats</li>
                                <li>Combat climate change through direct action and community engagement</li>
                                <li>Promote sustainable living practices and circular economy principles</li>
                            </ul>

                            <h3 className="font-bold mt-4 mb-2">3.2 Poverty Relief & Humanitarian Aid</h3>
                            <ul className="list-disc ml-6 space-y-1">
                                <li>Provide direct financial support to individuals and families in need</li>
                                <li>Fund basic human necessities including food, shelter, healthcare, and education</li>
                                <li>Support disaster relief and emergency humanitarian response globally</li>
                                <li>Create economic opportunities for marginalized and disadvantaged communities</li>
                            </ul>

                            <h3 className="font-bold mt-4 mb-2">3.3 Mental Health & Wellbeing</h3>
                            <ul className="list-disc ml-6 space-y-1">
                                <li>Provide free access to healing frequencies and therapeutic audio content</li>
                                <li>Support mental health through nature connection and environmental stewardship</li>
                                <li>Combat loneliness and isolation through community building</li>
                                <li>Promote holistic wellbeing practices accessible to all</li>
                            </ul>

                            <h3 className="font-bold mt-4 mb-2">3.4 Arts, Culture & Education</h3>
                            <ul className="list-disc ml-6 space-y-1">
                                <li>Support independent artists, musicians, and creators through fair compensation</li>
                                <li>Preserve and promote cultural heritage and artistic expression</li>
                                <li>Provide educational resources on environmental stewardship and sustainable living</li>
                                <li>Foster creativity as a tool for social change and healing</li>
                            </ul>

                            <h3 className="font-bold mt-4 mb-2">3.5 Community Development</h3>
                            <ul className="list-disc ml-6 space-y-1">
                                <li>Build strong, connected communities based on mutual aid and support</li>
                                <li>Promote social inclusion and combat discrimination</li>
                                <li>Create opportunities for meaningful participation in community life</li>
                                <li>Develop innovative models for community-led social change</li>
                            </ul>

                            <h3 className="font-bold mt-4 mb-2">3.6 Animal Welfare</h3>
                            <ul className="list-disc ml-6 space-y-1">
                                <li>Support animal sanctuaries and wildlife protection organizations</li>
                                <li>Promote ethical treatment of all sentient beings</li>
                                <li>Fund veterinary care for animals in need</li>
                                <li>Protect endangered species and biodiversity</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-3">4. POWERS</h2>
                            <p className="mb-3">To further its objects the Company may do all such lawful things as may further the Company's objects and, in particular, but, without limitation, may:</p>
                            
                            <div className="ml-8 space-y-2 mb-6">
                                <p>4.1 Develop, maintain, and distribute software, applications, and digital infrastructure;</p>
                                <p>4.2 Enter into contracts and commercial arrangements;</p>
                                <p>4.3 Employ staff and engage contractors, consultants, and volunteers;</p>
                                <p>4.4 Accept donations, grants, and funding from public and private sources;</p>
                                <p>4.5 Borrow or raise and secure the payment of money;</p>
                                <p>4.6 Make grants to asset-locked bodies in furtherance of the Company's objects;</p>
                                <p>4.7 Do all such other lawful things as are necessary for or are incidental to or conducive to the achievement of the objects.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-3">5. SHARE CAPITAL</h2>
                            <p>The Company's initial share capital is £1 divided into 1 ordinary share of £1 each.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-3">6. LIABILITY OF MEMBERS</h2>
                            <p>The liability of each member is limited to the amount, if any, unpaid on the shares held by that member.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-3">7. ASSET LOCK</h2>
                            
                            <h3 className="font-bold mt-4 mb-2">7.1 Application of Assets</h3>
                            <p className="mb-3">The assets and income of the Company shall be applied solely in furtherance of its objects as set out in Article 3.</p>

                            <h3 className="font-bold mt-4 mb-2">7.2 Distribution Restriction</h3>
                            <p className="mb-3">No portion of the Company's assets or income shall be paid or transferred directly or indirectly by way of dividend, bonus or otherwise by way of profit to members of the Company except:</p>
                            <ul className="list-disc ml-6 space-y-1">
                                <li>Reasonable remuneration to directors and employees for goods or services actually supplied to the Company</li>
                                <li>Interest at a rate not exceeding 2% above the Bank of England base rate on money lent to the Company</li>
                                <li>Reasonable rent for premises let by any member to the Company</li>
                            </ul>

                            <h3 className="font-bold mt-4 mb-2">7.3 Transfer of Assets</h3>
                            <p>No assets of the Company shall be transferred to members or third parties except at full market value.</p>

                            <h3 className="font-bold mt-4 mb-2">7.4 Dividend Cap</h3>
                            <p>The Company may not pay dividends to its members.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-3">8. DIRECTORS</h2>
                            
                            <h3 className="font-bold mt-4 mb-2">8.1 Number of Directors</h3>
                            <p>The Company shall have at least one director and no more than twelve directors.</p>

                            <h3 className="font-bold mt-4 mb-2">8.2 Powers of Directors</h3>
                            <p>Subject to the Articles and to any directions given by special resolution, the business of the Company shall be managed by the directors who may exercise all the powers of the Company.</p>

                            <h3 className="font-bold mt-4 mb-2">8.3 Directors' Remuneration</h3>
                            <p>Directors may be paid reasonable remuneration for services actually rendered to the Company.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-3">9. MEETINGS</h2>
                            
                            <h3 className="font-bold mt-4 mb-2">9.1 General Meetings</h3>
                            <p>The Company shall hold an Annual General Meeting each year in addition to any other general meetings.</p>

                            <h3 className="font-bold mt-4 mb-2">9.2 Notice of Meetings</h3>
                            <p>At least 14 clear days' notice shall be given of all general meetings.</p>

                            <h3 className="font-bold mt-4 mb-2">9.3 Quorum</h3>
                            <p>The quorum for general meetings shall be two members present in person or by proxy.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-3">10. DISSOLUTION</h2>
                            <p className="mb-3">If upon winding up or dissolution of the Company there remains, after satisfaction of all its debts and liabilities, any assets or property, the same shall not be paid to or distributed among the members of the Company but shall be transferred to:</p>
                            <ul className="list-disc ml-6 space-y-1">
                                <li>Another Community Interest Company; or</li>
                                <li>A charity or charities established for similar purposes; or</li>
                                <li>Any other asset-locked body as defined by the Community Interest Company Regulations 2005</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-3">11. COMMUNITY INTEREST TEST</h2>
                            <p>The Company has been established to benefit the community and all its activities shall be carried out with this purpose in mind, in accordance with the requirements set out in the Community Interest Company Regulations 2005.</p>
                        </section>

                    </div>

                    <div className="mt-16 page-break-before">
                        <h2 className="text-xl font-black mb-6">SUBSCRIBERS</h2>
                        <p className="mb-6">We, the subscribers to this memorandum of association, wish to be formed into a company pursuant to this memorandum and articles, and we agree to take the number of shares shown opposite our respective names.</p>

                        <div className="space-y-8 mt-8">
                            <div className="border-2 border-black p-4">
                                <p className="font-bold mb-2">Subscriber 1:</p>
                                <p className="mb-4">Name: Brian Hughes</p>
                                <p className="mb-4">Address: Stoneymollan, Upper Stoneymollan Road, Alexandria, G83 8QU</p>
                                <p className="mb-4">Number of shares: 1</p>
                                <div className="signature-box mt-4 mb-2">
                                    {signature1 && <img src={signature1} alt="Signature 1" className="max-h-16" />}
                                </div>
                                <p className="text-sm">Signature: ______________________ Date: {date1 || '__________'}</p>
                            </div>

                            <div className="border-2 border-black p-4">
                                <p className="font-bold mb-2">Subscriber 2:</p>
                                <p className="mb-4">Name: Gillian Brown</p>
                                <p className="mb-4">Address: Stoneymollan, Upper Stoneymollan Road, Alexandria, G83 8QU</p>
                                <p className="mb-4">Number of shares: 0</p>
                                <div className="signature-box mt-4 mb-2">
                                    {signature2 && <img src={signature2} alt="Signature 2" className="max-h-16" />}
                                </div>
                                <p className="text-sm">Signature: ______________________ Date: {date2 || '__________'}</p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <p className="text-sm italic">Dated this ______ day of _____________ 20____</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
