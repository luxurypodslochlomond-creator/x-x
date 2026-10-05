import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Heart, Loader2, Sparkles, Home, Users, Smile, BookHeart, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';

const loveTypes = [
  { 
    id: 'daily_kindness', 
    label: 'Daily Kindness',
    icon: Smile,
    color: '#00D9FF',
    examples: 'Helped someone. Made someone smile. Listened.'
  },
  { 
    id: 'soul_support', 
    label: 'Soul Support',
    icon: Heart,
    color: '#FF1B8D',
    examples: 'Comforted someone. Gave time. Showed up.'
  },
  { 
    id: 'home_sanctuary_purification', 
    label: 'Home Sanctuary',
    icon: Home,
    color: '#00FF88',
    examples: 'Cleaned home. Created beauty. Made space sacred.'
  },
  { 
    id: 'community_service', 
    label: 'Community Service',
    icon: Users,
    color: '#FF6B35',
    examples: 'Volunteered. Helped neighbors. Served others.'
  },
  { 
    id: 'creative_gift', 
    label: 'Creative Gift',
    icon: Sparkles,
    color: '#9D4EDD',
    examples: 'Made art. Shared music. Created beauty.'
  },
  { 
    id: 'teaching_knowledge', 
    label: 'Teaching',
    icon: BookHeart,
    color: '#FFD700',
    examples: 'Taught someone. Shared wisdom. Helped learn.'
  }
];

