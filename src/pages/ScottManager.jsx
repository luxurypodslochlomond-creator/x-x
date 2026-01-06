import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * REDIRECT TO CB51
 * Keeping this for old bookmarks/links
 */

export default function ScottManager() {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to CB51 (old bookmarks still work)
        navigate(createPageUrl('CB51'));
    }, [navigate]);

    return null;
}