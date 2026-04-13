import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { 
  ArrowLeft, Save, Building2, MapPin, 
  Database, ShieldCheck, Zap, Layers, 
  Info, Sparkles, ChevronRight, FileCode,
  CheckCircle2, AlertCircle, Clock, Activity,
  BrainCircuit, Check, ArrowRight, Target,
  RefreshCw, ThumbsUp, ThumbsDown, Copy
} from 'lucide-react';
import { mockRFQs, mockCustomers } from '../../data/mockData';

// AI Suggestion data with field-wise recommendations
const AI_SUGGESTIONS = [
  {
    id: 'name',
    field: 'RFP Name',
    currentValue: '',
    aiSuggestion: 'Industrial Bolt Flange - Batch 2026',
    confidence: 96,
    source: 'Email Subject + Drawing OCR',
    reasoning: 'Derived from email subject line and drawing title block metadata.',
  },
  {
    id: 'customer',
    field: 'Client Entity',
    currentValue: '',
    aiSuggestion: 'TechCorp Industries Inc.',
    confidence: 98,
    source: 'Sender Domain Match',
    reasoning: 'Email sender domain matched to existing customer record CUST-001.',
  },
  {
    id: 'source',
    field: 'Capture Protocol',
    currentValue: '',
    aiSuggestion: 'Email',
    confidence: 100,
    source: 'System Detection',
    reasoning: 'RFP was initiated from the mail intelligence pipeline.',
  },
  {
    id: 'value',
    field: 'Commercial Value',
    currentValue: '',
    aiSuggestion: '€485,000',
    confidence: 87,
    source: 'Historical Baseline KB-2025-045',
    reasoning: 'Estimated from similar projects in the knowledge base. Munich Hub extension was €420k.',
  },
  {
    id: 'description',
    field: 'Technical Scope',
    currentValue: '',
    aiSuggestion: 'Precision manufacturing of industrial bolt flanges. Specs: 6.000" x 4.000" plate with 4x bolt hole pattern. Corner radius 0.25". Material: Reinforced Industrial Grade.',
    confidence: 94,
    source: 'Drawing Extraction + BOM',
    reasoning: 'Auto-generated from extracted drawing dimensions and BOM parameters.',
  },
  {
    id: 'delivery',
    field: 'Delivery Timeline',
    currentValue: '',
    aiSuggestion: '8-10 Weeks',
    confidence: 82,
    source: 'Production Capacity Model',
    reasoning: 'Based on current shop floor utilization (78%) and material lead times.',
  },
  {
    id: 'priority',
    field: 'Priority Level',
    currentValue: '',
    aiSuggestion: 'High',
    confidence: 91,
    source: 'Email Urgency Analysis',
    reasoning: 'Email contains urgency indicators: "earliest availability", "time-sensitive".',
  },
  {
    id: 'material',
    field: 'Material Grade',
    currentValue: '',
    aiSuggestion: 'SS316L / EN 1.4404',
    confidence: 89,
    source: 'Drawing Notes + Spec Sheet',
    reasoning: 'Extracted from drawing material callout and cross-referenced with spec database.',
  },
];

