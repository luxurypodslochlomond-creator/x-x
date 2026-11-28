// Every workshop share now uses the real catalogue cover and the same date, people and credit.
import { buildWorkshopCard, WORKSHOP_CARD as VISUAL_CARD } from '@/components/climate/cartoons/workshopCard';

export const buildWorkshopShareCard = buildWorkshopCard;
export const WORKSHOP_CARD = {
  ...VISUAL_CARD,
  body: 'Climate cartoons and the people who make them. Janine Selendy hosts, Francis Umendu Odupute introduces the cartoonists, and Alina Sen presents CEEW’s What On Earth!.',
  honest: 'Sunday 29 November 2026 · 9am EST · 2pm UK · 3pm West Africa · online. The joining link comes from the host.',
};