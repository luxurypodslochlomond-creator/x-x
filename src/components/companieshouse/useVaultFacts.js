import { useCallback, useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

// The filing needs the same handful of facts every time: the company number, the two
// Government Gateway user IDs, and the two directors' personal codes. They already live in
// the admin-only vault, so this reads them in rather than copying them into a page.
export default function useVaultFacts() {
  const [facts, setFacts] = useState(null);

  const load = useCallback(() => {
    base44.entities.SecureVault.list({ sort: 'sort_order', limit: 200 })
      .then((page) => {
        const rows = Array.isArray(page) ? page : (page?.items || []);
        setFacts(Object.fromEntries(rows.map((row) => [row.label, row.value])));
      })
      .catch(() => setFacts({}));
  }, []);

  useEffect(load, [load]);

  return [facts, load];
}