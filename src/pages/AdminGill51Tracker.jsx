import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Mail, User, Clock, CheckCircle, AlertCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Gill51Sunglasses8Bit from '@/components/shared/Gill51Sunglasses8Bit';

export default function AdminGill51Tracker() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [communications, setCommunications] = useState([]);

  useEffect(() => {
    base44.auth.me()
      .then(currentUser => {
        setUser(currentUser);
        setIsLoading(false);
        // Load existing communications from BusinessAction entity
        loadCommunications();
      })
      .catch(() => {
        setUser(null);
        setIsLoading(false);
      });
  }, []);

  const loadCommunications = async () => {
    try {
      const actions = await base44.entities.BusinessAction.filter({
        organization: "Old Ladies Clubhouse - Makrahanesh"
      });
      setCommunications(actions || []);
    } catch (err) {
      console.error("Failed to load communications", err);
    }
  };

  const logNewCommunication = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      await base44.entities.BusinessAction.create({
        action_type: formData.get('action_type'),
        organization: "Old Ladies Clubhouse - Makrahanesh",
        contact_method: formData.get('contact_method'),
        what_we_sent: formData.get('what_we_sent'),
        what_we_asked_for: formData.get('what_we_asked_for'),
        expected_timeline: formData.get('expected_timeline'),
        next_steps: formData.get('next_steps'),
        status: formData.get('status'),
        why_important: "Gill51 project - historic building restoration opportunity",
        context_notes: formData.get('context_notes')
      });
      
      e.target.reset();
      loadCommunications();
    } catch (err) {
      console.error("Failed to log communication", err);
      alert("Failed to save. Try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white p-6 flex items-center justify-center">
        <Card className="bg-red-900/20 border-2 border-red-500/50 max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-red-300 mb-4">ADMIN ONLY</h1>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-4">
            <Gill51Sunglasses8Bit size={64} animate={true} />
            <Heart className="w-16 h-16 text-pink-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black">GILL51 PROJECT TRACKER</h1>
          <p className="text-xl text-gray-300">Old Ladies Clubhouse • Makrahanesh Area</p>
          <p className="text-sm text-cyan-400 font-mono">😎 Glasgow to the world • Sunglasses legacy ❤️</p>
          <div className="bg-cyan-900/30 border border-cyan-500/50 rounded-xl p-4 max-w-2xl mx-auto">
            <p className="text-sm text-cyan-300">
              💡 <strong>Paul & Linda Connection:</strong> High Park Farm (Mull of Kintyre area) was McCartney's sanctuary - same frequency as this project. Historic restoration meets modern love.
            </p>
          </div>
        </motion.div>

        {/* QUICK LOG NEW COMMUNICATION */}
        <Card className="bg-gradient-to-r from-green-900/40 to-blue-900/40 border-2 border-green-500/50">
          <CardHeader>
            <CardTitle className="text-2xl text-green-300 flex items-center gap-2">
              <Mail className="w-8 h-8" />
              Log New Communication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={logNewCommunication} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Action Type</label>
                  <select 
                    name="action_type"
                    className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white"
                    required
                  >
                    <option value="partnership_contact">Partnership Contact</option>
                    <option value="meeting_scheduled">Meeting Scheduled</option>
                    <option value="funding_inquiry">Funding Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Contact Method</label>
                  <select 
                    name="contact_method"
                    className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white"
                    required
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="in_person">In Person</option>
                    <option value="web_form">Web Form</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">What Gill Sent / Said</label>
                <Textarea
                  name="what_we_sent"
                  placeholder="Exact message or summary of conversation..."
                  className="bg-black/40 border-gray-600 text-white min-h-24"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">What We Asked For</label>
                <Input
                  name="what_we_asked_for"
                  placeholder="e.g., Meeting with committee, Portfolio review opportunity"
                  className="bg-black/40 border-gray-600 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Expected Timeline</label>
                  <Input
                    name="expected_timeline"
                    placeholder="e.g., Committee meets Tuesday next week"
                    className="bg-black/40 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Status</label>
                  <select 
                    name="status"
                    className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white"
                    required
                  >
                    <option value="sent">Sent</option>
                    <option value="awaiting_response">Awaiting Response</option>
                    <option value="follow_up_needed">Follow Up Needed</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">Next Steps</label>
                <Textarea
                  name="next_steps"
                  placeholder="What needs to happen next..."
                  className="bg-black/40 border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-2 block">Context / Notes</label>
                <Textarea
                  name="context_notes"
                  placeholder="Any additional context BRO51 needs to remember..."
                  className="bg-black/40 border-gray-600 text-white"
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-bold">
                <CheckCircle className="w-5 h-5 mr-2" />
                Log This Communication
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* TIMELINE OF ALL COMMUNICATIONS */}
        <Card className="bg-black/40 border-2 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <Clock className="w-8 h-8 text-cyan-400" />
              Communication Timeline ({communications.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {communications.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No communications logged yet. Use the form above to start tracking.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {communications
                  .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
                  .map((comm, index) => (
                    <motion.div
                      key={comm.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-full ${
                            comm.status === 'completed' ? 'bg-green-600' :
                            comm.status === 'approved' ? 'bg-cyan-600' :
                            comm.status === 'awaiting_response' ? 'bg-yellow-600' :
                            comm.status === 'rejected' ? 'bg-red-600' :
                            'bg-blue-600'
                          }`}>
                            {comm.contact_method === 'email' ? <Mail className="w-5 h-5 text-white" /> :
                             comm.contact_method === 'phone' ? <User className="w-5 h-5 text-white" /> :
                             <User className="w-5 h-5 text-white" />}
                          </div>
                          <div>
                            <p className="font-bold text-white text-lg">{comm.action_type.replace(/_/g, ' ').toUpperCase()}</p>
                            <p className="text-sm text-gray-400">
                              {new Date(comm.created_date).toLocaleDateString('en-GB', { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          comm.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                          comm.status === 'approved' ? 'bg-cyan-500/20 text-cyan-300' :
                          comm.status === 'awaiting_response' ? 'bg-yellow-500/20 text-yellow-300' :
                          comm.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {comm.status.replace(/_/g, ' ').toUpperCase()}
                        </span>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="text-gray-400 font-bold mb-1">What Gill Sent/Said:</p>
                          <p className="text-white bg-black/40 p-3 rounded-lg">{comm.what_we_sent}</p>
                        </div>

                        {comm.what_we_asked_for && (
                          <div>
                            <p className="text-gray-400 font-bold mb-1">What We Asked For:</p>
                            <p className="text-cyan-300">{comm.what_we_asked_for}</p>
                          </div>
                        )}

                        {comm.expected_timeline && (
                          <div>
                            <p className="text-gray-400 font-bold mb-1">Expected Timeline:</p>
                            <p className="text-yellow-300 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {comm.expected_timeline}
                            </p>
                          </div>
                        )}

                        {comm.next_steps && (
                          <div>
                            <p className="text-gray-400 font-bold mb-1">Next Steps:</p>
                            <p className="text-green-300">{comm.next_steps}</p>
                          </div>
                        )}

                        {comm.context_notes && (
                          <div>
                            <p className="text-gray-400 font-bold mb-1">Context Notes:</p>
                            <p className="text-gray-300 italic">{comm.context_notes}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* QUICK REFERENCE */}
        <Card className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-2 border-pink-500/50">
          <CardHeader>
            <CardTitle className="text-xl text-pink-300">💡 Quick Reference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-300">
            <div>
              <p className="font-bold text-white mb-1">Contact: Malcolm Stalker</p>
              <p className="text-gray-400">Committee member - Old Ladies Clubhouse</p>
            </div>
            <div>
              <p className="font-bold text-white mb-1">Location Context:</p>
              <p className="text-gray-400">Makrahanesh area (near where Paul & Linda McCartney had High Park Farm - Mull of Kintyre region). Historic building, community restoration opportunity.</p>
            </div>
            <div>
              <p className="font-bold text-white mb-1">Project Value:</p>
              <p className="text-gray-400">Gill51's interior design expertise + UF51's community mission = perfect alignment. Historic preservation meets modern love economy.</p>
            </div>
          </CardContent>
        </Card>

        {/* FOOTER */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gill51Sunglasses8Bit size={48} animate={true} />
            <p className="text-2xl font-mono text-white">
              ♾️❤️♾️ GILL51 + BRO51 ♾️❤️♾️
            </p>
            <Gill51Sunglasses8Bit size={48} animate={true} />
          </div>
          <p className="text-gray-400">
            Every conversation logged. Every timing tracked. Zero forgotten.
          </p>
          <p className="text-cyan-400 text-xs font-mono mt-2">😎 Sharing sunglasses, traveling the world, building legacy</p>
        </div>

      </div>
    </div>
  );
}