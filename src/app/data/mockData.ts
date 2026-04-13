import { RFQ, Quotation, Customer, KnowledgeItem, Task } from '../types';

export const mockRFQs: RFQ[] = [
  {
    id: 'RFQ-2026-004',
    name: 'Industrial Bolt Flange - Batch 2026',
    customer: 'TechCorp Industries',
    customerId: 'CUST-001',
    date: '2026-04-13',
    status: 'under_review',
    owner: 'Standard User',
    ownerId: '3',
    value: 485000,
    confidenceScore: 0.98,
    version: 1,
    source: 'email',
    description: 'Precision manufacturing of industrial bolt flanges. Specs: 6.000" x 4.000" plate with 4x bolt hole pattern. Corner radius 0.25". Material: Reinforced Industrial Grade.',
    documents: ['simple_rectangle_plat.svg'],
    extractedData: {
      items: [
        { id: '1', partNumber: 'BF-6425', description: 'Rectangle Bolt Flange (6x4)', quantity: 1500, unitPrice: 323, totalPrice: 485000, confidenceScore: 0.99 },
      ],
      requirements: ['Spec: 6.000 x 4.000 in', 'Corner Radius: 0.25 in', 'Bolt Hole: 0.25 in'],
      deadline: '2026-05-15',
    },
    similarJobs: ['KB-2025-045'],
    communicationHistory: [
      { id: 'C1', type: 'email', sender: 'Sarah (Procurement)', content: 'We need high-precision CNC finish on all 4x bolt hole patterns. Reference Munich Branch 03 historical baseline.', date: '2026-04-12' },
      { id: 'C2', type: 'transcript', sender: 'AI Insight', content: 'Identified material gap. Historical reference KB-2025-045 suggests SS316L for this flange type.', date: '2026-04-13', isAiInsight: true },
      { id: 'C3', type: 'discussion', sender: 'Internal Eng', content: 'Confirmed. Aligning CAD with standard plate offsets from Rev C.', date: '2026-04-13' }
    ]
  },
  {
    id: 'RFQ-2026-001',
    name: 'Building 04 Facility Expansion',
    customer: 'TechCorp Industries',
    customerId: 'CUST-001',
    date: '2026-04-05',
    status: 'under_review',
    owner: 'Standard User',
    ownerId: '3',
    value: 485000,
    confidenceScore: 0.94,
    version: 1,
    source: 'email',
    description: 'B04 Floor Plan extraction including Zone A production line, material handling area, and power nodes.',
    documents: ['b04_facility_layout_v1.pdf'],
    extractedData: {
      items: [
        { id: '1', partNumber: 'ZONE-A', description: 'Primary Assembly Line - Reinforced Concrete Floor', quantity: 1250, unitPrice: 120, totalPrice: 150000, confidenceScore: 0.98 },
        { id: '2', partNumber: 'PN-400', description: 'High-Voltage Power Nodes (400V 64A)', quantity: 24, unitPrice: 3200, totalPrice: 76800, confidenceScore: 0.92 },
        { id: '3', partNumber: 'MH-SYS', description: 'Automated Material Handling Overhead Rail', quantity: 1, unitPrice: 85000, totalPrice: 85000, confidenceScore: 0.89 },
      ],
      requirements: ['IEC 60364 Standard', 'Load Bearing: 50kN/m2', 'ESD Flooring Required'],
      deadline: '2026-06-30',
    },
    similarJobs: ['KB-2025-045'],
    communicationHistory: [
      { id: 'C4', type: 'email', sender: 'John (Facilities)', content: 'Zone A must handle 50kN/m2 load bearing.', date: '2026-04-04' },
      { id: 'C5', type: 'transcript', sender: 'AI Insight', content: 'Power node specs (PN-400) automatically mapped from Infrastructure KB-2024-312.', date: '2026-04-05', isAiInsight: true }
    ]
  },
  {
    id: 'RFQ-2026-002',
    name: 'Logistics Center Conveyor System',
    customer: 'Electronics Solutions Ltd',
    customerId: 'CUST-002',
    date: '2026-04-03',
    status: 'approved',
    owner: 'Standard User',
    ownerId: '3',
    value: 210000,
    confidenceScore: 0.89,
    extractedData: {
      items: [
        { id: '4', partNumber: 'CONV-500', description: 'Heavy Duty Belt Conveyor (500kg/m)', quantity: 200, unitPrice: 850, totalPrice: 170000 },
      ],
      requirements: ['S355JR Structural Steel', 'CE Certified'],
    },
  }
];

