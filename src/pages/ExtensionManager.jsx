import React, { useState, useEffect } from 'react';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Code, Shield, Mail, FileText, Zap, Copy, CheckCircle, AlertCircle, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export default function ExtensionManager() {
  const [user, setUser] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMobile(/iphone|ipad|android/.test(userAgent));
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch {
        setUser(null);
      }
    };
    loadUser();
  }, []);

  const extensionUrl = `${window.location.origin}${createPageUrl('ExtensionManager')}?download=true`;
  
  const handleDownloadFile = async (filename) => {
    try {
      const response = await fetch(`/api/functions/serveExtensionFiles?file=${filename}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      alert(`Download failed: ${filename}`);
      console.error(error);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Download individual files
      const files = ['manifest.json', 'background.js', 'content.js', 'popup.html', 'popup.js', 'popup.css'];
      for (const file of files) {
        await handleDownloadFile(file);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error) {
      alert('Download failed. Check console.');
      console.error(error);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(extensionUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-black font-mono text-white mb-3">CB51 EXTENSION MANAGER</h1>
          <p className="text-gray-400 text-lg">
            Smart email scanner for artists, managers, and creators • Extracts gigs, contracts, invoices, and more
          </p>
        </motion.div>

        <Tabs defaultValue="download" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-black border-4 border-cyan-500 p-1 gap-2">
             <TabsTrigger value="download" className="data-[state=active]:bg-cyan-500 data-[state=inactive]:bg-gray-900 font-mono font-black text-white">DOWNLOAD</TabsTrigger>
             <TabsTrigger value="code" className="data-[state=active]:bg-green-500 data-[state=inactive]:bg-gray-900 font-mono font-black text-white">CODE</TabsTrigger>
             <TabsTrigger value="docs" className="data-[state=active]:bg-amber-500 data-[state=inactive]:bg-gray-900 font-mono font-black text-white">DOCS</TabsTrigger>
           </TabsList>

          {/* DOWNLOAD TAB */}
          <TabsContent value="download">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Mobile Warning */}
              {isMobile && (
                <div className="bg-amber-500 text-black p-4 rounded-lg font-mono font-black">
                  <p className="mb-2">DESKTOP ONLY</p>
                  <p className="text-sm font-normal">Chrome extensions work on desktop. Use CB51 web app on iPhone instead.</p>
                </div>
              )}

              {/* Quick Download Card */}
              <div className="bg-black border-4 border-cyan-500 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Download className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-2xl font-mono font-black text-white">GET THE EXTENSION</h2>
                </div>
                <p className="text-gray-400 text-sm">Works with Gmail, Outlook, Hotmail & more</p>

                <Button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-black h-14 text-base font-black gap-3 font-mono"
                >
                  {downloading ? (
                     <>
                       <span className="animate-spin">LOADING</span>
                     </>
                  ) : (
                     <>
                       DOWNLOAD ZIP
                     </>
                  )}
                </Button>

                <div className="bg-cyan-500 text-black p-3 space-y-2 font-mono text-sm font-black">
                  <p>INSTALLATION (3 STEPS)</p>
                  <ol className="text-xs font-normal space-y-1 list-decimal list-inside">
                    <li>Click download above (6 files)</li>
                    <li>chrome://extensions/ → Enable Developer mode</li>
                    <li>Drag folder into Chrome → Done</li>
                  </ol>
                </div>

                <div className="bg-green-500 text-black p-3 font-mono font-black">
                  <p className="mb-1">PRIVACY FIRST</p>
                  <p className="text-xs font-normal">Runs locally. Zero tracking. You control everything.</p>
                </div>
              </div>

              {/* Share Extension Card */}
              <div className="bg-black border-4 border-pink-500 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Copy className="w-6 h-6 text-pink-400" />
                  <h2 className="text-2xl font-mono font-black text-white">SHARE WITH TEAM</h2>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={extensionUrl}
                    readOnly
                    className="flex-1 bg-gray-900 border-2 border-gray-700 px-3 py-2 text-gray-300 text-sm font-mono"
                  />
                  <Button
                    onClick={handleCopyUrl}
                    className={`font-black font-mono ${copied ? 'bg-green-500 text-black' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                  >
                    {copied ? 'COPIED' : 'COPY'}
                  </Button>
                </div>

                <div className="bg-pink-500 text-black p-3 font-mono text-sm font-black">
                  <p className="mb-2">PERFECT FOR</p>
                  <ul className="text-xs font-normal space-y-1">
                    <li>Team distribution</li>
                    <li>Artist onboarding</li>
                    <li>Band management</li>
                    <li>White-label deployment</li>
                  </ul>
                </div>
              </div>

              {/* What It Extracts */}
              <div className="bg-black border-4 border-purple-500 p-6 space-y-4">
                <h2 className="text-2xl font-mono font-black text-white">WHAT GETS EXTRACTED</h2>
                <p className="text-gray-400 text-sm">Reads emails + all attachments</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-white text-sm">Gig Offers</p>
                        <p className="text-gray-400 text-xs">Venue, date, fee, promoter contact</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-white text-sm">Contracts & Invoices</p>
                        <p className="text-gray-400 text-xs">PDFs, Word, images parsed</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-white text-sm">Contact Info</p>
                        <p className="text-gray-400 text-xs">Names, emails, phone numbers</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-white text-sm">Excel & Sheets</p>
                        <p className="text-gray-400 text-xs">CSV, Excel, Google Sheets</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-white text-sm">Bills & Receipts</p>
                        <p className="text-gray-400 text-xs">Amount, date, vendor extracted</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Download className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-white text-sm">Any File Type</p>
                        <p className="text-gray-400 text-xs">Videos, audio, images, files</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* CODE TAB */}
          <TabsContent value="code">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-black border-4 border-green-500 p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-6 h-6 text-green-400" />
                  <h2 className="text-2xl font-mono font-black text-white">OPEN SOURCE CODE</h2>
                </div>
                <p className="text-gray-400 text-sm mb-4">View & customize the extension</p>

                <div className="bg-green-500 text-black p-3 font-mono text-xs font-black mb-4">
                  <p className="mb-2">All code is open source. View, fork, and customize it.</p>
                  <Button
                    onClick={() => setShowCode(!showCode)}
                    className="bg-green-700 hover:bg-green-800 text-white font-mono font-black"
                  >
                    {showCode ? 'HIDE CODE' : 'VIEW CODE'}
                  </Button>
                </div>

                <AnimatePresence>
                  {showCode && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <div className="bg-gray-900 border border-gray-700 overflow-auto max-h-96 p-4 font-mono text-xs text-gray-300">
                        <pre>{`extension/
              ├── manifest.json
              ├── popup.html
              ├── popup.js
              ├── background.js
              ├── content.js
              ├── scanner.js
              ├── storage.js
              └── styles.css

              All code open source. 
              View, fork, customize.`}</pre>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-white font-bold font-mono">CUSTOMIZE</h4>
                        <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
                          <li>Change extraction rules in scanner.js</li>
                          <li>Modify popup UI in popup.html</li>
                          <li>Add custom integrations in background.js</li>
                          <li>White-label with your branding</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-mono font-black"
                  onClick={() => window.open('https://github.com/cb51/email-extension', '_blank')}
                >
                  GITHUB REPO
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          {/* DOCS TAB */}
          <TabsContent value="docs">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-black border-4 border-amber-500 p-6 space-y-4">
                <h2 className="text-2xl font-mono font-black text-white">DOCUMENTATION</h2>

                <h3 className="text-cyan-400 font-bold font-mono">DATA DELETION & PRIVACY</h3>
                <p className="text-gray-300 text-sm">Delete on request • Local encryption • GDPR compliant • Full user control</p>

                <h3 className="text-cyan-400 font-bold font-mono">INSTALLATION & SUPPORT</h3>
                <p className="text-gray-300 text-sm">Debug via chrome://extensions/ • Fork on GitHub • support@cb51.com</p>

                <h3 className="text-cyan-400 font-bold font-mono">WHITE-LABEL SETUP</h3>
                <p className="text-gray-300 text-sm">Custom branding • Installation guides • Your support email • partnerships@cb51.com</p>

                <h3 className="text-cyan-400 font-bold font-mono">FAQ</h3>
                <div className="text-gray-300 text-sm space-y-1">
                  <p><strong>Gmail data safe?</strong> Yes. Runs locally. You approve every extraction.</p>
                  <p><strong>Works offline?</strong> Yes. Syncs when back online.</p>
                  <p><strong>Outlook compatible?</strong> Yes. All email providers supported.</p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center space-y-4 border-t border-gray-700 pt-8"
        >
          <p className="text-gray-400 font-mono">Built with love for artists managers and creators</p>
          <div className="flex justify-center gap-4 text-sm">
            <a href="https://cb51.com" className="text-cyan-400 hover:text-cyan-300">Learn More</a>
            <span className="text-gray-600">•</span>
            <a href="mailto:support@cb51.com" className="text-cyan-400 hover:text-cyan-300">Support</a>
            <span className="text-gray-600">•</span>
            <a href={createPageUrl('PrivacyPolicy')} className="text-cyan-400 hover:text-cyan-300">Privacy</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}