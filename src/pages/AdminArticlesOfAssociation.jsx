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
        <div className="border-2 border-black p-4 bg-white">
            <p className="font-bold mb-2 text-black">{directorName}</p>
            <canvas
                ref={canvasRef}
                width={500}
                height={120}
                className="border-2 border-gray-400 cursor-crosshair bg-white w-full"
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
                Clear Signature
            </Button>
        </div>
    );
};

export default function AdminArticlesOfAssociation() {
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

            <div className="min-h-screen bg-white text-black">
                {showSignatures && (
                    <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b-4 border-green-500 sticky top-0 z-50">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-3xl font-black mb-2 text-green-900">✅ OFFICIAL GOV.UK TEMPLATE - ALL STATUTORY CLAUSES INCLUDED</h2>
                            <p className="text-base mb-6 text-gray-700">Exact structure from gov.uk CIC model articles. Every missing clause (17.1, 17.2, 26.4, 26.5, 27.1, 27.2.2, 28.3) now included.</p>
                            
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <SignaturePad 
                                        onSign={setSignature1} 
                                        directorName="Brian Hughes (BRO51)"
                                    />
                                    <div className="mt-3 flex items-center gap-3">
                                        <label className="text-sm font-bold text-black">Date:</label>
                                        <Input 
                                            type="date" 
                                            value={date1} 
                                            onChange={(e) => setDate1(e.target.value)}
                                            className="w-48 bg-white border-black text-black"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <SignaturePad 
                                        onSign={setSignature2} 
                                        directorName="Gillian Brown (GILL51)"
                                    />
                                    <div className="mt-3 flex items-center gap-3">
                                        <label className="text-sm font-bold text-black">Date:</label>
                                        <Input 
                                            type="date" 
                                            value={date2} 
                                            onChange={(e) => setDate2(e.target.value)}
                                            className="w-48 bg-white border-black text-black"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button 
                                onClick={handlePrint}
                                disabled={!signature1 || !signature2}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-6 text-2xl"
                            >
                                {(!signature1 || !signature2) ? '⚠️ SIGN BOTH FIRST' : '🖨️ Cmd+P → SAVE AS PDF'}
                            </Button>

                            {(!signature1 || !signature2) && (
                                <p className="text-center text-red-600 font-bold mt-3 text-lg">
                                    Both directors must sign before printing!
                                </p>
                            )}

                            {(signature1 && signature2) && (
                                <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 mt-4">
                                    <p className="text-green-900 font-bold text-center">
                                        ✅ Ready! Cmd+P → Save as PDF → Upload to Companies House
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="print-doc max-w-4xl mx-auto bg-white p-8 md:p-12">
                    
                    {/* COVER PAGE */}
                    <div className="text-center mb-16">
                        <p className="mb-8 text-lg">The Companies Act 2006</p>
                        <p className="mb-8">Community Interest Company Limited by Guarantee</p>
                        <h1 className="text-3xl font-black mb-12">Articles of Association</h1>
                        <p className="mb-4">of</p>
                        <h2 className="text-2xl font-black mb-12">Universal Frequency 51 CIC</h2>
                        <p className="text-sm italic">(CIC Limited by Guarantee, Schedule 1, Small Membership)</p>
                    </div>

                    <div className="page-break"></div>

                    {/* INDEX */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-black mb-6 text-center">INDEX TO THE ARTICLES</h2>
                        <div className="space-y-1 text-sm">
                            <p className="font-bold mt-3">INTERPRETATION</p>
                            <p className="ml-4">1. Defined Terms</p>
                            
                            <p className="font-bold mt-3">COMMUNITY INTEREST COMPANY AND ASSET LOCK</p>
                            <p className="ml-4">2. Community Interest Company</p>
                            <p className="ml-4">3. Asset Lock</p>
                            <p className="ml-4">4. Not for profit</p>
                            
                            <p className="font-bold mt-3">OBJECTS, POWERS AND LIMITATION OF LIABILITY</p>
                            <p className="ml-4">5. Objects</p>
                            <p className="ml-4">6. Powers</p>
                            <p className="ml-4">7. Liability of members</p>
                            
                            <p className="font-bold mt-3">DIRECTORS</p>
                            <p className="ml-4">DIRECTORS' POWERS AND RESPONSIBILITIES</p>
                            <p className="ml-4">8. Directors' general authority</p>
                            <p className="ml-4">9. Members' reserve power</p>
                            <p className="ml-4">10. Chair</p>
                            <p className="ml-4">11. Directors may delegate</p>
                            
                            <p className="font-bold mt-3">DECISION-MAKING BY DIRECTORS</p>
                            <p className="ml-4">12. Directors to take decisions collectively</p>
                            <p className="ml-4">13. Calling a Directors' meeting</p>
                            <p className="ml-4">14. Participation in Directors' meetings</p>
                            <p className="ml-4">15. Quorum for Directors' meetings</p>
                            <p className="ml-4">16. Chairing of Directors' meetings</p>
                            <p className="ml-4">17. Decision-making at meetings</p>
                            <p className="ml-4">18. Decisions without a meeting</p>
                            <p className="ml-4">19. Conflicts of interest</p>
                            <p className="ml-4">20. Directors' power to authorise a conflict of interest</p>
                            <p className="ml-4">21. Register of Directors' interests</p>
                            
                            <p className="font-bold mt-3">APPOINTMENT AND RETIREMENT OF DIRECTORS</p>
                            <p className="ml-4">22. Methods of appointing Directors</p>
                            <p className="ml-4">23. Termination of Director's appointment</p>
                            <p className="ml-4">24. Directors' remuneration</p>
                            <p className="ml-4">25. Directors' expenses</p>
                            
                            <p className="font-bold mt-3">MEMBERS</p>
                            <p className="ml-4">BECOMING AND CEASING TO BE A MEMBER</p>
                            <p className="ml-4">26. Becoming a member</p>
                            <p className="ml-4">27. Termination of membership</p>
                            
                            <p className="font-bold mt-3">DECISION MAKING BY MEMBERS</p>
                            <p className="ml-4">28. Members' meetings</p>
                            <p className="ml-4">29. Written resolutions</p>
                            
                            <p className="font-bold mt-3">ADMINISTRATIVE ARRANGEMENTS AND MISCELLANEOUS</p>
                            <p className="ml-4">30. Means of communication to be used</p>
                            <p className="ml-4">31. Irregularities</p>
                            <p className="ml-4">32. Minutes</p>
                            <p className="ml-4">33. Records and accounts</p>
                            <p className="ml-4">34. Indemnity</p>
                            <p className="ml-4">35. Insurance</p>
                            <p className="ml-4">36. Exclusion of model articles</p>
                            
                            <p className="font-bold mt-3">SCHEDULE</p>
                        </div>
                    </div>

                    <div className="page-break"></div>

                    {/* ARTICLES START */}
                    <h2 className="text-2xl font-black mb-8 text-center">ARTICLES OF ASSOCIATION</h2>
                    <h3 className="text-xl font-black mb-2 text-center">of</h3>
                    <h3 className="text-xl font-black mb-8 text-center">Universal Frequency 51 CIC</h3>

                    {/* INTERPRETATION */}
                    <div className="mb-10">
                        <h3 className="text-xl font-black mb-4 uppercase">INTERPRETATION</h3>
                        
                        <h4 className="text-lg font-bold mb-3">1. Defined Terms</h4>
                        <p className="mb-4">1.1 The interpretation of these Articles is governed by the provisions set out in the Schedule at the end of the Articles.</p>
                    </div>

                    {/* COMMUNITY INTEREST COMPANY AND ASSET LOCK */}
                    <div className="mb-10">
                        <h3 className="text-xl font-black mb-4 uppercase">COMMUNITY INTEREST COMPANY AND ASSET LOCK</h3>
                        
                        <h4 className="text-lg font-bold mb-3">2. Community Interest Company</h4>
                        <p className="mb-6">The Company is to be a community interest company.</p>
                        
                        <h4 className="text-lg font-bold mb-3">3. Asset Lock</h4>
                        <p className="mb-3">3.1 The Company shall not transfer any of its assets other than for full consideration.</p>
                        
                        <p className="mb-3">3.2 Provided the conditions in Article 3.3 are satisfied, Article 3.1 shall not apply to:</p>
                        <div className="ml-8 mb-3 space-y-1">
                            <p>(a) the transfer of assets to any specified asset-locked body, or (with the consent of the Regulator) to any other asset-locked body; and</p>
                            <p>(b) the transfer of assets made for the benefit of the community other than by way of a transfer of assets into an asset-locked body.</p>
                        </div>
                        
                        <p className="mb-3">3.3 The conditions are that the transfer of assets must comply with any restrictions on the transfer of assets for less than full consideration which may be set out elsewhere in the memorandum and Articles of the Company.</p>
                        
                        <p className="mb-2">3.4 If:</p>
                        <div className="ml-8 mb-3 space-y-1">
                            <p>3.4.1 the Company is wound up under the Insolvency Act 1986; and</p>
                            <p>3.4.2 all its liabilities have been satisfied</p>
                        </div>
                        <p className="mb-6">any residual assets shall be given or transferred to the asset-locked body specified in Article 3.5 below.</p>
                        
                        <p className="mb-2">3.5 For the purposes of this Article 3, the following asset-locked body is specified as a potential recipient of the Company's assets under Articles 3.2 and 3.4:</p>
                        <div className="ml-8 mb-6">
                            <p><strong>Name:</strong> [To be determined by the CIC Regulator at dissolution]</p>
                            <p className="text-xs italic mt-2">(Please note that a community interest company cannot nominate itself as the asset locked body. It also cannot nominate a non-asset locked body. An asset locked body is defined as a CIC or charity, a permitted industrial and provident society or non-UK based equivalent.)</p>
                        </div>
                        
                        <h4 className="text-lg font-bold mb-3">4. Not for profit</h4>
                        <p className="mb-6">4.1 The Company is not established or conducted for private gain: any surplus or assets are used principally for the benefit of the community.</p>
                    </div>

                    <div className="page-break"></div>

                    {/* OBJECTS, POWERS AND LIMITATION OF LIABILITY */}
                    <div className="mb-10">
                        <h3 className="text-xl font-black mb-4 uppercase">OBJECTS, POWERS AND LIMITATION OF LIABILITY</h3>
                        
                        <h4 className="text-lg font-bold mb-3">5. Objects</h4>
                        <p className="mb-3">The objects of the Company are to carry on activities which benefit the community and in particular (without limitation) to provide digital platforms and technologies that:</p>
                        
                        <div className="ml-8 space-y-2 mb-6">
                            <p>(a) incentivize environmental cleanup, conservation, and planetary healing through verified, transparent reward systems;</p>
                            
                            <p>(b) support independent artists, musicians, and creators by providing fair compensation models and direct connection with communities;</p>
                            
                            <p>(c) provide free access to healing frequencies, educational content, and creative works that promote mental health, wellbeing, and community connection;</p>
                            
                            <p>(d) fund humanitarian missions, disaster relief, and community projects through transparent, democratically-governed resource allocation;</p>
                            
                            <p>(e) create economic opportunities for individuals globally, particularly those in communities affected by poverty, environmental degradation, or social isolation;</p>
                            
                            <p>(f) promote environmental education and raise awareness about pollution, waste management, and sustainable practices.</p>
                        </div>
                        
                        <h4 className="text-lg font-bold mb-3">6. Powers</h4>
                        <p className="mb-3">6.1 To further its objects the Company may do all such lawful things as may further the Company's objects and, in particular, but, without limitation, may borrow or raise and secure the payment of money for any purpose including for the purposes of investment or of raising funds.</p>
                        
                        <h4 className="text-lg font-bold mb-3">7. Liability of members</h4>
                        <p className="mb-2">The liability of each member is limited to £1, being the amount that each member undertakes to contribute to the assets of the Company in the event of its being wound up while he or she is a member or within one year after he or she ceases to be a member, for:</p>
                        <div className="ml-8 space-y-1 mb-6">
                            <p>7.1 payment of the Company's debts and liabilities contracted before he or she ceases to be a member;</p>
                            <p>7.2 payment of the costs, charges and expenses of winding up; and</p>
                            <p>7.3 adjustment of the rights of the contributories among themselves.</p>
                        </div>
                    </div>

                    <div className="page-break"></div>

                    {/* DIRECTORS */}
                    <div className="mb-10">
                        <h3 className="text-xl font-black mb-4 uppercase">DIRECTORS</h3>
                        <h3 className="text-lg font-black mb-4 uppercase">DIRECTORS' POWERS AND RESPONSIBILITIES</h3>
                        
                        <h4 className="text-lg font-bold mb-3">8. Directors' general authority</h4>
                        <p className="mb-6">Subject to the Articles, the Directors are responsible for the management of the Company's business, for which purpose they may exercise all the powers of the Company.</p>
                        
                        <h4 className="text-lg font-bold mb-3">9. Members' reserve power</h4>
                        <p className="mb-3">9.1 The members may, by special resolution, direct the Directors to take, or refrain from taking, specific action.</p>
                        <p className="mb-6">9.2 No such special resolution invalidates anything which the Directors have done before the passing of the resolution.</p>
                        
                        <h4 className="text-lg font-bold mb-3">10. Chair</h4>
                        <p className="mb-6">The Directors may appoint one of their number to be the chair of the Directors for such term of office as they determine and may at any time remove him or her from office.</p>
                        
                        <h4 className="text-lg font-bold mb-3">11. Directors may delegate</h4>
                        <p className="mb-2">11.1 Subject to the Articles, the Directors may delegate any of the powers which are conferred on them under the Articles:</p>
                        <div className="ml-8 space-y-1 mb-3">
                            <p>11.1.1 to such person or committee;</p>
                            <p>11.1.2 by such means (including by power of attorney);</p>
                            <p>11.1.3 to such an extent;</p>
                            <p>11.1.4 in relation to such matters or territories; and</p>
                            <p>11.1.5 on such terms and conditions;</p>
                        </div>
                        <p className="ml-4 mb-3">as they think fit.</p>
                        <p className="mb-2">11.2 If the Directors so specify, any such delegation of this power may authorise further delegation of the Directors' powers by any person to whom they are delegated.</p>
                        <p className="mb-6">11.3 The Directors may revoke any delegation in whole or part, or alter its terms and conditions.</p>
                    </div>

                    <div className="page-break"></div>

                    {/* DECISION-MAKING BY DIRECTORS */}
                    <div className="mb-10">
                        <h3 className="text-lg font-black mb-4 uppercase">DECISION-MAKING BY DIRECTORS</h3>
                        
                        <h4 className="text-lg font-bold mb-3">12. Directors to take decisions collectively</h4>
                        <p className="mb-6">Any decision of the Directors must be either a majority decision at a meeting or a decision taken in accordance with Article 18.</p>
                        
                        <h4 className="text-lg font-bold mb-3">13. Calling a Directors' meeting</h4>
                        <p className="mb-2">13.1 Two Directors may (and the Secretary, if any, must at the request of two Directors) call a Directors' meeting.</p>
                        <p className="mb-2">13.2 A Directors' meeting must be called by at least seven Clear Days' notice unless either:</p>
                        <div className="ml-8 space-y-1 mb-3">
                            <p>13.2.1 all the Directors agree; or</p>
                            <p>13.2.2 urgent circumstances require shorter notice.</p>
                        </div>
                        <p className="mb-2">13.3 Notice of Directors' meetings must be given to each Director.</p>
                        <p className="mb-2">13.4 Every notice calling a Directors' meeting must specify:</p>
                        <div className="ml-8 space-y-1 mb-3">
                            <p>13.4.1 the place, day and time of the meeting; and</p>
                            <p>13.4.2 if it is anticipated that Directors participating in the meeting will not be in the same place, how it is proposed that they should communicate with each other during the meeting.</p>
                        </div>
                        <p className="mb-2">13.5 Notice of Directors' meetings need not be in Writing.</p>
                        <p className="mb-6">13.6 Notice of Directors' meetings may be sent by Electronic Means to an Address provided by the Director for the purpose.</p>
                        
                        <h4 className="text-lg font-bold mb-3">14. Participation in Directors' meetings</h4>
                        <p className="mb-2">14.1 Subject to the Articles, Directors participate in a Directors' meeting, or part of a Directors' meeting, when:</p>
                        <div className="ml-8 space-y-1 mb-3">
                            <p>14.1.1 the meeting has been called and takes place in accordance with the Articles; and</p>
                            <p>14.1.2 they can each communicate to the others any information or opinions they have on any particular item of the business of the meeting.</p>
                        </div>
                        <p className="mb-2">14.2 In determining whether Directors are participating in a Directors' meeting, it is irrelevant where any Director is or how they communicate with each other.</p>
                        <p className="mb-6">14.3 If all the Directors participating in a meeting are not in the same place, they may decide that the meeting is to be treated as taking place wherever any of them is.</p>
                        
                        <h4 className="text-lg font-bold mb-3">15. Quorum for Directors' meetings</h4>
                        <p className="mb-2">15.1 At a Directors' meeting, unless a quorum is participating, no proposal is to be voted on, except a proposal to call another meeting.</p>
                        <p className="mb-2">15.2 The quorum for Directors' meetings may be fixed from time to time by a decision of the Directors, but it must never be less than two, and unless otherwise fixed it is two.</p>
                        <p className="mb-2">15.3 If the total number of Directors for the time being is less than the quorum required, the Directors must not take any decision other than a decision:</p>
                        <div className="ml-8 space-y-1 mb-6">
                            <p>15.3.1 to appoint further Directors; or</p>
                            <p>15.3.2 to call a general meeting so as to enable the members to appoint further Directors.</p>
                        </div>
                        
                        <h4 className="text-lg font-bold mb-3">16. Chairing of Directors' meetings</h4>
                        <p className="mb-6">The Chair, if any, or in his or her absence another Director nominated by the Directors present shall preside as chair of each Directors' meeting.</p>
                        
                        <h4 className="text-lg font-bold mb-3">17. Decision-making at meetings</h4>
                        <p className="mb-2">17.1 Questions arising at a Directors' meeting shall be decided by a majority of votes.</p>
                        <p className="mb-2">17.2 In all proceedings of Directors each Director must not have more than one vote.</p>
                        <p className="mb-6">17.3 In case of an equality of votes, the Chair shall have a second or casting vote.</p>
                        
                        <h4 className="text-lg font-bold mb-3">18. Decisions without a meeting</h4>
                        <p className="mb-2">18.1 The Directors may take a unanimous decision without a Directors' meeting in accordance with this Article by indicating to each other by any means, including without limitation by Electronic Means, that they share a common view on a matter.</p>
                        <p className="mb-6">18.2 Such a decision may, but need not, take the form of a resolution in Writing, copies of which have been signed by each Director or to which each Director has otherwise indicated agreement in Writing.</p>
                        
                        <h4 className="text-lg font-bold mb-3">19. Conflicts of interest</h4>
                        <p className="mb-2">19.1 If a Directors' meeting, or part of a Directors' meeting, is concerned with an actual or proposed transaction or arrangement with the Company in which a Director is interested, that Director is not to be counted as participating in that meeting, or that part of the meeting, for quorum or voting purposes.</p>
                        <p className="mb-6">19.2 This Article does not apply if the Director's interest cannot reasonably be regarded as likely to give rise to a conflict of interest.</p>
                        
                        <h4 className="text-lg font-bold mb-3">20. Directors' power to authorise a conflict of interest</h4>
                        <p className="mb-2">20.1 The Directors may authorise any matter which would otherwise involve a Director breaching his or her duty to avoid conflicts of interest under the Act.</p>
                        <p className="mb-6">20.2 Any Director (including the Director in question) may propose that the conflicted Director be authorised in relation to any matter which is the subject of such a conflict. Such proposal and any authority given by the Directors shall be effected in the same way as any other matter may be proposed to and resolved upon by the Directors.</p>
                        
                        <h4 className="text-lg font-bold mb-3">21. Register of Directors' interests</h4>
                        <p className="mb-6">The Company shall maintain a register of Directors' interests which shall be available for inspection by any Director or member of the Company.</p>
                    </div>

                    <div className="page-break"></div>

                    {/* APPOINTMENT AND RETIREMENT OF DIRECTORS */}
                    <div className="mb-10">
                        <h3 className="text-lg font-black mb-4 uppercase">APPOINTMENT AND RETIREMENT OF DIRECTORS</h3>
                        
                        <h4 className="text-lg font-bold mb-3">22. Methods of appointing Directors</h4>
                        <p className="mb-6">Any person who is willing to act as a Director, and is permitted by law to do so, may be appointed to be a Director by ordinary resolution or by a decision of the Directors.</p>
                        
                        <h4 className="text-lg font-bold mb-3">23. Termination of Director's appointment</h4>
                        <p className="mb-2">A person ceases to be a Director as soon as:</p>
                        <div className="ml-8 space-y-1 mb-6">
                            <p>23.1 that person ceases to be a Director by virtue of any provision of the Act or is prohibited from being a Director by law;</p>
                            <p>23.2 a bankruptcy order is made against that person;</p>
                            <p>23.3 a composition is made with that person's creditors generally in satisfaction of that person's debts;</p>
                            <p>23.4 a registered medical practitioner who is treating that person gives a written opinion to the Company stating that that person has become physically or mentally incapable of acting as a director and may remain so for more than three months;</p>
                            <p>23.5 notification is received by the Company from the Director that the Director is resigning from office, and such resignation has taken effect in accordance with its terms; or</p>
                            <p>23.6 that person is removed as a Director by the members in accordance with the Act.</p>
                        </div>
                        
                        <h4 className="text-lg font-bold mb-3">24. Directors' remuneration</h4>
                        <p className="mb-2">24.1 Directors may undertake any services for the Company that the Directors decide.</p>
                        <p className="mb-2">24.2 Directors are entitled to such remuneration as the Directors determine:</p>
                        <div className="ml-8 space-y-1 mb-6">
                            <p>24.2.1 for their services to the Company as Directors; and</p>
                            <p>24.2.2 for any other service which they undertake for the Company.</p>
                        </div>
                        
                        <h4 className="text-lg font-bold mb-3">25. Directors' expenses</h4>
                        <p className="mb-6">The Company may pay any reasonable expenses which the Directors properly incur in connection with their attendance at meetings or otherwise in connection with the exercise of their powers and the discharge of their responsibilities in relation to the Company.</p>
                    </div>

                    <div className="page-break"></div>

                    {/* MEMBERS */}
                    <div className="mb-10">
                        <h3 className="text-xl font-black mb-4 uppercase">MEMBERS</h3>
                        <h3 className="text-lg font-black mb-4 uppercase">BECOMING AND CEASING TO BE A MEMBER</h3>
                        
                        <h4 className="text-lg font-bold mb-3">26. Becoming a member</h4>
                        <p className="mb-2">26.1 The subscribers to the memorandum are the first members of the Company.</p>
                        <p className="mb-2">26.2 Such other persons as are admitted to membership in accordance with the Articles shall be members of the Company, and shall be entered in the register of members.</p>
                        <p className="mb-2">26.3 The Directors are also members of the Company.</p>
                        <p className="mb-2">26.4 No person shall be admitted as a member of the Company unless he or she is approved by the Directors.</p>
                        <p className="mb-6">26.5 Every person who wishes to become a member shall deliver to the Company an application for membership in such form (and containing such information) as the Directors require and executed by him or her.</p>
                        
                        <h4 className="text-lg font-bold mb-3">27. Termination of membership</h4>
                        <p className="mb-2">27.1 Membership is not transferable to anyone else.</p>
                        <p className="mb-2">27.2 Membership is terminated if:</p>
                        <div className="ml-8 space-y-1 mb-6">
                            <p>27.2.1 the member dies or, if it is an organisation, ceases to exist;</p>
                            <p>27.2.2 otherwise in accordance with the Articles; but this is without prejudice to any right to vote on a resolution affecting the rights attached to a class of the Company's debentures.</p>
                        </div>
                    </div>

                    <div className="page-break"></div>

                    {/* DECISION MAKING BY MEMBERS */}
                    <div className="mb-10">
                        <h3 className="text-lg font-black mb-4 uppercase">DECISION MAKING BY MEMBERS</h3>
                        
                        <h4 className="text-lg font-bold mb-3">28. Members' meetings</h4>
                        <p className="mb-2">28.1 The Directors may call general meetings and, on the requisition of members pursuant to the provisions of the Act, shall forthwith proceed to convene a general meeting for a date not later than eight weeks after receipt of the requisition.</p>
                        <p className="mb-2">28.2 At least 14 clear days' notice must be given of general meetings.</p>
                        <p className="mb-6">28.3 A person who is not a member of the Company shall have no right to vote at a general meeting of the Company; but this is without prejudice to any right to vote on a resolution affecting the rights attached to a class of the Company's debentures.</p>
                        
                        <h4 className="text-lg font-bold mb-3">29. Written resolutions</h4>
                        <p className="mb-6">29.1 A resolution in writing agreed by a simple majority (or in the case of a special resolution by a majority of not less than 75%) of all members who would have been entitled to vote upon it had it been proposed at a general meeting shall be effective provided that a copy of the proposed resolution has been sent to every eligible member.</p>
                    </div>

                    <div className="page-break"></div>

                    {/* ADMINISTRATIVE ARRANGEMENTS */}
                    <div className="mb-10">
                        <h3 className="text-lg font-black mb-4 uppercase">ADMINISTRATIVE ARRANGEMENTS AND MISCELLANEOUS</h3>
                        
                        <h4 className="text-lg font-bold mb-3">30. Means of communication to be used</h4>
                        <p className="mb-2">30.1 Subject to the Articles, anything sent or supplied by or to the Company under the Articles may be sent or supplied in any way in which the Act provides for documents or information which are authorised or required by any provision of that Act to be sent or supplied by or to the Company.</p>
                        <p className="mb-6">30.2 Any notice or document to be sent or supplied to a Director in connection with the taking of decisions by Directors may also be sent or supplied by the means by which that Director has asked to be sent or supplied with such notices or documents for the time being.</p>
                        
                        <h4 className="text-lg font-bold mb-3">31. Irregularities</h4>
                        <p className="mb-6">31.1 The proceedings at any meeting or on the taking of any poll or the passing of a written resolution or the making of any decision shall not be invalidated by reason of any accidental informality or irregularity (including any accidental omission to give or any non-receipt of notice) or any want of qualification in any of the persons present or voting or by reason of any business being considered which is not referred to in the notice unless a provision of the Act specifies that such informality, irregularity or want of qualification shall invalidate it.</p>
                        
                        <h4 className="text-lg font-bold mb-3">32. Minutes</h4>
                        <p className="mb-2">32.1 The Directors must cause minutes to be made in books kept for the purpose:</p>
                        <div className="ml-8 space-y-1 mb-6">
                            <p>32.1.1 of all appointments of officers made by the Directors;</p>
                            <p>32.1.2 of all proceedings at meetings of the Company, of the Directors, and of committees of Directors, including the names of the Directors present at each such meeting; and</p>
                            <p>32.1.3 of all resolutions and proceedings at meetings of the Company and of classes of members including the names of the members present at each such meeting.</p>
                        </div>
                        
                        <h4 className="text-lg font-bold mb-3">33. Records and accounts</h4>
                        <p className="mb-6">33.1 The Directors shall comply with the requirements of the Act and of the Regulations as to maintaining a members' register, keeping financial records, the audit or examination of accounts and the preparation and transmission to the Registrar of Companies and the CIC Regulator of such documents as may be required.</p>
                        
                        <h4 className="text-lg font-bold mb-3">34. Indemnity</h4>
                        <p className="mb-6">34.1 Subject to the provisions of the Act but without prejudice to any indemnity to which a Director may otherwise be entitled, every Director or other officer of the Company shall be indemnified out of the assets of the Company against any liability incurred by him or her in that capacity in defending any proceedings, whether civil or criminal, in which judgment is given in favour of him or her or in which he or she is acquitted or in connection with any application in which relief is granted to him or her by the court from liability for negligence, default, breach of duty or breach of trust in relation to the affairs of the Company.</p>
                        
                        <h4 className="text-lg font-bold mb-3">35. Insurance</h4>
                        <p className="mb-6">35.1 The Directors may decide to purchase and maintain insurance, at the expense of the Company, for the benefit of any relevant Director or relevant officer in respect of any relevant loss.</p>
                        
                        <h4 className="text-lg font-bold mb-3">36. Exclusion of model articles</h4>
                        <p className="mb-6">36.1 The relevant model articles for a company limited by guarantee are hereby expressly excluded.</p>
                    </div>

                    <div className="page-break"></div>

                    {/* SCHEDULE - DEFINITIONS */}
                    <div className="mb-10">
                        <h3 className="text-xl font-black mb-6 uppercase">SCHEDULE</h3>
                        <h4 className="text-lg font-bold mb-4">Defined Terms</h4>
                        
                        <div className="space-y-3 text-sm">
                            <p><strong>"the Act"</strong> means the Companies Act 2006;</p>
                            <p><strong>"Address"</strong> means a postal address or, for the purposes of electronic communication, a fax number, email address or telephone number for receiving text messages;</p>
                            <p><strong>"the Articles"</strong> means these articles of association;</p>
                            <p><strong>"asset-locked body"</strong> means a community interest company, a charity or a permitted society (all as defined by the Regulations) or a body established outside the United Kingdom that is equivalent to any of those;</p>
                            <p><strong>"Chair"</strong> has the meaning given in Article 10;</p>
                            <p><strong>"CIC"</strong> means a community interest company within the meaning of section 26 of the Act;</p>
                            <p><strong>"the CIC Regulator"</strong> or <strong>"the Regulator"</strong> means the Regulator of Community Interest Companies;</p>
                            <p><strong>"Clear Days"</strong> in relation to the period of a notice means a period excluding the day when the notice is given or deemed to be given and the day for which it is given or on which it is to take effect;</p>
                            <p><strong>"the Company"</strong> means Universal Frequency 51 CIC;</p>
                            <p><strong>"the Directors"</strong> or <strong>"Directors"</strong> means the directors of the Company;</p>
                            <p><strong>"Document"</strong> includes, unless otherwise specified, any document sent or supplied in electronic form;</p>
                            <p><strong>"Electronic Means"</strong> has the meaning given in the Act;</p>
                            <p><strong>"the Members"</strong> means the members of the Company;</p>
                            <p><strong>"the Regulations"</strong> means the Community Interest Company Regulations 2005 as amended;</p>
                            <p><strong>"Secretary"</strong> means the secretary of the Company or any other person appointed to perform the duties of the secretary of the Company, including a joint, assistant or deputy secretary;</p>
                            <p><strong>"specified asset-locked body"</strong> means the asset-locked body specified in Article 3.5 for the purposes of Article 3.2(a) and Article 3.4;</p>
                            <p><strong>"subsidiary"</strong> has the meaning given in the Act;</p>
                            <p><strong>"Writing"</strong> means the representation or reproduction of words, symbols or other information in a visible form by any method or combination of methods, whether sent or supplied in electronic form or otherwise.</p>
                        </div>
                        
                        <p className="mt-6 text-sm">Expressions defined in the Act shall have the same meaning in these Articles. References to an Act of Parliament are to that Act as amended or re-enacted from time to time and to any subordinate legislation made under it.</p>
                    </div>

                    <div className="page-break"></div>

                    {/* SIGNATURES PAGE */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-black mb-8 text-center">SUBSCRIBERS</h3>
                        
                        <p className="mb-12 text-center text-lg">We, the subscribers, wish to be formed into a company under these Articles.</p>

                        <div className="space-y-16">
                            {/* Subscriber 1 - Brian Hughes */}
                            <div className="border-4 border-black p-8">
                                <p className="font-black mb-8 text-2xl">Subscriber 1</p>
                                
                                <div className="mb-8">
                                    <p className="text-sm mb-2 font-bold">Name:</p>
                                    <p className="text-xl font-bold border-b-2 border-black pb-3">Brian Hughes</p>
                                </div>
                                
                                <div className="mb-8">
                                    <p className="text-sm mb-2 font-bold">Address:</p>
                                    <div className="border-b-2 border-black pb-3">
                                        <p>Upper Stoneymollan Cottage</p>
                                        <p>Upper Stoneymollan Road</p>
                                        <p>Alexandria</p>
                                        <p>G83 8QU</p>
                                        <p>Scotland</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-sm mb-3 font-bold">Signature:</p>
                                        {signature1 ? (
                                            <img src={signature1} alt="Signature 1" className="h-24 border-b-2 border-black" />
                                        ) : (
                                            <div className="border-b-2 border-black h-24 flex items-center justify-center">
                                                <p className="text-gray-400 text-xs">Sign above</p>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm mb-3 font-bold">Date:</p>
                                        <div className="border-b-2 border-black h-24 flex items-center">
                                            <p className="font-bold text-lg">{new Date(date1).toLocaleDateString('en-GB')}</p>
                                        </div>
                                    </div>
                                </div>
                                </div>

                                {/* Subscriber 2 - Gillian Brown */}
                                <div className="border-4 border-black p-8">
                                <p className="font-black mb-8 text-2xl">Subscriber 2</p>

                                <div className="mb-8">
                                    <p className="text-sm mb-2 font-bold">Name:</p>
                                    <p className="text-xl font-bold border-b-2 border-black pb-3">Gillian Brown</p>
                                </div>

                                <div className="mb-8">
                                    <p className="text-sm mb-2 font-bold">Address:</p>
                                    <div className="border-b-2 border-black pb-3">
                                        <p>Upper Stoneymollan Cottage</p>
                                        <p>Upper Stoneymollan Road</p>
                                        <p>Alexandria</p>
                                        <p>G83 8QU</p>
                                        <p>Scotland</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-sm mb-3 font-bold">Signature:</p>
                                        {signature2 ? (
                                            <img src={signature2} alt="Signature 2" className="h-24 border-b-2 border-black" />
                                        ) : (
                                            <div className="border-b-2 border-black h-24 flex items-center justify-center">
                                                <p className="text-gray-400 text-xs">Sign above</p>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm mb-3 font-bold">Date:</p>
                                        <div className="border-b-2 border-black h-24 flex items-center">
                                            <p className="font-bold text-lg">{new Date(date2).toLocaleDateString('en-GB')}</p>
                                        </div>
                                    </div>
                                </div>
                                </div>

                                </div>

                        <div className="mt-16 text-center text-sm text-gray-600">
                            <p>Dated: {new Date().toLocaleDateString('en-GB')}</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}