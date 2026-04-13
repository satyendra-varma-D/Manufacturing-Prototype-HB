import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Filter, Mail as MailIcon, Paperclip, Clock, Star, Inbox, Archive, Trash2, ChevronRight } from 'lucide-react';
import { mockMails } from '../../data/mockMails';
import { MailStatus } from '../../types';

export default function MailList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<MailStatus | 'all'>('all');
  const [mails] = useState(mockMails);

  const filteredMails = mails.filter(mail => {
    const matchesSearch = mail.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mail.from.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mail.from.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || mail.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* 1. Breadcrumb Navigation */}
      <div className="py-2">
        <nav className="flex items-center gap-2 text-[13px] font-medium text-gray-400">
           <span className="hover:text-gray-900 cursor-pointer">Home</span>
           <ChevronRight className="w-3.5 h-3.5" />
           <span className="text-gray-900">Mails</span>
        </nav>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mails</h1>
          <p className="text-[13px] text-gray-500 mt-1">{filteredMails.length} message{filteredMails.length !== 1 ? 's' : ''} found in the system</p>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by subject, sender, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button 
              onClick={() => setStatusFilter('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'all' ? 'bg-secondary text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Inbox className="w-4 h-4" />
              All
            </button>
            <button 
              onClick={() => setStatusFilter('unread')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'unread' ? 'bg-secondary text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <MailIcon className="w-4 h-4" />
              Unread
            </button>
            <button 
              onClick={() => setStatusFilter('archived')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === 'archived' ? 'bg-secondary text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Archive className="w-4 h-4" />
              Archived
            </button>
          </div>
        </div>
      </div>

      {/* Mail List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="divide-y divide-gray-100">
          {filteredMails.length > 0 ? (
            filteredMails.map((mail) => (
              <Link
                key={mail.id}
                to={`/mails/${mail.id}`}
                className={`flex items-center gap-4 p-4 hover:bg-secondary/30 transition-all cursor-pointer group ${
                  mail.status === 'unread' ? 'bg-white border-l-4 border-l-primary' : 'bg-gray-50/30'
                }`}
              >
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    mail.status === 'unread' ? 'bg-secondary text-primary' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <MailIcon className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className={`text-sm truncate ${mail.status === 'unread' ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                      {mail.from.name}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      {mail.attachments && mail.attachments.length > 0 && (
                        <Paperclip className="w-3.5 h-3.5" />
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(mail.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <h3 className={`text-sm mb-1 truncate ${mail.status === 'unread' ? 'font-semibold text-primary' : 'text-gray-600'}`}>
                    {mail.subject}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {mail.body}
                  </p>
                </div>

                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1">
                    {mail.isHighPriority && (
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    )}
                    <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-20 text-center bg-gray-50/50">
              <MailIcon className="mx-auto w-12 h-12 text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No mails found matching your criteria</p>
              <button 
                onClick={() => {setSearchQuery(''); setStatusFilter('all');}}
                className="mt-4 text-primary hover:text-primary/80 text-sm font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-gray-500 font-medium">
          Showing 1 to {filteredMails.length} of {filteredMails.length} messages
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors" disabled>
            Previous
          </button>
          <button className="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
