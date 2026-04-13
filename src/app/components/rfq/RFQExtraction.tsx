import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import {
  ArrowLeft, Sparkles, Save, BrainCircuit, CheckCircle2,
  ChevronRight, ShieldCheck, Target, Activity,
  FileText, Check, X, RefreshCw,
  AlertTriangle, Database,
  Building2, Hash, DollarSign, Package, Ruler,
  Calendar, Shield
} from 'lucide-react';
import { mockRFQs, mockCustomers } from '../../data/mockData';

interface FieldRow {
  id: string;
  fieldName: string;
  extractedValue: string;
  aiSuggestion: string;
  confidence: number;
  status: 'match' | 'enhanced' | 'new';
}

export default function RFQExtraction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rfq = mockRFQs.find(r => r.id === id);
  const [isExtracting, setIsExtracting] = useState(false);
  const [acceptedFields, setAcceptedFields] = useState<Set<string>>(new Set());
  const [rejectedFields, setRejectedFields] = useState<Set<string>>(new Set());

  if (!rfq) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-gray-300 mb-3" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">RFP not found</p>
        <Link to="/rfqs" className="text-primary text-xs font-bold mt-3 hover:underline">Return</Link>
      </div>
    );
  }

  const customer = mockCustomers.find(c => c.id === rfq.customerId);
  const firstItem = rfq.extractedData?.items?.[0];

  const fieldRows: FieldRow[] = [
    { id: 'name', fieldName: 'Project Name', extractedValue: rfq.name, aiSuggestion: rfq.name, confidence: 96, status: 'match' },
    { id: 'client', fieldName: 'Client Entity', extractedValue: rfq.customer, aiSuggestion: customer?.company || rfq.customer, confidence: 98, status: 'enhanced' },
    { id: 'value', fieldName: 'Estimated Value', extractedValue: `€${(rfq.value || 0).toLocaleString()}`, aiSuggestion: `€${(rfq.value || 0).toLocaleString()}`, confidence: 87, status: 'enhanced' },
    { id: 'part', fieldName: 'Part Number', extractedValue: firstItem?.partNumber || '—', aiSuggestion: firstItem?.partNumber || 'BF-6425', confidence: 99, status: 'match' },
    { id: 'desc', fieldName: 'Part Description', extractedValue: firstItem?.description || '—', aiSuggestion: firstItem?.description || 'Rectangle Bolt Flange (6x4)', confidence: 94, status: 'match' },
    { id: 'qty', fieldName: 'Quantity', extractedValue: firstItem ? firstItem.quantity.toLocaleString() : '—', aiSuggestion: firstItem ? firstItem.quantity.toLocaleString() : '1,500', confidence: 97, status: 'match' },
    { id: 'unit', fieldName: 'Unit Price', extractedValue: firstItem ? `$${firstItem.unitPrice}` : '—', aiSuggestion: firstItem ? `$${firstItem.unitPrice}` : '$323', confidence: 85, status: 'enhanced' },
    { id: 'dims', fieldName: 'Dimensions', extractedValue: '6.000" x 4.000"', aiSuggestion: '6.000" x 4.000" (Industrial Grade)', confidence: 98, status: 'enhanced' },
    { id: 'material', fieldName: 'Material Spec', extractedValue: '—', aiSuggestion: 'SS316L / EN 1.4404', confidence: 89, status: 'new' },
    { id: 'deadline', fieldName: 'Deadline', extractedValue: rfq.extractedData?.deadline || '—', aiSuggestion: rfq.extractedData?.deadline || '2026-05-15', confidence: 91, status: 'match' },
  ];

  const handleExtract = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setAcceptedFields(new Set(fieldRows.filter(f => f.confidence >= 90).map(f => f.id)));
    }, 1200);
  };

  const handleAccept = (fid: string) => {
    setAcceptedFields(prev => new Set(prev).add(fid));
    setRejectedFields(prev => { const n = new Set(prev); n.delete(fid); return n; });
  };
  const handleReject = (fid: string) => {
    setRejectedFields(prev => new Set(prev).add(fid));
    setAcceptedFields(prev => { const n = new Set(prev); n.delete(fid); return n; });
  };
  const handleAcceptAll = () => {
    setAcceptedFields(new Set(fieldRows.map(f => f.id)));
    setRejectedFields(new Set());
  };

  const getStatusBadge = (s: FieldRow['status']) => {
    if (s === 'match') return { label: 'Match', cls: 'text-emerald-600 bg-emerald-50 border-emerald-100' };
    if (s === 'enhanced') return { label: 'Enhanced', cls: 'text-primary bg-secondary border-primary/20' };
    return { label: 'AI New', cls: 'text-amber-600 bg-amber-50 border-amber-100' };
  };

  const confColor = (c: number) => c >= 95 ? 'bg-emerald-500' : c >= 85 ? 'bg-primary' : c >= 75 ? 'bg-amber-500' : 'bg-gray-400';
  const avgConf = Math.round(fieldRows.reduce((s, f) => s + f.confidence, 0) / fieldRows.length);

  return (
    <div className="max-w-[1400px] mx-auto space-y-5 pb-16 pt-2 px-4">

      {/* Compact Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/rfqs/${id}`} className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-900 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <nav className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
              <span>RFPs</span><ChevronRight className="w-2.5 h-2.5" /><span>AI Extraction</span>
            </nav>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              AI Field Suggestions
              <span className="px-2 py-0.5 bg-secondary text-primary text-[9px] font-mono font-bold rounded border border-primary/20">{rfq.id}</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExtract} disabled={isExtracting}
            className="flex items-center gap-1.5 px-4 py-2 bg-secondary text-primary border border-primary/20 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all disabled:opacity-50">
            <RefreshCw className={`w-3 h-3 ${isExtracting ? 'animate-spin' : ''}`} />
            {isExtracting ? 'Running...' : 'Re-Extract'}
          </button>
          <button onClick={handleAcceptAll}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
            <CheckCircle2 className="w-3 h-3" /> Accept All
          </button>
          <button onClick={() => navigate(`/rfqs/${id}`)}
            className="flex items-center gap-1.5 px-5 py-2 bg-primary text-white rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-md shadow-primary/20 active:scale-95">
            <Save className="w-3 h-3" /> Save
          </button>
        </div>
      </div>

      {/* Compact Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Fields', value: fieldRows.length, icon: BrainCircuit, bg: 'bg-primary/10', ic: 'text-primary' },
          { label: 'Accepted', value: `${acceptedFields.size}/${fieldRows.length}`, icon: CheckCircle2, bg: 'bg-emerald-50', ic: 'text-emerald-500' },
          { label: 'Avg Confidence', value: `${avgConf}%`, icon: Target, bg: 'bg-secondary', ic: 'text-primary' },
          { label: 'AI Generated', value: fieldRows.filter(f => f.status === 'new').length, icon: Sparkles, bg: 'bg-amber-50', ic: 'text-amber-500' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3 shadow-sm">
            <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center`}>
              <s.icon className={`w-4 h-4 ${s.ic}`} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
              <p className="text-lg font-bold text-gray-900 leading-none mt-0.5">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden w-1/2">
        {/* Table Header Bar */}
        <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Extraction Comparison</span>
            <span className="text-[10px] text-gray-400 font-medium ml-2">{rfq.name}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 border border-emerald-100 rounded">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest">AI Active</span>
          </div>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-12 gap-0 px-6 py-2 bg-[#fafbfc] border-b border-gray-100 text-[8px] font-bold text-gray-400 uppercase tracking-[0.15em]">
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Field Name</div>
          <div className="col-span-3">Extracted Value</div>
          <div className="col-span-3">AI Suggested Value</div>
          <div className="col-span-1 text-center">Conf.</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Rows */}
        {fieldRows.map((field) => {
          const isAccepted = acceptedFields.has(field.id);
          const isRejected = rejectedFields.has(field.id);
          const badge = getStatusBadge(field.status);

          return (
            <div
              key={field.id}
              className={`grid grid-cols-12 gap-0 px-6 py-2.5 border-b border-gray-50 items-center transition-all hover:bg-gray-50/30 ${
                isAccepted ? 'bg-emerald-50/20' : isRejected ? 'opacity-40' : ''
              }`}
            >
              {/* Status */}
              <div className="col-span-1">
                <span className={`inline-flex px-1.5 py-0.5 rounded border text-[7px] font-bold uppercase tracking-wider ${badge.cls}`}>
                  {badge.label}
                </span>
              </div>

              {/* Field Name */}
              <div className="col-span-2">
                <span className="text-[11px] font-bold text-gray-900">{field.fieldName}</span>
              </div>

              {/* Extracted Value */}
              <div className="col-span-3 pr-3">
                <div className="px-2.5 py-1.5 bg-gray-50 border border-gray-100 rounded-md">
                  <p className="text-[11px] font-medium text-gray-600 truncate">{field.extractedValue}</p>
                </div>
              </div>

              {/* AI Suggested Value */}
              <div className="col-span-3 pr-3">
                <div className={`px-2.5 py-1.5 rounded-md border ${
                  field.status === 'new' ? 'bg-amber-50/50 border-amber-100' :
                  field.status === 'enhanced' ? 'bg-secondary border-primary/10' :
                  'bg-white border-gray-100'
                }`}>
                  <p className="text-[11px] font-semibold text-gray-900 truncate">{field.aiSuggestion}</p>
                </div>
              </div>

              {/* Confidence */}
              <div className="col-span-1 flex flex-col items-center gap-0.5">
                <span className="text-[10px] font-bold text-gray-900">{field.confidence}%</span>
                <div className="w-8 h-0.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${confColor(field.confidence)}`} style={{ width: `${field.confidence}%` }}></div>
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-1.5">
                {isAccepted ? (
                  <span className="flex items-center gap-1 px-2 py-1 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded text-[8px] font-bold uppercase">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Accepted
                  </span>
                ) : isRejected ? (
                  <button onClick={() => handleAccept(field.id)}
                    className="px-2 py-1 bg-white border border-gray-200 text-gray-400 rounded text-[8px] font-bold uppercase hover:text-primary transition-all">
                    Undo
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleAccept(field.id)}
                      className="flex items-center gap-1 px-2 py-1 bg-primary text-white rounded text-[8px] font-bold uppercase hover:bg-primary/90 transition-all active:scale-95">
                      <Check className="w-2.5 h-2.5" /> Accept
                    </button>
                    <button onClick={() => handleReject(field.id)}
                      className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 text-gray-400 rounded text-[8px] font-bold uppercase hover:text-rose-500 transition-all">
                      <X className="w-2.5 h-2.5" /> Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Database className="w-3 h-3" />
              <span className="text-[9px] font-bold uppercase tracking-widest">{rfq.documents?.[0] || 'Email'}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-primary">
            <Activity className="w-3 h-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Engine v4.1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
