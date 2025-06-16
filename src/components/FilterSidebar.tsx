import React from 'react';
import { FilterOptions } from '../types/Product';
import { categories, materials, colors, sizes } from '../data/products';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, isOpen, onClose }) => {
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'categories' | 'materials' | 'colors' | 'sizes', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  // Desktop version (horizontal layout)
  if (isOpen && window.innerWidth >= 1024) {
    return (
      <div className="bg-white">
        <div className="flex flex-wrap gap-8">
          {/* Categories */}
          <div className="flex-1 min-w-48">
            <h3 className="font-medium text-leather-900 mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <label key={category} className="flex items-center bg-leather-50 px-3 py-1 rounded-full text-sm">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => toggleArrayFilter('categories', category)}
                    className="rounded border-leather-300 text-leather-600 focus:ring-leather-500 mr-2"
                  />
                  <span className="text-leather-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div className="flex-1 min-w-48">
            <h3 className="font-medium text-leather-900 mb-3">Material</h3>
            <div className="flex flex-wrap gap-2">
              {materials.slice(0, 4).map(material => (
                <label key={material} className="flex items-center bg-leather-50 px-3 py-1 rounded-full text-sm">
                  <input
                    type="checkbox"
                    checked={filters.materials.includes(material)}
                    onChange={() => toggleArrayFilter('materials', material)}
                    className="rounded border-leather-300 text-leather-600 focus:ring-leather-500 mr-2"
                  />
                  <span className="text-leather-700">{material.split(' ')[0]}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="flex-1 min-w-48">
            <h3 className="font-medium text-leather-900 mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map(color => (
                <label key={color} className="flex items-center bg-leather-50 px-3 py-1 rounded-full text-sm">
                  <input
                    type="checkbox"
                    checked={filters.colors.includes(color)}
                    onChange={() => toggleArrayFilter('colors', color)}
                    className="rounded border-leather-300 text-leather-600 focus:ring-leather-500 mr-2"
                  />
                  <span className="text-leather-700">{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="flex-1 min-w-48">
            <h3 className="font-medium text-leather-900 mb-3">Price Range</h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                className="w-20 px-2 py-1 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none text-sm"
                placeholder="Min"
              />
              <span className="text-leather-500">-</span>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 1000])}
                className="w-20 px-2 py-1 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none text-sm"
                placeholder="Max"
              />
              <label className="flex items-center ml-4">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
                  className="rounded border-leather-300 text-leather-600 focus:ring-leather-500 mr-2"
                />
                <span className="text-leather-700 text-sm">In Stock</span>
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={() => onFilterChange({
                categories: [],
                materials: [],
                colors: [],
                sizes: [],
                priceRange: [0, 1000],
                inStockOnly: false,
              })}
              className="px-4 py-2 border border-leather-300 text-leather-700 rounded-md hover:bg-leather-50 transition-colors text-sm"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mobile version (sidebar)
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose}></div>
      )}
      
      <div className={`fixed lg:hidden top-0 left-0 h-full w-80 bg-white border-r border-leather-200 z-50 transform transition-transform duration-300 overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-leather-900">Filters</h2>
            <button onClick={onClose} className="text-leather-500 hover:text-leather-700">
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-medium text-leather-900 mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => toggleArrayFilter('categories', category)}
                    className="rounded border-leather-300 text-leather-600 focus:ring-leather-500"
                  />
                  <span className="ml-2 text-leather-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div className="mb-6">
            <h3 className="font-medium text-leather-900 mb-3">Material</h3>
            <div className="space-y-2">
              {materials.map(material => (
                <label key={material} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.materials.includes(material)}
                    onChange={() => toggleArrayFilter('materials', material)}
                    className="rounded border-leather-300 text-leather-600 focus:ring-leather-500"
                  />
                  <span className="ml-2 text-leather-700 text-sm">{material}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-6">
            <h3 className="font-medium text-leather-900 mb-3">Color</h3>
            <div className="grid grid-cols-2 gap-2">
              {colors.map(color => (
                <label key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.colors.includes(color)}
                    onChange={() => toggleArrayFilter('colors', color)}
                    className="rounded border-leather-300 text-leather-600 focus:ring-leather-500"
                  />
                  <span className="ml-2 text-leather-700 text-sm">{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium text-leather-900 mb-3">Price Range</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-leather-600 mb-1">Min Price</label>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                  className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                  placeholder="$0"
                />
              </div>
              <div>
                <label className="block text-sm text-leather-600 mb-1">Max Price</label>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 1000])}
                  className="w-full px-3 py-2 border border-leather-300 rounded-md focus:border-leather-500 focus:outline-none"
                  placeholder="$1000"
                />
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
                className="rounded border-leather-300 text-leather-600 focus:ring-leather-500"
              />
              <span className="ml-2 text-leather-700">In Stock Only</span>
            </label>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => onFilterChange({
              categories: [],
              materials: [],
              colors: [],
              sizes: [],
              priceRange: [0, 1000],
              inStockOnly: false,
            })}
            className="w-full py-2 px-4 border border-leather-300 text-leather-700 rounded-md hover:bg-leather-50 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
