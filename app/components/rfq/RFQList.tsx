import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Plus, Search, Filter, Download, Eye, 
  Edit, Trash2, ChevronRight, BarChart3, 
  TrendingUp, Users, Clock, Target, 
  ShieldCheck, ArrowUpRight, Activity, Database
} from 'lucide-react';
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

  const totalPipeline = filteredRFQs.reduce((sum, rfq) => sum + rfq.value, 0);

  const canCreate = user?.role === 'user' || user?.role === 'admin';

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 pt-4">
      
      {/* 1. List Header & Action Hub */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
        <div className="space-y-4">
           <nav className="flex items-center gap-2 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              <span>RFP System</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900">Inventory Registry</span>
           </nav>
           <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Request Inventory</h1>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{filteredRFQs.length} Management Units Active</p>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl">
               <div className="w-2 h-2 bg-indigo-500 rounded-full" />
               <p className="text-[11px] font-bold text-gray-900 uppercase tracking-widest leading-none">Pipeline: €{totalPipeline.toLocaleString()}</p>
           </div>
           {canCreate && (
             <Link
               to="/rfqs/new"
               className="px-6 py-2.5 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-lg hover:bg-indigo-700 shadow-sm transition-all"
             >
               Initialize RFP
             </Link>
           )}
        </div>
      </div>

      {/* 2. Simplified KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Avg Extraction', value: '94.2%', icon: Target },
           { label: 'Sync Status', value: 'Complete', icon: Database },
           { label: 'Pending Audit', value: '4 Units', icon: Clock },
           { label: 'System Health', value: 'Secure', icon: ShieldCheck },
         ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm flex items-center justify-between">
               <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-base font-bold text-gray-900">{stat.value}</p>
               </div>
               <stat.icon className="w-5 h-5 text-gray-200" />
            </div>
         ))}
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Project ID, Name or Client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:border-indigo-400 outline-none transition-all shadow-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as RFQStatus | 'all')}
          className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-500 outline-none shadow-sm cursor-pointer min-w-[180px]"
        >
          <option value="all">Status Filter</option>
          <option value="draft">Draft Registry</option>
          <option value="parsed">Extracted</option>
          <option value="under_review">In Audit</option>
          <option value="approved">Baseline Set</option>
        </select>
      </div>

      {/* 4. High-Density Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ref Code</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Project Descriptor</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Client Entity</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Est. Value</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredRFQs.map((rfq) => (
                <tr key={rfq.id} className="group hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <Link to={`/rfqs/${rfq.id}`} className="text-xs font-bold text-indigo-600">
                       {rfq.id}
                    </Link>
                  </td>
                  <td className="px-6 py-5">
                     <p className="text-sm font-bold text-gray-900 tracking-tight">{rfq.name}</p>
                     <p className="text-[10px] text-gray-400 font-medium">{new Date(rfq.date).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-5 text-xs font-semibold text-gray-600">{rfq.customer}</td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <StatusBadge status={rfq.status} />
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-900">€{rfq.value.toLocaleString()}</td>
                  <td className="px-6 py-5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/rfqs/${rfq.id}`} className="p-2 text-gray-300 hover:text-indigo-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link to={`/rfqs/${rfq.id}/edit`} className="p-2 text-gray-300 hover:text-indigo-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
