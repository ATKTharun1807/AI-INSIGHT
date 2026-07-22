import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, File, FileText, Database, HardDrive, Zap, ChevronRight } from 'lucide-react';
import api from '../services/api';

function Dashboard() {
  const [datasets, setDatasets] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
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
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      await api.post('/datasets/upload', formData);
      setFile(null);
      fetchDatasets();
    } catch (err) {
      alert(err.response?.data?.detail || 'Upload failed');
    }
    setLoading(false);
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto w-full">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">Knowledge Workspace</h2>
          <p className="text-gray-500 text-sm mt-1">Manage, upload, and analyze your indexed documents.</p>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Database className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Documents Indexed</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">{datasets.length}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <HardDrive className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Storage Used</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">{(datasets.length * 1.2).toFixed(1)} MB</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Queries Today</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">0</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Upload */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/50">
              <h3 className="font-semibold text-gray-900">Upload Files</h3>
            </div>
            <div className="p-5">
              <form onSubmit={handleUpload} className="flex flex-col gap-4">
                <label className="border-2 border-dashed border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer text-center relative">
                  <UploadCloud className="w-8 h-8 text-gray-400 mb-3" />
                  <span className="text-sm font-medium text-gray-700">Drag & Drop or <span className="text-blue-600">Browse</span></span>
                  <span className="text-xs text-gray-400 mt-1">Supported: PDF, DOCX, PPTX, CSV<br/>Maximum 100MB</span>
                  <input
                    type="file"
                    accept=".csv, .xlsx, .pdf, .pptx, .docx, .doc"
                    onChange={e => setFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>
                
                {file && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <File className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 truncate font-medium flex-1">{file.name}</span>
                    <button type="button" onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500 text-lg leading-none">&times;</button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!file || loading}
                  className="w-full bg-[#111827] hover:bg-[#1F2937] text-white py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Upload & Index'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column - Documents Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Indexed Documents</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider bg-white">
                    <th className="px-5 py-3 font-semibold">Filename</th>
                    <th className="px-5 py-3 font-semibold">Type</th>
                    <th className="px-5 py-3 font-semibold">Indexed</th>
                    <th className="px-5 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {datasets.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-5 py-12 text-center text-gray-500">
                        No documents uploaded yet.
                      </td>
                    </tr>
                  ) : (
                    datasets.map(ds => (
                      <tr key={ds.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900 truncate max-w-[200px]">{ds.file_name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-500">
                          {ds.file_name.split('.').pop().toUpperCase()}
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Indexed
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => navigate(`/chat/${ds.id}`)}
                            className="inline-flex items-center gap-1 text-blue-600 font-medium hover:text-blue-800 transition-colors"
                          >
                            Open <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
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
      </div>
    </div>
  );
}

export default Dashboard;
