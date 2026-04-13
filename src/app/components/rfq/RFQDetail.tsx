import { Link, useParams, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, Edit, FileText, CheckCircle, 
  XCircle, Sparkles, ExternalLink, Activity,
  Target, ShieldCheck, Database, Layers,
  Zap, Building2, ClipboardList, Clock,
  MoreHorizontal, ChevronRight, Download, Share2,
  AlertCircle, Mail, MessageSquare, BrainCircuit,
  History, Ruler, Star, Info
} from 'lucide-react';
import { mockRFQs, mockKnowledgeBase, mockCustomers } from '../../data/mockData';
import StatusBadge from '../shared/StatusBadge';
import { CommunicationItem } from '../../types';

export default function RFQDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const rfq = mockRFQs.find(r => r.id === id);

  if (!rfq) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <div className="p-4 bg-gray-50 rounded-2xl mb-4">
           <AlertCircle className="w-8 h-8 text-gray-300" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">RFP Not Found</h2>
        <Link to="/rfqs" className="text-sm font-bold text-primary mt-4 hover:underline">Return to RFPs</Link>
      </div>
    );
  }

  // Find historical match from KB
  const matchedKBId = rfq.similarJobs?.[0];
  const matchedKB = mockKnowledgeBase.find(k => k.id === matchedKBId);
  const customer = mockCustomers.find(c => c.id === rfq.customerId);

  const canEdit = user?.role === 'user' || user?.role === 'admin';
  const canApprove = user?.role === 'manager' || user?.role === 'admin';
  const canConvert = rfq.status === 'approved' && (user?.role === 'user' || user?.role === 'admin');

  const getCommIcon = (type: CommunicationItem['type']) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4 text-emerald-500" />;
      case 'discussion': return <MessageSquare className="w-4 h-4 text-amber-500" />;
      case 'transcript': return <BrainCircuit className="w-4 h-4 text-primary" />;
      default: return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] -mx-8 -mt-6 px-12 pb-24">
      
      {/* 1. Industrial Header Bar */}
      <div className="sticky top-0 z-50 bg-[#F8F9FB]/80 backdrop-blur-md py-6 border-b border-gray-100 flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <Link to="/rfqs" className="w-10 h-10 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/40 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <nav className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
               <span>RFP Intelligence</span>
               <ChevronRight className="w-2.5 h-2.5" />
               <span className="text-gray-900 font-black">{rfq.id}</span>
            </nav>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
               {rfq.name}
               <StatusBadge status={rfq.status} />
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
           {rfq.status === 'draft' && canEdit && (
              <Link to={`/rfqs/${rfq.id}/extract`} className="flex items-center gap-2 px-6 py-2.5 bg-secondary text-primary border border-primary/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm group">
                 <Sparkles className="w-4 h-4" /> AI RE-EXTRACT
              </Link>
           )}
           {canConvert && (
              <button onClick={() => navigate('/quotations/new')} className="px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                 GENERATE QUOTATION
              </button>
           )}
           <button className="p-2.5 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-primary transition-all shadow-sm">
              <MoreHorizontal className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Technical & Communication Dossier */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* Main Drawing & Intelligence Card */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div>
                   <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Extracted Technical Layout</h3>
                   <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-900">{rfq.documents?.[0] || 'layout_source.pdf'}</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-bold rounded border border-emerald-100">MATCH VERIFIED</span>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-all">
                      <Download className="w-3.5 h-3.5" /> Source
                   </button>
                   <button className="flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-primary/20 transition-all">
                      <Star className="w-3.5 h-3.5" /> Save Match
                   </button>
                </div>
             </div>

             <div className="aspect-[21/9] bg-gray-50 flex items-center justify-center relative border-b border-gray-50">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                <div className="flex flex-col items-center opacity-10">
                   <Layers className="w-16 h-16 text-primary mb-2" />
                   <p className="text-[10px] font-bold uppercase tracking-[0.5em]">Extraction Preview Canvas</p>
                </div>
                
                {/* AI Prediction Overlays */}
                <div className="absolute top-8 left-8 p-4 bg-white/90 backdrop-blur border border-primary/20 rounded-2xl shadow-xl space-y-3 max-w-[240px]">
                   <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                      <BrainCircuit className="w-3.5 h-3.5" /> AI Insight
                   </p>
                   <p className="text-[11px] font-medium text-gray-700 leading-relaxed">
                      Layout geometry matches **{matchedKB?.title || 'historical baseline'}** with 94.2% structural similarity.
                   </p>
                   <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                      <span className="text-[9px] font-bold text-gray-400">REFERENCE ID:</span>
                      <span className="text-[9px] font-bold text-primary">{matchedKB?.id || 'N/A'}</span>
                   </div>
                </div>
             </div>

             <div className="p-8 grid grid-cols-3 gap-8">
                <div>
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Ruler className="w-3 h-3" /> Extracted Dimensions
                   </p>
                   {rfq.extractedData?.requirements.map((req, i) => (
                      <p key={i} className="text-[13px] font-bold text-gray-900">{req}</p>
                   )) || <p className="text-[13px] font-bold text-gray-900 opacity-30">No Dimensions Identified</p>}
                </div>
                <div className="border-l border-gray-50 pl-8">
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <History className="w-3 h-3" /> Historic Lead Time
                   </p>
                   <p className="text-[13px] font-bold text-gray-900">4.5 Weeks (Avg)</p>
                   <p className="text-[9px] text-emerald-500 font-bold uppercase mt-0.5">Optimized via Munich Match</p>
                </div>
                <div className="border-l border-gray-50 pl-8">
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3" /> Material Audit
                   </p>
                   <p className="text-[13px] font-bold text-gray-900">{matchedKB?.material || 'Standard'}</p>
                   <p className="text-[9px] text-primary font-bold uppercase mt-0.5">Inferred from Baseline</p>
                </div>
             </div>
          </div>

          {/* Communication & Extraction Dossier Feed */}
          <div className="space-y-6">
             <div className="flex items-center justify-between pl-4">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">INTELLIGENCE DOSSIER</h3>
                <span className="text-[10px] font-bold text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10 flex items-center gap-2">
                   <Sparkles className="w-3 h-3" /> Auto-Generated Feed
                </span>
             </div>

             <div className="space-y-4">
                {(rfq.communicationHistory || []).map((comm) => (
                   <div key={comm.id} className={`p-6 rounded-2xl border transition-all ${
                      comm.isAiInsight ? 'bg-secondary/30 border-primary/10 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-200'
                   }`}>
                      <div className="flex items-start justify-between mb-4">
                         <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                               comm.isAiInsight ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'
                            }`}>
                               {getCommIcon(comm.type)}
                            </div>
                            <div>
                               <p className="text-xs font-bold text-gray-900">{comm.sender}</p>
                               <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{comm.type}</span>
                                  <div className="w-0.5 h-0.5 bg-gray-300 rounded-full" />
                                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{comm.date}</span>
                               </div>
                            </div>
                         </div>
                         {comm.isAiInsight && (
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest rounded border border-primary/10">Logical Gap Filled</span>
                         )}
                      </div>
                      <p className="text-sm font-medium text-gray-600 leading-relaxed italic">
                         "{comm.content}"
                      </p>
                   </div>
                ))}

                <button className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:border-primary/40 hover:text-primary transition-all">
                  Load Additional Transcripts & Correspondence
                </button>
             </div>
          </div>
        </div>

        {/* Right Column: Commercial Summary & Matching Baseline */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
           
           {/* Client Snapshot */}
           <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">CLIENT PROFILE</h3>
                 <Building2 className="w-4 h-4 text-gray-300" />
              </div>
              <div className="space-y-4">
                 <div>
                    <p className="text-xl font-bold text-gray-900 tracking-tight">{rfq.customer}</p>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">{customer?.industry || 'Manufacturing'}</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                    <div>
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Lifetime Value</p>
                       <p className="text-sm font-black text-gray-900">€{(customer?.totalValue || 0).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">RFP Confidence</p>
                       <p className="text-sm font-black text-emerald-500">{Math.round((rfq.confidenceScore || 0) * 100)}%</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Baseline Historical Match */}
           {matchedKB && (
              <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                    <Database className="w-32 h-32" />
                 </div>
                 <div className="flex items-center justify-between relative">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">KNOWLEDGE BASE MATCH</h3>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[8px] font-black uppercase border border-emerald-100">
                       <Star className="w-2.5 h-2.5 fill-emerald-600" /> TOP REFERENCE
                    </div>
                 </div>
                 <div className="relative">
                    <Link to={`/knowledge/${matchedKB.id}`} className="group-hover:text-primary transition-colors">
                       <p className="text-base font-bold text-gray-900 leading-tight mb-2 truncate">{matchedKB.title}</p>
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{matchedKB.id}</span>
                          <div className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{matchedKB.type}</span>
                       </div>
                    </Link>
                    <div className="pt-6 mt-6 border-t border-gray-50 flex items-center justify-between">
                       <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                          Commercial Value: <span className="text-gray-900 font-black">€{(matchedKB.value / 1000).toFixed(0)}K</span>
                       </div>
                       <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                 </div>
              </div>
           )}

           {/* AI Extraction Confidence Audit */}
           <div className="bg-primary rounded-[2rem] p-8 shadow-xl shadow-primary/20 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
              <div className="relative">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em]">AI CONFIDENCE AUDIT</h3>
                    <Target className="w-5 h-5 opacity-50" />
                 </div>
                 <div className="space-y-6">
                    <div>
                       <div className="flex items-center justify-between mb-2">
                          <p className="text-[11px] font-bold uppercase tracking-widest">Mapping Accuracy</p>
                          <p className="text-xl font-black">{Math.round((rfq.confidenceScore || 0) * 100)}%</p>
                       </div>
                       <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white" style={{ width: `${rfq.confidenceScore * 100}%` }} />
                       </div>
                    </div>
                    <p className="text-[11px] font-medium text-white/70 leading-relaxed italic">
                       High confidence extraction based on structural similarity with project Munich Branch 03. Material specifications inferred from historical revision baseline.
                    </p>
                    <button className="w-full py-4 bg-white text-primary rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/90 transition-all active:scale-95">
                       Audit AI Logic
                    </button>
                 </div>
              </div>
           </div>

           {/* Documentation Assets */}
           <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm space-y-6">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">SOURCE ASSETS</h3>
              <div className="space-y-3">
                 {(rfq.documents || []).map((doc, i) => (
                    <div key={i} className="group flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:border-primary/20 hover:bg-gray-50/50 transition-all cursor-pointer">
                       <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                          <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 truncate">{doc}</span>
                       </div>
                       <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
