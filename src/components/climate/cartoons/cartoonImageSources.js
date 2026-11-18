// Byte-for-byte display copies of the permitted CEEW works. Original source URLs,
// artist names and credits remain on the records; these copies avoid broken hotlinks.
const files = 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/';
const displayCopies = {
  'https://www.ceew.in/sites/default/files/tale-of-2-cities.webp': '454ebf28e_ceew-tale-of-two-cities.webp',
  'https://www.ceew.in/sites/default/files/25mar-26-woee.webp': '2f7fb4783_ceew-the-way-to-live-longer.webp',
  'https://www.ceew.in/sites/default/files/keeping-it-cool.webp': '8839d4bd8_ceew-keeping-it-cool.webp',
  'https://www.ceew.in/sites/default/files/moonwalk.webp': 'ccc5a8443_ceew-solar-thriller.webp',
  'https://www.ceew.in/sites/default/files/el-nino-v1a.webp': '80abd1e06_ceew-the-cooler-influencer.webp',
  'https://www.ceew.in/sites/default/files/woe-cartoon-6thjuly.webp': '0586af1b8_ceew-the-transformation-nobody-saw-coming.webp',
  'https://www.ceew.in/sites/default/files/woe-cartoon-football.jpeg': '8a0c44b4c_ceew-the-game-s-gone-green.jpg',
  'https://www.ceew.in/sites/default/files/woe-cartoon-approved.webp': '0f6edbedb_ceew-hidden-in-plain-sight.webp',
  'https://www.ceew.in/sites/default/files/Hide%20and%20seek_0.webp': '979a9f91d_ceew-heat-s-got-nowhere-to-hide.webp',
  'https://www.ceew.in/sites/default/files/rain-check-cartoon.webp': 'f89d852cc_ceew-rain-check.webp',
  'https://www.ceew.in/sites/default/files/revolution-ev-olution.webp': '20a856ce8_ceew-revolution-ev-olution.webp',
  'https://www.ceew.in/sites/default/files/love-at-first-light-24sep26-web-ready.webp': 'da60a49a0_ceew-love-at-first-light.webp',
  'https://www.ceew.in/sites/default/files/clean-energy-race-final.webp': 'ded52924e_ceew-the-energy-relay.webp',
};
export default function cartoonImageSource(cartoon) {
  const copy = displayCopies[cartoon.image_url];
  return copy ? files + copy : cartoon.display_image_url || cartoon.image_url;
}