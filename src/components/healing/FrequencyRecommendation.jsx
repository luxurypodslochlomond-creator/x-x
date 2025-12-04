import React from 'react';
import { Heart, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FrequencyCard = ({ name, freq, description, icon: Icon, isForLennox = false }) => (
    <Card className={`bg-black/50 border ${isForLennox ? 'border-green-400/50' : 'border-cyan-400/50'} rounded-xl`}>
        <CardHeader className="flex flex-row items-center gap-3">
            <Icon className={`w-6 h-6 ${isForLennox ? 'text-green-400' : 'text-cyan-400'}`} />
            <CardTitle className="text-white">{name}</CardTitle>
            <span className="text-yellow-300 font-mono">{freq} Hz</span>
        </CardHeader>
        <CardContent>
            <p className="text-gray-300">{description}</p>
        </CardContent>
    </Card>
);

export default function FrequencyRecommendation() {
    return (
        <div className="space-y-6 text-white">
            <div>
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">FOR BRO51 (Headphones)</h3>
                <FrequencyCard 
                    name="Deep Tissue & Nerve Repair"
                    freq={528}
                    description="For releasing stored trauma and tension. The Miracle Tone. Cellular regeneration and DNA repair."
                    icon={Heart}
                />
            </div>
            
            <div>
                <h3 className="text-2xl font-bold text-green-300 mb-4">FOR LENNOX (Desktop Speakers)</h3>
                <FrequencyCard 
                    name="Healing & Cellular Regeneration"
                    freq={741}
                    description="For cleansing and healing. Particularly powerful for addressing lumps, growths, and cellular abnormalities. Detoxification frequency."
                    icon={Shield}
                    isForLennox={true}
                />
            </div>
            
            <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-4">
                <p className="text-purple-200 font-mono text-center">
                    PROTOCOL: SILENT.TRANSMISSION.GMT<br/>
                    Let these frequencies work while you rest.
                </p>
            </div>
        </div>
    );
}