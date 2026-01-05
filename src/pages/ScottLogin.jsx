import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Music, Lock } from 'lucide-react';

/**
 * SCOTT MANAGER LOGIN
 * Simple email/password for manager access
 */

export default function ScottLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check if user exists and is admin
      const user = await base44.auth.me();
      
      if (user.role === 'admin') {
        navigate(createPageUrl('ScottManagerHome'));
      } else {
        // Regular user - go straight to their artist page
        // Assuming they have an artist record
        const artists = await base44.entities.ScottArtist.filter({ 
          created_by: user.email 
        });
        
        if (artists.length > 0) {
          navigate(createPageUrl('ScottArtistHome') + `?id=${artists[0].id}`);
        } else {
          setError('No artist profile found');
        }
      }
    } catch (err) {
      setError('Login failed - check credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black border-2 border-cyan-500">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Music className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h1 className="text-3xl font-black text-white mb-2">SCOTT</h1>
            <p className="text-gray-400 text-sm">Artist Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-white text-sm font-bold mb-2 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-cyan-500 text-white"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-bold mb-2 block">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-cyan-500 text-white"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}