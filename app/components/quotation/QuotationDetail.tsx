import { Link, useParams } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, Edit, Send, CheckCircle2, XCircle, Download,
  Clock, History, ShieldCheck, Target, TrendingUp, AlertCircle,
  BrainCircuit, Users, ExternalLink, Activity, Info,
  ChevronRight, FileDown, MoreHorizontal, Printer
} from 'lucide-react';
import { mockQuotations } from '../../data/mockData';
import StatusBadge from '../shared/StatusBadge';

export default function QuotationDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const quotation = mockQuotations.find(q => q.id === id);

  if (!quotation) {
    return (
      <div className="max-w-7xl mx-auto text-center py-32 bg-[#fafbfc] min-h-screen">
        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 border border-gray-100 shadow-sm">
           <AlertCircle className="w-8 h-8 text-gray-200" />
        </div>
        <p className="text-gray-400 font-semibold uppercase tracking-widest text-[11px]">Specification not localized</p>
        <Link to="/quotations" className="text-indigo-600 font-bold hover:underline mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest">
           <ArrowLeft className="w-3.5 h-3.5" /> Return to Hub
        </Link>
      </div>
    );
  }

  const canEdit = user?.role === 'user' || user?.role === 'admin';
  const canApprove = user?.role === 'manager' || user?.role === 'admin';
  const canSend = quotation.status === 'approved';
  const totalValue = quotation.bom.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 pb-32 pt-10 px-8 bg-[#fafbfc] min-h-screen">
      
      {/* 1. Minimal Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/quotations" className="p-2.5 bg-white shadow-sm border border-gray-100 rounded-lg hover:bg-gray-50 transition-all text-gray-400">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
             <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">{quotation.name}</h1>
                <StatusBadge status={quotation.status} />
             </div>
             <div className="flex items-center gap-4 mt-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{quotation.id} • V{quotation.version}</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-100 text-[9px] font-bold uppercase tracking-wider">
                   <ShieldCheck className="w-3 h-3" /> Baseline Verified
                </div>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {canSend && (
            <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-all text-xs uppercase tracking-widest">
              <Send className="w-3.5 h-3.5" /> Dispatch Spec
            </button>
          )}
          {quotation.status === 'under_review' && canApprove && (
            <button className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-all text-xs uppercase tracking-widest">Approve</button>
          )}
          {canEdit && (
            <Link to={`/quotations/${quotation.id}/edit`} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-all text-xs uppercase tracking-widest">
              <Edit className="w-3.5 h-3.5" /> Modify
            </Link>
          )}
          <button className="p-2.5 bg-white border border-gray-200 text-gray-400 rounded-lg hover:bg-gray-50 transition-all shadow-sm">
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Simplified Lifecycle Pathway */}
      <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
         <div className="flex items-center justify-between mb-10">
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-widest">Governance Lifecycle</h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
               Velocity: High (1.5h turnaround)
            </div>
         </div>
         
         <div className="grid grid-cols-4 gap-4 relative">
            <div className="absolute left-[8%] right-[8%] top-5 h-px bg-gray-100" />
            {[
               { label: 'Capture', user: 'System', status: 'done' },
               { label: 'Estimation', user: 'Sales', status: 'done' },
               { label: 'Validation', user: 'Manager', status: 'current' },
               { label: 'Dispatch', user: '-', status: 'pending' },
            ].map((step, idx) => (
               <div key={idx} className="relative z-10 flex flex-col items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border-2 transition-all ${
                     step.status === 'done' ? 'bg-emerald-500 text-white border-emerald-500' : 
                     step.status === 'current' ? 'bg-indigo-600 text-white border-indigo-600 animate-pulse' : 'bg-white text-gray-300 border-gray-100'
                  }`}>
                     {step.status === 'done' ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">{idx + 1}</span>}
                  </div>
                  <div className="text-center">
                     <p className={`text-[11px] font-bold uppercase tracking-widest ${step.status === 'pending' ? 'text-gray-300' : 'text-gray-900'}`}>{step.label}</p>
                     <p className="text-[10px] text-gray-400 font-medium mt-1">Ref: {step.user}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Detailed Context Cards */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Corporate Client</p>
                <p className="text-sm font-semibold text-gray-900">{quotation.customer}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Custodian</p>
                <p className="text-sm font-semibold text-gray-900">{quotation.owner}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Accuracy Ratio</p>
                <p className="text-sm font-semibold text-emerald-600">94.2% AI Support</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">RFQ Anchor</p>
                <Link to={`/rfqs/${quotation.rfqId}`} className="text-sm font-semibold text-indigo-600 hover:underline">{quotation.rfqId}</Link>
              </div>
          </div>

          {/* Minimalist BOM Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
                <div className="flex items-center gap-3 text-gray-700">
                   <BrainCircuit className="w-4.5 h-4.5" />
                   <h2 className="text-sm font-semibold uppercase tracking-widest">Technical Specifications</h2>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-900">
                   <FileDown className="w-4 h-4" /> Download
                </button>
             </div>
             
             <table className="w-full text-left">
               <thead className="bg-[#fafbfc] text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                 <tr>
                   <th className="px-8 py-4">Component Group</th>
                   <th className="px-8 py-4">Origin Detail</th>
                   <th className="px-8 py-4 text-center">Qty</th>
                   <th className="px-8 py-4 text-right">Net Ext.</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {quotation.bom.map((item) => (
                   <tr key={item.id} className="hover:bg-gray-50/50 transition-all">
                     <td className="px-8 py-6">
                        <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.partNumber}</p>
                        <p className="text-[11px] text-gray-500 font-medium italic opacity-70">{item.description}</p>
                     </td>
                     <td className="px-8 py-6">
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded text-[9px] font-bold text-gray-500 uppercase tracking-wide">
                           <History className="w-3 h-3" /> KB Ref 192
                        </div>
                     </td>
                     <td className="px-8 py-6 text-center text-sm font-bold text-gray-900">{item.quantity}</td>
                     <td className="px-8 py-6 text-right font-semibold text-gray-900 text-sm">${item.totalPrice.toLocaleString()}</td>
                   </tr>
                 ))}
               </tbody>
               <tfoot className="bg-gray-50/50 border-t border-gray-100">
                  <tr>
                    <td colSpan={3} className="px-8 py-8 text-[11px] font-bold uppercase tracking-widest text-gray-400 italic">Total rule-driven specification value</td>
                    <td className="px-8 py-8 text-right font-bold text-gray-900">
                       <p className="text-3xl tracking-tightest leading-none">${totalValue.toLocaleString()}</p>
                    </td>
                  </tr>
               </tfoot>
             </table>
          </div>
        </div>

        <div className="space-y-8">
          {/* Simple Metrics Radar */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm space-y-8">
             <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Process Efficiency</p>
                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><Activity className="w-4 h-4" /></div>
             </div>
             <div>
                <span className="text-4xl font-semibold text-gray-900">1.5h</span>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Avg Action TAT</p>
             </div>
             <div className="pt-6 border-t border-gray-50 space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase">
                   <span className="text-gray-400">Benchmark: 24h</span>
                   <span className="text-emerald-600">+22.5h delta</span>
                </div>
                <div className="h-1 bg-gray-50 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-1/12 rounded-full" />
                </div>
             </div>
          </div>

          {/* Simple Custodian Log */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
             <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2.5">
                <Users className="w-4 h-4 text-indigo-600" /> Custodian Log
             </h3>
             <div className="space-y-6 relative">
                <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gray-100 border-dashed border-l" />
                {[
                   { user: 'Automation', action: 'Baseline Inheritance', color: 'bg-indigo-600' },
                   { user: 'M. Varma', action: 'Data Synchronization', color: 'bg-gray-800' },
                   { user: 'System Agent', action: 'Entity Discovery', color: 'bg-indigo-400' },
                ].map((log, i) => (
                  <div key={i} className="relative z-10 flex items-start gap-4">
                     <div className={`w-5 h-5 rounded-md ${log.color} shadow-sm flex items-center justify-center text-[8px] font-bold text-white uppercase`}>
                        {log.user[0]}
                     </div>
                     <div>
                        <p className="text-xs font-semibold text-gray-900 leading-none">{log.action}</p>
                        <p className="text-[10px] text-gray-400 font-medium uppercase mt-1">Ref: {log.user}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
