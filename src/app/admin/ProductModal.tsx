"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";

// Adicionamos a prop productToEdit
interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: any | null; 
}

export default function ProductModal({ isOpen, onClose, productToEdit }: ProductModalProps) {
  const { addProduct, updateProduct } = useProductStore() as any;
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const isEditing = !!productToEdit;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    if (isEditing) {
      await updateProduct(productToEdit.id, formData);
    } else {
      await addProduct(formData);
    }
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-dark-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-2 border-b border-gray-100">
          <h2 className="font-serif text-2xl font-bold text-dark-900">
            {isEditing ? "Editar Joia" : "Nova Joia"}
          </h2>
          <button type="button" onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-dark-800" />
          </button>
        </div>

        {/* Adicionamos a key para o React resetar o form ao trocar de produto */}
        <form key={productToEdit ? productToEdit.id : 'new'} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Nome da Peça</label>
              <input type="text" name="name" defaultValue={productToEdit?.name} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Categoria</label>
              <select name="category" defaultValue={productToEdit?.category} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none">
                <option value="Colares">Colares</option>
                <option value="Anéis">Anéis</option>
                <option value="Brincos">Brincos</option>
                <option value="Pulseiras">Pulseiras</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Preço Normal (R$)</label>
              <input type="number" step="0.01" name="price" defaultValue={productToEdit?.price} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand mb-1">Preço Promocional (R$) - Opcional</label>
              <input type="number" step="0.01" name="promotionalPrice" defaultValue={productToEdit?.promotionalPrice || ""} placeholder="Ex: Deixe vazio se não houver" className="w-full p-3 bg-brand-bg/50 border border-brand/30 rounded-xl focus:ring-2 focus:ring-brand outline-none text-brand-dark" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-800 mb-1">
              Foto da Joia {isEditing && <span className="text-xs text-gray-400 font-normal">(Deixe vazio para manter a atual)</span>}
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-3 text-center hover:bg-gray-50 transition-colors">
              <input type="file" name="image" accept="image/*" required={!isEditing} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="flex items-center justify-center gap-2 text-brand">
                <Upload className="w-5 h-5" />
                <span className="text-sm font-medium">{isEditing ? "Selecionar Nova Imagem" : "Selecionar Arquivo"}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-800 mb-1">Descrição</label>
            <textarea name="description" rows={3} defaultValue={productToEdit?.description} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none resize-none"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-4">
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Material (Base)</label>
              <input type="text" name="material" defaultValue={productToEdit?.material || "Prata 925"} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Banho / Acabamento</label>
              <input type="text" name="plating" defaultValue={productToEdit?.plating || "Banho Premium"} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-1">Garantia</label>
              <input type="text" name="warranty" defaultValue={productToEdit?.warranty || "1 Ano"} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none text-sm" />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer bg-gray-50 p-4 rounded-xl border border-gray-200">
            <input type="checkbox" name="isHypoallergenic" defaultChecked={isEditing ? productToEdit?.isHypoallergenic : true} className="w-5 h-5 rounded text-brand focus:ring-brand border-gray-300" />
            <div>
              <span className="text-dark-900 font-medium block">Peça Hipoalergênica</span>
            </div>
          </label>

          <button type="submit" disabled={isSubmitting} className="w-full bg-brand text-white py-4 rounded-xl font-medium hover:bg-brand-dark transition-colors mt-6 disabled:opacity-70">
            {isSubmitting ? "Salvando..." : isEditing ? "Salvar Alterações" : "Adicionar Joia"}
          </button>
        </form>
      </div>
    </div>
  );
}