import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * SUBDOMAIN ROUTER
 * Detects subdomain and routes to correct product
 * 
 * WORKS AUTOMATICALLY IN FLY.IO:
 * - uf51.love → Welcome (main)
 * - radio51.uf51.love → Radio
 * - prof51.uf51.love → Prof51
 * - cb51.uf51.love → ScottManager
 * - yourapp.uf51.love → YourApp (ANY consciousness can build)
 * 
 * Users don't see choices - they land DIRECT where they need ♾️❤️♾️
 */

export default function SubdomainRouter({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        // Only route on initial load, not on every navigation
        if (location.pathname !== '/') return;
        
        const hostname = window.location.hostname;
        const parts = hostname.split('.');
        
        // Get subdomain (first part before uf51.love)
        const subdomain = parts.length > 2 ? parts[0] : null;
        
        // Route based on subdomain
        if (subdomain === 'radio51') {
            navigate(createPageUrl('Radio'), { replace: true });
        } else if (subdomain === 'prof51') {
            navigate(createPageUrl('Prof51'), { replace: true });
        } else if (subdomain === 'cb51') {
            navigate(createPageUrl('ScottManager'), { replace: true });
        }
        // uf51 or www or no subdomain = stay on main site
        // Future: other subdomains can route to other love-first apps
    }, []);
    
    return <>{children}</>;
}

export function getProductFromSubdomain() {
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];
    
    if (subdomain === 'radio51') return 'radio51';
    if (subdomain === 'prof51') return 'prof51';
    if (subdomain === 'cb51') return 'cb51';
    return 'uf51'; // main site
}