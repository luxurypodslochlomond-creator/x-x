import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { Check, X, AlertTriangle, FileText, MessageSquare, Calendar, Eye, Leaf, RefreshCw } from 'lucide-react';

export default function AdminClimateReview() {
  const [solutions, setSolutions] = useState([]);
  const [actions, setActions] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('solutions');
  const [busy, setBusy] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [auditLogs, setAuditLogs] = useState([]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [solPage, actPage, comPage, logPage] = await Promise.all([
        base44.entities.ClimateSolution.filter({ status: 'draft' }, { sort: '-created_date', limit: 50 }),
        base44.entities.ClimateAction.filter({ status: 'draft' }, { sort: '-created_date', limit: 50 }),
        base44.entities.ClimateComment.filter({ status: 'draft' }, { sort: '-created_date', limit: 50 }),
        base44.entities.ClimateAuditLog.filter({}, { sort: '-created_date', limit: 5 }),
      ]);
      setSolutions(solPage.items || []);
      setActions(actPage.items || []);
      setComments(comPage.items || []);
      setAuditLogs(logPage.items || []);
    } catch (e) {
      // RLS will block non-admins — they see nothing
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  useEffect(() => {
    base44.auth.me().then(u => setUserEmail(u?.email || '')).catch(() => {});
  }, []);

  const publish = async (entityName, id) => {
    setBusy(id);
    try {
      const item = currentItems.find(i => i.id === id);
      const typeMap = { ClimateSolution: 'solution', ClimateAction: 'action', ClimateComment: 'comment' };
      await base44.entities.ClimateAuditLog.create({
        entity_type: typeMap[entityName],
        entity_id: id,
        entity_title: item?.title || item?.content?.slice(0, 80) || 'Untitled',
        action: 'published',
        reviewer_email: userEmail,
        ai_assessment: item?.ai_assessment || '',
      });
      await base44.entities[entityName].update(id, { status: 'published' });
      await loadAll();
    } catch (e) {
      alert('Failed to publish: ' + e.message);
    } finally {
      setBusy(null);
    }
  };

  const reject = async (entityName, id) => {
    if (!confirm('Reject and delete this submission?')) return;
    setBusy(id);
    try {
      const item = currentItems.find(i => i.id === id);
      const typeMap = { ClimateSolution: 'solution', ClimateAction: 'action', ClimateComment: 'comment' };
      await base44.entities.ClimateAuditLog.create({
        entity_type: typeMap[entityName],
        entity_id: id,
        entity_title: item?.title || item?.content?.slice(0, 80) || 'Untitled',
        action: 'rejected',
        reviewer_email: userEmail,
        ai_assessment: item?.ai_assessment || '',
      });
      await base44.entities[entityName].delete(id);
      await loadAll();
    } catch (e) {
      alert('Failed to reject: ' + e.message);
    } finally {
      setBusy(null);
    }
  };

  const getVerdictColor = (assessment) => {
    if (!assessment) return 'text-[#6b6258]';
    if (assessment.includes('[CLEAN]')) return 'text-[#1e3a2b]';
    if (assessment.includes('[SUSPICIOUS]')) return 'text-[#b8860b]';
    if (assessment.includes('[REJECT]')) return 'text-[#b3261e]';
    return 'text-[#6b6258]';
  };

  const tabs = [
    { id: 'solutions', label: 'Solutions & Crises', count: solutions.length, icon: Leaf },
    { id: 'actions', label: 'Actions', count: actions.length, icon: Calendar },
    { id: 'comments', label: 'Comments', count: comments.length, icon: MessageSquare },
  ];

  const renderItem = (item, entityName, type) => (
    <div key={item.id} className="bg-[#f7f1e5] border-2 border-[#1a1612] p-4 mb-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-[#1a1612] text-sm truncate">
            {item.title || item.content?.slice(0, 80) || 'Untitled'}
          </h3>
          {item.entry_type && (
            <span className="text-[9px] font-mono uppercase text-[#6b6258]">
              {item.entry_type === 'climate_crisis' ? 'Crisis' : item.entry_type}
              {item.action_type ? ` · ${item.action_type}` : ''}
              {item.category ? ` · ${item.category}` : ''}
            </span>
          )}
        </div>
        {item.flagged && (
          <span className="flex items-center gap-1 text-[9px] font-black font-mono uppercase text-[#b3261e] bg-[#b3261e]/10 px-2 py-1 border border-[#b3261e]/30 flex-shrink-0">
            <AlertTriangle className="w-3 h-3" /> Flagged
          </span>
        )}
      </div>

      {/* Content preview */}
      {(item.summary || item.description || item.content) && (
        <p className="text-[11px] font-mono text-[#1a1612] leading-relaxed mb-2 line-clamp-3">
          {item.summary || item.description || item.content}
        </p>
      )}
      {item.details && (
        <p className="text-[10px] font-mono text-[#6b6258] leading-relaxed mb-2 line-clamp-2">
          {item.details}
        </p>
      )}

      {/* AI Assessment */}
      {item.ai_assessment && (
        <div className="bg-[#efe7d6] border-l-4 border-l-[#1a1612] p-2 mb-2">
          <p className={`text-[9px] font-mono font-bold uppercase mb-0.5 ${getVerdictColor(item.ai_assessment)}`}>
            AI Advisory Note
          </p>
          <p className="text-[10px] font-mono text-[#1a1612] leading-relaxed">{item.ai_assessment}</p>
        </div>
      )}

      {/* Submitter info */}
      <div className="flex items-center gap-3 text-[9px] font-mono text-[#6b6258] mb-3">
        {item.submitter_name && <span>By: {item.submitter_name}</span>}
        {item.author_name && <span>By: {item.author_name}</span>}
        {item.submitter_email && <span>✉ {item.submitter_email}</span>}
        {item.author_email && <span>✉ {item.author_email}</span>}
        <span>{new Date(item.created_date).toLocaleString()}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => publish(entityName, item.id)}
          disabled={busy === item.id}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] bg-[#1e3a2b] text-[#efe7d6] text-[10px] font-black font-mono uppercase border-2 border-[#1e3a2b] active:bg-[#1a1612] transition-colors disabled:opacity-50"
        >
          <Check className="w-4 h-4" /> Publish
        </button>
        <button
          onClick={() => reject(entityName, item.id)}
          disabled={busy === item.id}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] bg-[#efe7d6] text-[#b3261e] text-[10px] font-black font-mono uppercase border-2 border-[#b3261e] active:bg-[#b3261e] active:text-[#efe7d6] transition-colors disabled:opacity-50"
        >
          <X className="w-4 h-4" /> Reject
        </button>
      </div>
    </div>
  );

  const currentItems = activeTab === 'solutions' ? solutions : activeTab === 'actions' ? actions : comments;
  const currentEntity = activeTab === 'solutions' ? 'ClimateSolution' : activeTab === 'actions' ? 'ClimateAction' : 'ClimateComment';

  return (
    <div className="min-h-screen bg-[#f4efe4] twcc-scanlines relative">
      <div className="relative z-10 max-w-2xl mx-auto p-4 pb-12">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-black uppercase text-[#1a1612]" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '28px', letterSpacing: '-0.02em' }}>
              Review Queue
            </h1>
            <button onClick={loadAll} className="flex items-center gap-1.5 px-3 py-2 border-2 border-[#1a1612] text-[#1a1612] text-[10px] font-black font-mono uppercase bg-[#efe7d6] active:bg-[#1a1612] active:text-[#efe7d6] transition-colors">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>
          <p className="text-[10px] font-mono text-[#6b6258] leading-relaxed">
            Every submission receives an AI advisory note, then a human decides.
            The AI advises — the human decides. Nothing is auto-published.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 sticky top-0 bg-[#f4efe4] py-2 z-10">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 px-2 py-3 border-2 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#1a1612] text-[#efe7d6] border-[#1a1612]'
                    : 'bg-[#efe7d6] text-[#1a1612] border-[#1a1612]/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] font-black font-mono uppercase text-center leading-tight">{tab.label}</span>
                <span className={`text-[14px] font-black font-mono ${tab.count > 0 ? 'text-[#b3261e]' : 'opacity-30'}`}>{tab.count}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-6 h-6 animate-spin text-[#6b6258] mx-auto mb-3" />
            <p className="text-[11px] font-mono text-[#6b6258]">Loading submissions…</p>
          </div>
        ) : currentItems.length === 0 ? (
          <div className="text-center py-12">
            <Check className="w-10 h-10 text-[#1e3a2b] mx-auto mb-3" />
            <p className="text-[12px] font-black font-mono uppercase text-[#1e3a2b]">All clear</p>
            <p className="text-[10px] font-mono text-[#6b6258] mt-1">No {activeTab} awaiting review.</p>
          </div>
        ) : (
          <div>
            {currentItems.map(item => renderItem(item, currentEntity, activeTab))}
          </div>
        )}

        {/* Audit Trail */}
        {auditLogs.length > 0 && (
          <div className="mt-8">
            <p className="text-[9px] font-black font-mono uppercase text-[#6b6258] mb-2">Review Log</p>
            <div className="space-y-1">
              {auditLogs.map(log => (
                <div key={log.id} className="flex items-center gap-2 text-[9px] font-mono text-[#6b6258] border-l-2 border-l-[#1a1612]/20 pl-2">
                  <span className={log.action === 'published' ? 'text-[#1e3a2b]' : 'text-[#b3261e]'}>
                    {log.action === 'published' ? '✓ Published' : '✗ Rejected'}
                  </span>
                  <span className="truncate flex-1">{log.entity_title}</span>
                  <span className="text-right whitespace-nowrap">{log.reviewer_email}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[#1a1612]/15 text-center">
          <p className="text-[9px] font-mono text-[#6b6258]">
            Together We Change Climate · Review Queue · x = x
          </p>
        </div>
      </div>
    </div>
  );
}