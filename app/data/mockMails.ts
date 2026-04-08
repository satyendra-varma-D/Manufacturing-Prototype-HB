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
  }
];
