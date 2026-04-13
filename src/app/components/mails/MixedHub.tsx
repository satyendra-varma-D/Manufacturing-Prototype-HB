import { ArrowLeft, Layers, Box, FileText, Table, Image, Activity, BrainCircuit } from 'lucide-react';

interface MixedHubProps {
  onBack: () => void;
  onInitializeRFP: () => void;
}

export default function MixedHub({ onBack, onInitializeRFP }: MixedHubProps) {
  const sources = [
    { type: 'Drawing', icon: Box, status: 'Extracted', items: 12, color: 'text-primary', bg: 'bg-secondary' },
    { type: 'BOM', icon: Table, status: 'Verified', items: 45, color: 'text-primary', bg: 'bg-secondary' },
    { type: 'Vision', icon: Image, status: 'Pending', items: 5, color: 'text-orange-600', bg: 'bg-orange-50' },
    { type: 'Text', icon: FileText, status: 'Extracted', items: 8, color: 'text-primary', bg: 'bg-secondary' },
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in fade-in duration-500 overflow-hidden">
      <header className="h-20 bg-white border-b border-gray-100 px-10 flex items-center justify-between shadow-sm relative z-10">
        <div className="flex items-center gap-10">
          <button onClick={onBack} className="p-2 hover:bg-gray-50 rounded-xl transition-all border border-gray-100"><ArrowLeft className="w-5 h-5 text-gray-400" /></button>
          <div className="h-10 w-px bg-gray-100" />
          <div>
            <h2 className="text-[13px] font-bold text-gray-900 uppercase tracking-[0.2em]">Universal Intelligence Hub</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Cross-Domain RFP Analysis • Mixed Mode</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-gray-50/50 p-10 custom-scrollbar">
         <div className="max-w-[1240px] mx-auto space-y-10">
            <div className="flex items-center gap-4">
               <Layers className="w-8 h-8 text-primary" />
               <div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Aggregated RFP Insights</h1>
                  <p className="text-gray-500 font-medium">Analyzing multi-source data across 4 distinct domains.</p>
               </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
               {sources.map((src, i) => (
                  <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6 group hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer">
                     <div className={`w-14 h-14 ${src.bg} ${src.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <src.icon className="w-7 h-7" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{src.type} Intelligence</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{src.items} <span className="text-xs text-gray-300 font-medium">Entities</span></p>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${src.status === 'Pending' ? 'bg-orange-400' : 'bg-emerald-400'}`} />
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{src.status}</span>
                     </div>
                  </div>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
               <div className="lg:col-span-8 space-y-8">
                  <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden p-10 space-y-8">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-1 bg-primary h-5 rounded-full" />
                           <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Unified Perspective</h3>
                        </div>
                     </div>
                     <div className="h-[400px] bg-gray-50 rounded-[32px] flex items-center justify-center border-2 border-dashed border-gray-100">
                        <div className="text-center space-y-4">
                           <div className="w-20 h-20 bg-white rounded-full shadow-sm mx-auto flex items-center justify-center text-primary/30">
                              <BrainCircuit className="w-10 h-10" />
                           </div>
                           <p className="text-sm font-bold text-gray-900 uppercase tracking-widest">AI Synthesis Engine</p>
                           <p className="text-xs text-gray-400 max-w-[300px] font-medium leading-relaxed italic">"Merging spatial data from drawings with material costs from BOM to generate a high-confidence RFP master sheet."</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-4 space-y-8">
                  <div className="bg-indigo-900 rounded-[40px] p-10 text-white space-y-10 shadow-2xl shadow-indigo-200">
                     <div className="flex items-center justify-between opacity-60">
                        <Activity className="w-6 h-6" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Aggregate Status</p>
                     </div>
                     
                     <div className="space-y-4">
                        <p className="text-5xl font-bold tracking-tighter leading-none">91.4%</p>
                        <p className="text-sm font-bold text-indigo-200 uppercase tracking-[0.2em]">Weighted Confidence</p>
                     </div>

                     <div className="h-px bg-white/10" />

                     <div className="space-y-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                              <Box className="w-5 h-5 text-indigo-300" />
                           </div>
                           <p className="text-xs font-bold uppercase tracking-widest">Cross-Domain Verified</p>
                        </div>
                        <button 
                           onClick={onInitializeRFP}
                           className="w-full py-5 bg-white text-indigo-900 rounded-[28px] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-50 transition-all active:scale-95 shadow-xl shadow-black/20"
                        >
                           Initialize Unified RFP
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
