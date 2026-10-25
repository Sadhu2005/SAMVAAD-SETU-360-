# SAMVAAD-SETU 360° (संवाद सेतु)
### AI-Powered Multilingual Digital Public Good for Citizen Feedback to National Masterplan Infrastructure Alignment

- [BRICS 2026 Innovation Track 1](https://brics-info.org)
- [Digital Public Goods Alliance](https://digitalpublicgoods.net)
- [Live prototype (Cloud Run)](https://ais-dev-ddptwvkz4i4x6xm32fjel5-669677889121.asia-southeast1.run.app/)
- [Bhashini](https://bhashini.gov.in) · [PM GatiShakti](https://gatishakti.gov.in) · [DPDP Act 2023](https://www.meity.gov.in)

---

## Prototype status (read this first)

This repository is an **operational prototype**, not the full national DPI stack. The **Citizen → ticket → Officer Command Desk → proof → citizen verify** loop is real (Firestore or local fallback). **Menu / briefing tabs** (edge cases, deep research, fiscal fusion, BRICS dossiers, etc.) are **policy and UX storytelling**—helpful for demos and DOCX export, but **not** production integrations unless listed under **What works today** below.

**OK for prototype?** Yes—for pilots, BRICS Track 1 demos, and officer-desk walkthroughs when Cloud Run (or local `npm run dev`) runs the Express API. GitHub Pages hosts the **static UI only**; set `VITE_API_ORIGIN` to your Cloud Run URL for live tickets (see [docs/deploy/github-pages.md](docs/deploy/github-pages.md)).

| Deploy | URL / command |
|--------|----------------|
| **Cloud Run / AI Studio** | [Live app](https://ais-dev-ddptwvkz4i4x6xm32fjel5-669677889121.asia-southeast1.run.app/) (API + UI together) |
| **Local** | `npm run dev` → `http://localhost:3000` |
| **GitHub Pages** | Actions workflow `Deploy GitHub Pages` → static UI; API via `VITE_API_ORIGIN` |

---

## What works today (v1.7.x)

These features are implemented, tested (`npm run test:all`), and mounted under **`/api/v1/`** with **`X-API-Version: 1.0.0`**.

### Product surfaces (Citizen + Government)

| Area | Working capability |
|------|---------------------|
| **Citizen portal** | Submit need with **LGD state/district** selects; durable tracking ID; optional photo/voice (browser capture); public track with **last-4 mobile** unlock; yes/no resolution verification |
| **Officer Command Desk** | PIN inbox; filter; guided **next-step** pipeline; assign department; start work; remarks; completion proof upload; SLA breach hints |
| **Privacy (DPDP-style)** | Phone masked + ephemeral token on intake; no full mobile in public track without last-4 |
| **India geo master** | `GET /api/v1/geo/states`, `GET /api/v1/geo/districts`; bundled LGD snapshot + Firestore when configured |

### DPI integrations (server-side; keys not in browser)

| Integration | Working today | Notes |
|-------------|---------------|--------|
| **Gemini desk assist** | `POST /api/v1/gemini/desk-assist` | Optional; **rules fallback** if `GEMINI_API_KEY` missing |
| **Bhashini ASR** | `POST /api/v1/bhashini/transcribe` | Needs `BHASHINI_*` on server; else **503**; officer **Transcribe voice** |
| **PM GatiShakti** | Catalog **1,447** layers + officer **Triangulate** | Bundled NMMP taxonomy + sample assets; optional live GIS env later |
| **NITI Aayog indices** | MPI / DIEW on **submit** + officer **Refresh NITI indices** | Bundled district snapshot; national median fallback |

### Briefing & export (demo / narrative)

| Tab / tool | Working today |
|------------|----------------|
| Overview, Menu, GatiShakti GIS hub | UI + **live catalog counts** from API where wired |
| Deep Research, Edge Case stress tests | Calls Gemini when key set; otherwise limited |
| Live Resolution walkthrough | Scripted pipeline demo + optional real ticket POST |
| **DOCX Blueprint** | Client-side export of briefing pack (not a government submission system) |

### Engineering

- **CI:** separate GitHub Actions jobs—Typecheck, Governance, Unit / Integration / Regression / Functional, **CI passed** (`.github/workflows/ci.yml`)
- **Pages:** Build + Deploy jobs (`.github/workflows/pages.yml`)
- **Governance:** `work-items.json` ledger; `npm run gov:check`

Setup guides: [Bhashini](docs/integrations/bhashini-setup.md) · [GatiShakti](docs/integrations/gati-shakti-setup.md) · [NITI demographics](docs/integrations/niti-demographics.md)

---

## Coming soon (next versions)

Not implemented as production systems in this prototype—shown in UI/copy for **vision only**:

- **Channels:** Toll-free IVR 1912, WhatsApp/Telegram bots, 2G SMS store-and-forward, CSC offline mesh
- **Bhashini:** Field-grade denoising, 22+ dialect tuning, citizen-side ASR (today: officer transcribe when ULCA keys are set)
- **GatiShakti:** Live national **1,400+ layer** WMS/WFS connector (today: catalog + bundled point triangulation)
- **NITI / analytics:** Full **112** aspirational districts live sync; census 2026 refresh; village-level MPI
- **Trust & safety:** Sybil-Guard bot suppression, emergency IMD/NDRF interrupt, production ZK proofs
- **Execution:** Beckn **UJWO** dispatch to departments, Sentinel SAR proof, automated Bhashini IVR callback, public differential-privacy heatmaps
- **Capital pipeline:** Automated DPR / scheme sanctioning, NDB co-financing workflow (today: suggested scheme strings + briefing tables)

---

## Executive Summary

Governments globally struggle to consolidate citizen feedback and align it with national infrastructure priorities. Development requests live in fragmented, disconnected silos (e.g. CP-GRAMS, state helplines, WhatsApp groups), leading to:
1. **Misaligned Public Spending**: Multi-billion dollar capital budgets dictated by administrative momentum rather than verified grassroots need.
2. **Unaddressed Infrastructure Gaps**: High-distress rural and tribal deficits (washed-out culverts, snapped electrical feeders, contaminated community borewells) remaining invisible to central planners.
3. **No Measurement of DPI Impact**: Inability to quantify whether capital expenditure genuinely solved community distress.

**SAMVAAD-SETU 360°** is an open-source **Digital Public Good (DPG)** prototype aimed at aligning citizen development feedback with national infrastructure planning. The **long-term** goal is omni-channel ingestion (voice, text, messaging), **Bhashini** harmonization, **PM GatiShakti** fusion, **NITI Aayog** equity weighting, and closed-loop verification. **Today**, the repo delivers the **ticket loop**, **officer desk**, and **partial** server integrations listed above; the rest is roadmap and briefing content.

---

## Long-term vision & briefing (not all built yet)

The architecture diagram, edge-case matrix, case studies, fiscal fusion tables, and impact metrics below are **design and policy narrative** for BRICS / DOCX briefings. Use **What works today** for accurate prototype scope.

## End-to-End System Architecture

```mermaid
graph TD
    %% INGESTION LAYER
    subgraph Layer1 [Layer 1: Omni-Channel Ingestion & Zero-Exclusion Gateways]
        IVR[Toll-Free IVR 1912 / Missed Call Queue]
        WA[WhatsApp / Telegram Audio & Text Bot]
        SMS[2G Feature Phone SMS Micro-Payloads]
        CSC[Common Service Centres / ASHA Offline Tablets]
    end

    %% INDIC AI HARMONIZATION
    subgraph Layer2 [Layer 2: Indic AI Semantic Harmonization & Bhashini ASR]
        Denoise[Spectral Noise Filtering - Tractor/Wind/Ambient]
        IndicASR[Bhashini IndicConformer ASR - 22+ Languages]
        NLU[Cross-Lingual NLU & Dialect Toponym Extractor]
        NER[Named Entity Recognition - Asset, Defect, Urgency, Bounding Box]
    end

    %% SECURITY & SYBIL DEFENSE
    subgraph SecurityShield [Security, Trust & Privacy Shield]
        ZK[Zero-Knowledge Tokenizer - DPDP Act 2023]
        Sybil[Sybil-Guard Graph Clustering - Anti-Astroturfing]
        ECI[Emergency Criticality Interrupt - Disaster SOS]
    end

    %% GEOSPATIAL MASTERPLAN FUSION
    subgraph Layer3 [Layer 3: PM GatiShakti Geospatial Masterplan Fusion]
        CellID[Telecom Cell-ID & Toponym Resolver]
        GatiGIS[PM GatiShakti 1,400+ Multi-Modal GIS Layers]
        Cadastral[Survey of India Cadastral Parcels]
        AssetLedger[Unified Inter-Agency Asset Ownership Matrix]
    end

    %% NATIONAL PRIORITY ENGINE
    subgraph Layer4 [Layer 4: National Priority & Capital Allocation Engine]
        NITIMPI[NITI Aayog Multi-Dimensional Poverty Index]
        DIEW[Demographic-Inverse Equity Weighting - DIEW Algorithm]
        BudgetSchemes[Scheme Linkage: PMGSY, Jal Jeevan, RDSS, AMRUT 2.0]
        NDBBridge[BRICS New Development Bank - NDB Pipeline]
    end

    %% CLOSED-LOOP EXECUTION
    subgraph Layer5 [Layer 5: Closed-Loop Delivery & Citizen Trust Verification]
        BecknWO[Smart Multi-Party Joint Work Orders - Beckn Protocol]
        PhotoVerify[Geo-Tagged Timestamped Photo Audit]
        NativeCallback[Automated Bhashini Voice Confirmation Callback]
        ImmutableLedger[Tamper-Proof Public Audit Trail]
    end

    %% Connections
    IVR --> Denoise
    WA --> Denoise
    SMS --> NLU
    CSC --> NLU
    Denoise --> IndicASR
    IndicASR --> NLU
    NLU --> NER
    NER --> SecurityShield
    SecurityShield --> CellID
    CellID --> GatiGIS
    GatiGIS --> Cadastral
    Cadastral --> AssetLedger
    AssetLedger --> DIEW
    NITIMPI --> DIEW
    DIEW --> BudgetSchemes
    BudgetSchemes --> NDBBridge
    NDBBridge --> BecknWO
    BecknWO --> PhotoVerify
    PhotoVerify --> NativeCallback
    NativeCallback --> ImmutableLedger
```

---

## Architectural ASCII Flow

```
+-------------------------------------------------------------------------------------------------------+
|                                    SAMVAAD-SETU 360° DPI ARCHITECTURE                                 |
+-------------------------------------------------------------------------------------------------------+
|                                                                                                       |
|  [CITIZEN VOICE]          [WHATSAPP / SMS]            [2G FEATURE PHONE]         [CSC / ASHA TABLET]  |
|  Vernacular Dialects      Audio Notes & Photos        Offline Store-and-Forward   Zero-Connectivity    |
|  (Bhojpuri, Gondi,        (Tamil, Bengali,            (<160 byte payloads)        Mesh Synchronizer    |
|   Bundeli, Marwari)        Marathi, Hindi)                                                            |
|          |                        |                           |                           |           |
|          +------------------------+-------------+-------------+---------------------------+           |
|                                                 |                                                     |
|                                                 v                                                     |
|                  +-------------------------------------------------------------+                      |
|                  |            LAYER 1: BHASHINI MULTILINGUAL ASR               |                      |
|                  |  - IndicConformer Acoustic Models (22 Scheduled Languages)  |                      |
|                  |  - Acoustic De-noising (Agricultural & Wind Noise Filter)   |                      |
|                  |  - Phonetic Normalizer for Non-Standard Spoken Dialects     |                      |
|                  +------------------------------+------------------------------+                      |
|                                                 |                                                     |
|                                                 v                                                     |
|                  +-------------------------------------------------------------+                      |
|                  |         LAYER 2: SEMANTIC EXTRACTION & TRUST DEFENSE        |                      |
|                  |  - Named Entity Recognition: [Asset, Defect, Landmark, SLA] |                      |
|                  |  - Sybil-Guard: Suppresses Contractor Cartel Bot Swarms     |                      |
|                  |  - DPDP Act 2023 Shield: Zero-Knowledge Client Tokenization |                      |
|                  +------------------------------+------------------------------+                      |
|                                                 |                                                     |
|                                                 v                                                     |
|                  +-------------------------------------------------------------+                      |
|                  |         LAYER 3: PM GATISHAKTI 1,400+ GIS FUSION            |                      |
|                  |  - Vernacular Toponym Resolver ("Old Peepal tree in Rampur")|                      |
|                  |  - Telecom Tower Triangulation -> Cadastral Bounding Polygon |                      |
|                  |  - Inter-Agency Asset Ledger (NHAI vs PWD vs Railways)      |                      |
|                  +------------------------------+------------------------------+                      |
|                                                 |                                                     |
|                                                 v                                                     |
|                  +-------------------------------------------------------------+                      |
|                  |         LAYER 4: DEMOGRAPHIC EQUITY & PRIORITY ENGINE       |                      |
|                  |  - Formula: DIPS = w1*(V*DIEW) + w2*G_infra + w3*S_gati ... |                      |
|                  |  - Fuses NITI Aayog Multi-Dimensional Poverty Index (MPI)    |                      |
|                  |  - Prevents Urban Vocal Elite Bias via 12.5x Multiplier     |                      |
|                  +------------------------------+------------------------------+                      |
|                                                 |                                                     |
|                                                 v                                                     |
|                  +-------------------------------------------------------------+                      |
|                  |         LAYER 5: CLOSED-LOOP CITIZEN IMPACT & AUDIT         |                      |
|                  |  - Unified Joint Work Order dispatch via Beckn Protocol     |                      |
|                  |  - Geo-tagged Photo & Satellite SAR Verification            |                      |
|                  |  - Automated Native IVR Callback: "Did water reach field?"  |                      |
|                  |  - Open DPG Heatmap published with Differential Privacy     |                      |
|                  +-------------------------------------------------------------+                      |
|                                                                                                       |
+-------------------------------------------------------------------------------------------------------+
```

---

## The 360° Edge Case Matrix: 10 Critical Failure Modes

| ID | Edge Case | Grounded Real-World Scenario | Traditional Portal Failure | Samvaad-Setu 360° AI / DPI Mitigation | BRICS Reusability |
|---|---|---|---|---|---|
| **EC-01** | **Acoustic Noise & Spoken Dialects** | Bundelkhand farmer speaks over thresher engine in Bundeli: *"हमाए पुरवा में जो रपटा हतो, बाढ़ मा सब बह गयो..."* | ASR fails (WER > 68%); illiterate farmers excluded from Unicode web forms. | **Bhashini IndicConformer**: Spectral low-frequency noise subtraction + regional phoneme alignment. | Brazil (Amazon indigenous dialects), South Africa (isiXhosa rural audio). |
| **EC-02** | **Zero-Connectivity Hinterlands** | Bastar tribal village during monsoon blackout experiences borewell contamination outbreak. | Cloud apps crash with zero 4G; outbreak remains hidden from district magistrate. | **Asynchronous Store-and-Forward**: Compressed 2G SMS + CSC/ASHA tablet mesh + delayed tolerant sync. | Siberia (Russia), rural Upper Egypt, remote Ethiopia pastoral zones. |
| **EC-03** | **Astroturfing & Contractor Cartels** | Road contractor syndicate scripts 4,500 bot WhatsApp calls demanding bypass where they own land. | Volume algorithms prioritize fake corridor, misdirecting crores from real needy hamlets. | **Sybil-Guard**: Cell-tower entropy and temporal burst graph clustering suppresses automated bot swarms. | Municipal procurement fraud defense in South Africa & Brazil. |
| **EC-04** | **Vocal Tech Elite Skew** | Urban smartphone users demand EV chargers while tribal women walk 4 km for firewood and water. | "Democracy of the loudest": public capex disproportionately concentrates in wealthy wards. | **Demographic-Inverse Equity Weighting (DIEW)**: Multiplies demand by NITI Aayog Poverty Index (up to 12.5x). | South Africa Spatial Inequality Index, Brazilian Favela disparities. |
| **EC-05** | **Vague Colloquial Landmarks** | Citizen reports: *"The old culvert near the big Peepal tree in Rampur is sinking"*. | Rejected as "Insufficient Address" because 3,800 villages share the name "Rampur". | **Toponym & GatiShakti Resolver**: Constrains to 3 km tower boundary + matches registered GatiShakti culvert IDs. | Solves unaddressed rural settlements across China and sub-Saharan Africa. |
| **EC-06** | **Inter-Agency Ping-Pong** | Severe craters at railway level-crossing; State PWD, Northern Railway, and NHAI dispute ownership. | Bounces for 7 years under "Not Pertaining to this Dept"; zero action taken. | **Unified GatiShakti Asset Matrix**: Automated Unified Joint Work Orders (Beckn) with 72h statutory SLA escalation. | Resolves federal vs provincial jurisdiction gridlock in Brazil & Russia. |
| **EC-07** | **DPDP Act 2023 & Whistleblowers** | Rural youth films contractor mixing 90% sand in road; clerk leaks youth's phone number to contractor. | Complainant details shown in plain text; citizen faces physical threats. | **Zero-Knowledge Tokenization**: Ephemeral cryptographic hashes replace PII; auto-redaction of faces & plates. | LGPD (Brazil), POPIA (South Africa), OECD public privacy guidelines. |
| **EC-08** | **Disaster & Emergency Triage** | Mountain highway retaining wall fissures above primary school during continuous cloudburst. | Complaint sits in standard 30-day municipal backlog; catastrophic landslide occurs. | **Emergency Criticality Interrupt (ECI)**: Sub-second NLP trigger cross-references IMD radar, alerts SDMA/NDRF. | Flash floods in Brazilian favelas, permafrost thaw in Russia. |
| **EC-09** | **The "500-Cr Metro" Village Trap** | College youth demand elevated 6-lane expressway and international airport in rural block. | Dismissed outright (fueling cynicism) or exploited for empty political promises. | **Latent Need Decomposer & Pragmatic Tiering**: Extracts commute need; structures immediate electric feeder bus routes. | BRICS New Development Bank (NDB) realistic infrastructure project structuring. |
| **EC-10** | **The Grievance Black Hole** | Broken canal gate tickets repeatedly closed with boilerplate: *"Forwarded for necessary action"*. | Citizen cynicism sets in; platform engagement plummets to near zero. | **Closed-Loop Proof-of-Completion (CL-PoC)**: Geo-tagged photo audit + native Bhashini voice confirmation call. | Establishes public trust and transparent tax spending across all BRICS states. |

---

## Mathematical Formulation

### Dynamic Infrastructure Priority Score (DIPS)
$$\text{DIPS} = w_1 \cdot (V_{\text{cluster}} \cdot \text{DIEW}) + w_2 \cdot G_{\text{infra}} + w_3 \cdot S_{\text{gatishakti}} + w_4 \cdot R_{\text{urgency}} - P_{\text{sybil}}$$

- $V_{\text{cluster}}$: De-duplicated semantic citizen demand within a 5 km spatial polygon.
- $\text{DIEW}$ (Demographic-Inverse Equity Weighting):
  $$\text{DIEW} = 1 + \alpha \cdot \left(\frac{\text{MPI}_{\text{district}}}{1 - \text{MPI}_{\text{district}}}\right) \cdot \left(\frac{1}{\text{Internet Penetration Rate}}\right)$$
- $G_{\text{infra}}$: Infrastructure Deficit Index (Jal Jeevan tap gap, PMGSY unpaved road ratios, health sub-centre deficit).
- $S_{\text{gatishakti}}$: Geospatial synergy with planned multi-modal corridors (power lines, optical fiber, rail freights).
- $R_{\text{urgency}}$: Real-time hazard interrupt weighting (structural cracks, disease outbreaks).
- $P_{\text{sybil}}$: Astroturfing penalty calculated from telecom tower entropy and IP burst frequency.

---

## Grounded Indian Case Studies

| District & State | Archetype | Deficit / MPI | Citizen Feedback Hotspot | Recommended High-Priority Capital Project | Funding Scheme Alignment |
|---|---|---|---|---|---|
| **Bastar, Chhattisgarh** | Tribal Belt | MPI: 0.43 (Deficit: 88/100) | All-weather bridges & water micro-grids | Decentralized Solar-Powered Piped Water & 14 Culvert Upgrades (₹84.6 Cr / $10.2M) | Jal Jeevan Mission + PMGSY Tier IV |
| **Nuh (Mewat), Haryana** | Aspirational | MPI: 0.32 (Deficit: 79/100) | Irrigation tail-end access & secondary hospital | Feeder Canal Revitalization & 100-Bed Sub-District Hospital (₹142 Cr / $17.1M) | PMKSY + Ayushman Bharat PM-ABHIM |
| **Kalahandi, Odisha** | Aspirational | MPI: 0.39 (Deficit: 84/100) | Agro-logistics & check dams | 12 Solar Cold Storage Aggregation Nodes & Check Dam Network (₹62 Cr / $7.5M) | Agriculture Infrastructure Fund (AIF) |
| **Vidarbha, Maharashtra** | Cotton Belt | MPI: 0.28 (Deficit: 76/100) | Feeder separation & cotton processing | Agricultural High-Voltage Feeder Separation & 6 Textile Parks (₹210 Cr / $25.3M) | Revamped Distribution Sector Scheme (RDSS) |
| **Baramulla, J&K** | Border / Hill | MPI: 0.24 (Deficit: 73/100) | Controlled atmosphere apple storage & snow sheds | USBRL Railhead Direct Apple Cargo Terminal & Avalanche Tunnels (₹175 Cr / $21.1M) | MIDH + Bharatmala Pariyojana |
| **Chamba, Himachal Pradesh** | Mountain Valley | MPI: 0.22 (Deficit: 81/100) | Landslide slope stabilization & mini-grids | Geo-Synthetic Slope Stabilization & Micro-Hydro Mini-Grids (₹95 Cr / $11.4M) | National Disaster Mitigation Fund (NDMF) |

---

## Big Data 4-Way Fusion & Fiscal Misalignment Calculator

To resolve the multi-billion dollar disconnect where public funds are captured by administrative inertia and contractor cartels, the platform fuses **4 disparate national big datasets**:
1. **Citizen Feedback Streams**: Aggregated voice, text, WhatsApp, and IVR requests in 22+ languages via Bhashini.
2. **National Demographic Data**: Census population projections, gender distribution, tribal habitations, literacy.
3. **Infrastructure Deficit Indices**: NITI Aayog Multi-Dimensional Poverty Index (MPI), Jal Jeevan tap deficit, PMGSY unpaved road density.
4. **Public Investment Plans**: PM GatiShakti 1,400+ layers, Union Budget capex pipelines, State PWD plans, and NDB loans.

### Sector-Level Fiscal Realignment Analysis

| Infrastructure Sector | Status Quo Top-Down Allocation | Citizen-Demanded Ground Need | Misalignment Variance | Samvaad-Setu Realignment Action |
|---|---|---|---|---|
| **Rural Culverts & Road Crossings** | ₹14,500 Cr for suburban tourist road widening | ₹9,800 Cr needed for 2,400 flood-submerged rural causeways | **-68% underfunded** in flood belts | Reallocates ₹3,400 Cr to high-level PMGSY-IV all-weather bridges. |
| **Drinking Water & Salinity** | ₹18,200 Cr for centralized river pipeline contracts | ₹11,400 Cr needed for localized reverse-osmosis solar micro-grids | **42% dry pipelines** at tail-ends | Directs Jal Jeevan funds to decentralized solar borewells in fluoride belts. |
| **Primary Health Cold Chains** | ₹6,800 Cr for urban multi-specialty expansions | ₹2,100 Cr needed for off-grid solar vaccine refrigerators at 8,200 PHCs | **78% rural vaccine spoil** during grid cuts | Equips Primary Health Centres with 5 kW hybrid solar cold-chains under 15th FC grants. |
| **Agricultural Feeder Separation** | ₹22,000 Cr for high-voltage transmission lines | ₹8,500 Cr needed for agricultural feeder separation | **3.4x pump burnout** in cotton zones | Prioritizes feeder separation under RDSS to prevent farmer motor debt. |

---

## Measuring DPI Impact: Pre vs Post Verified Outcomes

| DPI Impact Indicator | Pre-DPI Status Quo Baseline | Post-DPI Grounded Outcome | Delta Improvement | Authoritative Verification Method |
|---|---|---|---|---|
| **Citizen Request-to-Capital Alignment** | 14.2% of public projects match citizen hotspots | 82.6% of capex directly addresses demand clusters | **+5.8x Alignment** | Cross-correlation of 1.4M citizen tickets against State Cabinet sanctions. |
| **Rural Oral Dialect Inclusion** | 7.8% of feedback from non-smartphone / oral speakers | 68.4% feedback generated from rural/tribal speakers | **+8.7x Inclusivity** | Bhashini IndicConformer ASR logs across Bhojpuri, Gondi, Halbi, Santhali, Tamil. |
| **Emergency Hazard Intervention SLA** | 34 days average to acknowledge life threats | Under 1.8 seconds sub-second SOS alert | **99.9% Latency Drop** | Automated webhook triggers to NDRF & District Disaster Management desks. |
| **Cartel Fraud Suppression** | ₹3,200 Cr captured by contractor bot swarms | 99.1% bot swarm and SIM-box farm suppression | **₹3,200 Cr Saved** | Sybil-Guard cell-tower entropy scoring and Zero-Knowledge identity verification. |
| **Closed-Loop Citizen Trust Score** | 11% believed filing a complaint brings execution | 79% citizen satisfaction verified via native voice callback | **+68% Net Trust Surge** | Tamper-proof hash ledger + post-completion automated native IVR voice surveys. |

---

## Bankable Project Dossiers for BRICS National Policymakers

| Nation | Corridor | Project Name | Capex (USD / INR) | EIRR (%) | Beneficiaries | NDB Blended Finance Window |
|---|---|---|---|---|---|---|
| **India** | Bastar Tribal Belt (Chhattisgarh) | Bastar Tribal Clean Energy & River Crossing Mission | $10.2M (₹84.6 Cr) | 18.4% | 320,000 citizens | NDB Sustainable Infrastructure Facility |
| **India** | Mewat Aspirational Corridor (Haryana) | Mewat Canal Tail-End & Hospital Outpost | $17.1M (₹142.0 Cr) | 21.2% | 540,000 citizens | NDB Water Resource & Urban Health Program |
| **Brazil** | Amazonas Interior (Manaus-Tefé) | Amazonian Fluvial Logistics & Telemedicine Network | $14.2M (₹118.0 Cr) | 17.6% | 210,000 ribeirinhos | NDB Amazon Bioeconomy & River Transport Fund |
| **South Africa** | Gauteng-Ekurhuleni Township Belt | Township Water Pressure Ring-Main & Mains Retrofit | $16.3M (₹135.0 Cr) | 22.8% | 680,000 residents | NDB Urban Upgrading & Municipal Resilience Facility |
| **Russia** | Yamal & Siberian Corridors | Permafrost Thermopile Cooling & Arctic Clean Heating | $19.9M (₹165.0 Cr) | 16.5% | 140,000 residents | NDB Arctic Climate Resilience & Technology Window |
| **Egypt & Ethiopia** | Upper Nile & Rift Valley Basin | Nile Basin Drip Irrigation & Solar Pumping Cooperative | $18.3M (₹152.0 Cr) | 24.1% | 850,000 families | NDB Africa Food Security & Regional Integration |

---

## 1-Click DOCX Blueprint Generator (briefing export)

Client-side **briefing pack** export (`docx` + `file-saver`)—not an official government filing system. It can include:
- Formal Cover Page with BRICS Innovation Track 1 credentials.
- Executive Summary and Governance Problem Framing.
- Full 5-Layer DPI Technical Architecture.
- Complete 10-Point Edge Case Matrix with formatted tables.
- Formal Mathematical Formulations (DIPS & DIEW).
- Empirical Indian Aspirational District Data & PM GatiShakti Triangulation.
- BRICS Scalability Matrix & New Development Bank (NDB) Financing Pipeline.

---

## Quickstart & Installation

### Prerequisites
- Node.js **22+** recommended (CI uses 22)
- npm 10+
- Optional: `GEMINI_API_KEY`, Firebase `VITE_FIREBASE_*`, server `BHASHINI_*` (see `.env.example`)

### Clone & Install
```bash
git clone https://github.com/Sadhu2005/SAMVAAD-SETU-360-.git
cd SAMVAAD-SETU-360-
npm install
```

### Environment Configuration
Copy `.env.example` to `.env` and fill secrets locally. **Firebase project:** `samvaad-setu-360` (GCP `507246172982`).

You must paste from Firebase Console → Project settings → Your web app:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_APP_ID`

Optional server key: `GEMINI_API_KEY` from [Google AI Studio](https://aistudio.google.com/apikey). When set, the Officer Command Desk can request **AI assist (optional)** suggestions via `POST /api/v1/gemini/desk-assist` (server-side only; officers still confirm every action). Check `GET /api/v1/health` for `geminiReady`. Optional: `GEMINI_MODEL`, `GEMINI_ENABLED`.

Optional **Bhashini ULCA ASR** (citizen voice → text on the officer desk): set `BHASHINI_USER_ID`, `BHASHINI_ULCA_API_KEY`, `BHASHINI_PIPELINE_ID` on the server only. Setup: [docs/integrations/bhashini-setup.md](docs/integrations/bhashini-setup.md). Without credentials, transcribe returns a clear 503; the ticket loop still works.

**PM GatiShakti masterplan (1,400+ layers):** server catalog at `/api/v1/gati-shakti/catalog` and officer **Triangulate with GatiShakti** on each ticket. Setup: [docs/integrations/gati-shakti-setup.md](docs/integrations/gati-shakti-setup.md). Works offline with bundled NMMP taxonomy; optional `GATISHAKTI_GIS_BASE_URL` + `GATISHAKTI_API_KEY` for live GIS when approved.

**NITI Aayog demographic indices (MPI / DIEW):** `/api/v1/niti/district` and auto-enrichment on ticket submit; officer **Refresh NITI indices**. [docs/integrations/niti-demographics.md](docs/integrations/niti-demographics.md).

**CI:** [`.github/workflows/ci.yml`](.github/workflows/ci.yml)—separate jobs: Typecheck, Governance audit, Unit / Integration / Regression / Functional tests, **CI passed**. Locally: `npm run test:all`.

**GitHub Pages:** [`.github/workflows/pages.yml`](.github/workflows/pages.yml)—**Build static site** + **Deploy to GitHub Pages**. Set repo variable **`VITE_API_ORIGIN`** to your Cloud Run URL. Details: [docs/deploy/github-pages.md](docs/deploy/github-pages.md).

**Health check:** `GET /api/v1/health` reports `geminiReady`, `bhashiniConfigured`, `gatiShaktiCatalogLayers`, `nitiIndicesBundled`.

For **AI Studio / Cloud Run**, set the same variables in Secrets (see `APP_URL` in `.env.example`). For **local dev**, use `APP_URL=http://localhost:3000`.

Do **not** commit `firebase-applet-config.json` or real API keys. If a key was ever pushed to GitHub, rotate it in Google Cloud and follow [docs/security/firebase-key-rotation.md](docs/security/firebase-key-rotation.md).

### Start Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### Production Build
```bash
npm run build
npm start
```

---

## Digital Public Goods Standard Compliance (target vs prototype)

| DPG Standard Indicator | Prototype today | Target / coming soon |
|---|---|---|
| **1. Relevance to SDGs** | Citizen–state feedback loop for infrastructure needs | Full SDG 9/10/16 measurement dashboards |
| **2. Open Licensing** | Apache 2.0 | Same |
| **3. Clear Ownership** | BRICS DPI Track 1 narrative + open repo | Formal steward MOU |
| **4. Platform Independence** | Node.js + Vite + Express; Cloud Run / Pages | Container hardening guides |
| **5. Non-PII Extraction** | Masked phone + token on tickets | Production ZK / vault integration |
| **6. Privacy & DPDP Act 2023** | Last-4 gate on track portal | DP heatmaps, media redaction pipeline |
| **7. Open Standards** | `/api/v1/` versioning; OSM embed on desk | Beckn UJWO, OGC live GatiShakti |

---

## Contributing & License
- **License**: Apache-2.0
- **Track**: BRICS Track 1 — AI for Digital Public Infrastructure & Governance
- **Anchor**: India DPI (Bhashini, PM GatiShakti, DigiLocker, CP-GRAMS)
