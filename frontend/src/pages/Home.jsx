import { Link } from 'react-router-dom';
import { ArrowRight, Search, FileText, BarChart, Shield, CheckCircle2, Bot, Database, Zap } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">

      {/* Premium Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 h-16 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="font-extrabold text-2xl tracking-tight text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white text-xs">IA</div>
          InsightAI
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="#" className="hover:text-gray-900 transition-colors">Features</Link>
          <Link to="#" className="hover:text-gray-900 transition-colors">Solutions</Link>
          <Link to="#" className="hover:text-gray-900 transition-colors">Docs</Link>
          <Link to="#" className="hover:text-gray-900 transition-colors">Pricing</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Log in
          </Link>
          <Link
            to="/dashboard"
            className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            Open Workspace <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section with Mesh Background */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-100/60 blur-[120px] mix-blend-multiply opacity-70"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-100/60 blur-[100px] mix-blend-multiply opacity-70"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-16">

          {/* Left Column: Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-6">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
              Enterprise Ready v2.0
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              Enterprise Document <br className="hidden sm:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Intelligence</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
              Search, analyze, and extract insights from PDFs, Word documents, and spreadsheets in seconds. Powered by secure Retrieval-Augmented Generation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl text-base font-semibold shadow-xl shadow-gray-900/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start for free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="#"
                className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-8 py-4 rounded-xl text-base font-semibold transition-all hover:-translate-y-1 flex items-center justify-center"
              >
                Book a Demo
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 14-day free trial</span>
            </div>
          </div>

          {/* Right Column: CSS UI Mockup */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none relative">
            {/* Decorative elements behind mockup */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-2xl rounded-[3rem]"></div>

            <div className="relative bg-white/60 backdrop-blur-xl border border-white rounded-2xl shadow-2xl shadow-indigo-900/10 overflow-hidden flex flex-col h-[500px]">
              {/* Mockup Header */}
              <div className="h-12 border-b border-gray-100 bg-white/80 flex items-center px-4 gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex-1 bg-gray-100 rounded-md h-6 flex items-center px-3">
                  <span className="text-[10px] text-gray-400 font-medium">insightai.com/workspace</span>
                </div>
              </div>

              {/* Mockup Body */}
              <div className="flex-1 flex p-4 gap-4 bg-gray-50/50">
                {/* Sidebar */}
                <div className="hidden sm:flex w-48 bg-white border border-gray-100 rounded-xl p-3 flex-col gap-2">
                  <div className="h-8 bg-gray-100 rounded-md flex items-center px-2 gap-2"><FileText className="w-4 h-4 text-gray-400" /></div>
                  <div className="h-8 bg-indigo-50 border border-indigo-100 rounded-md flex items-center px-2 gap-2"><Bot className="w-4 h-4 text-indigo-500" /></div>
                  <div className="h-8 bg-gray-100 rounded-md flex items-center px-2 gap-2"><Database className="w-4 h-4 text-gray-400" /></div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-4">
                  <div className="self-end bg-gray-100 rounded-2xl rounded-tr-sm px-4 py-2 text-sm text-gray-700 max-w-[80%]">
                    Summarize the Q3 Financial Report.
                  </div>
                  <div className="self-start bg-indigo-50 border border-indigo-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-800 max-w-[90%] shadow-sm flex flex-col gap-2">
                    <span className="font-semibold text-indigo-700 flex items-center gap-1.5"><Bot className="w-4 h-4" /> InsightAI</span>
                    <span>Based on the <b>Q3_Financial_Report.pdf</b>, revenue increased by 14% year-over-year. Key drivers were enterprise software sales and reduced operational costs.</span>
                    <div className="flex gap-2 mt-2">
                      <span className="text-[10px] bg-white border border-indigo-200 px-2 py-1 rounded text-indigo-600 font-medium hover:bg-indigo-50 cursor-pointer transition-colors">Page 4</span>
                      <span className="text-[10px] bg-white border border-indigo-200 px-2 py-1 rounded text-indigo-600 font-medium hover:bg-indigo-50 cursor-pointer transition-colors">Page 12</span>
                    </div>
                  </div>
                  <div className="mt-auto relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input type="text" className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Ask a question about your documents..." readOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Section */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 font-medium text-sm">
          <span className="uppercase tracking-wider text-xs font-bold text-gray-400">Enterprise Grade Features</span>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <span className="flex items-center gap-2"><Shield className="w-5 h-5 text-gray-400" /> SOC2 Compliant</span>
            <span className="flex items-center gap-2"><Database className="w-5 h-5 text-gray-400" /> Isolated Vectors</span>
            <span className="flex items-center gap-2"><Zap className="w-5 h-5 text-gray-400" /> Powered by GPT-4</span>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Everything you need to analyze data</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Upload any document and instantly chat with it, extract tables, and generate summaries using advanced semantic search.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_2px_20px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Search className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Semantic Search</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Locate exact paragraphs and data points across thousands of indexed documents instantly. AI understands context, not just keywords.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_2px_20px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Automated Extraction</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Automatically extract key metadata, summaries, and action items from unstructured text, resumes, contracts, and slide decks.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_2px_20px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <BarChart className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Tabular Data Analysis</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Process tabular data from CSV and Excel spreadsheets. The AI can aggregate numbers, find trends, and compare rows instantly.
            </p>
          </div>

        </div>
      </section>

      {/* Rich Footer */}
      <footer className="mt-auto border-t border-gray-100 bg-gray-50 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

          <div className="col-span-2 md:col-span-1 flex flex-col gap-4 pr-8">
            <div className="font-extrabold text-xl tracking-tight text-gray-900 flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-900 rounded-md flex items-center justify-center text-white text-[10px]">IA</div>
              InsightAI
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              The enterprise standard for document intelligence and retrieval-augmented generation.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-gray-900">Product</h4>
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Features</Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Integrations</Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Pricing</Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Changelog</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-gray-900">Resources</h4>
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Documentation</Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">API Reference</Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Community</Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Blog</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-gray-900">Company</h4>
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">About</Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Careers</Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Terms of Service</Link>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 InsightAI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-gray-900 transition-colors">Twitter</Link>
            <Link to="#" className="hover:text-gray-900 transition-colors">GitHub</Link>
            <Link to="#" className="hover:text-gray-900 transition-colors">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
