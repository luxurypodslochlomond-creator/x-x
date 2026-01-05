import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * REDIRECT TO NEW ARTIST HOME STRUCTURE
 * Based on Scott's floor diagrams
 */

export default function ScottArtist() {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    useEffect(() => {
        if (!artistId) {
            navigate(createPageUrl('ScottManager'));
        } else {
            navigate(createPageUrl(`ScottArtistHome?id=${artistId}`));
        }
    }, [artistId, navigate]);

    return null;
}