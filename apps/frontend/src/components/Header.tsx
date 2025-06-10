'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/cart.store';
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { SmartSearchBar } from './SmartSearchBar';
import { useSession, signOut } from 'next-auth/react';

export function Header() {
  const { items } = useCartStore();
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const { data: session, status } = useSession();

  return (
    <header className="w-full py-4 px-8 bg-brand-grey sticky top-0 z-50">
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between">
        <Link href="/">
          <Image src="/logowhite.svg" alt="FULLSEND Logo" width={159} height={20} priority />
        </Link>

        <div className="w-full max-w-xl">
          <SmartSearchBar />
        </div>

        <div className="flex items-center gap-8">
          <Link href="/korpa" className="flex items-center gap-3 text-brand-white hover:text-brand-red transition-colors">
            <div className="relative">
              <ShoppingCartIcon className="h-8 w-8" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-red text-brand-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-400">Korpa</span>
              <span className="font-bold text-lg leading-tight">{totalPrice.toLocaleString('de-DE')} RSD</span>
            </div>
          </Link>

          {/* This is the corrected conditional block */}
          {status === 'authenticated' ? (
            <div className="flex items-center gap-4 text-brand-white">
              <span className="text-gray-300 font-medium">Zdravo, {session.user?.name}</span>
              <Link href="/profil" className="p-1 rounded-full hover:bg-white/10 transition-colors">
                <UserCircleIcon className="h-9 w-9" />
              </Link>
              <button onClick={() => signOut()} className="bg-brand-red text-brand-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Odjavi se
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-gray-700 text-brand-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600">
              Prijavi se
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}