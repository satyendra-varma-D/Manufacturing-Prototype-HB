import { RFQStatus, QuotationStatus } from '../../types';

interface StatusBadgeProps {
  status: RFQStatus | QuotationStatus | string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-gray-100 text-gray-700' },
  parsed: { label: 'Parsed', className: 'bg-blue-100 text-blue-700' },
  under_review: { label: 'Under Review', className: 'bg-orange-100 text-orange-700' },
  approved: { label: 'Approved', className: 'bg-green-100 text-green-700' },
  converted: { label: 'Converted', className: 'bg-indigo-100 text-indigo-700' },
  closed: { label: 'Closed', className: 'bg-gray-100 text-gray-700' },
  ai_suggested: { label: 'AI Suggested', className: 'bg-purple-100 text-purple-700' },
  submitted: { label: 'Submitted', className: 'bg-blue-100 text-blue-700' },
  rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700' },
  rework: { label: 'Rework', className: 'bg-yellow-100 text-yellow-700' },
  resubmitted: { label: 'Resubmitted', className: 'bg-cyan-100 text-cyan-700' },
  sent: { label: 'Sent', className: 'bg-teal-100 text-teal-700' },
  pending: { label: 'Pending', className: 'bg-orange-100 text-orange-700' },
  in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Completed', className: 'bg-green-100 text-green-700' },
  active: { label: 'Active', className: 'bg-green-100 text-green-700' },
  inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-700' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-700' };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
