// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Header";
import CartSidebar from "@/components/layout/CartSidebar";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Chic & Charm | Moda Feminina",
  description: "Elegância e conforto em cada peça.",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <CartSidebar />
        <main className="flex-grow pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}