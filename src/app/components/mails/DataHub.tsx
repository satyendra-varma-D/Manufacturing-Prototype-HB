import { ArrowLeft, Table, Database, CheckCircle, AlertCircle, DollarSign, Activity, BrainCircuit, Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface DataHubProps {
  onBack: () => void;
  onInitializeRFP: () => void;
}

export default function DataHub({ onBack, onInitializeRFP }: DataHubProps) {
  const [activeTab, setActiveTab] = useState<'extracted' | 'baseline'>('extracted');
  
  const extractedBOM = [
    { pos: '10', part: 'S-700-12', desc: 'Main Support Column S355', qty: 12, unit: 'pcs', match: '98%' },
    { pos: '20', part: 'B-22-X', desc: 'Bearing Housing Type X', qty: 45, unit: 'pcs', match: '94%' },
    { pos: '30', part: 'C-M-80', desc: 'Conveyor Motor 80kW', qty: 2, unit: 'set', match: '82%' },
    { pos: '40', part: 'EL-C-01', desc: 'Electronic Controller Board', qty: 5, unit: 'pcs', match: 'NEW' },
  ];

  const baselineBOM = [
    { pos: '10', part: 'S-700-12', desc: 'Main Support Column S355', qty: 10, unit: 'pcs', price: 450 },
    { pos: '20', part: 'B-22', desc: 'Bearing Housing Standard', qty: 40, unit: 'pcs', price: 85 },
    { pos: '30', part: 'C-M-75', desc: 'Conveyor Motor 75kW', qty: 2, unit: 'set', price: 1200 },
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in fade-in duration-500 overflow-hidden">
      <header className="h-20 bg-white border-b border-gray-100 px-10 flex items-center justify-between shadow-sm relative z-10">
        <div className="flex items-center gap-10">
          <button onClick={onBack} className="p-2 hover:bg-gray-50 rounded-xl transition-all border border-gray-100"><ArrowLeft className="w-5 h-5 text-gray-400" /></button>
          <div className="h-10 w-px bg-gray-100" />
          <div>
            <h2 className="text-[13px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Data Intelligence Hub</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Bill of Materials Analysis • BOM Based</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden bg-gray-50/50">
        <div className="flex-1 flex flex-col overflow-y-auto p-10 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
               <button 
                onClick={() => setActiveTab('extracted')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'extracted' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}>
                Extracted Data
               </button>
               <button 
                onClick={() => setActiveTab('baseline')}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'baseline' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}>
                Historical Baseline
               </button>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input type="text" placeholder="Search components..." className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500/20" />
               </div>
               <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-400"><Filter className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pos</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Part Number</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Qty</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Match Score</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(activeTab === 'extracted' ? extractedBOM : baselineBOM).map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5 text-xs font-mono text-gray-400">{(item as any).pos}</td>
                    <td className="px-8 py-5 text-sm font-bold text-gray-900">{(item as any).part}</td>
                    <td className="px-8 py-5 text-sm font-medium text-gray-600">{(item as any).desc}</td>
                    <td className="px-8 py-5 text-sm font-bold text-gray-900 text-center">{(item as any).qty} {(item as any).unit || 'pcs'}</td>
                    <td className="px-8 py-5">
                      {activeTab === 'extracted' && (
                        <div className="flex items-center gap-2">
                           <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden w-24">
                              <div className={`h-full ${(item as any).match === 'NEW' ? 'bg-indigo-500' : 'bg-emerald-500'}`} style={{ width: (item as any).match === 'NEW' ? '100%' : (item as any).match }} />
                           </div>
                           <span className="text-[10px] font-bold text-gray-400">{(item as any).match}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-5 text-right">
                      {(item as any).match === 'NEW' ? 
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-bold rounded-full border border-indigo-100 uppercase tracking-widest">New Entry</span> :
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-bold rounded-full border border-emerald-100 uppercase tracking-widest">Verified</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-[480px] bg-white border-l border-gray-100 p-10 flex flex-col space-y-10">
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-1 bg-emerald-600 h-5 rounded-full" />
                 <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Analytical Insights</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-emerald-50/50 border border-emerald-100 rounded-3xl space-y-1">
                    <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Accuracy</p>
                    <p className="text-2xl font-bold text-emerald-700">97.4%</p>
                 </div>
                 <div className="p-6 bg-indigo-50/50 border border-indigo-100 rounded-3xl space-y-1">
                    <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">New Items</p>
                    <p className="text-2xl font-bold text-indigo-700">04</p>
                 </div>
              </div>
           </div>

           <div className="flex-1 bg-gray-50 rounded-[32px] p-8 border border-gray-100 border-dashed flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-500">
                 <Database className="w-8 h-8" />
              </div>
              <div>
                 <p className="text-sm font-bold text-gray-900">Historical Comparison Ready</p>
                 <p className="text-xs text-gray-500 mt-1 max-w-[240px]">We found 12 similar material lists in the KB that match this project structure.</p>
              </div>
           </div>

           <button 
              onClick={onInitializeRFP}
              className="w-full py-5 bg-emerald-600 text-white rounded-[24xl] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all active:scale-95"
           >
              Process BOM to RFP
           </button>
        </div>
      </div>
    </div>
  );
}
