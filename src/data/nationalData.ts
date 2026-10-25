export interface DistrictHotspot {
  id: string;
  name: string;
  state: string;
  category: 'Aspirational District' | 'Industrial Corridor' | 'Border / Hill District' | 'Tribal Belt';
  coordinates: [number, number]; // lat, lng
  population: string;
  mpiScore: number; // Multidimensional Poverty Index (0 to 1, higher = poorer)
  infrastructureDeficitScore: number; // 0 - 100
  citizenFeedbackVolume: number;
  unresolvedGrievanceRate: string;
  primaryLanguages: string[];
  topFeedbackCategory: string;
  keyGatiShaktiLayer: string;
  prioritizedProjectRecommendation: {
    title: string;
    scheme: string;
    estimatedCapex: string;
    beneficiaryPopulation: string;
    synergyWithGatiShakti: string;
    bricsParallels: string;
    priorityIndex: number;
  };
}

export const DISTRICT_HOTSPOTS: DistrictHotspot[] = [
  {
    id: 'DIST-01',
    name: 'Bastar',
    state: 'Chhattisgarh',
    category: 'Tribal Belt',
    coordinates: [19.07, 81.95],
    population: '1.41 Million',
    mpiScore: 0.43,
    infrastructureDeficitScore: 88,
    citizenFeedbackVolume: 14820,
    unresolvedGrievanceRate: '64%',
    primaryLanguages: ['Gondi', 'Halbi', 'Chhattisgarhi', 'Hindi'],
    topFeedbackCategory: 'All-Weather Bridges & Clean Water Micro-Grids',
    keyGatiShaktiLayer: 'Forest Right-of-Way & PMGSY Forest Village Roads',
    prioritizedProjectRecommendation: {
      title: 'Decentralized Solar-Powered Piped Water & 14 Submerged Culvert Upgrades',
      scheme: 'Jal Jeevan Mission (JJM) + PMGSY Tier IV',
      estimatedCapex: '₹84.6 Crore ($10.2M USD)',
      beneficiaryPopulation: '320,000 tribal residents',
      synergyWithGatiShakti: 'Aligns with Jagdalpur-Raipur economic corridor optical fiber and road expansion',
      bricsParallels: 'Parallels isolated indigenous settlements in the Brazilian Amazonas and South African Eastern Cape rural reserves',
      priorityIndex: 96.4
    }
  },
  {
    id: 'DIST-02',
    name: 'Nuh (Mewat)',
    state: 'Haryana',
    category: 'Aspirational District',
    coordinates: [28.11, 77.01],
    population: '1.09 Million',
    mpiScore: 0.32,
    infrastructureDeficitScore: 79,
    citizenFeedbackVolume: 22400,
    unresolvedGrievanceRate: '52%',
    primaryLanguages: ['Mewati', 'Hindi', 'Urdu'],
    topFeedbackCategory: 'Canal Irrigation Tail-End Access & Secondary Healthcare Outposts',
    keyGatiShaktiLayer: 'Western Dedicated Freight Corridor (WDFC) & Delhi-Mumbai Expressway Feeder',
    prioritizedProjectRecommendation: {
      title: 'Gurgaon-Nuh Multi-Modal Feeder Canal Revitalization & 100-Bed Sub-District Hospital',
      scheme: 'PM Krishi Sinchayee Yojana + Ayushman Bharat Infrastructure Mission',
      estimatedCapex: '₹142 Crore ($17.1M USD)',
      beneficiaryPopulation: '540,000 citizens',
      synergyWithGatiShakti: 'Cross-connects with Delhi-Mumbai Industrial Corridor logistics buffer zones',
      bricsParallels: 'Directly mirrors peri-urban settlement infrastructure stress in Gauteng (South Africa) and São Paulo outskirts',
      priorityIndex: 94.1
    }
  },
  {
    id: 'DIST-03',
    name: 'Kalahandi',
    state: 'Odisha',
    category: 'Aspirational District',
    coordinates: [19.91, 83.16],
    population: '1.58 Million',
    mpiScore: 0.39,
    infrastructureDeficitScore: 84,
    citizenFeedbackVolume: 18900,
    unresolvedGrievanceRate: '58%',
    primaryLanguages: ['Odia', 'Kalahandia Dialect', 'Kui'],
    topFeedbackCategory: 'Cold Storage Agro-Hubs & Check Dams for Drought Resilience',
    keyGatiShaktiLayer: 'Visakhapatnam-Raipur Economic Corridor (NH-26)',
    prioritizedProjectRecommendation: {
      title: '12 Solar Cold Storage Aggregation Nodes & Check Dam Network for Paddy/Pulses',
      scheme: 'Agriculture Infrastructure Fund (AIF) + PM-KUSUM Component C',
      estimatedCapex: '₹62 Crore ($7.5M USD)',
      beneficiaryPopulation: '410,000 smallholder farmers',
      synergyWithGatiShakti: 'Intermodal freight linkage with Dhamra & Visakhapatnam deepwater ports',
      bricsParallels: 'Corresponds with agricultural logistical cold-chain deficits in northeast Brazil and rural Yunnan (China)',
      priorityIndex: 92.7
    }
  },
  {
    id: 'DIST-04',
    name: 'Vidarbha (Yavatmal-Washim)',
    state: 'Maharashtra',
    category: 'Aspirational District',
    coordinates: [20.39, 78.12],
    population: '2.77 Million',
    mpiScore: 0.28,
    infrastructureDeficitScore: 76,
    citizenFeedbackVolume: 31200,
    unresolvedGrievanceRate: '47%',
    primaryLanguages: ['Marathi', 'Varhadi Dialect', 'Hindi'],
    topFeedbackCategory: 'Cotton Processing Agro-Logistics & Micro-Irrigation Power Feeder Separation',
    keyGatiShaktiLayer: 'Samruddhi Mahamarg (Nagpur-Mumbai Super Communication Expressway)',
    prioritizedProjectRecommendation: {
      title: 'Agricultural High-Voltage Feeder Separation & 6 Textile Processing Micro-Parks',
      scheme: 'Revamped Distribution Sector Scheme (RDSS) + PM MITRA Mega Textile Park',
      estimatedCapex: '₹210 Crore ($25.3M USD)',
      beneficiaryPopulation: '780,000 agrarian households',
      synergyWithGatiShakti: 'Immediate access ramps to Samruddhi Mahamarg cargo hubs reducing transit to JNPT port by 18 hours',
      bricsParallels: 'Parallels cotton and soya agrarian logistics modernization in Mato Grosso (Brazil)',
      priorityIndex: 91.2
    }
  },
  {
    id: 'DIST-05',
    name: 'Baramulla',
    state: 'Jammu & Kashmir',
    category: 'Border / Hill District',
    coordinates: [34.20, 74.34],
    population: '1.01 Million',
    mpiScore: 0.24,
    infrastructureDeficitScore: 73,
    citizenFeedbackVolume: 16400,
    unresolvedGrievanceRate: '49%',
    primaryLanguages: ['Kashmiri', 'Urdu', 'Pahari', 'Gojri'],
    topFeedbackCategory: 'Apple Controlled Atmosphere (CA) Storages & All-Weather Avalanche Shelters',
    keyGatiShaktiLayer: 'Udhampur-Srinagar-Baramulla Rail Link (USBRL)',
    prioritizedProjectRecommendation: {
      title: 'USBRL Railhead Direct Apple Cargo Terminal & 4 Snow-Avalanche Protective Tunnels',
      scheme: 'Mission Integrated Development of Horticulture (MIDH) + Bharatmala Pariyojana',
      estimatedCapex: '₹175 Crore ($21.1M USD)',
      beneficiaryPopulation: '360,000 orchardists and commuters',
      synergyWithGatiShakti: 'Integrates seamless refrigerated container trains directly from Baramulla to Azadpur Mandi, Delhi',
      bricsParallels: 'Mirrors high-altitude transit security challenges in northern Russian regions and the Caucasus',
      priorityIndex: 89.8
    }
  },
  {
    id: 'DIST-06',
    name: 'Chamba',
    state: 'Himachal Pradesh',
    category: 'Border / Hill District',
    coordinates: [32.55, 76.12],
    population: '0.52 Million',
    mpiScore: 0.22,
    infrastructureDeficitScore: 81,
    citizenFeedbackVolume: 12100,
    unresolvedGrievanceRate: '56%',
    primaryLanguages: ['Chambyali', 'Pahari', 'Hindi'],
    topFeedbackCategory: 'Landslide-Resilient Slope Protection & Mountain Broadband (BharatNet)',
    keyGatiShaktiLayer: 'Ravi River Hydroelectric Transmission Corridors & Border Roads Organization (BRO) Grid',
    prioritizedProjectRecommendation: {
      title: 'Geo-Synthetic Landslide Slope Stabilization & Micro-Hydro Village Mini-Grids',
      scheme: 'National Disaster Mitigation Fund (NDMF) + PM-DevINE Hill Infrastructure',
      estimatedCapex: '₹95 Crore ($11.4M USD)',
      beneficiaryPopulation: '180,000 mountain valley residents',
      synergyWithGatiShakti: 'Safeguards strategic hydropower corridors supplying northern national grid',
      bricsParallels: 'Directly mirrors mountainous infrastructure resilience in western China and the Urals',
      priorityIndex: 88.5
    }
  }
];

