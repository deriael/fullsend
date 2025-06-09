// file: apps/frontend/src/components/ProductCard.tsx
import React from 'react';
import Image from 'next/image'; // Import the Next.js Image component
import { Part } from '@fullsend/types';

export function ProductCard({ part }: { part: Part }) {
  const stockColor = part.stockStatus === 'Na stanju' ? 'text-green-400' : 'text-yellow-400';

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 flex flex-col transition-transform hover:scale-105 duration-300">
      <div className="bg-white p-2 relative h-48">
        {/* Use the Next.js Image component for optimization */}
        <Image
          src={part.imageUrl}
          alt={part.name}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-gray-400 mb-1 font-semibold">{part.brand}</p>
        <h3 className="text-lg font-semibold text-white mb-4 h-14">{part.name}</h3>

        <div className="mt-auto pt-4 border-t border-gray-700">
          <p className={`text-sm font-bold ${stockColor} mb-2`}>{part.stockStatus}</p>
          <p className="text-2xl font-bold text-white mb-4">{part.price.toLocaleString('de-DE')} RSD</p>
          <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors">
            Dodaj u korpu
          </button>
        </div>
      </div>
    </div>
  );
}