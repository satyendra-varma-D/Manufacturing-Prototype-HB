import { Link, useParams, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Edit, FileText, CheckCircle, XCircle, Sparkles, ExternalLink } from 'lucide-react';
import { mockRFQs } from '../../data/mockData';
import StatusBadge from '../shared/StatusBadge';

export default function RFQDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const rfq = mockRFQs.find(r => r.id === id);

  if (!rfq) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">RFQ not found</p>
        <Link to="/rfqs" className="text-indigo-600 hover:text-indigo-700 mt-4 inline-block">
          Back to RFQs
        </Link>
      </div>
    );
  }

  const canEdit = user?.role === 'user' || user?.role === 'admin';
  const canApprove = user?.role === 'manager' || user?.role === 'admin';
  const canConvert = rfq.status === 'approved' && (user?.role === 'user' || user?.role === 'admin');

  const handleApprove = () => {
    alert('RFQ approved successfully');
  };

  const handleReject = () => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      alert('RFQ rejected');
    }
  };

  const handleConvert = () => {
    navigate('/quotations/new', { state: { rfqId: rfq.id } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/rfqs" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{rfq.name}</h1>
            <p className="text-gray-600 mt-1">{rfq.id} • Version {rfq.version}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {rfq.status === 'draft' && canEdit && (
            <Link
              to={`/rfqs/${rfq.id}/extract`}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Sparkles className="w-4 h-4" />
              AI Extract
            </Link>
          )}
          {canConvert && (
            <button
              onClick={handleConvert}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Convert to Quote
            </button>
          )}
          {rfq.status === 'under_review' && canApprove && (
            <>
              <button
                onClick={handleReject}
                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
            </>
          )}
          {canEdit && (
            <Link
              to={`/rfqs/${rfq.id}/edit`}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Customer</p>
                <p className="text-sm font-medium text-gray-900 mt-1">{rfq.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <div className="mt-1">
                  <StatusBadge status={rfq.status} />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date Created</p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {new Date(rfq.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Owner</p>
                <p className="text-sm font-medium text-gray-900 mt-1">{rfq.owner}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Value</p>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  ${rfq.value.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Source</p>
                <p className="text-sm font-medium text-gray-900 mt-1 capitalize">{rfq.source}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Confidence Score</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${rfq.confidenceScore * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.round(rfq.confidenceScore * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {rfq.description && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-sm text-gray-700">{rfq.description}</p>
            </div>
          )}

          {/* Extracted Data */}
          {rfq.extractedData && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Extracted Items</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Part Number</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {rfq.extractedData.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.partNumber}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.description}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">${item.unitPrice}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">${item.totalPrice.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {item.confidenceScore ? `${Math.round(item.confidenceScore * 100)}%` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {rfq.extractedData.requirements && rfq.extractedData.requirements.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {rfq.extractedData.requirements.map((req, idx) => (
                      <li key={idx} className="text-sm text-gray-700">{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {rfq.extractedData.deadline && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <strong>Deadline:</strong> {new Date(rfq.extractedData.deadline).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Comments */}
          {rfq.comments && rfq.comments.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity & Comments</h2>
              <div className="space-y-4">
                {rfq.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-indigo-600">
                        {comment.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.date).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Documents */}
          {rfq.documents && rfq.documents.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
              <div className="space-y-2">
                {rfq.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-700 flex-1">{doc}</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar Jobs */}
          {rfq.similarJobs && rfq.similarJobs.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h2>
              <div className="space-y-2">
                {rfq.similarJobs.map((jobId) => (
                  <Link
                    key={jobId}
                    to={`/knowledge/${jobId}`}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                  >
                    <span className="text-sm font-medium text-indigo-600">{jobId}</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
