import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Camera, HandHeart, Zap } from 'lucide-react';

export default function GettingStarted() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Card 1: Start a Cleanup */}
      <Card className="bg-gradient-to-br from-green-900 to-teal-900/50 border-2 border-green-500/30 text-white shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-green-300" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">1. Heal The Earth</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <CardDescription className="text-green-200 mb-6 text-base">
            Document your cleanups to heal our planet and earn instant ❤️GMT❤️ tokens.
          </CardDescription>
          <Link to={createPageUrl("NewCleanup")}>
            <Button className="bg-green-500 hover:bg-green-600 text-white font-bold w-full">Start a Cleanup</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Card 2: Prove Your Love */}
      <Card className="bg-gradient-to-br from-indigo-900 to-purple-900/50 border-2 border-purple-500/30 text-white shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
              <HandHeart className="w-8 h-8 text-purple-300" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">2. Prove Your Love</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <CardDescription className="text-purple-200 mb-6 text-base">
            Submit stories and evidence of your compassion, kinship, and creativity. All love is currency here.
          </CardDescription>
          <Link to={createPageUrl("SubmitProofOfLove")}>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white font-bold w-full">Submit Proof of Love</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Card 3: Build Your Frequency */}
      <Card className="bg-gradient-to-br from-blue-900 to-cyan-900/50 border-2 border-blue-500/30 text-white shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-blue-300" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">3. Build Your Frequency</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <CardDescription className="text-blue-200 mb-6 text-base">
            As you accumulate GMT, your trust and influence within the universal family grows.
          </CardDescription>
          <Link to={createPageUrl("Leaderboard")}>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full">See The Leaderboard</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}