export default function RFQForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const existingRFQ = isEdit ? mockRFQs.find(r => r.id === id) : null;

  const [formData, setFormData] = useState({
    name: existingRFQ?.name || 'Industrial Bolt Flange - Batch 2026',
    customerId: existingRFQ?.customerId || 'CUST-001',
    source: existingRFQ?.source || 'email',
    description: existingRFQ?.description || 'Precision manufacturing of industrial bolt flanges. Specs: 6.000" x 4.000" plate with 4x bolt hole pattern. Corner radius 0.25". Material: Reinforced Industrial Grade.',
    estimatedValue: existingRFQ?.value || 485000,
    delivery: '8-10 Weeks',
    priority: 'High',
    material: 'SS316L / EN 1.4404',
  });

  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set());
  const [dismissedSuggestions, setDismissedSuggestions] = useState<Set<string>>(new Set());

  const handleApplySuggestion = (suggestionId: string) => {
    const suggestion = AI_SUGGESTIONS.find(s => s.id === suggestionId);
    if (!suggestion) return;

    switch (suggestionId) {
      case 'name':
        setFormData(prev => ({ ...prev, name: 'Industrial Bolt Flange - Batch 2026' }));
        break;
      case 'customer':
        setFormData(prev => ({ ...prev, customerId: 'CUST-001' }));
        break;
      case 'source':
        setFormData(prev => ({ ...prev, source: 'email' }));
        break;
      case 'value':
        setFormData(prev => ({ ...prev, estimatedValue: 485000 }));
        break;
      case 'description':
        setFormData(prev => ({ ...prev, description: suggestion.aiSuggestion }));
        break;
      case 'delivery':
        setFormData(prev => ({ ...prev, delivery: '8-10 Weeks' }));
        break;
      case 'priority':
        setFormData(prev => ({ ...prev, priority: 'High' }));
        break;
      case 'material':
        setFormData(prev => ({ ...prev, material: 'SS316L / EN 1.4404' }));
        break;
    }
    setAppliedSuggestions(prev => new Set(prev).add(suggestionId));
    setDismissedSuggestions(prev => {
      const next = new Set(prev);
      next.delete(suggestionId);
      return next;
    });
  };

  const handleDismissSuggestion = (suggestionId: string) => {
    setDismissedSuggestions(prev => new Set(prev).add(suggestionId));
    setAppliedSuggestions(prev => {
      const next = new Set(prev);
      next.delete(suggestionId);
      return next;
    });
  };

  const handleApplyAll = () => {
    AI_SUGGESTIONS.forEach(s => {
      if (!dismissedSuggestions.has(s.id)) {
        handleApplySuggestion(s.id);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/rfqs');
  };

  const appliedCount = appliedSuggestions.size;
  const totalCount = AI_SUGGESTIONS.length;
  const avgConfidence = Math.round(AI_SUGGESTIONS.reduce((sum, s) => sum + s.confidence, 0) / totalCount);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (confidence >= 85) return 'text-primary bg-secondary border-primary/20';
    if (confidence >= 75) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-gray-500 bg-gray-50 border-gray-200';
  };

  const getConfidenceBarColor = (confidence: number) => {
    if (confidence >= 95) return 'bg-emerald-500';
    if (confidence >= 85) return 'bg-primary';
    if (confidence >= 75) return 'bg-amber-500';
    return 'bg-gray-400';
  };

  return (
    <div className="max-w-[1500px] mx-auto space-y-8 pb-32 pt-4 px-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center gap-6">
           <Link to="/rfqs" className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-900 transition-all">
             <ArrowLeft className="w-4 h-4" />
           </Link>
           <div className="space-y-1">
              <nav className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                 <span>RFP Protocol</span>
                 <ChevronRight className="w-3 h-3" />
                 <span>Creation Engine</span>
              </nav>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                 {isEdit ? 'Refine Project Scope' : 'Initialize New RFP'}
                 {id && (
                   <span className="px-3 py-1 bg-secondary text-primary text-[10px] font-mono font-bold rounded-md border border-primary/20 uppercase tracking-tighter shadow-sm">
                     REF ID: {id}
                   </span>
                 )}
              </h1>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <button
             type="button"
             onClick={handleApplyAll}
             className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-primary border border-primary/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
           >
             <Sparkles className="w-3.5 h-3.5" /> Apply All AI Suggestions
           </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* LEFT: AI Suggestions Table */}
        <div className="col-span-5 space-y-6">

          {/* AI Summary Header */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 bg-gradient-to-r from-primary/5 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/20">
                  <BrainCircuit className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">AI Field Suggestions</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                    {appliedCount}/{totalCount} Applied • Avg {avgConfidence}% Confidence
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-lg">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">AI Active</span>
              </div>
            </div>

            {/* Suggestions Table */}
            <div className="divide-y divide-gray-50">
              {AI_SUGGESTIONS.map((suggestion) => {
                const isApplied = appliedSuggestions.has(suggestion.id);
                const isDismissed = dismissedSuggestions.has(suggestion.id);

                return (
                  <div
                    key={suggestion.id}
                    className={`px-6 py-4 transition-all hover:bg-gray-50/50 ${isDismissed ? 'opacity-40' : ''} ${isApplied ? 'bg-emerald-50/30' : ''}`}
                  >
                    {/* Row header: field name + confidence */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {isApplied && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        )}
                        <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">{suggestion.field}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${getConfidenceBarColor(suggestion.confidence)}`}
                              style={{ width: `${suggestion.confidence}%` }}
                            ></div>
                          </div>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getConfidenceColor(suggestion.confidence)}`}>
                            {suggestion.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* AI suggested value */}
                    <div className="bg-white border border-gray-100 rounded-lg px-3 py-2.5 mb-2">
                      <p className="text-[13px] font-semibold text-gray-800 leading-snug">
                        {suggestion.aiSuggestion}
                      </p>
                    </div>

                    {/* Source + reasoning */}
                    <div className="flex items-start gap-1.5 mb-3">
                      <Info className="w-3 h-3 text-gray-300 mt-0.5 flex-shrink-0" />
                      <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                        <span className="font-bold text-gray-500">{suggestion.source}</span> — {suggestion.reasoning}
                      </p>
                    </div>

                    {/* Actions */}
                    {!isDismissed && (
                      <div className="flex items-center gap-2">
                        {!isApplied ? (
                          <>
                            <button
                              onClick={() => handleApplySuggestion(suggestion.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95 shadow-sm"
                            >
                              <Check className="w-3 h-3" /> Apply
                            </button>
                            <button
                              onClick={() => handleDismissSuggestion(suggestion.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-400 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:text-gray-600 hover:border-gray-300 transition-all"
                            >
                              <ThumbsDown className="w-3 h-3" /> Dismiss
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg text-[9px] font-bold uppercase tracking-widest">
                            <CheckCircle2 className="w-3 h-3" /> Applied to Form
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Integrity Check Passed</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Database className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">KB-2025-045</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Main Form */}
        <div className="col-span-7">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">RFP Internal Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-primary/40 transition-all outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Target Client Entity</label>
                    <select
                      value={formData.customerId}
                      onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-primary/40 transition-all outline-none"
                      required
                    >
                      {mockCustomers.map((customer) => (
                        <option key={customer.id} value={customer.id}>{customer.company}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Capture Protocol</label>
                    <div className="flex gap-4">
                       {['email', 'portal'].map((source) => (
                          <button 
                            key={source} type="button" 
                            onClick={() => setFormData({ ...formData, source })}
                            className={`flex-1 py-3 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all ${formData.source === source ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white border-gray-200 text-gray-400 hover:border-primary/20'}`}
                          >
                             {source}
                          </button>
                       ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Commercial Estimation</label>
                    <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-300">€</span>
                       <input
                         type="number"
                         value={formData.estimatedValue}
                         onChange={(e) => setFormData({ ...formData, estimatedValue: parseFloat(e.target.value) })}
                         className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-primary/40 transition-all outline-none"
                       />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Delivery Timeline</label>
                    <input
                      type="text"
                      value={formData.delivery}
                      onChange={(e) => setFormData({ ...formData, delivery: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-primary/40 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Priority Level</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-primary/40 transition-all outline-none"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Material Grade</label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-primary/40 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Technical Scope Breakdown</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-4 bg-gray-50 border border-transparent rounded-xl text-sm font-medium text-gray-700 leading-relaxed focus:bg-white focus:border-primary/40 transition-all outline-none"
                    rows={5}
                  />
                </div>
             </div>
              <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Protocol Core v4.1</span>
                    <div className="w-px h-3 bg-gray-200"></div>
                    <div className="flex items-center gap-2 text-primary group">
                       <Activity className="w-3.5 h-3.5 group-hover:animate-pulse" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Session Ready</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-8">
                    <button 
                      type="button"
                      onClick={() => navigate('/rfqs')}
                      className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-12 py-3.5 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/10 active:scale-95 flex items-center gap-2"
                    >
                      Submit
                    </button>
                 </div>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}