export interface CitizenFeedbackSimulation {
  id: string;
  sourceChannel: 'WhatsApp Voice Note' | 'Toll-Free IVR (1912)' | 'Feature Phone SMS' | 'CSC VLE Portal';
  language: string;
  citizenName: string;
  location: string;
  rawInput: string;
  englishTranslation: string;
  detectedEmotionUrgency: 'Emergency Critical' | 'High Public Distress' | 'Medium Priority' | 'Routine';
  extractedEntities: {
    assetType: string;
    defect: string;
    landmark: string;
    impactRadius: string;
  };
  gatiShaktiTriangulation: {
    layerMatched: string;
    responsibleAgency: string;
    gisConfidence: string;
    recommendedEscalation: string;
  };
}

export const SAMPLE_FEEDBACK_SIMULATIONS: CitizenFeedbackSimulation[] = [
  {
    id: 'FB-SIM-01',
    sourceChannel: 'WhatsApp Voice Note',
    language: 'Bhojpuri / Hindi',
    citizenName: 'Ramprasad Yadav (Verified via CSC token)',
    location: 'Rampur Kudra, Kaimur border, Bihar/UP',
    rawInput: 'हमार गांव के बड़का पुलिया तीन दिन से पानी में डूब गइल बा, स्कूल जाए वाला 200 लइकन के नाव से जाए के पड़त बा। बहुत डर लागत बा कि नाव पलट न जाए!',
    englishTranslation: 'The main culvert/bridge of our village has been submerged under floodwater for 3 days. Over 200 school children are forced to commute via unshielded wooden boats. We fear a catastrophic boat capsize!',
    detectedEmotionUrgency: 'Emergency Critical',
    extractedEntities: {
      assetType: 'Low-lying Box Culvert & Causeway',
      defect: 'Monsoon flooding & zero parapet safety wall',
      landmark: 'Kaimur drainage tributary connecting Kudra canal',
      impactRadius: '4 villages, 3,400 people, 200 school students'
    },
    gatiShaktiTriangulation: {
      layerMatched: 'PMGSY Rural Road Asset ID: BR-KM-0482',
      responsibleAgency: 'Rural Works Department (State) & PMGSY PIU',
      gisConfidence: '96.2% matching cadastral parcel',
      recommendedEscalation: 'Immediate SDRF boat deployment + Sanction 2-lane High Level Bridge under PMGSY Batch IV'
    }
  },
  {
    id: 'FB-SIM-02',
    sourceChannel: 'Toll-Free IVR (1912)',
    language: 'Tamil',
    citizenName: 'Meenakshi Sundaram (Self-employed artisan)',
    location: 'Sivaganga district, Tamil Nadu',
    rawInput: 'எங்கள் கிராமத்தில் உள்ள மின்கம்பி அறுந்து 4 நாட்களாக விழுந்து கிடக்கிறது. குழந்தைகள் பள்ளிக்கு செல்ல முடியவில்லை, குடிநீர் மோட்டாரும் இயங்கவில்லை.',
    englishTranslation: 'The overhead high-tension electrical wire snapped and has been lying exposed on the main lane for 4 days. Children cannot walk to school and the community water pump motor is paralyzed.',
    detectedEmotionUrgency: 'Emergency Critical',
    extractedEntities: {
      assetType: '11kV Rural Electric Distribution Feeder',
      defect: 'Snapped live wire, electrocution risk, water supply breakdown',
      landmark: 'Near Mariamman temple junction, Sivaganga rural feeder',
      impactRadius: '1,200 villagers, 1 community borewell'
    },
    gatiShaktiTriangulation: {
      layerMatched: 'TANGEDCO Rural Distribution Grid Layer / RDSS Asset Feeder',
      responsibleAgency: 'State Electricity Distribution Board (TANGEDCO)',
      gisConfidence: '99.4% substation match',
      recommendedEscalation: 'Dispatched automated SOS work order to Line Inspector with 3-hour SLA lockdown'
    }
  },
  {
    id: 'FB-SIM-03',
    sourceChannel: 'Feature Phone SMS',
    language: 'Bengali',
    citizenName: 'Anowar Hossain (Paddy farmer)',
    location: 'Basirhat, North 24 Parganas, West Bengal',
    rawInput: 'নদীর বাঁধ ভেঙে নোনা জল ঢুকে সব আমন ধানের জমি নষ্ট হয়ে যাচ্ছে। অবিলম্বে বাঁধ মেরামত করা দরকার।',
    englishTranslation: 'The river embankment has breached, saline tidal water is gushing in and destroying all Aman paddy fields. Immediate embankment reinforcement is urgently required.',
    detectedEmotionUrgency: 'Emergency Critical',
    extractedEntities: {
      assetType: 'Earthen Riverine Flood Protection Embankment',
      defect: 'Saline water intrusion breach during spring tide',
      landmark: 'Ichamati-Rayamangal estuarine confluence, Sundarbans fringe',
      impactRadius: '650 acres of agricultural land, 850 farm families'
    },
    gatiShaktiTriangulation: {
      layerMatched: 'Irrigation & Waterways Department Coastal Embankment Asset Layer',
      responsibleAgency: 'State Irrigation Dept & National Cyclone Risk Mitigation Project (NCRMP)',
      gisConfidence: '94.8% satellite SAR match',
      recommendedEscalation: 'Geo-tube armoring and emergency sandbag deployment; long-term mangrove buffer zone'
    }
  },
  {
    id: 'FB-SIM-04',
    sourceChannel: 'CSC VLE Portal',
    language: 'Marathi',
    citizenName: 'Sunita Gaikwad (Self-Help Group President)',
    location: 'Buldhana, Vidarbha, Maharashtra',
    rawInput: 'आमच्या प्राथमिक आरोग्य केंद्रात वीज खंडित झाल्यावर लसी ठेवण्यासाठी रेफ्रिजरेटर बंद पडतो. सोलर पॅनल व बॅटरी बसवावी.',
    englishTranslation: 'At our Primary Health Sub-Centre, during frequent power outages the vaccine refrigerator shuts down. Please install solar panels and battery backup.',
    detectedEmotionUrgency: 'High Public Distress',
    extractedEntities: {
      assetType: 'Primary Health Sub-Centre (PHC) Cold Chain Refrigerator',
      defect: 'Unscheduled load shedding spoiling child immunizations',
      landmark: 'PHC Deulgaon Raja block',
      impactRadius: '14,000 population across 8 gram panchayats'
    },
    gatiShaktiTriangulation: {
      layerMatched: 'National Health Mission Health Infrastructure GIS + PM-KUSUM Off-grid Solar',
      responsibleAgency: 'District Health Officer (Zilla Parishad) & MNRE Solar Mission',
      gisConfidence: '98.1% PHC registry code match',
      recommendedEscalation: 'Sanction 5 kW Hybrid Solar Cold-Chain micro-inverter with 48h lithium storage under 15th Finance Commission untied grants'
    }
  }
];

