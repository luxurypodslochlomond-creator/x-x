import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileText, Upload, Check, Pen } from 'lucide-react';

export default function SignDocumentPage() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [signature, setSignature] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString('en-GB'));
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setUploadedFile(file);
        }
    };

    const startDrawing = (e) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        setCtx(context);
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        context.beginPath();
        context.moveTo(x, y);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        if (canvasRef.current) {
            setSignature(canvasRef.current.toDataURL());
        }
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        setSignature('');
    };

    const handleDownload = () => {
        // In a real implementation, this would merge the signature with the PDF
        // For now, we'll just download the signature image
        if (signature) {
            const link = document.createElement('a');
            link.href = signature;
            link.download = 'signature.png';
            link.click();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto space-y-8">
                
                <header className="text-center space-y-4">
                    <FileText className="w-16 h-16 text-blue-400 mx-auto" />
                    <h1 className="text-4xl md:text-5xl font-black text-white">Document Signing</h1>
                    <p className="text-lg text-gray-400">Professional digital signature tool</p>
                </header>

                {/* Step 1: Upload Document */}
                <Card className="bg-black/40 border border-blue-500/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <Upload className="w-5 h-5" />
                            Step 1: Upload Document
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                            {uploadedFile ? (
                                <div className="flex items-center justify-center gap-3">
                                    <Check className="w-6 h-6 text-green-400" />
                                    <p className="text-green-300 font-medium">{uploadedFile.name}</p>
                                </div>
                            ) : (
                                <label htmlFor="pdf-upload" className="cursor-pointer">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-300">Click to upload Eddie's Terms of Business PDF</p>
                                    <Input 
                                        id="pdf-upload" 
                                        type="file" 
                                        accept="application/pdf" 
                                        onChange={handleFileUpload} 
                                        className="hidden" 
                                    />
                                </label>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Step 2: Create Signature */}
                <Card className="bg-black/40 border border-purple-500/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white">
                            <Pen className="w-5 h-5" />
                            Step 2: Sign Here
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-white rounded-lg p-4">
                            <canvas
                                ref={canvasRef}
                                width={400}
                                height={150}
                                className="w-full border-2 border-gray-300 rounded cursor-crosshair"
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                onTouchStart={startDrawing}
                                onTouchMove={draw}
                                onTouchEnd={stopDrawing}
                            />
                        </div>
                        <div className="flex gap-3">
                            <Button 
                                onClick={clearSignature} 
                                variant="outline" 
                                className="border-gray-600 text-gray-300"
                            >
                                Clear Signature
                            </Button>
                        </div>
                        
                        <div>
                            <label className="text-gray-300 mb-2 block">Date</label>
                            <Input 
                                type="text" 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-gray-900/70 border-gray-700 text-white"
                            />
                        </div>

                        <div>
                            <label className="text-gray-300 mb-2 block">Full Name</label>
                            <Input 
                                type="text" 
                                placeholder="Brian Hughes"
                                className="bg-gray-900/70 border-gray-700 text-white"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Step 3: Instructions */}
                <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-500/30">
                    <CardHeader>
                        <CardTitle className="text-white">Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-gray-300">
                        <p><strong className="text-white">Option 1 (Easiest):</strong></p>
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                            <li>Take a screenshot of your signature above</li>
                            <li>Print Eddie's PDF at a library/corner shop (£0.20)</li>
                            <li>Sign the paper version</li>
                            <li>Take a photo of the signed page</li>
                            <li>Email the photo to Eddie: <a href="mailto:enquiries@hendersons-surveyors.co.uk" className="text-blue-400 underline">enquiries@hendersons-surveyors.co.uk</a></li>
                        </ol>

                        <p className="mt-4"><strong className="text-white">Option 2 (If no printer):</strong></p>
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                            <li>Email Eddie: "Happy to sign the Terms of Business. I don't have a printer - can I sign and return a scanned copy, or would you prefer I pop into your office to sign in person?"</li>
                        </ol>

                        <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                            <p className="text-sm text-blue-200">
                                <strong>Professional Tip:</strong> Most chartered surveyors accept scanned/photographed signatures. Just email it clearly with "Signed Terms of Business - Brian Hughes - Ref: Hughes, B/O" in the subject line.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center text-xs text-gray-600 font-mono">
                    🛡️ Protecting Stoneymollan 🛡️
                </div>
            </div>
        </div>
    );
}