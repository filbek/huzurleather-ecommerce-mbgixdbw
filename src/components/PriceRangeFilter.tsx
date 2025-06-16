import React, { useState } from 'react';

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ priceRange, onPriceChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState(priceRange);

  const applyRange = () => {
    onPriceChange(tempRange);
    setIsOpen(false);
  };

  const hasActiveFilter = priceRange[0] > 0 || priceRange[1] < 1000;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border border-leather-300 px-4 py-2 rounded-md hover:bg-leather-50 transition-colors min-w-32"
      >
        <i className="bi bi-currency-dollar text-leather-600"></i>
        <span className="text-leather-700">Price</span>
        {hasActiveFilter && (
          <span className="bg-leather-700 text-white text-xs rounded-full px-2 py-1 min-w-5 h-5 flex items-center justify-center">
            1
          </span>
        )}
        <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'} text-leather-500`}></i>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-leather-200 rounded-md shadow-lg z-50 p-4 min-w-64">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-leather-600 mb-1">Min Price</label>
              <input
                type="number"
                value={tempRange[0]}
                onChange={(e) => setTempRange([parseInt(e.target.value) || 0, tempRange[1]])}
                className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                placeholder="$0"
              />
            </div>
            <div>
              <label className="block text-sm text-leather-600 mb-1">Max Price</label>
              <input
                type="number"
                value={tempRange[1]}
                onChange={(e) => setTempRange([tempRange[0], parseInt(e.target.value) || 1000])}
                className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                placeholder="$1000"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={applyRange}
                className="flex-1 bg-leather-700 text-white py-2 px-4 rounded-md hover:bg-leather-800 transition-colors"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setTempRange([0, 1000]);
                  onPriceChange([0, 1000]);
                  setIsOpen(false);
                }}
                className="flex-1 border border-leather-300 text-leather-700 py-2 px-4 rounded-md hover:bg-leather-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRangeFilter;
