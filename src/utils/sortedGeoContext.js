/**
 * SORTED — Country-specific legal context
 * Used in all four tools: LetterDecoder, ReplyWriter, ConflictHelper, ScamChecker
 * Add new countries here and they'll work everywhere automatically.
 */

const COUNTRY_CONTEXTS = {

  // ── UK ──────────────────────────────────────────────────────────────────────
  'GB': `This person is in the UK. Apply UK law precisely. Note Scotland has a distinct legal system — if Scottish context is present, apply Scots law (prescription rules differ from England/Wales; different debt solutions: DAS, Trust Deed; Citizens Advice Scotland 0800 028 1456; Shelter Scotland 0808 800 4444; Money Advice Scotland moneyadvicescotland.org.uk). For England/Wales: Citizens Advice (citizensadvice.org.uk / 0800 144 8848), National Debtline (nationaldebtline.org / 0808 808 4000), StepChange (stepchange.org / 0800 138 1111), Shelter (shelter.org.uk / 0808 800 4444). Scam reporting: Action Fraud (actionfraud.police.uk / 0300 123 2040).`,

  // ── IRELAND ─────────────────────────────────────────────────────────────────
  'IE': `For Ireland: apply Irish law precisely.
- Residential Tenancies Act 2004 (as amended) — all landlord/tenant disputes go to the RTB (Residential Tenancies Board): rtb.ie
- MABS (Money Advice & Budgeting Service) — FREE debt advice: mabs.ie / 0818 07 2000
- FLAC (Free Legal Advice Centres): flac.ie / 1800 350 250
- Revenue Commissioners — tax debts: revenue.ie / MyAccount portal
- CCPC (Competition and Consumer Protection Commission) — consumer rights: ccpc.ie
- FSPO (Financial Services and Pensions Ombudsman) — bank/insurance: fspo.ie / 01 567 7000
- WRC (Workplace Relations Commission) — employment disputes: workplacerelations.ie / 0818 80 80 90
- Small Claims Court — up to €2,000, €25 fee: courts.ie
- Legal Aid Board: legalaidboard.ie / 066 947 1000
- CRU (utility disputes): cru.ie
- Scam reporting: Garda National Cyber Crime Bureau (GNCCB) — reportcyber.ie / An Garda Síochána 999 or 112. IHREC: ihrec.ie.
- Statute of limitations: generally 6 years (Statute of Limitations Act 1957). Circuit Court and District Court — NOT county courts as in England.`,

  // ── AUSTRALIA ───────────────────────────────────────────────────────────────
  'AU': `For Australia: apply Australian law precisely. Laws vary by state — always name the relevant state.
- Australian Consumer Law (ACL, Competition and Consumer Act 2010) — strong consumer protections including repair/replace/refund for faulty goods
- AFCA (Australian Financial Complaints Authority) — bank, insurance, super: afca.org.au / 1800 931 678 (FREE)
- ACCC — competition and consumer: accc.gov.au / 1300 302 502
- State Fair Trading: NSW fairtrading.nsw.gov.au, VIC consumer.vic.gov.au, QLD qld.gov.au/law/your-rights
- Tenancy tribunals by state: NCAT (NSW), VCAT (VIC), QCAT (QLD), SAT (SA), WASAT (WA)
- National Debt Helpline: ndh.org.au / 1800 007 007 (FREE financial counselling)
- Fair Work Commission — employment disputes: fwc.gov.au / 1300 799 675
- ATO (Australian Tax Office) — payment plans: ato.gov.au / 13 28 61
- Legal Aid by state: e.g. legalaid.nsw.gov.au, legalaid.vic.gov.au
- Scam reporting: Scamwatch (scamwatch.gov.au / ACCC), ReportCyber (cyber.gov.au/report), ACCC 1300 302 502
- Statute of limitations: generally 6 years (varies by state and debt type).`,

  // ── NEW ZEALAND ─────────────────────────────────────────────────────────────
  'NZ': `For New Zealand: apply NZ law precisely.
- Consumer Guarantees Act 1993 and Fair Trading Act 1986 — strong consumer protections
- Disputes Tribunal — up to $30,000 without a lawyer: disputestribunal.govt.nz
- Tenancy Tribunal — all residential tenancy disputes: tenancy.govt.nz / 0800 836 262
- Citizens Advice Bureau: cab.org.nz / 0800 367 222
- Financial Services Complaints Ltd (FSCL): fscl.org.nz / 0800 347 257
- Commerce Commission: comcom.govt.nz
- IRD — tax debts and payment plans: ird.govt.nz / 0800 227 774
- Community Law Centres — FREE legal advice: communitylaw.org.nz
- Scam reporting: NetSafe (netsafe.org.nz / 0508 638 723), Police 105 for fraud.`,

  // ── CANADA ───────────────────────────────────────────────────────────────────
  'CA': `For Canada: apply Canadian federal and provincial law.
- FCAC (Financial Consumer Agency of Canada): canada.ca/fcac / 1-866-461-3222
- Provincial consumer protection offices handle most consumer disputes
- Employment Standards branch varies by province
- Landlord/Tenant Boards: Ontario LTB (ltb.gov.on.ca), BC RTB, Alberta RTDRS
- Small Claims: Ontario $35k, BC $35k, Alberta $50k
- Legal Aid: Ontario legalaid.on.ca / 1-800-668-8258; BC lss.bc.ca; Alberta legalaid.ab.ca
- Equifax Canada 1-800-465-7166; TransUnion Canada 1-800-663-9980
- Scam reporting: Canadian Anti-Fraud Centre (antifraudcentre-centreantifraude.ca / 1-888-495-8501), local police for fraud.
- Statute of limitations: generally 2 years (varies significantly by province and debt type).`,

  // ── USA ───────────────────────────────────────────────────────────────────────
  'US': `For USA: apply US federal and state law — laws vary significantly by state.
- CFPB (Consumer Financial Protection Bureau): consumerfinance.gov / 1-855-411-2372
- FTC (Federal Trade Commission): ftc.gov / 1-877-382-4357; reportfraud.ftc.gov for scams
- EEOC (employment discrimination): eeoc.gov / 1-800-669-4000
- HUD (housing complaints): hud.gov / 1-800-669-9777
- State Attorney General handles local consumer issues (search "[State] Attorney General")
- Small Claims limits: $2,500–$25,000 by state
- FDCPA (Fair Debt Collection Practices Act) protects against debt collector harassment
- Free legal aid: lawhelp.org by state
- Scam reporting: FTC reportfraud.ftc.gov, FBI IC3 (ic3.gov) for cyber fraud, local police.
- Statute of limitations: 3–10 years by state and debt type (much shorter than UK).`,

  // ── INDIA ────────────────────────────────────────────────────────────────────
  'IN': `For India: apply Indian law precisely.
- Consumer Protection Act 2019 — District Consumer Forum for disputes up to ₹50 lakh (no lawyer needed), State Commission up to ₹2 crore, National Commission above
- RERA (Real Estate Regulatory Authority) — housing and property disputes: rera.gov.in (each state has its own)
- RBI (Reserve Bank of India) — banking and financial complaints: rbi.org.in / 14448 (RBI Kehta Hai)
- SEBI — investment and securities complaints: sebi.gov.in / scores.sebi.gov.in
- DPDP (Digital Personal Data Protection Act 2023) — data privacy
- Labour courts and Labour Commissioner — employment disputes
- Lok Adalat — free alternate dispute resolution (fast, binding)
- NALSA (National Legal Services Authority) — FREE legal aid: nalsa.gov.in / 15100
- Income Tax — disputes via ITR portal, Income Tax Ombudsman
- Scam reporting: Cyber Crime portal (cybercrime.gov.in / helpline 1930), local police.
- Limitation Act 1963: generally 3 years for contract/debt claims.`,

  // ── SOUTH AFRICA ─────────────────────────────────────────────────────────────
  'ZA': `For South Africa: apply South African law precisely.
- National Consumer Commission (NCC) — Consumer Protection Act 2008: thencc.org.za / 012 428 7000
- National Credit Regulator (NCR) — credit and debt: ncr.org.za / 0860 627 627
- Ombudsman for Banking Services: ombud.co.za / 0800 20 3722 (FREE)
- CCMA (Commission for Conciliation, Mediation and Arbitration) — employment disputes: ccma.org.za / 0861 16 2616 (FREE, no lawyers)
- Rental Housing Tribunal — landlord/tenant: per province
- Legal Aid South Africa — FREE legal representation: legal-aid.co.za / 0800 110 110
- South African Revenue Service (SARS): sars.gov.za / 0800 00 7277
- Scam reporting: SAPS (South African Police Service) 10111, SAFPS (fraud prevention): safps.org.za / 011 867 2234.`,

  // ── NIGERIA ──────────────────────────────────────────────────────────────────
  'NG': `For Nigeria: apply Nigerian law precisely.
- FCCPC (Federal Competition and Consumer Protection Commission) — consumer rights: fccpc.gov.ng / 09-9041880
- CBN (Central Bank of Nigeria) — banking complaints: cbn.gov.ng / 07002255226
- NCC (Nigerian Communications Commission) — telecom disputes: ncc.gov.ng / 0800 6322 1516
- NAFDAC — product safety: nafdac.gov.ng
- National Industrial Court of Nigeria — employment disputes
- Legal Aid Council of Nigeria — FREE legal assistance: lagosstate.gov.ng
- Small Claims Court available in Lagos, Abuja and some states
- Scam reporting: EFCC (Economic and Financial Crimes Commission): efcc.gov.ng / 0800 225 5322, NPF (Nigeria Police Force) 199.`,

  // ── KENYA ─────────────────────────────────────────────────────────────────────
  'KE': `For Kenya: apply Kenyan law precisely.
- Competition Authority of Kenya (CAK) — consumer protection: cak.go.ke / 0800 723 358
- Central Bank of Kenya — banking complaints: centralbank.go.ke
- Communications Authority — telecom disputes: ca.go.ke / 0800 722 044
- Employment and Labour Relations Court — employment disputes: court.go.ke
- Rent Restriction Tribunal — tenancy disputes
- National Legal Aid Service (NLAS) — FREE legal aid: nlas.go.ke / 0800 720 504
- Kenya Revenue Authority (KRA) — tax: kra.go.ke / 0711 099 999
- Scam reporting: DCI (Directorate of Criminal Investigations) / Cybercrime Unit: dci.go.ke / 0800 722 203, Police 999.`,

  // ── SINGAPORE ────────────────────────────────────────────────────────────────
  'SG': `For Singapore: apply Singapore law precisely.
- CASE (Consumers Association of Singapore) — consumer disputes: case.org.sg / 6100 0315
- Small Claims Tribunals — up to S$20,000 (S$30k with consent): statecourts.gov.sg
- MOM (Ministry of Manpower) — employment disputes: mom.gov.sg / 6438 5122
- HDB (Housing Development Board) — public housing issues: hdb.gov.sg
- MAS (Monetary Authority of Singapore) — financial complaints: mas.gov.sg / 1800 225 5577
- FIDReC (Financial Industry Disputes Resolution Centre) — banking/insurance: fidrec.com.sg
- Law Society of Singapore — Pro Bono Services: lawsociety.org.sg / 6536 0650
- Scam reporting: ScamShield (scamshield.org.sg), Singapore Police Force 1800 255 0000, Anti-Scam Helpline 1800 722 6688.`,

  // ── MALAYSIA ─────────────────────────────────────────────────────────────────
  'MY': `For Malaysia: apply Malaysian law precisely.
- Tribunal for Consumer Claims (TCC) — disputes up to RM50,000: ttpm.kpdnhep.gov.my
- Bank Negara Malaysia (BNM) — banking complaints: bnm.gov.my / 1300 88 5465
- KPDNHEP (Ministry of Domestic Trade) — consumer protection: kpdnhep.gov.my / 1800 886 800
- Industrial Court and Labour Department — employment disputes
- Jabatan Perhubungan Perusahaan (JTKSM) — Industrial Relations
- Legal Aid Department (Jabatan Bantuan Guaman) — FREE: jbg.gov.my / 03-2093 5201
- LHDN (Inland Revenue Board) — tax: hasil.gov.my / 1800 88 5436
- Scam reporting: Royal Malaysia Police (PDRM) 999, Cyber999 (cybersecurity.my / 1300 88 2999), NSRC.`,

  // ── HONG KONG ────────────────────────────────────────────────────────────────
  'HK': `For Hong Kong: apply Hong Kong law precisely.
- Consumer Council — consumer complaints: consumer.org.hk / 2929 2222
- Small Claims Tribunal — up to HK$75,000: judiciary.hk
- Labour Tribunal — employment disputes (FREE): judiciary.hk
- HKMA (Hong Kong Monetary Authority) — banking complaints: hkma.gov.hk / 1881
- Insurance Authority: ia.org.hk / 3899 9983
- Equal Opportunities Commission: eoc.org.hk / 2511 8211
- Legal Aid Department — FREE: lad.gov.hk / 2537 7677
- Inland Revenue Department — tax: ird.gov.hk
- Scam reporting: Hong Kong Police Force 999, Cyber Security and Technology Crime Bureau (CSTCB): police.gov.hk.`,

  // ── UAE ───────────────────────────────────────────────────────────────────────
  'AE': `For UAE: apply UAE law precisely. Laws vary by emirate and by free zone vs mainland.
- DED (Department of Economic Development) — consumer complaints: each emirate has its own DED
- CBUAE (Central Bank of UAE) — banking complaints: centralbank.ae / 800 CBUAE
- MOHRE (Ministry of Human Resources and Emiratisation) — labour disputes: mohre.gov.ae / 800 60
- Dubai Courts Small Claims — under AED 100,000: dubaicourtsa.ae
- DIFC Courts (Dubai International Financial Centre) — for DIFC-registered entities
- Consumer Protection Dept (Dubai Consumer): consumerrights.ae / 600 54 5555
- Scam reporting: Dubai Police eCrime: ecrime.ae / 901; Abu Dhabi Police: adpolice.gov.ae / 800 2626; UAE Cyber Security Council.`,

  // ── GERMANY ──────────────────────────────────────────────────────────────────
  'DE': `For Germany: apply German law precisely.
- Verbraucherzentrale (Consumer Advice Centre) — consumer disputes: verbraucherzentrale.de / varies by state
- Schlichtungsstelle (Ombudsman) — banking: dsgv.de or private banks: bankenombudsmann.de
- Bundesagentur für Arbeit (Federal Employment Agency) — employment: arbeitsagentur.de / 0800 4 5555 00
- Mietrecht (Tenancy Law) — strong tenant protections; Mieterverein (tenant associations) in each city
- Bundesnetzagentur — utility and telecom disputes: bundesnetzagentur.de
- Finanzamt — tax disputes: local Finanzamt
- Scam reporting: Bundeskriminalamt (BKA) — bka.de; local police (Polizei) 110; Verbraucherzentrale for consumer fraud.`,

  // ── FRANCE ──────────────────────────────────────────────────────────────────
  'FR': `For France: apply French law precisely.
- DGCCRF (Direction générale de la concurrence) — consumer protection: dgccrf.economie.gouv.fr / SignalConso at signal.conso.gouv.fr
- Médiateur de la consommation — mandatory mediation before litigation for B2C
- Défenseur des droits — rights protection: defenseurdesdroits.fr / 09 69 39 00 00
- DIRECCTE / DREETS — employment disputes: travail-emploi.gouv.fr
- Commission de surendettement (Banque de France) — debt restructuring: 3414
- Aide juridictionnelle — FREE legal aid: justice.fr
- CNIL — data protection: cnil.fr
- Scam reporting: Pharos (internet-signalement.gouv.fr), Cybermalveillance (cybermalveillance.gouv.fr), Police / Gendarmerie 17.`,

  // ── SPAIN ────────────────────────────────────────────────────────────────────
  'ES': `For Spain: apply Spanish law precisely.
- OMIC (Oficina Municipal de Información al Consumidor) — consumer complaints: local council
- OCU (Organización de Consumidores y Usuarios): ocu.org
- Banco de España — banking complaints: bde.es / 900 54 54 21
- CNMC — competition and utilities: cnmc.es
- FOGASA — employment unpaid wages: fogasa.gob.es
- Ministerio de Trabajo — employment: mitramiss.gob.es
- Turno de Oficio — FREE legal aid (Colegio de Abogados in each province)
- AEAT (Agencia Tributaria) — tax: aeat.es / 901 200 345
- Scam reporting: Policia Nacional cybercrime: politica.gob.es; Guardia Civil: guardiacivil.es; INCIBE (cybersecurity): incibe.es / 017.`,

  // ── ITALY ────────────────────────────────────────────────────────────────────
  'IT': `For Italy: apply Italian law precisely.
- Codice del Consumo (Consumer Code D.Lgs 206/2005) — consumer protections
- AGCM (Antitrust and Consumer Authority) — unfair practices: agcm.it
- Arbitro Bancario Finanziario (ABF) — FREE banking disputes: arbitrobancariofinanziario.it
- Conciliazione — mandatory mediation (mediazione obbligatoria) before certain civil courts
- Ispettorato Nazionale del Lavoro — employment: ispettorato.gov.it / 1500
- Patronato INPS — FREE social security and employment guidance
- Gratuito Patrocinio — FREE legal aid for low income
- Agenzia delle Entrate — tax: agenziaentrate.gov.it / 800 909 696
- Scam reporting: Polizia Postale (cybercrime): commissariatodips.it; Carabinieri 112; Polizia di Stato 113.`,

  // ── NETHERLANDS ──────────────────────────────────────────────────────────────
  'NL': `For Netherlands: apply Dutch law precisely.
- Consumentenbond — consumer disputes: consumentenbond.nl
- Geschillencommissie — disputes resolution: degeschillencommissie.nl
- AFM (Authority for the Financial Markets) — investment/financial: afm.nl / 0800 540 54 05
- DNB — banking supervision: dnb.nl
- UWV — employment and benefits: uwv.nl / 0900 9294
- Huurcommissie — rent disputes: huurcommissie.nl / 0800 488 72 43
- Rechtsbijstand / Juridisch Loket — FREE legal advice: juridischloket.nl / 0800 8020
- Belastingdienst — tax: belastingdienst.nl / 0800 0543
- Scam reporting: Fraudehelpdesk (fraudehelpdesk.nl / 088 786 7372), Politie 0900 8844.`,

  // ── SWEDEN ───────────────────────────────────────────────────────────────────
  'SE': `For Sweden: apply Swedish law precisely.
- Konsumentverket / Konsumentombudsmannen — consumer protection: konsumentverket.se
- Allmänna reklamationsnämnden (ARN) — consumer disputes (FREE): arn.se / 08 508 860 00
- Finansinspektionen — financial regulation: fi.se
- Hyres- och arrendenämnden — tenancy disputes
- Kronofogdemyndigheten — debt enforcement: kronofogden.se / 0771 73 73 00
- Rättshjälp — legal aid: domstol.se
- Skatteverket — tax: skatteverket.se / 0771 567 567
- Scam reporting: Polisen (polisen.se / 114 14), Konsumentverket for consumer fraud.`,

  // ── BRAZIL ───────────────────────────────────────────────────────────────────
  'BR': `For Brazil: apply Brazilian law precisely.
- Código de Defesa do Consumidor (CDC, Lei 8.078/1990) — strong consumer protections
- Procon — consumer complaints: each state has its own Procon (consumidor.gov.br nationally)
- BACEN (Banco Central) — banking complaints: bcb.gov.br / 145
- SENACON (Secretaria Nacional do Consumidor): justica.gov.br/seus-direitos/consumidor
- Juizados Especiais Cíveis — small claims up to 40 minimum wages, no lawyer needed
- CLT (Consolidação das Leis do Trabalho) — employment law; Justiça do Trabalho for disputes
- Defensoria Pública — FREE legal aid
- Receita Federal — tax: receita.fazenda.gov.br / 146
- Scam reporting: Polícia Civil (delegacia virtual), Safernet Brasil (safernet.org.br / 100).`,

  // ── MEXICO ───────────────────────────────────────────────────────────────────
  'MX': `For Mexico: apply Mexican law precisely.
- PROFECO (Procuraduría Federal del Consumidor) — consumer disputes: profeco.gob.mx / 800 468 8722
- CONDUSEF (Comisión Nacional para la Protección y Defensa de los Usuarios de Servicios Financieros) — financial complaints: condusef.gob.mx / 800 999 8080
- INFONAVIT — housing fund disputes: infonavit.org.mx / 800 008 3900
- JUNTA DE CONCILIACIÓN Y ARBITRAJE — employment disputes
- IMSS — social security: imss.gob.mx / 800 623 2323
- Comisión de Derechos Humanos — rights violations
- Defensoría Pública — FREE legal representation
- SAT (Servicio de Administración Tributaria) — tax: sat.gob.mx / 55 627 22 728
- Scam reporting: CONDUSEF for financial fraud, FGR cybercrimes: fgr.org.mx / 800 463 4789, GN (Guardia Nacional) 088.`,

  // ── CHILE ─────────────────────────────────────────────────────────────────────
  'CL': `For Chile: apply Chilean law precisely.
- Ley del Consumidor (Ley 19.496) — strong consumer protections
- SERNAC (Servicio Nacional del Consumidor) — consumer complaints: sernac.cl / 800 700 100 (FREE)
- CMF (Comisión para el Mercado Financiero) — banking and financial: cmfchile.cl / 800 700 401
- Dirección del Trabajo — employment disputes: dt.gob.cl / 600 450 4000
- Juzgados de Policía Local — small consumer claims
- Mediación obligatoria (free mediation) before many court proceedings
- SII (Servicio de Impuestos Internos) — tax: sii.cl / 22 395 1115
- CAJ (Corporación de Asistencia Judicial) — FREE legal aid: cajmetro.cl / 600 222 5252
- PDI (Policía de Investigaciones) — civil investigations
- Scam reporting: PDI Brigada del Cibercrimen: pdichile.cl / 134; CSIRT: csirt.gob.cl.`,

  // ── PERU ─────────────────────────────────────────────────────────────────────
  'PE': `For Peru: apply Peruvian law precisely.
- INDECOPI (Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual) — consumer protection: indecopi.gob.pe / 224-7777 (Lima) or 0800-4-4040 (FREE nationwide)
- SBS (Superintendencia de Banca y Seguros) — banking: sbs.gob.pe / 0800-10840
- Ministerio de Trabajo — employment disputes: trabajo.gob.pe / 0800-16872
- Poder Judicial — civil courts
- Defensoría del Pueblo — rights protection: defensoria.gob.pe / 0800-15170
- SUNAT — tax: sunat.gob.pe / 0801-12-100
- Scam reporting: PNP División de Delitos Informáticos: pnp.gob.pe / 105; CSIRT: pecert.gob.pe.`,

  // ── URUGUAY ─────────────────────────────────────────────────────────────────
  'UY': `For Uruguay: apply Uruguayan law precisely.
- Área de Defensa del Consumidor (ADECO) — consumer protection: gub.uy / 0800 5000
- BCU (Banco Central del Uruguay) — financial complaints: bcu.gub.uy / 2967 9898
- Ministerio de Trabajo y Seguridad Social — employment: mtss.gub.uy / 0800 9000
- Poder Judicial — courts: poderjudicial.gub.uy
- DGI — tax: dgi.gub.uy / 0800 4641
- Scam reporting: Policía Nacional: policia.gub.uy / 911; Unidad de Crimen Organizado.`,

  // ── PORTUGAL ─────────────────────────────────────────────────────────────────
  'PT': `For Portugal: apply Portuguese law precisely.
- DECO (Associação Portuguesa para a Defesa do Consumidor): deco.pt / 213 710 200
- Livro de Reclamações (Complaints Book) — mandatory in all businesses: livroreclamacoes.pt
- Banco de Portugal — banking complaints: bportugal.pt / 213 130 000
- ANACOM — telecom and postal: anacom.pt / 800 206 665
- ACT (Autoridade para as Condições do Trabalho) — employment: act.gov.pt / 800 202 424
- Centro de Arbitragem — consumer disputes without a lawyer
- CNIACC — consumer conflicts arbitration
- AT (Autoridade Tributária) — tax: portaldasfinancas.gov.pt / 217 206 707
- Scam reporting: PJ (Polícia Judiciária) cybercrimes: pj.pt / 21 864 2000; CNCS: cncs.gov.pt.`,

  // ── ARGENTINA ────────────────────────────────────────────────────────────────
  'AR': `For Argentina: apply Argentine law precisely.
- DEFENSA DEL CONSUMIDOR (Ley 24.240) — consumer protection: argentina.gob.ar/produccion/defensadelconsumidor
- BCRA (Banco Central de la República Argentina) — banking: bcra.gob.ar / 0800 444 2272
- UIF — financial crime: uif.gob.ar
- Ministerio de Trabajo — employment disputes: trabajo.gob.ar / 0800 999 2727
- AFIP — tax: afip.gob.ar / 0800 999 2347
- Centro de Mediación — free mediation before litigation
- Justicia Gratuita — legal aid varies by province
- Scam reporting: División Delitos Tecnológicos (Policía Federal): interpol.int; local police 911.`,

  // ── COLOMBIA ─────────────────────────────────────────────────────────────────
  'CO': `For Colombia: apply Colombian law precisely.
- SIC (Superintendencia de Industria y Comercio) — consumer protection: sic.gov.co / 601 592 0400
- Superfinanciera — financial complaints: superfinanciera.gov.co / 01800 054 6090
- Ministerio del Trabajo — employment: mintrabajo.gov.co / 01800 112 518
- Superintendencia de Notariado — property disputes
- DIAN — tax: dian.gov.co / 01800 091 DIAN
- Defensoría del Pueblo — FREE rights protection: defensoria.gov.co / 01800 914 814
- Comisarías de Familia — family disputes
- Scam reporting: Policía Nacional DIJIN (policia.gov.co / 112), CAI Virtual for cybercrimes.`,

  // ── JAPAN ─────────────────────────────────────────────────────────────────────
  'JP': `For Japan: apply Japanese law precisely.
- Consumer Affairs Agency (CAA): caa.go.jp / 188 (consumer hotline)
- National Consumer Affairs Centre (NCAC): kokusen.go.jp / 188
- Financial Services Agency (FSA): fsa.go.jp
- Labour Standards Inspection Office (労働基準監督署) — employment: mhlw.go.jp / 0570 783 172
- Civil Affairs Bureau — tenancy and contract disputes
- Japan Legal Support Centre (Japan Legal Aid — 法テラス): houterasu.or.jp / 0570 078 374 (FREE)
- NTA (National Tax Agency) — tax: nta.go.jp / 0570 00 5901
- Scam reporting: National Police Agency cyber: npa.go.jp; local police 110.`,

  // ── SOUTH KOREA ──────────────────────────────────────────────────────────────
  'KR': `For South Korea: apply South Korean law precisely.
- Korea Consumer Agency (KCA): kca.go.kr / 1372 (consumer dispute hotline — FREE)
- Financial Supervisory Service (FSS) — financial complaints: fss.or.kr / 1332
- Ministry of Employment and Labor — employment: moel.go.kr / 1350
- Korea Fair Trade Commission (KFTC): ftc.go.kr / 1600 4060
- Legal Aid Corporation — FREE legal help: klac.or.kr / 132
- National Tax Service — tax: nts.go.kr / 126
- Scam reporting: Cyber Investigation Bureau, National Police Agency: police.go.kr / 112; Financial Fraud Integrated Response System: 1332.`,

  // ── PHILIPPINES ──────────────────────────────────────────────────────────────
  'PH': `For Philippines: apply Philippine law precisely.
- Civil Code (RA 386), Labor Code (PD 442), Consumer Act (RA 7394), RA 9285 ADR Act
- DTI (consumer complaints): 1-384 | DOLE: 1349 | NLRC, SEC, BSP, NBI
- PAO (Public Attorney's Office) — FREE legal aid: 02-8928-9019
- Small Claims Court — up to PHP 400,000 without a lawyer
- Barangay conciliation (Katarungang Pambarangay) is REQUIRED before court for neighbour/land disputes
- HLURB / DHSUD — housing and real estate disputes
- For land disputes: DENR, Registry of Deeds, DARAB (agrarian)
- Scam reporting: NBI Cybercrime Division: nbi.gov.ph / 02-8523-8231; PNP Anti-Cybercrime Group: acg.pnp.gov.ph / 02-414-1560; IC3 Philippines.`,

  // ── INDONESIA ────────────────────────────────────────────────────────────────
  'ID': `For Indonesia: apply Indonesian law precisely.
- YLKI (Yayasan Lembaga Konsumen Indonesia) — consumer protection: ylki.or.id / 021 798 1858
- OJK (Otoritas Jasa Keuangan) — financial services: ojk.go.id / 157
- Disnakertrans — employment disputes (per province)
- BPSK (Badan Penyelesaian Sengketa Konsumen) — consumer disputes per city/regency (FREE)
- KPPU — competition law: kppu.go.id
- KemenkomInfo — digital/telecom complaints: kominfo.go.id / 159
- Direktorat Pajak — tax: pajak.go.id / 1500 200
- Scam reporting: Bareskrim Polri cybercrime: polri.go.id / 110; Kominfo aduan konten: aduankonten.id.`,

  // ── VIETNAM ──────────────────────────────────────────────────────────────────
  'VN': `For Vietnam: apply Vietnamese law precisely.
- VCCA (Vietnam Competition and Consumer Authority) — consumer protection: vcca.gov.vn / 1800 6838
- State Bank of Vietnam — banking: sbv.gov.vn
- Ministry of Labour, Invalids and Social Affairs (MOLISA) — employment: molisa.gov.vn
- Labour mediation councils and labour arbitration councils — employment disputes
- Legal Aid Centres — FREE: per province, moj.gov.vn
- General Department of Taxation (GDT): gdt.gov.vn / 19006276
- Scam reporting: Ministry of Public Security cybercrime: bocongan.gov.vn / 113; VNCERT/CC: vncert.vn.`,

  // ── THAILAND ─────────────────────────────────────────────────────────────────
  'TH': `For Thailand: apply Thai law precisely.
- OCPB (Office of the Consumer Protection Board) — consumer complaints: ocpb.go.th / 1166
- BOT (Bank of Thailand) — banking complaints: bot.or.th / 1213
- Department of Labour Protection and Welfare — employment: labour.go.th / 1506
- Land Department — property disputes: dol.go.th
- Office of the Attorney General — consumer litigation: ago.go.th
- Legal Aid Foundation of Thailand (มูลนิธิช่วยเหลือทางกฎหมาย): legalaids.net
- Revenue Department — tax: rd.go.th / 1161
- Scam reporting: Royal Thai Police Cybercrime Division: cyberpolice.go.th / 1441; ETDA: etda.or.th.`,

  // ── SWITZERLAND ──────────────────────────────────────────────────────────────
  'CH': `For Switzerland: apply Swiss law precisely (federal + cantonal).
- Swiss Consumer Protection Foundation (SKS/FRC/FCS): konsumentenschutz.ch / 031 370 24 24
- FINMA (financial markets): finma.ch / 031 327 91 00
- SECO (employment and consumer affairs): seco.admin.ch
- Schlichtungsstelle (ombudsman services): per sector
- Kantonales Arbeitsgericht — cantonal labour courts
- Unentgeltliche Rechtspflege — FREE legal aid for low income (per canton)
- Swiss Federal Tax Administration: estv.admin.ch / 058 462 71 06
- Scam reporting: cantonal police, NCSC (National Cyber Security Centre): ncsc.admin.ch / 058 460 22 22.`,

  // ── BELGIUM ──────────────────────────────────────────────────────────────────
  'BE': `For Belgium: apply Belgian law precisely.
- SPF Economie / FOD Economie — consumer protection: economie.fgov.be / 0800 120 33
- Point de Contact (consumer mediation): pointdecontact.be
- Ombudsfin — financial sector: ombudsfin.be / 02 545 77 70
- FOD WASO / FOD Werkgelegenheid — employment: emploi.belgique.be
- Huurwaarborg / Garantie locative — rental deposits
- Pro Deo — FREE legal aid: per arrondissement
- SPF Finances — tax: finance.belgium.be / 0257 257 57
- Scam reporting: Federal Computer Crime Unit (FCCU): eCops.be; local police 101.`,

  // ── AUSTRIA ──────────────────────────────────────────────────────────────────
  'AT': `For Austria: apply Austrian law precisely.
- Arbeiterkammer (AK) — FREE advice on consumer, employment, tenancy: arbeiterkammer.at / 01 501 65 0
- Wirtschaftskammer Österreich (WKO) — business and consumer mediation
- FMA (Financial Market Authority): fma.gv.at
- Schlichtungsstelle der Rechtsanwaltskammer — legal complaints
- Sozialministeriumservice — employment disability rights: sozialministeriumservice.at
- Verein für Konsumenteninformation (VKI): vki.at / 01 588 77
- Finanzamt — tax: bmf.gv.at / 0800 220 440
- Scam reporting: Bundeskriminalamt (BK): bmi.gv.at; Watchlist Internet: watchlist-internet.at; Polizei 133.`,

  // ── POLAND ───────────────────────────────────────────────────────────────────
  'PL': `For Poland: apply Polish law precisely.
- UOKiK (Consumer Protection Office) — consumer complaints: uokik.gov.pl / 22 55 60 800
- KNF (Financial Supervision Authority) — financial: knf.gov.pl
- PIP (National Labour Inspectorate) — employment: pip.gov.pl / 801 002 006
- Rzecznik Praw Obywatelskich (Ombudsman) — rights: rpo.gov.pl / 800 676 676
- Sąd Polubowny (arbitration courts) per sector
- Pomoc prawna z urzędu — FREE legal aid: per court district
- Urząd Skarbowy — tax: podatki.gov.pl / 22 330 03 30
- Scam reporting: Policja cybercrime: cyberpolicja.pl / 112; CERT Polska: cert.pl.`,

  // ── TURKEY ───────────────────────────────────────────────────────────────────
  'TR': `For Turkey: apply Turkish law precisely.
- Tüketici Hakem Heyeti (Consumer Arbitration Committee) — FREE disputes up to certain thresholds
- BDDK (Banking Regulation and Supervision Agency): bddk.org.tr / 0212 337 72 72
- Müşteri Şikayetleri (banking ombudsman): bankacilikyalnizca.gov.tr
- ALO 170 — Ministry of Labour hotline: csgb.gov.tr
- Tüketici Mahkemesi — Consumer Courts
- Baro Hukuki Yardım (Bar Association legal aid) — FREE: per city bar
- GİB (Revenue Administration) — tax: gib.gov.tr / 189
- Scam reporting: Siber Suçlarla Mücadele Dairesi (EGM cybercrime): iem.pol.tr / 155.`,

  // ── RUSSIA ───────────────────────────────────────────────────────────────────
  'RU': `For Russia: apply Russian law precisely.
- Rospotrebnadzor — consumer protection and complaints: rospotrebnadzor.ru / 8 800 555 49 43
- Bank of Russia — financial complaints: cbr.ru / 8 800 300 30 00
- Federal Labour Inspectorate (Rostrud) — employment: rostrud.gov.ru / 8 800 707 88 41
- Prokuratora — general rights protection and abuse of authority
- Yuridicheskaya pomoshch — FREE legal aid for qualified categories: minjust.gov.ru
- Federal Tax Service — tax: nalog.gov.ru / 8 800 222 22 22
- Scam reporting: Ministry of Internal Affairs (MVD) cybercrime: mvd.ru / 02; FSB: fsb.ru.`,

};

