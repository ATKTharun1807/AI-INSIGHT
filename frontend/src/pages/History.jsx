import { Search, Filter, MessageSquare, Clock, FileText } from 'lucide-react';

function History() {
  const mockHistory = [
    { id: 1, query: "Summarize the onboarding deck", doc: "onboarding_deck.pptx", time: "10 mins ago", tokens: 432 },
    { id: 2, query: "What is the ATS score for this resume?", doc: "Naven resume2-2 (5).pdf", time: "2 hours ago", tokens: 856 },
    { id: 3, query: "Extract Q2 revenue figures", doc: "financial_report_q2.csv", time: "Yesterday", tokens: 124 },
    { id: 4, query: "Find mentions of 'project titan'", doc: "drive_merged.pdf", time: "Yesterday", tokens: 2105 },
    { id: 5, query: "List all action items from the meeting", doc: "test.pdf", time: "Aug 15", tokens: 532 },
    { id: 6, query: "Explain the main topic", doc: "og.pdf", time: "Aug 14", tokens: 154 },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto w-full">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">Query History</h2>
          <p className="text-gray-500 text-sm mt-1">Review past interactions and analysis logs across your workspace.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="pl-9 pr-4 py-2 w-full bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider bg-white">
                <th className="px-5 py-4 font-semibold w-1/2">Query</th>
                <th className="px-5 py-4 font-semibold">Document Context</th>
                <th className="px-5 py-4 font-semibold">Time</th>
                <th className="px-5 py-4 font-semibold text-right">Tokens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {mockHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <span className="font-medium text-gray-900 line-clamp-1">{item.query}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="truncate max-w-[150px]" title={item.doc}>{item.doc}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      {item.time}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right text-gray-500 font-mono text-xs">
                    {item.tokens.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;
