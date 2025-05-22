import React from 'react';

const Filters = ({ onFilterChange }) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => onFilterChange("all")}
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-black hover:text-white"
      >
        Todos
      </button>
      <button
        onClick={() => onFilterChange("Café")}
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-black hover:text-white"
      >
        Café
      </button>
      <button
        onClick={() => onFilterChange("Té")}
        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-black hover:text-white"
      >
        Té
      </button>
    </div>
  );
};

export default Filters;
