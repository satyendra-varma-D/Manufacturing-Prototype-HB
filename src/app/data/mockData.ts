import { RFQ, Quotation, Customer, KnowledgeItem, Task } from '../types';

export const mockRFQs: RFQ[] = [
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
  }
];

export const mockKnowledgeBase: KnowledgeItem[] = [
  {
    id: 'KB-2025-045',
    title: 'Facility 03 Extension - Munich Hub',
    description: 'Complete floor layout and power distribution for precision assembly line.',
    category: 'Facility Management',
    customer: 'TechCorp Industries',
    value: 420000,
    completedDate: '2025-11-20',
    tags: ['floor plan', 'infrastructure', 'power distribution'],
  }
];

export const mockTasks: Task[] = [
  { id: 'TASK-001', title: 'Review B04 Layout Extraction', type: 'review', relatedId: 'RFQ-2026-001', relatedType: 'rfq', assignee: 'Manager User', assigneeId: '2', dueDate: '2026-04-08', status: 'pending', priority: 'high', createdDate: '2026-04-05T10:30:00' }
];
