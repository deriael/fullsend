"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { CartItem } from "@/store/cart.store";
import { API_BASE_URL } from "@/lib/config";

// Define the shape of an Order object
interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  address: string;
  phone: string;
  paymentMethod: string;
  itemsJson: string;
}

const PROTOTYPE_PASSWORD = "fullsend_demo"; // IMPORTANT: For demo only!

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only fetch orders if the user is authenticated
    if (isAuthenticated) {
      axios
        .get(`${API_BASE_URL}/orders`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => console.error("Failed to fetch orders:", error))
        .finally(() => setIsLoading(false));
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PROTOTYPE_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Pogrešna lozinka!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleLogin}
          className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-sm"
        >
          <h1 className="text-2xl text-white font-bold mb-6 text-center">
            Admin Prijavljivanje
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Unesite lozinku"
            className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700"
          >
            Prijavi se
          </button>
        </form>
      </div>
    );
  }

  return (
    <main className="p-4 md:p-12 text-white">
      <h1 className="text-4xl font-bold mb-8">Admin Panel - Porudžbine</h1>
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="p-4">ID Porudžbine</th>
              <th className="p-4">Kupac</th>
              <th className="p-4">Adresa</th>
              <th className="p-4">Telefon</th>
              <th className="p-4">Naručeni Artikli</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center p-8">
                  Učitavanje porudžbina...
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-700">
                  <td className="p-4 font-mono text-sm">{order.id}</td>
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4">{order.address}</td>
                  <td className="p-4">{order.phone}</td>
                  <td className="p-4">
                    <ul>
                      {(JSON.parse(order.itemsJson) as CartItem[]).map(
                        (item) => (
                          <li key={item.id} className="text-sm">
                            {item.name} x {item.quantity}
                          </li>
                        ),
                      )}
                    </ul>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
