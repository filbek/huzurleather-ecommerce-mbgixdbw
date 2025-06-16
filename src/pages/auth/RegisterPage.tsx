import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SocialAuthButtons from '../../components/auth/SocialAuthButtons';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      setIsLoading(false);
      return;
    }

    try {
      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      });
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Registration failed. Email may already be in use.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
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
            Join Luxe Leather
          </h2>
          <p className="mt-2 text-center text-sm text-leather-600">
            Create your account or{' '}
            <Link to="/login" className="font-medium text-leather-700 hover:text-leather-800">
              sign in to existing account
            </Link>
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Social Auth Buttons */}
          <SocialAuthButtons mode="register" />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or create account with email</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-leather-700 mb-1">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                    placeholder="John"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-leather-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-leather-700 mb-1">
                  Email address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-leather-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-leather-700 mb-1">
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                  placeholder="Minimum 6 characters"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-leather-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    required
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-leather-600 focus:ring-leather-500 border-leather-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToTerms" className="text-leather-700">
                    I agree to the{' '}
                    <a href="#" className="font-medium text-leather-700 hover:text-leather-800 underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="font-medium text-leather-700 hover:text-leather-800 underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-leather-700 hover:bg-leather-800 text-white py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create account'
              )}
            </button>
          </form>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-leather-900 mb-4 text-center">
            <i className="bi bi-star mr-2"></i>
            Member Benefits
          </h3>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-leather-700">
              <i className="bi bi-check-circle-fill text-green-500 mr-3"></i>
              Exclusive access to new collections
            </div>
            <div className="flex items-center text-sm text-leather-700">
              <i className="bi bi-check-circle-fill text-green-500 mr-3"></i>
              Member-only discounts and offers
            </div>
            <div className="flex items-center text-sm text-leather-700">
              <i className="bi bi-check-circle-fill text-green-500 mr-3"></i>
              Free shipping on orders over $100
            </div>
            <div className="flex items-center text-sm text-leather-700">
              <i className="bi bi-check-circle-fill text-green-500 mr-3"></i>
              Priority customer support
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            <i className="bi bi-shield-lock mr-1"></i>
            Your personal information is secure and will never be shared
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