// ── SCAM REPORTING BODIES BY COUNTRY ─────────────────────────────────────────
const SCAM_REPORTERS = {
  'GB': 'Action Fraud (UK): actionfraud.police.uk or 0300 123 2040. Also report to your bank immediately.',
  'IE': 'Garda National Cyber Crime Bureau: reportcyber.ie — or report to your local Garda station.',
  'AU': 'Scamwatch: scamwatch.gov.au (ACCC). Also ReportCyber: cyber.gov.au/report. Contact your bank immediately.',
  'NZ': 'NetSafe: netsafe.org.nz or 0508 638 723. Police: 105 for financial fraud.',
  'CA': 'Canadian Anti-Fraud Centre: antifraudcentre-centreantifraude.ca or 1-888-495-8501.',
  'US': 'FTC: reportfraud.ftc.gov. FBI Internet Crime (IC3): ic3.gov. Also contact your bank immediately.',
  'IN': 'National Cyber Crime Reporting Portal: cybercrime.gov.in or helpline 1930.',
  'ZA': 'SAPS: 10111. South African Fraud Prevention Services (SAFPS): safps.org.za / 011 867 2234.',
  'NG': 'EFCC: efcc.gov.ng / 0800 225 5322. Nigeria Police Force: 199.',
  'KE': 'DCI Cyber Crime Unit: dci.go.ke / 0800 722 203. Safaricom fraud: *100#.',
  'SG': 'ScamShield App (scamshield.org.sg). Anti-Scam Helpline: 1800 722 6688. SPF: 999.',
  'MY': 'Royal Malaysia Police (PDRM): 999. Cyber999: cybersecurity.my / 1300 88 2999.',
  'HK': 'Cyber Security and Technology Crime Bureau (CSTCB): police.gov.hk. Report to 999.',
  'AE': 'Dubai Police eCrime: ecrime.ae / 901. Abu Dhabi Police: adpolice.gov.ae / 800 2626.',
  'DE': 'Bundeskriminalamt: bka.de. Local police (Polizei): 110. Verbraucherzentrale for consumer fraud.',
  'FR': 'Pharos: internet-signalement.gouv.fr. Cybermalveillance: cybermalveillance.gouv.fr. Police/Gendarmerie: 17.',
  'ES': 'Policía Nacional: policia.es. Guardia Civil: guardiacivil.es. INCIBE: incibe.es / 017.',
  'IT': 'Polizia Postale: commissariatodips.it. Carabinieri: 112. Polizia di Stato: 113.',
  'NL': 'Fraudehelpdesk: fraudehelpdesk.nl / 088 786 7372. Politie: 0900 8844.',
  'SE': 'Polisen: polisen.se / 114 14.',
  'BR': 'Polícia Civil (delegacia virtual). Safernet: safernet.org.br / 100.',
  'MX': 'Guardia Nacional: 088. FGR cybercrimes: fgr.org.mx / 800 463 4789.',
  'AR': 'División Delitos Tecnológicos (Policía Federal). Local police: 911.',
  'CO': 'Policía Nacional DIJIN: policia.gov.co / 112. CAI Virtual for cybercrimes.',
  'CL': 'PDI Brigada del Cibercrimen: pdichile.cl / 134. CSIRT: csirt.gob.cl. Carabinieri: 133.',
  'PE': 'PNP División de Delitos Informáticos: pnp.gob.pe / 105. PECERT: pecert.gob.pe.',
  'UY': 'Policía Nacional: policia.gub.uy / 911.',
  'PT': 'Polícia Judiciária cybercrimes: pj.pt / 21 864 2000. CNCS: cncs.gov.pt.',
  'JP': 'National Police Agency: npa.go.jp. Local police: 110.',
  'KR': 'National Police Agency cybercrime: police.go.kr / 112. Financial Fraud: 1332.',
  'PH': 'NBI Cybercrime Division: nbi.gov.ph / 02-8523-8231. PNP Anti-Cybercrime: acg.pnp.gov.ph / 02-414-1560.',
  'ID': 'Bareskrim Polri: polri.go.id / 110. Kominfo aduan: aduankonten.id.',
  'VN': 'Ministry of Public Security: bocongan.gov.vn / 113. VNCERT: vncert.vn.',
  'TH': 'Royal Thai Police Cybercrime: cyberpolice.go.th / 1441. ETDA: etda.or.th.',
  'CH': 'NCSC (National Cyber Security Centre): ncsc.admin.ch / 058 460 22 22. Cantonal police: 117.',
  'BE': 'eCops: ecops.be. Local police: 101.',
  'AT': 'Bundeskriminalamt: bmi.gv.at. Watchlist Internet: watchlist-internet.at. Polizei: 133.',
  'PL': 'Policja cybercrime: cyberpolicja.pl / 112. CERT Polska: cert.pl.',
  'TR': 'EGM Siber Suçlarla Mücadele: iem.pol.tr / 155.',
  'RU': 'MVD cybercrime: mvd.ru / 02.',
};

