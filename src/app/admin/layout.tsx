"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, ShoppingBag, ArrowLeft, LayoutDashboard, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Barra Lateral Esquerda (Sidebar) */}
      <aside className="w-64 bg-dark-900 text-white flex flex-col fixed inset-y-0 left-0 z-40 shadow-2xl">
        <div className="p-8 border-b border-gray-800">
          <h2 className="text-2xl font-serif font-bold text-brand-light">Painel Admin</h2>
          <p className="text-xs text-gray-400 mt-1">Chic & Charm</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
              pathname === '/admin' 
                ? 'bg-brand text-white shadow-lg' 
                : 'hover:bg-dark-800 text-gray-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" /> 
            Financeiro
          </Link>

          <Link 
            href="/admin/produtos" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
              pathname.includes('/admin/produtos') 
                ? 'bg-brand text-white shadow-lg' 
                : 'hover:bg-dark-800 text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-5 h-5" /> 
            Gerir Joias
          </Link>
          
          <Link 
            href="/admin/pedidos" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
              pathname.includes('/admin/pedidos') 
                ? 'bg-brand text-white shadow-lg' 
                : 'hover:bg-dark-800 text-gray-400 hover:text-white'
            }`}
          >
            <Package className="w-5 h-5" /> 
            Encomendas
          </Link>

          <Link 
            href="/admin/settings" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
              pathname.includes('/admin/configuracoes') 
                ? 'bg-brand text-white shadow-lg' 
                : 'hover:bg-dark-800 text-gray-400 hover:text-white'
            }`}
          >
            <Settings className="w-5 h-5" /> 
            Configurações
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800 mb-4">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-dark-800 text-gray-400 hover:text-white transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" /> 
            Voltar à Loja
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        {children}
      </main>

    </div>
  );
}