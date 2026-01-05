import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { scanGigOffers } from '@/functions/scanGigOffers';

/**
 * PASTE GIG OFFER EMAIL
 * Manager pastes email → AI extracts everything
 */

export default function ScottPasteGigOffer() {
  const navigate = useNavigate();
  const [emailText, setEmailText] = useState('');
  const [artistId, setArtistId] = useState('');
  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState([]);

  React.useEffect(() => {
    const loadArtists = async () => {
      const data = await base44.entities.ScottArtist.list();
      setArtists(data);
    };
    loadArtists();
  }, []);

  const handleScan = async () => {
    if (!emailText.trim() || !artistId) {
      alert('Select artist and paste email');
      return;
    }

    setLoading(true);
    try {
      const result = await scanGigOffers({ emailText, artistId });
      alert('✅ Gig offer extracted!');
      navigate(createPageUrl('ScottGigOffers'));
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl('ScottGigOffers'))}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-black text-white">PASTE GIG OFFER</h1>
            <p className="text-gray-400">AI will extract all details</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-black border-2 border-cyan-500">
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-white font-bold mb-2 block">Artist/Band</label>
                <Select value={artistId} onValueChange={setArtistId}>
                  <SelectTrigger className="bg-black border-cyan-500 text-white">
                    <SelectValue placeholder="Select artist" />
                  </SelectTrigger>
                  <SelectContent>
                    {artists.map(a => (
                      <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-white font-bold mb-2 block">Paste Email</label>
                <Textarea
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  placeholder="Paste the full gig offer email here..."
                  className="bg-black border-cyan-500 text-white h-64 font-mono text-sm"
                />
              </div>

              <Button
                onClick={handleScan}
                disabled={loading || !emailText.trim() || !artistId}
                className="w-full bg-cyan-600 hover:bg-cyan-700 gap-2"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    AI Extracting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Extract Gig Details
                  </>
                )}
              </Button>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-4">
                <p className="text-cyan-400 text-sm font-bold mb-2">AI will extract:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Venue, location (city/county/country), capacity</li>
                  <li>• Date, time, fee, currency</li>
                  <li>• Promoter name and contact</li>
                  <li>• Deposit info, tour logistics, special requirements</li>
                  <li>• Distance to next show (if tour)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}