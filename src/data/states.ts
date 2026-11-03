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
  {
    slug: 'wisconsin',
    code: 'WI',
    name: 'Wisconsin',
    generalContractors: 'state',
    short: 'State certification for contractors who pull permits on one- and two-family homes.',
    summary:
      'Wisconsin’s Department of Safety and Professional Services (DSPS) certifies dwelling contractors and licenses electricians, plumbers and HVAC contractors. A contractor who pulls a building permit for a one- or two-family home needs the state’s Dwelling Contractor credentials.',
    boards: [
      {
        name: 'Wisconsin Department of Safety and Professional Services (DSPS)',
        licenses:
          'Dwelling Contractor and Dwelling Contractor Qualifier certifications, electrical contractors and electricians, master plumbers and plumbers, and HVAC contractor registrations',
        lookupUrl: 'https://license.wi.gov',
        lookupNote:
          'Choose License Lookup in the top bar, then search by credential number, person’s name or organization name. When searching by number, put a space on each side of the dash.',
        website: 'https://dsps.wi.gov',
      },
    ],
    whenRequired: [
      'A contractor who pulls a building permit for a one- or two-family home must hold a Dwelling Contractor certification and have a certified Dwelling Contractor Qualifier. An owner who lives, or will live, in the home can pull their own permit.',
      'This covers jobs such as roofing, siding and insulation when the contractor pulls the permit. Your city or town decides which jobs need a permit.',
      'Electrical businesses need a state electrical contractor license, and their workers must be licensed or registered electricians. Cities may not require their own electrician licenses.',
      'Plumbing must be done by state-licensed plumbers under a master plumber, and HVAC businesses need a state HVAC contractor registration. Owners working on a home they own and live in are exempt from both.',
    ],
    howToCheck: [
      'Ask for the contractor’s business name and both DSPS credential numbers: the Dwelling Contractor and the Dwelling Contractor Qualifier.',
      'Go to the state’s LicensE site and choose License Lookup.',
      'Search by credential number or name, and confirm the credential is active.',
      'For electrical, plumbing or HVAC work, look up that trade credential the same way.',
      'Ask your local building department whether your job needs a permit, and have the certified contractor pull it.',
    ],
    watchFor: [
      'Before you sign, the contractor must tell you that you can ask for lien waivers. Ask for one with each payment: an unpaid subcontractor or supplier can put a lien on your home even if you paid the contractor in full.',
      'Some contracts put the permits and insurance on the homeowner. If you pull the permit yourself, you have no assurance the contractor carries the required insurance.',
    ],
    faq: [
      {
        q: 'Does Wisconsin have a general contractor license?',
        a: 'Not one license for all work. DSPS issues the Dwelling Contractor and Dwelling Contractor Qualifier certifications, which a contractor needs to pull building permits for one- and two-family homes.',
      },
      {
        q: 'Does a roofer need a license in Wisconsin?',
        a: 'A contractor who roofs a one- or two-family home and pulls the permit must hold both Dwelling Contractor certifications. Whether a reroof needs a permit depends on your city or town.',
      },
      {
        q: 'What is a Dwelling Contractor Restricted certification?',
        a: 'It is for contractors with a bond of at least $5,000 but under $25,000. They agree not to take any home job estimated above their bond amount.',
      },
      {
        q: 'Can I cancel a home improvement contract in Wisconsin?',
        a: 'If a contractor came to you and you signed a contract for more than $25 at your home or away from their business, you have three business days to cancel.',
      },
    ],
    sources: [
      { label: 'DSPS: Dwelling Contractor', url: 'https://dsps.wi.gov/a-z-professions-list/dwelling-contractor-dc/' },
      { label: 'DSPS: credentialing and LicensE FAQ', url: 'https://dsps.wi.gov/credentialing-and-license-faq/' },
      { label: 'Wis. Stat. § 101.654 (dwelling contractor certification)', url: 'https://docs.legis.wisconsin.gov/document/statutes/101.654' },
      { label: 'Wis. Stat. § 101.862 (electrical licensing)', url: 'https://docs.legis.wisconsin.gov/statutes/statutes/101/IV/862' },
      { label: 'Wis. Stat. § 145.06 (plumbing licenses)', url: 'https://docs.legis.wisconsin.gov/statutes/statutes/145/06' },
      { label: 'DATCP: home improvement consumer tips', url: 'https://datcp.wi.gov/Pages/Publications/HI-ConsumerTips136.aspx' },
      { label: 'DATCP: home liens', url: 'https://datcp.wi.gov/Pages/Publications/Liens262.aspx' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'minnesota',
    code: 'MN',
    name: 'Minnesota',
    generalContractors: 'state',
    short: 'A state license for home builders, remodelers and roofers who work for homeowners.',
    summary:
      'Minnesota’s Department of Labor and Industry (DLI) licenses residential building contractors, remodelers, roofers, electricians and plumbers. If you hire a licensed residential building contractor or remodeler, the state’s Contractor Recovery Fund can repay losses from their misconduct.',
    boards: [
      {
        name: 'Minnesota Department of Labor and Industry (DLI)',
        licenses:
          'Residential building contractors, remodelers and roofers, electrical contractors and electricians, and plumbing contractors and plumbers. DLI also holds the required bonds for HVAC and gas contractors',
        lookupUrl: 'https://www.dli.mn.gov/license-and-registration-lookup',
        lookupNote: 'Choose “Continue as guest”, then search license and registration holders by license number, person’s name or company name.',
        website: 'https://www.dli.mn.gov',
      },
    ],
    whenRequired: [
      'A contractor who works directly for the owner of a one- to four-unit home and offers more than one trade needs a residential building contractor or remodeler license. Remodelers work only on existing homes.',
      'Roofing for a homeowner always needs a residential roofer, building contractor or remodeler license. A roofer license covers roofing only, not gutters, soffit or fascia.',
      'Contractors who offer a single trade other than roofing, or earn $15,000 or less a year from residential work, may register or hold a yearly exemption instead.',
      'Electrical work needs licensed electrical contractors, and plumbing businesses need a plumbing contractor license. HVAC and gas contractors aren’t licensed by the state but must file a $25,000 bond with DLI, and some cities license them.',
    ],
    howToCheck: [
      'Ask for the contractor’s Minnesota license number. Builder, remodeler and roofer licenses start with BC, CR or RR.',
      'Be careful with numbers that start with IR: those are registrations, not licenses.',
      'Search DLI’s license and registration lookup as a guest, by number or name.',
      'Confirm the license is current, its type fits your job, and check for enforcement actions.',
      'For HVAC or gas work, confirm the company has a mechanical contractor bond on file with DLI, and ask your city whether it needs a local license.',
    ],
    watchFor: [
      'The Contractor Recovery Fund covers only licensed residential building contractors and remodelers, not roofers or registered contractors. You first need a court judgment, and must apply within two years after it becomes final. It pays up to $100,000 per homeowner.',
      'Contractors may not offer to pay or rebate your insurance deductible. If you signed a roofing or remodeling contract to be paid by insurance, you can cancel within 72 hours after your insurer denies the claim.',
    ],
    faq: [
      {
        q: 'Do I need a licensed contractor for a small job in Minnesota?',
        a: 'Not always. Contractors who offer a single trade other than roofing can register instead of getting a license, and those with $15,000 or less a year in residential work can hold an exemption. If you hire either, you can’t use the Contractor Recovery Fund.',
      },
      {
        q: 'What is the Minnesota Contractor Recovery Fund?',
        a: 'A state fund that repays homeowners for losses caused by a licensed residential building contractor’s or remodeler’s misconduct. You first need a court judgment against the licensee, and the fund pays up to $100,000 per homeowner.',
      },
      {
        q: 'Does a roofer need a license in Minnesota?',
        a: 'Yes, if the roofer works directly for you: a residential roofer, building contractor or remodeler license. A roofer license doesn’t cover gutters, soffit or fascia.',
      },
      {
        q: 'Does a contractor have to warn me about mechanic’s liens?',
        a: 'Yes, when subcontractors or suppliers will work on the job. The notice must be in the written contract, or delivered within 10 days if there’s no written contract. A contractor who skips it, or works without a required license, can’t file a mechanic’s lien.',
      },
    ],
    sources: [
      { label: 'DLI: who needs a license?', url: 'https://www.dli.mn.gov/business/residential-contractors/who-needs-license' },
      { label: 'DLI: who needs a roofer license?', url: 'https://dli.mn.gov/business/residential-contractors/who-needs-roofer-license' },
      { label: 'DLI: tips for hiring a contractor', url: 'https://www.dli.mn.gov/workers/homeowners/tips-hiring-contractor' },
      { label: 'DLI: Contractor Recovery Fund', url: 'https://dli.mn.gov/workers/homeowners/contractor-recovery-fund' },
      { label: 'Minn. Stat. § 326B.89 (Contractor Recovery Fund)', url: 'https://www.revisor.mn.gov/statutes/cite/326B.89' },
      { label: 'Minn. Stat. § 326B.811 (insurance-paid roofing contracts)', url: 'https://www.revisor.mn.gov/statutes/cite/326B.811' },
      {
        label: 'DLI: mechanical contractor bond requirements',
        url: 'https://www.dli.mn.gov/business/plumbing-contractors/mechanical-contractor-bond-requirements',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'tennessee',
    code: 'TN',
    name: 'Tennessee',
    generalContractors: 'state-and-local',
    short: 'A state license for jobs of $25,000 or more, plus a home improvement license in nine counties.',
    summary:
      'The Tennessee Board for Licensing Contractors licenses contractors for jobs of $25,000 or more, and issues home improvement and limited electrical and plumbing licenses for smaller work. Below $25,000 the rules depend on your county, so check with your local building codes office.',
    boards: [
      {
        name: 'Tennessee Board for Licensing Contractors (Department of Commerce and Insurance)',
        licenses:
          'Contractors for jobs of $25,000 or more, including building, electrical, plumbing, HVAC, roofing and masonry work; home improvement contractors in nine counties; and limited licensed electricians and plumbers for smaller jobs',
        lookupUrl: 'https://verify.tn.gov/',
        lookupNote: 'The state’s free license search. Check that the license is active and that its classification and monetary limit fit your job.',
        website: 'https://www.tn.gov/commerce/regboards/contractors.html',
      },
    ],
    whenRequired: [
      'A state contractor’s license is required before bidding on any project of $25,000 or more, counting labor and materials.',
      'Electrical, plumbing, HVAC and roofing subcontractors need a contractor’s license when their part of the job is $25,000 or more.',
      'In Bradley, Davidson, Hamilton, Haywood, Knox, Marion, Robertson, Rutherford and Shelby counties, residential remodeling jobs over $3,000 and under $25,000 need a state home improvement license.',
      'Smaller electrical and plumbing jobs need a state limited license where the state handles permits, or a local license where your city or county has its own program. A job can’t be split up to stay under a limit.',
    ],
    howToCheck: [
      'Ask for the contractor’s Tennessee license number and the exact name on the license.',
      'Look the contractor up in the state’s license search.',
      'Confirm the license is active and that its classification and monetary limit cover your type and size of job.',
      'For jobs under $25,000, ask your city or county building codes office which state or local license applies.',
      'Ask the Board for Licensing Contractors about complaints or disciplinary history.',
    ],
    watchFor: [
      'A county business license is not a contractor’s license. A contractor who asks you to pull the building permits yourself is a warning sign.',
      'If a contractor takes your money and doesn’t do the work, report it to local law enforcement and the Division of Consumer Affairs: Tennessee’s theft law can apply.',
    ],
    faq: [
      {
        q: 'How do I check a contractor’s license in Tennessee?',
        a: 'Use the state’s free license search at verify.tn.gov, and make sure the license is active and covers the type and size of your job.',
      },
      {
        q: 'Do I need a licensed contractor for a job under $25,000 in Tennessee?',
        a: 'It depends on where you live. In nine counties, remodeling jobs over $3,000 need a state home improvement license, and electrical or plumbing work may need a state limited license or a local license. Your building codes office can tell you what applies.',
      },
      {
        q: 'Which Tennessee counties require a home improvement license?',
        a: 'Bradley, Davidson, Hamilton, Haywood, Knox, Marion, Robertson, Rutherford and Shelby counties. The license covers residential remodeling jobs over $3,000 and under $25,000.',
      },
      {
        q: 'Does a roofer or electrician need a state license in Tennessee?',
        a: 'Yes, when their part of the job is $25,000 or more. Below that, electricians and plumbers may need a state limited license or a local license, depending on where you live.',
      },
    ],
    sources: [
      { label: 'Tennessee Board for Licensing Contractors', url: 'https://www.tn.gov/commerce/regboards/contractors.html' },
      {
        label: 'TDCI: Contractor Fraud Awareness Week 2026',
        url: 'https://www.tn.gov/commerce/news/2026/5/18/tdci-highlights-consumer-awareness-during-contractor-fraud-awareness-week.html',
      },
      {
        label: 'TDCI: counties that adopted the home improvement law',
        url: 'https://tn.gov/commerce/regboards/hi/county-information-adopting-the-home-improvement-law.html',
      },
      { label: 'TDCI: limited licensed electrician', url: 'https://www.tn.gov/commerce/regboards/contractors/license/get/lle.html' },
      {
        label: 'TDCI: who needs a limited licensed plumber license',
        url: 'https://www.tn.gov/commerce/regboards/llp/who-needs-a-limited-licensed-plumber--llp--license-.html',
      },
      { label: 'Tennessee Attorney General: avoiding home improvement fraud (2025)', url: 'https://www.tn.gov/attorneygeneral/news/2025/3/20/pr25-15.html' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'south-carolina',
    code: 'SC',
    name: 'South Carolina',
    generalContractors: 'state',
    short: 'A state license for home jobs over $5,000, and for trade work like roofing over $500.',
    summary:
      'South Carolina licenses contractors through two boards at the Department of Labor, Licensing and Regulation (LLR): the Residential Builders Commission for home builders and trades, and the Contractor’s Licensing Board for general and mechanical contractors. Most home improvement contractors fall under the Residential Builders Commission, but check both.',
    boards: [
      {
        name: 'South Carolina Residential Builders Commission (LLR)',
        licenses:
          'Residential builders for home jobs over $5,000, and residential specialty contractors for trade jobs over $500, including residential electricians, plumbers and HVAC contractors and registered trades such as roofers',
        lookupUrl: 'https://www.llr.sc.gov/',
        lookupNote: 'Open the Licensee Lookup on the LLR website and search under the Residential Builders Commission.',
        website: 'https://llr.sc.gov/res',
      },
      {
        name: 'South Carolina Contractor’s Licensing Board (LLR)',
        licenses: 'General and mechanical contractors when the regulated work costs more than $10,000, mainly commercial work',
        lookupUrl: 'https://www.llr.sc.gov/',
        lookupNote: 'Use the same LLR Licensee Lookup and search under the Contractor’s Licensing Board.',
        website: 'https://llr.sc.gov/clb/clb_general.aspx',
      },
    ],
    whenRequired: [
      'A residential builder license is required to build, repair or improve a home when the job costs more than $5,000.',
      'Residential specialty contractors such as roofers, electricians, plumbers and HVAC contractors need a registration or license for jobs over $500. The limit rose from $200 in May 2022.',
      'General and mechanical contractors need a Contractor’s Licensing Board license when the work costs more than $10,000. The limit rose from $5,000 in May 2023.',
      'A specialty registration doesn’t cover structural work or additions; those need a residential builder or general contractor license.',
    ],
    howToCheck: [
      'Ask the contractor for photo ID and their South Carolina license or registration number.',
      'Open the Licensee Lookup on the LLR website.',
      'Search the Residential Builders Commission first. If the contractor isn’t listed, search the Contractor’s Licensing Board.',
      'Confirm the license or registration is active and covers your type of work.',
      'Check for complaints with the South Carolina Department of Consumer Affairs.',
    ],
    watchFor: [
      'LLR advises a written contract that lists the contractor’s name, address and South Carolina license or registration number, the work, and the total cost with payment terms. Avoid large up-front payments.',
    ],
    faq: [
      {
        q: 'How do I check a contractor’s license in South Carolina?',
        a: 'Use the Licensee Lookup on the LLR website. Most home improvement contractors are licensed by the Residential Builders Commission, but some by the Contractor’s Licensing Board, so check both.',
      },
      {
        q: 'Do I need a licensed contractor for a small job in South Carolina?',
        a: 'Often, yes. Trade work over $500, such as roofing or electrical work, needs a Residential Builders Commission registration or license, and a builder taking a home job over $5,000 needs a residential builder license.',
      },
      {
        q: 'Who licenses electricians, plumbers and HVAC contractors in South Carolina?',
        a: 'For homes, the Residential Builders Commission licenses residential electricians, plumbers and HVAC contractors. Commercial work over $10,000 falls under the Contractor’s Licensing Board.',
      },
      {
        q: 'Did South Carolina’s contractor license limits change recently?',
        a: 'Yes. In May 2022 the limit for residential specialty contractors rose from $200 to $500, and in May 2023 the Contractor’s Licensing Board limit rose from $5,000 to $10,000.',
      },
    ],
    sources: [
      { label: 'SC LLR: Residential Builders Commission', url: 'https://llr.sc.gov/res' },
      { label: 'SC LLR: Contractor’s Licensing Board', url: 'https://llr.sc.gov/clb/clb_general.aspx' },
      { label: 'SC LLR: residential builder FAQ', url: 'https://llr.sc.gov/res/PDF/FAQ/RBB%20FAQ.pdf' },
      { label: 'SC LLR: residential specialty contractor FAQ', url: 'https://www.llr.sc.gov/res/PDF/FAQ/RBS%20FAQ.pdf' },
      { label: 'SC LLR: Contractor’s Licensing Board 2023 legislative update', url: 'https://www.llr.sc.gov/clb/PDFFiles/CLB2023LegislativeUpdate.pdf' },
      {
        label: 'SC LLR: consumer alert on property repairs after Hurricane Helene (2024)',
        url: 'https://www.llr.sc.gov/AboutUs/MediaCenter/news/2024/News%20Release%20-%20SC%20LLR%20Issues%20Consumer%20Alert%20for%20Property%20Repairs%20After%20Hurricane%20Helene.pdf',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'arizona',
    code: 'AZ',
    name: 'Arizona',
    generalContractors: 'state',
    short: 'A state ROC license for most home jobs of $1,000 or more, or any job needing a permit.',
    summary:
      'The Arizona Registrar of Contractors (ROC) licenses contractors statewide, including general, remodeling, electrical, plumbing, air-conditioning and roofing contractors. Only a license with a Current status can legally contract, so check it before you sign.',
    boards: [
      {
        name: 'Arizona Registrar of Contractors (ROC)',
        licenses:
          'General and remodeling contractors and specialty trades, including residential electrical (R-11), plumbing (R-37), air conditioning and refrigeration (R-39) and roofing (R-42)',
        lookupUrl: 'https://roc.az.gov/contractor-search',
        lookupNote:
          'Search by company name, person’s name or 6-digit license number. The record shows status, classification, bond and closed complaints from the past two years.',
        website: 'https://roc.az.gov/',
      },
    ],
    whenRequired: [
      'A license is generally required when a job’s total price, including labor and materials, is $1,000 or more.',
      'Any job that needs a local building permit requires a licensed contractor, whatever the price.',
      'The small-job (handyman) exemption covers only casual or minor work. It doesn’t apply to work that is part of a larger project or split into smaller contracts to stay under the limit.',
      'Unlicensed handymen who advertise must include the words “Not a Licensed Contractor” in their ads.',
    ],
    howToCheck: [
      'Ask for the contractor’s 6-digit ROC license number and the business name on the license.',
      'Search the ROC contractor search by license number, company name or person’s name.',
      'Confirm the status is Current, the only status that can legally contract, and check again on the day you sign.',
      'Make sure the license classification covers your job, such as R-39 for air conditioning or R-42 for roofing.',
      'Call the phone number on the ROC record to confirm the person you’re dealing with works for that company.',
    ],
    watchFor: [
      'The Residential Contractors’ Recovery Fund can pay up to $30,000 for losses caused by a contractor with a residential or dual license. It doesn’t cover commercial property.',
      'A contractor’s written contract must list their license number, the total price, a description of the work and a notice of your right to complain to the ROC.',
    ],
    faq: [
      {
        q: 'Does a handyman need a license in Arizona?',
        a: 'Only for bigger jobs. Someone without an ROC license may do casual or minor work if the total price is under $1,000 and no building permit is needed, and must say “Not a Licensed Contractor” in their ads.',
      },
      {
        q: 'Who licenses electricians, plumbers and roofers in Arizona?',
        a: 'The ROC licenses these trades as classifications, such as R-11 for residential electrical, R-37 for residential plumbing and R-42 for roofing. Check that the license includes the classification for your job.',
      },
      {
        q: 'How long do I have to file a complaint against an Arizona contractor?',
        a: 'Generally within two years of occupancy or of the date the work was last done.',
      },
      {
        q: 'What is the Arizona Residential Contractors’ Recovery Fund?',
        a: 'A state fund that can pay homeowners up to $30,000 for losses caused by a residential or dual licensed contractor. You generally go through the ROC complaint process or get a court judgment first.',
      },
    ],
    sources: [
      { label: 'Arizona ROC: contractor search', url: 'https://roc.az.gov/contractor-search' },
      { label: 'Arizona ROC: before you hire a contractor', url: 'https://roc.az.gov/before-hire' },
      { label: 'Arizona ROC: Recovery Fund', url: 'https://roc.az.gov/recovery-fund' },
      { label: 'Arizona ROC: license classifications', url: 'https://roc.az.gov/license-classifications' },
      { label: 'A.R.S. § 32-1121 (who doesn’t need a license)', url: 'https://www.azleg.gov/ars/32/01121.htm' },
      { label: 'A.R.S. § 32-1158 (contract requirements)', url: 'https://www.azleg.gov/ars/32/01158.htm' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'colorado',
    code: 'CO',
    name: 'Colorado',
    generalContractors: 'local-only',
    short: 'No state general contractor license; the state licenses electricians and plumbers.',
    summary:
      'Colorado doesn’t license general contractors or roofers at the state level; cities and counties such as Denver and the Pikes Peak region set their own rules. The state licenses electricians and plumbers and registers electrical and plumbing contractors.',
    boards: [
      {
        name: 'Colorado State Electrical Board (DORA)',
        licenses: 'Master and journeyman electricians and residential wiremen, and registration of electrical contractors',
        lookupUrl: 'https://apps2.colorado.gov/dora/licensing/lookup/licenselookup.aspx',
        lookupNote: 'Search by name, business name, city or license number. The search is case sensitive, so start with just the first and last name.',
        website: 'https://dpo.colorado.gov/Electrical',
      },
      {
        name: 'Colorado State Plumbing Board (DORA)',
        licenses: 'Master, journeyworker and residential plumbers, and registration of plumbing contractors',
        lookupUrl: 'https://apps2.colorado.gov/dora/licensing/lookup/licenselookup.aspx',
        lookupNote: 'Use the same DORA search by name, business name or license number.',
        website: 'https://dpo.colorado.gov/Plumbing',
      },
      {
        name: 'Denver Community Planning and Development: contractor licensing',
        licenses: 'General, building, residential and specialty trade contractors working in Denver',
        lookupUrl:
          'https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Community-Planning-and-Development/Contractor-Licensing',
        lookupNote: 'Use the “Verify a contractor’s license” link. Denver doesn’t accept contractor licenses from other counties or states.',
        website:
          'https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Community-Planning-and-Development/Contractor-Licensing',
      },
      {
        name: 'Pikes Peak Regional Building Department',
        licenses: 'Building, electrical, mechanical (HVAC), plumbing and other contractors in Colorado Springs, unincorporated El Paso County and nearby towns',
        lookupUrl: 'https://www.pprbd.org/Search/Contractor',
        lookupNote: 'Search by business name or license type. A contractor can’t get a permit unless its license is in good standing.',
        website: 'https://www.pprbd.org/',
      },
    ],
    whenRequired: [
      'Electrical and plumbing work for hire must be done by state-licensed electricians or plumbers, or apprentices they supervise, working for a state-registered contractor.',
      'General contracting, remodeling and roofing have no state license. Whether a local license is needed depends on your city or county.',
      'You may do electrical or plumbing work on your own home without a license if you get a permit and pass inspections. This doesn’t apply to property for sale or rent.',
      'In Denver, contractors need a Denver contractor license; the city doesn’t accept licenses from other counties or states.',
    ],
    howToCheck: [
      'For electrical or plumbing work, ask for the worker’s state license number and the company’s contractor registration.',
      'Search DORA’s license lookup by name, business name or license number, and confirm the license is active.',
      'For general, remodeling, roofing or HVAC work, ask your city or county building department which local license applies.',
      'In Denver, verify the license with Community Planning and Development; in Colorado Springs and El Paso County, use the Pikes Peak Regional Building Department search.',
      'Make sure the contractor pulls the permit in its own name. A contractor may not work under a homeowner’s permit.',
    ],
    watchFor: [
      'Colorado’s roofing law requires a written contract before work starts. If insurance is paying, you can cancel within 72 hours after your insurer denies the claim and get your deposit back. Cancel in writing.',
      'After hail or wind storms, watch for door-to-door contractors who make big promises or want full payment before the work is done. Confirm their license with your city or county.',
    ],
    faq: [
      {
        q: 'Does Colorado require a general contractor license?',
        a: 'No. Colorado doesn’t license general contractors or roofers at the state level. Many cities and counties, such as Denver and the Pikes Peak Regional Building Department, require their own contractor licenses.',
      },
      {
        q: 'How do I check an electrician’s or plumber’s license in Colorado?',
        a: 'Use DORA’s license lookup and search by name, business name or license number. The State Electrical Board and State Plumbing Board license these trades.',
      },
      {
        q: 'Can I do my own electrical or plumbing work in Colorado?',
        a: 'Yes, on your own home, if you get a permit, pass inspections and do the work yourself. The home can’t be for sale or rent.',
      },
      {
        q: 'Does Denver accept contractor licenses from other cities?',
        a: 'No. A contractor working in Denver needs a Denver license; the city doesn’t accept licenses from other counties or states.',
      },
    ],
    sources: [
      { label: 'Colorado DORA: home and repair consumer protection', url: 'https://dora.colorado.gov/consumer-protection-home-and-repair' },
      { label: 'Colorado DORA: license lookup', url: 'https://apps2.colorado.gov/dora/licensing/lookup/licenselookup.aspx' },
      { label: 'Colorado State Electrical Board', url: 'https://dpo.colorado.gov/Electrical' },
      { label: 'Colorado State Plumbing Board: permits and inspections', url: 'https://dpo.colorado.gov/Plumbing/PermitInspectionInfo' },
      {
        label: 'Denver contractor licensing',
        url: 'https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Community-Planning-and-Development/Contractor-Licensing',
      },
      { label: 'Pikes Peak Regional Building Department: contractor search', url: 'https://www.pprbd.org/Search/Contractor' },
      { label: 'Colorado Attorney General: roofing contractor law', url: 'https://coag.gov/app/uploads/2020/10/CO-Roofing-Contractor-Law.pdf' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'indiana',
    code: 'IN',
    name: 'Indiana',
    generalContractors: 'local-only',
    short: 'Plumbers need a state license; other contractors are licensed by cities and counties.',
    summary:
      'Indiana has no state license for general contractors, electricians or HVAC contractors, so cities and counties such as Indianapolis and Allen County license them. Plumbers are the exception: the state licenses plumbing contractors and journeyman plumbers.',
    boards: [
      {
        name: 'Indiana Professional Licensing Agency: Plumbing Commission',
        licenses: 'Plumbing contractors, journeyman plumbers and apprentice plumbers statewide',
        lookupUrl: 'https://secure.in.gov/pla/license/free-search-and-verify/',
        lookupNote: 'Use the free Search & Verify tool by name or license number, and confirm the plumbing license is active.',
        website: 'https://www.in.gov/pla/professions/plumbing-home/',
      },
      {
        name: 'City of Indianapolis Department of Business and Neighborhood Services',
        licenses: 'General, electrical, HVAC and wrecking contractors in Indianapolis, and city registration of state-licensed plumbing contractors',
        lookupUrl: 'https://www.indy.gov/activity/licensed-contractors',
        lookupNote:
          'The city posts lists of licensed contractors, usually updated the first Monday of each month. Beech Grove, Lawrence, Southport and Speedway license contractors themselves.',
        website: 'https://www.indy.gov/activity/contractor-licenses',
      },
    ],
    whenRequired: [
      'There is no state license for general contractors, electricians or HVAC contractors. Your city or county decides who needs a license.',
      'Plumbing contractors and journeyman plumbers need a state license. In Indianapolis, they must also register with the city.',
      'In Indianapolis, anyone doing construction, sewer, driveway or excavation work must be a listed contractor, and the hired contractor pulls the permits.',
      'In Allen County, including Fort Wayne, all contractors and subcontractors must be licensed or registered with the county Building Department, which you can contact to confirm a license.',
    ],
    howToCheck: [
      'Ask the contractor which license they hold and which city or county issued it.',
      'For plumbing work, search the Professional Licensing Agency’s free Search & Verify tool and confirm the license is active.',
      'In Indianapolis, find the contractor on the city’s licensed contractor lists.',
      'Elsewhere, ask your city or county building department whether the contractor is licensed, bonded and insured there.',
      'Check for complaints with the Attorney General’s Consumer Protection Division before you sign.',
    ],
    watchFor: [
      'Home improvement contracts over $150 must be in writing, with the price, a description of the work and approximate start and finish dates. The Attorney General says you generally have three business days to cancel.',
      'A contractor may not offer to pay or rebate your insurance deductible to win a job. Be wary of anyone who says “the city’s list just hasn’t been updated yet”: storm chasers use that line.',
    ],
    faq: [
      {
        q: 'Does Indiana have a state contractor license?',
        a: 'Not for general contractors. The state licenses plumbers; cities and counties such as Indianapolis and Allen County license other contractors.',
      },
      {
        q: 'How do I check a plumber’s license in Indiana?',
        a: 'Use the Professional Licensing Agency’s free Search & Verify tool by name or license number, and make sure the license is active.',
      },
      {
        q: 'How do I check a contractor in Indianapolis?',
        a: 'Look the contractor up on the city’s licensed contractor lists. Licensed contractors have a bond and liability insurance on file with the city.',
      },
      {
        q: 'Do I need a written contract for home improvement work in Indiana?',
        a: 'Yes, for contracts over $150. It must show the price, the work and approximate start and finish dates.',
      },
    ],
    sources: [
      { label: 'Indiana PLA: plumbing', url: 'https://www.in.gov/pla/professions/plumbing-home/' },
      { label: 'Indiana PLA: free Search & Verify', url: 'https://secure.in.gov/pla/license/free-search-and-verify/' },
      { label: 'Indianapolis: contractor licenses', url: 'https://www.indy.gov/activity/contractor-licenses' },
      { label: 'Indianapolis: licensed contractors', url: 'https://www.indy.gov/activity/licensed-contractors' },
      { label: 'Allen County: contractor licensing', url: 'https://www.allencounty.in.gov/237/Contractor-Licensing' },
      {
        label: 'Indiana Attorney General: home improvement scams',
        url: 'https://secure.in.gov/attorneygeneral/consumer-protection-division/files/CPD_Fact_Sheet-Home_improv_Scams.pdf',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'missouri',
    code: 'MO',
    name: 'Missouri',
    generalContractors: 'local-only',
    short: 'No state general contractor license; cities and counties such as Kansas City license them.',
    summary:
      'Missouri has no statewide general contractor license, so cities and counties such as Kansas City, St. Louis and St. Louis County license contractors and trades. The state offers an optional statewide license for electrical contractors, but local permits still apply.',
    boards: [
      {
        name: 'Missouri Division of Professional Registration: Office of Statewide Electrical Contractors',
        licenses: 'Electrical contractors who choose the optional statewide license',
        lookupUrl: 'https://renew.pr.mo.gov/licensee-search.asp',
        lookupNote: 'Search by name, license number, profession or county. Results show active licensees.',
        website: 'https://pr.mo.gov/electricalcontractors.asp',
      },
      {
        name: 'Kansas City, Missouri City Planning & Development: contractor licensing',
        licenses: 'Residential building, electrical, plumbing, mechanical and other contractors in Kansas City, Missouri',
        lookupUrl: 'https://www.kcmo.gov/city-hall/departments/city-planning-development/contractor-licensing',
        lookupNote: 'Use the search for active licensed contractors on this page.',
        website: 'https://www.kcmo.gov/city-hall/departments/city-planning-development',
      },
      {
        name: 'St. Louis County Department of Transportation and Public Works',
        licenses: 'Electrical contractors, master plumbers and mechanical (HVAC) contractors in St. Louis County. The county doesn’t license general contractors',
        lookupUrl:
          'https://stlouiscountymo.gov/st-louis-county-departments/transportation-and-public-works/mechanical-licensing/list-of-mechanical-certified-contractors/certified-mechanical-contractor-list/',
        lookupNote: 'The county posts lists of certified mechanical contractors and licensed master plumbers. For electricians, contact the county.',
        website: 'https://stlouiscountymo.gov/st-louis-county-departments/transportation-and-public-works/residential-building/',
      },
    ],
    whenRequired: [
      'There is no state license for general contractors. The city or county where the home is sets the rules.',
      'In Kansas City, anyone who builds, structurally alters or enlarges a one- or two-family home needs a residential building contractor license or must work under one. An owner doing their own work on the single-family home they live in is exempt.',
      'In the City of St. Louis, contractors need a city business license, and plumbing and mechanical permits go only to contractors licensed by the Building Division. The city has no online license search, so contact the Building Division.',
      'In St. Louis County, electrical, plumbing and mechanical work must be done by contractors licensed with the county.',
    ],
    howToCheck: [
      'Find out which city or county issues building permits for your address, since each sets its own rules.',
      'In Kansas City, search the city’s active licensed contractors.',
      'In St. Louis County, check the county’s lists of mechanical contractors and master plumbers, or contact Transportation and Public Works.',
      'In the City of St. Louis, contact the Building Division to confirm a trade license, and look up past permits by address.',
      'For a statewide electrical license, use the Division of Professional Registration’s licensee search, and check for complaints with the Attorney General.',
    ],
    watchFor: [
      'If your insurer denies all or part of a claim, you can cancel an insurance-paid roofing or exterior repair contract until midnight of the fifth business day after the insurer’s written notice. The contractor must refund your payments within 10 days.',
      'If you sign a contract at home after a door-to-door sales pitch, you generally have three business days to cancel in writing.',
    ],
    faq: [
      {
        q: 'Does Missouri have a state contractor license?',
        a: 'Not for general contractors. Cities and counties such as Kansas City, St. Louis and St. Louis County license contractors and trades. The state offers an optional statewide electrical contractor license.',
      },
      {
        q: 'Do electricians need a state license in Missouri?',
        a: 'Not always. The statewide electrical contractor license is optional; many cities and counties license electrical contractors, and local permits and inspections still apply.',
      },
      {
        q: 'How do I check a contractor in Kansas City, Missouri?',
        a: 'Search the city’s active licensed contractors on the City Planning & Development contractor licensing page.',
      },
      {
        q: 'Can I cancel a roofing contract if my insurance denies the claim?',
        a: 'Yes. You can cancel before midnight of the fifth business day after the insurer’s written denial, by written notice to the address in the contract. The contractor must refund payments within 10 days, except for emergency work you approved in writing.',
      },
    ],
    sources: [
      { label: 'Missouri Office of Statewide Electrical Contractors', url: 'https://pr.mo.gov/electricalcontractors.asp' },
      { label: 'Missouri Division of Professional Registration: licensee search', url: 'https://renew.pr.mo.gov/licensee-search.asp' },
      { label: 'Kansas City, MO: contractor licensing', url: 'https://www.kcmo.gov/city-hall/departments/city-planning-development/contractor-licensing' },
      {
        label: 'St. Louis County: residential repairs and renovations guide',
        url: 'https://stlouiscountymo.gov/st-louis-county-departments/transportation-and-public-works/publications-and-manuals/pw-residential-guides/repairs-and-renovations/',
      },
      { label: 'City of St. Louis: Building Division', url: 'https://www.stlouis-mo.gov/government/departments/public-safety/building/index.cfm' },
      { label: 'RSMo § 407.725 (insurance-paid roofing contracts)', url: 'https://revisor.mo.gov/main/OneSection.aspx?section=407.725' },
      { label: 'Missouri Attorney General: door-to-door sales', url: 'https://ago.mo.gov/get-help/programs-services-from-a-z/door-to-door-sales/' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'massachusetts',
    code: 'MA',
    name: 'Massachusetts',
    generalContractors: 'state',
    short: 'Home improvement contractors register with the state; builders need a supervisor license.',
    summary:
      'Massachusetts registers home improvement contractors through the Office of Consumer Affairs and Business Regulation, and licenses construction supervisors, including roofers, through the Office of Public Safety and Inspections. Hire a registered contractor for work on your owner-occupied home: the state’s Guaranty Fund doesn’t protect you otherwise.',
    boards: [
      {
        name: 'Office of Consumer Affairs and Business Regulation: Home Improvement Contractor program',
        licenses: 'Home Improvement Contractor (HIC) registration for work on existing owner-occupied homes of one to four units',
        lookupUrl: 'https://www.mass.gov/check-if-your-contractor-is-a-registered-home-improvement-contractor',
        lookupNote: 'Links to the MA Contractor Hub search. Search by business name or registration number to see status and history.',
        website: 'https://www.mass.gov/home-improvement-contractor-program',
      },
      {
        name: 'Office of Public Safety and Inspections (OPSI)',
        licenses:
          'Construction Supervisor Licenses (CSL), including specialty licenses for roofing, windows and siding, and insulation, and refrigeration technician and contractor licenses',
        lookupUrl: 'https://www.mass.gov/how-to/check-a-construction-supervisor-license',
        lookupNote: 'Follow the link to OPSI’s license verification site and search by license type, number, name or city.',
        website: 'https://www.mass.gov/construction-supervisor-licensing',
      },
      {
        name: 'Division of Occupational Licensure: electricians, plumbers and gas fitters',
        licenses: 'Electricians, and journeyman and master plumbers and gas fitters',
        lookupUrl: 'https://www.mass.gov/info-details/division-of-occupational-licensure-check-a-license',
        lookupNote: 'This page sends you to the right search for each trade. No account is needed.',
        website: 'https://www.mass.gov/info-details/division-of-occupational-licensure-check-a-license',
      },
    ],
    whenRequired: [
      'HIC registration is required for work on an existing owner-occupied home of one to four units that is the owner’s primary residence. New construction, larger buildings, rentals and second homes aren’t covered.',
      'Jobs under $500 in total are exempt from HIC registration, as are some very small part-time contractors and installers of central heating and air conditioning.',
      'A Construction Supervisor License is required to supervise building work on one- and two-family homes. On an owner-occupied home, roofing, window and siding jobs need at least a specialty supervisor license plus HIC registration.',
      'Electrical work needs a licensed electrician, and plumbing and gas work a licensed plumber or gas fitter.',
    ],
    howToCheck: [
      'Ask for the contractor’s HIC registration number, construction supervisor license number and any trade license number. You can also ask to see their state HIC ID card.',
      'Look up the HIC number or business name on the MA Contractor Hub, and review the registration status and history.',
      'Check the supervisor license on OPSI’s license verification site.',
      'Check electricians, plumbers and gas fitters through the Division of Occupational Licensure’s license check.',
      'Make sure the name, license type and expiration date match the person and company on your contract.',
    ],
    watchFor: [
      'A deposit can’t be more than one-third of the total price, or the cost of special-order materials if that is higher. Jobs over $1,000 need a written contract.',
      'The HIC Guaranty Fund can pay up to $25,000 of your losses after an unpaid court judgment or arbitration award, but only if the contractor was registered.',
    ],
    faq: [
      {
        q: 'Does Massachusetts have a general contractor license?',
        a: 'Not a single one. Contractors who work on owner-occupied homes register as Home Improvement Contractors, and the person supervising building work needs a Construction Supervisor License. The two aren’t interchangeable.',
      },
      {
        q: 'Does a roofer need a license in Massachusetts?',
        a: 'Yes. New or replacement roofing needs at least a roofing construction supervisor license, and on an owner-occupied home the contractor must also be HIC-registered. Your town usually requires a building permit too.',
      },
      {
        q: 'Is there a minimum job size for HIC registration?',
        a: 'Jobs under $500 in total are exempt, and so are some very small part-time contractors. A job can’t be split into smaller contracts to get under the limit.',
      },
      {
        q: 'What is the Massachusetts HIC Guaranty Fund?',
        a: 'It can repay up to $25,000 of your losses if you win a court judgment or arbitration award against a registered contractor and can’t collect. It doesn’t cover unregistered contractors.',
      },
    ],
    sources: [
      {
        label: 'Mass.gov: check if your contractor is a registered home improvement contractor',
        url: 'https://www.mass.gov/check-if-your-contractor-is-a-registered-home-improvement-contractor',
      },
      { label: 'Mass.gov: HIC homeowner resources', url: 'https://www.mass.gov/info-details/hic-homeowner-resources' },
      {
        label: 'Mass.gov: when is a construction supervisor license required?',
        url: 'https://www.mass.gov/info-details/when-is-a-construction-supervisor-license-required',
      },
      {
        label: 'Mass.gov: work requiring an HIC registration or CSL',
        url: 'https://www.mass.gov/doc/work-requiring-a-home-improvement-contractor-hic-registration-or-construction-supervisor-license-csl-0/download',
      },
      {
        label: 'Mass.gov: Guaranty Fund claims',
        url: 'https://www.mass.gov/info-details/file-a-guaranty-fund-claim-for-an-unpaid-hic-judgment',
      },
      {
        label: 'M.G.L. c. 142A, § 2 (contracts and deposits)',
        url: 'https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXX/Chapter142A/Section2',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'maryland',
    code: 'MD',
    name: 'Maryland',
    generalContractors: 'state',
    short: 'A state MHIC license for repair and remodeling work on existing homes.',
    summary:
      'The Maryland Home Improvement Commission (MHIC) licenses contractors and salespeople who remodel, repair or replace parts of existing homes, and separate state boards license electricians, plumbers and HVACR contractors. Check the MHIC license before you sign, and never pay more than one-third of the price as a deposit.',
    boards: [
      {
        name: 'Maryland Home Improvement Commission (MHIC)',
        licenses: 'Home improvement contractors and salespeople for remodeling, repair and replacement work on existing homes',
        lookupUrl: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC%3A%3AHIC_qselect',
        lookupNote: 'Search by contractor name, trade name, salesperson, location or license number.',
        website: 'https://labor.maryland.gov/license/mhic/',
      },
      {
        name: 'Maryland Department of Labor: electrician, plumbing and HVACR boards',
        licenses: 'Electricians, plumbers and gas fitters, and heating, ventilation, air-conditioning and refrigeration contractors',
        lookupUrl: 'https://labor.maryland.gov/pq/',
        lookupNote:
          'Choose the board on the licensing queries page. In Baltimore County and the WSSC area of Montgomery and Prince George’s counties, plumbers are licensed locally instead.',
        website: 'https://labor.maryland.gov/pq/',
      },
    ],
    whenRequired: [
      'Anyone who does or sells home improvement work on an existing home needs an MHIC license, including remodeling, repairs and replacements such as tile and wood flooring.',
      'The MHIC license doesn’t cover building new homes.',
      'Electricians need a state license from the State Board of Electricians. Some counties also require a local registration.',
      'Plumbers and gas fitters need a state Board of Plumbing license, except in Baltimore County and the WSSC area, which license plumbers locally. Heating and air-conditioning work needs a state HVACR license.',
    ],
    howToCheck: [
      'Ask for the contractor’s MHIC license number, and for trade work the electrician, plumber or HVACR license number.',
      'Search the MHIC public query by name or license number and confirm the license is active.',
      'Look the contractor up on the MHIC disciplinary actions page.',
      'Check electricians, plumbers and HVACR contractors on the Department of Labor’s licensing queries page. In Montgomery and Prince George’s counties, check plumbers with WSSC Water.',
      'Make sure the name on the license matches the company on your contract.',
    ],
    watchFor: [
      'Pay nothing before the contract is signed, and no more than one-third of the contract price as a deposit.',
      'The MHIC Guaranty Fund can repay up to $30,000 of your losses, or the amount you paid the contractor if that is less. A claim starts with a complaint to the MHIC.',
    ],
    faq: [
      {
        q: 'Does Maryland have a general contractor license?',
        a: 'Not for all construction. The MHIC license covers home improvement work on existing homes, such as remodeling, repairs and replacements, but not building new homes.',
      },
      {
        q: 'How much can a Maryland contractor ask for up front?',
        a: 'No more than one-third of the contract price as a deposit. The MHIC advises paying nothing before the contract is signed.',
      },
      {
        q: 'What is the Maryland Home Improvement Guaranty Fund?',
        a: 'It can repay homeowners for losses caused by a home improvement contractor, up to $30,000 or the amount you paid the contractor, whichever is less. You start by filing a complaint with the MHIC.',
      },
      {
        q: 'Do electricians in Maryland need a state license?',
        a: 'Yes, an apprentice, journeyperson or master license from the State Board of Electricians. Some counties also require a local registration, so check with your county permit office.',
      },
    ],
    sources: [
      { label: 'Maryland Home Improvement Commission', url: 'https://labor.maryland.gov/license/mhic/' },
      {
        label: 'MHIC public query',
        url: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC%3A%3AHIC_qselect',
      },
      { label: 'MHIC disciplinary actions', url: 'https://labor.maryland.gov/license/mhic/mhicdisc.shtml' },
      { label: 'MHIC Guaranty Fund FAQ', url: 'https://labor.maryland.gov/license/mhic/mhicfaqgf.shtml' },
      { label: 'MHIC FAQ', url: 'https://www.labor.maryland.gov/license/mhic/mhicfaq.shtml' },
      { label: 'Maryland Department of Labor: licensing queries', url: 'https://labor.maryland.gov/pq/' },
      { label: 'Maryland State Board of Electricians', url: 'https://labor.maryland.gov/license/elec/' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'connecticut',
    code: 'CT',
    name: 'Connecticut',
    generalContractors: 'state',
    short: 'Home improvement contractors register with the state, and the trades are licensed.',
    summary:
      'The Connecticut Department of Consumer Protection (DCP) registers home improvement and new home construction contractors, and its examining boards license electricians, plumbers and heating and cooling contractors. All of these can be checked on the state’s eLicense site, and only people who hired a registered home improvement contractor can claim from the Guaranty Fund.',
    boards: [
      {
        name: 'Connecticut Department of Consumer Protection: contractor registration',
        licenses: 'Home improvement contractors and salespeople, including roofing companies, and new home construction contractors',
        lookupUrl: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
        lookupNote: 'Search by name, business name or credential number; filling in just one or two fields works best. Check that the status is active.',
        website: 'https://portal.ct.gov/dcp/trade-practices-division/home-improvement-for-consumers',
      },
      {
        name: 'Connecticut Department of Consumer Protection: trade examining boards',
        licenses: 'Electrical, plumbing and piping, and heating, cooling and sheet metal contractors and journeypersons',
        lookupUrl: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
        lookupNote: 'Use the same eLicense search. Contractor licenses (such as E-1, P-1 or S-1) are the ones that can sign contracts and pull permits.',
        website: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
      },
    ],
    whenRequired: [
      'A contractor must register with DCP before advertising or starting home improvement work once their home improvement contracts total more than $1,000 in a year.',
      'All roofing companies must have an active home improvement contractor registration.',
      'Electrical, plumbing and heating and cooling work needs a state trade license. A trade licensee working within their license doesn’t also need home improvement registration.',
      'Anyone who builds new homes needs a separate new home construction contractor registration before a building permit can be issued.',
    ],
    howToCheck: [
      'Ask for the contractor’s Connecticut registration or license number. Home improvement contractors must show it on contracts and ads.',
      'Search the eLicense lookup by name, business name or number.',
      'Make sure the credential fits the job: home improvement registration for remodeling and roofing, new home construction registration for a new house, or a trade license for electrical, plumbing or HVAC work.',
      'Check that the status is active and the expiration date hasn’t passed.',
      'Agree in writing on who will pull the building permit, and confirm it with your local building official.',
    ],
    watchFor: [
      'The Home Improvement Guaranty Fund can repay up to $25,000 per contract, but only if your contractor was registered. You need a court judgment first, must apply within two years of it, and the fund doesn’t cover new home construction.',
      'Home improvement contracts must be in writing, signed and dated, and show the contractor’s registration number. You can cancel until midnight of the third business day after signing, and Saturday counts as a business day.',
    ],
    faq: [
      {
        q: 'What license does a remodeling contractor need in Connecticut?',
        a: 'A home improvement contractor registration from DCP. New home builders need a new home construction contractor registration instead, and electricians, plumbers and HVAC contractors need state trade licenses.',
      },
      {
        q: 'Do roofers need to be registered in Connecticut?',
        a: 'Yes. All roofing companies must have an active home improvement contractor registration. Check it on eLicense before you sign.',
      },
      {
        q: 'How much can the Connecticut Home Improvement Guaranty Fund pay?',
        a: 'Up to $25,000 per contract (up from $15,000 since July 2022), if you hired a registered contractor. You need a court judgment against the contractor before you apply.',
      },
      {
        q: 'Can I cancel a home improvement contract in Connecticut?',
        a: 'Yes, until midnight of the third business day after signing; Saturday counts as a business day. The contractor must give you written notice of this right.',
      },
    ],
    sources: [
      { label: 'Connecticut eLicense lookup', url: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx' },
      { label: 'DCP: home improvement for consumers', url: 'https://portal.ct.gov/dcp/trade-practices-division/home-improvement-for-consumers' },
      { label: 'Connecticut General Statutes ch. 400 (home improvement contractors)', url: 'https://www.cga.ct.gov/current/pub/chap_400.htm' },
      {
        label: 'DCP: Home Improvement Guaranty Fund',
        url: 'https://portal.ct.gov/dcp/knowledge-base/articles/consumer-topics/home-improvement/home-improvement-guaranty-fund',
      },
      {
        label: 'DCP: scammers posing as roofing companies (2025)',
        url: 'https://portal.ct.gov/dcp/news-releases-from-the-department-of-consumer-protection/2025-news-releases/be-aware-of-scammers-posing-as-roofing-companies',
      },
      { label: 'Office of Legislative Research: Guaranty Fund increase (2023)', url: 'https://cga.ct.gov/2023/rpt/pdf/2023-R-0170.pdf' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'iowa',
    code: 'IA',
    name: 'Iowa',
    generalContractors: 'state-and-local',
    short: 'Contractors register with the state; electricians, plumbers and HVAC need state licenses.',
    summary:
      'Iowa’s Department of Inspections, Appeals, and Licensing (DIAL) registers construction contractors, and its boards license electricians, plumbers and HVAC contractors. Registration is required once a contractor earns $2,000 a year from construction, but it exists to enforce insurance and tax rules and doesn’t vouch for quality.',
    boards: [
      {
        name: 'Iowa Department of Inspections, Appeals, and Licensing (DIAL): contractor registration',
        licenses: 'Construction contractors, including general contractors, remodelers, roofers and painters',
        lookupUrl: 'https://dial.iowa.gov/licenses/building/contractors',
        lookupNote: 'Use the contractor registration search linked from this page, one field at a time. Expired registrations don’t appear.',
        website: 'https://dial.iowa.gov/',
      },
      {
        name: 'Iowa Electrical Examining Board (DIAL)',
        licenses: 'Electricians and electrical contractors',
        lookupUrl: 'https://dial.iowa.gov/boards-0/electrical-examining-board',
        lookupNote: 'Use the “Find a Licensed Electrician” link on the board’s page.',
        website: 'https://dial.iowa.gov/licenses/building/electrical-licensing',
      },
      {
        name: 'Iowa Plumbing and Mechanical Systems Board (DIAL)',
        licenses: 'Plumbing, HVAC, refrigeration, sheet metal and hydronic professionals and contractors',
        lookupUrl: 'https://dial.iowa.gov/boards-0/plumbing-mechanical',
        lookupNote: 'Use the online license search on the board’s page.',
        website: 'https://dial.iowa.gov/licenses/building/plumbing-mechanical',
      },
    ],
    whenRequired: [
      'Anyone who earns at least $2,000 a year from construction work must register with DIAL, including general contractors, roofers and painters.',
      'People who earn less, or work only on their own property, don’t have to register.',
      'Electrical work for others needs a state electrical license. An owner may do electrical work on the existing single-family home they live in, but new houses need a licensed electrical contractor.',
      'Plumbing, HVAC, refrigeration, sheet metal and hydronic work needs a license from the Plumbing and Mechanical Systems Board.',
    ],
    howToCheck: [
      'Ask for the contractor’s Iowa registration number, and for electrical, plumbing or HVAC work their state license number.',
      'Search DIAL’s contractor registration, and make sure the business name matches and the registration is current.',
      'Check electricians with the Electrical Examining Board, and plumbers and HVAC contractors with the Plumbing and Mechanical Systems Board.',
      'Ask your city building department about local rules. Some cities, such as Ames, also register contractors.',
      'Check for complaints too: registration doesn’t guarantee quality or insurance.',
    ],
    watchFor: [
      'For most sales of $25 or more made at your home, you have three business days to cancel, and the seller must give you written notice of this right.',
      'Avoid large up-front payments, and ask for a lien waiver when you make the final payment. On home jobs, the general contractor must post a notice to the state’s mechanics’ lien registry within 10 days after work begins.',
    ],
    faq: [
      {
        q: 'Does Iowa require a general contractor license?',
        a: 'Not a license, but a state registration with DIAL once a contractor earns $2,000 a year from construction. Some cities add their own registration rules.',
      },
      {
        q: 'Does contractor registration mean a contractor is qualified?',
        a: 'No. Registration exists to make sure contractors follow workers’ compensation and unemployment insurance laws. It doesn’t guarantee quality, reliability or insurance coverage.',
      },
      {
        q: 'Do electricians and HVAC contractors need a license in Iowa?',
        a: 'Yes. The Electrical Examining Board licenses electricians, and the Plumbing and Mechanical Systems Board licenses plumbing, HVAC, refrigeration, sheet metal and hydronic work.',
      },
      {
        q: 'Can I cancel a contract I signed at my home in Iowa?',
        a: 'Often, yes: you have three business days to cancel most sales of $25 or more made at your home. If you weren’t given written notice of this right, the time runs from when you get it.',
      },
    ],
    sources: [
      { label: 'Iowa DIAL: contractor registration', url: 'https://dial.iowa.gov/licenses/building/contractors' },
      { label: 'Iowa Code § 91C.1 (contractors and exemptions)', url: 'https://www.legis.iowa.gov/docs/code/91C.1.pdf' },
      {
        label: 'Iowa DIAL: electrical licensing FAQs',
        url: 'https://dial.iowa.gov/licenses/building/electrical-licensing/electrical-licensing-faqs',
      },
      { label: 'Iowa DIAL: Plumbing and Mechanical Systems Board', url: 'https://dial.iowa.gov/boards-0/plumbing-mechanical' },
      {
        label: 'Iowa Attorney General: home improvement and contractor tips',
        url: 'https://www.iowaattorneygeneral.gov/for-consumers/general-consumer-information/home-property/home-improvement-contractor-tips',
      },
      {
        label: 'Iowa Attorney General: right to cancel',
        url: 'https://www.iowaattorneygeneral.gov/for-consumers/general-consumer-information/right-to-cancel',
      },
      { label: 'Iowa Code § 572.13A (notice of commencement of work)', url: 'https://www.legis.iowa.gov/docs/code/572.13A.pdf' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'alabama',
    code: 'AL',
    name: 'Alabama',
    generalContractors: 'state',
    short: 'Alabama has separate state boards for home builders, general contractors and each trade.',
    summary:
      'Alabama splits contractor licensing among state boards. The Home Builders Licensure Board covers home building, remodeling and roofing, and the Licensing Board for General Contractors covers large, mainly commercial projects. Electricians, plumbers and gas fitters, and HVAC contractors each have their own board, so check the one that matches the job.',
    boards: [
      {
        name: 'Alabama Home Builders Licensure Board',
        licenses: 'Home builders and remodelers (unlimited and limited licenses) and residential roofers',
        lookupUrl: 'https://hblb.alabama.gov/?p=1515',
        lookupNote: 'Search by any field. The name search also finds names that sound alike.',
        website: 'https://hblb.alabama.gov/',
      },
      {
        name: 'Alabama Licensing Board for General Contractors',
        licenses: 'General contractors on projects of $100,000 or more, mainly commercial and industrial',
        lookupUrl: 'https://genconbd.alabama.gov/search/',
        website: 'https://genconbd.alabama.gov/',
      },
      {
        name: 'Alabama Electrical Contractors Board',
        licenses: 'Electrical contractors and journeyman electricians',
        lookupUrl: 'https://aecb.alabama.gov/consumers/',
        lookupNote: 'Choose Licensee Search on the board’s Consumers page.',
        website: 'https://aecb.alabama.gov/',
      },
      {
        name: 'Alabama Plumbers and Gas Fitters Examining Board',
        licenses: 'Master and journeyman plumbers and gas fitters, and registered apprentices',
        lookupUrl: 'https://pgfb.alabama.gov/',
        lookupNote: 'Open Licensee Search from the Consumers menu on the board’s website.',
        website: 'https://pgfb.alabama.gov/',
      },
      {
        name: 'Alabama Board of Heating, Air Conditioning and Refrigeration Contractors',
        licenses: 'HVAC and refrigeration contractors who install, service or repair systems',
        lookupUrl: 'https://hacr.alabama.gov/',
        lookupNote: 'Look for the license search on the board’s website, or contact the board to confirm a certification.',
        website: 'https://hacr.alabama.gov/',
      },
    ],
    whenRequired: [
      'Building, remodeling or repairing a home needs a Home Builders Licensure Board license when the total cost, including labor and materials, is more than $10,000. Work that affects the structure or involves more than one trade needs an unlimited license.',
      'Roof work done directly for a homeowner needs a Home Builders Licensure Board license when it costs more than $2,500. A roofer license or an unlimited home builder license qualifies.',
      'Large projects of $100,000 or more, mainly commercial, need a license from the Licensing Board for General Contractors. The minimum rose from $50,000 to $100,000 on October 1, 2024, so older guides may show the lower figure.',
      'Electrical, plumbing and gas fitting, and HVAC work each need a license or certification from that trade’s state board.',
    ],
    howToCheck: [
      'Ask for the exact name on the license and the license number.',
      'For home building, remodeling and roofing, search the Home Builders Licensure Board. For large commercial projects, search the Licensing Board for General Contractors.',
      'For electrical, plumbing, gas or HVAC work, check with that trade’s board.',
      'Confirm the license is active, the name matches your contract, and the license type fits the job: unlimited, limited or roofer.',
      'If you can’t find the contractor or the results are unclear, contact the board before you sign or pay.',
    ],
    watchFor: [
      'The Home Builders Licensure Board’s Homeowners Recovery Fund can pay up to $30,000 when you win a court judgment against a licensed builder and can’t collect. A board complaint alone isn’t enough, and the fund doesn’t cover work by roofer-license holders.',
      'After storms, the Attorney General warns never to pay in full up front and to ask to see the contractor’s state license.',
    ],
    faq: [
      {
        q: 'Do I need a licensed contractor for a remodel in Alabama?',
        a: 'Yes, if the total cost is more than $10,000, including labor and materials. The contractor needs a license from the Home Builders Licensure Board, and the board encourages homeowners to hire licensees even for smaller jobs.',
      },
      {
        q: 'Does a roofer need a license in Alabama?',
        a: 'Yes, for roof work done directly for a homeowner that costs more than $2,500. The roofer must be licensed and bonded through the Home Builders Licensure Board. A holder of an unlimited home builder license can also do roofing.',
      },
      {
        q: 'What is the difference between a limited and an unlimited home builder license?',
        a: 'An unlimited license covers any residential work, up to building a new home. A limited license covers work in one trade that doesn’t affect the home’s structure, and it doesn’t allow roofing.',
      },
      {
        q: 'Who licenses general contractors in Alabama?',
        a: 'The Alabama Licensing Board for General Contractors licenses contractors on projects of $100,000 or more, mainly commercial work. Home builders and remodelers are licensed by the Home Builders Licensure Board instead.',
      },
    ],
    sources: [
      { label: 'Alabama Home Builders Licensure Board: Licensee Search', url: 'https://hblb.alabama.gov/?p=1515' },
      {
        label: 'Alabama Home Builders Licensure Board: How do I obtain a Home Builder’s License?',
        url: 'https://hblb.alabama.gov/faq/how-do-i-obtain-a-home-builders-license/',
      },
      {
        label: 'Alabama Home Builders Licensure Board: law effective October 1, 2025',
        url: 'https://hblb.alabama.gov/wp-content/uploads/2025/10/HBLB-Law-Effective-October-1-2025.pdf',
      },
      {
        label: 'Alabama Home Builders Licensure Board: Recovery Fund payment increase',
        url: 'https://hblb.alabama.gov/home-builders-licensure-board-increases-potential-recovery-fund-payments-to-homeowners/',
      },
      {
        label: 'Alabama Licensing Board for General Contractors: changes under Act 2024-277',
        url: 'https://genconbd.alabama.gov/14104/changes-to-the-alabama-licensing-board-for-general-contractors-section-of-the-code-of-alabama/',
      },
      { label: 'Alabama Licensing Board for General Contractors: search', url: 'https://genconbd.alabama.gov/search/' },
      {
        label: 'Alabama Attorney General, Department of Insurance and Home Builders Licensure Board: home repair fraud warning',
        url: 'https://alabamaag.gov/wp-content/uploads/2023/05/AG-AL-Dept-of-Insurance-and-Alabama-Home-Builders-Licensure-Board-Warn-of-Potential-Home-Repair-Fraud.pdf',
      },
      { label: 'Alabama Electrical Contractors Board: Consumers', url: 'https://aecb.alabama.gov/consumers/' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'louisiana',
    code: 'LA',
    name: 'Louisiana',
    generalContractors: 'state',
    short: 'One state board licenses or registers contractors, with a dollar limit for each credential.',
    summary:
      'The Louisiana State Licensing Board for Contractors (LSLBC) issues commercial, residential and mold remediation licenses and home improvement registrations. Which one a contractor needs depends on the type of work and its cost, and since January 1, 2026, roof work on a home of $7,500 or more needs a residential roofing or residential construction classification.',
    boards: [
      {
        name: 'Louisiana State Licensing Board for Contractors (LSLBC)',
        licenses:
          'Commercial, residential and mold remediation licenses, home improvement registrations, and classifications such as residential roofing, electrical, mechanical and plumbing',
        lookupUrl: 'https://lslbc.gov/verify-licensure/',
        lookupNote:
          'Open the contractor search from this page and fill in at least one field, such as name, license number, city or parish. Only current licenses and registrations appear.',
        website: 'https://lslbc.gov/',
      },
    ],
    whenRequired: [
      'Home improvement work on an existing home that costs more than $7,500 needs at least an LSLBC home improvement registration.',
      'Residential construction of $50,000 or more, counting labor and materials, needs an LSLBC residential license. The limit used to be $75,000, so older guides may show that figure.',
      'Since January 1, 2026, roof work on a home valued at $7,500 or more needs the Residential Roofing or Residential Construction classification.',
      'Commercial projects of $50,000 or more need a commercial license, and commercial electrical, mechanical or plumbing work over $10,000 needs that classification.',
    ],
    howToCheck: [
      'Ask for the exact business name and the LSLBC license or registration number.',
      'Open the LSLBC contractor search and enter the name or number.',
      'Confirm the record is current and the name matches your contract.',
      'Check that the credential fits the job and its cost: a home improvement registration, a residential license or residential roofing.',
      'If the contractor doesn’t appear, treat them as not currently licensed and contact the LSLBC before you sign or pay.',
    ],
    watchFor: [
      'After a storm, check that a roofer holds the Residential Roofing or Residential Construction classification. A home improvement registration alone isn’t enough for roof work of $7,500 or more.',
      'A home improvement registration isn’t a residential license. For a job of $50,000 or more, the contractor needs the full residential license.',
    ],
    faq: [
      {
        q: 'Do I need a licensed contractor for a remodel in Louisiana?',
        a: 'If the job costs more than $7,500, the contractor needs at least an LSLBC home improvement registration. Jobs of $50,000 or more need an LSLBC residential license.',
      },
      {
        q: 'What is a Louisiana home improvement registration?',
        a: 'It’s an LSLBC credential for work on existing homes that costs more than $7,500 but less than the residential license limit. It isn’t a full residential license.',
      },
      {
        q: 'Does a roofer need a license in Louisiana?',
        a: 'Yes, for roof work on a home valued at $7,500 or more. Since January 1, 2026, the contractor must hold the LSLBC Residential Roofing or Residential Construction classification.',
      },
      {
        q: 'Why can’t I find my contractor in the LSLBC search?',
        a: 'The search shows only contractors who are currently licensed or registered. Try fewer letters of the name or search by license number, and contact the LSLBC if you still can’t find them.',
      },
    ],
    sources: [
      { label: 'LSLBC: Verify Licensure', url: 'https://lslbc.gov/verify-licensure/' },
      { label: 'LSLBC: Types of Licenses', url: 'https://lslbc.gov/types-of-licenses/' },
      {
        label: 'LSLBC: Residential Construction classification',
        url: 'https://lslbc.gov/classifications_list/residential-construction/',
      },
      { label: 'LSLBC: residential roofing memo', url: 'https://lslbc.gov/wp-content/uploads/Residential_Roofing_Memo_1282025.pdf' },
      { label: 'La. R.S. 37:2156.4 (residential roofing)', url: 'https://legis.la.gov/Legis/Law.aspx?d=1431142' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'kentucky',
    code: 'KY',
    name: 'Kentucky',
    generalContractors: 'local-only',
    short: 'Kentucky licenses electricians, plumbers and HVAC, but not general contractors.',
    summary:
      'Kentucky’s Department of Housing, Buildings and Construction (DHBC) licenses electrical, plumbing, HVAC, boiler and fire protection trades, but the state doesn’t license general contractors. Some local governments do: Louisville Metro issues building contractor licenses, and Lexington-Fayette requires contractors to register before they get permits.',
    boards: [
      {
        name: 'Kentucky Department of Housing, Buildings and Construction (DHBC)',
        licenses:
          'Electrical contractors and electricians, master and journeyman plumbers, HVAC contractors and journeymen, boiler contractors, and fire sprinkler and fire alarm contractors',
        lookupUrl: 'https://dhbc.ky.gov/Search/HBC_List_Licensees.aspx',
        lookupNote: 'Search by trade, license type, name, license number or status.',
        website: 'https://dhbc.ky.gov/',
      },
      {
        name: 'Louisville Metro Construction Review',
        licenses: 'Building contractors (Metro Building A and B licenses) and Metro trade licenses, such as electrical, HVAC and fire suppression, in Louisville Metro',
        lookupUrl: 'https://louisvilleky.gov/government/construction-review/online-permitting-portal',
        lookupNote:
          'Open the Louisville Metro Business Portal from this page, choose Advanced Search, then Search for a License, and enter the business name. No account is needed.',
        website: 'https://louisvilleky.gov/government/construction-review/contractor-licenses',
      },
    ],
    whenRequired: [
      'Kentucky has no state license for general contractors or remodelers, but the work may still need state or local permits.',
      'Electrical, plumbing and HVAC work needs a DHBC license. Plumbing must be done by a licensed master or journeyman plumber, and an electrical contractor must have a licensed master electrician tied to its license.',
      'In Louisville Metro, only licensed contractors or property owners can get building permits, and electrical, HVAC, plumbing and fire sprinkler contractors must also show a state license.',
      'In Lexington-Fayette, every contractor who gets a building permit must first register with the Division of Building Inspection.',
    ],
    howToCheck: [
      'Ask for the exact business name and, for trade work, the state license number.',
      'For electrical, plumbing or HVAC work, search the DHBC licensee search and confirm the license is active for that trade.',
      'In Louisville, look up the contractor’s Metro license in the Louisville Metro Business Portal. In Lexington, ask the Division of Building Inspection to confirm the registration.',
      'Elsewhere in Kentucky, ask your city or county building office whether contractors must be licensed or registered there.',
      'Ask for proof of liability and workers’ compensation insurance, and make sure the contractor gets any required permit.',
    ],
    watchFor: [
      'A contractor may not offer to pay or rebate your insurance deductible to win a residential roof job.',
      'After storms, the Attorney General warns about out-of-town contractors who go door to door. You generally have three business days to cancel a door-to-door sale of $25 or more, and you must cancel in writing.',
    ],
    faq: [
      {
        q: 'Does Kentucky require a general contractor license?',
        a: 'No. The state doesn’t license general contractors, but some local governments do: Louisville Metro issues Metro building licenses, and Lexington-Fayette requires contractors to register.',
      },
      {
        q: 'How do I check an electrician, plumber or HVAC contractor in Kentucky?',
        a: 'Use the DHBC licensee search at dhbc.ky.gov. Search by name or license number and confirm the license is active for the right trade.',
      },
      {
        q: 'Do roofers need a license in Kentucky?',
        a: 'The state doesn’t license roofers, so check with your city or county. State law does bar a roofer from offering to pay or rebate your insurance deductible on a residential roof job.',
      },
      {
        q: 'Can I cancel a contract with a door-to-door contractor in Kentucky?',
        a: 'Generally, yes. The Attorney General says you have three business days to cancel a door-to-door sale of $25 or more. Some exceptions apply, and you must cancel in writing.',
      },
    ],
    sources: [
      { label: 'Kentucky DHBC: licensee search', url: 'https://dhbc.ky.gov/Search/HBC_List_Licensees.aspx' },
      {
        label: 'Kentucky DHBC: plan submission guide (no state license for general construction)',
        url: 'https://dhbc.ky.gov/Documents/KHBC_Plan%20Submission%20Application%20Guide%2025-0418.pdf',
      },
      { label: 'Kentucky DHBC: Division of Plumbing', url: 'https://dhbc.ky.gov/newstatic_info.aspx?static_id=337' },
      {
        label: 'Louisville Metro Construction Review: contractor licenses',
        url: 'https://louisvilleky.gov/government/construction-review/contractor-licenses',
      },
      {
        label: 'Lexington-Fayette Division of Building Inspection',
        url: 'https://www.lexingtonky.gov/government/departments-programs/environmental-quality-public-works/building-inspection',
      },
      { label: 'KRS 367.628 (residential roof contracts)', url: 'https://apps.legislature.ky.gov/law/Statutes/statute.aspx?id=56109' },
      {
        label: 'Kentucky Attorney General: home repair and improvement',
        url: 'https://www.ag.ky.gov/Resources/Consumer-Resources/Consumers/home/Pages/home-improvement.aspx',
      },
      {
        label: 'Kentucky Attorney General: natural disaster scams',
        url: 'https://www.ag.ky.gov/Resources/Consumer-Resources/Pages/Natural-Disaster-Scams.aspx',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'oregon',
    code: 'OR',
    name: 'Oregon',
    generalContractors: 'state',
    short: 'The CCB licenses all paid home construction; electrical and plumbing need a BCD license too.',
    summary:
      'The Oregon Construction Contractors Board (CCB) licenses anyone paid to build, remodel or repair a home, and electrical and plumbing contractors also need a license from the Building Codes Division (BCD). Check that the CCB license is active and has a residential endorsement, because the contractor’s bond can help you recover money in a dispute.',
    boards: [
      {
        name: 'Oregon Construction Contractors Board (CCB)',
        licenses: 'All paid construction work on homes, including general contractors, remodelers, roofers, HVAC installers, painters and handymen',
        lookupUrl: 'https://search.ccb.state.or.us/search/',
        lookupNote:
          'Searching by CCB license number gives the most accurate result. Open the record to see its status, endorsement, bond history and complaints.',
        website: 'https://www.oregon.gov/ccb/pages/default.aspx',
      },
      {
        name: 'Oregon Building Codes Division (BCD)',
        licenses: 'Electrical and plumbing contractors, individual electricians and plumbers, and boiler licenses',
        lookupUrl: 'https://www.oregon.gov/bcd/licensing/pages/index.aspx',
        lookupNote: 'Use the license holder search linked from this page.',
        website: 'https://www.oregon.gov/bcd',
      },
    ],
    whenRequired: [
      'Anyone paid to build, remodel or repair a home needs an active CCB license. That includes roofing, siding, painting, carpentry, HVAC, plumbing and electrical work.',
      'Electrical and plumbing contractors also need a BCD electrical or plumbing contractor license.',
      'A handyman needs a CCB license for work of $1,000 or more, or if they advertise at all, even with business cards. Small casual jobs that need no permit can be exempt.',
      'A residential general contractor must carry a $25,000 bond and $500,000 per occurrence in liability insurance.',
    ],
    howToCheck: [
      'Ask the contractor for their CCB license number.',
      'Search the number in the CCB license search, and confirm the license is active and the name matches the business you’re hiring.',
      'Check that the license has a residential endorsement, which a contractor needs to work on homes.',
      'Open the record to review bond history, complaints and disciplinary history.',
      'For electrical or plumbing work, also look up the business in the BCD license holder search.',
    ],
    watchFor: [
      'For home jobs over $2,000, the contractor must use a written contract and give you three notices: the Consumer Protection Notice, the Notice of Procedure and the Information Notice to Owner About Construction Liens.',
      'To claim against a contractor’s bond for work on an existing home, mail a pre-complaint notice by certified mail and file a CCB complaint within one year after the work was substantially complete. The CCB can’t accept the complaint until 30 days after you mail the notice.',
    ],
    faq: [
      {
        q: 'Does a handyman need a license in Oregon?',
        a: 'Usually, yes. A handyman needs a CCB license for work of $1,000 or more, or if they advertise at all. Small casual jobs under $1,000 that need no permit can be exempt.',
      },
      {
        q: 'Do electricians and plumbers need a separate license in Oregon?',
        a: 'Yes. Electrical and plumbing contractors need both a CCB license and a BCD electrical or plumbing contractor license, so check both before you hire.',
      },
      {
        q: 'What happens if I hire an unlicensed contractor in Oregon?',
        a: 'You can’t recover damages through a contractor’s bond, and the CCB can’t help you resolve the dispute.',
      },
      {
        q: 'How much is an Oregon contractor’s bond?',
        a: 'A residential general contractor needs a $25,000 bond, a residential specialty contractor $20,000 and a residential limited contractor $15,000. To collect from a bond, you need an active CCB complaint and a court judgment or arbitration award.',
      },
    ],
    sources: [
      { label: 'Oregon CCB: CCB license', url: 'https://www.oregon.gov/ccb/pages/ccb%20license.aspx' },
      { label: 'Oregon CCB: license search', url: 'https://search.ccb.state.or.us/search/' },
      { label: 'Oregon CCB: license endorsement chart (11/2024)', url: 'https://www.oregon.gov/ccb/Documents/Endorsement%20Chart.pdf' },
      { label: 'Oregon CCB: consumer protection', url: 'https://www.oregon.gov/ccb/pages/consumer%20protection.aspx' },
      {
        label: 'Oregon CCB: required notices for residential construction projects',
        url: 'https://www.oregon.gov/ccb/Documents/Notices-Chart.pdf',
      },
      {
        label: 'Oregon CCB: why hire licensed contractors',
        url: 'https://www.oregon.gov/ccb/Documents/Realtors%20guide%20to%20working%20with%20contractors.pdf',
      },
      { label: 'Oregon BCD: getting licensed work', url: 'https://www.oregon.gov/bcd/lbdd/pages/licensed-work.aspx' },
      { label: 'ORS Chapter 701 (construction contractors)', url: 'https://www.oregonlegislature.gov/bills_laws/ors/ors701.html' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'oklahoma',
    code: 'OK',
    name: 'Oklahoma',
    generalContractors: 'local-only',
    short: 'Oklahoma licenses trades and registers roofers, but not general contractors.',
    summary:
      'Oklahoma’s Construction Industries Board (CIB) licenses electrical, plumbing and mechanical (HVAC) contractors and registers roofers, but the state doesn’t license general contractors. Cities can add their own rules, and Oklahoma City requires contractors to register before they can buy permits.',
    boards: [
      {
        name: 'Oklahoma Construction Industries Board (CIB)',
        licenses: 'Electrical, plumbing and mechanical (HVAC) licenses, roofing contractor registrations, and building and home inspector licenses',
        lookupUrl: 'https://cib.ok.gov/are-they-licensed',
        lookupNote:
          'Choose Roofing or all other industries. Roofers are in a separate roofing registration search; electrical, plumbing and mechanical licenses are in the other.',
        website: 'https://cib.ok.gov/',
      },
      {
        name: 'City of Oklahoma City: contractor registration',
        licenses: 'Building and trade contractors who buy permits in Oklahoma City',
        lookupUrl: 'https://access.okc.gov/aca/Cap/CapHome.aspx?module=Licenses&TabName=HOME',
        lookupNote: 'Search by license number, which gives the most accurate results, or by site address. No account is needed.',
        website: 'https://www.okc.gov/Infrastructure-Development/Business-Licensing/Contractor-Registration',
      },
    ],
    whenRequired: [
      'Oklahoma has no state license for general contractors, but trade work still needs a state license or registration.',
      'Electrical, plumbing and mechanical (HVAC) contractors need a CIB license, and active contractors must carry a $5,000 surety bond and at least $50,000 in general liability insurance.',
      'Roofing contractors must register with the CIB, and commercial roofing also needs a commercial endorsement. Owners who roof their own homes are exempt. The CIB says a residential roofing endorsement becomes mandatory on January 1, 2028.',
      'In Oklahoma City, anyone contracting for work that needs a building permit must register with the city, and trade and re-roofing permits go only to contractors with both a state license or registration and a city registration.',
    ],
    howToCheck: [
      'Ask for the contractor’s name and CIB license or roofing registration number.',
      'On the CIB’s “Are They Licensed?” page, choose Roofing or all other industries.',
      'For a roofer, look for “In Good Standing”; “Pending” means the roofer isn’t registered yet. For other trades, confirm the license is current and fits the job.',
      'In Oklahoma City, also check the contractor’s city registration. Elsewhere, ask your local building department.',
      'Make sure the contractor gets any required permit before work starts.',
    ],
    watchFor: [
      'If insurance is paying for your roof, you can cancel the contract within 72 hours after your insurer tells you in writing that all or part of the claim is denied. Cancel in writing to the address in the contract; the roofer must refund your payments, except for emergency work already done.',
      'If a roofer’s registration stops being in good standing, the roofer must tell you, and you can then cancel the contract.',
    ],
    faq: [
      {
        q: 'Does Oklahoma require a general contractor license?',
        a: 'No. The Construction Industries Board says general contractors don’t currently need a state license. Cities can have their own rules, and Oklahoma City requires building contractors to register.',
      },
      {
        q: 'Do roofers need a license in Oklahoma?',
        a: 'Roofers must register with the Construction Industries Board, and commercial roofing also needs a commercial endorsement. The CIB says residential roofing will need a residential endorsement starting January 1, 2028.',
      },
      {
        q: 'How do I check an electrician, plumber or HVAC contractor in Oklahoma?',
        a: 'Go to the CIB’s “Are They Licensed?” page and choose all other industries. Search by name or license number and confirm the license is current.',
      },
      {
        q: 'Can I cancel a roofing contract if my insurance claim is denied?',
        a: 'Yes. Under the Roofing Contractor Registration Act, you can cancel in writing within 72 hours after your insurer’s written notice that all or part of the claim is denied.',
      },
    ],
    sources: [
      { label: 'Oklahoma CIB: Are They Licensed?', url: 'https://cib.ok.gov/are-they-licensed' },
      { label: 'Oklahoma CIB: FAQs (no state general contractor license)', url: 'https://cib.ok.gov/faqs' },
      { label: 'Oklahoma CIB: roofing registration search', url: 'https://verifyroofing.cib.ok.gov/' },
      {
        label: 'Oklahoma CIB: new residential roofing endorsement',
        url: 'https://oklahoma.gov/cib/news/new-residential-roofing-endorsement-required-by-house-bill-1628.html',
      },
      {
        label: 'Roofing Contractor Registration Act (59 O.S. § 1151 and following)',
        url: 'https://oklahoma.gov/content/dam/ok/en/cib/documents/your-industry/roofing-industry/title_59_roofing_contractor_registration_act.pdf',
      },
      {
        label: 'Oklahoma CIB: active contractor requirements',
        url: 'https://oklahoma.gov/cib/your-industry/active-contractor-requirements.html',
      },
      {
        label: 'City of Oklahoma City: contractor registration',
        url: 'https://www.okc.gov/Infrastructure-Development/Business-Licensing/Contractor-Registration',
      },
      {
        label: 'City of Oklahoma City: license search',
        url: 'https://access.okc.gov/aca/Cap/CapHome.aspx?module=Licenses&TabName=HOME',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'utah',
    code: 'UT',
    name: 'Utah',
    generalContractors: 'state',
    short: 'Utah’s DOPL licenses contractors and trades; small handyman jobs under $7,000 are exempt.',
    summary:
      'Utah’s Division of Professional Licensing (DOPL) licenses general contractors, specialty contractors such as roofers, and electrical, plumbing and HVAC contractors. An unlicensed handyman may do small repair and remodeling jobs under $7,000, but plumbing, electrical and HVAC system work needs a licensed contractor.',
    boards: [
      {
        name: 'Utah Division of Professional Licensing (DOPL)',
        licenses:
          'General contractors (B100 general building, R100 residential and small commercial, E100 general engineering), specialty contractors such as S280 roofing, and electrical, plumbing and HVAC contractors',
        lookupUrl: 'https://secure.utah.gov/llv/search/index.html',
        lookupNote: 'Search by name and profession, or by license number, and check that the status says Active.',
        website: 'https://commerce.utah.gov/dopl/',
      },
    ],
    whenRequired: [
      'Construction and remodeling work generally needs a DOPL contractor license in the right classification. The R100 residential license doesn’t cover plumbing, electrical or HVAC work.',
      'Repair and remodeling jobs under $7,000 in total value, counting labor, materials and later changes, are exempt. The limit used to be $3,000, so guides that cite $3,000 are out of date.',
      'A handyman doing an exempt job worth more than $3,000 must file an affirmation with DOPL and carry liability insurance.',
      'The handyman exemption doesn’t cover HVAC work, or plumbing and electrical work beyond limited minor repairs.',
    ],
    howToCheck: [
      'Ask for the contractor’s business name and DOPL license number.',
      'Search DOPL’s licensee lookup by name and profession, or by license number.',
      'Confirm the license is Active and fits your job, such as R100 for home building or remodeling, E200 or E201 for electrical, P200 or P201 for plumbing, H100 for HVAC, or S280 for roofing.',
      'If an unlicensed handyman quotes a job over $3,000, ask for proof of their DOPL handyman affirmation and liability insurance.',
      'Before work starts, ask for proof of liability and workers’ compensation insurance and get a written contract.',
    ],
    watchFor: [
      'DOPL announced in June 2026 that the Residence Lien Recovery Fund is depleted and can’t pay new claims. If you paid a licensed contractor in full under a written contract and a subcontractor or supplier files a lien on your single-family home or duplex, you can still apply to DOPL for a Certificate of Compliance within 30 days of being served, and the lienholder must then remove the lien.',
      'DOPL offers an optional Residential Construction Agreement with sections for plans, change orders and proof of license and insurance. DOPL can’t enforce it, so read the terms carefully before you sign.',
    ],
    faq: [
      {
        q: 'Does a handyman need a license in Utah?',
        a: 'Not for repair or remodeling jobs under $7,000 in total, including labor and materials. For jobs over $3,000, the handyman must file an affirmation with DOPL and carry liability insurance. Plumbing, electrical and HVAC system work still needs a licensed contractor.',
      },
      {
        q: 'How do I look up a contractor license in Utah?',
        a: 'Use DOPL’s licensee lookup at secure.utah.gov. Search by name and profession or by license number, and make sure the status is Active.',
      },
      {
        q: 'Can I still get money from Utah’s Residence Lien Recovery Fund?',
        a: 'No. DOPL says the fund is depleted and can’t pay new claims. If you paid a licensed contractor in full under a written contract, you can still apply for a Certificate of Compliance to have a subcontractor’s lien removed.',
      },
      {
        q: 'Who licenses electricians and plumbers in Utah?',
        a: 'DOPL licenses electrical and plumbing contractors. The person who qualifies the business must hold a master license in that trade.',
      },
    ],
    sources: [
      { label: 'Utah DOPL: licensee lookup', url: 'https://secure.utah.gov/llv/search/index.html' },
      {
        label: 'Utah Code § 58-55-305 (exemptions from licensure)',
        url: 'https://le.utah.gov/xcode/Title58/Chapter55/C58-55-S305_2025050720250507.html',
      },
      { label: 'Utah DOPL: handyman exemption', url: 'https://commerce.utah.gov/dopl/handyman/' },
      {
        label: 'Utah DOPL: general contractor classifications',
        url: 'https://commerce.utah.gov/dopl/contracting/apply-for-a-license/general-contractor/',
      },
      {
        label: 'Utah Admin. Code R156-55a (Construction Trades Licensing Act Rule)',
        url: 'https://adminrules.utah.gov/public/rule/R156-55a/Current%20Rules',
      },
      {
        label: 'Utah Department of Commerce: Residence Lien Recovery Fund is depleted (June 2026)',
        url: 'https://commerce.utah.gov/2026/06/11/utahs-residence-lien-recovery-fund-is-officially-depleted-what-now/',
      },
      {
        label: 'Utah DOPL: Residential Construction Agreement',
        url: 'https://commerce.utah.gov/dopl/contracting/construction-contract/',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'nevada',
    code: 'NV',
    name: 'Nevada',
    generalContractors: 'state',
    short: 'The Nevada State Contractors Board licenses general and trade contractors statewide.',
    summary:
      'The Nevada State Contractors Board (NSCB) licenses general and specialty contractors statewide, including electrical, plumbing, HVAC and roofing contractors. Check that the license is active and that its classification and monetary limit fit your job, because only owners who hire licensed contractors can use the Residential Recovery Fund.',
    boards: [
      {
        name: 'Nevada State Contractors Board (NSCB)',
        licenses:
          'General engineering (A), general building (B) and specialty (C) contractors, including C-1 plumbing and heating, C-2 electrical, C-21 refrigeration and air conditioning, and C-15 roofing and siding',
        lookupUrl: 'https://app.nvcontractorsboard.com/Clients/NVSCB/Public/ContractorLicenseSearch/ContractorLicenseSearch.aspx',
        lookupNote:
          'Search by license number, which works best, by company name, or by the name of an owner or qualified individual. Past discipline is in a separate search linked from the board’s website.',
        website: 'https://www.nvcontractorsboard.com/',
      },
    ],
    whenRequired: [
      'A contractor generally needs an NSCB license to bid on or do construction work, including electrical, plumbing, HVAC and roofing.',
      'Repair or maintenance jobs under $1,000, including labor and materials, are exempt only if no building permit is needed and the work isn’t plumbing, electrical, refrigeration, heating or air conditioning.',
      'The exemption doesn’t apply to work that’s part of a larger project, or to a job split into smaller contracts to stay under the limit.',
      'Each license has a classification and a monetary limit: the largest contract the contractor may take for one client at one site.',
    ],
    howToCheck: [
      'Ask the contractor for their Nevada license number.',
      'Search the NSCB license search by license number, which the board says works best, or by company name.',
      'Confirm the license is Active and its classification matches your job, such as C-2 for electrical or C-15 for roofing.',
      'Make sure your contract price is within the license’s monetary limit.',
      'Review any past discipline in the NSCB’s disciplinary and board actions search.',
    ],
    watchFor: [
      'The Residential Recovery Fund can pay up to $40,000 per claim to owners of owner-occupied single-family homes harmed by a licensed contractor. You must file within four years after the work was completed, and the fund doesn’t cover homeowners who hired unlicensed contractors.',
      'The Recovery Fund doesn’t pay court costs or legal fees, money you collect from other sources is subtracted, and full payment isn’t guaranteed.',
    ],
    faq: [
      {
        q: 'Does a handyman need a license in Nevada?',
        a: 'Not for small repair or maintenance jobs under $1,000 in labor and materials, as long as no building permit is needed, the work isn’t plumbing, electrical, refrigeration, heating or air conditioning, and it isn’t part of a larger project.',
      },
      {
        q: 'What is the Nevada Residential Recovery Fund?',
        a: 'It’s a board fund that can pay up to $40,000 per claim to owners of owner-occupied single-family homes harmed by a licensed contractor. Claims are due within four years after the work was completed.',
      },
      {
        q: 'Who licenses electricians and plumbers in Nevada?',
        a: 'The Nevada State Contractors Board licenses electrical contractors (C-2) and plumbing and heating contractors (C-1). Check that the license classification matches the work you need.',
      },
      {
        q: 'What is a monetary limit on a Nevada contractor license?',
        a: 'The board sets a monetary limit on each license based on the contractor’s finances. It’s the largest contract the contractor may take for one client at one site, so make sure your job fits within it.',
      },
    ],
    sources: [
      {
        label: 'NSCB: license search',
        url: 'https://app.nvcontractorsboard.com/Clients/NVSCB/Public/ContractorLicenseSearch/ContractorLicenseSearch.aspx',
      },
      {
        label: 'NSCB: disciplinary and board actions search',
        url: 'https://app.nvcontractorsboard.com/Clients/NVSCB/Public/DisciplineSearch/DisciplineSearchPage.aspx',
      },
      { label: 'NSCB: exemptions', url: 'https://www.nvcontractorsboard.com/licensing/exemptions/' },
      { label: 'NSCB: handyman exemptions', url: 'https://www.nvcontractorsboard.com/resources/handyman-exemptions/' },
      {
        label: 'NSCB: Residential Recovery Fund overview',
        url: 'https://www.nvcontractorsboard.com/resources/residential-recovery-fund/residential-recovery-fund-overview/',
      },
      { label: 'NSCB: consumer checklist', url: 'https://www.nvcontractorsboard.com/resources/consumer-checklist/' },
      { label: 'NRS Chapter 624 (contractors)', url: 'https://www.leg.state.nv.us/nrs/nrs-624.html' },
      { label: 'NAC Chapter 624 (contractors)', url: 'https://www.leg.state.nv.us/nac/nac-624.html' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'arkansas',
    code: 'AR',
    name: 'Arkansas',
    generalContractors: 'state',
    short: 'Arkansas licenses home contractors on jobs over $2,000; trades are licensed separately.',
    summary:
      'The Arkansas Contractors Licensing Board licenses residential builders, remodelers and home improvement specialty contractors for home jobs over $2,000, and commercial contractors for projects of $50,000 or more. The Department of Health licenses plumbers, and the Department of Labor and Licensing licenses electricians and HVAC/R contractors.',
    boards: [
      {
        name: 'Arkansas Contractors Licensing Board',
        licenses: 'Commercial contractors, residential builders, residential remodelers and home improvement specialty contractors (it licenses businesses, not individual workers)',
        lookupUrl: 'https://labor.arkansas.gov/licensing/arkansas-contractors-licensing-board/find-a-licensed-contractor/',
        lookupNote: 'If the search on this page isn’t working, contact the board through its website to confirm a license.',
        website: 'https://labor.arkansas.gov/licensing/arkansas-contractors-licensing-board/',
      },
      {
        name: 'Arkansas Department of Health: Plumbing and Natural Gas',
        licenses: 'Master, journeyman and apprentice plumbers, and natural gas licensees',
        lookupUrl: 'https://adhplumbinghvacrlookup.arkansas.gov/',
        lookupNote: 'Results show the license type, number and expiration date. A license expired for more than 30 days is inactive.',
        website:
          'https://healthy.arkansas.gov/programs-services/licensing-military-member-licensure-permits-plan-reviews/plumbing-natural-gas-health-code/',
      },
      {
        name: 'Arkansas State Board of Electrical Examiners',
        licenses: 'Electricians',
        lookupUrl: 'https://labor.arkansas.gov/licensing/board-of-electrical-examiners/state-board-of-electrical-examiners-roster/',
        lookupNote: 'Filter by license status. If the exported report is blank, the search found more than 3,000 records, so narrow it.',
        website: 'https://labor.arkansas.gov/labor/code-enforcement/electrical-inspection-and-licensing/',
      },
      {
        name: 'Arkansas Department of Labor and Licensing: HVAC/R',
        licenses: 'Heating, ventilation, air conditioning and refrigeration contractors (Class A, B, D and E) and registrants who work under them',
        lookupUrl: 'https://labor.arkansas.gov/resources/rosters/',
        lookupNote: 'Choose HVAC/R from the list of licensing agencies.',
        website: 'https://labor.arkansas.gov/labor/code-enforcement/hvac-r/',
      },
    ],
    whenRequired: [
      'Work on a home of one to four units that costs more than $2,000, including labor and materials, needs a residential builder, residential remodeler or home improvement specialty license.',
      'Jobs of $2,000 or less are exempt, but splitting one job into smaller contracts to stay under $2,000 isn’t allowed.',
      'Projects of $50,000 or more that aren’t single-family homes, including buildings with five or more units, need a commercial license.',
      'Plumbing work needs a Department of Health license, and electrical and HVAC/R work need licenses from the Department of Labor and Licensing.',
    ],
    howToCheck: [
      'Ask for the contractor’s exact business name and license number.',
      'Search the Contractors Licensing Board’s Find A Licensed Contractor page, or contact the board if the search is down.',
      'Check that the license type fits your job: residential builder, residential remodeler, home improvement specialty or commercial.',
      'Check plumbers in the Department of Health lookup, and electricians and HVAC/R contractors in the Department of Labor and Licensing rosters.',
      'Report problems with a contractor to the Contractors Licensing Board using its complaint form.',
    ],
    watchFor: [
      'A limited residential license covers only projects under $50,000, so make sure the contractor’s license fits the size of your job.',
      'A home improvement specialty license covers a single trade, such as painting, windows or flooring. It doesn’t allow the holder to build or remodel a home.',
    ],
    faq: [
      {
        q: 'Do I need a licensed contractor for a small home job in Arkansas?',
        a: 'Yes, if the job costs more than $2,000, including labor and materials. Jobs of $2,000 or less are exempt, but a contractor can’t split one job into smaller contracts to avoid the rule.',
      },
      {
        q: 'How do I check a contractor’s license in Arkansas?',
        a: 'Use the Contractors Licensing Board’s Find A Licensed Contractor page on the Department of Labor and Licensing website. If the search isn’t working, contact the board directly.',
      },
      {
        q: 'Who licenses plumbers in Arkansas?',
        a: 'The Arkansas Department of Health licenses plumbers. Its online lookup shows each plumber’s license type, number and expiration date.',
      },
      {
        q: 'Who licenses electricians and HVAC contractors in Arkansas?',
        a: 'The Department of Labor and Licensing licenses electricians through the State Board of Electrical Examiners and HVAC/R contractors through its HVAC/R program. Each has its own online roster.',
      },
    ],
    sources: [
      {
        label: 'Arkansas Contractors Licensing Board: apply for a license (license types and limits)',
        url: 'https://labor.arkansas.gov/licensing/arkansas-contractors-licensing-board/apply-for-contractors-license-registration/',
      },
      {
        label: 'Arkansas Contractors Licensing Board: Find A Licensed Contractor',
        url: 'https://labor.arkansas.gov/licensing/arkansas-contractors-licensing-board/find-a-licensed-contractor/',
      },
      {
        label: 'Arkansas residential contractors licensing law and rules (revised July 2025)',
        url: 'https://labor.arkansas.gov/wp-content/uploads/Residential-Law-revised-July-2025.pdf',
      },
      {
        label: 'Arkansas commercial contractors licensing law and rules (revised July 2025)',
        url: 'https://labor.arkansas.gov/wp-content/uploads/Commercial-Contractors-Law-revised-July-25.pdf',
      },
      {
        label: 'Arkansas Department of Health: Plumbing and Natural Gas',
        url: 'https://healthy.arkansas.gov/programs-services/licensing-military-member-licensure-permits-plan-reviews/plumbing-natural-gas-health-code/',
      },
      { label: 'Arkansas Department of Labor and Licensing: roster searches', url: 'https://labor.arkansas.gov/resources/rosters/' },
      {
        label: 'Arkansas Attorney General: home improvements',
        url: 'https://arkansasag.gov/divisions/public-protection/homes/home-improvements/',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'kansas',
    code: 'KS',
    name: 'Kansas',
    generalContractors: 'local-only',
    short: 'Kansas has no statewide contractor license; roofers register with the Attorney General.',
    summary:
      'Kansas doesn’t issue a statewide general contractor license, so cities and counties set their own licensing rules, including for trades such as electrical and plumbing. Roofing is the exception: most roofers must register with the Kansas Attorney General, and you can check them in its online directory.',
    boards: [
      {
        name: 'Kansas Attorney General: roofing registration',
        licenses: 'Residential and commercial roofing contractors, under the Kansas Roofing Contractor Registration Act',
        lookupUrl: 'https://www.ag.ks.gov/divisions/public-protection/resources/roofing-registration-directory',
        lookupNote:
          'Search by company details, or leave the fields blank to list every registered roofer. Look for “In Good Standing”. “Exempt” means a general contractor that told the office it meets the legal exemption.',
        website: 'https://www.ag.ks.gov/divisions/civil/licensing-inspections/roofing-registration',
      },
      {
        name: 'Johnson County Contractor Licensing',
        licenses:
          'General, residential and trade contractors, including electrical, mechanical, plumbing and roofing, in unincorporated Johnson County and participating cities such as Overland Park, Olathe, Lenexa and Shawnee',
        lookupUrl: 'https://cls.jocogov.org/searchcontractor',
        lookupNote: 'Search by company, by person or by license class.',
        website: 'https://www.jocogov.org/department/contractor-licensing',
      },
      {
        name: 'Metropolitan Area Building and Construction Department (MABCD), Wichita and Sedgwick County',
        licenses:
          'General contractors (Class A, B, C residential and D) and trade contractors such as electrical, plumbing and roofing in Wichita, unincorporated Sedgwick County and contracted small cities',
        lookupUrl: 'https://mabcdportal.sedgwickcounty.org/Views/CDR/CDRLookUpMain.aspx',
        lookupNote: 'Choose Lookup Contractor License, then search by license number or name.',
        website: 'https://www.sedgwickcounty.org/mabcd/contractor-licensing/',
      },
    ],
    whenRequired: [
      'Kansas has no state license for general contractors or remodelers. Cities and counties set their own rules, and some also license electrical, plumbing and HVAC contractors.',
      'Roofing contractors must register with the Attorney General before doing paid residential or commercial roofing anywhere in Kansas.',
      'Owners roofing their own property are exempt from roofing registration, as are jobs under $2,000 in labor and materials by someone who doesn’t advertise as a roofer, and some general contractors that meet criteria in state law.',
      'State roofing registration is in addition to any city or county license, so a roofer in Johnson County or Wichita may need both.',
    ],
    howToCheck: [
      'Ask the contractor which city or county license they hold, and for the license number.',
      'In Johnson County, search the county’s Contractor Licensing portal. In Wichita and Sedgwick County, use the MABCD online lookup.',
      'Anywhere else in Kansas, ask your city or county building department which license is required and how to check it.',
      'For any roofing job, search the Attorney General’s roofing registration directory and confirm the status is “In Good Standing”.',
      'Make sure the contractor, not you, pulls the building permit. The Attorney General warns that a contractor who asks you to pull it may not be registered.',
    ],
    watchFor: [
      'For door-to-door sales of $25 or more, Kansas law lets you cancel until midnight of the third business day after you sign. The seller must tell you about this right.',
      'After storms, the Attorney General warns about unregistered roofers going door to door. Check the roofing directory before you sign anything.',
    ],
    faq: [
      {
        q: 'Does Kansas require a general contractor license?',
        a: 'Not at the state level. Cities and counties set their own contractor licensing rules, so check with the building or licensing office where the work will be done.',
      },
      {
        q: 'How do I check if a roofer is registered in Kansas?',
        a: 'Search the Kansas Attorney General’s roofing registration directory and look for “In Good Standing”. The Attorney General says registration isn’t an endorsement, so still check references and insurance.',
      },
      {
        q: 'How do I look up a contractor license in Wichita or Johnson County?',
        a: 'For Wichita and Sedgwick County, use the MABCD online license lookup. For Johnson County and its participating cities, use the county’s Contractor Licensing search.',
      },
      {
        q: 'Can a general contractor replace my roof without roofing registration?',
        a: 'Some general contractors are exempt if they meet criteria in state law, and they may appear in the directory as “Exempt”. If you’re unsure, ask the contractor for proof of registration or exemption.',
      },
    ],
    sources: [
      {
        label: 'Kansas Attorney General: roofing registration directory',
        url: 'https://www.ag.ks.gov/divisions/public-protection/resources/roofing-registration-directory',
      },
      {
        label: 'Kansas Attorney General: roofing information for consumers',
        url: 'https://www.ag.ks.gov/divisions/civil/licensing-inspections/roofing-registration/roofing-faqs-for-consumers',
      },
      {
        label: 'K.S.A. 50-6,129 (roofing registration exemptions)',
        url: 'https://www.kslegislature.gov/b2025_26/laws/050_000_0000_chapter/050_006_0000_article/050_006_0129_section/050_006_0129_k/',
      },
      { label: 'Kansas Business One Stop: construction starter kit', url: 'https://ksbiz.kansas.gov/business-starter-kit/construction/' },
      { label: 'Johnson County Contractor Licensing', url: 'https://www.jocogov.org/department/contractor-licensing' },
      { label: 'MABCD: contractor licensing (Wichita and Sedgwick County)', url: 'https://www.sedgwickcounty.org/mabcd/contractor-licensing/' },
      { label: 'K.S.A. 50-640 (door-to-door sales cancellation)', url: 'https://ksrevisor.gov/statutes/chapters/ch50/050_006_0040.html' },
      {
        label: 'Kansas Attorney General: your home and car',
        url: 'https://www.ag.ks.gov/divisions/public-protection/consumer-protection/your-home-and-car',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'mississippi',
    code: 'MS',
    name: 'Mississippi',
    generalContractors: 'state',
    short: 'Mississippi’s State Board of Contractors licenses jobs above set dollar amounts.',
    summary:
      'The Mississippi State Board of Contractors (MSBOC) licenses commercial contractors on jobs over $50,000, and residential builders, remodelers and roofers above set amounts. Since July 1, 2022, electrical, plumbing, HVAC and mechanical subcontractors on those home projects also need a state license.',
    boards: [
      {
        name: 'Mississippi State Board of Contractors (MSBOC)',
        licenses:
          'Commercial contractors, residential builders, remodelers and roofers, and residential electrical, plumbing, HVAC and mechanical subcontractors',
        lookupUrl: 'https://search.msboc.us/ConsolidatedSearch.cfm',
        lookupNote:
          'Search by company name, qualifying person’s name or license number. Enter license numbers as digits only, and check that the type (Commercial or Residential), status and classification fit your job.',
        website: 'https://www.msboc.us/',
      },
    ],
    whenRequired: [
      'Building a new home costing more than $50,000 needs a state residential license, such as Residential Builder.',
      'Remodeling, additions or repairs over $10,000, and roofing on a home over $10,000, need a state residential license, such as Residential Remodeler or Residential Roofer.',
      'Since July 1, 2022, electrical, plumbing, HVAC and mechanical subcontractors on those home projects need a state license, however small their part of the job.',
      'Commercial jobs over $50,000 need a commercial license. For work below the state limits, the MSBOC says to check with your city or county.',
    ],
    howToCheck: [
      'Ask for the contractor’s MSBOC license number and the exact company name on the license.',
      'Search the MSBOC database by company name, qualifying person’s name or license number.',
      'Confirm the license is active and its classification covers your job, such as Residential Remodeler, Residential Roofer or Residential Builder.',
      'For electrical, plumbing or HVAC work on a covered home project, check the subcontractor’s own license too.',
      'Check the MSBOC violators list. For jobs under the state limits, ask your city or county building office which license applies.',
    ],
    watchFor: [
      'Don’t pull a permit for work an unlicensed person will do. The MSBOC warns that you take on the contractor’s duties, such as inspections and code compliance, and can be held responsible for bad work.',
      'The MSBOC advises a written contract that lists the contractor’s license number and ties payments to finished work, with final payment only after all liens are released.',
    ],
    faq: [
      {
        q: 'Do I need a licensed contractor to remodel my home in Mississippi?',
        a: 'Yes, if the remodeling, addition or repair costs more than $10,000. The contractor needs a residential license from the Mississippi State Board of Contractors.',
      },
      {
        q: 'How do I look up a Mississippi contractor license?',
        a: 'Use the Mississippi State Board of Contractors’ online search. You can search by company name, qualifying person’s name or license number.',
      },
      {
        q: 'Do electricians and plumbers need a state license in Mississippi?',
        a: 'On a home project that needs a state license, the electrical, plumbing, HVAC and mechanical subcontractors must also be licensed by the MSBOC. Smaller jobs fall under city or county rules.',
      },
      {
        q: 'Can I build my own house in Mississippi without a license?',
        a: 'Yes. Mississippi has a homeowner exemption for building your own home, and since July 1, 2022, it’s limited to one home per calendar year.',
      },
    ],
    sources: [
      { label: 'MSBOC: frequently asked questions', url: 'https://www.msboc.us/general-info/frequently-asked-questions/' },
      { label: 'MSBOC: contractor license search', url: 'https://search.msboc.us/ConsolidatedSearch.cfm' },
      {
        label: 'MSBOC: HB 1163 residential licensing law changes',
        url: 'https://www.msboc.us/wp-content/uploads/2023/01/HB-1163-FACT-SHEET57.pdf',
      },
      { label: 'MSBOC: classifications', url: 'https://www.msboc.us/classifications/' },
      { label: 'MSBOC: hire a contractor', url: 'https://www.msboc.us/consumers/hire-a-contractor/' },
      { label: 'MSBOC: owner risks', url: 'https://www.msboc.us/consumers/owner-risks/' },
      { label: 'MSBOC: violators', url: 'https://www.msboc.us/consumers/violators/' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'hawaii',
    code: 'HI',
    name: 'Hawaii',
    generalContractors: 'state',
    short: 'Hawaii licenses contractors for jobs over $1,500 or any job that needs a permit.',
    summary:
      'Hawaii’s Contractors License Board, part of the Department of Commerce and Consumer Affairs (DCCA), licenses general and specialty contractors, and a separate Board of Electricians and Plumbers licenses individual electricians and plumbers. You need a licensed contractor for any job over $1,500 in labor and materials, or any job that needs a building, electrical or plumbing permit.',
    boards: [
      {
        name: 'Hawaii DCCA: Contractors License Board and Board of Electricians and Plumbers',
        licenses:
          'General engineering (A), general building (B) and specialty (C) contractors, such as C-13 electrical, C-37 plumbing, C-42 roofing and C-52 ventilating and air conditioning, plus individual electricians and plumbers',
        lookupUrl: 'https://mypvl.dcca.hawaii.gov/public-license-search/',
        lookupNote:
          'Search by business or person name, or by license number. Results show status, expiration date and any disciplinary action. For complaint history, also check DCCA’s Business Check.',
        website: 'https://cca.hawaii.gov/pvl/boards/contractor/',
      },
    ],
    whenRequired: [
      'A contractor license is required for any project over $1,500 in labor and materials combined.',
      'Any project that needs a building, electrical or plumbing permit requires a licensed contractor, whatever the price.',
      'The small-job exemption doesn’t cover electrical or plumbing work, work that’s part of a larger project, or a job split into smaller contracts to stay under the limit.',
      'Owners can build or repair their own property under an owner-builder exemption, but generally can’t sell or lease it for one year after it’s finished.',
    ],
    howToCheck: [
      'Search the contractor’s name or license number in DCCA’s public license search.',
      'Confirm the license is current and its classification fits your job, such as C-42 for roofing or C-52 for air conditioning.',
      'For electrical or plumbing work, confirm the business holds a C-13 or C-37 contractor license and the workers hold electrician or plumber licenses.',
      'Check DCCA’s Business Check for complaints and unlicensed-activity investigations.',
      'Get a written contract signed by both sides before work starts.',
    ],
    watchFor: [
      'Hawaii’s Contractors Recovery Fund can repay owners of homes, condos and co-op units harmed by a licensed contractor, up to $12,500 per contract and $25,000 per contractor. You must first win a court judgment and try to collect, and the fund doesn’t cover unlicensed contractors.',
      'A licensed contractor must explain your lien rights and your right to demand bonding, and give you a written contract signed by both sides before work begins.',
    ],
    faq: [
      {
        q: 'Do I need a licensed contractor for a small repair in Hawaii?',
        a: 'Not always. A handyman can do a job under $1,500 in labor and materials if it needs no permit. The exemption doesn’t cover electrical or plumbing work.',
      },
      {
        q: 'How do I look up a contractor’s license in Hawaii?',
        a: 'Use DCCA’s public license search and enter the business name, person’s name or license number. It shows the license status, expiration date and any disciplinary action.',
      },
      {
        q: 'Is an electrician’s license enough to hire someone for electrical work in Hawaii?',
        a: 'No. An electrician or plumber license doesn’t let a person contract for the work. The business also needs a contractor license, such as C-13 electrical or C-37 plumbing.',
      },
      {
        q: 'Where do I file a complaint against a contractor in Hawaii?',
        a: 'File with DCCA’s Regulated Industries Complaints Office (RICO), which handles complaints about licensed contractors and reports of unlicensed activity.',
      },
    ],
    sources: [
      { label: 'Hawaii DCCA: public license search', url: 'https://mypvl.dcca.hawaii.gov/public-license-search/' },
      { label: 'Hawaii DCCA: hire a licensed contractor', url: 'https://cca.hawaii.gov/pvl/hire-a-licensed-contractor/' },
      {
        label: 'HRS § 444-2 (exemptions)',
        url: 'https://www.capitol.hawaii.gov/hrscurrent/vol10_ch0436-0474/HRS0444/HRS_0444-0002.htm',
      },
      {
        label: 'HRS § 444-25.5 (disclosure and contracts)',
        url: 'https://www.capitol.hawaii.gov/hrscurrent/vol10_ch0436-0474/HRS0444/HRS_0444-0025_0005.htm',
      },
      {
        label: 'Hawaii DCCA: Contractors Recovery Fund consumer information (2026)',
        url: 'https://cca.hawaii.gov/wp-content/uploads/2026/05/CLB-260123-CLB-CRF.pdf',
      },
      {
        label: 'Hawaii RICO: top 10 tips for construction projects',
        url: 'https://cca.hawaii.gov/wp-content/uploads/2026/05/CLB-260123-Top-10-Tips-for-Construction-Projects.pdf',
      },
      {
        label: 'Hawaii RICO: hiring electricians and plumbers',
        url: 'https://cca.hawaii.gov/wp-content/uploads/2026/01/CLB-190718-Hiring-Electricians-and-Plumbers.pdf',
      },
      { label: 'Hawaii DCCA: Business Check', url: 'https://cca.hawaii.gov/business-check/' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'new-hampshire',
    code: 'NH',
    name: 'New Hampshire',
    generalContractors: 'local-only',
    short: 'New Hampshire licenses electricians and plumbers, but not general contractors.',
    summary:
      'New Hampshire has no state license for general or home improvement contractors, and towns handle building permits. The Office of Professional Licensure and Certification (OPLC) licenses electricians, plumbers and gas fitters, so for other work check insurance, references and the written contract carefully.',
    boards: [
      {
        name: 'New Hampshire Office of Professional Licensure and Certification (OPLC)',
        licenses: 'Electricians (Electricians’ Board), and plumbers and fuel gas fitters (Mechanical Licensing Board)',
        lookupUrl: 'https://www.oplc.nh.gov/license-lookup',
        lookupNote:
          'OPLC’s downloadable licensee lists aren’t real time, so use the lookup for current status. If you can’t find a plumber or gas fitter, ask OPLC for a verification letter.',
        website: 'https://www.oplc.nh.gov/',
      },
    ],
    whenRequired: [
      'No state license is needed for general contracting, remodeling or home improvement work. Ask your town about building permits.',
      'Electrical work done for pay must be done by a licensed electrician. Homeowners may do their own electrical work in a single-family home they own and live in.',
      'Plumbing and fuel gas work needs a Mechanical Licensing Board license, with the same exemption for owners working on their own single-family main home.',
    ],
    howToCheck: [
      'Ask your town building department which permits the job needs, since the state doesn’t license general contractors.',
      'For electrical, plumbing or gas work, search the worker in the OPLC license lookup and confirm the license is active.',
      'Ask for a certificate of insurance and confirm the coverage directly with the insurance company.',
      'Get written, itemized estimates and a signed contract that lists the work, materials, total price and payment schedule.',
      'If something goes wrong, file a written complaint with the Attorney General’s Consumer Protection and Antitrust Bureau.',
    ],
    watchFor: [
      'Be careful with large up-front payments. The Attorney General calls a down payment of more than half the cost, or full payment before the job is done, a red flag.',
      'If you buy $150 or more in goods or services from a seller who comes to your home, state law generally lets you cancel in writing until midnight of the third business day.',
    ],
    faq: [
      {
        q: 'Does New Hampshire require a contractor license?',
        a: 'Not for general contractors or home improvement work. The state does license electricians, plumbers and gas fitters through the OPLC.',
      },
      {
        q: 'How do I check an electrician’s or plumber’s license in New Hampshire?',
        a: 'Use the license lookup on the OPLC website. You can also ask the OPLC for a formal verification letter.',
      },
      {
        q: 'Can I do my own electrical or plumbing work in New Hampshire?',
        a: 'Yes, in a single-family home you own and live in as your main home. Anyone you pay to do electrical, plumbing or gas work must be licensed.',
      },
      {
        q: 'Where do I complain about a home contractor in New Hampshire?',
        a: 'File a written complaint with the Attorney General’s Consumer Protection and Antitrust Bureau, online, by mail or by email.',
      },
    ],
    sources: [
      { label: 'New Hampshire OPLC: license lookup', url: 'https://www.oplc.nh.gov/license-lookup' },
      {
        label: 'New Hampshire Attorney General: consumer alert on hiring home contractors',
        url: 'https://www.doj.nh.gov/resources/press-releases/consumer-alert-attorney-general-encourages-public-take-steps-protect-0',
      },
      {
        label: 'New Hampshire Attorney General: risks involved with hiring a contractor (July 2024)',
        url: 'https://mm.nh.gov/files/uploads/doj/remote-docs/07012024-nh-consumer-insight-risks-hiring-a-contractor.pdf',
      },
      { label: 'RSA 319-C:15 (electricians; homeowner’s exception)', url: 'https://gc.nh.gov/rsa/html/XXX/319-C/319-C-15.htm' },
      { label: 'RSA 153:36 (mechanical licensing exceptions)', url: 'https://gc.nh.gov/rsa/html/XII/153/153-36.htm' },
      { label: 'RSA 361-B (home solicitation sales)', url: 'https://gc.nh.gov/rsa/html/XXXIII-A/361-B/361-B-mrg.htm' },
      {
        label: 'New Hampshire Attorney General: consumer complaints',
        url: 'https://www.doj.nh.gov/citizens/consumer-protection-antitrust-bureau/consumer-complaints',
      },
      {
        label: 'New Hampshire Insurance Department: how to verify your contractor’s insurance',
        url: 'https://www.insurance.nh.gov/news-and-media/blog/how-verify-if-your-contractor-has-right-insurance',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'maine',
    code: 'ME',
    name: 'Maine',
    generalContractors: 'local-only',
    short: 'Maine licenses electricians, plumbers and fuel technicians, but not general contractors.',
    summary:
      'Maine doesn’t license or regulate general contractors, remodelers or roofers. The state does license electricians, plumbers, and oil, solid fuel, propane and natural gas technicians, and any home job over $3,000 needs a written contract.',
    boards: [
      {
        name: 'Maine Office of Professional and Occupational Regulation (OPOR)',
        licenses:
          'Electricians (Electricians’ Examining Board), plumbers (Plumbers’ Examining Board), oil, solid fuel, propane and natural gas technicians (Maine Fuel Board), and door-to-door home repair sellers',
        lookupUrl: 'https://www.pfr.maine.gov/almsonline/almsquery/SearchIndividual.aspx',
        lookupNote: 'Choose the board, such as the Electricians’ Examining Board, then search by name. Results update in real time.',
        website: 'https://www.pfr.maine.gov/almsonline/almsquery/SearchIndividual.aspx',
      },
    ],
    whenRequired: [
      'Maine has no state license for general contractors, remodelers, roofers or framers. Your town handles building permits and code enforcement.',
      'Electrical work needs a licensed electrician and plumbing a licensed plumber. Homeowners may do their own electrical and plumbing work in a single-family home they own and live in.',
      'Work on oil, solid fuel, propane or natural gas heating equipment needs a Maine Fuel Board license.',
      'A door-to-door home repair seller with no permanent place of business in your town must hold a state license and put the license number on your contract.',
    ],
    howToCheck: [
      'Ask the electrician, plumber or heating technician for their full name and Maine license number.',
      'Search the OPOR license database by board and name, and confirm the license is active.',
      'If a seller came to your door, ask for their door-to-door home repair seller license number and check it in the same database.',
      'For a general contractor there’s no state license to check, so check references and ask the Attorney General’s Consumer Protection Division about complaints.',
      'Ask your town’s code enforcement officer or plumbing inspector which permits and inspections your job needs.',
    ],
    watchFor: [
      'Any home construction or repair job over $3,000 needs a written contract signed by you and the contractor, with a copy for you before work starts. The down payment can be no more than one-third of the price, and the contract must include a warranty and ways to settle disputes.',
      'A door-to-door home repair contract must tell you that you can cancel within three business days.',
    ],
    faq: [
      {
        q: 'Does Maine require a general contractor license?',
        a: 'No. The Maine Attorney General says the state doesn’t license or regulate home contractors. A bill to license residential general contractors (LD 1226) died when the Legislature adjourned in April 2026.',
      },
      {
        q: 'How do I check an electrician’s or plumber’s license in Maine?',
        a: 'Use the free OPOR license database. Choose the Electricians’ Examining Board or the Plumbers’ Examining Board, search by name, and confirm the license is active.',
      },
      {
        q: 'Do I need a written contract for home repairs in Maine?',
        a: 'Yes, if the job costs more than $3,000 in materials or labor. Both of you must sign it, and the down payment can’t be more than one-third of the price.',
      },
      {
        q: 'Can I do my own electrical or plumbing work in Maine?',
        a: 'Usually, in a single-family home you own and live in, as long as the work meets code. Check with your town about permits and inspections.',
      },
    ],
    sources: [
      {
        label: 'Maine Attorney General: home construction and repair',
        url: 'https://www.maine.gov/ag/consumer-protection/consumer-help-topics/housing/home-construction-and-repair',
      },
      {
        label: 'Maine Attorney General: home construction contracts',
        url: 'https://www.maine.gov/ag/consumer-protection/consumer-help-topics/housing/home-construction-contracts',
      },
      { label: '10 M.R.S. § 1487 (home construction contracts)', url: 'https://legislature.maine.gov/statutes/10/title10sec1487.html' },
      { label: 'Maine OPOR: license search', url: 'https://www.pfr.maine.gov/almsonline/almsquery/SearchIndividual.aspx' },
      { label: 'Maine Electricians’ Examining Board', url: 'https://www.maine.gov/pfr/professionallicensing/professions/electricians' },
      { label: 'Maine Fuel Board', url: 'https://www.maine.gov/pfr/professionallicensing/professions/maine-fuel-board' },
      {
        label: 'Maine OPOR: door-to-door home repair sellers',
        url: 'https://www.maine.gov/pfr/professionallicensing/professions/door-to-door-home-repair-sellers',
      },
      {
        label: 'Maine Legislature: LD 1226 status',
        url: 'https://legislature.maine.gov/bills/display_ps.asp?snum=132&paper=HP0801&PID=1456',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'montana',
    code: 'MT',
    name: 'Montana',
    generalContractors: 'state',
    short: 'Montana has licensed construction contractors since January 2026; trades have state boards.',
    summary:
      'Since January 1, 2026, Montana’s Department of Labor and Industry (DLI) has licensed construction contractors in place of its old registration, and state boards license electricians and plumbers. Contractors with no employees are exempt, so a missing license isn’t always a red flag, and DLI doesn’t judge the quality of a contractor’s work.',
    boards: [
      {
        name: 'Montana Department of Labor and Industry (DLI)',
        licenses:
          'Construction contractors, including general contractors, remodelers and roofers (Construction Contractor License program), electricians and electrical contractors (State Electrical Board), and plumbers (Board of Plumbers)',
        lookupUrl: 'https://boards.bsd.dli.mt.gov/_global-pages/additional-license-information/lookup-individual',
        lookupNote:
          'Search by name or license number. If you can’t find a construction contractor here, also try the exemption and registration search below.',
        website: 'https://boards.bsd.dli.mt.gov/construction-contractor/',
      },
      {
        name: 'Montana DLI: Independent Contractor Exemption Certificates',
        licenses: 'Exemption certificates for self-employed workers with no employees, which aren’t a skills license',
        lookupUrl: 'https://erdcontractors.mt.gov/ICCROnlineSearch/registrationlookup.jsp',
        lookupNote: 'This older search also lists past contractor registrations.',
        website: 'https://erd.dli.mt.gov/work-comp-regulations/montana-contractor/independent-contractor/',
      },
    ],
    whenRequired: [
      'Since January 1, 2026, construction contractors must hold a DLI construction contractor license, which replaced the old registration. Registrations active on December 31, 2025 became licenses automatically.',
      'Exemptions include independent contractors with no employees, owners working on their own property, and licensed electricians and plumbers working within their license.',
      'Electrical work needs a licensed electrician, and plumbing a licensed plumber. Owners may do their own electrical and plumbing work on a home they live in, but not on a rental or a home built to sell.',
      'Cities and counties can’t require their own contractor licenses, but they still issue building permits.',
    ],
    howToCheck: [
      'Ask for the contractor’s full business name and Montana license number.',
      'Search DLI’s licensee lookup and confirm the license is active.',
      'For electrical or plumbing work, also look up the electrician’s or plumber’s own license and the electrical contractor license.',
      'If the contractor says they have no employees and are exempt, ask for their Independent Contractor Exemption Certificate and check it in DLI’s exemption search.',
      'Ask for proof of liability and workers’ compensation insurance, and ask your local building department which permits you need.',
    ],
    watchFor: [
      'Under Montana law you can be responsible for materials even after you pay your contractor, so a supplier could put a lien on your home if the contractor doesn’t pay them.',
      'A license doesn’t mean DLI checks the quality of the work. Get a detailed written contract with dates, materials, warranties and who pulls permits, and avoid large up-front payments.',
    ],
    faq: [
      {
        q: 'Does Montana require a contractor license?',
        a: 'Yes. Since January 1, 2026, construction contractors must be licensed with the Montana Department of Labor and Industry. Independent contractors with no employees and a few other groups are exempt.',
      },
      {
        q: 'Is Montana’s contractor license the same as the old registration?',
        a: 'It replaced the registration program, and active registrations became licenses automatically. DLI says it doesn’t review the quality of a contractor’s work.',
      },
      {
        q: 'How do I check an electrician’s or plumber’s license in Montana?',
        a: 'Use DLI’s free licensee lookup and search by name or license number. The State Electrical Board and the Board of Plumbers both use it.',
      },
      {
        q: 'Can my city require its own contractor license in Montana?',
        a: 'No. State law bars cities and counties from requiring their own contractor licenses, registrations or bonds for the same purpose. Local governments still issue building permits.',
      },
    ],
    sources: [
      { label: 'Montana DLI: Construction Contractor License program', url: 'https://boards.bsd.dli.mt.gov/construction-contractor/' },
      {
        label: 'Montana DLI: HB 239 notice to construction contractors',
        url: 'https://erd.dli.mt.gov/_docs/work-comp-regs/HB-239-Notice-to-Construction-Contractors.pdf',
      },
      {
        label: 'Montana DLI: licensee lookup',
        url: 'https://boards.bsd.dli.mt.gov/_global-pages/additional-license-information/lookup-individual',
      },
      {
        label: 'Montana DOJ Office of Consumer Protection: choosing a contractor',
        url: 'https://dojmt.gov/office-of-consumer-protection/choosing-a-contractor/',
      },
      {
        label: 'MCA 37-45-204 (local authority over contractors)',
        url: 'https://archive.legmt.gov/bills/MCA/title_0370/chapter_0450/part_0020/section_0040/0370-0450-0020-0040.html',
      },
      { label: 'Montana State Electrical Board', url: 'https://boards.bsd.dli.mt.gov/electrical/' },
      { label: 'Montana Board of Plumbers', url: 'https://boards.bsd.dli.mt.gov/plumbers/' },
      {
        label: '2025 House Bill 239 (Chapter 644)',
        url: 'https://archive.legmt.gov/content/Sessions/69th/Contractor_index/CH0644.pdf',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'new-mexico',
    code: 'NM',
    name: 'New Mexico',
    generalContractors: 'state',
    short: 'New Mexico’s CID licenses contractors statewide by classification, such as GB-2.',
    summary:
      'The Construction Industries Division (CID) of the New Mexico Regulation and Licensing Department licenses general building, electrical, mechanical and plumbing, LP gas and elevator contractors statewide. A license covers only the classifications shown on it, such as GB-2 for residential building or GS-21 for roofing, so check that it fits your job.',
    boards: [
      {
        name: 'New Mexico Regulation and Licensing Department, Construction Industries Division (CID)',
        licenses:
          'General building contractors (GB-2 residential, GB-98 residential and commercial), specialty contractors such as GS-21 roofing, electrical, mechanical and plumbing (including HVAC and gas fitting), LP gas and elevator contractors, plus journeymen',
        lookupUrl: 'https://www.rld.nm.gov/construction-industries/verify-a-license/',
        lookupNote:
          'Follow the link on this page to the license search, which PSI runs for CID. Check the license status, expiration date and classification.',
        website: 'https://www.rld.nm.gov/construction-industries/',
      },
    ],
    whenRequired: [
      'Anyone who contracts for construction work in New Mexico needs a CID license, including general building, electrical, mechanical, plumbing, LP gas and elevator work.',
      'A license covers only the classifications shown on it. GB-2 is residential building, GB-98 covers residential and commercial buildings including all GB-2 work, and GS-21 covers roofing.',
      'A handyman doing casual, minor or inconsequential work, one project at a time, who earns no more than $7,200 a year doesn’t need a license but must file a declaration with CID every year. The exemption doesn’t cover certain electrical work.',
    ],
    howToCheck: [
      'Ask for the contractor’s full business name and CID license number in writing.',
      'Search CID’s license database, linked from its Verify a License page.',
      'Confirm the license is active and the classification matches your job, such as GB-2 for residential building or GS-21 for roofing.',
      'For electrical, plumbing, HVAC or gas work, make sure the contractor holds the matching electrical, mechanical and plumbing, or LP gas license.',
      'Make sure a permit is pulled for the work, and report unlicensed contracting to CID.',
    ],
    watchFor: [
      'Every CID licensee must keep a code bond. It pays to fix code violations that CID certifies and the contractor didn’t correct. Claims have a two-year time limit, so contact CID quickly.',
    ],
    faq: [
      {
        q: 'Do I need a licensed contractor for a small handyman job in New Mexico?',
        a: 'A person doing casual, minor or inconsequential work, one project at a time, who earns no more than $7,200 a year is exempt but must file a declaration with CID every year. Bigger jobs need a licensed contractor, and the exemption doesn’t cover certain electrical work.',
      },
      {
        q: 'What is the difference between a GB-2 and a GB-98 license in New Mexico?',
        a: 'GB-2 is the residential building classification. GB-98 covers both residential and commercial buildings and includes all work allowed under GB-2.',
      },
      {
        q: 'Can I do my own electrical or plumbing work in New Mexico?',
        a: 'You can get a homeowner permit for work on your own primary residence, but you must first pass the required CID exam for electrical, plumbing or mechanical work. Homeowner permits don’t cover rental or other property.',
      },
      {
        q: 'What happens if a contractor works without a license in New Mexico?',
        a: 'Contracting without a license is against the law in New Mexico. CID can stop the project and file a criminal charge.',
      },
    ],
    sources: [
      { label: 'New Mexico CID: verify a license', url: 'https://www.rld.nm.gov/construction-industries/verify-a-license/' },
      { label: 'New Mexico CID: bureaus', url: 'https://www.rld.nm.gov/construction-industries/find-a-bureau/bureaus/' },
      { label: '14.6.6 NMAC (classifications and scopes)', url: 'https://www.srca.nm.gov/parts/title14/14.006.0006.html' },
      {
        label: 'New Mexico CID: handyman exemption form',
        url: 'https://www.rld.nm.gov/uploads/FileLinks/548da1a538064745814c05ee0b4d8059/HANDYMAN_2017_505_841_6352.pdf',
      },
      { label: '14.5.2 NMAC (permits, including homeowner permits)', url: 'https://www.srca.nm.gov/parts/title14/14.005.0002.html' },
      { label: '14.5.9 NMAC (code bond claims)', url: 'https://srca.nm.gov/parts/title14/14.005.0009.html' },
      {
        label: 'New Mexico CID: unlicensed violations',
        url: 'https://www.rld.nm.gov/construction-industries/investigation-and-enforcement/unlicensed-violations/',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'nebraska',
    code: 'NE',
    name: 'Nebraska',
    generalContractors: 'state-and-local',
    short: 'Nebraska registers contractors statewide but has no state general contractor license.',
    summary:
      'Nebraska has no state general contractor license. Instead, contractors register with the Nebraska Department of Labor, which doesn’t test skill or guarantee quality. Electricians are licensed by the State Electrical Division, while plumbers and HVAC workers are licensed by cities such as Omaha and Lincoln.',
    boards: [
      {
        name: 'Nebraska Department of Labor: contractor registration',
        licenses: 'Statewide registration of contractors and subcontractors (a registration, not a skills license)',
        lookupUrl: 'https://dol.nebraska.gov/conreg/Search',
        lookupNote: 'No account is needed. Search by business name, registration number, city, ZIP code or county.',
        website: 'https://dol.nebraska.gov/conreg',
      },
      {
        name: 'Nebraska State Electrical Division',
        licenses: 'Electrical contractors and electricians, plus state electrical permits and inspections',
        lookupUrl: 'https://electrical.nebraska.gov/',
        lookupNote: 'Use the Licensee Search link on the division’s website.',
        website: 'https://electrical.nebraska.gov/',
      },
      {
        name: 'City of Omaha Permits and Inspections',
        licenses: 'Plumbers, HVAC workers, electricians and other trades working in Omaha',
        lookupUrl: 'https://permits.cityofomaha.org/licensing-information',
        lookupNote: 'Use the City of Omaha License Search link on this page.',
        website: 'https://permits.cityofomaha.org/',
      },
      {
        name: 'City of Lincoln Building and Safety',
        licenses: 'Plumbing and mechanical (HVAC) trade professionals working in Lincoln',
        lookupUrl: 'https://www.lincoln.ne.gov/City/Departments/Building-Safety/Plumbing/Plumbing-Contractors-Licensing-and-Registration',
        lookupNote: 'Download the list of plumbing trade professionals from this page. For HVAC, see the city’s mechanical trade registration list.',
        website: 'https://www.lincoln.ne.gov/City/Departments/Building-Safety/Plumbing/Plumbing-Contractors-Licensing-and-Registration',
      },
    ],
    whenRequired: [
      'Contractors and subcontractors who do construction work in Nebraska must register with the Department of Labor. People working on their own property, or earning less than $5,000 a year from construction, don’t have to register.',
      'Contractors with employees must keep a current workers’ compensation certificate on file, or they’re dropped from the list of registered contractors.',
      'Electrical work needs a license from the State Electrical Division. You may wire your own principal residence without a license if you get a permit and pass inspections, but not a rental, recreational property or a relative’s home.',
      'Plumbing and HVAC work is licensed by cities, such as Omaha and Lincoln.',
    ],
    howToCheck: [
      'Ask for the contractor’s exact business name and Nebraska Department of Labor registration number.',
      'Search the Department of Labor’s contractor registry and confirm the registration is current.',
      'For electrical work, look up the electrician or electrical contractor with the State Electrical Division. In Omaha, also check the city’s license search, because Omaha issues its own electrical licenses.',
      'For plumbing or HVAC work in Omaha or Lincoln, check the city’s license search or its list of licensed trade professionals.',
      'Make sure the required permits are pulled before work starts.',
    ],
    watchFor: [
      'If a home insurance claim will pay for the job, such as a storm-damaged roof, you can cancel the contract in writing until midnight of the third business day after you sign, or after your insurer tells you in writing that all or part of the claim isn’t covered, whichever is later.',
      'Registration isn’t a quality check. The Department of Labor says it doesn’t ensure quality of work or protect against fraud.',
    ],
    faq: [
      {
        q: 'Does Nebraska require a general contractor license?',
        a: 'No. Nebraska doesn’t issue a state general contractor license. Contractors must register with the Department of Labor, but registration doesn’t test skill or guarantee quality.',
      },
      {
        q: 'How do I check if a contractor is registered in Nebraska?',
        a: 'Use the Department of Labor’s free contractor registration search. You can search by business name, registration number, city or ZIP code without making an account.',
      },
      {
        q: 'Who licenses plumbers in Nebraska?',
        a: 'Cities, not a state board. Omaha’s Plumbing Board gives the master and journeyman plumber exams, and Lincoln Building and Safety keeps a list of plumbing trade professionals.',
      },
      {
        q: 'Can I do my own electrical work in Nebraska?',
        a: 'Yes, on a single-family home you own and live in as your principal residence. You must do the work yourself without pay, get a homeowner permit and pass inspections.',
      },
    ],
    sources: [
      { label: 'Nebraska Department of Labor: search registered contractors', url: 'https://dol.nebraska.gov/conreg/Search' },
      {
        label: 'Nebraska Department of Labor: contractor registration overview',
        url: 'https://dol.nebraska.gov/LaborStandards/Contractors/Overview',
      },
      { label: 'Nebraska LB 162 (2009, Contractor Registration Act)', url: 'https://www.nebraskalegislature.gov/FloorDocs/101/PDF/Slip/LB162.pdf' },
      { label: 'Nebraska State Electrical Division', url: 'https://electrical.nebraska.gov/' },
      { label: 'Nebraska State Electrical Division: homeowner handout', url: 'https://electrical.nebraska.gov/homeowner-handout' },
      { label: 'City of Omaha: licensing information', url: 'https://permits.cityofomaha.org/licensing-information' },
      {
        label: 'City of Lincoln: plumbing trade registration',
        url: 'https://www.lincoln.ne.gov/City/Departments/Building-Safety/Plumbing/Plumbing-Contractors-Licensing-and-Registration',
      },
      {
        label: 'Neb. Rev. Stat. § 44-8603 (Insured Homeowners Protection Act)',
        url: 'https://nebraskalegislature.gov/laws/statutes.php?statute=44-8603',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'idaho',
    code: 'ID',
    name: 'Idaho',
    generalContractors: 'state',
    short: 'Idaho registers contractors through DOPL for most jobs of $2,000 or more.',
    summary:
      'Idaho’s Division of Occupational and Professional Licenses (DOPL) registers contractors through the Idaho Contractors Board, and separate DOPL boards license electrical, plumbing and HVAC work. DOPL says contractor registration is a registration, not a license, so for trade work also check that the company holds the right DOPL trade license.',
    boards: [
      {
        name: 'Idaho Contractors Board (DOPL)',
        licenses: 'Contractor registration for building, altering, repairing, improving and demolishing structures',
        lookupUrl: 'https://dopl.idaho.gov/con/',
        lookupNote:
          'Choose Search for a Registration on this page. To see formal actions against a contractor, use the Public Search in DOPL Online Services.',
        website: 'https://dopl.idaho.gov/',
      },
      {
        name: 'Idaho DOPL: Electrical, Plumbing and HVAC boards',
        licenses:
          'Electrical contractors and electricians (Electrical Board), plumbing contractors and plumbers (State Plumbing Board), and HVAC contractors and journeymen (HVAC Board)',
        lookupUrl: 'https://dopl.idaho.gov/',
        lookupNote: 'Use Search for a License or Registration on the DOPL home page.',
        website: 'https://dopl.idaho.gov/',
      },
    ],
    whenRequired: [
      'A contractor must register with DOPL before doing construction work unless an exemption applies. Casual or minor jobs under $2,000 for labor and materials are exempt, but not when the work is part of a larger project or split up to avoid registering.',
      'Electrical, plumbing and HVAC work needs a DOPL trade license. Licensed trade contractors working within their license don’t also need contractor registration.',
      'Owners working on their own property are generally exempt from registration, with limits for owners who build or remodel to resell.',
    ],
    howToCheck: [
      'Ask for the contractor’s exact business name and Idaho registration number.',
      'Search the Contractors Board registration search, and confirm the registration is active and the name matches your bid or contract.',
      'For electrical, plumbing or HVAC work, use DOPL’s license search to confirm the company holds a contractor license for that trade.',
      'To see formal actions against a contractor, use the Public Search in DOPL Online Services.',
      'Before you sign a home job over $2,000, ask for the written disclosure Idaho law requires and a current certificate of liability insurance.',
    ],
    watchFor: [
      'For work over $2,000 on a home with one to four units, the general contractor must give you a written disclosure before you sign. It explains your right to ask for lien waivers, proof of liability and workers’ compensation insurance, and an extended title insurance policy.',
      'Registered contractors must carry general liability insurance of at least $300,000, so ask for a current certificate.',
    ],
    faq: [
      {
        q: 'Does Idaho require contractors to be licensed?',
        a: 'Idaho requires contractors to register with DOPL through the Idaho Contractors Board, which DOPL says is a registration, not a license. Electricians, plumbers and HVAC contractors need separate DOPL trade licenses.',
      },
      {
        q: 'Do I need a registered contractor for a small job in Idaho?',
        a: 'Casual or minor jobs under $2,000 for labor and materials are exempt. The exemption doesn’t apply if the work is part of a larger project or split into smaller contracts to avoid registering.',
      },
      {
        q: 'How do I check an Idaho electrician, plumber or HVAC license?',
        a: 'Use Search for a License or Registration on the DOPL website. DOPL issues electrical, plumbing and HVAC licenses through its Electrical, Plumbing and HVAC boards.',
      },
      {
        q: 'Does a licensed Idaho electrician or plumber also need contractor registration?',
        a: 'Not for work within their trade license, according to DOPL. They need registration if they take on contracting work beyond it.',
      },
    ],
    sources: [
      { label: 'Idaho DOPL: Contractors Board', url: 'https://dopl.idaho.gov/con/' },
      { label: 'Idaho DOPL: Contractors Board FAQ', url: 'https://dopl.idaho.gov/con/con-faq/' },
      {
        label: 'Idaho Code § 54-5205 (contractor registration exemptions)',
        url: 'https://legislature.idaho.gov/statutesrules/idstat/title54/t54ch52/sect54-5205/',
      },
      {
        label: 'Idaho Code § 54-5210 (registration and insurance)',
        url: 'https://legislature.idaho.gov/statutesrules/idstat/title54/t54ch52/sect54-5210/',
      },
      {
        label: 'Idaho Code § 45-525 (homeowner disclosure for contracts over $2,000)',
        url: 'https://legislature.idaho.gov/statutesrules/idstat/title45/t45ch5/sect45-525/',
      },
      {
        label: 'Idaho Code § 54-1002 (electrical licenses required)',
        url: 'https://legislature.idaho.gov/statutesrules/idstat/Title54/T54CH10/SECT54-1002/',
      },
      { label: 'Idaho DOPL: Electrical Board', url: 'https://dopl.idaho.gov/ele/' },
      { label: 'Idaho DOPL: HVAC Board', url: 'https://dopl.idaho.gov/hvac/' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'west-virginia',
    code: 'WV',
    name: 'West Virginia',
    generalContractors: 'state',
    short: 'West Virginia licenses contractors for home projects of $5,000 or more.',
    summary:
      'The West Virginia Contractor Licensing Board licenses contractors when a project costs $5,000 or more for residential work, or $25,000 or more for commercial work. Electricians are licensed separately by the State Fire Marshal, and plumbers and HVAC technicians by the Division of Labor.',
    boards: [
      {
        name: 'West Virginia Contractor Licensing Board',
        licenses:
          'Contractors on projects of $5,000 or more for residential work or $25,000 or more for commercial work, in classifications such as residential, general building, remodeling and repair, electrical, plumbing, HVAC and specialty',
        lookupUrl: 'https://wvclboard.wv.gov/verify/',
        lookupNote:
          'Search by license number (it starts with WV, and part of the number works), company name, DBA, city, county or classification. The board says the search is updated in real time.',
        website: 'https://wvclboard.wv.gov/',
      },
      {
        name: 'West Virginia Division of Labor',
        licenses: 'Master and journeyman plumbers, plumbers in training, and HVAC technicians',
        lookupUrl: 'https://labor.wv.gov/database-search',
        lookupNote: 'The license database has separate searches for certified plumbers and certified HVAC technicians.',
        website: 'https://labor.wv.gov/',
      },
      {
        name: 'West Virginia State Fire Marshal: Regulatory and Licensing Division',
        licenses: 'Master and journeyman electricians',
        lookupUrl: 'https://firemarshal.wv.gov/regulatory-and-licensing-division',
        lookupNote: 'Use the Online Licensee Search link on this page, and search by name, city or license number.',
        website: 'https://firemarshal.wv.gov/regulatory-and-licensing-division',
      },
    ],
    whenRequired: [
      'A contractor license is required when the whole project costs $5,000 or more for residential work or $25,000 or more for commercial work, counting all labor and materials, not just one contractor’s share.',
      'Owners or occupants who do the work on their own property themselves don’t need a contractor license. Some older state pages still show a $2,500 limit, but the current law uses $5,000 and $25,000.',
      'Plumbing work needs a Division of Labor plumber license, and HVAC work a Division of Labor HVAC technician license. People working on their own single-family home, or an immediate family member’s, are exempt from the plumber license.',
      'Electrical work needs a State Fire Marshal electrician license, except on property the person or their immediate family owns or leases.',
    ],
    howToCheck: [
      'Ask for the contractor’s license number, which starts with WV, and the exact company name.',
      'Search the Contractor Licensing Board’s contractor search by number, company name, DBA, city or county.',
      'Confirm the license is active and its classification fits your job, such as residential, plumbing, electrical or HVAC.',
      'For a plumber or HVAC technician, use the Division of Labor’s license database. For an electrician, use the State Fire Marshal’s licensee search.',
      'Make sure the license number on your contract and in the contractor’s ads matches what you found, since state law requires it to appear there.',
    ],
    watchFor: [
      'For licensed contracting work of $10,000 or more, state law requires a written contract that describes the work and its cost and is signed by both you and the contractor.',
      'If an insurance claim is paying for a roof repair, you can cancel the roofing contract before midnight of the fifth business day after your insurer tells you all or part of the claim isn’t covered. The roofer can’t demand payment until that window ends and must refund payments within 10 days of a cancellation.',
    ],
    faq: [
      {
        q: 'Does West Virginia require a contractor license?',
        a: 'Yes, for projects that cost $5,000 or more for residential work or $25,000 or more for commercial work, including all labor and materials. The West Virginia Contractor Licensing Board issues these licenses.',
      },
      {
        q: 'How do I look up a contractor license in West Virginia?',
        a: 'Use the Contractor Licensing Board’s contractor search. You can search by license number, company name, DBA, city, county or classification.',
      },
      {
        q: 'Who licenses electricians and plumbers in West Virginia?',
        a: 'The State Fire Marshal’s Office licenses electricians. The Division of Labor licenses plumbers and HVAC technicians.',
      },
      {
        q: 'Does a West Virginia home improvement job need a written contract?',
        a: 'Yes, for licensed contracting work of $10,000 or more, including materials and labor. The contract must describe the work and cost, be signed by both sides and show the contractor’s license number.',
      },
    ],
    sources: [
      { label: 'West Virginia Contractor Licensing Board: contractor search', url: 'https://wvclboard.wv.gov/verify/' },
      { label: 'W. Va. Code § 30-42-3 (contractor definition and thresholds)', url: 'https://code.wvlegislature.gov/30-42-3/' },
      { label: 'West Virginia Contractor Licensing Board: FAQ', url: 'https://wvclboard.wv.gov/www/download_resource.aspx?ID=208' },
      { label: 'W. Va. Code § 30-42-6 (license number and written contracts)', url: 'https://code.wvlegislature.gov/30-42-6/' },
      { label: 'West Virginia Division of Labor: license database search', url: 'https://labor.wv.gov/database-search' },
      {
        label: 'West Virginia Division of Labor: plumber certification FAQ',
        url: 'https://labor.wv.gov/licensing/plumber-certification/plumber-certification-faq',
      },
      {
        label: 'West Virginia State Fire Marshal: Regulatory and Licensing Division',
        url: 'https://firemarshal.wv.gov/regulatory-and-licensing-division',
      },
      { label: 'W. Va. Code § 46A-6M-3 (roofing contracts paid by insurance)', url: 'https://code.wvlegislature.gov/46A-6M-3/' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'rhode-island',
    code: 'RI',
    name: 'Rhode Island',
    generalContractors: 'state',
    short: 'Rhode Island registers home and commercial contractors; trades get separate licenses.',
    summary:
      'Rhode Island’s Contractors’ Registration and Licensing Board (CRLB) registers contractors who build or repair homes and commercial buildings, and the Department of Labor and Training (DLT) licenses electricians, plumbers and HVAC trades. Most contractors only need to register today, but a new state license for anyone who supervises new home construction or structurally remodels a home starts January 1, 2028.',
    boards: [
      {
        name: 'Rhode Island Contractors’ Registration and Licensing Board (CRLB)',
        licenses: 'General contractors, remodelers and most subcontractors for residential and commercial work, plus commercial roofing licenses',
        lookupUrl: 'https://crb.ri.gov/consumer/search-registrantlicensee',
        lookupNote: 'Search the contractor’s name and confirm the registration or license is active.',
        website: 'https://crb.ri.gov/',
      },
      {
        name: 'Rhode Island Department of Labor and Training (DLT): Professional Regulation',
        licenses:
          'Electricians, plumbers, pipefitters, refrigeration mechanics, heating and air conditioning mechanics, sheet metal workers and other trades',
        lookupUrl: 'https://dltweb.dlt.ri.gov/profregsonline/',
        lookupNote:
          'Use the license search on this site to search by trade, license number, name or city. A separate Violations page shows violation history.',
        website: 'https://dlt.ri.gov/regulation-and-safety/professional-regulation',
      },
    ],
    whenRequired: [
      'Contractors, remodelers and most subcontractors who build, repair, demolish or move residential or commercial structures must register with the CRLB. A registered contractor’s employees don’t need their own registration.',
      'A person working under one contract worth less than $500 in labor and materials doesn’t need to register, but anyone who advertises as a contractor must.',
      'Licensed electricians and plumbers don’t need CRLB registration unless they contract for work outside their DLT license. Commercial roofers need a separate CRLB commercial roofing license.',
      'Starting January 1, 2028, anyone who supervises construction of a new home or structurally remodels a one- to four-family home must hold a new state residential contractor license.',
    ],
    howToCheck: [
      'Search the contractor’s name in the CRLB registrant search and confirm the status is active.',
      'For electrical, plumbing or HVAC work, look up the worker’s license in the DLT search and check the Violations page.',
      'Ask for proof of liability insurance. Registered contractors must carry at least $500,000.',
      'For any job over $1,000, get a written contract that shows the contractor’s registration number.',
      'Ask for the Notice of Possible Mechanics’ Lien before work starts.',
    ],
    watchFor: [
      'CRLB complaints must be filed within one year after the work is finished or you move in. The board takes claims of $10,000 or less; larger claims go to Superior Court.',
      'An arbitration clause in your contract can block a CRLB complaint unless both sides waive it within 45 days, so read that clause before you sign.',
    ],
    faq: [
      {
        q: 'Does Rhode Island require a general contractor license?',
        a: 'Today, most contractors must register with the CRLB rather than hold a license. Starting January 1, 2028, anyone who supervises new home construction or structurally remodels a one- to four-family home will need a new state residential contractor license.',
      },
      {
        q: 'How do I check if a Rhode Island contractor is registered?',
        a: 'Use the CRLB’s registrant and licensee search. For electricians, plumbers and HVAC trades, use the DLT Professional Regulations Online license search.',
      },
      {
        q: 'Do handymen need to register in Rhode Island?',
        a: 'Usually, yes. A person doing a single job worth less than $500 in total doesn’t need to register, but anyone who advertises as a contractor must be registered.',
      },
      {
        q: 'How do I file a complaint against a contractor in Rhode Island?',
        a: 'File online with the CRLB and include your contract, proof of payment and photos. The board takes claims of $10,000 or less, filed within one year after the work is done.',
      },
    ],
    sources: [
      { label: 'Rhode Island CRLB: search a registrant or licensee', url: 'https://crb.ri.gov/consumer/search-registrantlicensee' },
      { label: 'Rhode Island CRLB: contractor FAQs', url: 'https://crb.ri.gov/contractor-registration/faqs' },
      { label: 'Rhode Island CRLB: complaint filing overview', url: 'https://crb.ri.gov/consumer/complaint-filing-overview' },
      {
        label: 'Rhode Island CRLB: what homeowners should know (2023)',
        url: 'https://crb.ri.gov/sites/g/files/xkgbur711/files/2024-01/What%20Homeowners%20Should%20Know_03.08.2023.pdf',
      },
      {
        label: 'R.I. Gen. Laws § 5-65-3 (registration and written contracts)',
        url: 'https://webserver.rilegislature.gov/Statutes/TITLE5/5-65/5-65-3.HTM',
      },
      {
        label: 'R.I. Gen. Laws § 5-65.4-3 (residential contractor license from 2028)',
        url: 'https://webserver.rilegislature.gov/Statutes/TITLE5/5-65.4/5-65.4-3.htm',
      },
      { label: 'Rhode Island DLT: Professional Regulation', url: 'https://dlt.ri.gov/regulation-and-safety/professional-regulation' },
      { label: 'Rhode Island DLT: Professional Regulations Online', url: 'https://dltweb.dlt.ri.gov/profregsonline/' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'delaware',
    code: 'DE',
    name: 'Delaware',
    generalContractors: 'state-and-local',
    short: 'Delaware licenses contractor businesses; electricians, plumbers and HVAC need trade licenses.',
    summary:
      'Delaware contractors must get a business license from the Division of Revenue and register with the Department of Labor, while the Division of Professional Regulation’s boards license electricians, plumbers and HVACR contractors. The Division of Revenue license is a business license, not a skills test, and Attorney General rules have covered home improvement contracts since November 1, 2023.',
    boards: [
      {
        name: 'Delaware Division of Revenue',
        licenses: 'Business licenses for every resident and nonresident contractor doing business in Delaware',
        lookupUrl: 'https://revenue.delaware.gov/business-license-search/',
        lookupNote: 'Search the business name and check that the license is current. It shows a business license, not trade skills.',
        website: 'https://revenue.delaware.gov/',
      },
      {
        name: 'Delaware Department of Labor: Office of Contractor Registration',
        licenses: 'Registration of construction service businesses before they begin work in Delaware',
        lookupUrl: 'https://contractorregistry.delaware.gov/',
        lookupNote: 'The registry lists only contractors the department has certified. A contractor who isn’t listed hasn’t applied or has been removed.',
        website: 'https://labor.delaware.gov/divisions/industrial-affairs/construction-industry/contractor-registration-act/',
      },
      {
        name: 'Delaware Division of Professional Regulation (DELPROS)',
        licenses:
          'Electricians (Board of Electrical Examiners), and master plumbers and HVACR contractors (Board of Plumbing, Heating, Ventilation, Air Conditioning and Refrigeration Examiners)',
        lookupUrl: 'https://delpros.delaware.gov/OH_VerifyLicense',
        lookupNote: 'The DELPROS license look-up is free and shows real-time data from the state licensing database.',
        website: 'https://dpr.delaware.gov/',
      },
    ],
    whenRequired: [
      'Any contractor doing business in Delaware must register with and get a business license from the Division of Revenue.',
      'Construction service businesses must also register with the Department of Labor’s Office of Contractor Registration before they begin work.',
      'Plumbing and HVACR work needs a Delaware board license, and a license from another state doesn’t count. Electrical work needs a license from the Board of Electrical Examiners.',
      'Your city or county may also require its own business license.',
    ],
    howToCheck: [
      'Search the business in the Division of Revenue’s business license search and confirm the license is current.',
      'Look up the company in the Department of Labor’s contractor registry.',
      'For electrical, plumbing or HVACR work, look up the license holder in the free DELPROS license look-up.',
      'Ask your city or county whether your project needs a local license or permit.',
      'Before you sign, get a complete written contract and the Attorney General’s home improvement summary of rights.',
    ],
    watchFor: [
      'Since November 1, 2023, home improvement contractors must fill in all final terms of the contract and give you the Attorney General’s summary of rights before you sign. A contractor may not call a binding contract just an estimate.',
      'For many door-to-door sales of $25 or more made at your home, you can cancel until midnight of the third business day, and the seller must give you a cancellation notice.',
    ],
    faq: [
      {
        q: 'Does Delaware require a general contractor license?',
        a: 'General contractors need a Division of Revenue business license and Department of Labor registration. These show the business is licensed and registered, not that it passed a skills test. Electricians, plumbers and HVACR contractors need separate trade licenses.',
      },
      {
        q: 'How do I check a contractor’s license in Delaware?',
        a: 'Check the Division of Revenue’s business license search and the Department of Labor’s contractor registry. For electricians, plumbers and HVACR contractors, use the DELPROS license look-up.',
      },
      {
        q: 'Where do I complain about a contractor in Delaware?',
        a: 'File a consumer complaint online with the Delaware Department of Justice. Its Consumer Mediation Unit often handles contract disputes through informal mediation, and its Consumer Protection Unit enforces the home improvement rules.',
      },
    ],
    sources: [
      {
        label: 'Delaware Division of Revenue: contractors (resident and nonresident)',
        url: 'https://revenue.delaware.gov/business-tax-forms/contractors-resident-and-non-resident/',
      },
      { label: 'Delaware Division of Revenue: business license search', url: 'https://revenue.delaware.gov/business-license-search/' },
      {
        label: 'Delaware Department of Labor: Contractor Registration Act',
        url: 'https://labor.delaware.gov/divisions/industrial-affairs/construction-industry/contractor-registration-act/',
      },
      { label: 'Delaware DELPROS: license look-up', url: 'https://delpros.delaware.gov/OH_VerifyLicense' },
      { label: 'Delaware Plumbing and HVACR Board: FAQs', url: 'https://dpr.delaware.gov/boards/plumbers/faqs/' },
      {
        label: 'Delaware Department of Justice: home improvement rules summary',
        url: 'https://attorneygeneral.delaware.gov/wp-content/uploads/sites/50/2023/11/Home-Improvement-Regs-Summary.pdf',
      },
      { label: 'Delaware Department of Justice: consumer complaints', url: 'https://attorneygeneral.delaware.gov/fraud/cmu/complaint/' },
      { label: '6 Del. C. ch. 44 (home solicitation sales)', url: 'https://delcode.delaware.gov/title6/c044/' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'south-dakota',
    code: 'SD',
    name: 'South Dakota',
    generalContractors: 'local-only',
    short: 'South Dakota licenses electricians and plumbers, but not general contractors.',
    summary:
      'South Dakota doesn’t license general or remodeling contractors at the state level, so cities such as Sioux Falls and Rapid City do, while the state Electrical and Plumbing Commissions license those trades. A contractor’s excise tax license from the Department of Revenue is a tax registration, not proof of skill.',
    boards: [
      {
        name: 'South Dakota Plumbing Commission',
        licenses: 'Plumbing contractors, journeyman plumbers, specialty licensees and small onsite wastewater installers',
        lookupUrl: 'https://dlr.sd.gov/plumbing/consumer_info.aspx',
        lookupNote: 'Open the lists of licensed plumbers and specialty licensees on this page, and check the date on each list.',
        website: 'https://dlr.sd.gov/plumbing/default.aspx',
      },
      {
        name: 'City of Sioux Falls: contractor licensing',
        licenses:
          'Residential building contractors, residential roofing and repair contractors, and electrical, plumbing and mechanical (heating, air conditioning and refrigeration) contractors working in Sioux Falls',
        lookupUrl:
          'https://www.siouxfalls.gov/business-permits/permits-licenses-inspections/licensing/contractor-licensing/currently-licensed-contractors',
        website: 'https://www.siouxfalls.gov/business-permits/permits-licenses-inspections/licensing/contractor-licensing',
      },
      {
        name: 'City of Rapid City Building Services',
        licenses: 'Residential, commercial, siding, roofing, electrical, mechanical, gas, plumbing and sign contractors working in Rapid City',
        lookupUrl: 'https://www.rcgov.org/departments/community-planning-development/building-services.html',
        lookupNote: 'Open the Current Licensed Contractors Report on this page. It’s a PDF list, not a search, so check its date.',
        website: 'https://www.rcgov.org/departments/community-planning-development/building-services.html',
      },
    ],
    whenRequired: [
      'The state doesn’t license general or remodeling contractors. Every contractor must get a free contractor’s excise tax license from the Department of Revenue before starting work, but it’s a tax registration only.',
      'Electrical work for others must be done by a contractor licensed by the South Dakota Electrical Commission. Homeowners may wire their own home or farmstead only with a homeowner permit approved before work starts, and not on rental or commercial property.',
      'Plumbing on property connected to a public water or sewer system needs a Plumbing Commission license. Homeowners may do plumbing on a home they own and live in.',
      'Sioux Falls requires a city license for residential building work and for shingling, siding, and window or door replacement on homes. Rapid City licenses residential, roofing, siding, electrical, mechanical, gas and plumbing contractors.',
    ],
    howToCheck: [
      'Ask the contractor which city licenses they hold, and for each license number.',
      'In Sioux Falls, check the city’s list of currently licensed contractors. In Rapid City, open the licensed contractor report on the Building Services page.',
      'For an electrician, contact the South Dakota Electrical Commission at 605-773-3573 to verify the license, since it has no online search.',
      'For a plumber, check the Plumbing Commission’s lists of licensed plumbers and note the date on the list.',
      'Ask the Attorney General’s Consumer Protection Division whether complaints have been filed against the company.',
    ],
    watchFor: [
      'You can cancel a written storm-damage roofing contract within 72 hours after signing, or within 72 hours after learning your insurer denied all or part of the claim. The roofer must give you a cancellation form and refund your payments within 10 days, though you may owe for emergency repairs.',
      'Roofing contractors may not advertise or promise to pay or rebate any part of your insurance deductible.',
    ],
    faq: [
      {
        q: 'Does South Dakota require a contractor license?',
        a: 'Not at the state level for general or remodeling work. Check with the city where the work is done, since Sioux Falls and Rapid City license contractors. Electricians and plumbers need state licenses.',
      },
      {
        q: 'Is a contractor’s excise tax license the same as a contractor license?',
        a: 'No. It’s a free tax registration from the Department of Revenue that every contractor must have. It doesn’t show training or skill.',
      },
      {
        q: 'How do I check an electrician’s license in South Dakota?',
        a: 'Contact the South Dakota Electrical Commission by phone or email. It doesn’t have a public online search.',
      },
      {
        q: 'Can I cancel a roofing contract after a storm in South Dakota?',
        a: 'Yes. You can cancel within 72 hours of signing, or within 72 hours after learning your insurer denied all or part of the claim. Send written notice to the address in the contract.',
      },
    ],
    sources: [
      { label: 'South Dakota Department of Revenue: contractor’s excise tax', url: 'https://dor.sd.gov/businesses/taxes/contractors-excise-tax/' },
      { label: 'South Dakota Electrical Commission: licensing', url: 'https://dlr.sd.gov/electrical/licensing.aspx' },
      { label: 'South Dakota Electrical Commission: homeowner wiring', url: 'https://dlr.sd.gov/electrical/homeowner_wiring.aspx' },
      { label: 'SDCL ch. 36-25 (plumbing licensing)', url: 'https://sdlegislature.gov/Statutes/36-25' },
      { label: 'SDCL ch. 37-24 (including roofing contracts)', url: 'https://sdlegislature.gov/Statutes/37-24' },
      {
        label: 'City of Sioux Falls: contractor licensing',
        url: 'https://www.siouxfalls.gov/business-permits/permits-licenses-inspections/licensing/contractor-licensing',
      },
      {
        label: 'City of Rapid City: Building Services',
        url: 'https://www.rcgov.org/departments/community-planning-development/building-services.html',
      },
      {
        label: 'South Dakota Consumer Protection: construction and home improvement',
        url: 'https://consumer.sd.gov/fastfacts/construction.aspx',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'north-dakota',
    code: 'ND',
    name: 'North Dakota',
    generalContractors: 'state',
    short: 'North Dakota’s Secretary of State licenses contractors for jobs over $4,000.',
    summary:
      'North Dakota’s Secretary of State licenses contractors for any job over $4,000, and the license class limits how large a single job can be. Electricians and plumbers need separate state board licenses, and cities such as Fargo also license roofers, plumbers and HVAC contractors.',
    boards: [
      {
        name: 'North Dakota Secretary of State',
        licenses: 'Contractor licenses in Classes A through D for general contractors, subcontractors and other contractors on jobs over $4,000',
        lookupUrl: 'https://firststop.sos.nd.gov/search/contractor',
        lookupNote: 'Search the contractor in FirstStop and confirm the license is in good standing and its class covers your job’s price.',
        website: 'https://www.sos.nd.gov/business/licensing-registration/contractors',
      },
      {
        name: 'North Dakota State Electrical Board',
        licenses: 'Electricians and electrical contractors',
        lookupUrl: 'https://www.ndseb.com/search-1/lookup-a-licensedorregistered-electrician/',
        lookupNote: 'Enter the last name only, or the 4- or 5-digit license number.',
        website: 'https://www.ndseb.com/',
      },
      {
        name: 'North Dakota State Plumbing Board',
        licenses: 'Master, journeyman and apprentice plumbers, sewer and water installers, and water conditioning contractors and installers',
        lookupUrl: 'https://www.ndplumbingboard.gov/licensing-license-lookup',
        website: 'https://www.ndplumbingboard.gov/',
      },
      {
        name: 'City of Fargo Inspections',
        licenses: 'Home roofers, plumbers, and heating and air conditioning contractors working in Fargo',
        lookupUrl: 'https://permits.fargond.gov/',
        lookupNote: 'Use the Contractor Status option in the city’s permit portal.',
        website: 'https://fargond.gov/city-government/departments/inspections/selecting-a-contractor',
      },
    ],
    whenRequired: [
      'A Secretary of State contractor license is required when a job’s cost, value or price is more than $4,000. This covers general contractors, subcontractors and out-of-state contractors.',
      'The license class caps the size of each job: Class D up to $100,000, Class C up to $300,000, Class B up to $500,000, and Class A has no limit.',
      'Electricians need a State Electrical Board license and plumbers a State Plumbing Board license, separate from the Secretary of State license.',
      'Fargo also requires city licenses for home roofers, plumbers, and heating and air conditioning contractors, and Bismarck licenses mechanical (HVAC) installers.',
    ],
    howToCheck: [
      'Ask for the contractor’s exact business name and North Dakota license number.',
      'Search FirstStop on the Secretary of State’s site. Confirm the license is in good standing and its class covers your job’s price; licenses renew each year by March 1.',
      'For an electrician, use the State Electrical Board lookup. For a plumber, use the State Plumbing Board license lookup.',
      'In Fargo, check roofers, plumbers and HVAC contractors through the city’s Contractor Status search. In Bismarck, ask Building Inspections about mechanical licenses.',
      'Read the Attorney General’s guide to hiring a contractor before you sign.',
    ],
    watchFor: [
      'If insurance is paying for the work, you can cancel the contract until midnight of the fifth business day after you sign, or after your insurer tells you in writing that all or part of the claim isn’t covered, whichever is later. The contractor must refund your payments within 10 days.',
      'The state Insurance Department says a contractor who offers to pay or cover your insurance deductible is breaking North Dakota law, and warns about out-of-state crews that arrive after storms.',
    ],
    faq: [
      {
        q: 'Does North Dakota require a contractor license?',
        a: 'Yes. Anyone doing a job worth more than $4,000 must hold a contractor license from the Secretary of State. Electricians and plumbers also need licenses from their state boards.',
      },
      {
        q: 'What do North Dakota contractor license classes mean?',
        a: 'The class sets the largest single job a contractor may take. Class D covers jobs up to $100,000, Class C up to $300,000, Class B up to $500,000, and Class A has no cap.',
      },
      {
        q: 'Does a Secretary of State contractor license cover electrical or plumbing work?',
        a: 'No. Electricians are licensed by the State Electrical Board and plumbers by the State Plumbing Board, so check those boards separately.',
      },
      {
        q: 'Can I cancel a contract that my insurance is paying for?',
        a: 'Yes. You can cancel until midnight of the fifth business day after signing, or after your insurer says in writing that all or part of the claim isn’t covered, whichever is later. Give the contractor signed, dated written notice.',
      },
    ],
    sources: [
      { label: 'North Dakota Secretary of State: contractors', url: 'https://www.sos.nd.gov/business/licensing-registration/contractors' },
      { label: 'North Dakota Attorney General: hiring a contractor', url: 'https://attorneygeneral.nd.gov/consumer-resources/hiring-a-contractor/' },
      { label: 'N.D. Century Code ch. 43-07 (contractors)', url: 'https://ndlegis.gov/cencode/t43c07.pdf' },
      { label: 'N.D. Century Code ch. 26.1-39.2 (residential contractor contracts)', url: 'https://ndlegis.gov/cencode/t26-1c39-2.pdf' },
      {
        label: 'North Dakota Insurance Department: contractor scams after storms',
        url: 'https://www.insurance.nd.gov/news/beware-contractor-scams-and-fraud-following-recent-storms-godfread-says',
      },
      { label: 'North Dakota State Electrical Board: license lookup', url: 'https://www.ndseb.com/search-1/lookup-a-licensedorregistered-electrician/' },
      { label: 'City of Fargo: selecting a contractor', url: 'https://fargond.gov/city-government/departments/inspections/selecting-a-contractor' },
      { label: 'City of Bismarck: mechanical installers', url: 'https://www.bismarcknd.gov/1729/Mechanical-Installers' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'wyoming',
    code: 'WY',
    name: 'Wyoming',
    generalContractors: 'local-only',
    short: 'Wyoming has no state contractor license; the state licenses electricians.',
    summary:
      'Wyoming has no state general contractor license, so cities and counties such as Cheyenne and Casper license contractors and trades under their own rules. Electrical work is different: electricians and electrical contractors need a state license from the Department of Fire Prevention and Electrical Safety, run by the State Fire Marshal.',
    boards: [
      {
        name: 'Wyoming Department of Fire Prevention and Electrical Safety (State Fire Marshal)',
        licenses: 'Electrical contractors, master and journeyman electricians, electrical technicians and registered apprentices statewide',
        lookupUrl: 'https://wsfm.wyo.gov/',
        lookupNote: 'Use the Public Portal and Look Up link on the State Fire Marshal’s home page to check an electrical license.',
        website: 'https://wsfm.wyo.gov/electrical-safety/licensing',
      },
      {
        name: 'City of Cheyenne Building Permitting and Licensing',
        licenses: 'Contractor companies and their qualified supervisors for building and trade work in Cheyenne',
        lookupUrl: 'https://www.cheyennecity.org/Your-Government/Departments/Compliance-Department/Building-Permitting-Licensing',
        lookupNote:
          'Follow the link on this page to the city’s OpenGov portal, choose Search, and look up contractor licensing. A company license is valid only together with an individual Qualified Supervisor license.',
        website: 'https://www.cheyennecity.org/Your-Government/Departments/Compliance-Department/Building-Permitting-Licensing',
      },
      {
        name: 'City of Casper Building Inspection Division',
        licenses: 'General contractors and subcontractors, plumbing, mechanical and electrical contractors working in Casper',
        lookupUrl: 'https://www.casperwy.gov/services/building_and_inspections/contractor_licensing/index.php',
        lookupNote:
          'Open the newest Licensed Contractors PDF on this page and check its date. It shows each license’s class, number and renewal status.',
        website: 'https://www.casperwy.gov/services/building_and_inspections/index.php',
      },
    ],
    whenRequired: [
      'Building, remodeling, plumbing and mechanical licenses are local, so ask the city or county where the work is done.',
      'Electrical work must be done by a state-licensed electrical contractor using licensed master or journeyman electricians, or registered apprentices they supervise.',
      'Owners may do their own wiring on property they own or lease that isn’t for immediate resale, but the work must still meet code and may need a wiring permit.',
      'Since July 1, 2024, a city or county that licenses contractors must accept an active license of the same type from another Wyoming city or county if the contractor meets conditions, such as passing an ICC or equivalent exam.',
    ],
    howToCheck: [
      'Ask the contractor which city or county license they hold, and for the license number.',
      'In Cheyenne, search contractor licensing in the city’s OpenGov portal, linked from the Building Permitting and Licensing page.',
      'In Casper, find the contractor on the newest Licensed Contractors list on the city’s Contractor Licensing page.',
      'For electrical work, check the electrician and the electrical contractor in the State Fire Marshal’s Public Portal and Look Up.',
      'Elsewhere, ask your city or county building department whether it licenses contractors, and make sure the needed permits are pulled before work starts.',
    ],
    watchFor: [
      'Wyoming lien law requires contractors to give you written notices about lien rights. Keep every notice, and ask for lien waivers so subcontractors and suppliers are paid and can’t put a lien on your home.',
    ],
    faq: [
      {
        q: 'Does Wyoming have a state contractor license?',
        a: 'No. Wyoming doesn’t issue a state general contractor license. Cities and counties license contractors, but electricians and electrical contractors need a state license.',
      },
      {
        q: 'How do I check an electrician’s license in Wyoming?',
        a: 'Use the Public Portal and Look Up on the Wyoming State Fire Marshal’s website. Check both the electrician and the electrical contractor they work for.',
      },
      {
        q: 'Can I do my own electrical work in Wyoming?',
        a: 'State law waives the electrical license for owners wiring property they own or lease that isn’t for immediate resale. You still have to meet code, and you may need a wiring permit.',
      },
      {
        q: 'Is a Cheyenne contractor license valid in Casper?',
        a: 'Not automatically. Since July 1, 2024, a city or county that licenses contractors must accept a same-type license from another Wyoming city or county if the contractor meets certain conditions, but the contractor may still have to apply.',
      },
    ],
    sources: [
      { label: 'Wyoming State Fire Marshal: electrical licensing', url: 'https://wsfm.wyo.gov/electrical-safety/licensing' },
      { label: 'Wyoming State Fire Marshal: wiring permits', url: 'https://wsfm.wyo.gov/electrical-safety/wiring-permits-1' },
      {
        label: 'Wyoming Statutes: Department of Fire Prevention and Electrical Safety',
        url: 'https://wyoleg.gov/NXT/gateway.dll/2025%20Wyoming%20Statutes/2025%20Titles/1921/1996/1997',
      },
      { label: 'Wyoming 2024 Enrolled Act 37 (contractor license recognition)', url: 'https://wyoleg.gov/2024/Enroll/SF0114.pdf' },
      { label: 'Wyoming Statutes Title 29 (liens)', url: 'https://wyoleg.gov/statutes/compress/title29.pdf' },
      {
        label: 'City of Cheyenne: Building Permitting and Licensing',
        url: 'https://www.cheyennecity.org/Your-Government/Departments/Compliance-Department/Building-Permitting-Licensing',
      },
      {
        label: 'City of Casper: contractor licensing',
        url: 'https://www.casperwy.gov/services/building_and_inspections/contractor_licensing/index.php',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'washington-dc',
    code: 'DC',
    name: 'Washington, DC',
    generalContractors: 'state',
    short: 'DC’s DLCP licenses home improvement and general contractors, plus electricians and plumbers.',
    summary:
      'The DC Department of Licensing and Consumer Protection (DLCP) licenses home improvement contractors, general contractors and construction managers, and its Board of Industrial Trades licenses electricians, plumbers and other trades. Home improvement contractors must post a $25,000 surety bond and have a licensed home improvement salesperson.',
    boards: [
      {
        name: 'DC Department of Licensing and Consumer Protection (DLCP): business licensing',
        licenses:
          'Business licenses for home improvement contractors, home improvement salespersons, and general contractors and construction managers (Classes A, B, C, G and H)',
        lookupUrl: 'https://boss.dc.gov/',
        lookupNote:
          'DLCP moved business licensing to BOSS in August 2026. Choose Global Search under Search, and search by business or person name, address or license number.',
        website: 'https://dlcp.dc.gov/page/contractor-and-construction-services',
      },
      {
        name: 'DC Board of Industrial Trades (DLCP)',
        licenses:
          'Electricians, plumbers and gasfitters, refrigeration and air conditioning mechanics, asbestos workers, steam and operating engineers, and elevator trades',
        lookupUrl: 'https://dlcp.dc.gov/page/board-industrial-trades-0',
        lookupNote: 'Use the Verify an Occupational/Professional License link on this page.',
        website: 'https://dlcp.dc.gov/service/occupational-and-professional-licensing-opl',
      },
    ],
    whenRequired: [
      'Home improvement contractors need a Home Improvement Contractor license and at least one licensed home improvement salesperson. To get the license, they must post a $25,000 surety bond and carry liability insurance.',
      'General contractors and construction managers are licensed by class, based on the value of a single contract: Class H up to $500,000, Class G up to $2 million, Class C up to $5 million, Class B up to $10 million, and Class A with no limit.',
      'Electrical, plumbing and gasfitting, and refrigeration and air conditioning work needs a Board of Industrial Trades license. Subcontractors need their own business license and can’t work under the general contractor’s.',
      'DLCP treats unlicensed home improvement work as a violation of DC’s consumer protection law.',
    ],
    howToCheck: [
      'Ask for the company’s legal name, its business license number and the name of its home improvement salesperson.',
      'Search the business in BOSS and confirm the license is active and is a home improvement or general contractor license.',
      'For electrical, plumbing, gas or HVAC work, check the tradesperson’s own license through the Board of Industrial Trades’ license verification.',
      'Ask for proof of general liability insurance.',
      'Check each subcontractor too, because each one needs its own license.',
    ],
    watchFor: [
      'DLCP advises getting several estimates, having someone you trust review the contract, and paying in phases tied to project milestones after the first deposit.',
      'DLCP’s sample home improvement contract includes a notice of your right to cancel before midnight of the third business day after signing. Look for this notice in your contract.',
    ],
    faq: [
      {
        q: 'Does a contractor need a license to remodel my home in DC?',
        a: 'Yes. DLCP says all home improvement contractors must hold a Home Improvement Contractor license and have a licensed home improvement salesperson.',
      },
      {
        q: 'How do I check a contractor’s license in DC?',
        a: 'Search the business in DLCP’s BOSS system using Global Search. Make sure the license is active and is the right type for your job.',
      },
      {
        q: 'Who licenses electricians and plumbers in DC?',
        a: 'DLCP’s Board of Industrial Trades licenses electricians, plumbers and gasfitters, refrigeration and air conditioning mechanics and other trades.',
      },
      {
        q: 'Does a subcontractor need its own license in DC?',
        a: 'Yes. DLCP says the general contractor’s license doesn’t cover a subcontractor’s business, so each subcontractor needs its own license.',
      },
    ],
    sources: [
      { label: 'DC DLCP: contractor and construction services', url: 'https://dlcp.dc.gov/page/contractor-and-construction-services' },
      { label: 'DC DLCP: home improvement contractor requirements', url: 'https://dlcp.dc.gov/node/1618836' },
      {
        label: 'DC DLCP: mandatory insurance levels and claims support',
        url: 'https://dlcp.dc.gov/page/mandatory-insurance-levels-and-claims-support-0',
      },
      { label: 'DC DLCP: Board of Industrial Trades', url: 'https://dlcp.dc.gov/page/board-industrial-trades-0' },
      { label: 'DC DLCP: business licensing FAQs', url: 'https://dlcp.dc.gov/page/business-licensing-faqs' },
      {
        label: 'DC DLCP: tips for DC homeowners before you renovate',
        url: 'https://dlcp.dc.gov/release/you-renovate-revamp-essential-tips-dc-homeowners-summer',
      },
      {
        label: 'DC DLCP: BOSS frequently asked questions (August 2026)',
        url: 'https://dlcp.dc.gov/sites/default/files/public/BOSS%20Frequently%20Asked%20Questions%20-%20August%202026.pdf',
      },
      {
        label: 'DC DLCP: sample home improvement contract',
        url: 'https://dlcp.dc.gov/sites/default/files/dc/sites/DLCP/publication/attachments/Home%20Improvement%20Contract%20-%20Sample%20(Fillable)%20.pdf',
      },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'alaska',
    code: 'AK',
    name: 'Alaska',
    generalContractors: 'state',
    short: 'Alaska registers all paid construction contractors, including handymen, through CBPL.',
    summary:
      'Alaska’s Division of Corporations, Business and Professional Licensing (CBPL) registers all paid construction contractors and licenses electrical and mechanical administrators, while the Department of Labor and Workforce Development certifies individual electricians and plumbers. Every registered contractor must carry a bond and insurance, and handymen may only take projects of $10,000 or less.',
    boards: [
      {
        name: 'Alaska Division of Corporations, Business and Professional Licensing (CBPL)',
        licenses:
          'Construction contractor registrations (general, general with residential endorsement, specialty such as roofing, mechanical, and handyman) and electrical and mechanical administrator licenses',
        lookupUrl: 'https://www.commerce.alaska.gov/web/cbpl/ProfessionalLicensing/ProfessionalLicenseSearch.aspx',
        lookupNote:
          'Search by name or license number. Results show whether the license is current, its type, the owner and any past licensing action.',
        website: 'https://www.commerce.alaska.gov/web/cbpl/professionallicensing/constructioncontractors.aspx',
      },
    ],
    whenRequired: [
      'Anyone paid to do construction work must be registered with CBPL, bonded and insured, however small the job.',
      'A handyman registration covers only projects of $10,000 or less in total, including all labor and materials.',
      'A general contractor needs a residential endorsement to build new homes or to do residential remodeling worth more than 25% of the structure’s value.',
      'An electrical business must have a licensed electrical administrator, and a plumbing or heating business a licensed mechanical administrator. The electricians and plumbers doing the work need their own certificate of fitness from the Department of Labor and Workforce Development.',
    ],
    howToCheck: [
      'Ask for the contractor’s exact business name and CBPL registration number.',
      'Search CBPL’s professional license search. Confirm the registration is current and fits your job: handyman for projects of $10,000 or less, or specialty, mechanical, or general with a residential endorsement.',
      'For electrical, plumbing or heating work, ask who the business’s licensed electrical or mechanical administrator is and search that person too.',
      'Ask the contractor to show current proof of the bond and insurance that state law requires.',
      'Ask the electricians and plumbers on the job to show their certificate of fitness, which they must carry. There’s no online search for these, but the Department of Labor’s Mechanical Inspection Section (mi@alaska.gov) can confirm one.',
    ],
    watchFor: [
      'Some contractors say “licensed and insured” when they have only a business license and liability insurance. A CBPL registration comes with a bond, from $5,000 for handymen up to $25,000 for general contractors, and you can sue on that bond over improper work or breach of contract.',
      'If you buy goods or services of $10 or more at your home, or anywhere other than the seller’s place of business, Alaska law gives you five days to cancel, and the seller must tell you about this right.',
    ],
    faq: [
      {
        q: 'Do handymen need a license in Alaska?',
        a: 'Yes. Handymen must register with CBPL and carry a $5,000 bond and insurance. They can only take projects of $10,000 or less in total labor and materials.',
      },
      {
        q: 'What is a residential endorsement in Alaska?',
        a: 'It’s an add-on to a general contractor registration. A general contractor needs it to build new homes or to do residential remodeling worth more than 25% of the structure’s value.',
      },
      {
        q: 'How do I check an electrician or plumber in Alaska?',
        a: 'Search the electrical or plumbing business in CBPL’s license search. Individual electricians and plumbers hold a certificate of fitness from the Department of Labor and must carry it on the job, and the Mechanical Inspection Section can confirm one.',
      },
      {
        q: 'Do roofers need a license in Alaska?',
        a: 'Yes. Roofing is a specialty contractor trade in Alaska, so a roofer you pay must hold an active CBPL contractor registration with a bond and insurance.',
      },
    ],
    sources: [
      {
        label: 'Alaska CBPL: construction contractors',
        url: 'https://www.commerce.alaska.gov/web/cbpl/professionallicensing/constructioncontractors.aspx',
      },
      {
        label: 'Alaska CBPL: hiring a contractor',
        url: 'https://www.commerce.alaska.gov/web/cbpl/ProfessionalLicensing/ConstructionContractors/HiringaContractor.aspx',
      },
      {
        label: 'Alaska CBPL: construction contractor statutes and regulations (2023)',
        url: 'https://www.commerce.alaska.gov/web/portals/5/pub/contractorstatutes.pdf',
      },
      {
        label: 'Alaska CBPL: specialty contractor trades list',
        url: 'https://www.commerce.alaska.gov/web/Portals/5/pub/con4818_specialty%20contractor%20trades%20list.pdf',
      },
      { label: 'Alaska Department of Labor: plumbing and electrical', url: 'https://labor.alaska.gov/lss/plumbing_electrical.htm' },
      {
        label: 'Alaska Department of Labor: certificates of fitness statutes and regulations',
        url: 'https://labor.alaska.gov/lss/forms/cof-regs.pdf',
      },
      { label: 'Alaska Department of Labor: homeowner’s guide to hiring a contractor', url: 'https://labor.alaska.gov/lss/forms/Hiring_a_contractor.pdf' },
      { label: 'Alaska Department of Law: consumer protection laws', url: 'https://law.alaska.gov/department/civil/consumer/laws.html' },
    ],
    lastChecked: '2026-11-03',
  },
  {
    slug: 'vermont',
    code: 'VT',
    name: 'Vermont',
    generalContractors: 'state',
    short: 'Vermont’s OPR registers residential contractors for home jobs over $10,000.',
    summary:
      'Vermont doesn’t license general contractors, but since April 1, 2023, the Office of Professional Regulation (OPR) has required residential contractors to register for jobs over $10,000, and the Division of Fire Safety licenses electricians and plumbers. The Attorney General also keeps a public registry of people convicted of home improvement fraud.',
    boards: [
      {
        name: 'Vermont Office of Professional Regulation (OPR)',
        licenses: 'Residential contractor registration for jobs over $10,000, including building, remodeling, repair, roofing, painting, paving and weatherization',
        lookupUrl: 'https://sos.vermont.gov/opr/find-a-professional',
        lookupNote: 'Most searches work with just the name. Results show the registration type, status, dates and any discipline.',
        website: 'https://sos.vermont.gov/residential-contractors/homeowner-resources',
      },
      {
        name: 'Vermont Division of Fire Safety',
        licenses: 'Electricians and plumbers, plus certifications for oil burner installers and natural gas and propane installers',
        lookupUrl: 'https://data.vermont.gov/Government/DFS-Licensing-MasterList/cy8e-89cz/data',
        lookupNote:
          'This is the division’s master list of active licenses on Vermont’s open data site. Search by name to see the license type and expiration date.',
        website: 'https://firesafety.vermont.gov/licensing',
      },
    ],
    whenRequired: [
      'Residential contractors must register with OPR before contracting with a homeowner for work worth more than $10,000, including labor and materials.',
      'Covered work includes building, remodeling and repairing homes and buildings with four or fewer units, including roofing, painting, paving, weatherization, and heating, plumbing, electrical and solar work.',
      'Employees of a registered business don’t need their own registration, and neither do licensed tradespeople, engineers or architects working within their license.',
      'Electrical and plumbing work needs a Division of Fire Safety license, except for owners working on their own owner-occupied, freestanding single-family home. The exception doesn’t cover rentals.',
    ],
    howToCheck: [
      'Ask for the contractor’s exact business name and OPR registration number.',
      'Search OPR’s Find a Professional tool. Confirm the registration is active and look for any discipline.',
      'For electrical or plumbing work, look up the electrician or plumber by name in the Division of Fire Safety’s licensing master list.',
      'Search the Attorney General’s Home and Land Improvement Fraud Registry for the contractor’s name.',
      'Ask to see proof of insurance, and get a written contract before you pay a deposit.',
    ],
    watchFor: [
      'Jobs over $10,000 need a written contract signed before you pay a deposit or work starts. It must include the scope of work and how changes are handled, and any change must be in a signed writing.',
      'If a contractor sells you a job at your home, you can generally cancel until midnight of the third business day after signing, and the seller must give you a written cancellation notice.',
    ],
    faq: [
      {
        q: 'Does Vermont license general contractors?',
        a: 'No. Vermont doesn’t license general contractors, but residential contractors must register with OPR for jobs over $10,000. Electricians and plumbers are licensed separately by the Division of Fire Safety.',
      },
      {
        q: 'Does a contractor need to register for a job under $10,000 in Vermont?',
        a: 'No. OPR registration applies only above $10,000. Electrical and plumbing work still needs a licensed tradesperson, whatever the job size.',
      },
      {
        q: 'What is Vermont’s home improvement fraud registry?',
        a: 'The Attorney General keeps a public list of people and businesses convicted of home improvement fraud, or that settled civil fraud claims with the state. Search it before you hire anyone.',
      },
      {
        q: 'How do I report a problem with a Vermont contractor?',
        a: 'File a complaint with the Attorney General’s Consumer Assistance Program, or with OPR if the contractor is registered. Home improvement fraud is a crime, so also report suspected fraud to local police.',
      },
    ],
    sources: [
      { label: 'Vermont OPR: residential contractor FAQs', url: 'https://sos.vermont.gov/residential-contractors/residential-contractor-faqs' },
      { label: 'Vermont OPR: Find a Professional', url: 'https://sos.vermont.gov/opr/find-a-professional' },
      { label: '26 V.S.A. ch. 106 (residential contractors)', url: 'https://legislature.vermont.gov/statutes/fullchapter/26/106' },
      { label: 'Vermont Division of Fire Safety: trade licensing', url: 'https://firesafety.vermont.gov/licensing' },
      {
        label: 'Vermont Division of Fire Safety: licensing master list (open data)',
        url: 'https://data.vermont.gov/Government/DFS-Licensing-MasterList/cy8e-89cz/data',
      },
      { label: 'Vermont Attorney General: home improvements', url: 'https://ago.vermont.gov/home-improvements' },
      {
        label: 'Vermont Attorney General: Home and Land Improvement Fraud Registry',
        url: 'https://ago.vermont.gov/cap/home-and-land-improvement-fraud-registry',
      },
      { label: '9 V.S.A. § 2454 (home solicitation sales)', url: 'https://legislature.vermont.gov/statutes/section/09/063/02454' },
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
