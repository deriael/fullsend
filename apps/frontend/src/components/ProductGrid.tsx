"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductCard } from "./ProductCard";
import { Part, FinalSelection } from "@fullsend/types";
import { API_BASE_URL } from "@/lib/config";

export function ProductGrid({
  selection,
}: {
  selection: FinalSelection | null;
}) {
  const [parts, setParts] = useState<Part[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch parts if we have a complete selection
    if (selection) {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        model: selection.model,
        year: selection.year,
        engine: selection.engine,
      });

      axios
        .get(`${API_BASE_URL}/parts?${params.toString()}`)
        .then((response) => {
          setParts(response.data);
        })
        .catch((err) => {
          console.error("Failed to fetch parts:", err);
          setError("Došlo je do greške prilikom preuzimanja delova.");
          setParts([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // If the selection is cleared, empty the parts list
      setParts([]);
    }
  }, [selection]);

  if (!selection) {
    return (
      <div className="text-center text-gray-400 py-16">
        <p className="text-xl">
          Molimo Vas izaberite vozilo da biste videli dostupne delove.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center text-white py-16 text-xl">
        Učitavanje delova...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 py-16 text-xl">{error}</div>
    );
  }

  if (parts.length === 0) {
    return (
      <div className="text-center text-yellow-400 py-16 text-xl">
        Nema delova za izabrano vozilo.
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <h2 className="text-4xl font-bold text-white mb-8 tracking-wide">
        Dostupni delovi
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {parts.map((part) => (
          <ProductCard key={part.id} part={part} />
        ))}
      </div>
    </div>
  );
}
