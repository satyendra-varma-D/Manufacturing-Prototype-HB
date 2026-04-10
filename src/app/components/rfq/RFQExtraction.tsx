import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, FileText, Sparkles, Save, Edit2 } from 'lucide-react';
import { mockRFQs } from '../../data/mockData';

export default function RFQExtraction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rfq = mockRFQs.find(r => r.id === id);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedItems, setExtractedItems] = useState(rfq?.extractedData?.items || []);

  if (!rfq) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">RFP not found</p>
      </div>
    );
  }

  const handleExtract = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      alert('AI extraction completed successfully');
    }, 2000);
  };

  const handleSave = () => {
    alert('Extracted data saved successfully');
    navigate(`/rfqs/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/rfqs/${id}`} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Document Extraction</h1>
            <p className="text-gray-600 mt-1">{rfq.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExtract}
            disabled={isExtracting}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {isExtracting ? 'Extracting...' : 'Run AI Extraction'}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Save className="w-4 h-4" />
            Save & Continue
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Viewer */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Source Document</h2>
          </div>
          <div className="bg-gray-100 rounded-lg p-8 min-h-[600px] flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Document Preview</p>
              <p className="text-sm text-gray-500 mt-2">
                {rfq.documents?.[0] || 'No document attached'}
              </p>
            </div>
          </div>
        </div>

        {/* Extracted Data Editor */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">Extracted Data</h2>
            </div>
            {extractedItems.length > 0 && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                AI Confidence: {Math.round(rfq.confidenceScore * 100)}%
              </span>
            )}
          </div>

          {extractedItems.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No data extracted yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Click "Run AI Extraction" to analyze the document
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {extractedItems.map((item, index) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-gray-900">Item {index + 1}</span>
                    <div className="flex items-center gap-2">
                      {item.confidenceScore && (
                        <span className="text-xs text-gray-600">
                          {Math.round(item.confidenceScore * 100)}% confidence
                        </span>
                      )}
                      <button className="p-1 text-gray-400 hover:text-indigo-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Part Number</label>
                      <input
                        type="text"
                        value={item.partNumber}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Quantity</label>
                      <input
                        type="number"
                        value={item.quantity}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-gray-600 mb-1">Description</label>
                      <input
                        type="text"
                        value={item.description}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Unit Price</label>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">$</span>
                        <input
                          type="number"
                          value={item.unitPrice}
                          className="w-full pl-6 pr-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Total Price</label>
                      <div className="px-3 py-2 text-sm bg-gray-50 rounded font-medium text-gray-900">
                        ${item.totalPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Requirements */}
              {rfq.extractedData?.requirements && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {rfq.extractedData.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-indigo-600 mt-0.5">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Deadline */}
              {rfq.extractedData?.deadline && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Deadline</h3>
                  <input
                    type="date"
                    value={rfq.extractedData.deadline}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
