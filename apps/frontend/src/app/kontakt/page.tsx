// file: apps/frontend/src/app/kontakt/page.tsx
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Kontakt - FULLSEND Auto Delovi",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col items-center p-4 md:px-12">
      <div className="w-full max-w-4xl mx-auto py-16 text-white">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Kontaktirajte Nas
        </h1>

        <div className="mt-8 p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-lg text-lg">
          <p className="mb-4">
            Imate pitanje ili vam je potreban specifičan deo? Naš tim je tu da
            vam pomogne.
          </p>
          <ul className="space-y-4 text-gray-200">
            <li>
              <strong>Adresa:</strong> Primer Ulica 123, 23300 Kikinda, Srbija
            </li>
            <li>
              <strong>Telefon:</strong>{" "}
              <a
                href="tel:+381123456789"
                className="text-blue-400 hover:underline"
              >
                +381 12 345 6789
              </a>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:kontakt@fullsend.rs"
                className="text-blue-400 hover:underline"
              >
                kontakt@fullsend.rs
              </a>
            </li>
            <li>
              <strong>Radno Vreme:</strong> Ponedeljak - Petak: 08:00 - 17:00
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
