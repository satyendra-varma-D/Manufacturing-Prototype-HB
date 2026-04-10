import { Mail } from '../types';

export const mockMails: Mail[] = [
  {
    id: 'MAIL-2026-001',
    subject: 'Facility Expansion Plan: Building 04 Layout Coordination',
    from: {
      name: 'John Miller',
      email: 'procurement@techcorp.com'
    },
    to: 'planning-hub@rfqintel.com',
    date: '2026-04-07T09:15:00',
    body: 'Dear Team,\n\nFollowing our discussion regarding the Phase 2 expansion, please find attached the technical layout for Building 04. We require a comprehensive extraction of all equipment zones, power load requirements, and structural specifications indicated in the floor plan.\n\nOur goal is to verify that the proposed machinery placement aligns with our historical safety standards and previous workstation baselines identified in Facility 03.\n\nBest regards,\nJohn Miller\nSenior Infrastructure Analyst',
    status: 'unread',
    attachments: ['b04_facility_layout_v1.pdf'],
    isHighPriority: true
  },
  {
    id: 'MAIL-2026-002',
    subject: 'Follow-up: Material Specs for Conveyor System',
    from: {
      name: 'Sarah Smith',
      email: 'sarah.s@globalmfr.com'
    },
    to: 'engineering@rfqintel.com',
    date: '2026-04-06T14:30:00',
    body: 'Hi Planning Team,\n\nWe need a quick verification on the structural steel grades specified in the latest conveyor assembly drawing. Are we using the same S355JR baseline as the Bremen project?\n\nThanks,\nSarah',
    status: 'read',
    attachments: ['conveyor_system_assembly.dwg'],
    isHighPriority: false
  },
  {
    id: 'MAIL-2026-003',
    subject: 'BOM Verification: Munich Project Station 4',
    from: {
      name: 'Hans Weber',
      email: 'h.weber@industrial-logic.de'
    },
    to: 'bom-analyst@rfqintel.com',
    date: '2026-04-08T11:20:00',
    body: 'Hello,\n\nPlease find the Bill of Materials for the Station 4 assembly attached. We need a comparison against our standard warehouse inventory and identification of any specialized parts that require long-lead procurement.\n\nRegards,\nHans',
    status: 'unread',
    attachments: ['station_4_bom_v2.xlsx'],
    isHighPriority: true
  },
  {
    id: 'MAIL-2026-004',
    subject: 'Site Inspection: B09 Equipment Verification',
    from: {
      name: 'Mario Rossi',
      email: 'm.rossi@italy-mfr.it'
    },
    to: 'vision-hub@rfqintel.com',
    date: '2026-04-08T15:45:00',
    body: 'Greetings,\n\nI have uploaded photos from the B09 site inspection. Please run the visual intelligence model to identify the existing equipment models and verify if the mounting points align with the new specifications.\n\nCiao,\nMario',
    status: 'unread',
    attachments: ['site_photo_01.jpg', 'site_photo_02.jpg', 'mounting_bracket.pdf'],
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
    body: 'To the extraction team,\n\nHere are the core parameters for the Berlin expansion project:\n- Estimated Value: €750,000\n- Target Completion: August 2026\n- Zone: B-NORTH\n- Key Requirements: EN 1090 Compliance, Grade S355 Structural Steel, 400V Power Infrastructure.\n\nPlease initialize the RFP based on these details.\n\nBest,\nElsa',
    status: 'unread',
    attachments: [],
    isHighPriority: false
  }
];
