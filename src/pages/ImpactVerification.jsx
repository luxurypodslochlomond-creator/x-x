import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, Shield, Check, X, Calendar, MapPin, User, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function ImpactVerification() {
    const queryClient = useQueryClient();
    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => base44.auth.me(),
    });

    const { data: pendingMissions, isLoading: missionsLoading } = useQuery({
        queryKey: ['pendingMissions'],
        queryFn: () => base44.entities.Mission.filter({ status: 'pending_verification' }),
        enabled: !!user && user.role === 'admin',
    });

    const updateMissionMutation = useMutation({
        mutationFn: ({ id, status }) => base44.entities.Mission.update(id, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pendingMissions'] });
        },
    });

    const handleApprove = (id) => {
        updateMissionMutation.mutate({ id, status: 'upcoming' });
    };

    const handleReject = (id) => {
        updateMissionMutation.mutate({ id, status: 'rejected' });
    };

    if (userLoading) {
        return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-purple-400" /></div>;
    }

    if (user?.role !== 'admin') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-center p-6">
                <Card className="bg-red-900/50 border border-red-500/50">
                    <CardContent className="p-8">
                        <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-white">Access Denied</h1>
                        <p className="text-red-300">This is a restricted frequency. Admin only.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
                    <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Impact Verification</h1>
                    <p className="text-lg text-gray-400 mt-2">Approve or reject new missions submitted by the family.</p>
                </motion.div>

                {missionsLoading ? (
                    <div className="flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-purple-400" /></div>
                ) : pendingMissions && pendingMissions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8">
                        {pendingMissions.map((mission, index) => (
                            <motion.div key={mission.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                                <Card className="bg-black/50 backdrop-blur-md border border-yellow-500/30">
                                    <CardHeader>
                                        <CardTitle className="text-2xl text-yellow-300">{mission.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-gray-300">{mission.description}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-cyan-400"/><span>{format(new Date(mission.mission_date), 'PPP p')}</span></div>
                                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-cyan-400"/><span>{mission.location_name}</span></div>
                                            <div className="flex items-center gap-2"><User className="w-4 h-4 text-cyan-400"/><span>{mission.organizer_name}</span></div>
                                            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-cyan-400"/><span>{mission.organizer_contact}</span></div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end gap-4">
                                        <Button variant="outline" onClick={() => handleReject(mission.id)} className="border-red-500 text-red-400 hover:bg-red-900/50 hover:text-white">
                                            <X className="w-4 h-4 mr-2" /> Reject
                                        </Button>
                                        <Button onClick={() => handleApprove(mission.id)} className="bg-green-600 hover:bg-green-700">
                                            <Check className="w-4 h-4 mr-2" /> Approve
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-black/30 rounded-lg">
                        <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <p className="text-gray-400">No pending missions to verify. The family is pure.</p>
                    </div>
                )}
            </div>
        </div>
    );
}