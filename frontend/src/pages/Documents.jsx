import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronRight, Search, Filter } from 'lucide-react';
import api from '../services/api';

function Documents() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    try {
      const res = await api.get('/datasets/');
      setDatasets(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto w-full">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">Documents</h2>
          <p className="text-gray-500 text-sm mt-1">View and manage all files indexed in your workspace.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search documents..." 
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
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider bg-white">
                <th className="px-5 py-4 font-semibold">Filename</th>
                <th className="px-5 py-4 font-semibold">Type</th>
                <th className="px-5 py-4 font-semibold">Size</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-5 py-12 text-center text-gray-500">
                    Loading documents...
                  </td>
                </tr>
              ) : datasets.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-12 text-center text-gray-500">
                    No documents uploaded yet.
                  </td>
                </tr>
              ) : (
                datasets.map(ds => (
                  <tr key={ds.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{ds.file_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 font-medium">
                      {ds.file_name.split('.').pop().toUpperCase()}
                    </td>
                    <td className="px-5 py-4 text-gray-500">
                      {(Math.random() * 5 + 0.1).toFixed(1)} MB
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        Indexed
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => navigate(`/chat/${ds.id}`)}
                        className="inline-flex items-center gap-1 text-blue-600 font-medium hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg"
                      >
                        Open <ChevronRight className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Documents;
