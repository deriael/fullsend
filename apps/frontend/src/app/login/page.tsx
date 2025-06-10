// file: apps/frontend/src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // This is the special signIn function from NextAuth.js
      const result = await signIn('credentials', {
        redirect: false, // We handle the redirect manually
        email: email,
        password: password,
      });

      if (result?.error) {
        // Handle login errors (e.g., wrong password)
        setError("Pogrešan email ili lozinka.");
        setIsLoading(false);
      } else if (result?.ok) {
        // On successful login, redirect to the homepage
        router.push('/');
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Došlo je do greške. Molimo Vas pokušajte ponovo.");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center py-16 px-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-brand-grey p-8 rounded-lg shadow-lg border border-white/10">
          <h1 className="text-3xl text-brand-white font-bold mb-6 text-center">Prijavite se</h1>

          <div className="space-y-6">
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
              {isLoading ? 'Prijavljivanje...' : 'Prijavi se'}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Nemate nalog?{' '}
            <Link href="/register" className="font-semibold text-blue-400 hover:underline">
              Registrujte se
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}