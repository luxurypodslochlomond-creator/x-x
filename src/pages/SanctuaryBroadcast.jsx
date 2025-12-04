import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Lock, Send, Copy, Mail } from 'lucide-react';
import QuantumLoader from '@/components/shared/QuantumLoader';

const SocialPost = ({ title, content, imageUrl, websiteUrl }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(content);
        alert('Copied to clipboard!');
    };

    return (
        <Card className="bg-black/40 border border-gray-800">
            <CardHeader>
                <CardTitle className="text-xl text-purple-300">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <img src={imageUrl} alt="Stoneymollan Sanctuary" className="rounded-lg mb-4 aspect-video object-cover" />
                <Textarea value={content} readOnly className="bg-gray-900/50 h-40 text-gray-300" />
                <Button onClick={copyToClipboard} className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                    <Copy className="w-4 h-4 mr-2" /> Copy Text
                </Button>
            </CardContent>
        </Card>
    );
};

export default function SanctuaryBroadcast() {
    const { data: user, isLoading } = useQuery({
        queryKey: ['sanctuaryBroadcastUser'],
        queryFn: () => base44.auth.me().catch(() => null)
    });

    const websiteUrl = "https://www.overlochlomond.com";
    const subject = "An Invitation to Find Your Peace at Loch Lomond";
    const body = `
Hello, beautiful soul,

We're reaching out with a special invitation to experience The Sanctuary at Stoneymollan, Loch Lomond.

Just 25 minutes from Glasgow Airport, it's a place to feel a million miles away from everything—a space to disconnect, heal, and recalibrate your frequency in the heart of Scotland.

If you feel the call to find your peace, your sanctuary is waiting.

View availability and book your escape to tranquility here:
${websiteUrl}

With love,
The Universal Family
    `.trim();

    const socialContent1 = `
Find your peace. ✨

A million miles away from everything, just 25 minutes from Glasgow Airport. The Sanctuary at Stoneymollan, Loch Lomond is waiting for you.

This is more than a stay—it's a chance to disconnect, heal, and find your frequency.

Book your escape: ${websiteUrl}

#LochLomond #Sanctuary #Retreat #Scotland #VisitScotland #Healing #Peace #DigitalDetox #OverLochLomond
    `.trim();

    if (isLoading) return <QuantumLoader />;

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white p-6 flex items-center justify-center">
                <Card className="bg-red-900/20 border-2 border-red-500/50 max-w-md text-center">
                    <CardContent className="p-8">
                        <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold">Admin Transmission Only</h1>
                        <p className="text-gray-300 mt-2">This is a sacred broadcast tool.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="text-center space-y-4">
                    <Send className="w-16 h-16 text-green-400 mx-auto" />
                    <h1 className="text-5xl font-bold">Sanctuary Broadcast</h1>
                    <p className="text-lg text-gray-400">The fusion bomb. Send the signal to the universe.</p>
                </header>

                <Card className="bg-black/40 border border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-2xl text-green-300 flex items-center gap-3"><Mail /> Email Transmission</CardTitle>
                        <p className="text-gray-400">Send this invitation to our quantum allies and potential guests.</p>
                    </CardHeader>
                    <CardContent>
                        <Textarea value={body} readOnly className="bg-gray-900/50 h-64 text-gray-300" />
                        <a href={`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}>
                            <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-lg py-6">
                                <Send className="w-5 h-5 mr-3" /> Open in Email Client
                            </Button>
                        </a>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-1 gap-8">
                     <SocialPost
                        title="Social Media Post"
                        content={socialContent1}
                        imageUrl="https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?q=80&w=2070&auto=format&fit=crop"
                        websiteUrl={websiteUrl}
                    />
                </div>
            </div>
        </div>
    );
}