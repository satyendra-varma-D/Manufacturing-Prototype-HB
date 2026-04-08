import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Search, Filter, Download, Eye, Edit, Trash2, ChevronRight } from 'lucide-react';
import { mockRFQs } from '../../data/mockData';
import StatusBadge from '../shared/StatusBadge';
import { RFQStatus } from '../../types';

export default function RFQList() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RFQStatus | 'all'>('all');
  const [rfqs] = useState(mockRFQs);

  const filteredRFQs = rfqs.filter(rfq => {
    const matchesSearch = rfq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rfq.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rfq.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rfq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const canCreate = user?.role === 'user' || user?.role === 'admin';

  return (
    <div className="space-y-6">
      <div className="py-2">
        <nav className="flex items-center gap-2 text-[13px] font-medium text-gray-400">
           <span>Home</span>
           <ChevronRight className="w-3.5 h-3.5" />
           <span className="text-gray-900">RFQs</span>
        </nav>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">RFQs</h1>
          <p className="text-gray-600 mt-1">{filteredRFQs.length} request{filteredRFQs.length !== 1 ? 's' : ''} found</p>
        </div>
        {canCreate && (
          <Link
            to="/rfqs/new"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            New RFQ
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, name, or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as RFQStatus | 'all')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="parsed">Parsed</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* RFQ Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRFQs.map((rfq) => (
                <tr key={rfq.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                    <Link to={`/rfqs/${rfq.id}`}>{rfq.id}</Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{rfq.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rfq.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(rfq.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={rfq.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rfq.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${rfq.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[60px]">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${rfq.confidenceScore * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{Math.round(rfq.confidenceScore * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/rfqs/${rfq.id}`}
                        className="p-1 text-gray-400 hover:text-indigo-600"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      {canCreate && (
                        <Link
                          to={`/rfqs/${rfq.id}/edit`}
                          className="p-1 text-gray-400 hover:text-indigo-600"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      )}
                      {user?.role === 'admin' && (
                        <button
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRFQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No RFQs found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing 1 to {filteredRFQs.length} of {filteredRFQs.length} results
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
