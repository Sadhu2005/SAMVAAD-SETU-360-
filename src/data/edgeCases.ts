export interface EdgeCase {
  id: string;
  category: 'Linguistic' | 'Infrastructure' | 'Governance' | 'Security & Trust' | 'Socio-Economic';
  title: string;
  subTitle: string;
  severity: 'Critical' | 'High' | 'Medium';
  realIndiaScenario: string;
  traditionalFailureMode: string;
  aiDpiSolution: string;
  architectureComponents: string[];
  bricsRelevance: string;
  metrics: {
    mitigationSuccessRate: string;
    processingLatency: string;
    equityImpact: string;
  };
}

export const EDGE_CASES_DATA: EdgeCase[] = [
  {
    id: 'EC-01',
    category: 'Linguistic',
    title: 'Acoustic Degradation & Non-Standard Oral Dialects',
    subTitle: 'Handling vernacular spoken dialects with extreme background environmental noise',
    severity: 'Critical',
    realIndiaScenario: 'A farmer in Bundelkhand (Madhya Pradesh/UP border) leaves a voice note on a toll-free IVR while standing next to a thresher engine, speaking in Bundeli mixed with Hindi: "हमाए पुरवा में जो रपटा हतो, बाढ़ मा सब बह गयो, अब ट्रेक्टर निकर नइ पा रओ..." (The low-level causeway/culvert in our hamlet got completely washed away in the flood, now no tractor can pass).',
    traditionalFailureMode: 'Standard urban-trained speech-to-text engines (WER > 68%) hallucinate or discard the recording as garbled noise. In CP-GRAMS, citizens cannot type in oral dialects that lack standard Unicode typography, disenfranchising illiterate farmers.',
    aiDpiSolution: 'Bhashini-integrated Multi-Tier ASR Engine: (1) Spectral de-noising filtering low-frequency agricultural machinery acoustic profiles; (2) Phoneme-level acoustic model fine-tuned on Central Indian Indo-Aryan dialectal phonetic shifts; (3) Cross-lingual LLM semantic extraction identifying the core asset (submerged culvert/causeway), location (Purwa/hamlet), and urgency (agricultural transport paralysis).',
    architectureComponents: ['Bhashini IndicConformer ASR', 'Spectral Audio Denoising API', 'Contextual Dialect Lexicon', 'Toponym Normalizer'],
    bricsRelevance: 'Directly transferable to Brazil for Portuguese-indigenous oral dialects in the Amazon Basin, and South Africa for rural isiXhosa/isiZulu spoken feedback with high acoustic interference.',
    metrics: {
      mitigationSuccessRate: '94.2%',
      processingLatency: '1.4s',
      equityImpact: '+78% rural oral feedback inclusion'
    }
  },
  {
    id: 'EC-02',
    category: 'Infrastructure',
    title: 'Zero-Connectivity Hinterlands & Offline Traps',
    subTitle: 'Store-and-forward mesh for 2G, feature phones, and blackout zones',
    severity: 'Critical',
    realIndiaScenario: 'A tribal village in Bastar, Chhattisgarh experiences total cellular blackout due to forest canopy and damaged solar cell towers during monsoon. A severe drinking water contamination outbreak occurs due to a cracked borewell pipe near the community pond.',
    traditionalFailureMode: 'Cloud-dependent citizen apps (e.g. smartphone grievance apps) fail completely with zero network. Complaints cannot be queued or sent. Critical public health emergencies remain invisible to district magistrates for weeks.',
    aiDpiSolution: 'Three-Tier Asynchronous Ingestion Architecture: (1) USSD / 2G SMS store-and-forward micro-payload protocol (<160 bytes compressed); (2) Village Level Entrepreneur (CSC / ASHA) offline tablet app running local SQLite and quantized on-device embedding models, syncing opportunistic opportunistic Bluetooth/Wi-Fi packet exchange when rural transport buses visit weekly; (3) Missed-call automated IVR callback queue triggered the instant the citizen connects to a tower.',
    architectureComponents: ['Offline Beckn-Mesh Micro-Client', 'Quantized On-Device SLM', 'Delayed Tolerant Networking (DTN)', 'ASHA/CSC VLE Gateway'],
    bricsRelevance: 'Vital for remote Siberian settlements in Russia, desert rural areas in Egypt, and vast pastoral zones in Ethiopia with sporadic mobile coverage.',
    metrics: {
      mitigationSuccessRate: '98.5%',
      processingLatency: 'Async (<6h sync window)',
      equityImpact: '100% reach to tribal unconnected hamlets'
    }
  },
  {
    id: 'EC-03',
    category: 'Security & Trust',
    title: 'Astroturfing, Bot-Farms & Contractor Cartel Capture',
    subTitle: 'Preventing syndicates from artificially inflating public works demands to siphon funds',
    severity: 'Critical',
    realIndiaScenario: 'A local road contractor syndicate in an urban peri-urban belt scripts 4,500 automated WhatsApp messages and VoIP calls requesting a lucrative road widening and flyover project in an area where they already own adjacent commercial real estate and quarry equipment.',
    traditionalFailureMode: 'Naive aggregation algorithms that prioritize by raw request volume will flag this corridor as the #1 urgent infrastructure priority in the state, diverting crores of rupees away from genuine starving villages.',
    aiDpiSolution: 'Sybil-Resistant Temporal & Network Graph Analysis: (1) IMEI / SIM / IP entropy scoring; (2) Semantic variance detection (identifying LLM-generated template variations of the same request); (3) Telecom cell tower dispersion analysis (detecting thousands of calls originating from a single SIM box farm); (4) Citizen identity grounding via optional Aadhaar-verified DigiLocker credentials or local Gram Sabha quorum validation without storing personal tracking data.',
    architectureComponents: ['Sybil-Guard Graph Clustering', 'Stylometric Entropy Detector', 'Cell-Tower Triangulation Filter', 'DigiLocker Zero-Knowledge Verifier'],
    bricsRelevance: 'Crucial for curbing municipal procurement fraud and tender rigging in infrastructure projects across South Africa, Brazil, and Russian municipal zones.',
    metrics: {
      mitigationSuccessRate: '99.1% bot suppression',
      processingLatency: '450ms',
      equityImpact: 'Preserves ₹120M+ per district from predatory procurement'
    }
  },
  {
    id: 'EC-04',
    category: 'Socio-Economic',
    title: 'The "Vocal Tech Elite" Skew & Marginalized Silence',
    subTitle: 'Counteracting urban, male, and high-literacy feedback bias with Inverse Equity Weighting',
    severity: 'High',
    realIndiaScenario: 'In a mixed district in Karnataka, 80% of digital requests come from tech employees in district headquarters asking for park beautification and EV charging stations, while 0.1% come from Dalit/tribal women agricultural laborers who walk 4 km daily for firewood and clean water.',
    traditionalFailureMode: 'Democracy of the loudest: unweighted machine learning models deploy resources to vocal smartphone owners, exacerbating spatial inequality and leaving underserved communities in generational deprivation.',
    aiDpiSolution: 'Demographic-Inverse Equity Weighting (DIEW) Algorithm: Fuses NITI Aayog Multi-Dimensional Poverty Index (MPI), Census 2011/2026 caste/tribal vulnerability metrics, and female labor force participation indices with raw feedback volume. A single verified request from a high-MPI, low-connectivity hamlet receives a 12.5x algorithmic multiplier over urban cosmetic beautification requests.',
    architectureComponents: ['NITI Aayog MPI Data Pipe', 'Socio-Demographic Vulnerability Engine', 'Inverse Equity Multiplier Formula', 'Gender-Disaggregated Audit Dashboard'],
    bricsRelevance: 'Directly applicable to South Africa\'s Spatial Inequality Index in Johannesburg/Cape Town townships and Brazil\'s Favelas vs Plano Piloto disparities.',
    metrics: {
      mitigationSuccessRate: '96.7%',
      processingLatency: 'Real-time scoring',
      equityImpact: '+340% capex shift to historically neglected hamlets'
    }
  },
  {
    id: 'EC-05',
    category: 'Linguistic',
    title: 'Colloquial Toponyms & Vague Geospatial Descriptions',
    subTitle: 'Translating informal landmarks into precise GIS spatial polygons',
    severity: 'High',
    realIndiaScenario: 'A villager reports: "बड़का पीपल के पेड़ के पास जो पुराना पुलिया है, ओकर पाया धस गइल बा" (The old culvert near the big Peepal tree has its pillar sinking). There are 3,800 villages with the same name, and no formal GPS coordinates are provided.',
    traditionalFailureMode: 'System flags the complaint as "Insufficient Address / Incomplete Data" and rejects or closes it without action. The sinking bridge collapses during heavy school bus transit.',
    aiDpiSolution: 'Vernacular Toponym & Spatial Knowledge Graph Resolver: (1) Telecom tower CID (Cell ID) bounding box limits search radius to a 3-5 km polygon; (2) Survey of India & OpenStreetMap landmark entity matcher; (3) Cross-referencing PM GatiShakti GIS layer containing all registered culvert and bridge asset IDs within that cadastral boundary; (4) Automated conversational disambiguation prompt: "Is this the bridge over the Son river tributary near Rampur Upper?"',
    architectureComponents: ['PM GatiShakti 1400+ GIS Layers', 'Survey of India Spatial API', 'Vernacular Toponym Knowledge Graph', 'Disambiguation Chatflow'],
    bricsRelevance: 'Solves the unmapped rural address crisis across rural China, Brazilian interior municipalities, and vast African sub-Saharan settlements.',
    metrics: {
      mitigationSuccessRate: '91.8% coordinate resolution',
      processingLatency: '820ms',
      equityImpact: 'Zero discarded requests due to colloquial addresses'
    }
  },
  {
    id: 'EC-06',
    category: 'Governance',
    title: 'Inter-Departmental Ping-Pong & Jurisdictional Deadlocks',
    subTitle: 'Breaking silos between Central, State, Urban Local Bodies, and Panchayati Raj',
    severity: 'High',
    realIndiaScenario: 'A road approaching a railway level-crossing has craters 2 feet deep. The Gram Panchayat claims it is PWD road; State PWD claims it falls in Northern Railway right-of-way; Railways claims it is National Highway feeder. For 7 years, the grievance bounces between 4 departments while accidents multiply.',
    traditionalFailureMode: 'Grievance portals allow departments to click "Not Pertaining to this Department" and pass the buck indefinitely with zero accountability or collective resolution.',
    aiDpiSolution: 'Unified DPI Asset Registry & Smart Multi-Party Routing: Every geographic meter in the PM GatiShakti National Master Plan has an authoritative primary custodian and secondary stakeholders. The AI platform issues a Unified Joint Work Order (UJWO) with statutory inter-ministerial SLA clocks. If unassigned after 96 hours, it automatically escalates to the District Magistrate / Chief Secretary dashboard with automated escrow budget allocation.',
    architectureComponents: ['PM GatiShakti Master Ownership Matrix', 'Beckn Protocol Multi-Party Handshake', 'Smart Escalation SLA Engine', 'Chief Secretary Override Portal'],
    bricsRelevance: 'Solves federal vs provincial vs municipal jurisdictional paralysis in Brazil, Russia, and South Africa.',
    metrics: {
      mitigationSuccessRate: '97.4% routing accuracy',
      processingLatency: 'Automated instant routing',
      equityImpact: 'Average inter-agency ping-pong reduced from 210 days to 72 hours'
    }
  },
  {
    id: 'EC-07',
    category: 'Security & Trust',
    title: 'DPDP Act 2023 Compliance & Whistleblower Protection',
    subTitle: 'Preventing retaliatory violence against citizens exposing substandard public works',
    severity: 'Critical',
    realIndiaScenario: 'A rural youth records video of a contractor mixing 90% sand and 10% cement in a PMGSY road construction. When he logs a complaint, the contractor obtains his phone number from a corrupt lower-tier clerk and threatens the youth\'s family.',
    traditionalFailureMode: 'Standard government grievance systems display complainant name, phone number, and residential address in plain text to the local field engineer, resulting in severe physical retaliation and chilling civic participation.',
    aiDpiSolution: 'Zero-Knowledge Proofs & Differential Privacy Shield: (1) Client-side tokenization replaces PII with ephemeral cryptographic pseudo-identifiers; (2) Automated redaction of names, vehicle plates, face blurs in media attachments before department dispatch; (3) Open Digital Public Good demand heatmaps are published with k-anonymity (k>=50) and Laplace differential privacy noise to prevent location re-identification of individual whistleblowers.',
    architectureComponents: ['DPDP 2023 Compliance Engine', 'Zero-Knowledge Tokenizer', 'Auto-Media Redactor (Face/Audio blur)', 'Differential Privacy Heatmap Generator'],
    bricsRelevance: 'Aligns with LGPD in Brazil, POPIA in South Africa, and international OECD privacy guidelines for public sector digital goods.',
    metrics: {
      mitigationSuccessRate: '100% PII leak prevention',
      processingLatency: '<300ms redaction',
      equityImpact: '+65% increase in high-integrity corruption/quality reports'
    }
  },
  {
    id: 'EC-08',
    category: 'Infrastructure',
    title: 'Disaster, Flash-Flood & Structural Emergency Triage',
    subTitle: 'Sub-second interrupt for life-threatening infrastructural failure',
    severity: 'Critical',
    realIndiaScenario: 'During continuous monsoon rainfall in Himachal Pradesh, a hillside retaining wall supporting a mountain highway develops severe structural fissures with visible mudflow slipping toward a primary school.',
    traditionalFailureMode: 'Complaint sits in a general 30-day civil grievance backlog queue behind requests for park benches and street-lamp bulb replacements. Catastrophic landslide occurs.',
    aiDpiSolution: 'Emergency Criticality Interrupt (ECI) Pipeline: High-frequency semantic triggers ("retaining wall crack", "mudflow", "school", "imminent collapse") trigger an immediate sub-second priority escalation. The system cross-references IMD weather radar, CWC flood forecasts, and triggers an automated priority alert to the State Disaster Management Authority (SDMA), District Collector, and nearest NDRF unit with geo-coordinates and satellite imagery.',
    architectureComponents: ['Real-Time Urgency Classifier', 'IMD / CWC Geospatial Stream Connector', 'SDMA SOS Webhook Dispatcher', 'Automated Push Broadcast'],
    bricsRelevance: 'Essential for disaster response in Brazilian flood/landslide favelas, Russian permafrost sinkholes, and South African flash flood events.',
    metrics: {
      mitigationSuccessRate: '99.8% critical event interception',
      processingLatency: '< 1.8 seconds SOS dispatch',
      equityImpact: 'Saves lives and prevents secondary infrastructure devastation'
    }
  },
  {
    id: 'EC-09',
    category: 'Governance',
    title: 'Fiscal Realism & The "500-Crore Bullet Train" Village Trap',
    subTitle: 'Reconciling aspirational citizen wishlists with bankable public capital expenditure',
    severity: 'Medium',
    realIndiaScenario: 'A group of college students in a remote rural block petition for a 6-lane elevated expressway and international airport in their taluka, generating thousands of upvotes on social media channels.',
    traditionalFailureMode: 'Officials either dismiss the petition outright as unrealistic (angering citizens and fueling cynicism) or politicians make empty electoral promises that never receive budget sanctions.',
    aiDpiSolution: 'Aspirational Intent Extraction & Multimodal Pragmatic Tiering: The AI parses the underlying latent economic need (safe, rapid youth commute to industrial hubs and universities). It automatically synthesizes a Tiered Capital Recommendation: (1) Immediate: 4 new electric feeder bus routes under PM-eBus Sewa; (2) Medium: Widening of the State Highway to 2-lane paved shoulder under Bharatmala feeder; (3) Capital planning link to BRICS New Development Bank (NDB) sustainable transport program.',
    architectureComponents: ['Latent Need Decomposer', 'Public Finance Viability Evaluator', 'Tiered Alternative Synthesizer', 'NDB/Union Budget Scheme Matcher'],
    bricsRelevance: 'Directly helps BRICS development finance institutions structure realistic community-supported infrastructure investment pipelines.',
    metrics: {
      mitigationSuccessRate: '93.5% citizen satisfaction with alternative',
      processingLatency: '2.1s',
      equityImpact: 'Transforms unrealizable requests into funded public projects'
    }
  },
  {
    id: 'EC-10',
    category: 'Security & Trust',
    title: 'The "Grievance Black Hole" & Citizen Trust Deficit',
    subTitle: 'Closing the loop with transparent progress verification and tamper-proof milestones',
    severity: 'High',
    realIndiaScenario: 'Villagers filed complaints about broken canal sluice gates 4 times over 3 years. Each time, the portal closed the ticket with an automated bureaucratic remark: "Forwarded to concerned officer for necessary action" with zero actual physical repair.',
    traditionalFailureMode: 'Cynicism sets in; citizen engagement drops to near zero. Digital platforms become viewed as public relations facades rather than governance tools.',
    aiDpiSolution: 'Closed-Loop Proof-of-Completion (CL-PoC) & Bhashini Voice Feedback: (1) No ticket can be administratively closed without geo-tagged, timestamped before-and-after photographic evidence uploaded by the field engineer; (2) Satellite synthetic aperture radar (SAR) check for linear infrastructure changes; (3) Automated Bhashini IVR call back to the original citizen in their native tongue: "Did the water flow into your canal field? Press 1 for Yes, 2 for No"; (4) Public blockchain/hash-anchored immutable audit ledger visible to all citizens.',
    architectureComponents: ['Geo-Tagged Photo Verifier', 'Bhashini Interactive Audit Call Engine', 'Tamper-Proof Audit Log', 'Citizen Confirmation Gatekeeper'],
    bricsRelevance: 'Establishes public sector credibility across all BRICS member nations, ensuring transparent utilization of public tax and development bank funds.',
    metrics: {
      mitigationSuccessRate: '98.9% closed-loop verification',
      processingLatency: 'Real-time lifecycle sync',
      equityImpact: 'Citizen trust index increases by +82%'
    }
  }
];
