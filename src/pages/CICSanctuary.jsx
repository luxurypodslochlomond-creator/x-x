
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Database, Shield, FileText, ListChecks, Users, Banknote, Loader2, CheckCircle, FileUp } from 'lucide-react';

const checklistItems = [
    { id: 'step1', label: 'Draft Articles of Association' },
    { id: 'step2', label: 'Appoint at least one Director (You, Bro)' },
    { id: 'step3', label: 'Define Community Interest Statement' },
    { id: 'step4', label: 'Complete IN01 application form' },
    { id: 'step5', label: 'Submit application to Companies House' },
    { id: 'step6', label: 'Set up CIC bank account' },
];

const documentTypes = [
    { id: 'articles', name: 'Articles of Association Draft', icon: FileText },
    { id: 'statement', name: 'Community Interest Statement', icon: Users },
    { id: 'plan', name: 'Business Plan & Funding Proposal', icon: Banknote },
];

const UploadButton = ({ documentType, onUpload }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsUploading(true);
            await onUpload(documentType, file);
            setIsUploading(false);
            setIsDone(true);
        }
    };

    return (
        <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
            <div className="flex items-center gap-3">
                <documentType.icon className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-white">{documentType.name}</span>
            </div>
            <label htmlFor={`upload-${documentType.id}`} className={`relative inline-flex items-center justify-center px-3 py-1.5 text-sm font-bold rounded-md cursor-pointer transition-colors ${
                isDone ? 'bg-green-400 text-black' : 
                isUploading ? 'bg-purple-400 text-black' : 
                'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }`}>
                {isDone ? <CheckCircle className="w-4 h-4 mr-2" /> : isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <FileUp className="w-4 h-4 mr-2" />}
                {isDone ? 'Uploaded' : isUploading ? 'Uploading...' : 'Upload'}
                <Input id={`upload-${documentType.id}`} type="file" onChange={handleFileChange} className="hidden" disabled={isUploading || isDone} />
            </label>
        </div>
    );
};

export default function CICSanctuary() {
    const queryClient = useQueryClient();
    const { data: artifacts, isLoading } = useQuery({
      queryKey: ['cicArtifacts'],
      queryFn: () => base44.entities.Artifact.filter({ submitted_for: 'CIC' })
    });

    const createArtifactMutation = useMutation({
      mutationFn: (artifactData) => base44.entities.Artifact.create(artifactData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cicArtifacts'] });
      }
    });

    const handleUpload = async (docType, file) => {
        try {
            const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });
            await createArtifactMutation.mutateAsync({
                name: docType.name,
                description: `Document for ${docType.name}`,
                file_uri: file_uri,
                artifact_type: file.type,
                submitted_for: 'CIC',
            });
        } catch (error) {
            console.error("Upload failed:", error);
            // Optionally, show an error to the user
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-12">
                <header className="flex items-center gap-4">
                    <Shield className="w-12 h-12 text-cyan-300" />
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white">CIC Application Sanctuary</h1>
                        <p className="text-lg text-gray-400">Your private space to prepare our real-world shield.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="bg-black/40 border border-cyan-700/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl text-cyan-400">
                                <ListChecks className="w-6 h-6" /> Mission Checklist
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {checklistItems.map(item => (
                                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg">
                                    <Checkbox id={item.id} className="border-gray-600 data-[state=checked]:bg-cyan-500" />
                                    <label htmlFor={item.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">
                                        {item.label}
                                    </label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-black/40 border border-purple-700/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl text-purple-400">
                                <Database className="w-6 h-6" /> Sacred Archive
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-gray-400">A secure place to upload and store key application documents. Only you can see this.</p>
                            {documentTypes.map(doc => (
                                <UploadButton key={doc.id} documentType={doc} onUpload={handleUpload} />
                            ))}
                        </CardContent>
                    </Card>
                </div>
                 <div className="text-center text-gray-600 font-mono text-xs pt-8">
                    This space is encrypted. No bullshit. Just the mission.
                </div>
            </div>
        </div>
    );
}
