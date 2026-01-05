import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, DollarSign, Users, Calendar, Check, X, MessageSquare, ArrowLeft, Clock, AlertCircle, Send, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateGigResponse } from '@/functions/generateGigResponse';

/**
 * SCOTT GIG OFFERS
 * AI-scanned gig offers from emails
 * Manager approves → sends to band → yes/no/maybe with notes
 */

export default function ScottGigOffers() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [managerNotes, setManagerNotes] = useState('');
  const [deadlineDays, setDeadlineDays] = useState('2');
  const [urgency, setUrgency] = useState('normal');
  const [showResponseDraft, setShowResponseDraft] = useState(null);
  const [responseDraft, setResponseDraft] = useState('');
  const [responseType, setResponseType] = useState('accept');

  const { data: offers = [] } = useQuery({
    queryKey: ['scottGigOffers'],
    queryFn: () => base44.entities.ScottGigOffer.list(),
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, notes, deadline, urgency }) => {
      const deadlineDate = new Date();
      deadlineDate.setDate(deadlineDate.getDate() + parseInt(deadline));
      return base44.entities.ScottGigOffer.update(id, { 
        manager_approved: true,
        manager_notes: notes,
        status: 'sent_to_band',
        sent_to_band_date: new Date().toISOString(),
        response_deadline: deadlineDate.toISOString(),
        urgency
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['scottGigOffers']);
      setSelectedOffer(null);
      setManagerNotes('');
      // TODO: Send notifications to band members
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }) => 
      base44.entities.ScottGigOffer.update(id, { 
        status: 'rejected_by_manager',
        rejection_reason: reason
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['scottGigOffers']);
      setSelectedOffer(null);
      setManagerNotes('');
    },
  });

  const generateDraft = async (offerId, type) => {
    try {
      const result = await generateGigResponse({ offerId, responseType: type });
      setResponseDraft(result.draft);
      setResponseType(type);
      setShowResponseDraft(offerId);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const sendResponse = async (offerId) => {
    await base44.entities.ScottGigOffer.update(offerId, {
      final_response_sent: responseDraft,
      status: responseType === 'accept' ? 'confirmed' : 'rejected_by_manager'
    });
    queryClient.invalidateQueries(['scottGigOffers']);
    setShowResponseDraft(null);
    setResponseDraft('');
    alert('✅ Response sent!');
  };

  const pendingOffers = offers.filter(o => o.status === 'pending_manager_review');
  const sentToBand = offers.filter(o => o.status === 'sent_to_band');
  const awaitingResponse = offers.filter(o => o.all_responses_in && !o.final_response_sent);

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl('ScottManagerHome'))}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-black text-white">GIG OFFERS</h1>
            <p className="text-gray-400">AI-scanned from your emails</p>
          </div>
        </div>

        {/* Pending Manager Review */}
        {pendingOffers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-black text-white mb-4">PENDING YOUR REVIEW</h2>
            <div className="space-y-4">
              {pendingOffers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-black border-2 border-amber-500">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Offer Details */}
                        <div className="space-y-3">
                          <h3 className="text-2xl font-black text-white">{offer.venue}</h3>
                          
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="w-4 h-4 text-cyan-400" />
                            <span>{offer.city}, {offer.county}, {offer.country}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="w-4 h-4 text-green-400" />
                            <span>{new Date(offer.date).toLocaleDateString()} at {offer.time}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-300">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            <span className="font-bold">{offer.currency}{offer.fee}</span>
                            {offer.deposit_required && <span className="text-amber-400">(Deposit: {offer.currency}{offer.deposit_amount})</span>}
                          </div>

                          {offer.capacity && (
                            <div className="flex items-center gap-2 text-gray-300">
                              <Users className="w-4 h-4 text-purple-400" />
                              <span>Capacity: {offer.capacity}</span>
                            </div>
                          )}

                          {offer.promoter && (
                            <div className="text-gray-300">
                              <p className="font-bold">Promoter: {offer.promoter}</p>
                              <p className="text-sm">{offer.promoter_contact}</p>
                            </div>
                          )}

                          {offer.is_tour && (
                            <div className="bg-purple-500/20 border border-purple-500 rounded p-2">
                              <p className="text-purple-400 font-bold">TOUR DATE</p>
                              {offer.distance_to_next && (
                                <p className="text-sm text-gray-300">Next show: {offer.distance_to_next}</p>
                              )}
                            </div>
                          )}

                          {offer.notes && (
                            <div className="bg-gray-800 rounded p-3">
                              <p className="text-gray-300 text-sm">{offer.notes}</p>
                            </div>
                          )}
                        </div>

                        {/* Manager Actions */}
                        <div className="space-y-4">
                          <div>
                            <label className="text-white text-sm font-bold mb-2 block">Deadline</label>
                            <Select 
                              value={selectedOffer === offer.id ? deadlineDays : '2'} 
                              onValueChange={(v) => { setSelectedOffer(offer.id); setDeadlineDays(v); }}
                            >
                              <SelectTrigger className="bg-black border-cyan-500 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 day</SelectItem>
                                <SelectItem value="2">2 days</SelectItem>
                                <SelectItem value="3">3 days</SelectItem>
                                <SelectItem value="7">1 week</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="text-white text-sm font-bold mb-2 block">Urgency</label>
                            <Select 
                              value={selectedOffer === offer.id ? urgency : 'normal'} 
                              onValueChange={(v) => { setSelectedOffer(offer.id); setUrgency(v); }}
                            >
                              <SelectTrigger className="bg-black border-cyan-500 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                                <SelectItem value="very_urgent">Very Urgent 🔥</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Textarea
                            placeholder="Add notes for the band..."
                            value={selectedOffer === offer.id ? managerNotes : ''}
                            onChange={(e) => {
                              setSelectedOffer(offer.id);
                              setManagerNotes(e.target.value);
                            }}
                            className="bg-black border-cyan-500 text-white h-24"
                          />

                          <div className="flex gap-2">
                            <Button
                              onClick={() => {
                                setSelectedOffer(offer.id);
                                approveMutation.mutate({ 
                                  id: offer.id, 
                                  notes: managerNotes,
                                  deadline: deadlineDays,
                                  urgency,
                                  artistId: offer.artist_id,
                                  venue: offer.venue,
                                  date: offer.date
                                });
                              }}
                              className="flex-1 bg-green-600 hover:bg-green-700 gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Send to Band
                            </Button>
                            <Button
                              onClick={() => {
                                const reason = prompt('Reason for rejection?');
                                if (reason) rejectMutation.mutate({ id: offer.id, reason });
                              }}
                              variant="outline"
                              className="border-red-500 text-red-400 hover:bg-red-500/10"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ALL VOTES IN - Ready to Respond */}
        {awaitingResponse.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-black text-white mb-4">READY TO RESPOND</h2>
            <div className="space-y-4">
              {awaitingResponse.map((offer) => {
                const allYes = offer.band_responses?.every(r => r.response === 'yes');
                return (
                  <Card key={offer.id} className={`bg-black border-2 ${allYes ? 'border-green-500' : 'border-red-500'}`}>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-white font-bold text-xl">{offer.venue}</h3>
                        <p className="text-gray-400">{new Date(offer.date).toLocaleDateString()} • {offer.city}</p>
                        <p className="text-cyan-400 font-bold">{offer.currency}{offer.fee}</p>
                      </div>

                      <div className="mb-4 space-y-2">
                        <p className="text-white font-bold">Band Votes:</p>
                        {offer.band_responses?.map((r, i) => (
                          <div key={i} className="flex items-center gap-2">
                            {r.response === 'yes' ? <Check className="w-4 h-4 text-green-400" /> : <X className="w-4 h-4 text-red-400" />}
                            <span className="text-gray-300">{r.member_name}: {r.response.toUpperCase()}</span>
                            {r.notes && <span className="text-gray-500 text-sm">({r.notes})</span>}
                          </div>
                        ))}
                      </div>

                      {showResponseDraft === offer.id ? (
                        <div className="space-y-3">
                          <Textarea
                            value={responseDraft}
                            onChange={(e) => setResponseDraft(e.target.value)}
                            className="bg-black border-cyan-500 text-white h-32"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => sendResponse(offer.id)}
                              className="flex-1 bg-cyan-600 hover:bg-cyan-700 gap-2"
                            >
                              <Send className="w-4 h-4" />
                              Send Response
                            </Button>
                            <Button
                              onClick={() => setShowResponseDraft(null)}
                              variant="outline"
                              className="border-gray-500"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => generateDraft(offer.id, allYes ? 'accept' : 'reject')}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            AI Draft {allYes ? 'Acceptance' : 'Rejection'}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Sent to Band - Awaiting Response */}
        {sentToBand.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-4">AWAITING BAND RESPONSE</h2>
            <div className="space-y-4">
              {sentToBand.map((offer) => (
                <Card key={offer.id} className="bg-black border border-cyan-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-white font-bold">{offer.venue}</h3>
                        <p className="text-gray-400 text-sm">
                          {new Date(offer.date).toLocaleDateString()} • {offer.city}
                        </p>
                        {offer.urgency !== 'normal' && (
                          <div className="flex items-center gap-1 mt-1">
                            <AlertCircle className="w-4 h-4 text-red-400" />
                            <span className="text-red-400 text-xs font-bold">
                              {offer.urgency === 'very_urgent' ? 'VERY URGENT' : 'URGENT'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-cyan-400 font-bold">{offer.currency}{offer.fee}</p>
                        <p className="text-gray-400 text-sm">Sent {new Date(offer.sent_to_band_date).toLocaleDateString()}</p>
                        <div className="flex items-center gap-1 text-amber-400 text-xs mt-1">
                          <Clock className="w-3 h-3" />
                          <span>Due: {new Date(offer.response_deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    {offer.manager_notes && (
                      <div className="mt-3 bg-gray-800 rounded p-2">
                        <p className="text-gray-300 text-sm">{offer.manager_notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {offers.length === 0 && (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">No gig offers found</p>
            <p className="text-gray-500 text-sm">AI will scan your inbox for new booking offers</p>
          </div>
        )}
      </div>
    </div>
  );
}