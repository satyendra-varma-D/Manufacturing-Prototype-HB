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
  ChevronDown, DollarSign, Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { mockMails } from '../../data/mockMails';
import { mockQuotations, mockKnowledgeBase, mockCustomers, mockRFQs } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

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
        parameters: { zone: 'ZONE-03-F', area: '1,100 sqm', load: 'PN-380' }
    },
    { 
        id: 'KB-2024-312', 
        name: 'Logistics Project X1', 
        match: 78, 
        value: 125000, 
        baseCost: 97500,
        margin: '22%', 
        date: 'Sep 2024',
        parameters: { zone: 'SEC-LOG-01', area: '850 sqm', load: 'PN-220' }
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
           {/* Left Column */}
           <div className="flex-[0.55] flex flex-col border-r border-gray-100 bg-gray-50/20 relative">
              <div className="flex-1 relative overflow-hidden flex items-center justify-center p-12">
                 <div className="absolute top-10 left-10 z-20 flex flex-col gap-3">
                    <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.3, 4))} className="p-4 bg-white text-gray-400 hover:text-indigo-600 rounded-2xl shadow-xl border border-gray-100">
                       <ZoomIn className="w-6 h-6" />
                    </button>
                    <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.3, 0.5))} className="p-4 bg-white text-gray-400 hover:text-indigo-600 rounded-2xl shadow-xl border border-gray-100">
                       <ZoomOut className="w-6 h-6" />
                    </button>
                 </div>
                 
                 <div className="relative transition-transform duration-700 ease-in-out" style={{ transform: `scale(${zoomLevel})` }}>
                    <div className="w-[850px] aspect-[16/10] bg-white rounded-[40px] shadow-[0_48px_120px_-32px_rgba(0,0,0,0.12)] border border-gray-100 relative overflow-hidden">
                       <img 
                          src="technical_floor_plan_blueprint_proper_1775646406909.png" 
                          alt="Drawing" 
                          className="w-full h-full object-contain opacity-90"
                       />
                       <div className="absolute inset-0 bg-indigo-50/5 pointer-events-none" />
                       <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          <rect x="50" y="50" width="300" height="200" fill="#6366f111" stroke="#6366f1" strokeWidth="2" strokeDasharray="8,4" />
                          <text x="60" y="45" fill="#6366f1" fontSize="12" fontWeight="bold">ZONE-04A: PRODUCTION</text>
                          <rect x="400" y="100" width="150" height="300" fill="#10b98108" stroke="#10b981" strokeWidth="2" strokeDasharray="8,4" />
                          <text x="410" y="90" fill="#10b981" fontSize="12" fontWeight="bold">MA-SYS: OVERHEAD RAIL</text>
                       </svg>
                    </div>
                 </div>

                 <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-gray-100 shadow-2xl flex items-center gap-6">
                    <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Drawing ID</p>
                       <p className="text-sm font-bold text-gray-900 leading-none">DWG-B04-SEC-09</p>
                    </div>
                    <div className="w-px h-10 bg-gray-100" />
                    <span className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100">
                       <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
                    </span>
                 </div>
              </div>

              {/* Workspace Spacer */}
              <div className="flex-1 bg-white border-t border-gray-100 flex items-center justify-center">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] opacity-30">Technical Analysis Active</p>
              </div>
           </div>

           {/* Right Column: Prefilled Fields & Financial Calculator */}
           <div className="flex-[0.45] bg-white border-l border-gray-100 flex flex-col overflow-y-auto custom-scrollbar">
              <div className="p-12 space-y-12">
                 
                 {/* 1. Facility Information */}
                 <div className="space-y-8">
                    <div className="flex items-center gap-4">
                       <div className="w-1 bg-indigo-600 h-6 rounded-full" />
                       <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Project Summary</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-8">
                       <div className="space-y-3">
                          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-2">Project Classification</label>
                          <div className="w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-[24px] text-[15px] font-bold text-gray-900 flex justify-between items-center shadow-inner">
                             <span>B04-INFRA-2026</span>
                             <ChevronDown className="w-5 h-5 text-gray-300" />
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-3">
                             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-2">Client Identity</label>
                             <div className="w-full px-6 py-5 bg-white border border-gray-100 rounded-[24px] text-[15px] font-bold text-gray-900 shadow-sm">
                                TechCorp Group
                             </div>
                          </div>
                          <div className="space-y-3">
                             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-2">Facility Zone</label>
                             <div className="w-full px-6 py-5 bg-white border border-gray-100 rounded-[24px] text-[15px] font-bold text-gray-900 shadow-sm">
                                Zone B04-A
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* 2. Operational Specs (Comparison Enabled) */}
                 <div className="space-y-8 pt-8 border-t border-gray-50">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-1 bg-indigo-600 h-6 rounded-full" />
                          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Technical Parameters</h3>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 relative">
                       {/* Current Values */}
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded w-max">Active extraction</p>
                             <div className="space-y-6">
                                <div className="space-y-2">
                                   <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest ml-1">Area (SQM)</p>
                                   <div className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl text-[14px] font-bold text-gray-900 shadow-sm">1,250</div>
                                </div>
                                <div className="space-y-2">
                                   <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest ml-1">Power Load</p>
                                   <div className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl text-[14px] font-bold text-gray-900 shadow-sm">400V 64A</div>
                                </div>
                             </div>
                          </div>
                       </div>
                       
                       {/* Benchmark Values */}
                       <div className="space-y-6 bg-indigo-50/10 -mx-4 px-4 py-2 rounded-3xl border-l-4 border-indigo-200">
                          <div className="space-y-2">
                             <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-white border border-gray-100 px-2 py-0.5 rounded w-max flex items-center gap-1.5">
                                <History className="w-2.5 h-2.5" /> Benchmarked (2025)
                             </p>
                             <div className="space-y-6">
                                <div className="space-y-2">
                                   <p className="text-[9px] font-bold text-gray-400/40 uppercase tracking-widest ml-1">Past Area</p>
                                   <div className="w-full px-6 py-4 bg-white/50 border border-indigo-50 rounded-2xl text-[14px] font-bold text-gray-400">{currentMatchModel.parameters.area}</div>
                                </div>
                                <div className="space-y-2">
                                   <p className="text-[9px] font-bold text-gray-400/40 uppercase tracking-widest ml-1">Past Load</p>
                                   <div className="w-full px-6 py-4 bg-white/50 border border-indigo-50 rounded-2xl text-[14px] font-bold text-gray-400">{currentMatchModel.parameters.load}</div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* 3. Compact Financial Precision Calculator (EMI Style) */}
                 <div className="pt-12 border-t border-gray-100">
                    <div className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-[0_32px_80px_-24px_rgba(99,102,241,0.15)] space-y-10 relative overflow-hidden">
                       <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-indigo-600" /> Precision Calculator
                       </h3>
                       
                       <div className="flex gap-10 items-start">
                          {/* Financial Slider */}
                          <div className="flex-1 space-y-10">
                             <div className="space-y-5 pt-4">
                                <div className="flex justify-between items-center pr-2">
                                   <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest text-indigo-600">Target Value Adjustment (€)</p>
                                   <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-base font-bold border border-emerald-100 shadow-sm">€{proposedValue.toLocaleString()}</span>
                                </div>
                                <input 
                                   type="range" min="342300" max="1000000" step="100" value={proposedValue} 
                                   onChange={(e) => setProposedValue(Number(e.target.value))}
                                   className="w-full h-2.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 transition-all"
                                />
                             </div>
                          </div>

                          {/* Visual Allocation Chart (Doughnut) */}
                          <div className="w-44 flex flex-col items-center justify-center relative">
                             <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F3F4F6" strokeWidth="12" />
                                <circle 
                                   cx="50" cy="50" r="40" fill="transparent" stroke="#6366f1" strokeWidth="12" 
                                   strokeDasharray={`${Math.max(0, dynamicMargin) * 2.51} 251`}
                                />
                             </svg>
                             <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <p className="text-[10px] font-bold text-gray-300 uppercase leading-none mb-1">Profit</p>
                                <p className="text-base font-bold text-gray-900 leading-none">{Math.max(0, dynamicMargin).toFixed(1)}%</p>
                             </div>
                          </div>
                       </div>

                       {/* Commercial Output Breakdown */}
                       <div className="grid grid-cols-2 gap-8 border-t border-gray-50 pt-8">
                          <div className="space-y-1">
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Net Base Cost</p>
                             <p className="text-xl font-bold text-gray-900 tracking-tight">€{Math.round(baseIntelligenceCost).toLocaleString()}</p>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expected Margin</p>
                             <p className="text-xl font-bold text-emerald-600 tracking-tight">€{Math.round(profitMarginValue).toLocaleString()}</p>
                          </div>
                       </div>

                       <button 
                          onClick={() => navigate('/rfqs')}
                          className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition-all active:scale-95"
                       >
                          Create RFP
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
