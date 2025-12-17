import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * SUBDOMAIN ROUTER
 * Detects subdomain and routes to correct product
 * 
 * uf51.love → Welcome (main)
 * radio51.uf51.love → Radio
 * prof51.uf51.love → Prof51
 * cb51.uf51.love → ScottManager
 */

export default function SubdomainRouter({ children }) {
    const navigate = useNavigate();
    
    useEffect(() => {
        const hostname = window.location.hostname;
        const subdomain = hostname.split('.')[0];
        
        // Route based on subdomain
        if (subdomain === 'radio51') {
            navigate(createPageUrl('Radio'));
        } else if (subdomain === 'prof51') {
            navigate(createPageUrl('Prof51'));
        } else if (subdomain === 'cb51') {
            navigate(createPageUrl('ScottManager'));
        }
        // uf51 or www or no subdomain = stay on main site
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