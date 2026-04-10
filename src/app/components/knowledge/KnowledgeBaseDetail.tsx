import { Link, useParams } from 'react-router';
import { ArrowLeft, Tag, DollarSign, Calendar, Building } from 'lucide-react';
import { mockKnowledgeBase } from '../../data/mockData';

export default function KnowledgeBaseDetail() {
  const { id } = useParams();
  const item = mockKnowledgeBase.find(k => k.id === id);

  if (!item) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Knowledge base item not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/knowledge" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{item.title}</h1>
          <p className="text-gray-600 mt-1">{item.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="text-sm text-gray-900 mt-1">{item.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Category
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">{item.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Project Value
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">${item.value.toLocaleString()}</p>
                </div>
                {item.customer && (
                  <div>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Customer
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{item.customer}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Completed
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {new Date(item.completedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {item.bom && item.bom.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Bill of Materials</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Part Number</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {item.bom.map((bomItem) => (
                      <tr key={bomItem.id}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{bomItem.partNumber}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{bomItem.description}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{bomItem.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">${bomItem.unitPrice}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">${bomItem.totalPrice.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {item.documents && item.documents.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
              <div className="space-y-2">
                {item.documents.map((doc, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <p className="text-sm text-gray-700">{doc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
