import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Search, BookOpen, ExternalLink, Plus, X, Upload, 
  DollarSign, Building, Calendar, Tag, FileCode, 
  Box, Settings, Layers, Star, Info, ChevronRight,
  ShieldCheck, BrainCircuit, Activity
} from 'lucide-react';
import { mockKnowledgeBase } from '../../data/mockData';
import { KnowledgeItem, KnowledgeItemType } from '../../types';

export default function KnowledgeBaseList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [items, setItems] = useState<KnowledgeItem[]>(mockKnowledgeBase);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    customer: '',
    value: '',
    category: 'Facility Management',
    type: 'Drawing' as KnowledgeItemType,
    date: new Date().toISOString().split('T')[0],
    description: '',
    revision: '',
    material: '',
    process: ''
  });

  const categories = ['all', ...Array.from(new Set(mockKnowledgeBase.map(item => item.category)))];
  const types = ['all', 'Drawing', 'Part', 'Facility', 'Process', 'General'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: KnowledgeItem = {
      id: `KB-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      title: formData.title,
      customer: formData.customer,
      value: parseFloat(formData.value) || 0,
      category: formData.category,
      type: formData.type,
      completedDate: formData.date,
      description: formData.description || `Added ${formData.type.toLowerCase()} for ${formData.customer}`,
      tags: ['imported', formData.type.toLowerCase()],
      revision: formData.revision,
      material: formData.material,
      process: formData.process
    };

    setItems([newItem, ...items]);
    setIsDrawerOpen(false);
    setFormData({ 
      title: '', customer: '', value: '', category: 'Facility Management', 
      type: 'Drawing', date: new Date().toISOString().split('T')[0], 
      description: '', revision: '', material: '', process: '' 
    });
  };

  const getItemIcon = (type: KnowledgeItemType) => {
    switch (type) {
      case 'Drawing': return <FileCode className="w-5 h-5 text-primary" />;
      case 'Part': return <Box className="w-5 h-5 text-emerald-500" />;
      case 'Facility': return <Building className="w-5 h-5 text-indigo-500" />;
      case 'Process': return <Settings className="w-5 h-5 text-amber-500" />;
      default: return <BookOpen className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Industrial Knowledge Base</h1>
          <div className="flex items-center gap-3 mt-1">
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded border border-gray-100">Engineering Intelligence</span>
             <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
             <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{filteredItems.length} ACTIVE ARTIFACTS</p>
          </div>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add Quote to KB
        </button>
      </div>

      {/* Filters Hub */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Global Semantic Search</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="text"
                placeholder="Search drawings, materials, revision codes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-primary/40 transition-all outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Artifact Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-xs font-bold text-gray-900 focus:bg-white focus:border-primary/40 transition-all outline-none appearance-none"
            >
              {types.map(t => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All Artifacts' : t}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Category Domain</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-xs font-bold text-gray-900 focus:bg-white focus:border-primary/40 transition-all outline-none appearance-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Domains' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Knowledge Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            to={`/knowledge/${item.id}`}
            className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col min-h-[320px]"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-primary/5 flex items-center justify-center transition-colors">
                {getItemIcon(item.type)}
              </div>
              <div className="flex flex-col items-end gap-1.5 text-[9px] font-bold uppercase tracking-tighter">
                <span className="px-2 py-0.5 bg-gray-50 text-gray-400 rounded border border-gray-100">{item.id}</span>
                <span className="text-emerald-500 flex items-center gap-1"><Star className="w-2.5 h-2.5 fill-emerald-500" /> TOP MATCH</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                 <p className="text-[9px] font-bold text-primary uppercase tracking-widest">{item.type}</p>
                 <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.category}</p>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
              <p className="text-xs text-gray-500 mb-6 line-clamp-2 leading-relaxed font-medium">{item.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Commercial Value</p>
                    <p className="text-xs font-bold text-gray-900 leading-none">€{(item.value / 1000).toFixed(0)}K</p>
                </div>
                <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Revision</p>
                    <p className="text-xs font-bold text-gray-900 leading-none">{item.revision || 'Gen 1'}</p>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-gray-50 flex items-center justify-between mt-auto">
               <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                     <div className="w-6 h-6 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center text-[8px] font-bold text-primary">EL</div>
                     <div className="w-6 h-6 rounded-full bg-emerald-50 border-2 border-white flex items-center justify-center text-[8px] font-bold text-emerald-500">TH</div>
                  </div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.associatedFiles?.length || 0} Associations</span>
               </div>
               <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-primary transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5" />
               </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 py-24 text-center shadow-sm">
          <Layers className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <h3 className="text-base font-bold text-gray-900 uppercase tracking-widest mb-1">Zero Semantic Matches</h3>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Adjust filters or run a semantic search query</p>
        </div>
      )}

      {/* Side Panel (Drawer) */}
      {isDrawerOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[70] animate-in fade-in duration-300" 
            onClick={() => setIsDrawerOpen(false)} 
          />
          <div className="fixed inset-y-0 right-0 w-[520px] bg-white shadow-2xl z-[80] flex flex-col animate-in slide-in-from-right duration-500 ease-out">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
               <div>
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Import Technical Artifact</h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Add drawings or specs to knowledge base</p>
               </div>
               <button 
                 onClick={() => setIsDrawerOpen(false)}
                 className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
               <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Artifact Type</label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({...formData, type: e.target.value as KnowledgeItemType})}
                          className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-primary transition-all outline-none"
                        >
                           <option value="Drawing">Drawing</option>
                           <option value="Part">Part</option>
                           <option value="Facility">Facility</option>
                           <option value="Process">Process</option>
                           <option value="General">General</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Category Domain</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-primary transition-all outline-none"
                        >
                           <option value="Facility Management">Facility Management</option>
                           <option value="Logistics">Logistics</option>
                           <option value="Infrastructure">Infrastructure</option>
                           <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Artifact / Drawing Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-primary transition-all outline-none"
                      placeholder="e.g., Flange Assembly Munich"
                    />
                  </div>

                  {/* Engineering Metadata */}
                  <div className="p-5 bg-secondary/30 rounded-2xl border border-primary/10 space-y-6">
                     <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5" /> Engineering Metadata
                     </p>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Revision Code</label>
                           <input
                             type="text"
                             value={formData.revision}
                             onChange={(e) => setFormData({...formData, revision: e.target.value})}
                             className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-900 focus:border-primary transition-all outline-none"
                             placeholder="e.g., Rev A"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Material Grade</label>
                           <input
                             type="text"
                             value={formData.material}
                             onChange={(e) => setFormData({...formData, material: e.target.value})}
                             className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-900 focus:border-primary transition-all outline-none"
                             placeholder="e.g., SS316L"
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Primary Process</label>
                        <input
                          type="text"
                          value={formData.process}
                          onChange={(e) => setFormData({...formData, process: e.target.value})}
                          className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-900 focus:border-primary transition-all outline-none"
                          placeholder="e.g., CNC Milling"
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Total Valuation</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">€</span>
                        <input
                          type="number"
                          required
                          value={formData.value}
                          onChange={(e) => setFormData({...formData, value: e.target.value})}
                          className="w-full pl-8 pr-5 py-3.5 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-primary transition-all outline-none"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Client Entity</label>
                      <input
                        type="text"
                        value={formData.customer}
                        onChange={(e) => setFormData({...formData, customer: e.target.value})}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-primary transition-all outline-none"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">File Association (Dossier Mode)</label>
                    <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-gray-50/50 hover:bg-white hover:border-primary/30 transition-all cursor-pointer group">
                       <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-300 group-hover:text-primary transition-colors">
                          <Upload className="w-6 h-6" />
                       </div>
                       <div className="text-center">
                          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Upload Associated Sources</p>
                          <p className="text-[10px] text-gray-400 font-medium mt-1">PDF, CAD, EML (Up to 10 files)</p>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="pt-4 border-t border-gray-100">
                  <button 
                    type="submit"
                    className="w-full py-4.5 bg-primary text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Add Quote to KB
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-full mt-4 py-4.5 bg-white text-gray-400 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:text-gray-900 transition-all"
                  >
                    Discard Changes
                  </button>
               </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