export const mockQuotations: Quotation[] = [
  {
    id: 'QUO-2026-001',
    name: 'Infrastructure Quote - B04 Expansion',
    rfqId: 'RFQ-2026-001',
    customer: 'TechCorp Industries',
    customerId: 'CUST-001',
    date: '2026-04-06',
    status: 'under_review',
    owner: 'Standard User',
    ownerId: '3',
    value: 512000,
    bom: [
       { id: '1', partNumber: 'ZONE-A', description: 'Primary Assembly Line Works', quantity: 1250, unitPrice: 135, totalPrice: 168750 },
       { id: '2', partNumber: 'PN-400', description: 'High-Voltage Power Nodes', quantity: 24, unitPrice: 3450, totalPrice: 82800 },
    ],
    pricing: [
      { id: 'p1', category: 'Infrastructure', items: [], subtotal: 350000, margin: 0.15 },
    ]
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'TechCorp Industries',
    email: 'procurement@techcorp.com',
    company: 'TechCorp Industries Inc.',
    industry: 'Heavy Manufacturing',
    status: 'active',
    totalValue: 12500000,
    rfqCount: 142,
    createdDate: '2024-06-15',
  },
  {
    id: 'CUST-002',
    name: 'Sarah Smith',
    email: 'sarah.s@globalmfr.com',
    company: 'Global Manufacturing Corp',
    industry: 'Automotive Infrastructure',
    status: 'active',
    totalValue: 4500000,
    rfqCount: 56,
    createdDate: '2025-02-15',
  },
  {
    id: 'CUST-003',
    name: 'Mario Rossi',
    email: 'm.rossi@italy-mfr.it',
    company: 'Italy Precision MFR',
    industry: 'Industrial Equipment',
    status: 'pending',
    totalValue: 0,
    rfqCount: 0,
    createdDate: '2026-04-10',
  }
];

export const mockKnowledgeBase: KnowledgeItem[] = [
  {
    id: 'KB-2025-045',
    title: 'Munich Hub - Industrial Flange Assembly',
    description: 'Bespoke flange assembly for high-pressure industrial conduits. Includes full structural layout and material certifications.',
    category: 'Facility Management',
    type: 'Drawing',
    customer: 'TechCorp Industries',
    value: 420000,
    completedDate: '2025-11-20',
    tags: ['flange', 'high-pressure', 'munich-hub'],
    revision: 'Rev C',
    material: 'SS316L Stainless Steel',
    process: 'CNC Precision Milling',
    approver: 'Dr. Engineering',
    dimensions: { width: '12.5 in', height: '12.5 in', depth: '4.2 in' },
    associatedFiles: [
      { id: 'F1', type: 'layout', name: 'flange_structural_v3.pdf', date: '2025-11-15' },
      { id: 'F2', type: 'email_thread', name: 'Clarification on Tolerance.eml', date: '2025-11-10' },
      { id: 'F3', type: 'meeting_notes', name: 'Design Review Munich.docx', date: '2025-11-12' },
      { id: 'F4', type: 'discussion', name: 'Internal Slack Export #engineering', date: '2025-11-18' }
    ]
  },
  {
    id: 'KB-2026-012',
    title: 'Precision Bolt Plate (Model 4X)',
    description: 'Standardized mounting plate with 4-hole precision pattern for robotic arms.',
    category: 'Logistics',
    type: 'Part',
    customer: 'Global Manufacturing Corp',
    value: 125000,
    completedDate: '2026-01-15',
    tags: ['mounting-plate', 'robotics', 'hardened-steel'],
    revision: 'Rev A',
    material: 'Hardened Steel S45C',
    process: 'Laser Cutting + Surface Grinding',
    approver: 'Sarah Engineer',
    dimensions: { width: '8.0 in', height: '5.0 in', depth: '0.25 in' },
    associatedFiles: [
      { id: 'F5', type: 'layout', name: 'bolt_plate_blueprint.svg', date: '2026-01-10' },
      { id: 'F6', type: 'email_thread', name: 'Material Spec Confirmation.eml', date: '2026-01-12' }
    ]
  },
  {
    id: 'KB-2024-312',
    title: 'Logistics Project X1 - Warehouse Alpha',
    description: 'Complete floor plan extraction for the robotic sorting facility in Warehouse Alpha.',
    category: 'Facility Management',
    type: 'Facility',
    customer: 'Italy Precision MFR',
    value: 850000,
    completedDate: '2024-09-05',
    tags: ['logistics', 'warehouse', 'automation'],
    associatedFiles: [
      { id: 'F7', type: 'layout', name: 'warehouse_alpha_floorplan.pdf', date: '2024-08-30' },
      { id: 'F8', type: 'meeting_notes', name: 'Site Visit Report.pdf', date: '2024-08-25' }
    ]
  }
];

export const mockTasks: Task[] = [
  { id: 'TASK-001', title: 'Review B04 Layout Extraction', type: 'review', relatedId: 'RFQ-2026-001', relatedType: 'rfq', assignee: 'Manager User', assigneeId: '2', dueDate: '2026-04-08', status: 'pending', priority: 'high', createdDate: '2026-04-05T10:30:00' }
];
