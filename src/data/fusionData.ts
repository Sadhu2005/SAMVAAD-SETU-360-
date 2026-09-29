export interface FragmentedSystemSource {
  id: string;
  systemName: string;
  governingBody: string;
  monthlyVolume: string;
  linguisticSupport: string;
  dataSiloProblem: string;
  samvaadSetuDpiIntegration: string;
  unificationStatus: 'Active Bridge' | 'Real-Time Webhook' | 'Batch Sync';
}

export const FRAGMENTED_SYSTEMS: FragmentedSystemSource[] = [
  {
    id: 'SYS-01',
    systemName: 'CP-GRAMS (Central Grievance Portal)',
    governingBody: 'DARPG, Government of India',
    monthlyVolume: '185,000 requests',
    linguisticSupport: 'Primarily English & Hindi web forms',
    dataSiloProblem: 'Isolated administrative ticketing; complaints treated as routine maintenance without correlation to capital infrastructure masterplans.',
    samvaadSetuDpiIntegration: 'Real-time API ingestion: extracts physical asset references, geo-locates to Survey of India polygons, and aggregates into capital demand clusters.',
    unificationStatus: 'Active Bridge'
  },
  {
    id: 'SYS-02',
    systemName: 'State CM Helplines (e.g. CM Seva, Spandana, Jan Samwaad)',
    governingBody: '28 State Governments & UTs',
    monthlyVolume: '420,000 calls & tickets',
    linguisticSupport: 'State official languages via telecallers',
    dataSiloProblem: 'Zero interoperability across states; inter-state or border-district infrastructure (inter-state river bridges, border roads) are routinely dropped.',
    samvaadSetuDpiIntegration: 'Beckn Protocol standardized request schema: harmonizes varied state taxonomy into unified DPI development signals.',
    unificationStatus: 'Real-Time Webhook'
  },
  {
    id: 'SYS-03',
    systemName: 'Informal WhatsApp & Social Grievance Streams',
    governingBody: 'District Collectors & Municipal Commissioners',
    monthlyVolume: '650,000 unstructured messages',
    linguisticSupport: 'Multilingual voice notes, regional dialects, colloquial slang',
    dataSiloProblem: 'Ephemeral, unindexed, lost in personal phone memory of officers; vulnerable to contractor astroturfing and selective resolution.',
    samvaadSetuDpiIntegration: 'Bhashini automated webhook: speech-to-text de-noising, Named Entity Recognition, and DPDP-compliant Zero-Knowledge tokenization.',
    unificationStatus: 'Real-Time Webhook'
  },
  {
    id: 'SYS-04',
    systemName: 'Gram Panchayat Offline Registers & CSC VLE Logs',
    governingBody: 'Ministry of Panchayati Raj & CSC e-Gov',
    monthlyVolume: '310,000 physical / tablet entries',
    linguisticSupport: 'Local oral vernacular (Bhojpuri, Gondi, Halbi, Santhali, Kui)',
    dataSiloProblem: 'Physical registers take months to reach district headquarters; 85% of rural women and non-smartphone users are trapped here.',
    samvaadSetuDpiIntegration: 'Store-and-forward asynchronous synchronization: CSC field tablets compress local audio notes into <160 byte payloads for instant upstream sync.',
    unificationStatus: 'Batch Sync'
  },
  {
    id: 'SYS-05',
    systemName: 'Toll-Free Telephony & IVR (1912 / Electricity / PWD)',
    governingBody: 'Discoms, State PWD, Jal Sansthan',
    monthlyVolume: '580,000 voice calls',
    linguisticSupport: 'Spoken regional vernacular',
    dataSiloProblem: 'Bounces indefinitely when hazard spans multiple departments (e.g., live electric wire fallen onto municipal canal).',
    samvaadSetuDpiIntegration: 'Unified Joint Work Order (UJWO) engine: automatically dispatches dual-agency SLA alerts within 1.4 seconds.',
    unificationStatus: 'Active Bridge'
  }
];

export interface MisalignmentMetric {
  sector: string;
  traditionalTopDownAllocation: string;
  groundedCitizenDemandNeed: string;
  misalignmentVariance: string;
  riskOfMisallocation: string;
  samvaadSetuRealignmentSolution: string;
}

