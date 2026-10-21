import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { offlineClimatePhotos, savedClimatePhotos, saveClimatePhotos, storeClimatePhotos } from '@/components/climate/climatePhotoCache';

const EMPTY = [];
export default function useClimatePhotos() {
  const [offline, setOffline] = useState(!navigator.onLine);
  const [localPhotos, setLocalPhotos] = useState(null);
  const { data, isPending, isError } = useQuery({
    queryKey: ['climatePhotos', 'published'],
    initialData: () => savedClimatePhotos().length ? savedClimatePhotos() : undefined,
    initialDataUpdatedAt: 0,
    staleTime: 60000,
    refetchOnWindowFocus: false,
    retry: false,
    queryFn: async () => {
      const page = await base44.entities.ClimatePhoto.filter({ status: 'published' }, { sort: 'sort_order', limit: 40 });
      const photos = page.items ?? page;
      saveClimatePhotos(photos);
      void storeClimatePhotos(photos);
      return photos;
    },
  });
  const photos = data || EMPTY;
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); };
  }, []);
  useEffect(() => {
    if (!offline) { setLocalPhotos(null); return; }
    let alive = true;
    let urls = [];
    offlineClimatePhotos(photos).then(result => {
      urls = result.flatMap(photo => photo.display_url ? [photo.display_url] : []);
      if (alive) setLocalPhotos(result);
      else urls.forEach(url => URL.revokeObjectURL(url));
    });
    return () => { alive = false; urls.forEach(url => URL.revokeObjectURL(url)); };
  }, [offline, photos]);
  return { photos: offline && localPhotos ? localPhotos : photos, loading: isPending && !offline, error: isError || (offline && !photos.length) };
}