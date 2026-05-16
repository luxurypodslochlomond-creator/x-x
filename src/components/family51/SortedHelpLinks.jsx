/**
 * Country-specific free help links for the ReplyWriter
 * Shows the right organisations based on the user's detected country
 */

const HELP_BY_COUNTRY = {
  GB: [
    { name: 'Citizens Advice', desc: 'Free, confidential advice on debt, benefits & legal issues', url: 'https://www.citizensadvice.org.uk' },
    { name: 'StepChange', desc: 'Free debt advice & repayment plans', url: 'https://www.stepchange.org', note: '0800 138 1111' },
    { name: 'Debt Camel', desc: 'Plain English debt guides by Sara Williams', url: 'https://debtcamel.co.uk' },
  ],
  IE: [
    { name: 'MABS — Money Advice & Budgeting Service', desc: 'Free debt and money advice', url: 'https://www.mabs.ie', note: '0818 07 2000' },
    { name: 'FLAC — Free Legal Advice Centres', desc: 'Free legal clinics across Ireland', url: 'https://www.flac.ie', note: '1800 350 250' },
    { name: 'Citizens Information', desc: 'Rights, entitlements and services in Ireland', url: 'https://www.citizensinformation.ie' },
  ],
  AU: [
    { name: 'National Debt Helpline', desc: 'Free financial counselling — no judgment', url: 'https://ndh.org.au', note: '1800 007 007' },
    { name: 'AFCA', desc: 'Free disputes for banking, insurance, super', url: 'https://www.afca.org.au', note: '1800 931 678' },
    { name: 'Community Legal Centres Australia', desc: 'Free legal advice near you', url: 'https://clcs.org.au' },
  ],
  NZ: [
    { name: 'Citizens Advice Bureau NZ', desc: 'Free advice on rights, money, legal matters', url: 'https://www.cab.org.nz', note: '0800 367 222' },
    { name: 'Community Law Centres', desc: 'Free legal advice across NZ', url: 'https://communitylaw.org.nz' },
    { name: 'MoneyTalks', desc: 'Free financial helpline', url: 'https://www.moneytalks.co.nz', note: '0800 345 123' },
  ],
  CA: [
    { name: 'FCAC', desc: 'Financial Consumer Agency of Canada', url: 'https://www.canada.ca/fcac', note: '1-866-461-3222' },
    { name: 'Legal Aid Ontario', desc: 'Free legal help for qualifying residents', url: 'https://www.legalaid.on.ca', note: '1-800-668-8258' },
    { name: 'Credit Counselling Society', desc: 'Free non-profit debt advice', url: 'https://nomoredebts.org', note: '1-888-527-8999' },
  ],
  US: [
    { name: 'CFPB', desc: 'Consumer Financial Protection Bureau — file a complaint', url: 'https://www.consumerfinance.gov', note: '1-855-411-2372' },
    { name: 'Legal Aid (by state)', desc: 'Free legal help — find your local office', url: 'https://www.lawhelp.org' },
    { name: 'NFCC', desc: 'Free non-profit credit & debt counselling', url: 'https://www.nfcc.org', note: '1-800-388-2227' },
  ],
  IN: [
    { name: 'NALSA', desc: 'National Legal Services Authority — FREE legal aid', url: 'https://nalsa.gov.in', note: '15100' },
    { name: 'Consumer Helpline', desc: 'National Consumer Disputes — file online', url: 'https://consumerhelpline.gov.in', note: '1800-11-4000' },
    { name: 'RBI Banking Ombudsman', desc: 'Free banking complaint resolution', url: 'https://rbi.org.in', note: '14448' },
  ],
  ZA: [
    { name: 'Legal Aid South Africa', desc: 'FREE legal representation', url: 'https://legal-aid.co.za', note: '0800 110 110' },
    { name: 'Ombudsman for Banking Services', desc: 'Free banking dispute resolution', url: 'https://www.ombud.co.za', note: '0800 20 3722' },
    { name: 'National Credit Regulator', desc: 'Credit and debt issues', url: 'https://www.ncr.org.za', note: '0860 627 627' },
  ],
  NG: [
    { name: 'FCCPC', desc: 'Federal Competition & Consumer Protection Commission', url: 'https://fccpc.gov.ng', note: '09-9041880' },
    { name: 'CBN Consumer Protection', desc: 'Central Bank of Nigeria complaints', url: 'https://www.cbn.gov.ng', note: '07002255226' },
    { name: 'Legal Aid Council of Nigeria', desc: 'Free legal assistance', url: 'https://legalaidcouncil.gov.ng' },
  ],
  KE: [
    { name: 'NLAS', desc: 'National Legal Aid Service — FREE', url: 'https://nlas.go.ke', note: '0800 720 504' },
    { name: 'CAK', desc: 'Competition Authority of Kenya — consumer complaints', url: 'https://cak.go.ke', note: '0800 723 358' },
    { name: 'CBK', desc: 'Central Bank — banking complaints', url: 'https://centralbank.go.ke' },
  ],
  SG: [
    { name: 'CASE', desc: 'Consumers Association of Singapore', url: 'https://www.case.org.sg', note: '6100 0315' },
    { name: 'Community Justice Centre', desc: 'Free legal advice for lower income', url: 'https://cjc.org.sg' },
    { name: 'MAS', desc: 'Monetary Authority — financial complaints', url: 'https://www.mas.gov.sg', note: '1800 225 5577' },
  ],
  MY: [
    { name: 'KPDNHEP Consumer Hotline', desc: 'Ministry of Domestic Trade', url: 'https://kpdnhep.gov.my', note: '1800 886 800' },
    { name: 'Bank Negara BNMLINK', desc: 'Banking and financial complaints', url: 'https://bnm.gov.my', note: '1300 88 5465' },
    { name: 'Jabatan Bantuan Guaman', desc: 'Free legal aid', url: 'https://jbg.gov.my', note: '03-2093 5201' },
  ],
  PH: [
    { name: 'PAO — Public Attorney\'s Office', desc: 'FREE legal representation', url: 'https://pao.gov.ph', note: '02-8928-9019' },
    { name: 'DTI Consumer Hotline', desc: 'Dept of Trade and Industry', url: 'https://dti.gov.ph', note: '1-384' },
    { name: 'BSP Financial Consumer Protection', desc: 'Banking and financial issues', url: 'https://bsp.gov.ph' },
  ],
  DE: [
    { name: 'Verbraucherzentrale', desc: 'Consumer advice — per state (verbraucherzentrale.de)', url: 'https://www.verbraucherzentrale.de' },
    { name: 'Bankomombudsmann', desc: 'Free banking dispute resolution', url: 'https://www.bankenombudsmann.de' },
    { name: 'Mieterverein', desc: 'Tenant association in your city (rent and housing)', url: 'https://www.mieterbund.de' },
  ],
  FR: [
    { name: 'Signal Conso', desc: 'National consumer complaint portal', url: 'https://signal.conso.gouv.fr' },
    { name: 'Défenseur des droits', desc: 'Free rights protection', url: 'https://www.defenseurdesdroits.fr', note: '09 69 39 00 00' },
    { name: 'Aide Juridictionnelle', desc: 'Free legal aid (justice.fr)', url: 'https://www.justice.fr' },
  ],
  ES: [
    { name: 'OMIC', desc: 'Oficina Municipal de Información al Consumidor — your local council', url: 'https://www.ocu.org' },
    { name: 'Banco de España', desc: 'Banking and finance complaints', url: 'https://www.bde.es', note: '900 54 54 21' },
    { name: 'Turno de Oficio', desc: 'Free legal aid — contact local Colegio de Abogados', url: 'https://www.abogacia.es' },
  ],
  IT: [
    { name: 'Arbitro Bancario Finanziario', desc: 'FREE banking disputes', url: 'https://www.arbitrobancariofinanziario.it' },
    { name: 'AGCM', desc: 'Consumer and competition authority', url: 'https://www.agcm.it' },
    { name: 'Gratuito Patrocinio', desc: 'Free legal aid for low income (tribunale locale)', url: 'https://www.giustizia.it' },
  ],
  BR: [
    { name: 'ProCon / consumidor.gov.br', desc: 'National consumer complaints portal', url: 'https://www.consumidor.gov.br' },
    { name: 'Defensoria Pública', desc: 'FREE legal aid — per state', url: 'https://www.anadep.org.br' },
    { name: 'BACEN (Banco Central)', desc: 'Banking and financial complaints', url: 'https://www.bcb.gov.br', note: '145' },
  ],
  MX: [
    { name: 'PROFECO', desc: 'Consumer protection — free complaint', url: 'https://www.profeco.gob.mx', note: '800 468 8722' },
    { name: 'CONDUSEF', desc: 'Financial services consumer protection', url: 'https://www.condusef.gob.mx', note: '800 999 8080' },
    { name: 'Defensoría Pública Federal', desc: 'Free legal representation', url: 'https://www.cjf.gob.mx' },
  ],
  HK: [
    { name: 'Consumer Council', desc: 'Consumer complaints', url: 'https://consumer.org.hk', note: '2929 2222' },
    { name: 'Legal Aid Department', desc: 'Free legal aid', url: 'https://www.lad.gov.hk', note: '2537 7677' },
    { name: 'Labour Department', desc: 'Employment disputes', url: 'https://www.labour.gov.hk' },
  ],
  JP: [
    { name: 'Houterasu (Japan Legal Aid)', desc: 'Free legal information and referrals', url: 'https://www.houterasu.or.jp', note: '0570 078 374' },
    { name: 'National Consumer Affairs Centre', desc: 'Consumer complaints hotline', url: 'https://www.kokusen.go.jp', note: '188' },
    { name: 'FSA Financial Services Agency', desc: 'Financial complaints', url: 'https://www.fsa.go.jp' },
  ],
  KR: [
    { name: 'Korea Consumer Agency', desc: 'Consumer dispute hotline', url: 'https://www.kca.go.kr', note: '1372' },
    { name: 'Korea Legal Aid Corporation', desc: 'FREE legal help', url: 'https://www.klac.or.kr', note: '132' },
    { name: 'FSS Financial Supervisory Service', desc: 'Financial complaints', url: 'https://www.fss.or.kr', note: '1332' },
  ],
  AE: [
    { name: 'DED Consumer Rights', desc: 'Consumer complaints (Dubai)', url: 'https://consumerrights.ae', note: '600 54 5555' },
    { name: 'CBUAE', desc: 'Central Bank — banking complaints', url: 'https://www.centralbank.ae', note: '800 CBUAE' },
    { name: 'MOHRE', desc: 'Labour disputes', url: 'https://www.mohre.gov.ae', note: '800 60' },
  ],
  NL: [
    { name: 'Juridisch Loket', desc: 'Free legal advice', url: 'https://www.juridischloket.nl', note: '0800 8020' },
    { name: 'Geschillencommissie', desc: 'Consumer dispute resolution', url: 'https://www.degeschillencommissie.nl' },
    { name: 'AFM', desc: 'Financial markets authority', url: 'https://www.afm.nl', note: '0800 540 54 05' },
  ],
  SE: [
    { name: 'Konsumentverket', desc: 'Consumer protection authority', url: 'https://www.konsumentverket.se' },
    { name: 'ARN', desc: 'Free consumer dispute board', url: 'https://www.arn.se', note: '08 508 860 00' },
    { name: 'Kronofogden', desc: 'Debt enforcement and advice', url: 'https://www.kronofogden.se', note: '0771 73 73 00' },
  ],
  CH: [
    { name: 'Konsumentenschutz (SKS)', desc: 'Swiss consumer protection', url: 'https://www.konsumentenschutz.ch', note: '031 370 24 24' },
    { name: 'FINMA', desc: 'Financial markets regulator', url: 'https://www.finma.ch' },
    { name: 'NCSC', desc: 'National Cyber Security Centre — scam reports', url: 'https://www.ncsc.admin.ch', note: '058 460 22 22' },
  ],
  BE: [
    { name: 'Point de Contact', desc: 'Free consumer mediation', url: 'https://www.pointdecontact.be' },
    { name: 'Ombudsfin', desc: 'Free financial sector complaints', url: 'https://www.ombudsfin.be', note: '02 545 77 70' },
    { name: 'SPF Economie', desc: 'Consumer rights authority', url: 'https://economie.fgov.be', note: '0800 120 33' },
  ],
  AT: [
    { name: 'Arbeiterkammer (AK)', desc: 'FREE advice on consumer, employment, tenancy', url: 'https://www.arbeiterkammer.at', note: '01 501 65 0' },
    { name: 'VKI', desc: 'Consumer information association', url: 'https://www.vki.at', note: '01 588 77' },
    { name: 'FMA', desc: 'Financial market authority', url: 'https://www.fma.gv.at' },
  ],
  PL: [
    { name: 'UOKiK', desc: 'Consumer protection office', url: 'https://www.uokik.gov.pl', note: '22 55 60 800' },
    { name: 'Rzecznik Praw Obywatelskich', desc: 'Free rights protection ombudsman', url: 'https://www.rpo.gov.pl', note: '800 676 676' },
    { name: 'PIP', desc: 'National Labour Inspectorate', url: 'https://www.pip.gov.pl', note: '801 002 006' },
  ],
  TR: [
    { name: 'Tüketici Hakem Heyeti', desc: 'Free consumer arbitration committees', url: 'https://www.ticaret.gov.tr' },
    { name: 'BDDK', desc: 'Banking regulation authority', url: 'https://www.bddk.org.tr', note: '0212 337 72 72' },
    { name: 'Baro Hukuki Yardım', desc: 'Free legal aid via local Bar Association', url: 'https://www.barobirlik.org.tr' },
  ],
};

