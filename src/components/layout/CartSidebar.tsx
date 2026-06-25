"use client";

import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // <-- A IMPORTAÇÃO CORRETA AQUI

export default function CartSidebar() {
  const [mounted, setMounted] = useState(false);
  const { isOpen, toggleCart, items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Overlay escuro de fundo */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-dark-900/50 backdrop-blur-sm z-[60] transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Painel Lateral */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-serif text-2xl font-bold text-dark-900 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Sua Sacola
          </h2>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-dark-800" />
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-dark-700">
              <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
              <p>Sua sacola está vazia.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  
                  {/* Div da Imagem Atualizada */}
                  <div className="relative w-20 h-24 bg-brand-bg rounded-lg flex items-center justify-center text-xs text-brand-dark flex-shrink-0 overflow-hidden border border-gray-100">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    ) : (
                      <ShoppingBag className="w-6 h-6 text-gray-300" />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-dark-900 line-clamp-1">{item.name}</h3>
                      <p className="text-brand font-semibold text-sm">R$ {item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-gray-50 text-dark-700">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-gray-50 text-dark-700">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodapé do Carrinho */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium text-dark-800">Total Estimado</span>
              <span className="font-serif text-2xl font-bold text-dark-900">
                R$ {getTotalPrice().toFixed(2)}
              </span>
            </div>
            
            <Link 
              href="/checkout"
              onClick={toggleCart}
              className="w-full flex justify-center bg-dark-900 text-white py-4 rounded-xl font-medium hover:bg-brand transition-colors"
            >
              Finalizar Compra
            </Link>
          </div>
        )}
      </div>
    </>
  );
}