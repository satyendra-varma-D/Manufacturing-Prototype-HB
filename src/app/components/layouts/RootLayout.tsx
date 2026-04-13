import { Outlet, useLocation, Link } from 'react-router';
import { useAuth, IntelligenceMode } from '../../contexts/AuthContext';
import {
  LayoutDashboard, FileText, FileCheck, Users, BookOpen,
  CheckSquare, BarChart3, Settings, Search, Bell, Mail,
  ChevronRight, LogOut, User, Clock, ChevronDown, 
  Briefcase, Layers, Database, ShieldCheck, Zap,
  Image as ImageIcon,
  Activity
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Simplified HUB Branding Mapping
const HUB_BRANDING: Record<string, any> = {
  drawing: { name: 'Drawing System', icon: FileText, color: 'text-primary', badge: 'Technical' },
  bom: { name: 'Data System', icon: Database, color: 'text-primary', badge: 'Analytical' },
  visual: { name: 'Visual System', icon: ImageIcon, color: 'text-primary', badge: 'Spatial' },
  text: { name: 'Message System', icon: Mail, color: 'text-primary', badge: 'Linguistic' },
  mixed: { name: 'Unified System', icon: ShieldCheck, color: 'text-primary', badge: 'General' }
};

const navGroups = [
  {
    title: 'Overview',
    items: [
      { name: 'Home', path: '/', icon: LayoutDashboard },
      { name: 'Mails', path: '/mails', icon: Mail },
    ]
  },
  {
    title: 'Work',
    items: [
      { name: 'RFPs', path: '/rfqs', icon: FileText },
      { name: 'Quotations', path: '/quotations', icon: FileCheck },
      { name: 'Customers', path: '/customers', icon: Users },
    ]
  },
  {
    title: 'Knowledge',
    items: [
      { name: 'Knowledge Base', path: '/knowledge', icon: BookOpen },
      { name: 'Reports', path: '/reports', icon: BarChart3 },
    ]
  },
  {
    title: 'Settings',
    items: [
      { name: 'General', path: '/settings', icon: Settings },
    ]
  }
];

export default function RootLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const mode = user?.intelligenceMode || 'mixed';
  const brand = HUB_BRANDING[mode];

  const notifications = [
    { id: 1, title: `New ${brand.name} Update`, description: 'New match found in the system.', time: '2h ago', unread: true },
    { id: 2, title: 'Login Status', description: `${brand.badge} System is active.`, time: '5h ago', unread: true },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-[#F8F9FB]">
      
      {/* 1. Sidebar (Simple Branding) */}
      <aside className="w-[280px] bg-white border-r border-gray-100 flex flex-col shadow-sm z-50">
        <div className="p-8 pb-10">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary shadow-sm border border-primary/20">
                 <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                 <h1 className="text-[14px] font-bold text-gray-900 leading-none mb-1 truncate">HB Manufacturing</h1>
                 <p className="text-[9px] text-primary font-bold uppercase tracking-widest leading-none">{brand.name}</p>
              </div>
           </div>
        </div>

        <nav className="flex-1 px-6 space-y-10 overflow-y-auto custom-scrollbar pb-10">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-3">
               <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-4">{group.title}</p>
               <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                    const Icon = item.icon;
                    return (
                      <Link key={item.path} to={item.path} className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-secondary text-primary' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                         <div className="flex items-center gap-3.5">
                            <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'} transition-colors`} />
                            <span className="text-[14px] font-semibold">{item.name}</span>
                         </div>
                         {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-sm" />}
                      </Link>
                    );
                  })}
               </div>
            </div>
          ))}
        </nav>

        {/* Profile Footer (Simplified) */}
        <div className="p-6 border-t border-gray-50">
           <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center border border-primary/10">
                    <User className="w-5 h-5 text-primary" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{brand.badge} Access</p>
                 </div>
              </div>
              <button 
                onClick={() => {
                   logout();
                   window.location.href = '/login';
                }} 
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 text-gray-500 rounded-lg text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100"
              >
                 <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
           </div>
        </div>
      </aside>

      {/* 2. Main Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* TopBar (Simplified) */}
        <header className="bg-white border-b border-gray-100 px-10 py-5 z-40">
           <div className="flex items-center justify-between">
              <div className="flex-1 max-w-2xl relative">
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-300" />
                 <input
                   type="text"
                   placeholder={`Search ${brand.name.toLowerCase()}...`}
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-14 pr-6 py-3.5 bg-[#F8F9FB] border border-transparent rounded-2xl text-[14px] placeholder-gray-400 focus:bg-white focus:border-primary/40 outline-none transition-all shadow-inner"
                 />
              </div>

              <div className="flex items-center gap-6 ml-10" ref={notificationRef}>
                 <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                      className={`relative p-3 rounded-xl transition-all ${isNotificationsOpen ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-gray-50 hover:text-primary'}`}
                    >
                      <Bell className="w-5 h-5" />
                      {notifications.length > 0 && <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />}
                    </button>
                    {isNotificationsOpen && (
                      <div className="absolute right-24 top-20 w-[380px] bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                           <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
                           <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-secondary px-2 py-1 rounded-md">Live</span>
                        </div>
                        <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto custom-scrollbar">
                           {notifications.map((n) => (
                             <div key={n.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
                                <div className="flex gap-4">
                                   <div className={`w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm`}>
                                      <Zap className="w-4.5 h-4.5" />
                                   </div>
                                   <div>
                                      <p className="text-sm font-bold text-gray-900 mb-1">{n.title}</p>
                                      <p className="text-xs text-gray-500 line-clamp-1">{n.description}</p>
                                   </div>
                                </div>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}
                 </div>

                 <div className="h-10 w-px bg-gray-100 mx-2" />

                 <Link to="/profile" className="flex items-center gap-3 group">
                    <div className="w-11 h-11 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:border-primary/40 transition-all overflow-hidden shadow-sm">
                       <User className="w-5.5 h-5.5 text-gray-400 group-hover:text-primary" />
                    </div>
                    <div className="text-left hidden xl:block">
                       <p className="text-sm font-bold text-gray-900 leading-none mb-1 group-hover:text-primary transition-colors">{user?.name}</p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">{brand.badge} Access</p>
                    </div>
                 </Link>
              </div>
           </div>
        </header>

        {/* Global Page Container (Proper Alignment Shift) */}
        <main className="flex-1 overflow-y-auto px-10 py-10 custom-scrollbar">
           <div className="max-w-[1600px] mx-auto w-full">
              <Outlet />
           </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}
