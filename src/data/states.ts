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
];

export function stateBySlug(slug: string): StateGuide | undefined {
  return STATES.find((s) => s.slug === slug);
}
