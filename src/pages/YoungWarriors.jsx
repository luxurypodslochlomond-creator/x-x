import React from 'react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';
import { Award } from 'lucide-react';

export default function YoungWarriors() {
    return (
        <PlaceholderPage
            icon={Award}
            title="Young Warriors"
            description="For the next generation of planetary healers. Youth-led cleanup missions and educational programs."
            comingSoon={true}
        />
    );
}