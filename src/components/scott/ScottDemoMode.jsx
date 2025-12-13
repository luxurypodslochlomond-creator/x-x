import React, { useState } from 'react';
import { Play, Users, Calendar, DollarSign } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * DEMO MODE
 * Let LA managers test KINGDOM51 with sample data
 */

export default function ScottDemoMode({ onStartDemo }) {
    const [isGenerating, setIsGenerating] = useState(false);

    const generateDemoData = async () => {
        setIsGenerating(true);

        try {
            // Create 3 demo artists
            const demoArtists = [
                {
                    name: 'Demo Artist 1',
                    genre: 'Hip-Hop',
                    location: 'Los Angeles',
                    contact_email: 'demo1@example.com',
                    contact_phone: '555-0001',
                    spotify_url: 'https://spotify.com/demo',
                    instagram_handle: '@demoartist1',
                    notes: 'Demo data - delete when done testing'
                },
                {
                    name: 'Demo Artist 2',
                    genre: 'R&B',
                    location: 'New York',
                    contact_email: 'demo2@example.com',
                    contact_phone: '555-0002',
                    spotify_url: 'https://spotify.com/demo2',
                    instagram_handle: '@demoartist2',
                    notes: 'Demo data - delete when done testing'
                },
                {
                    name: 'Demo Artist 3',
                    genre: 'Pop',
                    location: 'London',
                    contact_email: 'demo3@example.com',
                    contact_phone: '555-0003',
                    spotify_url: 'https://spotify.com/demo3',
                    instagram_handle: '@demoartist3',
                    notes: 'Demo data - delete when done testing'
                }
            ];

            const createdArtists = [];
            for (const artist of demoArtists) {
                const created = await base44.entities.ScottArtist.create(artist);
                createdArtists.push(created);
            }

            // Create demo events
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);

            await base44.entities.ScottEvent.create({
                artist_id: createdArtists[0].id,
                venue_name: 'The Troubadour',
                city: 'Los Angeles',
                event_date: tomorrow.toISOString().split('T')[0],
                event_type: 'show',
                capacity: 500,
                guarantee: 2500,
                currency: 'USD',
                status: 'confirmed',
                notes: 'Demo event - delete when done'
            });

            await base44.entities.ScottEvent.create({
                artist_id: createdArtists[1].id,
                venue_name: 'Bowery Ballroom',
                city: 'New York',
                event_date: nextWeek.toISOString().split('T')[0],
                event_type: 'show',
                capacity: 600,
                guarantee: 3000,
                currency: 'USD',
                status: 'pending',
                notes: 'Demo event - delete when done'
            });

            // Create demo tasks
            await base44.entities.ScottTask.create({
                artist_id: createdArtists[0].id,
                title: 'Review contract for LA show',
                priority: 'high',
                status: 'todo',
                due_date: tomorrow.toISOString().split('T')[0],
                notes: 'Demo task - delete when done'
            });

            await base44.entities.ScottTask.create({
                artist_id: createdArtists[2].id,
                title: 'Book studio session',
                priority: 'medium',
                status: 'in_progress',
                notes: 'Demo task - delete when done'
            });

            // Create demo invoice
            await base44.entities.ScottInvoice.create({
                artist_id: createdArtists[0].id,
                amount: 2500,
                currency: 'USD',
                description: 'The Troubadour show - guarantee',
                date: new Date().toISOString().split('T')[0],
                status: 'unpaid',
                accountant_notes: 'Demo invoice - delete when done'
            });

            alert('✓ Demo data created!\n\n3 artists, 2 events, 2 tasks, 1 invoice.\n\nExplore the system. Delete demo data when done.');
            
            if (onStartDemo) onStartDemo();
            
        } catch (error) {
            alert('Error creating demo: ' + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-4 border-purple-500 p-8 mb-6">
            <div className="text-center mb-6">
                <Play className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-black text-white mb-2">DEMO MODE</h3>
                <p className="text-gray-300 text-sm">
                    Test KINGDOM51 with sample artists, events, and tasks
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black border border-purple-500/30 p-4">
                    <Users className="w-6 h-6 text-purple-400 mb-2" />
                    <p className="text-white font-bold text-sm">3 Artists</p>
                    <p className="text-gray-400 text-xs">Hip-Hop, R&B, Pop</p>
                </div>

                <div className="bg-black border border-cyan-500/30 p-4">
                    <Calendar className="w-6 h-6 text-cyan-400 mb-2" />
                    <p className="text-white font-bold text-sm">2 Events</p>
                    <p className="text-gray-400 text-xs">LA + NYC shows</p>
                </div>

                <div className="bg-black border border-green-500/30 p-4">
                    <DollarSign className="w-6 h-6 text-green-400 mb-2" />
                    <p className="text-white font-bold text-sm">1 Invoice</p>
                    <p className="text-gray-400 text-xs">$2,500 pending</p>
                </div>
            </div>

            <button
                onClick={generateDemoData}
                disabled={isGenerating}
                className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-black font-mono text-lg disabled:opacity-50"
            >
                {isGenerating ? 'GENERATING...' : '🎬 START DEMO'}
            </button>

            <div className="mt-4 bg-amber-900/20 border border-amber-500/50 p-3">
                <p className="text-amber-400 text-xs font-bold mb-1">⚠️ DEMO DATA:</p>
                <p className="text-gray-400 text-xs">
                    All demo data is marked. Delete when done testing. Real data won't be affected.
                </p>
            </div>
        </div>
    );
}