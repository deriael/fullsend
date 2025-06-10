// file: apps/frontend/src/components/ProductCard.tsx
"use client";
import React from "react";
import Image from "next/image";
import { Part } from "@fullsend/types";
import { useCartStore } from "@/store/cart.store";

export function ProductCard({ part }: { part: Part }) {
  const { addToCart } = useCartStore();
  const stockColor =
    part.stockStatus === "Na stanju" ? "text-green-400" : "text-yellow-400";

  return (
    // Use brand-grey for the card background
    <div className="bg-brand-grey rounded-lg overflow-hidden shadow-lg border border-white/10 flex flex-col transition-transform hover:scale-105 duration-300">
      <div className="bg-white p-2 relative h-48">
        <Image
          src={part.imageUrl}
          alt={part.name}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow text-brand-white">
        <p className="text-sm text-gray-400 mb-1 font-semibold">{part.brand}</p>
        <h3 className="text-lg font-semibold mb-4 h-14">{part.name}</h3>

        <div className="mt-auto pt-4 border-t border-white/10">
          <p className={`text-sm font-bold ${stockColor} mb-2`}>
            {part.stockStatus}
          </p>
          <p className="text-2xl font-bold mb-4">
            {part.price.toLocaleString("de-DE")} RSD
          </p>
          <button
            onClick={() => addToCart(part)}
            // Use brand-red for the button
            className="w-full bg-brand-red text-brand-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-colors"
          >
            Dodaj u korpu
          </button>
        </div>
      </div>
    </div>
  );
}
