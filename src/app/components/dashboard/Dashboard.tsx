import { useState } from 'react';
import { useAuth, IntelligenceMode } from '../../contexts/AuthContext';
import { Link } from 'react-router';
import {
  TrendingUp, TrendingDown, Clock, DollarSign, Target,
  FileText, CheckCircle, AlertCircle, Zap, ShieldCheck, 
  ArrowRight, Users, Activity, ExternalLink, BarChart3,
  ChevronRight, ArrowUpRight, Filter, Briefcase, Calendar, Plus,
  LayoutDashboard, ChevronRight as ChevronIcon, Database,
  Image as ImageIcon, Mail, Layers
} from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Simplified HUB Configuration
const HUB_CONFIG: Record<string, any> = {
  drawing: {
    title: 'Drawing System',
    kpis: [
      { label: 'Drawings', value: '124', change: 12, trend: 'up', icon: FileText, color: 'text-primary', bg: 'bg-secondary' },
      { label: 'Accuracy', value: '98.2%', change: 2, trend: 'up', icon: ShieldCheck, color: 'text-primary', bg: 'bg-secondary' },
      { label: 'Pending', value: '8', change: -5, trend: 'down', icon: Clock, color: 'text-gray-400', bg: 'bg-gray-50' },
      { label: 'Verified', value: '856', change: 18, trend: 'up', icon: CheckCircle, color: 'text-primary', bg: 'bg-secondary' },
    ],
    chartLabel: 'Processing Volume'
  },
  bom: {
    title: 'Data System',
    kpis: [
      { label: 'Tables', value: '452', change: 15, trend: 'up', icon: Database, color: 'text-primary', bg: 'bg-secondary' },
      { label: 'Integrity', value: '99.8%', change: 1, trend: 'up', icon: ShieldCheck, color: 'text-primary', bg: 'bg-secondary' },
      { label: 'Confidence', value: '94.5%', change: 5, trend: 'up', icon: Target, color: 'text-primary', bg: 'bg-secondary' },
      { label: 'BOM Items', value: '12.4k', change: 22, trend: 'up', icon: Activity, color: 'text-primary', bg: 'bg-secondary' },
    ],
    chartLabel: 'Extraction Speed'
  },
  visual: {
    title: 'Visual System',
    kpis: [
      { label: 'Images', value: '78', change: 8, trend: 'up', icon: ImageIcon, color: 'text-primary', bg: 'bg-secondary' },
      { label: 'Accuracy', value: '92.1%', change: 3, trend: 'up', icon: Target, color: 'text-primary', bg: 'bg-secondary' },
      { label: 'Active', value: '14', change: 2, trend: 'up', icon: Activity, color: 'text-primary', bg: 'bg-secondary' },
      { label: 'Matches', value: '342', change: 12, trend: 'up', icon: CheckCircle, color: 'text-primary', bg: 'bg-secondary' },
    ],
    chartLabel: 'Recognition Volume'
  },
  text: {
    title: 'Message System',
    kpis: [
      { label: 'Emails', value: '1.2k', change: 18, trend: 'up', icon: Mail, color: 'text-primary', bg: 'bg-secondary' },
      { label: 'Accuracy', value: '96.4%', change: 4, trend: 'up', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
      { label: 'Urgent', value: '23', change: -8, trend: 'down', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
      { label: 'Answers', value: '156', change: 15, trend: 'up', icon: CheckCircle, color: 'text-primary', bg: 'bg-secondary' },
    ],
    chartLabel: 'Message Flow'
  },
  mixed: {
    title: 'Unified System',
    kpis: [
      { label: 'Total RFPs', value: '45', change: 12, trend: 'up', icon: Briefcase, color: 'text-primary', bg: 'bg-secondary' },
      { label: 'Active', value: '28', change: 8, trend: 'up', icon: Activity, color: 'text-primary', bg: 'bg-secondary' },
      { label: 'Pending', value: '12', change: -3, trend: 'down', icon: Clock, color: 'text-gray-400', bg: 'bg-gray-50' },
      { label: 'Status', value: '98%', change: 2, trend: 'up', icon: ShieldCheck, color: 'text-primary', bg: 'bg-secondary' },
    ],
    chartLabel: 'Project Performance'
  }
};

const statusData = [
  { name: 'Approved', value: 45, color: '#10b981' },
  { name: 'Review', value: 25, color: '#f59e0b' },
  { name: 'Draft', value: 15, color: 'var(--primary)' },
  { name: 'Error', value: 15, color: '#ef4444' },
];

const chartData = [
  { month: 'Jan', rfqs: 42, won: 28 },
  { month: 'Feb', rfqs: 38, won: 26 },
  { month: 'Mar', rfqs: 45, won: 32 },
  { month: 'Apr', rfqs: 12, won: 7 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const mode = user?.intelligenceMode || 'mixed';
  const config = HUB_CONFIG[mode];

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-32">
      {/* 1. Breadcrumb Navigation */}
      <div className="py-6">
        <nav className="flex items-center gap-2 text-[13px] font-medium text-gray-400">
           <span className="hover:text-gray-900 cursor-pointer">Home</span>
           <span className="cursor-default">
             <ChevronIcon className="w-3.5 h-3.5" />
           </span>
           <span className="text-gray-900">{config.title}</span>
        </nav>
      </div>

      <div className="space-y-10">
        {/* 2. Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{config.title}</h1>
            <p className="text-sm text-gray-500 mt-1">Hello, {user?.name}</p>
          </div>
          <div className="flex gap-2">
             <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-all shadow-sm">
               <Filter className="w-3.5 h-3.5" /> Filter
             </button>
             <Link to="/rfqs/new" className={`flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm`}>
               <Plus className="w-3.5 h-3.5" /> Create RFP
             </Link>
          </div>
        </div>

        {/* 3. Summary (Simple Wording) */}
        <div className="space-y-6">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.kpis.map((kpi: any) => (
              <div key={kpi.label} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between h-44">
                <div className="flex justify-between items-start">
                   <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                         <span className="text-3xl font-bold text-gray-900 tracking-tight">{kpi.value}</span>
                         <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-bold ${kpi.trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                            {kpi.trend === 'up' ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                            {Math.abs(kpi.change)}%
                         </div>
                      </div>
                      <p className="text-sm font-semibold text-gray-700">{kpi.label}</p>
                      <p className="text-[11px] text-gray-400 font-medium">Monthly Change</p>
                   </div>
                   <div className={`p-3 rounded-lg ${kpi.bg} ${kpi.color} shadow-sm transition-colors duration-500`}>
                      <kpi.icon className="w-4.5 h-4.5" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Details */}
        <div className="bg-white p-12 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden group">
           <div className={`absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-110`} />
           <div className="relative z-10">
              <h2 className="text-2xl font-semibold text-gray-900">{config.title} Summary</h2>
              <p className="text-[15px] text-gray-500 mt-3 max-w-3xl leading-relaxed font-normal">
                 You are in the **{config.title}**. This system helps you with your {mode === 'drawing' ? 'drawings' : 'data'} work.
              </p>
           </div>
        </div>

        {/* 5. Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
           <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-10 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-10 decoration-primary/30 underline decoration-4 underline-offset-8 transition-all duration-500">{config.chartLabel}</h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: '0.75rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="rfqs" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={42} className="transition-all duration-500" />
                </BarChart>
              </ResponsiveContainer>
           </div>

           <div className="bg-white rounded-xl border border-gray-100 p-10 shadow-sm flex flex-col">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-10 decoration-emerald-500/30 underline decoration-4 underline-offset-8">Status</h3>
              <div className="flex-1 min-h-[250px] mb-8">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie data={statusData} cx="50%" cy="50%" innerRadius={80} outerRadius={105} paddingAngle={4} dataKey="value">
                       {statusData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} className="transition-all duration-500" />
                       ))}
                     </Pie>
                     <Tooltip />
                   </PieChart>
                 </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {statusData.map(s => (
                    <div key={s.name} className="flex flex-col gap-1.5 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full transition-colors duration-500" style={{ backgroundColor: s.color }} />
                           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.name}</span>
                       </div>
                       <span className="text-base font-bold text-gray-900 leading-none">{s.value}%</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
