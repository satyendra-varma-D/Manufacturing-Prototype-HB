import { useState } from 'react';
import { Download, Calendar, TrendingUp, DollarSign, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const performanceData = [
  { month: 'Jan', rfqs: 42, quotations: 38, won: 28, revenue: 3200000 },
  { month: 'Feb', rfqs: 38, quotations: 35, won: 26, revenue: 2900000 },
  { month: 'Mar', rfqs: 45, quotations: 41, won: 32, revenue: 3800000 },
  { month: 'Apr', rfqs: 12, quotations: 10, won: 7, revenue: 950000 },
];

const userPerformance = [
  { user: 'Standard User', rfqs: 45, quotations: 40, conversionRate: 75, avgValue: 125000 },
  { user: 'Manager User', rfqs: 28, quotations: 25, conversionRate: 82, avgValue: 185000 },
  { user: 'Admin User', rfqs: 22, quotations: 20, conversionRate: 71, avgValue: 95000 },
];

const customerInsights = [
  { customer: 'TechCorp Industries', rfqs: 24, won: 18, value: 1250000, conversionRate: 75 },
  { customer: 'Manufacturing Pro Inc', rfqs: 42, won: 29, value: 2100000, conversionRate: 69 },
  { customer: 'Electronics Solutions Ltd', rfqs: 15, won: 12, value: 680000, conversionRate: 80 },
];

export default function Reports() {
  const [dateRange, setDateRange] = useState('ytd');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Performance insights and metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="mtd">Month to Date</option>
            <option value="qtd">Quarter to Date</option>
            <option value="ytd">Year to Date</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-bold text-xs shadow-sm">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total RFPs', value: '137', icon: TrendingUp, color: 'primary' },
          { label: 'Win Rate', value: '73.2%', icon: Target, color: 'emerald' },
          { label: 'Total Revenue', value: '$10.9M', icon: DollarSign, color: 'primary' },
          { label: 'Avg Deal Size', value: '$134K', icon: Calendar, color: 'primary' },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{metric.label}</p>
                <Icon className={`w-5 h-5 ${metric.color === 'primary' ? 'text-primary' : 'text-emerald-500'}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="var(--primary)" name="Revenue ($)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* RFP Performance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">RFP Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rfqs" fill="var(--primary)" name="RFPs" radius={[4, 4, 0, 0]} />
              <Bar dataKey="quotations" fill="var(--primary)" opacity={0.6} name="Quotations" radius={[4, 4, 0, 0]} />
              <Bar dataKey="won" fill="#10b981" name="Won" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">RFPs</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quotations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversion Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Deal Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userPerformance.map((user) => (
                <tr key={user.user}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.user}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.rfqs}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.quotations}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${user.conversionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-900">{user.conversionRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">${(user.avgValue / 1000).toFixed(0)}K</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Customers by Value</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total RFPs</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Won</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customerInsights.map((customer) => (
                <tr key={customer.customer}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.rfqs}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.won}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${(customer.value / 1000).toFixed(0)}K</td>
                  <td className="px-6 py-4 text-sm text-green-600">{customer.conversionRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
