import { IMAGES, RECORD_COVER_SCREEN } from '@/components/climate/categoryImages';

export const CONTRIBUTIONS = [
  {
    id: 'show', title: 'Give the work a place.',
    body: 'A classroom, a library, a community hall. Choose drawings, keep every credit and source attached, and make a show people can actually spend time with. For uses beyond this record’s print tools, ask the rights holder first.',
    action: 'Choose drawings for a show', to: '/ClimateCartoons/Print',
    image: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/c51e473feaade5b4f1372f95b64a65ed_generated_image.png',
    alt: 'Painted study of sheets hung in a printmaking studio', caption: 'A place for the work · generated study for the record, not a photograph of an exhibition.',
  },
  {
    id: 'evidence', title: 'Bring evidence, not noise.',
    body: 'A missing source. A correction. Local knowledge that changes what an entry says. Help the record distinguish what is known from what is claimed; publication still needs a custodian’s judgement.',
    action: 'Offer evidence or a correction', offer: 'Evidence or a correction', image: IMAGES.mangroves,
    alt: 'An illustration of mangroves and their roots at the water’s edge', caption: 'Mangroves · generated illustration already used on the record, not field evidence.',
  },
  {
    id: 'skills', title: 'Time and skill count too.',
    body: 'Translation, careful checking, an accessible venue, introductions or help keeping an archive. Say what you can offer and on what terms. Volunteering is a choice, never a substitute for agreeing a proper fee.',
    action: 'Offer time, space or a skill', offer: 'Time, space or a skill',
    image: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/3cff19d496434a6d38751c4b996e2293_generated_image.png',
    alt: 'Painted study of drawing paper and archive boxes on an open shelf', caption: 'Keeping the work available · generated study for the record.',
  },
  {
    id: 'artists', title: 'Pay the people making it.',
    body: 'A commission starts with the artist’s price, consent and agreed rights. Offer a paid brief or help with an artist’s costs. This sends a private proposal to the custodians, not a payment or a promise of one; no commission is agreed until the artist agrees.',
    action: 'Propose paid support for an artist', offer: 'Paid support for an artist',
    image: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/d34fd562e3b72546e07a0f0dd523d22e_generated_image.png',
    alt: 'A dip pen, ink and blank paper on a working artist’s desk, painted as a still life', caption: 'The labour behind a drawing · generated study, not an artist’s submitted work.',
  },
  {
    id: 'record', title: 'Keep the record independent.',
    body: 'Hosting, preservation and the people doing the work have costs. Help with those without buying an editorial say, a better place on the wall or access to anyone’s data. The existing support page says whether giving is open.',
    action: 'See the record’s support arrangements', to: '/ClimateSupport', image: RECORD_COVER_SCREEN,
    alt: 'The record’s own painting of the living Earth beneath its sky', caption: 'The record’s cover painting · made for this record.',
  },
];