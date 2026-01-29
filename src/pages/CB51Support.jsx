import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Radio, HelpCircle, Mail, MessageSquare, Book } from 'lucide-react';

export default function CB51Support() {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-4xl mx-auto p-6 pb-24">
                
                {/* Header */}
                <div className="mb-8">
                    <Link to={createPageUrl('CB51')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6">
                        <Radio className="w-5 h-5" />
                        <span className="font-black font-mono text-sm">BACK TO CB51</span>
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <HelpCircle className="w-12 h-12 text-cyan-400" />
                        <h1 className="text-4xl font-black text-cyan-400 font-mono">CB51 SUPPORT</h1>
                    </div>
                    <p className="text-gray-500 font-mono text-sm">We're here to help. Fast.</p>
                </div>

                {/* Contact Options */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-cyan-500/10 border-2 border-cyan-500 rounded-lg p-6">
                        <Mail className="w-8 h-8 text-cyan-400 mb-3" />
                        <h3 className="text-white font-black font-mono text-xl mb-2">EMAIL</h3>
                        <p className="text-gray-400 font-mono text-sm mb-3">Best for detailed questions</p>
                        <a href="mailto:family@uf51.love" className="text-cyan-400 font-mono text-sm hover:text-cyan-300">
                            family@uf51.love
                        </a>
                        <p className="text-gray-600 font-mono text-xs mt-2">Response: Within 24 hours</p>
                    </div>

                    <div className="bg-purple-500/10 border-2 border-purple-500 rounded-lg p-6">
                        <MessageSquare className="w-8 h-8 text-purple-400 mb-3" />
                        <h3 className="text-white font-black font-mono text-xl mb-2">LIVE CHAT</h3>
                        <p className="text-gray-400 font-mono text-sm mb-3">Quick fixes</p>
                        <p className="text-purple-400 font-mono text-sm">Coming soon</p>
                        <p className="text-gray-600 font-mono text-xs mt-2">Use email for now</p>
                    </div>
                </div>

                {/* FAQ */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Book className="w-6 h-6 text-cyan-400" />
                        <h2 className="text-white font-black font-mono text-2xl">COMMON QUESTIONS</h2>
                    </div>

                    <details className="bg-black border border-gray-900 rounded-lg p-4 cursor-pointer">
                        <summary className="text-white font-bold font-mono text-sm">How do I parse a gig email?</summary>
                        <div className="mt-3 text-gray-400 font-mono text-sm space-y-2">
                            <p>1. Go to "Gig Offers" page</p>
                            <p>2. Paste the email into the text box</p>
                            <p>3. Click "PARSE EMAIL/PDF"</p>
                            <p>4. AI extracts venue, date, fee</p>
                            <p>5. Click "SAVE" to add to your calendar</p>
                        </div>
                    </details>

                    <details className="bg-black border border-gray-900 rounded-lg p-4 cursor-pointer">
                        <summary className="text-white font-bold font-mono text-sm">How do I add band members?</summary>
                        <div className="mt-3 text-gray-400 font-mono text-sm space-y-2">
                            <p>1. Go to artist's home page</p>
                            <p>2. Scroll to "Band Members" section</p>
                            <p>3. Enter name + email</p>
                            <p>4. They get notified about gig votes</p>
                        </div>
                    </details>

                    <details className="bg-black border border-gray-900 rounded-lg p-4 cursor-pointer">
                        <summary className="text-white font-bold font-mono text-sm">Does it work offline?</summary>
                        <div className="mt-3 text-gray-400 font-mono text-sm space-y-2">
                            <p>Yes! Once you've loaded CB51 online once, it works offline.</p>
                            <p>• View calendar</p>
                            <p>• Check gig details</p>
                            <p>• Add tasks</p>
                            <p>• Everything syncs when you're back online</p>
                        </div>
                    </details>

                    <details className="bg-black border border-gray-900 rounded-lg p-4 cursor-pointer">
                        <summary className="text-white font-bold font-mono text-sm">How do band votes work?</summary>
                        <div className="mt-3 text-gray-400 font-mono text-sm space-y-2">
                            <p>1. Manager sends gig offer to band</p>
                            <p>2. Band members get email notification</p>
                            <p>3. They click link → vote YES or NO</p>
                            <p>4. Manager sees results in dashboard</p>
                            <p>5. When all votes in, manager confirms/rejects</p>
                        </div>
                    </details>

                    <details className="bg-black border border-gray-900 rounded-lg p-4 cursor-pointer">
                        <summary className="text-white font-bold font-mono text-sm">Can I export my data?</summary>
                        <div className="mt-3 text-gray-400 font-mono text-sm space-y-2">
                            <p>Yes! Go to Settings → Export Data</p>
                            <p>Downloads a JSON file with all your:</p>
                            <p>• Artists</p>
                            <p>• Gigs</p>
                            <p>• Tasks</p>
                            <p>• Calendar events</p>
                        </div>
                    </details>

                    <details className="bg-black border border-gray-900 rounded-lg p-4 cursor-pointer">
                        <summary className="text-white font-bold font-mono text-sm">AI parsing isn't working</summary>
                        <div className="mt-3 text-gray-400 font-mono text-sm space-y-2">
                            <p>Check:</p>
                            <p>• Email includes venue name</p>
                            <p>• Date is clear (not "next week")</p>
                            <p>• Fee is mentioned</p>
                            <p>If still failing, email family@uf51.love with the text</p>
                        </div>
                    </details>



                </div>

                {/* Still Need Help */}
                <div className="mt-12 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500 rounded-lg p-6 text-center">
                    <h3 className="text-white font-black font-mono text-xl mb-3">STILL STUCK?</h3>
                    <p className="text-gray-300 font-mono text-sm mb-4">We'll sort it. Promise.</p>
                    <a 
                        href="mailto:family@uf51.love"
                        className="inline-block bg-cyan-500 hover:bg-cyan-600 text-black font-black px-6 py-3 rounded-lg font-mono"
                    >
                        EMAIL SUPPORT
                    </a>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-gray-900 text-center">
                    <p className="text-gray-600 font-mono text-xs">CB51 • Artist Management AI</p>
                </div>

            </div>
        </div>
    );
}