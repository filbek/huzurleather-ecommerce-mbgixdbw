import React, { useState } from 'react';

interface DropdownFilterProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onSelectionChange: (selected: string[]) => void;
  icon?: string;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({ 
  title, 
  options, 
  selectedOptions, 
  onSelectionChange,
  icon = 'bi-funnel'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: string) => {
    const newSelection = selectedOptions.includes(option)
      ? selectedOptions.filter(item => item !== option)
      : [...selectedOptions, option];
    onSelectionChange(newSelection);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border border-leather-300 px-4 py-2 rounded-md hover:bg-leather-50 transition-colors min-w-32"
      >
        <i className={`bi ${icon} text-leather-600`}></i>
        <span className="text-leather-700">{title}</span>
        {selectedOptions.length > 0 && (
          <span className="bg-leather-700 text-white text-xs rounded-full px-2 py-1 min-w-5 h-5 flex items-center justify-center">
            {selectedOptions.length}
          </span>
        )}
        <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'} text-leather-500`}></i>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-leather-200 rounded-md shadow-lg z-50 min-w-48 max-h-64 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-4 py-2 hover:bg-leather-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => toggleOption(option)}
                className="rounded border-leather-300 text-leather-600 focus:ring-leather-500 mr-3"
              />
              <span className="text-leather-700">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
