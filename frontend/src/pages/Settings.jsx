import { useState } from 'react';
import { User, Key, Bell, Shield, Smartphone } from 'lucide-react';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your account preferences and application settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-1">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'api', label: 'API Keys', icon: Key },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'appearance', label: 'Appearance', icon: Smartphone },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
          
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Public Profile</h3>
                <p className="text-sm text-gray-500 mb-6">This information will be displayed publicly so be careful what you share.</p>
              </div>

              <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex gap-3">
                  <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Change</button>
                  <button className="text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50">Remove</button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <input type="email" defaultValue="john.doe@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 cursor-not-allowed" disabled />
                  <p className="text-xs text-gray-400">Contact support to change your email address.</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button className="bg-[#111827] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1F2937] shadow-sm">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab !== 'profile' && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                <Key className="w-6 h-6 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                This settings pane is currently under development. Please check back in a future update.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Settings;
