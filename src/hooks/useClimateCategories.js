import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// Built-in taxonomy — used as a fallback when no dynamic categories exist in the database.
// Janine can add her own categories through the admin panel; these remain as the seed.
const FALLBACK_CATEGORIES = [
  { id: 'agriculture', label: 'Agriculture', emoji: '🌾' },
  { id: 'water', label: 'Water', emoji: '💧' },
  { id: 'heat', label: 'Heat', emoji: '🔥' },
  { id: 'coastal_erosion_protection', label: 'Coastal Protection', emoji: '🌊' },
  { id: 'seagrasses', label: 'Seagrasses', emoji: '🌿' },
  { id: 'mangroves', label: 'Mangroves', emoji: '🌳' },
  { id: 'oceans', label: 'Oceans', emoji: '🐠' },
  { id: 'zooplankton', label: 'Zooplankton', emoji: '🦐' },
  { id: 'phytoplankton', label: 'Phytoplankton', emoji: '🦠' },
  { id: 'forest_preservation', label: 'Forests', emoji: '🌲' },
  { id: 'rewilding', label: 'Rewilding', emoji: '🦌' },
  { id: 'urban_geodesign', label: 'Urban Geodesign', emoji: '🏙️' },
  { id: 'transportation', label: 'Transport', emoji: '🚂' },
  { id: 'electric_vehicles', label: 'Electric Vehicles', emoji: '⚡' },
  { id: 'renewable_energy', label: 'Renewables', emoji: '☀️' },
  { id: 'solar_desalination', label: 'Solar Desalination', emoji: '🌞' },
  { id: 'drought', label: 'Drought', emoji: '🏜️' },
  { id: 'flooding', label: 'Flooding', emoji: '🌧️' },
  { id: 'extreme_weather', label: 'Extreme Weather', emoji: '🌪️' },
  { id: 'other', label: 'Other', emoji: '🌍' },
];

// Loads categories from the database (admin-managed), falling back to the built-in taxonomy.
// Returns a unified format: { id, label, emoji }
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
            emoji: c.icon || '🌍',
          })));
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { categories, loading };
}