import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, DollarSign, Calendar, Check, X, Clock, AlertCircle } from 'lucide-react';

/**
 * SCOTT BAND VOTE
 * Band members vote YES/NO on gig offers
 */

export default function ScottBandVote() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const offerId = searchParams.get('offer');
  const [notes, setNotes] = useState('');
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const getUser = async () => {
      const u = await base44.auth.me();
      setUser(u);
    };
    getUser();
  }, []);

  const { data: offer } = useQuery({
    queryKey: ['scottGigOffer', offerId],
    queryFn: () => base44.entities.ScottGigOffer.filter({ id: offerId }),
    enabled: !!offerId,
    select: (data) => data[0],
  });

  const voteMutation = useMutation({
    mutationFn: async ({ response }) => {
      const responses = offer.band_responses || [];
      responses.push({
        member_name: user.full_name,
        response,
        notes,
        responded_at: new Date().toISOString()
      });

      // Check if all responses in
      // TODO: Get actual band size from ScottTeamMember
      const allIn = responses.length >= 3; // Temporary

      return base44.entities.ScottGigOffer.update(offerId, {
        band_responses: responses,
        all_responses_in: allIn
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['scottGigOffer']);
      alert('✅ Vote submitted!');
      navigate(createPageUrl('ScottArtistHome'));
    },
  });

  if (!offer) return <div className="min-h-screen bg-black flex items-center justify-center"><p className="text-white">Loading...</p></div>;

  const hasVoted = offer.band_responses?.some(r => r.member_name === user?.full_name);
  const isUrgent = offer.urgency !== 'normal';
  const daysLeft = Math.ceil((new Date(offer.response_deadline) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">GIG OFFER</h1>
          {isUrgent && (
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-bold">
                {offer.urgency === 'very_urgent' ? 'VERY URGENT' : 'URGENT'}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 text-amber-400">
            <Clock className="w-4 h-4" />
            <span className="font-bold">Respond by: {new Date(offer.response_deadline).toLocaleDateString()}</span>
            <span className="text-gray-400">({daysLeft} days left)</span>
          </div>
        </div>

        <Card className="bg-black border-2 border-cyan-500 mb-6">
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-3xl font-black text-white mb-2">{offer.venue}</h2>
              <div className="flex items-center gap-2 text-gray-300 mb-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{offer.city}, {offer.county}, {offer.country}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 mb-2">
                <Calendar className="w-4 h-4 text-green-400" />
                <span>{new Date(offer.date).toLocaleDateString()} at {offer.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-bold text-xl">{offer.currency}{offer.fee}</span>
              </div>
            </div>

            {offer.capacity && (
              <div className="bg-purple-500/20 border border-purple-500 rounded p-3">
                <p className="text-purple-400">Capacity: {offer.capacity}</p>
              </div>
            )}

            {offer.manager_notes && (
              <div className="bg-gray-800 rounded p-4">
                <p className="text-white font-bold mb-1">Manager's Notes:</p>
                <p className="text-gray-300">{offer.manager_notes}</p>
              </div>
            )}

            {offer.notes && (
              <div className="bg-gray-800 rounded p-4">
                <p className="text-gray-300 text-sm">{offer.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {hasVoted ? (
          <Card className="bg-black border-2 border-green-500">
            <CardContent className="p-6 text-center">
              <Check className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-white font-bold text-xl">You've voted!</p>
              <p className="text-gray-400 mt-2">Waiting for other band members...</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-black border-2 border-amber-500">
            <CardContent className="p-6 space-y-4">
              <Textarea
                placeholder="Add notes (optional)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-black border-cyan-500 text-white"
              />

              <div className="flex gap-3">
                <Button
                  onClick={() => voteMutation.mutate({ response: 'yes' })}
                  className="flex-1 bg-green-600 hover:bg-green-700 gap-2 text-lg py-6"
                >
                  <Check className="w-6 h-6" />
                  YES - I'm In
                </Button>
                <Button
                  onClick={() => voteMutation.mutate({ response: 'no' })}
                  className="flex-1 bg-red-600 hover:bg-red-700 gap-2 text-lg py-6"
                >
                  <X className="w-6 h-6" />
                  NO - Can't Do It
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}