import { useParams, Link, useNavigate } from 'react-router';
import { 
  Mail, Calendar, User, FileText, Download, 
  ExternalLink, ArrowLeft, Send, CheckCircle, 
  Clock, AlertCircle, Zap, ShieldCheck, Search,
  Box, BarChart3, ChevronRight, History, Database,
  ArrowRight, Layers, FileCode, Beaker, HelpCircle,
  MoreHorizontal, ChevronRight as ChevronIcon, Plus,
  Maximize2, ZoomIn, ZoomOut, X, Info, TrendingUp,
  Award, Activity, Target, ArrowDownRight, Scale,
  Map, HardHat, ZapOff, Table, Building2, Cpu,
  ChevronDown, DollarSign, Sparkles, BrainCircuit
} from 'lucide-react';
import { useState } from 'react';
import { mockMails } from '../../data/mockMails';
import { mockQuotations, mockKnowledgeBase, mockCustomers, mockRFQs } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import warehouseBlueprint from './warehouse_blueprint.png';
import historicBlueprint from '../../../complex_industrial_floorplan.png';

export default function MailDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const mail = mockMails.find(m => m.id === id);
  
  const [isAnalysisMode, setIsAnalysisMode] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>('KB-2025-045');
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Financial Calculator State
  const [proposedValue, setProposedValue] = useState(485000);
  const [proposedMargin, setProposedMargin] = useState(18.5);
  
  const customerMatch = mockCustomers.find(c => c.email.toLowerCase() === mail?.from.email.toLowerCase());
  const extractionMatch = mockRFQs.find(r => r.id === 'RFQ-2026-001');
  
  const matchedRecords = [
    { 
        id: 'KB-2025-045', 
        name: 'Facility 03 Extension - Munich Hub', 
        match: 94, 
        value: 420000, 
        baseCost: 342300,
        margin: '18.5%', 
        date: 'Nov 2025',
        blueprint: warehouseBlueprint,
        parameters: { 
          zone: 'ZONE-03-F', 
          area: '112,000 sq ft', 
          load: 'PN-380',
          height: '36 ft',
          floor: '50 kN/m²',
          docks: '12 Docks'
        }
    },
    { 
        id: 'KB-2024-312', 
        name: 'Logistics Project X1', 
        match: 78, 
        value: 125000, 
        baseCost: 97500,
        margin: '22%', 
        date: 'Sep 2024',
        blueprint: historicBlueprint,
        parameters: { 
          zone: 'SEC-LOG-01', 
          area: '85,000 sq ft', 
          load: 'PN-220',
          height: '28 ft',
          floor: '35 kN/m²',
          docks: '06 Docks'
        }
    }
  ];

  const currentMatchModel = matchedRecords.find(r => r.id === selectedMatchId) || matchedRecords[0];

  if (!mail) return null;
  const displayDate = new Date(mail.date).toLocaleDateString();

  // Calculated Financials - Dynamic Margin based on Value Adjustment
  const baseIntelligenceCost = 342300; // Fixed baseline from historical match
  const dynamicMargin = ((proposedValue - baseIntelligenceCost) / proposedValue) * 100;
  const profitMarginValue = proposedValue - baseIntelligenceCost;

  // Analysis Hub View
  if (isAnalysisMode) {
    return (
      <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in fade-in duration-500 overflow-hidden">
        {/* Proper Blue Header */}
        <header className="h-20 bg-white border-b border-gray-100 px-10 flex items-center justify-between shadow-sm relative z-10">
           <div className="flex items-center gap-10">
              <button 
                onClick={() => setIsAnalysisMode(false)}
                className="group flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-all border border-gray-100 shadow-sm"
              >
                 <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Back to Mail</span>
              </button>
              <div className="h-10 w-px bg-gray-100" />
              <div>
                 <h2 className="text-[13px] font-bold text-indigo-600 uppercase tracking-[0.2em]">Facility Intelligence Hub</h2>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Infrastructure Analysis • Building 04</p>
              </div>
           </div>
           
           <div className="flex items-center gap-6">
              {/* Simplified Header Actions */}
           </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex flex-col border-r border-gray-100 bg-gray-50/20 overflow-y-auto custom-scrollbar">
               <div className="p-4 space-y-6 flex flex-col items-center">
                  
                  {/* Split Comparison View */}
                  <div className="flex gap-6 w-full max-w-[1140px] items-start justify-center">
                     
                     {/* 1. Current Layout */}
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
                           <svg className="absolute inset-0 w-full h-full pointer-events-none">
                              <g transform="translate(280, 150)">
                                 <circle r="4" fill="#6366f1" />
                                 <circle r="10" fill="none" stroke="#6366f1" strokeWidth="1" className="animate-ping" />
                                 <text x="12" y="3" fill="#6366f1" fontSize="8" fontWeight="bold">PROPOSED HUB</text>
                              </g>
                           </svg>
                        </div>
                     </div>

                     <div className="h-[800px] w-px bg-gray-100 mt-10" />

                     {/* 2. Historical Baseline */}
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
                           <svg className="absolute inset-0 w-full h-full pointer-events-none">
                               <g transform="translate(260, 140)">
                                 <circle r="4" fill="#10b981" />
                                 <text x="12" y="3" fill="#10b981" fontSize="8" fontWeight="bold">HISTORIC ANCHOR</text>
                              </g>
                           </svg>
                        </div>
                     </div>
                  </div>

                  {/* Matched Intelligence Gallery (Directly Below) */}
                  <div className="w-full max-w-[1100px] space-y-4 pt-6 border-t border-gray-100">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <History className="w-3.5 h-3.5 text-indigo-600" />
                           <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.2em]">Select Baseline for Comparison</h3>
                        </div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{matchedRecords.length} Historical Matches Available</span>
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
                                 <div className="flex items-center gap-3 mt-2 opacity-60">
                                    <div className="flex items-center gap-1.5 text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                                       <Calendar className="w-2.5 h-2.5" /> {match.date}
                                    </div>
                                 </div>
                              </div>
                           </button>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Workspace Detail Footer */}
               <div className="p-4 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Infrastructure Analysis Hub • Build 24.1</p>
                  <div className="flex items-center gap-6">
                     <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                        <Activity className="w-3.5 h-3.5" /> Processor Active
                     </span>
                     <span className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                        <BrainCircuit className="w-3.5 h-3.5" /> Logic Synchronized
                     </span>
                  </div>
               </div>
            </div>

            {/* Right Column: Compact Fields & Calculator */}
            <div className="w-[540px] flex-shrink-0 bg-white border-l border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
               <div className="p-8 space-y-10">
                  
                  {/* 1. Facility Information */}
                  <div className="space-y-6">
                     <div className="flex items-center gap-3">
                        <div className="w-1 bg-indigo-600 h-4 rounded-full" />
                        <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Project Summary</h3>
                     </div>
                     
                     <div className="grid grid-cols-1 gap-5">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Project Classification</label>
                           <div className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 flex justify-between items-center shadow-inner hover:bg-white transition-all cursor-pointer">
                              <span>ASSEMBLY-OPERATIONS-2026</span>
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                           </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-5">
                           <div className="space-y-2">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Client</label>
                              <div className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 shadow-sm">
                                 TechCorp Group
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Facility Hub</label>
                              <div className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-900 shadow-sm">
                                 Zone B04-A
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* 2. Operational Specs (SIDE-BY-SIDE Comparison) */}
                  <div className="space-y-6 pt-6 border-t border-gray-50">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-1 bg-indigo-600 h-4 rounded-full" />
                           <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Comparison Grid</h3>
                        </div>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[8px] font-bold rounded uppercase tracking-widest">v {currentMatchModel.id}</span>
                     </div>
 
                     <div className="grid grid-cols-1 gap-3">
                        {/* Comparison Field Helper */}
                        {[
                          { label: 'Building Area (SQ FT)', current: '115,165', baseline: currentMatchModel.parameters.area },
                          { label: 'Power Load Capacity', current: '400V 64A', baseline: currentMatchModel.parameters.load },
                          { label: 'Clear Ceiling Height', current: '38 ft', baseline: currentMatchModel.parameters.height },
                          { label: 'Floor Load Capacity', current: '55 kN/m²', baseline: currentMatchModel.parameters.floor },
                          { label: 'Loading Dock Doors', current: '14 Docks', baseline: currentMatchModel.parameters.docks },
                        ].map((field, i) => (
                           <div key={i} className="p-3.5 rounded-2xl bg-gray-50/50 border border-gray-100 space-y-2.5">
                              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{field.label}</p>
                              <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                                 <div className="bg-white p-2.5">
                                    <p className="text-[7px] font-bold text-indigo-400 uppercase tracking-widest mb-0.5">Proposed</p>
                                    <p className="text-[12px] font-bold text-gray-900">{field.current}</p>
                                 </div>
                                 <div className="bg-gray-50/50 p-2.5">
                                    <p className="text-[7px] font-bold text-emerald-400 uppercase tracking-widest mb-0.5">Match</p>
                                    <p className="text-[12px] font-bold text-gray-400">{field.baseline}</p>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* 3. Compact Financial Mini Calc */}
                  <div className="pt-8 border-t border-gray-100">
                     <div className="bg-white border border-indigo-100 rounded-[32px] p-8 shadow-[0_20px_50px_-12px_rgba(99,102,241,0.1)] space-y-8">
                        <div className="flex items-center justify-between">
                           <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-indigo-600" /> Commercial Logic
                           </h3>
                           <div className="flex flex-col items-end">
                              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Profit</p>
                              <p className="text-sm font-bold text-emerald-600 leading-none">{Math.max(0, dynamicMargin).toFixed(1)}%</p>
                           </div>
                        </div>
                        
                        <div className="space-y-6">
                           <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                 <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Proposed Value Adjustment</p>
                                 <span className="text-sm font-bold text-gray-900">€{proposedValue.toLocaleString()}</span>
                              </div>
                              <input 
                                 type="range" min="342300" max="1000000" step="100" value={proposedValue} 
                                 onChange={(e) => setProposedValue(Number(e.target.value))}
                                 className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 transition-all hover:bg-gray-200"
                              />
                           </div>

                           <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
                              <div className="space-y-1">
                                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Base Cost</p>
                                 <p className="text-sm font-bold text-gray-900">€{Math.round(baseIntelligenceCost).toLocaleString()}</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Est. Margin</p>
                                 <p className="text-sm font-bold text-emerald-600">€{Math.round(profitMarginValue).toLocaleString()}</p>
                              </div>
                           </div>
                        </div>

                        <button 
                           onClick={() => navigate('/rfqs')}
                           className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
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

  // Standard Reader View
  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-24">
      <div className="py-8">
        <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
           <Link to="/" className="hover:text-indigo-600 transition-colors">PORTAL</Link>
           <ChevronIcon className="w-3.5 h-3.5" />
           <Link to="/mails" className="hover:text-indigo-600 transition-colors">INTELLIGENCE HUB</Link>
           <ChevronIcon className="w-3.5 h-3.5" />
           <span className="text-indigo-600">ID: {mail.id}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10 animate-in slide-in-from-left duration-700">
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col min-h-[500px]">
            <div className="px-12 py-8 border-b border-gray-50 flex items-start justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                   <div className="w-1.5 h-4 bg-indigo-600 rounded-full" /> RESOURCE COMMUNICATION
                </p>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight leading-[1.15] mb-8">{mail.subject}</h1>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <User className="w-4.5 h-4.5 text-indigo-300" /> {mail.from.name}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-400 font-mono">
                    <Clock className="w-4.5 h-4.5 text-gray-200" /> {displayDate}
                  </div>
                </div>
              </div>
              <button className="p-3 hover:bg-gray-50 rounded-xl text-gray-300 transition-all border border-transparent hover:border-gray-100">
                 <MoreHorizontal className="w-6 h-6" />
              </button>
            </div>

            <div className="px-12 py-10 flex-1">
              <div className="prose prose-slate max-w-none">
                <p className="text-[17px] leading-[1.8] text-gray-600 font-medium whitespace-pre-wrap tracking-wide">
                  {mail.body}
                </p>
              </div>

              {/* Proper Infrastructure Layouts Grid */}
              <div className="mt-12 pt-10 border-t border-gray-100">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8 flex items-center gap-2 pt-2">
                   <Layers className="w-4 h-4 text-indigo-400 opacity-60" /> INFRASTRUCTURE LAYOUTS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {(mail.attachments || []).map((file, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setIsAnalysisMode(true)}
                      className="group flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer active:scale-[0.98]"
                    >
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                           <FileCode className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-2 mb-1.5 ">
                              <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest leading-none">Ready for Analysis</p>
                              <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
                           </div>
                           <p className="text-sm font-bold text-gray-900 truncate uppercase tracking-tight leading-none group-hover:text-indigo-600 transition-colors">{file}</p>
                        </div>
                        <Maximize2 className="w-4.5 h-4.5 text-gray-300 group-hover:text-indigo-600 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10 animate-in slide-in-from-right duration-700">
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-10 relative overflow-hidden group">
             {customerMatch && (
                <div className="absolute top-0 right-0 p-6">
                   <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5" /> EXISTING CUSTOMER
                   </div>
                </div>
             )}
             
             <div className="flex items-center gap-3 mb-10">
                <div className="w-1 bg-indigo-600 h-5 rounded-full" />
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] leading-none">CUSTOMER MANAGEMENT</h3>
             </div>
             
             <div className="space-y-6 relative z-10">
                <div className="space-y-2.5">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Lead Correspondent</label>
                   <p className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-xl text-[14px] font-bold text-gray-900 shadow-sm flex items-center gap-4">
                      <User className="w-4 h-4 text-indigo-400 opacity-20" /> {mail.from.name}
                   </p>
                </div>
                
                <div className="space-y-2.5">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Account / Entity</label>
                   <div className="relative group">
                      <p className={`w-full px-5 py-3.5 bg-white border ${customerMatch ? 'border-emerald-100' : 'border-gray-100'} rounded-xl text-[14px] font-bold text-gray-900 shadow-sm flex items-center justify-between`}>
                         <span className="truncate">{customerMatch ? customerMatch.company : 'Unknown Entity'}</span>
                         {customerMatch && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      </p>
                   </div>
                </div>

                <div className="space-y-2.5">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                   <p className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-xl text-[14px] font-bold text-gray-900 shadow-sm truncate">
                      {mail.from.email}
                   </p>
                </div>

                <div className="space-y-2.5">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Contact Number</label>
                   <p className="w-full px-5 py-3.5 bg-white border border-gray-100 rounded-xl text-[14px] font-bold text-gray-900 shadow-sm">
                      {customerMatch?.phone || '+49 152 9081 2231'}
                   </p>
                </div>

                {!customerMatch && (
                   <div className="pt-6 border-t border-gray-50 mt-4 space-y-3">
                      <button className="w-full flex items-center justify-center gap-4 py-4.5 bg-indigo-600 text-white rounded-[24px] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95 group">
                         <Sparkles className="w-4 h-4 text-indigo-200 group-hover:animate-pulse" /> AI Data Extraction
                      </button>
                      <button className="w-full flex items-center justify-center gap-4 py-4.5 bg-white border border-gray-200 text-gray-400 rounded-[24px] font-bold uppercase tracking-[0.2em] text-[10px] hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-95">
                         <Plus className="w-4 h-4" /> Manual Setup
                      </button>
                   </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
