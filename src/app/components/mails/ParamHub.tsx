import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle, Activity, BrainCircuit, 
  Beaker, Sparkles, DollarSign, 
  TrendingUp, Target, Scale, Zap, ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface ParamHubProps {
  onBack: () => void;
  mailContent: {
    subject: string;
    body: string;
    attachments?: string[];
  };
  onInitializeRFP: () => void;
}

export default function ParamHub({ onBack, mailContent, onInitializeRFP }: ParamHubProps) {
  
  const [currentValue, setCurrentValue] = useState(485000);
  const baseCost = 342300;
  const currentMargin = (((currentValue - baseCost) / currentValue) * 100).toFixed(1);

  const extractedParams = [
    { label: 'Technical Scope', value: 'B04-HUB-EXP (Facility 04)', conf: 0.99, group: 'Project' },
    { label: 'Estimated Material Value', value: '€750,000', conf: 0.96, group: 'Commercial' },
    { label: 'Fulfillment Deadline', value: '2026-06-30', conf: 0.92, group: 'Commercial' },
    { label: 'Structural Grade', value: 'S355 Structural Steel', conf: 0.88, group: 'Technical' },
    { label: 'Requirement Standard', value: 'EN 1090-2 (EXC2)', conf: 0.91, group: 'Technical' },
    { label: 'Power Infrastructure', value: '400V 64A Industrial', conf: 0.95, group: 'Technical' },
    { label: 'Target Handover', value: 'August 2026', conf: 0.89, group: 'Technical' },
    { label: 'Allocation Zone', value: 'SEC-A1 North Corridor', conf: 0.93, group: 'Project' },
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(Number(e.target.value));
  };

  const handleFinalSubmit = () => {
    onInitializeRFP();
  };

  // Calculate width for the slider track fill
  const min = 350000;
  const max = 850000;
  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in fade-in duration-500 overflow-hidden">
      <header className="h-20 bg-white border-b border-gray-100 px-10 flex items-center justify-between shadow-sm relative z-20">
        <div className="flex items-center gap-10">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-all border border-gray-100 shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Back to Mail</span>
          </button>
          <div className="h-10 w-px bg-gray-100" />
          <div>
            <h2 className="text-[14px] font-black text-indigo-600 uppercase tracking-[0.3em]">
               Linguistic Intelligence Hub
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              Pure Data Extraction • Financial Strategy Suggester
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Active Extraction Session</span>
           </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden bg-gray-50/20 justify-center">
        <div className="w-full max-w-[1340px] px-12 flex gap-10 my-10 animate-in slide-in-from-bottom-8 duration-700 overflow-hidden">
            
            {/* Left: THE EXTRACTED FINDINGS */}
            <div className="flex-1 bg-white shadow-2xl shadow-indigo-500/5 flex flex-col border border-gray-100 overflow-y-auto custom-scrollbar rounded-[48px] relative z-10">
               <div className="p-12 space-y-12">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 bg-indigo-600 h-6 rounded-full" />
                      <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-[0.2em] leading-none text-indigo-600">EXTRACTED CORE PARAMETERS</h3>
                    </div>
                    <div className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-full border border-indigo-100">
                       FACTUAL EXTRACTION
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-12">
                    {['Project', 'Commercial', 'Technical'].map((group) => (
                      <div key={group} className="space-y-6">
                        <h4 className="text-[11px] font-bold text-indigo-400 uppercase tracking-[0.3em] flex items-center gap-3">
                           {group === 'Project' && <Beaker className="w-4 h-4" />}
                           {group === 'Commercial' && <DollarSign className="w-4 h-4" />}
                           {group === 'Technical' && <BrainCircuit className="w-4 h-4" />}
                           {group} Data points
                        </h4>
                        <div className="grid grid-cols-2 gap-6">
                          {extractedParams.filter(p => p.group === group).map((param, i) => (
                            <div key={i} className="group relative">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2.5 block">{param.label}</label>
                              <div className="flex-1 px-6 py-4.5 bg-gray-50/50 border border-gray-100 rounded-2xl group-hover:bg-white group-hover:border-indigo-200 transition-all shadow-inner group-hover:shadow-lg group-hover:shadow-indigo-500/5">
                                <p className="w-full text-[15px] font-bold text-gray-900 uppercase tracking-tight">
                                   {param.value}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* Right: AI STRATEGY & COMMERCIAL LOGIC */}
            <div className="w-[460px] flex flex-col gap-8 flex-shrink-0 animate-in slide-in-from-right-8 duration-700">
               <div className="flex-1 bg-white border border-gray-100 rounded-[48px] shadow-2xl shadow-indigo-500/5 p-12 flex flex-col overflow-y-auto custom-scrollbar">
                  
                  {/* COMMERCIAL LOGIC HEADER */}
                  <div className="flex items-center justify-between mb-12">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                           <DollarSign className="w-5 h-5" />
                        </div>
                        <h3 className="text-[14px] font-black text-gray-900 uppercase tracking-[0.2em] leading-none">COMMERCIAL LOGIC</h3>
                     </div>
                     <span className="text-[18px] font-black text-emerald-500 animate-in fade-in duration-300">{currentMargin}%</span>
                  </div>

                  <div className="space-y-12">
                     {/* PROPOSED VALUE SECTION */}
                     <div className="space-y-8">
                        <div className="flex items-center justify-between px-2">
                           <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">PROPOSED VALUE</p>
                           <p className="text-[26px] font-black text-gray-900 tracking-tight">€{currentValue.toLocaleString()}</p>
                        </div>
                        
                        {/* Interactive Slider */}
                        <div className="relative h-12 flex items-center group px-2">
                           <div className="absolute inset-x-2 inset-y-0 flex items-center pointer-events-none">
                              <div className="w-full h-2.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                 <div 
                                    className="h-full bg-indigo-600 transition-all duration-150" 
                                    style={{ width: `${percentage}%` }}
                                 />
                              </div>
                           </div>
                           <input 
                              type="range" 
                              min={min}
                              max={max}
                              step={1000}
                              value={currentValue}
                              onChange={handleSliderChange}
                              className="absolute inset-x-0 w-full h-4 bg-transparent appearance-none cursor-pointer z-10 
                                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:h-10 
                                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 
                                       [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-white 
                                       [&::-webkit-slider-thumb]:shadow-2xl [&::-webkit-slider-thumb]:shadow-indigo-400 
                                       [&::-webkit-slider-thumb]:active:scale-110 [&::-webkit-slider-thumb]:transition-transform"
                           />
                        </div>
                     </div>

                     {/* AI Confidence & Margin Analysis */}
                     <div className="grid grid-cols-1 gap-6 pt-6">
                        <div className="p-8 bg-gray-50/50 border border-gray-100 rounded-[32px] space-y-4">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Confidence Score</span>
                              </div>
                              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">96.4% ACCURACY</span>
                           </div>
                           <p className="text-[11px] text-gray-400 font-medium leading-relaxed uppercase tracking-tight">
                              Commercial baseline calculated against <span className="text-gray-900 font-bold">€750k market avg</span> with optimized margin for competitive entry.
                           </p>
                        </div>
                     </div>

                     {/* Technical Impact Analysis */}
                     <div className="space-y-6">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-3">
                           <BrainCircuit className="w-4 h-4 text-indigo-300" /> Financial influence factors
                        </h4>
                        <div className="space-y-4">
                           {[
                              { label: 'Grade S355 Premium', impact: '+4.2%' },
                              { label: 'Infrastructure High-Voltage', impact: '+1.5%' },
                              { label: 'Strategic Alignment', impact: '-2.8%' }
                           ].map((item, i) => (
                              <div key={i} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl group hover:border-indigo-100 transition-all shadow-sm">
                                 <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover:bg-indigo-600 group-hover:scale-125 transition-all" />
                                    <span className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">{item.label}</span>
                                 </div>
                                 <span className="text-[11px] font-black text-indigo-600 tracking-tighter">{item.impact}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               {/* FINAL ACTION AREA */}
               <div className="p-10 bg-white border border-indigo-100 rounded-[44px] shadow-2xl shadow-indigo-500/10">
                  <button 
                    onClick={handleFinalSubmit}
                    className="w-full py-7 bg-indigo-600 text-white rounded-[32px] font-bold uppercase tracking-[0.2em] text-[13px] hover:bg-indigo-700 shadow-xl shadow-indigo-500/30 transition-all active:scale-95 flex items-center justify-center gap-4 group"
                  >
                    <span>INITIALIZE RFP</span>
                  </button>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
