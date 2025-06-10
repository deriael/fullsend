"use client";

import { useState } from "react";
import { VehicleSelector } from "@/components/VehicleSelector";
import { ProductGrid } from "@/components/ProductGrid";
import { FinalSelection } from "@fullsend/types";

export default function Home() {
  const [selection, setSelection] = useState<FinalSelection | null>(null);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:px-12">
      <VehicleSelector onVehicleSelect={setSelection} />

      {/* This is the divider line */}
      <div className="my-12 w-full border-t border-gray-700/50"></div>

      {/* This is the line that renders your ProductGrid. 
          If this line is missing, the component will not appear. */}
      <ProductGrid selection={selection} />
    </main>
  );
}
