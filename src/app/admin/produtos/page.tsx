"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Pencil, Trash2, Tag, ImageIcon } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import ProductModal from "@/app/admin/ProductModal";
import Image from "next/image";

export default function AdminProdutos() {
  // Puxando os dados e funções do seu Zustand
  const { products, fetchProducts, removeProduct } = useProductStore() as any;
  
  // Estados da página
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Carrega os produtos ao abrir a página
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Função para abrir o modal VAZIO (Nova Joia)
  const handleAddNew = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  // Função para abrir o modal PREENCHIDO (Editar Joia)
  const handleEdit = (product: any) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  // Função para excluir
  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja remover esta joia do catálogo?")) {
      await removeProduct(id);
    }
  };

  // Filtro de busca
  const filteredProducts = products.filter((p: any) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Cabeçalho e Ações */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-dark-900">Catálogo de Joias</h1>
          <p className="text-dark-700 mt-1">Gerencie suas peças, preços e promoções.</p>
        </div>
        
        <button 
          onClick={handleAddNew}
          className="bg-brand text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-brand-dark transition-colors shadow-elegant"
        >
          <Plus className="w-5 h-5" />
          Nova Joia
        </button>
      </div>

      {/* Barra de Busca */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Buscar joia pelo nome..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none text-dark-900 placeholder-gray-400"
        />
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-4 font-medium text-dark-700 text-sm">Produto</th>
                <th className="p-4 font-medium text-dark-700 text-sm">Categoria</th>
                <th className="p-4 font-medium text-dark-700 text-sm">Preço Original</th>
                <th className="p-4 font-medium text-dark-700 text-sm">Preço Promo</th>
                <th className="p-4 font-medium text-dark-700 text-sm text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product: any) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* Foto e Nome */}
                    <td className="p-4 flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200 flex items-center justify-center">
                        {product.imageUrl ? (
                          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <span className="font-medium text-dark-900">{product.name}</span>
                    </td>

                    {/* Categoria */}
                    <td className="p-4 text-dark-700 text-sm">{product.category}</td>

                    {/* Preço Normal */}
                    <td className="p-4">
                      <span className={product.promotionalPrice ? "text-gray-400 line-through text-sm" : "text-dark-900 font-medium"}>
                        R$ {product.price.toFixed(2)}
                      </span>
                    </td>

                    {/* Preço Promocional (Tag) */}
                    <td className="p-4">
                      {product.promotionalPrice ? (
                        <div className="flex items-center gap-1.5 text-brand font-bold bg-brand/10 px-3 py-1 rounded-full w-max">
                          <Tag className="w-3.5 h-3.5" />
                          R$ {product.promotionalPrice.toFixed(2)}
                        </div>
                      ) : (
                        <span className="text-gray-300 text-sm">-</span>
                      )}
                    </td>

                    {/* Botões de Ação */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Nenhuma joia encontrada no catálogo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Renderiza o Modal de Cadastro/Edição */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        productToEdit={productToEdit} 
      />
      
    </div>
  );
}