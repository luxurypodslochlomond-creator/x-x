import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import OfflineInformationCache from '@/components/shared/OfflineInformationCache';

export default function OfflineLibraryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 pt-24 lg:pt-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="text-white/60 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <OfflineInformationCache />

      </div>
    </div>
  );
}