export const BRICS_PARTNER_DATA = [
  {
    country: 'India (Anchor)',
    population: '1.43 Billion',
    dominantDPI: 'Aadhaar, UPI, Bhashini, PM GatiShakti, DigiLocker, ONDC',
    pilotFocus: 'Multilingual oral grievance aggregation across 22 scheduled languages and Aspirational Districts.',
    fundingSynergy: 'Union Capex + NITI Aayog Aspirational Districts + NDB sovereign lending'
  },
  {
    country: 'Brazil',
    population: '215 Million',
    dominantDPI: 'PIX (Instant Payments), Gov.br Unified Portal, Cadastro Único',
    pilotFocus: 'Voice-enabled ingestion for Quilombola, Favela, and Amazonian indigenous communities in Portuguese and Tupian dialects.',
    fundingSynergy: 'BNDES (Brazilian Development Bank) & New Development Bank Amazon Fund'
  },
  {
    country: 'South Africa',
    population: '60 Million',
    dominantDPI: 'GovChat, SASSA Social Grants, SARS eFiling, Open Data Portal',
    pilotFocus: 'Citizen-led municipal service backlog tracking in townships across 11 official languages (isiZulu, isiXhosa, Afrikaans, Sesotho).',
    fundingSynergy: 'DBSA (Development Bank of Southern Africa) + NDB Green Transition Facility'
  },
  {
    country: 'Russia',
    population: '144 Million',
    dominantDPI: 'Gosuslugi Unified Public Services Portal, Mir Payment System, SBP',
    pilotFocus: 'Extreme climate permafrost infrastructure sensor & remote Siberian citizen feedback triangulation.',
    fundingSynergy: 'VEB.RF National Development Corporation & BRICS Infrastructure Facility'
  },
  {
    country: 'China',
    population: '1.41 Billion',
    dominantDPI: 'Digital Yuan (e-CNY), National Government Service Platform, Geospatial Beidou Masterplan',
    pilotFocus: 'Rural Western Revitalization demand-response infrastructure coordination across multi-dialect regions.',
    fundingSynergy: 'China Development Bank (CDB) & Asian Infrastructure Investment Bank (AIIB)'
  },
  {
    country: 'Egypt & Ethiopia',
    population: '235 Million combined',
    dominantDPI: 'Fayda ID (Ethiopia - MOSIP based), Digital Egypt Platform, InstaPay',
    pilotFocus: 'Nile Basin rural water resource distribution & drought feedback in Arabic, Amharic, Oromo, and Tigrinya.',
    fundingSynergy: 'African Development Bank (AfDB) & BRICS New Development Bank expansion window'
  }
];
