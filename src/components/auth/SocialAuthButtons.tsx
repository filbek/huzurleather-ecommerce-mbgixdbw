import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { Provider } from '@supabase/supabase-js';

interface SocialAuthButtonsProps {
  mode: 'login' | 'register';
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ mode }) => {
  const { loginWithProvider } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSocialAuth = async (provider: Provider) => {
    setLoadingProvider(provider);
    try {
      await loginWithProvider(provider);
    } catch (error) {
      console.error(`${provider} auth error:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  const socialProviders = [
    {
      name: 'google',
      label: 'Google',
      icon: 'bi-google',
      bgColor: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      name: 'facebook',
      label: 'Facebook',
      icon: 'bi-facebook',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      name: 'github',
      label: 'GitHub',
      icon: 'bi-github',
      bgColor: 'bg-gray-800 hover:bg-gray-900',
      textColor: 'text-white'
    },
    {
      name: 'apple',
      label: 'Apple',
      icon: 'bi-apple',
      bgColor: 'bg-black hover:bg-gray-800',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Or {mode === 'login' ? 'sign in' : 'sign up'} with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.name}
            onClick={() => handleSocialAuth(provider.name as Provider)}
            disabled={loadingProvider !== null}
            className={`
              w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium transition-colors
              ${provider.bgColor} ${provider.textColor}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {loadingProvider === provider.name ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <>
                <i className={`${provider.icon} mr-2`}></i>
                {provider.label}
              </>
            )}
          </button>
        ))}
      </div>

      {/* Alternative: Single row layout for mobile */}
      <div className="sm:hidden space-y-2">
        {socialProviders.map((provider) => (
          <button
            key={`mobile-${provider.name}`}
            onClick={() => handleSocialAuth(provider.name as Provider)}
            disabled={loadingProvider !== null}
            className={`
              w-full inline-flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium transition-colors
              ${provider.bgColor} ${provider.textColor}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {loadingProvider === provider.name ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <i className={`${provider.icon} mr-2`}></i>
            )}
            Continue with {provider.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuthButtons;
