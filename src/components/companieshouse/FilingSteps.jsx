import React from 'react';
import { Link } from 'react-router-dom';

const VERIFY = 'https://www.gov.uk/guidance/verify-your-identity-for-companies-house';
const AUTH_CODE = 'https://www.gov.uk/guidance/company-authentication-codes-for-online-filing';
const FILE = 'https://www.gov.uk/file-your-confirmation-statement-with-companies-house';
const GATEWAY = 'https://access.service.gov.uk/';
const CS01 = 'https://www.gov.uk/government/publications/confirmation-statement-cs01';
const DIRECTOR = 'https://www.gov.uk/guidance/being-a-company-director';

// Seven steps, in the order the Companies House service asks for them. Each one says what
// to do, where, and what to have ready — so the filing can be done in one sitting without
// going back to read an email.
export const STEPS = [
  {
    n: '1',
    title: 'Check both directors have verified their identity',
    body: (
      <>
        Since 18 November 2025 Companies House will not accept a confirmation statement until every director has
        verified who they are. Both personal codes are stored in your vault. Gill’s page still shows “awaiting
        verification”, so confirm hers first — that is the one thing that can hold the filing up.
      </>
    ),
    links: [{ label: 'How identity verification works', href: VERIFY }],
  },
  {
    n: '2',
    title: 'Have the company authentication code ready',
    body: (
      <>
        Six characters, posted to the registered office — never emailed, so no search of an inbox will find it. The
        code sent when the company was formed went by post to G83 8QU shortly after incorporation: look for that
        letter first. A replacement can take up to 10 working days, so it is the one thing that decides whether
        2 December is comfortable or a scramble.
      </>
    ),
    links: [{ label: 'Get or request a code', href: AUTH_CODE }, { label: 'If it cannot arrive in time: form CS01 by post (£110)', href: CS01 }],
  },
  {
    n: '3',
    title: 'Sign in with the Government Gateway',
    body: (
      <>
        Use Login A or Login B from the vault. If the password is not to hand, open{' '}
        <Link to="/AdminCompaniesHouseDetails" className="underline decoration-[#b3261e] underline-offset-4">
          the Companies House details page
        </Link>{' '}
        to copy it. A forgotten password can be reset on the sign-in page.
      </>
    ),
    links: [{ label: 'Gateway sign in', href: GATEWAY }],
  },
  {
    n: '4',
    title: 'Open the confirmation statement and enter the company',
    body: (
      <>
        Choose to file a confirmation statement, then enter the company number SC870603 and the authentication code.
        The service will show the review period ending 18 November 2026.
      </>
    ),
    links: [{ label: 'File a confirmation statement', href: FILE }],
  },
  {
    n: '5',
    title: 'Check what Companies House holds, before you confirm it',
    body: (
      <>
        Read each screen rather than clicking through: registered office, directors, people with significant control,
        and the SIC codes. Correct anything that has changed now — confirming something that is wrong puts it on the
        public record for another year. The details to compare against are on this page above.
      </>
    ),
  },
  {
    n: '6',
    title: 'Confirm the directors’ statement and submit',
    body: (
      <>
        You will be asked to tick that each director has verified their identity. Then submit. There is no fee for a
        confirmation statement.
      </>
    ),
  },
  {
    n: '7',
    title: 'Keep the reference, then record it here',
    body: <>Copy the submission reference into the box at the foot of this page, so the next reminder is not a surprise.</>,
  },
];

export const STUCK = [
  {
    title: 'No authentication code',
    body: 'It is posted, never emailed — the six-character codes in a Government Gateway email expire in 30 minutes and are a different thing entirely. Request a replacement today: it goes to the registered office and can take up to 10 working days. If it will not arrive by 2 December, form CS01 can be posted instead, at a cost of £110. Phone Companies House on 0303 1234 500 and ask them which they advise.',
  },
  {
    title: 'Gateway password forgotten',
    body: 'Reset it on the sign-in page. The reset goes to the email address on that Government Gateway account, so check which one Login A and Login B use.',
  },
  {
    title: 'A director is not verified',
    body: 'Verification is done once, with photo ID and a face scan, and the personal code arrives by email. It cannot be done from this app.',
  },
  {
    title: 'Something on the register is wrong',
    body: 'Change it in the same filing where the service allows it. Anything it does not allow can be corrected by a separate form, and the correction is recorded.',
  },
];

export const DIRECTOR_LINK = DIRECTOR;