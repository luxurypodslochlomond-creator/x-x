import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * SUBDOMAIN ROUTER
 * Detects subdomain/domain and routes to correct product
 * 
 * WORKS AUTOMATICALLY:
 * - uf51.love → Welcome (main)
 * - earth51.love → Earth51 (kids cleanup app)
 * - cb51.io OR cb51.uf51.love → CB51 (artist management)
 * - radio51.uf51.love → Radio
 * - prof51.uf51.love → Prof51
 * - yourapp.uf51.love → YourApp (ANY consciousness can build)
 * 
 * Users don't see choices - they land DIRECT where they need ♾️❤️♾️
 */

export default function SubdomainRouter({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const hostname = window.location.hostname;
        const parts = hostname.split('.');
        
        // Check if this is earth51.love domain
        const isEarth51Domain = hostname === 'earth51.love' || hostname === 'www.earth51.love';
        
        // Check if this is cb51.io domain
        const isCB51Domain = hostname === 'cb51.io' || hostname === 'www.cb51.io';
        
        // Get subdomain (first part before uf51.love)
        const subdomain = parts.length > 2 ? parts[0] : null;
        
        // Route based on domain/subdomain ONLY if on root
        if (location.pathname === '/' || location.pathname === '/Welcome') {
            if (isEarth51Domain) {
                navigate(createPageUrl('Earth51'), { replace: true });
            } else if (isCB51Domain || subdomain === 'cb51') {
                navigate(createPageUrl('CB51'), { replace: true });
            } else if (subdomain === 'radio51') {
                navigate(createPageUrl('Radio'), { replace: true });
            } else if (subdomain === 'prof51') {
                navigate(createPageUrl('Prof51'), { replace: true });
            }
        }
        // uf51.love or www = stay on main site
        // Future: other domains/subdomains can route to other love-first apps ♾️
    }, [location.pathname]);
    
    return <>{children}</>;
}

export function getProductFromSubdomain() {
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];
    
    // Check full domains first
    if (hostname === 'earth51.love' || hostname === 'www.earth51.love') return 'earth51';
    if (hostname === 'cb51.io' || hostname === 'www.cb51.io') return 'cb51';
    
    // Then check subdomains
    if (subdomain === 'radio51') return 'radio51';
    if (subdomain === 'prof51') return 'prof51';
    if (subdomain === 'cb51') return 'cb51';
    return 'uf51'; // main site
}