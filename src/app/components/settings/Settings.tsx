import { useState, useEffect } from 'react';
import { useAuth, IntelligenceMode } from '../../contexts/AuthContext';
import { 
  User, Shield, Bell, Globe, Palette, 
  Save, RefreshCw, CheckCircle, AlertCircle,
  BrainCircuit, LayoutDashboard, Database,
  Image as ImageIcon, Mail, Layers, ChevronRight,
  LogOut, Lock, Moon, Sun, Smartphone, Zap
} from 'lucide-react';
import { Link } from 'react-router';

const INTELLIGENCE_MODES = [
  { id: 'drawing', label: 'Drawing Intelligence', icon: ImageIcon, desc: 'Blueprint & Layout extraction focus', color: 'text-primary', bg: 'bg-secondary' },
  { id: 'bom', label: 'BOM Intelligence', icon: Database, desc: 'Tabular & Structural data focus', color: 'text-primary', bg: 'bg-secondary' },
  { id: 'visual', label: 'Visual Intelligence', icon: Smartphone, desc: 'Equipment & Image recognition focus', color: 'text-primary', bg: 'bg-secondary' },
  { id: 'text', label: 'Message Intelligence', icon: Mail, desc: 'Semantic & Linguistic analytics focus', color: 'text-primary', bg: 'bg-secondary' },
  { id: 'mixed', label: 'Unified Mode', icon: Layers, desc: 'Holistic system-wide analytics', color: 'text-primary', bg: 'bg-secondary' },
];

export default function Settings() {
  const { user, updateIntelligenceMode, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleModeChange = (modeId: IntelligenceMode) => {
    updateIntelligenceMode(modeId);
    setSaveStatus('success');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 pt-4">
      <div className="py-2">
        <nav className="flex items-center gap-2 text-[13px] font-medium text-gray-400">
          <span>Home</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900">Settings</span>
        </nav>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-gray-600 mt-1">Manage your professional profile and intelligence preferences</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all font-semibold border border-rose-100"
        >
          <LogOut className="w-4 h-4" />
          Terminate Session
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-1">
          {[
            { id: 'profile', label: 'Identity Profile', icon: User },
            { id: 'intelligence', label: 'Intelligence Core', icon: Zap },
            { id: 'preferences', label: 'UI / Context', icon: Palette },
            { id: 'security', label: 'Access Control', icon: Lock },
            { id: 'notifications', label: 'Alert Protocols', icon: Bell },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'text-gray-600 hover:bg-white hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4.5 h-4.5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-8 border-b border-gray-50">
                <h3 className="text-lg font-bold text-gray-900">Identity Profile</h3>
                <p className="text-sm text-gray-500 mt-1">Your professional credentials within the network</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user?.name}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Network Role</label>
                    <input 
                      type="text" 
                      defaultValue={user?.role}
                      disabled
                      className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-lg text-sm text-gray-400 cursor-not-allowed opacity-60"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Communication Endpoint</label>
                    <input 
                      type="email" 
                      defaultValue={user?.email}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all text-xs uppercase tracking-widest shadow-lg shadow-primary/20">
                    <Save className="w-4 h-4" />
                    Synchronize Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'intelligence' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-lg font-bold text-gray-900">Intelligence Core</h3>
                <p className="text-sm text-gray-500 mt-1 mb-8">Select the analytical engine that powers your dashboard experience</p>
                
                <div className="grid grid-cols-1 gap-4">
                  {INTELLIGENCE_MODES.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => handleModeChange(mode.id as IntelligenceMode)}
                      className={`flex items-center justify-between p-6 rounded-xl border transition-all text-left group ${
                        user?.intelligenceMode === mode.id 
                        ? 'border-primary bg-white ring-4 ring-primary/5 shadow-md' 
                        : 'border-gray-100 hover:border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`p-4 rounded-xl ${mode.bg} ${mode.color} transition-colors duration-500`}>
                          <mode.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-gray-900">{mode.label}</p>
                          <p className="text-sm text-gray-500 mt-1">{mode.desc}</p>
                        </div>
                      </div>
                      {user?.intelligenceMode === mode.id && (
                        <CheckCircle className="w-6 h-6 text-primary animate-in zoom-in duration-300" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {saveStatus === 'success' && (
                <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 animate-in slide-in-from-top-4 duration-500">
                  <CheckCircle className="w-5 h-5" />
                  <p className="text-sm font-bold">System Intelligence Mode Successfully Synchronized</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'preferences' && (
             <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" /> Visual Core Configuration
              </h3>
              <p className="text-sm text-gray-500 mt-1 mb-8">Personalize your interaction with the intelligence hub</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Moon className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-sm font-bold text-gray-900">Analytical Theme</span>
                    </div>
                    <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Dark interface for high-intensity night audits</p>
                </div>

                <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Zap className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-bold text-gray-900">Live Telemetry</span>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Real-time data synchronization across all nodes</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50 flex justify-end">
                <button 
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all text-xs uppercase tracking-widest active:scale-95"
                  onClick={() => {
                    setSaveStatus('success');
                    setTimeout(() => setSaveStatus('idle'), 3000);
                  }}
                >
                  <Save className="w-4 h-4" />
                  Save System Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
