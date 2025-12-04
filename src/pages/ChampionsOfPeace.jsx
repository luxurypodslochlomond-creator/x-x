import React from 'react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';
import { Shield } from 'lucide-react';

export default function ChampionsOfPeace() {
    return (
        <PlaceholderPage
            icon={Shield}
            title="Champions of Peace"
            description="Recognizing the souls who dedicate their lives to healing, protecting, and loving our planet and each other."
            comingSoon={true}
        />
    );
}