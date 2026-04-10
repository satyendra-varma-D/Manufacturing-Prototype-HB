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

  // Dynamic Analysis Hub Selector
  if (isAnalysisMode) {
    const hubProps = {
      onBack: () => setIsAnalysisMode(false),
      onInitializeRFP: () => navigate('/rfqs')
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
