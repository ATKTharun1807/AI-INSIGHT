import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { loginWithGoogle, loginAsGuest, currentUser, login, signup } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  async function handleGoogleLogin() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in with Google: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    try {
      setError('');
      setLoading(true);
      if (isRegistering) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to ' + (isRegistering ? 'register' : 'log in') + ': ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleGuestLogin() {
    loginAsGuest();
    navigate('/dashboard');
  }

  const isMissingConfig = !import.meta.env.VITE_FIREBASE_API_KEY;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="max-w-md w-full bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
        <div className="w-12 h-12 bg-[#111827] rounded mx-auto flex items-center justify-center mb-6">
          <span className="text-white font-bold text-xl">IA</span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isRegistering ? 'Create an Account' : 'Welcome to InsightAI'}
        </h2>
        <p className="text-gray-500 mb-6">
          {isRegistering ? 'Sign up' : 'Sign in'} to access your Enterprise Document Intelligence workspace.
        </p>
        
        {isMissingConfig && (
          <div className="mb-6 text-sm text-amber-700 bg-amber-50 border border-amber-200 p-4 rounded-lg text-left">
            <p className="font-semibold mb-1">Configuration Required</p>
            <p>Please paste your Firebase Web App configuration into <code>frontend/.env</code> to enable Google login.</p>
          </div>
        )}
        
        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded">{error}</div>}
        
        <form onSubmit={handleEmailSubmit} className="space-y-4 mb-4">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111827] text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isRegistering ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="text-sm text-gray-600 mb-6">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            className="text-blue-600 hover:underline font-medium"
          >
            {isRegistering ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            disabled={loading || isMissingConfig}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>
          
          <div className="relative py-2 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative bg-white px-4 text-sm text-gray-500">or</div>
          </div>
          
          <button
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
