// Editorial summaries checked against the linked sources, 20 November 2026.
// References are not contributions, endorsements, or claims of climate activism.
const AWARD_2026 = 'https://freedomcartoonists.com/international-cartoonists-award/2026-award/';

export const WORLD_LINEAGE = [
  {
    // Brian, 20 November: "ancient theologian … you sure not missed anything here bro?"
    // He was right, and the gap was not a country — it was time. This shelf began in the
    // twentieth century, as though making power visible were a modern invention. It is not.
    id: 'cartoon-first', number: '00', title: 'The first one we still have.',
    kicker: 'Before the printing press',
    introduction: 'A record of drawing against power should begin by admitting it invented neither the idea nor the cheek of it. The oldest surviving drawing made to make somebody’s belief look ridiculous is nearly two thousand years old, and it was scratched into a wall by hand.',
    people: [
      { name: 'The Alexamenos graffito', where: 'Rome · around AD 200', work: 'Palatine Hill, scratched in plaster',
        line: 'A man with a donkey’s head on a cross, captioned in Greek: “Alexamenos worships his god.” It is widely described as the earliest surviving picture of the crucifixion, and it was drawn to jeer. It survives because it was cut into a wall rather than printed on paper — which is also why it is the plainest warning on this shelf: mockery is very old, it points in every direction, and the hand holding the chalk is not always the good one.',
        source: 'Wikipedia · Alexamenos graffito', source_url: 'https://en.wikipedia.org/wiki/Alexamenos_graffito' },
    ],
  },
  {
    id: 'cartoon-present', number: '01', title: 'Drawing against power.',
    kicker: 'Contemporary voices',
    introduction: 'Witness, dissent, feminism, the climate. Different arguments, with the person who draws them kept in view.',
    people: [
      { name: 'Safaa Odah', where: 'Palestine', work: 'Witness from Gaza',
        line: 'Her drawings of family, hunger and displacement bear witness to Gaza’s war. The Freedom Cartoonists Foundation named her a co-recipient of its 2026 Kofi Annan Courage in Cartooning Award.',
        source: 'Freedom Cartoonists · 2026', source_url: AWARD_2026 },
      { name: 'Jimmy “Spire” Ssentongo', where: 'Uganda', work: 'Cartooning and public accountability',
        line: 'An academic and cartoonist whose work challenges corruption and institutional abuse. He shared the 2026 Kofi Annan Courage in Cartooning Award with Safaa Odah.',
        source: 'Freedom Cartoonists · 2026', source_url: AWARD_2026 },
      { name: 'Rachita Taneja', where: 'India', work: 'Sanitary Panels',
        line: 'Spare webcomics address patriarchy, intolerance and authoritarianism. Her 2024 Courage in Cartooning award citation documents both the work and the pressure brought against it.',
        source: 'Freedom Cartoonists · 2024', source_url: 'https://freedomcartoonists.com/international-cartoonists-award/2024-award/' },
      { name: 'Badiucao', where: 'China / Australia', work: 'Cartooning across borders',
        line: 'A Chinese Australian artist whose political cartoons, street art and installations confront censorship and authoritarianism. His own biography sets out that practice and its consequences.',
        source: 'The artist’s own biography', source_url: 'https://www.badiucao.com/about' },
      { name: 'Zunar', where: 'Malaysia', work: 'Satire against corruption',
        line: 'His cartoons target corruption and abuses of power. His account records book bans, police raids and sedition charges: independence here has a material cost, not just a visual style.',
        source: 'The artist’s own biography', source_url: 'https://zunar.my/about-me/' },
      { name: 'Cristina Sampaio', where: 'Portugal', work: 'Editorial cartooning',
        line: 'A press cartoonist and illustrator working across Portuguese and international publications. Cartooning for Peace’s profile links her biography to a gallery of her editorial work.',
        source: 'Cartooning for Peace', source_url: 'https://www.cartooningforpeace.org/en/dessinateurs/cristina-sampaio/' },
      { name: 'First Dog on the Moon', where: 'Australia', work: 'Andrew Marlton',
        line: 'An animal-populated political world that takes climate denial and energy policy head-on. Australia’s Museum of Australian Democracy holds a profile and examples, including “Climate Liars” from 2025.',
        source: 'Museum of Australian Democracy', source_url: 'https://www.moadoph.gov.au/explore/behind-the-lines/cartoonists/first-dog-on-the-moon' },
      // ── THE COUNTRIES THE SHELF HAD NOT NAMED ────────────────────────────────
      // Brian, 20 November: "will be cartoonist from Russia and Ukraine and Israel and
      // palestine … you sure not missed anything here?" Palestine was already here twice,
      // once drawing now and once in the inheritance. Russia, Ukraine and Israel were
      // missing, and so was any honest answer at all for North Korea. China is here through
      // Badiucao, who draws it from outside.
      { name: 'Vladimir Kazanevsky', where: 'Ukraine', work: 'Press cartooning, Kyiv',
        line: 'Born in 1950 in Lebedyn, he trained as a cosmic radiophysicist before drawing for a living, and has taken more than 500 prizes in international cartoon competitions across some fifty countries. He works from Kyiv. The record names him because a country at war is usually shown to the world through somebody else’s lens.',
        source: 'Cartooning for Peace', source_url: 'https://www.cartooningforpeace.org/en/dessinateurs/vladimir-kazanevsky/' },
      { name: 'Victoria Lomasko', where: 'Russia', work: 'Graphic reportage',
        line: 'Her drawing is done in the room: courtrooms, provincial schools, the trials that filled them. “Other Russias” collects that reportage, and since 2022 she has worked from outside Russia. Not satire thrown from a safe distance — a witness who brought paper.',
        source: 'Wikipedia · Victoria Lomasko', source_url: 'https://en.wikipedia.org/wiki/Victoria_Lomasko' },
      { name: 'Michel Kichka', where: 'Israel', work: 'Editorial cartooning and teaching',
        line: 'Born in Belgium in 1954 to a father who survived Auschwitz, he has drawn from Jerusalem for decades and taught at the Bezalel academy; “Second Generation” is about what a parent’s survival hands down. He stands on this shelf beside two Palestinian hands, and the record names both, because a witness that can only see one side of a room is not a witness.',
        source: 'Wikipedia · Michel Kichka', source_url: 'https://en.wikipedia.org/wiki/Michel_Kichka' },
      { name: 'Yaakov Kirschen', where: 'Israel', work: 'Dry Bones',
        line: 'He started “Dry Bones” in The Jerusalem Post in 1973 and kept it running for decades, one of the longest-running daily newspaper cartoons anywhere. A single panel, every morning, in the same place, until a country had a shorthand for arguing with itself.',
        source: 'Wikipedia · Yaakov Kirschen', source_url: 'https://en.wikipedia.org/wiki/Yaakov_Kirschen' },
      { name: 'SEK Studio', where: 'North Korea', work: 'State animation and drawn propaganda',
        line: 'This shelf could not name a North Korean cartoonist from a source it was able to check, and it will not invent one to fill a row. What can be named and checked is the studio: a state animation house that has drawn propaganda at home and taken contract work from abroad. Where a drawing is signed by an institution and never by a hand, the record says that plainly instead of guessing at a name.',
        source: 'Wikipedia · SEK Studio', source_url: 'https://en.wikipedia.org/wiki/SEK_Studio' },
    ],
  },
  {
    id: 'cartoon-inheritance', number: '02', title: 'Before this room.',
    kicker: 'The work outlives its maker',
    introduction: 'A newspaper character can become a language people carry into the street. These histories are part of the context, not a claim that their makers belonged to this record.',
    people: [
      { name: 'Quino', where: 'Argentina · died 2020', work: 'Mafalda',
        line: 'Joaquín Salvador Lavado Tejón gave a child the awkward questions adults avoided. Mafalda examined authority and everyday life; Quino went into exile after Argentina’s 1976 military coup.',
        source: 'The Guardian · obituary, 2020', source_url: 'https://www.theguardian.com/world/2020/oct/15/quino-obituary' },
      { name: 'Naji al-Ali', where: 'Palestine · died 1987', work: 'Handala',
        line: 'Created in 1969, his barefoot refugee child became a lasting symbol of Palestinian resistance. Al-Ali criticised both Israeli and Arab governments. He was killed after being shot in London in 1987.',
        source: 'NPR · Handala’s history, 2024', source_url: 'https://www.npr.org/2024/02/06/1228097975/handala-naji-al-ali-cartoon-palestinian-symbol' },
    ],
  },
  {
    id: 'cartoon-underground', number: '03', title: 'Underground is not a font.',
    kicker: 'Making your own way into print',
    introduction: 'Here, underground means making space outside the usual gatekeepers: small presses, collective editing and voices excluded from the page. It does not mean every work in that history was beyond criticism.',
    people: [
      { name: 'Trina Robbins', where: 'United States · 1938–2024', work: 'It Ain’t Me, Babe Comix / Wimmen’s Comix',
        line: 'She put together the all-women It Ain’t Me, Babe Comix in 1970 and co-founded Wimmen’s Comix. Her publishing and historical work challenged women’s exclusion from the comics world, including its counterculture.',
        source: 'The Guardian · obituary, 2024', source_url: 'https://www.theguardian.com/books/2024/may/13/trina-robbins-obituary' },
      { name: 'Seth Tobocman & Peter Kuper', where: 'United States', work: 'World War 3 Illustrated',
        line: 'They founded the political comics magazine in 1979. Its collective publishing model made comics a place for sustained social and political argument, rather than treating the drawing as decoration beside an article.',
        source: 'The magazine’s own history', source_url: 'https://www.ww3.nyc/about' },
    ],
  },
];