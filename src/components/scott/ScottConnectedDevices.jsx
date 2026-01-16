import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Smartphone, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function ScottConnectedDevices({ artistId }) {
  const queryClient = useQueryClient();

  // Fetch devices
  const { data: devices = [], isLoading } = useQuery({
    queryKey: ['extensionSessions', artistId],
    queryFn: async () => {
      if (!artistId) return [];
      const sessions = await base44.entities.ExtensionSession.filter({ artist_id: artistId });
      return sessions.filter(s => s.is_active);
    }
  });

  // Revoke device
  const revokeMutation = useMutation({
    mutationFn: async (sessionId) => {
      await base44.entities.ExtensionSession.update(sessionId, { is_active: false });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['extensionSessions'] });
    }
  });

  if (isLoading) {
    return <div className="text-gray-400 text-sm">Loading devices...</div>;
  }

  if (devices.length === 0) {
    return <div className="text-gray-400 text-sm">No connected devices yet</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {devices.map(device => (
        <div
          key={device.id}
          className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 flex items-start justify-between hover:border-cyan-500/60 transition-all"
        >
          <div className="flex gap-3 flex-1">
            <Smartphone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-white">{device.device_name || 'Unknown Device'}</p>
                {new Date(device.last_active) > new Date(Date.now() - 30 * 60000) && (
                  <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded text-xs text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Active
                  </div>
                )}
              </div>
              <p className="text-gray-400 text-xs mt-1">
                {device.region && `${device.region} • `}
                Last active: {format(new Date(device.last_active), 'MMM d, h:mm a')}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm('Remove this device?')) {
                revokeMutation.mutate(device.id);
              }
            }}
            disabled={revokeMutation.isPending}
            className="ml-3 p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </motion.div>
  );
}