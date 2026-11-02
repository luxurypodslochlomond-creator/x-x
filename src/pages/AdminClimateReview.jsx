import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Check, X, AlertTriangle, FileText, MessageSquare, Calendar, Eye, Leaf, RefreshCw, Globe, Tag, Music, Play } from 'lucide-react';
import ProvenanceSweep from '@/components/admin/ProvenanceSweep';
import PictureCreditSweep from '@/components/admin/PictureCreditSweep';
import SourceLinkRow from '@/components/admin/SourceLinkRow';
import ListenerLinesPanel from '@/components/admin/ListenerLinesPanel';
import SignUnsignedEntries from '@/components/admin/SignUnsignedEntries';
import RecordExportPanel from '@/components/admin/RecordExportPanel';
import ArchiveSourcesPanel from '@/components/admin/ArchiveSourcesPanel';
import CheckerNotes from '@/components/admin/CheckerNotes';

// A queue nobody works is a queue that lies. The date alone is easy to walk past, so each
// entry says how long it has been waiting and shouts once it has waited a week. The record's
// promise is that a person decides — this is how that stays true instead of becoming a
// sentence on a method page.
const waitedDays = (created) => {
  const ms = Date.now() - new Date(created).getTime();
  if (!Number.isFinite(ms) || ms < 0) return null;
  return Math.floor(ms / 86400000);
};

