import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { searchProducts } = useProducts();

  useEffect(() => {
    const searchWithDelay = async () => {
      if (query.length > 1) {
        try {
          const results = await searchProducts(query);
          const productNames = results.map(product => product.name).slice(0, 5);
          setSuggestions(productNames);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Search error:', error);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } else {
        setShowSuggestions(false);
      }
    };

    const timeoutId = window.setTimeout(searchWithDelay, 300);
    return () => window.clearTimeout(timeoutId);
  }, [query, searchProducts]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
          placeholder="Search premium leather products..."
          className="w-full px-4 py-2 pl-10 pr-20 border border-leather-200 rounded-full focus:border-leather-500 focus:outline-none transition-colors bg-white shadow-sm"
        />
        <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-leather-500"></i>
        <button
          onClick={() => handleSearch(query)}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-leather-700 text-white px-4 py-1 rounded-full hover:bg-leather-800 transition-colors font-medium text-sm"
        >
          Search
        </button>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-leather-200 rounded-lg mt-2 shadow-lg z-50 animate-fade-in">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSearch(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-leather-50 transition-colors border-b border-leather-100 last:border-b-0"
            >
              <i className="bi bi-search text-leather-400 mr-3"></i>
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
