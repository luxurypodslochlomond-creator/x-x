import { BookOpen, Radio, Map, Images, ShieldCheck, User, Fingerprint, Users, Music, FileText, Lock, Handshake, Heart, LayoutGrid, PenLine, Info } from 'lucide-react';
import { MarkBaseOne, MarkXEqualsX } from '@/components/climate/RecordFootMarks';

const ICONS = {
  '/TogetherChangeClimate': BookOpen, '/ClimateWire': Radio, '/ClimateMap': Map,
  '/ClimateCartoons': Images, '/ClimateCartoons/Francis': PenLine,
  '/ClimateCartoons/WhatThisIs': Info, '/ClimateCartoons/CAIB': ShieldCheck,
  '/ClimateSearch': MarkBaseOne, '/XEqualsX': MarkXEqualsX,
  '/ClimateMethod': ShieldCheck, '/ClimateCorrections': ShieldCheck,
  '/ClimateFounder': User, '/ClimateSeals': Fingerprint, '/ClimateFellows': Users,
  '/ClimateRoll': Users, '/ClimateMusic': Music, '/ClimateGuide': LayoutGrid,
  '/ClimateTerms': FileText, '/ClimatePrivacy': Lock, '/ClimateHost': Handshake,
  '/ClimateBrief': FileText, '/ClimateSupport': Heart, '/ExtractionProofCovenant': ShieldCheck,
};
export default function navigationIconFor(path = '') {
  const clean = path.split('#')[0].split('?')[0];
  return ICONS[clean] || (clean.startsWith('/ClimateCartoons/') ? Images : FileText);
}