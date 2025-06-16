import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import SearchBar from '../SearchBar';

const PublicHeader: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuthAction = () => {
    if (isAuthenticated) {
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-white border-b border-leather-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <i className="bi bi-bag-heart text-2xl text-leather-700"></i>
            <h1 className="text-2xl font-serif font-semibold text-leather-900">Luxe Leather</h1>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-leather-700 hover:text-leather-900 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-leather-700 hover:text-leather-900 transition-colors">
              Products
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden lg:block">
            <SearchBar onSearch={() => {}} />
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-leather-700 hover:text-leather-900 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-leather-500 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                  <span className="hidden md:block">{user?.firstName}</span>
                  <i className="bi bi-chevron-down"></i>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={handleAuthAction}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="bi bi-speedometer2 mr-2"></i>
                      Dashboard
                    </button>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="bi bi-box-arrow-right mr-2"></i>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleAuthAction}
                className="text-leather-700 hover:text-leather-900 transition-colors"
              >
                <i className="bi bi-person text-xl"></i>
              </button>
            )}
            
            <Link to="/cart" className="text-leather-700 hover:text-leather-900 transition-colors relative">
              <i className="bi bi-bag text-xl"></i>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-leather-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-leather-700 hover:text-leather-900 transition-colors"
            >
              <i className="bi bi-list text-xl"></i>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-leather-200 py-4">
            <div className="space-y-4">
              <div className="lg:hidden">
                <SearchBar onSearch={() => {}} />
              </div>
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="text-leather-700 hover:text-leather-900 transition-colors py-2">
                  Home
                </Link>
                <Link to="/products" className="text-leather-700 hover:text-leather-900 transition-colors py-2">
                  Products
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;
