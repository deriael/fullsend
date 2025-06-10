// file: apps/frontend/src/components/SmartSearchBar.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface SearchResult {
  partNumber: string;
  name: string;
  brand: string;
}

export function SmartSearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    const debounceTimer = setTimeout(() => {
      axios.get(`http://localhost:3000/search?q=${query}`)
        .then(response => {
          setResults(response.data);
        })
        .catch(error => console.error("Search failed:", error))
        .finally(() => setIsLoading(false));
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={searchContainerRef}>
      <form className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pretražite po nazivu, modelu, broju dela..."
          className="w-full py-3 pl-12 pr-4 bg-black/30 text-brand-white rounded-full border border-white/20 outline-none transition-all duration-300 ease-in-out focus:shadow-[0_0_15px_rgba(215,35,35,0.5)] focus:border-brand-red"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        </div>
      </form>

      {query.length > 1 && (
        <div className="absolute top-full mt-2 w-full bg-brand-grey border border-white/10 rounded-lg shadow-lg max-h-96 overflow-y-auto z-10">
          {isLoading && <p className="p-4 text-gray-400">Pretraživanje...</p>}
          {!isLoading && results.length === 0 && query.length > 1 && (
            <p className="p-4 text-gray-400">Nema rezultata za &quot;{query}&quot;</p>
          )}
          {!isLoading && results.map((part) => (
            <Link 
              key={`${part.partNumber}-${part.brand}`} // This is the corrected line
              href={`/deo/${part.partNumber}`} 
              className="block p-4 hover:bg-black/30 border-b border-white/10 last:border-b-0"
              onClick={() => { setQuery(''); setResults([]); }}
            >
              <p className="font-bold text-brand-white">{part.name}</p>
              <p className="text-sm text-gray-400">{part.brand} - {part.partNumber}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}