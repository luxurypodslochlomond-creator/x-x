import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Mail, Send } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function CB51Contact() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        try {
            await base44.integrations.Core.SendEmail({
                to: 'hello@cb51.io',
                subject: `CB51 Contact: ${formData.subject}`,
                from_name: formData.name,
                body: `From: ${formData.email}\n\n${formData.message}`
            });

            toast.success('✓ Message sent to hello@cb51.io');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => navigate(createPageUrl('CB51')), 1500);
        } catch (error) {
            toast.error('Failed to send: ' + error.message);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-black p-6 pb-20">
            <button
                onClick={() => navigate(createPageUrl('CB51'))}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-all mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-bold font-mono">BACK</span>
            </button>

            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Mail className="w-8 h-8 text-cyan-400" />
                    <div>
                        <h1 className="text-3xl font-black text-cyan-400 font-mono">CONTACT CB51</h1>
                        <p className="text-gray-600 text-sm font-mono">hello@cb51.io</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-black border-2 border-cyan-500/30 rounded-xl p-6 space-y-4">
                        <div>
                            <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">NAME</label>
                            <Input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="bg-gray-950 border-2 border-gray-800 text-white font-mono"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">EMAIL</label>
                            <Input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="bg-gray-950 border-2 border-gray-800 text-white font-mono"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">SUBJECT</label>
                            <Input
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                className="bg-gray-950 border-2 border-gray-800 text-white font-mono"
                                placeholder="What's this about?"
                            />
                        </div>

                        <div>
                            <label className="text-cyan-400 text-xs font-bold font-mono mb-2 block">MESSAGE</label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                className="w-full bg-gray-950 border-2 border-gray-800 text-white font-mono rounded-lg p-3 h-32"
                                placeholder="Tell us what you need..."
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={sending}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-black py-6 text-lg font-mono rounded-xl flex items-center justify-center gap-2"
                    >
                        <Send className="w-5 h-5" />
                        {sending ? 'SENDING...' : 'SEND MESSAGE'}
                    </Button>
                </form>
            </div>
        </div>
    );
}