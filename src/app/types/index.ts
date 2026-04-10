export type RFQStatus = 'draft' | 'parsed' | 'under_review' | 'approved' | 'converted' | 'closed';
export type QuotationStatus = 'draft' | 'ai_suggested' | 'under_review' | 'submitted' | 'approved' | 'rejected' | 'rework' | 'resubmitted' | 'sent' | 'closed';

export interface RFQ {
  id: string;
  name: string;
  customer: string;
  customerId: string;
  date: string;
  status: RFQStatus;
  owner: string;
  ownerId: string;
  value: number;
  confidenceScore: number;
  version: number;
  source: string;
  description?: string;
  documents?: string[];
  extractedData?: {
    items: BOMItem[];
    requirements: string[];
    deadline?: string;
  };
  similarJobs?: string[];
  comments?: Comment[];
}

export interface Quotation {
  id: string;
  name: string;
  rfqId: string;
  customer: string;
  customerId: string;
  date: string;
  status: QuotationStatus;
  owner: string;
  ownerId: string;
  value: number;
  confidenceScore: number;
  version: number;
  bom: BOMItem[];
  pricing?: PricingSection[];
  comments?: Comment[];
  approver?: string;
  submittedDate?: string;
}

export interface BOMItem {
  id: string;
  partNumber: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  supplier?: string;
  leadTime?: string;
  confidenceScore?: number;
}

export interface PricingSection {
  id: string;
  category: string;
  items: BOMItem[];
  subtotal: number;
  margin?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  industry?: string;
  status: 'active' | 'inactive';
  totalValue: number;
  rfqCount: number;
  conversionRate: number;
  createdDate: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  customer?: string;
  value: number;
  completedDate: string;
  tags: string[];
  bom?: BOMItem[];
  documents?: string[];
}

export interface Task {
  id: string;
  title: string;
  type: 'review' | 'approval' | 'rework';
  relatedId: string;
  relatedType: 'rfq' | 'quotation';
  assignee: string;
  assigneeId: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdDate: string;
}

export interface Comment {
  id: string;
  author: string;
  authorId: string;
  date: string;
  text: string;
  type?: 'comment' | 'approval' | 'rejection';
}

export interface DashboardKPI {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
}

export type MailStatus = 'read' | 'unread' | 'archived';

export interface Mail {
  id: string;
  subject: string;
  from: {
    name: string;
    email: string;
  };
  to: string;
  date: string;
  body: string;
  status: MailStatus;
  attachments?: string[];
  isHighPriority?: boolean;
}
