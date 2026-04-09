import { Link, useParams, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, Edit, FileText, CheckCircle, 
  XCircle, Sparkles, ExternalLink, Activity,
  Target, ShieldCheck, Database, Layers,
  Zap, Building2, ClipboardList, Clock,
  MoreHorizontal, ChevronRight, Download, Share2,
  AlertCircle
} from 'lucide-react';
import { mockRFQs } from '../../data/mockData';
import StatusBadge from '../shared/StatusBadge';

export default function RFQDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const rfq = mockRFQs.find(r => r.id === id);

  if (!rfq) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <div className="p-4 bg-gray-50 rounded-2xl mb-4">
           <AlertCircle className="w-8 h-8 text-gray-300" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">RFP Not Found</h2>
        <Link to="/rfqs" className="text-sm font-bold text-indigo-600 mt-4">Return to Inventory</Link>
      </div>
    );
  }

  const canEdit = user?.role === 'user' || user?.role === 'admin';
  const canApprove = user?.role === 'manager' || user?.role === 'admin';
  const canConvert = rfq.status === 'approved' && (user?.role === 'user' || user?.role === 'admin');

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 pt-4">
      
      {/* 1. Standard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-8">
        <div className="space-y-4">
           <nav className="flex items-center gap-2 text-[11px] font-medium text-gray-400">
              <Link to="/rfqs" className="hover:text-gray-900 transition-colors uppercase tracking-wider">Inventory</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900 uppercase tracking-wider">{rfq.id}</span>
           </nav>
           <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{rfq.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                 <span className="flex items-center gap-1.5 font-medium"><Building2 className="w-4 h-4" /> {rfq.customer}</span>
                 <span className="w-1 h-1 bg-gray-300 rounded-full" />
                 <span className="flex items-center gap-1.5 font-medium"><Clock className="w-4 h-4" /> {new Date(rfq.date).toLocaleDateString()}</span>
              </div>
           </div>
        </div>

        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 mr-4">
              <StatusBadge status={rfq.status} />
              <span className="text-xs font-medium text-gray-400">v{rfq.version}.0</span>
           </div>
           
           {rfq.status === 'draft' && canEdit && (
              <Link to={`/rfqs/${rfq.id}/extract`} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all shadow-sm">
                 <Sparkles className="w-4 h-4 text-indigo-600" /> AI RE-EXTRACT
              </Link>
           )}
           {canConvert && (
              <button onClick={() => navigate('/quotations/new')} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-sm">
                 GENERATE QUOTATION
              </button>
           )}
           {rfq.status === 'under_review' && canApprove && (
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm">
                 APPROVE
              </button>
           )}
           <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50">
              <MoreHorizontal className="w-4 h-4" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* 2. Technical Data Specs - Simple Cards */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Technical Specifications</h2>
                <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-600">
                   <Target className="w-3.5 h-3.5" /> 94% Accuracy
                </div>
             </div>
             
             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                   <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                      <Layers className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Building Area</p>
                      <p className="text-base font-bold text-gray-900">115,165 SQ FT</p>
                   </div>
                </div>

                <div className="p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                   <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                      <Zap className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Power Load</p>
                      <p className="text-base font-bold text-gray-900">400V 64A SYNC</p>
                   </div>
                </div>

                <div className="md:col-span-2 p-4 rounded-xl bg-indigo-50/30 border border-indigo-100/50">
                   <div className="flex items-center gap-2 mb-2 text-indigo-600">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">AI Logic Matching</span>
                   </div>
                   <p className="text-[13px] text-gray-600 font-medium leading-relaxed italic">The facility layout matches Munich Branch 03 historical baseline. Floor load capacity is within strategic limits for standard production lines.</p>
                </div>
             </div>
          </div>

          {/* 3. Materials List - Simple Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Material Baseline (BOM)</h2>
                <span className="text-[10px] font-bold text-gray-400 uppercase">{rfq.extractedData?.items.length} Items Listed</span>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-gray-50/50 border-b border-gray-100">
                      <tr>
                         <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ref ID</th>
                         <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Technical Description</th>
                         <th className="px-6 py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">Qty</th>
                         <th className="px-6 py-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-wider">Confidence</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {(rfq.extractedData?.items || []).map((item) => (
                         <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                            <td className="px-6 py-4 font-bold text-xs text-indigo-600">{item.partNumber}</td>
                            <td className="px-6 py-4 text-xs font-semibold text-gray-700">{item.description}</td>
                            <td className="px-6 py-4 text-center text-xs font-bold text-gray-900">{item.quantity}</td>
                            <td className="px-6 py-4 text-right">
                               <span className="text-xs font-bold text-emerald-600">{item.confidenceScore ? Math.round(item.confidenceScore * 100) : 100}%</span>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* Sidebar - Simple Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
           
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-between">
                 Commercial Audit <Activity className="w-4 h-4" />
              </h3>
              <div className="space-y-4">
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Estimated Value</p>
                    <p className="text-2xl font-bold text-gray-900">€{rfq.value.toLocaleString()}</p>
                 </div>
                 <div className="pt-4 border-t border-gray-50">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Extraction Confidence</p>
                    <div className="flex items-center gap-3">
                       <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${rfq.confidenceScore * 100}%` }} />
                       </div>
                       <span className="text-sm font-bold text-gray-900">{Math.round(rfq.confidenceScore * 100)}%</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Support Documents</h3>
              <div className="space-y-2">
                 {(rfq.documents || []).map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-all cursor-pointer">
                       <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className="w-4 h-4 text-gray-300" />
                          <span className="text-xs font-semibold text-gray-700 truncate">{doc}</span>
                       </div>
                       <ExternalLink className="w-3 h-3 text-gray-300" />
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-6 rounded-xl border border-dashed border-gray-200 flex flex-col items-center text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-gray-200" />
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Protocol Verified</p>
           </div>
        </div>
      </div>
    </div>
  );
}