export default function AdminClimateReview() {
  const [solutions, setSolutions] = useState([]);
  const [actions, setActions] = useState([]);
  const [comments, setComments] = useState([]);
  const [news, setNews] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('solutions');
  const [busy, setBusy] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [auditLogs, setAuditLogs] = useState([]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [solPage, actPage, comPage, newsPage, grpPage, trkPage, logPage] = await Promise.all([
        base44.entities.ClimateSolution.filter({ status: 'draft' }, { sort: '-created_date', limit: 50 }),
        base44.entities.ClimateAction.filter({ status: 'draft' }, { sort: '-created_date', limit: 50 }),
        base44.entities.ClimateComment.filter({ status: 'draft' }, { sort: '-created_date', limit: 50 }),
        base44.entities.ClimateNews.filter({ status: 'draft' }, { sort: '-created_date', limit: 50 }),
        base44.entities.ClimateGroup.filter({ status: 'draft' }, { sort: '-created_date', limit: 50 }),
        base44.entities.ClimateTrack.filter({ status: 'draft' }, { sort: '-created_date', limit: 50 }),
        base44.entities.ClimateAuditLog.filter({}, { sort: '-created_date', limit: 5 }),
      ]);
      setSolutions(solPage.items || []);
      setActions(actPage.items || []);
      setComments(comPage.items || []);
      setNews(newsPage.items || []);
      setGroups(grpPage.items || []);
      setTracks(trkPage.items || []);
      setAuditLogs(logPage.items || []);
    } catch (e) {
      // RLS will block non-admins — they see nothing
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  useEffect(() => {
    base44.auth.me().then(u => {
      setUserEmail(u?.email || '');
      setUserName((u?.full_name || '').trim() || u?.email || '');
    }).catch(() => {});
  }, []);

  // A published entry carries the name of the person who signed it onto the record.
  // Without this, publishing leaves the entry unsigned and the record has to say so.
  const SIGNED_ENTITIES = ['ClimateSolution', 'ClimateAction', 'ClimateNews'];
  const signPatch = (entityName) => (SIGNED_ENTITIES.includes(entityName) && userName ? { editor: userName } : {});

  const publish = async (entityName, id) => {
    setBusy(id);
    try {
      const item = currentItems.find(i => i.id === id);
      const typeMap = { ClimateSolution: 'solution', ClimateAction: 'action', ClimateComment: 'comment', ClimateNews: 'news', ClimateGroup: 'group', ClimateTrack: 'track' };
      await base44.entities.ClimateAuditLog.create({
        entity_type: typeMap[entityName],
        entity_id: id,
        entity_title: item?.title || item?.headline || item?.name || item?.content?.slice(0, 80) || 'Untitled',
        action: 'published',
        reviewer_email: userEmail,
        ai_assessment: item?.ai_assessment || '',
      });
      await base44.entities[entityName].update(id, { status: 'published', ...signPatch(entityName) });
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
      const typeMap = { ClimateSolution: 'solution', ClimateAction: 'action', ClimateComment: 'comment', ClimateNews: 'news', ClimateGroup: 'group', ClimateTrack: 'track' };
      await base44.entities.ClimateAuditLog.create({
        entity_type: typeMap[entityName],
        entity_id: id,
        entity_title: item?.title || item?.headline || item?.name || item?.content?.slice(0, 80) || 'Untitled',
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

  const publishAllClean = async () => {
    const allItems = [
      ...solutions.map(i => ({ ...i, _entity: 'ClimateSolution' })),
      ...actions.map(i => ({ ...i, _entity: 'ClimateAction' })),
      ...comments.map(i => ({ ...i, _entity: 'ClimateComment' })),
      ...news.map(i => ({ ...i, _entity: 'ClimateNews' })),
      ...groups.map(i => ({ ...i, _entity: 'ClimateGroup' })),
      ...tracks.map(i => ({ ...i, _entity: 'ClimateTrack' })),
    ];
    const cleanItems = allItems.filter(i => i.ai_assessment && i.ai_assessment.includes('[CLEAN]'));
    if (cleanItems.length === 0) {
      alert('No [CLEAN] submissions to bulk publish. All clean items are already published.');
      return;
    }
    if (!confirm(`Publish ${cleanItems.length} submission(s) marked [CLEAN] by the AI advisory note?\n\nThis saves time when the queue is long. You can still review each one individually.`)) return;
    setBusy('bulk');
    try {
      const typeMap = { ClimateSolution: 'solution', ClimateAction: 'action', ClimateComment: 'comment', ClimateNews: 'news', ClimateGroup: 'group', ClimateTrack: 'track' };
      for (const item of cleanItems) {
        await base44.entities.ClimateAuditLog.create({
          entity_type: typeMap[item._entity],
          entity_id: item.id,
          entity_title: item.title || item.headline || item.name || item.content?.slice(0, 80) || 'Untitled',
          action: 'published',
          reviewer_email: userEmail,
          ai_assessment: item.ai_assessment || '',
        });
        await base44.entities[item._entity].update(item.id, { status: 'published', ...signPatch(item._entity) });
      }
      await loadAll();
    } catch (e) {
      alert('Bulk publish failed: ' + e.message);
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
    { id: 'news', label: 'Wire', count: news.length, icon: FileText },
    { id: 'groups', label: 'Gatherings', count: groups.length, icon: Globe },
    { id: 'tracks', label: 'Music', count: tracks.length, icon: Music },
  ];

  const renderItem = (item, entityName, type) => (
    <div key={item.id} className="bg-[#f7f1e5] border-2 border-[#1a1612] p-4 mb-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-[#1a1612] text-sm truncate">
            {item.title || item.headline || item.name || item.content?.slice(0, 80) || 'Untitled'}
          </h3>
          {item.entry_type && (
            <span className="text-[9px] font-mono uppercase text-[#6b6258]">
              {item.entry_type === 'climate_crisis' ? 'Crisis' : item.entry_type}
              {item.action_type ? ` · ${item.action_type}` : ''}
              {item.category ? ` · ${item.category}` : ''}
            </span>
          )}
          {item.headline && (
            <span className="text-[9px] font-mono uppercase text-[#6b6258] block truncate">
              {(item.verification || 'single_source').replace(/_/g, ' ')}
              {item.when_label ? ` · ${item.when_label}` : ''}
              {item.source_name ? ` · ${item.source_name}` : ''}
            </span>
          )}
          {item.topic && (
            <span className="text-[9px] font-mono uppercase text-[#6b6258] block truncate">
              {item.topic}{item.region ? ` · ${item.region}` : ''}
              {item.contact_email ? ` · shows: ${item.contact_email}` : ' · no contact line — prints as an open gathering'}
            </span>
          )}
          {/* A track: who made it, what the file actually is, and the way to hear it
              before deciding — a keeper should never rule on music they have not heard. */}
          {item.audio_url && (
            <>
              <span className="text-[9px] font-mono uppercase text-[#6b6258] block truncate">
                {item.artist_name}{item.kind ? ` · read as ${item.kind.replaceAll('_', ' ')}` : ''}{item.spec ? ` · ${item.spec}` : ''}
              </span>
              <a
                href={item.audio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 px-3 py-2 min-h-[36px] bg-[#efe7d6] border-2 border-[#1a1612]/25 text-[9px] font-black font-mono uppercase text-[#1a1612] active:bg-[#1a1612] active:text-[#efe7d6] transition-colors"
              >
                <Play className="w-3 h-3" /> Listen before deciding
              </a>
              {/* The words the screener judged, shown to the person who decides. A keeper
                  should never have to rule on text they cannot read — and when a set is held,
                  the works inside it are exactly what the flag may be about. */}
              {item.statement && (
                <p className="text-[10px] font-mono text-[#6b6258] leading-relaxed mt-2 whitespace-pre-wrap">
                  <span className="uppercase">their words · </span>{item.statement}
                </p>
              )}
              {item.lyric && (
                <p className="text-[10px] font-mono text-[#6b6258] leading-relaxed mt-1.5 whitespace-pre-wrap">
                  <span className="uppercase">the words of it · </span>{item.lyric}
                </p>
              )}
              {item.tracklist && (
                <p className="text-[10px] font-mono text-[#6b6258] leading-relaxed mt-1.5 whitespace-pre-wrap">
                  <span className="uppercase">the works inside it · </span>{item.tracklist}
                </p>
              )}
            </>
          )}
        </div>
        {item.flagged && (
          <span className="flex items-center gap-1 text-[9px] font-black font-mono uppercase text-[#b3261e] bg-[#b3261e]/10 px-2 py-1 border border-[#b3261e]/30 flex-shrink-0">
            <AlertTriangle className="w-3 h-3" /> Flagged
          </span>
        )}
      </div>

      {/* The origin, right where the decision is made — a solution, crisis or wire entry
          with no source link waits here until someone pastes the link in. */}
      {(entityName === 'ClimateSolution' || entityName === 'ClimateNews' || entityName === 'ClimateAction') && (
        <SourceLinkRow item={item} entityName={entityName} onSaved={loadAll} />
      )}

      {/* Content preview */}
      {(item.summary || item.description || item.content || item.what_changed) && (
        <p className="text-[11px] font-mono text-[#1a1612] leading-relaxed mb-2 line-clamp-3">
          {item.summary || item.description || item.content || item.what_changed}
        </p>
      )}
      {item.details && (
        <p className="text-[10px] font-mono text-[#6b6258] leading-relaxed mb-2 line-clamp-2">
          {item.details}
        </p>
      )}

      {/* What the checkers found, in their own names, before the keeper decides. */}
      <CheckerNotes entryId={item.id} />

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
        {(() => {
          const d = waitedDays(item.created_date);
          if (d === null) return null;
          return (
            <span className={d >= 7 ? 'text-[#b3261e] font-black' : ''}>
              {d === 0 ? 'waiting since today' : `waiting ${d} day${d === 1 ? '' : 's'}`}
            </span>
          );
        })()}
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

  const currentItems = { solutions, actions, comments, news, groups, tracks }[activeTab] || [];
  const currentEntity = { solutions: 'ClimateSolution', actions: 'ClimateAction', comments: 'ClimateComment', news: 'ClimateNews', groups: 'ClimateGroup', tracks: 'ClimateTrack' }[activeTab];

  return (
    <div className="min-h-screen bg-[#f4efe4] twcc-scanlines relative">
      <div className="relative z-10 max-w-2xl mx-auto p-4 pb-12">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-black uppercase text-[#1a1612]" style={{ fontFamily: 'var(--font-display)', fontSize: '28px', letterSpacing: '-0.02em' }}>
              Review Queue
            </h1>
            <div className="flex items-center gap-2">
              <button onClick={publishAllClean} disabled={busy === 'bulk'} className="flex items-center gap-1.5 px-3 py-2 border-2 border-[#1e3a2b] text-[#1e3a2b] text-[10px] font-black font-mono uppercase bg-[#efe7d6] active:bg-[#1e3a2b] active:text-[#efe7d6] transition-colors disabled:opacity-50">
                {busy === 'bulk' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />} Publish all clean
              </button>
              <button onClick={loadAll} className="flex items-center gap-1.5 px-3 py-2 border-2 border-[#1a1612] text-[#1a1612] text-[10px] font-black font-mono uppercase bg-[#efe7d6] active:bg-[#1a1612] active:text-[#efe7d6] transition-colors">
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </button>
            </div>
          </div>
          <p className="text-[10px] font-mono text-[#6b6258] leading-relaxed">
            Every submission receives an AI advisory note. Clear entries go on the record at once — anything flagged needs attention. Nothing on this record goes up without a link to its source: an entry that arrives without one waits here until someone finds it.
          </p>
          <p className="text-[10px] font-mono text-[#6b6258] leading-relaxed mt-1.5">
            Music is held only when the screener flags it — a track needs no source, and a clean one is on the record the moment it was given. It is never judged on taste, genre or quality here: listen, then publish or turn it away.
          </p>
          <p className="text-[10px] font-mono text-[#6b6258] leading-relaxed mt-1.5">
            Lines left under the music go up at once and are the listener's own words. Only you can take one down, and only for something unlawful — and taking one down leaves a note in the open, where the line stood, saying so and why. Disagreement with the work is never a ground.
          </p>
        </div>

        {/* Quick stats */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-[#efe7d6] border border-[#1a1612]/15">
            <AlertTriangle className="w-3.5 h-3.5 text-[#b3261e] flex-shrink-0" />
            <span className="text-[10px] font-mono text-[#1a1612]"><b className="font-black">{solutions.length + actions.length + comments.length + news.length + groups.length + tracks.length}</b> pending</span>
          </div>
          <Link to={createPageUrl("ClimateImpact")} className="flex items-center gap-1.5 px-3 py-2.5 bg-[#1e3a2b] text-[#efe7d6] border border-[#1e3a2b] active:bg-[#1a1612] transition-colors">
            <Globe className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black font-mono uppercase">Impact</span>
          </Link>
          <Link to={createPageUrl("AdminClimateCategories")} className="flex items-center gap-1.5 px-3 py-2.5 bg-[#efe7d6] text-[#1a1612] border border-[#1a1612]/20 active:bg-[#1a1612] active:text-[#efe7d6] transition-colors">
            <Tag className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black font-mono uppercase">Cats</span>
          </Link>
        </div>

        {/* Provenance sweep — no entry without its origin */}
        <ProvenanceSweep />

        {/* Picture and credit sweep — every picture carries who made it */}
        <PictureCreditSweep />

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
        {/* Under the music: the lines listeners left, and the one thing a keeper may do to
            one of them — take it down for something unlawful, and say so in the open. */}
        {activeTab === 'tracks' && !loading && <ListenerLinesPanel />}
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

        <SignUnsignedEntries onSigned={loadAll} />
        <RecordExportPanel />
        <ArchiveSourcesPanel />

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[#1a1612]/15 text-center">
          <p className="text-[9px] font-mono text-[#6b6258]">
            Together We Can Change Climate · Review Queue · x = x
          </p>
        </div>
      </div>
    </div>
  );
}