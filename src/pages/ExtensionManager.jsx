import React, { useState, useEffect } from 'react';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Code, QrCode, Shield, Mail, FileText, Music, Heart, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export default function ExtensionManager() {
  const [user, setUser] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

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
  
  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Create ZIP with extension files
      const response = await fetch('/extension-files.zip');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cb51-email-extension.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
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
          <h1 className="text-5xl font-black text-white mb-3">CB51 Extension Manager</h1>
          <p className="text-gray-400 text-lg">
            Smart email scanner for artists, managers, and creators • Extracts gigs, contracts, invoices, and more
          </p>
        </motion.div>

        <Tabs defaultValue="download" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-black border-2 border-cyan-500">
            <TabsTrigger value="download" className="data-[state=active]:bg-cyan-600">📥 Download</TabsTrigger>
            <TabsTrigger value="code" className="data-[state=active]:bg-cyan-600">💻 Code</TabsTrigger>
            <TabsTrigger value="docs" className="data-[state=active]:bg-cyan-600">📖 Docs</TabsTrigger>
          </TabsList>

          {/* DOWNLOAD TAB */}
          <TabsContent value="download">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Quick Download Card */}
              <Card className="bg-black border-2 border-cyan-500">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <Download className="w-6 h-6 text-cyan-400" />
                    Get the Extension
                  </CardTitle>
                  <CardDescription>Works with Gmail, Outlook, Hotmail + more</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 h-16 text-lg font-black gap-3"
                  >
                    {downloading ? (
                      <>
                        <span className="animate-spin">⚙️</span>
                        Preparing ZIP...
                      </>
                    ) : (
                      <>
                        <Download className="w-6 h-6" />
                        Download ZIP (Ready to Install)
                      </>
                    )}
                  </Button>

                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 space-y-3">
                    <h4 className="text-cyan-400 font-bold">Installation Steps:</h4>
                    <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                      <li>Download ZIP file above</li>
                      <li>Extract to a folder</li>
                      <li>Open Chrome → chrome://extensions/</li>
                      <li>Enable "Developer mode" (top-right)</li>
                      <li>Click "Load unpacked" → select folder</li>
                      <li>Done! Icon appears in top-right</li>
                    </ol>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex gap-2">
                      <Shield className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <div className="text-green-300 text-sm">
                        <p className="font-bold mb-1">Privacy First</p>
                        <p>Runs locally on your device. Zero tracking. You control what gets sent to CB51.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Share Extension Card */}
              <Card className="bg-black border-2 border-pink-500">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <Copy className="w-6 h-6 text-pink-400" />
                    Share with Team
                  </CardTitle>
                  <CardDescription>Share download link</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-400 text-sm">Copy this link to share:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={extensionUrl}
                      readOnly
                      className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-300 text-sm font-mono"
                    />
                    <Button
                      onClick={handleCopyUrl}
                      className={copied ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="space-y-2 pt-4">
                    <p className="text-gray-300 text-sm font-bold">Perfect for:</p>
                    <ul className="text-gray-400 text-xs space-y-1">
                      <li>✓ Team distribution</li>
                      <li>✓ Artist onboarding</li>
                      <li>✓ Band management</li>
                      <li>✓ White-label deployment</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* What It Extracts */}
              <Card className="bg-black border-2 border-purple-500">
                <CardHeader>
                  <CardTitle className="text-white">What Gets Extracted</CardTitle>
                  <CardDescription>Reads emails + all attachments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Music className="w-5 h-5 text-pink-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-bold text-white">Gig Offers</p>
                          <p className="text-gray-400 text-sm">Venue, date, fee, promoter contact</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-bold text-white">Contracts & Invoices</p>
                          <p className="text-gray-400 text-sm">PDFs, Word, images automatically parsed</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-bold text-white">Contact Info</p>
                          <p className="text-gray-400 text-sm">Names, emails, phone numbers</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-bold text-white">Excel & Sheets</p>
                          <p className="text-gray-400 text-sm">CSV, Excel, Google Sheets data</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-bold text-white">Bills & Receipts</p>
                          <p className="text-gray-400 text-sm">Amount, date, vendor extracted</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-bold text-white">Any File Type</p>
                          <p className="text-gray-400 text-sm">Videos, audio, images, creative files</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* CODE TAB */}
          <TabsContent value="code">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="bg-black border-2 border-green-500">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <Code className="w-6 h-6 text-green-400" />
                    Open Source Code
                  </CardTitle>
                  <CardDescription>View & customize the extension</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-green-300 text-sm mb-4">
                      All extension code is open source. You can view, fork, and customize it.
                    </p>
                    <Button
                      onClick={() => setShowCode(!showCode)}
                      className="bg-green-600 hover:bg-green-700 gap-2"
                    >
                      <Code className="w-4 h-4" />
                      {showCode ? 'Hide Code' : 'View Code Structure'}
                    </Button>
                  </div>

                  <AnimatePresence>
                    {showCode && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-auto max-h-96 p-4 font-mono text-xs text-gray-300">
                          <pre>{`extension/
├── manifest.json          # Chrome permissions & config
├── popup.html             # Extension popup UI
├── popup.js               # Popup logic
├── background.js          # Email listener & processor
├── content.js             # Gmail/Outlook integration
├── scanner.js             # AI extraction engine
├── storage.js             # Local storage handler
└── styles.css             # UI styling

Key Features:
• manifest.json: Requests email read access
• scanner.js: Uses CB51 AI51 to extract data
• storage.js: Encrypts sensitive data locally
• popup.js: Shows extraction preview
• background.js: Auto-scans new emails

Privacy:
• No data leaves device until user approves
• Local encryption of drafts
• One-click deletion of all local copies
• GDPR/privacy compliant logging`}</pre>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-white font-bold">Customize:</h4>
                          <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                            <li>Change extraction rules in <code className="bg-gray-900 px-2 py-1 rounded text-cyan-400">scanner.js</code></li>
                            <li>Modify popup UI in <code className="bg-gray-900 px-2 py-1 rounded text-cyan-400">popup.html</code></li>
                            <li>Add custom integrations in <code className="bg-gray-900 px-2 py-1 rounded text-cyan-400">background.js</code></li>
                            <li>White-label with your branding</li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    className="w-full bg-gray-700 hover:bg-gray-600 gap-2"
                    onClick={() => window.open('https://github.com/cb51/email-extension', '_blank')}
                  >
                    View Full GitHub Repo
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* DOCS TAB */}
          <TabsContent value="docs">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="bg-black border-2 border-amber-500">
                <CardHeader>
                  <CardTitle className="text-white">Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-amber-400 font-bold mb-3">Data Deletion & Privacy</h4>
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-gray-300 text-sm space-y-2">
                        <p>✓ <strong>Delete on Request:</strong> Users can request all extracted data removed from CB51</p>
                        <p>✓ <strong>Local First:</strong> All data encrypted locally before any upload</p>
                        <p>✓ <strong>GDPR Compliant:</strong> Full deletion logs, audit trails</p>
                        <p>✓ <strong>User Control:</strong> Preview every extraction before syncing</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-cyan-400 font-bold mb-3">Installation & Support</h4>
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 text-gray-300 text-sm space-y-2">
                        <p>📖 <strong>Troubleshooting:</strong> <code className="bg-gray-900 px-2 py-1 rounded">chrome://extensions/ → Debug background page</code></p>
                        <p>🔧 <strong>Development:</strong> Fork the GitHub repo and customize</p>
                        <p>💬 <strong>Support:</strong> Email support@cb51.com or use in-app help</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-green-400 font-bold mb-3">White-Label Setup</h4>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-gray-300 text-sm space-y-2">
                        <p>✓ Custom branding (logo, colors, icons)</p>
                        <p>✓ Branded installation guide</p>
                        <p>✓ Your own support email</p>
                        <p>✓ Custom extraction rules</p>
                        <p>Contact: partnerships@cb51.com</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-pink-400 font-bold mb-3">FAQ</h4>
                      <div className="space-y-3 text-gray-300 text-sm">
                        <div>
                          <p className="font-bold text-pink-300">Is my Gmail data safe?</p>
                          <p className="text-gray-400">Yes. Extension runs locally. Only extracts what you approve. No full email storage.</p>
                        </div>
                        <div>
                          <p className="font-bold text-pink-300">Can I use it offline?</p>
                          <p className="text-gray-400">Extraction works offline. Syncs to CB51 when back online.</p>
                        </div>
                        <div>
                          <p className="font-bold text-pink-300">Works with Outlook?</p>
                          <p className="text-gray-400">Yes. Gmail, Outlook, Hotmail, and any email provider.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
          <p className="text-gray-400">Built with ♾️❤️ for artists, managers, and creators</p>
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