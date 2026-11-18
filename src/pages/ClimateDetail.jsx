import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useRecordBack from '@/components/climate/useRecordBack';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, ArrowRight, X, Calendar, Users, Sprout, Recycle, FileText, Hammer, Eye, Hand, Globe } from 'lucide-react';
import RelatedTriangle from '@/components/climate/RelatedTriangle';
import ClimateCommentSection from '@/components/climate/ClimateCommentSection';
import DrawingsAbout from '@/components/climate/cartoons/DrawingsAbout';
import { useEntryTranslation } from '@/hooks/useEntryTranslation';
import { useSiteLanguage } from '@/components/shared/SiteLanguage';
import EntryLanguageStatus from '@/components/climate/EntryLanguageStatus';
import { useClimateCategories } from '@/hooks/useClimateCategories';
import SignalCode from '@/components/climate/SignalCode';
import SignalBeacon from '@/components/climate/SignalBeacon';
import RecordCitation from '@/components/climate/RecordCitation';
import ShareCardButton from '@/components/climate/ShareCardButton';
import SignedBy from '@/components/climate/SignedBy';
import { buildEntryShareCard } from '@/components/climate/shareCardImage';
import SourceBlock from '@/components/climate/SourceBlock';
import SourceArchiveNote from '@/components/climate/SourceArchiveNote';
import VerificationBadge from '@/components/climate/VerificationBadge';
import { recordAddress } from '@/components/climate/recordAddress';
import { verificationNoteOf } from '@/components/climate/verification';
import VerificationControl from '@/components/admin/VerificationControl';
import useRecordImage from '@/components/climate/useRecordImage';

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
  other: { label: 'Action', icon: Hand, color: '#5a5246' },
};

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
  const back = useRecordBack();
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
            // ── A READ HAS TO BE A READER ────────────────────────────────────────────
            // Two things were wrong with this call, and both made the readership figure
            // say something that was not true.
            //
            // One: a page opened inside the builder's own frame is us at work on the
            // record, not somebody reading it. Those openings were counted, which is how a
            // record read mostly in Scotland came to report an audience entirely in the
            // United States — the workshop's own address, printed as a place.
            //
            // Two: no place was sent at all, so the server had to guess one from the
            // machine that answered the request. Now the reader's own device states where
            // it is, from its clock and language settings, and that is what travels. If a
            // device states nothing, the read is still counted — just without a place.
            let workshop = true;
            try { workshop = window.self !== window.top; } catch { workshop = true; }

            let reader_region = '';
            try { reader_region = localStorage.getItem('climate51_reader_region') || ''; } catch {}

            let reader_country = '';
            try {
              const tag = Intl.DateTimeFormat().resolvedOptions().locale || navigator.language || '';
              const region = String(tag).split('-')[1];
              if (region && /^[A-Za-z]{2}$/.test(region)) reader_country = region.toUpperCase();
            } catch { reader_country = ''; }

            if (!workshop) {
              base44.functions.invoke('climateTrackView', {
                entry_id: id,
                entry_type: type,
                reader_region,
                reader_country,
              }).catch(() => {});
            }
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
  const { chosen: lang } = useSiteLanguage();
  const tr = useEntryTranslation(record, lang);
  const { categories } = useClimateCategories();
  const image = useRecordImage(record);

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
      <div className="min-h-screen bg-[#efe7d6] text-[#141210]" style={{ fontFamily: 'var(--font-body)' }}>
        {/* Sticky header — native back, action-type colour band */}
        <div className="flex items-center gap-3 px-4 lg:px-10 py-3 border-b-2 border-[#141210]" style={{ background: meta.color }}>
          <button onClick={back} aria-label="Back" className="w-11 h-11 flex items-center justify-center bg-[#efe7d6] border-2 border-[#141210] text-[#141210] active:bg-[#e2602a] transition-colors flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <Icon className="w-5 h-5 text-[#efe7d6] flex-shrink-0" />
            <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#efe7d6] truncate">{meta.label}</span>
          </div>
        </div>

        <div className="p-5 lg:px-10 lg:py-8 lg:max-w-[820px] lg:mx-auto">
          <h1 data-no-translate className="text-2xl lg:text-4xl font-black uppercase text-[#efe7d6] leading-none px-1 -mx-1" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', color: '#141210' }}>
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

          <EntryLanguageStatus translation={tr} />
          <p data-no-translate className="text-[15.5px] lg:text-[17px] text-[#141210] leading-[1.7] lg:leading-[1.75] mt-5" style={{ fontFamily: 'var(--font-reading)' }}>{tr.field('description')}</p>

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

          <div className="mt-6">
            <VerificationBadge entry={record} />
          </div>
          <p className="mt-2 text-[11px] font-mono text-[#5a5246] leading-relaxed">
            {verificationNoteOf(record)}
          </p>
          {record.corroborating_source && (
            <p className="mt-1.5 text-[11px] font-mono text-[#141210]">Second origin · {record.corroborating_source}</p>
          )}
          {record.correction_note && (
            <div className="mt-3 border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2.5">
              <p className="text-[9px] font-black font-mono uppercase tracking-widest text-[#b3261e] mb-1">Correction</p>
              <p className="text-[11.5px] font-mono leading-relaxed text-[#141210]">{record.correction_note}</p>
              <Link to="/ClimateCorrections" className="mt-1.5 inline-block text-[9px] font-black font-mono uppercase tracking-widest text-[#b3261e] underline">
                Every correction, in daylight
              </Link>
            </div>
          )}

          <VerificationControl entry={record} entityName="ClimateAction" onSaved={setRecord} />

          <SourceBlock
            sourceName={record.source_name}
            sourceUrl={record.source_url}
            sourceAuthor={record.source_author}
            sourceDate={record.source_date}
            kindLabel={meta.label}
            accessed={record.created_date}
          />

          <SourceArchiveNote entryId={record.id} sourceUrl={record.source_url} />

          <RecordCitation
            citation={`Together We Can Change Climate. "${record.title}" — ${meta.label}${record.region_rough ? ', ' + record.region_rough : ''}. ${recordAddress()}`}
            note={record.source_url
              ? 'Quoting this action? The citation carries the record and the permanent address with it, so it can always be traced back.'
              : 'This action names no source on the record: quote it as the record\u2019s own, and tell us the organiser\u2019s origin if you have it.'}
          />

          <div className="mt-4">
            <ShareCardButton
              entry={record}
              build={(entry, opts) => buildEntryShareCard(entry, { ...opts, kindLabel: meta.label })}
            />
          </div>

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
  // The card and the full entry use the same picture and labelled fallback.
  const heroImage = image.src;
  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#141210]" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Hero — photo when available, paper-and-beacon when not. The picture you tapped keeps
          its own colour through the door: it used to be drained to grey here, so an entry about
          a river came up as a black-and-white photograph of a river — the greyest thing on the
          page the reader had just decided to care about. */}
      {heroImage ? (
        <div className="record-detail-image record-media-mount relative h-64 bg-record-ink lg:h-[420px]">
          <img src={heroImage} alt={image.illustrative ? image.label : record.title} fetchpriority="high" decoding="async" onError={image.onError} className="w-full h-full object-cover" style={{ filter: 'saturate(1.06) contrast(1.04)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,18,16,0.3), rgba(20,18,16,0.5) 50%, #efe7d6 100%)' }} />
          <button onClick={back} aria-label="Back" className="absolute top-4 left-4 w-11 h-11 flex items-center justify-center bg-[#efe7d6] border-2 border-[#141210] text-[#141210] active:bg-[#e2602a] transition-colors z-10">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 lg:bottom-6 left-5 lg:left-10 right-5 lg:right-10">
            <span className={`text-[10px] font-black font-mono uppercase tracking-widest px-2 py-1 border border-[#141210] ${isSolution ? 'bg-[#1e3a2b] text-[#efe7d6]' : 'bg-[#b3261e] text-[#efe7d6]'}`}>
              {isSolution ? 'Solution' : 'Climate Crisis'}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative min-h-[180px] lg:min-h-[300px] bg-[#f7f1e5] border-b-2 border-[#141210] flex flex-col items-center justify-center gap-3 px-5 lg:px-10 py-8">
          <button onClick={back} aria-label="Back" className="absolute top-4 left-4 w-11 h-11 flex items-center justify-center bg-[#efe7d6] border-2 border-[#141210] text-[#141210] active:bg-[#e2602a] transition-colors z-10">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <SignalBeacon size={36} color={isSolution ? '#1e3a2b' : '#b3261e'} />
          <span className={`text-[10px] font-black font-mono uppercase tracking-widest px-2 py-1 border border-[#141210] ${isSolution ? 'bg-[#1e3a2b] text-[#efe7d6]' : 'bg-[#b3261e] text-[#efe7d6]'}`}>
            {isSolution ? 'Solution' : 'Climate Crisis'}
          </span>
        </div>
      )}

      {/* The entry keeps its colour through the door — green for a solution, red for a
          crisis: the same mark its card wore, so tapping through never changes it. */}
      <div className="h-1.5" style={{ background: isSolution ? '#1e3a2b' : '#b3261e' }} />

      <div className="p-5 lg:px-10 lg:py-10 lg:max-w-[820px] lg:mx-auto">
        <div className={`flex items-center gap-1.5 mb-1 ${isSolution ? 'text-[#1e3a2b]' : 'text-[#b3261e]'}`}>
          <SignalCode code={catCode} size="md" /><span className="text-[11px] font-black font-mono uppercase tracking-widest">{record.category?.replaceAll('_', ' ')}</span>
        </div>
        <h1 data-no-translate className="text-2xl lg:text-4xl font-black uppercase text-[#141210] mt-1 leading-none" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
          {tr.field('title')}
        </h1>
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#5a5246] mt-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{record.country}{record.region_rough ? ` · ${record.region_rough}` : ''}</span>
        </div>
        <EntryLanguageStatus translation={tr} />
        <p data-no-translate className="text-[15.5px] lg:text-[17px] text-[#141210] leading-[1.7] lg:leading-[1.75] mt-5" style={{ fontFamily: 'var(--font-reading)' }}>{tr.field('details') || tr.field('summary')}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-[10px] font-mono font-bold uppercase">
          <span className="px-2 py-1 border border-[#141210] text-[#141210]">Scale: {record.scale || '—'}</span>
          <span className="px-2 py-1 border border-[#141210] text-[#141210]">Reviewed: ✓</span>
          <VerificationBadge entry={record} />
        </div>
        <p className="mt-2.5 text-[11px] font-mono text-[#5a5246] leading-relaxed">
          {verificationNoteOf(record)}
        </p>
        {record.corroborating_source && (
          <p className="mt-1.5 text-[11px] font-mono text-[#141210]">Second origin · {record.corroborating_source}</p>
        )}
        {record.correction_note && (
          <div className="mt-4 border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2.5">
            <p className="text-[9px] font-black font-mono uppercase tracking-widest text-[#b3261e] mb-1">Correction</p>
            <p className="text-[11.5px] font-mono leading-relaxed text-[#141210]">{record.correction_note}</p>
            <Link to="/ClimateCorrections" className="mt-1.5 inline-block text-[9px] font-black font-mono uppercase tracking-widest text-[#b3261e] underline">
              Every correction, in daylight
            </Link>
          </div>
        )}

        <VerificationControl entry={record} entityName="ClimateSolution" onSaved={setRecord} />

        {record.source_url && (
          <a href={record.source_url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[#1e3a2b] hover:text-[#e2602a] text-[12px] font-black font-mono uppercase transition-colors">
            View source <ArrowRight className="w-4 h-4" />
          </a>
        )}

        {/* Attribution — Janine's spec: credit the image source and the contributor */}
        {(image.credit || record.submitter_name) && (
          <div className="mt-5 pt-4 border-t border-[#141210]/15 text-[10px] font-mono text-[#5a5246] leading-relaxed">
            {image.credit && <p>Image: {image.credit}</p>}
            {record.submitter_name && <p>Submitted by {record.submitter_name}</p>}
          </div>
        )}

        <div className="mt-5">
          <SignedBy name={record.editor} />
        </div>

        <SourceBlock
          sourceName={record.source_name}
          sourceUrl={record.source_url}
          sourceAuthor={record.source_author}
          sourceDate={record.source_date}
          accessed={record.created_date}
        />

        <SourceArchiveNote entryId={record.id} sourceUrl={record.source_url} />

        <RecordCitation
          citation={`${record.source_name ? record.source_name + '. ' : ''}"${record.title}" Together We Can Change Climate — ${isSolution ? 'solution' : 'climate crisis'}${record.country ? ', ' + record.country : ''}. ${recordAddress()}`}
          note={record.source_url
            ? 'Quoting this entry? The citation carries its origin, the record and the permanent address with it.'
            : 'This entry names no source on the record, so it can only be quoted as the record\u2019s own. If you know its origin, tell us and it is corrected in daylight, with the date.'}
        />

        <div className="mt-4">
          <ShareCardButton
            entry={record}
            build={(entry, opts) => buildEntryShareCard(entry, { ...opts, kindLabel: isSolution ? 'Solution' : 'Climate crisis' })}
          />
        </div>

        <RelatedTriangle
          category={record.category}
          items={allItems}
          actions={allActions}
          currentId={record.id}
          onOpenItem={(next) => navigate(`/ClimateDetail/${next.entry_type}/${next.id}`)}
          onOpenAction={(next) => navigate(`/ClimateDetail/action/${next.id}`)}
        />

        {/* A crisis that has been drawn about shows the drawings, because the room of
            cartoons and the record are one thing: the drawing answers this entry, and this
            entry is where a reader who cares about it already is. */}
        {!isSolution && <DrawingsAbout entryId={record.id} />}

        <ClimateCommentSection entryId={record.id} entryType={record.entry_type} />
      </div>
    </div>
  );
}