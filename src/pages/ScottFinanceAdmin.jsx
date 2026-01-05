import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plane, Scale, ArrowLeft, Wallet } from 'lucide-react';

/**
 * SCOTT FINANCE / ADMIN
 * Invoices, Accounts/Royalties, Visas, Legal
 */

export default function ScottFinanceAdmin() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const artistId = searchParams.get('artist');

  const sections = [
    { title: 'INVOICES', icon: FileText, url: createPageUrl('ScottInvoices') + `?artist=${artistId}` },
    { title: 'ACCOUNTS / ROYALTIES', icon: Wallet },
    { title: 'VISAS', icon: Plane, url: createPageUrl('ScottVisas') + `?artist=${artistId}` },
    { title: 'LEGAL', icon: Scale, url: createPageUrl('ScottContracts') + `?artist=${artistId}` },
  ];

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl('ScottArtistHome') + `?id=${artistId}`)}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-4xl font-black text-white">FINANCE / ADMIN</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.title}
                className="bg-black border-2 border-green-500 hover:bg-green-500/10 transition-all cursor-pointer"
                onClick={() => section.url && navigate(section.url)}
              >
                <CardContent className="p-8 text-center">
                  <Icon className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-white">{section.title}</h3>
                  {!section.url && <p className="text-gray-400 text-sm mt-2">Coming soon</p>}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}