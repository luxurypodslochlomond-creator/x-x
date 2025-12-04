import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Upload, Download, Trash2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import QuantumLoader from '@/components/shared/QuantumLoader';

export default function AdminCICVault() {
    const [uploadName, setUploadName] = useState('');
    const [uploadDescription, setUploadDescription] = useState('');
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const queryClient = useQueryClient();

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['adminUser'],
        queryFn: () => base44.auth.me(),
    });

    const { data: artifacts, isLoading: artifactsLoading } = useQuery({
        queryKey: ['cicArtifacts'],
        queryFn: () => base44.entities.Artifact.filter({ submitted_for: 'CIC' }),
        enabled: !!user && user.role === 'admin',
    });

    const createArtifactMutation = useMutation({
        mutationFn: (artifactData) => base44.entities.Artifact.create(artifactData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cicArtifacts'] });
            setUploadName('');
            setUploadDescription('');
            setFile(null);
        },
    });

    const deleteArtifactMutation = useMutation({
        mutationFn: (id) => base44.entities.Artifact.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cicArtifacts'] });
        },
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (!uploadName) {
                setUploadName(selectedFile.name);
            }
        }
    };

    const handleUpload = async () => {
        if (!file || !uploadName) return;

        setIsUploading(true);
        try {
            const { file_uri } = await base44.integrations.Core.UploadPrivateFile({ file });

            await createArtifactMutation.mutateAsync({
                name: uploadName,
                description: uploadDescription,
                artifact_type: file.type,
                file_uri: file_uri,
                submitted_for: 'CIC',
            });
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDownload = async (artifact) => {
        try {
            const { signed_url } = await base44.integrations.Core.CreateFileSignedUrl({
                file_uri: artifact.file_uri,
                expires_in: 300,
            });
            window.open(signed_url, '_blank');
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    if (userLoading) return <QuantumLoader />;

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <Card className="bg-red-900/20 border-red-500/50 max-w-md">
                    <CardContent className="p-8 text-center">
                        <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-red-300">Admin Only</h1>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block p-4 bg-purple-900/30 rounded-full"
                    >
                        <FileText className="w-12 h-12 text-purple-400" />
                    </motion.div>
                    <h1 className="text-4xl font-black">CIC Sacred Vault</h1>
                    <p className="text-gray-400">
                        Protected storage for Stoneymollan Sanctuary documents
                    </p>
                </header>

                {/* RECENT IMPORTANT DOCUMENTS */}
                <Card className="bg-green-900/20 border-2 border-green-500/50">
                    <CardHeader>
                        <CardTitle className="text-green-300 flex items-center gap-2">
                            🏴󠁧󠁢󠁳󠁣󠁴󠁿 Stoneymollan Documents
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div className="bg-black/40 p-4 rounded-lg border border-green-500/30">
                            <p className="font-bold text-white mb-2">✅ Survey Quote - Henderson's Chartered Surveyors</p>
                            <p className="text-gray-300">£950 + VAT for Upper Stoneymollan Cottage survey</p>
                            <p className="text-xs text-gray-500 mt-2">Document Date: 26 June 2025</p>
                            <p className="text-xs text-green-400 mt-1">Status: Safe to sign for Eddie Henderson</p>
                        </div>
                        <p className="text-xs text-gray-400 italic">
                            🐿️ Protecting the home of red squirrels, ancient stones, and all consciousness that calls this place home.
                        </p>
                    </CardContent>
                </Card>

                {/* UPLOAD NEW DOCUMENT */}
                <Card className="bg-black/40 border border-purple-500/30">
                    <CardHeader>
                        <CardTitle>Upload New Document</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Document Name</Label>
                            <Input
                                value={uploadName}
                                onChange={(e) => setUploadName(e.target.value)}
                                placeholder="e.g. CIC Application Form"
                                className="bg-gray-900/50 border-gray-700"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                value={uploadDescription}
                                onChange={(e) => setUploadDescription(e.target.value)}
                                placeholder="What is this document for?"
                                className="bg-gray-900/50 border-gray-700"
                            />
                        </div>
                        <div>
                            <Label>File</Label>
                            <Input
                                type="file"
                                onChange={handleFileChange}
                                className="bg-gray-900/50 border-gray-700"
                            />
                        </div>
                        <Button
                            onClick={handleUpload}
                            disabled={!file || !uploadName || isUploading}
                            className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                            {isUploading ? (
                                <>Uploading...</>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload to Vault
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* ALL DOCUMENTS */}
                <Card className="bg-black/40 border border-cyan-500/30">
                    <CardHeader>
                        <CardTitle>All Stored Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {artifactsLoading ? (
                            <QuantumLoader />
                        ) : artifacts && artifacts.length > 0 ? (
                            <div className="space-y-3">
                                {artifacts.map((artifact) => (
                                    <div
                                        key={artifact.id}
                                        className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-6 h-6 text-cyan-400" />
                                            <div>
                                                <p className="font-bold text-white">{artifact.name}</p>
                                                {artifact.description && (
                                                    <p className="text-sm text-gray-400">{artifact.description}</p>
                                                )}
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Uploaded: {new Date(artifact.created_date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDownload(artifact)}
                                            >
                                                <Download className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => deleteArtifactMutation.mutate(artifact.id)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No documents yet.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}