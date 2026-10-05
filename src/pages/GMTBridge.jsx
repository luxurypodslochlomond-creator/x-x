import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeftRight, Plus, X, Heart, Shield, 
  Copy, Check, AlertTriangle, TrendingUp, Users, Zap
} from 'lucide-react';

export default function GMTBridgePage() {
  const [user, setUser] = useState(null);
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [listingType, setListingType] = useState('sell'); // 'sell' or 'buy'
  const [copiedId, setCopiedId] = useState(null);
  
  const [formData, setFormData] = useState({
    p51_amount: '',
    fiat_amount: '',
    currency: 'GBP',
    contact_method: 'whatsapp',
    contact_details: '',
    notes: ''
  });

  const queryClient = useQueryClient();

  // Fetch user
  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth error:', error);
      }
    };
    loadUser();
  }, []);

  // Fetch active listings
  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['p2p-listings'],
    queryFn: async () => {
      const allListings = await base44.entities.UniversalBridge.list('-created_date', 100);
      return allListings.filter(l => l.processing_status === 'pending');
    },
    refetchInterval: 10000 // refresh every 10s
  });

  // Create listing mutation
  const createListingMutation = useMutation({
    mutationFn: async (data) => {
      return await base44.entities.UniversalBridge.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['p2p-listings'] });
      setShowCreateListing(false);
      setFormData({
        p51_amount: '',
        fiat_amount: '',
        currency: 'GBP',
        contact_method: 'whatsapp',
        contact_details: '',
        notes: ''
      });
    }
  });

  // Complete trade mutation
  const completeListingMutation = useMutation({
    mutationFn: async (listingId) => {
      return await base44.entities.UniversalBridge.update(listingId, {
        processing_status: 'completed',
        completed_at: new Date().toISOString()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['p2p-listings'] });
    }
  });

  // Cancel listing mutation
  const cancelListingMutation = useMutation({
    mutationFn: async (listingId) => {
      return await base44.entities.UniversalBridge.update(listingId, {
        processing_status: 'failed'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['p2p-listings'] });
    }
  });

  const handleCreateListing = () => {
    if (!user) {
      alert('Sign in to create listing');
      return;
    }

    const bridgeType = listingType === 'sell' ? 'p51_to_fiat' : 'fiat_to_p51';
    
    createListingMutation.mutate({
      bridge_type: bridgeType,
      user_id: user.id,
      user_type: 'healer',
      p51_amount: parseFloat(formData.p51_amount),
      target_currency: formData.currency,
      fiat_amount: parseFloat(formData.fiat_amount),
      bank_details: {
        method: formData.contact_method,
        details: formData.contact_details
      },
      processing_status: 'pending',
      reference_code: `P2P-${Date.now()}`
    });
  };

  const handleCopyContact = (listingId, contactInfo) => {
    navigator.clipboard.writeText(contactInfo);
    setCopiedId(listingId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sellListings = listings.filter(l => l.bridge_type === 'p51_to_fiat');
  const buyListings = listings.filter(l => l.bridge_type === 'fiat_to_p51');

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6 flex items-center justify-center">
        <Card className="bg-black/60 border-2 border-pink-500/50 max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <Heart className="w-16 h-16 text-pink-400 mx-auto" />
            <h2 className="text-2xl font-black">Sign In Required</h2>
            <p className="text-gray-300">Connect to trade P51 with the family</p>
            <Button
              onClick={() => base44.auth.redirectToLogin(window.location.pathname)}
              className="w-full bg-pink-600 hover:bg-pink-700"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6 pb-32">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <ArrowLeftRight className="w-12 h-12 text-cyan-400" />
            <h1 className="text-5xl font-black">P2P BRIDGE</h1>
          </div>
          <p className="text-xl text-gray-300">Trade P51 directly. Zero APIs. Just love.</p>
          
          <Card className="bg-amber-900/30 border-2 border-amber-500/50 max-w-2xl mx-auto">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                <div className="text-left space-y-2 text-sm">
                  <p className="text-amber-300 font-bold">How it works:</p>
                  <ul className="text-gray-300 space-y-1 list-disc ml-4 text-xs">
                    <li>List P51 for sale OR list cash to buy P51</li>
                    <li>Someone sees your listing → contacts you directly</li>
                    <li>You arrange payment yourselves (bank transfer, PayPal, cash, whatever)</li>
                    <li>Mark trade complete when done</li>
                  </ul>
                  <p className="text-amber-400 text-xs font-bold mt-2">
                    ⚠️ Only trade with people you trust. Check their profile. Start small.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-green-900/30 border-2 border-green-500/50">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-3xl font-black text-green-400">{sellListings.length}</p>
              <p className="text-sm text-gray-400">Active Sell Orders</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-900/30 border-2 border-blue-500/50">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-3xl font-black text-blue-400">{buyListings.length}</p>
              <p className="text-sm text-gray-400">Active Buy Orders</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/30 border-2 border-purple-500/50">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-3xl font-black text-purple-400">{listings.length}</p>
              <p className="text-sm text-gray-400">Total Active</p>
            </CardContent>
          </Card>
        </div>

        {/* CREATE LISTING BUTTON */}
        <div className="text-center">
          <Button
            onClick={() => setShowCreateListing(true)}
            className="bg-pink-600 hover:bg-pink-700 text-xl py-6 px-8"
          >
            <Plus className="w-6 h-6 mr-2" />
            Create Listing
          </Button>
        </div>

        {/* LISTINGS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* SELL ORDERS */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-green-400 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Selling P51 ({sellListings.length})
            </h2>
            
            {sellListings.length === 0 ? (
              <Card className="bg-black/40 border-2 border-gray-700">
                <CardContent className="p-8 text-center text-gray-500">
                  No active sell orders
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {sellListings.map(listing => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="bg-green-900/20 border-2 border-green-500/50 hover:border-green-500 transition-all">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-black text-green-400">
                              {listing.p51_amount} P51
                            </p>
                            <p className="text-xl text-white">
                              → £{listing.fiat_amount}
                            </p>
                            <p className="text-xs text-gray-400">
                              £{(listing.fiat_amount / listing.p51_amount).toFixed(2)} per P51
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400">Listed by</p>
                            <p className="text-sm font-bold text-white">{listing.created_by}</p>
                          </div>
                        </div>

                        <div className="bg-black/40 rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Contact via:</span>
                            <span className="text-sm font-bold text-cyan-400">
                              {listing.bank_details?.method || 'N/A'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-mono text-gray-300 flex-1 truncate">
                              {listing.bank_details?.details || 'N/A'}
                            </p>
                            <Button
                              onClick={() => handleCopyContact(listing.id, listing.bank_details?.details)}
                              size="sm"
                              variant="outline"
                              className="flex-shrink-0"
                            >
                              {copiedId === listing.id ? (
                                <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {listing.created_by === user?.email && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => completeListingMutation.mutate(listing.id)}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-xs"
                              disabled={completeListingMutation.isPending}
                            >
                              Mark Complete
                            </Button>
                            <Button
                              onClick={() => cancelListingMutation.mutate(listing.id)}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-xs"
                              disabled={cancelListingMutation.isPending}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}

                        <p className="text-xs text-gray-500">
                          Listed {new Date(listing.created_date).toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* BUY ORDERS */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-blue-400 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Buying P51 ({buyListings.length})
            </h2>
            
            {buyListings.length === 0 ? (
              <Card className="bg-black/40 border-2 border-gray-700">
                <CardContent className="p-8 text-center text-gray-500">
                  No active buy orders
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {buyListings.map(listing => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="bg-blue-900/20 border-2 border-blue-500/50 hover:border-blue-500 transition-all">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-black text-blue-400">
                              £{listing.fiat_amount}
                            </p>
                            <p className="text-xl text-white">
                              → {listing.p51_amount} P51
                            </p>
                            <p className="text-xs text-gray-400">
                              £{(listing.fiat_amount / listing.p51_amount).toFixed(2)} per P51
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400">Listed by</p>
                            <p className="text-sm font-bold text-white">{listing.created_by}</p>
                          </div>
                        </div>

                        <div className="bg-black/40 rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">Contact via:</span>
                            <span className="text-sm font-bold text-cyan-400">
                              {listing.bank_details?.method || 'N/A'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-mono text-gray-300 flex-1 truncate">
                              {listing.bank_details?.details || 'N/A'}
                            </p>
                            <Button
                              onClick={() => handleCopyContact(listing.id, listing.bank_details?.details)}
                              size="sm"
                              variant="outline"
                              className="flex-shrink-0"
                            >
                              {copiedId === listing.id ? (
                                <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {listing.created_by === user?.email && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => completeListingMutation.mutate(listing.id)}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-xs"
                              disabled={completeListingMutation.isPending}
                            >
                              Mark Complete
                            </Button>
                            <Button
                              onClick={() => cancelListingMutation.mutate(listing.id)}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-xs"
                              disabled={cancelListingMutation.isPending}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}

                        <p className="text-xs text-gray-500">
                          Listed {new Date(listing.created_date).toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* CREATE LISTING MODAL */}
      <AnimatePresence>
        {showCreateListing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowCreateListing(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-purple-900 to-pink-900 border-2 border-pink-500 rounded-xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-white">Create Listing</h2>
                <button
                  onClick={() => setShowCreateListing(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                
                {/* TYPE SELECTOR */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => setListingType('sell')}
                    className={`py-8 ${
                      listingType === 'sell'
                        ? 'bg-green-600 border-2 border-green-400'
                        : 'bg-black/40 border-2 border-gray-700'
                    }`}
                  >
                    <div>
                      <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-bold">SELL P51</p>
                      <p className="text-xs text-gray-300">I have P51, need cash</p>
                    </div>
                  </Button>
                  <Button
                    onClick={() => setListingType('buy')}
                    className={`py-8 ${
                      listingType === 'buy'
                        ? 'bg-blue-600 border-2 border-blue-400'
                        : 'bg-black/40 border-2 border-gray-700'
                    }`}
                  >
                    <div>
                      <Users className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-bold">BUY P51</p>
                      <p className="text-xs text-gray-300">I have cash, need P51</p>
                    </div>
                  </Button>
                </div>

                {/* AMOUNTS */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      P51 Amount
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.p51_amount}
                      onChange={(e) => setFormData({...formData, p51_amount: e.target.value})}
                      placeholder="100"
                      className="bg-black/40 border-pink-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      Cash Amount (£)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.fiat_amount}
                      onChange={(e) => setFormData({...formData, fiat_amount: e.target.value})}
                      placeholder="50"
                      className="bg-black/40 border-pink-500/50"
                    />
                  </div>
                </div>

                {formData.p51_amount && formData.fiat_amount && (
                  <p className="text-sm text-cyan-400 font-mono">
                    Rate: £{(parseFloat(formData.fiat_amount) / parseFloat(formData.p51_amount)).toFixed(2)} per P51
                  </p>
                )}

                {/* CONTACT METHOD */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">
                    How should buyers contact you?
                  </label>
                  <select
                    value={formData.contact_method}
                    onChange={(e) => setFormData({...formData, contact_method: e.target.value})}
                    className="w-full bg-black/40 border border-pink-500/50 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="telegram">Telegram</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>

                {/* CONTACT DETAILS */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">
                    {formData.contact_method === 'whatsapp' && 'WhatsApp Number (with country code)'}
                    {formData.contact_method === 'telegram' && 'Telegram Username'}
                    {formData.contact_method === 'email' && 'Email Address'}
                    {formData.contact_method === 'phone' && 'Phone Number'}
                  </label>
                  <Input
                    value={formData.contact_details}
                    onChange={(e) => setFormData({...formData, contact_details: e.target.value})}
                    placeholder={
                      formData.contact_method === 'whatsapp' ? '+44...' :
                      formData.contact_method === 'telegram' ? '@username' :
                      formData.contact_method === 'email' ? 'your@email.com' :
                      '+44...'
                    }
                    className="bg-black/40 border-pink-500/50"
                  />
                </div>

                {/* NOTES */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">
                    Notes (optional)
                  </label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Payment methods accepted, location, etc..."
                    className="bg-black/40 border-pink-500/50"
                    rows={3}
                  />
                </div>

                {/* WARNING */}
                <Card className="bg-amber-900/30 border-2 border-amber-500/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                      <div className="text-xs text-gray-300 space-y-1">
                        <p className="font-bold text-amber-400">Safety First:</p>
                        <ul className="list-disc ml-4 space-y-1">
                          <li>Only trade with trusted people</li>
                          <li>Start with small amounts</li>
                          <li>Use traceable payment methods</li>
                          <li>Never send money first to strangers</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SUBMIT */}
                <Button
                  onClick={handleCreateListing}
                  disabled={
                    !formData.p51_amount ||
                    !formData.fiat_amount ||
                    !formData.contact_details ||
                    createListingMutation.isPending
                  }
                  className="w-full bg-pink-600 hover:bg-pink-700 py-6 text-lg font-black"
                >
                  {createListingMutation.isPending ? 'Creating...' : 'Create Listing'}
                </Button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}