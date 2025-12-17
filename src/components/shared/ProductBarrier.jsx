import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Shield, Heart } from 'lucide-react';

/**
 * PRODUCT BARRIER
 * 
 * ONE account = access to ALL products (radio51, prof51, cb51)
 * BUT can filter by role/group for relevant content
 * 
 * White label = separate subdomain + brand + users
 */

export default function ProductBarrier({ 
    product, // 'prof51', 'cb51', 'radio51', 'uf51'
    children,
    requiredRole = null, // 'student', 'athlete', 'musician', 'manager'
    whiteLabel = null // 'university-name', 'sports-team', etc
}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        checkAccess();
    }, []);

    const checkAccess = async () => {
        try {
            const currentUser = await base44.auth.me();
            setUser(currentUser);

            // ONE UF51 account = access to everything
            // No barriers unless white label
            if (!whiteLabel && !requiredRole) {
                setHasAccess(true);
                setLoading(false);
                return;
            }

            // Check white label
            if (whiteLabel) {
                const userWhiteLabel = currentUser.white_label || null;
                if (userWhiteLabel === whiteLabel) {
                    setHasAccess(true);
                } else {
                    setHasAccess(false);
                }
                setLoading(false);
                return;
            }

            // Check role
            if (requiredRole) {
                const userRole = currentUser.product_role || null;
                if (userRole === requiredRole) {
                    setHasAccess(true);
                } else {
                    // Still allow access but maybe show different content
                    setHasAccess(true);
                }
                setLoading(false);
                return;
            }

            setHasAccess(true);
        } catch (error) {
            setUser(null);
            setHasAccess(false);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <Heart className="w-12 h-12 text-pink-400" />
                </motion.div>
            </div>
        );
    }

    if (!hasAccess && whiteLabel) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white flex items-center justify-center p-6">
                <div className="max-w-md text-center space-y-4">
                    <Shield className="w-16 h-16 text-red-400 mx-auto" />
                    <h1 className="text-2xl font-black">Access Restricted</h1>
                    <p className="text-gray-400">
                        This is a white label instance for {whiteLabel}
                    </p>
                    <p className="text-sm text-gray-500">
                        If you should have access, contact your administrator
                    </p>
                </div>
            </div>
        );
    }

    // Pass user and role to children
    return React.cloneElement(children, { user, userRole: user?.product_role });
}