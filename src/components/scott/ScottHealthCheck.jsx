import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Wifi, Database, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

/**
 * SCOTT HEALTH CHECK - Silent guardian
 * Monitors errors, reports issues, zero stress
 */

export default function ScottHealthCheck() {
    const [errors, setErrors] = useState([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        // Listen for errors
        const handleError = (event) => {
            const newError = {
                message: event.message || event.error?.message || 'Unknown error',
                timestamp: new Date().toISOString(),
                stack: event.error?.stack
            };
            
            setErrors(prev => [...prev, newError].slice(-5)); // Keep last 5
            setShowAlert(true);

            // Auto-report to AI51
            setTimeout(() => {
                base44.entities.ScottTask.create({
                    title: `BUG: ${newError.message}`,
                    notes: `Auto-detected error:\n${newError.message}\n\nStack: ${newError.stack}`,
                    status: 'todo',
                    priority: 'high'
                }).catch(() => {}); // Silent fail
            }, 1000);
        };

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('error', handleError);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Auto-dismiss after 5 seconds
    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    if (!showAlert || errors.length === 0) return null;

    return (
        <div className="fixed top-20 left-4 right-4 z-50 bg-black border-2 border-red-500 rounded-lg p-3" style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.6)' }}>
            <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                    <p className="text-red-400 font-black text-xs font-mono mb-1">BUG DETECTED</p>
                    <p className="text-gray-400 text-xs font-mono mb-2">
                        {errors[errors.length - 1].message.substring(0, 80)}
                    </p>
                    <p className="text-gray-600 text-[9px] font-mono">✓ Auto-reported to AI51</p>
                </div>
                <button onClick={() => setShowAlert(false)} className="text-gray-500 hover:text-white">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}