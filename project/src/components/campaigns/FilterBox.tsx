import React, { useState } from 'react';

interface FilterBoxProps {
  onFilterChange: (filters: { budgetRange: string; sort: string; company: string }) => void;
}

export const FilterBox: React.FC<FilterBoxProps> = ({ onFilterChange }) => {
  const [budgetRange, setBudgetRange] = useState('');
  const [sort, setSort] = useState('latest');
  const [company, setCompany] = useState('');

  const handleApplyFilters = () => {
    onFilterChange({ budgetRange, sort, company });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm w-64">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Filter By</label>

          <select
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
          >
            <option value="budget">Budget</option>
            <option value="targeted_views">Targeted Views</option>

          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sort Order</label>

          <select
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="0">Ascending</option>
            <option value="1">Descending</option>

          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