// Fallback for countries without specific links
const DEFAULT_HELP = [
  { name: 'Your national consumer protection office', desc: 'Search "[your country] consumer rights complaint" for the official body', url: '' },
  { name: 'Your national legal aid service', desc: 'Search "[your country] free legal aid" for FREE advice', url: '' },
];

export default function SortedHelpLinks({ geo, accentColor = '#06b6d4' }) {
  const code = geo?.code?.split('-')[0] || 'INT';
  const links = HELP_BY_COUNTRY[code] || DEFAULT_HELP;

  return (
    <div style={{ padding: '14px 18px', borderRadius: 12, background: `${accentColor}06`, border: `1px solid ${accentColor}20` }}>
      <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: `${accentColor}99`, margin: '0 0 10px' }}>
        WANT TO TALK TO A REAL PERSON?{geo?.country && geo.country !== 'International' ? ` (${geo.country.replace(/ \(.*\)/, '')})` : ''}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map((link, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, flexShrink: 0, display: 'inline-block', marginTop: 5 }} />
            <span style={{ fontSize: 12, color: 'rgba(26,18,8,0.65)' }}>
              {link.url ? (
                <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1a1208', fontWeight: 700, textDecoration: 'none' }}>{link.name}</a>
              ) : (
                <strong style={{ color: '#1a1208' }}>{link.name}</strong>
              )}
              {' — '}{link.desc}
              {link.note && <span style={{ color: 'rgba(26,18,8,0.45)', fontWeight: 600 }}> · {link.note}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}