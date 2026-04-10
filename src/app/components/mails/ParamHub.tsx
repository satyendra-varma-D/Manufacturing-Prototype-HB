import { ArrowLeft, FileText, Sparkles, Database, CheckCircle, Search, Activity, BrainCircuit, Type, FileCode } from 'lucide-react';

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
  const hasPDF = mailContent.attachments?.some(a => a.toLowerCase().endsWith('.pdf'));
  
  const extractedParams = [
    { label: 'Project Name', value: 'Berlin North Hub Expansion', conf: 0.99 },
    { label: 'Client / Customer', value: 'TechCorp Industries', conf: 0.94 },
    { label: 'Estimated Project Value', value: '€750,000', conf: 0.96 },
    { label: 'Submission Deadline', value: '2026-06-30', conf: 0.92 },
    { label: 'Material Grade', value: 'S355 Structural Steel', conf: 0.88 },
    { label: 'Compliance Standard', value: 'EN 1090-2', conf: 0.91 },
    { label: 'Power Load Capacity', value: '400V 64A', conf: 0.95 },
    { label: 'Target Completion', value: 'August 2026', conf: 0.89 },
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in fade-in duration-500 overflow-hidden">
      <header className="h-20 bg-white border-b border-gray-100 px-10 flex items-center justify-between shadow-sm relative z-20">
        <div className="flex items-center gap-10">
          <button onClick={onBack} className="p-2 hover:bg-gray-50 rounded-xl transition-all border border-gray-100 shadow-sm active:scale-95">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div className="h-10 w-px bg-gray-100" />
          <div>
            <h2 className="text-[13px] font-bold text-indigo-600 uppercase tracking-[0.2em]">{hasPDF ? 'Technical PDF Analysis' : 'Semantic Email Analysis'}</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              Parametric Intelligence • {hasPDF ? mailContent.attachments?.[0] : 'Direct Extraction'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">AI Extraction Active (94.8% Conf)</span>
           </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: FULL HEIGHT PDF/TEXT PREVIEW */}
        <div className="flex-1 flex flex-col bg-gray-50/10 border-r border-gray-100 overflow-y-auto custom-scrollbar relative">
           <div className="w-full h-full p-8 md:p-12">
              <div className="bg-white rounded-[40px] border border-gray-100 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.06)] overflow-hidden min-h-full flex flex-col">
                 <div className="px-12 py-8 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-4">
                       <FileText className="w-6 h-6 text-indigo-300" />
                       <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Source Material</p>
                          <p className="text-xs font-bold text-gray-900 truncate max-w-[400px]">
                            {hasPDF ? mailContent.attachments?.[0] : mailContent.subject}
                          </p>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"><Search className="w-4 h-4" /></button>
                       <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"><FileCode className="w-4 h-4" /></button>
                    </div>
                 </div>

                 <div className="flex-1 p-16">
                   {hasPDF ? (
                      <div className="h-full w-full bg-[#fcfcfc] rounded-3xl border border-gray-100 shadow-inner p-16 space-y-12">
                         {/* High-Fidelity Text-Based PDF Template */}
                         <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl mx-auto">
                            <div className="flex justify-between items-start border-b border-gray-200 pb-12">
                               <div className="space-y-4">
                                  <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">{hasPDF ? 'TECHNICAL SPECIFICATION' : 'PROJECT PROPOSAL'}</h1>
                                  <div className="space-y-1">
                                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Document Ref: {mailContent.attachments?.[0]?.split('.')[0].toUpperCase()}</p>
                                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date Issued: April 10, 2026</p>
                                  </div>
                               </div>
                               <div className="px-6 py-4 bg-gray-900 text-white rounded-2xl flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full border-2 border-indigo-500" />
                                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]">HB MFR GROUP</p>
                               </div>
                            </div>
                            
                            <div className="space-y-10">
                               <section className="space-y-4">
                                  <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-[0.3em]">01. Project Scope & Purpose</h2>
                                  <p className="text-lg leading-relaxed text-gray-600 font-serif translate-y-2 opacity-80">
                                     This document outlines the technical requirements for the Phase 2 expansion of the Berlin North manufacturing hub. 
                                     The objective is to establish a comprehensive production facility integrated with robotic assembly lines and automated material handling systems.
                                  </p>
                               </section>

                               <section className="p-10 bg-gray-50 border border-gray-100 rounded-[32px] space-y-6">
                                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-[0.3em] flex items-center gap-3">
                                     <Type className="w-4 h-4 text-indigo-600" /> Structural Requirements
                                  </h2>
                                  <div className="grid grid-cols-2 gap-8">
                                     <div className="space-y-2">
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Required Material</p>
                                        <p className="text-sm font-bold text-gray-900 underline decoration-indigo-200 decoration-2">S355 Structural Steel (EN 1090)</p>
                                     </div>
                                     <div className="space-y-2">
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Power Infrastructure</p>
                                        <p className="text-sm font-bold text-gray-900 underline decoration-indigo-200 decoration-2">400V 64A Industrial Standard</p>
                                     </div>
                                  </div>
                               </section>

                               <section className="space-y-6">
                                  <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-[0.3em]">02. Financial Considerations</h2>
                                  <p className="text-lg leading-relaxed text-gray-600 font-serif">
                                     An initial investment of <mark className="bg-yellow-100 font-bold px-1">€750,000</mark> has been allocated for the infrastructure phase. 
                                     The project must adhere to strict budgetary controls with a target completion date of <mark className="bg-emerald-50 text-emerald-700 font-bold px-1">August 2026</mark>.
                                  </p>
                               </section>

                               <div className="h-px bg-gray-100 w-full" />
                               
                               <div className="flex justify-between items-center text-[9px] font-bold text-gray-300 uppercase tracking-[0.4em]">
                                  <span>CONFIDENTIAL DOCUMENT</span>
                                  <span>PAGE 01 / 12</span>
                               </div>
                            </div>
                         </div>
                      </div>
                   ) : (
                      <div className="max-w-prose">
                         <h1 className="text-3xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">{mailContent.subject}</h1>
                         <div className="prose prose-slate max-w-none">
                            <p className="text-xl leading-[1.8] text-gray-600 font-medium tracking-wide">
                               {mailContent.body.split('\n').map((line, i) => (
                                  <span key={i} className="block mb-4">
                                     {line.includes('€750,000') || line.includes('Building 04') ? 
                                      <mark className="bg-yellow-100/50 px-2 py-0.5 border-b-2 border-yellow-400 text-gray-900 rounded-sm shadow-sm">{line}</mark> : 
                                      line.includes('S355') || line.includes('Grade') ? 
                                      <mark className="bg-indigo-50 px-2 py-0.5 border-b-2 border-indigo-400 text-gray-900 rounded-sm shadow-sm">{line}</mark> : 
                                      line}
                                  </span>
                               ))}
                            </p>
                         </div>
                      </div>
                   )}
                 </div>
              </div>
           </div>
        </div>

        {/* Right Side: EXTRACTION PANEL */}
        <div className="w-[500px] flex-shrink-0 bg-white flex flex-col p-10 space-y-12 overflow-y-auto shadow-[-40px_0_80px_rgba(0,0,0,0.02)] z-10 relative">
           <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-1 bg-indigo-600 h-5 rounded-full" />
                   <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Extracted RFP Parameters</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-bold rounded-full">
                   <Sparkles className="w-3 h-3" /> AI GENERATED
                </div>
              </div>

              <div className="space-y-5">
                 {extractedParams.map((param, i) => (
                    <div key={i} className="group relative">
                       <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-1 mb-2 block">{param.label}</label>
                       <div className="flex items-center gap-4">
                          <div className="flex-1 px-6 py-4.5 bg-gray-50 border border-gray-100 rounded-2xl group-hover:bg-white group-hover:border-indigo-200 transition-all duration-300">
                             <input 
                               type="text" 
                               defaultValue={param.value}
                               className="w-full bg-transparent text-[14px] font-bold text-gray-900 outline-none uppercase tracking-tight"
                             />
                          </div>
                          <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                             <CheckCircle className="w-5 h-5" />
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="pt-8 border-t border-gray-50 flex-1 flex flex-col justify-end space-y-6">
              <div className="p-8 bg-gray-900 rounded-[32px] space-y-6 shadow-2xl shadow-indigo-100">
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Extraction Summary</p>
                    <div className="flex items-center gap-2">
                       <BrainCircuit className="w-4 h-4 text-indigo-400" />
                       <span className="text-white font-bold text-sm tracking-tight text-emerald-400">94.8%</span>
                    </div>
                 </div>
                 <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[94.8%]" />
                 </div>
                 <button 
                  onClick={onInitializeRFP}
                  className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                 >
                   Initialize RFP Master
                 </button>
              </div>
              <button 
                 onClick={onBack}
                 className="w-full py-5 bg-white text-gray-400 rounded-3xl font-bold uppercase tracking-[0.2em] text-[10px] hover:text-gray-900 transition-all"
              >
                Cancel Analysis
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
