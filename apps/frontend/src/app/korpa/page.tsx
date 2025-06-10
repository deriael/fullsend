// file: apps/frontend/src/app/korpa/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart.store";
import { CartItem } from "@/store/cart.store";

export default function CartPage() {
  // Get the items and actions directly from our Zustand store
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();

  // Calculate the total price of all items in the cart
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Helper function to render each item in the cart
  const renderCartItem = (item: CartItem) => (
    <div
      key={item.id}
      className="flex items-center justify-between p-4 border-b border-gray-700"
    >
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 bg-white rounded-md p-1 relative">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div>
          <p className="font-semibold text-white">{item.brand}</p>
          <p className="text-gray-300">{item.name}</p>
          <p className="text-gray-400 text-sm mt-1">
            {item.price.toLocaleString("de-DE")} RSD
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-600 rounded-md">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-3 py-1 text-white hover:bg-gray-700"
          >
            -
          </button>
          <span className="px-4 py-1 text-white">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-3 py-1 text-white hover:bg-gray-700"
          >
            +
          </button>
        </div>
        <p className="w-32 text-right text-lg font-semibold text-white">
          {(item.price * item.quantity).toLocaleString("de-DE")} RSD
        </p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-400 font-semibold"
        >
          Ukloni
        </button>
      </div>
    </div>
  );

  return (
    <main className="flex flex-col items-center p-4 md:px-12">
      <div className="w-full max-w-6xl mx-auto py-8 text-white">
        <h1 className="text-4xl font-bold mb-8">Vaša Korpa</h1>

        {items.length > 0 ? (
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            {items.map(renderCartItem)}
            <div className="p-6 flex justify-between items-end">
              {/* The new "Empty Cart" button */}
              <button
                onClick={() => {
                  // Add a confirmation dialog for safety
                  if (
                    window.confirm(
                      "Da li ste sigurni da želite da ispraznite korpu?",
                    )
                  ) {
                    clearCart();
                  }
                }}
                className="text-gray-400 hover:text-white hover:bg-red-600/20 px-4 py-2 rounded-lg transition-colors font-semibold"
              >
                Isprazni korpu
              </button>

              {/* The existing total and checkout button */}
              <div className="text-right">
                <p className="text-gray-400">Ukupno:</p>
                <p className="text-3xl font-bold">
                  {totalPrice.toLocaleString("de-DE")} RSD
                </p>
                <Link
                  href="/placanje"
                  className="inline-block mt-4 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Nastavi na plaćanje
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-16 bg-gray-800 rounded-lg">
            <p className="text-2xl">Vaša korpa je prazna.</p>
            <Link
              href="/"
              className="inline-block mt-4 text-blue-400 hover:underline"
            >
              Vratite se na prodavnicu
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
