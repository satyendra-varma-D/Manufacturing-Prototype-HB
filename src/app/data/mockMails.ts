import { Mail } from '../types';

export const mockMails: Mail[] = [
  {
    id: 'MAIL-2026-001',
    subject: 'RFP Specification: Building 04 Structural Infrastructure',
    from: {
      name: 'John Miller',
      email: 'procurement@techcorp.com'
    },
    to: 'planning-hub@rfqintel.com',
    date: '2026-04-07T09:15:00',
    body: 'Dear Team,\n\nFollowing our discussion regarding the Phase 2 expansion, we have finalized the parameters for the Building 04 Structural Infrastructure. \n\nKey Manufacturing Data:\n- Project: B04 Hub Expansion\n- Required Material: S355JR Structural Steel (EN 1090-2 Compliance)\n- Floor Load Capacity: 50 kN/m² reinforced grid\n- Power Provision: 400V 64A Industrial Nodes (Total 24 nodes)\n- Facility Zone: SEC-A1 North Corridor\n\nEstimated project budget is €485,000 with a strict delivery deadline of Q3 2026. Please initialize the customer master record based on these specifications.\n\nBest regards,\nJohn Miller\nSenior Infrastructure Analyst',
    status: 'unread',
    attachments: [],
    isHighPriority: true
  },
  {
    id: 'MAIL-2026-002',
    subject: 'Linguistic Params: Global Logistics Conveyor System',
    from: {
      name: 'Sarah Smith',
      email: 'sarah.s@globalmfr.com'
    },
    to: 'engineering@rfqintel.com',
    date: '2026-04-06T14:30:00',
    body: 'Hi Planning Team,\n\nWe are ready to proceed with the Global Logistics conveyer assembly. For the manufacturing phase, please ensure the following data points are used:\n\n- Steel Grade: S235JR (Secondary Support Systems)\n- Voltage: 230V Standard Assembly (IP65 Rated)\n- Throughput: 500kg/m continuous load\n- Compliance: CE & ISO 9001 Certified\n\nCompletion is expected by Sep 2026. Total value for this segment is €125,000.\n\nThanks,\nSarah',
    status: 'read',
    attachments: [],
    isHighPriority: false
  },
  {
    id: 'MAIL-2026-003',
    subject: 'Direct Data: Munich Project Station 4 Assembly',
    from: {
      name: 'Hans Weber',
      email: 'h.weber@industrial-logic.de'
    },
    to: 'bom-analyst@rfqintel.com',
    date: '2026-04-08T11:20:00',
    body: 'Hello,\n\nPlease find the extraction parameters for the Munich Station 4 assembly below. We have removed the need for separate BOM attachments to facilitate faster AI processing.\n\nExtraction Targets:\n- Entity: Industrial Logic GmbH\n- Material: Grade S355 Structural Steel\n- Standard: EN 1090-2 (Execution Class EXC2)\n- Power: 400V 3-Phase Infrastructure\n- Lead Time: 12 Weeks (Target Q4 2026)\n- Estimated Value: €320,000\n\nPlease verify and add this entity to the customer master.\n\nRegards,\nHans',
    status: 'unread',
    attachments: [],
    isHighPriority: true
  },
  {
    id: 'MAIL-2026-004',
    subject: 'Site Intelligence: B09 Equipment Verification',
    from: {
      name: 'Mario Rossi',
      email: 'm.rossi@italy-mfr.it'
    },
    to: 'vision-hub@rfqintel.com',
    date: '2026-04-08T15:45:00',
    body: 'Greetings,\n\nI am providing the coordinates and specs for the B09 site inspection directly via email. \n\nDirect Parameters:\n- Mounting Hub: SEC-B09-F\n- Voltage Standard: 400V 16A\n- Material: RAL 7035 Powder Coated Steel\n- Compliance: DIN 18800 Standard\n\nPlease initialize the customer master based on these linguistic details for the Italy Precision MFR entity.\n\nCiao,\nMario',
    status: 'unread',
    attachments: [],
    isHighPriority: true
  },
  {
    id: 'MAIL-2026-005',
    subject: 'Direct RFP Parameters: Berlin Expansion',
    from: {
      name: 'Elsa Kraus',
      email: 'e.kraus@berlin-infra.de'
    },
    to: 'extraction@rfqintel.com',
    date: '2026-04-09T10:00:00',
    body: 'To the extraction team,\n\nHere are the core parameters for the Berlin expansion project:\n- Estimated Value: €750,000\n- Target Completion: August 2026\n- Zone: B-NORTH\n- Key Requirements: EN 1090 Compliance, Grade S355 Structural Steel, 400V Power Infrastructure.\n\nPlease initialize the RFP and Customer record based on these details.\n\nBest,\nElsa',
    status: 'unread',
    attachments: [],
    isHighPriority: false
  }
];
