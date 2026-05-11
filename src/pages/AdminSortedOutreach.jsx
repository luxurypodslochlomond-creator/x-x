import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function AdminSortedOutreach() {
  const [outreaches, setOutreaches] = useState([]);
  const [newOutreach, setNewOutreach] = useState({
    organization: '',
    contact_email: '',
    region: 'UK',
    status: 'sent',
    date_sent: new Date().toISOString().split('T')[0],
    next_steps: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOutreaches();
  }, []);

  const loadOutreaches = async () => {
    try {
      const data = await base44.entities.BusinessAction.list();
      const sorted = data.filter(a => a.organization && a.what_we_sent?.includes('SORTED'));
      setOutreaches(sorted);
    } catch (error) {
      console.error('Error loading outreach data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addOutreach = async () => {
    if (!newOutreach.organization || !newOutreach.contact_email) {
      alert('Organization and email required');
      return;
    }

    try {
      await base44.entities.BusinessAction.create({
        action_type: 'partnership_contact',
        organization: newOutreach.organization,
        contact_method: 'email',
        what_we_sent: `SORTED Partnership Outreach - ${newOutreach.region}`,
        what_we_asked_for: 'Partnership integration / pilot program',
        expected_timeline: '2-4 weeks',
        next_steps: newOutreach.next_steps || 'Await response',
        status: newOutreach.status,
        why_important: 'B2B partnership for legal document clarity tool'
      });

      setNewOutreach({
        organization: '',
        contact_email: '',
        region: 'UK',
        status: 'sent',
        date_sent: new Date().toISOString().split('T')[0],
        next_steps: ''
      });

      loadOutreaches();
    } catch (error) {
      console.error('Error adding outreach:', error);
      alert('Failed to add outreach');
    }
  };

  const statusIcon = (status) => {
    switch(status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'awaiting_response':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'sent':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-cyan-400 mb-8">SORTED Outreach Tracker</h1>

        {/* ADD NEW */}
        <div className="bg-[#0f1419] border-2 border-cyan-500/30 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">📬 Add Outreach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Organization name"
              value={newOutreach.organization}
              onChange={(e) => setNewOutreach({...newOutreach, organization: e.target.value})}
              className="bg-black border border-cyan-500/50 rounded px-4 py-2 text-white placeholder-gray-500"
            />
            <input
              type="email"
              placeholder="Contact email"
              value={newOutreach.contact_email}
              onChange={(e) => setNewOutreach({...newOutreach, contact_email: e.target.value})}
              className="bg-black border border-cyan-500/50 rounded px-4 py-2 text-white placeholder-gray-500"
            />
            <select
              value={newOutreach.region}
              onChange={(e) => setNewOutreach({...newOutreach, region: e.target.value})}
              className="bg-black border border-cyan-500/50 rounded px-4 py-2 text-white"
            >
              <option value="UK">🇬🇧 UK</option>
              <option value="USA">🇺🇸 USA</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="Australia">🇦🇺 Australia</option>
              <option value="Global">🌍 Global</option>
            </select>
            <select
              value={newOutreach.status}
              onChange={(e) => setNewOutreach({...newOutreach, status: e.target.value})}
              className="bg-black border border-cyan-500/50 rounded px-4 py-2 text-white"
            >
              <option value="sent">Sent</option>
              <option value="awaiting_response">Awaiting Response</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <textarea
              placeholder="Next steps / notes"
              value={newOutreach.next_steps}
              onChange={(e) => setNewOutreach({...newOutreach, next_steps: e.target.value})}
              className="bg-black border border-cyan-500/50 rounded px-4 py-2 text-white placeholder-gray-500 md:col-span-2"
              rows="2"
            />
          </div>
          <button
            onClick={addOutreach}
            className="mt-4 flex items-center gap-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" /> Add Outreach
          </button>
        </div>

        {/* TRACKER TABLE */}
        <div className="bg-[#0f1419] border-2 border-cyan-500/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cyan-500/10 border-b border-cyan-500/30">
                <tr>
                  <th className="px-6 py-3 text-left text-cyan-400 font-bold">Organization</th>
                  <th className="px-6 py-3 text-left text-cyan-400 font-bold">Email</th>
                  <th className="px-6 py-3 text-left text-cyan-400 font-bold">Region</th>
                  <th className="px-6 py-3 text-left text-cyan-400 font-bold">Status</th>
                  <th className="px-6 py-3 text-left text-cyan-400 font-bold">Next Steps</th>
                  <th className="px-6 py-3 text-left text-cyan-400 font-bold">Date</th>
                </tr>
              </thead>
              <tbody>
                {outreaches.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No outreaches tracked yet. Add one above! 👆
                    </td>
                  </tr>
                ) : (
                  outreaches.map((item, idx) => (
                    <tr key={idx} className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                      <td className="px-6 py-4 text-white font-bold">{item.organization}</td>
                      <td className="px-6 py-4 text-gray-400 text-xs">{item.contact_method === 'email' ? '📧' : ''}</td>
                      <td className="px-6 py-4 text-cyan-400">{item.what_we_sent?.split('-')[1]?.trim() || 'UK'}</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        {statusIcon(item.status)}
                        <span className="text-white capitalize">{item.status?.replace('_', ' ')}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 max-w-xs truncate">{item.next_steps}</td>
                      <td className="px-6 py-4 text-gray-500 text-xs">{item.created_date?.split('T')[0]}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Total Sent</p>
            <p className="text-3xl font-black text-cyan-400">{outreaches.filter(o => o.status === 'sent').length}</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Awaiting Reply</p>
            <p className="text-3xl font-black text-amber-400">{outreaches.filter(o => o.status === 'awaiting_response').length}</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Approved</p>
            <p className="text-3xl font-black text-green-400">{outreaches.filter(o => o.status === 'approved').length}</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Rejected</p>
            <p className="text-3xl font-black text-red-400">{outreaches.filter(o => o.status === 'rejected').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}