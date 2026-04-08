import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth, IntelligenceMode } from '../../contexts/AuthContext';
import { 
  AlertCircle, Eye, EyeOff, FileText, Database, 
  Image as ImageIcon, Mail, Layers, ChevronRight,
  ShieldCheck, Globe, Lock, Copy, Check
} from 'lucide-react';

const HUB_INFO = {
  drawing: { id: 'drawing', label: 'Drawing Based', color: 'text-blue-600', bg: 'bg-blue-50', email: 'drawing@rfq.ai', pass: 'draw-2026' },
  bom: { id: 'bom', label: 'BOM Based', color: 'text-emerald-600', bg: 'bg-emerald-50', email: 'bom@rfq.ai', pass: 'data-2026' },
  visual: { id: 'visual', label: 'Visual Based', color: 'text-amber-600', bg: 'bg-amber-50', email: 'visual@rfq.ai', pass: 'view-2026' },
  text: { id: 'text', label: 'Text Based', color: 'text-indigo-600', bg: 'bg-indigo-50', email: 'text@rfq.ai', pass: 'mail-2026' },
  mixed: { id: 'mixed', label: 'Mixed RFQs', color: 'text-purple-600', bg: 'bg-purple-50', email: 'mixed@rfq.ai', pass: 'unified-2026' },
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickAccess = (hub: any) => {
    setEmail(hub.email);
    setPassword(hub.pass);
    handleCopy(hub.email);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let mode: IntelligenceMode = 'mixed';
    if (email.includes('drawing')) mode = 'drawing';
    else if (email.includes('bom')) mode = 'bom';
    else if (email.includes('visual')) mode = 'visual';
    else if (email.includes('text')) mode = 'text';

    const success = login(email, password, mode);
    if (success) {
       navigate('/');
    } else {
      setError('Login failed. Please check user name and password.');
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-indigo-100 selection:text-indigo-600 overflow-hidden">
      
      {/* 1. Left Side Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-600 overflow-hidden group">
         <div 
           className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
           style={{ backgroundImage: 'url("/modern_manufacturing_unit_login_bg_1775635831057.png")' }}
         >
           <div className="absolute inset-0 bg-indigo-600/60 backdrop-blur-[1px]" />
         </div>

         <div className="relative z-10 w-full flex flex-col justify-center px-16 xl:px-24">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/20 backdrop-blur-md">
               <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-[1.2] tracking-tight">
               Let's make every day<br />
               Meaningful together.
            </h2>
            <p className="mt-4 text-indigo-100/80 text-sm font-medium tracking-wide">
               Building intelligent tools for easy manufacturing workflows.
            </p>
         </div>

         <div className="absolute -inset-y-2 -right-1 z-20 w-32 fill-white text-white">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
               <path d="M100 0 C0 0 100 50 0 100 L100 100 Z" />
            </svg>
         </div>
      </div>

      {/* 2. Right Side: Login Panel (Simplified Wording) */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-12 xl:p-16 bg-white relative z-30 overflow-y-auto">
        <div className="w-full max-w-[540px] mx-auto">
          
          <div className="mb-12">
             <div className="flex items-center gap-2 mb-10">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm font-bold text-lg">H</div>
                <span className="text-xl font-bold text-indigo-600 tracking-tight">Estimation Hub</span>
             </div>

             <h1 className="text-3xl font-bold text-gray-900 tracking-tight leading-none">Login</h1>
             <p className="mt-4 text-sm text-gray-500 font-medium leading-relaxed">Enter your login details to access the system.</p>
          </div>

          {/* Core Login Form */}
          <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   <Globe className="w-3.5 h-3.5" /> User Name
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-400 outline-none transition-all font-semibold text-gray-900 text-sm shadow-inner"
                  placeholder="drawing@rfq.ai"
                  required
                />
             </div>

             <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   <Lock className="w-3.5 h-3.5" /> Password
                </label>
                <div className="relative">
                   <input
                     type={showPassword ? 'text' : 'password'}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-400 outline-none transition-all font-semibold text-gray-900 text-sm shadow-inner"
                     placeholder="••••••••"
                     required
                   />
                   <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-indigo-600 transition-all duration-300"
                   >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                   </button>
                </div>
             </div>

             {error && (
                <div className="flex items-center gap-3 text-rose-600 text-[12px] font-semibold bg-rose-50 p-4 rounded-xl border border-rose-100">
                   <AlertCircle className="w-4 h-4 flex-shrink-0" />
                   <span>{error}</span>
                </div>
             )}

             <button
                type="submit"
                className="w-full h-16 bg-indigo-600 text-white font-bold rounded-2xl text-[12px] uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-3"
             >
                Login <ChevronRight className="w-4 h-4" />
             </button>
          </form>

          {/* Quick Access Credentials (Simplified Wording) */}
          <div className="mt-14 pt-10 border-t border-gray-50 space-y-6">
             <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Login Credentials</p>
                {copied && <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest animate-pulse">Copied!</span>}
             </div>
             
             <div className="grid grid-cols-1 gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-700">
                {Object.values(HUB_INFO).map((hub) => (
                   <button 
                     key={hub.id}
                     onClick={() => handleQuickAccess(hub)}
                     className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-50 transition-all text-left group"
                   >
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-xl ${hub.bg} ${hub.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                            {hub.id === 'drawing' && <FileText className="w-5 h-5" />}
                            {hub.id === 'bom' && <Database className="w-5 h-5" />}
                            {hub.id === 'visual' && <ImageIcon className="w-5 h-5" />}
                            {hub.id === 'text' && <Mail className="w-5 h-5" />}
                            {hub.id === 'mixed' && <Layers className="w-5 h-5" />}
                         </div>
                         <div>
                            <p className="text-[13px] font-bold text-gray-900 leading-none mb-1">{hub.label}</p>
                            <p className="text-[11px] text-gray-500 font-medium">User: {hub.email} | Pass: {hub.pass}</p>
                         </div>
                      </div>
                      <div className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-50 rounded-lg">
                         <Copy className="w-3.5 h-3.5 text-indigo-600" />
                      </div>
                   </button>
                ))}
             </div>
          </div>

          <div className="mt-12 pt-8 flex items-center justify-between opacity-50">
             <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">© 2026 Estimation HUB</p>
             <button className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}
