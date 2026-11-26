// Stored names differ between the reference record and the Wire; their reader-facing meaning does not.
const KINDS = {
  solution: 'solution', milestone: 'solution',
  climate_crisis: 'crisis', crisis: 'crisis', emergency: 'crisis',
  action: 'action', actions: 'action', initiative: 'action',
  group: 'group', groups: 'group',
};
export default function recordKindOf(value) {
  return KINDS[value];
}