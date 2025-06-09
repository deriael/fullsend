// file: apps/frontend/src/app/page.tsx
'use client'; // This page now manages state, so it must be a client component.

import { useState } from 'react';
import { VehicleSelector } from "@/components/VehicleSelector";
import { ProductGrid } from "@/components/ProductGrid";
import { FinalSelection } from '@fullsend/types';

export default function Home() {
  // This state holds the user's complete vehicle selection.
  // It starts as `null` and gets updated by the VehicleSelector.
  const [selection, setSelection] = useState<FinalSelection | null>(null);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 bg-gray-900">
      <header className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex mb-8">
        <h1 className="text-3xl text-white font-bold tracking-wider">FULLSEND</h1>
        {/* We can add nav links here later */}
      </header>

      {/* We pass the `setSelection` function down to the VehicleSelector.
        The selector will use this function to "report back" to this parent page
        once a full vehicle has been chosen.
      */}
      <VehicleSelector onVehicleSelect={setSelection} />

      <div className="my-12 w-full border-t border-gray-700/50"></div>

      {/* We pass the current `selection` object down to the ProductGrid.
        The grid will see when this changes and fetch the correct parts.
      */}
      <ProductGrid selection={selection} />
    </main>
  );
}