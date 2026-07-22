import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, LayoutDashboard, Folder, BarChart2, History, Settings, FileText } from 'lucide-react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Documents from './pages/Documents';
import Collections from './pages/Collections';
import Analytics from './pages/Analytics';
import HistoryPage from './pages/History';
import SettingsPage from './pages/Settings';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

// Sidebar Link Component to handle active states
function SidebarLink({ to, icon: Icon, children }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
        isActive 
          ? 'text-gray-900 bg-gray-50' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      <Icon className={`w-4 h-4 ${isActive ? 'text-gray-500' : 'text-gray-400'}`} />
      {children}
    </Link>
  );
}

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
}

function AppLayout({ children }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { currentUser, logout } = useAuth();

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC]">
      {/* Top Navbar */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#111827] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">IA</span>
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight">InsightAI</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative hidden sm:block">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }} 
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              <Bell className="w-5 h-5" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 shadow-lg rounded-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-900 text-sm">Notifications</span>
                </div>
                <div className="p-4 text-center text-sm text-gray-500">
                  No new notifications.
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }} 
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 overflow-hidden"
            >
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4" />
              )}
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 shadow-lg rounded-xl py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100 mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{currentUser?.displayName || 'Guest'}</p>
                  <p className="text-xs text-gray-500 truncate">{currentUser?.email || 'guest@example.com'}</p>
                </div>
                <Link to="/settings" onClick={() => setShowProfileMenu(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile Settings</Link>
                <button 
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }} 
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-3.5rem)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-4 hidden md:flex flex-col gap-1 overflow-y-auto shrink-0">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Workspace</p>
          <SidebarLink to="/dashboard" icon={LayoutDashboard}>Dashboard</SidebarLink>
          <SidebarLink to="/documents" icon={FileText}>Documents</SidebarLink>
          <SidebarLink to="/collections" icon={Folder}>Collections</SidebarLink>
          
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3 mt-6">Insights</p>
          <SidebarLink to="/analytics" icon={BarChart2}>Analytics</SidebarLink>
          <SidebarLink to="/history" icon={History}>History</SidebarLink>

          <div className="mt-auto pt-4 border-t border-gray-200">
            <SidebarLink to="/settings" icon={Settings}>Settings</SidebarLink>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
          <Route path="/chat/:datasetId" element={<ProtectedRoute><AppLayout><Chat /></AppLayout></ProtectedRoute>} />
          
          {/* New Pages */}
          <Route path="/documents" element={<ProtectedRoute><AppLayout><Documents /></AppLayout></ProtectedRoute>} />
          <Route path="/collections" element={<ProtectedRoute><AppLayout><Collections /></AppLayout></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><AppLayout><Analytics /></AppLayout></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><AppLayout><HistoryPage /></AppLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><AppLayout><SettingsPage /></AppLayout></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
