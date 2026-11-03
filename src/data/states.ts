// State guides. Each one is checked against the licensing boards' own pages
// and published sources, listed in `sources`, on the date in `lastChecked`.
// Only states in this list get a page; add a state only once its facts are
// checked the same way. Licensing rules change: re-check a guide when its
// lastChecked date is more than a year old.

export interface Board {
  name: string;
  /** What this board licenses, in plain words. */
  licenses: string;
  /** Where to search the board's licence records. */
  lookupUrl: string;
  /** Extra help when the search isn't a direct link. */
  lookupNote?: string;
  website: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface StateGuide {
  slug: string;
  code: string;
  name: string;
  /** Does the state itself license general contractors? */
  generalContractors: 'state' | 'state-and-local' | 'local-only';
  /** One line for the state list and search-result descriptions. */
  short: string;
  /** One paragraph shown at the top of the page. */
  summary: string;
  boards: Board[];
  whenRequired: string[];
  howToCheck: string[];
  watchFor: string[];
  faq: Faq[];
  sources: { label: string; url: string }[];
  /** ISO date the facts were last checked. */
  lastChecked: string;
}

export const STATES: StateGuide[] = [
  {
    slug: 'california',
    code: 'CA',
    name: 'California',
    generalContractors: 'state',
    short: 'Licensed by the Contractors State License Board (CSLB) for jobs of $1,000 or more.',
    summary:
      'California licenses contractors through the Contractors State License Board (CSLB). A licensed contractor is required for any job of $1,000 or more in labor and materials, and for smaller jobs that need a building permit or are done by someone with employees.',
    boards: [
      {
        name: 'Contractors State License Board (CSLB)',
        licenses: 'General engineering (Class A), general building (Class B) and specialty trade (Class C) contractors',
        lookupUrl: 'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
        website: 'https://www.cslb.ca.gov/',
      },
    ],
    whenRequired: [
      'Any job of $1,000 or more, counting labor and materials together.',
      'Any job that needs a building permit, whatever its price.',
      'Any job done by someone who has employees.',
      'The $1,000 limit has applied since January 1, 2025. Before that it was $500.',
    ],
    howToCheck: [
      'Ask for the contractor’s license number and the business name exactly as it appears on the license.',
      'Search CSLB’s Instant License Check by license number, business name or personal name.',
      'Confirm the license is active and that its class fits your job: B for general building work, the matching C class for a specialty trade such as electrical or plumbing.',
      'Look at the bond and workers’ compensation details, and at any disciplinary or legal actions listed.',
      'Make sure the name on your contract matches the name on the license.',
    ],
    watchFor: [
      'For home-improvement work, a contractor may not ask for a down payment of more than 10% of the contract price or $1,000, whichever is less, unless it has a special blanket bond on file with CSLB.',
      'Someone who advertises that they are licensed can’t rely on the under-$1,000 exemption.',
    ],
    faq: [
      {
        q: 'Do I need a licensed contractor for a job under $1,000?',
        a: 'Not always. Since January 1, 2025, an unlicensed person may do a job under $1,000 in labor and materials, but only if it needs no building permit and they have no employees. Anyone who advertises as licensed can’t use this exemption.',
      },
      {
        q: 'What do Class A, B and C mean?',
        a: 'Class A covers general engineering work such as roads, bridges and pipelines, Class B covers general building, and Class C covers specialty trades such as electrical or plumbing. Check that the class on the license fits your project.',
      },
      {
        q: 'Does the CSLB lookup show complaints?',
        a: 'It shows disciplinary and legal actions on the license, together with its status, classes, bond and workers’ compensation details.',
      },
      {
        q: 'How much can a contractor ask for up front?',
        a: 'For home-improvement work, no more than 10% of the contract price or $1,000, whichever is less, unless the contractor has a blanket bond on file with CSLB. Later payments should match work done or materials delivered.',
      },
    ],
    sources: [
      {
        label: 'CSLB industry bulletin on AB 2622 (the $1,000 minor work exemption)',
        url: 'https://www.cslb.ca.gov/Resources/IndustryBulletins/2024/AB%202622%20Implementation.FINAL.pdf',
      },
      {
        label: 'CSLB contract payment rules',
        url: 'https://www.cslb.ca.gov/Resources/MediaRoom/DisasterHelp/ContractPaymentRules.English.pdf',
      },
      {
        label: 'CSLB Instant License Check',
        url: 'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'florida',
    code: 'FL',
    name: 'Florida',
    generalContractors: 'state-and-local',
    short: 'Certified contractors work statewide; registered ones only where they hold a local license.',
    summary:
      'Florida licenses contractors through the Department of Business and Professional Regulation (DBPR). Certified contractors may work anywhere in the state; registered contractors may work only in the cities or counties where they hold a local license.',
    boards: [
      {
        name: 'DBPR Construction Industry Licensing Board',
        licenses: 'General, building, residential, roofing, plumbing, air-conditioning, pool and other construction contractors',
        lookupUrl: 'https://www.myfloridalicense.com/wl11.asp',
        lookupNote: 'Use “Verify a License” and search by name or license number.',
        website: 'https://www2.myfloridalicense.com/construction-industry/',
      },
      {
        name: 'DBPR Electrical Contractors’ Licensing Board',
        licenses: 'Electrical and alarm system contractors',
        lookupUrl: 'https://www.myfloridalicense.com/wl11.asp',
        lookupNote: 'The same “Verify a License” search covers electrical contractors.',
        website: 'https://www2.myfloridalicense.com/',
      },
    ],
    whenRequired: [
      'Work in the trades the state licenses (building, roofing, plumbing, air conditioning, pools, electrical and others) needs a state-licensed contractor.',
      'Work the state doesn’t license, such as some painting, flooring or handyman jobs, may still need a license from your city or county.',
    ],
    howToCheck: [
      'Ask for the license number and the business name on the license.',
      'Search DBPR’s “Verify a License” by name or license number.',
      'Confirm the license is current and active, and that its type fits your job.',
      'Check whether the license is certified or registered. A registered license is valid only where the contractor holds a local license, so confirm it covers your city or county.',
      'Make sure the name on your contract matches the license.',
    ],
    watchFor: [
      'Contracting without a license during a declared state of emergency, such as after a hurricane, is a felony in Florida. Be especially careful with door-to-door offers after a storm.',
    ],
    faq: [
      {
        q: 'What is the difference between a certified and a registered contractor?',
        a: 'A certified contractor passed the state exam and may work anywhere in Florida. A registered contractor holds a local license and may work only in the cities or counties where it is registered, so check that your property is covered.',
      },
      {
        q: 'Who licenses electricians in Florida?',
        a: 'Electrical and alarm system contractors are licensed by DBPR’s Electrical Contractors’ Licensing Board. You can check them in the same “Verify a License” search.',
      },
      {
        q: 'Do handymen need a license in Florida?',
        a: 'Florida has no state handyman license, but handymen can’t do work in licensed trades such as electrical, plumbing, roofing or air conditioning. Many cities and counties have their own rules, so check locally.',
      },
    ],
    sources: [
      {
        label: 'DBPR Verify a License',
        url: 'https://www.myfloridalicense.com/wl11.asp',
      },
      {
        label: 'DBPR construction industry public records',
        url: 'https://www2.myfloridalicense.com/construction-industry/public-records/',
      },
      {
        label: 'Florida Statutes §489.127 (unlicensed contracting)',
        url: 'https://www.flsenate.gov/Laws/Statutes/2024/489.127',
      },
      {
        label: 'Charlotte County: unlicensed contracting during an emergency is a felony',
        url: 'https://www.charlottecountyfl.gov/departments/community-development/notices/unlicensed-contracting-is-a-felony.stml',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'texas',
    code: 'TX',
    name: 'Texas',
    generalContractors: 'local-only',
    short: 'No state general contractor license; trades are licensed by TDLR and the plumbing board.',
    summary:
      'Texas has no state license for general contractors, home builders or roofers. Trades are licensed separately: electricians and air-conditioning contractors by the Texas Department of Licensing and Regulation (TDLR), plumbers by the State Board of Plumbing Examiners. Cities and counties handle builder registration and permits.',
    boards: [
      {
        name: 'Texas Department of Licensing and Regulation (TDLR)',
        licenses: 'Electricians and electrical contractors, air conditioning and refrigeration contractors, and other occupations',
        lookupUrl: 'https://www.tdlr.texas.gov/LicenseSearch/',
        website: 'https://www.tdlr.texas.gov/',
      },
      {
        name: 'Texas State Board of Plumbing Examiners (TSBPE)',
        licenses: 'Master, journeyman and other plumbing licenses',
        lookupUrl: 'https://tsbpe.texas.gov/',
        lookupNote: 'Use “Find a license/registration” at the top of the board’s website.',
        website: 'https://tsbpe.texas.gov/',
      },
    ],
    whenRequired: [
      'Electrical, air-conditioning and plumbing work needs a state-licensed tradesperson.',
      'General contracting, remodeling and roofing have no state license. Your city or county may require registration and permits.',
    ],
    howToCheck: [
      'For a general contractor, ask your city’s building department whether the contractor is registered there and has pulled permits for past jobs.',
      'Check electricians and air-conditioning contractors in TDLR’s license search.',
      'Check plumbers with the State Board of Plumbing Examiners. For a plumbing company, check its responsible master plumber’s license.',
      'Ask for a certificate of insurance and confirm it with the insurer.',
      'Make sure the permits for your job are pulled in the contractor’s name.',
    ],
    watchFor: [
      'A contractor who says they are “state licensed” for general building or roofing work is a red flag: Texas has no such license.',
      'Texas used to register home builders through its Residential Construction Commission, but the commission was abolished in 2009.',
    ],
    faq: [
      {
        q: 'Does Texas require a general contractor license?',
        a: 'No. Texas has no state license for general contractors or home builders. Some cities require contractors to register and pull permits, so ask your local building department.',
      },
      {
        q: 'How do I check an electrician or HVAC contractor in Texas?',
        a: 'Search TDLR’s license search by name or license number. TDLR licenses electricians and electrical contractors, and air conditioning and refrigeration contractors.',
      },
      {
        q: 'How do I check a plumber in Texas?',
        a: 'Use “Find a license/registration” on the State Board of Plumbing Examiners’ website. For a plumbing company, check the license of its responsible master plumber.',
      },
      {
        q: 'Do roofers need a license in Texas?',
        a: 'Not from the state. Check whether your city requires registration and a permit, and ask for proof of insurance.',
      },
    ],
    sources: [
      {
        label: 'TDLR license search',
        url: 'https://www.tdlr.texas.gov/LicenseSearch/',
      },
      {
        label: 'TSBPE consumer information',
        url: 'https://tsbpe.texas.gov/consumer-information/',
      },
      {
        label: 'Texas Occupations Code ch. 1305 (electricians)',
        url: 'https://statutes.capitol.texas.gov/Docs/OC/htm/OC.1305.htm',
      },
      {
        label: 'Texas Occupations Code ch. 1302 (air conditioning and refrigeration contractors)',
        url: 'https://statutes.capitol.texas.gov/Docs/OC/htm/OC.1302.htm',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'virginia',
    code: 'VA',
    name: 'Virginia',
    generalContractors: 'state',
    short: 'The Board for Contractors licenses Class A, B and C contractors for jobs over $1,000.',
    summary:
      'Virginia licenses contractor businesses through the Board for Contractors at the Department of Professional and Occupational Regulation (DPOR), as Class A, B or C depending on job size. Most jobs over $1,000 need a state license, and the contractor’s class must cover the full price of your job.',
    boards: [
      {
        name: 'Virginia Board for Contractors (DPOR)',
        licenses:
          'Contractor businesses in Class A, B and C, with specialties such as residential building, home improvement, electrical, plumbing and HVAC, and individual tradesmen such as electricians, plumbers, HVAC technicians and gas fitters',
        lookupUrl: 'https://dporweb.dpor.virginia.gov/LicenseLookup/',
        lookupNote: 'Search by name, license number or trade name. The same site has a separate search for disciplinary actions.',
        website: 'https://www.dpor.virginia.gov/Boards/Contractors',
      },
    ],
    whenRequired: [
      'Contracting jobs over $1,000 need a state license. A city or county business license alone is not enough.',
      'The license class sets how big a job the contractor may take. Since July 1, 2025, Class C covers jobs under $30,000, Class B jobs under $150,000, and Class A larger jobs. Each class also has a yearly limit.',
      'Electrical, plumbing and HVAC work needs that specialty on the contractor’s license, and the workers need individual tradesman licenses. The home improvement and residential building specialties don’t cover these trades.',
      'Owners building or repairing a home for their own use are exempt for one primary residence in any 24-month period.',
    ],
    howToCheck: [
      'Ask for the contractor’s DPOR license number and exact business name.',
      'Search the DPOR License Lookup by license number or business name.',
      'Confirm the license is active, its class (A, B or C) covers your job’s total price, and its specialties match the work.',
      'Check DPOR’s disciplinary action search. For electrical, plumbing or HVAC work, also look up the tradesman’s individual license.',
      'Get a written contract that shows the license number and class.',
    ],
    watchFor: [
      'Virginia’s Contractor Transaction Recovery Fund can repay homeowners up to $30,000 per claim when a licensed contractor acted improperly or dishonestly on a home job. You first need a court judgment against the contractor, and the fund doesn’t cover unlicensed contractors.',
      'Some older DPOR documents still show the class limits from before July 2025 ($10,000 and $120,000). The limits above are current.',
    ],
    faq: [
      {
        q: 'Do I need a licensed contractor for a small job in Virginia?',
        a: 'A state license is required for contracting jobs over $1,000. Smaller jobs don’t need one, though DPOR recommends hiring a licensed contractor whatever the cost.',
      },
      {
        q: 'What is the difference between a Class A, B and C contractor license in Virginia?',
        a: 'The class sets how large a job the contractor may take. Since July 1, 2025, Class C covers jobs under $30,000, Class B jobs under $150,000, and Class A has no upper limit. Each class also has a yearly total limit.',
      },
      {
        q: 'Is a local business license the same as a Virginia contractor license?',
        a: 'No. Contracting work over $1,000 needs a state license from the Board for Contractors, not just a city or county business license.',
      },
      {
        q: 'Can I get money back if a licensed Virginia contractor cheats me?',
        a: 'You may be able to claim up to $30,000 from DPOR’s Contractor Transaction Recovery Fund. You first need a court judgment against the licensed contractor and must have tried other ways to collect.',
      },
    ],
    sources: [
      { label: 'DPOR Board for Contractors', url: 'https://www.dpor.virginia.gov/Boards/Contractors' },
      { label: 'DPOR License Lookup', url: 'https://dporweb.dpor.virginia.gov/LicenseLookup/' },
      {
        label: 'Code of Virginia § 54.1-1100 (license classes and limits)',
        url: 'https://law.lis.virginia.gov/vacode/title54.1/chapter11/section54.1-1100/',
      },
      {
        label: 'Code of Virginia § 54.1-1101 (exemptions)',
        url: 'https://law.lis.virginia.gov/vacode/title54.1/chapter11/section54.1-1101/',
      },
      { label: 'DPOR Contractor Transaction Recovery Fund', url: 'https://www.dpor.virginia.gov/Boards/Contractors_Recovery_Fund' },
      { label: 'DPOR: 2025 legislation', url: 'https://www.dpor.virginia.gov/News/AgencyLegislation2025' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'washington',
    code: 'WA',
    name: 'Washington',
    generalContractors: 'state',
    short: 'Every contractor must register with Labor & Industries, with a bond and insurance.',
    summary:
      'Washington requires construction contractors to register with the Department of Labor & Industries (L&I) as general or specialty contractors, with a bond and liability insurance. Electrical and plumbing work also needs an L&I contractor license and certified workers.',
    boards: [
      {
        name: 'Washington State Department of Labor & Industries (L&I)',
        licenses:
          'Contractor registration (general and specialty), electrical and plumbing contractor licenses, and electrician and plumber certificates',
        lookupUrl: 'https://secure.lni.wa.gov/verify/',
        lookupNote:
          'Search by business or owner name, registration number or UBI number. The record shows registration status, bond, insurance, lawsuits against the bond and L&I violations.',
        website: 'https://lni.wa.gov/licensing-permits/contractors/',
      },
    ],
    whenRequired: [
      'Anyone who builds, repairs or remodels for others must register with L&I. The only small-job exemption is casual or minor work under $500 in labor and materials that isn’t part of a larger job, and it doesn’t apply to anyone who advertises as a contractor.',
      'A contractor who uses more than one trade on a job registers as a general contractor; a one-trade business registers as a specialty contractor.',
      'Since July 1, 2024, the required bond is $30,000 for general contractors and $15,000 for specialty contractors.',
      'Electrical work needs an L&I electrical contractor license and certified electricians. Plumbing work needs an L&I-licensed plumbing contractor and certified plumbers.',
    ],
    howToCheck: [
      'Get the contractor’s L&I registration number or UBI number. It should be on their ads and written bids.',
      'Search L&I’s Verify tool by registration number, UBI number, or business or owner name.',
      'Confirm the registration is active, its type (general or specialty) fits your project, and the bond and insurance are current.',
      'Review any lawsuits against the bond and any L&I violations. For electrical or plumbing work, also check the contractor license and each worker’s certificate.',
      'For a home job of $1,000 or more, get the contractor’s signed disclosure statement before work starts.',
    ],
    watchFor: [
      'For home jobs of $1,000 or more, the contractor must give you a signed disclosure statement explaining that unpaid subcontractors or suppliers can put a lien on your property. Ask for lien releases before you make the final payment.',
      'A contractor’s bond is limited to $30,000 or $15,000, and you must sue within two years after the work was finished or abandoned to claim on it. If that isn’t enough, L&I’s Homeowner Recovery Fund may pay owner-occupants up to $25,000 after a court judgment, depending on available money.',
    ],
    faq: [
      {
        q: 'Does Washington State license general contractors?',
        a: 'Washington requires general and specialty contractors to register with the Department of Labor & Industries, with a surety bond, liability insurance and a Washington business license. Electrical and plumbing contractors need an additional L&I license.',
      },
      {
        q: 'How much is a contractor bond in Washington?',
        a: 'Since July 1, 2024, the bond is $30,000 for general contractors and $15,000 for specialty contractors. Contractors registered before then raise their bond when they renew.',
      },
      {
        q: 'Does a handyman need to be registered in Washington?',
        a: 'Yes, in most cases. The only exemption is casual or minor work under $500 that isn’t part of a larger job, and it doesn’t apply to anyone who advertises as a contractor.',
      },
      {
        q: 'What can I do if a Washington contractor does bad work?',
        a: 'You can sue the contractor and their bond, generally within two years after the work was finished or abandoned. If the bond doesn’t cover your loss, you may qualify for L&I’s Homeowner Recovery Fund, which pays up to $25,000 depending on available money.',
      },
    ],
    sources: [
      { label: 'L&I Verify a Contractor, Tradesperson or Business', url: 'https://secure.lni.wa.gov/verify/' },
      { label: 'L&I news: higher contractor bonds (July 2024)', url: 'https://www.lni.wa.gov/news-events/article/24-13/' },
      { label: 'RCW 18.27.090 (exemptions)', url: 'https://app.leg.wa.gov/rcw/default.aspx?cite=18.27.090' },
      { label: 'RCW 18.27.114 (disclosure statement)', url: 'https://app.leg.wa.gov/rcw/default.aspx?cite=18.27.114' },
      { label: 'RCW 18.27.040 (bond and bond lawsuits)', url: 'https://app.leg.wa.gov/rcw/default.aspx?cite=18.27.040' },
      {
        label: 'L&I Homeowner Recovery Fund',
        url: 'https://lni.wa.gov/licensing-permits/contractors/problems-with-a-contractor/homeowner-recovery-fund',
      },
      { label: 'L&I licensed plumbing contractor', url: 'https://lni.wa.gov/licensing-permits/plumbing/licensed-plumbing-contractor/' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'georgia',
    code: 'GA',
    name: 'Georgia',
    generalContractors: 'state',
    short: 'A state license for home projects over $2,500, and separate licenses for the trades.',
    summary:
      'Georgia licenses residential and commercial general contractors through a state board under the Secretary of State, and licenses electricians, plumbers and HVAC contractors separately. A home project worth more than $2,500 needs a state-licensed contractor.',
    boards: [
      {
        name: 'State Licensing Board for Residential and Commercial General Contractors',
        licenses:
          'Residential-Basic, Residential-Light Commercial, Commercial General Contractor and Commercial General Contractor Limited Tier licenses',
        lookupUrl: 'https://verify.sos.ga.gov/verification/',
        lookupNote:
          'Search by person’s name, business name or license number; use the business search for a company. The profession may still be listed as Residential and General Contractors.',
        website: 'https://sos.ga.gov/state-licensing-board-residential-and-commercial-general-contractors',
      },
      {
        name: 'Georgia Secretary of State: construction trade licenses',
        licenses: 'Electrical contractors, master and journeyman plumbers, and conditioned air (HVAC) contractors',
        lookupUrl: 'https://verify.sos.ga.gov/verification/',
        lookupNote: 'Use the same search and choose the trade, such as Electrical Contractors, Plumbers or Conditioned Air Contractors, as the profession.',
        website: 'https://verify.sos.ga.gov/verification/',
      },
    ],
    whenRequired: [
      'A residential contractor license is required when the work on a home, or the contractor’s pay, is worth more than $2,500.',
      'Electrical, plumbing and HVAC work needs a separate state trade license.',
      'Roofers, painters, drywall installers and repair handymen are not licensed by the state, as long as they stay within their trade.',
      'You don’t need a license to build your own home, but you must follow local building codes and get permits.',
    ],
    howToCheck: [
      'Ask for the contractor’s license number and the exact business name.',
      'Search the Secretary of State’s license verification by name, business name or license number.',
      'Choose the right profession: Residential and General Contractors for builders and remodelers, or the trade for electrical, plumbing or HVAC work.',
      'Check that the license is active and that the name matches your estimate and contract.',
      'If a company is doing the job, make sure the company is licensed, not only one person.',
    ],
    watchFor: [
      'Roofers, painters, drywall installers and handymen have no state license, so check references and insurance. The Attorney General warns that a contractor who offers to pay your insurance deductible may be running a scam.',
      'Under Georgia’s Right to Repair Act, you must send the contractor written notice of a construction defect at least 90 days before you sue, and give them a chance to respond or offer repairs.',
    ],
    faq: [
      {
        q: 'How do I look up a contractor’s license in Georgia?',
        a: 'Use the Secretary of State’s license verification search. You can search by name, business name or license number.',
      },
      {
        q: 'Does a contractor need a license for a small job in Georgia?',
        a: 'A residential contractor license is required when the work, or the contractor’s pay, is worth more than $2,500. Electrical, plumbing and HVAC work needs a separate state trade license whatever the price.',
      },
      {
        q: 'Do roofers need a license in Georgia?',
        a: 'No. The state doesn’t license roofers, painters, drywall installers or handymen. Any electrical, plumbing or HVAC work on the job still needs a licensed trade contractor.',
      },
      {
        q: 'Do I need a license to build my own house in Georgia?',
        a: 'No. You can build your own home without a license, but you still have to follow local building codes and get local permits.',
      },
    ],
    sources: [
      {
        label: 'Georgia SOS: State Licensing Board for Residential and Commercial General Contractors',
        url: 'https://sos.ga.gov/state-licensing-board-residential-and-commercial-general-contractors',
      },
      {
        label: 'Georgia SOS: residential and commercial general contractors FAQ',
        url: 'https://sos.ga.gov/page/residential-and-commercial-general-contractors-frequently-asked-questions',
      },
      {
        label: 'O.C.G.A. Title 43, Chapter 41 (residential and general contractors)',
        url: 'https://sos.ga.gov/sites/default/files/2022-02/49_residential_and_general_contractors_43-41.pdf',
      },
      { label: 'Georgia SOS: license verification', url: 'https://verify.sos.ga.gov/verification/' },
      {
        label: 'Georgia Consumer Protection: home repairs and improvements',
        url: 'https://consumer.georgia.gov/consumer-topics/home-repair-improvements',
      },
      { label: 'Georgia Consumer Protection: Right to Repair Act', url: 'https://consumer.georgia.gov/consumer-topics/right-repair-act' },
      { label: 'Georgia Consumer Protection: storms and fraud', url: 'https://consumer.georgia.gov/consumer-topics/storms-fraud' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'north-carolina',
    code: 'NC',
    name: 'North Carolina',
    generalContractors: 'state',
    short: 'A general contractor license for projects of $40,000 or more; trades are licensed separately.',
    summary:
      'North Carolina’s Licensing Board for General Contractors licenses contractors for any project that costs $40,000 or more. Electrical, plumbing, heating and air-conditioning, and fire sprinkler contractors need licenses from their own state boards whatever the price.',
    boards: [
      {
        name: 'North Carolina Licensing Board for General Contractors',
        licenses:
          'General contractors on projects of $40,000 or more, with Limited (up to $750,000), Intermediate (up to $1.5 million) and Unlimited licenses',
        lookupUrl: 'https://portal.nclbgc.org/Public/Search',
        lookupNote: 'Fill in at least one field, such as company name, person’s name or license number.',
        website: 'https://nclbgc.org/',
      },
      {
        name: 'North Carolina State Board of Examiners of Electrical Contractors',
        licenses: 'Electrical contractors',
        lookupUrl: 'https://arls-public.ncbeec.org/Public/Search',
        lookupNote: 'Fill in at least one field, such as company name or license number.',
        website: 'https://www.ncbeec.org/',
      },
      {
        name: 'North Carolina State Board of Examiners of Plumbing, Heating and Fire Sprinkler Contractors',
        licenses: 'Plumbing, heating and air-conditioning, and fire sprinkler contractors',
        lookupUrl: 'https://public.nclicensing.org/Public/Search',
        lookupNote: 'Fill in at least one field, such as company name or license number.',
        website: 'https://nclicensing.org/',
      },
    ],
    whenRequired: [
      'A general contractor license is required when the total project cost is $40,000 or more. The limit rose from $30,000 on October 1, 2023.',
      'Electrical work needs a license from the electrical board, and plumbing, heating and fire sprinkler work a license from the plumbing board, whatever the project costs.',
      'A property owner building on their own land can get a permit without a general contractor license by signing an affidavit that they will personally supervise the work.',
      'Owners may do electrical work on their own property for their own use if it is not offered for sale, rent or lease.',
    ],
    howToCheck: [
      'For a project of $40,000 or more, search the Licensing Board for General Contractors by company name, person’s name or license number.',
      'Check that the license is valid and that its limit covers your project: Limited up to $750,000, Intermediate up to $1.5 million, Unlimited with no cap.',
      'For electrical work, search the electrical board. For plumbing, heating, air-conditioning or fire sprinkler work, search the plumbing board.',
      'Make sure your contract lists the contractor’s full name and license number, and that they match the record.',
      'Before work starts, check with your local permit office that the contractor has pulled the permits.',
    ],
    watchFor: [
      'The board’s Homeowners Recovery Fund can repay some losses on a single-family home caused by a licensed general contractor, or by an unlicensed one who claimed to be licensed. You first need a court judgment you can’t collect, and must apply within a year after the case ends.',
      'The board investigates unlicensed contracting only on projects of $40,000 or more. For smaller jobs, complain to the Attorney General’s Consumer Protection Division.',
    ],
    faq: [
      {
        q: 'How do I check a contractor’s license in North Carolina?',
        a: 'For general contractors, use the Licensing Board for General Contractors’ license search. Electricians, plumbers and HVAC contractors have their own boards’ searches.',
      },
      {
        q: 'Does a contractor need a license for jobs under $40,000 in North Carolina?',
        a: 'No general contractor license is needed for projects under $40,000. Electrical, plumbing, HVAC and fire sprinkler work still needs a license from the right state board.',
      },
      {
        q: 'What is the North Carolina Homeowners Recovery Fund?',
        a: 'A fund run by the Licensing Board for General Contractors that can repay some losses from a contractor’s dishonest or incompetent work on a single-family home. You first need a court judgment against the contractor that you can’t collect.',
      },
      {
        q: 'Can I do my own electrical work in North Carolina?',
        a: 'State law lets owners do electrical work on their own property for their own use, as long as the property isn’t offered for sale, rent or lease. Building code, permit and inspection rules still apply.',
      },
    ],
    sources: [
      { label: 'NC Licensing Board for General Contractors: FAQ for consumers', url: 'https://nclbgc.org/faq-consumers/' },
      { label: 'NCLBGC: license search', url: 'https://portal.nclbgc.org/Public/Search' },
      {
        label: 'NCLBGC: September 2023 board brief (the $40,000 limit)',
        url: 'https://www.nclbgc.org/2023/09/06/september-2023-board-brief/',
      },
      { label: 'NCLBGC: Homeowners Recovery Fund', url: 'https://nclbgc.org/homeowners-recovery-fund/' },
      {
        label: 'NC General Statutes ch. 87, art. 1 (general contractors)',
        url: 'https://www.ncleg.gov/EnactedLegislation/Statutes/PDF/ByArticle/Chapter_87/Article_1.pdf',
      },
      {
        label: 'G.S. 87-43 (electrical contracting)',
        url: 'https://www.ncleg.gov/enactedlegislation/statutes/html/bysection/chapter_87/gs_87-43.html',
      },
      {
        label: 'G.S. 87-21 (plumbing, heating and fire sprinkler contractors)',
        url: 'https://www.ncleg.gov/enactedlegislation/statutes/html/bysection/chapter_87/gs_87-21.html',
      },
      { label: 'NC Department of Justice: home improvement', url: 'https://ncdoj.gov/protecting-consumers/home-repair-and-products/home-improvement/' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'pennsylvania',
    code: 'PA',
    name: 'Pennsylvania',
    generalContractors: 'local-only',
    short: 'No state license; home improvement contractors register with the Attorney General.',
    summary:
      'Pennsylvania doesn’t license general contractors or most trades at the state level. Instead, home improvement contractors must register with the Office of Attorney General, and some cities, including Philadelphia and Pittsburgh, require their own licenses.',
    boards: [
      {
        name: 'Pennsylvania Office of Attorney General: Home Improvement Contractor registration',
        licenses: 'Home improvement contractors, under the Home Improvement Consumer Protection Act (a registration, not a license)',
        lookupUrl: 'https://hicsearch.attorneygeneral.gov/',
        lookupNote:
          'The search shows active registrations only. If it isn’t working or the contractor doesn’t appear, call the Attorney General’s home improvement hotline at 1-888-520-6680.',
        website: 'https://www.attorneygeneral.gov/for-the-public/home-improvement/',
      },
      {
        name: 'City of Philadelphia Department of Licenses and Inspections',
        licenses: 'Contractor licenses and trade licenses, such as electrical and plumbing, for work in Philadelphia',
        lookupUrl: 'https://www.phila.gov/services/permits-violations-licenses/find-a-licensed-contractor-and-contractor-information/',
        lookupNote: 'Lists actively licensed contractors and their licensing violations, with links to permit searches.',
        website: 'https://www.phila.gov/departments/department-of-licenses-and-inspections/',
      },
      {
        name: 'City of Pittsburgh Department of Permits, Licenses, and Inspections',
        licenses: 'General contractor licenses for some work, such as new one- and two-family homes and rental properties, and trade licenses such as electrical and HVAC',
        lookupUrl: 'https://www.pittsburghpa.gov/Business-Development/Permits-Licenses-and-Inspections/OneStopPGH',
        lookupNote: 'Use the OneStopPGH public license search by name, address or license number.',
        website: 'https://www.pittsburghpa.gov/Business-Development/Permits-Licenses-and-Inspections',
      },
    ],
    whenRequired: [
      'Contractors who do $5,000 or more of home improvement work a year must register with the Attorney General. Subcontractors on home improvements must register too.',
      'Building a new home isn’t a home improvement under the law, so new-home builders don’t need this registration.',
      'To register, a contractor must show liability insurance of at least $50,000 for personal injury and $50,000 for property damage.',
      'Some cities and towns license contractors and trades themselves. In Philadelphia, electrical, plumbing and fire suppression work needs city-licensed tradespeople.',
    ],
    howToCheck: [
      'Ask for the contractor’s Pennsylvania home improvement registration number. It starts with “PA” and should be on their ads, estimates and contracts.',
      'Look it up in the Attorney General’s home improvement contractor search, or call the hotline if the search doesn’t find it.',
      'If the job is in Philadelphia or Pittsburgh, also check the city’s contractor license search.',
      'Ask your township, borough or city code office whether your town licenses contractors and whether your project needs a permit.',
      'Remember that registration doesn’t vouch for a contractor’s honesty or work. Check reviews and complaint history too.',
    ],
    watchFor: [
      'Your contract must be in writing, show the contractor’s registration number and tell you about your right to cancel. You can cancel within three business days of signing, by phone, in person or in writing, as long as the contractor actually gets your notice.',
      'Contractors must show their registration number on ads, estimates and contracts. A missing number is a warning sign.',
    ],
    faq: [
      {
        q: 'Does Pennsylvania require a contractor license?',
        a: 'Not at the state level for most contractors. Home improvement contractors who do $5,000 or more of work a year must register with the Office of Attorney General instead, and some cities, such as Philadelphia and Pittsburgh, require their own licenses.',
      },
      {
        q: 'How do I look up a PA home improvement contractor number?',
        a: 'Use the Attorney General’s home improvement contractor search, or call the hotline at 1-888-520-6680. The search shows active registrations only.',
      },
      {
        q: 'Can I cancel a home improvement contract in Pennsylvania?',
        a: 'Yes. You can cancel within three business days after signing. A phone call, a visit or a written notice all count, as long as the contractor actually gets it.',
      },
      {
        q: 'Do electricians and plumbers need a state license in Pennsylvania?',
        a: 'Pennsylvania has no state license for most construction trades. Some cities, including Philadelphia and Pittsburgh, license electricians and other trades, so check with your local code office.',
      },
    ],
    sources: [
      {
        label: 'PA Office of Attorney General: home improvement contractor verification',
        url: 'https://www.attorneygeneral.gov/for-the-public/home-improvement/',
      },
      { label: 'PA Office of Attorney General: home improvement contractor search', url: 'https://hicsearch.attorneygeneral.gov/' },
      {
        label: 'PA Office of Attorney General: contractor registration FAQ',
        url: 'https://www.attorneygeneral.gov/businesses-and-organizations/home-improvement-contractor-registration/frequently-asked-questions/',
      },
      {
        label: 'PA Office of Attorney General: Supreme Court upholds the three-day right to cancel',
        url: 'https://www.attorneygeneral.gov/taking-action/pa-supreme-court-upholds-consumer-right-to-cancel-home-improvement-contracts-within-three-days-regardless-of-medium/',
      },
      {
        label: 'Home Improvement Consumer Protection Act (Act 132 of 2008)',
        url: 'https://www.legis.state.pa.us/WU01/LI/LI/US/HTM/2008/0/0132..HTM',
      },
      {
        label: 'City of Philadelphia: find a licensed contractor',
        url: 'https://www.phila.gov/services/permits-violations-licenses/find-a-licensed-contractor-and-contractor-information/',
      },
      {
        label: 'City of Pittsburgh: contractor licenses',
        url: 'https://www.pittsburghpa.gov/Business-Development/Permits-Licenses-and-Inspections/Licensing/Contractor-Licenses',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'ohio',
    code: 'OH',
    name: 'Ohio',
    generalContractors: 'local-only',
    short: 'No state license for home contractors; cities such as Columbus license them.',
    summary:
      'Ohio doesn’t license general, home improvement or other residential contractors at the state level; cities and counties do. The state’s Construction Industry Licensing Board licenses only commercial electrical, HVAC, plumbing, hydronics and refrigeration contractors.',
    boards: [
      {
        name: 'Ohio Construction Industry Licensing Board (Ohio Department of Commerce)',
        licenses:
          'Commercial electrical, HVAC, plumbing, hydronics and refrigeration contractors. It doesn’t license general contractors, roofers or residential contractors',
        lookupUrl: 'https://elicense4.com.ohio.gov/Lookup/LicenseLookup.aspx',
        lookupNote: 'Ohio’s license lookup covers the state-licensed commercial trades.',
        website: 'https://com.ohio.gov/divisions-and-programs/industrial-compliance/boards/ohio-construction-industry-licensing-board',
      },
      {
        name: 'City of Columbus Department of Building and Zoning Services',
        licenses: 'Home improvement contractor licenses for existing one- to three-family homes, and other contractor licenses for work in Columbus',
        lookupUrl: 'https://www.columbus.gov/Business-Development/Business-Licenses-Resources/Contractor-Licenses',
        lookupNote: 'Use the “Search for a Contractor” link to the city’s Citizen Access Portal.',
        website: 'https://www.columbus.gov/Business-Development/Business-Licenses-Resources/Contractor-Licenses/Home-Improvement-Contractors',
      },
    ],
    whenRequired: [
      'A state license is required for commercial electrical, HVAC, plumbing, hydronics and refrigeration work. The state doesn’t license residential contractors.',
      'Many cities, counties and townships have their own contractor license or registration rules. Your local building department can tell you what applies and whether your project needs a permit.',
      'Columbus requires a home improvement contractor license for work on existing homes of up to three families. A limited license covers one specialty, such as roofing, decks or fencing.',
      'Cleveland requires contractors who build or rehab homes to be bonded, insured and registered with the city. It has no online search; call its Department of Building & Housing to check a contractor.',
    ],
    howToCheck: [
      'Call your city, county or township building department. Ask what license or registration contractors need there and whether your job needs a permit.',
      'Check the contractor with that local office, such as the Columbus contractor search.',
      'For electrical, HVAC, plumbing, hydronics or refrigeration work, look up the contractor’s state license in Ohio’s license lookup.',
      'Check for complaints with the Ohio Attorney General and the Better Business Bureau.',
      'Get written estimates, and put the work, dates and costs in a written contract before you pay.',
    ],
    watchFor: [
      'If you sign at home, for example with a door-to-door seller, Ohio’s Home Solicitation Sales Act lets you cancel until midnight of the third business day after signing. The seller must give you a written cancellation notice.',
      'For home construction jobs of $25,000 or more, Ohio law requires a signed written contract listing the work, the start and completion dates and the total estimated cost.',
    ],
    faq: [
      {
        q: 'Does Ohio require a general contractor license?',
        a: 'No. Ohio doesn’t license general or residential contractors at the state level. Many cities, including Columbus and Cleveland, have their own license or registration rules.',
      },
      {
        q: 'What does the Ohio Construction Industry Licensing Board license?',
        a: 'It licenses commercial contractors in five trades: electrical, HVAC, plumbing, hydronics and refrigeration. You can check these licenses in Ohio’s license lookup.',
      },
      {
        q: 'Do roofers need a license in Ohio?',
        a: 'Not from the state. Some cities regulate roofers; Columbus, for example, has a limited home improvement license for specialties like roofing. Check with your local building department.',
      },
      {
        q: 'Where do I complain about a home improvement contractor in Ohio?',
        a: 'Contact the Ohio Attorney General’s Consumer Protection Section and your local building department. Complaints about commercial contractors in the five licensed trades go to the Construction Industry Licensing Board.',
      },
    ],
    sources: [
      {
        label: 'Ohio Department of Commerce: Construction Industry Licensing Board',
        url: 'https://com.ohio.gov/divisions-and-programs/industrial-compliance/boards/ohio-construction-industry-licensing-board',
      },
      { label: 'Ohio license lookup', url: 'https://elicense4.com.ohio.gov/Lookup/LicenseLookup.aspx' },
      {
        label: 'Ohio Department of Commerce: hire licensed contractors (2026)',
        url: 'https://com.ohio.gov/about-us/media-center/news/dont-risk-your-spring-projects-hire-licensed-contractors',
      },
      { label: 'Ohio Revised Code ch. 4740 (construction industry licensing)', url: 'https://codes.ohio.gov/ohio-revised-code/chapter-4740' },
      { label: 'Ohio Revised Code 4722.02 (written home construction contracts)', url: 'https://codes.ohio.gov/ohio-revised-code/section-4722.02' },
      {
        label: 'Ohio Attorney General: door-to-door sales',
        url: 'https://www.ohioattorneygeneral.gov/Business/Services-for-Business/Business-Guide/Door-To-Door-Sales',
      },
      {
        label: 'City of Columbus: home improvement contractors',
        url: 'https://www.columbus.gov/Business-Development/Business-Licenses-Resources/Contractor-Licenses/Home-Improvement-Contractors',
      },
      { label: 'City of Cleveland: Building & Housing FAQs', url: 'https://www.clevelandohio.gov/city-hall/departments/building-housing/faqs' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'new-york',
    code: 'NY',
    name: 'New York',
    generalContractors: 'local-only',
    short: 'No state license; New York City, Buffalo and five counties license contractors locally.',
    summary:
      'New York State doesn’t license general or home improvement contractors. New York City, Buffalo and Nassau, Suffolk, Westchester, Putnam and Rockland counties license them locally, and state law requires a written contract for any home improvement job over $500.',
    boards: [
      {
        name: 'NYC Department of Consumer and Worker Protection (DCWP)',
        licenses: 'Home improvement contractors doing residential work over $200 in New York City, including roofing, windows, driveways and patios',
        lookupUrl: 'https://a866-dcwpbp.nyc.gov/search',
        lookupNote: 'Search by business name or license number, or call 311.',
        website: 'https://www.nyc.gov/site/dca/consumers/check-license.page',
      },
      {
        name: 'NYC Department of Buildings (DOB)',
        licenses: 'Master plumbers, electricians and other construction trades in New York City',
        lookupUrl: 'https://a810-bisweb.nyc.gov/bisweb/LicenseTypeServlet?vlfirst=N',
        lookupNote: 'Pick the license type, then search by name, business name or license number. Newer records are moving to the DOB NOW public portal.',
        website: 'https://www.nyc.gov/site/buildings/property-or-business-owner/know-your-construction-professional.page',
      },
      {
        name: 'Nassau County Department of Consumer Affairs',
        licenses: 'Home improvement businesses working on homes in Nassau County',
        lookupUrl: 'https://apex5.nassaucountyny.gov/ords/f?p=288%3A500%3A%3A%3ANO',
        lookupNote: 'The county’s search of businesses with valid licenses. If the link has moved, start from the county’s licensing page.',
        website: 'https://www.nassaucountyny.gov/1563/Licensing-Registrations',
      },
      {
        name: 'Suffolk County Department of Consumer Affairs',
        licenses: 'Home improvement contractors, and master and restricted electricians and plumbers, in Suffolk County',
        lookupUrl: 'https://ca.suffolkcountyny.gov/dcasearch',
        lookupNote: 'Search by license number, name, business name, phone or ZIP code.',
        website: 'https://www.suffolkcountyny.gov/Departments/Consumer-Affairs',
      },
      {
        name: 'Westchester County Department of Consumer Protection',
        licenses: 'Home improvement contractors, electricians and plumbers in Westchester County (Yonkers licenses its own contractors)',
        lookupUrl: 'https://consumerlicenseweb.westchestergov.com/',
        lookupNote: 'Search by company, contractor or trade name. Electricians and plumbers are in the county’s separate trade license search.',
        website: 'https://consumer.westchestergov.com/',
      },
      {
        name: 'Rockland County Office of Consumer Protection',
        licenses: 'Home improvement contractors working on homes in Rockland County',
        lookupUrl: 'https://www.rocklandcountyny.gov/departments/consumer-protection-weights-measures/licensed-businesses',
        lookupNote: 'Use the licensed businesses list on this page.',
        website: 'https://www.rocklandcountyny.gov/departments/consumer-protection-weights-measures',
      },
    ],
    whenRequired: [
      'The state doesn’t license home improvement or general contractors. A local license is needed only in New York City, Buffalo, and Nassau, Suffolk, Westchester, Putnam and Rockland counties.',
      'In New York City, home improvement work over $200 needs a DCWP license. Plumbers and electricians are licensed by the Department of Buildings instead.',
      'Electricians and plumbers are licensed by local governments, not the state, for example by Suffolk and Westchester counties.',
      'Statewide, any home improvement contract over $500 must be in writing, and you can cancel it until midnight of the third business day after you sign.',
    ],
    howToCheck: [
      'Find out whether the home is in an area that licenses contractors: New York City, Buffalo, or Nassau, Suffolk, Westchester, Putnam or Rockland county. Anywhere else, ask your town or city building department.',
      'In New York City, search the contractor in the DCWP license search or call 311. In a licensing county, use that county’s search or call its consumer office.',
      'For a plumber or electrician, check the license with the NYC Department of Buildings or your county.',
      'Make sure the business name, license number and expiration date match your contract, and ask the agency about complaints.',
      'Get a signed written contract with the license number before any work starts, and keep the deposit small.',
    ],
    watchFor: [
      'Under state law, money you pay before the job is substantially finished must go into an escrow account at a New York bank within five business days, unless the contractor gives you a bond instead. The contractor must tell you where your money is held.',
      'In New York City, DCWP advises paying no more than 25% up front. The city’s Home Improvement Trust Fund can repay you only if your contractor was licensed.',
    ],
    faq: [
      {
        q: 'Does New York State license general contractors?',
        a: 'No. New York State doesn’t license general or home improvement contractors. Some cities and counties do, including New York City, Buffalo, and Nassau, Suffolk, Westchester, Putnam and Rockland counties.',
      },
      {
        q: 'How do I check a contractor’s license in NYC?',
        a: 'Use DCWP’s license search or call 311. Home improvement contractors need a DCWP license for jobs over $200; plumbers and electricians are licensed by the NYC Department of Buildings.',
      },
      {
        q: 'Do I need a written contract for home improvement work in New York?',
        a: 'Yes, for any job over $500. You can cancel it in writing until midnight of the third business day after you sign.',
      },
      {
        q: 'What if my town isn’t in an area that licenses contractors?',
        a: 'There may be no contractor license to check. Ask your town or city building department about local rules and permits; the state contract and deposit rules still apply.',
      },
    ],
    sources: [
      {
        label: 'NY Attorney General: contractors and home maintenance',
        url: 'https://ag.ny.gov/resources/individuals/consumer-issues/contractors-home-maintenance',
      },
      { label: 'NY General Business Law § 771 (home improvement contracts)', url: 'https://www.nysenate.gov/legislation/laws/GBS/771' },
      { label: 'NY Lien Law § 71-A (deposits held in trust)', url: 'https://www.nysenate.gov/legislation/laws/LIE/71-A' },
      { label: 'NYC DCWP: check license status', url: 'https://www.nyc.gov/site/dca/consumers/check-license.page' },
      {
        label: 'NYC DCWP: hiring a home improvement contractor',
        url: 'https://www.nyc.gov/site/dca/consumers/shopping-services-home-improvement.page',
      },
      {
        label: 'NYC DOB: know your construction professional',
        url: 'https://www.nyc.gov/site/buildings/property-or-business-owner/know-your-construction-professional.page',
      },
      { label: 'Nassau County: licensing and registrations', url: 'https://www.nassaucountyny.gov/1563/Licensing-Registrations' },
      { label: 'Suffolk County Consumer Affairs: license types', url: 'https://www.suffolkcountyny.gov/Departments/Consumer-Affairs/Type-of-License' },
      { label: 'Westchester County: license search', url: 'https://consumerlicenseweb.westchestergov.com/' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'new-jersey',
    code: 'NJ',
    name: 'New Jersey',
    generalContractors: 'state',
    short: 'Home improvement contractors register with the state every year; trades are licensed.',
    summary:
      'New Jersey requires every home improvement contractor business to register each year with the state Division of Consumer Affairs. Electricians, plumbers and HVACR contractors need separate state licenses.',
    boards: [
      {
        name: 'New Jersey Division of Consumer Affairs: home improvement contractor registration',
        licenses: 'Home improvement and home elevation contractor businesses working on homes',
        lookupUrl: 'https://rgbportal.dca.njoag.gov/public-view/',
        lookupNote:
          'Search by registration number, business name or city, and check that the status is active. If you can’t find a registration, call the Division at 1-800-242-5846.',
        website: 'https://www.njconsumeraffairs.gov/hic',
      },
      {
        name: 'Board of Examiners of Electrical Contractors',
        licenses: 'Electrical contractors',
        lookupUrl: 'https://www.njconsumeraffairs.gov/elec/Pages/verification.aspx',
        website: 'https://www.njconsumeraffairs.gov/elec',
      },
      {
        name: 'State Board of Examiners of Master Plumbers',
        licenses: 'Master plumbers',
        lookupUrl: 'https://newjersey.mylicense.com/verification/',
        lookupNote: 'The Division of Consumer Affairs’ license verification. Search by name or license number.',
        website: 'https://www.njconsumeraffairs.gov/plu',
      },
      {
        name: 'State Board of Examiners of Heating, Ventilating, Air Conditioning and Refrigeration Contractors',
        licenses: 'Master HVACR contractors',
        lookupUrl: 'https://www.njconsumeraffairs.gov/hvacr/Pages/verification.aspx',
        lookupNote: 'Towns can’t issue HVACR contractor licenses, so only the state license counts.',
        website: 'https://www.njconsumeraffairs.gov/hvacr',
      },
    ],
    whenRequired: [
      'Anyone who sells or does home improvement work on homes in New Jersey must register with the Division of Consumer Affairs and renew every year, including companies based outside the state.',
      'You don’t need to register to work on your own or a family member’s home. State-licensed plumbers, electricians and architects don’t need to register for work within their license.',
      'Electrical, plumbing and HVACR contracting each need a separate state license from that trade’s board.',
      'Registered contractors must carry at least $500,000 of liability insurance per occurrence and, since a 2024 law, workers’ compensation and a bond.',
    ],
    howToCheck: [
      'Ask for the contractor’s registration number. It must appear on contracts, ads and business vehicles.',
      'Search the number or business name in the Division of Consumer Affairs registration search, or call 1-800-242-5846.',
      'Check that the business name matches and the status is active, and ask the Division about complaints or legal actions.',
      'For electrical, plumbing or HVACR work, also check the contractor’s license with that trade’s board.',
      'For any job over $500, get a written contract that lists the registration number and comes with a copy of the contractor’s liability insurance certificate.',
    ],
    watchFor: [
      'A contract over $500 must be in writing and list the contractor’s legal name, address and registration number, the start and completion dates, the work, the total price and the Division’s toll-free number.',
      'You can cancel for any reason until midnight of the third business day after you get a copy of the contract, by certified or registered mail with return receipt or in person. The contractor must refund your money within 30 days.',
    ],
    faq: [
      {
        q: 'Does New Jersey require contractors to be licensed?',
        a: 'Home improvement contractor businesses must register with the Division of Consumer Affairs every year, and electricians, plumbers and HVACR contractors need state licenses. A 2024 law created a board that will also license individual home improvement contractors once its rules take effect.',
      },
      {
        q: 'How do I look up a contractor’s registration in New Jersey?',
        a: 'Use the Division of Consumer Affairs registration search by business name or registration number, or call 1-800-242-5846, and confirm the status is active.',
      },
      {
        q: 'Can I cancel a home improvement contract in New Jersey?',
        a: 'Yes. You can cancel for any reason until midnight of the third business day after you receive a copy of the contract. The contractor must refund your money within 30 days.',
      },
      {
        q: 'Does a plumber or electrician also need home improvement registration?',
        a: 'Not for work within their state license. Check their license with the plumbing or electrical board instead.',
      },
    ],
    sources: [
      { label: 'NJ Division of Consumer Affairs: home improvement contractors', url: 'https://www.njconsumeraffairs.gov/hic' },
      { label: 'NJ Division of Consumer Affairs: home improvement contractor FAQ', url: 'https://www.njconsumeraffairs.gov/hic/Pages/FAQ.aspx' },
      { label: 'NJ Division of Consumer Affairs: registration search', url: 'https://rgbportal.dca.njoag.gov/public-view/' },
      {
        label: 'NJ Division of Consumer Affairs: hiring home improvement contractors',
        url: 'https://www.njconsumeraffairs.gov/news/consumer%20briefs/hiring-home-improvement-contractors.pdf',
      },
      {
        label: 'NJ Division of Consumer Affairs: changes to the law (P.L. 2023, c.237)',
        url: 'https://www.njconsumeraffairs.gov/Documents/HIC-HEC-Regarding-Changes-To-The-Law-New-Requirements-For-Registration.pdf',
      },
      { label: 'NJ Board of Examiners of Electrical Contractors: FAQ', url: 'https://www.njconsumeraffairs.gov/elec/pages/faq.aspx' },
      { label: 'NJ HVACR Board: FAQ', url: 'https://www.njconsumeraffairs.gov/hvacr/Pages/FAQ.aspx' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'illinois',
    code: 'IL',
    name: 'Illinois',
    generalContractors: 'local-only',
    short: 'No state general contractor license, but the state licenses roofers and plumbers.',
    summary:
      'Illinois doesn’t license general contractors at the state level; cities, villages and counties set their own rules, and Chicago requires its own general contractor license. The state does license roofers and plumbers, so always check those trades with the state.',
    boards: [
      {
        name: 'Illinois Department of Financial and Professional Regulation (IDFPR)',
        licenses: 'Roofing contractors, with a limited license for buildings of 8 or fewer units and an unlimited license for all roofing work',
        lookupUrl: 'https://idfpr.illinois.gov/checklicense.html',
        lookupNote: 'Open the license lookup and choose Roofing Contractor as the license type. Illinois roofing license numbers start with 104-.',
        website: 'https://idfpr.illinois.gov/profs/roof.html',
      },
      {
        name: 'Illinois Department of Public Health (IDPH) plumbing program',
        licenses: 'Plumbers, apprentice plumbers, plumbing contractors (registered every year) and lawn irrigation contractors',
        lookupUrl: 'https://plumblicv5pub.dph.illinois.gov/Clients/ILDOHPlumb/Public/Verification/Plumber_License_Verification.aspx',
        lookupNote: 'Search by last name, business name, license number, city or county.',
        website: 'https://dph.illinois.gov/topics-services/environmental-health-protection/plumbing.html',
      },
      {
        name: 'City of Chicago Department of Buildings',
        licenses: 'General, electrical, plumbing and mason contractors working in Chicago',
        lookupUrl: 'https://www.chicago.gov/city/en/depts/bldgs/provdrs/licenses/svcs/license-lookup.html',
        lookupNote: 'Pick the contractor type. The search shows current licenses and recently expired ones.',
        website: 'https://www.chicago.gov/city/en/depts/bldgs/provdrs/licenses.html',
      },
    ],
    whenRequired: [
      'Anyone doing roofing work for pay needs a state roofing license. You don’t need one to work on your own property.',
      'All plumbing must be done by licensed plumbers, and plumbing contractors register with IDPH every year. An owner living in a single-family home may do their own plumbing to code, but may not hire an unlicensed person to do it.',
      'There is no state license for general contractors, electricians or HVAC. Cities, villages and counties set their own license, registration and permit rules.',
      'Chicago requires a city general contractor license for most construction, repair and demolition work, and only city-licensed electrical contractors may do electrical work. Owners working on their own primary residence of up to three stories and six units are exempt from the general contractor license, except for excavation or demolition.',
    ],
    howToCheck: [
      'Ask for the contractor’s license numbers and exact business name, and ask your local building department what license or registration the job needs.',
      'For a roofer, use IDFPR’s license lookup and choose Roofing Contractor. Confirm the license is active, the number starts with 104-, and the name matches your contract.',
      'For a plumber or plumbing contractor, search IDPH’s plumber license search.',
      'In Chicago, search the Department of Buildings contractor license lookup for general, electrical, plumbing and mason contractors.',
      'Check for complaints with the Illinois Attorney General, and get a signed written contract before work starts.',
    ],
    watchFor: [
      'After storms, check roofers closely. Licensed roofers must show their Illinois license number on bids, contracts and vehicles, and state law bars roofers from paying or waiving your insurance deductible.',
      'For home repair jobs over $1,000, the contractor must give you a written contract with the total price before work starts, and the state’s “Home Repair: Know Your Consumer Rights” pamphlet before you sign.',
    ],
    faq: [
      {
        q: 'Does Illinois require general contractors to be licensed?',
        a: 'No. Illinois has no statewide general contractor license. Your city, village or county may require its own license, registration or permits, so ask your local building department.',
      },
      {
        q: 'How do I check a roofer’s license in Illinois?',
        a: 'Use IDFPR’s license lookup and choose Roofing Contractor as the license type. Make sure the license is active, the number starts with 104-, and the name matches your contract.',
      },
      {
        q: 'Who licenses plumbers in Illinois?',
        a: 'The Illinois Department of Public Health. You can check a plumber or plumbing contractor in IDPH’s plumber license search.',
      },
      {
        q: 'Do I need a licensed general contractor in Chicago?',
        a: 'Usually, yes. Chicago requires a city general contractor license for most construction, repair and demolition work. Owners working on their own primary residence of up to three stories and six units are exempt, except for excavation or demolition.',
      },
    ],
    sources: [
      { label: 'IDFPR: roofing contractor licensing', url: 'https://idfpr.illinois.gov/profs/roof.html' },
      { label: 'IDFPR: license lookup', url: 'https://idfpr.illinois.gov/checklicense.html' },
      {
        label: '225 ILCS 335/5.5 (roofers and insurance deductibles)',
        url: 'https://www.ilga.gov/legislation/ilcs/fulltext?DocName=022503350K5.5',
      },
      { label: 'IDPH: plumbing program', url: 'https://dph.illinois.gov/topics-services/environmental-health-protection/plumbing.html' },
      { label: 'Illinois Home Repair and Remodeling Act (815 ILCS 513)', url: 'https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=2359' },
      { label: 'Illinois Attorney General: avoid home repair fraud', url: 'https://illinoisattorneygeneral.gov/consumer-protection/home-repair/' },
      {
        label: 'City of Chicago: does my project need a licensed general contractor?',
        url: 'https://www.chicago.gov/city/en/sites/guide-to-building-permits/home/help/faq/DOB/GC-license.html',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'michigan',
    code: 'MI',
    name: 'Michigan',
    generalContractors: 'state',
    short: 'A state license for most home jobs of $600 or more, including roofing.',
    summary:
      'Michigan’s Department of Licensing and Regulatory Affairs (LARA) licenses residential builders, maintenance and alteration contractors such as roofers, and electrical, plumbing and mechanical contractors. Most home jobs of $600 or more need a state license, and a builder license doesn’t cover electrical, plumbing or HVAC work.',
    boards: [
      {
        name: 'LARA Bureau of Construction Codes: residential builders',
        licenses:
          'Residential builders, and maintenance and alteration contractors in specific trades such as roofing, siding, carpentry, concrete, masonry, gutters and basement waterproofing',
        lookupUrl: 'https://www.michigan.gov/licenselookup',
        lookupNote: 'Search by license number or name. For a maintenance and alteration contractor, check that the trade you need is on the license.',
        website: 'https://www.michigan.gov/lara/bureau-list/bcc/sections/licensing-section/residential-builders',
      },
      {
        name: 'LARA Bureau of Construction Codes: skilled trades',
        licenses: 'Electrical, plumbing and mechanical (HVAC and refrigeration) contractors, and electricians and plumbers',
        lookupUrl: 'https://www.michigan.gov/lara/i-need-to/find-or-verify-a-licensed-professional-or-business',
        lookupNote: 'Under skilled trades, choose Electrician, Plumber or Mechanical Contractor to reach the license search.',
        website: 'https://www.michigan.gov/lara/bureau-list/bcc/sections/licensing-section',
      },
    ],
    whenRequired: [
      'Paid residential construction, remodeling and repair needs a residential builder or maintenance and alteration license when labor and materials total $600 or more. Splitting a job into smaller contracts doesn’t avoid the rule.',
      'A maintenance and alteration contractor may only take jobs in the trades listed on their license, such as roofing, siding or basement waterproofing.',
      'Electrical, plumbing and mechanical work needs separate state contractor licenses. A residential builder must hire licensed contractors for that work.',
      'Owners can work on a building on their own property for their own use without a builder license, and may do their own electrical, plumbing and heating work in a single-family home they own and live in. Plumbing and heating work still needs a permit.',
    ],
    howToCheck: [
      'Ask for the contractor’s LARA license number and the exact name on the license. LARA says it’s a red flag if a contractor can’t give you either.',
      'Search LARA’s license lookup by license number or name.',
      'Confirm the license is active and fits the job: residential builder, the right maintenance and alteration trade such as roofing, or an electrical, plumbing or mechanical license.',
      'For electrical, plumbing or HVAC work, check the company that will actually do that work, not just your builder.',
      'Make sure the license number is on your written contract and that the contract says who will get the permits.',
    ],
    watchFor: [
      'A residential builder license doesn’t cover electrical, plumbing or HVAC work. That work must be done by contractors with their own state license.',
      'LARA must receive a complaint about a licensed builder within 18 months after completion, occupancy or purchase, whichever is latest. Contract, payment and warranty disputes go to civil court instead.',
    ],
    faq: [
      {
        q: 'Do contractors need a license in Michigan?',
        a: 'Yes, for most home work. A residential builder or maintenance and alteration license from LARA is required when labor and materials total $600 or more.',
      },
      {
        q: 'How do I look up a contractor’s license in Michigan?',
        a: 'Use LARA’s license lookup and search by license number or name. Check that the license is active and covers the work being done.',
      },
      {
        q: 'Do roofers need a license in Michigan?',
        a: 'Yes. Roofing is one of the trades covered by the maintenance and alteration contractor license. Check that the roofer’s license lists roofing, or that they hold a full residential builder license.',
      },
      {
        q: 'Can I do my own electrical or plumbing work in Michigan?',
        a: 'Yes, in a single-family home you own and live in. Plumbing and heating work still needs a permit from your local building department.',
      },
    ],
    sources: [
      {
        label: 'LARA: residential builders',
        url: 'https://www.michigan.gov/lara/bureau-list/bcc/sections/licensing-section/residential-builders',
      },
      {
        label: 'LARA: maintenance and alteration contractor license',
        url: 'https://www.michigan.gov/lara/bureau-list/bcc/sections/licensing-section/residential-builders/lic-info/maintenance-alteration-contractor-license-information',
      },
      { label: 'LARA: license lookup', url: 'https://www.michigan.gov/licenselookup' },
      { label: 'LARA: Bureau of Construction Codes FAQs', url: 'https://www.michigan.gov/lara/bureau-list/bcc/faq/bureau-of-construction-codes-faqs' },
      { label: 'MCL 339.2403 (builder license exemptions)', url: 'https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-339-2403' },
      { label: 'MCL 339.2411 (complaints)', url: 'https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-339-2411' },
      {
        label: 'LARA: tips for hiring contractors (July 2025)',
        url: 'https://www.michigan.gov/lara/news-releases/2025/07/17/mi-dept-of-licensing-and-regulatory-affairs-offers-tips-for-hiring-contractors-this-summer',
      },
    ],
    lastChecked: '2026-11-03',
  },
];

/** "a" or "an" before a state name: an Illinois license, a Utah license. */
export function article(name: string): 'a' | 'an' {
  return /^[AEIO]/.test(name) ? 'an' : 'a';
}

export function stateBySlug(slug: string): StateGuide | undefined {
  return STATES.find((s) => s.slug === slug);
}
