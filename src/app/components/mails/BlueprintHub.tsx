import { useState } from 'react';
import { ArrowLeft, History, Target, Calendar, DollarSign, BrainCircuit, Activity, ChevronDown, Info } from 'lucide-react';
import warehouseBlueprint from './simple_rectangle_plat.svg';

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
  const [projectName, setProjectName] = useState("Industrial Bolt Flange - Batch 2026");
  const [currentParams, setCurrentParams] = useState({
    plateWidth: '6.000',
    plateHeight: '4.000',
    cornerRadius: '0.250',
    boltHoleWidth: '5.000',
    boltHoleHeight: '3.000',
    boltHoleDiameter: '0.250'
  });

  const handleParamChange = (key: string, value: string) => {
    setCurrentParams(prev => ({ ...prev, [key]: value }));
  };
  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in fade-in duration-500 overflow-hidden">
      <header className="h-20 bg-white border-b border-gray-100 px-10 flex items-center justify-between shadow-sm relative z-10">
        <div className="flex items-center gap-10">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-all border border-gray-100 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Back to Mail</span>
          </button>
          <div className="h-10 w-px bg-gray-100" />
          <div>
            <h2 className="text-[13px] font-bold text-primary uppercase tracking-[0.2em]">Facility Intelligence Hub</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Infrastructure Analysis • Drawing Based</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col border-r border-gray-100 bg-gray-50/20 overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center py-2 px-4">
            <div className="flex gap-8 w-full max-w-[1400px] items-start justify-center">
              <div className="flex flex-col">
                <div className="sticky top-0 z-20 py-4 bg-[#F9FAFB]/90 backdrop-blur-md flex items-center justify-between px-2 mb-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-secondary px-2.5 py-1 rounded-md border border-primary/20">Current RFP Layout</span>
                  <span className="text-[9px] font-bold text-gray-400 font-mono tracking-tighter">DWG-B04-SEC-09</span>
                </div>
                <div className="relative transition-transform duration-700 ease-in-out bg-white rounded-[24px] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden" 
                     style={{ 
                        transform: `scale(${zoomLevel})`,
                        width: '660px',
                        height: '600px'
                     }}>
                  <img 
                    src={warehouseBlueprint} 
                    alt="Current Layout" 
                    className="w-full h-full object-contain bg-[#fafafa] opacity-[0.98]"
                  />
                  <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                </div>
              </div>

              <div className="h-[680px] w-px bg-gray-200 mt-16" />

              <div className="flex flex-col">
                <div className="sticky top-0 z-20 py-4 bg-[#F9FAFB]/90 backdrop-blur-md flex items-center justify-between px-2 mb-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-secondary px-2.5 py-1 rounded-md border border-primary/20">Match: {currentMatchModel.id}</span>
                  <span className="text-[9px] font-bold text-gray-400 font-mono tracking-tighter">Baseline Verified</span>
                </div>
                <div className="relative transition-transform duration-700 ease-in-out bg-white rounded-[24px] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden" 
                     style={{ 
                        transform: `scale(${zoomLevel})`,
                        width: '660px',
                        height: '600px'
                     }}>
                  <img 
                    src={currentMatchModel.blueprint} 
                    alt="Historical Baseline" 
                    className="w-full h-full object-contain bg-[#fafafa] opacity-[0.4] grayscale"
                  />
                  <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 p-6 border-t border-gray-100 backdrop-blur-sm shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.04)]">
            <div className="max-w-[1100px] mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-3.5 h-3.5 text-primary" />
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.2em]">Select Baseline for Comparison</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {matchedRecords.map((match) => (
                  <button 
                    key={match.id}
                    onClick={() => setSelectedMatchId(match.id)}
                    className={`group bg-white p-3 rounded-[20px] border transition-all text-left flex items-center gap-4 hover:shadow-xl hover:shadow-primary/5 ${selectedMatchId === match.id ? 'border-primary ring-2 ring-primary/10' : 'border-gray-100 hover:border-primary/20'}`}
                  >
                    <div className="w-12 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <img src={warehouseBlueprint} className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[8px] font-bold text-primary uppercase tracking-widest bg-secondary px-1.5 py-0.5 rounded">{match.id}</span>
                        <div className="flex items-center gap-1 text-primary font-bold text-[10px] ring-1 ring-primary/20 px-1.5 py-0.5 rounded-full bg-secondary">
                          <Target className="w-2.5 h-2.5" /> {match.match}%
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-gray-900 truncate uppercase tracking-tight">{match.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          </div>
        
        <div className="w-[540px] flex-shrink-0 bg-white border-l border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="p-8 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1 bg-primary h-4 rounded-full" />
                <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Project Summary</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Project Name</label>
                    <div className="group relative">
                      <Info className="w-3 h-3 text-gray-300" />
                    </div>
                  </div>
                  <input 
                    type="text" 
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 shadow-sm focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1 bg-primary h-4 rounded-full" />
                  <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Comparison Grid</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: 'Plate Width', key: 'plateWidth', baseline: currentMatchModel.parameters.plateWidth, unit: 'in' },
                  { label: 'Plate Height', key: 'plateHeight', baseline: currentMatchModel.parameters.plateHeight, unit: 'in' },
                  { label: 'Corner Radius', key: 'cornerRadius', baseline: currentMatchModel.parameters.cornerRadius, unit: 'in' },
                  { label: 'Bolt Hole Width', key: 'boltHoleWidth', baseline: currentMatchModel.parameters.boltHoleWidth, unit: 'in' },
                  { label: 'Bolt Hole Height', key: 'boltHoleHeight', baseline: currentMatchModel.parameters.boltHoleHeight, unit: 'in' },
                  { label: 'Bolt Hole Diameter', key: 'boltHoleDiameter', baseline: currentMatchModel.parameters.boltHoleDiameter, unit: 'in' },
                ].map((field, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{field.label}</label>
                      <Info className="w-3 h-3 text-gray-300" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <div className="relative group">
                          <input 
                            value={currentParams[field.key as keyof typeof currentParams]}
                            onChange={(e) => handleParamChange(field.key, e.target.value)}
                            className="w-full pl-4 pr-10 py-3 bg-white border border-gray-100 rounded-xl text-[13px] font-bold text-gray-900 shadow-sm focus:border-primary outline-none transition-all group-hover:border-primary/20"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">{field.unit}</div>
                       </div>
                       <div className="relative group">
                          <div className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-50 rounded-xl text-[13px] font-bold text-gray-400 flex items-center">
                             {field.baseline}
                          </div>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">{field.unit}</div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">Proposed Value</label>
                  <Info className="w-3.5 h-3.5 text-gray-300" />
                </div>
                <div className="relative group">
                  <input 
                    type="number" 
                    value={proposedValue} 
                    onChange={(e) => setProposedValue(Number(e.target.value))}
                    className="w-full px-6 py-4 bg-white border border-gray-100 rounded-[18px] text-[15px] font-bold text-gray-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all pr-16 shadow-sm"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[13px] font-bold text-gray-400">€</div>
                </div>
              </div>

              <button 
                onClick={onInitializeRFP}
                className="w-full py-4.5 bg-primary text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-95"
              >
                Create RFP draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
