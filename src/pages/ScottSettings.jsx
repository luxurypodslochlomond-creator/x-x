import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Settings, Lock, Smartphone, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import ScottExtensionSettings from '@/components/scott/ScottExtensionSettings';
import ScottConnectedDevices from '@/components/scott/ScottConnectedDevices';
import ScottPushNotifications from '@/components/scott/ScottPushNotifications';
import CB51SecuritySettings from '@/components/scott/CB51SecuritySettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ScottSettings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        navigate(createPageUrl('CB51Login'));
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [navigate]);

  if (loading) return <div className="p-6 text-gray-400">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-black text-white">Settings</h1>
          </div>
          <p className="text-gray-400">Manage extension, devices & security</p>
        </motion.div>

        <Tabs defaultValue="security" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black border-2 border-cyan-500">
            <TabsTrigger value="security" className="data-[state=active]:bg-cyan-600 flex items-center gap-2 text-xs">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="extension" className="data-[state=active]:bg-cyan-600 flex items-center gap-2 text-xs">
              <Lock className="w-4 h-4" />
              Extension
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-cyan-600 flex items-center gap-2 text-xs">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="devices" className="data-[state=active]:bg-cyan-600 flex items-center gap-2 text-xs">
              <Smartphone className="w-4 h-4" />
              Devices
            </TabsTrigger>
          </TabsList>

          <TabsContent value="security">
            <CB51SecuritySettings />
          </TabsContent>

          <TabsContent value="extension">
            <ScottExtensionSettings user={user} />
          </TabsContent>

          <TabsContent value="notifications">
            <ScottPushNotifications />
          </TabsContent>

          <TabsContent value="devices">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Connected Devices</h3>
                <p className="text-gray-400 text-sm mb-4">Remove devices to revoke access instantly</p>
              </div>
              <ScottConnectedDevices artistId={user.id} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}