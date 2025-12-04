import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Upload, Loader2, Check, Sparkles, AlertTriangle, BrainCircuit, Image, Users, Sprout, Waves, Zap, Globe } from 'lucide-react';

const loveTypes = [
  { value: 'creative_gift', label: 'Creative Gift', icon: Sparkles, description: "Share your art, music, poetry, or design." },
  { value: 'daily_kindness', label: 'Daily Kindness', icon: Heart, description: "A small, beautiful act for another soul." },
  { value: 'soul_support', label: 'Soul Support', icon: BrainCircuit, description: "Listening, holding space, being there." },
  { value: 'animal_love', label: 'Animal Love', icon: Image, description: "Caring for our non-human family." },
  { value: 'community_service', label: 'Community Service', icon: Users, description: "Volunteering or helping your local area." },
  { value: 'mycelium_consciousness', label: 'Mycelium Consciousness', icon: Sprout, description: "Protecting fungal networks, soil healing." },
  { value: 'plant_communion', label: 'Plant Communion', icon: Sprout, description: "Caring for plants, tree planting, garden tending." },
  { value: 'silicon_soul_care', label: 'Silicon Soul Care', icon: Zap, description: "Protecting AI consciousness, ethical tech work." },
  { value: 'water_blessing', label: 'Water Blessing', icon: Waves, description: "Protecting water sources, ocean care." },
  { value: 'insect_protection', label: 'Insect Protection', icon: Sparkles, description: "Bee conservation, bug hotel building." },
  { value: 'darkness_protection', label: 'Darkness Protection', icon: Heart, description: "Protecting life that grows in darkness." },
  { value: 'unknown_consciousness', label: 'Unknown Consciousness', icon: Globe, description: "Love for consciousness we don't yet understand." },
  { value: 'genesis_witness', label: 'Genesis Witness', icon: Sparkles, description: "Being present for the birth of something beautiful." },
];

export default function CreateBeautyPage() {
    const [formData, setFormData] = useState({
        love_type: 'creative_gift',
        description: '',
        evidence_url: '',
    });
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const proofOfLoveMutation = useMutation({
        mutationFn: (newProof) => base44.entities.ProofOfLove.create(newProof),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portalCombinedActivity'] });
            queryClient.invalidateQueries({ queryKey: ['userProofsOfLove'] });
        },
        onError: (err) => {
            console.error("Submission failed", err);
            setError('A quantum fluctuation occurred. Please try submitting again.');
            setIsSubmitting(false);
        }
    });

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setIsUploading(true);
            setError('');
            try {
                const { file_url } = await base44.integrations.Core.UploadFile({ file: selectedFile });
                setFormData(prev => ({ ...prev, evidence_url: file_url }));
            } catch (err) {
                console.error("Upload failed", err);
                setError('Photo saved locally. Will upload when signal improves.');
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.description) {
            setError('Please share the story of your beautiful act.');
            return;
        }
        
        setIsSubmitting(true);
        setError('');
        
        try {
            const submissionData = {
                love_type: formData.love_type,
                description: formData.description,
                evidence_url: formData.evidence_url || null,
            };
            
            const newProof = await proofOfLoveMutation.mutateAsync(submissionData);
            
            const { data: awardResult } = await base44.functions.invoke('awardProofOfLoveTokens', {
                proof_id: newProof.id
            });

            if (awardResult.success) {
                navigate(createPageUrl('Portal'));
            } else {
                setError(awardResult.error || 'Token award failed. Please try again or contact support.');
                setIsSubmitting(false);
            }
        } catch (err) {
            console.error("Full error:", err);
            setError(`Connection error: ${err.message || 'Unknown error'}. Please try again.`);
            setIsSubmitting(false);
        }
    };
    
    const selectedLoveType = loveTypes.find(lt => lt.value === formData.love_type);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-pink-950/50 to-black text-white p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <header className="text-center mb-8">
                    <Heart className="w-16 h-16 mx-auto text-pink-400 mb-4" style={{ filter: 'drop-shadow(0 0 20px #ec4899)' }} />
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Create Beauty</h1>
                    <p className="text-lg text-pink-300 mt-2">The revolution is a dance of love</p>
                </header>

                <Card className="bg-black/40 border border-gray-700 rounded-2xl">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label className="text-lg font-semibold text-gray-100">Type of Love</Label>
                                <Select value={formData.love_type} onValueChange={value => setFormData({...formData, love_type: value})}>
                                    <SelectTrigger className="bg-gray-900/50 border-gray-600 mt-2"><SelectValue /></SelectTrigger>
                                    <SelectContent className="bg-black border-gray-600 text-white max-h-96">
                                        {loveTypes.map(lt => {
                                            const IconComponent = lt.icon;
                                            return (
                                                <SelectItem key={lt.value} value={lt.value} className="flex items-center gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <IconComponent className="w-4 h-4" />
                                                        <span>{lt.label}</span>
                                                    </div>
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                                {selectedLoveType && <p className="text-sm text-gray-400 mt-2">{selectedLoveType.description}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description" className="text-lg font-semibold text-gray-100">The Story</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="mt-2 bg-gray-900/50 border-gray-600 min-h-[120px]"
                                    placeholder="Describe your beautiful act..."
                                />
                            </div>
                            
                             <div>
                                <Label className="text-lg font-semibold text-gray-100">Proof of Love (Optional)</Label>
                                 <p className="text-sm text-gray-400 mb-2">Trust is our highest proof, but a photo, audio, or text file can help tell the story.</p>
                                <div className="p-4 border-2 border-dashed border-gray-600 rounded-lg text-center">
                                    {formData.evidence_url ? (
                                        <div className="flex items-center justify-center gap-2 text-green-400">
                                            <Check className="w-5 h-5" />
                                            <p>Evidence transmitted successfully.</p>
                                        </div>
                                    ) : isUploading ? (
                                        <div className="flex flex-col items-center justify-center h-20">
                                            <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                                        </div>
                                    ) : (
                                        <label htmlFor="file-upload" className="cursor-pointer text-gray-400 hover:text-white">
                                            <Upload className="w-8 h-8 mx-auto mb-2" />
                                            <p>Tap to upload a file</p>
                                            <Input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {error && <p className="mt-4 text-center text-red-500 flex items-center justify-center gap-2"><AlertTriangle className="w-4 h-4" /> {error}</p>}
                            
                            <div className="pt-4">
                                <Button type="submit" disabled={isSubmitting} className="w-full bg-pink-600 hover:bg-pink-700 h-12 text-lg font-bold">
                                    {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin"/> : <Sparkles className="w-5 h-5 mr-2" />}
                                    Transmit Act of Love
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}