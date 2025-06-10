// file: apps/frontend/src/components/Header.tsx
"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart.store";
// Import the SOLID icons from Heroicons
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { SmartSearchBar } from "./SmartSearchBar";

export function Header() {
  const { items } = useCartStore();
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    // Use bg-brand-grey for the header background
    <header className="w-full py-4 px-8 bg-brand-grey sticky top-0 z-50">
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between">
        {/* LEFT SIDE: LOGO (No change needed) */}
        <Link href="/">
          <Image
            src="/logowhite.svg"
            alt="FULLSEND Logo"
            width={159}
            height={20}
            priority
          />
        </Link>

        {/* CENTER: SMART SEARCH BAR (No change needed) */}
        <div className="w-full max-w-xl">
          <SmartSearchBar />
        </div>

        {/* RIGHT SIDE: USER & CART ACTIONS */}
        <div className="flex items-center gap-8">
          {/* Cart link with new solid icon and brand colors */}
          <Link
            href="/korpa"
            className="flex items-center gap-3 text-brand-white hover:text-brand-red transition-colors"
          >
            <div className="relative">
              <ShoppingCartIcon className="h-7 w-7" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-red text-brand-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm text-gray-400">Korpa</span>
              <span className="font-bold text-lg leading-tight">
                {totalPrice.toLocaleString("de-DE")} RSD
              </span>
            </div>
          </Link>

          {/* User Account Link with new solid icon */}
          <Link href="/login" className="p-1 rounded-full">
            <UserCircleIcon className="h-8 w-8 text-brand-white hover:text-brand-red transition-colors" />
          </Link>
        </div>
      </div>
    </header>
  );
}