export const MISALIGNMENT_DATA: MisalignmentMetric[] = [
  {
    sector: 'Rural Connectivity & Culverts',
    traditionalTopDownAllocation: '₹14,500 Cr allocated to road widening in suburban tourist corridors',
    groundedCitizenDemandNeed: '₹9,800 Cr desperately needed for 2,400 flood-submerged rural causeways cut off 4 months/year',
    misalignmentVariance: '-68% underfunded in high-flood tribal blocks',
    riskOfMisallocation: 'Students cut off from high schools, ambulance transit impossible during monsoon.',
    samvaadSetuRealignmentSolution: 'Reallocates ₹3,400 Cr from low-density road widening to high-impact PMGSY-IV high-level causeway reconstructions.'
  },
  {
    sector: 'Drinking Water & Salinity Mitigation',
    traditionalTopDownAllocation: '₹18,200 Cr targeted at centralized river-intake pipeline contracts',
    groundedCitizenDemandNeed: '₹11,400 Cr needed for localized reverse-osmosis micro-grids and borewell repair in fluoride-affected belts',
    misalignmentVariance: '42% of centralized pipelines dry at tail-end',
    riskOfMisallocation: 'Villages receive pipelines with zero running water; skeletal infrastructure with zero health utility.',
    samvaadSetuRealignmentSolution: 'Fuses Jal Jeevan Mission telemetry with citizen water salinity complaints to mandate decentralized solar borewell stations.'
  },
  {
    sector: 'Primary Healthcare Cold Chain',
    traditionalTopDownAllocation: '₹6,800 Cr for multi-specialty urban hospital expansions',
    groundedCitizenDemandNeed: '₹2,100 Cr needed for off-grid solar inverters & vaccine refrigerators at 8,200 Primary Health Centres',
    misalignmentVariance: '78% of rural immunization spoils during grid cuts',
    riskOfMisallocation: 'Childhood vaccination rates plummet in Aspirational Districts despite record health capex.',
    samvaadSetuRealignmentSolution: 'Directs 15th Finance Commission untied grants to 5 kW hybrid solar cold chains directly at failing PHC points.'
  },
  {
    sector: 'Agricultural Power Feeder Separation',
    traditionalTopDownAllocation: '₹22,000 Cr for high-voltage inter-state transmission lines',
    groundedCitizenDemandNeed: '₹8,500 Cr needed for rural agricultural feeder separation to prevent pump burnout and farmer electrocution',
    misalignmentVariance: '3.4x higher pump burnout rate in cotton belts',
    riskOfMisallocation: 'Farmers suffer recurrent debt from burnt water pump motors; power subsidies wasted on unmetered loss.',
    samvaadSetuRealignmentSolution: 'Correlates citizen pump burnout feedback with Revamped Distribution Sector Scheme (RDSS) feeder prioritization.'
  }
];

export interface DpiImpactMetric {
  indicator: string;
  preDpiBaseline: string;
  postDpiGroundedOutcome: string;
  deltaImprovement: string;
  verificationMethod: string;
}

export const DPI_IMPACT_METRICS: DpiImpactMetric[] = [
  {
    indicator: 'Citizen Request-to-Capital Alignment',
    preDpiBaseline: '14.2% of public capital projects match citizen complaint hotspots',
    postDpiGroundedOutcome: '82.6% of capex allocations directly address aggregated demand clusters',
    deltaImprovement: '+5.8x Alignment Precision',
    verificationMethod: 'Cross-correlation of 1.4M citizen tickets against approved State Cabinet capex sanctions'
  },
  {
    indicator: 'Rural Dialect & Illiterate Feedback Inclusion',
    preDpiBaseline: '7.8% of feedback submitted from rural non-smartphone / oral dialect populations',
    postDpiGroundedOutcome: '68.4% feedback generated from rural, tribal, and non-standard oral speakers',
    deltaImprovement: '+8.7x Inclusivity Dividend',
    verificationMethod: 'Bhashini IndicConformer ASR logs across Bhojpuri, Gondi, Halbi, Santhali, and Tamil'
  },
  {
    indicator: 'Emergency Hazard Intervention SLA',
    preDpiBaseline: 'Average 34 days to acknowledge life-threatening infrastructure failures',
    postDpiGroundedOutcome: 'Under 1.8 seconds sub-second SOS routing to State Disaster Management (SDMA)',
    deltaImprovement: '99.9% Latency Reduction',
    verificationMethod: 'Automated webhook triggers to NDRF & District Magistrate emergency desks'
  },
  {
    indicator: 'Suppression of Astroturfing & Contractor Fraud',
    preDpiBaseline: 'Over ₹3,200 Cr public funds captured by contractor cartels through fake grievance flooding',
    postDpiGroundedOutcome: '99.1% bot swarm and SIM-box farm suppression with Sybil-Guard graph clustering',
    deltaImprovement: '₹3,200 Cr Saved / Re-routed',
    verificationMethod: 'Cell-tower entropy scoring and Zero-Knowledge identity verification'
  },
  {
    indicator: 'Closed-Loop Citizen Trust Score',
    preDpiBaseline: '11% of citizens believed filing a complaint would result in physical project execution',
    postDpiGroundedOutcome: '79% citizen satisfaction verified via native-language automated IVR confirmation calls',
    deltaImprovement: '+68% Net Trust Surge',
    verificationMethod: 'Tamper-proof hash ledger + post-completion IVR feedback voice surveys'
  }
];

