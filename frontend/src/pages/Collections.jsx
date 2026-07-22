import { FolderPlus, Search, Filter } from 'lucide-react';

function Collections() {
  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto w-full flex flex-col h-full">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">Collections</h2>
          <p className="text-gray-500 text-sm mt-1">Organize your indexed documents into logical groups and folders.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#111827] text-white px-4 py-2.5 rounded-lg shadow-sm hover:bg-[#1F2937] transition-colors text-sm font-medium">
          <FolderPlus className="w-4 h-4" />
          New Collection
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search collections..." 
              className="pl-9 pr-4 py-2 w-full bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        
        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
            <FolderPlus className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No collections yet</h3>
          <p className="text-gray-500 text-sm max-w-sm mb-6">
            Group related documents together into collections to provide focused context for your Workspace Agent.
          </p>
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm">
            <FolderPlus className="w-4 h-4" />
            Create Your First Collection
          </button>
        </div>
      </div>
    </div>
  );
}

export default Collections;
