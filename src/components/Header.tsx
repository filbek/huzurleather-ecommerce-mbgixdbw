import React from 'react';
import SearchBar from './SearchBar';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="bg-white border-b border-leather-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <i className="bi bi-bag-heart text-2xl text-leather-700"></i>
            <h1 className="text-2xl font-serif font-semibold text-leather-900">Luxe Leather</h1>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <SearchBar onSearch={onSearch} />
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <button className="text-leather-700 hover:text-leather-900 transition-colors">
              <i className="bi bi-heart text-xl"></i>
            </button>
            <button className="text-leather-700 hover:text-leather-900 transition-colors relative">
              <i className="bi bi-bag text-xl"></i>
              <span className="absolute -top-2 -right-2 bg-leather-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
