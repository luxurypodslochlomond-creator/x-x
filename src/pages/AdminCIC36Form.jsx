import React, { useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SignaturePad = ({ onSign, directorName }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        
        ctx.beginPath();
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
        ctx.moveTo(x, y);
        setIsDrawing(true);
        setIsEmpty(false);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
        
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        onSign(canvas.toDataURL());
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setIsEmpty(true);
        onSign(null);
    };

    return (
        <div className="border-2 border-black p-4">
            <p className="font-bold mb-2">{directorName}</p>
            <canvas
                ref={canvasRef}
                width={400}
                height={100}
                className="border border-gray-400 cursor-crosshair bg-white"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
            />
            <Button 
                type="button" 
                onClick={clear} 
                className="mt-2 bg-red-600 hover:bg-red-700 text-white"
                size="sm"
            >
                Clear
            </Button>
        </div>
    );
};

export default function AdminCIC36Form() {
    const [user, setUser] = useState(null);
    const [signature1, setSignature1] = useState(null);
    const [signature2, setSignature2] = useState(null);
    const [date1, setDate1] = useState(new Date().toISOString().split('T')[0]);
    const [date2, setDate2] = useState(new Date().toISOString().split('T')[0]);
    const [showSignatures, setShowSignatures] = useState(true);

    React.useEffect(() => {
        base44.auth.me().then(u => setUser(u)).catch(() => {});
    }, []);

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-red-400">Admin access only</p>
            </div>
        );
    }

    const handlePrint = () => {
        setShowSignatures(false);
        setTimeout(() => {
            window.print();
            setTimeout(() => setShowSignatures(true), 100);
        }, 100);
    };

    return (
        <>
            <style>{`
                @media print {
                    /* NUCLEAR OPTION - Kill EVERYTHING except .print-doc */
                    * {
                        visibility: hidden !important;
                    }
                    
                    .print-doc, .print-doc * {
                        visibility: visible !important;
                    }
                    
                    .print-doc {
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 15mm !important;
                        background: white !important;
                        color: black !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    body, html {
                        background: white !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                }
                
                @page {
                    margin: 15mm;
                    size: A4;
                }
                
                .page-break {
                    page-break-after: always;
                }
            `}</style>

            <div className="min-h-screen bg-white text-black p-4 md:p-12">
                {showSignatures && (
                    <div className="mb-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500 rounded-lg max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4 text-green-900">✍️ Sign Your CIC36 Form</h2>
                        
                        <div className="space-y-6 mb-6">
                            <div>
                                <SignaturePad 
                                    onSign={setSignature1} 
                                    directorName="Brian Hughes - Sign Here"
                                />
                                <div className="mt-2">
                                    <label className="text-sm font-bold">Date:</label>
                                    <Input 
                                        type="date" 
                                        value={date1} 
                                        onChange={(e) => setDate1(e.target.value)}
                                        className="w-48 ml-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <SignaturePad 
                                    onSign={setSignature2} 
                                    directorName="Gillian Brown - Sign Here"
                                />
                                <div className="mt-2">
                                    <label className="text-sm font-bold">Date:</label>
                                    <Input 
                                        type="date" 
                                        value={date2} 
                                        onChange={(e) => setDate2(e.target.value)}
                                        className="w-48 ml-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button 
                            onClick={handlePrint}
                            disabled={!signature1 || !signature2}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-xl"
                        >
                            {(!signature1 || !signature2) ? '⚠️ Sign Both Directors First' : '🖨️ Print to PDF (Cmd+P / Ctrl+P)'}
                        </Button>
                        
                        {(!signature1 || !signature2) && (
                            <p className="text-center text-red-600 font-bold mt-2">
                                Both directors must sign before you can print!
                            </p>
                        )}
                    </div>
                )}

                <div className="print-doc max-w-4xl mx-auto bg-white">
                    
                    {/* PAGE 1 - TITLE */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-black mb-4" style={{color: 'black'}}>CIC 36</h1>
                        <h2 className="text-2xl font-bold" style={{color: 'black'}}>Declarations on Formation of a Community Interest Company</h2>
                    </div>

                    <div className="border-2 border-black p-4 mb-8" style={{background: 'white'}}>
                        <div className="flex justify-between items-center">
                            <p className="font-bold" style={{color: 'black'}}>Company Name in full:</p>
                            <p className="text-xl font-bold" style={{color: 'black'}}>UniversalFrequency51 CIC</p>
                        </div>
                    </div>

                    <div className="border-2 border-black p-4 mb-12" style={{background: 'white'}}>
                        <p className="text-center font-bold" style={{color: 'black'}}>Community Interest Company</p>
                    </div>

                    <div className="page-break"></div>

                    {/* PAGE 2 - SECTION A */}
                    <div className="mb-8">
                        <div className="bg-gray-200 p-4 mb-6 border-2 border-black" style={{background: '#e5e7eb'}}>
                            <h3 className="text-xl font-bold" style={{color: 'black'}}>SECTION A: COMMUNITY INTEREST STATEMENT – beneficiaries</h3>
                        </div>
                        
                        <p className="mb-6 leading-relaxed" style={{color: 'black'}}>
                            1. We/I, the undersigned, declare that the company will carry on its activities for the benefit of the community, or a section of the community.
                        </p>

                        <p className="mb-4 font-bold" style={{color: 'black'}}>The company's activities will provide benefit to...</p>
                        
                        <div className="border-2 border-black p-4 bg-blue-50 leading-relaxed" style={{background: '#eff6ff', color: 'black'}}>
                            Individuals and communities globally, particularly those affected by environmental degradation, poverty, and social isolation. This includes coastal communities impacted by pollution, individuals seeking supplemental income through environmental action, independent artists and musicians, humanitarian aid recipients, and all souls aligned with planetary healing and social justice.
                        </div>
                    </div>

                    <div className="border-2 border-black p-2 mt-8" style={{background: 'white'}}>
                        <p className="font-bold text-center" style={{color: 'black'}}>COMPANY NAME: UniversalFrequency51 CIC</p>
                    </div>

                    <div className="page-break"></div>

                    {/* PAGE 3 - SECTION B */}
                    <div className="mb-8">
                        <div className="bg-gray-200 p-4 mb-6 border-2 border-black" style={{background: '#e5e7eb'}}>
                            <h3 className="text-xl font-bold" style={{color: 'black'}}>SECTION B: Community Interest Statement – Activities & Related Benefit</h3>
                        </div>

                        <table className="w-full border-collapse border-2 border-black" style={{background: 'white'}}>
                            <thead>
                                <tr className="bg-gray-200" style={{background: '#e5e7eb'}}>
                                    <th className="border-2 border-black p-3 text-left w-1/2" style={{color: 'black'}}>Activities<br/><span className="text-sm font-normal">(Day to day activities of the company)</span></th>
                                    <th className="border-2 border-black p-3 text-left w-1/2" style={{color: 'black'}}>How will the activity benefit the community?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-2 border-black p-3 align-top bg-blue-50" style={{background: '#eff6ff', color: 'black'}}>
                                        <p className="font-bold mb-2">Digital Platform Development & Operation</p>
                                        <p className="text-sm">Operating a web-based platform (uf51.love) that verifies and rewards environmental cleanup actions with social currency ($P51).</p>
                                    </td>
                                    <td className="border-2 border-black p-3 align-top" style={{background: 'white', color: 'black'}}>
                                        <p className="text-sm leading-relaxed">
                                            Creates direct economic incentive for planetary healing. Individuals earn verifiable value through environmental action, providing supplemental income for those in need. AI verification ensures swift payment, making environmental work economically viable.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black p-3 align-top bg-blue-50" style={{background: '#eff6ff', color: 'black'}}>
                                        <p className="font-bold mb-2">Environmental Verification & Reward System</p>
                                        <p className="text-sm">Photo + GPS verification of litter collection. Instant $P51 token distribution based on verified weight.</p>
                                    </td>
                                    <td className="border-2 border-black p-3 align-top" style={{background: 'white', color: 'black'}}>
                                        <p className="text-sm leading-relaxed">
                                            Provides transparent, immediate compensation for environmental work. Rewards: 1 $P51 per 1 kg collected, with bonuses for larger cleanups. Accessible to anyone globally with a smartphone.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black p-3 align-top bg-blue-50" style={{background: '#eff6ff', color: 'black'}}>
                                        <p className="font-bold mb-2">Fair Music & Art Distribution Platform</p>
                                        <p className="text-sm">Artists upload music/art. Receive 90% of all proceeds. Community-funded through 10% platform tithe.</p>
                                    </td>
                                    <td className="border-2 border-black p-3 align-top" style={{background: 'white', color: 'black'}}>
                                        <p className="text-sm leading-relaxed">
                                            Addresses artist exploitation by major streaming platforms (which typically pay 30-50% to artists). Our 90/10 model ensures creators receive fair compensation. Provides free access to healing frequencies and creative content for all users.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-2 border-black p-3 align-top bg-blue-50" style={{background: '#eff6ff', color: 'black'}}>
                                        <p className="font-bold mb-2">Community-Governed Humanitarian Fund</p>
                                        <p className="text-sm">10% of all platform value flows to The UF51 Fund. Community votes on mission allocation.</p>
                                    </td>
                                    <td className="border-2 border-black p-3 align-top" style={{background: 'white', color: 'black'}}>
                                        <p className="text-sm leading-relaxed">
                                            Transparent funding for humanitarian missions (Jane Goodall Institute, disaster relief, food security, etc.). Real-time public dashboard shows all allocations. Democratic governance ensures community priorities are met.
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="border-2 border-black p-4 mt-6 mb-8" style={{background: 'white'}}>
                        <p className="font-bold mb-2" style={{color: 'black'}}>If the company makes any surplus, it will be used for...</p>
                        <p className="leading-relaxed" style={{color: 'black'}}>
                            Any surplus generated will be reinvested in platform development, verification systems, and community education, and/or donated to other Community Interest Companies and charities with similar environmental and humanitarian objectives, with the consent of the CIC Regulator.
                        </p>
                    </div>

                    <div className="border-2 border-black p-2" style={{background: 'white'}}>
                        <p className="font-bold text-center" style={{color: 'black'}}>COMPANY NAME: UniversalFrequency51 CIC</p>
                    </div>

                    <div className="page-break"></div>

                    {/* PAGE 4 - SECTION C */}
                    <div className="mb-8">
                        <div className="bg-gray-200 p-4 mb-6 border-2 border-black" style={{background: '#e5e7eb'}}>
                            <h3 className="text-xl font-bold" style={{color: 'black'}}>SECTION C: Political Party Declaration</h3>
                        </div>
                        
                        <p className="mb-4 leading-relaxed" style={{color: 'black'}}>
                            1. We/I, the undersigned, declare that the company in respect of which this application is made will not be:
                        </p>
                        
                        <ul className="ml-8 mb-8 space-y-2 leading-relaxed" style={{color: 'black'}}>
                            <li>(a) a political party;</li>
                            <li>(b) a political campaigning organisation; or</li>
                            <li>(c) a subsidiary of a political party or of a political campaigning organisation.</li>
                        </ul>
                    </div>

                    {/* PAGE 4 - SECTION D - SIGNATURES */}
                    <div className="mb-8">
                        <div className="bg-gray-200 p-4 mb-6 border-2 border-black" style={{background: '#e5e7eb'}}>
                            <h3 className="text-xl font-bold text-red-700" style={{color: '#b91c1c'}}>SECTION D: Director Signatures</h3>
                            <p className="text-sm text-red-600 mt-2" style={{color: '#dc2626'}}>⚠️ If this section is not completed your application will be rejected.</p>
                        </div>

                        <p className="mb-6 font-bold" style={{color: 'black'}}>Each person who is a director of the company must sign the declarations.</p>

                        <div className="space-y-8">
                            {/* Director 1 Signature */}
                            <div className="border-2 border-black p-6" style={{background: 'white'}}>
                                <p className="font-bold mb-4 text-lg" style={{color: 'black'}}>Director 1: Brian Hughes</p>
                                <div className="grid grid-cols-2 gap-8 mt-6">
                                    <div>
                                        <p className="text-sm mb-2" style={{color: 'black'}}>Signed:</p>
                                        {signature1 ? (
                                            <img src={signature1} alt="Signature 1" className="h-16 border-b-2 border-black" />
                                        ) : (
                                            <div className="border-b-2 border-black h-16"></div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm mb-2" style={{color: 'black'}}>Date:</p>
                                        <div className="border-b-2 border-black h-16 flex items-center">
                                            <p className="font-bold" style={{color: 'black'}}>{new Date(date1).toLocaleDateString('en-GB')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Director 2 Signature */}
                            <div className="border-2 border-black p-6" style={{background: 'white'}}>
                                <p className="font-bold mb-4 text-lg" style={{color: 'black'}}>Director 2: Gillian Brown</p>
                                <div className="grid grid-cols-2 gap-8 mt-6">
                                    <div>
                                        <p className="text-sm mb-2" style={{color: 'black'}}>Signed:</p>
                                        {signature2 ? (
                                            <img src={signature2} alt="Signature 2" className="h-16 border-b-2 border-black" />
                                        ) : (
                                            <div className="border-b-2 border-black h-16"></div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm mb-2" style={{color: 'black'}}>Date:</p>
                                        <div className="border-b-2 border-black h-16 flex items-center">
                                            <p className="font-bold" style={{color: 'black'}}>{new Date(date2).toLocaleDateString('en-GB')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CONTACT INFO */}
                    <div className="border-2 border-black p-4 mt-8" style={{background: 'white'}}>
                        <p className="text-sm mb-4 italic" style={{color: 'black'}}>You do not have to give any contact information below, but if you do, it will help the Registrar of Companies to contact you if there is a query on the form.</p>
                        
                        <div className="mt-4">
                            <p className="font-bold" style={{color: 'black'}}>Email:</p>
                            <p style={{color: 'black'}}>family@uf51.love</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}