import { prefetchPath } from '@/lib/routePrefetch';

// Run before the router downloads, not in an effect after it mounts.
// Only the address being opened is loaded; this is not background route warming.
const RECORD_PATH = /^\/(?:Climate[^/]*|AdminClimate[^/]*|CustodianRoom|TogetherChangeClimate|XEqualsX(?:Notes)?|ExtractionProofCovenant|OpenSourceDeclaration|Studio)(?:\/|$)/i;
const STANDALONE = /^\/ClimateCartoons\/(?:Sheet|Francis|Exhibition)(?:\/|$)/i;

export default function preloadEntry(pathname) {
  prefetchPath(pathname === '/' ? '/Welcome' : pathname);

  if (RECORD_PATH.test(pathname) && !STANDALONE.test(pathname)) {
    import('@/components/climate/ClimateLayout').catch(() => {});
  }
  if (/^\/CustodianRoom\/?$/i.test(pathname)) prefetchPath('/ClimateKeeperRoom');
  if (/^\/(?:Sorted[^/]*|Family51)\/?$/i.test(pathname)) {
    import('@/components/family51/SortedLayout').catch(() => {});
  }
  if (/^\/(?:Welcome)?$/i.test(pathname)) {
    import('@/Layout.jsx').catch(() => {});
  }
}