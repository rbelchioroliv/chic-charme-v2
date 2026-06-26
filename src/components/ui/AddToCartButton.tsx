"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore, Product } from "@/store/useCartStore";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  // Puxamos também o isOpen e o toggleCart
  const { addItem, isOpen, toggleCart } = useCartStore();

  const handleAdd = () => {
    addItem(product);
    // Se o carrinho estiver fechado, abre-o automaticamente!
    if (!isOpen) {
      toggleCart();
    }
  };

  return (
    <button 
      onClick={handleAdd}
      className="w-full bg-dark-900 text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-brand transition-colors duration-300 font-medium text-lg shadow-elegant"
    >
      <ShoppingBag className="w-5 h-5" />
      Adicionar à Sacola
    </button>
  );
}