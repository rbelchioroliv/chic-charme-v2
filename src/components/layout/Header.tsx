"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { toggleCart, items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Evita erros de hidratação e adiciona o efeito de scroll
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calcula o número total de itens na sacola
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Coleções", path: "/colecao" }, // <-- Plural aqui
    { name: "Nossa Essência", path: "/sobre" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-white py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Menu Mobile (Hamburguer) */}
          <button 
            className="md:hidden p-2 -ml-2 text-dark-800"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-5 h-5 text-brand group-hover:rotate-12 transition-transform" />
            <span className="font-serif text-2xl font-bold text-dark-900 tracking-tight">
              Chic<span className="text-brand">&</span>Charm
            </span>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-brand ${
                    isActive ? "text-brand" : "text-dark-700"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Ícones da Direita */}
          <div className="flex items-center gap-4">
            {/* Oculto no telemóvel, mostra link pro Admin para facilitar seus testes */}
            <Link href="/admin/pedidos" className="hidden md:block text-xs font-bold text-gray-400 hover:text-brand transition-colors uppercase tracking-widest mr-4">
              Admin
            </Link>

            <button 
              onClick={toggleCart}
              className="relative p-2 text-dark-800 hover:text-brand transition-colors group"
            >
              <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
              
              {/* Bolinha vermelha com a quantidade (só renderiza se o client já montou) */}
              {mounted && cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-dark-900/50 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Menu Mobile Gaveta */}
      <div 
        className={`fixed top-0 left-0 w-[280px] h-full bg-white z-[70] md:hidden transform transition-transform duration-300 flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <span className="font-serif text-xl font-bold text-dark-900">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-50 rounded-full text-dark-800">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-xl font-serif font-medium transition-colors ${
                pathname === link.path ? "text-brand" : "text-dark-900"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <Link 
            href="/admin/pedidos" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-bold text-dark-700 hover:text-brand transition-colors uppercase tracking-widest"
          >
            Acesso Restrito (Admin)
          </Link>
        </div>
      </div>
    </header>
  );
}