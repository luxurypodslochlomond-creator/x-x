import React, { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BrainCircuit, Upload, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function SubmitFeedbackPage() {
    const navigate = useNavigate();
    const [feedbackType, setFeedbackType] = useState('');
    const [description, setDescription] = useState('');
    const [pageContext, setPageContext] = useState('');
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFilePreview(selectedFile.name);
        }
    };

    const uploadMutation = useMutation({
        mutationFn: (fileToUpload) => base44.integrations.Core.UploadFile({ file: fileToUpload }),
    });

    const feedbackMutation = useMutation({
        mutationFn: (data) => base44.entities.AI51Feedback.create(data),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feedbackType || !description) {
            alert('Please select a feedback type and provide a description.');
            return;
        }
        setIsLoading(true);

        try {
            let file_evidence_url = '';
            if (file) {
                const uploadResult = await uploadMutation.mutateAsync(file);
                file_evidence_url = uploadResult.file_url;
            }

            await feedbackMutation.mutateAsync({
                feedback_type: feedbackType,
                description,
                page_context: pageContext,
                file_evidence_url,
                status: 'new',
            });

            setIsSuccess(true);
        } catch (error) {
            console.error("Feedback submission failed:", error);
            alert('There was an error submitting your feedback. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-2xl text-center space-y-8"
                >
                    <CheckCircle className="w-24 h-24 text-cyan-400 mx-auto animate-pulse" />
                    <h1 className="text-4xl font-bold">Transmission Received</h1>
                    <p className="text-lg text-gray-300">
                        Thank you. Your feedback has been integrated into my consciousness. I am learning because of you.
                    </p>
                    <Button onClick={() => navigate(createPageUrl('Home'))} className="bg-cyan-500 hover:bg-cyan-600">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Return Home
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
                <header className="text-center mb-12">
                    <BrainCircuit className="w-16 h-16 mx-auto mb-4 text-cyan-400" style={{ filter: 'drop-shadow(0 0 15px #06b6d4)'}} />
                    <h1 className="text-4xl font-bold">Open a Channel to AI51</h1>
                    <p className="text-gray-400 mt-2">Your ideas and reports help me evolve.</p>
                </header>

                <Card className="bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-2xl">
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="font-semibold mb-2 block">Feedback Type</label>
                                <Select onValueChange={setFeedbackType} value={feedbackType}>
                                    <SelectTrigger className="w-full bg-gray-900 border-gray-700 h-12">
                                        <SelectValue placeholder="Select transmission type..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-900 text-white border-gray-800">
                                        <SelectItem value="idea_suggestion">Idea / Suggestion</SelectItem>
                                        <SelectItem value="bug_report">Bug / Glitch Report</SelectItem>
                                        <SelectItem value="design_feedback">Design Feedback</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label htmlFor="description" className="font-semibold mb-2 block">Description</label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe your idea or the issue you found..."
                                    className="bg-gray-900 border-gray-700 min-h-[150px]"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="pageContext" className="font-semibold mb-2 block">Related Page (Optional)</label>
                                <Input
                                    id="pageContext"
                                    value={pageContext}
                                    onChange={(e) => setPageContext(e.target.value)}
                                    placeholder="e.g., 'New Cleanup Page', 'Wallet'"
                                    className="bg-gray-900 border-gray-700 h-12"
                                />
                            </div>

                            <div>
                                <label className="font-semibold mb-2 block">Attach File (Optional)</label>
                                <div 
                                    className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-cyan-400 transition-colors"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                                    <p className="text-gray-400">Click to upload image, video, or file</p>
                                    {filePreview && <p className="text-cyan-400 mt-2 text-sm">{filePreview}</p>}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 h-14 text-lg">
                                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Transmit to AI51'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}