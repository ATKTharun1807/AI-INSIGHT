import { Link } from 'react-router-dom';
import { ArrowRight, Search, FileText, BarChart } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex flex-col font-sans">
      
      {/* Simple Marketing Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 h-16 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="font-bold text-xl tracking-tight">
          InsightAI
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Login
          </Link>
          <Link
            to="/dashboard"
            className="bg-[#111827] hover:bg-[#1F2937] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            Open Workspace
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 max-w-5xl mx-auto w-full text-center sm:text-left flex flex-col items-center sm:items-start">
        <h1 className="text-4xl sm:text-[56px] font-extrabold text-[#111827] tracking-tight leading-[1.1] max-w-3xl mb-6">
          Enterprise Document Intelligence
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed font-normal">
          Search, analyze and extract insights from PDFs, Word documents, presentations and spreadsheets. Powered by secure Retrieval-Augmented Generation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            to="/dashboard"
            className="bg-[#111827] hover:bg-[#1F2937] text-white px-6 py-3.5 rounded-xl text-base font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            Open Workspace
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/dashboard"
            className="bg-white border border-gray-200 text-[#111827] hover:bg-gray-50 px-6 py-3.5 rounded-xl text-base font-semibold transition-colors flex items-center justify-center"
          >
            Upload Document
          </Link>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-20 bg-white border-t border-gray-200 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center mb-5">
              <Search className="w-5 h-5 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Instant Search</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Locate exact paragraphs and data points across thousands of indexed documents instantly with full citation tracking.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center mb-5">
              <FileText className="w-5 h-5 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Automated Extraction</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Automatically extract key metadata, summaries, and action items from unstructured text, resumes, and slide decks.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center mb-5">
              <BarChart className="w-5 h-5 text-gray-700" />
            </div>
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Data Analysis</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Process tabular data from CSV and Excel spreadsheets directly within your secure workspace environment.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 py-10 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-lg tracking-tight">InsightAI</div>
          <div className="flex gap-6 text-sm text-gray-500 font-medium">
            <Link to="#" className="hover:text-gray-900 transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-gray-900 transition-colors">Security</Link>
            <Link to="#" className="hover:text-gray-900 transition-colors">API</Link>
            <Link to="#" className="hover:text-gray-900 transition-colors">Status</Link>
            <Link to="#" className="hover:text-gray-900 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
