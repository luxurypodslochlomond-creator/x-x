import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Users, Music, Calendar, FileText, Shield, HardDrive, Wifi, Lock, Zap } from 'lucide-react';
import CoManager51Icon8Bit from '@/components/shared/CoManager51Icon8Bit';

/**
 * CO-MANAGER51 TECHNICAL WHITEPAPER
 * Zero server architecture for music industry management
 * Same P2P principles as Prof51, different application
 */

export default function ScottZeroServerArchitecture() {
    React.useEffect(() => {
        document.title = 'Technical Whitepaper: Zero Server Architecture - Co-Manager51';
    }, []);

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* HEADER - WHITEPAPER STYLE */}
            <div className="border-b-2 border-gray-900 px-4 py-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <Link to={createPageUrl('ScottAbout')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-bold mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Co-Manager51
                    </Link>
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Co-Manager51: A Peer-to-Peer Artist Management Network</h1>
                        <p className="text-xl text-gray-600">Technical Architecture Whitepaper</p>
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                            <p>Version 1.0</p>
                            <p>•</p>
                            <p>December 2024</p>
                        </div>
                        <p className="text-sm text-gray-600 max-w-2xl mx-auto">A decentralized management architecture enabling artists, managers, and teams to coordinate without centralized infrastructure, ensuring privacy, offline capability, and zero operational costs.</p>
                    </div>
                </div>
            </div>

            <div className="px-4 py-12 max-w-4xl mx-auto space-y-12">

                {/* ABSTRACT */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Abstract</h2>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                            Co-Manager51 presents a fully decentralized management architecture where artists, managers, labels, and venues coordinate through peer-to-peer networks rather than centralized platforms. By combining proven technologies—Bluetooth Low Energy mesh, IPFS storage, encrypted P2P sync, and offline-first design—we eliminate dependency on centralized servers while maintaining real-time coordination, privacy, and data sovereignty.
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            The system enables music industry professionals to manage gigs, contracts, finances, publishing, visas, and team communication without surrendering data to third-party platforms. Using quantum-resistant encryption and device-to-device synchronization, Co-Manager51 ensures that sensitive business information remains private and accessible even when internet connectivity is unavailable.
                        </p>
                    </div>
                </section>

                {/* TABLE OF CONTENTS */}
                <section className="bg-gray-50 border-l-4 border-gray-900 p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Contents</h3>
                    <ol className="space-y-2 text-gray-700">
                        <li>1. Introduction</li>
                        <li>2. System Architecture</li>
                        <li>3. Data Synchronization Protocol</li>
                        <li>4. Security Model</li>
                        <li>5. Offline-First Design</li>
                        <li>6. Real-World Implementations</li>
                        <li>7. Music Industry Application</li>
                        <li>8. Conclusion</li>
                    </ol>
                </section>

                {/* 1. INTRODUCTION */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                    <div className="prose prose-lg max-w-none space-y-4">
                        <h3 className="text-2xl font-semibold text-gray-900">1.1 Problem Statement</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Music industry management relies on fragmented, centralized tools:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Platform Lock-In:</strong> Data trapped in proprietary systems (Google Calendar, Trello, Asana)</li>
                            <li><strong>Privacy Risk:</strong> Sensitive contracts, financials, and deals exposed to platform operators</li>
                            <li><strong>Internet Dependency:</strong> Tools fail in venues, tour buses, airports without connectivity</li>
                            <li><strong>Cost Barrier:</strong> Subscription fees for multiple disconnected tools (£100-300/month)</li>
                            <li><strong>Data Silos:</strong> Artist info, gig details, contracts spread across 10+ platforms</li>
                        </ul>
                        
                        <h3 className="text-2xl font-semibold text-gray-900 mt-6">1.2 Proposed Solution</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Co-Manager51 consolidates all management functions into a single offline-first P2P application where data syncs device-to-device using Bluetooth mesh and encrypted P2P protocols. No central server stores sensitive information—everything lives on team devices with automatic backup to distributed storage.
                        </p>
                    </div>
                </section>

                {/* 2. SYSTEM ARCHITECTURE */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">2. System Architecture</h2>
                    
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">2.1 Bluetooth Mesh Team Sync</h3>
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
                        <p className="text-sm text-blue-900 font-semibold mb-2">Inspired by Jack Dorsey's Bitchat (2025)</p>
                        <p className="text-gray-700 leading-relaxed">
                            Co-Manager51 extends Bitchat's Bluetooth mesh architecture to management coordination. When team members are physically together (backstage, tour bus, studio), devices automatically sync via Bluetooth Low Energy without internet.
                        </p>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            <strong>Team Coordination Topology:</strong>
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Range:</strong> BLE operates at 30-meter range per hop (covers entire venue backstage)</li>
                            <li><strong>Multi-Device Sync:</strong> Manager's phone → Artist's phone → Band members → Crew</li>
                            <li><strong>Store-and-Forward:</strong> Updates cache on devices for team members who aren't present</li>
                            <li><strong>Bridge Nodes:</strong> Devices with internet automatically sync to cloud backup when available</li>
                        </ul>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">2.2 Distributed Data Storage</h3>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Management data stored across team devices using IPFS-compatible content addressing:
                        </p>
                        <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                            <li>
                                <strong>Local-First:</strong> All data stored on device (IndexedDB), accessible offline
                            </li>
                            <li>
                                <strong>Encrypted Backup:</strong> Sensitive files (contracts, financials) encrypted and fragmented across team devices
                            </li>
                            <li>
                                <strong>IPFS Pinning:</strong> Critical documents pinned to IPFS for redundancy (artist owns private keys)
                            </li>
                            <li>
                                <strong>Conflict Resolution:</strong> Last-write-wins with manual merge for conflicting edits
                            </li>
                        </ol>
                    </div>

                    <div className="bg-green-50 border border-green-200 p-6 mt-6">
                        <h4 className="text-lg font-bold text-green-900 mb-2">Example: Tour Management Data Flow</h4>
                        <div className="text-sm text-green-900 space-y-1 font-mono">
                            <p>• Manager updates gig details (London, O2 Academy, 8pm)</p>
                            <p>• Change syncs to artist's phone via Bluetooth (backstage)</p>
                            <p>• Artist's phone relays to band members' devices</p>
                            <p>• Tour bus WiFi available → Encrypted backup to IPFS</p>
                            <p>• Venue loses internet → All devices still have full data</p>
                            <p>• New crew member joins → Receives full sync from any team device</p>
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">2.3 Data Synchronization Protocol</h3>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                            Changes propagate through the team mesh using efficient delta-sync:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                            <li>Devices broadcast "I have updates" beacon via Bluetooth advertisement</li>
                            <li>Nearby devices request delta (only changed data since last sync)</li>
                            <li>Changes transmitted in 512-byte packets over BLE</li>
                            <li>Recipients verify cryptographic signature (ensures authentic team member)</li>
                            <li>Automatic conflict resolution with notification for manual review if needed</li>
                        </ul>
                    </div>
                </section>

                {/* 3. SECURITY MODEL */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Security Model</h2>
                    
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">3.1 Team Authentication</h3>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Artist controls who has access through device-level authentication:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Artist Master Key:</strong> Artist generates master key pair (stored on their device)</li>
                            <li><strong>Team Member Invites:</strong> Manager/crew receive signed invite tokens from artist</li>
                            <li><strong>Cryptographic Verification:</strong> Every sync operation verified against artist's public key</li>
                            <li><strong>Revocation:</strong> Artist can instantly revoke access (former manager, fired crew)</li>
                        </ul>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">3.2 End-to-End Encryption</h3>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                            All sensitive data encrypted before leaving device:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                            <li>Contracts: AES-256 encryption, only readable by authorized team</li>
                            <li>Financial data: Encrypted on-device, never sent to external servers</li>
                            <li>Communications: Signal Protocol for team chat (same as WhatsApp encryption)</li>
                            <li>IPFS backups: Encrypted before upload, artist controls decryption keys</li>
                        </ul>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">3.3 No Central Point of Failure</h3>
                    <div className="bg-red-50 border-l-4 border-red-600 p-6">
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Critical Design Principle:</strong> No single entity (not even Co-Manager51 developers) can access artist data. Even if Co-Manager51 company shuts down, existing installations continue functioning—teams own their data completely.
                        </p>
                    </div>
                </section>

                {/* 4. OFFLINE-FIRST DESIGN */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Offline-First Design</h2>
                    
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">4.1 Real-World Music Scenarios</h3>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Music industry operates in hostile connectivity environments:
                        </p>
                        <div className="space-y-4">
                            <div className="border-l-4 border-purple-600 bg-purple-50 p-4">
                                <p className="font-bold text-purple-900 mb-2">Venue Backstage</p>
                                <p className="text-gray-700 text-sm">Concrete walls block cellular. WiFi password unknown. 200 people crushing network.</p>
                                <p className="text-purple-900 font-semibold text-sm mt-2">✓ Co-Manager51: Bluetooth mesh syncs entire team backstage</p>
                            </div>

                            <div className="border-l-4 border-blue-600 bg-blue-50 p-4">
                                <p className="font-bold text-blue-900 mb-2">International Tour</p>
                                <p className="text-gray-700 text-sm">UK to Japan. No roaming. SIM cards don't work in airports/hotels.</p>
                                <p className="text-blue-900 font-semibold text-sm mt-2">✓ Co-Manager51: All gig info/contracts/contacts accessible offline</p>
                            </div>

                            <div className="border-l-4 border-green-600 bg-green-50 p-4">
                                <p className="font-bold text-green-900 mb-2">Festival Camping</p>
                                <p className="text-gray-700 text-sm">50,000 people. Network congestion. 4G unusable. No WiFi.</p>
                                <p className="text-green-900 font-semibold text-sm mt-2">✓ Co-Manager51: Team coordinates via Bluetooth mesh across festival site</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">4.2 Progressive Enhancement</h3>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                            App functions at three connectivity levels:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                            <li><strong>Full Offline:</strong> All core functions work (view gigs, edit contracts, team chat via Bluetooth)</li>
                            <li><strong>Bluetooth Only:</strong> Team sync via mesh, no external connections needed</li>
                            <li><strong>Internet Available:</strong> Automatic encrypted backup to IPFS, faster large file transfers</li>
                        </ul>
                    </div>
                </section>

                {/* 5. REAL-WORLD IMPLEMENTATIONS */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Real-World Implementations</h2>
                    
                    <div className="space-y-6">
                        <div className="border-l-4 border-blue-600 bg-blue-50 p-6">
                            <h4 className="text-lg font-bold text-blue-900 mb-2">BitTorrent (2001-Present)</h4>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Relevance:</strong> Proves P2P file distribution scales globally without central servers
                            </p>
                        </div>

                        <div className="border-l-4 border-purple-600 bg-purple-50 p-6">
                            <h4 className="text-lg font-bold text-purple-900 mb-2">IPFS - InterPlanetary File System (2015-Present)</h4>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Relevance:</strong> Co-Manager51 uses IPFS for contract/document backup with artist-controlled encryption
                            </p>
                        </div>

                        <div className="border-l-4 border-cyan-600 bg-cyan-50 p-6">
                            <h4 className="text-lg font-bold text-cyan-900 mb-2">Bitchat by Jack Dorsey (July 2025)</h4>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                <strong>Status:</strong> Beta release, Bluetooth mesh messaging without internet
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                                <li>BLE mesh networks with 30-meter range, store-and-forward relay</li>
                                <li>Messages fragmented into 500-byte chunks for Bluetooth transmission</li>
                                <li>Designed for protests, conferences, disaster areas</li>
                            </ul>
                            <p className="text-cyan-900 font-semibold mt-3">Relevance: Co-Manager51 extends Bitchat's architecture to music industry coordination</p>
                        </div>

                        <div className="border-l-4 border-green-600 bg-green-50 p-6">
                            <h4 className="text-lg font-bold text-green-900 mb-2">Signal Protocol (2013-Present)</h4>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Relevance:</strong> Co-Manager51 team chat uses same encryption as Signal/WhatsApp—proven secure for 2B+ users
                            </p>
                        </div>
                    </div>
                </section>

                {/* 6. MUSIC INDUSTRY APPLICATION */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Music Industry Application</h2>
                    
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">6.1 Core Management Functions</h3>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            All functions operate offline-first with P2P sync:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 border border-gray-200 p-4">
                                <p className="font-bold text-gray-900 mb-2">📅 Gigs & Calendar</p>
                                <p className="text-sm text-gray-700">Create gigs, manage riders, track settlements—syncs across team via Bluetooth</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 p-4">
                                <p className="font-bold text-gray-900 mb-2">📄 Contracts</p>
                                <p className="text-sm text-gray-700">Store encrypted contracts on device, backed up to IPFS with artist-controlled keys</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 p-4">
                                <p className="font-bold text-gray-900 mb-2">💰 Financials</p>
                                <p className="text-sm text-gray-700">Track income/expenses/invoices—never leaves artist's device unencrypted</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 p-4">
                                <p className="font-bold text-gray-900 mb-2">🎵 Publishing</p>
                                <p className="text-sm text-gray-700">Manage splits, ISRCs, sample clearances—offline accessible, team synced</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 p-4">
                                <p className="font-bold text-gray-900 mb-2">✈️ Visas & Travel</p>
                                <p className="text-sm text-gray-700">Track visa applications, flights, accommodation—accessible in airports without WiFi</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 p-4">
                                <p className="font-bold text-gray-900 mb-2">💬 Team Chat</p>
                                <p className="text-sm text-gray-700">Signal Protocol encryption, Bluetooth relay when offline, no central server</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">6.2 Why Artists Need This</h3>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Current tools force artists to choose between:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><strong>Expensive:</strong> Multiple subscriptions (Google Workspace, Notion, Asana, DocuSign) = £200+/month</li>
                            <li><strong>Insecure:</strong> Contracts and financials stored on corporate servers</li>
                            <li><strong>Fragmented:</strong> Data spread across 10+ platforms, difficult to coordinate</li>
                            <li><strong>Internet-Dependent:</strong> Tools fail when touring internationally or in venues</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            Co-Manager51 consolidates everything into one app that works offline, syncs P2P, and keeps artists in control of their data.
                        </p>
                    </div>
                </section>

                {/* 7. CONCLUSION */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Conclusion</h2>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                            Co-Manager51 demonstrates that music industry management requires no centralized infrastructure. By combining Bluetooth mesh networking (Bitchat), distributed storage (IPFS), end-to-end encryption (Signal Protocol), and offline-first design, artists gain complete sovereignty over their business operations.
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            The system inherits battle-tested resilience from proven decentralized technologies while addressing music industry's unique challenges: hostile connectivity environments, sensitive financial data, and complex team coordination. Artists own their data, control team access, and operate independently of any centralized platform.
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            Most importantly: even if Co-Manager51 ceases to exist, artists' data and functionality persist—true digital sovereignty for creative professionals.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border-2 border-gray-900 p-8 mt-8 text-center">
                        <p className="text-2xl font-bold text-gray-900 mb-2">Built for Artists, Not Investors</p>
                        <p className="text-gray-700">Zero extraction. Complete privacy. Artists own everything.</p>
                        <p className="text-sm text-gray-600 mt-4">♾️❤️♾️</p>
                    </div>
                </section>

            </div>
        </div>
    );
}