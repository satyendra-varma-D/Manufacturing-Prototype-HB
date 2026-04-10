import { ArrowLeft, Target, Award, ShieldCheck, Maximize2, ZoomIn, Info, Activity, BrainCircuit } from 'lucide-react';
import { useState } from 'react';

interface VisionHubProps {
  onBack: () => void;
  onInitializeRFP: () => void;
}

export default function VisionHub({ onBack, onInitializeRFP }: VisionHubProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const images = [
    { 
       url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070', 
       title: 'Equipment Zone A-01', 
       findings: ['Model identified: KUKA-KR-60', 'Condition: Operational', 'Mounting: Type B'] 
    },
    { 
       url: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7370?auto=format&fit=crop&q=80&w=2000', 
       title: 'Control Panel Interface', 
       findings: ['Siemens S7-1200 detected', 'FW Version: 4.2', 'IO Status: Normal'] 
    }
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in fade-in duration-500 overflow-hidden">
      <header className="h-20 bg-white border-b border-gray-100 px-10 flex items-center justify-between shadow-sm relative z-10">
        <div className="flex items-center gap-10">
          <button onClick={onBack} className="p-2 hover:bg-gray-50 rounded-xl transition-all border border-gray-100"><ArrowLeft className="w-5 h-5 text-gray-400" /></button>
          <div className="h-10 w-px bg-gray-100" />
          <div>
            <h2 className="text-[13px] font-bold text-orange-600 uppercase tracking-[0.2em]">Vision Intelligence Hub</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Equipment Identification • Visual Based</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden bg-[#0a0a0b]">
        <div className="flex-1 flex flex-col relative group">
           <div className="absolute inset-0 flex items-center justify-center p-12">
              <img 
                src={images[selectedImage].url} 
                className="max-h-full max-w-full rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 object-contain transition-all duration-700 hover:scale-[1.02]" 
              />
           </div>

           {/* AI Overlays */}
           <div className="absolute top-20 left-20 space-y-4">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center gap-3 animate-in slide-in-from-left duration-500">
                 <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                 <span className="text-[10px] font-bold text-white uppercase tracking-widest">KUKA-KR-60 IDENTIFIED</span>
                 <span className="text-[9px] font-bold text-orange-300">92% CONF</span>
              </div>
           </div>

           <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-orange-500 scale-110 shadow-lg shadow-orange-500/20' : 'border-transparent opacity-40 hover:opacity-100'}`}
                >
                  <img src={img.url} className="w-full h-full object-cover" />
                </button>
              ))}
           </div>
        </div>

        <div className="w-[480px] bg-white flex flex-col p-10 space-y-10 shadow-[-40px_0_80px_rgba(0,0,0,0.2)] relative z-20">
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-1 bg-orange-600 h-5 rounded-full" />
                 <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Visual Analysis Results</h3>
              </div>
              <p className="text-xl font-bold text-gray-900 leading-tight">{images[selectedImage].title}</p>
              
              <div className="space-y-3">
                 {images[selectedImage].findings.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-orange-500 transition-colors">
                       <ShieldCheck className="w-4 h-4 text-orange-500" />
                       <span className="text-sm font-bold text-gray-700 tracking-tight">{f}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="pt-8 border-t border-gray-100 space-y-6">
              <div className="flex items-center justify-between px-2">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vision Logic Status</span>
                 <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Active</span>
                 </div>
              </div>
              <button 
                onClick={onInitializeRFP}
                className="w-full py-5 bg-orange-600 text-white rounded-[24px] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-orange-700 shadow-xl shadow-orange-100 transition-all active:scale-95"
              >
                Validate & Initialize RFP
              </button>
           </div>

           <div className="flex-1" />

           <div className="p-6 bg-gray-900 rounded-[32px] space-y-4">
              <div className="flex items-center gap-3">
                 <BrainCircuit className="w-5 h-5 text-orange-500" />
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vision Core 2.0</p>
              </div>
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed italic">"Models trained on over 2.4M industrial machinery datasets to ensure precision in site audits."</p>
           </div>
        </div>
      </div>
    </div>
  );
}
