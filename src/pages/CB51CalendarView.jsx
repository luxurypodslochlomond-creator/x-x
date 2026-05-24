import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Users, PoundSterling, Clock, AlertCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

// Safe date parser — no timezone off-by-one on any browser
const parseDate = (d) => {
  if (!d) return null;
  if (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
    const [y, m, day] = d.split('-').map(Number);
    return new Date(y, m - 1, day);
  }
  return new Date(d);
};

const formatFull = (d) => {
  const date = parseDate(d);
  if (!date || isNaN(date)) return '—';
  return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
};

const getDateParts = (d) => {
  const date = parseDate(d);
  if (!date || isNaN(date)) return { day: '?', month: '???' };
  return {
    day: date.getDate(),
    month: date.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
  };
};

const daysUntil = (d) => {
  const date = parseDate(d);
  if (!date || isNaN(date)) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((date - today) / 86400000);
};

// ── Single gig card ────────────────────────────────────────────────────────────
function GigCard({ gig, isOpen, onToggle }) {
  const dateStr = gig.date_start || gig.date;
  const { day, month } = getDateParts(dateStr);
  const days = daysUntil(dateStr);
  const isPast = days !== null && days < 0;
  const isSoon = days !== null && days >= 0 && days <= 7;

  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden"
      style={{
        background: '#0e1420',
        border: `1px solid ${isPast ? 'rgba(100,116,139,0.2)' : isSoon ? 'rgba(245,158,11,0.35)' : 'rgba(6,182,212,0.18)'}`,
      }}
    >
      {/* Row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left active:opacity-70 transition-opacity"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {/* Date chip */}
        <div
          className="flex-shrink-0 w-14 h-16 rounded-xl flex flex-col items-center justify-center"
          style={{
            background: isPast ? 'rgba(100,116,139,0.08)' : isSoon ? 'rgba(245,158,11,0.1)' : 'rgba(6,182,212,0.08)',
            border: `1px solid ${isPast ? 'rgba(100,116,139,0.2)' : isSoon ? 'rgba(245,158,11,0.3)' : 'rgba(6,182,212,0.2)'}`,
          }}
        >
          <span className="font-black text-2xl leading-none tabular-nums" style={{ color: isPast ? '#64748b' : isSoon ? '#f59e0b' : '#06b6d4' }}>{day}</span>
          <span className="text-[9px] font-bold tracking-widest mt-0.5" style={{ color: isPast ? '#475569' : '#64748b' }}>{month}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-black text-base leading-snug" style={{ color: isPast ? '#64748b' : '#f0f4ff' }}>
            {gig.venue}
          </p>
          {(gig.city || gig.location) && (
            <p className="text-xs mt-0.5 truncate" style={{ color: '#475569' }}>
              {[gig.city, gig.country].filter(Boolean).join(', ') || gig.location}
            </p>
          )}
          {gig.fee > 0 && (
            <p className="text-sm font-bold mt-1" style={{ color: isPast ? '#374151' : '#10b981' }}>
              £{gig.fee.toLocaleString()}
            </p>
          )}
        </div>

        {/* Days pill */}
        <div className="flex-shrink-0 flex flex-col items-end gap-1">
          {days !== null && !isPast && (
            <span
              className="text-xs font-black tabular-nums px-2 py-0.5 rounded-full"
              style={{
                background: isSoon ? 'rgba(245,158,11,0.12)' : 'rgba(6,182,212,0.08)',
                color: isSoon ? '#f59e0b' : '#06b6d4',
              }}
            >
              {days === 0 ? 'TODAY' : `${days}d`}
            </span>
          )}
          {isPast && <span className="text-[10px] font-mono" style={{ color: '#374151' }}>PAST</span>}
          <ChevronDown
            className="w-4 h-4 transition-transform mt-1"
            style={{ color: '#334155', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </div>
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 pt-1 space-y-4" style={{ borderTop: '1px solid rgba(6,182,212,0.1)' }}>

              {/* Date + time */}
              <div>
                <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#334155' }}>DATE</p>
                <p className="font-semibold text-sm" style={{ color: '#f0f4ff' }}>
                  {formatFull(dateStr)}{gig.time ? ` · ${gig.time}` : ''}
                </p>
              </div>

              {/* Venue / Location */}
              {(gig.venue || gig.location) && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#334155' }} />
                  <div>
                    {gig.venue && <p className="text-sm font-semibold" style={{ color: '#f0f4ff' }}>{gig.venue}</p>}
                    {gig.location && <p className="text-xs" style={{ color: '#64748b' }}>{gig.location}</p>}
                    {gig.city && (
                      <p className="text-xs" style={{ color: '#64748b' }}>
                        {[gig.city, gig.country].filter(Boolean).join(', ')}
                      </p>
                    )}
                    {(gig.location || gig.city) && (
                      <a
                        href={`https://maps.google.com/maps?q=${encodeURIComponent([gig.venue, gig.location, gig.city, gig.country].filter(Boolean).join(', '))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold mt-1 inline-block"
                        style={{ color: '#06b6d4' }}
                      >
                        Open in Maps →
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Fee */}
              {gig.fee > 0 && (
                <div className="flex items-center gap-2">
                  <PoundSterling className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#334155' }} />
                  <p className="font-black text-lg" style={{ color: '#10b981' }}>£{gig.fee.toLocaleString()}</p>
                  {gig.currency && gig.currency !== 'GBP' && (
                    <span className="text-xs" style={{ color: '#475569' }}>{gig.currency}</span>
                  )}
                </div>
              )}

              {/* Capacity */}
              {gig.capacity > 0 && (
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#334155' }} />
                  <p className="text-sm" style={{ color: '#94a3b8' }}>{gig.capacity.toLocaleString()} capacity</p>
                </div>
              )}

              {/* Promoter */}
              {(gig.promoter || gig.promoter_name) && (
                <div>
                  <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#334155' }}>PROMOTER</p>
                  <p className="text-sm font-semibold" style={{ color: '#f0f4ff' }}>{gig.promoter || gig.promoter_name}</p>
                  {gig.promoter_phone && (
                    <a href={`tel:${gig.promoter_phone}`} className="flex items-center gap-1.5 mt-1">
                      <Phone className="w-3 h-3" style={{ color: '#475569' }} />
                      <span className="text-xs" style={{ color: '#06b6d4' }}>{gig.promoter_phone}</span>
                    </a>
                  )}
                  {gig.promoter_email && (
                    <a href={`mailto:${gig.promoter_email}`} className="flex items-center gap-1.5 mt-1">
                      <Mail className="w-3 h-3" style={{ color: '#475569' }} />
                      <span className="text-xs" style={{ color: '#06b6d4' }}>{gig.promoter_email}</span>
                    </a>
                  )}
                </div>
              )}

              {/* Emergency contact */}
              {gig.emergency_contact_name && (
                <div>
                  <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#ef4444' }}>EMERGENCY CONTACT</p>
                  <p className="text-sm font-semibold" style={{ color: '#f0f4ff' }}>{gig.emergency_contact_name}</p>
                  {gig.emergency_contact_phone && (
                    <a href={`tel:${gig.emergency_contact_phone}`} className="flex items-center gap-1.5 mt-1">
                      <Phone className="w-3 h-3" style={{ color: '#ef4444' }} />
                      <span className="text-xs font-bold" style={{ color: '#ef4444' }}>{gig.emergency_contact_phone}</span>
                    </a>
                  )}
                </div>
              )}

              {/* Notes */}
              {gig.notes && (
                <div>
                  <p className="text-xs font-bold tracking-widest mb-1" style={{ color: '#334155' }}>NOTES</p>
                  <p className="text-sm" style={{ color: '#94a3b8' }}>{gig.notes}</p>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function CB51CalendarView() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);
  const [showPast, setShowPast] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const artistId = urlParams.get('id');

  // Single source of truth — confirmed GigOffers only
  const { data: gigs = [], isLoading } = useQuery({
    queryKey: ['confirmed-gigs-calendar', artistId],
    queryFn: () => artistId
      ? base44.entities.GigOffer.filter({ artist_id: artistId, status: 'confirmed' })
      : [],
    enabled: !!artistId,
    staleTime: 30000,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Dedupe by id, split into upcoming and past
  const unique = gigs.filter((g, i, arr) => arr.findIndex(x => x.id === g.id) === i);
  const upcoming = unique
    .filter(g => {
      const d = parseDate(g.date_start || g.date);
      return d && d >= today;
    })
    .sort((a, b) => parseDate(a.date_start || a.date) - parseDate(b.date_start || b.date));

  const past = unique
    .filter(g => {
      const d = parseDate(g.date_start || g.date);
      return d && d < today;
    })
    .sort((a, b) => parseDate(b.date_start || b.date) - parseDate(a.date_start || a.date));

  const totalFee = upcoming.reduce((sum, g) => sum + (g.fee || 0), 0);

  return (
    <div className="min-h-screen pb-24" style={{ background: '#070a0f', color: '#f0f4ff' }}>

      {/* Header */}
      <div className="px-4 pt-5 pb-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(6,182,212,0.1)' }}>
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl active:opacity-50 transition-opacity"
          style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)', WebkitTapHighlightColor: 'transparent' }}
        >
          <ArrowLeft className="w-4 h-4" style={{ color: '#06b6d4' }} />
        </button>
        <div className="flex-1">
          <p className="font-black text-lg leading-none" style={{ color: '#f0f4ff' }}>Shows</p>
          {!isLoading && (
            <p className="text-xs mt-0.5" style={{ color: '#475569' }}>
              {upcoming.length} confirmed{totalFee > 0 ? ` · £${totalFee.toLocaleString()} booked` : ''}
            </p>
          )}
        </div>
      </div>

      <div className="px-4 pt-5 space-y-3">

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin" />
          </div>
        )}

        {!isLoading && upcoming.length === 0 && (
          <div className="text-center py-16 space-y-2">
            <p className="font-black text-lg" style={{ color: '#334155' }}>Nothing booked yet</p>
            <p className="text-sm" style={{ color: '#1e293b' }}>Confirm a gig offer from the dashboard</p>
          </div>
        )}

        {/* Upcoming */}
        {upcoming.map(gig => (
          <GigCard
            key={gig.id}
            gig={gig}
            isOpen={openId === gig.id}
            onToggle={() => setOpenId(openId === gig.id ? null : gig.id)}
          />
        ))}

        {/* Past shows toggle */}
        {past.length > 0 && (
          <div className="pt-2">
            <button
              onClick={() => setShowPast(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl active:opacity-60 transition-opacity"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
            >
              <span className="text-xs font-bold tracking-widest" style={{ color: '#334155' }}>
                PAST SHOWS ({past.length})
              </span>
              <ChevronDown
                className="w-4 h-4 transition-transform"
                style={{ color: '#334155', transform: showPast ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            <AnimatePresence>
              {showPast && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2 mt-2"
                >
                  {past.map(gig => (
                    <GigCard
                      key={gig.id}
                      gig={gig}
                      isOpen={openId === gig.id}
                      onToggle={() => setOpenId(openId === gig.id ? null : gig.id)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
}