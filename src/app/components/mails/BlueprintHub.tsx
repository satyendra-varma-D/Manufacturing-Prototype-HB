import { ArrowLeft, History, Target, Calendar, DollarSign, BrainCircuit, Activity, ChevronDown } from 'lucide-react';
import warehouseBlueprint from './warehouse_blueprint.png';

interface BlueprintHubProps {
  onBack: () => void;
  zoomLevel: number;
  selectedMatchId: string | null;
  setSelectedMatchId: (id: string) => void;
  proposedValue: number;
  setProposedValue: (val: number) => void;
  matchedRecords: any[];
  currentMatchModel: any;
  dynamicMargin: number;
  profitMarginValue: number;
  baseIntelligenceCost: number;
  onInitializeRFP: () => void;
}

export default function BlueprintHub({
  onBack,
  zoomLevel,
  selectedMatchId,
  setSelectedMatchId,
  proposedValue,
  setProposedValue,
  matchedRecords,
  currentMatchModel,
  dynamicMargin,
  profitMarginValue,
  baseIntelligenceCost,
  onInitializeRFP
}: BlueprintHubProps) {
  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in fade-in duration-500 overflow-hidden">
      <header className="h-20 bg-white border-b border-gray-100 px-10 flex items-center justify-between shadow-sm relative z-10">
        <div className="flex items-center gap-10">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-all border border-gray-100 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Back to Mail</span>
          </button>
          <div className="h-10 w-px bg-gray-100" />
          <div>
            <h2 className="text-[13px] font-bold text-indigo-600 uppercase tracking-[0.2em]">Facility Intelligence Hub</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Infrastructure Analysis • Drawing Based</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col border-r border-gray-100 bg-gray-50/20 overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-6 flex flex-col items-center">
            <div className="flex gap-6 w-full max-w-[1140px] items-start justify-center">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">Current RFP Layout</span>
                  <span className="text-[9px] font-bold text-gray-400">DWG-B04-SEC-09</span>
                </div>
                <div className="relative transition-transform duration-700 ease-in-out bg-white rounded-[24px] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden" 
                     style={{ 
                        transform: `scale(${zoomLevel})`,
                        width: '540px',
                        height: '800px'
                     }}>
                  <img 
                    src={warehouseBlueprint} 
                    alt="Current Layout" 
                    className="w-full h-full object-contain bg-[#fafafa] opacity-[0.98]"
                  />
                  <div className="absolute inset-0 bg-indigo-50/5 pointer-events-none" />
                </div>
              </div>

              <div className="h-[800px] w-px bg-gray-100 mt-10" />

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">Match: {currentMatchModel.id}</span>
                  <span className="text-[9px] font-bold text-gray-400">Baseline Verified</span>
                </div>
                <div className="relative transition-transform duration-700 ease-in-out bg-white rounded-[24px] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden" 
                     style={{ 
                        transform: `scale(${zoomLevel})`,
                        width: '540px',
                        height: '800px'
                     }}>
                  <img 
                    src={currentMatchModel.blueprint} 
                    alt="Historical Baseline" 
                    className="w-full h-full object-contain bg-[#fafafa] opacity-[0.4] grayscale"
                  />
                  <div className="absolute inset-0 bg-emerald-50/10 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="w-full max-w-[1100px] space-y-4 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-3.5 h-3.5 text-indigo-600" />
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.2em]">Select Baseline for Comparison</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {matchedRecords.map((match) => (
                  <button 
                    key={match.id}
                    onClick={() => setSelectedMatchId(match.id)}
                    className={`group bg-white p-3.5 rounded-[20px] border transition-all text-left flex items-center gap-4 hover:shadow-xl hover:shadow-indigo-500/5 ${selectedMatchId === match.id ? 'border-indigo-600 ring-2 ring-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
                  >
                    <div className="w-14 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <img src={warehouseBlueprint} className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-50 px-1.5 py-0.5 rounded">{match.id}</span>
                        <div className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] ring-1 ring-emerald-100 px-1.5 py-0.5 rounded-full bg-emerald-50">
                          <Target className="w-2.5 h-2.5" /> {match.match}%
                        </div>
                      </div>
                      <p className="text-[11px] font-bold text-gray-900 truncate leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{match.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Infrastructure Analysis Hub • Drawing Master</p>
            <div className="flex items-center gap-6">
               <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest"><Activity className="w-3.5 h-3.5" /> Processor Active</span>
               <span className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest"><BrainCircuit className="w-3.5 h-3.5" /> Logic Synchronized</span>
            </div>
          </div>
        </div>

        <div className="w-[540px] flex-shrink-0 bg-white border-l border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="p-8 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1 bg-indigo-600 h-4 rounded-full" />
                <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Project Summary</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Project Classification</p>
                  <div className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 flex justify-between items-center shadow-inner">
                    <span>ASSEMBLY-OPERATIONS-2026</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-1 bg-indigo-600 h-4 rounded-full" />
                <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Comparison Grid</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: 'Building Area (SQ FT)', current: '115,165', baseline: currentMatchModel.parameters.area },
                  { label: 'Power Load Capacity', current: '400V 64A', baseline: currentMatchModel.parameters.load },
                  { label: 'Clear Ceiling Height', current: '38 ft', baseline: currentMatchModel.parameters.height },
                ].map((field, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2.5">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{field.label}</p>
                    <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                      <div className="bg-white p-2.5"><p className="text-[12px] font-bold text-gray-900">{field.current}</p></div>
                      <div className="bg-gray-50/50 p-2.5"><p className="text-[12px] font-bold text-gray-400">{field.baseline}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <div className="bg-white border border-indigo-100 rounded-[32px] p-8 shadow-[0_20px_50px_-12px_rgba(99,102,241,0.1)] space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2"><DollarSign className="w-4 h-4 text-indigo-600" /> Commercial Logic</h3>
                  <p className="text-sm font-bold text-emerald-600">{dynamicMargin.toFixed(1)}%</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Proposed Value</p>
                    <span className="text-sm font-bold text-gray-900">€{proposedValue.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min={baseIntelligenceCost} max="1000000" value={proposedValue} 
                    onChange={(e) => setProposedValue(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
                <button 
                  onClick={onInitializeRFP}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px]"
                >
                  Initialize RFP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
