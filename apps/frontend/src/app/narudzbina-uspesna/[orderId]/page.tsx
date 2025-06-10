"use client";

import Link from "next/link";
import { useParams } from "next/navigation"; // Hook to read dynamic route params

export default function OrderConfirmationPage() {
  // Use the useParams hook to get the dynamic parts of the URL
  const params = useParams();
  const orderId = params.orderId; // This will be the ID from the URL

  return (
    <main className="flex flex-col items-center p-4 md:px-12">
      <div className="w-full max-w-2xl mx-auto py-16 text-white text-center">
        <div className="p-8 bg-green-600/20 border border-green-500 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">Porudžbina uspešna!</h1>
          <p className="text-lg text-gray-300 mb-6">
            Hvala Vam na poverenju. Vaša porudžbina je uspešno primljena.
          </p>
          <div className="bg-gray-900/50 p-4 rounded-lg">
            <p className="text-gray-400">Broj Vaše porudžbine je:</p>
            <p className="text-2xl font-mono tracking-widest mt-2">{orderId}</p>
          </div>
          <Link
            href="/"
            className="inline-block mt-8 text-blue-400 hover:underline"
          >
            Vratite se na početnu stranu
          </Link>
        </div>
      </div>
    </main>
  );
}
