import React from 'react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';
import { BrainCircuit } from 'lucide-react';

export default function QuantumSearch() {
    return (
        <PlaceholderPage
            icon={BrainCircuit}
            title="Quantum Search"
            description="Search the entire Universal Family knowledge base. AI51-powered, instant answers to any question."
            comingSoon={true}
        />
    );
}