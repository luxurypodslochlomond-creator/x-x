/**
 * SORTED — Country-specific legal context
 * Used in all three tools: LetterDecoder, ReplyWriter, ConflictHelper
 * Add new countries here and they'll work everywhere automatically.
 */

export function getSortedGeoContext(geo) {
  const { country, jurisdiction, code } = geo;

  // Country-specific rich context
  const countryContextMap = {

    'PH': `For Philippines: reference relevant laws (Civil Code RA 386, Labor Code PD 442, Consumer Act RA 7394, RA 9285 ADR). Name real bodies: DTI (1-384), DOLE (1349), NLRC, SEC, BSP, NBI, PAO (free legal aid 02-8928-9019). Small Claims Court handles up to PHP 400,000 without a lawyer. Barangay conciliation is required first for neighbour disputes.`,

    'IE': `For Ireland: apply Irish law precisely. Key legislation and bodies:
- Residential Tenancies Act 2004 (as amended) — all landlord/tenant disputes go to the RTB (Residential Tenancies Board) at rtb.ie, not the courts directly
- Revenue Commissioners — tax debts, PAYE, self-assessment notices (revenue.ie / MyAccount portal)
- MABS (Money Advice & Budgeting Service) — FREE, confidential debt advice: mabs.ie / 0818 07 2000 — this is Ireland's equivalent of Citizens Advice for debt
- FLAC (Free Legal Advice Centres) — free legal aid and advice: flac.ie / 1800 350 250
- CCPC (Competition and Consumer Protection Commission) — consumer rights, unfair practices: ccpc.ie
- Financial Services and Pensions Ombudsman (FSPO) — bank and insurance complaints: fspo.ie / 01 567 7000
- Workplace Relations Commission (WRC) — employment disputes, unfair dismissal: workplacerelations.ie / 0818 80 80 90
- Small Claims Court — disputes up to €2,000 without a solicitor, €25 fee: courts.ie
- Irish Human Rights and Equality Commission (IHREC): ihrec.ie
- Free legal aid: Legal Aid Board at legalaidboard.ie / 066 947 1000
- For utility disputes: Commission for Regulation of Utilities (CRU): cru.ie
- Key reminder: Irish statute of limitations is generally 6 years (Statute of Limitations Act 1957). Irish courts use Circuit Court and District Court — NOT county courts as in England.`,

    'AU': `For Australia: apply Australian law precisely. Key legislation and bodies:
- Australian Consumer Law (ACL, Competition and Consumer Act 2010) — consumer rights, refunds, guarantees
- AFCA (Australian Financial Complaints Authority) — bank, insurance, super complaints: afca.org.au / 1800 931 678 — FREE to consumers
- ACCC (Australian Competition and Consumer Commission) — unfair practices, scams: accc.gov.au / 1300 302 502
- Fair Trading offices — each state has its own (NSW: fairtrading.nsw.gov.au, VIC: consumer.vic.gov.au, QLD: qld.gov.au/law/your-rights, WA: commerce.wa.gov.au)
- Tenancy laws vary by state — ALWAYS reference the specific state tribunal: NCAT (NSW), VCAT (VIC), QCAT (QLD), SAT (SA), WASAT (WA)
- National Debt Helpline: ndh.org.au / 1800 007 007 — FREE financial counselling, equivalent to Citizens Advice for debt
- Fair Work Commission — employment disputes, unfair dismissal: fwc.gov.au / 1300 799 675
- ATO (Australian Tax Office) — tax debt payment plans available: ato.gov.au / 13 28 61
- Small claims: each state has its own small claims tribunal (NCAT in NSW handles up to $100k, VCAT in VIC up to $100k)
- Ombudsman services: Commonwealth Ombudsman (ombudsman.gov.au / 1300 362 072) plus state ombudsmen
- Legal Aid: each state has free Legal Aid (e.g. legalaid.nsw.gov.au / lawaccess.nsw.gov.au)
- Note: statute of limitations is generally 6 years (varies by state). Australian Consumer Law gives strong protections for faulty goods/services.`,

    'NZ': `For New Zealand: apply NZ law precisely. Key legislation and bodies:
- Consumer Guarantees Act 1993 and Fair Trading Act 1986 — strong consumer protections
- Disputes Tribunal — up to $30,000 without a lawyer, $15,000 for most claims: disputestribunal.govt.nz
- Tenancy Tribunal — all residential tenancy disputes: tenancy.govt.nz / 0800 836 262
- Citizens Advice Bureau (CAB) — free advice: cab.org.nz / 0800 367 222
- Financial Services Complaints Ltd (FSCL) — financial disputes: fscl.org.nz / 0800 347 257
- Commerce Commission — consumer and competition law: comcom.govt.nz
- IRD (Inland Revenue) — tax debts and payment plans: ird.govt.nz / 0800 227 774
- Community Law Centres — FREE legal advice: communitylaw.org.nz`,

    'CA': `For Canada: apply Canadian federal and provincial law. Key legislation and bodies:
- FCAC (Financial Consumer Agency of Canada) — financial product complaints: canada.ca/fcac / 1-866-461-3222
- Provincial consumer protection offices handle most consumer disputes (varies by province)
- Employment disputes: each province has its own Employment Standards branch
- Landlord/tenant: provincial Landlord and Tenant Boards (e.g. Ontario LTB: ltb.gov.on.ca)
- Credit Bureau disputes: Equifax (1-800-465-7166) and TransUnion (1-800-663-9980)
- Small Claims Court limits vary by province (Ontario: $35,000, BC: $35,000, Alberta: $50,000)
- Legal Aid: each province has Legal Aid (e.g. Legal Aid Ontario: legalaid.on.ca / 1-800-668-8258)
- Statute of limitations: generally 2 years (varies by province and debt type — significantly different from UK)`,

    'GB': `This person is in the UK (England/Wales unless context suggests Scotland or Northern Ireland). Apply UK law precisely. Note Scotland has distinct legal system — if Scottish context, apply Scots law (prescription rules differ from England/Wales, different debt solutions like DAS and Trust Deed, Citizens Advice Scotland 0800 028 1456, Shelter Scotland 0808 800 4444). For England/Wales: Citizens Advice (citizensadvice.org.uk / 0800 144 8848), National Debtline (nationaldebtline.org / 0808 808 4000), StepChange (stepchange.org / 0800 138 1111), Shelter (shelter.org.uk / 0808 800 4444).`,

    'US': `For USA: apply US federal and state law. Note laws vary significantly by state. Key federal bodies:
- CFPB (Consumer Financial Protection Bureau) — financial complaints: consumerfinance.gov / 1-855-411-2372
- FTC (Federal Trade Commission) — consumer protection, scams: ftc.gov / 1-877-382-4357
- EEOC (Equal Employment Opportunity Commission) — workplace discrimination: eeoc.gov / 1-800-669-4000
- HUD (Housing and Urban Development) — housing complaints: hud.gov / 1-800-669-9777
- State Attorney General offices handle local consumer issues (search "[State] Attorney General")
- Small Claims Court limits vary widely by state ($2,500 to $25,000)
- Debt: FDCPA (Fair Debt Collection Practices Act) protects against harassment. Statute of limitations varies by state (3-10 years depending on debt type and state).
- Free legal aid: lawhelp.org to find local legal aid by state`,

  };

  // Get specific context or fall back to generic
  const specificContext = countryContextMap[code] || countryContextMap[code?.split('-')[0]];

  if (specificContext) {
    return specificContext;
  }

  // Generic fallback for unknown countries
  return `Reference specific legislation, named regulatory bodies, and real contact details for ${country}. Apply ${jurisdiction} with precision.`;
}

/**
 * Returns the full geo context string to inject into prompts
 */
export function buildSortedGeoPromptContext(geo) {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const countryContext = getSortedGeoContext(geo);
  return `Today's date is ${today}. The person is in: ${geo.country}. Apply ${geo.jurisdiction} precisely. ${countryContext} When calculating urgency, use today's date.`;
}