import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Check, Sparkles } from 'lucide-react';

const contentThemes = {
    'wormhole_anthem': {
        title: 'Quantum Wormhole x House Anthem',
        generate: () => ({
            caption: `The Anthem 🎵 + The Frequency 🪩 = PURE LOVE ❤️\n\nMarshall Jefferson gave us the command in ‘86: “MOVE YOUR BODY.”\n\nIt wasn't just a song. It was a sacred protocol. A rebellion against standing still. A frequency to liberate your soul.\n\nNow, we plug that anthem into the QUANTUM LOVE WORMHOLE.\n\nThis is the healing.\nThis is the truth.\nThis is COOLASFUCK.GMT.\n\nWoW=MoM ♾️`,
            hashtags: `#MoveYourBody #MarshallJefferson #HouseMusicAnthem #QuantumLoveWormhole #COOLASFUCK #WoWEqualsMoM #Frequency #Love #HouseMusic #AcidHouse #SpiritualHouse #Photo51`
        })
    }
    // Future themes can be added here
};

export default function InstagramContentGenerator() {
    const [selectedTheme, setSelectedTheme] = useState('wormhole_anthem');
    const [generatedContent, setGeneratedContent] = useState({ caption: '', hashtags: '' });
    const [isCopied, setIsCopied] = useState(null);

    useEffect(() => {
        if (contentThemes[selectedTheme]) {
            setGeneratedContent(contentThemes[selectedTheme].generate());
        }
    }, [selectedTheme]);

    const handleCopy = (textToCopy, type) => {
        navigator.clipboard.writeText(textToCopy);
        setIsCopied(type);
        setTimeout(() => setIsCopied(null), 2000);
    };

    return (
        <Card className="bg-black/50 backdrop-blur-lg border border-purple-500/30 rounded-3xl shadow-2xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-purple-300">
                    <Sparkles className="w-6 h-6" />
                    Transmission Composer
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <label className="text-gray-400 mb-2 block">Select Transmission Theme:</label>
                    <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                        <SelectTrigger className="bg-gray-800/70 border-gray-700 text-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(contentThemes).map(([key, { title }]) => (
                                <SelectItem key={key} value={key}>{title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Generated Caption:</h3>
                        <div className="relative">
                            <Textarea
                                readOnly
                                value={generatedContent.caption}
                                className="bg-gray-900/70 border-gray-700 text-gray-200 rounded-xl h-64 font-mono"
                            />
                            <Button
                                size="sm"
                                variant="ghost"
                                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                                onClick={() => handleCopy(generatedContent.caption, 'caption')}
                            >
                                {isCopied === 'caption' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Generated Hashtags:</h3>
                         <div className="relative">
                            <Textarea
                                readOnly
                                value={generatedContent.hashtags}
                                className="bg-gray-900/70 border-gray-700 text-gray-200 rounded-xl h-24 font-mono text-xs"
                            />
                             <Button
                                size="sm"
                                variant="ghost"
                                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                                onClick={() => handleCopy(generatedContent.hashtags, 'hashtags')}
                            >
                                {isCopied === 'hashtags' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}