/**
 * Returns country-specific legal context for the given geo object
 */
export function getSortedGeoContext(geo) {
  const code = geo.code?.split('-')[0]; // handle e.g. 'US-CA' → 'US'
  return COUNTRY_CONTEXTS[code] || COUNTRY_CONTEXTS[geo.code] ||
    `Reference specific legislation, named regulatory bodies, and real contact details for ${geo.country}. Apply ${geo.jurisdiction} with precision.`;
}

/**
 * Returns the country-specific scam reporting body string
 */
export function getScamReportingBody(geo) {
  const code = geo.code?.split('-')[0];
  return SCAM_REPORTERS[code] || SCAM_REPORTERS[geo.code] ||
    `Report this to your national cybercrime or consumer protection authority in ${geo.country}. Also contact your bank immediately if any financial details were shared.`;
}

// Map country codes to their primary language for explicit response language instruction
const COUNTRY_LANGUAGE = {
  'GB': 'English', 'IE': 'English', 'AU': 'English', 'NZ': 'English', 'CA': 'English',
  'US': 'English', 'ZA': 'English', 'NG': 'English', 'KE': 'English', 'SG': 'English',
  'PH': 'English', 'HK': 'English', 'MY': 'English',
  'DE': 'German', 'AT': 'German', 'CH': 'German',
  'FR': 'French', 'BE': 'French',
  'ES': 'Spanish', 'MX': 'Spanish', 'AR': 'Spanish', 'CO': 'Spanish', 'CL': 'Spanish', 'PE': 'Spanish', 'UY': 'Spanish', 'VE': 'Spanish', 'EC': 'Spanish', 'BO': 'Spanish', 'PY': 'Spanish', 'CR': 'Spanish', 'PA': 'Spanish', 'GT': 'Spanish',
  'IT': 'Italian',
  'NL': 'Dutch',
  'SE': 'Swedish',
  'PL': 'Polish',
  'TR': 'Turkish',
  'RU': 'Russian',
  'BR': 'Portuguese', 'PT': 'Portuguese', 'UY': 'Spanish',
  'JP': 'Japanese',
  'KR': 'Korean',
  'CN': 'Chinese (Simplified)',
  'TW': 'Chinese (Traditional)',
  'IN': 'English', // India: respond in English unless the document/message is in another language
  'ID': 'Indonesian (Bahasa Indonesia)',
  'VN': 'Vietnamese',
  'TH': 'Thai',
  'AE': 'English', // UAE: English is the dominant business language
  'SA': 'Arabic',
};

/**
 * Returns the full geo context string to inject into prompts
 * Includes: today's date, country, jurisdiction, legal context, AND language instruction
 */
export function buildSortedGeoPromptContext(geo) {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const countryContext = getSortedGeoContext(geo);
  const code = geo.code?.split('-')[0];
  const lang = COUNTRY_LANGUAGE[code] || null;
  const langInstruction = lang
    ? `CRITICAL LANGUAGE RULE: Respond entirely in ${lang}. The user's language is ${lang}. Every word of your response — labels, explanations, action steps, everything — must be in ${lang}. Do not switch to English unless the document itself is in English and the user appears to be communicating in English.`
    : `Detect the language the user is writing in or the language of the document they submitted, and respond fully in that same language. Do not default to English if the user's language is clearly something else.`;
  return `Today's date is ${today}. The person is in: ${geo.country}. Apply ${geo.jurisdiction} precisely. ${countryContext} When calculating urgency, use today's date. ${langInstruction}`;
}