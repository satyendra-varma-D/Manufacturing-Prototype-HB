import { Link, useParams } from 'react-router';
import { ArrowLeft, Edit, Mail, Phone, Building } from 'lucide-react';
import { mockCustomers, mockRFQs, mockQuotations } from '../../data/mockData';
import StatusBadge from '../shared/StatusBadge';

export default function CustomerDetail() {
  const { id } = useParams();
  const customer = mockCustomers.find(c => c.id === id);

  if (!customer) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Customer not found</p>
      </div>
    );
  }

  const customerRFQs = mockRFQs.filter(rfq => rfq.customerId === customer.id);
  const customerQuotations = mockQuotations.filter(q => q.customerId === customer.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/customers" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
            <p className="text-gray-600 mt-1">{customer.company}</p>
          </div>
        </div>
        <Link
          to={`/customers/${customer.id}/edit`}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          <Edit className="w-4 h-4" />
          Edit
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </p>
                <p className="text-sm font-medium text-gray-900 mt-1">{customer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </p>
                <p className="text-sm font-medium text-gray-900 mt-1">{customer.phone || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Industry
                </p>
                <p className="text-sm font-medium text-gray-900 mt-1">{customer.industry || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <div className="mt-1">
                  <StatusBadge status={customer.status} />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Customer Since</p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {new Date(customer.createdDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Recent RFQs */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent RFQs</h2>
              <Link to="/rfqs" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {customerRFQs.slice(0, 5).map((rfq) => (
                <Link
                  key={rfq.id}
                  to={`/rfqs/${rfq.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{rfq.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{rfq.id} • {new Date(rfq.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={rfq.status} />
                    <span className="text-sm font-medium text-gray-900">${(rfq.value / 1000).toFixed(0)}K</span>
                  </div>
                </Link>
              ))}
              {customerRFQs.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No RFQs yet</p>
              )}
            </div>
          </div>

          {/* Recent Quotations */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Quotations</h2>
              <Link to="/quotations" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {customerQuotations.slice(0, 5).map((quote) => (
                <Link
                  key={quote.id}
                  to={`/quotations/${quote.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{quote.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{quote.id} • {new Date(quote.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={quote.status} />
                    <span className="text-sm font-medium text-gray-900">${(quote.value / 1000).toFixed(0)}K</span>
                  </div>
                </Link>
              ))}
              {customerQuotations.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No quotations yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statistics */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${(customer.totalValue / 1000).toFixed(0)}K
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total RFQs</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{customer.rfqCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {Math.round(customer.conversionRate * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
