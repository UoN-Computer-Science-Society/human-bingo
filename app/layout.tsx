import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Computer Science Society Human Bingo!",
  description: "Interactive Human Bingo game for CS Society events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <header className="bg-gradient-to-r from-lavender via-violet to-lavender px-3 py-3 sm:px-4 sm:py-4 shadow-md">
          <div className="container mx-auto flex items-center justify-center">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white text-center">
              Computer Science Society Human Bingo!
            </h1>
          </div>
        </header>
        
        <main className="flex-1 container mx-auto px-2 sm:px-4 py-4 sm:py-6">
          {children}
        </main>
        
        <footer className="bg-charcoal text-white py-4 px-4 mt-auto">
          <div className="container mx-auto text-center">
            <p className="text-sm">© Shahjalal, Computer Science Society</p>
          </div>
        </footer>
        
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: 'var(--mint)',
              color: 'var(--charcoal)',
              border: '2px solid var(--magenta)',
            },
          }}
        />
      </body>
    </html>
  );
}
