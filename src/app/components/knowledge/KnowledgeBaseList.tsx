import { useState } from 'react';
import { Link } from 'react-router';
import { Search, BookOpen, ExternalLink, Plus, X, Upload, DollarSign, Building, Calendar, Tag } from 'lucide-react';
import { mockKnowledgeBase } from '../../data/mockData';
import { KnowledgeItem } from '../../types';

export default function KnowledgeBaseList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [items, setItems] = useState<KnowledgeItem[]>(mockKnowledgeBase);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    customer: '',
    value: '',
    category: 'Facility Management',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const categories = ['all', ...Array.from(new Set(mockKnowledgeBase.map(item => item.category)))];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: KnowledgeItem = {
      id: `KB-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      title: formData.title,
      customer: formData.customer,
      value: parseFloat(formData.value) || 0,
      category: formData.category,
      completedDate: formData.date,
      description: formData.description || `Added past quotation for ${formData.customer}`,
      tags: ['imported', 'quotation']
    };

    setItems([newItem, ...items]);
    setIsDrawerOpen(false);
    setFormData({ title: '', customer: '', value: '', category: 'Facility Management', date: new Date().toISOString().split('T')[0], description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Knowledge Base</h1>
          <p className="text-[13px] font-medium text-gray-500 mt-1 uppercase tracking-wider">Past projects and reference materials • {filteredItems.length} items</p>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, tags, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Knowledge Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            to={`/knowledge/${item.id}`}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-gray-600">{item.category}</span>
              <span className="font-medium text-gray-900">${(item.value / 1000).toFixed(0)}K</span>
            </div>

            {item.customer && (
              <p className="text-xs text-gray-500 mb-3">Customer: {item.customer}</p>
            )}

            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Completed: {new Date(item.completedDate).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No knowledge base items found</p>
        </div>
      )}

      {/* Side Panel (Drawer) */}
      {isDrawerOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[70] animate-in fade-in duration-300" 
            onClick={() => setIsDrawerOpen(false)} 
          />
          <div className="fixed inset-y-0 right-0 w-[480px] bg-white shadow-2xl z-[80] flex flex-col animate-in slide-in-from-right duration-500 ease-out">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
               <div>
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Add Past Quotation</h2>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Import historical data to Knowledge Base</p>
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
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Project / Quote Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-indigo-500 transition-all outline-none"
                      placeholder="e.g., Munich Facility Sorting Line"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                       <Building className="w-3 h-3" /> Client Entity
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customer}
                      onChange={(e) => setFormData({...formData, customer: e.target.value})}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-indigo-500 transition-all outline-none"
                      placeholder="Customer Name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                         <DollarSign className="w-3 h-3" /> Quote Value
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-bold">€</span>
                        <input
                          type="number"
                          required
                          value={formData.value}
                          onChange={(e) => setFormData({...formData, value: e.target.value})}
                          className="w-full pl-8 pr-5 py-3.5 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-indigo-500 transition-all outline-none"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                        <Tag className="w-3 h-3" /> Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-xl text-xs font-bold text-gray-900 focus:bg-white focus:border-indigo-500 transition-all outline-none"
                      >
                         <option value="Facility Management">Facility Management</option>
                         <option value="Logistics">Logistics</option>
                         <option value="Infrastructure">Infrastructure</option>
                         <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                       <Calendar className="w-3 h-3" /> Completion Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-indigo-500 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Attachment (PDF)</label>
                    <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-gray-50/50 hover:bg-gray-50 hover:border-indigo-200 transition-all cursor-pointer group">
                       <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-300 group-hover:text-indigo-600 transition-colors">
                          <Upload className="w-6 h-6" />
                       </div>
                       <div className="text-center">
                          <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Upload Quotation PDF</p>
                          <p className="text-[10px] text-gray-400 font-medium mt-1">Maximum file size 25MB</p>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-4.5 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Add to Knowledge Base
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-full mt-4 py-4.5 bg-white text-gray-400 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:text-gray-900 transition-all"
                  >
                    Cancel
                  </button>
               </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
