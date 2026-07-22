import { BarChart2, TrendingUp, Users, Database, Clock } from 'lucide-react';

function Analytics() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">Analytics Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Monitor usage, storage, and agent performance.</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Queries', value: '1,284', trend: '+12.5%', up: true, icon: BarChart2 },
          { label: 'Storage Used', value: '45.2 MB', trend: '+2.1%', up: true, icon: Database },
          { label: 'Avg. Response Time', value: '1.2s', trend: '-0.3s', up: true, icon: Clock },
          { label: 'Active Users', value: '1', trend: '0%', up: true, icon: Users },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</span>
              <stat.icon className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-end gap-3">
              <span className="text-2xl font-bold text-gray-900 leading-none">{stat.value}</span>
              <span className={`text-xs font-medium mb-0.5 ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col min-h-[300px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Query Volume (Last 30 Days)</h3>
            <select className="text-sm bg-gray-50 border border-gray-200 rounded-md px-2 py-1 outline-none">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="flex-1 flex items-end gap-2 mt-4 pt-4 border-t border-gray-100">
            {/* Mock Bar Chart */}
            {[40, 20, 60, 80, 50, 90, 70, 30, 100, 60, 40, 80].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-100 rounded-t-sm relative group">
                <div 
                  className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm group-hover:bg-blue-600 transition-colors"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
            <span>Aug 1</span>
            <span>Aug 15</span>
            <span>Aug 30</span>
          </div>
        </div>

        {/* Side Panel */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <h3 className="font-semibold text-gray-900 mb-6">Top Documents Queried</h3>
          <div className="flex flex-col gap-5 flex-1">
            {[
              { name: 'drive_merged.pdf', queries: 432 },
              { name: 'financial_report_q2.csv', queries: 215 },
              { name: 'employee_handbook.pdf', queries: 184 },
              { name: 'onboarding_deck.pptx', queries: 92 },
            ].map((doc, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700 truncate pr-4">{doc.name}</span>
                  <span className="text-gray-500">{doc.queries}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(doc.queries / 500) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
