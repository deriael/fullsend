'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post('/api/register', { name, email, password });
      router.push('/login');
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data || "Došlo je do greške prilikom registracije.");
      } else {
        setError("Došlo je do neočekivane greške.");
      }
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center py-16 px-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-brand-grey p-8 rounded-lg shadow-lg border border-white/10">
          <h1 className="text-3xl text-brand-white font-bold mb-6 text-center">Registrujte se</h1>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Puno Ime</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full bg-black/30 text-brand-white rounded-md border-white/20 p-3 outline-none focus:shadow-[0_0_15px_rgba(215,35,35,0.5)] focus:border-brand-red transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Adresa</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full bg-black/30 text-brand-white rounded-md border-white/20 p-3 outline-none focus:shadow-[0_0_15px_rgba(215,35,35,0.5)] focus:border-brand-red transition-all"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Lozinka</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full bg-black/30 text-brand-white rounded-md border-white/20 p-3 outline-none focus:shadow-[0_0_15px_rgba(215,35,35,0.5)] focus:border-brand-red transition-all"
              />
            </div>
          </div>

          {error && <p className="mt-4 text-center text-red-400">{error}</p>}

          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-red text-brand-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 disabled:bg-gray-500 transition-colors"
            >
              {isLoading ? 'Registracija...' : 'Registruj se'}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Već imate nalog?{' '}
            <Link href="/login" className="font-semibold text-blue-400 hover:underline">
              Prijavite se
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}