import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType
} from 'docx';
import { saveAs } from 'file-saver';
import { EDGE_CASES_DATA } from '../data/edgeCases';
import { DISTRICT_HOTSPOTS, BRICS_PARTNER_DATA } from '../data/nationalData';
import { MISALIGNMENT_DATA, DPI_IMPACT_METRICS, POLICYMAKER_DOSSIERS } from '../data/fusionData';

export interface DocxOptions {
  includeEdgeCases?: boolean;
  includeBricsBlueprint?: boolean;
  includeMathFormulation?: boolean;
  includeGatiShaktiDetails?: boolean;
  includeMisalignmentData?: boolean;
  includeDpiImpactMetrics?: boolean;
  includePolicymakerDossiers?: boolean;
  customAuthor?: string;
  customTargetNation?: string;
}

export async function generateSamvaadSetuDocx(options: DocxOptions = {}) {
  const {
    includeEdgeCases = true,
    includeBricsBlueprint = true,
    includeMathFormulation = true,
    includeGatiShaktiDetails = true,
    includeMisalignmentData = true,
    includeDpiImpactMetrics = true,
    includePolicymakerDossiers = true,
    customAuthor = 'BRICS Digital Public Infrastructure & Governance Taskforce',
    customTargetNation = 'India & BRICS Member Nations'
  } = options;

  const primaryNavy = '0B2545';
  const accentTeal = '134074';
  const saffronOrange = 'D97706';
  const lightGreyBg = 'F3F4F6';
  const white = 'FFFFFF';
  const borderGrey = 'CBD5E1';

  const defaultBorder = {
    top: { style: BorderStyle.SINGLE, size: 1, color: borderGrey },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: borderGrey },
    left: { style: BorderStyle.SINGLE, size: 1, color: borderGrey },
    right: { style: BorderStyle.SINGLE, size: 1, color: borderGrey },
  };

  const sections: any[] = [];

  // Title & Metadata
  sections.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({
          text: 'BRICS TRACK 1 — INNOVATION IN DIGITAL PUBLIC INFRASTRUCTURE',
          bold: true,
          size: 24,
          color: saffronOrange,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: 'SAMVAAD-SETU 360° (संवाद सेतु)',
          bold: true,
          size: 40,
          color: primaryNavy,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: 'An AI-Powered Multilingual Digital Public Good for Scalable Citizen Feedback Aggregation, Edge-Case Reconciliation, and National Masterplan Infrastructure Alignment',
          italics: true,
          size: 24,
          color: accentTeal,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: `Prepared by: ${customAuthor} | Target Scope: ${customTargetNation} | Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
          size: 20,
          color: '64748B',
        }),
      ],
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 300, after: 150 },
      children: [
        new TextRun({
          text: '1. Executive Summary & Problem-Solution Architecture',
          bold: true,
          color: primaryNavy,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 150 },
      children: [
        new TextRun({
          text: 'Across emerging global economies, particularly within the BRICS alliance, national capital expenditure planning operates predominantly as a top-down bureaucratic discipline. While central ministries allocate billions of dollars into macro corridors (highways, industrial parks, transmission grids), localized, life-critical infrastructure deficits—such as washed-out river culverts, snapped electrical feeders, hospital cold-chain failures, and contaminated drinking water supplies—exist in highly fragmented grievance portals (e.g., CP-GRAMS in India, municipal call centers in Brazil and South Africa).',
          size: 22,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 150 },
      children: [
        new TextRun({
          text: 'This structural failure leads to three catastrophic governance outcomes: (1) Misaligned public spending that benefits vocal, affluent demographics while marginalizing rural/tribal hinterlands; (2) Inability to measure the ground-level human impact of multi-billion dollar digital and physical infrastructure investments; and (3) Severe citizen cynicism, where feedback is perceived as falling into a bureaucratic "black hole".',
          size: 22,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: 'SAMVAAD-SETU 360° solves this crisis by architecting a scalable, multilingual Digital Public Good (DPG). Grounded in India\'s proven Digital Public Infrastructure (DPI) stack—combining Bhashini (AI speech/language translation across 22+ languages), PM GatiShakti (1,400+ geospatial masterplan layers), and NITI Aayog Aspirational District indices—the platform ingests voice, WhatsApp, SMS, and IVR requests from every citizen, resolves critical edge cases, and delivers actionable, bankable capital project recommendations directly to national policymakers.',
          size: 22,
          bold: true,
        }),
      ],
    })
  );

  // Core Architecture Table
  const archTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'DPI Layer', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            width: { size: 35, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'Technical Building Blocks', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            width: { size: 40, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'Governance Transformation Function', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: '1. Omni-Channel Ingestion', bold: true })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Toll-free IVR (1912), WhatsApp Business API, 2G SMS micro-payloads, CSC Village Level Entrepreneur (VLE) offline tablets.' })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Guarantees zero-exclusion for illiterate citizens, rural women, and non-smartphone users.' })] })],
            borders: defaultBorder,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: '2. Linguistic Harmonization', bold: true })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Bhashini IndicConformer ASR, contextual vernacular dialect acoustic models, LLM Named Entity Recognition (NER).' })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Converts unstructured regional oral dialects (Bhojpuri, Gondi, Halbi, Santhali) into structured capital demand signals.' })] })],
            borders: defaultBorder,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: '3. Geospatial Triangulation', bold: true })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'PM GatiShakti National Master Plan GIS (1,400+ layers), Survey of India cadastral maps, Telecom Cell-ID bounds.' })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Translates informal landmark descriptions ("near Mukhiya\'s old well") into exact geographic coordinates and agency ownership.' })] })],
            borders: defaultBorder,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: '4. National Priority AI Engine', bold: true })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Demographic-Inverse Equity Weighting (DIEW), NITI Aayog Multi-Dimensional Poverty Index (MPI) integration.' })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Eliminates urban elite bias by giving high poverty/remote tribal clusters algorithmic capex multipliers.' })] })],
            borders: defaultBorder,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: '5. Closed-Loop Execution', bold: true })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Smart Multi-Party Joint Work Orders (Beckn Protocol), Geo-tagged photographic proof, automated native IVR citizen callback.' })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Ensures no grievance ticket is administratively closed without verifiable physical delivery and citizen voice sign-off.' })] })],
            borders: defaultBorder,
          }),
        ],
      }),
    ],
  });

  sections.push(archTable);

  // Section 2: Mathematical Prioritization
  if (includeMathFormulation) {
    sections.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 150 },
        children: [
          new TextRun({
            text: '2. Mathematical Formulation: Dynamic Infrastructure Priority Score (DIPS)',
            bold: true,
            color: primaryNavy,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: 'To avoid ad-hoc political favoritism and ensure objective, equity-grounded public spending, SAMVAAD-SETU 360° evaluates every aggregated cluster using the Dynamic Infrastructure Priority Score (DIPS):',
            size: 22,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 100 },
        shading: { type: ShadingType.CLEAR, fill: lightGreyBg },
        children: [
          new TextRun({
            text: 'DIPS = w_1 * (V_cluster * DIEW) + w_2 * G_infra + w_3 * S_gatishakti + w_4 * R_urgency - P_sybil',
            bold: true,
            size: 22,
            color: primaryNavy,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [
          new TextRun({
            text: 'Where:\n' +
              '• V_cluster: De-duplicated semantic citizen demand volume within a 5 km spatial polygon.\n' +
              '• DIEW (Demographic-Inverse Equity Weighting): 1 + alpha * [MPI_district / (1 - MPI_district)] * [1 / Internet_Penetration_Rate], ensuring underdeveloped villages receive up to a 12.5x multiplier.\n' +
              '• G_infra: Infrastructure Deficit Index, derived from Census, Jal Jeevan Mission tap gap, and PMGSY unpaved road ratios.\n' +
              '• S_gatishakti: Geospatial Synergy Coefficient, awarding higher feasibility if the project can latch onto existing planned pipelines, railways, or fiber corridors.\n' +
              '• R_urgency: Real-time hazard weighting (flash floods, structural bridge fractures, disease outbreaks).\n' +
              '• P_sybil: Sybil penalty calculated from cell-tower entropy and temporal burst clustering to negate contractor astroturfing.',
            size: 20,
          }),
        ],
      })
    );
  }

  // Section 3: 360° Comprehensive Edge Cases
  if (includeEdgeCases) {
    sections.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 150 },
        children: [
          new TextRun({
            text: '3. The 360° Edge Case Matrix: 10 Critical Failure Modes & DPI Solutions',
            bold: true,
            color: primaryNavy,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [
          new TextRun({
            text: 'A Digital Public Infrastructure fails not during ideal conditions, but at the periphery. Below is the rigorous 360-degree stress analysis identifying the 10 most lethal real-world failure modes across India and BRICS nations, paired with their concrete DPI-native solutions.',
            size: 22,
          }),
        ],
      })
    );

    for (const ec of EDGE_CASES_DATA) {
      sections.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 80 },
          children: [
            new TextRun({
              text: `[${ec.id}] ${ec.title} (${ec.category}) — Severity: ${ec.severity}`,
              bold: true,
              color: ec.severity === 'Critical' ? 'B91C1C' : saffronOrange,
              size: 22,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'Grounded Real-World Scenario: ', bold: true, size: 20 }),
            new TextRun({ text: ec.realIndiaScenario, italics: true, size: 20 }),
          ],
        }),
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'Traditional Governance Failure Mode: ', bold: true, color: 'B91C1C', size: 20 }),
            new TextRun({ text: ec.traditionalFailureMode, size: 20 }),
          ],
        }),
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'DPI-Native AI Solution: ', bold: true, color: '065F46', size: 20 }),
            new TextRun({ text: ec.aiDpiSolution, size: 20 }),
          ],
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [
            new TextRun({ text: 'BRICS Portability: ', bold: true, size: 20 }),
            new TextRun({ text: ec.bricsRelevance, size: 20 }),
            new TextRun({ text: ` | Success Rate: ${ec.metrics.mitigationSuccessRate} | Latency: ${ec.metrics.processingLatency}`, bold: true, color: accentTeal, size: 18 }),
          ],
        })
      );
    }
  }

  // Section 4: PM GatiShakti & Empirical Indian Corridor Case Studies
  if (includeGatiShaktiDetails) {
    sections.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 150 },
        children: [
          new TextRun({
            text: '4. Grounded Field Analysis: Indian Aspirational Districts & PM GatiShakti Triangulation',
            bold: true,
            color: primaryNavy,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [
          new TextRun({
            text: 'To demonstrate operational viability, SAMVAAD-SETU 360° was modeled across 6 high-deficit Indian districts spanning diverse geographic and linguistic archetypes. Each district correlates citizen demand clusters with official GIS layers from PM GatiShakti.',
            size: 22,
          }),
        ],
      })
    );

    const districtTableRows = [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 20, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'District & State', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            width: { size: 20, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'Demographic Deficit', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'Citizen Feedback Hotspot', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'Prioritized Capital Project', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
        ],
      }),
    ];

    for (const d of DISTRICT_HOTSPOTS) {
      districtTableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({ children: [new TextRun({ text: `${d.name}, ${d.state}`, bold: true })] }),
                new Paragraph({ children: [new TextRun({ text: `(${d.category})`, size: 16, italics: true })] }),
              ],
              borders: defaultBorder,
            }),
            new TableCell({
              children: [
                new Paragraph({ children: [new TextRun({ text: `MPI: ${d.mpiScore} | Deficit: ${d.infrastructureDeficitScore}/100` })] }),
                new Paragraph({ children: [new TextRun({ text: `Unresolved: ${d.unresolvedGrievanceRate}`, size: 16, color: 'B91C1C' })] }),
              ],
              borders: defaultBorder,
            }),
            new TableCell({
              children: [
                new Paragraph({ children: [new TextRun({ text: d.topFeedbackCategory, bold: true })] }),
                new Paragraph({ children: [new TextRun({ text: `${d.citizenFeedbackVolume.toLocaleString()} requests in ${d.primaryLanguages.join(', ')}`, size: 16 })] }),
              ],
              borders: defaultBorder,
            }),
            new TableCell({
              children: [
                new Paragraph({ children: [new TextRun({ text: d.prioritizedProjectRecommendation.title, bold: true, color: '065F46' })] }),
                new Paragraph({ children: [new TextRun({ text: `Budget: ${d.prioritizedProjectRecommendation.estimatedCapex} (${d.prioritizedProjectRecommendation.scheme})`, size: 16 })] }),
              ],
              borders: defaultBorder,
            }),
          ],
        })
      );
    }

    sections.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: districtTableRows }));
  }

  // Section 5: BRICS Global Blueprint & New Development Bank (NDB)
  if (includeBricsBlueprint) {
    sections.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 150 },
        children: [
          new TextRun({
            text: '5. BRICS Global Scalability Blueprint & New Development Bank (NDB) Integration',
            bold: true,
            color: primaryNavy,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [
          new TextRun({
            text: 'While initiated and calibrated in India, SAMVAAD-SETU 360° is designed strictly under open Digital Public Goods Alliance (DPGA) standards. Its modular API architecture allows seamless deployment across all BRICS member nations, creating an inter-operable standard for demand-driven public infrastructure.',
            size: 22,
          }),
        ],
      })
    );

    for (const brics of BRICS_PARTNER_DATA) {
      sections.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 150, after: 60 },
          children: [
            new TextRun({ text: brics.country, bold: true, size: 20, color: primaryNavy }),
          ],
        }),
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: 'National DPI Baseline: ', bold: true, size: 18 }),
            new TextRun({ text: brics.dominantDPI, size: 18 }),
          ],
        }),
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: 'Track 1 Deployment Focus: ', bold: true, size: 18 }),
            new TextRun({ text: brics.pilotFocus, size: 18 }),
          ],
        }),
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: 'Funding Synergy: ', bold: true, color: '065F46', size: 18 }),
            new TextRun({ text: brics.fundingSynergy, size: 18 }),
          ],
        })
      );
    }

    sections.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: 'New Development Bank (NDB) Sovereign Loan Pipeline Alignment',
            bold: true,
            color: primaryNavy,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [
          new TextRun({
            text: 'The NDB manages an active loan portfolio exceeding $35 Billion USD. Historically, multilateral development banks face post-disbursement verification delays and community opposition due to inadequate prior consultation. By deploying SAMVAAD-SETU 360° as a mandatory pre-appraisal and live monitoring DPI, NDB gains real-time ESG compliance and verified citizen satisfaction data before each tranche release.',
            size: 20,
          }),
        ],
      })
    );
  }

  // Section 6: Legal, Privacy & DPDP Act 2023 Compliance
  sections.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 300, after: 150 },
      children: [
        new TextRun({
          text: '6. Privacy, Ethics & Digital Personal Data Protection (DPDP) Act 2023',
          bold: true,
          color: primaryNavy,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: 'Public grievance systems present severe security vulnerabilities: citizens reporting corrupt contractors or illegal quarrying are frequently intimidated when their contact details leak. SAMVAAD-SETU 360° implements three privacy-by-design guarantees:',
          size: 20,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({ text: '1. Zero-Knowledge Tokenization: ', bold: true, color: saffronOrange }),
        new TextRun({ text: 'Citizen telephone numbers and Aadhaar/DigiLocker references are tokenized into one-way ephemeral hashes. Even system database administrators cannot link a specific citizen to a grievance ticket without an authenticated judicial warrant.', size: 20 }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({ text: '2. Multi-Media Sanitization: ', bold: true, color: saffronOrange }),
        new TextRun({ text: 'All submitted photos and videos undergo client-side computer vision redaction that blurs human faces, private vehicle license plates, and household markers prior to departmental transmission.', size: 20 }),
      ],
    }),
    new Paragraph({
      spacing: { after: 150 },
      children: [
        new TextRun({ text: '3. Differential Privacy for Open DPG Heatmaps: ', bold: true, color: saffronOrange }),
        new TextRun({ text: 'To ensure transparency, demand heatmaps are published openly for researchers and civil society, but noise is algorithmically injected (Laplace mechanism, epsilon=0.5) to guarantee k-anonymity (k>=50).', size: 20 }),
      ],
    })
  );

  // Section 7: Misalignment & Fiscal Realignment
  if (includeMisalignmentData) {
    sections.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 150 },
        children: [
          new TextRun({
            text: '7. Big Data 4-Way Fusion & Solving Public Spending Misalignment',
            bold: true,
            color: primaryNavy,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [
          new TextRun({
            text: 'A core pathology in national infrastructure planning is "Fiscal Drift"—where public capex is disproportionately captured by influential contractors and urban centers while high-distress rural and tribal deficits remain invisible. By fusing (1) Citizen Feedback Streams, (2) National Demographics, (3) Infrastructure Indices, and (4) Public Investment Plans, SAMVAAD-SETU 360° identifies and corrects misallocated funds across major sectors:',
            size: 22,
          }),
        ],
      })
    );

    const misRowCells = [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 20, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'Infrastructure Sector', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'Status Quo Top-Down Allocation', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'Citizen-Demanded Real Need', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'Samvaad-Setu Realignment Solution', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
        ],
      }),
    ];

    for (const m of MISALIGNMENT_DATA) {
      misRowCells.push(
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({ children: [new TextRun({ text: m.sector, bold: true })] }),
                new Paragraph({ children: [new TextRun({ text: `Variance: ${m.misalignmentVariance}`, size: 16, color: 'B91C1C', bold: true })] }),
              ],
              borders: defaultBorder,
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: m.traditionalTopDownAllocation, size: 18 })] })],
              borders: defaultBorder,
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: m.groundedCitizenDemandNeed, size: 18 })] })],
              borders: defaultBorder,
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: m.samvaadSetuRealignmentSolution, size: 18, color: '065F46' })] })],
              borders: defaultBorder,
            }),
          ],
        })
      );
    }

    sections.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: misRowCells }));
  }

  // Section 8: DPI Impact Measurement Framework
  if (includeDpiImpactMetrics) {
    sections.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 150 },
        children: [
          new TextRun({
            text: '8. Measuring the Impact of Large-Scale Digital Public Infrastructure',
            bold: true,
            color: primaryNavy,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [
          new TextRun({
            text: 'Historically, governments have had no rigorous methodology to measure whether multi-billion dollar digital and physical public infrastructure programs delivered real welfare outcomes. SAMVAAD-SETU 360° institutes an empirical measurement framework comparing pre-DPI baselines with post-commissioning verified outcomes:',
            size: 22,
          }),
        ],
      })
    );

    const impactRows = [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'DPI Impact Indicator', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'Pre-DPI Status Quo Baseline', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'Post-DPI Verified Ground Outcome', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: primaryNavy },
            children: [new Paragraph({ children: [new TextRun({ text: 'Delta & Verification Method', bold: true, color: white })] })],
            borders: defaultBorder,
          }),
        ],
      }),
    ];

    for (const imp of DPI_IMPACT_METRICS) {
      impactRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({ children: [new TextRun({ text: imp.indicator, bold: true })] }),
                new Paragraph({ children: [new TextRun({ text: imp.deltaImprovement, size: 16, color: '065F46', bold: true })] }),
              ],
              borders: defaultBorder,
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: imp.preDpiBaseline, size: 18 })] })],
              borders: defaultBorder,
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: imp.postDpiGroundedOutcome, size: 18 })] })],
              borders: defaultBorder,
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: imp.verificationMethod, size: 16, italics: true })] })],
              borders: defaultBorder,
            }),
          ],
        })
      );
    }

    sections.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: impactRows }));
  }

  // Section 9: Bankable Policymaker Dossiers across BRICS
  if (includePolicymakerDossiers) {
    sections.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 300, after: 150 },
        children: [
          new TextRun({
            text: '9. Bankable High-Priority Project Dossiers for BRICS National Policymakers',
            bold: true,
            color: primaryNavy,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 150 },
        children: [
          new TextRun({
            text: 'Synthesized directly from citizen demand signals, demographic vulnerability indices, and geospatial masterplans, the following pre-appraised capital project dossiers are ready for immediate co-financing by national exchequers and the BRICS New Development Bank (NDB):',
            size: 22,
          }),
        ],
      })
    );

    for (const dossier of POLICYMAKER_DOSSIERS) {
      sections.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 180, after: 60 },
          children: [
            new TextRun({
              text: `[${dossier.country}] ${dossier.projectName}`,
              bold: true,
              color: primaryNavy,
              size: 22,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: 'Corridor: ', bold: true, size: 18 }),
            new TextRun({ text: `${dossier.corridor} | `, size: 18 }),
            new TextRun({ text: 'Estimated Capex: ', bold: true, size: 18 }),
            new TextRun({ text: `${dossier.capexUsd} (${dossier.capexInr}) | `, color: '065F46', bold: true, size: 18 }),
            new TextRun({ text: 'Economic IRR: ', bold: true, size: 18 }),
            new TextRun({ text: dossier.economicInternalRateOfReturn, size: 18, color: saffronOrange, bold: true }),
          ],
        }),
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: 'Citizen Signals: ', bold: true, size: 18 }),
            new TextRun({ text: `${dossier.demandHeatmapSignals.toLocaleString()} verified voice/text requests | `, size: 18 }),
            new TextRun({ text: 'Beneficiaries: ', bold: true, size: 18 }),
            new TextRun({ text: dossier.beneficiaries, size: 18 }),
          ],
        }),
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: 'Grassroots Deficit: ', bold: true, color: 'B91C1C', size: 18 }),
            new TextRun({ text: dossier.summaryProblem, size: 18 }),
          ],
        }),
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({ text: 'Grounded DPI Solution: ', bold: true, color: '065F46', size: 18 }),
            new TextRun({ text: dossier.groundedIntervention, size: 18 }),
          ],
        }),
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({ text: 'NDB Blended Financing Alignment: ', bold: true, color: accentTeal, size: 18 }),
            new TextRun({ text: dossier.bricsNdbAlignment, size: 18, italics: true }),
          ],
        })
      );
    }
  }

  // Conclusion & Implementation Roadmap
  sections.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 300, after: 150 },
      children: [
        new TextRun({
          text: '10. 3-Year Pan-BRICS Implementation Roadmap',
          bold: true,
          color: primaryNavy,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({ text: '• Phase 1 (Months 1-6): ', bold: true, color: primaryNavy }),
        new TextRun({ text: 'Pilot deployment across 10 Aspirational Districts in India (Bastar, Nuh, Kalahandi, etc.), fine-tuning Bhashini IndicConformer on 12 vernacular oral dialects and connecting PM GatiShakti API connectors.', size: 20 }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({ text: '• Phase 2 (Months 7-18): ', bold: true, color: primaryNavy }),
        new TextRun({ text: 'Pan-India integration with CP-GRAMS and state CM helplines. Launch of bilateral pilot with Brazil (Amazonas indigenous corridor) and South Africa (Gauteng township service backlog).', size: 20 }),
      ],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({ text: '• Phase 3 (Months 19-36): ', bold: true, color: primaryNavy }),
        new TextRun({ text: 'Formal accession to the Digital Public Goods Alliance (DPGA) registry. Adoption by the New Development Bank (NDB) as the standard citizen-centric infrastructure appraisal platform across all BRICS+ member nations.', size: 20 }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200 },
      children: [
        new TextRun({
          text: '— END OF OFFICIAL BLUEPRINT DOCUMENT —',
          bold: true,
          size: 18,
          color: '64748B',
        }),
      ],
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: sections,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `SAMVAAD_SETU_360_BRICS_Track1_Blueprint_${new Date().toISOString().split('T')[0]}.docx`;
  saveAs(blob, fileName);
  return fileName;
}
