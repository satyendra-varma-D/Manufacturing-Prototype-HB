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
  ChevronDown, DollarSign, Sparkles, BrainCircuit, UserPlus
} from 'lucide-react';
import { useState } from 'react';
import { mockMails } from '../../data/mockMails';
import { mockQuotations, mockKnowledgeBase, mockCustomers, mockRFQs } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import warehouseBlueprint from './simple_rectangle_plat.svg';
import historicBlueprint from './simple_rectangle_plat_v2.svg';

// Specialized Hubs
import BlueprintHub from './BlueprintHub';
import DataHub from './DataHub';
import VisionHub from './VisionHub';
import ParamHub from './ParamHub';
import MixedHub from './MixedHub';

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
          plateWidth: '6 in', 
          plateHeight: '4 in', 
          cornerRadius: '0.25 in',
          boltHoleWidth: '5 in',
          boltHoleHeight: '3 in',
          boltHoleDiameter: '0.25 in'
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
          plateWidth: '8 in', 
          plateHeight: '5 in', 
          cornerRadius: '0.50 in',
          boltHoleWidth: '6 in',
          boltHoleHeight: '4 in',
          boltHoleDiameter: '0.50 in'
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

  // Dynamic Analysis Hub Selector
  if (isAnalysisMode) {
    const hubProps = {
      onBack: () => setIsAnalysisMode(false),
      onInitializeRFP: () => navigate('/rfqs/RFQ-2026-004/edit')
    };

    switch (user?.intelligenceMode) {
      case 'bom':
        return <DataHub {...hubProps} />;
      case 'visual':
        return <VisionHub {...hubProps} />;
      case 'text':
        return <ParamHub {...hubProps} mailContent={{ subject: mail.subject, body: mail.body, attachments: mail.attachments }} />;
      case 'mixed':
        return <MixedHub {...hubProps} />;
      case 'drawing':
      default:
        return (
          <BlueprintHub 
            {...hubProps}
            zoomLevel={zoomLevel}
            selectedMatchId={selectedMatchId}
            setSelectedMatchId={setSelectedMatchId}
            proposedValue={proposedValue}
            setProposedValue={setProposedValue}
            matchedRecords={matchedRecords}
            currentMatchModel={currentMatchModel}
            dynamicMargin={dynamicMargin}
            profitMarginValue={profitMarginValue}
            baseIntelligenceCost={baseIntelligenceCost}
          />
        );
    }
  }

  // Standard Reader View
  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-12">
      <div className="py-4">
        <nav className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
           <Link to="/" className="hover:text-primary transition-colors">PORTAL</Link>
           <ChevronIcon className="w-3.5 h-3.5" />
           <Link to="/mails" className="hover:text-primary transition-colors">INTELLIGENCE HUB</Link>
           <ChevronIcon className="w-3.5 h-3.5" />
           <span className="text-primary">ID: {mail.id}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6 animate-in slide-in-from-left duration-700">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col min-h-[400px]">
            <div className="px-8 py-6 border-b border-gray-50 flex items-start justify-between">
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                   <div className="w-1 h-3.5 bg-primary rounded-full"></div> RESOURCE COMMUNICATION
                </p>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-[1.15] mb-4">{mail.subject}</h1>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-gray-600">
                    <User className="w-4 h-4 text-primary/40" /> {mail.from.name}
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-gray-400 font-mono">
                    <Clock className="w-4 h-4 text-gray-200" /> {displayDate}
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-300 transition-all border border-transparent hover:border-gray-100">
                 <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="px-8 py-8 flex-1">
              <div className="prose prose-slate max-w-none">
                <p className="text-[15px] leading-[1.7] text-gray-600 font-medium whitespace-pre-wrap tracking-wide">
                  {mail.body}
                </p>
              </div>

                {/* Extraction Sources Section (Conditional) */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  {user?.intelligenceMode !== 'text' ? (
                    mail.attachments && mail.attachments.length > 0 ? (
                      <>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-2 pt-1">
                           <Layers className="w-4 h-4 text-primary/60 opacity-60" /> INFRASTRUCTURE LAYOUTS
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {mail.attachments.map((file, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => setIsAnalysisMode(true)}
                              className="group flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer active:scale-[0.98]"
                            >
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                                   <FileCode className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                   <div className="flex items-center gap-2 mb-1.5 ">
                                      <p className="text-[9px] font-bold text-primary uppercase tracking-widest leading-none">Ready for Analysis</p>
                                      <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                                   </div>
                                   <p className="text-sm font-bold text-gray-900 truncate uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{file}</p>
                                </div>
                                <Maximize2 className="w-4.5 h-4.5 text-gray-300 group-hover:text-primary transition-all" />
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4 flex items-center gap-2 pt-1">
                           <Layers className="w-3.5 h-3.5 text-primary/60 opacity-60" /> PROJECT DELIVERABLES
                        </h3>
                        <div 
                          onClick={() => setIsAnalysisMode(true)}
                          className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all cursor-pointer relative overflow-hidden mb-6 w-1/2"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                               <FileCode className="w-24 h-24 text-primary" />
                            </div>
                            <div className="relative z-10 flex items-center gap-6">
                               <div className="w-14 h-14 bg-red-50 rounded-xl border border-red-100 shadow-sm flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 flex-shrink-0">
                                  <FileText className="w-6 h-6" />
                                </div>
                               <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                     <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[8px] font-bold uppercase tracking-widest rounded-full border border-red-100">Engineering Drawing</span>
                                     <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                                  </div>
                                  <h4 className="text-base font-bold text-gray-900 mb-0.5 group-hover:text-primary transition-colors truncate">b04_facility_layout_v1.pdf</h4>
                                  <p className="text-[11px] text-gray-400 font-medium max-w-md italic leading-tight">Technical blueprint detected. Ready for automated validation.</p>
                               </div>
                               <div className="flex flex-col items-center gap-1 px-5 py-2.5 bg-gray-50 rounded-xl border border-gray-100 group-hover:bg-white group-hover:border-primary/20 shadow-sm transition-all flex-shrink-0">
                                  <span className="text-[9px] font-bold text-gray-900 group-hover:text-primary uppercase tracking-widest leading-none">RUN ANALYSIS</span>
                                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary/60 group-hover:translate-x-0.5 transition-all mt-0.5" />
                                </div>
                            </div>
                        </div>
                      </>
                    )
                  ) : (
                    <div className="flex items-center justify-between p-6 bg-secondary text-primary rounded-3xl border border-primary/20 border-dashed">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                             <BrainCircuit className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mb-1">Configuration Ready</p>
                             <p className="text-xs font-bold text-gray-900">Semantic data points extracted from email body</p>
                          </div>
                       </div>
                       <button 
                         onClick={() => setIsAnalysisMode(true)}
                         className="px-8 py-3 bg-primary text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
                       >
                          <Sparkles className="w-3.5 h-3.5" /> Configure Extraction
                       </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>


        <div className="lg:col-span-4 space-y-6 animate-in slide-in-from-right duration-700">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 relative overflow-hidden group">
             {customerMatch && (
                <div className="absolute top-0 right-0 p-5">
                   <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-bold rounded-full border border-emerald-100 shadow-sm">
                      <ShieldCheck className="w-3 h-3" /> EXISTING CUSTOMER
                   </div>
                </div>
             )}
             
             <div className="flex items-center gap-2.5 mb-8">
                <div className="w-1 bg-primary h-4 rounded-full"></div>
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] leading-none">CUSTOMER MANAGEMENT</h3>
             </div>
             
             <div className="space-y-4 relative z-10">
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Lead Correspondent</label>
                   <p className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-[13px] font-bold text-gray-900 shadow-sm flex items-center gap-3">
                      <User className="w-3.5 h-3.5 text-primary/20 opacity-20" /> {mail.from.name}
                   </p>
                </div>
                
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Account / Entity</label>
                   <div className="relative group">
                      <p className={`w-full px-4 py-3 bg-white border ${customerMatch ? 'border-emerald-100' : 'border-gray-100'} rounded-xl text-[13px] font-bold text-gray-900 shadow-sm flex items-center justify-between`}>
                         <span className="truncate">{customerMatch ? customerMatch.company : 'Unknown Entity'}</span>
                         {customerMatch && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      </p>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                   <p className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-[13px] font-bold text-gray-900 shadow-sm truncate">
                      {mail.from.email}
                   </p>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Contact Number</label>
                   <p className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-[13px] font-bold text-gray-900 shadow-sm">
                      {customerMatch?.phone || '+49 152 9081 2231'}
                   </p>
                </div>

                 {!customerMatch && user?.intelligenceMode !== 'text' && (
                   <div className="pt-4 border-t border-gray-50 mt-2 space-y-2.5">
                      <button 
                        onClick={() => setIsAnalysisMode(true)}
                        className="w-full flex items-center justify-center gap-3 py-3.5 bg-primary text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95 group"
                      >
                         <UserPlus className="w-3.5 h-3.5 text-secondary" /> Add Customer
                      </button>
                      <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-200 text-gray-400 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:border-primary hover:text-primary transition-all active:scale-95">
                         <Plus className="w-3.5 h-3.5" /> Manual Setup
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
