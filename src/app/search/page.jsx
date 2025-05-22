'use client';

import { useState, useEffect } from 'react';
import { GoSearch, GoX, GoHeart } from 'react-icons/go';

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState('');
  const [filtered, setFiltered] = useState([]);
  const suggestions = ['Té', 'Café', 'Descafeinado', 'Rooibos'];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch('/data/products.json');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (input.length === 0) return setFiltered([]);
    const lower = input.toLowerCase();
    const results = products.filter(p =>
      [p.name, p.description, p.category]
        .filter(Boolean)
        .some(val => val.toLowerCase().includes(lower))
    );
    setFiltered(results);
  }, [input, products]);

  return (
    <div className="fixed inset-0 bg-white z-[50] p-6 overflow-y-auto min-h-screen mt-23">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search coffee, tea, rooibos..."
          className="w-full border-b border-gray-400 text-xl outline-none placeholder-gray-500 pb-2"
        />
        <GoX onClick={() => window.history.back()} className="text-xl cursor-pointer ml-4" />
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Panel: Suggestions */}
        <div className="w-full md:w-1/4 border-r border-gray-300 pr-4">
          <h2 className="text-xl font-semibold mb-4">{input || 'Search'}</h2>
          <p className="text-sm text-gray-500 mb-2">You can search</p>
          <ul className="space-y-2 text-gray-800 text-lg">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="cursor-pointer hover:underline"
                onClick={() => setInput(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Panel: Product Results */}
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm text-center">
              {product.category && (
                <div className="text-xs uppercase text-gray-500 mb-2">{product.category}</div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="h-36 w-auto mx-auto object-contain mb-4"
              />
              <GoHeart className="mx-auto text-lg text-gray-600 mb-2 hover:text-black cursor-pointer" />
              <h4 className="font-semibold text-sm">{product.name}</h4>
              <p className="text-xs text-gray-600">{product.description}</p>
              <p className="mt-2 text-xs">{product.weight}</p>
              <p className="text-sm font-semibold">{product.price}</p>
            </div>
          ))}

          {input && filtered.length === 0 && (
            <div className="text-gray-500 italic col-span-full mt-4">
              No results found for “{input}”
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

