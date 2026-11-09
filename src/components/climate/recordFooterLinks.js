import {
  MarkBrief, MarkPortrait, MarkMethod, MarkCorrection, MarkCheckers, MarkHandover, MarkMusic, MarkStudio,
} from '@/components/climate/RecordFootMarks';
import { MarkSeal } from '@/components/climate/keeper/KeeperMarks';

// Nine doors at the foot of every page. One word each — the mark says the rest.
// No groups: the three headings that stood here were our filing system, not a reader's,
// and "Take part" had quietly collected the music, the studio and the checking office.
const LABELS = [
  { label: 'Brief', to: '/ClimateBrief', mark: MarkBrief, what: 'What is live, what is planned, and what is still missing.' },
  { label: 'Janine', to: '/ClimateFounder', mark: MarkPortrait, what: 'Janine M. H. Selendy and the work the record stands on.' },
  { label: 'Method', to: '/ClimateMethod', mark: MarkMethod, what: 'How an entry is sourced, screened and allowed on the record.' },
  { label: 'Seals', to: '/ClimateSeals', mark: MarkSeal, what: 'The fingerprints, and the limits of what they prove.' },
  { label: 'Corrections', to: '/ClimateCorrections', mark: MarkCorrection, what: 'Everything changed, with the date and the reason.' },
  { label: 'Checkers', to: '/ClimateFellows', mark: MarkCheckers, what: 'What a checker does, and how to ask to be one.' },
  { label: 'Handover', to: '/ClimateHandover', mark: MarkHandover, what: 'What it costs, who holds the keys, and what is still open.' },
  { label: 'Music', to: '/ClimateMusic', mark: MarkMusic, what: 'The music given to the record, played from the record.' },
  { label: 'Studio', to: '/Studio', mark: MarkStudio, what: 'The record’s own making room: ZAPP and the logo tool.' },
];

export default LABELS;