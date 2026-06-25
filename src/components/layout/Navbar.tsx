// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const getTotalItems = useCartStore(state => state.getTotalItems);
    const toggleCart = useCartStore(state => state.toggleCart);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Esquerda: Menu Mobile & Busca */}
                    <div className="flex items-center gap-4 flex-1">
                        <button className="p-2 hover:bg-brand-bg rounded-full transition-colors lg:hidden">
                            <Menu className="w-5 h-5 text-dark-800" />
                        </button>
                        <button className="hidden lg:flex items-center gap-2 text-dark-700 hover:text-brand transition-colors">
                            <Search className="w-5 h-5" />
                            <span className="text-sm font-medium">Buscar</span>
                        </button>
                    </div>

                    {/* Centro: Logo */}
                    <div className="flex-1 text-center">
                        <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-dark-900">
                            Chic <span className="text-brand">&</span> Charm
                        </Link>
                    </div>

                    {/* Direita: Ações & Carrinho */}
                    <div className="flex items-center justify-end gap-6 flex-1">
                        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-dark-800">
                            <Link href="/colecoes" className="hover:text-brand transition-colors">Coleções</Link>
                            <Link href="/sobre" className="hover:text-brand transition-colors">Sobre</Link>
                        </div>

                        <button
                            onClick={toggleCart}
                            className="relative p-2 hover:bg-brand-bg rounded-full transition-colors group cursor-pointer"
                        >
                            <ShoppingBag className="w-6 h-6 text-dark-800 group-hover:text-brand transition-colors" />
                            {mounted && getTotalItems() > 0 && (
                                <span className="absolute top-0 right-0 bg-brand text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                    {getTotalItems()}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}