import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import AuthProvider from '@/components/AuthProvider'; // Import the AuthProvider

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FULLSEND Auto Delovi',
  description: 'Svi delovi za Vaš automobil na jednom mestu.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body className={`${inter.className} bg-brand-black text-brand-white`}>
        {/* Wrap everything in the AuthProvider */}
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}