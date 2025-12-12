import React, { useState, useEffect } from 'react';
import { Users, Phone, Mail, ExternalLink } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

/**
 * SMART CONTACT MATCHER
 * Before cold calling labels/publishers, check if Scott already knows someone there
 * Uses existing contacts, saves time, more professional
 */

export default function ScottContactMatcher({ labelName, publisherName }) {
    const [matches, setMatches] = useState([]);

    // Fetch Scott's contacts
    const { data: contacts } = useQuery({
        queryKey: ['scott-contacts'],
        queryFn: async () => {
            const artists = await base44.entities.ScottArtist.list();
            return artists || [];
        },
        enabled: !!(labelName || publisherName)
    });

    useEffect(() => {
        if (!contacts || (!labelName && !publisherName)) return;

        const searchTerms = [
            labelName?.toLowerCase(),
            publisherName?.toLowerCase()
        ].filter(Boolean);

        const found = contacts.filter(contact => {
            const notes = contact.notes?.toLowerCase() || '';
            const type = contact.type?.toLowerCase() || '';
            const name = contact.name?.toLowerCase() || '';

            return searchTerms.some(term => 
                notes.includes(term) || 
                type.includes('label') || 
                type.includes('publisher') ||
                name.includes(term)
            );
        });

        setMatches(found);
    }, [contacts, labelName, publisherName]);

    if (matches.length === 0) return null;

    return (
        <div className="bg-green-900/20 border-2 border-green-500/50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-green-400" />
                <p className="text-green-400 font-bold text-sm font-mono">YOU ALREADY KNOW SOMEONE HERE</p>
            </div>
            
            <div className="space-y-2">
                {matches.map(contact => (
                    <div key={contact.id} className="bg-black border border-green-500/30 rounded p-3">
                        <p className="text-white font-bold text-sm font-mono mb-1">{contact.name}</p>
                        {contact.type && (
                            <p className="text-green-400 text-xs font-mono mb-2">{contact.type.toUpperCase()}</p>
                        )}
                        <div className="flex gap-2">
                            {contact.phone && (
                                <a
                                    href={`tel:${contact.phone}`}
                                    className="flex items-center gap-1 px-2 py-1 bg-green-500/20 hover:bg-green-500/30 rounded text-xs font-mono text-green-400"
                                >
                                    <Phone className="w-3 h-3" />
                                    Call
                                </a>
                            )}
                            {contact.email && (
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="flex items-center gap-1 px-2 py-1 bg-green-500/20 hover:bg-green-500/30 rounded text-xs font-mono text-green-400"
                                >
                                    <Mail className="w-3 h-3" />
                                    Email
                                </a>
                            )}
                        </div>
                        {contact.notes && (
                            <p className="text-gray-500 text-xs font-mono mt-2">{contact.notes}</p>
                        )}
                    </div>
                ))}
            </div>
            
            <p className="text-green-400 text-xs font-mono mt-3">
                💡 Use your existing relationship first - way easier than cold contact
            </p>
        </div>
    );
}