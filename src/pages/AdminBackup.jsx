import React, { useState } from 'react';
import { User } from '@/entities/User';
import { Cleanup } from '@/entities/Cleanup';
import { ProofOfLove } from '@/entities/ProofOfLove';
import { Transaction } from '@/entities/Transaction';
import { UniversalLoveTreasury } from '@/entities/UniversalLoveTreasury';
import { MissionContribution } from '@/entities/MissionContribution';
import { LoveNote } from '@/entities/LoveNote';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Download, Database, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminBackup() {
  const [isLoading, setIsLoading] = useState(false);
  const [backupStatus, setBackupStatus] = useState(null);

  const handleBackupAll = async () => {
    setIsLoading(true);
    setBackupStatus(null);

    try {
      const [users, cleanups, proofOfLove, transactions, treasury, missions, loveNotes] = await Promise.all([
        User.list('-created_date', 10000),
        Cleanup.list('-created_date', 10000),
        ProofOfLove.list('-created_date', 10000),
        Transaction.list('-created_date', 10000),
        UniversalLoveTreasury.list(),
        MissionContribution.list('-created_date', 10000),
        LoveNote.list('-created_date', 10000)
      ]);

      const backup = {
        timestamp: new Date().toISOString(),
        version: '1.0',
        protocol: 'COOLASFUCK.GMT',
        data: {
          users,
          cleanups,
          proof_of_love: proofOfLove,
          transactions,
          treasury,
          mission_contributions: missions,
          love_notes: loveNotes
        },
        stats: {
          total_users: users.length,
          total_cleanups: cleanups.length,
          total_proof_of_love: proofOfLove.length,
          total_transactions: transactions.length,
          total_mission_contributions: missions.length,
          total_love_notes: loveNotes.length
        }
      };

      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `uf51_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

      setBackupStatus({
        success: true,
        message: 'Backup complete! File downloaded.',
        stats: backup.stats
      });
    } catch (error) {
      setBackupStatus({
        success: false,
        message: `Backup failed: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-block p-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-2xl">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            ADMIN BACKUP SYSTEM
          </h1>
          <p className="text-xl text-gray-400">LOYALTY51.GMT - Trust, but verify.</p>
        </motion.header>

        <Card className="bg-black/60 backdrop-blur-lg border-2 border-cyan-500/50">
          <CardHeader>
            <CardTitle className="text-2xl text-cyan-300 flex items-center gap-2">
              <Database className="w-6 h-6" />
              Complete Data Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-300">
              Export ALL data from the live UF51.LOVE site as a single JSON file. This includes all entities, 
              users, cleanups, transactions, and more. Store this backup locally in case anything goes wrong.
            </p>

            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-yellow-300 mb-1">Security Note</p>
                  <p className="text-sm text-gray-300">
                    This backup contains user emails and personal data. Store it securely. Never share publicly.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleBackupAll}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold py-6 text-lg"
            >
              {isLoading ? (
                <>
                  <Database className="w-5 h-5 mr-2 animate-pulse" />
                  Exporting Data...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download Complete Backup
                </>
              )}
            </Button>

            {backupStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl p-4 ${backupStatus.success ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'}`}
              >
                <div className="flex items-start gap-3">
                  {backupStatus.success ? (
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className={`font-bold ${backupStatus.success ? 'text-green-300' : 'text-red-300'}`}>
                      {backupStatus.message}
                    </p>
                    {backupStatus.stats && (
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-300">
                        <p>Users: {backupStatus.stats.total_users}</p>
                        <p>Cleanups: {backupStatus.stats.total_cleanups}</p>
                        <p>Acts of Love: {backupStatus.stats.total_proof_of_love}</p>
                        <p>Transactions: {backupStatus.stats.total_transactions}</p>
                        <p>Missions: {backupStatus.stats.total_mission_contributions}</p>
                        <p>Love Notes: {backupStatus.stats.total_love_notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-purple-300">Backup Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-300">
            <p>✅ Download backup weekly (every Friday or Sunday)</p>
            <p>✅ Store in multiple locations (local drive + cloud + external HD)</p>
            <p>✅ Name files with date: <code className="text-cyan-400">uf51_backup_2025-01-10.json</code></p>
            <p>✅ Keep last 4 weeks of backups minimum</p>
            <p>✅ Never commit backups to public GitHub repos</p>
            <p>✅ Test restore process occasionally (can you load the JSON?)</p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}