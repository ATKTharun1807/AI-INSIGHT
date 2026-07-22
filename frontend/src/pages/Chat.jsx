import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Paperclip, Mic, Send, FileText, ChevronLeft, Info, File, Hash, Clock, CheckCircle2, MessageSquare } from 'lucide-react';
import api from '../services/api';

function Chat() {
  const { datasetId } = useParams();
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    // Fetch dataset details
    const fetchDataset = async () => {
      try {
        const res = await api.get('/datasets/');
        const found = res.data.find(d => d.id === parseInt(datasetId));
        if (found) setDataset(found);
      } catch (err) {
        console.error("Could not fetch dataset metadata", err);
      }
    };
    fetchDataset();
  }, [datasetId]);

  const sendMessage = async (inputQuery) => {
    const textToSend = inputQuery || query;
    if (!textToSend.trim()) return;

    const userMessage = { sender: 'user', text: textToSend };
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    setQuery('');
    setLoading(true);

    try {
      const res = await api.post('/analysis/query', {
        dataset_id: parseInt(datasetId),
        query: userMessage.text,
        chat_history: chatHistory
      });

      const aiMessage = {
        sender: 'ai',
        text: res.data.answer,
        sources: res.data.sources || [],
        agent_used: res.data.agent_used || 'Workspace Agent'
      };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (err) {
      setChatHistory(prev => [
        ...prev,
        { sender: 'ai', text: 'Error executing your request. Please try again.' }
      ]);
    }
    setLoading(false);
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(query);
  };

  return (
    <div className="flex h-full bg-[#F8FAFC]">
      {/* Left Sidebar - Chat History (Simulated) */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden lg:flex">
        <div className="p-4 border-b border-gray-200">
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent Conversations</h3>
          <div className="flex flex-col gap-1">
            <button className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg text-left transition-colors">
              <MessageSquare className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-gray-900 truncate">Current Session</span>
            </button>
            <button className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg text-left transition-colors">
              <MessageSquare className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-gray-500 truncate">Summary request</span>
            </button>
            <button className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg text-left transition-colors">
              <MessageSquare className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-gray-500 truncate">Data extraction...</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative max-w-4xl mx-auto w-full border-x border-gray-200 bg-white">
        
        {/* Chat Header */}
        <header className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-white shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-900">Workspace</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 truncate max-w-[200px]">{dataset?.file_name || 'Loading...'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium border border-green-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Indexed
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 pb-32">
          {chatHistory.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 border border-gray-200">
                <FileText className="w-6 h-6 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Knowledge Workspace</h2>
              <p className="text-gray-500 text-sm mb-6">Ask questions, extract data, or generate summaries based on your indexed document.</p>
              
              <div className="grid grid-cols-2 gap-2 w-full">
                {['Summarize this document', 'What are the main takeaways?', 'Extract key entities', 'Predict ATS score'].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(prompt)}
                    className="p-3 text-left border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm text-gray-700 shadow-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {chatHistory.map((msg, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              {msg.sender === 'user' ? (
                <div className="text-gray-900 text-lg font-bold leading-snug">
                  {msg.text}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </div>
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" /> Sources
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((src, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 text-xs text-gray-600 cursor-default hover:bg-gray-100 transition-colors"
                            title={src.snippet}
                          >
                            <span className="font-mono text-[10px] text-gray-400 border border-gray-200 bg-white rounded px-1">
                              {sIdx + 1}
                            </span>
                            <span className="font-medium">{src.source_tag || `Chunk ${src.chunk}`}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              Analyzing workspace...
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-6 pb-6 px-6">
          <form onSubmit={handleSend} className="relative max-w-3xl mx-auto flex items-end gap-2 bg-white border border-gray-200 shadow-sm rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors shrink-0">
              <Paperclip className="w-5 h-5" />
            </button>
            <textarea
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
              placeholder="Ask a question about your documents..."
              className="flex-1 max-h-32 min-h-[40px] resize-none py-2.5 px-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-gray-900"
              rows={1}
            />
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition-colors shrink-0">
              <Mic className="w-5 h-5" />
            </button>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="p-2 bg-[#111827] text-white rounded-lg hover:bg-[#1F2937] transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-2 text-[11px] text-gray-400">
            Workspace answers can be inaccurate. Always verify source citations.
          </div>
        </div>

      </main>

      {/* Right Panel - Document Info */}
      <aside className="w-64 bg-white flex flex-col hidden xl:flex">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Info className="w-4 h-4 text-gray-400" />
            Document Info
          </h3>
        </div>
        <div className="p-5 flex flex-col gap-5">
          
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Filename</span>
            <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
              <File className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="truncate">{dataset?.file_name || '--'}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</span>
            <div className="text-sm text-gray-700">
              {dataset?.file_name?.split('.').pop().toUpperCase() || '--'}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</span>
            <div className="inline-flex items-center w-max gap-1.5 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium border border-green-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Indexed
            </div>
          </div>

          {(dataset?.row_count > 0) && (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Dataset Size</span>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 border border-gray-200 rounded"><Hash className="w-3 h-3 text-gray-400"/> {dataset.row_count} rows</span>
                <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 border border-gray-200 rounded"><Hash className="w-3 h-3 text-gray-400"/> {dataset.column_count} cols</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Updated</span>
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <Clock className="w-4 h-4 text-gray-400" />
              Today
            </div>
          </div>

        </div>
      </aside>
    </div>
  );
}

export default Chat;
