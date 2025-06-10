// file: apps/frontend/src/app/placanje/page.tsx
"use client";

import React, { useState } from "react";
import { useCartStore } from "@/store/cart.store";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();

  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pouzece"); // Default to COD

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!customerName || !address || !phone || items.length === 0) {
      setError(
        "Molimo Vas popunite sva polja i proverite da li je korpa prazna.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const orderPayload = {
        customerName,
        address,
        phone,
        paymentMethod, // Use the selected payment method
        items: items,
      };

      const API_BASE_URL = "http://localhost:3000";
      const response = await axios.post(`${API_BASE_URL}/orders`, orderPayload);
      const newOrder = response.data;

      clearCart();
      router.push(`/narudzbina-uspesna/${newOrder.id}`);
    } catch (err) {
      console.error("Failed to submit order:", err);
      setError("Došlo je do greške. Molimo Vas pokušajte ponovo.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center p-4 md:px-12">
      <div className="w-full max-w-2xl mx-auto py-8 text-white">
        <h1 className="text-4xl font-bold mb-8">Plaćanje i Dostava</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-800 p-8 rounded-lg border border-gray-700"
        >
          {/* Customer Details Inputs (no changes here) */}
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-300"
            >
              Ime i Prezime
            </label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-3 shadow-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-300"
            >
              Adresa za dostavu
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-3 shadow-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-300"
            >
              Kontakt Telefon
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md p-3 shadow-sm"
              required
            />
          </div>

          {/* --- NEW PAYMENT METHOD SECTION --- */}
          <div className="border-t border-gray-700 pt-6">
            <h2 className="text-xl font-semibold">Način plaćanja</h2>
            <div className="mt-4 space-y-3">
              <label className="flex items-center p-4 bg-gray-700 rounded-lg border border-gray-600 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-900/50 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pouzece"
                  checked={paymentMethod === "pouzece"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-blue-600 bg-gray-900 border-gray-500 focus:ring-blue-500"
                />
                <span className="ml-3 block text-sm font-medium text-white">
                  Plaćanje pouzećem (Gotovinom prilikom preuzimanja)
                </span>
              </label>
              <label className="flex items-center p-4 bg-gray-700 rounded-lg border border-gray-600 cursor-not-allowed opacity-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="kartica"
                  disabled
                  className="h-4 w-4"
                />
                <span className="ml-3 block text-sm font-medium text-gray-500">
                  Kartica online (Uskoro)
                </span>
              </label>
            </div>
          </div>
          {/* ---------------------------------- */}

          <div className="border-t border-gray-700 pt-6">
            <h2 className="text-xl font-semibold">Pregled porudžbine</h2>
            <div className="mt-4 flex justify-between text-xl font-bold">
              <span>UKUPNO</span>
              <span>{totalPrice.toLocaleString("de-DE")} RSD</span>
            </div>
          </div>

          {error && <p className="text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting || items.length === 0}
            className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Slanje..." : "Završi porudžbinu"}
          </button>
        </form>
      </div>
    </main>
  );
}
