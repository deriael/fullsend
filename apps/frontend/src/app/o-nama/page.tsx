import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "O Nama - FULLSEND Auto Delovi",
};

export default function AboutUsPage() {
  return (
    <main className="flex flex-col items-center p-4 md:px-12">
      <div className="w-full max-w-4xl mx-auto py-16 text-white">
        <h1 className="text-4xl font-bold mb-8 text-center">
          O Kompaniji FULLSEND
        </h1>

        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p>
            Dobrodošli u FULLSEND, vašeg najpouzdanijeg partnera u svetu auto
            delova. Sa više od jedne decenije iskustva u industriji, naš tim
            stručnjaka posvećen je pružanju najkvalitetnijih delova i vrhunske
            usluge za sve vrste vozila.
          </p>
          <p>
            Naša priča počinje u Kikindi, gde smo kao mala porodična radnja
            gradili poverenje naših kupaca, jednog po jednog. Danas, sa ponosom
            širimo našu strast i ekspertizu na online tržište, sa ciljem da
            vozačima širom Srbije omogućimo brz, lak i siguran pristup delovima
            koji su im potrebni.
          </p>
          <h2 className="text-2xl font-bold mt-12 mb-4 text-white">
            Naša Misija
          </h2>
          <p>
            Verujemo da svako vozilo zaslužuje najbolje. Naša misija je da
            osiguramo dugovečnost i performanse vašeg automobila kroz
            distribuciju isključivo proverenih i kvalitetnih delova od
            renomiranih svetskih proizvođača. Profesionalnost, poverenje i
            zadovoljstvo kupaca su stubovi na kojima gradimo naš uspeh.
          </p>
        </div>
      </div>
    </main>
  );
}
