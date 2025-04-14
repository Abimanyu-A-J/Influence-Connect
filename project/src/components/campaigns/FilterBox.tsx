import React, { useState } from "react";

interface FilterBoxProps {
  onFilterChange: (filters: { attribute: string; sort: number; value?: string }) => void;
}

export const FilterBox: React.FC<FilterBoxProps> = ({ onFilterChange }) => {
<<<<<<< HEAD
  const [attribute, setAttribute] = useState("Budget"); // Default: Budget
  const [sort, setSort] = useState<number>(0); // Default: Ascending (integer)
  const [value, setValue] = useState(""); // Last input field value
=======
  const [attribute, setAttribute] = useState("budget");
  const [sort, setSort] = useState<number>(0);
  const [value, setValue] = useState("");
>>>>>>> bd4bd729509739932c815cc15591f19d53883cd1

  const attributeLabels: Record<string, string> = {
    budget: "Budget Amount",
    latest: "Start Date",
    targeted_views: "Targeted Views Count",
    company: "Company Name",
  };

  const attributePlaceholders: Record<string, string> = {
    budget: "Enter budget amount",
    latest: "Enter date (YYYY-MM-DD)",
    targeted_views: "Enter view count",
    company: "Enter company name",
  };

  //  Mapping UI attribute to DB field
  const dbAttributeMap: Record<string, string> = {
    budget: "Budget",
    latest: "Start_Date",
    targeted_views: "Targeted_Views",
    company: "Company_name",
  };
  

  const handleApplyFilters = () => {
    const filters: { attribute: string; sort: number; value?: string } = {
      attribute: dbAttributeMap[attribute],
      sort,
    };

    if (value.trim()) {
      filters.value = value;
    }

    onFilterChange(filters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm w-64">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        {/* Filter By */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Filter By</label>
          <select
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={attribute}
            onChange={(e) => {
              setAttribute(e.target.value);
              setValue("");
            }}
          >
<<<<<<< HEAD
            <option value="Budget">Budget</option>
            <option value="Latest">Latest</option>
            <option value="Targeted_views">Targeted Views</option>
            <option value="Company_name">Company</option>
=======
            <option value="budget">Budget</option>
            <option value="latest">Start Date</option>
            <option value="targeted_views">Targeted Views</option>
            <option value="company">Company</option>
>>>>>>> bd4bd729509739932c815cc15591f19d53883cd1
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sort Order</label>
          <select
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={sort}
            onChange={(e) => setSort(parseInt(e.target.value, 10))}
          >
            <option value={0}>Ascending (ASC)</option>
            <option value={1}>Descending (DESC)</option>
            <option value={2}>Greater Than (GT)</option>
            <option value={3}>Lesser Than (LT)</option>
            <option value={4}>Equal To (EQ)</option>
            <option value={5}>Greater or Equal (GEQ)</option>
            <option value={6}>Lesser or Equal (LEQ)</option>
          </select>
        </div>

<<<<<<< HEAD
        {/* Dynamic Input Field (Changes Based on Attribute) */}
        {(attribute.toLowerCase() in attributeLabels) && (
=======
        {/* Input Field */}
        {(attribute in attributeLabels) && (
>>>>>>> bd4bd729509739932c815cc15591f19d53883cd1
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {attributeLabels[attribute.toLowerCase()]}
            </label>
            <input
              type="text"
<<<<<<< HEAD
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={attributePlaceholders[attribute.toLowerCase()]}
=======
              placeholder={attributePlaceholders[attribute]}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
>>>>>>> bd4bd729509739932c815cc15591f19d53883cd1
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        )}

<<<<<<< HEAD

        {/* Apply Filters Button */}
=======
>>>>>>> bd4bd729509739932c815cc15591f19d53883cd1
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
