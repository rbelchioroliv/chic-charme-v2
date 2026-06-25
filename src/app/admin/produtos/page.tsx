"use client";

import { useState, useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import { Plus, Trash2, ImageIcon } from "lucide-react";
import ProductModal from "@/app/admin/ProductModal";
import Image from "next/image";

export default function AdminProducts() {
  const { products, fetchProducts, deleteProduct, isLoading } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Busca os produtos do banco ao montar a página
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 mb-2">Produtos</h1>
          <p className="text-dark-700">Catálogo sincronizado com o Banco de Dados.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors">
          <Plus className="w-5 h-5" /> Nova Joia
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-5 font-medium text-dark-800">Peça</th>
              <th className="p-5 font-medium text-dark-800">Categoria</th>
              <th className="p-5 font-medium text-dark-800">Preço</th>
              <th className="p-5 font-medium text-dark-800 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} className="p-8 text-center text-dark-700">A carregar...</td></tr>
            ) : products.map((product) => (
              <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-5 flex items-center gap-4">
                  <div className="relative w-14 h-14 bg-brand-bg rounded-lg overflow-hidden flex items-center justify-center border border-gray-100">
                    {product.imageUrl ? (
                      <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                    ) : (
                      <ImageIcon className="text-gray-400 w-6 h-6" />
                    )}
                  </div>
                  <span className="font-medium text-dark-900">{product.name}</span>
                </td>
                <td className="p-5 text-dark-700">{product.category}</td>
                <td className="p-5 font-semibold text-brand">R$ {product.price.toFixed(2)}</td>
                <td className="p-5 text-right">
                  <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-block">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}