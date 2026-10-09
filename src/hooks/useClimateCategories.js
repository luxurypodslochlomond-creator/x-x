import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// Built-in taxonomy — used as a fallback when no dynamic categories exist in the database.
// Janine can add her own categories through the admin panel; these remain as the seed.
// Icons are 2-letter Beadie Signal classification codes — big science, not emojis.
const FALLBACK_CATEGORIES = [
  { id: 'agriculture', label: 'Agriculture', code: 'AG' },
  { id: 'water', label: 'Water', code: 'WA' },
  { id: 'heat', label: 'Heat', code: 'HE' },
  { id: 'coastal_erosion_protection', label: 'Coastal Protection', code: 'CP' },
  { id: 'seagrasses', label: 'Seagrasses', code: 'SG' },
  { id: 'mangroves', label: 'Mangroves', code: 'MG' },
  { id: 'oceans', label: 'Oceans', code: 'OC' },
  { id: 'zooplankton', label: 'Zooplankton', code: 'ZP' },
  { id: 'phytoplankton', label: 'Phytoplankton', code: 'PP' },
  { id: 'forest_preservation', label: 'Forests', code: 'FO' },
  { id: 'rewilding', label: 'Rewilding', code: 'RW' },
  { id: 'urban_geodesign', label: 'Urban Geodesign', code: 'UG' },
  { id: 'transportation', label: 'Transport', code: 'TR' },
  { id: 'electric_vehicles', label: 'Electric Vehicles', code: 'EV' },
  { id: 'renewable_energy', label: 'Renewables', code: 'RE' },
  { id: 'solar_desalination', label: 'Solar Desalination', code: 'SD' },
  { id: 'drought', label: 'Drought', code: 'DR' },
  { id: 'flooding', label: 'Flooding', code: 'FL' },
  { id: 'extreme_weather', label: 'Extreme Weather', code: 'EW' },
  { id: 'other', label: 'Other', code: 'OT' },
];

// Loads categories from the database (admin-managed), falling back to the built-in taxonomy.
// Returns a unified format: { id, label, code }
export function useClimateCategories() {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    base44.entities.ClimateCategory.filter({ status: 'published' }, { sort: 'sort_order', limit: 100 })
      .then((r) => {
        if (cancelled) return;
        const items = r?.items || [];
        if (items.length > 0) {
          setCategories(items.map((c) => ({
            id: c.slug || c.name.toLowerCase().replace(/\s+/g, '_'),
            label: c.name,
            code: c.icon || 'OT',
          })));
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { categories, loading };
}