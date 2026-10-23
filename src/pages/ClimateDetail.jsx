import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, ArrowRight, X, Calendar, Users, Sprout, Recycle, FileText, Hammer, Eye, Hand, Globe } from 'lucide-react';
import RelatedTriangle from '@/components/climate/RelatedTriangle';
import ClimateCommentSection from '@/components/climate/ClimateCommentSection';
import { useEntryTranslation } from '@/hooks/useEntryTranslation';
import { useClimateCategories } from '@/hooks/useClimateCategories';
import SignalCode from '@/components/climate/SignalCode';
import SignalBeacon from '@/components/climate/SignalBeacon';
import RecordCitation from '@/components/climate/RecordCitation';
import SourceBlock from '@/components/climate/SourceBlock';

const CATEGORIES = [
  { id: 'agriculture', icon: Sprout, label: 'Agriculture' },
  { id: 'water', icon: Globe, label: 'Water' },
  { id: 'heat', icon: Globe, label: 'Heat' },
  { id: 'coastal_erosion_protection', icon: Globe, label: 'Coastal' },
  { id: 'seagrasses', icon: Globe, label: 'Seagrasses' },
  { id: 'mangroves', icon: Sprout, label: 'Mangroves' },
  { id: 'oceans', icon: Globe, label: 'Oceans' },
  { id: 'zooplankton', icon: Globe, label: 'Zooplankton' },
  { id: 'phytoplankton', icon: Globe, label: 'Phytoplankton' },
  { id: 'forest_preservation', icon: Globe, label: 'Forests' },
  { id: 'rewilding', icon: Sprout, label: 'Rewilding' },
  { id: 'urban_geodesign', icon: Globe, label: 'Geodesign' },
  { id: 'transportation', icon: Globe, label: 'Transport' },
  { id: 'electric_vehicles', icon: Globe, label: 'EV' },
  { id: 'renewable_energy', icon: Globe, label: 'Renewables' },
  { id: 'solar_desalination', icon: Globe, label: 'Solar Desal' },
  { id: 'drought', icon: Globe, label: 'Drought' },
  { id: 'flooding', icon: Globe, label: 'Flooding' },
  { id: 'extreme_weather', icon: Globe, label: 'Extreme Weather' },
  { id: 'other', icon: Globe, label: 'Other' },
];

const ACTION_TYPES = {
  cleanup: { label: 'Cleanup', icon: Recycle, color: '#1e3a2b' },
  planting: { label: 'Planting', icon: Sprout, color: '#1e3a2b' },
  meeting: { label: 'Meeting', icon: Users, color: '#0f5f7a' },
  policy_submission: { label: 'Policy Submission', icon: FileText, color: '#0f5f7a' },
  workshop: { label: 'Workshop', icon: Hammer, color: '#0f5f7a' },
  monitoring: { label: 'Monitoring', icon: Eye, color: '#1e3a2b' },
  other: { label: 'Action', icon: Hand, color: '#5b6b69' },
};

import { CATEGORY_IMAGE } from '@/components/climate/categoryImages';

function fmtDate(d) {
  if (!d) return '';
  try {
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return '';
    return dt.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  } catch { return ''; }
}

