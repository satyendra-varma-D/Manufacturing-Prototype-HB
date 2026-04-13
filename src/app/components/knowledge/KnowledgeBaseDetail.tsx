import { Link, useParams } from 'react-router';
import { 
  ArrowLeft, Tag, DollarSign, Calendar, Building,
  FileCode, Box, Settings, ShieldCheck, Mail,
  MessageSquare, FileText, Download, ExternalLink,
  ChevronRight, Bookmark, MoreHorizontal, History,
  Maximize2, Printer, Share2, Ruler, Activity
} from 'lucide-react';
import { mockKnowledgeBase } from '../../data/mockData';
import { AssociatedFile, AssociatedFileType } from '../../types';

export default function KnowledgeBaseDetail() {
  const { id } = useParams();
  const item = mockKnowledgeBase.find(k => k.id === id);

  if (!item) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm mt-12 mx-auto max-w-2xl">
        <Activity className="w-12 h-12 text-gray-200 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Artifact Not Found</h2>
        <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mt-1">The requested intelligence record does not exist</p>
        <Link to="/knowledge" className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
           Return to Repository
        </Link>
      </div>
    );
  }

  const getFileIcon = (type: AssociatedFileType) => {
    switch (type) {
      case 'layout': return <FileCode className="w-5 h-5 text-primary" />;
      case 'email_thread': return <Mail className="w-5 h-5 text-emerald-500" />;
      case 'meeting_notes': return <FileText className="w-5 h-5 text-indigo-500" />;
      case 'discussion': return <MessageSquare className="w-5 h-5 text-amber-500" />;
      default: return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const groupedFiles = (item.associatedFiles || []).reduce((acc, file) => {
     if (!acc[file.type]) acc[file.type] = [];
     acc[file.type].push(file);
     return acc;
  }, {} as Record<AssociatedFileType, AssociatedFile[]>);

  return (
    <div className="min-h-screen bg-[#F8F9FB] -mx-8 -mt-6 px-12 pb-24">
      {/* Header Bar */}
      <div className="sticky top-0 z-50 bg-[#F8F9FB]/80 backdrop-blur-md py-6 border-b border-gray-100 flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <Link to="/knowledge" className="w-10 h-10 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/40 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
               <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.type} Dossier</span>
               <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.id}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{item.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="p-2.5 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-primary transition-all shadow-sm">
              <Share2 className="w-4.5 h-4.5" />
           </button>
           <button className="p-2.5 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-primary transition-all shadow-sm">
              <Printer className="w-4.5 h-4.5" />
           </button>
           <div className="w-px h-6 bg-gray-200 mx-2"></div>
           <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
              Initialize RFQ
           </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left Column: Intelligence Dossier */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* Drawing Canvas Placeholder */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative group">
             <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                <div className="px-3 py-1 bg-white/90 backdrop-blur rounded-lg border border-gray-100 shadow-sm flex items-center gap-2">
                   <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                   <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Technically Verified</span>
                </div>
                <div className="px-3 py-1 bg-white/90 backdrop-blur rounded-lg border border-gray-100 shadow-sm">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.revision || 'No Revision'}</span>
                </div>
             </div>
             
             <div className="aspect-[16/9] bg-gray-50 flex items-center justify-center border-b border-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                {item.type === 'Drawing' ? (
                   <FileCode className="w-32 h-32 text-primary opacity-10 group-hover:scale-110 transition-transform duration-700" />
                ) : (
                   <Box className="w-32 h-32 text-emerald-500 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                )}
                <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                   <button className="p-3 bg-white rounded-xl shadow-lg border border-gray-100 text-gray-400 hover:text-primary transition-all">
                      <Maximize2 className="w-5 h-5" />
                   </button>
                </div>
             </div>

             <div className="p-10">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                   <FileText className="w-3.5 h-3.5 text-primary" /> Executive Summary
                </h3>
                <p className="text-[15px] font-medium text-gray-600 leading-relaxed max-w-3xl">
                   {item.description}
                </p>
             </div>
          </div>

          {/* Associated Dossier Sections */}
          <div className="space-y-6">
             <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] pl-4">DATA ASSOCIATIONS</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(groupedFiles).map(([type, files]) => (
                   <div key={type} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-5">
                         <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                               {getFileIcon(type as AssociatedFileType)}
                            </div>
                            <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">
                               {type.replace('_', ' ')}s
                            </h4>
                         </div>
                         <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded uppercase tracking-tighter">{files.length}</span>
                      </div>
                      <div className="space-y-3">
                         {files.map(file => (
                            <div key={file.id} className="group p-3 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50/50 transition-all flex items-center justify-between cursor-pointer">
                               <div className="flex items-center gap-3 overflow-hidden">
                                  <FileText className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
                                  <span className="text-xs font-semibold text-gray-600 truncate group-hover:text-gray-900 transition-colors">{file.name}</span>
                               </div>
                               <Download className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                         ))}
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Specification Sheet */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
           <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-8">
              <div>
                 <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" /> Engineering Specs
                 </h3>
                 <div className="space-y-5">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Material Grade</span>
                       <span className="text-xs font-bold text-gray-900">{item.material || 'Standard Metal'}</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Process Type</span>
                       <span className="text-xs font-bold text-gray-900">{item.process || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Revision Status</span>
                       <span className="text-xs font-bold text-primary">{item.revision || 'Gen 1'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verified By</span>
                       <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[8px] font-bold text-emerald-600">DR</div>
                          <span className="text-xs font-bold text-gray-900">{item.approver || 'System'}</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div>
                 <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-emerald-500" /> Dimensions
                 </h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center">
                       <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Width</span>
                       <span className="text-base font-bold text-gray-900">{item.dimensions?.width || 'N/A'}</span>
                    </div>
                    <div className="px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center">
                       <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Height</span>
                       <span className="text-base font-bold text-gray-900">{item.dimensions?.height || 'N/A'}</span>
                    </div>
                 </div>
              </div>

              <div>
                 <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-500" /> Commercial Profile
                 </h3>
                 <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest">Last Quote Value</span>
                       <span className="text-sm font-black text-amber-900">€{item.value.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] font-bold text-amber-700/60 uppercase tracking-widest">Historical Average for this Part Type</p>
                 </div>
              </div>

              <div>
                 <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-indigo-500" /> Semantic Tags
                 </h3>
                 <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 bg-white border border-gray-200 text-gray-500 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:border-primary/40 hover:text-primary transition-all cursor-pointer">
                          #{tag}
                       </span>
                    ))}
                 </div>
              </div>
           </div>

           {/* Quick History Card */}
           <div className="bg-primary rounded-[2rem] p-8 shadow-xl shadow-primary/20 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                 <History className="w-24 h-24" />
              </div>
              <h3 className="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em] mb-4">LATEST UPDATE</h3>
              <p className="text-lg font-bold leading-tight mb-6">Completed on {new Date(item.completedDate).toLocaleDateString()}</p>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all">
                 View Historical Log
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
