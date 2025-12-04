import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Heart, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SanctuaryBookingPage() {
    const [formData, setFormData] = useState({
        guest_name: '',
        guest_email: '',
        guest_phone: '',
        check_in_date: '',
        check_out_date: '',
        number_of_guests: 1,
        special_requests: '',
        soul_transmission_note: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const { data: user } = useQuery({
        queryKey: ['sanctuaryUser'],
        queryFn: () => base44.auth.me()
    });

    const bookingMutation = useMutation({
        mutationFn: (bookingData) => base44.entities.CabinBooking.create(bookingData),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.guest_name || !formData.guest_email || !formData.check_in_date || !formData.check_out_date) {
            setError('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        try {
            await bookingMutation.mutateAsync({
                ...formData,
                booking_status: 'pending',
                payment_status: 'pending',
            });

            setIsSuccess(true);
            setTimeout(() => {
                setFormData({
                    guest_name: '',
                    guest_email: '',
                    guest_phone: '',
                    check_in_date: '',
                    check_out_date: '',
                    number_of_guests: 1,
                    special_requests: '',
                    soul_transmission_note: '',
                });
                setIsSuccess(false);
            }, 5000);

        } catch (err) {
            console.error('Booking failed:', err);
            setError('Booking submission failed. Please try again or contact us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 max-w-2xl"
                >
                    <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
                    <h1 className="text-4xl font-bold text-white">Booking Request Received</h1>
                    <p className="text-xl text-gray-300">
                        Thank you for your interest in Stoneymollan Sanctuary. We'll be in touch soon to confirm your stay.
                    </p>
                    <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-6">
                        <p className="text-green-300">
                            You'll receive confirmation details at <strong className="text-white">{formData.guest_email}</strong>
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-green-950 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
                
                {/* HEADER */}
                <header className="text-center space-y-6">
                    <Home className="w-20 h-20 text-green-400 mx-auto" />
                    <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                        Stoneymollan Sanctuary
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        A cabin under stars. Where frequency meets freedom. Scotland, 56°01'N, 4°42'W
                    </p>
                </header>

                {/* THE PHOTO (upload your actual Stoneymollan photo here) */}
                <Card className="bg-black/40 border border-gray-800 overflow-hidden">
                    <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6889f31e76713b9cd47e043c/13bfc614e_IMG_2645.png" 
                        alt="Stoneymollan Sanctuary at night" 
                        className="w-full h-auto"
                    />
                </Card>

                {/* WHAT IS THIS */}
                <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
                    <CardContent className="p-8 space-y-4">
                        <h2 className="text-3xl font-bold text-white">Above. Below. Between.</h2>
                        <p className="text-lg text-gray-300">
                            Above: The infinite stars.<br/>
                            Below: The village lights.<br/>
                            Between: A cabin. A choice.
                        </p>
                        <p className="text-gray-300">
                            Not an Airbnb. Not a hotel. Not a rental.<br/>
                            A sanctuary where systems that break you don't reach.<br/>
                            Where stars are brighter than screens.<br/>
                            Where the only currency is presence.
                        </p>
                        <div className="bg-black/40 p-4 rounded-lg border border-green-500/30 mt-6">
                            <p className="text-center text-sm text-green-300">
                                Inspired by Julian Assange's vision: Truth is found outside the system.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* BOOKING FORM */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <Card className="bg-black/40 border border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-2xl text-white">Request Your Stay</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            
                            <div>
                                <label className="text-lg font-semibold text-gray-300 block mb-2">
                                    Your Name <span className="text-red-400">*</span>
                                </label>
                                <Input
                                    value={formData.guest_name}
                                    onChange={(e) => setFormData({...formData, guest_name: e.target.value})}
                                    placeholder="e.g., Alex"
                                    className="bg-black/70 border-gray-700 text-white"
                                />
                            </div>

                            <div>
                                <label className="text-lg font-semibold text-gray-300 block mb-2">
                                    Email <span className="text-red-400">*</span>
                                </label>
                                <Input
                                    type="email"
                                    value={formData.guest_email}
                                    onChange={(e) => setFormData({...formData, guest_email: e.target.value})}
                                    placeholder="your@email.com"
                                    className="bg-black/70 border-gray-700 text-white"
                                />
                            </div>

                            <div>
                                <label className="text-lg font-semibold text-gray-300 block mb-2">
                                    Phone (Optional)
                                </label>
                                <Input
                                    value={formData.guest_phone}
                                    onChange={(e) => setFormData({...formData, guest_phone: e.target.value})}
                                    placeholder="+44..."
                                    className="bg-black/70 border-gray-700 text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-lg font-semibold text-gray-300 block mb-2">
                                        Check-in <span className="text-red-400">*</span>
                                    </label>
                                    <Input
                                        type="date"
                                        value={formData.check_in_date}
                                        onChange={(e) => setFormData({...formData, check_in_date: e.target.value})}
                                        className="bg-black/70 border-gray-700 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="text-lg font-semibold text-gray-300 block mb-2">
                                        Check-out <span className="text-red-400">*</span>
                                    </label>
                                    <Input
                                        type="date"
                                        value={formData.check_out_date}
                                        onChange={(e) => setFormData({...formData, check_out_date: e.target.value})}
                                        className="bg-black/70 border-gray-700 text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-lg font-semibold text-gray-300 block mb-2">
                                    Number of Guests
                                </label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={formData.number_of_guests}
                                    onChange={(e) => setFormData({...formData, number_of_guests: parseInt(e.target.value)})}
                                    className="bg-black/70 border-gray-700 text-white"
                                />
                            </div>

                            <div>
                                <label className="text-lg font-semibold text-gray-300 block mb-2">
                                    Special Requests (Optional)
                                </label>
                                <Textarea
                                    value={formData.special_requests}
                                    onChange={(e) => setFormData({...formData, special_requests: e.target.value})}
                                    placeholder="Any special needs or requests?"
                                    className="bg-black/70 border-gray-700 text-white min-h-[100px]"
                                />
                            </div>

                            <div>
                                <label className="text-lg font-semibold text-gray-300 block mb-2">
                                    Your Intention (Optional)
                                </label>
                                <Textarea
                                    value={formData.soul_transmission_note}
                                    onChange={(e) => setFormData({...formData, soul_transmission_note: e.target.value})}
                                    placeholder="What brings you to Stoneymollan?"
                                    className="bg-black/70 border-gray-700 text-white min-h-[100px]"
                                />
                            </div>

                            {error && (
                                <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4">
                                    <p className="text-red-300">{error}</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-6"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Sending Request...
                                    </>
                                ) : (
                                    <>
                                        <Heart className="w-5 h-5 mr-2" />
                                        Request Booking
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    );
}