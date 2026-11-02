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
  /** One paragraph shown at the top of the page and in search results. */
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
];

export function stateBySlug(slug: string): StateGuide | undefined {
  return STATES.find((s) => s.slug === slug);
}