export default function SubmitProofOfLovePage() {
  const [selectedType, setSelectedType] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['proofOfLoveUser'],
    queryFn: () => base44.auth.me()
  });

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsUploading(true);
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file: selectedFile });
        setPhotoUrl(file_url);
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedType || !description.trim()) return;

    try {
      // Get location if browser supports it
      let coords = null;
      if ("geolocation" in navigator) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        } catch (err) {
          console.log("Location not available");
        }
      }

      const proofData = {
        love_type: selectedType,
        description: description.trim(),
        location: location.trim() || 'Earth',
        coordinates: coords,
        evidence_url: photoUrl || null
      };

      const createdProof = await base44.entities.ProofOfLove.create(proofData);

      // Ask Love Oracle for P51
      const oracleResponse = await base44.integrations.Core.InvokeLLM({
        prompt: `A soul just performed this act of love:

Type: ${loveTypes.find(t => t.id === selectedType)?.label}
Story: ${description}
Location: ${location || 'Earth'}

Based on the depth, sincerity, and impact of this act, award P51 (our love currency).

Rules:
- Small daily kindness: 1-5 P51
- Meaningful support: 5-15 P51
- Deep sacrifice/service: 15-50 P51
- Life-changing impact: 50-100 P51

Return ONLY a JSON with:
1. p51_awarded (number)
2. reasoning (why you awarded this amount - make it beautiful and personal)`,
        response_json_schema: {
          type: 'object',
          properties: {
            p51_awarded: { type: 'number' },
            reasoning: { type: 'string' }
          }
        }
      });

      // Update proof with oracle decision
      await base44.entities.ProofOfLove.update(createdProof.id, {
        p51_awarded: oracleResponse.p51_awarded,
        oracle_reasoning: oracleResponse.reasoning,
        verification_status: 'verified'
      });

      // Award tokens to user
      const newTotal = (user?.total_tokens_earned || 0) + oracleResponse.p51_awarded;
      await base44.auth.updateMe({
        total_tokens_earned: newTotal
      });

      // Create transaction record
      await base44.entities.Transaction.create({
        transaction_type: 'earned',
        p51_amount: oracleResponse.p51_awarded,
        to_user: user.email,
        reason: `Act of Love: ${loveTypes.find(t => t.id === selectedType)?.label}`,
        reference_id: createdProof.id
      });

      setResult(oracleResponse);
      queryClient.invalidateQueries({ queryKey: ['portalCombinedActivity'] });
      
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-pink-950 to-black text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl text-center space-y-8"
        >
          <Heart className="w-24 h-24 mx-auto text-pink-400 animate-pulse" />
          <h1 className="text-5xl font-black">Love Received</h1>
          <div className="bg-black/40 rounded-2xl p-8 border-2 border-pink-500/50">
            <p className="text-6xl font-black text-pink-400 mb-4">
              +{result.p51_awarded} <span className="text-3xl font-mono">P51</span>
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              {result.reasoning}
            </p>
          </div>
          <Button
            onClick={() => navigate(createPageUrl('Portal'))}
            className="bg-pink-600 hover:bg-pink-700 text-2xl py-8 px-12"
          >
            Return Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-pink-950 to-black text-white p-6">
      <div className="max-w-3xl mx-auto space-y-8 py-8">
        
        {/* Header */}
        <div className="text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-pink-400" />
          <h1 className="text-5xl font-black mb-3">Share Your Love</h1>
          <p className="text-2xl text-gray-300">Tell us what beautiful thing you did today</p>
        </div>

        {/* Love Type Selection */}
        {!selectedType ? (
          <div className="space-y-6">
            <p className="text-center text-2xl font-bold">What kind of love did you give?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loveTypes.map(type => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={type.id}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      onClick={() => setSelectedType(type.id)}
                      className="p-6 cursor-pointer hover:border-pink-500 transition-all bg-black/40 border-2 border-gray-800 hover:shadow-lg hover:shadow-pink-500/20"
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${type.color}20`, border: `2px solid ${type.color}` }}
                        >
                          <Icon className="w-7 h-7" style={{ color: type.color }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">{type.label}</h3>
                          <p className="text-base text-gray-400">{type.examples}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Selected Type */}
            <Card className="p-6 bg-black/40 border-2 border-pink-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {React.createElement(loveTypes.find(t => t.id === selectedType)?.icon, {
                    className: "w-8 h-8",
                    style: { color: loveTypes.find(t => t.id === selectedType)?.color }
                  })}
                  <span className="text-2xl font-bold">{loveTypes.find(t => t.id === selectedType)?.label}</span>
                </div>
                <Button variant="ghost" onClick={() => setSelectedType(null)} className="text-lg">
                  Change
                </Button>
              </div>
            </Card>

            {/* Story */}
            <div>
              <label className="text-2xl font-bold block mb-3">Tell the story</label>
              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What did you do? How did it feel? What happened?"
                className="bg-black/40 border-gray-700 text-white text-xl min-h-[200px] leading-relaxed"
              />
            </div>

            {/* Location (optional) */}
            <div>
              <label className="text-xl font-bold block mb-2">Where? (optional)</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full bg-black/40 border border-gray-700 rounded-lg p-4 text-white text-lg"
              />
            </div>

            {/* Photo (optional) */}
            <div>
              <label className="text-xl font-bold block mb-2">Photo? (optional)</label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6">
                {photoUrl ? (
                  <div className="relative">
                    <img src={photoUrl} alt="Proof" className="w-full rounded-lg" />
                    <Button 
                      variant="ghost" 
                      onClick={() => { setPhotoUrl(''); setFile(null); }}
                      className="absolute top-2 right-2 bg-black/80"
                    >
                      Remove
                    </Button>
                  </div>
                ) : isUploading ? (
                  <div className="flex flex-col items-center justify-center h-32">
                    <Loader2 className="w-8 h-8 animate-spin text-pink-400" />
                    <p className="text-gray-400 mt-2">Uploading...</p>
                  </div>
                ) : (
                  <label htmlFor="file-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer">
                    <Camera className="w-12 h-12 text-gray-500 mb-2" />
                    <p className="text-gray-400 text-lg">Tap to add photo</p>
                    <input 
                      id="file-upload" 
                      type="file" 
                      accept="image/*" 
                      capture="environment" 
                      onChange={handleFileChange} 
                      className="hidden" 
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={!description.trim()}
              className="w-full bg-pink-600 hover:bg-pink-700 text-2xl py-8 font-bold"
            >
              <Heart className="w-6 h-6 mr-2" />
              Submit Act of Love
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}