import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle, XCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * SCOTT EMAIL DASHBOARD
 * Shows all emails forwarded to AI51
 * See what got through spam filter, what was extracted
 */

export default function ScottEmailDashboard() {
  const navigate = useNavigate();

  const { data: offers = [] } = useQuery({
    queryKey: ['scottGigOffers'],
    queryFn: () => base44.entities.ScottGigOffer.list(),
  });

  // Sort by newest first
  const sortedOffers = [...offers].sort((a, b) => 
    new Date(b.created_date) - new Date(a.created_date)
  );

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
            <h1 className="text-4xl font-black text-white">FORWARDED EMAILS</h1>
            <p className="text-gray-400">What AI51 received</p>
          </div>
        </div>

        {/* Setup Instructions */}
        <Card className="bg-cyan-500/10 border-2 border-cyan-500 mb-8">
          <CardContent className="p-6">
            <h3 className="text-white font-bold text-xl mb-3">📧 HOW TO FORWARD EMAILS</h3>
            <div className="space-y-2 text-gray-300">
              <p>1. Get a gig offer email</p>
              <p>2. Forward it to: <span className="text-cyan-400 font-bold">gigs@uf51.com</span></p>
              <p>3. AI51 reads it, filters spam, extracts details</p>
              <p>4. You approve/reject here</p>
            </div>
            <div className="mt-4 bg-amber-500/20 border border-amber-500 rounded p-3">
              <p className="text-amber-400 text-sm font-bold">⚠️ Email setup needed: SendGrid or Mailgun to receive forwards</p>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-black border-2 border-green-500">
            <CardContent className="p-4 text-center">
              <p className="text-green-400 text-3xl font-black">{offers.length}</p>
              <p className="text-gray-400 text-sm">Total Received</p>
            </CardContent>
          </Card>
          <Card className="bg-black border-2 border-amber-500">
            <CardContent className="p-4 text-center">
              <p className="text-amber-400 text-3xl font-black">
                {offers.filter(o => o.status === 'pending_manager_review').length}
              </p>
              <p className="text-gray-400 text-sm">Pending Review</p>
            </CardContent>
          </Card>
          <Card className="bg-black border-2 border-cyan-500">
            <CardContent className="p-4 text-center">
              <p className="text-cyan-400 text-3xl font-black">
                {offers.filter(o => o.status === 'confirmed').length}
              </p>
              <p className="text-gray-400 text-sm">Confirmed</p>
            </CardContent>
          </Card>
        </div>

        {/* Email Log */}
        <div className="space-y-4">
          {sortedOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-black border-2 border-gray-700 hover:border-cyan-500 transition-all">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Mail className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-white font-bold text-lg">{offer.venue}</h3>
                      </div>
                      <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">Date</p>
                          <p className="text-gray-300">{new Date(offer.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Fee</p>
                          <p className="text-green-400 font-bold">{offer.currency}{offer.fee}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">City</p>
                          <p className="text-gray-300">{offer.city || 'Not specified'}</p>
                        </div>
                      </div>
                      {offer.notes && (
                        <div className="mt-3 bg-gray-800 rounded p-2">
                          <p className="text-gray-400 text-xs">{offer.notes}</p>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      {offer.status === 'pending_manager_review' && (
                        <div className="flex items-center gap-2 text-amber-400">
                          <AlertCircle className="w-5 h-5" />
                          <span className="text-sm font-bold">Needs Review</span>
                        </div>
                      )}
                      {offer.status === 'confirmed' && (
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-bold">Confirmed</span>
                        </div>
                      )}
                      {offer.status === 'rejected_by_manager' && (
                        <div className="flex items-center gap-2 text-red-400">
                          <XCircle className="w-5 h-5" />
                          <span className="text-sm font-bold">Rejected</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-800">
                    <p className="text-gray-500 text-xs">
                      Received: {new Date(offer.created_date).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {offers.length === 0 && (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">No emails forwarded yet</p>
              <p className="text-gray-500 text-sm">Forward gig offers to gigs@uf51.com</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate(createPageUrl('ScottGigOffers'))}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            Review Pending Offers
          </Button>
        </div>
      </div>
    </div>
  );
}