export default function ClimateDetail() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [allActions, setAllActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setRecord(null);
    const entity = type === 'action' ? base44.entities.ClimateAction : base44.entities.ClimateSolution;
    entity.get(id)
      .then(r => {
        if (!cancelled) {
          setRecord(r);
          if (r) {
            let reader_region = '';
            try { reader_region = localStorage.getItem('climate51_reader_region') || ''; } catch {}
            base44.functions.invoke('climateTrackView', { entry_id: id, entry_type: type, reader_region }).catch(() => {});
          }
        }
      })
      .catch(() => { if (!cancelled) setRecord(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    // Load siblings for RelatedTriangle
    base44.entities.ClimateSolution.list().then(r => { if (!cancelled) setAllItems(Array.isArray(r) ? r : (r?.items || [])); }).catch(() => {});
    base44.entities.ClimateAction.list().then(r => { if (!cancelled) setAllActions(Array.isArray(r) ? r : (r?.items || [])); }).catch(() => {});
    return () => { cancelled = true; };
  }, [type, id]);

  // Live entry-text translation — Janine's "every tongue, nobody left behind"
  // Hooks must run before any early return — call unconditionally; hook handles null record.
  const [lang] = useState(() => { try { return localStorage.getItem('climate51_lang') || 'auto'; } catch { return 'auto'; } });
  const tr = useEntryTranslation(record, lang);
  const { categories } = useClimateCategories();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#efe7d6] flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#141210]/20 border-t-[#e2602a] animate-spin" />
        <p className="text-[#5a5246] text-[11px] font-mono uppercase mt-4">Connecting the planet…</p>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="min-h-screen bg-[#efe7d6] flex flex-col items-center justify-center p-6 text-center">
        <Globe className="w-12 h-12 text-[#5a5246] mb-4" />
        <p className="text-[14px] font-black font-mono uppercase text-[#141210]">Entry not found</p>
        <button onClick={() => navigate('/TogetherChangeClimate')} className="mt-6 px-5 py-3 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210]">
          Back to the record
        </button>
      </div>
    );
  }

  const isAction = type === 'action';
  const isSolution = !isAction && record.entry_type === 'solution';

  // Action detail
  if (isAction) {
    const meta = ACTION_TYPES[record.action_type] || ACTION_TYPES.other;
    const Icon = meta.icon;
    const catCode = categories.find(c => c.id === record.category)?.code || 'OT';
    return (
      <div className="min-h-screen bg-[#efe7d6] text-[#141210]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
        {/* Sticky header — native back, action-type colour band */}
        <div className="sticky top-0 z-50 flex items-center gap-3 px-4 lg:px-10 py-3 border-b-2 border-[#141210]" style={{ background: meta.color }}>
          <button onClick={() => navigate(-1)} aria-label="Back" className="w-11 h-11 flex items-center justify-center bg-[#efe7d6] border-2 border-[#141210] text-[#141210] active:bg-[#e2602a] transition-colors flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <Icon className="w-5 h-5 text-[#efe7d6] flex-shrink-0" />
            <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#efe7d6] truncate">{meta.label}</span>
          </div>
        </div>

        <div className="p-5 lg:px-10 lg:py-8 lg:max-w-[820px] lg:mx-auto">
          <h1 className="text-2xl lg:text-4xl font-black uppercase text-[#efe7d6] leading-none px-1 -mx-1" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', color: '#141210' }}>
            {tr.field('title')}
          </h1>

          <div className="flex items-center gap-1.5 mt-3">
            <SignalCode code={catCode} size="md" />
            <span className="text-[11px] font-black font-mono uppercase tracking-widest text-[#1e3a2b]">{record.category?.replaceAll('_', ' ')}</span>
          </div>

          <p className="text-[10px] font-black font-mono uppercase tracking-[0.14em] text-[#e2602a] mt-3">
            Together we can change the course of climate change
          </p>

          {(record.date || record.country || record.region_rough) && (
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#5a5246] mt-4">
              {record.date && (
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{fmtDate(record.date)}</span>
              )}
              {(record.country || record.region_rough) && (
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{record.region_rough}{record.region_rough && record.country ? ' · ' : ''}{record.country || ''}</span>
              )}
            </div>
          )}

          {tr.translating && (
            <p className="text-[10px] font-mono text-[#5a5246] mt-4 animate-pulse">Translating into your language…</p>
          )}
          {tr.isTranslated && (
            <button onClick={() => tr.setShowOriginal(!tr.showOriginal)} className="mt-4 text-[9px] font-mono font-bold uppercase tracking-widest text-[#1e3a2b] border border-[#1e3a2b] px-2 py-1 active:bg-[#1e3a2b] active:text-[#efe7d6] transition-colors">
              {tr.showOriginal ? 'Show translation' : 'View original (English)'}
            </button>
          )}
          <p className="text-[14px] lg:text-[15px] font-mono text-[#141210] leading-relaxed lg:leading-[1.85] mt-5">{tr.field('description')}</p>

          {record.source_url && (
            <a href={record.source_url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[#1e3a2b] hover:text-[#e2602a] text-[12px] font-black font-mono uppercase transition-colors">
              More info <ArrowRight className="w-4 h-4" />
            </a>
          )}

          {record.contact_link && (
            <a href={record.contact_link} target="_blank" rel="noopener noreferrer" className="mt-6 w-full lg:max-w-[420px] flex items-center justify-center gap-2 px-4 py-4 min-h-[52px] bg-[#e2602a] text-[#141210] text-[13px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#1e3a2b] active:text-[#efe7d6] transition-colors">
              Join in — contact organiser <ArrowRight className="w-4 h-4" />
            </a>
          )}
          <p className="text-[9px] font-mono text-[#5a5246] mt-3 leading-relaxed">
            The platform never sees your messages — you contact the organiser directly.
          </p>

          <SourceBlock
            sourceName={record.source_name}
            sourceUrl={record.source_url}
            sourceAuthor={record.source_author}
            sourceDate={record.source_date}
            kindLabel={meta.label}
            accessed={record.created_date}
          />

          <RecordCitation
            citation={`Together We Can Change Climate. "${record.title}" — ${meta.label}${record.region_rough ? ', ' + record.region_rough : ''}. ${window.location.href}`}
            note={record.source_url
              ? 'Quoting this action? The citation carries the record and the permanent address with it, so it can always be traced back.'
              : 'This action names no source on the record: quote it as the record\u2019s own, and tell us the organiser\u2019s origin if you have it.'}
          />

          <RelatedTriangle
            category={record.category}
            items={allItems}
            actions={allActions}
            currentId={record.id}
            onOpenItem={(next) => navigate(`/ClimateDetail/solution/${next.id}`)}
            onOpenAction={(next) => navigate(`/ClimateDetail/action/${next.id}`)}
          />

          <ClimateCommentSection entryId={record.id} entryType="action" />
        </div>
      </div>
    );
  }

  // Solution / Crisis detail
  const catCode = categories.find(c => c.id === record.category)?.code || 'OT';
  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#141210]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      {/* Hero — photo when available, paper-and-beacon when not (matches the text-card) */}
      {record.image_url ? (
        <div className="relative h-64 lg:h-[420px] bg-[#141210]">
          <img src={record.image_url} alt={record.title} fetchpriority="high" decoding="async" className="w-full h-full object-cover" style={{ filter: 'grayscale(1) contrast(1.35)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,18,16,0.3), rgba(20,18,16,0.5) 50%, #e9eeec 100%)' }} />
          <button onClick={() => navigate(-1)} aria-label="Back" className="absolute top-4 left-4 w-11 h-11 flex items-center justify-center bg-[#efe7d6] border-2 border-[#141210] text-[#141210] active:bg-[#e2602a] transition-colors z-10">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 lg:bottom-6 left-5 lg:left-10 right-5 lg:right-10">
            <span className={`text-[10px] font-black font-mono uppercase tracking-widest px-2 py-1 border border-[#141210] ${isSolution ? 'bg-[#1e3a2b] text-[#efe7d6]' : 'bg-[#e2602a] text-[#141210]'}`}>
              {isSolution ? 'Solution' : 'Climate Crisis'}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative min-h-[180px] lg:min-h-[300px] bg-[#f7f1e5] border-b-2 border-[#141210] flex flex-col items-center justify-center gap-3 px-5 lg:px-10 py-8">
          <button onClick={() => navigate(-1)} aria-label="Back" className="absolute top-4 left-4 w-11 h-11 flex items-center justify-center bg-[#efe7d6] border-2 border-[#141210] text-[#141210] active:bg-[#e2602a] transition-colors z-10">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <SignalBeacon size={36} color={isSolution ? '#1e3a2b' : '#0f5f7a'} />
          <span className={`text-[10px] font-black font-mono uppercase tracking-widest px-2 py-1 border border-[#141210] ${isSolution ? 'bg-[#1e3a2b] text-[#efe7d6]' : 'bg-[#e2602a] text-[#141210]'}`}>
            {isSolution ? 'Solution' : 'Climate Crisis'}
          </span>
        </div>
      )}

      <div className="p-5 lg:px-10 lg:py-10 lg:max-w-[820px] lg:mx-auto">
        <div className="flex items-center gap-1.5 text-[#1e3a2b] mb-1">
          <SignalCode code={catCode} size="md" /><span className="text-[11px] font-black font-mono uppercase tracking-widest">{record.category?.replaceAll('_', ' ')}</span>
        </div>
        <h1 className="text-2xl lg:text-4xl font-black uppercase text-[#141210] mt-1 leading-none" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
          {tr.field('title')}
        </h1>
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#5a5246] mt-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{record.country}{record.region_rough ? ` · ${record.region_rough}` : ''}</span>
        </div>
        {tr.translating && (
          <p className="text-[10px] font-mono text-[#5a5246] mt-4 animate-pulse">Translating into your language…</p>
        )}
        {tr.isTranslated && (
          <button onClick={() => tr.setShowOriginal(!tr.showOriginal)} className="mt-4 text-[9px] font-mono font-bold uppercase tracking-widest text-[#1e3a2b] border border-[#1e3a2b] px-2 py-1 active:bg-[#1e3a2b] active:text-[#efe7d6] transition-colors">
            {tr.showOriginal ? 'Show translation' : 'View original (English)'}
          </button>
        )}
        <p className="text-[14px] lg:text-[15px] font-mono text-[#141210] leading-relaxed lg:leading-[1.85] mt-5">{tr.field('details') || tr.field('summary')}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-mono font-bold uppercase">
          <span className="px-2 py-1 border border-[#141210] text-[#141210]">Scale: {record.scale || '—'}</span>
          <span className="px-2 py-1 border border-[#141210] text-[#141210]">Reviewed: ✓</span>
        </div>
        {record.source_url && (
          <a href={record.source_url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[#1e3a2b] hover:text-[#e2602a] text-[12px] font-black font-mono uppercase transition-colors">
            View source <ArrowRight className="w-4 h-4" />
          </a>
        )}

        {/* Attribution — Janine's spec: credit the image source and the contributor */}
        {(record.image_credit || record.submitter_name) && (
          <div className="mt-5 pt-4 border-t border-[#141210]/15 text-[10px] font-mono text-[#5a5246] leading-relaxed">
            {record.image_credit && <p>Image: {record.image_credit}</p>}
            {record.submitter_name && <p>Submitted by {record.submitter_name}</p>}
          </div>
        )}

        <SourceBlock
          sourceName={record.source_name}
          sourceUrl={record.source_url}
          sourceAuthor={record.source_author}
          sourceDate={record.source_date}
          accessed={record.created_date}
        />

        <RecordCitation
          citation={`${record.source_name ? record.source_name + '. ' : ''}"${record.title}" Together We Can Change Climate — ${isSolution ? 'solution' : 'climate crisis'}${record.country ? ', ' + record.country : ''}. ${window.location.href}`}
          note={record.source_url
            ? 'Quoting this entry? The citation carries its origin, the record and the permanent address with it.'
            : 'This entry names no source on the record, so it can only be quoted as the record\u2019s own. If you know its origin, tell us and it is corrected in daylight, with the date.'}
        />

        <RelatedTriangle
          category={record.category}
          items={allItems}
          actions={allActions}
          currentId={record.id}
          onOpenItem={(next) => navigate(`/ClimateDetail/${next.entry_type}/${next.id}`)}
          onOpenAction={(next) => navigate(`/ClimateDetail/action/${next.id}`)}
        />

        <ClimateCommentSection entryId={record.id} entryType={record.entry_type} />
      </div>
    </div>
  );
}