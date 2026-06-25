import Link from "next/link";
import { LayoutDashboard, Package, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-gray-50">
      {/* Sidebar do Admin */}
      <aside className="w-64 bg-dark-900 text-white p-6">
        <h2 className="font-serif text-xl font-bold mb-10 text-brand-light">Painel Chic & Charm</h2>
        <nav className="space-y-4">
          <Link href="/admin" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/produtos" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
            <Package className="w-5 h-5" /> Produtos
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
            <Settings className="w-5 h-5" /> Configurações
          </Link>
        </nav>
      </aside>

      {/* Área de Conteúdo do Admin */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}