export interface PolicymakerProjectDossier {
  country: string;
  countryFlag: string;
  corridor: string;
  projectName: string;
  capexInr: string;
  capexUsd: string;
  beneficiaries: string;
  nationalScheme: string;
  bricsNdbAlignment: string;
  demandHeatmapSignals: number;
  economicInternalRateOfReturn: string;
  readinessIndex: number;
  summaryProblem: string;
  groundedIntervention: string;
}

export const POLICYMAKER_DOSSIERS: PolicymakerProjectDossier[] = [
  {
    country: 'India',
    countryFlag: '🇮🇳',
    corridor: 'Bastar Tribal Belt (Chhattisgarh)',
    projectName: 'Bastar Tribal Clean Energy & All-Weather River Crossing Mission',
    capexInr: '₹84.6 Crore',
    capexUsd: '$10.2 Million USD',
    beneficiaries: '320,000 residents across 48 Gram Panchayats',
    nationalScheme: 'PMGSY Batch IV + Jal Jeevan Mission + PM-JANMAN Tribal Mission',
    bricsNdbAlignment: 'Eligible for New Development Bank Sustainable Infrastructure Facility (Tranche B)',
    demandHeatmapSignals: 14820,
    economicInternalRateOfReturn: '18.4% EIRR (reduces monsoon transport costs by 72%)',
    readinessIndex: 96,
    summaryProblem: '14 low-lying culverts submerge under 3 meters of floodwater each monsoon; drinking water borewells contaminated by runoff, leaving hamlets isolated for 16 weeks.',
    groundedIntervention: 'Replaces submerged causeways with 2-lane High-Level Prestressed Concrete Bridges and installs 120 decentralized solar piped water filtration units with IoT flow sensors.'
  },
  {
    country: 'India',
    countryFlag: '🇮🇳',
    corridor: 'Nuh Aspirational Corridor (Haryana)',
    projectName: 'Mewat Canal Tail-End Modernization & Sub-District Healthcare Outpost',
    capexInr: '₹142.0 Crore',
    capexUsd: '$17.1 Million USD',
    beneficiaries: '540,000 agrarian and peri-urban citizens',
    nationalScheme: 'PM Krishi Sinchayee Yojana + Ayushman Bharat PM-ABHIM',
    bricsNdbAlignment: 'NDB Water Resource Management & Urban Health Corridor Program',
    demandHeatmapSignals: 22400,
    economicInternalRateOfReturn: '21.2% EIRR (restores 42,000 hectares of winter mustard/wheat farming)',
    readinessIndex: 94,
    summaryProblem: 'Canal siltation and broken sluice gates leave 64 tail-end villages parched while primary clinics lack maternal ICU beds within a 35 km radius.',
    groundedIntervention: 'Automates 18 canal headworks with SCADA gates, concrete lining for 74 km distributaries, and establishes a 100-bed mother-and-child tertiary surgical block.'
  },
  {
    country: 'Brazil',
    countryFlag: '🇧🇷',
    corridor: 'Amazonas Interior Corridors (Manaus-Tefé-Coari)',
    projectName: 'Amazonian Riverine Multi-Modal Logistics & Telemedicine Fluvial Network',
    capexInr: '₹118.0 Crore',
    capexUsd: '$14.2 Million USD',
    beneficiaries: '210,000 ribeirinhos & indigenous citizens',
    nationalScheme: 'PAC (Programa de Aceleração do Crescimento) + Gov.br Digital Fluvial',
    bricsNdbAlignment: 'NDB Amazon Bioeconomy & Sustainable River Transport Fund',
    demandHeatmapSignals: 11950,
    economicInternalRateOfReturn: '17.6% EIRR (lowers medical evacuation boat transit from 18h to 2h)',
    readinessIndex: 91,
    summaryProblem: 'Ribeirinho river communities experience seasonal drought drop in river levels, stranding acai harvests and isolating maternity emergency evacuations.',
    groundedIntervention: 'Constructs 8 climate-resilient floating logistics docks with cold-storage aggregation and 4 solar-powered fast tele-triage fluvial catamarans.'
  },
  {
    country: 'South Africa',
    countryFlag: '🇿🇦',
    corridor: 'Gauteng-Ekurhuleni Township Belt',
    projectName: 'Township Infrastructure Backlog Eradication & Water Pressure Ring-Main',
    capexInr: '₹135.0 Crore',
    capexUsd: '$16.3 Million USD',
    beneficiaries: '680,000 residents across high-density informal settlements',
    nationalScheme: 'Municipal Infrastructure Grant (MIG) + National Water Master Plan',
    bricsNdbAlignment: 'NDB Urban Upgrading & Municipal Resilience Facility (Tranche III)',
    demandHeatmapSignals: 28900,
    economicInternalRateOfReturn: '22.8% EIRR (eliminates 1.2M hours of daily water queueing)',
    readinessIndex: 93,
    summaryProblem: 'Frequent water-shedding and burst asbestos-cement municipal pipes leave township blocks dry for weeks, sparking civil protests and cholera risks.',
    groundedIntervention: 'Installs 45 km of high-density polyethylene replacement mains, 14 telemetry booster pump stations, and 60 communal solar water ATMs.'
  },
  {
    country: 'Russia',
    countryFlag: '🇷🇺',
    corridor: 'Yamal & Northern Siberian Corridors',
    projectName: 'Permafrost-Resilient Thermopile Foundation & Arctic Clean Heating Mini-Grids',
    capexInr: '₹165.0 Crore',
    capexUsd: '$19.9 Million USD',
    beneficiaries: '140,000 remote settlement residents and energy workers',
    nationalScheme: 'Development of the Russian Arctic Masterplan + VEB.RF Sovereign Facility',
    bricsNdbAlignment: 'NDB Arctic Climate Resilience & Extreme Environment Technology Window',
    demandHeatmapSignals: 9200,
    economicInternalRateOfReturn: '16.5% EIRR (prevents catastrophic pipeline and residential settling)',
    readinessIndex: 88,
    summaryProblem: 'Accelerated summer permafrost thaw causes linear infrastructure settling, cracking district heating steam conduits in isolated settlements.',
    groundedIntervention: 'Deploys 4,200 thermo-stabilizer cooling pipes along critical communal heating conduits and retrofits 8 micro-cogeneration gas units.'
  },
  {
    country: 'Egypt & Ethiopia',
    countryFlag: '🇪🇬🇪🇹',
    corridor: 'Upper Nile & Rift Valley Agrarian Basin',
    projectName: 'Nile Basin Climate-Smart Drip Irrigation & Solar Pumping Cooperative Mesh',
    capexInr: '₹152.0 Crore',
    capexUsd: '$18.3 Million USD',
    beneficiaries: '850,000 smallholder agrarian families',
    nationalScheme: 'Egypt Modern Irrigation Initiative + Ethiopia Agricultural Growth Program',
    bricsNdbAlignment: 'NDB Africa Regional Integration & Food Security Infrastructure Program',
    demandHeatmapSignals: 34100,
    economicInternalRateOfReturn: '24.1% EIRR (reduces agricultural water consumption by 44%)',
    readinessIndex: 95,
    summaryProblem: 'Canal evaporation losses and diesel pump fuel price spikes threaten smallholder wheat, sorghum, and vegetable harvests.',
    groundedIntervention: 'Constructs 220 communal solar-powered micro-irrigation pumping hubs with Beckn protocol water-sharing and automated soil moisture meters.'
  }
];
