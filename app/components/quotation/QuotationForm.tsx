import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router';
import {
  ArrowLeft, Save, Plus, Trash2, Sparkles,
  History, Info, CheckCircle2, TrendingUp, ShieldCheck,
  Target, AlertTriangle, BarChart3, Zap, BrainCircuit,
  Lock, BookOpen, Layers, Users, Clock, ArrowRight,
  ChevronRight, Calculator, FileText, Settings
} from 'lucide-react';
import { mockQuotations, mockCustomers, mockRFQs } from '../../data/mockData';
import { BOMItem } from '../../types';

// Simplified Pricing Strategies
const PRICING_STRATEGIES = [
  { id: 'strategic', label: 'Strategic', margin: 0.15, description: 'High-volume deal preference', color: 'text-blue-600', dot: 'bg-blue-500' },
  { id: 'standard', label: 'Standard', margin: 0.20, description: 'Default operating margin', color: 'text-gray-900', dot: 'bg-indigo-500' },
  { id: 'premium', label: 'Premium', margin: 0.30, description: 'High-complexity optimization', color: 'text-purple-600', dot: 'bg-purple-500' },
];

export default function QuotationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = !!id;
  const existingQuote = isEdit ? mockQuotations.find(q => q.id === id) : null;

  const rfqId = location.state?.rfqId;
  const baselineQuoteId = location.state?.baselineQuoteId;
  const prefilledItems = location.state?.prefilledItems;

  const linkedRFQ = rfqId ? mockRFQs.find(r => r.id === rfqId) : null;

  const [formData, setFormData] = useState({
    name: existingQuote?.name || (linkedRFQ ? `Estimate for ${linkedRFQ.name}` : ''),
    customerId: existingQuote?.customerId || linkedRFQ?.customerId || '',
    rfqId: existingQuote?.rfqId || rfqId || '',
  });

  const [bomItems, setBomItems] = useState<BOMItem[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState(PRICING_STRATEGIES[1]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [harvestInsights, setHarvestInsights] = useState(true);

  useEffect(() => {
    if (existingQuote) {
      setBomItems(existingQuote.bom);
    } else if (prefilledItems) {
      setBomItems(prefilledItems);
    } else if (linkedRFQ) {
      setBomItems(linkedRFQ.extractedData?.items || []);
    }
  }, [existingQuote, prefilledItems, linkedRFQ]);

  const handleAddItem = () => {
    const newItem: BOMItem = {
      id: Date.now().toString(),
      partNumber: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
    };
    setBomItems([...bomItems, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setBomItems(bomItems.filter(item => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof BOMItem, value: any) => {
    setBomItems(bomItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.totalPrice = updated.quantity * (updated.unitPrice || 0);
        }
        return updated;
      }
      return item;
    }));
  };

  const handleAISuggest = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setBomItems(prev => prev.map(item => {
        const historicalBase = item.unitPrice > 0 ? item.unitPrice : 5000;
        const optimizedPrice = historicalBase * (1 + selectedStrategy.margin);
        return { ...item, unitPrice: Math.round(optimizedPrice), totalPrice: Math.round(optimizedPrice * item.quantity) };
      }));
      setIsOptimizing(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/quotations');
  };

  const totalQuoteValue = bomItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  const confidenceScore = 94.2;

  const resolveApprovalStatus = () => {
    if (totalQuoteValue > 250000) return { label: 'Partner Review', level: 3, icon: ShieldCheck, color: 'text-amber-600', reason: 'High-Value Threshold' };
    return { label: 'Auto-Approved', level: 1, icon: CheckCircle2, color: 'text-emerald-600', reason: 'Policy Compliant' };
  };
  const approval = resolveApprovalStatus();

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 pb-32 pt-10 px-8 bg-[#fafbfc] min-h-screen">

      {/* 1. Clean Minimal Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-6">
          <Link to="/quotations" className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-white transition-all">
            <ArrowLeft className="w-4 h-4 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 leading-none">Create Estimation</h1>
            <p className="text-xs text-gray-500 mt-2 font-medium">Building technical specifications for {linkedRFQ?.customer || 'New Project'}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {totalQuoteValue > 0 && (
            <div className="flex flex-col items-end mr-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Proposed Total</p>
              <p className="text-xl font-semibold text-gray-900 leading-none">$ {totalQuoteValue.toLocaleString()}</p>
            </div>
          )}
          <button onClick={handleSubmit} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-sm hover:bg-indigo-700 transition-all text-xs flex items-center gap-2.5">
            <Save className="w-4 h-4" /> Save Estimation
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Main Workspace Area (Clean White Cards) */}
        <div className="lg:col-span-3 space-y-8">

          {/* 2. Simplified Pricing Strategies */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Settings className="w-4 h-4 text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Pricing Policy</h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {PRICING_STRATEGIES.map((strategy) => (
                <button key={strategy.id} type="button" onClick={() => setSelectedStrategy(strategy)} className={`p-6 rounded-xl border transition-all text-left group relative ${selectedStrategy.id === strategy.id ? 'border-indigo-600 bg-white ring-2 ring-indigo-50 shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`w-2 h-2 rounded-full ${strategy.dot}`} />
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${strategy.color}`}>{strategy.label}</span>
                  </div>
                  <p className="text-2xl font-semibold text-gray-900">{(strategy.margin * 100).toFixed(0)}% <span className="text-[10px] font-medium text-gray-400 uppercase ml-1">Margin</span></p>
                  <p className="text-[10px] text-gray-500 font-medium mt-3 leading-relaxed">{strategy.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Minimal BOM Workspace */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">Bill of Materials</h2>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={handleAISuggest} className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-indigo-600 rounded-lg hover:bg-indigo-50 text-xs font-semibold transition-all border border-indigo-100"><Sparkles className="w-3.5 h-3.5" /> AI Optimizer</button>
                <button type="button" onClick={handleAddItem} className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50 text-xs font-semibold transition-all border border-gray-200 shadow-sm"><Plus className="w-3.5 h-3.5" /> Add Row</button>
              </div>
            </div>

            <div className="space-y-4">
              {bomItems.map((item, index) => (
                <div key={item.id} className="group relative bg-white rounded-xl border border-gray-100 p-6 transition-all hover:border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                    <div className="md:col-span-3">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Part ID</label>
                      <input type="text" value={item.partNumber} onChange={(e) => handleItemChange(item.id, 'partNumber', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50/50 rounded-lg border border-transparent focus:bg-white focus:border-indigo-400 outline-none transition-all font-semibold text-gray-900 text-xs" />
                    </div>
                    <div className="md:col-span-4">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Specification</label>
                      <input type="text" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50/50 rounded-lg border border-transparent focus:bg-white focus:border-indigo-400 outline-none transition-all font-medium text-gray-500 text-xs" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block text-center">Qty</label>
                      <input type="number" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)} className="w-full px-4 py-2.5 bg-gray-50/50 rounded-lg border border-transparent text-center outline-none font-bold text-gray-900 text-xs" />
                    </div>
                    <div className="md:col-span-3 flex items-end gap-3">
                      <div className="flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Net Unit Price</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">$</span>
                          <input type="number" value={item.unitPrice} onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)} className="w-full pl-8 pr-4 py-2.5 bg-gray-50/50 rounded-lg border border-transparent focus:bg-white focus:border-indigo-400 outline-none transition-all font-bold text-gray-900 text-xs" />
                        </div>
                      </div>
                      <button type="button" onClick={() => handleRemoveItem(item.id)} className="p-2.5 text-gray-300 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Simple Governance Note */}
          <div className="bg-indigo-600 rounded-xl p-8 text-white flex items-center justify-between shadow-lg shadow-indigo-100">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center"><ShieldCheck className="w-6 h-6" /></div>
              <div>
                <h3 className="text-lg font-semibold">Ready for Governance Sync?</h3>
                <p className="text-xs text-indigo-100 font-medium opacity-80 mt-1">Estimations will be documented in the organizational discovery hub for future reference.</p>
              </div>
            </div>
            <label className="flex items-center gap-4 cursor-pointer">
              <div className="relative w-12 h-6 bg-white/20 rounded-full">
                <input type="checkbox" checked={harvestInsights} onChange={() => setHarvestInsights(!harvestInsights)} className="sr-only peer" />
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all ${harvestInsights ? 'translate-x-6' : ''}`} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest">Auto-Archive</span>
            </label>
          </div>
        </div>

        {/* 5. Minimalist Sidebar */}
        <div className="space-y-8">

          {/* Simple Status Tracker */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-8">Process Tracker</h3>
            <div className="space-y-8 relative">
              <div className="absolute left-[11px] top-4 bottom-4 w-px bg-gray-100" />
              {[
                { label: 'Data Extraction', status: 'done' },
                { label: 'Technical Estimation', status: 'done' },
                { label: approval.label, status: 'current' },
              ].map((step, i) => (
                <div key={i} className="relative flex items-center gap-4">
                  <div className={`w-5.5 h-5.5 rounded-full z-10 flex items-center justify-center border-4 border-white shadow-sm font-bold text-[9px] ${step.status === 'done' ? 'bg-emerald-500 text-white' :
                    step.status === 'current' ? 'bg-indigo-600 text-white animate-pulse' : 'bg-gray-100 text-gray-400'
                    }`}>
                    {step.status === 'done' ? <CheckCircle2 className="w-3 h-3" /> : (i + 1)}
                  </div>
                  <p className={`text-xs font-semibold ${step.status === 'done' ? 'text-gray-900' : 'text-gray-500'}`}>{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Precision HUD (Simple) */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logic Confidence</span>
              <p className="text-xl font-semibold text-gray-900">{confidenceScore}%</p>
            </div>
            <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
              <div className="h-full bg-emerald-500 rounded-full w-[94.2%]" />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-4 text-gray-400">
              <Calculator className="w-4 h-4" />
              <p className="text-[11px] font-medium leading-relaxed italic">Base logic inheritied from Baseline 192A. Policy compliant for European territories.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
