"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ isOpen, onClose }: ProductModalProps) {
  const { addProduct } = useProductStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Captura os dados do formulário incluindo o ficheiro (file)
    const formData = new FormData(e.currentTarget);
    
    await addProduct(formData);
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-dark-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-2xl font-bold text-dark-900">Nova Joia</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-dark-800" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-800 mb-1">Nome da Peça</label>
            <input type="text" name="name" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-800 mb-1">Preço (R$)</label>
            <input type="number" step="0.01" name="price" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-800 mb-1">Categoria</label>
            <select name="category" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none">
              <option value="Colares">Colares</option>
              <option value="Anéis">Anéis</option>
              <option value="Brincos">Brincos</option>
              <option value="Pulseiras">Pulseiras</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-800 mb-1">Foto da Joia</label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors">
              <input type="file" name="image" accept="image/*" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Upload className="w-6 h-6 text-brand mx-auto mb-2" />
              <span className="text-sm text-dark-700">Clique ou arraste uma foto</span>
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-brand text-white py-4 rounded-xl font-medium hover:bg-brand-dark transition-colors mt-6 disabled:opacity-70">
            {isSubmitting ? "A Guardar..." : "Adicionar Joia"}
          </button>
        </form>
      </div>
    </div>
  );
}