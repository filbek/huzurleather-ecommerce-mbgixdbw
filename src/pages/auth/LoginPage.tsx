import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SocialAuthButtons from '../../components/auth/SocialAuthButtons';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo account quick login
  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setIsLoading(true);
    setError('');

    try {
      const success = await login(demoEmail, demoPassword);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Demo login failed');
      }
    } catch (err) {
      setError('Demo login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
            <i className="bi bi-bag-heart text-3xl text-leather-700"></i>
            <span className="text-2xl font-serif font-semibold text-leather-900">Luxe Leather</span>
          </Link>
          <h2 className="text-center text-3xl font-bold text-leather-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-leather-600">
            Sign in to your account or{' '}
            <Link to="/register" className="font-medium text-leather-700 hover:text-leather-800">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Social Auth Buttons */}
          <SocialAuthButtons mode="login" />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-leather-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-leather-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-leather-600 focus:ring-leather-500 border-leather-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-leather-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-leather-700 hover:text-leather-800">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-leather-700 hover:bg-leather-800 text-white py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
        
        {/* Demo Accounts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-leather-900 mb-4 text-center">
            <i className="bi bi-play-circle mr-2"></i>
            Try Demo Accounts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('admin@luxeleather.com', 'admin123')}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 font-medium transition-colors disabled:opacity-50"
            >
              <i className="bi bi-shield-check mr-2"></i>
              Admin Demo
            </button>
            <button
              onClick={() => handleDemoLogin('user@example.com', 'user123')}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 border border-green-300 text-green-700 rounded-md hover:bg-green-50 font-medium transition-colors disabled:opacity-50"
            >
              <i className="bi bi-person mr-2"></i>
              User Demo
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Explore the system with pre-configured demo accounts
          </p>
        </div>

        {/* Security Notice */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            <i className="bi bi-shield-lock mr-1"></i>
            Your data is protected with enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
