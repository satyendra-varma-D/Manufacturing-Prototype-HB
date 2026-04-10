import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { 
  ArrowLeft, Save, Building2, MapPin, 
  Database, ShieldCheck, Zap, Layers, 
  Info, Sparkles, ChevronRight, FileCode,
  CheckCircle2, AlertCircle, Clock, Activity
} from 'lucide-react';
import { mockRFQs, mockCustomers } from '../../data/mockData';

export default function RFQForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const existingRFQ = isEdit ? mockRFQs.find(r => r.id === id) : null;

  const [formData, setFormData] = useState({
    name: existingRFQ?.name || 'FACILITY-EXTENSION-MUNICH-2026',
    customerId: existingRFQ?.customerId || 'CUST-001',
    source: existingRFQ?.source || 'email',
    description: existingRFQ?.description || 'Structural expansion of the Munich fulfillment center to accommodate new logistics sorting lines. Requires seismic anchoring and high-load floor slabs.',
    estimatedValue: existingRFQ?.value || 485000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/rfqs');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 pt-4">
      
      {/* 1. Simple Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center gap-6">
           <Link to="/rfqs" className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-900 transition-all">
             <ArrowLeft className="w-4 h-4" />
           </Link>
           <div className="space-y-1">
              <nav className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                 <span>RFP Protocol</span>
                 <ChevronRight className="w-3 h-3" />
                 <span>Creation Engine</span>
              </nav>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                 {isEdit ? 'Refine Project Scope' : 'Initialize New RFP'}
              </h1>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <button onClick={() => navigate('/rfqs')} className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">Cancel</button>
           <button onClick={handleSubmit} className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2">
             <Save className="w-4 h-4" /> COMMIT VERSION 1.0
           </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Left Side: Summary Context */}
        <div className="col-span-4 space-y-6">
           <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-6 space-y-6">
              <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                 <Database className="w-4 h-4 text-indigo-600" /> Extracted Context
              </h3>
              
              <div className="space-y-4">
                 <div className="space-y-1">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Facility Hub</p>
                    <p className="text-sm font-bold text-gray-900">115,165 SQ FT Area</p>
                 </div>
                 <div className="space-y-1 pt-4 border-t border-gray-100">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Calculated Load</p>
                    <p className="text-sm font-bold text-gray-900">400V 643A Sync</p>
                 </div>
                 <div className="space-y-1 pt-4 border-t border-gray-100">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Baseline Logic</p>
                    <p className="text-[11px] font-medium text-gray-500 italic leading-relaxed">System verified against Munich Branch 03 historical baseline layout.</p>
                 </div>
              </div>
           </div>

           <div className="p-6 rounded-2xl bg-white border border-gray-100 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Integrity Check Passed</span>
           </div>
        </div>

        {/* Right Side: Main Definition Form */}
        <div className="col-span-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">RFP Internal Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-indigo-500 transition-all outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Target Client Entity</label>
                    <select
                      value={formData.customerId}
                      onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-indigo-500 transition-all outline-none"
                      required
                    >
                      {mockCustomers.map((customer) => (
                        <option key={customer.id} value={customer.id}>{customer.company}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Capture Protocol</label>
                    <div className="flex gap-4">
                       {['email', 'portal'].map((source) => (
                          <button 
                            key={source} type="button" 
                            onClick={() => setFormData({ ...formData, source })}
                            className={`flex-1 py-3 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all ${formData.source === source ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-200 text-gray-400 hover:border-indigo-200'}`}
                          >
                             {source}
                          </button>
                       ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Commercial Estimation</label>
                    <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-300">€</span>
                       <input
                         type="number"
                         value={formData.estimatedValue}
                         onChange={(e) => setFormData({ ...formData, estimatedValue: parseFloat(e.target.value) })}
                         className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-indigo-500 transition-all outline-none"
                       />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Technical Scope Breakdown</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-4 bg-gray-50 border border-transparent rounded-xl text-sm font-medium text-gray-700 leading-relaxed focus:bg-white focus:border-indigo-500 transition-all outline-none"
                    rows={6}
                  />
                </div>
             </div>
             <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Protocol Core v4.1</span>
                <div className="flex items-center gap-2 text-indigo-400">
                   <Activity className="w-3.5 h-3.5" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Session Ready</span>
                </div>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
}
