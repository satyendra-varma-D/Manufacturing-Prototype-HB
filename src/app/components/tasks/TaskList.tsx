import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { CheckSquare, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { mockTasks } from '../../data/mockData';
import StatusBadge from '../shared/StatusBadge';

export default function TaskList() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'review' | 'approval' | 'rework'>('all');

  const myTasks = mockTasks.filter(task => task.assigneeId === user?.id);

  const filteredTasks = myTasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesType = typeFilter === 'all' || task.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'review':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'rework':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <CheckSquare className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-orange-100 text-orange-700';
      case 'low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-600 mt-1">{filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} assigned to you</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="review">Review</option>
              <option value="approval">Approval</option>
              <option value="rework">Rework</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
          const linkPath = task.relatedType === 'rfq' ? `/rfqs/${task.relatedId}` : `/quotations/${task.relatedId}`;

          return (
            <div key={task.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    {getTaskIcon(task.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="capitalize">{task.type.replace('_', ' ')}</span>
                          <span>•</span>
                          <Link
                            to={linkPath}
                            className="text-indigo-600 hover:text-indigo-700"
                          >
                            {task.relatedId}
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <StatusBadge status={task.status} />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-sm">
                      <div>
                        <span className="text-gray-600">Due: </span>
                        <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                          {new Date(task.dueDate).toLocaleDateString()}
                          {isOverdue && <span className="ml-1">(Overdue)</span>}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Created: </span>
                        <span className="text-gray-900">{new Date(task.createdDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {task.status !== 'completed' && (
                      <div className="flex items-center gap-2 mt-4">
                        <Link
                          to={linkPath}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                        >
                          Review & Action
                        </Link>
                        {task.status === 'pending' && (
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                            Start Task
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No tasks found</p>
          <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
        </div>
      )}
    </div>
  );
}
