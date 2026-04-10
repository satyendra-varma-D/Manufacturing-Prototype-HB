import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Search, Eye, Edit, Users } from 'lucide-react';
import { mockCustomers } from '../../data/mockData';
import StatusBadge from '../shared/StatusBadge';

export default function CustomerList() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [customers] = useState(mockCustomers);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const canCreate = user?.role === 'admin' || user?.role === 'manager';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">{filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''}</p>
        </div>
        {canCreate && (
          <Link
            to="/customers/new"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            New Customer
          </Link>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, company, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <Link
            key={customer.id}
            to={`/customers/${customer.id}`}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <StatusBadge status={customer.status} />
            </div>

            <h3 className="font-semibold text-gray-900 mb-1">{customer.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{customer.company}</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Value</span>
                <span className="font-medium text-gray-900">${(customer.totalValue / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">RFQs</span>
                <span className="font-medium text-gray-900">{customer.rfqCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Conversion</span>
                <span className="font-medium text-green-600">{Math.round(customer.conversionRate * 100)}%</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No customers found</p>
        </div>
      )}
    </div>
  );
}
